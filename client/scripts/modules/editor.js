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
    }

    _this.removeUploaders = () => {
        
    }

    _this.switchLayout = (layoutId) => {
        _this.removeStageEvents();

        _this.removeLayout();
        _this.renderLayout(layoutId);
        _this.bindStageEvents();
    }

    _this.renderLayout = (layoutId) => {
        if(!_this.templates.layouts[layoutId]){
            return;
        }
        
        let html = swig.render(_this.templates.layouts[layoutId]);
        
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
                            <div class="object image image-1"></div>
                            <div class="object image image-2"></div>
                            <div class="object reaction reaction-1" data-reaction-value="haha"></div>
                            <div class="object reaction reaction-2" data-reaction-value="like"></div>
                        </div>
                        <div class="layer controls">
                            <input type="text" class="object title title-1" placeholder="Enter option's name"/>
                            <input type="text" class="object title title-2" placeholder="Enter option's name"/>
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
                    </div>
                */console.log}),
                2: multiline(() => {/*!@preserve
                    <div class="sn card" data-layout-id="2">
                        <div class="layer images">
                            <div class="object background"></div>
                            <div class="object image image-1"></div>
                            <div class="object image image-2"></div>
                            <div class="object reaction reaction-1" data-reaction-value="haha"></div>
                            <div class="object reaction reaction-2" data-reaction-value="like"></div>
                        </div>
                        <div class="layer controls">
                            <textarea class="object question" placeholder="Enter your question here..."></textarea>
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
                    </div>
                */console.log})
            }
        }

        _this.data.currentLayoutId = _this.objects.$container.data('layout-id') || 1;

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