'use server';

import * as auth from '@/auth';

export async function signInOath(provider: string) {
    return auth.signIn(provider);
}
