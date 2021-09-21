function drawgraph(nval,wval,dval,cval,chartcontainer,gcontainer){
    var chartcanvas=document.getElementById(chartcontainer);
    var chartwrapper=chartcanvas.parentNode;
    chartcanvas.setAttribute('width',window.getComputedStyle(chartwrapper).width);
    chartcanvas.setAttribute('height',window.getComputedStyle(chartwrapper).height);
    var ctxchart=chartcanvas.getContext('2d');
    var mychart=new Chart(ctxchart,{
        type:'doughnut',
        responsive:true,
        data:{
            datasets:[{
                backgroundColor:['green','yellow','red'],
                data:[nval,wval,dval]
            }]
        },
        options:{
            legend:{
                display:false
            },
            circumference:Math.PI
        }
    });
    ctxchart.translate(3*chartcanvas.width/8,3*chartcanvas.height/8);
    ctxchart.rotate(3*Math.PI/2);
    ctxchart.translate(-3*chartcanvas.width/8,-3*chartcanvas.height/8);
    var image=new Image();
    image.src="barr1.png";
    image.onerror=function(){alert(image.src='failed');}
    image.onload=draw;
    var rotation=1;
    var deg=(mychart.options.circumference*180)/Math.PI;
    window.requestAnimationFrame(draw);
    function draw(){
        maxrotation=cval*deg/(mychart.data.datasets[0].data[0]*mychart.data.datasets[0].data[1]*mychart.data.datasets[0].data[2]);
        var gaugemetercanvas=document.getElementById(gcontainer);
        var gaugemeterwrapper=gaugemetercanvas.parentNode;
        gaugemetercanvas.setAttribute('width',window.getComputedStyle(gaugemeterwrapper).width);
        gaugemetercanvas.setAttribute('height',window.getComputedStyle(gaugemeterwrapper).height);
        var ctxgaugemeter=gaugemetercanvas.getContext('2d');
        const centerx=gaugemetercanvas.width/2, centery=gaugemetercanvas.height/2;
        ctxgaugemeter.translate(centerx,centerx);
        ctxgaugemeter.rotate(Math.PI/4);
        ctxgaugemeter.translate(-centerx,-centerx);
        ctxgaugemeter.drawImage(image,0,0,100,100);
        ctxgaugemeter.translate(centerx,centery);
        if(rotation <= maxrotation){
            ctxgaugemeter.rotate(rotation*Math.PI/180); 
            ctxgaugemeter.translate(-centerx,-centerx);
            ctxgaugemeter.drawImage(image,0,0,100,100);
            rotation+=1.01;
        }
        else{
            ctxgaugemeter.rotate(maxrotation*Math.PI/180); 
            ctxgaugemeter.translate(-centerx,-centerx);
            ctxgaugemeter.drawImage(image,0,0,100,100);
            return;
        }
        window.requestAnimationFrame(draw);

    }
}