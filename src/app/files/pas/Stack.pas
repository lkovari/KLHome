unit Stack;

interface

uses Windows, SysUtils, Classes, StdCtrls, Graphics;
{
	04.21.2003
		+		add the HintOfStackEntryType property



}
type

	TStackEntryType = (etUnknown, etInteger, etDouble, etString, etPointer, etComponent, etVariant);

	TStackValue = Class
	private
		FValueDouble: double;
		FValueInt: integer;
		FValuePtr: pointer;
		FValueStr: string;
		FEntryType: TStackEntryType;
	protected
	public
		constructor create(aEntryType: TStackEntryType; aInteger: integer; aDouble: double; aString: string; aPointer: pointer);
		destructor destroy; override;
		property ValueInteger: integer read FValueInt write FValueInt;
		property ValueDouble: double read FValueDouble write FValueDouble;
		property ValueString: string read FValueStr write FValueStr;
		property ValuePointer: pointer read FValuePtr write FValuePtr;
		property EntryType: TStackEntryType read FEntryType write FEntryType;
	end;

	TOnPush = procedure (v: TStackValue; stackPointer: integer) of object;
	TOnPop = procedure (v: TStackValue; stackPointer: integer) of object;
	TOnEmpty = procedure of object;
	TOnUnderFlow = procedure of object;

	TComponentReadManager = class
	public
		procedure DoError(Reader: TReader; const Message: string; var Handled: Boolean);
	end;


	TStack = class(Tlist)
	private
		FStackValue: TStackValue;
		FSTackPointer: integer;
		FOnPop: TOnPop;
		FOnPush: TOnPush;
		FOnUnderFlow: TOnUnderFlow;
		FOnEmpty: TOnEmpty;
		FHintOfStackEntryType: TStackEntryType;
		function getSTackPointer: integer;
		function getStackValue(sp: integer): pointer;
		procedure setStackValue(sp: integer; const Value: pointer);
		function getStackEmpty: boolean;
		procedure setStackEmpty(const Value: boolean);
		function isStackEmpty: boolean;
		procedure checkStackEmpty;
		function getHintOfStackEntryType: TStackEntryType;
		function getHintOfStackEntryTypeAsString: String;
	protected
		function ReadComponent(s: TStream; c: TComponent = nil): TComponent;
		function ComponentToString(Component: TComponent): string;
		function StringToComponent(Value: string): TComponent;
	public
		constructor create;
		destructor destroy; override;
		function Pop: pointer;
		function Push(ob: pointer): integer;

		function PushInteger(v: integer): integer;
		function PushDouble(v: double): integer;
		function PushString(v: string): integer;
		function PushPointer(v: pointer): integer;
		function PushComponent(v: TComponent): integer;

		function popInteger: integer;
		function popDouble: double;
		function popString: string;
		function popPointer: pointer;
		function popComponent: TComponent;

		property StackPointer: integer read getStackPointer write FSTackPointer;
		property StackValue[sp : integer] : pointer read getStackValue write setStackValue;
		property StackEmpty: boolean read getStackEmpty write setStackEmpty;
		property HintOfStackEntryType: TStackEntryType read getHintOfStackEntryType write FHintOfStackEntryType;
		property HintOfStackEntryTypeAsString: String read getHintOfStackEntryTypeAsString;

		property OnPush: TOnPush read FOnPush write FOnPush;
		property OnPop: TOnPop read FOnPop write FOnPop;
		property OnEmpty: TOnEmpty read FOnEmpty write FOnEmpty;
		property OnUnderFlow: TOnUnderFlow read FOnUnderFlow write FOnUnderFlow;
	end;

var
	FComponentReadManager: TComponentReadManager;


implementation

{ TStack }

function TStack.isStackEmpty: boolean;
begin
	result := getStackPointer = -1;
end;

constructor TStack.create;
begin
	inherited create;
	FSTackPointer := self.Count;
end;

destructor TStack.destroy;
begin

  inherited destroy;
end;

function TStack.getStackEmpty: boolean;
begin
	result := getStackPointer = -1;
end;

function TStack.getStackPointer: integer;
begin
	FStackPointer := self.Count - 1;
  Result := FSTackPointer;
end;

function TStack.getStackValue(sp: integer): pointer;
begin
	try
		result := self.items[sp];
  except
  	result := nil;
  end;
end;

function TStack.Pop: pointer;
var
	sp: integer;
begin
	result := nil;
	if getStackPointer > -1 then begin
		result := self.last;
		self.Delete(self.Count - 1);
	  sp := getStackPOinter;
  	if assigned(FOnPop) then
  		FOnPop(result, sp);
	  checkStackEmpty;
  end
  else
  	if assigned(FOnUnderFlow) then begin
			FOnUnderFlow;
      result := nil;
    end;
  // the care of user for freeze the allocated memory for passed object
end;

function TStack.popDouble: double;
begin
	result := -9999999;
	FStackValue := TStackValue(pop);
  if assigned(FStackValue) then
		result := FStackValue.ValueDouble;
  freeAndNil(FStackValue);
end;

function TStack.popInteger: integer;
begin
	result := -9999999;
	FStackValue := TStackValue(pop);
  if assigned(FStackValue) then
		result := FStackValue.ValueInteger;
  freeAndNil(FStackValue);
end;

function TStack.popPointer: pointer;
begin
	result := nil;
	FStackValue := TStackValue(pop);
	if assigned(FStackValue) then
		result := FStackValue.ValuePointer;
	freeAndNil(FStackValue);
end;

function TStack.popString: string;
begin
	result := '';
	FStackValue := TStackValue(pop);
	if assigned(FStackValue) then
		result := FStackValue.ValueString;
	freeAndNil(FStackValue);
end;

function TStack.Push(ob: pointer): integer;
var
	sp: integer;
begin
	result := self.add(ob);
  sp := getStackPointer;
  if assigned(FOnPush) then
  	FOnPush(ob, sp);
end;

function TStack.PushDouble(v: double): integer;
begin
	result := push(TStackValue.create(etDouble, -1, v, '', nil));
end;

function TStack.PushInteger(v: integer): integer;
begin
	result := push(TStackValue.create(etInteger, v, -1, '', nil));
end;

function TStack.PushPointer(v: pointer): integer;
begin
	result := push(TStackValue.create(etPointer, -1, -1, '', v));
end;

function TStack.PushString(v: string): integer;
begin
	result := push(TStackValue.create(etString, -1, -1, v, nil));
end;

procedure TStack.setStackEmpty(const Value: boolean);
begin

end;

procedure TStack.setStackValue(sp: integer; const Value: pointer);
begin
	// Nothing to do!
end;


{ TStcackValue }

constructor TStackValue.create(aEntryType: TStackEntryType; aInteger: integer; aDouble: double;
	aString: string; aPointer: pointer);
begin
	FEntryType := aEntryType;
	FValueInt := aInteger;
	FValueDouble := aDouble;
	FValueStr := aString;
	FValuePtr := aPointer;
end;

destructor TStackValue.destroy;
begin

	inherited Destroy;
end;

procedure TStack.checkStackEmpty;
begin
  if isStackEmpty then
   	if assigned(FOnEmpty) then
     	FOnEmpty;
end;

function TStack.PushComponent(v: TComponent): integer;
var
	pc: TPersistentClass;
	st: String;
begin
	pc := TPersistentClass(v.ClassType);
	RegisterClass(pc);
	st := ComponentToString(v);
	result := push(TStackValue.create(etComponent, -1, -1, st, nil));
end;

function TStack.popComponent: TComponent;
var
	st: string;
begin
	result := nil;
	FStackValue := TStackValue(pop);
	if assigned(FStackValue) then
		st := FStackValue.ValueString;
	freeAndNil(FStackValue);
	result := StringToComponent(st);
	//UnRegisterClass(TPersistentClass(Result.ClassType));
end;

function TStack.ComponentToString(Component: TComponent): string;
var
	ms: TMemoryStream;
	ss: TStringStream;
begin
	ms := TMemoryStream.Create;
	try
		ss := TStringStream.Create('');
		try
			ms.WriteComponent(Component);
			ms.Seek(0, soFromBeginning);
			ObjectBinaryToText(ms, ss);
			ss.Seek(0, soFromBeginning);

			Result := ss.DataString;
		finally
			ss.Free;
		end;
	finally
		ms.Free
	end;
end;

function TStack.StringToComponent(Value: string): TComponent;
var
	ss: TStringStream;
	ms: TMemoryStream;
begin
	ss := TStringStream.Create(Value);
	try
		ms := TMemoryStream.Create;
		try
			ObjectTextToBinary(ss, ms);
			ms.Seek(0, soFromBeginning);
			Result := ReadComponent(ms);
		finally
			ms.Free;
		end;
	finally
		ss.Free;
	end;
end;

function TStack.ReadComponent(s: TStream; c: TComponent): TComponent;
var
	R: TReader;
begin
	R := TReader.Create(s, 4096);
	try
		R.OnError := FComponentReadManager.DoError;
		Result := R.ReadRootComponent(c);
	finally
		R.OnError := nil;
		R.Free;
	end;
end;

function TStack.getHintOfStackEntryType: TStackEntryType;
begin
	Result := etUnknown;
	if getStackPointer > -1 then
		FHintOfStackEntryType := TStackValue(self.last).EntryType;
	result := FHintOfStackEntryType;
end;

function TStack.getHintOfStackEntryTypeAsString: String;
begin
	result := 'Unknown';
	case getHintOfStackEntryType of
		etInteger : result := 'Integer';
		etDouble : result := 'Double';
		etString : result := 'String';
		etPointer : result := 'Pointer';
		etComponent : result := 'Component';
		etVariant : result := 'Variant';
	end;
end;

{ TComponentReadManager }

procedure TComponentReadManager.DoError(Reader: TReader;
  const Message: string; var Handled: Boolean);
begin
	Handled := True;
end;

end.
