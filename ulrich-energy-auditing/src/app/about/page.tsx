import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  Users,
  Clock,
  Home,
  CheckCircle2,
  Phone,
  ArrowRight,
  Building2,
  Zap,
  Leaf,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "About Us | Ulrich Energy Auditing",
  description:
    "Learn about Ulrich Energy Auditing - Twin Cities energy inspection specialists since 2015. 2,500+ homes inspected, RESNET-certified team, partnership with Building Knowledge.",
};

const stats = [
  { number: "2015", label: "Founded", icon: Clock },
  { number: "2,500+", label: "Homes Inspected", icon: Home },
  { number: "50+", label: "Builder Partners", icon: Building2 },
  { number: "10+", label: "Years Experience", icon: Award },
];

const certifications = [
  {
    title: "RESNET Certified",
    description: "Rating Field Inspectors certified by the Residential Energy Services Network",
  },
  {
    title: "Building Knowledge Partnership",
    description: "Working with RESNET Accredited Rating Provider HERS 1998-163",
  },
  {
    title: "ANSI/RESNET/ICC 380",
    description: "All testing performed to national standards with calibrated equipment",
  },
];

const equipment = [
  "Minneapolis Blower Door Systems",
  "Duct Blaster Fans",
  "DG-1000 Digital Manometers",
  "FLIR Thermal Imaging Cameras",
  "Smoke Pencils & Diagnostic Tools",
];

const team = [
  {
    name: "Shaun Ulrich",
    role: "Owner & Rating Field Inspector",
    description:
      "Founded Ulrich Energy Auditing in 2015 with a focus on supporting Twin Cities builders with professional, reliable energy inspection services.",
    certifications: ["RESNET Certified RFI", "10+ Years Experience"],
  },
  {
    name: "Erik Kittilstved",
    role: "Rating Field Inspector",
    description:
      "Experienced field inspector specializing in production builder communities and multi-family projects throughout the Twin Cities metro.",
    certifications: ["RESNET Certified RFI", "Multi-Family Specialist"],
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#214293] to-[#1a357a] py-20 lg:py-28">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#90C050_0%,_transparent_50%)]" />
          </div>
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-6 bg-[#90C050] text-[#214293] hover:bg-[#7db043] font-semibold px-4 py-1.5">
                Twin Cities Energy Inspection Specialists
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                About Ulrich Energy Auditing
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#DDE9FF]">
                Since 2015, we've been the trusted energy inspection partner for Twin Cities builders. 
                We specialize in volume new construction - not one-off existing home audits - because 
                that's where we can deliver the most value to our builder partners.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-[#EFFFD0]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-8 w-8 text-[#214293] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#214293]">{stat.number}</div>
                  <div className="text-sm text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-[#214293] mb-6">Our Story</h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  Ulrich Energy Auditing was founded in 2015 with a clear mission: provide professional, 
                  reliable energy inspection services to Twin Cities builders. We saw an opportunity to 
                  bring building science expertise to the production home market, helping builders navigate 
                  increasingly complex energy codes and certification programs.
                </p>
                <p>
                  Over the past decade, we've inspected over 2,500 homes across the Twin Cities metro. 
                  We've built strong relationships with production builders, custom builders, and multi-family 
                  developers who trust us to keep their projects on schedule and their certifications on track.
                </p>
                <p>
                  Our focus has always been on <strong>new construction partnerships</strong>. We don't do 
                  one-off existing home audits because our systems, expertise, and equipment are optimized 
                  for volume builder work. This specialization allows us to offer competitive pricing, 
                  flexible scheduling, and deep expertise in the programs that matter to builders: ENERGY STAR, 
                  ZERH, Minnesota Green Path, and 45L tax credits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-16 lg:py-20 bg-[#FEFFF8]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h2 className="text-3xl font-bold text-[#214293]">Our Approach</h2>
              <p className="mt-4 text-lg text-gray-600">
                What makes us different from other energy auditors
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              <Card className="border-[#DDE9FF]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#214293] rounded-lg">
                      <Building2 className="h-5 w-5 text-[#90C050]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#214293] mb-2">Builder-First Mindset</h3>
                      <p className="text-sm text-gray-600">
                        We understand construction schedules and the importance of keeping projects 
                        moving. Our scheduling is flexible, our turnaround is fast, and our 
                        communication is proactive.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#DDE9FF]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#214293] rounded-lg">
                      <Users className="h-5 w-5 text-[#90C050]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#214293] mb-2">Consistent Relationships</h3>
                      <p className="text-sm text-gray-600">
                        When you partner with us, you get the same inspector for your entire 
                        community. This builds familiarity with your construction practices and 
                        ensures consistent standards.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#DDE9FF]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#214293] rounded-lg">
                      <Zap className="h-5 w-5 text-[#90C050]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#214293] mb-2">Incentive Expertise</h3>
                      <p className="text-sm text-gray-600">
                        We don't just test - we help you understand and capture value. From 45L 
                        tax credits to utility rebates, we ensure you have the documentation 
                        needed to maximize incentives.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#DDE9FF]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#214293] rounded-lg">
                      <Leaf className="h-5 w-5 text-[#90C050]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#214293] mb-2">Local Knowledge</h3>
                      <p className="text-sm text-gray-600">
                        We've been working in the Twin Cities since 2015. We know Minnesota Climate 
                        Zone 6A, local code amendments, utility territories, and the builders who 
                        operate here.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications & Partnerships */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-[#214293] mb-8">Certifications & Partnerships</h2>
              
              <div className="grid gap-6 md:grid-cols-3 mb-12">
                {certifications.map((cert) => (
                  <Card key={cert.title} className="border-[#90C050]">
                    <CardContent className="pt-6">
                      <BadgeCheck className="h-8 w-8 text-[#90C050] mb-3" />
                      <h3 className="font-semibold text-[#214293] mb-2">{cert.title}</h3>
                      <p className="text-sm text-gray-600">{cert.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Building Knowledge Partnership */}
              <div className="bg-[#214293] rounded-2xl p-8 text-white mb-12">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white/10 rounded-xl">
                    <Award className="h-10 w-10 text-[#90C050]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Building Knowledge Partnership</h3>
                    <p className="text-[#DDE9FF] mb-4">
                      Ulrich Energy Auditing partners with Building Knowledge, a RESNET Accredited 
                      Rating Provider (HERS 1998-163). Building Knowledge, led by President Ed Von Thoma 
                      in Burnsville, MN, has been "helping great builders build better homes" since 1998.
                    </p>
                    <p className="text-[#DDE9FF] mb-4">
                      This partnership allows us to offer complete HERS rating services with the backing 
                      of an established, respected rating provider. Building Knowledge handles quality 
                      assurance and provider oversight while we deliver the field inspection services 
                      that builders need.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-[#90C050] text-[#214293]">RESNET Accredited</Badge>
                      <Badge className="bg-white/20 text-white">Since 1998</Badge>
                      <Badge className="bg-white/20 text-white">HERS 1998-163</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="text-xl font-bold text-[#214293] mb-4">Our Equipment</h3>
                <p className="text-gray-600 mb-4">
                  We use professional-grade equipment calibrated annually to ensure accurate results:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {equipment.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#90C050]" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 lg:py-20 bg-[#FEFFF8]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-[#214293] mb-8 text-center">Our Team</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {team.map((member) => (
                  <Card key={member.name} className="border-[#DDE9FF]">
                    <CardHeader>
                      <div className="w-16 h-16 bg-[#214293] rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold text-[#90C050]">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <CardTitle className="text-[#214293]">{member.name}</CardTitle>
                      <p className="text-[#90C050] font-medium">{member.role}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{member.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {member.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="border-[#90C050] text-[#214293]">
                            {cert}
                          </Badge>
                        ))}
                      </div>
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
                Let's Build Something Together
              </h2>
              <p className="text-lg text-[#DDE9FF] mb-8">
                We're always looking for new builder partners who value quality, reliability, and expertise. 
                Whether you're building your first community or your fiftieth, we'd love to discuss how 
                we can support your projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#90C050] text-[#214293] hover:bg-[#7db043] font-semibold"
                >
                  <Link href="/contact">
                    <Phone className="mr-2 h-5 w-5" />
                    Get in Touch
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
                    <ArrowRight className="ml-2 h-5 w-5" />
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
