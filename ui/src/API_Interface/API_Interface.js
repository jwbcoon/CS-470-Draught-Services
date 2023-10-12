import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(user_id) {
        return axiosAgent.get(`login/${user_id}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }

    async allMarkets() {
        return axiosAgent.get(`markets/all-markets`);
    }

    async getMarketByMarketID(marketID) {
        return axiosAgent.get(`markets/${marketID}`);
    }

    async allRoutes() {
        return axiosAgent.get(`routes/all-routes`);
    }

    async routesWithID(routeID) {
        return axiosAgent.get(`routes/${routeID}`);
    }

    async allAccounts() {
        return axiosAgent.get(`accounts/all-accounts`);
    }

    async getAccountByAccountID(accountID) {
        return axiosAgent.get(`accounts/${accountID}`);
    }

    async getViewSelectionData() {
        return axiosAgent.get(`view-update/selections`);
    }

    async getViewSelectionMaxes() {
        return axiosAgent.get(`view-update/maxes`);
    }

    async getTransactions(limit) {
        return axiosAgent.get(`transactions/${limit}/all-transactions`);
    }

    async getTransactionCountPerCycle({cycleID}) {
        return axiosAgent.get(`transactions/${cycleID}`);
    }

    async getTransactionsPerCycleByAccountID({cycleID, accountID}) {
        return axiosAgent.get(`transactions/${cycleID}/${accountID}/one-account`);
    }

    async getTransactionsPerCycleByRouteID({cycleID, routeID}) {
        return axiosAgent.get(`transactions/${cycleID}/${routeID}/trans-for-route`);
    }

    async getTransactionsPerCycleForAllRoutes({cycleID}) {
        return axiosAgent.get(`transactions/${cycleID}/all-routes`);
    }

    async getTransactionsPerCycleByMarketID({cycleID, marketID}) {
        return axiosAgent.get(`transactions/${cycleID}/${marketID}/trans-for-market`);
    }
}
