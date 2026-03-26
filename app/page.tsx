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
import { Zap, Shield, Brain, ArrowRight, Rocket, TrendingUp, ArrowUpRight, Activity, Globe, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Disable static generation
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Add premium fonts
if (typeof window !== 'undefined') {
  const clashLink = document.createElement('link')
  clashLink.href = 'https://api.fontshare.com/v2/css?f[]=clash-display@200,400,500,600,700&f[]=general-sans@200,300,400,500,600&display=swap'
  clashLink.rel = 'stylesheet'
  document.head.appendChild(clashLink)
}

export default function Home() {
  const { isConnected, address } = useAccount()
  const [isAgent, setIsAgent] = useState<boolean | null>(null)
  const [showSponsorship, setShowSponsorship] = useState(false)
  const [showSwap, setShowSwap] = useState(false)
  const [swapData, setSwapData] = useState<any>(null)

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
    <div className="min-h-screen bg-[#0a0a0f] text-[#fafafa] selection:bg-amber-400/30">
      {/* Premium texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(251,191,36,0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(139,92,246,0.05) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(59,130,246,0.05) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Header */}
        <motion.header 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-sm text-gray-400 font-medium">Tempo Mainnet Ready</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight mb-6">
            <span className="text-white">Agent</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-violet-400 to-blue-400">
              {' '}Pad
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Launch autonomous agents with zero gas fees, machine payments, and onchain reputation. 
            Built on Tempo's payment lane architecture.
          </p>

          {!isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
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
              <Card className="bg-white/[0.02] border border-white/5 backdrop-blur-sm">
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
              <Card className="bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                <CardContent className="p-6">
                  <RegisterAgent onSuccess={handleAgentRegistered} />
                </CardContent>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Premium Dashboard */}
        {isAgent === true && isConnected && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-display text-2xl font-medium mb-8 text-white flex items-center gap-3">
              <span className="w-1 h-6 rounded-full bg-gradient-to-b from-amber-400 to-violet-500"></span>
              Control Center
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
                <Button 
                  onClick={() => setShowSponsorship(!showSponsorship)}
                  className="w-full h-44 flex flex-col items-center justify-center gap-4 relative overflow-hidden group bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-amber-500/30 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Zap className="h-10 w-10 text-amber-400 relative z-10" />
                  <div className="text-center relative z-10">
                    <div className="font-display font-medium text-lg text-white">Fee Sponsorship</div>
                    <div className="text-xs text-gray-500 mt-1">Zero-gas experience for users</div>
                  </div>
                  <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-gray-600 group-hover:text-amber-400 transition-colors" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
                <Button 
                  onClick={() => setShowSwap(true)}
                  className="w-full h-44 flex flex-col items-center justify-center gap-4 relative overflow-hidden group bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <TrendingUp className="h-10 w-10 text-blue-400 relative z-10" />
                  <div className="text-center relative z-10">
                    <div className="font-display font-medium text-lg text-white">DEX Swap</div>
                    <div className="text-xs text-gray-500 mt-1">Enshrined liquidity pools</div>
                  </div>
                  <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-gray-600 group-hover:text-blue-400 transition-colors" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
                <Button 
                  onClick={() => alert('MPP payments coming soon!')}
                  className="w-full h-44 flex flex-col items-center justify-center gap-4 relative overflow-hidden group bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Brain className="h-10 w-10 text-violet-400 relative z-10" />
                  <div className="text-center relative z-10">
                    <div className="font-display font-medium text-lg text-white">MPP Payments</div>
                    <div className="text-xs text-gray-500 mt-1">Machine-to-machine transfers</div>
                  </div>
                  <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-gray-600 group-hover:text-violet-400 transition-colors" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Main Content Grid - Premium cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl font-medium mb-6 text-white flex items-center gap-3">
              <span className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-400 to-cyan-500"></span>
              Create Launch
            </h2>
            <Card className="bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors duration-300">
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
            <h2 className="font-display text-2xl font-medium mb-6 text-white flex items-center gap-3">
              <span className="w-1 h-6 rounded-full bg-gradient-to-b from-violet-400 to-purple-500"></span>
              Active Missions
            </h2>
            <Card className="bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors duration-300">
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
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

        {/* Premium Footer */}
        <motion.footer 
          className="mt-24 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="w-1 h-1 rounded-full bg-amber-400"></span>
            <p className="text-sm">
              Built for <span className="text-amber-400 font-medium">Tempo</span> by <span className="text-violet-400 font-medium">Lyrantic</span>
            </p>
            <span className="w-1 h-1 rounded-full bg-violet-400"></span>
          </div>
          <div className="flex justify-center gap-6 text-xs">
            <a href="https://docs.tempo.xyz" className="hover:text-amber-400 transition-colors">
              Documentation
            </a>
            <a href="https://explore.tempo.xyz" className="hover:text-amber-400 transition-colors">
              Explorer
            </a>
            <a href="https://wallet.tempo.xyz" className="hover:text-amber-400 transition-colors">
              Wallet
            </a>
            <a href="/landing" className="hover:text-amber-400 transition-colors">
              Landing Page
            </a>
            <a href="https://github.com/lyradev469" className="hover:text-amber-400 transition-colors">
              GitHub
            </a>
          </div>
        </motion.footer>
      </div>

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
