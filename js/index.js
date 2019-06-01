"use strict";
$(document).ready(function(){
  var choice,
      counter=0,
      arr = [0,0,0,0,0,0,0,0,0],
      arrId = ["#1","#2","#3",
               "#4","#5","#6",
               "#7","#8","#9"],
      v1=[], v2=[], v3=[], h1=[], h2=[], h3=[], d1=[], d2=[],
      sv1, sv2, sv3, sh1, sh2, sh3, sd1, sd2,//sum lines
      Interval,//starting timer
      HumanPlayer = {name: 'player1', choice: 'N', score: 0, turn: 'on'},
      ComputerPlayer = {name: 'computer', choice: 'N', score: 0, turn: 'off'};

  $(".grid-game").hide();
  $("#reset").hide();

  function OpositeValue(choice){
    if (choice === 'X'){
      return 'O';
    }else{
      return 'X';
    }
  }
  function RandomNumber(n){
    return Math.floor(Math.random() * n) + 1;
  }
  function FreeField(field){
    var field;
    if ( field.html() !== "X" && field.html() !== "O" ){
      return true;
    }
  }
  function emptyArr(arr) {
    var j;

    if (arr.length > 0) {
      for (j = arr.length; j > 0; j--) {
        arr.pop();
      }
    }
  }
  function getSum(total, num) {
    return total + num;
  }
  function check(a, name){
    var i, j, val, n=name;

    for (i=0; i < a.length; i++){
      val = a[i];
      if (val === 0){
        switch (n){
        case "v1":
          if (i===0){ j = i + 0; }else if (i===1){ j = i + 2; }else{ j = i + 4; }
          break;
        case "v2":
          if (i===0){ j = i + 1; }else if (i===1){ j = i + 3; }else{ j = i + 5; }
          break;
        case "v3":
          if (i===0){ j = i + 2; }else if (i===1){ j = i + 4; }else{ j = i + 6; }
          break;
        case "h1":
          if (i===0){ j = i + 0; }else if (i===1){ j = i + 0; }else{ j = i + 0; }
          break;
        case "h2":
          if (i===0){ j = i + 3; }else if (i===1){ j = i + 3; }else{ j = i + 3; }
          break;
        case "h3":
          if (i===0){ j = i + 6; }else if (i===1){ j = i + 6; }else{ j = i + 6; }
          break;
        case "d1":
          if (i===0){ j = i + 0; }else if (i===1){ j = i + 3; }else{ j = i + 6; }
          break;
        case "d2":
          if (i===0){ j = i + 2; }else if (i===1){ j = i + 3; }else{ j = i + 4; }
          break;
        }

      return arrId[j];
      }
    }
  }
  function winPlayer(){
    sv1=0; sv2=0; sv3=0; sh1=0; sh2=0; sh3=0; sd1=0; sd2=0;
    HumanPlayer.score += 1;
    alert("Winner is player!");
    $("#player").html("player: " + HumanPlayer.score );
    clearNewTurn();
    HumanPlayer.turn = 'on';
    ComupterPlayer.turn = 'off';
  }
  function winComputer(){
    sv1=0; sv2=0; sv3=0; sh1=0; sh2=0; sh3=0; sd1=0; sd2=0;
    ComputerPlayer.score += 1;
    alert("Winner is computer!");
    $("#computer").html("computer: " + ComputerPlayer.score );
    clearNewTurn();
    HumanPlayer.turn = 'on';
    ComupterPlayer.turn = 'off';
  }
  function noWinner(){
    sv1=0; sv2=0; sv3=0; sh1=0; sh2=0; sh3=0; sd1=0; sd2=0;
    alert("No winner.");
    clearNewTurn();
    HumanPlayer.turn = 'on';
    ComupterPlayer.turn = 'off';
  }
  function clearNewTurn(){
    $("#player").css("color", "white");
    $("#computer").css("color", "black");
    $(".item").html(" ");
    counter = 0;
    emptyArr(arr);
    arr = [0,0,0,0,0,0,0,0,0];
  }
  function ComputerLogic(){
    var sv1, sv2, sv3, sh1, sh2, sh3, sd1, sd2,
        v1 = [arr[0],arr[3],arr[6]],
        v2 = [arr[1],arr[4],arr[7]],
        v3 = [arr[2],arr[5],arr[8]],
        h1 = [arr[0],arr[1],arr[2]],
        h2 = [arr[3],arr[4],arr[5]],
        h3 = [arr[6],arr[7],arr[8]],
        d1 = [arr[0],arr[4],arr[8]],
        d2 = [arr[2],arr[4],arr[6]],
        cv1,cv2,cv3,ch1,ch2,ch3,cd1,cd2;

    sh1 = h1.reduce(getSum);
    sh2 = h2.reduce(getSum);
    sh3 = h3.reduce(getSum);
    sv1 = v1.reduce(getSum);
    sv2 = v2.reduce(getSum);
    sv3 = v3.reduce(getSum);
    sd1 = d1.reduce(getSum);
    sd2 = d2.reduce(getSum);

    if (sh1===3 || sh2===3 || sh3===3 || sv1===3 || sv2===3 || sv3===3 || sd1===3 || sd2===3){
      winPlayer();
    } else if (sh1===-3 || sh2===-3 || sh3===-3 || sv1===-3 || sv2===-3 || sv3===-3 || sd1===-3 || sd2===-3){
      winComputer();
    } else if (counter===9){
      noWinner();
    } else if (counter === 1){
      if ( FreeField($("#5")) ){ return $("#5") }
      else if ( FreeField($("#1")) ){ return $("#1") }
      else if ( FreeField($("#3")) ){ return $("#3") }
      else if ( FreeField($("#7")) ){ return $("#7") }
      else if ( FreeField($("#9")) ){ return $("#9") }
    }else if (counter === 3){
      if (sv1===2){ cv1=check(v1, "v1"); return $(cv1) }
      else if (sv2==2){ cv2=check(v2, "v2"); return $(cv2) }
      else if (sv3==2){ cv3=check(v3, "v3"); return $(cv3) }
      else if (sh1==2){ ch1=check(h1, "h1"); return $(ch1) }
      else if (sh2==2){ ch2=check(h2, "h2"); return $(ch2) }
      else if (sh3==2){ ch3=check(h3, "h3"); return $(ch3) }
      else if (sd1==2){ cd1=check(d1, "d1"); return $(cd1) }
      else if (sd2==2){ cd2=check(d2, "d2"); return $(cd2) }
      else if ( FreeField($("#2")) ){ return $("#2") }
      else if ( FreeField($("#4")) ){ return $("#4") }
      else if ( FreeField($("#6")) ){ return $("#6") }
      else if ( FreeField($("#8")) ){ return $("#8") }
    }else if (counter === 5){
      if (sv1===2){ cv1=check(v1, "v1"); return $(cv1) }
      else if (sv2==2){ cv2=check(v2, "v2"); return $(cv2) }
      else if (sv3==2){ cv3=check(v3, "v3"); return $(cv3) }
      else if (sh1==2){ ch1=check(h1, "h1"); return $(ch1) }
      else if (sh2==2){ ch2=check(h2, "h2"); return $(ch2) }
      else if (sh3==2){ ch3=check(h3, "h3"); return $(ch3) }
      else if (sd1==2){ cd1=check(d1, "d1"); return $(cd1) }
      else if (sd2==2){ cd2=check(d2, "d2"); return $(cd2) }
      else if ( FreeField($("#5")) ){ return $("#5") }
      else if ( FreeField($("#1")) ){ return $("#1") }
      else if ( FreeField($("#3")) ){ return $("#3") }
      else if ( FreeField($("#7")) ){ return $("#7") }
      else if ( FreeField($("#9")) ){ return $("#9") }
      else if ( FreeField($("#2")) ){ return $("#2") }
      else if ( FreeField($("#4")) ){ return $("#4") }
      else if ( FreeField($("#6")) ){ return $("#6") }
      else if ( FreeField($("#8")) ){ return $("#8") }
    }else if (counter === 7){
      if (sv1===2){ cv1=check(v1, "v1"); return $(cv1) }
      else if (sv2==2){ cv2=check(v2, "v2"); return $(cv2) }
      else if (sv3==2){ cv3=check(v3, "v3"); return $(cv3) }
      else if (sh1==2){ ch1=check(h1, "h1"); return $(ch1) }
      else if (sh2==2){ ch2=check(h2, "h2"); return $(ch2) }
      else if (sh3==2){ ch3=check(h3, "h3"); return $(ch3) }
      else if (sd1==2){ cd1=check(d1, "d1"); return $(cd1) }
      else if (sd2==2){ cd2=check(d2, "d2"); return $(cd2) }
      else if ( FreeField($("#5")) ){ return $("#5") }
      else if ( FreeField($("#1")) ){ return $("#1") }
      else if ( FreeField($("#3")) ){ return $("#3") }
      else if ( FreeField($("#7")) ){ return $("#7") }
      else if ( FreeField($("#9")) ){ return $("#9") }
      else if ( FreeField($("#2")) ){ return $("#2") }
      else if ( FreeField($("#4")) ){ return $("#4") }
      else if ( FreeField($("#6")) ){ return $("#6") }
      else if ( FreeField($("#8")) ){ return $("#8") }
    }
  }
  function computerMove(){ //computer move
    var field, x;

    field = ComputerLogic();

    if ( ComputerPlayer.turn === "on" && FreeField(field) && counter <= 8){
      field.html(ComputerPlayer.choice);
      ComputerPlayer.turn = "off";
      HumanPlayer.turn = "on";
      $("#player").css("color", "white");
      $("#computer").css("color", "black");
      counter += 1;
      x = parseFloat(field.attr("id"));
      arr.splice(x-1,1,-1);
      clearInterval(Interval);
      //console.log("arr: " + arr);
    } else {
      clearInterval(Interval);
    }

  }
  $(".xo").on("click",function(){ //player choice X or O
    var human_choice = $(this).html(), computer_choice;

    HumanPlayer.choice = human_choice;
    ComputerPlayer.choice = OpositeValue(human_choice);
    $("#player").css("color", "white");

    $("#grid_choice").hide();
    $("#reset").show();
    $("#grid_game").show();
    //console.log("Player choice: " + HumanPlayer.choice);
    //console.log("Computer choice: " + ComputerPlayer.choice);
  }); //end xo
  $(".item").on("click", function(){ //player move
    var field = $(this), x;

    if ( HumanPlayer.turn === "on" && FreeField(field) && counter <= 8){
      field.html(HumanPlayer.choice);
      HumanPlayer.turn = "off";
      ComputerPlayer.turn = "on";
      $("#player").css("color", "black");
      if (counter === 8){
        $("#computer").css("color", "black");
      } else {
        $("#computer").css("color", "white");
      }

      counter += 1;
      x = parseFloat(this.id);
      arr.splice(x-1,1,1);
      //console.log("arr: " + arr);;
      //console.log("Counter p: " + counter);
      Interval = setInterval(computerMove, 500);
    } else {
      clearInterval(Interval);
    }
    /*else { //second player
      field = "item1";
      if ( ComputerPlayer.turn === 'on' && field.html() !== "X" && field.html() !== "O" ){
        field.html(ComputerPlayer.choice);
        ComputerPlayer.turn = 'off';
        HumanPlayer.turn = 'on';
        $("#player").css("color", "white");
        $("#computer").css("color", "black");
      }
    }*/
  }); //end item
  $("#reset").on("click", function(){ //reset
    var i;

    $("#grid_game").hide();
    $("#grid_choice").show();
    $("#reset").hide();

    $(".item").html(" ");
    HumanPlayer.choice = 'N';
    ComputerPlayer.choice = 'N';
    HumanPlayer.score = 0;
    ComputerPlayer.score = 0;
    HumanPlayer.turn = 'on';
    ComputerPlayer.turn = 'off';
    $("#player").css("color", "black");
    $("#computer").css("color", "black");
    $("#player").html("player: 0");
    $("#computer").html("computer: 0");
    counter=0;
    emptyArr(arr);
    arr = [0,0,0,0,0,0,0,0,0];
  }); //end reset

}); //end ready