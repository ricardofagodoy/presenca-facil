import ImportUtils from 'utils/ImportUtils'

test('split correct number of lines', () => {
    const threeLinesText = 'ab\r\ncd\r\nef'

    const threeValuesArray = ImportUtils.splitLines(threeLinesText)

    expect(threeValuesArray.length).toBe(3)
})

test('split correct values', () => {
    const lineFeed = '\r\n'
    const threeLinesText = 'ab\r\ncd\r\nef'

    const threeValuesArray = ImportUtils.splitLines(threeLinesText)
    const threeLinesJoined = threeValuesArray.join(lineFeed)

    expect(threeLinesJoined).toBe(threeLinesText)
})

test('has valid filename extension', () => {
    const extension = '.csv'
    const filename = 'test.csv'

    const hasExtension = ImportUtils.isCorrectExtension(filename, extension)

    expect(hasExtension).toBeTruthy()
})

test('has invalid filename extension', () => {
    const extension = '.csv'
    const filename = 'test.csk'

    const hasExtension = ImportUtils.isCorrectExtension(filename, extension)

    expect(hasExtension).toBeFalsy()
})

test('count object fields number', () => {
    const object = {
        "a": 1,
        "b": 2,
        "c": {
            "d": 3,
            "e": {
                "f": 4
            }
        },
        "g": 5
    }

    const expectedFieldsCount = 5

    const fieldsCount = ImportUtils.countFields(object)

    expect(fieldsCount).toBe(expectedFieldsCount)
})

test('Validate correct maximum file size', () => {

    const fileSizeLimit = 10
    const fizeSize = 9

    expect(ImportUtils.isValidFileSize(fizeSize, fileSizeLimit)).toBeTruthy()
})

test('Validate incorrect maximum file size', () => {

    const fileSizeLimit = 10
    const fizeSize = 11

    expect(ImportUtils.isValidFileSize(fizeSize, fileSizeLimit)).toBeFalsy()
})