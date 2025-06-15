import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Users, History, ChevronRight, Shield, BadgeCheck, CreditCard, ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-slate-900/90 backdrop-blur-md shadow-sm" : ""
        }`}>
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between flex-wrap">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 financial-gradient rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">Transsacto</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {["features", "security", "testimonials", "faq"].map((section) => (
                <Button key={section} variant="ghost" className="dark:hover:bg-slate-800/50" asChild>
                  <a href={`#${section}`}>{section.charAt(0).toUpperCase() + section.slice(1)}</a>
                </Button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="hidden md:flex items-center gap-2">
                <Link to="/signin">
                  <Button variant="ghost" className="dark:hover:bg-slate-800/50">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button className="financial-gradient dark:text-white">Get Started</Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 bg-white dark:bg-slate-900 border-t dark:border-slate-800 mt-3">
              <div className="flex flex-col space-y-3">
                {["features", "security", "testimonials", "faq"].map((section) => (
                  <a key={section} href={`#${section}`} className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                ))}
                <div className="pt-2 border-t dark:border-slate-800">
                  <Link to="/signin" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">Sign In</Link>
                  <Link to="/signup" className="block mt-2 px-4 py-2 financial-gradient text-white text-center rounded-md dark:text-white">Get Started</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Text Content */}
            <div className="lg:w-1/2 w-full space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/60 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium mx-auto lg:mx-0">
                <BadgeCheck size={16} />
                <span>Trusted by users worldwide</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
                Your Money, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Your Control</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Transsacto makes managing finances simple with secure transactions, smart beneficiary management, and seamless money transfers.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link to="/signup">
                  <Button size="lg" className="financial-gradient text-lg h-14 px-8 dark:text-white">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="pt-4 flex justify-center lg:justify-start items-center gap-2 text-gray-500 dark:text-gray-400">
                <Shield size={16} />
                <span className="text-sm">Bank-level security with end-to-end encryption</span>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="lg:w-1/2 hidden md:block w-full relative">
              <div className="relative z-10 animate-float">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold dark:text-white">Account Balance</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Updated just now</p>
                    </div>
                    <div className="w-12 h-12 financial-gradient rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Available Balance</p>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">$12,540.67</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Income</p>
                      <p className="text-lg font-semibold text-green-600 dark:text-green-400">+$4,500.00</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Expenses</p>
                      <p className="text-lg font-semibold text-red-600 dark:text-red-400">-$2,360.50</p>
                    </div>
                  </div>
                  <Button className="financial-gradient w-full dark:text-white">
                    <Send className="mr-2 h-4 w-4" />
                    Send Money
                  </Button>
                </div>

                {/* Floating Cards */}
                <div className="absolute -bottom-12 -right-12 w-64 h-48 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recent Transaction</h4>
                  <div className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-800/40 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-green-700 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium dark:text-white">Payment Received</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">From: Alice Smith</p>
                    </div>
                    <p className="ml-auto font-semibold text-green-600 dark:text-green-400">+$1,500.00</p>
                  </div>
                </div>

                <div className="absolute -top-10 -left-10 w-48 h-32 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900 dark:text-white">Beneficiaries</h4>
                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs flex items-center justify-center rounded-full">3</span>
                  </div>
                  <div className="flex -space-x-2">
                    {["JS", "MB", "AW"].map((initials, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs border-2 border-white dark:border-slate-800 ${["bg-indigo-500", "bg-green-500", "bg-amber-500"][i]
                        }`}>{initials}</div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs border-2 border-white dark:border-slate-800">+2</div>
                  </div>
                </div>
              </div>

              {/* Background decorations */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 bottom-0 right-0 w-60 h-60 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 px-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Designed for Your Financial Success
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Our platform comes with everything you need to manage your money efficiently and securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="card-hover dark:bg-slate-800/50 border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="mx-auto feature-icon financial-gradient">
                  <Send className="w-6 h-6" />
                </div>
                <CardTitle className="dark:text-white">Fast Transfers</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Send money instantly to your beneficiaries with our secure and reliable transfer system.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                  <li className="flex items-center justify-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Instant transfers 24/7</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Low transfer fees</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Transaction confirmations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover dark:bg-slate-800/50 border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="mx-auto feature-icon financial-gradient">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle className="dark:text-white">Beneficiary Management</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Easily add, edit and organize your trusted beneficiaries for quicker transfers.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                  <li className="flex items-center justify-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Unlimited beneficiaries</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Custom categorization</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Beneficiary verification</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover dark:bg-slate-800/50 border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="mx-auto feature-icon financial-gradient">
                  <History className="w-6 h-6" />
                </div>
                <CardTitle className="dark:text-white">Transaction History</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Keep track of all your financial activities with comprehensive transaction reports.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                  <li className="flex items-center justify-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Detailed analytics</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Advanced filtering options</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Export statements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="border-2 shadow-sm dark:bg-slate-800/50">
                Explore All Features
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-white dark:bg-slate-900/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text content */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/60 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mx-auto lg:mx-0">
                <Shield size={16} className="text-green-600 dark:text-green-400" />
                <span>Advanced Security Features</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Your Security Is Our Top Priority
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                We use industry-leading security measures to ensure your data and transactions are always protected.
              </p>

              <div className="space-y-4">
                {/* Security Features */}
                <div className="bg-white dark:bg-slate-800/50 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    End-to-End Encryption
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    All data is encrypted both in transit and at rest, ensuring your information remains private.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800/50 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Two-Factor Authentication
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Add an extra layer of security to your account with SMS or authenticator app verification.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800/50 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Fraud Detection
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Advanced AI-powered systems monitor transactions to detect and prevent suspicious activities.
                  </p>
                </div>
              </div>
            </div>

            {/* Image and stats */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 shadow-xl">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiPjxwYXRoIGQ9Ik0xNyAxMmgtLjVtLjUtN2gtLjVtLjUgMTRoLS41TTEyIDBWLjVtMCAyM1YuNW0tNSAxM2gtLjVNNyA1aC0uNU0yLjYyNyA3LjYyN0wuNSA5Ljc1NG0yMi45OTUgNC40OTNsLTIuMTIgMi4xMk0yLjYyMiAxNi4zNzVsLTIuMTIxIDIuMTIxbTIwLjg3NS0xMi45OThsMi4xMjEtMi4xMiIgLz48L3N2Zz4=')] opacity-10"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                    <Shield className="w-16 h-16 mb-4" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-2">Bank-Level Security</h3>
                    <p className="text-base sm:text-lg text-blue-100 text-center max-w-sm">
                      Your data and transactions are protected with industry-leading encryption and security protocols.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-xs">
                      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
                        <p className="text-base font-semibold">256-bit</p>
                        <p className="text-sm text-blue-100">Encryption</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
                        <p className="text-base font-semibold">2FA</p>
                        <p className="text-sm text-blue-100">Authentication</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
                        <p className="text-base font-semibold">24/7</p>
                        <p className="text-sm text-blue-100">Monitoring</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
                        <p className="text-base font-semibold">ISO 27001</p>
                        <p className="text-sm text-blue-100">Certified</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative blobs */}
                <div className="absolute -z-10 -bottom-8 -right-8 w-32 h-32 sm:w-40 sm:h-40 bg-indigo-400/30 dark:bg-indigo-600/20 rounded-full blur-2xl"></div>
                <div className="absolute -z-10 -top-8 -left-8 w-24 h-24 sm:w-32 sm:h-32 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our users have to say about their experience with Transsacto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Small Business Owner",
                initials: "SJ",
                bg: "bg-blue-600",
                text: "Transsacto has completely transformed how I manage my finances. The transfer process is so quick and the beneficiary management is exactly what I needed.",
              },
              {
                name: "Michael Brown",
                role: "Financial Analyst",
                initials: "MB",
                bg: "bg-green-600",
                text: "The security features give me peace of mind when transferring large sums. Their customer support is also exceptionally responsive and helpful.",
              },
              {
                name: "Jessica Parker",
                role: "Freelance Designer",
                initials: "JP",
                bg: "bg-purple-600",
                text: "The interface is so intuitive and user-friendly. I can easily track all my transactions and manage my beneficiaries without any hassle.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card p-6 rounded-xl shadow-md bg-white dark:bg-slate-800/50 transition duration-300"
              >
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{`"${testimonial.text}"`}</p>
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full ${testimonial.bg} flex items-center justify-center text-white font-semibold`}>
                    {testimonial.initials}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              Find answers to the most common questions about our platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "How secure is Transsacto?",
                  answer:
                    "Transsacto employs bank-level security with 256-bit encryption, two-factor authentication, and continuous security monitoring. All data is encrypted both in transit and at rest to ensure maximum protection of your information.",
                },
                {
                  question: "Are there any fees for transferring money?",
                  answer:
                    "We keep our fee structure simple and transparent. Domestic transfers are free, while international transfers have a small fee based on the destination country. You'll always see the fee before confirming any transaction.",
                },
                {
                  question: "How quickly are transfers processed?",
                  answer:
                    "Domestic transfers between Transsacto users are instant. Bank transfers typically process within 1-2 business days, depending on your bank. International transfers may take 2-4 business days to complete.",
                },
                {
                  question: "How do I add a new beneficiary?",
                  answer:
                    "Adding a beneficiary is simple. Navigate to the Beneficiaries page, click 'Add New Beneficiary,' enter their details including name and account information, then verify and save. They'll be instantly available for transfers.",
                },
                {
                  question: "Is there a mobile app available?",
                  answer:
                    "Yes, Transsacto has mobile apps for both iOS and Android devices. They offer all the functionality of our web platform optimized for your mobile experience, including biometric authentication for added security.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5 sm:p-6"
                >
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 sm:mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Still have questions?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-xl mx-auto">
                Our support team is ready to help you with any questions you might have.
              </p>
              <Button
                size="lg"
                className="financial-gradient dark:from-blue-600 dark:to-indigo-600 text-white"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of users who already trust Transsacto for their financial management needs.
          </p>

            <Link to="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 text-lg h-14 px-8"
              >
                Create Free Account
              </Button>
            </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          {/* Top Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 financial-gradient rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">Transsacto</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Your trusted partner for secure, fast, and reliable financial transactions.
              </p>
              <div className="flex gap-4 flex-wrap">
                {/* Social Icons */}
                {[
                  {
                    label: "Twitter",
                    svg: (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547..." />
                      </svg>
                    ),
                  },
                  {
                    label: "LinkedIn",
                    svg: (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761..." />
                      </svg>
                    ),
                  },
                  {
                    label: "Facebook",
                    svg: (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523..." clipRule="evenodd" />
                      </svg>
                    ),
                  },
                  {
                    label: "Instagram",
                    svg: (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43..." clipRule="evenodd" />
                      </svg>
                    ),
                  },
                ].map(({ label, svg }, index) => (
                  <a key={index} href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label={label}>
                    <span className="sr-only">{label}</span>
                    {svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Money Transfers</a></li>
                <li><a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Beneficiary Management</a></li>
                <li><a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Transaction History</a></li>
                <li><a href="#security" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Security Features</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Mobile Apps</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Press</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Blog</a></li>
                <li><a href="#testimonials" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Testimonials</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">FAQs</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} Transsacto. All rights reserved.
            </p>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}