<template>
  <CountDown v-bind:deadline="deadline"/>
</template>

<script>

import CountDown from "@/components/CountDown";

export default {
  name: "PlayGround",
  created() {
    this.deadline = new Date();
    this.deadline = this.deadline.setMilliseconds(this.deadline.getMilliseconds() + 500000);

  },
  data() {
    return {
      deadline: '',

    };
  },
  components: {
    CountDown
  },
}


</script>

<style scoped>
.flex-view {
  display: flex;
}

.completedSteps {
  font-size: 35px;
  color: #192e5b;
}

.label-style {
  color: #192e5b;
  font-size: 15px;
}

</style>