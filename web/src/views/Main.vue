<template>
  <main class="main">
    <div class="bg"></div>
    <div class="time">
      <h1>{{ time }}</h1>
    </div>
    <div :class="is_setting ? 'settings open' : 'settings '" @click="settingType">
      <i class="iconfont icon-shezhi" ></i>
    </div>
    <setting />
  </main>
</template>

<script>
import setting from './Setting'
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'Main',
  data() {
    return {
      time: null,
      setTime: null
    }
  },
  computed: {
    ...mapState(['is_setting'])
  },
  methods: {
    ...mapMutations(['SET_IS_SETING']),
    getTime(){
      const time = new Date();
      this.time =  `${time.getHours()} : ${time.getMinutes()}`;
    },
    settingType(){
      const isType = !this.$store.state.is_setting;
      this.SET_IS_SETING(isType)
    }
  },
  mounted() {
    this.setTime = setInterval(this.getTime,1000);
  },
  beforeDestroy() {
      clearInterval(this.setTime);
  },
  components:{
    setting
  }
}
</script>
<style lang="scss">
.main {
  height: 100%;
  width: 100%;
  position: relative;
  .time {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    text-align: center;
    color: white;
    font-size: 5rem;
    h1 {
      font-weight: 400;
    }
  }
  .settings {
    position: absolute;
    left: 0;
    bottom: 0;
    color: rgba(255,255,255,.7);
    padding: 10px;
    cursor: pointer;
    transition: .5s;
    text-shadow: 0 0 5px rgba(0,0,0,.5);
    i {
      font-size: 1.5rem;
    }
    &:hover {
      color: rgba(255,255,255,1);
    }
  }
  .settings.open {
    transform: rotate(50deg) scale(1.1);
    color: rgba(255,255,255,1);
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background: url(https://images.unsplash.com/photo-1481285184914-8a731806bbf8?ixlib=rb-0.3.5&q=99&fm=jpg&crop=entropy&cs=tinysrgb&w=2048&fit=max&s=c9887d024a96398a1f2ab6c36162120c);
  }
}
</style>