import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
    const [savedCourses, setSavedCourses] = useState(() => {
        const saved = localStorage.getItem("dijital_akademi_library");
        return saved ? JSON.parse(saved) : [];
    });

    const [xp, setXp] = useState(() => {
        const savedXp = localStorage.getItem("dijital_akademi_xp");
        return savedXp ? parseInt(savedXp, 10) : 150; // Default 150 XP for demo
    });

    useEffect(() => {
        localStorage.setItem("dijital_akademi_library", JSON.stringify(savedCourses));
    }, [savedCourses]);

    useEffect(() => {
        localStorage.setItem("dijital_akademi_xp", xp.toString());
    }, [xp]);

    const addXp = (amount) => {
        setXp(prev => {
            const newXp = prev + amount;
            const oldLevel = Math.floor(prev / 500) + 1;
            const newLevel = Math.floor(newXp / 500) + 1;

            if (newLevel > oldLevel) {
                toast.success(`Tebrikler! Seviye ${newLevel}'e ulaştınız.`, {
                    style: { background: "#FBBF24", color: "#101010", border: "none" }
                });
            } else {
                toast(`+${amount} XP Kazandınız!`, {
                    icon: '⭐',
                    style: { background: "#1A1A1A", color: "#FBBF24", borderColor: "rgba(251,191,36,0.3)" }
                });
            }
            return newXp;
        });
    };

    const addToLibrary = (course) => {
        if (!savedCourses.find(c => c.id === course.id)) {
            setSavedCourses(prev => [...prev, { ...course, progress: 0 }]);

            // Özel tasarım toast bildirimi
            toast.custom((t) => (
                <div className="bg-[#1A1A1A] border border-brand-gold/30 rounded-xl p-4 shadow-[0_0_20px_rgba(251,191,36,0.15)] flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm mb-1">Kütüphaneye Eklendi</h4>
                        <p className="text-gray-400 text-xs">{course.title} dersi başarıyla kaydedildi.</p>
                    </div>
                </div>
            ), { duration: 4000 });
            return true;
        } else {
            toast.custom((t) => (
                <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 shadow-xl flex items-center gap-3">
                    <span className="text-gray-300 text-sm">Bu ders zaten kütüphanenizde mevcut.</span>
                </div>
            ));
            return false;
        }
    };

    const removeFromLibrary = (courseId) => {
        setSavedCourses(prev => prev.filter(c => c.id !== courseId));
    };

    const isCourseInLibrary = (courseId) => {
        return savedCourses.some(c => c.id === courseId);
    };

    return (
        <LibraryContext.Provider value={{ savedCourses, addToLibrary, removeFromLibrary, isCourseInLibrary, xp, addXp }}>
            {children}
        </LibraryContext.Provider>
    );
}

export function useLibrary() {
    return useContext(LibraryContext);
}
