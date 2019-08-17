const {ipcRenderer} = require('electron')
 
window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('message','hello from renderer')
    ipcRenderer.on('reply',(event,arg) => {
        console.log(arg)
        document.getElementById('message').innerHTML = arg
    })
})