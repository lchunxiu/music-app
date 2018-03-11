<template>
    <div id='wrapper' ref='slider'>
        <div class="scroller">
            <ul>
                <li v-for='item in sliderList' :key='item.id'>
                    <img :src="item.picUrl" width='400' alt=""/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ScrollSlider } from 'base';
import IScroll from 'iscroll';

export default {
  props: ["sliderList"],
  data:function(){
      return {
          slider:undefined,
          scroll:undefined
      }
  },
  mounted:function(){
    this.slider = new ScrollSlider({ele:this.$refs.slider});
    this.slider.init();    
  },
  updated:function(){
    this.slider.init();
      this.scroll = new IScroll('#wrapper',{
          eventPassthrough:true,
          scrollX: true,
          scrollY: false,
          preventDefault: false
      });
  }
};
</script>

<style lang='stylus' scoped>
    #wrapper{
        position:relative;
        overflow :hidden;
    }

    .scroller{
        position: absolute;
        z-index: 1;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        background-color: #a00;
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-text-size-adjust: none;
        -moz-text-size-adjust: none;
        -ms-text-size-adjust: none;
        -o-text-size-adjust: none;
        text-size-adjust: none;
        ul{
            list-style:none;
            li{
                display:inline-block;
                float:left;
            }
        }
    }

</style>