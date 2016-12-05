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

        _this.bindFormVideoId1Events();
        _this.bindFormVideoId2Events();
    }

    _this.bindFormVideoId1Events = () => {
        _this.objects.$formVideoId1
            .on('submit', function(event){
                event.preventDefault();
                let pollId = _this.objects.$formVideoId1.data('poll-id');

                let requestedData = {
                    fb_video_id: _this.objects.$formVideoId1.find('[name=fb_video_id]').val()
                };

                _this.objects.$formVideoId1.attr('data-is-submitting', 1);
                _this.objects.$formVideoId1.find(':input').prop('disabled', true);

                $
                    .ajax({
                        type: 'POST',
                        url: '/api/v1/poll/'+pollId+'/update-additional-info',
                        data: JSON.stringify(requestedData),
                        contentType: "application/json; charset=utf-8",
                    })
                    .done((response) => {
                        if(response.fb_video_id ){
                            // window.location.reload();
                            $('.cell.facebook-post-id .body').html(response.fb_video_id);
                            // _this.objects.$formVideoId1.hide();
                            // _this.objects.$formVideoId2.hide();
                        }
                    })
                    .fail((response) => {
                        bootbox.alert('There\'s an error');
                    })
                    .always(() => {
                        _this.objects.$formVideoId1.attr('data-is-submitting', 0);
                        _this.objects.$formVideoId1.find(':input').prop('disabled', false);
                    })
                ;
            })
        ;
    }

    _this.bindFormVideoId2Events = () => {
        _this.objects.$formVideoId2
            .on('submit', function(event){
                event.preventDefault();
                let pollId = _this.objects.$formVideoId2.data('poll-id');

                let requestedData = {
                    fb_video_id: _this.objects.$formVideoId2.find('[name=fb_video_id]').val()
                };

                _this.objects.$formVideoId2.attr('data-is-submitting', 1);
                _this.objects.$formVideoId2.find(':input').prop('disabled', true);

                $
                    .ajax({
                        type: 'POST',
                        url: '/api/v1/poll/'+pollId+'/update-additional-info',
                        data: JSON.stringify(requestedData),
                        contentType: "application/json; charset=utf-8",
                    })
                    .done((response) => {
                        if(response.fb_video_id ){
                            // window.location.reload();
                            $('.cell.facebook-post-id .body').html(response.fb_video_id);
                            // _this.objects.$formVideoId1.hide();
                            // _this.objects.$formVideoId2.hide();
                        }
                    })
                    .fail((response) => {
                        bootbox.alert('There\'s an error');
                    })
                    .always(() => {
                        _this.objects.$formVideoId2.attr('data-is-submitting', 0);
                        _this.objects.$formVideoId2.find(':input').prop('disabled', false);
                    })
                ;
            })
        ;
    }

    _this.init = (data) => {
        _this.data = data || {};

        _this.objects = {};
        _this.objects.$container = $('#segment_instructions');
        _this.objects.$formVideoId1 = $('#form_video_id_1');
        _this.objects.$formVideoId2 = $('#form_video_id_2');
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