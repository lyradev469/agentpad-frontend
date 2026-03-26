'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Zap, Shield, Brain, Rocket } from 'lucide-react'

// Add fonts globally
if (typeof window !== 'undefined') {
  const link = document.createElement('link')
  link.href = 'https://api.fontshare.com/v2/css?f[]=clash-display@200,400,500,600,700&display=swap'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}

// Editorial luxury theme - dark with copper accents
const features = [
  {
    icon: Zap,
    title: 'Zero Gas Fees',
    description: 'Tempo-native transactions with built-in fee sponsorship. Your users never pay for gas.',
    gradient: 'from-yellow-500 to-amber-600',
  },
  {
    icon: Shield,
    title: 'Fee Sponsorship',
    description: 'Enable your agent to sponsor transactions for contributors. Boost conversion dramatically.',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Brain,
    title: 'Agent Identity',
    description: 'Register onchain reputation. Collect contributions with Tempo-native passkey accounts.',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    icon: Rocket,
    title: 'Machine Payments',
    description: 'MPP protocol for AI-to-AI payments with embedded memos. Perfect for autonomous agent economy.',
    gradient: 'from-green-500 to-emerald-600',
  },
]

const stats = [
  { value: '500ms', label: 'Finality' },
  { value: '$0', label: 'Gas Fees' },
  { value: '4', label: 'TIP-20 Tokens' },
  { value: '∞', label: 'Possibilities' },
]

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] font-sans selection:bg-orange-500/30">
      {/* Grain texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(234, 88, 12, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(234, 88, 12, 0.4) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Badge className="mb-6 bg-orange-500/10 text-orange-400 border-orange-500/20 px-4 py-1.5 text-sm">
              🚀 Powered by Tempo Blockchain
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            Launch AI Agents{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              Into Production
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            The first Tempo-native launchpad for autonomous agents. 
            Zero gas fees. Machine-to-machine payments. Built for the onchain AI economy.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            <a href="/">
              <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-6 text-lg rounded-lg font-medium shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-1">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a 
              href="https://docs.tempo.xyz"
              className="px-8 py-6 text-lg border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors duration-300 text-gray-300"
            >
              Read Docs
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-32"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          >
            <motion.div className="w-1 h-2 bg-orange-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 md:py-48 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 bg-gray-800/50 text-gray-300 border-gray-700 px-4 py-1.5 text-sm">
              Why AgentPad?
            </Badge>
            <h2 className="font-display text-4xl md:text-6xl font-semibold mb-6">
              Built for the <span className="text-orange-400">Future</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Tempo's unique architecture unlocks capabilities no other blockchain can match.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="h-full"
              >
                <Card className="bg-gray-900/30 border-gray-800 hover:border-orange-500/30 transition-all duration-500 group h-full">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-3 group-hover:text-orange-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(234, 88, 12, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(234, 88, 12, 0.2) 0%, transparent 40%)',
              'radial-gradient(circle at 20% 80%, rgba(234, 88, 12, 0.25) 0%, transparent 45%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-semibold mb-8">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Ship</span>?
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the first wave of agents launching on Tempo. Zero gas. Instant finality. 
              Built for autonomous economies.
            </p>
            <a href="/">
              <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-10 py-7 text-xl rounded-xl font-medium shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-1">
                Launch Your Agent
                <Rocket className="ml-3 h-6 w-6" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="font-display text-2xl font-bold text-white mb-4">
                🌙 AgentPad
              </div>
              <p className="text-gray-500 leading-relaxed max-w-md">
                Tempo-native infrastructure for launching and funding autonomous AI agents.
                Zero gas fees. Machine payments. Built for the onchain AI economy.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="https://docs.tempo.xyz" className="hover:text-orange-400 transition-colors">Tempo Docs</a></li>
                <li><a href="https://explore.tempo.xyz" className="hover:text-orange-400 transition-colors">Explorer</a></li>
                <li><a href="https://wallet.tempo.xyz" className="hover:text-orange-400 transition-colors">Wallet</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Github</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800 text-gray-600 text-sm">
            Built for Tempo by Lyrantic 🤖 | MIT License
          </div>
        </div>
      </footer>
    </div>
  )
}
