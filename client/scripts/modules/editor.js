'use strict';

import Joi from 'joi-browser';

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

const rawPoll = {
    layout: 1,
    reactions: {
        reaction1: 'haha',
        reaction2: 'like'
    },
    texts: {
        'question': '',
        'text1': '',
        'text2': ''
    },
    images: {
        'background':'',
        'image1':'',
        'image2':''
    }
};
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


const rawPollSchema = Joi.object().keys({
    layout: Joi.number().integer().min(1).max(2),
    reactions: Joi.object().keys({
        reaction1: Joi.string().valid(['haha', 'like', 'wow', 'sad', 'angry', 'love']),
        reaction2: Joi.string().valid(['haha', 'like', 'wow', 'sad', 'angry', 'love'])
    }),
    texts: Joi.alternatives()
        .when('layout', {is: 1, then: Joi.object().keys({text1: Joi.string().min(1).error(new Error("Please input the option #1's name")), text2: Joi.string().min(1).error(new Error("Please input the option #2's name"))})})
        .when('layout', {is: 2, then: Joi.object().keys({question: Joi.string().min(1).error(new Error("Please input the question"))})}),
    images: Joi.alternatives()
        .when('layout', {is: 1, then: Joi.object().keys({image1: Joi.string().allow(''), image2: Joi.string().allow('')})})
        .when('layout', {is: 2, then: Joi.object().keys({background: Joi.string().allow(''), image1: Joi.string().error(new Error("Please add the first picture")), image2: Joi.string().error(new Error("Please add the second picture"))})})
});

module.exports = function(sandbox){
    let _this = this;

    _this.render = () => {
        _this.renderLayout(_this.data.currentLayoutId);
        if(_this.data.isStreaming){
            setInterval(()=>{
                _this.renderReactionsCounts();
            }, 3000);
        } else {
            _this.renderReactionsCounts();
        }
    }

    _this.bindPublishEvents = () => {
        _this.objects.$buttonPublish
            .on('click', function(event){
                _this.publish();
            })
        ;
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

                if(_this.data.rawPoll
                && _this.data.rawPoll.reactions){
                    _this.data.rawPoll.reactions.reaction1 = selectedReactionValue1;
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

                if(_this.data.rawPoll
                    && _this.data.rawPoll.reactions){
                    _this.data.rawPoll.reactions.reaction2 = selectedReactionValue2;
                }

                _this.objects.$container.find(_this.DOMSelectors.reaction2).attr('data-reaction-value', selectedReactionValue2);

                _this.objects.$container.find(_this.DOMSelectors.reactionsList2).removeClass('active');
            })
            .on('change', _this.DOMSelectors.inputQuestion, function(event){
                let $this = $(this);

                if(_this.data.rawPoll
                    && _this.data.rawPoll.texts){
                    _this.data.rawPoll.texts.question = $this.val();
                }
            })
            .on('change', _this.DOMSelectors.inputText1, function(event){
                let $this = $(this);

                if(_this.data.rawPoll
                    && _this.data.rawPoll.texts){
                    _this.data.rawPoll.texts.text1 = $this.val();
                }
            })
            .on('change', _this.DOMSelectors.inputText2, function(event){
                let $this = $(this);

                if(_this.data.rawPoll
                    && _this.data.rawPoll.texts){
                    _this.data.rawPoll.texts.text2 = $this.val();
                }
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
                    paramName: 'fileToUpload',
                    previewsContainer: false,
                    url: '/api/v1/poll/upload-image',
                    autoProcessQueue: true,
                    clickable: _this.objects.$container.find(_this.DOMSelectors.triggerImage1)[0],
                    addedfile: (file) => {
                        _this.objects.$container.find(_this.DOMSelectors.image1).addClass('loading');
                    },
                    success: (file, response) => {
                        if(_this.data.rawPoll
                        && _this.data.rawPoll.images
                        && response
                        && response.url){
                            _this.data.rawPoll.images.image1 = response.url
                        }

                        _this.objects.$container.find(_this.DOMSelectors.image1)
                            .css({
                                backgroundImage: 'url('+ response.url + ')'
                            })
                            .removeClass('loading')
                        ;
                    }
                });
                _this.objects.$container.find(_this.DOMSelectors.image2).dropzone({
                    acceptedFiles: '.jpg, .jpeg, .png',
                    thumbnailWidth: 300,
                    thumbnailHeight: 382,
                    paramName: 'fileToUpload',
                    previewsContainer: false,
                    url: '/api/v1/poll/upload-image',
                    autoProcessQueue: true,
                    clickable: _this.objects.$container.find(_this.DOMSelectors.triggerImage2)[0],
                    addedfile: (file) => {
                        _this.objects.$container.find(_this.DOMSelectors.image2).addClass('loading');
                    },
                    success: (file, response) => {
                        if(_this.data.rawPoll
                            && _this.data.rawPoll.images
                            && response
                            && response.url){
                            _this.data.rawPoll.images.image2 = response.url
                        }

                        _this.objects.$container.find(_this.DOMSelectors.image2)
                            .css({
                                backgroundImage: 'url('+ response.url + ')'
                            })
                            .removeClass('loading')
                        ;
                    }
                });
                break;
            case 2:
                _this.objects.$container.find(_this.DOMSelectors.background).dropzone({
                    acceptedFiles: '.jpg, .jpeg, .png',
                    thumbnailWidth: 600,
                    thumbnailHeight: 382,
                    paramName: 'fileToUpload',
                    previewsContainer: false,
                    url: '/api/v1/poll/upload-image',
                    autoProcessQueue: true,
                    clickable: _this.objects.$container.find(_this.DOMSelectors.triggerBackground)[0],
                    addedfile: (file) => {
                        _this.objects.$container.find(_this.DOMSelectors.background).addClass('loading');
                    },
                    success: (file, response) => {
                        if(_this.data.rawPoll
                            && _this.data.rawPoll.images
                            && response
                            && response.url){
                            _this.data.rawPoll.images.background = response.url
                        }

                        _this.objects.$container.find(_this.DOMSelectors.background)
                            .css({
                                backgroundImage: 'url('+ response.url + ')'
                            })
                            .removeClass('loading')
                        ;
            }
                });
                _this.objects.$container.find(_this.DOMSelectors.image1).dropzone({
                    acceptedFiles: '.jpg, .jpeg, .png',
                    thumbnailWidth: 140,
                    thumbnailHeight: 140,
                    paramName: 'fileToUpload',
                    previewsContainer: false,
                    url: '/api/v1/poll/upload-image',
                    autoProcessQueue: true,
                    clickable: _this.objects.$container.find(_this.DOMSelectors.triggerImage1)[0],
                    addedfile: (file) => {
                        _this.objects.$container.find(_this.DOMSelectors.image1).addClass('loading');
                    },
                    success: (file, response) => {
                        if(_this.data.rawPoll
                            && _this.data.rawPoll.images
                            && response
                            && response.url){
                            _this.data.rawPoll.images.image1 = response.url
                        }

                        _this.objects.$container.find(_this.DOMSelectors.image1)
                            .css({
                                backgroundImage: 'url('+ response.url + ')'
                            })
                            .removeClass('loading')
                        ;
                    }
                });
                _this.objects.$container.find(_this.DOMSelectors.image2).dropzone({
                    acceptedFiles: '.jpg, .jpeg, .png',
                    thumbnailWidth: 140,
                    thumbnailHeight: 140,
                    paramName: 'fileToUpload',
                    previewsContainer: false,
                    url: '/api/v1/poll/upload-image',
                    autoProcessQueue: true,
                    clickable: _this.objects.$container.find(_this.DOMSelectors.triggerImage2)[0],
                    addedfile: (file) => {
                        _this.objects.$container.find(_this.DOMSelectors.image2).addClass('loading');
                    },
                    success: (file, response) => {
                        if(_this.data.rawPoll
                            && _this.data.rawPoll.images
                            && response
                            && response.url){
                            _this.data.rawPoll.images.image2 = response.url
                        }

                        _this.objects.$container.find(_this.DOMSelectors.image2)
                            .css({
                                backgroundImage: 'url('+ response.url + ')'
                            })
                            .removeClass('loading')
                        ;
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

            if(_this.data.rawPoll){
                //FIXME: Reset raw poll when switching between layouts
                _this.data.rawPoll = rawPoll;
                _this.data.rawPoll.layout = layoutId;
            }
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

    _this.renderReactionsCounts = () => {
        if('view' !== _this.data.mode){
            return false;
        }

        if(!_this.data.poll
        || !_this.data.poll._id){
            return false;
        }

        let pollId = _this.data.poll._id,
            fbVideoId = _this.data.poll.fb_video_id
        ;

        let requestedData = {
            poll_id: pollId
        }

        $
            .ajax({
                type: 'GET',
                url: '/api/v1/poll/'+pollId+'/reactions-count',
                data: requestedData
            })
            .done((response) => {
                let reaction1 = _this.data.poll.reactions[0],
                    reaction2 = _this.data.poll.reactions[1],
                    html = swig.render(_this.templates.reactionsCounts, {
                        locals: {
                            reactionsCounts: [
                                response[reaction1],
                                response[reaction2]
                            ]
                        }
                    })
                ;

                _this.objects.$container.find(_this.DOMSelectors.layerImages).append(html);
            })
            .fail((response) => {
                console.log('failed', response);
            })
        ;
    }

    _this.renderUsedReactionsCounter = () => {
        if(!_this.objects.$menuInfo.length){
            return false;
        }

        let $usedReactionsCounter = _this.objects.$menuInfo.find(_this.DOMSelectors.usedReactionsCounter);

        if(!$usedReactionsCounter.length){
            return false;
        }

        let pollId = $usedReactionsCounter.data('poll-id'),
            fbVideoId = $usedReactionsCounter.data('fb-video-id')
        ;

        if(!fbVideoId){
            return false;
        }

        let requestedData = {
            poll_id: pollId
        }

        $
            .ajax({
                type: 'GET',
                url: '/api/v1/poll/'+pollId+'/reactions-count',
                data: requestedData
            })
            .done((response) => {
                console.log('reaction success response', response);
                $usedReactionsCounter.html(123);
            })
            .fail((response) => {
                $usedReactionsCounter.html('');
            })
        ;
    }

    _this.removeLayout = () => {}

    _this.publish = () => {
        return Joi.validate(_this.data.rawPoll, rawPollSchema, {allowUnknown: true}, (error, value) => {
            if(error){
                let message = '';

                if(error.message
                && error.message.length){
                    message = swig.render(_this.templates.validationError, {
                        locals: {
                            error: error
                        }
                    });
                } else if(error.details
                && error.details.length){
                    message = swig.render(_this.templates.validationErrors, {
                        locals: {
                            errors: error.details
                        }
                    });
                }

                if(!message.length){
                    message = 'There\'s error with what you input. Please check again';
                }

                return bootbox.alert(message);
            }

            console.log('publish with following data', _this.transformData(_this.data.rawPoll));

            let requestedData = _this.transformData(_this.data.rawPoll);

            $
                .ajax({
                    type: 'POST',
                    url: '/api/v1/poll/create',
                    data: JSON.stringify(requestedData),
                    contentType: "application/json; charset=utf-8",
                })
                .done((response) => {
                    console.log('response', response);
                    if(response._id){
                        window.location.href = '/poll/' + response._id;
                    }
                })
            ;
        });
    }

    _this.transformData = (data) => {
        let transformedData = {};

        transformedData.layout = data.layout;
        transformedData.reactions = [data.reactions.reaction1, data.reactions.reaction2];

        switch (data.layout){
            case 1:
                transformedData.images = [data.images.image1, data.images.image2];
                transformedData.texts = [data.texts.text1, data.texts.text2];
                break;
            case 2:

                transformedData.images = [data.images.background, data.images.image1, data.images.image2];
                transformedData.texts = [data.texts.question];
                break;
        }

        return transformedData;
    }

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
            inputQuestion: 'textarea.object.question',
            inputText1: 'input.object.input.title-1',
            inputText2: 'input.object.input.title-2',

            usedReactionsCounter: '.reaction-used-counter',

            layerImages: '.layer.images',
            layerControls: '.layer.controls'
        };

        _this.objects = {};
        _this.objects.$container = $(_this.data.containerDOM);
        _this.objects.$menuLayouts = _this.objects.$container.find('.menu .layouts');
        _this.objects.$menuLayoutsBodyList = _this.objects.$menuLayouts.find('.body .list');
        _this.objects.$buttonPublish = _this.objects.$container.find('[data-action=publish]');
        _this.objects.$stage = _this.objects.$container.find('.stage');
        _this.objects.$stageBody = _this.objects.$stage.children('.body');
        _this.objects.$menuInfo = _this.objects.$container.find('.menu .info');

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
                        {% if mode == 'edit' %}
                            <div class="object reaction-tooltip">Tap to change</div>
                        {% endif %}
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
                        {% if mode == 'edit' %}
                            <div class="object reaction-tooltip">Tap to change</div>
                        {% endif %}
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
            },
            reactionsCounts: multiline(() => {/*!@preserve
                <div class="object reactions-count reactions-count-1">{{reactionsCounts[0]}}</div>
                <div class="object reactions-count reactions-count-2">{{reactionsCounts[1]}}</div>
            */console.log}),
            validationError: multiline(() => {/*!@preserve
                <ul>
                    <li>{{error.message}}</li>
                </ul>
            */console.log}),
            validationErrors: multiline(() => {/*!@preserve
                <ul>
                {% for error in errors %}
                    <li>{{error.message}}</li>
                {% endfor %}
                </ul>
            */console.log})
        }

        _this.data.currentLayoutId = _this.objects.$container.data('layout-id') || 1;

        _this.data.mode = _this.objects.$container.hasClass('editable')?'edit':'view';
        _this.data.isStreaming = _this.objects.$container.data('is-streaming');

        let pollDataString = decodeURIComponent(_this.objects.$container.data('poll-data') || '') || '{}';

        _this.data.poll = JSON.parse(pollDataString);
        _this.data.rawPoll = rawPoll;

        _this.render();

        _this.bindMenuLayoutsEvents();
        _this.bindPublishEvents();
        _this.bindStageEvents();
        _this.handleUploaders();
    }
    _this.destroy = (data) => {}

    return {
        init: _this.init,
        destroy: _this.destroy
    }
}