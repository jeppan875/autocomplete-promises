const Autocomplete = require('./autocomplete')

var config = {
  url: 'http://localhost:3001/teams'
}

new Autocomplete(document.querySelector('#teaminput'), config)
