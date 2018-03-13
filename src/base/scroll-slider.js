import IScroll from 'iscroll'
import Hammer from 'hammerjs'
import _ from 'lodash'

export default class ScrollSlider{
    constructor(selector, options){
        this.ele = document.querySelector(selector);
        this.scroller = this.ele.querySelector('.scroller');
        this.navs = [];
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
            stepWidth:undefined,
            stepChange:options.stepChange || function(){}
        };
        this.timeHandler;
        this.resizeHandler = _.debounce(this.balanceScreen.bind(this),150)
        this.mc = new Hammer(this.scroller);
        this.mc.on("panleft panright", function(ev) {
            // let transformWidth = this.scroll.step*this.scroll.stepWidth;
            // if(ev.type === 'panleft'){
            //     transformWidth += ev.deltaX;
            // }else if(ev.type === 'panleft'){
            //     transformWidth += ev.left;
            // }

            // this.iscroll.scrollTo(-transformWidth, 0);
            // this.timeHandler && window.clearTimeout(this.timeHandler);
            console.log('gesture',ev)  
          });
    }
    init(){
        /* 将图片宽度设置成与屏幕宽度一致 */
        this.images = this.ele.getElementsByTagName('img');
        this.balanceScreen();

        /* 自动轮播 */
        console.log('init setTimeout')
        this.timeHandler && window.clearTimeout(this.timeHandler);
        this.timeHandler = window.setTimeout(this.switchPic.bind(this),0)

        /* 监听屏幕宽度变化时，重新设置宽度 */
        window.removeEventListener('resize',this.resizeHandler)
        window.addEventListener('resize',this.resizeHandler)
    }
    switchPic(){
        this.iscroll.scrollTo(-(this.scroll.step*this.scroll.stepWidth), 0);
        this.scroll.stepChange(this.scroll.step+1,this.scroll.maxStep);
        this.scroll.step++;
        if(this.scroll.step>=this.scroll.maxStep){
            this.scroll.step = 0;
        }
        
        this.timeHandler && window.clearTimeout(this.timeHandler);
        this.timeHandler = window.setTimeout(this.switchPic.bind(this),4000)
    }
    balanceScreen(){
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
    }
    getScreen(){
        return {
            width:window.screen.width,
            height:window.screen.height
        };
    }
}