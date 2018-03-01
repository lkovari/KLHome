PAGE	71,132

TITLE	Memory Spy

COMMENT *
	Written by L�szl� K�v�ri  1990.05.16.
		     Last Update  1990.05.22.

	Display a real & phisical memory sizes.

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


;--------------------------------------------------------
;	Karakter ki�r�s MACRO				:
;--------------------------------------------------------

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

	Copyright db	'Copyright (C) 1990 by László Kővári #!3647321033'
	CrLf	db	10,13,'$'
	Xp	db	0			;CRSR. pos.
	Yp	db	0
	As	dw	0			;Current paragraph

	SMask		db	'+-----------------------------------------------+',10,13
			db	'| MEMORY SPY                  Freeware program! |',10,13
			db	'|                                               |',10,13
			db	'|   Found the total memory to be : 0000 K byte. |',10,13
			db	'|   Total memory reported by DOS : 0000 K byte. |',10,13
			db	'|                    Free memory : 0000 K byte. |',10,13
			db	'|                                               |',10,13
			db	'|      Copyright (C) 1990 by László Kővári      |',10,13
			db	'|                #!3647321033                 |',10,13
			db	'+-----------------------------------------------+',10,13,'$'


ENTRY:

;
;
;	Main program.
;
;

	;Display screen mask

		mov	ah,9
		mov	dx,offset SMask
		int	21h

	;Get CRSR. pos.

		call	GetCRSR
		xor	ax,ax
		mov	al,Yp
		sub	ax,7

	;Set CRSR. pos.

		mov	Yp,al
		mov	Xp,38
		call	CurPos

	;Scan the total memory size

		cli
		mov	ax,cs
		dec	ax			;Memory Control Block Segment
		mov	ds,ax			;MCB. seg to DS
		mov	bx,12h			;12hth.pos. max. mem.size
		mov	ax,[bx] 		;max. mem for DOS.
		mov	cs:As,ax		;from here
		mov	ds,ax
		mov	ax,65535		;FFFFh-max= will scan paragr.
		sub	ax,cs:As
		mov	cx,ax
	New_Word:
		push	cx
		mov	ax,77h			;check code
		xor	si,si			;for paragraph limit
		mov	bl,byte ptr [si]	;save the original value

	;I original value=77h then the check is fail with
	;the 77h code

		cmp	bl,77h			;77h is original ?
		jnz	Not_Equel		;no
		mov	ax,76h			;if 77h then 76h is used
	Not_Equel:
		mov	byte ptr [si],al	;write check code
		mov	ah,byte ptr [si]	;read check code

	;What is the check code?

		cmp	bl,77h
		jnz	Not_Equel1		;was 77h
		cmp	ah,76h
		jnz	Not_Ram 		;not equ. or isn't RAM.
						;or ROM was here
		jmp	Continue7		;Continue

	;Get the writed?

	Not_Equel1:
		cmp	ah,77h			;is a writed?
		jnz	Not_Ram 		;No

	;Write back the original value

	Continue7:
		mov	byte ptr [si],bl	;OK.
		jmp	Next_PgPh		;next paragraph
	Not_Ram:

		xor	dx,dx
		mov	ax,cs:As
		mov	bx,16
		mul	bx			;in DX-AX RAM size in byte
		mov	bx,1024
		div	bx			;in AX RAM size in K

	;Display the RAM size in K byte

		pop	cx
		jmp	Exit_from_RAMScan	;Ezit

	Next_Pgph:

		inc	cs:As			;Next paragraph
		mov	ax,cs:As
		mov	ds,ax			;move in DS
		pop	cx
		loop	New_Word

	Exit_from_RAMScan:

		push	cs
		pop	ds			;DS=CS

		sti

	;Convert & write

		mov	di,10
		xor	dx,dx
		call	HexDec

	;Get the memory size reported by DOS.

		mov	ax,ds
		dec	ax
		mov	ds,ax
		mov	si,12h
		mov	ax,[si] 		;reported by DOS.
		xor	dx,dx
		mov	bx,16
		mul	bx			;*16 (because paragraph)
		mov	bx,1024
		div	bx			;/1024
		xor	dx,dx			;in AX memory size in K
		mov	di,10

	;Set CRSR.

		call	GetCRSR
		inc	Yp
		mov	Xp,38
		call	CurPos
		call	HexDec


	;Calculate the free memory size

		mov	si,3
		mov	ax,[si] 		;free mem. in  paragraph
		push	cs			;1 word from the MCB, 3th. byte
		pop	ds			;DS=CS
		xor	dx,dx
		mov	bx,16
		mul	bx			;*16
		mov	bx,1024
		div	bx			;/1024
		xor	dx,dx			;in AX memory size in K.
		mov	di,10			;10th. numerical system

	;Set CRSR.

		call	GetCRSR
		inc	Yp
		mov	Xp,38
		call	CurPos
		call	HexDec			;Convert & display


	;Line feed

		mov	ah,9
		mov	dx,offset CrLf
		int	21h			;Write string
		mov	ah,9
		mov	dx,offset CrLf
		int	21h
		mov	ah,9
		mov	dx,offset CrLf
		int	21h
		mov	ah,9
		mov	dx,offset CrLf
		int	21h

		MOV	AH,0			;Exit to DOS function
		INT	20H			;Call DOS

;------------------------------------------------
;	Clear screen				:
;------------------------------------------------

	Cls	proc	near

		push	ax
		push	bx
		mov	ah,0fh
		int	10h			;Mode
		mov	ah,00
		mov	bh,0
		int	10h			;Clear screen BIOS service
		pop	bx
		pop	ax
		ret

	Cls	endp

;--------------------------------------------------------
;	SER CRSR.					:
;	In Xp & Yp variable the column & row		:
;--------------------------------------------------------

	CurPos	proc	near

		push	ax
		push	bx
		push	dx
		mov	dl,xp
		mov	dh,yp
		mov	ah,02h
		mov	bh,0
		int	10h			;Video service
		pop	dx
		pop	bx
		pop	ax
		ret

	CurPos	endp

;--------------------------------------------------------
;	Get CRSR. pos.					:
;	In Xp,Yp variables				:
;--------------------------------------------------------

	GetCRSR proc	near

		push	ax
		push	dx
		mov	ah,0fh
		int	10h
		mov	ah,3
		int	10h
		mov	Xp,dl			;Column
		mov	Yp,Dh			;Row
		pop	dx
		pop	ax
		ret

	GetCRSR endp

;--------------------------------------------------------
;	Convert the value to other numerical system	:
;	In DI the numerical system			:
;	In AX:DX the value				:
;	/Horner/					:
;--------------------------------------------------------


	HexDec	proc	near

	Repeat_:
		clc
		div	di				;/10
		cmp	ax,65534
		jae	HDQuit				;Exit
		call	WriteCon			;Display
		dec	xp
		mov	dx,0
		cmp	ax,0
		jz	HDQuit
		jmp	Repeat_
		call	WriteCon

	HDQuit:
		ret

	HexDec	endp

;--------------------------------------------------------
;	Display with high video mode			:
;--------------------------------------------------------

	WriteCon	proc	near

			push	ax
			push	bx
			cmp	dx,9
			jle	DecimalW
			add	dx,7
		DecimalW:
			add	dx,30h
			call	curpos
			ChrOutp
		WQuit:
			pop	bx
			pop	ax
			ret

	WriteCon	endp


CODE	ENDS

	END	START
