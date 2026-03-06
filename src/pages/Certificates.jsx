import { motion } from "framer-motion";
import { Award, Download, Share2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { studentData } from "../data/studentData";

export function Certificates() {
    const mockCertificates = [
        {
            id: "CERT-2026-001",
            course: "Tarihsel Arka Plan ve İlm-i Kelam",
            date: "14 Mart 2026",
            instructor: "Prof. Dr. Mehmet Emin",
            image: "https://images.unsplash.com/photo-1590076214571-70e6e7d69d41?auto=format&fit=crop&q=80&w=800",
            grade: "AA"
        },
        {
            id: "CERT-2026-002",
            course: "Temel İslami İlimler ve Metodoloji",
            date: "05 Şubat 2026",
            instructor: "Doç. Dr. Ahmet Faruk",
            image: "https://images.unsplash.com/photo-1577908953928-1ce4489ae9b8?auto=format&fit=crop&q=80&w=800",
            grade: "BA"
        }
    ];

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-[#1A1A1A] p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                        <div className="w-20 h-20 bg-brand-gold/10 rounded-2xl flex items-center justify-center border border-brand-gold/20 shrink-0">
                            <Award className="w-10 h-10 text-brand-gold" />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-black text-white mb-2">Başarı Sertifikalarım</h1>
                            <p className="text-gray-400">Tamamladığınız eğitimlerin uluslararası geçerliliğe sahip doğrulama belgeleri.</p>
                        </div>
                    </div>
                </div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {mockCertificates.map((cert, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            key={cert.id}
                            className="bg-[#1A1A1A] rounded-3xl border border-white/5 p-6 flex flex-col sm:flex-row gap-8 group hover:border-brand-gold/30 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.3)] relative overflow-hidden"
                        >
                            {/* Watermark Design */}
                            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                                <Award className="w-64 h-64" />
                            </div>

                            {/* Certificate Preview Thumbnail */}
                            <div className="w-full sm:w-1/3 aspect-[3/4] rounded-xl overflow-hidden relative border border-white/10 shrink-0">
                                <img src={cert.image} alt="Sertifika Arkaplan" className="w-full h-full object-cover filter grayscale blur-[2px] opacity-40 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#101010] to-transparent via-[#1A1A1A]/80 flex flex-col items-center justify-center p-4 text-center">
                                    <ShieldCheck className="w-10 h-10 text-brand-gold mb-3" />
                                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Doğrulama No</div>
                                    <div className="text-xs font-mono text-white/80 align-middle break-all">{cert.id}</div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 flex flex-col py-2 relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Doğrulanmış Başarı</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 leading-tight">{cert.course}</h3>
                                <p className="text-gray-400 text-sm mb-6 flex-1">{cert.instructor} imzalı resmi bitirme belgesi.</p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-xs text-gray-500 font-medium mb-1">Tamamlanma</div>
                                        <div className="font-bold text-white text-sm">{cert.date}</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-xs text-gray-500 font-medium mb-1">Başarı Notu</div>
                                        <div className="font-bold text-brand-gold text-sm">{cert.grade}</div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    <Button variant="primary" className="flex-1 justify-center gap-2 py-2.5 min-h-0 text-sm">
                                        <Download className="w-4 h-4" /> PDF İndir
                                    </Button>
                                    <Button variant="outline" className="px-4 py-2.5 min-h-0">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <div className="bg-[#1A1A1A] border border-white/5 border-dashed rounded-3xl p-10 flex flex-col flex-1 items-center justify-center text-center">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <Award className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Daha Fazla Başarı Edin</h3>
                        <p className="text-gray-400 text-sm max-w-sm mb-6">Kütüphanenizdeki eğitimleri %100 oranında tamamlayarak bu bölüme yeni sertifikalar ekleyebilirsiniz.</p>
                        <Button variant="outline" className="text-sm">Eğitimlerime Dön</Button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Certificates;
