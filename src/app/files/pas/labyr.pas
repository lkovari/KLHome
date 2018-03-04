(* PROGRAM:         Labyrinth with recursive backtrack
 * FILE NAME:       LABYR.PAS
 * AUTHOR:          László Kővári
 * LAST UPDATE:     1991.07.25.
 * COPYRIGHT:       Copyright (C) 1991 by László Kővári #364121033
 * DESCRIPTION:
                    A program véletlenszerű pontokból 4 irányba irányitott fákat rajzol.
                    A farajzoló algoritmus irányitott fát rajzol, tehát a megadott iránytól csak jobbra balra térhet el.
                    Visszafele nem! Egy pontból a 3 irányt úgy választja ki hogy generál egy véletlenszámot 1-6-ig és ez a szám
                    3 nak az egyik ismétlés nélküli permutációját választja ki. Ez a permutáció lesz az irányok vizsgálatának
                    sorrendje. (ahova tud vonalat rajzolni) A program alapja, hogy vizsgálja egy leendő ágvég állapotát. Ha az nem
                    háttér szinú akkor oda már lett razjolva vonal azaz ág valamely irányból. Ez biztositja hogy a labirintus szabályos
                    lesz. Az algoritmus rekurziv backütracking azaz visszalépéses algoritmus, amely az ág rajzolását (azaz a labirintus folyosó 
                    falát) végzi el. Minden egyes pontra önmagát meghivja ha nem tud rajzolni egy irányba akkor visszalép és egy másik irányt 
                    választ. Ha egyik irányba sem tud rajzolni akkor ismét visszalép.
 *)

program Labyr;
uses crt,graph;
const
                         dn: array [1..6,1..3] of integer=((1,2,3),(1,3,2),(2,1,3),(2,3,1),(3,1,2),(3,2,1));
var
               sx,sy,
               depth,dp,plr,
                   sel,p,fd,
               maxx,maxy,av,
               backgr,xp,yp,
                   maxcolor,
            maxpalette,Step,
                graphdriver,
                  graphmode: integer;
                  copyright,
                 driverpath,
                gdrivername: string;
            grapherror,cmdl: boolean;
{*
        DEPTH           fastruktúra mélysége
        DP              mélységszámláló
        PLR             oldalra való ágrajzolást korlátozza
        SEL             értéke 1-4 a 4 irányt reprezentálja
        P               ágrajzolást korlátozza
        MAXX            maximális képpontok száma X irányban
        MAXY            maximális képpontok száma Y irányban
        AV              segédváltozó numerikus értékké alakitáshoz
        BACKGR          háttér szine
        XP
        YP              segédváltozó koordinátapár
        MAXCOLOR        maximálisan használható szinek száma
        MAXPALETTE      paletták száma
        STEP            ág hossza képpontban
*}

{$M 65520,20000,65520}
{* Grafika alaphelyzetbe *}
procedure initg;
  begin
    randomize;
    grapherror:=false;
    driverpath:='\';
    graphdriver:=detect;
    graphmode:=0;
    {* Graphich mode set*}
    initgraph(graphdriver,graphmode,driverpath);
    if graphresult <>0 then
      grapherror:=true
    else
      begin
        cleardevice;
        maxx:=getmaxx;
        maxy:=getmaxy;
        maxcolor:=getmaxcolor;
        maxpalette:=getpalettesize;
        backgr:=getbkcolor;
      end;
  end;

procedure posnext(var pwx,pwy,sl,ls: integer; ox,oy,stp,dto: integer);

  {*
     PWX-PWY   Megfelel a POSWX POSWY-nak
     OX-OY     Eredeti koordináták
     DFROM     Legutolsó irány
     DTO       Amelyik irányba éppen vizsgálni kell
     STP       Lépés
     SL        Megfelel a SEL-nek
     LS        Megfelel a LASTSEL-nek
   *}

  begin
    case sl of
      1:
          case dto of
            1:
              begin
                pwx:=ox-stp;           
                pwy:=oy;
                ls:=sl;                
                sl:=3;                 
              end;
            2:
              begin
                pwy:=oy-stp;
                pwx:=ox;
                ls:=sl;
                sl:=1;
              end;
            3:
              begin
                pwx:=ox+stp;
                pwy:=oy;
                ls:=sl;
                sl:=4;
              end;
          end;
      2:
          case dto of
            1:
              begin
                pwx:=ox+stp;
                pwy:=oy;
                ls:=sl;
                sl:=4;
              end;
            2:
              begin
                pwy:=oy+stp;
                pwx:=ox;
                ls:=sl;
                sl:=2;
              end;
            3:
              begin
                pwx:=ox-stp;
                pwy:=oy;
                ls:=sl;
                sl:=3;
              end;
          end;
      3:
          case dto of
            1:
              begin
                pwy:=oy+stp;
                pwx:=ox;
                ls:=sl;
                sl:=2;
              end;
            2:
              begin
                pwx:=ox-stp;
                pwy:=oy;
                ls:=sl;
                sl:=3;
              end;
            3:
              begin
                pwy:=oy-stp;
                pwx:=ox;
                ls:=sl;
                sl:=1;
              end;
          end;
      4:
          case dto of
            1:
              begin
                pwy:=oy-stp;
                pwx:=ox;
                ls:=sl;
                sl:=1;
              end;
            2:
              begin
                pwx:=ox+stp;
                pwy:=oy;
                ls:=sl;
                sl:=4;
              end;
            3:
              begin
                pwy:=oy+stp;
                pwx:=ox;
                ls:=sl;
                sl:=2;
              end;
          end;
    end;
  end;

procedure backstep(var wx,wy,s: integer;xo,yo,sfrom,sto,st: integer);
  {*
  SFROM   Legutóbbi irány ami LASTSEL-ben van
  STO     Vizsgálat iránya ami DOTNUM-ban van
  *}
  begin
    {* Visszalépés *}
    case sfrom of
      1:
          case sto of
            1:
              begin
                wx:=wx+st;
                wy:=yo;
              end;
            2:
              begin
                wy:=wy+st;
                wx:=xo;
              end;
            3:
              begin
                wx:=wx-st;
                wy:=yo;
              end;
          end;
      2:
          case sto of
            1:
              begin
                wx:=wx-st;
                wy:=yo;
              end;
            2:
              begin
                wy:=wy-st;
                wx:=xo;
              end;
            3:
              begin
                wx:=wx+st;
                wy:=yo;
              end;
          end;
      3:
          case sto of
            1:
              begin
                wy:=wy-st;
                wx:=xo;
              end;
            2:
              begin
                wx:=wx+st;
                wy:=yo;
              end;
            3:
              begin
                wy:=wy+st;
                wx:=xo;
              end;
          end;
      4:
          case sto of
            1:
              begin
                wy:=wy+st;
                wx:=xo;
              end;
            2:
              begin
                wx:=wx-st;
                wy:=yo;
              end;
            3:
              begin
                wy:=wy-st;
                wx:=xo;
              end;
          end;
    end;
    s:=sfrom; 
  end;

function dotchk(px,py : integer): boolean;
  var
      dot: boolean;
     auxv: integer;
  begin
    auxv:=getpixel(px,py);
    if auxv=backgr then
      begin
        dotchk:=true;
      end
    else
      dotchk:=false;
  end;

function poschk(xx,yy: integer): boolean;
  var
    lv: boolean;
  begin
    if (((xx>=1) and (xx<=maxx)) and ((yy>=1) and (yy<=maxy))) then
      poschk:=true
    else
      poschk:=false;
  end;

{* Jelenlegi irány viszonya az eredetihez cél hogy az eredeti *}
{* iránnyal szembe ne hozzon létre faágat *}
function chkd(d: integer):boolean;
  begin
    chkd:=true;
    case fd of
      1:{* Fel *}
        if d=2 then
          chkd:=false;
      2:{* Le *}
        if d=1 then
          chkd:=false;
      3:{* Bal *}
        if d=4 then
          chkd:=false;
      4:{* Jobb *}
        if d=3 then
          chkd:=false;
    end;
  end;

{* Ha a megadott farajzolási iránytól balra vagy jobbra rajzolna
   nem mindig engedélyezi, mert inkább a rajzolás irányába növelje
    a fa ágait *}
function lrd(ss: integer):boolean;
  var
    vr: integer;
  begin
    vr:=random(101);
    case fd of
      1:{* Fel *}
        case sel of
          3:{* Balra *}
            if vr<plr then
              lrd:=true
            else
              lrd:=false;
          4:{* Jobbra *}
            if vr<plr then
              lrd:=true
            else
              lrd:=false;
        end;
      2:{* Le *}
        case sel of
          4:{* Balra *}
            if vr<plr then
              lrd:=true
            else
              lrd:=false;
          3:{* Jobbra *}
            if vr<plr then
              lrd:=true
            else
              lrd:=false;
        end;
      3:{* Fel *}
        case sel of
          2:{* Balra *}
            if vr<plr then
              lrd:=true
            else
              lrd:=false;
          1:{* Jobbra *}
            if vr<plr then
              lrd:=true
            else
              lrd:=false;
        end;
      4:{* Fel *}
        case sel of
          1:{* Balra *}
            if vr<plr then
              lrd:=true
            else
              lrd:=false;
          2:{* Jobbra *}
            if vr<plr then
              lrd:=true
            else
              lrd:=false;
        end;
    end;
  end;

{* A rekurziv rutint meghivja ha TRUE *}
function call: boolean;
   var
     vl: integer;
   begin
     vl:=random(100);
     if vl<=p then
       call:=true
     else
       call:=false;
   end;

{* Egy vonal rajzolása egy adott pontba rekurziv algoritmus *}
procedure wall(var posx,posy: integer);
  var
          lastsel,
      poswx,poswy,
      pposx,pposy,
       dotn,dotnm,
           dotnum:      integer;

      {*
      LASTSEL           
      POSWX
      POSWY             
      PPOSX
      PPOSY             
      DOTNUM            
      *}

  begin
    pposx:=posx;
    pposy:=posy;
    if not keypressed then
      begin
        poswx:=0;
        poswy:=0;
        dp:=dp+1;
        dotnm:=1;
        repeat
          dotn:=random(7);
        until dotn<>0;
        while dotnm<=3 do
          begin
            dotnum:=dn[dotn,dotnm];
            posnext(poswx,poswy,sel,lastsel,pposx,pposy,step,dotnum);
            if (poschk(poswx,poswy) and dotchk(poswx,poswy)) and chkd(sel) and lrd(sel) then
              begin
                line(pposx,pposy,poswx,poswy);
                if (call and (dp<=depth)) then
                  wall(poswx,poswy);
              end;
            backstep(poswx,poswy,sel,pposx,pposy,lastsel,dotnum,step);
            dotnm:=dotnm+1;
          end;
      end;
  end;

function rndcolor: integer;
  var
    clr: integer;
  begin
    repeat
      clr:=random(maxcolor+1);
    until clr<>backgr;
    rndcolor:=clr;
  end;

procedure drawtree;
  begin
    repeat
      repeat
        sx:=random(trunc(maxx+step/step))*step;
      until ((sx>=0) and (sx<=trunc(maxx+step/step)*step));
      repeat
        sy:=random(trunc(maxy+step/step))*step;
      until ((sy>=0) and (sy<=trunc(maxy+step/step)*step));
      sel:=1;
      while sel<=4 do
        begin
          dp:=0;
          setcolor(rndcolor);
          wall(sx,sy);
          sel:=sel+1;
        end;
    until keypressed;
  end;

{* FŐPROGRAM *}
begin
  copyright:='Copyright (C) 1991 by László Kővári #3641321033';
  {* Alaphelyzet *}
  initg;
  if not grapherror then
    begin
      {* Ha a grafikus rendszer üzemkész *}
      if paramcount=4 then
        begin
          val(paramstr(1),step,av);
          if ((step>100) or (step<1)) then
            step:=10;
          val(paramstr(2),p,av);
          if ((p>100) or (p<1)) then
            p:=70;
          val(paramstr(3),depth,av);
          if ((depth>1000) or (depth<1)) then
            depth:=100;
          val(paramstr(4),plr,av);
          if ((plr>100) or (plr<1)) then
            plr:=100;
          cmdl:=false;
        end
      else
        begin
          Step:=10;             {* ághossz *}
          p:=70;                {* Random<P akkor rajzol egy ágat *}
          cmdl:=true;
          depth:=100;           {* Fastruktura mélysége *}
          plr:=100;              {* Random<PLR akkor valamely oldalra rajzol egy ágat *}
        end;
      setcolor(green);
      {* Keret rajzolása *}
      line(0,0,trunc(maxx/step)*step,0);
      line(trunc(maxx/step)*step,0,trunc(maxx/step)*step,(trunc(maxy/step)*step)-step);
      line(trunc(maxx/step)*step,trunc(maxy/step)*step,0,trunc(maxy/step)*step);
      line(0,trunc(maxy/step)*step,0,step);
      drawtree;
      repeat

      until keypressed;
    end;
  closegraph;
  if cmdl then
    begin
      writeln;
      writeln('Usage: LABYR WallLength Probability Depth LeftRightLength');
      writeln;
      writeln('            Wall Length = 1-100');
      writeln('                        Probability = 1-100');
      writeln('                                    Depth = 1-1000');
      writeln('                                        Left Right Length = 1-100');
      writeln;
      writeln(copyright);
    end;
end.