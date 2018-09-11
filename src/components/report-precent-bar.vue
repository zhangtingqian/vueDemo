<template>
<div>
  <div class="bar-root"
       :class="{'no_data': !barData.my}">

    <div class="tit clearfix">
      <p class="name fl">{{ barData.name }}&nbsp;</p>
      <p class="top-float fl">&nbsp;(平均分数<span>{{ barData.avg }}</span>&nbsp;&nbsp;最高分{{ barData.high }})<span class="wenhao" @click="mergeStep(barData)"></span></p>
    </div>
    <div class="clearfix">
      <div class="basic fl">
        <div class="progress"
             :style="{width: barData.my / 5 * 100 + '%', 'background': barData.color}">

          <span class="cur-score"
                :class="{'back': barData.my < 2}">{{ (barData.my).toFixed(2) }}</span>
        </div>
        <div class="no_data_desc">{{ noDataDesc }}</div>
      </div>
      <div class="count-score fl">总分5分</div>
    </div>
  </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    barData: {
      required: true
    }
  },
  computed: {
    noDataDesc () {
      return this.barData.name === '板书' ? '即将上线' : '暂无数据'
    }
  },
  methods: {
    ...mapMutations(['mergeStep'])
  }
}
</script>

<style lang="scss" scoped>
.bar-root {
  margin-bottom: 0.4rem;
  padding-left: 0.3rem;
  .basic {
    .no_data_desc {
      display: none;
    }
  }

  &.no_data {
    .progress {
      display: none;
    }
    .basic {
      background: #e8e8f4;
      .no_data_desc {
        display: block;
        padding-left: 0.12rem;
        font-size: 0.222rem;
        color: rgba(192,192,211,1);;
        line-height: 0.24rem;
      }
    }
  }
}

.tit {
  margin-bottom: 0.06rem;
  color: #7777a4;
  .name {
    font-size: 0.26rem;
    font-weight: bold;
  }
  .top-float {
    padding-top: 0.02rem;
    font-size: 0.24rem;
    color:rgba(156,156,189,1);
  }
  .wenhao{
    display: inline-block;
    width: 0.26rem;
    height: 0.26rem;
    background: url('../assets/tip.png') no-repeat;
    background-size: cover;
    vertical-align: -0.03rem;
    cursor: pointer;
    margin-left: 0.1rem;
  }
}

.basic,
.progress {
  height: 0.24rem;
  border-radius: 0.15rem;
}

.progress {
  position: absolute;
  left: 0;
  top: 0;
  width: 80%;

  .cur-score {
    position: absolute;
    right: 0.06rem;
    top: -0.026rem;
    font-size: 0.24rem;
    color: #fff;
    &.back {
      left: 102%;
      color: #7777A4;
    }
  }
}

.basic,
.count-score {
  display: inline-block;
}

.count-score {
  margin-left: 0.2rem;
  font-size: 0.24rem;
  color: #9c9cbd;
  vertical-align: 0.04rem;
}

.basic {
  position: relative;
  width: 5.4rem;
  background: #fff;
}

.xingxiang {
  .progress {
    background: #6ecdbb;
  }
}

.zhuanzhudu {
  .progress {
    background: #6a8bff;
  }
}

.xiaoguo {
  .progress {
    background: #f9bc4f;
  }
}

.banshu {
  .progress {
    background: #ec6;
  }
}

.hudong {
  .progress {
    background: #9469f8;
  }
}
</style>
