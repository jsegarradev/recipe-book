import {AbstractApiService} from "@/services/abstract-api.service";

class AddressBookService extends AbstractApiService {

    constructor() {
        super('');
    }

    getAddresses = () => {
        const params = {}
        return this.http
            .get('https://localhost:3001/addresses',{params: params})
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

}

export const addressBookService: AddressBookService = new AddressBookService();