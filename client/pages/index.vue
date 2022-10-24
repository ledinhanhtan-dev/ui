<template>
  <div>
    <Tutorial />
    <el-button type="primary" :class="$style.button">
      Click
    </el-button>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'IndexPage'
})
</script>

<style lang="scss" module>
.button {
  background-color: red;
}
</style>
