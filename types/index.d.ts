export type TournamentType = "pools" | "single_elimination" | "double_elimination";
export type OrderingType = "natural" | "reverse" | "half_shift" | "reverse_half_shift" | "pair_flip";

export type Teams = string[];

export type MatchScores = [number, number];
export type RoundScores = MatchScores[];
export type BracketScores = RoundScores[];
export type TournamentResults = BracketScores[];