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
              <button> 
              <figure>
                    <img src="${block.image.thumb.url}">
              </figure>
              </button>
              <dialog>
              <div>
                <p class="dialog-title">${block.title}</p>
               <p class="dialog-description"> ${block.description_html} 
               <div class="external-link"><a href="${block.source.url}">See the original ↗</a></div>
               </p>
                </div>
                <div class="dialog-image-div">
                <img class="image-pop-up" src="${block.image.large.url}">
                </div>
                <button class="close"> x </button>
                </dialog>
            </li>
        `
        channelBlocks.insertAdjacentHTML('beforeend', linkItem);
    }

    // Images!
    else if (block.class == 'Image') {
        let linkItem = `
            <li class="image-block">
                <button> 
                    <figure>
                        <img id="img-dis" src="${block.image.large.url}">
                    </figure>
                </button>
                <dialog>
                <div>
                 <p class="dialog-title"> ${block.title}</p>
                 <p class="dialog-description"> ${block.description_html}</p>
                </div>
                <div class="external-link"><a href="${block.image.large.url}">See the original ↗</a></div>
                </div>
                <button class="close"> x </button>
                </dialog>
            </li>
        `
        channelBlocks.insertAdjacentHTML('beforeend', linkItem);
    }

    
    // Text!
    else if (block.class == 'Text') {
        let linkItem = `
            <li class="text-block"> 
            <button>
            <figure>
            <p> ${block.content_html}</p>
            </figure>
            </button>
            <dialog>
            <div>
            <p class="text-pop-up-title"> ${block.title} </p> 
            <p> ${block.content_html} </p>
            <p> ${block.description_html} </p>
            </div>
            <button class="close"> x </button>
            </dialog>
            </li>
        `
        channelBlocks.insertAdjacentHTML('beforeend', linkItem);
    }

    // Uploaded (not linked) media…
    else if (block.class == 'Attachment') {
        let attachment = block.attachment.content_type; // Save us some repetition

        // Uploaded videos!
        if (attachment.includes('video')) {
            let videoItem = `
                <li class="video-block">
                <button>
                    <figure>  
                    <img id="img-dis" src="${block.image.large.url}">
                    </figure>
                    </button>
                    <dialog>
                    <div>
                    <p> ${block.title}</p>
                    <p> ${block.description_html}</p>
                    <video controls src="${block.attachment.url}"></video>
                    </div>
                    <button class="close"> x </button>
                    </dialog>
                </li>
            `
            channelBlocks.insertAdjacentHTML('beforeend', videoItem);
        }

        // Uploaded PDFs!
        // else if (attachment.includes('pdf')) {
        //     let pdfItem = `
        //         <li class="pdf-block">
        //             <button>
        //             <figure>
        //             <img id="img-dis" src="${block.image.large.url}">
        //             </figure>
        //             </button>
        //             <dialog>
        //             <div>
        //             <p> ${block.title}</p>
        //             <p> ${block.description_html}</p>
        //             <iframe src="${block.attachment.url}"></iframe>
        //             </div>
        //             <button class="close"> x </button>
        //             </dialog>
        //         </li>
        //     `
        //     channelBlocks.insertAdjacentHTML('beforeend', pdfItem);

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
        //     // …still up to you, but here’s an example `iframe` element:
        //     let linkedVideoItem = `
        //         <li class="video-block">
        //         <button>
        //             <figure>
        //             <img id="img-dis" src="${block.image.large.url}">
        //                 <p><em>Linked Video</em></p>
        //             </figure>
        //             </button>
        //             <dialog>
        //             <div>
        //             <p> ${block.title}</p>
        //             <p> ${block.description_html}</p>
        //             ${block.embed.html}
        //             <iframe src="${block.embed.url}"></iframe>
        //             </div>
        //             <button class="close"> x </button>
        //             </dialog>  
        //         </li>
        //     `;
        //     channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem);
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
  let linkBlocks = document.querySelectorAll('.link-block');
  let textBlocks = document.querySelectorAll('.text-block');
  let videoBlocks = document.querySelectorAll('.video-block');
  
  let setupBlockInteraction = (blocks) => {
      blocks.forEach((block) => {
          let openButton = block.querySelector('button');
          let dialog = block.querySelector('dialog');
          let closeButton = dialog.querySelector('.close');

          // hansi zhu code tutor helped me understand setTimeout and implement it into my function //
          // this function works by specifying the delay in miliseconds for the action you want to happen//
          // this relates to my project because in desktop, i had a frame come up over the lilypad (chanel block) when you hover, to represent that the nature another form of art. //
          //this was hard to emulate on mobile, as there is no hover, just on click. this function has helped me because it has allowed mobile to have the same effect that I wanted desktop to have//
          //now, when you click the button on mobile, the frame will come up and after 1 second, the dialog will appear, so in this way the viewer can see the frame and not miss out on this intentional design choice //
          openButton.onclick = () => {
              setTimeout(() => { dialog.showModal(); }, 1000);
          }

          closeButton.onclick = () => {
              dialog.close();
          }
          
          dialog.onclick = (event) => {
              if (event.target === dialog) {
                  dialog.close();
              }
          }
      });
  }
  
  setupBlockInteraction(imageBlocks);
  setupBlockInteraction(linkBlocks);
  setupBlockInteraction(textBlocks);
  setupBlockInteraction(videoBlocks);

}


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

        // I worked with Viyan Poonamalle over 3 coding tutor sessions to build this function//
        //this functio we worked on helped adress the feedback i got in class to make my design look and feel more organic, and less arena like // 
       // the function nworks by selecting all the channel blocks in the li then will select a random number betweeen 0 and what i provided to place it // 
        //learning about how to build This function was valuable to me because it helped me  randomize the position of all the channel blocks on the page each time you reload the page. The blocks are in a grid but each time they are loaded, they are able to move vertically and horizontally within the range i specified (0 and 20-mobile) and (0 and 75- desktop)//
      

        let blocks = document.querySelectorAll("#channel-blocks li");
        console.log("channel-blocks", blocks);
        const mobileX = 20;
        const mobileY = 20;
        const desktopX = 75;
        const desktopY = 75;
        
        for (let i = 0; i < blocks.length; i++) {
          let block = blocks[i];
        console.log(block);
          const xRandMobile = Math.random() * mobileX;
          const yRandMobile = Math.random() * mobileY;
          const xRandDesktop = Math.random() * desktopX;
          const yRandDesktop = Math.random() * desktopY;
        
          block.style.setProperty("transform", `translate(${xRandDesktop}%, ${yRandDesktop}%)`);
        }
        
        initInteraction();
        
        // Also display the owner and collaborators:
        let channelUsers = document.querySelector('#channel-users'); // Show them together
        data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers));
        renderUser(data.user, channelUsers);

     
    });

   