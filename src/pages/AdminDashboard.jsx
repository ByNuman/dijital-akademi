import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { collection, setDoc, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { courses as coursesData } from "../data/coursesData";
import { toast } from "sonner";
import { Button } from "../components/ui/Button";

import { Plus, Database, LayoutDashboard, LayoutList, Trash2, Edit, BookOpen, Users, Trophy, HelpCircle, X as XIcon } from "lucide-react";

export function AdminDashboard() {
    const { userData } = useAuth();
    const [activeTab, setActiveTab] = useState("overview"); // overview, addCourse, courses, tools
    const [isMigrating, setIsMigrating] = useState(false);
    const [courses, setCourses] = useState([]);
    const [usersCount, setUsersCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [editingCourse, setEditingCourse] = useState(null);
    const [moduleForm, setModuleForm] = useState({
        title: "",
        imageUrl: "",
        description: "",
        pdfUrl: "",
        slideUrl: "",
        audioUrl: "",
        questions: []
    });
    const [questionForm, setQuestionForm] = useState({
        text: "",
        options: ["", "", "", ""],
        correctAnswer: 0
    });

    const predefinedCourses = {
        "Hadis 2": "Temel İslam Bilimleri",
        "İslam Hukuk Usulü 2": "Temel İslam Bilimleri",
        "Kelam Tarihi": "Temel İslam Bilimleri",
        "Tefsir 2": "Temel İslam Bilimleri",
        "Din Psikolojisi": "Felsefe ve Din Bilimleri",
        "Din Sosyolojisi": "Felsefe ve Din Bilimleri",
        "Felsefe Tarihi 2": "Felsefe ve Din Bilimleri",
        "İslam Tarihi 3": "İslam Tarihi ve Sanatları",
        "Arap Dili ve Edebiyatı 4": "Dil Eğitimi",
        "Öğretim İlke ve Yöntemleri": "Eğitim Bilimleri / Pedagojik Formasyon"
    };

    // Form states
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Temel İslam Bilimleri",
        coverImage: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            // Fetch courses
            const coursesSnap = await getDocs(collection(db, "courses"));
            const coursesList = coursesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCourses(coursesList);

            // Fetch users (if admin has permission, just getting count for now)
            try {
                const usersSnap = await getDocs(collection(db, "users"));
                setUsersCount(usersSnap.size);
            } catch (err) {
                // If rules restrict reading all users, ignore error
                console.log("Could not fetch user count, probably rules restricted", err);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error("Veriler alınırken hata oluştu.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newCategory = formData.category;
        
        if (name === "title" && predefinedCourses[value]) {
            newCategory = predefinedCourses[value];
        }

        setFormData(prev => ({ 
            ...prev, 
            [name]: value,
            category: newCategory
        }));
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        
        if (!formData.title || !formData.description || !formData.category) {
            toast.error("Lütfen zorunlu alanları doldurun.");
            return;
        }

        setIsSubmitting(true);
        try {
            const courseId = formData.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
            const newCourse = {
                ...formData,
                id: courseId,
                rating: 0,
                students: 0,
                price: 0,
                level: "Tüm Seviyeler",
                instructor: userData?.name || "Eğitmen Akademi",
                tags: [],
                modules: [
                    {
                        title: "Giriş ve Kurulum",
                        imageUrl: "",
                        description: "Bu derse giriş modülüdür.",
                        pdfUrl: "",
                        slideUrl: "",
                        audioUrl: "",
                        questions: []
                    }
                ]
            };

            // Firestore'a göndermeden önce tüm veriyi saf JSON objesine dönüştür
            const cleanCourse = JSON.parse(JSON.stringify(newCourse));
            await setDoc(doc(db, "courses", courseId), cleanCourse);
            
            toast.success("Ders başarıyla eklendi!", {
                style: { background: "#FBBF24", color: "#101010", border: "none" }
            });
            
            setFormData({
                title: "",
                description: "",
                category: "Temel İslam Bilimleri",
                coverImage: "",
            });
            
            fetchDashboardData(); // Refresh list
            setActiveTab("courses");
            
        } catch (error) {
            console.error("Ders ekleme hatası:", error);
            toast.error("Ders eklenirken bir hata oluştu: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        if (!window.confirm("Bu dersi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) return;
        
        try {
            await deleteDoc(doc(db, "courses", courseId));
            toast.success("Ders silindi.");
            fetchDashboardData();
        } catch (error) {
            console.error("Ders silme hatası:", error);
            toast.error("Silme işlemi başarısız: " + error.message);
        }
    };

    const handleEditCourseChange = (e) => {
        const { name, value } = e.target;
        setEditingCourse(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateCourse = async (e) => {
        if (e) e.preventDefault();
        if (!editingCourse.title || !editingCourse.description || !editingCourse.category) {
            toast.error("Lütfen zorunlu alanları doldurun.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Firestore'a gönderilecek veriyi hazırla - id alanını çıkar ve saf JSON objesine dönüştür
            const { id, ...courseDataToSave } = editingCourse;
            // undefined, fonksiyon vb. serileştirilemez değerleri temizle
            const cleanData = JSON.parse(JSON.stringify(courseDataToSave));
            // Modüller içindeki boş string alanları da temizle (Firestore uyumu)
            if (cleanData.modules) {
                cleanData.modules = cleanData.modules.map(m => ({
                    title: m.title || "",
                    imageUrl: m.imageUrl || "",
                    description: m.description || "",
                    pdfUrl: m.pdfUrl || "",
                    slideUrl: m.slideUrl || "",
                    audioUrl: m.audioUrl || "",
                    questions: Array.isArray(m.questions) ? m.questions.map(q => ({
                        text: q.text || "",
                        options: Array.isArray(q.options) ? q.options.map(o => String(o)) : ["", "", "", ""],
                        correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0
                    })) : []
                }));
            }
            await updateDoc(doc(db, "courses", id), cleanData);
            toast.success("Ders detayları ve konuları başarıyla güncellendi!", {
                style: { background: "#10B981", color: "#fff", border: "none" }
            });
            fetchDashboardData();
            setActiveTab("courses");
            setEditingCourse(null);
        } catch (error) {
            console.error("Güncelleme hatası:", error);
            toast.error("Güncellenirken bir hata oluştu: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddModule = () => {
        if (!moduleForm.title) {
            toast.error("Konu başlığı zorunludur.");
            return;
        }
        setEditingCourse(prev => ({
            ...prev,
            modules: [...(prev.modules || []), { ...moduleForm }]
        }));
        setModuleForm({ title: "", imageUrl: "", description: "", pdfUrl: "", slideUrl: "", audioUrl: "", questions: [] });
        setQuestionForm({ text: "", options: ["", "", "", ""], correctAnswer: 0 });
        toast.success("Konu dizeye eklendi (Değişiklikleri kaydetmeyi unutmayın).");
    };

    // Modüle soru ekleme (yeni konu ekleme formundan)
    const handleAddQuestionToModuleForm = () => {
        if (!questionForm.text || questionForm.options.some(o => !o.trim())) {
            toast.error("Soru metni ve tüm şıklar zorunludur.");
            return;
        }
        setModuleForm(prev => ({
            ...prev,
            questions: [...(prev.questions || []), { ...questionForm }]
        }));
        setQuestionForm({ text: "", options: ["", "", "", ""], correctAnswer: 0 });
        toast.success("Soru eklendi!");
    };

    // Mevcut modüle soru ekleme (edit modundan)
    const handleAddQuestionToExistingModule = (moduleIndex) => {
        if (!questionForm.text || questionForm.options.some(o => !o.trim())) {
            toast.error("Soru metni ve tüm şıklar zorunludur.");
            return;
        }
        setEditingCourse(prev => {
            const newModules = [...(prev.modules || [])];
            if (!newModules[moduleIndex].questions) newModules[moduleIndex].questions = [];
            newModules[moduleIndex].questions.push({ ...questionForm });
            return { ...prev, modules: newModules };
        });
        setQuestionForm({ text: "", options: ["", "", "", ""], correctAnswer: 0 });
        toast.success("Soru modüle eklendi!");
    };

    // Modülden soru silme
    const handleDeleteQuestion = (moduleIndex, questionIndex) => {
        setEditingCourse(prev => {
            const newModules = [...(prev.modules || [])];
            newModules[moduleIndex].questions.splice(questionIndex, 1);
            return { ...prev, modules: newModules };
        });
    };

    const handleDeleteModule = (index) => {
        if (!window.confirm("Bu konuyu listeden çıkarmak istediğinize emin misiniz?")) return;
        setEditingCourse(prev => {
            const newModules = [...(prev.modules || [])];
            newModules.splice(index, 1);
            return { ...prev, modules: newModules };
        });
    };

    const migrateDataToFirebase = async () => {
        if (!window.confirm("Bütün mock veriler (coursesData.js) Firebase'e yazılacak. Mevcut aynı ID'ye sahip dersler ezilecek. Onaylıyor musunuz?")) return;

        setIsMigrating(true);
        try {
            for (const course of coursesData) {
                const courseRef = doc(db, "courses", course.id.toString());
                await setDoc(courseRef, course);
            }
            toast.success("Tüm veriler başarıyla Firebase'e eklendi!", {
                style: { background: "#FBBF24", color: "#101010", border: "none" }
            });
            fetchDashboardData();
        } catch (error) {
            console.error("Migration error:", error);
            toast.error("Veri aktarımı sırasında bir hata oluştu: " + error.message, {
                style: { background: "#EF4444", color: "#FFFFFF", border: "none" }
            });
        } finally {
            setIsMigrating(false);
        }
    };

    const tabs = [
        { id: "overview", label: "Genel Bakış", icon: LayoutDashboard },
        { id: "courses", label: "Dersler", icon: LayoutList },
        { id: "addCourse", label: "Ders Ekle", icon: Plus },
        { id: "tools", label: "Araçlar", icon: Database },
    ];

    if (userData?.role !== "admin") {
        return null; // Should be handled by AdminRoute, logic kept just in case
    }

    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#101010]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* Sidebar */}
                    <div 
                        className="w-full md:w-64 shrink-0"
                    >
                        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 sticky top-32">
                            <h2 className="text-xl font-bold text-white mb-6">Yönetici Paneli</h2>
                            <div className="space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                                activeTab === tab.id 
                                                ? "bg-brand-gold text-brand-black font-semibold" 
                                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                            }`}
                                        >
                                            <Icon size={18} />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        
                            <div
                            >
                                {/* Overview Tab */}
                                {activeTab === "overview" && (
                                    <div className="space-y-6">
                                        <h1 className="text-3xl font-bold text-white mb-6">Genel Bakış</h1>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-brand-gold/20">
                                                <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-4">
                                                    <BookOpen size={24} />
                                                </div>
                                                <h3 className="text-gray-400 text-sm font-medium">Toplam Ders</h3>
                                                <p className="text-3xl font-bold text-white mt-1">{isLoading ? "..." : courses.length}</p>
                                            </div>

                                            <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-brand-gold/20">
                                                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mb-4">
                                                    <Users size={24} />
                                                </div>
                                                <h3 className="text-gray-400 text-sm font-medium">Toplam Öğrenci</h3>
                                                <p className="text-3xl font-bold text-white mt-1">{isLoading ? "..." : usersCount}</p>
                                                <p className="text-xs text-gray-500 mt-2">* Güvenlik kuralları gereği tam sayı yansımayabilir.</p>
                                            </div>

                                            <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-brand-gold/20">
                                                <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-4">
                                                    <Trophy size={24} />
                                                </div>
                                                <h3 className="text-gray-400 text-sm font-medium">Sistem Durumu</h3>
                                                <p className="text-3xl font-bold text-white mt-1">Aktif</p>
                                            </div>
                                        </div>

                                        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 mt-8">
                                            <h3 className="text-xl font-bold text-brand-gold mb-4">Hoş Geldiniz, {userData?.name}</h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                Bu panel üzerinden platformdaki dersleri yönetebilir, yeni içerikler ekleyebilir ve istatistikleri takip edebilirsiniz. Tüm işlemler anında veritabanına yansıyacaktır.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Courses List Tab */}
                                {activeTab === "courses" && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h1 className="text-3xl font-bold text-white">Mevcut Dersler</h1>
                                            <Button onClick={() => setActiveTab("addCourse")} variant="primary" className="gap-2">
                                                <Plus size={18} /> Yeni Ekle
                                            </Button>
                                        </div>

                                        <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden">
                                            {isLoading ? (
                                                <div className="p-8 text-center text-gray-400">Yükleniyor...</div>
                                            ) : courses.length === 0 ? (
                                                <div className="p-8 text-center text-gray-400">Henüz ders bulunmuyor.</div>
                                            ) : (
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-left">
                                                        <thead className="bg-[#222] border-b border-white/5">
                                                            <tr>
                                                                <th className="p-4 text-sm font-medium text-gray-400">Ders Adı</th>
                                                                <th className="p-4 text-sm font-medium text-gray-400">Kategori</th>
                                                                <th className="p-4 text-sm font-medium text-gray-400">Seviye</th>
                                                                <th className="p-4 text-sm font-medium text-gray-400 text-right">İşlemler</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-white/5">
                                                            {courses.map(course => (
                                                                <tr key={course.id} className="hover:bg-white/[0.02] transition-colors">
                                                                    <td className="p-4 text-white font-medium">{course.title}</td>
                                                                    <td className="p-4 text-brand-gold">{course.category}</td>
                                                                    <td className="p-4 text-gray-400">{course.level}</td>
                                                                    <td className="p-4 text-right">
                                                                        <div className="flex items-center justify-end gap-2">
                                                                            <button 
                                                                                onClick={() => {
                                                                                    setEditingCourse(course);
                                                                                    setActiveTab("editCourse");
                                                                                }}
                                                                                className="p-2 text-gray-400 hover:text-white transition-colors"
                                                                                title="Dersi ve Konuları Düzenle"
                                                                            >
                                                                                <Edit size={16} />
                                                                            </button>
                                                                            <button 
                                                                                onClick={() => handleDeleteCourse(course.id)}
                                                                                className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                                                                            >
                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Add Course Tab */}
                                {activeTab === "addCourse" && (
                                    <div className="space-y-6">
                                        <h1 className="text-3xl font-bold text-white mb-6">Yeni Ders Ekle</h1>
                                        
                                        <form onSubmit={handleAddCourse} className="bg-[#1A1A1A] p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
                                            
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Ders Başlığı *</label>
                                                <input 
                                                    type="text" 
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    list="course-list"
                                                    className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                                    placeholder="Örn: Hadis 2"
                                                    required
                                                />
                                                <datalist id="course-list">
                                                    {Object.keys(predefinedCourses).map(cName => (
                                                        <option key={cName} value={cName} />
                                                    ))}
                                                </datalist>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Açıklama *</label>
                                                <textarea 
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    rows="4"
                                                    className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none"
                                                    placeholder="Ders hakkında detaylı bir açıklama girin..."
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Kategori</label>
                                                <select 
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                                >
                                                    <option value="Temel İslam Bilimleri">Temel İslam Bilimleri</option>
                                                    <option value="Felsefe ve Din Bilimleri">Felsefe ve Din Bilimleri</option>
                                                    <option value="İslam Tarihi ve Sanatları">İslam Tarihi ve Sanatları</option>
                                                    <option value="Dil Eğitimi">Dil Eğitimi</option>
                                                    <option value="Eğitim Bilimleri / Pedagojik Formasyon">Eğitim Bilimleri / Pedagojik Formasyon</option>
                                                </select>
                                            </div>


                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Kapak Fotoğrafı URL</label>
                                                <input 
                                                    type="url" 
                                                    name="coverImage"
                                                    value={formData.coverImage}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                                    placeholder="https://..."
                                                />
                                            </div>

                                            <div className="pt-4 border-t border-white/5">
                                                <Button 
                                                    type="submit" 
                                                    variant="primary" 
                                                    disabled={isSubmitting}
                                                    className="w-full sm:w-auto min-w-[200px] font-bold py-4"
                                                >
                                                    {isSubmitting ? "Ders Ekleniyor..." : "Dersi Kaydet ve Yayınla"}
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/* Edit Course Tab */}
                                {activeTab === "editCourse" && editingCourse && (
                                    <div className="space-y-6">
                                        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mb-6">
                                            <h1 className="text-3xl font-bold text-white leading-tight">
                                                Dersi Düzenle: <span className="text-brand-gold">{editingCourse.title}</span>
                                            </h1>
                                            <Button onClick={() => setActiveTab("courses")} variant="outline" className="border-white/10 text-white shrink-0">
                                                Geri Dön
                                            </Button>
                                        </div>
                                        
                                        <div className="bg-[#1A1A1A] p-6 sm:p-8 rounded-2xl border border-white/5 space-y-8">
                                            {/* 1. Ders Detayları */}
                                            <div>
                                                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                    <span className="w-8 h-8 rounded-full bg-brand-gold/10 text-brand-gold flex justify-center items-center text-sm">1</span> 
                                                    Ders Genel Bilgileri
                                                </h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-gray-300">Ders Başlığı</label>
                                                        <input 
                                                            type="text" 
                                                            name="title"
                                                            value={editingCourse.title}
                                                            onChange={handleEditCourseChange}
                                                            className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-gray-300">Kategori</label>
                                                        <select 
                                                            name="category"
                                                            value={editingCourse.category}
                                                            onChange={handleEditCourseChange}
                                                            className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                                        >
                                                            <option value="Temel İslam Bilimleri">Temel İslam Bilimleri</option>
                                                            <option value="Felsefe ve Din Bilimleri">Felsefe ve Din Bilimleri</option>
                                                            <option value="İslam Tarihi ve Sanatları">İslam Tarihi ve Sanatları</option>
                                                            <option value="Dil Eğitimi">Dil Eğitimi</option>
                                                            <option value="Eğitim Bilimleri / Pedagojik Formasyon">Eğitim Bilimleri / Pedagojik Formasyon</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-sm font-medium text-gray-300">Kapak Fotoğrafı URL</label>
                                                        <input 
                                                            type="text" 
                                                            name="coverImage"
                                                            value={editingCourse.coverImage || ""}
                                                            onChange={handleEditCourseChange}
                                                            className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                                        />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-sm font-medium text-gray-300">Açıklama</label>
                                                        <textarea 
                                                            name="description"
                                                            value={editingCourse.description}
                                                            onChange={handleEditCourseChange}
                                                            rows="3"
                                                            className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="h-px bg-white/5 w-full"></div>

                                            {/* 2. Modüller */}
                                            <div>
                                                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                    <span className="w-8 h-8 rounded-full bg-brand-gold/10 text-brand-gold flex justify-center items-center text-sm">2</span> 
                                                    Ders Konuları (Müfredat)
                                                </h2>
                                                
                                                {/* Mevcut Modüller */}
                                                <div className="space-y-3 mb-6">
                                                    {(editingCourse.modules || []).length === 0 ? (
                                                        <p className="text-gray-400 text-sm">Hiç konu eklenmemiş.</p>
                                                    ) : (
                                                        editingCourse.modules.map((mod, idx) => (
                                                            <div key={idx} className="bg-[#222] p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                                                                <div className="flex-1">
                                                                    <h4 className="font-bold text-white text-lg">{idx + 1}. {mod.title}</h4>
                                                                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">{mod.description}</p>
                                                                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500 bg-[#1A1A1A] p-2 rounded-lg inline-flex">
                                                                        {mod.imageUrl && <span className="text-brand-gold pr-2 border-r border-white/10">Resim</span>}
                                                                        {mod.pdfUrl && <span className="text-brand-gold pr-2 border-r border-white/10">PDF</span>}
                                                                        {mod.slideUrl && <span className="text-brand-gold pr-2 border-r border-white/10">Slayt</span>}
                                                                        {mod.audioUrl && <span className="text-brand-gold pr-2 border-r border-white/10">Ses</span>}
                                                                        {(mod.questions && mod.questions.length > 0) && <span className="text-brand-gold">{mod.questions.length} Soru</span>}
                                                                        {!(mod.imageUrl || mod.pdfUrl || mod.slideUrl || mod.audioUrl || (mod.questions && mod.questions.length > 0)) && <span>İçerik yok</span>}
                                                                    </div>
                                                                </div>
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => handleDeleteModule(idx)} 
                                                                    className="text-red-500 hover:bg-red-500/10 p-2 rounded shrink-0 self-end sm:self-auto transition-colors"
                                                                    title="Konuyu Sil"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>

                                                {/* Modül Ekleme Formu */}
                                                <div className="bg-[#222] p-5 rounded-xl border border-brand-gold/20 space-y-4">
                                                    <h4 className="font-semibold text-white flex items-center gap-2">
                                                        <Plus size={16} className="text-brand-gold"/> Yeni Konu Ekle
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <input 
                                                                type="text" 
                                                                placeholder="Konu Başlığı *" 
                                                                value={moduleForm.title}
                                                                onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                                                                className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-gold outline-none transition-colors"
                                                            />
                                                        </div>
                                                        <div>
                                                            <input 
                                                                type="url" 
                                                                placeholder="Ders Resmi URL (İsteğe Bağlı)" 
                                                                value={moduleForm.imageUrl || ''}
                                                                onChange={(e) => setModuleForm({ ...moduleForm, imageUrl: e.target.value })}
                                                                className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-gold outline-none transition-colors"
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <input 
                                                            type="url" 
                                                            placeholder="PDF Linki (İsteğe Bağlı)" 
                                                            value={moduleForm.pdfUrl || ''}
                                                            onChange={(e) => setModuleForm({ ...moduleForm, pdfUrl: e.target.value })}
                                                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-gold outline-none transition-colors"
                                                        />
                                                        <input 
                                                            type="url" 
                                                            placeholder="Slayt Linki (İsteğe Bağlı)" 
                                                            value={moduleForm.slideUrl || ''}
                                                            onChange={(e) => setModuleForm({ ...moduleForm, slideUrl: e.target.value })}
                                                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-gold outline-none transition-colors"
                                                        />
                                                        <input 
                                                            type="url" 
                                                            placeholder="Ses Bağlantısı (İsteğe Bağlı)" 
                                                            value={moduleForm.audioUrl || ''}
                                                            onChange={(e) => setModuleForm({ ...moduleForm, audioUrl: e.target.value })}
                                                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-gold outline-none transition-colors"
                                                        />
                                                    </div>

                                                    <textarea 
                                                        placeholder="Konu Açıklaması (İsteğe Bağlı)" 
                                                        value={moduleForm.description}
                                                        onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
                                                        rows="2"
                                                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-gold outline-none resize-none transition-colors"
                                                    />

                                                    {/* Test Soruları Ekleme */}
                                                    <div className="border-t border-white/5 pt-4">
                                                        <h5 className="text-sm font-bold text-brand-gold flex items-center gap-2 mb-3">
                                                            <HelpCircle size={14} /> Test Soruları (İsteğe Bağlı)
                                                        </h5>
                                                        
                                                        {/* Eklenen Sorular */}
                                                        {(moduleForm.questions || []).length > 0 && (
                                                            <div className="space-y-2 mb-4">
                                                                {moduleForm.questions.map((q, qi) => (
                                                                    <div key={qi} className="bg-[#1A1A1A] p-3 rounded-lg border border-white/5 flex justify-between items-start">
                                                                        <div>
                                                                            <p className="text-sm text-white font-medium">S{qi + 1}: {q.text}</p>
                                                                            <div className="flex flex-wrap gap-2 mt-1">
                                                                                {q.options.map((opt, oi) => (
                                                                                    <span key={oi} className={`text-xs px-2 py-0.5 rounded ${oi === q.correctAnswer ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500'}`}>
                                                                                        {String.fromCharCode(65 + oi)}) {opt}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" onClick={() => {
                                                                            setModuleForm(prev => ({
                                                                                ...prev,
                                                                                questions: prev.questions.filter((_, i) => i !== qi)
                                                                            }));
                                                                        }} className="text-red-500 hover:bg-red-500/10 p-1 rounded shrink-0">
                                                                            <XIcon size={14} />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {/* Yeni Soru Formu */}
                                                        <div className="bg-[#1A1A1A] p-4 rounded-lg border border-white/5 space-y-3">
                                                            <input
                                                                type="text"
                                                                placeholder="Soru metni *"
                                                                value={questionForm.text}
                                                                onChange={(e) => setQuestionForm({ ...questionForm, text: e.target.value })}
                                                                className="w-full bg-[#222] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-gold outline-none transition-colors"
                                                            />
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                                {questionForm.options.map((opt, idx) => (
                                                                    <div key={idx} className="flex items-center gap-2">
                                                                        <input
                                                                            type="radio"
                                                                            name="newModuleCorrectAnswer"
                                                                            checked={questionForm.correctAnswer === idx}
                                                                            onChange={() => setQuestionForm({ ...questionForm, correctAnswer: idx })}
                                                                            className="accent-brand-gold shrink-0"
                                                                            title="Doğru cevap olarak seç"
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            placeholder={`${String.fromCharCode(65 + idx)} Şıkkı *`}
                                                                            value={opt}
                                                                            onChange={(e) => {
                                                                                const newOpts = [...questionForm.options];
                                                                                newOpts[idx] = e.target.value;
                                                                                setQuestionForm({ ...questionForm, options: newOpts });
                                                                            }}
                                                                            className="flex-1 bg-[#222] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-gold outline-none transition-colors"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <p className="text-xs text-gray-500">Doğru cevabı seçmek için şıkkın yanındaki radyo butonuna tıklayın.</p>
                                                            <button
                                                                type="button"
                                                                onClick={handleAddQuestionToModuleForm}
                                                                className="text-sm bg-brand-gold/10 border border-brand-gold/30 text-brand-gold px-4 py-2 rounded-lg hover:bg-brand-gold/20 transition-colors font-medium"
                                                            >
                                                                + Soruyu Ekle
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-end">
                                                        <Button 
                                                            type="button"
                                                            onClick={handleAddModule} 
                                                            className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black px-6 font-semibold"
                                                        >
                                                            Üstteki Listeye Ekle
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-end items-center gap-4">
                                                <p className="text-sm text-gray-500">Değişiklikleri yayına almak için kaydetmelisiniz.</p>
                                                <Button 
                                                    onClick={handleUpdateCourse} 
                                                    variant="primary" 
                                                    disabled={isSubmitting}
                                                    className="w-full sm:w-auto font-bold py-3 px-8 text-base shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-shadow"
                                                >
                                                    {isSubmitting ? "Kaydediliyor..." : "Tüm Değişiklikleri Kaydet"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Tools Tab */}
                                {activeTab === "tools" && (
                                    <div className="space-y-6">
                                        <h1 className="text-3xl font-bold text-white mb-6">Araçlar & Veritabanı</h1>
                                        
                                        <div className="bg-[#1A1A1A] p-8 rounded-3xl border border-red-500/20">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center shrink-0">
                                                    <Database size={24} />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-bold text-white mb-2">Mock Verileri Aktar</h2>
                                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                                        Bu araç ile <code>src/data/coursesData.js</code> dosyasındaki test eğitimlerini Firebase <code>courses</code> koleksiyonuna hızlıca aktarabilirsiniz. <span className="text-red-400 font-medium">Dikkat: Çakışan ID'ye sahip verilerin üzerine yazılır.</span>
                                                    </p>
                                                    <Button 
                                                        variant="primary" 
                                                        onClick={migrateDataToFirebase}
                                                        disabled={isMigrating}
                                                        className="font-bold border border-red-500/50 hover:bg-red-500/20 bg-red-500/10 text-red-400"
                                                    >
                                                        {isMigrating ? "Veriler Aktarılıyor..." : "Mock Verileri Firebase'e Kopyala"}
                                                    </Button>
                                                </div>
                                            </div>
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

export default AdminDashboard;
