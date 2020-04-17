
    $("document").ready(function() {

        let form = $("form")

        form.on("submit", function(event){
            event.preventDefault()
            let result = $(".bmi-calculation")
            let height = $(".height").val()
            let weight = $(".weight").val()
            let heightUnits = $(".height-info").val();
            let weightUnits = $(".weight-info").val();
            if (heightUnits == "in") {
                height /= (0.3937 * 100);
            } else {
                height /= 100;
            }
            if (weightUnits == "lbs") {
                weight /= 2.20462;
            }
            let bmi = weight / (height * height)
            let finalBMI = bmi.toFixed(2)

            result.html(`YOUR ESTIMATED BMI IS ${finalBMI}`)
            $.post('/myplan/bmi-calculator', {bmi: finalBMI} , (err, data)=>{
                if (err) throw err;
                console.log(data);
            })
        })
    })
        
