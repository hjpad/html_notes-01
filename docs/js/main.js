document.addEventListener('DOMContentLoaded', () => {

    const fileListElement = document.getElementById('file-list');
    const contentViewElement = document.getElementById('content-view');
    
    // --- IMPORTANT ---
    // In a real-world scenario, you might fetch this list from a server.
    // For this static example, we'll hardcode the list of markdown files.
    // To add a new file, just add its name to this array.
    const markdownFiles = [
        'welcome.md',
        'getting-started.md',
        'about.md'
    ];

    /**
     * Fetches a markdown file and renders it into the content view.
     * @param {string} fileName The name of the file to load.
     */
    const loadMarkdownFile = async (fileName) => {
        try {
            const response = await fetch(`assets/${fileName}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdownText = await response.text();
            
            // Use the 'marked' library to convert Markdown to HTML
            contentViewElement.innerHTML = marked.parse(markdownText);
            
            // Update active state in the sidebar
            updateActiveLink(fileName);

        } catch (error) {
            console.error('Error loading markdown file:', error);
            contentViewElement.innerHTML = `<p class="error">Sorry, could not load the file: ${fileName}. Please check the console for details.</p>`;
        }
    };
    
    /**
     * Creates the file list in the sidebar.
     */
    const populateFileList = () => {
        markdownFiles.forEach(fileName => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            
            // Create a user-friendly display name (e.g., "welcome.md" -> "Welcome")
            const displayName = fileName
                .replace('.md', '')
                .replace(/-/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());

            link.textContent = displayName;
            link.href = '#';
            link.dataset.fileName = fileName; // Store the filename in a data attribute

            link.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                loadMarkdownFile(fileName);
            });
            
            listItem.appendChild(link);
            fileListElement.appendChild(listItem);
        });
    };
    
    /**
     * Updates which link in the sidebar is marked as 'active'.
     * @param {string} activeFileName The filename of the currently active file.
     */
    const updateActiveLink = (activeFileName) => {
        const links = fileListElement.querySelectorAll('a');
        links.forEach(link => {
            if (link.dataset.fileName === activeFileName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // --- Initial Setup ---
    populateFileList();
    
    // Load the first file by default if there are any
    if (markdownFiles.length > 0) {
        loadMarkdownFile(markdownFiles[0]);
    }
});