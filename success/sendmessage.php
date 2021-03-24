<?php

 /* Здесь проверяется существование переменных */

$fio = $_POST['fio'];
$tel = $_POST['tel'];


/* Сюда впишите свою эл. почту */
 
$address = "sk-masterovoi@yandex.ru";

/* А здесь прописывается текст сообщения, \n - перенос строки */
 
$mes = "Имя: $fio\nТелефон: $tel";

/* А эта функция как раз занимается отправкой письма на указанный вами email */

$sub='СК Мастеровой Пенза - Обратный Звонок'; //сабж
$email='СК Мастеровой Пенза'; // от кого
$send = mail ($address,$sub,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$email");
?>

<!DOCTYPE html>
<html lang="ru">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="refresh" content="8; url=https://мастеровой-пнз.рф">
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Поздравляем! Ваш заказ принят!</title>
	<link rel=icon href="../assets/img/icons/favicon.png">
	<link rel="stylesheet" type="text/css" href="index.css" media="all">
</head>

<body>
	<div class="wrap_block_success">
		<div class="block_success">
			<h2>Благодарим Вас за заказ!</h2>

			<p class="order_number"><span>Ваш заказ успешно принят и поставлен в обработку!</span></p>

			<h2>В ближайшее время с вами свяжется менеджер для подтверждения заказа. Пожалуйста, включите ваш
				контактный телефон.</h2>
		</div>
	</div>
	<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
    (function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
            try {
                w.yaCounter51390526 = new Ya.Metrika({
                    id:51390526,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                });
            } catch(e) { }
        });

        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/watch.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
    })(document, window, "yandex_metrika_callbacks");
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/51390526" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
</body>

</html>
