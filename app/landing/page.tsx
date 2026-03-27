'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Zap, Shield, Rocket, Clock, Globe, Wallet, ArrowRight, Link as LinkIcon, Server } from 'lucide-react'

if (typeof window !== 'undefined') {
  const clashLink = document.createElement('link')
  clashLink.href = 'https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap'
  clashLink.rel = 'stylesheet'
  document.head.appendChild(clashLink)
}

const protocolFeatures = [
  {
    icon: Clock,
    title: '~500ms Finality',
    description: 'Instant settlement sync. No waiting for block confirmations. Request/response synchronous.',
    highlight: 'Transaction finality',
  },
  {
    icon: Zap,
    title: 'No Native Gas Token',
    description: 'Fees paid directly in TIP-20 stablecoins. No need to acquire separate gas tokens.',
    highlight: 'Fee AMM',
  },
  {
    icon: Shield,
    title: 'Fee Sponsorship',
    description: 'Server can cover gas for users. Perfect for seamless onboarding and zero-cost UX.',
    highlight: 'EIP-2718',
  },
  {
    icon: Server,
    title: 'Payment Lanes',
    description: 'Dedicated blockspace with fixed fees regardless of network congestion.',
    highlight: 'Stable fees',
  },
  {
    icon: LinkIcon,
    title: 'Transfer Memos',
    description: '32-byte reference per transaction for easy reconciliation and audit trails.',
    highlight: 'TIP-20',
  },
  {
    icon: Wallet,
    title: 'Passkey Support',
    description: 'WebAuthn signatures via Face ID/Touch ID. Native embedded wallet integration.',
    highlight: 'EIP-5792',
  },
]

const stablecoins = [
  { name: 'pathUSD', role: 'Primary', desc: 'Root quote token, DEX base pair' },
  { name: 'alphaUSD', role: 'Testnet', desc: 'Stablecoin variant' },
  { name: 'betaUSD', role: 'Testnet', desc: 'Stablecoin variant' },
  { name: 'thetaUSD', role: 'Testnet', desc: 'Stablecoin variant' },
  { name: 'USDC.e', role: 'Bridged', desc: 'Via Stargate/LayerZero' },
]

const mppFeatures = [
  {
    title: 'Charge Intent',
    description: 'One-time payment per request (~500ms on-chain)',
    useCase: 'Single purchases, donations',
  },
  {
    title: 'Session Intent',
    description: 'Pay-as-you-go with off-chain vouchers',
    useCase: 'Streaming, subscriptions',
  },
  {
    title: 'Near-Zero Latency',
    description: 'Vouchers signed off-chain, settled on-chain',
    useCase: 'Real-time applications',
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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-black">
        <div className="container-simple flex items-center justify-between py-4 px-6 md:px-12">
          <div className="text-xl font-bold tracking-tight">agentpad</div>
          <a href="/" className="btn-primary text-sm">Launch Token</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="badge-mono mb-8">Tempo Mainnet Live</Badge>
          </motion.div>

          <motion.h1
            className="text-macro mb-8 tracking-macro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Token Launchpad<br />
            <span className="text-gray-400">on Tempo Protocol</span>
          </motion.h1>

          <motion.p
            className="text-micro max-w-[600px] mb-12 tracking-micro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Deploy ERC-20 tokens with zero gas fees. ~500ms finality. Multi-stablecoin support. Built on Tempo's payment-optimized blockchain.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="/" className="btn-primary text-lg px-8 py-4 flex items-center justify-center">
              Launch Token Now
              <Rocket className="ml-3 h-5 w-5" />
            </a>
            <a href="#protocol" className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center">
              Learn Protocol
              <ArrowRight className="ml-3 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Protocol Features */}
      <section id="protocol" className="section-spacer border-t border-black bg-gray-50">
        <div className="container-simple">
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-micro mb-4">Tempo Protocol</h2>
            <p className="text-lg max-w-[600px] text-gray-600">
              Blockchain designed specifically for payments — not general-purpose like Ethereum.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {protocolFeatures.map((feature, i) => (
              <motion.div
                key={i}
                className="card-brutalist"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-12 h-12 border-2 border-black bg-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <span className="badge-mono text-xs">{feature.highlight}</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIP-20 Tokens */}
      <section className="section-spacer border-t border-black">
        <div className="container-simple">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-micro mb-4">TIP-20 Stablecoins</h2>
            <p className="text-lg max-w-[600px] text-gray-600">
              Tempo's extended ERC-20 standard with transfer memos, rewards distribution, and compliance baked in.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {stablecoins.map((coin, i) => (
              <motion.div
                key={i}
                className="card-brutalist-dark"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="badge-mono text-xs mb-3">{coin.role}</div>
                <h3 className="font-semibold text-lg mb-2">{coin.name}</h3>
                <p className="text-sm text-gray-600">{coin.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* TIP-20 Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Transfer Memos', desc: '32-byte reference per TX for reconciliation' },
              { title: 'Built-in Rewards', desc: 'Auto-distribute to holders, no extra infra' },
              { title: 'TIP-403 Compliance', desc: 'Whitelist/blacklist policies baked in' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="border-l-2 border-black pl-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Machine Payments Protocol */}
      <section className="section-spacer bg-gray-50 border-t border-black">
        <div className="container-simple">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="badge-mono mb-6">Co-authored by Stripe</Badge>
            <h2 className="text-micro mb-4">Machine Payments Protocol (MPP)</h2>
            <p className="text-lg max-w-[600px] text-gray-600">
              Standard for payments at HTTP endpoints. Built for autonomous agents and real-time applications.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {mppFeatures.map((feature, i) => (
              <motion.div
                key={i}
                className="card-brutalist"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-3">{feature.description}</p>
                <div className="text-sm text-gray-500 font-mono">{feature.useCase}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Info */}
      <section className="section-spacer border-t border-black">
        <div className="container-simple">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-micro mb-4">Network Configuration</h2>
            <p className="text-lg max-w-[600px] text-gray-600">
              Connect your wallet to Tempo with these settings.
            </p>
          </motion.div>

          <Card className="card-brutalist-dark">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <div className="badge-mono mb-3">Chain ID</div>
                  <div className="text-4xl font-bold font-mono">42431</div>
                  <div className="text-sm text-gray-500">Moderato Testnet</div>
                </div>
                <div>
                  <div className="badge-mono mb-3">RPC Endpoint</div>
                  <div className="text-lg font-mono break-all">https://rpc.moderato.tempo.xyz</div>
                </div>
                <div>
                  <div className="badge-mono mb-3">Explorer</div>
                  <a href="https://explore.tempo.xyz" className="text-lg font-medium underline hover:text-gray-600">
                    https://explore.tempo.xyz
                  </a>
                </div>
                <div>
                  <div className="badge-mono mb-3">Fee Sponsor</div>
                  <a href="https://sponsor.moderato.tempo.xyz" className="text-lg font-medium underline hover:text-gray-600">
                    https://sponsor.moderato.tempo.xyz
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacer border-t border-black">
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
              Zero gas fees for contributors. Instant global settlement. Built on Tempo's payment-optimized blockchain.
            </p>
            <a href="/" className="btn-primary text-xl px-12 py-6 inline-flex items-center">
              Launch Token Now
              <Rocket className="ml-3 h-6 w-6" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
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
              <a href="#protocol" className="text-gray-600 hover:text-black">Protocol</a>
              <a href="/docs" className="text-gray-600 hover:text-black">Docs</a>
              <a href="/api" className="text-gray-600 hover:text-black">API</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold">Tempo</span>
              <a href="https://tempo.xyz" className="text-gray-600 hover:text-black">Website</a>
              <a href="https://docs.tempo.xyz" className="text-gray-600 hover:text-black">Documentation</a>
              <a href="https://explore.tempo.xyz" className="text-gray-600 hover:text-black">Explorer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
