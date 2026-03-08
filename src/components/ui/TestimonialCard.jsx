import { Star, Quote } from "lucide-react";

export function TestimonialCard({ testimonial, index }) {
    return (
        <div
            className="glass-effect p-8 rounded-3xl border-white/5 relative group transition-all duration-300 hover:border-brand-gold/20 hover:-translate-y-1"
        >
            <div className="absolute top-6 right-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Quote className="w-16 h-16 text-brand-gold" />
            </div>

            <div className="flex text-brand-gold mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current mr-1" />
                ))}
            </div>

            <p className="text-gray-300 relative z-10 leading-relaxed mb-8 italic">
                "{testimonial.comment}"
            </p>

            <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-brand-slate border border-brand-gold/30 flex items-center justify-center text-brand-gold font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                </div>
                <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-brand-gold/80 font-medium text-sm">{testimonial.title}</p>
                </div>
            </div>
        </div>
    );
}
