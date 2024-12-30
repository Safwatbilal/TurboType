'use server';
import { createAdminClient } from '@/config/appwrite';

async function getAllContests() {

    const { databases } = await createAdminClient();

    try {
        // جلب جميع الوثائق من مجموعة المسابقات
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE, // معرف قاعدة البيانات
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CONTESTS // معرف المجموعة
        );

        return {
            success: true,
            contests: response.documents, // قائمة بجميع المسابقات
        };
    } catch (error) {
        console.error('Error fetching contests:', error);
        return {
            error: 'Failed to fetch contests. Please try again.',
        };
    }
}

export default getAllContests;
