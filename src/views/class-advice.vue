<template>
  <div class="advice-root">
    <i class="leaf2"></i>
    <i class="leaf1"></i>
    <div class="header">课程建议</div>

    <!-- 着装对比 -->
    <section class="clothing-contrast">
      <p class="head-word">着装对比</p>
      <ul class="head-pic">
        <li class="my-pic">
          <i>本人着装</i>
          <img :src="clothes_info.clothes_self">
        </li>
        <li class="advice-pic">
          <i>建议着装</i>
          <img :src="clothes_info.clothes_advs">
        </li>
      </ul>

      <!-- 着装评价 -->
      <evaluate :desc="clothDesc"></evaluate>
    </section>

    <!-- 头像大小 -->
    <section class="headpic-contrast">
      <p class="head-word">头像大小</p>
      <ul class="head-pic">
        <li class="my-pic">
          <i>本人头像</i>
          <img :src="ico_info.ico_self">
        </li>
        <li class="advice-pic">
          <i>建议头像</i>
          <img :src="ico_info.ico_advs">
        </li>
      </ul>

      <!-- 头像评价 -->
      <evaluate :desc="headDesc"></evaluate>
    </section>

    <!-- 语音范畴 -->
    <section class="voice-range">
      <p class="head-word">语音范畴</p>
      <voice-progress :size="voice_avg"></voice-progress>

      <!-- 语音评价 -->
      <evaluate :desc="voiceRange"></evaluate>
    </section>

    <div class="line"></div>

    <!-- 高频词列表 -->
    <list :listData="highWordData"></list>

    <!-- 口头禅列表 -->
    <list :listData="petPhraseData"></list>

    <!-- 高频词评价 -->
    <evaluate :desc="highWordRange"></evaluate>

    <div class="line"></div>

    <!-- 不良词列表 -->
    <list :listData="notGoodData"></list>

    <!-- 不良词评价 -->
    <evaluate :desc="notGoodRange"></evaluate>
  </div>
</template>

<script>
import VoiceProgress from '../components/voice-progress.vue'
import Evaluate from '../components/evaluate.vue'
import List from '../components/list.vue'

export default {
  components: { VoiceProgress, Evaluate, List },
  props: ['classAdvice'],
  data () {
    return {
      // 评价相关数据
      clothDesc: {
        '着装评价': ''
      },
      headDesc: {
        '头像评价': ''
      },
      voiceRange: {
        '语音评价': '',
        '流畅度': ''
      },
      notGoodRange: {
        '不良词评价': '注意言行'
      },
      highWordRange: {
        '高频词评价': '重点突出干货'
      },

      // 高频词列表数据
      highWordData: {
        name: '高频词',
        list: [],
        titDesc: '高频出现，课程关键。',
        color: '#6681FF'
      },

      // 口头禅列表数据
      petPhraseData: {
        name: '口头禅',
        list: [],
        titDesc: '高频出现，毫无意义，影响感官。',
        color: '#af86fd'
      },

      // 不良词列表数据
      notGoodData: {
        name: '不良词',
        list: [],
        titDesc: '脏话，讽刺性、侮辱性语言（匹配脏词库进行筛选)。',
        color: '#ee787f'
      },

      // 着装对比数据
      clothes_info: {
        clothes_self: ''
      },

      // 头像大小数据
      ico_info: {
        ico_self: ''
      },

      // 语音范畴数据
      voice_info: null,

      words_info: null,

      // 语音范畴进度条数据
      voice_avg: 0
    }
  },
  mounted () {
    // console.log(this.classAdvice)
    this.clothes_info = this.classAdvice.clothes_info
    this.ico_info = this.classAdvice.ico_info
    this.voice_info = this.classAdvice.voice_info
    this.words_info = this.classAdvice.words_info
    this.voice_avg = this.voice_info.voice_avg

    this.$set(this.highWordData, 'list', this.words_info.words_highFrq_list)
    this.$set(this.notGoodData, 'list', this.words_info.words_bad_list)
    // this.highWordData.list = this.words_info.words_highFrq_list
    this.petPhraseData.list = this.words_info.words_petPhr_list
    // this.notGoodData.list = this.words_info.words_bad_list
    this.highWordRange['高频词评价'] = this.words_info.words_highFrq_eval
    this.clothDesc['着装评价'] = this.clothes_info.clothes_eval
    this.notGoodRange['不良词评价'] = this.words_info.words_bad_eval
    this.$set(this.headDesc, '头像评价', this.ico_info.ico_eval)
    this.$set(this.voiceRange, '语音评价', this.voice_info.voice_vol_eval)
    this.$set(this.voiceRange, '流畅度', this.voice_info.voice_flu_eval)
  }
}
</script>

<style lang="scss" scoped>
.advice-root {
  position: relative;
  margin: 0 auto 0.6rem;
  padding-bottom: 1.2rem;
  width: 7.1rem;
  background:rgba(249,248,255,1);
  border-radius:0.16rem;
  opacity:0.9002;
  overflow: hidden;
  .leaf2,
  .leaf1 {
    position: absolute;
    bottom: 0
  }
  .leaf1 {
    width: 1.15rem;
    height: 1.08rem;
    background: url('../assets/leaf1.png') no-repeat;
    background-size: 1.15rem 1.08rem;
    right: 0;
  }
  .leaf2 {
    width: 1.08rem;
    height: 0.86rem;
    background: url('../assets/leaf2.png') no-repeat;
    background-size: 1.08rem 0.86rem;
    left: 0;
  }
  .header {
    height: 2rem;
    background: url('../assets/leaf3.png') no-repeat;
    background-size: cover;
    font-size:0.48rem;
    color:rgba(118,126,253,1);
    text-align: center;
    letter-spacing: 0.16rem;
    font-weight: bold;
    line-height: 2.4rem;
  }
  .head-word {
    margin: 0.8rem 0 1rem;
    font-size:0.36rem;
    color:rgba(51,51,51,1);
    font-weight: bold;
    letter-spacing: 0.1rem;
    text-align: center;
  }
  .head-pic {
    display: flex;
    justify-content: space-around;
    li {
      position: relative;
      width:2.48rem;
      height:2.69rem;
      background:rgba(255,255,255,1);
      border-radius:0.08rem;
      &.my-pic {
        i {
          background:rgba(170,113,255,1);
        }
      }
      &.advice-pic {
        i {
          background:rgba(107,105,247,1);
        }
      }
      i {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top:-0.21rem;
        width:1.8rem;
        height:0.42rem;
        border-radius:0.21rem;
        color:rgba(255,255,255,1);
        font-size: 0.28rem;
        text-align: center;
      }
      img {
        width:2.2rem;
        height:2.2rem;
        border-radius: 0.05rem;
        border-radius: 0.05rem;
        margin: 0.35rem auto 0;
      }
    }
  }
  .clothing-contrast {
    .head-word {
      background: url('../assets/Dressing Contrast.png') no-repeat;
      background-size: 4.41rem 0.36rem;
      background-position: center;
    }
  }
  .headpic-contrast {
    .head-word {
      background: url('../assets/Head Image Contrast.png') no-repeat;
      background-size: 5.19rem 0.4rem;
      background-position: center;
    }
  }
  .voice-range {
    .head-word {
      background: url('../assets/Phonetic Category.png') no-repeat;
      background-size: 4.55rem 0.4rem;
      background-position: center;
    }
  }
  .line {
    margin: 0.7rem auto;
    width:6.6rem;
    height:0.01rem;
    background:rgba(228,228,241,1);
  }
}

</style>
