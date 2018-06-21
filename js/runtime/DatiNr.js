import Sprite from "../base/Sprite";
import DataStore from "../base/DataStore";

/**
 * 返回导航
 */
export default class DatiNr extends Sprite {
  constructor() {
    super()

    this.ctx = DataStore.getInstance().ctx
    this.canvas = DataStore.getInstance().canvas
  }

  drawPage() {
    this.createBox()
    this.createTime('00:12')
  }

  /**
   * 创建答题框
   */
  createBox() {
    const image = Sprite.getImage('answer-bgl-img');
    const canvasWidth = this.canvas.width / 2
    this.draw(image, 0, 0, image.width, image.height, canvasWidth - 622 / 4, 160 / 2, 622 / 2, 1027 / 2);
  }

  /**
   * 创建倒计时
   */
  createTime(time) {
    const canvasWidth = this.canvas.width / 2
    this.ctx.font = '33px Arial'
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      time,
      canvasWidth,
      260 / 2,
    );
  }



}