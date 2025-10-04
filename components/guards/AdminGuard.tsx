"use client";

import { AuthGuard } from "./AuthGuard";

interface AdminGuardProps {
    children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
    return (
        <AuthGuard requireAuth={true} requireRole="ADMIN" redirectTo="/login">
            {children}
        </AuthGuard>
    );
}
