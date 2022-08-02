import { floorTileLookup } from "../floorTiles";
import { playTileLookup } from "../playTiles";
import { getFloorTiles, getPlayTiles } from "./utils";

const floorTileMap = [
  "1231231231", //String.split -> [x, , , , , , , , ,x]
  "121221sWWW",
  "123232WWWW",
  "32111312pP",
  "31231233pP",
  "32112233pP",
  "12323WWW2P",
  "11233p211P",
  "WWW321323P",
  "WWWWWWWWWP"
];
const playTileMap = [
  "cccccccccc", //String.split -> [x, , , , , , , , ,x]
  " K   c    ",
  "     c    ",
  "     cccAH",
  "       c  ",
  "    cccc  ",
  "    c     ",
  "ccc c     ",
  "          ",
  "          "
];
export const levelThree = {
  floorTiles: getFloorTiles(floorTileMap, {
    ...floorTileLookup,
    S: {
      ...floorTileLookup.S,
      action: { type: "CHANGE_LEVEL", payload: { level: "levelFour" } }
    },
    s: {
      ...floorTileLookup.S,
      action: {
        type: "CHANGE_LEVEL",
        payload: {
          level: "levelTwo",
          x: 400,
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
    }
  }),
  playTiles: getPlayTiles(playTileMap, playTileLookup),
  characterJournal: {
    pickedUpGloldKey: false
  }
};
