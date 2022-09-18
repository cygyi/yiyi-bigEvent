const objs = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
}
let limit = 2
let curr = 1
//渲染分页器函数
function Page(total) {
    //设置分页器
    layui.laypage.render({
        elem: 'page',
        count: total,
        limit: limit,
        limits: [2, 4, 10, 20],
        curr: curr,
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        jump: function (obj, first) {
            if (first) return
            curr = obj.curr
            objs.pagenum = obj.curr
            objs.pagesize = obj.limit
            limit = obj.limit
            getCont()
        }
    })
}

//获取文章函数
function getCont() {
    //获取文章数据
    $.ajax({
        url: '/my/article/list',
        data: objs,
        success: res => {
            //调用模板引擎
            $('tbody').html(template('cont-temp', res))
            Page(res.total)
        }
    })
}

getCont()

//点击删除按钮删除该项
$('body').on('click', '.remove', function () {
    //发起ajax请求
    $.ajax({
        url: `/my/article/delete/${$(this).attr('data-id')}`,
        success: res => {
            //提示用户
            layer.msg(res.message)
            //渲染页面
            getCont()
        }
    })
})

//获取文章数据
$.ajax({
    url: '/my/article/cates',
    success: res => {
        $('.cates-select').html(template('select-temp', res))
        layui.form.render()
    }
})

//点击筛选按钮 获取文章数据传入参数
$('form').submit(function (e) {
    //阻止默认行为
    e.preventDefault()
    //修改配置对象
    obj.cate_id = $('.cates-select').val()
    obj.state = $('.status-select').val()
    //发起请求
    getCont()
})


