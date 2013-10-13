/**
 * Created by darulebreaker on 10/12/13.
 */


var app= app|| {};

app.SnippetView= Backbone.View.extend({
    el:'#blog',
    tag: 'div',
    //className:'snippetView',
    template: _.template($('#snippetViewTemplate').html()),

    initialize:function(){
      this.models=new app.Snippet();
      this.render();

    },



    render: function(){
        this.$el.html(this.template(this.models.toJSON()));
        return this;
    }



});