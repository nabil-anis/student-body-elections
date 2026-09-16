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
    { id: "event-society", name: "Event Society", available: false },
    { id: "marketing-media", name: "Marketing and Media", available: false },
    { id: "character-building", name: "Character Building Society", available: false },
    { id: "public-speaking", name: "Public Speaking Society", available: true },
    { id: "arts-literature", name: "Arts and Literature Society", available: false },
  ] as Society[],

  positions: {
    "student-council": [
      { id: "president", name: "President", available: true },
      { id: "vp", name: "Vice President", available: false },
      { id: "gensec", name: "General Secretary", available: false },
    ] as Position[],
    "public-speaking": [
      { id: "president", name: "President", available: false },
      { id: "vp", name: "Vice President", available: true },
      { id: "gensec", name: "General Secretary", available: false },
      { id: "treasurer", name: "Treasurer", available: false },
      { id: "sec-planning", name: "Secretary - Planning and Operations", available: false },
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
    nawaz:  { name: "Nawaz", discourage: true, discourageMsg: "He recently tried to swipe left on a physical billboard. Reading his bio might actively lower your GPA. Proceed?" },
    waniza: { name: "Waniza", discourage: true, discourageMsg: "Her greatest achievement is managing to breathe without instructions. Do we really need to read her bio?" },
    sarib: { name: "Sarib", discourage: false },
    minhaj: { name: "Minhaj", discourage: true, discourageMsg: "He once got lost in a straight hallway. Are you sure you want him leading the student body?" },
    hamna: { name: "Hamna", discourage: true, discourageMsg: "Her campaign promises include 'more vibes' and 'less thinking'. Let's not encourage this. Proceed?" }
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
