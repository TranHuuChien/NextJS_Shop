import { X } from 'lucide-react'
import { title } from 'process'
import { z } from 'zod'

export const zSchema = z.object({
    email: z
    .string()
    .email({message: "Invalid email address"}),

    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long"})
    .max(16, { message: "Password must be at most 16 characters long"})
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter"})
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter"})
    .regex(/[0-9]/, { message: "Password must contain at least one number"})
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character"}),

    name: z.string()
    .min(2, { message: "Name must be at least 2 character"})
    .max(50, { message: "Name must be at least 50 character"})
    .regex(/[a-zA-Z\s]/, { message: "Name can only contain letters and spaces"}),

    _id: z.string().min(3, '_id is required.'),
    alt: z.string().min(3, 'Alt is required'),
    title: z.string().min(3, 'Title is required'),
    slug: z.string().min(3, 'Slug is required'),

    category: z.string().min(3, 'Category is required.'),
    mrp: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() !== "") {
      return Number(val);
    }
    return val;
    }, z.number().positive("Expected positive value, received negative.")),
    sellingPrice: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() !== "") {
      return Number(val);
    }
    return val;
    }, z.number().positive("Expected positive value, received negative.")),
    discountPercentage: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() !== "") {
      return Number(val);
    }
    return val;
    }, z.number().positive("Expected positive value, received negative.")),
    description: z.string().min(3, 'Description is required.')
})