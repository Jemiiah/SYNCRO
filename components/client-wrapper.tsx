"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ClientWrapperProps {
    children: (props: {
        darkMode: boolean;
        isClient: boolean;
        toggleTheme: () => void;
    }) => React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Use resolvedTheme to get the actual theme (handles system theme)
    const darkMode = resolvedTheme === "dark";

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return <>{children({ darkMode, isClient, toggleTheme })}</>;
}
