<!--  gerekli degil  -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>panel</title>
</head>
<body>
    <?php
        //must be 1
        ini_set("session.use_cookies", "1");
        //change sesssion cookie
        session_start();
        if(@$_SESSION["isLogged"] == true){
            echo "logged in as " . $_SESSION["username"];
        }   else{
            header("Location: http://127.0.0.1/welcome.html");
            echo "please log in";
            session_destroy();
        }
        ?>    
</body>
</html>