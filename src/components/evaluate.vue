<template>
  <div class="evaluate">
    <div v-for="(val, key) in desc" :key="key">
      <span class="tit" v-if="key">{{key}}:<span class="wenhao" v-if="key == '流畅度'" @click="mergeStep({name:'流畅度', titDesc: '判断两句话之间的停顿时长是否合理，整段话的停顿频率是否适当，计算留白率。'})"></span></span>
      <span class="desc">{{ val }}</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: ['desc'],
  methods: {
    ...mapMutations(['mergeStep'])
  }
}
</script>

<style lang="scss" scoped>
.evaluate {
  margin: 0.4rem auto 0;
  padding: 0.2rem;
  font-size:0.28rem;
  color:rgba(119,119,164,1);
  line-height:0.4rem;
  width:6.6rem;
  background:rgba(221,218,240,1);
  border-radius:0rem 0.16rem 0.16rem 0.16rem;
  box-sizing: border-box;
  span {
    display: inline-block;
    vertical-align: text-top;
  }
  .tit {
    min-width:1.3rem;
    font-weight: bold;
    .wenhao {
      display: inline-block;
      margin-left: 0.06rem;
      width: 0.26rem;
      height: 0.26rem;
      background: url('../assets/tip.png') no-repeat;
      background-size: cover;
      z-index: 10;
      vertical-align: -1px;
      cursor: pointer;
      vertical-align: -0.03rem;
    }
  }
  .desc {
    max-width: 4.6rem;
    word-break: break-all;
  }
}
</style>
