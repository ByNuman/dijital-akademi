import { Twitter, Linkedin } from "lucide-react";

const mentors = [
    {
        name: "Prof. Dr. Ahmet Yılmaz",
        role: "Tefsir Uzmanı",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
        bio: "İslami ilimler alanında 20 yılı aşkın tecrübe. Kur'an ilimleri ve tefsir metodolojisi üzerine sayısız eser."
    },
    {
        name: "Doç. Dr. Ayşe Kaya",
        role: "Fıkıh Akademisyeni",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
        bio: "İslam hukuku ve mukayeseli fıkıh alanlarında uzman. Çeşitli üniversitelerde misafir öğretim üyesi."
    },
    {
        name: "Dr. Mehmet Demir",
        role: "Hadis Araştırmacısı",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
        bio: "Hadis usulü ve raviler üzerine derinlemesine araştırmalar yapan değerli bir akademisyen."
    },
    {
        name: "Zeynep Arslan",
        role: "Kelam ve Akaid",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
        bio: "İnanç esasları ve çağdaş kelam problemleri üzerine uzman. Gençlere yönelik birçok eğitim programının direktörü."
    }
];

export function Mentors() {
    return (
        <section className="py-24 bg-[#101010] relative overflow-hidden" id="mentors">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Uzman <span className="bg-gradient-to-r from-brand-gold to-yellow-200 bg-clip-text text-transparent">Eğitmenlerimiz</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Alanında uzman, yenilikçi ve deneyimli akademisyenlerimizle ufkunuzu açacak eğitimler alın. İlim yolculuğunuzda en güvenilir rehberlerle tanışın.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {mentors.map((mentor, index) => (
                        <div key={index} className="group relative">
                            {/* Card with subtle glowing border effect on hover */}
                            <div className="relative rounded-3xl bg-[#141414] border border-white/5 overflow-hidden transition-all duration-500 hover:border-brand-gold/40 hover:-translate-y-2 hover:shadow-[0_15px_40px_-15px_rgba(251,191,36,0.3)]">
                                {/* Image Container */}
                                <div className="aspect-[4/5] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent z-10"></div>
                                    <img 
                                        src={mentor.image} 
                                        alt={mentor.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                                    />
                                    {/* Social Links shown on hover over image */}
                                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                        <a href="#" className="w-10 h-10 rounded-full bg-black/50 backdrop-blur pb-1 flex justify-center items-center text-white hover:bg-brand-gold hover:text-black transition-colors">
                                            <Twitter className="w-4 h-4" />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-black/50 backdrop-blur pb-1 flex justify-center items-center text-white hover:bg-brand-gold hover:text-black transition-colors delay-75">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="p-6 relative z-20 -mt-16">
                                    <div className="inline-block bg-[#1A1A1A] px-4 py-1.5 rounded-full border border-white/10 mb-3 shadow-lg">
                                        <span className="text-brand-gold text-xs font-bold uppercase tracking-wider">{mentor.role}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">{mentor.name}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                                        {mentor.bio}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
