import { categories } from "../../data/mockData";

export function Categories() {
    return (
        <section className="py-24 relative bg-[#101010]">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    <h2
                        className="text-4xl md:text-5xl font-black text-white mb-6"
                    >
                        İlim <span className="text-brand-gold">Disiplinleri</span>
                    </h2>
                    <p
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Geniş kategoriler yelpazesinde, aradığınız derinliğe uygun eğitim programını seçin.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {categories.map((category) => (
                        <a
                            href="#"
                            key={category.id}
                            className="glass-effect p-8 rounded-3xl flex flex-col items-center justify-center text-center group cursor-pointer border-white/5 hover:border-brand-gold/40 transition-all hover:-translate-y-1 gold-glow"
                        >
                            <div className="text-[56px] mb-5 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_10px_15px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_10px_20px_rgba(251,191,36,0.3)]">
                                {category.icon}
                            </div>
                            <h3 className="text-white font-bold mb-2 group-hover:text-brand-gold transition-colors">{category.name}</h3>
                            <p className="text-gray-500 font-medium text-sm">{category.count} Kurs</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
