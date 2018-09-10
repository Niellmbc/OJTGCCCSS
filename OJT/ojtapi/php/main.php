<?php
require "codes.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$operation = explode ("/",rtrim($_REQUEST["req"],"/"));
$conn = new dbConn;



switch($_SERVER["REQUEST_METHOD"]){
    case "GET": 

 

    	if($operation[0] == "select" && count($operation) == 2){
    		$conn->select("*")->from($operation[1]);
    	} elseif (count($operation) == 4 && $operation[0] == "select"){
    		$conn->select("*")->from($operation[1])->where($operation[2], $operation[3]);    		
    	} elseif($operation[0] == "join"){
            $conn->join($operation[1], $operation[2], $operation[3], $operation[4]);
        } else {
    		$conn->runQuery();
    	}

    	if(isset($_GET['GROUPBY'])){
    		$conn->groupby($_GET['GROUPBY']);
     	}

    	if(isset($_GET['ORDERBY'])){
            $pieces = explode(" ", $_GET['ORDERBY']);
            $colname = $pieces[0];
            $pos = $pieces[1];            
    		$conn->orderby($colname, $pos);
    	}
    	if(isset($_GET['LIMIT'])){
    		$conn->limit($_GET['LIMIT']);
    	}

        if(isset($_GET['OFFSET'])){
            $conn->offset($_GET['OFFSET']);
        }





    	$conn->runQuery();


    case "POST":
        if($operation[0] == "insert"){
            $conn->insert($operation[1]);
        }
        if($operation[0] == "insertnpk"){
            $conn->insertNPK($operation[1]);
        }

        if($operation[0] == "login"){
            $un = $_POST['un'];
            $pw = $_POST['pw'];
            $conn->login($un, $pw);
        }


    case "PUT":
        if($operation[0] == "update"){
            $conn->update($operation[1], $operation[2], $operation[3]);
        }
        if($operation[0] == "updatenw"){
            $conn->updatenw($operation[1]);
        }        

    case "DELETE":
        if($operation[0] == "delete"){
            $conn->delete($operation[1], $operation[2], $operation[3]);
        }        
        
}
?>