'use strict';

const path = "/orderDetails";

/**
 * Order details helper - Customized endpoint
 * 
 * Functions:
 * - Magento2.orderDetails.get() | get order details
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    get: (orderId)=> service.post(`${path}/${orderId}`)
  };
}