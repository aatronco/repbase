# Contextual workout guidance

The source of program data and load arithmetic remains unchanged. `js/workout-guidance.js` explains the prescription attached to each exercise; it does not produce or store training records.

Method checked against Cody Lefever's original [Jacked & Tan 2.0 article](https://swoleateveryheight.blogspot.com/2016/07/jacked-tan-20.html) and the extracted KGS cells in `source/jt-kgs-cells.json`:

- A daily RM reflects current rep ability, including fatigue, rather than a saved one-repetition PR. The source's effort guidance leaves 1–2 repetitions in reserve and avoids actual failure.
- The lifter works up to the specified rep target. The interface explains gradual, low-fatigue warm-up/approach sets without prescribing new warm-up weights, percentages, attempt limits or extra work sets.
- T1 weeks 1–5 use the original TM for backoffs. T1 weeks 7–11 use the same-day RM for backoffs. T2a remains TM-based. The additional Sling Shot T1 entry keeps its source MRS counts.
- An MRS prescription includes the first RM set followed by the specified number of additional max-rep sets at the same weight. Repetitions may drop as fatigue accumulates.
- The example numbers (TM 100 kg, main RM 80 kg, accessory RM 20 kg) are explicitly fictitious, never defaults or recommendations, and never written to a profile or log. The percentages, sets and repetitions come from the selected exercise; rounding uses the configured increment and the existing calculation functions.

Regression checks distinguish the week 1 squat example (100 kg TM × 70% = 70 kg, regardless of the illustrative 80 kg daily RM) from week 7 (80 kg daily RM × 85% = 68 kg, rounded to 67.5 kg at a 2.5 kg increment). Tests also cover T2a, lift-specific percentages, substitution labels, MRS counts, all 307 exercise explanations, and preservation of the complete profile/source data.

Button changes concern presentation and interaction: larger targets, explicit editing labels, clear session-completion hierarchy, focus restoration, retained open help after editing, and cancellation by button, Escape or backdrop. Cancelling must never call the record update callback. Invalid zero weights stay in the modal and can still be cancelled. Enter from the direct-input field confirms the value; Cancel remains an explicit non-submit action.

The author’s dedicated T2/T3 MRS section specifies 30–60 seconds between the first RM set and the following MRS, as well as between MRS. The UI distinguishes that specific instruction from ordinary T2a percentage work (2–3 minutes) and T1 work (3–5 minutes). The source compendium’s generic tier rest note is retained internally, but is not applied as a blanket rest rule to MRS. Direct comma-separated repetition edits synchronize both the visible per-set buttons and their next picker values without rerendering the page.
