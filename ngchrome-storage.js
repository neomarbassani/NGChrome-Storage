/**
 * NGChrome Storage - Very simple Chrome Storage API
 * Author: Neomar Bassani @neomarbassani
 * Works with chrome localStorage ou chrome.sync
 * Version: 0.1
 */
 
angular.module('ngchrome-storage', [])
  
  .factory('ChromeStrg', [ '$q' ,function($q){
    return {
      local: true,
  
      useSync: function(){
        this.local = false;
      },
  
      useLocal: function(){
        this.local = true;
      },
  
      set: function(key, value, callback){
        if(this.local){
          localStorage.setItem(key, value);
        }else{
          var obj = {};
          obj[key] = value;
  
          chrome.storage.sync.set(obj, function(){
            if(callback)
              callback();
          });
        }
      },
  
      get: function(key) {
        if(this.local){
          return localStorage.getItem(key);
        }else{
          var deferred = $q.defer();
          chrome.storage.sync.get(key, function(data) {
            deferred.resolve(data[key]);
          });
          return deferred.promise;
        }
      },
  
      remove: function(key){
        this.set(key, '');
      }
    }
  }]);
