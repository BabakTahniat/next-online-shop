'use server';

import * as z from 'zod';
import { redirect } from 'next/navigation';
import { RegisterFormSchema } from '@/lib/schemas';
import { RegisterFormFields } from '@/components/auth/register-form';
import type { User } from 'next-auth';
import bcrypt from 'bcrypt';

import { createVerificationTokenByEmail } from '@/lib/queries/verification-tokens';
import { createNewUser, getUserByEmail } from '@/lib/queries/users';
import { sendVerificationTokenEmail } from '@/lib/send-email';

type RegisterUserForm = {
    name?: { errors: string[] } | undefined;
    email?: { errors: string[] } | undefined;
    password?: { errors: string[] } | undefined;
    passwordConfirm?: { errors: string[] } | undefined;
    root?: { errors: string[] } | undefined;
    success?: string;
    user?: User;
};

export async function registerUser(
    formData: RegisterFormFields,
): Promise<RegisterUserForm> {
    const parsed = RegisterFormSchema.safeParse(formData);

    if (!parsed.success) {
        return z.treeifyError(parsed.error).properties as RegisterUserForm;
    }

    const { name, email, password } = parsed.data;

    try {
        // check if user already exists
        const existingUser = await getUserByEmail(email);

        // Check if user already in database
        if (existingUser && existingUser.emailVerified) {
            return {
                root: {
                    errors: ['Email already registered. Use another Email'],
                },
            };
        }

        // check if user has verified the email
        if (existingUser && !existingUser.emailVerified) {
            // Email is registered but not verified
            const newToken = await createVerificationTokenByEmail(email); // create new token
            await sendVerificationTokenEmail(newToken.token, email);

            return {
                success:
                    'Verification token sent to email. Please verify your Email.',
            };
            // return {
            //     errors: ['Email not verified. Please verify your email.'],
            // };
        }

        const passwordHash = await bcrypt.hash(password, 12);
        await createNewUser(name, email, passwordHash);

        const { token } = await createVerificationTokenByEmail(email); // create new token
        await sendVerificationTokenEmail(token, email);

        return {
            success: 'Verification token sent to Email',
        };

        redirect('/');
    } catch (error) {
        if (error instanceof Error) console.log(error);
        return {
            root: {
                errors: ['Something went wrong'],
            },
        };
    }
}
