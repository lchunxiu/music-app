<template>
    <div id='wrapper' ref='slider'>
        <div class="scroller">
            <ul>
                <li v-for='item in sliderList' :key='item.id'>
                    <img :src="item.picUrl" @load="imgLoaded" width='400' alt=""/>
                </li>
            </ul>
        </div>
        <p class="slider-nav">
            <b v-for='index in scroll.allStep' :key='index' :class='{active:scroll.step === index}'/>
        </p>
    </div>
</template>

<script>
import { ScrollSlider } from "base";

export default {
  props: ["sliderList"],
  data: function() {
    return {
      slider: undefined,
      scroll: {
          step:0,
          allStep:0
      },

    };
  },
  methods: {
    imgLoaded: function() {
      console.log("image loaded");
      this.slider.init();
    },
    stepChange:function(step,allStep){
        this.scroll.step= step;
        this.scroll.allStep = allStep;
    },
    isActive(step,index){
        return step === index;
    }
  },
  mounted: function() {
    this.slider = new ScrollSlider("#wrapper",{
        stepChange:this.stepChange
    });
    this.slider.init();
  },
  updated: function() {
  }
};
</script>

<style lang='stylus' scoped>
#wrapper {
    position: relative;
    overflow: hidden;
}

.scroller {
    position: absolute;
    z-index: 1;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background-color: #a00;
    transform: translateZ(0);
    user-select: none;
    text-size-adjust: none;
    transition: transform 400ms cubic-bezier(0,1.24,.12,.87) !important;

    ul {
        list-style: none;

        li {
            display: inline-block;
            float: left;
        }
    }
}

.slider-nav {
    height: 20px;
    background-color: transparent;
    width :100%;
    z-index:1;
    position:absolute;
    bottom:20px;
    margin:0 auto;
    text-align:center;
    b{
        display:inline-block;
        width:6px;
        height:6px;
        border-radius:50%;
        background-color:rgba(144,144,144,.8);
        margin :0 4px;
        &.active{
            background-color:#FFF;
        }
    }
}
</style>