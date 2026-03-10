import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Play } from "lucide-react";

const dersler = [
    "ARAP DİLİ VE EDEBİYATI 4",
    "DİN PSİKOLOJİSİ",
    "DİN SOSYOLOJİSİ",
    "FELSEFE TARİHİ 2",
    "HADİS 2",
    "İSLAM HUKUK USULÜ 2",
    "İSLAM TARİHİ 3",
    "KELAM TARİHİ",
    "ÖĞRETİM İLKE VE YÖNTEMLERİ",
    "TEFSİR 2"
];

export function HeroSection() {
    const [currentDersIndex, setCurrentDersIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDersIndex((prevIndex) => (prevIndex + 1) % dersler.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
            {/* Background Concept */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#101010]"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50"></div>
                <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 blur-[150px] rounded-full pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="max-w-4xl w-full flex flex-col items-center">


                        <div className="mb-8 w-full">
                            <h1
                                className="text-4xl md:text-5xl lg:text-[64px] font-black text-white leading-tight flex flex-col items-center w-full"
                            >
                                <span className="block mb-2 text-center">Geleceğini İnşa Et,</span>
                                <div className="relative flex justify-center items-center min-h-[90px] md:min-h-[110px] lg:min-h-[130px] w-full my-2 overflow-visible">
                                    <span className="text-transparent text-[32px] md:text-[44px] lg:text-[56px] leading-[1.2] bg-clip-text bg-gradient-to-r from-brand-gold to-brand-gold-dark drop-shadow-[0_0_20px_rgba(251,191,36,0.6)] text-center px-4 max-w-full transition-opacity duration-300">
                                        {dersler[currentDersIndex]}
                                    </span>
                                </div>
                                <span className="block mt-2 text-center">Öğrenmeye Başla</span>
                            </h1>
                        </div>

                        <p
                            className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-xl font-light"
                        >
                            Tefsir'den İslam Felsefesi'ne kadar geniş bir yelpazede, modern teknolojiyle harmanlanmış, fütüristik ve etkileşimli premium dijital akademi.
                        </p>

                        <div
                            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                        >
                            <Button onClick={() => navigate('/login')} variant="primary" className="text-base px-8 py-4 !rounded-xl font-bold shadow-[0_5px_20px_rgba(251,191,36,0.3)] hover:shadow-[0_8px_30px_rgba(251,191,36,0.5)]">
                                Hemen Başla
                            </Button>
                            <Button onClick={() => navigate('/courses')} variant="outline" className="text-base px-8 py-4 !rounded-xl group flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold transition-colors">
                                    <Play className="w-4 h-4 text-brand-gold group-hover:text-brand-black ml-0.5" />
                                </div>
                                Dersleri İncele
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#101010] to-transparent z-20 pointer-events-none"></div>
        </section>
    );
}
