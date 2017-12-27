import Constants from 'utils/Constants'
import ImportUtils from 'utils/ImportUtils'

export default {

  import: function (file, objectMapper, webService) {

    // TODO: DECOUPLE VALIDADOR
    return new Promise((resolve, reject) => {

      if (!ImportUtils.isCorrectExtension(file.name, Constants.IMPORT_FILE_EXTENSION))
        return reject('Arquivo com extensão inválida.');

      if (!ImportUtils.isValidFileSize(file.size, Constants.IMPORT_FILE_MAX_SIZE_BYTES))
        return reject('Tamanho máximo de arquivo excedido.');

      this.readFile(file, (e) => {

        const importData = e.target.result

        if (importData == '')
          return reject('Arquivo em branco.');

        const textList = ImportUtils.splitLines(importData)
        const objectList = []

        try {
          textList.forEach((line) => {
            const valuesList = line.split(Constants.IMPORT_FILE_SEPARATOR)

            // Call correct provided PARSER
            objectList.push(objectMapper(valuesList))
          })
        } catch (e) {
          return reject(e)
        }

        // Call correct provided WS
        webService(objectList).
          then((response) => resolve(response)).
          catch((error) => reject(error))
      }, reject)
    })
  },

  readFile: function (file, success, error) {

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onerror = (e) => error('Falha interna ao ler o arquivo.')
    reader.onload = success
  }
}