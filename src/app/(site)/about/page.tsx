"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutPage = () => {
  return (
    <section className="pt-40 pb-20 bg-background min-h-screen">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-midnight_text text-54 font-bold mb-4">
            About <span className="text-primary">Sahoolat AI</span>
          </h1>
          <p className="text-dark_grey text-18 mb-8">Pakistan&apos;s First AI-Powered Freelance Platform</p>

          {/* Main Content */}
          <div className="bg-white rounded-2xl p-8 shadow-card border-2 border-secondary space-y-8">
            
            {/* Mission */}
            <section>
              <h2 className="text-midnight_text text-28 font-bold mb-4">Our Mission</h2>
              <p className="text-dark_grey text-18 leading-relaxed">
                Sahoolat AI is revolutionizing how Pakistan connects talent with opportunity. We&apos;re building the country&apos;s first AI-powered freelance marketplace that makes finding and hiring local service providers as simple as having a conversation.
              </p>
            </section>

            <hr className="border-secondary" />

            {/* What We Do */}
            <section>
              <h2 className="text-midnight_text text-28 font-bold mb-4">What We Do</h2>
              <p className="text-dark_grey text-18 leading-relaxed mb-4">
                Our intelligent platform uses advanced AI to understand your needs and instantly connect you with verified local professionals - from electricians and plumbers to tutors and designers.
              </p>
              <ul className="list-disc ml-6 text-dark_grey text-18 leading-relaxed space-y-2">
                <li><span className="font-semibold text-midnight_text">AI-Powered Matching:</span> Simply describe what you need, and our AI finds the perfect match</li>
                <li><span className="font-semibold text-midnight_text">Local Focus:</span> Connect with service providers in your area for faster, more reliable service</li>
                <li><span className="font-semibold text-midnight_text">Transparent Bidding:</span> Compare quotes from multiple providers and choose what works best</li>
                <li><span className="font-semibold text-midnight_text">Verified Professionals:</span> All service providers are vetted for quality and reliability</li>
                <li><span className="font-semibold text-midnight_text">Secure Payments:</span> Safe and hassle-free transactions through our platform</li>
              </ul>
            </section>

            <hr className="border-secondary" />

            {/* Why Sahoolat */}
            <section>
              <h2 className="text-midnight_text text-28 font-bold mb-4">Why &quot;Sahoolat&quot;?</h2>
              <p className="text-dark_grey text-18 leading-relaxed">
                &quot;Sahoolat&quot; means convenience and ease in Urdu. We believe finding help shouldn&apos;t be hard. Whether you need a home repair, a shopping errand, or professional expertise - Sahoolat AI brings convenience to your fingertips with the power of artificial intelligence.
              </p>
            </section>

            <hr className="border-secondary" />

            {/* Our Vision */}
            <section>
              <h2 className="text-midnight_text text-28 font-bold mb-4">Our Vision</h2>
              <p className="text-dark_grey text-18 leading-relaxed">
                We envision a Pakistan where every skilled worker has access to opportunities and every household has access to reliable services. By bridging the gap between service seekers and providers through AI technology, we&apos;re creating economic opportunities while making daily life easier for millions.
              </p>
            </section>

            <hr className="border-secondary" />

            {/* The Team */}
            <section>
              <h2 className="text-midnight_text text-28 font-bold mb-4">Built by NovaSync Dynamics</h2>
              <p className="text-dark_grey text-18 leading-relaxed mb-4">
                Sahoolat AI is a product of NovaSync Dynamics Private Limited, a Pakistan-based technology company focused on building innovative solutions for local challenges.
              </p>
              <div className="bg-secondary/30 rounded-lg p-6">
                <p className="text-midnight_text text-18 font-bold mb-2">NovaSync Dynamics (Pvt) Ltd</p>
                <p className="text-dark_grey text-18 mb-1"><span className="font-semibold text-midnight_text">Address:</span> Soan Garden Block B, Islamabad Pakistan</p>
                <p className="text-dark_grey text-18 mb-1"><span className="font-semibold text-midnight_text">Phone:</span> 051 5224568</p>
                <p className="text-dark_grey text-18"><span className="font-semibold text-midnight_text">Website:</span> <Link href="https://sahoolatai.com" className="text-primary hover:underline">sahoolatai.com</Link></p>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* Contact */}
            <section>
              <h2 className="text-midnight_text text-28 font-bold mb-4">Get In Touch</h2>
              <p className="text-dark_grey text-18 leading-relaxed mb-4">
                Have questions or want to learn more? We&apos;d love to hear from you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="mailto:support@sahoolatai.com" 
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </Link>
                <Link 
                  href="/faq" 
                  className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Visit FAQ
                </Link>
              </div>
            </section>

            <hr className="border-secondary" />

            {/* Closing */}
            <div className="bg-primary/10 rounded-lg p-6 text-center">
              <p className="text-midnight_text text-18 font-semibold">
                Join thousands of Pakistanis who are already experiencing the convenience of AI-powered services with Sahoolat AI.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;
