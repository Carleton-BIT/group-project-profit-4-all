document.addEventListener("DOMContentLoaded", function () {
    const commentForms = document.querySelectorAll(".add-comment");

    commentForms.forEach((form) => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            // Get the comment text area inside this form
            const commentInput = this.querySelector("textarea");
            const commentText = commentInput.value.trim();

            if (commentText === "") {
                alert("Please enter a comment before posting.");
                return;
            }

            // Create a new comment div
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");

            // Get a random username for now (could be replaced with actual user data)
            const username = "User" + Math.floor(Math.random() * 1000);

            commentDiv.innerHTML = `
                <p><strong>${username}:</strong> ${commentText}</p>
            `;

            // Find the closest comment section and add the new comment
            const commentsSection = this.closest(".comments");
            commentsSection.appendChild(commentDiv);

            // Clear input after submission
            commentInput.value = "";
        });
    });
});
