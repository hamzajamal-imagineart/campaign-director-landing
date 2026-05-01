/* global React, ReactDOM */
/* Tweak controls for Campaign Director — exposed as window.CampaignTweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "Direct your campaign.",
  "headlineAccent": "Codex does the rest.",
  "accentColor": "#8A3FFC",
  "animateGraph": true,
  "showVideo": true,
  "showFAQ": true,
  "examplesColumns": 2,
  "newBadge": "New",
  "tabName": "Campaign Director"
}/*EDITMODE-END*/;

window.CAMPAIGN_TWEAK_DEFAULTS = TWEAK_DEFAULTS;

const CampaignTweaks = ({ tweaks, setTweak }) => (
  <window.TweaksPanel>
    <window.TweakSection label="Hero copy"/>
    <window.TweakText
      label="Headline"
      value={tweaks.headline}
      onChange={(v) => setTweak('headline', v)}
    />
    <window.TweakText
      label="Accent line"
      value={tweaks.headlineAccent}
      onChange={(v) => setTweak('headlineAccent', v)}
    />

    <window.TweakSection label="Theme"/>
    <window.TweakColor
      label="Brand accent"
      value={tweaks.accentColor}
      onChange={(v) => setTweak('accentColor', v)}
    />
    <window.TweakToggle
      label="Animated node graph"
      value={tweaks.animateGraph}
      onChange={(v) => setTweak('animateGraph', v)}
    />

    <window.TweakSection label="Sections"/>
    <window.TweakToggle
      label="Show walkthrough video"
      value={tweaks.showVideo}
      onChange={(v) => setTweak('showVideo', v)}
    />
    <window.TweakToggle
      label="Show FAQ"
      value={tweaks.showFAQ}
      onChange={(v) => setTweak('showFAQ', v)}
    />
    <window.TweakRadio
      label="Examples grid"
      value={String(tweaks.examplesColumns)}
      options={[
        { value: '2', label: '2 cols' },
        { value: '3', label: '3 cols' },
        { value: '4', label: '4 cols' },
      ]}
      onChange={(v) => setTweak('examplesColumns', Number(v))}
    />

    <window.TweakSection label="Tab"/>
    <window.TweakText
      label="Tab name"
      value={tweaks.tabName}
      onChange={(v) => setTweak('tabName', v)}
    />
    <window.TweakText
      label="Tab badge"
      value={tweaks.newBadge}
      onChange={(v) => setTweak('newBadge', v)}
    />
  </window.TweaksPanel>
);

window.CampaignTweaks = CampaignTweaks;
