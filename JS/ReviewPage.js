document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.getElementById("reviewForm");
    const reviewsContainer = document.getElementById("reviews");
    const editModal = document.getElementById("editModal");
    const closeModal = document.getElementById("closeModal");
    const saveChanges = document.getElementById("saveChanges");

    let editIndex = null; // Track the index of the review being edited

    // Load reviews from localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem("courseReviews")) || [];
        reviewsContainer.innerHTML = ""; // Clear the container before loading

        // Sort reviews by highest rating first
        reviews.sort((a, b) => b.rating - a.rating);

        reviews.forEach((review, index) => {
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("review");
            reviewElement.innerHTML = `
                <h4>${review.course}</h4>
                <p>${"⭐".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
                <p>${review.text}</p>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            reviewsContainer.appendChild(reviewElement);
        });

        // Add event listeners to edit and delete buttons
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function () {
                openEditModal(this.getAttribute("data-index"));
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                deleteReview(this.getAttribute("data-index"));
            });
        });
    }

    // Handle Form Submission (Adding a new review)
    reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const courseName = document.getElementById("course_name").value;
        const rating = parseInt(document.getElementById("rating").value);
        const reviewText = document.getElementById("review").value;

        if (courseName && rating && reviewText) {
            const newReview = { course: courseName, rating: rating, text: reviewText };

            let reviews = JSON.parse(localStorage.getItem("courseReviews")) || [];
            reviews.push(newReview);
            localStorage.setItem("courseReviews", JSON.stringify(reviews));

            loadReviews(); // Refresh the list
            reviewForm.reset(); // Clear form after submission
        }
    });

    // Open Edit Modal
    function openEditModal(index) {
        let reviews = JSON.parse(localStorage.getItem("courseReviews")) || [];
        let review = reviews[index];

        document.getElementById("editCourseName").value = review.course;
        document.getElementById("editRating").value = review.rating;
        document.getElementById("editReviewText").value = review.text;

        editIndex = index;
        editModal.style.display = "block";
    }

    // Save Changes (Editing a review)
    saveChanges.addEventListener("click", function () {
        let reviews = JSON.parse(localStorage.getItem("courseReviews")) || [];

        reviews[editIndex] = {
            course: document.getElementById("editCourseName").value,
            rating: parseInt(document.getElementById("editRating").value),
            text: document.getElementById("editReviewText").value
        };

        localStorage.setItem("courseReviews", JSON.stringify(reviews));
        editModal.style.display = "none"; // Close modal
        loadReviews(); // Refresh review list
    });

    // Close Edit Modal
    closeModal.addEventListener("click", function () {
        editModal.style.display = "none";
    });

    // Delete Review with Confirmation
    function deleteReview(index) {
        let reviews = JSON.parse(localStorage.getItem("courseReviews")) || [];
        const confirmDelete = confirm("Are you sure you want to delete this review?");

        if (confirmDelete) {
            reviews.splice(index, 1); // Remove review at index
            localStorage.setItem("courseReviews", JSON.stringify(reviews));
            loadReviews(); // Refresh the list
        }
    }

    // Load reviews on page load
    loadReviews();
});

