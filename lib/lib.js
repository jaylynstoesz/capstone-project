fuzzyMatch = function(inputs, searchTerm, tolerance) {
  return inputs.filter(function (input) {
    var splitInput = input.text.toLowerCase().split("")
    var splitSearchTerm = searchTerm.toLowerCase().split("")
    for (var i = 0; i < splitInput.length; i++) {
      counter = 0
      for (var j = 0; j < splitSearchTerm.length; j++) {
        if (splitInput[i + j] === splitSearchTerm[j]) {
          counter++
        }
      }
      if (counter >= searchTerm.length - tolerance) {
        return input
      }
    }
  })
}
