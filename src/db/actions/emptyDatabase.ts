import { db } from "../db";

export async function emptyDatabase() {
  await db.transaction(
    "rw",
    db.players,
    db.games,
    db.gameScores,
    db.roundScores,
    async () => {
      await db.roundScores.clear();
      await db.gameScores.clear();
      await db.games.clear();
      await db.players.clear();
    }
  );
}