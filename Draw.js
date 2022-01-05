const canvas = document.getElementById("my_canvas")
const ctx = canvas.getContext("2d")

const ROW = 12;
const COLUMN = 12;
const SQR = 60;
const COLOR = "Black";
let point = 0;

function DrawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQR, y * SQR, SQR, SQR)
    ctx.strokeStyle = "#ccc";
    ctx.strokeRect(x * SQR, y * SQR, SQR, SQR)
}


let board = [];
for (let r = 0; r < ROW; r++) {
    board[r] = []
    for (let c = 0; c < COLUMN; c++) {
        board[r][c] = COLOR
    }
}
console.log(board)

function DrawBoard() {
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COLUMN; c++) {
            DrawSquare(c, r, board[r][c])
        }
    }
}

DrawBoard()

class Pieces {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
        this.shapeA = 0; // chi so cua goc quay hinh dau tien
        this.activeShape = this.shape[this.shapeA];
        this.x = 4;
        this.y = -2;
    }

    fill(color) {
        for (let r = 0; r < this.activeShape.length; r++) {
            for (let c = 0; c < this.activeShape.length; c++) {
                if (this.activeShape[r][c]) {
                    DrawSquare(this.x + c, this.y + r, color)
                }
            }
        }
    }

    draw() {
        this.fill(this.color)
    }

    unDraw() {
        this.fill(COLOR)
    }

    moveDown() {
        if (!this.checkImpact(0, 1, this.activeShape)) {
            this.unDraw();
            this.y++
            this.draw()
        } else {
            this.lockMove();
            random = randomPieces()
            this.setPoint()
        }


    }

    moveLeft() {
        if (!this.checkImpact(-1, 0, this.activeShape)) {
            this.unDraw();
            this.x--;
            this.draw()
        }
    }

    moveRight() {
        if (!this.checkImpact(1, 0, this.activeShape)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }

    checkImpact(x, y, piece) {
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece.length; c++) {
                if (!piece[r][c]) {  // neu k co cai nay thi hinh ban dau se bao gom tat ca cac goc quay ( canvas k hien thi ) nen cac hinh sau neu roi vao se bi day len tren
                    continue;
                }
                let newX = this.x + c + x;
                let newY = this.y + r + y;

                if (newX < 0 || newX >= COLUMN || newY >= ROW) { // check va cham voi 3 canh trai, phai , duoi
                    return true
                }
                if (newY < 0) { // check va cham voi canh tren cung
                    continue;
                }
                if (board[newY][newX] !== COLOR) { // cai nay de khong cho hinh sau de vao hinh truoc
                    return true
                }
            }
        }
        return false
    }


    lockMove() {
        for (let r = 0; r < this.activeShape.length; r++) {
            for (let c = 0; c < this.activeShape.length; c++) {
                if (!this.activeShape[r][c]) { //sau khi hinh dau tien xuong se lock o cuoi canvas, nhung hinh thu 2 se khong dc ve ra
                    continue;
                }
                if (this.y + r < 0) {
                    alert(" Gêm Âu Vờ , Quạc Quạc!!")
                    gameOver = true;
                    break;
                } else {
                    board[this.y + r] [this.x + c] = this.color

                }
            }
        }
    }

    rotation() {
        for (let i = 1; i < 4; i++) {
            if (i >= 4) {
                // this.shapeA = 0;
                this.activeShape = this.shapeA;
                this.unDraw();
                this.activeShape = this.shape[this.shapeA]
                this.activeShape.draw()
            } else {
                this.shapeA += i;
                this.unDraw();
                this.activeShape = this.shape[this.shapeA];
                this.activeShape.draw();
            }
        }

    }

    setPoint() {
        for (let r = 0; r < ROW; r++) {
            let full = true; // mac dinh cot dang day la full
            for (let c = 0; c < COLUMN; c++) {
                full = full && (board[r][c] !== COLOR) // cap nhat lai gia tri full
            }
            if (full) {
                for (let i = r; i > 1; i--) { // neu cot full thi tu dong giam 1 hang xuong
                    for (let c = 0; c < COLUMN; c++) {
                        board[i][c] = board[i - 1][c] // cap nhat vi tri cua cot
                    }
                }
                for (let c = 0; c < COLUMN; c++) {
                    board[0][c] = COLOR // ve lai dong dau tien cua bang canvas bang 1 hang moi
                }
                point += 10
            }
        }
        DrawBoard()
        document.getElementById("score").innerHTML = point
    }
}


