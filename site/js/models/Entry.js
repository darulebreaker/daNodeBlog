/**
 * Created by darulebreaker on 10/12/13.
 */
var app= app|| {};

app.Entry= Backbone.Model.extend({
    defaults:{
        title: 'untitled',
        content: 'add content'
    },

    parse: function( response ) {
        response.id = response._id;
        return response;
    }

});