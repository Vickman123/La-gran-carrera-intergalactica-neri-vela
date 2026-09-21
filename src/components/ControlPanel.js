import { SPACES } from '../data/spacesData.js';
import { gameState } from '../game/GameState.js';
import { turnManager } from '../game/TurnManager.js';
import { sounds } from '../utils/audio.js';

export class ControlPanel {
  constructor(container, boardRenderer) {
    this.container = container;
    this.boardRenderer = boardRenderer;
  }

  render() {
    const currPlayer = gameState.getCurrentPlayer();
    const currSpace = SPACES[currPlayer.position] || SPACES[0];
    const isWaitingRoll = gameState.phase === "WAIT_ROLL";

    this.container.innerHTML = `
      <div class="control-panel">
        <!-- 1. JUGADOR EN TURNO ACTUAL -->
        <div class="card-turn-info" style="border-top-color: ${currPlayer.color}">
          <div class="turn-header">
            <span class="turn-tag">TURNO ACTUAL</span>
            <div class="player-avatar-badge" style="background-color: ${currPlayer.color}">
              P${currPlayer.id}
            </div>
          </div>
          <h3 class="player-turn-name" style="color: ${currPlayer.color}">${currPlayer.name}</h3>
          <div class="player-ship-title">${currPlayer.ship.name}</div>

          <div class="current-space-box">
            <span class="space-badge-color space-${currSpace.color}">Casilla #${currSpace.id}</span>
            <div class="space-name-text">${currSpace.name}</div>
          </div>
        </div>

        <!-- 2. DADO DIGITAL E BOTÓN DE ACCIÓN -->
        <div class="card-dice-section">
          <div class="dice-display-box">
            <div class="dice-cube ${gameState.phase === 'ROLLING' ? 'rolling' : ''}">
              <span class="dice-face-val">${gameState.diceValue}</span>
            </div>
          </div>

          <button id="btn-roll-dice" class="btn-retro btn-roll-dice" ${!isWaitingRoll ? 'disabled' : ''}>
            <span class="btn-text">${gameState.phase === 'ROLLING' ? 'TIRANDO...' : '🎲 LANZAR DADO'}</span>
          </button>
        </div>

        <!-- 3. PROGRESO DE LA TRIPULACIÓN (BARRA HACIA LA TIERRA) -->
        <div class="card-leaderboard">
          <h4 class="card-subtitle">📊 PROGRESO DE NAVEGACIÓN</h4>
          <div class="progress-players-list">
            ${gameState.players.map(p => {
              const percent = Math.round((p.position / (SPACES.length - 1)) * 100);
              const isTurn = p.id === currPlayer.id;
              return `
                <div class="player-progress-row ${isTurn ? 'row-active' : ''}">
                  <div class="row-info">
                    <span class="row-name" style="color: ${p.color}">P${p.id} ${p.name}</span>
                    <span class="row-space">Casilla ${p.position}/${SPACES.length - 1} (${percent}%)</span>
                  </div>
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${percent}%; background-color: ${p.color}"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- 4. BITÁCORA DE NAVEGACIÓN (LOG DE MOVIMIENTOS) -->
        <div class="card-history-log">
          <h4 class="card-subtitle">📜 BITÁCORA DE MISIÓN</h4>
          <div class="history-list">
            ${gameState.history.map(item => `
              <div class="history-item">
                <span class="history-time">[${item.time}]</span> ${item.text}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    const rollBtn = document.getElementById("btn-roll-dice");
    if (rollBtn) {
      rollBtn.addEventListener("click", () => {
        turnManager.rollDiceAndMove(this.boardRenderer);
      });
    }
  }
}
