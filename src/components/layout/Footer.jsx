import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#101010] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6 group cursor-pointer w-fit">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center text-brand-black font-black text-xl shadow-[0_0_15px_rgba(251,191,36,0.3)] group-hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all">
                                A
                            </div>
                            <span className="text-white text-lg font-black tracking-widest uppercase">
                                Antigravity
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            İlim yolculuğunda sınırları kaldıran fütüristik akademi platformu. Premium bir eğitim deneyimi, evinizin konforunda.
                        </p>
                        <div className="flex items-center text-brand-gold/90 text-sm font-medium bg-brand-gold/5 w-fit px-4 py-2 rounded-full border border-brand-gold/10">
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            100% Güvenli Platform
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Kategoriler</h4>
                        <ul className="flex flex-col gap-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-brand-gold transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50"></span>Temel İslami İlimler</a></li>
                            <li><a href="#" className="hover:text-brand-gold transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50"></span>Din Bilimleri</a></li>
                            <li><a href="#" className="hover:text-brand-gold transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50"></span>İslam Felsefesi</a></li>
                            <li><a href="#" className="hover:text-brand-gold transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50"></span>Mantık & Düşünce</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Öğrenci</h4>
                        <ul className="flex flex-col gap-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-brand-gold transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50"></span>Nasıl Çalışır?</a></li>
                            <li><a href="#" className="hover:text-brand-gold transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50"></span>Eğitmenlerimiz</a></li>
                            <li><a href="#" className="hover:text-brand-gold transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50"></span>Vize Özel Programı</a></li>
                            <li><a href="#" className="hover:text-brand-gold transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50"></span>Sıkça Sorulan Sorular</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg tracking-wide">İletişim</h4>
                        <ul className="flex flex-col gap-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                                <span>Teknoloji Vadisi, İlim Caddesi No:1, İstanbul</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                                <span>+90 (850) 123 45 67</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                                <span>iletisim@antigravity.edu.tr</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Antigravity Dijital Akademi. Tüm hakları saklıdır.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
                        <a href="#" className="hover:text-white transition-colors">Çerez Politikası</a>
                        <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
