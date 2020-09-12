
// console.log('hello');
const socket = io('/');
const myVideo = document.createElement('video');
const videoGrid = document.getElementById('video-grid');
const username = localStorage.getItem('displayName');
myVideo.muted = true;
let myVideoStream = null;
// let peers = [];

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: process.env.PORT
});

navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
    peer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        });
    });
    socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
    });
})


peer.on('open', id => {
    socket.emit("join-room", RoomId, id);
});

const connectToNewUser = (userId, stream) => {
  const call = peer.call(userId, stream);
  const video = document.createElement('video');
  call.on('stream', userVideoStream => {
      console.log('called');
      addVideoStream(video, userVideoStream);
  });
    call.on('close', () => {
        video.remove()
    })

    // peers[userId] = call
};

const addVideoStream = (video, stream) => {
    console.log('entering add video stream');
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  console.log('Streaming Video attached');
  videoGrid.append(video);
//   video.play();
};


const scrollToBottom = () => {
    let d = $('.main__chat_window');
    d.scrollTop(d.prop("scrollHeight"));
}


let text = $('input')

$('html').keydown((e) => {
    if(e.which == 13 && text.val().length !==0 ) {
        console.log(text.val());
        socket.emit('message', username, text.val());
        text.val('')
    }
});

socket.on('createMessage', (user, message) => {
    $('.messages').append(`<li class="message"><b>${user}</b><br/>${message}</li>`);
    scrollToBottom();
});

const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if(enabled){
        setUnmuteButton();
        myVideoStream.getAudioTracks()[0].enabled = false;
    } else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}

const setMuteButton = () => {
    const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
    `;
  document.querySelector(".main__mute_button").innerHTML = html;
};

const playStop = () => {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if(enabled){
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    } else {
        myVideoStream.getVideoTracks()[0].enabled = true;
        setStopVideo();
    }
}

const setPlayVideo = () => {
    const html = `
    <i class="unmute fas fa-video-slash"></i>
    <span>Play Video</span>
    `;
    document.querySelector(".main__video_button").innerHTML = html;
}

const setStopVideo = () => {
    const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
    `;
    document.querySelector(".main__video_button").innerHTML = html;
}

const leaveMeeting = () => {
    window.open('/dashboard', '_self');
}

const generateSharableLink = () => {
    let shareLink =  window.location.href.replace(window.location.pathname,`/join-conference/${RoomId}`);
    console.log(shareLink);
    navigator.clipboard.writeText(shareLink).then(()=>{
        alert("Share Link Copied To The Clipboard !");
    },(err)=> {
        console.log(err);
    });

}