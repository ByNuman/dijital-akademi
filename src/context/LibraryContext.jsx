import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { doc, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";
import { db } from "../config/firebase";

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
    const { currentUser, userData } = useAuth();
    
    // Fallback to localStorage for guest users
    const [savedCourses, setSavedCourses] = useState(() => {
        const saved = localStorage.getItem("dijital_akademi_library");
        return saved ? JSON.parse(saved) : [];
    });

    const [xp, setXp] = useState(() => {
        const savedXp = localStorage.getItem("dijital_akademi_xp");
        return savedXp ? parseInt(savedXp, 10) : 150;
    });

    useEffect(() => {
        if (currentUser && userData) {
            setSavedCourses(userData.enrolledCourses || []);
            setXp(userData.xp || 150);
        } else if (!currentUser) {
            // Unauthenticated user - use localStorage
            const saved = localStorage.getItem("dijital_akademi_library");
            if (saved) setSavedCourses(JSON.parse(saved));
            const savedXp = localStorage.getItem("dijital_akademi_xp");
            if (savedXp) setXp(parseInt(savedXp, 10));
        }
    }, [currentUser, userData]);

    useEffect(() => {
        if (!currentUser) {
            localStorage.setItem("dijital_akademi_library", JSON.stringify(savedCourses));
            localStorage.setItem("dijital_akademi_xp", xp.toString());
        }
    }, [savedCourses, xp, currentUser]);

    // Debounce timer refs
    const progressTimerRef = useRef({});
    const lastProgressRef = useRef({});

    const addXp = useCallback(async (amount) => {
        // Admin kullanıcılar XP kazanmamalı
        if (userData?.role === 'admin') return;
        
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

        // Update in Firestore
        if (currentUser) {
            try {
                const userRef = doc(db, "users", currentUser.uid);
                await updateDoc(userRef, {
                    xp: increment(amount)
                });
            } catch (error) {
                console.error("Error updating XP in Firestore:", error);
            }
        }
    }, [currentUser, userData?.role]);

    const addToLibrary = async (course) => {
        if (!savedCourses.find(c => c.id === course.id)) {
            const newCourseData = { ...course, progress: 0 };
            setSavedCourses(prev => [...prev, newCourseData]);

            // Toast
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

            // Update in Firestore
            if (currentUser) {
                try {
                    const userRef = doc(db, "users", currentUser.uid);
                    await updateDoc(userRef, {
                        enrolledCourses: arrayUnion(newCourseData)
                    });
                } catch (error) {
                    console.error("Error adding course to Firestore library:", error);
                }
            }

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

    const removeFromLibrary = async (courseId) => {
        const courseToRemove = savedCourses.find(c => c.id === courseId);
        setSavedCourses(prev => prev.filter(c => c.id !== courseId));

        if (currentUser && courseToRemove) {
            try {
                const userRef = doc(db, "users", currentUser.uid);
                await updateDoc(userRef, {
                    enrolledCourses: arrayRemove(courseToRemove)
                });
            } catch (error) {
                console.error("Error removing course from Firestore:", error);
            }
        }
    };

    const isCourseInLibrary = (courseId) => {
        return savedCourses.some(c => c.id === courseId);
    };

    const updateCourseProgress = useCallback((courseId, progress) => {
        // Aynı değeri tekrar yazmayı engelleyelim (sonsuz döngü koruması)
        if (lastProgressRef.current[courseId] === progress) return;
        lastProgressRef.current[courseId] = progress;

        setSavedCourses(prev => {
            const updated = prev.map(c => 
                c.id === courseId ? { ...c, progress } : c
            );
            return updated;
        });

        // Debounced Firestore yazma - 2 saniye bekle, arka arkaya gelen yazmaları birleştir
        if (currentUser) {
            if (progressTimerRef.current[courseId]) {
                clearTimeout(progressTimerRef.current[courseId]);
            }
            progressTimerRef.current[courseId] = setTimeout(async () => {
                try {
                    const userRef = doc(db, "users", currentUser.uid);
                    // En güncel savedCourses'u doğrudan Firestore'a yaz
                    setSavedCourses(currentList => {
                        const firestoreData = currentList.map(c => {
                            const { image, coverImage, ...rest } = c;
                            return rest;
                        });
                        updateDoc(userRef, { enrolledCourses: firestoreData }).catch(err => 
                            console.error("Error updating progress in Firestore:", err)
                        );
                        return currentList; // state değiştirme
                    });
                } catch (error) {
                    console.error("Error updating course progress in Firestore:", error);
                }
            }, 2000);
        }
    }, [currentUser]);

    return (
        <LibraryContext.Provider value={{ savedCourses, addToLibrary, removeFromLibrary, isCourseInLibrary, xp, addXp, updateCourseProgress }}>
            {children}
        </LibraryContext.Provider>
    );
}

export function useLibrary() {
    return useContext(LibraryContext);
}
