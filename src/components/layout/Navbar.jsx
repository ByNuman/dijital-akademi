import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Tüm Dersler", href: "/courses" },
        { name: "Öğrenci Paneli", href: "/dashboard" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-[#101010]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 cursor-pointer group">
                    <img src="/logo.png" alt="Dijital Akademi Logo" className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_25px_rgba(251,191,36,0.7)]" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`text-[15px] font-medium transition-colors relative group ${link.special ? "text-brand-gold hover:text-brand-gold-dark flex items-center gap-1.5" : "text-gray-300 hover:text-white"
                                }`}
                        >
                            {link.special && (
                                <motion.span
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <Sparkles className="w-4 h-4" />
                                </motion.span>
                            )}
                            {link.name}
                            <span className={`absolute -bottom-1.5 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full ${link.special ? 'w-full opacity-60' : ''}`}></span>
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-5">
                    <Link to="/login" className="text-[15px] font-medium text-gray-300 hover:text-brand-gold transition-colors">
                        Giriş Yap
                    </Link>
                    <Link to="/register">
                        <Button variant="primary" className="px-6 py-2.5 min-h-0 h-10 rounded-full font-bold shadow-[0_4px_15px_rgba(251,191,36,0.3)] hover:shadow-[0_6px_25px_rgba(251,191,36,0.5)] transition-all">
                            Kaydol
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, borderTopColor: "transparent" }}
                        animate={{ opacity: 1, height: 'auto', borderTopColor: "rgba(255,255,255,0.05)" }}
                        exit={{ opacity: 0, height: 0, borderTopColor: "transparent" }}
                        className="md:hidden bg-[#101010]/95 backdrop-blur-xl border-b border-white/5 border-t absolute top-full left-0 right-0 overflow-hidden shadow-2xl"
                    >
                        <div className="py-6 px-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-lg font-medium py-3 border-b border-white/5 ${link.special ? "text-brand-gold flex items-center gap-2" : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    {link.special && <Sparkles className="w-5 h-5" />}
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-4 mt-6">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center py-3">Giriş Yap</Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="primary" className="w-full justify-center py-3">Kaydol</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
