<template>
    <scroll-slider v-bind:sliderList='slider'/>
</template>
<script>
    import ScrollSlider from './Slider'
    import {getRecom} from 'api/recom' 
    export default {
        data:function(){
            return {
                slider:[]
            };
        },
        components:{
            ScrollSlider:ScrollSlider
        },
        created:function(){
            getRecom().then(data=>{ 
                console.log('data',data);
                this.slider = data.slider;
            })
        }
    }
</script>