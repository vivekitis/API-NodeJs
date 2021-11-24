const request = require("request"),
    Validator = require('validatorjs');

module.exports = class SMSEdgeApi {

    /**
     * Init
     *
     * @param apiKey
     */
    constructor(apiKey) {
        this.endpoint = 'https://api.smsedge.io/v1';
        this.apiKey = apiKey;
    }


    // REFERENCES

    /**
     * This function returns all available API functions
     * @param callback
     */
    getFunctions(callback) {
        this._verifyAndRun('references/functions/', {}, {}, (cb) => {
            callback(cb);
        });
    }

    /**
     * This function returns all HTTP response status codes
     * @param callback
     */
    getHttpStatuses(callback) {
        this._verifyAndRun('references/statuses/', {}, {}, (cb) => {
            callback(cb);
        });
    }

    /**
     * This function returns list of countries
     * @param callback
     */
    getCountries(callback) {
        this._verifyAndRun('references/countries/', {}, {}, (cb) => {
            callback(cb);
        });
    }


    // SMS

    /**
     * Send a single SMS message
     * @param fields
     * @param callback
     */
    sendSingleSms(fields, callback) {
        let rules = {
            from: 'required|string',
            to: 'required|numeric|digits_between:7,64',
            text: 'required|string',
            name: 'string',
            email: 'email',
            country_id: 'numeric|digits_between:1,32',
            reference: 'string',
            shorten_url: 'boolean',
            list_id: 'numeric|digits_between:1,32',
            transactional: 'boolean',
            preferred_route_id: 'numeric|digits_between:1,32',
            delay: 'numeric|digits_between:1,32'
        };

        this._verifyAndRun('sms/send-single/', rules, fields, (cb) => {
            callback(cb);
        });
    }

    /**
     * Send SMS messages to all good numbers in a list
     *
     * @param fields
     * @param callback
     */
    sendList(fields, callback) {
        let rules = {
            list_id: 'required|numeric|digits_between:1,32',
            from: 'required|string',
            text: 'required|string',
            shorten_url: 'boolean',
            preferred_route_id: 'numeric|digits_between:1,32'
        };

        this._verifyAndRun('sms/send-list/', rules, fields, (cb) => {
            callback(cb);
        });
    }

    /**
     * Get information about sent SMS messages
     *
     * @param fields
     * @param callback
     */
    getSmsInfo(fields, callback) {
        let rules = {
            'ids': 'required|string'
        };

        this._verifyAndRun('sms/get/', rules, fields, (cb) => {
            callback(cb);
        });
    }


    // LISTS OF NUMBERS

    /**
     * Creating A new list
     *
     * @param fields
     * @param callback
     */
    createList(fields, callback) {
        let rules = {
            name: 'required|string'
        };

        this._verifyAndRun('lists/create/', rules, fields, (cb) => {
            callback(cb);
        });
    }

    /**
     * Deleting an existing list
     *
     * @param fields
     * @param callback
     */
    deleteList(fields, callback) {
        let rules = {
            id: 'required|numeric'
        };

        this._verifyAndRun('lists/delete/', rules, fields, (cb) => {
            callback(cb);
        });
    }

    /**
     * Get all info about a list, including sending stats and numbers segmentation
     *
     * @param fields
     * @param callback
     */
    getListInfo(fields, callback) {
        let rules = {
            id: 'required|numeric'
        };

        this._verifyAndRun('lists/info/', rules, fields, (cb) => {
            callback(cb);
        });
    }

    /**
     * Get all the lists that user created, with information about stored numbers
     *
     * @param callback
     */
    getAllLists(callback) {
        this._verifyAndRun('lists/getall/', {}, {}, (cb) => {
            callback(cb);
        });
    }


    // PHONE NUMBERS

    /**
     * Create a new contact to a list
     *
     * @param fields
     * @param callback
     */
    createNumber(fields, callback) {
        let rules = {
            number: 'required|string',
            list_id: 'required|numeric|digits_between:1,32',
            country_id: 'numeric|digits_between:1,32',
            name: 'string',
            email: 'email'
        };

        this._verifyAndRun('numbers/create/', rules, fields, (cb) => {
            callback(cb);
        });
    }

    /**
     * Delete a record (contact) from an existing list
     *
     * @param fields
     * @param callback
     */
    deleteNumber(fields, callback) {
        let rules = {
            ids: 'required|string'
        };

        this._verifyAndRun('numbers/delete/', rules, fields, (cb) => {
            callback(cb);
        });
    }

    /**
     * Get extended information about numbers
     *
     * @param fields
     * @param callback
     */
    getNumbers(fields, callback) {
        let rules = {
            list_id: 'numeric|digits_between:1,32',
            ids: 'string',
            limit: 'numeric|digits_between:1,32',
            offset: 'numeric|digits_between:1,32'
        };

        this._verifyAndRun('numbers/get/', rules, fields, (cb) => {
            callback(cb);
        });
    }

    /**
     * Get list of unsubscribed numbers
     * @param callback
     */
    getUnsubscribers(callback) {
        this._verifyAndRun('numbers/unsubscribers/', {}, {}, (cb) => {
            callback(cb);
        });
    }


    // ROUTES

    /**
     * Get all available Routes with prices for different countries
     *
     * @param callback
     */
    getRoutes(callback) {
        this._verifyAndRun('routes/getall/', {}, {}, (cb) => {
            callback(cb);
        });
    }


    // AUXILIARY TOOLS

    /**
     * Logical verification of number
     *
     * @param fields
     * @param callback
     */
    numberSimpleVerify(fields, callback) {
        let rules = {
            number: 'required|string',
            country_id: 'numeric|digits_between:1,32'
        };

        this._verifyAndRun('verify/number-simple/', rules, fields, (cb) => {
            callback(cb);
        });
    }

    /**
     * Verifying number by request to Home Location Register
     *
     * @param fields
     * @param callback
     */
    numberHlrVerify(fields, callback) {
        let rules = {
            number: 'required|string',
            country_id: 'numeric|digits_between:1,32'
        };

        this._verifyAndRun('verify/number-hlr/', rules, fields, (cb) => {
            callback(cb);
        });
    }

    /**
     * Verification of text before sending an SMS
     *
     * @param fields
     * @param callback
     */
    textAnalyzing(fields, callback) {
        let rules = {
            text: 'required|string'
        };

        this._verifyAndRun('text/analyze/', rules, fields, (cb) => {
            callback(cb);
        });
    }


    // REPORTS

    /**
     * This function returns a report about SMS sending process
     *
     * @param fields
     * @param callback
     */
    getSendingReport(fields, callback) {
        let rules = {
            status: 'string',
            date_from: 'date',
            date_to: 'date',
            limit: 'numeric|digits_between:1,32',
            offset: 'numeric|digits_between:1,32'
        };

        this._verifyAndRun('reports/sending/', rules, fields, (cb) => {
            callback(cb);
        });
    }

    /**
     * This function returns a statistics about SMS sending
     *
     * @param fields
     * @param callback
     */
    getSendingStats(fields, callback) {
        let rules = {
            country_id: 'required|numeric|digits_between:1,32',
            date_from: 'required|date',
            date_to: 'required|date',
            route_id: 'numeric|digits_between:1,32'
        };

        this._verifyAndRun('reports/stats/', rules, fields, (cb) => {
            callback(cb);
        })
    }


    // USER

    /**
     * This functions returns API user details
     *
     * @param callback
     */
    getUserDetails(callback) {
        let req = this._verifyAndRun('user/details/', {}, {}, (cb) => {
            callback(cb);
        });
    }


    // CURE FUNCTIONS

    /**
     * Verify rules if exists and run request if validate pass.
     *
     * @param path
     * @param rules
     * @param fields
     * @param callback
     * @private
     */
    _verifyAndRun(path, rules = {}, fields = {}, callback) {
        let validation = new Validator(fields, rules);
        if (validation.passes()) {
            let req = this._makeRequest(path, fields);
            req.then(function (result) {
                callback(result)
            });
        } else {
            console.error(validation.errors.all());
        }
    }

    /**
     * Main function of sending curl request
     * @param path
     * @param fields
     * @returns {Promise}
     * @private
     */
    _makeRequest(path, fields = {}) {
        fields.api_key = this.apiKey;
        const options = {
            method: 'POST',
            url: `${this.endpoint}/${path}`,
            qs: fields
        };

        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                    throw new Error(`Can't proceed request ${error}`);
                }
                try {
                    const res = JSON.parse(body);
                    resolve(res.find(e => !!e));
                }catch(e) {
                    let resp = {
                        success: false,
                        data: [],
                        errors: [ 'Failed To Parse Response As JSON' ],
                        response: {
                            code: 500,
                            description: 'Response Not JSON: '+body,
                        },
                    }
                    resolve(resp);
                }
            });
        })
    }

}
