import { useState, useEffect, useCallback } from "react";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLandingAuth, setShowLandingAuth] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [authLoading, setAuthLoading] = useState(false);

    // Check authentication status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authStatus = localStorage.getItem(
                    "subsync_authenticated"
                );
                if (authStatus === "true") {
                    setIsAuthenticated(true);
                    setShowLandingAuth(false);
                    // Check if user has completed onboarding
                    const onboardingCompleted = localStorage.getItem(
                        "onboarding_completed"
                    );
                    if (!onboardingCompleted) {
                        setShowOnboarding(true);
                    }
                }
            } catch (error) {
                console.error("Error checking auth:", error);
            }
        };
        checkAuth();
    }, []);

    const handleLogin = useCallback(
        async (email: string, password: string, onSuccess?: () => void) => {
            setAuthLoading(true);
            setAuthError(null);
            try {
                // Simulate API call - replace with actual Supabase auth
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // For demo purposes, accept any email/password
                // In production, use: const { data, error } = await supabase.auth.signInWithPassword({ email, password })

                localStorage.setItem("subsync_authenticated", "true");
                localStorage.setItem("subsync_user_email", email);
                setIsAuthenticated(true);
                setShowLandingAuth(false);
                setShowOnboarding(false); // Skip onboarding for existing users

                onSuccess?.();
            } catch (error: unknown) {
                setAuthError(
                    error instanceof Error
                        ? error.message
                        : "Failed to sign in. Please try again."
                );
            } finally {
                setAuthLoading(false);
            }
        },
        []
    );

    const handleSignup = useCallback(() => {
        setShowLandingAuth(false);
        setShowOnboarding(true);
        setIsAuthenticated(true); // Set authenticated so they can proceed after onboarding
    }, []);

    return {
        isAuthenticated,
        showLandingAuth,
        showOnboarding,
        authError,
        authLoading,
        setIsAuthenticated,
        setShowLandingAuth,
        setShowOnboarding,
        handleLogin,
        handleSignup,
    };
}
