import { Star, BookOpen } from "lucide-react";

export function CourseCard({ course }) {
    return (
        <div
            className="group relative overflow-hidden rounded-2xl glass-effect border-brand-gold/20 hover:border-brand-gold/60 transition-all duration-300 hover:-translate-y-2 gold-glow"
        >
            {course.ribbon && (
                <div className="absolute top-4 right-0 z-10 bg-brand-gold text-brand-black text-xs font-bold px-4 py-1.5 rounded-l-full shadow-lg">
                    {course.ribbon}
                </div>
            )}

            <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent"></div>
            </div>

            <div className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                    {course.rating > 0 ? (
                        <div className="flex items-center text-brand-gold text-sm font-bold bg-brand-gold/10 px-2 py-1 rounded-full">
                            <Star className="w-4 h-4 fill-current mr-1" />
                            <span>{course.rating}</span>
                        </div>
                    ) : (
                        <div className="flex items-center text-brand-gold text-sm font-bold bg-brand-gold/10 px-2 py-1 rounded-full">
                            <BookOpen className="w-4 h-4 mr-1" />
                            <span>{course.modules?.length || 0} Konu</span>
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight">{course.title}</h3>

                <p className="text-gray-400 text-sm line-clamp-1">
                    {course.category}
                </p>
            </div>
        </div>
    );
}
