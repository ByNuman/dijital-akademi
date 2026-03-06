import { motion } from "framer-motion";
import { BookOpen, Clock, Calendar, PlayCircle, Trophy, Settings, SearchX } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { studentData } from "../data/studentData";
import { useLibrary } from "../context/LibraryContext";

export function Dashboard() {
    const { savedCourses, xp } = useLibrary();

    const currentLevel = Math.floor(xp / 500) + 1;
    const xpForNextLevel = currentLevel * 500;
    const xpProgress = ((xp % 500) / 500) * 100;

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-12 bg-[#1A1A1A] p-8 rounded-3xl border border-white/5">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-24 h-24 rounded-full border-2 border-brand-gold p-1 overflow-hidden shrink-0">
                            <img src={studentData.avatar} alt={studentData.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-black text-white mb-2">Hoş Geldiniz, <span className="text-brand-gold">{studentData.name}</span></h1>
                            <p className="text-gray-400">İlim yolculuğunuzda bugün nerede kalmıştık?</p>
                        </div>
                    </div>
                    <Link to="/profile">
                        <Button variant="outline" className="flex items-center gap-2 h-10 min-h-0 bg-[#101010]/50">
                            <Settings className="w-4 h-4" />
                            Profili Düzenle
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            key={course.id}
                                            className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6 flex flex-col sm:flex-row gap-6 group hover:border-brand-gold/30 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
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
                                                <p className="text-gray-400 text-sm mb-4">{course.instructor}</p>

                                                {/* Progress Bar */}
                                                <div className="mt-auto">
                                                    <div className="flex justify-between items-end mb-2">
                                                        <span className="text-xs font-semibold text-gray-400">İlerleme</span>
                                                        <span className="text-sm font-bold text-brand-gold">%{course.progress || 0}</span>
                                                    </div>
                                                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden mb-4 border border-white/5">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${course.progress || 0}%` }}
                                                            transition={{ duration: 1, ease: "easeOut" }}
                                                            className="bg-gradient-to-r from-brand-gold to-brand-gold-dark h-full rounded-full"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-brand-slate font-medium bg-brand-gold px-2 py-1 rounded-md">
                                                            Aktif
                                                        </span>
                                                        <Link to={`/learn/${course.id}`}>
                                                            <Button variant="primary" className="text-sm py-1.5 px-4 min-h-0 rounded-lg flex items-center gap-2 font-semibold">
                                                                <PlayCircle className="w-4 h-4" />
                                                                Eğitime Dön
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="bg-[#1A1A1A] border border-white/5 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center">
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
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-[#1A1A1A] to-[#111] rounded-2xl border border-brand-gold/20 p-6 relative overflow-hidden shadow-[0_0_30px_rgba(251,191,36,0.1)]"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-[50px] rounded-full pointer-events-none"></div>

                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                                <Trophy className="w-5 h-5 text-brand-gold" />
                                Öğrenim Akademisi
                            </h3>

                            <div className="flex items-center justify-between mb-2 relative z-10">
                                <div className="text-gray-400 text-sm font-medium">Mevcut Seviye</div>
                                <div className="bg-brand-gold text-brand-black text-xs font-black px-2 py-0.5 rounded-md">Lvl {currentLevel}</div>
                            </div>

                            <div className="text-4xl font-black text-white mb-4 relative z-10">{xp} <span className="text-base text-brand-gold font-bold">XP</span></div>

                            <div className="mb-6 relative z-10">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Seviye {currentLevel}</span>
                                    <span>{xpForNextLevel} XP</span>
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${xpProgress}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="bg-gradient-to-r from-brand-gold to-yellow-200 h-full rounded-full"
                                    />
                                </div>
                            </div>

                            <Link to="/leaderboard" className="relative z-10 w-full block">
                                <Button variant="outline" className="w-full border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10 shadow-[0_0_15px_rgba(251,191,36,0.15)] flex justify-center py-2 min-h-0 text-sm">
                                    Liderlik Tablosunu Gör
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Stats Box */}
                        <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6 md:mt-0 mt-8">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                İstatistiklerim
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-black text-brand-gold mb-1">{savedCourses.length}</div>
                                    <div className="text-xs text-gray-400 font-medium">Kayıtlı Ders</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-black text-white mb-1">{Math.floor(savedCourses.length / 2)}</div>
                                    <div className="text-xs text-gray-400 font-medium">Biten Modül</div>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Events Box */}
                        <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-brand-gold" />
                                Yaklaşan Etkinlikler
                            </h3>
                            <div className="space-y-4">
                                {studentData.upcomingEvents.map((event) => {
                                    const eventDate = new Date(event.date);
                                    return (
                                        <div key={event.id} className="flex gap-4 items-start p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                                            <div className="bg-brand-gold/10 text-brand-gold rounded-lg p-2 text-center min-w-[3rem] border border-brand-gold/20">
                                                <div className="text-sm font-black">{eventDate.getDate()}</div>
                                                <div className="text-xs uppercase font-bold">
                                                    {eventDate.toLocaleString('tr-TR', { month: 'short' })}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-white text-sm font-bold mb-1 leading-tight line-clamp-2">{event.title}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {eventDate.getHours().toString().padStart(2, '0')}:{eventDate.getMinutes().toString().padStart(2, '0')}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <Button variant="outline" className="w-full mt-6 py-2.5 text-sm h-auto min-h-0 border-white/10 hover:bg-white/5">
                                Tüm Takvimi Gör
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;
