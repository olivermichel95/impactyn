var profilePage = $("#profile_page");
var profileDetailsPage = profilePage.find("#profile_details_page");
var profilePaymentPage = profilePage.find("#profile_payment_page");

$(document).ready(function() {
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

    // profile details page
    if (profileDetailsPage.length > 0) {
        // images uploaded
        initAllImageUploaders();

        // add product
        $("#add_product_btn").on("click", function() {
            let lastProduct = profileDetailsPage.find(".products-section .product").last();
            lastProduct.clone().insertAfter(lastProduct);
            let lastAddedProduct = profileDetailsPage.find(".products-section .product").last();
            lastAddedProduct.addClass("empty");
            let newInputs = lastAddedProduct.find("input");
            newInputs.each(function() {
                $(this).val('');
            });
            lastAddedProduct.find(".product-images").attr("data-images", "[]");
            lastAddedProduct.find(".product-images .image-uploader").remove();
            lastAddedProduct.find("button[type='submit']").attr("disabled", true);
            initImageUploaders(lastAddedProduct.find(".product-images"));
            adjustProductsInputs();

            var allProducts = profileDetailsPage.find(".products-section .product");
            allProducts.each(function(index) {
                let firstChildTextInputId = $(allProducts[0]).find("input[type=text]").attr("id");
                if (index == allProducts.length - 1) {
                    let currentTextInput = $(this).find("input[type=text]");
                    currentTextInput.attr("id", firstChildTextInputId + `_${index}`);
                    currentTextInput.closest(".form-group").find("label").attr("for", currentTextInput.attr("id"));
                }
            });
        });

        adjustProductsInputs();
    }
});

function initAllImageUploaders() {
    initImageUploaders(profileDetailsPage.find(".page-section.brand-logos-section"));
    initImageUploaders(profileDetailsPage.find(".products-section .product .product-images"));
}

function initImageUploaders(uploadedImagesContainer) {
    if (uploadedImagesContainer.length > 0) {
        if (uploadedImagesContainer.length > 1) {
            uploadedImagesContainer.each(function() {
                initImageUploader($(this));
            })
        } else {
            initImageUploader(uploadedImagesContainer);
        }
    }
}

function initImageUploader(uploadedImagesContainer) {
    let preloadedImages = uploadedImagesContainer.data("images");
    uploadedImagesContainer.imageUploader({
        preloaded: preloadedImages
    });

    // add images btn
    uploadedImagesContainer.find(".add-item-btn").on("click", function() {
        uploadedImagesContainer.find(".image-uploader").click();
    });
}

function adjustProductsInputs() {
    var productUploadImagesContainer = profileDetailsPage.find(".products-section .product .product-images");
    if (productUploadImagesContainer.length > 0) {
        if (productUploadImagesContainer.length > 1) {
            productUploadImagesContainer.each(function() {
                adjustSingleProduct($(this));
            });
        } else {
            adjustSingleProduct(productUploadImagesContainer);
        }
    }
}

function adjustSingleProduct(productUploadImagesContainer) {
    var product = productUploadImagesContainer.closest(".product");
    var productNameInput = product.find("input[name='product-names[]']");
    var imagesInput = productUploadImagesContainer.find("input[name='images[]']");
    var submitBtn = product.find("button[type='submit']");
    var deleteImageBtn = productUploadImagesContainer.find(".uploaded .uploaded-image .delete-image");

    // if inputs are empty
    if (!productNameInput.val() && !imagesInput.val()) {
        product.addClass("empty");
    }
    if (product.hasClass("empty")) {
        submitBtn.attr("disabled", true);
    }

    if (deleteImageBtn.length > 0) {
        if (deleteImageBtn.length > 1) {
            deleteImageBtn.each(function() {
                $(this).on("mouseup", function() {
                    var uploadedImagesLength = $(this).closest(".image-uploader").find(".uploaded-image").length;
                    if (uploadedImagesLength - 1 == 0) {
                        if (!productNameInput.val()) {
                            product.addClass("empty");
                        }
                        if (product.hasClass("empty")) {
                            submitBtn.attr("disabled", true);
                        } else {
                            submitBtn.attr("disabled", false);
                        }
                    }
                });
            });
        }
    }

    imagesInput.on("change", function() {
        if (!productNameInput.val() && !$(this).val()) {
            product.addClass("empty");
        } else {
            product.removeClass("empty");
        }

        if (product.hasClass("empty")) {
            submitBtn.attr("disabled", true);
        } else {
            submitBtn.attr("disabled", false);
        }
    });

    productNameInput.on("input", function() {
        if (!productUploadImagesContainer.find(".image-uploader").hasClass("has-files") && !$(this).val()) {
            product.addClass("empty");
        } else {
            product.removeClass("empty");
        }

        if (product.hasClass("empty")) {
            submitBtn.attr("disabled", true);
        } else {
            submitBtn.attr("disabled", false);
        }
    });
}