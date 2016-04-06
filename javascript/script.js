  
function modifValues(){

    var val = $('#progress progress').attr('value');

    if(val>=100){val=1;}

    var newVal = val*1+0.25;

    var txt = Math.floor(newVal)+'min';



    $('#progress progress').attr('value',newVal).text(txt);

    $('#progress strong').html(txt);

}

setInterval(function(){ modifValues(); },40);
