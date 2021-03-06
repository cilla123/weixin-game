import Sprite from "../base/Sprite";
import DataStore from "../base/DataStore";
import DaTi from '../pages/Dati'
import AllEvent from '../event'

/**
 *  答题
 */
export default class DatiNr extends Sprite {
  constructor() {
    super()
    this.dataStore = DataStore.getInstance()
    this.ctx = DataStore.getInstance().ctx
    this.canvas = DataStore.getInstance().canvas
    this.data = ''
    this.time = ''
  }

  // 初始化赋值
  init() {
    this.data = this.dataStore.get('dati')
    this.time = this.dataStore.get('time')
  }

  drawPage() {
    this.init()

    this.createBox()
    this.createDaTiBox()
    this.createDaTiText(`${this.time.current+1}${this.data.topicResultList[this.time.current].topicName}`)
    this.createTishi()
    this.createShiJian()
    this.createHuaDiao()
    this.createJinDu()
    this.createDaAn()
    if (!this.time.timer) {
      this.createTimeDingShiQi()
    }
  }

  // 定时器
  createTimeDingShiQi() {
    this.jisuanshijian(this.time.currentTime)
    this.createTime(this.time.time)
    this.time.timer = setInterval(() => {
      if (this.time.currentTime == 0) {
        clearInterval(this.time.timer)
        this.time.timer = null
        // 时间到了
        this.dataStore.put('ejectText1', '挑战失败！')
        const AllEvent1 = AllEvent.getInstance()
        console.log(AllEvent1)
        AllEvent1.getAnswer({
          id: 0
        }, 2)
        return false
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      DaTi.getInstance().init()

      this.time.currentTime -= 1
      this.jisuanshijian(this.time.currentTime)
      this.createTime(this.time.time)
    }, 1000)
  }

  // 计算时间
  jisuanshijian(time) {
    let [s, f] = [0, 0]

    if (time >= 60) {
      s = (time % 60)
      f = parseInt(time / 60)
    } else {
      f = 0
      s = time
    }
    f = f + ''
    s = s + ''
    if (f.length === 1) f = `0${f}`
    if (s.length === 1) s = `0${s}`
    this.time.time = `${f}:${s}`
  }

  // 创建答案
  createDaAn() {
    const list = this.dataStore.get('dati').topicResultList[this.time.current]
    const wrongAnswer = this.dataStore.get('wrongAnswer') || {}
    list.answerList.forEach((item, index) => {
      if (wrongAnswer[item.id]) item.btn = 2
      this.createChange(item.name, index, item.btn)
    })
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
    this.ctx.save()
    this.ctx.font = '33px Arial'
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      time,
      canvasWidth,
      240 / 2,
    )
    this.ctx.restore()
  }

  /**
   * 创建答题内容框
   */
  createDaTiBox() {
    const canvasWidth = this.canvas.width / 2
    this.drawRoundedRect(canvasWidth - (260 / 2), 150, 260, 125, 10, '#ffffd2')
  }

  /**
   * 创建答题文字
   */
  createDaTiText(text) {
    const canvasWidth = this.canvas.width / 2
    this.ctx.font = '18px Arial'
    this.ctx.fillStyle = '#333'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(
      text,
      canvasWidth - 110,
      212,
      200
    )
  }

  /**
   * 创建选择按钮
   */
  createChange(text, i, btn) {
    const image = Sprite.getImage(this.btnColor(btn) || 'button-default')
    const canvasWidth = this.canvas.width / 2
    let xuanze = this.xuanxian(i)
    this.draw(image, 0, 0, image.width, image.height, canvasWidth - 538 / 4, 602 / 2 + 62 * i, 538 / 2, 98 / 2)

    this.ctx.font = '18px Arial'
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(
      `${xuanze}${text}`,
      canvasWidth - 110,
      602 / 2 + 62 * i + 24
    );
  }

  // 判断按钮颜色是否正确
  btnColor(key) {
    let color = ''
    key = parseInt(key)

    switch (key) {
      // 正确
      case 1:
        color = 'button-right'
        break;
        // 错误答案
      case 2:
        color = 'button-wrong'
        break;
      default:
        break;
    }
    return color
  }

  /**
   * 创建提示锦囊
   */
  createTishi() {
    const image = Sprite.getImage('TIPS_ic');
    const canvasWidth = this.canvas.width / 2
    this.draw(image, 0, 0, image.width, image.height, canvasWidth - 92 / 2, 1090 / 2, 66 / 2, 66 / 2);
  }


  /**
   * 创建时间锦囊
   */
  createShiJian() {
    const image = Sprite.getImage('add10s_ic');
    const canvasWidth = this.canvas.width / 2
    this.draw(image, 0, 0, image.width, image.height, canvasWidth + 12, 1090 / 2, 66 / 2, 66 / 2);
  }

  /**
   * 创建划掉锦囊
   */
  createHuaDiao() {
    const image = Sprite.getImage('AB_ic');
    const canvasWidth = this.canvas.width / 2
    this.draw(image, 0, 0, image.width, image.height, canvasWidth + (148 / 2), 1090 / 2, 66 / 2, 66 / 2);
  }

  /**
   * 创建答题进度
   */
  createJinDu() {
    const image = Sprite.getImage('title_ic');
    const canvasWidth = this.canvas.width / 2
    this.draw(image, 0, 0, image.width, image.height, canvasWidth - (214 / 2), 1090 / 2, 66 / 2, 66 / 2);
  }

  xuanxian(v) {
    let a = ''
    switch (v) {
      case 0:
        a = 'A：'
        break;
      case 1:
        a = 'B：'
        break;
      case 2:
        a = 'C：'
        break;
      case 3:
        a = 'D：'
        break;

      default:
        break;
    }
    return a
  }
}