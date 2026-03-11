import { ShieldCheck, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="bg-[#101010] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-16">
                    <div className="md:col-span-12 lg:col-span-4">
                        <Link to="/" className="flex items-center gap-4 mb-6 group cursor-pointer w-fit">
                            <div className="relative">
                                <img 
                                    src="/logo.png" 
                                    alt="Dijital Akademi Logo" 
                                    className="h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_25px_rgba(251,191,36,0.8)] group-hover:scale-105" 
                                />
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-brand-gold to-brand-gold bg-clip-text text-transparent opacity-90 group-hover:opacity-100 transition-all duration-300">
                                Dijital Akademi
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            İlim yolculuğunda sınırları kaldıran fütüristik akademi platformu. Premium bir eğitim deneyimi, evinizin konforunda.
                        </p>
                        <div className="flex items-center text-brand-gold/90 text-sm font-medium bg-brand-gold/5 w-fit px-4 py-2 rounded-full border border-brand-gold/10 hover:bg-brand-gold/10 transition-colors">
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            100% Güvenli Platform
                        </div>
                    </div>

                    <div className="md:col-span-5 lg:col-span-3 lg:col-start-6">
                        <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Bağlantılar</h4>
                        <ul className="flex flex-col gap-4 text-sm text-gray-400">
                            <li>
                                <Link to="/nasil-kullanilir" className="hover:text-brand-gold transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50"></span>
                                    Site Nasıl Kullanılır?
                                </Link>
                            </li>
                            <li>
                                <Link to="/kvkk" className="hover:text-brand-gold transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50"></span>
                                    KVKK Aydınlatma Metni
                                </Link>
                            </li>
                            <li>
                                <Link to="/sss" className="hover:text-brand-gold transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50"></span>
                                    Sıkça Sorulan Sorular
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-7 lg:col-span-4">
                        <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Bize Ulaşın</h4>
                        <form className="flex flex-col gap-3" onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target;
                            const btn = form.querySelector('button[type="submit"]');
                            
                            try {
                                btn.disabled = true;
                                btn.innerHTML = '<span class="flex items-center justify-center gap-2"><div class="w-4 h-4 border-2 border-[#101010]/30 border-t-[#101010] rounded-full animate-spin"></div> Gönderiliyor...</span>';
                                
                                const formData = new FormData(form);
                                const data = {
                                    Ad: formData.get('Ad'),
                                    Soyad: formData.get('Soyad'),
                                    Email: formData.get('Email'),
                                    Mesaj: formData.get('Mesaj'),
                                    _subject: "Dijital Akademi - Yeni İletişim Mesajı"
                                };

                                const response = await fetch("https://formsubmit.co/ajax/dijitalakademi.resmi@gmail.com", {
                                    method: "POST",
                                    headers: { 
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'
                                    },
                                    body: JSON.stringify(data)
                                });

                                if (response.ok) {
                                    // Make sure toast is imported, let's just use alert or custom if toast isn't available
                                    // we can dynamically import react-hot-toast or sonner, but let's assume sonner is used elsewhere since we saw Toaster in App.jsx
                                    // Actually, we'll just check if sonner can be imported. We didn't import it in standard way, so let's import toast up top. Wait, we can't import easily with replace_file_content in the middle of the file.
                                    // I will use a simple alert if we don't have toast, or just use dynamic import.
                                    const { toast } = await import('sonner');
                                    toast.success('Mesajınız başarıyla gönderildi. İlk kullanımda aktivasyon e-postası gelmiş olabilir!');
                                    form.reset();
                                } else {
                                    const { toast } = await import('sonner');
                                    toast.error('Göderim başarısız oldu. Lütfen daha sonra tekrar deneyin.');
                                }
                            } catch (error) {
                                const { toast } = await import('sonner');
                                toast.error('Bağlantı hatası. Lütfen ağınızı kontrol edin.');
                            } finally {
                                btn.disabled = false;
                                btn.innerHTML = 'Gönder';
                            }
                        }}>
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" name="Ad" placeholder="Adınız" className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors w-full" required />
                                <input type="text" name="Soyad" placeholder="Soyadınız" className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors w-full" required />
                            </div>
                            <input type="email" name="Email" placeholder="E-Posta Adresiniz" className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors w-full" required />
                            <textarea name="Mesaj" placeholder="Nasıl yardımcı olabiliriz?" rows="3" className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors w-full resize-none" required></textarea>
                            <input type="hidden" name="_captcha" value="false" />
                            <button type="submit" className="bg-brand-gold hover:bg-brand-gold-light text-[#101010] font-semibold py-2.5 rounded-xl transition-all w-full mt-1 disabled:opacity-70 disabled:cursor-not-allowed">
                                Gönder
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Antigravity Dijital Akademi. Tüm hakları saklıdır.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="/gizlilik-politikasi" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
                        <Link to="/cerez-politikasi" className="hover:text-white transition-colors">Çerez Politikası</Link>
                        <Link to="/kullanim-sartlari" className="hover:text-white transition-colors">Kullanım Şartları</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
