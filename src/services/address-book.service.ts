import {AbstractApiService} from "@/services/abstract-api.service";

class AddressBookService extends AbstractApiService {

    constructor() {
        super('');
    }

    getAddresses = () => {
        const params = {}
        return this.http
            .get('',{params: params})
            .then()
            .catch((error) => console.log(error))
    }

}

export const addressBookService: AddressBookService = new AddressBookService();