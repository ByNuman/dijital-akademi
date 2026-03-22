import { Helmet } from 'react-helmet-async';
import { HeroSection } from "../components/home/HeroSection";
import { RecentlyAdded } from "../components/home/RecentlyAdded";
import { FeaturedCourses } from "../components/home/FeaturedCourses";
import { FinalCTA } from "../components/home/FinalCTA";

export function HomePage() {
    return (
        <>
            <Helmet>
                <title>Dijital Akademi - İlmin Dijital Kapısı</title>
                <meta name="description" content="İslami ilimler alanında Türkiye'nin en kaliteli ve tamamen ücretsiz online eğitim platformu. Premium dersler, uzman eğitmenler ve akademik makaleler." />
                <meta name="keywords" content="online eğitim, islami ilimler, tefsir, fıkıh, kelam, ücretsiz eğitim, akademi, sertifika" />
                <meta property="og:title" content="Dijital Akademi - İlmin Dijital Kapısı" />
                <meta property="og:description" content="Tamamen ücretsiz, yüksek kaliteli İslami ilimler eğitim platformu." />
            </Helmet>
            <HeroSection />
            
            <FeaturedCourses />
            
            <div className="w-full bg-brand-black">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent"></div>
                </div>
            </div>
            
            <RecentlyAdded />
            <FinalCTA />
        </>
    );
}

export default HomePage;
