'use strict';

const path = "/invoice";

/**
 * Order helper
 * 
 * Functions:
 * - Magento2.invoice.refund() | online refund an order
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    refund: (invoiceId, data)=> service.post(`${path}/${invoiceId}/refund`, data)
  };
}