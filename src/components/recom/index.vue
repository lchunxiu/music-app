<template>
    <scroll-slider/>
</template>
<script>
    import ScrollSlider from './Slider'
    export default {
        data:function(){
            return {
                message:'message from parent'
            };
        },
        components:{
            ScrollSlider:ScrollSlider
        }
    }
</script>