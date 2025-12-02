"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "information-collect", title: "1. Information We Collect" },
  { id: "how-we-use", title: "2. How We Use Info" },
  { id: "how-we-share", title: "3. How We Share Info" },
  { id: "ai-processing", title: "4. AI & Data Processing" },
  { id: "data-retention", title: "5. Data Retention" },
  { id: "privacy-rights", title: "6. Your Privacy Rights" },
  { id: "data-security", title: "7. Data Security" },
  { id: "international-transfers", title: "8. International Transfers" },
  { id: "children", title: "9. Children's Privacy" },
  { id: "third-party", title: "10. Third-Party Links" },
  { id: "cookies", title: "11. Cookies & Tracking" },
  { id: "changes", title: "12. Policy Changes" },
  { id: "contact", title: "13. Contact Information" },
  { id: "regional-rights", title: "14. Regional Rights" },
  { id: "consent", title: "15. Consent" },
];

const PrivacyPage = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  return (
    <section className="pt-40 pb-20 bg-background min-h-screen">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-midnight_text text-54 font-bold mb-4">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-dark_grey text-18 mb-2">Sahoolat AI</p>
          <p className="text-dark_grey text-16 mb-2">Website: <Link href="https://sahoolatai.com" className="text-primary hover:underline">sahoolatai.com</Link></p>
          <p className="text-dark_grey text-16 mb-8">Last Updated: November 29, 2025</p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sticky Sidebar Navigation */}
            <aside className="lg:w-72 flex-shrink-0">
              <nav className="lg:sticky lg:top-32 bg-white rounded-2xl p-6 shadow-card border-2 border-secondary max-h-[calc(100vh-160px)] overflow-y-auto">
                <h2 className="text-midnight_text text-18 font-bold mb-4 pb-3 border-b border-secondary">On This Page</h2>
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-14 transition-all duration-200 ${
                          activeSection === section.id
                            ? "bg-primary/10 text-primary font-semibold border-l-3 border-primary"
                            : "text-dark_grey hover:bg-secondary/30 hover:text-midnight_text"
                        }`}
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-2xl p-8 shadow-card border-2 border-secondary space-y-8">
              
              {/* Introduction */}
              <section id="introduction">
                <h2 className="text-midnight_text text-28 font-bold mb-4">Introduction</h2>
                <p className="text-dark_grey text-18 leading-relaxed mb-4">
                  Welcome to Sahoolat AI. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including our website, mobile applications, and AI-powered services.
                </p>
                <p className="text-dark_grey text-18 leading-relaxed">
                  By using Sahoolat AI, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              <hr className="border-secondary" />

              {/* 1. Information We Collect */}
              <section id="information-collect">
                <h2 className="text-midnight_text text-28 font-bold mb-6">1. Information We Collect</h2>
                
                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">1.1 Information You Provide Directly</h3>
                  
                  <p className="text-midnight_text text-18 font-semibold mb-2">Account Information:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                    <li>Name, mobile number, device information including IP Address, model name, operating system version, national identity card</li>
                    <li>Profile picture and bio</li>
                    <li>Business information (for service providers/sellers)</li>
                    <li>Payment information (to store and use for your secure process of debit/credit mechanism for application features)</li>
                  </ul>

                  <p className="text-midnight_text text-18 font-semibold mb-2">Content and Communications:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                    <li>Job postings and requirements shared with our AI chatbot</li>
                    <li>Shopping lists and purchase details</li>
                    <li>Messages with our AI assistant</li>
                    <li>Bids, proposals, and pricing information</li>
                    <li>Reviews and ratings</li>
                    <li>Customer service communications including in-app messaging&apos;s and calls history</li>
                  </ul>

                  <p className="text-midnight_text text-18 font-semibold mb-2">Location Information:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Your location (to match you with nearby service providers and sellers)</li>
                    <li>Delivery addresses</li>
                    <li>Service location preferences</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">1.2 Information Collected Automatically</h3>
                  
                  <p className="text-midnight_text text-18 font-semibold mb-2">Usage Data:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                    <li>Device information (type, operating system, browser)</li>
                    <li>IP address and geolocation data</li>
                    <li>Platform usage patterns and interactions</li>
                    <li>Pages visited and features used</li>
                    <li>Time spent on platform</li>
                    <li>Clickstream data</li>
                  </ul>

                  <p className="text-midnight_text text-18 font-semibold mb-2">Cookies and Tracking:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Cookies, web beacons, and similar technologies</li>
                    <li>Session identifiers</li>
                    <li>Analytics data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-primary text-21 font-semibold mb-3">1.3 Information from Third Parties</h3>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Social media profile information (if you connect accounts)</li>
                    <li>Payment verification from payment processors</li>
                    <li>Identity verification data</li>
                    <li>Public business information for service providers</li>
                  </ul>
                </div>
              </section>

              <hr className="border-secondary" />

              {/* 2. How We Use Your Information */}
              <section id="how-we-use">
                <h2 className="text-midnight_text text-28 font-bold mb-6">2. How We Use Your Information</h2>
                
                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">2.1 Core Service Operations</h3>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li><span className="font-semibold text-midnight_text">AI Matching:</span> Process your job requirements and shopping lists through our AI to match you with relevant service providers and sellers</li>
                    <li><span className="font-semibold text-midnight_text">Bid Management:</span> Facilitate the bidding process and communications between users and service providers</li>
                    <li><span className="font-semibold text-midnight_text">Location Services:</span> Connect you with nearby experts and shops based on your location</li>
                    <li><span className="font-semibold text-midnight_text">Recommendations:</span> Provide personalized suggestions using AI analysis</li>
                    <li><span className="font-semibold text-midnight_text">Communication:</span> Send notifications about bids, messages, and platform updates</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">2.2 Platform Improvement</h3>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Analyze usage patterns to improve our AI algorithms for better user experience</li>
                    <li>Conduct research and development on new features</li>
                    <li>Test and troubleshoot platform functionality</li>
                    <li>Generate anonymized analytics and insights</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">2.3 Security and Fraud Prevention</h3>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Verify user identity and prevent fraud</li>
                    <li>Protect against unauthorized access</li>
                    <li>Enforce our terms of service</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-primary text-21 font-semibold mb-3">2.4 Marketing and Communication</h3>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Send promotional materials (with your consent)</li>
                    <li>Provide customer support</li>
                    <li>Respond to inquiries and requests</li>
                    <li>Send transactional messages (order confirmations, bid notifications)</li>
                  </ul>
                </div>
              </section>

              <hr className="border-secondary" />

              {/* 3. How We Share Your Information */}
              <section id="how-we-share">
                <h2 className="text-midnight_text text-28 font-bold mb-6">3. How We Share Your Information</h2>
                
                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">3.1 With Service Providers and Sellers</h3>
                  <p className="text-dark_grey text-18 leading-relaxed mb-2">When you post a job or shopping list, we share relevant information with:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Nearby service providers who may bid on your jobs</li>
                    <li>Local shops and stores who can fulfill your shopping lists</li>
                    <li>Information shared includes: job/shopping requirements, location area, budget ranges, and contact preferences</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">3.2 With Service Partners</h3>
                  <p className="text-dark_grey text-18 leading-relaxed mb-2">We may share information with:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Payment processors (for secure transactions)</li>
                    <li>Cloud hosting providers (for data storage)</li>
                    <li>Analytics services (for platform improvement)</li>
                    <li>Communication services (for notifications and messages)</li>
                    <li>Identity verification services</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">3.3 Business Transfers</h3>
                  <p className="text-dark_grey text-18 leading-relaxed">
                    In connection with any merger, sale of company assets, financing, or acquisition, your information may be transferred to the acquiring entity.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">3.4 Legal Requirements</h3>
                  <p className="text-dark_grey text-18 leading-relaxed mb-2">We may disclose information when required by law, including:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Compliance with legal processes (subpoenas, court orders)</li>
                    <li>Protection of our rights and property</li>
                    <li>Investigation of fraud or security issues</li>
                    <li>Protection of user safety</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-primary text-21 font-semibold mb-3">3.5 Aggregate and Anonymized Data</h3>
                  <p className="text-dark_grey text-18 leading-relaxed mb-2">We may share anonymized, aggregated data that cannot identify you personally for:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Industry research and analysis</li>
                    <li>Marketing and promotional purposes</li>
                    <li>Platform statistics and insights</li>
                  </ul>
                </div>
              </section>

              <hr className="border-secondary" />

              {/* 4. AI and Data Processing */}
              <section id="ai-processing">
                <h2 className="text-midnight_text text-28 font-bold mb-6">4. AI and Data Processing</h2>
                
                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">4.1 AI-Powered Features</h3>
                  <p className="text-dark_grey text-18 leading-relaxed mb-2">Our AI chatbot processes your conversations to:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Understand your service or shopping requirements</li>
                    <li>Extract relevant details for job postings</li>
                    <li>Match you with appropriate providers and sellers</li>
                    <li>Generate recommendations and suggestions</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">4.2 Data Training</h3>
                  <p className="text-dark_grey text-18 leading-relaxed mb-2">We may use anonymized and aggregated data to:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Train and improve our AI models</li>
                    <li>Enhance matching algorithms</li>
                    <li>Improve natural language understanding</li>
                    <li>Optimize platform performance</li>
                  </ul>
                </div>

                <div className="bg-orange/10 rounded-lg p-4">
                  <p className="text-midnight_text text-18 font-semibold">
                    Important: Individual user data is not used to train AI models that would expose your personal information to other users.
                  </p>
                </div>
              </section>

              <hr className="border-secondary" />

              {/* 5. Data Retention */}
              <section id="data-retention">
                <h2 className="text-midnight_text text-28 font-bold mb-4">5. Data Retention</h2>
                <p className="text-dark_grey text-18 leading-relaxed mb-4">We retain your information for as long as:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                  <li>Your account remains active</li>
                  <li>Necessary to provide our services</li>
                  <li>Required by law or for legitimate business purposes</li>
                </ul>
                <p className="text-dark_grey text-18 leading-relaxed">
                  You can request deletion of your account and associated data at any time through your account settings or by contacting us.
                </p>
              </section>

              <hr className="border-secondary" />

              {/* 6. Your Privacy Rights */}
              <section id="privacy-rights">
                <h2 className="text-midnight_text text-28 font-bold mb-6">6. Your Privacy Rights</h2>
                
                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">6.1 Access and Portability</h3>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Request a copy of your personal data</li>
                    <li>Export your data in a portable format</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">6.2 Correction and Update</h3>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Update your profile information anytime</li>
                    <li>Correct inaccurate data</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">6.3 Deletion</h3>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Request deletion of your account and data</li>
                    <li>Some information may be retained for legal compliance</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">6.4 Opt-Out Rights</h3>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Unsubscribe from marketing emails</li>
                    <li>Disable non-essential cookies</li>
                    <li>Limit location tracking</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">6.5 Data Processing Objection</h3>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Object to certain data processing activities</li>
                    <li>Restrict specific uses of your data</li>
                  </ul>
                </div>

                <p className="text-dark_grey text-18 leading-relaxed">
                  To exercise these rights, contact us at <a href="mailto:privacy@sahoolatai.com" className="text-primary hover:underline">privacy@sahoolatai.com</a>
                </p>
              </section>

              <hr className="border-secondary" />

              {/* 7. Data Security */}
              <section id="data-security">
                <h2 className="text-midnight_text text-28 font-bold mb-4">7. Data Security</h2>
                <p className="text-dark_grey text-18 leading-relaxed mb-4">We implement industry-standard security measures:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                  <li><span className="font-semibold text-midnight_text">Encryption:</span> Data encrypted in transit (SSL/TLS) and at rest</li>
                  <li><span className="font-semibold text-midnight_text">Access Controls:</span> Strict access limitations to personal data</li>
                  <li><span className="font-semibold text-midnight_text">Regular Audits:</span> Security assessments and vulnerability testing</li>
                  <li><span className="font-semibold text-midnight_text">Secure Infrastructure:</span> Trusted cloud hosting with robust security</li>
                  <li><span className="font-semibold text-midnight_text">Employee Training:</span> Staff trained on data protection practices</li>
                </ul>
                <p className="text-dark_grey text-18 leading-relaxed">
                  However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <hr className="border-secondary" />

              {/* 8. International Data Transfers */}
              <section id="international-transfers">
                <h2 className="text-midnight_text text-28 font-bold mb-4">8. International Data Transfers</h2>
                <p className="text-dark_grey text-18 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers in compliance with applicable laws.
                </p>
              </section>

              <hr className="border-secondary" />

              {/* 9. Children's Privacy */}
              <section id="children">
                <h2 className="text-midnight_text text-28 font-bold mb-4">9. Children&apos;s Privacy</h2>
                <p className="text-dark_grey text-18 leading-relaxed">
                  Sahoolat AI is not intended for users under 18 years of age. We do not knowingly collect information from children. If you believe we have inadvertently collected such information, please contact us immediately.
                </p>
              </section>

              <hr className="border-secondary" />

              {/* 10. Third-Party Links and Services */}
              <section id="third-party">
                <h2 className="text-midnight_text text-28 font-bold mb-4">10. Third-Party Links and Services</h2>
                <p className="text-dark_grey text-18 leading-relaxed">
                  Our platform may contain links to third-party websites or integrate third-party services. We are not responsible for the privacy practices of these third parties. Please review their privacy policies.
                </p>
              </section>

              <hr className="border-secondary" />

              {/* 11. Cookies and Tracking Technologies */}
              <section id="cookies">
                <h2 className="text-midnight_text text-28 font-bold mb-6">11. Cookies and Tracking Technologies</h2>
                
                <h3 className="text-primary text-21 font-semibold mb-3">Types of Cookies We Use:</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                  <li><span className="font-semibold text-midnight_text">Essential Cookies:</span> Required for platform functionality</li>
                  <li><span className="font-semibold text-midnight_text">Analytics Cookies:</span> Help us understand usage patterns</li>
                  <li><span className="font-semibold text-midnight_text">Advertising Cookies:</span> Deliver relevant advertisements</li>
                  <li><span className="font-semibold text-midnight_text">Preference Cookies:</span> Remember your settings</li>
                </ul>
                <p className="text-dark_grey text-18 leading-relaxed">
                  You can control cookies through your browser settings. Disabling cookies may affect platform functionality.
                </p>
              </section>

              <hr className="border-secondary" />

              {/* 12. Changes to Privacy Policy */}
              <section id="changes">
                <h2 className="text-midnight_text text-28 font-bold mb-4">12. Changes to Privacy Policy</h2>
                <p className="text-dark_grey text-18 leading-relaxed mb-4">
                  We may update this Privacy Policy periodically. We will notify you of significant changes through:
                </p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                  <li>Contact information notification to registered users</li>
                  <li>Prominent notice on our platform</li>
                  <li>Updated &quot;Last Updated&quot; date</li>
                </ul>
                <p className="text-dark_grey text-18 leading-relaxed">
                  Continued use of the platform after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <hr className="border-secondary" />

              {/* 13. Contact Information */}
              <section id="contact">
                <h2 className="text-midnight_text text-28 font-bold mb-4">13. Contact Information</h2>
                <p className="text-dark_grey text-18 leading-relaxed mb-4">For privacy-related questions, concerns, or requests:</p>
                <div className="bg-secondary/30 rounded-lg p-6">
                  <p className="text-midnight_text text-18 font-bold mb-2">Sahoolat AI Privacy Team</p>
                  <p className="text-dark_grey text-18 mb-1"><span className="font-semibold text-midnight_text">Email:</span> <a href="mailto:privacy@sahoolatai.com" className="text-primary hover:underline">privacy@sahoolatai.com</a></p>
                  <p className="text-dark_grey text-18 mb-1"><span className="font-semibold text-midnight_text">Website:</span> <a href="https://sahoolatai.com" className="text-primary hover:underline">sahoolatai.com</a></p>
                  <p className="text-dark_grey text-18 mb-1"><span className="font-semibold text-midnight_text">Address:</span> Soan Garden Block B (46000), Islamabad (Capital Territory) of Pakistan.</p>
                  <p className="text-dark_grey text-18"><span className="font-semibold text-midnight_text">Data Protection Officer:</span> [DPO Name/Contact if required in your jurisdiction]</p>
                </div>
              </section>

              <hr className="border-secondary" />

              {/* 14. Regional Privacy Rights */}
              <section id="regional-rights">
                <h2 className="text-midnight_text text-28 font-bold mb-6">14. Regional Privacy Rights</h2>
                
                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">For EU/EEA Users (GDPR)</h3>
                  <p className="text-dark_grey text-18 leading-relaxed mb-2">You have additional rights under the General Data Protection Regulation:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                    <li>Right to data portability</li>
                    <li>Right to lodge complaints with supervisory authorities</li>
                    <li>Right to withdraw consent at any time</li>
                  </ul>
                  <p className="text-midnight_text text-18 font-semibold mb-2">Legal Basis for Processing:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Contractual necessity (to provide services)</li>
                    <li>Legitimate interests (platform improvement)</li>
                    <li>Legal compliance</li>
                    <li>Your consent (for marketing and optional features)</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-primary text-21 font-semibold mb-3">For California Users (CCPA)</h3>
                  <p className="text-dark_grey text-18 leading-relaxed mb-2">Under the California Consumer Privacy Act, you have the right to:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                    <li>Know what personal information is collected</li>
                    <li>Know if personal information is sold or disclosed</li>
                    <li>Opt-out of the sale of personal information</li>
                    <li>Access your personal information</li>
                    <li>Request deletion of personal information</li>
                    <li>Non-discrimination for exercising your rights</li>
                  </ul>
                  <p className="text-primary text-18 font-semibold">We do not sell your personal information.</p>
                </div>

                <div>
                  <h3 className="text-primary text-21 font-semibold mb-3">For Pakistan Users</h3>
                  <p className="text-dark_grey text-18 leading-relaxed">
                    We comply with applicable Pakistani data protection laws and regulations, including any sector-specific requirements.
                  </p>
                </div>
              </section>

              <hr className="border-secondary" />

              {/* 15. Consent */}
              <section id="consent">
                <h2 className="text-midnight_text text-28 font-bold mb-4">15. Consent</h2>
                <p className="text-dark_grey text-18 leading-relaxed mb-4">By using Sahoolat AI, you consent to:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                  <li>Collection and use of your information as described</li>
                  <li>Processing of your data by our AI systems</li>
                  <li>Sharing of your information with service providers and sellers as necessary for platform operations</li>
                  <li>Use of cookies and tracking technologies</li>
                </ul>
                <p className="text-dark_grey text-18 leading-relaxed">
                  You may withdraw consent at any time by discontinuing use of the platform or contacting us to delete your account.
                </p>
              </section>

              <hr className="border-secondary" />

              {/* Closing */}
              <div className="bg-primary/10 rounded-lg p-6 text-center">
                <p className="text-midnight_text text-18 font-semibold">
                  Thank you for trusting Sahoolat AI with your information. We are committed to protecting your privacy while delivering innovative AI-powered services.
                </p>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPage;
