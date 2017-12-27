import Constants from '../utils/Constants'
import { hashHistory } from 'react-router';

import axios from 'axios';

export default {

	getAttendance: (classId) => {
		return axios.get(Constants.WS_ATTENDANCE.GET_ATTENDANCE_CLASS + classId);
	},

  	getAllStudents: () => {
   		return axios.get(Constants.WS.STUDENT);
  	}
}