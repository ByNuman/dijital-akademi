export function FeatureItem({ feature, index }) {
    const Icon = feature.icon;

    return (
        <div
            className="glass-effect p-6 rounded-2xl border-brand-gold/10 hover:border-brand-gold/40 transition-all hover:-translate-y-1 gold-glow flex flex-col items-start h-full"
        >
            <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 border border-brand-gold/20 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                <Icon className="w-7 h-7 text-brand-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
                {feature.description}
            </p>
        </div>
    );
}
