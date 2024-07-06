import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/NavBar";
import React from "react";

const LoginPage = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-900">
            <Navbar />
            <div className="flex-grow flex justify-center items-center">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
