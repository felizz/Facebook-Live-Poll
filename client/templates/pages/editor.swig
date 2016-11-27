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
    <div class="sn editor">
        <div class="container">
            <div class="row">
                <div class="menu-container">
                    <div class="menu">
                        <div class="layouts">
                            <div class="header">
                                Please choose layout
                            </div>

                            <div class="body">
                                <div class="list">
                                    <div class="item active" data-id="1">
                                        <div class="sn card style1"></div>
                                    </div>
                                    <div class="item" data-id="2">
                                        <div class="sn card style1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="stage-container">
                    <div class="stage">
                        <div class="header">
                            <div class="menu">
                                <a class="item" data-action="publish">
                                    Publish
                                </a>
                            </div>
                        </div>

                        <div class="body">
                            <div class="sn card" data-layout-id="1">
                                <div class="layer images">
                                    <div class="object image image-1"></div>
                                    <div class="object image image-2"></div>
                                    <div class="object reaction reaction-1" data-reaction-value="haha"></div>
                                    <div class="object reaction reaction-2" data-reaction-value="like"></div>
                                </div>
                                <div class="layer controls">
                                    <input type="text" class="object title title-1"/>
                                    <input type="text" class="object title title-2"/>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}