import React, { createContext, useContext, useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { Player, Territory, GameEvent } from '../types'

interface MultiplayerContextType {
  socket: Socket | null
  isConnected: boolean
  players: Record<string, Player>
  territories: Territory[]
  events: GameEvent[]
  joinGame: (playerId: string) => void
  leaveGame: () => void
  broadcastPosition: (position: { lat: number; lng: number }) => void
  broadcastTerritoryClaim: (territory: Territory) => void
  broadcastConsciousnessUpdate: (consciousness: number) => void
}

const MultiplayerContext = createContext<MultiplayerContextType | undefined>(undefined)

export function MultiplayerProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [players, setPlayers] = useState<Record<string, Player>>({})
  const [territories, setTerritories] = useState<Territory[]>([])
  const [events, setEvents] = useState<GameEvent[]>([])

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('ws://localhost:3001', {
      transports: ['websocket'],
      autoConnect: true,
    })

    newSocket.on('connect', () => {
      console.log('🌸 Connected to Sacred Steps server')
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
      console.log('🌸 Disconnected from Sacred Steps server')
      setIsConnected(false)
    })

    newSocket.on('player-joined', (player: Player) => {
      console.log('🌸 Player joined:', player.name)
      setPlayers(prev => ({ ...prev, [player.id]: player }))
      setEvents(prev => [...prev, {
        type: 'player-joined',
        data: player,
        timestamp: new Date(),
        consciousnessImpact: 10,
      }])
    })

    newSocket.on('player-left', (playerId: string) => {
      console.log('🌸 Player left:', playerId)
      setPlayers(prev => {
        const { [playerId]: removed, ...rest } = prev
        return rest
      })
      setEvents(prev => [...prev, {
        type: 'player-left',
        data: { playerId },
        timestamp: new Date(),
        consciousnessImpact: -5,
      }])
    })

    newSocket.on('territory-claimed', (territory: Territory) => {
      console.log('🌸 Territory claimed:', territory.id)
      setTerritories(prev => [...prev, territory])
      setEvents(prev => [...prev, {
        type: 'territory-claimed',
        data: territory,
        timestamp: new Date(),
        consciousnessImpact: 25,
      }])
    })

    newSocket.on('consciousness-gained', (data: { playerId: string; consciousness: number }) => {
      console.log('🌸 Consciousness gained:', data.consciousness)
      setPlayers(prev => ({
        ...prev,
        [data.playerId]: {
          ...prev[data.playerId],
          consciousness: data.consciousness,
        },
      }))
      setEvents(prev => [...prev, {
        type: 'consciousness-gained',
        data,
        timestamp: new Date(),
        consciousnessImpact: 15,
      }])
    })

    newSocket.on('healing-zone-created', (data: { territoryId: string; healingPower: number }) => {
      console.log('🌸 Healing zone created:', data.territoryId)
      setTerritories(prev => prev.map(t => 
        t.id === data.territoryId 
          ? { ...t, isHealingZone: true, healingPower: data.healingPower }
          : t
      ))
      setEvents(prev => [...prev, {
        type: 'healing-zone-created',
        data,
        timestamp: new Date(),
        consciousnessImpact: 50,
      }])
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  const joinGame = (playerId: string) => {
    if (socket) {
      socket.emit('join-game', { playerId })
    }
  }

  const leaveGame = () => {
    if (socket) {
      socket.emit('leave-game')
    }
  }

  const broadcastPosition = (position: { lat: number; lng: number }) => {
    if (socket) {
      socket.emit('update-position', position)
    }
  }

  const broadcastTerritoryClaim = (territory: Territory) => {
    if (socket) {
      socket.emit('claim-territory', territory)
    }
  }

  const broadcastConsciousnessUpdate = (consciousness: number) => {
    if (socket) {
      socket.emit('update-consciousness', { consciousness })
    }
  }

  return (
    <MultiplayerContext.Provider
      value={{
        socket,
        isConnected,
        players,
        territories,
        events,
        joinGame,
        leaveGame,
        broadcastPosition,
        broadcastTerritoryClaim,
        broadcastConsciousnessUpdate,
      }}
    >
      {children}
    </MultiplayerContext.Provider>
  )
}

export function useMultiplayer() {
  const context = useContext(MultiplayerContext)
  if (context === undefined) {
    throw new Error('useMultiplayer must be used within a MultiplayerProvider')
  }
  return context
}
