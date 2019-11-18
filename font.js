function Bold(){
    if(checkSelect()){
        let value=currentObj.style["font-weight"];
        if(value!=undefined&&value!=null){
            currentObj.style["font-weight"]=value=="bold"?"":"bold";
            drawSVG();
            save();
        }                
    }
}
function Italic(){
    if(checkSelect()){
        let value=currentObj.style["font-style"];
        if(value!=undefined&&value!=null){
            currentObj.style["font-style"]=value=="italic"?"normal":"italic";
            drawSVG();
            save();
        }
    }
}
function addText(){
    let txt=document.getElementById("txt");
    createText(txt.value,0,10);
    drawSVG();
    save();
}
//调整文字颜色
function changeColor(){
    if(!checkSelect()){
        return;
    }
    if(currentObj.textContent!=""){
        let color=document.getElementById("color");
        currentObj.setAttribute("style", "fill:"+color.value );
        save();
    }
}
//清除颜色
function clearColor(){
    //只有文字才能清除颜色
    if(checkSelect()){
        if(currentObj.textContent!=""){
            currentObj.setAttribute("style", "fill:black");
            save();
        }
    }
}
function changeFontSize(obj){
    if(checkSelect()){
        let fontSize=obj.value;
        currentObj.style["font-size"]=fontSize+"px";
        save();
    }
}
function getTextValue(){
    if(!checkSelect()){
        return;
    }
    let txt=document.getElementById("txt");
    txt.value=currentObj.textContent;
}
function changeText(){
    if(!checkSelect()){
        return;
    }
    let txt=document.getElementById("txt");
    let color=document.getElementById("color");
    currentObj.textContent=txt.value;
    currentObj.setAttribute("style", "fill:"+color.value );
    save();
}