"use client";

// DO NOT FORMAT, DO NOT REORDER KEYS — host edits the EDITMODE block
// below on disk via a regex match on the /*EDITMODE-BEGIN*/.../*EDITMODE-END*/
// markers. Any autoformatter changes inside that block break host persistence.

import {
  TweaksPanel,
  TweakSection,
  TweakText,
  TweakColor,
  TweakToggle,
  TweakRadio,
} from '@/components/tweaks-panel';

// prettier-ignore
/* eslint-disable */
export const CAMPAIGN_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "Direct your campaign.",
  "headlineAccent": "Codex does the rest.",
  "accentColor": "#8A3FFC",
  "animateGraph": true,
  "showVideo": true,
  "showFAQ": true,
  "examplesColumns": 4
}/*EDITMODE-END*/;
/* eslint-enable */

export const CampaignTweaks = ({ tweaks, setTweak }) => (
  <TweaksPanel>
    <TweakSection label="Hero copy"/>
    <TweakText
      label="Headline"
      value={tweaks.headline}
      onChange={(v) => setTweak('headline', v)}
    />
    <TweakText
      label="Accent line"
      value={tweaks.headlineAccent}
      onChange={(v) => setTweak('headlineAccent', v)}
    />

    <TweakSection label="Theme"/>
    <TweakColor
      label="Brand accent"
      value={tweaks.accentColor}
      onChange={(v) => setTweak('accentColor', v)}
    />
    <TweakToggle
      label="Animated node graph"
      value={tweaks.animateGraph}
      onChange={(v) => setTweak('animateGraph', v)}
    />

    <TweakSection label="Sections"/>
    <TweakToggle
      label="Show walkthrough video"
      value={tweaks.showVideo}
      onChange={(v) => setTweak('showVideo', v)}
    />
    <TweakToggle
      label="Show FAQ"
      value={tweaks.showFAQ}
      onChange={(v) => setTweak('showFAQ', v)}
    />
    <TweakRadio
      label="Examples grid"
      value={String(tweaks.examplesColumns)}
      options={[
        { value: '2', label: '2 cols' },
        { value: '3', label: '3 cols' },
        { value: '4', label: '4 cols' },
      ]}
      onChange={(v) => setTweak('examplesColumns', Number(v))}
    />
  </TweaksPanel>
);

export default CampaignTweaks;
