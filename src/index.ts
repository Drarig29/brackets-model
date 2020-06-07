/**
 * The only possible stage type for the library.
 */
export type StageType = 'round_robin' | 'single_elimination' | 'double_elimination';

/**
 * Used to reorder seeds.
 */
export type SeedOrdering =
    'natural' | 'reverse' | 'half_shift' | 'reverse_half_shift' | 'pair_flip' |
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
export type Participant = { name: string | null } | null;

/**
 * The library only handles duels. It's one participant versus another participant.
 */
export type Duel = Participant[];

/**
 * A list of duels.
 */
export type Duels = Duel[];

/**
 * Used to created a stage.
 */
export declare interface Stage {
    name: string,
    type: StageType,
    participants: InputParticipants,
    settings: any,
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

/**
 * The data format of the interface for the storage.
 */
export declare namespace Storage {

    interface ParticipantResult {
        id: number,
        forfeit: boolean,
        score: number,
        result?: Result,
    }

    interface Stage {
        id: number,
        name: string,
        type: string,
    }

    interface Group {
        id: number,
        stage_id: number,
        name: string,
    }

    interface Round {
        id: number,
        stage_id: number,
        group_id: number,
        number: number,
    }

    interface Match {
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

    interface MatchGame {
        id: number,
        parent_id: number,
        status: number,
        number: number,
        start_datetime: string,
        end_datetime: string,
        opponent1: ParticipantResult | null,
        opponent2: ParticipantResult | null,
    }
}