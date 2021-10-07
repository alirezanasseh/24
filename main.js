let emptyCell = 25;

function move(id) {
    console.log(id);
}

const root = document.createElement("div");
root.style.height = '100vh';
root.style.minHeight = '416px';
root.style.display = 'flex';
root.style.justifyContent = 'center';
root.style.alignItems = 'center';
root.style.fontFamily = 'Arial';
root.style.fontSize = '20px';
root.style.color = 'white';

const table = document.createElement('div');
table.style.width = '402px';
table.style.height = '402px';
table.style.border = '7px solid rgb(87 87 203)';
table.style.position = 'relative';

let piece;
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        if (i < 4 || j < 4) {
            piece = document.createElement('div');
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
