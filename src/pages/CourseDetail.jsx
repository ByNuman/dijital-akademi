import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, FileText, CheckCircle2, ChevronRight, Star, Clock, Users, BookOpen } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useLibrary } from "../context/LibraryContext";
import { useCourses } from "../context/CoursesContext";

export function CourseDetail() {
    const { id } = useParams();
    const courseId = id || "1"; 
    
    const { courses, loading: contextLoading } = useCourses();
    const course = courses.find(c => c.id === courseId) || null;
    const loading = contextLoading;

    const [activeTab, setActiveTab] = useState("mufredat");
    const { addToLibrary, isCourseInLibrary } = useLibrary();

    // Dinamik Müfredat
    const modules = course?.modules || [];

    if (loading) {
        return (
            <div className="pt-24 pb-20 min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="pt-24 pb-20 min-h-screen flex justify-center items-center">
                <div className="text-white text-xl">Ders bulunamadı.</div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <Helmet>
                <title>{course.title} - Dijital Akademi</title>
                <meta name="description" content={`Dijital Akademi'de ${course.title} dersini ücretsiz olarak inceleyin ve hemen öğrenmeye başlayın. Eğitmen: ${course.instructor}`} />
            </Helmet>
            {/* Header Hero Area */}
            <div className="relative bg-[#1A1A1A] py-16 md:py-24 border-b border-white/5">
                <div className="absolute inset-0 overflow-hidden z-0">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-20 blur-sm mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-[#101010]/80 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex gap-2 mb-6">
                            <span className="bg-brand-gold/10 border border-brand-gold/30 text-brand-gold px-3 py-1 rounded-full text-sm font-semibold">
                                {course.category}
                            </span>
                            {course.tags.map(tag => (
                                <span key={tag} className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            {course.title}
                        </h1>

                        <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
                            Bu program, {course.title.toLowerCase()} alanındaki en kritik başlıkları derinlemesine işlemenizi sağlayan tamamen interaktif bir öğrenme deneyimidir.
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base font-medium mb-10">
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
                                <span><strong className="text-white">{course.rating}</strong> Değerlendirme</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                <span><strong className="text-white">{course.students}</strong>+ Öğrenci</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>Son Güncelleme: <strong>Mart 2026</strong></span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border border-brand-gold p-0.5 overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${course.instructor.split(" ")[1]}&background=FBBF24&color=000`} alt={course.instructor} className="w-full h-full rounded-full" />
                            </div>
                            <div>
                                <div className="text-white font-bold">{course.instructor}</div>
                                <div className="text-gray-500 text-sm">Alanında Uzman Eğitmen</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content & Sidebar */}
            <div className="container mx-auto px-6 md:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">

                    {/* Left Details */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="flex space-x-8 border-b border-white/10 mb-8 overflow-x-auto scrollbar-hide">
                            {["mufredat", "aciklama", "egitmen"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 text-lg font-medium transition-colors whitespace-nowrap relative ${activeTab === tab ? "text-brand-gold" : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {tab === "mufredat" ? "Müfredat" : tab === "aciklama" ? "Ders Tanıtımı" : "Eğitmen"}
                                    {activeTab === tab && (
                                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold rounded-t-lg" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Ne Öğreneceksiniz Box */}
                        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 md:p-8 mb-10">
                            <h3 className="text-2xl font-bold text-white mb-6">Bu Derste Neler Öğreneceksiniz?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Temel kavramları ve tarihsel arka planı analitik bir şekilde yorumlama",
                                    "Klasik metinleri güvenilir kaynaklarla beraber analiz edebilme",
                                    "Günümüz problemleri ile geleneksel anlayış arasında köprü kurma",
                                    "Alana özgü literatür taraması yapıp metodolojiyi kavrama"
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 text-gray-300">
                                        <CheckCircle2 className="w-6 h-6 text-brand-gold flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Switchable Content Area */}
                        <div>
                            {activeTab === "mufredat" && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                    <h3 className="text-2xl font-bold text-white mb-6">Ders Müfredatı</h3>
                                    <div className="text-gray-400 mb-4 flex gap-4">
                                        <span>{modules.length} Konu</span>
                                        <span>•</span>
                                        <span>1 Sınav Testi</span>
                                    </div>
                                    {modules.length === 0 ? (
                                        <div className="text-gray-500 py-8 text-center border-dashed border border-white/10 rounded-xl">
                                            Bu ders için henüz müfredat oluşturulmamış.
                                        </div>
                                    ) : (
                                        modules.map((module, index) => (
                                            <div key={module.id || `mod-${index}`} className="bg-[#1A1A1A] border border-white/5 rounded-xl overflow-hidden">
                                                <div className="flex items-center justify-between p-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold shrink-0">
                                                            {index + 1}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white font-bold text-lg">{module.title}</h4>
                                                            <p className="text-gray-500 text-sm">{module.duration || "Video Eğitimi"}</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-gray-500 shrink-0" />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </motion.div>
                            )}

                            {activeTab === "aciklama" && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-gray-300 leading-loose space-y-6">
                                    <h3 className="text-2xl font-bold text-white mb-4">Detaylı Tanıtım</h3>
                                    <p>Bu eğitim programı, alanı daha önce araştırma fırsatı bulamamış başlangıç düzeyindeki öğrenciler kadar, bilgilerini pekiştirmek isteyen ileri seviyedeki araştırmacılar için de uygundur.</p>
                                    <p>Ders içerisinde sunulan tüm klasik kaynak analizleri ve yan materyaller (PDF'ler, sunum notları) interaktif bir şekilde Dijital Akademi panelinde sizlere sunulacaktır.</p>
                                </motion.div>
                            )}

                            {activeTab === "egitmen" && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-gray-300 leading-loose space-y-6">
                                    <h3 className="text-2xl font-bold text-white mb-4">Eğitmen Hakkında</h3>
                                    <div className="flex items-start gap-6 border-b border-white/10 pb-6 mb-6">
                                        <img src={`https://ui-avatars.com/api/?name=${course.instructor.split(" ")[1]}&background=FBBF24&color=000&size=120`} alt={course.instructor} className="w-24 h-24 rounded-2xl" />
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{course.instructor}</h4>
                                            <p className="text-brand-gold mb-2">Akademisyen & Yazar</p>
                                            <div className="flex gap-4 text-sm text-gray-400">
                                                <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> 12 Kurs</span>
                                                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 15K+ Öğrenci</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p>Yılların verdiği akademik deneyimi dijital ortama taşıyan eğitmenimiz, konuları en anlaşılır ve kalıcı haliyle öğrencilerine aktarmayı hedeflemektedir.</p>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar - Sticky Enroll Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 shadow-2xl">
                            <div className="aspect-video bg-black rounded-lg mb-6 relative overflow-hidden group cursor-pointer border border-white/5">
                                <img src={course.image} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                        <Play className="w-8 h-8 text-white ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-0 right-0 text-center text-white font-medium text-sm">
                                    Önizlemeyi İzle
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-xl font-bold border border-green-500/20 w-fit">
                                    %100 Ücretsiz Eğitim
                                </div>
                            </div>

                            <Link to={`/learn/${course.id}`}>
                                <Button variant="primary" className="w-full justify-center py-4 text-lg font-bold mb-4 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_4px_30px_rgba(251,191,36,0.5)]">
                                    Hemen Eğitime Başla
                                </Button>
                            </Link>

                            <Button
                                variant={isCourseInLibrary(course.id) ? "primary" : "outline"}
                                className={`w-full justify-center py-3 mb-6 ${isCourseInLibrary(course.id) ? "bg-brand-slate text-brand-gold border-brand-gold/30 hover:bg-brand-slate" : ""}`}
                                onClick={() => addToLibrary(course)}
                            >
                                {isCourseInLibrary(course.id) ? (
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5" /> Kütüphanenizde
                                    </div>
                                ) : "Kütüphaneme Ekle"}
                            </Button>

                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <h4 className="font-bold text-white mb-2">Bu Eğitimin Sundukları:</h4>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <BookOpen className="w-5 h-5 text-brand-gold" />
                                    <span>24 Saat Yüksek Çözünürlüklü VOD</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <FileText className="w-5 h-5 text-brand-gold" />
                                    <span>12 Adet Ek Ek Kaynak / PDF</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                                    <span>İnteraktif Modül Sınavları</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CourseDetail;
