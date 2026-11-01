export const source = {"sheet": "J&T2.0 KGS", "workbook": "Copy of Copy of GZCL Free Compendium November 27th Update", "url": "https://docs.google.com/spreadsheets/d/14ke22ZVdepbuSPrOI2ssNbxll9T8utr4co7OVv9W6oI/edit", "exportedAt": "2026-11-01", "sha256": "42bb849c75e1f0d64726a108cf8397ccd68d6e4a4e59aa6a29b0385775173234", "maxes": [{"cell": "E4", "label": "Sentadilla", "block": 1}, {"cell": "E5", "label": "Press banca", "block": 1}, {"cell": "E6", "label": "Peso muerto", "block": 1}, {"cell": "E7", "label": "Press militar", "block": 1}, {"cell": "O4", "label": "Press inclinado", "block": 1}, {"cell": "O5", "label": "Sentadilla frontal", "block": 1}, {"cell": "AI4", "label": "Sentadilla", "block": 2}, {"cell": "AI5", "label": "Press banca", "block": 2}, {"cell": "AI6", "label": "Peso muerto", "block": 2}, {"cell": "AI7", "label": "Press militar", "block": 2}, {"cell": "AS4", "label": "Press inclinado", "block": 2}, {"cell": "AS5", "label": "Sentadilla frontal", "block": 2}]};
export const workouts = [
  {
    "week": 1,
    "day": 1,
    "entries": [
      {
        "id": "D57",
        "tier": "1.0",
        "exercise": "Back Squat",
        "reps": null,
        "sets": null,
        "source": "D57",
        "weightSource": "E57",
        "kind": "rm",
        "rm": 10,
        "backoff": {
          "kind": "tm",
          "maxCell": "E4",
          "percent": 0.7,
          "reps": 6.0,
          "sets": "3+",
          "formula": "=MROUND($E$4*E15,2.5)",
          "source": "E58"
        }
      },
      {
        "id": "D60",
        "tier": "2a",
        "exercise": "2\" Deficit Deadlift",
        "reps": 10.0,
        "sets": 4.0,
        "source": "D60",
        "weightSource": "E60",
        "kind": "tm",
        "maxCell": "E6",
        "percent": 0.5,
        "formula": "=MROUND($E$6*E37,2.5)"
      },
      {
        "id": "D61",
        "tier": "2b",
        "exercise": "Single Leg Press",
        "reps": 15.0,
        "sets": "3MRS",
        "source": "D61",
        "weightSource": "E61",
        "kind": "mrs",
        "rm": 15
      },
      {
        "id": "D62",
        "tier": "2c",
        "exercise": "Chest Supported Row",
        "reps": 15.0,
        "sets": "3MRS",
        "source": "D62",
        "weightSource": "E62",
        "kind": "mrs",
        "rm": 15
      },
      {
        "id": "D63",
        "tier": "3a",
        "exercise": "V Grip Cable Row",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D63",
        "weightSource": "E63",
        "kind": "mrs",
        "rm": 20
      },
      {
        "id": "D64",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D64",
        "weightSource": "E64",
        "kind": "mrs",
        "rm": 20
      },
      {
        "id": "D65",
        "tier": "3c",
        "exercise": "Leg Extension",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D65",
        "weightSource": "E65",
        "kind": "mrs",
        "rm": 20
      },
      {
        "id": "D66",
        "tier": "3d",
        "exercise": "DB Hammer Curl",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D66",
        "weightSource": "E66",
        "kind": "mrs",
        "rm": 20
      }
    ],
    "notes": []
  },
  {
    "week": 1,
    "day": 2,
    "entries": [
      {
        "id": "D69",
        "tier": "1.0",
        "exercise": "Bench Press",
        "reps": null,
        "sets": null,
        "source": "D69",
        "weightSource": "E69",
        "kind": "rm",
        "rm": 10,
        "backoff": {
          "kind": "tm",
          "maxCell": "E5",
          "percent": 0.65,
          "reps": 6.0,
          "sets": "3+",
          "formula": "=MROUND($E$5*E18,2.5)",
          "source": "E70"
        }
      },
      {
        "id": "D72",
        "tier": "2a",
        "exercise": "Close Grip bench",
        "reps": 10.0,
        "sets": 4.0,
        "source": "D72",
        "weightSource": "E72",
        "kind": "tm",
        "maxCell": "E5",
        "percent": 0.5,
        "formula": "=MROUND($E$5*E39,2.5)"
      },
      {
        "id": "D73",
        "tier": "2b",
        "exercise": "Incline Bench",
        "reps": 15.0,
        "sets": "3MRS",
        "source": "D73",
        "weightSource": "E73",
        "kind": "mrs",
        "rm": 15
      },
      {
        "id": "D74",
        "tier": "2c",
        "exercise": "DB Shoulder Press",
        "reps": 15.0,
        "sets": "3MRS",
        "source": "D74",
        "weightSource": "E74",
        "kind": "mrs",
        "rm": 15
      },
      {
        "id": "D75",
        "tier": "3a",
        "exercise": "Machine Lateral Raise",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D75",
        "weightSource": "E75",
        "kind": "mrs",
        "rm": 20
      },
      {
        "id": "D76",
        "tier": "3b",
        "exercise": "Rear Delt Fly",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D76",
        "weightSource": "E76",
        "kind": "mrs",
        "rm": 20
      },
      {
        "id": "D77",
        "tier": "3c",
        "exercise": "Pec Flye",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D77",
        "weightSource": "E77",
        "kind": "mrs",
        "rm": 20
      },
      {
        "id": "D78",
        "tier": "3d",
        "exercise": "Cable Tricep Push Down",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D78",
        "weightSource": "E78",
        "kind": "mrs",
        "rm": 20
      }
    ],
    "notes": []
  },
  {
    "week": 1,
    "day": 3,
    "entries": [
      {
        "id": "D81",
        "tier": "1.0",
        "exercise": "Front Squat",
        "reps": null,
        "sets": null,
        "source": "D81",
        "weightSource": "E81",
        "kind": "rm",
        "rm": 10,
        "backoff": {
          "kind": "tm",
          "maxCell": "O5",
          "percent": 0.7,
          "reps": 6.0,
          "sets": "3+",
          "formula": "=MROUND($O$5*E21,2.5)",
          "source": "E82"
        }
      },
      {
        "id": "D84",
        "tier": "2a",
        "exercise": "Back Squat",
        "reps": 10.0,
        "sets": 4.0,
        "source": "D84",
        "weightSource": "E84",
        "kind": "tm",
        "maxCell": "E4",
        "percent": 0.5,
        "formula": "=MROUND($E$4*E41,2.5)"
      },
      {
        "id": "D85",
        "tier": "2b",
        "exercise": "Back Step Lunge",
        "reps": 15.0,
        "sets": "3MRS",
        "source": "D85",
        "weightSource": "E85",
        "kind": "mrs",
        "rm": 15
      },
      {
        "id": "D86",
        "tier": "2c",
        "exercise": "V Grip Lat Pull Down",
        "reps": 15.0,
        "sets": "3MRS",
        "source": "D86",
        "weightSource": "E86",
        "kind": "mrs",
        "rm": 15
      },
      {
        "id": "D87",
        "tier": "3a",
        "exercise": "Leg Extension",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D87",
        "weightSource": "E87",
        "kind": "mrs",
        "rm": 20
      },
      {
        "id": "D88",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D88",
        "weightSource": "E88",
        "kind": "mrs",
        "rm": 20
      },
      {
        "id": "D89",
        "tier": "3c",
        "exercise": "Wide Grip Lat Pull Down",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D89",
        "weightSource": "E89",
        "kind": "mrs",
        "rm": 20
      },
      {
        "id": "D90",
        "tier": "3d",
        "exercise": "EZ Bar Curl",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D90",
        "weightSource": "E90",
        "kind": "mrs",
        "rm": 20
      }
    ],
    "notes": []
  },
  {
    "week": 1,
    "day": 4,
    "entries": [
      {
        "id": "D93",
        "tier": "1.0",
        "exercise": "Military Press",
        "reps": null,
        "sets": null,
        "source": "D93",
        "weightSource": "E93",
        "kind": "rm",
        "rm": 10,
        "backoff": {
          "kind": "tm",
          "maxCell": "E7",
          "percent": 0.6,
          "reps": 6.0,
          "sets": "3+",
          "formula": "=MROUND($E$7*E24,2.5)",
          "source": "E94"
        }
      },
      {
        "id": "D96",
        "tier": "1.0",
        "exercise": "Sling Shot Bench",
        "reps": null,
        "sets": "4MRS",
        "source": "D96",
        "weightSource": "E96",
        "kind": "rm",
        "rm": 10
      },
      {
        "id": "D99",
        "tier": "2a",
        "exercise": "Legs Up Bench",
        "reps": 10.0,
        "sets": 4.0,
        "source": "D99",
        "weightSource": "E99",
        "kind": "tm",
        "maxCell": "E5",
        "percent": 0.45,
        "formula": "=MROUND($E$5*E43,2.5)"
      },
      {
        "id": "D100",
        "tier": "2b",
        "exercise": "Push Press",
        "reps": 15.0,
        "sets": "3MRS",
        "source": "D100",
        "weightSource": "E100",
        "kind": "mrs",
        "rm": 15
      },
      {
        "id": "D101",
        "tier": "3a",
        "exercise": "Cable OH Tricep Ext.",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D101",
        "weightSource": "E101",
        "kind": "mrs",
        "rm": 20
      },
      {
        "id": "D102",
        "tier": "3b",
        "exercise": "Machine Lateral Raise",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D102",
        "weightSource": "E102",
        "kind": "mrs",
        "rm": 20
      },
      {
        "id": "D103",
        "tier": "3c",
        "exercise": "Rear Delt Fly",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D103",
        "weightSource": "E103",
        "kind": "mrs",
        "rm": 20
      },
      {
        "id": "D104",
        "tier": "3d",
        "exercise": "Pec Flye",
        "reps": 20.0,
        "sets": "3MRS",
        "source": "D104",
        "weightSource": "E104",
        "kind": "mrs",
        "rm": 20
      }
    ],
    "notes": []
  },
  {
    "week": 2,
    "day": 1,
    "entries": [
      {
        "id": "I57",
        "tier": "1.0",
        "exercise": "Back Squat",
        "reps": null,
        "sets": null,
        "source": "I57",
        "weightSource": "J57",
        "kind": "rm",
        "rm": 8,
        "backoff": {
          "kind": "tm",
          "maxCell": "E4",
          "percent": 0.75,
          "reps": 5.0,
          "sets": "3+",
          "formula": "=MROUND($E$4*J15,2.5)",
          "source": "J58"
        }
      },
      {
        "id": "I60",
        "tier": "2a",
        "exercise": "2\" Deficit Deadlift",
        "reps": 8.0,
        "sets": 4.0,
        "source": "I60",
        "weightSource": "J60",
        "kind": "tm",
        "maxCell": "E6",
        "percent": 0.6,
        "formula": "=MROUND($E$6*J37,2.5)"
      },
      {
        "id": "I61",
        "tier": "2b",
        "exercise": "Single Leg Press",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "I61",
        "weightSource": "J61",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "I62",
        "tier": "2c",
        "exercise": "Chest Supported Row",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "I62",
        "weightSource": "J62",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "I63",
        "tier": "3a",
        "exercise": "V Grip Cable Row",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I63",
        "weightSource": "J63",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "I64",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I64",
        "weightSource": "J64",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "I65",
        "tier": "3c",
        "exercise": "Leg Extension",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I65",
        "weightSource": "J65",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "I66",
        "tier": "3d",
        "exercise": "DB Hammer Curl",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I66",
        "weightSource": "J66",
        "kind": "mrs",
        "rm": 18
      }
    ],
    "notes": []
  },
  {
    "week": 2,
    "day": 2,
    "entries": [
      {
        "id": "I69",
        "tier": "1.0",
        "exercise": "Bench Press",
        "reps": null,
        "sets": null,
        "source": "I69",
        "weightSource": "J69",
        "kind": "rm",
        "rm": 8,
        "backoff": {
          "kind": "tm",
          "maxCell": "E5",
          "percent": 0.7,
          "reps": 5.0,
          "sets": "3+",
          "formula": "=MROUND($E$5*J18,2.5)",
          "source": "J70"
        }
      },
      {
        "id": "I72",
        "tier": "2a",
        "exercise": "Close Grip bench",
        "reps": 8.0,
        "sets": 4.0,
        "source": "I72",
        "weightSource": "J72",
        "kind": "tm",
        "maxCell": "E5",
        "percent": 0.55,
        "formula": "=MROUND($E$5*J39,2.5)"
      },
      {
        "id": "I73",
        "tier": "2b",
        "exercise": "Incline Bench",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "I73",
        "weightSource": "J73",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "I74",
        "tier": "2c",
        "exercise": "DB Shoulder Press",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "I74",
        "weightSource": "J74",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "I75",
        "tier": "3a",
        "exercise": "Machine Lateral Raise",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I75",
        "weightSource": "J75",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "I76",
        "tier": "3b",
        "exercise": "Rear Delt Fly",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I76",
        "weightSource": "J76",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "I77",
        "tier": "3c",
        "exercise": "Pec Flye",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I77",
        "weightSource": "J77",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "I78",
        "tier": "3d",
        "exercise": "Cable Tricep Push Down",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I78",
        "weightSource": "J78",
        "kind": "mrs",
        "rm": 18
      }
    ],
    "notes": []
  },
  {
    "week": 2,
    "day": 3,
    "entries": [
      {
        "id": "I81",
        "tier": "1.0",
        "exercise": "Front Squat",
        "reps": null,
        "sets": null,
        "source": "I81",
        "weightSource": "J81",
        "kind": "rm",
        "rm": 8,
        "backoff": {
          "kind": "tm",
          "maxCell": "O5",
          "percent": 0.75,
          "reps": 5.0,
          "sets": "3+",
          "formula": "=MROUND($O$5*J21,2.5)",
          "source": "J82"
        }
      },
      {
        "id": "I84",
        "tier": "2a",
        "exercise": "Back Squat",
        "reps": 8.0,
        "sets": 4.0,
        "source": "I84",
        "weightSource": "J84",
        "kind": "tm",
        "maxCell": "E4",
        "percent": 0.6,
        "formula": "=MROUND($E$4*J41,2.5)"
      },
      {
        "id": "I85",
        "tier": "2b",
        "exercise": "Back Step Lunge",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "I85",
        "weightSource": "J85",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "I86",
        "tier": "2c",
        "exercise": "V Grip Lat Pull Down",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "I86",
        "weightSource": "J86",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "I87",
        "tier": "3a",
        "exercise": "Leg Extension",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I87",
        "weightSource": "J87",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "I88",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I88",
        "weightSource": "J88",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "I89",
        "tier": "3c",
        "exercise": "Wide Grip Lat Pull Down",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I89",
        "weightSource": "J89",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "I90",
        "tier": "3d",
        "exercise": "EZ Bar Curl",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I90",
        "weightSource": "J90",
        "kind": "mrs",
        "rm": 18
      }
    ],
    "notes": []
  },
  {
    "week": 2,
    "day": 4,
    "entries": [
      {
        "id": "I93",
        "tier": "1.0",
        "exercise": "Military Press",
        "reps": null,
        "sets": null,
        "source": "I93",
        "weightSource": "J93",
        "kind": "rm",
        "rm": 8,
        "backoff": {
          "kind": "tm",
          "maxCell": "E7",
          "percent": 0.65,
          "reps": 5.0,
          "sets": "3+",
          "formula": "=MROUND($E$7*J24,2.5)",
          "source": "J94"
        }
      },
      {
        "id": "I96",
        "tier": "1.0",
        "exercise": "Sling Shot Bench",
        "reps": null,
        "sets": "4MRS",
        "source": "I96",
        "weightSource": "J96",
        "kind": "rm",
        "rm": 8
      },
      {
        "id": "I99",
        "tier": "2a",
        "exercise": "Legs Up Bench",
        "reps": 10.0,
        "sets": 4.0,
        "source": "I99",
        "weightSource": "J99",
        "kind": "tm",
        "maxCell": "E5",
        "percent": 0.5,
        "formula": "=MROUND($E$5*J43,2.5)"
      },
      {
        "id": "I100",
        "tier": "2b",
        "exercise": "Push Press",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "I100",
        "weightSource": "J100",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "I101",
        "tier": "3a",
        "exercise": "Cable OH Tricep Ext.",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I101",
        "weightSource": "J101",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "I102",
        "tier": "3b",
        "exercise": "Machine Lateral Raise",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I102",
        "weightSource": "J102",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "I103",
        "tier": "3c",
        "exercise": "Rear Delt Fly",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I103",
        "weightSource": "J103",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "I104",
        "tier": "3d",
        "exercise": "Pec Flye",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "I104",
        "weightSource": "J104",
        "kind": "mrs",
        "rm": 18
      }
    ],
    "notes": []
  },
  {
    "week": 3,
    "day": 1,
    "entries": [
      {
        "id": "N57",
        "tier": "1.0",
        "exercise": "Back Squat",
        "reps": null,
        "sets": null,
        "source": "N57",
        "weightSource": "O57",
        "kind": "rm",
        "rm": 6,
        "backoff": {
          "kind": "tm",
          "maxCell": "E4",
          "percent": 0.8,
          "reps": 4.0,
          "sets": "3+",
          "formula": "=MROUND($E$4*O15,2.5)",
          "source": "O58"
        }
      },
      {
        "id": "N60",
        "tier": "2a",
        "exercise": "2\" Deficit Deadlift",
        "reps": 6.0,
        "sets": 4.0,
        "source": "N60",
        "weightSource": "O60",
        "kind": "tm",
        "maxCell": "E6",
        "percent": 0.7,
        "formula": "=MROUND($E$6*O37,2.5)"
      },
      {
        "id": "N61",
        "tier": "2b",
        "exercise": "Single Leg Press",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "N61",
        "weightSource": "O61",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "N62",
        "tier": "2c",
        "exercise": "Chest Supported Row",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "N62",
        "weightSource": "O62",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "N63",
        "tier": "3a",
        "exercise": "V Grip Cable Row",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N63",
        "weightSource": "O63",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "N64",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N64",
        "weightSource": "O64",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "N65",
        "tier": "3c",
        "exercise": "Leg Extension",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N65",
        "weightSource": "O65",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "N66",
        "tier": "3d",
        "exercise": "DB Hammer Curl",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N66",
        "weightSource": "O66",
        "kind": "mrs",
        "rm": 16
      }
    ],
    "notes": []
  },
  {
    "week": 3,
    "day": 2,
    "entries": [
      {
        "id": "N69",
        "tier": "1.0",
        "exercise": "Bench Press",
        "reps": null,
        "sets": null,
        "source": "N69",
        "weightSource": "O69",
        "kind": "rm",
        "rm": 6,
        "backoff": {
          "kind": "tm",
          "maxCell": "E5",
          "percent": 0.75,
          "reps": 4.0,
          "sets": "3+",
          "formula": "=MROUND($E$5*O18,2.5)",
          "source": "O70"
        }
      },
      {
        "id": "N72",
        "tier": "2a",
        "exercise": "Close Grip bench",
        "reps": 6.0,
        "sets": 4.0,
        "source": "N72",
        "weightSource": "O72",
        "kind": "tm",
        "maxCell": "E5",
        "percent": 0.6,
        "formula": "=MROUND($E$5*O39,2.5)"
      },
      {
        "id": "N73",
        "tier": "2b",
        "exercise": "Incline Bench",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "N73",
        "weightSource": "O73",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "N74",
        "tier": "2c",
        "exercise": "DB Shoulder Press",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "N74",
        "weightSource": "O74",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "N75",
        "tier": "3a",
        "exercise": "Machine Lateral Raise",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N75",
        "weightSource": "O75",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "N76",
        "tier": "3b",
        "exercise": "Rear Delt Fly",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N76",
        "weightSource": "O76",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "N77",
        "tier": "3c",
        "exercise": "Pec Flye",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N77",
        "weightSource": "O77",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "N78",
        "tier": "3d",
        "exercise": "Cable Tricep Push Down",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N78",
        "weightSource": "O78",
        "kind": "mrs",
        "rm": 16
      }
    ],
    "notes": []
  },
  {
    "week": 3,
    "day": 3,
    "entries": [
      {
        "id": "N81",
        "tier": "1.0",
        "exercise": "Front Squat",
        "reps": null,
        "sets": null,
        "source": "N81",
        "weightSource": "O81",
        "kind": "rm",
        "rm": 6,
        "backoff": {
          "kind": "tm",
          "maxCell": "O5",
          "percent": 0.8,
          "reps": 4.0,
          "sets": "3+",
          "formula": "=MROUND($O$5*O21,2.5)",
          "source": "O82"
        }
      },
      {
        "id": "N84",
        "tier": "2a",
        "exercise": "Back Squat",
        "reps": 6.0,
        "sets": 4.0,
        "source": "N84",
        "weightSource": "O84",
        "kind": "tm",
        "maxCell": "E4",
        "percent": 0.7,
        "formula": "=MROUND($E$4*O41,2.5)"
      },
      {
        "id": "N85",
        "tier": "2b",
        "exercise": "Back Step Lunge",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "N85",
        "weightSource": "O85",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "N86",
        "tier": "2c",
        "exercise": "V Grip Lat Pull Down",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "N86",
        "weightSource": "O86",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "N87",
        "tier": "3a",
        "exercise": "Leg Extension",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N87",
        "weightSource": "O87",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "N88",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N88",
        "weightSource": "O88",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "N89",
        "tier": "3c",
        "exercise": "Wide Grip Lat Pull Down",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N89",
        "weightSource": "O89",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "N90",
        "tier": "3d",
        "exercise": "EZ Bar Curl",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N90",
        "weightSource": "O90",
        "kind": "mrs",
        "rm": 16
      }
    ],
    "notes": []
  },
  {
    "week": 3,
    "day": 4,
    "entries": [
      {
        "id": "N93",
        "tier": "1.0",
        "exercise": "Military Press",
        "reps": null,
        "sets": null,
        "source": "N93",
        "weightSource": "O93",
        "kind": "rm",
        "rm": 6,
        "backoff": {
          "kind": "tm",
          "maxCell": "E7",
          "percent": 0.7,
          "reps": 4.0,
          "sets": "3+",
          "formula": "=MROUND($E$7*O24,2.5)",
          "source": "O94"
        }
      },
      {
        "id": "N96",
        "tier": "1.0",
        "exercise": "Sling Shot Bench",
        "reps": null,
        "sets": "4MRS",
        "source": "N96",
        "weightSource": "O96",
        "kind": "rm",
        "rm": 6
      },
      {
        "id": "N99",
        "tier": "2a",
        "exercise": "Legs Up Bench",
        "reps": 10.0,
        "sets": 4.0,
        "source": "N99",
        "weightSource": "O99",
        "kind": "tm",
        "maxCell": "E5",
        "percent": 0.55,
        "formula": "=MROUND($E$5*O43,2.5)"
      },
      {
        "id": "N100",
        "tier": "2b",
        "exercise": "Push Press",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "N100",
        "weightSource": "O100",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "N101",
        "tier": "3a",
        "exercise": "Cable OH Tricep Ext.",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N101",
        "weightSource": "O101",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "N102",
        "tier": "3b",
        "exercise": "Machine Lateral Raise",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N102",
        "weightSource": "O102",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "N103",
        "tier": "3c",
        "exercise": "Rear Delt Fly",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N103",
        "weightSource": "O103",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "N104",
        "tier": "3d",
        "exercise": "Pec Flye",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "N104",
        "weightSource": "O104",
        "kind": "mrs",
        "rm": 16
      }
    ],
    "notes": []
  },
  {
    "week": 4,
    "day": 1,
    "entries": [
      {
        "id": "S57",
        "tier": "1.0",
        "exercise": "Back Squat",
        "reps": null,
        "sets": null,
        "source": "S57",
        "weightSource": "T57",
        "kind": "rm",
        "rm": 4,
        "backoff": {
          "kind": "tm",
          "maxCell": "E4",
          "percent": 0.825,
          "reps": 3.0,
          "sets": "3+",
          "formula": "=MROUND($E$4*T15,2.5)",
          "source": "T58"
        }
      },
      {
        "id": "S60",
        "tier": "2a",
        "exercise": "2\" Deficit Deadlift",
        "reps": 4.0,
        "sets": 5.0,
        "source": "S60",
        "weightSource": "T60",
        "kind": "tm",
        "maxCell": "E6",
        "percent": 0.75,
        "formula": "=MROUND($E$6*T37,2.5)"
      },
      {
        "id": "S61",
        "tier": "2b",
        "exercise": "Single Leg Press",
        "reps": 8.0,
        "sets": "3MRS",
        "source": "S61",
        "weightSource": "T61",
        "kind": "mrs",
        "rm": 8
      },
      {
        "id": "S62",
        "tier": "2c",
        "exercise": "Chest Supported Row",
        "reps": 8.0,
        "sets": "3MRS",
        "source": "S62",
        "weightSource": "T62",
        "kind": "mrs",
        "rm": 8
      },
      {
        "id": "S63",
        "tier": "3a",
        "exercise": "V Grip Cable Row",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S63",
        "weightSource": "T63",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "S64",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S64",
        "weightSource": "T64",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "S65",
        "tier": "3c",
        "exercise": "Leg Extension",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S65",
        "weightSource": "T65",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "S66",
        "tier": "3d",
        "exercise": "DB Hammer Curl",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S66",
        "weightSource": "T66",
        "kind": "mrs",
        "rm": 14
      }
    ],
    "notes": []
  },
  {
    "week": 4,
    "day": 2,
    "entries": [
      {
        "id": "S69",
        "tier": "1.0",
        "exercise": "Bench Press",
        "reps": null,
        "sets": null,
        "source": "S69",
        "weightSource": "T69",
        "kind": "rm",
        "rm": 4,
        "backoff": {
          "kind": "tm",
          "maxCell": "E5",
          "percent": 0.775,
          "reps": 3.0,
          "sets": "3+",
          "formula": "=MROUND($E$5*T18,2.5)",
          "source": "T70"
        }
      },
      {
        "id": "S72",
        "tier": "2a",
        "exercise": "Close Grip bench",
        "reps": 4.0,
        "sets": 5.0,
        "source": "S72",
        "weightSource": "T72",
        "kind": "tm",
        "maxCell": "E5",
        "percent": 0.625,
        "formula": "=MROUND($E$5*T39,2.5)"
      },
      {
        "id": "S73",
        "tier": "2b",
        "exercise": "Incline Bench",
        "reps": 8.0,
        "sets": "3MRS",
        "source": "S73",
        "weightSource": "T73",
        "kind": "mrs",
        "rm": 8
      },
      {
        "id": "S74",
        "tier": "2c",
        "exercise": "DB Shoulder Press",
        "reps": 8.0,
        "sets": "3MRS",
        "source": "S74",
        "weightSource": "T74",
        "kind": "mrs",
        "rm": 8
      },
      {
        "id": "S75",
        "tier": "3a",
        "exercise": "Machine Lateral Raise",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S75",
        "weightSource": "T75",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "S76",
        "tier": "3b",
        "exercise": "Rear Delt Fly",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S76",
        "weightSource": "T76",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "S77",
        "tier": "3c",
        "exercise": "Pec Flye",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S77",
        "weightSource": "T77",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "S78",
        "tier": "3d",
        "exercise": "Cable Tricep Push Down",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S78",
        "weightSource": "T78",
        "kind": "mrs",
        "rm": 14
      }
    ],
    "notes": []
  },
  {
    "week": 4,
    "day": 3,
    "entries": [
      {
        "id": "S81",
        "tier": "1.0",
        "exercise": "Front Squat",
        "reps": null,
        "sets": null,
        "source": "S81",
        "weightSource": "T81",
        "kind": "rm",
        "rm": 4,
        "backoff": {
          "kind": "tm",
          "maxCell": "O5",
          "percent": 0.825,
          "reps": 3.0,
          "sets": "3+",
          "formula": "=MROUND($O$5*T21,2.5)",
          "source": "T82"
        }
      },
      {
        "id": "S84",
        "tier": "2a",
        "exercise": "Back Squat",
        "reps": 4.0,
        "sets": 5.0,
        "source": "S84",
        "weightSource": "T84",
        "kind": "tm",
        "maxCell": "E4",
        "percent": 0.75,
        "formula": "=MROUND($E$4*T41,2.5)"
      },
      {
        "id": "S85",
        "tier": "2b",
        "exercise": "Back Step Lunge",
        "reps": 8.0,
        "sets": "3MRS",
        "source": "S85",
        "weightSource": "T85",
        "kind": "mrs",
        "rm": 8
      },
      {
        "id": "S86",
        "tier": "2c",
        "exercise": "V Grip Lat Pull Down",
        "reps": 8.0,
        "sets": "3MRS",
        "source": "S86",
        "weightSource": "T86",
        "kind": "mrs",
        "rm": 8
      },
      {
        "id": "S87",
        "tier": "3a",
        "exercise": "Leg Extension",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S87",
        "weightSource": "T87",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "S88",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S88",
        "weightSource": "T88",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "S89",
        "tier": "3c",
        "exercise": "Wide Grip Lat Pull Down",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S89",
        "weightSource": "T89",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "S90",
        "tier": "3d",
        "exercise": "EZ Bar Curl",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S90",
        "weightSource": "T90",
        "kind": "mrs",
        "rm": 14
      }
    ],
    "notes": []
  },
  {
    "week": 4,
    "day": 4,
    "entries": [
      {
        "id": "S93",
        "tier": "1.0",
        "exercise": "Military Press",
        "reps": null,
        "sets": null,
        "source": "S93",
        "weightSource": "T93",
        "kind": "rm",
        "rm": 4,
        "backoff": {
          "kind": "tm",
          "maxCell": "E7",
          "percent": 0.775,
          "reps": 3.0,
          "sets": "3+",
          "formula": "=MROUND($E$7*T24,2.5)",
          "source": "T94"
        }
      },
      {
        "id": "S96",
        "tier": "1.0",
        "exercise": "Sling Shot Bench",
        "reps": null,
        "sets": "4MRS",
        "source": "S96",
        "weightSource": "T96",
        "kind": "rm",
        "rm": 4
      },
      {
        "id": "S99",
        "tier": "2a",
        "exercise": "Legs Up Bench",
        "reps": 10.0,
        "sets": 4.0,
        "source": "S99",
        "weightSource": "T99",
        "kind": "tm",
        "maxCell": "E5",
        "percent": 0.575,
        "formula": "=MROUND($E$5*T43,2.5)"
      },
      {
        "id": "S100",
        "tier": "2b",
        "exercise": "Push Press",
        "reps": 8.0,
        "sets": "3MRS",
        "source": "S100",
        "weightSource": "T100",
        "kind": "mrs",
        "rm": 8
      },
      {
        "id": "S101",
        "tier": "3a",
        "exercise": "Cable OH Tricep Ext.",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S101",
        "weightSource": "T101",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "S102",
        "tier": "3b",
        "exercise": "Machine Lateral Raise",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S102",
        "weightSource": "T102",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "S103",
        "tier": "3c",
        "exercise": "Rear Delt Fly",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S103",
        "weightSource": "T103",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "S104",
        "tier": "3d",
        "exercise": "Pec Flye",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "S104",
        "weightSource": "T104",
        "kind": "mrs",
        "rm": 14
      }
    ],
    "notes": []
  },
  {
    "week": 5,
    "day": 1,
    "entries": [
      {
        "id": "X57",
        "tier": "1.0",
        "exercise": "Back Squat",
        "reps": null,
        "sets": null,
        "source": "X57",
        "weightSource": "Y57",
        "kind": "rm",
        "rm": 2,
        "backoff": {
          "kind": "tm",
          "maxCell": "E4",
          "percent": 0.85,
          "reps": 2.0,
          "sets": "4+",
          "formula": "=MROUND($E$4*Y15,2.5)",
          "source": "Y58"
        }
      },
      {
        "id": "X60",
        "tier": "2a",
        "exercise": "2\" Deficit Deadlift",
        "reps": 2.0,
        "sets": 7.0,
        "source": "X60",
        "weightSource": "Y60",
        "kind": "tm",
        "maxCell": "E6",
        "percent": 0.8,
        "formula": "=MROUND($E$6*Y37,2.5)"
      },
      {
        "id": "X61",
        "tier": "2b",
        "exercise": "Single Leg Press",
        "reps": 6.0,
        "sets": "3MRS",
        "source": "X61",
        "weightSource": "Y61",
        "kind": "mrs",
        "rm": 6
      },
      {
        "id": "X62",
        "tier": "2c",
        "exercise": "Chest Supported Row",
        "reps": 6.0,
        "sets": "3MRS",
        "source": "X62",
        "weightSource": "Y62",
        "kind": "mrs",
        "rm": 6
      },
      {
        "id": "X63",
        "tier": "3a",
        "exercise": "V Grip Cable Row",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X63",
        "weightSource": "Y63",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "X64",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X64",
        "weightSource": "Y64",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "X65",
        "tier": "3c",
        "exercise": "Leg Extension",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X65",
        "weightSource": "Y65",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "X66",
        "tier": "3d",
        "exercise": "DB Hammer Curl",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X66",
        "weightSource": "Y66",
        "kind": "mrs",
        "rm": 12
      }
    ],
    "notes": []
  },
  {
    "week": 5,
    "day": 2,
    "entries": [
      {
        "id": "X69",
        "tier": "1.0",
        "exercise": "Bench Press",
        "reps": null,
        "sets": null,
        "source": "X69",
        "weightSource": "Y69",
        "kind": "rm",
        "rm": 2,
        "backoff": {
          "kind": "tm",
          "maxCell": "E5",
          "percent": 0.8,
          "reps": 2.0,
          "sets": "4+",
          "formula": "=MROUND($E$5*Y18,2.5)",
          "source": "Y70"
        }
      },
      {
        "id": "X72",
        "tier": "2a",
        "exercise": "Close Grip bench",
        "reps": 2.0,
        "sets": 7.0,
        "source": "X72",
        "weightSource": "Y72",
        "kind": "tm",
        "maxCell": "E5",
        "percent": 0.65,
        "formula": "=MROUND($E$5*Y39,2.5)"
      },
      {
        "id": "X73",
        "tier": "2b",
        "exercise": "Incline Bench",
        "reps": 6.0,
        "sets": "3MRS",
        "source": "X73",
        "weightSource": "Y73",
        "kind": "mrs",
        "rm": 6
      },
      {
        "id": "X74",
        "tier": "2c",
        "exercise": "DB Shoulder Press",
        "reps": 6.0,
        "sets": "3MRS",
        "source": "X74",
        "weightSource": "Y74",
        "kind": "mrs",
        "rm": 6
      },
      {
        "id": "X75",
        "tier": "3a",
        "exercise": "Machine Lateral Raise",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X75",
        "weightSource": "Y75",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "X76",
        "tier": "3b",
        "exercise": "Rear Delt Fly",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X76",
        "weightSource": "Y76",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "X77",
        "tier": "3c",
        "exercise": "Pec Flye",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X77",
        "weightSource": "Y77",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "X78",
        "tier": "3d",
        "exercise": "Cable Tricep Push Down",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X78",
        "weightSource": "Y78",
        "kind": "mrs",
        "rm": 12
      }
    ],
    "notes": []
  },
  {
    "week": 5,
    "day": 3,
    "entries": [
      {
        "id": "X81",
        "tier": "1.0",
        "exercise": "Front Squat",
        "reps": null,
        "sets": null,
        "source": "X81",
        "weightSource": "Y81",
        "kind": "rm",
        "rm": 2,
        "backoff": {
          "kind": "tm",
          "maxCell": "O5",
          "percent": 0.85,
          "reps": 2.0,
          "sets": "4+",
          "formula": "=MROUND($O$5*Y21,2.5)",
          "source": "Y82"
        }
      },
      {
        "id": "X84",
        "tier": "2a",
        "exercise": "Back Squat",
        "reps": 2.0,
        "sets": 7.0,
        "source": "X84",
        "weightSource": "Y84",
        "kind": "tm",
        "maxCell": "E4",
        "percent": 0.8,
        "formula": "=MROUND($E$4*Y41,2.5)"
      },
      {
        "id": "X85",
        "tier": "2b",
        "exercise": "Back Step Lunge",
        "reps": 6.0,
        "sets": "3MRS",
        "source": "X85",
        "weightSource": "Y85",
        "kind": "mrs",
        "rm": 6
      },
      {
        "id": "X86",
        "tier": "2c",
        "exercise": "V Grip Lat Pull Down",
        "reps": 6.0,
        "sets": "3MRS",
        "source": "X86",
        "weightSource": "Y86",
        "kind": "mrs",
        "rm": 6
      },
      {
        "id": "X87",
        "tier": "3a",
        "exercise": "Leg Extension",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X87",
        "weightSource": "Y87",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "X88",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X88",
        "weightSource": "Y88",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "X89",
        "tier": "3c",
        "exercise": "Wide Grip Lat Pull Down",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X89",
        "weightSource": "Y89",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "X90",
        "tier": "3d",
        "exercise": "EZ Bar Curl",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X90",
        "weightSource": "Y90",
        "kind": "mrs",
        "rm": 12
      }
    ],
    "notes": []
  },
  {
    "week": 5,
    "day": 4,
    "entries": [
      {
        "id": "X93",
        "tier": "1.0",
        "exercise": "Military Press",
        "reps": null,
        "sets": null,
        "source": "X93",
        "weightSource": "Y93",
        "kind": "rm",
        "rm": 2,
        "backoff": {
          "kind": "tm",
          "maxCell": "E7",
          "percent": 0.8,
          "reps": 2.0,
          "sets": "4+",
          "formula": "=MROUND($E$7*Y24,2.5)",
          "source": "Y94"
        }
      },
      {
        "id": "X96",
        "tier": "1.0",
        "exercise": "Sling Shot Bench",
        "reps": null,
        "sets": "4MRS",
        "source": "X96",
        "weightSource": "Y96",
        "kind": "rm",
        "rm": 2
      },
      {
        "id": "X99",
        "tier": "2a",
        "exercise": "Legs Up Bench",
        "reps": 10.0,
        "sets": 4.0,
        "source": "X99",
        "weightSource": "Y99",
        "kind": "tm",
        "maxCell": "E5",
        "percent": 0.6,
        "formula": "=MROUND($E$5*Y43,2.5)"
      },
      {
        "id": "X100",
        "tier": "2b",
        "exercise": "Push Press",
        "reps": 6.0,
        "sets": "3MRS",
        "source": "X100",
        "weightSource": "Y100",
        "kind": "mrs",
        "rm": 6
      },
      {
        "id": "X101",
        "tier": "3a",
        "exercise": "Cable OH Tricep Ext.",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X101",
        "weightSource": "Y101",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "X102",
        "tier": "3b",
        "exercise": "Machine Lateral Raise",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X102",
        "weightSource": "Y102",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "X103",
        "tier": "3c",
        "exercise": "Rear Delt Fly",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X103",
        "weightSource": "Y103",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "X104",
        "tier": "3d",
        "exercise": "Pec Flye",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "X104",
        "weightSource": "Y104",
        "kind": "mrs",
        "rm": 12
      }
    ],
    "notes": []
  },
  {
    "week": 6,
    "day": 1,
    "entries": [
      {
        "id": "AC57",
        "tier": "1.0",
        "exercise": "Back Squat",
        "reps": null,
        "sets": null,
        "source": "AC57",
        "weightSource": "AD57",
        "kind": "rm",
        "rm": 1
      },
      {
        "id": "AC63",
        "tier": "3a",
        "exercise": "V Grip Cable Row",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC63",
        "weightSource": "AD63",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AC64",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC64",
        "weightSource": "AD64",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AC65",
        "tier": "3c",
        "exercise": "Leg Extension",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC65",
        "weightSource": "AD65",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AC66",
        "tier": "3d",
        "exercise": "DB Hammer Curl",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC66",
        "weightSource": "AD66",
        "kind": "mrs",
        "rm": 10
      }
    ],
    "notes": [
      "T2 Rest"
    ]
  },
  {
    "week": 6,
    "day": 2,
    "entries": [
      {
        "id": "AC69",
        "tier": "1.0",
        "exercise": "Bench Press",
        "reps": null,
        "sets": null,
        "source": "AC69",
        "weightSource": "AD69",
        "kind": "rm",
        "rm": 1
      },
      {
        "id": "AC75",
        "tier": "3a",
        "exercise": "Machine Lateral Raise",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC75",
        "weightSource": "AD75",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AC76",
        "tier": "3b",
        "exercise": "Rear Delt Fly",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC76",
        "weightSource": "AD76",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AC77",
        "tier": "3c",
        "exercise": "Pec Flye",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC77",
        "weightSource": "AD77",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AC78",
        "tier": "3d",
        "exercise": "Cable Tricep Push Down",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC78",
        "weightSource": "AD78",
        "kind": "mrs",
        "rm": 10
      }
    ],
    "notes": [
      "T2 Rest"
    ]
  },
  {
    "week": 6,
    "day": 3,
    "entries": [
      {
        "id": "AC81",
        "tier": "1.0",
        "exercise": "Front Squat",
        "reps": null,
        "sets": null,
        "source": "AC81",
        "weightSource": "AD81",
        "kind": "rm",
        "rm": 1
      },
      {
        "id": "AC87",
        "tier": "3a",
        "exercise": "Leg Extension",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC87",
        "weightSource": "AD87",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AC88",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC88",
        "weightSource": "AD88",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AC89",
        "tier": "3c",
        "exercise": "Wide Grip Lat Pull Down",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC89",
        "weightSource": "AD89",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AC90",
        "tier": "3d",
        "exercise": "EZ Bar Curl",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC90",
        "weightSource": "AD90",
        "kind": "mrs",
        "rm": 10
      }
    ],
    "notes": [
      "T2 Rest"
    ]
  },
  {
    "week": 6,
    "day": 4,
    "entries": [
      {
        "id": "AC93",
        "tier": "1.0",
        "exercise": "Military Press",
        "reps": null,
        "sets": null,
        "source": "AC93",
        "weightSource": "AD93",
        "kind": "rm",
        "rm": 1
      },
      {
        "id": "AC96",
        "tier": "1.0",
        "exercise": "Sling Shot Bench",
        "reps": null,
        "sets": null,
        "source": "AC96",
        "weightSource": "AD96",
        "kind": "rm",
        "rm": 1
      },
      {
        "id": "AC101",
        "tier": "3a",
        "exercise": "Cable OH Tricep Ext.",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC101",
        "weightSource": "AD101",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AC102",
        "tier": "3b",
        "exercise": "Machine Lateral Raise",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC102",
        "weightSource": "AD102",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AC103",
        "tier": "3c",
        "exercise": "Rear Delt Fly",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC103",
        "weightSource": "AD103",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AC104",
        "tier": "3d",
        "exercise": "Pec Flye",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AC104",
        "weightSource": "AD104",
        "kind": "mrs",
        "rm": 10
      }
    ],
    "notes": [
      "T2 Rest"
    ]
  },
  {
    "week": 7,
    "day": 1,
    "entries": [
      {
        "id": "AH57",
        "tier": "1.0",
        "exercise": "Back Squat",
        "reps": null,
        "sets": null,
        "source": "AH57",
        "weightSource": "AI57",
        "kind": "rm",
        "rm": 6,
        "backoff": {
          "kind": "daily",
          "percent": 0.85,
          "reps": 3.0,
          "sets": "5+",
          "source": "AI58"
        }
      },
      {
        "id": "AH60",
        "tier": "2a",
        "exercise": "1\" Deficit Deadlift",
        "reps": 6.0,
        "sets": 5.0,
        "source": "AH60",
        "weightSource": "AI60",
        "kind": "tm",
        "maxCell": "AI6",
        "percent": 0.7,
        "formula": "=MROUND($AI$6*AI37,2.5)"
      },
      {
        "id": "AH62",
        "tier": "2b",
        "exercise": "Single Leg Press",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "AH62",
        "weightSource": "AI62",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "AH63",
        "tier": "2c",
        "exercise": "Chest Supported Row",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "AH63",
        "weightSource": "AI63",
        "kind": "mrs",
        "rm": 12
      }
    ],
    "notes": [
      "Week 7 T3 Rest All Days",
      "T3 Variety Option:"
    ]
  },
  {
    "week": 7,
    "day": 2,
    "entries": [
      {
        "id": "AH69",
        "tier": "1.0",
        "exercise": "Bench Press",
        "reps": null,
        "sets": null,
        "source": "AH69",
        "weightSource": "AI69",
        "kind": "rm",
        "rm": 6,
        "backoff": {
          "kind": "daily",
          "percent": 0.85,
          "reps": 3.0,
          "sets": "5+",
          "source": "AI70"
        }
      },
      {
        "id": "AH72",
        "tier": "2a",
        "exercise": "Close Grip Bench",
        "reps": 6.0,
        "sets": 5.0,
        "source": "AH72",
        "weightSource": "AI72",
        "kind": "tm",
        "maxCell": "AI5",
        "percent": 0.7,
        "formula": "=MROUND($AI$5*AI39,2.5)"
      },
      {
        "id": "AH74",
        "tier": "2b",
        "exercise": "Incline Bench",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "AH74",
        "weightSource": "AI74",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "AH75",
        "tier": "2c",
        "exercise": "DB Shoulder Press",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "AH75",
        "weightSource": "AI75",
        "kind": "mrs",
        "rm": 12
      }
    ],
    "notes": [
      "T3 Rest"
    ]
  },
  {
    "week": 7,
    "day": 3,
    "entries": [
      {
        "id": "AH81",
        "tier": "1.0",
        "exercise": "Deadlift",
        "reps": null,
        "sets": null,
        "source": "AH81",
        "weightSource": "AI81",
        "kind": "rm",
        "rm": 6,
        "backoff": {
          "kind": "daily",
          "percent": 0.85,
          "reps": 3.0,
          "sets": "5+",
          "source": "AI82"
        }
      },
      {
        "id": "AH84",
        "tier": "2a",
        "exercise": "Front Squat",
        "reps": 6.0,
        "sets": 5.0,
        "source": "AH84",
        "weightSource": "AI84",
        "kind": "tm",
        "maxCell": "AS5",
        "percent": 0.7,
        "formula": "=MROUND($AS$5*AI41,2.5)"
      },
      {
        "id": "AH86",
        "tier": "2b",
        "exercise": "Stiff Leg Deadlift",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "AH86",
        "weightSource": "AI86",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "AH87",
        "tier": "2c",
        "exercise": "Lat Pull Down",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "AH87",
        "weightSource": "AI87",
        "kind": "mrs",
        "rm": 12
      }
    ],
    "notes": [
      "T3 Rest"
    ]
  },
  {
    "week": 7,
    "day": 4,
    "entries": [
      {
        "id": "AH93",
        "tier": "1.0",
        "exercise": "Military Press",
        "reps": null,
        "sets": null,
        "source": "AH93",
        "weightSource": "AI93",
        "kind": "rm",
        "rm": 6,
        "backoff": {
          "kind": "daily",
          "percent": 0.85,
          "reps": 3.0,
          "sets": "5+",
          "source": "AI94"
        }
      },
      {
        "id": "AH96",
        "tier": "1.0",
        "exercise": "Sling Shot Bench",
        "reps": null,
        "sets": "4MRS",
        "source": "AH96",
        "weightSource": "AI96",
        "kind": "rm",
        "rm": 7
      },
      {
        "id": "AH99",
        "tier": "2a",
        "exercise": "Legs Up Bench",
        "reps": 6.0,
        "sets": 5.0,
        "source": "AH99",
        "weightSource": "AI99",
        "kind": "tm",
        "maxCell": "AI5",
        "percent": 0.65,
        "formula": "=MROUND($AI$5*AI43,2.5)"
      }
    ],
    "notes": [
      "T3 Rest"
    ]
  },
  {
    "week": 8,
    "day": 1,
    "entries": [
      {
        "id": "AM57",
        "tier": "1.0",
        "exercise": "Back Squat",
        "reps": null,
        "sets": null,
        "source": "AM57",
        "weightSource": "AN57",
        "kind": "rm",
        "rm": 4,
        "backoff": {
          "kind": "daily",
          "percent": 0.85,
          "reps": 2.0,
          "sets": "5+",
          "source": "AN58"
        }
      },
      {
        "id": "AM60",
        "tier": "2a",
        "exercise": "1\" Deficit Deadlift",
        "reps": 5.0,
        "sets": 5.0,
        "source": "AM60",
        "weightSource": "AN60",
        "kind": "tm",
        "maxCell": "AI6",
        "percent": 0.75,
        "formula": "=MROUND($AI$6*AN37,2.5)"
      },
      {
        "id": "AM62",
        "tier": "2b",
        "exercise": "Single Leg Press",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AM62",
        "weightSource": "AN62",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AM63",
        "tier": "2c",
        "exercise": "Chest Supported Row",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AM63",
        "weightSource": "AN63",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AM64",
        "tier": "3a",
        "exercise": "V Grip Cable Row",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "AM64",
        "weightSource": "AN64",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "AM65",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "AM65",
        "weightSource": "AN65",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "AM66",
        "tier": "3c",
        "exercise": "Leg Extension",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "AM66",
        "weightSource": "AN66",
        "kind": "mrs",
        "rm": 18
      }
    ],
    "notes": []
  },
  {
    "week": 8,
    "day": 2,
    "entries": [
      {
        "id": "AM69",
        "tier": "1.0",
        "exercise": "Bench Press",
        "reps": null,
        "sets": null,
        "source": "AM69",
        "weightSource": "AN69",
        "kind": "rm",
        "rm": 4,
        "backoff": {
          "kind": "daily",
          "percent": 0.85,
          "reps": 2.0,
          "sets": "5+",
          "source": "AN70"
        }
      },
      {
        "id": "AM72",
        "tier": "2a",
        "exercise": "Close Grip Bench",
        "reps": 5.0,
        "sets": 5.0,
        "source": "AM72",
        "weightSource": "AN72",
        "kind": "tm",
        "maxCell": "AI5",
        "percent": 0.75,
        "formula": "=MROUND($AI$5*AN39,2.5)"
      },
      {
        "id": "AM74",
        "tier": "2b",
        "exercise": "Incline Bench",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AM74",
        "weightSource": "AN74",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AM75",
        "tier": "2c",
        "exercise": "DB Shoulder Press",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AM75",
        "weightSource": "AN75",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AM76",
        "tier": "3a",
        "exercise": "Machine Lateral Raise",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "AM76",
        "weightSource": "AN76",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "AM77",
        "tier": "3b",
        "exercise": "Pec Flye",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "AM77",
        "weightSource": "AN77",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "AM78",
        "tier": "3c",
        "exercise": "Rear Delt Flye",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "AM78",
        "weightSource": "AN78",
        "kind": "mrs",
        "rm": 18
      }
    ],
    "notes": []
  },
  {
    "week": 8,
    "day": 3,
    "entries": [
      {
        "id": "AM81",
        "tier": "1.0",
        "exercise": "Deadlift",
        "reps": null,
        "sets": null,
        "source": "AM81",
        "weightSource": "AN81",
        "kind": "rm",
        "rm": 4,
        "backoff": {
          "kind": "daily",
          "percent": 0.85,
          "reps": 2.0,
          "sets": "5+",
          "source": "AN82"
        }
      },
      {
        "id": "AM84",
        "tier": "2a",
        "exercise": "Front Squat",
        "reps": 5.0,
        "sets": 5.0,
        "source": "AM84",
        "weightSource": "AN84",
        "kind": "tm",
        "maxCell": "AS5",
        "percent": 0.75,
        "formula": "=MROUND($AS$5*AN41,2.5)"
      },
      {
        "id": "AM86",
        "tier": "2b",
        "exercise": "Stiff Leg Deadlift",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AM86",
        "weightSource": "AN86",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AM87",
        "tier": "2c",
        "exercise": "Lat Pull Down",
        "reps": 10.0,
        "sets": "3MRS",
        "source": "AM87",
        "weightSource": "AN87",
        "kind": "mrs",
        "rm": 10
      },
      {
        "id": "AM88",
        "tier": "3a",
        "exercise": "Wide Grip Cable Row",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "AM88",
        "weightSource": "AN88",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "AM89",
        "tier": "3b",
        "exercise": "Hammer Curl",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "AM89",
        "weightSource": "AN89",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "AM90",
        "tier": "3c",
        "exercise": "EZ Bar Curl",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "AM90",
        "weightSource": "AN90",
        "kind": "mrs",
        "rm": 18
      }
    ],
    "notes": []
  },
  {
    "week": 8,
    "day": 4,
    "entries": [
      {
        "id": "AM93",
        "tier": "1.0",
        "exercise": "Military Press",
        "reps": null,
        "sets": null,
        "source": "AM93",
        "weightSource": "AN93",
        "kind": "rm",
        "rm": 4,
        "backoff": {
          "kind": "daily",
          "percent": 0.85,
          "reps": 2.0,
          "sets": "5+",
          "source": "AN94"
        }
      },
      {
        "id": "AM96",
        "tier": "1.0",
        "exercise": "Sling Shot Bench",
        "reps": null,
        "sets": "4MRS",
        "source": "AM96",
        "weightSource": "AN96",
        "kind": "rm",
        "rm": 4
      },
      {
        "id": "AM99",
        "tier": "2a",
        "exercise": "Legs Up Bench",
        "reps": 5.0,
        "sets": 5.0,
        "source": "AM99",
        "weightSource": "AN99",
        "kind": "tm",
        "maxCell": "AI5",
        "percent": 0.7,
        "formula": "=MROUND($AI$5*AN43,2.5)"
      },
      {
        "id": "AM101",
        "tier": "3a",
        "exercise": "DB Bench Press",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "AM101",
        "weightSource": "AN101",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "AM102",
        "tier": "3b",
        "exercise": "Cable OH Tricep Ext",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "AM102",
        "weightSource": "AN102",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "AM103",
        "tier": "3c",
        "exercise": "Rear Delt Fly",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "AM103",
        "weightSource": "AN103",
        "kind": "mrs",
        "rm": 18
      },
      {
        "id": "AM104",
        "tier": "3d",
        "exercise": "Pec Flye",
        "reps": 18.0,
        "sets": "3MRS",
        "source": "AM104",
        "weightSource": "AN104",
        "kind": "mrs",
        "rm": 18
      }
    ],
    "notes": []
  },
  {
    "week": 9,
    "day": 1,
    "entries": [
      {
        "id": "AR57",
        "tier": "1.0",
        "exercise": "Back Squat",
        "reps": null,
        "sets": null,
        "source": "AR57",
        "weightSource": "AS57",
        "kind": "rm",
        "rm": 2,
        "backoff": {
          "kind": "daily",
          "percent": 0.85,
          "reps": 1.0,
          "sets": "5+",
          "source": "AS58"
        }
      },
      {
        "id": "AR60",
        "tier": "2a",
        "exercise": "1\" Deficit Deadlift",
        "reps": 4.0,
        "sets": 5.0,
        "source": "AR60",
        "weightSource": "AS60",
        "kind": "tm",
        "maxCell": "AI6",
        "percent": 0.8,
        "formula": "=MROUND($AI$6*AS37,2.5)"
      },
      {
        "id": "AR62",
        "tier": "2b",
        "exercise": "Single Leg Press",
        "reps": 8.0,
        "sets": "3MRS",
        "source": "AR62",
        "weightSource": "AS62",
        "kind": "mrs",
        "rm": 8
      },
      {
        "id": "AR63",
        "tier": "2c",
        "exercise": "Chest Supported Row",
        "reps": 8.0,
        "sets": "3MRS",
        "source": "AR63",
        "weightSource": "AS63",
        "kind": "mrs",
        "rm": 8
      },
      {
        "id": "AR64",
        "tier": "3a",
        "exercise": "V Grip Cable Row",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "AR64",
        "weightSource": "AS64",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "AR65",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "AR65",
        "weightSource": "AS65",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "AR66",
        "tier": "3c",
        "exercise": "Leg Extension",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "AR66",
        "weightSource": "AS66",
        "kind": "mrs",
        "rm": 16
      }
    ],
    "notes": []
  },
  {
    "week": 9,
    "day": 2,
    "entries": [
      {
        "id": "AR69",
        "tier": "1.0",
        "exercise": "Bench Press",
        "reps": null,
        "sets": null,
        "source": "AR69",
        "weightSource": "AS69",
        "kind": "rm",
        "rm": 2,
        "backoff": {
          "kind": "daily",
          "percent": 0.85,
          "reps": 1.0,
          "sets": "5+",
          "source": "AS70"
        }
      },
      {
        "id": "AR72",
        "tier": "2a",
        "exercise": "Close Grip Bench",
        "reps": 4.0,
        "sets": 5.0,
        "source": "AR72",
        "weightSource": "AS72",
        "kind": "tm",
        "maxCell": "AI5",
        "percent": 0.8,
        "formula": "=MROUND($AI$5*AS39,2.5)"
      },
      {
        "id": "AR74",
        "tier": "2b",
        "exercise": "Incline Bench",
        "reps": 8.0,
        "sets": "3MRS",
        "source": "AR74",
        "weightSource": "AS74",
        "kind": "mrs",
        "rm": 8
      },
      {
        "id": "AR75",
        "tier": "2c",
        "exercise": "DB Shoulder Press",
        "reps": 8.0,
        "sets": "3MRS",
        "source": "AR75",
        "weightSource": "AS75",
        "kind": "mrs",
        "rm": 8
      },
      {
        "id": "AR76",
        "tier": "3a",
        "exercise": "Machine Lateral Raise",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "AR76",
        "weightSource": "AS76",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "AR77",
        "tier": "3b",
        "exercise": "Pec Flye",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "AR77",
        "weightSource": "AS77",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "AR78",
        "tier": "3c",
        "exercise": "Rear Delt Flye",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "AR78",
        "weightSource": "AS78",
        "kind": "mrs",
        "rm": 16
      }
    ],
    "notes": []
  },
  {
    "week": 9,
    "day": 3,
    "entries": [
      {
        "id": "AR81",
        "tier": "1.0",
        "exercise": "Deadlift",
        "reps": null,
        "sets": null,
        "source": "AR81",
        "weightSource": "AS81",
        "kind": "rm",
        "rm": 2,
        "backoff": {
          "kind": "daily",
          "percent": 0.85,
          "reps": 1.0,
          "sets": "5+",
          "source": "AS82"
        }
      },
      {
        "id": "AR84",
        "tier": "2a",
        "exercise": "Front Squat",
        "reps": 4.0,
        "sets": 5.0,
        "source": "AR84",
        "weightSource": "AS84",
        "kind": "tm",
        "maxCell": "AS5",
        "percent": 0.8,
        "formula": "=MROUND($AS$5*AS41,2.5)"
      },
      {
        "id": "AR86",
        "tier": "2b",
        "exercise": "Stiff Leg Deadlift",
        "reps": 8.0,
        "sets": "3MRS",
        "source": "AR86",
        "weightSource": "AS86",
        "kind": "mrs",
        "rm": 8
      },
      {
        "id": "AR87",
        "tier": "2c",
        "exercise": "Lat Pull Down",
        "reps": 8.0,
        "sets": "3MRS",
        "source": "AR87",
        "weightSource": "AS87",
        "kind": "mrs",
        "rm": 8
      },
      {
        "id": "AR88",
        "tier": "3a",
        "exercise": "Wide Grip Cable Row",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "AR88",
        "weightSource": "AS88",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "AR89",
        "tier": "3b",
        "exercise": "Hammer Curl",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "AR89",
        "weightSource": "AS89",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "AR90",
        "tier": "3c",
        "exercise": "EZ Bar Curl",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "AR90",
        "weightSource": "AS90",
        "kind": "mrs",
        "rm": 16
      }
    ],
    "notes": []
  },
  {
    "week": 9,
    "day": 4,
    "entries": [
      {
        "id": "AR93",
        "tier": "1.0",
        "exercise": "Military Press",
        "reps": null,
        "sets": null,
        "source": "AR93",
        "weightSource": "AS93",
        "kind": "rm",
        "rm": 2,
        "backoff": {
          "kind": "daily",
          "percent": 0.85,
          "reps": 1.0,
          "sets": "5+",
          "source": "AS94"
        }
      },
      {
        "id": "AR96",
        "tier": "1.0",
        "exercise": "Sling Shot Bench",
        "reps": null,
        "sets": "1MRS",
        "source": "AR96",
        "weightSource": "AS96",
        "kind": "rm",
        "rm": 2
      },
      {
        "id": "AR99",
        "tier": "2a",
        "exercise": "Legs Up Bench",
        "reps": 4.0,
        "sets": 5.0,
        "source": "AR99",
        "weightSource": "AS99",
        "kind": "tm",
        "maxCell": "AI5",
        "percent": 0.75,
        "formula": "=MROUND($AI$5*AS43,2.5)"
      },
      {
        "id": "AR101",
        "tier": "3a",
        "exercise": "DB Bench Press",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "AR101",
        "weightSource": "AS101",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "AR102",
        "tier": "3b",
        "exercise": "Cable OH Tricep Ext",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "AR102",
        "weightSource": "AS102",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "AR103",
        "tier": "3c",
        "exercise": "Rear Delt Fly",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "AR103",
        "weightSource": "AS103",
        "kind": "mrs",
        "rm": 16
      },
      {
        "id": "AR104",
        "tier": "3d",
        "exercise": "Pec Flye",
        "reps": 16.0,
        "sets": "3MRS",
        "source": "AR104",
        "weightSource": "AS104",
        "kind": "mrs",
        "rm": 16
      }
    ],
    "notes": []
  },
  {
    "week": 10,
    "day": 1,
    "entries": [
      {
        "id": "AW57",
        "tier": "1.0",
        "exercise": "Back Squat",
        "reps": null,
        "sets": null,
        "source": "AW57",
        "weightSource": "AX57",
        "kind": "rm",
        "rm": 5,
        "backoff": {
          "kind": "daily",
          "percent": 0.9,
          "reps": 2.0,
          "sets": "3+",
          "source": "AX58"
        }
      },
      {
        "id": "AW60",
        "tier": "2a",
        "exercise": "Deadlift",
        "reps": 3.0,
        "sets": 6.0,
        "source": "AW60",
        "weightSource": "AX60",
        "kind": "tm",
        "maxCell": "AI6",
        "percent": 0.825,
        "formula": "=MROUND($AI$6*AX37,2.5)"
      },
      {
        "id": "AW62",
        "tier": "2b",
        "exercise": "Single Leg Press",
        "reps": 6.0,
        "sets": "3MRS",
        "source": "AW62",
        "weightSource": "AX62",
        "kind": "mrs",
        "rm": 6
      },
      {
        "id": "AW63",
        "tier": "2c",
        "exercise": "Chest Supported Row",
        "reps": 6.0,
        "sets": "3MRS",
        "source": "AW63",
        "weightSource": "AX63",
        "kind": "mrs",
        "rm": 6
      },
      {
        "id": "AW64",
        "tier": "3a",
        "exercise": "V Grip Cable Row",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "AW64",
        "weightSource": "AX64",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "AW65",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "AW65",
        "weightSource": "AX65",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "AW66",
        "tier": "3c",
        "exercise": "Leg Extension",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "AW66",
        "weightSource": "AX66",
        "kind": "mrs",
        "rm": 14
      }
    ],
    "notes": []
  },
  {
    "week": 10,
    "day": 2,
    "entries": [
      {
        "id": "AW69",
        "tier": "1.0",
        "exercise": "Bench Press",
        "reps": null,
        "sets": null,
        "source": "AW69",
        "weightSource": "AX69",
        "kind": "rm",
        "rm": 5,
        "backoff": {
          "kind": "daily",
          "percent": 0.9,
          "reps": 2.0,
          "sets": "3+",
          "source": "AX70"
        }
      },
      {
        "id": "AW72",
        "tier": "2a",
        "exercise": "Close Grip Bench",
        "reps": 3.0,
        "sets": 6.0,
        "source": "AW72",
        "weightSource": "AX72",
        "kind": "tm",
        "maxCell": "AI5",
        "percent": 0.825,
        "formula": "=MROUND($AI$5*AX39,2.5)"
      },
      {
        "id": "AW74",
        "tier": "2b",
        "exercise": "Incline Bench",
        "reps": 6.0,
        "sets": "3MRS",
        "source": "AW74",
        "weightSource": "AX74",
        "kind": "mrs",
        "rm": 6
      },
      {
        "id": "AW75",
        "tier": "2c",
        "exercise": "DB Shoulder Press",
        "reps": 6.0,
        "sets": "3MRS",
        "source": "AW75",
        "weightSource": "AX75",
        "kind": "mrs",
        "rm": 6
      },
      {
        "id": "AW76",
        "tier": "3a",
        "exercise": "Machine Lateral Raise",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "AW76",
        "weightSource": "AX76",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "AW77",
        "tier": "3b",
        "exercise": "Pec Flye",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "AW77",
        "weightSource": "AX77",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "AW78",
        "tier": "3c",
        "exercise": "Rear Delt Flye",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "AW78",
        "weightSource": "AX78",
        "kind": "mrs",
        "rm": 14
      }
    ],
    "notes": []
  },
  {
    "week": 10,
    "day": 3,
    "entries": [
      {
        "id": "AW81",
        "tier": "1.0",
        "exercise": "Deadlift",
        "reps": null,
        "sets": null,
        "source": "AW81",
        "weightSource": "AX81",
        "kind": "rm",
        "rm": 5,
        "backoff": {
          "kind": "daily",
          "percent": 0.9,
          "reps": 2.0,
          "sets": "3+",
          "source": "AX82"
        }
      },
      {
        "id": "AW84",
        "tier": "2a",
        "exercise": "Front Squat",
        "reps": 3.0,
        "sets": 6.0,
        "source": "AW84",
        "weightSource": "AX84",
        "kind": "tm",
        "maxCell": "AS5",
        "percent": 0.825,
        "formula": "=MROUND($AS$5*AX41,2.5)"
      },
      {
        "id": "AW86",
        "tier": "2b",
        "exercise": "Stiff Leg Deadlift",
        "reps": 6.0,
        "sets": "3MRS",
        "source": "AW86",
        "weightSource": "AX86",
        "kind": "mrs",
        "rm": 6
      },
      {
        "id": "AW87",
        "tier": "2c",
        "exercise": "Lat Pull Down",
        "reps": 6.0,
        "sets": "3MRS",
        "source": "AW87",
        "weightSource": "AX87",
        "kind": "mrs",
        "rm": 6
      },
      {
        "id": "AW88",
        "tier": "3a",
        "exercise": "Wide Grip Cable Row",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "AW88",
        "weightSource": "AX88",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "AW89",
        "tier": "3b",
        "exercise": "Hammer Curl",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "AW89",
        "weightSource": "AX89",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "AW90",
        "tier": "3c",
        "exercise": "EZ Bar Curl",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "AW90",
        "weightSource": "AX90",
        "kind": "mrs",
        "rm": 14
      }
    ],
    "notes": []
  },
  {
    "week": 10,
    "day": 4,
    "entries": [
      {
        "id": "AW93",
        "tier": "1.0",
        "exercise": "Military Press",
        "reps": null,
        "sets": null,
        "source": "AW93",
        "weightSource": "AX93",
        "kind": "rm",
        "rm": 5,
        "backoff": {
          "kind": "daily",
          "percent": 0.9,
          "reps": 2.0,
          "sets": "3+",
          "source": "AX94"
        }
      },
      {
        "id": "AW96",
        "tier": "1.0",
        "exercise": "Sling Shot Bench",
        "reps": null,
        "sets": "3MRS",
        "source": "AW96",
        "weightSource": "AX96",
        "kind": "rm",
        "rm": 5
      },
      {
        "id": "AW99",
        "tier": "2a",
        "exercise": "Legs Up Bench",
        "reps": 3.0,
        "sets": 6.0,
        "source": "AW99",
        "weightSource": "AX99",
        "kind": "tm",
        "maxCell": "AI5",
        "percent": 0.775,
        "formula": "=MROUND($AI$5*AX43,2.5)"
      },
      {
        "id": "AW101",
        "tier": "3a",
        "exercise": "DB Bench Press",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "AW101",
        "weightSource": "AX101",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "AW102",
        "tier": "3b",
        "exercise": "Cable OH Tricep Ext",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "AW102",
        "weightSource": "AX102",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "AW103",
        "tier": "3c",
        "exercise": "Rear Delt Fly",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "AW103",
        "weightSource": "AX103",
        "kind": "mrs",
        "rm": 14
      },
      {
        "id": "AW104",
        "tier": "3d",
        "exercise": "Pec Flye",
        "reps": 14.0,
        "sets": "3MRS",
        "source": "AW104",
        "weightSource": "AX104",
        "kind": "mrs",
        "rm": 14
      }
    ],
    "notes": []
  },
  {
    "week": 11,
    "day": 1,
    "entries": [
      {
        "id": "BB57",
        "tier": "1.0",
        "exercise": "Back Squat",
        "reps": null,
        "sets": null,
        "source": "BB57",
        "weightSource": "BC57",
        "kind": "rm",
        "rm": 3,
        "backoff": {
          "kind": "daily",
          "percent": 0.9,
          "reps": 1.0,
          "sets": "3+",
          "source": "BC58"
        }
      },
      {
        "id": "BB60",
        "tier": "2a",
        "exercise": "Deadlift",
        "reps": 2.0,
        "sets": 7.0,
        "source": "BB60",
        "weightSource": "BC60",
        "kind": "tm",
        "maxCell": "AI6",
        "percent": 0.85,
        "formula": "=MROUND($AI$6*BC37,2.5)"
      },
      {
        "id": "BB64",
        "tier": "3a",
        "exercise": "V Grip Cable Row",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "BB64",
        "weightSource": "BC64",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "BB65",
        "tier": "3b",
        "exercise": "Leg Curl",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "BB65",
        "weightSource": "BC65",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "BB66",
        "tier": "3c",
        "exercise": "Leg Extension",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "BB66",
        "weightSource": "BC66",
        "kind": "mrs",
        "rm": 12
      }
    ],
    "notes": [
      "T2b & T2c Rest"
    ]
  },
  {
    "week": 11,
    "day": 2,
    "entries": [
      {
        "id": "BB69",
        "tier": "1.0",
        "exercise": "Bench Press",
        "reps": null,
        "sets": null,
        "source": "BB69",
        "weightSource": "BC69",
        "kind": "rm",
        "rm": 3,
        "backoff": {
          "kind": "daily",
          "percent": 0.9,
          "reps": 1.0,
          "sets": "3+",
          "source": "BC70"
        }
      },
      {
        "id": "BB72",
        "tier": "2a",
        "exercise": "Close Grip Bench",
        "reps": 2.0,
        "sets": 7.0,
        "source": "BB72",
        "weightSource": "BC72",
        "kind": "tm",
        "maxCell": "AI5",
        "percent": 0.85,
        "formula": "=MROUND($AI$5*BC39,2.5)"
      },
      {
        "id": "BB76",
        "tier": "3a",
        "exercise": "Machine Lateral Raise",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "BB76",
        "weightSource": "BC76",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "BB77",
        "tier": "3b",
        "exercise": "Pec Flye",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "BB77",
        "weightSource": "BC77",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "BB78",
        "tier": "3c",
        "exercise": "Rear Delt Flye",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "BB78",
        "weightSource": "BC78",
        "kind": "mrs",
        "rm": 12
      }
    ],
    "notes": [
      "T2b & T2c Rest"
    ]
  },
  {
    "week": 11,
    "day": 3,
    "entries": [
      {
        "id": "BB81",
        "tier": "1.0",
        "exercise": "Deadlift",
        "reps": null,
        "sets": null,
        "source": "BB81",
        "weightSource": "BC81",
        "kind": "rm",
        "rm": 3,
        "backoff": {
          "kind": "daily",
          "percent": 0.9,
          "reps": 1.0,
          "sets": "3+",
          "source": "BC82"
        }
      },
      {
        "id": "BB84",
        "tier": "2a",
        "exercise": "Front Squat",
        "reps": 2.0,
        "sets": 7.0,
        "source": "BB84",
        "weightSource": "BC84",
        "kind": "tm",
        "maxCell": "AS5",
        "percent": 0.85,
        "formula": "=MROUND($AS$5*BC41,2.5)"
      },
      {
        "id": "BB88",
        "tier": "3a",
        "exercise": "Wide Grip Cable Row",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "BB88",
        "weightSource": "BC88",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "BB89",
        "tier": "3b",
        "exercise": "Hammer Curl",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "BB89",
        "weightSource": "BC89",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "BB90",
        "tier": "3c",
        "exercise": "EZ Bar Curl",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "BB90",
        "weightSource": "BC90",
        "kind": "mrs",
        "rm": 12
      }
    ],
    "notes": [
      "T2b & T2c Rest"
    ]
  },
  {
    "week": 11,
    "day": 4,
    "entries": [
      {
        "id": "BB93",
        "tier": "1.0",
        "exercise": "Military Press",
        "reps": null,
        "sets": null,
        "source": "BB93",
        "weightSource": "BC93",
        "kind": "rm",
        "rm": 3,
        "backoff": {
          "kind": "daily",
          "percent": 0.9,
          "reps": 1.0,
          "sets": "3+",
          "source": "BC94"
        }
      },
      {
        "id": "BB96",
        "tier": "1.0",
        "exercise": "Sling Shot Bench",
        "reps": null,
        "sets": "1MRS",
        "source": "BB96",
        "weightSource": "BC96",
        "kind": "rm",
        "rm": 3
      },
      {
        "id": "BB99",
        "tier": "2a",
        "exercise": "Legs Up Bench",
        "reps": 2.0,
        "sets": 7.0,
        "source": "BB99",
        "weightSource": "BC99",
        "kind": "tm",
        "maxCell": "AI5",
        "percent": 0.8,
        "formula": "=MROUND($AI$5*BC43,2.5)"
      },
      {
        "id": "BB103",
        "tier": "3c",
        "exercise": "Rear Delt Fly",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "BB103",
        "weightSource": "BC103",
        "kind": "mrs",
        "rm": 12
      },
      {
        "id": "BB104",
        "tier": "3d",
        "exercise": "Pec Flye",
        "reps": 12.0,
        "sets": "3MRS",
        "source": "BB104",
        "weightSource": "BC104",
        "kind": "mrs",
        "rm": 12
      }
    ],
    "notes": [
      "T2b & T2c Rest"
    ]
  },
  {
    "week": 12,
    "day": 1,
    "entries": [
      {
        "id": "BG57",
        "tier": "1.0",
        "exercise": "Back Squat",
        "reps": null,
        "sets": null,
        "source": "BG57",
        "weightSource": "BH57",
        "kind": "rm",
        "rm": 1
      }
    ],
    "notes": [
      "T2 Rest",
      "T3 Rest"
    ]
  },
  {
    "week": 12,
    "day": 2,
    "entries": [
      {
        "id": "BG69",
        "tier": "1.0",
        "exercise": "Bench Press",
        "reps": null,
        "sets": null,
        "source": "BG69",
        "weightSource": "BH69",
        "kind": "rm",
        "rm": 1
      },
      {
        "id": "BG72",
        "tier": "2a",
        "exercise": "Close Grip Bench",
        "reps": null,
        "sets": null,
        "source": "BG72",
        "weightSource": "BH72",
        "kind": "rm",
        "rm": 1
      }
    ],
    "notes": [
      "T2 Rest",
      "T3 Rest"
    ]
  },
  {
    "week": 12,
    "day": 3,
    "entries": [
      {
        "id": "BG81",
        "tier": "1.0",
        "exercise": "Deadlift",
        "reps": null,
        "sets": null,
        "source": "BG81",
        "weightSource": "BH81",
        "kind": "rm",
        "rm": 1
      },
      {
        "id": "BG84",
        "tier": "2a",
        "exercise": "Front Squat",
        "reps": null,
        "sets": null,
        "source": "BG84",
        "weightSource": "BH84",
        "kind": "rm",
        "rm": 1
      }
    ],
    "notes": [
      "T2 Rest",
      "T3 Rest"
    ]
  },
  {
    "week": 12,
    "day": 4,
    "entries": [
      {
        "id": "BG93",
        "tier": "1.0",
        "exercise": "Military Press",
        "reps": null,
        "sets": null,
        "source": "BG93",
        "weightSource": "BH93",
        "kind": "rm",
        "rm": 1
      },
      {
        "id": "BG96",
        "tier": "1.0",
        "exercise": "Sling Shot Bench",
        "reps": null,
        "sets": null,
        "source": "BG96",
        "weightSource": "BH96",
        "kind": "rm",
        "rm": 1
      }
    ],
    "notes": [
      "T2 Rest",
      "T3 Rest"
    ]
  }
];
