<template>
<div class="statistics-progress">
  <span class="speed"
        :style="{'width': percent + '%'}">

    <span class="speed-desc"
          :class="{'font': front}">{{ percent }}%</span>
  </span>
</div>
</template>

<script>
export default {
  props: ['percent'],
  computed: {
    front () {
      return this.percent > 80
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics-progress {
  position: relative;
  width:6.3rem;
  height:0.24rem;
  background:rgba(231,233,254,1);
  border-radius: 0.15rem;

  .speed {
    position: absolute;
    left: 0;
    top: 0;
    // width: 20%;
    height: 0.24rem;
    border-radius: 0.15rem;
    background:rgba(148,116,248,1);
  }

  .speed-desc {
    position: absolute;
    right: -0.8rem;
    top: -0.02rem;
    color:rgba(148,116,248,1);
    font-size: 0.24rem;
    font-weight: bold;

    &.font {
      right: 0.2rem;
      color: #e7e9fe;
    }
  }
}
</style>
