import { z } from "zod";
import mongoose from "mongoose";

export const TodoInputSchema = z.object({
    title: z.string().min(1).max(30),
    description: z.string(),
    completed: z.boolean(),
});

export const todoSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, maxlength: 30 },
        description: String,
        completed: { type: Boolean, default: false },
    },
    { timestamps: true } // adds createdAt and updatedAt automatically
);





