import { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const ProgramsContext = createContext();

export const usePrograms = () => {
    return useContext(ProgramsContext);
};

export const ProgramsProvider = ({ children }) => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPrograms = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "programs"));
            const programsData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                programsData.push({ ...data, id: doc.id.toString() });
            });
            setPrograms(programsData);
        } catch (error) {
            console.error("Programları çekerken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };

    const addProgram = async (programData) => {
        try {
            const docRef = await addDoc(collection(db, "programs"), programData);
            setPrograms((prev) => [...prev, { id: docRef.id, ...programData }]);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error("Program eklerken hata:", error);
            return { success: false, error };
        }
    };

    const updateProgram = async (id, programData) => {
        try {
            const docRef = doc(db, "programs", id);
            await updateDoc(docRef, programData);
            setPrograms((prev) => prev.map((prog) => (prog.id === id ? { ...prog, ...programData } : prog)));
            return { success: true };
        } catch (error) {
            console.error("Program güncellerken hata:", error);
            return { success: false, error };
        }
    };

    const deleteProgram = async (id) => {
        try {
            await deleteDoc(doc(db, "programs", id));
            setPrograms((prev) => prev.filter((prog) => prog.id !== id));
            return { success: true };
        } catch (error) {
            console.error("Program silerken hata:", error);
            return { success: false, error };
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const value = {
        programs,
        loading,
        fetchPrograms,
        addProgram,
        updateProgram,
        deleteProgram
    };

    return (
        <ProgramsContext.Provider value={value}>
            {children}
        </ProgramsContext.Provider>
    );
};
