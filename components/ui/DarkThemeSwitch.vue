<template>
  <div class="d-flex justify-content-center flex-column">
    <div class="mx-3 d-flex justify-content-center" id="switch">
      <input
        @click="switchTheme()"
        type="checkbox"
        :checked="$store.getters['preferences/darkTheme']"
        class="checkbox"
        id="chk"
      />
      <label class="label" for="chk">
        <i id="moon" class="material-icons">dark_mode</i>
        <i id="sun" class="material-icons">light_mode</i>
        <div class="ball"></div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    switchTheme() {
      this.$vuetify.theme.dark = !this.$store.getters["preferences/darkTheme"];
      this.$store.commit(
        "preferences/setDarkTheme",
        !this.$store.getters["preferences/darkTheme"]
      );
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.checkbox {
  opacity: 0;
  position: absolute;
  display: inline;
  width: 5%;
}

.label {
  background-color: #111;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  height: 26px;
  width: 50px;
  transform: scale(1.5);
  margin-bottom: 0;
}

.label .ball {
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  height: 22px;
  width: 22px;
  transform: translateX(0px);
  transition: transform 0.2s linear;
}

.checkbox:checked + .label .ball {
  transform: translateX(24px);
}

#moon {
  color: #f1c40f;
  font-size: 20px;
}

#sun {
  color: #f39c12;
  font-size: 20px;
}
</style>