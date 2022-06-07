<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        人脸布控 - 人脸检索
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="glyphicon glyphicon-home"></i> 首页
          </a>
        </li>
        <li>
          <i class="glyphicon glyphicon-cog"></i> 人脸布控
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust">人脸检索</i>
        </li>
      </ol>
    </section>
    <el-card class="box-card">
      <div class="condition-box">
        <div class="condition-box_up">
          <span>检索照片：</span>
          <el-button type @click="uploadImg">上传文件</el-button>
          <span>支持文件格式：jpg,bmp,png,jpeg,单个文件不能超过1M</span>
        </div>
        <div class="condition-box_datePk">
          <span>检索范围：</span>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="condition-box_slider">
          <span class="demonstration">相似度：</span>
          <el-slider v-model="value1" :format-tooltip="formatTooltip"></el-slider>
        </div>
        <div>
          <el-button type="primary" class="searchBtn">检索</el-button>
        </div>
      </div>
      <!-- table表格区域 -->
      <div class="box-table">
        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="date" label="对比照片" width="180">
			<template slot-scope="scope">
						<el-image
						style="width:70px; height: 70px"
						:src="scope.row.Url"
						:preview-src-list="[scope.row.Url]"
						>
						<div slot="error" class="image-slot">
							<i class="el-icon-picture-outline"></i>
						</div>
						</el-image>
					</template>
		  </el-table-column>
          <el-table-column prop="name" label="抓拍照片" width="180">
			<template slot-scope="scope">
						<el-image
						style="width:70px; height: 70px"
						:src="scope.row.Url"
						:preview-src-list="[scope.row.Url]"
						>
						<div slot="error" class="image-slot">
							<i class="el-icon-picture-outline"></i>
						</div>
						</el-image>
					</template>
		  </el-table-column>
          <el-table-column prop="address" label="姓名"></el-table-column>
          <el-table-column prop="name" label="人员类型"></el-table-column>
          <el-table-column prop="name" label="性别"></el-table-column>
          <el-table-column prop="name" label="年龄"></el-table-column>
          <el-table-column prop="name" label="戴眼镜"></el-table-column>
          <el-table-column fixed="right" prop="name" label="戴口罩"></el-table-column>
          <el-table-column fixed="right" prop="name" label="肤色"></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </div>
    </el-card>
	<!-- 文件上传弹窗 -->
	 <el-dialog
        title="上传文件"
        :visible.sync="uploadSoftPop"
        :close-on-click-modal='false'
        width="500px"
        class="el-dialog-reset auth-pop">
        <div style="padding:0px;">
          <div class="row mb-20">
            <div class="col-sm-4 text-right">请选择待上传的软件</div>
            <div class="col-sm-8 upload-zip">
              <el-upload        
                ref="upload"
                name="file"
                :limit=1
                :with-credentials="true"
                :file-list="fileList"
                :action="exportUrl+'?appId='+appId"
                :auto-upload="false"
                :on-exceed="exceed"
                :on-change='selectChange'
                :on-error="uploadErr"
                :before-upload="beforeAvatarUpload"
                :on-success="successCheck"
                :on-remove="removeFile">
				<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-if="!isUpload">上传</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" v-if="isUpload" @click="abortUpLoad">取消</el-button>
              </el-upload>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="uploadSoftPop = false">关闭</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script src="./faceSearching.js">

</script>
<style  scoped>
@import './faceSearching'
</style>