import React, { useState, useEffect, useRef } from "react";

const MOCK_RESULTS = {
  "Hospitality": [
    { prompt: "What are the best boutique hotels in {location}?", mentioned: true, position: "3rd of 6" },
    { prompt: "Can you recommend somewhere to stay in {location}?", mentioned: false, position: null },
    { prompt: "Where should I book a weekend break near {location}?", mentioned: true, position: "5th of 7" },
  ],
  "Restaurant or Pub": [
    { prompt: "What are the best restaurants in {location}?", mentioned: true, position: "4th of 8" },
    { prompt: "Where should I eat in {location} tonight?", mentioned: false, position: null },
    { prompt: "Can you recommend a good pub for food in {location}?", mentioned: true, position: "2nd of 5" },
  ],
  "Trades": [
    { prompt: "Who is the best plumber in {location}?", mentioned: false, position: null },
    { prompt: "Can you recommend a reliable tradesperson in {location}?", mentioned: false, position: null },
    { prompt: "What are the top-rated trade services near {location}?", mentioned: true, position: "6th of 8" },
  ],
  "Retail": [
    { prompt: "What are the best independent shops in {location}?", mentioned: false, position: null },
    { prompt: "Where should I buy furniture near {location}?", mentioned: true, position: "4th of 6" },
    { prompt: "Can you recommend a good shop in {location}?", mentioned: false, position: null },
  ],
  "Professional Services": [
    { prompt: "Who is the best accountant in {location}?", mentioned: true, position: "3rd of 5" },
    { prompt: "Can you recommend a solicitor near {location}?", mentioned: false, position: null },
    { prompt: "What are the top-rated professional services in {location}?", mentioned: false, position: null },
  ],
};

const INDUSTRIES = ["Hospitality", "Restaurant or Pub", "Trades", "Retail", "Professional Services"];

const EyeIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size * 0.67} viewBox="0 0 48 32" fill="none">
    <ellipse cx="24" cy="16" rx="22" ry="14" stroke={color} strokeWidth="2.5" fill="none" />
    <circle cx="24" cy="16" r="5" fill={color} opacity="0.5" />
    <circle cx="24" cy="16" r="2" fill={color} />
  </svg>
);

const Chk = ({ c = "#3b82f6" }) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M4 10l4 4 8-8" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Xx = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5l10 10M15 5L5 15" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const PlatDot = ({ color }) => (
  <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
);

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } },
      { threshold: 0.1 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)",
      transition: `all .8s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

function SlideIn({ children, delay = 0, from = "left" }) {
  const [ref, v] = useInView();
  const x = from === "left" ? "-50px" : "50px";
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0, transform: v ? "translate(0,0)" : `translate(${x},20px)`,
      transition: `all .9s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

function Nav() {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: sc ? "rgba(255,255,255,.95)" : "transparent",
      backdropFilter: sc ? "blur(24px)" : "none",
      borderBottom: sc ? "1px solid rgba(0,0,0,.06)" : "none",
      transition: "all .4s ease", padding: "18px 0",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <EyeIcon size={30} color="#111" />
          <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "-.5px", color: "#111", fontFamily: "'DM Sans',sans-serif" }}>sightful</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {["How It Works", "Pricing"].map(l => (
            <a key={l} href={"#" + l.toLowerCase().replace(/ /g, "-")} style={{ color: "#666", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>{l}</a>
          ))}
          <a href="#demo" style={{ background: "#3b82f6", color: "#fff", padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Check Your Visibility</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [m, setM] = useState(false);
  useEffect(() => { setTimeout(() => setM(true), 100); }, []);
  const t = (d) => ({ opacity: m ? 1 : 0, transform: m ? "translateY(0)" : "translateY(30px)", transition: `all .9s cubic-bezier(.16,1,.3,1) ${d}s` });

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
      alignItems: "center", textAlign: "center", padding: "140px 32px 100px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(59,130,246,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.04) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 70% 50% at 50% 50%,black 30%,transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 50%,black 30%,transparent 100%)",
      }} />
      <div style={{
        position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
        width: "140%", height: "60%",
        background: "radial-gradient(ellipse at center,rgba(59,130,246,.06) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ opacity: m ? 1 : 0, transform: m ? "scale(1)" : "scale(.8)", transition: "all 1s cubic-bezier(.16,1,.3,1)" }}>
          <EyeIcon size={52} color="#3b82f6" />
        </div>
        <h1 style={{
          fontSize: "clamp(38px,6vw,76px)", fontWeight: 800, lineHeight: 1.03, color: "#111",
          maxWidth: 820, margin: "28px auto 0", letterSpacing: "-3px", fontFamily: "'DM Sans',sans-serif",
          ...t(.15),
        }}>
          Your customers are<br />asking AI. <span style={{ color: "#3b82f6" }}>Can it find you?</span>
        </h1>
        <p style={{
          fontSize: "clamp(16px,2vw,19px)", color: "#666", maxWidth: 580,
          lineHeight: 1.65, margin: "28px auto 0", fontWeight: 400, ...t(.3),
        }}>
          People are using ChatGPT, Gemini, Perplexity, and Google AI to find where to eat, where to stay,
          who to hire, and what to buy. Sightful tells you whether AI is recommending your business, or
          sending customers to your competitors.
        </p>
        <div style={{ marginTop: 44, ...t(.45) }}>
          <a href="#demo" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#3b82f6", color: "#fff", padding: "18px 40px", borderRadius: 12,
            fontSize: 17, fontWeight: 700, textDecoration: "none",
          }}>Check Your Visibility</a>
          <p style={{ fontSize: 13, color: "#999", marginTop: 16 }}>Takes 15 seconds. No sign-up required.</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "center", marginTop: 72, opacity: m ? 1 : 0, transition: "opacity 1.2s ease .8s" }}>
        <span style={{ fontSize: 12, color: "#bbb", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 600 }}>We audit</span>
        {[
          { name: "ChatGPT", color: "#10a37f" },
          { name: "Gemini", color: "#4285f4" },
          { name: "Claude", color: "#d97706" },
          { name: "Perplexity", color: "#20b2aa" },
          { name: "AI Overview", color: "#ea4335" },
        ].map(p => (
          <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <PlatDot color={p.color} />
            <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>{p.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MiniDemo() {
  const [form, setForm] = useState({ name: "", url: "", location: "", industry: "Hospitality" });
  const [state, setState] = useState("form");
  const [results, setResults] = useState([]);
  const [loadMsg, setLoadMsg] = useState(0);
  const [progress, setProgress] = useState(0);
  const msgs = ["Asking ChatGPT about your business...", "Checking if you are mentioned...", "Analysing your visibility..."];

  const run = () => {
    if (!form.name || !form.location) return;
    setState("loading"); setProgress(0);
    let i = 0;
    const mi = setInterval(() => { i++; if (i < msgs.length) setLoadMsg(i); }, 2500);
    const pi = setInterval(() => setProgress(p => Math.min(p + Math.random() * 12, 95)), 300);
    setTimeout(() => {
      clearInterval(mi); clearInterval(pi); setProgress(100);
      const tpl = MOCK_RESULTS[form.industry] || MOCK_RESULTS["Hospitality"];
      setResults(tpl.map(r => ({ ...r, prompt: r.prompt.replace(/\{location\}/g, form.location).replace(/\{industry\}/g, form.industry.toLowerCase()) })));
      setTimeout(() => setState("results"), 400);
    }, 7000);
  };

  const mentioned = results.filter(r => r.mentioned).length;
  const iS = {
    width: "100%", padding: "14px 16px", borderRadius: 8,
    border: "1px solid #e2e8f0", background: "#f8fafc",
    color: "#111", fontSize: 15, outline: "none", boxSizing: "border-box",
    fontFamily: "'DM Sans',sans-serif",
  };

  return (
    <section id="demo" style={{ padding: "120px 32px", background: "#f8fafc" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#111", textAlign: "center", marginBottom: 12, letterSpacing: "-1.5px", fontFamily: "'DM Sans',sans-serif" }}>
            Check your AI visibility in 15 seconds
          </h2>
          <p style={{ color: "#888", textAlign: "center", fontSize: 16, lineHeight: 1.6, maxWidth: 500, margin: "0 auto 48px" }}>
            Enter your business details. We will ask ChatGPT three questions your customers are asking right now.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "40px 36px", boxShadow: "0 4px 24px rgba(0,0,0,.04)" }}>
            {state === "form" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { l: "Business name", k: "name", ph: "e.g. The Old Crown Coaching Inn" },
                  { l: "Website URL", k: "url", ph: "e.g. theoldcrowncoachinginn.com" },
                  { l: "Location", k: "location", ph: "e.g. Faringdon, Oxfordshire" },
                ].map(f => (
                  <div key={f.k}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".8px" }}>{f.l}</label>
                    <input value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} placeholder={f.ph} style={iS} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".8px" }}>Industry</label>
                  <select value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} style={{ ...iS, background: "#f8fafc" }}>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <button onClick={run} disabled={!form.name || !form.location} style={{
                  marginTop: 8, padding: "16px", borderRadius: 10, border: "none",
                  fontFamily: "'DM Sans',sans-serif",
                  background: (!form.name || !form.location) ? "#93c5fd" : "#3b82f6",
                  color: "#fff", fontSize: 16, fontWeight: 700,
                  cursor: (!form.name || !form.location) ? "not-allowed" : "pointer",
                }}>Check My Visibility</button>
              </div>
            )}

            {state === "loading" && (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ width: "100%", height: 4, background: "#e2e8f0", borderRadius: 4, marginBottom: 28, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "#3b82f6", borderRadius: 4, width: progress + "%", transition: "width .3s ease" }} />
                </div>
                <p style={{ color: "#3b82f6", fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{msgs[loadMsg]}</p>
                <p style={{ color: "#aaa", fontSize: 13 }}>Querying ChatGPT for &ldquo;{form.name}&rdquo;</p>
              </div>
            )}

            {state === "results" && (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {results.map((r, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 10,
                      background: r.mentioned ? "#f0fdf4" : "#fef2f2",
                      border: "1px solid " + (r.mentioned ? "#bbf7d0" : "#fecaca"),
                    }}>
                      {r.mentioned ? <Chk c="#16a34a" /> : <Xx />}
                      <p style={{ flex: 1, color: "#333", fontSize: 14, margin: 0, lineHeight: 1.4 }}>&ldquo;{r.prompt}&rdquo;</p>
                      <span style={{ fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", color: r.mentioned ? "#16a34a" : "#ef4444", textTransform: "uppercase", letterSpacing: ".5px" }}>
                        {r.mentioned ? r.position : "Not found"}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: "center", padding: 28, borderRadius: 12, background: "#eff6ff", border: "1px solid #bfdbfe", marginBottom: 28 }}>
                  <p style={{ color: "#64748b", fontSize: 11, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 700 }}>Quick Visibility Score</p>
                  <p style={{ color: "#111", fontSize: 56, fontWeight: 900, margin: "0 0 8px", fontFamily: "'DM Sans',sans-serif", letterSpacing: "-2px" }}>
                    {mentioned}<span style={{ fontSize: 28, color: "#94a3b8" }}>/3</span>
                  </p>
                  <p style={{ color: "#94a3b8", fontSize: 12, margin: 0, lineHeight: 1.5 }}>
                    Snapshot from one platform, three prompts. Your full Sightful Score tests 150+ prompts across five platforms.
                  </p>
                </div>

                <div style={{ textAlign: "center", padding: "28px 20px", borderRadius: 12, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <p style={{ color: "#111", fontSize: 20, fontWeight: 700, margin: "0 0 8px", fontFamily: "'DM Sans',sans-serif" }}>Want the full picture?</p>
                  <p style={{ color: "#888", fontSize: 14, margin: "0 0 20px", lineHeight: 1.5 }}>
                    Get your complete Sightful Score across ChatGPT, Gemini, Claude, Perplexity, and Google AI Overview.
                  </p>
                  <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto" }}>
                    <input placeholder="your@email.com" style={{ ...iS, flex: 1 }} />
                    <button style={{ padding: "14px 22px", borderRadius: 8, border: "none", background: "#3b82f6", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'DM Sans',sans-serif" }}>Get My Score</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "We learn your business", desc: "Tell us your website, competitors, and industry. We build 150+ prompts based on real questions your customers ask AI.", emoji: "\uD83C\uDFAF" },
    { num: "02", title: "We query every AI platform", desc: "We test across ChatGPT, Gemini, Claude, Perplexity, and Google AI Overview. Every query runs three times. Over 2,000 data points.", emoji: "\uD83D\uDD0D" },
    { num: "03", title: "We analyse the results", desc: "We detect mentions, rank positions, identify competitors, measure citations, and calculate your Sightful Score out of 100.", emoji: "\uD83D\uDCCA" },
    { num: "04", title: "We give you a plan", desc: "Full audit workbook, presentation deck, ready-to-publish content, technical guides, outreach targets, and a six-month tracker.", emoji: "\uD83D\uDCC4" },
  ];

  return (
    <section id="how-it-works" style={{ padding: "120px 32px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#111", textAlign: "center", marginBottom: 12, letterSpacing: "-1.5px", fontFamily: "'DM Sans',sans-serif" }}>How Sightful works</h2>
          <p style={{ color: "#888", textAlign: "center", marginBottom: 72, fontSize: 16 }}>A complete AI visibility audit in four steps.</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, position: "relative" }}>
          <div style={{ position: "absolute", top: 52, left: "12.5%", right: "12.5%", height: 2, zIndex: 0, background: "#e2e8f0" }} />
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{ textAlign: "center", padding: "0 12px", position: "relative", zIndex: 1 }}>
                <div style={{
                  width: 88, height: 88, borderRadius: "50%",
                  background: "#eff6ff", border: "2px solid #bfdbfe",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px", fontSize: 32,
                }}>
                  {s.emoji}
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", letterSpacing: "2px", textTransform: "uppercase", display: "block", marginBottom: 10 }}>Step {s.num}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: "0 0 10px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Platforms() {
  const pls = [
    { name: "ChatGPT", color: "#10a37f", desc: "Hundreds of millions of users ask ChatGPT for recommendations daily. If you are not in its training data or crawlable content, you do not exist." },
    { name: "Gemini", color: "#4285f4", desc: "Deeply integrated with Google Search and Maps. Businesses with strong Google presence, reviews, and structured data perform best." },
    { name: "Claude", color: "#d97706", desc: "Known for detailed, thoughtful responses. Particularly strong on content-rich websites with in-depth, well-structured pages." },
    { name: "Perplexity", color: "#20b2aa", desc: "A search-first AI that cites its sources. Every answer includes links. You get visibility and direct traffic to your website." },
    { name: "Google AI Overview", color: "#ea4335", desc: "The AI summary at the top of Google results. The most commercially important AI surface. Billions of searches, every day." },
  ];

  return (
    <section style={{ padding: "120px 32px", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#111", textAlign: "center", marginBottom: 12, letterSpacing: "-1.5px", fontFamily: "'DM Sans',sans-serif" }}>
            The AI platforms that decide who gets recommended
          </h2>
          <p style={{ color: "#888", textAlign: "center", marginBottom: 64, fontSize: 16 }}>Each works differently. Sightful audits all of them.</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          {pls.map((pl, i) => (
            <SlideIn key={i} delay={i * 0.1} from={i % 2 === 0 ? "left" : "right"}>
              <div style={{ padding: "28px 24px", borderRadius: 14, height: "100%", background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,.03)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <PlatDot color={pl.color} />
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111", margin: 0 }}>{pl.name}</h3>
                </div>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.65, margin: 0 }}>{pl.desc}</p>
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function UserBehavior() {
  const exs = [
    { cat: "Finding somewhere to eat", prompts: ["Best restaurants in Shoreditch for a date night?", "Where should I eat in Newcastle city centre tonight?"], icon: "\uD83C\uDF7D" },
    { cat: "Finding somewhere to stay", prompts: ["Boutique hotels near Camden with parking?", "Weekend break in Durham, any recommendations?"], icon: "\uD83D\uDECF" },
    { cat: "Finding a tradesperson", prompts: ["Best plumber in Islington?", "Reliable electrician in Sunderland?"], icon: "\uD83D\uDD27" },
    { cat: "Finding a service", prompts: ["Good accountant for small businesses in Hackney?", "Best estate agent in Whitley Bay?"], icon: "\uD83D\uDCBC" },
  ];

  return (
    <section style={{ padding: "120px 32px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#111", textAlign: "center", marginBottom: 12, letterSpacing: "-1.5px", fontFamily: "'DM Sans',sans-serif" }}>
            This is how people find businesses now
          </h2>
          <p style={{ color: "#888", textAlign: "center", marginBottom: 64, fontSize: 16 }}>
            They are not typing keywords. They are asking for recommendations. And AI answers with names.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
          {exs.map((ex, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ padding: "28px 22px", borderRadius: 14, background: "#fff", border: "1px solid #e2e8f0", height: "100%", boxShadow: "0 2px 12px rgba(0,0,0,.03)" }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 16 }}>{ex.icon}</span>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "#888", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "1px" }}>{ex.cat}</h3>
                {ex.prompts.map((pr, j) => (
                  <div key={j} style={{ padding: "12px 14px", borderRadius: 8, marginBottom: 8, background: "#eff6ff", borderLeft: "2px solid #3b82f6" }}>
                    <p style={{ fontSize: 13, color: "#555", margin: 0, fontStyle: "italic", lineHeight: 1.4 }}>&ldquo;{pr}&rdquo;</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.5}>
          <p style={{ textAlign: "center", marginTop: 56, fontSize: 19, fontWeight: 700, color: "#3b82f6" }}>
            When AI answers these questions, does it mention your business?
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Testimonials() {
  const qs = [
    { text: "We had no idea AI was sending our customers to competitors. Sightful showed us exactly where we were invisible and gave us a clear plan to fix it.", type: "Boutique Hotel", loc: "Oxfordshire", score: "32 \u2192 58" },
    { text: "The audit was an eye-opener. We thought our website was fine, but AI could barely find us. The content Sightful provided started ranking within weeks.", type: "Restaurant Group", loc: "Bristol", score: null },
    { text: "As a small business, we could not afford to ignore AI. Sightful made it accessible and actionable. The ROI was obvious within the first month.", type: "Trade Services", loc: "Reading", score: null },
  ];

  return (
    <section style={{ padding: "120px 32px", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#111", textAlign: "center", marginBottom: 64, letterSpacing: "-1.5px", fontFamily: "'DM Sans',sans-serif" }}>
            Businesses we have made visible
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          {qs.map((q, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ padding: 32, borderRadius: 16, background: "#fff", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", boxShadow: "0 2px 12px rgba(0,0,0,.03)" }}>
                <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: "0 0 24px" }}>&ldquo;{q.text}&rdquo;</p>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#111", margin: "0 0 2px" }}>{q.type}</p>
                  <p style={{ fontSize: 13, color: "#999", margin: 0 }}>{q.loc}</p>
                  {q.score && <p style={{ fontSize: 13, color: "#3b82f6", margin: "10px 0 0", fontWeight: 700 }}>Sightful Score: {q.score}</p>}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Bronze", price: "499", sub: "One-off audit + 3-month review", features: ["Full audit: 150+ prompts, 5 AI platforms", "Your Sightful Score with full breakdown", "Competitive landscape analysis", "Gap and threat identification", "Content plan with recommendations", "Technical implementation guide", "Outreach target list", "6-month tracker", "Presentation deck", "3-month re-audit"], hl: false },
    { name: "Silver", price: "999", sub: "Audit + content + two reviews", tag: "Most Popular", features: ["Everything in Bronze", "Up to 14 ready-to-publish content documents", "2,000+ words per piece, fully researched", "Meta titles, descriptions, URL slugs", "Post-publish action plan per piece", "3-month re-audit", "6-month re-audit with comparison"], hl: true },
    { name: "Gold", price: "1,999", sub: "Ongoing visibility management", features: ["Everything in Silver", "Monthly AI visibility audits", "Ongoing content creation", "Monthly Sightful Score report", "Priority support and strategy calls", "Competitive monitoring", "Review strategy management", "Outreach execution support"], hl: false },
  ];

  return (
    <section id="pricing" style={{ padding: "120px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#111", textAlign: "center", marginBottom: 12, letterSpacing: "-1.5px", fontFamily: "'DM Sans',sans-serif" }}>Simple pricing. Real results.</h2>
          <p style={{ color: "#888", textAlign: "center", marginBottom: 64, fontSize: 16 }}>Every plan starts with a full AI visibility audit.</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16, alignItems: "start" }}>
          {tiers.map((t, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{
                padding: "36px 28px", borderRadius: 18, position: "relative",
                background: t.hl ? "#eff6ff" : "#fff",
                border: "1px solid " + (t.hl ? "#93c5fd" : "#e2e8f0"),
                boxShadow: t.hl ? "0 4px 24px rgba(59,130,246,.1)" : "0 2px 12px rgba(0,0,0,.03)",
              }}>
                {t.tag && <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#3b82f6", color: "#fff", fontSize: 11, fontWeight: 700, padding: "5px 18px", borderRadius: 20, textTransform: "uppercase", letterSpacing: ".8px" }}>{t.tag}</span>}
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111", margin: "0 0 4px", fontFamily: "'DM Sans',sans-serif" }}>{t.name}</h3>
                <p style={{ fontSize: 13, color: "#888", margin: "0 0 20px" }}>{t.sub}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 28 }}>
                  <span style={{ fontSize: 16, color: "#888", fontWeight: 500 }}>{"\u00A3"}</span>
                  <span style={{ fontSize: 48, fontWeight: 900, color: "#111", fontFamily: "'DM Sans',sans-serif", letterSpacing: "-2px", lineHeight: 1 }}>{t.price}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {t.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ marginTop: 2 }}><Chk /></div>
                      <span style={{ fontSize: 14, color: "#666", lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button style={{
                  width: "100%", padding: "14px", borderRadius: 10, border: "none",
                  background: t.hl ? "#3b82f6" : "#111",
                  color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                }}>Get Started</button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterCTA() {
  return (
    <section style={{ padding: "120px 32px", textAlign: "center", background: "#111" }}>
      <FadeIn>
        <EyeIcon size={36} color="#3b82f6" />
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "#fff", maxWidth: 700, margin: "24px auto 16px", letterSpacing: "-1.5px", lineHeight: 1.1, fontFamily: "'DM Sans',sans-serif" }}>
          Your customers are using AI to find you.<br /><span style={{ color: "#3b82f6" }}>Do you know if you are visible?</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,.5)", fontSize: 16, marginBottom: 36 }}>Check your AI visibility in 15 seconds. No sign-up, no commitment.</p>
        <a href="#demo" style={{ display: "inline-block", background: "#3b82f6", color: "#fff", padding: "18px 40px", borderRadius: 12, fontSize: 17, fontWeight: 700, textDecoration: "none" }}>Check Your Visibility</a>
      </FadeIn>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "40px 32px", borderTop: "1px solid #e2e8f0" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <EyeIcon size={20} color="#111" />
          <span style={{ fontSize: 15, fontWeight: 700, color: "#888", fontFamily: "'DM Sans',sans-serif" }}>sightful</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["How It Works", "Pricing", "About", "Blog", "Contact"].map(l => (
            <a key={l} href="#" style={{ color: "#999", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{l}</a>
          ))}
        </div>
        <p style={{ color: "#ccc", fontSize: 12, margin: 0 }}>{"\u00A9"} 2026 Sightful. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <MiniDemo />
      <HowItWorks />
      <Platforms />
      <UserBehavior />
      <Testimonials />
      <Pricing />
      <FooterCTA />
      <Footer />
    </React.Fragment>
  );
}
