<template>
  <div class="settlein">
    <div class="phone" v-if='isshow'>
      <div class="bg-img">
        <h5><img @click="close" src="../../assets/img/close.png">注册</h5>
        <img src="../../assets/img/logo@2x.png">
      </div>
      <div class="login_content1 ">
        <label>
          <input type="text" placeholder="请输入手机号" class="register_content_input phone" v-model= "phoneNumber" @blur="checkLPhone" maxlength="11" @input="img1"><img @click="emipy" class="img img1" src="~@/assets/img/emipy.png">
        </label>
        <label class="clearfix">
          <input type="text" placeholder="请输入验证码" class="yanzhengma_input" @blur="checkLpicma" v-model="picLyanzhengma" @input="changBGC " maxlength="4" >
          <img @click="emipy1" class="img img2" src="~@/assets/img/emipy.png" style="right: 40%;top: 0.8rem;">
          <input type="button" id="code" @click="createCode"  class="verification1" v-model="checkCode"/> <br>
        </label>
        <a class="user_login next" @click="next1">下一步</a>
        <a href="javascript:" style="color: #FFA303;display: inline-block;width: 100%;text-align: center;font-size: 0.8rem;margin-top: 0.8rem;" @click="login">已有账号,去登录</a>
      </div>
    </div>


    <div class="list" v-if="isshow1">
        <div class="regBgImg">
            <div><img @click="closeREG" src="../../assets/img/leftBlack.png"></div>
            <h5>注册</h5>
        </div>
        <p>验证码已发送至手机号：<span class="span">{{tel}}</span></p>

        <label class="clearfix" style="margin-top: 30px;">
        <p style="border-bottom: 1px solid #eee">
          <input type="text" placeholder="请输入验证码" class="yanzhengma_input" v-model="verifyCode" maxlength="6" @input="img3">
          <img src="../../assets/img/loginClear.png" class="LoginImg img3" @click="emipy2" style="right: 40%">
          <input type="button" :value="btnText"
          :disabled="disabled"  @click="sendCode" class="verification"/></p>
        </label>
        <label>
          <input :type="type" placeholder="设置登录密码" class="register_content_input res" v-model="LUserPsd" @blur="checkLPsd" @input="changres" maxlength="22" ><img src="../../assets/img/loginClear.png" class="LoginImg img4" @click="emipy3" style="right: 14%;top: 1.7rem;" >
          <img :src="imgSrc" class="LoginImg" @click="eyesTab" style="top: 1.8rem;">
        </label>
        <label>
            <input type="text" placeholder="请输入邀请码(选填)" v-model="invitationCode " class="register_content_input inv" @input="img5">
            <img src="../../assets/img/loginClear.png" class="LoginImg img5" @click="emipy5" style="right:1.5rem;top: 1.7rem;" >
            <br>
        </label>
        <label class="Agreement"  v-for="(item,index) of items" :key="index">
          <span class="img img2"></span><input @click="check" class="check" type="checkbox" checked="true" />&ensp;我已阅读并同意<b class="c-2395FF" @click="toast1">《启航金服平台注册服务协议》</b>
          <span v-if='!isshow2'>请同意注册协议</span>
        </label>
        <a class="user_login res" @click="checkSmsCode">提交注册</a>
    </div>

    <!-- 底部版权 -->
    <div style="position: fixed;bottom: 1rem; text-align: center;font-size: 0.8rem;color: #999;width: 100%;left: 0;">
      <p>©2018 途粒 (上海) 金融信息服务有限公司 版权所有</p>
      <p>@启航金服  理财有风险，投资需谨慎</p>
    </div>
    <!-- 弹框 -->
    <div class="bg"></div>
    <div class="toast">
      <img class="right" src="~@/assets/img/close1.png" @click="close"/>
      <img src="~@/assets/img/active.png">
      <button class="button" @click = "kaiHu">开户使用新手礼包</button>
    </div>
    <div class="toast1">
        <h5>启航金服注册协议<span @click="close1">&Chi;</span></h5>
        <div class="div">
          <h6 style="color: #666">欢迎阅读启航金服注册服务协议(下称“本协议”或“服务协议”)。本协议双方为途粒（上海）金融信息服务有限公司（以下简称“途粒金融”或“本公司”、“我公司”）与启航金服用户（包括个人和企业客户，简称“用户”或“您”），本协议具有合同效力。本协议内容包括协议正文及所有已经发布的或将来可能发布的各类规则。所有规则为协议不可分割的一部分，与协议正文具有同等法律效力</h6>
          <h6>1. 接受条款</h6>
          <p>&emsp;&emsp;以任何方式进入启航金服网站即表示您同意自己已经与启航金服订立本协议，且您将受本协议条款的约束。启航金服有权随时自行更改本协议条款。如条款有任何变更，启航金服将在其网站上刊载公告，通知予您。如您不同意相关变更，必须停止使用服务。经修订的条款一经在启航金服网站公布后，立即自动生效。您应在本协议变更的第一次登录后仔细阅读修订后的条款，并有权选择停止或继续使用服务；一旦您继续使用服务，则表示您已接受经修订的条款，当您与启航金服发生争议时，应以最新的服务协议为准。除另行明确声明外，任何使服务范围扩大或功能增强的的新内容均受本协议约束。</p>
          <h6>2. 接受条款</h6>
          <p>&emsp;&emsp;2.1 用户及用户注册： 用户必须是具备完全民事行为能力的自然人，或者是依法成立、具有合法经营资格并有效存续的实体组织。无民事行为能力人、限制民事行为能力人以及无经营或特定经营资格的组织不应当注册为启航金服用户；超过其民事权利或行为能力范围从事信息发布、交易的，其与启航金服之间的服务协议自始无效，启航金服一经发现，有权立即注销该用户，并追究其使用启航金服服务的一切法律责任。用户注册是指用户登陆启航金服，并按要求填写相关信息并确认同意履行相关用户协议的过程。用户因进行信息发布、交易、获取有偿服务或接触启航金服服务器而发生的所有应纳税赋，以及一切硬件、软件、服务及其它方面的费用均由用户负责支付。</p>
          <p>&emsp;&emsp;2.2 会员： 在启航金服平台上注册的用户成为启航金服会员。启航金服系为有借款需求客户（企业、个人）和资金提供方（出借人）的信息对接平台以及获取各类与借款相关的服务信息的信息撮合平台。启航金服会对注册用户的身份信息真实性进行审核但不能完全控制双方交易所涉及的服务的质量、安全或合法性，信息的真实性或准确性，以及交易方履行其在借款协议项下的各项义务的能力。启航金服仅作为双方信息提供、交易撮合的居间服务方，并不作为接受服务方或是提供服务方的身份参与交易行为的本身。启航金服提醒用户应该通过自己的谨慎判断确定服务及相关信息的真实性、合法性和有效性，并承担交易过程中的风险。</p>
          <h6>3. 收费</h6>
          <p>&emsp;&emsp;本公司保留在根据第1条通知您后，收取服务费用的权利。</p>
          <p>&emsp;&emsp;本公司保留在无须发出书面通知，仅在启航金服网站公示的情况下，暂时或永久地更改或停止部分或全部服务的权利。</p>
          <h6>4. 注册义务</h6>
          <p>&emsp;&emsp;注册义务。您必须按照申请注册会员的表格，真实、准确、完整的填写您的资料；维持并及时更新资料，使其保持真实、准确、完整和反映当前情况。倘若您提供的资料不真实、准确和完整或我公司有合理理由怀疑该资料不真实、准确、完整的，我公司有权暂停或终止您的注册用户身份，并拒绝您在目前和将来对服务以任何形式使用。</p>
          <p>&emsp;&emsp;注册名、密码和保密在登记过程中，将由您选择。注册名的选择应遵守法律法规及社会公德。您必须对您的密码保密，您将对您注册名和密码下发生的所有活动承担责任。如发现任何人未经您同意使用您的注册名跟密码，您须立即通知我公司；对该行为造成的损害，我公司不负任何责任。</p>
          <h6>5. 您的权利和义务</h6>
          <p>&emsp;&emsp;5.1 您有权利拥有在启航金服注册的会员名及登录密码，并有权利使用自己的会员名及密码随时登陆启航金服平台。您不得以任何形式擅自转让或授权他人使用自己的启航金服会员名及密码；</p>
          <p>&emsp;&emsp;5.2 您有权根据本服务协议的规定以及启航金服上发布的相关规则，利用启航金服信息发布平台查询服务信息、提交借款项目信息、参加启航金服的有关活动以及有权享受启航金服提供的其它的有关服务；</p>
          <p>&emsp;&emsp;5.3 您在启航金服进行交易的过程中，如与其他融资机构因交易产生纠纷，可以请求启航金服予以协调。如您发现其他机构有违法或违反本服务协议的行为，可以向启航金服进行反馈和要求处理。如您因网上交易与其他用户发生诉讼的，您有权通过司法部门要求启航金服提供相关资料；</p>
          <p>&emsp;&emsp;5.4 您同意授权启航金服或者启航金服指定的第三方代为签署借款项目中涉及的抵押合同、质押合同等相关担保合同及债权转让协议，该等授权的有效期限为您作为启航金服会员期间；</p>
          <p>&emsp;&emsp;5.5 您同意遵守启航金服的交易规则，接收来自启航金服或启航金服合作伙伴发出的邮件或信息；</p>
          <p>&emsp;&emsp;5.6 您应当保证在使用启航金服平台进行信息发布过程中遵守诚实信用的原则，发布的信息中不得包含有反动、暴力、淫秽、毒品、赌博、教唆及有损社会公共道德的内容；不得发布各类违法或违规信息；；</p>
          <p>&emsp;&emsp;5.7 您不应在启航金服平台上恶意评价其他用户，或采取不正当手段提高自身的信用度或降低其他用户的信用度；</p>
          <p>&emsp;&emsp;5.8 您在启航金服平台上不得发布国家禁止或限制发布的包含有侵犯他人知识产权或其它合法权益的机密类、隐私类信息，也不得发布违背社会公共利益或公共道德的、或是启航金服认为不适合在启航金服上发布的信息；</p>
          <p>&emsp;&emsp;5.9 您承诺在使用启航金服时实施的所有行为均遵守国家法律、法规和启航金服的相关规定以及各种社会公共利益或公共道德。如有违反上述承诺导致任何法律后果的发生，您独立承担所有相应的法律责任；</p>
          <p>&emsp;&emsp;5.10 您同意，不对启航金服上任何数据作商业性利用，包括但不限于在未经启航金服事先书面批准的情况下，以复制、传播等方式使用在启航金服网站上展示的任何资料。</p>
          <h6>6. 启航金服的权利义务</h6>
          <p>&emsp;&emsp;6.1 启航金服有权通过自身或委托其认可的第三方机构为您提供除信息发布外的融资比较、“融资体检”和实现一站式融资实现等增值服务；</p>
          <p>&emsp;&emsp;6.2 启航金服有义务在现有技术上维护整个网上平台的正常运行，并努力提升和改进技术。对于您在注册使用启航金服平台中所遇到的与信息发布或注册有关的问题及反映的情况，启航金服应及时作出回复；</p>
          <p>&emsp;&emsp;6.3 对于您在启航金服平台上的不当行为或其它任何启航金服认为应当终止服务的情况，启航金服有权随时作出删除相关信息、终止服务提供等处理，而无须征得您的同意；</p>
          <p>&emsp;&emsp;6.4 因网上平台的特殊性，启航金服没有义务对所有会员的注册资料、行为及其他事项进行事先审查；</p>
          <p>&emsp;&emsp;6.5 您在启航金服进行交易过程中如与其它投资者产生纠纷，请求启航金服予以协调，经启航金服审核后，启航金服有权通过电子邮件联系纠纷双方了解情况，并将所了解的情况通过电子邮件互相通知对方；</p>
          <p>&emsp;&emsp;6.6 您因在启航金服平台上进行借款或出借款项而与协议相对方发生诉讼的，您通过司法部门或行政部门依照法定程序要求启航金服提供相关数据，启航金服应积极配合并提供有关资料；</p>
          <p>&emsp;&emsp;6.7 启航金服有权对您的注册数据及信息发布行为进行查阅，发现注册数据或信息发布行为中存在任何问题或怀疑，均有权向您发出询问及要求改正的通知或者直接作出删除等处理；</p>
          <p>&emsp;&emsp;6.8 经国家生效法律文书或行政处罚决定确认您存在违法行为，或者启航金服有足够事实依据可以认定您存在违法或违反服务协议行为的，启航金服有权在启航金服平台及所在网站上以网络发布形式公布您的违法行为；</p>
          <p>&emsp;&emsp;6.9 在您使用启航金服服务时，启航金服有权接收并记录您的个人信息，包括但不限于IP地址、网站Cookie中的资料及您要求取用的网页记录等；</p>
          <p>&emsp;&emsp;6.10 启航金服有权根据您的授权自行或委托第三方代您签署抵押协议、质押协议等相关担保协议和债权转让协议。。</p>
          <h6>7. 许可使用权</h6>
          <p>&emsp;&emsp;许可使用权。您授予本公司永久的、免费的、完整的许可使用权利（并且有权对该权利进行再授权），使我公司有权使用、复制、修改、发布、翻译、分发您的资料或制作其派生作品，以已知或日后开发的任何形式、媒体或技术，将您的资料纳入其他作品里。</p>
          <h6>8. 隐私权</h6>
          <p>&emsp;&emsp;隐私权。我公司不公开您选择保密的注册信息及其他个人信息。但在下列情况下，我公司有权全部或部分披露您的保密信息。</p>
          <p>&emsp;&emsp;8.1 根据法律规定，或应行政机关、司法机关要求，向第三人或行政机关、司法机关披露；</p>
          <p>&emsp;&emsp;8.2 如您系权利人并针对他人在启航金服上侵犯您利益的行为提起投诉，应被投诉人要求，向被投诉人披露；</p>
          <p>&emsp;&emsp;8.3权利人认为您在启航金服上的行为侵犯其合法权利并提出投诉的，可向权利人披露；</p>
          <p>&emsp;&emsp;8.4 您出现违反启航金服网站规则，需要向第三方披露的；</p>
          <p>&emsp;&emsp;8.5 根据法律和启航金服网站规则，其他我公司认为适合披露的；</p>
          <h6>9. 其他</h6>
          <p>&emsp;&emsp;9.1 免责声明。您将对您发布的信息及其他在启航金服上发生的任何行为承担责任，我公司对此不负任何责任；</p>
          <p>&emsp;&emsp;9.2 不可抗力。对于因启航金服合理控制范围以外的原因，包括但不限于自然灾害、罢工或骚乱、物质短缺或定量配给、暴动、战争行为、政府行为、通讯或其他设施故障或严重伤亡事故等，致使启航金服延迟或未能履约的，启航金服不对您承担任何责任；</p>
          <p>&emsp;&emsp;9.3 转让。启航金服转让本协议无需经您同意；</p>
          <p>&emsp;&emsp;9.4 因本协议或本公司服务所引起的相关争议，应向启航金服经营所在地仲裁委员会,按照申请仲裁时该会现行有效的网络仲裁规则进行网络仲裁。</p>
          <button class="button" @click="close1">我知道了</button>
      </div>
    </div>


<!-- 开户 -->
    <div class="box" style="display:none;">
        <form  name="regSubmit" method="post" :action="ChinaPnrServer">
             <input type='text' name='Version'  :value='Version'>
             <input type='text' name='CmdId'  :value='CmdId'>
             <input type='text' name='MerCustId' :value='MerCustId'>
             <input type='text' name='RetUrl'  :value='RetUrl'>
             <input type='text' name='BgRetUrl' :value='BgRetUrl'>
             <input type='text' name='UsrId'  :value='UsrId'>
             <input type='text' name='UsrMp' :value='UsrMp'>
             <input type='text' name='PageType'  :value='PageType'>
             <input type='text' name='ChkValue'  :value='ChkValue'>
             <input type='text' name='MerPriv' :value='MerPriv'>
        </form>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Toast, base64 } from 'vux'
import axios from 'axios'
import * as myPub from '../../assets/js/public.js'
import $ from 'jquery'
var code ; //在全局定义验证码
let Base64 = require('js-base64').Base64;
export default {
    data () {
      return {
        btnText: '发送验证码',
        disabled: false,
        time: 0,
        verifyCode: '',
        userPhone:'',
        dialog: false,
        phoneNumber:'',
        LUserPsd:'',
        picLyanzhengma:'',
        checkCode:'',
        invitationCode:'',
        isshow:true,
        isshow1:false,
        imgSrc:"./static/img/closeEyes.png",
        type:"password",
        tel:'',
        items: [
          {state: true}
        ],
        isshow2:'true',

        // 三方开户数据
        ChinaPnrServer : "",
        Version : "",
        CmdId : "",
        MerCustId : "",
        RetUrl : "",
        BgRetUrl :"",
        MerPriv : "",
        UsrId : "",
        UsrMp : "",
        PageType : "",
        ChkValue : "",
      }
    },
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      base64,
      Toast
    },
    created(){
      this.createCode();
      this.phoneNumber = this.$route.query.phone
  },
    methods:{
      login(){
        this.$router.push({path:"/login"})
      },
      close(){
        $(".bg").css("display","none")
        $(".toast").css("display","none")
        this.$router.push({path:"/"})
      },
      // 清空手机号
      emipy(){
        this.phoneNumber = ''
        $(".next").css("opacity",".5");
        setTimeout(() => {
          $(".img1").css("display","none")
        }, 500)
      },
      // 清空图形验证码
      emipy1(){
        this.picLyanzhengma = ''
        $(".next").css("opacity",".5");
        setTimeout(() => {
          $(".img2").css("display","none")
        }, 500)
      },
      // 清空手机验证码
      emipy2(){
        this.verifyCode = ''
        $(".res").css("opacity",".5");
        setTimeout(() => {
          $(".img3").css("display","none")
        }, 500)
      },
      // 清空登录密码
      emipy3(){
        this.LUserPsd = ''
        $(".res").css("opacity",".5");
        setTimeout(() => {
          $(".img4").css("display","none")
        }, 500)
      },
      // 清空邀请码
      emipy5(){
        this.invitationCode = ''
        setTimeout(() => {
          $(".img5").css("display","none")
        }, 500)
      },
      img5(){
        const leng = this.invitationCode.length
        if (leng >= '1') {
          $(".img5").css("display","block")
        }
      },
      // 手机清空
      img1(){
        const leng = this.phoneNumber.length
        if (leng >= '1') {
          $(".img1").css("display","block")
        }
      },
      img3(){
        const leng = this.verifyCode.length
        if (leng >= '1') {
          $(".img3").css("display","block")
        }
      },
      // 眼睛切换
        eyesTab(){
            if (this.imgSrc == "./static/img/loginEyes.png") {
                this.imgSrc = "./static/img/closeEyes.png";
                this.type = "password"
            }else{
                this.imgSrc = "./static/img/loginEyes.png";
                this.type = "text"
            }
        },
      close1(){
        $(".bg").css("display","none")
        $(".toast1").css("display","none")
      },
      closeREG(){
          this.isshow = true;
          this.isshow1 = false;
      },
      toast1(){
        $(".bg").css("display","block")
        $(".toast1").css("display","block")
      },
      check(){
        if ($('.Agreement .check').is(':checked')) {
            $('.Agreement .img').removeClass('img1').addClass('img2')
            return true
        }else{
            $('.Agreement .img').removeClass('img2').addClass('img1')
            return false
        }
      },
      checkUserPhone(){
        if(this.userPhone == ''){
          console.log(111)
          $(".hiddenTanchuang").removeClass('hiddenTanchuang')
        }
      },
      hiddenTanchuang(){
        $(".tanchuang").addClass("hiddenTanchuang")
      },
      // 验证登陆手机号格式
      checkLPhone(){
          if(this.phoneNumber == ''){
            //   this.$vux.alert.show({
            //   title: '',
            //   content: '请输入手机号'
            // })
            // setTimeout(() => {
            //     this.$vux.alert.hide()
            // }, 1000)
            return false
          }else if(this.phoneNumber.search(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)==0){
              return true;
          }else{
            this.$vux.alert.show({
              title: '',
              content: '请输入正确手机号'
            })
            setTimeout(() => {
                this.$vux.alert.hide()
            }, 1000)
          }
      },
      // 图片验证码
      createCode(){
          code = "";
          var codeLength = 4;//验证码的长度
          var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
           'S','T','U','V','W','X','Y','Z');//随机数
          for(var i = 0; i < codeLength; i++) {//循环操作
              var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
              code += random[index];//根据索引取得随机数加到code上
          }
              this.checkCode = code;//把code值赋给验证码
      },
      // 失焦验证图和密码
      checkLpicma(){
          this.picLyanzhengma.toUpperCase();//取得输入的验证码并转化为大写
          if(this.picLyanzhengma == '') {
            return false
            //   this.$vux.alert.show({
            //   title: '',
            //   content: '请输入验证码'
            // })
            // setTimeout(() => {
            //     this.$vux.alert.hide()
            // }, 1000)
          }else if(this.picLyanzhengma.toUpperCase() != this.checkCode ) { //若输入的验证码与产生的验证码不一致时
              console.log( this.picLyanzhengma.toUpperCase())
              console.log(code)
              this.$vux.alert.show({
                title: '',
                content: '验证码不正确'
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
              }, 1000)
              this.createCode();//刷新验证码
              this.picLyanzhengma = '';
          }else {
              return true;
          }
      },
      next1(){
        if((this.checkLPhone() ==true && this.checkLpicma() == true)){
          const url = myPub.URL+`/check/checkPhone` ;
          var params = new URLSearchParams();
          params.append('phone',this.phoneNumber);;
           axios.post(url,params).then(response => {
              console.log(response)
              if (response.data.result == '302') {
                this.isshow1 = true;
                this.isshow = false;

                // 手机号脱敏
                const tel = $('.register_content_input').val()
                const mtel = tel.substr(0, 3) + '****' + tel.substr(7);
                console.log(mtel)
                this.tel = mtel
                this.sendCode()
              }
              if (response.data.result == '301') {
                  this.$vux.alert.show({
                  title: '',
                  content: '手机号已注册，请直接登录 '
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    const phone = this.phoneNumber
                    this.$router.push({path:"/login",query:{phone:phone}})
                }, 3000)
              }
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      // 手机号验证码
      sendCode() {
        console.log('点击验证码触发')
        this.time = 90
        this.disabled = true
        this.timer()
         // 获取验证
          const url = myPub.URL+`/three/getSmsCode` ;
          var params = new URLSearchParams();
          params.append('phone',this.phoneNumber);
          params.append('msgType','1');
          axios.post(url,params).then(response => {
                console.log(response);
          }).catch((err) => {
            console.log(err)
          })
        },

      timer() {
        if (this.time > 0) {
          this.time--
          this.btnText = this.time + 's'
          setTimeout(this.timer, 1000)
        } else {
          this.time = 0
          this.btnText = '获取验证码'
          this.disabled = false
        }
      },
      // 验证下一步背景色
      changBGC(){
            var pwdLen = $(".yanzhengma_input").val().length;
            if (pwdLen >= 4 && this.checkLPhone() == true) {
                $(".next").css("opacity","1");
            }else{
              $(".next").css("opacity",".5");
            }
            const leng = this.picLyanzhengma.length
            if (leng >= '1') {
              $(".img2").css("display","block")
            }
        },
      // 验证注册背景色
        changres(){
          var pwd = $(".res").val().length;
          if (pwd >= 6) {
              $(".res").css("opacity","1");
          }else{
            $(".res").css("opacity",".5");
          }
          const leng = this.LUserPsd.length
          if (leng >= '1') {
            $(".img4").css("display","block")
          }
        },
      // 验证登录密码
      checkLPsd(){
          if(this.LUserPsd == ''){
            return false
            //   this.$vux.alert.show({
            //   title: '',
            //   content: '请输入密码'
            // })
            // setTimeout(() => {
            //     this.$vux.alert.hide()
            // }, 1000)
          }else if(this.LUserPsd.search(/^(?![0-9]+$)(?![a-zA-Z]+$)(?! )(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,20}$/) == 0){
              $(".list span:eq(2)").addClass("disappear")
              return true;
          }else{
            this.$vux.alert.show({
              title: '',
              content: '密码由6~20位数字、字母或特殊符号组合'
            })
            setTimeout(() => {
                this.$vux.alert.hide()
            }, 1000)
          }
      },
      // 验证手机验证码
      checkSmsCode(){
        const url = myPub.URL+`/three/checkSmsCode` ;
          var params = new URLSearchParams();
          params.append('phone',this.phoneNumber);
          params.append('smsCode',this.verifyCode);
          axios.post(url,params).then(response => {
                console.log(response)
                if (response.data.result == 200) {
                  this.register()
                }else{
                  this.$vux.alert.show({
                  title: '',
                  content: '手机验证码不正确或已超时'
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                  },  1000)
                }
          }).catch((err) => {
            console.log(err)
          })
      },
        register(){
            if (this.check() == false) {
                this.$vux.alert.show({
                title: '',
                content: '请勾选同意启航金服注册协议'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                }, 3000)
            }
            if( this.checkLPsd() == true && this.check() == true){
                const url = myPub.URL+`/reg/register`;
                const pwd = Base64.encode(this.LUserPsd,'utf-8')
                var params = new URLSearchParams();
                params.append('phone',this.phoneNumber);
                params.append('smsCode',this.verifyCode);
                params.append('clientType','h5');
                params.append('regChannel','h5');
                params.append('reqPwd',pwd);
                params.append('invitationCode',this.invitationCode);
                axios.post(url,params).then(response => {
                    console.log(response.data)
                    const data = response.data
                    if (data.result == '200') {
                        $(".bg").css('display',"block")
                        $(".toast").css('display',"block")
                        const token = data.token
                        sessionStorage.setItem('token',token);

                        // 缓存开户数据
                        const url = myPub.URL+`/chinaPnr/userRegister`;
                        var params = new URLSearchParams();
                        params.append('token',sessionStorage.getItem("token"));
                        params.append('clientType','h5');
                        axios.post(url,params).then(res => {
                            console.log(res.data);
                                this.ChinaPnrServer = res.data.chinaPnrServer;
                                this.Version = res.data.Version; //版本号
                                this.CmdId = res.data.CmdId; //消息信息
                                this.MerCustId = res.data.MerCustId; //商户客户号
                                this.RetUrl = res.data.RetUrl; //页面返回的URL //undefinded
                                this.BgRetUrl = res.data.BgRetUrl; //商户后台应答地址
                                this.MerPriv = res.data.MerPriv; //商户私有域 //undefinded
                                this.UsrId = res.data.UsrId; //用户号
                                this.UsrMp = res.data.UsrMp; //手机号
                                this.PageType = res.data.PageType; //页面类型
                                this.ChkValue = res.data.ChkValue; //签名
                        }).catch((err) => {
                            console.log(err);
                        });
                    }else{
                        if (data.result == '300') {
                            this.$vux.alert.show({
                            title: '',
                            content: data.resultMsg
                        })
                        setTimeout(() => {
                            this.$vux.alert.hide()
                        }, 3000)
                        }
                        this.$vux.alert.show({
                            title: '',
                            content: data.resultMsg
                        })
                        setTimeout(() => {
                            this.$vux.alert.hide()
                        }, 3000)
                    }
                }).catch((err) => {
                console.log(err)
                })
            }
        },
        // 三方开户
        kaiHu(){
          const url = myPub.URL+`/chinaPnr/userRegister`;
          var params = new URLSearchParams();
          params.append('token',sessionStorage.getItem("token"));
          params.append('clientType','h5');
          axios.post(url,params).then(res => {
              console.log(res.data);
                  this.ChinaPnrServer = res.data.chinaPnrServer;
                  this.Version = res.data.Version; //版本号
                  this.CmdId = res.data.CmdId; //消息信息
                  this.MerCustId = res.data.MerCustId; //商户客户号
                  this.RetUrl = res.data.RetUrl; //页面返回的URL //undefinded
                  this.BgRetUrl = res.data.BgRetUrl; //商户后台应答地址
                  this.MerPriv = res.data.MerPriv; //商户私有域 //undefinded
                  this.UsrId = res.data.UsrId; //用户号
                  this.UsrMp = res.data.UsrMp; //手机号
                  this.PageType = res.data.PageType; //页面类型
                  this.ChkValue = res.data.ChkValue; //签名

              if(res.data.result == 200){
                  //提交from表单
                  console.log(this.Version)
                  setTimeout(() => {
                      document.regSubmit.submit();
                  }, 1000)

              }
          }).catch((err) => {
              console.log(err);
          });
        }
    },
    watch: {
      '$route' (to, from) {
          this.$router.go(0);
      }//回退上一级页面并刷新
    },


}
</script>

<style type="text/css">
  /*@import '/static/css/register_login.css'*/

  .weui-cells:before{border-top: 0!important;}
  .weui-cells:after{border-bottom: 0!important;}
  .weui-btn_primary{background: transparent!important;color: #FFA303!important;}
  .weui-btn:after{border: 0!important;}
  .weui-input{border:0!important; font-size:0.9rem!important;height: 2rem!important;line-height: 2rem!important;padding-left: 5px;width: 90%!important}
  .weui-cell{padding: 10px 0!important;}
  .weui-btn_mini{font-size: 0.9rem!important;}
  .weui-cells{border-bottom: 1px solid #eee;}
  @media screen and (max-width: 320px) {
    .register_content_input{width: 17rem}
    .yanzhengma_input{width: 10rem;}
    #code{right: -4%;}
}
</style>
<style scoped lang="less">
.settlein{
  padding: 1rem;position: relative;height: 100%;
  .bg-img{
    text-align: center;
    h5{
        text-align: center;font-size: 1rem;font-weight: normal;line-height: 30px;
        img{
          float: left;
          width: 1rem;
          height: 1rem;
          margin-top: 0;
        }
    }
    img{margin-top:2rem;width: 5rem;height: 5rem;}
  }
  .phone{
    .next{opacity: .5}
  }
  .list{
    .res{opacity: .5}
      .regBgImg{
          height: 2.5rem;
          text-align: center;
          div{
              float: left;
              width: .8rem;
              height: .8rem;
              &:after{
                  content: "";
                  display: block;
                  clear: both;
              }
              img{
                  width: 100%;
              }
          }
          h5{
              font-size: 1rem;
              color: #333;
              font-weight: normal;
          }
      }
    label{
      display: block;position: relative;
      img{
          position: absolute;
          right: 1.5rem;
          top: 0.9rem;
          width: 1rem;
          }
          .img4{display: none;}
          .img5{display: none;}
    }
    .Agreement{
      font-size: 0.8rem;margin-top: 20px;position: relative;
      input{width: 1.1rem;height: 1.1rem;opacity: 0;position: relative;z-index: 11;}
      .img{position: absolute;width: 0.8rem;height: 0.8rem;left: 0;top: 0.4rem;display: inline-block;}
      .img1{background: url(~@/assets/img/noagree.png);background-size: 100%;background-repeat: no-repeat;}
      .img2{background: url(~@/assets/img/agree_blue.png);background-size: 100%;background-repeat: no-repeat;}
      b{font-weight: normal;}
      span{display: inline-block;width: 100%;position: absolute;left: 0;bottom: -20px;color: #ff8134}
    }
    .user_login{margin-top: 30px;background: #2B9AFF}
  }
  .c-2395FF{color: #2395FF}
  .bg{position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.5);display: none;}
  .toast{
    position: absolute;top: 8%;left: 12%;width: 76%;background: #fff;border-radius: 5px;text-align: center;display: none;
    img{width: 100%;}
    .right{position: absolute;top: -1rem;right: -1rem;width: 1rem;height: 1rem;}
    .button{position: absolute;bottom: 1rem;width: 90%;height: 2.5rem;line-height: 2.5rem;color: #fff;background: #FFA303;left: 5%;border-radius: 30px;border: 0;}
  }
  .toast1{
      position: absolute;width: 80%;margin-left: 5%;border-radius: 5px;overflow: hidden;background: #f6f6f6;top: 10%;max-height: 80%;overflow-y:auto;display: none;
      h5{
        font-size: 0.9rem;color: #666;text-align: center;font-weight:normal;padding: 0.5rem 0.8rem;
        span{position: fixed;top: 11%;right: 14%;}
      }
      h6{
          font-weight: normal;font-size: 0.8rem;color: #2773FF;padding: 0 0.8rem;margin-top: 1rem;
          .c-FFC62E{display: inline-block;width: 0.6rem;height: 0.6rem;background: #FFC62E;border-radius: 50%;margin-right: 0.5rem;}
          .c-A1CB46{display: inline-block;width: 0.6rem;height: 0.6rem;background: #A1CB46;border-radius: 50%;margin-right: 0.5rem;}
      }
      p{font-size: 0.7rem;color: #666;padding: 0.2rem 0.8rem;line-height: 1.5rem;}
      .button{border: 0;width: 70%;margin-left: 15%;margin-top: 1rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;margin-bottom: 1rem;}
    }
      .left{
      float: left;
  }
  .right{
      float: right;
  }
  .clearfix{
      border-bottom: 1px solid #eee;
  }
  .clearfix:after{
      content:'';
      display:block;
      height:0;
      clear:both;
  }
  .login_or_register{
      background-color: #f2f2f5;
      padding-bottom: 50px;
  }
  /*logo*/
  .logo1{
      text-align: center;
      padding:40px 0 50px ;
      margin:0 auto;
  }
  /*login和register部分*/
  .login_bac{
      width:100%;
      margin: 0 auto;
      position: relative;
  }
  .register_content{
      width:400px;
      background-color: #fff;
      box-shadow: 0 0 15px rgba(0, 0, 0, .5);
      position: absolute;
      left:60px;
      top:80px;
      padding-left: 30px;
      padding-bottom: 50px;
  }
  .tianxie_img{
      width:26px;
      vertical-align: middle;
      margin-right: 10px;
  }
  .tishixiaoxi{
      font-size: 0.7rem;
      color:#FFA303;
      display: block;
      line-height: 20px;
      margin-top: 0.5rem;
      position: absolute;
  }
  .disappear{
       visibility:hidden;
  }
  .register_content p{
      margin-top: 30px;
      font-size: 25px;
      line-height: 18px;
      margin-bottom: 15px;
  }
  .register_content input{
      padding: 5px 0 5px 10px;
      margin-left: 30px;
      height: 30px;
      /*margin-top: 25px;*/
      border: 1px solid #e6e6e6;
  }
  .register_content_input{
    font-size:0.9rem;
      width:98%;
      height: 30px;
      padding: 5px 0 5px 10px;
      margin-top: 1rem;
      border: 0;
      border-bottom: 1px solid #e6e6e6;
  }
  .verification{
    vertical-align: middle;
    font-size: 0.9rem!important;
    border: 0;
    color: #FFA303;
    width: 30%;
    text-align: right;
    background: transparent;
    border-bottom: 0;
  }
  .yanzhengma_input{
    width: 60%;
    font-size:0.9rem;
    padding: 5px 0 5px 10px;
      height: 30px;
      /*margin-top: 25px;*/
      border: 0;
  }
  .agreement{
      position: relative;
      top: -10px;
  }
  .read_already{
      position: relative;
      top:-21px;
      font-size: 12px;
      color: #999;
      cursor: pointer;
      margin-left: 5px;
  }
  .read_already a{
      color:#053d84;
  }
  .send_message{
      display: inline-block;
      height: 40px;
      line-height: 40px;
      color:#ccc;
      padding-left: 45px;
      padding-right: 5px;
      background: url('/static/img/message.png') no-repeat 10px 8px;
      background-size: 25px;
      border: 1px solid #f3f3f3;
      margin-left: 10px;
      cursor: pointer;
  }
  .next1{
      display: block;
      width: 287px;
      height: 50px;
      font-size: 18px;
      text-align: center;
      line-height: 50px;
      color: #fff;
      background-color: #053d84;
      border-radius: 5px;
      margin-left: 40px;
      cursor: pointer;

  }
  /*注册*/
  .login_content1{
      width: 100%;
      background-color: #fff;
      margin-top: 2rem;padding: 0!important;
  }
  .login_content1 label{width: 100%;display: block;position: relative;margin-top: 0.8rem;margin-bottom: 2rem;}
  .login_content1 label .img{position: absolute;right: .8rem;top:1.8rem;width: 1rem;height: 1rem;display: none;}
  .user_login{
      display: block;
      width: 100%;
      height: 40px;
      font-size:0.9rem;
      text-align: center;
      line-height: 40px;
      color: #fff;
      background-color: #2B9AFF;
      border-radius: 30px;
      /*margin-top: 30px;*/
      cursor:pointer;
      margin-top: 1.5rem;
      margin-left: 0!important;
  }
  .bg-ed711f{
    background: #2773FF
  }
  .login_content1 p{
      margin-top: 30px;
      line-height: 18px;
      margin-bottom: 15px;
  }
  .login_content1 input{
      font-size: 0.9rem;
      padding: 5px 0 5px 10px;
      height: 30px;
      /*margin-top: 25px;*/
      border: 0;
      border-bottom: 1px solid #e6e6e6;
  }
  .verification1{
      vertical-align: middle;
      transform: translate(-15px,0);
      width: 30%;
  }
  .forget{
      text-align: right;
      position: relative;
      top:-20px;
      cursor: pointer;
  }
  .forget a{
      font-size: 14px;
      color:#053d84;
      margin-right: 80px;
  }
  #code{
      font-size: 18px;
      letter-spacing:3px;
      color: #053d84;
      background: #f2f2f5;
      height: 42px;
      position: absolute;
      right: -5%;
  }
  /*弹窗*/
  .tanchuang{
      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color:rgba(0,0,0,.5);
      z-index:100;
  }
  .hiddenTanchuang{
      display: none;
  }
  .inTanchuang{
      position: absolute;
      text-align: center;
      width: 300px;
      height: 169px;
      padding-top: 10px;
      left: 50%;
      top: 50%;
      border-radius: 10px;
      -webkit-transform: translateX(-50%) translateY(-50%);
      -ms-transform: translateX(-50%) translateY(-50%);
      transform: translateX(-50%) translateY(-50%);
      background-color: #fff;
  }
  .errorIcon{
      width:55px;
  }
  .register_content  .cue{
      font-size: 14px;
      text-align: center;
      margin-top: 15px;
  }
  .sure{
      display: inline-block;
      color: #fff;
      width: 100px;
      height: 20px;
      padding: 6px 10px;
      background: #053D84;
      border-radius: 5px;
      font-size: 18px;
      line-height: 18px;
      margin-top: 10px;
      cursor: pointer;
  }
}
</style>
