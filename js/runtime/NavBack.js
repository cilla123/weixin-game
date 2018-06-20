import Sprite from "../base/Sprite";
import DataStore from "../base/DataStore";

/**
 * 返回导航
 */
export default class NavBack extends Sprite {
  constructor() {
    const image = Sprite.getImage('nav-back');
    super(image, 0, 0, image.width, image.height, 18, 32, 22, 18);
  }
}