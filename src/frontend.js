// Written by ChatGPT
document.addEventListener( 'DOMContentLoaded', function() {
    // Function to initialize and store the original order of columns
    function initializeColumns( container ) {
        var originalOrder = Array.from( container.querySelectorAll( '.wp-block-column' ) );
        container.originalOrder = originalOrder;
    }

    // Function to reverse or restore columns order in a container
    function reverseColumnsOrder( container, isMobile ) {
        var columns = Array.from( container.querySelectorAll( '.wp-block-column' ) );
        var orderChanged = 'true' === container.getAttribute( 'data-order-changed' );

        if ( isMobile && ! orderChanged ) {
            // Reverse columns order for mobile
            columns.reverse().forEach( function( column ) {
                container.appendChild( column );
            } );
            container.setAttribute( 'data-order-changed', 'true' );
        } else if ( ! isMobile && orderChanged ) {
            // Restore original order for desktop
            container.originalOrder.forEach( function( column ) {
                container.appendChild( column );
            } );
            container.setAttribute( 'data-order-changed', 'false' );
        }
    }

    // Function to handle resize and initial load
    function handleColumnOrder() {
        var containers = document.querySelectorAll( '.wp-block-columns.is-reversed-direction-on-mobile' );
        var isMobile = window.matchMedia( '(max-width: 768px)' ).matches;

        containers.forEach( function( container ) {
            if ( ! container.originalOrder ) {
                initializeColumns( container );
            }
            reverseColumnsOrder( container, isMobile );
        } );
    }

    // Run on initial load
    handleColumnOrder();

    // Run on window resize
    window.addEventListener( 'resize', handleColumnOrder );
} );