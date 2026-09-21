import { gameState } from '../game/GameState.js';
import { sounds } from '../utils/audio.js';

export function renderQuestionModal(container) {
  const activeQ = gameState.activeQuestion;
  if (!activeQ) return;

  const { question, player, onComplete } = activeQ;

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay active";
  modalOverlay.innerHTML = `
    <div class="modal-card question-card">
      <div class="modal-header">
        <span class="modal-badge">⭐ TRIVIA ASTRONÓMICA</span>
        <h3 class="modal-player-name" style="color: ${player.color}">Turno de ${player.name}</h3>
      </div>

      <div class="question-text">${question.question}</div>

      <div class="options-grid">
        ${question.options.map((opt, idx) => `
          <button class="btn-option" data-index="${idx}">
            <span class="opt-letter">${['A', 'B', 'C', 'D'][idx]}</span>
            <span class="opt-text">${opt}</span>
          </button>
        `).join('')}
      </div>

      <div id="question-feedback" class="question-feedback hidden"></div>
    </div>
  `;

  container.appendChild(modalOverlay);

  modalOverlay.querySelectorAll(".btn-option").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const selectedIdx = parseInt(e.currentTarget.getAttribute("data-index"));
      const isCorrect = selectedIdx === question.correctIndex;

      // Deshabilitar botones
      modalOverlay.querySelectorAll(".btn-option").forEach(b => b.disabled = true);

      const feedbackEl = modalOverlay.querySelector("#question-feedback");
      feedbackEl.classList.remove("hidden");
      
      if (isCorrect) {
        e.currentTarget.classList.add("correct");
        feedbackEl.className = "question-feedback correct-bg";
        feedbackEl.innerHTML = `
          <div class="feedback-title">✅ ¡RESPUESTA CORRECTA!</div>
          <div class="feedback-desc">${question.explanation}</div>
        `;
      } else {
        e.currentTarget.classList.add("wrong");
        feedbackEl.className = "question-feedback wrong-bg";
        feedbackEl.innerHTML = `
          <div class="feedback-title">❌ RESPUESTA INCORRECTA</div>
          <div class="feedback-desc">La respuesta correcta era: <strong>${question.options[question.correctIndex]}</strong>. ${question.explanation}</div>
        `;
      }

      setTimeout(() => {
        container.removeChild(modalOverlay);
        onComplete(isCorrect);
      }, 2500);
    });
  });
}

export function renderVictoryModal(container) {
  const winner = gameState.winner;
  if (!winner) return;

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay victory-overlay active";
  modalOverlay.innerHTML = `
    <div class="modal-card victory-card">
      <div class="victory-header">
        <div class="confetti-stars">✨ 🚀 ✨</div>
        <h2 class="victory-title">¡CARRERA COMPLETADA!</h2>
        <div class="winner-avatar" style="background-color: ${winner.color}">
          ${winner.ship.svg}
        </div>
        <h3 class="winner-name" style="color: ${winner.color}">🏆 ¡${winner.name} HA GANADO!</h3>
        <p class="winner-subtitle">Primer astronauta en alcanzar la Estación Tierra en La Gran Carrera Intergaláctica</p>
      </div>

      <div class="mission-stats-box">
        <h4>📊 ESTADÍSTICAS DE MISIÓN DE JUEGO</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-num">${winner.stats.rollsCount}</span>
            <span class="stat-label">Tiradas de Dado</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">${winner.stats.questionsAnswered}</span>
            <span class="stat-label">Trivias Respondidas</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">${winner.stats.boostsHit}</span>
            <span class="stat-label">Impulsos Solares</span>
          </div>
        </div>
      </div>

      <div class="victory-actions">
        <button id="btn-play-again" class="btn-retro btn-primary-retro">🔄 JUGAR NUEVA PARTIDA</button>
      </div>
    </div>
  `;

  container.appendChild(modalOverlay);

  modalOverlay.querySelector("#btn-play-again").addEventListener("click", () => {
    sounds.playBoost();
    gameState.resetGame();
  });
}
