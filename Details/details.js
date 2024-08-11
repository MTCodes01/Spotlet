document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.querySelector(".dark-mode-toggle");
    const body = document.body;
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const dropdown = document.querySelector(".dropdown");

    function applyTheme(theme) {
        if (theme === "dark") {
            body.classList.add("dark-mode");
            darkModeToggle.textContent = "☀️";
        } else {
            body.classList.remove("dark-mode");
            darkModeToggle.textContent = "🌙";
        }
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme("dark");
    }

    darkModeToggle.addEventListener("click", () => {
        const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    });

    hamburgerMenu.addEventListener("click", () => {
        dropdown.classList.toggle("show");
    });

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const hostelId = getQueryParam("id");

    if (!hostelId) {
        window.location.href = "../Home/index.html";
        return;
    }

    fetch("../hostels.json")
        .then((response) => response.json())
        .then((data) => {
            const hostel = data.find((h) => h.id == hostelId);

            if (!hostel) {
                window.location.href = "../Home/index.html";
                return;
            }

            document.querySelector("#hostelName").textContent = hostel.name;
            document.querySelector("#hostelPrice").textContent = `₹${hostel.price} / month`;
            document.querySelector("#hostelDistance").textContent = hostel.distance;
            document.querySelector("#hostelGender").textContent = hostel.gender;

            const amenities = [
                { id: 'washingMachines', checkId: 'washingMachinesCheck' },
                { id: 'filteredWater', checkId: 'filteredWaterCheck' },
                { id: 'hotWater', checkId: 'hotWaterCheck' },
                { id: 'parking', checkId: 'parkingCheck' },
                { id: 'security', checkId: 'securityCheck' },
                { id: 'cctv', checkId: 'cctvCheck' }
            ];

            amenities.forEach(amenity => {
                const isAvailable = hostel.common_details[amenity.id] === 'Yes';
                const checkElement = document.getElementById(amenity.checkId);
                checkElement.classList.add(isAvailable ? 'success-checkmark' : 'crosssign');
            });

            // Single Room Details
            const singleRoomAmenities = [
                // { id: 'available', checkId: 'singleRoomAvailableCheck', value: hostel.single_room.available },
                { id: 'bed_type.single.available', checkId: 'singleBedSingleCheck', value: hostel.single_room.bed_type.single.available },
                { id: 'bed_type.double.available', checkId: 'singleBedDoubleCheck', value: hostel.single_room.bed_type.double.available },
                { id: 'ac', checkId: 'singleRoomACCheck', value: hostel.single_room.ac },
                { id: 'furniture', checkId: 'singleRoomFurnitureCheck', value: hostel.single_room.furniture },
                { id: 'bathroom_facilities.private_bathroom', checkId: 'singlePrivateBathroomCheck', value: hostel.single_room.bathroom_facilities.private_bathroom },
                { id: 'bathroom_facilities.shared_bathroom', checkId: 'singleSharedBathroomCheck', value: hostel.single_room.bathroom_facilities.shared_bathroom }
            ];

            singleRoomAmenities.forEach(amenity => {
                const checkElement = document.getElementById(amenity.checkId);
                const isAvailable = amenity.value === 'Yes';
                checkElement.classList.add(isAvailable ? 'success-checkmark' : 'crosssign');
            });

            // Shared Room Details
            const sharedRoomAmenities = [
                // { id: 'available', checkId: 'sharedRoomAvailableCheck', value: hostel.shared_room.available },
                { id: 'bed_type.single.available', checkId: 'sharedBedSingleCheck', value: hostel.shared_room.bed_type.single.available },
                { id: 'bed_type.double.available', checkId: 'sharedBedDoubleCheck', value: hostel.shared_room.bed_type.double.available },
                { id: 'ac', checkId: 'sharedRoomACCheck', value: hostel.shared_room.ac },
                { id: 'furniture', checkId: 'sharedRoomFurnitureCheck', value: hostel.shared_room.furniture },
                { id: 'bathroom_facilities.private_bathroom', checkId: 'sharedPrivateBathroomCheck', value: hostel.shared_room.bathroom_facilities.private_bathroom },
                { id: 'bathroom_facilities.shared_bathroom', checkId: 'sharedSharedBathroomCheck', value: hostel.shared_room.bathroom_facilities.shared_bathroom }
            ];

            sharedRoomAmenities.forEach(amenity => {
                const checkElement = document.getElementById(amenity.checkId);
                const isAvailable = amenity.value === 'Yes';
                checkElement.classList.add(isAvailable ? 'success-checkmark' : 'crosssign');
            });

            // Populate image gallery
            const imageGallery = document.querySelector(".image-gallery");
            hostel.images.forEach((imageSrc) => {
                const img = document.createElement("img");
                img.src = imageSrc;
                img.alt = hostel.name;
                imageGallery.appendChild(img);
            });
        })
        .catch((error) => console.error("Error fetching hostel details:", error));
});
