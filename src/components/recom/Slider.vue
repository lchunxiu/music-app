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
            <b/>
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
      scroll: undefined
    };
  },
  methods: {
    imgLoaded: function() {
      console.log("image loaded");
      this.slider.init();
    }
  },
  mounted: function() {
    this.slider = new ScrollSlider("#wrapper");
    this.slider.init();
  },
  updated: function() {
    this.slider.init();
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

    ul {
        list-style: none;

        li {
            display: inline-block;
            float: left;
        }
    }
}

.slider-nav {
    height: 200px;
    background-color: green;
    width:100%;
    z-index:1;
    position:absolute;
}
</style>