<template>
    <scroll-slider :slider-list='slider'/>
</template>
<script>
    import ScrollSlider from './Slider'
    import {getRecom} from 'api/recom' 
    export default {
        data:function(){
            return {
                slider:[],
                message:'message from parent'
            };
        },
        components:{
            ScrollSlider:ScrollSlider
        },
        created:function(){
            getRecom().then(data=>{ 
                this.slider = data.slider;
            })
        }
    }
</script>