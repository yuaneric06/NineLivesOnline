export function generateMaze(width, height) {
    const edgeOnTop = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => true));
    const edgeOnLeft = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => true));
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const vis = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => false));

    const checkBounds = (row, col) => {
        return row >= 0 && col >= 0 && row < height && col < width;
    }

    const search = (row, col) => {
        const res = [];
        for (const dir of dirs) {
            const newRow = row + dir[0];
            const newCol = col + dir[1];
            if (checkBounds(newRow, newCol) &&
                !vis[newRow][newCol]) {
                res.push([newRow, newCol]);
            }
        }
        return res;
    }

    const dfs = (currRow, currCol) => {
        vis[currRow][currCol] = true;
        let unvisitedNeighbors = search(currRow, currCol);

        while (unvisitedNeighbors.length !== 0) {
            const newRowCol = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
            const nextRow = newRowCol[0];
            const nextCol = newRowCol[1];
            // remove edge between currRow, currCol and nextRow, nextCol
            // first, determine if it is a horizantal edge or a vertical edge
            const isHorizantalEdge = currCol === nextCol;
            if (isHorizantalEdge) {
                edgeOnTop[Math.max(currRow, nextRow)][nextCol] = false;
            }
            else {
                edgeOnLeft[currRow][Math.max(currCol, nextCol)] = false;
            }
            dfs(nextRow, nextCol);
            unvisitedNeighbors = search(currRow, currCol);
        }

        return;
    }

    dfs(Math.floor(Math.random() * height), Math.floor(Math.random() * width));
    return {
        edgeOnTop,
        edgeOnLeft
    }
}


export function getRatInitialPos(width, height, playerPosRow, playerPosCol) {
    let ratPosRow = Math.floor(Math.random() * height);
    let ratPosCol = Math.floor(Math.random() * width);

    let distance = Math.abs(ratPosRow - playerPosRow) +
        Math.abs(ratPosCol - playerPosCol);
    const desiredDistance = (width / 2) + (height / 2);
    while (distance < desiredDistance) {
        ratPosRow = Math.floor(Math.random() * height);
        ratPosCol = Math.floor(Math.random() * width);

        distance = Math.abs(ratPosRow - playerPosRow) +
            Math.abs(ratPosCol - playerPosCol);
    }
    return [ratPosRow, ratPosCol]
}


export function calculateDistanceArr(edgeOnTop, edgeOnLeft, row, col) {
    const height = edgeOnTop.length;
    const width = edgeOnTop[0].length;
    const distanceArr = Array.from({ length: height },
        () => Array.from({ length: width }, () => -1));
    let que = [[row, col]];
    distanceArr[row][col] = 0;
    // conduct bfs to find the distance from each cell to the player
    while (que.length > 0) {
        const temp = [];
        for (let i = 0; i < que.length; i++) {
            const row = que[i][0];
            const col = que[i][1];
            const currdistanceArr = distanceArr[row][col];

            // check if we can go to left dir
            // if there is a wall, it will be at edgeOnLeft[row][col]
            if (col !== 0 && !edgeOnLeft[row][col] && distanceArr[row][col - 1] === -1) {
                distanceArr[row][col - 1] = currdistanceArr + 1;
                temp.push([row, col - 1]);
            }

            // check if can go to the up dir
            // if there is a wall, it will be on edgeOnTop[row][col]
            if (row !== 0 && !edgeOnTop[row][col] && distanceArr[row - 1][col] === -1) {
                distanceArr[row - 1][col] = currdistanceArr + 1;
                temp.push([row - 1, col]);
            }

            // check if we can go to the right dir
            // if there is a wall, it will be on edgeOnLeft[row][col + 1]
            if (col !== width - 1 && !edgeOnLeft[row][col + 1] && distanceArr[row][col + 1] === -1) {
                distanceArr[row][col + 1] = currdistanceArr + 1;
                temp.push([row, col + 1]);
            }

            // check if we can go to the down dir
            // if there is a wall, it will be on edgeOnTop[row + 1][col]
            if (row !== height - 1 && !edgeOnTop[row + 1][col] && distanceArr[row + 1][col] === -1) {
                distanceArr[row + 1][col] = currdistanceArr + 1;
                temp.push([row + 1, col]);
            }
        }
        que = temp;
    }
    return distanceArr;
}

const getFurthestCell = (distanceArr) => {
    let row = -1;
    let col = -1;
    let dist = -1;
    for (let i = 0; i < distanceArr.length; i++) {
        for (let j = 0; j < distanceArr[i].length; j++) {
            if (dist < distanceArr[i][j]) {
                row = i;
                col = j;
                dist = distanceArr[i][j];
            }
        }
    }
    return [row, col];
}

export function moveRat(edgeOnTop,
    edgeOnLeft, playerPosRow, playerPosCol, ratPosRow, ratPosCol) {
    const height = edgeOnTop.length;
    const width = edgeOnTop[0].length;
    const playerDistanceArr = calculateDistanceArr(edgeOnTop, edgeOnLeft, playerPosRow, playerPosCol);
    const targetCoords = getFurthestCell(playerDistanceArr);
    console.log("target coords: ", targetCoords);
    const targetDistanceArr = calculateDistanceArr(edgeOnTop, edgeOnLeft, targetCoords[0], targetCoords[1]);
    // move to the minimum distance tile in targetDistanceArr
    let nextMove = [ratPosRow, ratPosCol];
    let nextMoveDist = Number.MAX_SAFE_INTEGER;

    // check if we can go to left dir
    // if there is a wall, it will be at edgeOnLeft[row][col]
    if (ratPosCol !== 0 && !edgeOnLeft[ratPosRow][ratPosCol] &&
        targetDistanceArr[ratPosRow][ratPosCol - 1] < nextMoveDist) {
        nextMove = [ratPosRow, ratPosCol - 1];
        nextMoveDist = targetDistanceArr[ratPosRow][ratPosCol - 1];
    }

    // check if can go to the up dir
    // if there is a wall, it will be on edgeOnTop[row][col]
    if (ratPosRow !== 0 && !edgeOnTop[ratPosRow][ratPosCol] &&
        targetDistanceArr[ratPosRow - 1][ratPosCol] < nextMoveDist) {
        nextMove = [ratPosRow - 1, ratPosCol];
        nextMoveDist = targetDistanceArr[ratPosRow - 1][ratPosCol];
    }

    // check if we can go to the right dir
    // if there is a wall, it will be on edgeOnLeft[row][col + 1]
    if (ratPosCol !== width - 1 && !edgeOnLeft[ratPosRow][ratPosCol + 1] &&
        targetDistanceArr[ratPosRow][ratPosCol + 1] < nextMoveDist) {
        nextMove = [ratPosRow, ratPosCol + 1];
        nextMoveDist = targetDistanceArr[ratPosRow][ratPosCol + 1];
    }

    // check if we can go to the down dir
    // if there is a wall, it will be on edgeOnTop[row + 1][col]
    if (ratPosRow !== height - 1 && !edgeOnTop[ratPosRow + 1][ratPosCol] &&
        targetDistanceArr[ratPosRow + 1][ratPosCol] < nextMoveDist) {
        nextMove = [ratPosRow + 1, ratPosCol];
        nextMoveDist = targetDistanceArr[ratPosRow + 1][ratPosCol];
    }

    console.log("moving rat to ", nextMove);
    return nextMove;
}