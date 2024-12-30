'use server';
import { createAdminClient } from '@/config/appwrite';
import { ID, Users, Client } from 'node-appwrite';

async function createUser(previousState, formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (!email || !name || !password) {
        return {
            error: 'Please fill in all fields',
        };
    }

    if (password.length < 8) {
        return {
            error: 'Password must be at least 8 characters long',
        };
    }

    if (password !== confirmPassword) {
        return {
            error: 'Passwords do not match',
        };
    }

    // إعداد Appwrite client
    const client = new Client();
    client
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
        .setKey(process.env.NEXT_APPWRITE_KEY);

    const users = new Users(client);
    try {
        // التحقق من أن الاسم موجود
        const response = await users.list();
        const existingUserByName = response.users.find(user => user.name === name);
        if (existingUserByName) {
            return {
                error: 'Name already exists. Please choose a different name.',
            };
        }

        // التحقق من وجود البريد الإلكتروني
        const existingUserByEmail = response.users.find(user => user.email === email);
        if (existingUserByEmail) {
            return {
                error: 'Email already exists. Please choose a different email.',
            };
        }

        const { account } = await createAdminClient();

        // إنشاء المستخدم الجديد
        await account.create(ID.unique(), email, password, name);

        return {
            success: true,
        };
    } catch (error) {
        console.error('Registration Error:', error);
        return {
            error: 'Could not register user. Please check your details and try again.',
        };
    }
}

export default createUser;
