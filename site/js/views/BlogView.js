/**
 * Created by darulebreaker on 10/12/13.
 */


var app= app||{};

app.BlogView= Backbone.View.extend({
    el:'#blog',
    tag: 'div',



    initialize:function(){
        this.vent= app.vent;
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

    editEntry: function(){
        console.log('triggered in blog view');

    },

    renderEntry: function(item){

        var entryView =new app.EntryView({
        model: item,
        vent:app.vent
        });
        this.$el.append(entryView.render().el);
    }

//    renderEdit: function(event) {
//        event.preventDefault();
//        var parent = $(event.target).parent();
//
//        var formData={}; //new class
//        $( parent ).children( 'div' ).each( function( i, el ) {
//            console.log(i+ $(el).attr('id') + ":" +$(el).html()  );
//            if( $( el ).html() != '' )
//            {
//             //   console.log(el.id +el)
//                formData[ $(el).attr('id')  ] = $(el).html();
//            }
//        });
//        console.log(formData);
//        var editView = new app.EntryEditView({
//            model: formData
//        });
//        $(parent).html(editView.render().el);
        //console.log(parent);

//    }

});