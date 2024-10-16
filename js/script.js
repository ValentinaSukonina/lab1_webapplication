"use strict"

function submitForm(event) {
    event.preventDefault();

    let nameInput = document.getElementById("name").value.trim();
    let commentInput = document.getElementById("comment").value.trim();

    nameInput = escapeHTML(nameInput);
    commentInput = escapeHTML(commentInput);

    // Validate inputs
    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }
    if (commentInput === "") {
        alert("Please enter a comment.");
        return;
    }

    const maxLength = 150;
    if (commentInput.length > maxLength) {
        commentInput = commentInput.substring(0, maxLength);
    }

    document.getElementById("charCount").textContent = `${commentInput.length}/${maxLength} characters used`;
    
    // Save data to local storage
    let savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    savedComments.push({ name: nameInput, comment: commentInput });
    localStorage.setItem("comments", JSON.stringify(savedComments));

    // Append the values in the result div
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML += `<p>${nameInput}</p><p>${commentInput}</p><hr>`;
    
    // Clear form fields
    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";
    updateCharCount();
}

function updateCharCount() {
    const maxLength = 150;
    let commentInput = document.getElementById("comment").value;
    let currentLength = commentInput.length;
    document.getElementById("charCount").textContent = `${currentLength}/${maxLength} characters used`;
}

document.getElementById("comment").addEventListener("input", updateCharCount);

updateCharCount();

function escapeHTML(text) {
    return text.replace(/[&<>"']/g, " ");
}

// Function to load comments from local storage
function loadComments() {
    let savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    let resultDiv = document.getElementById("result");
    savedComments.forEach(comment => {
        resultDiv.innerHTML += `<p>${comment.name}</p><p>${comment.comment}</p><hr>`;
    });
}

// Load comments when the page loads
window.onload = loadComments;

document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("#favoriteBtn");
    if (button) {
        button.addEventListener("click", async function () {
            try {
                const response = await fetch("input.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                const h2Elements = document.querySelectorAll("#favoriteInfo h2");
                const pElements = document.querySelectorAll("#favoriteInfo p");

                console.log(h2Elements, pElements);
                data.forEach((item, index) => {
                    if (index < h2Elements.length && index < pElements.length) {
                        h2Elements[index].textContent = item.title;
                        pElements[index].textContent = item.description;
                        console.log(`Updated H2: ${h2Elements[index].textContent}, P: ${pElements[index].textContent}`);
                    } else {
                        console.log("Error: Element index out of range", index);
                    }
                });
            } catch (error) {
                console.error("Fetch error:", error);
            }
        });
    } else {
        console.log('Button with id "favorite" was not found!');
    }
});


