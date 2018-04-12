/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// import MyButton from './MyButton.vue';
// import Welcome from './Welcome.vue';
import Slider from '../base/slider/Slider.vue'
import {getRecom} from '../api/recom' 

storiesOf('app slider',module).addDecorator(story => ({
 template:'<div :style="style"><story/></div>',
 data:function(){
    return {
      style: {
        margin:'0 auto',
        width:'360px',
        height:'400px',
        border:'1px solid grey'
      },
    };
  }
})).add('music-slider',()=>({
  components: { Slider },
  template: "<slider :image-list='slider' />",
  methods: { action: linkTo('slider') },
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
}))
