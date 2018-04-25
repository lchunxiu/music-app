<template>
    <div ref='hammerArea' class='slider-container'>
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
import Hammer from "hammerjs";
import _ from "lodash";
export default {
  props: ["imageList"],
  data: function() {
    return {
      scroll: {
        current: 0,
        timeHandler: undefined,
        isRun: true
      },
      coverAdapterStyles: new Array(this.imageList.length),
      mc: undefined
    };
  },
  computed: {
    style: function() {
      let length = this.imageList.length,
        size = Adapter.adapt(length),
        res = {
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
    getNextIndex: function(current, length) {
      return (current + 1) % length;
    },
    getPreIndex: function(current, length) {
      return (current - 1 + length) % length;
    },
    getIndex: function(current) {
      let length = this.imageList.length;
      return {
        current: current,
        pre: this.getPreIndex(current, length),
        next: this.getNextIndex(current, length)
      };
    },
    translateImage: function(index, x, transitionDuration = "0s") {
      this.$set(this.coverAdapterStyles, index, {
        transitionDuration: transitionDuration,
        transform: "translateX(" + -x + "px)"
      });
    },
    setInitPosition: function() {
      this.translateImage(
        this.scroll.current,
        Adapter.width * this.scroll.current,
        "0s"
      );
    },
    setAnimationPosition: function(toIndex) {
      let { current, pre, next } = this.getIndex(toIndex),
        delta = 1;

      [pre, current].forEach(index => {
        this.translateImage(index, Adapter.width * (index + delta), ".5s");
        delta--;
      });
      this.translateImage(next, Adapter.width * (next - 1), "0s");
    },
    run: function() {
      let next = this.getNextIndex(this.scroll.current, this.imageList.length);
      this.setAnimationPosition(next);
      this.scroll.current = next;
    },
    autoRun: function() {
      this.scroll.timeHandler = setTimeout(() => {
        if (this.scroll.isRun) {
          this.run();
        }
        this.autoRun();
      }, 2000);
    },
    panTranslate: function(deltaX) {
      let { current, pre, next } = this.getIndex(this.scroll.current),
        delta = 1;
      [pre, current, next].forEach(index => {
        this.translateImage(
          index,
          Adapter.width * (index + delta) - deltaX,
          "0s"
        );
        delta--;
      });
    },
    pan: function({ deltaX }) {
      // 偏移
      this.scroll.isRun = false;
      this.panTranslate(deltaX);
    }
  },
  mounted: function() {
    this.mc = new Hammer(this.$refs.hammerArea);
    this.mc.get("pan").set({
      direction: Hammer.DIRECTION_ALL
    });
    this.mc.on(
      "panleft panright",
      function(ev) {
        this.pan(ev);
      }.bind(this)
    );
    this.mc.on(
      "panleft panright",
      _.debounce(({ deltaX }) => {
        // 判断deltaX是否过半，如果过半，则向左/向右轮播，如果没有复原
        let toIndex = this.scroll.current,
          length = this.imageList.length;
        if (Math.abs(deltaX) > Adapter.width / 2) {
          switch (Math.sign(deltaX)) {
            case -1:
              toIndex = this.getNextIndex(this.scroll.current, length);
              break;
            case 1:
              toIndex = this.getPreIndex(this.scroll.current, length);
              break;
          }
        }
        this.setAnimationPosition(toIndex);
        this.scroll.current = toIndex;
        // 开启
        setTimeout(() => {
          this.scroll.isRun = true;
        }, 1000);
      }),
      0
    );
    document.addEventListener("visibilitychange", this.changeRunState);
  },
  changeRunState: function() {
    this.scroll.isRun = !document.hidden;
  },
  updated: function() {
    if (!this.scroll.timeHandler) {
      // 开始动画轮播
      this.setInitPosition();
      this.autoRun();
    }
  },
  destoryed: function() {
    document.removeEventListener("visibilitychange", this.changeRunState);
    this.mc.off("panleft panright");
  }
};
</script>

<style lang='stylus' scoped>
.slider-container {
  width: 100%;
  position: relative;
  overflow: hidden;

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
      -webkit-backface-visibility: hidden; // 移动端出现闪烁
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