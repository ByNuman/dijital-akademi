import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Trophy, ArrowRight, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "../ui/Button";
import { useLibrary } from "../../context/LibraryContext";

const defaultQuestions = [
    {
        id: 1,
        text: "İslam düşünce tarihinde 'Kelam' ilminin temel amacı aşağıdakilerden hangisidir?",
        options: [
            "Kur'an ayetlerinin iniş sebeplerini (Esbab-ı Nüzul) incelemek",
            "İslam inanç esaslarını akli ve nakli delillerle savunmak",
            "Peygamberin hayatını kronolojik olarak kaydetmek",
            "Arap dilinin gramer kurallarını belirlemek"
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        text: "Fıkıh terminolojisinde, yapılması kesin ve bağlayıcı olarak istenen dini emirlere ne ad verilir?",
        options: [
            "Mendup",
            "Mübah",
            "Farz",
            "Sünnet"
        ],
        correctAnswer: 2
    },
    {
        id: 3,
        text: "Aşağıdakilerden hangisi hadis usulünde 'kabul edilebilir (sahih)' bir hadisin taşıması gereken özelliklerden biri DEĞİLDİR?",
        options: [
            "Ravilerin adalet sahibi (güvenilir) olması",
            "Ravilerin zapt sahibi (hafızası güçlü) olması",
            "Senedinde (râvi zincirinde) kopukluk olması",
            "Metninde bir şaz (aykırılık) bulunmaması"
        ],
        correctAnswer: 2
    }
];

export function Quiz({ onComplete, onQuit, questions: propQuestions }) {
    // Admin panelinden gelen sorular varsa onları kullan, yoksa varsayılan soruları
    const questions = (propQuestions && propQuestions.length > 0)
        ? propQuestions.map((q, i) => ({ id: i + 1, text: q.text, options: q.options, correctAnswer: q.correctAnswer }))
        : defaultQuestions;
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const { addXp } = useLibrary();

    const currentQ = questions[currentQIndex];

    const handleOptionSelect = (index) => {
        if (isAnswered) return;

        setSelectedOption(index);
        setIsAnswered(true);

        if (index === currentQ.correctAnswer) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            if (currentQIndex < questions.length - 1) {
                setCurrentQIndex(prev => prev + 1);
                setSelectedOption(null);
                setIsAnswered(false);
            } else {
                handleFinish();
            }
        }, 1500);
    };

    const handleFinish = () => {
        setIsFinished(true);
        // Calculate success percentage
        const percentage = ((score + (selectedOption === currentQ.correctAnswer ? 1 : 0)) / questions.length) * 100;

        if (percentage >= 50) {
            // Trigger confetti
            const duration = 3 * 1000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#FBBF24', '#ffffff'] // Brand gold and white
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FBBF24', '#ffffff']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());

            // Award XP
            setTimeout(() => {
                addXp(500);
            }, 1000);
        }
    };

    const resetQuiz = () => {
        setCurrentQIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setIsFinished(false);
    };

    // Result Screen
    if (isFinished) {
        const finalScore = score;
        const total = questions.length;
        const isSuccess = finalScore >= total / 2;

        return (
            <div
                className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/5 flex-transparent pointer-events-none"></div>

                <div
                    className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 relative z-10
                        ${isSuccess ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-500'}
                    `}
                >
                    <Trophy className="w-12 h-12" />
                </div>

                <h2 className="text-3xl font-black text-white mb-2 relative z-10">
                    {isSuccess ? 'Tebrikler, Harika İş Çıkardınız!' : 'Biraz Daha Çalışmalısınız'}
                </h2>
                <p className="text-gray-400 text-lg mb-8 relative z-10">
                    Bu modül sınavında {total} sorudan {finalScore} tanesini doğru yanıtladınız.
                </p>

                {isSuccess && (
                    <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-xl font-bold mb-8 border border-brand-gold/20 relative z-10">
                        <ArrowRight className="w-5 h-5" /> 500 XP Kazandınız!
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <Button variant="outline" onClick={resetQuiz} className="gap-2">
                        <RotateCcw className="w-4 h-4" /> Tekrar Çöz
                    </Button>
                    <Button variant="primary" onClick={() => onComplete(finalScore, total)} className="gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Eğitime Geri Dön
                    </Button>
                </div>
            </div>
        );
    }

    // Question Screen
    return (
        <div className="max-w-3xl mx-auto">
            {/* Header & Progress */}
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white">Modül Değerlendirmesi</h3>
                <div className="flex items-center gap-4">
                    <span className="text-brand-gold font-bold">Soru {currentQIndex + 1}/{questions.length}</span>
                    <Button variant="outline" onClick={onQuit} className="py-1.5 px-3 min-h-0 text-sm border-white/10 hover:bg-white/5">
                        Çıkış
                    </Button>
                </div>
            </div>

            <div className="w-full bg-[#1A1A1A] h-2 rounded-full mb-8 overflow-hidden">
                <div
                    className="h-full bg-brand-gold rounded-full transition-all duration-300"
                    style={{ width: `${((currentQIndex) / questions.length) * 100}%` }}
                />
            </div>

            {/* Question Card */}
            <div
                className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-6 sm:p-10 shadow-xl"
            >
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-8 leading-snug">
                    {currentQ.text}
                </h4>

                <div className="space-y-4">
                    {currentQ.options.map((option, index) => {
                        let optionClass = "bg-[#252525] border-white/10 text-gray-300 hover:border-brand-gold/50 hover:bg-[#2a2a2a]";
                        let Icon = null;

                        if (isAnswered) {
                            if (index === currentQ.correctAnswer) {
                                optionClass = "bg-emerald-500/10 border-emerald-500/50 text-emerald-400";
                                Icon = CheckCircle2;
                            } else if (index === selectedOption) {
                                optionClass = "bg-red-500/10 border-red-500/50 text-red-400";
                                Icon = XCircle;
                            } else {
                                optionClass = "bg-[#252525] border-white/5 text-gray-500 opacity-50";
                            }
                        } else if (selectedOption === index) {
                            optionClass = "bg-brand-gold/10 border-brand-gold text-white";
                        }

                        return (
                            <button
                                key={index}
                                disabled={isAnswered}
                                onClick={() => handleOptionSelect(index)}
                                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${optionClass}`}
                            >
                                <span className="text-base sm:text-lg font-medium pr-4">{option.option || option}</span>
                                {Icon && (
                                    <Icon className="w-6 h-6 shrink-0" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Quiz;
