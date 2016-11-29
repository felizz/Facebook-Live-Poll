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

        <p> Note </p>
        <p> - Duration: 15 minutes </p>

        <ul class="sn timeline">
            <li class="item">
                <div class="indicator number">1</div>
                <div class="content">
                    <div class="header">
                        <h4 class="title">Create your Facebook Live Video</h4>
                    </div>
                    <div class="body">
                        <p>
                            Log in to your Facebook page and click on Publishing Tools in the page navigation menu. Then click on Videos on the left menu. Then click on the +Live button as described in the image below. </p>
                        <p class="text-center">
                            <img src='./../../images/demo/modules/editor/instructions.image-1.png' alt="">
                        </p>

                        <p>
                            Then you need to copy the Stream Key in the window that appears. Save it below:
                        </p>

                        <p>
                            -- Box for saving Stream key here --
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
                            After fill in the content for the live poll post, we need to retrieve its Video ID.
                            Click on Setting (the top right gear icon) → embed. You will see the embedded Link for this Post.
                            Copy only the Video Id (normally is the digit-only string) from the link and paste it below:
                        </p>

                        <p>
                            -- Box for saving Video Id here --
                        </p>

                        <p class="text-center">
                            <img src='./../../images/demo/modules/editor/instructions.image-3.5.png' alt="">
                        </p>

                        <p>
                            Click on Ok and leave the popup open for now. We will need to finish step 2 before coming back here.
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
                            1. If you haven’t download and install OBS, do it now through <a href="https://obsproject.com/download">this link</a>.
                        </p>

                        <p>
                            2. Once OBS Software is installed, go to Settings (or Preferences in Mac), click on “Stream” in the left menu.<br/>
                            Select “Streaming Services” as the Stream Type and “Facebook Live” as the Service. Enter --Stream Key-- as the Stream key.
                        </p>

                        <p class="text-center">
                            <img src='./../../images/demo/modules/editor/instructions.image-4.png' alt="">
                        </p>

                        <p>
                            Then click on Video on the left menu. Enter the Width & Height of the Video as --WidthxHeight--.
                        </p>

                        <p class="text-center">
                            <img src='./../../images/demo/modules/editor/instructions.image-4.5.png' alt="">
                        </p>

                        <p>
                            Then click on Ok button.
                        </p>

                        <p>
                            3. Add your source in OBS dashboard. Click on “+” > “Browsersource” > Create new.
                        </p>

                        <p class="text-center">
                            <img src='./../../images/demo/modules/editor/instructions.image-5.png' alt="">
                        </p>

                        <p>
                           Then enter a name for this new video input stream
                        </p>

                        <p class="text-center">
                            <img src='./../../images/demo/modules/editor/instructions.image-6.png' alt="">
                        </p>

                        <p>
                            In the following dialog, enter --Stream URL-- as Stream URL, --WidthxHeigh-- as Width & Height separately.
                        </p>

                        <p class="text-center">
                            <img src='./../../images/demo/modules/editor/instructions.image-7.png' alt="">
                        </p>

                        <p>
                            Then click on OK button.
                        </p>

                        <p>
                            4. After finish setting up for OBS, click on Start Streaming
                        </p>

                        <p class="text-center">
                            <img src='./../../images/demo/modules/editor/instructions.image-8.png' alt="">
                        </p>


                    </div>
                </div>
            </li>

            <li class="item">
                <div class="indicator number">3</div>
                <div class="content">
                    <div class="header">
                        <h4 class="title">Let go live!</h4>
                    </div>
                    <div class="body">


                        <p>
                            We go back to the Live Posting Popup. Wait for a few seconds, it should display “Fetching video stream”.
                            After few more seconds, it should pick up the stream from OBS Software. You will be able then to see the poll we created.
                        </p>

                        <p class="text-center">
                            <img src='./../../images/demo/modules/editor/instructions.image-9.png' alt="">
                        </p>

                        <p>
                            If thing goes as expected, click on "Go Live". Now enjoy your result! you have made your first Live Polling post on your Facebook page.
                        </p>


                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>