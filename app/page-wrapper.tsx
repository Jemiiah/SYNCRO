"use client";

import { ClientWrapper } from "@/components/client-wrapper";
import SubsyncAppContent from "./page-content";

export default function SubsyncApp() {
    return (
        <ClientWrapper>
            {({ darkMode, isClient, toggleTheme }) => (
                <SubsyncAppContent
                    darkMode={darkMode}
                    isClient={isClient}
                    toggleTheme={toggleTheme}
                />
            )}
        </ClientWrapper>
    );
}
