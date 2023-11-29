document.addEventListener('DOMContentLoaded', (e) => {
    let back_button = document.querySelector("#backBtn");

    back_button.addEventListener('click', (e) => {
        document.location = "/";
    });
});