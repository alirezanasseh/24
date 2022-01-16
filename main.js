let emptyPos = {x: 4, y: 4}, pos = {}, num = {};
let enabled = false, moves = 0;
let best = localStorage.getItem('best') ?? 0;

function rootStyles(root) {
    root.style.height = '100vh';
    root.style.minHeight = '416px';
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.justifyContent = 'center';
    root.style.alignItems = 'center';
    root.style.fontFamily = 'Arial';
    root.style.fontSize = '20px';
    root.style.color = 'white';
}

function tableStyles(table) {
    table.style.width = '402px';
    table.style.height = '402px';
    table.style.border = '7px solid rgb(87 87 203)';
    table.style.position = 'relative';
}

function resetStyles(reset) {
    reset.style.fontSize = '24px';
    reset.style.padding = '10px';
    reset.style.backgroundColor = 'orange';
    reset.style.border = '1px solid rgb(205 133 0)';
    reset.style.borderRadius = '5px';
}

function footerStyles(footer) {
    footer.style.marginTop = '10px';
    footer.style.display = 'flex';
    footer.style.alignItems = 'center';
    footer.style.gap = '50px';
}

function numMovesStyles(numMoves) {
    numMoves.style.color = 'black';
}

function bestStyles(bestRecord) {
    bestRecord.style.color = 'black';
}

function pieceStyles(piece, x, y) {
    piece.style.border = '2px solid rgb(87 87 203)';
    piece.style.backgroundColor = 'rgb(120,120,238)';
    piece.style.position = 'absolute';
    piece.style.top = (y * 80 + 2).toString() + 'px';
    piece.style.left = (x * 80 + 2).toString() + 'px';
    piece.style.width = '74px';
    piece.style.height = '74px';
    piece.style.display = 'flex';
    piece.style.justifyContent = 'center';
    piece.style.alignItems = 'center';
}

function pieceLinks() {
    let piece, cellPos;
    for (let i = 1; i < 25; i++) {
        piece = document.getElementById(i.toString());
        if (piece) {
            cellPos = pos[i];
            if (cellPos.x === emptyPos.x || cellPos.y === emptyPos.y) {
                piece.style.cursor = 'pointer';
            } else {
                piece.style.cursor = 'default';
            }
        }
    }
}

function piecePositions() {
    for (let i = 1; i < 25; i++) {
        piece = document.getElementById(i.toString());
        if (piece) {
            piece.style.top = (pos[i].y * 80 + 2).toString() + 'px';
            piece.style.left = (pos[i].x * 80 + 2).toString() + 'px';
        }
    }
}

function won() {
    party.confetti(table, {
        count: party.variation.range(100, 200),
        shapes: ['star']
    });
    enabled = false;
    reset.disabled = false;
    if (moves < best || best === 0) {
        best = moves;
        localStorage.setItem('best', best.toString());
        bestRecord.innerText = 'Best : ' + best.toString();
    }
}

function checkTable() {
    let solved = true;
    let number = 1;
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (num[x][y] !== number++) {
                solved = false;
                break;
            }
        }
        if (!solved) break;
    }
    if (solved) {
        won();
    }
}

function move(id, byUser = true) {
    if (!enabled && byUser) return;
    if (byUser) {
        moves++;
        numMoves.innerText = moves.toString() + ' Moves';
    }
    const cellPos = pos[id];
    if (cellPos.x === emptyPos.x) {
        let x = cellPos.x;
        let number;
        if (cellPos.y < emptyPos.y) {
            for (let y = emptyPos.y; y > cellPos.y; y--) {
                number = num[x][y - 1];
                num[x][y] = number;
                pos[number] = {x, y};
            }
        } else if (cellPos.y > emptyPos.y) {
            for (let y = emptyPos.y; y < cellPos.y; y++) {
                number = num[x][y + 1];
                num[x][y] = number;
                pos[number] = {x, y};
            }
        }
        emptyPos.y = cellPos.y;
        num[x][emptyPos.y] = 25;
        pos[25] = {x, y: emptyPos.y};
        piecePositions();
        pieceLinks();
        if (byUser) checkTable();
    } else if (cellPos.y === emptyPos.y) {
        let y = cellPos.y;
        let number;
        if (cellPos.x < emptyPos.x) {
            for (let x = emptyPos.x; x > cellPos.x; x--) {
                number = num[x - 1][y];
                num[x][y] = number;
                pos[number] = {x, y};
            }
        } else if (cellPos.x > emptyPos.x) {
            for (let x = emptyPos.x; x < cellPos.x; x++) {
                number = num[x + 1][y];
                num[x][y] = number;
                pos[number] = {x, y};
            }
        }
        emptyPos.x = cellPos.x;
        num[emptyPos.x][y] = 25;
        pos[25] = {x: emptyPos.x, y};
        piecePositions();
        pieceLinks();
        if (byUser) checkTable();
    }
}

function keyMove(event, byUser = true) {
    switch (event.code) {
        case 'ArrowUp':
            if (emptyPos.y < 4) {
                move(num[emptyPos.x][emptyPos.y + 1], byUser);
            }
            break;
        case 'ArrowDown':
            if (emptyPos.y > 0) {
                move(num[emptyPos.x][emptyPos.y - 1], byUser);
            }
            break;
        case 'ArrowLeft':
            if (emptyPos.x < 4) {
                move(num[emptyPos.x + 1][emptyPos.y], byUser);
            }
            break;
        case 'ArrowRight':
            if (emptyPos.x > 0) {
                move(num[emptyPos.x - 1][emptyPos.y], byUser);
            }
            break;
    }
}

function randomize(n) {
    moves = 0;
    numMoves.innerText = '0 Moves';
    const codes = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    let rnd;
    for (let i = 0; i < n; i++) {
        rnd = Math.floor(Math.random() * 4);
        keyMove({code: codes[rnd]}, false);
    }
    reset.disabled = true;
    enabled = true;
}

const root = document.createElement("div");
rootStyles(root);
const table = document.createElement('div');
tableStyles(table);
let piece, number;
for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
        number = (x + 1) + (y * 5);
        if (x < 4 || y < 4) {
            piece = document.createElement('div');
            pieceStyles(piece, x, y);
            piece.id = piece.innerText = number.toString();
            piece.onclick = function () {
                move(this.id);
            };
            table.appendChild(piece);
        }
        pos[number.toString()] = {x, y};
        if (num[x]) {
            num[x][y] = number;
        } else {
            num[x] = [number];
        }
    }
}
root.appendChild(table);
const reset = document.createElement('button');
reset.innerText = 'Play!';
reset.onclick = () => randomize(100);
resetStyles(reset);
const numMoves = document.createElement('div');
numMoves.innerText = '0 Moves';
numMovesStyles(numMoves);
const bestRecord = document.createElement('div');
bestRecord.innerText = 'Best : ' + best.toString();
bestStyles(bestRecord);
const footer = document.createElement('div');
footerStyles(footer);
footer.appendChild(reset);
footer.appendChild(numMoves);
footer.appendChild(bestRecord);
root.appendChild(footer);
document.body.appendChild(root);
document.addEventListener('keydown', keyMove);
pieceLinks();
