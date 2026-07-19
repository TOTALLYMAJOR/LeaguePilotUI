// ─── Demo data for LeaguePilot UI ───────────────────────────────────────────
// All data is static/local — no backend required.

export const DEMO_USER = {
  id: "u1",
  name: "Sarah Mitchell",
  email: "sarah@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  roles: ["parent", "coach", "admin"],
  activeRole: "parent",
};

export const TEAM = {
  id: "t1",
  name: "Riverside Rockets",
  division: "6U Division",
  sport: "Baseball",
  colors: { primary: "#22d3ee", secondary: "#10b981" },
  mascot: "Rockets",
  initials: "RR",
  season: "Summer 2025",
  org: "Riverside Youth Sports",
};

export const CHILDREN = [
  {
    id: "c1",
    name: "Jake Mitchell",
    jersey: "#7",
    avatar: "https://images.unsplash.com/photo-1519456104720-033100c5c4e9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    team: "Riverside Rockets",
    accessStatus: "active",
  },
];

export const EVENTS = [
  {
    id: "e1",
    type: "game",
    emoji: "🏈",
    title: "Riverside Hawks · Game",
    opponent: "Riverside Hawks",
    date: "Saturday, July 5",
    time: "9:00 AM",
    endTime: "10:30 AM",
    arrivalTime: "8:30 AM",
    location: "North B Field",
    address: "1400 Riverside Dr",
    status: "confirmed",
    statusLabel: "Confirmed",
    changed: true,
    changeNote: "Field moved: South A → North B",
    changeTime: "2 hours ago",
    weather: "Partly cloudy · 78°F",
    rsvp: "going",
    snackOpen: false,
    volunteerOpen: true,
    coachNote: "Great Thursday practice — relay drills clicked today. Saturday focus: listening at the plate.",
    coachName: "Coach Mike",
  },
  {
    id: "e2",
    type: "practice",
    emoji: "⚾",
    title: "Thursday Practice",
    date: "Thursday, July 10",
    time: "5:30 PM",
    endTime: "7:00 PM",
    arrivalTime: "5:15 PM",
    location: "Field A",
    address: "800 Park Ave",
    status: "confirmed",
    statusLabel: "Confirmed",
    changed: false,
    weather: "Sunny · 82°F",
    rsvp: null,
    snackOpen: false,
    volunteerOpen: false,
    coachNote: "",
    coachName: "Coach Mike",
  },
  {
    id: "e3",
    type: "game",
    emoji: "🏈",
    title: "Valley Stars · Game",
    opponent: "Valley Stars",
    date: "Saturday, July 12",
    time: "10:00 AM",
    endTime: "11:30 AM",
    arrivalTime: "9:30 AM",
    location: "South A Field",
    address: "2200 Valley Rd",
    status: "confirmed",
    statusLabel: "Confirmed",
    changed: false,
    weather: "Sunny · 85°F",
    rsvp: null,
    snackOpen: true,
    volunteerOpen: true,
    coachNote: "",
    coachName: "Coach Mike",
  },
  {
    id: "e4",
    type: "practice",
    emoji: "⚾",
    title: "Tuesday Practice",
    date: "Tuesday, July 15",
    time: "5:30 PM",
    endTime: "7:00 PM",
    arrivalTime: "5:15 PM",
    location: "Field A",
    address: "800 Park Ave",
    status: "confirmed",
    statusLabel: "Confirmed",
    changed: false,
    weather: "Clear · 79°F",
    rsvp: null,
    snackOpen: false,
    volunteerOpen: false,
    coachNote: "",
    coachName: "Coach Mike",
  },
  {
    id: "e5",
    type: "game",
    emoji: "🏈",
    title: "Eastside Tigers · Game",
    opponent: "Eastside Tigers",
    date: "Saturday, July 19",
    time: "9:00 AM",
    endTime: "10:30 AM",
    arrivalTime: "8:30 AM",
    location: "North A Field",
    address: "1400 Riverside Dr",
    status: "cancelled",
    statusLabel: "Cancelled",
    changed: true,
    changeNote: "Cancelled due to field maintenance",
    changeTime: "Yesterday",
    weather: "Sunny · 80°F",
    rsvp: null,
    snackOpen: false,
    volunteerOpen: false,
    coachNote: "",
    coachName: "Coach Mike",
  },
];

export const MESSAGES = [
  {
    id: "m1",
    sender: "Coach Mike",
    senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    role: "coach",
    pinned: true,
    content: "Great practice today everyone! Remember: game Saturday 9 AM at North B Field (updated location). Arrive by 8:30 please!",
    time: "2h ago",
    read: false,
    topic: "Game Day",
  },
  {
    id: "m2",
    sender: "League Admin",
    senderAvatar: null,
    role: "admin",
    pinned: false,
    content: "Reminder: Team Picture Day is this Saturday, July 5. All players should arrive in full uniform.",
    time: "4h ago",
    read: false,
    topic: "Announcement",
  },
  {
    id: "m3",
    sender: "Maria Torres",
    senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    role: "parent",
    pinned: false,
    content: "Will there be a warm-up before the game? My son needs time to stretch.",
    time: "1d ago",
    read: true,
    topic: null,
  },
  {
    id: "m4",
    sender: "Coach Mike",
    senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    role: "coach",
    pinned: false,
    content: "Yes! We'll do a 15-minute warm-up starting at 8:30. Make sure kids bring a water bottle — it's going to be warm.",
    time: "1d ago",
    read: true,
    topic: null,
  },
  {
    id: "m5",
    sender: "David Kim",
    senderAvatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    role: "parent",
    pinned: false,
    content: "Is parking available at North B Field?",
    time: "3d ago",
    read: true,
    topic: null,
  },
];

export const ROSTER = [
  { id: "p1", name: "Jake Mitchell", jersey: 7, status: "active", rsvp: "going", guardian: "Sarah & Jake" },
  { id: "p2", name: "Liam Torres", jersey: 12, status: "active", rsvp: "going", guardian: "Maria Torres" },
  { id: "p3", name: "Noah Kim", jersey: 3, status: "active", rsvp: "maybe", guardian: "David Kim" },
  { id: "p4", name: "Emma Davis", jersey: 18, status: "active", rsvp: "going", guardian: "Lisa Davis" },
  { id: "p5", name: "Aiden Chen", jersey: 5, status: "active", rsvp: "not-going", guardian: "Jenny Chen" },
  { id: "p6", name: "Sofia Brown", jersey: 9, status: "active", rsvp: "going", guardian: "Tom Brown" },
  { id: "p7", name: "Mason Johnson", jersey: 14, status: "active", rsvp: null, guardian: "Karen Johnson" },
  { id: "p8", name: "Olivia Lee", jersey: 22, status: "active", rsvp: null, guardian: "Brian Lee" },
  { id: "p9", name: "Ethan Garcia", jersey: 11, status: "active", rsvp: "going", guardian: "Carlos Garcia" },
  { id: "p10", name: "Ava Wilson", jersey: 6, status: "active", rsvp: "going", guardian: "Amy Wilson" },
  { id: "p11", name: "Lucas Martinez", jersey: 17, status: "active", rsvp: "maybe", guardian: "Rosa Martinez" },
  { id: "p12", name: "Mia Taylor", jersey: 2, status: "active", rsvp: null, guardian: "Kevin Taylor" },
];

export const VOLUNTEERS = [
  {
    id: "v1",
    eventId: "e3",
    eventTitle: "Valley Stars · Game — July 12",
    roles: [
      { id: "vr1", title: "Snacks", description: "Bring post-game snacks for 12 kids", status: "open", claimedBy: null },
      { id: "vr2", title: "Scorekeeper", description: "Track score and stats during the game", status: "open", claimedBy: null },
      { id: "vr3", title: "Field Setup", description: "Help set up bases and equipment before game", status: "filled", claimedBy: "Tom Brown" },
      { id: "vr4", title: "Team Parent", description: "Coordinate team communications", status: "filled", claimedBy: "Maria Torres" },
    ],
  },
  {
    id: "v2",
    eventId: "e1",
    eventTitle: "Riverside Hawks · Game — July 5",
    roles: [
      { id: "vr5", title: "Snacks (July 12)", description: "You're signed up for post-game snacks", status: "filled", claimedBy: "Sarah Mitchell" },
    ],
  },
];

export const PHOTOS = [
  {
    id: "ph1",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
    caption: "Game vs. River Hawks — July 5",
    uploadedBy: "Coach Mike",
    date: "July 5",
    approved: true,
    isNew: true,
  },
  {
    id: "ph2",
    url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    caption: "Thursday practice — relay drills",
    uploadedBy: "Maria Torres",
    date: "July 3",
    approved: true,
    isNew: true,
  },
  {
    id: "ph3",
    url: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80",
    caption: "Team warmup",
    uploadedBy: "Coach Mike",
    date: "July 3",
    approved: true,
    isNew: true,
  },
  {
    id: "ph4",
    url: "https://images.unsplash.com/photo-1604480132736-44c188fe4d20?auto=format&fit=crop&w=800&q=80",
    caption: "End of season celebration",
    uploadedBy: "League Admin",
    date: "June 28",
    approved: true,
    isNew: false,
  },
  {
    id: "ph5",
    url: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80",
    caption: "Practice at Field A",
    uploadedBy: "David Kim",
    date: "June 24",
    approved: true,
    isNew: false,
  },
  {
    id: "ph6",
    url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    caption: "Coaching session",
    uploadedBy: "Coach Mike",
    date: "June 20",
    approved: true,
    isNew: false,
  },
];

export const PRACTICE_RECAPS = [
  {
    id: "pr1",
    eventTitle: "Thursday Practice",
    date: "July 3, 2025",
    coachName: "Coach Mike",
    status: "published",
    focusAreas: ["Relay Drills", "Plate Discipline", "Teamwork"],
    coachNotes: "Relay drills really clicked today — kids are starting to anticipate throws. Need to keep working on focus at the plate.",
    parentSummary: "Today your player worked on relay passing (catching and quickly throwing to teammates), staying focused when it's their turn to bat, and working together as a team.",
    homeActivities: [
      "Practice catching and throwing with a soft ball in the backyard (5 minutes each session)",
      "Work on eye-hand coordination: toss a ball up and clap before catching",
      "Talk about one thing they did well at practice",
    ],
    parentTip: "Keep it fun! At this age, enjoyment and positive reinforcement matter more than technical perfection.",
    skillCards: [
      { title: "Relay Throw", icon: "solar:target-linear", desc: "Catching and quickly re-throwing to a teammate" },
      { title: "Plate Focus", icon: "solar:eye-linear", desc: "Staying locked in while waiting to bat" },
      { title: "Team Communication", icon: "solar:chat-round-line-linear", desc: "Calling for the ball and supporting teammates" },
    ],
    teamQuest: "This week: cheer for 3 teammates by name during practice!",
    memoryMoment: "Liam pulled off a perfect relay throw in the final drill — the whole team cheered!",
    approved: true,
  },
  {
    id: "pr2",
    eventTitle: "Tuesday Practice",
    date: "July 1, 2025",
    coachName: "Coach Mike",
    status: "published",
    focusAreas: ["Base Running", "Fielding Fundamentals"],
    coachNotes: "Base running was chaotic but fun. Kids learned a lot about when to run and when to hold.",
    parentSummary: "Your player practiced running the bases smartly and catching ground balls. Both are essential game skills!",
    homeActivities: [
      "Play 'stop and go' in the backyard — practice running and stopping quickly",
      "Roll a ball and practice getting low to pick it up",
    ],
    parentTip: "Ask them to explain the rules of base running — teaching you reinforces what they learned!",
    skillCards: [
      { title: "Base Running", icon: "solar:running-round-linear", desc: "When to run, when to hold" },
      { title: "Ground Balls", icon: "solar:arrow-down-linear", desc: "Getting low and using two hands" },
    ],
    teamQuest: "High-five every teammate after every play this week!",
    memoryMoment: "Emma's diving catch during fielding drills got a standing ovation from the whole team.",
    approved: true,
  },
];

// ─── Coach-specific data ─────────────────────────────────────────────────────

export const COACH = {
  name: "Mike Henderson",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  team: "Riverside Rockets",
  membership: "active",
};

export const ATTENDANCE_SUMMARY = {
  eventId: "e1",
  eventTitle: "Riverside Hawks · Game — July 5",
  going: 8,
  maybe: 2,
  notGoing: 1,
  noResponse: 1,
  total: 12,
  lateChanges: 1,
};

export const COACH_DRAFTS = [
  { id: "d1", type: "Parent Replay", title: "Thursday Practice Replay", status: "Draft", updatedAt: "1h ago" },
  { id: "d2", type: "Announcement", title: "Week 4 Update", status: "Awaiting approval", updatedAt: "3h ago" },
];

export const WEATHER_ALERT = {
  event: "Valley Stars · Game — July 12",
  condition: "Heat Advisory",
  temp: "95°F expected",
  source: "National Weather Service",
  freshness: "Updated 30 min ago",
  draftStatus: "Draft",
};

export const DRILL_VIDEOS = [
  { id: "dv1", title: "Relay Throw Fundamentals", url: "https://youtube.com/watch?v=example1", status: "approved", assignedTo: "Thursday Practice" },
  { id: "dv2", title: "Ground Ball Basics", url: "https://youtube.com/watch?v=example2", status: "awaiting-review", assignedTo: null },
];

// ─── Admin-specific data ─────────────────────────────────────────────────────

export const REGISTRATIONS = [
  {
    id: "r1",
    parentName: "Jennifer Walsh",
    email: "jwalsh@example.com",
    org: "Riverside Youth Sports",
    season: "Summer 2025",
    team: "Riverside Rockets",
    status: "pending",
    submittedAt: "2 hours ago",
    child: "Tyler Walsh",
  },
  {
    id: "r2",
    parentName: "Marcus Reed",
    email: "mreed@example.com",
    org: "Riverside Youth Sports",
    season: "Summer 2025",
    team: "Valley Stars",
    status: "pending",
    submittedAt: "5 hours ago",
    child: "Jaylen Reed",
  },
  {
    id: "r3",
    parentName: "Priya Patel",
    email: "ppatel@example.com",
    org: "Riverside Youth Sports",
    season: "Summer 2025",
    team: "Riverside Rockets",
    status: "approved",
    submittedAt: "1 day ago",
    decidedBy: "Admin",
    child: "Rohan Patel",
  },
  {
    id: "r4",
    parentName: "Chris Nguyen",
    email: "cnguyen@example.com",
    org: "Riverside Youth Sports",
    season: "Summer 2025",
    team: "Eastside Tigers",
    status: "rejected",
    submittedAt: "2 days ago",
    decidedBy: "Admin",
    child: "Lily Nguyen",
  },
];

export const INVITATIONS = [
  { id: "i1", email: "coach.dave@example.com", role: "Coach", team: "Valley Stars", status: "pending", expires: "July 12, 2025", sentAt: "July 5, 2025" },
  { id: "i2", email: "jwalsh@example.com", role: "Parent", team: "Riverside Rockets", status: "pending", expires: "July 12, 2025", sentAt: "July 5, 2025" },
  { id: "i3", email: "old.coach@example.com", role: "Coach", team: "Eastside Tigers", status: "expired", expires: "June 28, 2025", sentAt: "June 21, 2025" },
  { id: "i4", email: "parent.sam@example.com", role: "Parent", team: "Riverside Rockets", status: "accepted", expires: "June 30, 2025", sentAt: "June 23, 2025" },
  { id: "i5", email: "bad.actor@example.com", role: "Parent", team: "Valley Stars", status: "revoked", expires: "July 1, 2025", sentAt: "June 24, 2025" },
];

export const SPONSORS = [
  { id: "s1", name: "Riverside Sporting Goods", logo: null, placement: "Team Portal Header", status: "active", expires: "Dec 31, 2025" },
  { id: "s2", name: "Pizza Palace", logo: null, placement: "Game Day Sheet Footer", status: "active", expires: "Sep 30, 2025" },
  { id: "s3", name: "Valley Bank", logo: null, placement: "Schedule Page", status: "expired", expires: "June 30, 2025" },
];

export const FAMILY_WALLET = [
  { label: "Registration Fee", amount: "$125.00", status: "paid", proof: "Stripe #pi_abc123" },
  { label: "Team Dues", amount: "$40.00", status: "paid", proof: "Stripe #pi_def456" },
  { label: "Equipment Fee", amount: "$15.00", status: "unpaid", proof: null },
  { label: "Scholarship Credit", amount: "−$20.00", status: "applied", proof: "Admin approved" },
];

export const HEALTH_INDICATORS = [
  { label: "Active Teams", value: "4 / 4", status: "ok" },
  { label: "Coach Coverage", value: "3 / 4 teams", status: "warn" },
  { label: "Family Access Gaps", value: "2 families", status: "warn" },
  { label: "Empty Rosters", value: "0", status: "ok" },
  { label: "Pending Invites", value: "2", status: "ok" },
  { label: "Empty Schedules", value: "0", status: "ok" },
  { label: "Provider Issues", value: "None", status: "ok" },
];

export const AUDIT_EVENTS = [
  { id: "a1", action: "Registration approved", subject: "Priya Patel → Riverside Rockets", admin: "Admin", time: "1 day ago" },
  { id: "a2", action: "Invitation revoked", subject: "bad.actor@example.com", admin: "Admin", time: "1 day ago" },
  { id: "a3", action: "Schedule change queued", subject: "July 5 game — field update", admin: "Admin", time: "2 hours ago" },
  { id: "a4", action: "Media approved", subject: "3 photos from Coach Mike", admin: "Admin", time: "3 hours ago" },
  { id: "a5", action: "Guardian link repaired", subject: "Maria Torres → Liam Torres", admin: "Admin", time: "2 days ago" },
];

export const NOTIFICATION_QUEUE = [
  { id: "n1", type: "Schedule Change", audience: "Riverside Rockets families (12)", channel: "Push + Email", status: "Awaiting approval", draft: true },
  { id: "n2", type: "Weekly Digest", audience: "All families (48)", channel: "Email", status: "Draft", draft: true },
  { id: "n3", type: "Game Reminder", audience: "Riverside Rockets families (12)", channel: "Push", status: "Queued", draft: false },
  { id: "n4", type: "Weather Alert", audience: "Valley Stars families (14)", channel: "SMS", status: "Sent", draft: false },
];

export const IMPORT_PREVIEW = {
  filename: "roster_summer2025.csv",
  total: 14,
  valid: 11,
  errors: [
    { row: 3, code: "DUPLICATE_EMAIL", field: "guardian_email", value: "dup@example.com", severity: "error" },
    { row: 7, code: "MISSING_JERSEY", field: "jersey_number", value: "", severity: "error" },
    { row: 11, code: "DUPLICATE_JERSEY", field: "jersey_number", value: "7", severity: "warn" },
  ],
};

export const AI_WORKSPACE_TEMPLATES = [
  { id: "aw1", title: "New Parent Brief", icon: "solar:user-hand-up-linear", desc: "Welcome message for new families" },
  { id: "aw2", title: "Team Onboarding Brief", icon: "solar:users-group-rounded-linear", desc: "Full season orientation for all families" },
  { id: "aw3", title: "Weekly Digest", icon: "solar:letter-linear", desc: "Summarize the week for parents" },
  { id: "aw4", title: "Practice Replay", icon: "solar:play-circle-linear", desc: "Turn practice notes into parent-friendly recap" },
  { id: "aw5", title: "Announcement Cleaner", icon: "solar:magic-stick-linear", desc: "Make drafts clear and parent-friendly" },
  { id: "aw6", title: "Smart FAQ", icon: "solar:question-circle-linear", desc: "Auto-generate common questions & answers" },
  { id: "aw7", title: "Coach Inbox Prioritization", icon: "solar:inbox-in-linear", desc: "Sort and prioritize coach messages" },
  { id: "aw8", title: "Parent Brief Before Game", icon: "solar:flag-linear", desc: "Game-day prep note for families" },
  { id: "aw9", title: "Season Timeline", icon: "solar:timeline-linear", desc: "Visual summary of the season's arc" },
  { id: "aw10", title: "End-of-Season Storybook", icon: "solar:book-linear", desc: "Capture the team's season story" },
  { id: "aw11", title: "Action Item Extraction", icon: "solar:checklist-linear", desc: "Pull tasks from long coach notes" },
  { id: "aw12", title: "Safety Monitor", icon: "solar:shield-check-linear", desc: "Flag safety concerns in communications" },
];

export const SECURITY_CHECKS = [
  { id: "sc1", label: "Active season configured", status: "pass" },
  { id: "sc2", label: "All teams have a coach", status: "fail", note: "Valley Stars missing coach assignment" },
  { id: "sc3", label: "Family access complete", status: "warn", note: "2 families pending guardian link" },
  { id: "sc4", label: "Roster coverage", status: "pass" },
  { id: "sc5", label: "Schedule published", status: "pass" },
  { id: "sc6", label: "Role boundaries enforced", status: "pass" },
  { id: "sc7", label: "Invitation abuse limits active", status: "pass" },
  { id: "sc8", label: "Provider connected", status: "warn", note: "Email provider not configured" },
  { id: "sc9", label: "Tenant isolation verified", status: "pass" },
  { id: "sc10", label: "Audit log active", status: "pass" },
];
