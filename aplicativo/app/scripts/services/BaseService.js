import axios from 'axios';

const WITH_CREDENTIALS = false

const handleResponse = (r) => r.data.object
const handleError = (e) => e.response ? e.response.data.message : e.message

export default {

    get: (url, success, failure, handler) => {

        if (!handler)
            handler = handleResponse

        console.log('Calling web service GET ' + url);

        axios.get(url, { withCredentials: WITH_CREDENTIALS })
            .then((response) => success(handler(response)))
            .catch((error) => failure(handleError(error)))
    },

    post: (url, body, success, failure) => {

        console.log('Calling web service POST ' + url + '\nBody: ' + JSON.stringify(body));

        axios.post(url, body, { withCredentials: WITH_CREDENTIALS })
            .then((response) => success(handleResponse(response)))
            .catch((error) => failure(handleError(error)))
    }
}