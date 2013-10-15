/**
 * Created by darulebreaker on 10/12/13.
 */


var app= app||{};

app.collection= new app.Blog();

app.BlogView= Backbone.View.extend({
    el:'#blog',
    tag: 'div',

    events: {
        'click #new': 'createNew'
    },

    initialize:function(options){
        this.vent=options.vent;
        this.collection=app.collection;
          //  {title:"one", content:"hello world"},
          //  {title:"two", content:"bye bye now"}

        this.collection.fetch({reset: true});
        this.render();

        this.listenTo( this.collection, 'add', this.renderEntry );
        this.listenTo( this.collection, 'reset', this.render ); // NEW

    },

    render: function(){
        //var createView = new app.EntryCreateView();
        //this.$el.append(createView.render().el);
        this.collection.each( function(item){
            this.renderEntry(item);
        },this);
    },

    editEntry: function(){
        console.log('triggered in blog view');

    },

    renderEntry: function(item){

        var entryView =new app.EntryView({
        model: item,
        vent: app.vent
        });
        this.$el.append(entryView.render().el);
    },


    createNew: function (event){
       console.log('load new entry view');
       this.vent.trigger("createNew", this.collection);

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

app.BlogCreateView= Backbone.View.extend({
    el:'#createEntry',
    tag: 'div',

    template: _.template($('#createEntryTemplate').html()),

    initialize: function(options){
        _.bindAll(this,"createNew");
        options.vent.bind('createNew',this.createNew);

        this.collection=app.collection;
    },

    createNew: function(){
      this.render();
    },

    events:{
        'click #createNew': 'createNewEntry'
    },


    render: function(){

        this.$el.html(this.template());
        return this;
    },

    createNewEntry: function (event){
        event.preventDefault();
        var formData={};
        console.log(this.$el.html());
        $('.create div').children('input').each(function(i, el){
            if($(el).val!=''){
                formData[el.id] = $(el).val();
            }

        });

        if(formData){
            this.collection.create(formData); //set up database then use save
        }
        this.$el.html("");
    }



});

app.vent2 = _.extend({},Backbone.Events);
var createEntryView = new app.BlogCreateView({vent:app.vent2});