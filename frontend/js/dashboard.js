document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    // Populate user profile
    document.getElementById("userName").textContent = user.fullname;
    document.getElementById("userFullName").textContent = user.fullname;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userPhone").textContent = user.phone;
    document.getElementById("userCollege").textContent = user.college;

    // Fetch and display properties
    fetch(`http://localhost:5000/api/user/${user.email}/properties`)
        .then((response) => response.json())
        .then((properties) => {
            const propertiesContainer = document.getElementById("propertiesContainer");
            propertiesContainer.innerHTML = ""; // Clear loading message

            if (properties.length === 0) {
                propertiesContainer.innerHTML = "<p>No properties found.</p>";
                return;
            }

            properties.forEach((property) => {
                const propertyCard = `
                    <div class="property-card row">
                        <div class="image-container col-md-4">
                            <img src="${property.image}" />
                        </div>
                        <div class="content-container col-md-8">
                            <div class="row no-gutters justify-content-between">
                                <div class="star-container" title="${property.rating}">
                                    ${"★".repeat(Math.floor(property.rating))} 
                                    ${property.rating % 1 > 0 ? "☆" : ""}
                                </div>
                                <div class="interested-container">
                                    <i class="is-interested-image fas fa-heart" property_id="${property.id}"></i>
                                </div>
                            </div>
                            <div class="detail-container">
                                <div class="property-name">${property.name}</div>
                                <div class="property-address">${property.address}</div>
                            </div>
                            <div class="row no-gutters">
                                <div class="rent-container col-6">
                                    <div class="rent">Rs ${property.rent}/-</div>
                                    <div class="rent-unit">per month</div>
                                </div>
                                <div class="button-container col-6">
                                    <a href="detail.html?id=${property.id}" class="btn btn-primary">View</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                propertiesContainer.innerHTML += propertyCard;
            });
        })
        .catch((error) => {
            console.error("Error fetching properties:", error);
            document.getElementById("propertiesContainer").innerHTML = "<p>Error loading properties.</p>";
        });

    // Logout functionality
    document.getElementById("logoutButton").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    });
});
