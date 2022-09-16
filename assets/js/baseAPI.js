//每次发起ajax先执行这个函数
$.ajaxPrefilter(function (option) {
    //每次发起ajax添加接口根路径
    option.url = 'http://big-event-api-t.itheima.net' + option.url
    //每次发起ajax添加请求头  判断是否为/my的接口路径
    if (option.url.indexOf('/my') !== -1) {
        option.headers = option.headers || {}
        option.headers = {
            ...option.headers,
            Authorization: localStorage.getItem('token') || ''
        }
    }
})
