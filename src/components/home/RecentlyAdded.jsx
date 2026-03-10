import { useCourses } from "../../context/CoursesContext";
import { Link } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { PlayCircle, FileText, CheckCircle2, Headphones, Presentation } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function RecentlyAdded() {
    const { courses, loading } = useCourses();
    const { isCourseInLibrary } = useLibrary();
    
    // Tüm kurslardaki tüm modülleri düzleştir (flatMap) ve her modüle kurs bilgilerini ekle
    const allModules = courses.flatMap(course => 
        (course.modules || []).map((mod, index) => ({
            ...mod,
            courseId: course.id,
            courseTitle: course.title,
            courseCategory: course.category,
            courseImage: course.image,
            lessonNum: index + 1
        }))
    );

    // En son eklenen kursların modülleri sonda olabileceği için listeyi ters çevirip ilk 7'sini al
    const recentModules = allModules.reverse().slice(0, 7);

    return (
        <section className="py-24 bg-[#141414] relative border-y border-white/5" id="son-eklenenler">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-slate border border-white/10 text-brand-gold text-sm font-semibold mb-6">
                            Yeni İçerikler
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                            Son Eklenen <span className="text-brand-gold">Konular</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Akademimize yeni katılan eğitim programlarının en güncel konularını keşfedin.
                        </p>
                    </div>
                </div>

                <div className="w-full relative">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
                        </div>
                    ) : recentModules.length === 0 ? (
                        <div className="bg-[#1A1A1A] border-dashed border border-white/10 rounded-2xl p-12 text-center">
                            <p className="text-gray-400 text-lg">Henüz konu eklenmemiş.</p>
                        </div>
                    ) : (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={32}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="pb-16 pt-4 px-4 -mx-4 !overflow-visible"
                        >
                            {recentModules.map((mod, index) => (
                                <SwiperSlide key={mod.id || index} className="h-auto px-2">
                                    <Link 
                                        to={isCourseInLibrary(mod.courseId) ? `/learn/${mod.courseId}?lesson=${mod.lessonNum}` : `/course/${mod.courseId}`} 
                                        className="group block bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden hover:border-brand-gold/30 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-gold/10 h-full flex flex-col"
                                    >
                                        <div className="relative aspect-video overflow-hidden bg-[#222]">
                                            {mod.courseImage ? (
                                                <img 
                                                    src={mod.courseImage} 
                                                    alt={mod.courseTitle}
                                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#222] to-[#111]"></div>
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 rounded-full bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-brand-gold/90 group-hover:border-brand-gold transition-all duration-300">
                                                    <PlayCircle className="w-8 h-8 text-white ml-1 group-hover:text-[#111] transition-colors" />
                                                </div>
                                            </div>
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-black/60 backdrop-blur-md border border-white/10 text-brand-gold px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                                                    {mod.courseCategory}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1 relative">
                                            <div className="absolute top-0 right-6 -translate-y-1/2">
                                                <span className="bg-brand-gold text-brand-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                                                    Ders {index + 1}
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 mt-2 group-hover:text-brand-gold transition-colors">
                                                {mod.title}
                                            </h3>
                                            
                                            <p className="text-gray-400 text-sm mb-6 line-clamp-1 italic">
                                                {mod.courseTitle}
                                            </p>
                                            
                                            <div className="mt-auto px-2">
                                                <div className="h-px w-full bg-white/5 mb-4"></div>
                                                <div className="flex items-center gap-4 text-xs font-medium">
                                                    {mod.pdfUrl && (
                                                        <div className="flex items-center gap-1.5 text-red-400">
                                                            <FileText className="w-3.5 h-3.5" />
                                                            <span>PDF</span>
                                                        </div>
                                                    )}
                                                    {mod.slideUrl && (
                                                        <div className="flex items-center gap-1.5 text-blue-400">
                                                            <Presentation className="w-3.5 h-3.5" />
                                                            <span>Slayt</span>
                                                        </div>
                                                    )}
                                                    {mod.audioUrl && (
                                                        <div className="flex items-center gap-1.5 text-purple-400">
                                                            <Headphones className="w-3.5 h-3.5" />
                                                            <span>Ses</span>
                                                        </div>
                                                    )}
                                                    {mod.questions?.length > 0 && (
                                                        <div className="flex items-center gap-1.5 text-emerald-400">
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                            <span>Sorular</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .swiper-button-next, .swiper-button-prev {
                    color: #d4af37 !important;
                    background: rgba(20, 20, 20, 0.8);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    width: 48px !important;
                    height: 48px !important;
                    border-radius: 50%;
                    transform: scale(0.8);
                    transition: all 0.3s ease;
                }
                .swiper-button-next:hover, .swiper-button-prev:hover {
                    background: #d4af37;
                    color: #141414 !important;
                    transform: scale(1);
                }
                .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.2) !important;
                }
                .swiper-pagination-bullet-active {
                    background: #d4af37 !important;
                }
            `}} />
        </section>
    );
}
