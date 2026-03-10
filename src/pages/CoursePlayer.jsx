import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";

import {
    PlayCircle, CheckCircle2, ChevronLeft, ChevronRight,
    FileText, HelpCircle, MessageCircle, Menu, X, ArrowLeft,
    Monitor, Headphones, CheckSquare, Award
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

    const [searchParams] = useSearchParams();
    const initialLessonParam = searchParams.get('lesson');
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeLesson, setActiveLesson] = useState(initialLessonParam ? parseInt(initialLessonParam, 10) : 1);

    useEffect(() => {
        const lessonParam = searchParams.get('lesson');
        if (lessonParam) {
            setActiveLesson(parseInt(lessonParam, 10));
        }
    }, [searchParams]);
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
        count++; // Modül Testi (Quiz) arayüzde daima gösterildiği için 1 ekliyoruz
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
        return Math.min(Math.round((completed / total) * 100), 100);
    }, [getMaterialCount, getCompletedMaterialCount]);

    // Materyal tamamlandığında çağır
    const markMaterialComplete = useCallback((lessonId, materialType, score = null, total = null) => {
        const key = `${lessonId}-${materialType}`;
        const prevWasCompleted = completedMaterials[key];

        setCompletedMaterials(prev => {
            const updated = { ...prev, [key]: true };
            if (materialType === 'quiz' && score !== null && total !== null) {
                updated[`${lessonId}-quiz-score`] = score;
                updated[`${lessonId}-quiz-total`] = total;
            }
            // localStorage'a kaydet
            localStorage.setItem(`progress_${courseId}`, JSON.stringify(updated));
            return updated;
        });

        // XP kazandır (admin değilse)
        if (!prevWasCompleted) {
            addXp(50);
            toast.success(`Materyal tamamlandı! +50 XP`, {
                style: { background: "#10B981", color: "#fff", border: "none" }
            });
        }
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
                delete updated[`${lessonId}-quiz-score`];
                delete updated[`${lessonId}-quiz-total`];
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
                // Quiz (Modül Testi) butonu her zaman olduğu için onu da tamamlandı işaretliyoruz
                updated[`${lessonId}-quiz`] = true;
                updated[`${lessonId}-quiz-score`] = 1;
                updated[`${lessonId}-quiz-total`] = 1;
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
            <div className="h-16 bg-[#1A1A1A] border-b border-white/5 flex items-center justify-between px-4 lg:px-6 shrink-0 z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-gray-400 hover:text-white lg:hidden transition-colors"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                    <Link to="/dashboard" className="text-gray-400 hover:text-brand-gold transition-colors p-2 block md:hidden whitespace-nowrap">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <Link to="/dashboard" className="text-gray-400 hover:text-brand-gold transition-colors p-2 hidden md:block whitespace-nowrap">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
                    <h1 className="text-white font-medium text-sm md:text-base truncate max-w-[200px] sm:max-w-md">
                        {course.title}
                    </h1>
                </div>

                {/* Progress Mini Status */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3 mr-4">
                        <span className="text-xs font-medium text-gray-400">İlerleme %{progressPercentage}</span>
                        <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                                style={{ width: `${progressPercentage}%` }}
                                className="h-full bg-brand-gold rounded-full transition-all duration-300 ease-out"
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
                                            {module.lessons.map(lesson => {
                                                const progress = getLessonProgress(lesson);
                                                const isCompleted = progress === 100;
                                                const isMastered = isCompleted && completedMaterials[`${lesson.id}-quiz-score`] === completedMaterials[`${lesson.id}-quiz-total`] && completedMaterials[`${lesson.id}-quiz-total`] > 0;

                                                return (
                                                <button
                                                    key={lesson.id}
                                                    onClick={() => setActiveLesson(lesson.id)}
                                                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-300 border 
                                                        ${activeLesson === lesson.id
                                                            ? "bg-[#252529] border-brand-gold/30 shadow-[0_0_15px_rgba(234,179,8,0.05)]"
                                                            : isCompleted
                                                                ? "bg-brand-gold/5 border-transparent hover:bg-brand-gold/10"
                                                                : "bg-transparent border-transparent hover:bg-white/5"
                                                        }`}
                                                >
                                                    <div
                                                        className={`shrink-0 cursor-pointer relative flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isCompleted ? 'bg-brand-gold/10' : 'bg-white/5 hover:bg-white/10'}`}
                                                        onClick={(e) => toggleLessonComplete(lesson.id, e)}
                                                        title={isMastered ? "Mükemmel Başarı!" : "Tamamlandı olarak işaretle"}
                                                    >
                                                        {isMastered ? (
                                                            <Award className="w-5 h-5 text-brand-gold drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                                                        ) : isCompleted ? (
                                                            <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                                                        ) : progress > 0 ? (
                                                            <div className="w-4 h-4 rounded-full border border-brand-gold/50 flex items-center justify-center">
                                                                <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                                                            </div>
                                                        ) : (
                                                            <div className={`w-4 h-4 rounded-full border transition-colors flex items-center justify-center ${activeLesson === lesson.id ? "border-brand-gold/50" : "border-gray-500"}`}></div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0 mt-0.5">
                                                        <div className={`text-sm font-medium mb-1.5 truncate ${activeLesson === lesson.id ? "text-white" : isCompleted ? "text-brand-gold/90" : "text-gray-300"}`}>
                                                            {lesson.title}
                                                        </div>
                                                        {isCompleted ? (
                                                            <div className="text-[11px] font-semibold text-brand-gold uppercase tracking-wider flex items-center gap-1">
                                                                Tamamlandı
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                                                    <div className="h-full bg-brand-gold rounded-full transition-all duration-300 relative" style={{ width: `${progress}%` }}>
                                                                        <div className="absolute inset-0 bg-white/20"></div>
                                                                    </div>
                                                                </div>
                                                                <span className="text-[11px] text-gray-500 font-medium w-8 text-right">%{progress}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                            })}
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
                            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                                {currentLessonData?.title}
                            </h2>
                            <div className="flex gap-3 w-full sm:w-auto shrink-0">
                                <Button 
                                    variant="outline" 
                                    className="flex-1 sm:flex-none justify-center px-4"
                                    onClick={() => {
                                        const currentIndex = allLessons.findIndex(l => l.id === activeLesson);
                                        if (currentIndex > 0) setActiveLesson(allLessons[currentIndex - 1].id);
                                    }}
                                    disabled={allLessons.findIndex(l => l.id === activeLesson) <= 0}
                                >
                                    <ChevronLeft className="w-5 h-5 sm:mr-1 text-gray-400" />
                                    <span className="hidden sm:inline font-medium">Önceki Konu</span>
                                </Button>
                                <Button 
                                    variant="primary" 
                                    className="flex-1 sm:flex-none justify-center px-6"
                                    onClick={() => {
                                        const currentIndex = allLessons.findIndex(l => l.id === activeLesson);
                                        if (currentIndex < allLessons.length - 1) setActiveLesson(allLessons[currentIndex + 1].id);
                                    }}
                                    disabled={allLessons.findIndex(l => l.id === activeLesson) >= allLessons.length - 1}
                                >
                                    <span className="hidden sm:inline font-medium text-black">Sonraki Konu</span>
                                    <span className="sm:hidden font-medium text-black">Sonraki</span>
                                    <ChevronRight className="w-5 h-5 sm:ml-1 text-black" />
                                </Button>
                            </div>
                        </div>

                        {/* Content Area */}
                        {isQuizActive ? (
                            <div className="flex-1 mt-4">
                                <Quiz
                                    onComplete={(score, total) => {
                                        setIsQuizActive(false);
                                        markMaterialComplete(activeLesson, 'quiz', score, total);
                                    }}
                                    onQuit={() => setIsQuizActive(false)}
                                    questions={currentLessonData?.questions}
                                />
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col">
                                {currentLessonData?.type !== "quiz" && (
                                    currentLessonData?.imageUrl ? (
                                        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden mb-8 relative border border-white/5">
                                            <img
                                                src={currentLessonData.imageUrl}
                                                alt={currentLessonData.title}
                                                className="w-full h-full absolute inset-0 object-cover opacity-90"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-video bg-[#1A1A1A] rounded-xl overflow-hidden mb-8 relative border border-white/5 flex flex-col items-center justify-center">
                                            <Monitor className="w-12 h-12 text-gray-700 mb-4" />
                                            <span className="text-gray-500 font-medium text-sm">Bu bölüm için görsel eklenmemiş</span>
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

                                <div className="text-gray-300 font-light leading-relaxed flex-1">
                                    {activeTab === "genel_bakis" && (
                                        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 sm:p-8">
                                            <h4 className="text-xl font-semibold text-white mb-4">Konu Hakkında</h4>
                                            <p className="mb-6 text-gray-400 text-base leading-relaxed whitespace-pre-wrap">
                                                {currentLessonData?.description || `Bu derste, ${currentLessonData?.title} konusunun akademik temellerini atacağız. Kaynakların metodolojik incelemesi ve yazarın dönemsel etkileri merkeze alınacaktır. Bu konuyu kendi hızınızda tamamlamak için çoklu format destekleyen Materyaller sekmemizi kullanabilirsiniz.`}
                                            </p>
                                            <div className="bg-[#202024] border border-white/5 rounded-xl p-5">
                                                <h5 className="font-medium text-white mb-2 flex items-center gap-2">
                                                    <HelpCircle className="w-4 h-4 text-brand-gold" />
                                                    Nasıl İlerlemeliyim?
                                                </h5>
                                                <p className="text-gray-400 text-sm">
                                                    Öncelikle <strong>"Materyaller"</strong> sekmesine giderek "Sesli Özet" veya "PDF Okuma" modüllerinden biriyle konuya giriş yapın. Ardından sunumu inceleyin ve son olarak "Modül Testi" ile bilginizi sınayarak doğrudan sonraki konuya geçiş yapın.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "materyaller" && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {currentLessonData?.pdfUrl && (
                                                <div 
                                                    onClick={() => {
                                                        setActivePdfUrl(currentLessonData.pdfUrl);
                                                        markMaterialComplete(activeLesson, 'pdf');
                                                    }}
                                                    className={`flex items-center justify-between p-5 border rounded-2xl cursor-pointer transition-all duration-300 ${completedMaterials[`${activeLesson}-pdf`] ? 'bg-gradient-to-r from-brand-gold/10 to-[#1A1A1A] border-brand-gold/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'bg-[#1A1A1A] hover:bg-[#202024] border-white/5 hover:border-brand-gold/30'}`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-3 rounded-xl relative ${completedMaterials[`${activeLesson}-pdf`] ? 'bg-brand-gold/20' : 'bg-[#28282C]'}`}>
                                                            <FileText className={`w-6 h-6 ${completedMaterials[`${activeLesson}-pdf`] ? 'text-brand-gold' : 'text-gray-300'}`} />
                                                            {completedMaterials[`${activeLesson}-pdf`] && (
                                                                <CheckCircle2 className="w-4 h-4 text-brand-gold absolute -top-1 -right-1 bg-[#1A1A1A] rounded-full drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-medium text-lg">PDF Okuma</div>
                                                            <div className="text-sm text-gray-500 mt-0.5">
                                                                {completedMaterials[`${activeLesson}-pdf`] ? <span className="text-brand-gold">Tamamlandı</span> : 'Detaylı Ders Notları'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm" className={`font-medium text-xs px-4 ${completedMaterials[`${activeLesson}-pdf`] ? 'border-brand-gold/50 text-brand-gold hover:bg-brand-gold/10' : ''}`}>{completedMaterials[`${activeLesson}-pdf`] ? 'Tekrar Aç' : 'Aç'}</Button>
                                                </div>
                                            )}

                                            {currentLessonData?.slideUrl && (
                                                <div 
                                                    onClick={() => {
                                                        setActiveSlideUrl(currentLessonData.slideUrl);
                                                        markMaterialComplete(activeLesson, 'slide');
                                                    }}
                                                    className={`flex items-center justify-between p-5 border rounded-2xl cursor-pointer transition-all duration-300 ${completedMaterials[`${activeLesson}-slide`] ? 'bg-gradient-to-r from-brand-gold/10 to-[#1A1A1A] border-brand-gold/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'bg-[#1A1A1A] hover:bg-[#202024] border-white/5 hover:border-brand-gold/30'}`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-3 rounded-xl relative ${completedMaterials[`${activeLesson}-slide`] ? 'bg-brand-gold/20' : 'bg-[#28282C]'}`}>
                                                            <Monitor className={`w-6 h-6 ${completedMaterials[`${activeLesson}-slide`] ? 'text-brand-gold' : 'text-gray-300'}`} />
                                                            {completedMaterials[`${activeLesson}-slide`] && (
                                                                <CheckCircle2 className="w-4 h-4 text-brand-gold absolute -top-1 -right-1 bg-[#1A1A1A] rounded-full drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-medium text-lg">Slayt</div>
                                                            <div className="text-sm text-gray-500 mt-0.5">
                                                                {completedMaterials[`${activeLesson}-slide`] ? <span className="text-brand-gold">Tamamlandı</span> : 'Görsel Sunum (PDF)'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm" className={`font-medium text-xs px-4 ${completedMaterials[`${activeLesson}-slide`] ? 'border-brand-gold/50 text-brand-gold hover:bg-brand-gold/10' : ''}`}>{completedMaterials[`${activeLesson}-slide`] ? 'Tekrar İncele' : 'İncele'}</Button>
                                                </div>
                                            )}

                                            {currentLessonData?.audioUrl && (
                                                <div 
                                                    onClick={() => {
                                                        setActiveAudioUrl(currentLessonData.audioUrl);
                                                        markMaterialComplete(activeLesson, 'audio');
                                                    }}
                                                    className={`flex items-center justify-between p-5 border rounded-2xl cursor-pointer transition-all duration-300 ${completedMaterials[`${activeLesson}-audio`] ? 'bg-gradient-to-r from-brand-gold/10 to-[#1A1A1A] border-brand-gold/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'bg-[#1A1A1A] hover:bg-[#202024] border-white/5 hover:border-brand-gold/30'}`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-3 rounded-xl relative ${completedMaterials[`${activeLesson}-audio`] ? 'bg-brand-gold/20' : 'bg-[#28282C]'}`}>
                                                            <Headphones className={`w-6 h-6 ${completedMaterials[`${activeLesson}-audio`] ? 'text-brand-gold' : 'text-gray-300'}`} />
                                                            {completedMaterials[`${activeLesson}-audio`] && (
                                                                <CheckCircle2 className="w-4 h-4 text-brand-gold absolute -top-1 -right-1 bg-[#1A1A1A] rounded-full drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-medium text-lg">Sesli Özet</div>
                                                            <div className="text-sm text-gray-500 mt-0.5">
                                                                {completedMaterials[`${activeLesson}-audio`] ? <span className="text-brand-gold">Tamamlandı</span> : 'Dinleyerek Öğrenin (mp3)'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm" className={`font-medium text-xs px-4 ${completedMaterials[`${activeLesson}-audio`] ? 'border-brand-gold/50 text-brand-gold hover:bg-brand-gold/10' : ''}`}>{completedMaterials[`${activeLesson}-audio`] ? 'Tekrar Dinle' : 'Dinle'}</Button>
                                                </div>
                                            )}

                                            {(!currentLessonData?.pdfUrl && !currentLessonData?.slideUrl && !currentLessonData?.audioUrl) && (
                                                <div className="col-span-1 md:col-span-2 text-center p-6 bg-[#1A1A1A] border border-white/5 rounded-2xl flex flex-col items-center justify-center">
                                                    <FileText className="w-8 h-8 text-gray-600 mb-2" />
                                                    <p className="text-gray-400 text-sm">Bu ders için eklenmiş ekstra bir çalışma materyali bulunmuyor.</p>
                                                </div>
                                            )}

                                            <div
                                                onClick={() => setIsQuizActive(true)}
                                                className={`flex items-center justify-between p-5 border rounded-2xl cursor-pointer md:col-span-2 xl:col-span-1 transition-all duration-300 ${completedMaterials[`${activeLesson}-quiz`] ? 'bg-gradient-to-r from-brand-gold/20 to-[#1A1A1A] border-brand-gold shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'bg-[#1A1A1A] hover:bg-[#202024] border-brand-gold/20 hover:border-brand-gold/50'}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-xl relative ${completedMaterials[`${activeLesson}-quiz`] ? 'bg-brand-gold/30' : 'bg-[#28282C]'}`}>
                                                        <CheckSquare className={`w-6 h-6 ${completedMaterials[`${activeLesson}-quiz`] ? 'text-brand-gold drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]' : 'text-brand-gold'}`} />
                                                        {completedMaterials[`${activeLesson}-quiz`] && (
                                                            <CheckCircle2 className="w-4 h-4 text-brand-gold absolute -top-1 -right-1 bg-[#1A1A1A] rounded-full drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-medium text-lg">Modül Testi</div>
                                                        <div className="text-sm text-gray-400 mt-0.5">
                                                            {completedMaterials[`${activeLesson}-quiz`]
                                                                ? <span className="text-brand-gold font-medium">Başarıyla Tamamlandı</span>
                                                                : (currentLessonData?.questions && currentLessonData.questions.length > 0)
                                                                    ? `${currentLessonData.questions.length} Soru`
                                                                    : 'Bilginizi Sınayın'
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant={completedMaterials[`${activeLesson}-quiz`] ? "outline" : "primary"} size="sm" className={`font-medium text-xs px-4 ${completedMaterials[`${activeLesson}-quiz`] ? 'border-brand-gold text-brand-gold hover:bg-brand-gold/10' : 'text-black'}`}>{completedMaterials[`${activeLesson}-quiz`] ? 'Tekrar Çöz' : 'Çöz'}</Button>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "tartisma" && (
                                        <div className="text-center py-16 bg-[#1A1A1A] border border-white/5 rounded-2xl">
                                            <MessageCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                            <h3 className="text-xl font-semibold text-white mb-2">Tartışma Alanı</h3>
                                            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">Soru sormak, yanıtları okumak ve diğer akademik öğrencilerle etkileşime geçmek için lütfen giriş yapın veya kayıt olun.</p>
                                            <Button variant="outline" className="px-6 py-2">Giriş Yap / Kayıt Ol</Button>
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
