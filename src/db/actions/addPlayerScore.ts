import { db } from "../db";
import { updateGameScore } from "./updateGameScore";

export async function addPlayerScore(
  gameId: number,
  playerId: number,
  value: number,
) {
  await db.transaction(
    "rw",
    db.roundScores,
    db.gameScores,
    db.games,
    async () => {
      await db.roundScores.add({
        gameId,
        playerId,
        value,
        createdAt: new Date(),
      });
      await updateGameScore(gameId, playerId);
    },
  );
}
