<template>
  <v-container>
    <v-form>
      <v-text-field
          v-model="method_name"
          label="Method name"
          required
      >

      </v-text-field>
      {{ message }}
      <v-btn
          color="primary"
          class="mr-4"
          @click="createMethod()"
      >
        Create
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios"

export default {
  name: "CreateMethod",
  data() {
    return {
      method_name: "",
      token: null,
      loading: false,
      message: "",
      methods:[],
      error: false
    }
  },
  mounted() {
     document.title = "Create Method";
  },
  methods: {

    createMethod() {

      if (this.methodName !== "") {
        this.error = false;
        this.loading = true;

        const params = new URLSearchParams();
        params.append("method_name", this.method_name);

        axios.post(this.$api + 'methods', params).then(
            response => {

              this.loading = false;
              if (response.status ===  200 ) {
                console.log(response.data.message);
              }
            }
        )
      }
    },

  }
}
</script>

<style scoped>

</style>