<template>
  <div class="info-root">
      <div class="head">课程统计</div>
      <ul class="statistics-list">

        <!-- 互动频次 -->
        <li class="statistics-item frequency">
          <p class="top"><i></i>互动频次</p>
          <div class="body">
            <ul class="time-card">
              <li v-for="(val, key) in interActList" :key="key">
                <i class="total-time">{{ val.length * 3 }}min</i>
                <div style="display: inline-block;">
                    <span v-for="(v, k) in val"
                          :key="k"
                          :class="v ? 'dark' : 'shallow'">
                    </span>
                </div>
              </li>
            </ul>

            <!-- 互动评价组件 -->
            <evaluate :desc="InteractionDesc"></evaluate>
          </div>
        </li>

        <!-- 互动平均参与率 -->
        <div class="statistics-item participate">
            <p class="top"><i></i>互动平均参与率</p>
            <div class="body">

              <!-- 互动平均参与率进度条组件 -->
              <course-statisics-progress :percent="interAct_avg_rate"></course-statisics-progress>

              <!-- 参与率评价 -->
              <evaluate :desc="partakeDesc"></evaluate>
            </div>
        </div>

        <!-- 听课效率 -->
        <div class="statistics-item listen-class">
            <p class="top"><i></i>听课效率</p>
            <div class="body">
              <div class="listen-class-desc" style="margin-top: 0px;">互动题正确率
                <div class="wenhao" @click="mergeStep(listenPop)"></div>
              </div>

              <!-- 互动题正确率进度条组件 -->
              <course-statisics-progress :percent="interQus_accu"></course-statisics-progress>
              <div class="listen-class-desc">听懂了么
                <div class="wenhao" @click="mergeStep(understdPop)"></div>
              </div>

              <!-- 听懂了么进度条组件 -->
              <course-statisics-progress :percent="understd_rate"></course-statisics-progress>
            </div>
        </div>
      </ul>
  </div>
</template>

<script>
import courseStatisicsProgress from '../components/course-statistics-progress.vue'
import Evaluate from '../components/evaluate.vue'

import { mapMutations } from 'vuex'

export default {
  components: { courseStatisicsProgress, Evaluate },
  props: ['classInfo'],
  data () {
    return {
      // 评价相关数据
      partakeDesc: {
        '参与率评价': '节点巧，质量高，师生双赢效果好'
      },
      InteractionDesc: {
        '互动评价': '互动高效，形式丰富，我们是知识的 搬运工'
      },

      // 互动频次卡片源数据
      interAct_freq_list: [],

      // 参与率值
      interAct_avg_rate: 0,

      // 互动题正确率
      interQus_accu: 0,

      // 懂了么值
      understd_rate: 0,

      // 弹窗需要的数据
      understdPop: {
        name: '',
        titDesc: '依托“懂了么”功能的使用，计算“听懂”学生占比的平均水平，展现学生对于所授知识的学习效果。'
      },
      listenPop: {
        name: '',
        titDesc: '综合衡量学生作答全部互动题的正确率水平，展现学生对于所授知识的学习效果。'
      }
    }
  },
  mounted () {
    // console.log(this.classInfo)
    // 互动频次
    this.InteractionDesc['互动评价'] = this.classInfo.interAct_freq.interAct_freq_eval
    this.interAct_freq_list = this.classInfo.interAct_freq.interAct_freq_list

    // 平均参与率
    this.partakeDesc['参与率评价'] = this.classInfo.interAct_avg.interAct_avg_eval
    this.interAct_avg_rate = this.classInfo.interAct_avg.interAct_avg_rate

    // 听课效率
    this.interQus_accu = this.classInfo.lec_effect.interQus_accu
    this.understd_rate = this.classInfo.lec_effect.understd_rate
  },
  computed: {
    //  过滤互动频次卡片数据，每20个为一组
    interActList () {
      let arr = []
      for (var i = 0; i < this.interAct_freq_list.length; i += 20) {
        arr.push(this.interAct_freq_list.slice(i, i + 20))
      }
      return arr
    }
  },
  methods: {
    ...mapMutations(['mergeStep'])
  }
}
</script>

<style lang="scss" >
.info-root {
  padding-bottom: 0.80rem;
  margin: 0 auto 0.6rem;
  width: 7.1rem;
  background: url('../assets/footer_bg.png') repeat-y;
  background-size: 7.1rem 100%;
  border-radius: 0.08rem;
  overflow: hidden;
  .evaluate {
    width: inherit !important;
    .desc {
      max-width: 4.1rem !important;
    }
  }
  .head {
    height: 1.6rem;
    line-height: 1.6rem;
    color:rgba(255,255,255,1);
    font-size: 0.48rem;
    text-align: center;
    letter-spacing: 0.16rem;
    font-weight: bold;
  }

  .statistics-list {
    padding: 0 0.33rem;

    .top {
      display: inline-block;
      padding: 0.1rem 0.2rem 0.2rem;
      color:rgba(93,87,225,1);
      font-size: 0.28rem;
      background:rgba(255,233,134,1);
      border-top-left-radius: 0.1rem;
      border-top-right-radius: 0.1rem;

      i {
        display: inline-block;
        margin-right: 0.08rem;
        vertical-align: -0.04rem;
      }
    }

    .body {
      margin-top: -0.16rem;
      position: relative;
      width: 100%;
      padding: 0.3rem 0.1rem;
      background:rgba(246,246,255,1);
      box-shadow:0px 0.04rem 0.1rem 0px rgba(112,94,254,1);
      border-radius: 0.06rem;
      box-sizing: border-box;

      .time-card {
        font-size: 0;

        li {
          margin-bottom: 0.2rem;
        }

        .total-time {
          display: inline-block;
          margin-right: 0.26rem;
          color:rgba(119,119,164,1);
          font-size: 0.28rem;
          vertical-align: 0.1rem;
          font-weight: bold;
        }

        .shallow, .dark {
          display: inline-block;
          width: 0.24rem;
          height: 0.28rem;
          vertical-align: 0.05rem;
        }

        .shallow {
          background: url('../assets/Rectangle 25 Copy 4.png') no-repeat;
          background-size: cover;
        }

        .dark {
          background: url('../assets/Rectangle 25 Copy 6.png') no-repeat;
          background-size: cover;
        }
      }

      .listen-class-desc {
        margin: 0.2rem 0 0.1rem;
        color:rgba(119,119,164,1);
        font-size: 0.28rem;
        font-weight: bold;

        .wenhao {
          display: inline-block;
          width: 0.26rem;
          height: 0.26rem;
          background: url('../assets/tip.png') no-repeat;
          background-size: cover;
          z-index: 10;
          vertical-align: -1px;
          cursor: pointer;
        }
      }
    }

    .statistics-item {
      margin-bottom: 0.3rem;
      &.frequency {
        .top {
          i {
            width: 0.3rem;
            height: 0.24rem;
            background: url('../assets/Interaction.png') no-repeat;
            background-size: cover;
          }
        }
      }

      &.participate {
        .top {
          i {
            width: 0.3rem;
            height: 0.3rem;
            background: url('../assets/people_icon.png') no-repeat;
            background-size: cover;
          }
        }
      }

      &.listen-class {
        .top {
          i {
            width: 0.28rem;
            height: 0.27rem;
            background: url('../assets/headset.png') no-repeat;
            background-size: cover;
          }
        }
      }
    }
  }
}
</style>
