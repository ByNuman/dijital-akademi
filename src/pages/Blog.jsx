
import { BookText, ArrowRight, ArrowUpRight, Search, FileSymlink, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";

export function Blog() {
    const categories = ["Tümü", "Fıkıh Düşüncesi", "Eğitim Metodolojisi", "Tarih Okumaları", "Akademi Duyuruları"];

    const activeReadings = [
        {
            id: 1,
            category: "Eğitim Metodolojisi",
            title: "Öğrenmeyi Öğrenmek: Geleneksel Medrese Usulünden Çıkarımlar",
            description: "Modern çağda dikkati toplamanın en zor olduğu bu günlerde, İslami ilimlerin yüzyıllardır kullandığı mütalaa, müzakere ve ezber (hıfz) yöntemleri bize ne vadediyor?",
            readTime: "8 dk",
            date: "14 Mart 2026",
            author: "Prof. Dr. İbrahim Halil",
            image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 2,
            category: "Fıkıh Düşüncesi",
            title: "Dijital Çağda Fetva Metodolojisi ve Fıkhî Yenilenme",
            description: "Sosyal medyanın ve kripto varlıkların yaygınlaştığı bir düzlemde klasik fıkıh kaynakları ile günümüz problemleri arasındaki köprü nasıl kurulur?",
            readTime: "12 dk",
            date: "10 Mart 2026",
            author: "Doç. Dr. Ahmet Yılmaz",
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 3,
            category: "Tarih Okumaları",
            title: "Endülüs'ten Bağdat'a Çeviri Hareketlerinin Bilim Tarihine Etkisi",
            description: "Beyt'ül Hikme'den Avrupa aydınlanmasına uzanan yolculukta, Müslüman alimlerin Yunanca ve Süryanice eserleri tercüme edip geliştirmesinin arka planı.",
            readTime: "15 dk",
            date: "05 Mart 2026",
            author: "Dr. Zeynep Kaya",
            image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">

                {/* Header Graphic */}
                <div className="text-center mb-16 relative pb-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none"></div>
                    <div
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-brand-gold to-yellow-200 rounded-2xl mb-8 shadow=[0_0_30px_rgba(251,191,36,0.2)] relative z-10 text-brand-black"
                    >
                        <BookText className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10 tracking-tight">Akademik <span className="text-brand-gold">Makaleler</span></h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto relative z-10 font-medium">Ufuk açıcı okumalar, metodoloji tahlilleri ve akademi içerik kütüphanesine hoş geldiniz.</p>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Column: Categories */}
                    <div className="w-full lg:w-64 shrink-0">
                        <div className="sticky top-28 space-y-8">

                            <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-2 flex items-center shadow-lg group focus-within:border-brand-gold/50 transition-colors">
                                <Search className="w-5 h-5 text-gray-500 ml-3 shrink-0 group-focus-within:text-brand-gold transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Makale ara..."
                                    className="w-full bg-transparent border-none focus:outline-none text-white px-3 py-2 text-sm placeholder-gray-600"
                                />
                            </div>

                            <div>
                                <h3 className="text-xs font-black text-white/50 uppercase tracking-widest mb-4 px-2">Kategoriler</h3>
                                <div className="space-y-1">
                                    {categories.map((cat, idx) => (
                                        <button
                                            key={cat}
                                            className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-semibold flex justify-between items-center ${idx === 0
                                                    ? "bg-brand-gold text-brand-black shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            {cat}
                                            {idx !== 0 && <ArrowRight className="w-4 h-4 opacity-50" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-brand-gold/10 to-[#101010] border border-brand-gold/20 p-5 rounded-2xl">
                                <Sparkles className="w-6 h-6 text-brand-gold mb-3" />
                                <h4 className="text-white font-bold mb-2">Makale Göndermek İster Misiniz?</h4>
                                <p className="text-sm text-gray-400 mb-4">Akademi üyelerine özel araştırma yazılarınız varsa yayın kuruluna gönderebilirsiniz.</p>
                                <Button variant="outline" className="w-full text-xs font-bold border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10">Detaylı Bilgi</Button>
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Articles Feed */}
                    <div className="flex-1 space-y-10">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <h2 className="text-2xl font-bold text-white">Son Yayınlananlar</h2>
                            <div className="text-sm text-brand-gold font-bold">3 Makale</div>
                        </div>

                        {activeReadings.map((reading, index) => (
                            <article
                                key={reading.id}
                                className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                            >
                                {/* Thumbnail */}
                                <div className="md:col-span-4 h-48 md:h-full w-full rounded-2xl overflow-hidden relative border border-white/5 group-hover:border-brand-gold/30 transition-colors shadow-2xl">
                                    <div className="absolute inset-0 bg-brand-black/30 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0"></div>
                                    <img src={reading.image} alt={reading.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 z-20 bg-brand-gold text-brand-black text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                                        {reading.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="md:col-span-8 flex flex-col justify-center py-2 md:pl-4">
                                    <div className="flex items-center gap-3 text-xs font-semibold text-gray-500 mb-3">
                                        <span className="text-brand-gold">{reading.date}</span>
                                        <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                        <span className="flex items-center gap-1.5"><FileSymlink className="w-3.5 h-3.5" /> {reading.readTime}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors leading-tight cursor-pointer flex items-start gap-2">
                                        {reading.title}
                                        <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
                                    </h3>

                                    <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">
                                        {reading.description}
                                    </p>

                                    <div className="flex items-center gap-3 mt-auto">
                                        <div className="w-8 h-8 rounded-full bg-[#202020] border border-white/10 flex items-center justify-center shrink-0">
                                            <span className="text-xs font-black text-gray-400">{reading.author.charAt(0)}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-300">{reading.author}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Blog;
