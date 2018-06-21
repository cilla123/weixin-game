//精灵的基类，负责初始化精灵加载的资源和大小以及位置
import DataStore from "./DataStore";

export default class Sprite {

    constructor(img = null,
        srcX = 0,
        srcY = 0,
        srcW = 0,
        srcH = 0,
        x = 0, y = 0,
        width = 0, height = 0, sX = 0, sY = 0) {
        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx;
        this.img = img;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
        this.srcH = srcH;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sX = sX;
        this.sY = sY;
    }

    static getImage(key) {
        return DataStore.getInstance().res.get(key);
    }

    /**
     * img 传入Image对象
     * srcX 要剪裁的起始X坐标
     * srcY 要剪裁的起始Y坐标
     * srcW 剪裁的宽度
     * srcH 剪裁的高度
     * x 放置的x坐标
     * y 放置的y坐标
     * width 要使用的宽度
     * height 要使用的高度
     */
    draw(img = this.img,
        srcX = this.srcX,
        srcY = this.srcY,
        srcW = this.srcW,
        srcH = this.srcH,
        x = this.x,
        y = this.y,
        width = this.width,
        height = this.height) {
        this.ctx.drawImage(
            img,
            srcX,
            srcY,
            srcW,
            srcH,
            x,
            y,
            width,
            height
        );
    }

    // 画圆形图片
    circle_image(
        img = this.img,
        srcX = this.srcX,
        srcY = this.srcY,
        srcW = this.srcW,
        srcH = this.srcH,
        x = this.x,
        y = this.y,
        width = this.width,
        height = this.height,
        sX = this.sX,
        sY = this.sY) {
        this.ctx.save()
        this.ctx.arc(sX, sY, width / 2, 0, Math.PI * 2, false)
        this.ctx.clip()
        this.ctx.stroke()
        this.ctx.drawImage(
            img,
            srcX,
            srcY,
            srcW,
            srcH,
            x,
            y,
            width,
            height)
    }

    // 画圆角方形
    Rect(x, y, w, h) {
        return {
            x: x,
            y: y,
            width: w,
            height: h
        };
    }

    Point(x, y) {
        return {
            x: x,
            y: y
        };
    }
    drawRoundedRect(x, y, w, h, r, bgColor) {
        let rect = this.Rect(x, y, w, h)
        let ptA = this.Point(rect.x + r, rect.y);
        let ptB = this.Point(rect.x + rect.width, rect.y);
        let ptC = this.Point(rect.x + rect.width, rect.y + rect.height);
        let ptD = this.Point(rect.x, rect.y + rect.height);
        let ptE = this.Point(rect.x, rect.y);

        this.ctx.moveTo(ptA.x, ptA.y);
        this.ctx.fillStyle = bgColor;
        this.ctx.strokeStyle = bgColor;
        this.ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);
        this.ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);
        this.ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);
        this.ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);
        this.ctx.fill();
        this.ctx.stroke();
    }
}
