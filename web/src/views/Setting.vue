<template>
  <transition name="fade-up">
    <div class="setting-wrap" v-if="is_setting">
      <div class="nav">
        123
      </div>
      <div class="container">
        123
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name:'setting',
  computed: {
    ...mapState(['is_setting'])
  },
}
</script>
<style lang="scss">
.setting-wrap {
  position: absolute;
  left: 0;
  bottom: 44px;
  margin-left: 10px;
  transition: .3s;
  min-width: 500px;
  background: var(--app-background);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  .nav {
    width: 150px;
    position: relative;
    border-right: 1px solid rgba(255,255,255,.2);
    &::before {
      content: '';
      position: absolute;
      bottom: -14px;
      left: 7px;
      width: 0;
      height: 0;
      border: 7px solid transparent;
      border-top: 7px solid var(--app-background);
      overflow: visible;
    }
  }
  .container {
    padding: 10px;
    width: calc(100% - 150px)
  }
}
.fade-up-enter-active, .fade-up-leave-active {
  transition: all .3s;
}
.fade-up-enter, .fade-up-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>