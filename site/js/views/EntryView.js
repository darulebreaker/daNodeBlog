/**
 * Created by darulebreaker on 10/12/13.
 */


var app= app|| {};

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