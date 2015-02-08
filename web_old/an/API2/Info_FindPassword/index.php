<?php
///////////////////////////////////////////////////////
// 找回密码接口
// by 孙峻峰 v1.0
///////////////////////////////////////////////////////

	require_once(dirname(__FILE__)."/../../core/interface.php");
	require_once(dirname(__FILE__)."/../../include/Fmail.class.php");
	
	class rss extends rs{
		//验证通过处理
		public function onsucess(){
			
			if($this -> verifyemail()){
				
				//发信设置
				$svr = array(
					'smtp' => 'smtp.exmail.qq.com',
					'user' => 'support@hxnetwork.com',
					'pass' => 'hx123456',
					'host' => 'smtp.exmail.qq.com'
				); 
				$fmail = new Fmail($svr, false);			
				
				$mail = array(
					'name' => '华夏安业题库',
					'from' => 'support@hxnetwork.com',
					'to' => $_REQUEST['email'],
					'cc' => $_REQUEST['email'],
					'subject' => '华夏安业题库重置密码(重要)',
					'cont' => '<div>华夏安业题库重置密码(重要)</div><div>您可复制以下地址到浏览器用来重置华夏安业题库账号密码。</div><div>https://edu.hxpad.com/resetpassword.php?username='.$_REQUEST['email'].'&code='.$this->setinfo().'</div><div>如果您未重置密码，请勿操作。</div>',
					'cont_type' => Fmail::CONT_TYPE_HTML, // html格式
					'apart' => true // 隐藏To、Cc和Bcc
				);
				
				if($fmail->send($mail)) {
					$this -> arr["sc"] = 200;
				}
				else {
					$this -> arr["sc"] = 400;
				}
				$fmail->close();
			}
			else{
				$this -> arr["sc"] = 401;
			}

		}
		//设置新code
		public function setinfo(){
			$id = $this -> db -> rs['id'];
			$code = $this -> randStr(64,"ALL");
			$this -> db -> sql = "update usr_user set code='".$code."' where id=".$id;
			$this -> db -> ExecuteSql();
			return $code;
		}
		
		//查找是否有email
		public function verifyemail(){
			return $this -> db -> Queryif('usr_user',"username='".$_REQUEST['email']."'");		
		}

	}
	
	$rs = new rss("GET",array("email","func"));
	
	
