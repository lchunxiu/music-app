// import IScroll from 'iscroll'
import Hammer from 'hammerjs'
import _ from 'lodash'

export default class ScrollSlider{
    constructor(selector, options){
        this.ele = document.querySelector(selector);
        this.navs = [];
        this.images = [];
        this.lis = [];
        this.screen;
        this.scroll={
            maxStep:undefined,
            preStep:undefined,
            step:undefined,
            stepWidth:undefined,
            stepChange:options.stepChange || function(){}
        };
        this.timeHandler;
        this.resizeHandler = _.debounce(this.balanceScreen.bind(this),150)
        this.mc = new Hammer(this.ele);
        this.mc.on("panleft panright", function(ev) {
            console.log('gesture',ev)  
          });
    }
    init(){
        /* 将图片宽度设置成与屏幕宽度一致 */
        this.images = this.ele.getElementsByTagName('img');
        this.lis = this.ele.getElementsByTagName('li');
        this.balanceScreen();

        /* 自动轮播 */
        this.timeHandler && window.clearTimeout(this.timeHandler);
        this.timeHandler = window.setTimeout(this.switchPic.bind(this),4000)
        this.scroll.stepChange(this.scroll.step+1,this.scroll.maxStep);

        /* 监听屏幕宽度变化时，重新设置宽度 */
        window.removeEventListener('resize',this.resizeHandler)
        window.addEventListener('resize',this.resizeHandler)
    }
    switchPic(){
        this.scroll.preStep = this.scroll.step;
        this.scroll.step++;
        this.scroll.step = this.scroll.step%this.scroll.maxStep;
        
        this.scroll.stepChange(this.scroll.step+1,this.scroll.maxStep);
        this.translate(this.lis[this.scroll.preStep],-this.screen.width);
        this.translate(this.lis[this.scroll.step],0);
        
        this.timeHandler && window.clearTimeout(this.timeHandler);
        this.timeHandler = window.setTimeout(this.switchPic.bind(this),4000)
    }
    balanceScreen(){
        this.screen = this.getScreen();
        let length = Math.min(this.images.length,this.lis.length);
        for(let i =0;i<length;i++){
            this.images[i].setAttribute('width',this.screen.width);
            this.lis[i].style.transform = 'translateX('+(-this.screen.width)+'px)';
        }
        length>0 && (this.lis[0].style.transform = 'translateX('+0+'px)');

        if(length>0){
            let img = {width:this.images[0].width, height:this.images[0].height};
            this.ele.style.height = Math.floor(img.height)+'px';
            this.ele.style.width = Math.floor(img.width)+'px';
        }

        this.scroll.step = 0;
        this.scroll.maxStep = length;
        this.scroll.stepWidth = this.screen.width;
    }
    getScreen(){
        return {
            width:window.screen.width,
            height:window.screen.height
        };
    }
    translate(ele,x){
        ele.style.transform = 'translateX('+x+'px)';
    }
}