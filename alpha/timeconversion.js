/**
 * Created by vimukthiw on 12/24/14.
 */


//console.log(convert(24733,122426,121426));

console.log(24);
console.log(024);

function convert(x,y,z){

    var seconds = getSec(x)+getSec(y)-getSec(z);
//    console.log(seconds);
//    console.log('this is the one',Math.floor(seconds/3600)+':'+Math.floor((seconds%3600)/60)+':'+seconds%60);
    return (Math.floor(seconds/3600)+':'+Math.floor((seconds%3600)/60)+':'+seconds%60);
}


function getSec(x){
    var h=Math.floor(x/10000);
    var m=Math.floor((x%10000)/100);
    var s=x%100;

//    console.log(h,m,s);
//    console.log(h*3600+m*60+s);
}
