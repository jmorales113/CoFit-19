
    $("document").ready(function() {

        let form = $("form")

        form.on("submit", function(event){
            event.preventDefault()
            let result = $(".bmi-calculation")
            let heightFt = parseInt($(".height-ft").val().trim())
            let heightIn = parseInt($(".height-in").val().trim())
            let weight = parseInt($(".weight").val().trim())
            let weightUnits = $(".weight-info").val();
            let height = (heightFt * 12 + heightIn) * .0254 ;
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
        
