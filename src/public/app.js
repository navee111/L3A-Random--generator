const { ipcRenderer } = require('electron') 
 
/**
 * hantera ui logik. 
 */
 class UIController {
  constructor() {
    console.log('UiController loaded')
    this.#registerEventListeners()
}

// public ui 
async generatePassword() {
  const config = this.#getPasswordConfig()
  await this.#handleGeneration('generate-password', config, 'password-result', 'copy-password')
}

async generateName() {
  const config = this.#getNameConfig()
  await this.#handleGeneration('generate-name', config, 'name-result', 'copy-name')
}

async generateUsername() {
  const config = this.#getUsernameConfig()
  await this.#handleGeneration('generate-username', config, 'username-result', 'copy-username')
}

async generateBusiness() {
  const config = this.#getBusinessConfig()
  await this.#handleGeneration('generate-business', config, 'business-result', 'copy-business')
}

copyToClipboard(elementId) {
  const text = document.getElementById(elementId).textContent
  navigator.clipboard.writeText(text).then(() => console.log('Copied to clipboard'))
}

switchTab(tabName, event) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'))
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'))
  document.getElementById(`${tabName}-tab`).classList.add('active')
  event.target.classList.add('active')
}

// private helpers.
async #handleGeneration(channel, config, resultElementId, copyButtonId) {
  try {
    const result = await ipcRenderer.invoke(channel, config)
    this.#updateResult(resultElementId, copyButtonId, result)
  } catch (error) {
    this.#showError(error, resultElementId)
  }
}
#updateResult(resultElementId, copyButtonId, value) {
  document.getElementById(resultElementId).textContent = value
  document.getElementById(copyButtonId).disabled = false
}

#showError(error, resultElementId) {
  document.getElementById(resultElementId).textContent = `Error: ${error.message}`
}

// config builders.
#getPasswordConfig() {
  return {
    length: parseInt(document.getElementById('pwd-length').value),
    includeUppercase: document.getElementById('pwd-uppercase').checked,
    includeLowercase: document.getElementById('pwd-lowercase').checked,
    includeNumbers: document.getElementById('pwd-numbers').checked,
    includeSymbols: document.getElementById('pwd-symbols').checked
   }
}
#getNameConfig() {
  return {
    type: document.getElementById('name-type').value,
    gender: document.getElementById('name-gender').value
  }
}
#getUsernameConfig() {
  return {
    style: document.getElementById('username-style').value,
    maxLength: parseInt(document.getElementById('username-length').value)
  }
}
#getBusinessConfig() {
  return {
    industry: document.getElementById('business-industry').value
  }
}

 #registerEventListeners() {
    document.getElementById('generate-password-btn')?.addEventListener('click', () => this.generatePassword())
    document.getElementById('generate-name-btn')?.addEventListener('click', () => this.generateName())
    document.getElementById('generate-username-btn')?.addEventListener('click', () => this.generateUsername())
    document.getElementById('generate-business-btn')?.addEventListener('click', () => this.generateBusiness())
  }
}
document.addEventListener('DOMContentLoaded', () => {
  new UIController()
})
