<template>
  <div class="list-root">
    <div class="tit">{{ listData.name }}

      <div class="wenhao"
           data-desc="listData.titDesc"
           v-if="listData.titDesc"
           @click="mergeStep(listData)">
      </div>

    </div>
    <ul class="list clearfix" v-if="!!listData.list.length">
      <li  class="list-item fl"
          v-for="item in listData.list"
          :key="item"
          :style="{'background': listData.color}"
          >{{ item }}</li>
    </ul>
    <ul class="list clearfix" v-else>
      <li class="list-item fl" :style="{'background': listData.color}">暂无{{ listData.name }}</li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: ['listData'],
  methods: {
    ...mapMutations(['mergeStep'])
  }
}
</script>

<style lang="scss" scoped>
.list-root {
  margin: 0 auto 0.3rem;
  width: 6.6rem;
  .tit {
    font-size: 0.28rem;
    color: #7777A4;

    .wenhao{
      position: relative;
      display: inline-block;
      width: 0.26rem;
      height: 0.26rem;
      background: url('../assets/tip.png') no-repeat;
      background-size: cover;
      z-index: 10;
      vertical-align: -0.03rem;
      cursor: pointer;
    }
  }

  .list {
    .list-item {
      margin: 0.1rem 0.20rem 0 0;
      padding: 0.04rem 0.1rem;
      font-size: 0.28rem;
      color: #fff;
      background-color: #6681FF;
      border-radius: 0.06rem;
    }
  }

  &.personal-tag {
    .list {
      .list-item {
        background-color: rgba(175,134,253,1);
      }
    }
  }

  &.bad-words {
    .list {
      .list-item {
        background:rgba(238,120,127,1);
      }
    }
  }
}
</style>
