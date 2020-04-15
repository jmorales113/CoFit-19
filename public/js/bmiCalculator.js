
    $("document").ready(function() {

        let form = $("form")

        form.on("submit", function(event){
            event.preventDefault()
            let result = $(".bmi-calculation")

            function calculateBMI() {
            let height = $(".height").val()
            let weight = $(".weight").val()
            let bmi = weight / (height * height)
            return bmi.toFixed(2)
            }

            result.html(`YOUR ESTIMATED BMI IS ${calculateBMI()}`)
        })
    })
        
