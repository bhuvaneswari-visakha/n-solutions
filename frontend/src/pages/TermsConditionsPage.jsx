import { useEffect } from 'react'
import SEO from '../components/SEO/SEO'
import { SiteHeader, SiteFooter, navigate } from '../components/Shared'
import { useSEO } from '../utils/useSEO'
import {
  FiFileText,
  FiShield,
  FiCheckCircle,
  FiLock,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiCalendar,
  FiInfo,
  FiSun,
  FiDollarSign,
  FiCpu,
  FiAlertTriangle,
  FiArrowRight,
  FiCompass
} from 'react-icons/fi'

export default function TermsConditionsPage() {
  useSEO({
    title: 'Terms & Conditions | N Solutions Solar EPC',
    description: 'Read the official Terms & Conditions governing access to and usage of the N Solutions website, solar quotations, enquiries, and services.',
    keywords: 'N Solutions terms and conditions, solar EPC terms of service, solar agreement Andhra Pradesh',
    canonical: 'https://nsol.in/terms'
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    { id: 'intro', title: '1. Introduction' },
    { id: 'services', title: '2. About Our Services' },
    { id: 'accuracy', title: '3. Website Info & Accuracy' },
    { id: 'enquiries', title: '4. Enquiries & Quotations' },
    { id: 'pricing', title: '5. Pricing & Payments' },
    { id: 'products', title: '6. Product Info & Availability' },
    { id: 'performance', title: '7. Solar Performance & Outcomes' },
    { id: 'responsibilities', title: '8. User Responsibilities' },
    { id: 'ip-rights', title: '9. Intellectual Property Rights' },
    { id: 'third-party', title: '10. Third-Party Links & Services' },
    { id: 'availability', title: '11. Website Availability' },
    { id: 'liability', title: '12. Limitation of Liability' },
    { id: 'indemnity', title: '13. Indemnity' },
    { id: 'privacy', title: '14. Privacy' },
    { id: 'changes', title: '15. Changes to These Terms' },
    { id: 'governing-law', title: '16. Governing Law & Jurisdiction' },
    { id: 'contact', title: '17. Contact Information' }
  ]

  const scrollToSection = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const topOffset = 100
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - topOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="site-shell privacy-page terms-page">
      <SEO
        title="Terms & Conditions | N Solutions Solar EPC"
        description="Official Terms and Conditions governing website usage, enquiries, quotations, solar services, and intellectual property of N Solutions."
        keywords="terms and conditions, N Solutions terms, solar terms of service, legal notice"
        path="/terms"
      />
      <SiteHeader activePath="/terms" />

      {/* Terms Hero Banner */}
      <section className="legal-hero">
        <div className="legal-hero-inner wrap">
          <div className="legal-breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/') }}>Home</a>
            <span>/</span>
            <span className="current">Terms &amp; Conditions</span>
          </div>

          <div className="legal-badge-pill">
            <FiShield className="legal-badge-icon" />
            <span>Official Legal Terms • ISO 9001:2015 Certified Company</span>
          </div>

          <h1 className="legal-title">Terms &amp; Conditions</h1>
          <p className="legal-subtitle">N Solutions — Solar EPC &amp; Renewable Energy Systems</p>

          <div className="legal-meta-row">
            <div className="legal-meta-item">
              <FiCalendar className="meta-icon" />
              <span><strong>Last Updated:</strong> 18 October 2026</span>
            </div>
            <div className="legal-meta-divider" />
            <div className="legal-meta-item">
              <FiGlobe className="meta-icon" />
              <span><strong>Applicable Website:</strong> www.nsol.in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Document Layout */}
      <section className="legal-document-section wrap">
        <div className="legal-layout-grid">
          <aside className="legal-toc-sidebar">
            <div className="legal-toc-box">
              <div className="toc-header">
                <FiFileText className="toc-icon" />
                <h3>Table of Contents</h3>
              </div>
              <nav className="toc-nav">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => scrollToSection(e, sec.id)}
                    className="toc-link"
                  >
                    <span>{sec.title}</span>
                    <FiArrowRight className="toc-arrow" />
                  </a>
                ))}
              </nav>
              <div className="toc-help-box">
                <FiLock className="help-icon" />
                <h4>Client Legal Support</h4>
                <p>Have questions about contracts or quotes? Our team is here to assist.</p>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="toc-help-link">
                  Contact Legal &rarr;
                </a>
              </div>
            </div>
          </aside>
          {/* Main Document Paper Card */}
          <article className="legal-document-card">
            {/* Section 1 */}
            <div className="legal-doc-block" id="intro">
              <div className="doc-section-header">
                <span className="section-number">01</span>
                <h2>Introduction</h2>
              </div>
              <p>
                Welcome to the <strong>N Solutions</strong> website. These Terms &amp; Conditions govern your access to and use of our website and its publicly available content.
              </p>
              <p>
                In these terms, <strong>“N Solutions,” “we,” “our,” and “us”</strong> refer to N Solutions. <strong>“You” and “your”</strong> refer to any individual or organization accessing or using the website.
              </p>
              <div className="policy-callout-box">
                <FiInfo className="callout-icon" />
                <p>
                  By accessing or using this website, you agree to comply with these terms. If you do not agree, please discontinue use of the website.
                </p>
              </div>
              <p>
                These terms govern website usage only. Any solar installation, product purchase, engineering assignment, maintenance service, or other project engagement may be subject to a separate quotation, purchase order, service agreement, or contract.
              </p>
            </div>

            {/* Section 2 */}
            <div className="legal-doc-block" id="services">
              <div className="doc-section-header">
                <span className="section-number">02</span>
                <h2>About Our Services</h2>
              </div>
              <p>
                N Solutions provides solar energy solutions and related services, which may include:
              </p>
              <ul className="legal-checklist">
                <li><FiCheckCircle className="check-ico" /> <span><strong>Solar Engineering, Procurement and Construction (EPC)</strong></span></li>
                <li><FiCheckCircle className="check-ico" /> <span><strong>Commercial and industrial solar solutions</strong></span></li>
                <li><FiCheckCircle className="check-ico" /> <span><strong>Residential rooftop solar installations</strong></span></li>
                <li><FiCheckCircle className="check-ico" /> <span><strong>Solar project engineering and implementation</strong></span></li>
                <li><FiCheckCircle className="check-ico" /> <span><strong>Solar product and component supply</strong></span></li>
                <li><FiCheckCircle className="check-ico" /> <span><strong>Solar installation and commissioning</strong></span></li>
                <li><FiCheckCircle className="check-ico" /> <span><strong>Operation and maintenance services</strong></span></li>
                <li><FiCheckCircle className="check-ico" /> <span><strong>Solar pumps and related energy solutions</strong></span></li>
                <li><FiCheckCircle className="check-ico" /> <span><strong>Assistance with applicable subsidies, financing processes, and net metering requirements</strong></span></li>
              </ul>
              <div className="policy-callout-box" style={{ marginTop: '16px' }}>
                <FiCompass className="callout-icon" />
                <p>
                  The availability and scope of any particular service depend on project requirements, location, technical feasibility, applicable regulations, and written confirmation from N Solutions.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="legal-doc-block" id="accuracy">
              <div className="doc-section-header">
                <span className="section-number">03</span>
                <h2>Website Information and Accuracy</h2>
              </div>
              <p>
                We make reasonable efforts to ensure that information on our website is clear, relevant, and current. However, website content is provided for general informational purposes.
              </p>
              <p>
                Descriptions of services, products, projects, technical capabilities, and company experience may be updated from time to time. We do not guarantee that every page will always be complete, current, or free from errors.
              </p>
              <p>
                Images, illustrations, project photographs, and other visual materials may be provided to explain our work or demonstrate applications. Actual project specifications and results may differ according to site conditions and project requirements.
              </p>
            </div>

            {/* Section 4 */}
            <div className="legal-doc-block" id="enquiries">
              <div className="doc-section-header">
                <span className="section-number">04</span>
                <h2>Enquiries and Quotations</h2>
              </div>
              <p>
                Submitting an enquiry through our website does not constitute a binding contract or guarantee acceptance of a project.
              </p>
              <div className="policy-subsection">
                <h3>Conditions Governing Quotations &amp; Proposals</h3>
                <p>Any quotation, estimate, or proposal issued by N Solutions may be subject to:</p>
                <ul className="legal-checklist">
                  <li><FiCheckCircle className="check-ico" /> <span>Site inspection and technical assessment</span></li>
                  <li><FiCheckCircle className="check-ico" /> <span>Confirmation of project capacity and requirements</span></li>
                  <li><FiCheckCircle className="check-ico" /> <span>Availability of equipment and materials</span></li>
                  <li><FiCheckCircle className="check-ico" /> <span>Applicable taxes, duties, and statutory charges</span></li>
                  <li><FiCheckCircle className="check-ico" /> <span>Utility approvals, permits, and regulatory requirements</span></li>
                  <li><FiCheckCircle className="check-ico" /> <span>Commercial terms and payment conditions</span></li>
                  <li><FiCheckCircle className="check-ico" /> <span>Written acceptance of the relevant proposal or agreement</span></li>
                </ul>
              </div>
              <p>
                A project will be considered agreed only in accordance with the applicable written contractual documents.
              </p>
            </div>

            {/* Section 5 */}
            <div className="legal-doc-block" id="pricing">
              <div className="doc-section-header">
                <span className="section-number">05</span>
                <h2>Pricing and Payments</h2>
              </div>
              <p>
                Prices, estimates, and service charges may vary depending on project size, equipment specifications, installation complexity, location, and other relevant factors.
              </p>
              <p>
                The final price, applicable taxes, payment milestones, delivery terms, and other commercial conditions will be communicated through the relevant quotation or agreement.
              </p>
              <p>
                Any advance payment, cancellation charge, refund, or payment-related obligation will be governed by the applicable written agreement and relevant law.
              </p>
            </div>

            {/* Section 6 */}
            <div className="legal-doc-block" id="products">
              <div className="doc-section-header">
                <span className="section-number">06</span>
                <h2>Product Information and Availability</h2>
              </div>
              <p>
                Solar panels, inverters, electrical equipment, mounting structures, and other components may be subject to changes in manufacturer specifications, model availability, supply conditions, and applicable standards.
              </p>
              <p>
                Product details published on the website are for general reference. Final product selection and specifications will be confirmed during the quotation or procurement process.
              </p>
              <p>
                Manufacturer warranties, where available, are subject to the applicable manufacturer's terms and conditions. Any warranty or performance commitment provided directly by N Solutions will be governed by the relevant written documentation.
              </p>
            </div>

            {/* Section 7 */}
            <div className="legal-doc-block" id="performance">
              <div className="doc-section-header">
                <span className="section-number">07</span>
                <h2>Solar Performance and Project Outcomes</h2>
              </div>
              <p>
                Solar system performance depends on several factors, including solar irradiation, weather conditions, shading, site orientation, equipment specifications, installation quality, maintenance, electricity consumption patterns, and applicable utility policies.
              </p>
              <p>
                Any estimated generation, savings, payback period, or return on investment provided during a consultation or proposal is an estimate based on stated assumptions. Actual results may differ.
              </p>
              <div className="policy-callout-box">
                <FiSun className="callout-icon" />
                <p>
                  Government incentives, subsidies, net metering arrangements, and financing facilities are subject to the eligibility requirements, approvals, terms, and decisions of the relevant authorities, utilities, financial institutions, or scheme administrators.
                </p>
              </div>
              <p>
                N Solutions does not guarantee the approval of a subsidy, financing application, utility connection, or regulatory permission unless a specific commitment is expressly stated in a valid written agreement and is legally permissible.
              </p>
            </div>

            {/* Section 8 */}
            <div className="legal-doc-block" id="responsibilities">
              <div className="doc-section-header">
                <span className="section-number">08</span>
                <h2>User Responsibilities</h2>
              </div>
              <p>When using our website or submitting an enquiry, you agree to:</p>
              <ul className="legal-checklist">
                <li><FiCheckCircle className="check-ico" /> <span>Provide accurate information to the best of your knowledge.</span></li>
                <li><FiCheckCircle className="check-ico" /> <span>Use the website for lawful purposes.</span></li>
                <li><FiCheckCircle className="check-ico" /> <span>Avoid submitting misleading, fraudulent, abusive, or unlawful content.</span></li>
                <li><FiCheckCircle className="check-ico" /> <span>Avoid attempting unauthorized access to website systems, administrative functions, or databases.</span></li>
                <li><FiCheckCircle className="check-ico" /> <span>Avoid introducing malware, malicious code, or activity that disrupts website operations.</span></li>
                <li><FiCheckCircle className="check-ico" /> <span>Respect the intellectual property rights of N Solutions and third parties.</span></li>
                <li><FiCheckCircle className="check-ico" /> <span>Avoid using website content in a manner that violates applicable law.</span></li>
              </ul>
              <p className="notice-subtext" style={{ marginTop: '12px' }}>
                We reserve the right to take reasonable action where misuse or unauthorized activity is identified, subject to applicable law.
              </p>
            </div>

            {/* Section 9 */}
            <div className="legal-doc-block" id="ip-rights">
              <div className="doc-section-header">
                <span className="section-number">09</span>
                <h2>Intellectual Property Rights</h2>
              </div>
              <p>
                Unless otherwise indicated, the website's text, design elements, graphics, branding, logos, layouts, and other original materials are owned by N Solutions or used with appropriate authorization.
              </p>
              <p>
                You may view and use the website for personal, informational, and legitimate business enquiry purposes.
              </p>
              <div className="bold-highlight-box" style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#991b1b' }}>
                You must not reproduce, republish, distribute, modify, commercially exploit, or create derivative works from protected website materials without prior permission from the relevant rights holder, except where permitted by applicable law.
              </div>
              <p>
                Third-party logos, trademarks, product names, and certification marks remain the property of their respective owners. Their appearance on this website does not necessarily imply endorsement beyond any specifically stated and verified relationship.
              </p>
            </div>

            {/* Section 10 */}
            <div className="legal-doc-block" id="third-party">
              <div className="doc-section-header">
                <span className="section-number">10</span>
                <h2>Third-Party Links and Services</h2>
              </div>
              <p>
                Our website may link to third-party websites, service providers, manufacturers, government portals, or other external resources.
              </p>
              <p>
                These links are provided for convenience or information. N Solutions does not control all third-party content, availability, security practices, or terms of use.
              </p>
              <p>
                Accessing an external website is at your discretion, and you should review its applicable terms and privacy policy.
              </p>
            </div>

            {/* Section 11 */}
            <div className="legal-doc-block" id="availability">
              <div className="doc-section-header">
                <span className="section-number">11</span>
                <h2>Website Availability and Maintenance</h2>
              </div>
              <p>
                We aim to keep our website accessible and functional. However, uninterrupted availability cannot be guaranteed.
              </p>
              <p>
                The website may occasionally be unavailable due to maintenance, technical issues, hosting problems, security measures, or circumstances beyond our reasonable control.
              </p>
              <p>
                We may update, modify, suspend, or discontinue website features when reasonably necessary.
              </p>
            </div>

            {/* Section 12 */}
            <div className="legal-doc-block" id="liability">
              <div className="doc-section-header">
                <span className="section-number">12</span>
                <h2>Limitation of Liability</h2>
              </div>
              <p>
                To the extent permitted by applicable law, N Solutions shall not be liable for losses arising solely from temporary website unavailability, technical errors, reliance on general informational content, or third-party websites beyond our control.
              </p>
              <p>
                Nothing in these terms excludes or limits liability that cannot legally be excluded or limited.
              </p>
              <p>
                Any liability relating to a specific solar project, product supply, installation, or maintenance engagement will be governed by the applicable written agreement and relevant law.
              </p>
            </div>

            {/* Section 13 */}
            <div className="legal-doc-block" id="indemnity">
              <div className="doc-section-header">
                <span className="section-number">13</span>
                <h2>Indemnity</h2>
              </div>
              <p>
                To the extent permitted by applicable law, users are responsible for losses or claims arising from their unlawful use of the website, infringement of third-party rights, or deliberate misuse of website systems.
              </p>
              <p>
                Nothing in this clause creates an obligation beyond what is permitted by applicable law.
              </p>
            </div>

            {/* Section 14 */}
            <div className="legal-doc-block" id="privacy">
              <div className="doc-section-header">
                <span className="section-number">14</span>
                <h2>Privacy</h2>
              </div>
              <p>
                Your use of the website is also subject to our <a href="/privacy" onClick={(e) => { e.preventDefault(); navigate('/privacy') }} style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'underline' }}>Privacy Policy</a>, which explains how personal information may be collected and processed.
              </p>
              <p>
                Please review the Privacy Policy before submitting personal information through our website.
              </p>
            </div>

            {/* Section 15 */}
            <div className="legal-doc-block" id="changes">
              <div className="doc-section-header">
                <span className="section-number">15</span>
                <h2>Changes to These Terms</h2>
              </div>
              <p>
                N Solutions may revise these Terms &amp; Conditions when necessary to reflect changes in website functionality, services, business practices, or legal requirements.
              </p>
              <p>
                Revised terms will be published on this page with an updated revision date. Continued use of the website after changes take effect will be subject to applicable law and the revised terms.
              </p>
            </div>

            {/* Section 16 */}
            <div className="legal-doc-block" id="governing-law">
              <div className="doc-section-header">
                <span className="section-number">16</span>
                <h2>Governing Law and Jurisdiction</h2>
              </div>
              <div className="policy-callout-box">
                <FiShield className="callout-icon" />
                <p>
                  These Terms &amp; Conditions are subject to the laws of India. Any dispute arising from the use of this website shall be handled by the courts having appropriate jurisdiction under applicable law.
                </p>
              </div>
            </div>

            {/* Section 17 */}
            <div className="legal-doc-block contact-doc-block" id="contact">
              <div className="doc-section-header">
                <span className="section-number">17</span>
                <h2>Contact Information</h2>
              </div>
              <p>For questions concerning these Terms &amp; Conditions, please contact:</p>
              <div className="official-contact-card">
                <div className="contact-company-badge">
                  <FiShield />
                  <span>Legal &amp; Compliance Office</span>
                </div>
                <h3>N Solutions</h3>
                <div className="contact-info-list">
                  <div className="contact-row">
                    <FiMail className="contact-icon" />
                    <div>
                      <small>Primary Email</small>
                      <a href="mailto:info@nsol.in">info@nsol.in</a>
                    </div>
                  </div>

                  <div className="contact-row">
                    <FiMail className="contact-icon" />
                    <div>
                      <small>Alternative Email</small>
                      <a href="mailto:nsolutions@live.com">nsolutions@live.com</a>
                    </div>
                  </div>

                  <div className="contact-row">
                    <FiPhone className="contact-icon" />
                    <div>
                      <small>Phone Numbers</small>
                      <div>
                        <a href="tel:+919492731212">+91 9492731212</a>
                        <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 8px' }}>/</span>
                        <a href="tel:+919494703452">+91 9494703452</a>
                      </div>
                    </div>
                  </div>

                  <div className="contact-row">
                    <FiGlobe className="contact-icon" />
                    <div>
                      <small>Official Website</small>
                      <a href="https://www.nsol.in" target="_blank" rel="noopener noreferrer">www.nsol.in</a>
                    </div>
                  </div>

                  <div className="contact-row">
                    <FiMapPin className="contact-icon" />
                    <div>
                      <small>Registered Office Address</small>
                      <address>#27-23-27, MIG-214, APHB Colony, Babametta, Vizianagaram – 535002, Andhra Pradesh, India</address>
                    </div>
                  </div>
                </div>

                <div className="contact-card-footer">
                  <span>Last updated: 18 October 2026</span>
                </div>
              </div>
            </div>

          </article>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}