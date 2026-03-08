import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

import { FileText, CheckCircle2, ChevronRight, Star, Clock, Users, BookOpen, Headphones, Presentation } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useLibrary } from "../context/LibraryContext";
import { useCourses } from "../context/CoursesContext";

export function CourseDetail() {
    const { id } = useParams();
    const courseId = id || "1"; 
    
    const { courses, loading: contextLoading } = useCourses();
    const course = courses.find(c => c.id === courseId) || null;
    const loading = contextLoading;

    const { addToLibrary, isCourseInLibrary } = useLibrary();

    // Dinamik öğrenci sayısı (admin hariç)
    const [studentCount, setStudentCount] = useState(0);

    useEffect(() => {
        if (!courseId) return;
        const fetchStudentCount = async () => {
            try {
                const usersRef = collection(db, "users");
                const snapshot = await getDocs(usersRef);
                let count = 0;
                snapshot.forEach(doc => {
                    const data = doc.data();
                    // Admin kullanıcıları sayma
                    if (data.role === 'admin') return;
                    // enrolledCourses array'inde bu ders var mı kontrol et
                    if (data.enrolledCourses && Array.isArray(data.enrolledCourses)) {
                        const isEnrolled = data.enrolledCourses.some(c => c.id === courseId);
                        if (isEnrolled) count++;
                    }
                });
                setStudentCount(count);
            } catch (error) {
                console.error("Öğrenci sayısı alınamadı:", error);
            }
        };
        fetchStudentCount();
    }, [courseId]);

    // Dinamik Müfredat
    const modules = course?.modules || [];

    // Materyal sayılarını hesapla
    const materialCounts = modules.reduce((acc, mod) => {
        if (mod.pdfUrl) acc.pdf++;
        if (mod.slideUrl) acc.slide++;
        if (mod.audioUrl) acc.audio++;
        if (mod.questions && mod.questions.length > 0) acc.test++;
        return acc;
    }, { pdf: 0, slide: 0, audio: 0, test: 0 });

    const totalMaterials = materialCounts.pdf + materialCounts.slide + materialCounts.audio + materialCounts.test;

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
                <meta name="description" content={`Dijital Akademi'de ${course.title} dersini ücretsiz olarak inceleyin ve hemen öğrenmeye başlayın.`} />
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
                            {course.tags && course.tags.map(tag => (
                                <span key={tag} className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
                            {course.title}
                        </h1>

                        {/* Düzenlenebilir Alt Yazı (subtitle) */}
                        <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
                            {course.subtitle || course.description || `${course.title} alanındaki temel konuları kapsayan kapsamlı bir eğitim programı.`}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base font-medium">
                            {(course.rating > 0) && (
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
                                    <span><strong className="text-white">{course.rating}</strong> Değerlendirme</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                <span><strong className="text-white">{studentCount}</strong> Öğrenci</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>Son Güncelleme: <strong>{course.updatedAt ? new Date(course.updatedAt).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }) : 'Bilinmiyor'}</strong></span>
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
                        {/* Özelleştirilebilir "Ne Öğreneceksiniz" Box */}
                        {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                            <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 md:p-8 mb-10">
                                <h3 className="text-2xl font-bold text-white mb-6">Bu Derste Neler Öğreneceksiniz?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.learningOutcomes.map((item, i) => (
                                        <div key={i} className="flex gap-3 text-gray-300">
                                            <CheckCircle2 className="w-6 h-6 text-brand-gold flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Müfredat - Artık tek tab, tab sistemi kaldırıldı */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white mb-6">Ders Müfredatı</h3>
                            <div className="text-gray-400 mb-4 flex gap-4">
                                <span>{modules.length} Konu</span>
                                {materialCounts.test > 0 && (
                                    <>
                                        <span>•</span>
                                        <span>{materialCounts.test} Test</span>
                                    </>
                                )}
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
                                                    {/* Modül materyallerini göster */}
                                                    <div className="flex gap-3 mt-1">
                                                        {module.pdfUrl && <span className="text-red-400 text-xs flex items-center gap-1"><FileText className="w-3 h-3" /> PDF</span>}
                                                        {module.slideUrl && <span className="text-blue-400 text-xs flex items-center gap-1"><Presentation className="w-3 h-3" /> Slayt</span>}
                                                        {module.audioUrl && <span className="text-purple-400 text-xs flex items-center gap-1"><Headphones className="w-3 h-3" /> Ses</span>}
                                                        {module.questions && module.questions.length > 0 && <span className="text-brand-gold text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Test</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-500 shrink-0" />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar - Sticky Enroll Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 shadow-2xl">
                            {/* Ders Resmi (video yerine) */}
                            <div className="aspect-video bg-black rounded-lg mb-6 relative overflow-hidden border border-white/5">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
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

                            {/* Dinamik "Bu Eğitimin Sundukları" */}
                            {totalMaterials > 0 && (
                                <div className="space-y-4 pt-6 border-t border-white/5">
                                    <h4 className="font-bold text-white mb-2">Bu Eğitimin Sundukları:</h4>
                                    {materialCounts.pdf > 0 && (
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <FileText className="w-5 h-5 text-red-400" />
                                            <span>{materialCounts.pdf} Adet PDF Kaynak</span>
                                        </div>
                                    )}
                                    {materialCounts.slide > 0 && (
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <Presentation className="w-5 h-5 text-blue-400" />
                                            <span>{materialCounts.slide} Adet Slayt Sunumu</span>
                                        </div>
                                    )}
                                    {materialCounts.audio > 0 && (
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <Headphones className="w-5 h-5 text-purple-400" />
                                            <span>{materialCounts.audio} Adet Sesli Özet</span>
                                        </div>
                                    )}
                                    {materialCounts.test > 0 && (
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                                            <span>{materialCounts.test} Adet Modül Testi</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <BookOpen className="w-5 h-5 text-brand-gold" />
                                        <span>{modules.length} Konu / Modül</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CourseDetail;
