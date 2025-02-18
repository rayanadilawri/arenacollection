// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)


// Okay, Are.na stuff!
let channelSlug = 'plants-in-art-and-literature-nature-s-inspiration' // The “slug” is just the end of the URL


// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (data) => {
// Target some elements in your HTML:
let channelTitle = document.querySelector('#channel-title')
let channelDescription = document.querySelector('#channel-description')
let channelCount = document.querySelector('#channel-count')
let channelLink = document.querySelector('#channel-link')

// Then set their content/attributes to our data:
channelTitle.innerHTML = data.title
channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
channelCount.innerHTML = data.length
channelLink.href = `https://www.are.na/channel/${channelSlug}`
}

// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
    // To start, a shared `ul` where we’ll insert all our blocks
    let channelBlocks = document.querySelector('#channel-blocks');
    console.log(block);

    // Links!
    if (block.class == 'Link') {
        let linkItem = `
            <li class="link-block">
                <p><em>Link</em></p>
                <picture>
                    <source srcset="${block.image.thumb.url}">
                    <source srcset="${block.image.large.url}">
                    <img src="${block.image.thumb.url}">
                </picture>
                <h3>${block.title}</h3>
                ${block.description_html}
                <p><a href="${block.source.url}">See the original ↗</a></p>
            </li>
        `;
        channelBlocks.insertAdjacentHTML('beforeend', linkItem);
    }

    // Images!
    else if (block.class == 'Image') {
        let linkItem = `
            <li class="image-block">
                <button> 
                    <figure>
                        <img src="${block.image.thumb.url}">
                    </figure>
                </button>
                <dialog hidden>
                    <p> I am a modal overlay!</p>
                    <button class="close"> Close</button>
                </dialog>
            </li>
        `;
        channelBlocks.insertAdjacentHTML('beforeend', linkItem);
    }

    // Text!
    else if (block.class == 'Text') {
        let linkItem = `
            <li class="text-block"> ${block.content_html}
                <p> Quote from Arena</p>
            </li>
        `;
        channelBlocks.insertAdjacentHTML('beforeend', linkItem);
    }

    // Uploaded (not linked) media…
    else if (block.class == 'Attachment') {
        let attachment = block.attachment.content_type; // Save us some repetition

        // Uploaded videos!
        if (attachment.includes('video')) {
            let videoItem = `
                <li class="video-block">
                    <video controls src="${block.attachment.url}"></video>
                </li>
            `;
            channelBlocks.insertAdjacentHTML('beforeend', videoItem);
        }

        // Uploaded PDFs!
        // else if (attachment.includes('pdf')) {

        // }

        else if (attachment.includes('audio')) {
            // …still up to you, but here’s an `audio` element:
            let audioItem = `
                <li class="audio-block">
                    <audio controls src="${block.attachment.url}"></audio>
                </li>
            `;
            channelBlocks.insertAdjacentHTML('beforeend', audioItem);
            // More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
        }
    }

    // Linked media…
    else if (block.class == 'Media') {
        let embed = block.embed.type;

        // Linked video!
        if (embed.includes('video')) {
            // …still up to you, but here’s an example `iframe` element:
            let linkedVideoItem = `
                <li class="link-block">
                    <p><em>Linked Video</em></p>
                    ${block.embed.html}
                </li>
            `;
            channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem);
            // More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
        }

        // Linked audio!
        else if (embed.includes('rich')) {
            // …up to you!
        }
    }
};

// It‘s always good to credit your work:
let renderUser = (user, container) => { // You can have multiple arguments for a function!
    let userAddress = `
        <address>
            <img src="${user.avatar_image.display}">
            <h3>${user.first_name}</h3>
            <p><a href="https://are.na/${user.slug}">Are.na profile ↗</a></p>
        </address>
    `;
    container.insertAdjacentHTML('beforeend', userAddress);
};

let initInteraction = () => {
    let imageBlocks = document.querySelectorAll('.image-block');
    imageBlocks.forEach((block) => {
        let openButton = block.querySelector('button');
        let dialog = block.querySelector('dialog');
        let closeButton = dialog.querySelector('button');

        openButton.onclick = () => {
            dialog.show();
        };

        closeButton.onclick = () => {
            dialog.close();
        };
    });
};

// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
    .then((response) => response.json()) // Return it as JSON data
    .then((data) => { // Do stuff with the data
        console.log(data); // Always good to check your response!
        placeChannelInfo(data); // Pass the data to the first function

        // Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
        data.contents.reverse().forEach((block) => {
            // console.log(block) // The data for a single block
            renderBlock(block); // Pass the single block data to the render function
        });

        initInteraction();

        // Also display the owner and collaborators:
        let channelUsers = document.querySelector('#channel-users'); // Show them together
        data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers));
        renderUser(data.user, channelUsers);
    });

