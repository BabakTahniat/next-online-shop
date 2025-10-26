'use client';
import * as actions from '@/actions';
import AuthCard from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
// import { useTransition } from 'react';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Spinner } from '../ui/spinner';

const signInSchema = z.object({
    email: z.email({
        error: 'Invalid Email address',
    }),
    password: z.string().min(1, 'Password cannot be empty'),
});

export type signInFormFields = z.infer<typeof signInSchema>;

export const loginFormInitialState = {
    email: '',
    password: '',
};

export default function SignInForm() {
    const form = useForm<signInFormFields>({
        resolver: zodResolver(signInSchema),
        defaultValues: { email: '', password: '' },
    });

    const [formState, formAction, pending] = useActionState(
        actions.loginUser,
        {},
    );

    function onSubmit(formData: signInFormFields) {
        startTransition(() => {
            formAction(formData);
        });
    }

    return (
        <>
            <h1 className="text-3xl">Login</h1>

            <AuthCard
                cardTitle="Welcome Back"
                backButtonHref="/register"
                backButtonLabel="Create a new account"
                showSocials
            >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {/* <FieldSet> */}
                        {/* <FieldLegend>Login</FieldLegend> */}
                        {/* <FieldDescription>Welcome Back</FieldDescription> */}
                        {/* </FieldSet> */}
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    type="email"
                                    placeholder="Email@example.com"
                                    {...form.register('email')}
                                />
                                <FieldError
                                    errors={formState.email?.errors.map(
                                        (message) => ({ message }),
                                    )}
                                ></FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <Input
                                    type="password"
                                    autoComplete="off"
                                    placeholder="password"
                                    {...form.register('password')}
                                />
                                <FieldError
                                    errors={formState.password?.errors.map(
                                        (message) => ({ message }),
                                    )}
                                ></FieldError>
                            </Field>

                            {/* General form errors */}
                            <Field data-invalid>
                                <FieldError
                                    errors={formState.root?.errors.map(
                                        (message) => ({ message }),
                                    )}
                                ></FieldError>
                            </Field>

                            {/* Form success message */}
                            {formState.success && (
                                <Field className="text-secondary bg-teal-400 p-2">
                                    {formState.success}
                                </Field>
                            )}

                            <Field>
                                <Button
                                    asChild
                                    size="sm"
                                    variant="link"
                                    className="w-fit self-center"
                                >
                                    <Link href="/reset">
                                        Forgot your password?
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={pending}>
                                    {pending ? <Spinner /> : 'Login'}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </AuthCard>
        </>
    );
}
