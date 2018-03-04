{
 * PROGRAM    : A5X5.PAS
 * AUTHOR     : László Kővári
 * DATE       : '93.06.28.
 * LAST UPDATE: '93.08.02.
 * COPYRIGHT  : Copyright (C) 1993 by László Kővári #3647321033
 *
 *	 Rekurzio; mikor egy eljárás vagy fügvény közvetlenül vagy közvetetten önmagát hivja, egy adott feltétel teljesüléséig.
 *
 *	 Visszalépéses algoritmus (Back-Tracking):
 *	 A feldolgozás egy adott pontján a döntéshez szükséges információk hiinyában 2 lehetséges elágazás közzüé kivá-
 *	 lasztjuk az egyiket, s azzal a feltőtelezőssel őlve, hogy ez a helyes  ág, elindulunk rajta. Időközben megszületnek
 *	 a döntéshez szükséges információk, s igy el tudjuk már dönteni hogy a helyes  ágat vállasztottuk-e. Ha igen akkor
 *	 tovább haladunk rajta. Ha nem, akkor  átlépünk a másik ágra elöbb azonban helyre kell állitani azt az eredeti állapotot.
 *	 (Jackson a kiértékelhetetlen feltételekkel rendelkező problémák leirására uj szerkezeti elemet vezetett be az un.
 *	 posit/admit szerkezetet, mely ugyan strukturadiagrammban nem tér el a select szerkezeti elemtől, viszont funkcion -
 *	 lis leirása és müködése egész más. A két ág nem komplemense egymásnak, hiszen a jó ág egy részét mindkét esetben fel-
 *	 dolgozzuk álltalában.
 *
 *	 2 lépés    300 féle módon rakható fel az 5x5-ös mezőre
 *	 3  -"-    2300
 *	 11      4457400
 *	 12      5200300
 *	 13      5200300
 *               25!
 *	 14      -----------=4457400
 *	        14!(25-14)!
 *
}
program A5X5;

{$M 65520,20000,65520}
uses crt,dos;

const
	(* 5x5-ös tábla bejárási útvonala *)
	way : array[1..25,1..2] of integer=((1,1),(1,2),(1,3),(1,4),(1,5),
	 	 	 	(2,1),(2,2),(2,3),(2,4),(2,5),
	 	 	 	(3,1),(3,2),(3,3),(3,4),(3,5),
	 	 	 	(4,1),(4,2),(4,3),(4,4),(4,5),
	 	 	 	(5,1),(5,2),(5,3),(5,4),(5,5));

	 pos : array[1..5,1..5,1..2] of integer=(((42,10),(42,12),(42,14),(42,16),(42,18)),
	 	 	 	((45,10),(45,12),(45,14),(45,16),(45,18)),
	 	 	 	((48,10),(48,12),(48,14),(48,16),(48,18)),
	 	 	 	((51,10),(51,12),(51,14),(51,16),(51,18)),
	 	 	 	((54,10),(54,12),(54,14),(54,16),(54,18)));
	maxpos=25;
	copyright= 'Copyright (C) 1993 by László Kővári #!3647321033';
type
	 table= array [1..5,1..5] of integer;
	 steps= array [1..3,1..25] of integer;
var
	 	 area0,
	 	 area1: table;
	 	 step0: steps;
	 	 	 	solve,
	 cd,maxstep,
	full,steped: integer;
	combination: longint;
	 	c: char;
	  H,M,S,HU,
	 	 HB,MB,SB,HUB,
	 	 HE,ME,SE,HUE: WORD;

{ Felvétel a lépéslistára  I,J koordinátáju stp. lépést poz. pozicióra }
procedure storestep(var s:steps;i,j,stp,poz:integer);

begin
	steped := stp;
	s[1, steped] := i;
	s[2, steped] := j;
	s[3, steped] := poz;
end;

{ Idő kijelzpse }
procedure disptime;
begin
	GetTime(HE, ME, SE, HUE);
	gotoxy(1, 22);
	clreol;
	gotoxy(16, 22);
	write('Time is : ',he,' hour ',me,' minute ',se,' second ',hue,' hundreds');
end;

{ Tábla alaphelyzetbe }
procedure initt(var t: table);
var
	i,j: integer;
begin
	i := 1;
	repeat
	 j := 1;
	 repeat
	 	t[i, j] := 0;
	 	j := j + 1;
	 until j > 5;
	 i := i + 1;
	until i > 5;
	t[3, 3] := 1;
	t[2, 3] := 1;
	t[4, 3] := 1;
	t[3, 2] := 1;
	t[3, 4] := 1;
end;

{ Egy lppps szimul ciója }
procedure setarea(var t: table;i,j: integer);
begin
	(* Amelyikre tett *)
	t[i, j] := -t[i, j] + 1;
	(* Ha 1 akkor a I-1.-et nem vőltoztatja *)
	if i > 1 then
	 t[i-1, j] := -t[i - 1, j] + 1;
	(* Ha 5 akkor az I+1.-et nem vőltoztatja *)
	if i < 5 then
	 t[i + 1, j] := -t[i + 1, j] + 1;
	(* Ha 1 akkor a J-1.-et nem vőltoztatja *)
	if j > 1 then
	 t[i, j - 1] := -t[i, j - 1] + 1;
	(* Ha 5 akkor az J+1.-et nem vőltoztatja *)
	if j < 5 then
	 t[i, j + 1] := -t[i, j + 1] + 1;
end;

{ Tőbla megjelenitpse }
procedure disparea(t:table);
var
	ip,jp: integer;
begin
	gotoxy(21, 8);
	write('Best combination');
	gotoxy(21, 9);
	write('+--------------+');
	gotoxy(21, 10);
	write('|  |  |  |  |  |');
	gotoxy(21, 11);
	write('+--------------+');
	gotoxy(21, 12);
	write('|  |  |  |  |  |');
	gotoxy(21, 13);
	write('+--------------+');
	gotoxy(21, 14);
	write('|  |  |  |  |  |');
	gotoxy(21, 15);
	write('+--------------+');
	gotoxy(21, 16);
	write('|  |  |  |  |  |');
	gotoxy(21, 17);
	write('+--------------+');
	gotoxy(21, 18);
	write('|  |  |  |  |  |');
	gotoxy(21, 19);
	write('+--------------+');
	ip := 1;
	gotoxy(1, 1);
	writeln;
	writeln;
	repeat
	 jp := 1;
	 repeat
	 	gotoxy(pos[jp, ip, 1] - 20, pos[jp, ip, 2]);
	 	if t[jp, ip] <> 0 then
	 	 write('��')
	 	else
	 	 write('  ');
	 	jp := jp + 1;
	 until jp > 5;
	 writeln;
	 ip := ip + 1;
	until ip > 5;
end;

{ Lpppssorrend megjelenitpse }
procedure dispvari(sx: steps);
var
	x,y,v0: integer;
begin
	sound(880);
	delay(10);
	nosound;
	disptime;
	gotoxy(1, 7);
	clreol;
	gotoxy(41, 8);
	write('Order of ',maxstep,' steps');
	gotoxy(41, 9);
	write('+--------------+');
	gotoxy(41, 10);
	write('|  |  |  |  |  |');
	gotoxy(41, 11);
	write('+--------------+');
	gotoxy(41, 12);
	write('|  |  |  |  |  |');
	gotoxy(41, 13);
	write('+--------------+');
	gotoxy(41, 14);
	write('|  |  |  |  |  |');
	gotoxy(41, 15);
	write('+--------------+');
	gotoxy(41, 16);
	write('|  |  |  |  |  |');
	gotoxy(41, 17);
	write('+--------------+');
	gotoxy(41, 18);
	write('|  |  |  |  |  |');
	gotoxy(41, 19);
	write('+--------------+');
	v0 := 1;
	repeat
	 gotoxy(pos[sx[1, v0], sx[2, v0], 1], pos[sx[1, v0], sx[2, v0], 2]);
	 write(v0);
	 v0 := v0 + 1;
	until v0 > maxstep;
end;

{ Kezdő lpppsek felrakősa }
procedure putstep(var t: table;var s: steps;i0,n: integer);
var
	ii: integer;
begin
	ii:=i0;
	repeat
	 setarea(t, way[ii, 1], way[ii, 2]);
	 storestep(s, way[ii, 1], way[ii, 2], ii, ii);
	 combination := ii;
	 disparea(area0);
	 ii := ii + 1;
	until ii > n;
end;

{ Alaphelyzetbe }
procedure inits(var s: steps);
var
	i: integer;
begin
	i := 1;
	while i <= maxpos do begin
	 s[1, i] := 0;
	 s[2, i] := 0;
	 s[3, i] := i;
	 i := i + 1;
	end;
end;

{ Tábla kirakásának ellenörzése }
function areafull(t: table): boolean;
var
	s,i,j: integer;
begin
	i := 1;
	s := 0;
	repeat
	 j := 1;
	 repeat
	 	(* Tömb elemek értékét összeadja s ha tele a tömb 25-öt kell kapni *)
	 	s := s + t[i, j];
	 	j := j + 1;
	 until j > 5;
	 i := i + 1;
	until i > 5;
	if full < s then begin
	 full := s;
	 disparea(t);
	 gotoxy(44, 6);
	 clreol;
	 gotoxy(44, 6);
	 write(full);
	 dispvari(step0);
	end;
	gotoxy(43,5);
	write(combination);
	if s = maxpos then
	 areafull := true
	else
	 areafull := false;
end;

{ Kereső eljárás }
procedure find(var Tb:table;var Nr,Po:integer);
begin
	steped := Nr;
	if (Nr < maxstep) and ((step0[3, Nr]) < (maxpos - (maxstep - Nr))) then begin
	 (* Visszalépés után felrakja a következőt
	 (* Ha visszalépett a 12.-re akkor odébbteszi s meghivja magára
	 13.-ra azt is leteszi s meghivja magát a 14.-re s végrehajtja
	 a 14. elem iterációját, vagyis leteszi a 13. utáni összes me-
	 zőre *)
	 Po := step0[3, Nr];
	 (* Következő lépés felrakása *)
	 setarea(tb, way[Po + 1, 1], way[Po + 1, 2]);
	 (* Feljegyzés a lépéslistára *)
	 storestep(step0, way[Po + 1, 1], way[Po + 1, 2], Nr, Po + 1);
	 (* Köv. lépés helyének sorszáma=jelenlegi lépés helyének sorszámával *)
	 step0[3, Nr + 1] := step0[3, Nr];
	 (* N. lépés poziciója *)
	 Po := step0[3, Nr];
	 Nr := Nr + 1;
	 Po := Po + 1;
	 find(Tb, Nr, Po);
	end
	else begin
	 while (step0[3,Nr])<(maxpos-(maxstep-Nr)) do begin
	 	(* 14. elem iterációja *)
	 	(* Még nem ért végig a táblán! *)
	 	(* Következő lépés felrak sa *)
	 	setarea(tb, way[Po, 1], way[Po, 2]);
	 	(* Feljegyzés a lépéslistára *)
	 	storestep(step0, way[Po, 1], way[Po, 2], Nr, Po);
	 	combination := combination + 1;
	 	(* állapot ellenörzése *)
	 	if areafull(tb) then begin
	 	 sound(880);
	 	 delay(2000);
	 	 nosound;
	 	 solve := solve + 1;
	 	 (* Egy lehetséges variáció *)
	 	 dispvari(step0);
	 	 gotoxy(32, 7);
	 	 write(solve,'. solve found');
	 	 gotoxy(33, 20);
	 	 write('Press a key...');
	 	 repeat
	 	 until keypressed;
	 	 c:=readkey;
	 	 gotoxy(33, 20);
	 	 clreol;
	 	 full := 0;
	 	end;
	 	(* Leveszi a lépést azaz visszalép *)
	 	setarea(tb, way[Po, 1], way[Po, 2]);
	 	Po := Po + 1;
	 end;
	 (* N-1. lépést leveszi *)
	 Nr := Nr - 1;
	 Po := step0[3, Nr];
	 setarea(tb, way[Po, 1], way[Po, 2]);
	end;
end;

{ Megoldások keresése
	N = lépés száma
	P = pozició - mező melyen az N. lépés áll }
procedure findfull(nn,pp: integer);
var
	N,P: integer;
begin
	N := nn;
	P := pp;
	repeat
	 find(area0, N, P);
	 (* Ha az első lépés a 11. pozición van kilép *)
	until ((step0[3, 1]) >= (maxpos - (maxstep - N)));
end;

{ Főprogram }
begin
	if ((paramcount < 1) or (paramcount > 1)) then
	 maxstep := 14
	else begin
	 val(paramstr(1), maxstep, cd);
	 if ((maxstep < 2) or (maxstep > 23)) then
	 	maxstep := 14;
	end;
	clrscr;
	gotoxy(21, 1);
	write('SOLUTION OF THE 5X5 GAME WITH ',maxstep,' STEPS.');
	gotoxy(16, 24);
	write(copyright);
	gotoxy(30, 5);
	write('Combinations:');
	gotoxy(33, 6);
	write('Filled max:');
	(* Tábla alaphelyzetbe *)
	initt(area0);
	(* Lépéstörolő alaphelyzetbe *)
	inits(step0);
	steped := 1;
	Full := 0;
	solve := 0;
	(* Első 13 lépés felrakása *)
	putstep(area0, step0, 1, maxstep - 1);
	combination := 0;
	gotoxy(29, 3);
	write('Please wait working...');
	GetTime(HB, MB, SB, HUB);
	gotoxy(16,21);
	write('Began at: ',hb,' hour ',mb,' minute ',sb,' second ',hub,' hundreds');
	(* Megoldáé skeres *)
	findfull(maxstep, maxstep);
	(* Eltelt idő kijelzése *)
	disptime;
	writeln;
end.
   

