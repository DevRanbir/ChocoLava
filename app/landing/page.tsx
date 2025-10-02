"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StaggeredMenu } from "@/components/StaggeredMenu"
import Lottie from "lottie-react";
import landingAnimation from "@/components/landing-animation.json" assert { type: "json" };
import { PageLoader } from "@/components/page-loader";
import { useTheme } from "@/contexts/theme-context";
import PillNav from '@/components/PillNav';
import logo from '@/public/favicon.svg';

import { 
  MapPin, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  Activity, 
  Target, 
  Building,
  Phone,
  Ambulance,
  TrendingUp,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: 'Demo', ariaLabel: 'View demo', link: '/demo' },
    { label: 'Reports', ariaLabel: 'check out reports', link: '/dashboard' },
    { label: 'Contact', ariaLabel: 'Contact us', link: '/contact' },
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/DevRanbir/ChocoLava/' },
  ];

  const stats = [
    { value: "45%", label: "Faster response times", icon: TrendingUp },
    { value: "99.9%", label: "System uptime", icon: Activity },
    { value: "24/7", label: "Emergency support", icon: Clock },
    { value: "500+", label: "Cities served", icon: Building }
  ]

  const additionalStats = [
    { value: "2.3M", label: "Emergency calls handled", icon: Phone },
    { value: "15sec", label: "Average route calculation", icon: Target },
    { value: "98%", label: "Accuracy rate", icon: CheckCircle },
    { value: "150+", label: "Emergency departments", icon: Ambulance }
  ]

  const features = [
    {
      title: "Real-time vehicle tracking",
      description: "Monitor all emergency vehicles in real-time with GPS precision and live status updates.",
      icon: MapPin,
      color: "bg-red-50 dark:bg-red-900/20"
    },
    {
      title: "AI route optimization",
      description: "Advanced algorithms calculate the fastest routes considering traffic, road conditions, and priorities.",
      icon: Zap,
      color: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      title: "Multi-vehicle coordination",
      description: "Coordinate multiple emergency vehicles with intelligent dispatching and resource allocation.",
      icon: Users,
      color: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Emergency analytics",
      description: "Comprehensive analytics and reporting to improve response times and operational efficiency.",
      icon: BarChart3,
      color: "bg-green-50 dark:bg-green-900/20"
    }
  ]

  const faqs = [
    {
      question: "How fast can the system calculate emergency routes?",
      answer: "Our AI-powered system calculates optimal emergency routes in under 15 seconds, considering real-time traffic, road conditions, and emergency priorities."
    },
    {
      question: "What types of emergency vehicles are supported?",
      answer: "Our platform supports all emergency vehicles including ambulances, fire trucks, police vehicles, and specialized rescue units with customized routing for each type."
    },
    {
      question: "Is the system available 24/7?",
      answer: "Yes, our emergency route control system operates 24/7 with 99.9% uptime and dedicated emergency support for critical situations."
    },
    {
      question: "How does the system handle multiple simultaneous emergencies?",
      answer: "Our intelligent dispatch system can coordinate multiple emergency vehicles simultaneously, optimizing resources, allocation and preventing conflicts in routing."
    }
  ]

  return (
    <PageLoader>
      <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}`} style={{ scrollBehavior: 'smooth' }}>
      
      {/* PillNav positioned at bottom right */}
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Demo', href: '/demo' },
          { label: 'Contact', href: '/contact' }
        ]}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor={isDarkMode ? "#ffffff" : "#0000007a"}
        pillColor={isDarkMode ? "#000000" : "#ffffffff"}
        hoveredPillTextColor={isDarkMode ? "#000000" : "#ffffff"}
        pillTextColor={isDarkMode ? "#ffffff" : "#0000007a"}
        hidden={true}
      />

      {/* Top Header */}
      <header className="fixed top-0 right-0 z-40 p-3 sm:p-4 md:p-6">
        <div className="text-right">
          <h2 className={`text-sm sm:text-lg md:text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Smart City Copilot
          </h2>
        </div>
      </header>

      {/* Divider */}
      <div className={`fixed top-12 sm:top-14 md:top-16 right-3 sm:right-4 md:right-6 w-32 sm:w-40 md:w-48 h-px ${isDarkMode ? "bg-gray-600" : "bg-gray-300"} z-40`}></div>
  
      {/* Hero Section */}
      <section className="py-8 px-4 pt-16 sm:pt-20 md:pt-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="lottie-container w-full max-w-[800px] mx-auto mb-4">
            <Lottie
              animationData={landingAnimation}
              loop
              autoplay
              style={{ 
                width: '100%', 
                height: 'auto',
                maxWidth: '800px',
                aspectRatio: '16/9'
              }}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 mt-2 sm:-mt-6 md:-mt-4">
            Emergency route control
            <br className="hidden sm:block" />
            <span className="text-red-500">for critical response</span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Advanced mapping and route optimization for emergency services. 
            Get ambulances and fire trucks to destinations faster with AI-powered routing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-500 hover:bg-red-600" asChild>
              <Link href="/contact">Contact Now</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Features Grid */}
      <section className="py-8 sm:py-12 md:py-16 px-4" id="features">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              Emergency Features
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Saving lives through
              <br className="hidden sm:block" />
              faster response
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Emergency services trust our platform to reduce response times 
              and coordinate critical medical operations effectively.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className={`text-center ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                  <stat.icon className="h-6 sm:h-7 md:h-8 w-6 sm:w-7 md:w-8 mx-auto mb-2 text-red-500" />
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16">
            {additionalStats.map((stat, index) => (
              <Card key={index} className={`text-center ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                  <stat.icon className="h-6 sm:h-7 md:h-8 w-6 sm:w-7 md:w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4" id="solutions">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Emergency Solutions
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Built for critical emergency
              <br className="hidden sm:block" />
              response
            </h2>
            <p className={`text-base sm:text-lg mt-4 max-w-2xl mx-auto px-4 sm:px-0 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Advanced mapping technology designed specifically for emergency services, 
              with real-time coordination and intelligent route optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`${feature.color} ${isDarkMode ? "bg-gray-800 border-gray-700" : ""} p-4 sm:p-6`}>
                <CardHeader>
                  <feature.icon className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 mb-3 sm:mb-4 text-red-500" />
                  <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-sm sm:text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4" id="documentation">
        <div className="container mx-auto max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold">Frequently asked questions</h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className={`${isDarkMode ? "bg-gray-800 border-gray-700" : ""} p-4 sm:p-6`}>
                <CardHeader className="p-0 pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg text-blue-600 dark:text-blue-400">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className={`text-sm sm:text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to improve emergency
            <br className="hidden sm:block" />
            response?
          </h2>
          <p className={`text-base sm:text-lg mb-6 sm:mb-8 px-4 sm:px-0 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Join emergency services worldwide using our platform to save 
            lives through faster, smarter routing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-500 hover:bg-red-600" asChild>
              <Link href="/demo">Start Emergency Route</Link>
            </Button>
            <Button size="lg" variant="outline">
              Contact Emergency Services
            </Button>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4" id="contacts">
        <div className="container mx-auto max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              Emergency Contacts
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              24/7 Emergency Support
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Our emergency response team is available around the clock to assist 
              with critical situations and system support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : ""} p-4 sm:p-6`}>
              <CardHeader>
                <Phone className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 mb-3 sm:mb-4 text-red-500" />
                <CardTitle className="text-lg sm:text-xl">Emergency Hotline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl sm:text-2xl font-bold text-red-500 mb-2">1-800-EMERGENCY</p>
                <p className={`text-sm sm:text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  24/7 emergency response hotline for critical situations and immediate system support.
                </p>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : ""} p-4 sm:p-6`}>
              <CardHeader>
                <Building className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 mb-3 sm:mb-4 text-blue-500" />
                <CardTitle className="text-lg sm:text-xl">Operations Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base sm:text-lg font-semibold mb-2">Emergency Operations HQ</p>
                <p className={`text-sm sm:text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  123 Emergency Response Blvd<br />
                  Crisis City, CC 12345<br />
                  Available 24/7 for coordination
                </p>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : ""} p-4 sm:p-6`}>
              <CardHeader>
                <Activity className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 mb-3 sm:mb-4 text-green-500" />
                <CardTitle className="text-lg sm:text-xl">Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base sm:text-lg font-semibold mb-2">support@emergencyroute.com</p>
                <p className={`text-sm sm:text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Technical support for system issues, training, and implementation assistance.
                </p>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : ""} p-4 sm:p-6`}>
              <CardHeader>
                <Shield className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 mb-3 sm:mb-4 text-purple-500" />
                <CardTitle className="text-lg sm:text-xl">Emergency Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base sm:text-lg font-semibold mb-2">emergency@emergencyroute.com</p>
                <p className={`text-sm sm:text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Direct line to emergency coordination team for dispatch and route optimization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"} py-12`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-red-500" />
                <span className="font-bold">EmergencyRoute</span>
              </div>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Advanced emergency route 
                control and traffic optimization 
                for critical response scenarios.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className={`space-y-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <li>Real-time Routing</li>
                <li>Vehicle Tracking</li>
                <li>Traffic Management</li>
                <li>Emergency Analytics</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className={`space-y-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <li>Ambulance Services</li>
                <li>Fire Departments</li>
                <li>Police Operations</li>
                <li>Rescue Operations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className={`space-y-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <li>Documentation</li>
                <li>24/7 Emergency Support</li>
                <li>Training & Onboarding</li>
                <li>System Status</li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"} mt-8 pt-8 flex flex-col md:flex-row justify-between items-center`}>
            <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              © 2024 EmergencyRoute. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className={`text-sm hover:text-red-500 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-sm hover:text-red-500 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Terms of Service
              </a>
              <a href="#" className={`text-sm hover:text-red-500 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Emergency Protocols
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </PageLoader>
  )
}