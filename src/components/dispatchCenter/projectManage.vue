<template>
  <div class="app-container">
    <div class="block">
      <!-- 搜索栏 -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="任务名称">
          <el-input v-model="keyWord" placeholder="请输入任务名称"></el-input>
        </el-form-item>

        <el-button type="primary" @click="search()">查询</el-button>

        <!-- 新增任务类型 -->
        <el-button
          style="float: right"
          type="primary"
          icon="el-icon-plus"
          @click="dialogFormVisible = true"
          circle
        ></el-button>
      </el-form>

      <!-- 节点管理表格 -->
      <el-table
        ref="filterTable"
        :data="projectApiList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="projectType"
          label="项目类型"
          sortable
          column-key="projectType"
          :filters="[
            { text: '云采集', value: '云采集' },
            { text: '云文析', value: '云文析' },
            { text: '云统计', value: '云统计' },
          ]"
          :filter-method="filterHandler"
        ></el-table-column>
        <el-table-column prop="taskType" label="任务类型"></el-table-column>
        <el-table-column prop="taskName" label="任务名称"></el-table-column>
        <el-table-column prop="schedulingUrl" label="调度url"></el-table-column>
        <el-table-column prop="cancelUrl" label="取消url"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="handleStop(scope.$index, scope.row)"
              >禁用</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="handleStart(scope.$index, scope.row)"
              >启用</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
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
      keyWord: "", // 关键字
      pageNum: 1, //当前页码
      pageSize: 10, //默认每页数据量
      totalCount: 0, //总数
      projectApiList: [
        {
          projectType: "云文析",
          taskType: "任务种类模拟数据",
          taskName: "任务名称模拟数据",
          schedulingUrl: "调度url模拟数据",
          cancelUrl: "取消url模拟数据",
          items: [
            {
              project: "云文析",
              status: "运行中",
              load: "3",
            },
          ],
        },
      ], // 节点集合
    };
  },
  created() {
    this.loadData();
  },
  methods: {
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
     * 搜索
     */
    search() {},
    /**
     * 项目名称筛选
     */
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
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
</style>