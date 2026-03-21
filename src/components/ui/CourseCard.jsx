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
      <div className="bg-academy-dark/40 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full backdrop-blur-sm group-hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        </div>

        {/* Course Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-medium text-primary uppercase tracking-widest">{course.category}</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
            {course.title}
          </h3>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/5 text-[11px] font-medium text-gray-500 uppercase tracking-wider">
            <div className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span>{course.modules?.length || course.lessonCount || "0"} Ders</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
