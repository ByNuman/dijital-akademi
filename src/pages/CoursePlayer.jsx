import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";

import {
    PlayCircle, CheckCircle2, ChevronLeft, ChevronRight,
    FileText, HelpCircle, MessageCircle, Menu, X, ArrowLeft,
    Monitor, Headphones, CheckSquare
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { toast } from "sonner";
import { useLibrary } from "../context/LibraryContext";
import { Quiz } from "../components/player/Quiz";
import { useCourses } from "../context/CoursesContext";
import { PDFViewer } from "../components/player/PDFViewer";
import { SlideViewer } from "../components/player/SlideViewer";
import { AudioPlayer } from "../components/player/AudioPlayer";

export function CoursePlayer() {
    const { id } = useParams();
    const courseId = id || "1";
    const { courses, loading: contextLoading } = useCourses();
    const course = courses.find(c => c.id === courseId) || null;
    const loading = contextLoading;

    const { addXp, updateCourseProgress, isCourseInLibrary } = useLibrary();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeLesson, setActiveLesson] = useState(1);
    const [activeTab, setActiveTab] = useState("genel_bakis");
    const [isQuizActive, setIsQuizActive] = useState(false);
    const [activePdfUrl, setActivePdfUrl] = useState(null);
    const [activeSlideUrl, setActiveSlideUrl] = useState(null);
    const [activeAudioUrl, setActiveAudioUrl] = useState(null);

    // Materyal bazlı ilerleme takibi: { "lessonId-materialType": true }
    // materialType: "pdf", "slide", "audio", "quiz"
    const [completedMaterials, setCompletedMaterials] = useState(() => {
        const saved = localStorage.getItem(`progress_${courseId}`);
        return saved ? JSON.parse(saved) : {};
    });

    const [curriculum, setCurriculum] = useState([]);

    useEffect(() => {
        if (course && course.modules && course.modules.length > 0) {
            const formattedCurriculum = [
                {
                    id: 1,
                    title: "Eğitim İçeriği",
                    lessons: course.modules.map((m, idx) => ({
                        id: idx + 1,
                        title: m.title,
                        imageUrl: m.imageUrl,
                        questions: m.questions || [],
                        description: m.description,
                        pdfUrl: m.pdfUrl,
                        slideUrl: m.slideUrl,
                        audioUrl: m.audioUrl,
                        type: "lesson"
                    }))
                }
            ];

            formattedCurriculum[0].lessons.push({
                id: 999,
                title: "Eğitim Sonu Değerlendirmesi",
                type: "quiz"
            });

            setCurriculum(formattedCurriculum);
        } else if (course) {
            setCurriculum([{
                id: 1,
                title: "Eğitim İçeriği",
                lessons: []
            }]);
        }
    }, [course]);

    // Helper: her konu için mevcut materyal sayısını hesapla
    const getMaterialCount = useCallback((lesson) => {
        if (!lesson || lesson.type === "quiz") return 1; // Genel quiz tek materyal
        let count = 0;
        if (lesson.pdfUrl) count++;
        if (lesson.slideUrl) count++;
        if (lesson.audioUrl) count++;
        if (lesson.questions && lesson.questions.length > 0) count++;
        return Math.max(count, 1); // en az 1 olsun
    }, []);

    // Helper: bir konunun tamamlanan materyal sayısı
    const getCompletedMaterialCount = useCallback((lessonId) => {
        let count = 0;
        if (completedMaterials[`${lessonId}-pdf`]) count++;
        if (completedMaterials[`${lessonId}-slide`]) count++;
        if (completedMaterials[`${lessonId}-audio`]) count++;
        if (completedMaterials[`${lessonId}-quiz`]) count++;
        return count;
    }, [completedMaterials]);

    // Helper: konu ilerleme yüzdesi
    const getLessonProgress = useCallback((lesson) => {
        const total = getMaterialCount(lesson);
        const completed = getCompletedMaterialCount(lesson.id);
        return Math.round((completed / total) * 100);
    }, [getMaterialCount, getCompletedMaterialCount]);

    // Materyal tamamlandığında çağır
    const markMaterialComplete = useCallback((lessonId, materialType) => {
        const key = `${lessonId}-${materialType}`;
        if (completedMaterials[key]) return; // zaten tamamlanmış

        setCompletedMaterials(prev => {
            const updated = { ...prev, [key]: true };
            // localStorage'a kaydet
            localStorage.setItem(`progress_${courseId}`, JSON.stringify(updated));
            return updated;
        });

        // XP kazandır (admin değilse)
        addXp(50);
        toast.success(`Materyal tamamlandı! +50 XP`, {
            style: { background: "#10B981", color: "#fff", border: "none" }
        });
    }, [completedMaterials, courseId, addXp]);

    // Stable refs for functions to avoid infinite loops
    const updateProgressRef = useRef(updateCourseProgress);
    const isInLibraryRef = useRef(isCourseInLibrary);
    useEffect(() => { updateProgressRef.current = updateCourseProgress; }, [updateCourseProgress]);
    useEffect(() => { isInLibraryRef.current = isCourseInLibrary; }, [isCourseInLibrary]);

    // İlerleme hesapla ve Firestore'a senkronize et
    useEffect(() => {
        if (!curriculum.length) return;
        const allLessons = curriculum.flatMap(m => m.lessons);
        if (!allLessons.length) return;

        let totalMaterials = 0;
        let totalCompleted = 0;
        allLessons.forEach(lesson => {
            totalMaterials += getMaterialCount(lesson);
            totalCompleted += getCompletedMaterialCount(lesson.id);
        });

        const newProgress = totalMaterials > 0 ? Math.round((totalCompleted / totalMaterials) * 100) : 0;

        if (isInLibraryRef.current(courseId)) {
            updateProgressRef.current(courseId, newProgress);
        }
    }, [completedMaterials, curriculum, courseId, getMaterialCount, getCompletedMaterialCount]);

    // Konuyu elle tamamla/geri al (sol sidebar)
    const toggleLessonComplete = (lessonId, e) => {
        e.stopPropagation();
        const lesson = curriculum.flatMap(m => m.lessons).find(l => l.id === lessonId);
        if (!lesson) return;

        const isFullyComplete = getLessonProgress(lesson) === 100;
        if (isFullyComplete) {
            // Tüm materyallerini geri al
            setCompletedMaterials(prev => {
                const updated = { ...prev };
                delete updated[`${lessonId}-pdf`];
                delete updated[`${lessonId}-slide`];
                delete updated[`${lessonId}-audio`];
                delete updated[`${lessonId}-quiz`];
                localStorage.setItem(`progress_${courseId}`, JSON.stringify(updated));
                return updated;
            });
        } else {
            // Tüm materyallerini tamamla
            setCompletedMaterials(prev => {
                const updated = { ...prev };
                if (lesson.pdfUrl) updated[`${lessonId}-pdf`] = true;
                if (lesson.slideUrl) updated[`${lessonId}-slide`] = true;
                if (lesson.audioUrl) updated[`${lessonId}-audio`] = true;
                if (lesson.questions?.length > 0) updated[`${lessonId}-quiz`] = true;
                if (lesson.type === "quiz") updated[`${lessonId}-quiz`] = true;
                localStorage.setItem(`progress_${courseId}`, JSON.stringify(updated));
                return updated;
            });
            addXp(100);
            toast.success(`"${lesson.title}" tamamlandı!`, {
                style: { background: "#10B981", color: "#fff", border: "none" }
            });
        }
    };

    const currentLessonData = curriculum.flatMap(m => m.lessons).find(l => l.id === activeLesson);

    // Ders toplam ilerleme yüzdesi
    const allLessons = curriculum.flatMap(m => m.lessons);
    let totalMats = 0, completedMats = 0;
    allLessons.forEach(l => {
        totalMats += getMaterialCount(l);
        completedMats += getCompletedMaterialCount(l.id);
    });
    const progressPercentage = totalMats > 0 ? Math.round((completedMats / totalMats) * 100) : 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#101010] flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-[#101010] flex justify-center items-center">
                <div className="text-white text-xl">Ders bulunamadı.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#101010] overflow-hidden">
            {/* Top Navigation Bar */}
            <div className="h-16 bg-[#1A1A1A] border-b border-white/5 flex items-center justify-between px-4 lg:px-6 shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-gray-400 hover:text-white lg:hidden"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                    <Link to="/dashboard" className="text-gray-400 hover:text-brand-gold transition-colors p-2 hidden sm:block">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
                    <h1 className="text-white font-bold text-sm md:text-base truncate max-w-[200px] sm:max-w-md">
                        {course.title}
                    </h1>
                </div>

                {/* Progress Mini Status */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3 mr-4">
                        <span className="text-xs font-semibold text-gray-400">İlerleme %{progressPercentage}</span>
                        <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div
                                style={{ width: `${progressPercentage}%` }}
                                className="h-full bg-gradient-to-r from-brand-gold to-brand-gold-dark rounded-full transition-all duration-500 ease-out"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Player Area */}
            <div className="flex-1 flex overflow-hidden relative">

                {/* Left Sidebar (Curriculum) */}
                <>
                    {isSidebarOpen && (
                        <div
                            className="w-full sm:w-80 md:w-96 bg-[#18181B] border-r border-white/5 flex flex-col absolute lg:relative h-full z-10"
                        >
                            <div className="p-5 border-b border-white/5 text-center sm:text-left">
                                <h2 className="text-lg font-bold text-white mb-1">Ders Konuları</h2>
                                <p className="text-xs text-gray-500">{curriculum.length} Bölüm, {curriculum.flatMap(m => m.lessons).length} Konu</p>
                            </div>

                            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent p-2">
                                {curriculum.map((module) => (
                                    <div key={module.id} className="mb-4">
                                        <div className="px-4 py-3 bg-[#202024] rounded-lg mb-2 border border-white/5">
                                            <h3 className="font-bold text-gray-300 text-sm">{module.title}</h3>
                                        </div>
                                        <div className="space-y-1">
                                            {module.lessons.map(lesson => (
                                                <button
                                                    key={lesson.id}
                                                    onClick={() => setActiveLesson(lesson.id)}
                                                    className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${activeLesson === lesson.id
                                                        ? "bg-brand-gold/10 border-brand-gold/30 border"
                                                        : "hover:bg-white/5 border border-transparent"
                                                        }`}
                                                >
                                                    <div
                                                        className="mt-0.5 shrink-0 cursor-pointer"
                                                        onClick={(e) => toggleLessonComplete(lesson.id, e)}
                                                        title="Tamamlandı olarak işaretle"
                                                    >
                                                        {getLessonProgress(lesson) === 100 ? (
                                                            <CheckCircle2 className="w-5 h-5 text-brand-gold hover:text-white transition-colors" />
                                                        ) : getLessonProgress(lesson) > 0 ? (
                                                            <div className={`w-5 h-5 rounded-full border-2 border-brand-gold/50 flex items-center justify-center`}>
                                                                <div className="w-2.5 h-2.5 rounded-full bg-brand-gold/60"></div>
                                                            </div>
                                                        ) : (
                                                            <div className={`w-5 h-5 rounded-full border-2 hover:border-brand-gold transition-colors flex items-center justify-center ${activeLesson === lesson.id ? "border-brand-gold/50" : "border-gray-500"}`}></div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className={`text-sm font-medium mb-1 truncate ${activeLesson === lesson.id ? "text-white" : "text-gray-400"}`}>
                                                            {lesson.title}
                                                        </div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-2">
                                                            <span>%{getLessonProgress(lesson)}</span>
                                                            <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                                                                <div className="h-full bg-brand-gold rounded-full transition-all" style={{ width: `${getLessonProgress(lesson)}%` }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>

                {/* Right Content Area */}
                <div className="flex-1 flex flex-col bg-[#101010] overflow-y-auto relative h-full">
                    {/* Floating Sidebar Toggle (if closed) */}
                    {!isSidebarOpen && (
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="absolute top-4 left-4 z-10 w-10 h-10 bg-[#1A1A1A] border border-white/10 rounded-full flex items-center justify-center text-white hover:border-brand-gold/50 transition-colors shadow-lg"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}

                    <div className="max-w-5xl mx-auto w-full p-6 md:p-10 flex-1 flex flex-col">

                        {/* Title and Controls */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5 mb-8 pt-8 lg:pt-0">
                            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                                {currentLessonData?.title}
                            </h2>
                            <div className="flex gap-3 w-full sm:w-auto shrink-0">
                                <Button variant="outline" className="flex-1 sm:flex-none justify-center px-4 font-semibold">
                                    <ChevronLeft className="w-5 h-5 sm:mr-1" />
                                    <span className="hidden sm:inline">Önceki Konu</span>
                                </Button>
                                <Button variant="primary" className="flex-1 sm:flex-none justify-center px-6 font-semibold">
                                    <span className="hidden sm:inline">Sonraki Konu</span>
                                    <span className="sm:hidden">Sonraki</span>
                                    <ChevronRight className="w-5 h-5 sm:ml-1" />
                                </Button>
                            </div>
                        </div>

                        {/* Content Area */}
                        {isQuizActive ? (
                            <div className="flex-1 mt-4">
                                <Quiz
                                    onComplete={() => {
                                        setIsQuizActive(false);
                                        markMaterialComplete(activeLesson, 'quiz');
                                    }}
                                    onQuit={() => setIsQuizActive(false)}
                                    questions={currentLessonData?.questions}
                                />
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col">
                                {currentLessonData?.type !== "quiz" && (
                                    currentLessonData?.imageUrl ? (
                                        <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl mb-8 relative border border-white/5">
                                            <img
                                                src={currentLessonData.imageUrl}
                                                alt={currentLessonData.title}
                                                className="w-full h-full absolute inset-0 object-cover opacity-80"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-video bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-2xl mb-8 relative border border-white/5 flex flex-col items-center justify-center">
                                            <Monitor className="w-16 h-16 text-gray-700 mb-4" />
                                            <span className="text-gray-500 font-medium">Bu bölüm için görsel eklenmemiş</span>
                                        </div>
                                    )
                                )}
                                <div className="flex space-x-6 sm:space-x-8 border-b border-white/10 mb-8 overflow-x-auto scrollbar-hide">
                                    {[
                                        { id: "genel_bakis", icon: HelpCircle, label: "Genel Bakış" },
                                        { id: "materyaller", icon: Monitor, label: "Materyaller" },
                                        { id: "tartisma", icon: MessageCircle, label: "Tartışma (12)" }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`pb-4 text-base sm:text-lg font-bold transition-colors flex items-center gap-2 relative whitespace-nowrap ${activeTab === tab.id ? "text-brand-gold" : "text-gray-400 hover:text-white"
                                                }`}
                                        >
                                            <tab.icon className="w-5 h-5" />
                                            <span>{tab.label}</span>
                                            {activeTab === tab.id && (
                                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold rounded-t-lg" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Contents */}
                                <div className="text-gray-300 font-light leading-relaxed flex-1">
                                    {activeTab === "genel_bakis" && (
                                        <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 sm:p-10 shadow-xl">
                                            <h4 className="text-2xl font-black text-white mb-4">Konu Hakkında</h4>
                                            <p className="mb-6 text-gray-400 text-lg leading-relaxed whitespace-pre-wrap">
                                                {currentLessonData?.description || `Bu derste, ${currentLessonData?.title} konusunun akademik temellerini atacağız. Kaynakların metodolojik incelemesi ve yazarın dönemsel etkileri merkeze alınacaktır. Bu konuyu kendi hızınızda tamamlamak için çoklu format destekleyen Materyaller sekmemizi kullanabilirsiniz.`}
                                            </p>
                                            <div className="bg-brand-gold/5 border border-brand-gold/10 rounded-2xl p-6">
                                                <h5 className="font-bold text-brand-gold mb-2">💡 Nasıl İlerlemeliyim?</h5>
                                                <p className="text-gray-400 text-sm sm:text-base">
                                                    Öncelikle <strong>"Materyaller (4'lü Set)"</strong> sekmesine giderek "Sesli Özet" veya "PDF Okuma" modüllerinden biriyle konuya giriş yapın. Ardından sunumu inceleyin ve son olarak "Modül Testi" ile bilginizi sınayarak doğrudan sonraki konuya geçiş yapın.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "materyaller" && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Dinamik Materyaller */}
                                            {currentLessonData?.pdfUrl && (
                                                <div 
                                                    onClick={() => {
                                                        setActivePdfUrl(currentLessonData.pdfUrl);
                                                        markMaterialComplete(activeLesson, 'pdf');
                                                    }}
                                                    className={`flex items-center justify-between p-6 bg-[#1A1A1A] border rounded-3xl hover:border-red-400/30 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg ${completedMaterials[`${activeLesson}-pdf`] ? 'border-green-500/30' : 'border-white/5'}`}
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <div className="bg-red-500/10 p-4 rounded-2xl group-hover:bg-red-500/20 transition-colors relative">
                                                            <FileText className="w-8 h-8 text-red-400" />
                                                            {completedMaterials[`${activeLesson}-pdf`] && (
                                                                <CheckCircle2 className="w-4 h-4 text-green-400 absolute -top-1 -right-1" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-black text-xl group-hover:text-red-400 transition-colors">PDF Okuma</div>
                                                            <div className="text-sm font-medium text-gray-500 mt-1">
                                                                {completedMaterials[`${activeLesson}-pdf`] ? '✓ Tamamlandı' : 'Detaylı Ders Notları'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" className="font-bold">{completedMaterials[`${activeLesson}-pdf`] ? 'Tekrar Aç' : 'Aç'}</Button>
                                                </div>
                                            )}

                                            {currentLessonData?.slideUrl && (
                                                <div 
                                                    onClick={() => {
                                                        setActiveSlideUrl(currentLessonData.slideUrl);
                                                        markMaterialComplete(activeLesson, 'slide');
                                                    }}
                                                    className={`flex items-center justify-between p-6 bg-[#1A1A1A] border rounded-3xl hover:border-blue-400/30 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg ${completedMaterials[`${activeLesson}-slide`] ? 'border-green-500/30' : 'border-white/5'}`}
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <div className="bg-blue-500/10 p-4 rounded-2xl group-hover:bg-blue-500/20 transition-colors relative">
                                                            <Monitor className="w-8 h-8 text-blue-400" />
                                                            {completedMaterials[`${activeLesson}-slide`] && (
                                                                <CheckCircle2 className="w-4 h-4 text-green-400 absolute -top-1 -right-1" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-black text-xl group-hover:text-blue-400 transition-colors">Slayt</div>
                                                            <div className="text-sm font-medium text-gray-500 mt-1">
                                                                {completedMaterials[`${activeLesson}-slide`] ? '✓ Tamamlandı' : 'Görsel Sunum (PDF)'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" className="font-bold">{completedMaterials[`${activeLesson}-slide`] ? 'Tekrar İncele' : 'İncele'}</Button>
                                                </div>
                                            )}

                                            {currentLessonData?.audioUrl && (
                                                <div 
                                                    onClick={() => {
                                                        setActiveAudioUrl(currentLessonData.audioUrl);
                                                        markMaterialComplete(activeLesson, 'audio');
                                                    }}
                                                    className={`flex items-center justify-between p-6 bg-[#1A1A1A] border rounded-3xl hover:border-purple-400/30 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg ${completedMaterials[`${activeLesson}-audio`] ? 'border-green-500/30' : 'border-white/5'}`}
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <div className="bg-purple-500/10 p-4 rounded-2xl group-hover:bg-purple-500/20 transition-colors relative">
                                                            <Headphones className="w-8 h-8 text-purple-400" />
                                                            {completedMaterials[`${activeLesson}-audio`] && (
                                                                <CheckCircle2 className="w-4 h-4 text-green-400 absolute -top-1 -right-1" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-black text-xl group-hover:text-purple-400 transition-colors">Sesli Özet</div>
                                                            <div className="text-sm font-medium text-gray-500 mt-1">
                                                                {completedMaterials[`${activeLesson}-audio`] ? '✓ Tamamlandı' : 'Dinleyerek Öğrenin (mp3)'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" className="font-bold">{completedMaterials[`${activeLesson}-audio`] ? 'Tekrar Dinle' : 'Dinle'}</Button>
                                                </div>
                                            )}

                                            {(!currentLessonData?.pdfUrl && !currentLessonData?.slideUrl && !currentLessonData?.audioUrl) && (
                                                <div className="col-span-1 md:col-span-2 text-center p-8 bg-[#1A1A1A] border border-white/5 rounded-3xl">
                                                    <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                                    <p className="text-gray-400">Bu ders için eklenmiş ekstra bir çalışma materyali bulunmuyor.</p>
                                                </div>
                                            )}

                                            <div
                                                onClick={() => setIsQuizActive(true)}
                                                className={`flex items-center justify-between p-6 bg-[#1A1A1C] border-2 rounded-3xl hover:border-brand-gold transition-all cursor-pointer group hover:-translate-y-1 shadow-[0_0_30px_rgba(251,191,36,0.05)] relative overflow-hidden md:col-span-2 xl:col-span-1 ${completedMaterials[`${activeLesson}-quiz`] ? 'border-green-500/30' : 'border-brand-gold/20'}`}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 flex-transparent pointer-events-none"></div>
                                                <div className="flex items-center gap-5 relative z-10">
                                                    <div className="bg-brand-gold p-4 rounded-2xl text-brand-black group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(251,191,36,0.3)] relative">
                                                        <CheckSquare className="w-8 h-8" />
                                                        {completedMaterials[`${activeLesson}-quiz`] && (
                                                            <CheckCircle2 className="w-4 h-4 text-green-400 absolute -top-1 -right-1" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-black text-xl transition-colors">Modül Testi</div>
                                                        <div className="text-sm font-bold text-brand-gold/80 mt-1">
                                                            {completedMaterials[`${activeLesson}-quiz`]
                                                                ? '✓ Tamamlandı'
                                                                : (currentLessonData?.questions && currentLessonData.questions.length > 0)
                                                                    ? `${currentLessonData.questions.length} Soru`
                                                                    : 'Bilginizi Sınayın'
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="primary" className="relative z-10 font-bold px-6 shadow-[0_0_15px_rgba(251,191,36,0.4)]">{completedMaterials[`${activeLesson}-quiz`] ? 'Tekrar Çöz' : 'Çöz'}</Button>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "tartisma" && (
                                        <div className="text-center py-20 bg-[#1A1A1A] border border-white/5 rounded-3xl shadow-xl">
                                            <MessageCircle className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                                            <h3 className="text-2xl font-black text-white mb-3">Tartışma Alanı</h3>
                                            <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">Soru sormak, yanıtları okumak ve diğer akademik öğrencilerle etkileşime geçmek için lütfen giriş yapın veya kayıt olun.</p>
                                            <Button variant="primary" className="px-8 py-3 text-lg font-bold">Giriş Yap / Kayıt Ol</Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Material Viewer Modals */}
            {activePdfUrl && (
                <PDFViewer
                    url={activePdfUrl}
                    onClose={() => setActivePdfUrl(null)}
                    title={`${currentLessonData?.title || ''} - PDF`}
                />
            )}
            {activeSlideUrl && (
                <SlideViewer
                    url={activeSlideUrl}
                    onClose={() => setActiveSlideUrl(null)}
                    title={`${currentLessonData?.title || ''} - Slayt`}
                />
            )}
            {activeAudioUrl && (
                <AudioPlayer
                    url={activeAudioUrl}
                    onClose={() => setActiveAudioUrl(null)}
                    title={`${currentLessonData?.title || ''} - Sesli Özet`}
                />
            )}
        </div>
    );
}

export default CoursePlayer;
