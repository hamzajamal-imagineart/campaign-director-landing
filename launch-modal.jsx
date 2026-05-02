/* global React */
const { useState, useEffect, useRef } = React;
const { T, Icon } = window;

/* =========================================================
   Launch Modal — interactive 3-step flow
   1. Brief (idea + attachments)
   2. Repo confirmation + Codex prerequisites
   3. Live progress (terminal-style streaming agent log)
========================================================= */

const STREAM_LINES = [
  ['10:42:01', 'agent', 'codex.session', 'Reading repo Vyro-ai/imagine-campaign-director...'],
  ['10:42:02', 'info',  'agent.reader', 'Loaded AGENTS.md · 11 production rules'],
  ['10:42:03', 'info',  'agent.reader', 'Loaded prompts/01-brief.md · prompts/02-shot-plan.md'],
  ['10:42:05', 'spawn', 'agent.brainstorm', 'Spawning sub-agent: brainstorm × 3'],
  ['10:42:07', 'msg',   'brainstorm.1',     'Concept A: Late-night convenience-store cinematic'],
  ['10:42:07', 'msg',   'brainstorm.2',     'Concept B: Neon-rain product reveal'],
  ['10:42:08', 'msg',   'brainstorm.3',     'Concept C: Slow-mo overhead pour'],
  ['10:42:10', 'spawn', 'agent.critic',     'Spawning critic to score concepts...'],
  ['10:42:13', 'ok',    'agent.critic',     'Selected: Concept A, strongest brand fit'],
  ['10:42:15', 'info',  'agent.planner',    'Building shot plan · 6 shots · 15s vertical'],
  ['10:42:18', 'cu',    'computer.use',     'Opening Chrome → imagine.art/workflows'],
  ['10:42:21', 'cu',    'computer.use',     'Detected logged-in session ✓'],
  ['10:42:23', 'cu',    'computer.use',     'Creating new workflow canvas...'],
  ['10:42:26', 'node',  'workflow.builder', 'Adding node: Brief → Reference Image'],
  ['10:42:28', 'node',  'workflow.builder', 'Adding node: Style → Brand kit'],
  ['10:42:30', 'node',  'workflow.builder', 'Adding node: Generator → ImagineArt 1.5'],
  ['10:42:33', 'node',  'workflow.builder', 'Adding node: Variant fan-out × 6'],
  ['10:42:36', 'node',  'workflow.builder', 'Adding node: Motion → Seedance 2.0'],
  ['10:42:38', 'node',  'workflow.builder', 'Wiring connections...'],
  ['10:42:42', 'cost',  'credit.guard',     'Estimated cost: 184 credits · within budget'],
  ['10:42:44', 'ok',    'credit.guard',     'Confirmed. Starting generation...'],
  ['10:42:50', 'gen',   'imagine.1.5',      'Hero shot rendering... ████████░░ 80%'],
  ['10:43:08', 'ok',    'imagine.1.5',      'Hero shot ready ✓'],
  ['10:43:12', 'gen',   'seedance.2.0',     'Motion clip 1/6 generating...'],
  ['10:43:48', 'ok',    'seedance.2.0',     '6/6 motion clips ✓'],
  ['10:43:52', 'pkg',   'hyperframes',      'Assembling final cut · captions · logo lockup'],
  ['10:44:10', 'done',  'session',          'Campaign packaged. Review MP4 ready.'],
];

const TYPE_COLOR = {
  agent: '#A56EFF', info: '#9CA3AF', spawn: '#FF85DD', msg: '#E5E7EB',
  ok: '#42BE65', cu: '#FACC15', node: '#A56EFF', cost: '#FACC15',
  gen: '#60A5FA', pkg: '#FF85DD', done: '#42BE65',
};

const TerminalStream = ({ active }) => {
  const [shown, setShown] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    setShown(0);
    let i = 0;
    const tick = () => {
      i++; setShown(i);
      if (i < STREAM_LINES.length) {
        setTimeout(tick, 280 + Math.random() * 360);
      }
    };
    const t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [shown]);

  return (
    <div ref={scrollRef} style={{
      flex: 1, padding: '14px 16px',
      background: '#0B0B10', color: '#E5E7EB',
      fontFamily: 'ui-monospace, SF Mono, Menlo, Consolas, monospace',
      fontSize: 12.5, lineHeight: '20px',
      overflow: 'auto',
    }}>
      {STREAM_LINES.slice(0, shown).map((row, i) => {
        const [time, type, source, msg] = row;
        return (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', whiteSpace: 'pre-wrap' }}>
            <span style={{ color: '#6B7280', flexShrink: 0 }}>{time}</span>
            <span style={{ color: TYPE_COLOR[type] || '#fff', flexShrink: 0, fontWeight: 600 }}>
              {type.padEnd(5)}
            </span>
            <span style={{ color: '#9CA3AF', flexShrink: 0 }}>{source}</span>
            <span style={{ color: '#E5E7EB' }}>{msg}</span>
          </div>
        );
      })}
      {shown > 0 && shown < STREAM_LINES.length && (
        <div style={{ display: 'flex', gap: 10, color: '#6B7280' }}>
          <span style={{ display: 'inline-block', width: 8, height: 14,
            background: '#A56EFF', animation: 'blink 1s infinite' }}/>
        </div>
      )}
    </div>
  );
};

const Stepper = ({ step }) => {
  const steps = ['Your idea', 'Confirm', 'Codex running'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px' }}>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: i <= step ? T.fg : T.fg3,
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 999,
              background: i < step ? T.brand : (i === step ? T.brandTonal : T.surfS),
              color: i < step ? '#fff' : (i === step ? T.brandText : T.fg3),
              border: i === step ? `1px solid rgb(var(--border-brand))` : `1px solid ${T.border}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
            }}>
              {i < step ? <Icon name="check" size={13} color="#fff"/> : i + 1}
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 500 }}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: 32, height: 1, background: T.border2 }}/>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const LaunchModal = ({ open, onClose, prefill }) => {
  const [step, setStep] = useState(0);
  const [idea, setIdea] = useState('');
  const [files, setFiles] = useState([]);
  const fileRef = useRef(null);

  useEffect(() => {
    if (open) { setStep(0); setIdea(prefill || ''); setFiles([]); }
  }, [open, prefill]);

  if (!open) return null;

  const canNext = step === 0 ? idea.trim().length > 4 : true;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(15,15,15,0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, animation: 'fadeIn 200ms ease',
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        width: '100%', maxWidth: step === 2 ? 880 : 720,
        maxHeight: '90vh',
        background: T.elev, borderRadius: 20,
        border: `1px solid ${T.border2}`,
        boxShadow: '0 24px 60px rgba(0,0,0,0.30)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        animation: 'popIn 280ms cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16,
          borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg,#8A3FFC,#FF85DD)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="spark" size={18} color="#fff"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Start a campaign</div>
            <div style={{ fontSize: 12, color: T.fg2 }}>Codex will read the repo and build the workflow.</div>
          </div>
          <Stepper step={step}/>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 8, marginLeft: 8,
            background: 'transparent', border: 0, color: T.fg2, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon name="x" size={16}/></button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          {step === 0 && (
            <div style={{ padding: '22px 22px 8px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: T.fg2 }}>What do you want to build?</label>
              <textarea
                value={idea}
                onChange={e=>setIdea(e.target.value)}
                placeholder="e.g. A 15-second vertical launch ad for our new canned drink. Moody late-night convenience-store cinema. Avoid sports-drink cliches."
                rows={5}
                style={{
                  resize: 'vertical', minHeight: 120,
                  padding: '14px 16px', borderRadius: 12,
                  border: `1px solid ${T.border2}`, background: T.bg,
                  color: T.fg, fontSize: 14, lineHeight: 1.55,
                  fontFamily: 'inherit', outline: 'none',
                }}
              />
              <div style={{
                padding: 14, borderRadius: 12,
                background: T.surfS, border: `1px dashed ${T.border2}`,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <Icon name="paperclip" size={16} color={T.fg2}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Attach reference materials</div>
                  <div style={{ fontSize: 12, color: T.fg2 }}>
                    Product photos, brand kits, mood boards, reference videos. Optional.
                  </div>
                </div>
                <input type="file" ref={fileRef} multiple style={{ display: 'none' }}
                  onChange={e => setFiles([...files, ...Array.from(e.target.files).map(f=>f.name)])}/>
                <button onClick={()=>fileRef.current?.click()} style={{
                  height: 32, padding: '0 12px', borderRadius: 9,
                  background: T.elev, border: `1px solid ${T.border2}`, color: T.fg,
                  fontSize: 12, fontWeight: 500, cursor: 'pointer',
                }}>Browse files</button>
              </div>
              {files.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {files.map((f, i) => (
                    <span key={i} style={{
                      fontSize: 12, padding: '4px 10px', borderRadius: 999,
                      background: T.brandTonal, color: T.brandText, fontWeight: 500,
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                    }}>
                      <Icon name="paperclip" size={13}/> {f}
                    </span>
                  ))}
                </div>
              )}
              <div style={{ fontSize: 12, color: T.fg3, marginTop: 4 }}>
                A sentence is enough. Codex will expand the brief before generating.
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ padding: '22px 22px 8px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.fg2 }}>This run will use:</div>

              <div style={{
                padding: 14, borderRadius: 12,
                border: `1px solid ${T.border}`, background: T.bg,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <Icon name="github" size={20} color={T.fg}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>Vyro-ai/imagine-campaign-director</div>
                  <div style={{ fontSize: 12, color: T.fg2 }}>Production rules · prompts · agent definitions</div>
                </div>
                <span style={{
                  fontSize: 11, padding: '4px 10px', borderRadius: 999,
                  background: 'rgb(var(--success-10))', color: 'rgb(var(--success-60))',
                  fontWeight: 600,
                }}>main</span>
              </div>

              <div style={{ fontSize: 12, fontWeight: 600, color: T.fg2, letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 4 }}>
                Prerequisites
              </div>

              {[
                ['terminal', 'Codex with Computer Use enabled', 'Required for browser, clipboard, and download control'],
                ['chrome',   'Google Chrome open', 'Codex operates the same Chrome session you use'],
                ['shield',   'Imagine.Art signed in', 'Log in before starting. Codex stops on a login screen'],
                ['clipboard','Allow clipboard prompt', "Click \u201cAllow\u201d when Chrome asks about clipboard access"],
              ].map(([icon, title, sub]) => (
                <div key={title} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: 12, borderRadius: 10,
                  background: T.bg, border: `1px solid ${T.border}`,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: T.surfS, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name={icon} size={15}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{title}</div>
                    <div style={{ fontSize: 12, color: T.fg2 }}>{sub}</div>
                  </div>
                  <Icon name="check" size={15} color="rgb(var(--success-60))"/>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 460 }}>
              <div style={{
                padding: '12px 18px', borderBottom: `1px solid ${T.border}`,
                display: 'flex', alignItems: 'center', gap: 12, background: T.bg,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: 999,
                  background: '#42BE65', boxShadow: '0 0 0 4px rgba(66,190,101,0.18)',
                  animation: 'pulse 1.4s ease-in-out infinite',
                }}/>
                <span style={{ fontSize: 12.5, fontWeight: 500 }}>Codex session running</span>
                <span style={{ fontSize: 12, color: T.fg3 }}>· session-7f3a · {new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                <div style={{ flex: 1 }}/>
                <span style={{ fontSize: 11, color: T.fg2, padding: '3px 8px', borderRadius: 999, background: T.surfS, border: `1px solid ${T.border}` }}>
                  3 sub-agents
                </span>
              </div>
              <TerminalStream active={step === 2}/>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 10,
          borderTop: `1px solid ${T.border}`, background: T.bg,
        }}>
          {step > 0 && step < 2 && (
            <button onClick={()=>setStep(s=>s-1)} style={{
              height: 38, padding: '0 14px', borderRadius: 10,
              background: 'transparent', color: T.fg, border: `1px solid ${T.border2}`,
              cursor: 'pointer', fontSize: 13, fontWeight: 500,
            }}>Back</button>
          )}
          <div style={{ flex: 1, fontSize: 12, color: T.fg3 }}>
            {step === 0 && 'Step 1 of 3 · Brief'}
            {step === 1 && 'Step 2 of 3 · Confirm prerequisites'}
            {step === 2 && 'Codex is running · keep Chrome open'}
          </div>
          {step < 2 ? (
            <button disabled={!canNext} onClick={()=>setStep(s=>s+1)} style={{
              height: 38, padding: '0 18px', borderRadius: 10,
              background: canNext ? T.brand : T.surfS,
              color: canNext ? '#fff' : T.fg3,
              border: 0, cursor: canNext ? 'pointer' : 'not-allowed',
              fontSize: 13, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              boxShadow: canNext ? '0 4px 14px rgba(138,63,252,0.32)' : 'none',
            }}>
              {step === 0 ? 'Continue' : 'Launch in Codex'}
              <Icon name="arrowRight" size={15} color={canNext ? '#fff' : T.fg3}/>
            </button>
          ) : (
            <button onClick={onClose} style={{
              height: 38, padding: '0 16px', borderRadius: 10,
              background: T.surfS, color: T.fg, border: `1px solid ${T.border2}`,
              cursor: 'pointer', fontSize: 13, fontWeight: 500,
            }}>Run in background</button>
          )}
        </div>
      </div>
    </div>
  );
};

window.LaunchModal = LaunchModal;
