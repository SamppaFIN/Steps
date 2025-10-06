const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const path = require('path')

const app = express()
const server = http.createServer(app)

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:3000',
  'https://steps-5b428851bffc.herokuapp.com',
  'https://steps-5b428851bffc.herokuapp.com/',
  process.env.FRONTEND_URL
].filter(Boolean)

const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
})

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(express.json())

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')))

// Game state
const gameState = {
  players: new Map(),
  territories: new Map(),
  events: []
}

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('🌸 Player connected:', socket.id)

  // Player joins game
  socket.on('join-game', (data) => {
    const player = {
      id: socket.id,
      name: data.playerId || 'Anonymous',
      position: { lat: 40.7128, lng: -74.0060 },
      consciousness: 0,
      level: 1,
      territories: [],
      steps: 0,
      healingImpact: 0,
      lastActive: new Date()
    }
    
    gameState.players.set(socket.id, player)
    socket.emit('player-joined', player)
    socket.broadcast.emit('player-joined', player)
    
    console.log('🌸 Player joined:', player.name)
  })

  // Player updates position
  socket.on('update-position', (position) => {
    const player = gameState.players.get(socket.id)
    if (player) {
      player.position = position
      player.lastActive = new Date()
      socket.broadcast.emit('player-position-updated', { playerId: socket.id, position })
    }
  })

  // Player claims territory
  socket.on('claim-territory', (territory) => {
    const player = gameState.players.get(socket.id)
    if (player && player.consciousness >= 50) {
      territory.id = `territory-${Date.now()}-${socket.id}`
      territory.playerId = socket.id
      territory.createdAt = new Date()
      
      gameState.territories.set(territory.id, territory)
      player.territories.push(territory.id)
      player.consciousness -= 50
      
      // Add event
      const event = {
        type: 'territory-claimed',
        data: territory,
        timestamp: new Date(),
        consciousnessImpact: 25
      }
      gameState.events.push(event)
      
      io.emit('territory-claimed', territory)
      io.emit('consciousness-gained', { playerId: socket.id, consciousness: player.consciousness })
      
      console.log('🌸 Territory claimed:', territory.id)
    }
  })

  // Player updates consciousness
  socket.on('update-consciousness', (data) => {
    const player = gameState.players.get(socket.id)
    if (player) {
      player.consciousness += data.consciousness || 0
      player.level = Math.floor(player.consciousness / 100) + 1
      
      // Check for healing zone creation
      if (player.consciousness > 150 && !player.territories.some(t => gameState.territories.get(t)?.isHealingZone)) {
        const healingZone = {
          territoryId: player.territories[player.territories.length - 1],
          healingPower: player.consciousness * 0.1
        }
        
        const territory = gameState.territories.get(healingZone.territoryId)
        if (territory) {
          territory.isHealingZone = true
          territory.healingPower = healingZone.healingPower
          
          io.emit('healing-zone-created', healingZone)
          console.log('🌸 Healing zone created:', healingZone.territoryId)
        }
      }
      
      io.emit('consciousness-gained', { playerId: socket.id, consciousness: player.consciousness })
    }
  })

  // Player leaves game
  socket.on('leave-game', () => {
    const player = gameState.players.get(socket.id)
    if (player) {
      gameState.players.delete(socket.id)
      socket.broadcast.emit('player-left', socket.id)
      console.log('🌸 Player left:', player.name)
    }
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    const player = gameState.players.get(socket.id)
    if (player) {
      gameState.players.delete(socket.id)
      socket.broadcast.emit('player-left', socket.id)
      console.log('🌸 Player disconnected:', player.name)
    }
  })
})

// API Routes
app.get('/api/game-state', (req, res) => {
  res.json({
    players: Array.from(gameState.players.values()),
    territories: Array.from(gameState.territories.values()),
    events: gameState.events.slice(-50) // Last 50 events
  })
})

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    players: gameState.players.size,
    territories: gameState.territories.size,
    timestamp: new Date().toISOString()
  })
})

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log('🌸 Sacred Steps Server running on port', PORT)
  console.log('🌸 Consciousness-aware multiplayer ready!')
  console.log('🌸 Serving React app from dist/ directory')
})
