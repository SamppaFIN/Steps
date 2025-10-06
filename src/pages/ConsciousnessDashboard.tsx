import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Heart, MapPin, Users, Zap, Star, TrendingUp } from 'lucide-react'
import { useConsciousness } from '../game/ConsciousnessContext'
import { useGame } from '../game/GameContext'

const ConsciousnessDashboard = () => {
  const { metrics, sacredPrinciples, getConsciousnessLevel } = useConsciousness()
  const { state } = useGame()

  const consciousnessLevel = getConsciousnessLevel()
  const levelColors = {
    low: 'from-purple-500 to-pink-500',
    medium: 'from-blue-500 to-cyan-500',
    high: 'from-green-500 to-emerald-500',
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gradient mb-2">Consciousness Dashboard</h1>
        <p className="text-white/70">Track your spiritual and physical growth journey</p>
      </motion.div>

      {/* Main Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-6 consciousness-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 aurora-gradient rounded-full flex items-center justify-center">
              <Brain size={24} className="text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-consciousness-400">{metrics.level}</div>
              <div className="text-sm text-white/70">Level</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{metrics.points}</div>
            <div className="text-sm text-white/70">Consciousness Points</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-6 consciousness-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 aurora-gradient rounded-full flex items-center justify-center">
              <MapPin size={24} className="text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-aurora-400">{metrics.spatialAwareness.toFixed(1)}</div>
              <div className="text-sm text-white/70">Spatial</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{state.territories.length}</div>
            <div className="text-sm text-white/70">Territories</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-6 consciousness-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 aurora-gradient rounded-full flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-cosmic-400">{metrics.communityConnection.toFixed(1)}</div>
              <div className="text-sm text-white/70">Community</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{state.healingMetrics.communityConnections}</div>
            <div className="text-sm text-white/70">Connections</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-6 consciousness-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 aurora-gradient rounded-full flex items-center justify-center">
              <Heart size={24} className="text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-healing-400">{metrics.healingImpact.toFixed(1)}</div>
              <div className="text-sm text-white/70">Healing</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{state.healingMetrics.totalHealing.toFixed(1)}</div>
            <div className="text-sm text-white/70">Total Healing</div>
          </div>
        </motion.div>
      </div>

      {/* Consciousness Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-effect rounded-2xl p-8 consciousness-border mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gradient">Consciousness Level</h2>
          <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${levelColors[consciousnessLevel]} text-white font-bold`}>
            {consciousnessLevel.toUpperCase()}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/70">Progress to Next Level</span>
            <span className="text-white font-bold">{metrics.points % 100}/100</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4">
            <motion.div
              className={`h-4 rounded-full bg-gradient-to-r ${levelColors[consciousnessLevel]}`}
              initial={{ width: 0 }}
              animate={{ width: `${(metrics.points % 100)}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="text-center text-white/70">
            {100 - (metrics.points % 100)} more points to reach level {metrics.level + 1}
          </div>
        </div>
      </motion.div>

      {/* Sacred Principles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gradient mb-6">Sacred Principles Validation</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sacredPrinciples.map((principle, index) => (
            <motion.div
              key={principle.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass-effect rounded-2xl p-6 consciousness-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gradient capitalize">
                  {principle.name.replace('-', ' ')}
                </h3>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  principle.validation ? 'bg-consciousness-500' : 'bg-red-500'
                }`}>
                  {principle.validation ? (
                    <Star size={16} className="text-white" />
                  ) : (
                    <Zap size={16} className="text-white" />
                  )}
                </div>
              </div>
              <p className="text-white/70 mb-4">{principle.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70">Impact</span>
                <span className="text-lg font-bold text-consciousness-400">{principle.impact}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Growth Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-effect rounded-2xl p-8 consciousness-border"
      >
        <h2 className="text-2xl font-bold text-gradient mb-6">Growth Metrics</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 aurora-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
              <TrendingUp size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{metrics.wisdomSharing.toFixed(1)}</h3>
            <p className="text-white/70">Wisdom Sharing</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 aurora-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{metrics.healingImpact.toFixed(1)}</h3>
            <p className="text-white/70">Healing Impact</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 aurora-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
              <Brain size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{metrics.spatialAwareness.toFixed(1)}</h3>
            <p className="text-white/70">Spatial Awareness</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ConsciousnessDashboard
