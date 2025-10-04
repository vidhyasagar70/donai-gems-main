"use client";
import React from "react";
import { ReactLenis, useLenis } from "lenis/react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const lenis = useLenis((lenis) => {
        // called every scroll
        console.log(lenis);
    });

    return (
        <>
            {/* <ReactLenis root /> */}
            <div>{children}</div>
        </>
    );
};

export default ProtectedLayout;
