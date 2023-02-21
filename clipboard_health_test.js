const crypto = require('crypto')

// createDigest and settings extracted in order
// to make deterministicPartitionKey() testable

//createDigest is an imported library and we should not test it
// we should test if it gets the right arguments though,
// (via fn mock)
function createDigest(data) {
  return crypto.createHash('sha3-512').update(data).digest('hex')
}

const settings = {
  TRIVIAL_PARTITION_KEY: '0',
  MAX_PARTITION_KEY_LENGTH: 256
}


function deterministicPartitionKey(settings, createDigest, event) {
  if (event && event.partitionKey) {

    const stringifiedPartitionKey = JSON.stringify(event.partitionKey)
    return stringifiedPartitionKey.length > settings.MAX_PARTITION_KEY_LENGTH
      ? createDigest(stringifiedPartitionKey)
      : stringifiedPartitionKey

  } else if (event && !event.partitionKey) {

    const stringifiedEvent = JSON.stringify(event)
    return createDigest(stringifiedEvent)

  } else {
    return settings.TRIVIAL_PARTITION_KEY
  }
}

module.exports = {
  deterministicPartitionKey
}