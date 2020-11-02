/**
 * Used to order seeds.
 */
export type SeedOrdering = 'natural' | 'reverse' | 'half_shift' | 'reverse_half_shift' | 'pair_flip' | 'inner_outer' |
    'groups.effort_balanced' | 'groups.seed_optimized' | 'groups.bracket_optimized';

/**
 * An array of participants (name or `null` to introduce a BYE), given to the library to create a stage.
 */
export type Seeding = (string | null)[];

/**
 * An array of participants (id or `null` to introduce a BYE), given to the library to edit a stage.
 */
export type SeedingIds = (number | null)[];

/**
 * Used to created a stage.
 */
export declare interface InputStage {
    tournamentId: number,
    name: string,
    type: StageType,

    /** Contains participants (name or id) or `null` for BYEs. */
    seeding?: Seeding | SeedingIds,

    /** Contains optional settings special to each stage type. */
    settings?: StageSettings,
}

/**
 * The possible types for a double elimination stage's grand final.
 */
export type GrandFinalType = 'none' | 'simple' | 'double';

/**
 * The possible modes for a round-robin stage.
 */
export type RoundRobinMode = 'simple' | 'double';

/**
 * The possible settings for a stage.
 */
export interface StageSettings {
    /** 
     * Number of groups in a round-robin stage.
     */
    groupCount?: number,

    /**
     * The mode for the round-robin stage.
     * 
     * - If `simple`, each participant plays each opponent once.
     * - If `double`, each participant plays each opponent twice, once at home and once away.
     */
    roundRobinMode?: RoundRobinMode,

    /** 
     * The number of participants.
     */
    size?: number,

    /**
     * Whether to skip the first round of the WB of a double elimination stage.
     */
    skipFirstRound?: boolean,

    /** 
     * Optional final between semi-final losers.
     */
    consolationFinal?: boolean,

    /**
     * Optional grand final between WB and LB winners.
     * 
     * - If `none`, there is no grand final.
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
     * Whether to balance BYEs in the seeding of a stage.
     * 
     * This prevents having BYE against BYE in matches.
     */
    balanceByes?: boolean,

    /**
     * All matches of the stage will have this child count. This can later be overridden for certain groups, rounds or matches.
     */
    matchesChildCount?: number,
}

/**
 * The only supported type of stage.
 */
export type StageType = 'round_robin' | 'single_elimination' | 'double_elimination';

/**
 * The possible results of a duel for a participant.
 */
export type Result = 'win' | 'draw' | 'loss';

/**
 * The possible status for a match.
 */
export enum Status {
    /** The two matches leading to this one are not completed yet. */
    Locked,

    /** One participant is ready and waiting for the other one. */
    Waiting,

    /** Both participants are ready to start. */
    Ready,

    /** The match is running. */
    Running,

    /** The match is completed. */
    Completed,

    /** At least one participant completed his following match. */
    Archived,
}

/**
 * The results of a participant in a match.
 */
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

/**
 * A participant of a stage.
 */
export interface Participant {
    id: number,
    tournament_id: number
    name: string,
}

/**
 * A stage, which can be a round-robin stage or a single/double elimination stage.
 */
export interface Stage {
    id: number,
    tournament_id: number,
    name: string,
    type: StageType,
    settings: StageSettings,

    /** The number of the stage in its tournament. */
    number: number,
}

/**
 * A group of a stage.
 */
export interface Group {
    id: number,
    stage_id: number,

    /** The number of the group in its stage. */
    number: number,
}

// The next levels don't have a `name` property. They can be named with their `number` and their context (parent levels).

/**
 * A round of a group.
 */
export interface Round {
    id: number,
    stage_id: number,
    group_id: number,

    /** The number of the round in its group. */
    number: number,
}

/**
 * Only contains information about match status and results.
 */
export interface MatchResults {
    status: Status,
    opponent1: ParticipantResult | null,
    opponent2: ParticipantResult | null,
}

/**
 * A match of a round.
 */
export interface Match extends MatchResults {
    id: number,
    stage_id: number,
    group_id: number,
    round_id: number,

    /** The number of the match in its round. */
    number: number,

    /** The count of match games this match has. Can be `0` if it's a simple match, or a positive number for "Best Of" matches. */
    child_count: number,
}

/**
 * A game of a match.
 */
export interface MatchGame extends MatchResults {
    id: number,
    parent_id: number,

    /** The number of the match game in its parent match. */
    number: number,
}