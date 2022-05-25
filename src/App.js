
import './App.css';
import {useState , useEffect} from 'react';
import Square from "./Componets/Square";
import { Pattern } from './Pattern';

function App() {

const [board, setBoard] = useState(["","","","","","","","",""]); //make 9 string to store board value either "X" or "O"
const [player , setPlayer] = useState("O"); //*initalize started value to be O*
const [result,setResult] = useState({ winner:"none" , state:"none"}); //initalize winner and game state


useEffect(()=>{
  checkWin();
  checkTie();

  if(player=="X"){  
  setPlayer("O");
  }
  else {          
  setPlayer("X");  //*player's first input is X because it changes O to X*
  }
  
},[board]); //exacute useEffect() while [board] is updated

useEffect(()=>{
  if(result.state!="none")
  {
    alert('Game Finished ,'+ result.winner +' won');
    restartGame();
  }
},[result]);  //exacute useEffect() while [result] is updated


const chooseSquare = (square) =>
{ 
  setBoard(board.map((val,idx)=>{
    if(idx == square && val == "") //check if square's val(board[idx]) equal board[idx] and board[idx] is empty
    { 
      return player; //return X or O to the board
    }
    return val; 
  }))
  
}

  const checkWin = () =>{
    Pattern.forEach(currPattern =>
      {
        const firstPlayer = board[currPattern[0]]; //firstPlayer return X/O ,check each board[] if win pattern is match 
        if(firstPlayer=="")return; //if firstPlayer is empty , skip checkWin()
        let foundWinningPattarn = true;
        currPattern.forEach(idx=>{      //check if one winning pattern is all match
          
          if(board[idx] !== firstPlayer)
          {
            foundWinningPattarn = false;  //if 3"X" or 3"O" is not fulfilled , return not win  yet
          }
        })

        if(foundWinningPattarn){
          setResult({winner:player , state:"won"});
          //alert("After " + result.state ); bug?
          result.winner=player;
          result.state="won";
           
        }
      })
  }
  const checkTie = () =>  
  {
    let filled = true;
    board.forEach((square) =>
    {
      if(square=="")    //if any square remain empty , filled return false
      {
        filled=false;
      }
    });
    if(filled && result.state!="won"){
      setResult({winner:"No one", state:"Tie"} );
    }
    
  }

  const restartGame = () =>{
    setBoard(["","","","","","","","",""]);  
    setPlayer("O");
    setResult({ winner:"none" , state:"none"});
  }
  return <div className="App">
    <div className='board'>

        <div className='row'>
          <Square val={board[0]} chooseSquare={()=>chooseSquare(0)}/> 
          <Square val={board[1]} chooseSquare={()=>chooseSquare(1)}/>
          <Square val={board[2]} chooseSquare={()=>chooseSquare(2)}/>
        </div>
        <div className='row'>
        <Square val={board[3]} chooseSquare={()=>chooseSquare(3)}/>
          <Square val={board[4]} chooseSquare={()=>chooseSquare(4)}/>
          <Square val={board[5]} chooseSquare={()=>chooseSquare(5)}/>
        </div>
        <div className='row'>
        <Square val={board[6]} chooseSquare={()=>chooseSquare(6)}/>
          <Square val={board[7]} chooseSquare={()=>chooseSquare(7)}/>
          <Square val={board[8]} chooseSquare={()=>chooseSquare(8)}/>
        </div>
    
    </div>
  </div>;


}

export default App;
