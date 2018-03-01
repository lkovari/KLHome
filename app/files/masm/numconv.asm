PAGE	60,132

COMMENT *
	 Written by László Kõvári  1987.04.20.
		      Last update  1987.12.30.

	 Egesz szamok konvertalasa.
		Szamrendszerhatar : 2 - 36
		       Ertekhatar : 0 - 262143
	*

;
;
; Extern section
;
;

;
;
; Public section
;
;

;
;
; Macro section
;
;


	Chr_Out_High	macro			;Karakter outputra
									;Magas intenzitassal
		     push    ax
		     push    bx
		     push    cx
		     mov     bh,0
		     mov     al,dl			;Karakter
		     mov     ah,9			;Funkciokod
		     mov     cx,01			;1 karakter
		     mov     bl,15			;Megjelenitesi mod
		     int     Video
		     pop     cx
		     pop     bx
		     pop     ax

		     endm

	Chr_Out_Pos	MACRO				;Karakter megjelenites
									;pozicionalva
			PUSH	AX
			PUSH	BX
			PUSH	CX
			MOV	BH,0
			MOV	AL,DL
			MOV	AH,10
			MOV	CX,01
			INT	VIDEO
			POP	CX
			POP	BX
			POP	AX

			ENDM


	Chr_Out 	MACRO	CHR		    ;Karakter kiirasa

			MOV	AH,02
			INT	DosF_Call

			ENDM


	String_Output	MACRO			;String kiirasa

			MOV	AH,09
			INT	DosF_Call

			ENDM


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

;
;
; Constant section
;
;
	DosF_Call	EQU	21H			;DOS. 21h hivasai
	Border		EQU	219			;Keret karaktere
	VIDEO		EQU	10H			;Video szolgaltatasok

;
;
; Data areas
;
;

DATA	SEGMENT PARA	PUBLIC	'DATA'

	M	DB	'Kovari Laszlo Hungary 3980 Satoraljaujhely Kazinczy ut 22.'

	Stat	db	0				;
	Xstat	db	0				;77h ha celhozert ha
							;kell modositani
	Ystat	db	0
	AuxSt	db	0				;Seged statusz
	ModeX	db	0				;Noveles vagy csokkenes
	ModeY	db	0
	Xap	db	0				;Aktualis pozicio
	Yap	db	0
	Xdp	db	0				;Cel pozicio
	Ydp	db	0
	Xep	db	0				;Eredeti pozicio
	Yep	db	0
	ChrAct	db	0				;Aktualis karakter
	Counter db	0				;Celhozert karakterek
							;szamlaloja
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
	Ch1	cr	<'S',0,0,0,0,2,1,31,12,2,1>
	Ch2	cr	<'Z',0,0,0,0,3,2,32,12,3,2>
	Ch3	cr	<'A',0,0,0,0,5,1,33,12,5,1>
	Ch4	cr	<'M',0,0,0,0,7,2,34,12,7,2>
	Ch5	cr	<'O',0,0,0,0,9,1,35,12,9,1>
	Ch6	cr	<'K',0,0,0,0,11,2,36,12,11,2>

	Ch7	cr	<'K',0,0,0,0,13,1,38,12,13,1>
	Ch8	cr	<'O',0,0,0,0,15,2,39,12,15,2>
	Ch9	cr	<'N',0,0,0,0,17,1,40,12,17,1>
	Ch10	cr	<'V',0,0,0,0,19,2,41,12,19,2>
	Ch11	cr	<'E',0,0,0,0,21,1,42,12,21,1>
	Ch12	cr	<'R',0,0,0,0,23,2,43,12,23,2>
	Ch13	cr	<'T',0,0,0,0,41,1,44,12,41,1>
	Ch14	cr	<'A',0,0,0,0,58,2,45,12,58,2>
	Ch15	cr	<'L',0,0,0,0,60,1,46,12,60,1>
	Ch16	cr	<'A',0,0,0,0,62,2,47,12,62,2>
	Ch17	cr	<'S',0,0,0,0,64,1,48,12,64,1>
	Ch18	cr	<'A',0,0,0,0,66,2,49,12,66,2>

	Ch19	cr	<'(',0,0,0,0,1,22,33,15,1,22>
	Ch20	cr	<'C',0,0,0,0,5,23,34,15,5,23>
	Ch21	cr	<')',0,0,0,0,10,22,35,15,10,22>

	Ch22	cr	<'L',0,0,0,0,15,23,37,15,15,23>
	Ch23	cr	<'e',0,0,0,0,20,22,38,15,20,22>
	Ch24	cr	<'s',0,0,0,0,25,23,39,15,25,23>
	Ch25	cr	<'l',0,0,0,0,45,22,40,15,45,22>
	Ch26	cr	<'i',0,0,0,0,50,23,41,15,50,23>
	Ch27	cr	<'e',0,0,0,0,55,22,42,15,55,22>
	Ch28	cr	<'S',0,0,0,0,60,23,43,15,60,23>
	Ch29	cr	<'o',0,0,0,0,65,22,44,15,65,22>
	Ch30	cr	<'f',0,0,0,0,70,23,45,15,70,23>
	Ch31	cr	<'t',0,0,0,0,75,22,46,15,75,22>

	TEXT0	DB	'László Kõvári Software.','$'
	TEXT1	DB	'MCMLXXXVII.','$'
	TEXT2	DB	'INPUT : ','$'
	TEXT3	DB	'OUTPUT : ','$'
	TEXT4	DB	'Sz mrendszer :','$'
	TEXT5	DB	'rt‚k : ','$'
	TEXT6	DB	'EGSZ SZMOK KONVERTLSA.','$'
	TEXT7	DB	'£jra ?  I - N...','$'
	MESS0	DB	'A program segitsigével 0 és 262143 közzé eso eg‚sz sz mok kon-','$'
	MESS1	DB	'vert lhat¢k  t m s sz mrendszerbe. A sz mrendszer 2 ‚s 36 k”z-','$'
	MESS2	DB	'z‚ eshet. T£l nagy sz m eset‚n a program figyelmeztet‚st kld !','$'
	ERMS0	DB	'Hib s sz mrendszer ‚rt‚k !','$'
	ERMS1	DB	'T£l nagy ‚rtek !','$'
	CLR	DB	'                                        ','$'
	CLSYS	DB	'                  ','$'
	CLVLU	DB	'                        ','$'
	CLEARSC DB	' ',10,13,'$'
	POSX	DB	0
	POSY	DB	0
	DPOSX	DB	0				;Kezdo poziciok
	DPOSY	DB	0
	DLENG	DB	0				;Hossz megadasa keret-
							;rajzolashoz
	XYLIN	DB	0				;Vizszintes vagy fuggo-
							;leges mod taroloja
							;58h=X 59h=Y
	RESL	DW	0				;
	RESH	DW	0
	TRANSIT DB	0				;Kiiratashoz tarolo
	BASENUM DB	0				;Alapszam
	TLOW	DW	0				;Ellenorzeshez tarolo
	THIGH	DW	0
	TOO	DB	0				;77h ha tulcsordulas van
	Begin	dw	0				;Kezdet a kiiro rutinnal
	First	dw	(2415)				;H normal
		dw	(2415)				;H
		dw	(1809)				;E
		dw	(2711)				;A
		dw	(2711)				;A
		dw	(1809)				;E
	Beep_F	dw	(1140)				;C ^^
	e0	dw	(070dh)
	c0	dw	(08e2h)
	d0	dw	(07eah)
	g0	dw	(05edh)
	d1	dw	(07eah)
	g1	dw	(05edh)
	e1	dw	(070dh)
	c1	dw	(08e2h)
	Dly_Cnt dw	(60000) 		;Kesleltetesi ertek
							;hangnal


DATA	ENDS

;
;
; Stack space
;
;

STACK	SEGMENT PARA	STACK	'STACK'

	DW	0200H	DUP	(?)	;STACK'S SIZE +256 BYTES

STACK	ENDS

;
;
; Code section
;
;

CODE	SEGMENT PARA	PUBLIC	'CODE'

START  PROC    FAR

	ASSUME	CS:CODE,DS:DATA,SS:STACK,ES:NOTHING


		PUSH	DS
		XOR	AX,AX
		PUSH	AX			;Visszateresi cim mentese

		MOV	AX,DATA
		MOV	DS,AX			;Aktualis DS beallitasa

		CALL	Text_Appear		;Programnev kiirasa
		CALL	Change_Cursor		;Kurzor csereje
		CALL	Clear_Screen		;Kepernyo torlese
		CALL	Screen_mask		;Kepernyomaszk
	NEW:
		CALL	Error_Field_Clear	;Hibamezo torlese
		CALL	Input_Num_System_I	;Szamrendszer be IN.
		CALL	Input_Value		;Ertek be
		CALL	Input_Num_System_O	;Szamrendszer be OUT.
		CALL	Output_Value		;Ertek ki
		MOV	POSY,15
		MOV	POSX,31
		CALL	Cursor_Position
		mov	cx,16			;Hossz
		MOV	DX,OFFSET TEXT7 	;Ujra - uzenete.
		mov	Begin,dx
		call	Write_High_Video	;Nagyintenzitassal kiir
	NEW1:
		MOV	AH,07			;Ohaj beolvasasa
		INT	DosF_Call
		CALL	Sound_Short		;Hiba szignal
		CMP	AL,49H			;Nagy I betu ?
		JNZ	CONT
		JZ	OK
	CONT:
		CMP	AL,69H			;Kis i betu ?
		JNZ	CONT1
		JZ	OK
	CONT1:
		CMP	AL,4EH			;Nagy N betu ?
		JNZ	CONT2
		JZ	Exit_To_System
	CONT2:
		CMP	AL,6EH			;Kis n betu ?
		JNZ	NEW1
		JZ	Exit_To_System
	OK:
		JMP	NEW			;I - uj konverzio
	Exit_To_System:
		CALL	song			;Dallam
		CALL	Scrollud		;Gorgetes. /torles/
		RET


START	ENDP


;--------------------------------------------------------
;	Kesleltetes	rovid				:
;--------------------------------------------------------

	Delay_Very_Short  proc	  near

		push	cx
		mov	cx,0
	Repeat0:
		nop
		inc	cx
		cmp	cx,377
		jbe	Repeat0
		pop	cx
		ret

	Delay_Very_Short  endp


;--------------------------------------------------------
;	Kesleltetes	hosszu				:
;--------------------------------------------------------

	Delayl	proc	near

		push	cx
		mov	cx,0
	Repeat1:
		nop
		inc	cx
		cmp	cx,65534
		jb	Repeat1
		nop
	Repeat2:
		nop
		dec	cx
		cmp	cx,0
		ja	Repeat2
		pop	cx
		ret

	Delayl	endp


;--------------------------------------------------------
;	Kurzor kikapcsolasa				:
;--------------------------------------------------------

	Disable_Cursor	proc	near

		push	ax
		push	bx
		push	cx
		mov	ah,01				;Funkciopkod
		mov	bh,0				;Kepernyolap
		mov	cl,0				;Ig
		mov	ch,14				;Tol
		int	Video
		pop	cx
		pop	bx
		pop	ax
		ret

	Disable_Cursor	endp

;--------------------------------------------------------
;	Kurzor bekapcsolasa				:
;--------------------------------------------------------


	Enable_Cursor	  proc	  near

		push	ax
		push	bx
		push	cx
		mov	ah,01				;Funkciokod
		mov	bh,0				;Kepernyolap
		mov	cl,13				;Ig
		mov	ch,12				;Tol
		int	Video
		pop	cx
		pop	bx
		pop	ax
		ret

	Enable_Cursor	  endp

;--------------------------------------------------------
;	Karakter kiirasa				:
;--------------------------------------------------------

	Modify_Char_Pos  proc	 near

		push	ax
		push	cx
		push	dx
		mov	ModeX,0 			;
		mov	ModeY,0
		cmp	Stat,77h			;Aktualis statusz vizsg
		jz	Go2
		jmp	Go3
	Go2:
		mov	AuxSt,77h
		jmp	WriteCEnd
	Go3:

;--------------------------------------------------------
;	Torles						:
;--------------------------------------------------------

		mov	al,Xap
		mov	PosX,al
		mov	al,Yap
		mov	Posy,al
		call	Cursor_Position
		mov	dl,' '
		Chr_Out_Pos				;Karakter letorlese
		call	Delay_Very_Short

;--------------------------------------------------------
;	X koordinata modositasi iranyanak beallitasa	:
;--------------------------------------------------------

		mov	al,Xep
		cmp	al,Xdp
		jb	LowX
		mov	ModeX,'D'                       ;Csokkenteni kell X et
		jmp	Go0
	LowX:
		mov	ModeX,'I'                       ;Novelni kell X et
	Go0:
;--------------------------------------------------------
;	Y koordinata modositasi iranyanak beallitasa	:
;--------------------------------------------------------
		mov	al,Yep
		cmp	al,Ydp
		jb	LowY
		mov	ModeY,'D'                       ;Csokkenteni kell Y t
		jmp	Go1
	LowY:
		mov	ModeY,'I'                       ;Novelni kell Y t
	Go1:

;--------------------------------------------------------
;	X koord. statuszanak vizsgalata 		:
;--------------------------------------------------------

		cmp	Xstat,39h
		jz	XExitM

;--------------------------------------------------------
;	Modositasi irany kivalasztasa			:
;--------------------------------------------------------

		cmp	ModeX,'D'
		jnz	IncrementX
		jz	DecrementX

;--------------------------------------------------------
;	Cel pozicion all				:
;--------------------------------------------------------

		cmp	ModeX,0
		jz	SetExX

;--------------------------------------------------------
;	Kell-e meg nopvelni X-et ?			:
;--------------------------------------------------------

	IncrementX:
		mov	al,Xap
		cmp	al,Xdp
		jb	IncrX

;--------------------------------------------------------
;	X statuszanak beallitasa			:
;--------------------------------------------------------

	SetExX:
		cmp	Xstat,0
		jnz	GoY
		mov	Xstat,39h
		jmp	GoY

;--------------------------------------------------------
;	X koordinata novelese				:
;--------------------------------------------------------

	IncrX:
		inc	Xap
		jmp	GoY

;--------------------------------------------------------
;	Kell-e csokkenteni X-et ?			:
;--------------------------------------------------------

	DecrementX:
		mov	al,Xap
		cmp	al,Xdp
		ja	DecrX

;--------------------------------------------------------
;	X statuszanak beallitasa			:
;--------------------------------------------------------

		jmp	SetExX

;--------------------------------------------------------
;	X koordinata csokkentese			:
;--------------------------------------------------------

	DecrX:
		dec	Xap				;Csokkenti

;--------------------------------------------------------
;	Y koordinata statuszanak vizsgalata		:
;--------------------------------------------------------

		cmp	Ystat,38h
		jz	YExitM

;--------------------------------------------------------
;	Kell-e meg novelni Y-t ?			:
;--------------------------------------------------------

	XExitM:
	GoY:
		cmp	ModeY,'D'
		jnz	IncrementY
		jz	DecrementY

;--------------------------------------------------------
;	Cel pozicion all				:
;--------------------------------------------------------

		cmp	ModeY,0
		jz	SetExY

;--------------------------------------------------------
;	Kell-e meg novelni Y-t ?			:
;--------------------------------------------------------

	IncrementY:
		mov	al,Yap
		cmp	al,Ydp
		jb	IncrY

;--------------------------------------------------------
;	Y statuszanak beallitasa			:
;--------------------------------------------------------

	SetExY:
		cmp	Ystat,0
		jnz	GoOut
		mov	Ystat,38h
		jmp	GoOut

;--------------------------------------------------------
;	Y novelese					:
;--------------------------------------------------------

	IncrY:
		inc	Yap				;Noveli
		jmp	GoOut

;--------------------------------------------------------
;	Kell-e csokkenteni Y-t ?			:
;--------------------------------------------------------

	DecrementY:
		mov	al,Yap
		cmp	al,Ydp
		ja	DecrY

;--------------------------------------------------------
;	Y statuszanak beallitasa			:
;--------------------------------------------------------

		jmp	SetExY

;--------------------------------------------------------
;	Y csokkentese					:
;--------------------------------------------------------

	DecrY:
		dec	Yap				;Csokkenti

;--------------------------------------------------------
;	Statuszok vizsgalata				:
;--------------------------------------------------------

	GoOut:
	YExitM:
		cmp	Xstat,39h
		jnz	NoMS
		cmp	Ystat,38h
		jnz	NoMS

;--------------------------------------------------------
;	Statusz modositasa /egy karaktere/		:
;--------------------------------------------------------

		mov	Stat,77h
	NoMS:

;--------------------------------------------------------
;	Megjelenit					:
;--------------------------------------------------------

		mov	al,Xap
		mov	ah,Yap
		mov	PosX,al
		mov	Posy,ah
		call	Cursor_Position
		mov	dl,ChrAct
		Chr_Out_High

;--------------------------------------------------------
;	Megjelenitett karakterszamlalo novelese 	:
;--------------------------------------------------------

		cmp	stat,77h
		jnz	WriteCEnd
		add	Counter,1
		call	Sound_Short
		call	Delay_Very_Short
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

	Text_Appear proc    near

		push	ax
		call	Sound_Short			;Hang
		call	Clear_Screen			;Kepernyotorles
		mov	Stat,0
		call	Disable_Cursor
	RepeatCR	Label	Far

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
		call	Delayl				;Hosszu kesleltetesek
		call	Delayl
		call	Enable_Cursor			;Kurzor bekapcsolasa
		CALL	Song				;Dallam
		call	Clear_Screen			;Kepernyotorles
		pop	ax
		ret
	LongJump:
		jmp	RepeatCR

	Text_Appear endp


;--------------------------------------------------------
;-------------------------------------------------------:
;	A konvertalas rutinjai				:
;-------------------------------------------------------:
;--------------------------------------------------------

;--------------------------------------------------------
;	Kesleltetes					:
;--------------------------------------------------------

	Delaym	proc	near

		push	cx
		mov	cx,0
	Newm:
		nop
		inc	cx
		cmp	cx,2000
		jb	Newm
		pop	cx
		ret

	Delaym	endp

;------------------------------------------------
;	Intenziven kiir egy szoveget		:
;	Hossz: CX byte-ban			:
;	Kezdet: SI				:
;------------------------------------------------

	Write_High_Video       proc    near

			push	dx
			push	si
			mov	si,Begin	;Kezdet atadasa
		Write_H:
			mov	dl,[si] 	;Atad
			Chr_Out_High		;Megjelenit
			inc	Posx
			call	Cursor_Position ;Pozicional
			inc	si
			loop	Write_H
			pop	si
			pop	dx
			ret

	Write_High_Video       endp

;------------------------------------------------
;	A kurzor pozicionalasa. 		:
;------------------------------------------------

	Cursor_Position  PROC	 NEAR

		PUSH	AX
		PUSH	BX
		PUSH	DX
		MOV	DH,POSY 		;Poziciok atadasa
		MOV	DL,POSX
		MOV	AH,02H			;Funkciokod
		MOV	BH,0
		INT	VIDEO
		POP	DX
		POP	BX
		POP	AX
		RET

	Cursor_Position  ENDP

;------------------------------------------------
;	Egy vonal rajzolasa.			:
;------------------------------------------------

	Drawing_Line	PROC	NEAR

		PUSH	AX
		PUSH	BX
		PUSH	CX
		PUSH	DX
		MOV	CH,0
		MOV	CL,DLENG		;Hossz be
		MOV	AL,DPOSY		;Poziciok be AL-Y,BL-X
		MOV	BL,DPOSX
		MOV	POSX,BL 		;Cursor pozicionalasa
		MOV	POSY,AL
		CALL	Cursor_Position
		MOV	DL,Border
		Chr_Out_Pos			;Egy karakter megjelenitese
	REPEATC:
		CMP	XYLIN,58H		;X ? Y
		JZ	INCXPOS
		INC	AL			;Fuggoleges
		JMP	INCYPOS
	INCXPOS:
		INC	BL			;Vizszintes
	INCYPOS:
		MOV	POSX,BL
		MOV	POSY,AL
		CALL	Cursor_Position 	;CUR. pozicionalas
		MOV	DL,Border
		Chr_Out_Pos
		LOOP	REPEATC
		POP	DX
		POP	CX
		POP	BX
		POP	AX
		RET

	Drawing_Line	ENDP

;------------------------------------------------
;	A kepernyomaszk.			:
;------------------------------------------------

	Screen_mask	PROC	NEAR

		MOV	DPOSX,01		;Keret rajzolasa
		MOV	DPOSY,00		;Vizszintes
		MOV	XYLIN,58H
		MOV	DLENG,77
		CALL	Drawing_Line
		MOV	DPOSX,01
		MOV	DPOSY,02
		MOV	XYLIN,58H
		MOV	DLENG,77
		CALL	Drawing_Line
		MOV	DPOSX,19
		MOV	DPOSY,14
		MOV	XYLIN,58H
		MOV	DLENG,41
		CALL	Drawing_Line
		MOV	DPOSX,01
		MOV	DPOSY,16
		MOV	XYLIN,58H
		MOV	DLENG,77
		CALL	Drawing_Line
		MOV	DPOSX,01
		MOV	DPOSY,24
		MOV	XYLIN,58H
		MOV	DLENG,77
		CALL	Drawing_Line
		MOV	DPOSX,00		; Keret fuggoleges
		MOV	DPOSY,00
		MOV	XYLIN,59H
		MOV	DLENG,24
		CALL	Drawing_Line
		MOV	DPOSX,79
		MOV	DPOSY,00
		MOV	XYLIN,59H
		MOV	DLENG,24
		CALL	Drawing_Line
		MOV	DPOSX,38
		MOV	DPOSY,03
		MOV	XYLIN,59H
		MOV	DLENG,11
		CALL	Drawing_Line
		MOV	DPOSX,39
		MOV	DPOSY,03
		MOV	XYLIN,59H
		MOV	DLENG,11
		CALL	Drawing_Line
		MOV	POSY,01 		; Elvalasztasok
		MOV	POSX,17
		CALL	Cursor_Position
		MOV	DL,Border
		Chr_Out
		MOV	POSY,01
		MOV	POSX,62
		CALL	Cursor_Position
		MOV	DL,Border
		Chr_Out
		MOV	POSY,15
		MOV	POSX,19
		CALL	Cursor_Position
		MOV	DL,Border
		Chr_Out
		MOV	POSY,15
		MOV	POSX,60
		CALL	Cursor_Position
		MOV	DL,Border
		Chr_Out
		MOV	POSY,01 		; Szovegek kiirasa
		MOV	POSX,01
		CALL	Cursor_Position
		MOV	DX, OFFSET TEXT0	; Keszito
		String_Output
		MOV	POSY,01
		MOV	POSX,27
		CALL	Cursor_Position
		mov	cx,26			; Merete byte-ban
		MOV	DX,OFFSET TEXT6 	; Cim
		mov	Begin,dx
		call	Write_High_Video
		MOV	POSY,01
		MOV	POSX,68
		CALL	Cursor_Position
		MOV	DX,OFFSET TEXT1 	; Datum
		String_Output
		MOV	POSY,04
		MOV	POSX,02
		CALL	Cursor_Position
		MOV	DX,OFFSET TEXT2 	; Input
		String_Output
		MOV	POSY,04
		MOV	POSX,42
		CALL	Cursor_Position
		MOV	DX,OFFSET TEXT3 	; Output
		String_Output
		MOV	POSY,07
		MOV	POSX,05
		CALL	Cursor_Position
		MOV	DX,OFFSET TEXT4 	; Szamrendszer 1
		String_Output
		MOV	POSY,07
		MOV	POSX,44
		CALL	Cursor_Position
		MOV	DX,OFFSET TEXT4 	; Szamrendszer 2
		String_Output
		MOV	POSY,10
		MOV	POSX,05
		CALL	Cursor_Position
		MOV	DX,OFFSET TEXT5 	; Ertek 1
		String_Output
		MOV	POSY,10
		MOV	POSX,44
		CALL	Cursor_Position
		MOV	DX,OFFSET TEXT5 	; Ertek 2
		String_Output
		MOV	POSY,18
		MOV	POSX,09
		CALL	Cursor_Position
		MOV	DX,OFFSET MESS0 	; Info. 1
		String_Output
		MOV	POSY,20
		MOV	POSX,09
		CALL	Cursor_Position
		MOV	DX,OFFSET MESS1 	; Info. 2
		String_Output
		MOV	POSY,22
		MOV	POSX,09
		CALL	Cursor_Position
		MOV	DX,OFFSET MESS2 	; Info. 3
		String_Output
		CALL	Change_Cursor
		RET

	Screen_mask  ENDP

;------------------------------------------------
;	Decimalisbol konvertal. 		:
;------------------------------------------------

	From_Decimal	PROC	NEAR

		PUSH	AX
		PUSH	BX
		PUSH	CX
		PUSH	DX
		PUSH	DI
		MOV	AH,0
		MOV	AL,BASENUM		;Alapszam be
		MOV	DI,AX
		MOV	BX,16			;Max. hossz
		MOV	AX,0			;Reg. nullazasa
		MOV	DX,0
		MOV	CX,0
	REPEAT_:
		CALL	Read_Character		;Olvasas billentyuzetrol
		CMP	CX,77H
		JZ	DECTOEXIT		;Enter eseten
		MUL	DI			;Szorzas az alapszammal
		ADD	AX,CX			;Hozzaad
		ADC	DX,0			;Carry - t.
		CMP	SI,49H
		JNZ	GOCONT1
		CALL	Check_Of_Numerical_System	;Alapszam ellenorzes
		JMP	GOCONT2
	GOCONT1:
		CALL	Check_Of_Value		;Ertek ellenorzes
	GOCONT2:
		CMP	BX,0			;BX=0 ha hibas
		JZ	DECTOEXIT		;Kilep a vegen v. hiba eseten
		JMP	REPEAT_			;Ujra
	DECTOEXIT:
		CMP	SI,49H			;Alapszam ? Eredmeny
		JZ	SYSNUM
		MOV	RESL,AX
		MOV	RESH,DX
		JMP	GO
	SYSNUM:
		MOV	BASENUM,AL		;Alapszam volt
	GO:
		POP	DI
		POP	DX
		POP	CX
		POP	BX
		POP	AX
		RET

	From_Decimal	ENDP

;------------------------------------------------
;	Kepernyorol olvas.			:
;------------------------------------------------

	Read_Character PROC    NEAR

		PUSH	DX
		PUSH	AX
		MOV	AH,07
	WRONG:
		INT	DosF_Call		;Olvas
		MOV	CH,0
		MOV	CL,AL
		call	Upcase			;Nagybetuve alakit ha kell
		MOV	TRANSIT,CL		;Tarol a kesobbi kiirashoz
		CMP	CL,13
		JNZ	GOTO_			;Enter eseten kilep
		MOV	CL,77H			;CL =77H ha vege.
		JMP	EXIT
	GOTO_:
		CMP	CL,30H
		JL	WRONG			;Kisebb 0 nal
		SUB	CL,30H			;ASCII / DEC.
		CMP	CL,9
		JLE	DECIMAL 		;0 - 9 kozze esik
		SUB	CL,7			;A - Z kozze eshet
	DECIMAL:
		CMP	CX,DI
		JGE	WRONG			;Ertek >= szamrendszer
		MOV	DL,TRANSIT
		Chr_Out_High			;helyes ertek megjelenitese
		inc	Posx
		call	Cursor_Position
	EXIT:
		CALL	Sound_Short
		DEC	BX			;Hossz csokkentese
		POP	AX
		POP	DX
		RET

	Read_Character ENDP

;------------------------------------------------
;	Nagybetuve alakit ha szukseges		:
;------------------------------------------------

	Upcase	proc	near

		push	ax
		mov	ah,0
		mov	al,cl
		cmp	al,97			;a
		jb	Less			;Kisebb, nincs atalakitas
		cmp	al,122			;z
		ja	Greater 		;Nagyobb, nincs atalakitas
		sub	ax,32			;Nagybetuve alakit
		mov	cl,al
	Less:
	Greater:
		pop	ax
		ret

	Upcase	endp

;------------------------------------------------
;	Hexadecimalisbol konvertal.		:
;------------------------------------------------

	From_Hexadecimal	PROC	NEAR

		PUSH	AX
		PUSH	BX
		PUSH	DX
		MOV	AH,0
		MOV	AL,BASENUM		;Alapszam be
		MOV	BX,AX
		MOV	POSY,10
		MOV	POSX,68
		MOV	AX,RESL
		MOV	DX,RESH
		CMP	BASENUM,2		;Mas szamrendszerbe konvertal
		JNZ	DIVOK			;Nem kettes szamrendszerbe
		TEST	AX,DX			;Ellenorzes
		JNZ	DIVOVER 		;Nagyobb 65535 -nel
	DIVOK:
	REPEA:
		CLC
		DIV	BX			;Osztas az alapszammal
		CALL	Write_Out		;Kiiras
		MOV	DX,0
		CMP	AX,0
		JZ	HDQUIT			;Kesz
		JMP	REPEA
		CALL	Write_Out
	HDQUIT:
		POP	DX
		POP	BX
		POP	AX
		RET
	DIVOVER:
		MOV	POSY,15 		;Hiba eseten
		MOV	POSX,31
		CALL	Cursor_Position
		CALL	Sound_Long
		CALL	Delay_Medium
		CALL	Sound_Long
		mov	cx,16
		MOV	DX,OFFSET ERMS1
		mov	Begin,dx
		call	Write_High_Video
		CALL	Delay_Long
		CALL	Error_Field_Clear
		JMP	HDQUIT

	From_Hexadecimal	ENDP

;------------------------------------------------
;	Kiiras a kepernyore.			:
;------------------------------------------------

	Write_Out	PROC	NEAR

		PUSH	AX
		CMP	DX,BX			;Viszonyitas az alapszamhoz
		JGE	WQUIT
		CMP	DX,9
		JLE	DECIMALN		;0 >  < 9
		ADD	DX,7			;A >  < Z  lehet .
	DECIMALN:
		ADD	DX,30H			;DEC. / ASCII.
		CALL	Cursor_Position
		Chr_Out_High			;Kiiras
	WQUIT:
		DEC	POSX			;Pozicio csokkentese
		POP	AX
		RET

	Write_Out	ENDP

;------------------------------------------------
;	Kepernyotorles. 			:
;------------------------------------------------

	Clear_Screen	PROC	NEAR

		PUSH	AX
		PUSH	BX
		PUSH	CX
		MOV	AH,00			;Funkciokod
		MOV	BH,0			;Kepernyolap /videomod/
		INT	10H
		POP	CX
		POP	BX
		POP	AX
		RET

	Clear_Screen	ENDP

;------------------------------------------------
;	Szamrendszer bekero mezo torlese /input/:
;------------------------------------------------

	In_Num_Sys_Field_Clear	PROC	NEAR

		PUSH	AX			;IN. szam rsz. mezo torlese
		PUSH	BX
		PUSH	DX
		MOV	POSY,07
		MOV	POSX,20
		CALL	Cursor_Position
		MOV	DX,OFFSET CLSYS
		String_Output
		MOV	POSY,07
		MOV	POSX,20
		CALL	Cursor_Position
		POP	DX
		POP	BX
		POP	AX
		RET

	In_Num_Sys_Field_Clear	ENDP

;-------------------------------------------------
;	Szamrendszer bekero mezo torlese /output/:
;-------------------------------------------------

	Out_Num_Sys_Field_Clear PROC	NEAR

		PUSH	AX			;OUT. szam rsz. m. t.
		PUSH	BX
		PUSH	DX
		MOV	POSY,07
		MOV	POSX,60
		CALL	Cursor_Position 	;Cur. pozicionalas
		MOV	DX,OFFSET CLSYS
		String_Output			;Torles
		MOV	POSY,07
		MOV	POSX,60
		CALL	Cursor_Position 	;Visszapozicional
		POP	DX
		POP	BX
		POP	AX
		RET

	Out_Num_Sys_Field_Clear ENDP

;------------------------------------------------
;	Ertek bekero mezo torlese /input/.	:
;------------------------------------------------

	In_Value_Field_Clear	PROC	NEAR

		PUSH	AX			;IN. ertek mezo torl.
		PUSH	BX
		PUSH	DX
		MOV	POSY,10
		MOV	POSX,13
		CALL	Cursor_Position
		MOV	DX,OFFSET CLVLU
		String_Output
		MOV	POSY,10
		MOV	POSX,13
		CALL	Cursor_Position
		POP	DX
		POP	BX
		POP	AX
		RET

	In_Value_Field_Clear	ENDP

;------------------------------------------------
;	Ertek mezo torlese /output/.		:
;------------------------------------------------

	Out_Value_Field_Clear	PROC	NEAR

		PUSH	AX			;OUT. ertek m. t.
		PUSH	BX
		PUSH	DX
		MOV	POSY,10
		MOV	POSX,52
		CALL	Cursor_Position 	;Cur. pozicionalas
		MOV	DX,OFFSET CLVLU
		String_Output			;Torles
		MOV	POSY,10
		MOV	POSX,52
		CALL	Cursor_Position 	;Visszapozicional
		POP	DX
		POP	BX
		POP	AX
		RET

	Out_Value_Field_Clear	ENDP

;------------------------------------------------
;	Hibamezo torlese.			:
;------------------------------------------------

	Error_Field_Clear	PROC	NEAR

		PUSH	AX			;Hibauzenet mezo t.
		PUSH	BX
		PUSH	DX
		MOV	POSY,15 		;Kezdo poziciok
		MOV	POSX,20
		CALL	Cursor_Position
		MOV	DX,OFFSET CLR		;Torlo string
		String_Output
		MOV	POSY,15 		;Visszapozicional
		MOV	POSX,20
		CALL	Cursor_Position
		POP	DX
		POP	BX
		POP	AX
		RET

	Error_Field_Clear	ENDP

;------------------------------------------------
;	Szamrendszer bekero rutin /input/.	:
;------------------------------------------------

	Input_Num_System_I	PROC	NEAR

		PUSH	AX
		PUSH	DX
	REP1:
		CALL	Error_Field_Clear	;Hibamezo torlese
		CALL	In_Num_Sys_Field_Clear	;Torles
		MOV	BASENUM,10		;10 es szamrendszer
		MOV	SI,49H			;Alapszamrol van szo
		CALL	From_Decimal		;Beker es konvertal
		CMP	TOO,77H
		JZ	ERR1
		CMP	BASENUM,2
		JB	ERR1
		POP	DX
		POP	AX
		RET
	ERR1:
		MOV	POSY,15 		;Hiba eseten
		MOV	POSX,27
		CALL	Cursor_Position
		CALL	Sound_Long		;Hibaszignal
		CALL	Delay_Medium		;Kesleltetes
		CALL	Sound_Long
		mov	cx,26
		MOV	DX,OFFSET ERMS0
		mov	Begin,dx
		call	Write_High_Video	;Hibauzenet ki
		CALL	Delay_Long
		JMP	REP1

	Input_Num_System_I	ENDP

;------------------------------------------------
;	Szamrendszer bekero rutin /output/.	:
;------------------------------------------------

	Input_Num_System_O	PROC	NEAR

		PUSH	AX
		PUSH	DX
	REP2:
		CALL	Error_Field_Clear
		CALL	Out_Num_Sys_Field_Clear ;Torles
		MOV	BASENUM,10		;10 es szamrendszer
		MOV	SI,49H			;Alapszamrol van szo
		CALL	From_Decimal
		CMP	TOO,77H
		JZ	ERR2
		CMP	BASENUM,2
		JB	ERR2
		POP	DX
		POP	AX
		RET
	ERR2:
		MOV	POSY,15 		;Hiba eseten
		MOV	POSX,27
		CALL	Cursor_Position
		CALL	Sound_Long		;Hibaszignal
		CALL	Delay_Medium		;Kesleltetes
		CALL	Sound_Long
		mov	cx,26
		MOV	DX,OFFSET ERMS0
		mov	Begin,dx
		call	Write_High_Video	;Hibauzenet
		CALL	Delay_Long		;Kesleltetes
		JMP	REP2

	Input_Num_System_O	ENDP

;------------------------------------------------
;	Ertek beolvasasa IN. mezobe		:
;------------------------------------------------

	Input_Value	PROC	NEAR

		PUSH	AX
		PUSH	DX
	REP3:
		CALL	Error_Field_Clear	;Mezo torlese /hiba/
		CALL	In_Value_Field_Clear	;Input mezo torlese /ertek/
		MOV	SI,53H			;Ertekrol van szo
		CALL	From_Decimal		;Konvercio dec. bol
		CMP	TOO,77H 		;Tulcsordult ?
		JZ	ERR3			;Igen
		POP	DX
		POP	AX
		RET
	ERR3:
		MOV	POSY,15 		;Hiba eseten
		MOV	POSX,31
		CALL	Cursor_Position
		CALL	Sound_Long		;Hibaszignal
		CALL	Delay_Medium		;Kesleltetes
		CALL	Sound_Long
		mov	cx,16
		MOV	DX,OFFSET ERMS1 	;Hibauzenet
		mov	Begin,dx
		call	Write_High_Video
		CALL	Delay_Long		;Kesleltetes
		JMP	REP3

	Input_Value   ENDP

;------------------------------------------------
;	Ertek kiirasa.				:
;------------------------------------------------

	Output_Value	PROC	NEAR

		CALL	Out_Value_Field_Clear	;Mezo torlese
		CALL	From_Hexadecimal	;Rekonverzio es kiiras
		RET

	Output_Value	ENDP

;------------------------------------------------
;	Kesleltetes.				:
;------------------------------------------------

	Delay_Long	PROC	NEAR

		PUSH	CX			;Kesleltetes
		mov	cx,2
	Long:
		push	cx
		MOV	CX,0
	ONE:
		NOP
		INC	CX			;Novel
		CMP	CX,65534		;Max.
		JB	ONE
		NOP
	TWO:
		NOP				;Csokkent
		LOOP	Two
		pop	cx
		Loop	Long
		POP	CX
		RET

	Delay_Long	ENDP

;------------------------------------------------
;	Beolvasott ertek ellenorzese /nagysag/. :
;------------------------------------------------

	Check_Of_Value	PROC	NEAR

		MOV	TOO,0
		MOV	TLOW,AX 		;Tarolas
		MOV	THIGH,DX
		AND	AX,DX			;Ellenorzes
		MOV	AX,DX
		CMP	AX,3			;Ha 3FFFF nel nagyobb - hiba!
		JA	CHOVER1
		MOV	AX,TLOW 		;Ertekek vissza
		MOV	DX,THIGH
		RET
	CHOVER1:
		MOV	TOO,77H 		;Tulcsordulas
		MOV	BX,0			;Ki kell lepnie a konv. bol
		MOV	AX,TLOW
		MOV	DX,THIGH
		RET

	Check_Of_Value	ENDP

;------------------------------------------------
;	Binaris szam eseten ertekellenorzes.	:
;------------------------------------------------

	Check_Of_Numerical_System	PROC	NEAR

		MOV	TOO,0
		MOV	TLOW,AX 		;Tarolas
		MOV	THIGH,DX
		CMP	DX,0
		JA	CHOVER2
		CMP	AX,36			;Max. 36 szamrendszer.
		JA	CHOVER2
		MOV	AX,TLOW 		;Ertekek vissza
		MOV	DX,THIGH
		RET
	CHOVER2:
		MOV	TOO,77H 		;Tulcsordulas
		MOV	BX,0			;Ki kell lepnie a konv. bol
		MOV	AX,TLOW
		MOV	DX,THIGH
		RET

	Check_Of_Numerical_System	ENDP

;------------------------------------------------
;	Kurzor modositasa.			:
;------------------------------------------------

	Change_Cursor	PROC	NEAR

		PUSH	AX
		PUSH	BX
		PUSH	CX
		MOV	AH,01			;Funkciokod
		MOV	BH,0			;Ig
		MOV	CH,13			;Tol
		MOV	CL,0
		INT	VIDEO
		POP	CX
		POP	BX
		POP	AX
		RET

	Change_Cursor	ENDP

;------------------------------------------------
;	Hang eloallitasa.			:
;------------------------------------------------

	Sound_Short	PROC	NEAR

		PUSH	AX
		PUSH	BX
		push	si
		mov	al,0b6h 		;Idozito uzemmodregiszter jel
		out	67,al			;Kimenet az idozito vezerlo
						;portjara
		mov	si,offset Beep_F	;Hangertek /oszto/ helye
;------------------------------------------------
;	A frekvencia beallitasa az osztoval	:
;------------------------------------------------
		mov	ax,[si] 		;Egy hangertek beolvasasa
		out	66,al			;Az oszto alacsony byte-janak
						;atadasa a kimenetre

		mov	al,ah			;A magas byte attoltese a
						;kimeneti regiszterbe

		out	66,al			;Az oszto magas byte-janak
						;atadasa a kimenetre
		IN	AL,97
		MOV	BL,AL			;BL-ben tarol
		OR	AL,3			;Bekapcsolasi maszk
		OUT	97,AL			;Bekapcsol
		CALL	Delay_Short
		MOV	AL,BL
		OUT	97,AL			;Kikapcsol
		pop	si
		POP	BX
		POP	AX
		RET

	Sound_Short	ENDP

;------------------------------------------------
;	Rovid ideju kesleltetes.		:
;------------------------------------------------

	Delay_Short	PROC	NEAR

			PUSH	CX
			MOV	CX,0
		NEW_DS:
			NOP
			INC	CX
			CMP	CX,2000
			JB	NEW_DS
			POP	CX
			RET

	Delay_Short	ENDP

;--------------------------------------------------------
;	Pici dallam					:
;--------------------------------------------------------

	song	proc	near

		push	ax
		push	cx
		push	si
		mov	al,0b6h 		;Idozito uzemmodregiszter jel
		out	67,al			;Kimenet az idozito vezerlo
						;portjara
		mov	cx,8			;Hangok szama
		mov	si,offset e0		;Hangertek /oszto/ helye
;------------------------------------------------
;	A 8 hangu dallam /big-ben/		:
;------------------------------------------------
	Scale_B:
;------------------------------------------------
;	A frekvencia beallitasa az osztoval	:
;------------------------------------------------
		mov	ax,[si] 		;Egy hangertek beolvasasa
		out	66,al			;Az oszto alacsony byte-janak
						;atadasa a kimenetre

		mov	al,ah			;A magas byte attoltese a
						;kimeneti regiszterbe

		out	66,al			;Az oszto magas byte-janak
						;atadasa a kimenetre
;------------------------------------------------
;	Hang bekapcsolasa			:
;------------------------------------------------
		in	al,97			;A 97. port aktualis bitallasa-
						;nak beolvasasa
		push	ax
		or	al,3			;Az utolso ket bit bekepcsolasa
		out	97,al			;Az uj ertek visszakuldese
		pop	ax			;Eredeti ertek a kikapcsolashoz
		push	cx			;A kitartas miatt
;------------------------------------------------
;	Hang kitartasa				:
;------------------------------------------------
		mov	cx,Dly_Cnt
	Delay_S_B:
		loop	Delay_S_B
;------------------------------------------------
;	A hang kikapcsolasa			:
;------------------------------------------------
		out	97,al			;Kikapcsolas
;------------------------------------------------
;	Ket hang kozti szunet			:
;------------------------------------------------
		mov	cx,Dly_Cnt	  ;Ket hang kozti szunet
	Pause_B:
		loop	Pause_B
		pop	cx
		add	si,2			;Kovetkezo hangra all
		loop	Scale_B
;------------------------------------------------
;	A dallam vege				:
;------------------------------------------------
		pop	si
		pop	cx
		pop	ax
		ret

	song   endp

;------------------------------------------------
;	Hosszu ideju kesleltetes, hiba eseten.	:
;------------------------------------------------

	Delay_Medium	PROC	NEAR

			PUSH	CX
			MOV	CX,0
		NEW_DL:
			NOP
			INC	CX		;Novel
			CMP	CX,60000	;Kesleltetesi ciklusok szama
			JB	NEW_DL
			POP	CX
			RET

	Delay_Medium	ENDP

;------------------------------------------------
;	Zaro scroll.				:
;------------------------------------------------

	ScrollUD	proc	near

			mov	cx,19h
		NewScrl:
			push	cx
			mov	ah,06		;Felfele scroll
			mov	al,1		;1 sort
			mov	bh,7		;Bejovo sor attrib.
			mov	cx,0		;Bal felso koord.
			mov	dh,18h		;Jobb also koord.
			mov	dl,14h
			int	Video
			mov	ah,6
			mov	al,1
			mov	bh,7
			mov	cx,29h
			mov	dh,18h
			mov	dl,3dh
			int	Video
			mov	ah,7		;Lefele scroll
			mov	al,1		;1 sort
			mov	bh,7		;Bejovo sor attrib.
			mov	cx,15h		;Balfelso koord.
			mov	dh,18h		;Jobb also koord.
			mov	dl,28h
			int	Video
			mov	ah,7
			mov	al,1
			mov	bh,7
			mov	cx,3eh
			mov	dh,18h
			mov	dl,4fh
			int	Video
			call	Delay_Short
			pop	cx
			dec	cx
			cmp	cx,0
			jnz	NewScrl
			mov	ah,0		;Kepernyotorles
			mov	bh,0
			int	Video
			ret

	ScrollUD	endp

;--------------------------------------------------------
;	Pici dallam					:
;--------------------------------------------------------

	Sound_Long	proc	near

		push	ax
		push	cx
		push	si
		mov	al,0b6h 		;Idozito uzemmodregiszter jel
		out	67,al			;Kimenet az idozito vezerlo
						;portjara
		mov	cx,6			;Hangok szama
		mov	si,offset First 	;Hangertek /oszto/ helye

;------------------------------------------------
;	A 6 hangu dallam hibajelzesre		:
;------------------------------------------------
	Scale:
;------------------------------------------------
;	A frekvencia beallitasa az osztoval	:
;------------------------------------------------
		mov	ax,[si] 		;Egy hangertek beolvasasa
		out	66,al			;Az oszto alacsony byte-janak
						;atadasa a kimenetre

		mov	al,ah			;A magas byte attoltese a
						;kimeneti regiszterbe

		out	66,al			;Az oszto magas byte-janak
						;atadasa a kimenetre
;------------------------------------------------
;	Hang bekapcsolasa			:
;------------------------------------------------
		in	al,97			;A 97. port aktualis bitallasa-
						;nak beolvasasa
		push	ax
		or	al,3			;Az utolso ket bit bekepcsolasa
		out	97,al			;Az uj ertek visszakuldese
		pop	ax			;Eredeti ertek a kikapcsolashoz
		push	cx			;A kitartas miatt
;------------------------------------------------
;	Hang kitartasa				:
;------------------------------------------------
		mov	cx,20000
	Delay_S:
		loop	Delay_S
;------------------------------------------------
;	A hang kikapcsolasa			:
;------------------------------------------------
		out	97,al			;Kikapcsolas
;------------------------------------------------
;	Ket hang kozti szunet			:
;------------------------------------------------
		mov	cx,10000		;Ket hang kozti szunet
	Pause:
		loop	Pause
		pop	cx
		add	si,2			;Kovetkezo hangra all
		loop	Scale
;------------------------------------------------
;	A dallam vege				:
;------------------------------------------------
		pop	si
		pop	cx
		pop	ax
		ret

	Sound_Long  endp

CODE ENDS

	END	START
