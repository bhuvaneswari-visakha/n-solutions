import { useEffect } from 'react'
import SEO from '../components/SEO/SEO'
import { SiteHeader, SiteFooter, Arrow, navigate } from '../components/Shared'
import { useSEO } from '../utils/useSEO'
import {
  FiSun,
  FiHome,
  FiZap,
  FiMail,
  FiCompass,
  FiArrowRight,
  FiLayers,
  FiShield,
  FiPhoneCall
} from 'react-icons/fi'

export default function NotFoundPage() {
  useSEO({
    title: '404 - Page Not Found | N Solutions Solar EPC',
    description: 'The page you are looking for could not be found. Explore N Solutions residential, commercial and industrial solar solutions across India.',
    keywords: '404 not found, N Solutions solar EPC, solar installation India',
    canonical: 'https://nsol.in/404'
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const quickLinks = [
    {
      title: 'Solar EPC Services',
      desc: 'Ground-mount, commercial carports & canal-top MW projects.',
      path: '/services',
      icon: <FiZap />
    },
    {
      title: 'Our Solar Projects',
      desc: 'Explore 16+ years of delivered solar installations across 9 states.',
      path: '/projects',
      icon: <FiLayers />
    },
    {
      title: 'PM Surya Ghar & Products',
      desc: 'Tier-1 bifacial panels, Deye inverters & certified balance of system.',
      path: '/products',
      icon: <FiSun />
    },
    {
      title: 'Get a Solar Consultation',
      desc: 'Talk with our engineering team for site assessment and estimates.',
      path: '/contact',
      icon: <FiPhoneCall />
    }
  ]

  return (
    <div className="site-shell not-found-page">
      <SEO
        title="404 - Page Not Found | N Solutions"
        description="The page you are looking for could not be found. Discover N Solutions solar engineering, rooftop installations, and EPC services."
        path="/404"
      />
      <SiteHeader activePath="" />

      <main className="not-found-main" id="not-found-content">
        {/* Decorative Solar Background Elements */}
        <div className="not-found-ambient" aria-hidden="true">
          <div className="solar-glow-orb solar-glow-orb-1" />
          <div className="solar-glow-orb solar-glow-orb-2" />
          <div className="solar-pattern-grid" />
        </div>

        <section className="not-found-card-wrapper wrap">
          <div className="not-found-card">
            
            {/* Visual Solar 404 Graphic */}
            <div className="not-found-visual-badge">
              <span className="not-found-digit">4</span>
              <span className="not-found-digit">0</span>
              <span className="not-found-digit">4</span>
            </div>

            {/* Small Label */}
            <div className="error-pill-label">
              <span>ERROR 404</span>
            </div>

            {/* Main Heading */}
            <h1 className="not-found-heading">Page Not Found</h1>

            {/* Description */}
            <p className="not-found-description">
              The page you are looking for may have been moved, removed, or is temporarily unavailable. Let us help you find the right solar solution.
            </p>

            {/* Action Buttons */}
            <div className="not-found-actions">
              <a
                href="/"
                className="not-found-btn not-found-btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/')
                }}
              >
                <FiHome className="btn-icon" />
                <span>Back to Home</span>
                <Arrow />
              </a>

              <a
                href="/services"
                className="not-found-btn not-found-btn-secondary"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/services')
                }}
              >
                <FiCompass className="btn-icon" />
                <span>Explore Our Services</span>
              </a>
            </div>

            {/* Additional Link */}
            <div className="not-found-contact-link-wrap">
              <span>Need immediate assistance? </span>
              <a
                href="/contact"
                className="not-found-contact-link"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/contact')
                }}
              >
                <FiMail className="contact-link-ico" />
                <span>Contact N Solutions</span>
                <FiArrowRight className="arrow-hover-ico" />
              </a>
            </div>

            {/* Suggested Supporting Section */}
            <div className="not-found-supporting-box">
              <div className="supporting-header">
                <FiShield className="supporting-icon" />
                <h3>Looking for Solar Solutions?</h3>
              </div>
              <p className="supporting-text">
                Looking for solar installation, EPC services, solar products, or project support? Explore our website to learn more about N Solutions and how we can help with your energy requirements.
              </p>

              {/* Quick Navigation Cards */}
              <div className="not-found-quick-grid">
                {quickLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.path}
                    className="not-found-quick-card"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(item.path)
                    }}
                  >
                    <div className="quick-card-icon">{item.icon}</div>
                    <div className="quick-card-body">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                    <FiArrowRight className="quick-card-arrow" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      <SiteFooter hideClients={true} showClients={false} hidePartners={true} showPartners={false} />
    </div>
  )
}
