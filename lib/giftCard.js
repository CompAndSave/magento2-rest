'use strict';

const path = "/giftcard";

/**
 * Gift card helper - Customized endpoint
 * 
 * Functions:
 * - Magento2.giftCard.create() | Create a gift card
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    create: (data)=> service.post(`${path}`, data)
  };
}