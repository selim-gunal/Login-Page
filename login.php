<?php
        if (isset($_COOKIE["login"])){
            header("Location: /dashboard.php");
            exit();
        }
    ?>

<!doctype html>

<!--
This is a minified version of the ThemeForest-Theme "Grape - Professional & Flexible Admin Template".
Author: Simon Stamm (Stammi)

Note: If you buy my theme on ThemeForest, you will receive the non-minified and commented/documentated version!
This is a minified version of my theme to prevent stealing.
-->

<!--[if lt IE 7]><html class="no-js ie6 oldie" lang=en><![endif]-->
<!--[if IE 7]><html class="no-js ie7 oldie" lang=en><![endif]-->
<!--[if IE 8]><html class="no-js ie8 oldie" lang=en><![endif]-->
<!--[if gt IE 8]><!-->
<html class=no-js lang=en>
<!--<![endif]-->

<head>
    <meta charset=utf-8>
    <link rel=dns-prefetch href="//fonts.googleapis.com">
    <meta http-equiv=X-UA-Compatible content="IE=edge,chrome=1">
    <title>Login :: Grape - Professional &amp; Flexible Admin Template</title>
    <link href="favicon.ico" rel="shortcut icon" />
    <meta name=description content="">
    <meta name=author content="">
    <meta name=viewport content="width=device-width,initial-scale=1">
    <link rel=stylesheet href='css/c11f8f1b6c157a7a1ee04039d038c282336416b9.css'>
    <link href="//fonts.googleapis.com/css?family=PT+Sans" rel=stylesheet type="text/css">
    <script src="js/libs/modernizr-2.0.6.min.js"></script>
</head>

<body class=special-page>
    <div id=container>
        <section id=login-box>
            <div class=block-border>
                <div class=block-header>
                    <h1>Login</h1>
                </div>
                <form id=login-form class="block-content form" action="thelogin.php" method=post>
                    <p class=inline-small-label> <label for=username>Username</label> <input type=text name=username value="" class=required> </p>
                    <p class=inline-small-label> <label for=password>Password</label> <input type=password name=password value="" class=required> </p>
                    <p> <label><input type=checkbox name=keep_logged /> Auto-login in future.</label> </p>
                    <div class=clear></div>
                    <div class=block-actions>
                        <ul class=actions-left>
                            <li><a class=button name=recover_password href="javascript:void(0);">Recover Password</a></li>
                            <li class=divider-vertical></li>
                            <li><a class="button red" id=reset-login href="javascript:void(0);">Cancel</a></li>
                        </ul>
                        <ul class=actions-right>
                            <li><input type=submit class=button value=Login></li>
                        </ul>
                    </div>
                </form>
            </div>
        </section>
    </div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
    <script>
        window.jQuery || document.write('<script src="js/libs/jquery-1.6.2.min.js"><\/script>');
    </script>
    <script defer src='js/8f71c247c4dadc837fe569208a7a1dc0f7625c46.js'></script>
    <!--[if lt IE 7 ]><script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script> <script>window.attachEvent("onload",function(){CFInstall.check({mode:"overlay"})});</script><![endif]-->
</body>

</html>