<?php
header("Content-Type: text/html; charset=utf-8");
$email = htmlspecialchars($_POST["email"]);
$name = htmlspecialchars($_POST["name"]);
$massage = htmlspecialchars($_POST["massage"]);

$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$myemail = "tosyya@list.ru";

$tema = "Тема письма админу";
$message_to_myemail = "Текст письма:
<br><br>
Имя: $name<br>
E-mail: $email<br>
Сообщения: $massage<br>
Источник (ссылка): $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: antosyya <60662409+antosyya@users.noreply.github.com> \r\n Reply-To: antosyya\r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );

//$f = fopen("leads.xls", "a+");
//fwrite($f," <tr>");    
//fwrite($f," <td>$email</td> <td>$name</td> <td>$tel</td>   <td>$date / $time</td>");   
//fwrite($f," <td>$refferer</td>");    
//fwrite($f," </tr>");  
//fwrite($f,"\n ");    
//fclose($f);


?>