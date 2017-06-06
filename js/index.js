"use strict";

(function ( $ ) {

  var methods = {
    init: function (options) {
      return this.each(function(){

        var settings = $.extend({
                // These are the defaults.
        }, options );

        var elem = $(this);
        var count = elem.find('li').length;;
        var activeItem;

        activeItem = elem.find('li.active');
        if (activeItem.length == 0 ) {
          activeItem = elem.find('li').eq(0);
        }


        var data = elem.data('dbcarousel');

        if ( ! data) {
          elem.data('dbcarousel', {
            target: elem,
            settings: settings,
            count: count
        //    activeItem: activeItem
          });
        }
        console.log("Count: " + count);


        methods.setActive.apply(this, activeItem);
        console.log('Active: ' + activeItem);
      });
    },

    setActive: function(item) {
      var $item = $(item);
      var list = $(this);
      if ($item instanceof jQuery) {
        var prev = $item.prev();
        if (prev.length == 0) {
          prev = list.find('li').last();
        }
        var next = $item.next();
        if (next.length == 0) {
          next = list.find('li').first();
        }
      }
      list.find('li').removeClass("active next prev");
      prev.addClass('prev');
      next.addClass('next');
      $item.addClass('active');
    },
    next: function() {
      var list = $(this);
      var next = list.find('li.active').eq(0).next();
      if  (next.length == 0) {
        next = list.find('li').first();
      }

      methods.setActive.call(this, next);
    },
    prev: function() {
      var list = $(this);
      var prev = list.find('li.active').eq(0).prev();
      if  (prev.length == 0) {
        prev = list.find('li').last();
      }

      methods.setActive.call(this, prev);
    }
  };

  $.fn.dbcarousel = function(method) {


    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
          return methods.init.apply( this, arguments );
    } else {
          $.error( 'No method ' +  method + ' in jQuery.dbcarousel' );
    }

  }
}( jQuery ));
//global variables
var car = $('ul').dbcarousel();
$('#prev').on('click', function() {
  car.dbcarousel('prev');
})

$('#next').on('click', function() {
  car.dbcarousel('next');
})

car.find('li').on('click', function() {
  car.dbcarousel('setActive', this);
})
