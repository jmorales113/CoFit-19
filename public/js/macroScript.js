//Macros calculator

//1 inch = 2.54cm
var amountEx = $('#amtExercise')
var genderInput = $('#genderInput')

$('#save').on('click', function (event) {
  event.preventDefault()
  const userData = {}
  userData.heightInput = $('#heightInput').val()
  userData.weightInput = $('#weightInput').val()
  userData.ageInput = $('#ageInput').val()
  userData.genderInput = $('#genderInput').val()
  userData.amtExercise = $('#amtExercise').val()
  const unit = $('#unit').val()
  userData.heightInput = getHeightInches(userData.heightInput, unit)
  genderResults = 0
  if (userData.genderInput === 'male' || userData.genderInput === 'decline') {
    genderResults = male(
      userData.weightInput,
      userData.heightInput,
      userData.ageInput
    )
  } else {
    genderResults = female(
      userData.weightInput,
      userData.heightInput,
      userData.ageInput
    )
  }
  console.log('userData', userData)
  $('.displayCalPerDay').text(`Recommended daily calorie intake: ${genderResults}`)
  $.post('/api/macros', userData, function (err, data) {
    console.log(data)
  })
})

//function to convert ft to inches
function ftConversion(heightInput) {
  let inchesHeight = heightInput / 12
  if (heightInput.indexOf('.') > 0) {
    const heightComponent = heightInput.split('.')
    inchesHeight = heightComponent[0] * 12 + parseInt(heightComponent[1])

    //component was coming back in string. had to change second heightComponent to integer.
  }
  console.log(inchesHeight)
  return inchesHeight
}
function getHeightInches(height, units) {
  let inHeight = height
  if (units === 'cm') {
    inHeight = height / 2.54
  } else {
    inHeight = ftConversion(height)
  }
  return inHeight
}

function male(weight, height, age) {
  let maleResults = 66 + 6.3 * weight + 12.9 * height - 6.8 * age
  switch (amountEx) {
    case 'noEx':
      maleResults * 1.2
      break
    case 'moderateEx':
      maleResults * 1.5
      break
    case 'regularEx':
      maleResults * 1.7
      break
  }
  roundedResults = Math.floor(maleResults)
  return roundedResults
}

function female(weight, height, age) {
  let femaleResults = 655 + 4.3 * weight + 4.7 * height - 4.7 * age
  switch (amtExercise) {
    case 'noEx':
      femaleResults * 1.2
      break
    case 'moderateEx':
      femaleResults * 1.5
      break
    case 'regularEx':
      femaleResults * 1.7
  }
  roundedResults = Math.floor(femaleResults)
  return roundedResults
}
//end Macros Calculator
