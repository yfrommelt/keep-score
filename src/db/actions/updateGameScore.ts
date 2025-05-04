import { db } from "../db";

// Internal function used by addPlayerScore and deletePlayerLastScore
export async function updateGameScore(gameId: number, playerId: number) {
  const roundScores = await db.roundScores
    .where({ gameId, playerId })
    .toArray();
  const gameScore = roundScores.reduce(
    (acc, roundScore) => acc + roundScore.value,
    0,
  );
  await db.gameScores.where({ gameId, playerId }).modify((_, ref) => {
    ref.value.value = gameScore;
  });

  await db.games.update(gameId, { updatedAt: new Date() });
}