import { Helmet } from 'react-helmet-async';
import { HeroSection } from "../components/home/HeroSection";
import { RecentlyAdded } from "../components/home/RecentlyAdded";
import { FeaturedCourses } from "../components/home/FeaturedCourses";
import { Categories } from "../components/home/Categories";
import { FinalCTA } from "../components/home/FinalCTA";

export function HomePage() {
    return (
        <>
            <Helmet>
                <title>Dijital Akademi - İlmin Dijital Kapısı</title>
                <meta name="description" content="İslami ilimler alanında Türkiye'nin en kaliteli ve tamamen ücretsiz online eğitim platformu. Premium dersler, uzman eğitmenler ve akademik makaleler." />
                <meta name="keywords" content="online eğitim, ispami ilimler, tefsir, fıkıh, kelam, ücretsiz eğitim, akademi, sertifika" />
                <meta property="og:title" content="Dijital Akademi - İlmin Dijital Kapısı" />
                <meta property="og:description" content="Tamamen ücretsiz, yüksek kaliteli İslami ilimler eğitim platformu." />
            </Helmet>
            <HeroSection />
            <RecentlyAdded />
            <FeaturedCourses />
            <Categories />
            <FinalCTA />
        </>
    );
}

export default HomePage;
