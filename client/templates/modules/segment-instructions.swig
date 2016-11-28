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