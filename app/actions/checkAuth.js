'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

async function checkAuth() {
    const sessionCookie = cookies().get('appwrite-session');
    console.log(sessionCookie)
    if (!sessionCookie) {
        return {
            isAuthenticated: false,
        };
    }

    try {
        const { account } = await createSessionClient(sessionCookie.value);
        const user = await account.get();
        console.log(user)

        return {
            isAuthenticated: true,
            user: {
                id: user.$id,
                name: user.name,
                email: user.email,
                created: user.$createdAt,
            },
        };
    } catch (error) {
        return {
            isAuthenticated: false,
        };
    }
}

export default checkAuth;
