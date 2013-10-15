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
        "click #edit": 'editEntry',
        "click #delete": 'deleteEntry'
    },

    initialize: function(options){
        this.vent= options.vent;
    },
//    initialize:function(){
//      this.models=new app.Entry();
//      this.render();
//
//    },

    deleteEntry: function(){
        this.model.destroy();
        this.close();
    },

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
    events: {
        'click #save': 'saveEntry'
    },
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
    },

    saveEntry: function (event){
        event.preventDefault();
          var formData={};
        console.log(this.$el.html());
        $('.edit div').children('input').each(function(i, el){
           if($(el).val!=''){
               formData[el.id] = $(el).val();
           }

        });

        if(formData){
        this.model.save(formData); //set up database then use save
        }
          this.$el.html("");
    }

});

app.EntryCreateView = Backbone.View.extend({
    el:'#create',
    tag: 'div',
    //className:'snippetView',
    template: _.template($('#createEntryTemplate').html()),
//    initialize:function(){
//      this.models=new app.Entry();
//      this.render();
//
//    },
    events: {
        'click #create': 'createEntry'
    },
//    initialize: function(options){
//        _.bindAll(this,"createEntry");
//        options.vent.bind("createEntry", this.createEntry);
//    },



    render: function(){

        this.$el.html(this.template());

        return this;
    },

    createEntry: function (event){
        event.preventDefault();
        var formData={};
        console.log(this.$el.html());
        $('.create div').children('input').each(function(i, el){
            if($(el).val!=''){
                formData[el.id] = $(el).val();
            }

        });

        if(formData){
            this.model.create(formData); //set up database then use save
        }
        this.$el.html("");
    }

});




app.vent = _.extend({}, Backbone.Events);

var addEditView = new app.EntryEditView({vent:app.vent});
