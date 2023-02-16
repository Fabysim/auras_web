<template>
  <div>

    <h1 class="text-center">Téléchargement</h1>
    <div class="container">
      <p>video.mp4</p>
      <div class="progressbar-wrapper">
        <div title="downloaded" class="progressbar mp4">100%</div>
      </div>

      <p>musique.mp3</p>
      <div class="progressbar-wrapper">
        <div title="downloading" class="progressbar mp3">60%</div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "PlayGround",
  created() {

  },
  data() {
    return {
      deadline: '',

    };
  },
  components: {},

  methods: {}
}


</script>

<style scoped>

:root {
  --success: #00b894;
  --progress: #e17055;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

h1 {
  text-transform: uppercase;
  letter-spacing: 1.1px;
}

.container {
  max-width: 720px;
  margin: 0px auto;
  width: 100%;
}

.text-center {
  text-align: center;
}

.progressbar-wrapper {
  background-color: #dfe6e9;
  color: white;
  border-radius: 15px;
  width: 100%;
}

.progressbar {
  background-color: var(--progress);
  color: white;
  padding: 1rem;
  text-align: right;
  font-size: 20px;
  border-radius: 15px;
}

.progressbar[title="downloading"] {
  background-color: red;
}

.progressbar[title="downloaded"] {
  background-color: var(--success);
}

.mp4 {
  width: 100%;
}

.mp3 {
  width: 10%;
}
</style>