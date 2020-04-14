console.log("hello");



$(".home-search-button").on("click", ()=>{
    let searchTerm = $(".pure-input-2-3").val().trim();
    // let ajaxInfo = {
    //     "Authorization": "Token 893d3db18eb6a90278441bd7693b0ae2d97a8e5a",
    //     "url": `https://wger.de/api/v2/exerciseimage/?is_main=True?muscle=${searchTerm}`,
    //     "method": "GET",
    //     "header": {
    //         "content-type": "application.json"     
    //     }
    // }
    console.log(searchTerm);
    // $.ajax(ajaxInfo).done(function (response) {
    //     console.log(response);
    // });
})
