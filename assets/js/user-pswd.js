//验证密码格式
layui.form.verify({
    pwd: [/^[\S]{6,10}$/, '请输入6-10位字符'],
    regpwd: function (value) {
        //判断两次密码是否一致
        if (value !== $('.newpswd').val()) {
            return '两次密码不一致'
        }
    }
}
)

//点击修改密码 发起请求更新密码
$('form').submit(function (e) {
    //阻止默认提交行为
    e.preventDefault()
    //获取表单里面的数据
    const data = $(this).serialize()
    //发起ajax请求
    $.ajax({
        url: '/my/updatepwd',
        method: 'POST',
        data: data,
        success: res => {
            layer.msg(res.message)
            if (res.status === 0) {
                this.reset()
            }
        }
    })
})