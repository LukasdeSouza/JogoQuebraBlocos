import React, { useEffect, useRef } from 'react';

import { BallMovement } from './BallMovement';
import data from './data'
import WallColission from './util/WallColission';
import Paddle from './Paddle';
import Brick from './Brick';
import BrickCollision from './util/BrickCollision';
import PaddleHit from './PaddleHit';
import PlayerStats from './util/PlayerStats';


import './Board.css';
import AllBroken from './util/AllBroken';



let bricks = [];



let { ballObj, paddleProps, brickObj, player} = data



const Board = () => {
    const canvasRef = useRef(null);

    useEffect(() =>{
        const render = () =>{

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        paddleProps.y = canvas.height - 30;


        let newBrickSet = Brick(2, bricks, canvas, brickObj);

        if (newBrickSet && newBrickSet.length > 0) {
            bricks = newBrickSet;
        }


        ctx.clearRect(0, 0, canvas.width, canvas.height);

        PlayerStats(ctx, player, canvas)

        

        bricks.map((brick) =>{
            return brick.draw(ctx);
        })

        BallMovement(ctx, ballObj);

        AllBroken(bricks, player, canvas, ballObj)

        WallColission(ballObj, canvas, player, paddleProps)

        let brickColission;

        for(let i = 0; i < bricks.length; i++){
            brickColission = BrickCollision(ballObj, bricks[i]);

            if(brickColission.hit && !bricks[i].broke) {
             
                if (brickColission.axis === "X") {
                    ballObj.dx *= -1;
                    bricks[i].broke = true;
                    } else if (brickColission.axis ==="Y"){
                        ballObj.dy *= -1;
                        bricks[i].broke = true;
                    }
                    player.score += 10;
            }
        }

        Paddle(ctx, canvas, paddleProps);

        PaddleHit(ballObj,paddleProps);


        requestAnimationFrame(render)

        }
        render();
        
    },[])

    return ( 
        <canvas 
        className="tabuleiro" 
        ref={canvasRef}
        onMouseMove={(event)=>paddleProps.x = event.clientX - paddleProps.width / 2 - 10}
        height="500px"
        width="800px">
        </canvas>
    );
}
 
export default Board;