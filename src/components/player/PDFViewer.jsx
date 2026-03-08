import { useState } from "react";
import { X, FileText, Maximize2, Minimize2, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "../ui/Button";
import { getDrivePreviewUrl } from "../../utils/driveUtils";

export function PDFViewer({ url, onClose, title = "PDF Okuma" }) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const embedUrl = getDrivePreviewUrl(url);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className={`bg-[#1A1A1A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col ${
                    isFullscreen ? "w-full h-full rounded-none" : "w-full max-w-5xl h-[85vh]"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#151515] shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-500/10 p-2 rounded-xl">
                            <FileText className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">{title}</h3>
                            <p className="text-xs text-gray-500">Detaylı Ders Notları</p>
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
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                            title={isFullscreen ? "Küçült" : "Tam ekran"}
                        >
                            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
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

                {/* PDF Embed */}
                <div className="flex-1 relative bg-[#111] overflow-hidden">
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111] z-10">
                            <Loader2 className="w-10 h-10 text-brand-gold animate-spin mb-3" />
                            <p className="text-gray-400 text-sm font-medium">PDF yükleniyor...</p>
                        </div>
                    )}
                    <iframe
                        src={embedUrl}
                        className="w-full h-full border-0"
                        allow="autoplay"
                        onLoad={() => setIsLoading(false)}
                        title={title}
                    />
                </div>
            </div>
        </div>
    );
}

export default PDFViewer;
