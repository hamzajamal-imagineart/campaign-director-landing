"use client";

import { useEffect } from 'react';
import { T, Reveal } from '@/components/primitives';
import { useTweaks } from '@/components/tweaks-panel';
import { CAMPAIGN_TWEAK_DEFAULTS, CampaignTweaks } from '@/components/tweaks';
import { Hero, CodexCallout } from '@/components/hero';
import { VideoBlock } from '@/components/video-block';
import { SentenceNetwork } from '@/components/sentence-network';
import { HowItWorks } from '@/components/how-it-works';
import { Examples } from '@/components/examples';
import { FAQ } from '@/components/faq';
import { FinalCTA } from '@/components/final-cta';
import { Templates } from '@/components/templates';
import { SectionHead } from '@/components/section-head';

/* hex → "r g b" triple for CSS var values like "138 63 252" */
const hexToRGB = (hex) => {
  const h = hex.replace('#', '');
  const n = h.length === 3
    ? h.split('').map(c => parseInt(c + c, 16))
    : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  return n.join(' ');
};

/* DarkSection — dark bg with subtle dot grid */
const DarkSection = ({ children, style }) => (
  <div style={{ position: 'relative', backgroundColor: T.bg, ...style }}>
    <div aria-hidden style={{
      position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    }}/>
    <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
  </div>
);

/* Light section — flips CSS vars to light palette via .light class */
const LightSection = ({ children, style }) => (
  <div className="light" style={{ background: '#f5f5f7', ...style }}>{children}</div>
);

export default function Page() {
  const [tweaks, setTweak] = useTweaks(CAMPAIGN_TWEAK_DEFAULTS);

  useEffect(() => {
    const triple = hexToRGB(tweaks.accentColor);
    document.documentElement.style.setProperty('--fill-brand', triple);
    document.documentElement.style.setProperty('--fill-brand-hover', triple);
    document.documentElement.style.setProperty('--border-brand', triple);
  }, [tweaks.accentColor]);

  const cx    = { maxWidth: 1240, margin: '0 auto', padding: '0 clamp(24px, 4vw, 56px)', boxSizing: 'border-box' };
  const sec   = { padding: '120px 0' };
  const secLg = { padding: '160px 0 140px' };

  return (
    <div style={{ minHeight: '100vh', background: T.bg }}>

      {/* ① Hero — dark, full-bleed */}
      <Hero headline={tweaks.headline} accent={tweaks.headlineAccent} animateGraph={tweaks.animateGraph}/>

      {/* ② Walkthrough video — light */}
      {tweaks.showVideo && (
        <LightSection>
          <div style={cx}><div style={sec}><Reveal><VideoBlock light/></Reveal></div></div>
        </LightSection>
      )}

      {/* ③ Sentence Network — dark + dots */}
      <DarkSection>
        <div style={cx}><div style={sec}><Reveal><SentenceNetwork/></Reveal></div></div>
      </DarkSection>

      {/* ④ How it Works — light */}
      <LightSection>
        <div style={cx}><div style={sec}><Reveal><HowItWorks/></Reveal></div></div>
      </LightSection>

      {/* ⑤ Prompt examples — dark, truly full-bleed */}
      <DarkSection style={{ paddingTop: 120, paddingBottom: 120 }}>
        <Reveal><Examples columns={tweaks.examplesColumns}/></Reveal>
      </DarkSection>

      {/* ⑥ Templates marquee — light */}
      <LightSection style={{ paddingTop: 120, paddingBottom: 80 }}>
        <Reveal>
          <div style={cx}>
            <SectionHead
              eyebrow="What you can build"
              title="Every format. From one sentence."
              sub="UGC reels, brand templates, cinematic shorts. Every frame from a single natural-English brief."
            />
          </div>
          <Templates headingHidden/>
        </Reveal>
      </LightSection>

      {/* ⑦ Codex callout — dark */}
      <DarkSection>
        <div style={cx}><div style={sec}><Reveal><CodexCallout/></Reveal></div></div>
      </DarkSection>

      {/* ⑧ FAQ — light (conditional) */}
      {tweaks.showFAQ && (
        <LightSection>
          <div style={cx}><div style={sec}><Reveal><FAQ/></Reveal></div></div>
        </LightSection>
      )}

      {/* ⑨ Final CTA — dark + dots */}
      <DarkSection>
        <div style={cx}><div style={secLg}><Reveal><FinalCTA/></Reveal></div></div>
      </DarkSection>

      <CampaignTweaks tweaks={tweaks} setTweak={setTweak}/>
    </div>
  );
}
