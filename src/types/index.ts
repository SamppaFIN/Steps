export interface Player {
  id: string
  name: string
  position: {
    lat: number
    lng: number
  }
  consciousness: number
  level: number
  territories: Territory[]
  steps: number
  healingImpact: number
  lastActive: Date
}

export interface Territory {
  id: string
  playerId: string
  position: {
    lat: number
    lng: number
  }
  radius: number
  consciousness: number
  healingPower: number
  color: string
  createdAt: Date
  isHealingZone: boolean
}

export interface GameState {
  players: Record<string, Player>
  territories: Territory[]
  currentPlayer: Player | null
  isConnected: boolean
  consciousnessLevel: 'low' | 'medium' | 'high'
  healingMetrics: {
    totalHealing: number
    communityConnections: number
    spatialWisdom: number
  }
}

export interface ConsciousnessMetrics {
  level: number
  points: number
  spatialAwareness: number
  communityConnection: number
  wisdomSharing: number
  healingImpact: number
  lastUpdated: Date
}

export interface SacredPrinciple {
  name: 'consciousness-first' | 'community-healing' | 'spatial-wisdom' | 'infinite-collaboration'
  description: string
  validation: boolean
  impact: number
}

export interface HealingZone {
  id: string
  position: {
    lat: number
    lng: number
  }
  radius: number
  healingPower: number
  participants: string[]
  createdAt: Date
  isActive: boolean
}

export interface GameEvent {
  type: 'territory-claimed' | 'consciousness-gained' | 'healing-zone-created' | 'player-joined' | 'player-left'
  data: any
  timestamp: Date
  consciousnessImpact: number
}
