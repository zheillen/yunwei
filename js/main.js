var formDisplay = {};//命名空间
var host = "";
formDisplay.tool = {};
//加载json数据,根据规则显示数据
formDisplay.tool.loadData = function(url, type, dataType, data, token, errorMsg, callback){
    $.ajax({         
        url: url,
        type: type,
        dataType: dataType,
        data:data,
        success: function(data){ 
            (typeof(yunwei)!="undefined")?yunwei.dialogClose():console.log('Can not use dialogClose');
            callback(data);
        },
        error: function(xhr, errorType, error){
            (typeof(yunwei)!="undefined")?yunwei.showTip(errorMsg):alert(errorMsg);
        },
        headers:{
            "token": token
        }
    });
}
// 将form中的值转换为键值对。
formDisplay.tool.getFormJson = function(frm) {
    var o = {};
    var a = $(frm).serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}
//将APP端的ArrayList数据'[1,2,3]'转换成数组[1,2,3]
formDisplay.tool.strToArr = function(str){
    var resultArr = [];
    resultArr = str.replace(/\s/g,"").replace("[","").replace("]","").split(",");
    return resultArr;
}

formDisplay.ui = {};
formDisplay.ui.dataShow = function(data){
    
    for(var i=0; i<data.length; i++){
        var containersLength = data[i].containers.length;
        var componentsLength = 0;
        for(var j=0; j<containersLength; j++){
            (data[i].containers[j].components)&&(componentsLength = data[i].containers[j].components.length);
            for(var k=0; k<componentsLength; k++){
                var onerow = data[i].containers[j].components[k].onerow;
                for(var n=0; n<onerow.length; n++){
                    onerow[n].typeClassify = onerow[n].type;
                    (onerow[n].type=="radiogroup"||onerow[n].type=="bizCode"||onerow[n].type=="userSelect"||onerow[n].type=="departmentSelect")&&(onerow[n].typeClassify = "select");   
                    (onerow[n].readonly)&&(onerow[n].typeClassify = "text");
                    (onerow[n].type=="relateResource"||onerow[n].type=="attachFile"||onerow[n].type=="manageResource")&&(onerow[n].typeClassify = "table"); 
                }
            }
        }
    }

    Vue.filter('isInParent', function (dataIndex, data) {
        return data[dataIndex];
    });

    new Vue({
        el: '.oneObj',
        data: {
            objs:data
        },
        methods: {
            greet: function (event) {
              // 方法内'this'指向vm
              alert('Hello ' + $(this).parent().attr('id') + '!')
              // 'event'是原生DOM事件
              alert(event.target.tagName)
            }
        },
        computed:{            

        }
    });
}
formDisplay.ui.deleteServerRes = function(arr){
    var trId = $(arr).parents().eq(1).attr("id");

}

formDisplay.app = {};
//初始化数据
formDisplay.app.unit = function(url, token, eleClass) {
    testToken = token; 
    if(url.indexOf("http") != -1){
        host=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\:[\d]+)?/.exec(url)[0];
    }    
    $('#'+eleClass).html("");//清空页面内容
}
//给APP端调用，通过url初始化表单
formDisplay.app.appURL = function(url, token){
    formDisplay.app.unit(url, token, 'formWrap');
    formDisplay.tool.loadData(url, "GET", 'json', "", token, "Ajax error!", function callback(data){
        formDisplay.ui.dataShow(data);
    }); 
}
// formDisplay.app.appURL("http://10.1.10.36:8890/api/v2/mobile/itsm/my-tasks?id=2", "+wqIf/acyBEowHYqfmc1ZAHutccV1tRXlfe7fpXu1iUtfyXKFO/HRnWO/SMhVn7K");

formDisplay.app.appURL("./data/dynaform2.json", "+wqIf/acyBEowHYqfmc1ZAHutccV1tRXlfe7fpXu1iUtfyXKFO/HRnWO/SMhVn7K");
