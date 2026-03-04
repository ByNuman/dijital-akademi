import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "../components/ui/Button";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the login logic
        console.log("Login attempted with:", { email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold/10 blur-[150px] rounded-full pointer-events-none"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                        <div className="w-12 h-12 rounded-full border-2 border-brand-gold/30 flex items-center justify-center bg-brand-black/50 group-hover:border-brand-gold transition-colors">
                            <BookOpen className="w-6 h-6 text-brand-gold" />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-black text-white mb-2">Tekrar Hoş Geldiniz</h1>
                    <p className="text-gray-400">Öğrenim serüveninize devam etmek için giriş yapın.</p>
                </div>

                <div className="bg-[#1A1A1A]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(251,191,36,0.05)]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">E-posta Adresi</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-[#101010] border border-white/10 text-white rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all placeholder:text-gray-600"
                                    placeholder="ornek@mail.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-sm font-medium text-gray-300">Şifre</label>
                                <a href="#" className="text-xs text-brand-gold hover:text-white transition-colors">Şifremi Unuttum</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-[#101010] border border-white/10 text-white rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all placeholder:text-gray-600"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button type="submit" variant="primary" className="w-full justify-center py-4 text-base font-bold flex border border-brand-gold/50 items-center gap-2 group mt-2">
                            Giriş Yap
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-gray-400">
                        Hesabınız yok mu?{' '}
                        <Link to="/register" className="text-brand-gold font-bold hover:text-white transition-colors">
                            Hemen Kayıt Olun
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;
