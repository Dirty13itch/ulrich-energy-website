import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#DDE9FF] bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-[#214293] text-lg mb-4">
              Ulrich Energy Auditing
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Professional HERS rating field services for Twin Cities builders.
              ENERGY STAR, ZERH certification, and 45L tax credit documentation.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-[#90C050]" />
              <span>Twin Cities Metro, Minnesota</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#214293] mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#214293]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-[#214293]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#214293]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#214293]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-[#214293] mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">HERS Rating Field Services</li>
              <li className="text-gray-600">Blower Door Testing</li>
              <li className="text-gray-600">Duct Leakage Testing</li>
              <li className="text-gray-600">ENERGY STAR Certification</li>
              <li className="text-gray-600">45L Tax Credit Documentation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#214293] mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:952-240-4369"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#214293]"
                >
                  <Phone className="h-4 w-4 text-[#90C050]" />
                  (952) 240-4369
                </a>
              </li>
              <li>
                <a
                  href="mailto:Shaun.Ulrich@UlrichEnergyAuditing.com"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#214293]"
                >
                  <Mail className="h-4 w-4 text-[#90C050]" />
                  Shaun.Ulrich@UlrichEnergyAuditing.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#DDE9FF] mt-8 pt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Ulrich Energy Auditing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
