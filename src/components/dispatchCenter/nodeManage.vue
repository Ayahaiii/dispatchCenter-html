<template>
  <div class="app-container">
    <div class="block">
      <!-- 搜索栏 -->
      <el-form :inline="true" class="demo-form-inline">
        <!-- <el-form-item label="节点名称">
          <el-input v-model="keyWord" placeholder="请输入节点名称"></el-input>
        </el-form-item>-->
        <el-form-item label="节点状态">
          <el-select v-model="nodeValue" clearable placeholder="请选择">
            <el-option
              v-for="item in nodeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary" @click="search()">查询</el-button>

        <!--新增节点-->
        <el-button
          style="float: right"
          type="primary"
          icon="el-icon-plus"
          @click="dialogFormVisible = true"
          circle
        ></el-button>
        <el-dialog title="新增节点" :visible.sync="dialogFormVisible">
          <el-form :model="addNodeForm">
            <el-form-item label="IP" :label-width="formLabelWidth">
              <el-input v-model="addNodeForm.ip" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="节点名称" :label-width="formLabelWidth">
              <el-input
                v-model="addNodeForm.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="端口号" :label-width="formLabelWidth">
              <el-input
                v-model="addNodeForm.port"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="节点描述" :label-width="formLabelWidth">
              <el-input
                v-model="addNodeForm.description"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addNode()">确 定</el-button>
          </div>
        </el-dialog>
      </el-form>

      <!-- 节点管理表格 -->
      <el-table :data="nodeList" style="width: 100%">
        <!-- 展开子表格 -->
        <el-table-column prop="items" type="expand" width="50">
          <template slot-scope="scope">
            <el-table
              :data="scope.row.dcServiceList"
              :row-style="secTableRowStyle"
              :header-cell-style="secTableHeaderColor"
              style="width: 100%"
              class="secTable"
            >
              <el-table-column label="项目类型">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.projectType == 1" type="warning">云采集</el-tag>
                  <el-tag v-if="scope.row.projectType == 2" type="warning">云文析</el-tag>
                  <el-tag v-if="scope.row.projectType == 3" type="warning">云统计</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.status == 1" type="success"
                    >正常</el-tag
                  >
                  <el-tag v-if="scope.row.status == 2" type="danger"
                    >异常</el-tag
                  >
                  <el-tag v-if="scope.row.status == 3" type="info">关闭</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="url" label="URL"></el-table-column>
              <el-table-column
                prop="heartBeatUrl"
                label="心跳URL"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.status == 1"
                    type="danger"
                    size="mini"
                    @click="handleServiceStop(scope.$index, scope.row)"
                    >禁用</el-button
                  >
                  <el-button
                    v-if="scope.row.status == 1"
                    disabled
                    type="success"
                    size="mini"
                    @click="handleServiceStart(scope.$index, scope.row)"
                    >启用</el-button
                  >
                  <el-button
                    v-if="scope.row.status == 1"
                    disabled
                    type="info"
                    size="mini"
                    @click="handleServiceEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >

                  <el-button
                    v-if="scope.row.status == 2"
                    disabled
                    type="danger"
                    size="mini"
                    @click="handleServiceStop(scope.$index, scope.row)"
                    >禁用</el-button
                  >
                  <el-button
                    v-if="scope.row.status == 2"
                    disabled
                    type="success"
                    size="mini"
                    @click="handleServiceStart(scope.$index, scope.row)"
                    >启用</el-button
                  >
                  <el-button
                    v-if="scope.row.status == 2"
                    disabled
                    type="info"
                    size="mini"
                    @click="handleServiceEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >

                  <el-button
                    v-if="scope.row.status == 3"
                    disabled
                    type="danger"
                    size="mini"
                    @click="handleServiceStop(scope.$index, scope.row)"
                    >禁用</el-button
                  >
                  <el-button
                    v-if="scope.row.status == 3"
                    type="success"
                    size="mini"
                    @click="handleServiceStart(scope.$index, scope.row)"
                    >启用</el-button
                  >
                  <el-button
                    v-if="scope.row.status == 3"
                    type="info"
                    size="mini"
                    @click="handleServiceEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="节点名称"></el-table-column>
        <el-table-column prop="ip" label="IP"></el-table-column>
        <el-table-column prop="port" label="PORT"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
            <el-tag v-if="scope.row.status == 2" type="danger">异常</el-tag>
            <el-tag v-if="scope.row.status == 3" type="info">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="节点描述"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <!-- 正常节点按钮状态 -->
            <el-button
              v-if="scope.row.status == 1"
              disabled
              type="primary"
              size="mini"
              @click="handleNodeAddService(scope.$index, scope.row)"
              >添加</el-button
            >
            <el-button
              v-if="scope.row.status == 1"
              type="danger"
              size="mini"
              @click="handleNodeStop(scope.$index, scope.row)"
              >禁用</el-button
            >
            <el-button
              v-if="scope.row.status == 1"
              disabled
              type="success"
              size="mini"
              @click="handleNodeStart(scope.$index, scope.row)"
              >启用</el-button
            >
            <el-button
              v-if="scope.row.status == 1"
              disabled
              type="info"
              size="mini"
              @click="handleNodeEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <!-- 异常节点按钮状态 -->
            <el-button
              v-if="scope.row.status == 2"
              disabled
              type="primary"
              size="mini"
              @click="handleNodeAddService(scope.$index, scope.row)"
              >添加</el-button
            >
            <el-button
              v-if="scope.row.status == 2"
              type="danger"
              size="mini"
              @click="handleNodeStop(scope.$index, scope.row)"
              >禁用</el-button
            >
            <el-button
              v-if="scope.row.status == 2"
              disabled
              type="success"
              size="mini"
              @click="handleNodeStart(scope.$index, scope.row)"
              >启用</el-button
            >
            <el-button
              v-if="scope.row.status == 2"
              disabled
              type="info"
              size="mini"
              @click="handleNodeEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <!-- 禁用节点按钮状态 -->
            <el-button
              v-if="scope.row.status == 3"
              type="primary"
              size="mini"
              @click="handleNodeAddService(scope.$index, scope.row)"
              >添加</el-button
            >
            <el-button
              v-if="scope.row.status == 3"
              disabled
              type="danger"
              size="mini"
              @click="handleNodeStop(scope.$index, scope.row)"
              >禁用</el-button
            >
            <el-button
              v-if="scope.row.status == 3"
              type="success"
              size="mini"
              @click="handleNodeStart(scope.$index, scope.row)"
              >启用</el-button
            >
            <el-button
              v-if="scope.row.status == 3"
              type="info"
              size="mini"
              @click="handleNodeEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加服务对话框 -->
      <el-dialog title="添加服务" :visible.sync="dialogAddServiceFormVisible">
        <el-form :model="addServiceForm">
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input
              v-model="addServiceForm.url"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="项目类型" :label-width="formLabelWidth">
            <el-input v-model="addServiceForm.projectType" autocomplete="off"></el-input>
          </el-form-item>-->
          <el-form-item label="项目类型" :label-width="formLabelWidth">
            <el-select
              v-model="addServiceForm.projectType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in serviceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="心跳检测url" :label-width="formLabelWidth">
            <el-input
              v-model="addServiceForm.heartBeatUrl"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddServiceFormVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="addService()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑节点对话框 -->
      <el-dialog title="编辑节点" :visible.sync="dialogEditFormVisible">
        <el-form :model="editNodeForm">
          <el-form-item label="IP" :label-width="formLabelWidth">
            <el-input v-model="editNodeForm.ip" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="节点名称" :label-width="formLabelWidth">
            <el-input v-model="editNodeForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="端口号" :label-width="formLabelWidth">
            <el-input v-model="editNodeForm.port" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="节点描述" :label-width="formLabelWidth">
            <el-input
              v-model="editNodeForm.description"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editNode()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑服务对话框 -->
      <el-dialog title="编辑服务" :visible.sync="dialogEditServiceFormVisible">
        <el-form :model="editServiceForm">
          <el-form-item label="URL" :label-width="formLabelWidth">
            <el-input v-model="editServiceForm.url" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目类型" :label-width="formLabelWidth">
            <el-select
              v-model="editServiceForm.projectType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in serviceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="心跳URL" :label-width="formLabelWidth">
            <el-input
              v-model="editServiceForm.heartBeatUrl"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditServiceFormVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="editService()">确 定</el-button>
        </div>
      </el-dialog>

      <!--分页-->
      <div style="float: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nodeOptions: [
        {
          value: "1",
          label: "正常",
        },
        {
          value: "2",
          label: "异常",
        },
        {
          value: "3",
          label: "禁用",
        },
      ],
      nodeValue: "",
      serviceOptions: [
        {
          value: 1,
          label: "云采集",
        },
        {
          value: 2,
          label: "云文析",
        },
        {
          value: 3,
          label: "云统计",
        },
      ],
      keyWord: "", // 关键字
      pageNum: 1, //当前页码
      pageSize: 10, //默认每页数据量
      totalCount: 0, //总数
      nodeList: [],
      dialogFormVisible: false,
      // 添加节点对话框相关
      addNodeForm: {
        ip: "",
        name: "",
        port: "",
        description: "",
      },
      formLabelWidth: "120px",
      // 编辑节点对话框相关
      dialogEditFormVisible: false,
      editNodeForm: {
        id: "",
        name: "",
        ip: "",
        port: "",
        description: "",
      },
      // 添加服务相关
      dialogAddServiceFormVisible: false,
      addServiceForm: {
        nodeId: "",
        url: "",
        projectType: "",
        heartBeatUrl: "",
      },
      // 编辑服务对话框相关
      dialogEditServiceFormVisible: false,
      editServiceForm: {
        id: "",
        nodeId: "",
        url: "",
        projectType: "",
        heartBeatUrl: "",
      },
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    /**
     * 修改子表格行颜色
     */
    secTableRowStyle({ row, rowIndex }) {
      return {
        "background-color": "#F5F7FA",
      };
    },
    /**
     * 修改子表格头颜色
     */
    secTableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: lightblue;color: #fff;font-weight: 500;";
      }
    },
    /**
     * 根据节点状态搜索
     */
    search() {
      console.log(this.nodeValue);
      var param = {
        status: this.nodeValue,
      };
      this.httpPost("/dispatch/v1/searchNodeByParam", param).then((res) => {
        console.log(res.data);
        this.pageNum = res.data.pageNum;
        this.pageSize = res.data.pageSize;
        this.totalCount = res.data.total;
        this.nodeList = res.data.data;
      });
    },
    /**
     * 数据导入
     */
    loadData() {
      this.search();
    },
    /**
     * 处理页面大小变化
     */
    handleSizeChange() {},
    /**
     * 处理当前页面变化
     */
    handleCurrentChange() {},
    /**
     * 新增节点
     */
    addNode() {
      this.httpPost("/dispatch/v1/addNode", this.addNodeForm).then((res) => {
        console.log(res);
      });
    },
    /**
     * 节点添加服务
     */
    handleNodeAddService(index, row) {
      console.log(row);
      this.addServiceForm.nodeId = row.id;
      console.log(this.addServiceForm.nodeId);
      this.dialogAddServiceFormVisible = true;
    },
    addService() {
      console.log(this.addServiceForm);
      this.httpPost("/dispatch/v1/addService", this.addServiceForm).then(
        (res) => {
          console.log(res);
          if (res.message == "调用成功") {
            this.$message({
              message: "添加节点成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "添加节点失败",
              type: "danger",
            });
          }
        }
      );
      this.dialogAddServiceFormVisible = false;
      // 重新导入数据刷新表格
      this.loadData();
    },
    /**
     * 节点禁用
     */
    handleNodeStop(index, row) {
      console.log(row.id);
      var param = {
        id: row.id,
      };
      this.httpPost("/dispatch/v1/stopNode", param).then((res) => {
        console.log(res);
        if (res.message == "调用成功") {
          this.$message({
            message: "禁用节点成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "禁用节点失败",
            type: "danger",
          });
        }
        // 重新导入数据刷新表格
        this.loadData();
      });
    },
    /**
     * 节点启用
     */
    handleNodeStart(index, row) {
      console.log(row.id);
      var param = {
        id: row.id,
      };
      this.httpPost("/dispatch/v1/startNode", param).then((res) => {
        console.log(res);
        if (res.message == "调用成功") {
          this.$message({
            message: "启用节点成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "启用节点失败",
            type: "danger",
          });
        }
        // 重新导入数据刷新表格
        this.loadData();
      });
    },
    /**
     * 节点编辑
     */
    handleNodeEdit(index, row) {
      this.dialogEditFormVisible = true;
      this.editNodeForm.id = row.id;
    },
    editNode() {
      this.httpPost("/dispatch/v1/updateNode", this.editNodeForm).then(
        (res) => {
          console.log(res);
          if (res.message == "调用成功") {
            this.$message({
              message: "编辑节点成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "编辑节点失败",
              type: "danger",
            });
          }
        }
      );
      this.dialogEditFormVisible = false;
      // 重新导入数据刷新表格
      this.loadData();
    },
    /**
     * 服务禁用
     */
    handleServiceStop(index, row) {
      var param = {
        id: row.id,
      };
      this.httpPost("/dispatch/v1/stopService", param).then((res) => {
        console.log(res);
        if (res.message == "调用成功") {
          this.$message({
            message: "禁用服务成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "禁用服务失败",
            type: "danger",
          });
        }
        // 重新导入数据刷新表格
        this.loadData();
      });
    },
    /**
     * 服务启用
     */
    handleServiceStart(index, row) {
      var param = {
        id: row.id,
      };
      this.httpPost("/dispatch/v1/startService", param).then((res) => {
        console.log(res);
        if (res.message == "调用成功") {
          this.$message({
            message: "启用服务成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "启用服务失败",
            type: "danger",
          });
        }
        // 重新导入数据刷新表格
        this.loadData();
      });
    },
    /**
     * 服务编辑
     */
    handleServiceEdit(index, row) {
      this.dialogEditServiceFormVisible = true;
      this.editServiceForm.id = row.id;
      this.editServiceForm.nodeId = row.nodeId;
    },
    editService() {
      this.httpPost("/dispatch/v1/updateService", this.editServiceForm).then(
        (res) => {
          console.log(res);
          if (res.message == "调用成功") {
            this.$message({
              message: "编辑服务成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "编辑服务失败",
              type: "danger",
            });
          }
        }
      );
      this.dialogEditServiceFormVisible = false;
      // 重新导入数据刷新表格
      this.loadData();
    },
  },
};
</script>

<style>
.el-table__expanded-cell {
  padding: 0 !important;
}
</style>

<style scoped>
.el-header {
  width: 100%;
  height: 100px;
  border: 1px solid red;
}

.tableMain {
  width: 100%;
  margin-top: 40px;
}

.el-pagination {
  margin-top: 15px;
}

.secTable {
  padding: 0;
}
</style>