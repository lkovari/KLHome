PAGE 60,132

COMMENT *
	Written by L·szlÛ Kıv·ri  1987.05.30.
		      Last update  1988.04.17.

	A program a valos idos orat olvassa es beallitja a rendszer
	valos idejet. Lehetoseget ad az ido beallitasara is.
	A program eloszor a valos idos ora megletet ellenorzi. Ha
	letezik akkor beolvassa a valos datumot es idot. Ha ez meg
	tortent konvertalja hexadecimalis formara, majd eszerint
	beallitja a DOS rendszer datumot es idot.
	Ezek utan olvassa a DOS rendszer datumot es idot es megje-
	leniti a kepernyon es lehetoseget ad a datum es ido esetleges
	korrigalasara. Ha volt valos idos ora akkor a korrigalast
	ott is elvegzi.

	Hatrany:
		A program nem tokeletes! Tokeletes akkor
		lenne ha a konverzioknal az AAD DAA utasita-
		sokat hasznalnam. Erre at kell irni!
	*

;
;
;	Extern section.
;
;


;
;
;	Public section.
;
;


;
;
;	Constans section.
;
;
	interrupt	equ	21h			;DOS. funkcio hivas
	video		equ	10h			;VIDEO szolgaltatasok
	kettospont	equ	58			;':'
	pont		equ	46			;'.'

;
;
;	Macro section.
;
;
	strout	macro					;Szoveg kepernyore

		push	ax
		mov	ah,9
		int	interrupt
		pop	ax

		endm

	chrout	macro					;Karakter kepernyore

		push	ax
		mov	ah,2
		int	interrupt
		pop	ax

		endm

	chroutp macro					;Karakter kepernyore
							;pozicionalva
		push	ax
		push	bx
		push	cx
		mov	bh,0
		mov	al,dl
		mov	ah,10
		mov	cx,01
		int	video
		pop	cx
		pop	bx
		pop	ax

		endm

;
;	Data section.
;
;
;
DATA	SEGMENT PARA	PUBLIC	'DATA'

	ev		dw	0
	ho		db	0
	napn		db	0
	naps		db	0
	ora		db	0
	perc		db	0
	masodp		db	0
	smasodp 	db	0
	realev		dw	0			;Valos idos ora valt.
	realho		db	0
	realnapn	db	0
	realnaps	db	0
	realora 	db	0
	realperc	db	0
	realmperc	db	0
	realsmperc	db	0
	posy		db	0			;CRSR. poziciok
	posx		db	0
	transit 	db	0			;Atmeneti tarolo
	errcode 	db	0			;Hibakod jelzo
	exit		db	0			;Kilepes jelzo
	found		db	0			;Real t. clock jelzo
	space		db	'00','$'
	text0		db	'VAL¢S DèTUM êS IDô',13,10,'$'
	text1		db	'D†tum    : ','$'
	text2		db	'Idî      : ','$'
	text3		db	'Uj d†tum : ','$'
	text4		db	'Uj idî   : ','$'
	text5		db	'Copyright (C) 1987 by L·szlÛ Kıv·ri #3747321033$'
	errms		db	'Rossz !','$'
	clrscr		db	' ',13,10,'$'
	clrdt		db	'                 ','$'
	clrtm		db	'            ','$'
	sunday		db	'Vas†rnap','$'          ;A het napjai
	monday		db	'HÇtfî','$'
	tuesday 	db	'Kedd','$'
	wednesday	db	'Szerda','$'
	thursday	db	'CsÅtîrtîk','$'
	friday		db	'PÇntek','$'
	saturday	db	'Szombat','$'
	trn		dw	0		;Cimtarolo

DATA	ENDS
;
;
;	Stack section.
;
;
STACK	SEGMENT PARA	STACK	'STACK'

	DW	0100H	DUP	(?)			;Stack's size 256 bytes

STACK	ENDS
;
;
;	Code section.
;
;
CODE	SEGMENT PARA	PUBLIC	'CODE'

START	PROC	FAR

	ASSUME	CS:CODE,DS:DATA,SS:STACK,ES:NOTHING

		PUSH	DS
		XOR	AX,AX				;Init for return
		PUSH	AX

		MOV	AX,DATA 			;Init DS register
		MOV	DS,AX
;
;
;	Main program.
;
;
		call	cls				;Kepernyo torlese
		call	scmask				;Kepernyomaszk
		mov	found,0
		call	rtcheck 			;Ora megletenek ell.
		cmp	found,77h
		jnz	isnot1				;Nincs rt. clock
		call	getdt				;Valos D. T. olvasasa
		call	conv				;Konvertalas
		call	setdosdt			;Datum es ido allitasa
	isnot1:
		call	readdt				;Datum es ido olvasasa
							;es kiirasa
		call	writedt 			;Datum es ido allitasa
		cmp	found,77h
		jnz	isnot2
		call	reconv				;Visszakonvertal
		call	putdt				;Valos D. T. allitasa
	isnot2:
		call	cls				;Kepernyo torlese
;
;
;	Exit to the caller process.
;
;
		RET

START	ENDP

;
;
;	Procedures.
;
;

;------------------------------------------------
;	Clear screen				:
;------------------------------------------------

	Cls	proc	near

		push	ax
		push	bx
		mov	ah,0fh
		int	10h
		mov	ah,00
		mov	bh,0
		int	10h
		pop	bx
		pop	ax
		ret

	Cls	endp

;--------------------------------------------------------
;	A datum IN. mezo torlese.			:
;--------------------------------------------------------

	dtclear proc	near

		mov	posy,11 			;Kezdo poziciok
		mov	posx,21
		call	curpos
		mov	dx,offset clrdt 		;Torlo string
		strout
		ret

	dtclear endp

;--------------------------------------------------------
;	Az ido IN. mezo torlese.			:
;--------------------------------------------------------

	tmclear proc	near

		mov	posy,13 			;Kezdo poziciok
		mov	posx,21
		call	curpos
		mov	dx,offset clrtm 		;Torlo string
		strout
		ret

	tmclear endp

;--------------------------------------------------------
;	Kurzor pozicionalasa.				:
;--------------------------------------------------------

	curpos	proc	near

		push	ax
		push	bx
		push	dx
		mov	dh,posy 			;Poziciok atadasa
		mov	dl,posx
		mov	ah,02h
		mov	bh,0
		int	video
		pop	dx
		pop	bx
		pop	cx
		ret

	curpos	endp

;--------------------------------------------------------
;	Kepernyomaszk elkeszitese.			:
;--------------------------------------------------------

      scmask	proc	near

		mov	posy,4
		mov	posx,6
		call	curpos
		mov	dx,offset text0 		;Keszito
		strout
		mov	posy,7
		mov	posx,9
		call	curpos
		mov	dx,offset text1 		;Datum
		strout
		mov	posy,9
		mov	posx,9
		call	curpos
		mov	dx,offset text2 		;Ido
		strout
		mov	posy,11
		mov	posx,9
		call	curpos
		mov	dx,offset text3 		;Uj datum
		strout
		mov	posy,13
		mov	posx,9
		call	curpos
		mov	dx,offset text4 		;Uj ido
		strout
		mov	posy,17
		mov	posx,9
		call	curpos
		mov	dx,offset text5 		;Copyright
		strout
		ret

      scmask	endp

;--------------------------------------------------------
;	Kesleltetes, hibauzenet kiirasa utan.		:
;--------------------------------------------------------

	delay	proc	near

		push	cx
		mov	cx,65534
	one:
		nop
		loop	One
		nop
	two:
		nop
		inc	cx
		cmp	cx,65534
		jbe	two				;Ha <= cx
		pop	cx
		ret

	delay	endp

;--------------------------------------------------------
;	Konvertal hexa.-ba.				:
;		di     - szamrendszer			:
;		bx     - konvertalando hossz		:
;		ax,dx, - konverzio vegeredmenye 	:
;		cx     - munkaregiszter 		:
;--------------------------------------------------------

	decto	proc	near

		push	bx
		push	cx
		mov	ax,0
		mov	ch,0
		mov	exit,ch 			;Kilepes jelzo
	repeath:
		call	readkbd 			;Olvas bill-rol
		mul	di				;* a szam.rsz.-rel
		add	ax,cx
		adc	dx,0				;Atvitel hozzaadasa
		cmp	bx,0
		jnz	repeath 			;Ismet
		pop	cx
		pop	bx
		ret

	decto	endp

;--------------------------------------------------------
;	Olvas a billentyuzetrol cx be.			:
;--------------------------------------------------------

	readkbd proc	near

		push	dx
		push	ax
		mov	ah,07				;Funkciokod
	wrong:
		int	interrupt
		mov	transit,al			;Beolvasott ertek at-
							;meneti tarolasa a ke-
							;sobbi kiirashoz
		mov	cl,al
		cmp	cl,13
		jz	rquit
		mov	ch,0
		cmp	cl,30h				;Kisebb 0 nal ?
		jl	wrong				;Kisebb - hiba
		sub	cl,30h
		cmp	cl,9				;Nagyobb 9 nel ?
		jle	decimalr			;Nem
		sub	cl,7
	decimalr:
		cmp	cx,di				;Nagyobb a szamrebdszer
							;ertekenel ?
		jge	wrong				;Nagyobb hiba
		mov	ah,02				;Megjelenites kepernyon
		mov	dl,transit
		int	interrupt
		dec	bx
		jmp	goto_
	rquit:
		mov	bx,0
		mov	exit,77h			;Kilepesi kod beallitasa
	goto_:
		pop	ax
		pop	dx
		ret

	readkbd endp

;--------------------------------------------------------
;	Konverzio dec.-ba.				:
;		ax,dx - konvertalando ertek		:
;		di    - szamrendszer alapszama		:
;--------------------------------------------------------

	hexto	proc	near

	repeatd:
		clc					;Atvitel torlese
		div	di
		cmp	ax,65534
		jae	dquit
		call	writecon			;Kiiras kepernyore
		dec	posx				;Kiiras poz. csokkentese
		mov	dx,0
		cmp	ax,0
		jz	dquit
		jmp	repeatd
		call	writecon			;Legnagyobb helyiertek
							;kiirasa kepernyore
		inc	posx
	dquit:
		ret

	hexto	endp

;--------------------------------------------------------
;	Kiiras kepernyore IN. adat dx ben.		:
;--------------------------------------------------------

	writecon	proc	near

			push	ax
			push	bx
			cmp	dx,9			;Kisebb 9 nel ?
			jle	decimalw		;Kisebb
			add	dx,7
		decimalw:
			cmp	dx,di			;Alapszamnal nagyobb ?
			jge	wquit			;Nagyobb hiba
			add	dx,30h
			call	curpos
			chroutp 			;Megjelenites
		wquit:
			pop	bx
			pop	ax
			ret

	writecon	endp

;----------------------------------------------------------------
;	A datum es ido beolvaso rutin /System date & time/.	:
;----------------------------------------------------------------

	readdt	proc	near

		push	di
		push	ax
		push	cx
		push	dx
		mov	posy,7
		mov	posx,25
		call	curpos

;--------------------------------------------------------
;		Datum beolvasasa.			:
;--------------------------------------------------------

		mov	ah,2ah
		mov	cx,0
		mov	dx,0
		int	interrupt
		mov	ev,0
		mov	ho,0
		mov	napn,0
		mov	naps,0
		mov	ev,cx
		mov	ho,dh
		mov	napn,dl
		mov	naps,al

;--------------------------------------------------------
;		Ev feldolgozasa.			:
;--------------------------------------------------------

		mov	dl,pont
		chroutp
		dec	posx
		mov	dx,0
		mov	ax,ev
		mov	di,10
		call	hexto

;--------------------------------------------------------
;		Honap feldolgozasa.			:
;--------------------------------------------------------

		mov	posy,7
		mov	posx,28
		call	curpos
		mov	dl,pont
		chroutp
		dec	posx
		mov	dx,0
		mov	ah,0
		mov	al,ho
		mov	di,10
		call	hexto

;--------------------------------------------------------
;		Nap feldolgozasa.			:
;--------------------------------------------------------

		mov	posy,7
		mov	posx,31
		call	curpos
		mov	dl,pont
		chroutp
		dec	posx
		mov	dx,0
		mov	ah,0
		mov	al,napn
		mov	di,10
		call	hexto
		inc	posx

;--------------------------------------------------------
;		Het napjainak feldolgozasa.		:
;--------------------------------------------------------

		mov	posy,7
		mov	posx,34
		call	curpos
		mov	al,naps
		cmp	al,0
		jnz	cont0
		mov	dx,offset sunday
		strout
	cont0:
		cmp	al,1
		jnz	cont1
		mov	dx,offset monday
		strout
	cont1:
		cmp	al,2
		jnz	cont2
		mov	dx,offset tuesday
		strout
	cont2:
		cmp	al,3
		jnz	cont3
		mov	dx,offset wednesday
		strout
	cont3:
		cmp	al,4
		jnz	cont4
		mov	dx,offset thursday
		strout
	cont4:
		cmp	al,5
		jnz	cont5
		mov	dx,offset friday
		strout
	cont5:
		cmp	al,6
		jnz	cont6
		mov	dx,offset saturday
		strout
	cont6:

;--------------------------------------------------------
;	       Ido beolvasasa.				:
;--------------------------------------------------------

		mov	ah,2ch
		mov	dx,0
		mov	cx,dx
		int	interrupt
		mov	ora,0
		mov	perc,0
		mov	masodp,0
		mov	smasodp,0
		mov	ora,ch
		mov	perc,cl
		mov	masodp,dh
		mov	smasodp,dl

;--------------------------------------------------------
;		Ora feldolgoxasa.			:
;--------------------------------------------------------

		mov	posy,9
		mov	posx,23
		call	curpos
		mov	dl,kettospont
		chroutp
		dec	posx
		mov	dx,0
		mov	ah,0
		mov	al,ora
		mov	di,10
		call	hexto

;--------------------------------------------------------
;		Perc feldolgozasa.			:
;--------------------------------------------------------

		mov	posy,9
		mov	posx,26
		call	curpos
		mov	dl,kettospont
		chroutp
		dec	posx
		mov	dx,0
		mov	ah,0
		mov	al,perc
		mov	di,10
		call	hexto

;--------------------------------------------------------
;		Masodperc feldolgozasa. 		:
;--------------------------------------------------------

		mov	posy,9
		mov	posx,29
		call	curpos
		mov	dl,pont
		chroutp
		dec	posx
		mov	dx,0
		mov	ah,0
		mov	al,masodp
		mov	di,10
		call	hexto

;--------------------------------------------------------
;		Szazadmasodperc feldolgozasa.		:
;--------------------------------------------------------

		mov	posy,9
		mov	posx,31
		call	curpos
		mov	dx,0
		mov	ah,0
		mov	al,smasodp
		mov	di,10
		call	hexto
		pop	dx
		pop	cx
		pop	ax
		pop	di
		ret

	readdt	endp

;--------------------------------------------------------
;	A datum es ido beolvaso rutin /keyboard/.	:
;--------------------------------------------------------

	writedt proc	near

		push	di
		push	ax
		push	bx
		push	cx
		push	dx

;--------------------------------------------------------
;	       Datum feldolgozasa.			:
;--------------------------------------------------------

	wrongd:
		call	dtclear
		mov	posy,11
		mov	posx,21
		call	curpos

;--------------------------------------------------------
;		Ev bekerese.				:
;--------------------------------------------------------

		mov	di,10
		mov	bx,4
		mov	ev,0
		call	decto
		cmp	exit,77h
		jz	halfd
		mov	ev,ax
		mov	dl,pont
		chrout

;--------------------------------------------------------
;		Honap bekerese. 			:
;--------------------------------------------------------

		jmp	goto2
	halfd:
		jmp	exitsetd
	goto2:
		mov	di,10
		mov	bx,2
		mov	ho,0
		call	decto
		mov	ho,al
		mov	dl,pont
		chrout

;--------------------------------------------------------
;		Nap bekerese.				:
;--------------------------------------------------------

		mov	di,10
		mov	bx,2
		mov	napn,0
		call	decto
		mov	napn,al
		mov	dl,pont
		chrout

;--------------------------------------------------------
;		Datum beallitasa.			:
;--------------------------------------------------------

		mov	ah,2bh
		mov	cx,ev
		mov	realev,cx
		mov	dh,ho
		mov	realho,dh
		mov	dl,napn
		mov	realnapn,dl
		mov	al,0
		int	interrupt
		cmp	al,0
		jz	noerrd
		mov	posy,12
		mov	posx,36
		call	curpos
		mov	dx,offset errms
		strout
		call	delay
		mov	posy,12
		mov	posx,36
		call	curpos
		mov	dx,offset clrdt
		strout
		jmp	wrongd
	noerrd:

;--------------------------------------------------------
;		Ido feldolgozasa.			:
;--------------------------------------------------------

	exitsetd:
	wrongt:
		mov	errcode,0
		call	tmclear
		mov	posy,13
		mov	posx,21
		call	curpos

;--------------------------------------------------------
;		Ora bekerese.				:
;--------------------------------------------------------

		mov	di,10
		mov	bx,2
		mov	ora,0
		call	decto
		cmp	exit,77h
		jz	halft
		mov	ora,al
		cmp	al,24
		jl	go0
		mov	errcode,77h
		jmp	error
	go0:
		jmp	goto1
	halft:
		jmp	exitsett
	goto1:
		mov	dl,kettospont
		chrout

;--------------------------------------------------------
;		Perc bekerese.				:
;--------------------------------------------------------

		mov	di,10
		mov	bx,2
		mov	perc,0
		call	decto
		mov	perc,al
		cmp	perc,60
		jl	go1
		mov	errcode,77h
		jmp	error
	go1:
		mov	dl,kettospont
		chrout

;--------------------------------------------------------
;		Masodperc bekerese.			:
;--------------------------------------------------------

		mov	di,10
		mov	bx,2
		mov	masodp,0
		call	decto
		mov	masodp,al
		cmp	masodp,60
		jl	go2
		mov	errcode,77h
		jmp	error
	go2:
		mov	dl,pont
		chrout

;--------------------------------------------------------
;		Szazadmasodperc bekerese.		:
;--------------------------------------------------------

		mov	di,10
		mov	bx,2
		mov	smasodp,0
		call	decto
		mov	smasodp,al
		cmp	smasodp,100
		jl	go3
		mov	errcode,77h
		jmp	error
	go3:
	error:
		cmp	errcode,77h
		jnz	noerrt
		mov	posy,12
		mov	posx,36
		call	curpos
		mov	dx,offset errms
		strout
		call	delay
		mov	posy,12
		mov	posx,36
		call	curpos
		mov	dx,offset clrdt
		strout
		jmp	wrongt
	noerrt:

;--------------------------------------------------------
;		Ido beallitasa				:
;--------------------------------------------------------

		mov	ah,2dh
		mov	ch,ora
		mov	realora,ch
		mov	cl,perc
		mov	realperc,cl
		mov	dh,masodp
		mov	realmperc,dh
		mov	dl,smasodp
		mov	realsmperc,dl
		int	interrupt
	exitsett:
		pop	dx
		pop	cx
		pop	bx
		pop	ax
		pop	di
		ret

	writedt endp

;--------------------------------------------------------
;	Valos idos ora megletenek vizsgalata.		:
;--------------------------------------------------------

	rtcheck 	proc	near

			push	ax
			push	dx
			mov	found,0
			mov	dx,241h
			call	byteinput		;Egy byte beolvasasa
			cmp	al,99h
			ja	checknext		;Nagyobb volt 99 nel
			mov	trn,0240h
			jmp	Continue_rtc
		Checknext:
			mov	dx,341h
			call	byteinput
			cmp	al,99h			;Nagyobb volt 99 nel
			ja	checkexit
			mov	trn,0340h
		Continue_rtc:
			mov	found,77h		;Van rt. clock
			mov	dx,8
			add	dx,trn
			call	byteinput
			cmp	al,0
			jnz	checkexit
			mov	found,0
		checkexit:
			pop	dx
			pop	ax
			ret

	rtcheck 	endp

;--------------------------------------------------------
;	Byte beolvasasa egy portrol.			:
;--------------------------------------------------------

	byteinput	proc	near

			cli
			in	al,dx
			sti
			ret

	byteinput	endp

;--------------------------------------------------------
;	Byte kiirasa egy portra.			:
;--------------------------------------------------------

	byteoutput	proc	near

			cli
			out	dx,al
			sti
			ret

	byteoutput	endp

;--------------------------------------------------------
;	Valos datum es ido olvasasa.			:
;--------------------------------------------------------

	getdt		proc	near

			push	ax
			push	dx
			mov	dx,9
			add	dx,trn
			call	byteinput		;Ev olvasasa
			mov	ah,0
			mov	realev,ax
			mov	dx,7
			add	dx,trn
			call	byteinput		;Ho olvasasa
			mov	realho,al
			mov	dx,6
			add	dx,trn
			call	byteinput		;Nap olvasasa
			mov	realnapn,al
			mov	dx,5
			add	dx,trn
			call	byteinput		;Nap olvasasa
			mov	realnaps,al
			mov	dx,4
			add	dx,trn
			call	byteinput		;Ora olvasasa
			mov	realora,al
			mov	dx,3
			add	dx,trn
			call	byteinput		;Perc olvasasa
			mov	realperc,al
			mov	dx,2
			add	dx,trn
			call	byteinput		;Masodperc olv.
			mov	realmperc,al
			mov	dx,1
			add	dx,trn
			call	byteinput		;Szazadmasodperc olv.
			mov	realsmperc,al
			pop	dx
			pop	ax
			ret

	getdt		endp

;--------------------------------------------------------
;	Konvertalas pakolt dec. rol hexaba.		:
;--------------------------------------------------------

	conv	proc	near

		push	ax
	;EV
		mov	ax,realev
		cmp	ax,50h
		jae	noadd
		add	ax,64h
	noadd:
		call	bcdhex
		mov	realev,1900			;Csak a ket utolso he-
							;lyiertek van tarolva
							;a valos idos oraban.
		mov	ah,0
		add	realev,ax			;Konverzio vegeredmenye
	;HO
		mov	al,realho
		call	bcdhex
		mov	realho,al			;Vegeredmeny
	;NAP
		mov	al,realnapn
		call	bcdhex
		mov	realnapn,al			;Vegeredmeny
	;NAP
		mov	al,realnaps
		call	bcdhex
		mov	realnaps,al			;Vegeredmeny
	;ORA
		mov	al,realora
		call	bcdhex
		mov	realora,al		       ;Vegeredmeny
	;PERC
		mov	al,realperc
		call	bcdhex
		mov	realperc,al		       ;Vegeredmeny
	;MASODPERC
		mov	al,realmperc
		call	bcdhex
		mov	realmperc,al			;Vegeredmeny
	;SZAZADMASODPERC
		mov	al,realsmperc
		call	bcdhex
		mov	realsmperc,al			;Vegeredmeny
		pop	ax
		ret

	conv	endp

;--------------------------------------------------------
;	Konvertalas hexa bol pakolt dec. ra.		:
;--------------------------------------------------------

	reconv	proc	near

		push	ax
	;EV
		mov	ax,realev
		sub	ax,1900
		call	hexbcd
		mov	realev,ax
	;HO
		mov	al,realho
		call	hexbcd
		mov	realho,al
	;NAP
		mov	al,realnapn
		call	hexbcd
		mov	realnapn,al
	;NAPS
		mov	al,realnaps
		call	hexbcd
		mov	realnaps,al
	;ORA
		mov	al,realora
		call	hexbcd
		mov	realora,al
	;PERRC
		mov	al,realperc
		call	hexbcd
		mov	realperc,al
	;MASODPERC
		mov	al,realmperc
		call	hexbcd
		mov	realmperc,al
	;SZAZADMASODPERC
		mov	al,realsmperc
		call	hexbcd
		mov	realsmperc,al
		pop	ax
		ret

	reconv	endp

;--------------------------------------------------------
;	Valos datum es ido irasa.			:
;--------------------------------------------------------

	putdt	proc	near

		push	ax
		push	dx
		mov	dx,9
		add	dx,trn
		mov	ax,realev
		mov	ah,0
		call	byteoutput			;Ev irasa
		mov	dx,7
		add	dx,trn
		mov	al,realho
		call	byteoutput			;Ho irasa
		mov	dx,6
		add	dx,trn
		mov	al,realnapn
		call	byteoutput			;Nap irasa
		mov	dx,5
		add	dx,trn
		mov	al,realnaps
		call	byteoutput			;Nap irasa
		mov	dx,4
		add	dx,trn
		mov	al,realora
		call	byteoutput			;Ora irasa
		mov	dx,3
		add	dx,trn
		mov	al,realperc
		call	byteoutput			;Perc irasa
		mov	dx,2
		add	dx,trn
		mov	al,realmperc
		call	byteoutput			;Masodperc irasa
		mov	dx,1
		add	dx,trn
		mov	al,realsmperc
		call	byteoutput			;Szazadmasodperc irasa
		pop	dx
		pop	ax
		ret

	putdt	endp

;--------------------------------------------------------
;	A tenyleges konvertalo rutin BCD -> HEX.	:
;--------------------------------------------------------

	bcdhex	proc	near

		push	cx
		push	si
		push	di
		mov	di,10				;Alapszam
		mov	cl,4
		push	ax
		and	ax,00ffh			;Felso byte torlese
		shl	al,cl
		shr	al,cl
		mov	si,offset space 		;Munkaterulet kezdocime
		inc	si
		mov	[si],al
		pop	ax
		mov	cl,8				;AH = AL
		shl	ax,cl
		mov	cl,4
		shr	ah,cl				;Elso helyiertek lerak.
		dec	si
		mov	[si],ah
		xor	ax,ax				;Torlesek
		xor	cx,cx
		mov	al,[si]
		mul	di				;Szorzas az alapszammal
		inc	si
		mov	cl,[si]
		add	ax,cx				;AX ben vegeredmeny
		pop	di
		pop	si
		pop	cx
		ret
	bcdhex	endp

;--------------------------------------------------------
;	A tenyleges visszakonvertalo rutin HEXBCD.	:
;--------------------------------------------------------

	hexbcd	proc	near

		push	bx
		push	cx
		push	dx
		push	si
		mov	bx,10				;Alapszam
		mov	dx,0
		mov	ah,0
		mov	si,offset space 		;Munk. ter. kezdete
		inc	si
	divide:
		div	bx
		mov	[si],dl 			;Utolso helyiertek ki
		dec	si
		cmp	ax,bx
		jb	hbexit
		jmp	divide
	hbexit:
		mov	dl,al
		mov	[si],dl 			;Elso helyiertek ki
		mov	ah,[si]
		inc	si
		mov	al,[si]
		push	ax
		mov	cx,4
		shl	ah,cl
		shr	ah,cl
		mov	dl,ah
		pop	ax
		shl	al,cl
		shr	al,cl
		shl	dl,cl				;DL h. = DL l.
		or	al,dl				;AL ben pakolt BCD.
		mov	ah,0
		pop	si
		pop	dx
		pop	cx
		pop	bx
		ret

	hexbcd	endp

;--------------------------------------------------------
;	Dos rendszer datum es ido allitasa.		:
;--------------------------------------------------------

	setdosdt	proc	near

			push	ax
			push	cx
			push	dx
			mov	ah,2bh			;Datum
			mov	cx,realev
			mov	dh,realho
			mov	dl,realnapn
			mov	al,0
			int	interrupt
			mov	ah,2dh			;Ido
			mov	ch,realora
			mov	cl,realperc
			mov	dh,realmperc
			mov	dl,realsmperc
			int	interrupt
			pop	dx
			pop	cx
			pop	ax
			ret

	setdosdt	endp


CODE	ENDS

MEMORY	SEGMENT PARA	MEMORY	'MEMORY'


MEMORY	ENDS

	END	START
