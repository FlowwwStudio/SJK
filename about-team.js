document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with data-trigger="modal"
    var modalTriggers = document.querySelectorAll('[data-trigger="modal"]');

    modalTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function(event) {
            // Prevent default action if necessary
            event.preventDefault();

            // Find the sibling element with data-trigger="modal-target"
            var modalTarget = null;

            // Check next siblings
            var nextSibling = trigger.nextElementSibling;
            while (nextSibling) {
                if (nextSibling.getAttribute('data-trigger') === 'modal-target') {
                    modalTarget = nextSibling;
                    break;
                }
                nextSibling = nextSibling.nextElementSibling;
            }

            // If not found, check previous siblings
            if (!modalTarget) {
                var prevSibling = trigger.previousElementSibling;
                while (prevSibling) {
                    if (prevSibling.getAttribute('data-trigger') === 'modal-target') {
                        modalTarget = prevSibling;
                        break;
                    }
                    prevSibling = prevSibling.previousElementSibling;
                }
            }

            if (modalTarget) {
                // Simulate a click on the modal target
                modalTarget.click();            }
        });
    });
});
