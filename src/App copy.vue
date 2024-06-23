<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { nonLineF } from "@/assets/js/base";

import MainHeader from './components/MainHeader.vue';
import DashBoard from './components/DashBoard.vue';
import ScrollBox from './components/ScrollBox.vue';
import routeArrow from './components/routeArrow.vue';

// import { ElFadeInLinear } from 'element-plus';

//#region Scroll Function
// AUTO SCROLLING INIT
const scrollArea = ref()
const elBakImg = ref()
const elMain = ref()

let ifWheel = ref(false)
let imgPath = "/img/wel1.jpg"


const prop_IfWheel = {
  set: (Bol: Boolean) => {
    ifWheel.value = Bol ? true : false
  },
  get: () => {
    return ifWheel.value
  }
}

const prop_scrollTop = () => {
  const container = scrollArea.value.$el.querySelector('.el-scrollbar__wrap');
  const get = () => {
    return container.scrollTop
  }
  const set = (num: number) => {
    container.scrollTop = num
  }
  return { get, set }
}


// 滚动事件
const wheelSwitch = (e: WheelEvent) => {
  // 获取滚动容器
  const container = scrollArea.value.$el.querySelector('.el-scrollbar__wrap');
  let wheelHeight = container.scrollTop
  // Reach the beginning
  if (wheelHeight <= 0) {
    ifWheel.value = false
  }
  //Wheeling downing
  if (e.deltaY > 0) {
    ifWheel.value = true
  }
}

// 滚动时，bg模糊度变化和页面偏移
const wheelAni = (scrollTop: number) => {
  // 设置模糊度为滚动距离的值，实现滚动时背景模糊的效果。
  const filterStyle = `blur(${nonLineF(scrollTop, 0, 1, 100)}px)`
  elBakImg.value.style.filter = filterStyle
  // elMain.value.style.width = filterStyle
  return function () { }
}

onMounted(() => {
  // 监听滚动，bg模糊度变化
  const container = scrollArea.value.$el.querySelector('.el-scrollbar__wrap');
  let lastScrollTime = 0;
  document.addEventListener('wheel', () => {
    lastScrollTime = Date.now();
    wheelAni(container.scrollTop)
  });
  // 不滚动移除监听
  setTimeout(() => {
    if (Date.now() - lastScrollTime > 1000) {
      document.removeEventListener('wheel', wheelAni(container.scrollTop));
    }
  }, 1000);

})
//#endregion

const prop_scrollRatio = ref(0)

onMounted(() => {
  window.addEventListener("wheel", (e: WheelEvent) => {
    prop_scrollRatio.value += e.deltaY / 10000
    console.log(prop_scrollRatio.value)
  })
})
</script>

<template>

  <MainHeader />

  <img :src=imgPath class="bakImg" ref="elBakImg">
  <el-scrollbar max-height="100vh" ref="scrollArea" @wheel="wheelSwitch">
    <div class="scrollBar">

      <DashBoard />
      <ScrollBox :scrollRatio="prop_scrollRatio" />
      <div class="viewBox" ref="elMain">
        <RouterView v-slot="{ Component }">
          <transition name="view-transition">
            <component :is="Component"></component>
          </transition>
        </RouterView>
      </div>
      <canvas></canvas>
      <routeArrow />
    </div>
  </el-scrollbar>
</template>


<style scoped lang="scss">
/* #region Golobal Settings*/
h1 {
  color: var(--color-heading);
}

p {
  color: var(--color-text);
}

@mixin flex-style {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* #endregion */


.bakImg {
  @include flex-style;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  object-fit: cover;
  object-position: center;
}

.scrollBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // @include flex-style;
  // justify-content: space-between;
  width: 100vw;
  height: 100vh;


  .viewBox {
    @include flex-style;
    padding-left: 0;
    padding-top: 90px;
    padding-left: 5vw;

    width: 100vw;
    height: 100vh;
    gap: 1rem;
    color: #fff;
    font-size: 1.9rem;

  }
}
</style>