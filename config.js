// ============================================================
//  EVENT SETTINGS - the only file you change for a new talk.
//  For Vienna: copy this file, change title + questions + icons.
//  Available icon names are listed at the top of icons.js.
// ============================================================

window.POLL_CONFIG = {
  // Supabase project (Project Settings > API). The anon key is public by design.
  supabaseUrl: "https://yvcrwgddivwjbohqbszv.supabase.co",
  supabaseAnonKey: "sb_publishable__ekTjoBPdCrSOy30ojSnrQ_6k41TdiN",

  // Must match the event_id used in setup.sql
  eventId: "bfuture26",

  eventTitle: "#bfuture26",
  speaker: "Ulrike Langer",

  // label = shown on phones; short = optional shorter version for the big-screen bar
  questions: [
    {
      text: "What's more Bonn?",
      a: { label: "Beethoven", icon: "beethoven" },
      b: { label: "Gummy bears", icon: "gummybear" }
    },
    {
      text: "Where do you work?",
      a: { label: "In a newsroom", icon: "newspaper" },
      b: { label: "Freelance, student or other", short: "Not in a newsroom", icon: "coffee" }
    },
    {
      text: "Your next editor-in-chief should come from…",
      a: { label: "Audience development", icon: "barchart" },
      b: { label: "The reporting ranks", icon: "notebook" }
    },
    {
      text: "In 2027 you can hire one of two people. Who?",
      a: { label: "A brilliant writer", icon: "pen" },
      b: { label: "Someone who builds and steers information systems", short: "A system builder", icon: "gear" }
    }
  ]
};
