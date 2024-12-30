'use server';
import { createAdminClient } from '@/config/appwrite';
import checkAuth from './checkAuth';
import { Query } from 'node-appwrite';
async function saveResulte({ contestId, total_typed, errors }) {
    const { databases } = await createAdminClient();
    const { user } = await checkAuth();

    if (!user) {
        console.error('User authentication failed.');
        return { error: 'Authentication failed. Please log in to save your results.' };
    }


    const result = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PARTICIPANTS,
        [Query.equal('contest_id', contestId),
        Query.equal('user_id', user.id)
        ]
    );

    if (result.total === 0) {
        console.warn('No record found for the given contest and user.', { contestId, userId: user.id });
        return { error: 'No participation record found for this contest. Please ensure you have joined the contest.' };
    }

    const documentId = result.documents[0].$id;
    console.log('Updating document with ID:', documentId);
    await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PARTICIPANTS,
        documentId,
        { total_typed: total_typed || 0, errors: errors || 0 }
    );

    return { success: true, message: 'Your results were successfully saved and updated!' };

}

export default saveResulte;
