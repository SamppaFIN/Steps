import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Circle, useMapEvents, useMap } from 'react-leaflet'
import { motion } from 'framer-motion'
import { MapPin, Users, Brain, Heart, Zap } from 'lucide-react'
import { useGame } from '../game/GameContext'
import { useConsciousness } from '../game/ConsciousnessContext'
import { useMultiplayer } from '../services/MultiplayerService'
import { ConsciousnessCard, HealingImpactCard, TerritoryStatsCard } from '../components/ConsciousnessCards'
import 'leaflet/dist/leaflet.css'

const MapEvents = () => {
  const { updatePlayerPosition, claimTerritory } = useGame()
  const { broadcastPosition, broadcastTerritoryClaim } = useMultiplayer()

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng
      updatePlayerPosition({ lat, lng })
      broadcastPosition({ lat, lng })
      
      // Claim territory on click
      claimTerritory({ lat, lng })
      broadcastTerritoryClaim({
        id: `territory-${Date.now()}`,
        playerId: 'current-player',
        position: { lat, lng },
        radius: 50,
        consciousness: 100,
        healingPower: 10,
        color: '#22c55e',
        createdAt: new Date(),
        isHealingZone: true,
      })
    },
  })

  return null
}

// Component to update map view when position changes
const MapViewUpdater = ({ position }: { position: { lat: number; lng: number } }) => {
  const map = useMap()
  
  useEffect(() => {
    if (position.lat !== 40.7128 || position.lng !== -74.0060) {
      map.setView([position.lat, position.lng], 13)
    }
  }, [position, map])

  return null
}

const GamePage = () => {
  const { state } = useGame()
  const { metrics } = useConsciousness()
  const { isConnected } = useMultiplayer()
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number }>({
    lat: 40.7128,
    lng: -74.0060,
  })
  const [isLocationLoading, setIsLocationLoading] = useState(true)

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location found:', position.coords.latitude, position.coords.longitude)
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setIsLocationLoading(false)
        },
        (error) => {
          console.log('Error getting location:', error)
          setIsLocationLoading(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      )
    } else {
      setIsLocationLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Sacred Territory Map</h1>
            <p className="text-white/70">
              {isLocationLoading ? 'Finding your location...' : 'Walk to claim territories and build consciousness'}
            </p>
            {!isLocationLoading && (
              <p className="text-sm text-white/50">
                📍 {currentPosition.lat.toFixed(4)}, {currentPosition.lng.toFixed(4)}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-lg ${isLocationLoading ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isLocationLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
                <span className="text-sm font-medium">
                  {isLocationLoading ? 'Locating...' : 'Location Found'}
                </span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-lg ${isConnected ? 'bg-consciousness-500/20 text-consciousness-400' : 'bg-red-500/20 text-red-400'}`}>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-consciousness-400' : 'bg-red-400'}`} />
                <span className="text-sm font-medium">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Map */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl overflow-hidden consciousness-border"
          >
            <div className="h-96 lg:h-[600px]">
              <MapContainer
                center={currentPosition}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                className="rounded-2xl"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Player Marker */}
                <Marker position={currentPosition}>
                  <div className="w-8 h-8 aurora-gradient rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🌸</span>
                  </div>
                </Marker>

                {/* Territories */}
                {state.territories.map((territory) => (
                  <Circle
                    key={territory.id}
                    center={[territory.position.lat, territory.position.lng]}
                    radius={territory.radius}
                    pathOptions={{
                      color: territory.color,
                      fillColor: territory.color,
                      fillOpacity: 0.3,
                      weight: 2,
                    }}
                  />
                ))}

                <MapEvents />
                <MapViewUpdater position={currentPosition} />
              </MapContainer>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ConsciousnessCard />
          <HealingImpactCard />
          <TerritoryStatsCard />
        </div>
      </div>

      {/* Game Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 glass-effect rounded-2xl p-6 consciousness-border"
      >
        <h3 className="text-xl font-bold text-gradient mb-4">How to Play</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 aurora-gradient rounded-full mx-auto mb-3 flex items-center justify-center">
              <MapPin size={24} className="text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">1. Click Map</h4>
            <p className="text-sm text-white/70">Click anywhere on the map to claim territory</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 aurora-gradient rounded-full mx-auto mb-3 flex items-center justify-center">
              <Brain size={24} className="text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">2. Gain Consciousness</h4>
            <p className="text-sm text-white/70">Each territory claim increases your consciousness</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 aurora-gradient rounded-full mx-auto mb-3 flex items-center justify-center">
              <Heart size={24} className="text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">3. Create Healing Zones</h4>
            <p className="text-sm text-white/70">High consciousness creates healing zones</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 aurora-gradient rounded-full mx-auto mb-3 flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">4. Join Community</h4>
            <p className="text-sm text-white/70">Connect with other consciousness builders</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default GamePage
