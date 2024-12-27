import {useLiveQuery} from "dexie-react-hooks";
import {db, GameEntity, RoundScoreEntity} from "./db";
import type {Game} from "../types";

export function useGameHistory(): Game[] {
    return useLiveQuery(async () => {
        const games = await db.games.orderBy('updatedAt').toArray();

        return await Promise.all(games.map(enhanceGameWithPlayers));
    }) as Game[];
}

export function useGameDashboard(gameId: number): Game {
    return useLiveQuery(async () => {
        const game = await db.games.get({id: gameId});
        if (!game) {
            throw new Error(`Game with id ${gameId} not found`);
        }

        return await enhanceGameWithPlayers(game);
    }, [gameId]) as Game;
}

export function usePlayerHistory(gameId: number, playerId: number): RoundScoreEntity[] {
    return useLiveQuery(async () => {
        return db.roundScores.where({gameId, playerId}).sortBy('createdAt');
    }, [gameId, playerId]) as RoundScoreEntity[];
}

async function enhanceGameWithPlayers(game: GameEntity): Promise<Game> {
    const gameScores = await db.gameScores.where({gameId: game.id}).sortBy('order');
    const players = await Promise.all(gameScores.map(async gameScore => {
        const player = await db.players.get({id: gameScore.playerId});
        return {
            id: player?.id,
            name: player?.name,
            score: gameScore.value
        };
    }));

    return {...game, players} as Game;
}