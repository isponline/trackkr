$('document').ready(function(){
    ymaps.ready(function(){
        var imei = $('.unit-imei').text();
        var unit_map;
        $.getJSON('/api/location.json?imei='+imei)
            .done(function(data){
                var recentpos = [data.latitude, data.longitude];
                unit_map = new ymaps.Map("unit-map", {
                        center: recentpos,
                        zoom: 10
                    });

                unit_map.controls
                    .add('zoomControl', { left: 5, top: 5 })
                    .add('typeSelector')
                    .add('mapTools', { left: 35, top: 5 });

                unit_map.geoObjects.add(
                    new ymaps.Placemark(
                        [data.latitude, data.longitude], {
                            balloonContentHeader: data.name,
                            balloonContentBody: data.timestamp
                        }
                    ));
            })
            .fail(function(jqxhr, textStatus, error) {
                $('.notifications')
                    .removeClass('alert alert-error alert-success')
                    .addClass('alert alert-error')
                    .html('jQXHR query error occured');
            });
    });
});
