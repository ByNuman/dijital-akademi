import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Play, BookOpen, Users, Award, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CoursesContext";

const dersler = [
    "ARAP DİLİ VE EDEBİYATI",
    "DİN PSİKOLOJİSİ",
    "DİN SOSYOLOJİSİ",
    "FELSEFE TARİHİ",
    "HADİS",
    "İSLAM HUKUK USULÜ",
    "İSLAM TARİHİ",
    "KELAM TARİHİ",
    "ÖĞRETİM İLKE VE YÖNTEMLERİ",
    "TEFSİR"
];

export function HeroSection() {
    const [currentDersIndex, setCurrentDersIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { courses } = useCourses();

    const totalModules = courses.reduce((acc, course) => acc + (course.modules?.length || 0), 0);

    const cycleDers = useCallback(() => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentDersIndex((prevIndex) => (prevIndex + 1) % dersler.length);
            setIsAnimating(false);
        }, 400);
    }, []);

    useEffect(() => {
        const interval = setInterval(cycleDers, 3500);
        return () => clearInterval(interval);
    }, [cycleDers]);

    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-brand-black">
            {/* Premium Background */}
            <div className="absolute inset-0 z-0">
                {/* Background effects */}
                
                {/* Gradient orbs */}
                <div className="absolute top-1/3 right-[-5%] w-[700px] h-[700px] bg-brand-gold/[0.04] blur-[180px] rounded-full pointer-events-none animate-float"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-gold/[0.03] blur-[150px] rounded-full pointer-events-none animate-float" style={{ animationDelay: '3s' }}></div>
                <div className="absolute top-[-5%] left-[40%] w-[300px] h-[300px] bg-amber-500/[0.02] blur-[120px] rounded-full pointer-events-none animate-float" style={{ animationDelay: '5s' }}></div>
                
                {/* Decorative lines */}
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand-gold/[0.06] to-transparent"></div>
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-brand-gold/[0.04] to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="max-w-5xl w-full flex flex-col items-center">


                        {/* Main Heading */}
                        <div className="mb-8 w-full">
                            <h1 className="text-4xl md:text-5xl lg:text-[68px] font-black text-white leading-[1.1] flex flex-col items-center w-full">
                                <span className="block mb-3 text-center font-serif tracking-tight drop-shadow-[0_2px_20px_rgba(255,255,255,0.05)]">Geleceğini İnşa Et,</span>
                                <div className="relative flex justify-center items-center min-h-[80px] md:min-h-[100px] lg:min-h-[120px] w-full my-2 overflow-visible">
                                    <span 
                                        className={`text-gold-gradient text-[30px] md:text-[42px] lg:text-[54px] leading-[1.2] drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] text-center px-4 max-w-full font-serif italic transition-all duration-400 ${isAnimating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}
                                    >
                                        {dersler[currentDersIndex]}
                                    </span>
                                </div>
                                <span className="block mt-3 text-center font-serif tracking-tight drop-shadow-[0_2px_20px_rgba(255,255,255,0.05)]">Öğrenmeye Başla</span>
                            </h1>
                        </div>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-12 max-w-2xl font-light tracking-wide">
                            Tefsir'den İslam Felsefesi'ne kadar geniş bir yelpazede, modern teknolojiyle harmanlanmış, fütüristik ve etkileşimli premium dijital akademi.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                            {!currentUser && (
                                <Button 
                                    onClick={() => navigate('/login')} 
                                    variant="primary" 
                                    className="text-base px-10 py-4 !rounded-xl font-bold shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.5)] transition-all group"
                                >
                                    Hemen Başla
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            )}
                            <Button 
                                onClick={() => navigate('/courses')} 
                                variant="outline" 
                                className="text-base px-10 py-4 !rounded-xl group flex items-center gap-3 backdrop-blur-md bg-white/[0.03] border-white/10 hover:border-brand-gold/40 hover:bg-white/[0.06] transition-all"
                            >
                                <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold transition-colors">
                                    <Play className="w-4 h-4 text-brand-gold group-hover:text-brand-black ml-0.5" />
                                </div>
                                Dersleri İncele
                            </Button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent z-20 pointer-events-none"></div>
        </section>
    );
}
