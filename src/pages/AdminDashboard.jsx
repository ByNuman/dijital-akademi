import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, Users, BookOpen, BarChart3, Settings,
    Plus, Edit, Trash2, Search, Filter, MoreVertical, CheckCircle2
} from "lucide-react";
import { Button } from "../components/ui/Button";

export function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    const stats = [
        { title: "Toplam Öğrenci", value: "2,450", change: "+120 bu ay", icon: Users },
        { title: "Aktif Eğitimler", value: "24", change: "+2 eklendi", icon: BookOpen },
        { title: "Tamamlanan Modül", value: "18,200", change: "+1.2k bu hafta", icon: CheckCircle2 },
        { title: "Sistem Sağlığı", value: "%99.9", change: "Sorunsuz", icon: BarChart3 },
    ];

    const mockCourses = [
        { id: 1, title: "İslami İlimlere Giriş", instructor: "Prof. Dr. İbrahim Halil", students: 1200, status: "Aktif" },
        { id: 2, title: "Tefsir Usulü ve Tarihi", instructor: "Doç. Dr. Ahmet Yılmaz", students: 850, status: "Aktif" },
        { id: 3, title: "Arapça Belagat", instructor: "Dr. Zeynep Kaya", students: 430, status: "Taslak" },
    ];

    const renderContent = () => {
        if (activeTab === "overview") {
            return (
                <div className="space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={idx}
                                    className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-brand-gold" />
                                        </div>
                                    </div>
                                    <h4 className="text-gray-400 text-sm mb-1 font-medium">{stat.title}</h4>
                                    <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                                    <div className="text-xs text-emerald-400 font-semibold">{stat.change}</div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Chart Mockup Area */}
                    <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 h-80 flex flex-col justify-center items-center text-center">
                        <BarChart3 className="w-16 h-16 text-white/10 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Aylık Aktif Kullanıcı Grafiği</h3>
                        <p className="text-gray-500">Bu alana chart.js veya recharts kütüphanesi entegre edilebilir.</p>
                    </div>
                </div>
            );
        }

        if (activeTab === "courses") {
            return (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#1A1A1A] p-4 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-center flex-1 sm:w-64">
                                <Search className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
                                <input type="text" placeholder="Ders ara..." className="bg-transparent border-none focus:outline-none text-white text-sm w-full" />
                            </div>
                            <Button variant="outline" className="min-h-0 h-[42px] px-3 border-white/10">
                                <Filter className="w-4 h-4" />
                            </Button>
                        </div>
                        <Button variant="primary" className="w-full sm:w-auto flex items-center gap-2 h-[42px] min-h-0 text-sm">
                            <Plus className="w-4 h-4" /> Yeni Ders Ekle
                        </Button>
                    </div>

                    <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/[0.02] border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-4 font-bold text-gray-400">Ders Adı</th>
                                        <th className="px-6 py-4 font-bold text-gray-400">Eğitmen</th>
                                        <th className="px-6 py-4 font-bold text-gray-400">Kayıtlı Öğrenci</th>
                                        <th className="px-6 py-4 font-bold text-gray-400">Durum</th>
                                        <th className="px-6 py-4 font-bold text-gray-400 text-right">İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockCourses.map((course) => (
                                        <tr key={course.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                                            <td className="px-6 py-4 font-bold text-white">{course.title}</td>
                                            <td className="px-6 py-4 text-gray-300">{course.instructor}</td>
                                            <td className="px-6 py-4 text-gray-300">{course.students.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${course.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'}`}>
                                                    {course.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2 text-gray-400 hover:text-brand-gold transition-colors"><Edit className="w-4 h-4" /></button>
                                                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="bg-[#1A1A1A] border border-white/5 border-dashed rounded-3xl p-12 text-center">
                <Settings className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Bu Modül Yapım Aşamasında</h3>
                <p className="text-gray-400 max-w-sm mx-auto">Seçtiğiniz yönetim modülü şu an geliştirilmektedir. Yakında aktif edilecektir.</p>
            </div>
        )
    };

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 mt-4">
                    <div>
                        <h1 className="text-3xl font-black text-white mb-1"><span className="text-brand-gold">Yönetim</span> Paneli</h1>
                        <p className="text-gray-400 text-sm">Akademi içeriklerini ve öğrencileri buradan yönetin.</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Admin Sidebar */}
                    <div className="w-full lg:w-64 shrink-0">
                        <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-4 sticky top-28 space-y-1">
                            {[
                                { id: "overview", label: "Genel Bakış", icon: LayoutDashboard },
                                { id: "courses", label: "Ders Yönetimi", icon: BookOpen },
                                { id: "users", label: "Öğrenciler", icon: Users },
                                { id: "settings", label: "Sistem Ayarları", icon: Settings },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id
                                            ? "bg-brand-gold text-brand-black shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
