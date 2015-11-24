/**
 * Created by Dudarev on 24.11.2015.
 */
$(function () {

    function getColor(count) {
        var color = 'yellow';

        if (count == 0) {
            color = 'red';
        } else if (count == 1) {
            color = 'green';
        }

        return color;
    }

    function sendRequest() {
        var $this = $(this),
            $parent = $this.parent(),
            value = $this.val();

        if (value.length > 0) {
            var url = '/address-suggest-search.php?find=' + decodeURI(value),
                request = $.ajax(url);

            request.success(function (data) {
                var addresses = JSON.parse(data)[0];

                if (addresses.length == 0) {
                    // Если не нашли в собственной БД -- ищем на яндексе
                    ymaps.geocode(value).then(function (res) {
                        var length = res.geoObjects.getLength(),
                            color = getColor(length);
                        $parent.css("background-color", color);
                    });
                } else {
                    // Нашли в собственной -- меняем цвет.
                    var color = getColor(addresses.length);
                    $parent.css("background-color", color);
                }
            });
        } else {
            $parent.css("background-color", 'inherit');
        }
    }

    $('#address').keyup($.debounce(sendRequest, 400));
});