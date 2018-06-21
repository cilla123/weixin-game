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
    this.name = '的阿斯'
    this.details = {}
    this.chengji = [
      '成绩',
      '积分',
      '现金',
      '代币'
    ]
  }

  drawPage() {
    this.createBox()
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
   * 创建人物名称
   */
  createName() {
    const canvasWidth = this.canvas.width / 2
    this.ctx.font = '18px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(
      this.name,
      canvasWidth - 10,
      90,
    );
  }

}