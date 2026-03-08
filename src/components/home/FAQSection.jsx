import { Accordion } from "../ui/Accordion";

const faqs = [
    {
        question: "Dijital Akademi eğitimleri kimler için uygundur?",
        answer: "Akademik seviyede eğitim almak isteyen Theoloji/İlahiyat öğrencileri, araştırmacılar ve İslami ilimlere ilgi duyan herkes için uygundur."
    },
    {
        question: "4'lü eğitim seti sistemi nedir?",
        answer: "Her modül içerisinde; ders slaytları, dinleyerek öğrenmek isteyenler için sesli özet, detaylı PDF ders notları ve bilgiyi pekiştirmek için modül sonu testlerinden oluşan özel bir öğrenme sistemidir."
    },
    {
        question: "Derslere ne kadar süre erişim sağlayabilirim?",
        answer: "Satın aldığınız veya kayıt olduğunuz tüm kurslara ömür boyu sınırsız erişim hakkınız bulunmaktadır. İstediğiniz zaman kendi hızınıza göre eğitimleri tamamlayabilirsiniz."
    },
    {
        question: "Eğitimleri tamamladığımda sertifika alacak mıyım?",
        answer: "Evet, tüm dersleri ve modül sonu değerlendirmelerini başarıyla tamamladığınızda sistem tarafında size özel oluşturulmuş başarı sertifikanızı anında indirebilirsiniz."
    }
];

export function FAQSection() {
    return (
        <section className="py-24 bg-[#101010] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] -translate-y-1/2"></div>

            <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
                <div
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Sıkça Sorulan <span className="text-brand-gold">Sorular</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl font-light">
                        Aklınıza takılan soruların cevaplarını burada bulabilirsiniz.
                    </p>
                </div>

                <div>
                    <Accordion items={faqs} />
                </div>
            </div>
        </section>
    );
}
