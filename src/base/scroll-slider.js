export default class ScrollSlider{
    constructor(options){
        this.ele = options.ele;
        this.scroller = this.ele.querySelector('.scroller');
        this.images = [];
    }
    init(){
        /* 将图片宽度设置成与屏幕宽度一致 */
        this.images = this.ele.getElementsByTagName('img');
        let screen = this.getScreen(),
            length = this.images.length;
        for(let i =0;i<length;i++){
            this.images[i].setAttribute('width',screen.width);
        }

        if(length>0){
            let img = {width:this.images[0].width, height:this.images[0].height};
            this.ele.style.height = Math.floor(img.height)+'px';
            this.ele.style.width = Math.floor(img.width)+'px';
            this.scroller.style.width = Math.floor(img.width*length)+'px';
            this.scroller.style.position = 'absolute';
            this.scroller.style.height = Math.floor(img.height)+'px';
        }
        /* 自动轮播 */

        /* 监听屏幕宽度变化时，重新设置宽度 */


    }
    getScreen(){
        return {
            width:window.screen.width,
            height:window.screen.height
        };
    }
}