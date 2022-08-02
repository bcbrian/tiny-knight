import tileMap from "./sprites/fullTileMap.png";
export const playTileLookup = {
  a: {
    type: "barrier",
    variation: "1",
    passable: true,
    width: 50,
    height: 50,
    x: 150,
    y: 250,
    img: tileMap
  },
  b: {
    type: "barrier",
    variation: "2",
    passable: true,
    width: 50,
    height: 50,
    x: 200,
    y: 250,
    img: tileMap
  },
  c: {
    type: "barrier",
    variation: "3",
    passable: false,
    width: 50,
    height: 50,
    x: 300,
    y: 200,
    img: tileMap
  },
  d: {
    type: "barrier",
    variation: "4",
    passable: true,
    width: 50,
    height: 50,
    x: 100,
    y: 350,
    img: tileMap
  },
  e: {
    type: "barrier",
    variation: "5",
    passable: true,
    width: 50,
    height: 50,
    x: 50,
    y: 350,
    img: tileMap
  },
  f: {
    type: "barrier",
    variation: "6",
    passable: true,
    width: 50,
    height: 50,
    x: 250,
    y: 350,
    img: tileMap
  },
  N: {
    type: "barrier",
    passable: false,
    variation: "11",
    width: 50,
    height: 50,
    x: 350,
    y: 100,
    img: tileMap
  },

  S: {
    type: "barrier",
    variation: "7",
    // action: { type: "CHANGE_LEVEL", payload: { level: "levelTwo" } },
    passable: true,
    width: 50,
    height: 50,
    x: 0,
    y: 200,
    img: tileMap
  },
  A: {
    type: "arch1",
    variation: "10",
    // action: { type: "CHANGE_LEVEL", payload: { level: "levelTwo" } },
    passable: true,
    width: 50,
    height: 50,
    x: 350,
    y: 300,
    img: tileMap
  },
  H: {
    type: "arch2",
    variation: "11",
    // action: { type: "CHANGE_LEVEL", payload: { level: "levelTwo" } },
    passable: true,
    width: 50,
    height: 50,
    x: 400,
    y: 300,
    img: tileMap
  },
  G: {
    type: "item:gold:pile",
    variation: "12",
    passable: true,
    width: 50,
    height: 50,
    x: 0,
    y: 0,
    img: tileMap
  },
  C: {
    type: "barrier",
    variation: "13",
    passable: false,
    width: 50,
    height: 50,
    x: 100,
    y: 0,
    img: tileMap
  },
  T: {
    type: "barrier",
    variation: "14",
    passable: false,
    width: 50,
    height: 50,
    x: 0,
    y: 50,
    img: tileMap
  },
  t: {
    type: "barrier",
    variation: "15",
    passable: false,
    width: 50,
    height: 50,
    x: 50,
    y: 50,
    img: tileMap
  },
  B: {
    type: "barrier",
    variation: "16",
    passable: false,
    width: 50,
    height: 50,
    x: 200,
    y: 50,
    img: tileMap
  },
  E: {
    type: "item",
    variation: "17",
    actions: [
      { type: "ADD_ITEM", payload: { name: "Health Potion" } },
      {
        type: "UPDATE_JOURNAL",
        payload: { level: "levelTwo", entries: { pickedUpHealthPotion: true } }
      }
    ],
    passable: true,
    width: 50,
    height: 50,
    x: 350,
    y: 0,
    img: tileMap
  },
  D: {
    type: "item",
    variation: "18",
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
    passable: true,
    width: 50,
    height: 50,
    x: 300,
    y: 0,
    img: tileMap
  },
  K: {
    type: "item:key:level:one",
    variation: "19",
    actions: [
      { type: "ADD_ITEM", payload: { name: "Glold Key" } },
      {
        type: "UPDATE_JOURNAL",
        payload: { level: "levelThree", entries: { pickedUpGloldKey: true } }
      }
    ],
    passable: true,
    shouldRender(levelJournal) {
      return !levelJournal?.pickedUpGloldKey;
    },
    width: 50,
    height: 50,
    x: 250,
    y: 0,
    img: tileMap
  },
  Q: {
    type: "barrier",
    variation: "20",
    passable: false,
    width: 50,
    height: 50,
    x: 250,
    y: 50,
    img: tileMap
  },
  F: {
    type: "decoration",
    variation: "21",
    width: 50,
    height: 50,
    x: 150,
    y: 0,
    img: tileMap
  },
  Z: {
    type: "decoration",
    variation: "21",
    width: 50,
    height: 50,
    x: 200,
    y: 0,
    img: tileMap
  }
};
