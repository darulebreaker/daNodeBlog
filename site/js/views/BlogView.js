/**
 * Created by darulebreaker on 10/12/13.
 */


var app= app||{};

app.BlogView= Backbone.View.extend({
    el:'#blog',
    tag: 'div',

    initialize:function(){
        this.collection=new app.Blog([
            {title:"one", content:"hello world"},
            {title:"two", content:"bye bye now"}
        ]);
        this.render();
    },

    render: function(){
        this.collection.each( function(item){
            this.renderEntry(item)
        },this);
    },


    renderEntry: function(item){
        var entryView =new app.EntryView({
            model: item
        });
        this.$el.append(entryView.render().el);
    }


});