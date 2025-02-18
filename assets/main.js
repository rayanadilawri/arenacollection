// javascript to know about my buttons and my elements 
let channelBlocks = document.getElementById('channel-blocks');
let showLinksButton = document.getElementById('show-links-button');
let showlAllButton = document.querySelector('#show-all-button');
let showVideoButton = document.querySelector('show-video-button');
let showImage = document.getElementById('show-image-button');

// add onlick event to my buttons
showLinksButton.onclick = () => {
    console.log("testing")
channelBlocks.classList.add('show-links')
}

showVideoButton.onclick = () => {
    channelBlocks.classList.add('show-video')
    }

showlAllButton.onclick = () => {
    channelBlocks.classList.remove('show-links', 'show-video')
}



let imgDis = document.getElementById('img-dis');

imgDis.addEventListener('click', (event) => {
   imgDis.style.display = "none";
})
