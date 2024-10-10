<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="ma-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Polease
        </h1>
        <p class="subheading font-weight-regular">
          This application is now developing by Leez4rd,
          <br>Follow status on Team T1deS Github repository.
        </p>
      </v-col>
      <v-col cols="12">
        <v-btn @click="addData" class="ma-2">添加数据</v-btn>
        <v-btn @click="queryData" class="ma-2">查询数据</v-btn>
        <v-btn @click="testPerformance" class="ma-2">测试性能</v-btn>
      </v-col>
      <v-col cols="12">
        <v-chip class="ma-2" color="blue" text-color="white" v-model="msg">
          {{ msg }}
        </v-chip>
        <v-chip class="ma-2" color="blue" text-color="white" v-model="duration">
          {{ duration }}
        </v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: "HelloWorld",
  data() {
    return {
      duration: "响应计时器",
      msg: "请求指示器",
    };
  },
  methods: {
    addData() {
      axios.get('/api/test/addData')
        .then(response => {
          this.msg = response.data.msg;
          this.duration = response.data.duration;
        })
        .catch(error => {
          console.error('访问失败:', error);
        });
    },
    queryData() {
      axios.get('/api/test/fetchData')
        .then(response => {
          this.msg = response.data.msg;
          this.duration = response.data.duration;
        })
        .catch(error => {
          console.error('访问失败:', error);
        });
    },
    testPerformance() {
      axios.get('/api/test/queryData')
        .then(response => {
          this.msg = response.data.msg;
          this.duration = response.data.duration;
        })
        .catch(error => {
          console.error('访问失败:', error);
        });
    },
  },
};
</script>
