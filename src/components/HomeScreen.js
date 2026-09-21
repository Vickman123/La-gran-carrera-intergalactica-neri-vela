import { gameState } from '../game/GameState.js';
import { sounds } from '../utils/audio.js';

export function renderHomeScreen(container) {
  container.innerHTML = `
    <div class="screen-container home-intro-screen">
      <div class="intro-cover-wrapper">
        <!-- Imagen de Portada Intro Original -->
        <img src="/intro_bg.jpg" class="intro-bg-img" alt="La Gran Carrera Intergalactica - El Videojuego" />

        <!-- Overlay Interactivo sobre el panel izquierdo del Menú -->
        <div class="intro-menu-overlay">
          <div class="menu-buttons-column">
            <button id="btn-intro-start" class="btn-intro-item btn-gold-outline">
              <span class="btn-icon">🚀</span>
              <span class="btn-label">INICIAR CARRERA</span>
            </button>

            <button id="btn-intro-config" class="btn-intro-item btn-dark-outline">
              <span class="btn-icon">⚙️</span>
              <span class="btn-label">CONFIGURACIÓN</span>
            </button>

            <button id="btn-intro-credits" class="btn-intro-item btn-dark-outline">
              <span class="btn-icon">ℹ️</span>
              <span class="btn-label">CRÉDITOS</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de Créditos / Homenaje -->
      <div id="credits-modal" class="modal-overlay hidden">
        <div class="modal-card credits-card">
          <div class="credits-header">
            <span class="modal-badge">🇲🇽 HOMENAJE ESPACIAL</span>
            <h2>LA GRAN CARRERA INTERGALÁCTICA</h2>
            <h3>EL VIDEOJUEGO</h3>
          </div>

          <div class="credits-body">
            <p class="credits-quote">"Una aventura por el Sistema Solar inspirada en la misión espacial mexicana"</p>

            <div class="authors-grid">
              <div class="author-box">
                <span class="author-role">DISEÑADO POR:</span>
                <span class="author-name">Rodolfo Neri Vela</span>
                <span class="author-sub">& Bernardo Martínez Avalos</span>
                <p class="author-desc">Creadores del juego de mesa original publicado en los años 90s.</p>
              </div>

              <div class="author-box highlight-box">
                <span class="author-role">PROGRAMADO POR:</span>
                <span class="author-name">Víctor Carreño</span>
                <span class="author-sub">Desarrollo Web & Recreación Digital</span>
                <p class="author-desc">Adaptación interactiva moderna para navegador.</p>
              </div>
            </div>
          </div>

          <div class="credits-actions">
            <button id="btn-close-credits" class="btn-retro btn-primary-retro">ENTENDIDO</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Event Listeners
  document.getElementById("btn-intro-start").addEventListener("click", () => {
    sounds.playBoost();
    gameState.setScreen("SETUP");
  });

  document.getElementById("btn-intro-config").addEventListener("click", () => {
    sounds.playMoveStep();
    gameState.setScreen("SETUP");
  });

  const creditsModal = document.getElementById("credits-modal");
  document.getElementById("btn-intro-credits").addEventListener("click", () => {
    sounds.playMoveStep();
    creditsModal.classList.remove("hidden");
    creditsModal.classList.add("active");
  });

  document.getElementById("btn-close-credits").addEventListener("click", () => {
    sounds.playMoveStep();
    creditsModal.classList.remove("active");
    creditsModal.classList.add("hidden");
  });
}
