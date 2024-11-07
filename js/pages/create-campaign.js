var stepOneContainer = $("#pills-step-one");
var stepTwoContainer = $("#pills-step-two");
var stepThreeContainer = $("#pills-step-three");
var stepFourContainer = $("#pills-step-four");
$(document).ready(function() {
    // validate form
    $("#create_campaign_form").validate();

    // date picker
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
                    $(this).find("input").pickatime();
                }
            });
        } else {
            if (inputTwo.hasClass("date")) {
                inputTwo.find("input").datepicker({
                    viewMode: 'years',
                    autoclose: true
                });
            } else if (inputTwo.hasClass("time")) {
                inputTwo.find("input").pickatime();
            }
        }
    }

    // drag images
    stepOneContainer.find(".drop-images-area").imageUploader();
    drawImageUploaderPart();

    // radio 3
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

    // color picker
    stepOneContainer.find(".colorpicker-input").spectrum();

    //enable and disable sections using checkboxes
    var sectionCheckbox = stepOneContainer.find(".checkbox.section-checkbox input");
    if (sectionCheckbox.length > 0) {
        if (sectionCheckbox.length > 1) {
            sectionCheckbox.each(function() {
                var toggleSection = $(this).closest(".section-box").find(".toggle-section");
                if ($(this).is(":checked")) {
                    toggleSectionState(toggleSection, false);
                }
                $(this).on("change", function() {
                    if ($(this).is(":checked")) {
                        toggleSectionState(toggleSection, false);
                    } else {
                        toggleSectionState(toggleSection, true);
                    }
                });
            });
        } else {
            var toggleSection = sectionCheckbox.closest(".section-box").find(".toggle-section");
            if (sectionCheckbox.is(":checked")) {
                toggleSectionState(toggleSection, false);
            }
            sectionCheckbox.on("change", function() {
                if (sectionCheckbox.is(":checked")) {
                    toggleSectionState(toggleSection, false);
                } else {
                    toggleSectionState(toggleSection, true);
                }
            });
        }
    }

    // radio 2
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

    // tags
    stepThreeContainer.find(".tags-input").each(function() {
        $(this).tagsinput();
    })

    // drop images in step three
    stepThreeContainer.find(".drop-images-container").imageUploader();
    stepThreeContainer.find(".page-subtitle-container.images-section .add-images-btn").on("click", function() {
        stepThreeContainer.find(".image-uploader").click();
    });

    //on clicking on a completed tab
    // $(".tab.tab-style-2 .nav-link").on("click", function() {
    //     if ($(this).hasClass("completed")) {
    //         $(this).removeClass("completed");
    //     }
    // });

    // on clicking save and next
    var nextStepBtns = $(".next-step-btn");
    nextStepBtns.each(function() {
        $(this).on("click", function() {
            let stepContainer = $(this).closest(".tab-pane");
            if (isStepValid(stepContainer)) {
                let stepId = stepContainer.attr("id");
                let stepTab = $(`a[href='#${stepId}']`);
                let nextStepTab = stepTab.closest(".nav-item").next().find(".nav-link");
                if (nextStepTab.length > 0) {
                    stepTab.addClass("completed");
                    nextStepTab.removeClass("disabled").click();
                }
            } else {
                displayAlertMessage("error", "Please fill all the required fields before proceeding to the next step");
            }
        });
    });
});

function drawImageUploaderPart() {
    var mainContainer = stepOneContainer.find(".drop-images-area .image-uploader .upload-text");

    let imgIcon = $('<i>').attr({
        class: "convert-svg img-icon",
        "data-src": "images/icons/image-icon.svg",
    });

    let areaText = ($("<p>", { class: "area-text", text: "Drag your campaign image here to start uploading." }));
    let otherOptionText = ($("<p>", { class: "other-option-text", text: "OR" }));
    let customFileUploadContainer = $("<label>", { class: "custom-file-upload" });
    let labelText = $("<span>", { text: "Browse files" });

    mainContainer.empty();
    labelText.appendTo(customFileUploadContainer);
    imgIcon.appendTo(mainContainer);
    areaText.appendTo(mainContainer);
    otherOptionText.appendTo(mainContainer);
    customFileUploadContainer.appendTo(mainContainer);

    svgIcon = mainContainer.find("i.convert-svg");
    convertSvgToIcon(svgIcon);
}

function toggleSectionState(section, isDisabled) {
    if (isDisabled) {
        section.addClass("disabled");
    } else {
        section.removeClass("disabled");
    }
    let sectionInputs = section.find("input");
    if (sectionInputs.length > 0) {
        if (sectionInputs.length > 1) {
            sectionInputs.each(function() {
                $(this).attr("disabled", isDisabled);
            });
        } else {
            sectionInputs.attr("disabled", isDisabled);
        }
    }
}

function isStepValid(stepContainer) {
    var stepInputs = stepContainer.find("input, textarea, select");
    var returnValue = true;
    stepInputs.each(function() {
        if (typeof $(this).attr("required") !== "undefined" && $(this).attr("required") !== false) {
            if ($(this).val() == "" || $(this).val() == null || $(this).val() == "undefined") {
                returnValue = false;
            }
        }
    });

    return returnValue;
}