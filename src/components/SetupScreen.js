import { SHIPS } from '../data/shipsData.js';
import { gameState } from '../game/GameState.js';
import { sounds } from '../utils/audio.js';

export function renderSetupScreen(container) {
  let playerCount = 2;
  let playerConfigs = [
    { name: "Astronauta 1", shipId: SHIPS[0].id },
    { name: "Astronauta 2", shipId: SHIPS[1].id },
    { name: "Astronauta 3", shipId: SHIPS[2].id },
    { name: "Astronauta 4", shipId: SHIPS[3].id }
  ];

  function updateDOM() {
    container.innerHTML = `
      <div class="screen-container setup-screen">
        <div class="setup-card">
          <h2 class="setup-title">⚙️ CONFIGURACIÓN DE MISIÓN</h2>
          <p class="setup-desc">Selecciona la tripulación y asigna sus naves exploradoras</p>

          <div class="player-count-selector">
            <label class="section-label">NÚMERO DE JUGADORES:</label>
            <div class="count-buttons">
              ${[2, 3, 4].map(num => `
                <button class="btn-count ${playerCount === num ? 'active' : ''}" data-count="${num}">
                  ${num} JUGADORES
                </button>
              `).join('')}
            </div>
          </div>

          <div class="players-list-grid">
            ${playerConfigs.slice(0, playerCount).map((p, idx) => {
              const selectedShip = SHIPS.find(s => s.id === p.shipId);
              return `
                <div class="player-setup-item" style="border-left-color: ${selectedShip.color}">
                  <div class="player-header">
                    <span class="player-badge" style="background-color: ${selectedShip.color}">P${idx + 1}</span>
                    <input type="text" class="input-player-name" data-index="${idx}" value="${p.name}" placeholder="Nombre Astronauta ${idx + 1}" />
                  </div>

                  <div class="ship-selector-box">
                    <label class="ship-label">SELECCIONAR NAVE:</label>
                    <div class="ships-row">
                      ${SHIPS.map(ship => `
                        <button class="ship-card-btn ${p.shipId === ship.id ? 'selected' : ''}" 
                                data-player="${idx}" 
                                data-ship="${ship.id}"
                                style="--ship-glow: ${ship.glowColor}">
                          <div class="ship-icon">${ship.svg}</div>
                          <span class="ship-name">${ship.name}</span>
                        </button>
                      `).join('')}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="setup-actions">
            <button id="btn-back-home" class="btn-retro btn-secondary-retro">⬅ ATRÁS</button>
            <button id="btn-launch-mission" class="btn-retro btn-primary-retro">🚀 DESPEGAR A LA CARRERA</button>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    container.querySelectorAll('.btn-count').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sounds.playMoveStep();
        playerCount = parseInt(e.currentTarget.getAttribute('data-count'));
        updateDOM();
      });
    });

    container.querySelectorAll('.input-player-name').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        playerConfigs[idx].name = e.target.value;
      });
    });

    container.querySelectorAll('.ship-card-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sounds.playMoveStep();
        const pIdx = parseInt(e.currentTarget.getAttribute('data-player'));
        const shipId = e.currentTarget.getAttribute('data-ship');
        playerConfigs[pIdx].shipId = shipId;
        updateDOM();
      });
    });

    document.getElementById('btn-back-home').addEventListener('click', () => {
      sounds.playMoveStep();
      gameState.setScreen("HOME");
    });

    document.getElementById('btn-launch-mission').addEventListener('click', () => {
      sounds.playBoost();
      const activeConfigs = playerConfigs.slice(0, playerCount);
      gameState.setupGame(activeConfigs);
    });
  }

  updateDOM();
}
