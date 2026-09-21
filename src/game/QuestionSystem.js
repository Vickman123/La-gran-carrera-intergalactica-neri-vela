import { QUESTIONS } from '../data/questionsData.js';
import { gameState } from './GameState.js';
import { sounds } from '../utils/audio.js';

class QuestionSystem {
  constructor() {
    this.usedQuestionIds = new Set();
  }

  getRandomQuestion() {
    if (this.usedQuestionIds.size >= QUESTIONS.length) {
      this.usedQuestionIds.clear(); // Reiniciar bolsa de preguntas
    }

    const available = QUESTIONS.filter(q => !this.usedQuestionIds.has(q.id));
    const selected = available[Math.floor(Math.random() * available.length)];
    this.usedQuestionIds.add(selected.id);
    return selected;
  }

  triggerQuestion(player, callback) {
    const question = this.getRandomQuestion();
    gameState.activeQuestion = {
      question,
      player,
      onComplete: (success) => {
        gameState.activeQuestion = null;
        if (success) {
          player.stats.questionsAnswered++;
          sounds.playSuccess();
          gameState.addLog(`¡${player.name} respondió CORRECTAMENTE! Avanza +${question.reward} casillas de bonificación.`);
        } else {
          sounds.playHazard();
          gameState.addLog(`¡${player.name} falló la pregunta astronómica! Retrocede -${question.penalty} casilla.`);
        }
        if (callback) callback(success, question);
      }
    };
    gameState.setPhase("EVENT_TRIGGERED");
  }
}

export const questionSystem = new QuestionSystem();
