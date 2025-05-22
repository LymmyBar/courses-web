(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Courses carousel
    $(".courses-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        dots: false,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
    });


    // Related carousel
    $(".related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });



    document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/courses/')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('courses-container');
            data.forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
                container.appendChild(courseElement);
            });
        })
        .catch(error => console.error('Error fetching courses:', error));

    const courseForm = document.getElementById('course-form');
    courseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(courseForm);
        fetch('/api/courses/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Course added:', data);
            // Optionally, refresh the course list or update the UI
        })
        .catch(error => console.error('Error adding course:', error));
    });
    const deleteButtons = document.querySelectorAll('.delete-course');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const courseId = event.target.dataset.courseId;
            fetch(`/api/courses/${courseId}/`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    console.log('Course deleted:', courseId);
                    // Optionally, refresh the course list or update the UI
                } else {
                    console.error('Error deleting course:', response.statusText);
                }
            })
            .catch(error => console.error('Error deleting course:', error));
        });
    });
    const updateButtons = document.querySelectorAll('.update-course');
    updateButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const courseId = event.target.dataset.courseId;
            const formData = new FormData();
            formData.append('title', 'Updated Course Title');
            formData.append('description', 'Updated Course Description');
            fetch(`/api/courses/${courseId}/`, {
                method: 'PUT',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Course updated:', data);
                // Optionally, refresh the course list or update the UI
            })
            .catch(error => console.error('Error updating course:', error));
        });
    });
    const courseSearch = document.getElementById('course-search');
    courseSearch.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        fetch('/api/courses/')
            .then(response => response.json())
            .then(data => {
                const filteredCourses = data.filter(course => course.title.toLowerCase().includes(query));
                const container = document.getElementById('courses-container');
                container.innerHTML = '';
                filteredCourses.forEach(course => {
                    const courseElement = document.createElement('div');
                    courseElement.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
                    container.appendChild(courseElement);
                });
            })
            .catch(error => console.error('Error fetching courses:', error));
    });
    const courseFilter = document.getElementById('course-filter');
    courseFilter.addEventListener('change', (event) => {
        const filterValue = event.target.value;
        fetch('/api/courses/')
            .then(response => response.json())
            .then(data => {
                const filteredCourses = data.filter(course => course.category === filterValue);
                const container = document.getElementById('courses-container');
                container.innerHTML = '';
                filteredCourses.forEach(course => {
                    const courseElement = document.createElement('div');
                    courseElement.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
                    container.appendChild(courseElement);
                });
            })
            .catch(error => console.error('Error fetching courses:', error));
    });
    const courseSort = document.getElementById('course-sort');
    courseSort.addEventListener('change', (event) => {
        const sortValue = event.target.value;
        fetch('/api/courses/')
            .then(response => response.json())
            .then(data => {
                const sortedCourses = data.sort((a, b) => {
                    if (sortValue === 'asc') {
                        return a.title.localeCompare(b.title);
                    } else {
                        return b.title.localeCompare(a.title);
                    }
                });
                const container = document.getElementById('courses-container');
                container.innerHTML = '';
                sortedCourses.forEach(course => {
                    const courseElement = document.createElement('div');
                    courseElement.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
                    container.appendChild(courseElement);
                });
            })
            .catch(error => console.error('Error fetching courses:', error));
    });
    const coursePagination = document.getElementById('course-pagination');
    coursePagination.addEventListener('click', (event) => {
        const page = event.target.dataset.page;
        fetch(`/api/courses/?page=${page}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('courses-container');
                container.innerHTML = '';
                data.results.forEach(course => {
                    const courseElement = document.createElement('div');
                    courseElement.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
                    container.appendChild(courseElement);
                });
            })
            .catch(error => console.error('Error fetching courses:', error));
    });
    const courseDetails = document.getElementById('course-details');
    courseDetails.addEventListener('click', (event) => {
        const courseId = event.target.dataset.courseId;
        fetch(`/api/courses/${courseId}/`)
            .then(response => response.json())
            .then(data => {
                const detailsContainer = document.getElementById('course-details-container');
                detailsContainer.innerHTML = `<h3>${data.title}</h3><p>${data.description}</p>`;
            })
            .catch(error => console.error('Error fetching course details:', error));
    });
    const courseEnroll = document.getElementById('course-enroll');
    courseEnroll.addEventListener('click', (event) => {
        const courseId = event.target.dataset.courseId;
        fetch(`/api/courses/${courseId}/enroll/`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Enrolled in course:', data);
            // Optionally, update the UI to show enrollment status
        })
        .catch(error => console.error('Error enrolling in course:', error));
    });
    const courseUnenroll = document.getElementById('course-unenroll');
    courseUnenroll.addEventListener('click', (event) => {
        const courseId = event.target.dataset.courseId;
        fetch(`/api/courses/${courseId}/unenroll/`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Unenrolled from course:', data);
            // Optionally, update the UI to show unenrollment status
        })
        .catch(error => console.error('Error unenrolling from course:', error));
    });
    const courseRating = document.getElementById('course-rating');
    courseRating.addEventListener('change', (event) => {
        const rating = event.target.value;
        const courseId = event.target.dataset.courseId;
        fetch(`/api/courses/${courseId}/rate/`, {
            method: 'POST',
            body: JSON.stringify({ rating: rating }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Course rated:', data);
            // Optionally, update the UI to show new rating
        })
        .catch(error => console.error('Error rating course:', error));
    });
    const courseReview = document.getElementById('course-review');
    courseReview.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(courseReview);
        const courseId = formData.get('course_id');
        fetch(`/api/courses/${courseId}/review/`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Course review submitted:', data);
            // Optionally, update the UI to show new review
        })
        .catch(error => console.error('Error submitting course review:', error));
    });
    const courseWishlist = document.getElementById('course-wishlist');
    courseWishlist.addEventListener('click', (event) => {
        const courseId = event.target.dataset.courseId;
        fetch(`/api/courses/${courseId}/wishlist/`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Course added to wishlist:', data);
            // Optionally, update the UI to show wishlist status
        })
        .catch(error => console.error('Error adding course to wishlist:', error));
    });
    const courseRemoveFromWishlist = document.getElementById('course-remove-from-wishlist');
    courseRemoveFromWishlist.addEventListener('click', (event) => {
        const courseId = event.target.dataset.courseId;
        fetch(`/api/courses/${courseId}/remove-from-wishlist/`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Course removed from wishlist:', data);
            // Optionally, update the UI to show wishlist status
        })
        .catch(error => console.error('Error removing course from wishlist:', error));
    }
    );
    const courseCategoryFilter = document.getElementById('course-category-filter');
    courseCategoryFilter.addEventListener('change', (event) => {
        const category = event.target.value;
        fetch(`/api/courses/?category=${category}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('courses-container');
                container.innerHTML = '';
                data.forEach(course => {
                    const courseElement = document.createElement('div');
                    courseElement.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
                    container.appendChild(courseElement);
                });
            })
            .catch(error => console.error('Error fetching courses:', error));
    }
    );
    const courseSearchButton = document.getElementById('course-search-button');
    courseSearchButton.addEventListener('click', (event) => {
        const query = document.getElementById('course-search-input').value;
        fetch(`/api/courses/?search=${query}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('courses-container');
                container.innerHTML = '';
                data.forEach(course => {
                    const courseElement = document.createElement('div');
                    courseElement.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
                    container.appendChild(courseElement);
                });
            })
            .catch(error => console.error('Error fetching courses:', error));
    }
    );
    const courseSortButton = document.getElementById('course-sort-button');
    courseSortButton.addEventListener('click', (event) => {
        const sort = document.getElementById('course-sort-input').value;
        fetch(`/api/courses/?sort=${sort}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('courses-container');
                container.innerHTML = '';
                data.forEach(course => {
                    const courseElement = document.createElement('div');
                    courseElement.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
                    container.appendChild(courseElement);
                });
            })
            .catch(error => console.error('Error fetching courses:', error));
    }
    );
    const coursePaginationButton = document.getElementById('course-pagination-button');
    coursePaginationButton.addEventListener('click', (event) => {
        const page = document.getElementById('course-pagination-input').value;
        fetch(`/api/courses/?page=${page}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('courses-container');
                container.innerHTML = '';
                data.results.forEach(course => {
                    const courseElement = document.createElement('div');
                    courseElement.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
                    container.appendChild(courseElement);
                });
            })
            .catch(error => console.error('Error fetching courses:', error));
    }
    );
    const courseDetailsButton = document.getElementById('course-details-button');
    courseDetailsButton.addEventListener('click', (event) => {
        const courseId = document.getElementById('course-details-input').value;
        fetch(`/api/courses/${courseId}/`)
            .then(response => response.json())
            .then(data => {
                const detailsContainer = document.getElementById('course-details-container');
                detailsContainer.innerHTML = `<h3>${data.title}</h3><p>${data.description}</p>`;
            })
            .catch(error => console.error('Error fetching course details:', error));
    }
    );
    const courseEnrollButton = document.getElementById('course-enroll-button');
    courseEnrollButton.addEventListener('click', (event) => {
        const courseId = document.getElementById('course-enroll-input').value;
        fetch(`/api/courses/${courseId}/enroll/`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Enrolled in course:', data);
            // Optionally, update the UI to show enrollment status
        })
        .catch(error => console.error('Error enrolling in course:', error));
    }
    );
    const courseUnenrollButton = document.getElementById('course-unenroll-button');
    courseUnenrollButton.addEventListener('click', (event) => {
        const courseId = document.getElementById('course-unenroll-input').value;
        fetch(`/api/courses/${courseId}/unenroll/`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Unenrolled from course:', data);
            // Optionally, update the UI to show unenrollment status
        })
        .catch(error => console.error('Error unenrolling from course:', error));
    }
    );
    const courseRatingButton = document.getElementById('course-rating-button');
    courseRatingButton.addEventListener('click', (event) => {
        const rating = document.getElementById('course-rating-input').value;
        const courseId = document.getElementById('course-rating-course-id').value;
        fetch(`/api/courses/${courseId}/rate/`, {
            method: 'POST',
            body: JSON.stringify({ rating: rating }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Course rated:', data);
            // Optionally, update the UI to show new rating
        })
        .catch(error => console.error('Error rating course:', error));
    }
    );
    const courseReviewButton = document.getElementById('course-review-button');
    courseReviewButton.addEventListener('click', (event) => {
        const formData = new FormData(document.getElementById('course-review-form'));
        const courseId = formData.get('course_id');
        fetch(`/api/courses/${courseId}/review/`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Course review submitted:', data);
            // Optionally, update the UI to show new review
        })
        .catch(error => console.error('Error submitting course review:', error));
    }
    );
    const courseWishlistButton = document.getElementById('course-wishlist-button');
    courseWishlistButton.addEventListener('click', (event) => {
        const courseId = document.getElementById('course-wishlist-input').value;
        fetch(`/api/courses/${courseId}/wishlist/`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Course added to wishlist:', data);
            // Optionally, update the UI to show wishlist status
        })
        .catch(error => console.error('Error adding course to wishlist:', error));
    }
    );
    const courseRemoveFromWishlistButton = document.getElementById('course-remove-from-wishlist-button');
    courseRemoveFromWishlistButton.addEventListener('click', (event) => {
        const courseId = document.getElementById('course-remove-from-wishlist-input').value;
        fetch(`/api/courses/${courseId}/remove-from-wishlist/`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Course removed from wishlist:', data);
            // Optionally, update the UI to show wishlist status
        })
        .catch(error => console.error('Error removing course from wishlist:', error));
    }
    );
    const courseCategoryFilterButton = document.getElementById('course-category-filter-button');
    courseCategoryFilterButton.addEventListener('click', (event) => {
        const category = document.getElementById('course-category-filter-input').value;
        fetch(`/api/courses/?category=${category}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('courses-container');
                container.innerHTML = '';
                data.forEach(course => {
                    const courseElement = document.createElement('div');
                    courseElement.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
                    container.appendChild(courseElement);
                });
            })
            .catch(error => console.error('Error fetching courses:', error));
    }
    );
    
});
    
})(jQuery);

