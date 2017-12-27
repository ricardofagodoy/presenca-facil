import moment from 'moment';

moment.locale('pt-br');

export default {

	dataAtualExtenso: () => {
		return moment().format('dddd') + ', ' + moment().format('LL');
	},

	dataAtualCompacta: () => {
		return moment().format('LL');
	},

	horarioDoTimestamp: (timestamp) => {
		return moment(timestamp).format('LT');
	},

	dataDoTimestamp: (timestamp) => {

		let data = moment(timestamp);

		return data.format('L') + ' - ' + data.format('dddd');
	}
}