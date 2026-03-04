import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-brand-black selection:bg-brand-gold selection:text-brand-black overflow-x-hidden">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
