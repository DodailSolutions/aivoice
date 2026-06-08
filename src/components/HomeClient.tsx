"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const TESTIMONIALS = [
  {
    quote: "The busy hours used to be the leakiest. Answering phones meant slower line production. With AI Voice HQ, our POS prints pickup orders automatically. We saved $2,100 in our first month alone.",
    author: "Marcus Cheng",
    role: "Owner",
    restaurant: "Golden Dragon Grill",
    emoji: "🐉"
  },
  {
    quote: "Setting up a voice assistant on a 150-item pizza menu with custom modifiers felt impossible. The AI Voice team customized our rules in 48 hours. Orders flow cleanly without any staff intervention.",
    author: "Luigi Esposito",
    role: "Founder",
    restaurant: "Esposito's Pizzeria",
    emoji: "🍕"
  },
  {
    quote: "We miss zero reservation queries now. Our customers get instant text confirmation links, and their table requests sync cleanly. A total game-changer for FOH sanity.",
    author: "Sarah Jenkins",
    role: "Manager",
    restaurant: "The Bistro Vienna",
    emoji: "🍷"
  },
  {
    quote: "We used to lose 10-15 calls every Friday night because staff were too busy. AI Voice HQ took those orders, up-sold drinks on 22% of them, and sent them right to Toast. Our weekend sales are up 15%.",
    author: "Elena Rostova",
    role: "Co-owner",
    restaurant: "Toscana Trattoria",
    emoji: "🍝"
  },
  {
    quote: "Our catering line is usually complicated, but the AI handles standard buffet drop-offs perfectly. If someone wants a custom package, it forwards them to our events manager. It's the best of both worlds.",
    author: "Rajesh Patel",
    role: "General Manager",
    restaurant: "Taj Mahal Banquets",
    emoji: "🍛"
  }
];

export default function HomeClient({ initialContent }: { initialContent: any }) {
  const content = initialContent;
  
  // --- ROI Calculator State ---
  const [calls, setCalls] = useState(initialContent?.home?.roiCalculator?.defaultCalls || 1500);
  const [ticket, setTicket] = useState(initialContent?.home?.roiCalculator?.defaultTicket || 35);
  const [roiBouncing, setRoiBouncing] = useState(false);

  useEffect(() => {
    if (initialContent?.home?.roiCalculator) {
      setCalls(initialContent.home.roiCalculator.defaultCalls || 1500);
      setTicket(initialContent.home.roiCalculator.defaultTicket || 35);
    }
  }, [initialContent]);

  // Calculations
  const missedCalls = Math.round(calls * 0.43);
  const recoveredOrders = Math.round(missedCalls * 0.85);
  const monthlyRevenue = recoveredOrders * ticket;
  const annualRevenue = monthlyRevenue * 12;
  const roiRatio = (annualRevenue / 3600).toFixed(1);

  // Trigger scale bounce on calculations update
  useEffect(() => {
    setRoiBouncing(true);
    const t = setTimeout(() => setRoiBouncing(false), 150);
    return () => clearTimeout(t);
  }, [annualRevenue]);

  // --- Live Console Simulator State ---
  const [dialogue, setDialogue] = useState<Array<{ sender: "caller" | "ai"; text: string }>>([]);
  const [consoleStatus, setConsoleStatus] = useState("Incoming Call");
  const [ticketDispatched, setTicketDispatched] = useState(false);

  const dialogueScript = [
    { sender: "caller" as const, text: "Hey! Do you guys still have the Paneer Special tonight, and can I get it less spicy?" },
    { sender: "ai" as const, text: "Yes! The Paneer Special is available. I can set the spice level to mild. It comes with a side of basmati rice. Would you like to add garlic naan too?" },
    { sender: "caller" as const, text: "Yeah, garlic naan sounds perfect. Make it a pickup order for 7:15 PM under Alex." },
    { sender: "ai" as const, text: "Got it. One Paneer Special (Mild) and one Garlic Naan. Your pickup is scheduled for 7:15 PM under the name Alex. The total is $18.50. I am sending the order straight to the kitchen console now!" }
  ];

  useEffect(() => {
    let currentIdx = 0;
    let timer: NodeJS.Timeout;

    const runScript = () => {
      if (currentIdx < dialogueScript.length) {
        const entry = dialogueScript[currentIdx];
        setConsoleStatus("In Call");
        setDialogue((prev) => [...prev, entry]);
        currentIdx++;

        const delay = entry.text.length * 35 + 1000;
        timer = setTimeout(runScript, delay);
      } else {
        timer = setTimeout(() => {
          setTicketDispatched(true);
          setConsoleStatus("Order Sent");

          // Reset loop after 8 seconds
          timer = setTimeout(() => {
            setDialogue([]);
            setTicketDispatched(false);
            setConsoleStatus("Incoming Call");
            currentIdx = 0;
            // Delay restart
            timer = setTimeout(runScript, 2000);
          }, 8000);
        }, 1200);
      }
    };

    const startTimer = setTimeout(runScript, 1500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, []);

  // --- Testimonials Carousel State ---
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!autoplay) {
      setProgress(0);
      return;
    }
    
    // Increment progress bar every 30ms (total 6000ms duration)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActiveTestimonial((current) => (current + 1) % TESTIMONIALS.length);
          return 0;
        }
        return p + (30 / 6000) * 100;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [autoplay, activeTestimonial]);

  const handlePrev = () => {
    setProgress(0);
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setProgress(0);
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <div className="relative overflow-hidden pt-24 pb-16">
      {/* Background glowing rings - Asynchronous Parallax */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/8 rounded-full blur-[120px] pointer-events-none -z-10 animate-float-blob" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange/4 rounded-full blur-[100px] pointer-events-none -z-10 animate-float-blob-reverse" style={{ animationDelay: "-5s" }} />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 animate-slideUp">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange/10 border border-orange-border text-xs font-semibold text-orange uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange"></span>
              </span>
              Built for high-volume restaurant calls
            </div>
            
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-text-main leading-[1.05] tracking-tight">
              {content?.home?.hero?.title || (
                <>
                  NEVER MISS A <span className="text-orange text-glow">RESTAURANT ORDER</span> AGAIN
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-text-muted max-w-2xl leading-relaxed">
              {content?.home?.hero?.subtitle || "AI Voice HQ answers every phone call, takes orders through natural conversations, handles complex menu modifiers, and syncs clean tickets straight into your Toast, Clover, or Square POS."}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                href="https://cal.com/vgaligutta/15min"
                target="_blank"
                suppressHydrationWarning
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 btn-shine bg-orange text-charcoal font-bold text-base rounded-full shadow-glow hover:bg-orange/95 hover:-translate-y-0.5 transition-all"
              >
                {content?.home?.hero?.ctaDemoText || "Book a 15-Min Demo"}
              </Link>
              <Link
                href="/product"
                suppressHydrationWarning
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-charcoal-2 border border-border-subtle hover:border-text-muted font-bold text-base rounded-full transition-all text-text-main"
              >
                {content?.home?.hero?.ctaExploreText || "Explore Product"}
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-border-subtle/50">
              <div className="space-y-1">
                <div className="text-orange font-heading font-bold text-2xl">100%</div>
                <div className="text-xs text-text-muted uppercase tracking-wider font-semibold">Calls Answered</div>
              </div>
              <div className="space-y-1">
                <div className="text-orange font-heading font-bold text-2xl">20+</div>
                <div className="text-xs text-text-muted uppercase tracking-wider font-semibold">Concurrent Lines</div>
              </div>
              <div className="space-y-1">
                <div className="text-orange font-heading font-bold text-2xl">48 Hrs</div>
                <div className="text-xs text-text-muted uppercase tracking-wider font-semibold">Go-Live Setup</div>
              </div>
            </div>
          </div>

          {/* Hero Right: Live Console Simulation */}
          <div className="lg:col-span-5 animate-scaleIn">
            <div className="bg-[#0b0a09]/95 border border-orange-border/40 rounded-2xl overflow-hidden shadow-glow/15 terminal-scanlines backdrop-blur-md">
              <div className="bg-charcoal-2/80 px-6 py-4 flex items-center justify-between border-b border-border-subtle/80">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-xs text-orange font-mono font-bold uppercase tracking-widest">
                      Live Call Console
                    </div>
                    <div className="text-2xs text-text-muted font-mono mt-0.5">
                      Order Transcript Simulator
                    </div>
                  </div>
                  {consoleStatus === "In Call" && (
                    <div className="flex items-end gap-[3px] h-4 px-2 pb-[2px] opacity-95">
                      {[...Array(12)].map((_, i) => {
                        const delay = `${(i * 0.08).toFixed(2)}s`;
                        const duration = `${(0.7 + (i % 3) * 0.15).toFixed(2)}s`;
                        return (
                          <div
                            key={i}
                            className="waveform-bar"
                            style={{
                              animationDelay: delay,
                              animationDuration: duration,
                              height: "100%",
                              width: "2px"
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-2xs font-bold font-mono uppercase border ${
                  consoleStatus === "Incoming Call" 
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/35"
                    : "bg-success-glow text-success border-success/35"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    consoleStatus === "Incoming Call" ? "bg-amber-500 animate-pulse" : "bg-success animate-ping"
                  }`} />
                  {consoleStatus}
                </div>
              </div>

              <div className="p-6 h-[340px] flex flex-col gap-4 overflow-y-auto scrollbar-thin select-none font-mono bg-black/40">
                {dialogue.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-text-muted space-y-4">
                    <div className="w-12 h-12 bg-charcoal-2/60 border border-border-subtle rounded-full flex items-center justify-center animate-pulse">
                      <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <p className="text-2xs font-mono tracking-wide text-center">
                      system_stat: waiting for inbound ring...
                    </p>
                  </div>
                )}
                {dialogue.map((msg, i) => (
                  <div
                    key={i}
                    className={`w-full text-2xs leading-relaxed border-l-[2px] pl-3 py-1.5 animate-spring-up ${
                      msg.sender === "caller"
                        ? "border-text-muted/65 text-text-muted"
                        : "border-orange text-orange/95"
                    }`}
                  >
                    <div className="text-[9px] font-extrabold tracking-wider uppercase mb-1 opacity-75">
                      {msg.sender === "caller" ? "> caller_input" : "> ai_response"}
                    </div>
                    <span>{msg.text}</span>
                    {i === dialogue.length - 1 && (
                      <span className="terminal-cursor" />
                    )}
                  </div>
                ))}

                {ticketDispatched && (
                  <div className="bg-[#101c13]/70 border border-success/30 rounded-xl p-4 mt-2 animate-fadeIn shadow-lg shadow-success-glow/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-bold font-mono tracking-widest text-success uppercase">
                        POS Dispatch Successful
                      </span>
                      <span className="text-[9px] text-text-muted font-mono">
                        Route: Toast POS
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="flex items-center gap-2 text-text-main">
                        <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-2xs">1x Paneer Special (Mild)</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-main">
                        <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-2xs">1x Garlic Naan</span>
                      </div>
                      <div className="border-t border-border-subtle/40 mt-2.5 pt-2.5 flex items-center justify-between text-text-muted text-[9px] font-mono">
                        <span>Pickup: 7:15 PM</span>
                        <span>Name: Alex</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Launch Details */}
      <section data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Launch", value: "48 Hours", sub: "Managed go-live" },
            { label: "Capacity", value: "20 Concurrent", sub: "Calls per location" },
            { label: "Retention", value: "24 Months", sub: "Recordings & transcripts" },
            { label: "Live Demo", value: "(240) 248-6423", sub: "Call AIVOICE now", href: "tel:+12402486423" },
          ].map((item) => {
            const inner = (
              <>
                <div className="text-2xs uppercase tracking-widest text-text-muted font-bold font-mono mb-1.5">
                  {item.label}
                </div>
                <div className="font-heading font-bold text-xl text-text-main">{item.value}</div>
                <div className="text-xs text-text-muted mt-0.5">{item.sub}</div>
              </>
            );
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                className="bg-charcoal-2 border border-border-subtle hover:border-orange/40 p-5 rounded-2xl transition-all hover-scale-card"
              >
                {inner}
              </a>
            ) : (
              <div
                key={item.label}
                className="bg-charcoal-2 border border-border-subtle shadow-soft p-5 rounded-2xl"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* POS Integrations Stripe */}
      <section data-reveal className="bg-charcoal-2/40 border-y border-border-subtle py-8 my-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-widest font-bold text-text-muted mb-6">
            Directly integrating with 1,000+ POS networks via Deliverect
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {["TOAST", "SQUARE", "CLOVER", "OLO", "SPOTON", "ALOHA", "LIGHTSPEED", "ALOHA"].slice(0, 6).map((pos) => (
              <span
                key={pos}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-charcoal-2 border border-border-subtle shadow-soft font-heading font-bold text-sm sm:text-base tracking-wider text-text-main hover:border-orange/40 hover:text-orange transition-all"
              >
                {pos}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* The Core Problem */}
      <section data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="badge-orange">The Core Problem</div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main">
            43% OF RESTAURANT CALLS RING OUT UNANSWERED
          </h2>
          <p className="text-text-muted text-base sm:text-lg">
            Busy dinner rushes force your team to choose between serving the line or answering the phone. Every missed call is a customer ordering somewhere else.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-charcoal-2 border border-border-subtle shadow-soft p-8 rounded-2xl space-y-4 hover-scale-card">
            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-lg text-text-main">Understaffed Rushes</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Dinner peaks happen exactly when staff is fully loaded packing orders, cleaning tables, and serving guests.
            </p>
          </div>

          <div className="bg-charcoal-2 border border-border-subtle shadow-soft p-8 rounded-2xl space-y-4 hover-scale-card">
            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-lg text-text-main">Menu Customizations</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Standard phone bots crash on custom requests (extra sauce, no onions, gluten-free substitutions) leaving staff to clean up tickets.
            </p>
          </div>

          <div className="bg-charcoal-2 border border-border-subtle shadow-soft p-8 rounded-2xl space-y-4 hover-scale-card">
            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-lg text-text-main">Unpredictable Fees</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Competitor systems charge complex per-minute overage rates that can explode from $199 up to $1,400 during peak months.
            </p>
          </div>

          <div className="bg-charcoal-2 border border-border-subtle shadow-soft p-8 rounded-2xl space-y-4 hover-scale-card">
            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-lg text-text-main">Zero Accountability</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Without call logs, audio playback, and transcript records, operators cannot track error claims or verify transaction accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* Product Workflow */}
      <section data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border-subtle/50">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="badge-orange">How It Works</div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main">
            FROM PHONE CALL TO KITCHEN-READY ORDER
          </h2>
          <p className="text-text-muted text-base sm:text-lg">
            Every call follows a structured flow — answered, understood, confirmed, and dispatched — with full visibility after the shift.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              title: "Caller reaches your number",
              text: "Customers call the same restaurant number. AI Voice HQ answers and starts the right ordering flow.",
            },
            {
              title: "AI understands intent",
              text: "The agent handles questions, modifiers, dietary requests, and meal-period menu logic in natural conversation.",
            },
            {
              title: "Details are confirmed",
              text: "Spice level, substitutions, pickup time, bundles, and specials are repeated back before submission.",
            },
            {
              title: "Order reaches workflow",
              text: "Orders are sent into the configured POS or KDS your kitchen already runs on.",
            },
            {
              title: "Operators review calls",
              text: "Recordings, transcripts, outcomes, and analytics stay available after the shift.",
            },
          ].map((step, i) => (
            <div
              key={step.title}
              className="bg-charcoal-2 border border-border-subtle shadow-soft p-6 rounded-2xl space-y-3 hover-scale-card"
            >
              <div className="w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center text-orange font-heading font-bold">
                {i + 1}
              </div>
              <h3 className="font-heading font-bold text-base text-text-main">{step.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Operational Proof */}
      <section data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="badge-orange">Operational Proof</div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main">
            BUILT FOR REAL RESTAURANT VOLUME
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "20", label: "Simultaneous Calls", sub: "Per location during rush" },
            { value: "400+", label: "Menu SKUs", sub: "Handled in live operations" },
            { value: "48hr", label: "Go-live Window", sub: "With managed launch" },
            { value: "24mo", label: "Recording Retention", sub: "With disclosure on calls" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="bg-charcoal-2 border border-border-subtle shadow-soft p-6 rounded-2xl text-center space-y-2 hover-scale-card"
            >
              <div className="font-heading font-black text-4xl sm:text-5xl text-orange text-glow">
                {metric.value}
              </div>
              <div className="text-sm font-bold text-text-main">{metric.label}</div>
              <div className="text-xs text-text-muted">{metric.sub}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/integrations"
            suppressHydrationWarning
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange hover:text-orange/80 transition-colors"
          >
            View all POS &amp; KDS integrations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="badge-orange">Quantifiable ROI</div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main leading-tight">
              CALCULATE HOW MUCH REVENUE YOU ARE LOSING
            </h2>
            <p className="text-text-muted text-base leading-relaxed">
              Based on extensive hospitality research, the average restaurant misses 43% of incoming calls. Our AI platform recovers 85% of those missed orders, pushing them directly to your kitchen.
            </p>
            <div className="bg-charcoal-2 border border-border-subtle shadow-soft p-6 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center text-success flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-sm text-text-main">High Conversion Advantage</h4>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  At a flat $300/month, AI Voice HQ pays for itself from just one and a half recovered orders per day.
                </p>
              </div>
            </div>
          </div>

          {/* Calculator Tool Widget */}
          <div className="bg-charcoal-2 border border-border-subtle shadow-soft p-8 rounded-2xl shadow-card space-y-6">
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-2 text-text-main">
                <span>Estimated Incoming Calls / Month</span>
                <span className="text-orange font-mono text-base">{calls.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="50"
                value={calls}
                suppressHydrationWarning
                onChange={(e) => setCalls(parseInt(e.target.value))}
                className="w-full h-2 bg-charcoal rounded-lg appearance-none cursor-pointer accent-orange"
              />
              <div className="flex justify-between text-2xs text-text-muted font-mono mt-1">
                <span>200</span>
                <span>2,500</span>
                <span>5,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-2 text-text-main">
                <span>Average Ticket Size</span>
                <span className="text-orange font-mono text-base">${ticket}</span>
              </div>
              <input
                type="range"
                min="15"
                max="100"
                step="1"
                value={ticket}
                suppressHydrationWarning
                onChange={(e) => setTicket(parseInt(e.target.value))}
                className="w-full h-2 bg-charcoal rounded-lg appearance-none cursor-pointer accent-orange"
              />
              <div className="flex justify-between text-2xs text-text-muted font-mono mt-1">
                <span>$15</span>
                <span>$50</span>
                <span>$100</span>
              </div>
            </div>

            <div className="bg-[#0f0e0d]/90 border border-orange-border/40 p-6 rounded-xl text-center space-y-1 shadow-glow/10 shadow-lg">
              <div className="text-2xs uppercase tracking-wider text-text-muted font-bold font-mono">
                Recovered Revenue / Year
              </div>
              <div 
                className={`text-4xl sm:text-5xl font-heading font-black text-orange text-glow drop-shadow-[0_0_10px_rgba(251,146,60,0.15)] transition-transform duration-150 ease-out ${
                  roiBouncing ? "scale-[1.04]" : "scale-100"
                }`}
              >
                ${annualRevenue.toLocaleString()}
              </div>
              <div className="text-2xs font-mono text-success font-bold pt-1 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Pays for itself {roiRatio}x over our flat rate!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operator Social Proof Testimonials */}
      <section data-reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border-subtle/50 relative">
        {/* Decorative background blur blob under the carousel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange/4 rounded-full blur-[100px] pointer-events-none -z-10 animate-float-blob" />

        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="badge-orange">Restaurant Partners</div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main">
            TRUSTED BY INDEPENDENT OPERATORS
          </h2>
          <p className="text-text-muted text-base">
            Read how small chain and single location owners stopped leaving sales on the line.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative bg-charcoal-2 border border-border-subtle shadow-card rounded-3xl p-8 sm:p-12 overflow-hidden hover-scale-card group/carousel"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
          suppressHydrationWarning
        >
          {/* Large decorative quotation mark background */}
          <div className="absolute top-6 left-6 text-orange/[0.04] text-8xl font-serif select-none pointer-events-none font-bold">
            “
          </div>
          <div className="absolute bottom-6 right-6 text-orange/[0.04] text-8xl font-serif select-none pointer-events-none font-bold">
            ”
          </div>

          {/* Testimonial slider track */}
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translate3d(-${activeTestimonial * 100}%, 0, 0)` }}
            >
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-1 select-none flex flex-col justify-between min-h-[180px]">
                  <p className="text-base sm:text-lg italic text-text-main leading-relaxed text-center font-medium">
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="text-center pt-8 mt-6 border-t border-border-subtle/40">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl">{t.emoji}</span>
                      <h4 className="font-heading font-bold text-base text-text-main">{t.author}</h4>
                    </div>
                    <p className="text-2xs text-orange uppercase tracking-wider font-semibold font-mono mt-1">
                      {t.role}, {t.restaurant}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Autoplay progress bar indicator */}
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-charcoal-3">
            <div 
              className="h-full bg-orange transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Carousel Controls (Prev/Next Arrows + Dots) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2">
          {/* Prev/Next buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-border-subtle bg-charcoal-2 text-text-muted hover:text-orange hover:border-orange/60 hover:-translate-x-0.5 active:translate-x-0 flex items-center justify-center transition-all cursor-pointer shadow-soft"
              aria-label="Previous Testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-border-subtle bg-charcoal-2 text-text-muted hover:text-orange hover:border-orange/60 hover:translate-x-0.5 active:translate-x-0 flex items-center justify-center transition-all cursor-pointer shadow-soft"
              aria-label="Next Testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 order-first sm:order-last">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setProgress(0);
                  setActiveTestimonial(idx);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeTestimonial 
                    ? "w-6 h-2 bg-orange" 
                    : "w-2 h-2 bg-charcoal-3 hover:bg-text-muted"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === activeTestimonial ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies & Blog */}
      <section data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border-subtle/50">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="badge-orange">Learn More</div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main">
            CASE STUDIES &amp; INSIGHTS
          </h2>
          <p className="text-text-muted text-base">
            See how operators rolled out AI phone ordering, and why generic bots break on real restaurant menus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/case-studies"
            suppressHydrationWarning
            className="group bg-charcoal-2 border border-border-subtle shadow-soft rounded-2xl overflow-hidden hover-scale-card flex flex-col"
          >
            <div className="relative h-40 bg-linear-to-br from-orange/20 via-orange/5 to-charcoal-3 border-b border-border-subtle flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(90deg,currentColor_0_1px,transparent_1px_24px)] text-text-main" />
              <svg className="w-12 h-12 text-orange relative animate-float-blob" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="p-8 space-y-4 flex flex-col flex-1">
              <div className="text-2xs uppercase tracking-widest font-bold font-mono text-orange">
                Case Study
              </div>
              <h3 className="font-heading font-bold text-xl text-text-main group-hover:text-orange transition-colors">
                The shared problem
              </h3>
              <p className="text-sm text-text-muted leading-relaxed flex-1">
                The busiest hour was the leakiest. Answering phones meant slower line production — until AI Voice HQ rolled out across the chain.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange">
                Read case studies
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>

          <Link
            href="/blog"
            suppressHydrationWarning
            className="group bg-charcoal-2 border border-border-subtle shadow-soft rounded-2xl overflow-hidden hover-scale-card flex flex-col"
          >
            <div className="relative h-40 bg-linear-to-br from-charcoal-3 via-charcoal-3 to-orange/10 border-b border-border-subtle flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(0deg,currentColor_0_1px,transparent_1px_24px)] text-text-main" />
              <svg className="w-12 h-12 text-orange relative animate-float-blob-reverse" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div className="p-8 space-y-4 flex flex-col flex-1">
              <div className="text-2xs uppercase tracking-widest font-bold font-mono text-orange">
                Blog Post
              </div>
              <h3 className="font-heading font-bold text-xl text-text-main group-hover:text-orange transition-colors">
                Why AI Phone Ordering Breaks on Real Restaurant Menus
              </h3>
              <p className="text-sm text-text-muted leading-relaxed flex-1">
                The real test for restaurant voice AI is not whether it can answer the phone — it is whether it can hold up against a 400-item menu with modifiers.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange">
                Read post
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Final Block */}
      <section data-reveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-linear-to-br from-charcoal-2 to-charcoal border border-border-active/40 p-8 sm:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-orange/5 blur-2xl rounded-full" />
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-main relative">
            READY TO MAKE EVERY CALL ANSWERED?
          </h2>
          <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto relative leading-relaxed">
            Book a quick call and we can launch in 48 hours, then tune the deployment during your first month.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative">
            <Link
              href="https://cal.com/vgaligutta/15min"
              target="_blank"
              suppressHydrationWarning
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 btn-shine bg-orange text-charcoal font-bold text-base rounded-full shadow-glow hover:bg-orange/95 transition-all"
            >
              Book Your Meeting
            </Link>
            <a
              href="tel:+13106345831"
              suppressHydrationWarning
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-charcoal-3 border border-border-subtle hover:border-text-muted text-text-main font-bold text-base rounded-full transition-all"
            >
              Call (310) 634-5831
            </a>
          </div>
          <div className="relative pt-2">
            <a
              href="mailto:inquiries@aivoicehq.com"
              suppressHydrationWarning
              className="text-sm font-mono text-text-muted hover:text-orange transition-colors"
            >
              inquiries@aivoicehq.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
