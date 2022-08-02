function generatePlay({ tile, y, x }) {
  return {
    tile,
    width: 50,
    height: 50,
    y,
    x
  };
}
function generateFloor({ tile, y, x }) {
  return {
    tile,
    width: 50,
    height: 50,
    y,
    x
  };
}

export const getFloorTiles = (floorTileMap, floorTileLookup) =>
  floorTileMap
    .map((tileRow, topIndex) => {
      const rowTiles = tileRow.split("");
      return rowTiles.map((floorTile, leftIndex) => {
        switch (floorTile) {
          case "1":
          case "2":
          case "3":
          case "S":
          case "P":
          case "p":
          case "W":
          case "s":
          case "B":
          case "I":
          case "N":
          case "L":
          case "c":
            return generateFloor({
              tile: floorTileLookup[floorTile],
              y: topIndex * 50,
              x: leftIndex * 50
            });

          default:
            return null;
        }
      });
    })
    .flat()
    .filter((tile) => tile !== null);

export const getPlayTiles = (playTileMap, playTileLookup) =>
  playTileMap
    .map((tileRow, topIndex) => {
      const rowTiles = tileRow.split("");
      return rowTiles.map((playTile, leftIndex) => {
        switch (playTile) {
          case "a":
          case "b":
          case "c":
          case "d":
          case "e":
          case "f":
          case "S":
          case "A":
          case "H":
          case "G":
          case "N":
          case "C":
          case "T":
          case "t":
          case "E":
          case "D":
          case "B":
          case "K":
          case "L":
          case "Q":
          case "F":
          case "Z":
            return generatePlay({
              tile: playTileLookup[playTile],
              y: topIndex * 50,
              x: leftIndex * 50
            });

          default:
            return null;
        }
      });
    })
    .flat()
    .filter((tile) => tile !== null);
