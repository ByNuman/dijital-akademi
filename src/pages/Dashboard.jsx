
import { Helmet } from 'react-helmet-async';
import { BookOpen, Clock, Calendar, PlayCircle, Trophy, Settings, SearchX, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { BackButton } from "../components/ui/BackButton";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { studentData } from "../data/studentData";
import { useLibrary } from "../context/LibraryContext";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventsContext";
import calendarData from "../data/calendar.json";

export function Dashboard() {
    const { savedCourses, xp, removeFromLibrary } = useLibrary();
    const { userData } = useAuth();
    const { events } = useEvents();

    const currentLevel = Math.floor(xp / 500) + 1;
    const xpForNextLevel = currentLevel * 500;
    const xpProgress = ((xp % 500) / 500) * 100;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-brand-black">
            <Helmet>
                <title>Öğrenci Paneli - Dijital Akademi</title>
                <meta name="description" content="İslami ilimler derslerinize Kaldığınız yerden devam edin." />
            </Helmet>
            <div className="container mx-auto px-6 md:px-12">
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <BackButton />
                        <Breadcrumbs />
                    </div>
                </div>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-12 bg-brand-slate p-8 rounded-3xl border border-brand-gold/10"
                >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-24 h-24 rounded-full border-4 border-brand-gold/50 p-1 overflow-hidden shadow-[0_4px_20px_rgba(212,175,55,0.2)] flex items-center justify-center bg-gradient-to-br from-brand-slate to-brand-black shrink-0">
                            {userData?.avatar ? (
                                <img src={userData.avatar} alt={userData?.name || "Öğrenci"} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <span className="text-4xl font-bold text-brand-gold uppercase drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]">
                                    {userData?.name ? userData.name.split(' ').filter(Boolean).map((n, i, arr) => (i === 0 || i === arr.length - 1 ? n[0] : '')).join('') : 'U'}
                                </span>
                            )}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-serif font-bold text-white mb-2">Hoş Geldiniz, <span className="text-brand-gold">{userData?.name || "Öğrenci"}</span></h1>
                            <p className="text-gray-400">İlim yolculuğunuzda bugün nerede kalmıştık?</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Main Content - Enrolled Courses */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-brand-gold" />
                                Kütüphanemdeki Eğitimler
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {savedCourses.length > 0 ? (
                                    savedCourses.map((course, index) => (
                                        <div
                                            key={course.id}
                                            className="bg-brand-slate rounded-2xl border border-white/5 p-6 flex flex-col sm:flex-row gap-6 group hover:border-brand-gold/30 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
                                        >
                                            {/* Course Image */}
                                            <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 relative">
                                                <div className="absolute inset-0 bg-brand-black/20 mix-blend-multiply z-10"></div>
                                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            </div>

                                            {/* Course Details */}
                                            <div className="flex-1 flex flex-col">
                                                <div className="text-xs text-brand-gold font-bold mb-1">{course.category}</div>
                                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-gold transition-colors line-clamp-1">{course.title}</h3>
                                                <p className="text-gray-400 text-sm mb-4">{course.category}</p>

                                                {/* Progress Bar */}
                                                <div className="mt-auto">
                                                    <div className="flex justify-between items-end mb-2">
                                                        <span className="text-xs font-semibold text-gray-400">İlerleme</span>
                                                        <span className="text-sm font-bold text-brand-gold">%{course.progress || 0}</span>
                                                    </div>
                                                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden mb-4 border border-white/5">
                                                        <div
                                                            className="bg-gradient-to-r from-brand-gold to-brand-gold-dark h-full rounded-full transition-all duration-700"
                                                            style={{ width: `${course.progress || 0}%` }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-brand-slate font-medium bg-brand-gold px-2 py-1 rounded-md">
                                                            Aktif
                                                        </span>
                                                        <div className="flex items-center gap-2">
                                                            <Link to={`/learn/${course.id}`}>
                                                                <Button variant="primary" className="text-sm py-1.5 px-4 min-h-0 rounded-lg flex items-center gap-2 font-semibold">
                                                                    <PlayCircle className="w-4 h-4" />
                                                                    Eğitime Dön
                                                                </Button>
                                                            </Link>
                                                            <Button 
                                                                variant="outline" 
                                                                onClick={() => {
                                                                    if(window.confirm('Bu dersi kütüphanenizden kaldırmak istediğinize emin misiniz?')) {
                                                                        removeFromLibrary(course.id);
                                                                    }
                                                                }}
                                                                className="text-sm py-1.5 px-3 min-h-0 rounded-lg flex items-center justify-center font-semibold border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500/50"
                                                                title="Dersi Kütüphaneden Kaldır"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-brand-slate border border-brand-gold/10 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center">
                                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                            <SearchX className="w-8 h-8 text-gray-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Kütüphaneniz Henüz Boş</h3>
                                        <p className="text-gray-400 max-w-md mx-auto mb-8">Henüz hiçbir içeriği kütüphanenize kaydetmediniz. Akademik kütüphanenizi oluşturmak için ders kataloğuna göz atın.</p>
                                        <Link to="/courses">
                                            <Button variant="primary" className="font-bold">Eğitimleri Keşfet</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Upcoming & Stats */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Gamification Level Box */}
                        <div
                            className="bg-brand-black rounded-2xl border border-brand-gold/10 p-6 relative overflow-hidden group hover:border-brand-gold/30 transition-all duration-500 shadow-2xl hover:shadow-[0_4px_30px_rgba(212,175,55,0.15)]"
                        >
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div>
                                    <div className="text-gray-600 text-[10px] uppercase tracking-[0.2em] mb-1.5 font-bold font-secondary">Mevcut Seviye</div>
                                    <div className="text-xl font-black text-white/90 uppercase tracking-tight">Seviye {currentLevel}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray-600 text-[10px] uppercase tracking-[0.2em] mb-1.5 font-bold font-secondary">Toplam Puan</div>
                                    <div className="text-xl font-black text-brand-gold tabular-nums">{xp.toLocaleString()} <span className="text-[10px] text-brand-gold/40 ml-0.5">XP</span></div>
                                </div>
                            </div>

                            <div className="mb-8 relative z-10">
                                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                                    <span className="text-brand-gold/60">{xp % 500} / 500 XP</span>
                                    <span>Sonraki Seviye</span>
                                </div>
                                <div className="w-full bg-white/[0.03] rounded-full h-1.5 overflow-hidden border border-white/5">
                                    <div
                                        className="bg-brand-gold h-full rounded-full transition-all duration-700 shadow-[0_4px_10px_rgba(212,175,55,0.3)]"
                                        style={{ width: `${xpProgress}%` }}
                                    />
                                </div>
                            </div>

                            <Link to="/leaderboard" className="relative z-10 w-full block">
                                <Button variant="outline" className="w-full border-white/10 text-gray-400 hover:border-brand-gold/30 hover:text-brand-gold hover:bg-brand-gold/[0.03] transition-all duration-300 py-2.5 min-h-0 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    Sıralamayı Görüntüle
                                </Button>
                            </Link>
                        </div>

                        {/* Stats Box */}
                        <div className="bg-brand-slate rounded-2xl border border-brand-gold/10 p-6 md:mt-0 mt-8">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                İstatistiklerim
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-black text-brand-gold mb-1">{savedCourses.length}</div>
                                    <div className="text-xs text-gray-400 font-medium">Kayıtlı Ders</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-black text-white mb-1">{savedCourses.filter(c => (c.progress || 0) >= 100).length}</div>
                                    <div className="text-xs text-gray-400 font-medium">Biten Modül</div>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Events Box */}
                        <div className="bg-brand-slate rounded-2xl border border-brand-gold/10 p-6 md:mt-0 mt-8">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-brand-gold" />
                                Akademik Takvim
                            </h3>
                            <div className="space-y-4">
                                {[...events, ...calendarData.map(item => ({
                                    id: `cal-${item.id}`,
                                    title: item.title,
                                    date: item.parsedDate || item.date,
                                    type: item.type
                                }))]
                                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                                    .filter(e => new Date(e.date) >= new Date(new Date().setHours(0,0,0,0)))
                                    .slice(0, 3)
                                    .map((event) => {
                                    const eventDate = new Date(event.date);
                                    return (
                                        <div key={event.id} className="flex gap-4 items-start p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                                            <div className="bg-brand-gold/10 text-brand-gold rounded-lg p-2 text-center min-w-[3.5rem] border border-brand-gold/20 flex flex-col items-center justify-center">
                                                <div className="text-lg font-black leading-none">{eventDate.getDate()}</div>
                                                <div className="text-xs uppercase font-bold mt-1">
                                                    {eventDate.toLocaleString('tr-TR', { month: 'short' })}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-white text-sm font-bold mb-1 leading-tight line-clamp-2">{event.title}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {event.type === 'live' ? 'Canlı Ders' :
                                                     event.type === 'assignment' ? 'Ödev' :
                                                     event.type === 'exam' ? 'Sınav' : 'Akademik Takvim'}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {[...events, ...calendarData].filter(e => new Date(e.parsedDate || e.date) >= new Date(new Date().setHours(0,0,0,0))).length === 0 && (
                                    <p className="text-gray-500 text-sm text-center py-4">Yaklaşan etkinlik bulunmuyor.</p>
                                )}
                            </div>
                            <Button variant="outline" className="w-full mt-6 py-2.5 text-sm h-auto min-h-0 border-white/10 hover:bg-white/5 hover:text-white text-gray-400">
                                Tümünü Gör
                            </Button>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}

export default Dashboard;
