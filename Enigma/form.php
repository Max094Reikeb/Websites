<?php

if(isset($_POST['valider'])){
    $code=$_POST['email'];
    if("42" == $code ) {
        echo "<script>function eventT();</script>";
    } else {
        echo "<script>function eventF();</script>";
    }
}

?>