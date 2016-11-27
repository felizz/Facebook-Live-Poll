module.exports = function(sandbox){
    let _this = this;

    _this.bindEvents = () => {
        _this.objects.$triggerReaction1.on('click', (event) => {
                event.preventDefault();

                _this.objects.$reactionsList1
                    .addClass('active')
                ;

                _this.objects.$reactionsList2
                    .removeClass('active')
                ;
            });

        _this.objects.$triggerReaction2.on('click', (event) => {
                event.preventDefault();

                _this.objects.$reactionsList2
                    .addClass('active')
                ;

                _this.objects.$reactionsList1
                    .removeClass('active')
                ;
            });

        _this.objects.$reactionsList1.on('click', '.item', function(event){
                event.preventDefault();

                let selectedReactionValue1 = $(this).data('reaction-value');

                if(!selectedReactionValue1.length){
                    return;
                }

                _this.objects.$reaction1.attr('data-reaction-value', selectedReactionValue1);

                _this.objects.$reactionsList1.removeClass('active');
            });

        _this.objects.$reactionsList2.on('click', '.item', function(event){
                event.preventDefault();

                let selectedReactionValue2 = $(this).data('reaction-value');

                if(!selectedReactionValue2.length){
                    return;
                }

                _this.objects.$reaction2.attr('data-reaction-value', selectedReactionValue2);

                _this.objects.$reactionsList2.removeClass('active');
            });

        _this.objects.$background.dropzone({
            acceptedFiles: '.jpg, .jpeg, .png',
            thumbnailWidth: 600,
            thumbnailHeight: 382,
            paramName: 'background',
            previewsContainer: false,
            url: '/',
            autoProcessQueue: true,
            clickable: _this.objects.$triggerBackground[0],
            thumbnail: (file, dataUrl) => {
                _this.objects.$background.css({
                    backgroundImage: 'url('+ dataUrl + ')'
                })
            }
        })

        _this.objects.$image1.dropzone({
            acceptedFiles: '.jpg, .jpeg, .png',
            thumbnailWidth: 140,
            thumbnailHeight: 140,
            paramName: 'image1',
            previewsContainer: false,
            url: '/',
            autoProcessQueue: true,
            clickable: _this.objects.$triggerImage1[0],
            thumbnail: (file, dataUrl) => {
                _this.objects.$image1.css({
                    backgroundImage: 'url('+ dataUrl + ')'
                })
            }
        });

        _this.objects.$image2.dropzone({
            acceptedFiles: '.jpg, .jpeg, .png',
            thumbnailWidth: 140,
            thumbnailHeight: 140,
            paramName: 'image2',
            previewsContainer: false,
            url: '/',
            autoProcessQueue: true,
            clickable: _this.objects.$triggerImage2[0],
            thumbnail: (file, dataUrl) => {
                _this.objects.$image2.css({
                    backgroundImage: 'url('+ dataUrl + ')'
                })
            }
        });em
    }

    _this.init = (data) => {
        _this.data = data || {};

        if(!_this.data.containerDOM){
            return false;
        }

        _this.objects = {};
        _this.objects.$container = $(_this.data.containerDOM);

        if(!_this.objects.$container.length){
            return false;
        }

        _this.objects.$background = _this.objects.$container.find('.object.background');
        _this.objects.$image1 = _this.objects.$container.find('.object.image-1');
        _this.objects.$image2 = _this.objects.$container.find('.object.image-2');
        _this.objects.$reaction1 = _this.objects.$container.find('.object.reaction-1');
        _this.objects.$reaction2 = _this.objects.$container.find('.object.reaction-2');

        _this.objects.$triggerBackground = _this.objects.$container.find('.object.trigger[data-trigger-object="background"]');
        _this.objects.$triggerImage1 = _this.objects.$container.find('.object.trigger[data-trigger-object="image-1"]');
        _this.objects.$triggerImage2 = _this.objects.$container.find('.object.trigger[data-trigger-object="image-2"]');
        _this.objects.$triggerReaction1 = _this.objects.$container.find('.object.trigger[data-trigger-object="reaction-1"]');
        _this.objects.$triggerReaction2 = _this.objects.$container.find('.object.trigger[data-trigger-object="reaction-2"]');

        _this.objects.$reactionsLists = _this.objects.$container.find('.object.reactions-list');
        _this.objects.$reactionsList1 = _this.objects.$reactionsLists.filter('[data-target-object="reaction-1"]');
        _this.objects.$reactionsList2 = _this.objects.$reactionsLists.filter('[data-target-object="reaction-2"]');

        _this.bindEvents();
    }
    _this.destroy = (data) => {}

    return {
        init: _this.init,
        destroy: _this.destroy
    }
}