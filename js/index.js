var swiper = new Swiper('.swiper', {
    spaceBetween: 0,
    centeredSlides: true,
    // effect: 'fade',
    autoplay: {
        delay: 1300,
        disableOnInteraction: true,
    },
    speed: 800,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        parallax: true,
    },
    autoplayDisableOnInteraction: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});

$(window).on('resize', function(){
    var width = $(window).width();
    if(width < 992){
        $('.wrHeader').removeClass('container');
        $('.wrHeader').addClass('container-fluid');
    } else {
        $('.wrHeader').addClass('container');
    }
 })

 var player = videojs('video-js');

 player.fill(true);
 player.fluid(true);

