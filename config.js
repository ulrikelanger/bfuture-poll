// ============================================================
//  EVENT SETTINGS - the only file you change for a new talk.
//  Each talk is one entry in EVENTS. The entry named in
//  DEFAULT_EVENT is what the plain link / QR code opens.
//  An older talk still works with ?e=<eventId>, e.g. ?e=bfuture26
//  New event? Add an entry, set DEFAULT_EVENT, and run the two
//  SQL lines from setup.sql for the new eventId once in Supabase.
//  Available icon names are listed at the top of icons.js.
// ============================================================

(function () {
  const SUPABASE_URL = "https://yvcrwgddivwjbohqbszv.supabase.co";
  // The anon key is public by design.
  const SUPABASE_ANON_KEY = "sb_publishable__ekTjoBPdCrSOy30ojSnrQ_6k41TdiN";

  const DEFAULT_EVENT = "kresspro26";

  // Interface text per language
  const STRINGS = {
    en: {
      in: "You're in.",
      keepOpen: "Keep this page open.<br>The next question appears here automatically.",
      drag: "Drag your dot to one side, or tap an answer.",
      yourVote: "Your vote:",
      sendFail: "Couldn't send - try again",
      live: "● live", connecting: "○ connecting…", reconnecting: "reconnecting…",
      joinHead: "Grab your phone.<br><em>Scan to vote.</em>",
      joinSub: "No app, no sign-up, no data collected.<br>Keep the page open during the talk.",
      phones: "phones connected",
      undecided: "UNDECIDED",
      waiting: "Waiting for the next question",
      pollOf: "live poll",
      votes: "votes",
      pinTitle: "Presenter PIN", pinStart: "Start", pinWrong: "PIN not accepted", connProblem: "Connection problem: "
    },
    de: {
      in: "Sie sind dabei.",
      keepOpen: "Lassen Sie diese Seite offen.<br>Die nächste Frage erscheint hier automatisch.",
      drag: "Ziehen Sie Ihren Punkt auf eine Seite – oder tippen Sie auf eine Antwort.",
      yourVote: "Ihre Stimme:",
      sendFail: "Nicht gesendet – bitte noch einmal versuchen",
      live: "● live", connecting: "○ verbinde…", reconnecting: "verbinde neu…",
      joinHead: "Handy raus.<br><em>Scannen und mitmachen.</em>",
      joinSub: "Keine App, keine Anmeldung, keine Daten.<br>Lassen Sie die Seite während des Vortrags offen.",
      phones: "Handys verbunden",
      undecided: "UNENTSCHIEDEN",
      waiting: "Gleich kommt die nächste Frage",
      pollOf: "Umfrage",
      votes: "Stimmen",
      pinTitle: "Presenter-PIN", pinStart: "Start", pinWrong: "PIN nicht akzeptiert", connProblem: "Verbindungsproblem: "
    }
  };

  // label = shown on phones; short = optional shorter version for the big-screen bar
  const EVENTS = {
    kresspro26: {
      eventTitle: "kress pro Innovation Day",
      speaker: "Ulrike Langer",
      lang: "de",
      questions: [
        {
          text: "Was kostet das KI-System einer Drei-Personen-Redaktion in Utah im Monat?",
          a: { label: "rund 250 Dollar", icon: "coins" },
          b: { label: "rund 5.000 Dollar", icon: "banknotes" }
        },
        {
          text: "Gleiche Story, gleicher Tag: Wer schneidet im Agenten-Test besser ab?",
          a: { label: "BBC", icon: "tv" },
          b: { label: "Guardian", icon: "newspaper" }
        },
        {
          text: "Wie viele Kunden hat Future für sein GEO-Angebot gewonnen?",
          a: { label: "mehr als 30", short: "30+", icon: "crowd" },
          b: { label: "eine Handvoll", icon: "hand" }
        }
      ]
    },

    bfuture26: {
      eventTitle: "#bfuture26",
      speaker: "Ulrike Langer",
      lang: "en",
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
    }
  };

  let id = DEFAULT_EVENT;
  try {
    const e = new URLSearchParams(location.search).get("e");
    if (e && EVENTS[e]) id = e;
  } catch (x) {}

  const ev = EVENTS[id];
  window.POLL_CONFIG = Object.assign({
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
    eventId: id,
    isDefault: id === DEFAULT_EVENT
  }, ev);

  const S = STRINGS[ev.lang] || STRINGS.en;
  window.T = function (key) { return S[key] != null ? S[key] : (STRINGS.en[key] || key); };

  // Fill every element marked data-t="key" once the page has loaded
  document.addEventListener("DOMContentLoaded", function () {
    document.documentElement.lang = ev.lang || "en";
    document.querySelectorAll("[data-t]").forEach(function (el) { el.innerHTML = window.T(el.getAttribute("data-t")); });
  });
})();
