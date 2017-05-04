<?php
	$dbhost = 'localhost';  // mysql服务器主机地址
	$dbuser = 'root';            // mysql用户名
	$dbpass = '910303';          // mysql用户名密码
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
	if(!$row = mysqli_fetch_array($retval, MYSQL_ASSOC)) //没找到
	{
		$insert ="insert into regist (username,password) 
				values ('{$_POST['username']}','{$_POST['password']}')";
		mysqli_select_db( $conn, 'filmnest' );
		$query = mysqli_query( $conn, $insert );
		if(! $query )
		{
		  die('无法插入数据: ' . mysqli_error($conn));
		}
	}else{
		echo 1;
	}
	mysqli_close($conn);
?>