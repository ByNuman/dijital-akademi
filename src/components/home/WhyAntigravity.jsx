import { FeatureItem } from "../ui/FeatureItem";
import { features } from "../../data/mockData";

export function WhyAntigravity() {
    return (
        <section className="py-24 relative bg-brand-slate" id="neden-biz">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand-black border border-brand-gold/20 text-brand-gold text-sm font-semibold mb-6 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                        Farkımız
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Neden <span className="text-gold-gradient font-serif italic tracking-tight">Antigravity?</span>
                    </h2>
                    <p
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Sıradan eğitim platformlarının ötesine geçin. Geleceğin ilahiyat dijital akademisinde sizi bekleyen ayrıcalıklar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureItem key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
