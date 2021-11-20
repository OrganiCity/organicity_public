<template>
  <div class="parent">
    <transition name="slide-to-right">
      <div
        v-show="!slideCondition"
        :style="{ '--slide-duration': `${duration}s` }"
      >
        <slot name="left"></slot>
      </div>
    </transition>
    <transition name="slide-to-left">
      <div
        v-show="slideCondition"
        :style="{
          '--slide-duration': `${duration}s`,
        }"
      >
        <slot name="right"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    'slide-condition': { type: Boolean, default: false },
    'duration': { type: Number, default: 0.5 },
  },
}
</script>

<style lang="scss" scoped>
.parent {
  position: relative;
}
.slide-to-left {
  &-enter-active,
  &-leave-active {
    position: absolute;
    transition: var(--slide-duration);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &-enter,
  &-leave-to {
    transform: translateX(100%);
  }
}
.slide-to-right {
  &-enter-active,
  &-leave-active {
    transition: var(--slide-duration);
  }

  &-enter,
  &-leave-to {
    transform: translateX(-100%);
  }
}
</style>