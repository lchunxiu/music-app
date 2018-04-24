<template>
    <slider :image-list='slider' />
</template>

<script>
import Slider from '../../base/slider/Slider.vue'
import {getRecom} from '../../api/recom' 

export default {
  components: { Slider },
  methods: { },
  data:function(){
      return {
          slider:[]
      };
  },
  created:function(){
      getRecom().then(data=>{ 
          this.slider = data.slider;
      })
  }
};
</script>