import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Building2,
  Home,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Contact Us | Ulrich Energy Auditing",
  description:
    "Contact Ulrich Energy Auditing for HERS rating services, ENERGY STAR certification, and energy inspections. Serving Twin Cities builders since 2015.",
};

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "(952) 240-4369",
    href: "tel:952-240-4369",
    description: "Call or text for fastest response",
  },
  {
    icon: Mail,
    title: "Email",
    value: "Shaun.Ulrich@UlrichEnergyAuditing.com",
    href: "mailto:Shaun.Ulrich@UlrichEnergyAuditing.com",
    description: "We'll respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Service Area",
    value: "Twin Cities Metro",
    description: "Minnesota - Climate Zone 6A",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Monday - Friday",
    description: "7:00 AM - 5:00 PM CST",
  },
];

const serviceAreas = [
  "Minneapolis",
  "St. Paul",
  "Bloomington",
  "Edina",
  "Eden Prairie",
  "Plymouth",
  "Maple Grove",
  "Woodbury",
  "Eagan",
  "Lakeville",
  "Burnsville",
  "Apple Valley",
  "Minnetonka",
  "St. Louis Park",
  "Brooklyn Park",
  "Coon Rapids",
  "And surrounding areas",
];

const faqs = [
  {
    question: "Do you work with existing homes or just new construction?",
    answer:
      "We specialize in new construction partnerships with builders. We don't typically perform one-off existing home audits - our systems and expertise are optimized for volume builder work.",
  },
  {
    question: "What's the difference between a HERS Rater and a Rating Field Inspector?",
    answer:
      "A HERS Rater can work independently with a QA Provider. A Rating Field Inspector (RFI) performs field inspections under the supervision of a HERS Rater. Our partnership with Building Knowledge allows us to offer complete services.",
  },
  {
    question: "How far in advance should I schedule inspections?",
    answer:
      "For production communities, we recommend scheduling your entire project upfront with block scheduling. For individual homes, 3-5 business days notice is typically sufficient.",
  },
  {
    question: "Do you handle the 45L tax credit paperwork?",
    answer:
      "We prepare all the technical documentation (HERS ratings, certifications, compliance forms) needed for 45L tax credits. Your tax professional will use this documentation when filing.",
  },
  {
    question: "What's included in a typical HERS rating?",
    answer:
      "A complete HERS rating includes pre-drywall thermal enclosure inspection, blower door testing, duct leakage testing, insulation grading, HVAC verification, and final HERS documentation.",
  },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#214293] to-[#1a357a] py-20 lg:py-28">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_#90C050_0%,_transparent_50%)]" />
          </div>
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Let's Talk About Your Project
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#DDE9FF]">
                Ready to partner on your next community? Have questions about certifications, 
                incentives, or scheduling? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
              {contactInfo.map((item) => (
                <Card key={item.title} className="border-[#DDE9FF] text-center">
                  <CardContent className="pt-6">
                    <div className="mx-auto w-12 h-12 bg-[#214293] rounded-xl flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-[#90C050]" />
                    </div>
                    <h3 className="font-semibold text-[#214293] mb-1">{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-lg font-medium text-[#214293] hover:text-[#90C050] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-medium text-[#214293]">{item.value}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Builder Types CTA */}
        <section className="py-16 lg:py-20 bg-[#FEFFF8]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h2 className="text-3xl font-bold text-[#214293] mb-4">
                What Type of Project Are You Building?
              </h2>
              <p className="text-lg text-gray-600">
                We work with all types of new construction projects in the Twin Cities metro
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
              <Card className="border-[#DDE9FF]">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-[#214293] rounded-xl flex items-center justify-center mb-4">
                    <Home className="h-6 w-6 text-[#90C050]" />
                  </div>
                  <CardTitle className="text-[#214293]">Single Family</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">
                    Detached homes, production communities, custom builds. HERS ratings, 
                    ENERGY STAR, ZERH certification.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#DDE9FF]">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-[#214293] rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-[#90C050]" />
                  </div>
                  <CardTitle className="text-[#214293]">Multi-Family</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">
                    Townhomes, duplexes, triplexes, low-rise apartments. MFNC certification, 
                    prevailing wage guidance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#DDE9FF]">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-[#214293] rounded-xl flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-[#90C050]" />
                  </div>
                  <CardTitle className="text-[#214293]">Volume Projects</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">
                    Large communities, phased developments. Block scheduling, volume pricing, 
                    dedicated inspector assignment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[#214293] rounded-xl">
                  <MapPin className="h-6 w-6 text-[#90C050]" />
                </div>
                <h2 className="text-3xl font-bold text-[#214293]">Service Areas</h2>
              </div>

              <p className="text-lg text-gray-600 mb-8">
                We serve the entire Twin Cities metropolitan area and surrounding communities. 
                If you're building within an hour of the metro, we can help.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {serviceAreas.map((area) => (
                  <div key={area} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#90C050]" />
                    <span className="text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-20 bg-[#FEFFF8]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-[#214293] mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-[#DDE9FF]">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-[#214293] mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-[#214293] to-[#1a357a]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-[#DDE9FF] mb-8">
                Call or email us today to discuss your project. We typically respond to inquiries 
                within 24 hours and can often schedule inspections within a week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#90C050] text-[#214293] hover:bg-[#7db043] font-semibold"
                >
                  <a href="tel:952-240-4369">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (952) 240-4369
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-[#90C050] text-[#90C050] hover:bg-[#90C050]/10"
                >
                  <a href="mailto:Shaun.Ulrich@UlrichEnergyAuditing.com">
                    <Mail className="mr-2 h-5 w-5" />
                    Send an Email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
