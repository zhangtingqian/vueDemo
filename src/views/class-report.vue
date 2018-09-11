<template>
  <section class="report-root">
    <header class="report-header">
      <div class="header-title">
        <p class="info">学而思网校教师</p>
        <h1 class="title">课程质量报告</h1>
      </div>
      <div class="header-card">
        <div class="people">
          <div class="avatar-wrap"><img class="avatar" :src="tchIco"></div>
          <div class="detail">
            <span class="name">{{ tchInfo.tch_name }}</span>
            <span class="type">{{  tchInfo.tch_dpt }}{{ tchInfo.tch_sub }}</span>
          </div>
        </div>
        <div class="split"></div>
        <div class="info">
          <div class="item">
            <div class="name">
              <span class="icon" style="height: 0.3rem;"></span>
              <span class="text">场次名称</span>
            </div>
            <p class="desc" v-if="liveInfo.live_name">{{ liveInfo.live_name }}</p>
          </div>
          <div class="item">
            <div class="name">
              <span class="icon time"></span>
              <span class="text">场次时间</span>
            </div>
            <p class="desc">
              <span class="year">{{ liveInfo.live_yMd }}</span>
              <span class="time">{{ liveInfo.live_Hms }}</span>
            </p>
            <p class="early-time">{{ liveInfo.live_leave }}</p>
          </div>
        </div>
      </div>
    </header>

    <div class="report-data">
      <div class="score-wrap">
        <p class="score">{{ scrTotal }}</p>
        <span class="title">本周课程评分</span>
      </div>
      <div class="score-items">
        <div class="title">课程各维度评分</div>
        <div class="item">

          <!-- 课程维度进度条组件 -->
          <report-precent-bar v-for="(val, key) in scrInfo" :barData="val" :key="key"/>
        </div>
      </div>
      <div class="radar-wrap">
        <div ref="echartRadar" class="echartRadar"></div>
      </div>
    </div>
  </section>
</template>

<script>
import ReportPrecentBar from '../components/report-precent-bar.vue'

import echarts from 'echarts/lib/echarts.js'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/tooltip'
import getRadarOption from '../utils/radarOption.js'

import defaultIco from '../assets/default.png'

export default {
  data () {
    return {
      scrInfo: [], // 课程维度进度条数据
      liveInfo: {
        live_name: ''
      },
      scrTotal: '',
      tchInfo: {
        tch_ico: ''
      }
    }
  },
  props: {
    classReport: {
      type: Object,
      required: true
    }
  },
  computed: {
    randarOpt () {
      let arr = []
      this.scrInfo.filter((item) => {
        arr.push(item.my)
      })
      return arr
    },

    radarDimension () {
      let arr = []
      this.scrInfo.filter((item) => {
        arr.push({
          name: item.name,
          max: 5
        })
      })
      return arr
    },

    tchIco () {
      return this.tchInfo.tch_ico ? this.tchInfo.tch_ico : defaultIco
    }
  },
  components: { ReportPrecentBar },
  mounted () {
    // console.log(this.classReport)
    this.scrInfo = this.classReport.scr_info
    this.liveInfo = this.classReport.live_info
    this.scrTotal = (this.classReport.scr_total).toFixed(2)
    this.tchInfo = this.classReport.tch_info

    const radar = echarts.init(this.$refs.echartRadar)
    window.radar = radar
    radar.setOption(getRadarOption(this.randarOpt, this.radarDimension))
  }
}
</script>

<style lang="scss" scoped>
.report-root {
  margin-bottom: 0.6rem;
}
.report-header {
  width: 100%;
  height: 5.78rem;
  position: relative;
  margin-bottom: 2rem;
}

.header-title {
  width: 100%;
  height: 4.79rem;
  background-image: url('../assets/top-bg.png');
  background-size: cover;
  color: #FFFFFF;
  overflow: hidden;

  .info {
    text-align: center;
    font-size: 0.3rem;
    margin: 0.89rem 0 0.4rem;
  }
  .title {
    text-align: center;
    font-size: 0.54rem;
  }
}

.header-card {
  padding: 0.15rem 0;
  min-width: 6.8rem;
  min-height: 3rem;
  background-color: #FFFFFF;
  border-radius: 0.2rem;
  position: absolute;
  left: 50%;
  margin-left: -3.4rem;
  top: 2.78rem;
  box-shadow: 1px 1px 0.1rem rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  .people {
    height: 0.8rem;
    min-width: 2.16rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.32rem;
    .avatar-wrap {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      margin-right: 0.16rem;
      overflow: hidden;
    }

    .avatar {
      max-width: 100%;
      border-radius: 50%;
      display: block;
    }
    .detail {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-width: 1.2rem;
      .name {
        color: #333;
        font-size: 0.3rem;
        word-break: break-all;
      }
      .type {
        color: #999;
        font-size: 0.26rem;
        word-break: break-all;
      }
    }
  }

  .split {
    width: 0.01rem;
    height: 2rem;
    background-color: rgba(229,229,229,1);
    margin: 0 0.2rem 0 0.2rem;
  }

  .info {
    height: 100%;
    max-width: 3.58rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .item {
      overflow: hidden;

      .name {
        display: flex;
        align-items: center;
        margin-bottom: 0.1rem;

        .icon {
          width: 0.26rem;
          height: 0.26rem;
          background-image: url('../assets/icon-etc.png');
          background-size: cover;
          margin-right: 0.09rem;

          &.time {
            background-image: url('../assets/icon-time.png');
          }
        }
        .text {
          font-size: 0.26rem;
          color: #7777A4;
        }
      }
      .desc {
        color: #333333;
        font-size: 0.28rem;
        padding-left: 1.2em;
      }
      .early-time {
        color: #EE787F;
        font-size: 0.24rem;
        text-indent: 1.4em;
        margin-top: 0.06rem;
        word-break: break-all;
      }
    }

    .item + .item {
      margin-top: 0.3rem;
    }
  }
}

.report-data {
  width: 7.1rem;
  margin: 0 auto;
  background-color: #F3F2FF;
  position: relative;
  border-radius:0.15rem;

  .score-wrap {
    width: 1.9rem;
    height: 1.9rem;
    background-color: #F3F2FF;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    margin-left: -0.95rem;
    top: -0.95rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .score {
      color: #5D57E1;
      font-size: 0.68rem;
    }

    .title {
      color: #7777A4;
      font-size: 0.24rem;
    }
  }
  .score-items {
    overflow: hidden;
    .title {
      font-size: 0.36rem;
      text-align: center;
      margin-top: 1.1rem;
      margin-bottom: 0.6rem;
    }
  }
  .radar-wrap {
    position: relative;
    margin-top: 0.6rem;
    width: 100%;
    height: 5.5rem;
    .echartRadar {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
