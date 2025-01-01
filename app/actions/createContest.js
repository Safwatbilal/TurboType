'use server';

import { createAdminClient } from '@/config/appwrite';
import { ID } from 'node-appwrite';
import checkAuth from './checkAuth';
async function createContest(previousState, formData) {
    const { databases } = await createAdminClient();
    const { user } = await checkAuth()
    const name = formData.get('name');
    const duration = parseInt(formData.get('duration'), 10);
    const dateTime = formData.get('start_date');
    const words = formData.get('word')

    if (name.length > 10) {
        return { error: 'Contest name is less 20 ch' };
    }


    const startDate = new Date(dateTime);


    const currentDate = new Date();


    if (startDate < currentDate) {
        return { error: 'The start date cannot be in the past. Please choose a valid date.' };
    }

    startDate.setHours(startDate.getHours() - 3);

    const contestId = ID.unique();
    const inviteLink = `/contest/${contestId}`;


    const newContest = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CONTESTS,
        contestId,
        {
            name: name,
            duration: duration,
            invite_link: inviteLink,
            created_at: startDate.toISOString(),
            user_id: user.id,
            word: words,
        }
    );


    return {
        success: true,
        invite_link: inviteLink,
    };
}

export default createContest;
