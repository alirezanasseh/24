let emptyCell = 25;

function rootStyles(root) {
    root.style.height = '100vh';
    root.style.minHeight = '416px';
    root.style.display = 'flex';
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

function pieceStyles(piece, i, j) {
    piece.style.border = '2px solid rgb(87 87 203)';
    piece.style.backgroundColor = 'rgb(120,120,238)';
    piece.style.position = 'absolute';
    piece.style.top = (i * 80 + 2).toString() + 'px';
    piece.style.left = (j * 80 + 2).toString() + 'px';
    piece.style.width = '74px';
    piece.style.height = '74px';
    piece.style.display = 'flex';
    piece.style.justifyContent = 'center';
    piece.style.alignItems = 'center';
}

function pieceLinks() {
    let piece;
    for (let i = 1; i < 25; i++) {
        piece = document.getElementById(i.toString());
        if (piece) {
            if (i % 5 === emptyCell % 5 || Math.floor(i / 5) === Math.floor((emptyCell - 1) / 5)) {
                piece.style.cursor = 'pointer';
            } else {
                piece.style.cursor = 'default';
            }
        }
    }
}

function move(id) {
    id = parseInt(id);
    if (id % 5 === emptyCell % 5) {
        let start, end, add;
        if (id < emptyCell) {
            start = id;
            end = emptyCell;
            add = 80;
        } else {
            start = emptyCell;
            end = id;
            add = -80;
        }
        for (let i = start; i < end; i += 5) {
            const piece = document.getElementById(i.toString());
            if (piece) {
                const topStr = piece.style.top;
                const topNumber = parseInt(topStr.substr(0, topStr.length - 2));
                piece.style.top = (topNumber + add).toString() + 'px';
            }
        }
        emptyCell = id;
        pieceLinks();
    } else if (Math.floor(id / 5) === Math.floor((emptyCell - 1) / 5)) {
        console.log('row');
        const distance = emptyCell - id;
        console.log(distance)
    }
}

const root = document.createElement("div");
rootStyles(root);
const table = document.createElement('div');
tableStyles(table);
let piece;
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        if (i < 4 || j < 4) {
            piece = document.createElement('div');
            pieceStyles(piece, i, j);
            piece.id = piece.innerText = ((j + 1) + (i * 5)).toString();
            piece.onclick = function () {
                move(this.id);
            };
            table.appendChild(piece);
        }
    }
}
root.appendChild(table);
document.body.appendChild(root);
pieceLinks();
