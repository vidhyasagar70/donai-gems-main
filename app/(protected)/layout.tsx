"use client";
import { InventoryGuard } from "@/components/guards/InventoryGuard";
import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <InventoryGuard>
                <div>{children}</div>
            </InventoryGuard>
        </>
    );
};

export default ProtectedLayout;
