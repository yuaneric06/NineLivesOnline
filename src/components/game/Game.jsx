import './game.css'
import { useRef, useEffect, useState } from 'react'
import { generateMaze, getRatInitialPos, calculateDistanceArr, moveRat } from './game.js'

export default function Game() {
    const canvasWidth = 600;
    const canvasHeight = 400;
    const width = 15;
    const height = 10;

    const canvasRef = useRef(null);
    const [playerPos, setPlayerPos] = useState([Math.floor(Math.random() * height),
    Math.floor(Math.random() * width)]); // x: y, row : col
    const ratPos = useRef(null);
    const game = useRef(generateMaze(width, height));



    const drawBoard = () => {
        const playerIconSize = Math.min(canvasWidth / width, canvasHeight / height);
        const edgeOnTop = game.current.edgeOnTop;
        const edgeOnLeft = game.current.edgeOnLeft;

        const cellWidth = canvasWidth / width;
        const cellHeight = canvasHeight / height;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;

        const playerImage = new Image(playerIconSize, playerIconSize);
        const playerRowPos = playerPos[0] * cellHeight;
        const playerColPos = playerPos[1] * cellWidth;
        playerImage.onload = () => {
            ctx.drawImage(playerImage,
                playerColPos,
                playerRowPos,
                playerImage.width,
                playerImage.height);
        };
        playerImage.src = '/src/media/game-cat.png';

        const ratImage = new Image(playerIconSize, playerIconSize);
        const ratRowPos = ratPos.current[0] * cellHeight;
        const ratColPos = ratPos.current[1] * cellWidth;
        ratImage.onload = () => {
            ctx.drawImage(ratImage,
                ratColPos,
                ratRowPos,
                ratImage.width,
                ratImage.height);
        };
        ratImage.src = '/src/media/game-rat.png';

        // debugging purposes
        const distanceArr = calculateDistanceArr(edgeOnTop, edgeOnLeft, playerPos[0], playerPos[1]);

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const upperLeftX = col * cellWidth;
                const upperLeftY = row * cellHeight;

                // debugging purposes
                ctx.fillText(distanceArr[row][col].toString(), upperLeftX + cellWidth / 2, upperLeftY + cellHeight / 2);

                // console.log("row ", row, " col ", col);
                if (edgeOnTop[row][col]) {
                    // draws from left to right
                    ctx.beginPath();
                    ctx.moveTo(upperLeftX, upperLeftY);
                    ctx.lineTo(upperLeftX + cellWidth, upperLeftY);
                    ctx.stroke();
                }
                if (edgeOnLeft[row][col]) {
                    // draws fro top to bottom
                    ctx.beginPath();
                    ctx.moveTo(upperLeftX, upperLeftY);
                    ctx.lineTo(upperLeftX, upperLeftY + cellHeight);
                    ctx.stroke();
                }
            }
        }

        // draw border
        ctx.moveTo(cellWidth * width, 0);
        ctx.lineTo(cellWidth * width, cellHeight * height);
        ctx.stroke();

        ctx.moveTo(0, cellHeight * height);
        ctx.lineTo(cellWidth * width, cellHeight * height);
        ctx.stroke();
    }

    const checkBounds = (row, col, prevRow, prevCol) => {
        if (row < 0 || col < 0 || row >= height || col >= width) return true;
        // check if there is a wall between curr pos and prev pos
        const edgeOnTop = game.current.edgeOnTop;
        const edgeOnLeft = game.current.edgeOnLeft;
        const isHorizantalEdge = col === prevCol;
        if ((isHorizantalEdge && edgeOnTop[Math.max(row, prevRow)][col])
            || (!isHorizantalEdge && edgeOnLeft[row][Math.max(col, prevCol)])) {
            return false;
        }
        return true;
    }

    const handleKeyDown = (event) => {
        const key = event.key;

        setPlayerPos(([currRow, currCol]) => {
            let newRow = currRow;
            let newCol = currCol;
            if (key === 'w' && checkBounds(currRow - 1, currCol, currRow, currCol)) newRow--;
            else if (key === 'a' && checkBounds(currRow, currCol - 1, currRow, currCol)) newCol--;
            else if (key === 's' && checkBounds(currRow + 1, currCol, currRow, currCol)) newRow++;
            else if (key === 'd' && checkBounds(currRow, currCol + 1, currRow, currCol)) newCol++;
            if (newRow === -1) newRow += height;
            else if (newRow === height) newRow -= height;
            else if (newCol === -1) newCol += width;
            else if (newCol === width) newCol -= width;
            console.log("setting new player position to %d %d from %d %d", newRow, newCol, currRow, currCol);
            ratPos.current = moveRat(game.current.edgeOnTop, 
                game.current.edgeOnLeft, 
                newRow, newCol, 
                ratPos.current[0], 
                ratPos.current[1]);
            return [newRow, newCol];
        })
    }


    // initializer 
    useEffect(() => {
        ratPos.current = getRatInitialPos(width, height, playerPos[0], playerPos[1]);
        drawBoard();
        const listener = (event) => handleKeyDown(event);
        document.addEventListener('keydown', listener);
        return () => document.removeEventListener('keydown', listener);
    }, [])

    // update on user move
    useEffect(() => {
        drawBoard();
    }, [playerPos]);

    return (
        <main>
            <h1>Game</h1>
            <canvas ref={canvasRef} className="game-area" />
        </main>
    )
}