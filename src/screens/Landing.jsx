import { useRef } from 'react';
import BrowserChrome from '../components/BrowserChrome';
import TagSel from '../components/TagSel';
import { useTab } from '../context/TabContext';
import { useHeroParallax } from '../hooks/useHeroParallax';
import { useLandingSectionAnimations } from '../hooks/useLandingSectionAnimations';

export default function Landing() {
  const { switchTab, tab, setAuthIntent } = useTab();
  const heroRef = useRef(null);
  const orbRef = useRef(null);
  const gridRef = useRef(null);
  const animRootRef = useLandingSectionAnimations(tab === 'landing');

  useHeroParallax(heroRef, orbRef, gridRef);

  return (
    <>
      <BrowserChrome url="fintekno.ai" />
      <div className="lp" ref={animRootRef}>
        <header className="lp-nav" role="banner">
          <div className="logo" aria-label="FINTEKNO AI">
            <div className="logo-mark" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="3.5" stroke="#fff" strokeWidth="1.2" />
                <path d="M4 6l1.5 1.5L8 4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            FINTEKNO AI
          </div>
          <ul className="nav-links-lp">
            <li>
              <a className="nav-link-lp" href="#">
                How it works
              </a>
            </li>
            <li>
              <a className="nav-link-lp" href="#">
                Agents
              </a>
            </li>
            <li>
              <a className="nav-link-lp" href="#">
                Pricing
              </a>
            </li>
            <li>
              <a className="nav-link-lp" href="#">
                Blog
              </a>
            </li>
          </ul>
          <div className="nav-cta">
            <button
              type="button"
              className="btn-outline"
              onClick={() => {
                setAuthIntent('login');
                switchTab('onboard1');
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              className="btn-solid"
              onClick={() => {
                setAuthIntent('register');
                switchTab('onboard1');
              }}
            >
              Get started →
            </button>
          </div>
        </header>

        <section ref={heroRef} className="hero-section" aria-label="Hero">
          <div ref={gridRef} className="hero-grid" aria-hidden="true" />
          <div className="hero-grid-fade" aria-hidden="true" />
          <div ref={orbRef} className="hero-orb" aria-hidden="true" />

          <div className="hero-tag" role="note">
            <span className="hero-tag-dot" aria-hidden="true" />
            Agentic AI · Built for India&apos;s job seekers
          </div>

          <h1 className="hero-h1" id="main-heading">
            Stop applying
            <br />
            <span className="hl">manually.</span>
            <br />
            Let <span className="green">AI agents</span>
            <br />
            work for you.
          </h1>

          <p className="hero-sub">
            Five specialised AI agents handle discovery, resume optimisation, form-filling, tracking, and recruiter emails — so you spend your time on interviews, not admin.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn-solid"
              style={{ padding: '12px 28px', fontSize: '13px' }}
              onClick={() => {
                setAuthIntent('register');
                switchTab('onboard1');
              }}
              aria-label="Start your free job search"
            >
              Start free job search →
            </button>
            <button type="button" className="btn-outline" style={{ padding: '12px 28px', fontSize: '13px' }} onClick={() => switchTab('home')}>
              See dashboard
            </button>
          </div>

          <div className="hero-stats" role="list" aria-label="Key metrics">
            <div className="stat" role="listitem">
              <div className="stat-val" aria-label="42 times">
                0×
              </div>
              <div className="stat-lbl">More applications/week</div>
            </div>
            <div className="stat" role="listitem">
              <div className="stat-val" aria-label="2 minutes">
                0 min
              </div>
              <div className="stat-lbl">Per application</div>
            </div>
            <div className="stat" role="listitem">
              <div className="stat-val" aria-label="zero percent">
                0%
              </div>
              <div className="stat-lbl">Recruiter emails missed</div>
            </div>
            <div className="stat" role="listitem">
              <div className="stat-val" aria-label="3 times">
                0×
              </div>
              <div className="stat-lbl">More callbacks</div>
            </div>
          </div>
        </section>

        <div className="agent-strip" aria-label="Active AI agents" aria-hidden="true">
          <span className="strip-label">Active agents</span>
          <div className="strip-scroll">
            <div className="agent-pill">
              <div className="pill-dot" style={{ background: 'var(--blue)' }} />
              Discovery Agent
            </div>
            <div className="agent-pill">
              <div className="pill-dot" style={{ background: 'var(--red)' }} />
              Resume Agent
            </div>
            <div className="agent-pill">
              <div className="pill-dot" style={{ background: 'var(--green)' }} />
              Apply Agent
            </div>
            <div className="agent-pill">
              <div className="pill-dot" style={{ background: 'var(--amber)' }} />
              Tracking Agent
            </div>
            <div className="agent-pill">
              <div className="pill-dot" style={{ background: '#a855f7' }} />
              Comms Agent
            </div>
            <div className="agent-pill" style={{ opacity: 0.5 }}>
              — scanning 4,300 listings
            </div>
            <div className="agent-pill">
              <div className="pill-dot" style={{ background: 'var(--blue)' }} />
              Discovery Agent
            </div>
            <div className="agent-pill">
              <div className="pill-dot" style={{ background: 'var(--red)' }} />
              Resume Agent
            </div>
            <div className="agent-pill">
              <div className="pill-dot" style={{ background: 'var(--green)' }} />
              Apply Agent
            </div>
            <div className="agent-pill">
              <div className="pill-dot" style={{ background: 'var(--amber)' }} />
              Tracking Agent
            </div>
            <div className="agent-pill">
              <div className="pill-dot" style={{ background: '#a855f7' }} />
              Comms Agent
            </div>
            <div className="agent-pill" style={{ opacity: 0.5 }}>
              — scanning 4,300 listings
            </div>
          </div>
        </div>

        <section className="features-section" aria-labelledby="features-title">
          <div className="sec-eyebrow">Why FINTEKNO AI</div>
          <h2 className="sec-h2" id="features-title">
            Everything your job search
            <br />
            <span className="dim">needs. Run by agents.</span>
          </h2>
          <p className="sec-sub">
            No more copy-pasting. No more form fatigue. No more missed recruiter emails. FINTEKNO AI agents work around the clock.
          </p>
          <div className="feat-grid" role="list">
            <div className="feat-card" role="listitem">
              <div className="feat-num">01</div>
              <div className="feat-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="5.5" stroke="var(--text2)" strokeWidth="1.2" />
                  <path d="M5.5 8l1.8 1.8L10.5 5.5" stroke="var(--text2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="feat-title">Smart job discovery</div>
              <p className="feat-desc">
                Aggregates Naukri, LinkedIn, and Indeed into one ranked feed. Ghost jobs flagged before you waste time applying.
              </p>
            </div>
            <div className="feat-card" role="listitem">
              <div className="feat-num">02</div>
              <div className="feat-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="var(--text2)" strokeWidth="1.2" />
                  <line x1="5" y1="6" x2="11" y2="6" stroke="var(--text2)" strokeWidth="1" strokeLinecap="round" />
                  <line x1="5" y1="8.5" x2="11" y2="8.5" stroke="var(--text2)" strokeWidth="1" strokeLinecap="round" />
                  <line x1="5" y1="11" x2="8" y2="11" stroke="var(--text2)" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <div className="feat-title">ATS resume optimiser</div>
              <p className="feat-desc">
                Reads each JD, tailors your resume for ATS keywords, shows you every change before you apply. Target: 85%+ match.
              </p>
            </div>
            <div className="feat-card" role="listitem">
              <div className="feat-num">03</div>
              <div className="feat-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" stroke="var(--text2)" strokeWidth="1.2" />
                  <path d="M4 8h8M8 4v8" stroke="var(--text2)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="feat-title">One-click apply</div>
              <p className="feat-desc">
                Your profile fills every form automatically across every platform. Review, approve, submit — under 2 minutes per application.
              </p>
            </div>
            <div className="feat-card" role="listitem">
              <div className="feat-num">04</div>
              <div className="feat-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1.5" y="4" width="13" height="10" rx="1.5" stroke="var(--text2)" strokeWidth="1.2" />
                  <path d="M1.5 7h13" stroke="var(--text2)" strokeWidth="1" />
                  <path d="M5.5 2v3M10.5 2v3" stroke="var(--text2)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="feat-title">Live pipeline tracker</div>
              <p className="feat-desc">
                Every application staged automatically. Follow-up nudges at exactly the right time. Never lose track of where you stand.
              </p>
            </div>
            <div className="feat-card" role="listitem">
              <div className="feat-num">05</div>
              <div className="feat-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4.5l6 4.5 6-4.5" stroke="var(--text2)" strokeWidth="1.2" strokeLinecap="round" />
                  <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="var(--text2)" strokeWidth="1.2" />
                </svg>
              </div>
              <div className="feat-title">Recruiter email monitor</div>
              <p className="feat-desc">Never miss a recruiter message. Alerted within minutes, with an AI-drafted reply ready to send instantly.</p>
            </div>
            <div className="feat-card" role="listitem">
              <div className="feat-num">06</div>
              <div className="feat-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="5.5" stroke="var(--text2)" strokeWidth="1.2" />
                  <path d="M8 4.5v4L10.5 10" stroke="var(--text2)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="feat-title">Full transparency</div>
              <p className="feat-desc">
                Every agent action is logged in plain language. You approve before anything is submitted. You always stay in control.
              </p>
            </div>
          </div>
        </section>

        <div className="ticker-section" aria-hidden="true">
          <div className="ticker-row">
            <span className="ticker-item">
              <span className="filled">Groww</span>
              <span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              PhonePe<span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              <span className="filled">Swiggy</span>
              <span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              Flipkart<span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              <span className="filled">Razorpay</span>
              <span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              CRED<span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              <span className="filled">Zepto</span>
              <span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              Naukri<span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              <span className="filled">Groww</span>
              <span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              PhonePe<span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              <span className="filled">Swiggy</span>
              <span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              Flipkart<span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              <span className="filled">Razorpay</span>
              <span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              CRED<span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              <span className="filled">Zepto</span>
              <span className="ticker-dot" />
            </span>
            <span className="ticker-item">
              Naukri<span className="ticker-dot" />
            </span>
          </div>
          <div style={{ marginTop: 12 }}>
            <div className="ticker-row rev">
              <span className="ticker-item">
                LinkedIn<span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                <span className="filled">Indeed India</span>
                <span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                Amazon<span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                <span className="filled">Google</span>
                <span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                Microsoft<span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                <span className="filled">Infosys</span>
                <span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                Meesho<span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                <span className="filled">Ola</span>
                <span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                LinkedIn<span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                <span className="filled">Indeed India</span>
                <span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                Amazon<span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                <span className="filled">Google</span>
                <span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                Microsoft<span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                <span className="filled">Infosys</span>
                <span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                Meesho<span className="ticker-dot" />
              </span>
              <span className="ticker-item">
                <span className="filled">Ola</span>
                <span className="ticker-dot" />
              </span>
            </div>
          </div>
        </div>

        <section className="how-section" aria-labelledby="how-title">
          <div className="sec-eyebrow">How FINTEKNO AI works</div>
          <h2 className="sec-h2" id="how-title">
            Three steps to your
            <br />
            <span className="dim">next offer letter.</span>
          </h2>
          <div className="steps" role="list">
            <div className="step" role="listitem">
              <div className="step-n" aria-label="Step 1">
                01
              </div>
              <div className="step-body">
                <div className="step-title">Tell us what you want</div>
                <p className="step-desc">
                  Upload your resume and set your preferences. Takes 4 minutes. FINTEKNO AI parses your skills and builds your agent profile automatically. Enter once — use everywhere.
                </p>
              </div>
              <div className="step-visual" aria-hidden="true">
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
                  <TagSel defaultOn>Data Analyst</TagSel>
                  <TagSel defaultOn>Python</TagSel>
                  <TagSel defaultOn>SQL</TagSel>
                  <TagSel>React</TagSel>
                  <TagSel>ML</TagSel>
                </div>
                <div
                  style={{
                    background: 'var(--green-dim)',
                    border: '1px solid rgba(34,199,133,.3)',
                    padding: '9px 11px',
                    fontSize: 11,
                    color: 'var(--green)',
                    fontFamily: "'Space Mono',monospace",
                  }}
                >
                  Resume parsed · 23 skills · ATS: 74%
                </div>
              </div>
            </div>
            <div className="step" role="listitem">
              <div className="step-n" aria-label="Step 2">
                02
              </div>
              <div className="step-body">
                <div className="step-title">Agents get to work</div>
                <p className="step-desc">
                  Four AI agents run 24/7 — discovering jobs, tailoring your resume per JD, filling forms across Naukri, LinkedIn and Indeed, and monitoring your recruiter inbox.
                </p>
              </div>
              <div className="step-visual" aria-hidden="true">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontFamily: "'Space Mono',monospace" }}>
                    <span style={{ color: 'var(--text2)' }}>Discovery agent</span>
                    <span className="chip chip-green" style={{ fontSize: 9 }}>
                      Running
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontFamily: "'Space Mono',monospace" }}>
                    <span style={{ color: 'var(--text2)' }}>Resume agent</span>
                    <span className="chip chip-green" style={{ fontSize: 9 }}>
                      Running
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontFamily: "'Space Mono',monospace" }}>
                    <span style={{ color: 'var(--text2)' }}>Apply agent</span>
                    <span className="chip chip-amber" style={{ fontSize: 9 }}>
                      3 pending
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontFamily: "'Space Mono',monospace" }}>
                    <span style={{ color: 'var(--text2)' }}>Comms agent</span>
                    <span className="chip chip-green" style={{ fontSize: 9 }}>
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="step" role="listitem">
              <div className="step-n" aria-label="Step 3">
                03
              </div>
              <div className="step-body">
                <div className="step-title">You stay in control</div>
                <p className="step-desc">
                  Review and approve applications before they go out. Respond to interview invites with AI-drafted replies. Agents ask for help only when they actually need it.
                </p>
              </div>
              <div className="step-visual" aria-hidden="true">
                <div className="alert alert-blue" style={{ marginBottom: 0 }}>
                  <div className="alert-icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect x="1.5" y="1.5" width="9" height="9" rx="1.2" stroke="#4a90d9" strokeWidth="1" />
                      <path d="M3.5 6h5M6 3.5v5" stroke="#4a90d9" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="alert-title" style={{ fontSize: 11, color: 'var(--blue)' }}>
                      Razorpay — ready to submit
                    </div>
                    <div className="alert-actions" style={{ marginTop: 7, marginBottom: 0 }}>
                      <button type="button" className="alert-btn alert-btn-solid" style={{ fontSize: 9 }} onClick={() => switchTab('apply')}>
                        Approve
                      </button>
                      <button type="button" className="alert-btn alert-btn-ghost" style={{ fontSize: 9 }}>
                        Skip
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="agents-section" aria-labelledby="agents-title">
          <div className="sec-eyebrow">The agents</div>
          <h2 className="sec-h2" id="agents-title">
            Four specialists working
            <br />
            <span className="dim">for you, 24/7.</span>
          </h2>
          <div className="agents-grid" role="list">
            <div className="agent-block" role="listitem">
              <div className="agent-block-num">01 / Discovery</div>
              <div className="agent-block-name">The Scout</div>
              <p className="agent-block-desc">
                Scans LinkedIn, Naukri, Indeed, and 40+ job boards daily. Scores every listing against your profile and surfaces only the best matches.
              </p>
              <div className="agent-status-badge">
                <div className="pill-dot" style={{ background: 'var(--green)', animation: 'blink 2s infinite' }} aria-hidden="true" />
                Live — scanning
              </div>
            </div>
            <div className="agent-block" role="listitem">
              <div className="agent-block-num">02 / Resume</div>
              <div className="agent-block-name">The Tailor</div>
              <p className="agent-block-desc">
                Creates a custom resume for each job. Rewrites bullets, inserts keywords, and targets ATS scores above 85%. Shows every diff before applying.
              </p>
              <div className="agent-status-badge">
                <div className="pill-dot" style={{ background: 'var(--green)' }} aria-hidden="true" />
                9 tailored today
              </div>
            </div>
            <div className="agent-block" role="listitem">
              <div className="agent-block-num">03 / Apply</div>
              <div className="agent-block-name">The Applier</div>
              <p className="agent-block-desc">
                Pre-fills every form field, attaches the right resume, writes cover letters, and submits — after your approval — in under 60 seconds per application.
              </p>
              <div className="agent-status-badge">
                <div className="pill-dot" style={{ background: 'var(--amber)' }} aria-hidden="true" />
                3 awaiting review
              </div>
            </div>
            <div className="agent-block" role="listitem">
              <div className="agent-block-num">04 / Comms</div>
              <div className="agent-block-name">The Communicator</div>
              <p className="agent-block-desc">
                Monitors your inbox for recruiter messages, flags interview invites, drafts responses, and nudges you to follow up before opportunities go cold.
              </p>
              <div className="agent-status-badge">
                <div className="pill-dot" style={{ background: 'var(--red)' }} aria-hidden="true" />
                1 urgent item
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-section" aria-labelledby="testimonials-title">
          <div className="sec-eyebrow">What students say</div>
          <h2 className="sec-h2" id="testimonials-title">
            From campus to
            <br />
            <span className="dim">offer letter.</span>
          </h2>
          <div className="t-grid" role="list">
            <article className="t-card" role="listitem">
              <p className="t-quote">
                &quot;I applied to <strong>80 companies in two weeks.</strong> FINTEKNO AI did all the form-filling. I just showed up for interviews.&quot;
              </p>
              <div className="t-author">
                <div className="t-avatar" aria-hidden="true">
                  PR
                </div>
                <div>
                  <div className="t-name">Priya Reddy</div>
                  <div className="t-role">NIT Warangal → Razorpay</div>
                </div>
              </div>
              <div className="t-metric">91% avg ATS match</div>
            </article>
            <article className="t-card" role="listitem">
              <p className="t-quote">
                &quot;The resume agent <strong>rewrote my CV for every company.</strong> My callback rate went from 2% to 18%.&quot;
              </p>
              <div className="t-author">
                <div className="t-avatar" aria-hidden="true">
                  AK
                </div>
                <div>
                  <div className="t-name">Aditya Kumar</div>
                  <div className="t-role">IIM Indore → CRED</div>
                </div>
              </div>
              <div className="t-metric">18% callback rate</div>
            </article>
            <article className="t-card" role="listitem">
              <p className="t-quote">
                &quot;I almost <strong>missed a Swiggy interview</strong> because I forgot to check email. FINTEKNO AI flagged it within 5 minutes.&quot;
              </p>
              <div className="t-author">
                <div className="t-avatar" aria-hidden="true">
                  SN
                </div>
                <div>
                  <div className="t-name">Sneha Nair</div>
                  <div className="t-role">SRCC Delhi → PhonePe</div>
                </div>
              </div>
              <div className="t-metric">0 missed invites</div>
            </article>
          </div>
        </section>

        <section className="pricing-section" aria-labelledby="pricing-title">
          <div className="sec-eyebrow">Pricing</div>
          <h2 className="sec-h2" id="pricing-title">
            Start free.
            <br />
            <span className="dim">Upgrade when it works.</span>
          </h2>
          <p className="sec-sub" style={{ marginBottom: 0 }}>
            No credit card needed to start.
          </p>
          <div className="pricing-grid" role="list">
            <article className="price-card" role="listitem">
              <div className="price-plan">Starter</div>
              <div className="price-amount">₹0</div>
              <div className="price-per">per month</div>
              <p className="price-desc">For students just getting started. All you need to land your first interviews.</p>
              <div className="price-feats">
                <div className="price-feat">
                  <div className="price-feat-check" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--green)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  15 job matches/week
                </div>
                <div className="price-feat">
                  <div className="price-feat-check" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--green)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  5 AI applications/month
                </div>
                <div className="price-feat">
                  <div className="price-feat-check" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--green)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  Resume tailoring
                </div>
                <div className="price-feat">
                  <div className="price-feat-check" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--green)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  Application tracker
                </div>
              </div>
              <button
                type="button"
                className="price-cta"
                onClick={() => {
                  setAuthIntent('register');
                  switchTab('onboard1');
                }}
              >
                Get started free
              </button>
            </article>
            <article className="price-card featured" role="listitem">
              <div className="price-featured-label">Most popular</div>
              <div className="price-plan">Pro</div>
              <div className="price-amount">₹499</div>
              <div className="price-per">per month</div>
              <p className="price-desc">For serious job seekers. All four agents at full speed until you get your offer.</p>
              <div className="price-feats">
                <div className="price-feat">
                  <div className="price-feat-check" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--green)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  Unlimited matches
                </div>
                <div className="price-feat">
                  <div className="price-feat-check" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--green)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  Unlimited applications
                </div>
                <div className="price-feat">
                  <div className="price-feat-check" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--green)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  All 4 agents active
                </div>
                <div className="price-feat">
                  <div className="price-feat-check" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--green)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  Comms agent + inbox
                </div>
                <div className="price-feat">
                  <div className="price-feat-check" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--green)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  Naukri + Indeed priority
                </div>
              </div>
              <button
                type="button"
                className="price-cta"
                onClick={() => {
                  setAuthIntent('register');
                  switchTab('onboard1');
                }}
              >
                Start Pro — 7 days free
              </button>
            </article>
            <article className="price-card" role="listitem">
              <div className="price-plan">Campus</div>
              <div className="price-amount">₹199</div>
              <div className="price-per">per student/month</div>
              <p className="price-desc">For placement cells and college batches. TPO dashboard with analytics.</p>
              <div className="price-feats">
                <div className="price-feat">
                  <div className="price-feat-check" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--green)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  Everything in Pro
                </div>
                <div className="price-feat">
                  <div className="price-feat-check" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--green)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  TPO batch dashboard
                </div>
                <div className="price-feat">
                  <div className="price-feat-check" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--green)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  Placement analytics
                </div>
                <div className="price-feat">
                  <div className="price-feat-check" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--green)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  Dedicated support
                </div>
              </div>
              <button type="button" className="price-cta">
                Contact for colleges
              </button>
            </article>
          </div>
        </section>

        <footer className="lp-footer" role="contentinfo">
          <div>
            <div className="footer-brand-name">FINTEKNO AI</div>
            <p className="footer-brand-sub">Frontier AI for India&apos;s next generation of talent.</p>
          </div>
          <div>
            <div className="footer-col-title">Product</div>
            <div className="footer-links">
              <span className="footer-link">How it works</span>
              <span className="footer-link">Agents</span>
              <span className="footer-link">Pricing</span>
              <span className="footer-link">For colleges</span>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Resources</div>
            <div className="footer-links">
              <span className="footer-link">Resume tips</span>
              <span className="footer-link">ATS guide</span>
              <span className="footer-link">Interview prep</span>
              <span className="footer-link">Salary insights</span>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <div className="footer-links">
              <span className="footer-link">About</span>
              <span className="footer-link">Blog</span>
              <span className="footer-link">Privacy policy</span>
              <span className="footer-link">Terms</span>
            </div>
          </div>
        </footer>
        <div className="footer-bottom">
          <span>© 2026 FINTEKNO AI Technologies Pvt. Ltd. · Bengaluru, India</span>
          <span>Built for India&apos;s freshers</span>
        </div>
      </div>
    </>
  );
}
