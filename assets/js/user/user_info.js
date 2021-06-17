$(function(){
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname:function(value){
            console.log('123')
            if(value.length > 6){
                return '用户昵称必须1~6个字符'
            }
        }
    })

    getUserInfo()


    function getUserInfo(){
        $.ajax({
            url:"/my/userinfo",
            method:"GET",
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('获取用户信息失败')
                }
                form.val('userInfoForm',res.data)
            }
        })
    }

    $('#btnReset').on('click',function(e){
        e.preventDefault();
        getUserInfo();
    })

    // 修改表单提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:"/my/userinfo",
            method:"POST",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('用户信息更新失败')
                }
                layer.msg('用户信息更新成功')
                window.parent.getUserInfo()
            }
        })
    })

})