'use client';

import * as actions from '@/actions';
import AuthCard from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Spinner } from '@/components/ui/spinner';

export type RegisterFormFields = z.infer<typeof RegisterFormSchema>;

export default function RegisterForm() {
    const form = useForm({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
    });

    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState('');

    function onSubmit(formData: RegisterFormFields) {
        startTransition(async () => {
            const res = await actions.registerUser(formData);

            // Object.keys(formData).forEach((field) => {
            //     if (res[field]?.errors) {
            //         form.setError(field, {
            //             message: res[filed]?.errors.join(''),
            //         });
            //     }
            // });

            if (res.name?.errors)
                form.setError('name', {
                    message: res.name?.errors.join(''),
                });

            if (res.email?.errors)
                form.setError('email', {
                    message: res.email.errors.join(''),
                });
            if (res.password?.errors)
                form.setError('password', {
                    message: res.password.errors.join(''),
                });
            if (res.passwordConfirm?.errors)
                form.setError('passwordConfirm', {
                    message: res.passwordConfirm.errors.join(''),
                });

            if (res.root?.errors)
                form.setError('root', { message: res.root.errors.join('') });

            if (res.success) {
                setSuccess(res.success);
            }
        });
    }

    return (
        <>
            <h1 className="text-3xl">Create a new account</h1>

            <AuthCard
                cardTitle="Welcome"
                backButtonHref="/login"
                backButtonLabel="Login"
                backButtonText="Already have an account?"
                showSocials
            >
                <Form {...form}>
                    <form
                        className="flex flex-col space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Name"
                                            type="string"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Email"
                                            type="email"
                                            autoComplete="email"
                                        />
                                    </FormControl>
                                    {/* <FormDescription>
                                    Please enter your email address.
                                </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Password"
                                            type="password"
                                            autoComplete="new-password"
                                            id="new-password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Confirm your password"
                                            type="password"
                                            autoComplete="new-password"
                                            id="new-password-confirm"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <Button
                        asChild
                        size="sm"
                        variant="link"
                        className="w-fit self-center"
                    >
                        <Link href="/reset">Forgot your password?</Link>
                    </Button> */}
                        {form.formState.errors.root && (
                            <p className="text-red-600">
                                {form.formState.errors.root.message}
                            </p>
                        )}
                        {success ? (
                            <p className="bg-green-100 p-4 text-green-600">
                                {success}
                            </p>
                        ) : null}
                        <Button
                            type="submit"
                            className="my-2 w-full"
                            disabled={isPending}
                        >
                            {isPending ? <Spinner /> : 'Create Account'}
                        </Button>
                    </form>
                </Form>
            </AuthCard>
        </>
    );
}
