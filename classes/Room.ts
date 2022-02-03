import Participant from "../interfaces/Participant";
import { generateID } from "../utils/global";
export default class Room {
  id: string = "";
  timestamp:string="";
  participants: {
    [key: string]: Participant;
  } = {};
  host = "";
  totalRounds: number = 0;
  currentRound: number = 0;
  currentQuestion: string = "";
  state:
    | "PRE_GAME"
    | "QUESTION"
    | "SELECTING_ANSWER"
    | "RESULTS"
    | "POST_GAME" = "PRE_GAME";
  roundAnswers: {
    [key: string]: string;
  } = {};
  roundScore: {
    [key: string]: number;
  } = {};
  roundSelectedAnswers: {
    [key: string]: string;
  } = {};

  constructor(totalRounds: number, host: string) {
    this.id = generateID();
    this.totalRounds = totalRounds;
    this.host = host;
    this.timestamp=new Date().toISOString()
  }
  addParticipant(name: string, id: string) {
    const participant: Participant = {
      name,
      id,
      score: 0,
    };
    this.participants[participant.id] = participant;
  }
  addAnswer(id: string, answer: string) {
    this.roundAnswers[id] = answer;
    if (
      Object.keys(this.roundAnswers).length ===
      Object.keys(this.participants).length
    ) {
      this.selectAnswers();
    }
  }
  addPickedAnswer(id: string, answerOwnerID: string) {
    this.roundSelectedAnswers[id] = answerOwnerID;
    if (
      Object.keys(this.roundSelectedAnswers).length ===
      Object.keys(this.participants).length
    ) {
      this.roundResults();
    }
  }
  roundResults() {
    this.state = "RESULTS";
  }
  selectAnswers() {
    this.state = "SELECTING_ANSWER";
  }
  removeParticipant(id: string) {
    delete this.participants[id];
  }
  startGame() {
    this.currentRound = 1;
  }

  newRound() {
    if (this.currentRound == this.totalRounds) {
      this.endGame();
      return;
    }
    this.currentRound += 1;
  }
  endGame() {
    this.currentRound = -1;
  }
}
