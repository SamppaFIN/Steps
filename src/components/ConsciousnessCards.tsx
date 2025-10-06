import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Users, Brain, Heart, Zap } from 'lucide-react'
import { useConsciousness } from '../game/ConsciousnessContext'
import { useGame } from '../game/GameContext'

const ConsciousnessCard = () => {
  const { metrics, getConsciousnessLevel } = useConsciousness()
  const { state } = useGame()

  const consciousnessLevel = getConsciousnessLevel()
  const levelColors = {
    low: 'from-purple-500 to-pink-500',
    medium: 'from-blue-500 to-cyan-500',
    high: 'from-green-500 to-emerald-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-2xl p-6 consciousness-border"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gradient">Consciousness Status</h3>
        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${levelColors[consciousnessLevel]} flex items-center justify-center`}>
          <Brain size={16} className="text-white" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white/70">Level</span>
          <span className="text-2xl font-bold text-consciousness-400">{metrics.level}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white/70">Points</span>
          <span className="text-xl font-bold text-white">{metrics.points}</span>
        </div>

        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full bg-gradient-to-r ${levelColors[consciousnessLevel]}`}
            initial={{ width: 0 }}
            animate={{ width: `${(metrics.points % 100)}%` }}
            transition={{ duration: 1 }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <div className="text-sm text-white/70">Spatial Awareness</div>
            <div className="text-lg font-bold text-aurora-400">{metrics.spatialAwareness.toFixed(1)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-white/70">Community Connection</div>
            <div className="text-lg font-bold text-cosmic-400">{metrics.communityConnection.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const HealingImpactCard = () => {
  const { metrics } = useConsciousness()
  const { state } = useGame()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-effect rounded-2xl p-6 healing-border"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gradient">Healing Impact</h3>
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-healing-500 to-red-500 flex items-center justify-center">
          <Heart size={16} className="text-white" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white/70">Total Healing</span>
          <span className="text-2xl font-bold text-healing-400">{state.healingMetrics.totalHealing.toFixed(1)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white/70">Community Connections</span>
          <span className="text-xl font-bold text-white">{state.healingMetrics.communityConnections}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white/70">Spatial Wisdom</span>
          <span className="text-xl font-bold text-white">{state.healingMetrics.spatialWisdom.toFixed(1)}</span>
        </div>

        <div className="mt-4 p-4 bg-healing-500/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Zap size={16} className="text-healing-400" />
            <span className="text-sm text-healing-300">
              Your consciousness is healing the world! 🌸
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const TerritoryStatsCard = () => {
  const { state } = useGame()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-effect rounded-2xl p-6 consciousness-border"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gradient">Territory Stats</h3>
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-aurora-500 to-cosmic-500 flex items-center justify-center">
          <MapPin size={16} className="text-white" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white/70">Territories Claimed</span>
          <span className="text-2xl font-bold text-aurora-400">{state.territories.length}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white/70">Healing Zones</span>
          <span className="text-xl font-bold text-healing-400">
            {state.territories.filter(t => t.isHealingZone).length}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white/70">Active Players</span>
          <span className="text-xl font-bold text-cosmic-400">{Object.keys(state.players).length}</span>
        </div>

        <div className="mt-4 p-4 bg-aurora-500/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-aurora-400" />
            <span className="text-sm text-aurora-300">
              Join the consciousness revolution! 🌟
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export { ConsciousnessCard, HealingImpactCard, TerritoryStatsCard }
