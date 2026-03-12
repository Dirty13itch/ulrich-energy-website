import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Building2,
  Wind,
  ShieldCheck,
  DollarSign,
  FileText,
  Award,
  Zap,
  ArrowRight,
  CheckCircle2,
  Phone,
  Users,
  Leaf,
  BarChart3,
  Thermometer,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardIcon,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Services | Ulrich Energy Auditing",
  description:
    "Comprehensive energy inspection services for Twin Cities builders. HERS ratings, ENERGY STAR certification, IECC compliance, and 45L tax credit documentation for single-family and multi-family new construction.",
};

const volumeBenefits = [
  {
    title: "Streamlined Scheduling",
    description: "Block scheduling for entire communities—we handle 50+ homes per month",
  },
  {
    title: "Consistent Inspector Assignment",
    description: "Same RFI for your community = consistent standards and relationship building",
  },
  {
    title: "Bulk Documentation",
    description: "Simplified 45L tax credit packages for your entire portfolio",
  },
  {
    title: "Predictable Pricing",
    description: "Volume discounts for communities of 10+ homes",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#214293] to-[#0f2654] py-20 lg:py-28">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_#90C050_0%,_transparent_50%)]" />
          </div>
          <div className="container-site relative">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#90C050]">
                Builder Partnership Programs
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Energy Inspection Services for{" "}
                <span className="text-[#90C050]">Volume Builders</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#DDE9FF]">
                We specialize in new construction partnerships—testing homes in groups, 
                not one-offs. From pre-drywall to final inspection, we help Twin Cities 
                builders navigate codes, certifications, and incentives efficiently.
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
              </div>
            </div>
          </div>
        </section>

        {/* Builder Partnership Benefits */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container-site">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0f2654]">
                Why Builders Partner With Us
              </h2>
              <p className="mt-4 text-lg text-[#4a4a4a]">
                We understand production construction. Our systems are built for volume, 
                consistency, and keeping your projects on schedule.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {volumeBenefits.map((benefit) => (
                <Card key={benefit.title} className="text-center">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-[#0f2654] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[#4a4a4a]">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Single Family Section */}
        <section id="single-family" className="py-16 lg:py-20 bg-[#FEFFF8]">
          <div className="container-site">
            <div className="mx-auto max-w-6xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[#214293] rounded-xl">
                  <Home className="h-8 w-8 text-[#90C050]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#214293]">
                    Single Family Detached
                  </p>
                  <h2 className="text-3xl font-bold text-[#0f2654]">
                    Single Family Home Services
                  </h2>
                </div>
              </div>

              <p className="text-lg text-[#4a4a4a] mb-10 max-w-3xl">
                Complete energy inspection services for detached single-family new construction. 
                From production communities to custom builds, we handle code compliance, 
                certifications, and tax credit documentation.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                {/* HERS Rating */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardIcon>
                      <BarChart3 className="h-6 w-6 text-[#214293]" aria-hidden="true" />
                    </CardIcon>
                    <CardTitle>HERS Rating Field Services</CardTitle>
                    <CardDescription>The foundation of energy efficiency verification</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-[#4a4a4a]">
                      HERS (Home Energy Rating System) is the national standard for measuring home energy efficiency. 
                      Think of it as the MPG rating for homes. Minnesota's average HERS score is 49—
                      <strong>51% more efficient than a standard code-built home</strong>.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-[#ECFFCF] p-4 rounded-lg">
                        <h4 className="font-semibold text-[#0f2654] mb-2">What We Do</h4>
                        <ul className="text-sm text-[#4a4a4a] space-y-1">
                          <li>• Pre-drywall thermal enclosure inspection</li>
                          <li>• Blower door testing (ACH50)</li>
                          <li>• Duct leakage testing (CFM25)</li>
                          <li>• Insulation grading (Grade I/II/III)</li>
                          <li>• HVAC system verification</li>
                          <li>• Final HERS rating documentation</li>
                        </ul>
                      </div>
                      <div className="bg-[#DDE9FF] p-4 rounded-lg">
                        <h4 className="font-semibold text-[#0f2654] mb-2">Why It Matters</h4>
                        <ul className="text-sm text-[#4a4a4a] space-y-1">
                          <li>• Required for ENERGY STAR & ZERH</li>
                          <li>• Qualifies for 45L tax credits</li>
                          <li>• Minnesota Green Path requirement</li>
                          <li>• HERS scores appear in MLS listings</li>
                          <li>• Homes sell for 2.7% more (Freddie Mac)</li>
                          <li>• Consumer recognition & marketing</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#737373]">
                      <Award className="h-4 w-4 text-[#90C050]" aria-hidden="true" />
                      <span>RESNET-certified Rating Field Inspectors | Partnership with Building Knowledge (HERS 1998-163)</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Blower Door */}
                <Card>
                  <CardHeader>
                    <CardIcon>
                      <Wind className="h-6 w-6 text-[#214293]" aria-hidden="true" />
                    </CardIcon>
                    <CardTitle>Blower Door Testing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-[#4a4a4a]">
                      Measures air leakage (ACH50) to verify airtight construction. 
                      Required by Minnesota code and all certification programs.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#4a4a4a]">IECC 2021 Code:</span>
                        <span className="font-semibold text-[#0f2654]">≤3.0 ACH50</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#4a4a4a]">ENERGY STAR v3.2:</span>
                        <span className="font-semibold text-[#0f2654]">≤3.0 ACH50</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#4a4a4a]">ZERH Climate Zone 6:</span>
                        <span className="font-semibold text-[#0f2654]">≤3.0 ACH50</span>
                      </div>
                    </div>
                    <div className="bg-[#ECFFCF] p-3 rounded text-sm">
                      <strong>When tested:</strong> Pre-drywall (rough) and Final (post-construction)
                    </div>
                  </CardContent>
                </Card>

                {/* Duct Leakage */}
                <Card>
                  <CardHeader>
                    <CardIcon>
                      <Wind className="h-6 w-6 text-[#214293]" aria-hidden="true" />
                    </CardIcon>
                    <CardTitle>Duct Leakage Testing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-[#4a4a4a]">
                      IECC 2021 requires <strong>all ducts to be tested</strong>—no exemptions. 
                      We measure leakage to outside (CFM25) and total system leakage.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#4a4a4a]">Ducts Outside Envelope:</span>
                        <span className="font-semibold text-[#0f2654]">≤4 CFM25/100 ft²</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#4a4a4a]">Ducts Inside Envelope:</span>
                        <span className="font-semibold text-[#0f2654]">≤8 CFM25/100 ft²</span>
                      </div>
                    </div>
                    <div className="bg-[#ECFFCF] p-3 rounded text-sm">
                      <strong>Pro tip:</strong> Tighter ducts = better efficiency & comfort
                    </div>
                  </CardContent>
                </Card>

                {/* Insulation Grading */}
                <Card>
                  <CardHeader>
                    <CardIcon>
                      <Thermometer className="h-6 w-6 text-[#214293]" aria-hidden="true" />
                    </CardIcon>
                    <CardTitle>Insulation Grading</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-[#4a4a4a]">
                      RESNET Grade I, II, or III assessment during pre-drywall inspection. 
                      Determines if insulation meets prescriptive code or certification requirements.
                    </p>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#90C050]" aria-hidden="true" />
                        <span><strong>Grade I:</strong> Full contact, no gaps</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#f59e0b]" aria-hidden="true" />
                        <span><strong>Grade II:</strong> Minor imperfections</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ef4444]" aria-hidden="true" />
                        <span><strong>Grade III:</strong> Substantial gaps</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#737373]">
                      ENERGY STAR requires Grade I in most climate zones
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-2xl p-8 border border-[#DDE9FF]">
                <h3 className="text-2xl font-bold text-[#0f2654] mb-6 flex items-center gap-3">
                  <Award className="h-7 w-7 text-[#90C050]" aria-hidden="true" />
                  Single Family Certifications & Programs
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border-[#90C050]">
                    <CardHeader className="bg-[#ECFFCF]/30">
                      <div className="flex items-center justify-between">
                        <CardTitle>ENERGY STAR v3.2</CardTitle>
                        <span className="inline-flex items-center rounded-full bg-[#90C050] px-3 py-1 text-sm font-semibold text-[#0f2654]">
                          $2,500 45L
                        </span>
                      </div>
                      <CardDescription>
                        EPA's trusted efficiency label—15%+ better than code
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      <div className="text-sm text-[#4a4a4a] space-y-1">
                        <p><strong>Key Requirements:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>≤3.0 ACH50 blower door</li>
                          <li>≤4% duct leakage to outside</li>
                          <li>Grade I insulation</li>
                          <li>HVAC properly sized (Manual J)</li>
                          <li>High-efficiency water heater</li>
                          <li>100% high-efficacy lighting</li>
                        </ul>
                      </div>
                      <div className="border-t border-[#DDE9FF] pt-3">
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-[#90C050]" aria-hidden="true" />
                          <span className="font-semibold text-[#0f2654]">Qualifies for $2,500 45L tax credit</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#214293]">
                    <CardHeader className="bg-[#DDE9FF]/30">
                      <div className="flex items-center justify-between">
                        <CardTitle>ZERH Version 2</CardTitle>
                        <span className="inline-flex items-center rounded-full bg-[#214293] px-3 py-1 text-sm font-semibold text-white">
                          $5,000 45L
                        </span>
                      </div>
                      <CardDescription>
                        DOE Zero Energy Ready Home—"so efficient, solar could offset all energy use"
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      <div className="text-sm text-[#4a4a4a] space-y-1">
                        <p><strong>Everything in ENERGY STAR PLUS:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Enhanced thermal envelope (exceeds 2015 IECC)</li>
                          <li>HRV/ERV required (Climate Zone 6)</li>
                          <li>Ducts in conditioned space (or optimized)</li>
                          <li>Indoor airPLUS certification</li>
                          <li>PV-ready checklist (conduit, space)</li>
                          <li>Low-VOC materials & radon resistance</li>
                        </ul>
                      </div>
                      <div className="border-t border-[#DDE9FF] pt-3">
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-[#90C050]" aria-hidden="true" />
                          <span className="font-semibold text-[#0f2654]">Qualifies for $5,000 45L tax credit</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Minnesota Green Path */}
                <div className="mt-6 bg-[#FEFFF8] rounded-xl p-6 border border-[#90C050]">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#90C050] rounded-lg">
                      <Leaf className="h-6 w-6 text-[#0f2654]" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-[#0f2654] mb-2">Minnesota Green Path</h4>
                      <p className="text-[#4a4a4a] mb-4">
                        Minnesota's leading green building program from Housing First Minnesota. 
                        <strong>70% of Parade of Homes entries</strong> now participate.
                      </p>
                      
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-[#DDE9FF]">
                          <span className="inline-block mb-2 rounded bg-[#f5f5f5] px-2 py-1 text-xs font-semibold text-[#4a4a4a]">Base Level</span>
                          <h5 className="font-semibold text-[#0f2654]">Energy Tested</h5>
                          <p className="text-sm text-[#4a4a4a] mt-1">HERS rating + blower door test. FREE for Housing First Minnesota members.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-[#90C050]">
                          <span className="inline-block mb-2 rounded bg-[#ECFFCF] px-2 py-1 text-xs font-semibold text-[#0f2654]">Advanced</span>
                          <h5 className="font-semibold text-[#0f2654]">Advanced Certified</h5>
                          <p className="text-sm text-[#4a4a4a] mt-1">HERS ≤47 + 20 points across 3+ categories. $79 fee (waived by Xcel Energy).</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-[#214293]">
                          <span className="inline-block mb-2 rounded bg-[#DDE9FF] px-2 py-1 text-xs font-semibold text-[#0f2654]">Master</span>
                          <h5 className="font-semibold text-[#0f2654]">Master Certified</h5>
                          <p className="text-sm text-[#4a4a4a] mt-1">HERS ≤45 + 50 points across 4+ categories. Premium marketing designation.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-[#214293] to-[#0f2654]">
          <div className="container-site">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Partner on Your Next Community?
              </h2>
              <p className="text-lg text-[#DDE9FF] mb-8">
                Whether you're building 10 homes or 100, we have the capacity, expertise, 
                and systems to support your project.
              </p>
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
