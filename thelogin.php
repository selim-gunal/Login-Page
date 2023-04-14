<?php   
        //expire time with $_session["expire"]
        //https://www.geeksforgeeks.org/how-to-destroy-session-after-some-time-in-php/
        $shouldRun = false;
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $shouldRun = true;
        }   else{
            header("HTTP/1.1 405 Method Not Allowed");
            echo "method not allowed";
            $shouldRun = false;
            //if not working delete this line
            exit();
        }

        if (isset($_COOKIE["login"])){
            header("Location: /dashboard.php");
            exit();
        }

        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ZAMANA BAGLI COOKIE EXPIRE
        if (isset($_POST["password"]) && isset($_POST["username"]) && $shouldRun){
            $username = $_POST["username"];
            $password = $_POST["password"];
            require_once("connection.php");

            //sql query
            try{
                $conn = new mysqli($SERVER.":".$PORT, $USERNAME, $PASSWORD, $DATABASE); 
            }   catch(Exception){
                echo "connecton error!";
                header("HTTP/1.1 500 Internal Server Error");
                die();
            }

            $query = "SELECT * FROM $TABLE WHERE username = ? LIMIT 1";
            $statement = $conn->prepare($query);
            $statement->bind_param("s" ,$username);
            $statement->execute();
            $result = $statement->get_result();
            while ($row = $result->fetch_assoc()) {
                $fetchedResult = $row;
            }

            #SQL database
            //connection buraya yazilacak
            if($password == $fetchedResult["password"]){

                $uniqueValue = hash('sha256', uniqid(rand(), true));
                setcookie("login", $uniqueValue, time() + 3600, "/" ,"" ,true);
                $tmp = fopen("./tmp/".$uniqueValue, "w") or die("Unable to open file!");
                $sessionData = [];
                $sessionData["username"] = $username;
                $sessionData["isLogged"] = true;
                $sessionData["expire"] = time() + 3600;
                $serializedData = serialize($sessionData);
                fwrite($tmp, $serializedData);
                fclose($tmp);

                header("Location: http://127.0.0.1/dashboard.php");
            }   else{
                header("HTTP/1.1 401 Unauthorized");
                header("Location: login.php");
            }
        }   else{
            header("HTTP/1.1 401 Unauthorized");
            header("Location: login.php");
        }
    ?>
