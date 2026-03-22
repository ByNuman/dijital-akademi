import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

export function FinalCTA() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    if (currentUser) {
        return null;
    }

    return (
        <section className="py-40 relative bg-brand-black overflow-hidden group">
            {/* Premium background effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-brand-gold/[0.08] blur-[200px] rounded-full pointer-events-none group-hover:bg-brand-gold/[0.12] transition-colors duration-1000"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent shadow-[0_0_15px_rgba(212,175,55,0.2)]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-brand-gold/[0.08] border border-brand-gold/20 text-brand-gold text-xs font-black uppercase tracking-[0.2em] mb-12 shadow-[0_0_30px_rgba(212,175,55,0.15)] animate-bounce-slow">
                        <Sparkles className="w-4 h-4" />
                        Ücretsiz İlim Platformu
                    </div>
                    
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-10 leading-[1.1] tracking-tighter">
                        Sen de <span className="text-gold-gradient font-serif italic pr-4">İlim Yolculuğuna</span> Hemen Katıl
                    </h2>
                    
                    <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
                        Seçkin akademik kadromuzla, geleceğin dindar, aydınlık ve vizyoner nesillerini yetiştiren bu kutsal kervanda yerinizi şimdi ayırtın.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                        <Button 
                            variant="primary" 
                            className="w-full sm:w-auto text-lg px-12 py-6 !rounded-[2rem] font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_60px_rgba(212,175,55,0.5)] transform hover:-translate-y-1 transition-all duration-500 group/btn"
                            onClick={() => navigate('/register')}
                        >
                            ÜCRETSİZ KAYDOL
                            <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-2 transition-transform duration-500" />
                        </Button>
                        <button 
                            className="group flex items-center gap-4 text-white hover:text-brand-gold transition-all duration-500 font-black uppercase tracking-[0.2em] text-sm"
                            onClick={() => navigate('/courses')}
                        >
                            <span className="w-12 h-px bg-white/20 group-hover:w-16 group-hover:bg-brand-gold transition-all duration-500"></span>
                            DERSLERİ KEŞFEDİN
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Artistic element at bottom */}
            <div className="mt-20 flex justify-center opacity-10">
                 <div className="text-[12rem] font-serif italic text-brand-gold select-none pointer-events-none transform translate-y-1/2">
                    Akademi
                 </div>
            </div>
        </section>
    );
}
