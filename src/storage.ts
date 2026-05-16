/*-----------------------------------------------------------------|
 * Contains the types which are persisted in the chosen storage.
 *----------------------------------------------------------------*/

import { StageSettings } from './input';
import { MatchResults } from './other';
import { Id, StageType } from './unions';

/**
 * A participant of a stage (team or individual).
 */
export interface Participant {
    /** ID of the participant. */
    id: Id,

    /** ID of the tournament this participant belongs to. */
    tournament_id: Id,

    /** Name of the participant. */
    name: string,
}

/**
 * A stage, which can be a round-robin stage or a single/double elimination stage.
 */
export interface Stage {
    /** ID of the stage. */
    id: Id,

    /** ID of the tournament this stage belongs to. */
    tournament_id: Id,

    /** Name of the stage. */
    name: string,

    /** Type of the stage. */
    type: StageType,

    /** Settings of the stage. */
    settings: StageSettings,

    /** The number of the stage in its tournament. */
    number: number,
}

/**
 * A group of a stage.
 */
export interface Group {
    /** ID of the group. */
    id: Id,

    /** ID of the parent stage. */
    stage_id: Id,

    /** The number of the group in its stage. */
    number: number,
}

// The next levels don't have a `name` property. They are automatically named with their `number` and their context (parent levels).

/**
 * A round of a group.
 */
export interface Round {
    /** ID of the round. */
    id: Id,

    /** ID of the parent stage. */
    stage_id: Id,

    /** ID of the parent group. */
    group_id: Id,

    /** The number of the round in its group. */
    number: number,
}

/**
 * A match of a round.
 */
export interface Match extends MatchResults {
    /** ID of the match. */
    id: Id,

    /** ID of the parent stage. */
    stage_id: Id,

    /** ID of the parent group. */
    group_id: Id,

    /** ID of the parent round. */
    round_id: Id,

    /** The number of the match in its round. */
    number: number,

    /** The count of match games this match has. Can be `0` if it's a simple match, or a positive number for "Best Of" matches. */
    child_count: number,
}

/**
 * A game of a match.
 */
export interface MatchGame extends MatchResults {
    /** ID of the match game. */
    id: Id,

    /** ID of the parent stage. */
    stage_id: Id,

    /** ID of the parent match. */
    parent_id: Id,

    /** The number of the match game in its parent match. */
    number: number,
}

/**
 * Converts all value types to array types.
 */
export type ValueToArray<T> = {
    [K in keyof T]: Array<T[K]>;
};

/**
 * Data type associated to each database table.
 */
export interface DataTypes {
    participant: Participant,
    stage: Stage,
    group: Group,
    round: Round,
    match: Match,
    match_game: MatchGame,
}

/**
 * The types of table in the storage.
 */
export type Table = keyof DataTypes;

/**
 * Format of the data in a database.
 */
export type Database = ValueToArray<DataTypes>;

/**
 * Omits the `id` property of a type.
 */
export type OmitId<T> = Omit<T, 'id'>;

/**
 * This CRUD interface is used by the manager to abstract storage.
 */
export interface CrudInterface {
    /**
     * Inserts a value in the database and returns its id.
     *
     * @param table Where to insert.
     * @param value What to insert.
     */
    insert<T extends Table>(table: T, value: OmitId<DataTypes[T]>): Promise<Id>

    /**
     * Inserts multiple values in the database.
     *
     * @param table Where to insert.
     * @param values What to insert.
     */
    insert<T extends Table>(table: T, values: OmitId<DataTypes[T]>[]): Promise<boolean>

    /**
     * Gets all data from a table in the database.
     *
     * @param table Where to get from.
     */
    select<T extends Table>(table: T): Promise<Array<DataTypes[T]> | null>

    /**
     * Gets specific data from a table in the database.
     *
     * @param table Where to get from.
     * @param id What to get.
     */
    select<T extends Table>(table: T, id: Id): Promise<DataTypes[T] | null>

    /**
     * Gets data from a table in the database with a filter.
     *
     * @param table Where to get from.
     * @param filter An object to filter data.
     */
    select<T extends Table>(table: T, filter: Partial<DataTypes[T]>): Promise<Array<DataTypes[T]> | null>

    /**
     * Updates data in a table.
     *
     * @param table Where to update.
     * @param id What to update.
     * @param value How to update.
     */
    update<T extends Table>(table: T, id: Id, value: DataTypes[T]): Promise<boolean>

    /**
     * Updates data in a table.
     *
     * @param table Where to update.
     * @param filter An object to filter data.
     * @param value How to update.
     */
    update<T extends Table>(table: T, filter: Partial<DataTypes[T]>, value: Partial<DataTypes[T]>): Promise<boolean>

    /**
     * Empties a table completely.
     * 
     * @param table Where to delete everything.
     */
    delete<T extends Table>(table: T): Promise<boolean>

    /**
     * Delete data in a table, based on a filter.
     *
     * @param table Where to delete in.
     * @param filter An object to filter data.
     */
    delete<T extends Table>(table: T, filter: Partial<DataTypes[T]>): Promise<boolean>
}
