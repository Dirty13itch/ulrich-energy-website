import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  ArrowRight,
  Phone,
  BarChart3,
  Wind,
  Leaf,
  DollarSign,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardIcon,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Ulrich Energy Auditing | Twin Cities HERS Rater & Energy Inspection",
  description:
    "Professional HERS rating field services for Twin Cities builders. Volume new construction specialists. ENERGY STAR, ZERH, IECC compliance, and 45L tax credit documentation.",
  keywords: [
    "HERS rater",
    "energy audit",
    "Twin Cities",
    "Minnesota",
    "new construction",
    "ENERGY STAR",
    "ZERH",
    "45L tax credit",
    "blower door testing",
    "duct leakage testing",
    "Minnesota Green Path",
  ],
};

const stats = [
  { number: "10+", label: "Years in Business", description: "Serving Twin Cities builders since 2015" },
  { number: "2,500+", label: "Homes Inspected", description: "Production communities to custom builds" },
  { number: "50+", label: "Builder Partners", description: "From M/I Homes to custom builders" },
];

const services = [
  {
    icon: BarChart3,
    title: "HERS Rating Field Services",
    description:
      "Complete HERS ratings with pre-drywall and final inspections. Partnership with Building Knowledge (RESNET Accredited).",
    href: "/services#single-family",
  },
  {
    icon: Wind,
    title: "Blower Door & Duct Testing",
    description:
      "Air leakage and duct leakage testing for IECC 2021 compliance. ANSI/RESNET/ICC 380 standards.",
    href: "/services#single-family",
  },
  {
    icon: Award,
    title: "ENERGY STAR & ZERH",
    description:
      "Full certification support including documentation for $2,500-$5,000 federal tax credits per home.",
    href: "/services#single-family",
  },
  {
    icon: Leaf,
    title: "Minnesota Green Path",
    description:
      "Energy Tested, Advanced, and Master certification support. Featured in Parade of Homes.",
    href: "/services#single-family",
  },
];

const whyChooseUs = [
  {
    title: "Volume Specialists",
    description:
      "We focus on new construction partnerships, not one-off existing home audits. Our systems are built for efficiency at scale.",
  },
  {
    title: "10+ Years Local Experience",
    description:
      "Since 2015, we've inspected 2,500+ homes in the Twin Cities. We know Minnesota Climate Zone 6A and local codes.",
  },
  {
    title: "Tax Credit Expertise",
    description:
      "We prepare complete 45L documentation packages, helping builders claim $2,500-$5,000 per home in federal tax credits.",
  },
  {
    title: "Consistent Inspector Assignment",
    description:
      "Your community gets the same RESNET-certified RFI every time, ensuring consistent standards and relationship building.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative bg-gradient-to-br from-[#214293] to-[#0f2654] py-20 lg:py-28"
          aria-labelledby="hero-heading"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_#90C050_0%,_transparent_50%)]" />
          </div>
          <div className="container-site relative">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#90C050]">
                Builder Partnership Specialists
              </p>
              <h1 
                id="hero-heading"
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                HERS Ratings That Keep Your{" "}
                <span className="text-[#90C050]">Projects Moving</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#DDE9FF]">
                Professional energy inspection services for Twin Cities builders. From ENERGY STAR 
                certification to 45L tax credit documentation—we handle the energy code so you can 
                focus on building.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#90C050] text-[#0f2654] hover:bg-[#7db043] font-semibold"
                >
                  <Link href="/contact">
                    <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                    Discuss Your Community
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-[#90C050] text-[#90C050] hover:bg-[#90C050]/10"
                >
                  <Link href="/services">
                    View Our Services
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section 
          className="py-12 bg-[#ECFFCF]"
          aria-labelledby="stats-heading"
        >
          <h2 id="stats-heading" className="sr-only">Company Statistics</h2>
          <div className="container-site">
            <div className="grid gap-8 md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-[#0f2654]">{stat.number}</div>
                  <div className="mt-1 text-lg font-semibold text-[#214293]">{stat.label}</div>
                  <div className="mt-1 text-sm text-[#4a4a4a]">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section 
          className="py-16 lg:py-20 bg-[#FEFFF8]"
          aria-labelledby="services-heading"
        >
          <div className="container-site">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h2 id="services-heading" className="text-3xl font-bold text-[#0f2654]">
                Comprehensive Energy Inspection Services
              </h2>
              <p className="mt-4 text-lg text-[#4a4a4a]">
                From pre-drywall to final certification, we handle every aspect of energy code 
                compliance and certification.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Card key={service.title} className="h-full flex flex-col">
                  <CardContent className="pt-6 flex-1">
                    <CardIcon>
                      <service.icon className="h-6 w-6 text-[#214293]" aria-hidden="true" />
                    </CardIcon>
                    <h3 className="text-lg font-semibold text-[#0f2654] mb-2">{service.title}</h3>
                    <p className="text-sm text-[#4a4a4a] mb-4">{service.description}</p>
                  </CardContent>
                  <CardContent className="pt-0">
                    <Link
                      href={service.href}
                      className="inline-flex items-center text-sm font-semibold text-[#214293] hover:text-[#90C050] transition-colors"
                    >
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button asChild className="bg-[#214293] hover:bg-[#2d5ab8]">
                <Link href="/services">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section 
          className="py-16 lg:py-20 bg-white"
          aria-labelledby="why-heading"
        >
          <div className="container-site">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h2 id="why-heading" className="text-3xl font-bold text-[#0f2654]">
                Why Builders Choose Ulrich Energy Auditing
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-[#90C050]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0f2654] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#4a4a4a]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tax Credits Highlight */}
        <section 
          className="py-16 lg:py-20 bg-[#214293]"
          aria-labelledby="tax-credit-heading"
        >
          <div className="container-site">
            <div className="mx-auto max-w-4xl text-center">
              <DollarSign className="h-12 w-12 text-[#90C050] mx-auto mb-4" aria-hidden="true" />
              <h2 id="tax-credit-heading" className="text-3xl font-bold text-white mb-4">
                Maximize Your 45L Tax Credits
              </h2>
              <p className="text-lg text-[#DDE9FF] mb-8">
                We prepare complete documentation packages to help builders claim 
                federal tax credits of $2,500 to $5,000 per home.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                <div className="bg-white/10 rounded-lg p-6">
                  <div className="text-3xl font-bold text-[#90C050] mb-2">$2,500</div>
                  <div className="text-white font-semibold">ENERGY STAR Certified</div>
                  <div className="text-sm text-[#DDE9FF]">Per single-family home</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <div className="text-3xl font-bold text-[#90C050] mb-2">$5,000</div>
                  <div className="text-white font-semibold">ZERH Certified</div>
                  <div className="text-sm text-[#DDE9FF]">Per single-family home</div>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-[#90C050] text-[#0f2654] hover:bg-[#7db043] font-semibold"
              >
                <Link href="/services">
                  Learn About Tax Credits
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section 
          className="py-16 lg:py-20 bg-[#FEFFF8]"
          aria-labelledby="service-area-heading"
        >
          <div className="container-site">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <MapPin className="h-10 w-10 text-[#214293] mx-auto mb-4" aria-hidden="true" />
              <h2 id="service-area-heading" className="text-3xl font-bold text-[#0f2654]">
                Twin Cities Service Area
              </h2>
              <p className="mt-4 text-lg text-[#4a4a4a]">
                We serve the entire Twin Cities metropolitan area and surrounding communities.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
              {[
                "Minneapolis", "St. Paul", "Bloomington", "Edina",
                "Eden Prairie", "Plymouth", "Maple Grove", "Woodbury",
                "Eagan", "Lakeville", "Burnsville", "Apple Valley",
                "Minnetonka", "St. Louis Park", "Brooklyn Park", "Coon Rapids",
              ].map((city) => (
                <div
                  key={city}
                  className="flex items-center gap-2 text-[#4a4a4a]"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#90C050]" aria-hidden="true" />
                  <span>{city}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-16 lg:py-20 bg-white"
          aria-labelledby="cta-heading"
        >
          <div className="container-site">
            <div className="mx-auto max-w-4xl text-center">
              <h2 id="cta-heading" className="text-3xl font-bold text-[#0f2654] mb-4">
                Ready to Partner on Your Next Community?
              </h2>
              <p className="text-lg text-[#4a4a4a] mb-8">
                Whether you're building 10 homes or 100, we have the capacity, expertise, 
                and systems to support your project from pre-construction through final certification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#90C050] text-[#0f2654] hover:bg-[#7db043] font-semibold"
                >
                  <Link href="/contact">
                    <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                    Schedule a Consultation
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-[#214293] text-[#214293] hover:bg-[#214293]/10"
                >
                  <Link href="/services">
                    Explore Services
                  </Link>
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
