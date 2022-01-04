let gameOver = false;



function Drop(){
    setInterval(function (){
        if ( !gameOver){
            random.moveDown();
        }else {
            clearInterval();
        }
    }, 500)
}
Drop()

window.addEventListener('keyup',function (event){
    switch (event.keyCode){
        case 32 :
            random.rotation();
            break;
        case 37:
            random.moveLeft();
            break;
        case 39:
            random.moveRight();
            break;
        case 40:
            random.moveDown();
            break;
    }
})