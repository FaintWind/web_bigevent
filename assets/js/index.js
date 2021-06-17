$(function(){
    getUserInfo()

    var layer = layui.layer;
    $('#loginoutBtn').on('click',function(){
        layer.confirm('确认退出登录吗?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token');
            location.href = '/login.html';
            
            layer.close(index);
          });         
    })
})
// 获取用户信息
function getUserInfo(){
    $.ajax({
        url:"/my/userinfo",
        method:"GET",
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
            
        },
        // complete:function(res){
        //     console.log(res);
        //     var responseJSON = res.responseJSON;
        //     if(responseJSON.status === 1 && responseJSON.message === '身份认证失败！'){
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user){
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    debugger;
    if(user.user_pic !== null){
        $(".layui-nav-img").attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();      

    }
}