"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StaggeredMenu } from "@/components/StaggeredMenu"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/landing' },
    { label: 'Demo', ariaLabel: 'Try the demo', link: '/demo' },
    { label: 'Features', ariaLabel: 'View features', link: '#features' },
    { label: 'Solutions', ariaLabel: 'View solutions', link: '#solutions' },
    { label: 'FAQ', ariaLabel: 'View frequently asked questions', link: '#documentation' },
    { label: 'Contacts', ariaLabel: 'View contacts', link: '#contacts' }
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

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
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}`} style={{ scrollBehavior: 'smooth' }}>
      {/* Overlay when menu is open - positioned behind menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 transition-opacity duration-300 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* StaggeredMenu - only cover viewport when menu is open */}
      <div 
        className="fixed top-0 left-0 z-50" 
        style={{ 
          width: isMenuOpen ? '100vw' : 'auto', 
          height: isMenuOpen ? '100vh' : 'auto',
          pointerEvents: isMenuOpen ? 'auto' : 'none' 
        }}
      >
        <div style={{ 
          width: isMenuOpen ? '100%' : 'auto', 
          height: isMenuOpen ? '100%' : 'auto',
          pointerEvents: isMenuOpen ? 'auto' : 'none' 
        }}>
          <StaggeredMenu
            position="left"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#000000ff"
            openMenuButtonColor="#000000ff"
            changeMenuColorOnOpen={true}
            colors={['#B19EEF', '#5227FF']}
            //logoUrl="/path-to-your-logo.svg"
            accentColor="#ff6b6b"
            onMenuOpen={() => {
              console.log('Menu opened')
              setIsMenuOpen(true)
            }}
            onMenuClose={() => {
              console.log('Menu closed')
              setIsMenuOpen(false)
            }}
            isDarkMode={isDarkMode}
            onThemeToggle={toggleDarkMode}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-14px-4">
        <div className="container mx-auto text-center max-w-4xl">
            <DotLottieReact
                src="https://lottie.host/520859b8-949b-475f-b9da-c0a50b49dfb2/Htnlwp0wR4.lottie"
                loop
                autoplay
            />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 mt-5">
            Emergency route control
            <br />
            <span className="text-red-500">for critical response</span>
          </h1>
          <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Advanced mapping and route optimization for emergency services. 
            Get ambulances and fire trucks to destinations faster with AI-powered routing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-500 hover:bg-red-600" asChild>
              <Link href="/" style={{ pointerEvents: 'none' }}>Coming Soon</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Map Demo Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className={`rounded-2xl overflow-hidden border ${isDarkMode ? "border-gray-800 bg-gray-800" : "border-gray-200 bg-gray-50"}`}>
            {/* Map Placeholder */}
            <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-blue-500" />
                  <p className={`text-lg font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Interactive Emergency Route Demo
                  </p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Real-time routing and traffic light optimization
                  </p>
                </div>
              </div>
              
              {/* Status indicators */}
              <div className="absolute top-4 left-4 space-y-2">
                <Badge className="bg-green-500 text-white">Emergency Route Active</Badge>
                <Badge variant="outline" className={`${isDarkMode ? "text-gray-300 border-gray-600" : ""}`}>
                  Response time optimized
                </Badge>
              </div>
              
              {/* Control panel indicator */}
              <div className="absolute bottom-4 right-4">
                <Button size="sm" className="bg-red-500 hover:bg-red-600">
                  <Zap className="h-4 w-4 mr-2" />
                  Control Panel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4" id="features">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              Emergency Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Saving lives through
              <br />
              faster response
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Emergency services trust our platform to reduce response times 
              and coordinate critical medical operations effectively.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className={`text-center ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-red-500" />
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {additionalStats.map((stat, index) => (
              <Card key={index} className={`text-center ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4" id="solutions">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Emergency Solutions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Built for critical emergency
              <br />
              response
            </h2>
            <p className={`text-lg mt-4 max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Advanced mapping technology designed specifically for emergency services, 
              with real-time coordination and intelligent route optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`${feature.color} ${isDarkMode ? "bg-gray-800 border-gray-700" : ""} p-6`}>
                <CardHeader>
                  <feature.icon className="h-12 w-12 mb-4 text-red-500" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4" id="documentation">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              FAQ
            </Badge>
            <h2 className="text-3xl font-bold">Frequently asked questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className={`${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600 dark:text-blue-400">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to improve emergency
            <br />
            response?
          </h2>
          <p className={`text-lg mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
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
      <section className="py-16 px-4" id="contacts">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              Emergency Contacts
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              24/7 Emergency Support
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Our emergency response team is available around the clock to assist 
              with critical situations and system support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : ""} p-6`}>
              <CardHeader>
                <Phone className="h-12 w-12 mb-4 text-red-500" />
                <CardTitle className="text-xl">Emergency Hotline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-500 mb-2">1-800-EMERGENCY</p>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  24/7 emergency response hotline for critical situations and immediate system support.
                </p>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : ""} p-6`}>
              <CardHeader>
                <Building className="h-12 w-12 mb-4 text-blue-500" />
                <CardTitle className="text-xl">Operations Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-2">Emergency Operations HQ</p>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  123 Emergency Response Blvd<br />
                  Crisis City, CC 12345<br />
                  Available 24/7 for coordination
                </p>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : ""} p-6`}>
              <CardHeader>
                <Activity className="h-12 w-12 mb-4 text-green-500" />
                <CardTitle className="text-xl">Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-2">support@emergencyroute.com</p>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Technical support for system issues, training, and implementation assistance.
                </p>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : ""} p-6`}>
              <CardHeader>
                <Shield className="h-12 w-12 mb-4 text-purple-500" />
                <CardTitle className="text-xl">Emergency Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-2">emergency@emergencyroute.com</p>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
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
  )
}