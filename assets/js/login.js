//点击登录显示登录盒子，点击注册显示注册盒子
$('.change-btn').on('click', () => {
    $('.login-form').toggle()
    $('.reg-form').toggle()
})

//定义表单验证规则
layui.form.verify({
    psw: [/^[\S]{6,10}$/, '密码必须6到10位，且不能出现空格'],
    repsw: function (value) {
        if ($('.reg-form [name=password]').val() !== value) {
            return '两次密码不一致'
        }
    }
})

//注册点击提交的时候触发
$('.reg-form form').submit(function (e) {
    //阻止默认行为
    e.preventDefault()
    //获取表单数据
    const data = $(this).serialize()
    //发起ajax请求
    $.ajax({
        url: '/api/reguser',
        method: 'POST',
        data: data,
        success: (res) => {
            //弹出注册提示
            layer.msg(res.message)
            //如果注册成功执行
            if (res.status === 0) {
                $(this)[0].reset()
                //切换到登录盒子
                $('.reg-form .change-btn').click()
            }
        }
    })
})

//登录
$('.login-form form').submit(function (e) {
    //阻止默认行为
    e.preventDefault()
    //获取表单数据
    const data = $(this).serialize()
    console.log(data);
    //发起ajax请求
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: data,
        success: (res) => {
            console.log(res);
            //弹出注册提示
            layer.msg(res.message)
            //如果注册成功执行
            if (res.status === 0) {
                //把token存储到本地数据
                localStorage.setItem('token', res.token)
                //切换到首页
                location.href = '/index.html'
            }
        }
    })
})