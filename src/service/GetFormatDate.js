function getFormatDate(date, format){
    var fullDate = null;
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장

    if(format === "yyyy-MM-dd") {
        fullDate = year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
    } else if (format === "yyyy-MM") {
        fullDate = year + '-' + month;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
    }
    
    return  fullDate     
}

export default getFormatDate;