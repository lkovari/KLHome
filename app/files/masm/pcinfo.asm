PAGE 71,132


COMMENT *
	 Written by László Kõvári  1987.07.07.
		      Last update  1988.01....

	 Informations about your PC. computer.
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
	Interrupt	equ	21h
	Video		equ	10h


;
;
;	Macro section.
;
;
	StrOut	macro

		push	ax
		mov	ah,9
		int	Interrupt
		pop	ax

		endm

	ChrOutp macro

		push	ax
		push	bx
		push	cx
		mov	bh,0
		mov	al,dl
		mov	ah,9
		mov	cx,01
		mov	bl,15
		int	Video
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

	M	db	'László Kõvári `87 Hungary 3980 Satoraljaujhely Kazinczy 22.'
	T0	db	'ÜÜÜÜÜÜÜ  ÜÜÜÜÜÜÜÜÜ     ÜÜÜÜÜÜ       ÜÜÜÜÜÜ','$'
	T1	db	'ÜÜÜÜÜÜÜ  ÜÜÜÜÜÜÜÜÜÜÜ   ÜÜÜÜÜÜÜ     ÜÜÜÜÜÜÜ','$'
	T2	db	'  ÜÜÜ     ÜÜÜ    ÜÜÜ    ÜÜÜÜÜÜÜ   ÜÜÜÜÜÜÜ ','$'
	T3	db	'  ÜÜÜ     ÜÜÜÜÜÜÜÜ      ÜÜÜ ÜÜÜÜ ÜÜÜÜ ÜÜÜ ','$'
	T4	db	'  ÜÜÜ     ÜÜÜÜÜÜÜÜ      ÜÜÜ  ÜÜÜÜÜÜÜ  ÜÜÜ ','$'
	T5	db	'  ÜÜÜ     ÜÜÜ    ÜÜÜ    ÜÜÜ   ÜÜÜÜÜ   ÜÜÜ ','$'
	T6	db	'ÜÜÜÜÜÜÜ  ÜÜÜÜÜÜÜÜÜÜÜ   ÜÜÜÜ    ÜÜÜ    ÜÜÜÜ','$'
	T7	db	'ÜÜÜÜÜÜÜ  ÜÜÜÜÜÜÜÜÜ     ÜÜÜÜ     Ü     ÜÜÜÜ','$'
	Text1	db	'Információk a számítógépr”l','$'
	Under	db	'ððððððððððððððððððððððððððð','$'
	Text2	db	'Játék port....................................:','$'
	Text3	db	'Nyomtatók száma...............................:   db.','$'
	Text4	db	'A floppy-k száma..............................:   db.','$'
	Text5	db	'A memória mérete..............................:      K.byte.','$'
	Text6	db	'DOS. változat száma...........................:','$'
	Text7	db	'RS232 kartyák száma...........................:   db.','$'
	Text8	db	'Szines grafikus kártya........................:','$'
	Text9	db	'R O M létrehozás ideje........................:','$'
	Text10	db	'RAM. a rendszer kártyán.......................:    K.byte.','$'
	Text11	db	'Valós id”s óra a rendszerben..................:','$'
	Text12	db	'A számítógép ROM. beli azonosítója............:','$'
	Text14	db	'Szektor szám / foglaltsági egység fix lemezen :   db.','$'
	Text15	db	'Foglaltsági egységek száma fix lemezen........:       db.','$'
	Text16	db	'Fizikai szektor méret fix lemezen.............:     byte.','$'
	Text17	db	'Fix lemez maximális kapacítása................:          byte.','$'
	Text18	db	'Cilinderek száma fix lemezen..................:     db.','$'
	Text19	db	'Fix lemez szabad kapacítása...................:          byte.','$'
	Text20	db	'Fejek száma fix lemeznél......................:   db.','$'
	Spaces	db	'                         ','$'
	Spress	db	'Tovább ENTER lenyomására.','$'
	Date	db	'1900.00.00.','$'
	Iden	db	'           ','$'
	Wmax	db	'        ','$'
	Wfre	db	'        ','$'
	Van	db	'van.','$'
	Nincs	db	'nincs.','$'
	Maker	db	'(C) László Kõvári`87','$'
	xp	db	0
	yp	db	0
	One	db	'Ez a számítógép egy eredeti IBM PC.','$'
	Two	db	'Ez a számítógép egy IBM PC XT vagy egy hordozható PC.','$'
	Thre	db	'Ez a számítógép egy IBM PC junior.','$'
	Four	db	'Ez a számítógép egy IBM PC AT.','$'
	Five	db	'Ez a számítógép teljesen IBM PC kompatibilis.','$'
	Six	db	'Ez a számítógép teljesen IBM XT kompatibilis.','$'
	Error	db	'Ismeretlen gépazonosító byte. A gép nem eredeti.','$'
	a		dw	(0a90h)
	b		dw	(09f8h)
	h		dw	(0969h)
	c		dw	(08e2h)
	cisz		dw	(0862h)
	d		dw	(07eah)
	disz		dw	(0778h)
	e		dw	(070dh)
	f		dw	(06a7h)
	fisz		dw	(0648h)
	g		dw	(05edh)
	gisz		dw	(0598h)
	Delay_Counter	dw	(20000)
	Mode_byte	db	(68)

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
		call	Info				;Informaciok.

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

;--------------------------------------------------------
;	IBM szoveg kiirasa				:
;--------------------------------------------------------

	Ibm_Screen	proc	near

			call	Cls			;Kepernyotorles.
			mov	dx,offset Maker
			mov	xp,62			;CRSR poz. atadasa.
			mov	yp,0
			call	CurPos			;CRSR pozicionalas.
			StrOut
			mov	xp,22			;CRSR poz. atadasa.
			mov	yp,8
			call	CurPos			;CRSR pozicionalas.
			mov	dx,offset T0		;Szoveg kezdocim atadas
			StrOut				;IBM szoveg elso sor
							;kiirasa.
			mov	xp,22
			mov	yp,9
			call	CurPos
			mov	dx,offset T1
			StrOut
			mov	xp,22
			mov	yp,10
			call	CurPos
			mov	dx,offset T2
			StrOut
			mov	xp,22
			mov	yp,11
			call	CurPos
			mov	dx,offset T3
			StrOut
			mov	xp,22
			mov	yp,12
			call	CurPos
			mov	dx,offset T4
			StrOut
			mov	xp,22
			mov	yp,13
			call	CurPos
			mov	dx,offset T5
			StrOut
			mov	xp,22
			mov	yp,14
			call	CurPos
			mov	dx,offset T6
			StrOut
			mov	xp,22
			mov	yp,15
			call	CurPos
			mov	dx,offset T7
			StrOut
			call	Inf			;Gepi azonosito kierte-
							;kelese.
			call	Spress_Ret		;Tovabb ENTER lenyoma-
							;sara.
			call	Cls			;Kepernyotorles.
			ret

	Ibm_Screen	endp

;--------------------------------------------------------
;	ENTER lenyomasara var				:
;--------------------------------------------------------

	Spress_Ret	proc	near

			push	dx
			push	ax
			mov	xp,28
			mov	yp,22
			mov	si,offset Spress
			mov	cx,25
			call	Wcon			 ;Kiiras kepernyora
			mov	xp,79
			mov	yp,23
			call	CurPos
			mov	ah,7
		Wait:
			int	Interrupt		;ENTER bekerese
			cmp	al,13
			jnz	Wait
			mov	xp,28
			mov	yp,22
			call	CurPos
			mov	dx,offset Spaces
			StrOut
			pop	ax
			pop	dx
			ret

	Spress_Ret	endp

;--------------------------------------------------------
;	CRSR pozicionalo rutin poziciok 		:
;	XP - YP valtozokban.				:
;--------------------------------------------------------

	CurPos	proc	near

		push	ax
		push	bx
		push	dx
		mov	dl,xp
		mov	dh,yp
		mov	ah,02h
		mov	bh,0
		int	Video
		pop	dx
		pop	bx
		pop	ax
		ret

	CurPos	endp

;--------------------------------------------------------
;	A gep azonosito lekerdezese			:
;--------------------------------------------------------

	Inf	proc	near

		mov	cx,ds				;DS megorzese
		mov	bx,61440			;Aktualis DS
		mov	ds,bx
		mov	si,65534			;Eltolas
		lodsb					;Byte beolvasas
		mov	ds,cx
		cmp	al,255				;Nem eredeti ?
		jnz	Not_original			;Nem
		mov	xp,23				;CRSR poz. atadasa
		mov	yp,19
		call	CurPos				;CRSR pozicionalas
		mov	dx,offset One
		strout
		jmp	Exit
	Not_original:
		cmp	al,254
		jnz	Not_XT
		mov	xp,13
		mov	yp,19
		call	CurPos
		mov	dx,offset Two
		strout
		jmp	Exit
	Not_XT:
		cmp	al,253
		jnz	Not_PC_junior
		mov	xp,23
		mov	yp,19
		call	CurPos
		mov	dx,offset Thre
		strout
		jmp	Exit
	Not_PC_junior:
		cmp	al,252
		jnz	Not_AT
		mov	xp,25
		mov	yp,19
		call	CurPos
		mov	dx,offset Four
		strout
		jmp	Exit
	Not_AT:
		cmp	al,45
		jnz	Not_Compaq
		mov	xp,17
		mov	yp,19
		call	CurPos
		mov	dx,offset Five
		strout
		jmp	Exit
	Not_Compaq:
		cmp	al,154
		jnz	Unknown_ID
		mov	xp,17
		mov	yp,19
		call	CurPos
		mov	dx,offset six
		strout
		jmp	Exit
	Unknown_ID:
		mov	xp,18
		mov	yp,19
		call	CurPos
		mov	dx,offset Error
		strout
	Exit:
		mov	xp,1
		mov	yp,23
		call	CurPos
		ret

	Inf	endp


;--------------------------------------------------------
;	Kepernyo torlese				:
;--------------------------------------------------------

	Cls	proc	near

		push	ax
		push	bx
		mov	ah,00
		mov	bh,0
		int	Video
		pop	bx
		pop	ax
		ret

	Cls	endp

;--------------------------------------------------------
;	String kiirasa intenziv fennyel,		:
;	kezdocim SI -ben.				:
;	Hossz-> CX,Kezdocim-> SI			:
;--------------------------------------------------------

	Wcon	proc	near

	RepWcon:
		call	CurPos				;CRSR pozicionalasa
		inc	xp				;Oszlop poz. novelese
		mov	dl,[si]
		ChrOutp
		inc	si				;Kovetkezo karakter
		loop	RepWcon
		ret

	Wcon	endp

;--------------------------------------------------------
;	Kepernyomaszk.					:
;--------------------------------------------------------


	ScMask	proc	near

		push	dx
		call	Cls				;Kepernyotorles
		mov	dx,offset Maker
		mov	xp,62				;CRSR poz. atadasa.
		mov	yp,0
		call	CurPos				;CRSR pozicionalas.
		StrOut
		mov	xp,1				;CRSR poz atadasa
		mov	yp,1
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text1 		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,1				;CRSR poz atadasa
		mov	yp,2
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset Under 		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,4
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text2 		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,5
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text3 		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,6
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text4 		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,7
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text5 		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,8
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text6 		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,9
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text7 		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,10
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text8 		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,11
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text9 		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,12
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text10		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,13
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text11		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,14
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text12		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		pop	dx
		ret

	ScMask	endp

;--------------------------------------------------------
;	Winchester parameterek kepernyomaszkja. 	:
;--------------------------------------------------------


	WScMask proc	near

		push	dx
		mov	xp,16				;CRSR poz atadasa
		mov	yp,15
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text14		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,16
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text15		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,17
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text16		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,18
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text17		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,19
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text18		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,20
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text19		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		mov	xp,16				;CRSR poz atadasa
		mov	yp,21
		call	curpos				;CRSR pozicionalasa
		mov	dx,offset text20		;Szoveg kezdocime
		StrOut					;Szoveg kiirasa
		pop	dx
		ret

	WScMask endp

;--------------------------------------------------------
;	Konvertal hex. bol dec. ba			:
;	/Horner elrendezes alapjan/.			:
;--------------------------------------------------------


	HexDec	proc	near

		;ax-dx konvertalando ertek
		;di szamrendszer

	Repeat:
		clc
		div	di				;/10
		cmp	ax,65534			;Ha >= FFFe -nel
		jae	HDQuit				;Kilepes
		call	WriteCon			;Kiiras kepernyore
		dec	xp				;Pozicio csokkentes
							;hatulrol elore ir,
							;eloszor a legkisebb
							;helyierteket.
		mov	dx,0
		cmp	ax,0
		jz	HDQuit
		jmp	Repeat				;Van meg mit osztani
		call	WriteCon			;Legnagyobb helyiertek
							;kiirasa
	HDQuit:
		ret

	HexDec	endp

;--------------------------------------------------------
;	Kiir kepernyore intenziven.			:
;--------------------------------------------------------


	WriteCon	proc	near

			push	ax
			push	bx
			cmp	dx,9			;<= 9 nel ?
			jle	DecimalW		;Igen
			add	dx,7			;+7
		DecimalW:
			cmp	dx,di			;Nem lehet nagyobb 10
							;-nel mert nem esik
							;szamtartomanyba.
			jge	WQuit
			add	dx,30h			;+48
			call	curpos			;CRSR pozicionalasa
			ChrOutp 			;1 helyiertek kiirasa
		WQuit:
			pop	bx
			pop	ax
			ret

	WriteCon	endp

;--------------------------------------------------------
;	Kiepites meghatarozasa es informaciok elohozasa.:
;--------------------------------------------------------

	Config	proc	near

;	Jatek port vizsgalata a 11h megszakitas segitsegevel.
;	*****************************************************
;	bits: 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00
;		       ^^

		mov	xp,64				;CRSR poz. atadasa
		mov	yp,4
		call	curpos				;CRSR pozicionalas
		int	11h				;Lekerdezes
		mov	bx,ax
		and	ah,16				;Maszkolas AX 12. bitje
		cmp	ah,0
		jz	Not0				;Nincs
		mov	si,offset van			;'Van.' kezdocime
		mov	cx,4
		call	Wcon
		jmp	Cont0
	Not0:
		mov	si,offset nincs 		;'Nincs.' kezdete
		mov	cx,6
		call	Wcon				;Kiirasa
	Cont0:

;	Van-e floppy a rendszerben.
;	***************************
; bits: 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00
;						     ^^

		mov	xp,64				;CRSR poz atadasa
		mov	yp,6
		call	CurPos				;CRSR pozicionalas
		int	11h				;Lekerdezes
		mov	bx,ax				;Elteszi atobbi
							;szamara
		and	al,1				;Maszk
		cmp	al,0
		jz	Not1				;Nincs

;	Van. Most a mennyiseg lekerdezese kovetkezik
; bits: 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00
;				^^ ^^

		mov	ax,bx				;Eloveszi az erteket
		and	al,192				;Maszk
		mov	cl,6				;6 helyiertekkel
		shr	al,cl				;Jobbra rotal (/12)
		mov	dx,0
		mov	di,10				;Decimalis szamrendszer
		mov	ah,0
		add	al,1				;+1 ez szukseges !
		call	HexDec				;Konverzio dec-ra es az
							;ertek kiirasa
		jmp	Cont1
	Not1:						;'0' atadasa
		mov	dx,'0'                          ;Kiirasa
		ChrOutp
	Cont1:

;	Installalt nyomtatok szama.
;	***************************
; bits: 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00
;	^^ ^^

		mov	xp,64				;CRSR poz. atadasa
		mov	yp,5
		call	CurPos				;CRSR pozicionalas
		mov	ax,bx				;Eloveszi a 11h hivas
							;erteket.
		and	ah,192				;Maszkol
		mov	cl,6				;6 helyiertekkel
		shr	ah,cl				;Jobbra forgat
		mov	al,ah
		mov	dx,0
		mov	ah,0
		mov	di,10				;Decimalisba
		call	HexDec				;Atkonvertal es kiir

;	Memoria meretenek meghatarozasa.
;	********************************

		mov	ax,0
		mov	dx,ax
		int	12h				;IT. hivasa
							;AX -ben memoria meret
		mov	xp,67				;CRSR poz atadasa.
		mov	yp,7
		call	CurPos				;CRSR pozicionalas
		call	HexDec				;Konvertalas dec-ra

;	RS 232 soros portok szama.
;	**************************
; bits: 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00
;		    ^^ ^^ ^^

		mov	ax,0				;Alaphelyzet /nullaz/
		mov	dx,ax
		mov	xp,64				;CRSR poz. atadasa
		mov	yp,9
		call	CurPos				;CRSR pozicionalasa
		mov	ax,bx				;11h hivas erteke AX-be
		and	ah,14				;Maszkol
		shr	ah,1				;Jobbra eggyel
		mov	al,ah
		mov	dx,0				;Nullaz
		mov	ah,dl
		mov	di,10				;Decimalisba
		call	HexDec				;Konvertal es kiir

;	RAM. a rendszer kartyan.
;	************************
; bits: 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00
;					    ^^ ^^

		mov	ax,0				;Alaphelyzet /nullaz/
		mov	dx,ax
		mov	xp,65				;CRSR poz. atadasa
		mov	yp,12
		call	CurPos				;CRSR pozicionalasa
		mov	ax,bx				;11h hivas erteke AX-be
		and	al,12
		mov	ah,0
		mov	cl,2				;2 vel jobbra
		shr	al,cl
		mov	bx,16
		mul	bx				;*16
		add	ax,16
		mov	ah,0
		mov	dx,0				;Nullaz
		mov	di,10				;Decimalisba
		call	HexDec				;Konvertal es kiir

;	Valos idos ora a rendszerben.
;	*****************************
;	port 240; 241 ha ertekuk nagyobb 99 nel akkor nincs valos idos ora.

		mov	xp,64				;CRSR poz. atadasa
		mov	yp,13
		call	CurPos				;CRSR pozicionalasa
		mov	dx,240h 			;Portszam
		call	Bytein
		cmp	al,99h
		ja	Not7				;> 99 nel
		mov	dx,241h 			;Kovetkezo portszam
		call	Bytein
		cmp	al,99h
		ja	Not7				;>99 nel
		mov	si,offset Van			;'Van.' szoveg kezdete
		mov	cx,4
		call	Wcon				;Kiirasa
		jmp	Cont7
	Not7:
		mov	si,offset Nincs 		;'Nincs.' szoveg kezd.
		mov	cx,6
		call	Wcon				;Kiirasa
	Cont7:

;	Dos. verzio szam olvasasa.
;	**************************

		mov	xp,64				;CRSR poz. atadasa
		mov	yp,8
		call	CurPos				;CRSR pozicionalasa
		mov	ah,30h				;Funkciokod
		int	Interrupt			;Hivas
		mov	bh,ah				;Elmenti
		mov	ah,0
		mov	dx,0
		mov	di,10				;Decimalisba
		call	HexDec				;Konvertal es kiir
		mov	xp,65				;CRSR poz. atadasa
		mov	yp,8
		call	CurPos				;CRSR pozicionalasa
		mov	dx,'.'                          ;Pont
		ChrOutp 				;Kiirasa
		mov	xp,67				;CRSR poz. atadasa
		mov	yp,8
		call	CurPos				;CRSR pozicionalasa
		mov	al,bh				;AL -be BH /visszament/
		mov	ah,0				;Nullaz
		mov	dx,0
		call	HexDec				;Konvertal es kiir

;	Grafikus kartya vizsgalata.
;	***************************
; bits: 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00
;				      ^^ ^^

		mov	xp,64				;CRSR poz. atadasa
		mov	yp,10
		call	CurPos				;CRSR pozicionalasa
		and	ah,48				;Maszkol
		mov	cl,4
		shr	al,cl
		cmp	al,3
		jz	Is				;Van
		mov	si,offset Nincs 		;'Van.' szoveg kezdicime
		mov	cx,6
		call	Wcon				;Kiiras
		jmp	Cont8
	Is:
		mov	si,offset Van			;'Van.' szoveg kezdocime
		mov	cx,4
		call	Wcon				;Kiiras
	Cont8:

;	ROM. letrehozas datuma.
;	***********************
;	F000:FFF5 - F000:FFFD  NORTON konyve szerint
;

		push	ds				;Aktualis adatszegmens
							;mentese
		mov	xp,64				;CRSR poz. atadasa
		mov	yp,11
		call	CurPos				;CRSR pozicionalas
		mov	ax,61440			;F000h
		mov	di,offset Date			;Datum kezdocime
		add	di,5				;Mert honapot fog ol-
							;vasni./1900.00.00.'
		mov	ds,ax
		mov	si,65525			;FFF5h
		mov	al,[si] 			;Olvas
		pop	ds				;DS vissza
		mov	[di],al 			;Eltarol /HO/
		push	ds				;Ment
		mov	ax,61440			;Beallitja a DS-t
		mov	ds,ax
		inc	si				;Mutato novelese
		inc	di
		mov	al,[si] 			;Olvas
		pop	ds
		mov	[di],al 			;Eltarol /HO/
		add	di,2				;.NN
		add	si,2				;.NN
		push	ds
		mov	ax,61440			;Beallitja a DS-t
		mov	ds,ax
		mov	al,[si] 			;Beolvas
		pop	ds				;Aktualis DS vissza
		mov	[di],al 			;Eltarol /NAP/
		push	ds
		mov	ax,61440
		mov	ds,ax
		inc	si
		inc	di
		mov	al,[si] 			;Olvas
		pop	ds
		mov	[di],al 			;Tarol	/NAP/
		mov	di,offset Date			;Kezdocim
		add	di,2
		push	ds				;DS mentese
		mov	ax,61440			;Beallitas
		mov	ds,ax
		add	si,2				;.EE
		mov	al,[si] 			;Olvas
		pop	ds
		mov	[di],al 			;Tarol	/EV/
		push	ds				;DS vissza
		mov	ax,61440
		mov	ds,ax
		inc	si
		inc	di
		mov	al,[si] 			;Olvas
		pop	ds
		mov	[di],al 			;Tarol	/EV/
		mov	di,offset Date			;Kezdocime
		add	di,11
		mov	al,24h				;'$' jel kiirasa
		mov	[di],al
		mov	si,offset Date			;Kezdocime
		mov	cx,11				;Hossz
		call	Wcon				;Kiiras

;	A szamitogep azonositoja.
;	*************************
;	C800:0017h - C800:0023h

		cld
		push	ds
		push	es
		mov	ax,ds				;ES = DS
		mov	es,ax
		mov	ax,51200
		mov	ds,ax				;DS = C800h
		mov	si,17h				;Eltolas
		mov	di,offset Iden
		mov	cx,11				;27 byte hosszu
	RepeatR:
		movsb					;Olvas es tarol
		loop	RepeatR
		pop	es
		pop	ds
		mov	xp,64				;CRSR poz. atadas
		mov	yp,14
		call	CurPos				;CRSR pozicionalas
		mov	si,offset Iden
		mov	cx,11
		call	Wcon				;Kiiras kepernyore

;	Hard disk ellenorzese.
;	**********************

		call	WScMask 			;Kepernyomaszk a
							;fix lemez parameterek
							;kiirasahoz.

;	Winchesterrol informaciok.
;	**************************


		push	ds
		mov	ah,1ch				;Foglaltsagi tablarol
							;informaciok
		mov	dl,3				;Foglaltsagi egysegszam
		int	Interrupt
		pop	ds				;DS vissza
		mov	di,10				;Decimalisba

;	Foglaltsagi egysegek szama./Cluster/
;	************************************

		mov	xp,68				;CRSR poz. atadasa
		mov	yp,16
		call	CurPos				;CRSR pozicionalasa
		mov	bx,ax				;Atadas
		mov	ax,dx
		mov	dx,0
		call	HexDec				;Konverzio es kiiras

;	Fizikai szektor meret.
;	**********************

		mov	xp,66				;CRSR poz. atadasa
		mov	yp,17
		call	CurPos				;CRSR pozicionalasa
		mov	ax,cx				;Atadas
		mov	dx,0
		call	HexDec				;KOnverzio es kiiras

;	Szektorszam / allokacios egyseg.
;	********************************

		mov	xp,64				;CRSR poz. atadasa
		mov	yp,15
		call	CurPos				;CRSR pozicionalasa
		mov	ax,bx				;Ertekatadas
		mov	ah,0
		mov	dx,0
		call	HexDec				;Konverzio es kiiras

;	Max. lemez kapacitas. /Winchester/
;	**********************************
;	|Sector / cluster| * Size of the sector * number of cluster

		mov	ax,ds
		mov	es,ax
		push	ds
		mov	ah,1ch				;Foglaltsagi tabla in-
							;formacioi
		mov	dl,3
		int	Interrupt
		pop	ds
		mov	bx,dx				;Foglaltsagi egysegek
							;szama
		mov	si,cx				;Fizikai szektor meret
		mov	ah,0
		mul	bx				;Egy fogl. egys-ben levo
							;szektorok szama * a
							;foglaltsagi egysegek
							;szamaval.
		mov	bx,si
		mul	bx				;Es szorozva a fizikai
							;szektormerettel
		mov	di,offset Wmax			;Kezdocime /ide fogja
							;letenni a konvertalo
							;rutin.
		call	HexDecC 			;A masik konvertalo ru-
							;tin hivasa.
		mov	xp,63				;CRSR poz. atadasa
		mov	yp,18
		call	curpos				;CRSR pozicionalasa
		mov	cx,9				;Hossz
		mov	si,offset Wmax			;Kezdocim
		call	Wcon				;Kiiras

;	Szabad lemez kapacitas lekerdezese.
;	***********************************
;	Szabad szektorok * szektor merettel

		mov	ax,ds
		mov	es,ax				;A STOSB utasitas miatt
		mov	ah,36h				;Funkciokod
		mov	dl,3
		int	Interrupt			;Hivas
		push	dx
		mov	dx,0
		mul	bx
		mov	bx,cx
		mul	bx				;Szabad szektor *
							;szektormeret
		mov	di,offset Wfre			;Kezdocim /ide teszi/
		call	HexDecC 			;A nagy szamokat dec.ra
							;konvertalo rutin hivasa
		mov	xp,63				;CRSR poz. atadasa
		mov	yp,20
		call	curpos				;CRSR pozicionalas
		mov	cx,9				;Hossz
		mov	si,offset Wfre			;Kezdocim
		call	Wcon				;Kiiras
		pop	dx

;	Cilinderek szama.
;	*****************
;	Fix. disk parametertablabol. /C800:0229h/
;	ilinderek max szama a tabla elso szava.

		push	ds
		mov	xp,66				;CRSR poz. atadasa
		mov	yp,19
		call	CurPos				;CRSR pozicionalas
		mov	ax,41h				;Megszakitas sorszama
		mov	bx,4				;Egy vektor helyfogla
							;lasa
		mul	bx				;41h vektor cimenel
							;van leteve a tabla ci-
							;me.
		mov	di,ax
		mov	ax,0
		mov	ds,ax				;0000: szegmens
		mov	cx,[di] 			;Tabla cimenek szegmense
		add	di,2
		mov	dx,[di] 			;Tabla cimenek offsetje
		mov	ds,dx
		mov	di,cx
		mov	ax,[di] 			;Cilinderszam be /szo/
		mov	dx,0
		mov	si,di				;Mutato megorzese
		mov	di,10				;Decimalisba
		mov	bx,ds				;DS mentese
		pop	ds
		call	HexDec				;Konverzio es kiiras
		mov	di,si				;Mutato vissza

;	Fejek max szama.
;	****************
;	A table3. byte-ja

		push	ds
		mov	xp,64				;CRSR poz. atadasa
		mov	yp,21
		call	CurPos				;CRSR pozicionalas
		mov	ds,bx				;DS vissza a fejszam
							;olvasasahoz
		add	di,2
		mov	al,[di] 			;Fejszam be
		mov	ah,0
		mov	dx,0
		mov	di,10				;Decimalisba
		pop	ds				;Adatszegmens vissza
		call	HexDec				;Konvertalas dec.-ra
		ret

	Config	endp

;--------------------------------------------------------
;	Byte olvasasa portrol.				:
;--------------------------------------------------------


	Bytein	proc	near

		cli					;IT. tiltas
		in	al,dx				;Byte be
		sti					;IT. engedelyezes
		ret

	Bytein	endp

;--------------------------------------------------------
;	Decimalisba konvertal 100000000 -os		:
;	nagysagrendig ! 				:
;--------------------------------------------------------

	HexDecC proc	near

		mov	bx,10000
		xor	cx,cx				;CX nullazasa
		div	bx				;/10000
		mov	si,dx				;Maradek mentese
		xor	dx,dx				;Atvitel miatt
		mov	bx,1000
		div	bx				;/1000
		mov	bx,10
		div	bl				;/10
		add	ax,12336			;+3030h a kiiras miatt
							;a 30h a '0' kodja
		stosb					;8. helyiertek kiirasa
		xchg	ah,al				;Cserel
		stosb					;7. helyiertek kiirasa
		mov	ax,dx
		xor	dx,dx
		mov	bx,64h
		div	bx				;/100
		add	al,48				;+30h /'0' kodja/
		stosb					;6. helyiertek kiirasa
		mov	ax,dx
		xor	dx,dx
		mov	bx,10
		div	bl				;/10
		add	ax,12336			;+3030h a kiiras miatt
		stosb					;5. helyiertek kiirasa
		mov	al,ah
		stosb					;4. helyiertek kiirasa
		mov	ax,si
		xor	dx,dx
		mov	bx,1000
		div	bx				;/1000
		add	al,48				;+30h /'0' kodja/
		stosb					;3. helyiertek kiirasa
		xchg	dx,ax
		xor	dx,dx
		mov	bx,64h
		div	bx				;/100
		add	al,48				;+30h /'0' kodja/
		stosb					;2. helyiertek kiirasa
		xchg	dx,ax
		xor	dx,dx
		mov	bx,10
		div	bl				;/10
		add	ax,12336			;+3030h a kiiras miatt
		stosb					;1. helyiertek kiirasa
		mov	al,ah
		stosb					;0. helyiertek kiirasa

		call	ClearZ				;Vezeto nullak letorle-
							;se ha nem volt 9
							;helyiertek hosszu.
		ret

	HexDecC endp

;--------------------------------------------------------
;	A vezeto nullak letorlese.			:
;--------------------------------------------------------

	ClearZ	proc	near

		sub	di,9				;Visszapozicional a
							;mezo elejere
		mov	si,di
		mov	cx,9				;Hossz atadasa
	RepZero:
		lodsb					;Beolvas
		cmp	al,30h				;Vizsgal
		jnz	NotZ				;Nem zero
		mov	al,20h				;' ' atadasa
							;kiirasa
		stosb
		loop	RepZero 			;Kovetkezo
	NotZ:
		ret

	ClearZ	endp

;--------------------------------------------------------
;	A kepernyo gorgetese 4 reszben minden a paros	:
;	reszek le.					:
;--------------------------------------------------------

	ScrollUD	proc	near

			mov	xp,28
			mov	yp,23
			mov	si,offset Spress	;Tajekoztatas kiirasa
			mov	cx,25
			call	Wcon
			mov	xp,79			;Jobb also sarokba
							;pozicional
			mov	yp,23
			call	CurPos
			mov	ah,7
		New:
			int	Interrupt		;ENTER bekerese
			cmp	al,13
			jnz	New			;Nem ENTER volt
			mov	xp,28
			mov	yp,23
			call	CurPos
			mov	dx,offset Spaces	;Kiirast letorli
			StrOut
			call	Sound			;Dallam hivasa
			mov	cx,19h			;Sorok szama
		NewScrl:
			push	cx			;Elmenti mert szuk-
							;seg van a regiszterre
			mov	ah,06			;Felfele scroll
			mov	al,1			;1 sort
			mov	bh,7			;Bejovo sor attrib.
			mov	cx,0			;Bal felso koord.
			mov	dh,18h			;Jobb also koord.
			mov	dl,14h			;Jobb also oszlop
			int	Video			;Video IT. hivasa
			mov	ah,6			;Lefele gorget
			mov	al,1			;1 sort
			mov	bh,7			;Bejovo sor attrib.
			mov	cx,29h			;Bal felso koord.
			mov	dh,18h			;Jobb also koord.
			mov	dl,3dh			;Jobb also oszlop
			int	Video			;Video IT. hivas
			mov	ah,7			;Lefele scroll
			mov	al,1			;1 sort
			mov	bh,7			;Bejovo sor attrib.
			mov	cx,15h			;Balfelso koord.
			mov	dh,18h			;Jobb also koord.
			mov	dl,28h			;Jobb also oszlop
			int	Video			;Video IT. hivasa
			mov	ah,7			;Lefele scroll
			mov	al,1			;1 sort
			mov	bh,7			;Bejovo sor attrib.
			mov	cx,3eh			;Bal felso koord.
			mov	dh,18h			;Jobb also koord.
			mov	dl,4fh			;Jobb also oszlop
			int	Video			;Video IT. hivasa
			call	Delay			;Kesleltetes
			pop	cx			;CX vissza
			dec	cx			;CX csokkentese
			cmp	cx,0			;CX ellenorzese
			jnz	NewScrl 		;Uj gorgetes
			mov	ah,0			;Kepernyotorles
			mov	bh,0			;Nullas lapon.
			int	Video			;Video IT. hivas
			ret

	ScrollUD	endp


;--------------------------------------------------------
;	Kesleltetes					:
;--------------------------------------------------------

	Delay	proc	near

		push	cx
		mov	cx,3333
	DelayD:
		loop	DelayD
		pop	cx
		ret

	Delay	endp


;--------------------------------------------------------
;	Foprogram					:
;--------------------------------------------------------

	Info	proc	near

		call	Ibm_Screen
		call	Sound
		call	Cls
		call	ScMask
		call	Config
		mov	xp,0
		mov	yp,24
		call	CurPos
		call	ScrollUD
		ret

	Info	endp

;--------------------------------------------------------
;	Dallam						:
;--------------------------------------------------------

	Sound	proc	near

		push	ax
		push	cx
		push	si
		mov	al,0b6h 		;Idozito uzemmodregiszter jel
		out	67,al			;Kimenet az idozito vezerlo
						;portjara

;	A mod ciklusa 2 * fut le /fazis/	:

	Start_presentation:
		mov	cx,9			;Ismetlesek szama

;	Ez a ciklus 9 * fut le /ismetles/	:

	Repeat_S:
		mov	bx,cx			;Elmenti
		mov	cx,12			;Hangok szama
		mov	si,offset a		;Hangertek /oszto/ helye

;	A 12 hangot megszolaltato ciklus /skala/:

	Scale:

;	A frekvencia beallitasa az osztoval	:

		mov	ax,[si] 		;Egy hangertek beolvasasa
		out	66,al			;Az oszto alacsony byte-janak
						;atadasa a kimenetre

		mov	al,ah			;A magas byte attoltese a
						;kimeneti regiszterbe

		out	66,al			;Az oszto magas byte-janak
						;atadasa a kimenetre

;	Hang bekapcsolasa			:

		in	al,97			;A 97. port aktualis bitallasa-
						;nak beolvasasa
		push	ax
		or	al,3			;Az utolso ket bit bekepcsolasa
		out	97,al			;Az uj ertek visszakuldese
		pop	ax			;Eredeti ertek a kikapcsolashoz
		push	cx			;A kitartas miatt

;	Hang kitartasa				:

		mov	cx,Delay_Counter
	Delay_S:
		loop	Delay_S

;	A hang kikapcsolasa			:

		out	97,al			;Kikapcsolas

;	Ket hang kozti szunet			:

		mov	cx,Delay_Counter	;Ket hang kozti szunet
	Pause_S:
		loop	Pause_S
		pop	cx
		add	si,2			;Kovetkezo hangra all
		loop	Scale

;	A skala vege				:


;	Mod byte vizsgalata /iranyvaltas/	:

		cmp	mode_byte,'D'           ;Elso fazis ? /elso=gyorsul, ma-
						;sodik=lassul/
		jz	Decrement
		jmp	Increment
	Decrement:
		sub	Delay_Counter,2000	;Egyre gyorsabb skala
		jmp	Continue_S
	Increment:
		add	Delay_Counter,2000
	Continue_S:
		mov	cx,bx			;Ismetles erteke vissza
		loop	Repeat_S

;	Ismetlesek vege 			:


;	A masodik fazis vegenek vizsgalata	:

		cmp	Mode_byte,'I'           ;Elso vagy masodik fazis ?
		jz	End_of_presentation	;Masodik lefutott
		push	cx

;	Varakozas a ket fazis kozt		:

		mov	cx,60000		;Egy szunet a ket fazis kozt
	Wait1:
		loop	Wait1
		pop	cx
		mov	Delay_Counter,4000	;Kezdoertek
		mov	Mode_byte,'I'
		jmp	Start_presentation	;Elso lefutott

;	A masodik fazis vege			:


	End_of_presentation:
		pop	si
		pop	cx
		pop	ax
		ret

	Sound	endp


CODE	ENDS

MEMORY	SEGMENT PARA	MEMORY	'MEMORY'


MEMORY	ENDS

	END	START
