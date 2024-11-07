$(document).ready(function() {
    //======================================================TELEPHONE INPUT================================================================
    //assign the value to the hidden input of phone
    var phoneDropdownInput = $(".input-style-1.phone-dropdown");
    phoneDropdownInput.find("input[type=hidden]").val(phoneDropdownInput.find("select").val());
    phoneDropdownInput.find("select").on('change', function(e) {
        let hiddenInput = $(this).closest(".inputs-container").find("input[type=hidden]");
        let telInputValue = $(this).closest(".inputs-container").find("input[type=tel]").val();
        hiddenInput.val($(this).val() + telInputValue);
    });

    phoneDropdownInput.find("input[type=tel]").on("input", function() {
        let hiddenInput = $(this).closest(".inputs-container").find("input[type=hidden]");
        hiddenInput.val(phoneDropdownInput.find("select").val());
        let hiddenInputCurrentValue = hiddenInput.val();
        let hiddenInputNewValue = hiddenInputCurrentValue + $(this).val();
        hiddenInput.val(hiddenInputNewValue);
    });
    //======================================================END TELEPHONE INPUT================================================================


    //======================================================RADIO 2 INPUT================================================================
    $(".radio.radio-style-2 input").each(function() {
        if ($(this).is(":checked")) {
            $(this).closest(".radio.radio-style-2").addClass("checked");
        }
    });
    $(".radio.radio-style-2 input").on("change", function(e) {
        var $this = $(this);
        $this.closest(".radio.radio-style-2").addClass("checked");
        var otherRadios = $(".radio.radio-style-2").not($this.closest(".radio.radio-style-2"))
        if (otherRadios.length > 1) {
            otherRadios.each(function() {
                if ($(this).find("input").attr("name") == $this.attr("name")) {
                    $(this).removeClass("checked");
                }
            });
        } else {
            if (otherRadios.find("input").attr("name") == $this.attr("name")) {
                otherRadios.removeClass("checked");
            }
        }
    });
    //======================================================END RADIO 2 INPUT================================================================

    //======================================================RADIO 3 INPUT================================================================
    $(".radio.radio-style-3 input").each(function() {
        if ($(this).is(":checked")) {
            $(this).closest(".radio.radio-style-3").addClass("checked");
        }
    });
    $(".radio.radio-style-3 input").on("change", function(e) {
        var $this = $(this);
        $this.closest(".radio.radio-style-3").addClass("checked");
        var otherRadios = $(".radio.radio-style-3").not($this.closest(".radio.radio-style-3"))
        if (otherRadios.length > 1) {
            otherRadios.each(function() {
                if ($(this).find("input").attr("name") == $this.attr("name")) {
                    $(this).removeClass("checked");
                }
            });
        } else {
            if (otherRadios.find("input").attr("name") == $this.attr("name")) {
                otherRadios.removeClass("checked");
            }
        }
    });
    //======================================================END RADIO 3 INPUT================================================================

    //======================================================INPUT TWO DATE AND TIME================================================================
    var inputTwo = $(".input-style-2");
    if (inputTwo.length > 0) {
        if (inputTwo.length > 1) {
            inputTwo.each(function() {
                if ($(this).hasClass("date")) {
                    $(this).find("input").datepicker({
                        viewMode: 'years',
                        autoclose: true
                    });
                } else if ($(this).hasClass("time")) {
                    $(this).find("input").datepicker({
                        viewMode: 'years',
                        autoclose: true
                    });
                }
            });
        } else {
            if (inputTwo.hasClass("date")) {
                inputTwo.find("input").datepicker({
                    viewMode: 'years',
                    autoclose: true
                });
            } else if (inputTwo.hasClass("time")) {
                inputTwo.find("input").datepicker({
                    viewMode: 'years',
                    autoclose: true
                });
            }
        }
    }
    //======================================================END INPUT TWO DATE AND TIME================================================================
});