import { motion } from "framer-motion";
import { Star, User } from "lucide-react";

export function CourseCard({ course }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl glass-effect border-brand-gold/20 hover:border-brand-gold/60 transition-colors duration-300 gold-glow"
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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent"></div>
            </div>

            <div className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-brand-gold text-sm font-bold bg-brand-gold/10 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span>{course.rating}</span>
                        <span className="text-gray-400 text-xs ml-1 font-normal">({course.reviews})</span>
                    </div>
                    <p className="text-white font-bold text-lg">{course.price}</p>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight">{course.title}</h3>

                <div className="flex items-center text-gray-400 text-sm">
                    <div className="w-8 h-8 rounded-full bg-brand-slate flex items-center justify-center mr-3 border border-white/10">
                        <User className="w-4 h-4 text-brand-gold" />
                    </div>
                    <span className="font-medium text-gray-300">{course.instructor}</span>
                </div>
            </div>
        </motion.div>
    );
}
