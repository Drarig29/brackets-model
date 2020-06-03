type TournamentType = "pools" | "single_elimination" | "double_elimination";
type OrderingType = "natural" | "reverse" | "half_shift" | "reverse_half_shift" | "pair_flip";

type Teams = string[];

type MatchScores = [number, number];
type RoundScores = MatchScores[];
type BracketScores = RoundScores[];
type TournamentResults = BracketScores[];