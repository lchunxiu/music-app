<template>
    <div class='slider-container'>
        <ul id='wrapper'>
            <li v-for='item in sliderList' :key='item.id'>
                <a><img :src="item.picUrl" @load="imgLoaded" width='400' alt=""/></a>
            </li>
        </ul>
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
        step: 0,
        allStep: 0
      }
    };
  },
  methods: {
    imgLoaded: function() {
      console.log("image loaded");
      this.slider.init();
    },
    stepChange: function(step, allStep) {
      this.scroll.step = step;
      this.scroll.allStep = allStep;
    },
    isActive(step, index) {
      return step === index;
    }
  },
  mounted: function() {
    this.slider = new ScrollSlider("#wrapper", {
      stepChange: this.stepChange
    });
    this.slider.init();
  },
  updated: function() {}
};
</script>

<style lang='stylus' scoped>
#wrapper {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    ul& {
        list-style: none;
        li {
            display:block;
            transition-duration:400ms;
            position:relative;
            float:left;
        }
    }
}

.slider-container{
    width:100%;
    position:relative;
}

.slider-nav {
    height: 20px;
    background-color: transparent;  
    width: 100%;
    z-index: 1;
    position: absolute;
    bottom: 20px;
    margin: 0 auto;
    text-align: center;

    b {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: rgba(144, 144, 144, 0.8);
        margin: 0 4px;

        &.active {
            background-color: #FFF;
        }
    }
}
</style>