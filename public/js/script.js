//kg to lb = 1kg = 2.20462
// i have the user input male and female 
// const heightInput = $("heightInputFt").val + $("heightInputIn").val

var amountEx = $("#amtExercise")
var genderInput =$("#genderInput")

$("#save").on("click", function(event){
    const userData = {}
    userData.heightInput = $("#heightInput").val()
    userData.weightInput = $("#weightInput").val()
    userData.ageInput = $("#ageInput").val()
    userData.genderInput = $("#genderInput").val()
    userData.amtExercise = $("#amtExercise").val()
    
    genderResults = 0
    if (userData.genderInput === "male" || userData.genderInput === "decline"){
        genderResults = male(userData.weightInput, userData.heightInput, userData.ageInput)
    } else {
        genderResults = female(userData.weightInput, userData.heightInput, userData.ageInput)
    }
    console.log("userData", userData)
    $.post("/api/macros", userData, function(err, data){
        console.log(data)

        $(".displayCalPerDay").html(genderResults)
    })

})
//save gender results

function genderSelect(male, female, decline){
    // switch(genderInput)
;
}
genderInput.on("click",function(){
    genderSelect(genderInput)
})
//function to convert ft to inches
function ftConversion(heightInput){
    const heightComponent = heightInput.split(".");
    const inchesHeight = heightComponent[0] * 12 + parseInt(heightComponent[1])
    //component was coming back in string. had to change second heightComponent to integer.
    console.log(inchesHeight)
    return inchesHeight 
}

function male(weight, height, age){
    height = ftConversion(height)
    let maleResults = 66 + (6.3 * weight) + (12.9 * height) - (6.8 * age) 
     switch (amountEx) {
      case "noEx": 
        maleResults * 1.2
        break;
        case "moderateEx":
        maleResults * 1.5
        break;
        case "regularEx":
        maleResults * 1.7
        break;
        }
        roundedResults = Math.floor(maleResults)
        return roundedResults
}

            
    function female(weight, height, age){
        height = ftConversion(height)
        let femaleResults = 655 + (4.3 * weight) + (4.7 * height) - (4.7 * age)
        switch (amtExercise) {
        case "noEx": 
        femaleResults * 1.2
        break;
        case "moderateEx":
        femaleResults * 1.5
        break;
        case "regularEx":
        femaleResults * 1.7
        }
        roundedResults = Math.floor(femaleResults)
        return roundedResults              
    }
