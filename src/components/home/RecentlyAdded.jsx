import { useCourses } from "../../context/CoursesContext";
import { Link } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { PlayCircle, FileText, CheckCircle2, Headphones, Presentation, Clock, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function RecentlyAdded() {
    const { courses, loading } = useCourses();
    const { isCourseInLibrary } = useLibrary();
    
    // Sort courses by creation date or reverse first 10
    const sortedCourses = [...courses].sort((a, b) => {
        const getTimestamp = (c) => {
            const dateStr = c.createdAt || c.created_at;
            if (dateStr && dateStr.seconds) return dateStr.seconds * 1000;
            if (dateStr && dateStr.toMillis) return dateStr.toMillis();
            if (typeof dateStr === 'number') return dateStr;
            if (typeof dateStr === 'string' || dateStr instanceof Date) return new Date(dateStr).getTime();
            return 0;
        };
        const timeA = getTimestamp(a);
        const timeB = getTimestamp(b);
        return timeB - timeA;
    });
    
    const hasDates = courses.some(c => c.createdAt || c.created_at);
    if (!hasDates) {
        sortedCourses.reverse();
    }

    // Flatten modules from sorted courses
    const allModules = sortedCourses.flatMap(course => 
        (course.modules || []).map((mod, index) => ({
            ...mod,
            courseId: course.id,
            courseTitle: course.title,
            courseCategory: course.category,
            courseImage: course.image,
            lessonNum: index + 1
        }))
    );

    const recentModules = allModules.slice(0, 10);

    return (
        <section className="py-24 bg-brand-black relative" id="son-eklenenler">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none animate-float"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-black border border-brand-gold/20 text-brand-gold text-sm font-semibold mb-6 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                            Yeni İçerikler
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                            Son Eklenen <span className="text-gold-gradient font-serif italic tracking-tight">Konular</span>
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
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={40}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="pb-16 pt-4 !overflow-visible"
                        >
                            {recentModules.map((mod, idx) => (
                                <SwiperSlide key={`${mod.courseId}-${mod.title}-${idx}`} className="h-auto">
                                    <Link 
                                        to={`/learn/${mod.courseId}?lesson=${mod.lessonNum}`} 
                                        className="group block bg-[#121212] rounded-2xl border border-white/5 overflow-hidden hover:border-brand-gold/40 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(212,175,55,0.1)] h-full flex flex-col transform hover:-translate-y-2"
                                    >
                                        {/* Card Image Wrapper */}
                                        <div className="relative aspect-video overflow-hidden">
                                            {mod.imageUrl || mod.courseImage ? (
                                                <img 
                                                    src={mod.imageUrl || mod.courseImage} 
                                                    alt={mod.title}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-brand-black to-[#222]"></div>
                                            )}
                                            
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent"></div>
                                            
                                            {/* Duration Badge */}
                                            <div className="absolute bottom-4 right-4 bg-brand-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                <Clock className="w-3 h-3 text-brand-gold" />
                                                <span className="text-[10px] text-white/90 font-medium tracking-wide">{mod.duration}</span>
                                            </div>

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-brand-gold/20 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                                    {mod.courseCategory || 'Eğitim'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-6 h-px bg-brand-gold/40"></div>
                                                <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest opacity-80">
                                                    Ders {mod.lessonNum}
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-brand-gold transition-colors line-clamp-2 leading-tight">
                                                {mod.title}
                                            </h3>
                                            
                                            <p className="text-gray-500 text-xs mb-6 line-clamp-1 italic">
                                                {mod.courseTitle}
                                            </p>
                                            
                                            {/* Action Label */}
                                            <div className="flex items-center gap-2 text-brand-gold text-sm font-bold group/btn mt-auto py-2">
                                                <span className="relative">
                                                    {isCourseInLibrary(mod.courseId) ? 'Hemen Öğren' : 'Detayları İncele'}
                                                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
                                                </span>
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
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
                    background: rgba(20, 20, 20, 0.6);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    width: 52px !important;
                    height: 52px !important;
                    border-radius: 50%;
                    transform: scale(0.9);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                }
                .swiper-button-next:after, .swiper-button-prev:after {
                    font-size: 20px !important;
                    font-weight: 800;
                }
                .swiper-button-next:hover, .swiper-button-prev:hover {
                    background: #d4af37;
                    color: #141414 !important;
                    transform: scale(1.05);
                    box-shadow: 0 0 25px rgba(212, 175, 55, 0.5);
                    border-color: #d4af37;
                }
                .swiper-button-next.swiper-button-disabled, 
                .swiper-button-prev.swiper-button-disabled {
                    opacity: 0.3 !important;
                    pointer-events: none;
                }
                .swiper-button-prev {
                    left: -20px !important;
                }
                .swiper-button-next {
                    right: -20px !important;
                }
                @media (max-width: 640px) {
                    .swiper-button-prev { left: 0px !important; }
                    .swiper-button-next { right: 0px !important; }
                }

                .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.15) !important;
                    width: 10px !important;
                    height: 10px !important;
                    border-radius: 5px !important;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    opacity: 1 !important;
                }
                .swiper-pagination-bullet:hover {
                    background: rgba(255, 255, 255, 0.4) !important;
                    transform: scale(1.2);
                }
                .swiper-pagination-bullet-active {
                    background: #d4af37 !important;
                    width: 32px !important;
                    box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
                }
            `}} />
        </section>
    );
}
