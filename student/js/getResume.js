        let myurl = "http://gordoncollegeccs-ssite.net"
        let data = {
            "objective": "",
            "personalInfo": {
                "Fname": "",
                "Mname": "",
                "Lname": "",
                "Height": "",
                "Weight": "",
                "Dob": "",
                "Pob": "",
                "Gender": "",
                "cship": "",
                "Ftname": "",
                "Mtname": "",
                "cstatus": "",
                "MobileNo": "",
                "Email": "",
                "Address": ""
            },
            "workExp": [],
            "educAttainment": [],
            "Skills": [],
            "Achievement": [],
            "SeminarsTraining": [],
            "CharacterRef": []
        };


        let pushObj = () => {
            data.objective = $("#obj").val();
            console.log(data);
        }

        let pushInfo = () => {
            data.personalInfo.Fname = $("#fname").val();
            data.personalInfo.Lname = $("#lname").val();
            data.personalInfo.Mname = $("#mname").val();
            data.personalInfo.Height = $("#height").val();
            data.personalInfo.Weight = $("#weight").val();
            data.personalInfo.Dob = $("#dob").val();
            data.personalInfo.Pob = $("#pob").val();
            data.personalInfo.Gender = $("#gender").val();
            data.personalInfo.cship = $("#cship").val();
            data.personalInfo.Ftname = $("#ftname").val();
            data.personalInfo.Mtname = $("#mtname").val();
            data.personalInfo.cstatus = $("#cstatus").val();
            data.personalInfo.MobileNo = $("#mnumber").val();
            data.personalInfo.Cnumber = $("#cnumber").val();
            data.personalInfo.Email = $("#email").val();
            data.personalInfo.Address = $("#address").val();
            console.log(data);
        }

        let dispWorkXp = () => {
            let longString = "";
            for (let i = 0; i < data.workExp.length; i++) {
                longString += '<p><strong>' + data.workExp[i].cname + ' </strong> - <i class="fa fa-close fa-2x red-text" aria-hidden="true" onclick="remWorkXp(' + i + ')"></i></p><p>' + data.workExp[i].cadd + '</p><li>' + data.workExp[i].pos + ' (' + data.workExp[i].fr + ' to ' + data.workExp[i].to + ')</li>';
            }

            $("#wxplist").html(longString);

        }
        dispWorkXp()
        let pushWorkXp = () => {
            let x = {
                cname: $("#cname").val(),
                cadd: $("#cadd").val(),
                pos: $("#pos").val(),
                fr: $("#wxptperiod").val(),
                to: $("#wxpfperiod").val(),

            };

            data.workExp.push(x);
            dispWorkXp()

            $("#cname").val("");
            $("#cadd").val("");
            $("#pos").val("");
            $("#wxptperiod").val("");
            $("#wxptperiod").val("");
        }

        let remWorkXp = (val) => {
            data.workExp.splice(val, 1);
            dispWorkXp()
        }



        let dispeducAt = () => {
            let longString = "";
            for (let i = 0; i < data.educAttainment.length; i++) {
                
                if(data.educAttainment[i].scourse != undefined){
                    longString += '<p><strong>' + data.educAttainment[i].educType + ' </strong> : '+ data.educAttainment[i].scourse +' - <i class="fa fa-close fa-2x red-text" aria-hidden="true" onclick="remeducAt(' + i + ')"></i></p><p>' + data.educAttainment[i].sadd + '</p><li> Academic Year (' + data.educAttainment[i].eduftime + ' to ' + data.educAttainment[i].eduttime + ')</li>';
                } else {
                    longString += '<p><strong>' + data.educAttainment[i].educType + ' </strong> - <i class="fa fa-close fa-2x red-text" aria-hidden="true" onclick="remeducAt(' + i + ')"></i></p><p>' + data.educAttainment[i].sadd + '</p><li> Academic Year (' + data.educAttainment[i].eduftime + ' to ' + data.educAttainment[i].eduttime + ')</li>';                    
                }
            }

            $("#educAtlist").html(longString);
        }

        let pusheducAt = () => {

            let xs = $("#scourse").val();
            let x = {};

            if (xs != "") {
                x = {
                    educType: $("#educType").val(),
                    scourse: $("#scourse").val(),
                    sname: $("#sname").val(),
                    sadd: $("#sadd").val(),
                    eduftime: $("#eduftime").val(),
                    eduttime: $("#eduttime").val(),

                };
            } else {
                x = {
                    educType: $("#educType").val(),
                    sname: $("#sname").val(),
                    sadd: $("#sadd").val(),
                    eduftime: $("#eduftime").val(),
                    eduttime: $("#eduttime").val(),
                };

            }


            data.educAttainment.push(x);
            dispeducAt()

            $("#educType").val("")
            $("#scourse").val("")
            $("#sname").val("")
            $("#sadd").val("")
            $("#eduftime").val("")
            $("#eduttime").val("")

        }

        let remeducAt = (val) => {
            data.educAttainment.splice(val, 1);
            dispeducAt()
        }

        let pushSkills = () => {

        }

        let remSkills = () => {

        }

        let pushAchiev = () => {

        }

        let remAchiev = () => {

        }

        let pushSeminars = () => {

        }

        let remSeminars = () => {

        }

        let selCourse = (val) => {
            if (val == "Tertiary Education") {
                $("#coursename").css("display", "block");
                $("#scourse").val("");
            } else {
                $("#coursename").css("display", "none");
                $("#scourse").val("");
            }
        }


        function convertToBase64() {
            //Read File
            var selectedFile = document.getElementById("myFile").files;
            //Check File is not Empty
            if (selectedFile.length > 0) {
                // Select the very first file from list
                var fileToLoad = selectedFile[0];
                // FileReader function for read the file.
                var fileReader = new FileReader();
                var base64;
                // Onload of file read the file content
                fileReader.onload = function(fileLoadedEvent) {
                    base64 = fileLoadedEvent.target.result;
                    // Print data in console

                    updateResume(base64);
                    window.alert("Resume Uploaded!");
                    $('embed#pdfFile').remove();
                    parent.append(newElement);
                };
                // Convert data to base64
                fileReader.readAsDataURL(fileToLoad);
            }
        }


        let updateResume = (val) => {
            let x = {
                fldResume: val
            };
            fetch(myurl + "/ojtapi/update/tbl_students/fldStudentID/201610365", {
                method: "POST",
                body: JSON.stringify([x])
            });
        }
