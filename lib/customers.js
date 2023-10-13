'use strict';

const path = "/customers";

/**
 * Customer helper
 * 
 * Functions:
 * - Magento2.customers.get() | Get customer data by customer id
 * - Magento2.customers.update() | Update customer data by customer id
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    get: (id)=> service.get(`${path}/${id}`),
    update: (id, data)=> service.post(`${path}/${id}`, data)
  };
}