'use strict';

const path = "/customer";

/**
 * Customer helper
 * 
 * Functions:
 * - Magento2.customer.setPassword() | Set a new password - Customized endpoint
 * - Magento2.customer.getBalance() | Get the gift card and store credit balance - Customized endpoint
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    setPassword: (data)=> service.post(`${path}/setPassword`, data),
    getBalance: (data)=> service.get(`${path}/balance`, data)
  };
}