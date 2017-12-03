const ajax = require('./ajax')

function Autocomplete (input, config) {
  let datalist = createDatalist(input)
  let lastInput = ''

  input.addEventListener('keyup', function (event) {
    if (input.value === '' || input.value === lastInput) { return }

    lastInput = input.value

    let query = {
      query: input.value
    }

    let ajaxConfig = {
      method: 'POST',
      contentType: 'application/json',
      url: config.url,
      query: JSON.stringify(query)
    }

    ajax.request(ajaxConfig, function (error, data) {
      if (error) {
        throw new Error('Network error' + error)
      }
      data = JSON.parse(data)
      populateDatalist(datalist, data.match.map(function (team) {
        return team.name
      }))
    })
  })
}

function populateDatalist (datalist, values) {
  datalist.innerHTML = ''

  values.array.forEach(function (value) {
    let option = document.createElement('option')
    option.setAttribute('value', value)
    datalist.appendChild(option)
  })
}

function createDatalist (input) {
  let listId = input.getAttribute('list')
  let datalist = document.getElementById(listId)

  if (document.getElementById(listId)) {
    return datalist
  }

  datalist = document.createElement('datalist')
  datalist.setAttribute('id', listId)
  document.body.appendChild(datalist)
  return datalist
}

module.exports = Autocomplete
