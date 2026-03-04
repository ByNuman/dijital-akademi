import { HeroSection } from "../components/home/HeroSection";
import { WhyAntigravity } from "../components/home/WhyAntigravity";
import { FeaturedCourses } from "../components/home/FeaturedCourses";
import { Categories } from "../components/home/Categories";
import { Testimonials } from "../components/home/Testimonials";
import { FAQSection } from "../components/home/FAQSection";
import { FinalCTA } from "../components/home/FinalCTA";

export function HomePage() {
    return (
        <>
            <HeroSection />
            <WhyAntigravity />
            <FeaturedCourses />
            <Categories />
            <Testimonials />
            <FAQSection />
            <FinalCTA />
        </>
    );
}

export default HomePage;
