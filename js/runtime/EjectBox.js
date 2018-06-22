import DataStore from "../base/DataStore.js";
import Sprite from "../base/Sprite";

export default class NavTitle extends Sprite {

  constructor() {
    super()
    this.ctx = DataStore.getInstance().ctx;
    this.canvas = DataStore.getInstance().canvas;
    this.DataStore = DataStore.getInstance()
  }

  drawBox() {
    const ejectText = this.DataStore.get('ejectText')
    this.createBg()
    this.createBox()
    this.createClose()
    this.createBtn()

    if (ejectText == 1) {
      this.createText()
    } else if (ejectText == 2) {
      this.createTishiText()
    }
  }

  // 创建弹出框
  createBox() {
    const canvasWidth = this.canvas.width / 2
    const image = Sprite.getImage('window_img');
    this.draw(image, 0, 0, image.width, image.height, canvasWidth - 522 / 4, 468 / 2, 522 / 2, 396 / 2);
  }

  // 创建关闭按钮
  createClose() {
    const canvasWidth = this.canvas.width / 2
    const image = Sprite.getImage('button_close_ic');
    this.draw(image, 0, 0, image.width, image.height, canvasWidth + 172 / 2, (468 + 34) / 2, 55 / 2, 55 / 2);
  }

  // 创建背景
  createBg() {
    const canvasWidth = this.canvas.width
    const canvasHeight = this.canvas.height
    this.ctx.fillStyle = 'rgba(0,0,0,0.5)'
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  // 创建答错文案
  createText() {
    const canvasWidth = this.canvas.width / 2
    this.ctx.font = '18px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      '答错了哦~',
      canvasWidth,
      568 / 2,
    );

    this.ctx.fillText(
      '下次再接再厉',
      canvasWidth,
      568 / 2 + 30,
    );
  }

  // 创建提示或者时间到的文案
  createTishiText() {
    const canvasWidth = this.canvas.width / 2
    this.ctx.font = '18px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      this.DataStore.get('ejectText1'),
      canvasWidth,
      588 / 2,
    );
  }

  // 创建按钮
  createBtn() {
    const canvasWidth = this.canvas.width / 2
    const image = Sprite.getImage('button_check');
    const ejectText = this.DataStore.get('ejectText')
    let text = ''

    if (ejectText == 1) {
      text = '查看结果'
    } else if (ejectText == 2) {
      text = '确认'
    }

    this.draw(image, 0, 0, image.width, image.height, canvasWidth - 314 / 4, 745 / 2, 314 / 2, 98 / 2);

    this.ctx.font = '18px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(
      text,
      canvasWidth,
      745 / 2 + 98 / 4,
    );
  }
}