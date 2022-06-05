export default class Utils {

   static inputSelectedDateAndCurrentTime(utcDate:Date){
    if(!this.isIsoUtcDate(utcDate.toLocaleString())){
      const date = utcDate;
      let inputDate = date;
      let currentDate = new Date();
      
      let out = new Date(
        inputDate.setHours(
          currentDate.getHours(),
          currentDate.getMinutes(),
          currentDate.getSeconds()
        )
      );
      inputDate = out;
    }
  }

  static isIsoUtcDate(str:string) {
     if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
       var d = new Date(str); 
       return d.toISOString()===str;
   }

}