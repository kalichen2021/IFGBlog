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

let imgPath = "/img/wel1.jpg"

const prop_scrollRatio = ref(0)
const elCvs = ref<HTMLCanvasElement>()

const cvsInit = (elCvs: HTMLCanvasElement) => {
  elCvs.width = window.innerWidth * devicePixelRatio
  elCvs.height = window.innerHeight * devicePixelRatio
}
/**
 * 获得 [min,max] 范围内的随机整数
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Point {
  r: number
  x: number
  y: number
  constructor(
    private elCvs: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D = elCvs.getContext('2d')!,

    private xSpeed: number = getRandom(-50, 50),
    private ySpeed: number = getRandom(-50, 50),
    private lastDrawTime: any = null,
  ) {
    this.r = 6;
    this.x = getRandom(this.r, this.elCvs.width - this.r);
    this.y = getRandom(this.r, this.elCvs.height - this.r);
  }
  draw() {
    if (this.lastDrawTime) {
      //根据运动时间，计算出当前位置 
      const now = Date.now()
      const t = (now - this.lastDrawTime) / 1000
      let x = this.x + this.xSpeed * t;
      let y = this.y + this.ySpeed * t;
      if (x <= this.r || x >= this.elCvs.width - this.r) {
        this.xSpeed *= -1
      }
      if (y <= this.r || y >= this.elCvs.height - this.r) {
        this.ySpeed *= -1
      }

      this.x = x
      this.y = y
    }
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fillStyle = '#fef';
    this.ctx.fill();
    this.lastDrawTime = Date.now()
  }
}

class Graph {
  points: Point[]
  constructor(
    private elCvs: HTMLCanvasElement,
    private ctx?: CanvasRenderingContext2D,
    private pointNumber = 30,
    private maxDis = 300,
  ) {
    this.ctx = this.ctx ?? elCvs.getContext('2d')!;
    this.points = new Array(pointNumber).fill(0).map(i =>
      new Point(this.elCvs, this.ctx));
  }

  draw() {
    requestAnimationFrame(() => {
      this.draw()
    });
    this.ctx?.clearRect(0, 0, this.elCvs.width, this.elCvs.height)
    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i];
      p1.draw();
      for (let j = i + 1; j < this.points.length; j++) {
        const p2 = this.points[j];
        const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2); //计算距离
        if (d > this.maxDis) {
          continue
        }
        if (this.ctx) {
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.closePath();
          this.ctx.strokeStyle = `rgba(25,255,255,${1 - d / this.maxDis})`;
          this.ctx.stroke();
        }
      }
    }
  }
}


onMounted(() => {
  if (elCvs.value) {
    elCvs.value?.focus()
    cvsInit(elCvs.value!)
    window.addEventListener('resize', () => cvsInit(elCvs.value!))

    const g = new Graph(elCvs.value)
    g.draw()
  }
})
</script>

<template>

  <MainHeader />

  <img :src=imgPath class="bakImg" ref="elBakImg">
  <canvas id="canvas" ref="elCvs"></canvas>
  <el-scrollbar max-height="100vh" ref="scrollArea">
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

#canvas {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: calc(100% - 50px);
  // z-index: -1;
}
</style>