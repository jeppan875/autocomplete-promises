module.exporta = {
  request: request,
  post: post,
  get: get
}

function request (config, callback) {
  return new Promise(function (resolve, reject) {
    config.method = config.method || 'GET'
    config.url = config.url || ''
    config.contentType = config.contentType || 'application.json'

    let req = new XMLHttpRequest()

    req.addEventListener('load', function () {
      if (req.status >= 400) {
        reject(new Error('Request error' + req.status))
      }

      resolve(req.responseText)
    })

    req.addEventListener('error', function (event) {
      reject(new Error('Network error' + req.status))
    })

    req.open(config.method, config.url)
    req.setRequestHeader('Content-type', config.contentType)
    req.send(config.query)
  })
}

function post (config, callback) {
  config.method = 'POST'
  request(config, callback)
}

function get (config, callback) {
  config.method = 'GET'
  request(config, callback)
}
