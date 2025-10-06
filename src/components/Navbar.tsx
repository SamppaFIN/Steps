import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MapPin, User, Users, Brain, Home } from 'lucide-react'
import { useConsciousness } from '../game/ConsciousnessContext'
import { useGame } from '../game/GameContext'

const Navbar = () => {
  const location = useLocation()
  const { metrics } = useConsciousness()
  const { state } = useGame()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/game', icon: MapPin, label: 'Game' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/consciousness', icon: Brain, label: 'Consciousness' },
    { path: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 aurora-gradient rounded-full flex items-center justify-center glowing-element">
              <span className="text-white font-bold text-lg">🌸</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">Sacred Steps</h1>
              <p className="text-sm text-white/70">Territory of Consciousness</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'aurora-gradient text-white cosmic-glow'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Consciousness Status */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-white/70">Consciousness</div>
              <div className="text-lg font-bold text-consciousness-400">
                {metrics.points}
              </div>
            </div>
            <div className="w-12 h-12 consciousness-border rounded-full flex items-center justify-center breathing-element">
              <span className="text-2xl">🧠</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex justify-center space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'aurora-gradient text-white cosmic-glow'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
