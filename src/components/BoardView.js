import { SPACES } from '../data/spacesData.js';
import { gameState } from '../game/GameState.js';
import { getPlayerPositionOffset } from '../utils/pathCalc.js';

export class BoardView {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <div class="board-wrapper">
        <!-- Canvas SVG Vectorial Pro (Coordenadas Virtuales 1000 x 750) -->
        <svg id="board-svg" viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid meet">
          <defs>
            <!-- Filtros de Resplandor Neón -->
            <filter id="glow-cyan-rail" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#00f0ff" flood-opacity="0.7"/>
            </filter>
            
            <filter id="glow-gold-token" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ffd700" flood-opacity="0.9"/>
            </filter>

            <!-- Gradientes Neón para Casillas de la Ruta -->
            <linearGradient id="tile-grad-white" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="100%" stop-color="#d6d6f5"/>
            </linearGradient>

            <linearGradient id="tile-grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ff7700"/>
              <stop offset="100%" stop-color="#cc2200"/>
            </linearGradient>

            <linearGradient id="tile-grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00f0ff"/>
              <stop offset="100%" stop-color="#0055ff"/>
            </linearGradient>
          </defs>

          <!-- 1. IMAGEN DE ARTE ESPACIAL EN ALTA DEFINICIÓN -->
          <image href="/board_art.png" x="0" y="0" width="1000" height="750" preserveAspectRatio="none" />

          <!-- 2. LÍNEA CONTINUA GUÍA DE LA RUTA EN ESTILO ESCALERA -->
          <path d="${this.buildPathString()}" fill="none" stroke="rgba(255, 255, 255, 0.15)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" />

          <!-- 3. CASILLAS RECTANGULARES INTERACTIVAS -->
          <g id="spaces-layer">
            ${SPACES.map(space => this.renderTile(space)).join('')}
          </g>

          <!-- 4. CAPA DE FICHAS Y NAVES DE JUGADORES -->
          <g id="tokens-layer">
            <!-- Renderizado dinámico de peones -->
          </g>
        </svg>

        <!-- Tooltip flotante interactivo -->
        <div id="space-tooltip" class="space-tooltip hidden"></div>
      </div>
    `;

    this.attachEventListeners();
    this.updateTokens();
  }

  buildPathString() {
    return SPACES.map((s, i) => `${i === 0 ? 'M' : 'L'} ${s.pos.x} ${s.pos.y}`).join(' ');
  }

  renderTile(space) {
    const isStart = space.type === "start";
    const isFinish = space.type === "finish";

    let fillGrad = "url(#tile-grad-white)";
    let strokeCol = "#ffffff";
    let textCol = "#0b0c26";

    if (space.color === "orange") {
      fillGrad = "url(#tile-grad-orange)";
      strokeCol = "#ffaa00";
      textCol = "#ffffff";
    } else if (space.color === "cyan") {
      fillGrad = "url(#tile-grad-cyan)";
      strokeCol = "#00ffff";
      textCol = "#ffffff";
    }

    if (isStart) {
      fillGrad = "#33ff77";
      strokeCol = "#ffffff";
      textCol = "#003311";
    } else if (isFinish) {
      fillGrad = "#ffd700";
      strokeCol = "#ffffff";
      textCol = "#000000";
    }

    let iconStr = "";
    if (space.type === "question") iconStr = "❓";
    else if (space.type === "boost") iconStr = "⚡";
    else if (space.type === "hazard") iconStr = "⚠️";
    else if (space.type === "teleport") iconStr = "🌀";

    return `
      <g class="space-tile-group" data-id="${space.id}" transform="translate(${space.pos.x}, ${space.pos.y}) rotate(${space.angle})">
        <!-- Casilla Rectangular Vistosa tipo Escalera -->
        <rect x="-16" y="-11" width="32" height="22" rx="4" ry="4" 
              fill="${fillGrad}" 
              stroke="${strokeCol}" 
              stroke-width="2" 
              class="space-rect-tile" />
        
        <!-- Texto con Número de Casilla o Label -->
        <text x="0" y="${iconStr ? '-1' : '3'}" text-anchor="middle" fill="${textCol}" font-size="${isFinish ? '8' : '9'}" font-weight="900" font-family="sans-serif">
          ${isStart ? 'INICIO' : isFinish ? 'META' : space.id}
        </text>

        ${iconStr ? `<text x="0" y="7" text-anchor="middle" font-size="7">${iconStr}</text>` : ''}
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
        ${isCurrentTurn ? `<circle cx="0" cy="0" r="20" fill="none" stroke="${player.color}" stroke-width="2.5" class="pulse-ring"/>` : ''}

        <!-- Base Ficha Jugador -->
        <circle cx="0" cy="0" r="14" fill="rgba(8, 10, 24, 0.9)" stroke="${player.color}" stroke-width="2.5" />

        <!-- Nave Espacial Miniatura -->
        <g transform="translate(-15, -15)">
          ${player.ship.path}
        </g>

        <!-- Etiqueta P1, P2, P3, P4 -->
        <g transform="translate(10, -10)">
          <circle cx="0" cy="0" r="7.5" fill="${player.color}" stroke="#ffffff" stroke-width="1.2"/>
          <text x="0" y="3" text-anchor="middle" fill="#ffffff" font-size="8" font-weight="900" font-family="sans-serif">P${player.id}</text>
        </g>
      `;

      layer.appendChild(tokenG);
    });
  }
}
