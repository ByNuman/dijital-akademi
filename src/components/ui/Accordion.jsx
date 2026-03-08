import { useState } from "react";
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
                            <div
                                className={`p-1 rounded-full shrink-0 transition-all duration-200 ${isOpen ? "bg-brand-gold/20 text-brand-gold rotate-180" : "bg-white/5 text-gray-400 rotate-0"
                                    }`}
                            >
                                <ChevronDown className="w-5 h-5" />
                            </div>
                        </button>

                        <div
                            className={`transition-all duration-200 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                        >
                            <div className="px-6 pb-6 pt-0 text-gray-400 text-base leading-relaxed">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Accordion;
