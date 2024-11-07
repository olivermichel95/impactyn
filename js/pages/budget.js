$(document).ready(function() {
    var tableTwo = $(".table.table-style-2");

    tableTwo.find("td.file-input").each(function() {
        $(this).find("input[type=file]").on("change", function() {
            let uploadedFileName = $(this).val().split('\\').pop();
            let label = $(this).closest(".custom-file-upload").find("span");
            label.text(uploadedFileName);
            if ($(this).val() == "") {
                label.text("UPLOAD");
            }
        });
    })
});