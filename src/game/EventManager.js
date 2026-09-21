import { SPACES } from '../data/spacesData.js';
import { gameState } from './GameState.js';
import { questionSystem } from './QuestionSystem.js';
import { sounds } from '../utils/audio.js';

class EventManager {
  handleSpaceLanding(player, currentSpace, animateMoveTo, onFinished) {
    switch (currentSpace.type) {
      case "boost":
        player.stats.boostsHit++;
        sounds.playBoost();
        gameState.addLog(`⚡ ¡ESPACIO ESPECIAL! ${player.name} cayó en '${currentSpace.name}'. ¡Impulso hiperespacial!`);
        setTimeout(() => {
          const targetPos = Math.min(player.position + 2, SPACES.length - 1);
          animateMoveTo(player, targetPos, () => {
            this.checkFinishOrNext(player, onFinished);
          });
        }, 800);
        break;

      case "hazard":
        player.stats.hazardsHit++;
        sounds.playHazard();
        gameState.addLog(`⚠️ ¡PELIGRO ESPACIAL! ${player.name} cayó en '${currentSpace.name}'.`);
        setTimeout(() => {
          if (currentSpace.desc.includes("turno")) {
            player.skipsTurn = true;
            gameState.addLog(`🛑 ¡${player.name} pierde su siguiente turno!`);
            onFinished();
          } else {
            const targetPos = Math.max(player.position - 2, 0);
            animateMoveTo(player, targetPos, () => {
              onFinished();
            });
          }
        }, 800);
        break;

      case "teleport":
        sounds.playBoost();
        gameState.addLog(`🌀 ¡AGUJERO DE GUSANO! ${player.name} atravesó una distorsión cuántica.`);
        setTimeout(() => {
          const targetPos = 22; // Teletransporte a casilla 22
          animateMoveTo(player, targetPos, () => {
            onFinished();
          });
        }, 800);
        break;

      case "question":
        questionSystem.triggerQuestion(player, (success, question) => {
          const delta = success ? question.reward : -question.penalty;
          const targetPos = Math.min(Math.max(player.position + delta, 0), SPACES.length - 1);
          animateMoveTo(player, targetPos, () => {
            this.checkFinishOrNext(player, onFinished);
          });
        });
        break;

      case "finish":
        gameState.setWinner(player);
        sounds.playVictory();
        break;

      default:
        // Casilla normal
        this.checkFinishOrNext(player, onFinished);
        break;
    }
  }

  checkFinishOrNext(player, onFinished) {
    if (player.position >= SPACES.length - 1) {
      gameState.setWinner(player);
      sounds.playVictory();
    } else {
      onFinished();
    }
  }
}

export const eventManager = new EventManager();
