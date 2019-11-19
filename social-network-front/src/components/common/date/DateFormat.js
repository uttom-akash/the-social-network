export const getDateTime=(date)=>{
    let dateObject=new Date(date)
    
    return `${dateObject.getHours()}:${dateObject.getMinutes()}  ${dateObject.getDate()}-${dateObject.getMonth()}-${dateObject.getFullYear()}`
}