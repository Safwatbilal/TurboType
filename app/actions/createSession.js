'use server';
import { createAdminClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

async function createSession(previousState, formData) {
    const password = formData.get('password');
    const email = formData.get('email');
    if (!password || !email) {
        return {
            error: 'Please fill out all fields',
        };
    }

    const { account } = await createAdminClient();

    try {
        const session = await account.createEmailPasswordSession(email, password);

        // Set session cookie
        cookies().set('appwrite-session', session.secret, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(session.expire),
            path: '/',
        });

        return {
            success: true,
        };
    } catch (error) {

        return {
            error: 'User does not exist or invalid credentials.',
        };


        // Return a generic error message for other cases

    }
}

export default createSession;
