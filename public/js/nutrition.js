$("#button-search").on("click", ()=>{
        let userInput = $("#value").val().trim()
        
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://trackapi.nutritionix.com/v2/search/instant?query=${userInput}`,
            "headers": {
                "x-app-id": "f0d699bf",
                "x-app-key": "91bf2681b0abb8f724628815a3afbc72",
                 "x-remote-user-id": "0",
        }
        }
        
        $.ajax(settings).done(function (response) {
         const {branded} = response;
     
            for (let i = 0; i < 10; i++) {
                getNutritonalInfo(branded[i].food_name).done(function(response) {
                    const {nf_calories: calories, nf_total_fat: fat, nf_protein: protein, nf_total_carbohydrate: carbs}  = response.foods[0];
                    let nutritionCard = $("<div>", {class: 'nutrition-card'});
                    let nutritionTitle = $("<h3>");
                    nutritionTitle.text(branded[i].food_name)
                    let nutritionList = $("<ul>");
                    let nutritionCal = $("<p>");
                    nutritionCal.text(`Calories: ${calories}`);
                    let nutritionProtein = $("<p>");
                    nutritionProtein.text(`Protein: ${protein}`);
                    let nutritionFat = $("<p>");
                    nutritionFat.text(`Fat: ${fat}`);
                    let nutritionCarbs = $("<p>");
                    nutritionCarbs.text(`Carbohydrates: ${carbs}`);
                    nutritionList.append(nutritionCal);
                    nutritionList.append(nutritionProtein);
                    nutritionList.append(nutritionFat);
                    nutritionList.append(nutritionCarbs);
                    nutritionCard.append(nutritionTitle);
                    nutritionCard.append(nutritionList);
                    $(".nutritionDisplay").append(nutritionCard);
                });
            }
        });

})  



function getNutritonalInfo(name) {
    let settingsTwo = {
        "async": true,
        "crossDomain": true,
        "method": "POST",
        "url": "https://trackapi.nutritionix.com/v2/natural/nutrients",
        "headers": {
            "x-app-id": "f0d699bf",
            "x-app-key": "91bf2681b0abb8f724628815a3afbc72",
             "x-remote-user-id": "0", 
    }, 
        data: {
            "query": `${name}` // userInput
        }
    }
    return $.ajax(settingsTwo);
}