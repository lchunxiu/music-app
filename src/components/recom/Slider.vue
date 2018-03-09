<template>
    <p>slider</p>
</template>

<script>
    export default {
        props:['sliderList'],
        created:function(){
            console.log('sliderList',this.sliderList)
        }
    }
</script>

<style lang='stylus' scoped>
</style>