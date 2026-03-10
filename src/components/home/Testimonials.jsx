import { TestimonialCard } from "../ui/TestimonialCard";
import { testimonials } from "../../data/mockData";

export function Testimonials() {
    return (
        <section className="py-24 relative bg-[#101010] overflow-hidden" id="yorumlar">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                
                {/* Testimonials */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#1A1A1A] border border-white/10 text-brand-gold text-sm font-bold mb-6 tracking-wide shadow-lg">
                        ÖĞRENCİ YORUMLARI
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Öğrencilerimiz <span className="bg-gradient-to-r from-white via-brand-gold to-brand-gold bg-clip-text text-transparent">Ne Diyor?</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
