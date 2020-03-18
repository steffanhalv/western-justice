<template>
  <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: hidden; z-index: 500;">
    <div class="background" :style="mapStyle"></div>
    <div class="water" :style="waterStyle"></div>
    <button @click="$router.push('/')">EXIT</button>
    <player
      id="player"
      :player="$store.state"
      class="player"
      :style="{
        left: 'calc(50% - 45px)',
        top: 'calc(50% - 45px)'
      }"
      style="position: absolute"/>
    <player
      v-for="player in filter($store.state.server.players)"
      :key="player.username"
      :player="player"
      :style="{
        left: player.x + px - $store.state.x + 'px',
        top: player.y + py - $store.state.y + 'px'
      }"
      class="player"
      style="position: absolute"/>
    <bullet
      v-for="(bullet, i) in $store.state.bullets"
      :key="'bullet-' + bullet.uniq"
      :index="i"
      :parent="$store.state.bullets"
      :bullet="bullet"
      :style="{
        left: bullet.x + px - $store.state.x + 'px',
        top: bullet.y + py - $store.state.y + 'px'
      }"
      style="position: absolute"/>
    <elimination
      v-for="(elimination, i) in $store.state.eliminations"
      :key="'elemination-' + elimination.uniq"
      :index="i"
      :parent="$store.state.eliminations"
      :elimination="elimination"
      :style="{
        left: elimination.x + px - $store.state.x + 'px',
        top: elimination.y + py - $store.state.y + 'px'
      }"
      style="position: absolute"/>
    <item
      v-for="(item, i) in $store.state.items"
      :key="'item-' + item.uniq"
      :index="i"
      :parent="$store.state.items"
      :item="item"
      :style="{
        left: item.x + px - $store.state.x + 'px',
        top: item.y + py - $store.state.y + 'px'
      }"
      style="position: absolute"/>
    <wall
      v-for="(wall, i) in $store.state.walls"
      :key="'wall-' + i"
      :index="i"
      :parent="$store.state.walls"
      :wall="wall"
      :style="{
        left: wall.x + px - $store.state.x + 'px',
        top: wall.y + py - $store.state.y + 'px'
      }"
      style="position: absolute"/>
    <div style="position: fixed; bottom: 50px; left: 50px;">
      x: {{ $store.state.x }},
      y: {{ $store.state.y }}
      - {{ $store.state.server.users }} players online
    </div>
    <div style="position: relative; display: inline-block; color: red; background: white; padding: 5px; margin-left: 20px">
      HP: {{ $store.state.hp }}
    </div>
    <div style="position: relative; display: inline-block; color: orange; background: white; padding: 5px; margin-left: 20px">
      GOLD: {{ $store.state.gold }}
    </div>
  </div>
</template>

<script>
import Player from '@/components/Player'
import Bullet from '@/components/Bullet'
import Elimination from '@/components/Elimination'
import Item from '@/components/Item'
import Wall from '@/components/Wall'
export default {
  components: {
    Player,
    Bullet,
    Elimination,
    Item,
    Wall
  },
  data() {
    return {
      step: 10,
      px: 0,
      py: 0
    }
  },
  watch: {
    '$store.state.x' (now, old) {
      this.$store.state.walls.forEach(wall => {
        if (this.isCollide(this.$store.state, wall)) this.$store.state.x = old
      })
    },
    '$store.state.y' (now, old) {
      this.$store.state.walls.forEach(wall => {
        if (this.isCollide(this.$store.state, wall)) this.$store.state.y = old
      })
    }
  },
  methods: {
    isCollide(a, b) {
      return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
      )
    },
    filter(obj) {
      delete obj[this.$store.state.username]
      return obj
    },
    walk() {
      setTimeout(() => {
        let step = this.step
        if (this.$store.state.run) step *= 2
        if (this.$store.state.walking) {
          if (this.$store.state.direction === 'up') this.$store.state.y -= step
          else if (this.$store.state.direction === 'down') this.$store.state.y += step
          else if (this.$store.state.direction === 'left') this.$store.state.x -= step
          else if (this.$store.state.direction === 'right') this.$store.state.x += step
        }
        this.walk()
      }, 20)
    }
  },
  mounted() {
    this.$store.state.playing = true
    this.px = document.getElementById('player').getBoundingClientRect().left
    this.py = document.getElementById('player').getBoundingClientRect().top
    window.addEventListener('resize', () => {
      this.px = document.getElementById('player').getBoundingClientRect().left
      this.py = document.getElementById('player').getBoundingClientRect().top
    }, false)
    window.addEventListener('orientationchange', () => {
      this.px = document.getElementById('player').getBoundingClientRect().left
      this.py = document.getElementById('player').getBoundingClientRect().top
    }, false)
  },
  computed: {
    mapStyle() {
      return {
        left: -this.$store.state.x + this.px - 4000 + 'px',
        top: -this.$store.state.y + this.py - 4000 + 'px'
      }
    },
    waterStyle() {
      return {
        backgroundAttachment: 'fixed',
        backgroundPosition: (-this.$store.state.x + this.px - 1000 + 'px ') + (-this.$store.state.y + this.py - 1000 + 'px')
      }
    }
  },
  created() {
    let audio = new Audio(require('@/assets/sound/bg.mp3'))
    audio.loop = true
    audio.play()
    this.walk()
  }
}
</script>


<style scoped>
button {
  font-weight: bold;
  background: #555;
  color: white;
  padding: 20px;
  margin: 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: white;
  color: #555;
  padding: 20px;
  margin: 20px;
  border: none;
}
.background {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  width: 8000px;
  height: 8000px;
  background-image: url(~@/assets/gfx/dessert.jpg);
  background-size: 500px;
  border-radius: 50%;
}
.water {
  z-index: -2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/gfx/water.gif);
}
</style>