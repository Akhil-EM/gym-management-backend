module.exports = {
    getWeek: function()
    {  
        var current =new Date();     // get current date    
        var weekstart = current.getDate() - current.getDay();    
        var weekend = weekstart + 6;       // end day is the first day + 6 
        var monday= (new Date(current.setDate(weekstart))+"").substring(0,15)
        var sunday = (new Date(current.setDate(weekend))+"").substring(0,15)
        return(monday+"-"+sunday)
    },
    convertTime12to24:function(time12h) {
        const [time, modifier] = time12h.split(' ');
      
        let [hours, minutes] = time.split(':');
      
        if (hours === '12') {
          hours = '00';
        }
      
        if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12;
        }
      
        return `${hours}:${minutes}`;
      },
      getdate:function(){
        // var current =new Date();     // get current date    
        // var strDate = current.toDateString();
        return strDate="Sat Aug 08 2020";
      }
      
 
    // printDate: function()
    // {
    //     console.log(Date());        
    // },
 
    // pi: 3.14,
     
    // a:[0,1,2,3,4,5,6,7,8,9]
}
