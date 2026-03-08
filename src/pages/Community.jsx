import { useState } from "react";

import { MessageSquare, ThumbsUp, MessageCircle, Eye, HandHeart, Plus, Search, Tag, Filter } from "lucide-react";
import { Button } from "../components/ui/Button";

export function Community() {
    const [activeFilter, setActiveFilter] = useState("trend");

    const mockDiscussions = [
        {
            id: 1,
            author: "Ahmet Yılmaz",
            avatar: "https://ui-avatars.com/api/?name=Ahmet+Yılmaz&background=FBBF24&color=000",
            title: "Kelam ilminde 'Madde' ve 'Cevher' kavramlarının farkı nedir?",
            excerpt: "Son derste Prof. Dr. Mehmet Emin hocanın bahsettiği madde ve cevher ayrımını tam anlayamadım. Eş'ari kelamına göre bu iki kavramın farkını açıklayabilecek olan var mı?",
            tags: ["İlm-i Kelam", "Kavramlar", "Soru"],
            upvotes: 45,
            replies: 12,
            views: 320,
            time: "2 saat önce"
        },
        {
            id: 2,
            author: "Zeynep Kaya",
            avatar: "https://ui-avatars.com/api/?name=Zeynep+Kaya&background=94A3B8&color=000",
            title: "Tefsir Usulü vize sınavı için kaynak önerileri",
            excerpt: "Vize sınavına hazırlanmak için derste verilen pdf dosyaları haricinde hangi temel kaynakları okumamı önerirsiniz? Özellikle tarihsel dönemlere göre bir okuma listesi var mı?",
            tags: ["Tefsir", "Kaynak Önerisi", "Sınav"],
            upvotes: 32,
            replies: 8,
            views: 185,
            time: "5 saat önce"
        },
        {
            id: 3,
            author: "Mustafa Demir",
            avatar: "https://ui-avatars.com/api/?name=Mustafa+D&background=10B981&color=fff",
            title: "İslami İlimlerde Dijitalleşme: Makale İncelemesi",
            excerpt: "Geçen hafta okuduğum bir makalede bahsedilen 'Dijital Çağda Fetva Metodolojisi' üzerine bazı notlarımı paylaşmak istiyorum. Geleneksel fıkhın modern problemlere...",
            tags: ["Fıkıh", "Makale", "Tartışma", "Gündem"],
            upvotes: 128,
            replies: 34,
            views: 890,
            time: "1 gün önce"
        }
    ];

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">

                {/* Header Graphic */}
                <div className="text-center mb-12 relative pb-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-brand-gold/10 blur-[80px] rounded-full pointer-events-none"></div>
                    <div
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1A1A1A] to-[#111] border border-brand-gold/30 rounded-2xl mb-6 shadow-[0_0_30px_rgba(251,191,36,0.15)] relative z-10"
                    >
                        <MessageSquare className="w-10 h-10 text-brand-gold" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 relative z-10">Akademi Topluluğu</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto relative z-10">Öğrenciler ve eğitmenlerle fikirlerinizi paylaşın, sorular sorun ve akademi ağınızı büyütün.</p>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Topics & Filters */}
                    <div className="w-full lg:w-64 shrink-0 space-y-6">
                        <Button variant="primary" className="w-full flex justify-center gap-2 py-3 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                            <Plus className="w-5 h-5" />
                            Yeni Konu Aç
                        </Button>

                        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 sticky top-28">
                            <div className="flex items-center gap-2 mb-4 text-white font-bold pb-4 border-b border-white/5">
                                <Filter className="w-4 h-4 text-brand-gold" /> Filtreler
                            </div>
                            <div className="space-y-2">
                                {[
                                    { id: "trend", label: "Popüler (Trend)" },
                                    { id: "yeni", label: "En Yeniler" },
                                    { id: "cevap_bekleyen", label: "Cevapsızlar" },
                                    { id: "benim", label: "Benim Konularım" }
                                ].map((f) => (
                                    <button
                                        key={f.id}
                                        onClick={() => setActiveFilter(f.id)}
                                        className={`w-full text-left px-4 py-2.5 rounded-xl transition-all text-sm font-medium ${activeFilter === f.id
                                                ? "bg-brand-gold/10 text-brand-gold"
                                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8">
                                <div className="flex items-center gap-2 mb-4 text-white font-bold pb-4 border-b border-white/5">
                                    <Tag className="w-4 h-4 text-brand-gold" /> Popüler Etiketler
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {["Tefsir", "Hadis", "Fıkıh", "Akademik", "Sınav", "Soru", "Makale"].map(tag => (
                                        <span key={tag} className="text-xs px-3 py-1.5 rounded-lg bg-[#252525] text-gray-300 hover:text-brand-gold hover:bg-brand-gold/10 cursor-pointer transition-colors border border-white/5">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Discussion Feed */}
                    <div className="flex-1 space-y-6">

                        {/* Search Bar */}
                        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-2 flex items-center relative shadow-lg">
                            <Search className="w-5 h-5 text-gray-500 absolute left-5" />
                            <input
                                type="text"
                                placeholder="Toplulukta soru, tartışma veya konu arayın..."
                                className="w-full bg-transparent border-none focus:outline-none text-white pl-12 pr-4 py-3 placeholder-gray-600"
                            />
                            <Button variant="outline" className="hidden sm:block min-h-0 py-2 border-white/10 hover:bg-white/5">
                                Ara
                            </Button>
                        </div>

                        {/* Discussions List */}
                        <div className="space-y-4">
                            {mockDiscussions.map((disc, index) => (
                                <div
                                    key={disc.id}
                                    className="bg-[#1A1A1A] border border-white/5 hover:border-brand-gold/30 rounded-2xl p-6 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-[0_0_20px_rgba(251,191,36,0.05)]"
                                >
                                    <div className="flex gap-4 sm:gap-6">

                                        {/* Upvote Column - Hidden on small mobile */}
                                        <div className="hidden sm:flex flex-col items-center shrink-0 w-12 pt-1 gap-2">
                                            <button className="text-gray-500 hover:text-brand-gold transition-colors p-2 hover:bg-brand-gold/10 rounded-full">
                                                <ThumbsUp className="w-5 h-5" />
                                            </button>
                                            <span className="font-bold text-white text-lg">{disc.upvotes}</span>
                                        </div>

                                        {/* Content Column */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-3">
                                                <img src={disc.avatar} alt={disc.author} className="w-6 h-6 rounded-full" />
                                                <span className="text-sm font-bold text-gray-300">{disc.author}</span>
                                                <span className="text-xs text-gray-600">• {disc.time}</span>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-gold transition-colors leading-snug">
                                                {disc.title}
                                            </h3>

                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                                                {disc.excerpt}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    {disc.tags.map(tag => (
                                                        <div key={tag} className="text-[11px] font-bold px-2.5 py-1 rounded bg-[#252525] text-brand-gold">
                                                            {tag}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex items-center gap-4 text-gray-500 text-xs font-semibold ml-auto sm:ml-0">
                                                    <div className="flex items-center gap-1.5 sm:hidden">
                                                        <ThumbsUp className="w-4 h-4" /> {disc.upvotes}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <MessageCircle className="w-4 h-4" /> {disc.replies} Yanıt
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Eye className="w-4 h-4" /> {disc.views}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="pt-6 text-center">
                            <Button variant="outline" className="border-white/10 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                                Daha Fazla Tartışma Yükle
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Community;
