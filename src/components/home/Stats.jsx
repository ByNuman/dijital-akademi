import React from 'react';
import { Users, BookOpen, GraduationCap, Trophy } from 'lucide-react';

const stats = [
    {
        icon: Users,
        label: 'Aktif Öğrenci',
        value: '10,000+',
        description: 'Türkiye\'nin dört bir yanından'
    },
    {
        icon: BookOpen,
        label: 'Toplam Ders',
        value: '500+',
        description: 'Farklı kategorilerde içerik'
    },
    {
        icon: GraduationCap,
        label: 'Akademik Kadro',
        value: '25+',
        description: 'Alanında uzman hocalar'
    },
    {
        icon: Trophy,
        label: 'Sertifika',
        value: '2,500+',
        description: 'Tamamlanan eğitimler'
    }
];

export function Stats() {
    return (
        <section className="py-20 bg-brand-black relative">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div 
                            key={index} 
                            className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand-gold/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] text-center transform hover:-translate-y-1"
                        >
                            <div className="inline-flex p-4 rounded-2xl bg-brand-gold/[0.08] border border-brand-gold/20 text-brand-gold mb-6 group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                    {stat.value}
                                </h3>
                                <p className="text-brand-gold font-bold text-sm uppercase tracking-widest opacity-80 decoration-brand-gold/40 underline-offset-4 underline decoration-2">
                                    {stat.label}
                                </p>
                                <p className="text-gray-500 text-xs mt-2 font-medium">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
