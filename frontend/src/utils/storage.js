class Storage {
 static storage = window.localStorage;

 static get(key) {
   return this.storage.getItem(key);
 }

 static set(key, value) {
   if(value instanceof Object){
     value = JSON.stringify(value);
   }
   this.storage.setItem(key, value);
   return true;
 }

 static remove(key) {
   this.storage.removeItem(key);
   return true;
 }
}

export default Storage