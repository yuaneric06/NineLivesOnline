import './game.css'
import { useRef, useEffect, useState } from 'react'
import generateMaze from './game.js'

export default function Game() {
    const canvasWidth = 600;
    const canvasHeight = 400;
    const width = 15;
    const height = 10;

    const canvasRef = useRef(null);
    const [playerPos, setPlayerPos] = useState([Math.floor(Math.random() * height),
    Math.floor(Math.random() * width)]); // x: y, row : col
    const game = useRef(generateMaze(width, height));


    const drawBoard = () => {
        const catIconSize = Math.min(canvasWidth / width, canvasHeight / height);
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

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const upperLeftX = col * cellWidth;
                const upperLeftY = row * cellHeight;
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

    const checkBounds = (row, col) => {
        return row >= 0 && col >= 0 && row < height && col < width;
    }

    const handleKeyDown = (event) => {
        const key = event.key;
        
        setPlayerPos(([currRow, currCol]) => {
            let newRow = currRow;
            let newCol = currCol;
            if (key === 'w' && checkBounds(currRow - 1, currCol)) newRow--;
            else if (key === 'a' && checkBounds(currRow, currCol - 1)) newCol--;
            else if (key === 's' && checkBounds(currRow + 1, currCol)) newRow++;
            else if (key === 'd' && checkBounds(currRow, currCol + 1)) newCol++;
            console.log("setting new player position to %d %d from %d %d", newRow, newCol, currRow, currCol);
            return [newRow, newCol];
        })
    }


    // initializer 
    useEffect(() => {
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