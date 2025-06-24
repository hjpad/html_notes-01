document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const fileList = document.getElementById('file-list');
    const contentArea = document.getElementById('content');

    // Fetch and list all .md files from the assets folder
    fetch('/assets')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            const links = Array.from(htmlDoc.querySelectorAll('a'));

            links.forEach(link => {
                if (link.href.endsWith('.md')) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = link.href;
                    a.textContent = link.textContent;
                    a.addEventListener('click', function(event) {
                        event.preventDefault();
                        loadMarkdownFile(this.href);
                    });
                    li.appendChild(a);
                    fileList.appendChild(li);
                }
            });
        });

    // Load and display the selected markdown file
    function loadMarkdownFile(fileUrl) {
        fetch(fileUrl)
            .then(response => response.text())
            .then(data => {
                const markdownContent = marked.parse(data); // Use a library like marked.js to parse markdown
                contentArea.innerHTML = markdownContent;
            })
            .catch(error => {
                contentArea.textContent = 'Error loading the file.';
                console.error('Error:', error);
            });
    }
});