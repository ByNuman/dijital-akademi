import { useState } from "react";
import { X, Headphones, ExternalLink, Loader2, Music2, Volume2 } from "lucide-react";
import { getDriveAudioUrl } from "../../utils/driveUtils";

export function AudioPlayer({ url, onClose, title = "Sesli Özet" }) {
    const [isLoading, setIsLoading] = useState(true);
    const embedUrl = getDriveAudioUrl(url);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-[#1A1A1A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#151515]">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-500/10 p-2 rounded-xl">
                            <Headphones className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">{title}</h3>
                            <p className="text-xs text-gray-500">Dinleyerek Öğrenin</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => window.open(url, "_blank")}
                            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                            title="Yeni sekmede aç"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                            title="Kapat"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Audio Visualization Area */}
                <div className="px-6 py-8 bg-gradient-to-b from-[#1A1A1A] to-[#151515]">
                    {/* Static waveform bars */}
                    <div className="flex items-center justify-center gap-1 mb-6">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-1 bg-brand-gold/30 rounded-full"
                                style={{ height: `${8 + Math.sin(i * 0.5) * 12 + 8}px` }}
                            />
                        ))}
                    </div>

                    {/* Album art / icon */}
                    <div className="flex items-center justify-center mb-6">
                        <div
                            className="w-24 h-24 bg-gradient-to-br from-brand-gold/20 to-purple-500/20 rounded-full flex items-center justify-center border border-brand-gold/20 shadow-[0_0_40px_rgba(251,191,36,0.1)]"
                        >
                            <Music2 className="w-10 h-10 text-brand-gold" />
                        </div>
                    </div>

                    {/* Status text */}
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 text-brand-gold">
                            <Volume2 className="w-4 h-4" />
                            <span className="text-sm font-bold uppercase tracking-wider">Şimdi Dinliyorsunuz</span>
                        </div>
                        <p className="text-gray-400 text-xs mt-1">Ses dosyası Google Drive üzerinden oynatılmaktadır</p>
                    </div>
                </div>

                {/* Google Drive Audio Embed */}
                <div className="px-6 pb-6 relative">
                    {isLoading && (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-8 h-8 text-brand-gold animate-spin mr-3" />
                            <p className="text-gray-400 text-sm font-medium">Ses dosyası yükleniyor...</p>
                        </div>
                    )}
                    <div className={`bg-[#111] rounded-2xl overflow-hidden border border-white/5 ${isLoading ? 'h-0 overflow-hidden' : ''}`}>
                        <iframe
                            src={embedUrl}
                            className="w-full h-[80px] border-0"
                            allow="autoplay"
                            onLoad={() => setIsLoading(false)}
                            title={title}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;
