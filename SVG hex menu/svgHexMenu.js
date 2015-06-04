$(document).ready(function() {
    var lup     = $('.left .up svg'),   
        ldown   = $('.left .down svg'),   
        cup     = $('.center .up svg'),   
        cmid    = $('.center .middle svg'),   
        cdown   = $('.center .down svg'),   
        rup     = $('.right .up svg'),   
        rdown   = $('.right .down svg'); 

    function press(k) {
        k.css('flex', '0 0 127%');
    }

    function release(k) {
        k.css('flex', '0 0 130%');
    }

    
    $('*').keydown(function (e) {
        var k = e.which;
        switch (k) {
            case 74: // j 
            case 83: // s 
                press(ldown);
                break;        
            case 75: // k 
            case 68: // d 
                press(cdown);             
                break;          
            case 76: // l 
            case 70: // f
                press(rdown);            
                break;
            case 85: // u 
            case 87: // w
                press(lup);            
                break;
            case 73: // e 
            case 69: // i
                press(cup);            
                break;
            case 79: // r 
            case 82: // o
                press(rup);            
                break;
            case 13: // space
            case 32: // enter
                press(cmid );            
                break;
        }
    });

    $('*').keyup(function (e) {
        var k = e.which;
        switch (k) {
            case 74: // j 
            case 83: // s 
                release(ldown);
                break;        
            case 75: // k 
            case 68: // d 
                release(cdown);             
                break;          
            case 76: // l 
            case 70: // f
                release(rdown);            
                break;
            case 85: // u 
            case 87: // w
                release(lup);            
                break;
            case 73: // e 
            case 69: // i
                release(cup);            
                break;
            case 79: // r 
            case 82: // o
                release(rup);            
                break;
            case 13: // space
            case 32: // enter
                release(cmid);            
                break;
        }
    });
});