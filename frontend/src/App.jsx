import { useEffect, useRef, useState } from 'react'
import SEO from "./components/SEO/SEO";
import ProjectsPage, { projectsData } from './pages/ProjectsPage'
import ProductsPage from './pages/ProductsPage'
import MediaPage from './pages/MediaPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsConditionsPage from './pages/TermsConditionsPage'
import NotFoundPage from './pages/NotFoundPage'
import AdminPortal from './admin/AdminPortal'
import {
  navigate,
  SiteFooter,
  SiteHeader,
  GoogleIcon,
  JustdialIcon,
  JustdialSvgLogo,
} from './components/Shared'
import { homeContent, aboutContent, servicesAndSolutionsContent } from './content/siteContent'
import { apiGet } from './utils/api'
import { useSEO } from './utils/useSEO'
import WhatsAppWidget from './components/WhatsAppWidget'
import {
  FiArrowUpRight, FiArrowDown, FiCheck, FiChevronRight, FiChevronLeft,
  FiZap, FiSun, FiShield, FiTarget, FiTrendingUp, FiGlobe,
  FiCompass, FiCpu, FiAward, FiCheckCircle, FiRefreshCw,
  FiBriefcase, FiHome, FiTool, FiActivity, FiSliders,
  FiUsers, FiClock, FiLayers, FiFileText, FiMapPin, FiStar
} from 'react-icons/fi'

const services = homeContent.whatWeDo.services
const process = homeContent.howWeWork.steps
const strengths = homeContent.whyChooseUs.strengths

function getVisionIcon(num) {
  switch (num) {
    case '01': return <FiSun />
    case '02': return <FiUsers />
    case '03': return <FiZap />
    case '04': return <FiTrendingUp />
    case '05': return <FiGlobe />
    case '06': return <FiCompass />
    default: return <FiSun />
  }
}

function getMissionIcon(num) {
  switch (num) {
    case '01': return <FiSliders />
    case '02': return <FiShield />
    case '03': return <FiTarget />
    case '04': return <FiRefreshCw />
    case '05': return <FiCpu />
    case '06': return <FiAward />
    default: return <FiShield />
  }
}

function getCapabilityIcon(num) {
  switch (num) {
    case '01': return <FiZap />
    case '02': return <FiBriefcase />
    case '03': return <FiHome />
    case '04': return <FiAward />
    case '05': return <FiTool />
    case '06': return <FiActivity />
    case '07': return <FiLayers />
    case '08': return <FiTrendingUp />
    default: return <FiSun />
  }
}

function getStrengthIcon(num) {
  switch (num) {
    case '01': return <FiClock />
    case '02': return <FiMapPin />
    case '03': return <FiCompass />
    case '04': return <FiBriefcase />
    case '05': return <FiSliders />
    case '06': return <FiAward />
    case '07': return <FiShield />
    case '08': return <FiCheckCircle />
    default: return <FiZap />
  }
}

function StrengthsOrbitWheel({ items }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const timerRef = useRef(null)
  const current = items[activeIdx]
  const N = items.length
  const SIZE = 640, CX = 320, CY = 320, RADIUS = 236

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % N)
    }, 3400)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [N])

  const handleClick = (idx) => {
    setActiveIdx(idx)
    startTimer()
  }

  const handlePrev = () => {
    setActiveIdx(prev => (prev - 1 + N) % N)
    startTimer()
  }

  const handleNext = () => {
    setActiveIdx(prev => (prev + 1) % N)
    startTimer()
  }

  const nodes = items.map((item, i) => {
    const angle = (2 * Math.PI * i / N) - Math.PI / 2
    const x = CX + RADIUS * Math.cos(angle)
    const y = CY + RADIUS * Math.sin(angle)
    return {
      x,
      y,
      pctX: ((x / SIZE) * 100).toFixed(3),
      pctY: ((y / SIZE) * 100).toFixed(3),
      item,
      idx: i
    }
  })

  const arcLen = 2 * Math.PI * RADIUS
  const segLen = arcLen / N
  const dashOffset = -(arcLen * activeIdx / N) + 0.01

  return (
    <div className="orbit-wheel-wrapper">
      {/* Mobile/Tablet Header: shown when stacked */}
      <div className="orbit-mobile-header">
        <p className="eyebrow"><span /> {homeContent.whyChooseUs.eyebrow}</p>
        <h2 className="orbit-right-h2">
          {homeContent.whyChooseUs.title}<br />
          <em>{homeContent.whyChooseUs.subtitle}</em>
        </h2>
        <p className="orbit-right-note">{homeContent.whyChooseUs.note}</p>
      </div>

      <div className="orbit-wheel-left">
        <div className="orbit-stage-container">
          {/* SVG Background Orbits and Laser Beam */}
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="orbit-svg" aria-hidden="true">
            <defs>
              <linearGradient id="orbitBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1565c0" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="orbitArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1565c0" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <filter id="orbitGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer ambient decorative orbits */}
            <circle cx={CX} cy={CY} r={RADIUS + 44} fill="none" stroke="rgba(21, 101, 192, 0.08)" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="rgba(21, 101, 192, 0.16)" strokeWidth="2.5" strokeDasharray="8 6" />
            <circle cx={CX} cy={CY} r={RADIUS - 58} fill="none" stroke="rgba(21, 101, 192, 0.06)" strokeWidth="1" />

            {/* Glowing active arc segment along the orbit */}
            <circle
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              stroke="url(#orbitArcGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${segLen * 0.85} ${arcLen - segLen * 0.85}`}
              strokeDashoffset={dashOffset}
              filter="url(#orbitGlow)"
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: `${CX}px ${CY}px`,
                transition: 'stroke-dashoffset 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            />

            {/* Connector beam lines */}
            {nodes.map(({ x, y, idx }) => {
              const isActive = idx === activeIdx
              return (
                <line
                  key={idx}
                  x1={CX}
                  y1={CY}
                  x2={x}
                  y2={y}
                  stroke={isActive ? 'url(#orbitBeamGrad)' : 'rgba(21, 101, 192, 0.09)'}
                  strokeWidth={isActive ? 3 : 1}
                  strokeDasharray={isActive ? 'none' : '3 3'}
                  style={{ transition: 'all 0.5s ease' }}
                />
              )
            })}
          </svg>

          {/* Center Hub */}
          <div className="orbit-center-hub">
            <div className="orbit-center-radar" />
            <div className="orbit-center-content">
              <span className="orbit-center-icon">
                {getStrengthIcon(current.number)}
              </span>
              <span className="orbit-center-badge">Strength {current.number}</span>
              <strong className="orbit-center-stat">{current.stat}</strong>
            </div>
          </div>

          {/* 8 Outer Nodes with React Icons */}
          <div className="orbit-nodes-layer">
            {nodes.map(({ pctX, pctY, item, idx }) => {
              const isActive = idx === activeIdx
              return (
                <div
                  key={item.number}
                  className={`orbit-node-wrapper ${isActive ? 'is-active' : ''}`}
                  style={{
                    left: `${pctX}%`,
                    top: `${pctY}%`,
                  }}
                >
                  <button
                    type="button"
                    className="orbit-node-btn"
                    onClick={() => handleClick(idx)}
                    aria-label={`${item.number} ${item.title}`}
                    title={item.title}
                  >
                    <span className="orbit-node-num-pill">{item.number}</span>
                    <span className="orbit-node-react-icon">
                      {getStrengthIcon(item.number)}
                    </span>
                  </button>
                  <span className="orbit-node-label">{item.stat}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Information */}
      <div className="orbit-wheel-right">
        {/* Desktop Header */}
        <div className="orbit-desktop-header">
          <p className="eyebrow"><span /> {homeContent.whyChooseUs.eyebrow}</p>
          <h2 className="orbit-right-h2">
            {homeContent.whyChooseUs.title}<br />
            <em>{homeContent.whyChooseUs.subtitle}</em>
          </h2>
          <p className="orbit-right-note">{homeContent.whyChooseUs.note}</p>
        </div>

        {/* Executive Active Card */}
        <div className="orbit-active-card" key={current.number}>
          <div className="orbit-active-top">
            <div className="orbit-active-icon-badge">
              {getStrengthIcon(current.number)}
            </div>
            <div className="orbit-active-meta">
              <span className="orbit-active-step-chip">Pillar {current.number} of {N}</span>
              <span className="orbit-active-stat-chip">{current.stat}</span>
            </div>
            {/* Prev / Next touch buttons */}
            <div className="orbit-card-nav-controls">
              <button
                type="button"
                className="orbit-card-nav-btn"
                onClick={handlePrev}
                aria-label="Previous strength pillar"
                title="Previous pillar"
              >
                <FiChevronLeft />
              </button>
              <button
                type="button"
                className="orbit-card-nav-btn"
                onClick={handleNext}
                aria-label="Next strength pillar"
                title="Next pillar"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
          <h3 className="orbit-active-title">{current.title}</h3>
          <p className="orbit-active-desc">{current.description}</p>
          <div className="orbit-active-dots">
            {Array.from({ length: N }, (_, i) => (
              <span
                key={i}
                className={`orbit-dot ${i === activeIdx ? 'is-active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Interactive 8-Pillars Quick Selector */}
        <div className="orbit-pillars-selector" role="tablist" aria-label="Strengths quick navigation">
          {items.map((item, idx) => {
            const isActive = idx === activeIdx
            return (
              <button
                key={item.number}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`orbit-pillar-pill ${isActive ? 'is-active' : ''}`}
                onClick={() => handleClick(idx)}
              >
                <span className="orbit-pill-badge">{item.number}</span>
                <span className="orbit-pill-icon">{getStrengthIcon(item.number)}</span>
                <span className="orbit-pill-text">{item.stat}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function getServiceIcon(num) {
  switch (num) {
    case '01': return <FiBriefcase />
    case '02': return <FiHome />
    case '03': return <FiCpu />
    case '04': return <FiZap />
    case '05': return <FiAward />
    case '06': return <FiSun />
    case '07': return <FiTrendingUp />
    case '08': return <FiActivity />
    case '09': return <FiGlobe />
    case '10': return <FiSliders />
    case '11': return <FiLayers />
    case '12': return <FiTool />
    case '13': return <FiLayers />
    case '14': return <FiSun />
    case '15': return <FiZap />
    default: return <FiSun />
  }
}

function Arrow() { return <FiArrowUpRight aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', strokeWidth: 2.5 }} /> }

function AnimatedMetric({ value, suffix = '', label, delay = 0, duration }) {
  const [count, setCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)
  const animRef = useRef(null)
  const isRunningRef = useRef(false)

  const defaultDuration = value > 500 ? 1800 : value > 100 ? 1500 : 1200
  const animDuration = duration || defaultDuration

  const startAnimation = (dur = animDuration) => {
    if (isRunningRef.current) return
    isRunningRef.current = true
    setIsComplete(false)
    setHasStarted(true)
    const startTime = performance.now()

    const update = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / dur, 1)
      // Ease out curve for perceptible count-up and gentle deceleration
      const ease = 1 - Math.pow(1 - progress, 2.2)
      setCount(Math.round(value * ease))

      if (progress < 1) {
        animRef.current = requestAnimationFrame(update)
      } else {
        setCount(value)
        setIsComplete(true)
        isRunningRef.current = false
      }
    }
    animRef.current = requestAnimationFrame(update)
  }

  useEffect(() => {
    let timeoutId = null
    let hasAnimated = false

    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value)
      setIsComplete(true)
      setHasStarted(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true
        timeoutId = setTimeout(() => {
          startAnimation(animDuration)
        }, delay)
        observer.disconnect()
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' })

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (animRef.current) cancelAnimationFrame(animRef.current)
      observer.disconnect()
    }
  }, [value, delay, animDuration])

  const handleReplay = () => {
    if (!isRunningRef.current) {
      startAnimation(Math.min(animDuration, 1100))
    }
  }

  return (
    <div
      ref={ref}
      className={`animated-metric-wrap ${hasStarted ? 'is-animating' : ''} ${isComplete ? 'is-complete' : ''}`}
      onMouseEnter={handleReplay}
    >
      <strong className="metric-number-display">
        {count.toLocaleString()}
        <span>{suffix}</span>
      </strong>
      {label && <small>{label}</small>}
    </div>
  )
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.disconnect()
      }
    }, { threshold: .12 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function IndustryIcon({ type }) {
  const drawings = {
    factory: <><path d="M5 54V29l13-8v9l13-9v9l15-9v33H5Z" /><rect x="11" y="39" width="7" height="7" fill="#eaf4fc" /><rect x="24" y="39" width="7" height="7" fill="#eaf4fc" /><rect x="38" y="39" width="7" height="7" fill="#eaf4fc" /><path d="M10 24V10h8v9z" /></>,
    home: <><path d="m4 29 28-24 28 24-5 6-5-4v25H14V31l-5 4z" /><rect x="27" y="39" width="10" height="17" rx="1" fill="#eaf4fc" /><rect x="17" y="33" width="7" height="7" fill="#eaf4fc" /><rect x="41" y="33" width="7" height="7" fill="#eaf4fc" /></>,
    hospital: <><path d="M11 56V20h42v36z" /><path d="M24 20V9h16v11z" /><rect x="28" y="12" width="8" height="3" fill="#eaf4fc" /><rect x="30.5" y="9.5" width="3" height="8" fill="#eaf4fc" /><g fill="#eaf4fc"><rect x="17" y="27" width="6" height="6"/><rect x="29" y="27" width="6" height="6"/><rect x="41" y="27" width="6" height="6"/><rect x="17" y="39" width="6" height="6"/><rect x="41" y="39" width="6" height="6"/></g><path d="M28 56V43h8v13z" /></>,
    school: <><path d="M17 18h31v38H17z" /><path d="M12 18 32 5l20 13z" /><rect x="28" y="25" width="8" height="9" rx="4" fill="#eaf4fc" /><path d="M32 5V1h16v8H32z" /><path d="M6 34h9v22H6zM49 34h9v22h-9z" /><g fill="#eaf4fc"><rect x="22" y="39" width="5" height="5"/><rect x="39" y="39" width="5" height="5"/></g></>,
    retail: <><path d="M10 19h43l5 12H6z" /><path d="M10 31h43v25H10z" /><path d="M7 19 12 9h38l5 10z" /><path d="M18 32v24h7V32zM31 38h15v10H31z" fill="#eaf4fc" /><path d="M13 18h8l-2 13h-8zM23 18h9v13h-9zM34 18h9v13h-9zM45 18h8l2 13h-8z" opacity=".75" /></>,
    offices: <><path d="M7 56V22h19v34zM27 56V8h20v48zM49 56V28h10v28z" /><g fill="#eaf4fc"><path d="M12 27h5v5h-5zM19 27h4v5h-4zM12 36h5v5h-5zM19 36h4v5h-4zM32 14h5v5h-5zM40 14h4v5h-4zM32 23h5v5h-5zM40 23h4v5h-4zM32 32h5v5h-5zM40 32h4v5h-4zM32 41h5v5h-5zM40 41h4v5h-4z" /></g></>,
    warehouse: <><path d="m5 28 27-19 27 19v28H5z" /><path d="M12 31h40v25H12z" fill="#eaf4fc" /><path d="M17 36h30v20H17z" /><path d="M22 42h20v14H22z" fill="#eaf4fc" /><path d="M26 44h12v12H26z" /></>,
    agriculture: <><path d="M6 50c12-8 24-8 52-1v6C35 48 21 50 7 58z"/><path d="M9 40c13-7 26-7 45-3v5c-19-5-32-3-44 4z"/><path d="M31 42V18" stroke="#0755a4" strokeWidth="4"/><path d="M31 25C17 25 13 17 14 10c11 0 18 5 17 15zM32 19c0-10 8-15 18-14 0 9-6 17-18 17z" /></>,
    fuel: <><path d="M12 8h28v48H12z"/><rect x="17" y="14" width="18" height="15" rx="2" fill="#eaf4fc"/><path d="M40 18h5l7 8v20c0 5-8 5-8 0V34h-4z"/><path d="M45 21v9h6" fill="none" stroke="#0755a4" strokeWidth="3"/><path d="M9 56h34" stroke="#0755a4" strokeWidth="4"/></>,
    hotel: <><path d="M11 56V18h42v38z"/><path d="M7 18 32 7l25 11z"/><path d="M18 25h5v5h-5zM29 25h5v5h-5zM40 25h5v5h-5zM18 35h5v5h-5zM29 35h5v5h-5zM40 35h5v5h-5z" fill="#eaf4fc"/><path d="M28 45h9v11h-9z" fill="#eaf4fc"/><path d="m16 10 2-6 2 6 6 1-5 3 1 6-4-4-5 4 2-6-5-3zM34 9l2-6 2 6 6 1-5 3 1 6-4-4-5 4 2-6-5-3z"/></>,
    government: <><path d="m5 23 27-17 27 17z"/><path d="M9 25h46v5H9zM8 53h48v5H8zM4 59h56v4H4z"/><path d="M13 31h6v20h-6zM24 31h6v20h-6zM35 31h6v20h-6zM46 31h6v20h-6z"/></>,
    grain: <><path d="M8 56V25l15-11v42zM27 56V18l14-10v48zM44 56V31l12-8v33z"/><path d="M17 23c-2-8 2-12 8-14 1 7-1 12-8 14zM17 28c-7-2-9-7-8-13 6 2 9 6 8 13zM35 28c-2-8 2-12 8-14 1 7-1 12-8 14zM35 33c-7-2-9-7-8-13 6 2 9 6 8 13z" fill="#eaf4fc"/></>,
    construction: <><path d="M8 56V34h15v22zM27 56V24h15v32z"/><path d="M6 17h48v5H6zM16 17V9h4v8M16 9h25v4H16zM40 9v8h-4V9zM50 22 42 38h-3l7-16z"/><path d="M14 30h3v4h-3zM19 30h3v4h-3zM32 30h4v5h-4zM32 39h4v5h-4z" fill="#eaf4fc"/></>,
    streetlight: <><path d="M30 20h4v38h-4zM32 20 19 8l3-4 16 14z"/><path d="M16 6h15v5H16z"/><path d="M16 11c0 7 4 11 10 11v-4c-4 0-6-2-6-7z"/><path d="M7 59h50v4H7z"/><path d="M9 34c5-4 9-4 14 0M5 29c8-7 16-7 24 0M39 34c5-4 9-4 14 0M35 29c8-7 16-7 24 0" fill="none" stroke="#0755a4" strokeWidth="3" strokeLinecap="round"/></>,
  }

  return <svg className="industry-pictogram" viewBox="0 0 64 64" aria-hidden="true">{drawings[type]}</svg>
}

function IndustriesSection() {
  const industries = [
    { title: 'Commercial & Industrial Units', icon: 'factory' },
    { title: 'Residential Buildings', icon: 'home' },
    { title: 'Hospitals & Healthcare Facilities', icon: 'hospital' },
    { title: 'Educational Institutions', icon: 'school' },
    { title: 'Shopping Malls & Retail Stores', icon: 'retail' },
    { title: 'IT Parks & Corporate Offices', icon: 'offices' },
    { title: 'Warehouses & Tin Sheds', icon: 'warehouse' },
    { title: 'Agriculture & Farming', icon: 'agriculture' },
    { title: 'Petrol Bunks & Fuel Stations', icon: 'fuel' },
    { title: 'Hotels, Resorts & Hospitality', icon: 'hotel' },
    { title: 'Government Institutions', icon: 'government' },
    { title: 'Rice Mills & Agro Processing Units', icon: 'grain' },
    { title: 'Construction Sites', icon: 'construction' },
    { title: 'Street Lighting & Smart Cities', icon: 'streetlight' },
  ]

  return (
    <section className="industries-section" aria-labelledby="industries-title">
      <div className="wrap">
        <Reveal className="industries-heading">
          <p className="eyebrow"><span /> Industries We Serve</p>
          <h2 id="industries-title">Solar Solutions for <em>Every Industry</em></h2>
          <p>Delivering reliable, efficient and sustainable solar solutions across diverse sectors.</p>
        </Reveal>
        <div className="industries-grid">
          {industries.map(({ title, icon }) => (
            <Reveal className="industry-card" key={title}>
              <span className="industry-icon"><IndustryIcon type={icon} /></span>
              <h3>{title}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FoundationSection() {
  const values = [
    { title: 'Teamwork', text: 'We work across disciplines to deliver dependable solar projects.', icon: <FiUsers /> },
    { title: 'Transparency', text: 'Clear communication and accountable project delivery at every stage.', icon: <FiShield /> },
    { title: 'Quality', text: 'Careful engineering and installation built for lasting performance.', icon: <FiAward /> },
    { title: 'Customer Focus', text: 'Solutions shaped around each customer’s site, needs, and goals.', icon: <FiBriefcase /> },
    { title: 'Purposeful Goals', text: 'We measure success through safety, quality, and project outcomes.', icon: <FiTarget /> },
    { title: 'Innovation', text: 'We apply proven technology with practical engineering.', icon: <FiCpu /> },
  ]

  return (
    <section className="foundation-section" aria-labelledby="foundation-title">
      <div className="wrap">
        <Reveal className="foundation-heading">
          <p className="eyebrow"><span /> What Guides Us</p>
          <h2 id="foundation-title">The Foundation of <em>Our Success</em></h2>
          <p>Shared principles shape how we engineer, deliver, and support every solar project.</p>
        </Reveal>
        <div className="foundation-grid">
          {values.map(({ title, text, icon }) => (
            <Reveal className="foundation-card" key={title}>
              <span className="foundation-icon" aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ScrollProgressBar() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setWidth(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scroll-progress-bar" style={{ width: `${width}%` }} aria-hidden="true" />
}

function EmptyState({ label, text }) {
  return <div className="empty-state"><span className="empty-icon">+</span><strong>{label}</strong><p>{text}</p></div>
}


const verifiedTestimonials = [
  {
    id: 1, rating: 5,
    quote: "N Solutions executed our 3.6 MWp captive solar farm at Sompeta with impeccable civil-structural precision and on-schedule 33 kV grid synchronization. Our annual power tariff savings and plant PR exceeding 81% have transformed our seafood processing cost dynamics.",
    comment: "N Solutions executed our 3.6 MWp captive solar farm at Sompeta with impeccable civil-structural precision and on-schedule 33 kV grid synchronization. Our annual power tariff savings and plant PR exceeding 81% have transformed our seafood processing cost dynamics.",
    name: "Coastal Corporation Ltd", role: "Corporate Client", company: "Sompeta, AP",
    metric: "3.6 MWp Captive Solar"
  },
  {
    id: 2, rating: 5,
    quote: "N Solutions delivered our 50 kWp rooftop plant on time with exceptional build quality. The net-metering approval was handled end-to-end by their team — zero hassle for us.",
    comment: "N Solutions delivered our 50 kWp rooftop plant on time with exceptional build quality. The net-metering approval was handled end-to-end by their team — zero hassle for us.",
    name: "Ramesh Babu", role: "Plant Head", company: "Sri Sai Industries, Vizag",
    metric: "₹4.2L annual savings"
  },
  {
    id: 3, rating: 5,
    quote: "Professional EPC execution. Our 25 kWp system has been producing above PVSyst estimates for 18 months straight. The O&M support is prompt and reliable.",
    comment: "Professional EPC execution. Our 25 kWp system has been producing above PVSyst estimates for 18 months straight. The O&M support is prompt and reliable.",
    name: "Priya Nair", role: "Facility Manager", company: "GreenLeaf Exports, Tirupati",
    metric: "103% generation yield"
  },
  {
    id: 4, rating: 5,
    quote: "We availed the PM Surya Ghar subsidy through N Solutions. The documentation and portal registration was seamless. Highly recommend for residential solar.",
    comment: "We availed the PM Surya Ghar subsidy through N Solutions. The documentation and portal registration was seamless. Highly recommend for residential solar.",
    name: "K. Venkata Rao", role: "Homeowner", company: "Kakinada",
    metric: "Subsidy processed in 12 days"
  },
]

function CertificationsShowcase({ theme = 'light' }) {
  return (
    <div className={`cert-showcase-section theme-${theme}`}>
      <div className="cert-grid-modern">
        {verifiedCertifications.map((cert) => {
          return (
            <Reveal className="cert-card-modern" key={cert.id}>
              {cert.docImage ? (
                <div className="cert-doc-preview-wrap">
                  <img src={cert.docImage} alt={cert.title} loading="lazy" />
                  <div className="cert-doc-overlay">
                    <span className="cert-doc-badge">{cert.badge}</span>
                  </div>
                </div>
              ) : (
                <div className="cert-card-icon-header">
                  <div className="cert-header-icon">{cert.icon}</div>
                  <span className="cert-doc-badge">{cert.badge}</span>
                </div>
              )}
              <div className="cert-card-body">
                <span className="cert-auth-tag">{cert.authority}</span>
                <h3 className="cert-card-title">{cert.title}</h3>
                <p className="cert-card-desc">{cert.description}</p>
                <div className="cert-ref-chip">
                  <FiFileText style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  {cert.refNumber}
                </div>
                <div className="cert-footer-row">
                  <span className="cert-status-pill">
                    <FiCheckCircle /> {cert.status}
                  </span>
                  <span>{cert.year}</span>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

function TestimonialsShowcase({ theme = 'light' }) {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchTestimonials = async () => {
      try {
        const result = await apiGet('/testimonials')

        if (!isMounted) return

        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          setTestimonials(result.data)
        } else {
          setTestimonials(verifiedTestimonials)
        }
      } catch (error) {
        if (isMounted) {
          setTestimonials(verifiedTestimonials)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchTestimonials()

    return () => {
      isMounted = false
    }
  }, [])

  const displayList = testimonials.length > 0 ? testimonials : verifiedTestimonials

  return (
    <div className={`testimonials-showcase-section theme-${theme}`}>
      {/* Platform Trust & Reputation Banner */}
      <div className="testimonials-trust-bar">
        <div className="trust-bar-lead">
          <FiStar className="trust-star-icon" />
          <span>Real Client Reviews &amp; Industry Verification</span>
        </div>

        <div className="trust-bar-platforms">
          <a
            href="https://share.google/9B4OC1mWUc2h4to0T"
            target="_blank"
            rel="noopener noreferrer"
            className="trust-platform-badge google"
            title="Read Verified Reviews for N Solutions on Google"
          >
            <GoogleIcon size={16} />
            <span className="badge-platform-name">Google Reviews</span>
            <span className="badge-score-pill">5.0 ★</span>
          </a>

          <a
            href="https://jsdl.in/RSL-ZYP1792307440"
            target="_blank"
            rel="noopener noreferrer"
            className="trust-platform-badge justdial"
            title="Read 275+ Verified Ratings on Justdial"
          >
            <JustdialIcon size={16} />
            <span className="badge-platform-name">Justdial</span>
            <span className="badge-score-pill">5.0 ★ (275+ Ratings)</span>
          </a>
        </div>
      </div>

      {loading ? (
        <div className="testimonials-grid-modern">
          <div className="testimonial-loading">
            Loading testimonials...
          </div>
        </div>
      ) : (
        <div className="testimonials-grid-modern">
          {displayList.map((t) => (
            <Reveal
              className="testimonial-card-modern"
              key={t.id || t.name}
            >
              <div className="testimonial-top-row">
                <div className="testimonial-stars-and-sources">
                  <div
                    className="testimonial-stars"
                    aria-label={`${t.rating || 5} out of 5 stars`}
                  >
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <FiStar
                        key={i}
                        style={{
                          fill: '#f5a623',
                          color: '#f5a623',
                          marginRight: '3px'
                        }}
                      />
                    ))}
                  </div>

                  {/* Google & Justdial review badges next to the stars (matching user screenshot green marks) */}
                  <div className="testimonial-source-pills">
                    <a
                      href="https://share.google/9B4OC1mWUc2h4to0T"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="testimonial-source-chip google-chip"
                      title="Rated 5.0 on Google Reviews — View Profile"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GoogleIcon size={14} />
                      <span className="source-label">Google</span>
                      <span className="source-rating">5.0 ★</span>
                    </a>

                    <a
                      href="https://jsdl.in/RSL-ZYP1792307440"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="testimonial-source-chip justdial-chip"
                      title="Rated 5.0 on Justdial (275+ Ratings) — View Profile"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <JustdialIcon size={14} />
                      <span className="source-label">Justdial</span>
                      <span className="source-rating">5.0 ★</span>
                    </a>
                  </div>
                </div>

                <span className="testimonial-verified-badge">
                  <FiCheck /> Verified Client Project
                </span>
              </div>

              <p className="testimonial-quote-text">
                “{t.comment || t.quote}”
              </p>

              <div className="testimonial-author-row">
                <div className="testimonial-author-info">
                  <strong className="testimonial-author-name">
                    {t.name}
                  </strong>

                  <span className="testimonial-author-role">
                    {t.role ? `${t.role} · ` : ''}{t.company}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}

function ServicesShowcase() {
  return <div className="service-grid service-showcase" aria-label="Solar services">{services.map((service) => <Reveal key={service.number} className="service-card"><div className="service-photo" style={{ backgroundImage: `url(${service.image})` }}><span>{service.number}</span></div><div className="service-body"><h3>{service.title}</h3><p>{service.text}</p><a href="/services" aria-label={`Learn about ${service.title}`}>Explore <Arrow /></a></div></Reveal>)}</div>
}

const pipelinePhases = [
  {
    number: '01',
    shortLabel: 'Consult & Audit',
    title: 'Consultation & Requirement Assessment',
    tag: 'Phase 01 · Diagnostic Scope',
    text: 'We begin by analyzing your historical energy consumption, identifying peak operational loads, assessing utility tariffs, and defining exact net-metering objectives to architect the most viable solar blueprint.',
    deliverables: [
      'Comprehensive Load & Tariff Audit',
      'PM Surya Ghar / C&I Subsidy Feasibility',
      'Preliminary Capacity & Financial Projections'
    ],
    metrics: [
      { label: 'Diagnostic Precision', value: '100%' },
      { label: 'Turnaround Window', value: '24–48 Hrs' },
      { label: 'DISCOM Feasibility', value: 'Pre-Audited' }
    ]
  },
  {
    number: '02',
    shortLabel: 'Site Survey',
    title: 'Site Assessment & Structural Audit',
    tag: 'Phase 02 · Precision Survey',
    text: 'Our engineering survey team evaluates structural integrity, RCC/tin roof load-bearing thresholds, 3D shadow obstacles, solar azimuth, and HT/LT electrical tie-in infrastructure on-site.',
    deliverables: [
      '3D Drone & LiDAR Shadow Profiling',
      'Structural Load & Wind Speed Verification',
      'Point-of-Common-Coupling (PCC) Mapping'
    ],
    metrics: [
      { label: 'Shadow Loss Margin', value: '< 1.5%' },
      { label: 'Wind Resistance Rating', value: '150+ km/h' },
      { label: 'Solar Resource Index', value: '5.2 kWh/m²' }
    ]
  },
  {
    number: '03',
    shortLabel: 'Design & Yield',
    title: 'System Design & Engineering Proposal',
    tag: 'Phase 03 · Blueprint & Yield',
    text: 'Using industry-leading PVSyst and AutoCAD simulation tools, we engineer the optimal electrical Single Line Diagram (SLD), string inverter configuration, and guaranteed generation models.',
    deliverables: [
      'PVSyst P50 / P90 Generation Yield Model',
      'Complete DC & AC Single Line Diagrams',
      'DISCOM CEIG Permitting & Net-Metering File'
    ],
    metrics: [
      { label: 'PR Efficiency Target', value: '82%+' },
      { label: 'Yield Modeling Tool', value: 'PVSyst V7.4' },
      { label: 'Grid Compliance', value: 'CEA / DISCOM Ready' }
    ]
  },
  {
    number: '04',
    shortLabel: 'Procurement',
    title: 'Procurement & Material Staging',
    tag: 'Phase 04 · Supply Chain',
    text: 'We source exclusively Tier-1 ALMM bifacial solar panels, high-efficiency string inverters, hot-dip galvanized mounting structures (80μ+ zinc coating), and multi-core armoured copper/aluminum cables.',
    deliverables: [
      'Tier-1 ALMM Bi-Facial Solar PV Modules',
      'Hot-Dip Galvanized GI Module Mounting Structures',
      'Factory Acceptance Testing (FAT) Certification'
    ],
    metrics: [
      { label: 'Module Quality Tier', value: 'Tier-1 ALMM' },
      { label: 'Galvanization Layer', value: '80+ Microns' },
      { label: 'Enclosure Standard', value: 'IP65 / IP68' }
    ]
  },
  {
    number: '05',
    shortLabel: 'Installation',
    title: 'Installation, Testing & Commissioning',
    tag: 'Phase 05 · Grid Synchronization',
    text: 'Certified solar engineers execute precision mechanical mounting, DC/AC cabling, sub-1Ω chemical earthing, lightning protection, anti-islanding testing, and official DISCOM bi-directional meter synchronization.',
    deliverables: [
      'Torque-Calibrated Mechanical GI Assembly',
      'Sub-1.0 Ω Chemical Earthing & SPD Arrestors',
      'Government CEIG Inspection & Meter Handover'
    ],
    metrics: [
      { label: 'Earthing Resistance', value: '< 1.0 Ω' },
      { label: 'Safety Track Record', value: 'Zero Incident' },
      { label: 'Testing Standard', value: 'IEC 62446 Validated' }
    ]
  },
  {
    number: '06',
    shortLabel: 'O&M Support',
    title: 'Support, SCADA Telemetry & Performance',
    tag: 'Phase 06 · 25-Year Stewardship',
    text: 'Post-commissioning, our monitoring center tracks real-time generation via IoT SCADA cloud telemetry, conducting scheduled module thermography, preventive cleaning, and ensuring maximum plant uptime.',
    deliverables: [
      '24/7 Cloud SCADA Generation Tracking',
      'Periodic Drone Thermographic Audits',
      '25-Year Output Warranty & Prompt SLA Support'
    ],
    metrics: [
      { label: 'Uptime SLA Guarantee', value: '99.2%' },
      { label: 'Performance Warranty', value: '25 Years' },
      { label: 'Support Response Window', value: '< 4 Hours' }
    ]
  }
]

function PhaseEngineeringIllustration({ phaseNumber }) {
  switch (phaseNumber) {
    case '01':
      return (
        <div className="phase-svg-graphic phase-svg-meter" aria-hidden="true">
          <svg viewBox="0 0 240 120" className="phase-illustration-svg">
            <rect x="10" y="10" width="220" height="100" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="22" y="22" width="196" height="42" rx="8" fill="#0f172a" />
            <text x="34" y="50" fill="#38bdf8" fontFamily="monospace" fontSize="20" fontWeight="800">42.8 kW</text>
            <text x="145" y="48" fill="#f59e0b" fontFamily="sans-serif" fontSize="11" fontWeight="700">● PEAK LOAD</text>
            {/* Waveform / Load profile */}
            <path d="M 24 95 Q 50 70 80 85 T 140 75 T 190 90 T 216 80" fill="none" stroke="#1565c0" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="140" cy="75" r="4" fill="#0284c7" />
            <text x="24" y="108" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">415V 3-PHASE · DISCOM TARIFF SYNC</text>
          </svg>
        </div>
      )
    case '02':
      return (
        <div className="phase-svg-graphic phase-svg-survey" aria-hidden="true">
          <svg viewBox="0 0 240 120" className="phase-illustration-svg">
            <rect x="10" y="10" width="220" height="100" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Sun angle & roof survey plane */}
            <circle cx="48" cy="38" r="14" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <line x1="48" y1="18" x2="48" y2="12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="48" y1="58" x2="48" y2="64" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="38" x2="22" y2="38" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="68" y1="38" x2="74" y2="38" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            {/* Roof plane polygon */}
            <polygon points="90,88 150,52 215,62 155,98" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
            {/* LiDAR grid lines */}
            <line x1="110" y1="76" x2="175" y2="86" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="130" y1="64" x2="195" y2="74" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
            {/* Ray trace */}
            <line x1="60" y1="46" x2="120" y2="70" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="92" y="32" fill="#0f172a" fontSize="10" fontWeight="700">AZIMUTH 180° · 28.4° TILT</text>
            <text x="24" y="108" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">3D SHADOW LOSS MARGIN &lt; 1.5%</text>
          </svg>
        </div>
      )
    case '03':
      return (
        <div className="phase-svg-graphic phase-svg-design" aria-hidden="true">
          <svg viewBox="0 0 240 120" className="phase-illustration-svg">
            <rect x="10" y="10" width="220" height="100" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Solar module array matrix */}
            <rect x="25" y="26" width="34" height="48" rx="3" fill="#1565c0" stroke="#93c5fd" strokeWidth="1" />
            <rect x="65" y="26" width="34" height="48" rx="3" fill="#1565c0" stroke="#93c5fd" strokeWidth="1" />
            <rect x="105" y="26" width="34" height="48" rx="3" fill="#1565c0" stroke="#93c5fd" strokeWidth="1" />
            <rect x="145" y="26" width="34" height="48" rx="3" fill="#1565c0" stroke="#93c5fd" strokeWidth="1" />
            {/* String wiring to inverter */}
            <path d="M 42 74 L 42 86 L 162 86 L 162 74" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <line x1="102" y1="86" x2="102" y2="98" stroke="#f59e0b" strokeWidth="2" />
            <rect x="188" y="34" width="32" height="40" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
            <text x="194" y="58" fill="#38bdf8" fontSize="9" fontWeight="800">INV</text>
            <text x="24" y="108" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">PVSYST SIMULATION · PR TARGET 82%+</text>
          </svg>
        </div>
      )
    case '04':
      return (
        <div className="phase-svg-graphic phase-svg-procurement" aria-hidden="true">
          <svg viewBox="0 0 240 120" className="phase-illustration-svg">
            <rect x="10" y="10" width="220" height="100" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="56" cy="54" r="28" fill="#e0f2fe" stroke="#1565c0" strokeWidth="2" strokeDasharray="5 3" />
            <text x="42" y="58" fill="#1565c0" fontSize="12" fontWeight="800">ALMM</text>
            <rect x="102" y="28" width="114" height="24" rx="6" fill="#0f172a" />
            <text x="112" y="44" fill="#4ade80" fontSize="10" fontWeight="700">✓ TIER-1 PASS FAT</text>
            <rect x="102" y="58" width="114" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
            <text x="112" y="74" fill="#0369a1" fontSize="9.5" fontWeight="700">80μ+ HDG STRUCTURE</text>
            <text x="24" y="108" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">APPROVED MODULES & IP68 ENCLOSURES</text>
          </svg>
        </div>
      )
    case '05':
      return (
        <div className="phase-svg-graphic phase-svg-install" aria-hidden="true">
          <svg viewBox="0 0 240 120" className="phase-illustration-svg">
            <rect x="10" y="10" width="220" height="100" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Grounding and structure sync */}
            <line x1="30" y1="78" x2="130" y2="78" stroke="#334155" strokeWidth="3" />
            <polygon points="40,78 60,38 120,38 100,78" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Earth spike */}
            <line x1="80" y1="78" x2="80" y2="98" stroke="#10b981" strokeWidth="2" />
            <line x1="72" y1="90" x2="88" y2="90" stroke="#10b981" strokeWidth="2" />
            <line x1="75" y1="94" x2="85" y2="94" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="178" cy="54" r="24" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
            <text x="162" y="52" fill="#22c55e" fontSize="9" fontWeight="800">NET-MTR</text>
            <text x="164" y="66" fill="#ffffff" fontSize="11" fontWeight="700">SYNC</text>
            <text x="24" y="108" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">SUB-1.0 Ω CHEMICAL EARTHING VERIFIED</text>
          </svg>
        </div>
      )
    case '06':
    default:
      return (
        <div className="phase-svg-graphic phase-svg-om" aria-hidden="true">
          <svg viewBox="0 0 240 120" className="phase-illustration-svg">
            <rect x="10" y="10" width="220" height="100" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="24" y="24" width="94" height="48" rx="8" fill="#0f172a" />
            <text x="34" y="44" fill="#94a3b8" fontSize="8.5" fontWeight="700">GENERATION</text>
            <text x="34" y="63" fill="#38bdf8" fontSize="14" fontWeight="800">128.4 MWh</text>
            <rect x="126" y="24" width="90" height="48" rx="8" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1" />
            <text x="136" y="44" fill="#047857" fontSize="8.5" fontWeight="700">PR YIELD</text>
            <text x="136" y="63" fill="#059669" fontSize="14" fontWeight="800">↗ +18.4%</text>
            <text x="24" y="96" fill="#0f172a" fontSize="10" fontWeight="700">99.2% UPTIME SLA GUARANTEE</text>
            <text x="24" y="108" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">24/7 IOT SCADA TELEMETRY MONITORING</text>
          </svg>
        </div>
      )
  }
}

function ProcessPipelineCockpit({ eyebrow, title, subtitle, intro, ctaText = 'Start your project' }) {
  const [activeStep, setActiveStep] = useState(0)
  const current = pipelinePhases[activeStep]
  const total = pipelinePhases.length

  return (
    <section className="proc-section" id="how-we-work">
      <div className="proc-wrap">

        {/* Header */}
        <Reveal className="proc-header">
          <p className="proc-eyebrow">
            <span className="proc-eyebrow-line" aria-hidden="true" />
            {eyebrow || '03 — HOW WE WORK'}
          </p>
          <h2 className="proc-heading">
            {title || 'From planning'}&nbsp;<em>{subtitle || 'to performance.'}</em>
          </h2>
          <p className="proc-lead">
            {intro || 'A six-stage engineering process designed to take your solar project from feasibility to long-term performance.'}
          </p>
        </Reveal>

        {/* Main Layout */}
        <div className="proc-layout">

          {/* Left: Phase Selector Tabs */}
          <nav className="proc-tabs" aria-label="Project phases">
            {/* Animated progress spine */}
            <div className="proc-spine-track" aria-hidden="true">
              <div
                className="proc-spine-fill"
                style={{ height: `${(activeStep / (total - 1)) * 100}%` }}
              />
            </div>

            {pipelinePhases.map((phase, idx) => {
              const isActive = idx === activeStep
              const isDone = idx < activeStep
              return (
                <button
                  key={phase.number}
                  type="button"
                  className={`proc-tab${isActive ? ' is-active' : ''}${isDone ? ' is-done' : ''}`}
                  onClick={() => setActiveStep(idx)}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span className="proc-tab-dot" aria-hidden="true">
                    {isDone ? <FiCheckCircle /> : <span className="proc-tab-dot-inner" />}
                  </span>
                  <span className="proc-tab-body">
                    <span className="proc-tab-num">Phase {phase.number}</span>
                    <span className="proc-tab-name">{phase.shortLabel}</span>
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Right: Content — key forces remount → triggers CSS entry animation */}
          <div key={activeStep} className="proc-content">

            {/* Phase tag */}
            <div className="proc-content-tag">
              <span className="proc-tag-badge">{current.tag}</span>
              <span className="proc-tag-fraction">{current.number} of 0{total}</span>
            </div>

            {/* Title + body */}
            <h3 className="proc-content-title">{current.title}</h3>
            <p className="proc-content-text">{current.text}</p>

            {/* Metrics */}
            <div className="proc-kpi-row">
              {current.metrics.map((m, i) => (
                <div key={m.label} className="proc-kpi" style={{ animationDelay: `${i * 80}ms` }}>
                  <strong className="proc-kpi-val">{m.value}</strong>
                  <span className="proc-kpi-lbl">{m.label}</span>
                  <div className="proc-kpi-track">
                    <div
                      className="proc-kpi-bar"
                      style={{ width: i === 0 ? '100%' : i === 1 ? '94%' : '82%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Deliverables */}
            <div className="proc-deliv-wrap">
              <p className="proc-deliv-heading">Key Deliverables</p>
              <ul className="proc-deliv-list">
                {current.deliverables.map((d, i) => (
                  <li
                    key={d}
                    className="proc-deliv-item"
                    style={{ animationDelay: `${120 + i * 70}ms` }}
                  >
                    <FiCheckCircle className="proc-deliv-check" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer: nav + cta */}
            <div className="proc-footer">
              <div className="proc-nav-row">
                <button
                  type="button"
                  className="proc-nav-btn"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(p => Math.max(0, p - 1))}
                  aria-label="Previous phase"
                >← Prev</button>
                <span className="proc-nav-count">
                  {String(activeStep + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  className="proc-nav-btn"
                  disabled={activeStep === total - 1}
                  onClick={() => setActiveStep(p => Math.min(total - 1, p + 1))}
                  aria-label="Next phase"
                >Next →</button>
              </div>
              <a
                href="/contact"
                onClick={e => { e.preventDefault(); navigate('/contact') }}
                className="proc-cta"
              >
                {ctaText} <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


const aboutPrinciples = [
  ['01', 'Clean energy future', 'Accelerate the adoption of solar and renewable energy for a cleaner tomorrow.'],
  ['02', 'Trusted solar partner', 'Build long-term trust through dependable solutions, professional service, and responsible execution.'],
  ['03', 'Smarter energy solutions', 'Promote practical and efficient solar solutions that help customers make better use of energy.'],
  ['04', 'Sustainable growth', 'Support sustainable development by helping reduce dependence on conventional energy sources.'],
  ['05', 'Wider energy access', 'Make suitable solar solutions more accessible to businesses, industries, homes, and communities.'],
  ['06', "India's energy transition", "Play a meaningful role in India's journey towards cleaner and more sustainable energy."],
]

const missionPrinciples = [
  ['01', 'Engineering excellence'], ['02', 'Quality & safety'], ['03', 'Customer-centric solutions'],
  ['04', 'End-to-end execution'], ['05', 'Energy efficiency'], ['06', 'Long-term customer support'],
]

const journeyStages = [
  ['01', 'Building our foundation', 'We began by developing strong capabilities in electrical and solar solutions, building practical experience and technical expertise through project execution.'],
  ['02', 'Growing solar expertise', 'Our capabilities expanded across solar engineering, system design, procurement, installation, and project execution, enabling complete solar solutions.'],
  ['03', 'Expanding across India', 'Our project experience grew across 9 states in India, strengthening our ability to undertake projects across different locations and requirements.'],
  ['04', 'Moving to larger projects', 'We expanded into commercial and industrial projects, including MW-scale solar power plants, strengthening large-project execution capabilities.'],
  ['05', 'Government & residential solar', 'We expanded across government solar initiatives and residential rooftop projects, including implementation under PM Surya Ghar.'],
  ['06', 'Building the next chapter', 'Today, we continue to strengthen capabilities with a focus on quality, technology, energy efficiency, professional execution, and customer support.'],
]

const aboutCapabilities = [
  ['01', 'Solar EPC', 'Complete Engineering, Procurement and Construction solutions covering design, procurement, installation, and commissioning.'],
  ['02', 'Commercial & industrial solar', 'Customized solar solutions designed around project needs and energy usage.'],
  ['03', 'Residential rooftop solar', 'Rooftop solar solutions for homes with support for installation and applicable solar scheme requirements.'],
  ['04', 'Government solar projects', 'Solar solutions and project implementation for government requirements and initiatives.'],
  ['05', 'Installation & commissioning', 'Professional installation, testing, commissioning, and system handover for solar projects.'],
  ['06', 'Operation & maintenance', 'Ongoing operation and maintenance support to help solar systems operate reliably.'],
  ['07', 'Solar products & systems', 'Solar panels, inverters, earth pits, lightning arrestors, accessories, and other required system components.'],
]

const aboutProcess = [
  ['01', 'Consultation & requirement assessment', 'Understand energy requirements, project objectives, site needs, and expectations.'],
  ['02', 'Site assessment', 'Assess the site and relevant technical conditions to understand the project requirements.'],
  ['03', 'System design & proposal', 'Prepare the system design and project proposal based on requirements and project scope.'],
  ['04', 'Engineering & procurement', 'Carry out engineering and arrange the required solar equipment and system components.'],
  ['05', 'Installation & commissioning', 'Handle installation, testing, and commissioning to bring the solar system into operation.'],
  ['06', 'Support & maintenance', 'Provide ongoing support and maintenance following commissioning.'],
]

const installationServices = [
  { number: '01', title: 'Commercial solar installation', text: 'Turnkey solar installations for commercial establishments, designed to make effective use of available rooftop or project space and support the transition to clean energy.', detail: 'We support the project through requirement assessment, site evaluation, system planning, installation, testing, and commissioning.', benefits: ['Potential reduction in electricity costs', 'Efficient use of available rooftop space', 'Grid-connected system options', 'Customized system sizing', 'Professional installation and commissioning', 'Long-term solar energy generation', 'Support for applicable net-metering requirements'], applications: 'Offices, shopping centres, hospitals, hotels, educational institutions, and commercial buildings.', image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=88' },
  { number: '02', title: 'Residential solar installation', text: 'Reliable rooftop solar solutions for homes, planned according to household electricity requirements, available roof area, and applicable solar program requirements.', detail: 'We support customers from initial consultation and site assessment through system installation and commissioning.', benefits: ['Clean and renewable electricity generation', 'Potential reduction in household electricity bills', 'Effective rooftop utilization', 'Grid-connected rooftop solutions', 'Customized system planning', 'Support for applicable government schemes', 'Low-maintenance energy solution'], applications: 'Individual homes, apartments, residential buildings, villas, and housing communities.', image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1400&q=88' },
  { number: '03', title: 'Industrial solar installation', text: 'Solar solutions designed for industrial facilities with larger energy requirements and more complex site and electrical conditions.', detail: 'Our approach considers the facility, energy requirement, available installation area, electrical infrastructure, and project scope before implementation.', benefits: ['Supports large energy requirements', 'Potential reduction in electricity expenditure', 'Efficient use of industrial rooftops or available land', 'Customized system design', 'Professional installation and commissioning', 'Suitable for larger solar capacities', 'Ongoing maintenance support'], applications: 'Factories, manufacturing units, warehouses, processing facilities, and industrial campuses.', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=88' },
]

const servicesProcess = [
  ['01', 'Consultation & requirement assessment', 'Understand energy requirements, project objectives, site needs, and expectations.'],
  ['02', 'Site assessment', 'Assess the site and relevant technical conditions.'],
  ['03', 'System design & proposal', 'Prepare the system design and project proposal aligned with required capacity and project scope.'],
  ['04', 'Engineering & procurement', 'Carry out required engineering and arrange solar equipment and system components.'],
  ['05', 'Installation & commissioning', 'Handle installation, testing, and commissioning.'],
  ['06', 'Support & maintenance', 'Provide ongoing support and maintenance following commissioning.'],
]

const omBenefits = ['Regular system inspection', 'Preventive maintenance', 'Performance monitoring', 'Fault identification', 'Electrical and equipment checks', 'Maintenance planning', 'Ongoing technical support']
const adoptionAreas = [
  ['Energy efficiency solutions', "Help identify opportunities to make better use of energy through practical energy-efficiency approaches aligned with the customer's requirements."],
  ['Subsidy assistance', 'Guidance regarding applicable government solar subsidy schemes, eligibility considerations, documentation, and related processes.'],
  ['Financing assistance', 'Support in understanding available financing possibilities and the considerations involved in planning a solar investment.'],
  ['Net metering assistance', 'Guidance on the applicable net-metering process, technical requirements, documentation, and coordination for eligible solar installations.'],
]
const adoptionBenefits = ['Better understanding of energy consumption', 'Guidance on applicable solar schemes', 'Support with relevant documentation', 'Financing guidance', 'Net-metering process assistance', 'Better planning of solar investments', 'Support throughout the applicable process']
const productItems = ['Solar PV panels', 'Solar inverters', 'Earth pits', 'Lightning arrestors', 'Solar accessories']

const productCategories = ['Solar Panels', 'Solar Inverters', 'Earth Pits & Lightning Arrestors', 'Accessories']

const productCategoryImages = {
  'Solar Panels': 'https://tse2.mm.bing.net/th/id/OIP.Uk-gBBAPNXoTYcLKUea27QHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  'Solar Inverters': 'https://www.livemint.com/lm-img/img/2023/10/26/1600x900/2-0-753746399-solar-0_1680330329680_1698338750055.jpg',
  'Earth Pits & Lightning Arrestors': 'https://tse3.mm.bing.net/th/id/OIP.NnEW42ljKQbA0343soSdwgHaEJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  'Accessories': 'https://tse1.mm.bing.net/th/id/OIP.MXONou_5bkxe7B-FmrD9AgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
}

function displayProductCategory(category = '') {
  const value = category.toLowerCase()
  if (value.includes('panel')) return 'Solar Panels'
  if (value.includes('inverter')) return 'Solar Inverters'
  if (value.includes('earth') || value.includes('arrest')) return 'Earth Pits & Lightning Arrestors'
  return 'Accessories'
}


const solutionCatalog = [
  ['01', 'Commercial solar installation', 'Turnkey solar installations for commercial establishments, planned around rooftop or project space, requirement assessment, installation, testing, and commissioning.'],
  ['02', 'Residential solar installation', 'Reliable rooftop solar solutions planned around household electricity requirements, available roof area, and applicable solar program requirements.'],
  ['03', 'Industrial solar installation', 'Solar solutions for industrial facilities with larger energy requirements and more complex site and electrical conditions.'],
  ['04', 'Solar EPC solutions', 'End-to-end Engineering, Procurement and Construction services covering design, procurement, installation, testing, commissioning, and handover.'],
  ['05', 'Government solar projects', 'Solar solutions and project implementation based on government requirements, site conditions, scope, documentation, and applicable guidelines.'],
  ['06', 'PM Surya Ghar', 'Residential rooftop solar implementation support for eligible customers, subject to scheme guidelines and customer eligibility.'],
  ['07', 'Open access solar power', 'Renewable power solutions for eligible commercial and industrial consumers looking to source solar electricity through applicable arrangements.'],
  ['08', 'On-site power solutions', "Renewable-energy solutions designed to generate power at or near the customer's facility, based on energy requirements and available resources."],
  ['09', 'Off-site renewable power', 'Renewable-energy solutions for customers sourcing clean electricity from renewable generation facilities away from their own premises.'],
  ['10', 'Asset management', 'Operational coordination, performance review, maintenance planning, issue tracking, reporting, and management of renewable-energy assets.'],
  ['11', 'Infrastructure management', 'Inspection, maintenance coordination, issue identification, and operational support for relevant solar project infrastructure.'],
  ['12', 'Operation & maintenance', 'Professional O&M services supporting reliable operation after commissioning through inspection, preventive maintenance, monitoring, and technical support.'],
  ['13', 'Solar product supply', 'Supply of solar PV panels, inverters, earth pits, lightning arrestors, accessories, and other project-specific system components.'],
  ['14', 'Solar lighting solutions', 'Solar-powered lighting solutions planned for suitable outdoor and infrastructure applications.'],
  ['15', 'Solar battery solutions', 'Battery-based solar solutions for energy storage, backup, and greater flexibility in energy usage.'],
]

function AboutPage() {
  const [horizonTab, setHorizonTab] = useState('vision')
  const { companyOverview, leadership, chairmanMessage, visionAndMission, journey, whatWeDo, howWeWork } = aboutContent

  return (
    <>
     <SEO
        title="About N Solutions | 16+ Years of Solar & EPC Experience"
        description="Discover N Solutions, a solar EPC and renewable energy company with 16+ years of experience delivering solar solutions across residential, commercial, industrial and government sectors."
        keywords="about N Solutions, solar company India, solar EPC company, renewable energy company, solar engineering company"
        path="/about"
          />
  <div className="about-page"><ScrollProgressBar /><SiteHeader activePath="/about" /><main>

    <section className="about-hero">
      {/* Solar energy background video — download from pixabay.com/videos/solar-panels-solar-power-plant-177600/ and place in public/media/solar-hero.mp4 */}
      <video
        className="about-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/media/solar-hero.mp4" type="video/mp4" />
      </video>
      <div className="about-hero-shade" />
      <div className="wrap about-hero-content">
        <p className="eyebrow light"><span /> {companyOverview.eyebrow}</p>
        <h1>{companyOverview.title}<br /><em>{companyOverview.subtitle}</em></h1>
        <p>{companyOverview.lead}</p>
      </div>
    </section>



    <section className="about-overview" aria-labelledby="company-overview-title">
      <div className="wrap">
        <Reveal className="about-overview-chapter">
          <p><b>01</b><span>—</span> Company overview</p>
          <i aria-hidden="true" />
          <span className="about-overview-chapter-meta">Solar EPC · Engineering & Infrastructure</span>
        </Reveal>

        <div className="about-overview-main">
          <div className="about-overview-left">
            <Reveal className="about-overview-heading">
              <h2 id="company-overview-title">
                Engineering Solar Solutions.<br />
                <em>Powering a Sustainable Future.</em>
              </h2>
            </Reveal>

            <Reveal className="about-overview-copy">
              <p className="about-lead">{companyOverview.lead}</p>
              {companyOverview.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </Reveal>

            <Reveal className="about-overview-timeline">
              <div className="timeline-strip" aria-label="N Solutions journey: Beginning, Experience, Growth, Today">
                <span className="timeline-step">Beginning</span>
                <span className="timeline-arrow"><FiChevronRight style={{ verticalAlign: 'middle' }} /></span>
                <span className="timeline-step">Experience</span>
                <span className="timeline-arrow"><FiChevronRight style={{ verticalAlign: 'middle' }} /></span>
                <span className="timeline-step">Growth</span>
                <span className="timeline-arrow"><FiChevronRight style={{ verticalAlign: 'middle' }} /></span>
                <span className="timeline-step is-current">Today</span>
              </div>
            </Reveal>
          </div>

          <div className="about-overview-right">
            <Reveal className="about-overview-visual">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85"
                alt="N Solutions solar energy infrastructure"
                className="about-overview-image"
                loading="eager"
              />
              <div className="about-overview-image-badge">
                <span className="badge-tag">NS / 01</span>
                <div className="badge-info">
                  <strong>Nationwide Solar EPC</strong>
                  <small>Engineering · Procurement · Construction</small>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 3 Core Pillars: Our Approach, Our Experience, Our Commitment */}
        <Reveal className="about-pillars-grid">
          {companyOverview.pillars.map((pillar) => (
            <div className="about-pillar-card" key={pillar.title}>
              <span className="about-pillar-number">{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>


    {/* Proven Execution Scale & Sector Milestones */}
    <section className="about-milestones-showcase" id="project-scale">
      <div className="wrap">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow light"><span /> 02 — Proven Execution Scale</p>
            <h2>Proven delivery.<br /><em>Tangible impact.</em></h2>
          </div>
          <p className="heading-note">
            Over 1,270+ turnkey solar installations engineered and commissioned across residential clusters, public sector infrastructure, commercial hubs, and industrial plants.
          </p>
        </Reveal>

        <div className="milestones-cards-grid">
          <Reveal className="milestone-feature-card milestone-card-pm">
            <div className="milestone-card-top">
              <span className="milestone-icon-badge"><FiSun /></span>
              <span className="milestone-sector-tag">Rooftop Solar</span>
            </div>
            <div className="milestone-card-metric">
              <AnimatedMetric value={750} suffix="+" label="Sites Completed" delay={120} />
            </div>
            <h3>PM Surya Ghar</h3>
            <p>Subsidized residential solar installations delivering clean energy across Andhra Pradesh and nationwide.</p>
          </Reveal>

          <Reveal className="milestone-feature-card milestone-card-residential">
            <div className="milestone-card-top">
              <span className="milestone-icon-badge"><FiHome /></span>
              <span className="milestone-sector-tag">Residential</span>
            </div>
            <div className="milestone-card-metric">
              <AnimatedMetric value={140} suffix="+" label="Rooftops Commissioned" delay={220} />
            </div>
            <h3>Residential Projects</h3>
            <p>Custom rooftop systems engineered for independent homes, luxury villas, and multi-family residential clusters.</p>
          </Reveal>

          <Reveal className="milestone-feature-card milestone-card-govt">
            <div className="milestone-card-top">
              <span className="milestone-icon-badge"><FiShield /></span>
              <span className="milestone-sector-tag">Government</span>
            </div>
            <div className="milestone-card-metric">
              <AnimatedMetric value={120} suffix="+" label="Institutional Sites" delay={320} />
            </div>
            <h3>Government Projects</h3>
            <p>High-standard solar installations for civic administrative buildings, educational institutions, and public utilities.</p>
          </Reveal>

          <Reveal className="milestone-feature-card milestone-card-commercial">
            <div className="milestone-card-top">
              <span className="milestone-icon-badge"><FiBriefcase /></span>
              <span className="milestone-sector-tag">Commercial</span>
            </div>
            <div className="milestone-card-metric">
              <AnimatedMetric value={200} suffix="+" label="Enterprises Powered" delay={420} />
            </div>
            <h3>Commercial Projects</h3>
            <p>Turnkey grid-connected solar installations for hospitals, IT offices, colleges, hotels, and retail complexes.</p>
          </Reveal>

          <Reveal className="milestone-feature-card milestone-card-industrial">
            <div className="milestone-card-top">
              <span className="milestone-icon-badge"><FiZap /></span>
              <span className="milestone-sector-tag">High-Voltage</span>
            </div>
            <div className="milestone-card-metric">
              <AnimatedMetric value={60} suffix="+" label="MW-Scale & Plants" delay={520} />
            </div>
            <h3>Industrial Projects</h3>
            <p>Multi-megawatt and heavy rooftop solar plants engineered for factories, manufacturing units, and warehouses.</p>
          </Reveal>
        </div>

        <Reveal className="milestones-summary-strip">
          <div className="summary-stat">
            <AnimatedMetric value={1270} suffix="+" label="Total Installations Across 9 States" delay={250} />
          </div>
          <div className="summary-divider" aria-hidden="true" />
          <div className="summary-text">
            <p>Engineering excellence grounded in 16+ years of specialized solar EPC operations throughout India.</p>
          </div>
          <a className="button button-accent" href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>
            Explore Our Projects <Arrow />
          </a>
        </Reveal>
      </div>
    </section>

    {/* Our Leadership & Vision */}
    <section className="about-leadership-section" id="leadership">
      <div className="wrap">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow"><span /> {leadership?.eyebrow || "03 — Our Leadership"}</p>
            <h2>{leadership?.title || "Pioneering Vision."}<br /><em>{leadership?.subtitle || "Responsible Execution."}</em></h2>
          </div>
          <p className="heading-note">{leadership?.lead || chairmanMessage.lead}</p>
        </Reveal>

        {/* 2 Leadership Cards */}
        <div className="leadership-cards-grid">
          {(leadership?.leaders || []).map((leader, idx) => (
            <Reveal className="leadership-card" key={idx}>
              <div className="leadership-image-wrap">
                <img
                  src={leader.image}
                  alt={`${leader.name} - ${leader.role}`}
                  loading="eager"
                  className={idx === 0 ? 'leadership-image-founder' : 'leadership-image-manager'}
                  onError={(e) => {
                    if (idx === 0) e.target.src = '/leadership/smt-r-lakshmi-bai-full.png'
                    else e.target.src = '/leadership/sri-ch-csv-raju-full.jpg'
                  }}
                />
                <div className="leadership-image-scrim" />
                <span className="leadership-badge">{leader.badge || leader.role}</span>
              </div>
              <div className="leadership-info">
                <h3 className="leadership-name">{leader.name}</h3>
                <p className="leadership-role">{leader.role}</p>
                <p className="leadership-bio">{leader.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Leadership Philosophy & Vision Narrative */}
        <div className="about-leadership-narrative">
          <Reveal className="about-narrative-copy">
            {chairmanMessage.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </Reveal>
          <Reveal className="about-narrative-quote">
            <blockquote>{chairmanMessage.quote}</blockquote>
            <div className="signature">
              <strong>{chairmanMessage.author}</strong>
              <small>{chairmanMessage.role}</small>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="about-vision">
      <div className="wrap">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow"><span /> {visionAndMission.eyebrow}</p>
            <h2>{visionAndMission.title}<br /><em>{visionAndMission.subtitle}</em></h2>
          </div>
          <p className="heading-note">{visionAndMission.intro}</p>
        </Reveal>

        <div className="horizon-mission-container">
          {/* Interactive Horizon Switcher */}
          <div className="horizon-tabs-nav">
            <button
              type="button"
              className={`horizon-tab-btn ${horizonTab === 'vision' ? 'is-active' : ''}`}
              onClick={() => setHorizonTab('vision')}
            >
              <FiSun size={15} /> Our Vision
            </button>
            <button
              type="button"
              className={`horizon-tab-btn mission-tab ${horizonTab === 'mission' ? 'is-active' : ''}`}
              onClick={() => setHorizonTab('mission')}
            >
              <FiShield size={15} /> Our Mission
            </button>
          </div>

          {horizonTab === 'vision' ? (
            <Reveal className="horizon-stage-canvas">
              <div className="horizon-manifesto-box">
                <span className="horizon-manifesto-badge">
                  <FiCompass /> Our Vision
                </span>
                <h3>{visionAndMission.vision.title}</h3>
                <p>{visionAndMission.vision.text}</p>
              </div>

              <div className="horizon-vectors-stream">
                {visionAndMission.vision.principles.map(([num, t, d]) => (
                  <div className="horizon-vector-item" key={num}>
                    <div className="vector-icon-circle">
                      {getVisionIcon(num)}
                    </div>
                    <div className="vector-content">
                      <span className="vector-meta-tag">Principle · {num}</span>
                      <h4>{t}</h4>
                      <p>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal className="horizon-stage-canvas">
              <div className="horizon-manifesto-box">
                <span className="horizon-manifesto-badge mission-badge">
                  <FiSliders /> Our Mission
                </span>
                <h3>{visionAndMission.mission.title}</h3>
                <p>{visionAndMission.mission.text}</p>
              </div>

              <div className="horizon-vectors-stream">
                {visionAndMission.mission.principles.map(([num, t, d]) => (
                  <div className="horizon-vector-item mission-item" key={num}>
                    <div className="vector-icon-circle">
                      {getMissionIcon(num)}
                    </div>
                    <div className="vector-content">
                      <span className="vector-meta-tag">Principle · {num}</span>
                      <h4>{t}</h4>
                      <p>{d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="guiding-principle-ribbon">
                <blockquote>{visionAndMission.guidingPrinciple}</blockquote>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>

    {/* Our Journey */}
    <section className="about-journey wrap">
      <Reveal className="section-heading">
        <div>
          <p className="eyebrow"><span /> {journey.eyebrow}</p>
          <h2>{journey.title}<br /><em>{journey.subtitle}</em></h2>
        </div>
        <p className="heading-note">{journey.intro}</p>
      </Reveal>
      <div className="journey-timeline">
        {journey.stages.map(([number, title, text]) => (
          <Reveal className="journey-stage" key={number}>
            <span>{number}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="today-beyond">
        <strong>Today & beyond</strong>
        <p>{journey.todayAndBeyond}</p>
      </div>
      <p className="process-flow" style={{ marginTop: '28px' }}>{journey.flow}</p>
    </section>

    {/* What We Do - Visual Capability Showcase */}
    <section className="about-capabilities">
      <div className="wrap">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow light"><span /> {whatWeDo.eyebrow}</p>
            <h2>{whatWeDo.title}<br /><em>{whatWeDo.subtitle}</em></h2>
          </div>
          <p className="heading-note">{whatWeDo.intro}</p>
        </Reveal>
        <div className="capability-grid capability-grid-modern">
          {whatWeDo.capabilities.map((cap) => {
            const num = cap.number || cap[0]
            const title = cap.title || cap[1]
            const text = cap.text || cap[2]
            const image = cap.image || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=85'
            const tag = cap.tag || 'Solar Capability'
            const icon = getCapabilityIcon(num)
            return (
              <Reveal className="capability-card-modern" key={num}>
                <div className="capability-image-wrap">
                  <img src={image} alt={title} loading="lazy" />
                  <div className="capability-image-overlay" />
                  <span className="capability-num-badge">{num}</span>
                  <span className="capability-tag-badge">{tag}</span>
                </div>
                <div className="capability-content">
                  <div className="capability-title-row">
                    <span className="capability-icon">{icon}</span>
                    <h3>{title}</h3>
                  </div>
                  <p>{text}</p>
                  <a href="/services" onClick={(e) => { e.preventDefault(); navigate('/services') }} className="capability-link">
                    Explore Solutions <Arrow />
                  </a>
                </div>
              </Reveal>
            )
          })}
        </div>
        <p className="capability-flow">{whatWeDo.flow}</p>
      </div>
    </section>

    {/* How We Work - Interactive Process Pipeline Cockpit */}
    <ProcessPipelineCockpit
      theme="light"
      eyebrow={howWeWork.eyebrow}
      title={howWeWork.title}
      subtitle={howWeWork.subtitle}
      intro={howWeWork.intro}
      flow={howWeWork.flow}
      ctaText="Discuss Project Execution"
    />

    {/* Verified Testimonials */}
    <section className="about-credentials wrap">
      <Reveal className="section-heading">
        <div>
          <p className="eyebrow"><span /> 07 — Client Trust & Performance</p>
          <h2>Proven delivery,<br /><em>direct feedback.</em></h2>
        </div>
        <p className="heading-note">Authentic testimonials from industrial leaders, institutions, and residential clusters.</p>
      </Reveal>
      <TestimonialsShowcase theme="light" />
    </section>
    <IndustriesSection />
    {/* CTA */}
    <section className="about-cta">
      <div className="wrap">
        <p className="eyebrow"><span /> One partner. Complete solar solutions.</p>
        <h2>From experience<br /><em>to a sustainable future.</em></h2>
        <p>Assess <FiChevronRight style={{ verticalAlign: 'middle' }} /> Design <FiChevronRight style={{ verticalAlign: 'middle' }} /> Supply <FiChevronRight style={{ verticalAlign: 'middle' }} /> Install <FiChevronRight style={{ verticalAlign: 'middle' }} /> Commission <FiChevronRight style={{ verticalAlign: 'middle' }} /> Operate <FiChevronRight style={{ verticalAlign: 'middle' }} /> Maintain</p>
        <a className="button button-accent" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>
          Talk to N Solutions About Your Project <Arrow />
        </a>
      </div>
    </section>
  </main><SiteFooter /></div>
  </>
  )
}

function ServicesPage() {
  const { header, services, cta } = servicesAndSolutionsContent

  return (
    <>
    <SEO
        title="Solar Services & Solutions | N Solutions India"
        description="Explore N Solutions' complete solar services including solar EPC, commercial and industrial installation, rooftop solar, O&M, open access, asset management and renewable energy solutions."
        keywords="solar services India, solar EPC services, solar installation, solar O&M, rooftop solar, open access solar, asset management"
        path="/services"
           />
    <div className="services-page">
      <ScrollProgressBar />
      <SiteHeader activePath="/services" />
      <main>
        <section className="services-hero">
          <video className="hero-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
            <source src="/media/products.mp4" type="video/mp4" />
          </video>
          <div className="services-hero-shade" />

          <div className="wrap services-hero-content">
            <p className="eyebrow light">
              <span /> {header.eyebrow}
            </p>

            <h1>
              {header.title}<br />
              <em>{header.subtitle}</em>
            </h1>

            <p>{header.intro}</p>

            <a className="button button-accent" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>
              Talk to N Solutions About Your Project <Arrow />
            </a>
          </div>

          <div className="services-hero-marker">
            <span>NS / 04</span>
            <small>
              Solar lifecycle<br />
              engineering
            </small>
          </div>
        </section>

        {/* 15 Comprehensive Services & Solutions Catalog */}
        <section className="wrap" style={{ padding: '80px 0 60px' }}>
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow"><span /> Complete Portfolio</p>
              <h2>Our Solar Services<br /><em>& Solutions</em></h2>
            </div>
            <p className="heading-note">
              From turnkey EPC and utility-scale installations to rooftop PM Surya Ghar, O&M, and energy advisory, explore our 15 end-to-end solar solutions.
            </p>
          </Reveal>

          <div className="services-catalog-grid">
            {services.map((service) => (
              <Reveal className="service-catalog-card" key={service.number}>
                {service.image && (
                  <div className="service-catalog-image-wrap">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                    />
                    <div className="service-catalog-img-scrim" />
                    <div className="service-catalog-badges">
                      <span className="service-catalog-num">{service.number}</span>
                      {service.tag && <span className="service-catalog-tag">{service.tag}</span>}
                    </div>
                  </div>
                )}


                <div className="service-catalog-body">
                  <div className="service-catalog-title-row">
                    <span className="service-catalog-icon">{getServiceIcon(service.number)}</span>
                    <div>
                      {service.subtitle && <span className="service-catalog-badge">{service.subtitle}</span>}
                      <h3 className="service-catalog-title">{service.title}</h3>
                    </div>
                  </div>

                  <p className="service-catalog-text">{service.text}</p>
                  {service.detail && <p className="service-catalog-detail">{service.detail}</p>}

                  {service.subAreas && service.subAreas.length > 0 && (
                    <div className="service-subareas-list">
                      {service.subAreas.map((sub) => (
                        <div className="service-subarea-box" key={sub.title}>
                          <strong>{sub.title}</strong>
                          <p>{sub.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.benefits && service.benefits.length > 0 && (
                    <div className="service-benefits-wrap">
                      <strong>Key Benefits</strong>
                      <ul className="service-benefits-list">
                        {service.benefits.map((b) => (
                          <li key={b}>
                            <span className="benefit-check-icon" aria-hidden="true"><FiCheck /></span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.applications && (
                    <div className="service-apps-row">
                      <span className="apps-label">Applications:</span>
                      <p className="apps-content">{service.applications}</p>
                    </div>
                  )}

                  <div className="service-card-footer">
                    <a
                      href="/contact"
                      onClick={(e) => { e.preventDefault(); navigate('/contact') }}
                      className="service-catalog-cta-btn"
                    >
                      Enquire for this service <Arrow />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Structured Process Flow */}
        <section className="services-process">
          <div className="wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow light"><span /> Project execution process</p>
                <h2>From requirement<br /><em>to support.</em></h2>
              </div>
              <p className="heading-note">A structured project journey carefully planned and executed across every milestone.</p>
            </Reveal>
            <div className="services-process-line">
              {servicesProcess.map(([number, title, text]) => (
                <Reveal className="services-process-step" key={number} tabIndex="0">
                  <span>{number}</span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </Reveal>
              ))}
            </div>
            <p className="process-flow light-flow">Requirement <i><FiChevronRight style={{ verticalAlign: 'middle' }} /></i> Design <i><FiChevronRight style={{ verticalAlign: 'middle' }} /></i> Execution <i><FiChevronRight style={{ verticalAlign: 'middle' }} /></i> Support</p>
          </div>
        </section>

        {/* CTA section */}
        <section className="services-cta">
          <div className="wrap">
            <p className="eyebrow"><span /> {cta.eyebrow}</p>
            <h2>{cta.title}<br /><em>{cta.subtitle}</em></h2>
            <p>{cta.text}</p>
            <p className="cta-flow">{cta.flow}</p>
            <a className="button button-accent" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>
              {cta.buttonText} <Arrow />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
    </>
  )
}


function RouteShell() {
  return (
    <>
      <SEO title="Page Not Found | N Solutions" description="The page you requested could not be found." path={window.location.pathname} noIndex />
      <div className="route-shell">
        <SiteHeader activePath={window.location.pathname} />
        <main>
          <p className="eyebrow"><span /> N Solutions Solar EPC</p>
          <h1>Page not found</h1>
          <p>The page may have moved or the address may be incorrect.</p>
          <a className="button button-accent" href="/" onClick={(event) => { event.preventDefault(); navigate('/') }}>Back to Home <Arrow /></a>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname)
    const onCustomRoute = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    window.addEventListener('nsolutions-route-change', onCustomRoute)

    let resetTimer
    const showRouteGesture = (target) => {
      const link = target.closest?.('a[href]')
      if (!link || link.target || link.hasAttribute('download')) return
      const destination = new URL(link.href, window.location.href)
      if (destination.origin !== window.location.origin) return
      if (destination.pathname !== window.location.pathname) {
        document.body.classList.add('is-route-gesturing')
        window.clearTimeout(resetTimer)
        resetTimer = window.setTimeout(() => document.body.classList.remove('is-route-gesturing'), 1400)
      }
    }
    const onPointerDown = (event) => { if (event.button === 0) showRouteGesture(event.target) }
    const onKeyDown = (event) => { if (event.key === 'Enter') showRouteGesture(event.target) }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown, true)

    return () => {
      window.removeEventListener('popstate', onPopState)
      window.removeEventListener('nsolutions-route-change', onCustomRoute)
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown, true)
      window.clearTimeout(resetTimer)
      document.body.classList.remove('is-route-gesturing')
    }
  }, [])

  if (currentPath === '/about') return <><AboutPage /><WhatsAppWidget /></>
  if (currentPath === '/services') return <><ServicesPage /><WhatsAppWidget /></>
  if (currentPath === '/projects') return <><ProjectsPage /><WhatsAppWidget /></>
  if (currentPath === '/products') return <><ProductsPage /><WhatsAppWidget /></>
  if (currentPath === '/media') return <><MediaPage /><WhatsAppWidget /></>
  if (currentPath === '/careers') return <><CareersPage /><WhatsAppWidget /></>
  if (currentPath === '/contact') return <><ContactPage /><WhatsAppWidget /></>
  if (currentPath === '/privacy' || currentPath === '/privacy-policy') return <><PrivacyPolicyPage /><WhatsAppWidget /></>
  if (currentPath === '/terms' || currentPath === '/terms-and-conditions') return <><TermsConditionsPage /><WhatsAppWidget /></>
  if (currentPath === '/admin' || currentPath.startsWith('/admin')) {
    return <><SEO title="Admin | N Solutions" description="N Solutions administrator portal." path="/admin" noIndex /><AdminPortal /></>
  }
  if (currentPath !== '/') return <><NotFoundPage /><WhatsAppWidget /></>


  return (
    <>
    <SEO
        title="N Solutions | Solar EPC & Renewable Energy Solutions in India"
        description="N Solutions provides end-to-end solar EPC and renewable energy solutions for residential, commercial, industrial and government projects across India."
        keywords="solar EPC company India, solar energy solutions, solar installation company, commercial solar, industrial solar, rooftop solar"
        path="/"
      />
  <div className="site-shell home-page">
    <ScrollProgressBar />
    <SiteHeader />
    
    <main id="top">
      <section className="hero" >
        <div className="hero-image" /><video className="hero-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src="/media/hero-solar.mp4" type="video/mp4" /></video><div className="hero-shade" />
        <div className="hero-content wrap"><p className="eyebrow light"><span /> 16+ years of solar experience</p><h1>Built on <em>experience.</em><br />Driven by solar.</h1><p className="hero-copy">N Solutions delivers customized solar solutions through engineering, procurement, installation, commissioning, and ongoing support.</p><div className="hero-actions"><a className="button button-accent" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>Talk to N Solutions <Arrow /></a><a className="button button-ghost" href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>Explore our projects <Arrow /></a></div></div>
        <div className="hero-note"><span>01</span><div><strong>Solar, engineered.</strong><small>Residential to MW-scale projects</small></div></div>
      </section>

      {/* HERO STATS STRIP */}
      <section className="hero-stats-banner" id="project-stats" aria-label="Company Statistics">
        <div className="wrap">
          <div className="hero-stats-grid">
            <AnimatedMetric value={16} suffix="+" label="Years of experience" delay={80} />
            <AnimatedMetric value={9} label="States across India" delay={180} />
            <AnimatedMetric value={360} suffix="°" label="End-to-end solar EPC" delay={280} />
            <AnimatedMetric value={750} suffix="+" label="PM Surya Ghar sites" delay={380} />
          </div>
        </div>
      </section>

      {/* SECTOR MILESTONES SHOWCASE — SIMPLE LIGHT DESIGN WITH WHO WE ARE HEADING */}
      <section className="home-milestones-highlight" id="sector-milestones" aria-labelledby="sector-milestones-heading">
        <div className="wrap">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow"><span /> {homeContent.whoWeAre.eyebrow}</p>
              <h2 id="sector-milestones-heading">{homeContent.whoWeAre.title}<br /><em>{homeContent.whoWeAre.subtitle}</em></h2>
            </div>
            <p className="heading-note">
              Over 16+ years of disciplined solar EPC operations across 9 states in India — verified delivery across residential, government, commercial, and industrial sectors.
            </p>
          </Reveal>

          <div className="home-milestones-grid">
            <div className="home-milestone-col">
              <AnimatedMetric value={750} suffix="+" label="PM Surya Ghar" delay={80} />
            </div>
            <div className="home-milestone-col">
              <AnimatedMetric value={140} suffix="+" label="Residential Projects" delay={160} />
            </div>
            <div className="home-milestone-col">
              <AnimatedMetric value={120} suffix="+" label="Government Projects" delay={240} />
            </div>
            <div className="home-milestone-col">
              <AnimatedMetric value={200} suffix="+" label="Commercial Projects" delay={320} />
            </div>
            <div className="home-milestone-col">
              <AnimatedMetric value={60} suffix="+" label="Industrial Projects" delay={400} />
            </div>
          </div>
        </div>
      </section>

      <section className="proof" id="proof"><div className="wrap proof-grid"><p className="eyebrow"><span /> Experience that speaks for itself</p><div className="proof-intro"><h2>Built on experience.<br /><em>Driven by solar.</em></h2><p>N Solutions is an Engineering, Procurement and Construction solar company with 16+ years of experience across 9 states in India.</p><p>We combine engineering expertise, reliable solar technology, and professional project execution to help customers move towards cleaner energy, improved efficiency, and sustainable growth.</p></div><div className="proof-aside proof-aside-video"><video className="proof-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src="/media/proof-solar.mp4" type="video/mp4" /></video><span className="proof-aside-mark">16+</span><div><strong>Years of solar operations</strong><p>From MW-scale solar power projects to residential rooftop installations under PM Surya Ghar.</p></div><span className="proof-aside-line" /></div></div></section>

      <section className="who wrap" id="who-we-are">
        <Reveal className="who-image">
          <div className="who-photo" />
          <span className="image-caption">From MW-scale projects<br />to residential rooftops</span>
        </Reveal>
        <Reveal className="who-copy">
          <p className="eyebrow"><span /> {homeContent.whoWeAre.eyebrow}</p>
          <h2>{homeContent.whoWeAre.title}<br /><em>{homeContent.whoWeAre.subtitle}</em></h2>
          <p><strong>{homeContent.whoWeAre.lead}</strong></p>
          <p>{homeContent.whoWeAre.description}</p>
          <p>{homeContent.whoWeAre.highlight}</p>
          <div className="about-tagline-badge" style={{ display: 'inline-block', margin: '14px 0 18px', padding: '8px 16px', background: 'rgba(118,186,217,0.12)', border: '1px solid rgba(118,186,217,0.3)', borderRadius: '6px', fontWeight: '700', fontSize: '13px', color: 'var(--brand-primary-dark)' }}>
            {homeContent.whoWeAre.tagline}
          </div>
          <p>{homeContent.whoWeAre.conclusion}</p>
          <a className="text-link" href="/about" onClick={(e) => { e.preventDefault(); navigate('/about') }}>About N Solutions <Arrow /></a>
        </Reveal>
      </section>

      <section className="services wrap" id="services">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow"><span /> {homeContent.whatWeDo.eyebrow}</p>
            <h2>{homeContent.whatWeDo.title}<br /><em>{homeContent.whatWeDo.subtitle}</em></h2>
          </div>
          <p className="heading-note">{homeContent.whatWeDo.description}</p>
        </Reveal>
        <ServicesShowcase />
        <a className="section-cta text-link" href="/services" onClick={(e) => { e.preventDefault(); navigate('/services') }}>Explore Our Services <Arrow /></a>
      </section>

      {/* HOW WE WORK SECTION */}
      <section className="services-process" id="how-we-work">
        <div className="wrap">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow light"><span /> 03 — HOW WE WORK</p>
              <h2>From requirement<br /><em>to support.</em></h2>
            </div>
            <p className="heading-note">A structured project journey carefully planned and executed across every milestone.</p>
          </Reveal>
          <div className="services-process-line">
            {servicesProcess.map(([number, title, text]) => (
              <Reveal className="services-process-step" key={number} tabIndex="0">
                <span>{number}</span>
                <strong>{title}</strong>
                <small>{text}</small>
              </Reveal>
            ))}
          </div>
          <p className="process-flow light-flow">Requirement <i><FiChevronRight style={{ verticalAlign: 'middle' }} /></i> Design <i><FiChevronRight style={{ verticalAlign: 'middle' }} /></i> Execution <i><FiChevronRight style={{ verticalAlign: 'middle' }} /></i> Support</p>
        </div>
      </section>

      <section className="home-leadership wrap" id="leadership">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow"><span /> {homeContent.leadership?.eyebrow || "04 — Our Leadership"}</p>
            <h2>{homeContent.leadership?.title || "Visionary leadership,"}<br /><em>{homeContent.leadership?.subtitle || "grounded in experience."}</em></h2>
          </div>
          <p className="heading-note">
            {homeContent.leadership?.description || "Guiding N Solutions with over 16 years of solar operations across 9 states, uniting ethical vision with engineering execution."}
          </p>
        </Reveal>

        <div className="leadership-cards-grid">
          {(homeContent.leadership?.leaders || []).map((leader, idx) => (
            <Reveal className="leadership-card" key={idx}>
              <div className="leadership-image-wrap">
                <img
                  src={leader.image}
                  alt={`${leader.name} - ${leader.role}`}
                  loading="eager"
                  className={idx === 0 ? 'leadership-image-founder' : 'leadership-image-manager'}
                  onError={(e) => {
                    if (idx === 0) e.target.src = '/leadership/smt-r-lakshmi-bai-full.png'
                    else e.target.src = '/leadership/sri-ch-csv-raju-full.jpg'
                  }}
                />
                <div className="leadership-image-scrim" />
                <span className="leadership-badge">{leader.badge || leader.role}</span>
              </div>
              <div className="leadership-info">
                <h3 className="leadership-name">{leader.name}</h3>
                <p className="leadership-role">{leader.role}</p>
                <p className="leadership-bio">{leader.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="leadership-quote-strip">
          <div className="quote-mark" aria-hidden="true">“</div>
          <div className="quote-body">
            <blockquote>{homeContent.chairmanMessage.quote}</blockquote>
            <div className="signature">
              <strong>{homeContent.chairmanMessage.author}</strong>
              <small>{homeContent.chairmanMessage.role}</small>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="why why-orbit">
        <div className="orbit-full-wrap">
          <StrengthsOrbitWheel items={strengths} />
        </div>
      </section>

      <section className="projects wrap" id="projects">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow"><span /> Flagship EPC Portfolio</p>
            <h2>Powering progress<br /><em>across India.</em></h2>
          </div>
          <a className="text-link" href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>
            View all projects <Arrow />
          </a>
        </Reveal>

        <div className="home-projects-showcase">
          <div className="home-projects-grid">
            {projectsData.slice(0, 3).map((proj) => (
              <Reveal key={proj.id} className="home-project-card" onClick={() => navigate('/projects')}>
                <div className="home-project-media">
                  <img src={proj.image} alt={proj.title} loading="lazy" />
                  <span className="home-project-capacity-pill">{proj.capacity}</span>
                  <span className="home-project-category-pill">{proj.categoryLabel}</span>
                </div>
                <div className="home-project-body">
                  <div className="home-project-location">
                    <FiMapPin aria-hidden="true" />
                    <span>{proj.location.split(',')[0]} · {proj.location.split(',').slice(-1)[0].trim()}</span>
                  </div>
                  <h3 className="home-project-title">{proj.client}</h3>
                  <p className="home-project-desc">{proj.headline}</p>
                  <div className="home-project-footer">
                    <span>Explore Project Case Study</span>
                    <FiChevronRight aria-hidden="true" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="home-residential-highlight">
            <div className="highlight-stat-box">
              <span className="highlight-stat-num">500+</span>
              <span className="highlight-stat-label">Rooftop Sites</span>
            </div>
            <div className="highlight-content-box">
              <div className="highlight-badge-row">
                <span className="highlight-pill-mission">PM Surya Ghar: Muft Bijli Yojana</span>
              </div>
              <h3>High-Density Residential Cluster Installations</h3>
              <p>Turnkey execution across Andhra Pradesh & Telangana featuring high-efficiency Tier-1 mono PERC/TOPCon modules, elevated monkey-proof GI structures, and bi-directional net-metering approvals.</p>
              <div className="highlight-metrics-row">
                <span className="highlight-chip">₹78,000 Direct Subsidy DBT</span>
                <span className="highlight-chip">Sub-1.0 Ω Chemical Earthing</span>
                <span className="highlight-chip">APEPDCL Net-Meter Synchronized</span>
              </div>
            </div>
            <div className="highlight-action-box">
              <a className="button button-accent" href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>
                View All Projects <Arrow />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
<FoundationSection />
      <section className="trust wrap">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow"><span /> Proof of trust</p>
            <h2>Trusted by<br /><em>our clients.</em></h2>
          </div>
          <p className="heading-note">Real client outcomes from industrial plants, institutions, and residential rooftop clusters.</p>
        </Reveal>
        <TestimonialsShowcase theme="light" />
          <IndustriesSection />

      </section>

      <section className="contact-band" id="contact">
        <div className="wrap contact-inner">
          <p className="eyebrow">
            <span /> One partner. Complete solar solutions.</p>
            <h2>Assess. Design.<br /><em>Supply. Install.</em></h2>
            <p>Talk to N Solutions about your project, from first requirement through operate and maintain.</p>
            <a className="button button-accent" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>Talk to N Solutions <Arrow /></a>
        </div>
      </section>

    </main>

    <SiteFooter />
  </div>
  </>
  )
}

export default App
