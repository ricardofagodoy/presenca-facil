import ImportService from 'services/import/ImportService'

test('integration test - import', () => {

    const file = new File(["1;2;3\n4;5;6"], "test.csv", {
        type: "text/plain",
    });

    const webService = function (list) {
        return new Promise((resolve, reject) => resolve(list))
    }

    const mapper = function (valuesList) {
        return {
            a: valuesList[0],
            b: {
                c: valuesList[1],
                d: valuesList[2]
            }
        }
    }

    expect.assertions(1);

    const expectedResult = [{
        a: "1",
        b: {
            c: "2",
            d: "3"
        }
    }, {
        a: "4",
        b: {
            c: "5",
            d: "6"
        }
    }]

    return expect(ImportService.import(file, mapper, webService)).resolves.toEqual(expectedResult)
})