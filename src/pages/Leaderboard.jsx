import { useState, useEffect } from "react";
import { Trophy, Medal, Crown, Star, ArrowUp, User as UserIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useLibrary } from "../context/LibraryContext";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export function Leaderboard() {
    const { currentUser, userData } = useAuth();
    const { xp } = useLibrary();
    const [topStudents, setTopStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const usersRef = collection(db, "users");
        // XP'ye göre sırala, adminleri de dahil edebiliriz ama genellikle öğrenciler yarışır
        const q = query(usersRef, orderBy("xp", "desc"), limit(20));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const users = snapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                .filter(user => user.role !== "admin"); // Adminleri gizle
            
            setTopStudents(users);
            setLoading(false);
        }, (error) => {
            console.error("Leaderboard fetch error:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Kullanıcının sırasını bul (mevcut listede varsa)
    const userRankInList = topStudents.findIndex(s => s.id === currentUser?.uid) + 1;
    const currentLevel = Math.floor((userData?.xp || xp || 0) / 500) + 1;

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-black flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-black text-white pt-32 pb-20 px-6">
            <Helmet>
                <title>Sıralama - Dijital Akademi</title>
                <meta name="description" content="En başarılı öğrenciler arasında yerini al. XP kazan ve zirveye tırman!" />
            </Helmet>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-gold/5 border border-brand-gold/10 mb-6 group transition-all duration-500 hover:border-brand-gold/30">
                        <Trophy className="w-8 h-8 text-brand-gold transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight">Akademi Sıralaması</h1>
                    <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
                        En başarılı öğrenciler arasında yerini al. Her gün yeni XP'ler kazan ve zirveye tırman!
                    </p>
                </div>

                {/* Current User Stats */}
                {currentUser && userData?.role !== 'admin' && (
                    <div className="bg-brand-slate border border-brand-gold/10 rounded-2xl p-6 mb-12 flex flex-wrap items-center justify-between gap-6 hover:border-brand-gold/30 transition-all duration-500 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-xl overflow-hidden border border-brand-gold/50 bg-brand-slate shadow-[0_4px_10px_rgba(212,175,55,0.2)]">
                                    {userData?.avatar ? (
                                        <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <UserIcon className="w-6 h-6 text-brand-gold/70" />
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -top-2 -right-2 bg-brand-gold text-[#000] text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-lg scale-90">
                                    SİZ
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white/90">{userData?.name || "Kullanıcı"}</h3>
                                <p className="text-brand-gold/60 text-xs font-semibold uppercase tracking-widest">SEVİYE {currentLevel}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <div className="text-gray-600 text-[10px] uppercase tracking-widest mb-0.5">TOPLAM PUAN</div>
                                <div className="text-xl font-bold text-brand-gold">{(userData?.xp || xp || 0).toLocaleString()} <span className="text-[10px] text-brand-gold/50 ml-0.5">XP</span></div>
                            </div>
                            <div className="text-right pl-8 border-l border-white/5">
                                <div className="text-gray-600 text-[10px] uppercase tracking-widest mb-0.5">SIRALAMA</div>
                                <div className="text-xl font-bold text-white/90">
                                    {userRankInList > 0 ? `#${userRankInList}` : "-"}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* List */}
                <div className="bg-brand-slate border border-brand-gold/10 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-brand-gold/10 bg-white/[0.01]">
                                    <th className="pl-8 pr-4 py-5 text-left text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">NO</th>
                                    <th className="px-4 py-5 text-left text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">ÖĞRENCİ</th>
                                    <th className="px-4 py-5 text-center text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">SEVİYE</th>
                                    <th className="pr-8 pl-4 py-5 text-right text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">PUAN</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-gold/5">
                                {topStudents.map((student, index) => {
                                    const rank = index + 1;
                                    const isCurrentUser = student.id === currentUser?.uid;
                                    const level = Math.floor((student.xp || 0) / 500) + 1;

                                    return (
                                        <tr 
                                            key={student.id}
                                            className={`group transition-all duration-300 hover:bg-brand-gold/5 ${isCurrentUser ? "bg-brand-gold/[0.03]" : ""}`}
                                        >
                                            <td className="pl-8 pr-4 py-5">
                                                <div className="flex items-center font-bold text-sm">
                                                    {rank === 1 ? (
                                                        <Crown className="w-5 h-5 text-brand-gold" />
                                                    ) : rank === 2 ? (
                                                        <Medal className="w-5 h-5 text-gray-400" />
                                                    ) : rank === 3 ? (
                                                        <Medal className="w-5 h-5 text-amber-700" />
                                                    ) : (
                                                        <span className="text-gray-600">{rank}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-lg overflow-hidden bg-brand-black border border-brand-gold/10 group-hover:border-brand-gold/30 transition-all duration-300">
                                                        {student.avatar ? (
                                                            <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <UserIcon className="w-4 h-4 text-gray-600" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="font-bold text-sm text-white/80 group-hover:text-white transition-colors">
                                                        {student.name || "Anonim Öğrenci"}
                                                        {isCurrentUser && (
                                                            <span className="ml-2 text-[8px] bg-brand-gold/10 text-brand-gold px-1.5 py-0.5 rounded border border-brand-gold/20 uppercase tracking-tighter">SİZ</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-black border border-brand-gold/10 text-[11px] font-bold text-gray-400 group-hover:border-brand-gold/20 transition-all">
                                                    <Star className="w-2.5 h-2.5 text-brand-gold" />
                                                    {level}
                                                </div>
                                            </td>
                                            <td className="pr-8 pl-4 py-5 text-right">
                                                <span className="font-bold text-sm text-brand-gold/90 group-hover:text-brand-gold transition-colors tabular-nums">
                                                    {(student.xp || 0).toLocaleString()} <span className="text-[10px] opacity-40 ml-0.5">XP</span>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Info Note */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 text-[11px] tracking-wide uppercase">
                        Sıralama her 5 dakikada bir güncellenir
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;
