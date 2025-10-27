'use server';

import * as auth from '@/auth';

export async function signInOath(provider: 'google' | 'github') {
    return await auth.signIn(provider);
}
