import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
/*    constructor(){
        super();
        this.state={
            value : null,
        };
    }*/
        return (
            <button className="square" onClick={ props.onClick}>
                {
                    props.value
                    /* TODO */}
            </button>
        );
}

function declareWinner(squares)
{
    const line = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i=0;i<line.length;i++){
        const [a,b,c] = line[i];
        if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c]){
            return squares[a];
        }
    }
    return null;
}
class Board extends React.Component {
    constructor(){
        super();
        this.state={
            squares : Array(9).fill(null),
            xIsNext : true,
        };
    }
    handleClick(i){
        const squares = this.state.squares.slice();
        squares[i]=this.state.xIsNext ? 'X' : 'O';
        this.setState({squares : squares,
                        xIsNext : !this.state.xIsNext,
                        });
        if(declareWinner(squares)){
            return ;
        }
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]}
                        onClick={()=>this.handleClick(i)}
                />;
    }
    render() {
        const winner = declareWinner(this.state.squares);
        let status;
        if(winner){
            status = 'winner is' + (winner);
        }
        else{

            status = 'Next player: '+ (this.state.xIsNext?'X':'O');
        }
        // {/*<div>{'winner is'+(declareWinner(squares))}</div>*/}

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
