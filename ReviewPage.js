document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.querySelector("form");
    const reviewContainer = document.getElementById("reviews");

    if (reviewForm) {
        reviewForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Get form values
            const courseName = document.getElementById("course_name").value.trim();
            const rating = document.getElementById("rating").value;
            const reviewText = document.getElementById("review").value.trim();

            if (courseName === "" || reviewText === "") {
                alert("Please fill out all fields before submitting.");
                return;
            }

            // Create a new review div
            const reviewDiv = document.createElement("div");
            reviewDiv.classList.add("review");

            // Convert rating to stars
            let stars = "⭐".repeat(rating) + "☆".repeat(5 - rating);

            reviewDiv.innerHTML = `
                <h4>${courseName}</h4>
                <p>${stars}</p>
                <p>${reviewText}</p>
            `;

            // Add the new review to the page
            reviewContainer.prepend(reviewDiv);

            // Reset the form
            reviewForm.reset();
        });
    }
});
