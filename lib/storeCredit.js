'use strict';

const path = "/store-credit";

/**
 * Store credit helper - Customized endpoint
 * 
 * Functions:
 * - Magento2.storeCredit.update() | Update store credit
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    update: (data)=> service.post(`${path}`, data)
  };
}