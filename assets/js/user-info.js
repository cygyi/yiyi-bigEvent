$.ajax({
  url: '/my/userinfo',
  success: res => {
    //如果获取信息成功 赋值表单
    if (res.status === 0) {
      //调用layui方法给整个表单赋值
      layui.form.val('userinfo-form', res.data)
    }
  }
})

//点击提交按钮修改用户信息
$('form').submit(function (e) {
  //阻止表单默认行为
  e.preventDefault()
  //收集表单的数据
  const data = $(this).serialize()
  //发起ajax请求
  $.ajax({
    url: '/my/userinfo',
    method: 'POST',
    data: data,
    success: res => {
      //提示修改信息
      layer.msg(res.message)
      //判断如果成功修改页面信息
      //利用window.
      if (res.status === 0) {
        window.parent.getUserInfo()
      }
    }
  })
})