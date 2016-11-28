{% extends '../layouts/base.swig' %}

{% block main %}
<div class="header">
    <div class="container">
        <div class="col-md-8 col-md-offset-2 text-center">
            <h2>Create your own Facebook Live Poll</h2>
            <p>Start your new poll by choosing layout on the right panel and enter the respective content on the left editor</p>
        </div>
    </div>
</div>

<div class="body">
    <div class="sn editable editor" data-layout-id="1">
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}