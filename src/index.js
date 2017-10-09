import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component{
    render(){
        return(
            <button className="square" onClick={()=>this.props.onClick()}>{this.props.value} </button>
        )
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state={
            squares : Array(9).fill(null),
            isXNext : true,
        }
    }
    renderSquare(i){
        return <Square  value={this.state.squares[i]} onClick={()=>this.handleClick(i)} />
    }
    handleClick(i) {

        let squares = this.state.squares.slice();
        if(squares[i] || decideWinner(this.state.squares)){
            return;
        }
        squares[i]=this.state.isXNext?'X':'O';
        this.setState(
            { squares:squares,
                isXNext : !this.state.isXNext
            }
        );
    }
    render(){
        let status;
        if(decideWinner(this.state.squares)){
            status = 'winner is ' + (decideWinner(this.state.squares));
        }
        else{
            status = 'turn is' + (this.state.isXNext?'X':'O');
        }
        return (
            <div className="outer">
                <div >{status}</div>
                <div className="squ">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component{
    render(){

        return(
           <div className="game">

                <Board />
           </div>
        )
    }
}

function decideWinner(squares){
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
            return squares[a];
        }
    }
    return null;
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
