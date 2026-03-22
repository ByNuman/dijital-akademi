import React from "react";
import { Link } from "react-router-dom";
import { Star, Clock, BookOpen, User } from "lucide-react";

/**
 * Modern, card-based component for displaying course information
 * @param {Object} props
 * @param {Object} props.course - The course data object
 */
export const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`} className="block group h-full">
      <div className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden hover:border-brand-gold/40 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.1)] flex flex-col h-full transform hover:-translate-y-3">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="absolute top-5 left-5">
            <span className="bg-brand-black/60 backdrop-blur-xl border border-brand-gold/30 text-brand-gold text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
              {course.category}
            </span>
          </div>

          <div className="absolute bottom-5 right-5 flex items-center gap-2 bg-brand-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
             <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
             <span className="text-[11px] text-white font-bold">4.9</span>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-8 flex flex-col flex-grow">
          <h3 className="text-white font-bold text-xl mb-3 group-hover:text-brand-gold transition-colors duration-500 leading-tight line-clamp-2 tracking-tight">
            {course.title}
          </h3>

          <p className="text-gray-500 text-sm mb-8 line-clamp-2 flex-grow leading-relaxed font-medium">
            {course.description}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 group-hover:text-brand-gold/80 transition-colors duration-500">
                <Clock className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-widest">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 group-hover:text-brand-gold/80 transition-colors duration-500">
                <BookOpen className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-widest">{course.modules?.length || course.lessonCount || "0"} Ders</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500">
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
