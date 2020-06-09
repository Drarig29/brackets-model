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
}

/**
 * Used to created a stage.
 */
export declare interface InputStage {
    name: string,
    type: StageType,
    participants: InputParticipants,
    settings?: StageSettings,
}

/**
 * The possible result of a duel for a participant.
 */
export type Result = 'win' | 'draw' | 'loss';

/**
 * The status for a duel.
 */
export type Status = 'pending' | 'running' | 'completed';

/**
 * The side of an opponent.
 */
export type Side = 'opponent1' | 'opponent2';

export interface ParticipantResult {
    id: number | null,
    forfeit?: boolean,
    score?: number,
    result?: Result,
}

export interface Participant {
    id: number,
    name: string,
}

export interface Stage {
    id: number,
    name: string,
    type: string,
}

export interface Group {
    id: number,
    stage_id: number,
    name: string,
}

export interface Round {
    id: number,
    stage_id: number,
    group_id: number,
    number: number,
}

export interface Match {
    id: number,
    status: Status,
    stage_id: number,
    group_id: number,
    round_id: number,
    number: number,
    scheduled_datetime: string,
    start_datetime: string,
    end_datetime: string,
    opponent1: ParticipantResult | null,
    opponent2: ParticipantResult | null,
}

export interface MatchGame {
    id: number,
    parent_id: number,
    status: number,
    number: number,
    start_datetime: string,
    end_datetime: string,
    opponent1: ParticipantResult | null,
    opponent2: ParticipantResult | null,
}