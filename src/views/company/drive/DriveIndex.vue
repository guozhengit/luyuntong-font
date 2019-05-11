<!--suppress ALL -->
<template>
  <div class="table-page">
    <div class="search">
      <Form
        class="search-form"
        ref="searchDriverForm"
        :model="searchDriverForm"
        :label-width="5"
        inline
      >
        <FormItem prop="code">
          <div class="ivu-form-item select-ground">
            <span class="select-name">司机编号</span>
            <div class="select-input">
              <Input
                v-model="searchDriverForm.code"
                type="text"
                placeholder="请输入司机编号"
                clearable
              />
            </div>
          </div>
        </FormItem>

        <FormItem prop="driveLicence">
          <div class="ivu-form-item select-ground">
            <span class="select-name">驾驶证</span>
            <div class="select-input">
              <Input
                v-model="searchDriverForm.driveLicence"
                type="text"
                placeholder="请输入驾驶证"
                clearable
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="idCard">
          <div class="ivu-form-item select-ground">
            <span class="select-name">身份证</span>
            <div class="select-input">
              <Input
                v-model="searchDriverForm.idCard"
                type="text"
                placeholder="请输入身份证"
                clearable
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="gender">
        <div class="ivu-form-item select-ground">
        <span class="select-name">性别</span>
        <div class="select-input">
        <Select
        v-model="searchDriverForm.gender"
        placeholder="请选择性别"
        clearable
        >
        <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.label }}
        </Option>
        </Select>
        </div>
        </div>
        </FormItem>
        <FormItem style="float: right">
          <ButtonGroup>
            <Button type="primary" icon="md-search" ghost @click="handleQuery"
              >查询
            </Button>
          </ButtonGroup>
        </FormItem>
      </Form>
    </div>
    <div class="operation">
      <ButtonGroup>
        <Button
          type="primary"
          icon="md-add"
          ghost
          class="button"
          @click="showCreateDrawer"
          >新增
        </Button>
        <Button
          type="info"
          icon="md-create"
          ghost
          class="button"
          :disabled="selectDriver.length !== 1"
          @click="showModifyDrawer"
          >修改
        </Button>
        <Button
          type="error"
          icon="ios-trash"
          ghost
          class="button"
          :disabled="!selectDriver.length > 0"
          @click="handleDeleteDriver"
          >删除
        </Button>
        <Button type="primary" icon="ios-refresh" ghost @click="handleQuery"
          >刷新
        </Button>
      </ButtonGroup>
    </div>
    <div class="data-table">
      <Table
        border
        :columns="driverColumns"
        :data="darverList"
        @on-selection-change="handleSelect"
      >
      </Table>
    </div>
    <!--<br>-->

    <div class="pagination">
      <Page
        :total="totalCount"
        :current="pageIndex"
        :page-size="pageSize"
        show-total
        show-sizer
        show-elevator
        @on-change="handlePageChange"
        @on-page-size-change="handlePageSizeChange"
      >
      </Page>
    </div>

    <Drawer
      title="添加司机信息"
      v-model="showCreate"
      width="50%"
      :mask-closable="false"
    >
      <Form
        ref="createDriverForm"
        :model="DriverFormData"
        :rules="formRules"
        :label-width="140"
      >
        <Row>
          <i-Col span="12">
            <FormItem label="司机姓名" prop="name">
              <Input v-model="DriverFormData.name"
                     placeholder="请输入司机名"
                     clearable
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="司机编号" prop="code">
              <Input
                v-model="DriverFormData.code"
                placeholder="请输入司机编号"
                clearable
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="身份证" prop="idCard">
              <Input
                v-model="DriverFormData.idCard"
                placeholder="请输入身份证"
                clearable
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="籍贯" prop="nativePlace">
              <Input
                v-model="DriverFormData.nativePlace"
                placeholder="请输入籍贯信息"
                clearable
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="站点编号" prop="stationCode">
              <Input
                placeholder="请选择站点编号"
                v-model="DriverFormData.stationCode"
                clearable
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="驾驶证" prop="driveLicence">
              <Input v-model="DriverFormData.driveLicence" placeholder="请输入驾驶证"
                     clearable/>
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="运营证" prop="runLicence">
              <Input v-model="DriverFormData.runLicence" placeholder="请输入运营证" clearable/>
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="车牌号" prop="vehicleCode">
              <Input v-model="DriverFormData.vehicleCode" placeholder="请输入车牌号" clearable/>
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="电话" prop="phone">
              <Input v-model="DriverFormData.phone" placeholder="请输入电话" clearable/>
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="地址" prop="address">
              <Input
                v-model="DriverFormData.address"
                placeholder="请输入详细地址"
                clearable
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="性别" prop="gender">
              <RadioGroup v-model="DriverFormData.gender" clearable>
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
              </RadioGroup>
            </FormItem>
          </i-Col>
        </Row>
      </Form>
      <div class="create-drawer-footer">
        <Button style="margin-right: 8px" @click="handleCancelCreateDriver"
          >取消
        </Button>
        <Button
          type="primary"
          @click="handleCreateDriver"
          :loading="createLoading"
          >保存
        </Button>
      </div>
    </Drawer>
    <Drawer
            title="修改司机信息"
            v-model="showModify"
            width="50%"
            :mask-closable="false"
    >
      <Form
              ref="modifyDriverForm"
              :model="emplyeeFormData"
              :rules="formRules"
              :label-width="140"
      >
    <Row>
      <i-Col span="12">
        <FormItem label="司机姓名" prop="name">
          <Input v-model="DriverFormData.name"
                 placeholder="请输入司机名"
                 clearable
          />
        </FormItem>
      </i-Col>
      <i-Col span="12">
        <FormItem label="司机编号" prop="code">
          <Input
                  v-model="DriverFormData.code"
                  placeholder="请输入司机编号"
                  clearable
          />
        </FormItem>
      </i-Col>
      <i-Col span="12">
        <FormItem label="身份证" prop="idCard">
          <Input
                  v-model="DriverFormData.idCard"
                  placeholder="请输入身份证"
                  clearable
          />
        </FormItem>
      </i-Col>
      <i-Col span="12">
        <FormItem label="籍贯" prop="nativePlace">
          <Input
                  v-model="DriverFormData.nativePlace"
                  placeholder="请输入籍贯信息"
                  clearable
          />
        </FormItem>
      </i-Col>
      <i-Col span="12">
        <FormItem label="站点编号" prop="stationCode">
          <Input
                  placeholder="请选择站点编号"
                  v-model="DriverFormData.stationCode"
                  clearable
          />
        </FormItem>
      </i-Col>
      <i-Col span="12">
        <FormItem label="驾驶证" prop="driveLicence">
          <Input v-model="DriverFormData.driveLicence" placeholder="请输入驾驶证"
                 clearable/>
        </FormItem>
      </i-Col>
      <i-Col span="12">
        <FormItem label="运营证" prop="runLicence">
          <Input v-model="DriverFormData.runLicence" placeholder="请输入运营证" clearable/>
        </FormItem>
      </i-Col>
      <i-Col span="12">
        <FormItem label="车牌号" prop="vehicleCode">
          <Input v-model="DriverFormData.vehicleCode" placeholder="请输入车牌号" clearable/>
        </FormItem>
      </i-Col>
      <i-Col span="12">
        <FormItem label="电话" prop="phone">
          <Input v-model="DriverFormData.phone" placeholder="请输入电话" clearable/>
        </FormItem>
      </i-Col>
      <i-Col span="12">
        <FormItem label="地址" prop="address">
          <Input
                  v-model="DriverFormData.address"
                  placeholder="请输入详细地址"
                  clearable
          />
        </FormItem>
      </i-Col>
      <i-Col span="12">
        <FormItem label="性别" prop="gender">
          <RadioGroup v-model="DriverFormData.gender" clearable>
            <Radio label="男">男</Radio>
            <Radio label="女">女</Radio>
          </RadioGroup>
        </FormItem>
      </i-Col>
    </Row>
        <div class="create-drawer-footer">
          <Button style="margin-right: 8px" @click="handleCancelModifyDriver"
          >取消
          </Button>
          <Button
                  type="primary"
                  @click="handleModifyDriver"
                  :loading="modifyLoading"
          >保存
          </Button>
        </div>
      </Form>
    </Drawer>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
    data: function () {
        return {
            genderList: [
                {
                    value: "男",
                    label: "男"
                },
                {
                    value: "女",
                    label: "女"
                }
            ],
            driverColumns: [
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    title: "序号",
                    type: "index",
                    width: 80,
                    align: "center"
                },
                {
                    title: "司机姓名",
                    key: "name",
                    align: "center"
                },
                {
                    title: "司机编号",
                    key: "code" ,
                    align: "center"
                },
                {
                    title: "身份证",
                    key: "idCard",
                    align: "center",
                    sortable: true
                },
                {
                    title: "籍贯",
                    key: "nativePlace",
                    align: "center",
                    sortable: true
                },
                {
                    title: "站点编号",
                    key: "stationCode",
                    align: "center",
                    sortable: true
                },
                {
                    title: "地址",
                    key: "address",
                    align: "center",
                    sortable: true
                },
                {
                    title: "驾驶证",
                    key: "driveLicence",
                    align: "center",
                    sortable: true
                },
                {
                    title: "车辆运营证",
                    key: "runLicence",
                    align: "center"
                },
                {
                    title: "性别",
                    key: "gender",
                    align: "center",
                    sortable: true
                },
                {
                    title: "电话",
                    key: "phone",
                    align: "center",
                    sortable: true
                },
            ],
            searchDriverForm: {
                code: "",
                driveLicence: "",
                idCard: "",
                gender: ""
            },
            darverList: [],
            totalCount: 0,
            selectDriver: [],
            pageIndex: 1,
            pageSize: 10,

            DriverFormData: {
                code: "",
                name: "",
                idCard: "412823XXXXXXXX1218",
                nativePlace: "",
                stationCode: "",
                phone: "",
                gender: "",
                birthday: "",
                address: "",
                driveLicence: "",
                runLicence: "",
                vehicleCode: ""
            },
            formRules: {
                code: [
                    {required: true, message: "司机编号不能为空", trigger: "blur,change"}
                ],
                idCard: [
                    {required: true, message: "身份证不能为空", trigger: "blur,change"}
                ],
                nativePlace: [
                    {required: true, message: "籍贯不能为空", trigger: "blur,change"}
                ],
                stationCode: [
                    {required: true, message: "站点编号不能为空", trigger: "blur,change"}
                ],
                phone: [
                    {required: true, message: "电话不能为空", trigger: "blur,change"}
                ],
                gender: [
                    {required: true, message: "性别不能为空", trigger: "blur,change"}
                ],
                birthday: [
                    {required: true, message: "生日不能为空", trigger: "blur,change"}
                ],
                address: [
                    {required: true, message: "地址不能为空", trigger: "blur,change"}
                ],
                vehicleCode: [
                    {required: true, message: "车牌号不能为空", trigger: "blur,change"}
                ],
            },
            showCreate: false,
            createLoading: false,

            showModify: false,
            modifyLoading: false,

            showDelete: false,
            deleteLoading: false
        };
    },
  methods: {
    handleQuery() {
      this.$axios
        .post(
          `/driver/pageQuery?page=${this.pageIndex - 1}&size=${this.pageSize}`,
          this.searchDriverForm
        )
        .then(res => {
          let result = res.data;
          this.darverList = result.data.content;
          this.totalCount = result.data.totalElements;
        })
        .catch(() => {
          this.darverList = [];
          this.totalCount = 0;
        });
    },
    handlePageChange(driverIndex) {
      this.pageIndex = driverIndex;
      this.handleQuery();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.handleQuery();
    },
    handleSelect(selection, row) {
      this.selectDriver = selection;
      console.log(selection, row);
    },
    showCreateDrawer() {
      this.showCreate = true;
    },
    handleCancelCreateDriver() {
      this.showCreate = false;
      this.$refs["createDriverForm"].resetFields();
    },

    handleDeleteDriver() {
      let ids = this.selectDriver.map(item => {
        return item.id;
      });
      console.log(ids);
      this.$axios
        .post("/driver/deleteBatch", ids)
        .then(() => {
          this.showDelete = false;
          this.deleteLoading = false;
          this.$Message.success("删除成功");
          /*删除成功，回调查询接口*/
          this.handleQuery();
        })
        .catch(() => {
          this.deleteLoading = false;
          this.$Message.error("删除失败");
        });
    },
    handleCreateDriver() {
      this.$refs["createDriverForm"].validate(valid => {
        if (valid) {
          this.createLoading = true;
          this.$axios
            .post("/driver", this.DriverFormData)
            .then(() => {
              this.createLoading = false;
              this.showCreate = false;
              this.$Message.success("保存司机成功");
              this.$refs["createDriverForm"].resetFields();
              this.handleQuery();
            })
            .catch(() => {
              this.createLoading = false;
              this.$Message.error("保存司机失败");
            });
        }
      });
    },
    showModifyDrawer() {
      this.DriverFormData = {
          code:this.selectDriver[0].code,
          name: this.selectDriver[0].name,
          idCard: this.selectDriver[0].idCard,
          nativePlace: this.selectDriver[0].nativePlace,
          stationCode: this.selectDriver[0].stationCode,
          phone: this.selectDriver[0].phone,
          driveLicence: this.selectDriver[0].driveLicence,
          runLicence: this.selectDriver[0].runLicence,
          vehicleCode: this.selectDriver[0].vehicleCode,
          password: this.selectDriver[0].password,
          gender: this.selectDriver[0].gender,
          birthDay: this.selectDriver[0].birthDay
      };
      this.showModify = true;
    },
    handleCancelModifyDriver() {
      this.showModify = false;
      this.$refs["modifyDriverForm"].resetFields();
    },
    handleModifyDriver() {
      this.$refs["modifyDriverForm"].validate(valid => {
        if (valid) {
          this.modifyLoading = true;
          this.$axios
            .put(`/driver/${this.selectDriver[0].id}`, this.DriverFormData)
            .then(() => {
              this.modifyLoading = false;
              this.showModify = false;
              this.$Message.success("保存司机成功");
              this.$refs["modifyDriverForm"].resetFields();
              this.handleQuery();
            })
            .catch(() => {
              this.createLoading = false;
              this.$Message.success("保存司机失败");
            });
        }
      });
    }
  },
  mounted() {
    this.handleQuery();
  }
};
</script>

<style lang="less" scoped>
.operation {
  .button {
    margin-right: 5px;
  }
}
</style>
<style lang="less">
.ivu-table-tip {
}
</style>

<style lang="less">
.create-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
