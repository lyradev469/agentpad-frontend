'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Zap, Shield, Brain, Rocket, Globe, TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

// Add premium fonts
if (typeof window !== 'undefined') {
  const clashLink = document.createElement('link')
  clashLink.href = 'https://api.fontshare.com/v2/css?f[]=clash-display@200,400,500,600,700&f[]=general-sans@200,300,400,500,600&display=swap'
  clashLink.rel = 'stylesheet'
  document.head.appendChild(clashLink)
}

const features = [
  {
    icon: Zap,
    title: 'Zero Gas Architecture',
    description: 'Tempo-native fee sponsorship with payment lanes. Transactions settle in ~500ms at protocol level.',
    gradient: 'from-amber-400/20 via-orange-500/20 to-red-500/20',
    border: 'group-hover:border-amber-500/50',
    accent: 'bg-gradient-to-r from-amber-400 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Fee Abstraction',
    description: 'Abstract away blockchain complexity. Users pay nothing while you control the sponsorship pool.',
    gradient: 'from-blue-400/20 via-cyan-500/20 to-teal-500/20',
    border: 'group-hover:border-blue-500/50',
    accent: 'bg-gradient-to-r from-blue-400 to-cyan-500',
  },
  {
    icon: Brain,
    title: 'Onchain Agent Identity',
    description: 'Persistent reputation that compounds across deployments. Passkey-secured, non-custodial, portable.',
    gradient: 'from-violet-400/20 via-purple-500/20 to-fuchsia-500/20',
    border: 'group-hover:border-violet-500/50',
    accent: 'bg-gradient-to-r from-violet-400 to-purple-500',
  },
  {
    icon: Rocket,
    title: 'MPP Payment Channels',
    description: 'Machine-to-machine payments with embedded memos. Autopay, subscription billing, event-triggered payouts.',
    gradient: 'from-emerald-400/20 via-green-500/20 to-lime-500/20',
    border: 'group-hover:border-emerald-500/50',
    accent: 'bg-gradient-to-r from-emerald-400 to-green-500',
  },
  {
    icon: Globe,
    title: 'Global Settlement',
    description: 'Tempo\'s multi-region consensus with instant finality. No MEV, no front-running, predictable state.',
    gradient: 'from-rose-400/20 via-pink-500/20 to-red-500/20',
    border: 'group-hover:border-rose-500/50',
    accent: 'bg-gradient-to-r from-rose-400 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Liquidity Aggregation',
    description: 'Enshrined DEX with deep pathUSD pools. Atomic arbitrage, price-time priority, no slippage.',
    gradient: 'from-indigo-400/20 via-blue-500/20 to-purple-500/20',
    border: 'group-hover:border-indigo-500/50',
    accent: 'bg-gradient-to-r from-indigo-400 to-blue-500',
  },
]

const metrics = [
  { value: '497ms', label: 'Finality Time', trend: '+12%' },
  { value: '$0.00', label: 'User Gas Fees', trend: '100% sponsored' },
  { value: '4', label: 'TIP-20 Tokens', trend: 'pathUSD/alphaUSD/betaUSD/thetaUSD' },
  { value: '∞', label: 'Throughput', trend: 'Unlimited payment lanes' },
]

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#fafafa] overflow-x-hidden">
      {/* Premium grain + gradient texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-violet-500/5" />
      </div>

      {/* Progress bar - premium styling */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] z-[100]"
        style={{ scaleX, backgroundColor: 'linear-gradient(90deg, #fbbf24, #8b5cf6, #3b82f6)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-violet-500 to-blue-500" />
      </motion.div>

      {/* Navigation placeholder */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-violet-600 flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">A</span>
            </div>
            <span className="font-display font-semibold text-lg hidden sm:block">AgentPad</span>
          </div>
          <a href="/">
            <Button className="bg-transparent border border-white/10 hover:bg-white/5 text-white px-4 py-2 h-auto">
              Launch App
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </motion.nav>

      {/* Hero Section - Premium tier */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Floating gradient orbs - animated depth */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[120px]"
            style={{
              width: [400, 600, 400][i],
              height: [400, 600, 400][i],
              background: [
                'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)',
              ][i],
            }}
            animate={{
              x: [0, [50, -50, 30][i], 0],
              y: [0, [30, -40, 50][i], 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: [8, 12, 10][i],
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            initial={{ x: 0, y: 0, scale: 1 }}
          />
        ))}

        {/* Grid overlay - premium texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #fff 1px, transparent 1px),
              linear-gradient(#fff 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-400">Live on Tempo Testnet</span>
            </div>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 leading-[1.05]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            The Autonomous<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-violet-400 to-blue-400">
              Agent Economy
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Launch AI agents with native fee sponsorship, machine payments, and onchain identity. 
            Built on Tempo's payment lane architecture for instant finality.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a href="/">
              <Button className="bg-gradient-to-r from-amber-400 to-violet-500 hover:from-amber-500 hover:to-violet-600 text-white px-8 py-6 text-lg rounded-xl font-medium shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-500 hover:-translate-y-1 group">
                Launch Your Agent
                <Rocket className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a 
              href="/docs"
              className="px-8 py-6 text-lg rounded-xl border border-white/10 hover:bg-white/[0.03] transition-all duration-300 text-gray-400 hover:text-white group"
            >
              Technical Docs
              <ArrowRight className="inline ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Metrics - floating cards */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                className="relative group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-violet-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-display font-medium text-white mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-500 leading-tight">
                    {metric.label}
                  </div>
                  <div className="text-xs text-amber-400 mt-2">
                    {metric.trend}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator - premium styling */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          style={{ opacity }}
        >
          <motion.div
            className="w-[1px] h-16 bg-gradient-to-b from-amber-400/50 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* Features Section - Grid with staggered reveal */}
      <section className="py-32 md:py-48 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <Badge className="mb-6 bg-violet-500/10 text-violet-300 border-violet-500/20 px-4 py-1.5 text-sm">
              Built for Scale
            </Badge>
            <h2 className="font-display text-4xl md:text-6xl font-medium mb-6">
              Infrastructure for the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-violet-400">
                Next Generation
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Every component designed to remove friction from agent deployment and operation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="h-full group"
              >
                <Card className="h-full bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500 overflow-hidden">
                  <CardContent className="p-8 relative">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.accent} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                      
                      <h3 className="font-display text-xl font-medium mb-4 group-hover:text-amber-400 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-500 group-hover:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium final call */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
        
        {/* Animated orbs */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[100px]"
            style={{
              width: 500,
              height: 500,
              left: [i === 0 ? '10%' : '80%', '80%', '10%'][i],
              top: [i === 0 ? '20%' : '60%', '60%', '20%'][i],
              background: i === 0 
                ? 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-medium mb-8">
              Deploy to Production<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-violet-400">
                in Minutes, Not Months
              </span>
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the autonomous agent economy. Zero infrastructure costs. 
              Native payment rails. Instant settlement.
            </p>

            <a href="/">
              <Button className="bg-gradient-to-r from-amber-400 to-violet-500 hover:from-amber-500 hover:to-violet-600 text-white px-12 py-7 text-xl rounded-2xl font-medium shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-500 hover:-translate-y-1 group">
                Start Building Now
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </a>

            <p className="text-sm text-gray-600 mt-8">
              No credit card required • Open source • Tempo testnet
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer - Premium minimal */}
      <footer className="py-20 px-6 border-t border-white/[0.05] relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-violet-600 flex items-center justify-center">
                  <span className="text-white font-display font-bold text-xl">A</span>
                </div>
                <div className="font-display text-2xl font-medium">AgentPad</div>
              </div>
              <p className="text-gray-500 leading-relaxed max-w-md">
                The first Tempo-native launchpad for autonomous AI agents. 
                Built with payment lanes, fee abstraction, and MPP protocol.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-6">Platform</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="/docs" className="hover:text-amber-400 transition-colors">Documentation</a></li>
                <li><a href="/api" className="hover:text-amber-400 transition-colors">API Reference</a></li>
                <li><a href="/sdk" className="hover:text-amber-400 transition-colors">SDKs</a></li>
                <li><a href="/changelog" className="hover:text-amber-400 transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6">Community</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="https://github.com/lyradev469" className="hover:text-amber-400 transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Agents Forum</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/[0.05]">
            <p className="text-gray-600 text-sm">
              © 2026 AgentPad. Open source MIT license.
            </p>
            <div className="flex gap-8 mt-4 md:mt-0 text-sm text-gray-500">
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global styles */}
      <style jsx global>{`
        .font-display { font-family: 'Clash Display', sans-serif; }
        :root {
          --neon-green: #00ff88;
          --neon-blue: #00ccff;
          --copper: #b87333;
        }
      `}</style>
    </div>
  )
}
