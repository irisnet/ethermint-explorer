$(function () {
    $(".model-warp input").live('focus', function () {
        if ($(this).attr('id')) return;
        $(this).parents('.model-warp').addClass('model-warp-selected')
    })
    $(".model-warp input").live('blur', function () {
        if ($(this).attr('id')) return;
        $(this).parents('.model-warp').removeClass('model-warp-selected')
    })
    $("#service_detail_edit_amount,#service_detail_create_amount,#service_detail_edit_bind").live('focus', function () {
        $(this).parents('.model-warp').addClass('amount')
    })
    $("#service_detail_edit_amount,#service_detail_create_amount,#service_detail_edit_bind").live('blur', function () {
        $(this).parents('.model-warp').removeClass('amount')
    })
    $(".modal-close,.cancel").click(function () {
        $(".modal").fadeOut(100);
        $("body").removeClass('body')
        $.each($(this).parents('.model-war input'), function (v, k) {
            $(this).val('');
        });

    })
    $("#create_service").click(function () {
        $("#create").fadeIn(100);
        $("body").addClass('body')
    })
    $("#edit_service").click(function () {
        $("#edit").fadeIn(100);
        $("body").addClass('body')
    })
    $(".btnRed_blue").hover(function () {
        $(this).find('img').attr('src',"../../img/service-detail-update.png");
    },function () {
        $(this).find('img').attr('src',"../../img/detail-update.png");
    })
})