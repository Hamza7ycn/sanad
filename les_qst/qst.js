// Improved FAQ functionality with better performance and accessibility
(function() {
    'use strict';
    
    // Cache DOM elements
    const faqQuestions = document.querySelectorAll('.faq-box-question');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    // FAQ functionality
    function initFAQ() {
        faqQuestions.forEach((question, index) => {
            // Add ARIA attributes for accessibility
            const answer = question.nextElementSibling;
            const questionId = `faq-question-${index}`;
            const answerId = `faq-answer-${index}`;
            
            question.setAttribute('id', questionId);
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('aria-controls', answerId);
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            
            if (answer) {
                answer.setAttribute('id', answerId);
                answer.setAttribute('aria-labelledby', questionId);
                answer.setAttribute('role', 'region');
                answer.style.maxHeight = '0px';
                answer.style.overflow = 'hidden';
                answer.style.transition = 'max-height 0.3s ease-out';
            }
            
            // Event listeners
            question.addEventListener('click', toggleFAQ);
            question.addEventListener('keydown', handleKeyPress);
        });
    }
    
    function toggleFAQ(event) {
        const question = event.currentTarget;
        const answer = question.nextElementSibling;
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        
        // Close all other FAQ items
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                const otherAnswer = otherQuestion.nextElementSibling;
                otherQuestion.setAttribute('aria-expanded', 'false');
                otherQuestion.classList.remove('active');
                if (otherAnswer) {
                    otherAnswer.style.maxHeight = '0px';
                }
            }
        });
        
        // Toggle current FAQ item
        question.setAttribute('aria-expanded', !isExpanded);
        question.classList.toggle('active');
        
        if (answer) {
            if (isExpanded) {
                answer.style.maxHeight = '0px';
            } else {
                // Calculate dynamic height
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        }
    }
    
    function handleKeyPress(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleFAQ(event);
        }
    }
    
    // Slider functionality (if elements exist)
    function initSlider() {
        if (!nextButton || !prevButton) return;
        
        const slideContainer = document.querySelector('.slide');
        if (!slideContainer) return;
        
        const items = slideContainer.querySelectorAll('.item');
        if (items.length === 0) return;
        
        let currentIndex = 0;
        
        function updateSlider() {
            items.forEach((item, index) => {
                item.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
            });
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateSlider();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateSlider();
        }
        
        // Event listeners
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
        
        // Initialize slider
        updateSlider();
        
        // Auto-slide (optional)
        // setInterval(nextSlide, 5000);
    }
    
    // Error handling
    function handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        // You can add user-friendly error messages here
    }
    
    // Initialize everything when DOM is ready
    function init() {
        try {
            initFAQ();
            initSlider();
        } catch (error) {
            handleError(error, 'initialization');
        }
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Export functions for potential external use
    window.FAQManager = {
        initFAQ,
        initSlider,
        toggleFAQ
    };
    
})();