import React from "react";
import {Square} from "../square/Square"
export class Board extends React.Component {
	renderSquare(i) {
		return (
			<Square
				key = {i}
				id = {i}
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}
	getSquares(numRows, numCols) {
		let boardSquares = [];
		for (let row = 0; row < numRows; row++) {
			let rowSquares = [];
			for (let col = 0; col < numCols; col++) {
				rowSquares.push(this.renderSquare(row * numRows + col));
			}
			boardSquares.push(rowSquares);
		}
		return (
			<>
				{
          boardSquares.map((row, index) => {
            return (           
              <div className="board-row" key = {index}>{
                  row.map((square) => square)
                }
              </div>);
          })
        }
			</>
		);
	}
	render() {
		return this.getSquares(3, 3);
		// return (
		//   <div>
		//     <div className="board-row">
		//       {this.renderSquare(0)}
		//       {this.renderSquare(1)}
		//       {this.renderSquare(2)}
		//     </div>
		//     <div className="board-row">
		//       {this.renderSquare(3)}
		//       {this.renderSquare(4)}
		//       {this.renderSquare(5)}
		//     </div>
		//     <div className="board-row">
		//       {this.renderSquare(6)}
		//       {this.renderSquare(7)}
		//       {this.renderSquare(8)}
		//     </div>
		//   </div>
		// );
	}
}