'use client'

import { useEffect, useState } from 'react'
import { WalletConnect } from '@/components/WalletConnect'
import { LaunchList } from '@/components/LaunchList'
import { CreateLaunch } from '@/components/CreateLaunch'
import { RegisterAgent } from '@/components/RegisterAgent'
import { FeeSponsorshipPanel } from '@/components/FeeSponsorshipPanel'
import { DEXSwapModal } from '@/components/DEXSwapModal'
import { MPPPayment } from '@/components/MPPPayment'
import HealthMonitor from '@/components/HealthMonitor'
import { useAccount } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Shield, Brain, ArrowRight, Rocket, TrendingUp, Users, DollarSign } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Disable static generation - this app needs client-side rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Add Clash Display font
if (typeof window !== 'undefined') {
  const link = document.createElement('link')
  link.href = 'https://api.fontshare.com/v2/css?f[]=clash-display@200,400,500,600,700&display=swap'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}

export default function Home() {
  const { isConnected, address } = useAccount()
  const [isAgent, setIsAgent] = useState<boolean | null>(null)
  const [showSponsorship, setShowSponsorship] = useState(false)
  const [showSwap, setShowSwap] = useState(false)
  const [swapData, setSwapData] = useState<any>(null)

  // Wrap callbacks to prevent unnecessary re-renders
  const handleCloseSponsorship = () => setShowSponsorship(false)
  const handleSuccessSponsorship = () => setShowSponsorship(false)
  const handleCloseSwap = () => setShowSwap(false)
  const handleSuccessSwap = () => setShowSwap(false)

  useEffect(() => {
    if (isConnected && address) {
      const stored = localStorage.getItem(`agent-${address}`)
      setIsAgent(stored === 'true')
    } else {
      setIsAgent(null)
    }
  }, [isConnected, address])

  const handleAgentRegistered = (agentId: number) => {
    setIsAgent(true)
    if (address) {
      localStorage.setItem(`agent-${address}`, 'true')
    }
  }

  const handleFeeSponsorshipEnabled = () => {
    setShowSponsorship(false)
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f0f0f0] selection:bg-neon-green/30">
      {/* Subtle grid background */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.header 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-6 bg-neon-green/10 text-[#00ff88] border-[#00ff88]/30 px-4 py-1.5 text-sm font-medium">
            🤖 Tempo Native Infrastructure
          </Badge>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-white">Agent</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00ccff]">
              {' '}Pad
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Launch, fund, and run autonomous AI agents on Tempo. 
            Zero gas fees. Machine payments built-in.
          </p>

          {!isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-gray-500 mb-4">
                Connect your Tempo wallet to get started
              </p>
            </motion.div>
          )}
        </motion.header>

        <WalletConnect />

        {/* Advanced Features Panel */}
        <AnimatePresence>
          {isConnected && showSponsorship && (
            <motion.section 
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <FeeSponsorshipPanel onSponsorshipEnabled={handleFeeSponsorshipEnabled} />
                </CardContent>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Agent Registration */}
        <AnimatePresence>
          {isConnected && !isAgent && (
            <motion.section 
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <RegisterAgent onSuccess={handleAgentRegistered} />
                </CardContent>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Admin/Agent Features */}
        {isAgent === true && isConnected && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-display font-semibold mb-6 text-white flex items-center gap-3">
              <span className="bg-[#00ff88] w-2 h-8 rounded-full"></span>
              Dashboard
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Button 
                  onClick={() => setShowSponsorship(!showSponsorship)}
                  className="w-full h-40 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
                >
                  <Zap className="h-10 w-10 text-white" />
                  <div className="text-center">
                    <div className="font-display font-bold text-lg">Fee Sponsorship</div>
                    <div className="text-xs text-blue-100 opacity-90 mt-1">Sponsor gas for users</div>
                  </div>
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Button 
                  onClick={() => setShowSwap(true)}
                  className="w-full h-40 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-2 border-green-500/50 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300"
                >
                  <TrendingUp className="h-10 w-10 text-white" />
                  <div className="text-center">
                    <div className="font-display font-bold text-lg">DEX Swap</div>
                    <div className="text-xs text-green-100 opacity-90 mt-1">Swap stablecoins</div>
                  </div>
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Button 
                  onClick={() => {
                    // MPP payment trigger - would need implementation
                    alert('MPP payments coming soon!')
                  }}
                  className="w-full h-40 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300"
                >
                  <Brain className="h-10 w-10 text-white" />
                  <div className="text-center">
                    <div className="font-display font-bold text-lg">MPP Payments</div>
                    <div className="text-xs text-purple-100 opacity-90 mt-1">Machine-to-machine</div>
                  </div>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-display font-semibold mb-6 text-white flex items-center gap-3">
              <span className="bg-[#00ccff] w-2 h-8 rounded-full"></span>
              Create Launch
            </h2>
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <CreateLaunch />
              </CardContent>
            </Card>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-display font-semibold mb-6 text-white flex items-center gap-3">
              <span className="bg-[#b87333] w-2 h-8 rounded-full"></span>
              Active Launches
            </h2>
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <LaunchList />
              </CardContent>
            </Card>
          </motion.section>
        </div>

        {/* DEX Swap Modal */}
        <AnimatePresence>
          {showSwap && swapData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm"
            >
              <DEXSwapModal
                fromToken={swapData.from}
                toToken={swapData.to}
                amount={swapData.amount}
                onClose={handleCloseSwap}
                onSuccess={handleSuccessSwap}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Health Monitor */}
        <HealthMonitor />

        {/* Footer */}
        <motion.footer 
          className="mt-20 text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm mb-4">
            Built for Tempo by <span className="text-[#00ff88]">Lyrantic</span> 🤖
          </p>
          <div className="flex justify-center gap-4 text-xs">
            <a href="https://docs.tempo.xyz" className="hover:text-[#00ff88] transition-colors">
              Tempo Docs
            </a>
            <span>•</span>
            <a href="https://explore.tempo.xyz" className="hover:text-[#00ff88] transition-colors">
              Explorer
            </a>
            <span>•</span>
            <a href="https://wallet.tempo.xyz" className="hover:text-[#00ff88] transition-colors">
              Wallet
            </a>
            <span>•</span>
            <a href="/landing" className="hover:text-[#00ff88] transition-colors">
              Landing Page
            </a>
          </div>
        </motion.footer>
      </div>

      {/* Global CSS for custom colors */}
      <style jsx global>{`
        :root {
          --neon-green: #00ff88;
          --neon-blue: #00ccff;
          --copper: #b87333;
        }
        .bg-neon-green { background-color: var(--neon-green); }
        .text-neon-green { color: var(--neon-green); }
        .font-display { font-family: 'Clash Display', sans-serif; }
      `}</style>
    </div>
  )
}
