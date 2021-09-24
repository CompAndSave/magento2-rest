'use strict';

const path = "/cache";

/**
 * Cache helper
 * 
 * Functions:
 * - Magento2.cache.flush() | flush cache
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    flush: ()=> service.post(`${path}/flush`)
  };
}