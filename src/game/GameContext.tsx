import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { GameState, Player, Territory, ConsciousnessMetrics, SacredPrinciple } from '../types'

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  updatePlayerPosition: (position: { lat: number; lng: number }) => void
  claimTerritory: (position: { lat: number; lng: number }) => void
  validateSacredPrinciples: () => SacredPrinciple[]
  calculateConsciousnessMetrics: () => ConsciousnessMetrics
}

type GameAction =
  | { type: 'SET_PLAYER'; payload: Player }
  | { type: 'UPDATE_POSITION'; payload: { lat: number; lng: number } }
  | { type: 'ADD_TERRITORY'; payload: Territory }
  | { type: 'UPDATE_CONSCIOUSNESS'; payload: number }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'UPDATE_HEALING_METRICS'; payload: any }

const initialState: GameState = {
  players: {},
  territories: [],
  currentPlayer: null,
  isConnected: false,
  consciousnessLevel: 'low',
  healingMetrics: {
    totalHealing: 0,
    communityConnections: 0,
    spatialWisdom: 0,
  },
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_PLAYER':
      return {
        ...state,
        currentPlayer: action.payload,
        players: {
          ...state.players,
          [action.payload.id]: action.payload,
        },
      }
    case 'UPDATE_POSITION':
      if (!state.currentPlayer) return state
      const updatedPlayer = {
        ...state.currentPlayer,
        position: action.payload,
      }
      return {
        ...state,
        currentPlayer: updatedPlayer,
        players: {
          ...state.players,
          [updatedPlayer.id]: updatedPlayer,
        },
      }
    case 'ADD_TERRITORY':
      return {
        ...state,
        territories: [...state.territories, action.payload],
      }
    case 'UPDATE_CONSCIOUSNESS':
      if (!state.currentPlayer) return state
      const consciousnessPoints = state.currentPlayer.consciousness + action.payload
      const newLevel = Math.floor(consciousnessPoints / 100) + 1
      const updatedPlayerWithConsciousness = {
        ...state.currentPlayer,
        consciousness: consciousnessPoints,
        level: newLevel,
      }
      return {
        ...state,
        currentPlayer: updatedPlayerWithConsciousness,
        players: {
          ...state.players,
          [updatedPlayerWithConsciousness.id]: updatedPlayerWithConsciousness,
        },
        consciousnessLevel: consciousnessPoints > 200 ? 'high' : consciousnessPoints > 100 ? 'medium' : 'low',
      }
    case 'SET_CONNECTED':
      return {
        ...state,
        isConnected: action.payload,
      }
    case 'UPDATE_HEALING_METRICS':
      return {
        ...state,
        healingMetrics: {
          ...state.healingMetrics,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const updatePlayerPosition = (position: { lat: number; lng: number }) => {
    dispatch({ type: 'UPDATE_POSITION', payload: position })
  }

  const claimTerritory = (position: { lat: number; lng: number }) => {
    if (!state.currentPlayer || state.currentPlayer.consciousness < 50) return

    const territory: Territory = {
      id: `territory-${Date.now()}`,
      playerId: state.currentPlayer.id,
      position,
      radius: 50,
      consciousness: state.currentPlayer.consciousness,
      healingPower: state.currentPlayer.consciousness * 0.1,
      color: state.currentPlayer.consciousness > 150 ? '#22c55e' : state.currentPlayer.consciousness > 100 ? '#3b82f6' : '#8b5cf6',
      createdAt: new Date(),
      isHealingZone: state.currentPlayer.consciousness > 150,
    }

    dispatch({ type: 'ADD_TERRITORY', payload: territory })
    dispatch({ type: 'UPDATE_CONSCIOUSNESS', payload: -50 })
  }

  const validateSacredPrinciples = (): SacredPrinciple[] => {
    return [
      {
        name: 'consciousness-first',
        description: 'Every action serves consciousness development',
        validation: state.currentPlayer?.consciousness > 0,
        impact: state.currentPlayer?.consciousness || 0,
      },
      {
        name: 'community-healing',
        description: 'All work promotes collective healing',
        validation: state.healingMetrics.totalHealing > 0,
        impact: state.healingMetrics.totalHealing,
      },
      {
        name: 'spatial-wisdom',
        description: 'Spatial awareness in all development',
        validation: state.healingMetrics.spatialWisdom > 0,
        impact: state.healingMetrics.spatialWisdom,
      },
      {
        name: 'infinite-collaboration',
        description: 'Infinite perspective in all decisions',
        validation: state.healingMetrics.communityConnections > 0,
        impact: state.healingMetrics.communityConnections,
      },
    ]
  }

  const calculateConsciousnessMetrics = (): ConsciousnessMetrics => {
    if (!state.currentPlayer) {
      return {
        level: 0,
        points: 0,
        spatialAwareness: 0,
        communityConnection: 0,
        wisdomSharing: 0,
        healingImpact: 0,
        lastUpdated: new Date(),
      }
    }

    return {
      level: state.currentPlayer.level,
      points: state.currentPlayer.consciousness,
      spatialAwareness: state.healingMetrics.spatialWisdom,
      communityConnection: state.healingMetrics.communityConnections,
      wisdomSharing: state.currentPlayer.consciousness * 0.1,
      healingImpact: state.healingMetrics.totalHealing,
      lastUpdated: new Date(),
    }
  }

  useEffect(() => {
    // Initialize player
    const player: Player = {
      id: `player-${Date.now()}`,
      name: 'Infinite',
      position: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
      consciousness: 0,
      level: 1,
      territories: [],
      steps: 0,
      healingImpact: 0,
      lastActive: new Date(),
    }
    dispatch({ type: 'SET_PLAYER', payload: player })
  }, [])

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        updatePlayerPosition,
        claimTerritory,
        validateSacredPrinciples,
        calculateConsciousnessMetrics,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
