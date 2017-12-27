const LINE_FEED = /\r?\n/

export default {

    splitLines: (text) => {
        return text.split(LINE_FEED)
    },

    isCorrectExtension: (fileName, extension) => {
        return fileName && fileName.endsWith(extension)
    },

    isValidFileSize: (fileSize, maxSize) => {
        return fileSize <= maxSize
    },

    countFields: function (object) {

        if (Object.keys(object).length === 0)
            return 1

        let counter = 0

        Object.keys(object).forEach((key) => {
            counter += this.countFields(object[key])
        })

        return counter
    }
}