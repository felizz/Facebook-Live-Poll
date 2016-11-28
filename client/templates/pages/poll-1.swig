{% extends '../layouts/base.swig' %}

{% block main %}
<div class="header">
    <div class="container">
        <div class="col-md-8 col-md-offset-2 text-center">
            <h2>Create your own Facebook Live Poll</h2>
            <h3>A successful marketing plan relies heavily on the pulling-power of advertising copy. Writing result-oriented ad copy is difficult,</h3>
        </div>
    </div>
</div>

<div class="body">
    <div class="sn editor" data-layout-id="1" data-poll-data="%7B%22id%22%3A%228320v824tvu3402b30bt3b%22%2C%22owner_id%22%3A19284098184141%2C%22stream_id%22%3A%222iu20f02f0i3i2-if%22%2C%22layout%22%3A1%2C%22reactions%22%3A%5B%22haha%22%2C%22like%22%5D%2C%22texts%22%3A%5B%22Option%201'%20name%22%2C%22Option%20Name%202%22%5D%2C%22images%22%3A%5B%22http%3A%2F%2Florempixel.com%2F300%2F382%2Fanimals%2F1%2F%22%2C%22http%3A%2F%2Florempixel.com%2F300%2F382%2Fanimals%2F2%2F%22%5D%2C%22fb_video_id%22%3A10154826431226996%2C%22fb_stream_key%22%3A%225e7z42%22%2C%22created_at%22%3A%222016-11-28T13%3A16%3A50Z%22%2C%22updated_at%22%3A%222016-11-28T13%3A16%3A50Z%22%7D">
        <div class="container">
            <div class="row">
                <div class="menu-container">
                    <div class="menu">
                        <div class="info">
                            <div class="header">
                                <span class="meta creator">Timothy Mendoza</span>
                            </div>

                            <div class="body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="cell poll-size">
                                            <div class="header">
                                                Poll size
                                            </div>
                                            <div class="body">
                                                600x375
                                            </div>
                                        </div>
                                        <div class="cell reaction-used">
                                            <div class="header">
                                                Reaction used
                                            </div>
                                            <div class="body">
                                                5
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="cell facebook-post-id">
                                            <div class="header">
                                                Facebook Post ID
                                            </div>
                                            <div class="body">
                                                10154826431226995
                                            </div>
                                        </div>

                                        <div class="cell stream-url-id">
                                            <div class="header">
                                                Stream URL ID
                                            </div>
                                            <div class="body">
                                                http://seanote.com/5e7z42
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="stage-container">
                    <div class="stage">
                        <div class="body">

                        </div>
                    </div>
                </div>
            </div>

            <div class="sn segment" id="segment_instructions">
                <div class="body">
                    <p>To track your facebook video reactions, please enter your facebook video ID below:</p>
                    <form action="" class="sn form" id="form_video_id">
                        <div class="form-group">
                            <label for="form_video_id__input_video_id">Video ID</label>
                            <input type="text" class="form-control" id="form_video_id__input_video_id"/>
                            <button class="sn btn">Save</button>
                        </div>
                    </form>
                    
                    <h3>Next step to set up Live Polling on Facebook</h3>
                    
                    <ul class="sn timeline">
                        <li class="item">
                            <div class="indicator number">1</div>
                            <div class="content">
                                <div class="header">
                                    <h4 class="title">Set your Facebook Live</h4>
                                </div>
                                <div class="body">
                                    <p>
                                        To go live, we will use the <a>Publishing Tools</a> on your Facebook Page.<br/>
                                        Log on to your Facebook page and click on Publishing Tools in the top menu. Then click on Videos on the left menu. Then click on the +Live button on the top right.
                                    </p>
                                    <p class="text-center">
                                        <img src='./../../images/demo/modules/editor/instructions.image-1.png' alt="">
                                    </p>

                                    <p>
                                        Then copy the stream key in the modal window that appears:
                                    </p>

                                    <p class="text-center">
                                        <img src='./../../images/demo/modules/editor/instructions.image-2.png' alt="">
                                    </p>

                                    <p class="quote">
                                        Important: The Server URL and Stream Key can only be used for a single Live preview/post connection. You must use the same URL and key to preview and post. That is, you cannot preview, stop the stream, and then resume at a later time. The URL and Key also expire 24 hours after creation or 4 hours within the preview.
                                    </p>

                                    <p class="text-center">
                                        <img src='./../../images/demo/modules/editor/instructions.image-3.png' alt="">
                                    </p>

                                    <p>
                                        After fill in the content for the live poll post, we need to retrieve its Post ID. Click on Setting (the top right gear icon) → embed. You will see the embedded Link for this Post. Copy only the Video Id (normally is the digit-only string) from the link and paste it below:
                                    </p>

                                    <p>
                                        We leave the popup open for now. We will need to finish step 2 before coming back here.
                                    </p>
                                </div>
                            </div>
                        </li>

                        <li class="item">
                            <div class="indicator number">2</div>
                            <div class="content">
                                <div class="header">
                                    <h4 class="title">Configure OBS Streaming Software</h4>
                                </div>
                                <div class="body">
                                    <p>
                                        Duration: 15 minutes
                                    </p>

                                    <p>
                                        This is the second and last step of this guide.<br/>
                                        1. If you haven’t download and install OBS, do it now through this link.<br/>
                                        2. Once OBS Software is installed, go to Settings (or Preferences in Mac), click on “Stream” in the left menu.<br/>
                                        Select “Streaming Services” as the Stream Type and “Facebook Live” as the Service. Enter <Stream Key here> as the Stream key.
                                    </p>

                                    <p class="text-center">
                                        <img src='./../../images/demo/modules/editor/instructions.image-4.png' alt="">
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}