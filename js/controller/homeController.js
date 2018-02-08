app.controller('HomeController', function($scope, $http, $state, $location, $rootScope, $stateParams) {
	
	layui.use('upload', function(){
		var $ = layui.jquery
		,upload = layui.upload;
		  
		//普通图片上传
		var uploadInst = upload.render({
			elem: '#test1'
		    ,url: 'http://119.29.138.140/face/count'
		    ,before: function(obj){
		      //预读本地文件示例，不支持ie8
		    	obj.preview(function(index, file, result){
		    		$('#demo1').attr('src', result); //图片链接（base64）
		      	});
		    }
		    ,done: function(res){
		    	console.log(res);
		    	var demoText = $('#demoText');
		      	demoText.html('<span style="color: #FF5722;">' + res.faces_in_image + '个人脸</span>');
			    //如果上传失败
			    if(res.code > 0){
			    	return layer.msg('上传失败');
			    }
			    //上传成功
		    }
		    ,error: function(){
		    	//演示失败状态，并实现重传
		      	var demoText = $('#demoText');
		      	demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
		      	demoText.find('.demo-reload').on('click', function(){
		        	uploadInst.upload();
		    	});
		    }
		});
	});
});