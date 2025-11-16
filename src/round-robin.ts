import type { Id } from './unions';

/**
 * An item of the ranking.
 */
export interface RankingItem {
    rank: number,
    id: Id,
    played: number,
    wins: number,
    draws: number,
    losses: number,
    forfeits: number,
    scoreFor: number,
    scoreAgainst: number,
    scoreDifference: number,
    points: number,
}

/**
 * A formula to compute the points of a ranking item in a round-robin stage.
 */
export type RankingFormula = (ranking: RankingItem) => number;
