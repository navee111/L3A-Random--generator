const { ipcRenderer } = require('electron') 


function handleError(error, resultElementId) {
  document.getElementById(resultElementId).textContent = 'Error:' + error.message
}

function updateResult(resultElementId, copyButtonId, value) {
  document.getElementById(resultElementId).textContent = value
  document.getElementById(copyButtonId).disabled = false
}

function copyToclipborad(elemntId) {
  const text =document.getElementById(elementId).textContent
  navigator.clipboard.writeText(text).then(() =>('Copied to clipboard'))
}
