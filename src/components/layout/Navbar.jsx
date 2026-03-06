import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Bell, User, BookOpen, Award, Settings, LogOut, Trophy, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { studentData } from "../../data/studentData";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinks = [
        { name: "Tüm Dersler", href: "/courses" },
        { name: "Soru & Cevap", href: "/community" },
        { name: "Makaleler", href: "/blog" },
    ];

    const profileLinks = [
        { name: "Yönetici Paneli", href: "/admin", icon: ShieldAlert },
        { name: "Öğrenci Paneli", href: "/dashboard", icon: BookOpen },
        { name: "Liderlik Tablosu", href: "/leaderboard", icon: Trophy },
        { name: "Sertifikalarım", href: "/certificates", icon: Award },
        { name: "Profil Ayarları", href: "/profile", icon: Settings },
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
                            className="text-[15px] font-medium transition-colors relative group text-gray-300 hover:text-white"
                        >
                            {link.name}
                            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </div>

                {/* Logged In User Actions */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Notifications */}
                    <button className="relative text-gray-400 hover:text-white transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-gold rounded-full border-2 border-[#101010]"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 focus:outline-none"
                        >
                            <div className="w-10 h-10 rounded-full border-2 border-brand-gold/50 p-0.5 overflow-hidden transition-all hover:border-brand-gold">
                                <img src={studentData.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                            </div>
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-3 w-64 bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden"
                                >
                                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                                        <div className="text-white font-bold">{studentData.name}</div>
                                        <div className="text-sm text-brand-gold">Öğrenci Hesabı</div>
                                    </div>

                                    {profileLinks.map((link) => {
                                        const Icon = link.icon;
                                        return (
                                            <Link
                                                key={link.name}
                                                to={link.href}
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-brand-gold hover:bg-white/5 transition-colors"
                                            >
                                                <Icon className="w-4 h-4" />
                                                {link.name}
                                            </Link>
                                        );
                                    })}

                                    <div className="border-t border-white/5 mt-2 pt-2">
                                        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                                            <LogOut className="w-4 h-4" />
                                            Oturumu Kapat
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
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
                        <div className="py-6 px-6 flex flex-col gap-2">
                            {/* Mobile User Info */}
                            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
                                <div className="w-12 h-12 rounded-full border border-brand-gold/50 p-0.5 overflow-hidden">
                                    <img src={studentData.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-white font-bold text-lg">{studentData.name}</div>
                                    <div className="text-brand-gold text-sm">Öğrenci Hesabı</div>
                                </div>
                                <button className="p-2 text-gray-400 hover:text-white relative">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-brand-gold rounded-full"></span>
                                </button>
                            </div>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium py-3 text-gray-300 hover:text-white"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="h-px bg-white/5 my-2"></div>

                            {profileLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg flex items-center gap-3 font-medium py-3 text-gray-400 hover:text-white"
                                    >
                                        <Icon className="w-5 h-5" />
                                        {link.name}
                                    </Link>
                                );
                            })}

                            <button className="text-lg flex items-center gap-3 font-medium py-3 text-red-500 hover:text-red-400 mt-2">
                                <LogOut className="w-5 h-5" />
                                Oturumu Kapat
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
