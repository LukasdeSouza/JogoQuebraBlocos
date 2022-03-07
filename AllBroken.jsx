import data from "../data";

export default function AllBroken(bricks, player, canvas, ballObj) {

  let{brickObj} = data
   
    let total = 0;
    for (let i = 0; i < bricks.length; i++) {
      if (bricks[i].broke === true) {
        total++;
      }
    }

    if (total === bricks.length) {
      alert("Parabéns, de F5 para reiniciar!")
      player.level ++;
      ballObj.y = canvas.height -20;
      brickObj.y = 50;
    }
  }