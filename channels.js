async function loadAndRunHTML() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/odfinity/channels/main/123.html');
        if (!response.ok) throw new Error('Failed to fetch the HTML content');
        
        const htmlContent = await response.text();
        
        // Create a container and inject the HTML content
        const container = document.createElement('div');
        container.innerHTML = htmlContent;
        document.body.appendChild(container);

        // Execute any inline <script> tags found in the fetched HTML
        container.querySelectorAll('script').forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src; // If script has a src, set it
            } else {
                newScript.textContent = script.textContent; // Otherwise, copy inline script
            }
            document.body.appendChild(newScript);
        });
    } catch (error) {
        console.error('Error loading HTML:', error);
    }
}

// Run the function
loadAndRunHTML();
