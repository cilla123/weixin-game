import Sprite from "../base/Sprite";
import DataStore from "../base/DataStore";

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

  drawPage(){
    this.createTitle();
    this.createContent();
    this.createMoneyPackage();
    this.getRule()
  }

  /**
   * 创建标题
   */
  createTitle(){
    const image = Sprite.getImage('facaiwenda');
    this.draw(image, 0, 0, image.width, image.height, DataStore.getInstance().canvas.width / 2 - 129, 75, 258, 83);
  }

  /**
   * 创建内容
   */
  createContent(){
    const image = Sprite.getImage('guize-bg-img');
    this.draw(image, 0, 0, image.width, image.height, DataStore.getInstance().canvas.width / 2 - 157, 180, 315, 345);
  }

  /**
   * 创建钱包
   */
  createMoneyPackage(){
    const image = Sprite.getImage('money');
    this.draw(image, 0, 0, image.width, image.height, 208, 466, 148, 137);
  }

  /**
   * 创建规则内容
   */
  createRuleText(){
    this.ctx.font = '18px Arial';
    this.ctx.fillStyle = '#333';
    this.ctx.fillText(
      this.ruleText,
      44,
      223,
    );
  }

  /**
   * 获取规则
   */
  getRule(){
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