async function start() {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        var width_width = window.innerWidth;
        var height_height = window.innerHeight;
    const constraints = {
            video: {
                width: height_height,
                height: width_width,
                facingMode: "environment"
        },
    }
    const video = document.querySelector('#video')
    let canvas = document.querySelector('#canvas')
    const videoStream = await navigator.mediaDevices.getUserMedia(constraints)
    video.srcObject = videoStream
    // videoStream.getTracks().forEach((track) => {
    //     track.stop()
    // })

    function stopVideoStream() {
        if (videoStream) {
            videoStream.getTracks().forEach((track) => {
            track.stop();
        });
        }
    }

    // initialize
    async function initializeCamera() {
        stopVideoStream();
        constraints.video.facingMode = useFrontCamera ? "user" : "environment";

        try {
            videoStream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = videoStream;
        } catch (err) {
            alert("Could not access the camera");
        }
    }
    $(".loading").addClass('d-none')

    $('.back').click(function() {
        window.location = "../index.html"
    })

    $('.sc').click(function() {
        useFrontCamera = !useFrontCamera;

        initializeCamera();
    })

    video.addEventListener('click', function() {
        const img = document.createElement("img");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        img.src = canvas.toDataURL("image/png");
        localStorage.setItem('imgToBeScanned', canvas.toDataURL("image/png"))
        $('.dh').addClass('d-none')
        stopVideoStream()
    
    })
    }
}