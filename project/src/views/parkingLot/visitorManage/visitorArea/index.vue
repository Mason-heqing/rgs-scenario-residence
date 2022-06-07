<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
          <!-- {{msg}} -->
          <small>Optional description</small>
        </h1>
        <!-- <ol class="breadcrumb">
          <li>
            <a href="#">
              <i class="fa fa-dashboard"></i> Level
            </a>
          </li>
          <li class="active">Here</li>
        </ol> -->
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
        <search-form 
            size='medium'
            labelWidth = '60px' 
            :searchData = "searchData"
            :searchForm = "searchForm"
            :editRules='editRules'
            :searchHandle="searchHandle"
        >
        </search-form>
      </section>
    
  </div>
</template>
<script src="./visitorArea.js"></script>
<style scoped lang="scss">
@import "./visitorArea.scss";
</style>
