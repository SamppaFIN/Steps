import React from 'react'
import { motion } from 'framer-motion'
import { Users, Heart, MapPin, Brain, Zap, Star } from 'lucide-react'
import { useGame } from '../game/GameContext'
import { useConsciousness } from '../game/ConsciousnessContext'
import { useMultiplayer } from '../services/MultiplayerService'

const CommunityPage = () => {
  const { state } = useGame()
  const { metrics } = useConsciousness()
  const { players, events } = useMultiplayer()

  const recentEvents = events.slice(-5).reverse()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gradient mb-2">Community Healing</h1>
        <p className="text-white/70">Connect with consciousness builders around the world</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active Players */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-2xl p-6 consciousness-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gradient">Active Players</h2>
              <div className="flex items-center space-x-2">
                <Users size={24} className="text-aurora-400" />
                <span className="text-xl font-bold text-white">{Object.keys(players).length}</span>
              </div>
            </div>

            <div className="space-y-4">
              {Object.values(players).map((player) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 aurora-gradient rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{player.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{player.name}</h3>
                      <p className="text-sm text-white/70">Level {player.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-consciousness-400">{player.consciousness}</div>
                    <div className="text-sm text-white/70">consciousness</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Events */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-6 consciousness-border"
          >
            <h2 className="text-2xl font-bold text-gradient mb-6">Recent Events</h2>
            <div className="space-y-4">
              {recentEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-aurora-500 to-cosmic-500 flex items-center justify-center">
                    {event.type === 'territory-claimed' && <MapPin size={16} className="text-white" />}
                    {event.type === 'consciousness-gained' && <Brain size={16} className="text-white" />}
                    {event.type === 'healing-zone-created' && <Heart size={16} className="text-white" />}
                    {event.type === 'player-joined' && <Users size={16} className="text-white" />}
                    {event.type === 'player-left' && <Zap size={16} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">
                      {event.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    <p className="text-xs text-white/70">
                      {event.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-xs text-consciousness-400 font-bold">
                    +{event.consciousnessImpact}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Healing Zones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <div className="glass-effect rounded-2xl p-6 healing-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gradient">Healing Zones</h2>
            <div className="flex items-center space-x-2">
              <Heart size={24} className="text-healing-400" />
              <span className="text-xl font-bold text-healing-400">
                {state.territories.filter(t => t.isHealingZone).length}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {state.territories.filter(t => t.isHealingZone).map((territory) => (
              <motion.div
                key={territory.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-healing-500/20 rounded-lg border border-healing-400/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">Healing Zone</h3>
                  <Star size={16} className="text-healing-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Healing Power</span>
                    <span className="text-sm font-bold text-healing-400">{territory.healingPower}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Consciousness</span>
                    <span className="text-sm font-bold text-consciousness-400">{territory.consciousness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Created</span>
                    <span className="text-sm text-white/70">{territory.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 grid md:grid-cols-4 gap-6"
      >
        <div className="glass-effect rounded-2xl p-6 text-center consciousness-border">
          <div className="w-16 h-16 aurora-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{Object.keys(players).length}</h3>
          <p className="text-white/70">Active Players</p>
        </div>

        <div className="glass-effect rounded-2xl p-6 text-center consciousness-border">
          <div className="w-16 h-16 aurora-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
            <MapPin size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{state.territories.length}</h3>
          <p className="text-white/70">Territories Claimed</p>
        </div>

        <div className="glass-effect rounded-2xl p-6 text-center consciousness-border">
          <div className="w-16 h-16 aurora-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
            <Heart size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {state.territories.filter(t => t.isHealingZone).length}
          </h3>
          <p className="text-white/70">Healing Zones</p>
        </div>

        <div className="glass-effect rounded-2xl p-6 text-center consciousness-border">
          <div className="w-16 h-16 aurora-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
            <Brain size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{metrics.points}</h3>
          <p className="text-white/70">Total Consciousness</p>
        </div>
      </motion.div>
    </div>
  )
}

export default CommunityPage
