'use server';

import { createAdminClient } from '@/config/appwrite';
import { ID } from 'node-appwrite';
import checkAuth from './checkAuth';
async function createContest(previousState, formData) {
    const { databases } = await createAdminClient();
    const { user } = await checkAuth()
    const name = formData.get('name');
    const duration = parseInt(formData.get('duration'), 10); // Ensure duration is an integer
    const dateTime = formData.get('start_date'); // Use as-is from the form input
    const words = formData.get('word')

    if (name.length > 20) {
        return { error: 'Contest name is less 20 ch' };
    }

    // Parse the start_date as a Date object
    const startDate = new Date(dateTime);

    // Get the current date and time
    const currentDate = new Date();

    // Check if the start date is before the current date
    if (startDate < currentDate) {
        return { error: 'The start date cannot be in the past. Please choose a valid date.' };
    }

    // Add 3 hours to the start date (if needed)
    startDate.setHours(startDate.getHours()); // Adjust to local timezone or add 3 hours if needed

    // Generate contest ID and invite link
    const contestId = ID.unique();
    const inviteLink = `/contest/${contestId}`;

    // Create the contest document in the database
    const newContest = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CONTESTS,
        contestId,
        {
            name: name,
            duration: duration, // Store the duration as an integer
            invite_link: inviteLink,
            created_at: startDate.toISOString(), // Store the modified start date as ISO string
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
