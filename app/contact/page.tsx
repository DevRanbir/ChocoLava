"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { StaggeredMenu } from "@/components/StaggeredMenu"
import Lottie from "lottie-react";
import contactAnimation from "@/components/contact-animation.json" assert { type: "json" };
import { PageLoader } from "@/components/page-loader";
import { useTheme } from "@/contexts/theme-context";

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
  X,
  Mail,
  MessageSquare,
  User,
  Send
} from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  })

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/landing' },
    { label: 'Demo', ariaLabel: 'View demo', link: '/demo' },
    { label: 'Reports', ariaLabel: 'check out reports', link: '/dashboard' },
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/DevRanbir/ChocoLava/' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create email content
    const emailSubject = encodeURIComponent(formData.subject || 'Contact Form Submission')
    const emailBody = encodeURIComponent(
      `Hello,

I am contacting you regarding: ${formData.subject}

Name: ${formData.name}

Message:
${formData.message}

Best regards,
${formData.name}`
    )
    
    // Open default mail client with pre-filled content
    const mailtoUrl = `mailto:24bcs11076@cuchd.in?subject=${emailSubject}&body=${emailBody}`
    window.location.href = mailtoUrl
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

  const contactMethods = [
    {
      title: "Emergency Hotline",
      description: "24/7 emergency response hotline for critical situations and immediate system support.",
      icon: Phone,
      contact: "1-800-EMERGENCY",
      color: "bg-red-50 dark:bg-red-900/20"
    },
    {
      title: "Technical Support",
      description: "Get technical assistance and system support for implementation and training.",
      icon: Activity,
      contact: "support@emergencyroute.com",
      color: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Operations Center",
      description: "Direct access to our emergency operations headquarters for coordination.",
      icon: Building,
      contact: "123 Emergency Response Blvd",
      color: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "General Inquiries",
      description: "For general questions, partnerships, and business inquiries contact us here.",
      icon: Mail,
      contact: "24bcs11076@cuchd.in",
      color: "bg-yellow-50 dark:bg-yellow-900/20"
    }
  ]

  return (
    <PageLoader>
      <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}`} style={{ scrollBehavior: 'smooth' }}>
      
      {/* StaggeredMenu */}
      <div className="fixed top-0 left-0 z-50" style={{ height: '100vh', background: '#1a1a1a' }}>
        <StaggeredMenu
          position="left"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor={isDarkMode ? "#ffffff" : "#000000ff"}
          openMenuButtonColor={isDarkMode ? "#ffffff" : "#000000ff"}
          changeMenuColorOnOpen={true}
          colors={['#B19EEF', '#5227FF']}
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
      <section className="py-2 px-4 ml-0 pt-10 sm:pt-14">
        <div className="container mx-auto text-center max-w-4xl">
            <Lottie
                animationData={contactAnimation}
                loop
                autoplay
                style={{ width: '40%', maxWidth: 800, height: 'auto', margin: '0 auto' }}
            />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 mt-3 sm:mt-5">
            Contact <span className="text-red-500">response team</span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Get in touch with our emergency route control experts. 
            We're here to help with system setup, training, and emergency coordination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-500 hover:bg-red-600" asChild>
              <Link href="#contact-form">Send Message</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-8 sm:py-12 md:py-16 px-4" id="contact-methods">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              Contact Methods
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Multiple ways to
              <br className="hidden sm:block" />
              reach our team
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Choose the best way to contact us based on your needs. 
              Emergency situations have dedicated priority channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className={`${method.color} ${isDarkMode ? "bg-gray-800 border-gray-700" : ""} p-4 sm:p-6`}>
                <CardHeader>
                  <method.icon className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 mb-3 sm:mb-4 text-red-500" />
                  <CardTitle className="text-lg sm:text-xl">{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base sm:text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                    {method.contact}
                  </p>
                  <CardDescription className={`text-sm sm:text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {method.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Our Performance
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Trusted by emergency
              <br className="hidden sm:block" />
              services worldwide
            </h2>
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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

      {/* Contact Form Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4" id="contact-form">
        <div className="container mx-auto max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs sm:text-sm px-3 sm:px-4 py-1">
              Emergency Communication Hub
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Connect with our
              <br className="hidden sm:block" />
              <span className="text-red-500 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                emergency response team
              </span>
            </h2>
            <p className={`text-sm sm:text-base md:text-lg max-w-full mx-auto px-4 sm:px-0 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Send us your inquiry and we'll connect you with the right emergency services specialist.
              Our team is available to assist with technical questions, system setup, training, and urgent emergency coordination.
              Please provide as much detail as possible to help us respond quickly and accurately to your needs.
            </p>
          </div>

          {/* Compact Contact Form */}
          <div className="relative">
            <Card className={`${isDarkMode 
              ? "bg-gray-800" 
              : "bg-white"
            } p-4 sm:p-6 md:p-8`}>
              
              <CardHeader className="text-center mb-6">
                <CardDescription className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Fill out the form below. Clicking "Send Message" will open your email client with everything pre-filled.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className={`block text-xs sm:text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-red-100 dark:bg-red-900/30 rounded">
                            <User className="h-3 sm:h-4 w-3 sm:w-4 text-red-500" />
                          </div>
                          <span>Full Name *</span>
                        </div>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`h-10 sm:h-10 md:h-10 text-xs sm:text-sm border-2 rounded-lg transition-all duration-300 ${isDarkMode 
                          ? "bg-gray-700 border-gray-600 focus:border-red-500 focus:bg-gray-600 focus:shadow-md focus:shadow-red-500/25" 
                          : "bg-white border-gray-300 focus:border-red-500 focus:shadow-md focus:shadow-red-500/25"
                        }`}
                      />
                    </div>
                    
                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className={`block text-xs sm:text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                            <Target className="h-3 sm:h-4 w-3 sm:w-4 text-blue-500" />
                          </div>
                          <span>Subject *</span>
                        </div>
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Emergency system inquiry..."
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className={`h-10 sm:h-10 md:h-10 text-xs sm:text-sm border-2 rounded-lg transition-all duration-300 ${isDarkMode 
                          ? "bg-gray-700 border-gray-600 focus:border-blue-500 focus:bg-gray-600 focus:shadow-md focus:shadow-blue-500/25" 
                          : "bg-white border-gray-300 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/25"
                        }`}
                      />
                    </div>
                  </div>
                  
                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className={`block text-xs sm:text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded">
                          <MessageSquare className="h-3 sm:h-4 w-3 sm:w-4 text-green-500" />
                        </div>
                        <span>Your Message *</span>
                      </div>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please provide detailed information about your inquiry including department, location, emergency services needs, timeline, and any technical requirements."
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className={`text-xs sm:text-sm border-2 rounded-lg transition-all duration-300 resize-none ${isDarkMode 
                        ? "bg-gray-700 border-gray-600 focus:border-green-500 focus:bg-gray-600 focus:shadow-md focus:shadow-green-500/25" 
                        : "bg-white border-gray-300 focus:border-green-500 focus:shadow-md focus:shadow-green-500/25"
                      }`}
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transform hover:scale-[1.01] transition-all duration-300 shadow-lg hover:shadow-red-500/30 rounded-lg"
                    >
                      <Send className="h-3 sm:h-4 w-3 sm:w-4 mr-2" />
                      <span className="hidden sm:inline">Send Emergency Message</span>
                      <span className="sm:hidden">Send Message</span>
                      <div className="ml-2 opacity-75">→</div>
                    </Button>
                    
                    <div className="mt-3 p-2 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p className={`text-xs text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <Shield className="h-3 w-3 inline mr-1 text-green-500" />
                        <strong>Secure:</strong> Opens your email client with form data pre-filled
                      </p>
                    </div>
                  </div>
                </form>
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
                <span className="font-bold">Smart City Copilot</span>
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