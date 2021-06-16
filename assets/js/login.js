$(function(){
    // 登录注册表单切换
    $("#link_login").on('click',function(){
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_reg").on('click',function(){
        $(".login-box").show();
        $(".reg-box").hide();
    }) 
    
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12,且不能出现空格'],
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val();
            if(value !== pwd){
                return '两次密码不一致'
            }
        }
    })

    // 注册
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        let params = {
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',params,function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#form_reg [name=username]').val('')
            $('#form_reg [name=password]').val('')            
            $('#form_reg [name=repassword]').val('')            
            $("#link_reg").click()
        })
    })

    // 登录
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:"/api/login",
            method:'post',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message || '登录失败')
                }
                layer.msg(res.message || '登录成功！')
                localStorage.setItem('token',res.token)
                location.href="/index.html"
            }
        })
    })
})