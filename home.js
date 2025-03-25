
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot")
let currentSlide = 0
const slideInterval = 3000 

function showSlide(index) {
  
  slides.forEach((slide) => {
    slide.classList.remove("active")
  })

  
  dots.forEach((dot) => {
    dot.classList.remove("active")
  })

  
  slides[index].classList.add("active")
  dots[index].classList.add("active")

  
  currentSlide = index
}


let slideTimer = setInterval(() => {
  const nextSlide = (currentSlide + 1) % slides.length
  showSlide(nextSlide)
}, slideInterval)


dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    clearInterval(slideTimer)
    showSlide(index)

    
    slideTimer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length
      showSlide(nextSlide)
    }, slideInterval)
  })
})


const testimonials = document.querySelectorAll(".testimonial")
const prevButton = document.querySelector(".prev-testimonial")
const nextButton = document.querySelector(".next-testimonial")
let currentTestimonial = 0

function showTestimonial(index) {
  
  testimonials.forEach((testimonial) => {
    testimonial.classList.remove("active")
  })

  
  testimonials[index].classList.add("active")

  
  currentTestimonial = index
}


if (prevButton) {
  prevButton.addEventListener("click", () => {
    const prevTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length
    showTestimonial(prevTestimonial)
  })
}


if (nextButton) {
  nextButton.addEventListener("click", () => {
    const nextTestimonial = (currentTestimonial + 1) % testimonials.length
    showTestimonial(nextTestimonial)
  })
}


if (testimonials.length > 0) {
  setInterval(() => {
    const nextTestimonial = (currentTestimonial + 1) % testimonials.length
    showTestimonial(nextTestimonial)
  }, 5000) 
}


document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector('.search-box input[name="location"]')
  const searchForm = document.querySelector(".search-container form")

  if (searchInput) {
    
    const searchResultsContainer = document.createElement("div")
    searchResultsContainer.className = "search-results"
    searchInput.parentNode.appendChild(searchResultsContainer)

    
    const wrapper = document.createElement("div")
    wrapper.className = "search-location-wrapper"
    searchInput.parentNode.insertBefore(wrapper, searchInput)
    wrapper.appendChild(searchInput)
    wrapper.appendChild(searchResultsContainer)

    
    const destinations = [
      { id: 1, name: "Mountain Retreat", location: "Rocky Mountains" },
      { id: 2, name: "Lakeside Haven", location: "Blue Lake Region" },
      { id: 3, name: "Forest Camp", location: "Redwood Forest" },
      { id: 4, name: "Beach Camp", location: "Pacific Coast" },
      { id: 5, name: "Desert Oasis", location: "Mojave Desert" },
      { id: 6, name: "Treehouse Retreat", location: "Evergreen Forest" },
      { id: 7, name: "Mountain Lodge", location: "Sierra Nevada" },
      { id: 8, name: "River Campground", location: "Colorado River" },
      { id: 9, name: "Coastal Retreat", location: "Oregon Coast" },
    ]

    
    function findClosestMatch(input) {
      if (!input) return []

      input = input.toLowerCase()

      
      const exactMatches = destinations.filter(
        (dest) => dest.name.toLowerCase().includes(input) || dest.location.toLowerCase().includes(input),
      )

      if (exactMatches.length > 0) {
        return exactMatches
      }

      
      const threshold = 3 // Maximum edit distance to consider
      const closeMatches = destinations.filter((dest) => {
        const nameDistance = levenshteinDistance(input, dest.name.toLowerCase())
        const locationDistance = levenshteinDistance(input, dest.location.toLowerCase())
        return Math.min(nameDistance, locationDistance) <= threshold
      })

      return closeMatches
    }

    
    function levenshteinDistance(a, b) {
      if (a.length === 0) return b.length
      if (b.length === 0) return a.length

      const matrix = []

      
      for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i]
      }

      for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j
      }

      
      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1]
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1, // deletion
            )
          }
        }
      }

      return matrix[b.length][a.length]
    }

    
    searchInput.addEventListener("input", function () {
      const query = this.value.trim()
      const matches = findClosestMatch(query)

      
      searchResultsContainer.innerHTML = ""

      if (query.length > 0) {
        searchResultsContainer.classList.add("active")

        if (matches.length > 0) {
          
          matches.forEach((match) => {
            const resultItem = document.createElement("div")
            resultItem.className = "search-result-item"
            resultItem.textContent = `${match.name} - ${match.location}`
            resultItem.dataset.id = match.id

            resultItem.addEventListener("click", () => {
              searchInput.value = `${match.name} - ${match.location}`
              searchResultsContainer.classList.remove("active")
            })

            searchResultsContainer.appendChild(resultItem)
          })
        } else {
          
          const noResults = document.createElement("div")
          noResults.className = "search-error"
          noResults.textContent = "Sorry, destination is not available."
          searchResultsContainer.appendChild(noResults)
        }
      } else {
        searchResultsContainer.classList.remove("active")
      }
    })

    
    document.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) {
        searchResultsContainer.classList.remove("active")
      }
    })

    
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const query = searchInput.value.trim()
        const matches = findClosestMatch(query)

        if (matches.length > 0) {
          
          window.location.href = `destination-detail.html?id=${matches[0].id}`
        } else if (query.length > 0) {
          
          searchResultsContainer.innerHTML = ""
          const noResults = document.createElement("div")
          noResults.className = "search-error"
          noResults.textContent = "Sorry, destination is not available."
          searchResultsContainer.appendChild(noResults)
          searchResultsContainer.classList.add("active")
        }
      })
    }
  }

  
  const destinationCards = document.querySelectorAll(".destination-card")
  destinationCards.forEach((card) => {
    const link = card.querySelector("a").getAttribute("href")
    card.addEventListener("click", (e) => {
      
      if (!e.target.closest("a")) {
        window.location.href = link
      }
    })
  })

  
  const experienceItems = document.querySelectorAll(".experience-item")
  experienceItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const activityType = this.getAttribute("href").split("=")[1]
      window.location.href = `destinations.html?activity=${activityType}`
    })
  })
})

