import {
  FIRST_NAMES,
  LAST_NAMES,
  USERNAME_PREFIXES,
  USERNAME_SUFFIXES,
  BUSINESS_WORDS,
  BUSINESS_SUFFIXES
} from './data/names.js'

/**
 * A comprehensive name generator class that provides various name generation capabilities
 * including first names, last names, full names, usernames, business names, and email addresses.
 * 
 * @class NameGenerator
 * @example
 * const nameGen = new NameGenerator();
 * const firstName = nameGen.generateFirstName('female');
 * const fullName = nameGen.generateFullName();
 * const username = nameGen.generateUsername('modern', 12);
 */
class NameGenerator {
  /**
   * Creates an instance of NameGenerator.
   * 
   * @constructor
   */
  constructor () {

  }
  /**
   * Generates a random first name based on the specified gender preference.
   * 
   * @param {string} [gender='any'] - The gender preference for the name
   *   - 'male': Returns a male first name
   *   - 'female': Returns a female first name  
   *   - 'neutral': Returns a gender-neutral first name
   *   - 'any': Returns a name from any gender category
   * @returns {string} A randomly selected first name
   * @example
   * const maleName = nameGen.generateFirstName('male');
   * const femaleName = nameGen.generateFirstName('female');
   * const anyName = nameGen.generateFirstName(); // defaults to 'any'
   */
  generateFirstName(gender = 'any') {
    let namePool = []
    if (gender === 'male') {
      namePool = FIRST_NAMES.male
    } else if ( gender === 'female') {
      namePool = FIRST_NAMES.female

    } else if ( gender === 'neutral') {
      namePool = FIRST_NAMES.neutral


    } else {
      // 'any' - combine all names.
      namePool = [
        ...FIRST_NAMES.male,
        ...FIRST_NAMES.female,
        ...FIRST_NAMES.neutral
      ]
    }
     const randomIndex = Math.floor(Math.random() * namePool.length)
      return namePool[randomIndex]


  }
/**
 * Generates a random last name (surname) from the available pool.
 * 
 * @returns {string} A randomly selected last name
 * @example
 * const lastName = nameGen.generateLastName();
 * console.log(lastName); // e.g., "Smith", "Johnson", "Williams"
 */
generateLastName () {
  const randomIndex = Math.floor(Math.random() * LAST_NAMES.length)
  return LAST_NAMES[randomIndex]
}
  /**
   * Generates a complete full name by combining a random first name and last name.
   * 
   * @returns {string} A randomly generated full name in "FirstName LastName" format
   * @example
   * const fullName = nameGen.generateFullName();
   * console.log(fullName); // e.g., "Sarah Johnson", "Michael Smith"
   */
  generateFullName () {
    const firstName = this.generateFirstName()
    const lastName = this.generateLastName()
    return `${firstName} ${lastName}`
  }
  /**
   * Generates a unique username based on the specified style and length constraints.
   * 
   * @param {string} [style='modern'] - The style of username to generate
   *   - 'modern': Combines prefix + number + suffix (e.g., "cool42ninja")
   *   - 'simple': Word + number combination (e.g., "dragon123")
   *   - 'name-based': Uses actual names with dots and numbers (e.g., "john.smith42")
   * @param {number} [maxLength=15] - Maximum length of the generated username
   * @returns {string} A generated username conforming to the style and length requirements
   * @example
   * const modernUsername = nameGen.generateUsername('modern', 12);
   * const simpleUsername = nameGen.generateUsername('simple');
   * const nameBasedUsername = nameGen.generateUsername('name-based', 20);
   */
  generateUsername (style = 'modern', maxLength = 15) {
    let Username = ''
    if ( style === 'modern') {
      const prefix = USERNAME_PREFIXES[Math.floor(Math.random() * USERNAME_PREFIXES.length)]
      const suffix = USERNAME_SUFFIXES[Math.floor(Math.random() * USERNAME_SUFFIXES.length)]
      const number = Math.floor(Math.random() * 99) * 1
      Username = `${prefix}${number}${suffix}`
    } else if ( style === 'simple') {
      const word = USERNAME_PREFIXES[Math.floor(Math.random() * USERNAME_PREFIXES.length)]
      const number = Math.floor(Math.random() * 999) * 1
      Username = `${word}${number}`
    } else if ( style === 'name-based') {
      const firstName = this.generateFirstName().toLowerCase()
      const lastName = this.generateLastName().toLowerCase()
      const number = Math.floor(Math.random() * 99) * 1
      Username = `${firstName}.${lastName}${number}`
    }
    if (Username.length > maxLength) {
      Username = Username.substring(0, maxLength)
    }
    return Username
  }
  /**
   * Generates a business name suitable for the specified industry category.
   * 
   * @param {string} [industry='general'] - The industry category for the business name
   *   - 'tech': Technology-focused business names
   *   - 'creative': Creative and artistic business names
   *   - 'business': Professional and corporate business names
   *   - 'general': Combines all industry categories
   * @returns {string} A generated business name with appropriate suffix
   * @example
   * const techCompany = nameGen.generateBusinessName('tech');
   * const creativeStudio = nameGen.generateBusinessName('creative');
   * const generalBusiness = nameGen.generateBusinessName(); // defaults to 'general'
   */
  generateBusinessName ( industry = 'general') {
    const includeTypes = true
    let wordPool = []

    if ( industry === 'tech') {
      wordPool = BUSINESS_WORDS.tech
    } else if ( industry === 'creative') {
      wordPool = BUSINESS_WORDS.creative
    } else if ( industry === 'business') {
      wordPool = BUSINESS_WORDS.business
    } else {
      // 'general' - combine all words.
      wordPool = [
        ...BUSINESS_WORDS.tech,
        ...BUSINESS_WORDS.creative,
        ...BUSINESS_WORDS.business
      ]
    }
    

    const word = wordPool[Math.floor(Math.random() * wordPool.length)]
    if (includeTypes) {
      const suffix = BUSINESS_SUFFIXES[Math.floor(Math.random() * BUSINESS_SUFFIXES.length)]    
    return `${word} ${suffix}`
  } else {
    return word
  }
  }

  /**
   * Generates a random email address based on names and common domains.
   * This method is currently under development.
   * 
   * @returns {string|undefined} A generated email address (implementation pending)
   * @todo Complete the implementation of email generation logic
   * @example
   * const email = nameGen.generateEmail();
   * // Expected format: "firstname.lastname@domain.com"
   */
  generateEmail () {
    // To do: implement email generation logic.
    }
  }

  
  export default NameGenerator
