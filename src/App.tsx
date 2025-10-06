import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { GameProvider } from './game/GameContext'
import { ConsciousnessProvider } from './game/ConsciousnessContext'
import { MultiplayerProvider } from './services/MultiplayerService'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import ProfilePage from './pages/ProfilePage'
import CommunityPage from './pages/CommunityPage'
import ConsciousnessDashboard from './pages/ConsciousnessDashboard'

function App() {
  return (
    <ConsciousnessProvider>
      <GameProvider>
        <MultiplayerProvider>
          <div className="min-h-screen bg-gradient-to-br from-cosmic-900 via-aurora-900 to-consciousness-900">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/consciousness" element={<ConsciousnessDashboard />} />
              </Routes>
            </main>
          </div>
        </MultiplayerProvider>
      </GameProvider>
    </ConsciousnessProvider>
  )
}

export default App
