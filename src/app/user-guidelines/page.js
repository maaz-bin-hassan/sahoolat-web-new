'use client';
import React from 'react';
import {FaCheckCircle, FaHandshake, FaMicrophoneAlt, FaSearch} from 'react-icons/fa';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HowItWorks() {
  return (
    <>
      <Header/>
      <section className="w-full pb-16 text-gray-800">
        {/* Mission Header */}
        <div className="bg-gradient-to-r from-teal-400 to-orange-400 py-12 px-4 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Our Mission
          </h2>
          <p className="max-w-4xl mx-auto text-base md:text-xl leading-relaxed">
            <span className="font-semibold">Sahoolat AI</span> is on a mission to redefine how people access services by combining <strong>AI-powered voice search</strong> with streamlined workflows.
            We aim to bridge the gap between need and fulfillment through innovation, ensuring that everyone can easily <em>find what they need</em>—quickly, securely, and intelligently.
            </p>
        </div>

        {/* User Guidelines Section */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 border-b-2 border-orangebrand pb-2">
            User Guidelines – Safe & Trusted Platform
          </h2>

          <p className="text-gray-700 mb-4">
            At Sahoolat AI, we are dedicated to creating a safe and trusted environment for our users. Please adhere to the following guidelines to ensure everyone's experience remains secure and enjoyable.
          </p>

          <h3 className="text-2xl font-semibold text-brand mt-6 mb-2">Respect & Professionalism</h3>
          <p className="text-gray-700 mb-4">
            Always communicate respectfully and professionally. Harassment, abusive language, or inappropriate behavior will not be tolerated.
          </p>

          <h3 className="text-2xl font-semibold text-brand mt-6 mb-2">Privacy Protection</h3>
          <p className="text-gray-700 mb-4">
            Protect your privacy and the privacy of others. Never share sensitive personal information publicly. Report any suspicious activities immediately.
          </p>

          <h3 className="text-2xl font-semibold text-brand mt-6 mb-2">Fair & Transparent Transactions</h3>
          <p className="text-gray-700 mb-4">
            Ensure all interactions and transactions are fair and transparent. Clearly define terms and conditions of agreements beforehand to prevent misunderstandings.
          </p>

          <h3 className="text-2xl font-semibold text-brand mt-6 mb-2">Feedback & Improvement</h3>
          <p className="text-gray-700 mb-4">
            Provide honest, constructive feedback. Your insights help us continuously enhance the safety and quality of our platform.
          </p>

          <p className="text-sm text-gray-600 mt-8 border-t pt-4">
            For further assistance or to report any issues, contact us at <span className="text-orange-500 font-medium">support@sahoolat.ai</span>.
          </p>
        </div>

        {/* How It Works */}
        {/*<div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">*/}
        {/*  <h3 className="text-center text-2xl md:text-4xl font-bold text-gray-800 mb-12">*/}
        {/*    How Sahoolat AI Works*/}
        {/*  </h3>*/}

        {/*  /!* Four Steps in a Grid *!/*/}
        {/*  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">*/}
        {/*    /!* Step 1 *!/*/}
        {/*    <div className="p-4 bg-white rounded-lg shadow-sm">*/}
        {/*      <FaMicrophoneAlt className="mx-auto text-teal-500 w-12 h-12 mb-4"/>*/}
        {/*      <h4 className="text-xl font-bold text-gray-700 mb-2">1. Say It</h4>*/}
        {/*      <p className="text-gray-600 leading-relaxed">*/}
        {/*        Use our voice or text input to let us know what service*/}
        {/*        or solution you need. Seamless, hands-free, and quick.*/}
        {/*      </p>*/}
        {/*    </div>*/}

        {/*    /!* Step 2 *!/*/}
        {/*    <div className="p-4 bg-white rounded-lg shadow-sm">*/}
        {/*      <FaSearch className="mx-auto text-orange-500 w-12 h-12 mb-4"/>*/}
        {/*      <h4 className="text-xl font-bold text-gray-700 mb-2">*/}
        {/*        2. We Find It*/}
        {/*      </h4>*/}
        {/*      <p className="text-gray-600 leading-relaxed">*/}
        {/*        Our AI instantly searches and recommends the best*/}
        {/*        service providers or professionals based on your request.*/}
        {/*      </p>*/}
        {/*    </div>*/}

        {/*    /!* Step 3 *!/*/}
        {/*    <div className="p-4 bg-white rounded-lg shadow-sm">*/}
        {/*      <FaHandshake className="mx-auto text-teal-500 w-12 h-12 mb-4"/>*/}
        {/*      <h4 className="text-xl font-bold text-gray-700 mb-2">*/}
        {/*        3. Connect &amp; Discuss*/}
        {/*      </h4>*/}
        {/*      <p className="text-gray-600 leading-relaxed">*/}
        {/*        Compare providers, chat or call directly, and negotiate*/}
        {/*        terms. You’re always in control of the final decision.*/}
        {/*      </p>*/}
        {/*    </div>*/}

        {/*    /!* Step 4 *!/*/}
        {/*    <div className="p-4 bg-white rounded-lg shadow-sm">*/}
        {/*      <FaCheckCircle className="mx-auto text-orange-500 w-12 h-12 mb-4"/>*/}
        {/*      <h4 className="text-xl font-bold text-gray-700 mb-2">*/}
        {/*        4. Get It Done*/}
        {/*      </h4>*/}
        {/*      <p className="text-gray-600 leading-relaxed">*/}
        {/*        Hire the right person or team, schedule your job, and*/}
        {/*        relax as Sahoolat AI ensures a hassle-free experience*/}
        {/*        from start to finish.*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/* Multi-Color (Gradient) Line */}
        <div
          className="h-1 w-5/12 my-10 mx-auto bg-gradient-to-r from-teal-400 via-pink-500 to-orange-500 mb-8"></div>

        {/* One-Line Tagline */}
        <div className="flex my-10 justify-center">
                <span className="text-3xl md:text-[50px] mr-1 text-orangebrand font-bold">
                    Say It.&nbsp;
                </span>
          <span className="text-3xl md:text-[50px] mr-1 text-brand font-bold">
                    Find it.&nbsp;
                </span>
          <span className="text-3xl md:text-[50px] mr-1 text-orangebrand font-bold">
                    Get it done!
                </span>
        </div>

      </section>
      <Footer/>
    </>
  );
}
