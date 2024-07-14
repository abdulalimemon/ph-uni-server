import { z } from 'zod';

// Define the Zod schemas for nested objects first
const nameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'First name cannot be more than 20 characters.' })
    .min(1, { message: 'First name is required.' })
    .trim(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .max(20, { message: 'Last name cannot be more than 20 characters.' })
    .min(1, { message: 'Last name is required.' })
    .trim(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father name is required.' }).trim(),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father Occupation is required.' })
    .trim(),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father Contact number is required.' })
    .trim(),
  motherName: z.string().min(1, { message: 'Mother name is required.' }).trim(),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother Occupation is required.' })
    .trim(),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother Contact number is required.' })
    .trim(),
});

const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Local Guardian name is required.' })
    .trim(),
  occupation: z
    .string()
    .min(1, { message: 'Local Guardian occupation is required.' })
    .trim(),
  contactNo: z
    .string()
    .min(1, { message: 'Local Guardian Contact number is required.' })
    .trim(),
  address: z
    .string()
    .min(1, { message: 'Local Guardian address is required.' })
    .trim(),
});

// Define the main student schema
const studentValidationSchema = z.object({
  id: z.string().min(1, { message: 'ID is required.' }),
  name: nameValidationSchema.required(),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({
      message:
        "The gender field can only be one of the following: 'male', 'female' or 'other'",
    }),
  }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required.' }),
  email: z
    .string()
    .email({ message: 'Invalid email address.' })
    .min(1, { message: 'Email is required.' })
    .trim(),
  contactNo: z
    .string()
    .min(1, { message: 'Contact number is required.' })
    .trim(),
  emergencyContactNo: z
    .string()
    .min(1, { message: 'Emergency contact number is required.' })
    .trim(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
      errorMap: () => ({ message: 'Blood group is required.' }),
    })
    .optional(),
  presentAddress: z
    .string()
    .min(1, { message: 'Present address is required.' })
    .trim(),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent address is required.' })
    .trim(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: z.string().trim().optional(),
  isDeleted: z.boolean().default(false),
});

// Export the Zod schema
export default studentValidationSchema;
