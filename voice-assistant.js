document.addEventListener('DOMContentLoaded', function() {
    const voiceAssistant = document.querySelector('elevenlabs-convai');
    
    if (voiceAssistant) {
        // Add click handler for the cross mark
        voiceAssistant.addEventListener('click', function(event) {
            // Check if the click was on the cross mark (first 30px from the left)
            if (event.offsetX <= 30 && event.offsetY <= 30) {
                // Remove the expanded attribute to close the widget
                voiceAssistant.removeAttribute('expanded');
                event.stopPropagation(); // Prevent event bubbling
            }
        });
    }
}); 