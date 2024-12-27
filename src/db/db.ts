import Dexie, {type EntityTable} from 'dexie';

type PlayerEntity = {
    id: number;
    name: string;
    updatedAt: Date;
}

type GameEntity = {
    id: number;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
}

type GameScoreEntity = {
    id: number;
    value: number;
    gameId: number;
    playerId: number;
    order: number;
}

type RoundScoreEntity = {
    id: number;
    value: number;
    gameId: number;
    playerId: number;
    createdAt: Date;
}

const db = new Dexie('KeepScoreDatabase') as Dexie & {
    players: EntityTable<PlayerEntity, 'id'>;
    games: EntityTable<GameEntity, 'id'>;
    gameScores: EntityTable<GameScoreEntity, 'id'>;
    roundScores: EntityTable<RoundScoreEntity, 'id'>;
};

db.version(1).stores({
    players: '++id, &name',
    games: '++id, updatedAt',
    gameScores: '++id, [gameId+playerId], order',
    roundScores: '++id, [gameId+playerId], updatedAt',
});

export type {PlayerEntity, GameEntity, GameScoreEntity, RoundScoreEntity};
export {db};