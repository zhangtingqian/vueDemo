<template>
  <div id="root">

    <!-- 公共弹层 -->
    <div class="mask-root" v-show="maskShow">
      <div class="layer">
        <div style="padding: 0.5rem 0.4rem 0;">
          <p class="layer-title">{{ maskData.name }}</p>
          <p class="layer-desc">{{ maskData.titDesc }}</p>
        </div>
        <p class="layer-split"></p>
        <p class="button" @click="changeMaskState">确定</p>
      </div>
    </div>

    <!-- 课程质量报告/第一部分 -->
    <class-report :classReport="classReport" v-if="classReport"></class-report>

    <!-- 课程统计 -->
    <class-info :classInfo="classInfo" v-if="classInfo"></class-info>

    <!-- 课程建议 -->
    <class-advice :classAdvice="classAdvice" v-if="classAdvice"></class-advice>
  </div>
</template>

<script>
import ClassReport from './views/class-report.vue'
import ClassAdvice from './views/class-advice.vue'
import ClassInfo from './views/class-info.vue'

import getData from './utils/mode.js'

import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      classReport: null,
      classAdvice: null,
      classInfo: null
    }
  },
  components: { ClassReport, ClassAdvice, ClassInfo },
  mounted () {
    let params = this.getQueryString()
    let isEmptyObject = this.isEmptyObject(params)
    if (isEmptyObject) {
      alert('无参数')
      return
    }
    this.getTotalData('https://appaizjx.xesv5.com/003_QualityReport/03_php/05_QR2_getInfo_Obj.php', params)
  },
  methods: {
    ...mapMutations(['changeMaskState']),

    async getTotalData (url, data) {
      try {
        const res = await getData(url, data)
        // console.log(res)
        if (res.stat === 1) {
          if (!res.basic_info.scr_total) {
            alert('未生成质量报告！')
            return
          }
          this.classReport = res.basic_info
          this.classAdvice = res.course_advs
          this.classInfo = res.course_stat
        } else {
          alert('数据请求失败，请稍后重试！')
          return
        }
      } catch (e) {
        alert('接口请求失败，请稍后重试！')
      }
    },

    getQueryString (url = window.location.href) {
      const reg = /[?&]([^#&?]+)=([^#&?=]+)/g
      let obj = {}
      url.replace(reg, (group, catch1, catch2, index, str) => {
        obj[catch1] = catch2
      })
      return obj
    },

    isEmptyObject (obj) {
      for (let i in obj) {
        return false
      }
      return true
    }
  },
  computed: mapState(['maskData', 'maskShow'])
}
</script>

<style lang="scss">
.mask-root {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  .layer {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width:5.4rem;
    background:rgba(255,255,255,1);
    border-radius:0.08rem;
    color:rgba(51,51,51,1);
    line-height:0.48rem;
    font-size: 0.34rem;
    .layer-title {
      margin-bottom: 0.1rem;
      font-weight: bold;
    }
    .layer-desc {
      padding-bottom: 0.4rem;
    }
    .layer-split {
      width: 100%;
      height: 0.01rem;
      background:rgba(220,220,220,1);
    }
    .button {
      font-size:0.32rem;
      height: 0.9rem;
      line-height: 0.9rem;
      color:rgba(241,50,50,1);
      text-align: center;
      cursor: pointer;
    }
  }
}
body, html {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: fangzheng;
}
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
img {
  display: block;
}
a {
  text-decoration: none;
}

h1,h2,h3,p,ul,li,div {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after{
  display: block;
  content: '';
  clear: both;
}
i {
  font-style: normal;
}
#root {
  width: 100%;
  background-color: #fff;
}
</style>
