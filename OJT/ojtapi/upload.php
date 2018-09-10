<?php 	
header('Access-Control-Allow-Origin: *');
$content = file_get_contents('php://input');
$lines = explode("\n", $content);
$db = mysqli_connect("localhost", "root", "", "db_ojt");
$xccode = $_GET['ccode'];
foreach($lines as $line){
    $csv_row = str_getcsv($line);
    //save data into database
	$longString = "";
    //----
    $counter = 0;
    foreach($csv_row as $lne){
    	if($counter == 0){
    		$myArray = explode(',', $lne);
    		$longString .= "'" .$myArray[1] . "', " . "'" .$myArray[0] . "'";
			$longString .= ", ";
			if(isset($myArray[2])){
	    		$longString .= "'" .$myArray[2] . "'";
				$longString .= ", ";				
			} else {
	    		$longString .= "' '";
				$longString .= ", ";					
			}
    	} else {
	    	$longString .= "'" .$lne . "'";
	 		$longString .= ", ";
 		}
 		$counter++;
    }
    $sql = "INSERT INTO tbl_students(fldFname, fldLname, fldMname, fldStudentID, fldCourse, fldClassCode, fldPassword, fldStatus) VALUES ($longString '$xccode', '12341234', 'Pending')";
    echo $sql;

    $db->query($sql);
}
echo $longString;
?>