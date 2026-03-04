import { courses } from "./coursesData";

export const studentData = {
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    avatar: "https://ui-avatars.com/api/?name=Ahmet+Yılmaz&background=FBBF24&color=000",
    enrolledCourses: [
        {
            ...courses[0],
            progress: 45,
            lastAccessed: "2 gün önce"
        },
        {
            ...courses[3],
            progress: 80,
            lastAccessed: "Bugün"
        },
        {
            ...courses[6],
            progress: 10,
            lastAccessed: "1 hafta önce"
        }
    ],
    upcomingEvents: [
        {
            id: 1,
            title: "Canlı Ders: Felsefe Tarihi 2",
            date: "2026-03-06T20:00:00Z",
            type: "live"
        },
        {
            id: 2,
            title: "Vize Sınavı: Arap Dili ve Edebiyatı 4",
            date: "2026-03-10T10:00:00Z",
            type: "exam"
        }
    ]
};
