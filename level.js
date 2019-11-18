//上移一层
function moveBehind(){
    if(!checkSelect()){
        return;
    }
    //找到了需要调整的对象
    let getItem=false;
    let tmpMap=new Map();
    let lastData=null;
    
    objList.forEach(i => {
        if(getItem){
            tmpMap.set(i.id,i);
            tmpMap.set(lastData.id,lastData);
            getItem=false;
        }
        else{
            if(i.id==currentID){
                lastData=i;
                getItem=true;
            }
            else{
                tmpMap.set(i.id,i);
            }
        }
        
        lastData=i;
    });
    objList=tmpMap;
    drawSVG();
}
//下移一层
function moveFront(){
    if(!checkSelect()){
        return;
    }
    let checkFirst=false;
    let tmpMap=new Map();
    let lastData=null;

    try{
        objList.forEach(i=>{
            if(!checkFirst){                    
                //已经在最上级
                if(i.id==currentID){
                    throw "";
                }
                console.log("d");
                checkFirst=true;
            }
            //循环到需要移动的元素
            //调整位置
            console.log(i.id);
            console.log(currentID);
            if(i.id==currentID){
                tmpMap.delete(lastData.id);
                tmpMap.set(i.id,i);
                tmpMap.set(lastData.id,lastData);
            }
            else{
                tmpMap.set(i.id,i);
            }
            lastData=i;
        });
        objList=tmpMap;
        drawSVG();
    }
    catch(e){

    }
}
//移动到最上层
function moveTopLevel(){
    if(!checkSelect()){
        return;
    }
    let tmp=objList.get(currentID);
    objList.delete(currentID);
    objList.set(currentID,tmp);
    drawSVG();
}
//移动到最底层
function moveLowestLevel(){
    if(!checkSelect()){
        return;
    }
    let tmp=objList.get(currentID);
    objList.delete(currentID);
    let tmpMap=new Map();
    tmpMap.set(currentID,tmp);
    objList.forEach(i=>{
        tmpMap.set(i.id,i);
    });
    objList=tmpMap;
    drawSVG();
}