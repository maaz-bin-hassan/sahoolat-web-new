"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const TermsPage = () => {
  return (
    <section className="pt-40 pb-20 bg-background min-h-screen">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-midnight_text text-54 font-bold mb-4">
            Terms & <span className="text-primary">Conditions</span>
          </h1>
          <p className="text-dark_grey text-18 mb-2">Sahoolat AI</p>
          <p className="text-dark_grey text-16 mb-2">Website: <Link href="https://sahoolatai.com" className="text-primary hover:underline">sahoolatai.com</Link></p>
          <p className="text-dark_grey text-16 mb-8">Last Updated: November 29, 2025</p>

          {/* Table of Contents */}
          <div className="bg-white rounded-2xl p-8 shadow-card border-2 border-secondary mb-8">
            <h2 className="text-midnight_text text-28 font-bold mb-6">Table of Contents</h2>
            <nav className="space-y-2 text-primary">
              <p><a href="#agreement" className="hover:underline">1. Agreement to Terms</a></p>
              <p><a href="#definitions" className="hover:underline">2. Definitions</a></p>
              <p><a href="#eligibility" className="hover:underline">3. Eligibility</a></p>
              <p><a href="#account" className="hover:underline">4. Account Registration and Security</a></p>
              <p><a href="#services" className="hover:underline">5. Platform Services</a></p>
              <p><a href="#conduct" className="hover:underline">6. User Obligations and Conduct</a></p>
              <p><a href="#payments" className="hover:underline">7. Transactions and Payments</a></p>
              <p><a href="#ratings" className="hover:underline">8. Ratings and Reviews</a></p>
              <p><a href="#ai-services" className="hover:underline">9. AI Services and Limitations</a></p>
              <p><a href="#location" className="hover:underline">10. Location Services</a></p>
              <p><a href="#ip" className="hover:underline">11. Intellectual Property Rights</a></p>
              <p><a href="#third-party" className="hover:underline">12. Third-Party Services</a></p>
              <p><a href="#privacy" className="hover:underline">13. Privacy and Data Protection</a></p>
              <p><a href="#disclaimers" className="hover:underline">14. Disclaimers and Limitations of Liability</a></p>
              <p><a href="#indemnification" className="hover:underline">15. Indemnification</a></p>
              <p><a href="#disputes" className="hover:underline">16. Dispute Resolution</a></p>
              <p><a href="#modifications" className="hover:underline">17. Modifications to Terms</a></p>
              <p><a href="#termination" className="hover:underline">18. Termination</a></p>
              <p><a href="#general" className="hover:underline">19. General Provisions</a></p>
              <p><a href="#contact" className="hover:underline">20. Contact Information</a></p>
              <p><a href="#acknowledgment" className="hover:underline">21. Acknowledgment</a></p>
            </nav>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl p-8 shadow-card border-2 border-secondary space-y-8">
            
            {/* 1. Agreement to Terms */}
            <section id="agreement">
              <h2 className="text-midnight_text text-28 font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-dark_grey text-18 leading-relaxed mb-4">
                Welcome to Sahoolat AI. These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you and Sahoolat AI (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use of the Sahoolat AI platform, including our website (sahoolatai.com), mobile applications, and all related services (collectively, the &quot;Platform&quot;).
              </p>
              <p className="text-dark_grey text-18 leading-relaxed">
                By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Platform.
              </p>
            </section>

            <hr className="border-secondary" />

            {/* 2. Definitions */}
            <section id="definitions">
              <h2 className="text-midnight_text text-28 font-bold mb-4">2. Definitions</h2>
              <ul className="space-y-3 text-dark_grey text-18 leading-relaxed">
                <li><span className="font-semibold text-midnight_text">&quot;User&quot;</span> refers to any person who accesses or uses the Platform, including Clients and Service Providers.</li>
                <li><span className="font-semibold text-midnight_text">&quot;Client&quot;</span> refers to users who post job requests or shopping lists seeking services or products.</li>
                <li><span className="font-semibold text-midnight_text">&quot;Service Provider&quot;</span> refers to users who offer services, expertise, or products and submit bids in response to Client requests.</li>
                <li><span className="font-semibold text-midnight_text">&quot;Job&quot;</span> refers to any service request or shopping list posted by a Client through our AI chatbot.</li>
                <li><span className="font-semibold text-midnight_text">&quot;Bid&quot;</span> refers to a proposal submitted by a Service Provider in response to a Job.</li>
                <li><span className="font-semibold text-midnight_text">&quot;Transaction&quot;</span> refers to any agreement reached between a Client and Service Provider through the Platform.</li>
              </ul>
            </section>

            <hr className="border-secondary" />

            {/* 3. Eligibility */}
            <section id="eligibility">
              <h2 className="text-midnight_text text-28 font-bold mb-6">3. Eligibility</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">3.1 Age Requirement</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  You must be at least 18 years old to use the Platform. By using the Platform, you represent and warrant that you are at least 18 years of age.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">3.2 Legal Capacity</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  You represent that you have the legal capacity to enter into these Terms and comply with all applicable laws in your jurisdiction.
                </p>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">3.3 Business Users</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  Service Providers must possess all necessary licenses, permits, and qualifications required to offer their services legally in their jurisdiction.
                </p>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 4. Account Registration and Security */}
            <section id="account">
              <h2 className="text-midnight_text text-28 font-bold mb-6">4. Account Registration and Security</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">4.1 Account Creation</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">To use certain features of the Platform, you must create an account by providing:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Accurate and complete registration information</li>
                  <li>Valid contact number</li>
                  <li>For Service Providers: business details, qualifications, and relevant documentation</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">4.2 Account Responsibilities</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">You are responsible for:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                  <li>Ensuring your account information remains accurate and up-to-date</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">4.3 Account Termination</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">We reserve the right to suspend or terminate your account if:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>You violate these Terms</li>
                  <li>You engage in fraudulent or illegal activities</li>
                  <li>You provide false or misleading information</li>
                  <li>Your account remains inactive for an extended period</li>
                  <li>Required by law or regulatory authorities</li>
                </ul>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 5. Platform Services */}
            <section id="services">
              <h2 className="text-midnight_text text-28 font-bold mb-6">5. Platform Services</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">5.1 AI-Powered Job Posting</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">Clients can:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Interact with our AI chatbot to describe service needs or create shopping lists</li>
                  <li>Post Jobs automatically generated by our AI based on conversations</li>
                  <li>Specify location, budget, timeline, and other requirements</li>
                  <li>Receive and review Bids from nearby Service Providers</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">5.2 AI-Powered Shopping Lists</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">Clients can:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Create shopping lists through AI conversation</li>
                  <li>Receive bids from nearby stores and shops</li>
                  <li>Compare prices and offerings</li>
                  <li>Select preferred sellers based on ratings, prices, and proximity</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">5.3 Bidding System</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">Service Providers can:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Browse available Jobs in their service category and location</li>
                  <li>Submit Bids with pricing, timeline, and service details</li>
                  <li>Communicate with Clients through the Platform</li>
                  <li>Receive acceptance or rejection notifications</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">5.4 Matching and Recommendations</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">Our AI system provides:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Intelligent matching between Clients and Service Providers</li>
                  <li>Location-based recommendations</li>
                  <li>Quality scoring based on ratings and reviews</li>
                  <li>Personalized suggestions</li>
                </ul>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 6. User Obligations and Conduct */}
            <section id="conduct">
              <h2 className="text-midnight_text text-28 font-bold mb-6">6. User Obligations and Conduct</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">6.1 Prohibited Activities</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-4">You agree NOT to:</p>
                
                <p className="text-midnight_text text-18 font-semibold mb-2">General Prohibitions:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit viruses, malware, or harmful code</li>
                  <li>Attempt to gain unauthorized access to the Platform</li>
                  <li>Use automated systems (bots, scrapers) without permission</li>
                  <li>Impersonate others or misrepresent your identity</li>
                </ul>

                <p className="text-midnight_text text-18 font-semibold mb-2">For Clients:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                  <li>Post false, misleading, or fraudulent Jobs</li>
                  <li>Refuse payment for completed services without valid reason</li>
                  <li>Harass or abuse Service Providers</li>
                  <li>Use the Platform to obtain free quotes without intent to hire</li>
                </ul>

                <p className="text-midnight_text text-18 font-semibold mb-2">For Service Providers:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Submit bids for services you cannot legally or competently provide</li>
                  <li>Misrepresent qualifications, pricing, or capabilities</li>
                  <li>Contact Clients outside the Platform to avoid fees</li>
                  <li>Discriminate based on race, religion, gender, or other protected characteristics</li>
                  <li>Abandon accepted Jobs without valid justification</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">6.2 Content Standards</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">All content you post must:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Be accurate and truthful</li>
                  <li>Comply with applicable laws</li>
                  <li>Not contain offensive, abusive, or discriminatory language</li>
                  <li>Not include spam, advertising, or promotional content (except in Bids)</li>
                  <li>Respect the privacy and rights of others</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">6.3 Quality Standards</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">Service Providers must:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Deliver services professionally and competently</li>
                  <li>Meet agreed-upon timelines and specifications</li>
                  <li>Maintain appropriate licenses and insurance</li>
                  <li>Respond to Client communications promptly</li>
                  <li>Honor pricing and terms in accepted Bids</li>
                </ul>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 7. Transactions and Payments */}
            <section id="payments">
              <h2 className="text-midnight_text text-28 font-bold mb-6">7. Transactions and Payments</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">7.1 Platform Role</h3>
                <div className="bg-orange/10 rounded-lg p-4">
                  <p className="text-midnight_text text-18 font-semibold">
                    Important: Sahoolat AI is a platform that facilitates connections between Clients and Service Providers. We are NOT a party to transactions between users and do NOT provide the services or products listed on the Platform.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">7.2 Payment Processing</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Payments are processed through our or not our secure third-party payment processors</li>
                  <li>Service Providers receive payment after successful service completion and Client approval with or without our platform</li>
                  <li>Payment methods may include credit/debit cards, bank transfers, mobile wallets, and other options</li>
                  <li>All payments are subject to applicable fees</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">7.3 Platform Fees</h3>
                
                <p className="text-midnight_text text-18 font-semibold mb-3">Service Fee Structure:</p>
                
                <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                  <p className="text-midnight_text text-18 font-semibold mb-2">For Clients:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li>Posting Jobs and shopping lists is <span className="text-primary font-bold">FREE</span></li>
                    <li>No charges for browsing, receiving bids, or communicating with Service Providers</li>
                    <li>Clients pay only the agreed price to the Service Provider</li>
                  </ul>
                </div>

                <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                  <p className="text-midnight_text text-18 font-semibold mb-2">For Service Providers:</p>
                  <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                    <li><span className="font-semibold">Expert Services:</span> 10% commission on completed transactions for all expert hiring and professional service jobs</li>
                    <li><span className="font-semibold">Shopping/E-commerce:</span> 2% commission on completed shopping-related transactions and product sales</li>
                    <li>Commission is calculated on the total transaction amount or bid amount</li>
                    <li>Payment processing fees (typically 2-3%) may apply depending on the payment method used</li>
                  </ul>
                </div>

                <p className="text-midnight_text text-18 font-semibold mb-2">Commission Deduction:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                  <li>Platform fees are automatically deducted from the Service Provider&apos;s wallet from already top up amount when a bid is accepted by client</li>
                  <li>The Service Provider receives the net amount after commission and any applicable payment processing fees are deducted</li>
                  <li><span className="font-semibold">Example:</span> For a PKR 10,000 expert service job, the Service Provider receives PKR 9,000 (after 10% commission), minus any payment processing fees</li>
                </ul>

                <p className="text-midnight_text text-18 font-semibold mb-2">Fee Transparency:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1 mb-4">
                  <li>All applicable fees are clearly displayed to Service Providers before submitting bids</li>
                  <li>Service Providers can view their net earnings estimate in real-time</li>
                  <li>Detailed fee breakdowns are provided in transaction receipts and account statements</li>
                </ul>

                <p className="text-midnight_text text-18 font-semibold mb-2">Fee Updates:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>We reserve the right to modify fee structures with 30 days advance notice</li>
                  <li>Changes will be communicated via SMS/email and platform notifications</li>
                  <li>Continued use of the Platform after fee changes constitutes acceptance</li>
                  <li>Active bids and ongoing transactions will honor the fee structure in place at the time of bid acceptance</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">7.4 Refunds and Disputes</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Refund eligibility depends on service completion and satisfaction</li>
                  <li>Disputes must be reported within 7 days of service completion</li>
                  <li>We provide mediation services but final resolution is between parties</li>
                  <li>Our decision in disputes is final and binding</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">7.5 Taxes</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  Users are responsible for all applicable taxes on their transactions. Service Providers must comply with tax reporting requirements in their jurisdiction.
                </p>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 8. Ratings and Reviews */}
            <section id="ratings">
              <h2 className="text-midnight_text text-28 font-bold mb-6">8. Ratings and Reviews</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">8.1 Review System</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Clients and Service Providers can rate and review each other</li>
                  <li>Reviews must be honest, fair, and based on actual experiences</li>
                  <li>Reviews cannot contain offensive, defamatory, or inappropriate content</li>
                  <li>We reserve the right to remove reviews that violate our policies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">8.2 Review Impact</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Ratings affect visibility and ranking in search results</li>
                  <li>Consistently poor ratings may result in account suspension</li>
                  <li>Fake or manipulated reviews will result in account termination</li>
                </ul>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 9. AI Services and Limitations */}
            <section id="ai-services">
              <h2 className="text-midnight_text text-28 font-bold mb-6">9. AI Services and Limitations</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">9.1 AI Assistance</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">Our AI chatbot:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Helps create Job postings and shopping lists</li>
                  <li>Provides matching recommendations</li>
                  <li>Offers conversational support</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">9.2 AI Limitations</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">You acknowledge that:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>AI suggestions are not guaranteed to be accurate or complete</li>
                  <li>Final decisions regarding Jobs and Bids are your responsibility</li>
                  <li>AI matches are recommendations, not endorsements</li>
                  <li>We are not liable for AI errors or misunderstandings</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">9.3 Human Responsibility</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">Users remain fully responsible for:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Verifying Service Provider qualifications</li>
                  <li>Negotiating terms and conditions</li>
                  <li>Ensuring service quality and satisfaction</li>
                  <li>Complying with all applicable laws</li>
                </ul>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 10. Location Services */}
            <section id="location">
              <h2 className="text-midnight_text text-28 font-bold mb-6">10. Location Services</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">10.1 Location Data</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">By using location-based features, you consent to:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Collection and use of your location data</li>
                  <li>Sharing approximate location with nearby Service Providers</li>
                  <li>Location-based matching and recommendations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">10.2 Location Accuracy</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  We strive for accurate location services but cannot guarantee precision. You are responsible for verifying actual distances and locations.
                </p>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 11. Intellectual Property Rights */}
            <section id="ip">
              <h2 className="text-midnight_text text-28 font-bold mb-6">11. Intellectual Property Rights</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">11.1 Platform Ownership</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  All content, features, and functionality of the Platform are owned by NovaSync Dynamics Private Limited (Parent company of Sahoolat AI Product) and protected by copyright, trademark, and other intellectual property laws.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">11.2 Limited License</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  We grant you a limited, non-exclusive, non-transferable license to access and use the Platform for its intended purposes.
                </p>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">11.3 User Content</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  You retain ownership of content you submit but grant us a license to use, display, and process it as necessary to operate the Platform. See our Copyright Notice for details.
                </p>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 12. Third-Party Services */}
            <section id="third-party">
              <h2 className="text-midnight_text text-28 font-bold mb-6">12. Third-Party Services</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">12.1 External Links</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  The Platform may contain links to third-party websites or services. We are not responsible for their content, policies, or practices.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">12.2 Payment Processors</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  Third-party payment processors have their own terms and privacy policies. Your use of payment services is subject to their terms.
                </p>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">12.3 No Endorsement</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  Links to or integration with third-party services do not constitute endorsement.
                </p>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 13. Privacy and Data Protection */}
            <section id="privacy">
              <h2 className="text-midnight_text text-28 font-bold mb-4">13. Privacy and Data Protection</h2>
              <p className="text-dark_grey text-18 leading-relaxed">
                Your privacy is important to us. Our collection and use of personal information is governed by our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference. Please review our Privacy Policy at sahoolatai.com/privacy.
              </p>
            </section>

            <hr className="border-secondary" />

            {/* 14. Disclaimers and Limitations of Liability */}
            <section id="disclaimers">
              <h2 className="text-midnight_text text-28 font-bold mb-6">14. Disclaimers and Limitations of Liability</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">14.1 Platform &quot;As Is&quot;</h3>
                <div className="bg-secondary/30 rounded-lg p-4">
                  <p className="text-midnight_text text-18 uppercase">
                    THE PLATFORM IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">14.2 No Guarantee of Results</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">We do not guarantee:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Availability, accuracy, or reliability of the Platform</li>
                  <li>Quality, safety, or legality of Services or products offered by Service Providers</li>
                  <li>Accuracy of Job postings or Bids</li>
                  <li>Successful transactions or satisfactory outcomes</li>
                  <li>Continuous, uninterrupted, or error-free operation</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">14.3 Service Provider Verification</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">While we may verify certain information, we do NOT:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Guarantee Service Provider qualifications or credentials</li>
                  <li>Conduct comprehensive background checks</li>
                  <li>Endorse or recommend specific Service Providers</li>
                  <li>Assume responsibility for Service Provider actions</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">14.4 User Responsibility</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">You are solely responsible for:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Evaluating Service Providers before engaging them</li>
                  <li>Verifying qualifications, licenses, and insurance</li>
                  <li>Negotiating and enforcing agreements</li>
                  <li>Your interactions with other users</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">14.5 Limitation of Liability</h3>
                <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                  <p className="text-midnight_text text-18 uppercase mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, SAHOOLAT AI, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR:
                  </p>
                  <ul className="list-disc ml-6 text-midnight_text text-18 space-y-1">
                    <li>Indirect, incidental, special, consequential, or punitive damages</li>
                    <li>Loss of profits, revenue, data, or business opportunities</li>
                    <li>Service interruptions or data loss</li>
                    <li>Actions or omissions of Service Providers or Clients</li>
                    <li>Disputes between users</li>
                    <li>Unauthorized access to your account or data</li>
                  </ul>
                </div>
                <p className="text-midnight_text text-18 font-semibold">
                  OUR TOTAL LIABILITY SHALL NOT EXCEED THE FEES YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM, OR PKR 10,000, WHICHEVER IS LESS.
                </p>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 15. Indemnification */}
            <section id="indemnification">
              <h2 className="text-midnight_text text-28 font-bold mb-4">15. Indemnification</h2>
              <p className="text-dark_grey text-18 leading-relaxed mb-4">
                You agree to indemnify, defend, and hold harmless Sahoolat AI, its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys&apos; fees) arising from:
              </p>
              <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                <li>Your use or misuse of the Platform</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Your content or conduct on the Platform</li>
                <li>Services provided or received through the Platform</li>
                <li>Disputes with other users</li>
              </ul>
            </section>

            <hr className="border-secondary" />

            {/* 16. Dispute Resolution */}
            <section id="disputes">
              <h2 className="text-midnight_text text-28 font-bold mb-6">16. Dispute Resolution</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">16.1 Informal Resolution</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  Before initiating formal proceedings, you agree to contact us at <a href="mailto:support@sahoolatai.com" className="text-primary hover:underline">support@sahoolatai.com</a> to resolve disputes informally.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">16.2 Governing Law</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  These Terms are governed by the laws of Pakistan, without regard to conflict of law principles.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">16.3 Jurisdiction</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  Any disputes shall be subject to the exclusive jurisdiction of the courts located in Islamabad, Pakistan.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">16.4 Arbitration (Optional)</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  Disputes may be resolved through binding arbitration in accordance with Pakistani Arbitration Act or specific arbitration rules. Arbitration decisions are final and binding.
                </p>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">16.5 Class Action Waiver</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  You agree to resolve disputes individually and waive any right to participate in class actions or representative proceedings.
                </p>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 17. Modifications to Terms */}
            <section id="modifications">
              <h2 className="text-midnight_text text-28 font-bold mb-6">17. Modifications to Terms</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">17.1 Right to Modify</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Platform.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">17.2 Notification</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">We will notify you of material changes through:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Email notification to registered users</li>
                  <li>Prominent notice on the Platform</li>
                  <li>Updated &quot;Last Updated&quot; date</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">17.3 Continued Use</h3>
                <p className="text-dark_grey text-18 leading-relaxed">
                  Your continued use of the Platform after changes constitutes acceptance of the modified Terms. If you do not agree with changes, you must stop using the Platform.
                </p>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 18. Termination */}
            <section id="termination">
              <h2 className="text-midnight_text text-28 font-bold mb-6">18. Termination</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">18.1 Termination by You</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">You may terminate your account at any time by:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Using account deletion features in your settings</li>
                  <li>Contacting us at <a href="mailto:support@sahoolatai.com" className="text-primary hover:underline">support@sahoolatai.com</a></li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">18.2 Termination by Us</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">We may suspend or terminate your account immediately without notice if:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>You violate these Terms</li>
                  <li>You engage in fraudulent or illegal activity</li>
                  <li>Your account poses security or legal risks</li>
                  <li>Required by law or regulatory authorities</li>
                  <li>You have been inactive for an extended period</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">18.3 Effect of Termination</h3>
                <p className="text-dark_grey text-18 leading-relaxed mb-2">Upon termination:</p>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-1">
                  <li>Your right to access the Platform ceases immediately</li>
                  <li>Outstanding obligations (payments, disputes) survive termination</li>
                  <li>We may retain certain information as required by law or policy</li>
                  <li>Provisions regarding liability, indemnification, and disputes survive termination</li>
                </ul>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 19. General Provisions */}
            <section id="general">
              <h2 className="text-midnight_text text-28 font-bold mb-6">19. General Provisions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-primary text-21 font-semibold mb-2">19.1 Entire Agreement</h3>
                  <p className="text-dark_grey text-18 leading-relaxed">
                    These Terms, along with our Privacy Policy and Copyright Notice, constitute the entire agreement between you and Sahoolat AI.
                  </p>
                </div>

                <div>
                  <h3 className="text-primary text-21 font-semibold mb-2">19.2 Severability</h3>
                  <p className="text-dark_grey text-18 leading-relaxed">
                    If any provision is found unenforceable, the remaining provisions remain in full effect.
                  </p>
                </div>

                <div>
                  <h3 className="text-primary text-21 font-semibold mb-2">19.3 No Waiver</h3>
                  <p className="text-dark_grey text-18 leading-relaxed">
                    Our failure to enforce any provision does not constitute a waiver of that provision.
                  </p>
                </div>

                <div>
                  <h3 className="text-primary text-21 font-semibold mb-2">19.4 Assignment</h3>
                  <p className="text-dark_grey text-18 leading-relaxed">
                    You may not assign these Terms without our written consent. We may assign these Terms to any affiliate or successor.
                  </p>
                </div>

                <div>
                  <h3 className="text-primary text-21 font-semibold mb-2">19.5 Force Majeure</h3>
                  <p className="text-dark_grey text-18 leading-relaxed">
                    We are not liable for delays or failures due to circumstances beyond our reasonable control (natural disasters, war, terrorism, pandemics, government actions, etc.).
                  </p>
                </div>

                <div>
                  <h3 className="text-primary text-21 font-semibold mb-2">19.6 Notices</h3>
                  <p className="text-dark_grey text-18 leading-relaxed">
                    Notices to you may be sent via email or posted on the Platform. Notices to us should be sent to <a href="mailto:legal@sahoolatai.com" className="text-primary hover:underline">legal@sahoolatai.com</a>.
                  </p>
                </div>

                <div>
                  <h3 className="text-primary text-21 font-semibold mb-2">19.7 Language</h3>
                  <p className="text-dark_grey text-18 leading-relaxed">
                    These Terms are provided in English. Translations are for convenience only. In case of conflicts, the English version prevails.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 20. Contact Information */}
            <section id="contact">
              <h2 className="text-midnight_text text-28 font-bold mb-4">20. Contact Information</h2>
              <p className="text-dark_grey text-18 leading-relaxed mb-4">For questions, concerns, or support regarding these Terms:</p>
              <div className="bg-secondary/30 rounded-lg p-6">
                <p className="text-midnight_text text-18 font-bold mb-2">Sahoolat AI</p>
                <p className="text-dark_grey text-18 mb-1"><span className="font-semibold text-midnight_text">Email:</span> <a href="mailto:support@sahoolatai.com" className="text-primary hover:underline">support@sahoolatai.com</a></p>
                <p className="text-dark_grey text-18 mb-1"><span className="font-semibold text-midnight_text">Legal:</span> <a href="mailto:legal@sahoolatai.com" className="text-primary hover:underline">legal@sahoolatai.com</a></p>
                <p className="text-dark_grey text-18 mb-1"><span className="font-semibold text-midnight_text">Website:</span> <a href="https://sahoolatai.com" className="text-primary hover:underline">sahoolatai.com</a></p>
                <p className="text-dark_grey text-18 mb-1"><span className="font-semibold text-midnight_text">Address:</span> Soan Garden Block B, Islamabad Pakistan</p>
                <p className="text-dark_grey text-18"><span className="font-semibold text-midnight_text">Phone:</span> 051 5224568</p>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 21. Acknowledgment */}
            <section id="acknowledgment">
              <h2 className="text-midnight_text text-28 font-bold mb-4">21. Acknowledgment</h2>
              <div className="bg-primary/10 rounded-lg p-6">
                <p className="text-midnight_text text-18 font-semibold uppercase">
                  BY USING THE PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS.
                </p>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* Closing */}
            <div className="bg-primary/10 rounded-lg p-6 text-center">
              <p className="text-midnight_text text-18 font-semibold">
                Thank you for choosing Sahoolat AI. We are committed to providing a safe, efficient, and innovative platform for connecting clients with service providers and sellers.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsPage;
