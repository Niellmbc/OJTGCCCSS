let myurl ="http://gordoncollegeccs-ssite.net";
let compID = localStorage.companyID;
$.ajaxSetup({
	async: false
});

let arr = [];

function data(){
	$.getJSON(myurl +"/ojtapi/tbl_pendings",function(data){
		arr = data;
	});
}
data();

function compareData(companyID,stdID){
	for (let i = 0; i < arr.length; i++) {
		if(arr[i].fldCompanyID == companyID && arr[i].fldStudentID == stdID){
			return arr[i].fldTransactionID;
		}

	}
	return false;

}


const viewStud = (id) =>{	
	localStorage.id = id;
	window.location.assign('viewapplicant.html');
}

const viewApplicant = () =>{
	let id = localStorage.id;
	fetch(myurl+"/ojtapi/tbl_students/fldStudentID/"+id).then((res)=>res.json()).then(function(data){
		document.getElementById('picpath').setAttribute('src',data[0].fldImage);
		document.getElementById('myname').innerHTML = data[0].fldFname+' '+data[0].fldMname+' '+data[0].fldLname;
		document.getElementById('resume').innerHTML = "<embed src='"+data[0].fldResume+"' width='800' height='800'>";
	});
}
const viewCompanyPro = () =>{
	
	fetch(myurl+"/ojtapi/tbl_companies/fldCompanyID/"+localStorage.companyID).then((res)=>res.json()).then(function(data){
		// localStorage.compId=data[0].fldCompanyID;
		document.getElementById('companyName').innerHTML = data[0].fldCompanyName;
		document.getElementById('compEmail').value = data[0].fldEmailAddress;
		document.getElementById('compAdd').value = data[0].fldCompanyAddress;
		document.getElementById('compContact').value = data[0].fldContactNo;
		document.getElementById('compTel').value = data[0].fldTelNo;
		document.getElementById('companylogo').setAttribute('src',data[0].fldCompanyImg);
	});
}
const CompanyHire = (studsid) =>{
	localStorage.studsid = studsid;
	let studid = localStorage.studsid;
	
	let hireDet = {
		CompanyId: localStorage.companyID,
		StudentId: studid,
		Remarks: "Selected by Company"
	}
	fetch(myurl+"/ojtapi/insert/tbl_pendings",{
		method:"POST",
		body:JSON.stringify([hireDet])
	}).then(function(data){
		toastr.success('You have sent a invitation successfully');
		window.location.assign('company.html');
	});
}

const compSelectStudList = () =>{
	let studid = localStorage.studsid;
	fetch(myurl+"/ojtapi/tbl_pendings/fldStudentID/tbl_students/fldStudentID?select=tbl_pendings.fldCompanyID, tbl_pendings.fldRemarks, tbl_students.fldStudentID, tbl_students.fldLname, tbl_students.fldFname, tbl_students.fldMname, tbl_students.fldCourse").then((res)=>res.json()).then(function(data){
		console.log(data);
		let longstring1 = "";
		let longstring2 = "";
		let longstring3="";
		for(let i=0;i<data.length;i++){
			if(localStorage.companyID == data[i].fldCompanyID && data[i].fldRemarks=='Selected by Company'){
				longstring1 +="<tr>";
				longstring1 +="<th scope='row'>"+data[i].fldStudentID+"</th>";
				longstring1 +="<td>"+data[i].fldLname+', '+data[i].fldFname+', '+data[i].fldMname+"</td>";
				longstring1 +="<td>"+data[i].fldCourse+"</td>";
				longstring1 +="<td>"+data[i].fldRemarks+"</td>";
				longstring1 +="<td><a class='btn-floating btn-primary' onclick='viewStud("+data[i].fldStudentID+")'><i class='fa fa-eye'></i></a> <a class='btn-floating btn-danger' onclick='cancelInvites("+compareData(localStorage.companyID,data[i].fldStudentID)+")'><i class='fa fa-times'></i></a></td>";
				longstring1 +="</tr>";
			}
			else if(localStorage.companyID == data[i].fldCompanyID && data[i].fldRemarks=='Requested by Student'){
				longstring2 +="<tr>";
				longstring2 +="<th scope='row'>"+data[i].fldStudentID+"</th>";
				longstring2 +="<td>"+data[i].fldLname+', '+data[i].fldFname+', '+data[i].fldMname+"</td>";
				longstring2 +="<td>"+data[i].fldCourse+"</td>";
				longstring2 +="<td>"+data[i].fldRemarks+"</td>";
				longstring2 +="<td><a class='btn-floating btn-primary' onclick='viewStud("+data[i].fldStudentID+")'><i class='fa fa-eye'></i></a><a class='btn-floating btn-success' onclick='ApproveRequest("+data[i].fldStudentID+")'><i class='fa fa-check'></i></a> <a class='btn-floating btn-danger' onclick='cancelInvites("+compareData(localStorage.companyID,data[i].fldStudentID)+")'><i class='fa fa-times'></i></a></td>";
				longstring2 +="</tr>";
			} else if(localStorage.companyID == data[i].fldCompanyID && data[i].fldRemarks=='For Interview'){
				longstring3 +="<tr>";
				longstring3 +="<th scope='row'>"+data[i].fldStudentID+"</th>";
				longstring3 +="<td>"+data[i].fldLname+', '+data[i].fldFname+', '+data[i].fldMname+"</td>";
				longstring3 +="<td>"+data[i].fldCourse+"</td>";
				longstring3 +="<td>"+data[i].fldRemarks+"</td>";
				longstring3 +="<td><a class='btn-floating btn-primary' onclick='viewStud("+data[i].fldStudentID+")'><i class='fa fa-eye'></i></a><a class='btn-floating btn-success' onclick='InterviewApp("+data[i].fldStudentID+")'><i class='fa fa-check'></i></a> <a class='btn-floating btn-danger' onclick='cancelInvites("+compareData(localStorage.companyID,data[i].fldStudentID)+")'><i class='fa fa-times'></i></a></td>";
				longstring3 +="</tr>";
			} 
		}
		$('#compSelect').html(longstring1);
		$('#studApply').html(longstring2);	
		$('#interview').html(longstring3);

	});
}
const ApproveRequest = (studentID) =>{
	let hireDet = {
		CompanyId: localStorage.companyID,
		StudentId: studentID,
		Remarks: "For Interview"
	}
	let approve = {
		fldStatus : "Interview"
	}
	fetch(myurl+"/ojtapi/delete/tbl_pendings/fldStudentID/"+studentID,{
		method:"POST"
	}).then(function(data){
		fetch(myurl+ "/ojtapi/insert/tbl_pendings",{
			method:"POST",
			body:JSON.stringify([hireDet])
		}).then(function(data){
			toastr.success('You have successfully sent an Invitation');
		});
	});
	
	fetch(myurl+"/ojtapi/update/tbl_students/fldStudentID/"+studentID,{
		method:"POST",
		body:JSON.stringify([approve])
	});
}
const InterviewApp = (studentID) =>{
	let hireDet = {
		CompanyId: localStorage.companyID,
		StudentId: studentID,
		Remarks: "Approved by Company"
	}
	let approve = {
		fldStatus : "Hired"
	}
	fetch(myurl+"/ojtapi/delete/tbl_pendings/fldStudentID/"+studentID,{
		method:"POST"
	}).then(function(data){
		fetch(myurl+ "/ojtapi/insert/tbl_pendings",{
			method:"POST",
			body:JSON.stringify([hireDet])
		}).then(function(data){
			toastr.success('You have successfully sent an Invitation');
		});
	});
	
	fetch(myurl+"/ojtapi/update/tbl_students/fldStudentID/"+studentID,{
		method:"POST",
		body:JSON.stringify([approve])
	});
}


const HiredApplicantByView = () =>{
	let longstring = "";
	let studid = localStorage.id;
	let invitationStatus = localStorage.InvitationStatus;
	if(compareData(localStorage.companyID,studid)){
		longstring +="<button class='btn btn-outline-danger' onclick='cancelInvitation("+compareData(localStorage.companyID,studid)+")'><i class='fa fa-times mr-1'></i>Cancel Invitation</button>";
	}else{
		longstring +="<button class='btn btn-outline-success' onclick='CompanyHire("+studid+")'><i class='fa fa-check mr-1'></i>Send Invitation</button>";
	}
	$('#buts').html(longstring);
} 
const cancelInvitation = (transactionID) =>{
	fetch(myurl +"/ojtapi/delete/tbl_pendings/fldTransactionID/"+transactionID,{
		method:"POST"
	}).then(function(data){
		toastr.info('You have canceled the Invitation Sent');
		window.location.assign('company.html');
	});
}
const cancelInvites = (transactionID) =>{
	fetch(myurl +"/ojtapi/delete/tbl_pendings/fldTransactionID/"+transactionID,{
		method:"POST"
	}).then(function(data){
		toastr.info('You have canceled the Invitation Sent');
		window.location.assign('applicantlist.html');
	});
}

const searchStud = (val) => {
	fetch(myurl+"/ojtapi/tbl_students/fldCourse/"+val+"?select=fldFname, fldLname, fldMname, fldStatus, fldStudentID").then((res)=>res.json()).then(function(data){
		let longstring = "";
		for(let i =0; i < data.length;i++){
			if(data[i].fldStatus=='Available'){
				
				longstring +="<div class='col-md-4'>";
				longstring +="<div class='card testimonial-card'>";
				longstring +="<div class='card-up orange lighten-1'>";
				longstring +="</div>";
				longstring +="<div class='avatar mx-auto white'><img src="+data[i].fldImage+" class='rounded-circle'></div>";
				longstring += "<div class='card-body'>";
				longstring +="<h4 class='card-title'>"+data[i].fldFname+' '+data[i].fldMname+' '+data[i].fldLname+"</h4>";
				longstring +="<hr>";
				longstring +=" <p><i class='fa fa-quote-left'></i> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci</p>";
				longstring +="<button class='btn btn-outline-primary' onclick='viewStud("+data[i].fldStudentID+")'><i class='fa fa-eye mr-2'>View</i></button>";
				if(compareData(localStorage.companyID,data[i].fldStudentID)){
					longstring +="<button class='btn btn-outline-danger' onclick='cancelInvitation("+compareData(localStorage.companyID,data[i].fldStudentID)+")'><i class='fa fa-times mr-1'></i>Cancel</button>";
				}else{
					longstring +="<button class='btn btn-outline-success' onclick='CompanyHire("+data[i].fldStudentID+")'><i class='fa fa-check mr-1'></i>Send Invitation</button>";
				}
				longstring +="</div>";
				longstring +="</div>";
				longstring +="<br>";
				longstring +="</div>";
			}
		}
		$('#stuAvail').html(longstring);
	});
}
const findStud = () => {
	let findme = document.getElementById('findme').value;
	fetch(myurl+"/ojtapi/tbl_students?LIKE=fldLname "+findme).then((res)=>res.json()).then(function(data){
		let longstring = "";
		for(let i =0; i < data.length;i++){
			longstring +="<div class='col-md-4'>";
			longstring +="<div class='card testimonial-card'>";
			longstring +="<div class='card-up orange lighten-1'>";
			longstring +="</div>";
			longstring +="<div class='avatar mx-auto white'><img src="+data[i].fldImage+" class='rounded-circle'></div>";
			longstring += "<div class='card-body'>";
			longstring +="<h4 class='card-title'>"+data[i].fldFname+' '+data[i].fldMname+' '+data[i].fldLname+"</h4>";
			longstring +="<hr>";
			longstring +=" <p><i class='fa fa-quote-left'></i> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci</p>";
			longstring +="<button class='btn btn-outline-primary' onclick='viewStud("+data[i].fldStudentID+")'><i class='fa fa-eye mr-2'>View</i></button>";
			if(compareData(localStorage.companyID,data[i].fldStudentID)){
				longstring +="<button class='btn btn-outline-danger' onclick='cancelInvitation("+compareData(localStorage.companyID,data[i].fldStudentID)+")'><i class='fa fa-times mr-1'></i>Cancel</button>";
			}else{
				longstring +="<button class='btn btn-outline-success' onclick='CompanyHire("+data[i].fldStudentID+")'><i class='fa fa-check mr-1'></i>Send Invitation</button>";
			}
			longstring +="</div>";
			longstring +="</div>";
			longstring +="<br>";
			longstring +="</div>";
			$('#stuAvail').html(longstring);
		}
	});
}
const updateAccount = () =>{
	let newEmail = document.getElementById('compNewEmail').value;
	let currPass = document.getElementById('compCurrPass').value;
	let newPass  = document.getElementById('compNewPass').value;
	let confirmPass = document.getElementById('compConPass').value;
	let updateDet = {
		fldEmailAddress :newEmail,
		fldPassword : newPass 
	}
	fetch(myurl +'/ojtapi/tbl_companies').then((res)=>res.json()).then(function(data){
		if(data[0].fldPassword == currPass){
			if(newPass == confirmPass){

				fetch(myurl+'/ojtapi/update/tbl_companies/fldCompanyID/'+localStorage.companyID,{
					method:"POST",
					body:JSON.stringify([updateDet])
				}).then(function(data){
					toastr.success('You have successfully updated your Account');
				});
			}
		}
	});
}

const attendanceStud = () =>{
	

	fetch(myurl+'/ojtapi/tbl_students/fldStudentID/tbl_pendings/fldStudentID?select=fldRemarks, tbl_pendings.fldCompanyID, tbl_students.fldStudentID, tbl_students.fldFname, tbl_students.fldMname, tbl_students.fldLname').then((res)=>res.json()).then(function(data){

		studentTab = "";
		studentRec = "";
		
		for(let i = 0;i<data.length;i++){
			if(data[i].fldRemarks =='Approved by Company' && data[i].fldCompanyID == localStorage.companyID ){

				studentTab +="<li class='nav-item'>";
				if(i==0){
					studentTab +="<a class='nav-link active' data-toggle='tab' href='#"+i+"' role='tab' onclick='getID("+data[i].fldStudentID+")'><i class='fa fa-user ml-2'></i> "+data[i].fldFname+','+data[i].fldMname+','+data[i].fldLname+"</a>";
				}else{
					studentTab +="<a class='nav-link' data-toggle='tab' href='#"+i+"' role='tab' onclick='getID("+data[i].fldStudentID+")'><i class='fa fa-user ml-2'></i> "+data[i].fldFname+','+data[i].fldMname+','+data[i].fldLname+"</a>";
				}
				studentTab +="</li>";	
				if(i==0){
					studentRec +="<div class='tab-pane fade in show active' id='"+i+"' role='tabpanel'>";	

				}else{
					studentRec +="<div class='tab-pane fade' id='"+i+"' role='tabpanel'>";
				}
				studentRec +="<h5 class='my-2 h5' id=''>"+data[i].fldFname+','+data[i].fldMname+','+data[i].fldLname+"</h5></div>";

			}

		}

		studentRec +="<div class='table-responsive'>";
		studentRec +="<table class='table table-striped w-auto'>";
		studentRec +="<thead>";
		studentRec +="<tr>";
		studentRec +="<th>Time IN</th>";
		studentRec +="<th>Time OUT</th>";
		studentRec +="<th>Date</th>";
		studentRec +="<th>Remarks</th>";
		studentRec +="</tr>";
		studentRec +="</thead>";
		studentRec +="<tbody id='dtrStud'></tbody>";
		studentRec +="</div>";
		studentRec +="</div>";

		$('#studentList').html(studentTab);
		$('#student-record').html(studentRec);
		
	});
	
}
const getID = (id) =>{
	
	fetch(myurl+'/ojtapi/tbl_dtr/fldStudentID/'+id).then((res)=> res.json()).then(function (data){
		dtrStud = "";
		for(let i =0 ;i<data.length;i++){
			dtrStud +="<tr>";
			dtrStud +="<td>"+data[i].fldTimeIn+"</td>";
			dtrStud +="<td>"+data[i].fldTimeOut+"</td>";
			dtrStud +="<td>"+data[i].fldDate+"</td>";
			dtrStud +="<td>"+data[i].fldRemarks+"</td>";
			dtrStud +="</tr>";
		}
		$('#dtrStud').html(dtrStud);
	});	
}
let timein = [];
let timeout = [];
let remarks = [];
const checkAttendance = () =>{
	
	check = "";
	fetch(myurl+'/ojtapi/tbl_students/fldStudentID/tbl_pendings/fldStudentID?select=tbl_pendings.fldRemarks, tbl_pendings.fldCompanyID, tbl_students.fldLname, tbl_students.fldFname, tbl_students.fldMname, tbl_students.fldStudentID').then((res)=>res.json()).then(function(data){
		for(let i =0, b = 0;i<data.length;i++){
			if(data[i].fldRemarks =='Approved by Company' && data[i].fldCompanyID == localStorage.companyID ){
				check +="<input type='text' id='ids"+b+"' value='"+data[i].fldStudentID+"' hidden/>";
				check +="<tr>";
				check +="<td>"+data[i].fldLname+','+data[i].fldFname+','+data[i].fldMname+"</td>";
				check +="<td>";
				check +='<input type="time" id="timeIn'+b+'">';
				check +="</td>";
				check +="<td>";
				check +='<input type="time"id="timeOut'+b+'">';
				check +="</td>";
				check +="<td><input type='text' placeholder='Remarks' id='remarks"+b+"'></td>";
				check +="</tr>";
				counter();
				b++;
			}
		}
		$('#checkAttendance').html(check);
	});

}

let xCount = 0
const counter = () =>{
	xCount++;
}

const getxco = () =>{
	return xCount;

}



const sendDTR = () =>{

	let xdata = [];
	let ids = "#ids";
	let timeIn = "#timeIn";
	let timeOut = "#timeOut";
	let remarks1 = "#remarks";

	var today = new Date();
	var day =  today.getDay();
	var mon = today.getMonth();
	var year = today.getFullYear();


	console.log(getxco());
	for(let i = 0; i < getxco(); i++){
		let idss = $(ids + i).val();
		let sval = $(timeIn + i).val();
		let sval1 = $(timeOut + i).val();
		let sval2 = $(remarks1 + i).val();
		if(sval != "" && sval1 !="" && idss !=""){
			let jsonObj = {
				astudentNo: idss,
				btimein: sval, 
				ctout: sval1, 
				ddate : mon+"/"+day+"/"+year,
				ermark: sval2 
			};
			xdata.push(jsonObj);
		}
	}
	console.log(xdata)

	fetch(myurl+"/ojtapi/insert/tbl_dtr",{
		method:"POST",
		body:JSON.stringify(xdata)
	}).then(function(data){
		console.log(data);
		toastr.success('DTR submitted successfully ');
	});
		// window.location.assign('companydtr.html');

	
}
function encodeImageFileAsURL(element) {
	var file = element.files[0];
	var reader = new FileReader();
	reader.onloadend = function() {
	
		let img={
			fldCompanyImg : reader.result
		}
		fetch(myurl+"/ojtapi/update/tbl_companies/fldCompanyID/"+localStorage.companyID,{
			method:"POST",
			body:JSON.stringify([img])	
		}).then(function(data){
			toastr.success('Update Image Successfully ');
			window.location.assign('companyprofile.html');
		});
	}
	reader.readAsDataURL(file);
}
 const logout= ()=>{
 	window.location.assign('../../../login.html');

 }



