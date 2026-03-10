import { useState, useEffect, useRef } from "react";
import { Menu, X, Sparkles, Bell, User, BookOpen, Award, Settings, LogOut, Trophy, ShieldAlert, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { studentData } from "../../data/studentData";
import { useAuth } from "../../context/AuthContext";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { currentUser, userData, logoutUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await logoutUser();
            setIsProfileOpen(false);
            setIsMobileMenuOpen(false);
            navigate("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

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
        ...(userData?.role === 'admin' ? [{ name: "Yönetici Paneli", href: "/admin", icon: ShieldAlert }] : []),
        { name: "Öğrenci Paneli", href: "/dashboard", icon: BookOpen },
        { name: "Liderlik Tablosu", href: "/leaderboard", icon: Trophy },
        { name: "Profil Ayarları", href: "/profile", icon: Settings },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-[#101010]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Mobile Back Button */}
                    {location.pathname !== '/' && (
                        <button 
                            onClick={() => navigate(-1)}
                            className="md:hidden text-gray-400 hover:text-white p-1 -ml-2"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    )}
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative">
                            <img 
                                src="/logo.png" 
                                alt="Dijital Akademi Logo" 
                                className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_25px_rgba(251,191,36,0.8)] group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-brand-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <span className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-brand-gold to-brand-gold bg-clip-text text-transparent opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300 origin-left">
                            Dijital Akademi
                        </span>
                    </Link>
                </div>

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
                    {currentUser ? (
                        <>
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

                                {isProfileOpen && (
                                    <div
                                        className="absolute right-0 top-full mt-3 w-64 bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden"
                                    >
                                        <div className="px-4 py-3 border-b border-white/5 mb-2">
                                            <div className="text-white font-bold">{userData?.name || "Kullanıcı"}</div>
                                            <div className="text-sm text-brand-gold">{userData?.role === 'admin' ? 'Yönetici' : 'Öğrenci Hesabı'}</div>
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
                                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                                                <LogOut className="w-4 h-4" />
                                                Oturumu Kapat
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Giriş Yap</Link>
                            <Link to="/register">
                                <Button variant="primary" className="text-sm py-2 px-4 h-10 flex items-center justify-center">Kayıt Ol</Button>
                            </Link>
                        </div>
                    )}
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
            {isMobileMenuOpen && (
                <div
                    className="md:hidden bg-[#101010]/95 backdrop-blur-xl border-b border-white/5 border-t border-t-white/5 absolute top-full left-0 right-0 overflow-hidden shadow-2xl"
                >
                    <div className="py-6 px-6 flex flex-col gap-2">
                        {/* Mobile User Info */}
                        {currentUser ? (
                            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
                                <div className="w-12 h-12 rounded-full border border-brand-gold/50 p-0.5 overflow-hidden">
                                    <img src={studentData.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-white font-bold text-lg">{userData?.name || "Kullanıcı"}</div>
                                    <div className="text-brand-gold text-sm">{userData?.role === 'admin' ? 'Yönetici' : 'Öğrenci Hesabı'}</div>
                                </div>
                                <button className="p-2 text-gray-400 hover:text-white relative">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-brand-gold rounded-full"></span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-white/5">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center">Giriş Yap</Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="primary" className="w-full justify-center text-sm py-2">Kayıt Ol</Button>
                                </Link>
                            </div>
                        )}

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

                        {currentUser && (
                            <>
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

                                <button onClick={handleLogout} className="text-lg flex items-center gap-3 font-medium py-3 text-red-500 hover:text-red-400 mt-2 w-full text-left">
                                    <LogOut className="w-5 h-5" />
                                    Oturumu Kapat
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
