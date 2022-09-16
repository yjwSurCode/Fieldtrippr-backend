import axios from 'axios';



export class Serivce {
    async saveMessage(params) {
        console.log(222, params)

        //http://localhost:3030/send_message
        //http://10.211.242.183:3030/send_message
        try {
            axios.post('http://localhost:3030/send_message', { params })
                .then(function (response) {
                    // handle success
                    console.log(response, 'response');
                })
                .catch(function (error) {
                    // handle error
                    console.log(error, 'MESSAGE-error');
                })
                .then(function () {
                    // always executed
                });
        } catch (e) {
            console.log('TRY CATCH ERROR： ' + e);
            res.json([{ code: 500, message: e }]);
        }
    }

}



