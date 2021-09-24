'use strict';

const path = "/indexer";

/**
 * Cache helper
 * 
 * Functions:
 * - Magento2.indexer.reindex() | reindex
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    reindex: (data)=> service.post(`${path}/reindex`, data)
  };
}