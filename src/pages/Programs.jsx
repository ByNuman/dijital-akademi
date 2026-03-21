import { FileText, Calendar, Globe, Award, Video, BarChart2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Helmet } from "react-helmet-async";
import { BackButton } from "../components/ui/BackButton";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";

export function Programs() {
    const programFeatures = [
        { icon: Calendar, label: "Program Süresi", value: "12 Hafta / 120 Saat" },
        { icon: Globe, label: "Eğitim Dili", value: "Türkçe" },
        { icon: Award, label: "Sertifika", value: "Üniversite Onaylı" },
        { icon: Video, label: "Eğitim Modu", value: "Online (Canlı + Kayıt)" },
        { icon: BarChart2, label: "Zorluk Seviyesi", value: "Başlangıçtan Uzmana" }
    ];

    const handleOpenCurriculum = () => {
        // PDF linki buraya gelecek
        window.open("/mufredat.pdf", "_blank");
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-[#0A0A0A]">
            <Helmet>
                <title>Program Detayları - Dijital Akademi</title>
                <meta name="description" content="Eğitim programımızın detaylarını ve müfredatını inceleyin." />
            </Helmet>
            
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <BackButton />
                        <Breadcrumbs />
                    </div>
                </div>
                <div className="max-w-5xl mx-auto">
                    {/* Hero Section of Program */}
                    <div className="relative rounded-[2rem] overflow-hidden mb-16 border border-white/5 bg-[#111111] p-8 md:p-12 shadow-2xl">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/5 to-transparent pointer-events-none"></div>
                        
                        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <span className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-bold mb-6 tracking-wider uppercase">
                                    Kapsamlı Eğitim Programı
                                </span>
                                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                                    Dijital Dönüşüm & <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-gold-dark">
                                        Yazılım Akademisi
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-400 mb-8 max-w-2xl leading-relaxed">
                                    Sektör lideri eğitmenler eşliğinde, dünya standartlarında bir eğitim deneyimine hazır olun. 
                                    Teoriden pratiğe, projelerle dolu bu program sizi geleceğin teknolojilerine hazırlar.
                                </p>
                                
                                <div className="flex flex-wrap gap-4">
                                    <Button onClick={handleOpenCurriculum} variant="primary" className="h-14 px-8 gap-3 group shadow-[0_0_30px_rgba(251,191,36,0.15)] rounded-2xl">
                                        <FileText className="w-5 h-5 transition-transform group-hover:scale-110" />
                                        Müfredatı İncele (PDF)
                                    </Button>
                                    <Button variant="outline" className="h-14 px-8 border-white/10 hover:border-white/20 rounded-2xl">
                                        Detaylı Bilgi Al
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="w-full lg:w-80 shrink-0">
                                <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <h3 className="text-white font-bold mb-6 border-b border-white/5 pb-4 relative z-10">Program Bilgileri</h3>
                                    <div className="space-y-6 relative z-10">
                                        {programFeatures.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 border border-brand-gold/10">
                                                    <feature.icon className="w-5 h-5 text-brand-gold" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">{feature.label}</p>
                                                    <p className="text-sm font-bold text-white leading-tight">{feature.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Program Content Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Canlı Dersler", desc: "Haftalık canlı oturumlar ile interaktif öğrenme deneyimi." },
                            { title: "Mentor Desteği", desc: "Ödevleriniz ve projeleriniz için uzman mentorlardan birebir geri bildirim." },
                            { title: "Proje Bazlı", desc: "Gerçek dünya senaryolarına dayanan bitirme projesi ile portfolyo oluşturun." }
                        ].map((item, i) => (
                            <div key={i} className="bg-[#111111] border border-white/5 rounded-2xl p-8 hover:border-brand-gold/20 transition-all duration-300">
                                <h4 className="text-brand-gold font-bold mb-4 text-lg">{item.title}</h4>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Programs;
