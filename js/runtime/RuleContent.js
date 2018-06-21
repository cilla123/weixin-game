import Sprite from "../base/Sprite";
import DataStore from "../base/DataStore";
import AllEvent from '../event'
/**
 * 规则内容
 */
export default class RuleContent extends Sprite {

  constructor() {
    super();
    this.ctx = DataStore.getInstance().ctx;
    this.ruleText = '--'
    this.isGetRuleSuccess = false
  }

  drawPage() {
    this.createTitle();
    this.createContent();
    this.createMoneyPackage();
    this.createBtnImg()
    this.createBtnText()
    this.createTitileText()

    this.getRule()
    this.registerEvent()
  }

  /**
   * 创建标题
   */
  createTitle() {
    const image = Sprite.getImage('facaiwenda');
    this.draw(image, 0, 0, image.width, image.height, DataStore.getInstance().canvas.width / 2 - 129, 75, 258, 83);
  }

  /**
   * 创建内容
   */
  createContent() {
    const image = Sprite.getImage('guize-bg-img');
    this.draw(image, 0, 0, image.width, image.height, DataStore.getInstance().canvas.width / 2 - 157, 180, 315, 345);
  }

  /**
   * 创建钱包
   */
  createMoneyPackage() {
    const image = Sprite.getImage('money');
    this.draw(image, 0, 0, image.width, image.height, 208, 466, 148, 137);
  }

  /**
   * 创建规则标题
   */
  createTitileText() {
    this.ctx.font = '18px Arial';
    this.ctx.fillStyle = '#333';
    this.ctx.textAlign= 'center'
    this.ctx.fillText(
      '游戏规则',
      184,
      230,
    );
  }

  /**
   * 创建规则内容
   */
  createRuleText() {
    this.ctx.font = '13px Arial';
    this.ctx.fillStyle = '#333';
    this.ctx.textAlign= 'left'
    this.ctx.fillText(
      this.ruleText,
      62,
      260,
      311
    );
  }

  // 点击开始事件
  registerEvent() {
    wx.onTouchStart((res) => {
      const x = [30, 187]
      const y = [532, 581]
      AllEvent.getInstance().start(res, x, y)
    })
  }

  /**
   * 创建开始按钮图片
   */
  createBtnImg() {
    const image = Sprite.getImage('start-btn');
    this.draw(image, 0, 0, image.width, image.height, 30, 532, 157, 49);
  }

  /**
   * 创建按钮文案
   */
  createBtnText() {
    this.ctx.font = '18px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign= 'center'
    this.ctx.fillText(
      '开始答题',
      110,
      560,
    );
  }

  /**
   * 获取规则
   */
  getRule() {
    const _this = this
    if (!_this.isGetRuleSuccess) {
      wx.request({
        url: 'http://123.207.248.168:8081/prfinance/api/app/que/getQueRule.json',
        method: 'POST',
        data: {},
        header: {
          'sessionId': 'aa7b5f32d32b9f9f38e3e345d06ad972',
        },
        success(response) {
          response = response.data
          if (response.status == "2000000") {
            _this.isGetRuleSuccess = true
            _this.ruleText = response.data
            _this.createRuleText()
          }
        }
      });
    }
  }
}