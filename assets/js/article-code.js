//封装渲染页面函数
function getArticle() {
    //发起ajax请求获取数据
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: res => {
            $('tbody').html(template('article-tplate', res))
        }
    })
}
getArticle()

let index
//点击添加目录弹出弹窗
$('.article-add').click(function () {
    index = layer.open({
        title: '添加目录',
        content: template('form-tplate', {}),
        area: '500px',
        btn: false
    })
})

//点击添加目录表单的提交
//是动态生成的表单需要利用事件委托

$('body').on('submit', '.form-add', function (e) {
    //阻止默认行为
    e.preventDefault()
    //发起ajax请求
    $.ajax({
        method: 'post',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: res => {
            //提示
            layer.msg(res.message)
            //渲染页面
            getArticle()
            //关闭弹窗
            layer.closeAll(index)
        }
    })
})

//点击删除按钮 删除该文章
$('body').on('click', '.remove', function () {
    //获取按钮的自定义属性
    const id = $(this).attr('data-id')
    //利用id发起ajax请求删除对应文章
    $.ajax({
        url: `/my/article/deletecate/${id}`,
        success: res => {
            //提示
            layer.msg(res.message)
            //重新渲染页面
            getArticle()
        }
    })
})

//点击修改弹出修改目录
$('body').on('click', '.edit', function () {
    index = layer.open({
        title: '修改目录',
        content: template('edit-form-tplate', {}),
        area: '500px',
        btn: false,
        success: () => {
            $.ajax({
                url: `/my/article/cates/${$(this).attr('data-id')}`,
                success: res => {
                    layui.form.val('editForm', res.data)
                }
            })
        }
    })
})

//点击修改目录表单提交
$('body').on('submit', '.form-edit', function (e) {
    //阻止默认提交事件
    e.preventDefault()
    //获取表单内数据
    const data = $(this).serialize()
    //发起ajax请求
    $.ajax({
        url: '/my/article/updatecate',
        method: 'post',
        data: data,
        success: res => {
            //提示
            layer.msg(res.message)
            //渲染页面
            getArticle()
            //关闭弹窗
            layer.close(index)
        }
    })
})