export type EventType = "game" | "practice" | "event";

export interface TeamEvent {
  id: string;
  type: EventType;
  title: string;
  weekday: string;
  month: string;
  day: number;
  time: string;
  arrive: string;
  location: string;
  address: string;
  note?: string;
  rsvp: { yes: number; no: number; pending: number };
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  superpower: string;
  snack: string;
  color: string;
}

export interface Thread {
  id: string;
  from: string;
  role: string;
  initials: string;
  color: string;
  subject: string;
  time: string;
  unread: boolean;
  messages: { from: "them" | "me"; text: string; time: string }[];
}

export interface Photo {
  id: string;
  album: string;
  caption: string;
  src: string;
  isNew?: boolean;
}

export interface VolunteerSlot {
  id: string;
  date: string;
  role: string;
  family: string | null;
}

export const team = {
  name: "Riverside Rockets",
  division: "6U Tee-Ball",
  season: "Summer 2026",
  family: "Sarah & Jake",
  child: "Jake",
  coach: "Coach Mike",
  assistant: "Coach Dana",
  jerseyColor: "Orange",
  record: { played: 8, total: 12, highFives: 312 },
};

export const tickerItems = [
  "Field C is closed this weekend. Practice moved to Field A.",
  "Team Picture Day is Saturday, July 5. Arrive 20 min early in orange jerseys.",
  "Snack sign-ups for July are open. Three slots still need a hero.",
  "Reminder: sunscreen + water bottle for every launch.",
];

export const events: TeamEvent[] = [
  {
    id: "e1",
    type: "practice",
    title: "Thursday Practice",
    weekday: "Thu",
    month: "Jul",
    day: 3,
    time: "5:30 PM",
    arrive: "5:15 PM",
    location: "Field A",
    address: "1400 Riverside Dr",
    note: "Relay drills + batting tee stations.",
    rsvp: { yes: 12, no: 1, pending: 1 },
  },
  {
    id: "e2",
    type: "game",
    title: "Game vs. Riverside Hawks",
    weekday: "Sat",
    month: "Jul",
    day: 5,
    time: "9:00 AM",
    arrive: "8:40 AM",
    location: "North B Field",
    address: "1400 Riverside Dr",
    note: "Field moved from South A to North B. Picture Day right after.",
    rsvp: { yes: 11, no: 1, pending: 2 },
  },
  {
    id: "e3",
    type: "event",
    title: "Team Picture Day",
    weekday: "Sat",
    month: "Jul",
    day: 5,
    time: "10:30 AM",
    arrive: "10:15 AM",
    location: "North B Field",
    address: "1400 Riverside Dr",
    note: "Orange jerseys, caps on, big smiles.",
    rsvp: { yes: 13, no: 0, pending: 1 },
  },
  {
    id: "e4",
    type: "practice",
    title: "Tuesday Practice",
    weekday: "Tue",
    month: "Jul",
    day: 8,
    time: "5:30 PM",
    arrive: "5:15 PM",
    location: "Field A",
    address: "1400 Riverside Dr",
    rsvp: { yes: 9, no: 2, pending: 3 },
  },
  {
    id: "e5",
    type: "game",
    title: "Game vs. Maple Street Comets",
    weekday: "Sat",
    month: "Jul",
    day: 12,
    time: "11:00 AM",
    arrive: "10:40 AM",
    location: "South A Field",
    address: "1400 Riverside Dr",
    note: "Sarah & Jake bring snacks.",
    rsvp: { yes: 8, no: 0, pending: 6 },
  },
  {
    id: "e6",
    type: "event",
    title: "Rocket Pool Party",
    weekday: "Sun",
    month: "Jul",
    day: 20,
    time: "2:00 PM",
    arrive: "2:00 PM",
    location: "Riverside Community Pool",
    address: "220 Lakeshore Ave",
    note: "End-of-season splash. Floaties welcome.",
    rsvp: { yes: 6, no: 1, pending: 7 },
  },
];

export const players: Player[] = [
  { id: "p1", name: "Jake R.", number: 7, position: "Shortstop", superpower: "Fastest cleats in 6U", snack: "Orange slices", color: "bg-rocket-500" },
  { id: "p2", name: "Mia T.", number: 3, position: "First base", superpower: "Never misses a high-five", snack: "Goldfish", color: "bg-sky-500" },
  { id: "p3", name: "Leo P.", number: 11, position: "Catcher", superpower: "Loudest cheer", snack: "Apple slices", color: "bg-candy-500" },
  { id: "p4", name: "Ava K.", number: 5, position: "Pitcher's circle", superpower: "Can hop on one foot forever", snack: "Pretzels", color: "bg-zest-500" },
  { id: "p5", name: "Noah B.", number: 9, position: "Second base", superpower: "Dinosaur expert", snack: "Juice box", color: "bg-violet-500" },
  { id: "p6", name: "Zoe M.", number: 2, position: "Outfield", superpower: "Finds every four-leaf clover", snack: "Grapes", color: "bg-rocket-400" },
  { id: "p7", name: "Eli S.", number: 14, position: "Third base", superpower: "Does the robot", snack: "Cheese sticks", color: "bg-sky-400" },
  { id: "p8", name: "Ruby C.", number: 8, position: "Outfield", superpower: "Best bubble blower", snack: "Popcorn", color: "bg-candy-400" },
  { id: "p9", name: "Finn D.", number: 1, position: "First base", superpower: "Knows all the planets", snack: "Banana", color: "bg-zest-400" },
  { id: "p10", name: "Isla W.", number: 6, position: "Catcher", superpower: "Fearless dirt slider", snack: "Fruit snacks", color: "bg-violet-400" },
  { id: "p11", name: "Max H.", number: 12, position: "Outfield", superpower: "Loudest 'I got it!'", snack: "Granola bar", color: "bg-rocket-500" },
  { id: "p12", name: "Lily G.", number: 4, position: "Shortstop", superpower: "Cartwheel champion", snack: "Yogurt tube", color: "bg-sky-500" },
  { id: "p13", name: "Owen F.", number: 10, position: "Second base", superpower: "Tells great knock-knock jokes", snack: "Crackers", color: "bg-candy-500" },
  { id: "p14", name: "Nora J.", number: 13, position: "Third base", superpower: "Draws rockets on everything", snack: "Watermelon", color: "bg-zest-500" },
];

export const skillMeter = [
  { label: "Throwing", value: 72, color: "bg-sky-400" },
  { label: "Catching", value: 58, color: "bg-rocket-400" },
  { label: "Running bases", value: 86, color: "bg-zest-400" },
  { label: "Listening at the plate", value: 64, color: "bg-candy-400" },
];

export const threads: Thread[] = [
  {
    id: "t1",
    from: "Coach Mike",
    role: "Head coach",
    initials: "CM",
    color: "bg-rocket-500",
    subject: "Field change for Saturday",
    time: "2h ago",
    unread: true,
    messages: [
      { from: "them", text: "Heads up, Rockets! Saturday's game moved from South A to North B. Same time, 9:00 AM sharp.", time: "2:14 PM" },
      { from: "them", text: "Parking is easiest in the lot off Riverside Dr. Look for the orange flags.", time: "2:15 PM" },
    ],
  },
  {
    id: "t2",
    from: "Team Mom Priya",
    role: "Team parent",
    initials: "TP",
    color: "bg-candy-500",
    subject: "Picture Day checklist",
    time: "5h ago",
    unread: true,
    messages: [
      { from: "them", text: "Picture Day is this Saturday right after the game. Orange jerseys, caps, and a clean face if we can manage it.", time: "11:02 AM" },
      { from: "them", text: "Order forms are in the Photos tab. Deadline is Friday night.", time: "11:03 AM" },
      { from: "me", text: "Got it, thanks Priya! Jake is very excited about the 'silly pose' option.", time: "11:30 AM" },
    ],
  },
  {
    id: "t3",
    from: "Coach Dana",
    role: "Assistant coach",
    initials: "CD",
    color: "bg-sky-500",
    subject: "Thursday practice recap",
    time: "Yesterday",
    unread: false,
    messages: [
      { from: "them", text: "Great Thursday practice, relay drills clicked today. Saturday focus: listening at the plate.", time: "6:48 PM" },
      { from: "me", text: "Jake came home and ran relay drills with the dog. Mission accomplished.", time: "7:10 PM" },
      { from: "them", text: "That counts as extra credit.", time: "7:12 PM" },
    ],
  },
  {
    id: "t4",
    from: "Rockets Announcements",
    role: "League",
    initials: "RA",
    color: "bg-zest-500",
    subject: "July snack sign-ups open",
    time: "Mon",
    unread: false,
    messages: [
      { from: "them", text: "Snack and dugout-parent sign-ups for July are live in the Volunteer tab. Three slots still open!", time: "9:00 AM" },
    ],
  },
];

export const photos: Photo[] = [
  { id: "ph1", album: "Game Day", caption: "First hit of the season", src: "https://picsum.photos/seed/rockets-01/800/600", isNew: true },
  { id: "ph2", album: "Game Day", caption: "Dugout dance party", src: "https://picsum.photos/seed/rockets-02/800/1000", isNew: true },
  { id: "ph3", album: "Practice", caption: "Relay drill champions", src: "https://picsum.photos/seed/rockets-03/800/600", isNew: true },
  { id: "ph4", album: "Practice", caption: "Tee station, round two", src: "https://picsum.photos/seed/rockets-04/800/800" },
  { id: "ph5", album: "Team Fun", caption: "Post-game popsicles", src: "https://picsum.photos/seed/rockets-05/800/600" },
  { id: "ph6", album: "Game Day", caption: "High-five tunnel", src: "https://picsum.photos/seed/rockets-06/800/1000" },
  { id: "ph7", album: "Team Fun", caption: "Rocket pose, take seven", src: "https://picsum.photos/seed/rockets-07/800/600" },
  { id: "ph8", album: "Practice", caption: "Catching with both hands", src: "https://picsum.photos/seed/rockets-08/800/800" },
  { id: "ph9", album: "Team Fun", caption: "Snack time summit", src: "https://picsum.photos/seed/rockets-09/800/600" },
];

export const volunteerSlots: VolunteerSlot[] = [
  { id: "v1", date: "Sat, Jul 5", role: "Snacks", family: "The Thompsons" },
  { id: "v2", date: "Sat, Jul 5", role: "Dugout parent", family: "The Patels" },
  { id: "v3", date: "Sat, Jul 5", role: "Team photographer", family: null },
  { id: "v4", date: "Sat, Jul 12", role: "Snacks", family: "Sarah & Jake" },
  { id: "v5", date: "Sat, Jul 12", role: "Dugout parent", family: null },
  { id: "v6", date: "Sat, Jul 12", role: "Field setup", family: "The Garcias" },
  { id: "v7", date: "Sat, Jul 19", role: "Snacks", family: null },
  { id: "v8", date: "Sat, Jul 19", role: "Dugout parent", family: "The Kims" },
  { id: "v9", date: "Sun, Jul 20", role: "Pool party host", family: "The Wrights" },
];

export const packList = ["Orange jersey", "Water bottle", "Glove", "Sunscreen", "Cap"];
