<template>

  <v-card>
    <v-card-title class="justify-center">

      <v-data-table
          :headers="module"
          :items="moduleData"
          :hide-default-footer="true"
      />

    </v-card-title>
    <v-card-text>

      <v-img ID="img-machine" src="../assets/Assemblage_210504.png"/>
      <v-img @click="rotate('img-pinch1')" class="pinch" ID="img-pinch1" src="../assets/pinch25a.png"/>
      <v-img @click="rotate('img-pinch2')" class="pinch" ID="img-pinch2" src="../assets/pinch25b.png"/>
      <v-img @click="rotate('img-pinch3')" class="pinch" ID="img-pinch3" src="../assets/pinch25c.png"/>
      <v-img @click="rotate('img-pinch4')" class="pinch" ID="img-pinch4" src="../assets/pinch25d.png"/>
      <!--<v-img @click="rotate('img-pinch5')" class="pinch" ID="img-pinch5" src="../assets/pinch25a.png"/>
      <v-img @click="rotate('img-pinch6')" class="pinch" ID="img-pinch6" src="../assets/pinch25a.png"/>
      <v-img @click="rotate('img-pinch7')" class="pinch" ID="img-pinch7" src="../assets/pinch25a.png"/>
      <v-img @click="rotate('img-pinch8')" class="pinch" ID="img-pinch8" src="../assets/pinch25a.png"/>
      <v-img class="pinch" ID="img-Pump1R" src="../assets/Pump1R.png"/>
      <v-img class="pinch" ID="img-Pump1L" src="../assets/Pump1L.png"/>-->
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "PlatForm",
  data: () => ({
    module: [

      {text: 'Value1', value: 'Step1', align: 'start', width: 82},
      {text: 'Value2', value: 'Step2', width: 82},
      {text: 'Value3', value: 'Step3', width: 82},
      {text: 'Value4', value: 'Step4', width: 82}
    ],
    moduleData: [
      {Step: 0, Step1: 0, Step2: 0, Step3: 0, Step4: 0},

    ],
    angle:45,
  }),
  methods: {

    rotate(id) {

      this.angle = 45;
      let currentAngle = 0;

      if (document.getElementById(id).style.transform !== '')
        currentAngle = parseInt(document.getElementById(id).style.transform.match(/\d+/)[0]);

      if (currentAngle === 0) {
        document.getElementById(id).style.transform = 'rotate(' + this.angle + 'deg)';
      } else if (parseInt(document.getElementById(id).style.transform.match(/\d+/)[0]) === 45) {
        this.angle += 45;
        document.getElementById(id).style.transform = 'rotate(' + this.angle + 'deg)';
      } else {
        this.angle = 0;
        document.getElementById(id).style.transform = 'rotate(' + this.angle + 'deg)';
      }

      this.SetTableValues(id, this.angle);
    },

    SetTableValues(id, angle) {


      switch (id) {
        case 'img-pinch1':
          if (angle === 0)
            this.moduleData[0]['Step1'] = 0;
          else if (angle === 45)
            this.moduleData[0]['Step1'] = 1;
          else
            this.moduleData[0]['Step1'] = 2;
          break;

        case 'img-pinch2':
          if (angle === 0)
            this.moduleData[0]['Step2'] = 0;
          else if (angle === 45)
            this.moduleData[0]['Step2'] = 1;
          else
            this.moduleData[0]['Step2'] = 2;
          break;

        case 'img-pinch3':
          if (angle === 0)
            this.moduleData[0]['Step3'] = 0;
          else if (angle === 45)
            this.moduleData[0]['Step3'] = 1;
          else
            this.moduleData[0]['Step3'] = 2;
          break;

        case 'img-pinch4':
          if (angle === 0)
            this.moduleData[0]['Step4'] = 0;
          else if (angle === 45)
            this.moduleData[0]['Step4'] = 1;
          else
            this.moduleData[0]['Step4'] = 2;
          break;


      }
    }
  }
}
</script>

<style scoped>

#platform {

}

#img-machine {
  height: 600px;
  width: 600px;
}

.pinch {
  height: 40px;
  width: 40px;
}

#img-pinch1 {
  position: relative;
  left: 14px;
  top: -382px;
}

#img-pinch2 {
  position: relative;
  left: 14px;
  top: -368px;
}

#img-pinch3 {
  position: relative;
  left: 11px;
  top: -342px;
}

#img-pinch4 {
  position: relative;
  left: 9px;
  top: -320px;
}

#img-pinch5 {
  position: relative;
  left: 275px;
  top: 1005px;
}

#img-pinch6 {
  position: relative;
  left: 395px;
  top: 920px;
}

#img-pinch7 {
  position: relative;
  left: 496px;
  top: 920px;
}

#img-pinch8 {
  position: relative;
  left: 639px;
  top: 980px;

}

#img-Pump1R {
  position: relative;
  top: 776px;
  left: 440px;
}

#img-Pump1L {
  position: relative;
  top: 776px;
  left: 440px;
}
</style>