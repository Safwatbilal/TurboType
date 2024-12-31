'use server';
import { Users, Client } from 'node-appwrite';

async function checkName(name) {
    const client = new Client();
    client
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
        .setKey(process.env.NEXT_APPWRITE_KEY);
    if (name === '') {
        return '';
    }
    const users = new Users(client);

    try {
        const response = await users.list();
        const existingUserByName = response.users.find(user => user.name === name);

        if (existingUserByName) {
            return 'not';
        }
    } catch (error) {
        console.error('Error checking name:', error);
        return 'Could not check the name. Please try again later.';
    }

    return 'sure';
}

export default checkName;
