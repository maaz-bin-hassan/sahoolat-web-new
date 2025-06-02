'use client';
import { useParams } from 'next/navigation';

export default function TermDetails() {
  const params = useParams();
  const { details } = params;

 const termsMap = {
    general: {
      title: 'Terms of Use',
      content: `
<h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">Welcome to Sahoolat.AI!</h2>
<p class="text-lg leading-7 text-gray-800 mb-4">These Terms of Use (“Terms”) govern your access to and use of Sahoolat.AI’s services and platforms, including mobile applications, website, and AI systems (collectively, the “Platform”).</p>
<p class="text-lg leading-7 text-gray-800 mb-4">By using our Platform, you fully agree to these Terms and any other applicable policies. In case of any conflict with supplementary terms, the provisions herein will apply unless stated otherwise.</p>

<h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">1. Service Overview</h2>
<ul class="space-y-3 text-lg text-gray-800">
  <li><strong class="text-[#1d1d1f]">Matchmaking Platform:</strong> Sahoolat.AI connects users with service providers using intelligent algorithms that enhance the search and matching experience in real-time.</li>
  <li><strong class="text-[#1d1d1f]">User Initiated Pricing:</strong> Users may propose pricing for services, which service providers can either accept or negotiate, ensuring flexibility and fairness.</li>
  <li><strong class="text-[#1d1d1f]">Agreement Formation:</strong> A formal service agreement is automatically created once both parties consent to a price through the Platform.</li>
</ul>

<h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">2. User Responsibilities</h2>
<ul class="space-y-3 text-lg text-gray-800">
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Information Accuracy:</strong> Provide valid, complete, and accurate information for all service requests.</li>
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Communication:</strong> Remain available via the app and ensure access for service providers at the scheduled time.</li>
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Respectful Behavior:</strong> Treat all providers with respect and do not misuse Platform features.</li>
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Legal Use:</strong> Use the Platform only for lawful purposes.</li>
</ul>

<h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">3. Provider Responsibilities</h2>
<ul class="space-y-3 text-lg text-gray-800">
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Professional Conduct:</strong> Fulfill accepted services reliably, punctually, and professionally.</li>
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Safety & Quality:</strong> Use best practices and lawful methods in service delivery.</li>
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Transparency:</strong> Refuse requests if the information provided is suspicious or incomplete.</li>
</ul>

<h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">4. Prohibited Activities</h2>
<p class="text-lg leading-7 text-gray-800 mt-4 mb-4">Use of Sahoolat.AI is restricted in the following cases:</p>
<ul class="space-y-3 text-lg text-gray-800">
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Fraudulent services or identity impersonation</strong></li>
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Distribution of illegal or harmful content</strong></li>
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Use of platform to transport or promote restricted goods or activities</strong></li>
</ul>

<h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">5. Payment Terms</h2>
<ul class="space-y-3 text-lg text-gray-800">
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Fees:</strong> A service or platform usage fee may apply and will be communicated upfront.</li>
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Taxes:</strong> All users are responsible for understanding and reporting their earnings or expenses according to local laws.</li>
</ul>

<h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">6. Termination & Suspension</h2>
<ul class="space-y-3 text-lg text-gray-800">
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Account Action:</strong> Sahoolat.AI may suspend or terminate access for violations without notice.</li>
  <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Reinstatement:</strong> Appeals for account action can be submitted via our support system.</li>
</ul>

<h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">Contacting Sahoolat.AI</h2>
<p class="text-lg leading-7 text-gray-800 mt-4 mb-4">You can contact us at support@sahoolat.ai or through our in-app Help Center.</p>
`
    },
    users: {
      title: 'User Terms',
      content: `
    <p class="text-lg leading-7 text-gray-800 mb-4"><strong class="text-[#1d1d1f]">Last updated:</strong> 29th May, 2025</p>
    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">Welcome to Sahoolat.AI!</h2>
    <p class="text-lg leading-7 text-gray-800 mb-4">These Terms of Use (“Terms”) govern your access and responsibilities as a verified service provider using the Sahoolat.AI platform, including its voice interface, website, and mobile applications (the “Platform”). By registering as a service provider or using our services, you agree to these terms and any additional policies.</p>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">1. Responsibilities of a Service Provider</h2>
    <ul class="space-y-3 text-lg text-gray-800">
      <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Profile Accuracy:</strong> Information in your profile must be true, accurate, and regularly updated.</li>
      <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Service Quality:</strong> Deliver high-quality, timely, and professional services.</li>
      <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Ethical Behavior:</strong> Avoid fraudulent, illegal, or misleading activities.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">2. Use of AI-Powered Matchmaking</h2>
    <ul class="space-y-3 text-lg text-gray-800">
      <li><strong class="text-[#1d1d1f]">AI Matching:</strong> Matches may be generated using AI technology.</li>
      <li><strong class="text-[#1d1d1f]">No Guarantees:</strong> Sahoolat.AI does not guarantee work or payment.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">3. Communication and Conduct</h2>
    <ul class="space-y-3 text-lg text-gray-800">
      <li><strong class="text-[#1d1d1f]">Professionalism:</strong> Respond to service requests courteously and professionally.</li>
      <li><strong class="text-[#1d1d1f]">Zero Tolerance:</strong> Harassment, abuse, or inappropriate language can lead to termination.</li>
      <li><strong class="text-[#1d1d1f]">Safe Communication:</strong> Use in-app chat and calls responsibly; may be monitored.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">4. Safety and Compliance</h2>
    <ul class="space-y-3 text-lg text-gray-800">
      <li><strong class="text-[#1d1d1f]">Legal Compliance:</strong> Follow all applicable laws, licenses, and regulations.</li>
      <li><strong class="text-[#1d1d1f]">Insurance:</strong> Sahoolat.AI does not provide liability insurance; coverage is your responsibility.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">5. Payments and Fees</h2>
    <ul class="space-y-3 text-lg text-gray-800">
      <li><strong class="text-[#1d1d1f]">Platform Fee:</strong> A small fee may be deducted from earnings; prior notification will be given.</li>
      <li><strong class="text-[#1d1d1f]">Tax Responsibility:</strong> Track and declare all earnings per local regulations.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">6. Termination of Access</h2>
    <ul class="space-y-3 text-lg text-gray-800">
      <li><strong class="text-[#1d1d1f]">Account Suspension:</strong> Sahoolat.AI can suspend or terminate your account for violations.</li>
      <li><strong class="text-[#1d1d1f]">Permanent Ban:</strong> Serious/repeated violations may result in permanent banning without notice.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">Contacting Us</h2>
    <p class="text-lg leading-7 text-gray-800 mb-4">For support, reach us via the app chat interface or Help Center for providers.</p>
    <p class="text-lg leading-7 text-gray-800 mb-4">By using Sahoolat.AI, you commit to ethical and responsible behavior, upholding the platform’s quality standards.</p>
  `
    },
    providers: {
      title: 'Service Provider Terms',
      content: `
    <p class="text-lg leading-7 text-gray-800 mb-4"><strong class="text-[#1d1d1f]">Last updated:</strong> 29th May, 2025</p>
    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">Welcome to Sahoolat.AI!</h2>
    <p class="text-lg leading-7 text-gray-800 mb-4">These Terms of Use (“Terms”) govern your access and responsibilities as a verified service provider using the Sahoolat.AI platform, including its voice interface, website, and mobile applications (the “Platform”). By registering as a service provider or using our services, you agree to these terms and any additional policies.</p>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">1. Responsibilities of a Service Provider</h2>
    <ul class="space-y-3 text-lg text-gray-800">
      <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Profile Accuracy:</strong> Information in your profile must be true, accurate, and regularly updated.</li>
      <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Service Quality:</strong> Deliver high-quality, timely, and professional services.</li>
      <li class="text-lg text-gray-800 mb-2"><strong class="text-[#1d1d1f]">Ethical Behavior:</strong> Avoid fraudulent, illegal, or misleading activities.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">2. Use of AI-Powered Matchmaking</h2>
    <ul class="space-y-3 text-lg text-gray-800">
      <li><strong class="text-[#1d1d1f]">AI Matching:</strong> Matches may be generated using AI technology.</li>
      <li><strong class="text-[#1d1d1f]">No Guarantees:</strong> Sahoolat.AI does not guarantee work or payment.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">3. Communication and Conduct</h2>
    <ul class="space-y-3 text-lg text-gray-800">
      <li><strong class="text-[#1d1d1f]">Professionalism:</strong> Respond to service requests courteously and professionally.</li>
      <li><strong class="text-[#1d1d1f]">Zero Tolerance:</strong> Harassment, abuse, or inappropriate language can lead to termination.</li>
      <li><strong class="text-[#1d1d1f]">Safe Communication:</strong> Use in-app chat and calls responsibly; may be monitored.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">4. Safety and Compliance</h2>
    <ul class="space-y-3 text-lg text-gray-800">
      <li><strong class="text-[#1d1d1f]">Legal Compliance:</strong> Follow all applicable laws, licenses, and regulations.</li>
      <li><strong class="text-[#1d1d1f]">Insurance:</strong> Sahoolat.AI does not provide liability insurance; coverage is your responsibility.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">5. Payments and Fees</h2>
    <ul class="space-y-3 text-lg text-gray-800">
      <li><strong class="text-[#1d1d1f]">Platform Fee:</strong> A small fee may be deducted from earnings; prior notification will be given.</li>
      <li><strong class="text-[#1d1d1f]">Tax Responsibility:</strong> Track and declare all earnings per local regulations.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">6. Termination of Access</h2>
    <ul class="space-y-3 text-lg text-gray-800">
      <li><strong class="text-[#1d1d1f]">Account Suspension:</strong> Sahoolat.AI can suspend or terminate your account for violations.</li>
      <li><strong class="text-[#1d1d1f]">Permanent Ban:</strong> Serious/repeated violations may result in permanent banning without notice.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">Contacting Us</h2>
    <p class="text-lg leading-7 text-gray-800 mb-4">For support, reach us via the app chat interface or Help Center for providers.</p>
    <p class="text-lg leading-7 text-gray-800 mb-4">By using Sahoolat.AI, you commit to ethical and responsible behavior, upholding the platform’s quality standards.</p>
  `
    },
    ai: {
      title: 'AI Voice Terms',
      content: `
<h2 class="text-2xl font-semibold mt-10 mb-4 text-brand">AI Voice Assistant Terms</h2>
<p class="text-lg leading-7 text-gray-800 mb-4">Our AI voice assistant is designed to help users find services efficiently and conveniently through voice interaction.</p>
<p class="text-lg leading-7 text-gray-800 mb-4">Please note the following important points regarding the use of our AI voice services:</p>
<ul class="space-y-3 text-lg text-gray-800">
  <li><strong class="text-[#1d1d1f]">User Responsibility:</strong> All final decisions based on AI interactions remain the sole responsibility of the user.</li>
  <li><strong class="text-[#1d1d1f]">Accuracy:</strong> While we strive to provide accurate and helpful responses, the AI may occasionally misinterpret queries or provide incomplete information.</li>
  <li><strong class="text-[#1d1d1f]">Limitations:</strong> The AI voice assistant is a support tool and does not replace professional advice or human judgment.</li>
  <li><strong class="text-[#1d1d1f]">Liability:</strong> Sahoolat.AI is not liable for any decisions or outcomes resulting solely from AI voice interactions.</li>
</ul>
<p class="text-lg leading-7 text-gray-800 mb-4">By using the AI voice features, you acknowledge and accept these terms and agree to use the service responsibly.</p>
`
    }
  };

  const current = termsMap[details] || { title: 'Terms', content: 'No terms found for this section.' };

  return (
    <div className="max-w-8xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-[#1d1d1f]">
      <div className="mb-10">
        <h1 className="text-5xl text-center font-extrabold tracking-tight mb-4">{current.title}</h1>
        <p className="text-sm text-center text-gray-500 italic">Last updated: 29th May, 2025</p>
      </div>
      <article
        className="prose max-w-none prose-headings:text-[#1d1d1f] prose-h1:text-4xl prose-h1:font-bold prose-h2:mt-10 prose-h2:text-2xl prose-h2:font-semibold prose-h2:text-brand prose-p:text-base prose-p:leading-7 prose-li:pl-2 prose-li:mb-2 prose-ul:list-disc prose-ul:pl-6 prose-strong:font-semibold prose-p:mt-4 prose-p:mb-4"
        dangerouslySetInnerHTML={{ __html: current.content }}
      />
    </div>
  );
}