import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
        return(
            <button className ={props.className} onClick={()=>props.onClick()}>{props.value} </button>
        )
    }

function Board(props) {
    return (
        <div className="board">
            {Array(9).fill(null).map(
                (v, i) =>
                    <Square
                         className={
                            props.winningLine.filter(
                                (v) => v === i).length > 0 ?
                                "square square--win" :
                                "square"
                        }
                         key={i}
                        value={props.squares[i]}
                        onClick={() =>
                            props.onClick(i,parseInt(i/3,10),i%3)
                        }
                    />
            )}
            <a className="git-link" href="https://github.com/mauliktrapas/tic-tec-toe">Github Link</a>
        </div>
    )
}

class Game extends React.Component{

    constructor(props){
        super(props);
        this.state={
            history : [{
                squares : Array(9).fill(null),
                winningLine : Array(3).fill(null),
                index : [null, null],
            }],
            isXNext : true,
            stepNumber : 0,

        }
    }

    handleClick(i,row,col) {
        const history=this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if(squares[i] || calculateWinner(squares).winner){
            return;
        }
        squares[i]=this.state.isXNext? 'X' : 'O';
        this.setState(
            {   history:history.concat([
                {
                squares:squares,
                    winningLine : calculateWinner(squares).winningLine,
                    index : [row,col],
                }
                ]),
                isXNext : !this.state.isXNext,
                stepNumber : this.state.stepNumber + 1,
            }
        );
    }

    moveTo(step){
        this.setState({
            isXNext : step%2===0,
            stepNumber : step
        })
    }

    render(){
        const history=this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares).winner;

        let status;
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O')
        }

        const moveList = history.map((temp,step)=>{
            const desc = step ? ('move ('+ temp.index[0] + ',' + temp.index[1] + ')' ) : 'game start';
            return(
                <li key={step} className="steps">
                    <a href=" " onClick={()=>this.moveTo(step)}>{desc}</a>
                </li>
            );
        });

        return(
           <div className="game">
               <Board winningLine={current.winningLine} squares={current.squares} onClick={(i,row,col)=>this.handleClick(i,row,col)} />
               <div className="game-info">
                <div >{status}</div>
                <ol>{moveList}</ol>
               </div>
           </div>
        )
    }
}

function calculateWinner(squares){
    const lines=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i=0;i<lines.length;i++){
        const [a,b,c]=lines[i];
        if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c]){
            return {"winner" : squares[a],"winningLine" : [a,b,c]};
        }
    }
    return {"winner" : null,"winningLine" : [null,null,null]};
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

