/**
 * Used to reorder seeds.
 */
export type SeedOrdering =
    'natural' | 'reverse' | 'half_shift' | 'reverse_half_shift' | 'pair_flip' | 'inner_outer' |
    'groups.effort_balanced' | 'groups.snake' | 'groups.bracket_optimized';

/**
 * Type of an object implementing every ordering method.
 */
export type OrderingMap = { [key in SeedOrdering]: Function };

/**
 * An array of participants (name or `null` to introduce a BYE), given to the library to create a stage.
 */
export type InputParticipants = (string | null)[];

/**
 * Used by the library to handle placements. Is `null` if is a BYE. Has a `null` name if it's yet to be determined.
 */
export type ParticipantSlot = { id: number | null } | null;

/**
 * The library only handles duels. It's one participant versus another participant.
 */
export type Duel = ParticipantSlot[];

/**
 * A list of duels.
 */
export type Duels = Duel[];

/**
 * The only possible stage type for the library.
 */
export type StageType = 'round_robin' | 'single_elimination' | 'double_elimination';

/**
 * The possible types for a double elimination stage's grand final.
 */
export type GrandFinalType = 'simple' | 'double';

/**
 * The possible settings for a stage.
 */
export interface StageSettings {
    /** 
     * Number of groups in a round-robin stage.
     */
    groupCount?: number,

    /** 
     * Optional final between semi-final losers.
     */
    consolationFinal?: boolean,

    /**
     * Optional grand final between WB and LB winners.
     * 
     * - If `simple`, the final is a single match. The winner is the winner of the stage.
     * - If `double`, if the WB winner wins, he's the winner of the stage. But if he loses, the final is reset and there is a very last match.
     * It might be fairer since it gives the WB winner the right to lose once during the stage...
     */
    grandFinal?: GrandFinalType,

    /**
     * A list of ordering methods to apply to the seeding.
     * 
     * - For a round-robin stage: 1 item required (**with** `"groups."` prefix).
     *   - Used to distribute in groups.
     * - For a simple elimination stage, 1 item required (**without** `"groups."` prefix).
     *   - Used to distribute in round 1.
     * - For a double elimination stage, 1 item required, 3+ items supported (**without** `"groups."` prefix).
     *   - Item 1 (required) - Used to distribute in WB round 1.
     *   - Item 2 - Used to distribute WB losers in LB round 1.
     *   - Items 3+ - Used to distribute WB losers in LB minor rounds (1 per round).
     */
    seedOrdering?: SeedOrdering[],

    /**
     * All matches of the stage will have this child count. This can later be overridden for certain groups, rounds or matches.
     */
    matchesChildCount?: number,
}

/**
 * Used to created a stage.
 */
export declare interface InputStage {
    name: string,
    type: StageType,

    /** Contains names or `null` for BYEs. */
    participants?: InputParticipants,

    /** The number of participants if no participant given. All matches will then be "To be determined". */
    size?: number,

    /** Contains optional settings special to each stage type. */
    settings?: StageSettings,
}

/**
 * The possible results of a duel for a participant.
 */
export type Result = 'win' | 'draw' | 'loss';

/**
 * The possible status for whatever that starts and ends in time.
 */
export type Status = 'locked' | 'pending' | 'running' | 'completed';

/**
 * The side of an opponent.
 */
export type Side = 'opponent1' | 'opponent2';

export interface ParticipantResult {
    /** If `null`, the participant is to be determined. */
    id: number | null,

    /** Indicates where the participant comes from. */
    position?: number,

    /** If this participant is forfeit, the other automatically wins. */
    forfeit?: boolean,

    /** The current score of the participant. */
    score?: number,

    /** Tells what is the result of a duel for this participant. */
    result?: Result,
}

export interface Tournament {
    id: number,
    name: string,
    status: Status,
    scheduled_start_date: string,
    scheduled_end_date: string,

    /**
     * Number of participants in the tournament.
     */
    size: number,
}

export interface Participant {
    id: number,
    tournament_id: number
    name: string,
}

export interface Stage {
    id: number,
    tournament_id: number,
    name: string,
    type: StageType,

    /** The number of the stage in its tournament. */
    number: number,
}

export interface Group {
    id: number,
    stage_id: number,
    name: string,

    /** The number of the group in its stage. */
    number: number,
}

// The next levels don't have a `name` property. They can be named with their `number` and their context (parent levels).

export interface Round {
    id: number,
    stage_id: number,
    group_id: number,

    /** The number of the round in its group. */
    number: number,
}

export interface Match {
    id: number,
    stage_id: number,
    group_id: number,
    round_id: number,
    status: Status,

    /** The number of the match in its round. */
    number: number,

    /** The count of match games this match has. Can be `0` if it's a simple match, or a positive number for "Best Of" matches. */
    childCount: number,

    scheduled_datetime: string | null,
    start_datetime: string | null,
    end_datetime: string | null,

    opponent1: ParticipantResult | null,
    opponent2: ParticipantResult | null,
}

export interface MatchGame {
    id: number,
    parent_id: number,
    status: Status,

    /** The number of the match game in its parent match. */
    number: number,

    scheduled_datetime: string | null,
    start_datetime: string | null,
    end_datetime: string | null,

    opponent1: ParticipantResult | null,
    opponent2: ParticipantResult | null,
}