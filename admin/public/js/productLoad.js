const $ = (element) => document.getElementById(element);
console.log('---------<-<-<-<-<-<-<-<-<-<<-<-<-')
window.addEventListener('load', function(){

$("id_products").addEventListener("change",function(){
    console.log('---------<-<-<-<-<-<-<-<-<-<<-<-<-')
    $("id_header").innerHTML+='<input type="button" value="">'
})

})