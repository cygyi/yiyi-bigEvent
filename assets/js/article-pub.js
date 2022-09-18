//获取文章数据
$.ajax({
    url: '/my/article/cates',
    success: res => {
        //调用模板引擎
        $('select').html(template('pub-temp', res))
        //layui动态生成表单需要重新渲染
        layui.form.render()
    }
})

//调用富文本插件
initEditor()

//获取图片盒子
const $img = $('.leftPic')

$img.cropper({
    asepctRatio: 40 / 28,
    preview: '.right-pic'
})

//点击选择图片
$('.choose-img').click(function () {

    //模拟点击上传框事件
    $('input[type=file]').click()
})

//监听上传框变化事件
$('[type=file]').change(function (e) {
    //判断用户是否有传入图片
    if (this.files.length === 0) return
    const file = e.target.files[0]
    const url = URL.createObjectURL(file)
    $img
        //先销毁原有图片
        .cropper('destroy')
        //重新传入裁剪
        .attr('src', url)
        .cropper({
            asepctRatio: 40 / 28,
            preview: '.right-pic'
        })
})

let state = ''
//获取state数据  监听两个按钮点击事件
$('.pub,.save').click(function () {
    //判断点击的是发布还是存为草稿
    if ($(this).html() === '发布') {
        state = '已发布'
    } else {
        state = '草稿'
    }
})

//监听表单提交事件
$('form').submit(function (e) {
    //阻止默认行为
    e.preventDefault()
    //获取表单数据
    const file = new FormData(this)


    //将裁剪后的图片转成二进制格式追加给表单
    $img
        .cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        })
        .toBlob(res => {
            file.append('cover_img', res)
            file.append('state', state)
            //发起ajax请求
            $.ajax({
                url: '/my/article/add',
                method: 'post',
                data: file,
                contentType: false,
                processData: false,
                success: res => {
                    layer.msg(res.message)
                    $('form')[0].reset()
                    location.href = '/article/article-cont.html'
                }
            })
        })
})

