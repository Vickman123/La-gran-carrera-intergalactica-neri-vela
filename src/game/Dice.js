import { gameState } from './GameState.js';
import { sounds } from '../utils/audio.js';

class DiceEngine {
  constructor() {
    this.isRolling = false;
  }

  roll(onRollComplete) {
    if (this.isRolling || gameState.phase !== "WAIT_ROLL") return;

    this.isRolling = true;
    gameState.setPhase("ROLLING");
    sounds.playDiceRoll();

    let count = 0;
    const maxTicks = 14;
    const interval = setInterval(() => {
      const tempVal = Math.floor(Math.random() * 6) + 1;
      gameState.setDiceValue(tempVal);
      count++;

      if (count >= maxTicks) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 6) + 1;
        gameState.setDiceValue(finalVal);
        this.isRolling = false;

        const player = gameState.getCurrentPlayer();
        player.stats.rollsCount++;
        gameState.addLog(`🎲 ${player.name} tiró el dado y obtuvo un [ ${finalVal} ]`);

        if (onRollComplete) {
          onRollComplete(finalVal);
        }
      }
    }, 65);
  }
}

export const diceEngine = new DiceEngine();
