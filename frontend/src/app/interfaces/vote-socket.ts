import { Option } from './vote';

interface VoteRef {
  vote_id: string;
}

export interface OptionsData extends VoteRef {
  options: Option[];
}

export interface OpinionData extends VoteRef {
  decisions: Decision[];
}

export interface Decision { // ~> Opinion
  option_title: string;
  decision: boolean;
}
