import { useEffect } from 'react'
import SEO from '../components/SEO/SEO'
import { SiteHeader, SiteFooter, Arrow, navigate } from '../components/Shared'
import { useSEO } from '../utils/useSEO'
import {
  FiShield,
  FiLock,
  FiFileText,
  FiCheckCircle,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiCalendar,
  FiInfo,
  FiUserCheck,
  FiLayers,
  FiArrowRight
} from 'react-icons/fi'

export default function PrivacyPolicyPage() {
  useSEO({
    title: 'Privacy Policy | N Solutions Solar EPC',
    description: 'Learn how N Solutions collects, uses, protects, and handles personal data and project information in accordance with privacy and data protection standards.',
    keywords: 'N Solutions privacy policy, solar EPC data privacy, solar company terms, customer data protection',
    canonical: 'https://nsol.in/privacy'
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    { id: 'intro', title: '1. Introduction' },
    { id: 'info-collect', title: '2. Information We Collect' },
    { id: 'how-use', title: '3. How We Use Your Information' },
    { id: 'legal-basis', title: '4. Legal Basis for Processing' },
    { id: 'sharing', title: '5. Sharing and Disclosure' },
    { id: 'security', title: '6. Data Storage and Security' },
    { id: 'retention', title: '7. Data Retention' },
    { id: 'rights', title: '8. Your Privacy Rights' },
    { id: 'third-party', title: '9. Third-Party Websites' },
    { id: 'children', title: "10. Children's Privacy" },
    { id: 'changes', title: '11. Changes to This Policy' },
    { id: 'contact', title: '12. Contact and Enquiries' }
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
    <div className="site-shell privacy-page">
      <SEO
        title="Privacy Policy | N Solutions Solar EPC"
        description="Privacy policy and data governance practices of N Solutions, explaining collection, usage, and safeguarding of customer and project information."
        keywords="privacy policy, N Solutions, data protection, solar EPC"
        path="/privacy"
      />
      <SiteHeader activePath="/privacy" />

      {/* Document Header Banner */}
      <section className="legal-hero">
        <div className="legal-hero-inner wrap">
          <div className="legal-breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/') }}>Home</a>
            <span>/</span>
            <span className="current">Privacy Policy</span>
          </div>

          <div className="legal-badge-pill">
            <FiShield className="legal-badge-icon" />
            <span>Official Policy Document • ISO 9001:2015 Certified Company</span>
          </div>

          <h1 className="legal-title">Privacy Policy</h1>
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

      {/* Document Content Layout */}
      <section className="legal-document-section wrap">
        <div className="legal-layout-grid">
          
          {/* Quick Jump Sidebar */}
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
                <h4>Data Protection</h4>
                <p>We are dedicated to safeguarding your project and personal data.</p>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="toc-help-link">
                  Privacy Contact &rarr;
                </a>
              </div>
            </div>
          </aside>

          {/* Main Document Body */}
          <article className="legal-document-card">
            
            {/* Section 1 */}
            <div className="legal-doc-block" id="intro">
              <div className="doc-section-header">
                <span className="section-number">01</span>
                <h2>Introduction</h2>
              </div>
              <p>
                <strong>N Solutions</strong> (“we,” “our,” or “us”) is committed to protecting the privacy and personal information of visitors, customers, business partners, and individuals who contact us through our website.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, store, disclose, and protect information when you visit our website, submit an enquiry, request a quotation, or communicate with our team.
              </p>
              <div className="policy-callout-box">
                <FiInfo className="callout-icon" />
                <p>
                  By using our website, you acknowledge this Privacy Policy. Where consent is required by applicable law, we will obtain it before processing your information for the relevant purpose.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="legal-doc-block" id="info-collect">
              <div className="doc-section-header">
                <span className="section-number">02</span>
                <h2>Information We Collect</h2>
              </div>
              <p>
                We may collect the following categories of information, depending on how you interact with our website.
              </p>

              <div className="policy-subsection">
                <h3>Personal Information</h3>
                <p>When you submit a contact form, request a consultation, or communicate with us, we may collect:</p>
                <ul className="legal-checklist">
                  <li><FiCheckCircle className="check-ico" /> <span><strong>Full name</strong></span></li>
                  <li><FiCheckCircle className="check-ico" /> <span><strong>Phone number</strong> and <strong>email address</strong></span></li>
                  <li><FiCheckCircle className="check-ico" /> <span><strong>Company or organization name</strong></span></li>
                  <li><FiCheckCircle className="check-ico" /> <span><strong>Business or project location</strong></span></li>
                  <li><FiCheckCircle className="check-ico" /> <span><strong>Details about your solar energy requirements</strong></span></li>
                  <li><FiCheckCircle className="check-ico" /> <span><strong>Information included in your message or enquiry</strong></span></li>
                  <li><FiCheckCircle className="check-ico" /> <span><strong>Other information you voluntarily provide</strong></span></li>
                </ul>
              </div>

              <div className="policy-subsection">
                <h3>Project and Business Information</h3>
                <p>
                  To understand your requirements and respond appropriately, we may collect information about your proposed solar installation, including project type, site details, estimated energy consumption, electricity requirements, and preferred services.
                </p>
                <p className="notice-subtext">
                  <em>* Please avoid submitting confidential business information or sensitive personal information unless it is necessary for your enquiry.</em>
                </p>
              </div>

              <div className="policy-subsection">
                <h3>Technical and Usage Information</h3>
                <p>
                  When you visit our website, certain technical information may be collected automatically, depending on the technologies we use. This may include your IP address, browser type, device information, pages visited, referring website, approximate location derived from technical information, and interaction data.
                </p>
              </div>

              <div className="policy-subsection">
                <h3>Cookies and Similar Technologies</h3>
                <p>
                  Our website may use cookies or similar technologies to maintain functionality, understand website usage, improve performance, and measure marketing effectiveness where applicable. You can manage cookies through your browser settings. Disabling certain cookies may affect some website features.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="legal-doc-block" id="how-use">
              <div className="doc-section-header">
                <span className="section-number">03</span>
                <h2>How We Use Your Information</h2>
              </div>
              <p>N Solutions may use the information collected for the following purposes:</p>
              
              <div className="purposes-grid">
                <div className="purpose-item">
                  <strong>Responding to enquiries</strong>
                  <p>To answer questions about our solar solutions, products, installations, and services.</p>
                </div>
                <div className="purpose-item">
                  <strong>Preparing quotations</strong>
                  <p>To understand project requirements and prepare relevant estimates, proposals, or consultations.</p>
                </div>
                <div className="purpose-item">
                  <strong>Project communication</strong>
                  <p>To contact you regarding site assessments, technical discussions, project proposals, and service requests.</p>
                </div>
                <div className="purpose-item">
                  <strong>Customer support</strong>
                  <p>To address concerns, coordinate support, and respond to feedback.</p>
                </div>
                <div className="purpose-item">
                  <strong>Website improvement</strong>
                  <p>To understand website performance, identify usability issues, and improve our digital services.</p>
                </div>
                <div className="purpose-item">
                  <strong>Business operations</strong>
                  <p>To maintain enquiry records, manage customer relationships, and improve internal processes.</p>
                </div>
                <div className="purpose-item">
                  <strong>Marketing communication</strong>
                  <p>To share relevant company updates, service information, or promotional material where permitted by law and, where required, with your consent.</p>
                </div>
                <div className="purpose-item">
                  <strong>Legal compliance</strong>
                  <p>To comply with applicable laws, lawful requests, and legitimate regulatory obligations.</p>
                </div>
                <div className="purpose-item">
                  <strong>Security and fraud prevention</strong>
                  <p>To protect our website, systems, users, and business operations from misuse or unauthorized activity.</p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="legal-doc-block" id="legal-basis">
              <div className="doc-section-header">
                <span className="section-number">04</span>
                <h2>Legal Basis for Processing</h2>
              </div>
              <p>
                Where applicable data protection law requires a legal basis for processing personal information, we may rely on your consent, steps taken at your request before entering into a contract, performance of a contract, compliance with legal obligations, or other lawful grounds applicable to the circumstances.
              </p>
              <p>
                Where processing relies on consent, you may withdraw that consent subject to applicable law. Withdrawal does not affect processing lawfully carried out before the withdrawal.
              </p>
            </div>

            {/* Section 5 */}
            <div className="legal-doc-block" id="sharing">
              <div className="doc-section-header">
                <span className="section-number">05</span>
                <h2>Sharing and Disclosure of Information</h2>
              </div>
              <div className="bold-highlight-box">
                <strong>N Solutions does not sell your personal information.</strong>
              </div>
              <p>We may share relevant information in limited circumstances, including:</p>
              <ul className="legal-checklist">
                <li>
                  <FiCheckCircle className="check-ico" />
                  <span><strong>Authorized service providers:</strong> Providers supporting website hosting, communication, analytics, IT infrastructure, or business operations.</span>
                </li>
                <li>
                  <FiCheckCircle className="check-ico" />
                  <span><strong>Project-related parties:</strong> Contractors, suppliers, or technical partners where sharing is necessary for an authorized project or service.</span>
                </li>
                <li>
                  <FiCheckCircle className="check-ico" />
                  <span><strong>Professional advisers:</strong> Legal, accounting, or other professional advisers where reasonably necessary.</span>
                </li>
                <li>
                  <FiCheckCircle className="check-ico" />
                  <span><strong>Government and regulatory authorities:</strong> Where disclosure is required by law or a valid lawful request.</span>
                </li>
                <li>
                  <FiCheckCircle className="check-ico" />
                  <span><strong>Business transactions:</strong> Where information must be handled as part of a merger, restructuring, or transfer of business, subject to applicable legal requirements.</span>
                </li>
              </ul>
              <p className="note-text">
                We take reasonable steps to ensure that information shared with service providers is handled appropriately and only for relevant purposes.
              </p>
            </div>

            {/* Section 6 */}
            <div className="legal-doc-block" id="security">
              <div className="doc-section-header">
                <span className="section-number">06</span>
                <h2>Data Storage and Security</h2>
              </div>
              <p>
                We use reasonable technical and organizational safeguards designed to protect personal information against unauthorized access, loss, misuse, alteration, or disclosure.
              </p>
              <p>
                Depending on the systems used, these measures may include access controls, restricted administrative permissions, secure connections, and appropriate data-handling procedures.
              </p>
              <div className="policy-callout-box">
                <FiLock className="callout-icon" />
                <p>
                  However, no method of electronic transmission or storage can be guaranteed to be completely secure. We therefore cannot promise absolute security.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="legal-doc-block" id="retention">
              <div className="doc-section-header">
                <span className="section-number">07</span>
                <h2>Data Retention</h2>
              </div>
              <p>
                We retain personal information only for as long as reasonably necessary to fulfil the purposes described in this policy, manage business relationships, respond to enquiries, meet contractual obligations, resolve disputes, and comply with applicable laws.
              </p>
              <p>
                Retention periods may vary depending on the type of information, the nature of the enquiry, and relevant legal requirements. When information is no longer required, we will take appropriate steps to delete it or otherwise handle it in accordance with applicable law.
              </p>
            </div>

            {/* Section 8 */}
            <div className="legal-doc-block" id="rights">
              <div className="doc-section-header">
                <span className="section-number">08</span>
                <h2>Your Privacy Rights</h2>
              </div>
              <p>Subject to applicable law, you may have the right to:</p>
              <ul className="legal-checklist">
                <li><FiUserCheck className="check-ico" /> <span>Request information about personal data we process about you.</span></li>
                <li><FiUserCheck className="check-ico" /> <span>Request correction of inaccurate or incomplete information.</span></li>
                <li><FiUserCheck className="check-ico" /> <span>Request deletion of personal information where legally applicable.</span></li>
                <li><FiUserCheck className="check-ico" /> <span>Withdraw consent where processing is based on consent.</span></li>
                <li><FiUserCheck className="check-ico" /> <span>Raise a concern or grievance about how your information is handled.</span></li>
                <li><FiUserCheck className="check-ico" /> <span>Exercise any additional rights available under applicable data protection law.</span></li>
              </ul>
              <p>
                To submit a request, contact us using the details below. We may need to verify your identity before processing certain requests.
              </p>
            </div>

            {/* Section 9 */}
            <div className="legal-doc-block" id="third-party">
              <div className="doc-section-header">
                <span className="section-number">09</span>
                <h2>Third-Party Websites</h2>
              </div>
              <p>
                Our website may contain links to third-party websites, services, or platforms. These external services operate under their own privacy policies and terms.
              </p>
              <p>
                N Solutions is not responsible for the privacy practices or content of websites that we do not control. We encourage you to review their policies before providing personal information.
              </p>
            </div>

            {/* Section 10 */}
            <div className="legal-doc-block" id="children">
              <div className="doc-section-header">
                <span className="section-number">10</span>
                <h2>Children's Privacy</h2>
              </div>
              <p>
                Our website and services are intended for general business and consumer audiences and are not specifically directed at children. We do not knowingly collect personal information from children in violation of applicable law. If you believe that a child has provided personal information improperly, please contact us so that we can assess and address the request.
              </p>
            </div>

            {/* Section 11 */}
            <div className="legal-doc-block" id="changes">
              <div className="doc-section-header">
                <span className="section-number">11</span>
                <h2>Changes to This Privacy Policy</h2>
              </div>
              <p>
                We may update this Privacy Policy to reflect changes in our business practices, website functionality, technology, or legal requirements.
              </p>
              <p>
                Any revised version will be published on this page with an updated revision date. We encourage visitors to review this page periodically.
              </p>
            </div>

            {/* Section 12 */}
            <div className="legal-doc-block contact-doc-block" id="contact">
              <div className="doc-section-header">
                <span className="section-number">12</span>
                <h2>Contact and Privacy Enquiries</h2>
              </div>
              <p>For questions, requests, or concerns regarding this Privacy Policy, please contact our team:</p>
              
              <div className="official-contact-card">
                <div className="contact-company-badge">
                  <FiShield />
                  <span>Official Privacy Office</span>
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
                      <small>Phone Number</small>
                      <a href="tel:+919492731212">+91 9492731212</a>
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
