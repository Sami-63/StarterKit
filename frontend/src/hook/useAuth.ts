import { apiClient } from "@/lib/ApiClient";
import { User } from "@/redux/authSlice";
import { useState } from "react";

import { signIn } from "@/redux/authSlice";
import { useDispatch } from "react-redux";

interface LoginProps {
    onLogin?: () => void;
}

export const useLogin = ({ onLogin }: LoginProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await apiClient.post("accounts/public/login/", {
                email,
                password,
            });

            console.log(response);

            if (response.status === 200) {
                const data = response.data;
                const user = data.user as User;
                const token = data.token as string;

                dispatch(signIn({ token, user }));

                onLogin && onLogin();
            } else {
                setError("Invalid email or password");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        login,
    };
};

interface RegisterProps {
    onRegister?: () => void;
}

export const useRegister = ({ onRegister }: RegisterProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const register = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await apiClient.post("accounts/public/register/", {
                name,
                email,
                password,
            });

            console.log(response);

            if (response.status === 201) {
                const data = response.data;
                const user = data.user as User;
                const token = data.token as string;

                dispatch(signIn({ token, user }));

                onRegister && onRegister();
            } else {
                setError("Invalid email or password");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        register,
    };
};
