import { useEffect, useRef, useState } from 'react'
import { FiArrowUpRight} from 'react-icons/fi';
import LeadQuoteModal from '../pages/LeadQuoteModel.jsx';


export function Arrow() {
  return <FiArrowUpRight aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', strokeWidth: 2.5 }} />
}

export function GoogleIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"/>
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
    </svg>
  )
}

export function JustdialIcon({ size = 18, className = '' }) {
  return (
    <span
      className={`justdial-icon-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '4px',
        background: '#ff6c00',
        color: '#ffffff',
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontWeight: 800,
        fontSize: `${Math.max(10, Math.round(size * 0.65))}px`,
        lineHeight: 1,
        letterSpacing: '-0.5px',
        flexShrink: 0
      }}
      aria-hidden="true"
    >
      jd
    </span>
  )
}

export function JustdialSvgLogo({ width = 54, height = 14, className = '' }) {
  return (
    <svg width={width} height={height} viewBox="0 0 588 154" className={className} aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path fill="#1274C0" d="M267.4,136c0,9.1,5.8,15.2,14,15.2c8.2,0,14-6.1,14-15.2V59.1h8c7.2,0,13.4-3.4,13.4-12c0-8.7-6.2-12-13.4-12h-8V18.8c0-9.1-5.8-15.2-14-15.2c-8.2,0-14,6.1-14,15.2v16.3h-6.2c-7,0-12.3,5.1-12.3,12c0,7.4,4.7,12,12.3,12h6.2V136L267.4,136z M77.1,18.5c0-9.5-6.2-14.8-14.6-14.8c-8.4,0-14.6,5.3-14.6,14.8v91.7c0,6.1,0,16-10.9,16c-8.8,0-15.6-7-23.4-7c-6.4,0-10.9,6.5-10.9,11.6c0,16.5,22.4,21.7,35.9,21.7c17.7,0,38.6-8.4,38.6-40.3V18.5L77.1,18.5z M84.9,112.4c0,24.3,16.6,39.9,46.2,39.9c29.6,0,46.2-15.6,46.2-39.9V63c0-9.1-5.8-15.2-14-15.2c-8.2,0-14,6.1-14,15.2v48.8c0,11.4-8.8,17.7-18.1,17.7c-9.4,0-18.1-6.3-18.1-17.7V63c0-9.1-5.8-15.2-14-15.2c-8.2,0-14,6.1-14,15.2V112.4L84.9,112.4z M255.9,66.5c0,6.3-4.9,12.2-11.5,12.2c-5.3,0-16-8-25.1-8c-5.1,0-9.5,2.3-9.5,7.6c0,12.7,48.7,10.8,48.7,42c0,18.2-15.8,32.2-39.9,32.2c-15.8,0-39.2-8.8-39.2-21.1c0-4.2,4.3-12.2,12.1-12.2c10.9,0,15.8,9.3,29,9.3c8.6,0,11.1-2.7,11.1-7.8c0-12.5-48.7-10.6-48.7-42c0-19,15.8-31.9,38-31.9C234.7,46.7,255.9,53,255.9,66.5z"/>
      <path fill="#FF6C00" d="M558.7,134.9c0,9.1,5.9,15.2,14.2,15.2c8.3,0,14.2-6.1,14.2-15.2V17.8c0-9.1-5.9-15.2-14.2-15.2c-8.3,0-14.2,6.1-14.2,15.2V134.9L558.7,134.9z M409.9,17.8c0-9.1-5.9-15.2-14.2-15.2c-8.3,0-14.2,6.1-14.2,15.2V55c-7.5-6.3-17.1-9.5-27-9.5c-30.5,0-45.7,27.6-45.7,54.2c0,25.8,18.1,51.5,46.7,51.5c9.7,0,20.7-4.2,26-12.6c1.8,7.2,6.3,11.4,14.2,11.4c8.3,0,14.2-6.1,14.2-15.2V17.8L409.9,17.8z M381.5,97.6c0,13.3-6.7,28.5-22.3,28.5c-14.8,0-22.1-14.8-22.1-27.6c0-12.9,7.3-27.9,22.1-27.9C374.4,70.6,381.5,84.3,381.5,97.6L381.5,97.6z M417.7,134.9c0,9.1,5.9,15.2,14.2,15.2c8.3,0,14.2-6.1,14.2-15.2v-73c0-9.1-5.9-15.2-14.2-15.2c-8.3,0-14.2,6.1-14.2,15.2V134.9L417.7,134.9z M431.9,5.6c-8.5,0-16,7.2-16,15c0,8.4,7.5,15.8,16,15.8c8.9,0,16-7.2,16-15.8C447.9,12.7,440.4,5.6,431.9,5.6L431.9,5.6z M550.9,64.5c0-7,0-17.9-13.6-17.9c-6.9,0-12.8,4.8-13.6,11.4c-6.3-8.6-16.6-12.5-27-12.5c-26,0-46.9,23-46.9,53c0,30.8,20.3,52.7,46.9,52.7c10.8,0,19.7-4.4,27-12.8c2,7.2,5.3,11.6,13.6,11.6c13.6,0,13.6-10.9,13.6-17.9V64.5L550.9,64.5z M478.2,98.6c0-13.1,6.9-27.9,22.5-27.9c15,0,21.9,14.8,21.9,27.9s-7.1,27.6-21.9,27.6C485.3,126.1,478.2,111.7,478.2,98.6z"/>
    </svg>
  )
}

export function navigate(path) {
  if (window.location.pathname === path) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event('nsolutions-route-change'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function AnimatedMetric({ value, suffix = '', label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const update = (now) => {
        const progress = Math.min((now - start) / 900, 1)
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))))
        if (progress < 1) requestAnimationFrame(update)
      }
      requestAnimationFrame(update)
      observer.disconnect()
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])
  return (
    <div ref={ref}>
      <strong>{count}<span>{suffix}</span></strong>
      <small>{label}</small>
    </div>
  )
}

export function Reveal({ children, className = '', id }) {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} id={id} className={`reveal ${className}`}>{children}</div>
}

export function EmptyState({ label, text }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">+</span>
      <strong>{label}</strong>
      <p>{text}</p>
    </div>
  )
}

export function SiteHeader({ activePath = '' }) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const closeMenu = () => setMenuOpen(false)
  const handleNav = (e, path) => {
    e.preventDefault()
    closeMenu()
    navigate(path)
  }
  const items = ['Home', 'About', 'Services', 'Projects', 'Products', 'Media', 'Careers', 'Contact']
  return (
  <header
    className={`site-header ${
      activePath ? 'site-header-page' : ''
    }`}
   style={{background:'#ffffff'}}>
    <a
      className="brand"
      href="/"
      onClick={(e) => handleNav(e, '/')}
      aria-label="N Solutions home"
    >
      <img className="brand-logo" src="/logo.png" alt="N Solutions" />
    </a>

    <button
      className="menu-toggle"
      aria-label="Toggle navigation"
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <span />
      <span />
    </button>

    <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
      {items.map((item) => {
        const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`
        const isCurrent =
          activePath === path || (path === '/' && activePath === '')

        return (
          <a
            className={isCurrent ? 'active' : ''}
            key={item}
            href={path}
            onClick={(e) => handleNav(e, path)}
          >
            {item}
          </a>
        )
      })}

      {/* Mobile / tablet CTA */}
     <button
        type="button"
        className="nav-cta nav-cta-mobile"
        onClick={() => {
          closeMenu()
          setQuoteModalOpen(true)
        }}
      >
        Get a Quote <Arrow />
      </button>
    </nav>

    {/* Desktop CTA */}
    <button
      type="button"
      className="nav-cta nav-cta-desktop"
      onClick={() => setQuoteModalOpen(true)}
    >
      Get a Quote <Arrow />
    </button>
    {quoteModalOpen && (
      <LeadQuoteModal
      onClose={() => setQuoteModalOpen(false)}
  />
)}
  </header>
)
}
// Each logo: srcs[] = ordered list of image URLs to try. ui-avatars is always last resort.
const uiAvatar = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0875b6&color=fff&size=160&bold=true&format=png`

const logoGroups = [
  {
    label: 'Technology Partners',
    logos: [
      {
        name: 'ReNew Power',
        srcs: [
          '/logos/logo_1.jpeg',
          'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/ReNew_Power_Logo.png/320px-ReNew_Power_Logo.png',
        ],
      },
      {
        name: 'Deye',
        srcs: [
          '/logos/logo_2.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Deye_logo.svg/320px-Deye_logo.svg.png',
        ],
      },
      {
        name: 'CIKIT',
        srcs: [
          '/logos/logo_3.jpeg',
          'https://cikit.in/wp-content/uploads/2021/01/cikit-logo.png',
        ],
      },
      {
        name: 'Polycab',
        srcs: [
          '/logos/logo_4.jpeg',
          'https://upload.wikimedia.org/wikipedia/en/f/f6/Polycab_logo.png',
        ],
      },
      {
        name: 'Vikram Solar',
        srcs: [
          '/logos/logo_5.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Vikram_Solar_logo.svg/320px-Vikram_Solar_logo.svg.png',
        ],
      },
    ],
  },
  {
    label: 'Financial & Loan Partners',
    logos: [
      {
        name: 'SBI',
        srcs: [
          '/logos/logo_12.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/320px-SBI-logo.svg.png',
        ],
      },
      {
        name: 'Union Bank',
        srcs: [
          '/logos/logo_13.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Union_Bank_of_India_Logo.svg/320px-Union_Bank_of_India_Logo.svg.png',
        ],
      },
      {
        name: 'Canara Bank',
        srcs: [
          '/logos/logo_14.jpeg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Canara_Bank_Logo.svg/320px-Canara_Bank_Logo.svg.png',
        ],
      },
      {
        name: 'APGVB',
        srcs: [
          '/logos/logo_15.jpeg',
          'https://www.apgvbank.in/English/images/APGVB-Logo.png',
        ],
      },
    ],
  },
  {
    label: 'Our Clients',
    logos: [
      {
        name: 'Mahindra Solarize',
        srcs: [
          '/logos/logo_16.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Mahindra_New_Logo.svg/320px-Mahindra_New_Logo.svg.png',
        ],
      },
      {
        name: 'Premier Energies',
        srcs: [
          '/logos/logo_17.jpeg',
          'https://www.premierenergies.com/images/logo.png',
        ],
      },
      {
        name: 'Tata Power Solar',
        srcs: [
          '/logos/logo_18.jpeg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/200px-Tata_logo.svg.png',
        ],
      },
      {
        name: 'Kenexa',
        srcs: [
          '/logos/logo_19.jpeg',
          'https://logo.clearbit.com/kenexa.com',
        ],
      },
      {
        name: 'Maha Cement',
        srcs: [
          '/logos/logo_20.jpeg',
          'https://mahacements.com/wp-content/uploads/2021/01/maha-cement-logo.png',
        ],
      },
      {
        name: 'Reliance Comm.',
        srcs: [
          '/logos/logo_21.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Reliance_Communications.svg/320px-Reliance_Communications.svg.png',
        ],
      },
      {
        name: 'Fourth Partner Energy',
        srcs: [
          '/logos/logo_22.png',
          'https://www.fourthpartnerenergy.com/images/logo.png',
        ],
      },
      {
        name: 'Veddis Solars',
        srcs: [
          '/logos/logo_23.jpeg',
          'https://veddissolars.com/wp-content/uploads/2022/07/veddis-logo.png',
        ],
      },
      {
        name: 'Naviya Tech.',
        srcs: [
          '/logos/logo_24.jpeg',
          'https://naviyatechnologies.com/wp-content/uploads/2022/04/naviya-logo.png',
        ],
      },
      {
        name: 'JNTU Kakinada',
        srcs: [
          '/logos/logo_25.jpeg',
        ],
      },
      {
        name: 'GSE Renewables',
        srcs: [
          '/logos/logo_26.png',
        ],
      },
      {
        name: 'GVMC',
        srcs: [
          '/logos/logo_27.jpeg',
        ],
      },
      {
        name: 'Ray Power Solutions',
        srcs: [
          '/logos/logo_28.png',
        ],
      },
      {
        name: 'Jindal Steel & Power',
        srcs: [
          '/logos/logo_29.png',
        ],
      },
      {
        name: 'Shiva Marketing',
        srcs: [
          '/logos/logo_30.jpeg',
        ],
      },
    ],
  },
]

function LogoTile({ name, srcs }) {
  const allSrcs = [...srcs, uiAvatar(name)]
  const [idx, setIdx] = useState(0)
  const handleError = () => {
    if (idx < allSrcs.length - 1) setIdx(idx + 1)
  }
  return (
    <div className="logo-strip-item">
      <div className="logo-strip-img-wrap">
        <img
          src={allSrcs[idx]}
          alt={name}
          title={name}
          loading="lazy"
          onError={handleError}
        />
      </div>
      <span className="logo-strip-name">{name}</span>
    </div>
  )
}

function LogoStrip({ logos, reverse = false, speed = 28 }) {
  const items = [...logos, ...logos, ...logos]
  return (
    <div className="logo-strip-track" style={{ '--logo-speed': `${speed}s`, '--logo-dir': reverse ? 'reverse' : 'normal' }}>
      {items.map((logo, i) => <LogoTile key={i} name={logo.name} srcs={logo.srcs} />)}
    </div>
  )
}
export function Credentials(){
  return(
<section className="credentials-section">
  <div className="credentials-overlay" />

  <div className="credentials-content">

    <div className="credentials-heading">
      <p className="credentials-eyebrow">
        OUR CREDENTIALS
      </p>

      <h2>
        <span>Certifications &amp;</span>{' '}
        <span className="credentials-blue">Awards</span>
      </h2>

      <p className="credentials-description">
        Recognized through Certifications, registrations,
        and industry enpanelments
      </p>
    </div>

    <div className="credentials-logos">

      <div className="credential-item">
        <div className="credential-logo">
          <img src="/logos/logo_6.jpeg" alt="ISO 9001:2015" />
        </div>

        <h3>ISO 9001:2015</h3>
        <p>Certified Company</p>
      </div>

      <div className="credential-item">
        <div className="credential-logo">
          <img src="/logos/logo_7.png" alt="PM Surya Ghar" />
        </div>

        <h3>PM Surya Ghar</h3>
        <p>Muft Bijli Yojana</p>
      </div>

      <div className="credential-item">
        <div className="credential-logo">
          <img src="/logos/logo_8.png" alt="NREDCAP" />
        </div>

        <h3>NREDCAP</h3>
        <p>Registered</p>
      </div>

      <div className="credential-item">
        <div className="credential-logo">
          <img src="/logos/logo_9.jpeg" alt="APEPDCL" />
        </div>

        <h3>APEPDCL</h3>
        <p>Empanelled</p>
      </div>

      <div className="credential-item">
        <div className="credential-logo">
          <img src="/logos/logo_10.png" alt="MNRE" />
        </div>

        <h3>Ministry of New and Renewable Energy</h3>
        <p>Enpanelled</p>
      </div>

      <div className="credential-item credential-sixth">
        <div className="credential-logo">
          <img src="/logos/logo_11.png" alt="MSME" />
        </div>

        <h3>MSME</h3>
        <p>Registered Enterprise</p>
      </div>

    </div>
<div className="credentials-divider">
  <span />

  <div className="credentials-badges">

    <div className="credential-badge">
      <div className="badge-icon">
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
      <span>Certified</span>
    </div>

    <div className="credential-badge">
      <div className="badge-icon">
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3h9l3 3v15H6z" />
          <path d="M15 3v4h4" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
        </svg>
      </div>
      <span>Registered</span>
    </div>

    <div className="credential-badge">
      <div className="badge-icon">
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <path d="M15 15c3.2-.2 5.5 1.9 6 5" />
        </svg>
      </div>
      <span>Empanelled</span>
    </div>

  </div>

  <span />
</div>


  </div>
</section>

  )
}

function LogoPartnersSection() {
  return (
    <>
      <section
        className="logo-partners-section"
        aria-label="Partners, Clients & Certifications"
      >
        <div className="wrap">
          <div className="logo-partners-heading">
            <p className="eyebrow">
              <span /> Our ecosystem
            </p>

            <h2>
              Trusted partners &amp; <em>valued clients.</em>
            </h2>
          </div>
        </div>

        <div className="logo-partners-grid">
          {logoGroups.map((group, gi) => (
            <div key={gi} className="logo-partners-row">
              <div className="logo-partners-label">
                <span>{group.label}</span>
              </div>

              <div className="logo-strip-viewport">
                <LogoStrip
                  logos={group.logos}
                  reverse={gi % 2 === 1}
                  speed={22 + gi * 5}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Credentials />
    </>
  )
}


export function SiteFooter() {
  const handleNav = (e, path) => {
    e.preventDefault()
    navigate(path)
  }

  return (
    <footer className="site-footer">
      <LogoPartnersSection/>
      {/* ================= MAIN FOOTER ================= */}
      <section className="footer-main">

        <div className="footer-inner">

          {/* BRAND */}
          <div className="footer-brand-col">

            <a
              className="footer-logo-link"
              href="/"
              onClick={(e) => handleNav(e, '/')}
            >
              <img
                className="footer-logo"
                src="/logo.png"
                alt="N Solutions"
              />
            </a>

            <p className="footer-tagline">
              Engineering, Procurement and Construction (EPC)
              Solar Company with 16+ years of proven experience
              across 9 states in India.
            </p>

            <div className="footer-credentials-badge">
              <span>PM Surya Ghar Empanelled</span>
              <span>MNRE Compliant</span>
              <span>Commercial &amp; Industrial EPC</span>
            </div>

          </div>


          {/* NAVIGATION */}
          <div className="footer-column">

            <h3>Navigation</h3>

            <div className="footer-heading-line" />

            <a href="/" onClick={(e) => handleNav(e, '/')}>
              Home
            </a>

            <a href="/about" onClick={(e) => handleNav(e, '/about')}>
              About Us
            </a>

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              Services &amp; Solutions
            </a>

            <a href="/projects" onClick={(e) => handleNav(e, '/projects')}>
              Projects Showcase
            </a>

            <a href="/products" onClick={(e) => handleNav(e, '/products')}>
              Solar Products
            </a>

            <a href="/media" onClick={(e) => handleNav(e, '/media')}>
              Media &amp; News
            </a>

            <a href="/careers" onClick={(e) => handleNav(e, '/careers')}>
              Careers
            </a>

            <a href="/contact" onClick={(e) => handleNav(e, '/contact')}>
              Contact Us
            </a>

          </div>


          {/* CORE SERVICES */}
          <div className="footer-column">

            <h3>Core Services</h3>

            <div className="footer-heading-line" />

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              Commercial &amp; Industrial
            </a>

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              Residential Rooftop
            </a>

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              Solar EPC Solutions
            </a>

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              PM Surya Ghar Scheme
            </a>

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              Operation &amp; Maintenance
            </a>

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              Subsidies &amp; Net Metering
            </a>

          </div>


          {/* CONTACT */}
          <div className="footer-column footer-contact">

            <h3>Contact &amp; Reach</h3>

            <div className="footer-heading-line" />

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12z" />
                  <circle cx="12" cy="9" r="2.3" />
                </svg>
              </span>
              <p>
                #27-23-27, MIG-214, APHB Colony,<br />
                Babametta, Vizianagaram – 535002,<br />
                Andhra Pradesh, India
              </p>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M7 3h3l2 5-2 2a14 14 0 0 0 4 4l2-2 5 2v3c0 1.1-.9 2-2 2C10.4 19 5 13.6 5 7c0-1.1.9-2 2-2z" />
                </svg>
              </span>
              <p>9492731212 &nbsp;|&nbsp; 9494703452</p>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </span>
              <p>info@nsol.in &nbsp;|&nbsp; nsolutions@live.com</p>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9M3 12h18" />
                </svg>
              </span>
              <p>www.nsol.in &nbsp;|&nbsp; www.nsolar.in &nbsp;|&nbsp; www.nsolutions.in</p>
            </div>


            <a
              href="/contact"
              className="footer-feasibility-btn"
              onClick={(e) => handleNav(e, '/contact')}
            >
              Request Feasibility Study
              <FiArrowUpRight />
            </a>

          </div>

        </div>

      </section>


      {/* ================= CREDENTIALS ================= */}
      <section className="footer-credentials">

        <div className="footer-credentials-inner">

          <div className="footer-credentials-title">
            <span>OUR CREDENTIALS</span>
            <div />
          </div>


          <div className="footer-credential-list">

            <div className="footer-credential-item">
              <div className="credential-logo credential-iso-logo">
                 <img src="/logos/logo_6.png" alt="ISO 9001:2015" />
              </div>
              <div>
                <strong>ISO 9001:2015</strong>
                <span>Certified Company</span>
            </div>
            </div>


            <div className="footer-credential-item">
              <img
                src="/logos/logo_7 (2).png"
                alt="PM Surya Ghar"
                style={{height: '80%',width: '70%'}}
              />

              <div>
                <strong>PM Surya Ghar</strong>
                <span>Muft Bijli Yojana</span>
              </div>
            </div>


            <div className="footer-credential-item">
              <img
                src="/logos/logo_9.png"
                alt="APEPDCL"
                style={{width:'60%',height:'20%',margin:'0px',padding:'0px'}}
              />

                <strong>APEPDCL</strong>
                <span>Empanelled</span>
              
            </div>


            <div className="footer-credential-item">
              <img
                src="/logos/logo_8.png"
                alt="NREDCAP"
                style={{height:'10%',width: '30%'}}
              />

              <div>
                <strong>NREDCAP</strong>
                <span>Registered</span>
              </div>
            </div>


            <div className="footer-credential-item">
              <img
                src="/logos/logo_10.png"
                alt="Ministry of New and Renewable Energy"
               style={{height: '90%',width: '70%',objectFit:'contain', marginBottom:'0px'}}/>

              <div>
                <strong>MNRE</strong>
                <span>Empanelled</span>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ================= BOTTOM BAR ================= */}
      <section className="footer-bottom-bar">

        <div className="footer-bottom-inner">

          <div className="footer-copy">
            © {new Date().getFullYear()} N Solutions.
            All rights reserved.
          </div>


          <div className="footer-bottom-links">

            <a href="/privacy" onClick={(e) => { e.preventDefault(); navigate('/privacy') }}>
              Privacy Policy
            </a>

            <span>|</span>

            <a href="/terms" onClick={(e) => { e.preventDefault(); navigate('/terms') }}>
              Terms &amp; Conditions
            </a>

            <span>|</span>

            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/') }}>
              Sitemap
            </a>

          </div>


          <div className="footer-socials">

            {/* Social & Platform Channels */}
            <div className="footer-social-icons">
              <a href="#" aria-label="LinkedIn" title="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.5 8.5A1.5 1.5 0 1 0 6.5 5.5a1.5 1.5 0 0 0 0 3ZM5 10h3v9H5v-9Zm5 0h3v1.23c.43-.73 1.35-1.53 2.93-1.53 3.13 0 3.07 2.91 3.07 4.5V19h-3v-4.27c0-1.02-.02-2.33-1.42-2.33-1.42 0-1.64 1.1-1.64 2.25V19h-3v-9Z"
                  />
                </svg>
              </a>

              <a href="#" aria-label="Instagram" title="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="3.5"
                    y="3.5"
                    width="17"
                    height="17"
                    rx="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a href="#" aria-label="YouTube" title="YouTube">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C2 9 2 12 2 12s0 3 .4 4.8a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2c.4-1.8.4-4.8.4-4.8s0-3-.4-4.8ZM10 15.3V8.7l5.5 3.3-5.5 3.3Z"
                  />
                </svg>
              </a>

              <a
                href="https://share.google/9B4OC1mWUc2h4to0T"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Reviews - 5.0 Star Rating"
                className="footer-platform-icon-btn footer-google-btn"
                title="Google Reviews (5.0 ★ Rating)"
              >
                <GoogleIcon size={18} />
              </a>

              <a
                href="https://jsdl.in/RSL-ZYP1792307440"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Justdial - 5.0 Star Rating (275+ Reviews)"
                className="footer-platform-icon-btn footer-justdial-btn"
                title="Justdial (5.0 ★ from 275+ Ratings)"
              >
                <JustdialIcon size={18} />
              </a>
            </div>

            {/* Google & Justdial Rating Badges next to social icons */}
            <div className="footer-rating-badges">
              <a
                href="https://share.google/9B4OC1mWUc2h4to0T"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-rating-pill google-pill"
                title="N Solutions on Google Reviews"
              >
                <GoogleIcon size={13} />
                <span><strong>5.0 ★</strong> Google</span>
              </a>

              <a
                href="https://jsdl.in/RSL-ZYP1792307440"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-rating-pill justdial-pill"
                title="N Solutions on Justdial (275+ Reviews)"
              >
                <JustdialIcon size={13} />
                <span><strong>5.0 ★</strong> Justdial</span>
              </a>
            </div>

            <span className="footer-social-divider" />

            <span className="footer-developed">
              Designed &amp; Developed by
              <strong> Multivisiontrendz</strong>
            </span>

          </div>

        </div>

      </section>

    </footer>
  )
}
