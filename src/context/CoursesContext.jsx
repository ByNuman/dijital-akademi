import { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const CoursesContext = createContext();

export const useCourses = () => {
    return useContext(CoursesContext);
};

export const CoursesProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "courses"));
            const coursesData = [];
            querySnapshot.forEach((doc) => {
                coursesData.push({ ...doc.data(), id: doc.id.toString() });
            });
            // Opsiyonel sıralama: id'ye veya başlığa göre
            // Ancak şu an olduğu gibi bırakabiliriz.
            setCourses(coursesData);
        } catch (error) {
            console.error("Dersleri çekerken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const value = {
        courses,
        loading,
        fetchCourses
    };

    return (
        <CoursesContext.Provider value={value}>
            {children}
        </CoursesContext.Provider>
    );
};
