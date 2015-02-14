var player = 1;
var turnCtr = 0;
var columns, rows, board;
var turns = 0;


createBoard();
function dropAt(index)
{
    //check the next empty row for the column;
    rowIndex = getNextRow(index);

    console.log(rowIndex + " , " + index);
    //set player to circle
    setPlayerToCircle(rowIndex, index, player);     
    //change color of that circle
    changeCircleColor(rowIndex, index);
    //check if win
    if(winHorizontal(rowIndex, index) || winVertical(rowIndex, index) || winDownDiagonal(rowIndex, index) || winUpDiagonal(rowIndex, index))
    {
        alert("win");
    }
    //change player (check how many turns)
    changeCol();
    

    
}

function createBoard()
{
    board = new createRows();
    console.log("board created");

}

function createRows()
{
    this.rows = [new createColumns(), new createColumns(), new createColumns(), new createColumns(), new createColumns(), new createColumns()];
    console.log("board rows");
}

function createColumns()
{
    this.columns = [0, 0, 0, 0 , 0, 0, 0];
    console.log("board columns");
}

function checkCircleVal(row, col)
{/*
    console.log(row + " | " + col);
    if((row >= 0 && row < 6) && (col >= 0 && col < 7))*/
        return board.rows[row].columns[col];
    /*else
        alert("WRONG MOVE");*/
}

function setPlayerToCircle(row, col, player)
{
    board.rows[row].columns[col] = player;
}

function getNextRow(col)
{
    var i = 5;

    while(!(checkCircleVal(i, col) == 0) && i >= 0)
    {
        i--;
    }
    return i;
}

function changeCol()
{
    if(player == 1) //Player 1
    {
        document.getElementById('buttons1').id = 'buttons2';
        player = 2;
    }
    else
    {
        document.getElementById('buttons2').id = 'buttons1';
        player = 1;
    }
}

function getCellElement(row, col)
{
    return $("#board")[0].rows[row].columns[col];
}

function changeCircleColor(row, col)
{
    $(getCellElement(row, col)).css('background-color', getPlayerColor());
}

function changeCircleColorRESET(row, col)
{
    var boardTable = $("#board")[0].rows[row].cells[col];
    $(boardTable).css('background-color', "tomato");
}

function getPlayerColor()
{
    if(player == 1)
        return "darkcyan";
    else
        return "greenyellow";
}


function winHorizontal(row, col)
{
    var i;
    var ctr = 0;

    //right to left
    for(i = col; i >= 0; i--)
    {
        if(checkCircleVal(row, i) == player)
            ctr++;
        else
            break;

        if(ctr >= 4)
            return true;
    }

    //left to right
    for(i = col+1; i < 7; i++)
    {
        if(checkCircleVal(row, i) == player)
            ctr++;
        else
            break;

        if(ctr >= 4)
            return true;
    }

    return false;
}

function winVertical(row, col)
{
    var i;
    var ctr = 0;

    for(i = row; i < 6; i++)
    {
        if(checkCircleVal(i, col) == player)
            ctr++;
        else
            break;

        if(ctr >= 4)
            return true;
    }

    return false;
}

function winDownDiagonal(row, col)
{
    var i = 0;
    var ctr = 0;

    //to right
    while((row+i < 6) && (col+i < 7))
    {
        if(checkCircleVal(row+i, col+i) == player)
            ctr++;
        else
            break;
        console.log(ctr);
        if(ctr >= 4)
            return true;

        i++;
    }

    //to left
    i = 0;
    ctr = 0;
    while((row + i < 6) && (col - i >= 0))
    {
        if(checkCircleVal(row+i, col-i) == player)
            ctr++;
        else
            break;

        console.log(ctr);
        if(ctr >= 4)
            return true;

        i++;
    }

    return false;
}

function winUpDiagonal(row, col)
{
    /*for(var i = 1; row-i >= 0 && col+i < 7; i++)
    {
        console.log(row-1 + " " + col-1);
        if(checkCircleVal(row-1, col+1) != player)
            return false;
    }
    return true;
*/
    var i = 0;
    var ctr = 0;

    //to right
    while((row-i >= 0) && (col+i < 7))
    {
        if(checkCircleVal(row-i, col+i) == player)
            ctr++;
        else
            break;

        console.log(ctr);
        if(ctr >= 4)
            return true;

        i++;
    }

    //to left
    i = 0;
    ctr = 0;
    while((row-i >= 0) && (col-i >= 0))
    {
        if(checkCircleVal(row-i , col-i) == player)
            ctr++;
        else
            break;

        console.log(ctr);
        if(ctr >= 4)
            return true;

        i++;

    }

    return false;
}

function reset()
{
    createBoard();
    for(var i = 0; i < 6; i++)
    {
        for(var j = 0; j < 7; j++)
        {
            changeCircleColorRESET(i,j);
        }
    }
}