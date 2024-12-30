// app/actions/getSingleContest.js
import { createAdminClient } from '@/config/appwrite';
import { Query } from 'node-appwrite';
export default async function getSingleContest(id) {
    const { databases } = createAdminClient();

    // جلب تفاصيل المسابقة
    const contest = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CONTESTS,
        id
    );

    // جلب المشاركين في المسابقة
    const participants = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PARTICIPANTS,
        [
            Query.equal('contest_id', id)
        ]
    );

    return { contest, participants };
}
