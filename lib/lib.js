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

recommend = function (currentUser, profileUser) {
  var skillWeight = 0.3
  var currentSkills = currentUser.skills || []
  var profileSkills = profileUser.skills || []
  var skillTotal = currentSkills.length
  var skillPoints = 0
  for (var i = 0; i < currentSkills.length; i++) {
    for (var j = 0; j < profileSkills.length; j++) {
      if (currentSkills[i] === profileSkills[j]) {
        skillPoints ++
      }
    }
  }
  var skillRatio = (skillPoints/skillTotal * skillWeight)

  var interestWeight = 0.4
  var currentInterests = currentUser.interests || []
  var profileInterests = profileUser.interests || []
  var interestTotal = currentInterests.length
  var interestPoints = 0
  for (var i = 0; i < currentInterests.length; i++) {
    for (var j = 0; j < profileInterests.length; j++) {
      if (currentInterests[i] === profileInterests[j]) {
        interestPoints ++
      }
    }
  }
  var interestRatio = (interestPoints/interestTotal * interestWeight)

  var jobTypeWeight = 0.1
  var currentJobType = currentUser.profile.jobType || []
  var profileJobType = profileUser.profile.jobType || []
  var jobTypeTotal = 1
  var jobTypePoints = 0
  if (currentJobType === profileJobType) {
    jobTypePoints ++
  }
  var jobTypeRatio = (jobTypePoints/jobTypeTotal * jobTypeWeight)

  var locationWeight = 0.2
  var currentLocation = currentUser.profile.desiredCity || []
  var profileLocation = profileUser.profile.currentCity || []
  var locationTotal = 1
  var locationPoints = 0
  if (currentLocation === profileJobType) {
    locationPoints ++
  }
  var locationRatio = (locationPoints/locationTotal * locationWeight)

  return {user: profileUser, score: interestRatio + skillRatio + jobTypeRatio + locationRatio}
}
