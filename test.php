<?php
    $SERVER = "127.0.0.1";
    $USERNAME = "root";
    $PASSWORD = "root";
    $DATABASE = "users";

    $connection = new mysqli($SERVER ,$USERNAME ,$PASSWORD ,$DATABASE);

    $user = "admin";
    $querystr = "SELECT * FROM users WHERE username = ? LIMIT 1;";
    $query = $connection->prepare($querystr);
    $query->bind_param("s" ,$user);
    $query->execute();

    $result = $query->get_result();
    $row = $result->fetch_assoc();

    print_r($row);
?>