class Radio {
  subscriptions = {}

  subscribe(channel, callback) {
    const self = this

    if (!self.subscriptions[channel]) {
      self.subscriptions[channel] = []
    }

    self.subscriptions[channel].push(callback)
    return self
  }

  unsubscribe(channel, callback) {
    const self = this
    if (!self.subscriptions[channel]) return self

    const index = self.subscriptions[channel].indexOf(callback)
    self.subscriptions[channel].splice(index, 1)
    return self
  }

  broadcast(channel, payload) {
    const self = this
    if (!self.subscriptions[channel]) return self

    self.subscriptions[channel].forEach(callback => {
      callback(payload)
    })

    return self
  }
}

if (typeof module !== "undefined") {
  module.exports = Radio
}

if (typeof window !== "undefined") {
  window.Radio = Radio
}
