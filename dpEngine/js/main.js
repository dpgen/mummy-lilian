$(function () {
  /* global variables */
  const preview = $(".preview");
  const previewContent = preview.innerHTML;

  $("#dp-gen-btn").on("click", function () {
    processImage();
  });

  function countLines(text, maxWidth) {
    var words = text.split(" ").filter(word => word!=="");
    var line = "";
    let count = 0;
    // console.log(words)
    // console.log(text.length)

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      if (testLine.length > maxWidth && n > 0) {
        // console.log(line)
        count++;
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    return (count + 1);
  }


  function processImage () {
    const name = $(`#name`).val();
    const experience = $(`#experience`).val();

    const numberOfLines = countLines(experience, 50);
    let experienceData = [];
    switch (numberOfLines) {
      case 12:
        // name, y, x, message, x, y
        experienceData = [`${name}`, 1470, 1001, `${experience}`, 1001, 269];
        break;
      case 11:
        // name, y, x, message, x, y
        experienceData = [`${name}`, 1464, 1001, `${experience}`, 1001, 353];
        break;
      case 10:
        // name, y, x, message, x, y
        experienceData = [`${name}`, 1409, 1001, `${experience}`, 1001, 388];
        break;
      case 9:
        // name, y, x, message, x, y
        experienceData = [`${name}`, 1359, 1001, `${experience}`, 1001, 428];
        break;
      case 8:
        // name, y, x, message, x, y
        experienceData = [`${name}`, 1324, 1001, `${experience}`, 1001, 493];
        break;
      case 7:
        // name, y, x, message, x, y
        experienceData = [`${name}`, 1269, 1001, `${experience}`, 1001, 548];
        break;
      case 6:
        // name, y, x, message, x, y
        experienceData = [`${name}`, 1229, 1001, `${experience}`, 1001, 588];
        break;
      case 5:
        // name, y, x, message, x, y
        experienceData = [`${name}`, 1174, 1001, `${experience}`, 1001, 643];
        break;
      case 4:
        // name, y, x, message, x, y
        experienceData = [`${name}`, 1124, 1001, `${experience}`, 1001, 693];
        break;
      case 3:
        // name, y, x, message, x, y
        experienceData = [`${name}`, 1084, 1001, `${experience}`, 1001, 733];
        break;
      case 2:
        // name, y, x, message, x, y
        experienceData = [`${name}`, 1039, 1001, `${experience}`, 1001, 778];
        break;
      case 1:
        // name, y, x, message, x, y
        experienceData = [`${name}`, 919, 1001, `${experience}`, 1001, 778];
        break;
      default:
        // name, y, x, message, x, y
        experienceData = [`${name}`, 1475, 1001, `${experience}`, 1001, 264];
        break;
    }
    // x, y, width, height
    createDP(experienceData, genericCb);

    function genericCb (url) {
      navigateTo("yourdp", createHTMLForImage(url));

      $('.form').hide(); // hides

      function createHTMLForImage(url) {
        return `
        <section class="dp-container">
          <a href="?" class="arrow-back"><i class="ti-arrow-left"></i> Back</a>
          <div class="img-dp">
            <img id="dp_result" src=${url} title="Your DP"/>
            <br>
            <a id="download-dp" onclick="showSuccess()" href="${url}" download="FS_DP_${name.replace(/\./g, "")}">Download Image</a>
            <br>
          </div>
        </section>
        `;
      }
    }
  };
  
  if (CanvasRenderingContext2D && !CanvasRenderingContext2D.renderText) {
    // @param  letterSpacing  {float}  CSS letter-spacing property
    CanvasRenderingContext2D.prototype.renderText = function (
      text,
      x,
      y,
      letterSpacing
    ) {
      if (!text || typeof text !== "string" || text.length === 0) {
        return;
      }

      if (typeof letterSpacing === "undefined") {
        letterSpacing = 0;
      }

      // letterSpacing of 0 means normal letter-spacing

      var characters = String.prototype.split.call(text, ""),
        index = 0,
        current,
        currentPosition = x,
        align = 1;

      if (this.textAlign === "right") {
        characters = characters.reverse();
        align = -1;
      } else if (this.textAlign === "center") {
        var totalWidth = 0;
        for (var i = 0; i < characters.length; i++) {
          totalWidth += this.measureText(characters[i]).width + letterSpacing;
        }
        currentPosition = x - totalWidth / 2;
      }

      while (index < text.length) {
        current = characters[index++];
        this.fillText(current, currentPosition, y);
        currentPosition +=
          align * (this.measureText(current).width + letterSpacing);
      }
    };
  }

  function createDP(name, cb) {
    var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      imageCount = 1;

    
    let frameNo = Math.floor(Math.random() * 3) + 1;
    let frameImg = null;
    switch (frameNo) {
      case 3:
        frameImg =  loadImage("./dpEngine/img/Frame3.png");
        break;
      case 2:
        frameImg =  loadImage("./dpEngine/img/Frame2.png");
        break;
      default:
        frameImg =  loadImage("./dpEngine/img/Frame1.png");
        break;
    }

    function loadImage(src) {
      let img = new Image();
      img.onload = transformImage;
      img.src = src;
      return img;
    }

    function transformImage() {
      if (--imageCount !== 0) return;

      canvas.width = frameImg.width;
      canvas.height = frameImg.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(frameImg, 0, 0);

      ctx.save();

      ctx.restore();

      ctx = canvas.getContext("2d");
    
      //write messge
      ctx.textBaseline = "top";
      ctx.textAlign = "center";
      ctx.font = "63px AcidGrotesk-Normal";
      ctx.fillStyle = "#333333";
      // ctx.fillText(canvasText, name[2], name[1]);
      wrapText(ctx, name[3], name[4], name[5], 50, 96, 0);

      //Write user name
      ctx.font = "150px Revisthond-Script";
      ctx.fillStyle = "#d2395e";
      var canvasText = `-${name[0]}`;
      ctx.fillText(canvasText, name[2], name[1]);
      
      cb(canvas.toDataURL("image/jpeg", 1.0));
    }
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight, letterSpacing) {
    var words = text.split(" ").filter(word => word!=="");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      // let metrics = context.measureText(testLine);
      // let testWidth = metrics.width;
      if (testLine.length > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
        // if (maxWidth <= 25) {
        //   maxWidth += 5;
        // } else {
        //   maxWidth -= 5;
        // }
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  function wrapTextLetter(
    context,
    text,
    x,
    y,
    maxLetters,
    lineHeight,
    letterSpacing
  ) {
    let letters = text.split("");
    let line = "";

    for (let n = 0; n < letters.length; n++) {
      let testLine = line + letters[n];
      if (testLine.length > maxLetters && n > 0) {
        context.fillText(line, x, y);
        line = letters[n];
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  function navigateTo(view, temp = "") {
    switch (view) {
      case "yourdp":
        preview.html(temp);
        break;
      default:
        preview.innerHTML = previewContent;
    }
  }
  console.log("DOM fully loaded and parsed");
});
