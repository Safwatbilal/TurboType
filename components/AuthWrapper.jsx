'use client';
import { AuthProvider } from '@/store/avibilty';

export default function AuthWrapper({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
