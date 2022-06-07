<template>
	<div class="content-wrapper">
			<section class="content-header">
				<h1 class="nice">
					视频布控 - 视频监控
					<!-- <small>Optional description</small> -->
				</h1>
				<ol class="breadcrumb">
					<li>
						<a href="/">
							<i class="glyphicon glyphicon-home"></i> 首页
						</a>
					</li>
					<li>
						<i class="glyphicon glyphicon-cog"></i> 视频布控
					</li>
					<li class="active">
						<i class="glyphicon glyphicon-adjust">视频监控</i>
					</li>
				</ol>
			</section>
			<!-- 视频播放区 -->
			<el-card class="wrapper-card">
				<div class="warpper-topBox">
					<el-button-group>
						<el-button v-for="(item,index) in showType" :key="index"  :class="{'active_A':index == num}" type="primary" @click="showTypeNum(item.id,index)" >{{item.title}}</el-button>
					</el-button-group>
				</div>
				<div class="wrapper-content">
					<div class="content_left">
						<el-input placeholder="搜索" v-model="filterText"></el-input>
						<el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="el_tabs">
							<el-tab-pane label="设备树" name="first">
								<el-tree :data="treeList" ref="tree" node-key="code"  highlight-current :props="defaultProps"  @node-click="handleNodeClick"  :filter-node-method="filterNode">
									</el-tree>
							</el-tab-pane>
							<el-tab-pane label="分组" name="second">分组展示</el-tab-pane>
						</el-tabs>
						
					</div>
					<!-- 监控视频盒子 -->
					<div class="content_video">
						<div class="video-box" v-show="itemLength != 1" :class="{'video-box1': itemLength == 4, 'video-box2' : itemLength == 6}" v-for="(item, index) in forList" :key="index" >
							<LivePlayer @snapOutside="snapOutside"  ref="player2"  :videoUrl="item.url"  fluent :autoplay='false' live  stretch ></LivePlayer>
							<div class="video-close" v-show="item.url" @click="closeVideo(item, index)">关闭</div>
						</div>
						<div class="video-box" >
							<LivePlayer @snapOutside="snapOutside" v-show="itemLength == 1" ref="player2"  :videoUrl=" urlMsg  " fluent :autoplay='false' live stretch ></LivePlayer>
							<div class="video-close" v-show="urlMsg" @click="closeVideo(item, index)">关闭</div>
						</div>
					</div>
					<div class="Camera_box">
						<div class="img_box">
							<img src="../../../assets/luyin.png" alt="">
						</div>
						<div class="img_box1">
							<img src="../../../assets/xiangshang.png" alt="">
						</div>
						<div class="img_box2">
							<img src="../../../assets/xiangxia.png" alt="">
						</div>
						<div class="img_box3">
							<img src="../../../assets/xiangzuo.png" alt="">
						</div>
						<div class="img_box4">
							<img src="../../../assets/xiangyou.png" alt="">
						</div>
					</div>
					
				</div>
			</el-card>
		
	</div>
	
</template>
<script src="./videoMonitor.js">

</script>
<style scoped>
  @import './videoMonitor.css';
</style>

