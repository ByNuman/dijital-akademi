import { motion } from "framer-motion";
import { Trophy, Medal, Star, ChevronUp, ChevronDown, Minus } from "lucide-react";
import { useLibrary } from "../context/LibraryContext";
import { studentData } from "../data/studentData";

export function Leaderboard() {
    const { xp } = useLibrary();
    const currentLevel = Math.floor(xp / 500) + 1;

    // Mock students for the leaderboard
    const getMockStudents = () => {
        const students = [
            { id: 1, name: "Ayşe K.", xp: 3250, badge: "Altın", avatar: "https://ui-avatars.com/api/?name=Ayşe+K&background=F59E0B&color=000" },
            { id: 2, name: "Mehmet Ç.", xp: 2800, badge: "Gümüş", avatar: "https://ui-avatars.com/api/?name=Mehmet+C&background=94A3B8&color=000" },
            { id: 3, name: "Zeynep B.", xp: 2150, badge: "Bronz", avatar: "https://ui-avatars.com/api/?name=Zeynep+B&background=B45309&color=fff" },
            { id: 5, name: "Ali R.", xp: 850, badge: "Öğrenci", avatar: "https://ui-avatars.com/api/?name=Ali+R&background=333&color=fff" },
            { id: 6, name: "Fatma S.", xp: 620, badge: "Öğrenci", avatar: "https://ui-avatars.com/api/?name=Fatma+S&background=333&color=fff" },
        ];

        // Push the current user
        students.push({
            id: 4,
            name: studentData.name + " (Sen)",
            xp: xp,
            badge: currentLevel >= 5 ? "Altın" : currentLevel >= 3 ? "Gümüş" : "Öğrenci",
            avatar: studentData.avatar,
            isCurrentUser: true
        });

        // Sort by XP descending
        return students.sort((a, b) => b.xp - a.xp);
    };

    const leaderboardData = getMockStudents();

    // Find current user rank
    const currentUserRank = leaderboardData.findIndex(s => s.isCurrentUser) + 1;

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">

                {/* Header Graphic */}
                <div className="text-center mb-12 relative pb-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-gold/20 blur-[60px] rounded-full pointer-events-none"></div>
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-tr from-brand-gold to-yellow-200 rounded-full mb-6 shadow-[#FBBF24]/20 shadow-2xl relative z-10"
                    >
                        <Trophy className="w-12 h-12 text-brand-black" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 relative z-10">Akademi Liderlik Tablosu</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto relative z-10">Eğitimleri tamamla, testleri çöz, XP kazan ve akademinin en başarılı öğrencileri arasında adını yazdır.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* User's Stats Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-b from-[#1A1A1A] to-[#101010] border border-brand-gold/30 rounded-3xl p-8 sticky top-28 shadow-[0_0_30px_rgba(251,191,36,0.05)]">
                            <div className="text-center">
                                <div className="w-24 h-24 rounded-full border-4 border-brand-gold mx-auto p-1 mb-4 relative">
                                    <img src={studentData.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-black text-xs font-black px-3 py-1 rounded-full border-2 border-[#1A1A1A]">
                                        Lvl {currentLevel}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{studentData.name}</h3>
                                <p className="text-gray-400 text-sm mb-6">Mevcut İlerlemen</p>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center border border-white/5">
                                    <div className="text-gray-400 text-sm">Toplam XP</div>
                                    <div className="text-brand-gold font-black text-xl">{xp}</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center border border-white/5">
                                    <div className="text-gray-400 text-sm">Akademi Sırası</div>
                                    <div className="text-white font-black text-xl">#{currentUserRank}</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center border border-white/5">
                                    <div className="text-gray-400 text-sm">Sonraki Seviye</div>
                                    <div className="text-gray-300 font-bold">{currentLevel * 500 - xp} XP</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Leaderboard Table */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <h2 className="text-xl font-bold text-white">Bu Haftanın En İyileri</h2>
                                <span className="text-xs font-semibold px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full">Canlı Sıralama</span>
                            </div>

                            <div className="p-2">
                                {leaderboardData.map((student, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        key={student.id}
                                        className={`flex items-center justify-between p-4 my-2 rounded-2xl transition-all ${student.isCurrentUser
                                                ? "bg-brand-gold/10 border border-brand-gold/30 shadow-[inset_0_0_20px_rgba(251,191,36,0.05)]"
                                                : "hover:bg-white/5 border border-transparent"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Rank Number */}
                                            <div className={`w-8 h-8 flex items-center justify-center font-black rounded-full ${index === 0 ? "bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.5)]" :
                                                    index === 1 ? "bg-gray-300 text-black shadow-[0_0_10px_rgba(209,213,219,0.5)]" :
                                                        index === 2 ? "bg-amber-700 text-white shadow-[0_0_10px_rgba(180,83,9,0.5)]" :
                                                            "text-gray-500"
                                                }`}>
                                                {index + 1}
                                            </div>

                                            {/* Avatar & Name */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10">
                                                    <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h4 className={`font-bold ${student.isCurrentUser ? "text-brand-gold" : "text-white"}`}>
                                                        {student.name}
                                                    </h4>
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        {index === 0 && <Medal className="w-3 h-3 text-yellow-500" />}
                                                        {student.badge}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* XP Score */}
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="font-black text-white">{student.xp.toLocaleString()}</div>
                                                <div className="text-[10px] text-brand-gold font-bold uppercase tracking-wider">XP</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Leaderboard;
