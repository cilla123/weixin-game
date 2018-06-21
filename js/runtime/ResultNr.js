import Sprite from "../base/Sprite";
import DataStore from "../base/DataStore";

/**
 * 返回导航
 */
export default class ResultNr extends Sprite {
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
    this.createJinQian()
    this.createPeopleImg()
    this.createName()
    this.createDaTiJieGuo()
    this.createBtn()
    for (let i = 0; i < 4; i++) {
      this.createChengji(this.chengji[i], '0', i)
    }
  }

  /**
   * 创建人物头像
   */
  createPeopleImg() {
    const image = Sprite.getImage('start-btn');
    const canvasWidth = this.canvas.width / 2
    this.circle_image(image, 0, 0, image.width, image.height, canvasWidth - 110 / 2, 80, 33, 33, canvasWidth - 70 / 2, 90);
    this.ctx.restore()
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

  /**
   * 创建答题结果
   */
  createDaTiJieGuo() {
    const image = Sprite.getImage('window-img')
    this.draw(image, 0, 0, image.width, image.height, (this.canvas.width / 2 - 320 / 2), 118, 320, 302);
  }

  /**
   * 创建成绩
   */
  createChengji(name, value, i) {
    this.ctx.font = '18px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(
      name,
      (this.canvas.width / 2 - 100 / 2),
      (522 / 2 + i * 50 / 1.5),
    )

    this.ctx.font = '18px Arial';
    this.ctx.fillStyle = '#fff300';
    this.ctx.fillText(
      value,
      (this.canvas.width / 2 + 110 / 2),
      (522 / 2 + i * 50 / 1.5),
    )
  }

  /**
   * 创建按钮
   */
  createBtn() {
    const image = Sprite.getImage('end-btn')
    this.draw(image, 0, 0, image.width, image.height, (this.canvas.width / 2 - 438 / 4), 920 / 2, 438 / 2, 98 / 2)

    this.ctx.font = '18px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(
      '再来一次',
      (this.canvas.width / 2),
      (965 / 2),
    )
  }

  /**
   * 创建金钱图片
   */
  createJinQian() {
    const image = Sprite.getImage('coins-bg-img')
    this.draw(image, 0, 0, image.width, image.height, (this.canvas.width / 2 - 765 / 4), this.canvas.height - 326 / 2, 765 / 2, 326 / 2)
  }
}