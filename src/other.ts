/*---------------------------------------------------------------------------|
 * Contains the rest of the types which doesn't belong to the other files.
 *--------------------------------------------------------------------------*/

import { Id, Result } from './unions';

/**
 * The possible status for a match.
 */
export enum Status {
    /** The two matches leading to this one are not completed yet. */
    Locked = 0,

    /** One participant is ready and waiting for the other one. */
    Waiting = 1,

    /** Both participants are ready to start. */
    Ready = 2,

    /** The match is running. */
    Running = 3,

    /** The match is completed. */
    Completed = 4,

    /** At least one participant completed his following match. */
    Archived = 5,
}

/**
 * The results of a participant in a match.
 */
export interface ParticipantResult {
    /** If `null`, the participant is to be determined. */
    id: Id | null,

    /** Indicates where the participant comes from. */
    position?: number,

    /** If this participant forfeits, the other automatically wins. */
    forfeit?: boolean,

    /** The current score of the participant. */
    score?: number,

    /** Tells what is the result of a duel for this participant. */
    result?: Result,
}

/**
 * Only contains information about match status and results.
 */
export interface MatchResults {
    /** Status of the match. */
    status: Status,

    /** First opponent of the match. */
    opponent1: ParticipantResult | null,

    /** Second opponent of the match. */
    opponent2: ParticipantResult | null,
}

/**
 * An item of the ranking.
 */
export interface RankingItem {
    /** ID of the participant. */
    id: Id,
    /** Number of matches played by the participant. */
    played: number,
    /** Number of matches won by the participant. */
    wins: number,
    /** Number of matches that ended in a draw. */
    draws: number,
    /** Number of matches lost by the participant. */
    losses: number,
    /** Number of matches forfeited by the participant. */
    forfeits: number,
    /** Total score in favor of the participant. */
    scoreFor: number,
    /** Total score in favor of the opponents. */
    scoreAgainst: number,
    /** Difference between {@link scoreFor} and {@link scoreAgainst}. */
    scoreDifference: number,
    /** Total points of the participant. */
    points: number,
    /** Resulting rank of the participant. */
    rank: number,
}

/**
 * A formula to compute the points in a ranking.
 */
export type RankingFormula = (ranking: RankingItem) => number;
