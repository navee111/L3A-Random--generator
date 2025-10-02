import PasswordGenerator from './PasswordGenerator.js'
import NameGenerator from './NameGenerator.js'

/**
 * A comprehensive random generator utility class that provides various generation capabilities
 * including password generation, name generation, username creation, and business name generation.
 * 
 * @class randomGenerator
 * @example
 * const generator = new randomGenerator();
 * const password = generator.generatePassword(12, { includeSymbols: true });
 * const name = generator.generateName('full', 'female');
 */
class RandomGenerator {
  /**
   * Creates an instance of randomGenerator.
   * Initializes internal generators for passwords and names.
   * 
   * @constructor
   */
  constructor () {
    this.passwordGenerator = new PasswordGenerator()
    this.nameGenerator = new NameGenerator()
    
  }
  /**
   * Generates a secure password with the specified length and options.
   * 
   * @param {number} length - The desired length of the password
   * @param {Object} options - Configuration options for password generation
   * @param {boolean} [options.includeSymbols=true] - Whether to include special symbols
   * @param {boolean} [options.includeNumbers=true] - Whether to include numbers
   * @param {boolean} [options.includeUppercase=true] - Whether to include uppercase letters
   * @param {boolean} [options.includeLowercase=true] - Whether to include lowercase letters
   * @returns {string} The generated secure password
   * @example
   * const password = generator.generatePassword(12, { includeSymbols: false });
   */
  generatePassword (length, options) {
    return this.passwordGenerator.generateSecure(length, options)
  }
  /**
   * Validates the strength of a given password and provides feedback.
   * 
   * @param {string} password - The password to validate
   * @returns {Object} Validation results including strength score and recommendations
   * @returns {number} returns.score - Password strength score (0-100)
   * @returns {string} returns.level - Strength level ('weak', 'medium', 'strong', 'very strong')
   * @returns {string[]} returns.suggestions - Array of improvement suggestions
   * @example
   * const validation = generator.validatePasswordStrength('myPassword123!');
   * console.log(validation.level); // 'strong'
   */
  validatePasswordStrength (password) {
    return this.passwordGenerator.validateStrength(password)
  }
  // Name generation methods
  /**
   * Generates a name based on the specified type and gender.
   * 
   * @param {string} [type='full'] - The type of name to generate ('first', 'last', 'full')
   * @param {string} [gender='any'] - The gender preference ('male', 'female', 'any')
   * @returns {string} The generated name
   * @example
   * const firstName = generator.generateName('first', 'male');
   * const lastName = generator.generateName('last');
   * const fullName = generator.generateName('full', 'female');
   */
  generateName (type = 'full', gender = 'any') {
    if (type === 'first') return this.nameGenerator.generateFirstName(gender)
    if (type === 'last') return this.nameGenerator.generateLastName()
      return this.nameGenerator.generateFullName(gender)
  }
  /**
   * Generates a unique username based on style preferences and length constraints.
   * 
   * @param {string} [style='modern'] - The style of username ('modern', 'classic', 'creative')
   * @param {number} [maxLength=15] - Maximum length of the generated username
   * @returns {string} The generated username
   * @example
   * const username = generator.generateUsername('modern', 12);
   * const classicUsername = generator.generateUsername('classic');
   */
  generateUsername (style = 'modern', maxLength = 15) {
    return this.nameGenerator.generateUsername(style, maxLength)
  }
  /**
   * Generates a business name suitable for the specified industry.
   * 
   * @param {string} [industry='general'] - The industry category ('tech', 'healthcare', 'finance', 'retail', 'general')
   * @returns {string} The generated business name
   * @example
   * const techCompany = generator.generateBusinessName('tech');
   * const generalBusiness = generator.generateBusinessName();
   */
  generateBusinessName (industry = 'general') {
    return this.nameGenerator.generateBusinessName(industry)
  }
}
export default RandomGenerator