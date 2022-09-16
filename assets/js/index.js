//获取用户信息
//发起ajax
//封装到函数里面
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: res => {
            console.log(res);
            //如果获取失败跳转登录页面
            if (res.status !== 0) {
                location.href = '/login.html'
                return
            } else {
                //成功则根据数据信息渲染页面
                if (res.user_pic) {
                    $('.avatar-img').attr('scr', res.user_pic).show()
                    $('.avatar').hide()
                } else {
                    $('.avatar-img').hide()
                    $('.avatar').show().html((res.data.nickname || res.data.username).charAt(0).toUpperCase())
                }
            }
            //修改span
            $('.avatar-txt').html(`欢迎${res.data.nickname || res.data.username}`)
        }
    })
}

getUserInfo()