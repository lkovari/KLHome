{*
 * Author:      László Kővári
 * Program:     SNAKE.PAS
 * Date:        1987.  .  .
 * Last update: 1991.09.26.
 * Copyright:   (C) Copyright 1991 by László Kővári
 * Notes:       Game program.
 *}

program Snake;

uses dos,crt;
label Exit_;
const
                 max= 500;
              Copyr= 'Copyright (C) 1991 by László Kővári #3647321033';  
              chanel= 4;                      {*** Folyoso szelesseg ***}
type
              scores= record                  {*** SCORE file szerkezet ***}
                        name: string[10];     {*** Név ***}
                         scr: integer;        {*** Eredmény ***}
                          sp: integer;        {*** Gyorsaság ***}
                      end;

var
               high: file of scores;
               tran: scores;
   auxplayer,Player: string[10];                       {*** Játékos neve ***}
              Boody: array [1..2,1..500] of integer;   {*** A test ***}
              Walls: array [1..2,1..500] of integer;   {*** LAB. fala ***}
              lowsc,
             highsc: array [1..10] of scores;          {*** Eredmények ***}
              Walln,                              {*** LAB. max elemei ***}
       cpx,Speed,fa,
     level,allscore,
     KO,First,xa,ya,
    start,Trg,xn,yn,
NegSpeed,Last,xb,yb,
      px,py,i,xp,yp,
   vl,score,p,xt,yt,
       ql,IncLength,
  ref,bav,LnofBoody: integer;
               t,cr: char;
                  c: string[72];
                 cc: string[1];
              demon,
       ScExit,color,
      cp,qu,Up,Down,
       inc,wr,Which,
         Left,Right: boolean;

{*** Változók leirása:

     Speed = aktuális gyorsaság
        Fa = IOresult értéke
     level = pálya száma
  allscore = össz elért pontszám
        KO = labirintus bonyolultsága
     first = első elem mutatója
      last = utolsó elem mutatója
     start = elsőre mutat
     xa,ya = aktuális pozició
       Trg = cél mutató
     xn,yn = növelésnél
  NegSpeed = késleltetési idő a gyorsaság negáltja
     xb,yb = cél koordináta kezdeti poz. növelésnél
     px,py = sziv koordinátája
     xp,yp = X - Y koordináta
     score = szintenként elért pontszám
 IncLength = növekmény tárolója ha megevett egy szivet
        ql = hanyadik helyre lett beszurva az eredmény
        vl =
 LnofBoody = Test hossza
       ref = referencia ha ezt az értéket tulhaladja a méret akkor gyorsit
     color = TRUE ha szines kártya van
        qu = TRUE ha ki kell lépni
   up,down
left,right = TRUE ha a megfelelő irány kiválasztott
       inc = TRUE ha a növelés alatt megevett egy szivet ***}

{*** Előre hivatkozás ***}

function CheckPos(xxx,yyy: integer):boolean; forward;

procedure DirectionRead;Forward;

{*** Labirintus rajzolása ***}

procedure Lab;

	{*** Vonal rajzolása ***}
  procedure Wline(bx,by,xt,yt: integer);

  begin
    if color then
      textcolor(3);
    if (bx=xt) then
      begin
        while (by<=yt) do
          begin
            gotoxy(bx,by);
            write('á');
            Walls[1,Walln]:=bx;
            Walls[2,Walln]:=by;
            Walln:=Walln+1;
            by:=by+1;
          end;
			 end
     else
       begin
         while (bx<=xt) do
           begin
             gotoxy(bx,by);
             write('á');
             Walls[1,Walln]:=bx;
             Walls[2,Walln]:=by;
             Walln:=Walln+1;
             bx:=bx+1;
           end;
       end;
    if color then
      textcolor(9);
  end;

	procedure HalfY(x,y,dx,dy: integer); forward;

  procedure HalfX(x,y,dx,dy: integer);
  var
    divide,
    hoole: integer;
  begin
    if (dx>2*chanel) and (dy>2*chanel) then
      begin
        divide:=x+chanel*random(dx div chanel-1)+chanel;
        hoole:=y+chanel*random(dy div chanel);
        Wline(divide,y,divide,hoole);
        Wline(divide,hoole+chanel,divide,y+dy);
        if random(10)>KO then
          HalfX(x,y,divide-x,dy)
				else
          HalfY(x,y,divide-x,dy);
        if random(10)>KO then
          HalfX(divide,y,x+dx-divide,dy)
        else
          HalfY(divide,y,x+dx-divide,dy);
      end;
  end;

  procedure HalfY(x,y,dx,dy: integer);
    var
      divide,
      hoole: integer;
  begin
    if (dx>2*chanel) and (dy>2*chanel) then
      begin
		divide:=y+chanel*random(dy div chanel-1)+chanel;
        hoole:=x+chanel*random(dx div chanel);
        Wline(x,divide,hoole,divide);
        Wline(hoole+chanel,divide,x+dx,divide);
        if random(10)<=KO then
          HalfX(x,y,dx,divide-y)
        else
          HalfY(x,y,dx,divide-y);
        if random(10)<=KO then
          HalfX(x,divide,dx,y+dy-divide)
        else
          HalfY(x,divide,dx,y+dy-divide);
      end;
  end;

  begin
    if KO<=10 then
      KO:=KO+2;                {*** LAB. bonyolultság növeláse ***}
		Walln:=3;
    HalfX(12,2,67,21);
  end;


procedure Crsroff; forward;


procedure demo; forward;


procedure CheckHigh;

var
  ii: integer;
  fn: string[12];

begin
  fn:='SNAKE  .SCR';
  assign(high,fn);
  {$I-};
  reset(high);
  fa:=ioresult;
  {$I+}
  if fa<>0 then
    begin
      rewrite(high);
      ii:=1;
      tran.name:='Leslie K. ';
      tran.scr:=37;
      tran.sp:=4;
      while ii<=10 do
        begin
          highsc[ii].name:=tran.name;
          highsc[ii].scr:=tran.scr;
          highsc[ii].sp:=tran.sp;
          tran.scr:=tran.scr-3;
          write(high,tran);
          ii:=ii+1;
        end;
      ii:=1;
      tran.name:='Rookie    ';
      tran.scr:=9;
      tran.sp:=1;
      while ii<=10 do
        begin
          lowsc[ii].name:=tran.name;
          lowsc[ii].scr:=tran.scr;
          lowsc[ii].sp:=tran.sp;
          tran.scr:=tran.scr-1;
          write(high,tran);
          ii:=ii+1;
        end;
      close(high);
    end
  else
    begin
      ii:=1;
      while ii<=10 do
        begin
          read(high,tran);
          highsc[ii].name:=tran.name;
          tran.scr:=tran.scr;            
          highsc[ii].scr:=tran.scr;
          tran.sp:=tran.sp;
          highsc[ii].sp:=tran.sp;
          ii:=ii+1;
        end;
      ii:=1;
      while (not (eof(high))) do
        begin
          read(high,tran);
          lowsc[ii].name:=tran.name;
          tran.scr:=tran.scr;            
          lowsc[ii].scr:=tran.scr;
          tran.sp:=tran.sp;
          lowsc[ii].sp:=tran.sp;
          ii:=ii+1;
        end;
      close(high);
    end;
end;

{*** Scores ***}

procedure writescores;

var
  ii: integer;
begin
  rewrite(high);
  ii:=1;
  while ii<=10 do
    begin
      tran.name:=highsc[ii].name;
      tran.scr:=highsc[ii].scr;
      tran.sp:=highsc[ii].sp;
      write(high,tran);
      ii:=ii+1;
    end;
  ii:=1;
  while ii<=10 do
    begin
      tran.name:=lowsc[ii].name;
      tran.scr:=lowsc[ii].scr;
      tran.sp:=lowsc[ii].sp;
      write(high,tran);
      ii:=ii+1;
    end;
  close(high);
end;


procedure DispScores;

var
  ii: integer;
begin
  clrscr;
  if color then
    textcolor(13);
  gotoxy(64,1);
  write('(C) LumberJack`91');
  lowvideo;
  gotoxy(10,5);
  highvideo;
  write('TOP TEN ');
  lowvideo;
  if color then
    textcolor(9);
  write('- HIGH SCORES:');
  gotoxy(49,5);
  highvideo;
  write('BOTTOM TEN ');
  lowvideo;
  if color then
    textcolor(9);
  write('- LOW SCORES:');
  gotoxy(7,7);
  ii:=1;
  while ii<=10 do
    begin
      if ii=10 then
        gotoxy(7,ii+6)
      else
        gotoxy(8,ii+6);
      if (color and (12-ii<>8)) then
        textcolor(12-ii);
      write(ii,'. ',highsc[ii].name,' : ',highsc[ii].scr);
      gotoxy(27,ii+6);
      write('Speed=',highsc[ii].sp);
      ii:=ii+1;
    end;
  gotoxy(47,7);
  ii:=1;
  while ii<=10 do
    begin
      if ii=10 then
        gotoxy(47,ii+6)
      else
        gotoxy(48,ii+6);
      if (color and (12-ii<>8))  then
        textcolor(12-ii);
      write('-',ii,'. ',lowsc[ii].name,' : ',lowsc[ii].scr);
      gotoxy(68,ii+6);
      write('Speed=',lowsc[ii].sp);
      ii:=ii+1;
    end;
    if color then
      textcolor(10)
    else
      highvideo;
    if ql<=3 then
      begin
        gotoxy(28,18);
        write('You are MASTER of game !');
      end
    else
    if ((ql>3) and (ql<=6)) then
      begin
        gotoxy(28,18);
        write('You are EXPERT of game !');
      end
    else
    if ((ql>6) and (ql<11)) then
      begin
        gotoxy(28,18);
        write('Sorry.. You are AMATEUR !');
      end
    else
    if (ql=11) then
      begin
        gotoxy(28,18);
        write('You are ROOKIE! Sorry...');
      end;
  if allscore<=lowsc[1].scr then
    begin
      gotoxy(28,18);
      write('You are ROOKIE! Sorry...');
    end;
  lowvideo;
  if color then
    textcolor(9);
  gotoxy(26,23);
  if color then
    textcolor(9);
  write('Press       bar to continue!');
  gotoxy(32,23);
  highvideo;
  write('SPACE');
  lowvideo;
  repeat
    if keypressed then cr:=readkey;
  until cr=' ';
  gotoxy(25,23);
  write('                             ');
  if color then
    textcolor(9);
end;


procedure SortScores;

var
  is,
  ii: integer;
  t,tt: scores;
  av: string[20];
begin
  if (allscore<highsc[10].scr) then
    begin
      if allscore<=lowsc[1].scr then
        begin
          ii:=10-allscore;
          av:=Player;
          av:=av+'          ';              
          lowsc[ii].name:=copy(av,1,10);
          lowsc[ii].scr:=allscore;
          lowsc[ii].sp:=speed;
        end;
    end
  else
    begin
      ii:=1;
      ql:=11;
      while ii<=10 do
        begin
          if allscore>highsc[ii].scr then
            begin
              ql:=ii;
              wr:=true;
              is:=10;
              while is>ii do
                begin
                  highsc[is]:=highsc[is-1];
                  is:=is-1;
                end;
              av:=Player;
              av:=av+'          ';              
              highsc[ii].name:=copy(av,1,10);
              highsc[ii].scr:=allscore;
              highsc[ii].sp:=speed;
              ii:=12;
            end;
          ii:=ii+1;
        end;
    end;
end;


procedure BoodyInit;
var
   i: integer;
begin
  i:=1;
  while i<=max do
    begin
      boody[1,i]:=0;
      boody[2,i]:=0;
      i:=i+1;
    end;
end;


procedure SnakeCome;
  label Exit;
  begin
    px:=1;
    py:=px;
    ScExit:=false;
    score:=0;                
    ref:=5;                  
    p:=0;                    
    xa:=0;
    ya:=0;
    xb:=0;
    yb:=0;
    xp:=2;                   
    yp:=12;
    i:=max;
    p:=max-LnofBoody;            
    Up:=false;
    Down:=False;
    Left:=false;
    Right:=true;
    while i>=p do
      begin
        Boody[1,i]:=xp;                
        Boody[2,i]:=yp;
        gotoxy(Boody[1,i],Boody[2,i]);
        if color then                  
          textcolor(13)
        else
          highvideo;
        write(#2);                     
        lowvideo;
        delay(NegSpeed);               
        if demon then
        else
          DirectionRead;
        gotoxy(Boody[1,i],Boody[2,i]);
        if color then                  
          textcolor(2);
        write(#1);
        i:=i-1;             
        if Left then xp:=xp-1;
        if Right then xp:=xp+1;
        if Up then yp:=yp-1;
        if Down then yp:=yp+1;
        if cp then
          if CheckPos(xp,yp)then
            begin
              ScExit:=true;
              goto Exit;
            end;
      end;
    Up:=false;            
    Down:=false;
    Right:=true;
    Left:=false;
    xp:=Boody[1,max-LnofBoody];        
    yp:=Boody[2,max-LnofBoody];
    gotoxy(Boody[1,500],Boody[2,500]);
    write(' ');
    Exit:
  end;


procedure crsroff;
  var
    vlu: integer;
    regs: registers;
  begin
    with regs do
      begin
        intr($11,regs);
        vlu:=ax and $0030;
        if ((vlu=$0020) or (vlu=$0010)) then
          begin
            {*** Color graphich card ***}
            cx:=$0807;
            ax:=$0100;
            color:=true;
          end
        else
          begin
            {*** Monochrome card ***}
            cx:=$0e00;
            ax:=$0100;
            color:=false;
          end;
        intr($10,regs);
      end;
  end;


procedure crsron;
  var
    vlu: integer;
    regs: registers;
  begin
    with regs do
      begin
        intr($11,regs);
        vlu:=ax and $0030;
        if ((vlu=$0020) or (vlu=$0010)) then
          begin
            {*** Color graphich card ***}
            cx:=$0607;
            ax:=$0100;
          end
        else
          begin
            {*** Monochrome card ***}
            cx:=$0b0d;
            ax:=$0100;
          end;
        intr($10,regs);
      end;
  end;


procedure DirectionRead;
  var
    pause,
        w: boolean;
  begin
    cr:=chr(0);
    if (up or Down) then
      delay(NegSpeed+(10-score))
    else
      delay(NegSpeed);
    if keypressed then
      begin
        sound(880);
        delay(3);
        nosound;
        w:=true;
        sound(880);
        delay(3);
        nosound;
        cr:=readkey;
        if cr=chr(0) then
          begin
            cr:=readkey;
            if cr='K' then
              begin
                if Up and w then
                  begin
                    W:=false;
                    Left:=true;
                    Right:=false;
                    Up:=false;
                    Down:=false;
                  end;
                if Down and w then
                  begin
                    w:=false;
                    Right:=true;
                    Left:=false;
                    Up:=false;
                    Down:=false;
                  end;
                if Left and w then
                  begin
                    w:=false;
                    Down:=true;
                    Up:=false;
                    Right:=false;
                    Left:=false;
                  end;
                if Right and w then
                  begin
                    w:=false;
                    Up:=true;
                    Down:=false;
                    Left:=false;
                    Right:=false;
                  end;
              end;
            if cr='M' then
              begin
                if Up and w then
                  begin
                    w:=false;
                    Left:=false;
                    Right:=true;
                    Up:=false;
                    Down:=false;
                  end;
                if Down and w then
                  begin
                    w:=false;
                    Right:=false;
                    Left:=true;
                    Up:=false;
                    Down:=false;
                  end;
                if Left and w then
                  begin
                    w:=false;
                    Down:=false;
                    Up:=true;
                    Right:=false;
                    Left:=false;
                  end;
                if Right and w then
                  begin
                    w:=false;
                    Up:=false;
                    Down:=true;
                    Left:=false;
                    Right:=false;
                  end;
              end;
          end
        else
          if ((cr='P') or (cr='p')) then
            begin
              gotoxy(34,1);
              if color then
                textcolor(14)
              else
                highvideo;
              write('Game Paused!');
              lowvideo;
              pause:=true;
              gotoxy(30,24);
              if color then
                textcolor(9);
              write('Press P to Continue!');
              repeat
                if keypressed then
                  begin
                    cr:=readkey;
                    if ((cr='P') or (cr='p')) then
                      begin
                        pause:=false;
                        gotoxy(34,1);
                        if color then
                          textcolor(3);
                        write('áááááááááááá');
                        gotoxy(30,24);
                        if color then
                          textcolor(9);
                        write(' Press P to Pause ! ');
                      end;
                  end;
              until not pause;
            end;
        cr:=' ';
      end;
  end;


procedure PutHeart;
  var
    ti: integer;
  begin
    repeat
      px:=random(79);
      py:=random(23);
      ti:=max-LnofBoody;   
      repeat           
        if ((px=Boody[1,ti]) and (py=Boody[2,ti])) then
          px:=0;
        ti:=ti+1;
      until ti>max;
      ti:=1;
      repeat
        if ((px=Walls[1,ti]) and (py=Walls[2,ti])) then
           px:=0;
        ti:=ti+1;
      until ti>Walln;
    until ((px>1) and (py>1));
    gotoxy(px,py);
    if color then
      textcolor(11)
    else
      highvideo;
    write(#3);
    lowvideo;
  end;


procedure Border;
  begin
    clrscr;
    lowvideo;
    if color then
      textcolor(3);
   Bav:=1;
    while Bav<=79 do
      begin
        gotoxy(bav,1);
        write('á');
       Bav:=bav+1;
      end;
   Bav:=1;
    while Bav<=79 do
      begin
        gotoxy(bav,24);
        write('á');
       Bav:=bav+1;
      end;
   Bav:=2;
    while Bav<=23 do
      begin
        gotoxy(1,bav);
        write('á');
       Bav:=bav+1;
      end;
   Bav:=2;
    while Bav<=23 do
      begin
        gotoxy(79,bav);
        write('á');
       Bav:=Bav+1;
      end;
    if color then
      textcolor(13)
    else
      highvideo;
    gotoxy(80,1);
    write('L');
    gotoxy(80,2);
    write('u');
    gotoxy(80,3);
    write('m');
    gotoxy(80,4);
    write('b');
    gotoxy(80,5);
    write('e');
    gotoxy(80,6);
    write('r');
    gotoxy(80,7);
    write('j');
    gotoxy(80,8);
    write('a');
    gotoxy(80,9);
    write('c');
    gotoxy(80,10);
    write('k');
    gotoxy(80,11);
    write('`');
    gotoxy(80,12);
    write('9');
    gotoxy(80,13);
    write('1');
    if color then
      textcolor(10);
    gotoxy(2,1);
    highvideo;
    write(' heart(s)');
    gotoxy(70,24);
    write('Speed=',Speed);
    gotoxy(2,24);
    write(' level(s)');
    lowvideo;
    gotoxy(31,24);
    if color then
      textcolor(9);
    write('Press P to Pause !');
    lowvideo;
  end;


procedure ScreenMask;
  begin
    clrscr;
    if color then
      textcolor(13)
    else
      highvideo;
    gotoxy(64,1);
    write('(C) LumberJack`91');
    lowvideo;
    if color then
      textcolor(9);
    gotoxy(24,7);
    write('You move on the screen a ');
    highvideo;
    write('SNAKE.');
    lowvideo;
    if color then
      textcolor(9);
    gotoxy(14,8);
    write('You move the SNAKE with: ');
    highvideo;
    write(#27);
    lowvideo;
    if color then
      textcolor(9);
    write(' to ');
    highvideo;
    write('LEFT ');
    lowvideo;
    if color then
      textcolor(9);
    write('and ');
    highvideo;
    write(#26);
    lowvideo;
    if color then
      textcolor(9);
    write(' to ');
    highvideo;
    write('RIGHT.');
    lowvideo;
    LnofBoody:=30;
    IncLength:=8;
    cp:=false;
    SnakeCome;
    if color then
      textcolor(9);
    gotoxy(26,10);
    write('Press       bar to');
    highvideo;
    gotoxy(32,10);
    write('SPACE');
    gotoxy(45,10);
    if color then
      textcolor(3)
    else
      highvideo;
    if allscore<>0 then write('NEXT LEVEL!')
                   else write('continue!');
    lowvideo;
    if color then
      textcolor(9);
    repeat
      if keypressed then cr:=readkey;
      demo;
    until cr=' ';
  end;


procedure CheckD;

begin
  if ((xp>=78) and Right) then
    begin
      Up:=false;
      Down:=false;
      Left:=true;
      Right:=false;
    end;
  if ((xp<=2) and Left) then
    begin
      Up:=false;
      Down:=false;
      Left:=false;
      Right:=true;
    end;
  if ((yp>=23) and Down) then
    begin
      Up:=true;
      Down:=false;
      Left:=false;
      Right:=false;
    end;
  if ((yp<=2) and Up) then
    begin
      Up:=false;
      Down:=true;
      Left:=false;
      Right:=false;
    end;
  if ((xp=13) and ((yp>=5) and (yp<=11)) and Right) then
    begin
      Up:=false;
      Down:=false;
      Left:=true;
      Right:=false;
    end;
  if ((xp=67) and ((yp>=5) and (yp<=11)) and Left) then
    begin
      Up:=false;
      Down:=false;
      Left:=false;
      Right:=true;
    end;
  if ((yp=6) and ((xp>=13) and (xp<=67)) and Down) then
    begin
      Up:=true;
      Down:=false;
      Left:=false;
      Right:=false;
    end;
  if ((yp=11) and ((xp>=13) and (xp<=67)) and Up) then
    begin
      Up:=false;
      Down:=true;
      Left:=false;
      Right:=false;
    end;
end;


procedure RNDWay;

var
  head,
  Way: integer;
begin
  Way:=random(3);
  if Way=1 then
    begin
      if Up then
        begin
          Left:=true;
          Right:=false;
          Up:=false;
          Down:=false;
        end
      else
      if Down then
        begin
          Right:=true;
          Left:=false;
          Up:=false;
          Down:=false;
        end
      else
      if Right then
        begin
          Up:=true;
          Down:=false;
          Left:=false;
          Right:=false
        end
      else
      if Left then
        begin
          Down:=true;
          Up:=false;
          Left:=false;
          Right:=false;
        end;
    end;
  if Way=2 then
    begin
      if Up then
        begin
          Left:=false;
          Right:=true;
          Up:=false;
          Down:=false;
        end
      else
      if Down then
        begin
          Right:=false;
          Left:=true;
          Up:=false;
          Down:=false;
        end
      else
      if Right then
        begin
          Up:=false;
          Down:=true;
          Left:=false;
          Right:=false
        end
      else
      if Left then
        begin
          Down:=false;
          Up:=true;
          Left:=false;
          Right:=false;
        end;
    end;
  head:=500-LnofBoody;
  if ((Boody[1,head]=2) and (Boody[2,head]=2)) then
    begin
      if Up then
        begin
          Right:=true;
          Left:=false;
          Down:=false;
          Up:=false;
        end
      else
      if Left then
        begin
          Down:=true;
          Up:=false;
          Right:=false;
          Left:=false;
        end;
    end;
  if ((Boody[1,head]=78) and (Boody[2,head]=2)) then
    begin
      if Right then
        begin
          Down:=true;
          Up:=false;
          Right:=false;
          Left:=false;
        end
      else
      if Up then
        begin
          Left:=true;
          Right:=false;
          Up:=false;
          Down:=false;
        end;
    end;
  if ((Boody[1,head]=78) and (Boody[2,head]=23)) then
    begin
      if Down then
        begin
          Right:=true;
          Left:=false;
          Down:=false;
          Up:=false;
        end
      else
      if Right then
        begin
          Up:=true;
          Down:=true;
          Right:=false;
          Left:=false;
        end;
    end;
  if ((Boody[1,head]=2) and (Boody[2,head]=23)) then
    begin
      if Down then
        begin
          Left:=true;
          Right:=false;
          Down:=false;
          Up:=false;
        end
      else
      if Left then
        begin
          Up:=true;
          Down:=false;
          Right:=false;
          Left:=false;
        end;
    end;
  CheckD;
end;


procedure WriteD;

begin
  gotoxy(79,24);
  if color then
    textcolor(11)
  else
    highvideo;
  if Left then
    write(#27);
  if Right then
    write(#26);
  if Up then
    write(#24);
  if Down then
    write(#25);
  lowvideo;
  if color then
    textcolor(9);
end;


procedure demo;

var
  rv: integer;
begin
  demon:=true;
  delay(15);
  rv:=random(101);
  if rv>95 then
    begin
      RNDWay;
      sound(880);
      delay(3);
      nosound;
    end;
  if Up then yp:=yp-1;
  if Down then yp:=yp+1;
  if Left then xp:=xp-1;
  if Right then xp:=xp+1;
  if xp<=3 then
    begin
      xp:=xp+1;
      RNDWay;
    end;
  if xp>=78 then
    begin
      xp:=xp-1;
      RNDWay;
    end;
  if yp<=3 then
    begin
      yp:=yp+1;
      RNDWay;
    end;
  if yp>=23 then
    begin
      yp:=yp-1;
      RNDWay;
    end;
  if ((yp=11) and Up and ((xp>13) and (xp<67))) then
    begin
      yp:=yp+1;
      RNDWay;
    end;
   if ((yp=6) and Down and ((xp>13) and (xp<67))) then
     begin
       yp:=yp-1;
       RNDWay;
     end;
   if ((xp=13) and Right and ((yp>5) and (yp<12))) then
     begin
       xp:=xp-1;
       RNDWay;
     end;
    if ((xp=67) and Left and ((yp>6) and (yp<11))) then
      begin
        xp:=xp+1;
        RNDWay;
      end;
    CheckD;
  p:=max-LnofBoody;
  First:=p;
  Last:=max-1;
  while p<=max do
    begin
      if ((xp=Boody[1,p]) and (yp=Boody[2,p])) then
        begin
          if Up then yp:=yp+1;
          if Down then yp:=yp-1;
          if Left then xp:=xp+1;
          if Right then xp:=xp-1;
          RNDWay;
          p:=max;
        end;
      p:=p+1;
    end;
  p:=max-LnofBoody;         
  First:=p;                 
  Last:=max-1;              
  xb:=xp;                   
  yb:=yp;
  while p<=max do
    begin
      xa:=Boody[1,p];        
      Boody[1,p]:=xb;        
      ya:=Boody[2,p];
      Boody[2,p]:=yb;
      if First=p then     
        begin
          if color then
            textcolor(13)
          else
            highvideo;
          gotoxy(Boody[1,p],Boody[2,p]);
          write(#2);
          lowvideo;
        end
      else if Last=p then    
             begin
               if color then
                 textcolor(6);
               gotoxy(Boody[1,p],Boody[2,p]);
               write(#4);
             end
      else
        begin
          if color then
            textcolor(2);
          gotoxy(Boody[1,p],Boody[2,p]);
          write(#1);
        end;
      p:=p+1;        
      xb:=xa;        
      yb:=ya;
    end;
  gotoxy(Boody[1,500],Boody[2,500]);
  write(' ');
  demon:=false;
end;


procedure IfEat;
begin
  sound(220);
  delay(15);
  nosound;
end;


procedure Crash;
var
  vv,
  ii: integer;
begin
  ii:=0;
  while ii<=100 do
    begin
      vv:=random(1230);
      sound(vv);
      delay(5);
      nosound;
      ii:=ii+1;
    end;
end;


procedure increase;
  label Exit_from_Check;
begin
  IfEat;
  score:=score+1;
  if score=10 then
    begin
      qu:=true;
      goto Exit_from_Check;
    end;
  if score>=ref then
    begin
      ref:=ref+1;
      if NegSpeed>=10 then
        NegSpeed:=NegSpeed-10;
    end;
  start:=((max-1)-LnofBoody);     
  Trg:=max-(LnofBoody)-IncLength; 
  LnofBoody:=LnofBoody+IncLength;
  xn:=xp;
  yn:=yp;
  inc:=false;
  while start>=Trg do
    begin
      DirectionRead;
      if color then
        textcolor(2);
      gotoxy(xn,yn);
      write(#1);
      p:=start;
      if Left then xn:=xn-1;
      if Right then xn:=xn+1;
      if Up then yn:=yn-1;
      if Down then yn:=yn+1;
      if CheckPos(xn,yn) then
        begin
          Crash;
          goto Exit_from_Check;
        end;
      if ((xn=px) and (yn=py)) then
        begin
          IfEat;
          inc:=true;
        end;
      Boody[1,start]:=xn;
      Boody[2,start]:=yn;
      if color then
        textcolor(13)
      else
        highvideo;
      gotoxy(Boody[1,p],Boody[2,p]);
      write(#2);
      lowvideo;
      if score>5 then
        delay(NegSpeed+((score-4)*4))
      else
        if (NegSpeed>score) then
          delay(NegSpeed div score)
        else
          delay(0);
      start:=start-1;
    end;
  xp:=xn;
  yp:=yn;
  Exit_from_Check:
  putheart;
end;


function CheckPos(xxx,yyy: integer): boolean;
var
  ti: integer;
begin
  CheckPos:=false;
  qu:=false;
  if ((xxx<2) or (xxx>78)) then
    begin
      qu:=true;
      CheckPos:=true;
    end;
  if ((yyy<2) or (yyy>23)) then
    begin
      qu:=true;
      CheckPos:=true;
    end;
  ti:=max-LnofBoody;
  repeat
    if ((xxx=Boody[1,ti]) and (yyy=Boody[2,ti])) then
      begin
        qu:=true;
        CheckPos:=true;
      end;
    ti:=ti+1;
  until ti>=max;
  ti:=1;
  repeat
    if ((xxx=Walls[1,ti]) and (yyy=Walls[2,ti])) then
      begin
        qu:=true;
        CheckPos:=true;
      end;
    ti:=ti+1;
  until ti>=Walln;
end;


procedure MoveSnake;
  label quit;
  var
    ti: integer;
  begin
    if color then
      textcolor(9);
    DirectionRead;                
    PutHeart;                     
    repeat
      gotoxy(1,1);
      highvideo;
      write(score);
      lowvideo;
      p:=max-LnofBoody;           
      if p<10 then goto quit;     
      if Left then
        begin
          xp:=xp-1;
        end
      else
      if Right then
        begin
          xp:=xp+1;
        end
      else
      if Up then
        begin
          yp:=yp-1;
        end
      else
      if Down then
        begin
          yp:=yp+1;
        end;
      if CheckPos(xp,yp) then
        begin
          Crash;
          goto quit;
        end;
      First:=p;             
      Last:=max-1;          
      xb:=xp;               
      yb:=yp;
      while p<=max do
        begin
          xa:=Boody[1,p];          
          Boody[1,p]:=xb;          
          ya:=Boody[2,p];
          Boody[2,p]:=yb;
          if First=p then           
            begin
              if color then
                textcolor(13)
              else
                highvideo;
              gotoxy(Boody[1,p],Boody[2,p]);
              write(#2);
              lowvideo;
            end
          else if Last=p then   
                 begin
                   if color then
                     textcolor(6);
                   gotoxy(Boody[1,p],Boody[2,p]);
                   write(#4);
                 end
          else
            begin
              if color then
                textcolor(2);
              gotoxy(Boody[1,p],Boody[2,p]);
              write(#1);
            end;
          p:=p+1;       
          xb:=xa;       
          yb:=ya;
        end;
        gotoxy(Boody[1,500],Boody[2,500]);
        write(' ');
        DirectionRead;
        if ((px=xp) and (py=yp)) then
          begin
            Increase;
            if qu then goto quit;
          end;
          while inc do
            begin
              Increase;
              if qu then goto quit;
            end;
      WriteD;
    until cr='s';
    quit:
  end;


procedure flash(y,r: integer);
var
  i: integer;
 cc: string[1];

begin
  repeat
    i:=1;
    cc:='';
    while i<=46 do
      begin
        cc:=copy(c,i,1);
        gotoxy(i+13,y);
        if color then
          textcolor(14)
        else
          highvideo;
        write(cc);
        delay(20);
        gotoxy(i+13,y);
        lowvideo;
        if color then
          textcolor(9);
        write(cc);
        i:=i+1;
      end;
    r:=r-1;
  until r<1;
  if color then
    textcolor(9);
end;


begin
  randomize;
  clrscr;
  if color then
    textcolor(13);
  crsroff;
  c:=Copyr;
  Flash(12,3);
  wr:=false;
  CheckHigh;
  Player:='';
  repeat
    BoodyInit;
    KO:=2;
    lowvideo;
    clrscr;
    textbackground(0);
    if color then
      textcolor(11);
    writeln('          The      SSSSSS                         kkk');
    writeln('                  SS   SS                        kk');
    writeln('                 SS         n nnn        aa a   kk     kk    eeeee');
    writeln('                  SSSSS     nn  nn     aa   aa   kk   kk    eee   e');
    writeln('                       SS   nn   nn   aa    ss   kk kk     eeeeeee');
    writeln('                 SS   SS    nn   nn   ss    s    kk  kk    ee');
    writeln('                 SSSSSS    nn   nn     ssss ss  kk    kk    eeeee');
    writeln('                                 in the LABYRINTH');
    if color then
      textcolor(13)
    else
      highvideo;
    writeln;
    writeln('                       Copyright (C) 1991 by László Kővári');
    writeln('                                 ShareWare Program!');
    writeln('                                       v1.05');
    gotoxy(33,24);
    write('#'+chr(2)+chr(11)+'!3647321033');
    if color then
      textcolor(9);
    crsron;
    lowvideo;
    if color then
      textcolor(9);
    gotoxy(29,14);
    write('Enter your name: ');
    if color then
      textcolor(10)
    else
      highvideo;
    auxplayer:=player;
    player:='';
    readln(player);
    if player='' then
      player:=auxplayer;
    lowvideo;
    if color then
      textcolor(9);
    gotoxy(25,16);
    write('Enter the Game speed (1-5) : ');
    highvideo;
    repeat
      gotoxy(54,16);
      cc:=readkey;
      val(cc,Speed,vl);
      if vl<>0 then
        begin
          speed:=4;
          cc:=' ';
          vl:=0;
        end;
    until (((Speed>=1) and (Speed<=5)) and (vl=0));
    crsroff;
    if color then
      textcolor(9);
    allscore:=0;
    level:=0;
    repeat
      NegSpeed:=50;
      NegSpeed:=NegSpeed*(6-Speed);
      IncLength:=IncLength+2;      
      level:=level+1;
      if (NegSpeed>(2*level)) then
        NegSpeed:=NegSpeed-(2*level);
      lowvideo;
      score:=0;
      ScreenMask;
      LnofBoody:=10;
      Border;
      gotoxy(1,24);
      highvideo;
      write(level);
      lowvideo;
      Lab;
      cp:=true;
      demon:=false;
      SnakeCome;
      if ScExit then goto Exit_;
      MoveSnake;
      allscore:=allscore+score;
    until score<10;
    Exit_:
    clrscr;
    if color then
      textcolor(9);
    gotoxy(26,12);
    write('You have got ');
    if color then
      textcolor(13)
    else
      highvideo;
    write(allscore);
    lowvideo;
    if color then
      textcolor(9);
    write(' Heart(s)!');
    delay(2000);
    SortScores;
    if Wr then
      WriteScores;
    DispScores;
    gotoxy(31,22);
    write('Next game ? ');
    highvideo;
    write('Y - N ');
    lowvideo;
    cr:=chr(0);
    repeat
      cr:=readkey;
      cr:=upcase(cr);
    until ((cr='N') or (cr='Y'));
  until cr='N';
  clrscr;
  if color then
    textcolor(13);
  gotoxy(4,1);
  write(c);
  gotoxy(38,12);
  write('Hi');
  gotoxy(35,13);
  write(Player,',');
  gotoxy(30,14);
  write('Thanks for the Game.');
  Flash(1,3);
  gotoxy(33,24);
  write('#'+chr(2)+chr(11)+'!3647321033');
  gotoxy(1,16);
  crsron;
end.


