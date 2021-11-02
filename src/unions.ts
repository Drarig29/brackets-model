/*----------------------------------------|
 * Contains all the string union types.
 *---------------------------------------*/

/**
 * The only supported types of stage.
 */
export type StageType = 'round_robin' | 'single_elimination' | 'double_elimination';

/**
 * The possible types for a double elimination stage's grand final.
 */
export type GrandFinalType = 'none' | 'simple' | 'double';

/**
 * The possible modes for a round-robin stage.
 */
export type RoundRobinMode = 'simple' | 'double';

/**
 * Used to order seeds.
 */
export type SeedOrdering = 'natural' | 'reverse' | 'half_shift' | 'reverse_half_shift' | 'pair_flip' | 'inner_outer' |
    'groups.effort_balanced' | 'groups.seed_optimized' | 'groups.bracket_optimized';

/**
 * The possible results of a duel for a participant.
 */
export type Result = 'win' | 'draw' | 'loss';
