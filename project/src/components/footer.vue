<template>
    <footer class="main-footer">
      <!-- To the right -->
      <div class="pull-right hidden-xs"><strong>Version</strong> {{version}}</div>
      <!-- Default to the left -->
      <strong>
        <span v-html="companyMsg"></span>
      </strong>
    </footer>
</template>
<script>
import Cookies from 'js-cookie';
export default {
  name: 'footer',
  data () {
    return {
      companyMsg:'',
      version:'',
    }
  },
  created(){
    this.utils.http({
        url: "/home/page/getBottomInfo",
        method: "GET",
        params: {}
      },
      res => {
        if(res.code==200){
         this.companyMsg=res.data.copyright;
         this.version=res.data.version;
         if('' != res.data.tcpUrl){
              Cookies.set('tcpUrl',res.data.tcpUrl);
         }
        }       
      });  
  },
}
</script>