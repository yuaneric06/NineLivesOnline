/**
 * we can represent an edge with two boolean arrays
 * first array will hold if edgeOnTop[row][col] has an edge on top
 * edgeOnLeft[row][col] will hold if grid[row][col] has an edge on left
 * then, union find to create maze
 */
const generateMaze = (width, height) => {
    const edgeOnTop = Array.from({ length: height}, () => 
        Array.from({ length: width}, () => true));
    const edgeOnLeft = Array.from({ length: height}, () => 
        Array.from({ length: width}, () => true));
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const vis = Array.from({ length: height}, () => 
        Array.from({ length: width}, () => false));

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

export default generateMaze;
/**
 * recursive backtracking
 * visit a randomom cell to begin with
 * if there are no unvisted neighbors, backtrack until we reach a cell with one
 * go to unvisited neighbors at randomom
 * employ a counter to guarentee we visit every single node
 */
/*
let toVisit = width * height;
const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const isValidCoord = (row, col) => {
    return row >= 0 && col >= 0 && row < height && col < width;
}

const dfs = (currRow, currCol) => {
    if (toVisit <= 0) return;
    console.log("toVisit: ", toVisit);
    const dir = dirs[Math.floor(Math.random() * 4)];
    const newRow = currRow + dir[0];
    const newCol = currCol + dir[1];
    if (isValidCoord) {
        toVisit--;
        console.log("visiting row ", newRow, " col ", newCol);
        dfs(newRow, newCol);
    }
}

while (toVisit) {
    const startRow = Math.floor(Math.random() * height);
    const startCol = Math.floor(Math.random() * width);
    dfs(startRow, startCol);
}*/
