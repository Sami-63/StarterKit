import Navbar from "@/components/NavBar";
import RegisterForm from "@/components/RegisterForm";

const RegisterPage = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-900">
            <Navbar />
            <div className="flex-grow flex justify-center items-center">
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;
