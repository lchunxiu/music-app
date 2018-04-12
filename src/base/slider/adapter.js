// 判定是否未移动端
const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
  navigator.userAgent
);
export default class Adapter {
  static adapt(length) {
    let size = this.getViewSize();
    Adapter.width = size.width;
    return {
        adapterSize:size.width,
        wrapperSize:length * size.width,
    }
  }
  static getViewSize() {
    if (isMobile) {
      return {
        width: window.screen.width,
        height: window.screen.height
      };
    } else {
      return {
        width: 360,
        height: 640
      };
    }
  }
}
