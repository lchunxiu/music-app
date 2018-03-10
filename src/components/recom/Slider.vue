<template>
    <div>
        <ul>
            <li v-for='item in sliderList' :key='item.id'>
                <img :src="item.picUrl" alt=""/>
            </li>
        </ul>
        <p>{{ sliderList}}</p>
    </div>
</template>

<script>
export default {
  props: ["sliderList"],
  mounted: function() {
    console.log("this", this.sliderList);
  },
  updated:function(){
    console.log("this", this.sliderList);
    console.log('updated')
  }
};
</script>

<style lang='stylus' scoped>
</style>