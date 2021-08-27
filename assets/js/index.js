$(function () {
  getUserInfo();
  var layer = layui.layer;
  $('#btnLogout').on('click', function () {
    layer.confirm(
      '确定退出登录？',
      { icon: 3, title: '提示' },
      function (index) {
        localStorage.removeItem('token');
        location.href = 'login.html';
        layer.localStorage(index);
      }
    );
  });
});
//获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    //headers 请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || '',
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！');
      }
      renderAvatar(res.data);
    },
    complete: function (res) {
      // console.log('执行了');
      // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
      if (
        res.responseJSON.status === 1 &&
        res.responseJSON.message === '身份认证失败！'
      ) {
        // 1. 强制清空 token
        localStorage.removeItem('token');
        // 2. 强制跳转到登录页面
        location.href = '/login.html';
      }
    },
  });
}
//渲染用户头像
function renderAvatar(user) {
  var name = user.nickname || user.username;
  //设置欢迎文本
  $('#welcome').html('欢迎&nbsp&nbsp;' + name);
  // 按需渲染用户头像
  if (user.user_pic !== null) {
    //  渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    //渲染文本头像
    $('.layui-nav-img').hide();
    var first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
  }
}
