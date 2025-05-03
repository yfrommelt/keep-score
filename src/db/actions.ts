import { db, PlayerEntity } from "./db";

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

export async function getOrCreatePlayer(name: string): Promise<PlayerEntity> {
  const firstPlayer = await db.players.filter((p) => p.name === name).first();

  if (firstPlayer) {
    return firstPlayer;
  }

  const playerId = await db.players.add({ name, updatedAt: new Date() });
  const addedPlayer = await db.players.get({ id: playerId });

  return addedPlayer as PlayerEntity;
}

async function updateGameScore(gameId: number, playerId: number) {
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
