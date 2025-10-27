'use server';

import { signIn } from '@/auth';
import type { signInFormFields } from '@/components/auth/signin-form';
import { AuthError, CredentialsSignin, type User } from 'next-auth';
import CallbackRouteError from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as z from 'zod';

type SignInFormState = {
    email?: { errors: string[] } | undefined;
    password?: { errors: string[] } | undefined;
    root?: { errors: string[] } | undefined;
    success?: string;
    user?: User;
};

const signInSchema = z.object({
    email: z.email({
        error: 'Invalid Email address',
    }),
    password: z.string().min(1, 'Password cannot be empty'),
});

export async function loginUser(
    previousState: SignInFormState,
    formData: signInFormFields,
): Promise<SignInFormState> {
    const parsed = signInSchema.safeParse(formData);

    if (!parsed.success) {
        return z.treeifyError(parsed.error).properties as SignInFormState;
    }

    const { email, password } = parsed.data;

    try {
        // check if user is in the database
        // const user = await getUserByEmail(email);

        // if (!user)
        //     return {
        //         root: {
        //             errors: ['User not found'],
        //         },
        //     };

        // const isMatched = await bcrypt.compare(password, user.passwordHash);

        // if (!isMatched)
        //     return {
        //         root: {
        //             errors: ['wrong password'],
        //         },
        //     };

        // if (!user.emailVerified)
        //     return {
        //         root: {
        //             errors: ['Email not verified'],
        //         },
        //     };

        await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        revalidatePath('/');
        // setTimeout(() => {
        //     redirect('/');
        // }, 2000);
        return { success: 'Login successful' };
    } catch (error) {
        if (error instanceof AuthError) {
            console.log('ERROR CAUSE: ', error.cause);
            console.log('ERROR MESSAGE: ', error.message);
            console.log('ERROR TYPE: ', error.type);
            console.log('ERROR NAME: ', error.name);
            console.log('ERROR STACK: ', error.stack);
            console.log(error instanceof CredentialsSignin);

            if (error.cause?.err) {
                return { root: { errors: [error.cause.err?.message] } };
            }

            // if (
            //     error.cause?.err instanceof Error &&
            //     error.cause.err.message === 'EmailNotVerified'
            // ) {
            //     return {
            //         root: {
            //             errors: [
            //                 'Email not verified. Please check your inbox.',
            //             ],
            //         },
            //     };
            // }

            if (error.type === 'CredentialsSignin') {
                return {
                    root: {
                        errors: ['Invalid Email or Password'],
                    },
                };
            }

            return {
                root: {
                    errors: ['An unknown authentication error has occurred.'],
                },
            };
        }

        console.error('Non-AuthError caught in loginUser: ', error);
        return {
            root: {
                errors: ['Something went wrong. Please try again.'],
            },
        };
    }
}
