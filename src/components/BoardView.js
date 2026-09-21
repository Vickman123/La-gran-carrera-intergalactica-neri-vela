import { SPACES } from '../data/spacesData.js';
import { gameState } from '../game/GameState.js';
import { getPlayerPositionOffset } from '../utils/pathCalc.js';

export class BoardView {
  constructor(container) {
    this.container = container;
    this.hoveredSpace = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="board-wrapper">
        <!-- SVG Canvas Vectorial (Coordenadas Virtuales 1000x750 que coinciden exactamente con la imagen original) -->
        <svg id="board-svg" viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid meet">
          <defs>
            <!-- Filtro de Neón y Brillo de Selección -->
            <filter id="tile-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="token-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#00f0ff" flood-opacity="0.8"/>
            </filter>
          </defs>

          <!-- 1. IMAGEN DE FONDO: TABLERO FÍSICO ORIGINAL DE LOS 90S -->
          <image href="/board_original.jpg" x="0" y="0" width="1000" height="750" preserveAspectRatio="none" />

          <!-- 2. CAPA INVISIBLE / HIGHLIGHT DE CASILLAS INTERACTIVAS -->
          <g id="spaces-interactive-layer">
            ${SPACES.map(space => this.renderInteractiveTile(space)).join('')}
          </g>

          <!-- 3. CAPA DE PEONES / NAVES DE JUGADORES SUPERPUESTAS -->
          <g id="tokens-layer">
            <!-- Renderizado dinámico de naves -->
          </g>
        </svg>

        <!-- Tooltip flotante para casillas -->
        <div id="space-tooltip" class="space-tooltip hidden"></div>
      </div>
    `;

    this.attachEventListeners();
    this.updateTokens();
  }

  renderInteractiveTile(space) {
    const isStart = space.type === "start";
    const isFinish = space.type === "finish";

    let highlightStroke = "rgba(255, 255, 255, 0.2)";
    if (space.color === "orange") highlightStroke = "rgba(255, 170, 0, 0.3)";
    if (space.color === "cyan") highlightStroke = "rgba(0, 240, 255, 0.3)";

    return `
      <g class="space-tile-group" data-id="${space.id}" transform="translate(${space.pos.x}, ${space.pos.y}) rotate(${space.angle})">
        <!-- Hotspot interactivo semi-transparente sobre la casilla impresa -->
        <rect x="-14" y="-10" width="28" height="20" rx="3" ry="3" 
              fill="rgba(0, 0, 0, 0.05)" 
              stroke="${highlightStroke}" 
              stroke-width="1.5" 
              class="space-rect-hotspot" />
        
        <!-- Indicador flotante sutil con número de casilla -->
        <circle cx="-10" cy="-8" r="5" fill="rgba(0,0,0,0.6)" stroke="${highlightStroke}" stroke-width="0.8"/>
        <text x="-10" y="-6" text-anchor="middle" fill="#ffffff" font-size="6" font-weight="bold" font-family="sans-serif">
          ${isStart ? 'S' : isFinish ? '★' : space.id}
        </text>
      </g>
    `;
  }

  attachEventListeners() {
    const tooltipEl = document.getElementById("space-tooltip");

    this.container.querySelectorAll(".space-tile-group").forEach(el => {
      el.addEventListener("mouseenter", (e) => {
        const id = parseInt(e.currentTarget.getAttribute("data-id"));
        const space = SPACES.find(s => s.id === id);
        if (space && tooltipEl) {
          tooltipEl.classList.remove("hidden");
          tooltipEl.innerHTML = `
            <div class="tooltip-header" style="color: ${space.color === 'orange' ? '#ffaa00' : space.color === 'cyan' ? '#00f0ff' : '#ffffff'}">
              Casilla #${space.id}: ${space.name}
            </div>
            <div class="tooltip-body">${space.desc}</div>
            <div class="tooltip-type">TIPO: ${space.type.toUpperCase()}</div>
          `;
        }
      });

      el.addEventListener("mousemove", (e) => {
        if (tooltipEl) {
          tooltipEl.style.left = `${e.clientX + 15}px`;
          tooltipEl.style.top = `${e.clientY + 15}px`;
        }
      });

      el.addEventListener("mouseleave", () => {
        if (tooltipEl) tooltipEl.classList.add("hidden");
      });
    });
  }

  updateTokens() {
    const layer = document.getElementById("tokens-layer");
    if (!layer) return;

    layer.innerHTML = "";

    // Agrupar jugadores por casilla para que no se encima uno sobre otro
    const playersBySpace = {};
    gameState.players.forEach(p => {
      if (!playersBySpace[p.position]) playersBySpace[p.position] = [];
      playersBySpace[p.position].push(p);
    });

    gameState.players.forEach(player => {
      const space = SPACES[player.position] || SPACES[0];
      const occupants = playersBySpace[player.position];
      const pIdx = occupants.indexOf(player);

      const offset = getPlayerPositionOffset(pIdx, occupants.length);
      const posX = space.pos.x + offset.dx;
      const posY = space.pos.y + offset.dy;
      const isCurrentTurn = gameState.getCurrentPlayer().id === player.id;

      const tokenG = document.createElementNS("http://www.w3.org/2000/svg", "g");
      tokenG.setAttribute("class", `player-token ${isCurrentTurn ? 'active-turn' : ''}`);
      tokenG.setAttribute("transform", `translate(${posX}, ${posY})`);

      tokenG.innerHTML = `
        <!-- Anillo de resplandor para el jugador en turno -->
        ${isCurrentTurn ? `<circle cx="0" cy="0" r="18" fill="none" stroke="${player.color}" stroke-width="2.5" class="pulse-ring"/>` : ''}

        <!-- Fondo circular de la ficha -->
        <circle cx="0" cy="0" r="14" fill="rgba(8, 10, 24, 0.85)" stroke="${player.color}" stroke-width="2" />

        <!-- Dibujo vectorial exacto de la nave espacial (30x30px perfectamente escalada) -->
        <g transform="translate(-15, -15)">
          ${player.ship.path}
        </g>

        <!-- Placa distintiva de Jugador (P1, P2, P3, P4) -->
        <g transform="translate(10, -10)">
          <circle cx="0" cy="0" r="7" fill="${player.color}" stroke="#ffffff" stroke-width="1"/>
          <text x="0" y="3" text-anchor="middle" fill="#ffffff" font-size="8" font-weight="900" font-family="sans-serif">P${player.id}</text>
        </g>
      `;

      layer.appendChild(tokenG);
    });
  }
}
