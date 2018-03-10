<template>
  <div id="app">
    <div class='music-header'>
      <i class='qq-logo'/>
    </div>
    <div class="music-nav">
      <router-link to='/recom'>推荐</router-link>
      <router-link to='/toplist'>排行榜</router-link>
      <router-link to='/search'>搜索</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="stylus">
@import './common/stylus/variables';

html, * {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $color-background-base;
}

.music-header {
  background-color: $color-background-highlight;
  height: 44px;
}

.qq-logo {
  background-image: url('./assets/logo.png');
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  height: 25px;
  width: 90px;
  margin: 10px 0 0 10px;
}

.music-nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color :#FFF;

  >a {
    flex: 1 1 auto;
    font-size: $font-size-title;
    color: $color-font-base;
    text-decoration: none;
    text-align: center;
    height: 40px;
    line-height: @height;
    vertical-align: middle;
  }

  >a.router-link-active {
    color: $color-font-highlight;
    border-bottom: 2px $color-font-highlight solid;
  }
}
</style>
