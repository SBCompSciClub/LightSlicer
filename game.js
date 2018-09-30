let gameloop;
let entityList = [];
let score = 0;
let spawnDelay = 90;
let spawnTimer = 90;
let cursor;

let stop = ()=>{
	clearInterval(gameloop)
};

let cleanList = (list)=>list.filter((x)=>x!==null);

class Box{

	constructor(x, y, w, h, color){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.xv = 0;
		this.yv = 0;
		this.list = null;
		this.index = null;
	}
	
	kinematics(canvas){
		this.yv += 1;
		this.x += this.xv;
		this.y += this.yv;
		if(this.y > canvas.height + 100 || this.x < -100 || this.x > canvas.width + 100){
			//console.log("hi");
			this.deleteSelfFromList();
		}
	}
	
	collision(box){
		if(this.x < box.x+box.w && this.x+this.w > box.x && this.y < box.y+box.h && this.y+this.h > box.y){
			this.deleteSelfFromList();
			score++;
		}
	}
	
	addToList(){
		this.index = entityList.length;
		entityList.push(this);
	}
	
	deleteSelfFromList(){
		entityList[this.index] = null;
	}
	
	draw(ctx){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}

}

function spawnBox(canvas){
	let maxWidth = maxHeight = 100;
	let minWidth = minHeight = 50;
	let x, y, w, h, xv, yv;
	x = Math.floor(Math.random()*(canvas.width-maxWidth));
	y = canvas.height+10;
	w = Math.floor(Math.random()*(maxWidth-minWidth))+minWidth;
	h = Math.floor(Math.random()*(maxHeight-minHeight))+minHeight;
	let direction = (x < c.width/2)?1:-1;
	xv = Math.floor(Math.random()*5)+1;
	yv = -1*(Math.floor(Math.random()*10)+20);
	console.log(yv);
	let color = `hsl(${Math.floor(Math.random()*256)}, 50%, 70%)`;
	let box = new Box(x, y, w, h, color);
	box.xv = direction*xv;
	box.yv = yv;
	box.addToList();
}