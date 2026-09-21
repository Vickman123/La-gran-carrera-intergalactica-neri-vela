import { SPACES } from '../data/spacesData.js';
import { gameState } from './GameState.js';
import { diceEngine } from './Dice.js';
import { eventManager } from './EventManager.js';
import { sounds } from '../utils/audio.js';

class TurnManager {
  rollDiceAndMove(boardRenderer) {
    if (gameState.phase !== "WAIT_ROLL") return;

    diceEngine.roll((diceValue) => {
      const player = gameState.getCurrentPlayer();
      const startPos = player.position;
      const targetPos = Math.min(startPos + diceValue, SPACES.length - 1);

      gameState.setPhase("MOVING");

      this.animateStepByStep(player, startPos, targetPos, boardRenderer, () => {
        const finalSpace = SPACES[player.position];
        eventManager.handleSpaceLanding(player, finalSpace, (p, pos, cb) => {
          this.animateStepByStep(p, p.position, pos, boardRenderer, cb);
        }, () => {
          gameState.nextTurn();
        });
      });
    });
  }

  animateStepByStep(player, fromPos, toPos, boardRenderer, onComplete) {
    if (fromPos === toPos) {
      if (onComplete) onComplete();
      return;
    }

    const step = toPos > fromPos ? 1 : -1;
    let current = fromPos;

    const moveInterval = setInterval(() => {
      current += step;
      gameState.updatePlayerPosition(player.id, current);
      sounds.playMoveStep();

      if (boardRenderer) {
        boardRenderer.updateTokens();
      }

      if (current === toPos) {
        clearInterval(moveInterval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 200);
      }
    }, 280); // 280ms por casilla para una animación clara y vistosa
  }
}

export const turnManager = new TurnManager();
