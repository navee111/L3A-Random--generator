const { ipcRenderer } = require('electron') 
// ui logik
 class UiController {
  constructor() {
    this.#registerEventListeners()
  }
}






function handleError(error, resultElementId) {
  document.getElementById(resultElementId).textContent = 'Error:' + error.message
}

function updateResult(resultElementId, copyButtonId, value) {
  document.getElementById(resultElementId).textContent = value
  document.getElementById(copyButtonId).disabled = false
}

function copyToClipboard(elementId) {
  const text =document.getElementById(elementId).textContent
  navigator.clipboard.writeText(text).then(() =>('Copied to clipboard'))
}

// UI Tab
function switchTab(tabName, event) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'))
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'))

  document.getElementById(`${tabName}-tab`).classList.add('active')
  event.target.classList.add('active')
}

// generators 
async function generatePassword() {
  const config = {
    length: parseInt(document.getElementById('pwd-length').value),
    includeUppercase: document.getElementById('pwd-uppercase').checked,
    includeLowercase: document.getElementById('pwd-lowercase').checked,
    includeNumbers: document.getElementById('pwd-numbers').checked,
    includeSymbols: document.getElementById('pwd-symbols').checked
  }

  try {
    const password = await ipcRenderer.invoke('generate-password', config)
    updateResult('password-result', 'copy-password', password)
  } catch (error) {
    handleError(error, 'password-result')
  }
}

async function generateName() {
  const config = {
    type: document.getElementById('name-type').value,
    gender: document.getElementById('name-gender').value
  }

  try {
    const name = await ipcRenderer.invoke('generate-name', config)
    updateResult('name-result', 'copy-name', name)
  } catch (error) {
    handleError(error, 'name-result')
  }
}

async function generateUsername() {
  const config = {
    style: document.getElementById('username-style').value,
    maxLength: parseInt(document.getElementById('username-length').value)
  }

  try {
    const username = await ipcRenderer.invoke('generate-username', config)
    updateResult('username-result', 'copy-username', username)
  } catch (error) {
    handleError(error, 'username-result')
  }
}

async function generateBusiness() {
  const config = {
    industry: document.getElementById('business-industry').value
  }

  try {
    const businessName = await ipcRenderer.invoke('generate-business', config)
    updateResult('business-result', 'copy-business', businessName)
  } catch (error) {
    handleError(error, 'business-result')
  }
}