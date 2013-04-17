//game logic

//game class
//controller

function Controller() {
  this.game = new Game();
}

Controller.prototype.setBoard = function(square) {
  this.game.placeMove(this.parseSquare(square));
}

Controller.prototype.parseSquare = function(square) {
  classes = square.prop('class');
  row = classes[classes.search("row")+3];
  col = classes[classes.search("col")+3];
  return [row, col];
}

Controller.prototype.addClickHandler = function() {
  var controller = this;

  $('.square').on('click', function() {
    //parse for row and col, set board[row][col] to game.player
    //set class for $(this) to whatever game.player is
    controller.setBoard($(this));
    $(this).addClass(controller.game.player);
    $(this).off('click');
    if (controller.game.win()) {
      $('.square').off('click');
      $('.notifier').text(controller.game.player + ' cat wins!');
    }
    controller.game.switchPlayer();
    //check for win
  });
}


/// ui
$(function() {
  new Controller().addClickHandler();

});