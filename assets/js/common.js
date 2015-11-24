/**
 * Created by Dudarev on 24.11.2015.
 */
$(function () {
    $('#address').on('keyup', function () {
        var $this = $(this),
            $parent = $this.parent(),
            value = $this.val();

        if (value.length > 0) {
            debounce(function () {
                sendRequest(value, $parent);
            }, 300);
        }
    });

    function sendRequest(value, $container) {
        var url = '/address-suggest-search.php?find=' + decodeURI(value),
            request = $.ajax(url);

        request.success(function (data) {
            var addresses = JSON.parse(data)[0],
                color = 'yellow';

            if (addresses.length == 0) {
                color = 'red';
            } else if (addresses.length == 1) {
                color = 'green';
            }

            $container.css("background-color", color);
        });
    }
});