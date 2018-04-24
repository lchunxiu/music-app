
export default class Adapter {
  static adapt(length) {
    let size = Adapter.getViewSize();
    Adapter.width = size.width;
    return {
        adapterSize:size.width,
        wrapperSize:length * size.width,
    }
  }
  static getViewSize() {
    let pageSize = {
      width:window.innerWidth,
      height:window.innerHeight
    };
    return pageSize;
  }
}
