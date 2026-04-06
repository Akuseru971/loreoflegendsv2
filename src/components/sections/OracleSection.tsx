"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ORACLE_SUGGESTIONS } from "@/lib/constants";
import { OracleMessage } from "@/types";
import RuneCircle from "@/components/animations/RuneCircle";
import Typewriter from "@/components/animations/Typewriter";
import KindredLogo from "@/components/ui/KindredLogo";

export default function OracleSection() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<OracleMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [activated, setActivated] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleActivate = () => {
    setActivated(true);
    setTimeout(() => inputRef.current?.focus(), 500);
  };

  const handleAsk = async (q?: string) => {
    const askText = q || question.trim();
    if (!askText || loading) return;

    const userMsg: OracleMessage = {
      role: "user",
      content: askText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: askText,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      const oracleMsg: OracleMessage = {
        role: "oracle",
        content: data.answer || "The Oracle did not respond...",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, oracleMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "oracle",
          content: "The archives are temporarily inaccessible. The darkness deepens...",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <section id="oracle" className="relative py-32 px-6 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(10,8,20,0.9) 0%, #050508 100%)",
          }}
        />
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(200,151,42,0.03)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(74,158,255,0.04)" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="font-cinzel text-[11px] tracking-[0.5em] uppercase text-gold/50">
              Section I
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
          <h2 className="font-cinzel-decorative text-3xl md:text-5xl font-bold text-ivory">
            Oracle of{" "}
            <span className="text-gold-shimmer">Runeterra's Lore</span>
          </h2>
          <p className="font-cinzel text-sm text-ivory/40 tracking-wide max-w-xl mx-auto leading-relaxed">
            An omniscient entity slumbered within these archives.
            <br />
            It knows every secret of Runeterra.
            <br />
            Ask your question.
          </p>
          <div className="rune-divider max-w-sm mx-auto" />
        </motion.div>

        {/* Oracle interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {!activated ? (
            /* Activation portal */
            <div className="flex flex-col items-center gap-8 py-16">
              <div className="relative w-48 h-48">
                <RuneCircle size={192} speed={30} opacity={0.2} color="#c8972a" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <RuneCircle size={120} speed={18} opacity={0.25} color="#4a9eff" />
                  <motion.button
                    onClick={handleActivate}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute inset-0 m-auto w-24 h-24 rounded-full border border-gold/30 bg-void/80 flex items-center justify-center group cursor-pointer"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(200,151,42,0.2)",
                        "0 0 40px rgba(200,151,42,0.4)",
                        "0 0 20px rgba(200,151,42,0.2)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <KindredLogo variant="oracle-seal" animate />
                  </motion.button>
                </div>
              </div>
              <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold/40 animate-pulse">
                Touch the seal to awaken the Oracle
              </p>
            </div>
          ) : (
            /* Active oracle interface */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Suggestion chips */}
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <p className="font-cinzel text-xs text-ivory/30 tracking-wide uppercase">
                      Suggestions
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
                      {ORACLE_SUGGESTIONS.map((suggestion, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          onClick={() => handleAsk(suggestion)}
                          className="px-3 py-1.5 text-xs font-cinzel text-gold/60 border border-gold/20 rounded-sm hover:border-gold/50 hover:text-gold hover:bg-gold/5 transition-all duration-300 cursor-pointer"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Messages */}
                {messages.length > 0 && (
                  <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                    <AnimatePresence initial={false}>
                      {messages.map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                          {/* Avatar */}
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center
                            ${msg.role === "oracle"
                              ? "border-gold/40 bg-gold/5"
                              : "border-ivory/20 bg-ivory/5"
                            }`}
                          >
                            <span className={`text-sm ${msg.role === "oracle" ? "text-gold" : "text-ivory/60"}`}>
                              {msg.role === "oracle" ? "◈" : "✦"}
                            </span>
                          </div>

                          {/* Content */}
                          <div
                            className={`max-w-[80%] px-5 py-4 rounded-sm border
                              ${msg.role === "oracle"
                                ? "bg-gradient-to-br from-void to-obsidian border-gold/15 shadow-gold-glow"
                                : "bg-slate/50 border-ivory/10 ml-auto"
                              }`}
                          >
                            {msg.role === "oracle" && i === messages.length - 1 && !loading ? (
                              <Typewriter
                                text={msg.content}
                                speed={12}
                                className="font-serif text-sm text-ivory/80 leading-relaxed"
                              />
                            ) : (
                              <p className={`text-sm leading-relaxed
                                ${msg.role === "oracle"
                                  ? "font-serif text-ivory/80 italic"
                                  : "font-sans text-ivory/60"
                                }`}
                              >
                                {msg.content}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Loading animation */}
                    {loading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-full border border-gold/40 bg-gold/5 flex items-center justify-center">
                          <motion.span
                            className="text-gold text-sm"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            ◈
                          </motion.span>
                        </div>
                        <div className="flex items-center gap-1 px-5 py-4 bg-void border border-gold/15 rounded-sm">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-gold/60"
                              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}

                {/* Input area */}
                <div
                  className="relative border border-gold/20 bg-void/80 rounded-sm overflow-hidden
                    focus-within:border-gold/50 transition-colors duration-300
                    shadow-inner"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  <textarea
                    ref={inputRef}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask your question to the Oracle of Runeterra..."
                    rows={3}
                    maxLength={500}
                    className="w-full bg-transparent px-6 py-4 font-cinzel text-sm text-ivory/70 placeholder-ivory/20 resize-none outline-none leading-relaxed"
                  />
                  <div className="flex items-center justify-between px-6 py-3 border-t border-gold/10">
                    <span className="font-cinzel text-xs text-ivory/20">
                      {question.length}/500
                    </span>
                    <motion.button
                      onClick={() => handleAsk()}
                      disabled={!question.trim() || loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="font-cinzel text-xs tracking-widest uppercase px-6 py-2 bg-gold/10 border border-gold/40 text-gold
                        hover:bg-gold/20 hover:border-gold disabled:opacity-30 disabled:cursor-not-allowed
                        transition-all duration-300 rounded-sm"
                    >
                      {loading ? "Consulting..." : "Ask the Oracle"}
                    </motion.button>
                  </div>
                </div>

                {/* Clear */}
                {messages.length > 0 && (
                  <div className="text-center">
                    <button
                      onClick={() => setMessages([])}
                      className="font-cinzel text-[10px] tracking-widest uppercase text-ivory/20 hover:text-ivory/40 transition-colors"
                    >
                      Erase the archives
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}
