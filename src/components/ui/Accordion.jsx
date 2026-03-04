import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Accordion({ items, className = "" }) {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className={`space-y-4 ${className}`}>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className={`bg-[#1A1A1A] border rounded-2xl overflow-hidden transition-colors ${isOpen ? "border-brand-gold/30 shadow-[0_0_20px_rgba(251,191,36,0.05)]" : "border-white/5 hover:border-white/10"
                            }`}
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        >
                            <span className={`font-bold text-lg transition-colors ${isOpen ? "text-brand-gold" : "text-white"
                                }`}>
                                {item.question}
                            </span>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className={`p-1 rounded-full shrink-0 transition-colors ${isOpen ? "bg-brand-gold/20 text-brand-gold" : "bg-white/5 text-gray-400"
                                    }`}
                            >
                                <ChevronDown className="w-5 h-5" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-6 pb-6 pt-0 text-gray-400 text-base leading-relaxed">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

export default Accordion;
