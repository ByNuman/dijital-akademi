import React, { useState } from 'react';
import { CalendarDays, BookOpen, FileText, Download, ExternalLink, List, File } from 'lucide-react';
import academicCalendarPDF from '../data/2025-2026-egitim-ogretim-yili-akademik-takvimi.pdf';
import courseSchedulePDF from '../data/2025-2026-bahar-yariyili-li-sans-haftalik-ders-programi.pdf';
import examSchedulePDF from '../data/2025-2026-bahar-donemi-arasinav-sinav-programi.pdf';

import calendarData from '../data/calendar.json';
import courseData from '../data/courseSchedule.json';
import examData from '../data/examSchedule.json';

const programs = [
    {
        id: 'academic',
        title: 'Akademik Takvim',
        icon: CalendarDays,
        pdf: academicCalendarPDF,
        data: calendarData,
        description: '2025-2026 Eğitim Öğretim Yılı Akademik Takvimi'
    },
    {
        id: 'courses',
        title: 'Ders Programı',
        icon: BookOpen,
        pdf: courseSchedulePDF,
        data: courseData,
        description: '2025-2026 Bahar Yarıyılı Lisans Haftalık Ders Programı'
    },
    {
        id: 'exams',
        title: 'Sınav Programı',
        icon: FileText,
        pdf: examSchedulePDF,
        data: examData,
        description: '2025-2026 Bahar Dönemi Ara Sınav Programı'
    }
];

export default function Programs() {
    const [activeTab, setActiveTab] = useState('academic');
    const activeProgram = programs.find((p) => p.id === activeTab);

    return (
        <div className="min-h-screen bg-[#101010] text-[#E0E0E0] pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-black mb-4">
                        Eğitim <span className="text-brand-gold">Programları</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Akademik takvim, ders ve sınav programlarına buradan ulaşabilirsiniz.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {programs.map((program) => {
                        const Icon = program.icon;
                        const isActive = activeTab === program.id;
                        return (
                            <button
                                key={program.id}
                                onClick={() => setActiveTab(program.id)}
                                className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm md:text-base border ${
                                    isActive
                                        ? 'bg-brand-gold/10 border-brand-gold text-brand-gold shadow-[0_0_20px_rgba(251,191,36,0.1)] scale-105'
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-gold' : 'text-gray-400'}`} />
                                {program.title}
                            </button>
                        );
                    })}
                </div>

                {/* Content Container */}
                <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100"></div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-white/10 pb-6 relative z-10">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                <activeProgram.icon className="w-6 h-6 text-brand-gold" />
                                {activeProgram.title}
                            </h2>
                            <p className="text-gray-400">{activeProgram.description}</p>
                        </div>
                    </div>

                    {/* PDF View Content */}
                    <div className="relative z-10">
                        <div className="space-y-6">
                            <div className="flex gap-3 justify-end">
                                <a
                                    href={activeProgram.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all text-sm"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Yeni Sekmede Aç
                                </a>
                                <a
                                    href={activeProgram.pdf}
                                    download
                                    className="flex items-center gap-2 px-6 py-3 bg-brand-gold hover:bg-yellow-500 text-black font-bold rounded-xl transition-all text-sm"
                                >
                                    <Download className="w-4 h-4" />
                                    İndir
                                </a>
                            </div>
                            <div className="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] bg-black/50 rounded-2xl overflow-hidden border border-white/5">
                                <iframe
                                    src={`${activeProgram.pdf}#view=FitH`}
                                    className="w-full h-full"
                                    title={activeProgram.title}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
