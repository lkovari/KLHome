PAGE	67,132

TITLE	Maker2nd

COMMENT *
	Written by László Kővári  1990.06.14.
		     	 Last Update  1990.06.14.


	 This program write the screen the signo of program maker.

	 Version 2.00


	*

CODE	SEGMENT PARA	PUBLIC	'CODE'

	ASSUME	CS:CODE,DS:CODE,SS:CODE,ES:NOTHING

		ORG	100H
START:
		JMP	ENTRY

ENTRY:

;
;
;	Main program.
;
;

		Call	Maker2nd		 ;karakterek gorgetese
		MOV	AH,0			;Exit to DOS function
		INT	20H			;Call DOS

;
;
;	Data section.
;
;
	Cr	struc

		Chr	db	0			;Mozgatando karakter
		Status	db	0			;A statusza - 77h ha
							;celbaert
		Xs	db	0			;X statusz
		Ys	db	0			;Y statusz
		Sa	db	0			;Seged statusz
		Xa	db	0			;Aktualis poz. /kezdo/
		Ya	db	0
		Xd	db	0			;Cel pozicio
		Yd	db	0
		Xe	db	0			;Elozo poz /torlendo/
		Ye	db	0

	Cr	ends

;--------------------------------------------------------
;	Struktura a cel poziciok ellenorzesere. 		:
;	H a egy mozgo karakter egy mar celbaert helyere :
;	lep akkor a mozgo torlese /mozgasa/ soran ures	:
;	hely keletkezik. Ezt azzal kell kikuszobolni	:
;	hogy utana meg kell vizsgalni hogy az a pozicio :
;	egy celpozicio-e es hogy melyik karaktere.		:
;--------------------------------------------------------

	Dst	Struc

		Dstx		db	0		;cel pozicio
		Dsty		db	0
		Character	db	0		;karakter

	Dst	ends

	ChrOutP     Macro			    ;Karakter megjelenites
							;pozicionalva
		    push    ax
		    push    bx
		    push    cx
		    mov     bh,0
		    mov     al,dl
		    mov     ah,10
		    mov     cx,01
		    int     10h
		    pop     cx
		    pop     bx
		    pop     ax

		    EndM

	M	db	'Copyright (C) 1993 by L�szl� K�v�ri #!364121033'
	Stat	db	0				;
	Xstat	db	0				;77h ha celhozert ha
							;kell modositani
	Ystat	db	0
	AuxSt	db	0				;Seged statusz
	ModeX	db	0				;Noveles vagy csokkenes
	ModeY	db	0
	Xpos	db	0				;Crsr. pos
	Ypos	db	0
	Xap	db	0				;Aktualis pozicio
	Yap	db	0
	Xdp	db	0				;Cel pozicio
	Ydp	db	0
	Xep	db	0				;Eredeti pozicio
	Yep	db	0
	ChrAct	db	0				;Aktualis karakter
	Counter db	0				;Celhozert karakterek

	Destchar		db	0		;megerositendo kar.
	CharCount		db	0		;kar. szamlalo

	Rndx			db	0
	Rndy			db	0


;
;			  Kiirando karakter
;			  |  Statusz /celhoz ert vagy nem/
;			  |  | X poz. allapota /kell-e novelni vagy csokkenteni/
;			  |  | | Y poz. allapota /kell-e novelni vagy csokk./
;			  |  | | | Seged statusz
;			  |  | | | | Aktualis X Y pozicio /Kezdo pozicio/
;			  |  | | | | | | Cel X Y pozicio
;			  |  | | | | | |  |  | Kezdeti pozicio, ehhez viszonyit
;			  |  | | | | | |  |  | | |
;			  |  | | | | | |  |  | | |
	Ch1	cr	<'(',0,0,0,0,2,1,28,4,2,1>
	Ch2	cr	<'C',0,0,0,0,3,2,29,4,3,2>
	Ch3	cr	<')',0,0,0,0,5,1,30,4,5,1>
	Ch4	cr	<' ',0,0,0,0,7,2,31,4,7,2>
	Ch5	cr	<'1',0,0,0,0,9,1,32,4,9,1>
	Ch6	cr	<'9',0,0,0,0,11,2,33,4,11,2>
	Ch7	cr	<'9',0,0,0,0,13,1,34,4,13,1>
	Ch8	cr	<'3',0,0,0,0,15,2,35,4,15,2>
	Ch9	cr	<' ',0,0,0,0,17,1,36,4,17,1>
	Ch10	cr	<'b',0,0,0,0,19,2,37,4,19,2>
	Ch11	cr	<'y',0,0,0,0,21,1,38,4,21,1>
	Ch12	cr	<' ',0,0,0,0,23,2,39,4,23,2>
	Ch13	cr	<'L',0,0,0,0,41,1,40,4,41,1>
	Ch14	cr	<'e',0,0,0,0,58,2,41,4,58,2>
	Ch15	cr	<'s',0,0,0,0,60,1,42,4,60,1>
	Ch16	cr	<'l',0,0,0,0,62,2,43,4,62,2>
	Ch17	cr	<'i',0,0,0,0,64,1,44,4,64,1>
	Ch18	cr	<'e',0,0,0,0,66,2,45,4,66,2>
	Ch19	cr	<' ',0,0,0,0,1,22,46,4,1,22>
	Ch20	cr	<'K',0,0,0,0,5,23,47,4,5,23>
	Ch21	cr	<'�',0,0,0,0,10,22,48,4,10,22>
	Ch22	cr	<'v',0,0,0,0,15,23,49,4,15,23>
	Ch23	cr	<'�',0,0,0,0,20,22,50,4,20,22>
	Ch24	cr	<'r',0,0,0,0,25,23,51,4,25,23>
	Ch25	cr	<'i',0,0,0,0,45,22,52,4,45,22>

	Ch26	cr	<'L',0,0,0,0,50,23,38,7,50,23>
	Ch27	cr	<'K',0,0,0,0,55,22,39,7,55,22>
	Ch28	cr	<'`',0,0,0,0,60,23,40,7,60,23>
	Ch29	cr	<'9',0,0,0,0,65,22,41,7,65,22>
	Ch30	cr	<'3',0,0,0,0,70,23,42,7,70,23>
	Ch31	cr	<'.',0,0,0,0,75,22,43,7,75,22>

	Dp1	Dst	<28,4,'('>
	Dp2	Dst	<29,4,'C'>
	Dp3	Dst	<30,4,')'>
	Dp4	Dst	<31,4,' '>
	Dp5	Dst	<32,4,'1'>
	Dp6	Dst	<33,4,'9'>
	Dp7	Dst	<34,4,'9'>
	Dp8	Dst	<35,4,'3'>
	Dp9	Dst	<36,4,' '>
	Dp10	Dst	<37,4,'b'>
	Dp11	Dst	<38,4,'y'>
	Dp12	Dst	<39,4,' '>
	Dp13	Dst	<40,4,'L'>
	Dp14	Dst	<41,4,'e'>
	Dp15	Dst	<42,4,'s'>
	Dp16	Dst	<43,4,'l'>
	Dp17	Dst	<44,4,'i'>
	Dp18	Dst	<45,4,'e'>
	Dp19	Dst	<46,4,' '>
	Dp20	Dst	<47,4,'K'>
	Dp21	Dst	<48,4,'�'>
	Dp22	Dst	<49,4,'v'>
	Dp23	Dst	<50,4,'�'>
	Dp24	Dst	<51,4,'r'>
	Dp25	Dst	<52,4,'i'>

	Dp26	Dst	<38,7,'L'>
	Dp27	Dst	<39,7,'K'>
	Dp28	Dst	<40,7,'`'>
	Dp29	Dst	<41,7,'9'>
	Dp30	Dst	<42,7,'3'>
	Dp31	Dst	<43,7,'.'>


;	A negy hang frequ. ertekei

	First_S 	dw	(3043)
			dw	(4061)
			dw	(3043)
			dw	(3409)

;	A negy hang utem ertekei

	First_D 	dw	(2)			;ti
			dw	(2)			;ti
			dw	(2)			;ti
			dw	(6)			;ta+ti


;--------------------------------------------------------
;	Dallam						:
;--------------------------------------------------------

	Sound	proc	near

		push	ax
		push	si
		push	di
		push	cx
		mov	al,0b6h 			;idozito uzem mod
		out	67,al
		mov	si,offset First_S		;hang kezdet
		mov	di,offset First_D		;utem kezdet
;	a dallamot jattsza 4 hang
		mov	cx,4
	Scale:
;	a frequ. beallitasa az osztoval
		mov	ax,[si]
		out	66,al				;ketszerre teszi ki
		mov	al,ah
		out	66,al
;	hang bekapcsolasa
		in	al,97
		push	ax
		or	al,3
		out	97,al
		pop	ax
		push	cx
;	hang kitartasa
		call	delayl
;	hang kikapcsolasa
		out	97,al
;	ket hang kozti szunet
		mov	cx,20000
	Pause:
		loop	Pause
		pop	cx
		add	si,2
		add	di,2
		loop	Scale
;	dallam vege
		pop	cx
		pop	di
		pop	si
		pop	ax
		ret

	Sound	endp

;--------------------------------------------------------
;	A kiindulasi poziciok betoltese 		:
;	A rutin a generalt pszeudoveletlen ertekekkel	:
;	tolti fel a strukturaban a kiindulasi /eredeti/ :
;	es az aktualis poziciot.			:
;--------------------------------------------------------

	StorPos proc	near

		push	ax
		push	bx
		push	cx
		push	si

		mov	si,offset Ch1
		mov	cx,31
	NewStor:
		Call	RndxG
		call	RndyG
		add	si,5
		mov	al,Rndx
		mov	[si],al
		inc	si
		mov	al,Rndy
		mov	[si],al
		add	si,3
		mov	al,Rndx
		mov	[si],al
		inc	si
		mov	al,Rndy
		mov	[si],al
		inc	si
		loop	NewStor
		pop	si
		pop	cx
		pop	bx
		pop	ax
		ret

	StorPos endp

;--------------------------------------------------------
;	Veletlen y koordinata eloallitasa		:
;--------------------------------------------------------

	Rndyg	proc	near

		push	cx
		push	dx
		push	ax
		call	ReadDMA
		mov	cl,25
		mov	dh,3fh
		cmp	cl,64
		jae	Stripy
		shr	dh,1
		cmp	cl,32
		jae	Stripy
		shr	dh,1
		cmp	cl,16
		jae	Stripy
		shr	dh,1
		cmp	cl,0
		jae	Stripy
		shr	dh,1
	Stripy:
		and	ah,dh
		div	cl
		mov	al,ah
		mov	Rndy,ah
		pop	cx
		mov	ah,ch
		pop	dx
		pop	cx
		ret

	Rndyg	endp

;--------------------------------------------------------
;	Veletlen x koordinata eloallitasa		:
;--------------------------------------------------------


	Rndxg	proc	near

		push	cx
		push	dx
		push	ax
		call	ReadDMA
		mov	cl,80
		mov	dh,3fh
		cmp	cl,64
		jae	Stripx
		shr	dh,1
		cmp	cl,32
		jae	Stripx
		shr	dh,1
		cmp	cl,16
		jae	Stripx
		shr	dh,1
		cmp	cl,0
		jae	Stripx
		shr	dh,1
	Stripx:
		and	ah,dh
		div	cl
		mov	al,ah
		mov	Rndx,ah
		pop	cx
		mov	ah,ch
		pop	dx
		pop	cx
		ret

	Rndxg	endp

;--------------------------------------------------------
;	Veletlenszam a DMA. 0. csatornajarol.		:
;	Ezen a csatornan keresztul vegzi a gep a memoria:
;	frissiteset. Elso olvasas a magas byte-ot a 2.	:
;	az alacsony byte-ot olvassa.			:
;--------------------------------------------------------

	ReadDMA proc	near

		push	dx
		mov	dx,0
		in	ax,dx
		pop	dx
		ret

	ReadDMA endp

;--------------------------------------------------------
;	Ha celbaert az odaillo akkor megerositi egy	:
;	kiirassal. Ha egy celhoz kozeledo karakter a	:
;	mozgasa soran letorol egy mar celbaert karak-	:
;	tert akkor azt a rutin visszairja, megerositi.	:
;--------------------------------------------------------

	Wrt	proc	near

		push	ax
		push	bx
		push	dx
		push	si
		xor	ax,ax
		xor	bx,bx
		xor	dx,dx
		mov	si,offset Ch1			;kezdete
		mov	al,11				;struc hossz
		mov	bl,CharCount
		mul	bl
		add	si,ax				;struc-on beluli cim
		inc	si
		mov	al,[si]
		cmp	al,77h				;celbaert ?
		jnz	Not_Write
		mov	al,Xap
		mov	Xpos,al
		mov	al,Yap
		mov	Ypos,al
		call	CurPos
		mov	dl,DestChar
		ChrOutP
	Not_Write:
		pop	si
		pop	dx
		pop	bx
		pop	ax
		ret

	Wrt	endp


;--------------------------------------------------------
;	Cel pozicio vizsgalata. A rutin megvizsgalja	:
;	az osszes cel poziciot, egyezik-e vele az ak-	:
;	tualis ?					:
;--------------------------------------------------------

	PosCheck	proc	near

			push	ax
			push	bx
			push	si
			mov	CharCount,0
			mov	al,Xap
			mov	bl,Yap
			mov	cx,31
			mov	si,offset Dp1
		Check_Repeat:
			cmp	al,[si]
			jnz	Continue_Check
			cmp	bl,[si+1]
			jz	Found_Pos
		Continue_Check:
			inc	si			;y -ra
			inc	si			;karakterre
			inc	si			;kovetkezo x -re
			inc	CharCount
			loop	Check_Repeat
			jmp	Go_End
		Found_Pos:
			push	ax
			mov	ax,[si+1]		;a karakter
			mov	DestChar,ah
			pop	ax
			call	Wrt
		Go_End:
			pop	si
			pop	bx
			pop	ax
			ret

	PosCheck	endp

;--------------------------------------------------------
;	CRSR. pozicionalasa				:
;--------------------------------------------------------

	CurPos	proc	near

		push	ax
		push	bx
		push	dx
		mov	dh,ypos
		mov	dl,xpos
		mov	ah,02
		mov	bh,0
		int	10h
		pop	dx
		pop	bx
		pop	ax
		ret

	CurPos	endp

;--------------------------------------------------------
;	1 sec. k�sleltet�s				:
;--------------------------------------------------------

	Delayl	proc	near

		push	ax
		push	bx
		push	cx
		push	dx
		mov	ah,2ch
		int	21h
		xor	bx,bx
		mov	bx,dx
		mov	bl,0
	Time_:
		mov	ah,2ch
		int	21h
		cmp	bh,dh
		jz	Time_

		pop	dx
		pop	cx
		pop	bx
		pop	ax
		ret

	Delayl	endp

;--------------------------------------------------------
;	1/100 sec. k�sleltet�s				:
;--------------------------------------------------------

	Delays	proc	near

		push	ax
		push	bx
		push	cx
		push	dx
		mov	ah,2ch
		int	21h
		xor	bx,bx
		mov	bx,dx
		mov	bh,0
	Time_s:
		mov	ah,2ch
		int	21h
		cmp	bl,dl
		jz	Time_s

		pop	dx
		pop	cx
		pop	bx
		pop	ax
		ret

	Delays	endp

;--------------------------------------------------------
;	Cursor dissable 				:
;--------------------------------------------------------

	NotCur	proc	near

		push	ax
		push	bx
		push	cx
		int	11h				;color gr. kartya meg-
							;letenek ellenorzese
		push	ax
		mov	cl,4				;80 * 25 -os mod vizsg.
		shr	al,cl				;jobbra 4 gyel
		cmp	al,2
		jz	Color_graphich
		pop	ax
							;40 * 25 -os mod vizsg.
		shr	al,cl				;jobbra 4 gyel
		cmp	al,1
		jz	Color_graphich
							;monocrhrome kartya
		mov	cl,0				;Ig
		mov	ch,14				;Tol
		jmp	Continue
	Color_graphich: 				;Color graphich kartya
		pop	ax
		mov	cl,7				;veg
		mov	ch,8				;kezdet
	Continue:
		mov	ah,01				;Funkciokod
		mov	bh,0				;Kepernyolap /videomod/
		int	10h
		pop	cx				;Reg. helyreallitasa
		pop	bx
		pop	ax
		ret

	NotCur	endp

;--------------------------------------------------------
;	Standard Cursor 				:
;--------------------------------------------------------

	Cur	proc	near

		push	ax
		push	bx
		push	cx
		int	11h				;color gr. kartya meg-
							;letenek ellenorzese
		push	ax
		mov	cl,4				;80 * 25 -os mod vizsg.
		shr	al,cl				;jobbra 4 gyel
		cmp	al,2
		jz	Color_graphichE
		pop	ax
							;40 * 25 -os mod vizsg.
		shr	al,cl				;jobbra 4 gyel
		cmp	al,1
		jz	Color_graphichE
							;monocrhrome kartya
		mov	cl,13				;Ig
		mov	ch,12				;Tol
		jmp	ContinueE
	Color_graphichE:				;Color graphich kartya
		pop	ax
		mov	cl,7				;veg
		mov	ch,6				;kezdet
	ContinueE:
		mov	ah,01				;Funkciokod
		mov	bh,0				;Kepernyolap /videomod/
		int	10h
		pop	cx				;Reg. helyreallitasa
		pop	bx
		pop	ax
		ret

	Cur	endp


;--------------------------------------------------------
;	Karakter kiirasa				:
;--------------------------------------------------------

	Modify_Char_Pos  proc	 near

		push	ax
		push	cx
		push	dx
		mov	ModeX,0 			;
		mov	ModeY,0
		cmp	Stat,77h			;a karakter celhozert?
		jz	Go2				;igen, nem kell modo-
							;sitani a koord.
		jmp	Go3
	Go2:
		mov	AuxSt,77h			;seged statusz beall.
		jmp	WriteCEnd			;vegere
	Go3:

;	Torles						:

		mov	al,Xap
		mov	Xpos,al
		mov	al,Yap
		mov	Ypos,al
		call	CurPos				;kurzort az akt. poz.ra
							;teszi
		mov	dl,' '
		ChrOutP 				;Karakter letorlese
		call	PosCheck			;cel poz.-ra irt ?

;	X koordinata modositasi iranyanak beallitasa	:

		cmp	ModeX,0
		jnz	DirectionX_Ok
		mov	al,Xep				;cel es kezdeti pozi-
							;ciok viszonya?
		cmp	al,Xdp
		jb	LowX
		mov	ModeX,'D'                       ;Csokkenteni kell X et
		jmp	Go0
	LowX:
		mov	ModeX,'I'                       ;Novelni kell X et
	Go0:

;	Y koordinata modositasi iranyanak beallitasa	:

	DirectionX_Ok:
		cmp	ModeY,0
		jnz	DirectionY_Ok
		mov	al,Yep				;cel es kezdeti pozi-
							;ciok viszonya?
		cmp	al,Ydp
		jb	LowY
		mov	ModeY,'D'                       ;Csokkenteni kell Y t
		jmp	Go1
	LowY:
		mov	ModeY,'I'                       ;Novelni kell Y t
	Go1:

;	X koord. statuszanak vizsgalata 		:

	DirectionY_Ok:
		cmp	Xstat,39h			;x koord. poz. a cel
							;pozicio ?
		jz	XExitM				;igen

;	Modositasi irany kivalasztasa			:

		cmp	ModeX,'D'                       ;noveles vagy csokken-
							;tes ?
		jnz	IncrementX
		jz	DecrementX

;	Cel pozicion all				:

		cmp	ModeX,0 			;biztonsagi okokbol
		jz	SetExX

;	Kell-e meg nopvelni X-et ?			:

	IncrementX:
		mov	al,Xap
		cmp	al,Xdp				;aktualis poz. a cel
		jb	IncrX				;pozicio?

;	X statuszanak beallitasa			:

	SetExX:
		cmp	Xstat,0 			;statusz be van all ?
		jnz	GoY				;bevan
		mov	Xstat,39h			;nincs, be kell!
		jmp	GoY

;	X koordinata novelese				:

	IncrX:
		inc	Xap				;x poz. novelese
		jmp	GoY

;	Kell-e csokkenteni X-et ?			:

	DecrementX:
		mov	al,Xap				;aktualis poz. a cel
		cmp	al,Xdp				;pozicio ?
		ja	DecrX

;	X statuszanak beallitasa			:

		jmp	SetExX

;	X koordinata csokkentese			:

	DecrX:
		dec	Xap				;x poz. csokkentese

;	Y koordinata statuszanak vizsgalata		:

	XExitM:
	GoY:
		cmp	Ystat,38h
		jz	YExitM

;	Kell-e meg novelni Y-t ?			:

		cmp	ModeY,'D'
		jnz	IncrementY
		jz	DecrementY

;	Cel pozicion all				:

		cmp	ModeY,0
		jz	SetExY

;	Kell-e meg novelni Y-t ?			:

	IncrementY:
		mov	al,Yap
		cmp	al,Ydp
		jb	IncrY

;	Y statuszanak beallitasa			:

	SetExY:
		cmp	Ystat,0
		jnz	GoOut
		mov	Ystat,38h
		jmp	GoOut

;	Y novelese					:

	IncrY:
		inc	Yap				;Noveli
		jmp	GoOut

;	Kell-e csokkenteni Y-t ?			:

	DecrementY:
		mov	al,Yap
		cmp	al,Ydp
		ja	DecrY

;	Y statuszanak beallitasa			:

		jmp	SetExY

;	Y csokkentese					:

	DecrY:
		dec	Yap				;Csokkenti

;	Statuszok vizsgalata				:

	GoOut:
	YExitM:
		cmp	Xstat,39h
		jnz	NoMS
		cmp	Ystat,38h
		jnz	NoMS

;	Statusz modositasa /egy karaktere/		:

		mov	Stat,77h
	NoMS:

;	Megjelenit					:

		mov	al,Xap
		mov	ah,Yap
		mov	Xpos,al
		mov	Ypos,ah
		call	CurPos
		mov	dl,ChrAct
		ChrOutP

;	Megjelenitett karakterszamlalo novelese 	:

		cmp	stat,77h
		jnz	WriteCEnd
		add	Counter,1
	WriteCEnd:
		pop	dx
		pop	cx
		pop	ax
		ret

	Modify_Char_Pos  endp


;--------------------------------------------------------
;	Az osszes megjelenitendo karaktert multiplexolva:
;	mozgato rutin					:
;--------------------------------------------------------

	Maker2nd proc	 near

		push	ax
		xor	ax,ax
		call	ReadDMA 			;DMA. olv.
		cmp	ax,0				;zero ?
		jnz	Not_Store			;ez nem a 0. csat.
		xor	ax,ax
		call	ReadDMA 			;DMA. olv.
		cmp	ax,0				;zero ?
		jz	Not_Store			;ez nem a 0. csat.
		call	StorPos
	Not_Store:

		call	ClS0				;Kepernyotorles
		mov	Stat,0
		call	NotCur

		call	Delays

	RepeatCR	Label	Near

;1

		mov	al,Ch1.Sa			;Seged statusz atadasa
		mov	AuxSt,al
		mov	al,Ch1.Chr			;Karakter atadasa
		mov	ChrAct,al
		mov	al,Ch1.Status			;Statusz atadasa
		mov	Stat,al
		mov	al,Ch1.Xs			;X statusz atadasa
		mov	Xstat,al
		mov	al,Ch1.Ys			;Y statusz atadasa
		mov	Ystat,al
		mov	al,Ch1.Xa			;Aktualis X poz atadasa
		mov	Xap,al
		mov	al,Ch1.Ya			;Aktualis Y poz atadasa
		mov	Yap,al
		mov	al,Ch1.Xd			;Cel X poz atadasa
		mov	Xdp,al
		mov	al,Ch1.Yd			;Cel Y poz atadasa
		mov	Ydp,al
		mov	al,Ch1.Xe			;Elozo X poz atadasa
		mov	Xep,al
		mov	al,Ch1.Ye			;Elozo Y poz atadasa
		mov	Yep,al
		call	Modify_Char_Pos 			 ;Kar. mozgatasa
		cmp	AuxSt,77h
		jz	II
		mov	al,Stat 			;Statusz visszaadasa
		mov	Ch1.Status,al
		mov	al,Xap				;Aktualis X p. vissza
		mov	Ch1.Xa,al
		mov	al,Yap				;Aktualis Y p. vissza
		mov	Ch1.Ya,al
		mov	al,Xstat			;X statusz vissza
		mov	Ch1.Xs,al
		mov	al,Ystat			;Y statusz vissza
		mov	Ch1.Ys,al

;2
	II:
		mov	al,Ch2.Sa
		mov	AuxSt,al
		mov	al,Ch2.Chr
		mov	ChrAct,al
		mov	al,Ch2.Status
		mov	Stat,al
		mov	al,Ch2.Xs
		mov	Xstat,al
		mov	al,Ch2.Ys
		mov	Ystat,al
		mov	al,Ch2.Xa
		mov	Xap,al
		mov	al,Ch2.Ya
		mov	Yap,al
		mov	al,Ch2.Xd
		mov	Xdp,al
		mov	al,Ch2.Yd
		mov	Ydp,al
		mov	al,Ch2.Xe
		mov	Xep,al
		mov	al,Ch2.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	III
		mov	al,Stat
		mov	Ch2.Status,al
		mov	al,Xap
		mov	Ch2.Xa,al
		mov	al,Yap
		mov	Ch2.Ya,al
		mov	al,Xstat
		mov	Ch2.Xs,al
		mov	al,Ystat
		mov	Ch2.Ys,al

;3
	III:
		mov	al,Ch3.Sa
		mov	AuxSt,al
		mov	al,Ch3.Chr
		mov	ChrAct,al
		mov	al,Ch3.Status
		mov	Stat,al
		mov	al,Ch3.Xs
		mov	Xstat,al
		mov	al,Ch3.Ys
		mov	Ystat,al
		mov	al,Ch3.Xa
		mov	Xap,al
		mov	al,Ch3.Ya
		mov	Yap,al
		mov	al,Ch3.Xd
		mov	Xdp,al
		mov	al,Ch3.Yd
		mov	Ydp,al
		mov	al,Ch3.Xe
		mov	Xep,al
		mov	al,Ch3.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	IV
		mov	al,Stat
		mov	Ch3.Status,al
		mov	al,Xap
		mov	Ch3.Xa,al
		mov	al,Yap
		mov	Ch3.Ya,al
		mov	al,Xstat
		mov	Ch3.Xs,al
		mov	al,Ystat
		mov	Ch3.Ys,al

;4
	IV:
		mov	al,Ch4.Sa
		mov	AuxSt,al
		mov	al,Ch4.Chr
		mov	ChrAct,al
		mov	al,Ch4.Status
		mov	Stat,al
		mov	al,Ch4.Xs
		mov	Xstat,al
		mov	al,Ch4.Ys
		mov	Ystat,al
		mov	al,Ch4.Xa
		mov	Xap,al
		mov	al,Ch4.Ya
		mov	Yap,al
		mov	al,Ch4.Xd
		mov	Xdp,al
		mov	al,Ch4.Yd
		mov	Ydp,al
		mov	al,Ch4.Xe
		mov	Xep,al
		mov	al,Ch4.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	V
		mov	al,Stat
		mov	Ch4.Status,al
		mov	al,Xap
		mov	Ch4.Xa,al
		mov	al,Yap
		mov	Ch4.Ya,al
		mov	al,Xstat
		mov	Ch4.Xs,al
		mov	al,Ystat
		mov	Ch4.Ys,al

;5
	V:
		mov	al,Ch5.Sa
		mov	AuxSt,al
		mov	al,Ch5.Chr
		mov	ChrAct,al
		mov	al,Ch5.Status
		mov	Stat,al
		mov	al,Ch5.Xs
		mov	Xstat,al
		mov	al,Ch5.Ys
		mov	Ystat,al
		mov	al,Ch5.Xa
		mov	Xap,al
		mov	al,Ch5.Ya
		mov	Yap,al
		mov	al,Ch5.Xd
		mov	Xdp,al
		mov	al,Ch5.Yd
		mov	Ydp,al
		mov	al,Ch5.Xe
		mov	Xep,al
		mov	al,Ch5.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	VI
		mov	al,Stat
		mov	Ch5.Status,al
		mov	al,Xap
		mov	Ch5.Xa,al
		mov	al,Yap
		mov	Ch5.Ya,al
		mov	al,Xstat
		mov	Ch5.Xs,al
		mov	al,Ystat
		mov	Ch5.Ys,al

;6
	VI:
		mov	al,Ch6.Sa
		mov	AuxSt,al
		mov	al,Ch6.Chr
		mov	ChrAct,al
		mov	al,Ch6.Status
		mov	Stat,al
		mov	al,Ch6.Xs
		mov	Xstat,al
		mov	al,Ch6.Ys
		mov	Ystat,al
		mov	al,Ch6.Xa
		mov	Xap,al
		mov	al,Ch6.Ya
		mov	Yap,al
		mov	al,Ch6.Xd
		mov	Xdp,al
		mov	al,Ch6.Yd
		mov	Ydp,al
		mov	al,Ch6.Xe
		mov	Xep,al
		mov	al,Ch6.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	VII
		mov	al,Stat
		mov	Ch6.Status,al
		mov	al,Xap
		mov	Ch6.Xa,al
		mov	al,Yap
		mov	Ch6.Ya,al
		mov	al,Xstat
		mov	Ch6.Xs,al
		mov	al,Ystat
		mov	Ch6.Ys,al

;7
	VII:
		mov	al,Ch7.Sa
		mov	AuxSt,al
		mov	al,Ch7.Chr
		mov	ChrAct,al
		mov	al,Ch7.Status
		mov	Stat,al
		mov	al,Ch7.Xs
		mov	Xstat,al
		mov	al,Ch7.Ys
		mov	Ystat,al
		mov	al,Ch7.Xa
		mov	Xap,al
		mov	al,Ch7.Ya
		mov	Yap,al
		mov	al,Ch7.Xd
		mov	Xdp,al
		mov	al,Ch7.Yd
		mov	Ydp,al
		mov	al,Ch7.Xe
		mov	Xep,al
		mov	al,Ch7.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	VIII
		mov	al,Stat
		mov	Ch7.Status,al
		mov	al,Xap
		mov	Ch7.Xa,al
		mov	al,Yap
		mov	Ch7.Ya,al
		mov	al,Xstat
		mov	Ch7.Xs,al
		mov	al,Ystat
		mov	Ch7.Ys,al

;8
	VIII:
		mov	al,Ch8.Sa
		mov	AuxSt,al
		mov	al,Ch8.Chr
		mov	ChrAct,al
		mov	al,Ch8.Status
		mov	Stat,al
		mov	al,Ch8.Xs
		mov	Xstat,al
		mov	al,Ch8.Ys
		mov	Ystat,al
		mov	al,Ch8.Xa
		mov	Xap,al
		mov	al,Ch8.Ya
		mov	Yap,al
		mov	al,Ch8.Xd
		mov	Xdp,al
		mov	al,Ch8.Yd
		mov	Ydp,al
		mov	al,Ch8.Xe
		mov	Xep,al
		mov	al,Ch8.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	IX
		mov	al,Stat
		mov	Ch8.Status,al
		mov	al,Xap
		mov	Ch8.Xa,al
		mov	al,Yap
		mov	Ch8.Ya,al
		mov	al,Xstat
		mov	Ch8.Xs,al
		mov	al,Ystat
		mov	Ch8.Ys,al

;9
	IX:
		mov	al,Ch9.Sa
		mov	AuxSt,al
		mov	al,Ch9.Chr
		mov	ChrAct,al
		mov	al,Ch9.Status
		mov	Stat,al
		mov	al,Ch9.Xs
		mov	Xstat,al
		mov	al,Ch9.Ys
		mov	Ystat,al
		mov	al,Ch9.Xa
		mov	Xap,al
		mov	al,Ch9.Ya
		mov	Yap,al
		mov	al,Ch9.Xd
		mov	Xdp,al
		mov	al,Ch9.Yd
		mov	Ydp,al
		mov	al,Ch9.Xe
		mov	Xep,al
		mov	al,Ch9.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	X
		mov	al,Stat
		mov	Ch9.Status,al
		mov	al,Xap
		mov	Ch9.Xa,al
		mov	al,Yap
		mov	Ch9.Ya,al
		mov	al,Xstat
		mov	Ch9.Xs,al
		mov	al,Ystat
		mov	Ch9.Ys,al

;10
	X:
		mov	al,Ch10.Sa
		mov	AuxSt,al
		mov	al,Ch10.Chr
		mov	ChrAct,al
		mov	al,Ch10.Status
		mov	Stat,al
		mov	al,Ch10.Xs
		mov	Xstat,al
		mov	al,Ch10.Ys
		mov	Ystat,al
		mov	al,Ch10.Xa
		mov	Xap,al
		mov	al,Ch10.Ya
		mov	Yap,al
		mov	al,Ch10.Xd
		mov	Xdp,al
		mov	al,Ch10.Yd
		mov	Ydp,al
		mov	al,Ch10.Xe
		mov	Xep,al
		mov	al,Ch10.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XI
		mov	al,Stat
		mov	Ch10.Status,al
		mov	al,Xap
		mov	Ch10.Xa,al
		mov	al,Yap
		mov	Ch10.Ya,al
		mov	al,Xstat
		mov	Ch10.Xs,al
		mov	al,Ystat
		mov	Ch10.Ys,al

;11
	XI:
		mov	al,Ch11.Sa
		mov	AuxSt,al
		mov	al,Ch11.Chr
		mov	ChrAct,al
		mov	al,Ch11.Status
		mov	Stat,al
		mov	al,Ch11.Xs
		mov	Xstat,al
		mov	al,Ch11.Ys
		mov	Ystat,al
		mov	al,Ch11.Xa
		mov	Xap,al
		mov	al,Ch11.Ya
		mov	Yap,al
		mov	al,Ch11.Xd
		mov	Xdp,al
		mov	al,Ch11.Yd
		mov	Ydp,al
		mov	al,Ch11.Xe
		mov	Xep,al
		mov	al,Ch11.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XII
		mov	al,Stat
		mov	Ch11.Status,al
		mov	al,Xap
		mov	Ch11.Xa,al
		mov	al,Yap
		mov	Ch11.Ya,al
		mov	al,Xstat
		mov	Ch11.Xs,al
		mov	al,Ystat
		mov	Ch11.Ys,al

;12
	XII:
		mov	al,Ch12.Sa
		mov	AuxSt,al
		mov	al,Ch12.Chr
		mov	ChrAct,al
		mov	al,Ch12.Status
		mov	Stat,al
		mov	al,Ch12.Xs
		mov	Xstat,al
		mov	al,Ch12.Ys
		mov	Ystat,al
		mov	al,Ch12.Xa
		mov	Xap,al
		mov	al,Ch12.Ya
		mov	Yap,al
		mov	al,Ch12.Xd
		mov	Xdp,al
		mov	al,Ch12.Yd
		mov	Ydp,al
		mov	al,Ch12.Xe
		mov	Xep,al
		mov	al,Ch12.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XIII
		mov	al,Stat
		mov	Ch12.Status,al
		mov	al,Xap
		mov	Ch12.Xa,al
		mov	al,Yap
		mov	Ch12.Ya,al
		mov	al,Xstat
		mov	Ch12.Xs,al
		mov	al,Ystat
		mov	Ch12.Ys,al

;13
	XIII:
		mov	al,Ch13.Sa
		mov	AuxSt,al
		mov	al,Ch13.Chr
		mov	ChrAct,al
		mov	al,Ch13.Status
		mov	Stat,al
		mov	al,Ch13.Xs
		mov	Xstat,al
		mov	al,Ch13.Ys
		mov	Ystat,al
		mov	al,Ch13.Xa
		mov	Xap,al
		mov	al,Ch13.Ya
		mov	Yap,al
		mov	al,Ch13.Xd
		mov	Xdp,al
		mov	al,Ch13.Yd
		mov	Ydp,al
		mov	al,Ch13.Xe
		mov	Xep,al
		mov	al,Ch13.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XIV
		mov	al,Stat
		mov	Ch13.Status,al
		mov	al,Xap
		mov	Ch13.Xa,al
		mov	al,Yap
		mov	Ch13.Ya,al
		mov	al,Xstat
		mov	Ch13.Xs,al
		mov	al,Ystat
		mov	Ch13.Ys,al

;14
	XIV:
		mov	al,Ch14.Sa
		mov	AuxSt,al
		mov	al,Ch14.Chr
		mov	ChrAct,al
		mov	al,Ch14.Status
		mov	Stat,al
		mov	al,Ch14.Xs
		mov	Xstat,al
		mov	al,Ch14.Ys
		mov	Ystat,al
		mov	al,Ch14.Xa
		mov	Xap,al
		mov	al,Ch14.Ya
		mov	Yap,al
		mov	al,Ch14.Xd
		mov	Xdp,al
		mov	al,Ch14.Yd
		mov	Ydp,al
		mov	al,Ch14.Xe
		mov	Xep,al
		mov	al,Ch14.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XV
		mov	al,Stat
		mov	Ch14.Status,al
		mov	al,Xap
		mov	Ch14.Xa,al
		mov	al,Yap
		mov	Ch14.Ya,al
		mov	al,Xstat
		mov	Ch14.Xs,al
		mov	al,Ystat
		mov	Ch14.Ys,al

;15
	XV:
		mov	al,Ch15.Sa
		mov	AuxSt,al
		mov	al,Ch15.Chr
		mov	ChrAct,al
		mov	al,Ch15.Status
		mov	Stat,al
		mov	al,Ch15.Xs
		mov	Xstat,al
		mov	al,Ch15.Ys
		mov	Ystat,al
		mov	al,Ch15.Xa
		mov	Xap,al
		mov	al,Ch15.Ya
		mov	Yap,al
		mov	al,Ch15.Xd
		mov	Xdp,al
		mov	al,Ch15.Yd
		mov	Ydp,al
		mov	al,Ch15.Xe
		mov	Xep,al
		mov	al,Ch15.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XVI
		mov	al,Stat
		mov	Ch15.Status,al
		mov	al,Xap
		mov	Ch15.Xa,al
		mov	al,Yap
		mov	Ch15.Ya,al
		mov	al,Xstat
		mov	Ch15.Xs,al
		mov	al,Ystat
		mov	Ch15.Ys,al

;16
	XVI:
		mov	al,Ch16.Sa
		mov	AuxSt,al
		mov	al,Ch16.Chr
		mov	ChrAct,al
		mov	al,Ch16.Status
		mov	Stat,al
		mov	al,Ch16.Xs
		mov	Xstat,al
		mov	al,Ch16.Ys
		mov	Ystat,al
		mov	al,Ch16.Xa
		mov	Xap,al
		mov	al,Ch16.Ya
		mov	Yap,al
		mov	al,Ch16.Xd
		mov	Xdp,al
		mov	al,Ch16.Yd
		mov	Ydp,al
		mov	al,Ch16.Xe
		mov	Xep,al
		mov	al,Ch16.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XVII
		mov	al,Stat
		mov	Ch16.Status,al
		mov	al,Xap
		mov	Ch16.Xa,al
		mov	al,Yap
		mov	Ch16.Ya,al
		mov	al,Xstat
		mov	Ch16.Xs,al
		mov	al,Ystat
		mov	Ch16.Ys,al

;17
	XVII:
		mov	al,Ch17.Sa
		mov	AuxSt,al
		mov	al,Ch17.Chr
		mov	ChrAct,al
		mov	al,Ch17.Status
		mov	Stat,al
		mov	al,Ch17.Xs
		mov	Xstat,al
		mov	al,Ch17.Ys
		mov	Ystat,al
		mov	al,Ch17.Xa
		mov	Xap,al
		mov	al,Ch17.Ya
		mov	Yap,al
		mov	al,Ch17.Xd
		mov	Xdp,al
		mov	al,Ch17.Yd
		mov	Ydp,al
		mov	al,Ch17.Xe
		mov	Xep,al
		mov	al,Ch17.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XVIII
		mov	al,Stat
		mov	Ch17.Status,al
		mov	al,Xap
		mov	Ch17.Xa,al
		mov	al,Yap
		mov	Ch17.Ya,al
		mov	al,Xstat
		mov	Ch17.Xs,al
		mov	al,Ystat
		mov	Ch17.Ys,al

;18
	XVIII:
		mov	al,Ch18.Sa
		mov	AuxSt,al
		mov	al,Ch18.Chr
		mov	ChrAct,al
		mov	al,Ch18.Status
		mov	Stat,al
		mov	al,Ch18.Xs
		mov	Xstat,al
		mov	al,Ch18.Ys
		mov	Ystat,al
		mov	al,Ch18.Xa
		mov	Xap,al
		mov	al,Ch18.Ya
		mov	Yap,al
		mov	al,Ch18.Xd
		mov	Xdp,al
		mov	al,Ch18.Yd
		mov	Ydp,al
		mov	al,Ch18.Xe
		mov	Xep,al
		mov	al,Ch18.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XIX
		mov	al,Stat
		mov	Ch18.Status,al
		mov	al,Xap
		mov	Ch18.Xa,al
		mov	al,Yap
		mov	Ch18.Ya,al
		mov	al,Xstat
		mov	Ch18.Xs,al
		mov	al,Ystat
		mov	Ch18.Ys,al

;19
	XIX:
		mov	al,Ch19.Sa
		mov	AuxSt,al
		mov	al,Ch19.Chr
		mov	ChrAct,al
		mov	al,Ch19.Status
		mov	Stat,al
		mov	al,Ch19.Xs
		mov	Xstat,al
		mov	al,Ch19.Ys
		mov	Ystat,al
		mov	al,Ch19.Xa
		mov	Xap,al
		mov	al,Ch19.Ya
		mov	Yap,al
		mov	al,Ch19.Xd
		mov	Xdp,al
		mov	al,Ch19.Yd
		mov	Ydp,al
		mov	al,Ch19.Xe
		mov	Xep,al
		mov	al,Ch19.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XX
		mov	al,Stat
		mov	Ch19.Status,al
		mov	al,Xap
		mov	Ch19.Xa,al
		mov	al,Yap
		mov	Ch19.Ya,al
		mov	al,Xstat
		mov	Ch19.Xs,al
		mov	al,Ystat
		mov	Ch19.Ys,al

;20
	XX:
		mov	al,Ch20.Sa
		mov	AuxSt,al
		mov	al,Ch20.Chr
		mov	ChrAct,al
		mov	al,Ch20.Status
		mov	Stat,al
		mov	al,Ch20.Xs
		mov	Xstat,al
		mov	al,Ch20.Ys
		mov	Ystat,al
		mov	al,Ch20.Xa
		mov	Xap,al
		mov	al,Ch20.Ya
		mov	Yap,al
		mov	al,Ch20.Xd
		mov	Xdp,al
		mov	al,Ch20.Yd
		mov	Ydp,al
		mov	al,Ch20.Xe
		mov	Xep,al
		mov	al,Ch20.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XXI
		mov	al,Stat
		mov	Ch20.Status,al
		mov	al,Xap
		mov	Ch20.Xa,al
		mov	al,Yap
		mov	Ch20.Ya,al
		mov	al,Xstat
		mov	Ch20.Xs,al
		mov	al,Ystat
		mov	Ch20.Ys,al

;21
	XXI:
		mov	al,Ch21.Sa
		mov	AuxSt,al
		mov	al,Ch21.Chr
		mov	ChrAct,al
		mov	al,Ch21.Status
		mov	Stat,al
		mov	al,Ch21.Xs
		mov	Xstat,al
		mov	al,Ch21.Ys
		mov	Ystat,al
		mov	al,Ch21.Xa
		mov	Xap,al
		mov	al,Ch21.Ya
		mov	Yap,al
		mov	al,Ch21.Xd
		mov	Xdp,al
		mov	al,Ch21.Yd
		mov	Ydp,al
		mov	al,Ch21.Xe
		mov	Xep,al
		mov	al,Ch21.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XXII
		mov	al,Stat
		mov	Ch21.Status,al
		mov	al,Xap
		mov	Ch21.Xa,al
		mov	al,Yap
		mov	Ch21.Ya,al
		mov	al,Xstat
		mov	Ch21.Xs,al
		mov	al,Ystat
		mov	Ch21.Ys,al

;22
	XXII:
		mov	al,Ch22.Sa
		mov	AuxSt,al
		mov	al,Ch22.Chr
		mov	ChrAct,al
		mov	al,Ch22.Status
		mov	Stat,al
		mov	al,Ch22.Xs
		mov	Xstat,al
		mov	al,Ch22.Ys
		mov	Ystat,al
		mov	al,Ch22.Xa
		mov	Xap,al
		mov	al,Ch22.Ya
		mov	Yap,al
		mov	al,Ch22.Xd
		mov	Xdp,al
		mov	al,Ch22.Yd
		mov	Ydp,al
		mov	al,Ch22.Xe
		mov	Xep,al
		mov	al,Ch22.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XXIII
		mov	al,Stat
		mov	Ch22.Status,al
		mov	al,Xap
		mov	Ch22.Xa,al
		mov	al,Yap
		mov	Ch22.Ya,al
		mov	al,Xstat
		mov	Ch22.Xs,al
		mov	al,Ystat
		mov	Ch22.Ys,al

;23
	XXIII:
		mov	al,Ch23.Sa
		mov	AuxSt,al
		mov	al,Ch23.Chr
		mov	ChrAct,al
		mov	al,Ch23.Status
		mov	Stat,al
		mov	al,Ch23.Xs
		mov	Xstat,al
		mov	al,Ch23.Ys
		mov	Ystat,al
		mov	al,Ch23.Xa
		mov	Xap,al
		mov	al,Ch23.Ya
		mov	Yap,al
		mov	al,Ch23.Xd
		mov	Xdp,al
		mov	al,Ch23.Yd
		mov	Ydp,al
		mov	al,Ch23.Xe
		mov	Xep,al
		mov	al,Ch23.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XXIV
		mov	al,Stat
		mov	Ch23.Status,al
		mov	al,Xap
		mov	Ch23.Xa,al
		mov	al,Yap
		mov	Ch23.Ya,al
		mov	al,Xstat
		mov	Ch23.Xs,al
		mov	al,Ystat
		mov	Ch23.Ys,al

;24
	XXIV:
		mov	al,Ch24.Sa
		mov	AuxSt,al
		mov	al,Ch24.Chr
		mov	ChrAct,al
		mov	al,Ch24.Status
		mov	Stat,al
		mov	al,Ch24.Xs
		mov	Xstat,al
		mov	al,Ch24.Ys
		mov	Ystat,al
		mov	al,Ch24.Xa
		mov	Xap,al
		mov	al,Ch24.Ya
		mov	Yap,al
		mov	al,Ch24.Xd
		mov	Xdp,al
		mov	al,Ch24.Yd
		mov	Ydp,al
		mov	al,Ch24.Xe
		mov	Xep,al
		mov	al,Ch24.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XXV
		mov	al,Stat
		mov	Ch24.Status,al
		mov	al,Xap
		mov	Ch24.Xa,al
		mov	al,Yap
		mov	Ch24.Ya,al
		mov	al,Xstat
		mov	Ch24.Xs,al
		mov	al,Ystat
		mov	Ch24.Ys,al

;25
	XXV:
		mov	al,Ch25.Sa
		mov	AuxSt,al
		mov	al,Ch25.Chr
		mov	ChrAct,al
		mov	al,Ch25.Status
		mov	Stat,al
		mov	al,Ch25.Xs
		mov	Xstat,al
		mov	al,Ch25.Ys
		mov	Ystat,al
		mov	al,Ch25.Xa
		mov	Xap,al
		mov	al,Ch25.Ya
		mov	Yap,al
		mov	al,Ch25.Xd
		mov	Xdp,al
		mov	al,Ch25.Yd
		mov	Ydp,al
		mov	al,Ch25.Xe
		mov	Xep,al
		mov	al,Ch25.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XXVI
		mov	al,Stat
		mov	Ch25.Status,al
		mov	al,Xap
		mov	Ch25.Xa,al
		mov	al,Yap
		mov	Ch25.Ya,al
		mov	al,Xstat
		mov	Ch25.Xs,al
		mov	al,Ystat
		mov	Ch25.Ys,al

;26
	XXVI:
		mov	al,Ch26.Sa
		mov	AuxSt,al
		mov	al,Ch26.Chr
		mov	ChrAct,al
		mov	al,Ch26.Status
		mov	Stat,al
		mov	al,Ch26.Xs
		mov	Xstat,al
		mov	al,Ch26.Ys
		mov	Ystat,al
		mov	al,Ch26.Xa
		mov	Xap,al
		mov	al,Ch26.Ya
		mov	Yap,al
		mov	al,Ch26.Xd
		mov	Xdp,al
		mov	al,Ch26.Yd
		mov	Ydp,al
		mov	al,Ch26.Xe
		mov	Xep,al
		mov	al,Ch26.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XXVII
		mov	al,Stat
		mov	Ch26.Status,al
		mov	al,Xap
		mov	Ch26.Xa,al
		mov	al,Yap
		mov	Ch26.Ya,al
		mov	al,Xstat
		mov	Ch26.Xs,al
		mov	al,Ystat
		mov	Ch26.Ys,al

;27
	XXVII:
		mov	al,Ch27.Sa
		mov	AuxSt,al
		mov	al,Ch27.Chr
		mov	ChrAct,al
		mov	al,Ch27.Status
		mov	Stat,al
		mov	al,Ch27.Xs
		mov	Xstat,al
		mov	al,Ch27.Ys
		mov	Ystat,al
		mov	al,Ch27.Xa
		mov	Xap,al
		mov	al,Ch27.Ya
		mov	Yap,al
		mov	al,Ch27.Xd
		mov	Xdp,al
		mov	al,Ch27.Yd
		mov	Ydp,al
		mov	al,Ch27.Xe
		mov	Xep,al
		mov	al,Ch27.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XXVIII
		mov	al,Stat
		mov	Ch27.Status,al
		mov	al,Xap
		mov	Ch27.Xa,al
		mov	al,Yap
		mov	Ch27.Ya,al
		mov	al,Xstat
		mov	Ch27.Xs,al
		mov	al,Ystat
		mov	Ch27.Ys,al

;28
	XXVIII:
		mov	al,Ch28.Sa
		mov	AuxSt,al
		mov	al,Ch28.Chr
		mov	ChrAct,al
		mov	al,Ch28.Status
		mov	Stat,al
		mov	al,Ch28.Xs
		mov	Xstat,al
		mov	al,Ch28.Ys
		mov	Ystat,al
		mov	al,Ch28.Xa
		mov	Xap,al
		mov	al,Ch28.Ya
		mov	Yap,al
		mov	al,Ch28.Xd
		mov	Xdp,al
		mov	al,Ch28.Yd
		mov	Ydp,al
		mov	al,Ch28.Xe
		mov	Xep,al
		mov	al,Ch28.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XXIX
		mov	al,Stat
		mov	Ch28.Status,al
		mov	al,Xap
		mov	Ch28.Xa,al
		mov	al,Yap
		mov	Ch28.Ya,al
		mov	al,Xstat
		mov	Ch28.Xs,al
		mov	al,Ystat
		mov	Ch28.Ys,al

;29
	XXIX:
		mov	al,Ch29.Sa
		mov	AuxSt,al
		mov	al,Ch29.Chr
		mov	ChrAct,al
		mov	al,Ch29.Status
		mov	Stat,al
		mov	al,Ch29.Xs
		mov	Xstat,al
		mov	al,Ch29.Ys
		mov	Ystat,al
		mov	al,Ch29.Xa
		mov	Xap,al
		mov	al,Ch29.Ya
		mov	Yap,al
		mov	al,Ch29.Xd
		mov	Xdp,al
		mov	al,Ch29.Yd
		mov	Ydp,al
		mov	al,Ch29.Xe
		mov	Xep,al
		mov	al,Ch29.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XXX
		mov	al,Stat
		mov	Ch29.Status,al
		mov	al,Xap
		mov	Ch29.Xa,al
		mov	al,Yap
		mov	Ch29.Ya,al
		mov	al,Xstat
		mov	Ch29.Xs,al
		mov	al,Ystat
		mov	Ch29.Ys,al

;30
	XXX:
		mov	al,Ch31.Sa
		mov	AuxSt,al
		mov	al,Ch30.Chr
		mov	ChrAct,al
		mov	al,Ch30.Status
		mov	Stat,al
		mov	al,Ch30.Xs
		mov	Xstat,al
		mov	al,Ch30.Ys
		mov	Ystat,al
		mov	al,Ch30.Xa
		mov	Xap,al
		mov	al,Ch30.Ya
		mov	Yap,al
		mov	al,Ch30.Xd
		mov	Xdp,al
		mov	al,Ch30.Yd
		mov	Ydp,al
		mov	al,Ch30.Xe
		mov	Xep,al
		mov	al,Ch30.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	XXXI
		mov	al,Stat
		mov	Ch30.Status,al
		mov	al,Xap
		mov	Ch30.Xa,al
		mov	al,Yap
		mov	Ch30.Ya,al
		mov	al,Xstat
		mov	Ch30.Xs,al
		mov	al,Ystat
		mov	Ch30.Ys,al

;31
	XXXI:
		mov	al,Ch31.Sa
		mov	AuxSt,al
		mov	al,Ch31.Chr
		mov	ChrAct,al
		mov	al,Ch31.Status
		mov	Stat,al
		mov	al,Ch31.Xs
		mov	Xstat,al
		mov	al,Ch31.Ys
		mov	Ystat,al
		mov	al,Ch31.Xa
		mov	Xap,al
		mov	al,Ch31.Ya
		mov	Yap,al
		mov	al,Ch31.Xd
		mov	Xdp,al
		mov	al,Ch31.Yd
		mov	Ydp,al
		mov	al,Ch31.Xe
		mov	Xep,al
		mov	al,Ch31.Ye
		mov	Yep,al
		call	Modify_Char_Pos
		cmp	AuxSt,77h
		jz	CheckCounter
		mov	al,Stat
		mov	Ch31.Status,al
		mov	al,Xstat
		mov	Ch31.Xs,al
		mov	al,Ystat
		mov	Ch31.Ys,al
		mov	al,Xap
		mov	Ch31.Xa,al
		mov	al,Yap
		mov	Ch31.Ya,al
	CheckCounter:
		cmp	Counter,31			;Utolso karakter volt ?
		jae	GoExit				;Utolso
		jb	LongJump			;Nem
	GoExit:
		call	Delayl
		call	Cur				;Kurzor bekapcsolasa
		CALL	Sound				;Dallam
		pop	ax
		ret
	LongJump:
		jmp	RepeatCR

	Maker2nd endp

;--------------------------------------------------------
;	Kepernyo osszecsukasa				:
;--------------------------------------------------------

	Cls0	proc	near

		push	cx
		push	di
		push	si
		mov	si,0			;Hatarertekek
		mov	di,24
		mov	cx,13			;Sorok max szama/2
	New_Row:
		push	cx
		mov	cx,si
		call	Clear_Row		;Balrol
		mov	cx,di
		call	Clear_Row		;Jobbrol
		inc	si
		dec	di
		pop	cx
		loop	New_Row
		pop	si
		pop	di
		pop	cx
		ret

	Cls0	endp

;--------------------------------------------------------
;	Egy oszlop torlese				:
;	Input: CX= oszlop pozicioja			:
;--------------------------------------------------------

	Clear_Row	proc	near

			push	si
			push	ax
			mov	si,0			;Kezdo oszlop poz.
			mov	Ypos,cl 		;Sor
		New_Col:
			mov	ax,si
			mov	Xpos,al 		;Oszlop
			call	CurPos
			mov	dl,' '
			ChrOutP
			inc	si
			cmp	si,79
			jna	New_Col 		;<=
			pop	ax
			pop	si
			ret

	Clear_Row	endp


CODE	ENDS

	END	START
