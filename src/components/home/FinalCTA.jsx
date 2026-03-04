import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export function FinalCTA() {
    return (
        <section className="py-32 relative bg-[#101010] border-t border-white/5">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#141414] to-[#101010]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-gold/10 blur-[150px] rounded-full pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8"
                >
                    Sen de <span className="text-brand-gold">İlim Yolculuğuna</span> Katıl
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                    Seçkin akademik kadromuzla, geleceğin dindar, aydınlık ve vizyoner nesillerini yetiştiren bu benzersiz platformda yerinizi hemen alın.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row justify-center gap-5"
                >
                    <Button variant="primary" className="text-base px-10 py-4 !rounded-xl font-bold shadow-[0_5px_20px_rgba(251,191,36,0.3)] hover:shadow-[0_8px_30px_rgba(251,191,36,0.5)]">
                        Hemen Kaydol
                    </Button>
                    <Button variant="outline" className="text-base px-10 py-4 !rounded-xl font-bold bg-brand-slate group">
                        Detaylı Bilgi Al
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
