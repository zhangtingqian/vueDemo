<template>
<div class="progress-root clearfix">
  <div class="left fl"></div>
  <div class="right fl">
    <div class="voice-progress">
      <span class="split"></span>
      <span class="split"></span>
      <div class="progress-speed" :style="{'width': width + 'rem'}"></div>
      <i class="tip">较小</i>
      <i class="tip">合格</i>
      <i class="tip">较大</i>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      required: true
    }
  },
  computed: {
    width () {
      // 0 50 70 100
      var width = 5.6 / 3, num = this.size
      return num <= 50 ? width * num / 50 : (num <=70 ? 2 * width * num / 70 : 560 * num / 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-root {
  margin: 0 auto 1rem;
  position: relative;
  width: 6.6rem;
  .left {
    position: relative;
    z-index: 2;
    width: 0.78rem;
    height: 0.78rem;
    background: #e1e2ff url('../assets/horn.png') no-repeat center center;
    border-radius: 50%;
  }
  .right {
    position: absolute;
    z-index: 1;
    top: 0.2rem;
    left: 0.5rem;
    width: 5.96rem;
    height: 0.40rem;
    background: #e1e2ff;
    border-radius: 0.25rem;
    .voice-progress {
      position: absolute;
      top: 0.05rem;
      right: 0.06rem;
      width: 5.60rem;
      height: 0.30rem;
      background: #CECEFB;
      border-radius: 0.4rem;
      .split {
        position: absolute;
        z-index: 2;
        height: 100%;
        width: 0.01rem;
        background: #fff;

        &:nth-of-type(1) {
          left: 33.33%;
        }
        &:nth-of-type(2) {
          left: 66.66%;
        }
      }
      .progress-speed {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 0.3rem;
        background: linear-gradient(to right, #7EAAFF , #C66CEF);
        border-radius: 0.4rem;
      }
      .arrow {
        position: absolute;
        bottom: -0.18rem;
        width: 0;
        height: 0;
        border: 0.10rem solid #6150ff;
        border-color: #6150ff transparent transparent transparent;
      }
      .tip {
        position: absolute;
        bottom: -0.44rem;
        color: #7777a4;
        font-size: 0.22rem;

        &:nth-of-type(1) {
          left: 14%;
        }
        &:nth-of-type(2) {
          left: 47%;
        }
        &:nth-of-type(3) {
          left: 80%;
        }
      }
    }
  }
}
</style>
