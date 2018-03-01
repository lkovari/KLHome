PAGE	66,132

TITLE	Prime Number Generator

COMMENT *
	Written by László Kővári  1994.10.07.
		    	 Last Update  1994.10.12.

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
	Scr	db	'PRIME NUMBER GENERATOR           TO           ON THE 80    SYSTEM',13,10
		db	13,10
		db	'Check now.....:               Began at:    .  .   -   :  :  .  ',13,10
		db	'Founded primes:               Ended at:    .  .   -   :  :  .  $'
	Working db	'Please Wait - Now Working...$',13,10
	ExitM1	db	'Press Right-Shift to Quit...$'
	ExitM2	db	'Press Q to Quit...$'
	ExitClr db	'                  $'
	DspSrc	db	'PRIME NUMBER GENERATOR - DISPLAY MODE                         FreeWare Program!$'
	Cpu_Err db	7,'Minimum 80386 type CPU. Required...',13,10,'$'
	UserBrk db	7,'User Break - Program Terminated...',13,10,'$'
	Prs_Key db	'Press any key to Continue...$'
	Clr	db	'                            $'

	Usage	db	'PRIME NUMBER GENERATOR - FreeWare Program!',13,10
		db	13,10
		db	7,'USAGE:PRIME /s -> Display the generated Primes only',13,10
		db	  '            /f -> Store prim numbers to PRIMES.DAT file in DD (4byte) fortmat',13,10
		db	  '            /d -> Display Prim numbers from PRIMES.DAT file',13,10
		db	  '            /? -> This function',13,10,13,10
		db	  '                  Possible Prime Gen. area is 2 to 600000000',13,10
		db	  '                  Tested 2 to 20000000.The working time was 9� hours',13,10
		db	13,10
		db	  '                  100% Assembly source.',13,10
		db	  '                  Author: L�szl� K�v�ri',13,10
		db	  '                          22 Kazinczy Street',13,10
		db	  '                          S�toraljaujhely',13,10
		db	  '                          HUNGARY',13,10
		db	  '                          H-3980',13,10
		db	13,10
	Copyr	db	'Copyright (C) 1994 by L�szl� K�v�ri #3647321033',0,'$'

	OpenErr db	7,'PRIMES.DAT File Not Found!',13,10,'$'

	FileN	db	'PRIMES.DAT',0

	Xp	db	0
	Yp	db	0
	Xa	db	0
	Ya	db	0
	Wmax	db	'000000000$'
	Wfre	db	'         $'
	CrLf	db	13,10,'$'
	divider dd	2
	Work	dd	0
	Sqr	dd	0
	Two	db	0
	Primes	dd	0
	MaxN	dd	(600000000)
	MinN	dd	(2)
	NotP	db	0
	p0	db	'86 $'
	p2	db	'286$'
	p3	db	'386$'
	p4	db	'486$'
	Cpu	db	0
	Transit db	0
	Exit	db	0
	Year	dw	0
	Month	db	0
	Day	db	0
	Hour	db	0
	Min	db	0
	Sec	db	0
	Hund	db	0
	Mode	db	'?'
	Handle	dw	0
	Akey	db	0
	Pcnt	dd	0

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
		call	Idc

;
;
;	Main program.
;
;

	.386					;Using 386 instructions
		push	dx
		push	si
		mov	si,80h
		cmp	byte ptr [si],0
		jnz	Not_Empty
		jmp	Help_Function		;Display help
	Not_Empty:
		inc	si
		mov	cx,80			;Check 80 byte
	New_Char:
		lodsb
		cmp	al,32			;Space ?
		jnz	Anything		;is anything ?
		loop	New_Char
		jmp	Help_Function		;if space only
	Anything:
		cmp	al,'/'
		jnz	Help_Function
		lodsb
		cmp	al,'d'
		jz	Display_Prims
		cmp	al,'f'
		jz	Store_Prims
		cmp	al,'s'
		jz	Standard_Gen
		cmp	al,'?'
		jz	Help_Function
		jmp	Help_Function
	Store_Prims:
		mov	mode,'f'
		call	CreateF 		;Create PRIMES.DAT file
		jc	Exit_to_Dos
		jmp	To_Cont
	Standard_Gen:
		mov	mode,'s'
	To_Cont:
		call	cls			;Clear Screen
		;Display Screen mask
		mov	dx,offset Scr
		call	DspStr
		call	IdCpu			;Detect processor type
		cmp	Cpu,3			;Check Proc. type
		jae	Cpu_Ok
		;Display CPU ERROR
		mov	dx,offset Cpu_Err
		call	DspStr
		jmp	Exit_to_Dos
	Cpu_Ok:
	New_Vlu1:
		mov	Xp,23
		mov	Yp,0
		call	CurPos
		mov	dx,offset Wfre		;Clear input field
		call	DspStr
		mov	Xp,23
		mov	Yp,0
		call	CurPos			;Positioning
		mov	bx,9			;Length
		mov	edi,10			;Numeriucal system
		call	decto			;Get a number
		cmp	eax,600000000		;Check It
		ja	New_Vlu1		;Too large
		cmp	eax,1			;Too small
		jbe	New_Vlu1
		mov	MinN,eax		;Store it
	New_Vlu2:
		mov	Xp,36
		mov	Yp,0
		call	CurPos
		mov	dx,offset Wfre		;Clear input field
		call	DspStr
		mov	Xp,36
		mov	Yp,0
		call	CurPos			;Positioning
		;Read from keyboard
		mov	bx,9			;Length
		mov	edi,10			;Numeriucal system
		call	decto			;Get a number
		cmp	eax,600000000		;Check It
		ja	New_Vlu2		;Too large
		mov	MaxN,eax		;Store it
		cmp	MinN,eax
		jae	New_Vlu1
		mov	Xp,17
		mov	Yp,24
		call	CurPos
		;Display Copyright
		mov	dx,offset Copyr
		call	DspStr
		;Display working
		mov	Xp,26
		mov	Yp,10
		call	CurPos
		mov	dx,offset Working
		call	DspStr
		;Display Quit
		mov	Xp,26
		mov	Yp,12
		call	CurPos
		mov	dx,offset ExitM1
		call	DspStr
		call	Cd			;Cursor disable
		mov	Yp,2
		call	DspTime 		;Display time
		;Generate prims
		call	MCyc			;Main cycles
		mov	Yp,3
		call	DspTime 		;Display Time
		call	Ce			;Cursor enable
		mov	Xp,26
		mov	Yp,10
		call	CurPos
		mov	dx,offset Clr		;Clear message
		call	DspStr
		mov	Xp,26
		mov	Yp,12
		call	CurPos
		mov	dx,offset Clr
		call	DspStr
		jmp	Exit_to_DOs
	Display_Prims:
		mov	mode,'d'
		call	OpenF			;Open PRIMES.DAT file
		jc	Exit_to_Dos
		call	DspPrim 		;Display generated prims
		jmp	Exit_to_Dos
	Help_Function:
		call	cls
		mov	dx,offset Usage
		call	DspStr
		mov	Xp,0
		mov	Yp,17
		call	CurPos
	Exit_to_Dos:
		cmp	Mode,'f'
		jnz	Ok_Exit
		call	CloseF			;Close PRIMS.DAT file
	Ok_Exit:
		MOV	AH,0			;Exit to DOS function
		INT	20H			;Call DOS

;--------------------------------------------------------
;	Authors Identification
;--------------------------------------------------------

	Idc	proc	near

		pushf
		push	ax
		push	bx
		push	dx
		push	si
		xor	ax,ax
		mov	si,offset Copyr
		xor	bx,bx
	Load_Next_Byte:
		mov	bl,byte ptr [si]
		cmp	bl,0
		jz	Exit_from_Idc
		add	ax,bx
		inc	si
		jmp	Load_Next_Byte
	Exit_from_Idc:
		cmp	ax,0e1dh		;Check sum
		jz	Ok
		hlt
	Ok:
		popf
		pop	si
		pop	dx
		pop	bx
		pop	ax
		ret

	Idc	endp

;--------------------------------------------------------
;	Main cycles 0 to MaxN
;--------------------------------------------------------

	MCyc	proc	near

		mov	ecx,MaxN		;To transit
		mov	eax,MinN		;First number
	NewChk:
		push	ecx
		push	eax
		mov	Work,eax
		mov	xp,16
		mov	yp,2
		call	DispNum 		;Display checked
		call	PrimChk 		;Pim number check
		jc	Not_prim
		;Detect a prim number
		inc	Primes			;Increment counter
		mov	eax,Primes
		mov	Work,eax
		mov	Xp,16
		mov	Yp,3
		call	DispNum 		;Display founded
		pop	eax
		push	eax
		cmp	mode,'f'
		jnz	Not_Store
		mov	Work,eax		;For Store the prim
		call	WrDw			;Write to PRIMES.DAT in DW format
	Not_Store:
	Not_prim:
		pop	eax
		inc	eax			;Next number
		pop	ecx
	;Keyboard check
		push	eax
		mov	ah,2
		int	16h
		and	al,00000001b		;Right shift mask
		cmp	al,1			;press?
		jz	Exit_			;Exit
		pop	eax
		cmp	eax,MaxN
		jbe	New_Chk
		jmp	End_of_Gen
	New_Chk:
		jmp	NewChk
	Exit_:
		pop	eax
		mov	Xp,23
		mov	Yp,8
		call	CurPos
		mov	dx,offset UserBrk
		call	DspStr
	End_of_Gen:
		ret

	MCyc	endp

;--------------------------------------------------------
;	Prim check					:
;--------------------------------------------------------

	PrimChk proc	near

		push	eax
		push	ebx
		push	ecx
		push	edx
		mov	NotP,0
		mov	ecx,eax
		cmp	eax,5
		jbe	Div2
		mov	Divider,5		;First divider
	Div2:
		xor	edx,edx
		mov	ebx,2
		div	ebx			;odd number ?
		cmp	edx,0
		jnz	CheckFor3
		cmp	ecx,2
		jz	Is_Prim 		;The 2 is not prim!
		jmp	Exit_PrimCheck		;Not prim
	CheckFor3:
		xor	edx,edx
		mov	eax,ecx
		mov	ebx,3
		div	ebx
		cmp	edx,0
		jnz	NextChk
		cmp	ecx,3
		jz	Is_Prim
		jmp	Exit_PrimCheck		;Not prim
	NextChk:
		mov	Two,1
		mov	eax,ecx
		call	Sqrt			;Calc. SQR of max.
	Check_Rep:
		mov	eax,ecx
		xor	ebx,ebx
		xor	edx,edx
		mov	ebx,Divider
		div	ebx
		cmp	edx,0
		jnz	Cont
		mov	NotP,1			;Not prim flag set
		jmp	Exit_Prim_Check 	;Not Prim
	Cont:
		mov	eax,ecx
		cmp	eax,5
		jbe	Less5
		cmp	Two,1
		jnz	Not_1
		mov	Two,0
		add	Divider,2		;Increment divider with 2
		jmp	Divider_Ok1
	Not_1:
		mov	Two,1
		add	Divider,4		;Increment divider with 4
		jmp	Divider_Ok1
	Less5:
		add	Divider,1		;Increment divider with 1
	Divider_Ok1:
		mov	eax,divider
		cmp	eax,Sqr
		jbe	Check_Rep
		jmp	Exit_Prim_Check 	;End of test
	Is_Prim:
		clc
		jmp	Exit_Pc
	Exit_Prim_Check:
		cmp	NotP,1
		jnz	Is_Prim
	Exit_PrimCheck:
		stc
	Exit_Pc:
		pop	edx
		pop	ecx
		pop	ebx
		pop	eax
		ret

	PrimChk endp

;--------------------------------------------------------
;	Sqrt routine
;--------------------------------------------------------

	Sqrt	proc	near

		push	eax
		push	ebx
		push	ecx
		push	edx
		push	esi
		mov	ebx,eax
		xor	edx,edx
		xor	esi,esi
		xor	eax,eax
		mov	ecx,16
	loop_begin:
		shld	edx,ebx,2
		shl	ebx,2			;* 2 * 2
		shl	eax,1			;* 2
		shl	esi,1			;* 2
		inc	esi
		cmp	edx,esi
		jnc	One
		dec	esi
		jmp	loop_end
	One:
		inc	eax
		sub	edx,esi
		inc	esi
	loop_end:
		loop	loop_begin
		mov	Sqr,eax 		;Store it
		pop	esi
		pop	edx
		pop	ecx
		pop	ebx
		pop	eax
		ret

	Sqrt	endp

;--------------------------------------------------------
;	Display number
;--------------------------------------------------------

	DispNum proc	near

		push	eax
		push	edx
		push	esi
		mov	si,offset Work
		add	si,2
		mov	ax,[si]
		mov	dx,ax
		sub	si,2
		mov	ax,[si]
		mov	di,offset Wmax
		call	FromHexL		;Convert to decimal
		call	CurPos
		mov	dx,offset Wmax
		call	DspStr
		pop	esi
		pop	edx
		pop	eax
		ret

	DispNum endp

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

		;ax-dx value
		;di num. system

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
			jbe	DecimalW		;Yes
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

;--------------------------------------------------------
;	Convert to dec with  100000000 limit		:
;--------------------------------------------------------

	FromHexL proc	 near

		push	bx
		push	si

		mov	bx,10000
		xor	cx,cx
		div	bx				;/10000
		mov	si,dx
		xor	dx,dx				;for Carry
		mov	bx,1000
		div	bx				;/1000
		mov	bx,10
		div	bl				;/10
		add	ax,3030h			;+3030h
		stosb					;8. digit
		xchg	ah,al
		stosb					;7. digit
		mov	ax,dx
		xor	dx,dx
		mov	bx,64h
		div	bx				;/100
		add	al,30h
		stosb					;6. digit
		mov	ax,dx
		xor	dx,dx
		mov	bx,10
		div	bl				;/10
		add	ax,3030h
		stosb					;5. digit
		mov	al,ah
		stosb					;4. digit
		mov	ax,si
		xor	dx,dx
		mov	bx,1000
		div	bx				;/1000
		add	al,30h
		stosb					;3. digit
		xchg	dx,ax
		xor	dx,dx
		mov	bx,64h
		div	bx				;/100
		add	al,48
		stosb					;2. digit
		xchg	dx,ax
		xor	dx,dx
		mov	bx,10
		div	bl				;/10
		add	ax,12336
		stosb					;1. digit
		mov	al,ah
		stosb					;0. digit

		call	ClearZ				;Clear zeros from the
							;begin of number
		pop	si
		pop	bx
		ret

	FromHexL endp

;--------------------------------------------------------
;	Zero guzzler					:
;--------------------------------------------------------

	ClearZ	proc	near

		sub	di,9
		mov	si,di
		mov	cx,9				;Length
	RepZero:
		lodsb
		cmp	al,30h				;Check
		jnz	NotZ				;Non zero
		mov	al,20h
		stosb
		loop	RepZero 			;Next
	NotZ:
		ret

	ClearZ	endp

;--------------------------------------------------------
;	CRSR disable					:
;--------------------------------------------------------

	Cd	proc	near

		push	ax
		push	bx
		push	cx
		int	11h

		push	ax
		mov	cl,4
		shr	al,cl
		cmp	al,2
		jz	Color_graphich1
		pop	ax

		shr	al,cl
		cmp	al,1
		jz	Color_graphich1

		mov	cl,0
		mov	ch,14
		jmp	Continue1
	Color_graphich1:
		pop	ax
		mov	cl,7
		mov	ch,8
	Continue1:
		mov	ah,01
		mov	bh,0
		int	10h
		pop	cx
		pop	bx
		pop	ax
		ret

	Cd	endp

;--------------------------------------------------------
;	CRSR enable					:
;--------------------------------------------------------

	CE	proc	near

		push	ax
		push	bx
		push	cx
		int	11h				;Check CGA card
		push	ax
		mov	cl,4				;check 80 * 25 mode
		shr	al,cl				;right with 4
		cmp	al,2
		jz	Color_graphich
		pop	ax
							;Check 40 * 25 mode
		shr	al,cl				;right with 4
		cmp	al,1
		jz	Color_graphich
							;monocrhrome card
		mov	cl,13				;to
		mov	ch,12				;from
		jmp	Continue
	Color_graphich: 				;Color graphich card
		pop	ax
		mov	cl,7
		mov	ch,6
	Continue:
		mov	ah,01
		mov	bh,0
		int	10h
		pop	cx
		pop	bx
		pop	ax
		ret

	Ce	endp

;--------------------------------------------------------
;	CPU ID.
;--------------------------------------------------------

	IdCpu	proc	near


		push	bx
		push	cx
		push	dx

		pushf
		pop	bx

		and	bx,0fffh		;clear bits 12-15

		push	bx
		popf

		pushf
		pop	ax

		and	ax,0f000h		;set 12-15 bits
		cmp	ax,0f000h
		jz	Is_8086
		or	bx,0f000h		;set flags 12-15

		push	bx
		popf

		pushf
		pop	ax

		and	ax,0f000h
		jz	Is_80286
		jmp	i386486
	Is_8086:
		mov	Xp,55
		mov	yp,0
		call	CurPos
		mov	dx,offset p0
		call	DspStr
		mov	Cpu,1
		jmp	Exit_IdCpu
	Is_80286:
		mov	Xp,55
		mov	yp,0
		call	CurPos
		mov	dx,offset p2
		call	DspStr
		mov	Cpu,2
		jmp	Exit_Idcpu

	i386486:
		mov	di,ax			;Store the processor value
		mov	bx,sp			;Save SP
		and	sp,0fffch		;Prevent alignment fault
		pushfd				;Preserve the flags
		pop	eax			;Get flags into EAX
		or	eax,40000h		;Set the AC bit
		push	eax			;Push back on the stack
		popfd				;Get the value into flags
		pushfd				;Put the value back on stack
		pop	eax			;Get value into EAX
		test	eax,40000h		;See if the bit is set
		jz	YesIs80386		;If not we have a 80386
		mov	Xp,55
		mov	yp,0
		call	CurPos
		mov	dx,offset p4
		call	DspStr
		mov	Cpu,4
		jmp	YesIs80486
	YesIs80386:
		mov	Xp,55
		mov	yp,0
		call	CurPos
		mov	dx,offset p3
		call	DspStr
		mov	Cpu,3
	YesIs80486:
		popfd				;Restore the flags
		mov	sp,bx
	Exit_Idcpu:
		pop	dx
		pop	cx
		pop	bx
		ret

	IdCpu	endp

;--------------------------------------------------------
;	Convert to HEX. 				:
;		di     - Numerical system		:
;		bx     - length 			:
;		eax,edx- value				:
;		cx     - work reg.			:
;--------------------------------------------------------

	decto	proc	near

		push	bx
		push	cx
		xor	eax,eax
		xor	ecx,ecx
		mov	Exit,0
	repeath:
		call	readkbd 			;Read from keyboard
		cmp	Exit,1
		jz	Exit_from_Decto
		mul	edi				;* num. system
		add	eax,ecx
		adc	eax,0				;Add carry
		cmp	bx,0
		jnz	repeath 			;Repeat
	Exit_from_Decto:
		mov	MaxN,eax
		pop	cx
		pop	bx
		ret

	decto	endp

;--------------------------------------------------------
;	Read a character into CX			:
;--------------------------------------------------------

	Readkbd proc	near

		push	eax
		push	edx
		mov	ah,07
	wrong:
		int	21h
		mov	transit,al			;Store to transit
		xor	ecx,ecx
		mov	cl,al
		cmp	cl,13
		jz	rquit
		mov	ch,0
		cmp	cl,30h				;<0  ?
		jl	wrong				;Error
		sub	cl,30h
		cmp	cl,9				;>9  ?
		jbe	decimalr			;No
		sub	cl,7
	decimalr:
		cmp	cx,di				;>Num.System vlu.?
		jge	wrong				;Error
		mov	ah,02
		mov	dl,transit
		int	21h				;Display
		dec	bx
		jmp	C0_
	rquit:
		mov	bx,0
		mov	Exit,1
	C0_:
		pop	edx
		pop	eax
		ret

	Readkbd endp

;--------------------------------------------------------
;	Display Begin
;--------------------------------------------------------

	DspTime proc	near

		mov	ah,2ah
		int	21h
		mov	Year,cx
		mov	Month,dh
		mov	Day,dl
		mov	ah,2ch
		int	21h
		mov	Hour,ch
		mov	Min,cl
		mov	sec,dh
		mov	Hund,dl

		mov	Xp,42
		call	CurPos
		mov	di,10
		mov	ax,Year
		xor	dx,dx
		call	FromHex
		mov	Xp,45
		call	CurPos
		mov	di,10
		xor	ax,ax
		mov	al,Month
		xor	dx,dx
		call	FromHex
		mov	Xp,48
		call	CurPos
		mov	di,10
		xor	ax,ax
		mov	al,Day
		xor	dx,dx
		call	FromHex

		mov	Xp,53
		call	CurPos
		mov	di,10
		xor	ax,ax
		mov	al,Hour
		xor	dx,dx
		call	FromHex
		mov	Xp,56
		call	CurPos
		mov	di,10
		xor	ax,ax
		mov	al,Min
		xor	dx,dx
		call	FromHex
		mov	Xp,59
		call	CurPos
		mov	di,10
		xor	ax,ax
		mov	al,Sec
		xor	dx,dx
		call	FromHex
		mov	Xp,62
		call	CurPos
		mov	di,10
		xor	ax,ax
		mov	al,Hund
		xor	dx,dx
		call	FromHex
		ret

	DspTime endp

;--------------------------------------------------------
;	Open the PRIMES.DAT file
;--------------------------------------------------------

	OpenF	proc	near

		push	ax
		push	bx
		push	cx
		push	dx
		clc
		mov	ax,3d00h
		xor	cx,cx
		mov	dx,offset FileN
		int	21h
		jnc	Open_Ok
		mov	dx,offset OpenErr
		call	DspStr
	Open_Ok:
		mov	Handle,ax
		pop	dx
		pop	cx
		pop	bx
		pop	ax
		ret

	OpenF	endp

;--------------------------------------------------------
;	Create the PRIMES.DAT file
;--------------------------------------------------------

	CreateF proc	near

		push	ax
		push	bx
		push	cx
		push	dx
		clc
		mov	ax,3c00h
		xor	cx,cx
		mov	dx,offset FileN
		int	21h
		jnc	Create_Ok
		mov	dx,offset OpenErr
		call	DspStr
	Create_Ok:
		mov	Handle,ax
		pop	dx
		pop	cx
		pop	bx
		pop	ax
		ret

	CreateF endp


;--------------------------------------------------------
;	Close the PRIMES.DAT file
;--------------------------------------------------------

	CloseF	proc	near

		push	ax
		push	bx
		push	cx
		push	dx
		clc
		mov	ah,3eh
		mov	bx,Handle
		int	21h
		pop	dx
		pop	cx
		pop	bx
		pop	ax
		ret

	CloseF	endp

;--------------------------------------------------------
;	Write Double word to the PRIMES.DAT file
;--------------------------------------------------------

	WrDw	proc	near

		push	ax
		push	bx
		push	cx
		push	dx
		clc
		mov	ax,4000h
		mov	bx,Handle
		mov	cx,4
		mov	dx,offset Work
		int	21h
		pop	dx
		pop	cx
		pop	bx
		pop	ax
		ret

	WrDw	endp

;--------------------------------------------------------
;	Read Double Word from the PRIMES.DAT file
;--------------------------------------------------------

	ReDw	proc	near

		push	ax
		push	cx
		push	dx
		clc
		mov	ax,3f00h
		mov	cx,4
		mov	bx,Handle
		mov	dx,offset Work
		int	21h
		pop	dx
		pop	cx
		pop	ax
		ret

	ReDw	endp

;--------------------------------------------------------
;	Display Prims
;--------------------------------------------------------

	DspPrim proc	near

		call	cls
		mov	dx,offset DspSrc
		call	DspStr
		mov	Xp,0
		mov	Yp,7
		call	CurPos
		mov	dx,offset ExitM2
		call	DspStr
		mov	ah,1ah
		mov	dx,offset Dta
		int	21h			;Set Dta
		mov	ah,4eh
		xor	cx,cx
		mov	dx,offset FileN
		int	21h			;Get File Size
		xor	edx,edx
		mov	eax,FSize
		mov	ebx,4
		div	ebx			;Calc read cycles
		mov	MaxN,eax
		xor	ecx,ecx
		mov	Pcnt,1
		mov	Yp,0
	New_Read:
		push	ecx
		call	ReDw
		jc	Exit_from_DspPrim
		mov	Xp,50
		call	DispNum 		;Display founded
		mov	eax,Pcnt
		mov	Work,eax
		;Save Xp Yp
		mov	al,Xp
		mov	Xa,al
		mov	al,Yp
		mov	Ya,al
		mov	xp,37
		call	DispNum 		;Display prim counter
		mov	Xp,46
		call	CurPos
		mov	ah,2
		mov	dl,'.'
		int	21h			;Point
		;Restore Xp Yp
		mov	al,Xa
		mov	Xp,al
		mov	al,Ya
		mov	Yp,al
		inc	Yp
		cmp	Yp,22
		jbe	Yp_Ok
		mov	Yp,0
		call	A_Key
		cmp	Akey,'Q'
		jz	Exit_from_DspPrim
	Yp_Ok:
		inc	Pcnt
		pop	ecx
		inc	ecx
		cmp	ecx,MaxN
		jb	New_Read
		jmp	End_of_DspPrim
	Exit_from_DspPrim:
		pop	ecx
		mov	Xp,0
		mov	Yp,9
		call	CurPos
		mov	dx,offset UserBrk
		call	DspStr
	End_of_DspPrim:
		mov	Xp,0
		mov	Yp,7
		call	CurPos
		mov	dx,offset Clr
		call	DspStr
		mov	Xp,0
		mov	Yp,7
		call	CurPos
		mov	dx,offset ExitClr
		call	DspStr
		mov	Xp,0
		mov	Yp,20
		call	CurPos
		mov	dx,offset Clr
		call	DspStr
		mov	Xp,0
		mov	Yp,23
		call	CurPos
		mov	dx,offset Copyr
		call	DspStr
		ret

	DspPrim endp

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
		mov	Yp,20
		call	CurPos
		mov	dx,offset Prs_key
		call	DspStr
		mov	ah,7
		int	21h
		mov	Akey,al
		mov	al,xa
		mov	xp,al
		mov	al,ya
		mov	yp,al
		pop	dx
		pop	ax
		ret

	A_Key	endp

;--------------------------------------------------------
;	Display String
;--------------------------------------------------------

	DspStr	proc	near

		push	ax
		mov	ah,9
		int	21h
		pop	ax
		ret

	DspStr	endp

	Dta	label	near
	Res	db	21	dup(?)
		db	?
		dw	?
		dw	?
	FSize	dd	0
		db	13	dup(?)
		db	43	dup(?)
	.8086

CODE	ENDS

	END	START

