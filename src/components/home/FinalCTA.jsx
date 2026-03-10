import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function FinalCTA() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    if (currentUser) {
        return null;
    }

    return (
        <section className="py-32 relative bg-[#101010] border-t border-white/5">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#141414] to-[#101010]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-gold/10 blur-[150px] rounded-full pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                <h2
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8"
                >
                    Sen de <span className="text-brand-gold">İlim Yolculuğuna</span> Katıl
                </h2>
                <p
                    className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                    Seçkin akademik kadromuzla, geleceğin dindar, aydınlık ve vizyoner nesillerini yetiştiren bu benzersiz platformda yerinizi hemen alın.
                </p>
                <div
                    className="flex flex-col sm:flex-row justify-center gap-5"
                >
                    <Button 
                        variant="primary" 
                        className="text-base px-10 py-4 !rounded-xl font-bold shadow-[0_5px_20px_rgba(251,191,36,0.3)] hover:shadow-[0_8px_30px_rgba(251,191,36,0.5)]"
                        onClick={() => navigate('/register')}
                    >
                        Hemen Kaydol
                    </Button>
                </div>
            </div>
        </section>
    );
}
