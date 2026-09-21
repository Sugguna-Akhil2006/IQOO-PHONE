import { useState, useEffect, useRef } from 'react';
import { 
  Wifi, Battery, Signal, 
  BrainCircuit, SearchCode, History, Settings, Home as HomeIcon,
  Scan, ChevronRight, User, Lock, Globe, ChevronLeft, FileCode, CheckCircle2, GitBranch, Laptop, ExternalLink, Send, Smartphone, ArrowDown, FolderGit2, Network, Cpu, ShieldCheck, ChevronDown, ChevronUp, Waypoints, Camera, CameraOff, Search, GitPullRequest, CircleAlert
} from 'lucide-react';

const DEMO = {
  repo: 'squid-vibes-hub',
  file: 'avatar.tsx',
  symbol: 'Avatar()',
  lines: 'L6–L15',
  commit: 'a9a3ca3',
  commitMsg: '[skip lovable] Use tech stack vite_react_shadcn_ts',
  author: 'gpt-engineer-app[bot]',
  date: 'Oct 31, 2025',
  added: 38,
  filesInCommit: 76,
  answer: 'Avatar() came in with the project’s initial Vite + React + shadcn/ui scaffold. It wraps the Radix Avatar primitive.',
  fact: 'Introduced in commit a9a3ca3 (“Use tech stack vite_react_shadcn_ts”), together with 75 other files. No later commit has changed this file.',
  interpretation: 'The commit sets up the tech stack, so Avatar most likely comes from the shadcn/ui starter rather than being written for a specific feature.',
  unknown: 'The history does not say whether the app relies on Avatar on purpose or just inherited it.',
  diff: [
    '@@ -0,0 +1,38 @@',
    '+import * as AvatarPrimitive from "@radix-ui/react-avatar";',
    '+',
    '+const Avatar = React.forwardRef<',
    '+  React.ElementRef<typeof AvatarPrimitive.Root>,',
    '+  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>',
    '+>(({ className, ...props }, ref) => (',
    '+  <AvatarPrimitive.Root',
    '+    ref={ref}',
    '+    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}',
    '+    {...props}',
    '+  />',
    '+));',
    '+',
    '+const AvatarImage = React.forwardRef(...)',
    '+const AvatarFallback = React.forwardRef(...)',
    '+export { Avatar, AvatarImage, AvatarFallback };',
  ],
};

interface Memory {
  id: string;
  title: string;
  repo: string;
  summary: string;
  chain: { kind: 'issue' | 'pr' | 'commit'; label: string }[];
  icon: 'user' | 'lock' | 'globe';
  action?: boolean;
}

const MEMORIES: Memory[] = [
  {
    id: 'avatar',
    title: 'Avatar component',
    repo: 'squid-vibes-hub',
    summary: 'Added with the initial shadcn/ui starter scaffold. No later changes.',
    chain: [{ kind: 'commit', label: 'a9a3ca3' }],
    icon: 'user',
    action: true,
  },
  {
    id: 'retry-409',
    title: 'Retry on 409 conflicts',
    repo: 'gateway-service',
    summary: 'Duplicate charges appeared during network retry storms, so the client now backs off exponentially when it gets a 409.',
    chain: [{ kind: 'issue', label: '#67' }, { kind: 'pr', label: '#45' }, { kind: 'commit', label: 'a1b2c3d' }],
    icon: 'globe',
  },
  {
    id: 'token-jitter',
    title: 'Token refresh jitter',
    repo: 'gateway-service',
    summary: 'All pods refreshed tokens at the same second and flooded the auth endpoint. Renewal now uses random jitter.',
    chain: [{ kind: 'issue', label: '#42' }, { kind: 'pr', label: '#48' }, { kind: 'commit', label: 'b2c3d4e' }],
    icon: 'lock',
  },
  {
    id: 'timeouts',
    title: 'Default gateway timeouts',
    repo: 'gateway-service',
    summary: 'Default timeout and retry settings were added for the payment gateway. No linked PR or issue was found.',
    chain: [{ kind: 'commit', label: 'c3d4e5f' }],
    icon: 'globe',
  },
];

const MemoryIcon = ({ kind }: { kind: Memory['icon'] }) =>
  kind === 'user' ? <User size={18} /> : kind === 'lock' ? <Lock size={18} /> : <Globe size={18} />;

const ChainChips = ({ chain }: { chain: Memory['chain'] }) => (
  <div className="chain">
    {chain.map((c, i) => (
      <span key={c.label} className={`chain-chip ${c.kind}`}>
        {c.kind === 'issue' ? <CircleAlert size={11} /> : c.kind === 'pr' ? <GitPullRequest size={11} /> : <GitBranch size={11} />}
        {c.label}
        {i < chain.length - 1 && <ChevronRight size={11} className="chain-sep" />}
      </span>
    ))}
  </div>
);

const SCAN_FLOW = ['scan', 'reasoning', 'evidence', 'full-history', 'diff-view', 'commit', 'handoff', 'architecture', 'local-ai'];
const navTab = (tab: string) => (SCAN_FLOW.includes(tab) ? 'scan' : tab);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [openMemory, setOpenMemory] = useState<string | null>(null);
  const current = navTab(activeTab);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-container">
      {/* Top Status Area */}
      <div className="status-bar">
        <div className="time">{time}</div>
        <div className="status-icons">
          <Signal size={14} />
          <Wifi size={14} />
          <Battery size={14} />
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="logo">
          <BrainCircuit size={20} className="logo-icon" />
          DevMemory
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button className="restart-btn" onClick={() => { setOpenMemory(null); setActiveTab('home'); }}>Restart demo</button>
          <div className="user-profile">
            <div className="status-indicator"></div>
            tejus468
          </div>
        </div>
      </header>
      <div style={{background: 'var(--accent)', color: '#fff', fontSize: '10px', textAlign: 'center', padding: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600}}>Prototype • Historical memory demo</div>

      {/* Main Content Area */}
      <main className="content">
        {activeTab === 'home' && <HomeScreen setActiveTab={setActiveTab} onOpenMemory={(id) => { setOpenMemory(id); setActiveTab('memory'); }} />}
        {activeTab === 'scan' && <ScanScreen setActiveTab={setActiveTab} />}
        {activeTab === 'memory' && <MemoryScreen setActiveTab={setActiveTab} initialOpen={openMemory} />}
        {activeTab === 'settings' && <SettingsScreen />}
        {activeTab === 'reasoning' && <ReasoningScreen setActiveTab={setActiveTab} />}
        {activeTab === 'evidence' && <EvidenceScreen setActiveTab={setActiveTab} />}
        {activeTab === 'full-history' && <SymbolHistoryScreen setActiveTab={setActiveTab} />}
        {activeTab === 'diff-view' && <DiffScreen setActiveTab={setActiveTab} />}
        {activeTab === 'commit' && <CommitScreen setActiveTab={setActiveTab} />}
        {activeTab === 'handoff' && <HandoffScreen setActiveTab={setActiveTab} />}
        {activeTab === 'desktop' && <DesktopPreviewScreen setActiveTab={setActiveTab} />}
        {activeTab === 'architecture' && <ArchitectureScreen setActiveTab={setActiveTab} />}
        {activeTab === 'local-ai' && <LocalAiScreen setActiveTab={setActiveTab} />}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className={`nav-item ${current === 'home' ? 'active' : ''}`} aria-current={current === 'home' ? 'page' : undefined} onClick={() => setActiveTab('home')}>
          <HomeIcon size={22} className="nav-icon" />
          Home
        </button>
        <button className={`nav-item ${current === 'scan' ? 'active' : ''}`} aria-current={current === 'scan' ? 'page' : undefined} onClick={() => setActiveTab('scan')}>
          <Scan size={22} className="nav-icon" />
          Scan
        </button>
        <button className={`nav-item ${current === 'memory' ? 'active' : ''}`} aria-current={current === 'memory' ? 'page' : undefined} onClick={() => setActiveTab('memory')}>
          <History size={22} className="nav-icon" />
          Memory
        </button>
        <button className={`nav-item ${current === 'settings' ? 'active' : ''}`} aria-current={current === 'settings' ? 'page' : undefined} onClick={() => setActiveTab('settings')}>
          <Settings size={22} className="nav-icon" />
          Settings
        </button>
      </nav>
    </div>
  );
}

function HomeScreen({ setActiveTab, onOpenMemory }: { setActiveTab: (tab: string) => void; onOpenMemory: (id: string) => void }) {
  return (
    <>
      <div className="greeting">
        <h1>Your code remembers.</h1>
      </div>

      <div className="card primary" role="button" tabIndex={0} onClick={() => setActiveTab('scan')} onKeyDown={(e) => { if (e.key === 'Enter') setActiveTab('scan'); }}>
        <div className="card-title">
          <Scan size={20} />
          Scan Code
        </div>
        <div className="card-subtitle">
          Point your camera at unfamiliar code to reveal its history.
        </div>
        <button className="btn" onClick={(e) => { e.stopPropagation(); setActiveTab('scan'); }}>
          Start Scan
        </button>
      </div>

      <div className="card" role="button" tabIndex={0} onClick={() => setActiveTab('memory')} onKeyDown={(e) => { if (e.key === 'Enter') setActiveTab('memory'); }}>
        <div className="card-title">
          <SearchCode size={20} />
          Ask DevMemory
        </div>
        <div className="card-subtitle">
          Browse and search the history behind your code.
        </div>
      </div>

      <div className="recent-memories">
        <div className="section-title">
          <History size={16} />
          Recent Memories
        </div>
        <div className="memory-list">
          {MEMORIES.slice(0, 3).map((m) => (
            <button key={m.id} className="memory-item memory-button" onClick={() => onOpenMemory(m.id)}>
              <div className="memory-icon"><MemoryIcon kind={m.icon} /></div>
              <div className="memory-content">
                <h4>{m.title}</h4>
                <p>{m.repo}</p>
              </div>
              <ChevronRight size={16} color="var(--text-muted)" style={{marginLeft: 'auto', alignSelf: 'center'}} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function ScanScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraOn(false);
  };

  useEffect(() => stopCamera, []);

  const toggleCamera = async () => {
    if (cameraOn) return stopCamera();
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      setCameraOn(true);
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
    } catch {
      setCameraError('Camera unavailable. Showing the sample snippet instead.');
    }
  };

  const handleScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('success');
    }, 1500);
  };

  return (
    <>
      <div className="screen-header">
        <button className="back-btn" onClick={() => setActiveTab('home')}>
          <ChevronLeft size={20} />
        </button>
        <div className="screen-title">
          <h2>Scan Code</h2>
          <p>Find the memory behind this code</p>
        </div>
      </div>

      <div className="scanner-container">
        {cameraOn && <video ref={videoRef} className="scanner-video" autoPlay playsInline muted />}
        <div className="scanner-frame"></div>
        <div className={`scanner-line ${scanState === 'scanning' ? 'active' : ''}`}></div>
        
        <div className="code-snippet" style={cameraOn ? { display: 'none' } : undefined}>
          <span className="code-keyword">const</span> <span className="code-component">Avatar</span> = React.<span className="code-property">forwardRef</span>&lt;{'\n'}
          {'  '}React.<span className="code-component">ElementRef</span>&lt;<span className="code-keyword">typeof</span> AvatarPrimitive.<span className="code-property">Root</span>&gt;,{'\n'}
          {'  '}React.<span className="code-component">ComponentPropsWithoutRef</span>&lt;<span className="code-keyword">typeof</span> AvatarPrimitive.<span className="code-property">Root</span>&gt;{'\n'}
          &gt;((&#123; className, ...props &#125;, ref) =&gt; ({'\n'}
          {'  '}&lt;<span className="code-component">AvatarPrimitive.Root</span>{'\n'}
          {'    '}ref=&#123;ref&#125;{'\n'}
          {'    '}className=&#123;<span className="code-property">cn</span>(<span className="code-string">"relative flex h-10 w-10"</span>, className)&#125;{'\n'}
          {'    '}&#123;...props&#125;{'\n'}
          {'  '}/&gt;{'\n'}
          ));
        </div>
      </div>

      {scanState === 'idle' && (
        <button className="btn" onClick={handleScan}>
          Identify Code
        </button>
      )}

      {scanState === 'scanning' && (
        <button className="btn" disabled style={{ opacity: 0.7 }}>
          Analyzing code...
        </button>
      )}

      {scanState === 'success' && (
        <div className="scan-result-card">
          <div className="result-header">
            <CheckCircle2 size={18} />
            Code Identified
          </div>
          <div className="result-details">
            <div className="detail-item">
              <GitBranch size={16} className="detail-icon" />
              <div className="detail-text">
                <span className="detail-label">Repository</span>
                <span className="detail-value">{DEMO.repo}</span>
              </div>
            </div>
            <div className="detail-item">
              <FileCode size={16} className="detail-icon" />
              <div className="detail-text">
                <span className="detail-label">File</span>
                <span className="detail-value">avatar.tsx</span>
              </div>
            </div>
            <div className="detail-item">
              <Scan size={16} className="detail-icon" />
              <div className="detail-text">
                <span className="detail-label">Symbol</span>
                <span className="detail-value">Avatar()</span>
              </div>
            </div>
            <div className="detail-item">
              <BrainCircuit size={16} className="detail-icon" />
              <div className="detail-text">
                <span className="detail-label">Type</span>
                <span className="detail-value">React component</span>
              </div>
            </div>
            <div className="detail-item">
              <FolderGit2 size={16} className="detail-icon" />
              <div className="detail-text">
                <span className="detail-label">Lines</span>
                <span className="detail-value">{DEMO.lines}</span>
              </div>
            </div>
            <div className="detail-item">
              <History size={16} className="detail-icon" />
              <div className="detail-text">
                <span className="detail-label">Historical memory</span>
                <span className="detail-value" style={{ color: '#10b981' }}>Available</span>
              </div>
            </div>
          </div>
          <button className="btn" onClick={() => setActiveTab('reasoning')}>
            <BrainCircuit size={18} />
            Why does this exist?
          </button>
        </div>
      )}

      <div className="scan-tools">
        <button className="btn-secondary scan-camera" onClick={toggleCamera}>
          {cameraOn ? <CameraOff size={16} /> : <Camera size={16} />}
          {cameraOn ? 'Turn camera off' : 'Use camera'}
        </button>
        {cameraError && <p className="settings-note">{cameraError}</p>}
        <p className="settings-note">Prototype: code recognition is simulated with a sample snippet.</p>
      </div>
    </>
  );
}

function MemoryScreen({ setActiveTab, initialOpen }: { setActiveTab: (tab: string) => void; initialOpen: string | null }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(initialOpen);
  const q = query.trim().toLowerCase();
  const shown = MEMORIES.filter((m) => !q || `${m.title} ${m.repo} ${m.summary} ${m.chain.map((c) => c.label).join(' ')}`.toLowerCase().includes(q));

  return (
    <>
      <div className="screen-title" style={{ marginBottom: '-8px' }}>
        <h2>Developer Memory</h2>
        <p>{MEMORIES.length} memories from {new Set(MEMORIES.map((m) => m.repo)).size} repositories</p>
      </div>

      <label className="search-box">
        <Search size={16} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search memories, commits, PRs…" aria-label="Search memories" />
      </label>

      {shown.length === 0 && <p className="empty-note">No memory matches “{query}”.</p>}

      <div className="memory-list">
        {shown.map((m) => {
          const isOpen = open === m.id;
          return (
            <div key={m.id} className="memory-card">
              <button className="memory-item memory-button" onClick={() => setOpen(isOpen ? null : m.id)} aria-expanded={isOpen}>
                <div className="memory-icon"><MemoryIcon kind={m.icon} /></div>
                <div className="memory-content">
                  <h4>{m.title}</h4>
                  <p>{m.repo}</p>
                </div>
                {isOpen ? <ChevronUp size={16} color="var(--text-muted)" style={{ marginLeft: 'auto', alignSelf: 'center' }} /> : <ChevronDown size={16} color="var(--text-muted)" style={{ marginLeft: 'auto', alignSelf: 'center' }} />}
              </button>
              {isOpen && (
                <div className="memory-detail">
                  <ChainChips chain={m.chain} />
                  <p>{m.summary}</p>
                  {m.action && (
                    <button className="btn-secondary" onClick={() => setActiveTab('reasoning')}>
                      <BrainCircuit size={16} /> Why does this exist?
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function SettingsScreen() {
  const [mode, setMode] = useState<'local' | 'cloud'>('local');
  const [keepOnDevice, setKeepOnDevice] = useState(true);

  return (
    <>
      <div className="screen-title" style={{ marginBottom: '-8px' }}>
        <h2>Settings</h2>
        <p>Prototype preferences</p>
      </div>

      <div className="settings-group">
        <div className="settings-label">Default reasoning</div>
        <div className="mode-selector">
          <button className={`mode-btn ${mode === 'local' ? 'active' : ''}`} onClick={() => setMode('local')}>Local</button>
          <button className={`mode-btn ${mode === 'cloud' ? 'active' : ''}`} onClick={() => setMode('cloud')}>Cloud</button>
        </div>
        <p className="settings-note">
          {mode === 'local' ? 'Concept: a Gemma model on the phone explains code using retrieved history.' : 'Uses the DevMemory backend to explain code using retrieved history.'}
        </p>
      </div>

      <div className="settings-group">
        <div className="settings-row">
          <div>
            <div className="settings-title">Keep code on device</div>
            <div className="settings-note">Concept: keep source code on the phone and send only commit and PR metadata.</div>
          </div>
          <button role="switch" aria-checked={keepOnDevice} aria-label="Keep code on device" className={`toggle ${keepOnDevice ? 'on' : ''}`} onClick={() => setKeepOnDevice(!keepOnDevice)}>
            <span />
          </button>
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-label">Indexed repositories</div>
        {['squid-vibes-hub', 'gateway-service'].map((r) => (
          <div key={r} className="settings-row">
            <div className="settings-title"><FolderGit2 size={15} /> {r}</div>
            <span className="settings-badge">Indexed</span>
          </div>
        ))}
      </div>

      <div className="settings-group">
        <div className="settings-row">
          <div>
            <div className="settings-title">Desktop companion</div>
            <div className="settings-note">Hand an investigation off to DevMemory Desktop.</div>
          </div>
          <span className="settings-badge muted">Prototype</span>
        </div>
      </div>
    </>
  );
}

function ReasoningScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [reasoningMode, setReasoningMode] = useState('local');

  return (
    <>
      <div className="screen-header">
        <button className="back-btn" onClick={() => setActiveTab('scan')}>
          <ChevronLeft size={20} />
        </button>
        <div className="screen-title">
          <h2>Why does this exist?</h2>
          <p>{DEMO.symbol} · {DEMO.file}</p>
        </div>
      </div>

      <div className="memory-status">
        <div className="status-dot"></div>
        <div className="status-text" style={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>DEV MEMORY FOUND</div>
      </div>

      <div className="mode-selector">
        <button className={`mode-btn ${reasoningMode === 'local' ? 'active' : ''}`} onClick={() => setReasoningMode('local')}>
          Local
        </button>
        <button className={`mode-btn ${reasoningMode === 'cloud' ? 'active' : ''}`} onClick={() => setReasoningMode('cloud')}>
          Cloud
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        {reasoningMode === 'local' ? (
          <>
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>On-device reasoning</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Uses retrieved historical context</div>
          </>
        ) : (
          <>
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Cloud reasoning</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Uses the DevMemory backend</div>
          </>
        )}
      </div>

      <div className="ai-status-card">
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#10b981', letterSpacing: '0.5px', marginBottom: '12px' }}>AI REASONING</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
          <span style={{ fontWeight: 500 }}>Local reasoning</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>(Gemma-based model)</span>
        </div>
        <div style={{ fontSize: '13px', marginBottom: '12px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Status: </span>
          <span style={{ color: '#f59e0b' }}>Concept · not yet on device</span>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          Planned on-device model: DevMemory retrieves historical evidence first. The local model uses that evidence to explain why the code exists.
        </div>
        <button className="btn-secondary" style={{ marginTop: '16px', padding: '8px', fontSize: '13px' }} onClick={() => setActiveTab('architecture')}>
          <Waypoints size={16} /> Show how DevMemory reasoned
        </button>
      </div>

      <div className="answer-section">
        <h3 className="answer-heading">Why {DEMO.symbol} exists</h3>
        <p className="answer-text">{DEMO.answer}</p>
      </div>

      <div className="analysis-blocks">
        <div className="analysis-block fact">
          <div className="block-label" style={{ textTransform: 'uppercase' }}><CheckCircle2 size={14}/> Fact</div>
          <div className="block-content">
            {DEMO.fact}
          </div>
        </div>

        <div className="analysis-block interpretation">
          <div className="block-label" style={{ textTransform: 'uppercase' }}><BrainCircuit size={14}/> Interpretation</div>
          <div className="block-content">
            {DEMO.interpretation}
          </div>
        </div>

        <div className="analysis-block unknown">
          <div className="block-label" style={{ textTransform: 'uppercase' }}><SearchCode size={14}/> Unknown</div>
          <div className="block-content">
            {DEMO.unknown}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px' }}>
        3 pieces of evidence
      </div>

      <div className="action-group" style={{marginBottom: '40px'}}>
        <button className="btn" onClick={() => setActiveTab('evidence')}>
          <SearchCode size={18} />
          View Evidence
        </button>
        <button className="btn-secondary" onClick={() => setActiveTab('architecture')}>
          <Waypoints size={18} />
          How did DevMemory reason?
        </button>
        <button className="btn-secondary" onClick={() => setActiveTab('handoff')} style={{ marginTop: '16px' }}>
          <Laptop size={18} />
          Open on Laptop
        </button>
      </div>
    </>
  );
}

function EvidenceScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <>
      <div className="screen-header">
        <button className="back-btn" onClick={() => setActiveTab('reasoning')}>
          <ChevronLeft size={20} />
        </button>
        <div className="screen-title">
          <h2>Historical Evidence</h2>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="detail-item" style={{ marginBottom: '16px' }}>
          <GitBranch size={16} className="detail-icon" />
          <div className="detail-text">
            <span className="detail-label">Commit</span>
            <span className="detail-value">a9a3ca3</span>
          </div>
        </div>
        <div className="detail-item" style={{ marginBottom: '16px' }}>
          <FileCode size={16} className="detail-icon" />
          <div className="detail-text">
            <span className="detail-label">File</span>
            <span className="detail-value">avatar.tsx</span>
          </div>
        </div>
        <div className="detail-item">
          <Scan size={16} className="detail-icon" />
          <div className="detail-text">
            <span className="detail-label">Symbol</span>
            <span className="detail-value">Avatar()</span>
          </div>
        </div>
      </div>

      <div className="evidence-header" style={{color: 'var(--accent)', marginBottom: '16px'}}>
        Evidence sources
      </div>

      <div className="card" style={{marginBottom: '16px'}}>
        <div className="card-title"><GitBranch size={16} /> 1. COMMIT</div>
        <div className="timeline-time" style={{margin: '8px 0'}}>a9a3ca3</div>
        <div className="card-subtitle" style={{marginBottom: '16px'}}>{DEMO.commitMsg} · {DEMO.author}</div>
        <button className="btn-secondary" onClick={() => setActiveTab('commit')}>View commit</button>
      </div>

      <div className="card" style={{marginBottom: '16px'}}>
        <div className="card-title"><FileCode size={16} /> 2. DIFF</div>
        <div className="timeline-time" style={{margin: '8px 0'}}>avatar.tsx</div>
        <div className="card-subtitle" style={{marginBottom: '16px'}}>+{DEMO.added} lines: Avatar, AvatarImage and AvatarFallback</div>
        <button className="btn-secondary" onClick={() => setActiveTab('diff-view')}>View diff</button>
      </div>

      <div className="card" style={{marginBottom: '24px'}}>
        <div className="card-title"><History size={16} /> 3. SYMBOL HISTORY</div>
        <div className="timeline-time" style={{margin: '8px 0'}}>Avatar()</div>
        <div className="card-subtitle" style={{marginBottom: '16px'}}>First introduced in {DEMO.commit}, unchanged since</div>
        <button className="btn-secondary" onClick={() => setActiveTab('full-history')}>View history</button>
      </div>

      <div className="action-group" style={{marginBottom: '40px'}}>
        <button className="btn" onClick={() => setActiveTab('handoff')}>
          <Laptop size={18} />
          Open on Laptop
        </button>
      </div>
    </>
  );
}

function SymbolHistoryScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <>
      <div className="screen-header">
        <button className="back-btn" onClick={() => setActiveTab('evidence')}>
          <ChevronLeft size={20} />
        </button>
        <div className="screen-title">
          <h2>Avatar() history</h2>
          <p>React component · {DEMO.file} · {DEMO.repo}</p>
        </div>
      </div>

      <div className="timeline" style={{marginTop: '24px'}}>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <div className="timeline-time">{DEMO.commit} · {DEMO.date}</div>
            <div className="timeline-desc">Introduced by {DEMO.author}</div>
          </div>
        </div>
        <div className="timeline-item" style={{opacity: 0.7}}>
          <div className="timeline-dot" style={{borderColor: 'var(--text-muted)'}}></div>
          <div className="timeline-content">
            <div className="timeline-time" style={{color: 'var(--text-muted)'}}>Current</div>
            <div className="timeline-desc">No later commits touch this file</div>
          </div>
        </div>
      </div>
    </>
  );
}

function CommitScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [showToast, setShowToast] = useState(false);
  const handleGithub = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <div className="screen-header">
        <button className="back-btn" onClick={() => setActiveTab('evidence')}>
          <ChevronLeft size={20} />
        </button>
        <div className="screen-title">
          <h2>{DEMO.commit}</h2>
          <p>{DEMO.commitMsg}</p>
        </div>
      </div>

      <div className="card" style={{marginBottom: '24px'}}>
        <div className="detail-item" style={{marginBottom: '12px'}}>
          <FileCode size={16} className="detail-icon" />
          <div className="detail-text">
            <span className="detail-label">Changed</span>
            <span className="detail-value">avatar.tsx</span>
          </div>
        </div>
        <div className="detail-item">
          <BrainCircuit size={16} className="detail-icon" />
          <div className="detail-text">
            <span className="detail-label">Technical summary</span>
            <span className="detail-value" style={{fontSize: '13px', lineHeight: '1.5', marginTop: '4px'}}>Part of a {DEMO.filesInCommit}-file commit by {DEMO.author} on {DEMO.date}. Adds Avatar, AvatarImage and AvatarFallback around Radix primitives.</span>
          </div>
        </div>
      </div>

      <div className="timeline" style={{marginBottom: '32px'}}>
        <div className="timeline-item" style={{opacity: 0.7}}>
          <div className="timeline-dot" style={{borderColor: 'var(--text-muted)'}}></div>
          <div className="timeline-content">
            <div className="timeline-time" style={{color: 'var(--text-muted)'}}>Before</div>
            <div className="timeline-desc">No Avatar component</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <div className="timeline-time">a9a3ca3</div>
            <div className="timeline-desc">Avatar introduced</div>
          </div>
        </div>
        <div className="timeline-item" style={{opacity: 0.7}}>
          <div className="timeline-dot" style={{borderColor: 'var(--text-muted)'}}></div>
          <div className="timeline-content">
            <div className="timeline-time" style={{color: 'var(--text-muted)'}}>Since</div>
            <div className="timeline-desc">File unchanged</div>
          </div>
        </div>
      </div>

      <button className="btn" onClick={handleGithub}>
        <ExternalLink size={18} />
        Open GitHub commit
      </button>

      {showToast && (
        <div className="laptop-toast" style={{background: '#6366f1'}}>
          <span>GitHub handoff</span>
          <span className="laptop-toast-sub">Ready to open commit {DEMO.commit} on GitHub.</span>
        </div>
      )}
    </>
  );
}

function DiffScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <>
      <div className="screen-header">
        <button className="back-btn" onClick={() => setActiveTab('evidence')}>
          <ChevronLeft size={20} />
        </button>
        <div className="screen-title">
          <h2>Commit {DEMO.commit}</h2>
          <p>{DEMO.file}</p>
        </div>
      </div>

      <div className="analysis-blocks">
        <div className="analysis-block fact">
          <div className="block-label"><CheckCircle2 size={14}/> Historical fact</div>
          <div className="block-content">
            The whole file was added in this commit: +{DEMO.added} lines, nothing removed.
          </div>
        </div>
        <div className="analysis-block interpretation">
          <div className="block-label"><BrainCircuit size={14}/> Supports this interpretation</div>
          <div className="block-content">
            Standard Radix wrapper code with the usual forwardRef and cn() pattern, typical of a starter template.
          </div>
        </div>
      </div>

      <div className="diff-view">
        {DEMO.diff.map((line, i) => (
          <div key={i} className={`diff-line ${line.startsWith('@@') ? 'diff-context' : 'diff-add'}`}>{line}</div>
        ))}
      </div>
    </>
  );
}

function HandoffScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleSend = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 1500);
  };

  return (
    <>
      <div className="screen-header">
        <button className="back-btn" onClick={() => setActiveTab('reasoning')}>
          <ChevronLeft size={20} />
        </button>
        <div className="screen-title">
          <h2>Open on Laptop</h2>
        </div>
      </div>

      <div className="handoff-container">
        <div className="handoff-icon">
          <div className="icon-wrapper"><Smartphone size={32} /></div>
          {connecting ? (
            <ArrowDown className="handoff-arrow" style={{ transform: 'rotate(-90deg)' }} size={24} />
          ) : (
            <ChevronRight size={24} style={{ opacity: 0.3 }} />
          )}
          <div className="icon-wrapper" style={{ borderColor: connected ? '#10b981' : 'var(--border)' }}>
            <Laptop size={32} color={connected ? '#10b981' : 'var(--accent)'} />
          </div>
        </div>

        {!connecting && !connected && (
          <>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Send historical context to your development workspace.</h3>
            <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>
              <p>Avatar()</p>
              <p>avatar.tsx</p>
              <p>Commit a9a3ca3</p>
            </div>
            
            <div className="card" style={{ width: '100%', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px' }}>
                <Laptop size={20} /> DevMemory Desktop
              </div>
            </div>

            <button className="btn" onClick={handleSend}>
              <Send size={18} />
              Send to Laptop
            </button>
          </>
        )}

        {connecting && (
          <>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Connecting to DevMemory Desktop...</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Sending historical context</p>
          </>
        )}

        {connected && (
          <>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#10b981' }}>Laptop connected</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>Investigation ready</p>
            
            <button className="btn" onClick={() => setActiveTab('desktop')}>
              Continue on Laptop
            </button>
          </>
        )}
      </div>
    </>
  );
}

function DesktopPreviewScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
      <div className="desktop-preview">
        <div className="desktop-sidebar">
          <div className="desktop-sidebar-title">
            <BrainCircuit size={20} className="logo-icon" />
            DevMemory
          </div>
          
          <div className="desktop-nav-item active"><History size={16}/> Investigation</div>
          <div className="desktop-nav-item"><SearchCode size={16}/> Codebase</div>
          <div className="desktop-nav-item"><Settings size={16}/> Settings</div>
          
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: '#18181b', padding: '16px', borderRadius: '12px', border: '1px solid #27272a' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#10b981', marginBottom: '8px', fontWeight: 600 }}>Investigation transferred</div>
              <div style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '4px' }}>Repository: squid-vibes-hub</div>
              <div style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '16px' }}>Symbol: Avatar()</div>
              <div style={{ fontSize: '13px', color: '#a1a1aa', display: 'flex', justifyContent: 'space-between' }}>
                <span>1 commit</span><span>1 file</span><span>3 signals</span>
              </div>
            </div>
            <button className="btn-secondary" onClick={() => setActiveTab('handoff')}>
              <Smartphone size={16}/> Back to Phone
            </button>
          </div>
        </div>
        
        <div className="desktop-main">
          <div className="desktop-content">
            <div className="desktop-header">
              <div className="desktop-breadcrumb">
                <FolderGit2 size={14}/> squid-vibes-hub <ChevronRight size={14}/> avatar.tsx
              </div>
              <h1 className="desktop-title">Avatar()</h1>
              <p style={{ color: '#a1a1aa' }}>Historical context received from phone</p>
            </div>
            
            <div className="desktop-summary">
              <div className="desktop-title"><BrainCircuit size={16} style={{display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px'}}/> Why does this exist?</div>
              <div style={{ fontSize: '15px', lineHeight: '1.6' }}>
                {DEMO.answer}
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                <div style={{ flex: 1, padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Fact</div>
                  <div style={{ fontSize: '13px' }}>{DEMO.fact}</div>
                </div>
                <div style={{ flex: 1, padding: '16px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Interpretation</div>
                  <div style={{ fontSize: '13px' }}>{DEMO.interpretation}</div>
                </div>
                <div style={{ flex: 1, padding: '16px', background: 'rgba(100, 116, 139, 0.1)', border: '1px solid rgba(100, 116, 139, 0.2)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Unknown</div>
                  <div style={{ fontSize: '13px' }}>{DEMO.unknown}</div>
                </div>
              </div>
            </div>
            
            <div className="desktop-card">
              <div className="desktop-card-title"><SearchCode size={16} style={{display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px'}}/> Evidence</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', border: '1px solid #27272a', borderRadius: '8px' }}>
                  <GitBranch size={16} color="#a1a1aa"/>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500 }}>Commit a9a3ca3</div>
                    <div style={{ fontSize: '12px', color: '#a1a1aa' }}>Avatar component introduced</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', border: '1px solid #27272a', borderRadius: '8px' }}>
                  <FileCode size={16} color="#a1a1aa"/>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500 }}>avatar.tsx diff</div>
                    <div style={{ fontSize: '12px', color: '#a1a1aa' }}>Added Radix Avatar wrapper and fallback components</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', border: '1px solid #27272a', borderRadius: '8px' }}>
                  <History size={16} color="#a1a1aa"/>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500 }}>Symbol history</div>
                    <div style={{ fontSize: '12px', color: '#a1a1aa' }}>First introduced in a9a3ca3</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <>
      <div className="screen-header">
        <button className="back-btn" onClick={() => setActiveTab('reasoning')}>
          <ChevronLeft size={20} />
        </button>
        <div className="screen-title">
          <h2>How DevMemory Reasoned</h2>
          <p>Concept • on-device AI</p>
        </div>
      </div>

      <div className="pipeline-container">
        <div className="pipeline-item">
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>1. CODE</div>
          <div style={{ fontWeight: 500 }}>Avatar()</div>
        </div>
        <div className="pipeline-arrow"><ArrowDown size={20}/></div>
        
        <div className="pipeline-item">
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>2. IDENTIFY</div>
          <div style={{ fontWeight: 500 }}>squid-vibes-hub</div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>avatar.tsx</div>
        </div>
        <div className="pipeline-arrow"><ArrowDown size={20}/></div>

        <div className="pipeline-item">
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>3. RETRIEVE MEMORY</div>
          <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>Commit a9a3ca3</span>
            <span>avatar.tsx diff</span>
            <span>Radix Avatar primitives</span>
          </div>
        </div>
        <div className="pipeline-arrow"><ArrowDown size={20}/></div>

        <div className="pipeline-item" style={{ borderColor: '#10b981', background: 'rgba(16, 185, 129, 0.05)' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#10b981', marginBottom: '8px' }}>4. LOCAL AI</div>
          <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Cpu size={16}/> Gemma</div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>"Reason over evidence"</div>
        </div>
        <div className="pipeline-arrow"><ArrowDown size={20}/></div>

        <div className="pipeline-item">
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', marginBottom: '8px' }}>5. ANSWER</div>
          <div style={{ fontSize: '14px', lineHeight: '1.5' }}>“{DEMO.answer}”</div>
        </div>
      </div>

      <button className="btn" onClick={() => setActiveTab('local-ai')} style={{ marginTop: '16px', marginBottom: '24px' }}>
        <Cpu size={18} />
        On-device AI
      </button>
    </>
  );
}

function LocalAiScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <>
      <div className="screen-header">
        <button className="back-btn" onClick={() => setActiveTab('architecture')}>
          <ChevronLeft size={20} />
        </button>
        <div className="screen-title">
          <h2>On-device AI</h2>
          <p>Concept • on-device AI</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px', marginTop: '16px' }}>
        <div className="detail-item" style={{ marginBottom: '16px' }}>
          <Cpu size={16} className="detail-icon" />
          <div className="detail-text">
            <span className="detail-label">Model</span>
            <span className="detail-value">Gemma</span>
          </div>
        </div>
        <div className="detail-item" style={{ marginBottom: '16px' }}>
          <BrainCircuit size={16} className="detail-icon" />
          <div className="detail-text">
            <span className="detail-label">Purpose</span>
            <span className="detail-value">Historical code reasoning</span>
          </div>
        </div>
        <div className="detail-item" style={{ marginBottom: '16px' }}>
          <Network size={16} className="detail-icon" />
          <div className="detail-text">
            <span className="detail-label">Input</span>
            <span className="detail-value">Retrieved DevMemory evidence</span>
          </div>
        </div>
        <div className="detail-item">
          <CheckCircle2 size={16} className="detail-icon" />
          <div className="detail-text">
            <span className="detail-label">Output</span>
            <span className="detail-value">Evidence-grounded explanation</span>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <ShieldCheck size={20} color="#3b82f6" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '13px', color: '#bfdbfe', lineHeight: '1.5' }}>
          Code context can be processed locally on supported devices.
        </div>
      </div>

      <div className="expandable-section">
        <div className="expandable-header" onClick={() => setExpanded(!expanded)}>
          <span>Why local AI?</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {expanded && (
          <div className="expandable-body">
            Developer source code can contain sensitive information. On-device reasoning is designed to reduce unnecessary transmission of code context.
          </div>
        )}
      </div>
    </>
  );
}
