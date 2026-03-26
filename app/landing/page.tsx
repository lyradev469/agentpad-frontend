'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Rocket, TrendingUp, DollarSign, Shield, Zap, Users, Globe } from 'lucide-react'

// Add fonts
if (typeof window !== 'undefined') {
  const clashLink = document.createElement('link')
  clashLink.href = 'https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap'
  clashLink.rel = 'stylesheet'
  document.head.appendChild(clashLink)
}

const features = [
  {
    title: 'Deploy Instantly',
    description: 'ERC-20 tokens in under 5 minutes',
    icon: Zap,
  },
  {
    title: 'Zero Gas Fees',
    description: 'Tempo-native sponsorship',
    icon: Shield,
  },
  {
    title: 'Multi-Coin',
    description: 'pathUSD, alphaUSD, betaUSD, thetaUSD',
    icon: DollarSign,
  },
  {
    title: 'Global',
    description: 'Sub-second settlement',
    icon: Globe,
  },
]

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-black">
        <div className="container-simple flex items-center justify-between py-4 px-6 md:px-12">
          <div className="text-xl font-bold tracking-tight">agentpad</div>
          <a href="/">
            <Button className="btn-primary">Launch</Button>
          </a>
        </div>
      </nav>

      {/* Hero - Massive Typography */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="badge-mono mb-8">Live on Tempo Network</Badge>
          </motion.div>

          <motion.h1
            className="text-macro mb-8 tracking-macro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Launch Your<br />
            <span className="text-gray-400">Token Economy</span>
          </motion.h1>

          <motion.p
            className="text-micro max-w-[600px] mb-12 tracking-micro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The simplest way to deploy ERC-20 tokens on Tempo. Zero gas for contributors. Instant global settlement.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="/">
              <Button className="btn-primary text-lg px-8 py-4">
                Launch Token
                <Rocket className="ml-3 h-5 w-5" />
              </Button>
            </a>
            <a className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center">
              Documentation
              <ArrowRight className="ml-3 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features - Brutalist Grid */}
      <section className="section-spacer border-t border-black">
        <div className="container-simple">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-micro mb-4">Built for Tempo</h2>
            <p className="text-lg max-w-[500px] text-gray-600">
              Everything you need to launch, fund, and scale your token economy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="card-brutalist"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <i className="flex items-center justify-center w-12 h-12 border-2 border-black bg-white mb-6">
                  <feature.icon className="h-6 w-6" />
                </i>
                <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Minimal Layout */}
      <section className="section-spacer bg-gray-50 border-y border-black">
        <div className="container-simple">
          <div className="grid md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '<1s', label: 'Finality', sub: 'Payment lanes' },
              { value: '$0', label: 'Gas', sub: 'User sponsored' },
              { value: '4', label: 'Coins', sub: 'TIP-20 stablecoins' },
              { value: '∞', label: 'Scale', sub: 'Global network' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="text-macro mb-2">{stat.value}</div>
                <div className="font-semibold text-lg mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Simple & Direct */}
      <section className="section-spacer">
        <div className="container-simple text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-macro mb-8 tracking-macro">
              Ready to<br />
              <span className="text-gray-400">Launch?</span>
            </h2>
            <p className="text-lg mb-12 max-w-[600px] mx-auto text-gray-600">
              Join the next generation of token projects on Tempo. No infrastructure to manage. No gas to pay.
            </p>
            <a href="/">
              <Button className="btn-primary text-xl px-12 py-6">
                Start Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-16 px-6 md:px-12 border-t border-black">
        <div className="container-simple flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="text-xl font-bold mb-4">agentpad</div>
            <p className="text-gray-600 max-w-[300px]">
              Token launchpad on Tempo Network. Open source MIT license.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-3">
              <span className="font-semibold">Platform</span>
              <a href="#" className="text-gray-600 hover:text-black">Docs</a>
              <a href="#" className="text-gray-600 hover:text-black">API</a>
              <a href="#" className="text-gray-600 hover:text-black">SDK</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold">Resources</span>
              <a href="#" className="text-gray-600 hover:text-black">Tempo</a>
              <a href="#" className="text-gray-600 hover:text-black">Explorer</a>
              <a href="#" className="text-gray-600 hover:text-black">Wallet</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
