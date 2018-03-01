PAGE	66,132

TITLE	Find File with RECURSIV procedure

COMMENT *

	Written by László Kõvári  1990.12.06.
		    Last Update  1991.01.02.

	Recursive algorithm:

					+---------+
					|  WALK   |
					+---------+
                                         | | | 	|			
		 +-----------------------+ | |	|
		 |	     +-------------+ |	+------------+
		 |           |               |               |
	    +---------+ +---------+	+---------+	+---------+
	    |FindFirst| |CheckEnt.|	|EntryITER|	|   END   |
	    +---------+ +---------+	+---------+	+---------+
					     ³
					ÚÄÄÄÄÁÄÄÄÄ¿ F1
					³  ITER.  ³
					ÀÄÂÄÄÂÄÄÂÄÙ
					  ³  ³	³
			     ÚÄÄÄÄÄÄÄÄÄÄÄÄÙ  ³	ÀÄÄÄÄÄÄÄÄÄÄÄÄ¿
			ÚÄÄÄÄÁÄÄÄÄ¿	ÚÄÄÄÄÁÄÄÄÄ¿	ÚÄÄÄÄÁÄÄÄÄ¿
			³ DIR.SEL.³	³FindNext ³	³CheckEnt.³
			ÀÄÄÄÄÂÄÄÄÄÙ	ÀÄÄÄÄÄÄÄÄÄÙ	ÀÄÄÄÄÄÄÄÄÄÙ
			     ³
			ÚÄÄÄÄÁÄÄÄÄ¿F2
			³   DIR. ø³
			ÀÄÂÄÄÂÄÄÂÄÙ
			  ³  ³	³
	     ÚÄÄÄÄÄÄÄÄÄÄÄÄÙ  ³	ÀÄÄÄÄÄÄÄÄÄÄÄÄ¿
	ÚÄÄÄÄÁÄÄÄÄ¿	ÚÄÄÄÄÁÄÄÄÄ¿	ÚÄÄÄÄÁÄÄÄÄ¿
	³ PUSH	  ³	³CALL WALK³	³   POP   ³
	ÀÄÄÄÄÄÄÄÄÄÙ	ÀÄÄÄÄÄÄÄÄÄÙ	ÀÄÄÄÄÄÄÄÄÄÙ
		     (Recursive Call)


	F1=Directory entry is found
	F2=If directory entry is a real directory
	   (Attrib=10h and not administrative entry)

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
	Path	db	80	dup	(0)
	Head	db	13,10,'FILE SEARCH (Info.: FS /?)',13,10,13,10,'$'
	ErrorF	db	'File not found',13,10,'$'
	Bad_Dr	db	'Invalid drive',13,10,'$'
	Usage	db	'USAGE: FS dr:fn.ext /attr.',13,10,13,10
		db	'Copyright (C) 1991 by László Kõvári'
	CrLf	db	13,10,'$'                       ;Soremel‚s
	Address db	13,10,13,10
		db	'         The assembly source file is available for US. $'
	money	db	'3 or 300 HUF.',13,10
		db	'                           Write to László Kõvári',13,10
		db	'                                    22 Kazinczy street',13,10
		db	'                                    S toralja£jhely',13,10
		db	'                                    3980',13,10
		db	'                                    HUNGARY',13,10,13,10,'$'
	Ext	db	'\*.*',0                        ;File spec.
	FileN	db	13 dup (0)			;File name
	Attrib	dw	(20h)				;Attrib
	AttrD	db	0				;1 if default attrib.
	LegalA	db	'ASHRN'                         ;Valid attribs
	Bop	dw	(0103h) 			;Begin of path
	Eop	dw	(0105h) 			;End of path
	Bod	dw	(0)				;Current DTA
	FoundE	dw	(0)				;1 if dir. entry
	ThisDir db	(0)				;1 if entry is DIR.
	Was	db	(0)				;1 if was a file
	Drive	equ	5ch				;Drive code
	Clon	dw	(0)				;Contents of command ln.
							;in byte
	TBoD	dw	(0)				;DTA transit place
	Fcb1	equ	5ch				;Begin of First FCB.
	NoFl	dw	(0)				;Num. of fi. low word
	NoFh	dw	(0)				;Num. of fi. high word
	Xp	db	0				;Column
	Yp	db	0				;Row
	Fi_Fnd	db	'file(s) found...',13,10,13,10,'$'
	Used_t	db	'Elapsed time is   :  :  .  $'
	B_h	db	0				;Begin of search
	B_m	db	0
	B_s	db	0
	B_d	db	0
	E_h	db	0				;End of search
	E_m	db	0
	E_s	db	0
	E_d	db	0
	U_h	db	0				;Elapsed time
	U_m	db	0
	U_s	db	0
	U_d	db	0

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

	;Display header

		push	ax
		mov	ah,9
		mov	dx,offset Head
		int	21h
		pop	ax

	;Drive code is valid ?

		cmp	al,0ffh
		jnz	Correct_Dr		;No
		mov	ah,9
		mov	dx,offset Bad_Dr
		int	21h			;Disp. err. mess.
		jmp	Exit_to_Dos		;Exit
	Correct_Dr:
		mov	si,Fcb1
		mov	al,byte ptr [si]	;Drive
		or	al,al			;Zero ?
		jnz	Drive_Ok		;Drive is set ?

	;Get current drive

		mov	ah,19h
		int	21h
		inc	al
	Drive_Ok:

	;Store the drive code

		add	al,40h
		mov	byte ptr Path,al	;Drive
		mov	di,offset Path
		inc	di
		mov	al,':'                  ;":"
		stosb
		mov	si,offset Path
		mov	BoP,si			;Begin of path
		add	si,2
		mov	EoP,si			;End of path

	;Length of command line

		mov	si,80h
		mov	cx,[si]
		mov	ch,0
		inc	cx
		mov	Clon,cx

	;Convert to CAPITAL alfabet the contents of command line

		mov	cx,Clon 		;Len. of cmd. line
		mov	si,81h
		call	UpperC

	;look at for a file name

		mov	al,'.'
		mov	di,81h
		cld
		mov	cx,Clon
		call	Find_B
		jnc	Was_Fn			;Ok

	;Default file name

	FN_Not_Found:
		mov	si,offset Ext
		inc	si
		mov	di,offset FileN
		mov	cx,4
		call	Copy_B
		jmp	File_Name_Correct
	Was_Fn:

	;is ":" in the cmd. line ?

		mov	al,':'
		mov	cx,Clon
		mov	di,81h
		call	Find_B			;":" find that
		jnc	Drive_Cd_Ok		;found
		mov	si,81h
		mov	cx,Clon
	Read_Char:
		lodsb
		cmp	al,20h
		jnz	Not_Sp			;begin of file name
		loop	Read_Char
		jmp	FN_Not_Found
	Drive_Cd_Ok:
		mov	si,di			;in SI the begin of...
		jmp	Cont0
	Not_Sp:
		dec	si
	Cont0:
		mov	bx,si
		mov	di,offset FileN
	Read_FN:
		lodsb				;get & store
		cmp	al,20h
		jz	Exit_from_Read
		cmp	al,13
		jz	Exit_from_Read
		stosb
		jmp	Read_FN
	Exit_from_Read:
		dec	si
		cmp	bx,si
		jnz	Correct
	Write_Usage:
		mov	ah,9
		mov	dx,offset Usage
		int	21h
		mov	ah,9
		mov	dx,offset Address
		int	21h
		mov	ah,2
		mov	dl,'$'
		int	21h
		mov	ah,9
		mov	dx,offset Money
		int	21h
		jmp	Exit_to_Dos		;Exit
	Correct:
	File_Name_Correct:

	;Attributum beolvas sa

		mov	Attrib,20h		;Archiv
		mov	di,81h
		mov	al,'/'
		mov	cx,Clon
		call	Find_B			;"/" find the attrib
		jc	Default_Attrib
		mov	Attrib,0
		mov	si,di			;stay in the first attrib mark
		mov	cx,5			;Max 5
	New_Attr:
		lodsb
		cmp	al,13			;code of ret
		jz	Exit_from_Attr_Set	;End
		cmp	al,'?'                  ;Info
		jnz	Not_Info		;No
		jmp	Write_Usage
	Not_Info:
		cmp	al,'A'                  ;Archiv
		jnz	Not_A
		add	Attrib,20h
		jmp	Next_Attrib
	Not_A:
		cmp	al,'S'                  ;System
		jnz	Not_S
		add	Attrib,4
		jmp	Next_Attrib
	Not_S:
		cmp	al,'H'                  ;Hidden
		jnz	Not_H
		add	Attrib,2
		jmp	Next_Attrib
	Not_H:
		cmp	al,'N'                  ;Normal
		jnz	Not_N
		add	Attrib,0
		jmp	Next_Attrib
	Not_N:
		cmp	al,'R'                  ;Read only
		jnz	Not_R
		add	Attrib,1
	Not_R:
	Next_Attrib:
		loop	New_Attr
	Exit_from_Attr_Set:

	;if was "/" sign only then use default

		dec	si
		cmp	si,di
		jnz	Attrib_Correct
		mov	Attrib,20h
	Attrib_Correct:
		jmp	A_C
	Default_Attrib:
		mov	AttrD,1 		;if default
	A_C:

	;Set DTA.

		mov	ah,1ah
		mov	dx,Offset Dta
		mov	BoD,dx			;Begin of DTA
		int	21h			;Create DTA
		mov	Was,0			;delete was sign
		mov	FoundE,1		;default = found entry
		mov	Bop,offset Path 	;Begin of path
		mov	Nofl,0			;0 file
		mov	Nofh,0			;0 file
		call	GetbTm			;Store the begin time
		call	Walk			;Recursive call
		call	GeteTm			;Store the end time
		cmp	Was,0			;anything found ?
		jnz	Disp_Nof		;Yes
		mov	ah,9
		mov	dx,offset ErrorF
		int	21h			;Error message
		jmp	Exit_to_Dos
	Disp_Nof:
		mov	ah,9
		mov	dx,offset CrLf
		int	21h			;CrLf
		call	GetCRSR
		add	Xp,6
		mov	di,10
		mov	ax,Nofl
		mov	dx,Nofh
		call	HexDec
		mov	Xp,8
		call	SetCRSR
		mov	ah,9
		mov	dx,offset fi_fnd
		int	21h
		call	DispTm			;Displey the used time
	Exit_to_DOS:
		MOV	AH,0			;Exit to DOS function
		INT	20H			;Call DOS

;--------------------------------------------------------
;	SET CRSR.					:
;	In Xp & Yp variable the column & row		:
;--------------------------------------------------------

	SetCRSR proc	near

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

	SetCRSR endp

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
;	Hex. value converting to dec.			:
;	/Horner/					:
;--------------------------------------------------------


	HexDec	proc	near

		;in ax-dx value
		;in di numerical system

	Repeat_:
		clc
		div	di
		cmp	ax,65534
		jae	HDQuit
		call	WriteCon
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
;	Write the screen /high video/			:
;--------------------------------------------------------


	WriteCon	proc	near

			push	ax
			push	bx
			cmp	dx,9
			jle	DecimalW
			add	dx,7
		DecimalW:
			add	dx,30h
			call	SetCRSR
			ChrOutp
		WQuit:
			pop	bx
			pop	ax
			ret

	WriteCon	endp

;--------------------------------------------------------
;	Conver to CAPITAL				:
;	SI=source DI=target CX=Length			:
;--------------------------------------------------------

	UpperC	proc	near

		mov	di,si
	New_C:
		push	cx
		lodsb				;get a byte
		cmp	al,90
		jc	UCase			;alredi CAP. or no alphabet
		cmp	al,122
		ja	Not_Char		;No alphabet
		sub	al,32
	Not_Char:
	UCase:
		stosb
		pop	cx
		loop	New_C
		ret

	UpperC	endp

;--------------------------------------------------------
;	Copy						:
;	CX=	number of bytes 			:
;	DS:SI	from					:
;	ES:DI	to					:
;--------------------------------------------------------

	Copy_B	proc	near

	Repnz	movsb
		ret

	Copy_B	endp

;--------------------------------------------------------
;	Find						:
;	CX=	area for find				:
;	AL=	anything				:
;	ES:DI	from					:
;	STC	to					:
;--------------------------------------------------------

	Find_B	proc	near

	Repnz	scasb
		jz	Found
		stc
		jmp	Exit_from_find_B
	Found:
		clc
	Exit_from_Find_B:
		ret

	Find_B	endp

;--------------------------------------------------------
;	Find first entry				:
;	if not found then STC				:
;--------------------------------------------------------

	FFirst	proc	near

		clc
		mov	dx,offset Path
		mov	ah,4eh
		int	21h			;Find first
		jnc	This_First_Entry
		mov	FoundE,0		;Not found
		jmp	Exit_from_FF
	This_First_Entry:
		mov	FoundE,1		;Found
	Exit_from_FF:
		ret

	FFirst	endp

;--------------------------------------------------------
;	Find a specifyed file in the directory		:
;--------------------------------------------------------

	FFile	proc	near

		push	FoundE

	;Set DTA.

		mov	dx,BoD
		add	dx,2bh			;leav the current
		mov	TBoD,dx 		;store
		mov	ah,1ah
		int	21h			;for find DTA

	;store the "\" sign before the file name

		mov	di,EoP
		mov	al,"\"
		stosb				;"\" jsign store

	;Copy file name

		mov	si,offset FileN 	;File name
		mov	cx,14			;len. of file name
		cld
		call	Copy_B

	;find file

		mov	cx,Attrib		;attrib of file
		call	FFirst			;find first
		jc	File_Not_Found		;Not found
		mov	bx,TBoD
		cmp	AttrD,1 		;Default ?
		jz	File_Found
		add	bx,21			;Point for the attritb
		mov	ax,Attrib
		cmp	al,byte ptr [bx]	;Attrib equel ?
		jz	File_Found		;Ok
	Next_Search:
		mov	ah,4fh
		mov	cx,Attrib
		int	21h
		jc	File_Not_Found
		mov	bx,TBoD
		cmp	AttrD,1
		jz	File_Found
		add	bx,21			;point for the Attrib
		mov	ax,Attrib
		or	al,byte ptr [bx]	;Attrib equel ?
		jz	File_Found		;Ok
		jnz	Next_Search
	File_Found:
		call	Wfile			;Display
		mov	Was,1			;Found sign
		cmp	NoFl,65535
		jna	Less_equ
		inc	NoFh
	Less_Equ:
		inc	NoFl			;add 1
		jmp	Next_Search
	File_Not_Found:

	;Restore the original DTA.

		mov	ah,1ah
		mov	dx,BoD
		int	21h
		pop	FoundE
		ret

	FFile	endp

;--------------------------------------------------------
;	Display the path of file			:
;--------------------------------------------------------

	Wfile	proc	near


	;Find the end

		mov	al,0
		mov	di,BoP
		cld
		mov	cx,80
		call	Find_B			;find "0" byte

	;Find the begin of file name

		mov	al,'\'
		std
		mov	cx,80
		call	Find_B			;find "\" sign
		jc	Isnt_Sign		;Not found
		cld
		add	di,2			;Stay to the begin
		mov	dx,TBod
		add	dx,30			;Point the file name in the DTA
		mov	si,dx

	;Copy file name from the DTA.

	New_Copy:
		lodsb
		cmp	al,0			;End sign ?
		jz	End_of_Copy		;Yes
		stosb
		jmp	New_Copy
		mov	si,offset CrLf		;in DI the end of file name
		mov	cx,3
		call	Copy_B			;for Display
	End_of_Copy:
		jmp	WriteOut
	Isnt_Sign:

	;V‚g‚t keresi

		mov	al,0
		mov	di,BoP
		cld
		mov	cx,80
		call	Find_B			;find "0" byte
		dec	di
	WriteOut:
		mov	si,offset CrLf		;+ line feed & text end sign
		mov	cx,3
		call	Copy_B			;line feed after file name

	;Display the path

		mov	ah,9
		mov	dx,BoP			;Begin of path
		int	21h
		ret

	Wfile	endp

;--------------------------------------------------------
;	Find next entry 				:
;--------------------------------------------------------

	FNext	proc	near

		clc
		mov	ah,4fh
		int	21h			;find next
		jnc	This_Next_Entry
		mov	FoundE,0		;Not found
		jmp	Exit_from_FN
	This_Next_Entry:
		mov	FoundE,1		;found
	Exit_from_FN:
		ret

	FNext	endp

;--------------------------------------------------------
;	Check for entry 				:
;	if DIR. entry then ThisDir = 1			:
;--------------------------------------------------------

	CheckE	proc	near

		mov	ThisDir,0
		mov	si,Bod			;Begin of DTA
		add	si,15h			;point to the attrib
		cmp	byte ptr [si],10h	;dir. entry ?
	What_Is:
		jz	Is_Dir0 		;DIR. entry
		jmp	E_Not_F 		;No DIR.
	Is_Dir0:

	;Administrative entry ? "." or ".." ?

		add	si,9			;Stay the file name
		cmp	byte ptr [si],2eh	;Administrative entry?
		jz	E_Not_F 		;Yes not real dir. entry
		mov	ThisDir,1		;Sign if OK
		jmp	Was_Real_Dir_E
	E_Not_F:
		mov	ThisDir,0		;Not DIR. entry
	Was_Real_Dir_E:
		ret

	CheckE	endp

;--------------------------------------------------------
;	Step throught the tree structure as Recursive	:
;--------------------------------------------------------

	Walk	proc	near

	;Find file

		call	FFile

	;Copy the ext.

		mov	di,EoP			;to the End of path
		mov	si,offset Ext		;Ext.
		mov	cx,5			;"\*.*0" 5 byte
		call	Copy_B			;store the ext.

	;Find first dir.

		mov	cx,10h
		call	FFirst			;find first entry
		call	CheckE			;Check entry

	Where_is:
	;Already sep throught the tree structure ?

		cmp	FoundE,1		;Found entry ?
		jz	Go_Iter 		;Go to the ITER
		jmp	Isnt_Entry_in_Root	;Not found more entry in the
	Go_Iter:				;root
		cmp	ThisDir,1		;Real DIR. entry ?
		jz	Dont_Go_Find_Next	;Not - next
		jmp	Go_Find_Next		;Not - next
	Dont_Go_Find_Next:
	;"\" sign

		mov	di,Eop
		mov	al,'\'
		stosb				;store '\' sign
		inc	EoP			;End of path + 1

	;Copy file name to the behind of path

		mov	si,BoD			;Begin of DTA.
		add	si,1eh			;Stay the file name
		mov	di,Eop			;End of path
		mov	cx,8
		call	Copy_B
		mov	al,0
		stosb

	;Find "0"

		cld
		mov	cx,13			;8 byte len.
		mov	di,Eop
		mov	al,0
		call	Find_B			;find
		dec	di			;overrun
		mov	EoP,di			;End of path

	;Save

		push	BoP			;Begin of path
		push	EoP			;End of path
		push	BoD			;Begin of DTA.
		add	BoD,2bh 		;New DTA.
		mov	ah,1ah
		mov	dx,BoD
		int	21h			;Set new DTA.

	;Rekursiv CALL!

		call	Walk			;Rekursiv CALL !!!

	;Restore

		pop	BoD			;Begin of DTA.
		mov	ah,1ah
		mov	dx,BoD
		int	21h			;Stay the old DTA.
		pop	EoP			;Back step
		pop	BoP			;Begin of path

	;find back the "\" sign

		mov	di,EoP			;End of path
		mov	al,'\'
		mov	cx,14
		std
		dec	di
		call	Find_B
		cld
		inc	di
		mov	Eop,di
		mov	al,0
	Go_Find_Next:

	;Next entry

		call	FNext			;Find next
		call	CheckE			;Check
		jmp	Where_Is
	Isnt_Entry_More:
	Isnt_Entry_in_Root:
		ret				;Backstep Up

	Walk	endp

;--------------------------------------------------------
;	Get the time at begin of search 		:
;--------------------------------------------------------

	GetbTm	proc	near


		push	ax
		push	cx
		push	dx

		mov	ah,2ch
		int	21h
		mov	B_h,ch
		mov	B_m,cl
		mov	B_s,dh
		mov	B_d,dl

		pop	dx
		pop	cx
		pop	ax
		ret

	GetbTm	endp

;--------------------------------------------------------
;	Get the time at end of search			:
;--------------------------------------------------------

	GeteTm	proc	near


		push	ax
		push	cx
		push	dx

		mov	ah,2ch
		int	21h
		mov	E_h,ch
		mov	E_m,cl
		mov	E_s,dh
		mov	E_d,dl

		pop	dx
		pop	cx
		pop	ax
		ret

	GeteTm	endp

;--------------------------------------------------------
;	Display the used time				:
;--------------------------------------------------------

	DispTm	proc	near

		push	ax
		push	bx
		push	dx
		push	di

		mov	bl,E_h				;
		cmp	bl,B_h
		jae	Ge_bh				;End >= Begin
		mov	al,24
		sub	al,B_h				;24 - Begin
		xchg	al,bl
		add	al,bl				;End + (24 - Begin)
		jmp	Min
	Ge_bh:
		sub	bl,B_h
		mov	U_h,bl
	Min:
		mov	bl,E_m
		cmp	bl,B_m
		jae	Ge_bm
		mov	al,60
		sub	al,B_m
		xchg	al,bl
		add	al,bl
		jmp	Sec
	Ge_bm:
		sub	bl,B_m
		mov	U_m,bl
	Sec:
		mov	bl,E_s
		cmp	bl,B_s
		jae	Ge_bs
		mov	al,60
		sub	al,B_s
		xchg	al,bl
		add	al,bl
		jmp	Hund
	Ge_bs:
		sub	bl,B_s
		mov	U_s,bl
	Hund:
		mov	bl,E_d
		cmp	bl,B_d
		jae	Ge_bd
		mov	al,100
		sub	al,B_d
		xchg	al,bl
		add	al,bl
		jmp	T_Ok
	Ge_bd:
		sub	bl,B_d
		mov	U_d,bl
	T_Ok:
		mov	ah,9
		mov	dx,offset Used_t
		int	21h
		call	GetCRSR

		mov	xp,17
		mov	di,10
		xor	dx,dx
		xor	ax,ax
		mov	al,U_h
		call	Hexdec

		mov	xp,20
		mov	di,10
		xor	dx,dx
		xor	ax,ax
		mov	al,U_m
		call	Hexdec

		mov	xp,23
		mov	di,10
		xor	dx,dx
		xor	ax,ax
		mov	al,U_s
		call	Hexdec

		mov	xp,26
		mov	di,10
		xor	dx,dx
		xor	ax,ax
		mov	al,U_d
		call	Hexdec

		mov	ah,9
		mov	dx,offset CrLf
		int	21h

		pop	di
		pop	dx
		pop	bx
		pop	ax
		ret

	DispTm	endp

	Dta	label	near

CODE	ENDS

	END	START
