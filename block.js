var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var play=false;
var onoff=true;
var color_paddle="#0095DD";
var color_0="#0095DD";
var color_1="#ff69b4";
var color_2="#f0e68c";
var color_3="#00fa9a";
var color_buffer="";

var dropped_1=false;
var dropped_2=false;
var dropped_3=false;
var dropped_4=false;

var spawn_base=true;
var spawn=false;
var spawn_2=false;
var text_spawn=false;
var catch_time=false;
var catched_1=false;
var catched_2=false;
var catched_3=false;
var ballcount=1;
var stage_count=1;

var ballRadius = 18;
var miniRadius = 12;
var miniRadius_2 = 12;
var itemRadius = 35;
var x = canvas.width/2;
var y = canvas.height-38;
var x_1=135;
var y_1=90;
var x_2=135;
var y_2=234;
var x_3=825;
var y_3=138;
var x_4=825;
var y_4=90;
var x_5=0;
var y_5=0;
var x_6=0;
var y_6=0;
var textX=0;
var textY=0;
var textX_2=canvas.width/4.5;
var textY_2=30;
var dx = 3.5;
var dy = -3.5;
var dx_1 = 3.5;
var dy_1 = -3.5;
var dx_2 = 3.5;
var dy_2 = -3.5;
var ix_1=75;
var iy_1=75;
var ix_2=75;
var iy_2=219;
var ix_3=765;
var iy_3=123;
var ix_4=765;
var iy_4=75;
var ix_12=195;
var iy_12=105;
var ix_22=195;
var iy_22=249;
var ix_32=885;
var iy_32=153;
var ix_42=885;
var iy_42=105;

var I_x=90;
var I_y=100;
var N_x=170;
var N_y=100;
var I2_x=420;
var I2_y=100;
var A_x=500;
var A_y=100;
var D_x=700;
var D_y=100;

var paddleHeight = 18;
var paddleWidth = 180;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 6;
var brickColumnCount = 4;
var brickWidth = 120;
var brickHeight = 30;
var brickPadding = 18;
var brickOffsetTop = 75;
var brickOffsetLeft = 75;

var score = 0;
var lives = 3;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

var bricks_2 = [];
for(var c=1; c<21; c++) {
    if (c<=4){
        bricks_2[c] = { x: I_x, y: I_y+((c-1)*60), status: 1 };
    }
    else if (5<=c && c<=8){
        bricks_2[c] = { x: N_x, y: N_y+((c-5)*60), status: 1 };
    }
    else if (9<=c && c<=12){
        bricks_2[c] = { x: N_x+170, y: N_y+((c-9)*60), status: 1 };
    }
    else if (13<=c && c<=16){
        bricks_2[c] = { x: I2_x, y: I2_y+((c-13)*60), status: 1 };
    }
    else if (17<=c){
        bricks_2[c] = { x: D_x, y: D_y+((c-17)*60), status: 1 };
    }
}

for(var c=21; c<27; c++) {
    if (c<=23){
        bricks_2[c] = { x: A_x, y: A_y+((c-20)*60), status: 1 };
    }
    else if (24<=c){
        bricks_2[c] = { x: A_x+120, y: A_y+((c-23)*60), status: 1 };
    }
}

bricks_2[27]={ x: 230, y: 160, status: 1 };
bricks_2[28]={ x: 280, y: 220, status: 1 };
bricks_2[29]={ x: 560, y: 100, status: 1 };
bricks_2[30]={ x: 560, y: 220, status: 1 };
bricks_2[31]={ x: 760, y: 100, status: 1 };
bricks_2[32]={ x: 760, y: 280, status: 1 };
bricks_2[33]={ x: 820, y: 160, status: 1 };
bricks_2[34]={ x: 820, y: 220, status: 1 };

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(play==true){
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }
    if(e.key == "Enter" || e.key == " ") {
        if(catched_1==true){
            dx=3.5;
            dy=-3.5;
            catched_1=false;
            catch_time=false;
            textX_2=canvas.width/2;
            textY_2=10000;
            color_paddle=color_buffer;
        }
        if(catched_2==true){
            dx_1=3.5;
            dy_1=-3.5;
            catched_2=false;
            catch_time=false;
            textX_2=canvas.width/2;
            textY_2=10000;
            color_paddle=color_buffer;
        }
        if(catched_3==true){
            dx_2=-3.5;
            dy_2=-3.5;
            catched_3=false;
            catch_time=false;
            textX_2=canvas.width/2;
            textY_2=10000;
            color_paddle=color_buffer;
        }
        start();
    }
}

function keyUpHandler(e) {
    if(play==true){
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        if(play==true){
            paddleX = relativeX - paddleWidth/2;
        }
    }
}

function collisionDetection() {
    if (stage_count==1){
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                    if(x_6+miniRadius_2 > b.x && x_6-miniRadius_2 < b.x+brickWidth && y_6+miniRadius_2 > b.y && y_6-miniRadius_2 < b.y+brickHeight) {
                        dy_2 = -dy_2;
                        b.status = 0;
                        score++;
                        if(score == brickRowCount*brickColumnCount && stage_count==1) {
                            next_stage();
                        }
                    }
                    if(x_5+miniRadius > b.x && x_5-miniRadius < b.x+brickWidth && y_5+miniRadius > b.y && y_5-miniRadius < b.y+brickHeight) {
                        dy_1 = -dy_1;
                        b.status = 0;
                        score++;
                        if(score == brickRowCount*brickColumnCount && stage_count==1) {
                            next_stage();
                        }
                    }
                    if(x+ballRadius > b.x && x-ballRadius < b.x+brickWidth && y+ballRadius > b.y && y-ballRadius < b.y+brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score == brickRowCount*brickColumnCount && stage_count==1) {
                            next_stage();
                        }
                    }
                }
            }
        }
    }
}

function collisionDetection2() {
    if (stage_count==2){    
        for(var c=1; c<35; c++) {
            var b_2 = bricks_2[c];
            if(b_2.status == 1) {
                if(x_6+miniRadius_2 > b_2.x && x_6-miniRadius_2 < b_2.x+brickWidth && y_6+miniRadius_2 > b_2.y && y_6-miniRadius_2 < b_2.y+brickHeight) {
                    dy_2 = -dy_2;
                    b_2.status = 0;
                    score++;
                    if(score == 34 && stage_count==2) {
                        game_clear();
                        document.location.reload();
                    }
                }
                if(x_5+miniRadius > b_2.x && x_5-miniRadius < b_2.x+brickWidth && y_5+miniRadius > b_2.y && y_5-miniRadius < b_2.y+brickHeight) {
                    dy_1 = -dy_1;
                    b_2.status = 0;
                    score++;
                    if(score == 34 && stage_count==2) {
                        game_clear();
                        document.location.reload();
                    }
                }
                if(x+ballRadius > b_2.x && x-ballRadius < b_2.x+brickWidth && y+ballRadius > b_2.y && y-ballRadius < b_2.y+brickHeight) {
                    dy = -dy;
                    b_2.status = 0;
                    score++;
                    if(score == 34 && stage_count==2) {
                        game_clear();
                        document.location.reload();
                    }
                }
            }        
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#69b076";
    ctx.fill();
    ctx.closePath();
}

function item_1() {
    if (dropped_1==true){
        ctx.beginPath();
        ctx.arc(x_1, y_1, itemRadius, 0, Math.PI*2);
        ctx.fillStyle = "#ffc184";
        ctx.fill();
        ctx.closePath();
        y_1+=2.5;
    }
}

function item_2() {
    if (dropped_2==true){
        ctx.beginPath();
        ctx.arc(x_2, y_2, itemRadius, 0, Math.PI*2);
        ctx.fillStyle = "#ff84ff";
        ctx.fill();
        ctx.closePath();
        y_2+=2.5;
    }
}

function item_3() {
    if (dropped_3==true){
        ctx.beginPath();
        ctx.arc(x_3, y_3, itemRadius, 0, Math.PI*2);
        ctx.fillStyle = "#99ccff";
        ctx.fill();
        ctx.closePath();
        y_3+=2.5;
    }
}

function item_4() {
    if (dropped_4==true){
        ctx.beginPath();
        ctx.arc(x_4, y_4, itemRadius, 0, Math.PI*2);
        ctx.fillStyle = "#ff3333";
        ctx.fill();
        ctx.closePath();
        y_4+=2.5;
    }
}

function three_way() {
    if(spawn==true){
        ctx.beginPath();
        ctx.arc(x_5, y_5, miniRadius, 0, Math.PI*2);
        ctx.fillStyle = "#ffc184";
        ctx.fill();
        ctx.closePath();
    }
}
function three_way_2() {
    if(spawn_2==true){
        ctx.beginPath();
        ctx.arc(x_6, y_6, miniRadius_2, 0, Math.PI*2);
        ctx.fillStyle = "#ffc184";
        ctx.fill();
        ctx.closePath();
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = color_paddle;
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    if (stage_count==1){
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    if (c==0){
                        ctx.fillStyle = color_0;
                    }
                    else if (c==1){
                        ctx.fillStyle = color_1;
                    }
                    else if (c==2){
                        ctx.fillStyle = color_2;
                    }
                    else if (c==3){
                        ctx.fillStyle = color_3;
                    }
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
}

function drawBricks2() {
    if (stage_count==2){
        for(var c=1; c<35; c++) {
            if(bricks_2[c].status == 1) {
                var brickX_2=bricks_2[c].x;
                var brickY_2=bricks_2[c].y;
                ctx.beginPath();
                ctx.rect(brickX_2, brickY_2, brickWidth, brickHeight);
                if (5<=c && c<=12){
                    ctx.fillStyle = "#0095DD";
                }
                else if (21<=c && c<=30){
                    ctx.fillStyle = "#0095DD";
                }
                else {
                    ctx.fillStyle = "#444440";
                }
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 20, 20);
}

function drawLives() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("LIFE: "+lives, canvas.width-95, 20);
}

function press_button() {
    if (onoff==true) {
        ctx.font = "40px Arial";
        ctx.fillStyle = "#696969";
        ctx.fillText("PRESS ENTER or SPACE",canvas.width/4,canvas.height/1.5);
        onoff=false;
    }
    else if (onoff==false) {
        ctx.clearRect(0,canvas.height/1.5,canvas.width,-100);
        onoff=true;
    }
}

function press_for_release() {
    if (catched_1==true || catched_2==true || catched_3==true) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "#696969";
        ctx.fillText("PRESS ENTER or SPACE to RELEASE",textX_2,textY_2);
    }
}

function oneup_text() {
    if (text_spawn==true) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "#696969";
        ctx.fillText("1UP",textX,textY);
        setTimeout(clear_oneup,800);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBricks2();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    collisionDetection2();
    item_1();
    item_2();
    item_3();
    item_4();
    three_way();
    three_way_2();
    oneup_text();
    press_for_release();

    if(x+ballRadius > ix_1 && x-ballRadius < ix_12 && y+ballRadius > iy_1 && y-ballRadius < iy_12) {
        if(dropped_1==false){
            dropped_1=true;
        }
    }
    if(y_1 + 3.5 > canvas.height-ballRadius-paddleHeight/1.5) {
        if(x_1 > paddleX && x_1 < paddleX + paddleWidth) {
            x_1=10000;
            y_1=10000;
            x_5=x+ballRadius*2;
            y_5=y-ballRadius*2;
            x_6=x-ballRadius;
            y_6=y-ballRadius;
            dx_2=-dx_1;
            spawn=true;
            spawn_2=true;
            ballcount=3;
        }
    }

    if(x+ballRadius > ix_2 && x-ballRadius < ix_22 && y+ballRadius > iy_2 && y-ballRadius < iy_22) {
        if(dropped_2==false){
            dropped_2=true;
        }
    }
    if(x_5+miniRadius > ix_2 && x_5-miniRadius < ix_22 && y_5+miniRadius > iy_2 && y_5-miniRadius < iy_22) {
        if(dropped_2==false){
            dropped_2=true;
        }
    }
    if(x_6+miniRadius_2 > ix_2 && x_6-miniRadius_2 < ix_22 && y_6+miniRadius_2 > iy_2 && y_6-miniRadius_2 < iy_22) {
        if(dropped_2==false){
            dropped_2=true;
        }
    }
    if(y_2 + 3.5 > canvas.height-ballRadius-paddleHeight/1.5) {
        if(x_2 > paddleX && x_2 < paddleX + paddleWidth) {
            x_2=10000;
            y_2=10000;
            textX=paddleX+paddleWidth/2;
            textY=canvas.height-paddleHeight-30;
            text_spawn=true;
            lives++;
        }
    }

    if(x+ballRadius > ix_3 && x-ballRadius < ix_32 && y+ballRadius > iy_3 && y-ballRadius < iy_32) {
        if(dropped_3==false){
            dropped_3=true;
        }
    }
    if(x_5+miniRadius > ix_3 && x_5-miniRadius < ix_32 && y_5+miniRadius > iy_3 && y_5-miniRadius < iy_32) {
        if(dropped_3==false){
            dropped_3=true;
        }
    }
    if(x_6+miniRadius_2 > ix_3 && x_6-miniRadius_2 < ix_32 && y_6+miniRadius_2 > iy_3 && y_6-miniRadius_2 < iy_32) {
        if(dropped_3==false){
            dropped_3=true;
        }
    }
    if(y_3 + 3.5 > canvas.height-ballRadius-paddleHeight/1.5) {
        if(x_3 > paddleX && x_3 < paddleX + paddleWidth) {
            x_3=10000;
            y_3=10000;
            paddleWidth=paddleWidth*1.5;
            color_paddle="#33ff99"
        }
    }
    if(x+ballRadius > ix_4 && x-ballRadius < ix_42 && y+ballRadius > iy_4 && y-ballRadius < iy_42) {
        if(dropped_4==false){
            dropped_4=true;
        }
    }
    if(x_5+miniRadius > ix_4 && x_5-miniRadius < ix_42 && y_5+miniRadius > iy_4 && y_5-miniRadius < iy_42) {
        if(dropped_4==false){
            dropped_4=true;
        }
    }
    if(x_6+miniRadius_2 > ix_4 && x_6-miniRadius_2 < ix_42 && y_6+miniRadius_2 > iy_4 && y_6-miniRadius_2 < iy_42) {
        if(dropped_4==false){
            dropped_4=true;
        }
    }
    if(y_4 + 3.5 > canvas.height-ballRadius-paddleHeight/1.5) {
        if(x_4 > paddleX && x_4 < paddleX + paddleWidth) {
            x_4=10000;
            y_4=10000;
            catch_time=true;
            color_buffer=color_paddle;
            color_paddle="#cc3300";
        }
    }

    if(spawn_base==true){
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius-paddleHeight/1.5) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                if(catch_time==false) {
                    dy = -dy;
                }
                else if(catch_time==true) {
                    dx=0;
                    dy=0;
                    catched_1=true;
                }
            }
            else {
                spawn_base=false;
                x=canvas.width/2;
                y=10000;
                counter();
            }
        }
    }
    if(spawn==true){
        if(x_5 + dx_1 > canvas.width-miniRadius || x_5 + dx_1 < miniRadius) {
            dx_1 = -dx_1;
        }
        if(y_5 + dy_1 < miniRadius) {
            dy_1 = -dy_1;
        }
        else if(y_5 + dy_1 > canvas.height-miniRadius-paddleHeight/1.5) {
            if(x_5 > paddleX && x_5 < paddleX + paddleWidth) {
                if(catch_time==false) {
                    dy_1 = -dy_1;
                }
                else if(catch_time==true) {
                    dx_1=0;
                    dy_1=0;
                    catched_2=true;
                }
            }
            else {
                spawn=false;
                x_5=canvas.width/2;
                y_5=10000;
                counter();
            }
        }
    }

    if(spawn_2==true){
        if(x_6 + dx_2 > canvas.width-miniRadius_2 || x_6 + dx_2 < miniRadius_2) {
            dx_2 = -dx_2;
        }
        if(y_6 + dy_2 < miniRadius_2) {
            dy_2 = -dy_2;
        }
        else if(y_6 + dy_2 > canvas.height-miniRadius_2-paddleHeight/1.5) {
            if(x_6 > paddleX && x_6 < paddleX + paddleWidth) {
                if(catch_time==false) {
                    dy_2 = -dy_2;
                }
                else if(catch_time==true) {
                    dx_2=0;
                    dy_2=0;
                    catched_3=true;
                }
            }
            else {
                spawn_2=false;
                x_6=canvas.width/2;
                y_6=10000;
                counter();
            }
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    if(catched_1==true) {
        x=paddleX+paddleWidth/2;
        y=canvas.height-38;
    }
    
    if(catched_2==true) {
        x_5=paddleX+paddleWidth/2+60;
        y_5=canvas.height-38;
    }

    if(catched_3==true) {
        x_6=paddleX+paddleWidth/2-60;
        y_6=canvas.height-38;
    }

    if (spawn_base==true) {
        x += dx;
        y += dy;
    }
    if (spawn==true) {
        x_5+=dx_1;
        y_5+=dy_1;
    }
    if (spawn_2==true) {
        x_6+=dx_2;
        y_6+=dy_2;
    }

    if (text_spawn==true) {
        textY-=1;
    }

    if (play==true) {
        requestAnimationFrame(draw);
    }
}

var pressinter=setInterval(press_button,1000);

draw();

function start() {
    if (play==false) {
        play=true;
        draw();
        clearInterval(pressinter)
    }
}

function counter() {
    if(ballcount>=1){
        ballcount--;
        if(ballcount<=0){
            lives--;
            ballcount=1;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
                play=false;
            }
            else {
                spawn_base=true;
                x = canvas.width/2;
                y = canvas.height-38;
                dx = 3.5;
                dy = -3.5;
                paddleX = (canvas.width-paddleWidth)/2;
                requestAnimationFrame(draw);
                play=false;
            }
        }
    }
}

function clear_oneup() {
    textX=10000;
    textY=10000;
    text_spawn=false;
}

function next_stage() {
    play=false;
    color_paddle="#0095DD";
    color_buffer="";

    dropped_1=false;
    dropped_2=false;
    dropped_3=false;
    dropped_4=false;

    spawn_base=true;
    spawn=false;
    spawn_2=false;
    text_spawn=false;
    catch_time=false;
    catched_1=false;
    catched_2=false;
    catched_3=false;
    ballcount=1;
    stage_count=2;

    ballRadius = 18;
    miniRadius = 12;
    miniRadius_2 = 12;
    itemRadius = 35;
    x = canvas.width/2;
    y = canvas.height-38;
    x_1=bricks_2[3].x+25;
    y_1=bricks_2[3].y+25;
    x_2=bricks_2[5].x+25;
    y_2=bricks_2[5].y+25;
    x_3=bricks_2[30].x+25;
    y_3=bricks_2[30].y+25;
    x_4=bricks_2[13].x+25;
    y_4=bricks_2[13].y+25;
    x_5=0;
    y_5=0;
    x_6=0;
    y_6=0;
    textX=0;
    textY=0;
    textX_2=canvas.width/4.5;
    textY_2=30;
    ix_1=bricks_2[3].x;
    iy_1=bricks_2[3].y;
    ix_2=bricks_2[5].x;
    iy_2=bricks_2[5].y;
    ix_3=bricks_2[30].x;
    iy_3=bricks_2[30].y;
    ix_4=bricks_2[13].x;
    iy_4=bricks_2[13].y;
    ix_12=bricks_2[3].x+50;
    iy_12=bricks_2[3].y+50;
    ix_22=bricks_2[5].x+50;
    iy_22=bricks_2[5].y+50;
    ix_32=bricks_2[30].x+50;
    iy_32=bricks_2[30].y+50;
    ix_42=bricks_2[13].x+50;
    iy_42=bricks_2[13].y+50;
    
    paddleHeight = 18;
    paddleWidth = 180;
    paddleX = (canvas.width-paddleWidth)/2;

    brickWidth = 50;
    brickHeight = 50;

    score = 0;
    
    requestAnimationFrame(draw);
}

function game_clear(){
    alert("Congratulations!!")
}