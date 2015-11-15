$(function () {
    var origin = $('.origin');
    var cartesian = $('.cartesian');

//    var width = $('.cartesian').
    var height = $('.cartesian .up').outerHeight();

    origin.on('mousedown', function (e) {

        var x0 = e.pageX;
        var y0 = e.pageY;

        console.log(x0 + "  " + y0);

        cartesian.on('mousemove', function (e) {

            var x = e.pageX;
            var y = e.pageY;

            moveOrigin(x, x0, y, y0);
        });

        $('body').on('mouseup', function () {
            cartesian.off('mousemove');
        });
    });

    function moveOrigin(x, x0, y, y0) {
        var newHeight = height + (y - y0);
       // console.log("%d %d", height, newHeight);
        $('.cartesian .up').css('flex', newHeight + 'px');
    }
})
