import { useNavigation } from "@react-navigation/native";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Brain,
  Activity,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Moon,
  Sun,
  Menu,
  X,
  Users,
  Target,
  ActivitySquare,
  Heart,
  Sparkles,
  Upload,
  Stethoscope,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";

export default function LandingPage() {
  const navigation = useNavigation<any>();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div
      className={`w-screen min-h-screen ${isDarkMode ? "dark bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"} transition-colors duration-300 font-sans`}
      style={{ width: '100vw', overflowX: 'hidden' }}
    >
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
                SmileGuard AI
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-blue-500 transition-colors font-medium">
                Features
              </a>
              <a href="#workflow" className="hover:text-blue-500 transition-colors font-medium">
                How it Works
              </a>
              <a href="#testimonials" className="hover:text-blue-500 transition-colors font-medium">
                Testimonials
              </a>
              <a href="#faq" className="hover:text-blue-500 transition-colors font-medium">
                FAQ
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="font-medium hover:text-blue-500 transition-colors">
                  Log in
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Signup")}
                className="px-5 py-2.5 rounded-full bg-blue-600 shadow-lg shadow-blue-500/30"
              >
                <Text className="text-white font-medium">Get Started</Text>
              </TouchableOpacity>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
            >
              <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
                <a href="#features" className="block py-2 font-medium">
                  Features
                </a>
                <a href="#workflow" className="block py-2 font-medium">
                  How it Works
                </a>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text className="block py-2 font-medium text-blue-600 dark:text-blue-400">Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Signup")}
                  className="block py-3 mt-2 text-center rounded-lg bg-blue-600"
                >
                  <Text className="text-white font-medium">Get Started</Text>
                </TouchableOpacity>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
          <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
            <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"></div>
          </div>

          <div className="w-full px-4 sm:px-6 lg:px-16 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="initial"
                animate="animate"
                variants={{
                  initial: { opacity: 0, x: -50 },
                  animate: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.8, staggerChildren: 0.2 },
                  },
                }}
                className="max-w-2xl"
              >
                <motion.div
                  variants={fadeInUp}
                  className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 mb-6"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-semibold">AI-Powered Oral Healthcare</span>
                </motion.div>
                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
                >
                  Predictive Analytics for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
                    Early Intervention
                  </span>
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed"
                >
                  Advanced risk assessment and disease detection using state-of-the-art AI.
                  Transforming dental care from reactive treatment to proactive prevention.
                </motion.p>
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Signup")}
                    className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-blue-600 shadow-lg shadow-blue-500/30 group"
                  >
                    <Text className="text-white font-semibold text-lg flex items-center">
                      Start Assessment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <Text className="text-slate-900 dark:text-white font-semibold text-lg">Doctor Portal</Text>
                  </TouchableOpacity>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative hidden lg:block"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-teal-400 rounded-[3rem] transform rotate-3 opacity-20 blur-2xl"></div>
                <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[2rem] p-6 shadow-2xl">
                  {/* Mockup UI representation */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600">
                        <Activity className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">Overall Health Score</div>
                        <div className="text-2xl font-bold text-green-500">92/100</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-semibold">
                      Low Risk
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-4 flex items-center justify-center">
                          <Brain className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                          <div className="h-3 w-40 bg-slate-100 dark:bg-slate-800 rounded"></div>
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-teal-400 flex items-center justify-center">
                          <span className="text-xs font-bold">98%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Patients Analyzed", value: "10,000+", icon: Users },
                { label: "AI Accuracy", value: "98.5%", icon: Target },
                { label: "Risk Detections", value: "45,000+", icon: ActivitySquare },
                { label: "Partner Clinics", value: "250+", icon: Heart },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 dark:text-blue-400">
                      <stat.icon className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="workflow" className="py-24 relative">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center w-full mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How SmileGuard AI Works</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                A seamless 4-step process to predict, detect, and prevent oral diseases before they
                become severe.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-200 via-teal-200 to-blue-200 dark:from-blue-800 dark:via-teal-800 dark:to-blue-800 z-0"></div>

              {[
                {
                  title: "Upload Image",
                  desc: "Securely upload dental images or take a live scan using your camera.",
                  icon: Upload,
                },
                {
                  title: "AI Analysis",
                  desc: "Our CNN model analyzes the image for microscopic signs of decay.",
                  icon: Brain,
                },
                {
                  title: "Risk Prediction",
                  desc: "Get a comprehensive risk score based on history and visual data.",
                  icon: Activity,
                },
                {
                  title: "Early Intervention",
                  desc: "Receive preventive tips or easily book an appointment with a specialist.",
                  icon: Stethoscope,
                },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="relative z-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none text-center group"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-teal-400 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="w-full px-4 sm:px-6 lg:px-16 relative z-10 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to prioritize your oral health?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join thousands of patients and clinics using SmileGuard AI for predictive dental care.
            </p>
            <TouchableOpacity
              onPress={() => navigation.navigate("Signup")}
              className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-white shadow-xl"
            >
              <Text className="text-blue-600 font-bold text-lg">Get Your Free Assessment</Text>
            </TouchableOpacity>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
          <div className="w-full px-4 sm:px-6 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-blue-500" />
                <span className="text-xl font-bold text-white">SmileGuard AI</span>
              </div>
              <p className="text-sm">Predictive Analytics in Oral Healthcare.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    For Doctors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full px-4 sm:px-6 lg:px-16 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
            &copy; {new Date().getFullYear()} SmileGuard AI. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
