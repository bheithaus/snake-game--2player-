var hanoi = {};

hanoi.validMove = function(from, to) {
  var fromDisc = from.children().first();
  if (!to.children().length) {
    return true;
  } else {
    var toDisc = to.children().first();
    if (toDisc.css('width') > fromDisc.css('width')) {
      return true;
    }
  }
  return false;
};

hanoi.won = function(tower3) {
  if (tower3.children().length === 3) {
    return true;
  } else {
    return false;
  }
}

$(document).ready(function(){
  $('.tower').on('click', function() {
    if ($('.selected').length) {
      if ($(this).hasClass('selected')) {
        $(this).toggleClass('selected');
      } else {
        if (hanoi.validMove($('.selected'), $(this))) {
          $('.selected').children().first().prependTo($(this));
          $('.selected').toggleClass('selected');
          if (hanoi.won($('#tower3'))) {
            $('.notifier').removeClass('illegal')
                          .addClass('won').text('you win!').fadeIn();
          }
        } else {
          $('.notifier').addClass('illegal').text('Illegal Move').fadeIn();
          $('.notifier').fadeOut('slow');
        }
      }
    } else if ($(this).children().length) {
      $(this).toggleClass('selected');
    }
  });
});
