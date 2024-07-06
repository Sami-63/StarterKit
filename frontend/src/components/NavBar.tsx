import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <Link href="/">
                    <p className="text-white text-lg font-bold">Home</p>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
