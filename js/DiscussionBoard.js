document.addEventListener("DOMContentLoaded", function () {
    const commentForms = document.querySelectorAll(".add-comment");

    commentForms.forEach((form) => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const textArea = this.querySelector("textarea");
            const commentText = textArea.value.trim();

            if (commentText === "") return;

            const newComment = document.createElement("div");
            newComment.classList.add("comment");
            newComment.innerHTML = `<p><strong>You:</strong> ${commentText}</p>`;

            this.parentNode.insertBefore(newComment, this);
            textArea.value = "";
        });
    });
});
