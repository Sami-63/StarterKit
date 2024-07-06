import React, { useRef } from "react";
import Link from "next/link";
import { useLogin } from "@/hook/useAuth";
import { useRouter } from "next/router";

const LoginForm = () => {
    const router = useRouter();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { login, isLoading, error } = useLogin({
        onLogin: () => router.push("/"),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            return;
        }

        login(email, password);
    };

    return (
        <div className="bg-gray-800 p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
                        className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white sm:text-sm bg-gray-900 text-white"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        ref={passwordRef}
                        className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white sm:text-sm bg-gray-900 text-white"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    disabled={isLoading}
                >
                    Login
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <p className="mt-4 text-white">
                {"Don't have an account?"}{" "}
                <Link href="/register">
                    <span className="text-blue-400 hover:underline">
                        Register
                    </span>
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
