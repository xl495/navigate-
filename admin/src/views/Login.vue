<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            {{ type ? "登陆" : "注册" }}
          </el-col>
          <el-col :span="6" class="text-right">
            <el-link type="primary" @click="type = !type">{{
              type ? "去注册" : "去登陆"
            }}</el-link>
          </el-col>
        </el-row>
      </div>
      <el-form
        ref="form"
        :model="model"
        label-width="60px"
        style="width: 345px"
        class="pt-3"
      >
        <el-form-item required label="账号">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item required label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="send">{{
            type ? "登陆" : "注册"
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      type: !0,
      model: {}
    };
  },
  methods: {
    async send() {
      const url = this.type ? "user/login" : "user/registered";
      const res = await this.$http.post(url, this.model);
      console.log(res);
      this.$message.success(`欢迎回来 ${res.name} !`);
      sessionStorage.setItem('token',res.token);
      this.$router.push('/');
    }
  }
};
</script>
<style lang="scss" scope>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
