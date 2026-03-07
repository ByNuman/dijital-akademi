import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Star, Users, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useCourses } from "../context/CoursesContext";
import { Helmet } from "react-helmet-async";

export function Courses() {
    const { courses, loading } = useCourses();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tümü");

    const categories = ["Tümü", ...new Set(courses.map(c => c.category))];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "Tümü" || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="pt-32 pb-24 min-h-screen">
            <Helmet>
                <title>Tüm Eğitimler - Dijital Akademi</title>
                <meta name="description" content="Tefsir, Fıkıh, Kelam, Arapça ve daha birçok İslami ilimler eğitimine ücretsiz erişin." />
            </Helmet>
            {/* Header & Search */}
            <div className="container mx-auto px-6 md:px-12 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black text-white mb-4"
                        >
                            Ders <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-gold-dark">Kataloğu</span>
                        </motion.h1>
                        <p className="text-gray-400">Akademik gelişiminiz için özenle hazırlanmış dersleri keşfedin.</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Ders veya eğitmen ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all placeholder:text-gray-600"
                        />
                    </div>
                </div>

                {/* Categories Filter */}
                <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex items-center gap-2 text-gray-400 mr-2">
                        <Filter className="w-5 h-5" />
                        <span className="text-sm font-medium">Kategoriler:</span>
                    </div>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${selectedCategory === category
                                ? "bg-brand-gold text-brand-black shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                                : "bg-[#1A1A1A] text-gray-400 border border-white/5 hover:border-brand-gold/30 hover:text-white"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Courses Grid */}
            <div className="container mx-auto px-6 md:px-12">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
                    </div>
                ) : (
                <AnimatePresence mode="popLayout">
                    {filteredCourses.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {filteredCourses.map((course) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={course.id}
                                    className="bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden group hover:border-brand-gold/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(251,191,36,0.1)] flex flex-col h-full"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-brand-black/20 mix-blend-multiply z-10"></div>
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                                            {(course.tags || []).slice(0, 1).map(tag => (
                                                <span key={tag} className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-brand-gold text-xs font-bold uppercase tracking-wider mb-2">
                                            {course.category}
                                        </div>
                                        <h3 className="text-white text-xl font-bold mb-2 group-hover:text-brand-gold transition-colors line-clamp-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4">
                                            {course.instructor}
                                        </p>

                                        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-1.5">
                                                <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
                                                <span className="text-white font-medium">{course.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-4 h-4" />
                                                <span>{course.students}</span>
                                            </div>
                                        </div>

                                        <Link to={`/course/${course.id}`} className="mt-6 w-full">
                                            <Button variant="outline" className="w-full flex items-center justify-center gap-2 group-hover:bg-brand-gold group-hover:text-brand-black group-hover:border-brand-gold transition-all duration-300">
                                                Dersi İncele
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full py-20 text-center"
                        >
                            <div className="inline-flex w-20 h-20 bg-white/5 rounded-full items-center justify-center mb-6 border border-white/10">
                                <Search className="w-10 h-10 text-gray-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Sonuç Bulunamadı</h3>
                            <p className="text-gray-400 max-w-md mx-auto">
                                Arama kriterlerinize uygun ders bulunamadı. Lütfen farklı kelimeler deneyin veya filtreleri temizleyin.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-8"
                                onClick={() => { setSearchTerm(""); setSelectedCategory("Tümü"); }}
                            >
                                Filtreleri Temizle
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
                )}
            </div>
        </div>
    );
}

export default Courses;
