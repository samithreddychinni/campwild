// Filter functionality
const filterForm = document.querySelector(".filter-form")
const destinationCards = document.querySelectorAll(".destination-card")
const paginationContainer = document.querySelector(".pagination")

// Destinations data (in a real app, this would come from a database)
const allDestinations = [
  {
    id: "1",
    title: "Mountain Retreat",
    location: "Rocky Mountains",
    description: "Our flagship property nestled in nature and by a pristine lake with stunning mountain views.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "mountains",
    price: "₹8,300/night",
    amenities: ["Wi-Fi", "Hot Showers", "Electricity", "Pet Friendly"],
    activities: ["hiking", "fishing", "wildlife", "adventure"],
  },
  {
    id: "2",
    title: "Lakeside Haven",
    location: "Blue Lake Region",
    description: "Our newest tented campsite in a 1000 acre forest reserve with direct lake access.",
    image:
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "lakes",
    price: "₹7,000/night",
    amenities: ["Hot Showers", "Fishing", "Swimming"],
    activities: ["fishing", "swimming", "wildlife", "adventure"],
  },
  {
    id: "3",
    title: "Forest Camp",
    location: "Redwood Forest",
    description: "Immerse yourself in the tranquility of ancient redwoods with our cozy forest cabins.",
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "forests",
    price: "₹6,200/night",
    amenities: ["Wi-Fi", "Hot Showers", "Hiking Trails"],
    activities: ["hiking", "wildlife", "adventure"],
  },
  {
    id: "4",
    title: "Beach Camp",
    location: "Pacific Coast",
    description: "Fall asleep to the sound of waves at this beautiful beachside camping location.",
    image:
      "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "beaches",
    price: "₹7,500/night",
    amenities: ["Hot Showers", "Swimming", "Surfing"],
    activities: ["swimming", "adventure"],
  },
  {
    id: "5",
    title: "Desert Oasis",
    location: "Mojave Desert",
    description: "Experience the magic of desert nights in our luxury glamping tents with private pools.",
    image:
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "deserts",
    price: "₹9,100/night",
    amenities: ["Wi-Fi", "Air Conditioning", "Private Pool", "Stargazing"],
    activities: ["stargazing", "adventure", "glamping"],
  },
  {
    id: "6",
    title: "Treehouse Retreat",
    location: "Evergreen Forest",
    description: "Live among the treetops in our custom-built luxury treehouses with panoramic views.",
    image: "https://images.pexels.com/photos/2480608/pexels-photo-2480608.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "forests",
    price: "₹12,400/night",
    amenities: ["Wi-Fi", "Hot Showers", "Electricity", "Breakfast"],
    activities: ["hiking", "wildlife", "adventure", "glamping"],
  },
  {
    id: "7",
    title: "Mountain Lodge",
    location: "Sierra Nevada",
    description: "A cozy mountain lodge with stunning views and access to premium hiking trails.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "mountains",
    price: "₹9,900/night",
    amenities: ["Wi-Fi", "Hot Showers", "Fireplace", "Restaurant"],
    activities: ["hiking", "wildlife", "adventure", "glamping"],
  },
  {
    id: "8",
    title: "River Campground",
    location: "Colorado River",
    description: "Camp along the scenic Colorado River with excellent fishing and rafting opportunities.",
    image:
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "lakes",
    price: "₹5,400/night",
    amenities: ["Fishing", "Rafting", "Campfire Pits"],
    activities: ["fishing", "adventure"],
  },
  {
    id: "9",
    title: "Coastal Retreat",
    location: "Oregon Coast",
    description: "Luxury cabins with ocean views and private beach access on the beautiful Oregon coast.",
    image:
      "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "beaches",
    price: "₹10,800/night",
    amenities: ["Wi-Fi", "Hot Tub", "Beach Access", "Gourmet Kitchen"],
    activities: ["swimming", "adventure", "glamping"],
  },
]

// Pagination settings
let currentPage = 1
const itemsPerPage = 6
let filteredDestinations = [...allDestinations]

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Check for activity filter in URL
  const urlParams = new URLSearchParams(window.location.search)
  const activityFilter = urlParams.get("activity")

  if (activityFilter) {
    // Pre-filter destinations by activity
    filteredDestinations = allDestinations.filter(
      (destination) => destination.activities && destination.activities.includes(activityFilter),
    )

    // Update UI to show active filter
    const activityName = activityFilter.charAt(0).toUpperCase() + activityFilter.slice(1)
    const filterHeading = document.querySelector(".destinations-list h2")
    if (filterHeading) {
      filterHeading.textContent = `${activityName} Destinations`
    }
  }

  displayDestinations(filteredDestinations, currentPage)
  setupPagination(filteredDestinations)

  // Add event listener for filter form
  if (filterForm) {
    filterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get filter values
      const region = document.getElementById("region").value
      const accommodation = document.getElementById("accommodation").value
      const price = document.getElementById("price").value
      const amenities = document.getElementById("amenities").value

      // Filter destinations
      filteredDestinations = allDestinations.filter((destination) => {
        // Activity filter from URL
        if (activityFilter && (!destination.activities || !destination.activities.includes(activityFilter))) {
          return false
        }

        // Region filter
        if (region && destination.category !== region) {
          return false
        }

        // Price filter (simplified for demo)
        if (price) {
          const destinationPrice = Number.parseInt(destination.price.replace(/\D/g, ""))
          if (price === "budget" && destinationPrice > 70) return false
          if (price === "moderate" && (destinationPrice < 70 || destinationPrice > 100)) return false
          if (price === "premium" && (destinationPrice < 100 || destinationPrice > 130)) return false
          if (price === "luxury" && destinationPrice < 130) return false
        }

        // Amenities filter
        if (amenities && !destination.amenities.some((a) => a.toLowerCase().includes(amenities.toLowerCase()))) {
          return false
        }

        return true
      })

      // Reset to first page and update display
      currentPage = 1
      displayDestinations(filteredDestinations, currentPage)
      setupPagination(filteredDestinations)

      // Scroll to results
      document.querySelector(".destinations-list").scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }

  // Add event listeners for pagination
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("page-link") || e.target.closest(".page-link")) {
      e.preventDefault()
      const pageLink = e.target.classList.contains("page-link") ? e.target : e.target.closest(".page-link")
      const pageNum = pageLink.getAttribute("data-page")

      if (pageNum === "next") {
        currentPage++
      } else if (pageNum === "prev") {
        currentPage--
      } else {
        currentPage = Number.parseInt(pageNum)
      }

      displayDestinations(filteredDestinations, currentPage)
      setupPagination(filteredDestinations)

      // Scroll to top of results
      document.querySelector(".destinations-list").scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })

  // Make destination cards clickable
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".destination-card")
    if (card) {
      const link = card.querySelector("a").getAttribute("href")
      // Don't trigger if clicking on the button itself
      if (!e.target.closest("a")) {
        window.location.href = link
      }
    }
  })
})

// Function to display destinations
function displayDestinations(destinations, page) {
  const destinationsGrid = document.querySelector(".destinations-grid")
  if (!destinationsGrid) return

  // Calculate start and end indices
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedDestinations = destinations.slice(startIndex, endIndex)

  // Clear the grid
  destinationsGrid.innerHTML = ""

  if (paginatedDestinations.length === 0) {
    destinationsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px;">
        <h3>No destinations found</h3>
        <p>Try adjusting your filters to see more results.</p>
      </div>
    `
    return
  }

  // Add destinations to the grid
  paginatedDestinations.forEach((destination) => {
    const card = document.createElement("div")
    card.className = "destination-card"
    card.setAttribute("data-category", destination.category)

    card.innerHTML = `
      <div class="destination-image">
        <img src="${destination.image}" alt="${destination.title}" onerror="this.onerror=null; this.src='https://via.placeholder.com/800x500?text=${encodeURIComponent(destination.title)}'; console.log('Image failed to load, using placeholder');">
        ${destination.id === "1" || destination.id === "5" ? '<div class="destination-badge">Popular</div>' : ""}
      </div>
      <div class="destination-content">
        <h3>${destination.title}</h3>
        <div class="destination-meta">
          <span><i class="fas fa-map-marker-alt"></i> ${destination.location}</span>
          <span><i class="fas fa-tag"></i> ${destination.price}</span>
        </div>
        <p>${destination.description}</p>
        <div class="destination-amenities">
          ${destination.amenities
            .map((amenity) => {
              let icon = "fa-check"
              if (amenity.toLowerCase().includes("wi-fi")) icon = "fa-wifi"
              if (amenity.toLowerCase().includes("shower")) icon = "fa-shower"
              if (amenity.toLowerCase().includes("electricity")) icon = "fa-plug"
              if (amenity.toLowerCase().includes("pet")) icon = "fa-paw"
              if (amenity.toLowerCase().includes("swimming")) icon = "fa-swimming-pool"
              if (amenity.toLowerCase().includes("fishing")) icon = "fa-fish"
              if (amenity.toLowerCase().includes("hiking")) icon = "fa-hiking"
              if (amenity.toLowerCase().includes("air")) icon = "fa-snowflake"
              if (amenity.toLowerCase().includes("pool")) icon = "fa-swimming-pool"
              if (amenity.toLowerCase().includes("breakfast")) icon = "fa-coffee"

              return `<span title="${amenity}"><i class="fas ${icon}"></i></span>`
            })
            .join("")}
        </div>
        <a href="destination-detail.html?id=${destination.id}" class="btn btn-primary">View Details</a>
      </div>
    `

    destinationsGrid.appendChild(card)
  })

  // Make all cards the same height and align buttons
  equalizeCardHeights()
}

// Function to set up pagination
function setupPagination(destinations) {
  if (!paginationContainer) return

  const totalPages = Math.ceil(destinations.length / itemsPerPage)

  // Clear pagination
  paginationContainer.innerHTML = ""

  // Don't show pagination if there's only one page
  if (totalPages <= 1) return

  // Previous button
  if (currentPage > 1) {
    paginationContainer.innerHTML += `<a href="#" class="page-link" data-page="prev"><i class="fas fa-chevron-left"></i> Prev</a>`
  }

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      paginationContainer.innerHTML += `<a href="#" class="page-link active" data-page="${i}">${i}</a>`
    } else {
      paginationContainer.innerHTML += `<a href="#" class="page-link" data-page="${i}">${i}</a>`
    }
  }

  // Next button
  if (currentPage < totalPages) {
    paginationContainer.innerHTML += `<a href="#" class="page-link next" data-page="next">Next <i class="fas fa-chevron-right"></i></a>`
  }
}

// Function to equalize card heights and align buttons
function equalizeCardHeights() {
  const cards = document.querySelectorAll(".destination-card")
  let maxHeight = 0

  // Reset heights
  cards.forEach((card) => {
    card.style.height = "auto"
  })

  // Find max height
  cards.forEach((card) => {
    maxHeight = Math.max(maxHeight, card.offsetHeight)
  })

  // Set all cards to max height
  cards.forEach((card) => {
    card.style.height = `${maxHeight}px`
  })

  // Make all buttons align at the bottom
  cards.forEach((card) => {
    const content = card.querySelector(".destination-content")
    const button = card.querySelector(".btn")

    if (content && button) {
      content.style.display = "flex"
      content.style.flexDirection = "column"
      content.style.height = "100%"
      button.style.marginTop = "auto"
    }
  })
}

// Table sorting functionality
const comparisonTable = document.querySelector(".comparison-table table")

if (comparisonTable) {
  const headers = comparisonTable.querySelectorAll("th")

  headers.forEach((header, index) => {
    // Skip the first column (destination names)
    if (index === 0) return

    header.style.cursor = "pointer"
    header.title = "Click to sort"

    // Add sort icon
    const sortIcon = document.createElement("i")
    sortIcon.className = "fas fa-sort"
    sortIcon.style.marginLeft = "5px"
    sortIcon.style.opacity = "0.5"
    header.appendChild(sortIcon)

    // Add click event
    header.addEventListener("click", function () {
      sortTable(index)

      // Update sort icons
      headers.forEach((h) => {
        const icon = h.querySelector("i")
        if (icon) {
          icon.className = "fas fa-sort"
          icon.style.opacity = "0.5"
        }
      })

      // Update current sort icon
      sortIcon.style.opacity = "1"
      if (this.asc) {
        sortIcon.className = "fas fa-sort-up"
      } else {
        sortIcon.className = "fas fa-sort-down"
      }
    })
  })
}

// Table sorting function
function sortTable(columnIndex) {
  const table = document.querySelector(".comparison-table table")
  let switching = true
  let rows, shouldSwitch, i
  let direction = "asc"
  let switchcount = 0

  // Get the header element
  const header = table.querySelector(`th:nth-child(${columnIndex + 1})`)

  // Toggle sort direction
  if (header.asc) {
    direction = header.asc ? "desc" : "asc"
  }

  while (switching) {
    switching = false
    rows = table.rows

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false

      const x = rows[i].getElementsByTagName("td")[columnIndex]
      const y = rows[i + 1].getElementsByTagName("td")[columnIndex]

      if (direction === "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true
          break
        }
      } else {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true
          break
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
      switching = true
      switchcount++
    } else {
      if (switchcount === 0 && direction === "asc") {
        direction = "desc"
        switching = true
      }
    }
  }

  // Store sort direction on the header
  header.asc = direction === "asc"
}

// Handle window resize
window.addEventListener("resize", () => {
  equalizeCardHeights()
})

