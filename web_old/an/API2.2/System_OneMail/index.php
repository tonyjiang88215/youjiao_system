<?php
///////////////////////////////////////////////////////
// 重发一封邮件接口
// by 孙峻峰 v1.0
///////////////////////////////////////////////////////
	require_once(dirname(__FILE__)."/../../core/interface.php");
	
	class rss extends rs{
		//验证通过处理
		public function onsucess(){
			$this -> selectandwritess('username,code','usr_user',null,null,'username="'.$_REQUEST['u'].'" and yanzheng!=1 and code!=""',"mylist");
			$all = $this -> arr["mylist"];
			if($all[0]!=null){
			$this -> arr["sc"] = 200;
					$this -> pushmail2mailstack("mailstack1",'<div>欢迎注册华夏安业题库账号</div><div>您可复制以下地址到浏览器用来激活华夏安业题库账号，从而使用完整功能。</div><div>https://edu.hxpad.com/jihuo.php?username='.$all[0]["username"].'&code='.$all[0]["code"].'</div><div>如果您未使用此邮箱注册账号，请勿激活。</div>',$all[0]["username"],'华夏安业题库账号激活(重要)');
			}
			else{
				$this -> arr["sc"] = 400;
			}
			$this -> arr["mylist"] = null;
		}
		public function pushmail2mailstack($path,$data,$aim,$subject){
			//	获取毫秒的时间戳
			$time = explode ( " ", microtime () );
			$time = $time [1] . ($time [0] * 1000);
			$time2 = explode ( ".", $time );
			$time = $time2 [0];
			
			$filename = $time;
			$filepath = dirname(__FILE__)."/../../../".$path."/".$filename;
			file_put_contents ($filepath, trim($aim)."\r\n".trim($subject)."\r\n".$data);

		}
		
	}
	
	
	$rs = new rss("GET",array("u"));
	
