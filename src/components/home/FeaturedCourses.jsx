import { CourseCard } from "../ui/CourseCard";
import { useCourses } from "../../context/CoursesContext";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
export function FeaturedCourses() {
    const { courses, loading } = useCourses();
    const featuredCourses = courses.slice(0, 3);
    return (
        <section className="py-24 bg-[#141414] relative border-y border-white/5" id="dersler">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2
                            className="text-4xl md:text-5xl font-black text-white mb-6"
                        >
                            Öne Çıkan <span className="text-brand-gold">Dersler</span>
                        </h2>
                        <p
                            className="text-gray-400 text-lg"
                        >
                            Alanında uzman akademisyenler tarafından hazırlanan, en çok tercih edilen eğitim programlarımızı keşfedin.
                        </p>
                    </div>
                    <div>
                        <Link to="/courses">
                            <Button variant="outline" className="hidden md:inline-flex rounded-xl font-semibold">
                                Tüm Dersleri Gör
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
                        </div>
                    ) : (
                        featuredCourses.map((course) => (
                            <div key={course.id}>
                                <CourseCard course={course} />
                            </div>
                        ))
                    )}
                </div>

                <div className="md:hidden flex justify-center mt-10">
                    <Link to="/courses" className="w-full">
                        <Button variant="outline" className="w-full rounded-xl font-semibold">
                            Tüm Dersleri Gör
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
