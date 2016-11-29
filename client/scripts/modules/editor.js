'use strict';

class Poll{
    constructor(params){
        this.initialize(params);
    }

    initialize(params){
        this.id = params.id || 0;
        this.layout = params.layout || 0;
        this.reactions = params.reactions || ['haha', 'like'];
        this.texts = params.texts || [];
        this.images = params.images || [];
    }
}

/**
 _id : {type: String, index: true},
 _owner: {type: String},
 stream_id: {type: String},

 layout: {type: Number}, //servicePoll.POLL_LAYOUT
 reactions: [{type: String}],
 texts : [{type: String}],
 images: [{type: String}],

 fb_video_id: {type: String},
 fb_stream_key: {type: String},

 created_at: {type: Date, default: Date.now},
 updated_at: {type: Date, default: Date.now}
 */

let samplePoll1 = {
    id: "8320v824tvu3402b30bt3b",
    _owner: 19284098184141,
    stream_id: '2iu20f02f0i3i2-if',

    layout: 1,
    reactions: ['haha', 'like'],
    texts: ['Option Name 1', 'Option Name 2'],
    images: ['http://image1', 'http://image2'],

    fb_video_id: 10154826431226995,
    fb_stream_key: '5e7z42',

    created_at: '2016-11-28T13:16:50Z',
    updated_at: '2016-11-28T13:16:50Z'
}

let samplePoll2 = {
    id: "8320v824tvu3402b30bt3b",
    _owner: 19284098184141,
    stream_id: '2iu20f02f0i3i2-if',

    layout: 2,
    reactions: ['haha', 'like'],
    texts: ['Question'],
    images: ['http://background', 'http://image1', 'http://image2'],

    fb_video_id: 10154826431226995,
    fb_stream_key: '5e7z42',

    created_at: '2016-11-28T13:16:50Z',
    updated_at: '2016-11-28T13:16:50Z'
}

module.exports = function(sandbox){
    let _this = this;

    _this.render = () => {
        _this.renderLayout(_this.data.currentLayoutId);
    }

    _this.bindStageEvents = () => {
        _this.objects.$container
            .on('click', _this.DOMSelectors.triggerReaction1, function(event){
                event.preventDefault();

                _this.objects.$container.find(_this.DOMSelectors.reactionsList1)
                    .addClass('active')
                ;

                _this.objects.$container.find(_this.DOMSelectors.reactionsList2)
                    .removeClass('active')
                ;
            })
            .on('click', _this.DOMSelectors.triggerReaction2, function(event){
                event.preventDefault();

                _this.objects.$container.find(_this.DOMSelectors.reactionsList2)
                    .addClass('active')
                ;

                _this.objects.$container.find(_this.DOMSelectors.reactionsList1)
                    .removeClass('active')
                ;
            })
            .on('click', _this.DOMSelectors.reactionsList1 + ' .item', function(event){
                event.preventDefault();

                let selectedReactionValue1 = $(this).data('reaction-value');

                if(!selectedReactionValue1.length){
                    return;
                }

                _this.objects.$container.find(_this.DOMSelectors.reaction1).attr('data-reaction-value', selectedReactionValue1);

                _this.objects.$container.find(_this.DOMSelectors.reactionsList1).removeClass('active');
            })
            .on('click', _this.DOMSelectors.reactionsList2 + ' .item', function(event){
                event.preventDefault();

                let selectedReactionValue2 = $(this).data('reaction-value');

                if(!selectedReactionValue2.length){
                    return;
                }

                _this.objects.$container.find(_this.DOMSelectors.reaction2).attr('data-reaction-value', selectedReactionValue2);

                _this.objects.$container.find(_this.DOMSelectors.reactionsList2).removeClass('active');
            })
        ;
    }

    _this.bindMenuLayoutsEvents = () => {
        _this.objects.$menuLayouts
            .on('click', '.item', function(event){
                event.preventDefault();

                let $this = $(this),
                    selectedLayoutId = $this.data('id')
                ;

                if(!selectedLayoutId){
                    return;
                }

                _this.switchLayout(selectedLayoutId);

                $this.addClass('active')
                    .siblings('.active')
                    .removeClass('active')
                ;
            })
        ;
    }

    _this.removeStageEvents = () => {
        _this.objects.$container.off('click');
    }

    _this.handleUploaders = () => {
        switch(_this.data.currentLayoutId){
            case 1:
                _this.objects.$container.find(_this.DOMSelectors.image1).dropzone({
                    acceptedFiles: '.jpg, .jpeg, .png',
                    thumbnailWidth: 300,
                    thumbnailHeight: 382,
                    paramName: 'image1',
                    previewsContainer: false,
                    url: '/',
                    autoProcessQueue: true,
                    clickable: _this.objects.$container.find(_this.DOMSelectors.triggerImage1)[0],
                    thumbnail: (file, dataUrl) => {
                        _this.objects.$container.find(_this.DOMSelectors.image1).css({
                            backgroundImage: 'url('+ dataUrl + ')'
                        });
                    }
                });
                _this.objects.$container.find(_this.DOMSelectors.image2).dropzone({
                    acceptedFiles: '.jpg, .jpeg, .png',
                    thumbnailWidth: 300,
                    thumbnailHeight: 382,
                    paramName: 'image2',
                    previewsContainer: false,
                    url: '/',
                    autoProcessQueue: true,
                    clickable: _this.objects.$container.find(_this.DOMSelectors.triggerImage2)[0],
                    thumbnail: (file, dataUrl) => {
                        _this.objects.$container.find(_this.DOMSelectors.image2).css({
                            backgroundImage: 'url('+ dataUrl + ')'
                        });
                    }
                });
                break;
            case 2:
                _this.objects.$container.find(_this.DOMSelectors.background).dropzone({
                    acceptedFiles: '.jpg, .jpeg, .png',
                    thumbnailWidth: 600,
                    thumbnailHeight: 382,
                    paramName: 'background',
                    previewsContainer: false,
                    url: '/',
                    autoProcessQueue: true,
                    clickable: _this.objects.$container.find(_this.DOMSelectors.triggerBackground)[0],
                    thumbnail: (file, dataUrl) => {
                        _this.objects.$container.find(_this.DOMSelectors.background).css({
                            backgroundImage: 'url('+ dataUrl + ')'
                        })
                    }
                });
                _this.objects.$container.find(_this.DOMSelectors.image1).dropzone({
                    acceptedFiles: '.jpg, .jpeg, .png',
                    thumbnailWidth: 140,
                    thumbnailHeight: 140,
                    paramName: 'image1',
                    previewsContainer: false,
                    url: '/',
                    autoProcessQueue: true,
                    clickable: _this.objects.$container.find(_this.DOMSelectors.triggerImage1)[0],
                    thumbnail: (file, dataUrl) => {
                        _this.objects.$container.find(_this.DOMSelectors.image1).css({
                            backgroundImage: 'url('+ dataUrl + ')'
                        });
                    }
                });
                _this.objects.$container.find(_this.DOMSelectors.image2).dropzone({
                    acceptedFiles: '.jpg, .jpeg, .png',
                    thumbnailWidth: 140,
                    thumbnailHeight: 140,
                    paramName: 'image2',
                    previewsContainer: false,
                    url: '/',
                    autoProcessQueue: true,
                    clickable: _this.objects.$container.find(_this.DOMSelectors.triggerImage2)[0],
                    thumbnail: (file, dataUrl) => {
                        _this.objects.$container.find(_this.DOMSelectors.image2).css({
                            backgroundImage: 'url('+ dataUrl + ')'
                        });
                    }
                });
                break;
        }
    }

    _this.switchLayout = (layoutId) => {
        _this.removeStageEvents();
        _this.removeLayout();
        _this.setCurrentLayout(layoutId);
        _this.renderLayout(layoutId);
        _this.bindStageEvents();
        _this.handleUploaders();
    }

    _this.setCurrentLayout = (layoutId) => {
        if(layoutId){
            _this.data.currentLayoutId = layoutId;
        }
    }

    _this.renderLayout = (layoutId) => {
        if(!_this.templates.layouts[layoutId]){
            return;
        }
        
        let html = swig.render(_this.templates.layouts[layoutId], {
            locals: {
                poll: _this.data.poll,
                mode: _this.data.mode
            }
        });
        
        _this.objects.$stageBody.html(html);
    }

    _this.removeLayout = () => {}

    _this.init = (data) => {
        _this.data = data || {};

        if(!_this.data.containerDOM){
            return;
        }

        _this.DOMSelectors = {
            background: '.object.background',
            image1: '.object.image-1',
            image2: '.object.image-2',
            reaction1: '.object.reaction-1',
            reaction2: '.object.reaction-2',
            triggerBackground: '.object.trigger[data-trigger-object="background"]',
            triggerImage1: '.object.trigger[data-trigger-object="image-1"]',
            triggerImage2: '.object.trigger[data-trigger-object="image-2"]',
            triggerReaction1: '.object.trigger[data-trigger-object="reaction-1"]',
            triggerReaction2: '.object.trigger[data-trigger-object="reaction-2"]',
            reactionsLists: '.object.reactions-list',
            reactionsList1: '.object.reactions-list[data-target-object="reaction-1"]',
            reactionsList2: '.object.reactions-list[data-target-object="reaction-2"]',
        };

        _this.objects = {};
        _this.objects.$container = $(_this.data.containerDOM);
        _this.objects.$menuLayouts = _this.objects.$container.find('.menu .layouts');
        _this.objects.$menuLayoutsBodyList = _this.objects.$menuLayouts.find('.body .list');
        _this.objects.$stage = _this.objects.$container.find('.stage');
        _this.objects.$stageBody = _this.objects.$stage.children('.body');

        if(!_this.objects.$container.length){
            return false;
        }

        _this.templates = {
            layouts: {
                1: multiline(() => {/*!@preserve
                    <div class="sn card" data-layout-id="1">
                        <div class="layer images">
                            <div class="object image image-1" {% if (poll.images && poll.images[0]) %}style="background-image:url({{poll.images[0]}});"{% endif %}></div>
                            <div class="object image image-2" {% if (poll.images && poll.images[1]) %}style="background-image:url({{poll.images[1]}});"{% endif %}></div>
                            <div class="object reaction reaction-1" data-reaction-value="{% if (poll.images && poll.images[0]) %}{{poll.reactions[0]}}{% else %}haha{% endif %}"></div>
                            <div class="object reaction reaction-2" data-reaction-value="{% if (poll.images && poll.images[1]) %}{{poll.reactions[1]}}{% else %}like{% endif %}"></div>
                            <div class="object text title-1">{% if (poll.texts && poll.texts[0]) %}{{poll.texts[0]}}{% endif %}</div>
                            <div class="object text title-2">{% if (poll.texts && poll.texts[1]) %}{{poll.texts[1]}}{% endif %}</div>
                        </div>
                    {% if mode == 'edit' %}
                        <div class="layer controls">
                            <input type="text" class="object input title-1" placeholder="Enter option's name" value="{% if (poll.texts && poll.texts[0]) %}{{poll.texts[0]}}{% endif %}"/>
                            <input type="text" class="object input title-2" placeholder="Enter option's name" value="{% if (poll.texts && poll.texts[1]) %}{{poll.texts[1]}}{% endif %}"/>
                            <div class="object trigger image-trigger" data-trigger-object="image-1"></div>
                            <div class="object trigger image-trigger" data-trigger-object="image-2"></div>
                            <div class="object trigger reaction-trigger" data-trigger-object="reaction-1"></div>
                            <div class="object trigger reaction-trigger" data-trigger-object="reaction-2"></div>

                            <div class="object reactions-list" data-target-object="reaction-1">
                                <div class="item" data-reaction-value="like"></div>
                                <div class="item" data-reaction-value="love"></div>
                                <div class="item" data-reaction-value="haha"></div>
                                <div class="item" data-reaction-value="wow"></div>
                                <div class="item" data-reaction-value="sad"></div>
                                <div class="item" data-reaction-value="angry"></div>
                            </div>

                            <div class="object reactions-list" data-target-object="reaction-2">
                                <div class="item" data-reaction-value="like"></div>
                                <div class="item" data-reaction-value="love"></div>
                                <div class="item" data-reaction-value="haha"></div>
                                <div class="item" data-reaction-value="wow"></div>
                                <div class="item" data-reaction-value="sad"></div>
                                <div class="item" data-reaction-value="angry"></div>
                            </div>
                        </div>
                    {% endif %}
                    </div>
                */console.log}),
                2: multiline(() => {/*!@preserve
                    <div class="sn card" data-layout-id="2">
                        <div class="layer images">
                            <div class="object background" {% if (poll.images && poll.images[0]) %}style="background-image:url({{poll.images[0]}});"{% endif %}></div>
                            <div class="object image image-1" {% if (poll.images && poll.images[1]) %}style="background-image:url({{poll.images[1]}});"{% endif %}></div>
                            <div class="object image image-2" {% if (poll.images && poll.images[2]) %}style="background-image:url({{poll.images[2]}});"{% endif %}></div>
                            <div class="object reaction reaction-1" data-reaction-value="{% if (poll.images && poll.images[0]) %}{{poll.reactions[0]}}{% else %}haha{% endif %}"></div>
                            <div class="object reaction reaction-2" data-reaction-value="{% if (poll.images && poll.images[1]) %}{{poll.reactions[1]}}{% else %}like{% endif %}"></div>
                            <div class="object text question">{% if (poll.texts && poll.texts[0]) %}{{poll.texts[0]}}{% endif %}</div>
                        </div>
                    {% if mode == 'edit' %}
                        <div class="layer controls">
                            <textarea class="object question" placeholder="Enter your question here...">{% if (poll.texts && poll.texts[0]) %}{{poll.texts[0]}}{% endif %}</textarea>
                            <div class="object trigger image-trigger" data-trigger-object="background"></div>
                            <div class="object trigger image-trigger" data-trigger-object="image-1"></div>
                            <div class="object trigger image-trigger" data-trigger-object="image-2"></div>
                            <div class="object trigger reaction-trigger" data-trigger-object="reaction-1"></div>
                            <div class="object trigger reaction-trigger" data-trigger-object="reaction-2"></div>

                            <div class="object reactions-list" data-target-object="reaction-1">
                                <div class="item" data-reaction-value="like"></div>
                                <div class="item" data-reaction-value="love"></div>
                                <div class="item" data-reaction-value="haha"></div>
                                <div class="item" data-reaction-value="wow"></div>
                                <div class="item" data-reaction-value="sad"></div>
                                <div class="item" data-reaction-value="angry"></div>
                            </div>

                            <div class="object reactions-list" data-target-object="reaction-2">
                                <div class="item" data-reaction-value="like"></div>
                                <div class="item" data-reaction-value="love"></div>
                                <div class="item" data-reaction-value="haha"></div>
                                <div class="item" data-reaction-value="wow"></div>
                                <div class="item" data-reaction-value="sad"></div>
                                <div class="item" data-reaction-value="angry"></div>
                            </div>
                        </div>
                    {% endif %}
                    </div>
                */console.log})
            }
        }

        _this.data.currentLayoutId = _this.objects.$container.data('layout-id') || 1;

        _this.data.mode = _this.objects.$container.hasClass('editable')?'edit':'view';

        let pollDataString = decodeURIComponent(_this.objects.$container.data('poll-data') || '') || '{}';
        _this.data.poll = JSON.parse(pollDataString);

        _this.render();

        _this.bindMenuLayoutsEvents();
        _this.bindStageEvents();
        _this.handleUploaders();
    }
    _this.destroy = (data) => {}

    return {
        init: _this.init,
        destroy: _this.destroy
    }
}