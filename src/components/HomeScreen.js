import { gameState } from '../game/GameState.js';
import { sounds } from '../utils/audio.js';

export function renderHomeScreen(container) {
  container.innerHTML = `
    <div class="screen-container home-intro-pro-screen">
      <!-- PANEL IZQUIERDO CON PATRÓN DE AJEDREZ RETRO Y BOTONES -->
      <aside class="intro-left-sidebar">
        <!-- Listón Divertitendo en la esquina superior -->
        <div class="divertitendo-ribbon">
          <div class="ribbon-top-diamonds">◆ LÍNEA ◆</div>
          <div class="ribbon-main-title">DIVERTITENDO</div>
          <div class="ribbon-hourglass">⏳</div>
          <div class="ribbon-sub-title">EL ENCUENTRO GENIAL</div>
        </div>

        <!-- Botones de Acción del Menú Principal -->
        <nav class="intro-menu-nav">
          <button id="btn-intro-start" class="btn-menu-action btn-gold-neon">
            <span class="btn-action-icon">🚀</span>
            <span class="btn-action-label">INICIAR CARRERA</span>
          </button>

          <button id="btn-intro-config" class="btn-menu-action btn-glass-dark">
            <span class="btn-action-icon">⚙️</span>
            <span class="btn-action-label">CONFIGURACIÓN</span>
          </button>

          <button id="btn-intro-credits" class="btn-menu-action btn-glass-dark">
            <span class="btn-action-icon">ℹ️</span>
            <span class="btn-action-label">CRÉDITOS</span>
          </button>
        </nav>

        <!-- Texto Cursiva Tradicional -->
        <div class="sidebar-footer-quote">
          <span>México también<br>llega lejos</span>
        </div>
      </aside>

      <!-- ÁREA PRINCIPAL DERECHA CON ARTE ESPACIAL Y LOGOTIPOS -->
      <main class="intro-main-stage">
        <!-- Imagen de Fondo Espacial en Alta Definición (Astronauta con bandera de México) -->
        <img src="/intro_art.png" class="stage-bg-image" alt="Arte Espacial Rodolfo Neri Vela" />
        <div class="stage-vignette-overlay"></div>

        <!-- Encabezado de Título Principal Nivel Profesional -->
        <header class="stage-hero-header">
          <div class="retro-title-wrapper">
            <h1 class="logo-title-top">
              LA GRAN <span class="blue-orb-g">O</span> CARRERA
            </h1>
            <h1 class="logo-title-bottom">
              INTER<span class="orbit-ring-g">G</span>ALÁCTICA
              <span class="shuttle-fly-icon">🚀</span>
            </h1>
            <div class="logo-subtitle-tag">EL VIDEOJUEGO</div>
          </div>

          <p class="hero-tagline">
            "Una aventura por el Sistema Solar inspirada en la misión espacial mexicana"
          </p>
        </header>

        <!-- Insignias de Reconocimiento y Autores (Esquina Inferior Derecha) -->
        <footer class="stage-authors-badges">
          <div class="badge-author-circle">
            <div class="circle-top-text">DISEÑADO POR</div>
            <div class="circle-silhouette">👤</div>
            <div class="circle-names">
              <strong>RODOLFO NERI VELA</strong>
              <span class="amp">&</span>
              <small>BERNARDO MARTÍNEZ AVALOS</small>
            </div>
          </div>

          <div class="badge-programmer">
            <span class="code-bracket">&lt;/&gt;</span>
            <div class="prog-info">
              <span class="prog-label">PROGRAMADO POR</span>
              <strong class="prog-name">VÍCTOR CARREÑO</strong>
            </div>
          </div>
        </footer>
      </main>

      <!-- Modal de Créditos -->
      <div id="credits-modal" class="modal-overlay hidden">
        <div class="modal-card credits-card">
          <div class="credits-header">
            <span class="modal-badge">🇲🇽 HOMENAJE A LA MISION ESPACIAL MEXICANA</span>
            <h2>LA GRAN CARRERA INTERGALÁCTICA</h2>
            <h3>EL VIDEOJUEGO</h3>
          </div>

          <div class="credits-body">
            <p class="credits-quote">"Primera misión espacial mexicana a bordo del Transbordador Atlantis (1985)"</p>

            <div class="authors-grid">
              <div class="author-box">
                <span class="author-role">DISEÑADO POR:</span>
                <span class="author-name">Dr. Rodolfo Neri Vela</span>
                <span class="author-sub">& Bernardo Martínez Avalos</span>
                <p class="author-desc">Creadores del juego de mesa educativo original publicado en México en los años 90s.</p>
              </div>

              <div class="author-box highlight-box">
                <span class="author-role">PROGRAMADO POR:</span>
                <span class="author-name">Víctor Carreño</span>
                <span class="author-sub">Recreación Digital & Web App</span>
                <p class="author-desc">Desarrollo interactivo moderno con HTML5, CSS3 y JavaScript ES6.</p>
              </div>
            </div>
          </div>

          <div class="credits-actions">
            <button id="btn-close-credits" class="btn-retro btn-primary-retro">CERRAR</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Listener para inicio de carrera
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
