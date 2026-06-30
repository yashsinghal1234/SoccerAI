export interface MatchEvent {
  minute: number;
  type: 'goal' | 'card' | 'sub' | 'insight';
  team: string;
  description: string;
  player?: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'PRE_MATCH' | 'LIVE' | 'FINISHED';
  minute?: number;
  league: string;
  events: MatchEvent[];
  aiInsight?: string;
  possession?: { home: number; away: number };
}

// Simulated data
const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeScore: 1,
    awayScore: 0,
    status: 'LIVE',
    minute: 43,
    league: 'La Liga',
    possession: { home: 45, away: 55 },
    events: [
      { minute: 12, type: 'insight', team: 'Real Madrid', description: 'Vini Jr exploiting the high line.' },
      { minute: 34, type: 'goal', team: 'Real Madrid', description: 'Bellingham finishes a counter-attack.', player: 'J. Bellingham' }
    ],
    aiInsight: 'Barcelona controlling possession but vulnerable on the break.'
  },
  {
    id: 'm2',
    homeTeam: 'Arsenal',
    awayTeam: 'Man City',
    homeScore: 0,
    awayScore: 0,
    status: 'PRE_MATCH',
    league: 'Premier League',
    events: [],
    aiInsight: 'Key battle: Rice vs Rodri in the midfield. City expected to dominate early.'
  },
  {
    id: 'm3',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Dortmund',
    homeScore: 3,
    awayScore: 1,
    status: 'FINISHED',
    league: 'Bundesliga',
    possession: { home: 62, away: 38 },
    events: [
      { minute: 15, type: 'goal', team: 'Bayern Munich', player: 'H. Kane', description: 'Header from a corner.' },
      { minute: 40, type: 'goal', team: 'Dortmund', player: 'D. Malen', description: 'Quick transition goal.' },
      { minute: 75, type: 'goal', team: 'Bayern Munich', player: 'L. Sané', description: 'Individual brilliance.' },
      { minute: 88, type: 'goal', team: 'Bayern Munich', player: 'H. Kane', description: 'Penalty kick.' }
    ],
    aiInsight: 'Bayern dominated the wide areas, completing 24 crosses.'
  }
];

export const getMatches = (): Match[] => {
  return MOCK_MATCHES;
};

export const getMatchById = (id: string): Match | undefined => {
  return MOCK_MATCHES.find(m => m.id === id);
};
