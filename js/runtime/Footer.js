import DataStore from "../base/DataStore";
/**
 * 底部
 */
export default class Footer {
  constructor() {
    this.ctx = DataStore.getInstance().ctx;
  }
  draw(color) {
    this.ctx.font = '10px Arial';
    this.ctx.fillStyle = color || '#fff'
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      '2018珠江财讯',
      DataStore.getInstance().canvas.width / 2,
      (DataStore.getInstance().canvas.height - 25),
    )
  }
}