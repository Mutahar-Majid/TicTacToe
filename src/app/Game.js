// A game that:
// Lets you play tic-tac-toe in both desktop-view and mobile-view(added later)
// Indicates when a player has won the game or when draw occurs(added later),
// Stores a game’s history as a game progresses,
// Allows players to review a game’s history and see previous versions of a game’s board.
// Highlights the three squares that caused the win.(added later)
// Can be reset at any step.(added later)
// Displays Confetti on winning.(added later)

import React from "react";
import party from "party-js";
import { Board } from "../components/board/Board";
import "./Game.scss";

// Global Variables
let sqA, sqB, sqC;
let winnerDeclared = false;
let winStep = -1;
const intitialState = {
    history: [
        {
            squares: Array(9).fill(null),
        },
    ],
    xIsNext: true,
    stepNumber: -1,
}

// Helper Functions
const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            sqA = document.getElementById(a);
            sqB = document.getElementById(b);
            sqC = document.getElementById(c);
            winnerDeclared = true;
            toggleWinningClass(true);
            return squares[a];
        }
    }
    return null;
}
const displayConfetti = () => {
    let player = document.getElementsByClassName('status')[0];
    for (let i = 0; i < 5; i++)
        party.confetti(player, {
            count: party.variation.range(20, 200),
            zIndex: 99999,
        });
}
const toggleWinningClass = (operBool) => {
    //operBool specifies whether to add or remove class
    let player = document.getElementsByClassName('status')[0];
    sqA.classList.toggle('winning-square', operBool);
    sqB.classList.toggle('winning-square', operBool);
    sqC.classList.toggle('winning-square', operBool);
    player.classList.toggle('winning-square', operBool);
}
const checkDraw = (squares) => squares.every((element) => element !== null);

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = intitialState;
    }
    // Jump to a particular step
    jumpTo(stepNum) {
        // Remove Hightlight if junmp is to non-winning step
        if (winStep !== -1) {
            toggleWinningClass(stepNum === winStep);
        }

        this.setState({
            stepNumber: stepNum,
            xIsNext: stepNum % 2 === 0,
        });
    }

    // handle click for ith square
    handleClick(i) {
        const { stepNumber} = this.state;
        const history = this.state.history.slice(0, stepNumber === -1 ? 1 : stepNumber + 1);
        const current = history[history.length - 1];
        const sq = current.squares.slice();
        if (calculateWinner(sq) || sq[i]) {
            return;
        }
        sq[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: sq,
                },
            ]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }

    // Reset to initial state
    resetState() {
        this.setState(intitialState);

        // Remove HighLight if winner was declared
        if (winnerDeclared) {
            toggleWinningClass(false);
            winnerDeclared = false;
        }
    }
    handleCta() {
        if (this.state.stepNumber === -1) {
            this.setState({
                stepNumber: 0,
            });
            return;
        }
        this.resetState();
    }
    render() {
        const { history, xIsNext, stepNumber } = this.state;
        let current, winner, moves, status, cta = 'Restart';
        current = history[stepNumber === -1 ? 0 : stepNumber];

        if (stepNumber === -1) {
            status = 'Lets go!';
            cta = 'Start';
        }
        else {
            winner = calculateWinner(current.squares);
            moves = history.map((step, move) => {
                const desc = move ? "Go to move #" + move : "Go to game start";
                return (
                    <li key={move}>
                        <button className={`button_slide slide_left ${move == stepNumber ? 'active' : ""}`} onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            });
    
            if (winner) {
                winStep = stepNumber;
                status = "Winner: " + winner;
                displayConfetti();
            } else if (checkDraw(current.squares)) {
                status = "Draw";
            } else {
                status = "Next player: " + (xIsNext ? "X" : "O");
            }
        }

        return (
            <>
                <div className="game">
                    <div className='info'>
                        <div className={`status ${stepNumber > -1 ? winner === 'X' || xIsNext ? 'isX' : 'isY' : ''}`}>
                            <h1>{status}</h1>
                        </div>
                        <div className="game-board">
                            <Board
                                squares={current.squares}
                                onClick={(i) => {
                                    this.handleClick(i);
                                }}
                            />
                        </div>
                        <div className="reset">
                            <button disabled={stepNumber === 0} className="button_slide slide_left" onClick={() => this.handleCta()}>
                                {cta}
                            </button>
                        </div>
                        <div className="steps">
                            <ol>{moves}</ol>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

