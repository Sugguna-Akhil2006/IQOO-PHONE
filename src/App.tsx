import { useState, useEffect } from 'react';
import { 
  Wifi, Battery, Signal, 
  BrainCircuit, SearchCode, History, Settings, Home as HomeIcon,
  Scan, ChevronRight, User, Lock, Globe, ChevronLeft, FileCode, CheckCircle2, GitBranch, Laptop, ExternalLink, Send, Smartphone, ArrowDown, FolderGit2, Network, Cpu, ShieldCheck, ChevronDown, ChevronUp, Waypoints
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
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
          <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '12px', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>Restart Demo</button>
          <div className="user-profile">
            <div className="status-indicator"></div>
            tejus468
          </div>
        </div>
      </header>
      <div style={{background: 'var(--accent)', color: '#fff', fontSize: '10px', textAlign: 'center', padding: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600}}>Prototype • Historical memory demo</div>

      {/* Main Content Area */}
      <main className="content">
        {activeTab === 'home' && <HomeScreen setActiveTab={setActiveTab} />}
        {activeTab === 'scan' && <ScanScreen setActiveTab={setActiveTab} />}
        {activeTab === 'memory' && <MemoryScreen />}
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
        <button className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
          <HomeIcon size={22} className="nav-icon" />
          Home
        </button>
        <button className={`nav-item ${activeTab === 'scan' ? 'active' : ''}`} onClick={() => setActiveTab('scan')}>
          <Scan size={22} className="nav-icon" />
          Scan
        </button>
        <button className={`nav-item ${activeTab === 'memory' ? 'active' : ''}`} onClick={() => setActiveTab('memory')}>
          <History size={22} className="nav-icon" />
          Memory
        </button>
        <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
          <Settings size={22} className="nav-icon" />
          Settings
        </button>
      </nav>
    </div>
  );
}

function HomeScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <>
      <div className="greeting">
        <h1>Your code remembers.</h1>
      </div>

      <div className="card primary" onClick={() => setActiveTab('scan')}>
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

      <div className="card" onClick={() => setActiveTab('memory')}>
        <div className="card-title">
          <SearchCode size={20} />
          Ask DevMemory
        </div>
        <div className="card-subtitle">
          Search your coding history or ask about architectural decisions.
        </div>
      </div>

      <div className="recent-memories">
        <div className="section-title">
          <History size={16} />
          Recent Memories
        </div>
        <div className="memory-list">
          <div className="memory-item">
            <div className="memory-icon"><User size={18}/></div>
            <div className="memory-content">
              <h4>Avatar component</h4>
              <p>Added fallback initials for missing images.</p>
            </div>
            <ChevronRight size={16} color="var(--text-muted)" style={{marginLeft: 'auto', alignSelf: 'center'}} />
          </div>
          <div className="memory-item">
            <div className="memory-icon"><Lock size={18}/></div>
            <div className="memory-content">
              <h4>Auth session invalidation</h4>
              <p>Fixed bug where stale JWTs caused loops.</p>
            </div>
            <ChevronRight size={16} color="var(--text-muted)" style={{marginLeft: 'auto', alignSelf: 'center'}} />
          </div>
          <div className="memory-item">
            <div className="memory-icon"><Globe size={18}/></div>
            <div className="memory-content">
              <h4>Gateway timeout handling</h4>
              <p>Increased timeout to 15s for upstream API.</p>
            </div>
            <ChevronRight size={16} color="var(--text-muted)" style={{marginLeft: 'auto', alignSelf: 'center'}} />
          </div>
        </div>
      </div>
    </>
  );
}

function ScanScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');

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
        <div className="scanner-frame"></div>
        <div className={`scanner-line ${scanState === 'scanning' ? 'active' : ''}`}></div>
        
        <div className="code-snippet">
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
                <span className="detail-value">squid-vibes-hub</span>
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
                <span className="detail-value">L6–L20</span>
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
    </>
  );
}

function MemoryScreen() {
  return (
    <div className="placeholder-screen">
      <History className="placeholder-icon" />
      <h2>Developer Memory</h2>
      <p>Your historical context will appear here.</p>
    </div>
  );
}

function SettingsScreen() {
  return (
    <div className="placeholder-screen">
      <Settings className="placeholder-icon" />
      <h2>Settings</h2>
      <p>Preferences, integrations, and profile.</p>
    </div>
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
          <p>Avatar() · avatar.tsx</p>
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
          <span style={{ color: '#10b981' }}>Ready</span>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          Planned on-device model: DevMemory retrieves historical evidence first. The local model uses that evidence to explain why the code exists.
        </div>
        <button className="btn-secondary" style={{ marginTop: '16px', padding: '8px', fontSize: '13px' }} onClick={() => setActiveTab('architecture')}>
          <Waypoints size={16} /> Show how DevMemory reasoned
        </button>
      </div>

      <div className="answer-section">
        <h3 className="answer-heading">Why Avatar() exists</h3>
        <p className="answer-text">
          Avatar() was introduced as a reusable application-level wrapper around Radix Avatar primitives.
        </p>
      </div>

      <div className="analysis-blocks">
        <div className="analysis-block fact">
          <div className="block-label" style={{ textTransform: 'uppercase' }}><CheckCircle2 size={14}/> Fact</div>
          <div className="block-content">
            Introduced in commit a9a3ca3.
          </div>
        </div>

        <div className="analysis-block interpretation">
          <div className="block-label" style={{ textTransform: 'uppercase' }}><BrainCircuit size={14}/> Interpretation</div>
          <div className="block-content">
            The diff suggests the component was created as a reusable UI abstraction.
          </div>
        </div>

        <div className="analysis-block unknown">
          <div className="block-label" style={{ textTransform: 'uppercase' }}><SearchCode size={14}/> Unknown</div>
          <div className="block-content">
            The available history does not explicitly state the original product requirement.
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
        <div className="card-subtitle" style={{marginBottom: '16px'}}>Avatar component introduced</div>
        <button className="btn-secondary" onClick={() => setActiveTab('commit')}>View commit</button>
      </div>

      <div className="card" style={{marginBottom: '16px'}}>
        <div className="card-title"><FileCode size={16} /> 2. DIFF</div>
        <div className="timeline-time" style={{margin: '8px 0'}}>avatar.tsx</div>
        <div className="card-subtitle" style={{marginBottom: '16px'}}>Added Radix Avatar wrapper and fallback components</div>
        <button className="btn-secondary" onClick={() => setActiveTab('diff-view')}>View diff</button>
      </div>

      <div className="card" style={{marginBottom: '24px'}}>
        <div className="card-title"><History size={16} /> 3. SYMBOL HISTORY</div>
        <div className="timeline-time" style={{margin: '8px 0'}}>Avatar()</div>
        <div className="card-subtitle" style={{marginBottom: '16px'}}>First introduced in a9a3ca3</div>
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
          <p>React component · avatar.tsx · squid-vibes-hub</p>
        </div>
      </div>

      <div className="timeline" style={{marginTop: '24px'}}>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <div className="timeline-time">a9a3ca3</div>
            <div className="timeline-desc">Introduced</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <div className="timeline-time">Later commit</div>
            <div className="timeline-desc">Updated implementation</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <div className="timeline-time">Current</div>
            <div className="timeline-desc">Shared UI component</div>
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
          <h2>a9a3ca3</h2>
          <p>Avatar component introduced</p>
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
            <span className="detail-value" style={{fontSize: '13px', lineHeight: '1.5', marginTop: '4px'}}>Added Avatar, AvatarImage and AvatarFallback around Radix primitives.</span>
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
            <div className="timeline-time" style={{color: 'var(--text-muted)'}}>Later</div>
            <div className="timeline-desc">Maintenance changes</div>
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
          <span className="laptop-toast-sub">Ready to open commit a9a3ca3 on GitHub.</span>
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
          <h2>Commit a9a3ca3</h2>
          <p>avatar.tsx</p>
        </div>
      </div>

      <div className="analysis-blocks">
        <div className="analysis-block interpretation">
          <div className="block-label"><BrainCircuit size={14}/> Supports this interpretation</div>
          <div className="block-content">
            The component wraps Radix Avatar primitives and exposes a reusable application-level API.
          </div>
        </div>
        <div className="analysis-block fact">
          <div className="block-label"><CheckCircle2 size={14}/> Historical fact</div>
          <div className="block-content">
            Introduced in commit a9a3ca3.
          </div>
        </div>
      </div>

      <div className="diff-view">
        <div className="diff-line diff-context">@@ -0,0 +1,15 @@</div>
        <div className="diff-line diff-add">+ import * as AvatarPrimitive from "@radix-ui/react-avatar"</div>
        <div className="diff-line diff-add">+ </div>
        <div className="diff-line diff-add">+ const Avatar = React.forwardRef&lt;</div>
        <div className="diff-line diff-add">+   React.ElementRef&lt;typeof AvatarPrimitive.Root&gt;,</div>
        <div className="diff-line diff-add">+   React.ComponentPropsWithoutRef&lt;typeof AvatarPrimitive.Root&gt;</div>
        <div className="diff-line diff-add">+ &gt;((&#123; className, ...props &#125;, ref) =&gt; (</div>
        <div className="diff-line diff-add">+   &lt;AvatarPrimitive.Root</div>
        <div className="diff-line diff-add">+     ref=&#123;ref&#125;</div>
        <div className="diff-line diff-add">+     className=&#123;cn("relative flex h-10 w-10 shrink-0", className)&#125;</div>
        <div className="diff-line diff-add">+     &#123;...props&#125;</div>
        <div className="diff-line diff-add">+   /&gt;</div>
        <div className="diff-line diff-add">+ ))</div>
        <div className="diff-line diff-add">+ </div>
        <div className="diff-line diff-add">+ const AvatarImage = React.forwardRef(...)</div>
        <div className="diff-line diff-add">+ const AvatarFallback = React.forwardRef(...)</div>
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
                Avatar() was introduced as a reusable application-level wrapper around Radix Avatar primitives.
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                <div style={{ flex: 1, padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Fact</div>
                  <div style={{ fontSize: '13px' }}>Introduced in a9a3ca3.</div>
                </div>
                <div style={{ flex: 1, padding: '16px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Interpretation</div>
                  <div style={{ fontSize: '13px' }}>The diff suggests the component was created as a reusable UI abstraction.</div>
                </div>
                <div style={{ flex: 1, padding: '16px', background: 'rgba(100, 116, 139, 0.1)', border: '1px solid rgba(100, 116, 139, 0.2)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Unknown</div>
                  <div style={{ fontSize: '13px' }}>The available history does not explicitly state the original product requirement.</div>
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
          <div style={{ fontSize: '14px', lineHeight: '1.5' }}>"Avatar() was introduced as a reusable application-level wrapper..."</div>
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
