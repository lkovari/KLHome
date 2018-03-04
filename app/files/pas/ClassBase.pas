unit ClassBase;

interface

uses Classes, sysutils;

type

	TMathOperation = (opAdd, opSub, opMul, opDiv);

  TOnRefresh = procedure (Oper1, Oper2: double; Op: String) of object;
	TOnRefreshStat = procedure (ag, aw, sg, sw, dg, dw, mg, mw, msec: integer) of object;

	TBaseOpr	= Class
  private
  	FFullElapsed,
  	FHit: integer;
  	FElapsedTime: TDateTime;
    FOper1: Double;
    FResult: double;
    FOper2: Double;
    FMax: integer;
    Fopr: TMathOperation;
    FOnRefresh: TOnRefresh;
    FSubG, FSubW,
    FAddG, FAddW,
    FMulG, FMulW,
    FDivG, FDivW: integer;
    FOnRefreshStat: TOnRefreshStat;
    FMaxLesson: integer;
    function getResult: double;
    procedure setOper1(const Value: Double);
    procedure setOper2(const Value: Double);
    function getOper1: Double;
    function getOper2: Double;
    function generateOperand(Max: Integer): double;
    function getMSec(et: TDateTime): integer;
  protected
  public
  	constructor Create;
		destructor Destroy; Override;
		procedure nextGen;
		procedure setStat(op: TMathOperation; good: boolean);
		property Max: integer read FMax write FMax;
		property Operation: TMathOperation read Fopr write FOpr;
		property Result: double read GetResult write FResult;
		property MaxLesson : integer read FMaxLesson write FMaxLesson;
    property Operand1: Double read GetOper1 write SetOper1;
    property Operand2: Double read GetOper2 write SetOper2;
    property OnRefresh: TOnrefresh read FOnRefresh write FOnrefresh;
    property OnRefresStat: TOnRefreshStat read FOnRefreshStat write FOnRefreshStat;
  end;


implementation

{ TBaseOpr }

constructor TBaseOpr.Create;
begin
	FMaxLesson := 100000;
	FOper1 := -1;
  FOper2 := -1;
  FSubG := 0;
  FSubW := 0;
  FAddG := 0;
  FAddW := 0;
  FMulG := 0;
  FMulW := 0;
  FDivG := 0;
  FDivW := 0;
  FHit := 0;
  FFullElapsed := 0;
  Randomize;
  NextGen;
end;

destructor TBaseOpr.Destroy;
begin

  inherited;
end;

function TBaseOpr.GenerateOperand(Max: Integer): double;
begin
	Result := -1;
	repeat
  	Result := random(Max);
  until result > -1;
end;

function TBaseOpr.GetOper1: Double;
begin
	if (FOpr = opSub) then
  	repeat
			FOper1 := GenerateOperand(Max);
    until (FOper1 <= FMax)
  else
		FOper1 := GenerateOperand(Max);
  if (FOpr = opDiv) then begin
  	Foper1 := (FOper1 * FOper2);
    result := FOper1;
	end
  else
		Result := FOper1;
end;

function TBaseOpr.GetOper2: Double;
begin
	if (FOpr = opSub) then
  	repeat
			FOper2 := GenerateOperand(Max);
    until (FOper1 >= FOper2) and (FOper2 <= FMax)
  else
		FOper2 := GenerateOperand(Max);
  Result := FOper2;
end;

function TBaseOpr.GetResult: double;
begin
	Result := -1;
  case FOpr of
  	opAdd : FResult := FOper1 + FOper2;
    opSub : FResult := FOper1 - FOper2;
    opMul : FResult := FOper1 * FOper2;
    opDiv : FResult := FOper1 / FOper2;
  end;
  Result := FResult;
end;

function TBaseOpr.getMSec(et: TDateTime): integer;
var
	h,m,s,msec: word;
begin
	decodeTime(et, h, m, s, msec);
  result := msec + (s * 100) + ((m * 60) * 100) + (((h * 60) * 60) * 100);
end;

procedure TBaseOpr.NextGen;
var
	o: String;
begin
	if FOpr = opDiv then
	  repeat
		  getOper2;
  		getoper1;
	  until (FOper1 <> 0) and (FOper2 <> 0)
  else begin
		getoper1;
  	getOper2;
  end;
  //getResult;
  case FOpr of
  	opAdd : O := '+';
    opSub : O := '-';
    opMul : O := '*';
    opDiv : O := '/';
  end;
  if Assigned(FOnRefresh) then begin
  	FOnrefresh(FOper1, FOper2, O);
    FElapsedTime := now;
	end;
	FmaxLesson := FMaxLesson - 1;
end;

procedure TBaseOpr.SetOper1(const Value: Double);
begin
  FOper1 := Value;
end;

procedure TBaseOpr.SetOper2(const Value: Double);
begin
  FOper2 := Value;
end;

procedure TBaseOpr.setStat(op: TMathOperation; good: boolean);
var
	think: integer;
begin
	inc(FHit);
	FElapsedTime := now - FElapsedTime;
  FFullElapsed := FFullElapsed + getMSec(FElapsedTime);
  think := FFullElapsed div FHit;
	if good then
    case FOpr of
      opAdd : inc(FAddG);
      opSub : inc(FSubG);
      opMul : inc(FMulG);
      opDiv : inc(FDivG);
    end
  else
    case FOpr of
      opAdd : inc(FAddW);
      opSub : inc(FSubW);
      opMul : inc(FMulW);
      opDiv : inc(FDivW);
    end;
  if assigned(FOnRefreshStat) then
  	FOnRefreshStat(FAddG, FAddW, FSubG, FSubW, FDivG, FDivW, FMulG, FMulW, round(think / 100));
end;


end.
