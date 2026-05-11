import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";

const LINE1 = "German";
const LINE2 = "Cakes";
const LETTER_DELAY = 0.13;
const LINE1_START = 0.3;
const LINE2_START = LINE1_START + LINE1.length * LETTER_DELAY + 0.25;
const TOTAL_WRITE = LINE2_START + LINE2.length * LETTER_DELAY + 0.4;

/* Larger piping bag SVG */
function PipingBag() {
  // Squeeze cycle: bag body contracts/expands rhythmically as icing is squeezed out
  const squeezeDuration = LETTER_DELAY; // one pulse per letter
  const totalLetters = LINE1.length + LINE2.length;

  return (
    <svg width="52" height="84" viewBox="0 0 38 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bag body with squeeze animation */}
      <motion.path
        d="M8 4 L30 4 Q32 4 32 6 L22 48 Q21 52 19 52 Q17 52 16 48 L6 6 Q6 4 8 4Z"
        fill="url(#bagGrad)"
        stroke="hsla(0,0%,100%,0.3)"
        strokeWidth="0.8"
        animate={{
          d: [
            "M8 4 L30 4 Q32 4 32 6 L22 48 Q21 52 19 52 Q17 52 16 48 L6 6 Q6 4 8 4Z",
            "M9 4 L29 4 Q31 4 31 6 L21.5 48 Q20.5 52 19 52 Q17.5 52 16.5 48 L7 6 Q7 4 9 4Z",
            "M8 4 L30 4 Q32 4 32 6 L22 48 Q21 52 19 52 Q17 52 16 48 L6 6 Q6 4 8 4Z",
          ],
        }}
        transition={{
          duration: squeezeDuration * 2,
          repeat: totalLetters,
          ease: "easeInOut",
          delay: LINE1_START,
        }}
      />
      {/* Icing fill — pulses with squeeze */}
      <motion.ellipse
        cx="19" cy="12" rx="8" ry="5"
        fill="hsla(45,30%,92%,0.5)"
        animate={{ rx: [8, 7, 8], ry: [5, 4.5, 5] }}
        transition={{ duration: squeezeDuration * 2, repeat: totalLetters, ease: "easeInOut", delay: LINE1_START }}
      />
      <motion.ellipse
        cx="19" cy="22" rx="5" ry="3"
        fill="hsla(45,30%,90%,0.3)"
        animate={{ rx: [5, 4.2, 5], ry: [3, 2.5, 3] }}
        transition={{ duration: squeezeDuration * 2, repeat: totalLetters, ease: "easeInOut", delay: LINE1_START }}
      />
      {/* Grip lines */}
      <line x1="11" y1="6" x2="27" y2="6" stroke="hsla(0,0%,100%,0.2)" strokeWidth="0.7" />
      <line x1="12" y1="8.5" x2="26" y2="8.5" stroke="hsla(0,0%,100%,0.15)" strokeWidth="0.5" />
      {/* Metal nozzle */}
      <path d="M16.5 51 L19 61 L21.5 51Z" fill="hsla(210,15%,75%,0.95)" stroke="hsla(210,10%,55%,0.6)" strokeWidth="0.5" />
      <rect x="16" y="49" width="6" height="3" rx="0.5" fill="hsla(210,12%,70%,0.8)" />
      {/* Icing blob at tip — pulses bigger on squeeze */}
      <motion.circle
        cx="19" cy="62" r="2.2"
        fill="hsla(45,30%,93%,0.95)"
        animate={{ r: [2.2, 3.2, 2.2] }}
        transition={{ duration: squeezeDuration * 2, repeat: totalLetters, ease: "easeInOut", delay: LINE1_START }}
      />
      <defs>
        <linearGradient id="bagGrad" x1="6" y1="4" x2="32" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="hsla(0,0%,100%,0.4)" />
          <stop offset="40%" stopColor="hsla(0,0%,100%,0.22)" />
          <stop offset="100%" stopColor="hsla(0,0%,100%,0.1)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* Icing drip that appears behind each letter */
function IcingDrip({ delay }: { delay: number }) {
  return (
    <motion.span
      className="absolute -bottom-1 left-1/2 -translate-x-1/2 pointer-events-none"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: [0, 0.7, 0.4], scaleY: [0, 1, 0.8] }}
      transition={{ delay: delay + 0.15, duration: 0.5, ease: "easeOut" }}
    >
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
        <path
          d="M3 0 Q6 0 6 3 Q6 7 6 9 Q6 10 6 10 Q6 7 6 3 Q6 0 9 0"
          stroke="hsla(45,30%,90%,0.5)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="6" cy="9" r="1.5" fill="hsla(45,30%,90%,0.4)" />
      </svg>
    </motion.span>
  );
}

/* Small icing splatter dots that appear around each letter */
function IcingSplatter({ delay }: { delay: number }) {
  return (
    <>
      {[
        { x: -6, y: -3, size: 2, d: 0 },
        { x: 8, y: 2, size: 1.5, d: 0.05 },
        { x: -3, y: 6, size: 1.2, d: 0.1 },
      ].map((dot, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: dot.size,
            height: dot.size,
            left: `calc(50% + ${dot.x}px)`,
            top: `calc(50% + ${dot.y}px)`,
            background: "hsla(45,30%,92%,0.6)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
          transition={{ delay: delay + dot.d, duration: 0.4, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

/* Each letter appears with icing squeeze + drip trail */
function IcingLetter({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      className="inline-block relative"
      initial={{ opacity: 0, scale: 0.3, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1],
        scale: { delay, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
      }}
    >
      {/* Icing depth shadow */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          textShadow:
            "0 2px 3px hsla(0,0%,0%,0.3), 0 0 8px hsla(40,50%,80%,0.2), 0 1px 0 hsla(45,30%,85%,0.5)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.1, duration: 0.2 }}
        aria-hidden
      >
        {char}
      </motion.span>
      {/* Drip trail */}
      <IcingDrip delay={delay} />
      {/* Splatter dots */}
      <IcingSplatter delay={delay} />
      {char}
    </motion.span>
  );
}

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"writing" | "glow" | "reveal">("writing");
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const bagX = useMotionValue(0);
  const bagY = useMotionValue(0);
  const bagRotate = useMotionValue(-12);
  const bagOpacity = useMotionValue(1);

  useEffect(() => {
    const updateBagPosition = () => {
      const container = containerRef.current;
      const l1 = line1Ref.current;
      const l2 = line2Ref.current;
      if (!container || !l1 || !l2) return;

      const containerRect = container.getBoundingClientRect();
      const l1Rect = l1.getBoundingClientRect();
      const l2Rect = l2.getBoundingClientRect();

      const bagOffsetY = -78; // larger bag offset

      const l1StartX = l1Rect.left - containerRect.left - 14;
      const l1EndX = l1Rect.right - containerRect.left + 5;
      const l1Y = l1Rect.top - containerRect.top + bagOffsetY;

      const l2StartX = l2Rect.left - containerRect.left - 14;
      const l2EndX = l2Rect.right - containerRect.left + 5;
      const l2Y = l2Rect.top - containerRect.top + bagOffsetY;

      const keyframes: { x: number; y: number; time: number; rotate: number }[] = [];

      keyframes.push({ x: l1StartX - 20, y: l1Y - 15, time: 0, rotate: -18 });

      for (let i = 0; i <= LINE1.length; i++) {
        const progress = i / LINE1.length;
        const x = l1StartX + (l1EndX - l1StartX) * progress;
        const time = LINE1_START + i * LETTER_DELAY;
        keyframes.push({
          x,
          y: l1Y + Math.sin(progress * Math.PI) * 4,
          time,
          rotate: -12 + Math.sin(progress * Math.PI * 2) * 6,
        });
      }

      keyframes.push({ x: l2StartX - 20, y: l2Y - 8, time: LINE2_START - 0.1, rotate: -18 });

      for (let i = 0; i <= LINE2.length; i++) {
        const progress = i / LINE2.length;
        const x = l2StartX + (l2EndX - l2StartX) * progress;
        const time = LINE2_START + i * LETTER_DELAY;
        keyframes.push({
          x,
          y: l2Y + Math.sin(progress * Math.PI) * 4,
          time,
          rotate: -12 + Math.sin(progress * Math.PI * 2) * 6,
        });
      }

      const xValues = keyframes.map((k) => k.x);
      const yValues = keyframes.map((k) => k.y);
      const rotValues = keyframes.map((k) => k.rotate);
      const totalDuration = keyframes[keyframes.length - 1].time + 0.2;
      const times = keyframes.map((k) => k.time / totalDuration);

      animate(bagX, xValues, { duration: totalDuration, ease: "easeInOut", times });
      animate(bagY, yValues, { duration: totalDuration, ease: "easeInOut", times });
      animate(bagRotate, rotValues, { duration: totalDuration, ease: "easeInOut", times });

      setTimeout(() => {
        animate(bagOpacity, 0, { duration: 0.4 });
      }, totalDuration * 1000 + 200);
    };

    const raf = requestAnimationFrame(() => {
      setTimeout(updateBagPosition, 100);
    });

    const timers = [
      setTimeout(() => setPhase("glow"), TOTAL_WRITE * 1000),
      setTimeout(() => { setPhase("reveal"); onFinish(); }, (TOTAL_WRITE + 0.8) * 1000),
    ];
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [onFinish, bagX, bagY, bagRotate, bagOpacity]);

  return (
    <AnimatePresence>
      {phase !== "reveal" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, hsl(168,50%,40%) 0%, hsl(165,55%,30%) 50%, hsl(168,60%,18%) 100%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Ambient particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + (i % 3) * 2,
                height: 2 + (i % 3) * 2,
                left: `${(i * 12 + 5) % 100}%`,
                top: `${(i * 15 + 10) % 100}%`,
                background: `hsla(${40 + (i % 4) * 5}, 70%, 75%, 0.12)`,
              }}
              animate={{ y: [0, -20, 0], opacity: [0, 0.4, 0] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: (i % 5) * 0.4, ease: "easeInOut" }}
            />
          ))}

          <motion.div
            className="absolute w-[400px] h-[250px] md:w-[600px] md:h-[350px] rounded-full"
            style={{ background: "radial-gradient(ellipse, hsla(40,60%,70%,0.08) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col items-center" ref={containerRef}>
            {/* Piping bag */}
            <motion.div
              className="absolute z-10 pointer-events-none"
              style={{
                x: bagX,
                y: bagY,
                rotate: bagRotate,
                opacity: bagOpacity,
                filter: "drop-shadow(0 6px 16px hsla(0,0%,0%,0.35))",
              }}
            >
              <PipingBag />
            </motion.div>

            {/* Line 1 */}
            <div className="relative" ref={line1Ref}>
              <div className="flex justify-center">
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-script tracking-wide"
                  style={{
                    color: "hsla(45, 30%, 95%, 0.95)",
                    textShadow:
                      "0 2px 8px hsla(0,0%,0%,0.25), 0 0 30px hsla(40,60%,70%,0.15), 0 3px 1px hsla(45,20%,80%,0.3)",
                  }}
                >
                  {LINE1.split("").map((char, i) => (
                    <IcingLetter key={`g-${i}`} char={char} delay={LINE1_START + i * LETTER_DELAY} />
                  ))}
                </h1>
              </div>
            </div>

            {/* Line 2 */}
            <div className="relative -mt-1 md:-mt-2" ref={line2Ref}>
              <div className="flex justify-center">
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-script tracking-wide"
                  style={{
                    color: "hsla(45, 30%, 95%, 0.95)",
                    textShadow:
                      "0 2px 8px hsla(0,0%,0%,0.25), 0 0 30px hsla(40,60%,70%,0.15), 0 3px 1px hsla(45,20%,80%,0.3)",
                  }}
                >
                  {LINE2.split("").map((char, i) => (
                    <IcingLetter key={`c-${i}`} char={char} delay={LINE2_START + i * LETTER_DELAY} />
                  ))}
                </h1>
              </div>
            </div>

            {/* Glow burst */}
            <AnimatePresence>
              {phase === "glow" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-[300px] h-[100px] md:w-[500px] md:h-[160px] rounded-full"
                    style={{ background: "radial-gradient(ellipse, hsla(40,70%,75%,0.2) 0%, transparent 70%)" }}
                    animate={{ scale: [1, 1.3, 1.1], opacity: [0, 0.8, 0.4] }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Since 2018 */}
            <motion.div
              className="flex items-center gap-3 mt-4 md:mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase === "glow" ? 1 : 0, y: phase === "glow" ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div className="h-px w-8 md:w-12" style={{ background: "linear-gradient(90deg, transparent, hsla(40,70%,75%,0.6))" }} />
              <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase" style={{ color: "hsla(40,60%,75%,0.7)" }}>
                Since 2018
              </span>
              <motion.div className="h-px w-8 md:w-12" style={{ background: "linear-gradient(90deg, hsla(40,70%,75%,0.6), transparent)" }} />
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="mt-5 md:mt-6 w-24 md:w-32 h-[2px] rounded-full overflow-hidden"
              style={{ background: "hsla(0,0%,100%,0.1)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, hsla(40,70%,70%,0.8), hsla(0,0%,100%,0.9))" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: TOTAL_WRITE + 0.6, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
