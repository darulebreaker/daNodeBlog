/**
 * Created by darulebreaker on 10/12/13.
 */


var app= app|| {};
Backbone.View.prototype.close = function(){
    this.remove();
    this.unbind();
    if (this.onClose){
        this.onClose();
    }
}

app.EntryView= Backbone.View.extend({
    //el:'#blog',
    tag: 'div',
    //className:'snippetView',
    template: _.template($('#entryViewTemplate').html()),

    events: {
        "click #edit": 'editEntry'
    },

    initialize: function(options){
        this.vent= options.vent;
    },
//    initialize:function(){
//      this.models=new app.Entry();
//      this.render();
//
//    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    editEntry: function(){
        console.log('clicked');
        this.vent.trigger("editEntry",this.model);
    }

});

app.EntryEditView = Backbone.View.extend({
    el:'#edit',
    tag: 'div',
    //className:'snippetView',
    template: _.template($('#editEntryTemplate').html()),
//    initialize:function(){
//      this.models=new app.Entry();
//      this.render();
//
//    },
    initialize: function(options){
        _.bindAll(this,"editEntry");
        options.vent.bind("editEntry", this.editEntry);
    },

    editEntry: function(entry){
        console.log("triggered");
        this.model=entry;
        this.render();
    },

    render: function(){

        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }

});

app.vent = _.extend({}, Backbone.Events);

var addEditView = new app.EntryEditView({vent:app.vent});
