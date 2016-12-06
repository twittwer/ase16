export interface Vote {
  _id?: string;
  title: string;
  room: string;
  creator?: string;
  opened_at?: Date;
  closed_at?: Date;
  options: Option[];
}

export interface Option {
  title: string;
  creator?: string;
  yes_votes?: number;
  no_votes?: number;
  opinions?: Opinion[];
}

export interface Opinion {
  decider?: string;
  decision?: boolean;
}
