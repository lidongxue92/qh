<template>
    <div id="container" class="container">
      <div id="selectfiles"></div>
      <img  :src=imgs  alt="图片显示失败" id='imgId'>
      <!--<ul>
        <li v-for="file in files">{{file}}</li>
      </ul> -->
    </div>
</template>
<script>
    import axios from 'axios'
    import $ from 'jquery'
    export default {
      name: 'container',
       data() {
                return {
                    accessid: 'LTAIcTf7VMuMkUsa', //改成你自己的accessid
                    accesskey: 'PMl8IRafp7jH4I3NGjMFmsvbylFVUj', //改成你自己的accesskey
                    host: 'https://weifenshops.oss-cn-shanghai.aliyuncs.com', //改成你自己的host
                    policyText: {
                        "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
                        "conditions": [
                            ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
                        ]
                    },
                    signature: '',
                    files: [],
                    uploader: {}
                }
            },
            props:['imgs'],
            mounted() {
                const self = this;
                var uploader = new plupload.Uploader({
                    runtimes: 'html5,flash,silverlight,html4',
                    browse_button: 'selectfiles',
                    //multi_selection: false,
                    container: document.getElementById('container'),
                    flash_swf_url: '/test/lib/plupload/js/Moxie.swf',
                    silverlight_xap_url: '/test/lib/plupload/js/Moxie.xap',
                    url: 'http://oss.aliyuncs.com',
                    init: {
                        PostInit: function() {},

                        FilesAdded: function(up, files,event) {
                            //上传成功前
                            console.log(files)
                            self.files = files;
                            //此处是当选中图片之后触发向服务器提交的方法
                            self.selectFile()
                        },

                        BeforeUpload: function(up, file) {
                            console.log('上传前'+file)
                            self.set_upload_param(up, '此处定义文件名称/'+file.name, true);
                            // 上传前
                        },

                        UploadProgress: function(up, file) {

                            // 可以在此设置上传进度
                        },

                        FileUploaded: function(up, file, info) {
                            console.log(up, file, info)

                            // 上传成功之后，文件的url为: host + file.name
                            if (info.status == 200) {
                                console.log('上传成功了')
                            }
                        },

                        Error: function(up, err) {
                            // 上传错误
                        }
                    }
                });
                self.uploader = uploader;
                self.uploader.init();
            },
            methods: {
                selectFile() {
                    this.set_upload_param(this.uploader, '', false);
                },
                set_upload_param(up, filename, ret) {
                    // console.log('可以改变图片路径了')
                    // this.imgs =this.host+'/'+filename
                    // console.log(this.imgs)

                    var me = this;
                    me.$loading.show()
                    setTimeout(function(){
                    console.log(me.host)
                        $('#imgId').attr('src',me.host+'/'+filename)
                         me.$loading.hide()
                    },2000);//延时3秒


                    var policyBase64 = Base64.encode(JSON.stringify(this.policyText));
                    var message = policyBase64;
                    var bytes = Crypto.HMAC(Crypto.SHA1, message, this.accesskey, {
                        asBytes: true
                    });
                    var signature = Crypto.util.bytesToBase64(bytes);
                    var new_multipart_params = {
                        'Filename': filename,
                        'key': filename,
                        'policy': policyBase64,
                        'OSSAccessKeyId': this.accessid,
                        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                        'signature': signature,
                    };
                    up.setOption({
                        'url': this.host,
                        'multipart_params': new_multipart_params
                    });

                    up.start();
                }
            }
    }
</script>
<style lang="less">
.container{
    width:200px;
    height:200px;
    position:relative;
}
#selectfiles{
    width:200px;
    height:200px;
    opacity:0;
    position:absolute;
    top:0;
    left:0;
}
#imgId{
    width:200px;
    height:200px;
    position:absolute;
    top:0;
    left:0;
}
</style>