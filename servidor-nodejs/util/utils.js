module.exports = {

    /* Util function */
    jsonToIntegerArray: json => {
        const integerArray = []

        for (key in json)
            integerArray.push(parseInt(key))
            
        return integerArray
    }
}