import { CourseCard } from "../ui/CourseCard";
import { useCourses } from "../../context/CoursesContext";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export function FeaturedCourses() {
    const { courses, loading } = useCourses();
    const featuredCourses = courses.slice(0, 8);
    return (
        <section className="py-24 bg-[#141414] relative border-y border-white/5" id="dersler">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2
                            className="text-4xl md:text-5xl font-black text-white mb-6"
                        >
                            Öne Çıkan <span className="text-brand-gold">Dersler</span>
                        </h2>
                        <p
                            className="text-gray-400 text-lg"
                        >
                            Alanında uzman akademisyenler tarafından hazırlanan, en çok tercih edilen eğitim programlarımızı keşfedin.
                        </p>
                    </div>
                    <div>
                        <Link to="/courses">
                            <Button variant="outline" className="hidden md:inline-flex rounded-xl font-semibold">
                                Tüm Dersleri Gör
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="w-full relative">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
                        </div>
                    ) : featuredCourses.length === 0 ? (
                        <div className="bg-[#1A1A1A] border-dashed border border-white/10 rounded-2xl p-12 text-center">
                            <p className="text-gray-400 text-lg">Henüz öne çıkan ders bulunmuyor.</p>
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
                            className="pb-16 pt-4 px-2 sm:px-12 -mx-2 sm:-mx-12 !overflow-visible"
                        >
                            {featuredCourses.map((course) => (
                                <SwiperSlide key={course.id} className="h-auto px-2">
                                    <CourseCard course={course} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>

                <div className="md:hidden flex justify-center mt-10">
                    <Link to="/courses" className="w-full">
                        <Button variant="outline" className="w-full rounded-xl font-semibold">
                            Tüm Dersleri Gör
                        </Button>
                    </Link>
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
