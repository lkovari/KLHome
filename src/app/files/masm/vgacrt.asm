PAGE	66,132

TITLE	VGA CRTC Register Seting

COMMENT *
	Written by László Kõvári  1995.02.13.
		    Last Update  1995.02.14.

	Hungaryan comment

	Program kezelése:

		elözö regiszter érték kiválasztása
		következö regiszter érték kiválasztása
	->	regiszter érték növelése
	<-	regiszter érték csökkentése
	R	regiszterek alaphelyzetbe
	H	kilépés a beállitott regiszterértékek megtartásával
	E	regiszter érték megadása hex. formában
	ESC	kilépés


	English comment:

	Commands:

		Previous register
		Next Register
	->	Increment of reg value
	<-	Decrement of reg value
	R	CRTC. regs. reset. (load the default values)
	H	Exit with Hold the values
	E	Enter a reg value directly in Hexc. format
	ESC	Exit


	*


CODE	SEGMENT PARA	PUBLIC	'CODE'

	ASSUME	CS:CODE,DS:CODE,SS:CODE,ES:NOTHING

		ORG	100H
START:
		JMP	ENTRY

;
;
;	Data section.
;
;
	Copyr	db	'Copyright (C) 1995 by László Kõvári #3647321033$'

	;Default values of various video modes

		;Color 80 03-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vco8003 db	 5Fh,  4Fh,  50h,  82h,  55h, 081h, 0BFh,  1Fh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	   0,  4Fh,  0Dh,  0Eh,    0,	 0,    0,  0A0h
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	 9Ch,  8Eh,  8Fh,  28h,  1Fh,  96h,  0B9h, 0A3h
			;R24
		db	  0

		;Color 40 01-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vco4001 db	 2Dh,	27h,  28h,  90h,  2Bh, 0A0h, 0BFh,  1Fh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	  0h,	4Fh,  0Dh,  0Eh,   0h,	 0h,   0h,  50h,
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	  9Ch,	8Eh,  8Fh,  14h,  1Fh,	96h, 0B9h, 0A3h
			;R24
		db	  0

		;Mono 80 07-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vmo8007 db	 0FFh, 0FFh, 0FFh, 0FFh, 0FFh, 0FFh, 0FFh, 0FFh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	 0FFh, 0FFh, 0FFh, 0FFh, 0FFh, 0FFh, 0FFh, 0FFh
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	 0FFh, 0FFh, 0FFh, 0FFh, 0FFh, 0FFh, 0FFh, 0FFh
			;R24
		db	  0

		;Mono 40 00-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vmo4000 db	  2Dh,	27h,  28h,  90h,  2Bh, 0A0h, 0BFh,  1Fh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	   0h,	4Fh,  0Dh,  0Eh,   0h,	 0h,   0h,  50h
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	  9Ch,	8Eh,  8Fh,  14h,  1Fh,	96h, 0B9h, 0A3h
			;R24
		db	  0

		;Mono 80 50-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vco8050 db	  5Fh,	4Fh,  50h,  82h,  55h,	81h,  0Bh,  3Eh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	   0h,	4Fh,  0Dh,  0Eh,   0h,	 0h,   0h, 0A0h
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	 0EAh,	8Ch, 0DFh,  28h,  1Fh, 0E7h,   4h, 0A3h
			;R24
		db	  0

		;Color 80 51-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vco8051 db	  5Fh,	4Fh,  51h,  82h,  55h,	81h,  0Bh,  3Eh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	   0h,	4Ah,   6h,   7h,   0h,	 0h,   0h, 0A0h
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	 0E9h,	8Bh, 0D8h,  28h,  1Fh, 0E1h,   2h, 0A3h
			;R24
		db	  0

		;Color 80 52-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vco8052 db	  5Fh,	4Fh,  50h,  82h,  55h,	81h,  0Bh,  3Eh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	   0h,	47h,   5h,   6h,   0h,	 0h,   0h, 0A0h
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	 0EAh,	8Ch, 0DFh,  28h,  1Fh, 0E7h,   4h, 0A3h
			;R24
		db	  0

		;Color132 53-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vco8053 db	  9Bh,	83h,  84h,  1Eh,  87h,	1Ah, 0BFh,  1Fh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	   0h,	4Dh,  0Bh,  0Ch,   0h,	 0h,   1h,   8h
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	  84h,	86h,  5Dh,  42h,  1Fh,	61h, 0BCh, 0A3h
			;R24
		db	  0

		;Color132 54-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vco8054 db	  9Bh,	83h,  84h,  1Eh,  87h,	1Ah,   9h,  3Eh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	   0h,	4Fh,  0Dh,  0Eh,   0h,	 0h,   1h,   8h
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	 0EAh,	8Ch, 0DFh,  42h,  1Fh, 0E4h,   5h, 0A3h
			;R24
		db	  0

		;Color132 55-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vco8055 db	  9Bh,	83h,  84h,  1Eh,  87h,	1Ah,   9h,  3Eh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	   0h,	4Ah,   6h,   7h,   0h,	 0h,   1h,   8h
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	 0EAh,	8Ch, 0D8h,  42h,  1Fh, 0DEh,   5h, 0A3h
			;R24
		db	  0

		;Color132 56-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vco8056 db	  9Bh,	83h,  84h,  1Eh,  87h,	1Ah,   9h,  3Eh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	   0h,	47h,   5h,   6h,   0h,	 0h,   1h,   8h
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	 0EAh,	8Ch, 0DFh,  42h,  1Fh, 0E4h,   5h, 0A3h
			;R24
		db	  0

		;Color132 57-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vco8057 db	  9Bh,	83h,  84h,  9Eh,  86h,	1Ah, 0BCh,  1Fh                                                                   
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	   0h,	4Dh,  0Bh,  0Ch,   0h,	 0h,   1h,   8h
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	  83h,	85h,  5Dh,  42h,  1Fh,	61h, 0B9h, 0A3h
			;R24
		db	  0

		;Color132 58-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vco8058 db	  9Bh,	83h,  84h,  9Eh,  86h,	1Ah,   7h,  3Eh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	   0h,	4Fh,  0Dh,  0Eh,   0h,	 0h,   1h,   8h
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	 0E9h,	8Bh, 0DFh,  42h,  1Fh, 0E4h,   3h, 0A3h
			;R24
		db	  0

		;Color132 59-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vco8059 db	  9Bh,	83h,  84h,  9Eh,  86h,	1Ah,   7h,  3Eh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	   0h,	4Ah,   6h,   7h,   0h,	 0h,   1h,   8h
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	 0E5h,	87h, 0D8h,  42h,  1Fh, 0DEh,   3h, 0A3h
			;R24
		db	  0

		;Color132 5A-as mód
			;R0    R1    R2    R3	 R4    R5    R6    R7
	vco805A db	  9Bh,	83h,  84h,  9Eh,  86h,	1Ah,   7h,  3Eh
			;R9    R9    R10   R11	 R12   R13   R14   R15
		db	   0h,	47h,   5h,   6h,   0h,	 0h,   1h,   8h
			;R16   R17   R18   R19	 R20   R21   R22   R23
		db	 0E9h,	8Bh, 0DFh,  42h,  1Fh, 0E4h,   3h, 0A3h
			;R24
		db	  0

	IOAddr	dw	(3D4h)				;CRTC C¡mregiszter
	IOData	dw	(3D5h)				;CRTC Adatregiszter

	R0	db	25	dup(0)			;Actual values

	;Cursor Pos. table

	Cptable db	0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24
	Oldcnt	db	(1)				;
	Regcnt	db	(1)				;Register counter
	Xp	db	(59)				;CRSR pos.
	Yp	db	(0)				;
	Beep_F	dw	(1140)				;C ^^
	Dr	db	(0)				;Direction of Inc.
	Hold	db	(0)				;1 if must hold it
	Clr	db	'  $'                           ;Clear mask
	Exit_	db	0
	Transit db	0
	NotVga	db	13,10,7,'VGA. required! Sorry...',13,10,'$'
	Scr	db	'ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿ Horizontal Total R00..............:    ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿',13,10
		db	'³  SET VGA. CRTC.  ³ Horizontal Display End R01........:    ³    COMMANDS:    ³',13,10
		db	'³    REGISTERS     ³ Start Horizontal Blanking R02.....:    ³                 ³',13,10
		db	'³ShareWare Program.³ End Horizontal Blanking R03.......:    ³  R = Reset CRTC.³',13,10
		db	'³                  ³ Start Horizontal Retrace R04......:    ³  E = Enter a Hex³',13,10
		db	'³Copyright (C) 1995³ End Horizontar Retrace R05........:    ³      Register   ³',13,10
		db	'³ by László Kõvári ³ Vertical Total R06................:    ³      Value      ³',13,10
		db	'ÃÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ´ Overflow R07......................:    ³   = Previous R.³',13,10
		db	'³The 100% Assembly ³ Preset Row Scan R08...............:    ³   = Next reg.  ³',13,10
		db	'³  Source code is  ³ Maximum Scan Line R09.............:    ³ <- = Decrement  ³',13,10
		db	'³Available for US. ³ Cursor Start R0A..................:    ³      Reg Value  ³',13,10
		db	'³    Dollar 10     ³ Cursor End R0B....................:    ³ -> = Increment  ³',13,10
		db	'³     AUTHOR:      ³ Start Address High R0C............:    ³      Reg. Value ³',13,10
		db	'³  László Kõvári   ³ Start Address Low R0D.............:    ³  H = Exit with  ³',13,10
		db	'³22 Kazinczy str.  ³ Cursor Position High R0E..........:    ³      HOLD the   ³',13,10
		db	'³ Sátoralja£jhely  ³ CurSor Position Low R0F...........:    ³      Reg. Values³',13,10
		db	'³      H-3980      ³ Vertical Retrace Start R10........:    ³ESC = Exit       ³',13,10
		db	'³     HUNGARY      ³ Vertical Retrace End R11..........:    ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ',13,10
		db	'ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ Vertical Display End R12..........:    ',13,10
		db	'                     Offset (Logical size) R13.........:    ',13,10
		db	'                     Underline Location R14............:    ',13,10
		db	'                   Start Vertical Blank R15..........:    ',13,10
		db	'                     End Vertical Blanking R16.........:    ',13,10
		db	'                     Mode Control R17..................:    ',13,10
		db	'                     Line Compare R18..................:    $'

	MDA		EQU	0		; Adapter constants
	CGA		EQU	1
	MCGA		EQU	2
	EGA		EQU	3
	VGA		EQU	4
	MONO		EQU	0		; Display constants
	COLOR		EQU	1

	  VMode 	db	?		;Video mode
	  dpage 	db	?		;Page
	  rows		db	?		;Row
	  cols		db	?		;Column
	  display	db	?		;Mono or Color
	  adapter	db	?		;Adapter
	  sgmnt 	dw	?		;SEG. address



	ChrOutp macro

		push	ax
		push	bx
		push	cx
		mov	bh,0
		mov	al,dl
		mov	ah,9
		mov	cx,01
		mov	bl,15
		int	10h
		pop	cx
		pop	bx
		pop	ax

		endm



ENTRY:

;
;
;	Main program.
;
;
		call	Vcfg			;Get Video Cfg.
		cmp	adapter,VGA
		jnz	Message
		jmp	Gooo
	Message:
		mov	ah,9
		mov	dx,offset NotVga
		int	21h
		jmp	Exit_to_Dos
	Gooo:
		call	CRTCRst 		;CRTC reset
		call	Screen			;Cls
		call	DVlu			;Disp Vlu. of reg.
		call	CrsrD			;CRSR disable
		call	RKey			;Read kbd.
		call	CrsrE			;CRSR enable
		cmp	Hold,1
		jz	Hold_the_values
		call	CRTCRst 		;CRTC reset
	Hold_the_values:
		mov	Xp,0
		mov	Yp,23
		call	CurPos
	Exit_to_Dos:
		MOV	AH,0			;Exit to DOS function
		INT	20H			;Call DOS

;--------------------------------------------------------
;	Display Screen mask				:
;--------------------------------------------------------

	Screen	proc	near

		push	ax
		push	dx
		call	Cls			;Clear screen

	;Képernyömaszk megjelenitése

		mov	ah,9
		mov	dx,offset Scr
		int	21h
		mov	Yp,0
		call	CurPos
		pop	dx
		pop	ax
		ret

	Screen	endp

;--------------------------------------------------------
;	CRTC RESET					:
;--------------------------------------------------------

	CRTCRst proc	near


		push	ax
		push	cx
		push	dx
		push	si
		push	di

		push	ds
		pop	es

		mov	di,offset R0		;Values of registers

	;Videó mód lekérdezése

		mov	ah,0fh
		int	10h

	;Color 80 x 25
		cmp	al,3
		jnz	Not_Co8003
	;Color 80x25
		mov	si,offset vco8003
		jmp	Fill_Table
	Not_Co8003:

	;Color 40 x 25
		cmp	al,1
		jnz	Not_Co4001
	;Color 40x25
		mov	si,offset vco4001
		jmp	Change_Mode
	Not_Co4001:

	;Mono 80 x 25
		cmp	al,7
		jnz	Not_Mo8007
	;Mono 80x25
		mov	si,offset vmo8007
		jmp	Fill_Table
	Not_Mo8007:

	;Mono 40 x 25
		cmp	al,0
		jnz	Not_Mo4000
	;Mono 40x25
		mov	si,offset vmo4000
		jmp	Change_Mode
	Not_Mo4000:

	;Color 80 x 30
		cmp	al,50h
		jnz	Not_Co4050
		mov	si,offset vco8050
		jmp	Fill_Table
	Not_Co4050:
	;Color 80 x 43
		cmp	al,51h
		jnz	Not_Co4051
		mov	si,offset vco8051
		jmp	Fill_Table
	Not_Co4051:
	;Color 80 x 60
		cmp	al,52h
		jnz	Not_Co4052
		mov	si,offset vco8052
		jmp	Fill_Table
	Not_Co4052:
	;Color 132 x 25
		cmp	al,53h
		jnz	Not_Co4053
		mov	si,offset vco8053
		jmp	Fill_Table
	Not_Co4053:
	;Color 132 x 30
		cmp	al,54h
		jnz	Not_Co4054
		mov	si,offset vco8054
		jmp	Fill_Table
	Not_Co4054:
	;Color 132 x 43
		cmp	al,55h
		jnz	Not_Co4055
		mov	si,offset vco8055
		jmp	Fill_Table
	Not_Co4055:
	;Color 132 x 60
		cmp	al,56h
		jnz	Not_Co4056
		mov	si,offset vco8056
		jmp	Fill_Table
	Not_Co4056:
	;Color 132 x 25
		cmp	al,57h
		jnz	Not_Co4057
		mov	si,offset vco8057
		jmp	Fill_Table
	Not_Co4057:
	;Color 132 x 30
		cmp	al,58h
		jnz	Not_Co4058
		mov	si,offset vco8058
		jmp	Fill_Table
	Not_Co4058:
	;Color 132 x 43
		cmp	al,59h
		jnz	Not_Co4059
		mov	si,offset vco8059
		jmp	Fill_Table
	Not_Co4059:
	;Color 132 x 60
		cmp	al,5ah
		jnz	Not_Co405A
		mov	si,offset vco805A
		jmp	Fill_Table
	Not_Co405A:
	Change_Mode:
		mov	ah,0
		mov	al,3
		int	10h
		mov	si,offset vco8003

	Fill_Table:
		mov	di,offset R0
		mov	ax,0
		mov	cx,25
		cld
	New_Reg:
		push	ax
		mov	dx,IoAddr		;CRTC Address
	;Select CRTC register
		out	dx,al
	;rték beolvasása
		lodsb				;Read from the Table
	;Send CRTC value
		inc	dx			;Set to IODATA value
		out	dx,al
	;Store value
		stosb				;Store it
		pop	ax			;Next register
		inc	al
		loop	New_reg

		pop	di
		pop	si
		pop	dx
		pop	cx
		pop	ax
		ret

	CRTCRst endp

;--------------------------------------------------------
;	Cursor engedélyezése				:
;--------------------------------------------------------

	CrsrE	proc	near

		push	ax
		push	dx

		mov	dx,IoAddr
		mov	al,0ah
		out	dx,al
		inc	dx
		in	al,dx
		and	al,11011111b		;5. bit set 0
		push	ax
		dec	dx
		mov	al,0ah
		out	dx,al
		inc	dx
		pop	ax
		out	dx,al
		pop	dx
		pop	ax
		ret

	CrsrE	endp

;--------------------------------------------------------
;	Cursor kikapcsolása				:
;--------------------------------------------------------

	CrsrD	proc	near

		push	ax
		push	dx

		mov	dx,IoAddr
		mov	al,0ah
		out	dx,al
		inc	dx
		in	al,dx
		or	al,00100000b		;5. bit set 1
		push	ax
		dec	dx
		mov	al,0ah
		out	dx,al
		inc	dx
		pop	ax
		out	dx,al
		pop	dx
		pop	ax
		ret

	CrsrD	endp

;--------------------------------------------------------
;	CRSR positioning				:
;	Xp- col. Yp- row				:
;--------------------------------------------------------

	CurPos	proc	near

		push	ax
		push	bx
		push	dx
		mov	dl,xp
		mov	dh,yp
		mov	ah,02h
		mov	bh,0
		int	10h
		pop	dx
		pop	bx
		pop	ax
		ret

	CurPos	endp

;--------------------------------------------------------
;	Convert to the dec.				:
;	/Horner/					:
;--------------------------------------------------------


	HexDec	proc	near

		;ax-dx value to convert
		;di numerical system

	Repeat_:
		clc
		div	di				;/num.sys.
		cmp	ax,65534			;If >= FFFe
		jae	HDQuit				;Exit
		call	WriteCon			;Display to the Scrn.
		dec	xp				;Decrement Xp
							;from Back to the front
		mov	dx,0
		cmp	ax,0
		jz	HDQuit
		jmp	Repeat_ 			;Van meg mit osztani
		call	WriteCon			;Legnagyobb helyiertek
							;kiirasa
	HDQuit:
		ret

	HexDec	endp

;--------------------------------------------------------
;	Write the screen with high video mode		:
;--------------------------------------------------------


	WriteCon	proc	near

			push	ax
			push	bx
			cmp	dx,9			;<= 9  ?
			jle	DecimalW		;Y
			add	dx,7			;+7
		DecimalW:
			add	dx,30h			;+48
			call	curpos			;CRSR pos.
			ChrOutp 			;Display a digit
		WQuit:
			pop	bx
			pop	ax
			ret

	WriteCon	endp

;------------------------------------------------
;	Clear Screen				:
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
;	Display vlu.					:
;--------------------------------------------------------

	DVlu	proc	near

		push	ax
		push	cx
		push	dx
		push	si
		push	di

		mov	al,RegCnt
		push	ax
		mov	ax,1
		mov	si,offset Cptable	;Bof CRSR pos. table
		mov	di,offset R0
		mov	cx,25			;25 value
	New_Value:
		push	cx
		push	si
		push	di
		mov	RegCnt,al
		call	Clrf			;Clear field of value
		mov	al,byte ptr [si]	;Y value
		mov	Yp,al
		call	CurPos			;CRSR positioning
		xor	ax,ax
		xor	dx,dx
		mov	al,byte ptr [di]	;Value of register
		mov	di,16
		mov	Xp,58
		call	HexDec			;Display
		pop	di
		pop	si
		inc	si
		inc	di
		pop	cx
		loop	New_Value		;New value
		pop	ax
		mov	RegCnt,al
		call	DMarker

		pop	di
		pop	si
		pop	dx
		pop	cx
		pop	ax
		ret

	DVlu	endp

;--------------------------------------------------------
;	Display Marker					:
;--------------------------------------------------------

	DMarker proc	near


		push	ax
		push	bx
		push	dx
		push	si

	;Clear old marker

		mov	Xp,58
		mov	si,offset CpTable
		xor	ax,ax
		mov	al,OldCnt
		sub	al,1
		add	si,ax
		mov	al,byte ptr [si]
		mov	Yp,al
		inc	Xp
		call	CurPos
		mov	dl,' '
		ChrOutP

	;Display New marker

		mov	Xp,58
		mov	si,offset CpTable
		xor	ax,ax
		mov	al,RegCnt
		sub	al,1
		add	si,ax
		mov	al,byte ptr [si]
		mov	Yp,al
		inc	Xp
		call	CurPos
		mov	dl,'<'
		ChrOutP
		call	Shee			;Beep sound

		pop	si
		pop	dx
		pop	bx
		pop	ax
		ret

	DMarker endp

;--------------------------------------------------------
;	Display a values of registers			:
;--------------------------------------------------------

	Drvlu	proc	near

		push	ax
		push	bx
		push	dx
		push	si
		push	di

		call	Clrf			;Clear field of Vlu.
		mov	si,offset Cptable
		xor	ax,ax
		mov	al,RegCnt		;Actual reg.
		sub	al,1			;-1
		add	si,ax			;Actual CRSR pos.
		mov	al,byte ptr [si]	;Y pos.
		mov	Yp,al
		call	CurPos
		mov	si,offset R0
		xor	ax,ax
		mov	al,RegCnt
		sub	al,1			;-1
		add	si,ax
		xor	ax,ax
		xor	dx,dx
		mov	al,byte ptr [si]	;Value of a register
		mov	di,16
		mov	Xp,58
		call	HexDec			;Display in hex. format

		pop	di
		pop	si
		pop	dx
		pop	bx
		pop	ax
		ret

	Drvlu	endp

;--------------------------------------------------------
;	Scan keyboard					:
;--------------------------------------------------------

	Rkey	proc	near


		push	ax
	New_Key:
		mov	ah,7
		int	21h
		cmp	al,0
		jnz	Not_Extended
		int	21h
		cmp	al,48h			;Up
		jnz	Next_1
	;Regiszter léptetés fel
		mov	al,RegCnt
		mov	OldCnt,al
		dec	RegCnt			;Upper a line
		cmp	RegCnt,1
		jnb	Okl
		inc	RegCnt
	Okl:
		call	DMarker 		;Move Marker
		jmp	New_Key
	Next_1:
		cmp	al,50h			;Down
		jnz	Next_2
	;Regiszter léptetés le
		mov	al,RegCnt
		mov	OldCnt,al
		inc	RegCnt			;Down a line
		cmp	RegCnt,25
		jna	Okh
		dec	RegCnt
	Okh:
		call	DMarker 		;Move Marker
		jmp	New_Key
	Next_2:
		cmp	al,4dh			;Right
		jnz	Next_3
	;rték csökkentés
		stc
		call	ModVlu			;Modify values increment
		jmp	New_Key
	Next_3:
		cmp	al,4bh			;Left
		jnz	New_Key
	;rték növelés
		clc
		call	ModVlu			;Modify values decrement
		jmp	New_Key
	Not_Extended:
		cmp	al,1bh
		jz	Exit
		cmp	al,'R'
		jnz	Next_Chk
		call	CRTCRst 		;CRTC reset.
		call	Clrf			;Clear Actual field
		call	DVlu			;Display value
		call	CrsrD			;CRSR Disable
		call	DMarker 		;Display Marker
		call	Shee
		jmp	New_Key
	Next_Chk:
		cmp	al,'r'
		jnz	Next_chk0
		call	CRTCRst 		;CRTC regs. reset
		call	Clrf			;Clear actual field
		call	DVlu			;Display values
		call	CrsrD			;CRSR disable
		call	DMarker 		;Disp marker
		call	Shee
		jmp	New_Key
	Next_Chk0:
		cmp	al,'H'
		jz	Hold_values
		cmp	al,'h'
		jnz	Not_H
	Hold_values:
		mov	hold,1
		jmp	Exit
	Not_H:
		cmp	al,'E'
		jz	Enter_Hex
		cmp	al,'e'
		jnz	New_Key
	Enter_Hex:
		call	CrsrE
		call	EntHex
		call	CrsrD
		jmp	New_Key
	Exit:
		call	Shee
		pop	ax
		ret

	RKey	endp

;--------------------------------------------------------
;	Modify the CRTC registers values		:
;--------------------------------------------------------

	ModVlu	proc	near

		push	ax
		push	bx
		push	dx
		push	si

		jc	Incr
		mov	al,'D'
		mov	Dr,al
		jmp	Cont0
	Incr:
		mov	al,'I'
		mov	Dr,al
	Cont0:
		mov	si,offset R0
		xor	ax,ax
		mov	al,RegCnt
		sub	al,1			;-1
		mov	bx,ax
		add	si,ax
		mov	al,byte ptr [si]	;Load value
		cmp	Dr,'I'
		jz	Increment
		dec	al			;Decrement
		jmp	Send_Out		;Send
	Increment:
		inc	al			;Increment
	Send_Out:
		push	ax			;Store vlu.
		mov	dx,IoAddr		;CRTC Address
	;CRTC Sel. Reg.
		mov	ax,bx			;Regiszter
		out	dx,al			;Select CRTC reg.
		inc	dx			;Data port
		pop	ax			;Vlu. back
	;Send Value to the CRTC
		out	dx,al
		mov	si,offset R0
		xor	cx,cx
		add	si,bx
		mov	byte ptr [si],al	;Store the modifyed vlu.
	;Disdplay Value
		call	DrVlu			;Display it
		call	Shee

		pop	si
		pop	dx
		pop	bx
		pop	ax
		ret

	ModVlu	endp

;------------------------------------------------
;	Make a Sound				:
;------------------------------------------------

	Shee	PROC	NEAR

		PUSH	AX
		PUSH	BX
		push	si
		mov	al,0b6h 		;Timer Ctrl. Reg. sign
		out	67,al			;Output to the tioming Ctrl.
						;Port.
		mov	si,offset Beep_F	;Place of divider
;------------------------------------------------
;	Set the frequecny with a divider	:
;------------------------------------------------
		mov	ax,[si] 		;Read a sound value
		out	66,al			;Store the output of the
						;divider's low byte

		mov	al,ah			;Store the output reg.

		out	66,al			;Store the output of the
						;divider's high byte
		IN	AL,97
		MOV	BL,AL			;Store to BL
		OR	AL,3			;Switch on mask
		OUT	97,AL			;Switch on
		CALL	Delay_Short
		MOV	AL,BL
		OUT	97,AL			;Switch off
		pop	si
		POP	BX
		POP	AX
		RET

	Shee	ENDP

;------------------------------------------------
;	Rovid ideju kesleltetes.		:
;------------------------------------------------

	Delay_Short	PROC	NEAR

			PUSH	CX
			MOV	CX,1000
		NEW_DS:
			LOOP	NEW_DS
			POP	CX
			RET

	Delay_Short	ENDP

;--------------------------------------------------------
;	Aktuális érték mezö törlése			:
;--------------------------------------------------------

	Clrf	proc	near

		push	ax
		push	dx
		push	si

		mov	si,offset Cptable
		xor	ax,ax
		mov	al,RegCnt
		sub	al,1			;1
		add	si,ax
		mov	al,byte ptr [si]	;Read Y pos.
		mov	Yp,al
		mov	Xp,57
		call	CurPos			;Positioning
		mov	ah,9
		mov	dx,offset Clr
		int	21h
		mov	Xp,58

		pop	si
		pop	dx
		pop	ax
		ret

	Clrf	endp

;--------------------------------------------------------
;	Get viodeo configuration			:
;--------------------------------------------------------

	Vcfg	proc	near

		mov	ax, 1A00h		; Get video info for VGA
		int	10h
	chkVGA:
		cmp	al, 1Ah 		; Is VGA or MCGA present?
		jne	chkEGA			; No?  Then check for EGA

		cmp	bl, 2			; If VGA exists as secondary adapter,
		je	isCGA			;   check for CGA and mono as primary
		jb	isMONO
		cmp	bl, 5			; If EGA is primary, do normal
		jbe	chkEGA			;   EGA checking
	chkMCGA:
		mov	adapter,2		; Yes?	Assume MCGA
		mov	display,1
		cmp	bl, 8			; Correct assumption?
		ja	gotmode 		; Yes?	Continue
	isVGA:
		mov	adapter,4		; Assume it's VGA color
		je	gotmode 		; Yes?	Continue
		mov	display,0		; No?  Must be VGA mono
		jmp	gotmode 		; Finished with VGA, so jump
	chkEGA:
		mov	ah, 12h 		; Call EGA status function
		mov	bl, 10h
		sub	cx, cx			; Clear status bits
		int	10h
		jcxz	chkCGA			; If CX is unchanged, not EGA
	isEGA:
		mov	adapter,3		; Set structure fields for EGA
		mov	display,0		; Assume EGA mono
		or	bh, bh			; Correct assumption?
		jnz	gotmode 		; Yes?	Continue
		mov	display,1		; No?  Must be EGA color
		jmp	gotmode 		; Finished with EGA, so jump
	chkCGA:
		int	11h			; Get equipment list
		and	al, 30h 		; If bits 4-5 set, monochrome
		cmp	al, 30h 		; Monochrome text mode?
		je	isMONO			; Yes?	Continue
	isCGA:
		mov	adapter,1		; No?  Must be CGA
		mov	display,1
		jmp	gotmode
	isMONO:
		mov	adapter,0		; Set MONO
		mov	display,0
	gotmode:
		mov	ah, 0Fh
		int	10h			; Get current mode
		mov	VMode, al		; Record mode
		mov	dpage, bh		;   and current page
		mov	al,display		; Multiply display value
		cbw				;   (which is either 0 or 1)
		mov	bx, 800h		;   by 800h, then add to 0B000h
		mul	bx			;   for segment address of
		add	ax, 0B000h		;   video buffer
		add	ah,dpage		; Adding display page gives
		mov	sgmnt, ax		;   address of current page

		sub	ax, ax
		mov	es, ax
		mov	al, es:[44Ah]		; Get number of display cols
		mov	cols, al		; Store in structure
		mov	rows, 24		; Assume bottom row # = 24
		cmp	adapter,3		; EGA or VGA?
		jl	Exit_from_Vcfg		; No?  Exit
		mov	ax, 1130h		; Yes?	Request character info
		sub	bh, bh			; Set BH to valid value
		push	bp			; BP will change, so save it
		int	10h			; Get number of rows/screen
		mov	rows, dl		; Keep in structure
		pop	bp			; Restore BP
	Exit_from_Vcfg:
		ret

	Vcfg	endp

;--------------------------------------------------------
;	Enter a Hex Value				:
;--------------------------------------------------------

	EntHex	proc	near

		mov	al,Xp
		push	ax
		mov	al,Yp
		push	ax
		;Enter a value
	New_Hex:
		mov	Xp,57
		call	CurPos
		mov	ah,9
		mov	dx,offset Clr
		int	21h
		call	CurPos

		mov	bx,2
		mov	di,16
		call	decto
		cmp	ax,255
		ja	New_Hex
		push	si
		push	ax
		push	bx
		mov	bx,offset R0			;Bof. Reg. table
		xor	ax,ax
		mov	al,RegCnt			;Current
		dec	al
		add	ax,bx
		mov	si,ax
		pop	bx
		pop	ax
		mov	byte ptr [si],al		;Store
		push	ax
		mov	al,RegCnt
		mov	dx,IoAddr			;Address of CRTC
		out	dx,al
		inc	dx				;DATA port
		pop	ax
		out	dx,al				;Send to the CRTC
		pop	si
		pop	ax
		mov	Yp,al				;Restore X & Y pos.
		pop	ax
		mov	Xp,al
		ret

	EntHex	endp

;--------------------------------------------------------
;	Convert to HEX. 				:
;		di     - Numerical system		:
;		bx     - length 			:
;		ax,dx, - value				:
;		cx     - work reg.			:
;--------------------------------------------------------

	decto	proc	near

		push	bx
		push	cx
		mov	ax,0
		mov	ch,0
		mov	Exit_,0
	Repeath:
		call	Readkbd 			;Read from kbd.
		cmp	Exit_,1
		jz	Exit_from_Decto
		mul	di				;* num. system
		add	ax,cx
		adc	dx,0				;Add Carry
		cmp	bx,0
		jnz	Repeath 			;Repeat
	Exit_from_Decto:
		pop	cx
		pop	bx
		ret

	decto	endp

;--------------------------------------------------------
;	Read a character into CX			:
;--------------------------------------------------------

	Readkbd proc	near

		push	dx
		push	ax
	wrong:
		mov	ah,07				;Fkod
		int	21h
		mov	transit,al			;Store the readed Vlu
		mov	cl,al
		cmp	cl,13				;Enter
		jz	rquit
		mov	ch,0
		cmp	cl,30h				;< 0 ?
		jl	wrong				;Error
		cmp	cl,57				;> 9 ?
		jg	Abc_
		sub	cl,30h
		cmp	cl,9				;> 9 ?
		jle	decimalr			;No
		sub	cl,7
		jmp	Decimalr
	Abc_:
		cmp	cl,65				;< A ?
		jb	Wrong
		cmp	cl,90				;> Z ?
		jbe	Is_ABC
		cmp	cl,97				;< a ?
		jb	Wrong
		cmp	cl,122				;> z ?
		ja	Wrong
		sub	cl,32				;To Upper Case
		mov	Transit,cl			;Store as Upper case
	Is_ABC:
		sub	cl,55				;To numeric
	decimalr:
		cmp	cx,di				;> Num. system ?
		ja	wrong				;Error
		mov	ah,02				;Display it
		mov	dl,transit
		int	21h
		dec	bx
		jmp	C0_
	rquit:
		mov	bx,0
		mov	Exit_,1
	C0_:
		pop	ax
		pop	dx
		ret

	Readkbd endp

CODE	ENDS

	END	START
