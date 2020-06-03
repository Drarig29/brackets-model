import { MatchScores, OrderingType } from "../types";

/**
 * Makes pairs with each element and its next one.
 * @example [1, 2, 3, 4] --> [[1, 2], [3, 4]]
 */
export function makePairs(array: any[]): any[][];

/**
 * Makes pairs with one element from `left` and the other from `right`.
 * @example [1, 2] + [3, 4] --> [[1, 3], [2, 4]]
 */
export function makePairs(left: any[], right: any[]): any[][];

export function makePairs(left: any[], right?: any[]): any[][] {
    if (!right) {
        ensureEvenSized(left);
        return left.map((current, i) => (i % 2 === 0) ? [current, left[i + 1]] : [])
            .filter(v => v.length > 0);
    }

    ensureEquallySized(left, right);
    return left.map((current, i) => [current, right[i]]);
}

export function ensureEvenSized(array: any[]) {
    if (array.length % 2 === 1) {
        throw Error('Array size must be even.');
    }
}

export function ensureEquallySized(left: any[], right: any[]) {
    if (left.length !== right.length) {
        throw Error('Arrays size must be equal.');
    }
}

export function ensurePowerOfTwoSized(array: any[]) {
    if (!Number.isInteger(Math.log2(array.length))) {
        throw Error('Array size must be a power of 2.');
    }
}

export function ensureNotTied(scores: MatchScores) {
    if (scores[0] === scores[1]) {
        throw Error(`${scores[0]} and ${scores[1]} are tied. It cannot be.`);
    }
}

// https://web.archive.org/web/20200601102344/https://tl.net/forum/sc2-tournaments/202139-superior-double-elimination-losers-bracket-seeding

export const ordering = {
    natural: (array: any[]) => [...array],
    reverse: (array: any[]) => array.reverse(),
    half_shift: (array: any[]) => [...array.slice(array.length / 2), ...array.slice(0, array.length / 2)],
    reverse_half_shift: (array: any[]) => [...array.slice(array.length / 2).reverse(), ...array.slice(0, array.length / 2).reverse()],
    pair_flip: (array: any[]) => {
        const result = [];
        for (let i = 0; i < array.length; i += 2) result.push(array[i + 1], array[i]);
        return result;
    },
}

export const defaultMinorOrdering: { [key: number]: OrderingType[] } = {
    8: ['natural', 'reverse', 'natural'],
    16: ['natural', 'reverse_half_shift', 'reverse', 'natural'],
    32: ['natural', 'reverse', 'half_shift', 'natural', 'natural'],
    64: ['natural', 'reverse', 'half_shift', 'reverse', 'natural', 'natural'],
    128: ['natural', 'reverse', 'half_shift', 'pair_flip', 'pair_flip', 'pair_flip', 'natural'],
}