import DataUtils from './DataUtils'

const timestamp = 774444600000

test('Horario do timestamp', () => {
    expect(DataUtils.horarioDoTimestamp(timestamp)).toBe('08:30');
})

test('Data do timestamp', () => {
    expect(DataUtils.dataDoTimestamp(timestamp)).toBe('17/07/1994 - Domingo')
})