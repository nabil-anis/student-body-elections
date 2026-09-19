import { Society, Position } from './types';

export const EXTENDED_GENDERS = [
  "Transsexual Male",
  "Transsexual Female",
  "Metrosexual Male",
  "Metrosexual Female",
  "Male, But Curious What Being a Female is Like",
  "Female. But Curious What Being a Male is Like",
  "Male, But Overweight, So Have Moobs",
  "Female, But Have an Adam's Apple",
  "Conjoined Twin - Male",
  "Conjoined Twin - Female",
  "Born Without Genitals - Identify as Male",
  "Born Without Genitals - Identify as Female",
  "Born Without Genitals - Proud of it",
  "Born a Male, Bad Circumcision, Raised Female",
  "WOMYN, thank-you very much! > :- (",
  "Batman",
  "Sentient Artificial Intelligence With No Gender",
  "Sentient Artificial Intelligence - Identifies as Male",
  "Sentient Artificial Intelligence - Identifies as Female",
  "Household Pet That Walked Across the Keyboard - Male",
  "Household Pet That Walked Across the Keyboard - Female",
  "Household Pet That Walked Across the Keyboard - Other",
  "None",
  "Prefer Not to Say"
];

export const CONFIG = {
  societies: [
    { id: "student-council", name: "Student Council", available: true },
    { id: "event-society", name: "Event Society", available: true },
    { id: "marketing-media", name: "Marketing and Media", available: true },
    { id: "character-building", name: "Character Building Society", available: false },
    { id: "public-speaking", name: "Public Speaking Society", available: true },
    { id: "arts-literature", name: "Arts and Literature Society", available: false },
  ] as Society[],

  positions: {
    "student-council": [
      { id: "president", name: "President", available: true },
      { id: "vp", name: "Vice President", available: true },
      { id: "gensec", name: "General Secretary", available: true },
      { id: "treasurer", name: "Treasurer", available: true },
    ] as Position[],
    "public-speaking": [
      { id: "president", name: "President", available: true },
      { id: "vp", name: "Vice President", available: true },
      { id: "gensec", name: "General Secretary", available: true },
      { id: "treasurer", name: "Treasurer", available: true },
      { id: "sec-planning", name: "Secretary - Planning and Operations", available: false },
    ] as Position[],
    "marketing-media": [
      { id: "president", name: "President", available: true },
    ] as Position[],
    "event-society": [
      { id: "president", name: "President", available: true },
    ] as Position[]
  },

  lockedMessages: [
    { title: "This society is currently unavailable.", fee: "Rs. 500", note: "Inflation is crazy." },
    { title: "This section hasn't been built yet.", fee: "Rs. 750", note: "Neither has your case for skipping the fee." },
    { title: "Access temporarily restricted.", fee: "Rs. 1,000", note: "Democracy isn't free. Apparently." },
    { title: "The budget for this society has been mysteriously reallocated.", fee: "Rs. 500", note: "Don't ask questions you aren't prepared to hear the answers to." },
  ],

  paidResponses: [
    { title: "Transaction declined.", sub: "The dev does not, in fact, have a JazzCash account set up for this. Yet." },
    { title: "Payment failed.", sub: "Your bank flagged this as “suspicious behavior.” Correctly." },
    { title: "Nice try.", sub: "This button has never once processed a real payment. It's just for the bit." },
  ],

  candidates: {
    nabil:  { name: "Nabil", discourage: false },
    sarib: { name: "Sarib", discourage: false },
    usaid: { name: "Usaid", discourage: false },
    fatima: { name: "Fatima", discourage: false },
    sabeen: { name: "Sabeen", discourage: false },
    rumaisa: { name: "Rumaisa", discourage: false },
    shafaq: { name: "Shafaq", discourage: false },
    anish: { name: "Anish", discourage: false },
    bakhtawar: { name: "Bakhtawar", discourage: false },
    zaki: { name: "Zaki", discourage: false },
    amna: { name: "Amna", discourage: false },
    ashba: { name: "Ashba", discourage: false },
    mohsin: { name: "Mohsin", discourage: false },
    candidate1: { name: "Candidate 1", discourage: true, discourageMsg: "Candidate 1's main campaign promise is a 5% increase in generic enthusiasm. Do you really want to settle for mediocrity?" },
    candidate2: { name: "Candidate 2", discourage: true, discourageMsg: "Candidate 2 once submitted a blank sheet of paper as a manifesto. Proceeding will lower the bar for everyone." }
  },

  wastedSequence: [
    { title: "You have made an interesting decision.", sub: "Vote successfully wasted." }
  ],

  celebrateLines: [
    "Muhammad Nabil now has one (1) more vote than he had thirty seconds ago. Historic.",
    "Somewhere, a microphone just got a little more nervous.",
    "This vote has been etched into the practice ballot forever. Or until you refresh the page."
  ],
};
