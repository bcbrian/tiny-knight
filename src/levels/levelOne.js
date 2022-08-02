import { floorTileLookup } from "../floorTiles";
import { playTileLookup } from "../playTiles";
import { getFloorTiles, getPlayTiles } from "./utils";

const floorTileMap = [
  "12312312L1", //String.split -> [x, , , , , , , , ,x]
  "1211BWWW33",
  "1233p21233",
  "3211pPWW32",
  "3121pP3321",
  "3211pP3321",
  "1231pP3S22",
  "1123pP2112",
  "121321WW31",
  "3221233211"
];
const playTileMap = [
  "cccccccc c", //String.split -> [x, , , , , , , , ,x]
  "aGbc     b",
  "a bc     b",
  "a bc     b",
  "a bcAHcccc",
  "a bc  c  b",
  "a bc  c  b",
  "a bc  cc b",
  "a        b",
  "eddddddddf"
];

export const levelOne = {
  floorTiles: getFloorTiles(floorTileMap, {
    ...floorTileLookup,
    S: {
      ...floorTileLookup.S,
      action: {
        type: "CHANGE_LEVEL",
        payload: {
          level: "levelTwo",
          x: 400,
          y: 300,
          characterAnimating: false
        },
        postAction: {
          type: "PLAYER_MOVE",
          payload: {
            x: 350,
            y: 300,
            characterAnimating: true
          }
        }
      }
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
          payload: { level: "levelOne", entries: { pickedUpPileOfGold: true } }
        }
      ],
      shouldRender(levelJournal) {
        return !levelJournal?.pickedUpPileOfGold;
      }
    }
  }),
  characterJournal: {
    pickedUpPileOfGold: false
  }
};
