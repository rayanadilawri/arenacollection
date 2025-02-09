let markdownItScript = document.createElement('script');
markdownItScript.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js';
document.head.appendChild(markdownItScript);
markdownItScript.onload = () => {
  
    let channelSlug = 'plants-in-art-and-literature-nature-s-inspiration'; // The “slug” is just the end of the URL

    let placeChannelInfo = (data) => {
        // Target some elements in your HTML:
        let channelTitle = document.querySelector('#channel-title');
        let channelDescription = document.querySelector('#channel-description');
        let channelCount = document.querySelector('#channel-count');
        let channelLink = document.querySelector('#channel-link');

   // Then set their content/attributes to our data:
	channelTitle.innerHTML = data.title
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	channelCount.innerHTML = data.length
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}
    // Now that we have said what we can do, go get the data:
    fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
        .then((response) => response.json()) // Return it as JSON data
        .then((data) => { 
            console.log(data);
            placeChannelInfo(data)

            let myFunction = (block) => {
                if (block.class == 'Text') {
                    console.log('text')
                } else if (block.class == 'Link') {
                    console.log('link')
                } else if (block.class == 'Media') {
                    console.log('media')
                } else if (block.class == 'Image') {
                    console.log('image')
                } else if (block.class == 'Attachment') {
                   console.log('attachment')
               } else if (attachment.includes('pdf')) {
               }
            }

            data.contents.forEach(myFunction) 
                
            })    
};