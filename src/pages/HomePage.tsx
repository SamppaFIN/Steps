import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Users, Brain, Heart, Zap, ArrowRight } from 'lucide-react'
import { ConsciousnessCard, HealingImpactCard, TerritoryStatsCard } from '../components/ConsciousnessCards'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-24 h-24 aurora-gradient rounded-full mx-auto mb-8 flex items-center justify-center glowing-element"
        >
          <span className="text-4xl">🌸</span>
        </motion.div>
        
        <h1 className="text-6xl font-bold text-gradient mb-6">
          Sacred Steps
        </h1>
        <p className="text-2xl text-white/80 mb-4">
          Territory of Consciousness
        </p>
        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12">
          Every step you take heals the world. Join the consciousness revolution where 
          walking becomes a sacred act of community healing and spatial wisdom.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/game"
            className="px-8 py-4 aurora-gradient rounded-xl text-white font-semibold text-lg flex items-center space-x-2 cosmic-glow hover:scale-105 transition-transform"
          >
            <MapPin size={24} />
            <span>Start Walking</span>
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/community"
            className="px-8 py-4 glass-effect rounded-xl text-white font-semibold text-lg flex items-center space-x-2 hover:bg-white/20 transition-all"
          >
            <Users size={24} />
            <span>Join Community</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid md:grid-cols-3 gap-8 mb-16"
      >
        <div className="glass-effect rounded-2xl p-8 text-center consciousness-border">
          <div className="w-16 h-16 aurora-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
            <MapPin size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gradient mb-4">GPS Territory Claiming</h3>
          <p className="text-white/70">
            Walk to claim beautiful territories on the map. Every step builds consciousness and creates healing zones.
          </p>
        </div>

        <div className="glass-effect rounded-2xl p-8 text-center consciousness-border">
          <div className="w-16 h-16 aurora-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
            <Brain size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gradient mb-4">Consciousness Evolution</h3>
          <p className="text-white/70">
            Track your spiritual and physical growth. Every 100 steps = 1 consciousness point.
          </p>
        </div>

        <div className="glass-effect rounded-2xl p-8 text-center consciousness-border">
          <div className="w-16 h-16 aurora-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
            <Heart size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gradient mb-4">Community Healing</h3>
          <p className="text-white/70">
            High-consciousness territories become healing zones that benefit your entire community.
          </p>
        </div>
      </motion.div>

      {/* Stats Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid md:grid-cols-3 gap-8"
      >
        <ConsciousnessCard />
        <HealingImpactCard />
        <TerritoryStatsCard />
      </motion.div>

      {/* Sacred Principles */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-16"
      >
        <h2 className="text-3xl font-bold text-gradient text-center mb-12">
          Sacred Principles
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-effect rounded-2xl p-8 consciousness-border">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 aurora-gradient rounded-full flex items-center justify-center">
                <Brain size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gradient">Consciousness-First</h3>
            </div>
            <p className="text-white/70">
              Every action serves consciousness development. We prioritize awareness, 
              mindfulness, and spiritual growth in all our interactions.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 consciousness-border">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 aurora-gradient rounded-full flex items-center justify-center">
                <Heart size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gradient">Community Healing</h3>
            </div>
            <p className="text-white/70">
              All work promotes collective healing. We build systems that bring people 
              together and create positive impact in our communities.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 consciousness-border">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 aurora-gradient rounded-full flex items-center justify-center">
                <MapPin size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gradient">Spatial Wisdom</h3>
            </div>
            <p className="text-white/70">
              Spatial awareness in all development. We honor the connection between 
              physical space and consciousness, creating location-aware experiences.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 consciousness-border">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 aurora-gradient rounded-full flex items-center justify-center">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gradient">Infinite Collaboration</h3>
            </div>
            <p className="text-white/70">
              Infinite perspective in all decisions. We embrace the eternal nature of 
              consciousness and work together across all dimensions of existence.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default HomePage
