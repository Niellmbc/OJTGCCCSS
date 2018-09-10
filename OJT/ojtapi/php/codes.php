<?php

class dbConn{
	private $sql;
	private $db;


    //DB
	public function __construct(){
		$this->db = mysqli_connect("localhost", "root", "", "db_ojt");
	}

    //CREATE
    function insert($table){
        $data = json_decode(file_get_contents("php://input"));
        print_r($data);
        $finaldata = "";
        foreach($data as $key => $value){
            if($key != 0){
                $finaldata .= ", ";
            }
            $finaldata .= "(NULL";
                foreach($data[$key] as $skey => $svalue){
                    $finaldata .= ", '" . $svalue . "'";
                }
            $finaldata .= ")";
        }
        $this->sql = "INSERT INTO $table VALUES $finaldata";
        if($this->db->query($this->sql)){
            
        }
    }

    function insertNPK($table){
        $data = json_decode(file_get_contents("php://input"));
        print_r($data); 
        $finaldata = "";
        $myCount = 0;
        foreach($data as $key => $value){
            $myCount = 0;
            if($key != 0){
                $finaldata .= ", ";
            }
            $finaldata .= "(";
                foreach($data[$key] as $skey => $svalue){
                    if($myCount == 0){
                        $finaldata .= "'" . $svalue . "'";
                        $myCount += 1;
                    } else {
                        $finaldata .= ", '" . $svalue . "'";
                    }
                }
            $finaldata .= ")";
        }
        $this->sql = "INSERT INTO $table VALUES $finaldata";
        if($this->db->query($this->sql)){
            
        }
    }
    

    //READ
	public function select($fields){
		$this->sql = "SELECT $fields";
		return $this;
	}

	public function from($tblname){
		$this->sql .= " FROM $tblname";
		return $this;
	}

	public function where($fldname, $id){
		$this->sql .= " WHERE $fldname = '$id'";
		return $this;
	}

	public function orderby($colname, $order="ASC"){
        $this->sql .= " ORDER BY $colname $order";
        return $this;
    }

    public function groupby($fldname){
    	$this->sql .= " GROUP BY $fldname";
    }

    public function offset($mval){
        $this->sql .= " OFFSET $mval";
        return $this;
    }


    public function limit($no){
    	$this->sql .= " LIMIT $no";
    	return $this;
    }


    public function join($tbl_one, $id_one, $tbl_two, $id_two){
    	$this->sql = "SELECT * FROM $tbl_one, $tbl_two WHERE $tbl_one.$id_one = $tbl_two.$id_two";
    	return $this;
    }

    public function runQuery(){
    	$info = array();
    	if($result = $this->db->query($this->sql)){
    		while($rows = $result->fetch_assoc()){
                $rows = array_map('utf8_encode', $rows);    			
    			array_push($info, $rows);
    		}
    	} else {
    		header('HTTP:/1.0 404 Not Found');
    		$info = array("Status" => 404, "message"=> "No data found");
    	}
    	echo json_encode($info);

    }

    //UPDATE
    public function update($table, $fld, $id){
        $mykey = "";
        $myval = "";
        $finaldata = "";
        $myCount = 0;
        $data = json_decode(file_get_contents("php://input"));
        foreach($data as $key => $value){
                $myCount = 0;
            foreach($data[$key] as $skey => $svalue){
                $mykey =  $skey;
                $myval =  $svalue;
                if($myCount == 0){
                    $finaldata .= "$skey = '$svalue'";
                    $myCount += 1;
                }else {
                    $finaldata .= ", $skey = '$svalue'";
                }
            }
        }

        if(isset($fld)){
	        if(is_int($id)){
	            $this->sql = "UPDATE $table set $finaldata WHERE $fld = $id";
	        } else {
	            $this->sql = "UPDATE $table set $finaldata WHERE $fld = '$id'";            
	        }
	    } else {
	    	$this->sql = "UPDATE $table set $finaldata";
	    }
        echo $this->sql;
        if($this->db->query($this->sql)){
            echo "it works";
        }
    }

    public function updatenw($table){
        $mykey = "";
        $myval = "";
        $finaldata = "";
        $myCount = 0;
        $data = json_decode(file_get_contents("php://input"));
        foreach($data as $key => $value){
                $myCount = 0;
            foreach($data[$key] as $skey => $svalue){
                $mykey =  $skey;
                $myval =  $svalue;
                if($myCount == 0){
                    $finaldata .= "$skey = '$svalue'";
                    $myCount += 1;
                }else {
                    $finaldata .= ", $skey = '$svalue'";
                }
            }
        }
        echo $finaldata;
        $this->sql = "UPDATE $table set $finaldata";
        if($this->db->query($this->sql)){
            echo "it works";
        }
    }    

    //DELETE

    public function delete($table, $fld, $id){
        $this->sql = "DELETE FROM $table WHERE $fld = $id";
        if($this->db->query($this->sql)){
            echo "it works";
        }        
    }


    // LOGIN AND SIGN UP


/*    function login($un, $pw){
        $db = mysqli_connect("localhost", "root", '', "db_arnie");
        $sql = "SELECT * FROM tbl_reserveuser WHERE fldUsername = '$un' AND fldPassword = '$pw'";
        $result = $db->query($sql);
        $count = mysqli_num_rows($result);
        $data = array();
        if($count > 0){
            $rows = mysqli_fetch_assoc($result);
            $data = array("Authorize" => "True", "fldUserID" => $rows['fldUserID'], "fldRole" => $rows['fldRole']);
        } else {
            $data = array("Authorize" => "False");
        }

        echo json_encode($data);
    }*/

    function login($un, $pw){
        $db = mysqli_connect("localhost", "root", '', "db_ojt");
        $sql = "SELECT * FROM tbl_user WHERE fldUsername = '$un' AND fldPassword = '$pw'";
        $result = $db->query($sql);
        $count = mysqli_num_rows($result);


        $sql_two = "SELECT * FROM tbl_companies WHERE fldEmail = '$un' AND fldPassword = '$pw'";
        $result_two = $db->query($sql_two);
        $count_two = mysqli_num_rows($result_two);


        $data = array();
        if($count > 0){
            $rows = mysqli_fetch_assoc($result);
            $data = array("Authorize" => "User", "fldUserID" => $rows['fldUserID'], "fldRole" => $rows['fldRole'], "fldCompanyID" => $rows['fldCompanyID'], "fldDept" => $rows['fldDepartment']);
        } elseif($count_two){

            $rows = mysqli_fetch_assoc($result_two);
            $data = array("Authorize" => "Company", "fldCompanyID" => $rows['fldCompanyID']);

        } else {
            $data = array("Authorize" => "False");
        }

        echo json_encode($data);
    }    

}

class blowFishEncryption{
    public function __construct(){
        
    }
    public function generate_salt($length){
        $unique_random_string = md5(uniqid(mt_rand(), true));
        $base64_string = base64_encode($unique_random_string);
        $mod_base64_string = str_replace("+", ".", $base64_string);
        $salt = substr($mod_base64_string,0,$length);
        return $salt;
    }   
    public function encryptPass($password){
        $hash_format = "$2y$10$";
        $salt_length = 22;
        $salt = $this->generate_salt($salt_length);
        $format_and_salt = $hash_format.$salt;
        $hash = crypt($password, $format_and_salt);
        return $hash;
    }
    public function password_check($password, $existing_hash){
        $new_hash = crypt($password, $existing_hash);
        if($new_hash == $existing_hash){
            return true;
        }
        return false;
    } 
}

?>