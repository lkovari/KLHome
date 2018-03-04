PAGE	66,132

TITLE	CMOS RAM Utility

COMMENT *
	Written by László Kővári  1992.03.23.
		    	 Last Update  1992.03.24.

	70h I/O port	8. bit	=  1 NMI disable
	71h I/O port		=  CMOS RAM data port
	
	This program display the datas of the CMOS RAM. 
	

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
	Copyr	db	'Copyright (C) 1992 by L�szl� K�v�ri #!3647321033',0

	Scr	db	'               >>> CMOS RAM Utility v1.02 - Freeware Program <<<',13,10,13,10
		db	'               Copyright (C) 1992 by L�szl� K�v�ri #!3647321033',13,10,13,10,'$'
	Help	db	'               CMRAM B=BackUp CMOS RAM  CMRAM R=Restore CMOS RAM',13,10,'$'
	Backup	db	13,10,'                   The contents of CMOS RAM now Backed Up...',13,10,13,10,'$'
	Restore db	13,10,'                   The contents of CMOS RAM now Restored...',13,10,13,10,'$'
	Cont1	db	7,'                         Press any key to continue !$'
	BackErr db	7,13,10,'                             WARNING!!! CMOS RAM Backup ERROR.',13,10,13,10,'$'
	RestErr db	7,13,10,'                            WARNING!!! CMOS RAM Restore ERROR.',13,10,13,10,'$'
	Address db	13,10,13,10
		db	'        		 The 100% assembly source.',13,10
		db	13,10
		db	'                           Author: L�szl� K�v�ri',13,10
		db	'                           E-mail:lkovari@axelero.hu',13,10
	Cr_Lf	db	13,10,'$'
	Filen	db	' :\CMOSRAM.DAT',0
	Xp	db	0
	Yp	db	0
	ya	db	0
	xa	db	0
	Col	db	(12)
	CmosRam db	128	dup	(0)


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
		call	GetDsk
		call	Cmd			;Chk command line
		push	ax			;save parameter
		cmp	al,'b'
		jz	Cmos_Back_Up
		cmp	al,'r'
		jz	Cmos_Restore
		cmp	al,'n'
		jz	Cmos_Display
	Cmos_Back_Up:
		mov	ah,9
		mov	dx,offset Scr
		int	21h
		call	C_Back			;Save to file
		jnc	Ok_Backup
		mov	ah,9
		mov	dx,offset BackErr
		int	21h
	Ok_Backup:
		mov	ah,9
		mov	dx,offset Backup
		int	21h
		jmp	Exit_From_Cmru
	Cmos_Restore:
		mov	ah,9
		mov	dx,offset Scr
		int	21h
		call	C_Rest			;Restore
		jnc	Ok_Restore
		mov	ah,9
		mov	dx,offset RestErr
		int	21h
	Ok_Restore:
		mov	ah,9
		mov	dx,offset Restore
		int	21h
		jmp	Exit_From_Cmru
	Cmos_Display:
		call	C_Disp			;Display values
		mov	ah,9
		mov	dx,offset Help
		int	21h
	Exit_from_Cmru:
		pop	ax
		cmp	al,'b'
		jz	Not_wait
		cmp	al,'r'
		jz	Not_wait
		mov	yp,22
		call	A_Key
		jmp	C00
	Not_wait:
		mov	ah,9
		mov	dx,offset Cr_Lf
		int	21h
		jmp	C01
	C00:
		call	Cls
	C01:
		mov	ah,9
		mov	dx,offset Address
		int	21h
		mov	ah,2
		mov	dl,'$'
		int	21h
		MOV	AH,0			;Exit to DOS function
		INT	20H			;Call DOS


;--------------------------------------------------------
;	Get current drive				:
;--------------------------------------------------------

	GetDsk	proc	near

		push	ax
		mov	ah,19h
		int	21h
		mov	si,offset FileN
		add	ax,65
		mov	byte ptr [si],al
		pop	ax
		ret

	GetDsk	endp

;--------------------------------------------------------
;	Wait a keypress 				:
;--------------------------------------------------------

	A_Key	proc	near

		push	ax
		push	dx
		mov	al,xp
		mov	xa,al
		mov	al,yp
		mov	ya,al
		mov	Xp,0
		call	CurPos
		mov	ah,9
		mov	dx,offset Cont1
		int	21h
		mov	ah,7
		int	21h
		mov	al,xa
		mov	xp,al
		mov	al,ya
		mov	yp,al
		pop	dx
		pop	ax
		ret

	A_Key	endp

;--------------------------------------------------------
;	Read CMOS RAM into the memory			:
;--------------------------------------------------------

	RCmos	proc	near


		push	ax
		push	cx
		push	dx
		mov	cx,64
		mov	di,offset CmosRam
		add	di,63
	New_Byte_R:
		call	InCmos
		mov	byte ptr [di],al
		dec	di
		loop	New_Byte_R
		pop	dx
		pop	cx
		pop	ax
		ret

	RCmos	endp

;--------------------------------------------------------
;	Write CMOS RAM from the memory			:
;--------------------------------------------------------

	WCmos	proc	near


		push	ax
		push	cx
		push	dx
		mov	cx,64
		mov	si,offset CmosRam
		add	si,63
	New_Byte_W:
		mov	al,byte ptr [si]
		call	OutCmos
		dec	si
		loop	New_Byte_W
		pop	dx
		pop	cx
		pop	ax
		ret

	WCmos	endp

;--------------------------------------------------------
;	Read from CMOSRAM.DAT file into memory		:
;	CARRY is set if error				:
;--------------------------------------------------------


	R_Cmos	proc	near

		push	ax
		push	bx
		push	cx
		push	dx
		clc
		mov	ah,4eh
		mov	dx,offset FileN
		xor	cx,cx
		int	21h
		jc	File_Not_Found
		xor	ax,ax
		mov	ah,3dh
		xor	cx,cx
		mov	dx,offset FileN
		int	21h
		jc	Open_Error_R
		mov	bl,al			;Handle
		mov	ah,3fh
		mov	cx,64
		mov	dx,offset CmosRam
		int	21h
		cmp	cx,ax
		jnz	Read_Error
		mov	ah,3eh
		int	21h
		jc	Close_Error_R
		clc
		jmp	Exit_From_Read
	File_Not_Found:
	Open_Error_R:
	Read_Error:
	Close_Error_R:
		stc
	Exit_From_Read:
		pop	dx
		pop	cx
		pop	bx
		pop	ax
		ret

	R_Cmos	endp

;--------------------------------------------------------
;	Write from memory into the CMOSRAM.DAT file	:
;	CARRY is set if error				:
;--------------------------------------------------------


	W_Cmos	proc	near

		push	ax
		push	bx
		push	cx
		push	dx
		clc
		xor	ax,ax
		mov	ah,3ch
		xor	cx,cx
		mov	dx,offset FileN
		int	21h
		jc	Create_Error_W
		mov	bl,al			;Handle
		xor	ax,ax
		mov	ah,40h
		mov	cx,64
		mov	dx,offset CmosRam
		int	21h
		cmp	cx,ax
		jnz	Write_Error
		mov	ah,3eh
		int	21h
		jc	Close_Error_W
		clc
		jmp	Exit_From_Write
	Create_Error_W:
	Write_Error:
	Close_Error_W:
		stc
	Exit_From_Write:
		pop	dx
		pop	cx
		pop	bx
		pop	ax
		ret

	W_Cmos	endp

;--------------------------------------------------------
;	Read a byte from CMOS RAM			:
;	in CL CMOS memory address			:
;	in Al CMOS memory data				:
;--------------------------------------------------------

	InCMOS	proc	near

		mov	al,cl
		dec	al
		or	al,80h			;NMI. disable
		out	70h,al			;Send command
		and	al,7fh			;NMI. enabled
		jmp	$+2
		in	al,71h			;Get a value of CMOS RAM
		ret

	InCMOS	endp

;--------------------------------------------------------
;	Write a byte to the CMOS RAM			:
;	in CL CMOS memory address			:
;	in Al CMOS memory data				:
;--------------------------------------------------------

	OutCMOS proc	near

		push	ax
		mov	al,cl
		dec	al
		or	al,80h			;NMI. disable
		out	70h,al			;Send command
		and	al,7fh
		jmp	$+2
		pop	ax
		out	71h,al			;Write a byte to the CMOS RAM
		ret

	OutCMOS endp

;--------------------------------------------------------
;	Save CMOS RAM					:
;--------------------------------------------------------

	C_Back	proc	near

		call	RCmos			;Read CMOS RAM & store to memory
		call	W_Cmos			;Write CMOS RAM to the file
		jc	W_Error
		clc
		jmp	Backup_Ok
	C_Error:
	W_Error:
		stc
	Backup_Ok:
		ret

	C_Back	endp

;--------------------------------------------------------
;	Restore CMOS RAM				:
;--------------------------------------------------------


	C_Rest	proc	near

		call	R_Cmos			;Read values from the file
		jc	R_Error
		call	WCmos			;Write values to the CMOS RAM
		clc
		jmp	Restore_Ok
	R_Error:
		stc
	Restore_Ok:
		ret

	C_Rest	endp

;--------------------------------------------------------
;	Display the value of CMOS RAM			:
;--------------------------------------------------------

	C_Disp	proc	near

		push	ax
		push	bx
		push	cx
		push	dx
		push	di
		push	si
		push	bp

		call	Cls
		mov	ah,9
		mov	dx,offset Scr
		int	21h
		call	RCmos			;CMOS RAM read & store to memory
		mov	Yp,5
		mov	cx,64
		mov	bp,0
		mov	si,offset CmosRam
	New_W:
		push	cx
		mov	al,col
		mov	xp,al
		call	CurPos			;Positioning
		mov	ax,bp
		mov	di,16
		xor	dx,dx
		call	FromHex 		;Write address
		mov	al,col
		mov	xp,al
		add	Xp,1
		call	CurPos			;Posirioning
		mov	ah,2
		mov	dl,':'
		int	21h			;':'
		mov	al,col
		mov	xp,al
		add	Xp,2
		call	CurPos			;Positioning
		mov	al,byte ptr [si]
		call	ToBin			;Write as binary
		inc	Yp
		cmp	Yp,20
		jbe	Y_Less_Equ
		add	Col,15
		mov	Yp,5
	Y_Less_Equ:
		inc	si
		inc	bp
		pop	cx
		loop	New_W
		mov	xp,0
		mov	yp,21
		call	CurPos
		pop	bp
		pop	si
		pop	di
		pop	dx
		pop	cx
		pop	bx
		pop	ax
		ret

	C_Disp	endp

;--------------------------------------------------------
;	Cursor enable					:
;--------------------------------------------------------

	Cenab	proc	near

		push	ax
		push	bx
		push	cx
		int	11h			;Check CGA card
		push	ax
		mov	cl,4			;Check 80 * 25 mode
		shr	al,cl			;right shift with 4
		cmp	al,2
		jz	Color_graphich_e
		pop	ax
						;Check 40 * 25 mode
		shr	al,cl			;right shift with 4
		cmp	al,1
		jz	Color_graphich_e
						;monocrhrome card
		mov	cl,13			;from
		mov	ch,12			;To
		jmp	Continue_e
	Color_graphich_e:			;Color graphich card
		pop	ax
		mov	cl,7			;End
		mov	ch,6			;begin
	Continue_e:
		mov	ah,01			;Func. code
		mov	bh,0			;Screen page /videomod/
		int	10h
		pop	cx			;Reg. restore
		pop	bx
		pop	ax
		ret

	Cenab	endp

;--------------------------------------------------------
;	Cursor disable					:
;--------------------------------------------------------

	Cdisa	proc	near

		push	ax
		push	bx
		push	cx
		int	11h

		push	ax
		mov	cl,4
		shr	al,cl
		cmp	al,2
		jz	Color_graphich_d
		pop	ax

		shr	al,cl
		cmp	al,1
		jz	Color_graphich_d

		mov	cl,0
		mov	ch,14
		jmp	Continue_d
	Color_graphich_d:
		pop	ax
		mov	cl,7
		mov	ch,8
	Continue_d:
		mov	ah,01
		mov	bh,0
		int	10h
		pop	cx
		pop	bx
		pop	ax
		ret

	Cdisa	endp

;--------------------------------------------------------
;	CRSR pos					:
;	Variable in Xp - Column Yp - Row		:
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
;	Hex. value converting to dec.			:
;	/Horner/					:
;--------------------------------------------------------


	FromHex  proc	 near

		;ax-dx konvertalando ertek
		;di szamrendszer

	Repeat_:
		clc
		div	di				;/10
		cmp	ax,65534			;if >= FFFe
		jae	HDQuit				;Exit
		call	WriteCon			;Write screen
		dec	xp				;Pos decr.

		mov	dx,0
		cmp	ax,0
		jz	HDQuit
		jmp	Repeat_
		call	WriteCon
	HDQuit:
		ret

	FromHex  endp

;--------------------------------------------------------
;	Write the screen /high video/			:
;--------------------------------------------------------


	WriteCon	proc	near

			push	ax
			push	bx
			cmp	dx,9			;<= 9
			jle	DecimalW		;Yes
			add	dx,7			;+7
		DecimalW:
			add	dx,30h			;+48
			call	curpos			;CRSR pos.
			ChrOutp 			;1 digit write
		WQuit:
			pop	bx
			pop	ax
			ret

	WriteCon	endp


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
;	Check command line				:
;	Returned:					:
;	AL=b if save					:
;	AL=r if restore 				:
;	AL=n display only				:
;--------------------------------------------------------

	Cmd	proc	near

		push	dx
		push	si
		mov	si,80h
		cmp	byte ptr [si],0
		jnz	Not_Empty
	Error_Cmd:
		jmp	Exit_from_Cmd		;nothing
	Not_Empty:
		inc	si
		mov	cx,80			;Check 80 byte
	New_Char:
		lodsb
		cmp	al,32			;Space ?
		jnz	Anything		;is anything ?
		loop	New_Char
		jmp	Error_Cmd		;if space only

	Anything:

;--------------------------------------------------------
;	Select func.					:
;--------------------------------------------------------

		cmp	al,'B'
		jz	Backup_Cmos		;Save
		cmp	al,'b'
		jz	Backup_Cmos		;Save
		cmp	al,'R'
		jz	Restore_Cmos		;Restore
		cmp	al,'r'
		jz	Restore_Cmos		;Restore
		jmp	Error_Cmd

	Backup_Cmos:
		mov	al,'b'
		jmp	Exit_to
	Restore_Cmos:
		mov	al,'r'
		jmp	Exit_to
	Exit_from_Cmd:
		mov	al,'n'                  ;exit
	Exit_to:
		pop	si
		pop	dx
		ret

	Cmd	endp

;--------------------------------------------------------
;	Convert from hex. to the binary 		:
;--------------------------------------------------------

	ToBin	proc	near

		push	cx
		clc
		mov	cx,8
	New_Shift:
		push	cx
		call	CurPos
		sal	al,1
		jc	W1
		mov	dl,'0'
		jmp	Exit_from_ToBin
	W1:
		mov	dl,'1'
	Exit_from_ToBin:
		ChrOutP
		inc	Xp
		pop	cx
		loop	New_Shift
		pop	cx
		ret

	ToBin	endp


CODE	ENDS

	END	START

