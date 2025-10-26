import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.email({
        error: 'Invalid Email address',
    }),
    password: z.string().min(1, 'Password cannot be empty'),
});

export const RegisterFormSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(3, 'Username must be at least 3 characters long (no spaces)'),
        email: z.email({
            error: 'Invalid Email address',
        }),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters long'),
        passwordConfirm: z
            .string()
            .min(8, 'Password must be at least 8 characters long'),
    })
    .refine(
        (data) => {
            return data.password === data.passwordConfirm;
        },
        {
            error: 'Passwords do not match',
            path: ['passwordConfirm'],
        },
    );
