import './game.css'
import { useRef, useEffect } from 'react'
import generateMaze from './game.js'

export default function Game() {
    const canvasRef = useRef(null);

    const canvasWidth = 600;
    const canvasHeight = 400;
    const width = 60;
    const height = 40;
    const game = generateMaze(width, height);
    const edgeOnTop = game.edgeOnTop;
    const edgeOnLeft = game.edgeOnLeft;

    const drawBoard = (ctx) => {
        const cellWidth = canvasWidth / width;
        const cellHeight = canvasHeight / height;
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
        ctx.moveTo(cellWidth * width, 0);
        ctx.lineTo(cellWidth * width, cellHeight * height);
        ctx.stroke();
        
        ctx.moveTo(0, cellHeight * height);
        ctx.lineTo(cellWidth * width, cellHeight * height);
        ctx.stroke();
        // console.log("cell width: ", cellWidth, " cell height: ", cellHeight);
    }
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        drawBoard(ctx);
    }, [])

    return (
        <main>
            <h1>Game</h1>
            <canvas ref={canvasRef} className="game-area" />
        </main>
    )
}