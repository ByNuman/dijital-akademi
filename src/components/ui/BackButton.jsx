import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function BackButton({ label = "Geri Dön", className = "" }) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-all duration-300 group ${className}`}
        >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-brand-gold/10 border border-white/5 group-hover:border-brand-gold/50 transition-all duration-300">
                <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium tracking-wide">{label}</span>
        </button>
    );
}
