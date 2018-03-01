PAGE	71,132

TITLE	Playing in the background the HUNGARYAN National Anthem.

COMMENT *
	Written by László Kővári  1990.04.27.
		     	 Last Update  1990.04.28.

	 This program playing the background the HUNGARIAN NATIONAL ANTHEM.

	 Frequency table with dividers:

			 -1	 Base	  +1		 /frequ=divider/
							     HZ
		C	130=9153 261=4559 523=2275
		CISZ	138=8623 277=4296 554=2148
		D	146=8150 293=4061 587=2027
		DISZ	155=7677 311=3826 622=1913
		E	164=7256 329=3617 659=1805
		F	174=6839 349=3409 698=1704
		FISZ	184=6467 369=3224 739=1610
		G	195=6102 391=3043 783=1519
		GISZ	207=5748 415=2867 830=1433
		A	220=5409 440=2704 880=1352
		B	233=5107 466=2553 932=1276
		H	246=4837 493=2413 987=1205

	Hocked free interrupts:

		-242 int = flag, signal the anthem is turn ON or turn OFF
				 if turn ON contain of int 242 is 7777h
		-243 int = flag, signal the anthem was in the memory or
				 wasn`t, if was in the memory contain of
				 int 243 is 7777h
		-244 int = contain new int 1ch address (ANTHEM)
		-245 int = contain old int 1ch address (original, DUMMY IRET)

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


	Phone	db	'06 (41) 21-033'

	OldInt1c	dd	?
	NewInt1c	dd	?

	OnMsg	db	'+----------------------------------------------+',10,13
		db	'| The ANTHEM is turn ON!                       |',10,13
		db	'|                                              |',10,13
		db	'|   The program playing the background in the  |',10,13
		db	'|   HUNGARYAN National Anthem                  |',10,13
		db	'|                                              |',10,13
		db	'|                              (C) Lkov�ri '90 |',10,13
		db	'+----------------------------------------------+',10,13,'$'

	Already_Res	db	'+----------------------------------------------+',10,13
			db	'| WARNING! The ANTHEM is already turn ON!      |',10,13
			db	'|                                              |',10,13
			db	'|                              (C) Lkov�ri '90 |',10,13
			db	'+----------------------------------------------+',10,13,'$'

	OffMsg	db	'+----------------------------------------------+',10,13
		db	'| The ANTHEM is turn OFF!                      |',10,13
		db	'|                                              |',10,13
		db	'|                              (C) Lkov�ri '90 |',10,13
		db	'+----------------------------------------------+',10,13,'$'

	Already_InAc	db	'+----------------------------------------------+',10,13
			db	'| WARNING! The ANTHEM wasn`t turn ON!          |',10,13
			db	'|                                              |',10,13
			db	'|                              (C) Lkov�ri '90 |',10,13
			db	'+----------------------------------------------+',10,13,'$'

	Help	db	'+------------------------------------------------------+',10,13
		db	'| WARNING! The command line is EMPTY!                  |',10,13
		db	'|                                                      |',10,13
		db	'|      Usage: ANTHEM  I  then -> turn ON the ANTHEM    |',10,13
		db	'|             ANTHEM  U  then -> turn OFF the ANTHEM   |',10,13
		db	'|                                                      |',10,13
		db	'|                                    (C) Lkovov�ri '90 |',10,13
		db	'+------------------------------------------------------+',10,13,'$'

	Pause		dw	(0)		;Ket hang kozti szunet
						;szamlaloja
	Delay		dw	(0)		;Egy hang kitartasanak
						;szamlaloja
	Play		db	(0)		;Erteke 77h ha meg kell
						;szolalnia egy hangnak
	Scount		db	(0)		;Hangok szamlaloja
	OnFlag		db	(0)		;Erteke 77h ha be kell kap-
						;csolni a hangot
	Point_S 	dw	(0)		;Egy frequ. ertekre mutat
	Point_D 	dw	(0)		;Egy kitartas ertekre mutat

;--------------------------------------------------------
;	Az 56 hanghoz tartozo frekvencia ertekek /oszto/:
;--------------------------------------------------------

	First_S 	dw	(4061)			;d
			dw	(3826)			;esz
			dw	(3409)			;f
			dw	(2553)			;b
			dw	(3409)			;f
			dw	(3826)			;esz
			dw	(4061)			;d

			dw	(3043)			;g
			dw	(3409)			;f
			dw	(3826)			;esz
			dw	(4061)			;d
			dw	(4559)			;c
			dw	(4061)			;d
			dw	(3826)			;esz
			dw	(4559)			;c
			dw	(4061)			;d
			dw	(3826)			;esz
			dw	(2275)			;c felso

			dw	(3826)			;esz
			dw	(4061)			;d
			dw	(4559)			;c
			dw	(3409)			;f
			dw	(3826)			;esz
			dw	(4061)			;d
			dw	(4559)			;c
			dw	(5107)			;b also
			dw	(4559)			;c
			dw	(4061)			;d

			dw	(2553)			;b
			dw	(2704)			;a
			dw	(3043)			;g
			dw	(3224)			;fisz
			dw	(3043)			;g
			dw	(2704)			;a
			dw	(4061)			;d
			dw	(2027)			;d felso
			dw	(2275)			;c felso
			dw	(2553)			;b
			dw	(2704)			;a

			dw	(2553)			;b
			dw	(2275)			;c felso
			dw	(3409)			;f
			dw	(1913)			;esz felso
			dw	(2027)			;d felso
			dw	(2275)			;c felso
			dw	(2553)			;b
			dw	(2704)			;a
			dw	(3043)			;g
			dw	(3409)			;f
			dw	(3826)			;esz

			dw	(4061)			;d
			dw	(4061)			;d
			dw	(4559)			;c
			dw	(4559)			;c
			dw	(4061)			;d
			dw	(5107)			;b also

;--------------------------------------------------------
;	Az 56 hanghoz tartozo utemertekek /kitartas/	:
;--------------------------------------------------------

	First_D 	dw	(6)			;ta+ti
			dw	(2)			;ti
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(8)			;taa

			dw	(4)			;ta
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(8)			;taa
			dw	(6)			;ta+ti
			dw	(2)			;ti
			dw	(4)			;ta
			dw	(4)			;ta

			dw	(4)			;ta
			dw	(4)			;ta
			dw	(8)			;taa
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(8)			;taa

			dw	(6)			;ta+ti
			dw	(2)			;ti
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(8)			;taa
			dw	(6)			;ta+ti
			dw	(2)			;ti
			dw	(4)			;ta
			dw	(4)			;ta

			dw	(4)			;ta
			dw	(4)			;ta
			dw	(8)			;taa
			dw	(6)			;ta+ti
			dw	(2)			;ti
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(6)			;ta+ti
			dw	(2)			;ti
			dw	(4)			;ta
			dw	(4)			;ta

			dw	(4)			;ta
			dw	(4)			;ta
			dw	(4)			;ta
			dw	(2)			;ti
			dw	(2)			;ti
			dw	(8)			;taa

;------------------------------------------------
;	Sajat TIMER TICK rutin			:
;------------------------------------------------

	NewI1c	proc	far

		pushf				;Hasznalt regiszterek mentese
		push	ax
		push	bx
		push	di
		push	si
		push	ds

		push	cs
		pop	ds			;DS = CS
		cmp	Play,77h		;Szolnia kell ?
		jz	Playing 		;Szolnia kell !

;------------------------------------------------
;	Ket hang kozti szunet			:
;------------------------------------------------

		dec	Pause			;Szunet szamlalo csokkentese
		cmp	Pause,1 		;Szunet vege ?
		jae	Not_end_of_pause	;Nincs vege a szunetnek

;------------------------------------------------
;	Szunet vege				:
;------------------------------------------------

		mov	Play,77h		;Ezutan meg kell szolaltatni
		add	Point_S,2		;Kovetkezo frequ. ertekre
		add	Point_D,2		;-   "   - utem ertekre
		cmp	Scount,55		;Utolso hang volt ?
		jbe	Not_Last		;Nem az utolso

;------------------------------------------------
;	Elolrol kell kezdeni a lejattszast	:
;------------------------------------------------

		mov	Scount,0		;Hangszamlalo nullazasa
		mov	bx,offset First_S	;Frequ. mutato az elsore
		mov	Point_S,bx
		mov	bx,offset First_D	;Utem nutato az elsore
		mov	Point_D,bx
	Not_Last:
		mov	OnFlag,77h		;Majd be kell kapcsolni
		mov	di,Point_D
		mov	ax,[di] 		;Kitartas beallitasa
		mov	bx,3
		mul	bx			;Kitartas felszorzasa
		mov	Delay,ax
		inc	Delay			;Noveli mert a vizsgalata elott
						;mar csokkenti
		mov	si,Point_S
		mov	ax,[si] 		;Frequ. beallitasa
		out	66,al			;Alacsony ertek kikuldese
		mov	al,ah
		out	66,al			;Magas ertek kikuldese
	Not_end_of_pause:
		jmp	To_end_of_IT
	Playing:

;------------------------------------------------
;	Egy hang kitartasa			:
;------------------------------------------------

		dec	Delay			;Kitartas szamlalo csokkentese
		cmp	Delay,1 		;Kitartas vege ?
		jae	Not_end_of_Sustain	;Nincs vege /meg szolnia kell/

;------------------------------------------------
;	Egy hang kitartasanak vege		:
;------------------------------------------------

		mov	Play,0			;Szunet kovetkezik
		mov	Pause,2 		;Szunet ideje
		inc	Pause			;Noveles
		call	Snd_Off 		;Hang kikapcsolasa
		inc	SCount			;Hangszamlalo novelese - mert
						;egy hangot lejattszott
		jmp	To_end_of_IT
	Not_end_of_sustain:

;------------------------------------------------
;	A hang kitartasanak nincs vege		:
;------------------------------------------------

		cmp	OnFlag,77h		;Be kell kapcsolni a hangot ?
		jnz	Not_turn_On		;Mar be van kapcsolva

;------------------------------------------------
;	A hang bekapcsolasa			:
;------------------------------------------------

		mov	OnFlag,0
		call	Snd_On			;Hang bekapcsolasa
	Not_Turn_On:
	To_end_of_IT:

		pop	ds
		pop	si
		pop	di
		pop	bx
		pop	ax
		popf
		jmp	cs:OldInt1c		;ugras az eredetire

	NewI1c	endp

;------------------------------------------------
;	Hang bekapcsolasa			:
;------------------------------------------------

	Snd_On	proc	near

		push	ax
		in	al,97			;A 97. port aktualis bitallasa-
						;nak beolvasasa
		or	al,3			;Az utolso ket bit bekepcsolasa
		out	97,al			;Az uj ertek visszakuldese
		pop	ax			;Eredeti ertek a kikapcsolashoz
		ret

	Snd_On	endp

;--------------------------------------------------------
;	Hang kikapcsolasa				:
;--------------------------------------------------------

	Snd_Off proc	near

		push	ax
		in	al,97			;A 97. port aktualis bitallasa-
						;nak beolvasasa
		and	al,11111100b		;Kikapcsolasi maszk
		out	97,al			;Kikapcsol
		pop	ax
		ret

	Snd_Off endp

	Myp_1c_E	Label	Far

ENTRY:

;
;
;	Main program.
;
;

;--------------------------------------------------------
;	Megvizsgalja hogy most aktiv-e			:
;	A 242 -es iT. helyere van leteve a jelzo hogy	:
;	eppen aktiv-e a rezidens resz			:
;--------------------------------------------------------

	;Lekerdezi hogy aktiv-e

		mov	ah,35h
		mov	al,242
		int	21h

		cmp	bx,7777h		;Aktiv ?
		jz	Active			;Eppen aktiv
		jnz	Inactive		;Eppen nem mukodik

;--------------------------------------------------------
;	Active ag					:
;--------------------------------------------------------
;--------------------------------------------------------
;	A rutin megnezi mit kell csinalni,		:
;	Installalni vagy Uninstallalni			:
;--------------------------------------------------------

	Active:
		call	Cmd
		cmp	al,'e'
		jnz	Not_e
		jmp	Exit_to_Dos	;kilepes
	Not_e:
		cmp	al,'i'
		jz	Turn_OnA	;be kell kapcsolni
		cmp	al,'u'
		jz	Turn_OffA	;ki kell kapcsolni

	Turn_OnA:

;--------------------------------------------------------
;	Aktiv es be akarjak kapcsolni HIBA		:
;--------------------------------------------------------

		call	OnErr
		jmp	Exit_to_Dos

	Turn_OffA:

;--------------------------------------------------------
;	Aktiv es ki akarjak kapcsolni			:
;--------------------------------------------------------

		call	Switch_Off
		jmp	Exit_to_Dos

;--------------------------------------------------------
;	Inactiv ag					:
;--------------------------------------------------------
;--------------------------------------------------------
;	A rutin megnezi mit kell csinalni,		:
;	Installalni vagy Uninstallalni			:
;--------------------------------------------------------

	InActive:

		call	Cmd
		cmp	al,'e'
		jnz	Not_e1
		jmp	Exit_to_Dos	;kilepes
	Not_e1:
		cmp	al,'i'
		jz	Turn_OnI	;be kell kapcsolni
		cmp	al,'u'
		jnz	No_Switch_Off
		jmp	Turn_OffI	;ki kell kapcsolni
	No_Switch_Off:

;--------------------------------------------------------
;	Bekapcsolasi ag 				:
;--------------------------------------------------------

	Turn_OnI:

;--------------------------------------------------------
;	Megnezi volt-e mar a memoriaban 		:
;--------------------------------------------------------

		mov	ah,35h
		mov	al,243
		int	21h

		cmp	bx,7777h		;volt ?
		jz	In_Memory		;benne van
		jmp	Isnt_in_it		;nincs benne

;--------------------------------------------------------
;	Mar a memoriaban van	bekapcsolas		:
;--------------------------------------------------------

	In_Memory:

	;Kezdoertekek beallitasa

		mov	Play,77h		;Szolnia kell
		mov	OnFlag,77h		;Be kell kapcsolni
		mov	bx,offset First_S	;Frequ. mutato az elsore
		mov	Point_S,bx		;Mutato feltoltese
		mov	bx,offset First_D	;Utem nutato az elsore
		mov	Point_D,bx		;Mutato feltoltese
		mov	di,Point_D
		mov	ax,[di] 		;Kitartas beallitasa
		mov	bx,3
		mul	bx			;Kitartas felszorzasa
		mov	Delay,ax
		inc	Delay			;Noveli mert a vizsgalata elott
						;mar csokkenti
		mov	si,Point_S
		mov	ax,[si] 		;Frequ. beallitasa
		out	66,al
		mov	al,ah
		out	66,al
		mov	Pause,2 		;Kesleltetes ket hang kozt
		inc	Pause			;Noveles
		mov	Scount,0		;Hangok szamlaloja

	;Bekapcsolas

		call	Switch_OnR
		jmp	Exit_to_Dos

;--------------------------------------------------------
;	Meg nem volt elinditva be kell kapcsolni	:
;--------------------------------------------------------

	Isnt_in_it:

	;Kezdoertekek beallitasa

		mov	Play,77h		;Szolnia kell
		mov	OnFlag,77h		;Be kell kapcsolni
		mov	bx,offset First_S	;Frequ. mutato az elsore
		mov	Point_S,bx		;Mutato feltoltese
		mov	bx,offset First_D	;Utem nutato az elsore
		mov	Point_D,bx		;Mutato feltoltese
		mov	di,Point_D
		mov	ax,[di] 		;Kitartas beallitasa
		mov	bx,3
		mul	bx			;Kitartas felszorzasa
		mov	Delay,ax
		inc	Delay			;Noveli mert a vizsgalata elott
						;mar csokkenti
		mov	si,Point_S
		mov	ax,[si] 		;Frequ. beallitasa
		out	66,al
		mov	al,ah
		out	66,al
		mov	Pause,2 		;Kesleltetes ket hang kozt
		inc	Pause			;Noveles
		mov	Scount,0		;Hangok szamlaloja

	;Bekapcsolas

		call	Switch_On
		jmp	Tsr			;rezidens kilepes

;--------------------------------------------------------
;	Kikapcsolasi ag 				:
;--------------------------------------------------------
;--------------------------------------------------------
;	Nem aktiv es ki akarjak kapcsolni HIBA		:
;--------------------------------------------------------

	Turn_offI:

		call	OffErr

	Exit_To_Dos:

		mov	ah,0
		int	20h			;kilepes

	Tsr:

		mov	dx,offset Myp_1c_E
		inc	dx
		push	ds
		pop	es
		int	27h			;rezidens kilepes

;--------------------------------------------------------
;	Nem aktiv es ki akarjak kapcsolni HIBA		:
;--------------------------------------------------------

	OffErr	proc	near

		push	ax
		push	dx
		mov	ah,9
		mov	dx,offset Already_InAc
		int	21h
		pop	dx
		pop	ax
		ret

	OffErr	endp

;--------------------------------------------------------
;	Nem aktiv meg nem volt elinditva, be kell kapcs.:
;--------------------------------------------------------

	Switch_On	proc	near

		push	ax
		push	dx

	;Uj int cim tarolasa a kesobbi elinditasokhoz

		mov	ah,25h
		mov	al,244
		mov	dx,offset NewI1c
		int	21h

	;Eredeti int 1ch cim letarolasa a kikapcsolashoz
	;ES-BX=SEG-OFFS

	;Eredeti cim lekerese

		mov	ah,35h
		mov	al,1ch
		int	21h

	;Letarolja a reginek a cimet

		mov	si,offset OldInt1c
		mov	[si],bx 		;offszet
		add	si,2
		mov	[si],es 		;szegmens

	;Beallitja - letarolja a kikapcsolas miatt

		mov	ah,25h
		mov	al,245
		push	es
		pop	ds
		mov	dx,bx
		int	21h
		push	cs
		pop	ds			;DS=CS
		push	cs
		pop	es			;ES=CS

	;Aktivitast jelzo BE allasba

		mov	ah,25h
		mov	al,242
		mov	dx,7777h
		int	21h

	;Jelzi, hogy van a memoriaban REZ. resz

		mov	ah,25h
		mov	al,243
		mov	dx,7777h
		int	21h

	;Bekapcsolasi uzenet

		mov	ah,9
		mov	dx,offset OnMsg
		int	21h

	;Atallitja a sajat 1ch int-re

		mov	ah,25h
		mov	al,1ch
		mov	dx,offset NewI1c
		int	21h

		pop	dx
		pop	ax
		ret

	Switch_On	endp

;--------------------------------------------------------
;	Nem aktiv de mar el volt inditva, BE kapcsolas	:
;--------------------------------------------------------

	Switch_OnR	proc	near

		push	ax
		push	dx

	;Felolvassa az Uj int cimet
	;ES-BX=SEG-OFFS

		mov	ah,35h
		mov	al,244
		int	21h

	;Atallitja az uj cimre

		mov	ah,25h
		mov	al,1ch
		push	es
		pop	ds
		mov	dx,bx			;OFFS
		int	21h
		push	cs
		pop	ds			;DS=CS
		push	cs
		pop	es			;ES=CS

	;Aktivitast jelzo be allalsba

		mov	ah,25h
		mov	al,242
		mov	dx,7777h
		int	21h

	;Uzenet, bekapcsolva

		mov	ah,9
		mov	dx,offset OnMsg
		int	21h

		pop	dx
		pop	ax
		ret

	Switch_OnR	endp

;--------------------------------------------------------
;	Ha aktiv es KI kell kapcsolni			:
;--------------------------------------------------------

	Switch_Off	proc	near

		push	ax
		push	dx

	;Eredeti rutin cimet lekeri
	;EX-BX ben SEG-OFFS

		mov	al,245
		mov	ah,35h
		int	21h

	;Visszaallitja az eredetire

		mov	ah,25h
		mov	al,1ch
		push	es
		pop	ds
		mov	dx,bx
		int	21h
		push	cs
		pop	ds			;DS=CS
		push	cs
		pop	es			;ES=CS

	;Aktivitast jelzo flag ki allasba

		mov	ah,25h
		mov	al,242
		mov	dx,0			;Nem aktiv
		int	21h

	;Hang kikapcsolasa

		call	Snd_Off 		;Hang ki

	;Uzenet, kikapcsolva

		mov	ah,9
		mov	dx,offset OffMsg
		int	21h

		pop	dx
		pop	ax
		ret

	Switch_Off	endp

;--------------------------------------------------------
;	Ha be van kapcsolva es be akarjak kapcsolni	:
;--------------------------------------------------------

	OnErr	proc	near

		push	ax
		push	dx
		mov	ah,9
		mov	dx,offset Already_Res
		int	21h
		pop	dx
		pop	ax
		ret

	OnErr	endp

;--------------------------------------------------------
;	Parancssor vizsgalata				:
;	Visszatereskor: 				:
;	AL=i ha installalni kell			:
;	AL=i ha uninstallalni kell			:
;	AL=e ha ki kell lepni a DOS-ba			:
;--------------------------------------------------------

	Cmd	proc	near

		push	dx
		push	si
		mov	si,80h
		cmp	byte ptr [si],0
		jnz	Not_Empty
	Error:
		mov	dx,offset Help
		mov	ah,9
		int	21h
		jmp	Exit_from_Cmd		;semmi ertelmes nem volt
						;a parancssorban
	Not_Empty:
		inc	si
		mov	cx,80			;80 byte-ot vizsgal
	New_Char:
		lodsb
		cmp	al,32			;Space ?
		jnz	Anything		;valami van
		loop	New_Char
		jmp	Error			;ha csupa SPACE

	Anything:

;--------------------------------------------------------
;	Funkcio valasztas				:
;--------------------------------------------------------

		cmp	al,'I'
		jz	Install 		;be
		cmp	al,'i'
		jz	Install 		;be
		cmp	al,'U'
		jz	UnInstall		;ki
		cmp	al,'u'
		jz	UnInstall		;ki
		jmp	Error

	Install:
		mov	al,'i'                  ;installalni
		jmp	Exit_to
	UnInstall:
		mov	al,'u'
		jmp	Exit_to
	Exit_from_Cmd:
		mov	al,'e'                  ;ki kell lepni
	Exit_to:
		pop	si
		pop	dx
		ret

	Cmd	endp

CODE	ENDS

	END	START

