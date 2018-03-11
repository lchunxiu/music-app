import IScroll from 'iscroll';
let rAF = window.requestAnimationFrame	||
	window.webkitRequestAnimationFrame	||
	window.mozRequestAnimationFrame		||
	window.oRequestAnimationFrame		||
	window.msRequestAnimationFrame		||
    function (callback) { window.setTimeout(callback, 1000 / 60); };

export default class ScrollSlider{
    constructor(selector, options){
        this.ele = document.querySelector(selector);
        this.scroller = this.ele.querySelector('.scroller');
        this.images = [];
        this.iscroll = new IScroll(selector,{
            eventPassthrough:true,
            scrollX: true,
            scrollY: false,
            preventDefault: false
        });
        this.screen;
        this.scroll={
            maxStep:undefined,
            step:undefined,
            stepWidth:undefined
        };
        this.timeHandler;
    }
    init(){
        /* 将图片宽度设置成与屏幕宽度一致 */
        this.images = this.ele.getElementsByTagName('img');
        this.screen = this.getScreen();
        let length = this.images.length;
        for(let i =0;i<length;i++){
            this.images[i].setAttribute('width',this.screen.width);
        }

        if(length>0){
            let img = {width:this.images[0].width, height:this.images[0].height};
            this.ele.style.height = Math.floor(img.height)+'px';
            this.ele.style.width = Math.floor(img.width)+'px';
            this.scroller.style.width = Math.floor(img.width*length)+'px';
            this.scroller.style.position = 'absolute';
            this.scroller.style.height = Math.floor(img.height)+'px';
        }

        this.scroll.step = 0;
        this.scroll.maxStep = length;
        this.scroll.stepWidth = this.screen.width;

        /* 自动轮播 */
        this.timeHandler = window.setTimeout(this.switchPic.bind(this),4000)

        /* 监听屏幕宽度变化时，重新设置宽度 */


    }
    switchPic(){
        this.iscroll.scrollTo(-(this.scroll.step*this.scroll.stepWidth), 0);
        this.scroll.step++;
        if(this.scroll.step>=this.scroll.maxStep){
            this.scroll.step = 0;
        }
        this.timeHandler && window.clearTimeout(this.timeHandler);
        this.timeHandler = window.setTimeout(this.switchPic.bind(this),4000)
    }
    getScreen(){
        return {
            width:window.screen.width,
            height:window.screen.height
        };
    }
}