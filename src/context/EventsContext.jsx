import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { toast } from 'sonner';

const EventsContext = createContext();

export function useEvents() {
    return useContext(EventsContext);
}

export function EventsProvider({ children }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const q = query(collection(db, 'events'), orderBy('date', 'asc'));
            const querySnapshot = await getDocs(q);
            const eventsData = [];
            querySnapshot.forEach((doc) => {
                eventsData.push({ id: doc.id, ...doc.data() });
            });
            setEvents(eventsData);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const addEvent = async (eventData) => {
        try {
            await addDoc(collection(db, "events"), eventData);
            toast.success("Etkinlik eklendi!");
            fetchEvents();
        } catch (error) {
            console.error("Etkinlik eklenirken hata:", error);
            toast.error("Etkinlik eklenemedi.");
        }
    };

    const updateEvent = async (id, eventData) => {
        try {
            const eventRef = doc(db, "events", id);
            await updateDoc(eventRef, eventData);
            toast.success("Etkinlik güncellendi!");
            fetchEvents();
        } catch (error) {
            console.error("Etkinlik güncellenirken hata:", error);
            toast.error("Etkinlik güncellenemedi.");
        }
    };

    const deleteEvent = async (id) => {
        try {
            await deleteDoc(doc(db, "events", id));
            toast.success("Etkinlik silindi!");
            fetchEvents();
        } catch (error) {
            console.error("Etkinlik silinirken hata:", error);
            toast.error("Etkinlik silinemedi.");
        }
    };

    const value = {
        events,
        loading,
        addEvent,
        updateEvent,
        deleteEvent,
        refreshEvents: fetchEvents
    };

    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    );
}
