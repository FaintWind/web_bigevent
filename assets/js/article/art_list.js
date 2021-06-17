$(function(){
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;



    template.defaults.imports.dataFormat = function(data){
        var date = new Date(data)

        var y = padZero(date.getFullYear());
        var m = padZero(date.getMonth() + 1);
        var d = padZero(date.getDate());

        var hh = padZero(date.getHours());
        var mm = padZero(date.getMinutes());
        var ss = padZero(date.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ' : ' + mm + ' : ' + ss

    }

    function padZero(value){
        return value > 9 ? value : '0' + value
    }
    var q = {
        pagenum : 1,
        pagesize : 2,
        cate_id : '',
        state : ''
    }

    initTable()
    initCateList()

    $('#form-search').on('submit',function(e){
        e.preventDefault();
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        q.state = state
        q.cate_id = cate_id
        initTable()
    })




    function initTable(){
        $.ajax({
            url:"/my/article/list",
            method:"GET",
            data:q,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('获取文章列表失败')
                }
                var htmlStr = template('tql-table',res)
                $('tbody').html(htmlStr)
                pageRender(res.total)
            }
        })
    }

    function initCateList(){
        $.ajax({
            url:"/my/article/cates",
            method:"GET",
            data:q,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('获取文章分类失败')
                }
                var htmlStr = template('tql-cate',res)
                $('[name=cate_id]').html(htmlStr)
                form.render()

            }
        })        
    }

    function pageRender(total){
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号            
            count: 50 ,//数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout:['count','limit','prev', 'page', 'next','skip'],
            limits:[2,3,5,10],
            jump:function(obj,first){
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if(!first){
                    initTable();
                }
            }
          });
    }
})