'use server';
import { createAdminClient } from '@/config/appwrite';
import checkAuth from './checkAuth';
import { Query } from 'node-appwrite';
async function safwat({ contestId }) {
    const { databases } = await createAdminClient();
    const { user } = await checkAuth();
    console.log(contestId)
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


    return { result };

}

export default safwat;
