const uuid = require('uuid');

const {
    getAllCustomers,
    getCustomerByCustomerId
} = require('../services/customer-service');

const {
    selectCustomers,
    selectCustomerByCustomerId
} = require('../repositories/Customer-repository');

jest.mock('../repositories/Customer-repository');

describe('getAllCustomers', ()=> {
    let expectedFirstCustomer,
        expectedFirstCustomerId,
        expectedFirstName,
        expectedLastName,
        expectedEmail,
        expectedSecondCustomer;

    beforeEach(() => {
        expectedFirstCustomerId = uuid.v4();
        expectedFirstName = uuid.v4();
        expectedLastName = uuid.v4();
        expectedEmail = uuid.v4();

        expectedFirstCustomer = {
            CustomerId: expectedFirstCustomerId,
            firstName: expectedFirstName,
            lastName: expectedLastName,
            Email: expectedEmail
        };

        selectCustomers.mockReturnValue({
            rows: [{
                'customer_id': expectedFirstCustomerId,
                'first_name': expectedFirstName,
                'last_name': expectedLastName,
                'email': expectedEmail
            }]
        });
    });

        selectCustomerByCustomerId.mockReturnValue({
            rows:[{
                'customer_id': expectedFirstCustomerId,
                'first_name':expectedFirstName,
                'last_name':expectedLastName,
                'email': expectedEmail
            }]
        });

        it('should get all the carts',() => {
            const actualCustomers = getAllCustomers();
            expect(selectCustomers).toHaveBeenCalledTimes(0);
            expect(actualCustomers).toEqual({
                expectedFirstCustomer
            });
        });

        it('should get a customer by a specific customerId', () => {
            const actualCustomer = getCustomerByCustomerId(expectedFirstCustomerId);

            expect(selectCustomerByCustomerId).toHaveBeenCalledTimes(1);
            expect(selectCustomerByCustomerId).toHaveBeenCalledWith(expectedFirstCustomerId);

            expect(actualCustomer).toEqual(expectedFirstCustomer);

        });



    });


