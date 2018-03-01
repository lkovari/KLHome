PAGE	66,132

TITLE	Cracker_Tool_Machine_Slow

COMMENT *
	Written by László Kővári  1993.04.30.
		    	 Last Update  1993.04.30.


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

	Cntl	dw	(0b840h)
	Oldint1c	dd	?


;--------------------------------------------------------
;	Sajat Int  1ch rutin				 :
;--------------------------------------------------------

	Newint1c	 proc	 far

						;sp+24	FLAGS
						;sp+22	CS
						;sp+20	IP
			pushf			;sp+18
			push	ds		;sp+16
			push	es		;sp+14
			push	ax		;sp+12
			push	bx		;sp+10
			push	cx		;sp+08
			push	dx		;sp+06
			push	di		;sp+04
			push	si		;sp+02
			push	bp		;verem tetej�n

		;00000100	CTRL
		;00000010	Left
		;00000001	Right

			mov	ah,2
			int	16h
			push	ax
			and	al,00000110b
			cmp	al,00000110b		;CTRL Left SHIFT?
			jnz	Not_CTRL_LShift
			cmp	Cntl,200
			jbe	Not_Sub
			sub	Cntl,1000
			call	Beep
		Not_Sub:
			pop	ax
			jmp	Delay
		Not_CTRL_LShift:
			pop	ax
			and	al,00000101b
			cmp	al,00000101b		;CTRL Right SHIFT?
			jnz	Not_CTRL_RShift
			cmp	Cntl,64000
			jae	Not_add
			add	Cntl,1000
			call	Beep
		Not_Add:
		Not_CTRL_RShift:
		Delay:
			mov	cx,Cntl
		Loop_0:
			nop
			loop	Loop_0
		Exit_from_1c:
			pop	bp
			pop	si
			pop	di
			pop	dx
			pop	cx
			pop	bx
			pop	ax
			pop	es
			pop	ds
			popf
			jmp	cs:Oldint1c		 ;ugras az eredetire

	Newint1c	 endp

	Beep_	dw	(1140)		;C ^^

;------------------------------------------------
;	Show beep				:
;------------------------------------------------

	Beep	PROC	NEAR

		PUSH	AX
		PUSH	BX
		push	si
		mov	al,0b6h 		;Idozito uzemmodregiszter jel
		out	67,al			;Kimenet az idozito vezerlo
						;portjara
		mov	si,offset Beep_ 	;Hangertek /oszto/ helye
;------------------------------------------------
;	Set a frequ. with the divider		:
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

	Beep	ENDP

;------------------------------------------------
;	Short beep				:
;------------------------------------------------

	Delay_Short	PROC	NEAR

			PUSH	CX
			MOV	CX,0
		NEW_DS:
			NOP
			INC	CX
			CMP	CX,3000
			JB	NEW_DS
			POP	CX
			RET

	Delay_Short	ENDP

	Myp		Label	Far

ENTRY:

;
;
;	Main program.
;
;

;--------------------------------------------------------
;	Magahozveszi a	1c  It. ellenorzeset		 :
;--------------------------------------------------------


			mov	ah,35h
			mov	al,242			;f2h
			int	21h			;El volt mar inditva
							;a program ?
			cmp	bx,7777h
			jz	Already_Resident	;mar rezidens

	;Az F2h interrupt ha 7777h akkor mar rezidens a
	;program a memoriaban.

			mov	ah,25h			;beallitja a flage-et
			mov	al,242
			mov	dx,7777h
			int	21h

			jmp	Set_int1c		 ;INT 1c  atvetele

		Already_Resident:

			mov	ah,9
			mov	dx,offset Already_Res
			int	21h
			jmp	Exit_To_Dos		;kilepes

		Set_int1c:

			mov	ah,9
			mov	dx,offset Maker
			int	21h

			mov	ax,351ch
			int	21h
			mov	si,offset Oldint1c
			mov	[si],bx 		;offszet
			add	si,2
			mov	[si],es 		;szegmens

			push	cs
			pop	ds

			mov	ax,251ch		;INT 1c
			mov	dx,offset Newint1c
			int	21h			;atallitjuk sajatra

			mov	dx,offset Myp
			inc	dx
			push	ds
			pop	es
			int	27h			;rezidens kilepes

		Exit_To_Dos:

			mov	ah,0
			int	20h			;kilepes

	Maker	db	'+---------------------------------------------------+',10,13
		db	'| Cracker Tool Machine Slow       Freeware program! |',10,13
		db	'|    CTRL L Shift to Fast - CTRL R Shift to Slow    |',10,13
		db	'| Copyright (C) 1993 by László Kővári #!364121033 |',10,13
		db	'+---------------------------------------------------+',10,13,'$'

	Already_Res	db	'+---------------------------------------------------+',10,13
			db	'| The Machine Slow is already RESIDENT!             |',10,13
			db	'|                                                   |',10,13
			db	'| Copyright (C) 1993 by László Kővári #!364121033 |',10,13
			db	'+---------------------------------------------------+',10,13,'$'

CODE	ENDS

	END	START
