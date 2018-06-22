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
    this.dataStore = DataStore.getInstance()
    this.user = {}
    this.chengji = [
      '成绩',
      '积分',
      '现金',
      '代币'
    ]
  }

  drawPage() {
    this.user = this.dataStore.get('user') || {}
    this.createPeopleImg()
    this.createJinQian()
    this.createName()
    this.createDaTiJieGuo()
    this.createBtn()
    this.showFenShu()
  }

  // 显示分数
  showFenShu() {
    const {
      user
    } = this
    let arr = [user.score, user.integral, user.balance, user.tokens]

    arr.forEach((item, index) => {
      let f = ''
      if (index) f = '+'
      this.createChengji(this.chengji[index], `${f}${item}`, index)
    })
  }

  /**
   * 创建人物头像
   */
  createPeopleImg() {
    const image = wx.createImage()
    // const image = Sprite.getImage('window-img')
    const canvasWidth = this.canvas.width / 2
    image.src = this.user.avatar
    // this.ctx.save()
    this.drawYuan(image, canvasWidth - 120 / 4, 80, 66 / 2, 66 / 2);
    // this.ctx.restore()
  }

  /**
   * 创建人物名称
   */
  createName() {
    const canvasWidth = this.canvas.width / 2
    this.ctx.font = '18px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(
      this.user.nickname,
      canvasWidth + 10,
      80 + 66 / 4,
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