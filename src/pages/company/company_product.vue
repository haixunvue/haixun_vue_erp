<template>
  <div class="content">
    <h1>公司产品</h1>
    <div class="line"></div>
    <div class="select-box">
      <el-row :gutter="10" style="margin-bottom:5px">
        <label>有货无货</label>
        <el-select v-model="value1" placeholder="选择" size="mini">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-row>
    </div>
    <div class="search clear">
      <el-row>
        <div class="search-radio left" style="margin-right:20px;margin-bottom:5px">
          <label>内容搜索</label>
          <el-radio-group v-model="radio" size="mini">
            <el-radio :label="0" border>标题</el-radio>
            <el-radio :label="1" border>SKU</el-radio>
            <el-radio :label="2" border>ASIN</el-radio>
          </el-radio-group>
        </div>
        <el-input v-model="input" style="margin-right:0" placeholder="标题、SKU、ASIN" size="mini"></el-input>
        <el-button type="primary" style="margin-left:5px" size="mini" class="search-btn">搜索</el-button>
      </el-row>
    </div>
    <div class="line" style="margin-bottom:5px"></div>

    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-bottom:20px"
      :default-sort="{prop: 'cname', order: 'descending'}"
      align="center"
      size="mini"
    >
      <el-table-column
        type="selection"
        width="55"
        label="选择"
      >
      </el-table-column>
      <el-table-column
        prop="pic"
        label="产品"
        width="100"
      >
        <template slot-scope="scope">
          <!--<div class="left" style="width:45px;height:45px;background:#ccc">
          </div>
          <div class="right">
            <div>
              当地货币符号 价格(eg:EUR 236.33)
            </div>
            <div>
              SKU: JIANGU001923beige
            </div>
          </div>-->
        </template>
      </el-table-column>
      <el-table-column
        prop="cost"
        label="标题"

      >
      </el-table-column>
      <el-table-column
        prop="profit"
        label="SKU"

      >
      </el-table-column>
      <el-table-column
        prop="buy_data"
        label="价格"
        width="155"
      >
      </el-table-column>
      <el-table-column
        prop="shop"
        label="库存"
        width="100"
      >
      </el-table-column>
      <el-table-column
        label="图片"
      >
        <template slot-scope="scope">
            <div>
              单号: {{ scope.row.buy_data}} <br/>
            </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="international_order"
        label="来源"
        width="200"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="open" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete"  size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>



    <!--<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 20, 50, 100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      style="clear:both;text-align:center">
    </el-pagination>-->




    <!--弹窗区域-->
    <el-dialog title="产品详情" :visible.sync="dialogTableVisible" width="80%">

    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: '',
        total: 0,//默认数据总数
        pagesize: 7,//每页的数据条数
        currentPage: 1,//默认开始页面
        tableData: [{
          id: '0000000001',
          order_num: '000-0000000-0000001',
          pic: '/static/images/lcLU0ZgiTa.png',
          buy_data: '2018-05-08 22:01:53',

          operator: '009 高芳芳',
          shop: '德国',
          amazon: '已发货',
          international: '未发货',
          international_order: 'YT1812926306500039',
          domestic: '待签收~~',
          domestic_order: '493348945168~~',
          count: '2',
          money: '47.24[EUR]',
          cost: '-',
          profit: '-',
          updata_data: '2018-05-09 18:16:01'
        }, {
          id: '47839',
          pic: '/static/images/ntrrLWfLuN.png',
          buy_data: '2018/05/09',
          order_num: '305-1226403-5312348',
          operator: '009 高芳芳',
          shop: '德国',
          amazon: '已发货',
          international: '未发货',
          international_order: 'YT1812926306500039',
          domestic: '待签收~~',
          domestic_order: '493348945168~~',
          count: '2',
          money: '47.24[EUR]',
          cost: '-',
          profit: '-',
          updata_data: '2018/05/09 18:16'
        }],
        dialogTableVisible: false,
        isEdit: false,
        isEditAddress: false,
        goodsData: [
          {
            picUrl: '/static/images/lcLU0ZgiTa.png',
            name: 'GAZHFERY Dame Painter Flat Hut Der Männer Cowboy Bare Hat,Blue1-OneSize',
            sku: 'GFF-BAAFG-721307-03',
            count: '1',
            purchasePrice: '18.000',
            wayBill: '493348945168',
            logIstics: 'minghangkuaidi',
            dataTime: '2018/05/09 18:29'
          },
          {
            picUrl: '/static/images/ntrrLWfLuN.png',
            name: 'GAZHFERY Dame Painter Flat Hut Der Männer Cowboy Bare Hat,Blue1-OneSize',
            sku: 'GFF-BAAFG-721307-03',
            count: '2',
            purchasePrice: '23.000',
            wayBill: '493348945168',
            logIstics: 'minghangkuaidi',
            dataTime: '2018/05/09 18:29'
          }
        ],
        activeName: 'first',
        options1: [
          {
            value: '0',
            label: '全部'
          },
          {
            value: '1',
            label: '有货'
          },
          {
            value: '2',
            label: '无货'
          }
        ],
        value1: '0',

        value_time: '',
        innerVisible: false,
        num: '2',
        isAdd: false,
        isDetil: false,
        radio: 1
      }
    },
    created(){
      this.$http.post(this.api.product_list,{
        user_token:localStorage.getItem('user_token'),
        user_id:localStorage.getItem('user_id')
      }).then((res)=>{
        console.log(res);
      })
    },
    methods: {
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
      },
      handleClick: function () {

      },
      open: function () {
        this.dialogTableVisible = true;
      },
      edit: function () {
        this.isEdit = true;
      },
      pre: function () {
        this.isEdit = false;
      },
      editAddress: function () {
        this.isEditAddress = true;
      },
      addWaybill: function () {
        this.innerVisible = true;
        this.isAdd = true;
        this.isDetil = false;
      },
      addDetail: function () {
        this.innerVisible = true;
        this.isAdd = false;
        this.isDetil = true;
      }
    }
  }
</script>
<style scoped>
  .clear:after {
    content: "";
    display: block;
    clear: both;
    vertical-align: hidden;
  }

  .select-box {
    margin-top: 20px;
    /*margin-bottom: 150px;*/
    margin-bottom: 20px;
  }

  .search {
    margin-top: 13px;
    margin-bottom: 10px;
  }

  .search-radio {
    /*height:30px;
    width: 680px;
    line-height: 30px;
    padding-left: 15px;
    border:1px solid #ebeef5;
    border-radius: 5px 0 0 5px;
    float: left;*/
  }

  .search-input {
    /*width:200px;
    height:30px;
    float:left;
    border:1px solid #ebeef5;
    margin-left: -1px;
    border-radius: 0 5px 5px 0;
    padding:0 10px;*/

  }

  .search-btn {
    margin-left: 20px;
  }

  .search-result {
    /*padding-top: 10px;*/
    /*border-top: 2px solid #61adf8;*/
    /*margin-bottom: 20px;*/
  }

  .search-result-text {
    font-size: 14px;
    color: #606266;
    width: 230px;
    padding: 5px 0px;
    /*border:1px solid #4a9deb;*/
    /*border-radius: 5px;*/
    float: left;
  }

  .search-result-text span {
    color: #F56C6C;
  }

  .name-wrapper {
    width: 60px;
    height: 60px;
  }

  .name-wrapper img {
    width: 100%;
    height: 100%;
  }

  .hover-img {
    width: 300px;
    height: 300px;
  }

  .hover-img img {
    width: 100%;
    height: 100%;
  }

  .speed-of-progress {
    width: 100%;
    border: 1px solid #666;
    border-radius: 5px;
    padding: 20px 0;
  }

  .goods-box {
    margin-top: 20px;
    width: 100%;
    padding-bottom: 10px;
    border-top: 1px solid #666;
    border-bottom: 1px solid #666;
  }

  .goods-box .goods-item {
    margin-top: 10px;
  }

  .goods-box .goods-item .goods-item-pic {
    width: 80px;
    height: 80px;
    border: 1px solid #666;
    border-radius: 5px;
    float: left;
    margin-right: 10px;
  }

  .goods-box .goods-item .goods-item-text {
    float: left;
  }

  .goods-box .goods-item .goods-item-edit {
    float: right;
  }

  .el-input {
    width: 200px;
  }

  .address {
    margin-top: 10px;
    border-bottom: 1px solid #666;
    padding-bottom: 10px;
  }

  .address .eidtAddress-btn {
    float: right;
  }

  .order-amount {
    padding: 10px 0;
    border-bottom: 1px solid #666;
  }

  .waybill {
    border-bottom: 1px solid #666;
    padding-bottom: 20px;
  }

  .waybill-title span {
    margin-right: 10px;
  }

  .waybill-item {
    padding: 10px;
    border-radius: 5px;
    border-bottom: 1px solid #eee;
  }

  .waybill-item:hover {
    background-color: #eee;
  }

  .waybill-item .waybill-item-top-right {
    float: right;
  }

  .waybill-item .waybill-item-top-right span {
    margin-left: 10px;
  }

  .waybill-item .waybill-item-bottom-right {
    float: right;
  }

  .tab-box {
    margin-top: 10px;
    position: relative;
    border-bottom: 1px solid #666;
    padding-bottom: 20px;
  }

  .tab-box .textarea {
    width: 40%;
  }

  .tab-box .select {
    position: absolute;
    left: 43%;
  }

  .tab-box .add-btn {
    margin-left: 160px;
  }

  .tab-box .email-item {
    padding: 10px 0;
  }

  .tab-box .log-item {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }

  .tab-box .log-item .log-item-name {
    color: #4cae4c;
  }

  .tab-box .log-item .log-item-time {
    float: right;
  }

  .inner-goods {
    padding: 5px 0;
    border-bottom: 1px solid #eee;
  }

  .inner-goods .inner-goods-img {
    display: inline-block;
    width: 80px;
    height: 80px;
    float: left;
    margin-right: 10px;
  }

  .inner-goods .inner-goods-text {
    float: left;
    line-height: 30px;
  }

  .inner-goods .inner-goods-text p {
    width: 500px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .inner-goods .inner-goods-right {
    float: right;
  }

  .inner-goods .inner-goods-right p {
    text-align: center;
    margin-bottom: 5px;
  }

  .inner-input-item {
    padding: 10px 30px;
    border-bottom: 1px solid #eee;
  }

  .inner-input-item .inner-input-item-left {
    float: left;
  }

  .inner-input-item .inner-input-item-left span {
    margin-right: 10px;
    font-weight: bold;
  }

  .inner-input-item .inner-input-item-right {
    float: left;
    margin-left: 200px;
  }

  .inner-input-item .inner-input-item-right span {
    margin-right: 10px;
    font-weight: bold;
  }

  .synchronous {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
</style>
