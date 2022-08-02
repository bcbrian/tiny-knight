import tileMap from "./sprites/fullTileMap.png";
export const floorTileLookup = {
  "1": {
    type: "floor",
    variation: "1",
    width: 50,
    height: 50,
    x: 100,
    y: 50,
    img: tileMap
  },
  "2": {
    type: "floor",
    variation: "2",
    width: 50,
    height: 50,
    x: 100,
    y: 100,
    img: tileMap
  },
  "3": {
    type: "floor",
    variation: "3",
    width: 50,
    height: 50,
    x: 100,
    y: 150,
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
  S: {
    type: "stairs",
    variation: "7",
    action: { type: "CHANGE_LEVEL", payload: { level: "levelTwo" } },
    passable: true,
    width: 50,
    height: 50,
    x: 50,
    y: 150,
    img: tileMap
  },
  p: {
    type: "path",
    variation: "8",

    passable: true,
    width: 50,
    height: 50,
    x: 300,
    y: 100,
    img: tileMap
  },
  P: {
    type: "path",
    variation: "9",

    passable: true,
    width: 50,
    height: 50,
    x: 400,
    y: 100,
    img: tileMap
  },
  B: {
    type: "path",
    variation: "9",

    passable: true,
    width: 50,
    height: 50,
    x: 300,
    y: 50,
    img: tileMap
  },
  W: {
    type: "path",
    variation: "9",

    passable: true,
    width: 50,
    height: 50,
    x: 350,
    y: 50,
    img: tileMap
  },
  I: {
    type: "walkway",
    variation: "10",
    width: 50,
    height: 50,
    x: 0,
    y: 150,
    img: tileMap
  },
  L: {
    type: "door",
    variation: "11",
    passable: true,
    width: 50,
    height: 50,
    x: 350,
    y: 250,
    img: tileMap
  }
};
