const RandomGeneratorMock = class {
  generatePassword(length, options) { 
    return 'PWD' 
  }
  generateName(type, gender) { 
    return 'NAME' 
  }
  generateUsername(style, maxLength) { 
    return 'USER' 
  }
  generateBusinessName(industry) { 
    return 'BIZ' 
  }
}

module.exports = RandomGeneratorMock
module.exports.default = RandomGeneratorMock