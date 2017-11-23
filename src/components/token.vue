<template>
  <div class="center" v-if="$store.state.wallerModel==''">
    <div class="title token">
      Send Ether & Tokens
    </div>
    <div class="token_warp">
      <div style="height: 30px;"></div>
      <div class="token_warp_center">
        <div class="token_warp_center_left">
          <div class="token_title">
            How would you like to access your wallet
          </div>
          <div style="height: 100px;border: 1px solid #e1e1e1;text-indent: 14px;font-size: 16px;width: 86%">
            <div style="height: 50px;border-bottom: 1px solid #e1e1e1;width: 100%;line-height: 50px">
              <el-radio v-model="radio" :label="1">Key store / JSON File</el-radio>
            </div>
            <div style="height: 50px;width: 100%;line-height: 50px">
              <el-radio v-model="radio" :label="2">Private Key</el-radio>
            </div>
          </div>
        </div>
        <div class="token_warp_center_left">
          <div v-show="radio=='2'" class="token_title">
            Paste/Type your private key
          </div>
          <div v-show="radio=='1'" class="token_title">
            Select Your Wallet File
          </div>
          <div>
            <div class="token_file" v-show="radio=='1'">
              <div class="token_file_btn" @click="fileClick">
                <img v-show="file" src="../../static/img/que.png"/> Select Wallet File
              </div>
              <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
              <div class="token_file_title">Please enter your password</div>
              <input v-model="password" type="password" class="token_file_input"/>
            </div>
            <textarea v-model="privateKey" v-show="radio=='2'" class="token_key"/>
            <div style="float: right">
              <img src="../../static/img/unlock.png" @click="save" style="cursor: pointer"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

  export default {
    name: 'token',
    data() {
      return {
        radio: 1,
        privateKey: '',
        file: '',
        password: '',

      }
    },
    methods: {
      fileClick() {
        document.getElementById('upload_file').click()
      },
      fileChange(el) {
        if (!el.target.files[0].size) return;
        var reader = new FileReader();
        let _this = this;
        reader.onload = function () {
          _this.file = this.result
        }
        reader.readAsText(el.target.files[0]);
        el.target.value = ''
      },
      save() {

        if (this.radio == '1') {
            setTimeout(() => {
              this.$modal({process: true})
              this.fileKey();
            },100)
        } else {
          this.$modal({process: true})
          this.walletFromPrivateKey();
        }
      },
      fileKey() {
        try {
          let KeyFile = this.wallet.getWalletFromPrivKeyFile(this.file, this.password);
          this.privateKey = KeyFile.getPrivateKey().toString("hex");
          this.walletFromPrivateKey()
        }catch (e){
          this.$modal({error:{text:e.toString()}})
        }
      },
      walletFromPrivateKey() {
        try {
          this.$modal({process: false})
          this.$store.state.wallerModel = this.wallet.fromPrivateKey(this.privateKey);
        }catch (e){
          this.$modal({error:{text:e.toString()}})
        }
      }
    }
  }
</script>


<style scoped>
  .token_key {
    float: left;
    width: 350px;
    height: 100px;
    border: 1px solid #00aeef;
    resize: none;
    line-height: 20px;
    text-indent: 10px;
  }

  .token_file_input {
    border: 1px solid #00aeef;
    height: 38px;
    width: 100%;
    text-indent: 10px;
  }

  .token_file_title {
    font-size: 12px;
    color: #7a7a7c;
    padding: 4px 6px
  }

  .token_file_btn img {
    position: absolute;
    top: 10px;
    left: 88px;
  }

  .token_file_btn {
    height: 40px;
    width: 340px;
    position: relative;
    background-color: #00aeef;
    color: #fff;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }

  .token_file {
    float: left
  }

  .token_title {
    font-size: 18px;
    color: #212733;
    margin-bottom: 14px;
    text-indent: 10px;
  }

  .token_warp_center_left {
    float: left;
    width: 50%;
  }

  .token_warp_center {
    width: 954px;
    margin: 0 auto;
    height: 40px;
  }

  .center {
    width: 1310px;
    margin-top: 20px;
  }

  .token {
    line-height: 70px;
    text-indent: 30px;
    height: 70px;
    background-color: #212733;
  }

  .title {

    font-size: 24px;
    color: #fff;
    padding-left: 6px;
  }

  .token_warp {
    height: 220px;
    width: 100%;
    background-color: #fff;
    margin-bottom: 60px;
  }
</style>
