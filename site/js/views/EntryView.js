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
//    initialize:function(){
//      this.models=new app.Entry();
//      this.render();
//
//    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

app.EntryEditView = Backbone.View.extend({
    //el:'#blog',
    tag: 'div',
    //className:'snippetView',
    template: _.template($('#editEntryTemplate').html()),
//    initialize:function(){
//      this.models=new app.Entry();
//      this.render();
//
//    },
    render: function(){
        this.$el.html(this.template(this.model));
        return this;
    }

});