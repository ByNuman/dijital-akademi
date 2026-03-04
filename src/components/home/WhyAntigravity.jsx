import { motion } from "framer-motion";
import { FeatureItem } from "../ui/FeatureItem";
import { features } from "../../data/mockData";

export function WhyAntigravity() {
    return (
        <section className="py-24 relative bg-[#101010]" id="neden-biz">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-brand-slate border border-white/10 text-brand-gold text-sm font-semibold mb-6"
                    >
                        Farkımız
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-white mb-6"
                    >
                        Neden <span className="text-brand-gold">Antigravity?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Sıradan eğitim platformlarının ötesine geçin. Geleceğin ilahiyat dijital akademisinde sizi bekleyen ayrıcalıklar.
                    </motion.p>
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
