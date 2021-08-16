<template>
  <div class="app-container">
    <div class="block">
      <!-- 搜索栏 -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="节点">
          <el-select
            v-model="searchTaskForm.nodeId"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in nodeIdOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目类型">
          <el-select
            v-model="searchTaskForm.projectType"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in projectTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="任务类型">
          <el-select
            v-model="searchTaskForm.taskType"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in taskTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select
            v-model="searchTaskForm.status"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary" @click="search()">查询</el-button>
      </el-form>

      <!-- 节点管理表格 -->
      <el-table :data="taskList" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="任务参数">
                <span>{{ props.row.params }}</span>
              </el-form-item>
              <el-form-item label="调度时间">
                <span>{{ props.row.dispatchTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="taskId" label="任务ID"></el-table-column>
        <el-table-column
          prop="taskStartTime"
          label="任务送达时间"
        ></el-table-column>
        <el-table-column
          prop="taskEndTime"
          label="任务结束时间"
        ></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
      </el-table>

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
      searchTaskForm: {
        nodeId: "",
        projectType: "",
        taskType: "",
        status: "",
      },
      nodeIdOptions: [
        {
          value: 1,
          label: "节点名称测试数据1",
        },
        {
          value: 2,
          label: "节点名称测试数据2",
        },
        {
          value: 3,
          label: "节点名称测试数据3",
        },
        {
          value: 4,
          label: "节点名称测试数据4",
        },
        {
          value: 5,
          label: "节点名称测试数据5",
        },
        {
          value: 6,
          label: "节点名称测试数据6",
        },
        {
          value: 7,
          label: "节点名称测试数据7",
        },
      ],
      projectTypeOptions: [
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
      taskTypeOptions: [
        {
          value: 1,
          label: "任务类型1",
        },
      ],
      statusOptions: [
        {
          value: 1,
          label: "未调度",
        },
        {
          value: 2,
          label: "运行中",
        },
        {
          value: 3,
          label: "运行成功",
        },
        {
          value: 4,
          label: "运行异常",
        },
        {
          value: 5,
          label: "已取消",
        },
      ],
      keyWord: "", // 关键字
      pageNum: 1, //当前页码
      pageSize: 10, //默认每页数据量
      totalCount: 0, //总数
      taskList: [], // 节点集合
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    /**
     * 根据节点id、项目类型、任务类型、状态搜索
     */
    search() {
      console.log(this.searchTaskForm);
      this.httpPost("/task/v1/searchTaskByParam", this.searchTaskForm).then(
        (res) => {
          console.log(res.data);
          this.pageNum = res.data.pageNum;
          this.pageSize = res.data.pageSize;
          this.totalCount = res.data.total;
          this.taskList = res.data.data;
        }
      );
    },
    /**
     * 数据导入
     */
    loadData() {},
    /**
     * 处理页面大小变化
     */
    handleSizeChange() {},
    /**
     * 处理当前页面变化
     */
    handleCurrentChange() {},
  },
};
</script>

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

.el-table {
  margin-top: 15px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>