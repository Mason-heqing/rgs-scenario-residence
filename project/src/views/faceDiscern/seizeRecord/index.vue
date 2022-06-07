<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        人脸布控 - 抓拍记录
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li>
        <li><i class="glyphicon glyphicon-cog"></i> 人脸布控</li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 抓拍记录
        </li>
      </ol>
    </section>
    <el-card >
      <div class="box-cardRow">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-select v-model="sex" placeholder="按性别搜索">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="按年龄搜索" v-model="age"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="mask" placeholder="按口罩搜索">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="glasses" placeholder="按眼镜搜索">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="skin" placeholder="按肤色搜索">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="beard" placeholder="按胡须搜索">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-date-picker
              type="datetime"
              placeholder="开始时间"

              value-format="yyyy-MM-dd HH:mm"
              v-model="startSnapTime"
              style="width:90%"
            ></el-date-picker>
          </el-col>
          <el-col :span="3">
            <el-date-picker
              type="datetime"
              placeholder="结束时间"

              value-format="yyyy-MM-dd HH:mm"
              v-model="endSnapTime"
              default-time="23:59:00"
              style="width:90%;margin-left:-25px"
            ></el-date-picker>
          </el-col>
          <el-col :span="4" >
            <div class="btn-group">
              <button id="btn_device_reset" type="button" class="btn btn-primary"  @click="searchMsg">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索
              </button> 
              <button id="btn_device_reset" type="button" class="btn btn-default pl-8 pr-8" @click="resetMsg">
                <span class="fa fa-reply" aria-hidden="true"></span>重置
              </button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="operation-btn" v-if="false">
        <div @click="checkAll">
          <el-checkbox>全选</el-checkbox>
        </div>
        <div @click="toggerCheck">
          <el-checkbox>反选</el-checkbox>
        </div>
        <div>
          <el-button type icon="el-icon-bottom">导出</el-button>
        </div>
        <div>
          <el-button type="primary" @click="searching">人脸检索</el-button>
        </div>
      </div>

      <!-- table表格区域 -->
      <div class="box-table">
        <el-table
          :data="tableData"
          stripe
          border
          tooltip-effect="dark"
          sortable
          style="width: 100%"
          :header-cell-style="{ backg : '#FAF9F8' }"
          ref="multipleTable"
          @row-click="handleRowClick"
          @selection-change="handleSelectionChange"
        >
          >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="snapPic" label="抓拍照片" width="180">
            <template slot-scope="scope">
              <el-image
                style="width: 70px; height: 70px"
                :src="OimgUrl + '/file/download?path=' + scope.row.snapPic"
                :preview-src-list="[
                  OimgUrl + '/file/download?path=' + scope.row.snapPic,
                ]"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="personName" label="姓名"></el-table-column>
          <el-table-column prop="personType" label="人员类型">
            <template slot-scope="scope">
              <span>{{
                scope.row.personType == 1
                  ? "户主"
                  : scope.row.personType == 2
                  ? "家属"
                  : scope.row.personType == 3
                  ? "租客"
                  : scope.row.personType == 4
                  ? "物业员工"
                  : "陌生人"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <span>{{
                scope.row.sex == 0
                  ? "未知"
                  : scope.row.sex == 1
                  ? "男性"
                  : "女性"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄">
            <template slot-scope="scope">
              <span v-if="scope.row.age == 0">未知</span>
              <span v-else>{{ scope.row.age }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mask" label="戴口罩">
            <template slot-scope="scope">
              <span>{{
                scope.row.mask == 0
                  ? "未知"
                  : scope.row.mask == 1
                  ? "戴口罩"
                  : "无口罩"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="glasses" label="眼镜">
            <template slot-scope="scope">
              <span>{{
                scope.row.glasses == 0
                  ? "未知"
                  : scope.row.glasses == 1
                  ? "戴眼镜"
                  : "无眼镜"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="skin" label="肤色">
            <template slot-scope="scope">
              <span>{{
                scope.row.skin == 0
                  ? "未知"
                  : scope.row.skin == 1
                  ? "黄色"
                  : scope.row.skin == 2
                  ? "白色"
                  : scope.row.skin == 3
                  ? "金色"
                  : "其他"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="beard" label="胡子">
            <template slot-scope="scope">
              <span>{{
                scope.row.beard == 0
                  ? "未知"
                  : scope.row.beard == 1
                  ? "有胡子"
                  : "无胡子"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="deviceName"
            label="抓拍设备"
          ></el-table-column>
          <el-table-column
            fixed="right"
            prop="snapTime"
            label="日期"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 25]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>
	<script src='./seizeRecord.js'>
</script>
<style scoped>
@import './seizeRecord.css';
</style>