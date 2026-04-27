import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact customer support. This includes:
      
• Personal identification information (name, email address, phone number)
• Billing and shipping information (addresses, payment card details — encrypted and tokenized)
• Account credentials (passwords are stored in encrypted form)
• Order history and transaction data
• Device information, browser type, IP address, and usage data through cookies

We also collect information automatically when you use our services, including log data, device information, and cookies.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `Tyfenix uses the collected information for various purposes:

• To process transactions and send related information, including purchase confirmations and invoices
• To send promotional communications (you can opt out at any time)
• To personalize your shopping experience and show relevant products
• To improve our platform, services, and customer support
• To detect, prevent, and address technical issues and fraudulent activity
• To comply with legal obligations and protect rights`,
    },
    {
      title: "3. Information Sharing & Disclosure",
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

• Service providers who assist in our operations (payment processors, logistics partners, analytics)
• Law enforcement or government authorities when required by law
• Business partners with your explicit consent
• Successor entities in case of merger, acquisition, or sale of assets

All third-party service providers are contractually obligated to keep your information secure.`,
    },
    {
      title: "4. Cookies & Tracking Technologies",
      content: `We use cookies, web beacons, and similar tracking technologies to:

• Keep you signed in and maintain your shopping cart
• Remember your preferences and settings
• Analyze site usage and improve performance
• Deliver targeted advertisements through trusted partners

You can control cookie settings through your browser settings. Disabling cookies may affect site functionality.`,
    },
    {
      title: "5. Data Security",
      content: `We implement industry-standard security measures to protect your personal information:

• SSL/TLS encryption for all data transmission
• PCI-DSS compliant payment processing (card data never stored on our servers)
• Regular security audits and vulnerability assessments
• Access controls limiting employee access to customer data
• Data breach notification procedures in compliance with applicable laws`,
    },
    {
      title: "6. Your Rights & Choices",
      content: `You have the right to:

• Access and review your personal information stored with us
• Correct inaccurate or incomplete data in your account
• Request deletion of your account and personal data
• Opt out of marketing communications at any time
• Request data portability in a machine-readable format
• Lodge a complaint with relevant data protection authorities

To exercise these rights, contact us at privacy@tyfenix.com`,
    },
    {
      title: "7. Children's Privacy",
      content: `Tyfenix is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us personal information, we will delete it immediately. Parents or guardians who believe their child has submitted personal information should contact us at privacy@tyfenix.com.`,
    },
    {
      title: "8. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by:

• Posting the new Privacy Policy on this page with an updated "Last Updated" date
• Sending an email notification to registered users
• Showing a prominent notice on our website

Your continued use of Tyfenix after changes constitutes acceptance of the updated policy.`,
    },
    {
      title: "9. Contact Us",
      content: `If you have questions, concerns, or requests related to this Privacy Policy, please contact us:

Email: privacy@tyfenix.com
Grievance Officer: Santosh King
Address: Tyfenix Internet Private Limited, New Delhi, India - 110001
Phone: 1800-XXX-XXXX (Toll Free, Mon–Sat, 9 AM – 6 PM IST)

We aim to respond to all queries within 48 business hours.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield size={32} className="text-brand-orange" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
        <p className="text-sm text-gray-600 mt-4 max-w-2xl mx-auto">
          At Tyfenix, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and make purchases.
        </p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
        {sections.map((section, i) => (
          <div key={i}>
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
            <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{section.content}</div>
            {i < sections.length - 1 && <hr className="mt-8 border-gray-100" />}
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/" className="text-brand-blue hover:underline text-sm">← Back to Tyfenix</Link>
      </div>
    </div>
  );
}
