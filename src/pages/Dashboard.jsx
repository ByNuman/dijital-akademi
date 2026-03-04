import { motion } from "framer-motion";
import { BookOpen, Clock, Calendar, PlayCircle, Trophy, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { studentData } from "../data/studentData";

export function Dashboard() {
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
                    <Button variant="outline" className="flex items-center gap-2 h-10 min-h-0 bg-[#101010]/50">
                        <Settings className="w-4 h-4" />
                        Profili Düzenle
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Enrolled Courses */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-brand-gold" />
                                Devam Eden Derslerim
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {studentData.enrolledCourses.map((course, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        key={course.id}
                                        className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6 flex flex-col sm:flex-row gap-6 group hover:border-brand-gold/30 transition-all duration-300"
                                    >
                                        {/* Course Image */}
                                        <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 relative">
                                            <div className="absolute inset-0 bg-brand-black/20 mix-blend-multiply z-10"></div>
                                            <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>

                                        {/* Course Details */}
                                        <div className="flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-gold transition-colors line-clamp-1">{course.title}</h3>
                                            <p className="text-gray-400 text-sm mb-4">{course.instructor}</p>

                                            {/* Progress Bar */}
                                            <div className="mt-auto">
                                                <div className="flex justify-between items-end mb-2">
                                                    <span className="text-xs font-semibold text-gray-400">İlerleme</span>
                                                    <span className="text-sm font-bold text-brand-gold">%{course.progress}</span>
                                                </div>
                                                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden mb-4 border border-white/5">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${course.progress}%` }}
                                                        transition={{ duration: 1, ease: "easeOut" }}
                                                        className="bg-gradient-to-r from-brand-gold to-brand-gold-dark h-full rounded-full"
                                                    />
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> Son erişim: {course.lastAccessed}
                                                    </span>
                                                    <Link to={`/learn/${course.id}`}>
                                                        <Button variant="primary" className="text-sm py-1.5 px-4 min-h-0 rounded-lg flex items-center gap-2 font-semibold">
                                                            <PlayCircle className="w-4 h-4" />
                                                            Derse Git
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Upcoming & Stats */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Stats Box */}
                        <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6 border-b-2 border-b-brand-gold">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-brand-gold" />
                                İstatistiklerim
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-black text-brand-gold mb-1">{studentData.enrolledCourses.length}</div>
                                    <div className="text-xs text-gray-400 font-medium">Toplam Ders</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-black text-white mb-1">12</div>
                                    <div className="text-xs text-gray-400 font-medium">Tamamlanan</div>
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
