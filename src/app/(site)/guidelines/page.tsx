"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const GuidelinesPage = () => {
  return (
    <section className="pt-40 pb-20 bg-background min-h-screen">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-midnight_text text-54 font-bold mb-4">
            User <span className="text-primary">Guidelines</span>
          </h1>
          <p className="text-dark_grey text-18 mb-2">Sahoolat AI - Safe & Trusted Platform</p>
          <p className="text-dark_grey text-16 mb-2">Website: <Link href="https://sahoolatai.com" className="text-primary hover:underline">sahoolatai.com</Link></p>
          <p className="text-dark_grey text-16 mb-8">Last Updated: November 29, 2025</p>

          {/* Table of Contents */}
          <div className="bg-white rounded-2xl p-8 shadow-card border-2 border-secondary mb-8">
            <h2 className="text-midnight_text text-28 font-bold mb-6">Table of Contents</h2>
            <nav className="space-y-2 text-primary">
              <p><a href="#introduction" className="hover:underline">Introduction</a></p>
              <p><a href="#community-standards" className="hover:underline">1. Community Standards</a></p>
              <p><a href="#client-guidelines" className="hover:underline">2. Guidelines for Clients</a></p>
              <p><a href="#provider-guidelines" className="hover:underline">3. Guidelines for Service Providers</a></p>
              <p><a href="#communication" className="hover:underline">4. Communication Guidelines</a></p>
              <p><a href="#safety" className="hover:underline">5. Safety & Security</a></p>
              <p><a href="#payments" className="hover:underline">6. Payment Guidelines</a></p>
              <p><a href="#reviews" className="hover:underline">7. Reviews & Ratings</a></p>
              <p><a href="#prohibited" className="hover:underline">8. Prohibited Activities</a></p>
              <p><a href="#reporting" className="hover:underline">9. Reporting Violations</a></p>
              <p><a href="#consequences" className="hover:underline">10. Consequences of Violations</a></p>
              <p><a href="#trust-safety" className="hover:underline">11. Trust & Safety Measures</a></p>
              <p><a href="#contact" className="hover:underline">12. Contact Information</a></p>
            </nav>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl p-8 shadow-card border-2 border-secondary space-y-8">
            
            {/* Introduction */}
            <section id="introduction">
              <h2 className="text-midnight_text text-28 font-bold mb-4">Introduction</h2>
              <p className="text-dark_grey text-18 leading-relaxed mb-4">
                Welcome to Sahoolat AI! Our platform connects clients with trusted service providers through AI-powered voice search technology. These User Guidelines are designed to create a safe, respectful, and productive environment for everyone.
              </p>
              <p className="text-dark_grey text-18 leading-relaxed">
                By using Sahoolat AI, you agree to follow these guidelines. They apply to all interactions on our platform, including job postings, bids, communications, and transactions.
              </p>
            </section>

            <hr className="border-secondary" />

            {/* 1. Community Standards */}
            <section id="community-standards">
              <h2 className="text-midnight_text text-28 font-bold mb-6">1. Community Standards</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">1.1 Respect & Professionalism</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Treat all users with respect, courtesy, and professionalism</li>
                  <li>Use appropriate language in all communications</li>
                  <li>Be patient and understanding with other users</li>
                  <li>Value diversity and avoid discriminatory behavior</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">1.2 Honesty & Transparency</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Provide accurate information in your profile and communications</li>
                  <li>Be truthful about your qualifications, skills, and experience</li>
                  <li>Clearly communicate pricing, timelines, and expectations</li>
                  <li>Disclose any potential conflicts of interest</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">1.3 Accountability</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Honor your commitments and agreements</li>
                  <li>Communicate promptly if issues arise</li>
                  <li>Take responsibility for your actions on the platform</li>
                  <li>Resolve disputes in good faith</li>
                </ul>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 2. Guidelines for Clients */}
            <section id="client-guidelines">
              <h2 className="text-midnight_text text-28 font-bold mb-6">2. Guidelines for Clients</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">2.1 Creating Job Posts</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Provide clear, detailed descriptions of your service needs</li>
                  <li>Set realistic budgets and timelines</li>
                  <li>Include all relevant information (location, special requirements, etc.)</li>
                  <li>Respond to clarifying questions from service providers</li>
                  <li>Update or close job posts that are no longer needed</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">2.2 Evaluating Bids</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Review bids carefully before making a decision</li>
                  <li>Consider provider ratings, reviews, and qualifications</li>
                  <li>Ask questions to ensure the provider understands your needs</li>
                  <li>Don&apos;t select providers based solely on the lowest price</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">2.3 Working with Providers</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Communicate clearly about expectations and requirements</li>
                  <li>Provide necessary access, materials, or information</li>
                  <li>Be available for questions during the service</li>
                  <li>Pay promptly upon satisfactory completion</li>
                  <li>Provide honest feedback through reviews</li>
                </ul>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 3. Guidelines for Service Providers */}
            <section id="provider-guidelines">
              <h2 className="text-midnight_text text-28 font-bold mb-6">3. Guidelines for Service Providers</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">3.1 Profile & Qualifications</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Create a complete, accurate profile with relevant experience</li>
                  <li>Upload valid certifications, licenses, and credentials</li>
                  <li>Keep your profile and availability status updated</li>
                  <li>Use a professional profile photo</li>
                  <li>Highlight your specialties and areas of expertise</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">3.2 Submitting Bids</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Only bid on jobs you are qualified and able to complete</li>
                  <li>Provide accurate pricing—avoid hidden fees</li>
                  <li>Be realistic about timelines and deliverables</li>
                  <li>Personalize your bids to show you understand the job</li>
                  <li>Respond promptly to client inquiries</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">3.3 Delivering Services</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Arrive on time and prepared for the job</li>
                  <li>Maintain professional conduct at all times</li>
                  <li>Communicate proactively about progress or issues</li>
                  <li>Complete work according to agreed specifications</li>
                  <li>Clean up and leave the work area tidy</li>
                  <li>Request feedback and ratings upon completion</li>
                </ul>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 4. Communication Guidelines */}
            <section id="communication">
              <h2 className="text-midnight_text text-28 font-bold mb-6">4. Communication Guidelines</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">4.1 Platform Communication</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Use the Sahoolat AI messaging system for all job-related communication</li>
                  <li>Keep conversations professional and focused on the job</li>
                  <li>Respond to messages within 24 hours when possible</li>
                  <li>Document important agreements in writing through the platform</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">4.2 Voice & Chat Etiquette</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Speak clearly and listen actively during voice interactions</li>
                  <li>Be concise and respectful of others&apos; time</li>
                  <li>Avoid using offensive language or raising your voice</li>
                  <li>Confirm understanding by summarizing key points</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">4.3 What NOT to Share</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Personal financial information (bank details, PINs, passwords)</li>
                  <li>Government ID numbers unless required for verification</li>
                  <li>Personal contact details to circumvent the platform</li>
                  <li>Confidential information about other clients or providers</li>
                </ul>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 5. Safety & Security */}
            <section id="safety">
              <h2 className="text-midnight_text text-28 font-bold mb-6">5. Safety & Security</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">5.1 Account Security</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Use a strong, unique password for your account</li>
                  <li>Enable two-factor authentication if available</li>
                  <li>Never share your login credentials with anyone</li>
                  <li>Log out from shared or public devices</li>
                  <li>Report any suspicious account activity immediately</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">5.2 Physical Safety</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Meet in safe, public locations when possible</li>
                  <li>Inform someone you trust about your appointments</li>
                  <li>Trust your instincts—cancel if something feels wrong</li>
                  <li>Verify the identity of service providers before allowing entry to your home</li>
                  <li>Keep emergency contacts accessible</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">5.3 Fraud Prevention</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Be wary of deals that seem too good to be true</li>
                  <li>Never pay outside the Sahoolat AI platform</li>
                  <li>Don&apos;t click on suspicious links or download unknown files</li>
                  <li>Verify provider credentials and reviews before hiring</li>
                  <li>Report any suspected fraud immediately</li>
                </ul>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 6. Payment Guidelines */}
            <section id="payments">
              <h2 className="text-midnight_text text-28 font-bold mb-6">6. Payment Guidelines</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">6.1 For Clients</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Review pricing carefully before accepting a bid</li>
                  <li>Agree on payment terms before work begins</li>
                  <li>Pay through the Sahoolat AI platform for protection</li>
                  <li>Release payment promptly upon satisfactory completion</li>
                  <li>Dispute charges through proper channels if issues arise</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">6.2 For Service Providers</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Be transparent about all costs upfront</li>
                  <li>Get written approval before any additional charges</li>
                  <li>Issue receipts for completed work</li>
                  <li>Understand and comply with platform fee structures</li>
                  <li>Report payment issues through official support channels</li>
                </ul>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 7. Reviews & Ratings */}
            <section id="reviews">
              <h2 className="text-midnight_text text-28 font-bold mb-6">7. Reviews & Ratings</h2>
              
              <div className="mb-6">
                <h3 className="text-primary text-21 font-semibold mb-3">7.1 Leaving Reviews</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Provide honest, fair, and constructive feedback</li>
                  <li>Base reviews on actual experiences only</li>
                  <li>Include specific details that help others make decisions</li>
                  <li>Update reviews if issues are resolved</li>
                  <li>Avoid personal attacks or offensive language</li>
                </ul>
              </div>

              <div>
                <h3 className="text-primary text-21 font-semibold mb-3">7.2 Review Integrity</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Never offer or accept payment for reviews</li>
                  <li>Don&apos;t ask friends or family to post fake reviews</li>
                  <li>Don&apos;t threaten negative reviews to get discounts</li>
                  <li>Report suspicious or fraudulent reviews</li>
                </ul>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 8. Prohibited Activities */}
            <section id="prohibited">
              <h2 className="text-midnight_text text-28 font-bold mb-6">8. Prohibited Activities</h2>
              
              <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                <p className="text-midnight_text text-18 font-semibold mb-4">The following activities are strictly prohibited on Sahoolat AI:</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-midnight_text font-semibold mb-2">Illegal Activities:</p>
                    <ul className="list-disc ml-6 text-dark_grey text-18 space-y-1">
                      <li>Services that violate Pakistani law or international regulations</li>
                      <li>Money laundering or financial fraud</li>
                      <li>Sale of illegal goods or substances</li>
                      <li>Human trafficking or exploitation</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-midnight_text font-semibold mb-2">Harmful Conduct:</p>
                    <ul className="list-disc ml-6 text-dark_grey text-18 space-y-1">
                      <li>Harassment, bullying, or threats</li>
                      <li>Discrimination based on race, religion, gender, or other characteristics</li>
                      <li>Hate speech or violent content</li>
                      <li>Sexual harassment or inappropriate advances</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-midnight_text font-semibold mb-2">Platform Abuse:</p>
                    <ul className="list-disc ml-6 text-dark_grey text-18 space-y-1">
                      <li>Creating fake accounts or impersonating others</li>
                      <li>Manipulating reviews or ratings</li>
                      <li>Spamming or sending unsolicited promotions</li>
                      <li>Attempting to circumvent platform fees</li>
                      <li>Scraping data or using bots without permission</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-midnight_text font-semibold mb-2">Fraudulent Behavior:</p>
                    <ul className="list-disc ml-6 text-dark_grey text-18 space-y-1">
                      <li>Misrepresenting qualifications or credentials</li>
                      <li>Providing false information in job posts or bids</li>
                      <li>Accepting payment without delivering services</li>
                      <li>Phishing or attempting to steal personal information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 9. Reporting Violations */}
            <section id="reporting">
              <h2 className="text-midnight_text text-28 font-bold mb-6">9. Reporting Violations</h2>
              
              <p className="text-dark_grey text-18 leading-relaxed mb-4">
                If you witness or experience any violation of these guidelines, please report it immediately:
              </p>

              <div className="bg-secondary/30 rounded-lg p-6 mb-4">
                <h3 className="text-primary text-21 font-semibold mb-3">How to Report:</h3>
                <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                  <li>Use the &quot;Report&quot; button on user profiles, job posts, or messages</li>
                  <li>Email our Trust & Safety team at <a href="mailto:safety@sahoolatai.com" className="text-primary hover:underline">safety@sahoolatai.com</a></li>
                  <li>Call our support hotline for urgent matters: 051 5224568</li>
                  <li>Use the in-app support chat for immediate assistance</li>
                </ul>
              </div>

              <p className="text-dark_grey text-18 leading-relaxed">
                All reports are confidential. We investigate every report and take appropriate action. You will not face retaliation for reporting violations in good faith.
              </p>
            </section>

            <hr className="border-secondary" />

            {/* 10. Consequences of Violations */}
            <section id="consequences">
              <h2 className="text-midnight_text text-28 font-bold mb-6">10. Consequences of Violations</h2>
              
              <p className="text-dark_grey text-18 leading-relaxed mb-4">
                Violations of these guidelines may result in:
              </p>

              <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2 mb-4">
                <li><span className="font-semibold text-midnight_text">Warning:</span> First-time minor violations may receive a warning</li>
                <li><span className="font-semibold text-midnight_text">Temporary Suspension:</span> Repeated or moderate violations may result in account suspension</li>
                <li><span className="font-semibold text-midnight_text">Permanent Ban:</span> Serious or repeated violations will result in permanent account termination</li>
                <li><span className="font-semibold text-midnight_text">Legal Action:</span> Illegal activities will be reported to appropriate authorities</li>
                <li><span className="font-semibold text-midnight_text">Financial Penalties:</span> Fraudulent activities may result in forfeiture of earnings</li>
              </ul>

              <p className="text-dark_grey text-18 leading-relaxed">
                We reserve the right to take any action we deem necessary to protect our community and platform.
              </p>
            </section>

            <hr className="border-secondary" />

            {/* 11. Trust & Safety Measures */}
            <section id="trust-safety">
              <h2 className="text-midnight_text text-28 font-bold mb-6">11. Trust & Safety Measures</h2>
              
              <p className="text-dark_grey text-18 leading-relaxed mb-4">
                Sahoolat AI implements various measures to keep our community safe:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-secondary/20 rounded-lg p-5">
                  <h3 className="text-primary text-18 font-semibold mb-2">✓ Verified Profiles</h3>
                  <p className="text-dark_grey text-16">Identity verification for service providers to ensure authenticity</p>
                </div>
                <div className="bg-secondary/20 rounded-lg p-5">
                  <h3 className="text-primary text-18 font-semibold mb-2">✓ Secure Payments</h3>
                  <p className="text-dark_grey text-16">Protected transactions through trusted payment processors</p>
                </div>
                <div className="bg-secondary/20 rounded-lg p-5">
                  <h3 className="text-primary text-18 font-semibold mb-2">✓ AI Monitoring</h3>
                  <p className="text-dark_grey text-16">Automated systems to detect suspicious activities</p>
                </div>
                <div className="bg-secondary/20 rounded-lg p-5">
                  <h3 className="text-primary text-18 font-semibold mb-2">✓ Review System</h3>
                  <p className="text-dark_grey text-16">Transparent ratings to help you make informed decisions</p>
                </div>
                <div className="bg-secondary/20 rounded-lg p-5">
                  <h3 className="text-primary text-18 font-semibold mb-2">✓ 24/7 Support</h3>
                  <p className="text-dark_grey text-16">Customer support available around the clock</p>
                </div>
                <div className="bg-secondary/20 rounded-lg p-5">
                  <h3 className="text-primary text-18 font-semibold mb-2">✓ Data Encryption</h3>
                  <p className="text-dark_grey text-16">Your personal information is protected with industry-standard encryption</p>
                </div>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* 12. Contact Information */}
            <section id="contact">
              <h2 className="text-midnight_text text-28 font-bold mb-4">12. Contact Information</h2>
              <p className="text-dark_grey text-18 leading-relaxed mb-4">For questions about these guidelines or to report issues:</p>
              <div className="bg-secondary/30 rounded-lg p-6">
                <p className="text-midnight_text text-18 font-bold mb-2">Sahoolat AI Trust & Safety Team</p>
                <p className="text-dark_grey text-18 mb-1"><span className="font-semibold text-midnight_text">General Support:</span> <a href="mailto:support@sahoolatai.com" className="text-primary hover:underline">support@sahoolatai.com</a></p>
                <p className="text-dark_grey text-18 mb-1"><span className="font-semibold text-midnight_text">Safety Concerns:</span> <a href="mailto:safety@sahoolatai.com" className="text-primary hover:underline">safety@sahoolatai.com</a></p>
                <p className="text-dark_grey text-18 mb-1"><span className="font-semibold text-midnight_text">Website:</span> <a href="https://sahoolatai.com" className="text-primary hover:underline">sahoolatai.com</a></p>
                <p className="text-dark_grey text-18 mb-1"><span className="font-semibold text-midnight_text">Address:</span> Soan Garden Block B (46000), Islamabad, Pakistan</p>
                <p className="text-dark_grey text-18"><span className="font-semibold text-midnight_text">Phone:</span> 051 5224568</p>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* Closing */}
            <div className="bg-primary/10 rounded-lg p-6 text-center">
              <p className="text-midnight_text text-18 font-semibold">
                Thank you for being a part of the Sahoolat AI community. Together, we can create a safe, trusted, and efficient platform for everyone.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuidelinesPage;
