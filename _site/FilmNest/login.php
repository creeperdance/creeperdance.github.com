<?php
	$dbhost = 'localhost';  // mysql服务器主机地址
	$dbuser = 'root';            // mysql用户名
	$dbpass = '910303';          // mysql用户名密码
	$text = "";					 // 返回的响应信息
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
	if(! $conn )
	{
	  die('连接失败: ' . mysqli_error($conn));
	}
	// 设置编码，防止中文乱码
	mysqli_query($conn , "set names utf8");	 
	
	$sql = " SELECT * FROM regist where username ='{$_POST['username']}' ";
 	mysqli_select_db( $conn, 'filmnest' );
	$retval = mysqli_query( $conn, $sql );
	if(! $retval )
	{
	    die('无法读取数据: ' . mysqli_error($conn));
	}
	if($row = mysqli_fetch_array($retval, MYSQL_ASSOC)) //没找到
	{
			$text +='1';
	}
	$sql_login = "SELECT * FROM regist where username ='{$_POST['username']}' and password = '{$_POST['password']}' ";
	mysqli_select_db( $conn, 'filmnest' );
	$login_retval = mysqli_query( $conn, $sql_login );
	if(! $login_retval )
	{
	    die('无法读取数据: ' . mysqli_error($conn));
	}
	if($row = mysqli_fetch_array($login_retval, MYSQL_ASSOC)) //没找到
	{
		$text +='2';
	}
	echo $text;
	mysqli_close($conn);
?>