$(function () {
  //点击注册链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  //点击注册链接
  $('#link_login').on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  });
  //从layui导入form对象
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    //自定义一个叫做pwd的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      //通过行参拿到密码框中的内容
      //拿到密码框中的内容
      //判断内容
      //如果失败return一个返回消息
      var pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) {
        return '两次密码不一致';
      }
    },
  });
  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    //阻止默认行为
    e.preventDefault();
    //ajax post请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val(),
    };
    $.post(
      '/api/reguser',
      data,
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        layer.msg('注册成功，请登录！');

        $('#link_login').click();
      }
    );
  });
  //监听登录表单中的数据
  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'post',
      //快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！');
        }
        layer.msg('登录成功');
        //将登录成功的token 字符串保存到localstorage中
        localStorage.setItem('token', res.token);
        // 登录成功后跳转至index页面
        location.href = '/index.html';
      },
    });
  });
});
