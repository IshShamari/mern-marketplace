// components/Navbar.tsx

import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/login" legacyBehavior>
                            <a className="hover:text-blue-300">Login</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/register" legacyBehavior>
                            <a className="hover:text-blue-300">Register</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/products" legacyBehavior>
                            <a className="hover:text-blue-300">Products</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/orders" legacyBehavior>
                            <a className="hover:text-blue-300">Orders</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
