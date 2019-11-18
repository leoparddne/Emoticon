let startMove = false;
let boxX = 0;
let boxY = 0;
let startX = 0;
let startY = 0;
let lastObj = null;
let defaultFontSize="15px";//默认字体大小

function move(obj) {
    //检测当前移动的元素是否为点击选中的元素
    if (lastObj != obj) {
        reset();
    }
    if (startMove) {
        var e = event || window.event;
        let box = obj.getBBox();

        obj.setAttribute("x", boxX + (e.screenX - startX));
        obj.setAttribute("y", boxY + (e.screenY - startY));
    }
}
//释放鼠标，清空状态
function up() {
    reset();
    var e = event || window.event;
    save();
}
function reset() {
    startMove = false;
    startX = 0;
    startY = 0;
}
//鼠标按下记录当前坐标
function down(obj) {
    var e = event || window.event;
    lastObj = obj;
    startMove = true;
    let box = obj.getBBox();
    startX = e.screenX;
    startY = e.screenY;
    boxX = parseInt(obj.getAttribute("x"));
    boxY = parseInt(obj.getAttribute("y"));

    if (checkSelect()) {
        let txt = document.getElementById("txt");
        txt.value = obj.textContent;
    }
}
//每次点击的对象
let currentObj = null;
let currentID = null;
let lastClass = null;
function setCurrentObj(obj) {
    if (currentObj != null) {
        //清除上一个选择得svgborder
        currentObj.setAttribute("class", lastClass);
        //保存当前的样式
        lastClass = obj.getAttribute("class");

        let widthNumber=document.getElementById("widthNumber");
        widthNumber.value=obj.getAttribute("width");
        let heightNumber=document.getElementById("heightNumber");
        heightNumber.value=obj.getAttribute("height");
    }
    //绘制锚点
    // DrawAnchor(obj);
    

    currentObj = obj;
    currentID = obj.id;
    currentObj.setAttribute("class", "svgBorder");
}
//删除
function del() {
    if (currentID != null) {
        objList.delete(currentID);
        currentObj = null;
        currentID = null;
        drawSVG();
    }
}
function save(needsave = false) {
    //通过canvas重新绘制并保存
    //保存需要在同一个域中,建议调试时绑定localhost站点
    let c = document.getElementById("myCanvas");

    // html2canvas(document.body).then(function(c) {
    //     document.body.appendChild(c);
    // });
    // let svgHtml=document.getElementById("svgObj").innerHTML;
    // let imgsrc = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgHtml)))}`;//

    let cxt = c.getContext("2d");
    // let img=new Image();
    // img.src=imgsrc;
    // img.onload=function(){
    //     cxt.drawImage(img,0,0);
    // };
    // cxt.drawImage(img,0,0);
    // return;

    cxt.clearRect(0, 0, c.width, c.height);
    objList.forEach(i => {
        let x = i.getAttribute("x");
        let y = i.getAttribute("y");

        let imgSrc = i.getAttribute("data-imgsrc");
        //文字
        if (imgSrc == null) {
            // // 设置字体
            let fontSize = defaultFontSize;
            let fontWeight = "normal";
            let fontName = "黑体";
            let oldFillStyle = cxt.fillStyle;
            let oldFont = cxt.font;
            let fontStyle = "normal";
            // cxt.font = "18px bold 黑体";
            // // 设置颜色
            let style = i.style;
            // console.log(style.length);
            if (style.length != 0) {
                for (let i = 0; i < style.length; i++) {
                    // console.log(style[i]);
                    switch (style[i]) {
                        case "font-style":
                            fontStyle = style["font-style"];
                            break;
                        case "font-weight":
                            fontWeight = style["font-weight"];
                            break;
                        case "fill":
                            cxt.fillStyle = style["fill"];
                            break;
                        case "font-size":
                            fontSize = style["font-size"];
                            break;
                        case "font-family":
                            fontName = style["font-family"];
                            break;
                    }
                }
                cxt.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontName}`;
            }
            // cxt.fillStyle = "#00f";//color;
            // // 设置水平对齐方式
            // cxt.textAlign = "center";
            // // 设置垂直对齐方式
            // cxt.textBaseline = "middle";
            // // 绘制文字（参数：要写的字，x坐标，y坐标）
            cxt.fillText(i.textContent, x, y);
            cxt.fillStyle = oldFillStyle;
            cxt.font = oldFont;
        }
        else {
            let imgData = new Image();
            imgData.src = imgSrc;
            let BBox = i.getBBox();
            let finalX = x;
            let finalY = y;
            if (BBox.width > imgData.width) {
                finalX = BBox.width - imgData.width;
            }
            if (BBox.height > imgData.height) {
                finalY = BBox.height - imgData.height;
            }

            let drawObj = new Image()
            drawObj.src = imgSrc;
            
            cxt.drawImage(drawObj, x, y,i.getAttribute("width"),i.getAttribute("height"));
        }
    });
    if (needsave) {
        var imgSrc = c.toDataURL("image/png");
        var tmpLink = document.createElement('a');
        tmpLink.href = imgSrc;  //将画布内的信息导出为png图片数据
        tmpLink.download = "logo.png";  //设定下载名称
        tmpLink.type = "image/png";
        tmpLink.click(); //点击触发下载
    }
}
//保存所有的对象
let objList = new Map();
let imgPatternList = [];
const SVGNS = "http://www.w3.org/2000/svg";
//创建图片对象
function createImage(src) {
    let img = document.createElementNS(SVGNS, "image");
    img.setAttribute("width", "1");
    img.setAttribute("height", "1");
    img.href.baseVal = src;// img.setAttribute("xlink.href",src);
    img.setAttribute("xmlns", "http://www.w3.org/1999/xlink");
    img.src = window.btoa(unescape(encodeURIComponent(src)));
    let pattern = document.createElementNS(SVGNS, "pattern");
    pattern.setAttribute("width", "100%");
    pattern.setAttribute("height", "100%");
    // pattern.setAttribute("patternContentUnits","userSpaceOnUse");
    pattern.setAttribute("patternContentUnits", "objectBoundingBox");
    pattern.setAttribute("preserveAspectRatio", "xMinYMin  meet");
    pattern.preserveAspectRatio = "";
    pattern.appendChild(img);
    let randomID = Math.random().toString(36).slice(2);
    pattern.id = randomID;
    imgPatternList.push(pattern);

    let imgData = new Image();
    imgData.onload = function () {
        rect.setAttribute("width", this.width);
        rect.setAttribute("height", this.height);
    }; imgData.src = src;
    let rect = document.createElementNS(SVGNS, "rect");
    rect.setAttribute("onmousedown", "down(this)");
    rect.setAttribute("onmousemove", "move(this)");
    rect.setAttribute("onclick", "setCurrentObj(this)");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("rx", "0");
    rect.setAttribute("ry", "0");

    // console.log(imgData.width);
    // console.log(imgData.height);
    // rect.setAttribute("width","100px");
    // rect.setAttribute("height","100px");
    rect.setAttribute("fill", "url(#" + randomID + ")");
    rect.id = getRandomID();
    rect.setAttribute("data-imgsrc", src);

    let svg = document.getElementById("svgObj");
    svg.appendChild(pattern);
    // svg.appendChild(rect);
    objList.set(rect.id, rect);
}
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataUrl = canvas.toDataURL("images/" + ext);
    return dataUrl;
};
//创建文字
function createText(txt, x, y) {
    let text = document.createElementNS(SVGNS, "text");
    text.setAttribute("onmousedown", "down(this)");
    text.setAttribute("onmousemove", "move(this)");
    text.setAttribute("onclick", "setCurrentObj(this)");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.style["font-size"] = defaultFontSize;
    // text.setAttribute("fill","black");
    text.textContent = txt;
    text.id = getRandomID();

    let svg = document.getElementById("svgObj");
    // console.log(text.outerHTML);
    // svg.appendChild(text);
    objList.set(text.id, text);
}

function getRandomID() {
    return objList.size.toString() + Math.random().toString(36).slice(2);
}

function addSvgItem() {
    let svg = document.getElementById("svgObj");
    svg.appendChild();
}
function drawSVG() {
    let svg = document.getElementById("svgObj");
    svg.innerHTML = "";
    for (let key in imgPatternList) {
        svg.appendChild(imgPatternList[key]);
    }
    // console.log(objList);
    objList.forEach(i => {
        // console.log(i)
        svg.appendChild(i);
    });
}
function checkSelect() {
    if (currentID == null) {
        return false;
    }
    return true;
}
//调整图片大小
function changeWidth(obj){
    if(checkSelect()){
        currentObj.setAttribute("width",obj.value);
        save();
    }
}
function changeHeight(obj){
    if(checkSelect()){
        currentObj.setAttribute("height",obj.value);
        save();
    }    
}
document.onkeydown = function (e) { // 回车提交表单
    // 兼容FF和IE和Opera
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 8 || code == 46) {
        del();
    }
}