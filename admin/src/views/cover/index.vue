<template>
  <div class="cover-wrap">
    <el-button type="primary" @click="dialog = true">添加</el-button>
    <div class="image-wrap">
      <div class="imgage" v-for="v in images" :key="v.id">
        <div class="image-header"></div>
        <div class="image-container">
          <img :src="v.url" :alt="v.title" />
        </div>
      </div>
    </div>

    <el-drawer
      title="添加壁纸"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form ref="model" :model="model" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              :headers="getAuthToken()"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
                width="100%"
              />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
                style="font-size: 2rem"
              ></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit" :loading="loading">{{
            loading ? "提交中 ..." : "确 定"
          }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "cover",
  data() {
    return {
      model: {},
      loading: false,
      dialog: false,
      imageUrl: null,
      images: null
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/Cover/list");
      this.images = res.data;
    },
    async onSubmit() {
      const res = await this.$http.post("rest/Cover", this.model);
      this.model = {};
      this.dialog = false;
      this.$message.success("添加成功!");
    },
    handleAvatarSuccess(e) {
      this.imageUrl = e.url;
      this.model.url = e.url;
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss">
.image-wrap {
  .imgage {
    width: 450px;
    display: inline-flex;
    justify-content: space-between;
    .image-container {
      img {
        width: 100%;
      }
    }
  }
}
</style>
