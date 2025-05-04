import { db } from "../db";
import { getOrCreatePlayer } from "./getOrCreatePlayer";

export async function createGame(playerNames: string[], name?: string) {
  const gameId = await db.games.add({
    name,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const players = await Promise.all(
    playerNames.map(async (playerName) => await getOrCreatePlayer(playerName)),
  );

  db.gameScores.bulkAdd(
    players.map((player, index) => ({
      playerId: player.id,
      gameId,
      value: 0,
      order: index,
    })),
  );

  return gameId;
}
