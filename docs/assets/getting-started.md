# Getting Started

This guide will show you how to use this project.

## Step 1: File Structure
Ensure your files are organized correctly. All your `.md` files should be placed in the `assets/` subfolder.

## Step 2: Update the File List
To add a new file, you must update the `markdownFiles` array in `js/main.js`.

For example, to add `new-file.md`, you would change this:
```javascript
const markdownFiles = [
    'welcome.md',
    'getting-started.md',
    'about.md'
];