// javascript to know about my buttons and my elements 
let channelBlocks = document.querySelector('#channel-blocks');
let showlLinksButton = document.querySelector('#show-links-button');
let showlAllButton = document.querySelector('#show-all-button');
let showVideoButton = document.querySelector('#show-Video-button');

// add onlick event to my buttons
showLinksButton.onclick = () => {
channelBlocks.classList.add('show-links')
}

showVideoButton.onclick = () => {
    channelBlocks.classList.add('show-video')
    }

showlAllButton.onclick = () => {
    channelBlocks.classList.remove('show-links', 'show-video')
}

//suggest by co pilot - trying to figure out errors 

// document.addEventListener('DOMContentLoaded', () => {
   // Select the buttons
   // const showLinksButton = document.querySelector('#show-links-button');
   // const showAllButton = document.querySelector('#show-all-button');
   // const channelBlocks = document.querySelector('#channel-blocks');

    // Check if the buttons exist
    //if (showLinksButton) {
       // showLinksButton.addEventListener('click', () => {
           // Logic to show only link blocks
           // const allBlocks = document.querySelectorAll('#channel-blocks li');
           // allBlocks.forEach(block => {
                //if (block.classList.contains('link-block')) {
                    block.style.display = 'block';
              //  } else {
                  //  block.style.display = 'none';
                }
            });
        });
   // } else {
      //  console.error('Element with ID "show-links-button" not found');
    }

   // if (showAllButton) {
       // showAllButton.addEventListener('click', () => {
            // Logic to show all blocks
           // const allBlocks = document.querySelectorAll('#channel-blocks li');
          //  allBlocks.forEach(block => {
          //      block.style.display = 'block';
            });
        });
   // } else {
     //   console.error('Element with ID "show-all-button" not found');
    }
});