"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChampionFormData, ForgeStep, GeneratedChampion } from "@/types";
import {
  KINDRED_LAMB_QUESTIONS,
  KINDRED_WOLF_QUESTIONS,
  EXTRA_QUESTIONS,
} from "@/lib/constants";
import KindredAvatar from "@/components/ui/KindredAvatar";
import RuneCircle from "@/components/animations/RuneCircle";
import Typewriter from "@/components/animations/Typewriter";
import KindredLogo from "@/components/ui/KindredLogo";

const EMPTY_FORM: ChampionFormData = {
  name: "", origin: "", tragedy: "", purpose: "",
  target: "", hunter: "", fear: "", survival: "",
  region: "", power: "", weapon: "", alignment: "", quote: "",
};

export default function ForgeSection() {
  const [step, setStep] = useState<ForgeStep>("invocation");
  const [form, setForm] = useState<ChampionFormData>(EMPTY_FORM);
  const [currentQ, setCurrentQ] = useState(0);
  const [champion, setChampion] = useState<GeneratedChampion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  const allLambDone = KINDRED_LAMB_QUESTIONS.every((q) => form[q.id as keyof ChampionFormData]);
  const allWolfDone = KINDRED_WOLF_QUESTIONS.every((q) => form[q.id as keyof ChampionFormData]);

  const setFieldValue = (id: string, value: string) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  // ===========  STEP: INVOCATION ===========
  if (step === "invocation") {
    return <InvocationStep onStart={() => { setStep("lamb-questions"); setCurrentQ(0); }} />;
  }

  // =========== STEP: LAMB QUESTIONS ===========
  if (step === "lamb-questions") {
    const q = KINDRED_LAMB_QUESTIONS[currentQ];
    const isLast = currentQ === KINDRED_LAMB_QUESTIONS.length - 1;

    const handleNext = () => {
      if (!inputValue.trim()) return;
      setFieldValue(q.id, inputValue.trim());
      setInputValue("");
      if (isLast) {
        setStep("wolf-questions");
        setCurrentQ(0);
      } else {
        setCurrentQ((prev) => prev + 1);
      }
    };

    return (
      <QuestionStep
        question={q.text}
        description={q.description}
        speaker="lamb"
        stepLabel={`Lamb — ${currentQ + 1} / ${KINDRED_LAMB_QUESTIONS.length}`}
        totalProgress={(currentQ + 1) / (KINDRED_LAMB_QUESTIONS.length + KINDRED_WOLF_QUESTIONS.length + EXTRA_QUESTIONS.length)}
        value={inputValue}
        onChange={setInputValue}
        onNext={handleNext}
        isLast={isLast}
        prevAnswer={form[q.id as keyof ChampionFormData] as string}
      />
    );
  }

  // =========== STEP: WOLF QUESTIONS ===========
  if (step === "wolf-questions") {
    const q = KINDRED_WOLF_QUESTIONS[currentQ];
    const isLast = currentQ === KINDRED_WOLF_QUESTIONS.length - 1;

    const handleNext = () => {
      if (!inputValue.trim()) return;
      setFieldValue(q.id, inputValue.trim());
      setInputValue("");
      if (isLast) {
        setStep("extra-questions");
        setCurrentQ(0);
      } else {
        setCurrentQ((prev) => prev + 1);
      }
    };

    return (
      <QuestionStep
        question={q.text}
        description={q.description}
        speaker="wolf"
        stepLabel={`Wolf — ${currentQ + 1} / ${KINDRED_WOLF_QUESTIONS.length}`}
        totalProgress={(KINDRED_LAMB_QUESTIONS.length + currentQ + 1) / (KINDRED_LAMB_QUESTIONS.length + KINDRED_WOLF_QUESTIONS.length + EXTRA_QUESTIONS.length)}
        value={inputValue}
        onChange={setInputValue}
        onNext={handleNext}
        isLast={isLast}
        prevAnswer={form[q.id as keyof ChampionFormData] as string}
      />
    );
  }

  // =========== STEP: EXTRA QUESTIONS ===========
  if (step === "extra-questions") {
    const q = EXTRA_QUESTIONS[currentQ];
    const isLast = currentQ === EXTRA_QUESTIONS.length - 1;
    const currentValue = form[q.id as keyof ChampionFormData] as string || "";

    const handleNext = async () => {
      const val = q.type === "select" ? currentValue : inputValue.trim();
      if (!val) return;
      setFieldValue(q.id, val);
      if (!isLast) {
        setInputValue("");
        setCurrentQ((prev) => prev + 1);
      } else {
        // Last question — trigger generation
        const finalForm = { ...form, [q.id]: val };
        setForm(finalForm);
        setInputValue("");
        setStep("generating");
        await generateChampion(finalForm);
      }
    };

    const generateChampion = async (finalForm: ChampionFormData) => {
      try {
        const res = await fetch("/api/champion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalForm),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Generation failed");
        }
        const data: GeneratedChampion = await res.json();
        setChampion(data);
        setStep("result");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setStep("result");
      }
    };

    return (
      <ExtraQuestionStep
        question={q}
        stepLabel={`Destin — ${currentQ + 1} / ${EXTRA_QUESTIONS.length}`}
        totalProgress={(KINDRED_LAMB_QUESTIONS.length + KINDRED_WOLF_QUESTIONS.length + currentQ + 1) / (KINDRED_LAMB_QUESTIONS.length + KINDRED_WOLF_QUESTIONS.length + EXTRA_QUESTIONS.length)}
        value={q.type === "select" ? currentValue : inputValue}
        onChange={(v) => q.type === "select" ? setFieldValue(q.id, v) : setInputValue(v)}
        onNext={handleNext}
        isLast={isLast}
      />
    );
  }

  // =========== STEP: GENERATING ===========
  if (step === "generating") {
    return <GeneratingStep />;
  }

  // =========== STEP: RESULT ===========
  if (step === "result") {
    return (
      <ResultStep
        champion={champion}
        error={error}
        onPremium={() => setStep("premium")}
        onRestart={() => {
          setForm(EMPTY_FORM);
          setStep("invocation");
          setCurrentQ(0);
          setChampion(null);
          setError(null);
          setInputValue("");
        }}
      />
    );
  }

  // =========== STEP: PREMIUM ===========
  if (step === "premium") {
    return <PremiumStep champion={champion} onRestart={() => {
      setForm(EMPTY_FORM);
      setStep("invocation");
      setCurrentQ(0);
      setChampion(null);
      setError(null);
      setInputValue("");
    }} />;
  }

  return null;
}

// ===========================
// Sub-components
// ===========================

function InvocationStep({ onStart }: { onStart: () => void }) {
  const [introTyped, setIntroTyped] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-kindred-gradient" />

      <div className="absolute inset-0 pointer-events-none">
        <RuneCircle size={500} speed={50} opacity={0.05} color="#c8972a"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <RuneCircle size={300} speed={30} opacity={0.07} color="#4a9eff"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center gap-10 text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <KindredAvatar size="lg" speaker="both" />
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-gold/40" />
            <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase text-gold/50">
              Invocation Ritual
            </span>
            <div className="h-px w-8 bg-gold/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-cinzel-decorative text-3xl md:text-4xl font-bold text-ivory leading-tight"
          >
            Forge your{" "}
            <span className="text-gold-shimmer">Destiny</span>
            <br />
            with Kindred
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="h-16"
          >
            <Typewriter
              text="All things meet Kindred\u2026 but few choose how. Lamb and Wolf have been waiting for you. They know your story — but want to hear it from your own lips. Are you ready to forge your legend?"
              speed={22}
              delay={1500}
              onComplete={() => setIntroTyped(true)}
              className="font-serif text-base text-ivory/60 italic leading-relaxed"
            />
          </motion.div>
        </div>

        <AnimatePresence>
          {introTyped && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                boxShadow: [
                  "0 0 20px rgba(200,151,42,0.2)",
                  "0 0 40px rgba(200,151,42,0.5)",
                  "0 0 20px rgba(200,151,42,0.2)",
                ],
              }}
              exit={{ opacity: 0 }}
              onClick={onStart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative font-cinzel text-sm tracking-widest uppercase px-10 py-4 overflow-hidden
                border border-gold/50 text-gold hover:text-void transition-all duration-500 rounded-sm"
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
            >
              <span className="relative z-10">Begin the Ritual</span>
              <div className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="flex items-center gap-8 text-center"
        >
          {[
          { icon: "◈", label: "Guided by Kindred" },
            { icon: "❖", label: "AI-generated Lore" },
            { icon: "⬡", label: "Exclusive Illustration" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <span className="text-gold/40 text-lg">{item.icon}</span>
              <span className="font-cinzel text-[10px] tracking-wider uppercase text-ivory/20">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

// ---

interface QuestionStepProps {
  question: string;
  description: string;
  speaker: "lamb" | "wolf";
  stepLabel: string;
  totalProgress: number;
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  isLast: boolean;
  prevAnswer?: string;
}

function QuestionStep({
  question, description, speaker, stepLabel, totalProgress,
  value, onChange, onNext, isLast,
}: QuestionStepProps) {
  const isLamb = speaker === "lamb";
  const accentColor = isLamb ? "gold" : "azure";
  const borderClass = isLamb ? "border-gold/30" : "border-azure/30";
  const textClass = isLamb ? "text-gold" : "text-azure";
  const bgClass = isLamb ? "bg-gold/5" : "bg-azure/5";

  return (
    <motion.div
      key={question}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0" style={{
        background: isLamb
          ? "radial-gradient(ellipse at 50% 40%, rgba(26,10,10,0.8) 0%, #050508 70%)"
          : "radial-gradient(ellipse at 50% 40%, rgba(10,20,40,0.9) 0%, #050508 70%)",
      }} />

      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <span className={`font-cinzel text-xs tracking-widest uppercase ${textClass} opacity-60`}>
          {stepLabel}
        </span>
        <div className="flex-1 mx-6 h-px relative overflow-hidden bg-ivory/10 rounded-full">
          <motion.div
            className={`absolute left-0 top-0 h-full rounded-full ${isLamb ? "bg-gold" : "bg-azure"}`}
            style={{ width: `${totalProgress * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-2xl w-full space-y-10">
        <div className="flex flex-col items-center gap-6">
          <KindredAvatar size="md" speaker={speaker} />
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${borderClass} ${bgClass}`}>
            <span className={`font-cinzel text-[10px] tracking-widest uppercase ${textClass}`}>
              {isLamb ? "Lamb speaks" : "Wolf growls"}
            </span>
          </div>
        </div>

        <div className="text-center space-y-3">
          <h3 className={`font-cinzel text-2xl md:text-3xl font-semibold leading-tight ${isLamb ? "text-ivory" : "text-azure/90"}`}>
            <Typewriter text={`"${question}"`} speed={20} />
          </h3>
          <p className="font-cinzel text-xs text-ivory/30 italic mt-2">{description}</p>
        </div>

        <div className={`relative border ${borderClass} bg-void/80 rounded-sm overflow-hidden focus-within:border-opacity-60 transition-colors`}>
          <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${isLamb ? "via-gold/40" : "via-azure/40"} to-transparent`} />
          <textarea
            autoFocus
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onNext();
              }
            }}
            placeholder="Écris ta réponse..."
            rows={4}
            maxLength={500}
            className="w-full bg-transparent px-6 py-4 font-cinzel text-sm text-ivory/80 placeholder-ivory/20 resize-none outline-none leading-relaxed"
          />
          <div className={`flex items-center justify-between px-6 py-3 border-t ${borderClass}`}>
            <span className="font-cinzel text-xs text-ivory/20">{value.length}/500</span>
            <motion.button
              onClick={onNext}
              disabled={!value.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`font-cinzel text-xs tracking-widest uppercase px-6 py-2 border ${borderClass} ${textClass}
                hover:${bgClass} disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 rounded-sm`}
            >
              {isLast ? "Continue →" : "Next →"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---

interface ExtraQ {
  id: string;
  text: string;
  type: string;
  options?: string[];
  placeholder?: string;
}

function ExtraQuestionStep({
  question, stepLabel, totalProgress, value, onChange, onNext, isLast,
}: {
  question: ExtraQ;
  stepLabel: string;
  totalProgress: number;
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  isLast: boolean;
}) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 40%, rgba(20,15,40,0.9) 0%, #050508 70%)",
      }} />

      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <span className="font-cinzel text-xs tracking-widest uppercase text-mystic opacity-60">{stepLabel}</span>
        <div className="flex-1 mx-6 h-px relative overflow-hidden bg-ivory/10 rounded-full">
          <motion.div
            className="absolute left-0 top-0 h-full bg-mystic rounded-full"
            style={{ width: `${totalProgress * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-2xl w-full space-y-8">
        <div className="flex flex-col items-center gap-6">
          <KindredLogo variant="fate-icon" className="w-16 h-16" animate />
          <span className="font-cinzel text-[10px] tracking-widest uppercase text-mystic/60">Fates &amp; Power</span>
        </div>

        <div className="text-center space-y-2">
          <h3 className="font-cinzel text-2xl md:text-3xl font-semibold text-ivory leading-tight">
            <Typewriter text={`"${question.text}"`} speed={20} />
          </h3>
        </div>

        {question.type === "select" && question.options ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {question.options.map((opt) => (
              <motion.button
                key={opt}
                onClick={() => onChange(opt)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-3 text-left text-xs font-cinzel border rounded-sm transition-all duration-200 cursor-pointer
                  ${value === opt
                    ? "border-gold/80 bg-gold/10 text-gold"
                    : "border-ivory/10 bg-void/50 text-ivory/50 hover:border-mystic/40 hover:text-ivory/80"
                  }`}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="relative border border-mystic/30 bg-void/80 rounded-sm overflow-hidden">
            <textarea
              autoFocus
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onNext();
                }
              }}
              placeholder={question.placeholder || "Write your answer..."}
              rows={3}
              maxLength={300}
              className="w-full bg-transparent px-6 py-4 font-cinzel text-sm text-ivory/80 placeholder-ivory/20 resize-none outline-none"
            />
          </div>
        )}

        <motion.button
          onClick={onNext}
          disabled={!value}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full font-cinzel text-sm tracking-widest uppercase py-4 border border-mystic/40 text-mystic
            hover:bg-mystic/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 rounded-sm"
        >
          {isLast ? "❖ Forge my Legend ❖" : "Next →"}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ---

function GeneratingStep() {
  const steps = [
    "Lamb weaves the threads of fate...",
    "Wolf digs into primal instincts...",
    "The archives open themselves for you...",
    "The lore takes shape in the chronicles...",
    "Your champion emerges from the darkness...",
  ];
  const [currentStep, setCurrentStep] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1800);
    return () => clearInterval(interval);
  });

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gap-12 overflow-hidden">
      <div className="absolute inset-0 bg-kindred-gradient" />
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <RuneCircle size={400} speed={10} opacity={0.1} color="#c8972a" />
        <div className="absolute">
          <RuneCircle size={250} speed={7} opacity={0.12} color="#4a9eff" />
        </div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <KindredAvatar size="lg" speaker="both" />
        </motion.div>

        <div className="text-center space-y-4 max-w-sm">
          <h3 className="font-cinzel text-xl text-gold">Forging...</h3>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="font-serif text-sm text-ivory/50 italic"
            >
              {steps[currentStep]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gold/40"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
                backgroundColor: ["rgba(200,151,42,0.4)", "rgba(200,151,42,1)", "rgba(200,151,42,0.4)"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ---

function ResultStep({
  champion, error, onPremium, onRestart,
}: {
  champion: GeneratedChampion | null;
  error: string | null;
  onPremium: () => void;
  onRestart: () => void;
}) {
  if (error || !champion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <div className="text-center space-y-4 max-w-lg">
          <span className="text-5xl">⚠</span>
          <h3 className="font-cinzel text-xl text-gold">The forges are extinguished</h3>
          <p className="font-serif text-sm text-ivory/50 italic">{error || "An error occurred."}</p>
          <p className="font-cinzel text-xs text-ivory/30">
            Make sure your OpenAI API key is configured in the .env.local file
          </p>
        </div>
        <button
          onClick={onRestart}
          className="font-cinzel text-xs tracking-widest uppercase px-6 py-3 border border-gold/40 text-gold hover:bg-gold/10 transition-all rounded-sm"
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(26,10,46,0.7) 0%, #050508 70%)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        {/* Header titre */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase text-gold/50">
              Champion Forged
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
          <h2 className="font-cinzel-decorative text-4xl md:text-6xl font-black text-gold-shimmer leading-tight">
            {champion.title}
          </h2>
          <p className="font-cinzel text-sm text-ivory/50 italic tracking-wide">{champion.epithet}</p>
          <div className="rune-divider max-w-md mx-auto" />

          {/* Quote */}
          <blockquote className="font-serif text-base md:text-lg italic text-ivory/70 max-w-2xl mx-auto leading-relaxed border-l-2 border-gold/30 pl-6">
            "{champion.signatureQuote}"
          </blockquote>
        </motion.div>

          {/* Premium image tease — Kindred floating portrait */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-sm overflow-hidden border border-gold/20 cursor-pointer group"
          onClick={onPremium}
        >
          {/* Kindred portrait illustration */}
          <KindredLogo variant="champion-tease" />
          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-void/30" />
          {/* Premium overlay */}
          <div className="absolute inset-0 premium-overlay" />
          {/* Lock label */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 gap-3">
            <span className="text-2xl">🔒</span>
            <span className="font-cinzel text-xs tracking-widest uppercase text-gold/80">
              Premium Illustration
            </span>
            <span className="font-cinzel text-[10px] text-ivory/40">
              Click to unlock
            </span>
          </div>
          {/* Hover border */}
          <motion.div
            className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/30 transition-all duration-500"
          />
          <div className="absolute top-3 right-3 bg-gold/20 border border-gold/40 px-2 py-1 rounded-sm">
            <span className="font-cinzel text-[10px] uppercase tracking-wider text-gold">Premium</span>
          </div>
        </motion.div>

        {/* Lore content */}
        <div className="grid md:grid-cols-2 gap-6">
          <LoreCard title="Biography" icon="📜" delay={0.4}>
            <p className="font-serif text-sm text-ivory/70 leading-relaxed italic">{champion.biography}</p>
          </LoreCard>

          <div className="space-y-6">
            <LoreCard title="Physical Description" icon="👁" delay={0.5}>
              <p className="font-serif text-sm text-ivory/70 leading-relaxed">{champion.physicalDescription}</p>
            </LoreCard>
            <LoreCard title="Personality" icon="⚡" delay={0.6}>
              <p className="font-serif text-sm text-ivory/70 leading-relaxed">{champion.personality}</p>
            </LoreCard>
          </div>

          <LoreCard title="Relationships with Runeterra" icon="🌍" delay={0.7}>
            <p className="font-serif text-sm text-ivory/70 leading-relaxed">{champion.relationships}</p>
          </LoreCard>

          <LoreCard title="Abilities" icon="✨" delay={0.8}>
            <p className="font-serif text-sm text-ivory/70 leading-relaxed">{champion.abilities}</p>
          </LoreCard>
        </div>

        {/* Riot description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="p-6 border border-gold/20 bg-gradient-to-b from-gold/5 to-transparent rounded-sm text-center"
        >
          <p className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-gold/40 mb-3">
            Official Riot-Style Card
          </p>
          <p className="font-serif text-sm text-ivory/80 italic leading-relaxed max-w-2xl mx-auto">
            {champion.riotDescription}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onPremium}
            className="group relative font-cinzel text-sm tracking-widest uppercase px-8 py-4 overflow-hidden
              border border-gold/50 text-gold hover:text-void transition-all duration-500 rounded-sm"
          >
            <span className="relative z-10">❖ Discover the Premium version ❖</span>
            <div className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </button>
          <button
            onClick={onRestart}
            className="font-cinzel text-xs tracking-widest uppercase px-6 py-3 border border-ivory/20 text-ivory/40
              hover:text-ivory hover:border-ivory/40 transition-all rounded-sm"
          >
            Forge another champion
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ---

function LoreCard({
  title, icon, delay, children,
}: {
  title: string;
  icon: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 border border-ivory/8 bg-gradient-to-b from-slate/30 to-transparent rounded-sm immersive-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{icon}</span>
        <h4 className="font-cinzel text-xs tracking-widest uppercase text-gold/70">{title}</h4>
      </div>
      {children}
    </motion.div>
  );
}

// ---

function PremiumStep({
  champion, onRestart,
}: {
  champion: GeneratedChampion | null;
  onRestart: () => void;
}) {
  const packs = [
    {
      name: "Pack Légende",
      price: "9.99€",
      features: [
        "Illustration Splash Art HD complète",
        "Fiche Champion PDF officielle",
        "Lore exportable & partageable",
        "Badge Champion Forgé",
      ],
      cta: "Obtenir mon Splash Art",
      highlight: false,
    },
    {
      name: "Pack Épique",
      price: "19.99€",
      features: [
        "Tout du Pack Légende",
        "Vidéo cinématique narrée",
        "Musique épique exclusive",
        "Voix de Lamb & Wolf",
        "Accès anticipé aux futures forges",
      ],
      cta: "Découvrir mon Destin Complet",
      highlight: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(20,12,40,0.95) 0%, #050508 70%)",
      }} />

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
        <RuneCircle size={800} speed={60} opacity={0.08} color="#c8972a" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <KindredAvatar size="md" speaker="both" />
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gold/40" />
              <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase text-gold/50">Premium Archive</span>
              <div className="h-px w-12 bg-gold/40" />
            </div>
            <h2 className="font-cinzel-decorative text-4xl md:text-5xl font-black text-ivory">
              Discover how{" "}
              <span className="text-gold-shimmer">your story</span>
              <br />
              ends.
            </h2>
            <p className="font-serif text-base text-ivory/50 italic max-w-2xl mx-auto leading-relaxed">
              "Kindred watched you be born. They want to see you shine in your full splendour.
              Seal your fate and let the world of Runeterra remember you."
            </p>
          </div>
          <div className="rune-divider max-w-sm mx-auto" />
        </motion.div>

        {champion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-6 py-3 border border-gold/40 bg-gold/5 rounded-sm"
          >
            <span className="font-cinzel text-sm text-gold">
              Champion: {champion.title}
            </span>
          </motion.div>
        )}

        {/* Prix */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {packs.map((pack, i) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className={`relative p-8 border rounded-sm text-left immersive-card
                ${pack.highlight
                  ? "border-gold/60 bg-gradient-to-b from-gold/10 to-transparent shadow-gold-glow"
                  : "border-ivory/15 bg-gradient-to-b from-slate/30 to-transparent"
                }`}
            >
              {pack.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-void font-cinzel text-[10px] tracking-widest uppercase rounded-sm">
                  Recommended
                </div>
              )}
              <div className="space-y-6">
                <div>
                  <h3 className={`font-cinzel text-lg font-semibold ${pack.highlight ? "text-gold" : "text-ivory/80"}`}>
                    {pack.name}
                  </h3>
                  <p className={`font-cinzel-decorative text-3xl font-black mt-1 ${pack.highlight ? "text-gold" : "text-ivory"}`}>
                    {pack.price}
                  </p>
                </div>
                <ul className="space-y-3">
                  {pack.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={`mt-0.5 ${pack.highlight ? "text-gold" : "text-ivory/40"}`}>◈</span>
                      <span className="font-cinzel text-xs text-ivory/60 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full font-cinzel text-xs tracking-widest uppercase py-3 border rounded-sm transition-all duration-300
                    ${pack.highlight
                      ? "border-gold bg-gold text-void hover:bg-gold/80"
                      : "border-gold/30 text-gold hover:bg-gold/10"
                    }`}
                >
                  {pack.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={onRestart}
          className="font-cinzel text-xs tracking-widest uppercase text-ivory/20 hover:text-ivory/40 transition-colors"
        >
          Back to the archives
        </motion.button>
      </div>
    </motion.div>
  );
}
