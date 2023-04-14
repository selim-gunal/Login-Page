<?php

    session_start();
    if($_SESSION["isLogged"] == "true"){
        ?>zort<?php
    }

    else{
        ?>not logged!!<?php
        header("HTTP/1.1 401 Unauthorized");
        header("Location: /login.html");
        session_destroy();
    }
    ?>