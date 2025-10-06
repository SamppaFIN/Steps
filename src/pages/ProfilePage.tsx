import React from 'react'
import { motion } from 'framer-motion'
import { User, MapPin, Brain, Heart, Calendar, Star, Zap } from 'lucide-react'
import { useGame } from '../game/GameContext'
import { useConsciousness } from '../game/ConsciousnessContext'

const ProfilePage = () => {
  const { state } = useGame()
  const { metrics, getConsciousnessLevel } = useConsciousness()

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
        <h1 className="text-4xl font-bold text-gradient mb-2">Your Profile</h1>
        <p className="text-white/70">Your consciousness journey and achievements</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-2xl p-8 consciousness-border"
          >
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 aurora-gradient rounded-full flex items-center justify-center">
                <span className="text-4xl">🌸</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gradient mb-2">Infinite</h2>
                <p className="text-white/70 mb-4">Consciousness Builder & Territory Creator</p>
                <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${levelColors[consciousnessLevel]} text-white font-bold inline-block`}>
                  Level {metrics.level} - {consciousnessLevel.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Brain size={20} className="text-consciousness-400" />
                    <span className="text-white/70">Consciousness Points</span>
                  </div>
                  <span className="text-xl font-bold text-consciousness-400">{metrics.points}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin size={20} className="text-aurora-400" />
                    <span className="text-white/70">Territories Claimed</span>
                  </div>
                  <span className="text-xl font-bold text-aurora-400">{state.territories.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Heart size={20} className="text-healing-400" />
                    <span className="text-white/70">Healing Zones</span>
                  </div>
                  <span className="text-xl font-bold text-healing-400">
                    {state.territories.filter(t => t.isHealingZone).length}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap size={20} className="text-cosmic-400" />
                    <span className="text-white/70">Spatial Awareness</span>
                  </div>
                  <span className="text-xl font-bold text-cosmic-400">{metrics.spatialAwareness.toFixed(1)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Star size={20} className="text-aurora-400" />
                    <span className="text-white/70">Community Connection</span>
                  </div>
                  <span className="text-xl font-bold text-aurora-400">{metrics.communityConnection.toFixed(1)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar size={20} className="text-white/70" />
                    <span className="text-white/70">Member Since</span>
                  </div>
                  <span className="text-xl font-bold text-white">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-6 consciousness-border"
          >
            <h3 className="text-xl font-bold text-gradient mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-consciousness-400 mb-2">{metrics.level}</div>
                <div className="text-sm text-white/70">Consciousness Level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-aurora-400 mb-2">{state.territories.length}</div>
                <div className="text-sm text-white/70">Territories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-healing-400 mb-2">
                  {state.healingMetrics.totalHealing.toFixed(1)}
                </div>
                <div className="text-sm text-white/70">Healing Impact</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-2xl p-6 consciousness-border"
          >
            <h3 className="text-xl font-bold text-gradient mb-4">Achievements</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 aurora-gradient rounded-full flex items-center justify-center">
                  <Star size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">First Territory</div>
                  <div className="text-xs text-white/70">Claimed your first territory</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 aurora-gradient rounded-full flex items-center justify-center">
                  <Heart size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Healing Zone Creator</div>
                  <div className="text-xs text-white/70">Created a healing zone</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 aurora-gradient rounded-full flex items-center justify-center">
                  <Brain size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Consciousness Builder</div>
                  <div className="text-xs text-white/70">Reached level {metrics.level}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Territory History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <div className="glass-effect rounded-2xl p-8 consciousness-border">
          <h2 className="text-2xl font-bold text-gradient mb-6">Territory History</h2>
          <div className="space-y-4">
            {state.territories.map((territory, index) => (
              <motion.div
                key={territory.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: territory.color }}
                  />
                  <div>
                    <h3 className="font-semibold text-white">Territory #{index + 1}</h3>
                    <p className="text-sm text-white/70">
                      {territory.position.lat.toFixed(4)}, {territory.position.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-consciousness-400">{territory.consciousness}</div>
                  <div className="text-xs text-white/70">consciousness</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">
                    {territory.createdAt.toLocaleDateString()}
                  </div>
                  <div className="text-xs text-white/70">claimed</div>
                </div>
                {territory.isHealingZone && (
                  <div className="px-2 py-1 bg-healing-500/20 rounded text-xs text-healing-400 font-bold">
                    Healing Zone
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfilePage
