import { gameState } from './game/GameState.js';
import { renderHomeScreen } from './components/HomeScreen.js';
import { renderSetupScreen } from './components/SetupScreen.js';
import { BoardView } from './components/BoardView.js';
import { ControlPanel } from './components/ControlPanel.js';
import { renderQuestionModal, renderVictoryModal } from './components/VictoryModal.js';

class App {
  constructor() {
    this.appEl = document.getElementById("app");
    this.boardRenderer = null;
    this.controlPanel = null;
    this.init();
  }

  init() {
    gameState.subscribe((state) => {
      this.renderCurrentScreen(state);
    });
    this.renderCurrentScreen(gameState);
  }

  renderCurrentScreen(state) {
    if (state.screen === "HOME") {
      this.appEl.className = "screen-home-active";
      renderHomeScreen(this.appEl);
    } else if (state.screen === "SETUP") {
      this.appEl.className = "screen-setup-active";
      renderSetupScreen(this.appEl);
    } else if (state.screen === "BOARD") {
      this.appEl.className = "screen-board-active";
      this.renderBoardLayout(state);
    } else if (state.screen === "VICTORY") {
      renderVictoryModal(this.appEl);
    }

    // Modal de preguntas si está activo
    if (state.activeQuestion && state.screen === "BOARD") {
      renderQuestionModal(this.appEl);
    }
  }

  renderBoardLayout(state) {
    // Si ya estamos en la pantalla del tablero, actualizar vista en lugar de re-crear todo el DOM
    let boardContainer = document.getElementById("board-viewport-container");
    let sidebarContainer = document.getElementById("sidebar-control-container");

    if (!boardContainer || !sidebarContainer) {
      this.appEl.innerHTML = `
        <div class="board-screen-layout">
          <div id="board-viewport-container" class="board-container-viewport"></div>
          <div id="sidebar-control-container" class="sidebar-panel-container"></div>
        </div>
      `;
      boardContainer = document.getElementById("board-viewport-container");
      sidebarContainer = document.getElementById("sidebar-control-container");

      this.boardRenderer = new BoardView(boardContainer);
      this.boardRenderer.render();

      this.controlPanel = new ControlPanel(sidebarContainer, this.boardRenderer);
      this.controlPanel.render();
    } else {
      if (this.boardRenderer) {
        this.boardRenderer.updateTokens();
      }
      if (this.controlPanel) {
        this.controlPanel.render();
      }
    }
  }
}

// Iniciar aplicación
new App();
