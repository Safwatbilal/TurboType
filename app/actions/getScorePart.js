'use server';
import { createAdminClient } from '@/config/appwrite';
import checkAuth from './checkAuth';
import { Query } from 'node-appwrite';
async function getScorePart({ name }) {
    const { databases } = await createAdminClient();
    const { user } = await checkAuth();


    const result = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PARTICIPANTS,
        [
            Query.equal('userName', name)
        ]
    );
    return { result }
}
export default getScorePart;