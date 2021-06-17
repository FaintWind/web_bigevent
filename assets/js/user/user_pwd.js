$(function(){
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],  
        samePwd:function(value){
            var oldPwd = $('[name=oldPwd]').val()
            if(value === oldPwd){
                return '新密码不能和与原密码一致'
            }
        },
        rePwd:function(value){
            var newPwd = $('[name=newPwd]').val()
            if(value !== newPwd){
                return '两次新密码不一致'
            }
        }
           
    })


    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url:"/my/updatepwd",
            method:"POST",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('修改密码错误')
                }
                layui.layer.msg('修改密码成功')
                
                $('.layui-form')[0].reset()
            } 
        })        
    })

})