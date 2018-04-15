function getVideoResults() {
    $('#video-div').css('display', 'none');     
    var url = document.getElementById('vd_url').value;
    if(url === null) {
        console.log('Empty');
    } 
    // alert('Working');
    console.log(url);
    var fb = false;
    fb = url.includes("https://www.facebook.com/");

    var youtube = false;
    youtube = url.includes('youtube.com/watch?v=') || url.includes('youtu.be/') || url.includes('youtube.com/embed/') || url.includes('youtube-nocookie.com/embed/') || url.includes('youtube.com/watch?feature=player_embedded&v=');

    var fbCount = 1;
    if(fb) {
        facebbokVideos(url);
    } else if(youtube) { 
        youtubeVideos(url);
    } else {
        console.log('Invalid');
        showContainer();
        loadAnimate();        
        $('#video-div').css('display', 'none');
        $('#no-data').css('display', 'block');  
        hideAnimate();   
        document.getElementById('no-data').innerHTML = `
        <div style="text-align: center;">
            <h3 style="font-size: 1.2rem;">Url is not supported yet!</h3>
        </div>`;
    }   
}

//For youtube 
function youtubeVideos(url) {
    var request = new XMLHttpRequest();
    var content = ``;
    showContainer(); 
    $('#no-data').css('display', 'none');
    $('#video-div').css('display', 'none');        
    loadAnimate();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var responseData = JSON.parse(this.responseText);
            if(responseData.title == 'invalid') {
                console.log('Error');
                // showContainer();
                hideAnimate();                
                $('#video-div').css('display', 'none');
                $('#no-data').css('display', 'block');                
                document.getElementById('no-data').innerHTML = `
                <div style="margin: 0 auto">
                    <h3 style="font-size: 1.2rem;">Invalid Url/ Url is not supported yet!</h3>
                </div>`;        
            } else {
                console.log(responseData);
                console.log(responseData.title);
                var len = responseData.formats.length;
                $('#no-data').css('display', 'none');
                $('#video-div').show();
                let Counter = 0;
                let topFormat = "";
                let dwnldBtn = "";
                console.log('Len :', len);
                console.log('Title: ', responseData.title);
                console.log('Thumbnail: ', responseData.thumbnail);

                let gotContent = false;
                let videoId = responseData.id;
                let videoTitle = responseData.title;
                // document.getElementById('thumb').innerHTML = `<img src="${responseData.thumbnail}" class="img-fluid cust-thumb-img"/>`;
                // document.getElementById('vd_title').innerHTML = `<h3 style="font-size: 1.2rem;">${responseData.title.substring(0, 45).concat("..")}</h3>`;

                for(var i=0; i<len;i++) {
                    console.log('Ext : '+ responseData.formats[i].ext);
                    console.log('URL: '+ responseData.formats[i].url);
                    console.log('Format: '+ responseData.formats[i].format_note);
                    if(responseData.formats[i].format_id == 137 || responseData.formats[i].format_id == 17 || responseData.formats[i].format_id == 36 || responseData.formats[i].format_id == 5 || responseData.formats[i].format_id == 43 || responseData.formats[i].format_id == 18 || responseData.formats[i].format_id == 22 || responseData.formats[i].format_id == 140) {
                        if(responseData.formats[i].format_id == 17) {
                            content += `<a target="_blank" class="dropdown-item" href="${responseData.formats[i].url}" download="${responseData.title}" style="text-transform:Uppercase;">3Gp&nbsp;<span class="vd_format">144</span></a>`;    
                            gotContent = true;
                        } else if(responseData.formats[i].format_id == 36) {
                            content += `<a target="_blank" class="dropdown-item" href="${responseData.formats[i].url}" download="${responseData.title}.3gp" style="text-transform:Uppercase;">3Gp&nbsp;<span class="vd_format">240</span></a>`;    
                            gotContent = true;
                        } else if(responseData.formats[i].format_id == 5) {
                            content += `<a target="_blank" class="dropdown-item" href="${responseData.formats[i].url}" download="${responseData.title}.flv" style="text-transform:Uppercase;">Flv&nbsp;<span class="vd_format">240</span></a>`;    
                            gotContent = true
                        } else if(responseData.formats[i].format_id == 43) {
                            content += `<a target="_blank" class="dropdown-item" href="${responseData.formats[i].url}" download="${responseData.title}.webm" style="text-transform:Uppercase;">WEBM&nbsp;<span class="vd_format">360</span></a>`;    
                            gotContent = true;
                        } else if(responseData.formats[i].format_id == 18) {
                            content += `<a target="_blank" class="dropdown-item" href="${responseData.formats[i].url}" download="${responseData.title}.mp4" style="text-transform:Uppercase;">Mp4&nbsp;<span class="vd_format">360</span></a>`;    
                            gotContent = true;
                        } else if(responseData.formats[i].format_id == 22) {
                            content += `<a target="_blank" class="dropdown-item" href="${responseData.formats[i].url}&video_id=${videoId}&title=${videoTitle}" download="${responseData.title}.mp4" style="text-transform:Uppercase;">Mp4&nbsp;<span class="vd_format">720</span></a>`;    
                            gotContent = true;
                        } else if(responseData.formats[i].format_id == 140) {
                            content += `<a target="_blank" class="dropdown-item" href="${responseData.formats[i].url}" download="${responseData.title}" style="text-transform:Uppercase;">Mp3&nbsp;<span class="vd_format"><i class="fa fa-volume-off"></i>140</span></a>`;
                            gotContent = true;
                        }
                        // else if(responseData.formats[i].format_id == 137) {
                        //     content += `<a target="_blank" class="dropdown-item" href="${responseData.formats[i].url}" download="${responseData.title}" style="text-transform:Uppercase;">Mp4&nbsp;<span class="vd_format">1080</span></a>`;    
                        // }
                        // content += `<a target="_blank" class="dropdown-item" href="${responseData.formats[i].url}" download="${responseData.title}" style="text-transform:Capitalize;">${responseData.formats[i].ext}&nbsp;${responseData.formats[i].format_note}</a>`;
                        if(responseData.formats[i].format_id == 17) {
                            topFormat += `${responseData.formats[i].ext}&nbsp;${responseData.formats[i].format_note}`;
                            dwnldBtn = "";                            
                            dwnldBtn += `<a target="_blank" class="btn btn-primary btn-dwnld-1" href="${responseData.formats[i].url}" download="${responseData.title}" style="text-transform:Capitalize;">Download</a>`;
                            console.log('Yes');
                        } else if(responseData.formats[i].format_id == 22) {
                            topFormat = "";
                            topFormat += `HD&nbsp;720`;
                            dwnldBtn = "";                            
                            dwnldBtn += `<a target="_blank" class="btn btn-primary btn-dwnld-1" href="${responseData.formats[i].url}" download="${responseData.title}" style="text-transform:Capitalize;">Download</a>`;                            
                        } else if(responseData.formats[i].format_id == 18) {
                            topFormat = "";
                            topFormat += `HD&nbsp;720`;               
                            dwnldBtn = "";                                                                     
                            dwnldBtn += `<a target="_blank" class="btn btn-primary btn-dwnld-1" href="${responseData.formats[i].url}" download="${responseData.title}" style="text-transform:Capitalize;">Download</a>`;                            
                        }
                    }
                }   
                console.log('getContent: ', gotContent);
                if(gotContent == true) {
                    hideAnimate();       
                    document.getElementById('thumb').innerHTML = `<img src="${responseData.thumbnail}" class="img-fluid cust-thumb-img"/>`;
                    document.getElementById('vd_title').innerHTML = `<h3 style="font-size: 1.2rem;">${responseData.title.substring(0, 45).concat("..")}</h3>`;                                     
                    document.getElementById('videos_cont').innerHTML = content;
                    document.getElementById('top_frmt').innerHTML = topFormat;
                    $("#top_frmt").css("display", "block");
                    document.getElementById('btn_dwmld').innerHTML = dwnldBtn;
                    scrollTop();                                
                } else {
                    hideAnimate();
                    $('#video-div').css('display', 'none');
                    $('#no-data').css('display', 'block');                
                    document.getElementById('no-data').innerHTML = `
                    <div style="margin: 0 auto">
                        <h3 style="font-size: 1.2rem;"> Download link not found!</h3>
                    </div>`;                                        
                }

                // hideAnimate();            
                // document.getElementById('videos_cont').innerHTML = content;
                // document.getElementById('top_frmt').innerHTML = topFormat;
                // $("#top_frmt").css("display", "block");
                // document.getElementById('btn_dwmld').innerHTML = dwnldBtn;
                // scrollTop();
            }
        }
    };
    request.open('POST', '/video', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({url: url}));    
}

//for facebbok
function facebbokVideos(url) {
    var request = new XMLHttpRequest();
    var content = ``;
    var fbCount = 1;
    showContainer();
    $('#no-data').css('display', 'none');    
    $('#video-div').hide();      
    loadAnimate();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var responseData = JSON.parse(this.responseText);
            console.log(responseData);
            if(responseData.title == 'invalid') {
                console.log('Error');
                // showContainer();
                hideAnimate();                
                $('#video-div').css('display', 'none');
                $('#no-data').css('display', 'block');                
                document.getElementById('no-data').innerHTML = `
                <div style="margin: 0 auto">
                    <h3 style="font-size: 1.2rem;">Invalid Url/ Url is not supported yet!</h3>
                </div>`;        
            } else {
                console.log(responseData);
                var len = responseData.formats.length;
                $('#no-data').css('display', 'none');
                $('#video-div').show();                
                let Counter = 0;
                let topFormat = "";
                let dwnldBtn = "";
                console.log('Len :', len);
                console.log('Title: ', responseData.title);
                console.log('Thumbnail: ', responseData.thumbnail);

                document.getElementById('thumb').innerHTML = `<img src="${responseData.thumbnail}" class="img-fluid cust-thumb-img"/>`;
                document.getElementById('vd_title').innerHTML = `<h3 style="font-size: 1.2rem;">${responseData.title.substring(0, 45).concat("..")}</h3>`;

                for(var i=0; i<len;i++) {
                    if(responseData.formats[i].format_note == undefined) {
                        console.log('Ext : '+ responseData.formats[i].ext);
                        console.log('URL: '+ responseData.formats[i].url);
                        console.log('Format: '+ responseData.formats[i].format_note);
                        console.log('Height: '+ responseData.formats[i].height);
                            if(fbCount == 1) {
                                content += `<a target="_blank" class="dropdown-item" href="${responseData.formats[i].url}" download="${responseData.title}" style="text-transform: capitalize;">${responseData.formats[i].ext}&nbsp;Low</a>`;
                                topFormat += `${responseData.formats[i].ext}&nbsp;Low</a>`;
                                dwnldBtn += `<a target="_blank" class="btn btn-primary btn-dwnld-1" href="${responseData.formats[i].url}" download="${responseData.title}" style="text-transform:Capitalize;">Download</a>`;
                            } else if(fbCount == 3) {
                                content += `<a target="_blank" class="dropdown-item" href="${responseData.formats[i].url}" download="${responseData.title}" style="text-transform: capitalize;">${responseData.formats[i].ext}&nbsp;High</a>`;
                                if(topFormat != '') {
                                    topFormat = '';
                                    dwnldBtn = '';
                                }
                                topFormat += `${responseData.formats[i].ext}&nbsp;High</a>`;
                                dwnldBtn += `<a target="_blank" class="btn btn-primary btn-dwnld-1" href="${responseData.formats[i].url}" download="${responseData.title}" style="text-transform:Capitalize;">Download</a>`;
                            }
                        fbCount++;
                    }
                }   
                hideAnimate();         
                document.getElementById('videos_cont').innerHTML = content;
                document.getElementById('top_frmt').innerHTML = topFormat;
                $("#top_frmt").css("display", "block");
                document.getElementById('btn_dwmld').innerHTML = dwnldBtn;
                scrollTop(); 
            } 
        }
    };
    request.open('POST', '/video', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({url: url}));    
}

function showContainer() {
    $('#video-container').show();
}

function checkTextField(field) {
     (field.value.trim() === "") ? console.log('Empty') : getVideoResults();
}


function scrollTop() { // when the DOM is ready...
    //  Move the window's scrollTop to the offset position of #now
    // $(window).scrollTop($('#scroll').offset().top);

    $('html, body').animate({
		scrollTop: $("#scroll").offset().top
	},800);
}

function loadAnimate() {
    $('#load').show();
}

function hideAnimate() {
    $('#load').hide();
}