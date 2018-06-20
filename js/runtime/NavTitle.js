import DataStore from "../base/DataStore.js";

export default class NavTitle {

    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.title = '问答游戏';
    }

    draw() {
        this.ctx.font = '18px Arial';
        this.ctx.fillStyle = '#fefefe';
        this.ctx.fillText(
            this.title,
            DataStore.getInstance().canvas.width / 2.5,
            50,
        );
    }
}