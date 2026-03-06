import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Bell, Shield, LogOut, CheckCircle2, ChevronRight, Camera } from "lucide-react";
import { Button } from "../components/ui/Button";
import { studentData } from "../data/studentData";
import { toast } from "sonner";

export function Profile() {
    const [activeTab, setActiveTab] = useState("genel");
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            toast.success("Profil bilgileriniz başarıyla güncellendi.", {
                style: { background: "#10B981", color: "#fff", border: "none" }
            });
        }, 1500);
    };

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-64 shrink-0">
                        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 sticky top-28">
                            <div className="flex flex-col gap-2">
                                {[
                                    { id: "genel", label: "Genel Bilgiler", icon: User },
                                    { id: "guvenlik", label: "Güvenlik & Şifre", icon: Lock },
                                    { id: "bildirimler", label: "Bildirim Tercihleri", icon: Bell },
                                    { id: "gizlilik", label: "Gizlilik & İzinler", icon: Shield },
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left ${activeTab === tab.id
                                                    ? "bg-brand-gold/10 text-brand-gold"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {tab.label}
                                            {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                                        </button>
                                    );
                                })}

                                <div className="h-px bg-white/10 my-2"></div>

                                <button className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left text-red-500 hover:bg-red-500/10 hover:text-red-400">
                                    <LogOut className="w-5 h-5" />
                                    Oturumu Kapat
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            {activeTab === "genel" && (
                                <motion.div
                                    key="genel"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8"
                                >
                                    <h2 className="text-2xl font-bold text-white mb-8">Genel Profil Bilgileri</h2>

                                    <div className="flex items-center gap-6 mb-10 pb-10 border-b border-white/10">
                                        <div className="relative group cursor-pointer">
                                            <div className="w-24 h-24 rounded-full border-2 border-brand-gold/50 p-1 overflow-hidden">
                                                <img src={studentData.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover group-hover:blur-sm transition-all" />
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-black/50 p-2 rounded-full backdrop-blur-md">
                                                    <Camera className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1">Profil Fotoğrafı</h3>
                                            <p className="text-sm text-gray-400 mb-3">Önerilen boyut: 500x500px, Maks: 5MB</p>
                                            <div className="flex gap-3">
                                                <Button variant="outline" className="py-2 px-4 min-h-0 text-xs">Fotoğraf Yükle</Button>
                                                <Button variant="outline" className="py-2 px-4 min-h-0 text-xs border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50">Sil</Button>
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSave} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Adınız</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                    <input type="text" defaultValue={studentData.name.split(" ")[0]} className="w-full bg-[#101010] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-colors" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Soyadınız</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                    <input type="text" defaultValue={studentData.name.split(" ")[1]} className="w-full bg-[#101010] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-colors" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">E-Posta Adresi</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input type="email" defaultValue="ahmet.yilmaz@example.com" className="w-full bg-[#101010] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-colors" />
                                            </div>
                                            <p className="text-xs text-brand-gold mt-1 flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> Onaylanmış e-posta adresi
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Özgeçmiş / Biyografi (İsteğe Bağlı)</label>
                                            <textarea
                                                rows="4"
                                                className="w-full bg-[#101010] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-gold/50 transition-colors resize-none"
                                                placeholder="Kendinizden, akademik hedeflerinizden ve ilgi alanlarınızdan bahsedin..."
                                            ></textarea>
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <Button type="submit" variant="primary" className="px-8" disabled={isLoading}>
                                                {isLoading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                                            </Button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {activeTab === "guvenlik" && (
                                <motion.div
                                    key="guvenlik"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8"
                                >
                                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                        Güvenlik ve Şifre
                                    </h2>

                                    <form onSubmit={handleSave} className="space-y-6 max-w-xl">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Mevcut Şifreniz</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input type="password" placeholder="••••••••" className="w-full bg-[#101010] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-colors" />
                                            </div>
                                        </div>

                                        <div className="pt-4 pb-4 border-b border-white/5"></div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Yeni Şifre</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input type="password" placeholder="En az 8 karakter" className="w-full bg-[#101010] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-colors" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Yeni Şifre (Tekrar)</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input type="password" placeholder="Şifrenizi doğrulayın" className="w-full bg-[#101010] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-colors" />
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Button type="submit" variant="primary">Şifreyi Güncelle</Button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {(activeTab === "bildirimler" || activeTab === "gizlilik") && (
                                <motion.div
                                    key="diger"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8"
                                >
                                    <div className="flex flex-col items-center justify-center text-center py-12">
                                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                            <Shield className="w-10 h-10 text-brand-gold" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Yakında Eklenecek</h3>
                                        <p className="text-gray-400 max-w-sm">Bu bölümdeki geliştirmeler devam etmektedir. Profil sayfası Faz 3 güncellemeleri kapsamında geliştiriliyor.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
