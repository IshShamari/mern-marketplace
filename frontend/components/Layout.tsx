// components/Layout.tsx

import Navbar from './Navbar';

interface LayoutProps {
    children: any
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto p-4">{children}</main>
        </div>
    );
}

export default Layout;
