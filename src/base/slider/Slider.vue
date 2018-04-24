<template>
    <div class='slider-container'>
        <ul :style='style.wrapperStyle'>
            <li v-for='(item, index) in imageList' :key='item.id' :style='[style.adapterStyles[index],coverAdapterStyles[index]]'>
                <a><img :src="item.picUrl" width='100%' alt=""/></a>
            </li>
        </ul>
        <p class="slider-nav">
            <b v-for='index in imageList.length' :key='index' :class='{active:scroll.current === (index-1)}'/>
        </p>
    </div>
</template>

<script>
import Adapter from "./adapter.js";
export default {
  props: ["imageList"],
  data: function() {
    return {
      scroll: {
        current: 0,
        timeHandler: undefined
      },
      coverAdapterStyles: new Array(this.imageList.length)
    };
  },
  computed: {
    style: function() {
      let length = this.imageList.length,
        size = Adapter.adapt(length);
      let res = {
        wrapperStyle: {
          width: size.wrapperSize + "px"
        }
      };
      res.adapterStyles = [];
      for (let i = 0; i < length; i++) {
        res.adapterStyles.push({
          width: size.adapterSize + "px",
          transform: "translateX(" + -(size.adapterSize * (i - 1)) + "px)"
        });
      }
      return res;
    }
  },
  methods: {
    adapt: function() {
      let size = this.adapter.adapt(this.imageList.length);
      this.wrapperSize = size.wrapperSize;
      this.adapterSize = size.adapterSize;
    },
    run: async function() {
      let length = this.imageList.length,
        current = this.scroll.current,
        pre = (this.scroll.current - 1 + length) % length,
        next = (this.scroll.current + 1) % length;

      //首先清除动画
      [current, pre, next].forEach(index => {
        this.coverAdapterStyles[index] = {};
      });

      // 将三张图片放在正确的位置
      // 第一张图片放左边，当前图片放当前位置，第三张图片放右边
      this.$set(this.coverAdapterStyles, current, {
        transform: "translateX(" + -(Adapter.width * current) + "px)"
      });
      this.$set(this.coverAdapterStyles, pre, {
        transform: "translateX(" + -(Adapter.width * (pre - 1)) + "px)"
      });
      this.$set(this.coverAdapterStyles, next, {
        transform: "translateX(" + -(Adapter.width * (next + 1)) + "px)"
      });

      (this.scroll.current = next),
        (current = this.scroll.current % length),
        (pre = (this.scroll.current - 1 + length) % length),
        (next = (this.scroll.current + 1) % length);
      
      await new Promise((resolve)=>{
          setTimeout(resolve,500);
      });
      // 在以上DOM更新完成后开始执行动画
      this.$nextTick(function() {
        this.$set(this.coverAdapterStyles, current, {
          transitionDuration: "0.5s",
          transform: "translateX(" + -(Adapter.width * current) + "px)"
        });
        this.$set(this.coverAdapterStyles, pre, {
          transitionDuration: "0.5s",
          transform: "translateX(" + -(Adapter.width * (pre + 1)) + "px)"
        });
        this.$set(this.coverAdapterStyles, next, {
          transitionDuration: "0.5s",
          transform: "translateX(" + -(Adapter.width * (next - 1)) + "px)"
        });
      });
    },
    autoRun: function() {
      this.scroll.timeHandler = setTimeout(() => {
        this.run();
        this.autoRun();
      }, 2000);
    }
  },
  mounted: function() {},
  updated: function() {
    if (!this.scroll.timeHandler) {
      // 默认显示第一张图片
      this.$set(this.coverAdapterStyles, this.scroll.current, {
        transform: "translateX(" + -(Adapter.width * this.scroll.current) + "px)"
      });
      // 开始动画轮播
      this.autoRun();
    }
  }
};
</script>

<style lang='stylus' scoped>
.slider-container {
  width: 100%;
  position: relative;
  overflow :hidden;
  ul {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: block;
      position: relative;
      float: left;
    }
  }
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