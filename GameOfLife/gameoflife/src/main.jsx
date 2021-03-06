import React from 'react';
import Buttons from './Buttons.jsx';
import Grid from './grid.jsx';


function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}


class Main extends React.Component {
    constructor() {
        super();

        this.speed = 100;
        this.rows = 30;
        this.cols = 50;

        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
        };
    }

    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull);
        gridCopy[row][col] = !gridCopy[row][col];
        this.setState({
            gridFull: gridCopy,
        });
    };

    seed = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                if (Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true;
                }
            }
        }
        this.setState({
            gridFull: gridCopy,
        });
    };

    playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    };

    pauseButton = () => {
        clearInterval(this.intervalId);
    };

    fast = () => {
        this.speed = 100;
        this.playButton();
    };

    slow = () => {
        this.speed = 1000;
        this.playButton();
    };

    clear = () => {
        let grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
        clearInterval(this.intervalId);
        this.setState({
            gridFull: grid,
            generation: 0
        });
    };

    gridSize = (size) => {
        switch (size) {
            case "1":
                this.cols = 20;
                this.rows = 10;
                break;
            case "2":
                this.cols = 50;
                this.rows = 30;
                break;
            default:
                this.cols = 70;
                this.rows = 50;
        }
        this.clear();
    }


    play = () => {
        let g = this.state.gridFull;
        let g2 = arrayClone(this.state.gridFull);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let count = 0;

                // these next 8 lines check for neighbours
                if (i > 0) if (g[i - 1][j]) count++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
                if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
                if (j < this.cols - 1) if (g[i][j + 1]) count++;
                if (j > 0) if (g[i][j - 1]) count++;
                if (i < this.rows - 1) if (g[i + 1][j]) count++;
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
                if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;

                if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
                if (!g[i][j] && count === 3) g2[i][j] = true;
            }
        }
        this.setState({
            gridFull: g2,
            generation: this.state.generation + 1,
        });
    };

    componentDidMount() {
        this.seed();
        this.playButton();
    }

    render() {
        return (
            <div>
                <a href="http://marisha-hoza-portfolio.surge.sh/" id="linkHome">
                  <div>
                    <p id="home"> Return to Portfolio </p>
                  </div>
                </a>
                <h1> Conway's Game of Life </h1>
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    slow={this.slow}
                    fast={this.fast}
                    clear={this.clear}
                    seed={this.seed}
                    gridSize={this.gridSize}
                />

                <Grid gridFull={this.state.gridFull} rows={this.rows} cols={this.cols} selectBox={this.selectBox} />

                <h2> Generations: {this.state.generation}</h2>
                <div id="rules">
                  <h4>Rules:</h4>
                  <br/>
                  <p>
                    The Game of Life is a two-dimensional grid of square cells, each of which is in one of two possible states: alive or dead. Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:
                  </p>
                  <ol>
                    <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
                    <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
                  </ol>
                </div>
                <h4>React game of life tutorial by freeCodeCamp</h4>
            </div>
        );
    }
}


export default Main;
