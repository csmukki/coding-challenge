const fs = require("fs");

let finalData = {};
let players = [];
let playerCache = [];

function readFile(cb) {
  fs.readFile("data.txt", "utf-8", (err, data) => {
    if (!err) {
      const fileData = data.split("\n");
      return cb(fileData);
    }
  });
}

function createFile() {
  console.log("CREATE FILEEEE: ", finalData);
}

function setPlayersScore(data) {
  for (let item of data) {
    if (item[0] in playerCache) {
    } else {
      playerCache.push(item[0]);
    }
  }
}

function setPlayersMatches(data) {
  for (let el of data) {
    let [i, j, k] = el.split(";");
    i = i.toString().replace(" ", "_");
    j = j.toString().replace(" ", "_");
    console.log("IIIIFFJJFJFJFJF: ", i, j);
    const iIndex = players.find((el) => el === i);
    const jIndex = players.find((el) => el === j);
    console.log("INDEXESXXXXXXXXX: ", iIndex, jIndex);
    if (iIndex) {
      finalData = {
        ...finalData,
        [i]: { mp: finalData[i].mp + 1, p: 0, d: 0, l: 0 },
      };
      if (jIndex) {
        finalData = {
          ...finalData,
          [j]: { mp: finalData[j].mp + 1, p: 0, d: 0, l: 0 },
        };
      } else {
        players.push(j);
        finalData = { ...finalData, [j]: { mp: 1, p: 0, d: 0, l: 0 } };
      }
    } else if (jIndex) {
      finalData = {
        ...finalData,
        [j]: { mp: finalData[j].mp + 1, p: 0, d: 0, l: 0 },
      };
      if (iIndex) {
        finalData = {
          ...finalData,
          [i]: { mp: finalData[i].mp + 1, p: 0, d: 0, l: 0 },
        };
      } else {
        players.push(i);
        finalData = { ...finalData, [i]: { mp: 1, p: 0, d: 0, l: 0 } };
      }
    } else {
      players.push(i);
      players.push(j);
      finalData = {
        ...finalData,
        [i]: { mp: 1, p: 0, d: 0, l: 0 },
        [j]: { mp: 1, p: 0, d: 0, l: 0 },
      };
      console.log("FORMATTTTT: ", finalData);
    }
    console.log("Playerssss: ", players);
  }
  console.log("Final Data: ", finalData);
  createFile();
}

function main() {
  readFile(setPlayersMatches);
}

main();
