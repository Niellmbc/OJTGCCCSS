let myurl ="http://localhost";

fetch(myurl+"/ojtapi/select/tbl_students").then((res) =>res.json()).then(function(data){
	let longstring = "";
	for(let i = 0;i < data.length ; i++){
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
		if(compareData(1,data[i].fldStudentID)){
			longstring +="<button class='btn btn-outline-danger' onclick='cancelInvitation("+compareData(1,data[i].fldStudentID)+")'><i class='fa fa-times mr-1'></i>Cancel</button>";
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
$.ajaxSetup({
	async: false
});

let arr = [];

function data(){
	$.getJSON(myurl +"/ojtapi/select/tbl_pendings",function(data){
		arr = data;
	});
}
data();
function compareData(compID,stdID){
	for (let i = 0; i < arr.length; i++) {
		if(arr[i].fldCompanyID == compID && arr[i].fldStudentID == stdID){
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
	fetch(myurl+"/ojtapi/select/tbl_students/fldStudentID/"+id).then((res)=>res.json()).then(function(data){
		document.getElementById('picpath').setAttribute('src',data[0].fldImage);
		document.getElementById('myname').innerHTML = data[0].fldFname+' '+data[0].fldMname+' '+data[0].fldLname;
		document.getElementById('resume').innerHTML = "<embed src='"+data[0].fldResume+"' width='800' height='800'>";
	});
}
const viewCompanyPro = () =>{
	let id =1;
	fetch(myurl+"/ojtapi/select/tbl_companies/fldCompanyID/"+id).then((res)=>res.json()).then(function(data){
		// localStorage.compId=data[0].fldCompanyID;
		document.getElementById('companyName').innerHTML = data[0].fldCompanyName;
		document.getElementById('compEmail').value = data[0].fldEmailAddress;
		document.getElementById('compAdd').value = data[0].fldCompanyAddress;
		document.getElementById('compContact').value = data[0].fldContactNo;
		document.getElementById('compTel').value = data[0].fldTelNo;
	});
}
const CompanyHire = (studsid) =>{
	localStorage.studsid = studsid;
	let studid = localStorage.studsid;
	let compId = localStorage.compId;
	let hireDet = {
		CompanyId: "1",
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
	let compId = 1;
	fetch(myurl+"/ojtapi/join/tbl_pendings/fldStudentID/tbl_students/fldStudentID").then((res)=>res.json()).then(function(data){
		console.log(data);
		let longstring1 = "";
		let longstring2 = "";
		for(let i=0;i<data.length;i++){
			if(compId == data[i].fldCompanyID && data[i].fldRemarks=='Selected by Company'){
				longstring1 +="<tr>";
				longstring1 +="<th scope='row'>"+data[i].fldStudentID+"</th>";
				longstring1 +="<td>"+data[i].fldLname+', '+data[i].fldFname+', '+data[i].fldMname+"</td>";
				longstring1 +="<td>"+data[i].fldCourse+"</td>";
				longstring1 +="<td>"+data[i].fldRemarks+"</td>";
				longstring1 +="<td><a class='btn-floating btn-primary' onclick='viewStud("+data[i].fldStudentID+")'><i class='fa fa-eye'></i></a> <a class='btn-floating btn-danger' onclick='cancelInvites("+compareData(1,data[i].fldStudentID)+")'><i class='fa fa-times'></i></a></td>";
				longstring1 +="</tr>";
			}
			if(compId == data[i].fldCompanyID && data[i].fldRemarks=='Requested by Student'){
				longstring2 +="<tr>";
				longstring2 +="<th scope='row'>"+data[i].fldStudentID+"</th>";
				longstring2 +="<td>"+data[i].fldLname+', '+data[i].fldFname+', '+data[i].fldMname+"</td>";
				longstring2 +="<td>"+data[i].fldCourse+"</td>";
				longstring2 +="<td>"+data[i].fldRemarks+"</td>";
				longstring2 +="<td><a class='btn-floating btn-primary' onclick='viewStud("+data[i].fldStudentID+")'><i class='fa fa-eye'></i></a><a class='btn-floating btn-success' onclick='ApproveRequest("+data[i].fldStudentID+")'><i class='fa fa-check'></i></a> <a class='btn-floating btn-danger' onclick='cancelInvites("+compareData(1,data[i].fldStudentID)+")'><i class='fa fa-times'></i></a></td>";
				longstring2 +="</tr>";
			} 
		}
		$('#compSelect').html(longstring1);
		$('#studApply').html(longstring2);	
	});
}
const ApproveRequest = (studentID) =>{
	let hireDet = {
		CompanyId: "1",
		StudentId: studentID,
		Remarks: "Approve Request"
	}
	let approve = {
		fldStatus : "Hired"
	}
	fetch(myurl+"/ojtapi/delete/tbl_pendings/fldStudentID/"+studentID).then(function(data){
		fetch(myurl+ "/ojtapi/insert/tbl_pendings",{
			method:"POST",
			body:JSON.stringify([hireDet])
		}).then(function(data){
			toastr.success('You successfully hired a student');
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
	if(compareData(1,studid)){
		longstring +="<button class='btn btn-outline-danger' onclick='cancelInvitation("+compareData(1,studid)+")'><i class='fa fa-times mr-1'></i>Cancel Invitation</button>";
	}else{
		longstring +="<button class='btn btn-outline-success' onclick='CompanyHire("+studid+")'><i class='fa fa-check mr-1'></i>Send Invitation</button>";
	}
	$('#buts').html(longstring);
} 
const cancelInvitation = (transactionID) =>{
	fetch(myurl +"/ojtapi/delete/tbl_pendings/fldTransactionID/"+transactionID).then(function(data){
		toastr.info('You have canceled the Invitation Sent');
	});
	window.location.assign('company.html');
}
const cancelInvites = (transactionID) =>{
	fetch(myurl +"/ojtapi/delete/tbl_pendings/fldTransactionID/"+transactionID).then(function(data){
		toastr.info('You have canceled the Invitation Sent');
	});
	window.location.assign('applicantlist.html');
}

const searchStud = (val) => {
	fetch(myurl+"/ojtapi/select/tbl_students/fldCourse/"+val).then((res)=>res.json()).then(function(data){
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
			if(compareData(1,data[i].fldStudentID)){
				longstring +="<button class='btn btn-outline-danger' onclick='cancelInvitation("+compareData(1,data[i].fldStudentID)+")'><i class='fa fa-times mr-1'></i>Cancel</button>";
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
	fetch(myurl+"/ojtapi/like/tbl_students/fldLname/"+findme).then((res)=>res.json()).then(function(data){
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
			if(compareData(1,data[i].fldStudentID)){
				longstring +="<button class='btn btn-outline-danger' onclick='cancelInvitation("+compareData(1,data[i].fldStudentID)+")'><i class='fa fa-times mr-1'></i>Cancel</button>";
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
	fetch(myurl +'/ojtapi/select/tbl_companies').then((res)=>res.json()).then(function(data){
		if(data[0].fldPassword == currPass){
			if(newPass == confirmPass){

				fetch(myurl+'/ojtapi/update/tbl_companies/fldCompanyID/'+1,{
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
	fetch(myurl+'/ojtapi/join/tbl_students/fldStudentID/tbl_dtr/fldStudentID').then((res)=>res.json()).then(function(data){
		studentTab = "";
		studentRec = "";
		
		for(let i = 0;i<data.length;i++){
			studentTab +="<li class='nav-item'>";
			if(i==0){
				studentTab +="<a class='nav-link active' data-toggle='tab' href='#"+data[i].fldStudentID+"' role='tab' onclick='getID("+data[i].fldStudentID+")'><i class='fa fa-user ml-2'></i> "+data[i].fldFname+','+data[i].fldMname+','+data[i].fldLname+"</a>";
			}else{
				studentTab +="<a class='nav-link' data-toggle='tab' href='#"+data[i].fldStudentID+"' role='tab' onclick='getID("+data[i].fldStudentID+")'><i class='fa fa-user ml-2'></i> "+data[i].fldFname+','+data[i].fldMname+','+data[i].fldLname+"</a>";
			}
			studentTab +="</li>";	
			if(i==0){
				studentRec +="<div class='tab-pane fade in show active' id='"+data[i].fldStudentID+"' role='tabpanel'>";	
				
			}else{
				studentRec +="<div class='tab-pane fade' id='"+data[i].fldStudentID+"' role='tabpanel'>";
			}
			studentRec +="<h5 class='my-2 h5' id=''>"+data[i].fldFname+','+data[i].fldMname+','+data[i].fldLname+"</h5></div>";

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
	let recID = id;
	fetch(myurl+'/ojtapi/select/tbl_dtr/fldStudentID/'+recID).then((res)=> res.json()).then(function (data){
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
const checkAttendance = () =>{
	check = "";
	fetch(myurl+'/ojtapi/join/tbl_students/fldStudentID/tbl_dtr/fldStudentID').then((res)=>res.json()).then(function(data){
		for(let i =0;i<data.length;i++){
			check +="<tr>";
			check +="<td>"+data[i].fldLname+','+data[i].fldFname+','+data[i].fldMname+"</td>";
			check +="<td>";
			check +='<input type="time" id="timeIn'+i+'">';
			check +="</td>";
			check +="<td>";
			check +='<input type="time"id="timeOut'+i+'">';
			check +="</td>";
			check +="<td><input type='text' placeholder='Remarks'></td>";
			check +="</tr>";
		}
		$('#checkAttendance').html(check);
	});

}



