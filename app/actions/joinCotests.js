'use server';
import { createAdminClient } from '@/config/appwrite';
import checkAuth from './checkAuth';
import { ID } from 'node-appwrite';

async function joinContestWithDetails(contestId) {
    const { databases } = await createAdminClient();
    const { user } = await checkAuth();
    if (!user) {
        return { error: 'You must be logged in to join the contest.' };
    }

    // Get the current timestamp for 'finished_at' and 'time_taken'
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in Unix timestamp format

    // إنشاء مستند جديد في مجموعة المشاركين
    await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PARTICIPANTS, // معرف مجموعة المشاركين
        ID.unique(),
        {
            contest_id: contestId,
            user_id: user.id,
            total_typed: 0, // يبدأ من 0
            errors: 0, // يبدأ من 0

            userName: user.name
        }
    );

    return { success: true, message: 'You have successfully joined the contest.' };
}

export default joinContestWithDetails;
