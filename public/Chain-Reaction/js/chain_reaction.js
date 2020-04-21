const socket = io()

let row=6,col=11,total_players=2,count_moves=0,hidden_move=0,orb_no=0,player,bg_color,score=[0,0],clicks=0;
let bool,existing_div,matches,prev_parent_id,living_players=[0],current_status=[];
let game_over=[],p1=0,p0=0;
let grid=[];
for(let r=0; r<row; r++)
    grid[r]=[];
////////////////////////////////////////////////////////////////////////////////

function cssMulti(element,css){
    let ele=document.getElementById(element);
    for(i in css){
        ele.style[i]=css[i];
    }                
}
////////////////////////////////////////////////////////////////////////////////
// window.onload= function () {
// 	start();
// 	}

function openFullscreen(elem) {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) { /* Firefox */
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE/Edge */
		elem.msRequestFullscreen();
	}
}
////////////////////////////////////////////////////////////////////////////////
function show_instructions(){
	clicks++;
	let button=document.getElementsByClassName('info')[0]
	if(clicks%2!=0){
		document.getElementsByClassName('how-to-play')[0].style.visibility="visible" ;
		setTimeout(()=>{document.getElementsByClassName('how-to-play')[0].style.zIndex="5";} ,1000)
		document.getElementsByClassName('how-to-play')[0].style.transform="translateY(+100vh)" ;
	}
	else{
		let rules=document.getElementsByClassName('how-to-play')[0];
		document.getElementsByClassName('how-to-play')[0].style.transform="translateY(-100vh)";
	}
}

////////////////////////////////////////////////////////////////////////////////

function start(){
	if(window.innerWidth<window.innerHeight)
		alert("Please play the game in Landscape View.")
	// screen.orientation.lock('landscape');
	document.getElementsByClassName('container')[0].style.visibility="visible" ;
	document.getElementsByClassName('players')[0].style.visibility="visible" ;

    for(let row_entry=0; row_entry<row; row_entry++)
        {
            for(let col_entry=0; col_entry<col; col_entry++)
            {
                grid[row_entry][col_entry]=null;
                let div=document.createElement('div');
                div.setAttribute('id','r' + row_entry +'c' + col_entry);
                div.addEventListener("click",() =>move(div.id,'player'+count_moves%total_players,false))
                document.getElementsByClassName('container')[0].appendChild(div);
				cssMulti('r' + row_entry +'c' + col_entry,{'grid-column': col_entry+1 , 'grid-row': row_entry+1}) 
				              
            }
		}
    	setTimeout(()=>{document.getElementsByClassName('container')[0].style.zIndex="1";} ,2000) 
		document.getElementById('modal').style.transform="translateY(-100vh)" ;
		let elem = document.documentElement;
		openFullscreen(elem);

}
////////////////////////////////////////////////////////////////////////////////

function move(id,player,bool,random){
    
    player_num = player.match(/\d+/g);
    let c=document.getElementById(id).className;
    if(c==null || c==0 || c=='player'+player_num || bool ){
		if(!(bool))
			count_moves++;

		orb_no++;
		color=get_color(id,player,bool,+player_num[0]);
		orb_color=color.orb_color;
		bg_color=color.bg_color;
        capture(id,orb_color,player);
        let new_div=document.createElement('div');
		new_div.setAttribute('id',orb_no);
		document.getElementById(id).setAttribute('class',player);
		document.getElementById(id).appendChild(new_div);
		check_split(id,player,false);
		if(document.getElementById(orb_no))
        cssMulti(orb_no,{'background':orb_color});
		bool=false;

		let container=document.getElementsByClassName('container')[0];
		container.style.background=bg_color;
		container.style.border="0.2em solid "+bg_color;

		// setInterval(move,2000,id,'player'+count_moves%total_players,false);
	}
}

////////////////////////////////////////////////////////////////////////////////
function add_orb(id,player){
	player_num = player.match(/\d+/g);
	matches = id.match(/\d+/g);
	for(let i=-1; i<2;i++)
		for(let j=-1; j<2;j++)
			{
				if(i!=j && (i-j == 1 || i-j ==0 || i-j==-1))
					{
						if(document.getElementById('r'+(+matches[0]+i) +'c'+ (+matches[1]+j) ))
						{
							div=document.createElement('div');
							div.setAttribute('id',++orb_no);
							color=get_color(id,player,bool,+player_num[0]);
							orb_color=color.orb_color;
							capture('r'+(+matches[0]+i) +'c'+(+matches[1]+j),orb_color,player);
							document.getElementById('r'+(+matches[0]+i) +'c'+ (+matches[1]+j) ).appendChild(div);
							cssMulti(orb_no,{'background':orb_color});
						}
					}
			}	
	bool=false;
	//check();
}
////////////////////////////////////////////////////////////////////////////////

function get_color(id,player,bool,player_num){
        let orb_color;
        switch(player_num){
			case 0: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(255,0,0) 1%, rgb(190,0,0) 60%)'	,bg_color:'rgba(0,0,255)'};break;
            case 1: color={orb_color:'radial-gradient(circle at 50% 50%, blue 1%, darkblue 60%)',bg_color:'rgb(255,0,0)'};break;
            // case 2: color={orb_color:'radial-gradient(circle at 50% 50%, blue 1%, darkblue 60%)',bg_color:'rgb(255,0,0)'};break;
			// case 3: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(255, 0, 125) 1%, rgb(197, 0, 97) 60%)',bg_color:''};break;
			// case 4: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;
            // case 5: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;
            // case 6: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;
            // case 7: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;
            // case 8: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;
            // case 9: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;
            // case 10: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;
        }
        return color;
}

////////////////////////////////////////////////////////////////////////////////

function capture(id,orb_color,capturer){
    for(existing_div of document.getElementById(id).childNodes)   //while capturing this will turn all into conquerer's color
		{existing_div.style.background=orb_color;}
			// player_num = capturer.match(/\d+/g);
			// score[+player_num[0]]+=5; 
	document.getElementById(id).className=capturer;
	check(count_moves,capturer);

	
}
////////////////////////////////////////////////////////////////////////////////

function check_split(id,player,bool){
	if(document.getElementById(id)!=null)
		{
			if(id=='r0c0'||id=='r0c'+(col-1)||id=='r'+(row-1)+'c0'||id=='r'+(row-1)+'c'+(col-1)){
				if(document.getElementById(id).childElementCount>=2)
					{
						split_two(id,player);  
						// player_num = player.match(/\d+/g);
						// score[+player_num[0]]+=10;
					}
				}
			else if(id.substring(0,2)=='r0'|| id.substring(2,4)=='c0'|| id.substring(0,2)=='r'+(row-1) || id.substring(2,5)=='c'+(col-1)){
				if( document.getElementById(id).childElementCount>=3)
					{ 
						split_three(id,player);
						// player_num = player.match(/\d+/g);
						// score[+player_num[0]]+=15;
					}
				}
			else{	
				if(document.getElementById(id).childElementCount>=4 )
				{
					split_four(id,player);
					// player_num = player.match(/\d+/g);
					// score[+player_num[0]]+=20;     
				}
		}
	}
}	
////////////////////////////////////////////////////////////////////////////////
function split_four(id,player){
	let parentDiv=document.getElementById(id);
    // for(div of parentDiv.childNodes)             
	// {div.parentNode.removeChild(div) } 
	// const myNode = document.getElementById("foo");
	// await new Promise(r => setTimeout(r, 500));

	setTimeout(animateDelete,0,id,parentDiv,player);
	//delete_orbs(id,parentDiv,player);
	check(count_moves,player);

}
// function sleep(miliseconds) {
// 	var currentTime = new Date().getTime();
 
// 	while (currentTime + miliseconds >= new Date().getTime()) {
// 	}
//  }
////////////////////////////////////////////////////////////////////////////////

function split_two(id,player){
	let parentDiv=document.getElementById(id);
	switch(id){
		case 'r0c0':  	parentDiv.childNodes[0].style.animation="split_right 0.5s linear 0s";
						parentDiv.childNodes[1].style.animation="split_down 0.5s linear 0s";
							break;

	case 'r0c'+(col-1):  	parentDiv.childNodes[0].style.animation="split_left 0.5s linear 0s";
							parentDiv.childNodes[1].style.animation="split_down 0.5s linear 0s";
							break;
								
case 'r'+(row-1)+'c0':  parentDiv.childNodes[0].style.animation="split_right 0.5s linear 0s";
						parentDiv.childNodes[1].style.animation="split_top 0.5s linear 0s";
							break;

case 'r'+(row-1)+'c'+(col-1):   parentDiv.childNodes[0].style.animation="split_left 0.5s linear 0s";
								parentDiv.childNodes[1].style.animation="split_top 0.5s linear 0s";
							break;  
				}
	setTimeout(delete_orbs,00,id,parentDiv,player);
	check(count_moves,player);

}
////////////////////////////////////////////////////////////////////////////////

function split_three(id,player){
	let parentDiv=document.getElementById(id);
	
	matches = id.match(/\d+/g);
    switch(+matches[0]){
        case 0: parentDiv.childNodes[0].style.animation="split_right 0.5s linear 0s";
				parentDiv.childNodes[1].style.animation="split_down 0.5s linear 0s";
				parentDiv.childNodes[2].style.animation="split_left 0.5s linear 0s";
                break;
    case (row-1): 	parentDiv.childNodes[0].style.animation="split_right 0.5s linear 0s";
					parentDiv.childNodes[1].style.animation="split_top 0.5s linear 0s";
					parentDiv.childNodes[2].style.animation="split_left 0.5s linear 0s";
                  break;        
    }
    switch(+matches[1]){
		case 0: parentDiv.childNodes[0].style.animation="split_right 0.5s linear 0s";
				parentDiv.childNodes[1].style.animation="split_top 0.5s linear 0s";
				parentDiv.childNodes[2].style.animation="split_down 0.5s linear 0s";
			break;
    case (col-1): 	parentDiv.childNodes[0].style.animation="split_left 0.5s linear 0s";
					parentDiv.childNodes[1].style.animation="split_top 0.5s linear 0s";
					parentDiv.childNodes[2].style.animation="split_down 0.5s linear 0s";
                break;       
    }
	delete_orbs(id,parentDiv,player);
	check(count_moves,player);

}

////////////////////////////////////////////////////////////////////////////////
function animateDelete(id,parentDiv,player){
	setTimeout(function()
	{parentDiv.childNodes[0].style.animation="split_right 0.5s linear 0s";
	parentDiv.childNodes[1].style.animation="split_top 0.5s linear 0s";
	parentDiv.childNodes[2].style.animation="split_left 0.5s linear 0s";
	parentDiv.childNodes[3].style.animation="split_down 0.5s linear 0s";
	},000);
	
	setTimeout(function(){delete_orbs(id,parentDiv,player);},600);

	
}
function delete_orbs(id,parentDiv,player){

	setTimeout(function(){add_orb(id,player);},5);
	setTimeout(function(){while (parentDiv.firstChild) {
		parentDiv.removeChild(parentDiv.firstChild);
	}
	parentDiv.removeAttribute('class'); 
	},10);
	setTimeout(function(){for(let i=0; i<row;i++)
		for(let j=0; j<col;j++)
		{
			check_split('r'+i +'c'+ j,player,true);
		};},15);
	
	}
////////////////////////////////////////////////////////////////////////////////
function check(count_moves,player){
    for(let row_entry=0; row_entry<row; row_entry++)
        {current_status[row_entry]=[]
            for(let col_entry=0; col_entry<col; col_entry++)
            {	
				let div=document.getElementById('r'+row_entry+'c'+col_entry)
				if(div.className)
					{current_status[row_entry][col_entry]={'parent_class':div.className, 'no_of_orbs': div.childElementCount}
					game_over.push(div.className.match(/\d+/g));
					//alert(game_over);
					// for(let i=0;i<living_players.length;i++)
					// {if(living_players[i] != +game_over[0])
					// living_players[i]=(+game_over[0])	}}
            }
		}  
	}  
		for(let i=0;i<game_over.length;i++)
			{
				if(+game_over[i] == 1)
					p1++;
				else if(+game_over[i]==0)
					p0++;			
			}
			if(count_moves>total_players && (p1 == 0 || p0 == 0))
				{
					document.getElementsByClassName('container')[0].style.zIndex="0";
					cssMulti('over',{'visibility':"visible",'z-index':"9999",'transform':'translateY(-100vh)',  'transition': 'transform 1s'})
					winner=player.match(/\d+/g);
					document.getElementById('winner').innerHTML='Player '+(+winner[0]+1)+' Wins!'
				}
					p0=0;p1=0;game_over=[];
}
////////////////////////////////////////////////////////////////////////////////

function restart(){
	for(let row_entry=0; row_entry<row; row_entry++)
        for(let col_entry=0; col_entry<col; col_entry++)
        {
			let parentDiv=document.getElementById('r'+row_entry+'c'+col_entry);
			while (parentDiv.firstChild) {
					parentDiv.removeChild(parentDiv.firstChild);
				}
			parentDiv.removeAttribute('class'); 
	}
	document.getElementById('over').style.visibility="hidden";
	count_moves=0;//score=[0,0];
	let container=document.getElementsByClassName('container')[0];
	container.style.background="red";
	container.style.border="0.2em solid red";
}

////////////////////////////////////////////////////////////////////////////////
const { username } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.emit('join', { username, room: "room0" }, (error) => {
	if (error) {
		return console.log(error)
	}
	console.log("Room Joined")
})
