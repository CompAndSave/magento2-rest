'use strict';

const path = "/order-status";

/**
 * Order status bulk update
 * 
 * Functions:
 * - Magento2.orderStatus.bulkUpdate() | Customized endpoint - supports multiple order status update
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    bulkUpdate: (data)=> service.post(`${path}/bulk-update`, data)
  };
}