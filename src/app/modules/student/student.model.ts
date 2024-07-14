import { Schema, model } from 'mongoose';
import {
  TStudentModel,
  TGuardian,
  TLocalGuardian,
  TName,
  TStudent,
} from './student.interface';

const nameSchema = new Schema<TName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    maxlength: [20, 'First name can not more than 20 charecters.'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    maxlength: [20, 'First name can not more than 20 charecters.'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required.'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father Occupation is required.'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father Contact number is required.'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother name is required.'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother Occupation is required.'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother Contact number is required.'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian name is required.'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian occupation is required.'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Contact number is required.'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian address is required.'],
  },
});

const studentSchema = new Schema<TStudent, TStudentModel>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required.'],
    unique: true,
    ref: 'User',
  },
  name: {
    type: nameSchema,
    required: [true, 'Name is required.'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        "The gender field can only one of the following: 'male', 'female' or 'other'",
    },
    required: true,
  },
  dateOfBirth: { type: String, required: [true, 'Date of birth is required.'] },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    trim: true,
    unique: true,
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Contact number is required.'],
  },
  emergencyContactNo: {
    type: String,
    trim: true,
    required: [true, 'Emergency contact number is required.'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      message: 'Blood group is required.',
    },
  },
  presentAddress: {
    type: String,
    trim: true,
    required: [true, 'Present address is required.'],
  },
  permanentAddress: {
    type: String,
    trim: true,
    required: [true, 'Permanent address is required.'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is required.'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian is required.'],
  },
  profileImg: { type: String, trim: true },
  isDeleted: { type: Boolean, default: false },
});

// Query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

// Creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await StudentModel.findOne({ id });
//   return existingUser;
// };

export const StudentModel = model<TStudent, TStudentModel>(
  'Student',
  studentSchema,
);
