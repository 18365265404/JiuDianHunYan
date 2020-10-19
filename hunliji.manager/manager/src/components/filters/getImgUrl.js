
    export const getImgUrl=file=>{
        var url = null ;
        if (window.createObjectURL!=undefined) 
        { // basic
        url = window.createObjectURL(file) ;
        }
        else if (window.URL!=undefined) 
        {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
        } 
        else if (window.webkitURL!=undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
      }
      export const date=time=>{
        var d=new Date();
        d.setTime(time);
        return `${d.getFullYear()}-${fillzero(d.getMonth()+1)}-${fillzero(d.getDate())}`;
      }