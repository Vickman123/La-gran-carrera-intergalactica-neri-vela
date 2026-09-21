import { SPACES } from '../data/spacesData.js';
import { SHIPS } from '../data/shipsData.js';

class GameStateManager {
  constructor() {
    this.screen = "HOME"; // "HOME", "SETUP", "BOARD", "VICTORY"
    this.players = [];
    this.currentPlayerIndex = 0;
    this.diceValue = 1;
    this.phase = "WAIT_ROLL"; // "WAIT_ROLL", "ROLLING", "MOVING", "EVENT_TRIGGERED", "NEXT_TURN"
    this.history = [];
    this.activeQuestion = null;
    this.winner = null;
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this));
  }

  setScreen(newScreen) {
    this.screen = newScreen;
    this.notify();
  }

  setupGame(playerConfigs) {
    // playerConfigs: [{ name, shipId }]
    this.players = playerConfigs.map((cfg, idx) => {
      const shipDef = SHIPS.find(s => s.id === cfg.shipId) || SHIPS[idx % SHIPS.length];
      return {
        id: idx + 1,
        name: cfg.name || `Astronauta ${idx + 1}`,
        shipId: shipDef.id,
        ship: shipDef,
        color: shipDef.color,
        position: 0, // Inicia en casilla 0 (INICIO)
        skipsTurn: false,
        stats: {
          rollsCount: 0,
          questionsAnswered: 0,
          boostsHit: 0,
          hazardsHit: 0
        }
      };
    });

    this.currentPlayerIndex = 0;
    this.diceValue = 1;
    this.phase = "WAIT_ROLL";
    this.history = [];
    this.addLog(`¡La Carrera ha comenzado con ${this.players.length} naves espaciales!`);
    this.activeQuestion = null;
    this.winner = null;
    this.setScreen("BOARD");
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  addLog(message) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.history.unshift({ time, text: message });
    if (this.history.length > 30) this.history.pop();
    this.notify();
  }

  setDiceValue(val) {
    this.diceValue = val;
    this.notify();
  }

  setPhase(newPhase) {
    this.phase = newPhase;
    this.notify();
  }

  updatePlayerPosition(playerId, newPos) {
    const p = this.players.find(pl => pl.id === playerId);
    if (p) {
      p.position = Math.min(newPos, SPACES.length - 1);
      this.notify();
    }
  }

  nextTurn() {
    if (this.winner) return;

    let attempts = 0;
    do {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      attempts++;
    } while (this.players[this.currentPlayerIndex].skipsTurn && attempts < this.players.length);

    // Si el jugador actual tenía turno congelado, consumirlo
    const curr = this.getCurrentPlayer();
    if (curr.skipsTurn) {
      curr.skipsTurn = false;
      this.addLog(`¡${curr.name} recupera el control del propulsor para su siguiente turno!`);
    }

    this.phase = "WAIT_ROLL";
    this.addLog(`Turno de: ${curr.name}`);
    this.notify();
  }

  setWinner(player) {
    this.winner = player;
    this.addLog(`🏆 ¡${player.name} ha ganado LA GRAN CARRERA INTERGALÁCTICA!`);
    this.setScreen("VICTORY");
  }

  resetGame() {
    this.screen = "HOME";
    this.players = [];
    this.currentPlayerIndex = 0;
    this.diceValue = 1;
    this.phase = "WAIT_ROLL";
    this.history = [];
    this.activeQuestion = null;
    this.winner = null;
    this.notify();
  }
}

export const gameState = new GameStateManager();
