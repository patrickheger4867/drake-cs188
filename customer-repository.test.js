const uuid = require('uuid');

const {
    selectCustomers,
    selectCustomerByCustomerId
} = require('../repositories/customer-repository');

describe('customer repository', () => {
    let firstCustomerId,
        secondCustomerId,
        expectedFirstName,
        expectedLastName,
        expectedEmail,
        expectedFirstCustomer,
        expectedSecondCustomer;

    beforeEach(() => {
        firstCustomerId = '4r5thgfd-5467-1j34-dr4g-asdfghjkl123';
        secondCustomerId = 'asoritgh-asdf-1qsd-ht45-1234567890lk';
        expectedEmail = 'WHAZAPPBRUH@gmail.com';

        expectedFirstCustomer = {
            'customer_id': firstCustomerId,
            'first_name': expectedFirstName,
            'last_name': expectedLastName,
            'email': expectedEmail
        };

        expectedSecondCustomer = {
            'customer_id': secondCustomerId,
            'first_name': expectedFirstName,
            'last_name': expectedLastName,
            'email': expectedEmail
        }
    });


    describe('selectCustomers', () => {
        it('should return all the customers', () => {
            const actualCustomers = selectCustomers();
            const [actualFirstCustomer, actualSecondCustomer] = actualCustomers.rows;

            expect(actualFirstCustomer).toEqual(expectedFirstCustomer);
            expect(actualSecondCustomer).toEqual(expectedSecondCustomer);
        });
    });
});

    describe('selectCustomerByCustomerId', () => {
        it('should return a specific customer by customerId', () => {
            const actualFirstCustomer = selectCustomerByCustomerId(firstCustomerId);

            expect(actualFirstCustomer).toEqual({
                'customer_id':firstCustomerId,
                'first_name': expectedFirstName,
                'last_name': expectedLastName,
                'email':expectedEmail
            });

            const actualSecondCustomer = selectCustomerByCustomerId;
            
            expect(actualSecondCustomer).toEqual({
                'customer_id':secondCustomerId,
                'first_name': expectedFirstName,
                'last_name': expectedLastName,
                'email':expectedEmail
            });
        });
    });


