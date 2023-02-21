const {
  deterministicPartitionKey,
} = require('./clipboard_health_test')

const MOCK_DIGEST_RESULT = 'mock_digest_result'
const mockSettings = {
  TRIVIAL_PARTITION_KEY: "0",
  MAX_PARTITION_KEY_LENGTH: 256,
}

const createDigestMock = jest.fn((data) => 'mock_digest_result')

//there are cases that are not covered in the code, like
// event = null, event = {}, event = ""
// event.partitionKey = null, {}, "", etc
// Depending on design, a general normalization step should be added either at the beginning of the function
// or before it. It should be tested separately though


test('event with partitionKey', () => {
  const eventWithPartitionKey_object = { a: 'someData', b: 25, partitionKey: { zz: 'foo', 45: 'bar' } }
  const eventWithPartitionKey_number = { a: 'someData', b: 25, partitionKey: 1 }
  const eventWithPartitionKey_string = { a: 'someData', b: 25, partitionKey: "foo_bar" }

  const result_object = deterministicPartitionKey(mockSettings,createDigestMock, eventWithPartitionKey_object)
  const result_number = deterministicPartitionKey(mockSettings,createDigestMock, eventWithPartitionKey_number)
  const result_string = deterministicPartitionKey(mockSettings,createDigestMock, eventWithPartitionKey_string)

  expect(result_object).toEqual(JSON.stringify({ zz: 'foo', 45: 'bar' }))
  expect(result_number).toEqual(JSON.stringify(1))
  expect(result_string).toEqual(JSON.stringify("foo_bar"))
})

test('event with bogus partitionKey', () => {
  //this should be a fuzzy test
  const eventWithPartitionKey2 = { a: 'someData', b: 25, partitionKey: '' }
  const eventWithPartitionKey3 = { a: 'someData', b: 25, partitionKey: {} }

  const result2 = deterministicPartitionKey(mockSettings,createDigestMock, eventWithPartitionKey2)
  const result3 = deterministicPartitionKey(mockSettings,createDigestMock, eventWithPartitionKey3)

  expect(result2).toEqual(MOCK_DIGEST_RESULT)
  expect(result3).toEqual("{}")
})


test('event without partitionKey', () => {
  const eventWithoutPartitionKey = { a: 'someData', b: 25 }

  const result = deterministicPartitionKey(mockSettings,createDigestMock, eventWithoutPartitionKey)


  expect(result).toEqual(MOCK_DIGEST_RESULT)
  expect(createDigestMock).toBeCalledWith(JSON.stringify(eventWithoutPartitionKey))

})

test('partition key hits max length', () => {
  mockSettings.MAX_PARTITION_KEY_LENGTH = 5


  const eventWithPartitionKey = { a: 'someData', b: 25, partitionKey: { zz: 'foo', 45: 'bar' } }

  const result = deterministicPartitionKey(mockSettings,createDigestMock, eventWithPartitionKey)

  expect(result).toEqual(MOCK_DIGEST_RESULT)
  expect(createDigestMock).toBeCalledWith(JSON.stringify({ zz: 'foo', 45: 'bar' }))
})

test('no event', () => {
  //this should be a fuzzy test too
  //at least event = null, event = {}, event = "" should be covered and accounted for in the code.

  const event = undefined

  const result = deterministicPartitionKey(mockSettings,createDigestMock, event)

  expect(result).toEqual(mockSettings.TRIVIAL_PARTITION_KEY)
})
