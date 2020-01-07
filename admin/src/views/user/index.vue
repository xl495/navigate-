<template>
  <div class="user-wrap" v-if="tableData">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="账号" width="350">
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" width="350">
      </el-table-column>
      <el-table-column label="用户组">
        <template slot-scope="scope">
          {{ scope.row.roles == 'user' ? '普通用户' : '管理员' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="initdialog(scope.row);"
            >编辑&nbsp;</el-button
          >
          <el-link type="danger" @click="remove(scope.row)"> 删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="修改用户"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      >
      <div class="demo-drawer__content">
        <el-form :model="model" style="flex:1">
          <el-form-item label="账号" label-width="80px">
              <el-tooltip class="item" effect="dark" content="不可修改账号!" placement="bottom-end">
                <el-input v-model="model.username" disabled autocomplete="off"></el-input>
              </el-tooltip>
          </el-form-item>
          <el-form-item label="昵称" label-width="80px">
            <el-input v-model="model.nickName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户组" label-width="80px">
            <el-select v-model="model.roles" placeholder="请选择">
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="update" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
      </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      tableData: null,
      dialog: false,
      loading: false,
      model: {},
      roles:[
        {label:'普通用户',value:'user'},
        {label:'管理员',value:'admin'},
      ]
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/user");
      this.tableData = res;
    },
    async update() {
      this.loading = true;
      try{
        const res = await this.$http.put(`/user/${this.model._id}`, this.model);
        this.$message.success('修改成功!');
        this.fetch();
        this.loading = false;
        this.dialog = false;
      }catch (e){
        console.log(e);
        this.loading = false;
      }
      
      
    },
    async remove(v) {
      try{
          this.$confirm('您确定要删除吗 ? ').then( async ()=>{
          const res = await this.$http.delete(`/user/${v._id}`);
          this.$message.success('删除成功!');
          this.fetch();
        })
      }catch(e){
        return
      }
      
    },
    cancelForm() {},
    initdialog(e){
      this.dialog = true;
      this.model = {...e};
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss">
.demo-drawer__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
}
.demo-drawer__footer {
  display: flex;
}
.demo-drawer__footer button {
    flex: 1;
}
</style>
