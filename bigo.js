//initializing canvas and grid
    var canvas = document.getElementById("grid");
    var ctx = canvas.getContext('2d');
    var tx,ty;
//initializing mask array
var iMax = 22;
var jMax = 25;
var mask = new Array();

for (var i=1;i<iMax;i++)
{
    mask[i]=new Array();
    for (var j=1;j<jMax;j++) {
        mask[i][j]=0;
    }
}

 //function to draw a grid
    var drawGrid = function(w, h) {

        ctx.canvas.width = w;
        ctx.canvas.height = h;



        for (x=0;x<=w;x+=20)
        {
            for (y=0;y<=h;y+=20)
            {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
        }

    }

    drawGrid(480, 420);
//plotting function start here
    //x=24-20   y=21-20
    var cx = Array();
    var z = 1;
    for (var x = 0; x < 480; x +=20)
    {
        cx[z] = x;
        z++;
    }
    var cy = Array();
    var u = 1;
    for (var y = 0; y < 420; y+=20)
    {
        cy[u] = y;
        u++;
    }

//now we want to turn on a cell based on mouse pointer position
function plotting(x1,y1)
{
var mx,my;

    for (x = 1; x < 25; x++) {
        if ((x1 >= 461) && (x1 <= 480)) {
            tx = cx[24];
            mx=24;
            break;
        }

        if ((x1 >= cx[x]) && (x1 <= cx[x + 1])) {
            tx = cx[x];
            mx=x;
            break;
        }
    }

    for (y = 1; y < 22; y++)
    {
        if ((y1 >= 401) && (y1 <= 420)) {
            ty = cy[21];
            my=21;
            break;
        }
        if ((y1 >= cy[y]) && (y1 <= cy[y + 1]))
        {
            ty = cy[y];
            my=y;
            break;
        }
    }
    if (mask[my][mx]==0) {

        ctx.fillStyle="black";
        ctx.fillRect(tx+1, ty+1, 18, 18);
        mask[my][mx]=1;


    }
    else
    {
        ctx.fillStyle="cornflowerblue";
        ctx.fillRect(tx+1, ty+1, 18, 18);
        mask[my][mx]=0;
    }
}



function draw(event) {

    var rect = canvas.getBoundingClientRect();
    var x = event.clientX-rect.left ;
     var y = event.clientY-rect.top;
      plotting(x,y);


}

function exportData()
{
    var sl=100;
    var res="";
    var temp=0;
    var cnt1=7,cnt2=0;
    for (var y=1;y<22;y++)
    {
       res+=sl+" data "
        for(var x=1;x<25;x++)
        {

            if (cnt1>=0)
            {
                if (mask[y][x] == 1)
                {
                    temp += Math.pow(2,cnt1);
                }
                cnt1--;
                if (cnt1==-1)
                {
                    cnt1=7;
                    res += temp;
                    if (cnt2<2)
                    {
                    res+=',';
                    cnt2++;
                    }

                    temp=0;
                }
            }


        }
    //here is y loop
       cnt2=0;
       res+="<br/>";
       sl+=10;
    }

document.getElementById("exportArea").innerHTML=res;
}
