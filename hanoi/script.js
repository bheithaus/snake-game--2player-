function HanoiController() {
  this.game = new Hanoi();
  this.towersEl = $('.tower');
  this.selected = null;
}

HanoiController.prototype.parseTowerIndex = function(viewTower) {
  switch(viewTower.attr('id'))
  {
    case "tower1":
      return 0;
      break;
    case "tower2":
      return 1;
      break;
    case "tower3":
      return 2;
      break;
  }
}

HanoiController.prototype.addSelectionHandler = function() {
  var controller = this;
  this.towersEl.on('click', function() {
    $(this).addClass('selected');
    controller.selected = controller.parseTowerIndex($(this));
    controller.towersEl.off('click');
    controller.addMoveToHandler();
    $(this).off('click');
    controller.addRemoveSelectionHandler($(this));
  });
}

HanoiController.prototype.addMoveToHandler = function() {
  var controller = this;
  controller.towersEl.on('click', function() {
    var to = controller.parseTowerIndex($(this));
    if ( controller.game.moveDisc(controller.selected, to) ) {
      $('.selected').children().first()
                    .children().first()
                    .prependTo($(this)
                    .children().first());
      controller.towersEl.off('click');
      $('.selected').removeClass('selected');
      controller.addSelectionHandler();
      if ( controller.game.win() ) {
        $('.notifier').removeClass('illegal')
                      .addClass('won').text('you win!').fadeIn();
      }
    } else {
      $('.notifier').addClass('illegal').text('Illegal Move').fadeIn();
      $('.notifier').fadeOut('slow');
    }
  });
}

HanoiController.prototype.addRemoveSelectionHandler = function(tower) {
  var controller = this;
  tower.on('click', function() {
    $(this).removeClass('selected');
    controller.selected = null;
    controller.towersEl.off('click');
    controller.addSelectionHandler();
  });
}

$(document).ready(function(){
  new HanoiController().addSelectionHandler();
});