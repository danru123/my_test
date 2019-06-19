<template>
    <div>
        <h2>关于html5中如何调用相机拍照并且压缩图片的示例详解</h2>
        <!-- <p v-show="paiz">
            拍照
            <input type="file" capture=camera accept="image/*" @change='change' ref='paiz'>
        </p>
        <div id="imgPreview" v-show="!paiz">
            <img src="#" id="cropedImg" />
        </div>

        <br /><br /> -->

        <!-- 相册:
        <p v-show="xc">
            调取相册
            <input type="file" accept="image/*" id="chooseImage" @change="change2" ref="img">
        </p>
        <br>
        <div id="imgPreview" v-show="!xc">
            <img src="#" id="cropedBigImg" />
        </div> -->

        <p>
            拍照
            <img src="#" id="cropedImg" />
            <input type="file" capture=camera accept="image/*" @change='change' ref='paiz'>
        </p>

        <br /><br />


        <p>
            调取相册
            <img src="#" alt="" id="cropedBigImg">
            <input type="file" accept="image/*" id="chooseImage" @change="change2" ref="img">
        </p>

    </div>
</template>

<script>
export default {
    data(){
        return {
            paiz:true,
            xc:true
        }

    },
    created(){

    },
    methods:{
        change(){
            this.paiz=false;
            var file = this.$refs.paiz.files[0];
            var src = window.URL.createObjectURL(this.$refs.paiz.files[0]);
            $('#cropedImg').attr('src', src); 
            // var mime_type=file.type;
            // var orientation=0;
            // if (file && /^image\//i.test(file.type)) {
            //     EXIF.getData(file,function(){
            //         orientation=EXIF.getTag(file,'Orientation');
            //     });
            //     var reader = new FileReader();
            //     reader.onloadend = function () {
            //         var width,height;
            //         var MAX_WH=800;
            //         var image=new Image();
            //         image.onload=function () {
            //             if(image.height > MAX_WH) {
            //             // 宽度等比例缩放 *=
            //             image.width *= MAX_WH / image.height;
            //             image.height = MAX_WH;
            //             }
            //             if(image.width > MAX_WH) {
            //             // 宽度等比例缩放 *=
            //             image.height *= MAX_WH / image.width;
            //             image.width = MAX_WH;
            //             }
            //             //压缩
            //             var quality=80;
            //             var cvs = document.createElement('canvas');
            //             cvs.width = width = image.width;
            //             cvs.height =height = image.height;

            //             switch (orientation) {
            //             case 6:
            //             case 8:
            //                 cvs.width = height;
            //                 cvs.height = width;
            //                 break;
            //             }

            //             var context=cvs.getContext("2d");

            //             //解决ios图片旋转问题
            //             switch(orientation){
            //             //iphone横屏拍摄，此时home键在左侧
            //             case 3:
            //             // 180度向左旋转
            //             context.translate(width, height);
            //             context.rotate(Math.PI);
            //             break;
            //             //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
            //             case 6:
            //             context.rotate(0.5 * Math.PI);
            //             context.translate(0, -height);
            //             break;
            //             //iphone竖屏拍摄，此时home键在上方
            //             case 8:
            //             // 逆时针旋转90度
            //             context.rotate(-0.5 * Math.PI);
            //             context.translate(-width, 0);
            //             break;
            //             }
            //             context.drawImage(image, 0, 0,image.width, image.height);
            //             dataURL = cvs.toDataURL('image/jpeg', quality/100);
            //             //获取识别结果
            //         }
            //         image.src=dataURL;
            //     };
            //     reader.readAsDataURL(file);
            // }else{
            //     alert("只能识别图片！")
            // }
        },
        change2(){
            // var files = this.$refs.img.files;
            // console.log(files);
            // var src = window.URL.createObjectURL(files.files[0]);
            // $('#cropedBigImg').css('display','block');
            // $('#cropedBigImg').attr('src', src); 
            this.xc=false;
            var filePath = $('#chooseImage').val();//获取到input的value，里面是文件的路径
            var fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
            // var src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
            var src = window.URL.createObjectURL(this.$refs.img.files[0]); //转成可以在本地预览的格式
            // 检查是否是图片
            if(!fileFormat.match(/.png|.jpg|.jpeg|.jfif/)) {
                error_prompt_alert('上传错误,文件格式必须为：png/jpg/jpeg');
                return;
            }else{
                $('#cropedBigImg').css('display','block');
                $('#cropedBigImg').attr('src', src); 
            } 
        }
    }
}
</script>

<style scoped>
    #cropedImg,#cropedBigImg{
        width: 200px;
        height: 150px;
    }
    p{
        width: 200px;
        height: 150px;
        border:1px solid #ccc;
        position: relative;
        text-align: center;
        line-height: 150px;
    }
    p input{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    p img{
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
