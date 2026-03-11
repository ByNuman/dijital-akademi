import React from 'react';
import { Target, Lightbulb, Users, Rocket, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="pt-24 pb-20 min-h-screen bg-[#101010]">
            {/* Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-gold/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20 pt-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-sm font-medium mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Geleceğin Eğitim Platformu</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                    >
                        Sınırları Aşan Bir <span className="text-brand-gold">Eğitim Deneyimi</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 text-lg leading-relaxed"
                    >
                        Antigravity Dijital Akademi, ilim yolculuğunda sınırları kaldıran fütüristik bir platformdur. Amacımız, en güncel teknolojileri kullanarak herkes için erişilebilir, premium bir eğitim modeli sunmaktır.
                    </motion.p>
                </div>

                {/* Vision & Mission */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-24">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden group hover:border-brand-gold/20 transition-all duration-500"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                            <Lightbulb className="w-32 h-32 text-brand-gold" />
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-8">
                            <Lightbulb className="w-7 h-7 text-brand-gold" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Vizyonumuz</h2>
                        <p className="text-gray-400 leading-relaxed relative z-10">
                            Teknolojinin sunduğu imkanları eğitimin merkezine alarak; mekan, zaman ve statüden bağımsız olarak bilgiye ulaşmak isteyen herkes için küresel çapta referans noktası olan bir akademi inşa etmek. Geleceğin dijital dünyasında yön gösteren bir deniz feneri olmak.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden group hover:border-brand-gold/20 transition-all duration-500"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                            <Target className="w-32 h-32 text-brand-gold" />
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-8">
                            <Target className="w-7 h-7 text-brand-gold" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Misyonumuz</h2>
                        <p className="text-gray-400 leading-relaxed relative z-10">
                            Yenilikçi, dinamik ve etkileşimli içerikler üreterek öğrencilerin hem akademik yetkinliklerini hem de pratik becerilerini artırmak. Modern dünyanın ihtiyaç duyduğu donanımlı bireyleri, etik değerlerle bezenmiş bir teknoloji kültürü içinde yetiştirmek.
                        </p>
                    </motion.div>
                </div>

                {/* Values */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Değerlerimiz</h2>
                        <p className="text-gray-400">Bizi biz yapan, pusulamızı oluşturan temel ilkelerimiz.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Rocket, title: "İnovasyon", desc: "Sınırları zorlar, sürekli yeniyi ararız. Eğitimde en son teknolojileri uygularız." },
                            { icon: ShieldCheck, title: "Güven ve Etik", desc: "Şeffaf, dürüst ve güvenilir bir eğitim ekosistemi inşa ederiz." },
                            { icon: Users, title: "Topluluk", desc: "Birlikte öğrenmenin ve gelişmenin gücüne inanırız. Güçlü bir bağ kurarız." }
                        ].map((value, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-[#151515] border border-white/5 p-8 rounded-2xl hover:bg-[#1A1A1A] transition-colors"
                            >
                                <value.icon className="w-8 h-8 text-brand-gold mb-6" />
                                <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Ekibimiz</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Arkasında alanında uzman, tutkulu ve teknolojiye gönül vermiş bir ekip yatıyor.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Ahmet Yılmaz", role: "Kurucu & CEO", img: "https://i.pravatar.cc/300?img=11" },
                            { name: "Ayşe Kaya", role: "Eğitim Teknolojileri Direktörü", img: "https://i.pravatar.cc/300?img=5" },
                            { name: "Mehmet Demir", role: "Baş Yazılım Mühendisi", img: "https://i.pravatar.cc/300?img=14" },
                            { name: "Zeynep Çelik", role: "Topluluk Yöneticisi", img: "https://i.pravatar.cc/300?img=9" }
                        ].map((member, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group relative"
                            >
                                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-4 relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent z-10 opacity-60"></div>
                                    <img 
                                        src={member.img} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 blur-[2px] grayscale-[30%] group-hover:blur-0 group-hover:grayscale-0"
                                    />
                                    <div className="absolute bottom-0 left-0 p-6 z-20">
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-gold transition-colors">{member.name}</h3>
                                        <p className="text-brand-gold/80 text-sm font-medium">{member.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
