$(function(){
    var layer = layui.layer;
    var form = layui.form;
    getArticleList();
    function getArticleList(){
        $.ajax({
            url:"/my/article/cates",
            method:"GET",
            success:function(res){
                console.log(res)
                if(res.status !== 0){
                    return layer.msg('获取文章类别列表失败')
                }
                var htmlstr = template('table_data',res)
                $('tbody').html(htmlstr)
            }
        })
    }

    var addIndex = null
    $('#btnAddCate').on('click',function(){
        addIndex = layer.open({
            type:1,
            area:['500px','250px'],
            title:'添加文章类别',
            content:$('#add_dialog').html()            
        })
    })

    $('body').on('submit','#add_form',function(e){
        e.preventDefault();
        $.ajax({
            url:"/my/article/addcates",
            method:"POST",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('新增文章类别失败')
                }
                getArticleList()
                layer.msg('新增文章类别成功')
                layer.close(addIndex)

            }
        })
    })
    var editIndex = null
    $('tbody').on('click','.btn-edit',function(){
        editIndex = layer.open({
            type:1,
            area:['500px','250px'],
            title:'修改文章类别',
            content:$('#edit_dialog').html()            
        })     
        
        var id = $(this).attr('data-id');
        $.ajax({
            url:"/my/article/cates/" + id,
            method:"GET",
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('获取文章分类数据失败')
                }
                form.val('edit_form',res.data)

            }
        })        
        
    })


    $('body').on('submit','#edit_form',function(e){
        e.preventDefault();
        $.ajax({
            url:"/my/article/updatecate",
            method:"POST",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新分类信息失败')
                }
                getArticleList()
                layer.msg('更新分类信息成功！')
                layer.close(editIndex)

            }
        })
    }) 
    

    $('tbody').on('click','.btn-delete',function(){
        var id = $(this).attr('data-id');
        layer.confirm('确认删除吗?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                url:"/my/article/deletecate/" + id,
                method:"GET",
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg(res.message || '删除文章分类失败')
                    }
                    getArticleList()
                    layer.msg('删除文章分类成功')
                    layer.close(index);
    
                }
            })  
          });        
      
        
    })    

})