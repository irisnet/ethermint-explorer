$(function () {
    function page(i) {
        $(".looding").fadeIn(100);
        $.getJSON('/service/page/' + i, function (json) {
            $("#page").children().remove();
            $(".looding").fadeOut(100);
            json.data.forEach(function (v, k) {

                $("#page").append('<div class="title_list_warp title_list_flex">' +
                    '<div>' + v.svc_cd + '</div>' +
                    '<div>' + v.svc_name + '</div>' +
                    '<div><a href="CNN_BBC">' + v.auth + '</a></div>' +
                    '<div>' + v.block_type + '</div>' +
                    '<div>' + v.auth + '</div>' +
                    '<div>' + getDate(v.createtime) + '</div>' +
                    '<div>' + getDate(v.updatetime) + '</div>' +
                    '<div><a target="_blank" href="/service/detail/' + v.id + '"><img src="/img/service_select.png"></a></div>' +
                    '</div>');
            })
            $('.M-box2').pagination({
                totalData: json.total,
                showData: 10,
                coping: true,
                current: i,
                callback: function (api) {
                    page(api.getCurrent());
                }
            });
        });

    }

    function getDate(date) {
        var date = new Date(date * 1000);//如果date为10位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
    }

    page(1);
    $(".model-warp input").live('focus', function () {
        $(this).parents('.model-warp').addClass('model-warp-selected')
    })
    $(".model-warp input").live('blur', function () {
        $(this).parents('.model-warp').removeClass('model-warp-selected')
    })

    $("#create_service").click(function () {
        $("#create").fadeIn(100);
        $("body").addClass('body')
    })
    $(".modal-close,.cancel").click(function () {
        $("#create").fadeOut(100);
        $("body").removeClass('body')
        $.each($(".model-warp input"), function (v, k) {
            $(this).val('');
        });
        $("textarea").val('');
    })
    $(".save").click(function () {

        var saveBool = false;
        var model = [];
        $.each($(".model-warp input"), function (k, v) {

            if (k !== 4) {
                if ($(this).val().trim() === '') {
                    saveBool = true;
                }
            }
            model.push($(this).val())

        });
        if (!saveBool && $('textarea').val().trim() != '') {
            $(".looding").fadeIn(100);
            model.push($('textarea').val())
            $.post('/service/save/', {model: model}, function (result) {
                $(".looding").fadeOut(100);
                if (result === '成功') {
                    $(".cancel").click();
                    $(".modal-done").fadeIn(100, function () {
                        setTimeout(function () {
                            $(".modal-done").fadeOut(100);
                        }, 1000)
                    })
                } else {
                    $(".modal-failed").fadeIn(100, function () {
                        setTimeout(function () {
                            $(".modal-failed").fadeOut(100);
                        }, 1000)
                    })
                }
            });
        }

    })
});