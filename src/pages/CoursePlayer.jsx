import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

export function CoursePlayer() {
    const { id } = useParams();
    const courseId = id || "1";
    const { courses, loading: contextLoading } = useCourses();
    const course = courses.find(c => c.id === courseId) || null;
    const loading = contextLoading;

    const { addXp } = useLibrary();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeLesson, setActiveLesson] = useState(1);
    const [activeTab, setActiveTab] = useState("genel_bakis"); // genel_bakis, materyaller, tartisma
    const [isQuizActive, setIsQuizActive] = useState(false);

    // Change Curriculum to State for interactivity
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
                        testUrl: m.testUrl,
                        description: m.description,
                        pdfUrl: m.pdfUrl,
                        slideUrl: m.slideUrl,
                        audioUrl: m.audioUrl,
                        type: "lesson",
                        completed: false
                    }))
                }
            ];
            
            // Eğer istersen sonuna genel quiz eklenebilir. Şimdilik kaldırabiliriz veya durabilir.
            formattedCurriculum[0].lessons.push({
                id: 999,
                title: "Eğitim Sonu Değerlendirmesi",
                type: "quiz",
                completed: false
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

    // const getEmbedUrl = (url) => ...

    const toggleLessonComplete = (lessonId, e) => {
        e.stopPropagation(); // prevent setActiveLesson if clicking exactly on complete icon (though we apply it to generic click here)
        setCurriculum(prev => prev.map(mod => ({
            ...mod,
            lessons: mod.lessons.map(l => {
                if (l.id === lessonId) {
                    const act = !l.completed;
                    if (act) {
                        toast.success(`"${l.title}" tamamlandı işaretlendi!`, {
                            style: { background: "#10B981", color: "#fff", border: "none" }
                        });
                        addXp(100);
                    }
                    return { ...l, completed: act };
                }
                return l;
            })
        })));
    };

    const currentLessonData = curriculum.flatMap(m => m.lessons).find(l => l.id === activeLesson);

    // Calculate total progress
    const allLessons = curriculum.flatMap(m => m.lessons);
    const completedCount = allLessons.filter(l => l.completed).length;
    const progressPercentage = Math.round((completedCount / allLessons.length) * 100);

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
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-brand-gold to-brand-gold-dark rounded-full"
                            ></motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Player Area */}
            <div className="flex-1 flex overflow-hidden relative">

                {/* Left Sidebar (Curriculum) */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                            initial={{ x: -320, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -320, opacity: 0 }}
                            transition={{ duration: 0.3 }}
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
                                                        {lesson.completed ? (
                                                            <CheckCircle2 className="w-5 h-5 text-brand-gold hover:text-white transition-colors" />
                                                        ) : (
                                                            <div className={`w-5 h-5 rounded-full border-2 hover:border-brand-gold transition-colors flex items-center justify-center ${activeLesson === lesson.id ? "border-brand-gold/50" : "border-gray-500"}`}></div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className={`text-sm font-medium mb-1 truncate ${activeLesson === lesson.id ? "text-white" : "text-gray-400"}`}>
                                                            {lesson.title}
                                                        </div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                                            Modül Eğitimi
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
                                    onComplete={() => setIsQuizActive(false)}
                                    onQuit={() => setIsQuizActive(false)}
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
                                                <motion.div layoutId="playerTab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold rounded-t-lg" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Contents */}
                                <div className="text-gray-300 font-light leading-relaxed flex-1">
                                    {activeTab === "genel_bakis" && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 sm:p-10 shadow-xl">
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
                                        </motion.div>
                                    )}

                                    {activeTab === "materyaller" && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Dinamik Materyaller */}
                                            {currentLessonData?.pdfUrl && (
                                                <div 
                                                    onClick={() => window.open(currentLessonData.pdfUrl, "_blank")}
                                                    className="flex items-center justify-between p-6 bg-[#1A1A1A] border border-white/5 rounded-3xl hover:border-brand-gold/30 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg"
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <div className="bg-brand-gold/10 p-4 rounded-2xl group-hover:bg-brand-gold/20 transition-colors">
                                                            <FileText className="w-8 h-8 text-brand-gold" />
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-black text-xl group-hover:text-brand-gold transition-colors">PDF Okuma</div>
                                                            <div className="text-sm font-medium text-gray-500 mt-1">Detaylı Ders Notları</div>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" className="font-bold">Aç</Button>
                                                </div>
                                            )}

                                            {currentLessonData?.slideUrl && (
                                                <div 
                                                    onClick={() => window.open(currentLessonData.slideUrl, "_blank")}
                                                    className="flex items-center justify-between p-6 bg-[#1A1A1A] border border-white/5 rounded-3xl hover:border-brand-gold/30 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg"
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <div className="bg-brand-gold/10 p-4 rounded-2xl group-hover:bg-brand-gold/20 transition-colors">
                                                            <Monitor className="w-8 h-8 text-brand-gold" />
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-black text-xl group-hover:text-brand-gold transition-colors">Slayt</div>
                                                            <div className="text-sm font-medium text-gray-500 mt-1">Görsel Sunum</div>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" className="font-bold">İncele</Button>
                                                </div>
                                            )}

                                            {currentLessonData?.audioUrl && (
                                                <div 
                                                    onClick={() => window.open(currentLessonData.audioUrl, "_blank")}
                                                    className="flex items-center justify-between p-6 bg-[#1A1A1A] border border-white/5 rounded-3xl hover:border-brand-gold/30 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg"
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <div className="bg-brand-gold/10 p-4 rounded-2xl group-hover:bg-brand-gold/20 transition-colors">
                                                            <Headphones className="w-8 h-8 text-brand-gold" />
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-black text-xl group-hover:text-brand-gold transition-colors">Sesli Özet</div>
                                                            <div className="text-sm font-medium text-gray-500 mt-1">Dinleyerek Öğrenin (mp3)</div>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" className="font-bold">Dinle</Button>
                                                </div>
                                            )}

                                            {(!currentLessonData?.pdfUrl && !currentLessonData?.slideUrl && !currentLessonData?.audioUrl) && (
                                                <div className="col-span-1 md:col-span-2 text-center p-8 bg-[#1A1A1A] border border-white/5 rounded-3xl">
                                                    <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                                    <p className="text-gray-400">Bu ders için eklenmiş ekstra bir çalışma materyali bulunmuyor.</p>
                                                </div>
                                            )}

                                            {currentLessonData?.testUrl ? (
                                                <div
                                                    onClick={() => window.open(currentLessonData.testUrl, "_blank")}
                                                    className="flex items-center justify-between p-6 bg-[#1A1A1C] border-2 border-brand-gold/20 rounded-3xl hover:border-brand-gold transition-all cursor-pointer group hover:-translate-y-1 shadow-[0_0_30px_rgba(251,191,36,0.05)] relative overflow-hidden md:col-span-2 xl:col-span-1"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 flex-transparent pointer-events-none"></div>
                                                    <div className="flex items-center gap-5 relative z-10">
                                                        <div className="bg-brand-gold p-4 rounded-2xl text-brand-black group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                                                            <CheckSquare className="w-8 h-8" />
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-black text-xl transition-colors">Dış Bağlantılı Test</div>
                                                            <div className="text-sm font-bold text-brand-gold/80 mt-1">Harici Platformda Çöz</div>
                                                        </div>
                                                    </div>
                                                    <Button variant="primary" className="relative z-10 font-bold px-6 shadow-[0_0_15px_rgba(251,191,36,0.4)]">Testi Aç</Button>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => setIsQuizActive(true)}
                                                    className="flex items-center justify-between p-6 bg-[#1A1A1C] border-2 border-brand-gold/20 rounded-3xl hover:border-brand-gold transition-all cursor-pointer group hover:-translate-y-1 shadow-[0_0_30px_rgba(251,191,36,0.05)] relative overflow-hidden md:col-span-2 xl:col-span-1"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 flex-transparent pointer-events-none"></div>
                                                    <div className="flex items-center gap-5 relative z-10">
                                                        <div className="bg-brand-gold p-4 rounded-2xl text-brand-black group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                                                            <CheckSquare className="w-8 h-8" />
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-black text-xl transition-colors">Modül Testi</div>
                                                            <div className="text-sm font-bold text-brand-gold/80 mt-1">Bilginizi Sınayın</div>
                                                        </div>
                                                    </div>
                                                    <Button variant="primary" className="relative z-10 font-bold px-6 shadow-[0_0_15px_rgba(251,191,36,0.4)]">Çöz</Button>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {activeTab === "tartisma" && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-[#1A1A1A] border border-white/5 rounded-3xl shadow-xl">
                                            <MessageCircle className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                                            <h3 className="text-2xl font-black text-white mb-3">Tartışma Alanı</h3>
                                            <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">Soru sormak, yanıtları okumak ve diğer akademik öğrencilerle etkileşime geçmek için lütfen giriş yapın veya kayıt olun.</p>
                                            <Button variant="primary" className="px-8 py-3 text-lg font-bold">Giriş Yap / Kayıt Ol</Button>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CoursePlayer;
