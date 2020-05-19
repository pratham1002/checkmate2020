const socket = io()

let checkColor = true
let opponent
let freezeClic = false
let sendClic = false
let gameStarted = false

let bigRow, smallBox, smallRow, spaces;
let id_no;
let Arr_box = [
    [
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    ],


    [
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    ],


    [
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    ]
]
var color = ['#66FCF1', 'white']
var dark_blue = '#17252A'
var light_blue = '#2c4047'
let colored_boxes = []
let coloured_bigRows = []

var image = document.getElementsByClassName('dash0')[0].getBoundingClientRect()
// var att=document.createAttribute('points')
// att.value=image.x+','+image.y+' '+(image.x+image.width)+','+(image.y)+' '+(image.x+image.width)+','+(image.y+image.height)+' '+(image.x)+','+(image.y+image.height)+' '+image.x+','+image.y
// document.getElementsByClassName('dash0')[0].setAttributeNode(att)
let dash_length = (image.height + image.width) * 2


document.getElementsByClassName('small-box')[0].style.backgroundColor = light_blue
document.getElementsByClassName('small-box')[0].style.borderColor = dark_blue
for (var a = 0; a < 3; a++) {
    for (var b = 0; b < 3; b++) {
        document.getElementsByClassName('space')[(a * 3) + b].style.borderColor = dark_blue
    }
}
var num_player = [1, 2]
function big_row(input) {
    bigRow = input
}
function small_row(input) {
    smallRow = input
}
function small_box(input) {
    smallBox = input
}
function space_calc(sp) {
    var no = (bigRow * 27) + (smallBox * 9) + (smallRow * 3) + sp
    return no
}
let moved = true

function space(input) {
    var no = (smallRow * 3) + input

    spaces = input
    if (Arr_box[bigRow][smallBox] == 1 || Arr_box[bigRow][smallBox] == 2) {
        sendClic=false
        alert('Player ' + Arr_box[bigRow][smallBox] + ' have won this. Choose Another Box')
    }
    var color = document.getElementsByClassName('small-box')[(bigRow * 3) + smallBox].style.backgroundColor

    var val = Arr_box[bigRow][smallBox][smallRow][spaces]

    var condition

    if (checkColor) {
        condition = (val == '' && Arr_box[bigRow][smallBox] != 1 && Arr_box[bigRow][smallBox] != 2 && color == 'rgb(44, 64, 71)')
    }

    else {
        condition = (val == '' && Arr_box[bigRow][smallBox] != 1 && Arr_box[bigRow][smallBox] != 2)
        checkColor = true
    }

    if (condition) {
        let coord = space_calc(input)
        id_no = `${bigRow}${smallBox}${smallRow}${input}`
    
        //console.log(coord)
        moved = false
        let player = parseInt(document.getElementById('pl-no').innerHTML) - 1
        var div = document.createElement('div')
        div.setAttribute('class', 'number')
        var name = 'player' + (player + 1)
        div.classList.add(name)
        document.getElementsByClassName('space')[coord].appendChild(div)
        Arr_box[bigRow][smallBox][smallRow][spaces] = player + 1
        check_small_box()
        clearInterval(myvar)
    
        decolorize()
        box_color()
        // timer()
        player_change()

        sendClic = true    
    }
    else if (color != 'rgb(44, 64, 71)') {
        sendClic=false
        alert('You need to choose a box that is highlighted')
        console.log(id_no)
    }
    else {
        sendClic=false
        alert('Choose another space')
    }
}
let myvar
function timer() {
    var d = new Date();
    document.getElementsByClassName('dash0')[0].style.strokeDashoffset = '0'
    var old_time = d.getTime();
    moved = true
    //console.log(dash_length)
    var dash_off = dash_length / 1000
    document.getElementsByClassName('dash0')[0].style.strokeDasharray = dash_length
    clearInterval(myvar)
    myvar = setInterval(function () {
        let new_time = new Date().getTime()
        let sec = Math.floor((new_time - old_time) / 10)
        document.getElementsByClassName('dash0')[0].style.strokeDashoffset = dash_off * sec
        if (sec > 1000) {
            moved = false
            clearInterval(myvar)
            //console.log('comp')
            random()
        }
    
    }, 10)
    

}
function random() {
    let s_row = [], s_box = []
    var i = Math.floor(Math.random() * colored_boxes.length)
    var row = coloured_bigRows[i]
    var box = colored_boxes[i]
    for (var k = 0; k < 3; k++) {
        for (var l = 0; l < 3; l++) {
            let val = Arr_box[row][box][k][l]
            if (val == '') {
                s_row.push(k)
                s_box.push(l)
            }
        }
    }
    var j = Math.floor(Math.random() * s_box.length)
    bigRow = row
    smallBox = box
    smallRow = s_row[j]
    space(s_box[j])
}
function decolorize() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var box_no = (i * 3) + j
            var border_c = document.getElementsByClassName('small-box')[box_no].style.borderColor
            // console.log(border_c)
            if (border_c == 'rgb(44, 64, 71)' || border_c == 'rgb(23, 37, 42)') {
                document.getElementsByClassName('small-box')[box_no].style.backgroundColor = dark_blue
                document.getElementsByClassName('small-box')[box_no].style.borderColor = 'transparent'
                for (var p = 0; p < 3; p++) {
                    for (var q = 0; q < 3; q++) {
                        document.getElementsByClassName('space')[(i * 27) + (j * 9) + (p * 3) + q].style.borderColor = light_blue
                    }
                }
            }
        
        }
    }
}
function box_color() {
    var no = (bigRow * 27) + (smallBox * 9)
    var old_box = (bigRow * 3) + smallBox
    var new_box = (smallRow * 3) + spaces


    // var border_color=document.getElementsByClassName('space')[no].style.borderColor
    // if(border_color=='rgb(23, 37, 42)'){
    //     document.getElementsByClassName('small-box')[old_box].style.backgroundColor=dark_blue
    //     for(var i=0;i<3;i++){
    //         for(var j=0;j<3;j++){
    //             document.getElementsByClassName('space')[(bigRow*27)+(smallBox*9)+(i*3)+j].style.borderColor=light_blue
    //         }
    //     }
    // }
    colored_boxes = []
    coloured_bigRows = []
    if (document.getElementsByClassName('small-box')[new_box].style.backgroundColor != 'rgb(44, 64, 71)') {
        document.getElementsByClassName('small-box')[new_box].style.backgroundColor = light_blue
        document.getElementsByClassName('small-box')[new_box].style.borderColor = dark_blue
        colored_boxes.push(spaces)
        coloured_bigRows.push(smallRow)
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                document.getElementsByClassName('space')[(smallRow * 27) + (spaces * 9) + (i * 3) + j].style.borderColor = dark_blue
            }
        }
    }
    else {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var box = (i * 3) + j
                var border_c = document.getElementsByClassName('small-box')[box].style.borderColor
                if (box != new_box && box != old_box && border_c != 'rgb(102, 252, 241)' && border_c != 'rgb(255, 255, 255)') {
                    colored_boxes.push(j)
                    coloured_bigRows.push(i)
                    document.getElementsByClassName('small-box')[box].style.backgroundColor = light_blue
                    document.getElementsByClassName('small-box')[box].style.borderColor = dark_blue
                    for (var p = 0; p < 3; p++) {
                        for (var q = 0; q < 3; q++) {
                            document.getElementsByClassName('space')[(i * 27) + (j * 9) + (p * 3) + q].style.borderColor = dark_blue
                        }
                    }
                }
            }
        }
    }

}
function check_small_box() {

    var match = []
    let player = parseInt(document.getElementById('pl-no').innerHTML)
    var Arr = Arr_box[bigRow][smallBox]
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var no = (i * 3) + j
            if (Arr[i][j] == player) {
                match.push(no)
            }
        }
    }
    var answer = check_match(match)
    if (answer) {
        var box = (bigRow * 3) + smallBox
    
        document.getElementsByClassName('small-box')[box].style.backgroundColor = light_blue
        document.getElementsByClassName('small-box')[box].style.borderColor = color[player - 1]
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var no = (bigRow * 27) + (smallBox * 9) + (i * 3) + j
                document.getElementsByClassName('space')[no].style.borderColor = color[player - 1]
            }
        }
        Arr_box[bigRow][smallBox] = player
        check_big_box()
    }
}
function check_big_box() {
    var match = []
    let player = parseInt(document.getElementById('pl-no').innerHTML)
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var no = (i * 3) + j
            if (Arr_box[i][j] == player) {
                match.push(no)
            }
        }
    }

    var answer = check_match(match)
    if (answer) {
        for (var i = 0; i < 9; i++) {
            document.getElementsByClassName('small-box')[i].style.backgroundColor = light_blue
        }
        for (var i = 0; i < 81; i++) {
            document.getElementsByClassName('space')[i].style.borderColor = color[player - 1]
        }
        alert('Congrats Player-' + player + ' on winning the game.')

        socket.emit('end-tic-tac-toe', player)

        document.location.reload(true)
    }
}
function check_match(arr) {
    var accepted = [[0, 1, 2], [0, 3, 6], [2, 5, 8], [6, 7, 8], [0, 4, 8], [2, 4, 6], [1, 4, 7], [3, 4, 5]]
    let result
    for (var i = 0; i < 8; i++) {
        var arr1 = accepted[i]
        //console.log(arr1)
        result = arr1.every(function (val) {
            return arr.indexOf(val) >= 0;
        });
        //console.log(result)
        if (result) {
            return true
        }
    }
    return false

}
function player_change() {
    var len = num_player.length
    var current_player = parseInt(document.getElementById('pl-no').innerHTML)
    let new_player
    if (current_player == num_player[len - 1]) {
        new_player = 1
    }
    else {
        new_player = current_player + 1
    }
    document.getElementById('pl-no').innerHTML = new_player.toString()
    document.getElementsByClassName('other-elem')[0].style.color = color[new_player - 1]
    document.getElementsByClassName('dash0')[0].style.stroke = color[new_player - 1]
}

const url = "http://localhost:3000/me"  // change to production url later
var username = ""

async function play() {
    try {
        const res = await fetch(url)
        const user = await res.json()
        username = user.username

        socket.emit('join-tic-tac-toe', username, (message) => { 
            console.log(message)
            freezeClic = true
            sendClic = false
            document.addEventListener("click", freezeClicFn, true);

            console.log('frozen')
        })

        socket.emit('pair-tic-tac-toe', username) // , (bool) => {
		//     is_paired = bool
		//     console.log("Paired ", is_paired)
		//     if (!is_paired) {
		// 	    console.log("Waiting to pair")
		//     }
	    // })

        socket.on('start-tic-tac-toe', () => {
            console.log('start')
            freezeClic = false
            sendClic = true
        })
        
        window.onclick = e => {
            if (sendClic) {
                freezeClic = true

                document.addEventListener("click", freezeClicFn, true);

                console.log('frozen')

                var current_player = parseInt(document.getElementById('pl-no').innerHTML)

                if (current_player === opponent)   // replace 1 by opponent user
                    return

                console.log('sending ')

                console.log(e.target.id);
                socket.emit('play-tic-tac-toe', current_player, username, e.target.id, (error) => {
                    if (error) {
                        console.log(error)
                    }
                })
            }
        }
        

        socket.on('opponentPlayed-tic-tac-toe', (opponentRecieved, divId) => {
            console.log(divId)
            divElements = divId.split('')
            bigRow = parseInt(divElements[0])
            smallBox = parseInt(divElements[1])
            smallRow = parseInt(divElements[2])
            checkColor = false
            space(parseInt(divElements[3]))

            opponent = opponentRecieved
            sendClic = false
            freezeClic = false
            console.log('unfrozen')
            // document.removeEventListener('click', DisableClickOnPage.handler, true)
        })

        function freezeClicFn(e) {
            if (freezeClic) {
                e.stopPropagation();
                e.preventDefault();
            }
        }

    }
    catch (e) {
        console.log(error);
    }
}

play()
