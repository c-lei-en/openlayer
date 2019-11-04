<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item>
      <el-input v-model="ruleForm.user" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="ruleForm.checkPass" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="input"
        style="width:70%"
        placeholder="请输入验证码"
        @keydown.enter.native="submitForm('ruleForm')"
      ></el-input>
      <el-button style="width:30%" @click="handleCode">{{vcode}}</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width:100%" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {GetUser} from "@/api/request";
export default {
  data() {
    var checkVcode = (rule, value, callback) => {
      value = value + "";
      if (value.length >= 4) {
        value = value.substring(0, 4);
        this.vcode = value;
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.user !== "") {
          this.$refs.ruleForm.validateField("checkUser");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: "",
        checkPass: ""
      },
      input: "",
      vcode: [{ validator: checkVcode, trigger: "blur" }],
      rules: {
        user: [{ validator: validateUser, trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.generatedCode();
  },
  methods: {
    submitForm(formName) {
      let codestatus = this.checkCode();
      if (codestatus) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            GetUser(this.ruleForm.user, this.ruleForm.checkPass).then(value => {
              if (value.data.result == true) {
                sessionStorage.setItem(
                  "user",
                  JSON.stringify(this.ruleForm.user)
                );
                sessionStorage.setItem(
                  "password",
                  JSON.stringify(this.ruleForm.checkPass)
                );
                this.$router.push({ path: "/map" });
              } else {
                console.log("用户名或密码错误");
              }
            });
          }
        });
      }
    },
    generatedCode() {
      const random = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
      let code = "";
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 36);
        code += random[index];
      }
      this.vcode = code;
    },
    checkCode() {
      let vcode = this.input;
      vcode = vcode.toUpperCase();
      let ccode = this.vcode;
      ccode = ccode.toUpperCase();
      if (vcode !== ccode) {
        this.$message.error("Please enter the correct verification code!");
      } else {
        return true;
      }
    },
    handleCode() {
      this.generatedCode();
    }
  }
};
</script>
<style lang="less">
body {
  background-image: url("../assets/timg.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
}
.demo-ruleForm {
  text-align: center;
  position: absolute;
  margin: 0;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>