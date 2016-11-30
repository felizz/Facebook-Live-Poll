'use strict';

module.exports = function(sandbox){
    let _this = this;

    _this.bindEvents = () => {
        _this.objects.$accordionHeader
            .on('click', function(event){
                event.preventDefault();

                _this.objects.$accordion.addClass('active');
            })
        ;

        _this.bindFormVideoIdEvents();
        _this.bindFormSetupStreamEvents();
    }

    _this.bindFormVideoIdEvents = () => {
        _this.objects.$formVideoId
            .on('submit', function(event){
                event.preventDefault();
                let pollId = _this.objects.$formVideoId.data('poll-id');

                let requestedData = {
                    fb_video_id: _this.objects.$formVideoId.find('[name=fb_video_id]').val()
                };

                $
                    .ajax({
                        type: 'POST',
                        url: '/api/v1/poll/'+pollId+'/update-additional-info',
                        data: JSON.stringify(requestedData),
                        contentType: "application/json; charset=utf-8",
                    })
                    .done((response) => {
                        console.log('response', response);
                        if(response._id){
                            window.location.reload();
                        }
                    })
                ;
            })
        ;
    }

    _this.bindFormSetupStreamEvents = () => {
        _this.objects.$formSetupStream
            .on('submit', function(event){
                event.preventDefault();
                let pollId = _this.objects.$formSetupStream.data('poll-id');

                let requestedData = {
                    fb_stream_url: _this.objects.$formSetupStream.find('[name=fb_stream_url]').val(),
                    fb_stream_key: _this.objects.$formSetupStream.find('[name=fb_stream_key]').val()
                };

                $
                    .ajax({
                        type: 'POST',
                        url: '/api/v1/poll/'+pollId+'/update-additional-info',
                        data: JSON.stringify(requestedData),
                        contentType: "application/json; charset=utf-8",
                    })
                    .done((response) => {
                        console.log('response', response);
                        if(response._id){
                            window.location.reload();
                        }
                    })
                ;
            })
        ;
    }

    _this.init = (data) => {
        _this.data = data || {};

        _this.objects = {};
        _this.objects.$container = $('#segment_instructions');
        _this.objects.$formVideoId = $('#form_video_id');
        _this.objects.$formSetupStream = $('#form_setup_stream');
        _this.objects.$accordion = $('#accordion_instructions');
        _this.objects.$accordionHeader = _this.objects.$accordion.children('.header');

        _this.bindEvents();
    }
    _this.destroy = () => {}

    return {
        init: _this.init,
        destroy: _this.destroy
    }
}