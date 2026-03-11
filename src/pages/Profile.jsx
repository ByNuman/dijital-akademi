import { useState, useRef } from "react";

import { User, Mail, Lock, Bell, Shield, LogOut, CheckCircle2, ChevronRight, Camera } from "lucide-react";
import { Button } from "../components/ui/Button";
import { studentData } from "../data/studentData";
import { toast } from "sonner";

export function Profile() {
    const [activeTab, setActiveTab] = useState("genel");
    const [isLoading, setIsLoading] = useState(false);
    const [avatar, setAvatar] = useState(studentData.avatar);
    
    // Form states
    const [formData, setFormData] = useState({
        firstName: studentData.name.split(" ")[0] || "",
        lastName: studentData.name.split(" ")[1] || "",
        email: "ahmet.yilmaz@example.com",
        bio: ""
    });

    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

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

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const MAX_SIZE = 5 * 1024 * 1024; // 5MB

        if (file.size > MAX_SIZE) {
            toast.loading("Fotoğraf boyutu 5MB'dan büyük, otomatik küçültülüyor...", { id: "upload-toast" });
            
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    const MAX_WIDTH = 500;
                    const MAX_HEIGHT = 500;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
                    setAvatar(resizedDataUrl);
                    toast.success("Fotoğraf başarıyla küçültüldü ve eklendi.", { id: "upload-toast" }); // replaces the loading toast
                };
            };
        } else {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatar(event.target.result);
                toast.success("Fotoğraf başarıyla eklendi.");
            };
            reader.readAsDataURL(file);
        }
        
        // Reset input so the same file could be uploaded again if needed
        e.target.value = null;
    };

    const handleDeleteAvatar = () => {
        const placeholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(studentData.name)}&background=FBBF24&color=101010`;
        setAvatar(placeholder);
        toast.success("Profil fotoğrafı kaldırıldı.");
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

                                <button className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left text-red-500 hover:bg-red-500/10 hover:text-red-400" onClick={() => toast.success('Oturum başarıyla kapatıldı.')}>
                                    <LogOut className="w-5 h-5" />
                                    Oturumu Kapat
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <>
                            {activeTab === "genel" && (
                                <div
                                    className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8"
                                >
                                    <h2 className="text-2xl font-bold text-white mb-8">Genel Profil Bilgileri</h2>

                                    <div className="flex items-center gap-6 mb-10 pb-10 border-b border-white/10">
                                        <div className="relative group cursor-pointer" onClick={triggerFileInput}>
                                            <div className="w-24 h-24 rounded-full border-2 border-brand-gold/50 p-1 overflow-hidden">
                                                <img src={avatar} alt="Avatar" className="w-full h-full rounded-full object-cover group-hover:blur-sm transition-all" />
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
                                                <input 
                                                    type="file" 
                                                    ref={fileInputRef} 
                                                    onChange={handleImageUpload} 
                                                    accept="image/*" 
                                                    className="hidden" 
                                                />
                                                <Button type="button" variant="outline" className="py-2 px-4 min-h-0 text-xs" onClick={triggerFileInput}>
                                                    Fotoğraf Yükle
                                                </Button>
                                                <Button type="button" variant="outline" className="py-2 px-4 min-h-0 text-xs border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50" onClick={handleDeleteAvatar}>
                                                    Sil
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSave} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Adınız</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                    <input 
                                                        type="text" 
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#101010] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-colors" 
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Soyadınız</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                    <input 
                                                        type="text" 
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#101010] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-colors" 
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">E-Posta Adresi</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input 
                                                    type="email" 
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#101010] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-colors" 
                                                />
                                            </div>
                                            <p className="text-xs text-brand-gold mt-1 flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> Onaylanmış e-posta adresi
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Özgeçmiş / Biyografi (İsteğe Bağlı)</label>
                                            <textarea
                                                rows="4"
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleInputChange}
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
                                </div>
                            )}

                            {activeTab === "guvenlik" && (
                                <div
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
                                </div>
                            )}

                            {(activeTab === "bildirimler" || activeTab === "gizlilik") && (
                                <div
                                    className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8"
                                >
                                    <div className="flex flex-col items-center justify-center text-center py-12">
                                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                            <Shield className="w-10 h-10 text-brand-gold" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Yakında Eklenecek</h3>
                                        <p className="text-gray-400 max-w-sm">Bu bölümdeki geliştirmeler devam etmektedir. Profil sayfası Faz 3 güncellemeleri kapsamında geliştiriliyor.</p>
                                    </div>
                                </div>
                            )}
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
