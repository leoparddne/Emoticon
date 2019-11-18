//旋转
function Rotate(obj){
    if(checkSelect()){
        if(transObj!=null){
            //调整图片

            //触发重绘锚点
            DrawAnchor();
        }
    }
}
//缩放
function Scala(obj){
    if(checkSelect()){
        if(transObj!=null){
            //调整图片

            //触发重绘锚点
            DrawAnchor();
        }
    }
}
let transObj=null;
let transStartX=null;
let transStartY=null;
let transBoxX=null;
let transBoxY=null;
let transType=null;
function resetTrans(){
    transObj=null;
    transStartX=null;
    transStartY=null;
    transBoxX=null;
    transBoxY=null;
    transType=null;
}
function TransShapeDown(obj,type){
    resetTrans();
    var e = event || window.event;
    let box = obj.getBBox();
    transStartX = e.screenX;
    transStartY = e.screenY;
    transBoxX = parseInt(obj.getAttribute("x"));
    transBoxY = parseInt(obj.getAttribute("y"));
    transType=type;
    console.log(startX);
    console.log(startY);
    console.log(boxX);
    console.log(boxY);
    
    switch (type) {
        //LeftTop
        case 1:
             break;
        //RightTop
        case 2:
             break;
        //LeftDown
        case 3:
             break;
        //RightDown
        case 4:
             break;
        //ratate
        case 5:
             break;
    } 
}
//绘制锚点
function DrawAnchor(){

}