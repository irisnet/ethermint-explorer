<template>
  <div class="head">
    <div class="center fff">
      <div class="title">{{$t('message.head.title') }}</div>
      <div class="head_list">
        <router-link  v-for="(item,index) in $t('message.head.list')" :key="index" :class="{'select':item.is}" :to="item.href">{{item.txt}} </router-link>
      </div>
      <div class="img">
        <a :href="$t('message.head.img.href')">
          <img :src="$t('message.head.img.src')"/>
        </a>
      </div>
      <form action="/search" class="text" method="POST">
        <button class="btnBlue" type="submit">{{$t('message.head.submit') }}</button>
        <input name="search" :placeholder="$t('message.head.text')" type="text"/>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "head",
    props: ['num'],
    data() {
      return {
        listNum: this.num
      }
    },
    created: function () {
      this.$t('message.head.list').forEach((item)=>{
        item.is=false;
      })
      this.$t('message.head.list')[this.listNum].is=true;

    }
  };
</script>

<style scoped>
  .head {
    height: 80px;
    background-color: #212733;
    width: 100%;
    min-width: 1246px;
    line-height: 80px;
    box-shadow: 0 0px 5px #000;
    position: fixed;
    top: 0;
    z-index: 2;
  }
  .head .title {
    font-family: "Helvetica Neue";
    font-size: 48px;
    color: #fff;
    float: left;
  }

  .head .head_list {
    margin-left: 90px;
    font-size: 24px;
    float: left;
  }

  .head .head_list a {
    height: 76px;
    font-family: sans-serif;
    padding: 0 10px;
    margin-right: 46px;
    color: #596275;
    cursor: pointer;
    float: left
  }

  .head .head_list div:hover {
    border-bottom: 4px solid #fff;
    color: #fff;
  }

  .head .head_list .select {
    border-bottom: 4px solid #fff;
    color: #fff;
  }

  .head .img {
    float: right;
    line-height: 104px;
    width: 65px;
    text-align: center;
  }

  .head .btnBlue {
    margin-top: 20px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    background-color: #0088ce;
    padding: 2px 18px;
    cursor: pointer;
    font-size: 16px;
    border: none;
    width: auto;
    height: auto;
  }

  .head .text {
    width: 306px;
    font-size: 18px;
    color: #896275;
    float: right;
    margin-right: 12px;
  }

  .head .text input {
    margin-top: 32px;
    height: 29px;
    text-indent: 8px;
    color: #fff;
    background-color: #212733;
    border-radius: 0;
    border: 0;
    border-bottom: 1px solid #fff;
  }

</style>

