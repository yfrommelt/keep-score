import { db, PlayerEntity } from "../db";

export async function getOrCreatePlayer(name: string): Promise<PlayerEntity> {
  const firstPlayer = await db.players.filter((p) => p.name === name).first();

  if (firstPlayer) {
    return firstPlayer;
  }

  const playerId = await db.players.add({ name, updatedAt: new Date() });
  const addedPlayer = await db.players.get({ id: playerId });

  return addedPlayer as PlayerEntity;
}
