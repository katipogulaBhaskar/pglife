function fetchPropertyDetails(propertyId) {
    // Show loading animation while fetching data
    document.getElementById("loading").style.display = "block";

    fetch(`http://localhost:5000/api/user/${propertyId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error fetching property details");
            }
            return response.json();
        })
        .then(data => {
            // Hide loading animation
            document.getElementById("loading").style.display = "none";

            // Update DOM elements with fetched data
            document.getElementById("property-name").innerText = data.name;
            document.getElementById("property-address").innerText = data.address;
            document.getElementById("property-description").innerText = data.description;
            document.getElementById("property-rent").innerText = `Rs ${data.rent}/- per month`;
            document.getElementById("property-gender").innerHTML = `<img src="${data.genderIcon}" />`;
            document.getElementById("property-image").innerHTML = `<img src="${data.image}" alt="Property Image" />`;

            // Update ratings
            document.getElementById("rating-clean").innerText = `Cleanliness: ${data.rating.cleanliness}`;
            document.getElementById("rating-food").innerText = `Food Quality: ${data.rating.foodQuality}`;
            document.getElementById("rating-safety").innerText = `Safety: ${data.rating.safety}`;
        })
        .catch(error => {
            // Hide loading animation
            document.getElementById("loading").style.display = "none";

            console.error(error);
            alert("Failed to load property details. Please try again later.");
        });
}
