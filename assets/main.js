// javascript to know about my buttons and my elements 
let channelBlocks = document.getElementById('channel-blocks');
console.log(channelBlocks);

let showLinksButton = document.getElementById('show-links-button');
let showAllButton = document.getElementById('show-all-button');
let showVideoButton = document.getElementById('show-video-button');
let showImageButton = document.getElementById('show-image-button');
let showTextButton = document.getElementById('show-text-button');
let showAudioButton = document.getElementById('show-audio-button');


// add onlick event to my buttons

//links 
showLinksButton.onclick = () => {
channelBlocks.classList.remove('show-video', 'show-image', 'show-text');
channelBlocks.classList.add('show-links')
}

//video
showVideoButton.onclick = () => {
    channelBlocks.classList.remove('show-links', 'show-image', 'show-text');
    channelBlocks.classList.add('show-video');
    }

//image
showImageButton.onclick = () => {
    channelBlocks.classList.remove('show-video', 'show-links', 'show-text');
    channelBlocks.classList.add('show-image')
    }

//text 
showTextButton.onclick = () => {
    channelBlocks.classList.remove('show-video', 'show-image', 'show-links');
    channelBlocks.classList.add('show-text')
    } 
    
 //all 
showAllButton.onclick = () => {
    channelBlocks.classList.remove('show-links', 'show-video', 'show-image', 'show-text');
}
