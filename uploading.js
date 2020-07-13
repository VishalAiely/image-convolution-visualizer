document.querySelector('#picture').onchange = function previewFile() {
    let show = document.querySelector('#preview')
    let file = document.querySelector('#picture').files[0]
    let reader = new FileReader()

    //sets source of image
    reader.onloadend = function() {
        show.src = reader.result
    }

    show.onload = function() {
        //loads canvas in with image and fits it to canvas
        let canvas = document.querySelector('#can')
        let ctx = canvas.getContext('2d')

        canvas.width = show.width
        canvas.height = show.height

        if (show.width > 400 || show.height > 400)
        {
            let newscale = 200/show.width
            canvas.width *= newscale
            canvas.height *= newscale
             ctx.scale(newscale,newscale)
        }

        ctx.drawImage(show,0,0)


        show.style.display = 'none'
        let imageData = ctx.getImageData(0, 0, show.width, show.height);
        let data = imageData.data;

        //used to calculate greyscale value
        let avg = 0
        for (let i = 0; i < data.length; i+=4) {
            avg = (data[i] + data[i+1] + data[i+2])/3

            data[i] = data[i+1] = data[i+2] = avg
        }

        //outputs the greyscale image
        ctx.putImageData(imageData,0,0)
    }

    if(file) {
        reader.readAsDataURL(file)
    } else {
        show.src = ""
    }

    document.querySelector('#apply').disabled = false
}