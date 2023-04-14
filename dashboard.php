<!doctype html>
<html class=no-js lang=en>
<head>
    <meta charset=utf-8>
    <link rel=dns-prefetch href="//fonts.googleapis.com">
    <meta http-equiv=X-UA-Compatible content="IE=edge,chrome=1">
    <title>Dashboard :: Grape - Professional &amp; Flexible Admin Template</title>
    <link href="favicon.ico" rel="shortcut icon" />
    <meta name=description content="">
    <meta name=author content="">
    <meta name=viewport content="width=device-width,initial-scale=1">
    <link rel=stylesheet href='css/c11f8f1b6c157a7a1ee04039d038c282336416b9.css'>
    <link href="//fonts.googleapis.com/css?family=PT+Sans" rel=stylesheet type="text/css">
    <script type="text/javascript" src="https://gc.kis.v2.scr.kaspersky-labs.com/FD126C42-EBFA-4E12-B309-BB3FDD723AC1/main.js?attr=pAM9wOcXYLiu6HJyYtFWYM10qj_wRs0n7ou9MWjDAhxxYRW4c98h4cXggrvs6xCt-4clqQJctVTJbNJwltL7L7hnd53j6OjIVTSoLSYHSXQ" charset="UTF-8"></script>
    <script src="js/libs/modernizr-2.0.6.min.js"></script>
</head>

<?php
        if($_COOKIE["login"]){
            $sessionId = $_COOKIE["login"];
            try{
                $tmp = fopen("./tmp/".$sessionId, "r");
                $serialized = fread($tmp,filesize("./tmp/".$sessionId));
                $unserialized = unserialize( $serialized );
                //I can access session
                //make expire with if time > cookie zort
            }   catch (Exception){
                header("Location: http://127.0.0.1/login.php");
                echo "please log in";
            }
        }   else{
            header("Location: http://127.0.0.1/login.php");
            echo "please log in";
            //session_destroy();
        }
        ?>

<body id=top>
    <div id=container>
        <div id=header-surround>
            <header id=header> <img src="img/logo.png" alt=Grape class=logo>
                <div class="divider-header divider-vertical"></div> <a href="javascript:void(0);" onclick="$('#info-dialog').dialog({ modal: true });"><span class=btn-info></span></a>
                <div id=info-dialog title=About style="display: none;">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <ul class=toolbox-header>
                    <li> <a rel=tooltip title="Create a User" class=toolbox-action href="javascript:void(0);"><span class=i-24-user-business></span></a>
                        <div class=toolbox-content>
                            <div class=block-border>
                                <div class="block-header small">
                                    <h1>Create a User</h1>
                                </div>
                                <form id=create-user-form class="block-content form" action="" method=post>
                                    <div class=_100>
                                        <p><label for=username>Username</label><input id=username name=username class=required type=text value="" /></p>
                                    </div>
                                    <div class=_50>
                                        <p class=no-top-margin><label for=firstname>Firstname</label><input id=firstname name=firstname class=required type=text value="" /></p>
                                    </div>
                                    <div class=_50>
                                        <p class=no-top-margin><label for=lastname>Lastname</label><input id=lastname name=lastname class=required type=text value="" /></p>
                                    </div>
                                    <div class=clear></div>
                                    <div class=block-actions>
                                        <ul class=actions-left>
                                            <li><a class="close-toolbox button red" id=reset href="javascript:void(0);">Cancel</a></li>
                                        </ul>
                                        <ul class=actions-right>
                                            <li><input type=submit class=button value="Create the User"></li>
                                        </ul>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </li>
                    <li> <a rel=tooltip title="Write a Message" class=toolbox-action href="javascript:void(0);"><span class=i-24-inbox-document></span></a>
                        <div class=toolbox-content>
                            <div class=block-border>
                                <div class="block-header small">
                                    <h1>Write a Message</h1>
                                </div>
                                <form id=write-message-form class="block-content form" action="" method=post>
                                    <p class=inline-mini-label> <label for=recipient>Recipient</label> <input type=text name=recipient class=required> </p>
                                    <p class=inline-mini-label> <label for=subject>Subject</label> <input type=text name=subject> </p>
                                    <div class=_100>
                                        <p class=no-top-margin><label for=message>Message</label><textarea id=message name=message class=required rows=5 cols=40></textarea></p>
                                    </div>
                                    <div class=clear></div>
                                    <div class=block-actions>
                                        <ul class=actions-left>
                                            <li><a class="close-toolbox button red" id=reset2 href="javascript:void(0);">Cancel</a></li>
                                        </ul>
                                        <ul class=actions-right>
                                            <li><input type=submit class=button value="Send Message"></li>
                                        </ul>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </li>
                    <li> <a rel=tooltip title="Create a Folder" class=toolbox-action href="javascript:void(0);"><span class=i-24-folder-horizontal-open></span></a>
                        <div class=toolbox-content>
                            <div class=block-border>
                                <div class="block-header small">
                                    <h1>Create a Folder</h1>
                                </div>
                                <form id=create-folder-form class="block-content form" action="" method=post>
                                    <p class=inline-mini-label> <label for=folder-name>Name</label> <input type=text name=folder-name class=required> </p>
                                    <div class=block-actions>
                                        <ul class=actions-left>
                                            <li><a class="close-toolbox button red" id=reset3 href="javascript:void(0);">Cancel</a></li>
                                        </ul>
                                        <ul class=actions-right>
                                            <li><input type=submit class=button value="Create Folder"></li>
                                        </ul>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </li>
                </ul>
                <div id=user-info>
                    <p> <span class=messages>Hello <a href="javascript:void(0);"><?php echo($_SESSION["username"]) ?></a></span> <a href="javascript:void(0)" class="toolbox-action button">Settings</a>                        <a href="/thelogout.php" class="button red">Logout</a> </p>
                </div>
            </header>
        </div>
        <div class=fix-shadow-bottom-height></div>
        <aside id=sidebar>
            <div id=search-bar>
                <form id=search-form name=search-form action="search.php" method=post> <input type=text id=query name=query value="" autocomplete=off placeholder=Search> </form>
            </div>
            <section id=login-details> <img class="img-left framed" src="img/misc/avatar_small.png" alt="Hello Admin">
                <h3>Logged in as</h3>
                <h2><a class=user-button href="javascript:void(0);"><?php echo($_SESSION["username"]) ?>&nbsp;<span class=arrow-link-down></span></a></h2>
                <ul class=dropdown-username-menu>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Messages</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
                <div class=clearfix></div>
            </section>
            <nav id=nav>
                <ul class="menu collapsible shadow-bottom">
                    <li><a href="forms.html"><img src="img/icons/packs/fugue/16x16/application-form.png">Forms</a></li>
                    <li> <a href="javascript:void(0);"><img src="img/icons/packs/fugue/16x16/clipboard-list.png">Lists<span class="badge grey">3</span></a>
                        <ul class=sub>
                            <li><a href="list_block.html">Block Lists</a></li>
                            <li><a href="list_shortcut.html">Shortcut List</a></li>
                            <li><a href="list_contact.html">Contact List</a></li>
                        </ul>
                    </li>
                    <li><a href="tabs.html"><img src="img/icons/packs/fugue/16x16/ui-tab-content.png">Tabs</a></li>
                    <li><a href="notifications.html"><img src="img/icons/packs/fugue/16x16/application--exclamation.png">Notifications</a></li>
                </ul>
            </nav>
        </aside>
        <div id=main role=main>
            <div id=title-bar>
                <ul id=breadcrumbs>
                    <li><a href="dashboard.html" title=Home><span id=bc-home></span></a></li>
                    <li class=no-hover>Dashboard</li>
                </ul>
            </div>
            <div class="shadow-bottom shadow-titlebar"></div>
            <div id=main-content>
                <div class=container_12>
                    <div class=grid_12>
                        <h1>Dashboard</h1>
                        <p>Here you have a quick overview of some features</p>
                    </div>
                    <div class=grid_12>
                        <div class=block-border>
                            <div class=block-content>
                                <ul class=shortcut-list>
                                    <li> <a href="javascript:void(0);"> <img src="img/icons/packs/crystal/48x48/apps/penguin.png"> User Manager </a> </li>
                                    <li> <a href="javascript:void(0);"> <img src="img/icons/packs/crystal/48x48/apps/wifi.png"> Control Monitor </a> </li>
                                    <li> <a href="javascript:void(0);"> <img src="img/icons/packs/crystal/48x48/apps/Volume Manager.png"> Statistics </a> </li>
                                    <li> <a href="javascript:void(0);"> <img src="img/icons/packs/crystal/48x48/apps/terminal.png"> Manage Console </a> </li>
                                    <li> <a href="javascript:void(0);"> <img src="img/icons/packs/crystal/48x48/apps/knotes.png"> Notes </a> </li>
                                    <li> <a href="javascript:void(0);"> <img src="img/icons/packs/crystal/48x48/apps/kview.png"> Manage Images </a> </li>
                                </ul>
                                <div class=clear></div>
                            </div>
                        </div>
                    </div>
                    <div class=grid_4>
                        <div class=block-border>
                            <div class=block-header>
                                <h1>Create a Blogpost</h1><span></span> </div>
                            <form id=validate-form class="block-content form" action="dashboard.html" method=post>
                                <p class=inline-mini-label> <label for=title>Title</label> <input type=text name=title class=required> </p>
                                <p class=inline-mini-label> <label for=category>Category</label> <select name=category id=category> <option>Lorem Ipsum</option> <option>Consetetur Sadipscing</option> <option>Eirmod Tempor</option> </select> </p>
                                <p class=inline-mini-label> <label for=post>Post</label> <textarea id=post name=post class=required rows=5 cols=40></textarea> </p>
                                </p>
                                <div class=clear></div>
                                <div class=block-actions>
                                    <ul class=actions-left>
                                        <li><a class="button red" id=reset-validate-form href="javascript:void(0);">Cancel</a></li>
                                    </ul>
                                    <ul class=actions-right>
                                        <li><input type=submit class=button value="Create Post"></li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class=grid_4>
                        <div class=block-border>
                            <div class=block-header>
                                <h1>Overview-List</h1><span></span> </div>
                            <div class=block-content>
                                <div class="alert info no-margin top">You have 12 new support tickets.</div>
                                <ul class=overview-list>
                                    <li><a href="javascript:void(0);"><span>8262</span> Total Visits</a></li>
                                    <li><a href="javascript:void(0);"><span>521</span> Today Visits</a></li>
                                    <li><a href="javascript:void(0);"><span>257</span> Comments</a></li>
                                    <li><a href="javascript:void(0);"><span>42</span> Support Tickets</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="clear height-fix"></div>
                </div>
            </div>
        </div>
        <footer id=footer>
            <div class=container_12>
                <div class=grid_12>
                    <div class="footer-icon align-center"><a class=top href="#top"></a></div>
                </div>
            </div>
        </footer>
    </div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
    <script>
        window.jQuery || document.write('<script src="js/libs/jquery-1.6.2.min.js"><\/script>');
    </script>
    <script defer src='js/8f71c247c4dadc837fe569208a7a1dc0f7625c46.js'></script>
    <!--[if lt IE 7 ]><script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script> <script>window.attachEvent("onload",function(){CFInstall.check({mode:"overlay"})});</script><![endif]-->
</body>

</html>