import { BookOpen, Infinity, ShieldCheck, Video } from "lucide-react";

export const features = [
    {
        icon: Infinity,
        title: "Kesintisiz Erişim",
        description: "Sınırları kaldırın. İstediğiniz cihazdan, günün her saati Premium ders arşivine ulaşın.",
    },
    {
        icon: ShieldCheck,
        title: "Uzman Akademisyenler",
        description: "Alanında öncü, referans sahibi akademisyenler ve yazarlardan eğitim alın.",
    },
    {
        icon: BookOpen,
        title: "Sertifika Programları",
        description: "İslami ilimler alanındaki yetkinliğinizi uluslararası geçerliliğe sahip sertifikalarla taçlandırın.",
    },
    {
        icon: Video,
        title: "Vize Özel Odaları",
        description: "Sınav dönemlerine özel, özenle hazırlanmış yoğunlaştırılmış interaktif etüt odaları.",
    },
];

export const featuredCourses = [
    {
        id: 1,
        title: "Tefsir Usulü ve Ekolleri",
        instructor: "Prof. Dr. Mehmet Emin",
        rating: 4.8,
        reviews: 124,
        price: "1.450 ₺",
        image: "https://images.unsplash.com/photo-1590076214571-70e6e7d69d41?auto=format&fit=crop&q=80&w=800",
        ribbon: "En Çok Satan",
    },
    {
        id: 2,
        title: "Kelam Tarihi ve Problemleri",
        instructor: "Doç. Dr. Ahmet Faruk",
        rating: 4.9,
        reviews: 89,
        price: "1.250 ₺",
        image: "https://images.unsplash.com/photo-1577908953928-1ce4489ae9b8?auto=format&fit=crop&q=80&w=800",
        ribbon: null,
    },
    {
        id: 3,
        title: "İslam Felsefesi ve Düşünce Tarihi",
        instructor: "Dr. Zeynep Bilgin",
        rating: 4.7,
        reviews: 210,
        price: "1.600 ₺",
        image: "https://images.unsplash.com/photo-1505664173691-a28169fc68b9?auto=format&fit=crop&q=80&w=800",
        ribbon: "Yeni",
    },
];

export const categories = [
    { id: 1, name: "Temel İslami İlimler", icon: "📚", count: 45 },
    { id: 2, name: "Din Bilimleri", icon: "🕌", count: 28 },
    { id: 3, name: "Felsefe & Mantık", icon: "🧠", count: 32 },
    { id: 4, name: "Dil Eğitimi", icon: "🌍", count: 18 },
    { id: 5, name: "İslam Tarihi", icon: "⏳", count: 24 },
    { id: 6, name: "Kişisel Gelişim", icon: "✨", count: 15 },
];

export const testimonials = [
    {
        id: 1,
        name: "Merve Yılmaz",
        title: "İlahiyat Öğrencisi",
        comment: "Dijital Akademi sayesinde İslami İlimler derslerimde büyük bir ilerleme kaydettim. Hocaların anlatımı ve platformun kalitesi eşsiz. Özellikle vize özel odaları harika!",
        rating: 5,
    },
    {
        id: 2,
        name: "Emre Çelik",
        title: "Tarih Öğretmeni",
        comment: "Felsefe ve Mantık kursları gerçekten ufuk açıcı. Premium bir his veren bu platformda ders dinlemek büyük bir keyif. Herkese tavsiye ediyorum.",
        rating: 5,
    },
    {
        id: 3,
        name: "Zehra Kaya",
        title: "Araştırmacı",
        comment: "İçeriklerin derinliği ve platform tasarımı muazzam. Akademik dünyadaki en iyi dijital platformlardan biri olduğuna şüphe yok. Geleceğin eğitimi burada.",
        rating: 5,
    },
];
