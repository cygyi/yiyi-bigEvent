//导入img对象
const $img = $('.left img')

//使用对象下的cropper方法
$img.cropper({
    aspectRatio: 1,
    preview: '.yuan'
})

//点击选择模拟input点击事件
$('.ava-choose').click(() => {
    $('[type=file]').click()
})

//监听文件上传变化事件
$('[type=file]').change(function (e) {
    //判断是否有上传图片
    if (e.target.files.length === 0) return
    //如果传入获取file对象
    const file = e.target.files[0]
    //创建一个对象的路径
    const url = URL.createObjectURL(file)
    $img
        // 销毁原有的图片
        .cropper('destroy')
        //修改img的src
        .attr('src', url)
        .cropper({
            aspectRatio: 1,
            preview: '.yuan'
        })
})

//点击上传发起ajax请求更新头像
$('.ava-upload').click(function () {
    //获取裁剪后的图片 转换成base64格式
    const base64 = $img
        .cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        })
        .toDataURL('image/png')
    //发起ajax请求
    $.ajax({
        url: '/my/update/avatar',
        method: 'POST',
        data: {
            avatar: base64
        },
        success: function (res) {
            layer.msg(res.message)
            window.parent.getUserInfo()
        }
    })
})