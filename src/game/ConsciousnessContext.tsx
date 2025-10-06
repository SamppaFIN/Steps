import React, { createContext, useContext, useState, useEffect } from 'react'
import { ConsciousnessMetrics, SacredPrinciple } from '../types'

interface ConsciousnessContextType {
  metrics: ConsciousnessMetrics
  sacredPrinciples: SacredPrinciple[]
  updateConsciousness: (points: number) => void
  validatePrinciple: (principle: string) => boolean
  getConsciousnessLevel: () => 'low' | 'medium' | 'high'
  calculateHealingImpact: () => number
}

const ConsciousnessContext = createContext<ConsciousnessContextType | undefined>(undefined)

export function ConsciousnessProvider({ children }: { children: React.ReactNode }) {
  const [metrics, setMetrics] = useState<ConsciousnessMetrics>({
    level: 1,
    points: 0,
    spatialAwareness: 0,
    communityConnection: 0,
    wisdomSharing: 0,
    healingImpact: 0,
    lastUpdated: new Date(),
  })

  const [sacredPrinciples] = useState<SacredPrinciple[]>([
    {
      name: 'consciousness-first',
      description: 'Every action serves consciousness development',
      validation: true,
      impact: 0,
    },
    {
      name: 'community-healing',
      description: 'All work promotes collective healing',
      validation: true,
      impact: 0,
    },
    {
      name: 'spatial-wisdom',
      description: 'Spatial awareness in all development',
      validation: true,
      impact: 0,
    },
    {
      name: 'infinite-collaboration',
      description: 'Infinite perspective in all decisions',
      validation: true,
      impact: 0,
    },
  ])

  const updateConsciousness = (points: number) => {
    setMetrics(prev => ({
      ...prev,
      points: prev.points + points,
      level: Math.floor((prev.points + points) / 100) + 1,
      lastUpdated: new Date(),
    }))
  }

  const validatePrinciple = (principle: string): boolean => {
    const principleObj = sacredPrinciples.find(p => p.name === principle)
    return principleObj?.validation || false
  }

  const getConsciousnessLevel = (): 'low' | 'medium' | 'high' => {
    if (metrics.points > 200) return 'high'
    if (metrics.points > 100) return 'medium'
    return 'low'
  }

  const calculateHealingImpact = (): number => {
    return metrics.points * 0.1 + metrics.communityConnection * 0.5 + metrics.spatialAwareness * 0.3
  }

  useEffect(() => {
    // Simulate consciousness growth over time
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        spatialAwareness: prev.spatialAwareness + 0.1,
        communityConnection: prev.communityConnection + 0.05,
        wisdomSharing: prev.wisdomSharing + 0.02,
        healingImpact: calculateHealingImpact(),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ConsciousnessContext.Provider
      value={{
        metrics,
        sacredPrinciples,
        updateConsciousness,
        validatePrinciple,
        getConsciousnessLevel,
        calculateHealingImpact,
      }}
    >
      {children}
    </ConsciousnessContext.Provider>
  )
}

export function useConsciousness() {
  const context = useContext(ConsciousnessContext)
  if (context === undefined) {
    throw new Error('useConsciousness must be used within a ConsciousnessProvider')
  }
  return context
}
