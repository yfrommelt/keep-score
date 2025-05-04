import { db } from "../db";
import { updateGameScore } from "./updateGameScore";

export async function deletePlayerLastScore(gameId: number, playerId: number) {
  await db.transaction(
    "rw",
    db.roundScores,
    db.gameScores,
    db.games,
    async () => {
      const lastRoundScore = await db.roundScores
        .where({ gameId, playerId })
        .last();
      if (!lastRoundScore) {
        return;
      }

      await db.roundScores.delete(lastRoundScore.id);
      await updateGameScore(gameId, playerId);
    },
  );
}
