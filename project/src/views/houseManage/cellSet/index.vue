<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        基础设置 - 房屋设置
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="glyphicon glyphicon-home"></i> 首页
          </a>
        </li>
        <li>
          <i class="glyphicon glyphicon-cog"></i> 基础设置
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 房屋设置
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid tree-color">
      <div class="panel-body" style="padding: 0px;">
        <div class="row">
          <div class="col-lg-4 model-one">
            <div class="box box-primary">
              <div class="box-header with-border">
                <!-- <h3 class="box-title" style="font-weight: bold;">子用户</h3> -->
                <!-- <div class="">
                  <el-input placeholder="搜索分组名称" v-model="groupVal">
                    <el-button slot="append" @click="getGroupByVal">搜索</el-button>
                  </el-input>
                </div> -->
              </div>
              <div class="box-body">
                <div class="row">
                  <div class="col-lg-12">
                    <div style="width: 100%;overflow-x: hidden;overflow-y: auto" class="tree-box" v-loading="loading1">
                      <el-tree
                        ref="tree"
                        :data="data"
                        :props="defaultProps"
                        node-key="id"
                        @node-click="handleNodeClick"
                        :highlight-current="true"
                        :expand-on-click-node="false"
                        :default-expand-all="true"
                        :check-on-click-node="true"
                      >
                        <!-- 小区 -->
                        <span class="custom-tree-node" slot-scope="{ node,data }">
                          <span class="btn-box" v-if="data.level==1" @click="getSubList(data.id,data.level)">
                            <span>{{ data.name}}</span>
                            <span>
                              <i @click.stop="addOne('$event',data.id,1,data.groups.length)" class="el-icon-plus"></i>
                            </span>
                          </span>

                          <!-- 楼栋 -->
                          <span  class="btn-box" v-if="data.level==2" @click="getSubList(data.id,data.level)">
                            <span>{{ data.name}}</span>
                            <span>
                              <i class="el-icon-plus" @click.stop="addOne('$event',data.id,data.level,data.groups.length)"></i>
                              <i class="el-icon-edit" @click.stop="editOne('$event',data.id,data.level,data.name)"></i>
                              <i class="el-icon-delete" @click.stop="deleteOne('$event',data.id)"></i>
                            </span>
                          </span>

                          <!-- 单元 -->
                          <span  class="btn-box" v-if="data.level==3" @click="getSubList(data.id,data.level)">
                            <span>{{ data.name}}</span>
                            <span>
                             <i class="el-icon-plus" @click.stop="addOne('$event',data.id,data.level,data.num)"></i>
                              <i class="el-icon-edit" @click.stop="editOne('$event',data.id,data.level,data.name)"></i>
                              <i class="el-icon-delete" @click.stop="deleteOne('$event',data.id,data.level)"></i>
                            </span>
                          </span>
                          <!-- 房号 -->
                          <span  class="btn-box" v-if="data.level==5" @click="getPersonData(data.id,data.level)">
                            <span>{{ data.name}}</span>
                            <span>
                              <i class="el-icon-edit" @click.stop="editOne('$event',data.id,data.level,data.name)"></i>
                              <i class="el-icon-delete" @click.stop="deleteOne('$event',data.id,data.level)"></i>
                            </span>
                          </span>
                        </span>
                      </el-tree>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
          <div class="col-lg-8 model-two">
            <div class="box box-primary">
              <div class="box-body">
                <div class="level01" v-if="level==1" v-loading="loading">
                  <h3 class="box-title">楼栋列表</h3>
                  <ul class="level-content">
                    <li v-for="(item,index) in houseInfo" :key="index" @click="getSubList(item.id,2)">
                      <div class="level-left">
                        <p>{{item.name}}</p>
                        <p>呼叫编号：{{item.number}}</p>
                      </div>
                      <ul class="level-right">
                        <li>单元数：{{item.oneNum}}</li>
                        <li>户室数：{{item.twoNum}}</li>
                        <li>住户数：{{item.threeNum}}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div class="level01" v-if="level==2" v-loading="loading">
                  <h3 class="box-title">单元列表</h3>
                  <ul class="level-content">
                     <li v-for="(item,index) in houseInfo" :key="index" @click="getSubList(item.id,3)">
                      <div class="level-left">
                        <p>{{item.name}}</p>
                        <p>呼叫编号：{{item.number}}</p>
                      </div>
                      <ul class="level-right">
                        <li>楼层数：{{item.oneNum}}</li>
                        <li>户室数：{{item.twoNum}}</li>
                        <li>住户数：{{item.threeNum}}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div class="level01" v-if="level==3" v-loading="loading">
                  <h3 class="box-title">户室列表</h3>
                   <div class="pagination-lc mt-20" style="display: flex;">
                    <el-pagination
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-size="1"
                      layout="prev, pager, next"
                      :total="total"
                    ></el-pagination>
                    <!-- <i class="arrow-icon el-icon-arrow-left"></i>
                    <ul class="level-ul">
                      <li v-for="(item,index) in tiresList" :key="index" :class="{'active':currentIndex==item.idx}" @click="clickLevel(item.idx,item.id)"><span>{{item.title}}</span></li>                    
                    </ul>
                    <i class="arrow-icon el-icon-arrow-right"></i> -->
                    <span class="go-to">前往　</span>
                    <el-select
                      placeholder="请选择"
                      v-model="value"
                      @change="LevelChange"
                    >
                      <el-option
                        v-for="i in tiresList"
                        :key="i.id"
                        :label="i.title"
                        :value="i.id"
                      ></el-option>
                    </el-select>
                  </div>
                  <ul class="level-content mt-20">
                     <li v-for="(item,index) in houseInfo" :key="index"  @click="getPersonData(item.id,5)">
                      <div class="level-left">
                        <p>{{item.name}}</p>
                        <p>呼叫编号：{{item.number}}</p>
                      </div>
                      <ul class="level-right">
                        <li>住户数：{{item.oneNum}}</li>
                        <li>租客数：{{item.twoNum}}</li>
                        <li>IC卡数：{{item.threeNum}}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div class="level01" v-if="level==5" v-loading="loading">
                  <h3 class="box-title">住户列表</h3>
                  <table-cmp :table-data="tableData" :table-label="tableLabel" ref="tableChild" :is-show-select="isShowSelect">
                    <!-- <el-table-column
                      slot="operate"
                      label="操作"
                      align="center"
                      
                      width="200"
                    >
                      <template slot-scope="scope">
                        <el-row>
                          <el-button title="编辑" type="primary" icon="el-icon-edit" round size="mini"></el-button>
                          <el-button title="删除" type="danger" icon="el-icon-delete" round size="mini"></el-button>
                        </el-row>
                      </template>
                    </el-table-column> -->
                  </table-cmp>
                  <div class="block mt-10">
                    <el-pagination
                      @size-change="handleSizeChange1"
                      @current-change="handleCurrentChange1"
                      :current-page="currentPage"
                      :page-sizes="[10, 15, 20, 25]"
                      :page-size="10"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total1"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <el-dialog
      title="批量添加楼栋单元"
      :visible.sync="allAddPopVisible"
      width="500px"
      @close="closePop"
      class="el-dialog-reset set-pop">
      <div style="padding:0px;">

        <el-form ref="addNum" :model="addNum" v-if="addIndex==1">
          <el-form-item v-if="addType<=1" >
             <label for=""> <span style="color: red;line-height:40px">*</span>楼栋数：</label>
             <el-select v-model="addNum.num1" placeholder="">
              <el-option
                v-for="item in numArr"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="addType<=2">
             <label for=""> <span style="color: red;line-height:40px">*</span>单元数：</label>
             <el-select v-model="addNum.num2" placeholder="">
             <el-option
                v-for="item in numArr"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="addType<=3">
             <label for=""> <span style="color: red;line-height:40px">*</span>楼层数：</label>
             <el-select v-model="addNum.num3" placeholder="">
             <el-option
                v-for="item in numArr"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
             <label for=""> <span style="color: red;line-height:40px">*</span>每层户数：</label>
             <el-select v-model="addNum.num4" placeholder="">
             <el-option
                v-for="item in numArr"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form ref="form1" v-if="addIndex==2&&addType==1">
          <el-form-item>
             <label for=""> <span style="color: red;line-height:40px">*</span>楼栋名称：</label>
              <el-input style="height:42px" v-for="(item,index) in addForm.groups" :key="index" v-model="item.name" maxlength=6></el-input>
          </el-form-item>
          <el-form-item>
             <label for=""> <span style="color: red;line-height:40px">*</span>单元数：</label>
             <el-select  v-for="(item,index) in addForm.groups" :key="index" v-model="item.unitNum" placeholder="">
              <el-option
                  v-for="item in numArr"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
             <label for=""> <span style="color: red;line-height:40px">*</span>楼层数：</label>
              <el-select  v-for="(item,index) in addForm.groups" :key="index" v-model="item.tireNum" placeholder="">
             <el-option
                v-for="item in numArr"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
             <label for=""> <span style="color: red;line-height:40px">*</span>每层户数：</label>
             <el-select  v-for="(item,index) in addForm.groups" :key="index" v-model="item.houseNum" placeholder="">
             <el-option
                v-for="item in numArr"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
         <el-form ref="form1" v-if="addIndex==2&&addType==2">
         
          <el-form-item>
             <label for=""> <span style="color: red;line-height:40px">*</span>单元名称：</label>
            <el-input style="height:42px" v-for="(item,index) in addForm.groups" :key="index" v-model="item.name" maxlength=6></el-input>
          </el-form-item>
          <el-form-item>
             <label for=""> <span style="color: red;line-height:40px">*</span>楼层数：</label>
              <el-select  v-for="(item,index) in addForm.groups" :key="index" v-model="item.tireNum" placeholder="">
             <el-option
                v-for="item in numArr"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
             <label for=""> <span style="color: red;line-height:40px">*</span>每层户数：</label>
             <el-select  v-for="(item,index) in addForm.groups" :key="index" v-model="item.houseNum" placeholder="">
             <el-option
                v-for="item in numArr"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
         <el-form ref="form1" v-if="addIndex==2&&addType==3">
         
         
          <el-form-item>
             <label for=""> <span style="color: red;line-height:40px">*</span>楼层名称：</label>
             <el-input style="height:42px" v-for="(item,index) in addForm.groups" :key="index" v-model="item.name" maxlength=6></el-input>
          </el-form-item>
          <el-form-item>
             <label for=""> <span style="color: red;line-height:40px">*</span>每层户数：</label>
             <el-select  v-for="(item,index) in addForm.groups" :key="index" v-model="item.houseNum" placeholder="">
             <el-option
                v-for="item in numArr"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
       <span slot="footer" class="dialog-footer" v-if="addIndex==1">
        <el-button @click="allAddPopVisible=false">取 消</el-button>
        <el-button type="primary" @click="addNext" >下一步</el-button>
      </span>
       <span slot="footer" class="dialog-footer" v-if="addIndex==2">
        <el-button @click="addIndex=1">上一步</el-button>
        <el-button v-if="!isRequst" type="primary" @click="addSure" >确定</el-button>
        <el-button v-else type="primary">提交中</el-button>
      </span>
    </el-dialog>
    <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
    <from-dialog
      ref="addGialog"
      :popVisible.sync="fromPopVisible"
      :popTitle="fromPopTitle"
      :popContent="fromPopContent"
      :popValue="popValue"
      hasMaxLength=6
    ></from-dialog>
  </div>
</template>
<script src="./cellSet.js"></script>
<style scoped lang="scss">
@import "./cellSet.scss";
</style>
