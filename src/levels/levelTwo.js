import { floorTileLookup } from "../floorTiles";
import { playTileLookup } from "../playTiles";
import { getFloorTiles, getPlayTiles } from "./utils";

const floorTileMap = [
  "cIIIIIIIIc", //String.split -> [x, , , , , , , , ,x]
  "cIIIIIIISc",
  "cIIIIIIIIc",
  "  IIIIIIII",
  "cIIIIIIIIc",
  "cIIIIIIIIc",
  "cIIIIIIIsc",
  "    II    ",
  "IIIIIIIIII",
  "IIIIIIIIII"
];
const playTileMap = [
  "c  B     c", //String.split -> [x, , , , , , , , ,x]
  "FE       Z",
  "Z        c",
  "cC  CCCCCc",
  "c        F",
  "FQ     Ttc",
  "c        Z",
  "CCCC  CCCC",
  "         D",
  "G         "
];
export const levelTwo = {
  floorTiles: getFloorTiles(floorTileMap, {
    ...floorTileLookup,
    S: {
      ...floorTileLookup.S,
      action: {
        type: "CHANGE_LEVEL",
        payload: {
          level: "levelThree",
          x: 300,
          y: 50,
          characterAnimating: false
        },
        postAction: {
          type: "PLAYER_MOVE",
          payload: {
            x: 350,
            y: 50,
            characterAnimating: true
          }
        }
      }
    },
    s: {
      ...floorTileLookup.S,
      action: { type: "CHANGE_LEVEL", payload: { level: "levelOne" } }
    }
  }),
  playTiles: getPlayTiles(playTileMap, {
    ...playTileLookup,
    G: {
      ...playTileLookup.G,
      actions: [
        { type: "ADD_ITEM", payload: { name: "Pile of Gold" } },
        {
          type: "UPDATE_JOURNAL",
          payload: { level: "levelTwo", entries: { pickedUpPileOfGold: true } }
        }
      ],
      shouldRender(levelJournal) {
        return !levelJournal?.pickedUpPileOfGold;
      }
    },
    E: {
      ...playTileLookup.E,
      actions: [
        { type: "ADD_ITEM", payload: { name: "Health Potion" } },
        {
          type: "UPDATE_JOURNAL",
          payload: {
            level: "levelTwo",
            entries: { pickedUpHealthPotion: true }
          }
        }
      ],
      shouldRender(levelJournal) {
        return !levelJournal?.pickedUpHealthPotion;
      }
    },
    D: {
      ...playTileLookup.D,
      actions: [
        { type: "ADD_ITEM", payload: { name: "Strength Potion" } },
        {
          type: "UPDATE_JOURNAL",
          payload: {
            level: "levelTwo",
            entries: { pickedUpStrengthPotion: true }
          }
        }
      ],
      shouldRender(levelJournal) {
        return !levelJournal?.pickedUpStrengthPotion;
      }
    }
  }),
  characterJournal: {
    pickedUpHealthPotion: false,
    pickedUpStrengthPotion: false
  }
};
