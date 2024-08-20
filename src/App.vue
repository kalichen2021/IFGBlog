<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'

import FilterLib from '@/components/FilterLib.vue';
import HeadBox from '@/components/HeadBox.vue';
import DashBoard from '@/components/DashBoard.vue'
import RouteArrow from '@/components/RouteArrow.vue';


const elCvs = ref<HTMLCanvasElement>()

// !!!!!?????
const cvsInit = (elCvs: HTMLCanvasElement) => {
  elCvs.width = window.innerWidth 
  elCvs.height = window.innerHeight 
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

    private v: number = 1.2,
    private xSpeed: number = getRandom(-50, 50) * v,
    private ySpeed: number = getRandom(-50, 50) * v,
    private lastDrawTime: any = null,
  ) {
    this.r = 3;
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
    private pointNumber = 15,
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
  const msg = `
    ／l、
  （ﾟ､ 。 ７
    l、 ~ヽ
    じしf_, )ノ
  `
  console.log(msg)
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
  <canvas ref="elCvs"></canvas>
  <main>
    <HeadBox />
    <div class="viewBox">
      <RouterView />
    </div>
    <DashBoard />
    <routeArrow />
    <FilterLib />
  </main>
</template>

<style scoped lang="scss">
@import './assets/global.scss';


main {
  transform-origin: top;
  width: 100vw;
  height: 100vh;
  perspective: 200px;

}

.viewBox {
  position: absolute;
  bottom: 0;
  height: calc(100vh - $headerSize);
  width: 100%;

  div {

    // position: absolute;
    // top: 0;
    // bottom: 0;
    // right: 0;
    // left: 0;
    // left: calc($dashBoardWidth + $dashBoardLeft);
    width: 100%;
    height: 100%;

    overflow: visible;
  }

  div[welcome], div[mask] {
    left: 0;
  }
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: var(--color-da);
  background-image: linear-gradient(120deg, var(--color-da2) 0%, var(--color-d) 100%);
}

</style>
