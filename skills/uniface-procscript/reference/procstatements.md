---
title: "ProcScript Statements"
category: "Uniface 9.7 ProcScript Reference"
entries: 173
---

# = (compute)

Assign the value of an expression to a field, variable, or function.

{compute}
Target{/init}  = Expression

## Switches and Clauses

* compute—computes the value
  of Expression and assigns it to Target. In practice, the
  statement is usually omitted, leaving only the assignment operator
* /init—sets the value of the
  target field *in a non-database occurrence* without changing the status of
  $fieldmod, $occmod, $occdbmod,
  $formmod, $formdbmod, $instancemod, or
  $instancedbmod.

  The /init switch is useful
  when you are assigning a retrieve profile for an empty entity or initializing values in a new
  occurrence.

  This switch has no effect once a
  retrieve has been completed.

## Parameters

* Target—name of a field,
  variable, or function. (Not all functions can serve as the target of an assignment; see the
  information about individual functions in  *Proc functions* .)
* Expression—expression made
  up of operators and parentheses (()) used to combine elements of the Proc language, that is,
  constants, fields, variables, and functions.

## Return Values

The = statement does not affect
$status.

## Use

Allowed in all Uniface component types.

## Description

The compute instruction itself
is optional and is usually used for legibility.

In an assignment statement, reading from left to
right, the first equals sign (=) is the assignment operator. If more than one equals sign occurs,
the rest are interpreted as relational operators. For example, in the following figure, the Boolean
result of the expression x="A" is assigned to $1:

Multiple equals signs in a `compute` statement

1. Assignment operator
2. Relational operator
3. Boolean value

**Note:**  In self-contained services and reports, global
variables and some Proc functions cannot be used in the expression, or as the target of the
assignment.

The value of Expression is
implicitly converted to the data type associated with Target. For more information, see [Type Conversion](../../datatypehandling/datatypeconversion.md). .

## Compound Operators

Compound operators combine the assignment operator (`=`) with an
arithmetic operator. They provide a shorthand notation when performing an arithmetic calculation on
the value of a field or variable and assigning the result to the same field or variable. For
example:

* `A += 1` is equal to `A
  = A + 1`
* `A -= 1` is equal to `A
  = A - 1`
* `A *= 2` is equal to `A
  = A * 2`
* `A /= 3` is equal to `A
  = A / 3`
* `A %= 10` is equal to `A
  = A % 10`

## =

The following example shows the use of the
`compute` statement:

```procscript
; trigger: Leave Field
TOTPRICE = (QUANTITY * PRICE)
$1 = CUSTNAME
$2 = "price modified"
```

## Setting a Retrieve Profile Using /init

The following example uses the
`/init` switch to set a retrieve profile in the Execute trigger of a component.

```procscript
; trigger: Execute
GENDER/init = "M"
JOB/init = "RETIRED"
retrieve
```

## Related Topics

- [$fieldmod](../procfunctions/_fieldmod.md)
- [$instancemod](../procfunctions/_instancemod.md)
- [$instancedbmod](../procfunctions/_instancedbmod.md)
- [$occmod](../procfunctions/_occmod.md)
- [Implicit Type Conversion](../../datatypehandling/implicit_type_conversion.md)


---

# activate

Starts an operation on a specified component.

activate
{/list | /sync | /async |
/stateless}  InstName{.LitOperationName  (  
{ArgumentList}  ) }

## Switches

* /list—passes two parameters
  in ArgumentList, each of which is a typed Uniface list, to hold the input and
  output parameters.
* /stateless—invokes a
  component operation in a stateless manner. When stateless operations are invoked on Uniface
  components, a temporary instance is created that is automatically deleted when the operation is
  finished. Stateless operation invocation is also supported in the communication to Uniface servers.
  Stored procedure components are stateless by default.
* /async and
  /sync—specify the communications mode for the operation; that is, the operation
  communicates either synchronously or asynchronously. This switch takes precedence over the switch
  on the newinstance statement and the component property as specified in the
  Signature Editor.

  Asynchronous operation invocation is only
  supported for components that are executed in a shared Uniface server or in an external middleware
  environments. Operations that are asynchronously invoked are not allowed to
  have OUT or INOUT parameters. They do not return a return value.

## Parameters

* InstName—name of a
  component instance that holds the definition for the requested operation; maximum length of 16
  bytes.

  If an instance with this name cannot be
  found, an implicit newinstance statement is executed to create an instance,
  using InstName as the name of the component; default properties are used for the
  new instance.
* LitOperationName—literal
  name of an operation that is part of the specified component instance, or a variable containing the
  name of an operation as a string. The value can be `exec`, `accept`,
  `quit`, or a named operation.

  If no operation and arguments are specified,
  .EXEC() is assumed; that is, the Execute trigger of the component
  InstName is started with no parameters. Do not enclose the name in quotation
  marks (").
* ArgumentList—a
  comma-separated list of arguments to the operation. The number of arguments supplied must match the
  number and type of parameters defined with the params statement for the
  operation LitOperationName. If the data type of an argument does not match the
  type of the corresponding parameter, Uniface attempts to convert the data to the proper type.

## Return Values

Operations that are asynchronously invoked are
not allowed to have OUT or INOUT parameters. They will not return a return value.

If no return or
exit statement is present, activate returns default values in
$status.

Values returned in $status

| Value | Description |
| --- | --- |
| 10 | The user used ^QUIT to leave the form that was started with activate. |
| 9 | The user used ^ACCEPT to leave the form that was started with activate. |
| 0 | $status has not been assigned a value by the activated operation, or if there is no return statement present |
| <0 | An error occurred. $procerror contains the exact error.  When a negative value is returned for $status, the values of parameters with direction OUT and INOUT must be considered to be undefined in the component that activated LitOperationName. |
| >0 | Value returned by the operation that was activated. In this case, $procerror is set to zero. (Since Uniface considers a negative value to be an error, it is not a good idea to return a negative value from the activated operation.) |

Values commonly returned by $procerror following
activate

| Value | Error constant | Meaning |
| --- | --- | --- |
| -50 | <UACTERR\_NO\_SIGNATURE> | Signature descriptor for the current component not found (in ULANA.DICT, USYSANA.DICT, URR file, or resource file). For example, the component name provided is not valid.  Signature descriptor found but an interface is missing or invalid. |
| -51 | <UACTERR\_SIGNATURE\_ID> | The identifier of the compiled component does not match the identifier in the signature descriptor (in ULANA.DICT, USYSANA.DICT, URR file, or resource file). |
| -52 | <UACTERR\_PROTOCOL> | Protocol error (wrong sequence of operations). |
| -53 | <UACTERR\_ENTITY\_GET> | An error occurred while copying the occurrences of an entity parameter to occurrences of the activated operation. This occurs at the start of processing for the activate statement on either the client or the server. |
| -54 | <UACTERR\_ENTITY\_PUT> | An error occurred while copying occurrences of the entity parameter in the activated operation to occurrences of the component instance. This occurs at the end of processing for the activate statement on either the client or the server. |
| -55 | <UACTERR\_PARAMETER\_GET> | An error occurred while getting an `OUT` or `INOUT` parameter from the activated operation. For example, the actual parameter provided cannot be used to receive output because it is a constant string. This occurs at the end of processing for the activate statement on either the client or the server. |
| -56 | <UACTERR\_PARAMETER\_PUT> | An error occurred while putting an `IN` or `INOUT` parameter into the activated operation. This error occurs at the start of processing for the `activate` statement on either the client or the server. |
| -57 | <UACTERR\_NO\_INSTANCE> | The named instance cannot be found in the component pool. |
| -58 | <UACTERR\_NO\_COMPONENT> | The named component cannot be found. |
| -59 | <UACTERR\_NO\_OPERATION> | No definition found for operation. |
| -60 | <UACTERR\_ACTION\_ON\_MODALFORM> | An attempt was made by an instance other than the current modal form instance to start an operation other than the `EXEC` operation. |
| -61 | <UACTERR\_ENTITY\_DUMMY> | The entity specified as an entity parameter is a dummy entity. |
| -62 | <UACTERR\_ENTITY\_PARAM\_MISMATCH> | The entity specified as an entity parameter must be the same entity as that specified in the operation. That is, one is a supertype and the other is a subtype of that supertype, or both are subtypes of the same supertype. |
| -73 | <ACTERR\_REMOTE\_NOT\_SUPPORTED> | Operation with byref-Struct parameter cannot be activated across processes. For more information, see [Struct Parameters](../../structs/structparameters.md). |
| -104 | <UNS\_UNSPATH\_ERROR> | The path to the remote component is not specified in the Name Server assignment file. |
| -154 | <UACTERR\_INSTANCE\_NAME\_EXISTS> | An instance with this name already exists.  This error code is returned, for example, in the following cases:   * when a modal form which is already   active is activated again * when an attempt is made to activate a   modal form from a non-modal form |
| -155 | <UACTERR\_CREATE\_INSTANCE> | An error occurred while creating an instance:  The component could not be loaded. An exit statement was executed in the operation `INIT`. |
| -164 | <UACTERR\_DEL\_POSTPONED\_PROC> | The instance is in the process of being deleted.  For example, between a deleteinstance or exit and the time the instance is actually deleted, an attempt is made to activate an operation in the instance being deleted. |
| -168 | <UACTERR\_ZOOM\_ACTIVE> | Zoom window active. It is not possible to start a Form from a zoom window. |
| -180 | UACTERR\_ACCESS\_DENIED | An operation or trigger that is being activated from a web or SOAP client has not been declared as public web or public soap but was compiled with $REQUIRE\_PUBLIC\_DECL`=1`. |
| -1105 | <UPROCERR\_INSTANCE> | The instance name provided is not valid. (For more information, see [newinstance](newinstance.md).) For example, the argument contains incorrect characters. |
| -1120 | <UPROCERR\_OPERATION> | The operation name provided is not valid (For more information, see [operation](operation.md).) |
| -1122 | <UPROCERR\_NARGUMENTS> | Wrong number of arguments. |
| -1123 | <UPROCERR\_NPARAMETERS> | Wrong number of parameters. |
| -1202 | <PROCERR\_LARGE> | Value of parameter is too large. |
| -1406 | <PROCERR\_MEMORY> | Memory allocation failure. |
| -1411 | <UPROCERR\_EDITTWICE> | activate was performed on a modal form that is already in edit mode and that has an empty Execute trigger (an implicit edit). |

## Use

Allowed in all Uniface component types.

## Description

The activate command is
normally used after newinstance, which creates a (named) instance of the
specified component.

However, if newinstance is not
used first, or the specified instance name cannot be found, an implicit
newinstance statement is executed to create an instance, using
InstName as the name of the component; default properties are used for the new
instance.

For example, the following command:

```procscript
activate "myCpt"
```

implicitly executes the following statements:

```procscript
newinstance "myCpt", "myCpt"
activate "myCpt".exec()
```

For more information, see [newinstance](newinstance.md).

**Note:**  For form components, we recommend that you use
handles variable for the instance name. For more information, see [Activating Operations Using Handles](../../handles/activatingoperationsusinghandles.md).

## Specifying the Operation Name

The LitOperationName can be
specified as a literal or as a variable. For example:

Literal Operation Name

```procscript
newinstance "myCpt", "myCptInstance"
activate "myCptInstance".do_it()
```

Component Variable for Operation Name

```procscript
; $vOperation$ is a component variable
newinstance "myCpt", "myCptInstance"
$vOperation$ = "do_it"
activate "myCptInstance".$vOperation$()
```

Local Variable for Operation Name

```procscript
; vOperation is a local variable
 
 newinstance "myCpt", "myCptInstance"
 vOperation="do_it"
 activate "myCptInstance"."%%vOperation%%%"()
```

## Specifying Operation Arguments

At runtime, when an operation is activated, the
operation requirements are obtained from the signature descriptor in the URR, or in ULANA.DICT and
USYSANA.TEXT. The arguments supplied in ArgumentList must match the number and
data type of the parameters defined for the operation.

* Arguments for IN parameters can be specified
  as a constant, or as an assignable expression (field, variable, or function) that evaluates to a
  value.
* Arguments for INOUT must be specified as an
  assignable expression that evaluates to a value.
* Arguments for OUT parameters must be specified
  as an assignable expression.

When an operation is activated, the argument
values for IN or INOUT parameters are placed in the matching parameters at the start of the
operation. When the operation completes, the values of its OUT and INOUT parameters are returned to
the field, variable, or function specified by the argument.

If the data type of an argument is not specified
or does not match the type of the corresponding parameter, Uniface attempts to convert the data to
the proper type. For example, the operation `ADD_WEEK` in the service SERV2 expects
to find three parameters, with data types Date, Numeric, and Date.

```procscript
operation ADD_WEEK
params
  date INDATE : IN
  numeric ADDWKS : IN
  date OUTDATE : OUT
endparams
...
end ; ADD_WEEK
```

When the operation `ADD_WEEK` is
activated with the following statement, the string constant supplied as the first argument is
converted to a Date for the operation:

```procscript
activate "SERV2".ADD_WEEK ("19-jul-96", 5, $DELIV_DATE$)
```

If the operation expects an entity or occurrence
parameter (that is, a constructed parameter), the ArgumentList must be a string
(or assignable expression that evaluates to a string) containing the name of a model entity
(database or non-database) that is painted on the component.

For example, if the current component contains the
modeled entity PO\_ITEMS, the following statements sends all the occurrences of the entity PO\_ITEMS
to the operation `TOTAL_LNS` in the service SERV2:

```procscript
setocc "PO_ITEMS", -1
activate "SERV2".TOTAL_LNS("PO_ITEMS")
```

## Passing Typed Lists of Parameters

You can use activate/list to
pass typed lists of parameters.

**Tip:** 

You can explicitly specify the data type of
arguments using the $typed Proc function, or other data type functions.
For more information, see [$typed](../procfunctions/typed.md).

For example:

```procscript
operation CallAddWeek
variables 
  String vInParms, vOutParms
endvariables

;Create a typed list of parameters
putitem vInParms, -1, $date(19980203)
putitem vInParms, -1, $number(1)
putitem vInParms, -1, ""

activate/list "SERV2".ADD_WEEK(vInParms,vOutParms)
end
```

After calling this activate,
`vOutParms` has the value `";;$date(19980210)"`

## Parameters for Operations in 3GL Services

When you activate an operation in a 3GL service, consider the following:

* If a parameter is declared as
  `IN` or `INOUT`, Uniface handles the memory management for the
  parameter.
* If a parameter is declared as
  `OUT`, the 3GL program is responsible for managing the memory required.

## Activating Operations in Modal Forms

An operation in a modal form can be started only in the following circumstances:

* A modal form instance starts an operation
  contained within itself. This can be an operation in the Operations trigger or a special operation
  like ACCEPT or QUIT.
* A component instance starts the
  EXEC operation of a modal form. This is equivalent to using the
  run statement to start a modal form (with the additional possibility of using
  parameters).

## Activating Operating System Operations

You can activate commands on the operating system
command line by creating a signature for an operating system service with the
Implementation Type set to `Operating System Command`. This
implementation provides the default operations `COMMAND` and
`COMMANDOUT`. You can then use the activate command to pass an operating system
command to one of these operations. You can use your assignment file to redirect the OS service
components to a Uniface server. The maximum length of a command is 511 bytes. For more information, see [Implementing an OS Service](../../../integration/os/implementinganoscomponent.md).

In the following example, the Execute trigger
starts two attached, non-modal forms:

```procscript
; Execute trigger
newinstance/attached "NMF2A", "NMF2A", "MODALITY=NON-MODAL"
activate "NMF2A".EXEC()
newinstance/attached "NMF2B", "NMF2B", "MODALITY=NON-MODAL"
activate "NMF2B".EXEC()
```

If the forms NMF2A and NMF2B are both defined
with their window property Modality & Attachment set to Non-Modal, Attached, these properties
do not need to be explicitly stated on a newinstance statement. In this case,
the Execute trigger can be simplified as follows:

```procscript
; Execute trigger 
activate "NMF2A"
activate "NMF2B"
```

Even though the required Proc code is longer, for
documentation purposes, it can be helpful to use newinstance to explicitly state
the properties when creating instances.

## Related Topics

- [$instancechildren](../procfunctions/_instancechildren.md)
- [Operations](../triggersstandard/operations.md)
- [Component Memory Management](../../../howunifaceworks/processing/componentmemorymanagement.md)


---

# addmonths

Adds the specified number of months to the date, storing the result of the
calculation in $result.

addmonths  Months,  Date  {,ReferenceDate}

## Parameters

* Months—constant, field (or
  indirect reference to a field), variable, or function that can be converted to a whole (integer)
  number; the value will be truncated to form an integer. Use a negative value to subtract months.
* Date—constant, or field
  (or indirect reference to a field), variable, or function that can be converted to a Datetime
  value.
* ReferenceDate—constant, or
  field (or indirect reference to a field), variable, or function that can be converted to a Datetime
  value; optional.

## Return Values

No effect on $status

The resulting date is stored in `$result`. The data type of $result depends on the
data type of the Date argument:

* If Date is given as a
  string, $result is returned as a Datetime field with the time part set to 0.
* If Date is given as a
  field, global variable, or component variable, the data type in $result depends
  on the data type of Date.

## Use

Allowed in all Uniface component types.

## Description

The addmonths statement
operates in one of the following ways:

* Months are added to
  Date, with no other date taken as reference point. For example, 28-Feb-1994 plus
  one month becomes 28-Mar-1994.
* Months are added to
  Date, using ReferenceDate to normalize the result. The
  resulting date remains in line with ReferenceDate. This can be used to preserve
  the eventual expiration date of a specific period of time. For example, if the reference date is
  31-Jan-2006, one month added to 28-Feb-2006 results in a date of 31-Mar-2006.

## Conversion to Datetime format

Converting strings and numbers to Datetime values
is governed by the default Date-Time Format for the current language setup. The language setup is
governed by the values of the functions $language and
$variation.

**Note:**   It is good practice to use either
$date or $datim to convert any dates specified as strings
into Uniface dates. See the examples below for more information.

When Uniface converts a string (from a constant,
field, or variable) to a Datetime value, the default Datetime format (from the current language
setup) is used to determine the result. For example, if the default Date-Time Format is 'dd-mmm-yy
hh:nn', the string "01-02-1910" is converted to the Datetime value '01-FEB-19
10:00:00'. However, if the default Date-Time Format is 'dd-mmm-yyyy hh:nn', the same string is
converted to the Datetime value "01-feb-1910 00:00:00".

Consider the following Proc statement:

```procscript
addmonths 1, "01-02-1910"
```

If the default Date-Time Format is 'dd-mmm-yy
hh:nn', after this statement is executed, the value of $result is
"01-MAR-19 10:00". If the default Date-Time Format is 'dd-mmm-yyyy hh:nn', the
value of $result is "01-MAR-1910 00:00".

These examples assume that the default Date-Time Format is 'dd-mmm-yyyy hh:mm'. The
following examples show the use of the `addmonths` statement:

```procscript
addmonths 1, $date("28-feb-90")
; $result = 28-mar-90
addmonths 1, $date("28-feb-90"), $date("31-dec-89")
; $result = 31-mar-90
addmonths 2, $date("31-jan-90"), $date("1-dec-89")
; $result = 1-mar-90
addmonths -1, $date("28-feb-90")
; $result = 28-jan-90
```

## Related Topics

- [$clock](../procfunctions/_clock.md)
- [$CENTURY_BREAK](../../../configuration/reference/assignments/century_break.md)


---

# apexit

Ends the application session immediately.

apexit

## Return Values

None

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

The apexit statement ends the
application session immediately. It has the same effect as pressing Control+C or Break.

It is recommended that you use a
close statement before apexit, to ensure all data is stored
or updated.

Terminating the application results in any
triggers that would normally be reactivated (such as Application Execute) not being activated.

If the component that issues the
apexit statement has any child instances that were started with the
newinstance (or with activate and an implicit
newinstance), these instances are deleted before the application session ends.
Before they are removed, any `CLEANUP` operation that is present is executed.

**Note:**   If this statement is executed while testing a
component from within the Development Environment, the Development Environment application is
terminated. This is also true when you enter quit in the debugger.

The following example uses the `apexit` statement to exit an application
from the Quit trigger:

```procscript
; trigger: Quit

askmess "Do you want to leave this application?"
if ($status = 1)
   rollback
   close
   apexit
endif
```

## Related Topics

- [break](break.md)
- [done](done.md)
- [exit](exit.md)
- [return](return.md)


---

# apstart

Pass control of the application to the component
manager.

apstart

## Return Values

The values returned in $status following apstart are:

* `-1` if an error occurred. In this case, $procerror contains the exact error.
* Otherwise, the value returned by the last component or operation that ends. (It is not a good idea to return `-1` from components or operations, since this situation cannot be distinguished from the statement occurring in an incorrect trigger.)

Values of
$procerror that are commonly returned by
apstart

| Value | Error Constant | Meaning |
| --- | --- | --- |
| 1402 | <UPROCERR\_STATEMENT> | Statement not allowed in this trigger. (The apstart statement is allowed only in the Application Execute trigger.) |

## Use

Allowed only in the Application Execute trigger of startup shells.

## Description

The apstart is required in the Application Execute trigger of the startup shells of a Uniface Server. It is usually not required in the startup shells of other applications. (In prior versions, it was needed in the Application Execute trigger after activating a sequence of non-modal forms before allowing the user to take control of the application session. Since Uniface 8.3, Uniface automatically detects the activation of a sequence of non-modal forms and, after the last activate, passes control to the user.)

The apstart statement allows the component manager to take control of the application, waiting for user input. It can be used only in the Application Execute trigger.

The Application Execute trigger is typically used to start a number of non-modal forms before allowing the user to take control of the application session. If no forms are present in the component pool when apstart is encountered, the application terminates.

---

# askmess

Display a message and wait for the user's response.

askmess{/nobeep}{/question
| /info | /warning | /error}
 MessageText
{`~`MessageTitle} {,Replies}

## Switches

* /nobeep—the terminal does
  not beep when the dialog box containing MessageText appears. This has no effect
  in the Web environment.
* /question,
  /info, /warning and /error—these switches
  allow the severity of the message text to be graphically shown.

  The severity levels are mapped to the
  appropriate glyphs for the GUI under which the component is running. If you specify several levels
  of severity, the most severe switch of those specified is used. These switches are ignored in the
  Web environment.

## Parameters

* MessageText—string, or
  field (or indirect reference to a field), variable, or function that evaluates to a string. The
  string has a maximum length of 512 bytes or ten lines.
* `~`MessageTitle—string
  displayed as the title of the message dialog. If omitted, the title of the application is used.
* Replies—string, or field
  (or indirect reference to a field), variable, or function that evaluates to a string. The contents
  of the string should be as described as

  Reply 1`,` Reply 2 `,`
  ...`,` Reply n . If Replies is
  longer than 512 bytes, it is truncated to that length. It can contain up to 25 replies.

## Return Values

The values returned in $status
are:

| Value | Description |
| --- | --- |
| 0 | When Replies argument omitted, reply was equivalent to No |
| 1 | When Replies argument omitted, reply was equivalent to Yes |
| n | Number of the reply entered by the user. The first reply is 1, the second reply is 2, and so on. |

## Use

Allowed in form components
.

## Description

The askmess statement displays
MessageText in a dialog box, along with the specified replies. In character
mode, MessageText appears on a single line. On Windows, a word-wrap mechanism is
used for very long messages.

Alternatively, you may include the string
%%^ within MessageText to separate text that you want to
appear on separate lines. In character mode, word-wrapping is not performed and
%%^ is ignored; only a single line of text appears.

You can specify a title for the message dialog box
using a tilde (~). For example:

```procscript
askmess/info "Are you sure you want to leave the application?"~"Confirmation","Yes,No"
```

Dialog with Title

## Number of Replies

The way in which the replies for
MessageText appear in the dialog box depends on the number of replies specified:

* If Replies is omitted, the
  default replies (as specified in the language setup for the current language) appear as command
  buttons. The user responds by choosing a button. For example, the standard default replies for the
  language NL are 'Ja' and 'Nee'.
* If five or fewer replies are provided in
  Replies, each reply is available as a command button. The user responds by
  choosing a button.
* If between six and 25 replies are provided in
  Replies, the possible replies are presented as a radio group, with each reply
  displayed alongside an associated radio button. The user responds by choosing the desired reply and
  clicking the Accept button.
* If more than 25 replies are provided in
  Replies, only the first 25 are displayed (as a radio group); any remaining
  replies are ignored.

## In a Web Application

The askmess statement is not
supported in Web applications. However, its behavior can be emulated using predefined confirmation
pages, or hyperlink answers.

## In a Character-Mode Application

In a character mode application, you can use the
assignment setting $OLDASKMESS to restore V5.1 functionality to the
askmess statement.For more information, see [$OLD\_ASKMESS](../../../configuration/reference/assignments/oldaskmess.md).

The following example uses the
`askmess` statement to ask the user to confirm that they want to clear modified data
from a form:

```procscript
; trigger: Clear
if ($formmod = 0)     ; check for no modification
clear
else
askmess "Data is modified. Clear it?"
if ($status = 1)   ; answer is in $status
clear
endif
endif
```

The following example displays a dialog box with
two buttons when the user selects a menu item to leave the application. The Cancel button gives the
user a chance to change their mind about leaving the application.

```procscript
; trigger: <Option>
askmess/question "Are you sure you want to leave the application?","Quit,Cancel"
if ($status = 1)     ;user really wants to leave
   apexit
else
   if ($status = 2)  ;user clicked Cancel
       return
   endif
endif
```

## Related Topics

- [message](message.md)
- [putmess](putmess.md)


---

# blockdata

Defines a constant block of text.

BlockName:blockdata  Delimiter

...

... text ...

...

Delimiter

## Parameters

* BlockName—string
  identifying the block of text; maximum of 8 characters.
* Delimiter—character that
  indicates the beginning and end of the text block
* text—all lines are
  considered part of the text until the character Delimiter is encountered.

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

The blockdata statement is
often used to define long sql statements.

The following rules apply to the use of
blockdata:

* The blockdata statement
  must be in the same Proc module (entry, operation, or
  trigger) as the statement that references the BlockName.
* The blockdata statement
  must be at the end of the Proc module.
* More than one blockdata
  statement is allowed in the Proc module.
* In a Proc statement (for example, assignment
  or putmess), refer to BlockName as
  $BlockName.
* BlockName cannot exceed
  eight characters in length.
* The hash character (#) is not allowed as
  Delimiter.
* Substituting variables (using two percent
  signs (`%%`)) is not possible within text, although you can use $string to address this. For example:

  ```procscript
  vBlock = $my_block              ; does not substitute variables
  vBlockFinal = $string(vBlock)   ; variables substituted
  ```

  However, if the text contains compile-time constants such as `<this_app_version>`, these are not resolved.

## blockdata

The following example shows the use of the
`blockdata` statement to define the text of a letter:

```procscript
; trigger: Detail

TEXT = $reject
message "Standard refusal loaded in TEXT field."

reject:blockdata +
Dear sir,

We regret to inform you that you are in no way suitable
for the vacancy and that we have hired somebody else. By way of
consolation, however, we are pleased to inform you that your submission
has been filed for future reference. Thank you for considering us.

Yours sincerely,+
```

The following example shows how to use
blockdata in operations. The BlockData definition must be in
the same Proc module in which it is referenced.

```procscript
operation GET_TEXT1
   message/info $Text1

Text1:blockdata +
This is Text One+
;
end

operation GET_TEXT2
   message/info $Text2
;
Text2:blockdata +
This is text Two+
;
end
```

## Related Topics

- [message](message.md)
- [Proc Modules](../../procmodules.md)


---

# break

Unconditionally exit a loop initiated by for,
forentity, forlist, repeat, or
while, .

break

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

When used, in repeat or
while loops, flow passes to the statement immediately following the nearest
until or endwhile statement. This means that when a
break statement appears inside several nested loops, only the innermost loop is
exited.

In for loops, a
break statement is typically used in an if block. In this
case, flow passes to the command following the endfor statement.

## Related Topics

- [for](for.md)
- [forentity](forentity.md)
- [forlist](forlist.md)
- [repeat](repeat.md)
- [while](while.md)
- [forlist /id](forlist_id.md)


---

# call

Execute the specified entry or global Proc.

call  {Library`::`}LitEntryName {  `(`ArgumentList `)` }

## Parameters

* Library—library containing
  the global Proc module. If not specified, the default library is used.
* LitEntryName—literal name
  of a module declared on an entry statement; do not enclose
  LitEntryName in double quotation marks (").
* ArgumentList—comma-separated list of arguments to the module. The number of
  arguments supplied must match the number and type of parameters defined with the
  params statement for the LitEntryName. If the data type of an
  argument does not match the type of the corresponding parameter, Uniface attempts to convert the
  data to the proper type.

  The ArgumentList is of the
  form:

  Argument 1, Argument 2 , ...
  , Argument n

## Return Values

Values returned in $status

| Value | Description |
| --- | --- |
| -1 | An error occurred. $procerror contains the exact error.  Values of parameters with direction OUT and INOUT must be considered to be undefined in the component that called LitEntryName. |
| 0 | $status has not been assigned a value, no value is returned by the called module, or there is no return statement present. |
| >0 | Value returned by the Proc module that was called. (Since Uniface expects -1 to be an error, it is not a good idea to return that value from the called Proc module.) |

**Note:**   The value in $status can
affect the way the structure editor behaves when it is activating a sequence of triggers. If you
call a Proc module in a trigger, make sure that the value returned by the Proc module does not
adversely affect the structure editor.

Values Returned in $procerror Following call

| Value | Symbolic error | Meaning |
| --- | --- | --- |
| -1109 | UPROCERR\_ENTRY | The entry name specified cannot be found. |
| -1113 | UPROCERR\_PARAMETER | Parameter name not valid or not defined. |
| -1122 | UPROCERR\_NARGUMENTS | Wrong number of arguments. |

## Use

Allowed in all Uniface component types.

However, calling a global Proc is not allowed in
self-contained services and reports.

## Description

In specifying the argument list:

* When the module expects a basic parameter
  (that is, a field, component variable, or a named parameter) with direction IN,
  the corresponding argument in ArgumentList can be a constant, a field, an
  indirect reference to a field, a variable, or a function. The argument's value is placed in the
  module's parameter at the start of the module.
* When the module expects a basic parameter
  with direction INOUT, the corresponding argument in
  ArgumentList can be a field, an indirect reference to a field, a variable, or a
  function to which a value can be assigned. The argument's value is placed in the module's parameter
  at the start of the module; the value in the module at its end is returned to the field, variable,
  or function.
* When the module expects a basic parameter
  with direction OUT, the corresponding argument in
  ArgumentList can be a field, an indirect reference to a field a variable, or a
  function to which a value can be assigned. The value in the module at its end is returned to the
  field, variable, or function.

## Locating the Called Module

When resolving a call
statement, the called module is searched for in this order:

1. In the triggers of the component (for a local
   Proc module).
2. In the library specified in the component
   properties (for a global Proc).
3. In the library specified in the startup shell
   properties (for a global Proc).
4. In the library SYSTEM\_LIBRARY (for a global
   Proc).

For more information, see [Compilation Process](../../../howunifaceworks/compilation/the_compilation_process.md)..

```procscript
; Local Proc 
entry LSTORE
  store
  if ($status < 0)
      message "Store error!"
      rollback
else
      message "Store done."
      commit
endif
end ; module LSTORE
```

```procscript
; trigger: Store
call LSTORE
return ($status)
```

```procscript
; trigger: Accept
if ($formdbmod = 1)
  call LSTORE
endif
return ($status)
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced the use of a double-colon (`::`) rather than a single colon (`:`) when specifying a library. The use of a single colon is no longer supported. |

---

# callfieldtrigger

Explicitly calls a Detail, Help, Menu, or an extended trigger on a field.

callfieldtrigger  TriggerName,  FieldName

## Parameters

* TriggerName—`detail`,
  `help`, `menu`, or the name of an extended field-level trigger that
  has no parameters.
* FieldName—field of the
  trigger to be called

## Return Values

Values Returned by calltrigger in $status

| Value |  |
| --- | --- |
| >=0 | Success. Value returned by the trigger. |
| <0 | An error occurred. $procerror contains the exact error. |

Values of $procerror Commonly Returned by calltrigger

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-1101` | PROCERR\_FIELD | Specified field does not exist |
| `-1120` | PROCERROR\_OPERATION | Specified extended trigger does not exist on field level or on entity level |
| `-1123` | PROCERR\_NPARAMETERS | Specified extended trigger has one or more parameters |

## Use

Allowed in all Uniface component types.

## Description

The callfieldtrigger statement
explicitly calls the named trigger for the specified field. Only triggers that have no implicit
processing can be called.

If the trigger is not defined at field level, the
callfieldtrigger statement falls back to the same trigger on entity level. For
the Menu trigger, it can also fall back to the component-level trigger.

For some DSP widgets it is possible for the user
to trigger an event, such as `onclick`, `ondblclick`,
`onblur`, and so on. DSP widgets can use these to a call a trigger on the field to
which the widget is bound.

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [Triggers in Dynamic Server Pages](../../../webapps/components/dsps/dsptriggers.md)


---

# case

Defines a case in a
selectcase block.

See
[selectcase](selectcase.md).

---

# clear

Clear data from the component or entity.

clear{/e  Entity}

## Parameters

* /e—clears data from the
  specified entity, rather than the component
* Entity—entity to be
  cleared. Can be a string, or a field, variable, function, or parameter that evaluates to a string
  containing the entity name.

## Return Values

Values returned by clear in $status

| Value | Meaning |
| --- | --- |
| 0 | Data was successfully cleared, or no entities are painted on the component. |
| -3 | Exceptional I/O error (hardware or software). |
| -16 | Network error: unknown. |

Values commonly returned by $procerror following clear

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in form, service, and report components,
except in the Occurrence Gets Focus and Start Modification triggers.

## Description

If the argument Entity is
omitted, all data in the component is cleared.

The clear statement clears all
data from the component (by default) or, when the /e switch is given, from
Entity. Data in the database is not affected by the clear
statement; any locked occurrences remain locked. The active path for the component is reset.

One use for the clear
statement is when data has been added in a different component and the data displayed on the
current form needs to be redisplayed.

**Caution:** 

Never use the clear/e
statement in the Occurrence Gets Focus or Start Modification triggers. This can cause Uniface to
enter an infinite loop.

## Component with Record behavior

Use clear/e with care on a
component with Record behavior. A Record component has only one outermost entity. If you have
painted more than one outermost entity, when the Record component is compiled, Uniface expands the
first outermost entity painted (that is, the upper, left-most) so that all other outermost entities
become inner to the first. This means that using clear/e to clear data from the
first outmost entity on a Record component clears data from all the entities painted on the
component.

The following example clears the data entered when the user makes an entry that is not
valid:

```procscript
; trigger: Leave Modified Occurrence

if ((salary > 100000) & (job != "PRESIDENT"))
    message "Salary not valid"
    clear/e "entity"
endif
```

In the example shown in following figure, form X calls service Z to create a new
occurrence of entity C:

Using the clear statement to refresh updated data

The Proc code for the Detail trigger is as
follows:

```procscript
; trigger Detail
; save foreign key for occurrences displayed in entity C
; set up foreign key, ready for retrieve
; retrieve new data entered on service Z

$1 = FOREIGN_KEY.C
activate "Z".EXEC($1)
clear/e "C"
FOREIGN_KEY.C = $1
retrieve/e "C"
```

## Related Topics

- [erase](erase.md)
- [release](release.md)
- [retrieve](retrieve.md)


---

# close

Log off from the specified path or from all paths.

close
{"PathString"}

## Parameters

PathString—a string constant
that contains the name of a DBMS or network path; for example, "$ORA". (Although
the leading dollar sign ($) is not required, it is recommended that you include it as part of the
path named in PathString.)

* If PathString is omitted,
  close closes all DBMS paths and all network paths, including paths to remote
  components.
* If PathString is a DBMS
  path, close closes all open tables and files for all the entities on
  PathString, and logs off from the database.
* If PathString is a network
  path to a Uniface File Server, close closes all the entities on
  PathString, logs off from the databases accessed using
  PathString, and closes the network connection.
* If PathString is a network
  path to a Uniface Application Server, close closes all remote component
  instances on the path; stops the synchronous Application Server, if applicable; and closes the
  network connection.

## Return Values

Values returned by close in $status

| Value | Meaning |
| --- | --- |
| 0 | The path was successfully closed. |
| -3 | Exceptional I/O error (hardware or software). |
| -16 | Network error: unknown. |

Values commonly returned by $procerror following close

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |
| -1107 | <UPROCERR\_PATH> | The path name is not correct or the path does not exist, for example, no assignment is found for the path. |

## Use

Allowed in all Uniface component types.

## Description

When you close a path that leads to DBMS tables
or files, it is recommended that a commit or rollback be
performed before the close. In this way, the application does not rely on the
behavior of the DBMS and behaves consistently.

The following example shows the use of the `close` statement to log off
from all DBMSs:

```procscript
; trigger: Detail

if ($status = 1)
    rollback
    close
    apexit
endif
```

The following statement closes the database
identified by path $RMS:

```procscript
close "$RMS"
```

The following statement closes the user-defined
path $MY\_PATH:

```procscript
close "$MY_PATH"
```

## Related Topics

- [askmess](askmess.md)
- [message](message.md)
- [putmess](putmess.md)
- [$putmess](../procfunctions/_putmess.md)
- [commit](commit.md)
- [rollback](rollback.md)


---

# clrmess

Clear all text from the message frame and message line.

clrmess

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

The clrmess statement clears
all text from the message frame. The store and erase
statements also clear the message frame.

**Note:**  In the Debugger, clrmess is
disabled by default. To enable it, choose
View > Settings > Message
frame.

The following example shows the use of the `clrmess` statement:

```procscript
; trigger: Execute

clrmess
putmess "Form %%$formname loaded at %%$time."
edit
```

## Related Topics

- [askmess](askmess.md)
- [message](message.md)
- [putmess](putmess.md)
- [$putmess](../procfunctions/_putmess.md)


---

# colorbox

Start the Microsoft Windows Color dialog box

colorbox {`/hex`
| `/rgb`}  {`/full`}  
{`"`Color`"`}

## Switches

* `/hex`—returns a hexadecimal
  representation of the color in $result.
* `/rgb`—returns an RGB
  representation of the color in $result.
* `/full`—starts a full size
  color box.

## Parameters

* Color—hex or RGB string
  specifying the color to be highlighted when the Color dialog box is
  started

  If Color is not specified,
  the color box displays the last-selected color. Initially this is black. Selecting a color and
  clicking OK sets the last-selected color, which is used to initialize the colorbox for the next
  time it is used in the same application session. Closing the application deletes the last-selected
  color.

## Return Values

The color returned by the dialog will be available
in $result.

The values returned in $status
are:

* < 0 if the user ended the dialog by
  pressing Escape or by clicking the Cancel or the Close button
* 0 if the user ended the dialog by clicking
  OK

## Use

Allowed in form and report components.

## Description

If the Color parameter is not
defined, colorbox uses the last selected color. Initially, this is black.
Selecting a color and clicking OK initializes the last selected color internally. This is used to
initialize the Color dialog when started again in the same application session. Closing the
application deletes the last selected color.

When started with the `/full`
switch, the illustrated Color dialog box is started:

Full Color Dialog Box

Without the `/full` switch, the an
abbreviated version of the Color dialog box is displayed:

Color Dialog Box

Start the Color dialog box with the specified
green color highlighted, and return the user's color selection as aa hex number:

```procscript
colorbox /hex "#00FF00"
```

Start the Color dialog box with the specified
green color highlighted, and return the user's color selection as an RGB number:

```procscript
colorbox /rgb "0,128,0"
```

Start the full Color dialog box with the specified
green color highlighted, and return the user's color selection as a hex number:

```procscript
colorbox /hex /full "#00FF00"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

---

# commit

Commit a transaction to a DBMS or path.

commit  {"PathString"}

## Parameters

PathString—a string constant
that contains the required path name:

* If PathString does not
  start with a dollar sign ($), the argument is assumed to be a DBMS (driver path) defined in the
  application model. Modifications to all entities assigned to that DBMS are committed. In this case,
  the model definition determines which entities are committed.
* If PathString starts with
  a dollar sign, the argument is assumed to be a path name. Modifications to all entities accessed
  through that path are committed. In this case, assignments determine which entities are committed.
* If PathString is omitted,
  all pending updates for all databases used in the transaction are written (committed) and all
  locked occurrences are unlocked.

## Return Values

Values returned by commit in $status

| Value | Meaning |
| --- | --- |
| 0 | The data was successfully committed. |
| -3 | Exceptional I/O error (hardware or software). |
| -9 | An attempt to open a DBMS failed because the maximum number of DBMS logons has already been reached. |
| -16 | Network error: unknown. |

Values commonly returned by $procerror following commit

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> ) | Errors during network I/O. |
| -1107 | <UPROCERR\_PATH> | The path name is not correct or the path does not exist, for example, no assignment is found for the path. |

## Use

Allowed in all Uniface component types.

## Description

If a target DBMS does not support database
locking, the commit statement is ignored. For information about your DBMS, see
the appropriate DBMS Driver Guide.

To avoid currency problems, add a
commit (or rollback) statement at the highest level of the
component 'tree' for the current transaction, unless the component has the property Keep
Data in Memory selected. In this case, you should use commit at that
level.

The following example shows the use of the commit statement:

```procscript
; trigger: Store

call CENSTORE
return ($status)
```

```procscript
entry CENSTORE
store
if ($status < 0)
   message "Store error!"
   rollback
else
   message "Store complete."
   commit
   if ($status < 0)
      message "Commit error, rollback performed."
      rollback
   endif
endif
end
```

## Committing DEF versus $DEF

Consider the application model MYMODEL. In the
model definitions of MYMODEL, all entities are assigned to the default DBMS. At run time,
assignments are used to redirect the entity FRODO to another DBMS:

```procscript
$DEF = $ORA
FRODO.MYMODEL = $SYB
```

If the following commit
statement is used, *all* entities in MYMODEL (which are assigned to the default DBMS)
are committed:

```procscript
commit "DEF"
```

If the following commit
statement is used, all entities except FRODO are committed:

```procscript
; commit all entities of MYMODEL except FRODO
commit "$DEF"
```

## Related Topics

- [rollback](rollback.md)
- [Transaction Control](../../../howunifaceworks/dataio/transaction_control/transaction_control.md)


---

# compare

Compare fields of two adjacent occurrences.

compare{/previous |
/next}  (FieldList)  {from  Entity}

## Switches and Clauses

* /previous—compare the
  fields of the active occurrence with those of the previous occurrence.
* /next—compares the fields
  in the active occurrence with those of the next occurrence. This is the default behavior of
  compare. However, it is recommended that you use the /next
  switch for clarity.
* from—specifies an entity
  containing the fields to compare. If omitted, the active occurrence of the current entity
  (available in $entname) is used.

## Parameters

* FieldList—list of field
  names. The FieldList is of the form:

  LitFieldName1 ,  LitFieldName 2 , ... ,  LitFieldName n.
* LitFieldName—literal name
  of a field in the entity being compared. Do not enclose the name in double quotation marks (") or
  qualify the name with the entity and application model name. If FieldList
  contains only one LitFieldName, the surrounding parentheses (()) are not
  required.
* Entity—string, or field,
  variable, function, or parameter that evaluates to a string that contains the name of an entity.
  For example:

  + String: "INVOICES".
  + Field: FIELD1, where
    FIELD1 contains "INVOICES"
  + Variable: $1, where $1
    contains "INVOICES"
  + Function: $entname,
    where $entname contains "INVOICES"
  + Parameter: PARAM1,
    where PARAM1 contains "INVOICES"

## Return Values

The compare statement sets
both $status and `$result`.

Values returned in $status

| Value | Description |
| --- | --- |
| -1 | An error occurred. $procerror contains the exact error. In this situation, $result is always 0. |
| 0 | No error occurred. This can be returned even when there is no next or previous occurrence. |

Values returned by compare in $result

| Value | Meaning |
| --- | --- |
| 1 | Perfect match of all specified fields. |
| 0 | Fields do not match. (This value is also returned if $status is -1.) |
| -1 | No previous or next occurrence. |

Values commonly returned by $procerror following compare

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> () | Errors during network I/O. |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |

## Use

Allowed in all Uniface component types.

## Description

The compare statement compares
the contents of fields listed in FieldList with the corresponding fields in the
next or previous occurrence. The compare statement first formats the data in the
listed fields before comparing them. This allows the assignment to be done in Proc code without a
compare error occurring.

The following example shows the use of the `compare` statement:

```procscript
; trigger: Leave Printed Occurrence

compare/next (INVDATE) from "INVOICE"
if ($result <= 0)
   printbreak "SUBTOTAL"
   if ($result = 0)
      eject
      printbreak "TITLE"
   endif
endif
```

## Related Topics

- [printbreak](printbreak.md)
- [$next](../procfunctions/_next.md)
- [$previous](../procfunctions/_previous.md)


---

# componentToStruct

Place component data in a Struct.

componentToStruct
{/mod} {/one}
{/reconnecttags} {/firetriggers}  
StructTarget  {`,` EntityName}

`componentToStruct /mod /reconnecttags
/firetriggers vStruct, EMPLOYEE.ORG`

## Switches

* /mod—includes only modified
  occurrences, and their ancestors (parent, grandparent etc.). Ancestors are included to provide
  context for the modified Structs.
* /one—includes only the
  current occurrence of the named entity. This switch only affects the named entity; for inner
  occurrences, all occurrences are always included. If no entity is specified the switch has no
  effect.
* /reconnecttags—adds tags
  reconnect processing tags to occurrence members (the `u_type=occurrence` annotation
  must be present), and includes occurrences marked as deleted in the Struct.

  If omitted, these tags are not generated and
  occurrences marked as deleted are not included in the generated Struct.
* /firetriggers—causes the
  Pre Save Occurrence and Post Save Occurrence triggers to be fired. These triggers can be used to
  provide additional processing, for example when preparing data to be loaded and reconnected into a
  component that contains data.

## Parameters

* StructTarget—variable,
  parameter, or non-database field of type struct or any to
  hold the returned output
* EntityName—variable or
  parameter specifying an entity name (should be of type String or type Any). This parameter is
  optional. If specified the conversion is executed starting at the specified entity; this is not
  necessarily a top level entity. When no EntityName is specified, conversion
  starts at component level; the top level Struct has the name of the component, and it includes all
  top level entities of the component as members.

## Return Values

Values Commonly Returned in $status after
componentToStruct

| Value | Meaning |
| --- | --- |
| `0` | Struct successfully created. |
| < `0` | An error occurred. $procerror contains the exact error. |
| `-1102` | Entity not valid if a non existing entity is specified as the second parameter. |

## Use

Allowed in all Uniface component types.

## Description

The componentToStruct statement
writes occurrence data in the component instance to a Struct. If no qualifiers are used, the Struct
is built from the complete hitlist, including occurrences currently marked for deletion.

Occurrences and fields are selected from the data
based on the switches specified in the componentToStruct command. If no switches
are used, the Struct is built from the complete hitlist.

In most cases,
componentToStruct changes the active occurrence to the first occurrence.
However, when /one is used, the active occurrence remains unchanged.

**Note:**  Boilerplate fields and control fields are
skipped when using componentToStruct.

## Conversion

During conversion
componentToStruct converts Uniface objects to Struct nodes:

Component to Struct Conversion

| Uniface Object | Struct |
| --- | --- |
| Component | Named Struct, with the name of the component. This node is not created if EntityName is specified. |
| Entity | Named Struct, with name of fully qualified entity |
| Occurrence | Named Struct ,with name `OCC` |
| Field | Named Struct, with name of field |

For more information, see [Structs for Uniface Component Data](../../structs/transformingwithstructs/structsforcomponents.md).

## Struct Annotations

By default, componentToStruct
generates a `u_type` annotation for each Uniface object in the component. When the
/reconnecttags switch is used, it also adds annotations for reconnect
attributes.

Annotations can be accessed using
$tags. For example, in the following code, `vType` contains the
object type of the first member of the Struct:

```procscript
componentToStruct MyStruct
vType = MyStruct->*{1}->$tags->u_type
```

Annotation Tags for Uniface Component-Struct Conversions

| Tag | Values | Comments |
| --- | --- | --- |
| u\_type | ```procscript "component""entity""occurrence""field" ``` | Each node in a component Struct has a u\_type annotation that indicates the object type. |
| For nodes that have the tag `u_type="occurrence"`, the following tags are also supported. These can be used if you are using the Struct to manipulate data prior to a reconnecting the data to its source. For more information, see [Reconnect Process](../../../howunifaceworks/dataio/disconnectedrecordssets/reconnect_process.md). | | |
| u\_id | `"OccID"` | The occurrence ID is used |
| u\_crc | `"CheckSum"` | CRC checksum of the occurrence |
| u\_status | ```procscript "est" (exists in DB) "mod" (modified) "new" (new) "del" (delete) 				 ``` | Modification status of the occurrence. |

## Triggers Fired by componentToStruct/firetriggers

The componentToStruct
statement only fires triggers if the /firetriggers switch is specified.

* [Pre Save Occurrence](../triggersstandard/pre_save_occurrence.md)—fired immediately before a Struct member is
  generated for an occurrence. For example, you could use this trigger to exclude an occurrence, or
  calculate the value for a derived field.
* [Post Save Occurrence](../triggersstandard/post_save_occurrence.md)—fired immediately after a Struct member is
  generated for an occurrence.

## Converting a Component Structure to a Struct

The component structure of the CMP2STRCT component
includes an ORDER entity and its ORDERLINEs:

Component Structure

The following code in the Execute trigger,
converts only the current occurrence of ORDER.SALES to a Struct

```procscript
; Execute trigger
; component variable $struct$ is struct
retrieve 
componentToStruct/one $struct$, "ORDER.SALES"  
OUTPUT = $struct$->$dbgstring  
edit
```

1. Specifying the /one switch
   and the specific entity results in a Struct whose top-level Struct represents an entity, not the
   component. Although only one ORDER entity occurrence is included in the Struct, all ORDERLINE
   occurrences for the ORDER occurrence are included.
2. The $dbgString Struct
   function returns a representation of the Struct, which is displayed in the OUTPUT field:
3. Notice that the ORDER\_ID field, which is used
   for the foreign key, is included, although it is not explicitly present in the component
   structure.

CMP2STRUCT Component

```procscript
[ORDER.SALES]
  [$tags]
    [u_type] = "entity"
  [OCC]
    [$tags]
      [u_type] = "occurrence"
    [ORDER_ID] = "23"
      [$tags]
        [u_type] = "field"
    [DATE] = "20101201"
      [$tags]
        [u_type] = "field"
    [STATUS] = "02"
      [$tags]
        [u_type] = "field"
    [ORDERLINE.SALES]
      [$tags]
        [u_type] = "entity"
      [OCC]
        [$tags]
          [u_type] = "occurrence"
        [LINE_ID] = "1"
          [$tags]
            [u_type] = "field"
        [ITEM_NAME] = "tulips"
          [$tags]
            [u_type] = "field"
        [UNIT_PRICE] = "2.22"
          [$tags]
            [u_type] = "field"
        [QUANTITY] = "7"
          [$tags]
            [u_type] = "field"
        [ORDER_ID] = "23"      ;  
          [$tags]
            [u_type] = "field"
      [OCC]
        [$tags]
          [u_type] = "occurrence"
        [LINE_ID] = "3"
          [$tags]
            [u_type] = "field"
        [ITEM_NAME] = "roses"
          [$tags]
            [u_type] = "field"
        [UNIT_PRICE] = "4.45"
          [$tags]
            [u_type] = "field"
        [QUANTITY] = "5"
          [$tags]
            [u_type] = "field"
        [ORDER_ID] = "23"      ; 
          [$tags]
            [u_type] = "field"
...
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |
| 9.6.05 X501 | Added /reconnecttags and /firetriggers |

## Related Topics

- [structToComponent](structtocomponent.md)
- [Structs for Uniface Component Data](../../structs/transformingwithstructs/structsforcomponents.md)
- [Transforming Complex Data Using Structs](../../structs/transformingwithstructs/handlingcomplexdynamicdata.md)


---

# creocc

Creates an empty occurrence of the specified entity.

creocc  Entity,  OccurrenceNumber

## Parameters

* Entity—name of an entity
  where an occurrence is to be created. Can be a string, or a field, variable, function, or parameter
  that evaluates to a string.
* OccurrenceNumber—position
  of the new occurrence; can be a constant, or field (or indirect reference to a field), variable, or
  function that can be converted to a whole (integer) number; the value will be truncated to form an
  integer .

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| >=0 | Statement executed successfully |

Values commonly returned by $procerror following creocc

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1203 | <UPROCERR\_RANGE> | The occurrence number is out of range. |

## Use

Allowed in all Uniface component types.

## Description

The creocc statement creates
an empty occurrence of Entity at the position indicated by
OccurrenceNumber.

If OccurrenceNumber is:

* < 0—occurrence is added (appended) after
  the last occurrence in the hitlist ($hits+1).
* 0—empty occurrence is created, using the
  current occurrence number. The new occurrence is inserted before the old active occurrence, so the
  effect is to increase all subsequent occurrence sequence numbers by 1.
* From 1 to the current number of occurrences of
  Entity, plus 1 (inclusive)—an empty occurrence is created at the indicated
  position.
* Greater than the current number of occurrences
  of Entity plus one—$status is set to -1 and no occurrence is
  created.

If the component contains only the default
(empty) occurrence for an entity, the first use of creocc does not add an
additional empty occurrence, while subsequent uses do. If the default occurrence contains either an
initial value declared on the Define Component Field Properties form or a
field assigned a value with the /init switch, it is treated as an existing
occurrence and a second occurrence is created.

## Converting Text to Occurrences

The following example shows the use of the creocc statement to
create empty occurrences of an entity. The data originated as a text dump of a database of video
tapes. The following Proc code shows the conversion from the raw (unformatted) text into more
meaningful data:

```procscript
; trigger: <Execute>

retrieve "VIDEO_DONE"   ; get video data (text)
setocc "VIDEO_DATA", 1  ; position at first occurrence
$10 = 0                 ; zero counter
repeat
   message/nobeep "loop counter = %%$10"
   creocc "VIDEO_DONE", -1  ; make an empty occurrence
   if ($status < 0)
      break
   endif
   V_NUM.VIDEO_DONE = TAPE_NUM.VIDEO_DATA

   $1 = START         ; load start time (text) into $1
   call TEXT_TO_TIME  ; convert to time storage, --> $2
   V_START = $2

   $1 = end           ; do the same for end time
   call TEXT_TO_TIME
   V_END = $2

   V_TITLE_1.VIDEO_DONE = "%%TITLE_1.VIDEO_DATA%%TITLE_1A.VIDEO_DATA"
   V_TITLE_2.VIDEO_DONE = "%%TITLE_2.VIDEO_DATA%%TITLE_2A.VIDEO_DATA"

   $10 = $10 + 1
   setocc "VIDEO_DATA", ($curocc + 1)
   if ($status < 0)
      break
   endif
until ($10 = $hits)
edit
```

## Changing the Add/Insert Occurrence Trigger Behavior

If you want to change the behavior of the
Add/Insert Occurrence trigger, you can include a creocc statement in the
trigger. For example:

```procscript
; trigger: Add/Insert Occurrence

if ($rettype = 65)
   creocc "INVOICE", $curocc + 1  ; add occurrence after current
else
   creocc "INVOICE", $curocc      ; insert occurrence before current
endif
numgen "INV_COUNT", 1, $variation ; generate new invoice number
INV_NUM/init = $result            ; set new invoice number
```

## Related Topics

- [remocc](remocc.md)
- [setocc](setocc.md)
- [$curocc](../procfunctions/_curocc.md)
- [$hits](../procfunctions/_hits.md)
- [$entname](../procfunctions/_entname.md)
- [Add/Insert Occurrence](../triggersstandard/addinsertoccurrence.md)


---

# curoccvideo

Set the video properties for fields of the current occurrence.

curoccvideo  {`/inner` | `/up`}  {`/off`}  {Entity}  {`,` AttributeList}

Example: `curoccvideo "CUSTOMER",
"HLT"`

## Switches

* `/inner`—apply the video
  properties to all inner entities of the current occurrence, but not to the specified entity itself.
* `/up`—apply the video
  properties only to inner entities that are painted as up entities within the specified entity.
* `/off`—turn off video
  highlighting for the current occurrence; if the /inner switch is present, video
  highlighting is turned off for inner entities only.

## Parameters

* Entity—name of an entity.
  Can be a string, or a field, variable, function, or parameter that evaluates to a string. If
  Entity is `"*"`, the video properties are applied to all entities
  in the form. If Entity is omitted, only the current entity is affected.
* AttributeList—video
  attributes to apply; one of
  + `DEF`—set the default video attributes for the current occurrence.
    (The default video attributes are determined by the assignment setting
    $DEF\_CUROCC\_VIDEO.)

    If AttributeList is
    omitted, `DEF` is assumed.
  + `NON`—set no special video
    attributes for the current occurrence. In character mode, this means that fields, which appear in
    inverse by default, appear in normal video; this can create a sort of highlighting effect.
  + List of one or more video attribute codes,
    separated by GOLD semicolons (`;`) or by commas
    (`,`).

## Video Attributes

Video Attribute Codes

| Attribute Code | Description |
| --- | --- |
| `BLI` | Blinking |
| `BOR` | Border |
| `BRI` | Bright |
| `HLT` | Use system highlight color.  **Note:**  This attribute always takes precedence over other video attributes that may be specified. |
| `INV` | Inverse |
| `UND` | Underline |
| `COL=` *n* | Set color to color code n, the sum of the color numbers for foreground and background. |

## Return Values

None

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

The curoccvideo statement sets
the video properties for the fields of the current occurrence. Used without a switch,
curoccvideo applies these properties to fields of Entity.

Using the `/inner` or
`/up` switch excludes the calling entity, so only inner or upper entities,
respectively, are altered with these switches. For example, the following statement affects only
the inner entities of MyOuterEntity:

```procscript
curoccvideo/inner "MyOuterEntity", "BRI"
```

**Note:**   The curoccvideo statement
does not affect an entity that is painted with a single occurrence, unless that entity is painted
as an up entity and the outer entity is painted with multiple occurrences.

## Defining Default Video Attributes for the Current Occurrence

You can use the assignment setting
$CUROCC\_VIDEO to enable the highlighting of the active occurrence in all form
components of the application, using the default video attributes defined with
$DEF\_CUROCC\_VIDEO. This acts as if the following Proc statement were executed
for each form:

```procscript
curoccvideo "*","DEF"
```

If curoccvideo sets the video
attribute to `HLT`, and the system highlight color is the same as the color used by
Windows to highlight text selected in an edit box, the difference between selected and non-selected
text will not be visible to the user. In this case, you can define a different color combination
using the $CUROCC\_VIDEO\_HLT assignment setting. For more information, see [$CUROCC\_VIDEO](../../../configuration/reference/assignments/curocc_video.md), [$DEF\_CUROCC\_VIDEO](../../../configuration/reference/assignments/def_curocc_video.md), and [$CUROCC\_VIDEO\_HLT](../../../configuration/reference/assignments/_curocc_video_hlt.md).

## Overriding Current Occurrence Video Properties

Video attributes that are defined for the current
occurrence are overridden by those defined with the assignment setting
$ACTIVE\_FIELD. This allows the active field to be visible within the active
occurrence (if you have chosen appropriate video properties).

Video attributes set with
fieldvideo override both those set with $ACTIVE\_FIELD and
those set for the current occurrence, unless $ACTIVE\_FIELD\_FIRST is also set.
For more information, see [$ACTIVE\_FIELD](../../../configuration/reference/assignments/active_field.md) and [$ACTIVE\_FIELD\_FIRST](../../../configuration/reference/assignments/_active_field_first.md).

## Using curoccvideo

The following example causes the fields of the
current occurrences of all inner entities that are painted as up entities within the entity
Customer to appear with white letters on a blue background. The color number is determined by
adding 56 (black foreground) and 1 (blue background).

```procscript
curoccvideo/up "CUSTOMER", "COL=57"
```

The following example turns off highlighting of
fields of the current occurrences of all inner entities within the entity ENT1, but not of ENT1
itself.

```procscript
curoccvideo/inner/off "ENT1"
```

## Related Topics

- [$curoccvideo](../procfunctions/_curoccvideo.md)
- [$fieldvideo](../procfunctions/_fieldvideo.md)
- [fieldvideo](fieldvideo.md)
- [$CUROCC_VIDEO_HLT](../../../configuration/reference/assignments/_curocc_video_hlt.md)
- [$ACTIVE_FIELD](../../../configuration/reference/assignments/active_field.md)
- [$DEF_CUROCC_VIDEO](../../../configuration/reference/assignments/def_curocc_video.md)
- [$CUROCC_VIDEO](../../../configuration/reference/assignments/curocc_video.md)
- [Video Attributes](../../../desktopapps/colorhandling/video_attributes_is.md)


---

# debug

Start the Uniface Debugger.

debug

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

The debug statement causes the
component to enter debug mode. On the client in a GUI environment, it starts the Uniface Debugger, enabling you to enter debugging commands. On a client running in character mode, a debug command
line appears at the bottom of the screen.

During the development process, it is quite
common to place the debug statement in the application-level Switch Keyboard
trigger. This statement should be removed once the system goes into production, or embedded in a
conditional instruction so that it can only be invoked in specific circumstances. Alternatively,
you can use the /deb switch to start the application and the Debugger.

## Debugging a Uniface Server

The debug statement is not implemented for the Uniface Server. The
Debugger is neither started nor stopped at a debug statement. This is because a
server process on Windows is not able to start a windowing application that needs a desktop to
run on.

To debug the server startup shell, you must start
the Debugger before the Uniface Server is started, either manually or by means of the Uniface
Router. If you want to run the Debugger on a different machine, you should configure a unique TCP
port for the communication.

The following example shows the use of the
`debug` statement:

```procscript
;Exec trigger 
debug
edit
end ; end trigger
```

## Enabling the Debugger in a Deployed Application

To enable the debugger to be started in a deployed application:

1. Add the following Proc code to the Switch Keyboard trigger of the startup shell:

   ```procscript
   ; Switch keyboard trigger
   if ($logical("SwitchKeyboard") = "debug")
       debug
   endif
   ```
2. If debugging is required for some reason in the deployed application, add `SwitchKeyboard=debug` to the [LOGICALS] section of the assignment file, and activate the trigger by pressing GOLD Y.

## Related Topics

- [nodebug](nodebug.md)
- [Debugging Uniface Applications](../../../testinganddebugging/debugger/debugging1.md)
- [Compiling Objects](../../../howunifaceworks/compilation/compile_a_component.md)
- [Switch Keyboard](../triggersstandard/switchkeyboard.md)
- [Debugging in Character Mode](../../../testinganddebugging/debugger/debuggingincharactermode.md)
- [/deb](../../../_reference/commandlineswitches/deb.md)


---

# delete

Deletes the current occurrence from the database.

delete

## Return Values

Values returned by delete in $status

| Value | Meaning |
| --- | --- |
| 0 | Data was successfully deleted. |
| -1 | No entities are painted on the component. |
| -2 | Occurrence not found. |
| -3 | Exceptional I/O error (hardware or software). |
| -5 | Update request for nonupdatable occurrence. |
| -6 | Exceptional I/O error on write request; for example, lack of disk space, no write permission, or violation of a database constraint. Check the message frame for details. |
| -11 | Occurrence already locked. |
| -16 | Network error: unknown. |

Values commonly returned by $procerror following delete

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |
| -1 | <UGENERR\_ERROR> | An error occurred. No entities are painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

The delete statement deletes
the current occurrence from the database. This statement should only be used in the Delete trigger
and, with extreme caution, in the Delete Up trigger. If you do place it in another trigger, make
sure that you lock the occurrence as soon as possible.

The following example shows the use of the delete statement:

```procscript
trigger _delete
delete
end ;end trigger
```

## Related Topics

- [erase](erase.md)
- [remocc](remocc.md)
- [store](store.md)
- [Delete](../triggersstandard/delete.md)
- [Store](../triggersstandard/store.md)
- [Delete Up](../triggersstandard/delete_up.md)


---

# deleteinstance

Deletes an instance of a component.

deleteinstance  InstanceName

## Parameters

* InstanceName—string, or field (or indirect reference to a field),
  variable, or function that evaluates to a string. The string should contain the name of the
  instance to be removed.

## Return Values

Values returned in $status

| Value | Description |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| 0 | The instance was successfully deleted. |

Values commonly returned by $procerror following deleteinstance

| Value | Error constant | Meaning |
| --- | --- | --- |
| -57 | <UACTERR\_NO\_INSTANCE> | The named instance cannot be found in the component pool. |
| -162 | <UACTERR\_DELETE\_INSTANCE> | Deleting the instance has been postponed because the instance is busy.  For example, operation A1 in INSTA activates operation B1 in INSTB. Operation B1, in turn, activates operation A2 in INSTA. Operation A2 performs an `exit`, but INSTA cannot be deleted until operations B1 and A1 complete. |
| -163 | <UACTERR\_DEL\_POSTPONED\_CHILD> | Deleting the instance has been postponed because the instance has at least one busy child instance. The instance will be deleted when it no longer has busy children.  For example, non-modal form FRMX starts an attached non-modal form FRMY. While the application is idle, the user clicks on FRMY, activating a trigger which sends a message to FRMX. This message results in an `exit` (on FRMX), but FRMX cannot be deleted until its child instance FRMY is not busy. |
| -164 | UACTERR\_DEL\_POSTPONED\_PROC | The instance is in the process of being deleted.  For example, between a deleteinstance or exit and the time the instance is actually deleted, an attempt is made to activate an operation in the instance being deleted. |

## Use

Allowed in form, service, session service, entity service, and report components.

## Description

The deleteinstance statement removes the instance named
InstName, and all child instances, from the component pool.

If the Operations trigger of any of the instances being removed contains an operation
named CLEANUP, that operation is executed before the instance is removed.

## Creating and Deleting Instances

In the following example, the
Application Execute trigger starts a sequence of non-modal forms before
allowing the user to take control of the application. When control returns to
this trigger, the Proc code removes any detached instances that are still in
the component pool.

```procscript
; trigger: Application Execute

; start the initial forms
newinstance "form10",$1,"MODALITY=NON-MODAL"
newinstance "form20",$2,"MODALITY=NON-MODAL"
newinstance "form40",$3,"MODALITY=NON-MODAL"
; show them
$1->EXEC()
$2->EXEC()
$3->EXEC()
; let the user play
; control returns to me, so clean up any detached instances
getitem $1, $detachedinstances, 1
while ( $status > 0 )
   deleteinstance $1
   getitem $1, $detachedinstances, 1
endwhile
```

## Related Topics

- [newinstance](newinstance.md)
- [Component Memory Management](../../../howunifaceworks/processing/componentmemorymanagement.md)


---

# deletesetting

Delete initialization settings.

deletesetting  Source`,`  Setting`,`  Topic

## Parameters

* Source—location of the
  settings. Valid values depend on the platform and must be supported by the
  Topic.

  + Empty string (`""`)—default
    source for the platform. On Windows, the default source depends on the specified
    Topic. On other platforms, it is environment variables (Unix), or data areas (iSeries).
  + IniFile—name of an
    initialization file.
  + `USYS`—use the runtime
    settings.

    **Note:**  Except on Windows, it is only possible
    to address WORKDIR and the USYS path logicals.
  + Platform-specific value or keyword.
    For more information, see [Values of Source per Platform](#section_2D33BF4516E146E18B2C994C5FCBB5EC) .
* Setting—setting or section
  specification; the syntax is
  {Section`\`}Setting or
  {`[`Section`]`}Setting.

  Section may be required or
  optional, depending on the Topic:

  + Required for
    INISETTINGS, INIDATA, USYSSETTINGS,
    or USYSDATA.
  + Optional for
    REGVALUES or REGDATA; if not specified, the default key
    is used.
  + Omitted if Topic is
    INISECTIONS or USYSSECTIONS, but not for
    REGKEYS because registry keys can have sub-keys.

  Wildcards (GOLD \* and GOLD ?) are supported
  except for INIDATA, USYSDATA,
  ENVDATA or REGDATA.
* Topic—keyword defining the
  setting or settings to be deleted, depending on the Source. For more information, see [Values of Topic](#section_23CCE8C119044C9EB8B41C1D7E8F8908).

## Values of Topic

Allowed Values for Topic

| Value of Topic | Description |
| --- | --- |
| INIDATA | Delete the setting. Wildcards are not allowed. |
| INISETTINGS | Delete settings in the specified section that match the Setting pattern.  Wildcards can be used for Setting, but not for Section. |
| INISECTIONS | Delete the file sections that match the Setting pattern, if they are empty. Wildcards (GOLD \* and GOLD ?) can be used. |
| USYSDATA | Delete the setting. Wildcards are not allowed.  If Topic is USYS, restore the default value of the runtime setting. Only a limited set of runtime settings can be addressed. |
| USYSSETTINGS | Delete the settings that match the Setting pattern. Only a limited set of runtime settings can be addressed.  Wildcards can be used for Setting, but not for Section. |
| USYSSECTIONS | Delete the file sections that match the Setting pattern, if they are empty. Equivalent to INISECTIONS. |
| ENVDATA | Delete an environment variable, symbol/logical, or data area. Wildcards are not allowed. The maximum length that can be assigned to an environment variable is 4096 bytes. |
| ENVVARS | Delete one or more environment variables, data areas (iSeries) that match the Setting pattern. |
| REGDATA | Delete the registry value. Wildcards are not allowed. Windows only. |
| REGVALUES | Delete registry values under the specified key. Wildcards (GOLD \* and GOLD ?) are allowed only in Value but not in Key. Windows only. |
| REGKEYS | Delete subkeys under the specified key, if they are empty. Wildcards can be used for Subkey but not for Key. Windows only. |

## Values of Source per Platform

Values of Source on Windows

| Valid Value | Description |
| --- | --- |
| Empty string (`""`) | usys.ini file, if Topic is one of INISECTIONS | INISETTINGS | INIDATA | USYSSECTIONS | USYSSETTINGS | USYSDATA  Environment variables, if Topic is ENVVARS or ENVDATA  Registry of current machine if Topic is REGDATA, REGKEYS, or REGVALUES |
| IniFile | Name of an existing initialization file; valid only if Topic is one of INISECTIONS | INISETTINGS | INIDATA | USYSSECTIONS | USYSSETTINGS | USYSDATA |
| `USYS` | Runtime initialization settings; valid only if Topic is USYSDATA or USYSSETTINGS |
| `//`MachineName | Registry of remote machine if Topic is REGDATA, REGKEYS, or REGVALUES |
| `"32"` | `"64"` | Registry to address, the 32-bit registry or the 64-bit registry. On 32-bit platforms `""` is equivalent to `"32"` and on 64-bit platforms `""` is equivalent to `"64"`.  Valid only when Topic is REGDATA, REGVALUES, or REGKEYS. |

Values of Source on Unix and Linux

| Valid Value | Description |
| --- | --- |
| Empty string (`""`) | Environment variable |
| IniFile | Name of an existing initialization file ; valid only if Topic is one of INISECTIONS | INISETTINGS | INIDATA | USYSSECTIONS | USYSSETTINGS | USYSDATA |
| `USYS` | Runtime values of logical path settings (WORKDIR and USYS path logicals); valid only if Topic is USYSDATA or USYSSETTINGS. |

Values of Source on iSeries

| Valid Value | Description |
| --- | --- |
| Empty string (`""`) | Current process |
| IniFile | Name of an existing initialization file ; valid only if Topic is one of INISECTIONS | INISETTINGS | INIDATA | USYSSECTIONS | USYSSETTINGS | USYSDATA |
| LibraryName | Name of a data area; valid only if Topic is ENVVARS or ENVDATA |
| `*SYS` | System-level environment variable; valid only if Topic is ENVVARS or ENVDATA |
| `*SYSVAL` | System-level environment variable; valid only when retrieving a value and Topic is ENVVARS or ENVDATA |
| `*JOB` | Job level environment variable, same as empty string; valid only if Topic is ENVVARS or ENVDATA |
| `USYS` | Runtime values of logical path settings (WORKDIR and USYS path logicals); valid only if Topic is USYSDATA or USYSSETTINGS. |

## Return Values

Values commonly returned by $procerror following
deleteseetting

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `0` | UACT\_SUCCESS | Success. This value is also returned if no settings have been deleted because none matched the profile provided in the Setting parameter. |
| `-4` | UIOSERR\_OPEN\_FAILURE | The specified source could not be opened. |
| `-5` | UIOSERR\_UPDATE\_NOT\_ALLOWED | The specified section is not empty. |
| `-12` | UIOSERR\_FILE\_READ\_WRITE | An error occurred while trying to read or write to the file, registry, or environment variable |
| `-1118` | UPROCERR\_ARGUMENT | The specified setting does not exist. |

## Use

Allowed in all Uniface component types.

## Description

An initialization setting can be considered to any
of the following:

* Setting in an initialization file (on all
  platforms)
* Environment variable (on all platforms
  )
* Data area or system value (on iSeries)
* Key value in the Registry (on Windows
  )

A section is considered to be a file section in an
initialization file, or a key in the Windows Registry

You can use the deletesetting
command to delete a setting, settings in a specific section, or one or more *empty*
sections.

* Single setting—specify the
  Topic parameter as INIDATA, USYSDATA,
  REGDATA or ENVDATA.
* Zero or more settings in a specific section or
  subkey (if applicable)—specify a retrieve profile using wildcards in the Setting
  parameter and specify the Topic parameter as INISETTINGS,
  USYSSECTIONS, REGVALUES or
  ENVVARS.
* Zero or more empty sections or subkeys—specify
  a retrieve profile using wildcards in the Setting parameter and specify the
  Topic parameter as INISECTIONS,
  USYSSECTIONS or REGKEYS.

Deleting a setting with topic
USYSDATA restores its default value.

If no settings or sections match the profile,
$procerror is set to `0`, indicating that no items were removed.
If any of the section or subkey is not empty, nothing is removed and $procerror
is set to `-5`.

## Related Topics

- [$setting](../procfunctions/_setting.md)
- [Initialization Settings and Files](../../../configuration/initializationsettingsandfiles.md)


---

# delitem

Deletes an item from a list.

delitem  List,  N

delitem/id{/case}  List,  Index

## Switches

* /id—delete the item with
  the value Index from an associative list.
* /case—match the case
  specified in Index.

## Parameters

* List—field, indirect
  reference to a field, variable, or assignable function that can accept a string value. The string
  should contain the list from which an item is to be deleted.
* N—constant, or field (or
  indirect reference to a field), variable, or function that can be converted to a whole (integer)
  number; the value will be truncated to form an integer. The integer represent the number of the
  item in an indexed list. (Items are numbered starting with 1.)
* Index—string, or field (or
  indirect reference to a field), variable, or function that evaluates to a string representing a
  value in an associative list; it cannot be an expression.

## Return Values

Values returned in $status

| Value | Description |
| --- | --- |
| 0 | No item was deleted |
| >0 | Item number of the item that was deleted from List |

## Use

Allowed in all Uniface component types.

## Description

The delitem statement deletes
an item from List.

To delete all items from a list, set the list
equal to an empty string ("") using an assignment; for example, if the variable
$1 contains a list, the following statement creates an empty list:

```procscript
$1 = ""
```

## Indexed lists

Use the delitem statement
without switches to delete the Nth item from List.

If List contains an
associative list, the entire ValRep for the Nth item is deleted. If
N is -1, the last item in List is deleted. Otherwise, if
N does not refer to an existing item, no item is deleted.

## Associative lists

Use the /id switch to delete
the item whose value is Index from an associative list.

By default, matching Index
with item values is not case-sensitive. For example, the following statement deletes from $LIST$
the first item encountered whose value is ab, Ab,
aB, or AB:

```procscript
delitem/id $list$,"ab"
```

Use the /case switch with
/id to cause the matching to be case-sensitive. For example, the following
statement only deletes an item whose value is ab:

```procscript
delitem/id/case $list$,"ab"
```

**Note:**   In the examples below, an underlined semicolon
( `;` ) represents the Uniface subfield separator (by default, GOLD ;).

The following example deletes the third item from an indexed list.

```procscript
$valrep(DBMSFLD) = "rms;ora;syb;rdb"
; ValRep is "rms;ora;syb;rdb"
delitem $valrep(DBMSFLD), 3
; ValRep is "rms;ora;rdb"
```

The same item could also be deleted by treating
the list as an associative list:

```procscript
$valrep(DBMSFLD) = "rms;ora;syb;rdb"
; ValRep is "rms;ora;syb;rdb"
delitem/id $valrep(DBMSFLD), "syb"
; ValRep is "rms;ora;rdb"
```

The following example deletes the item with the
value 'tue' from an associative list:

```procscript
$valrep(DATEFLD) = "mon=monday;tue=tuesday;wed=wednesday"
; ValRep is "mon=monday;tue=tuesday;wed=wednesday"
delitem/id $valrep(DATEFLD), "TUE"
; ValRep is "mon=monday;wed=wednesday"
```

## Related Topics

- [$fieldvalrep](../procfunctions/_fieldvalrep.md)
- [$fieldproperties](../procfunctions/_fieldproperties.md)
- [$properties](../procfunctions/_properties.md)
- [$valrep](../procfunctions/_valrep.md)
- [List Handling in Proc](../../lists/listhandling.md)


---

# dircreate

Create the specified directory in the working directory.

dircreate  NewDirPath

## Parameters

NewDirPath—directory name,
optionally preceded by the path to the directory, which can be in a zip archive. Must end with a
directory separator.

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The dircreate statement
creates the specified directory in the current working directory using any file redirections in the
assignment file.

## Specifying the Directory

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md).

## Operation Failure

The operation fails if
NewDirPath:

* Already exists
* Does not permit user-creation due to
  insufficient authorization level
* Has invalid syntax

## Unix

On Unix, the directory is created with
`read` and `write` access on world, group, and user level.

## iSeries

On iSeries, dircreate creates a
library or a file in a library or, when the IFS prefix is used, a directory in the IFS.

If used without the IFS prefix, a library, or a
file in a library, is created. Libraries cannot have sublibraries, so no more than one directory
separator is allowed. That is, the only allowed syntax is library/ or
file or library/file.

If used with the IFS prefix, an IFS directory is
created. Directories in the IFS can have subdirectories, but the different file systems existing in
the IFS have their own rules and limitations.

For more information, see [File-Naming Considerations on iSeries](../../filemanagement/filenamingconsiderations_as400.md).

## Creating a Directory in the Current Working Directory

The following Proc code creates a directory with
the name coffee in the current working directory:

```procscript
dircreate "coffee"
```

## Creating a Directory in an Existing Directory

The following Proc code creates a directory with
the name coffee in the directory sub1dir in the current
directory:

```procscript
dircreate "sub1dir\coffee\"
```

or

```procscript
dircreate "[.sub1dir.coffee.]"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# dirdelete

Delete the specified directory.

dirdelete  DirPath

## Parameters

DirPath—directory name,
optionally preceded by the path to the directory. The directory can be located in a ZIP archive.
Must end with a directory separator.

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The dirdelete statement
deletes the specified directory DirPath, using any file redirections in the
assignment file.

## Specifying the Directory

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md).

## Operation Failure

The operation fails if
DirPath:

* Is not a directory
* Is the current directory or root
* Is not empty
* Is in use (locked)
* Does not permit user-deletion due to
  insufficient authorization level
* Has invalid syntax

## iSeries

When used without the IFS prefix, deleting
libraries is only possible for libraries that are not in use and not on your own or somebody else’s
library list. The same applies for files in libraries. Negative return values can be expected.

When used with an IFS prefix, directories are
deleted as expected.

For more information, see [File-Naming Considerations on iSeries](../../filemanagement/filenamingconsiderations_as400.md).

## Using dirdelete

The following Proc code deletes the directory
tea if it is empty and the user confirms that it may be deleted:

```procscript
$dir$ = "drinks\tea\"
; or $dir$ = "drinks/tea/"
; or $dir$ = "[drinks.tea]"
if ($dirlist($dir$,"dir") = "" & $dirlist($dir$,"file") = "")
   askmess/warning "Do you want to delete '%%$dir$'?", "Yes, No"
   if ($status = 1) 
      ldirdelete $dir$
   else
   message/error "Directory '%%$dir$' is not empty!"
endif
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# dirrename

Rename the specified directory.

dirrename  DirPath,  NewDirName

## Parameters

* DirPath—directory name,
  optionally preceded by the path to the directory.
* NewDirPath—new directory
  name, optionally preceded by the path to the directory. Must *not* end with a directory
  separator.

The directory can be located in a zip archive.
For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md)..

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The dirrename statement
renames the specified directory DirPath to NewDirName, taking
file redirections in the assignment file into account.

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

## Operation Failure

The operation fails if
DirPath:

* Is not a directory
* Does not exist
* Is not empty
* Is in use (locked)
* Is the current directory or root
* Does not permit user-renaming due to
  insufficient authorization level
* Has invalid syntax

The operation also fails if
NewDirName:

* Already exists
* Has invalid syntax (for example, if it ends
  with a directory separator)

## iSeries

Renaming libraries is only possible for libraries
that are not in use and not on somebody else's library list. Therefore, the Proc programmer must be
prepared for a negative return value when renaming libraries. The same applies for files in
libraries. IFS directories can be renamed in the same way as on Unix systems.

The following Proc code renames the directory
drinks\coffee to drinks\tea:

```procscript
dirrename "drinks\coffee\", "tea"
```

or

```procscript
dirrename "[drinks.coffee]", "tea"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [ldirrename](ldirrename.md)
- [filerename](filerename.md)
- [lfilerename](lfilerename.md)
- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# discard

Remove one or more occurrences from the component and the hitlist.

discard  {Entity}  {,  FromOccurrence  {,  ToOccurrence}}

## Parameters

* Entity—entity to be
  discarded. Can be a string, or a field, variable, function, or parameter that evaluates to a string
  containing the entity name. If omitted, occurrences are removed from the current entity.
* FromOccurrence and
  ToOccurrence—position of the occurrence in the hitlist; can be a constant, or
  field (or indirect reference to a field), variable, or function that can be converted to a whole
  (integer) number; the value will be truncated to form an integer.

## Return Values

Values returned by discard in $status

| Value | Meaning |
| --- | --- |
| >0 | The sequence number of the occurrence that is now current after discarding the first occurrence. |
| 0 | One or more occurrences were successfully discarded and no next occurrence is available. This can be because:   * There was only one occurrence. * A range of occurrences was   discarded. * The discarded occurrence was not the   first occurrence. Because it is treated as a range of one occurrence, there is no next   occurrence. * discard was used   outside the read trigger, but there may still be   occurrences that have to be fetched into the component and have therefore not had their   read trigger fired. See   [Using discard Outside of Read Trigger](#section_D95BA0CCCF9E47179B9F9FF97EE370F6). |
| -1 | The FromOccurrence was greater than the number of available occurrences. |
| -2 | Entity EntityName does not exist or is not painted in the component. |
| -3 | The component is locked for updates. |

Values commonly returned by $procerror following
discard

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1203 | <UPROCERR\_RANGE> | Value out of range. For example, FromOccurrence is greater than the number of occurrences of Entity. |
| -1320 | <UPROCERR\_COMPONENTLOCKED> | The component is locked for updates. This can occur during processing of xmlsave, when discard is used in the Pre-Save Occurrence or Post-Save Occurrence triggers |

## Use

Allowed in all Uniface component types.

## Description

The discard statement removes
one or more occurrences of Entity from the component and from the hitlist.

The main use of the discard
statement is to release memory in large batch jobs, resulting in better performance. For optimum
use of such a process, it is recommended that the time between the occurrence being processed and
the occurrence being discarded is not too long.

The behavior following discard
is governed by the location of the discarded occurrence:

* If the discarded occurrence is not the last
  occurrence, the *next* occurrence is made active after a discard.
* If the discarded occurrence is not the first
  occurrence, it is implicitly treated as a range of occurrences in which
  FromOccurrence and ToOccurrence have the same value.
* If the discarded occurrence is the last
  occurrence, the *previous* occurrence is made active after discard.
* If the component contains only one
  occurrence, that occurrence is discarded and a new, empty occurrence becomes the
  *current* occurrence.

The values of $curocc,
$curhits, $dbocc, $hits,
$totdbocc, and $totocc are all altered by
discard.

## Discarding a Range of Occurrences

Use FromOccurrence and
ToOccurrence to specify a range of occurrences to be discarded:

* If both FromOccurrence and
  ToOccurrence are specified, that range of occurrences, inclusive, is discarded.
* If ToOccurrence is
  omitted, FromOccurrence is discarded. If FromOccurrence is
  -1, the last occurrence is discarded.
* If both FromOccurrence and
  ToOccurrence are omitted, the current occurrence is discarded.

**Note:**  The discard statement
affects currency in the same way as remocc. An implicit
setocc in the affected entity is performed. This results in a change in the
active path, which can cause the structure editor to activate certain data validation triggers.
For more information, see [Trigger Activation](../../triggers/concepts/trigger_activation_is.md).

## Using discard Outside of Read Trigger

If discard is used outside the
Read trigger, $status may return `0` (indicating that there are
no following occurrences) even when there are still occurrences to be read. This is because
discard only looks at occurrences present in the component—those for which the
Read trigger has already fired.

However, there may still be occurrences that have
to be fetched into the component and have therefore not had their Read trigger fired. This is
because the retrieve statement only fetches occurrences just before they need to be displayed, for
example when setocc is used.

In the following example, at the moment the
discard is executed, there is indeed no next occurrence:

```procscript
entry discardtest
clear/e "ENT1"
retrieve/e "ENT1"
setocc "ENT1",1
repeat
  selectcase P1.ENT1
    case "1"
      setocc "ENT1", $curocc(ENT1) + 1
    case "10"
      setocc "ENT1", $curocc(ENT1) + 1
    elsecase
     discard
  endselectcase
until ($status <=0)
end
```

To ensure that the next occurrence is retrieved
from the database, you can do one of the following:

* Place discard in the Read
  trigger. For more information, see [Using discard in the Read Trigger](#section_5B6CC48A6FAD787B096BE8427FA2F591).
* Use `setocc$entname, $curocc + 1` after
  discard. If $status < 0, all occurrences of the hitlist
  have been fetched. For more information, see [Using discard in Batch Process](#example_BDA04441E40D47ADAC19703A29D69B2B)..
* Complete the hitlist before using
  discard by using the instructions `setocc
  $entname, -1` and `setocc $entname,
  1` after retrieve.

  However, this can have a negative effect on
  performance because it fetches all the occurrences in the hitlist from the database.
* Use $next or
  compare/next before discard to ensure that Uniface fetches
  the next occurrence.

## Using discard in the Read Trigger

After discarding an occurrence, Uniface makes
another occurrence active. If this occurrence is not available in the component, the Read trigger
for that entity is activated to get the data for the newly active occurrence. If the
discard statement being executed occurs in the Read trigger of the entity being
discarded, the Read trigger would be called recursively. After some number of these calls, a stack
overflow error can occur, ending the application.

To prevent this problem, *in the Read
trigger of the entity being discarded only* , any code following a discard
statement is ignored; the trigger ends immediately after the occurrence is discarded. If necessary,
the trigger is reactivated to obtain data for the new active occurrence, but it is not called in a
recursive manner. In the following example, the putmess statements are never
executed because the Read trigger ends following the discard statement:

```procscript
; trigger: Read
;This code should not be used
read
$1 = PKEY
if ( INVDATE < $date("1-jan-96") )
   discard
   putmess "Discarded: %%$1"
endif
putmess "Kept: %%$1"
```

**Note:**   If the discard statement
occurs in an operation or in a local or global Proc that is called from the Read trigger, this
behavior is circumvented, leading to the possibility of a stack overflow error.

In the following example, the
putmess statements *are* executed because the
discard statement occurs in a local Proc module. Be aware that this situation
can result in a stack overflow error since the Read trigger may be called recursively.

```procscript
; trigger: Read
read
call CHECK_DISCARD

; trigger: Local Proc Modules
entry CHECK_DISCARD
$1 = PKEY
if ( INVDATE < $date("1-jan-96") )
   discard
   putmess "Discarded: %%$1"
endif
putmess "Kept: %%$1"
```

**Important:** 

It is recommended that you avoid situations in
which a discard statement occurs in the Read trigger of an inner entity and the
entity being discarded is an outer entity.

Using discard in the Read
trigger of an inner entity has a serious impact on the active path and can have unpredictable
results. A better approach would be to use a variable to set a flag and have the Read trigger of
the outer entity perform the discard.

## Using discard in Read Trigger of Outer Entity

For example, consider a report component where
you want to show only customers who have not placed an order since a certain cutoff date. The
entity ORDER is painted inside the entity CUSTOMER. The decision whether to keep a customer for the
report or discard it is based on the values of the field DATE\_OF\_ORDER for occurrences of the inner
entity. Rather than performing the discard in the Read trigger of an inner entity, you can arrange
to discard the CUSTOMER occurrence from the Read trigger of an outer entity.

```procscript
; trigger: Read of outer entity CUSTOMER
$RECENT_ORDER$ = FALSE
read                      
setocc "ORDER", -1        
if ($RECENT_ORDER$ = TRUE)
  discard "CUSTOMER"
endif
read
if (DATE_OF_ORDER > $CUTOFF_DATE$) ; found a recent order
   $RECENT_ORDER$ = TRUE
endif
```

1. Retrieve all occurrences of CUSTOMER
2. Change current entity to ORDER
3. If Read of inner entity ORDER finds a recent
   order, discard the CUSTOMER occurrence

## Using discard in Batch Process

The following example shows how to get optimum use of the discard
statement in a batch process:

```procscript
; trigger: Execute
retrieve
if ($status <0)
   return ($status)
endif
repeat
   discard "ENTITY"
   if ($status = 0)
      setocc "ENTITY", $curocc("ENTITY") + 1
   endif
until ($status < 0)
```

## Related Topics

- [remocc](remocc.md)
- [$curocc](../procfunctions/_curocc.md)
- [$curhits](../procfunctions/_curhits.md)
- [$dbocc](../procfunctions/_dbocc.md)
- [$hits](../procfunctions/_hits.md)
- [$totdbocc](../procfunctions/_totdbocc.md)
- [$totocc](../procfunctions/_totocc.md)


---

# display

Presents the form on the screen as display-only.

display{/menu}  {LitFieldName}

## Switches

/menu—activates the <Menu> trigger at field, entity, form, or
application level (the one at the lowest level that contains Proc code) when the form appears.

## Parameters

LitFieldName—literal name of the field in which to position the cursor;
do not enclose the name in double quotation marks ("). The cursor is positioned in the field
named.

If LitFieldName is omitted or is not painted on the form, the cursor
is positioned on the first painted field (that is, in the field nearest the top left corner of the
form).

## Return Values

Values Returned in $status

| Value | Meaning |
| --- | --- |
| 10 | The user used ^QUIT to leave the form that was started with display. |
| 9 | The user used ^ACCEPT to leave the form that was started with display. |
| 0 | Success. |
| -16 | The application is running in batch mode. Use a test on $batch to avoid this. |

Values commonly returned by $procerror following $display

| Value | Error constant | Meaning |
| --- | --- | --- |
| -33 | <UGENERR\_BATCH\_ONLY> | Statement not allowed in batch mode. Use a test on $batch to avoid this. |
| -1401 | <UPROCERR\_PROMPT> | Prompted field not valid. |
| -1402 | <UPROCERR\_STATEMENT> | Statement not allowed in this trigger. The display statement is not in an Execute trigger. |

## Use

Allowed only in the Execute trigger of form components.

## Description

The display statement presents the current form as display-only. Data
in the form cannot be modified. (You can also use newinstance with the instance
property `DISPLAY=TRUE` or run/display to start a form in
display-only mode.)

The following example shows how to use the
`display` statement:

```procscript
; trigger: Execute

CUST_NBR = $1
retrieve
message "%%$hits customers match search profile"
display CUSTNAME
```

## Related Topics

- [edit](edit.md)
- [run](run.md)
- [$batch](../procfunctions/_batch.md)


---

# displaylength

Return the display length of a String when displayed in the system
character set.

displaylength  String

## Return Values

Setting $status has no effect
on subsequent processing.

Setting $result returns the
length of String when displayed in the system character set. The length is
expressed in bytes.

## Use

Allowed in all Uniface component types.

## Related Topics

- [$displaylength](../procfunctions/_displaylength.md)
- [$result](../procfunctions/_result.md)
- [$SYS_CHARSET](../../../configuration/reference/assignments/sys_charset.md)


---

# done

Exit from the Proc module without changing $status.

done

## Return Values

The done statement does not
affect $status.

## Use

Allowed in all Uniface component types.

## Description

The statement done immediately
exits from the Proc module. If you want to return a value, use the return
statement rather than done.

The following example shows how to
use the `done` statement:

```procscript
; trigger: Quit

if ($formmod = 0)
   done
else
   message "Data modified!! Use STORE before QUIT."
   return (-1)
endif
```

## Related Topics

- [break](break.md)
- [end](end.md)
- [exit](exit.md)
- [return](return.md)


---

# edit

Display the component in preparation for user input.

edit
{/modal {/deferred } } | /nonmodal }
{/nofocus} | {/menu | /nowander}
  {LitFieldName}

## Switches

* /modal—makes the form
  instance modal, and displays it, ready for editing. In the Execute trigger, overrides the modality
  defined by the newinstance statement.
* /nonmodal—makes the form
  instance non-modal, and displays it, ready for editing. Overrides the modality defined by the
  newinstance statement.
* /nofocus—displays the form
  instance but does not give it focus initially. Focus remains with the form instance that was
  already active, until explicitly changed by the user. Applicable only to non-modal forms. In the
  Execute trigger, overrides the InitialFocus property defined by the
  newinstance statement.
* /deferred—displays the
  modal form instance but defers making it editable (starting the structure editor) until the
  operation containing the edit statement has executed and returned control to the
  Proc code that invoked the operation.
* /menu—activates the
  <Menu> trigger at field, entity, form, or application level (whichever is lowest) when the
  form appears. Only allowed in Execute trigger.
* /nowander—cursor keys
  (including next and previous screen) scroll the field contents and cannot be used to leave a field.
  When the form is used with the GUI driver, the mouse cannot be used to change the location of the
  cursor and automatic scroll bars are also disabled. Structure editor functions such as ^NEXT\_FIELD,
  ^PREV\_FIELD, and so on, work as normal. Only allowed in Execute trigger.

## Parameters

LitFieldName—literal name of
the field in which the cursor should be positioned; do not enclose the name in double quotation
marks (`"`). If omitted or not painted on the form, the cursor is positioned in the
first painted field.

## Return Values

Values Returned in $status

| Value | Meaning |
| --- | --- |
| 0 | Success. |
| 9 | The user used ^ACCEPT to leave the form that was started with edit. |
| 10 | The user used ^QUIT to leave the form that was started with edit. |
| -1 | The edit statement is not in an Execute trigger or there are no prompt-able fields on the form. |
| -16 | An edit is attempted when in batch mode. Use a test on $batch to avoid this. |

Values commonly returned by $procerror following
edit

| Value | Error constant | Meaning |
| --- | --- | --- |
| -33 | <UGENERR\_BATCH\_ONLY> | Statement not allowed in batch mode. Use a test on $batch to avoid this. |
| -1401 | <UPROCERR\_PROMPT> | Prompted field not valid. |
| -1402 | <UPROCERR\_STATEMENT> | Statement not allowed in this trigger. This can be caused by /menu or /nowander being used in an operation, or using edit in a service. |
| -1411 | <UPROCERR\_EDITTWICE> | An edit statement was encountered when the structure editor was already active. This error also occurs when an activate is performed on a modal form that is already in edit mode and that has an empty Execute trigger (an implicit edit). |

## Use

Allowed in the Execute trigger and operations of
Forms.

Allowed without switches or arguments in the
Execute trigger of static server pages. In this case, it acts as a webget
followed by a webgen, and an HTML document is prepared and sent to the browser.

## Description

The edit statement is
typically used in the Execute trigger to display the form instance and start the structure editor,
enabling the user to edit the form.

**Note:**  If the Execute trigger is empty, the
edit statement (without switches or argument) is implicitly executed.

The edit statement is often
preceded by other Proc instructions that provide some pre-processing before the form is displayed.
For example, the following code retrieves the data before displaying form and positioning the
cursor in field NAME:

```procscript
;Execute trigger
retrieve/e PERSON
edit NAME.PERSON
```

The edit statement can also be
used in operations
.

## edit in Operations

When using the edit statement
in an operation, you should specify the modality using the /modal or
/nonmodal switch, and the modality must match the modality of the form.

Any statements after the
edit/modal statement are executed when the structure editor session is
terminated.

Any statements after the
edit/nonmodal statement are immediately executed, that is, processing continues
while the structure editor is running.

When edit is used in an
operation, as opposed to the Execute trigger, the form instance remains available even after the
operation has completed. This means that the structure editor can be started on a form without the
need to recreate the form, and also that the form can be displayed as necessary using the
show statement.

If an edit/modal or
edit/nonmodal statement is executed while the structure editor is running (that
is, $interactive returns 1), an error is returned.

## edit /nofocus

The edit /nofocus command can
be useful when you are working with secondary or popup forms and you don't want to give the
non-modal form focus right away. For example, in a quick search feature in which potential search
terms are displayed in a popup form as you type, focus needs to stay in the edit box but the popup
form only get focus when the user clicks on one of the listed terms.

You can implement the same behavior by setting the
InitialFocus property using when you create a from instance using
newinstance.

## edit with Parameters

The following example shows how to use the
edit statement in the Execute trigger, using parameter passing to make the form
component self-contained:

```procscript
;trigger _exec
params
  string CustomerNumber: IN
endparams

  CUST_NBR = CustomerNumber
  retrieve
  message "Selected customer ready for editing."
  edit CUST_NAME

end  ; end trigger
```

History

| Version | Change |
| --- | --- |
|  |  |
| 9.6.04, X401 | Added /nofocus |

## Related Topics

- [newinstance](newinstance.md)
- [InitialFocus](../../../development/reference/devobjproperties/window/initialfocus.md)
- [Execute](../triggersstandard/execute.md)


---

# eject

Eject a page when printing.

eject

## Return Values

Values returned in $status

| Value | Description |
| --- | --- |
| -1 | An error occurred. $procerror contains the exact error. |
| 0 | eject was successful. |

Values commonly returned by $procerror following eject

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1404 | <UPROCERR\_NO\_PRINTING> | Not printing (that is, $printing is 0). The eject statement is ignored. |

## Use

Allowed in form and report components
, except in the Frame Gets Focus trigger of a header or trailer frame.

## Description

The eject statement forces a
page break and causes Uniface to continue printing on the following page. It is recommended to
place the eject statement in either the Occurrence Gets Focus trigger or Leave
Printed Occurrence.

The eject statement is ignored
in the following circumstances:

* Uniface is not printing (that is,
  $printing is 0).
* In the second or later occurrence of an
  entity that is painted with horizontal repetition.
* On an empty page.
* In the Frame Gets Focus trigger of a header
  or trailer frame.

The following example starts a new page when the
contents of the INVDATE field change:

```procscript
; trigger: Leave Printed Occurrence

compare/next (INVDATE) from "INVOICE"    ;test if next date the same (or exists)
if ($result = 0)                         ;if next date exists and not the same
   eject                                 ;start printing on new page
endif
```

## Related Topics

- [skip](skip.md)
- [$printing](../procfunctions/_printing.md)


---

# else

Introduces a logical expression in an if/endif
conditional block.

See
[if](if.md).

---

# elsecase

Marks the Proc code to be executed if none of the case expressions
match in a
selectcase block

See
[selectcase](selectcase.md).

---

# elseif

Defines a condition to be evaluated in an
if/endif conditional block.

See
[if](if.md).

---

# end

Marks the end of a Proc module, operation, or trigger.

end

## Return Values

The end statement does not
affect the value of $status.

## Use

Allowed in all Uniface component types.

## Description

The end statement indicates
the end of a Proc module or operation. If this statement is encountered during execution, an
implicit done is executed and the module or operation ends, returning the
current value of $status. If an entry or
operation statement or the end of the trigger is encountered, an
end (and implicit done) for the previous Proc module or
operation is assumed.

Proc statements after an end
are not recognized unless they are part of another Proc module or operation. That is, if Proc
statements following an end are meant to be executed, the statement immediately
following the end should be an entry or
operation statement.

Labels defined with blockdata
statements must be defined at the end of a Proc module or operation, before the
end statement is encountered.

The following example shows the use of
end for a trigger and an entry statement:

```procscript
trigger _store 
call LSTORE
end ; end trigger
```

```procscript
; container: Local Proc Modules (component-level)

entry LSTORE
   store
   if ($status < 0)
      message "Store error!"
      rollback
   else
      message "Store done."
      commit
   endif
end ; end LSTORE entry
```

## Defining an Operation

The following example shows the operation
`DISCOUNT`, defined in the Operations trigger of a service component named SERV1:

```procscript
; Operations trigger of service SERV1
operation DISCOUNT
params
   string CUSTID : IN
   numeric AMOUNT : INOUT
   numeric PERCENTAGE : OUT
endparams
; no discount till proven otherwise
; 20% discount for Uniface
; 15% discount for Acme
; adjust amount
PERCENTAGE = 0
if ( CUSTID == "ufbv" ) PERCENTAGE = 20
if ( CUSTID == "acme" ) PERCENTAGE = 15
AMOUNT = AMOUNT * ( 100 - PERCENTAGE) / 100
end
```

The operation `DISCOUNT` could be
referenced from another component as follows:

```procscript
activate "SERV1".DISCOUNT (ID.CUST, TOTAL.INVOICE, $DISCOUNT$)
```

## Related Topics

- [entry](entry.md)
- [operation](operation.md)


---

# endfor

Ends a loop processing block started by `for`,
`forentity`, or `forlist`.

See for, forentity, and
forlist.

---

# endif

Defines the en of an
if conditional block

See
[if](if.md).

---

# endjavascript

Defines the end of a JavaScript block.

See javascript

---

# endparams

Defines the end of a
params block.

See
[params](params.md).

---

# endscope

Declare the end of a scope block. See scope.

`public` | `partner`  `web`{scope  
    {`input`  
    {`output`}  
    {`operation`  InstanceSelector1.OperationSelector1  
    {`operation`  InstanceSelectorN.OperationSelectorN} }  
{endscope}}

---

# endselectcase

Defines the end of a selectcase conditional block

See
[selectcase](selectcase.md).

---

# endvariables

Defines the end of a
variables block

See
[variables](variables.md).

---

# endwhile

Ends a `while` loop.

For more information, see while.

---

# entitycopy

Copy data from one DBMS or file to another.

entitycopy  Source`,`  Target  {`,`  Options}

## Parameters

* Source—database path and
  entity, or an XML file, to be copied, using the following syntax:

  + Database object:
    Path`:`Entity`.`Model

    Either of both of
    Entity and Model can contain wildcards, for example
    `DEF:ENT*.MOD*`
  + XML file: `xml:`{ZipArchive`:`}Filename

    For example,
    `xml:myxmlfile.xml` or `xml:ziparchive.zip:myxmlfile.xml`

    When a ZipArchive is
    specified, it is created in the Zip64 format.
  + Uniface 8 TRX file:
    `trx:`Filename
* Target—destination database
  path or XML file using the following syntax:

  + Database objects:
    Path`:`

    Entity and/or model names following the
    path are ignored.
  + XML file—same syntax as above
* List of one or more options that influence how
  the data is copied. See Options.

## Return Values

Values returned by $ude and entitycopy

| Value | Description |
| --- | --- |
| >=0 | Success. Number of records where an attempt was made to process them. Detailed information is returned in [$procReturnContext](../procfunctions/_procreturncontext.md). |
| <0 | An error occurred. [$procerror](../procfunctions/_procerror.md) contains the exact error and [$procerrorcontext](../procfunctions/_procerrorcontext.md) provides the details. |
| 8066 | 8066- Copy failed: Open error on input file/table.  This error can occur when no entity descriptors cannot be found. |

Values commonly returned by $procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| `-1` through `-25` | Various. See $procerror | Database I/O and network communication errors. |
| `-1107` | <UPROCERR\_PATH> | The path name is not correct or the path does not exist, for example, no assignment is found for the path. |

Errors from `-1` through
`-15` do not stop the entitycopy process, with the exception of
error `-9 <UIOSERR_LOGON_ERROR>`. The number of ignored errors is returned in
$procreturncontext, along with additional information, such as the Uniface
release number of the Source, and the number of input and output records
processed.

Items Returned by $procreturncontext after
entitycopy

Items are omitted if their value is zero or an
empty string.

| Item | Description |
| --- | --- |
| `Context``=`Context | Previously executed command that set the value of $ProcReturnContext: `EntityCopy` |
| `Error``=`Number | Error number if process failed on error |
| `InputRecords``=`Number | Records to be copied. |
| `OutputRecords``=`Number | Records written. |
| `SkippedRecords``=`Number | Records not written due to map file entity mapping to `<void>` |
| `WriteErrorsContinues``=`Number | Write errors encountered that did not stop the copy action. |
| `InputDescriptors=Number` | Descriptors to be copied. The same descriptor can occur more than once. |
| `OutputDescriptors``=`Number | Signatures actually output. This can be less than the number of `InputDescriptors` if void mappings are encountered. |
| `SkippedDescriptors``=`Number | Entities mapped to `<void>` |
| `InputTrxFiles``=`Number | TRX files to copy, if a wildcard was specified. |
| `InputXmlFiles``=`Number | XML files to copy, if a wildcard was specified. |
| `Release``=`ReleaseNumber | Number of the Uniface release of the source data. |
| `DETAILS``=`String | Detailed information about messages, warnings, and errors encountered during processing, structured as a list. |

## Use

Allowed in all Uniface component types.

## Description

The entitycopy Proc statement
copies or converts one or more entity occurrences from a source database or file to another. It
enables you to incorporate the functionality provided by the /cpy command line
switch into your Uniface application.

entitycopy is typically used to
export and import user data, but it can also be used to convert data, with or without a map file.
By default, when copying or importing from an XML file, the entity descriptors in the source XML
file are used. However, if you specify the `map=#` option, the entity descriptors in
the Repository are used instead. For example, if you want to change the syntax definition of a
field to use the W packing code instead of the C packing code, you can export the data, change the
syntax definition, then import the data specifying `map=#` to have it use the new
definition.

If the Source is a database,
analyze the application models to be exported.

The copy process does not consider referential
integrity constraints. It is assumed that the data to be copied is complete and correct.

## Options

The Options enables you to
influence how the data is copied. For example, you can specify a map file, or select occurrences
that have specific field values.

The Options is an associative
list containing at least one option and value, using GOLD ; ( ; )as a separator.

Options

| Option | Description |
| --- | --- |
| `append=``TRUE` | `FALSE` | Append the data to an existing XML file |
| `keepopen=``TRUE` | `FALSE` | Keep an XML file open in preparation for appending more data. Only applicable if Target is a single file.  By default, if the Target is an XML file, the file is flushed and closed each time the entitycopy command is used. However, to improve performance in cases when appending to a file, use this option to keep the file open. |
| `sort=``True` | `False` | Copy the output in primary key order. If this is set to `False`, depending on the database used, the order in the export file can differ in repeated exports, even if nothing has changed |
| `map=`MapFile | `#`{Entity|TargetEntity=SourceEntity} | Use mapping functionality to determine how data is copied from existing entity and field definitions to new model definitions.  For the following, it is not necessary to specify a MapFile:  `#`—use Target Repository definitions to map all entities  `#`Entity—use Target Repository definitions to map the specified entity  `#`TargetEntity=SourceEntity—use Target Repository definitions to map a source entity to a destination entity |
| `tran=`TranslationTable | Use the specified database translation table for converting the data.  A database translation table is a keyboard translation table that is used to convert character strings during database input or output. |
| `library=`TranslationTableLibrary | Library in which the TranslationTable  is located. |
| `where=`SelectClause | Copy selected occurrences. The SelectClause has the following syntax:  Field1OperatorObjectSpec 1{;Field nOperatorObjectSpecn} {`"`}   * Field—name of a   field in the source entity. * Operator—logical   operator preceded by GOLD, for example GOLD = ( = ) or GOLD > GOLD = (   >= ). * ObjectSpec—string   specifying the retrieve profile for objects to be copied. Use the subfield separator GOLD ! GOLD ;   ( !; ) to specify multiple conditions.   For information on specifying repository objects, see [/whr](../../../_reference/commandlineswitches/commandlinesubswitches/_whr.md). |
| `supersede=``TRUE` | `FALSE` | Indicate whether to overwrite existing occurrences having matching primary keys in the target DBMS. |
| `printinterval=`Number | Frequency with which a message is displayed, expressed as a number of occurrences. |
| `commitinterval=`Number | Frequency with which data is stored in the database, expressed as the number of occurrences. |

## Exporting and Importing Data

The following examples show how
entitycopy can be used to export and import data.

```procscript
;export data
entitycopy "def:myent.mymodel", "xml:myexportfile.xml"
entitycopy "def:myent.mymodel", "xml:myzip.zip:myexportfile.xml"

;import data
entitycopy "xml:myexportfile.xml", "def:myent.mymodel"
```

## Error Handling

entitycopy is a batch
processing instruction, so it is possible for errors to occur either in executing
entitycopy itself, or while processing an operation that it invokes. For
example, if you specify a source file that does not exist, $status returns
`-4` and $procreturncontext  returns:

```procscript
Context=EntityCopy·;
Release=9.5·;
DETAILS=
 DETAILS=
  ID=8026·!·!·!·;MESSAGE=8026 - Input file mycart.xml does not exist.·!·!·;
  ID=8080·!·!·!·;MESSAGE=8080 - Nothing copied.
```

However, if you use entitycopy
to import a file and it $status contains 0, this indicates the
entitycopy executed successfully, but no records were actually imported.
$procreturncontext contains more information.

For example, after importing an a data field,
$status contains 0 and $procreturncontext returns the
following (formatted for readability):

```procscript
Context=EntityCopy·;
InputRecords=9·;
WriteErrorsContinued=9·;
InputDescriptors=5·;
InputXmlFiles=1·;
Release=9.5·;
DETAILS=
  Operation=entitycopy·!·!·;
    From=mycars.xml·!·!·;
    To=·!·!·;
    InputRecords=0·!·!·;
    OutputRecords=0·!·!·;
    DETAILS=·!·;
  Operation=entitycopy·!·!·;
    From=mycars.xml·!·!·;
    To=·!·!·;
    InputRecords=1·!·!·;
    OutputRecords=0·!·!·;
    DETAILS=
      ID=8069·!·!·!·!·;
      MESSAGE=8069 - Copy failed: Write error on file/table 'DEF:UCSCH.DICT'.·!·;
  Operation=entitycopy·!·!·;
    From=mycars.xml·!·!·;
    To=·!·!·;
    InputRecords=0·!·!·;
    OutputRecords=0·!·!·;
    DETAILS=
      ID=8078·!·!·!·!·;
      MESSAGE=8078 - Copy from 'mycars.xml' to 'DEF:UCSCH.DICT'.·!·;
  Operation=entitycopy·!·!·;
    From=mycars.xml·!·!·;
    To=·!·!·;
    InputRecords=0·!·!·;
    OutputRecords=0·!·!·;
    DETAILS=
      ID=8074·!·!·!·!·;
      MESSAGE=8074 - Copied from 'mycars.xml' to 'DEF:UCSCH.DICT' total records/rows 0.·!·;
  Operation=entitycopy·!·!·;
    From=mycars.xml·!·!·;
    To=·!·!·;
    InputRecords=1·!·!·;
    OutputRecords=0·!·!·;
    DETAILS=
      ID=8069·!·!·!·!·;
      MESSAGE=8069 - Copy failed: Write error on file/table 'DEF:UCTABLE.DICT'.·!·;
...
```

$procreturncontext indicates
that 9 non-fatal write errors were encountered (`WriteErrorsContinued=9`) and the
`DETAILS` topic provides additional information for each error. For actual I/O error
messages, you need to check the message frame or log files.

## Specifying Multiple Conditions with where=

The following example uses the
`where=` option to retrieve all entities where the organization name (field ORGNAME)
starts with letters A through C, and the city (field CITY) is Detroit. The use of the GOLD subfield
separator (!;) in the `where` option implies a logical
AND. The GOLD separators and operators are underlined.

```procscript
entitycopy "def:ORG.ORGSMODEL", "xml:ABCOrgs.xml", %\
"printinterval=50 ;where=ORGNAME >=A&<=D!;CITY=Detroit"
```

## Specifying Alternative Conditions with where=

The following example uses the
`where=` option to retrieve all entities where the product code (field CODE) starts
with letters A through C, or the product category (field CATEGORY) is footwear. To specify a
logical OR between subfields in the where option, place the OR operator (GOLD |) immediately after
the subfield operator.

```procscript
entityCopy "def:PRODUCT.PRODUCTS", "xml:myexportfile.xml", %\
"printinterval=50 ;where=CODE >=A &<=D !;CATEGORY|=footwear"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |
| 9.5.01 | Removed the option `prcadditional=true`. The information it requested is now returned in DETAILS section of $procreturncontext. |

## Related Topics

- [$procReturnContext](../procfunctions/_procreturncontext.md)
- [Data Export, Import, and Conversion](../../../developmentadmin/dataexchange/concepts/exporting_and_importing.md)
- [Zip Files](../../../developmentadmin/dataexchange/concepts/zipfilesupport.md)
- [/cpy](../../../_reference/commandlineswitches/cpy.md)


---

# entry

Declare an entry, a Proc module that can be invoked from with the same
component.

```procscript
entry EntryName
{returns DataType}
{params
...
endparams}
{variables
...
endvariables}
```

... Proc statements and precompiler
directives

```procscript
{return (Expression) }
end
```

## Parameters

EntryName—literal name of the
entry; can have a maximum length of 32 bytes; these characters can be letters (A-Z), digits (0-9),
or underscores (\_).

## Return Values

The entry statement does not
affect the value of $status.

If return is specified, the
value is returned inline. This value can be used when the entry is called as a function, but not
when it is called using the call statement.

## Use

Allowed in all component types, as well as startup
shells and global Procs.

## Description

The entry statement declares
the name and the starting point of an entry (and the end of the previous Proc module, if its end statement was omitted). An entry must be declared in the same
component as the code that calls it.

If parameters are defined for the entry, the
params block should be the first statement following the
entry statement. If local variables are defined for the module, the
variables block should follow the params block, if that is
present.

## Entries in Field Triggers

Proc modules that are defined in the Local Proc
Modules triggers for all fields belonging to that entity are always available, regardless of
whether that field has been drawn on the component. However, Proc modules that are defined in other
triggers of a field are available only if that field has been drawn or included in the field list
for the entity.

## Entries in Subtype Triggers

If two subtypes of an entity contain
entry statements with the same EntryName, when they are drawn
on a single component, a compilation error results because of the multiple occurrences of the same
EntryName. To avoid this problem, you can create a global Proc named
EntryName and remove the entry modules from the subtypes.

## Entries in Global Procs

Be careful when using entry in
a global Proc. Place any statements not in the subroutine at the beginning of the global Proc. If
you call a global Proc which contains one or more entry statements, as well as
one or more statements which are not physically part of any module labeled with the
entry statement, the Proc interpreter ignores these 'loose' statements unless
they are the first statements in the global Proc.

## Calling Entries

Entries can be explicitly called using the
call Proc statement, in which case any return value is returned in
$status.

However, entries are like private functions that
can be called from within the component, or in the case of Global Proc, from anywhere within the
application. If they are called as a function, the return value can be assigned to a variable or
used as an argument or parameter. This means that they can be used directly in the code.

It also means that the return value can be of a
different data type than numeric (which is what $status is).

For example:

```procscript
entry doSomething
 returns string              ; set teh data type of the return value 
 return("I did something")   ; set the return value
end
```

This can be called:

* As a function:

  ```procscript
  vResult = doSomething()
  ; vResult = "I did something"
  ; $status = 0
  ```
* Using call:

  ```procscript
  call doSomething
  ; $status = 0
  ```

  In this case, the return value is not captured
  inline.

## Using Entries

In the following example, the
store trigger contains a call to an entry in the
component.

```procscript
;trigger Store
call LSTORE
```

```procscript
; Component-level Script container
entry LSTORE
   store
   if ($status < 0)
      message "Store error!"
      rollback
   else
      message "Store done."
      commit
   endif
end
```

## Using Entries as Functions

The following code calls entry
`multiply` and assigns its value to TOTAL:

```procscript
TOTAL = multiply(FLD1, FLD2)
```

```procscript
; Component-level Script container
entry multiply
returns numeric
params
   numeric parm1 : IN
   numeric parm2 : IN
endparams

variables
   numeric multiplyResult
endvariables

multiplyResult = parm1 * parm2
return multiplyResult
end ; multiply
```

## Related Topics

- [call](call.md)
- [params](params.md)
- [variables](variables.md)


---

# erase

Activate the Delete or Delete Up trigger for all occurrences in the component.

erase{/e  {Entity}}

## Switches

/e—erases all occurrences of
Entity in the component, including inner entities if the relationship between
these entities and the erased entity is Cascading Delete.

## Parameters

Entity—entity to be erased. Can
be a string, or a field, variable, function, or parameter that evaluates to a string containing the
entity name. If Entity is omitted, all occurrences of the current entity
($entname) are erased.

## Return Values

Values returned by erase in $status

| Value | Meaning |
| --- | --- |
| 1 | `erase` is not allowed. (For example, the component was activated with run/query.) |
| 0 | Data was successfully erased, or no entities are painted on the component. |
| -2 | Occurrence not found: table is empty. |
| -3 | Exceptional I/O error (hardware or software). |
| -5 | Update request for nonupdatable occurrence. |
| -6 | Exceptional I/O error on write request; for example, lack of disk space, no write permission, or violation of a database constraint. Check the message frame for details. |
| -11 | Occurrence already locked. |
| -16 | Network error: unknown. |

Values commonly returned by $procerror following erase

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |
| -35 | <UGENERR\_4GL\_SAYS\_ERROR> | A trigger returned a negative value in $status. |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

The erase statement activates
the Delete triggers at entity level for all occurrences *in the component*. This means
that occurrences which have *not* been fetched are not erased. Use this statement to
allow the user to erase all the occurrences in the component.

The erase statement attempts
to delete all the occurrences of the outermost entity that have been fetched into the component.
This includes occurrences not currently displayed, and also any occurrences fetched due to Proc
code. Uniface attempts to erase all occurrences, not just those visible on the component. If the
hitlist contains several occurrences, they are not deleted unless they have been explicitly fetched
into the component.

## Related Entities

If the entity to be erased has related entities,
the behavior of erase depends on the delete constraints of the relationship:

* Cascading Delete—the erase
  statement deletes related entities.
* Nullify Delete—it nullifies the foreign key in
  related entities.
* An erase is not allowed if
  there is a Restricted Delete relationship between entities and there are still occurrences of the
  many entity.

If Uniface detects that an entity is painted as
an up entity on a component, the Delete Up trigger is activated instead of the Delete trigger. If
the occurrence in the up entity should be deleted in the normal I/O procedure, include a
delete statement in this trigger.

**Note:**   Deleting an occurrence of an up entity can have
serious consequences for database integrity.

## Deleting all Occurrences in the Database

If it is necessary to delete all occurrences in
the database, you should use setocc"\*",-1 to retrieve all
occurrences into the component structure. The retrieve statement only builds the
hitlist, and does not actually fetch the data. Then use the erase statement to
remove the data. Simply using retrieve then erase does not
necessarily delete all the occurrences, because erase only deletes fetched
occurrences. You should only allow this if you want all your data to be deleted.

## Clearing the Message Frame

If the message level for the application is
greater than zero, the erase statement also clears the message frame. (If the
message level is 0, the message frame is never cleared.) The message level can be set with the
/pri switch or defined in the application definitions.

Because the ^ERASE function can be quite drastic, it is common to disable this trigger
completely (by omitting the `erase` statement from it), or to add the following code
to the Erase trigger:

```procscript
;trigger Erase 

if ($totocc(CUSTOMER) >= 1)
   askmess "%%$totocc(CUSTOMER) occurrences. Erase them all?"
   if ($status = 0)
      return
   endif
endif
erase
if ($status <0)
   message "Erase error; see message frame"
   rollback
else
   if ($status = 1)
      message "Erase is not allowed"
   else
      message "Erase was successful"
      commit
      if($status < 0)
         rollback
      endif
   endif
endif
```

## Related Topics

- [delete](delete.md)
- [remocc](remocc.md)
- [setocc](setocc.md)
- [store](store.md)
- [Delete](../triggersstandard/delete.md)
- [Erase](../triggersstandard/erase.md)
- [Delete Up](../triggersstandard/delete_up.md)


---

# exit

Exit the current component instance and return to the previous or specified
instance.

exit  {Expression}  {, InstanceName}

## Parameters

* Expression—expression that results in a number. Uniface evaluates
  the expression, converts it to an integer if necessary, and places the result in
  $status. The simplest form of Expression is a constant. To
  improve readability, parentheses (()) are often included as a part of
  Expression.
* InstanceName—string, or field (or indirect reference to a field),
  variable, or function that evaluates to a string containing the name of the target component
  instance. If InstanceName is longer than 32 characters, it is truncated to that
  length. Trailing blanks are removed.

  If InstanceName is present, it must be an instance in the
  component pool that the user would return to at some point if the exit statement
  had not been used. Uniface returns to the named instance; intervening instances are closed. (Any
  assignments for renaming components are not considered by exit.)

## Return Values

The result of evaluating Expression is placed in
$status. If Expression is omitted, $status
defaults to 0. In either case, $procerror is 0.

## Use

exit  {Expression}  is allowed in all components.

exit  {Expression}  {, InstanceName}  is allowed in all components except self-contained service and report
components.

## Description

The exit statement immediately exits the current component and returns
to the previous component or to the InstanceName specified. It overrides the
normal processing of events by the structure editor. Any outstanding data validation is not
performed and triggers that would otherwise be executed are not activated. In addition, the Form
Loses Focus trigger is not activated.

For example, an exit statement in the Quit trigger of a component does
not cause the Execute trigger of the component to be reactivated. If you want the Execute trigger
to be reactivated (for example, to execute any statements after the edit
statement in the Execute trigger), you should use a return statement instead of
exit.

## deleteinstance and exit

If the current component is a local component instance (started with
activate), an implicit deleteinstance is executed after the
exit to remove the instance.

If the component instance is a remote synchronous service, it is deleted on both the
server and the client. However, it is strongly recommended that you use the
return statement and have the client perform an explicit
deleteinstance, rather than to rely on the implicit behavior of
exit.

**Note:**  If the component instance is a remote *asynchronous* service, it is deleted
on the server only—the client is *not* informed of the deletion. For that reason, the
exit statement is not allowed in a remote asynchronous service. Instead, you
should perform an explicit deleteinstance on the client side.

Before the current instance exits, any child instances attached to it are removed. In each
of the attached instances that contains an operation named CLEANUP, that
operation is executed before the instance is removed. If the current instance (the one that issued
the exit statement) contains an operation named CLEANUP, that
operation is performed before the component is removed.

## Exiting to a Named Instance

Exiting to a named component instance bypasses any triggers that would ordinarily be
executed in the current instance, as well as in any intervening instances. In each instance that is
exited, if it contains an operation named CLEANUP, that operation is executed
before the instance is removed.

Exiting to a named component instance is generally used to skip quickly back to a
specific instance. Trying to exit to an instance that is not in the component pool or that is not a
parent of the current instance is a logical error in the application. In this case, the
InstanceName argument is ignored and the current instance exits normally, as if
the InstanceName argument were not present.

The following example returns to
the previous component:

```procscript
; trigger: Accept

$1 = CUSTNAME
exit (1)
```

The following example returns to the form MAINMENU, if
the user enters `Y`:

```procscript
; trigger: Quit

askmess "Return to Main Menu?"
if ($status = 1) ;if answer is "Y"
    exit (0), "MAINMENU"
else
    return (-1)
endif
```

## Related Topics

- [apexit](apexit.md)
- [break](break.md)
- [done](done.md)
- [end](end.md)
- [deleteinstance](deleteinstance.md)
- [return](return.md)
- [Component Memory Management](../../../howunifaceworks/processing/componentmemorymanagement.md)


---

# fieldsyntax

Set the syntax attributes of the specified field.

fieldsyntax  Field, AttributeList

## Parameters

* Field—literal field name or
  a string, variable, function, or parameter that evaluates to a string containing the field name
* AttributeList—string, or
  field (or indirect reference to a field), variable, or function that evaluates to an empty string
  or a comma-separated list of field syntax attributes.

## Return Values

None.

## Use

Allowed in all Uniface component types.

## Description

The fieldsyntax statement
dynamically sets the syntax attributes of Field for the currently active
occurrence.

If AttributeList contains an
empty string, the syntax of Field is reset. The structure editor function ^CLEAR
also resets the field syntax. Since the structure editor function ^RETRIEVE carries out an implicit
^CLEAR, this also resets field syntax.

## Specifying the Parameters

Field Syntax Attributes

| Code | Description |
| --- | --- |
| `NDI` | Do not display the contents of this field.  **Note:**  NDI is a static property—it can only be set before the Proc edit statement is executed. |
| `NED` | Do not allow this field to be edited. |
| `NPR` | Do not prompt this field.  Not available in the Web environment. |
| `HID` | Hide field. Do not display, edit, or prompt this field. (Equivalent to `NDI`, `NED`, and `NPR`.)  Not valid in character mode ($GUI =`$CHR` ). |
| `DIM` | Do not allow editing or prompt this field. In GUI mode, the field is dimmed; in character mode, it is equivalent to `NED` and `NPR`. |
| `YDI` | Display this field. |
| `YED` | Allow this field to be edited. |
| `YPR` | Prompt this field. |

**Note:**  The field syntax codes YDI, YED, and YPR cannot
be set declaratively. They can only be set using $fieldsyntax and
fieldsyntax.

## fieldsyntax

The following example sets the field syntax for field DISCOUNT\_2 to No Edit and No
Prompt, if the value in the field DISCOUNT\_1 is not zero:

```procscript
if (DISCOUNT_1 != 0)
   fieldsyntax DISCOUNT_2, "NED,NPR"
endif
```

## Related Topics

- [$fieldsyntax](../procfunctions/_fieldsyntax.md)
- [$fieldname](../procfunctions/_fieldname.md)
- [Field Syntax](../../../modeling/modeledproperties/field_syntax.md)


---

# fieldvideo

Set the video attributes of the specified field.

fieldvideo  Field, AttributeList

## Parameters

* Field—name of the field for
  which the video properties are set. If omitted, the current field is used.
* AttributeList—attributes to
  apply; one of:

  + `DEF`, to set the default
    video attributes for the current occurrence. (The default video attributes are determined by the
    assignment setting $DEF\_CUROCC\_VIDEO.)

    If AttributeList is
    omitted, `DEF` is assumed.
  + `NON`, to set no special
    video attributes for the current occurrence. (In character mode, this means that fields, which
    appear in inverse by default, appear in normal video; this can create a sort of highlighting
    effect.)
  + One or more video attributes, separated
    by commas (,).

## Video attributes

Video Attribute Codes

| Attribute Code | Description |
| --- | --- |
| `BLI` | Blinking |
| `BOR` | Border |
| `BRI` | Bright |
| `HLT` | Use system highlight color.  **Note:**  This attribute always takes precedence over other video attributes that may be specified. |
| `INV` | Inverse |
| `UND` | Underline |
| `COL=` *n* | Set color to color code n, the sum of the color numbers for foreground and background. |

## Return Values

None.

## Use

Allowed in form and report components.

## Description

The fieldvideo statement
dynamically sets the video attributes of Field for the current occurrence. You
can use color coding to highlight dangerous or slow choices, or to highlight fields which contain
data that requires urgent processing.

To set the video properties as data is read,
place the fieldvideo statement for the field after the read
statement in the Read trigger.

The structure editor function ^CLEAR also resets
the field video attributes. Since the structure editor function ^RETRIEVE carries out an implicit
^CLEAR, this also resets field video attributes.

**Note:**  By default, video attributes set with the Proc
instruction fieldvideo override the attributes set by
$ACTIVE\_FIELD. To have $ACTIVE\_FIELD take precedence over
$fieldvideo, set the $ACTIVE\_FIELD\_FIRST assignment setting
to `true`.

## Using fieldvideo

The following example loops through all the
occurrences to find whether the name the user entered exists. If it does not, the
fieldvideo statement is used to highlight the incorrect name. F2. E1 is a
character string field containing a name.

```procscript
; field : NAMEDUMMY.E1
;trigger Detail
if (F2.E1 != NAMEDUMMY)
   $curOcc$ = $curocc
   $name$ = NAMEDUMMY
   $counter$ = 1
   repeat
      setocc "E1",$counter$
      $counter$ = ($counter$ + 1)
   until ((F2.E1 = $name$) | ($status < 0))
   if ($status < 0)
      message "%%$name$ not available."
      setocc "E1",$curOcc$
      fieldvideo NAMEDUMMY, "BRI,UND,BLI"
      $prompt = NAMEDUMMY.E1
      return (0)
   endif
endif
$prompt = F2.E2
; end trigger
```

## Related Topics

- [$ACTIVE_FIELD_FIRST](../../../configuration/reference/assignments/_active_field_first.md)
- [curoccvideo](curoccvideo.md)
- [$fieldvideo](../procfunctions/_fieldvideo.md)
- [Video Attributes](../../../desktopapps/colorhandling/video_attributes_is.md)
- [$ACTIVE_FIELD](../../../configuration/reference/assignments/active_field.md)
- [$DEF_VIDEO](../../../configuration/reference/assignments/def_video.md)


---

# filebox

Displays a file selection box.

filebox{/save |
/dir |
/savenocheck}  {Filter  {, DefaultDirectory} }

## Switches

* /save—allows the user to
  specify the name of a new file instead of an existing file
* /dir—allows users to select
  a folder instead of a file. If the /dir switch is used, it is not possible to
  use the /save switch or to provide a filter.
* /savenocheck—if the user
  specifies an existing file to save to, the file is overwritten without warnings or prompts about
  overwriting the file.

## Parameters

* Filter—restriction criteria
  that limit the files listed to a subset of those present in the directory. The
  Filter must be valid for the platform. For example:
  `"*.json"`
* DefaultDirectory—default
  directory (which must end with a backslash) and, optionally, the default file specification that is
  valid for the platform. For example, `"c:\dirname\"` or
  `"c:\*.bat"`.

  If DefaultDirectory is
  omitted the first time filebox is called during a session, Uniface uses the
  directory in which the application was started. The next time DefaultDirectory
  is omitted, Uniface uses the directory that was selected or where the last selected file was
  located.

## Return Values

Values returned in $status

| Value | Description |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| 0 | The user did not select a file |
| 1 | The user selected a file. `$result` contains the fully qualified name of the file. |

Values commonly returned by $procerror following filebox

| Value | Error constant | Meaning |
| --- | --- | --- |
| -16 through -30 | <UNETERR\_\*> () | Errors during network I/O. |
| -406 | <UMISERR\_FILEBOX> | An error occurred during a filebox statement. |

## Use

Allowed in form components.

This statement is not supported in the Web
environment.

## Description

The filebox statement displays
a native GUI file selection box. If the application is running in character mode, a standard
Uniface file selection box is displayed. The file selection box allows the user to select an
existing file in a directory, or, if the /save option is used, to specify the
name of a new file. The user can select only one file from the file selection box.

## Filtering the Files Displayed

You can restrict the files displayed using a
Filter. For example, using the following Filter means that
only files with an .xml extension are initially displayed:

```procscript
filebox "*.xml"
```

In character mode ($GUI=$CHR),
assignments are also considered by the file selection box. For example, the following assignment
would cause the character mode file selection box to initially display all export files from the
directory d:\uniface\xml:

```procscript
*/*.xml = d:\uniface\xml\*.xml
```

The use of wildcards in Filter
is platform-dependent, though most platforms support common wildcards such as `*`
and `?`. If the native file selection box allows, the user can override the
Filter provided; this is determined by the GUI in use. If the
/save option is also used, Filter provides the default file
extension, if none is supplied by the user.

In Microsoft Windows:

* You can specify multiple file types in
  Filter by using the Uniface subfield separator GOLD ;
  (`;`) to delimit the values. For example:

  ```procscript
  filebox "*.exp;*.xml", "c:\tmp\"
  ```
* You can add a description to the filter by
  using the following syntax: Filter=Description. For
  example:

  ```procscript
  filebox "*.json=JSON Files", "D:\work\uniface\"
  ```

## Changing the Dialog Text for file/dir

By default, the dialog box displayed by
filebox/dir contains the text `Choose a folder`. You can remove
this or change this to your preferred text and language by editing the Uniface message text
`4805`.

## Setting the Default Path

If DefaultDirectory names a
directory, it must end with the path separator for the platform, for example,
"c:\tmp\" on Microsoft Windows.

If the native file selection box supports it, the
user can override the DefaultDirectory provided; this is determined by the GUI
in use.

The following example displays a file selection
box in which all files with a .xml extension are listed:

```procscript
filebox "*.xml"
```

The following example displays a file selection
box under Microsoft Windows that lists all files with a .p\* extension, where
the default directory is h:\home\uniface\prints :

```procscript
filebox "*.p*", "h:\home\uniface\prints\"
```

## Related Topics

- [filedump](filedump.md)
- [fileload](fileload.md)


---

# filecopy

Copy the specified file to the target location.

filecopy  FilePath, DirPath |
NewFilePath

## Parameters

* FilePath—file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.
* DirPath—directory name,
  optionally preceded by the path to the directory. Must end with a directory separator
* NewFilePath—new file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The filecopy statement copies
the specified file FilePath to the target location, either to
DirPath or to NewFilePath, taking any file redirections in
the assignment file into account.

If DirPath is specified (that
is, the path ends with a directory separator), the file FilePath is copied to
the directory DirPath using the same file name.

If NewFilePath is specified,
the specified file is copied to the directory name and file name supplied in
NewFilePath.

If the the specified file
FilePath is located in a zip archive, it can be copied to different directory in
the same archive, to another zip archive, or to a directory on the file system.

## Specifying Parameters

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md).

## Operation Failure

The operation fails if
FilePath:

* Is not a file
* Does not exist
* Has invalid syntax

The operation also fails if the directory part of
DirPath or NewFilePath:

* Does not already exist
* Does not permit user-writing due to
  insufficient authorization level
* Has invalid syntax

The operation also fails if the file
NewFilePath:

* Already exists
* Has invalid syntax

## Copying From and To Zip Files and Across Platforms

If the the specified file
FilePath is located in a ZIP archive, it can be copied to different directory in
the same archive, to another ZIP archive, or to a directory on the file system.

When copying files to or from zip archives, or
across operating systems or media, Uniface handles text files differently than binary files. It
copies binary files as-is, but it automatically adjusts text file attributes so that EOL characters
and optional character set conversions match the platform. This may result in changes in the file
size, making it appear that source and target files are not the same.

You can define the files to be treated as text
files, or switch off automatic cross-platform text file handling using the
$TEXT\_FILE\_EXTENSIONS assignment setting.

## iSeries

On the iSeries, the particular ‘copy’ command that
is used depends on the following circumstances:

* When both the source and the destination use
  the IFS prefix, or when both do *not* use the IFS prefix, the CPY
  command is used
* When the source has the IFS prefix, but the
  destination does not, then CPYFRMSTMF is used
* When the destination has the IFS prefix, but
  the source does not, then CPYTOSTMF is used.

## Copying a File to Another Directory

The following example copies the file
test.txt from the directory sub1dir in the current
directory to the directory sub2dir in sub1dir:

```procscript
filecopy "sub1dir\test.txt", "sub1dir\sub2dir\"
```

or

```procscript
filecopy "sub1dir/test.txt", "sub1dir/sub2dir/"
```

or

```procscript
filecopy "[.sub1dir]test.txt", "[.sub1dir.sub2dir]"
```

## Copying a File to the Same Directory Under Another Name

The following example copies the file
test1.txt to test2.txt in the same directory:

```procscript
filecopy "sub1dir\test1.txt", "sub1dir\test2.txt"
```

or

```procscript
filecopy "[.sub1dir]test1.txt", "[.sub1dir]test2.txt"
```

## Copying a File to Another Directory Under Another Name

The following example copies the file
test1.txt in the current directory to the file test2.txt
in sub3dir in the current directory:

```procscript
filecopy "test1.txt", ".\sub3dir/test2.txt"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [$TEXT_FILE_EXTENSIONS](../../../configuration/reference/assignments/_text_file_extensions.md)
- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# filedelete

Delete the specified file.

filedelete  FilePath

## Parameters

FilePath—file name, optionally
preceded by the path to the file. The file can be located in a ZIP archive. Must *not*
end with a directory separator.

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The filedelete statement
deletes the specified file, using any file redirections in the assignment file.

## Specifying Parameters

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md).

## Operation failure

The operation fails if
FilePath:

* Is not a file
* Does not exist
* Is in use (locked)
* Does not permit user-deletion due to
  insufficient authorization level
* Has invalid syntax

The following example deletes the file
test.txt in the directory sub1dir in the current
directory:

```procscript
filedelete "sub1dir\test.txt"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# filedump

Copy the contents of the source object to the specified file.

filedump
{/text {/nobom} {/append} |
/image | /raw | /web
}  Source, FileName {`,`  UnicodeFormat | CharacterSet}

## Switches

* /text—translates the raw
  data from Source to the system character set or to the
  UnicodeFormat, if specified. This is the default behavior.
* /append—appends the
  contents of Source to the specified FileName. If
  FileName does not exist, it is created. The /append switch
  cannot be used in conjunction with /image and /raw.
* /nobom—omits the Unicode
  Byte-Order-Mark (BOM) when writing Unicode (if UnicodeFormat is specified or
  $SYS\_CHARSET is set to `UTF8`).
* /image—writes the raw data
  from Source, assuming that this data is an image. An initial hash character (#)
  is removed from the data before writing. (The hash character is an indicator to show that image
  data follows.) No further conversion is performed on the data in Source.
* /raw—writes the
  raw data from Source; an initial hash character (#) is not
  removed. No further conversion is performed on the data in Source, which is
  encoded as UTF-8.
* /web—in forms running in
  the Web Application Server, copies files that were downloaded via the browser. The files are in raw
  format
  .

## Parameters

* Source—source object
  containing the contents to be copied. It can be a literal field name, or a string, a variable, or
  function.
* FileName—destination path
  and file name of the output file, which can include a ZIP archive. The total length of the path and
  file name cannot exceed 255 bytes, and the name must *not* end with a directory
  separator.
* UnicodeFormat—Unicode
  encoding format of the input file. It can be a string, or a field (or indirect reference to a
  field), a variable, or a function that evaluates to a string. Valid values are:
  `UTF-8`, `UTF-16`, `UTF-16BE`,
  `UTF-16LE`, `UTF-32`, `UTF-32BE` and
  `UTF-32LE`. If not specified, the system character set is used.
* CharacterSet—character set;
  overrides the character set specified by $SYS\_CHARSET.

  If the data is save to an XML file, the
  character set is mapped to an IANA-approved name that matches the character set. For example, if
  `CP1252` or `LATIN1` is specified, `ISO-8859-1` is used
  for character set encoding. See
  [XML Encoding to Character Set Mappings](#section_906A110CB723438B80B5C5CE2CB5E989).

## Return Values

Values returned by
filedump and lfiledump in $status

| Value | Meaning |
| --- | --- |
| >=0 | The number of bytes from Source written to FileName. |
| -1 | An I/O error occurred while writing FileName. |
| -4 | Cannot open FileName. |
| -13 | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |
| -16 | Network error: unknown. |
| -17 | Network error: pipe broken. |
| -18 | Network error: failed to start new server. |
| -19 | Network error: fatal. |

Values commonly returned by $procerror following
filedump and lfiledump

| Value | Error constant | Meaning |
| --- | --- | --- |
| `-4` | `<UIOSERR_OPEN_FAILURE>` | The table or file could not be opened. The entity is not painted or the corresponding table or file does not exist in the database. |
| `-12` | `<UIOSERR_FILE_READ_WRITE>` | An error occurred while trying to read or write to the file. |
| `-13` | `<UIOSERR_OS_COMMAND>` | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |
| `-16` through `-30` | `<UNETERR_*>` | Errors during network I/O. |

## Use

Allowed in all Uniface component types.

## Description

The filedump statement copies
the contents of Source to FileName. Assignments are
considered when locating FileName.

The file FileName is created
if it does not already exist. If FileName is an existing file, its contents will
be overwritten, unless you specify the /append option.

The statement fails if
FileName is in use (locked), has an invalid syntax, or the user does not have
authorization to write files.

If the output file or location does not contain
enough space to write the entire contents of the Source, the data is truncated
and `-12``<UIOSERR_FILE_READ_WRITE>` is returned in
$procerror.

## Specifying the File Name

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md).

## Writing Unicode

Used without the /image or
/raw switch, the data is converted and stored to the UTF8 character set, or with
the UnicodeFormat (if specified).

If a Unicode format is specified, either by the
UnicodeFormat parameter or the $SYS\_CHARSET assignment, a
Unicode Byte-Order-Mark (BOM) is written. This is a special character to recognize the encoding.

However, the BOM can cause problems with some
standards and applications. For example, the Unicode type for JSON data must be deduced from the
first characters of the JSON text itself, rather than the BOM. In such cases, you can prevent the
BOM from being written by using the /nobom qualifier.

**Note:**  You can change the application behavior so that
the BOM is never written, even if /nobom is omitted. To do so, use the
$NO\_BOM\_UTF8 assignment setting.

## Writing XML

If the first line of data contains an XML
declaration, the `encoding` attribute is added (if not already present) to specify
the character set to use in the XML string. The value of the XML encoding attribute is derived from
the UnicodeFormat or CharacterSet specified in the statement,
or otherwise from the $SYS\_CHARSET.

For example:

* If
  `$SYS_CHARSET=CP1252` and no CharacterSet is
  specified, `<?xml version="1.0">` is copied as:

  ```procscript
  <?xml version="1.0" encoding="ISO-8859-1"?>
  ```
* If
  `$SYS_CHARSET=SJIS` and no CharacterSet is
  specified, `<?xml version="1.0">` is copied as:

  ```procscript
  <?xml version="1.0" encoding="Shift_JIS"?>
  ```
* If
  `$SYS_CHARSET=CP1252` and CharacterSet is
  specified as `"CP1252"`, `<?xml version="1.0">` is copied
  as:

  ```procscript
  <?xml version="1.0" encoding="ISO-8859-1"?>
  ```

  Even though CharacterSet
  has been explicitly set, CP1252 is not an accepted name for an XML encoding, so it has been
  converted to an equivalent ISO encoding.

There are some differences between the character
sets and the encoding formats, especially between Windows code page 1252 and ISO-8859-1. For this
reason, It is best practice to specify the encoding yourself, either by including the encoding
attribute in the data, or by specifying the CharacterSet attribute.

To ensure that a Windows code page encoding is
used, you must use the format `windows-nnnn`,
wherennnn is the code page number.

For example, if $SYS\_CHARSET is
`CP1252` and you want the XML to use this character set, specify
CharacterSet as `windows-1252`:

```procscript
filedump XMLDATA, "filename.xml", "windows-1252"
```

Alternatively, ensure that the first line of the
XML has this attribute set:

```procscript
<?xml version="1.0" encoding="windows-1252"?>
```

## XML Encoding to Character Set Mappings

If $SYS\_CHARSET or
CharSet is set to a value in the Character Set column,
filedump will use the corresponding XML encoding.

XML Encoding to Character Set Mappings

| XML Encoding | Character Set | Description |
| --- | --- | --- |
| `UTF-8` | `UTF8` | Unicode |
| `ISO-8859-1` | `CP1252`  `LATIN1` | Western Europe |
| `ISO-8859-2` | `CP1250`  `LATIN2` | Czech; Eastern Europe |
| `ISO-8859-5` | `CP1251`  `LATIN5` | Russian; Cyrillic |
| `ISO-8859-6` | `CP1256`  `LATIN6` | Arabic |
| `ISO-8859-7` | `CP1253`  `LATIN7` | Greek |
| `ISO-8859-8` | `CP1255`  `LATIN8` | Hebrew |
| `ISO-8859-9` | `CP1254` | Turkish; ISO-8859-9 |
| `ISO-8859-15` | `LATIN9` | Western Europe, including Euro sign |
| `EUC-JP` | `EUC`  `EUC_JP` | Japanese; Kanji; Hankaku |
| `ISO-2022-JP` | `JIS` | Japanese; Kanji; Hankaku |
| `GB2312` | `GB`  `GB2312` | Chinese Simplified |
| `EUC-CN` | `EUC_CN` |  |
| `Big5` | `Big5` | Traditional Chinese |
| `EUC-TW` | `EUC_TW` | Traditional Chinese |
| `KSC_5601` | `KSC`  `KSC5601` | Korean; Hangul; Hanja |
| `EUC-KR` | `EUC_KR` | Korean; Hangul; Hanja |
| `windows-1250` |  | Czech; Eastern Europe |
| `windows-1251` |  | Russian; Cyrillic |
| `windows-1252` |  | English and Western Europe (default) |
| `windows-1253` |  | Greek |
| `windows-1255` |  | Hebrew |
| `windows-1256` |  | Arabic |

## Appending Data to a File 1

After the following code has been executed, the
file MYFILE contains the string `"Crew, JimNAME"`

```procscript
NAME = "Crew, Jim"
filedump NAME, "MYFILE"
filedump/append "NAME","MYFILE"
```

## Appending Data to a File 2

To cause data to appear on separate lines in the
output file, use `filedump` (with append) `"%%^"`, as follows:

```procscript
filedump NAME, "MYFILE"
filedump/append "%%^", "MYFILE"
filedump/append "NAME", "MYFILE"
```

The result of this code is:

```procscript
Crew, Jim
NAME
```

## Saving a Downloaded File

The following example dumps a file that was
downloaded via a Web browser:

```procscript
filedump/web UPLOADNAME.ENTITY.MODEL,"downloads/file1"
```

## Saving Data to Unix File

In the following example, a Unix file is the
destination for the data written by the `filedump` statement:

```procscript
; trigger: Detail

filedump TEXTFIELD,"/home/jimc/textfiles/TEXT.EXT"
message "%%$status%%% bytes of TEXTFIELD copied to TEXT.EXT file."
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support  Added optional parameter UnicodeFormat |
| 9.6.04 | Added /nobom switch |

## Related Topics

- [lfiledump](lfiledump.md)
- [$NO_BOM_UTF8](../../../configuration/reference/assignments/_no_bom_utf8.md)
- [$SYS_CHARSET](../../../configuration/reference/assignments/sys_charset.md)
- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# fileload

Copy the contents of the specified file into the specified field or variable.

fileload
{`/text` | `/image` | `/raw` | `/web`
}  FilePath, Target
{`,` UnicodeFormat | CharSet}

## Switches

* `/text`—translates the raw data
  from FilePath to the system character set or the
  UnicodeFormat. This is the default behavior.
* `/image`—reads the raw data
  from FilePath, assuming that this data is an image. An initial hash character
  (#) is added to the data before copying the data to Target. (The hash character
  is an indicator to show that image data follows.) No further conversion is performed on the data.
* `/raw`—behaves similarly to the
  `/image` switch, except that the data in FilePath is assumed not
  to be an image; an initial hash character (#) is not added. No further conversion is performed on
  the data.
* `/web`—when used in forms
  running in the Web Application Server, it loads files that were uploaded via the browser. The files are in raw format.

## Parameters

* FilePath—name and path of
  the file contents to be copied. It can be a string, or a field (or indirect reference to a field),
  a variable, or a function that evaluates to a string. The total length of the path and file name
  may not exceed 255 bytes. The file can be located in a zip archive. Assignments are considered when
  locating FileName.
* Target—name of a field, a
  variable, or a parameter to receive the data.
* UnicodeFormat—Unicode
  encoding format of the input file. It can be a string, or a field (or indirect reference to a
  field), a variable, or a function that evaluates to a string. Valid values are:
  `UTF-8`, `UTF-16`, `UTF-16BE`,
  `UTF-16LE`, `UTF-32`, `UTF-32BE` and
  `UTF-32LE`. If not specified, the system character set is used.
* CharSet—character set;
  overrides the value of the system character set ($SYS\_CHARSET). For a list of
  suppported character sets, see
  [$SYS\_CHARSET](../../../configuration/reference/assignments/sys_charset.md).

## Return Values

Values returned by fileload in $status

| Value | Meaning |
| --- | --- |
| >=0 | The number of bytes in Target. |
| -1 | An I/O error occurred while reading FileName. |
| -4 | Cannot open FileName. |
| -16 | Network error: unknown. |
| -17 | Network error: pipe broken. |
| -18 | Network error: failed to start new server. |
| -19 | Network error: fatal. |

Values commonly returned by $procerror following fileload

| Value | Error constant | Meaning |
| --- | --- | --- |
| -4 | <UIOSERR\_OPEN\_FAILURE> | The table or file could not be opened. The entity is not painted or the corresponding table or file does not exist in the database. |
| -12 | <UIOSERR\_FILE\_READ\_WRITE> | An error occurred while trying to read or write to the file. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| -1113 | <UPROCERR\_PARAMETER> | Parameter name not valid or not defined. |
| -1114 | <UPROCERR\_LOCAL\_VARIABLE> | Local variable name not valid or not defined. |
| -1115 | <UPROCERR\_COMPONENT\_VARIABLE> | Component variable name not valid or not found. |
| -1116 | <UPROCERR\_GENERAL\_VARIABLE> | General variable not valid. |
| -1117 | <UPROCERR\_GLOBAL\_VARIABLE> | Global variable name not valid or not found. |

## Use

Allowed in all Uniface component types.

## Description

The fileload statement copies
the contents of FileName to Target. Unlike
lfileload, it uses the locations specified in the assignment file to locate
files.

Used without the `/image` or
`/raw` switch, fileload converts the data to be stored from the
character set specified by the assignment setting $SYS\_CHARSET or with the
UnicodeFormat, if specified.

To strip the end-of-line character from an
otherwise empty input file, so the resulting data is truly empty, use the assignment setting
$FILELOAD\_SINGLE\_LINE.

## Unicode Byte-Order-Mark (BOM)

fileload checks for a Unicode
Byte-Order-Mark (BOM), a special character to recognize the encoding. If no BOM is available, the
indicated character set is used:

Character
Set Used if Unicode BOM Not Available

| Character Set Specified by UnicodeFormat | Character Set Used |
| --- | --- |
| UnicodeFormat is not specified | Character set specified by the $SYS\_CHARSET assignment setting |
| `UTF-8` | `UTF-8` |
| `UTF-16` or `UTF-32` | Big-Endian character set; either `UTF-16BE` or `UTF-32BE`, according to Unicode specification |

If the UnicodeFormat is
specified as `UTF-16BE`, `UTF-16LE`, `UTF-32BE` or
`UTF-32LE`, fileload does not check the Unicode BOM because the
character set is explicitly provided.

## Loading XML Files

If the first line of the source file contains an
XML declaration, the `encoding` attribute and value are removed and the XML data is
converted to UTF-8. For example, an XML file has the following:

```procscript
<?xml version="1.0" encoding="ISO-8859-1"?>
```

The fileload statement converts
the XML data from ISO-8859-1 to UTF-8, and in the target the XML declaration becomes:

```procscript
<?xml version="1.0" ?>
```

## Specifying the File Name

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md)..

The operation fails if
FilePath:

* Does not exist
* Does not permit user-reading due to
  insufficient authorization level
* Has invalid syntax

## Uploading Files to a Static Server Page

When you create a server page to select files to
be uploaded, you use the following Proc syntax for fileload:

```procscript
fileload /web FileName, Target
```

In addition, you must also modify the server page
to include the attribute `enctype` within the FORM tag, as follows:

```procscript
<FORM method="POST" action="" onSubmit="return uSubmit(this)" enctype="multipart/form-data">
```

The addition of
`enctype="multipart/form-data"` instructs the browser to send not only the file
name, but also the contents of the selected file.

## Loading a Unix File

```procscript
trigger _detail
fileload "/home/central_park/textfiles/text.txt", TEXTFIELD
message "%%$status%%% bytes of text loaded into TEXTFIELD field."
end ; trigger end
```

## Loading an Image File

The following example loads a bitmap for a
national flag based on the current value of `$language` :

```procscript
fileload/image "flags\%%$language%%%.bmp",FLAGFIELD
```

## fileload/web

The following example downloads a file from a Web
page and stores it to a file system:

```procscript
fileload/web "UPLOADNAME.ENTITY.MODEL",$1
filedump/raw $1,"downloads/file1"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support  Added optional parameter UnicodeFormat |

## Related Topics

- [$FILELOAD_SINGLE_LINE](../../../configuration/reference/assignments/_fileload_single_line.md)
- [lfileload](lfileload.md)
- [filedump](filedump.md)
- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)
- [$SYS_CHARSET](../../../configuration/reference/assignments/sys_charset.md)


---

# filemove

Move the specified file to the target location.

filemove  FilePath, DirPath |
NewFilePath

## Parameters

* FilePath—file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.
* DirPath—directory name,
  optionally preceded by the path to the directory. Must end with a directory separator.
* NewFilePath—new file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The filemove statement moves
the specified file FilePath to the target location, using any file redirections
in the assignment file. You can move the file by specifying DirPath, or move and
rename the file by specifying NewFilePath. The file to be moved can be located
within a zip archive and moved to a different directory in the same archive, to a different zip
archive, or to a local directory.

To rename a file without moving it, use
filerename.

## Specifying File and Directory Names

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md).

## Operation Failure

The operation fails if
FilePath:

* Is not a file
* Does not exist
* Is in use (locked)
* Does not permit user-deletion (after move) due
  to insufficient authorization level
* Has invalid syntax

The operation also fails if the directory part of
DirPath or NewFilePath:

* Does not exist
* Does not permit user-writing due to
  insufficient authorization level
* Has invalid syntax

The operation also fails if the file
NewFilePath:

* Already exists
* Has invalid syntax

## Moving From and To Zip Files and Across Platforms

If the the specified file
FilePath is located in a ZIP archive, it can be moved to different directory in
the same archive, to another ZIP archive, or to a directory on the file system.

When moving files to or from zip archives, or
across operating systems or media, Uniface handles text files differently than binary files. It
copies binary files as-is, but it automatically adjusts text file attributes so that EOL characters
and optional character set conversions match the platform. This may result in changes in the file
size, making it appear that source and target files are not the same.

You can define the files to be treated as text
files, or switch off automatic cross-platform text file handling using the
$TEXT\_FILE\_EXTENSIONS
assignment setting.

## iSeries

On the iSeries, the particular ‘move’ command that
is used depends on the following circumstances:

* When both the source and the destination use
  the IFS prefix, or when both do *not* use the IFS prefix, the MOVE
  command is used
* When the source has the IFS prefix, but the
  destination does not, then CPYFRMSTMF is used. If the copy finishes
  successfully, the source file is deleted; if the delete fails (for example, due to lack of
  authorization), the copy is undone, and $procerror -13 is returned. The file
  (indicated by its extension), into which the member is to be moved, must already exist;
  filemove does not implicitly create files.
* When the destination has the IFS prefix, but
  the source does not, then CPYTOSTMF is used.

## Moving a File to Another Directory

The following example moves the file
test.txt, from the directory sub1dir in the current
directory, to the directory sub2dir in sub1dir:

```procscript
filemove "sub1dir\test.txt", "sub1dir\sub2dir\"
```

or

```procscript
filemove "[.sub1dir]test.txt", "[.sub1dir.sub2dir]"
```

Note that it is the presence of the directory
separator at the end of the second argument that determines that this is only a move to another
directory, *not* a move combined with a file rename.

## Moving and Renaming a File

The following example moves the file
test1.txt from the current directory to the directory
sub2dir, renaming the file to text.txt:

```procscript
filemove ".\test1.txt", ".\sub2dir\text.txt"
```

Note that it is the absence of a directory
separator at the end of the second argument that determines that this is a move to another
directory, *combined* with a file rename.

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [filerename](filerename.md)
- [$TEXT_FILE_EXTENSIONS](../../../configuration/reference/assignments/_text_file_extensions.md)
- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# filerename

Rename the specified file within the same directory.

filerename  FilePath, NewFilePath

## Parameters

* FilePath—file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.
* NewFilePath—new file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The filerename statement
renames FilePath to NewFilePath within the same directory,
using any file redirections in the assignment file. The file can be renamed in a ZIP archive.

## Specifying File Names

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md).

## Operation Failure

The operation filerename fails
if FilePath:

* Is not a file
* Does not exist
* Is in use (locked)
* Does not permit user-renaming due to
  insufficient authorization level
* Has invalid syntax (for example, if it ends
  with a directory separator)

The operation also fails if the file
NewFilePath:

* Already exists
* Has invalid syntax (for example, if it ends
  with a directory separator)

## iSeries

On the iSeries, when you attempt to rename a file
(that does not reside in the IFS) such that its extension is changed, this implies a move of a
member to a different file. For example, the command filerename lib/aaa.ext1,
bbb.ext2 will move member aaa from file ext1 to
file ext2 and rename the member to bbb. This works only
if file ext2 already exists and the process has appropriate access rights,
because the statement filerename does not implicitly create files.

## Renaming a File in the Same Directory

The following example renames the file
test.txt in the directory sub1dir in the current
directory to tested.txt:

```procscript
filerename "sub1dir/test.txt", "tested.txt"
```

or:

```procscript
filerename "[.sub1dir]test.txt;5", "tested.txt"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# findkey

Check if the key value of an entity exists.

findkey  {Entity, KeyNumber}

## Parameters

* Entity—entity where the key
  is to be located. Can be a string, or a field, variable, function, or parameter that evaluates to a
  string containing the entity name.
* KeyNumber—value that
  identifies the key to be located. It can be a constant, or a field (or indirect reference to a
  field), a variable, or a function that can be converted to a whole (integer) number; the value will
  be truncated to form an integer.

  + 1, the primary key.
  + 2, 3, 4, and so on, the number that
    identifies a candidate key; indexes are not allowed.

## Return Values

Values returned in $status

| Value | Description |
| --- | --- |
| -1 | An error occurred. $procerror contains the exact error. |
| 0 | Primary or candidate key, KeyNumber, of Entity does not exist. |
| 1 | Primary or candidate key, KeyNumber, of Entity already exists in the component. `$result` contains the occurrence number. |
| 2 | Primary or candidate key, KeyNumber, of Entity already exists in the database. |

Values commonly returned by $procerror following findkey

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> () | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> () | Errors during network I/O. |
| -1128 | <UPROCERR\_NOT\_A\_KEY> | The key number specified is an index. |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1104 | <UPROCERR\_KEY> | The key number provided is not valid; for example, the key number was out of range. |

## Use

Allowed in all Uniface component types.

## Description

The findkey statement checks
whether the values of the fields that make up the specified KeyNumber in
Entity exist, either in the component or in the database. No validation is
performed; only a check for the existence of the key.

Unlike the retrieve/o
statement, which provides additional functionality such as repositioning and recovering removed
occurrences, findkey only checks for the existence of a key.

The findkey statement is
especially useful in the Validate Key trigger, while retrieve/o should be used
in the Leave Modified Key trigger. The findkey statement checks for existence of
a specified key, referred to by its key number, while retrieve/o looks for the
‘first’ complete key, using the order in which the keys are defined. This means that
retrieve/o only works for candidate keys if the primary key data is not
available.

If the arguments are omitted,
findkey looks for the primary key of the current entity. This is equivalent to
the following statement:

```procscript
findkey $entname, 1
```

The following example uses the `findkey` statement:

```procscript
findkey $entname, $NEWKEYVALUE$
```

## Related Topics

- [$curkey](../procfunctions/_curkey.md)
- [$keytype](../procfunctions/_keytype.md)
- [$totkeys](../procfunctions/_totkeys.md)
- [validatekey](validatekey.md)
- [retrieve/o](retrieveo.md)
- [Validate Key](../triggersstandard/validatekey.md)


---

# flush

Complete a file management transaction for the specified open zip archive or XML file,
then close the file.

flush `"`ZipArchive`:"` |
`"`XmlFile`"`

## Parameters

* ZipArchive—zip file name,
  optionally preceded by the path to the file
* XmlFile—XML file accessed
  by $ude ("export") or $ude ("copy") with the
  `keepopen` option.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md)..

## Use

Allowed in all Uniface component types.

## Description

When accessing files and directories located in
zip archives, Uniface keeps file open to avoid the performance problems entailed by repeatedly
opening and closing files. For the same reason, you can specify the `keepopen`
option when repeatedly using $ude ("export") or $ude ("copy")
to export or copy files.

The flush Proc statement
explicitly completes an open transaction for a specified zip archive or XML file and closes the
file, taking any assignment file redirections into account. If no absolute path is specified, the
location of the zip archive is determined by the assignment file. If it is not defined there, it
defaults to the Uniface project directory.

## Flushing Zip Files

The following example writes data to the
def.txt file located in the dir1 directory within the
b5.zip archive, then saves and close the file using flush.
Unless the location of the zip archive is specified in the assignment file, the zip file is written
to the Uniface project directory.

```procscript
filedump "abc", "C:\Uniface\Uniface96_Data\project\b5.zip:dir1\def.txt"
flush "C:\Uniface\Uniface96_Data\project\b5.zip:"
```

## Flushing Export Files

In the following example, all models and
components are exported, and flush is used to close complete the transaction:

```procscript
vOut = $ude("export", "model", "*", "myexport.xml", "keepopen=true")
vOut = $ude("export", "component", "*", "myexport.xml", "keepopen=true;append=true")
flush "myexport.xml"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [lflush](lflush.md)
- [Zip Files](../../../developmentadmin/dataexchange/concepts/zipfilesupport.md)
- [$ude export](../procfunctions/_ude_export.md)
- [$ude copy](../procfunctions/_ude_copy.md)


---

# for

Define a counter-based processing loop.

for  Counter
= StartValue `to` EndValue
{`step` StepValue}

Your Proc Code

endfor

## Parameters

* Counter—current value of
  the counter
* StartValue—initial value of
  the counter
* EndValue—end value of the
  counter
* StepValue—step size by
  which the counter is incremented (or decremented); if not specified, the default value is
  `1`.

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

The for statement defines a
counter-based processing loop, which initializes Counter with the
StartValue and repeatedly executes the code in the block until one of the
following conditions is met:

* StepValue`>=
  0` and Counter`>`EndValue
* StepValue`<
  0` and Counter`<`EndValue
* A break statement is
  encountered

After the loop completes (after the
endfor statement), the Counter holds the value it had when
the loop ended.

The Counter,
EndValue and StepValue can be altered by the code in the
loop, which enables you to conditionally make changes in the loop as it executes.

**Note:**  If the EndValue is not
specified, the loop runs forever, so it must be broken by a break.

In the following example, the counter
(`vCounter`) is decreased by 2 each time the for loop is
executed. A break statement stops the loop after it has executed 6 times.

```procscript
variables
   numeric vCounter
   numeric vLoops
endvariables

vLoops = 0
for vCounter = 100 to 0 step -2
	vLoops += 1	
    putmess "Counter: %%vCounter, Loop count: %%vLoops "
    if (vLoops >= 6) 
	   putmess "Loop processing stopped" 
       break
    endif
endfor
```

The resulting output looks like this:

```procscript
Counter: 100, Loop count: 1
Counter: 98, Loop count: 2
Counter: 96, Loop count: 3
Counter: 94, Loop count: 4
Counter: 92, Loop count: 5
Counter: 90, Loop count: 6
Loop processing stopped
```

## Calculating Values

The following code in the ORDER entity loops
through all the ORDERLINE occurrences of an ORDER, to calculate the TOTAL value.

```procscript
;Pre Save Occurrence trigger
TOTAL.ORDER = 0 ;initialize field value
forentity "ORDERLINE" ;loop through each ORDERLINE entity
  LINE_TOTAL.ORDERLINE = UNIT_PRICE.ORDERLINE * QUANTITY.ORDERLINE ;calculate the LINE_TOTAL
  TOTAL.ORDER += LINE_TOTAL.ORDERLINE ;calculate the TOTAL
endfor
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [forentity](forentity.md)
- [forlist](forlist.md)
- [forlist /id](forlist_id.md)


---

# forentity

Defines a loop that processes all the occurrences of an entity.

forentity  EntityName

Your Proc Code

endfor

## Parameters

EntityName—entity name; can be
a string, or a field, variable, function, or parameter that evaluates to a string.

## Return Values

Values Commonly Returned by $procerror after
forentity

| Value | Error constant | Meaning |
| --- | --- | --- |
| `-1102` | UPROCERR\_ENTITY | EntityName is not a valid name or the entity is not in the component structure |

## Use

Allowed in all Uniface component types.

## Description

The forentity statement starts
a loop that processes each occurrence of the specified entity. The loop executes the code in the
block until one of the following conditions is met:

* There are no more occurrences to process
  ($curocc is larger than the last occurrence).
* There are no occurrences of the entity
  ($empty is true)
* A break statement is
  encountered

The forentity statement
processes each occurrence in the hitlist, so the value of $curocc is changed
with each iteration. After the forentity loop completes,
$curocc is set to the last occurrence processed.

## Processing the Hitlist

Statements that also set the value of
$curocc, such as remocc and discard, may
cause forentity to skip processing of some occurrences.

For example, the intent of the following code is
to delete every occurrence of an entity. However, every second occurrence is skipped, because both
remocc and endfor increase the $curocc
value by 1:

```procscript
; Detail trigger of field DELETE
forentity "ENTITY1"
  remocc  
endfor
```

**Note:**  For this reason, it is recommended that you
avoid using remocc and discard in
forentity blocks.

## Finding an Occurrence with a Specified Field Value

In the following example, the
forentity loop processes an the entity PERSON.ORG. Processing stops if the value
of the FULLNAME field of the current occurrence is `"Donald Duck"`.

```procscript
variables
   numeric vLoops
   string vFullName
endvariables

retrieve/e "PERSON.ORG"
vLoops = 0

forentity "PERSON.ORG" 
	vLoops += 1	
    vFullName = FULLNAME.PERSON.ORG
    if (vFullName = "Donald Duck")
       putmess "Loop processing stopped on Name: %%vFullName Loop count: %%vLoops"
       break
    endif
    putmess "Processing  %%vFullName,  Loop count: %%vLoops "
endfor
```

The resulting output looks like this:

```procscript
Processing  Bruce Banner,  Loop count: 1
Processing  Lois Lane,  Loop count: 2
Processing  Bruce Wayne,  Loop count: 3
Processing  Clark Kent, count: 4
Loop processing stopped on Name: Donald Duck, Loop count: 5
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [for](for.md)
- [forlist](forlist.md)
- [forlist /id](forlist_id.md)


---

# forlist

Defines a loop that processes all items in an indexed list.

forlist  Item
{`,` Index} `in` SourceList

Your Proc Code

endfor

## Parameters

* Item—current list item
* Index—current item number
  in the list
* SourceList—variable or
  field containing the GOLD-separated list to be processed

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

The forlist statement starts a
loop that processes each item in a list. Each time the loop reaches the endfor
statement, the current item number (and Index, if defined) are incremented. The
loop executes the code in the block until one of the following conditions is met:

* item number `>` last item
  number
* Index`>`
  last item number
* A break statement is
  encountered

After the loop completes (after the
endfor statement), the Index has the value the last item
number + 1, or the last item reached before a break statement was
encountered.

The Index can be altered by the
code in the loop, which enables you to conditionally make changes in the loop as it executes.

The following example processes a list of strings
until it finds `"Pompey"`

```procscript
variables
   string vList
   string vItem
   numeric vIndex
endvariables

vList = "Athens;Rome;Syracuse;Pompey;Sparta"

forlist vItem, vIndex in vList 
    if (vItem = "Pompey")
       putmess "Loop processing stopped on Item number: %%vIndex, Value: %%vItem"
       break
    endif
    putmess "Processing Item number: %%vIndex, Value: %%vItem"
endfor
```

The resulting output looks like this:

```procscript
Processing Item number: 1, Value: Athens
Processing Item number: 2, Value: Rome
Processing Item number: 3, Value: Syracuse
Loop processing stopped on Item number: 4, Value: Pompey
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [for](for.md)
- [forentity](forentity.md)
- [List Handling in Proc](../../lists/listhandling.md)
- [Indexed Lists](../../lists/indexedlists.md)
- [forlist /id](forlist_id.md)


---

# forlist /id

Defines a loop that processes all items in an associative list of paired
items.

forlist`/id`  ItemId`,` ItemValue {`,` Index}  `in` SourceList

Your Proc Code

endfor

## Parameters

* ItemId—ID
  ($idpart) of the list item
* ItemValue—value
  ($valuepart) of the list item
* Index—item number
  ($itemnr); optional
* SourceList—GOLD-separated
  list to be processed

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

The forlist`/id`
statement starts a loop that processes each item in an associative list of
id=value pairs. If the SourceList is an
indexed list (with no id=value pairs), the
ItemId and ItemValue will hold the same value. If the
Index is specified, it is also loaded.

The loop executes the code in the block until one
of the following conditions is met:

* All items in the list have been processes
* Index`>`
  last item number
* A break statement is
  encountered

After the loop completes (after the
endfor statement), the Index has the value the last item
number + 1, or the last item reached before a break statement was
encountered.

The Index can be altered by the
code in the loop, which enables you to conditionally make changes in the loop as it executes.

The following example processes a list of strings
until it finds `"P"` in the id part.

```procscript
variables
   string vList
   string vItemId
   string vItemValue
   string vIndex
endvariables

vList = "A=Athens;R=Rome;Sy=Syracuse;P=Pompey;Sp=Sparta"

forlist/id vItemId, vItemValue, vIndex in vList 
    if (vItemId = "P")
       putmess "Loop processing stopped on Item number: %%vIndex, Id: %%vItemId, Value: %%vItemValue"
       break
    endif
    putmess "Processing Item number: %%vIndex, Id: %%vItemId, Value: %%vItemValue"
endfor
```

The resulting output looks like this:

```procscript
Processing Item number: 1, Id: A, Value: Athens
Processing Item number: 2, Id: R, Value: Rome
Processing Item number: 3, Id: Sy, Value: Syracuse
Loop processing stopped on Item number: 4, Id: P, Value: Pompey
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [forlist](forlist.md)
- [for](for.md)
- [forentity](forentity.md)
- [List Handling in Proc](../../lists/listhandling.md)
- [Associative Lists](../../lists/associativelists.md)


---

# getitem

Copy an item from a list to a field or variable.

getitem  Target, List, N

getitem/id  {/case}  
Target, List, Index

## Switches

* /id—get the item specified
  by Index from an associative list.
* /case—both the value and
  the case of Index must match the item in the list

## Parameters

* Target—destination of the
  copied item; can be a field, indirect reference to a field, variable, or an assignable function
  that can accept a string value.
* List—source list of the
  item to be copied; can be string, or field (or indirect reference to a field), variable, or a
  function that evaluates to a string.
* N—number of the item in the
  list. (Items are numbered starting with 1.) It can be a constant, or a field (or indirect reference
  to a field), variable, or function that can be converted to a whole (integer) number; the value
  will be truncated to form an integer.
* Index—item in an
  associative list; can be a string, or a field (or indirect reference to a field), variable, or
  function that evaluates to a string; it may not be an expression.

## Return Values

Values returned in $status

| Value | Description |
| --- | --- |
| 0 | No item was copied; Target is empty. |
| >0 | Sequence number of the list item that was copied. |

## Use

Allowed in all Uniface component types.

## Description

The getitem statement copies
an item from List to Target.

If List contains an
associative list, and you don't use the /id switch, the item that is copied is
the entire ValRep for the associative item. If N is -1, the last item from
List is copied. Otherwise, if N does not refer to an existing
item, no item is copied.

## Associative Lists

Use the /id switch to get from
an associative list the representation of the item whose value is Index.

By default, matching Index
with item values is not case-sensitive. For example, the following statement gets from $LIST$ the
first item encountered whose value is ab, Ab,
aB, or AB:

```procscript
getitem/id $2, $LIST$, "ab"
```

Use the /case switch with
/id to cause matching to be case-sensitive. For example, the following statement
only gets an item whose value is ab:

```procscript
getitem/id/case $2, $LIST$, "ab"
```

In the examples, an underlined semicolon ( `;` ) represents
the Uniface subfield separator (by default, GOLD ;) and an underlined exclamation point
( `!` ) represents the retrieve profile character for logical NOT
(GOLD !).

## Copying an Indexed List Item to a Variable

The following example copies the third item from
an indexed list to the variable $1:

```procscript
$valrep(DBMSFLD) = "rms;ora;syb;rdb"   ;"syb" copied to $1
getitem $1, $valrep(DBMSFLD), 3
```

The same item could also be copied by treating
the list as an associative list:

```procscript
$valrep(DBMSFLD) = "rms;ora;syb;rdb"
getitem/id $1, $valrep(DBMSFLD), "syb"   ;"syb" copied to $1
```

## Copying an Associative List Item to a Variable

The following example looks in an associative
list to find an item whose value is 'tue' and copies the corresponding representation to the
variable $1:

```procscript
$valrep(DATEFLD) = %\
"mon=monday;tue=tuesday;wed=wednesday;weekend=sat!;sun"
getitem/id $1, $valrep(DATEFLD), "TUE"    ;"tuesday" copied to $1
```

## Treating an Associative List as an Indexed List

The following example treats the associative list
as an indexed list and copies the entire third ValRep from the list to the variable $2:

```procscript
$valrep(DATEFLD) = %\
"mon=monday;tue=tuesday;wed=wednesday;weekend=sat!;sun"
getitem $2, $valrep(DATEFLD), 3   ;"wed=wednesday" copied to $2
```

## Finding Items in Associative Lists

The following example looks in an associative
list to find the item whose value is `weekend` and copies the representation of that
item to the variable $3. Finally, assuming that $3 now contains a list, it copies the first item in
that list to $4.

```procscript
$valrep(DATEFLD) = %\
"mon=monday;tue=tuesday;wed=wednesday;weekend=sat!;sun"
getitem/id $3, $valrep(DATEFLD), "weekend"   ;"sat;sun" copied to $3
getitem $4, $3, 1   ;"sat" copied to $4
```

## Related Topics

- [$fieldproperties](../procfunctions/_fieldproperties.md)
- [$fieldvalrep](../procfunctions/_fieldvalrep.md)
- [$properties](../procfunctions/_properties.md)
- [$valrep](../procfunctions/_valrep.md)
- [List Handling in Proc](../../lists/listhandling.md)
- [$idpart](../procfunctions/idpart.md)
- [$valuepart](../procfunctions/valuepart.md)


---

# getlistitems

Copy items from a list into a field or variable.

Fill one field in successive occurrences from
list items:

getlistitems  List, Field

Fill one or two fields in successive occurrences
from list items:

getlistitems/id  List,  {TargetValue}, TargetRepresentation

getlistitems/id  List, TargetValue

Fill fields of current occurrence from list
items:

getlistitems/occ{/init}  
List, Entity

Fill targets from representation part of list
items:

getlistitems/id{/field | /component |
/global}  List

## Switches

* /id—copies items from an
  associative list into one or two fields in successive occurrences
* /occ—copies the
  representation of items in an associative list into the field
* /init—sets the value of the
  target field in a non-database occurrence without locking the occurrence or changing the status of
  $fieldmod, $occmod, $occdbmod,
  $formmod, $instancemod, or
  $instancedbmod.
* /field—copies the
  representation of items in an associative list to a field
* /component—copies the
  representation of items in an associative list to a component variable
* /global—copies the
  representation of items in an associative list to a global variable

## Parameters

* List—source list of the
  item to be copied; can be string, or field (or indirect reference to a field), variable, or a
  function that evaluates to a string.
* Field—field painted on the
  component; can be a literal name, or a string, variable, function, or parameter that evaluates to
  the name.
* TargetValue—value in an
  associative list
* TargetRepresentation—value
  representation in an associative list
* Entity—entity where fields
  of an occurrence are to be filled. Can be a string, or a field, variable, function, or parameter
  that evaluates to a string.

## Return Values

Values returned in $status

| Value | Description |
| --- | --- |
| 0 | No items were copied. |
| >0 | Number of the items copied. |

## Use

Allowed in all Uniface component types.

However, getlistitems/id/global
cannot be used in self-contained service and report components.

## Description

The getlistitems statement
gets items from List and copies them to the specified destination. Use it to get
and copy:

* The contents of items in an indexed list to
  the field Field in successive occurrences of its entity.
* The value and representation (ValRep) of
  items in an associative list into the fields TargetValue and
  TargetRepresentation in successive occurrences of the current entity.
* The representation of items in an associative
  list into the fields of the named Entity that are identified by the associated
  value of each item.
* The representation of items in an associative
  list into the fields, and variables that are identified by the associated value of each item.

For more information, see  [Lists and Sublists](../../lists/lists_of_items.md).

## Copying to Successive Occurrences

When items are copied from a list into a field or pair of fields in successive
occurrences of an entity, the first list item is copied into the current occurrence and *new
occurrences* are created for the subsequent items.

When copying data into successive occurrences, if
one of the specified fields occurs in an entity that is painted as an up entity, then the nearest
outer entity that is painted as a down entity is used to control the movement of data into
occurrences. If both of the fields specified are painted as up entities, the nearest outer entity
of the first field controls the movement.

## Filling One Field in Successive Occurrences

To copy items from an indexed list to a single field in successive occurrences, use
getlistitems with no switch. Each item is copied to the indicated field in
successive occurrences of its entity. If an unqualified field name is used, the current entity is
used. The entire item is copied to Field, even if the item is structured like an
associative list item.

## Filling One or Two Fields From Associative Lists

To copy list items into one or two fields in
successive occurrences, use getlistitems with the /id switch
and at least one of TargetValue and TargetRepresentation.

* If both TargetValue and
  TargetRepresentation are present, for each item in the associative list, the
  value part of the item is copied to the field TargetValue and the representation
  part is copied to the field TargetRepresentation in successive occurrences.
* If TargetValue is omitted,
  only the representations are copied.
* If TargetRepresentation is
  omitted, only the values are copied.

**Note:**  If one of the switches
/field, /component, or /global appears
with /id, it is ignored.

## Copying Representations of List items Into Targets

To copy
the representation part of each item in an associative list into the target specified by the value
part of that item, use getlistitems with the /id switch, a List name, and no further arguments. The value part of the item can contain the
name of a field, a component variable, a global variable, or a general variable. For example:

```procscript
$LIST$ = "NAME=Frodo;$LOC_TOT$=14;$$GLOB_TOT=329;$1=-8"
getlistitems/id $LIST$
```

After these statements have been executed, the
field NAME contains 'Frodo', the component variable $LOC\_TOT$ contains 14, the global variable
$$GLOB\_TOT contains 329 and the general variable $1 contains -8.

For each item, if the field or variable named by
the value cannot be found, no action is taken.

If the value part of a list item does not contain
a dollar sign ($), the target is assumed to be a field unless one of the target switches
/field, /component, or /global is present.

**Note:**  You can use the switch /local
as a synonym for /component. In this case, component variables are still the
source for the getlistitems statement; local variables are not used.

If one of these target switches is specified,
names that do not include a dollar sign are treated as the specified target type. (If a name
includes a dollar sign, it is treated as the type indicated.) In the following example, a field
NAME, a component variable $NAME$ and a global variable $$NAME are all available, as well as a
field TOTAL and a component variable $TOTAL$:

```procscript
NAME = ""
$NAME$ = ""
$$NAME = ""
TOTAL = 0
$TOTAL$ = 0
$LIST$ = "NAME=Frodo;$TOTAL$=123.45"
getlistitems/id $LIST$     ;NAME is Frodo, $TOTAL$ Is 123.45, TOTAL Is
0
getlistitems/id/field $LIST$   ;NAME is Frodo, $TOTAL$ Is 123.45, TOTAL Is 0
getlistitems/id/component $LIST$ ;$NAME$ is Frodo, $TOTAL$ Is 123.45, TOTAL Is 0
getlistitems/id/global $LIST$   ;$$NAME is Frodo, $TOTAL$ Is 123.45,
TOTAL Is 0
```

Although it is usually good practice to include
the dollar signs ($) that form part of the variable name in each list item's value, these must be
omitted to take advantage of the power of the target switches.

Because the list argument is evaluated at run
time, you should consider the following points when you create the component:

* The existence of the referenced objects
  (fields and variables) cannot be verified by the compiler
* Any referenced fields cannot be included in an
  Automatic field list

Be sure that all the fields that will be
referenced are included in the entity's field list (by using All Fields or a User-Defined field
list) and that all the component and global variables are defined.

## Filling Fields in an Entity

To copy the representation of each item in an
associative list into the field (in the current occurrence of the specified
Entity) that is identified by the associated value, use
getlistitems with the /occ switch. If a field is not
available in the component, the item is not copied. Specifying Entity makes it
possible to identify the entity uniquely in case of duplicate field names.

## Using getlistitems

In the examples, an underlined semicolon
( `;` ) represents the Uniface subfield separator (by default, GOLD ;)
and an underlined exclamation point ( `!` ) represents the retrieve
profile character for logical NOT (GOLD !).

Filling a Field in Successive Occurrences

The following example copies the three
items of an indexed list into the field DAY in the current occurrence and two added occurrences of
the entity CALENDAR:

```procscript
$LIST$ = "Monday;Tuesday;Wednesday"
setocc "CALENDAR", 1    ; Make first occurrence current
getlistitems $LIST$, DAY.CALENDAR
; DAY of current occurrence is "Monday"
; DAY of 1st added occurrence is "Tuesday"
; DAY of 2nd added occurrence is "Wednesday"
```

Filling a Pair of Fields in Successive Occurrences 

The following example copies the three
items of an associative list into the fields NUM and NAME in the current occurrence and two added
occurrences of the entity CALENDAR. The associated parts of the ValRep of each item are placed in
the fields NUM and NAME.

```procscript
$LIST$ = "d1=Mon;d2=Tue;d3=Wed"
setocc "CALENDAR", 1   ; Make first occurrence current
getlistitems/id $LIST$, NUM.CALENDAR, NAME.CALENDAR
; NUM is "d1" and NAME is "Mon" of current occ
; NUM is "d2" and NAME is "Tue" of added occ
; NUM is "d3" and NAME is "Wed" of added occ
```

Filling Fields in the Current Occurrence 

For each item in an associative list, the
following example copies the representation part of the item into the field (in the current entity)
identified by the value part of the item:

```procscript
$LIST$ = "day1=Mon;day2=Tue;day3=Wed"
getlistitems/id/field $LIST$
; copies "Mon" to field DAY1
; copies "Tue" to field DAY2
; copies "Wed" to field DAY3
```

Filling Component Variables 

For each item in an associative list, the
following example copies the representation part of the item into the component variable identified
by the value part of the item:

```procscript
$LIST$ = "day1=Mon;day2=Tue;day3=Wed"
getlistitems/id/component $LIST$
; copies "Mon" to component variable $DAY1$
; copies "Tue" to component variable $DAY2$
; copies "Wed" to component variable $DAY3$
```

Filling Global Variables 

For each item in an associative list, the
following example copies the representation part of the item into the global variable identified by
the value part of the item:

```procscript
$LIST$ = "day1=Mon;day2=Tue;day3=Wed"
getlistitems/id/global $LIST$
; copies "Mon" to global variable $$DAY1
; copies "Tue" to global variable $$DAY2
; copies "Wed" to global variable $$DAY3
```

Filling Fields and Variables

For each item in an associative list, the
following example copies the representation part of the item into the target identified by the
value part of the item. The type of the target (that is, whether it is a field or variable) is
derived from the value of the item.

```procscript
$LIST$ = "day1=Mon;$day2$=Tue;$$day3=Wed";$9=Thu
getlistitems/id $LIST$
; copies "Mon" to the field DAY1
; copies "Tue" to component variable $DAY2$
; copies "Wed" to global variable $$DAY3
; copies "Thu" to general variable $9
```

Filling Fields in a Named Entity

For each item in an associative list, the
following example copies the representation part of the item into the field (of entity WEEK)
identified by the value part of the item. Notice that this is similar to the first example above
using the `/field` switch, except that the target entity name is specified with the
`getlistitems/occ` statement.

```procscript
$LIST$ = "day1=Mon;day2=Tue;day3=Wed"
getlistitems/occ $LIST$, "WEEK"
; copies "Mon" to the field DAY1.WEEK
; copies "Tue" to the field DAY2.WEEK
; copies "Wed" to the field DAY3.WEEK
```

## Related Topics

- [$fieldproperties](../procfunctions/_fieldproperties.md)
- [$fieldvalrep](../procfunctions/_fieldvalrep.md)
- [$properties](../procfunctions/_properties.md)
- [$valrep](../procfunctions/_valrep.md)
- [setocc](setocc.md)
- [List Handling in Proc](../../lists/listhandling.md)


---

# goto

Branch unconditionally to the specified label.

goto  Label

## Parameters

Label—label of a statement in
the current Proc module

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

The goto statement continues
execution within the current Proc module, beginning at the statement identified by
Label. For a more structured approach to programming, use the
while or repeat statements.

## goto Proc Label

The following example deletes the first 1001 records, then
exits the current component. This is typically used when a component is defined
for transaction processing.

```procscript
; trigger: Execute

$1 = 0
retrieve

start:          ; the label ends with a colon (:)
if ($1 = 1001)
   store
   exit
else
   remocc
   $1 = $1 + 1
endif
goto start      ; but no colon is used in the goto line
```

## Related Topics

- [break](break.md)
- [done](done.md)


---

# help

Display help information, either a Uniface help message or information from the native
help system (HTML page or WinHelp).

help  (/id | /topic | /keyword)  Parameters  {/noborder}

help
{/noborder}  HelpMessage  {, VertPos, HorizPos  {, VertSize, HorizSize}}

help/id  Topic`,` ChmFile

help/topic  Topic
{, LogicalName}

help/keyword  Keyword
{, LogicalName}

## Switches

* /id—retrieves and displays
  an online help topic in a CHM file based on its numeric context ID
* /topic—retrieves and
  displays an online help topic, index, or table of contents from the native help system
* /keyword—retrieves and
  displays help about a keyword from a WinHelp file
* /noborder—in character
  mode, displays the form window for USYS:USYSTXT without a border. The switch is ignored in GUI mode
  and also within the Web environment.

## Parameters

* Topic—string, or field (or
  indirect reference to a field), variable, or function that evaluates to a string that identifies
  the help topic. If Topic is an empty string (""), the index or table of contents
  for the native help is displayed.
* LogicalName—string, or a
  field (or indirect reference to a field), a variable, or a function that evaluates to a string. If
  LogicalName is present, Uniface gets the location of the help file from the
  system initialization file (for example, the .ini file). If the argument
  LogicalName is omitted or if the logical name is not found in the initialization
  file, the logical name DEFAULT is used.
* Keyword—string, or a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string. If
  Keyword is an empty string ("") or is not found, the native help engine displays
  an error message.
* HelpMessage—string, or a
  field, variable, or function that evaluates to a string. Often, the function
  $text is used, referring to a global help text or message.
* VertPos,
  HorizPos, VertSize, and HorizSize—position
  and size of the help form, expressed in character cells. If the help text is larger than the size
  defined, vertical and horizontal scroll bars appear as needed. By default, the help window appears
  with a size that exactly fits the help text being displayed. These arguments have no effect in the
  Web environment.

## Return Values

Values Returned in $status

| Value | Meaning |
| --- | --- |
| 1 | Uniface help form was exited with ^ACCEPT. |
| 0 | Native help successfully started. This value is always returned in the Web environment.  Uniface help form was left with ^QUIT. |
| -1 | Uniface help form USYS:USYSTXT.frm could not be found. |
| -2 | Uniface help form is not correct. |
| -3 | Unable to start native help. |
| -4 | Platform does not support native help. (If this case you may want to use the `help` statement to provide help information.) |
| -5 | Native help does not support the requested option. |
| -6 | Unable to map logical name. |
| -7 | Requested topic or keyword not found. |

Values commonly returned by $procerror following
help

| Value | Error constant | Meaning |
| --- | --- | --- |
| -350 | <UHLPERR\_STARTUP> | Unable to start help.  Uniface form USYS:USYSTXT.frm is missing or is not correct. |
| -351 | <UHLPERR\_PLATFORM> | Platform does not support native help. (In this case you may want to use the help [native] statement to provide help information.) |
| -352 | <UHLPERR\_LOGICAL\_NAME> | Unable to map logical name. |
| -354 | <UHLPERR\_OPTION> | Native help does not support the requested option. |
| -353 | <UHLPERR\_TOPIC> | Requested help topic or keyword not found. |

## Use

Allowed in form components.

## Description

When used with the /id switch,
the help statement starts the specified Microsoft Help file
(.chm) and displays the help file corresponding to the context ID. When using
this switch is used, an initialization file that maps the id to the topic must be provided in the
same directory as the CHM file.

For example, in the Development Environment
itself, the Uniface Library is started using the /id switch to display help
about the current form or Proc keyword. The ulibrary.ini file contains the
topic to context ID mappings.

When used with the /topic or
/keyword switches, the help statement starts a native help
engine to display the specified information. On Windows platforms, the native help system is
assumed to be WinHelp.

When used without a switch or with
/noborders, the help statement displaus the specified Uniface help text in an
overlay help form (USYS:USYSTXT) available with Uniface. The focus stays with the help window until
the user uses either ^QUIT or ^ACCEPT or clicks the button on the USYS:USYSTXT form. At that point,
control of the application is returned to the statement following the help
statement.

## Help on Windows

The Microsoft Compressed HTML Help
(.chm) can be displayed using the help/id Proc command to
start the Microsoft HTML Help Viewer (hh.exe) with the specified numeric ID.

Microsoft also provides an SDK that enables you to
integrate the help more closely into your application. For more information, see [msdn.microsoft.com/en-us/library/ms670169.aspx](http://msdn.microsoft.com/en-us/library/ms670169.aspx).

The WinHelp format (.hlp) can
be called using the help/topic and help/keyword  Proc
statements. Although it is an older format, you can download the Windows Help executable for more
supported Windows versions from Microsoft Support ([support.microsoft.com/kb/917607](http://support.microsoft.com/kb/917607)).

## Calling Native Help

The following example starts the native help
engine and displays the index from the help file identified by the logical name MYHELP:

```procscript
; trigger: Help
help/topic " ", "myhelp"
if ($status < 0)
    message "Unable to show help index: %%$status"
endif
end ; end trigger
```

## Calling Uniface Help Message

The following example displays the help text or
message identified by HELPTEXT. The example assumes that the appropriate
$language and $variation settings are used.

```procscript
; trigger: Help
help/noborder $text(HELPTEXT), 3,4,7,23
```

## Related Topics

- [$text](../procfunctions/_text.md)
- [Online Help for Uniface Applications](../../../desktopapps/implementinghelp/online_help_support_in_uniface.md)
- [Implementing Online Help](../../../desktopapps/implementinghelp/implementingonlinehelp.md)
- [Help (Entity)](../triggersstandard/help.md)
- [Help (Field)](../triggersstandard/help2.md)


---

# if

Define an if/endif conditional block.

if `(`Condition 1 )

        ... one or more Proc
statements ...

{elseif `(`Condition 2 )

        ... one or more Proc
statements ...

...

elseif `(`Condition n )

        ... one or more Proc
statements ... }

{else

        ... one or more Proc
statements ... }

endif

## Clauses

* if—defines a condition and
  marks the Proc code to be executed if the condition is met.
* elseif—defines an
  alternative condition to that introduced by the If statement, and marks the Proc code to be
  executed if the Condition is met.
* else—marks the Proc code to
  be executed if none of the previous conditions have been met. If no else clause
  is present, no Proc statements are executed.
* endif—marks the end of the
  if conditional block

## Parameters

Condition—expression that
evaluates to a Boolean. Uniface performs implicit data type conversion if the expression is of a
data type other then Boolean.

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

An if/endif
block allows you to write Proc code that is conditionally executed based on the results of logical
expressions. Each Condition is evaluated in sequence, beginning with the one on
the if statement.

* If a Condition is
  evaluated as TRUE, the following group of Proc statements up to the next elseif,
  else, or endif statement is executed.
* If a Condition is FALSE,
  the Proc statements following the else statement are executed. If no
  else clause is present, no Proc statements are executed.

## Nesting and Writing if Blocks

Any number of elseif clauses
may be included. Conditional statements such as if/endif,
while/endwhile, and
repeat/until can be nested up to 32 levels.

* In each if,
  elseif, and else clause, if there is more than one Proc
  statement, each statement must begin on a separate line, beginning on the line below the
  if, elseif, or else statement.
* If only one Proc statement is required for
  the if clause, it can occur on the same line as the if; in
  this case, do not include any elseif clauses, an else clause,
  or an endif.
* If only one Proc statement is required for an
  elseif clause, it can occur on the same line; in this case, do not include
  further elseif clauses, an else clause or an
  endif.
* If only one Proc statement is required for the
  else clause, it can occur on the same line; in this case, do not include an
  endif. This style of programming is not recommended.

## Conditionally Printing a Break Frame

The following example shows how an `if` statement is used to
conditionally print a break frame:

```procscript
; trigger: Leave Printed Occurrence
; if next invoice date different
;    print "SUBTOTAL" break frame
;    set subtotal to 0
;    start printing on next page
; else
;    print next line empty

AMOUNT.SUBTOTAL = (AMOUNT.SUBTOTAL + INVAMOUNT)
if (INVDATE != $next(INVDATE))
   printbreak "SUBTOTAL"
   AMOUNT.SUBTOTAL = 0
   eject
else
   skip
endif
```

## Determining the Alphabetic Range of a Field

The following example illustrates a simple use of
the elseif clause to determine the alphabetic range of the field NAME:

```procscript
$1 = NAME[1:1]
if ($1 < "M")
   message "NAME starts A-L"
elseif ($1 > "M")
   message "NAME starts N-Z"
else
   message "NAME starts M"
endif
```

## Related Topics

- [Operators](../../proclanguage/operators/operators.md)
- [while](while.md)
- [repeat](repeat.md)
- [selectcase](selectcase.md)
- [Conditions](../../proclanguage/statements/conditions.md)
- [Type Conversion](../../datatypehandling/datatypeconversion.md)


---

# javascript

Define a JavaScript block in a client-side trigger or operation.

javascript

...Your JavaScript code
here

endjavascript

## Return Values

None

## Use

Only for use in weboperation
and webtrigger definitions of dynamic server pages (DSPs).

## Description

Use javascript and
endjavascript instructions to define a block of JavaScript code that contains
one or more JavaScript functions. In this code, you can make use of the Uniface JavaScript API to
address and manipulate data, occurrences, and component instances. The JavaScript must conform to
the data format described in [Data Format of External Client-Side Triggers and Operations](../../../webapps/scripting/clientsidetriggersandoperationsdataformat.md).

Uniface treats anything between the
javascript and endjavascript instructions as JavaScript, but
does not validate it. However, if your JavaScript contains either of these keywords on a separate
line, Uniface interprets them as Proc instructions and this can result in syntax errors.

**Note:**  Code highlighting is currently not available for
JavaScript in the Proc Editor. Proc keywords and syntax are highlighted wherever they occur, so
Javascript code that matches a Proc keyword is highlighted, even though it is not Proc. This has no
effect on compilation.

Parameters for client-side operations and triggers
are optional and must be declared in Proc preceding the javascript instruction.
Variables, however, must be declared in JavaScript.

For more information, see [Client-Side Triggers and Operations](../../../webapps/scripting/clientsidetriggersandoperations.md).

```procscript
weboperation AlertJS 
scope		
 input
 output
endscope

javascript                            ; Proc instruction, so Proc comment can follow
  alert("THIS IS JAVASCRIPT CODING"); /* JavaScript code, so comment is also JavaScript*/
endjavascript                         ; Proc instruction, so Proc comment can follow
end ;alert operation
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [JavaScript](../../../webapps/webtechnologies/javascript.md)
- [APIs: JavaScript](../../../_reference/javascriptapi/javascriptapi.md)
- [Executing Logic in the Browser](../../../webapps/scripting/executinglogicinbrowser.md)


---

# jsonToStruct

Convert a JSON text to a Struct.

jsonToStruct StructTarget`,` JsonSource

Example: `jsonToStruct vStruct,
myjson.txt`

## Parameters

* StructTarget—variable,
  parameter, or non-database field of type struct or any to
  hold the returned output
* JsonSource—JSON text to
  parse. It can be a string, variable, or field, or the name of a file containing the JSON text.

  The JSON text must begin with an opening
  bracket (`[`) or brace (`{`), optionally preceded by whitespace.

  If a file is specified, it must be
  Unicode-encoded.

  **Tip:** 

  If this is not the case, use
  fileload to first read the file into a Uniface variable or field, and then
  provide it as the JsonDocument parameter.

## Return Values

If the conversion was successful, a Struct
representing the JSON text is returned in StructTarget (replacing the existing
Struct it may have held).

Values returned in $status

| Value | Meaning |
| --- | --- |
| 0 | Conversion was successful. |
| <0 | Conversion failed. $procerror contains the exact error. |

## Common Errors

Values Commonly Returned by $procerror after
jsonToStruct

| Error Number | Error Constant | Meaning |
| --- | --- | --- |
| `-4` | `IOSERR_OPEN_FAILURE` | The file specified by JsonDocument could not be opened. |
| `-13` | `UIOSERR_OS_COMMAND` | The specified file name specified by JsonDocument is too long. |
| `- 1900` | `JSONERR_NO_CONTENT` | Failed to load JSON string.  Occurs if the contents of the file are empty or if no JSON string is available after stripping leading and trailing whitespace. |
| `-1901` | `JSONERR_NO_TEXT` | JSON text does not start with object or array.  A JSON text must begin with `{` or `[`. |
| `- 1902` | `UJSONERR_PARSER` | JSON parser returned an error. Additional information is provided by the parser in $procerrorcontext.  Non-fatal warnings about conditions that may be errors are returned in the `DETAIL` sublist of $procReturnContext. For example, JSON text should normally not have members with the same name in one object, but there may be valid reasons for doing this. |

## Use

Allowed in all Uniface component types.

## Description

jsonToStruct reads the first
four bytes of the file to determine the Unicode type and then opens the file in that type of
Unicode. However, on iSeries, every file is tagged with a codepage which must be used; UTF-8,
UTF-16 and so on all have different codepages.

For more information on the Struct generated by
jsonToStruct, see
[Structs for JSON Data](../../structs/transformingwithstructs/structsforjson.md).

History

| Version | Change |
| --- | --- |
| 9.6.04 | Introduced |

## Related Topics

- [structToJson](structtojson.md)
- [Structs for JSON Data](../../structs/transformingwithstructs/structsforjson.md)
- [Transforming Complex Data Using Structs](../../structs/transformingwithstructs/handlingcomplexdynamicdata.md)


---

# ldircreate

Create the specified directory in the working directory, ignoring redirections in the
assignment file.

ldircreate  NewDirPath

## Parameters

NewDirPath—directory name,
optionally preceded by the path to the directory, which can be in a zip archive. Must end with a
directory separator.

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The ldircreate statement
creates the specified directory in the current working directory, ignoring any file redirections in
the assignment file.

## Specifying the Directory

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md).

## Operation Failure

The operation fails if
NewDirPath:

* Already exists
* Does not permit user-creation due to
  insufficient authorization level
* Has invalid syntax

## Unix

On Unix, the directory is created with
`read` and `write` access on world, group, and user level.

## iSeries

On iSeries, ldircreate creates
a library or a file in a library or, when the IFS prefix is used, a directory in the IFS.

If used without the IFS prefix, a library, or a
file in a library, is created. Libraries cannot have sublibraries, so no more than one directory
separator is allowed. That is, the only allowed syntax is library/ or
file or library/file.

If used with the IFS prefix, an IFS directory is
created. Directories in the IFS can have subdirectories, but the different file systems existing in
the IFS have their own rules and limitations. For more information, see [File-Naming Considerations on iSeries](../../filemanagement/filenamingconsiderations_as400.md).

## Creating a Directory in the Current Working Directory

The following Proc code creates a directory with the name coffee in
the current working directory:

```procscript
ldircreate "coffee"
```

## Creating a Directory in an Existing Directory

The following Proc code creates a directory with
the name coffee in the directory sub1dir in the current
directory:

```procscript
ldircreate "sub1dir\coffee\"
```

or

```procscript
ldircreate "[.sub1dir.coffee.]"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support |

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# ldirdelete

Delete the specified directory.

ldirdelete  DirPath

## Parameters

DirPath—directory name,
optionally preceded by the path to the directory. The directory can be located in a ZIP archive.
Must end with a directory separator.

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The ldirdelete statement
deletes the specified directory DirPath, ignoring any file redirections in the
assignment file.

## Specifying the Directory

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md).

## Operation Failure

The operation fails if
DirPath:

* Is not a directory
* Is the current directory or root
* Is not empty
* Is in use (locked)
* Does not permit user-deletion due to
  insufficient authorization level
* Has invalid syntax

## iSeries

When used without the IFS prefix, deleting
libraries is only possible for libraries that are not in use and not on your own or somebody else’s
library list. The same applies for files in libraries. Negative return values can be expected.

When used with an IFS prefix, directories are
deleted as expected.

For more information, see [File-Naming Considerations on iSeries](../../filemanagement/filenamingconsiderations_as400.md).

## Using ldirdelete

The following Proc code deletes the directory tea if it is empty
and the user confirms that it may be deleted:

```procscript
$dir$ = "drinks\tea\"
; or $dir$ = "drinks/tea/"
; or $dir$ = "[drinks.tea]"
if ($ldirlist($dir$,"dir") = "" & $ldirlist($dir$,"file") = "")
   askmess/warning "Do you want to delete '%%$dir$'?", "Yes, No"
   if ($status = 1) 
      ldirdelete $dir$
   else
   message/error "Directory '%%$dir$' is not empty!"
endif
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support |

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# ldirrename

Rename the specified directory, ignoring redirections in the assignment file.

ldirrename  DirPath, NewDirName

## Parameters

* DirPath—directory name,
  optionally preceded by the path to the directory.
* NewDirName—new directory
  name, optionally preceded by the path to the directory. Must *not* end with a directory
  separator.

The directory can be located in a ZIP archive.

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The ldirrename statement
renames the specified directory DirPath to NewDirName,
ignoring any file redirections in the assignment file.

## Specifying the Directory

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md).

## Operation failure

The ldirrename operation fails
if DirPath:

* Is not a directory
* Does not exist
* Is not empty
* Is in use (locked)
* Is the current directory or root
* Does not permit user-renaming due to
  insufficient authorization level
* Has invalid syntax

The operation also fails if
NewDirName:

* Already exists
* (for example, if it ends with a directory
  separator)

## iSeries

When used without the IFS prefix, renaming
libraries is only possible for libraries that are not in use and not on somebody else’s library
list. The same applies for files in libraries. Negative return values can be expected.

When used with an IFS prefix, directories can be
renamed in the same way as on Unix systems.

For more information, see [File-Naming Considerations on iSeries](../../filemanagement/filenamingconsiderations_as400.md)..

## Using ldirrename

The following Proc code renames the directory
drinks\coffee to drinks\tea:

```procscript
ldirrename "drinks\coffee\", "tea"
```

or

```procscript
ldirrename "[drinks.coffee]", "tea"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support |

## Related Topics

- [dirrename](dirrename.md)
- [filerename](filerename.md)
- [lfilerename](lfilerename.md)
- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# length

Return the number of characters in the specified string.

length  String

## Parameters

String—string, or a field (or
indirect reference to a field), a variable, or a function that evaluates to a string.

## Return Values

$result is set to the number
of characters in the string.

$status is not affected.

## Use

Allowed in all Uniface component types.

## Description

The length statement finds the
length of the piece of text in String. The value of $result
is set to the number of characters in String.

If String contains frame
marker, ruler, or character attribute characters, they are ignored.

The length statement is often
used to determine where extraction should begin.

## Find the Length of a String

The following example finds the length of the string in $1:

```procscript
; store contents of NOTEPAD in $1
; how long is string in $1?
; output = 11

$1 = "test string"
length $1
$2 = $result
output = $2
```

## Finding the Offset to Characters in a String

The following example uses the `length` statement to find the offset to
the last two characters in the string. In the example, the field INVNUM contains the value
90021387SH. This is the concatenation of a date (13-Feb-1990), a number (87), and a salesman's
initials (SH):

```procscript
; how long is invnum?
; $1 contains position second from end
; extract last 2 characters
; report their total sales

length INVNUM
$1=$result-1
$2=INVNUM[$1]
selectdb (sum(AMOUNT)) %\
   from "INVOICES" %\
   u_where (SALESCODE = $2) %\
   to SALESREPORT.DUMMY
```

## Related Topics

- [$length](../procfunctions/_length.md)
- [$syntax](../procfunctions/_syntax.md)
- [$result](../procfunctions/_result.md)


---

# lfilecopy

Copy the specified file to the target location, ignoring file redirections in the
assignment file.

lfilecopy  FilePath, DirPath |
NewFilePath

## Parameters

* FilePath—file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.
* DirPath—directory name,
  optionally preceded by the path to the directory. Must end with a directory separator
* NewFilePath—new file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The lfilecopy statement copies
the specified file FilePath to the target location, either to
DirPath or to NewFilePath, ignoring any file redirections in
the assignment file.

If DirPath is specified (that
is, the path ends with a directory separator), the file FilePath is copied to
the directory DirPath using the same file name.

If NewFilePath is specified,
the specified file is copied to the directory name and file name supplied in
NewFilePath.

## Specifying Parameters

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md).

## Operation Failure

The operation lfilecopy fails
if FilePath:

* Is not a file
* Does not exist
* Has invalid syntax

The operation also fails if the directory part of
DirPath or NewFilePath:

* Does not already exist
* Does not permit user-writing due to
  insufficient authorization level
* Has invalid syntax

The operation also fails if the file
NewFilePath:

* Already exists
* Has invalid syntax

## Copying From and To Zip Files and Across Platforms

If the the specified file
FilePath is located in a ZIP archive, it can be copied to different directory in
the same archive, to another ZIP archive, or to a directory on the file system.

When copying files to or from zip archives, or
across operating systems or media, Uniface handles text files differently than binary files. It
copies binary files as-is, but it automatically adjusts text file attributes so that EOL characters
and optional character set conversions match the platform. This may result in changes in the file
size, making it appear that source and target files are not the same.

You can define the files to be treated as text
files, or switch off automatic cross-platform text file handling using the
$TEXT\_FILE\_EXTENSIONS
assignment setting.

## iSeries

On the iSeries, the particular ‘copy’ command that
is used depends on the following circumstances:

* When both the source and the destination use
  the IFS prefix, or when both do *not* use the IFS prefix, the CPY
  command is used
* When the source has the IFS prefix, but the
  destination does not, then CPYFRMSTMF is used
* When the destination has the IFS prefix, but
  the source does not, then CPYTOSTMF is used.

## Copying a File to Another Directory

The following example copies the file test.txt from the directory
sub1dir in the current directory to the directory sub2dir
in sub1dir:

```procscript
lfilecopy "sub1dir\test.txt", "sub1dir\sub2dir\"
```

or

```procscript
lfilecopy "sub1dir/test.txt", "sub1dir/sub2dir/"
```

## Copying a Ffile to the Same Directory Under Another Name

The following example copies the file
test1.txt to test2.txt in the same directory:

```procscript
lfilecopy "sub1dir\test1.txt", "sub1dir\test2.txt"
```

or

```procscript
lfilecopy "[.sub1dir]test1.txt", "[.sub1dir]test2.txt"
```

## Copying a File to Another Directory Under Another Name

The following example copies the file
test1.txt in the current directory to the file test2.txt
in sub3dir in the current directory:

```procscript
lfilecopy "test1.txt", ".\sub3dir/test2.txt"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support |

## Related Topics

- [$TEXT_FILE_EXTENSIONS](../../../configuration/reference/assignments/_text_file_extensions.md)
- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)
- [Zip Files](../../../developmentadmin/dataexchange/concepts/zipfilesupport.md)


---

# lfiledelete

Delete the specified file, ignoring file redirections in the assignment file.

lfiledelete  FilePath

## Parameters

FilePath—file name, optionally
preceded by the path to the file. The file can be located in a ZIP archive. Must *not*
end with a directory separator.

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The lfiledelete statement
deletes the specified file, ignoring any file redirections in the assignment file.

## Specifying Parameters

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md)..

## Operation Failure

The operation fails if
FilePath:

* Is not a file
* Does not exist
* Is in use (locked)
* Does not permit user-deletion due to
  insufficient authorization level
* Has invalid syntax

The following example deletes the file
test.txt in the directory sub1dir in the current
directory:

```procscript
lfiledelete "sub1dir\test.txt"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support |

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# lfiledump

Copy the contents of the source object to the specified file on the local file
system, ignoring file redirections that might occur in the assignment file.

lfiledump
{/text {/nobom} { /append} |
/image | /raw | /web
}  Source, FileName  
{`,` UnicodeFormat | CharacterSet}

## Switches

* /text—translates the raw
  data from Source to the system character set or to the
  UnicodeFormat, if specified. This is the default behavior.
* /append—appends the
  contents of Source to the specified FileName. If
  FileName does not exist, it is created. The /append switch
  cannot be used in conjunction with /image and /raw.
* /nobom—omits the Unicode
  Byte-Order-Mark (BOM) when writing Unicode (if UnicodeFormat is specified or
  $SYS\_CHARSET is set to `UTF8`).
* /image—writes the raw data
  from Source, assuming that this data is an image. An initial hash character (#)
  is removed from the data before writing. (The hash character is an indicator to show that image
  data follows.) No further conversion is performed on the data in Source.
* /raw—writes the
  raw data from Source; an initial hash character (#) is not
  removed. No further conversion is performed on the data in Source, which is
  encoded as UTF-8.
* /web—in forms running in
  the Web Application Server, copies files that were downloaded via the browser. The files are in raw
  format
  .

## Parameters

* Source—source object
  containing the contents to be copied. It can be a literal field name, or a string, a variable, or
  function.
* FileName—destination path
  and file name of the output file, which can include a ZIP archive. The total length of the path and
  file name cannot exceed 255 bytes, and the name must *not* end with a directory
  separator.
* UnicodeFormat—Unicode
  encoding format of the input file. It can be a string, or a field (or indirect reference to a
  field), a variable, or a function that evaluates to a string. Valid values are:
  `UTF-8`, `UTF-16`, `UTF-16BE`,
  `UTF-16LE`, `UTF-32`, `UTF-32BE` and
  `UTF-32LE`. If not specified, the system character set is used.
* CharacterSet—character set;
  overrides the character set specified by $SYS\_CHARSET.

  If the data is save to an XML file, the
  character set is mapped to an IANA-approved name that matches the character set. For example, if
  `CP1252` or `LATIN1` is specified, `ISO-8859-1` is used
  for character set encoding. See
  [XML Encoding to Character Set Mappings](filedump.md#section_906A110CB723438B80B5C5CE2CB5E989).

## Return Values

Values returned by
filedump and lfiledump in $status

| Value | Meaning |
| --- | --- |
| >=0 | The number of bytes from Source written to FileName. |
| -1 | An I/O error occurred while writing FileName. |
| -4 | Cannot open FileName. |
| -13 | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |
| -16 | Network error: unknown. |
| -17 | Network error: pipe broken. |
| -18 | Network error: failed to start new server. |
| -19 | Network error: fatal. |

Values commonly returned by $procerror following
filedump and lfiledump

| Value | Error constant | Meaning |
| --- | --- | --- |
| `-4` | `<UIOSERR_OPEN_FAILURE>` | The table or file could not be opened. The entity is not painted or the corresponding table or file does not exist in the database. |
| `-12` | `<UIOSERR_FILE_READ_WRITE>` | An error occurred while trying to read or write to the file. |
| `-13` | `<UIOSERR_OS_COMMAND>` | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |
| `-16` through `-30` | `<UNETERR_*>` | Errors during network I/O. |

## Use

Allowed in all Uniface component types.

## Description

The lfiledump statement copies
Source directly to the local file system, ignoring file redirections that might
occur in the assignment file. This is in contrast to filedump, which observes
file redirections in the assignment file.

The file FileName is created
if it does not already exist. If FileName is an existing file, its contents will
be overwritten, unless you specify the /append option.

The statement fails if
FileName is in use (locked), has an invalid syntax, or the user does not have
authorization to write files.

If the output file or location does not contain
enough space to write the entire contents of the Source, the data is truncated
and `-12``<UIOSERR_FILE_READ_WRITE>` is returned in
$procerror.

## Specifying the File Name

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md).

## Writing Unicode

Used without the /image or
/raw switch, the data is converted and stored to the UTF8 character set, or with
the UnicodeFormat (if specified).

If a Unicode format is specified, either by the
UnicodeFormat parameter or the $SYS\_CHARSET assignment, a
Unicode Byte-Order-Mark (BOM) is written. This is a special character to recognize the encoding.

However, the BOM can cause problems with some
standards and applications. For example, the Unicode type for JSON data must be deduced from the
first characters of the JSON text itself, rather than the BOM. In such cases, you can prevent the
BOM from being written by using the /nobom qualifier.

**Note:**  You can change the application behavior so that
the BOM is never written, even if /nobom is omitted. To do so, use the
$NO\_BOM\_UTF8 assignment setting.

## Writing XML

If the first line of data contains an XML
declaration, the `encoding` attribute is added (if not already present) to specify
the character set to use in the XML string. The value of the XML encoding attribute is derived from
the UnicodeFormat or CharacterSet specified in the statement,
or otherwise from the $SYS\_CHARSET.

For example:

* If
  `$SYS_CHARSET=CP1252` and no CharacterSet is
  specified, `<?xml version="1.0">` is copied as:

  ```procscript
  <?xml version="1.0" encoding="ISO-8859-1"?>
  ```
* If
  `$SYS_CHARSET=SJIS` and no CharacterSet is
  specified, `<?xml version="1.0">` is copied as:

  ```procscript
  <?xml version="1.0" encoding="Shift_JIS"?>
  ```
* If
  `$SYS_CHARSET=CP1252` and CharacterSet is
  specified as `"CP1252"`, `<?xml version="1.0">` is copied
  as:

  ```procscript
  <?xml version="1.0" encoding="ISO-8859-1"?>
  ```

  Even though CharacterSet
  has been explicitly set, CP1252 is not an accepted name for an XML encoding, so it has been
  converted to an equivalent ISO encoding.

There are some differences between the character
sets and the encoding formats, especially between Windows code page 1252 and ISO-8859-1. For this
reason, It is best practice to specify the encoding yourself, either by including the encoding
attribute in the data, or by specifying the CharacterSet attribute.

To ensure that a Windows code page encoding is
used, you must use the format `windows-nnnn`,
wherennnn is the code page number.

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support  Added optional parameter UnicodeFormat |
| 9.6.04 | Added /nobom switch |

## Related Topics

- [filedump](filedump.md)
- [$NO_BOM_UTF8](../../../configuration/reference/assignments/_no_bom_utf8.md)
- [$SYS_CHARSET](../../../configuration/reference/assignments/sys_charset.md)
- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# lfileload

Copy the contents of the specified file into the target object, ignoring any file
indirections in the assignment file.

lfileload{`/text`
|`/image` | `/raw` | `/web` }  
FilePath, Target  {`,` UnicodeFormat | CharSet}

## Switches

* `/text`—translates the raw data
  from FileName to the system character set or the
  UnicodeFormat. This is the default behavior.
* /image—reads the raw data
  from FilePath, assuming that this data is an image. An initial hash character
  (#) is added to the data before copying the data to Target. (The hash character
  is an indicator to show that image data follows.) No further conversion is performed on the data.
* /raw—behaves similarly to
  the /image switch, except that the data in FilePath is
  assumed not to be an image; an initial hash character (#) is not added. No further conversion is
  performed on the data.
* /web—when used in forms
  running in the Web Application Server, it loads files that were uploaded via the browser. The files
  are in raw format.

## Parameters

* FilePath—file name,
  optionally preceded by the path to the file. The file can be located in a zip archive, but must
  *not* end with a directory separator.
* Target—name of a field, a
  variable, or a parameter to receive the data.
* UnicodeFormat—Unicode
  encoding format of the input file. It can be a string, or a field (or indirect reference to a
  field), a variable, or a function that evaluates to a string. Valid values are:
  `UTF-8`, `UTF-16`, `UTF-16BE`,
  `UTF-16LE`, `UTF-32BE` and `UTF-32LE`. If not
  specified, the system character set is used.
* CharSet—character set;
  overrides the value of the system character set (`$SYS_CHARSET`). For a list of
  supported character sets, see
  [$SYS\_CHARSET](../../../configuration/reference/assignments/sys_charset.md).

## Return Values

Values returned by lfileload in $status

| Value | Meaning |
| --- | --- |
| >=0 | The number of bytes in Target. |
| -1 | An I/O error occurred while reading FileName. |
| -4 | Cannot open FileName. |

Values commonly returned by $procerror following fileload and lfileload

| Value | Error constant | Meaning |
| --- | --- | --- |
| -4 | <UIOSERR\_OPEN\_FAILURE> | The table or file could not be opened. The entity is not painted or the corresponding table or file does not exist in the database. |
| -12 | <UIOSERR\_FILE\_READ\_WRITE> | An error occurred while trying to read or write to the file. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| -1113 | <UPROCERR\_PARAMETER> | Parameter name not valid or not defined. |
| -1114 | <UPROCERR\_LOCAL\_VARIABLE> | Local variable name not valid or not defined. |
| -1115 | <UPROCERR\_COMPONENT\_VARIABLE> | Component variable name not valid or not found. |
| -1116 | <UPROCERR\_GENERAL\_VARIABLE> | General variable not valid. |
| -1117 | <UPROCERR\_GLOBAL\_VARIABLE> | Global variable name not valid or not found. |

## Use

Allowed in all Uniface component types.

## Description

The lfileload statement copies
the contents of FilePath to the specified Target, ignoring
any file indirections in the assignment file.

Used without the `/image` or
`/raw` switch, lfileload converts the data to be stored from the
character set specified by the assignment setting $SYS\_CHARSET or with the
UnicodeFormat, if specified.

lfileload checks for a Unicode
Byte-Order-Mark (BOM), a special character to recognize the encoding. If no BOM is available, the
indicated character set is used:

Character
Set Used if Unicode BOM Not Available

| Character Set Specified by UnicodeFormat | Character Set Used |
| --- | --- |
| UnicodeFormat is not specified | Character set specified by the $SYS\_CHARSET assignment setting |
| `UTF-8` | `UTF-8` |
| `UTF-16` or `UTF-32` | Big-Endian character set; either `UTF-16BE` or `UTF-32BE`, according to Unicode specification |

If the UnicodeFormat is
specified as `UTF-16BE`, `UTF-16LE`, `UTF-32BE` or
`UTF-32LE`, lfileload does not check the Unicode BOM because the
character set is explicitly provided.

To strip the end-of-line character from an
otherwise empty input file, so the resulting data is truly empty, use the assignment setting
$FILELOAD\_SINGLE\_LINE.

If you want to copy contents from a file located
on a network, use fileload.

## Specifying the File Name

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md).

## Operation Failure

The operation fails if
FilePath:

* Does not exist
* Does not permit user-reading due to
  insufficient authorization level
* Has invalid syntax

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support  Added optional parameter UnicodeFormat |

## Related Topics

- [fileload](fileload.md)
- [lfiledump](lfiledump.md)
- [$FILELOAD_SINGLE_LINE](../../../configuration/reference/assignments/_fileload_single_line.md)
- [$SYS_CHARSET](../../../configuration/reference/assignments/sys_charset.md)


---

# lfilemove

Move the specified file to the target location, ignoring any file redirections in the
assignment file.

lfilemove  FilePath, DirPath |
NewFilePath

## Parameters

* FilePath—file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.
* DirPath—directory name,
  optionally preceded by the path to the directory. Must end with a directory separator.
* NewFilePath—new file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The lfilemove statement moves
the specified file FilePath to the target location, ignoring any file
redirections in the assignment file. You can simply move the file by specifying
DirPath or move and rename the file by specifying
NewFilePath. The file to be moved can be located within a ZIP archive and moved
to a different directory in the same archive, to a different ZIP archive, or to a local
directory.

To rename a file without moving it, use
lfilerename.

## Specifying Parameters

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md).

## Operation Failure

The lfilemove operation fails
if FilePath:

* Is not a file
* Does not exist
* Is in use (locked)
* Does not permit user-deletion (after move) due
  to insufficient authorization level
* Has invalid syntax

The operation also fails if the directory part of
DirPath or NewFilePath:

* Does not exist
* Does not permit user-writing due to
  insufficient authorization level
* Has invalid syntax

The operation also fails if the file
NewFilePath:

* Already exists
* Has invalid syntax

## Moving From and To Zip Files and Across Platforms

If the the specified file
FilePath is located in a ZIP archive, it can be moved to different directory in
the same archive, to another ZIP archive, or to a directory on the file system.

When moving files to or from zip archives, or
across operating systems or media, Uniface handles text files differently than binary files. It
copies binary files as-is, but it automatically adjusts text file attributes so that EOL characters
and optional character set conversions match the platform. This may result in changes in the file
size, making it appear that source and target files are not the same.

You can define the files to be treated as text
files, or switch off automatic cross-platform text file handling using the
$TEXT\_FILE\_EXTENSIONS
assignment setting.

## iSeries

On the iSeries, the particular ‘move’ command that
is used depends on the following circumstances:

* When both the source and the destination use
  the IFS prefix, or when both do *not* use the IFS prefix, the `MOVE`
  command is used
* When the source has the IFS prefix, but the
  destination does not, then `CPYFRMSTMF` is used. If the copy finishes successfully,
  the source file is deleted; if the delete fails (for example, due to lack of authorization), the
  copy is undone, and $procerror -13 is returned. The file (indicated by its
  extension), into which the member is to be moved, must already exist; lfilemove
  does not implicitly create files.
* When the destination has the IFS prefix, but
  the source does not, then `CPYTOSTMF` is used.

## Moving a File to Another Directory

The following example moves the file test.txt, from the directory
sub1dir in the current directory, to the directory
sub2dir in sub1dir:

```procscript
lfilemove "sub1dir\test.txt", "sub1dir\sub2dir\"
```

or

```procscript
lfilemove "[.sub1dir]test.txt", "[.sub1dir.sub2dir]"
```

Note that it is the presence of the directory
separator at the end of the second argument that determines that this is only a move to another
directory, *not* a move combined with a file rename.

## Moving and Renaming a File

The following example moves the file
test1.txt from the current directory to the directory
sub2dir, renaming the file to text.txt:

```procscript
lfilemove ".\test1.txt", ".\sub2dir\text.txt"
```

Note that it is the absence of a directory
separator at the end of the second argument that determines that this is a move to another
directory, *combined* with a file rename.

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support |

## Related Topics

- [lfilerename](lfilerename.md)
- [$TEXT_FILE_EXTENSIONS](../../../configuration/reference/assignments/_text_file_extensions.md)
- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)
- [Zip Files](../../../developmentadmin/dataexchange/concepts/zipfilesupport.md)


---

# lfilerename

Rename the specified file within the same directory, ignoring any file redirections
in the assignment file.

lfilerename  FilePath, NewFilePath

## Parameters

* FilePath—file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.
* NewFilePath—new file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.

## Return Values

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Description

The lfilerename statement
renames FilePath to NewFilePath within the same directory,
ignoring any file redirections in the assignment file. The file can be renamed in a ZIP
archive.

## Specifying File Named

* Each specification can be a string, a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.
* The total length of any path (or file name or
  directory name) must not exceed 255 bytes.
* Valid generic directory separators are the
  backward slash (`\`), the forward slash (`/`) , and the period
  (`.`) in combination with square brackets (`[a.b]`). These are
  translated to the platform-specific separators.
* No wildcards are allowed in any path, except
  for $ldirlist and $dirlist, which allows the Uniface
  wildcards `?` (GOLD ?) and `*` (GOLD \*) in
  the directory name, for example `ab?`, or in its suffix, for example
  `abc\*.txt`.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md)..

## Operation Failure

The operation lfilerename fails
if FilePath:

* Is not a file
* Does not exist
* Is in use (locked)
* Does not permit user-renaming due to
  insufficient authorization level
* Has invalid syntax (for example, if it ends
  with a directory separator)

The operation also fails if the file
NewFilePath:

* Already exists
* Has invalid syntax (for example, if it ends
  with a directory separator)

## iSeries

On the iSeries, when you attempt to rename a file
(that does not reside in the IFS) such that its extension is changed, this implies a move of a
member to a different file. For example, the command lfilerename lib/aaa.ext1,
bbb.ext2 will move member aaa from file ext1 to
file ext2 and rename the member to bbb. This works only
if file ext2 already exists and the process has appropriate access rights,
because the statement lfilerename does not implicitly create files.

## Renaming a File in the Same Directory

The following example renames the file test.txt in the directory
sub1dir in the current directory to tested.txt:

```procscript
lfilerename "sub1dir/test.txt", "tested.txt"
```

or:

```procscript
lfilerename "[.sub1dir]test.txt;5", "tested.txt"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support |

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# lflush

Complete a file management transaction for the specified open zip archive or XML file,
then close the file, ignoring any file redirections in the assignment file.

lflush  `"`ZipArchive`:"` |
`"`XmlFile`"`

## Parameters

* ZipArchive—zip file name,
  optionally preceded by the path to the file
* XmlFile—XML file accessed
  by $ude ("export") or $ude ("copy") with the
  `keepopen` option.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md)..

## Use

Allowed in all Uniface component types.

## Description

When accessing files and directories located in
zip archives, Uniface keeps file open to avoid the performance problems entailed by repeatedly
opening and closing files. For the same reason, you can specify the `keepopen`
option when repeatedly using $ude ("export") or $ude ("copy")
to export or copy files.

The lflush Proc statement
explicitly completes an open transaction for a specified zip archive or XML file and closes the
file.

## Flushing Zip Files

The following example writes data to the
def.txt file located in the dir1 directory within the
b5.zip archive, then saves and close the file using lflush.

```procscript
lfiledump "abc", "C:\Uniface\Uniface96_Data\project\b5.zip:dir1\def.txt"
lflush "C:\Uniface\Uniface96_Data\project\b5.zip:"
```

## Flushing Export Files

In the following example, all models and
components are exported, and lflush is used to complete the transaction and
close the file:

```procscript
vOut = $ude("export", "model", "*", "D:\myexports\myexport.xml", "keepopen=true")
vOut = $ude("export", "component", "*", "D:\myexports\myexport.xml", "keepopen=true;append=true")
lflush "myexport.xml"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [flush](flush.md)
- [Zip Files](../../../developmentadmin/dataexchange/concepts/zipfilesupport.md)
- [$ude export](../procfunctions/_ude_export.md)
- [$ude copy](../procfunctions/_ude_copy.md)


---

# lock

Lock the current occurrence in the database.

lock

## Return Values

Values Returned by lock in $status

| Value | Meaning |
| --- | --- |
| 0 | Occurrence is locked and can only be modified by the current process. |
| -1 | There is no active occurrence, or no entities are painted on the component. |
| -2 | Occurrence not found: table is empty. Occurrence removed since last retrieve. |
| -3 | The hit for the occurrence does not exist. |
| -5 | There is no hit for the occurrence or the occurrence is read-only (cannot be locked). |
| -10 | Occurrence has been modified or removed since it was retrieved; the occurrence should be reloaded. |
| -11 | Occurrence already locked. |

Values Commonly Returned by $procerror Following lock

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1 | <UGENERR\_ERROR> | An error occurred. For example, there is no active occurrence, or no entities are painted on the component. |
| -2 | <UIOSERR\_OCC\_NOT\_FOUND> | Occurrence or record not found; the table is empty or end of file was encountered. Occurrence removed since last retrieve. |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |

Other DBMS driver error codes can be returned in
certain circumstances; refer to the appropriate connector documentation for information about your
DBMS.

## Use

Allowed in all Uniface component types.

## Description

The lock statement locks the
database occurrence of the current occurrence. If the DBMS does not support database locking or if
it uses optimistic locking, the statement is ignored.

## Using lock

The following example uses
lock to lock a record, then uses the reload statement if the
record has been modified:

```procscript
;trigger: Lock

lock
if ($status = -10)
   reload
endif
```

## Related Topics

- [$dberror](../procfunctions/_dberror.md)
- [commit](commit.md)
- [read](read.md)
- [reload](reload.md)
- [rollback](rollback.md)
- [Lock](../triggersstandard/lock.md)
- [Read](../triggersstandard/read.md)
- [Database Connectors](../../../dbmssupport/dbmsdrivers/dbmsconnectors.md)


---

# lookup

Count the number of occurrences that match the current profile.

lookup

## Return Values

Values returned by lookup in $status

| Value | Meaning |
| --- | --- |
| >=0 | Number of hits that match the profile. |
| -1 | Record not found: end of file encountered. |
| -2 | Occurrence not found: table is empty. (The table or file has no occurrences.) |
| -3 | Exceptional I/O error (hardware or software). |
| -4 | Open request for table or file failed. The table or file is not painted, or it does not exist. |
| -15 | Uniface network error. |
| -16 | Network error: unknown. |

Values commonly returned by $procerror following lookup

| Value | Error constant | Meaning |
| --- | --- | --- |
| `-2` through `-12` | <UIOSERR\_\*> | Errors during database I/O. |
| `-16` through `-30` | <UNETERR\_\*> | Errors during network I/O. |

## Use

Allowed in all Uniface component types.

## Description

The lookup statement checks
the database for an occurrence of the current entity with the primary key values of the current
occurrence. If the complete primary key is not available, all field values are used. The number of
hits that match this profile is returned in $status. No data is transported and
the Read trigger is not activated. If you want to find the total number of occurrences in the
database of an entity, use clear before you use lookup.

**Note:**   A retrieve/o may be faster
than a lookup statement, and it also checks data in the component.

The following example uses the `lookup` statement to check if a record
with the number entered by the user already exists. The example assumes that INVOICE\_NUMBER is a
primary key.

```procscript
; trigger: Leave Field
; field : INVOICE_NUMBER
; if another record already has this number
; prevent user from leaving field

lookup
if ($status > 0)
   message "No! This number has been used before!"
   return (-1)
else
   message "I/O error %%$status"
endif
```

## Related Topics

- [$hits](../procfunctions/_hits.md)
- [clear](clear.md)
- [read](read.md)
- [selectdb](selectdb.md)
- [retrieve/o](retrieveo.md)


---

# lowercase

Convert a string to lowercase.

lowercase  Source, Target

## Parameters

* Source—content to convert
  to lowercase; can be a string, or a field (or indirect reference to a field), a variable, or a
  function that evaluates to a string.
* Target—destination of
  converted content; can be a field or variable that can accept a string value.

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

The lowercase statement
converts the contents of Source to lowercase, then places the result in
Target.

Conversion is on a character-by-character basis as
defined by Unicode.

**Note:**  Locale-based processing rules are not applies
when using lowecase. If this is desired, use $lowercase.

The following example converts the contents of $1
to lowercase:

```procscript
vString1 = "ABC"
lowercase vString1, vString2

; result: vString2 = "abc"
```

## Related Topics

- [uppercase](uppercase.md)
- [$lowercase](../procfunctions/_lowercase.md)
- [Case Conversion](../../datatypehandling/caseconversion.md)


---

# macro

Place structure editor input in the event input queue.

macro{/exit}  
String

## Switches

/exit—queues the structure
editor functions for the current form and returns control to the previous form. This switch cannot
be used to execute the structure editor functions and return control when the functions are
complete.

## Parameters

String—text to be placed in the
event input queue; it can be a string, or a field (or indirect reference to a field), a variable,
or a function that evaluates to a string. If a character code or mnemonic is used, it should be
preceded by a caret (^).

## Return Values

$status is set to
`9` after `macro ^ACCEPT` and to `10` after
`macro ^QUIT`.

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

The macro statement places the
structure editor functions indicated by the codes in String into the event input
queue. The functions are executed when the structure editor is activated. The
macro statement is used primarily in menu mode.

The character codes and mnemonics that can be used
with the macro statement are listed in the following table

In the following table:

* Numeric value—internal decimal value of the
  function. This value can be used in defining keyboard translation tables and in
  macro statements.
* Object—object for which the function is
  valid; a function is valid for the specified object, and its sub-objects. In order of priority:
  application, component, entity, and field.
* Associated triggers—abbreviated name of the
  trigger directly activated by the function.
* Purpose—general classification for the
  function.
* Action—what each function actually does when
  it is encountered in a valid context.

**Note:**  Field-level functions that navigate or insert
data (such as ^NEXT\_WORD, ^INS\_CHAR, and so on) work only in Unifields, not in edit box
widgets.

Structure Editor Functions

| Function | Numeric value | Object | Associated trigger | Purpose | Action |
| --- | --- | --- | --- | --- | --- |
| ^ACCEPT | ^127^009 | Component | ACPT | Session control | Activate Accept trigger; intended to end edit session for current form on a positive note. (See also ^QUIT.) |
| ^ADD\_OCC | ^127^044 | Entity | AIO | Data entry | Append a new occurrence after the current one, that is, at position `$curocc`+1.  When invoked by the macro statement, adds an occurrence to the first entity encountered in the form. |
| ^ATTRIBUTE | ^127^078 | Application | - | Text editing | Show or hide the session panel and Uniface toolbar, if defined. |
| ^BEGIN\_LINE | ^127^188 | Field | - | Navigation | Move the cursor to the beginning of the line. |
| ^BOLD | ^127^147 | Field | - | Text editing | Toggle bold character attribute. |
| ^BOTTOM | ^127^023 | Component | - | Navigation | Move the cursor to the window bottom. |
| ^BOT\_OF\_FORM | ^127^021 | Component | - | Navigation | Move the cursor to the form bottom. Only in character mode. |
| ^CHAR | ^255^001 | Field | - | Navigation or text editing | Move cursor as ^NEXT\_CHAR or ^PREV\_CHAR (depending on direction mode), or apply a composite function like REMOVE to a character. |
| ^CLEAR | ^127^012 | Component | CLR | Data entry | Activate Clear trigger (intended to clear all data from the form and hitlist without saving, or release primary key controls). |
| ^COMPOSE | ^127^088 | Field | - | Text editing | Activate the compose character facility |
| ^CURSOR\_DOWN | ^127^017 | Field | - | Navigation | Move the cursor down one line. |
| ^CURSOR\_FAST\_DOWN | ^127^026 | Field | - | Navigation | Move the cursor eight lines down. |
| ^CURSOR\_FAST\_LEFT | ^127^027 | Field | - | Navigation | Move the cursor eight spaces left. |
| ^CURSOR\_FAST\_RIGHT | ^127^028 | Field | - | Navigation | Move the cursor eight spaces right. |
| ^CURSOR\_FAST\_UP | ^127^025 | Field | - | Navigation | Move the cursor eight lines up. |
| ^CURSOR\_LEFT | ^127^018 | Field | - | Navigation | Move the cursor left one position. |
| ^CURSOR\_RIGHT | ^127^019 | Field | - | Navigation | Move the cursor right one position. |
| ^CURSOR\_UP | ^127^016 | Field | - | Navigation | Move the cursor up one line. |
| ^DETAIL | ^255^008 | Field  Entity | DTLF  DTLE | Services | Activate the Detail trigger for the current field or, if the trigger is empty, the entity. |
| ^END\_LINE | ^127^189 | Field | - | Navigation | Move the cursor to the end of the current line. |
| ^ERASE | ^127^008 | Component | ERAS | Database I/O | Delete all data currently in the component, both in the component and in the database. |
| ^FIELD | ^255^010 | Field | NFLD or PFLD (navigation only) | Navigation or text editing | Move cursor as ^NEXT\_FIELD or ^PREV\_FIELD (depending on direction mode), or apply a composite function like REMOVE to a field. |
| ^FIND\_TEXT | ^127^150 | Field | - | Text editing | Search for previously specified string or profile. (See also ^PROFILE.) |
| ^FIRST | ^255^067 | Field, entity | - | Navigation | Composite function, for use with objects like ^WORD and ^OCCURRENCE (but not with ^FIELD). |
| ^FIRST\_OCC | ^127^037 | Entity | None, but will activate OGF for first occurrence | Navigation | Move cursor to first promptable field of first occurrence in current entity; activate OGF for that occurrence. |
| ^FIRST\_TEXT | ^127^129 | Field | - | Navigation | Move cursor to beginning of text. |
| ^FONT | ^127^151 | Field | - | Text editing | Choose Uniface character set. |
| ^FRAME | ^127^089 | Field | - | Text editing | Run Define Frame form to define a frame. |
| ^HELP | ^127^092 | Field  Entity | HLPF  HLPE | Services | Activate the Help trigger for the current field or, if the trigger is empty, the entity. |
| ^HOME | ^127^022 | Component | - | Navigation | Move cursor to top of form window. |
| ^INSERT | ^255^071 | Field, entity | AIO, if the object is an occurrence | Text editing, data entry | Insert object specified (like ^WORD) in a composite function. When the object is ^OCCURRENCE, same as ^INS\_OCC; otherwise, insert contents of buffer for the object. |
| ^INS\_CHAR | ^127^184 | Field | - | Text editing | Insert character in the ^INS\_CHAR buffer. |
| ^INS\_FIELD | ^127^181 | Field | - | Text editing | Insert contents of the ^INS\_FIELD buffer. |
| ^INS\_FILE | ^127^180 | Field | - | Data entry | Insert file into current field. This is the same as the `fileload` Proc statement.  The upper limit for the number of characters that can be loaded into a field is 65536. This limit applies to both `fileload` and the structure editor function ^INS\_FILE. |
| ^INS\_LINE | ^127^182 | Field | - | Text editing | Insert the contents of the ^INS\_LINE buffer. |
| ^INS\_OCC | ^127^043 | Entity | AIO | Data entry | Insert a new occurrence before the current occurrence, that is, at position `$curocc`. |
| ^INS\_OVER | ^127^146 | Application | - | Text editing | Toggle Insert/Overstrike mode for unifields. |
| ^INS\_SELECT | ^127^195 | Field | - | Text editing | Insert contents of the ^INS\_SELECT buffer, or, if this is empty, the INS\_FIELD buffer. |
| ^INS\_TEXT | ^127^177 | Field | - | Text editing | Insert contents of the ^INS\_FIELD buffer. |
| ^INS\_WORD | ^127^183 | Field | - | Text editing | Insert contents of the ^INS\_WORD buffer. |
| ^ITALIC | ^127^148 | Field | - | Text editing | Toggle italic character attribute. |
| ^KEY\_HELP | ^127^072 | Application | - | Services | Keyboard layout help. |
| ^LAST | ^255^068 | Field, entity | - | Navigation | Composite function, used with objects like ^WORD and ^OCCURRENCE (but not with ^FIELD). |
| ^LAST\_OCC | ^127^038 | Entity | None, but will activate OGF for last occurrence | Navigation | Move cursor to first promptable field of last occurrence in current entity, activate OGF for that occurrence. |
| ^LAST\_TEXT | ^127^128 | Field | - | Navigation | Move cursor to end of text. |
| ^LINE | ^255^004 | Field | - | Navigation or text editing | Move cursor as ^NEXT\_LINE or ^PREV\_LINE (depending on direction mode), or apply a composite function like ^REMOVE to a line. |
| ^MENU | ^127^101 | Field  Entity | MNUF  MNUE | Services | Activate the <Menu> trigger for the current field or, if the trigger is empty, the entity. |
| ^MESSAGE | ^127^093 | Application | - | Services | Display the message frame. |
| ^NEXT | ^255^065 | Field, entity | - | Mode toggle or navigation | Set the direction mode (`$direction`) to Next, or, if specified with an object, a composite navigation function. |
| ^NEXT\_CHAR | ^127^142 | Field | - | Navigation | Move cursor to next character. |
| ^NEXT\_FIELD | ^127^046 | Field | NFLD | Navigation | Activate the Next Field trigger for the current field, or, if the trigger is empty, move cursor to next promptable field. |
| ^NEXT\_LINE | ^127^136 | Field | - | Navigation | Move cursor to beginning of next line. |
| ^NEXT\_OCC | ^127^039 | Entity | None, but will activate OGF for occurrence | Navigation | Move cursor to first promptable field of next occurrence in current entity, activate OGF for that occurrence. |
| ^NEXT\_TEXT | ^127^163 | Field | - | Navigation | Move cursor to beginning of the next text section that is not currently visible, below. |
| ^NEXT\_WORD | ^127^140 | Field | - | Navigation | Move cursor to beginning of next word. |
| ^OCCURRENCE | ^255^011 | Entity | None for navigation, AIO for add or insert, RMO for remove | Navigation or data entry | Give focus to next or previous occurrence (depending on direction mode), or apply a composite function like ^REMOVE to an object. |
| ^OCC\_WINDOW | ^255^015 | Entity | - | Navigation | Scroll the displayed occurrences up (in Next mode) or down (in Previous mode) by as many occurrences as are painted on the form for that entity. |
| ^PREV | ^255^066 | Field, entity | - | Mode toggle or navigation | Set the direction mode (`$direction`) to Previous, or, if specified with an object, a composite navigation function. |
| ^PREV\_CHAR | ^127^143 | Field | - | Navigation | Move cursor to previous character. |
| ^PREV\_FIELD | ^127^047 | Field | PFLD | Navigation | Activate the Previous Field trigger for the current field, or, if the trigger is empty, move cursor to previous promptable field. |
| ^PREV\_LINE | ^127^137 | Field | - | Navigation | Move cursor to beginning of previous line. |
| ^PREV\_OCC | ^127^040 | Entity | None, but will activate OGF for occurrence | Navigation | Move cursor to first promptable field of previous occurrence in current entity, activate the OGF trigger for that occurrence. |
| ^PREV\_TEXT | ^127^162 | Field | - | Navigation | Move cursor to beginning of the next text section that is not currently visible, above. |
| ^PREV\_WORD | ^127^141 | Field | - | Navigation | Move cursor to beginning of next word. |
| ^PRINT | ^127^098 | Component | PRNT | Services | Activate the Print trigger, or, if trigger is empty, run the Print form. |
| ^PRINT\_ATTRIBUTES | ^127^099 | Component | - | Services | Run the Print Job Model form. |
| ^PROFILE | ^127^087 | Field | - | Text editing | Define string or profile to search for with ^FIND\_TEXT function. |
| ^PULLDOWN | ^127^086 | Component  Application | - | Services | Activate a menu bar. In character mode, activate the component-level menu bar, if defined, or the application-level menu bar; toggle between menu bars if both are defined. |
| ^QUICK\_ZOOM | ^127^096 | Field | - | Services | Zoom current field to maximum zoom size in one step. |
| ^QUIT | ^127^010 | Component | QUIT | Session control | Activate Quit trigger (intended to end edit session for current form on a negative note, ignore modifications). |
| ^REFRESH | ^127^067 | Application | - | Services | Refresh the screen. (Character mode only.) |
| ^REMOVE | ^255^073 | Field, entity | RMO, if the object is an occurrence | Text editing, data entry | Remove the object specified (like ^WORD) in a composite function; all removed objects except for occurrences are written to ^INSERT buffers. |
| ^REM\_CHAR | ^127^172 | Field | - | Text editing | Delete character to right of cursor and write to ^INS\_CHAR buffer. |
| ^REM\_FIELD | ^127^166 | Field | - | Text editing | Remove the current selection (or the entire field if nothing is selected) to ^INS\_FIELD and ^INS\_SELECT buffers. |
| ^REM\_FILE | ^127^192 | Field | - | Text editing | Write contents of field to a file (this is the same as the `filedump` statement). |
| ^REM\_LINE | ^127^167 | Field | - | Text editing | Remove the current line (from right of cursor) to ^INS\_LINE buffer. |
| ^REM\_OCC | ^127^045 | Entity | RMO | Text editing | Remove the current occurrence. |
| ^REM\_SELECT | ^127^194 | Field | - | Text editing | Remove selected text to ^INS\_SELECT and ^INS\_FIELD buffers. |
| ^REM\_WORD | ^127^169 | Field | - | Text editing | Remove current word (from right of cursor) to ^INS\_WORD buffer. |
| ^RESET\_SELECT | ^127^196 | Field | - | Text editing | Turn off Select mode. |
| ^RETRIEVE | ^127^005 | Component | RETR | Database I/O | Activate Retrieve trigger. |
| ^RETRIEVE\_SEQ | ^127^003 | Component | RETS | Database I/O | Activate Retrieve Sequential trigger. |
| ^RUB\_CHAR | ^127^173 | Field | - | Text editing | Backspace (delete character to left of cursor). |
| ^RUB\_SEL\_CHAR | ^127^175 | Field | - | Text editing | Remove selected characters (using Backspace). |
| ^RULER | ^127^081 | Field | - | Text editing | Ruler definition (run Ruler form). |
| ^SAVE | ^127^179 | Field | - | Text editing | Write selected text to ^INS\_SELECT buffer. |
| ^SELECT | ^127^193 | Field | - | Text editing | Turn on Select mode. |
| ^SQL | ^127^097 | Application | - | Services | Run the SQL Workbench form. |
| ^STORE | ^127^011 | Component | STOR | Database I/O | Activate the Store trigger. |
| ^SWITCH\_KEY | ^127^100 | Application | SWIT | Services | Activate the Switch Keyboard trigger. |
| ^TEXT | ^255^009 | Field | - | Navigation or text editing | Move cursor as ^NEXT\_TEXT or ^PREV\_TEXT (depending on direction mode), or apply a composite function like ^REMOVE to text. |
| ^TEXT\_WINDOW | ^255^014 | Field | - | Navigation | Scroll text up or down, depending on direction mode. |
| ^TOP\_OF\_FORM | ^127^020 | Component | - | Navigation | Move cursor to the top of the form. Character mode only. |
| ^UNDERLINE | ^127^149 | Field | - | Text editing | Toggle underline character attribute. |
| ^USER\_KEY | ^127^091 | Component  Application | UKYS  UKYA | Services | Activate the User Key trigger for the current form, or, if the trigger is empty, the application. |
| ^VIEW | ^127^073 | Application | - | Text editing | Toggle View mode on or off. |
| ^WORD | ^255^003 | Field | - | Navigation or text editing | Move cursor as ^NEXT\_WORD or ^PREV\_WORD (depending on direction mode), or apply a composite function like ^REMOVE a word. |
| ^ZOOM | ^127^095 | Field | - | Services | Zoom the current field. |

**Note:**   If literal text or the contents of a variable
or field are used in the macro statement, they may not contain composed
characters or characters with attributes, for example, bold, underline, or italics. Only characters
in Uniface Font 0 should be used.

A macro statement does not
execute the functions supplied as its arguments. Instead, it places its arguments in the event
input queue. A macro that is triggered during execution of another
macro appends its arguments to those of the first macro,
which are already in the event input queue. This means that these arguments are executed after
those of the first macro are completed.

The following illustration shows a Form A with
Behavior = `Normal` and an accompanying Form B with
Behavior= `Menu`. Form B is started via the <Menu>
trigger of form A. When a macro statement is executed in B, the structure editor
makes form A active again, executes the functions specified by macro, then
reactivates B via the <Menu> trigger of A.

Normal form with Menu form

**Note:**   Filling the structure editor buffer with the
commands, rather than calling the structure editor to execute the commands, means that the
macro statement relies on the structure editor being started at some point in
the future. If this is not the case (for example, because there is a macro
statement in the Quit or Accept trigger of the first form), you have to run another form that
briefly starts the structure editor.

The macro statement performs
an implicit return 0. Consequently, any statements in the
trigger after a macro statement are ignored. If you need to place statements
after the macro statement, put the macro statement in an
entry Proc module, and call this module instead of using the
macro statement directly.

## Sending Character Codes to the Structure Editor

The following example sends the character codes for the ^RETRIEVE function to the
structure editor when the user starts to enter data in the field:

```procscript
; trigger: Start Modification
macro "^127^005"   ; this is the code for ^RETRIEVE
```

## Puting the Structure Editor into Zoom Mode

The following example puts the structure editor
into Zoom mode and inserts a salutation when the user enters a capital D
(`$char="D"` ):

```procscript
; trigger: Start Modification
if ($char = 68)   ; "D"
   if (GENDER = "M")
      $1 = "Mr."
   else
      $1 = "Ms."
   endif
   macro "^127^096ear %%$1 %%SURNAME, ^CURSOR_RIGHT"
endif
```

## Copying Contents of Message Frame to Time-Stamped File

The following example uses the
macro statement to copy the contents of the message frame into
$selblk. The contents of $selblk are then dumped to a
time-stamped file. The Proc to do this is in a single form, which can be run at any time
during the application, or once the application has ended.

This approach ensures that the structure editor is
always activated, and that the functions stored in the keyboard input buffer by the
macro statement are never ignored. The form contains a single dummy field; this
is all that is required for a successful edit session. The form uses component
variables, so the form can be used without fear of overwriting general variables ($1-$99).

```procscript
; trigger Exec
  ; Start structure editor
  edit DUMMY_FIELD
```

```procscript
; trigger Get Focus ; of DUMMY entity
  ; The space at the end of the macro string ensures that 
  ; the startModification trigger is activated
  macro "^MESSAGE^SELECT^TEXT^SAVE^ACCEPT "
```

```procscript
; trigger Start Modification ; of DUMMY_FIELD
  $TIME_NOW$ = $clock
  $MINUTES$ = $TIME_NOW$[n]
  $SECONDS$ = $TIME_NOW$[s]
  $HOURS$ = $TIME_NOW$[H]
  filedump $selblk,"MF%%$HOURS$_%%$minutes$.%%$SECONDS$"
  exit (1)
```

---

# message

Display the specified string in the message line of the startup shell.

message{/nobeep}{/error
| /warning | /info}  MessageText

message/clear  MessageText

message/hint  MessageText

## Switches

* /nobeep—the terminal does
  not beep when MessageText is displayed. This switch has no effect in the Web
  environment.
* /info,
  /warning, and /error—display the message in a dialog box that
  requires confirmation. In a GUI, these switches also display an icon showing the indicated
  severity. If you specify several levels of severity, the most severe switch of those specified is
  used.
* /clear—clears the message
  line. In GUI mode, the message line is cleared, but the history list for the message line is not
  changed. In character mode, the 'Busy' indicator is restored, if necessary.
* /hint—displays a message in
  the message line without logging it in the history list of the message line and without beeping. It
  is commonly used in the Field Gets Focus trigger to display hint information about the field.

## Parameters

MessageText—text to display;
can be a string, or a field (or indirect reference to a field), a variable, or a function that
evaluates to a string; maximum is 512 bytes.

## Return Values

None

## Use

message/error,
message/warning, and  message/info allowed in form and static
server page components (and in service and report components that are not self-contained).

message,
message/nobeep, message/clear, and
message/hint allowed in form, service, and report components.

## Description

The message statement sends
MessageText to the message line.

In GUI mode, the location and appearance of the
message line depends on the GUI in use. In character mode, the message line is defined as part of
the startup shell definition. On Windows platforms, the message line is visible at the bottom of
the startup shell (by default), but it is possible to hide or show it using the
messageline property. For more information, see [MessageLine](../../../development/reference/devobjproperties/startupshell/messageline.md).

If the message needs to be written to a log file,
use the $putmess statement and set $PUTMESS\_LOG\_FILE in the
assignment file.

In batch mode, all forms of the
message statement write the message directly to the screen or to a batch log
file, depending on your operating system settings. No user intervention is required.

## Web Applications

You can use message with the
switches /info, /error, or /warning to
display an alert box.
. The type of alert is not shown as an icon; instead, the message text is prefixed by the
type. For example:

**Tip:** 

For dynamic server pages, you can use the
webmessage statement, which supports icons and enables you to control the
size.

The following example displays the status code
with the message statement, if a store operation was
unsuccessful:

```procscript
; trigger: Store

if ($status < 0)
   message "Store error number %%$status."
   rollback
endif
```

## Related Topics

- [askmess](askmess.md)
- [clrmess](clrmess.md)
- [putmess](putmess.md)
- [webmessage](webmessage.md)
- [help](helpnative.md)


---

# moveocc

Move the field values of the current occurrence to another occurrence.

moveocc  Entity, OccurrenceNumber  {, FieldList}

moveocc/allfields  Entity, OccurrenceNumber

## Switches

/allfields—all the fields are
copied.

## Parameters

* Entity—entity name. Can be
  a string, or a field, variable, function, or parameter that evaluates to a string containing the
  name of the entity. It can also be an indirect reference to a field, where the target field
  evaluates to a string that contains the name of an entity. For example,
  `$selectlist(@$1)`, where `$1` contains `"FLD1"` and
  FLD1 contains `"INVOICES"`.

  If the Entity argument is
  omitted, the current entity is used.
* FieldList—a list of fields
  separated by a comma (,), which contains all fields to be moved to the specified occurrence. If no
  FieldList is provided, no fields are copied.
* OccurrenceNumber—number of
  the occurrence to which the current occurrence of the fields in the FieldList
  will be moved. OccurrenceNumber should be a constant, or a field (or indirect
  reference to a field), a variable, or a function that can be converted to a whole (integer) number;
  the value will be truncated to form an integer.

## Return Values

Values returned in $status

| Value | Description |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| >=0 | Statement was successful. The exact number equals the sequence number of the new current occurrence. |

Values returned by $procerror following moveocc

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1203 | <UPROCERR\_RANGE> | Value out of range. |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
|  | <UVALERR\_KEY\_\*> (-302, -303) | Key incorrect. |

## Use

Allowed in all Uniface component types except
static and dynamic server pages.

## Description

The moveocc statement moves
the fields of the current occurrence of Entity (whether they have been modified
or not) that are specified in the FieldList to the target
OccurrenceNumber. The target occurrence then becomes the new current occurrence
and the old current occurrence is deleted.

The Proc function $fieldmod is
set to value 1 (modified) for all fields copied to the target occurrence. Other
modification-related functions such as $occmod, $occdbmod,
$instancemod, and $instancedbmod are set to 1 (modified)
accordingly. Validation functions such as $keyvalidation,
$occvalidation, and $instancevalidation are also set to 1
(requires validation) accordingly.

## Moving Field Values to Another Occurrence

The following example moves the current values of the fields in the variable $FIELDS$
in entity, ENT, to the occurrence stated in `$result`.

```procscript
; find occurrence with same key
; update occurrence

operation uupdate ENT
params
   occurrence ENT :IN
endparams

findkey ENT
moveocc ENT, $result, $fields$

end ; end occurrence
```

## Related Topics

- [$fieldmod](../procfunctions/_fieldmod.md)
- [$occmod](../procfunctions/_occmod.md)
- [$occdbmod](../procfunctions/_occdbmod.md)
- [$instancemod](../procfunctions/_instancemod.md)
- [$instancedbmod](../procfunctions/_instancedbmod.md)
- [$keyvalidation](../procfunctions/_keyvalidation.md)
- [$occvalidation](../procfunctions/_occvalidation.md)
- [$instancevalidation](../procfunctions/_instancevalidation.md)


---

# newinstance

Creates a new instance of a component.

newinstance{/sync |
/async} {/attached}  
ComponentName`,` Handle |
InstanceName  {`,` InstanceProperties}

## Switches

* /async and
  /sync—specify the communications mode for the operation; that is, the operation
  communicates either synchronously or asynchronously. These switches cannot be used if you specify a
  Handle. See [Communication Modes](#section_301530EB5BFDC8DDA17F9817E5C5593C).
* /attached—attaches the new
  instance to the current component instance, that is, it becomes a child of the current (displayed)
  instance. See [Attached Instances](#section_64B984C2D7DF7EC322F6E958C50C9527).

## Parameters

* ComponentName—string, or
  field (or indirect reference to a field), variable, or function that evaluates to a string
  containing the component name.If ComponentName is a
  Uniface component, the string has a maximum length of 16 bytes. Otherwise, the string has a maximum
  length of 32 bytes.
* Handle—an empty variable of
  type `handle`. Uniface generates a handle to the instance that is unique within the
  application and stores it in that variable. See [Using Handles](#section_8FE3BBAA7D16DF434534878C6F3EC5BE).

  **Note:**  Handles cannot be used for asynchronous
  communication. Thus, they cannot be used for components that are started asynchronously, and they
  cannot be used for dynamic or static server pages. These must be activated using the component
  instance name.
* InstanceName—string, or
  field (or indirect reference to a field), variable, or function that evaluates to a string contain
  the instance name. The string has a maximum length of 32 bytes; trailing blanks are removed.See [Using Instance Names](#section_663708E933FEA80BE46F8B4CF91AFD14).
* InstanceProperties—string,
  or field (or indirect reference to a field), variable, or function that evaluates to a string that
  contains an associative list defining the properties for this instance. See [Component Instance Properties](#section_30372EEF7DA6751AB7770032FC1311B5).

## Return Values

Values returned in $status

| Value | Description |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| 0 | Component instance was successfully created. |

Values commonly returned by $procerror following newinstance

| Value | Error constant | Meaning |
| --- | --- | --- |
| -50 | <UACTERR\_NO\_SIGNATURE> | Signature descriptor for the current component not found (in ULANA.DICT, USYSANA.DICT, URR file, or resource file). For example, the component name provided is not valid.  Signature descriptor found, but an interface is missing or invalid. |
| -51 | <UACTERR\_SIGNATURE\_ID> | The identifier of the compiled component does not match the identifier in the signature descriptor (in ULANA.DICT, USYSANA.DICT, URR file, or resource file). |
| -58 | <UACTERR\_NO\_COMPONENT> | The named component cannot be found. |
| -154 | <UACTERR\_INSTANCE\_NAME\_EXISTS> | An instance with this name already exists.  This error code is returned, for example, in the following cases:   * When a modal form which is already   active is activated again * When an attempt is made to activate a   modal form from a non-modal form |
| -155 | <UACTERR\_CREATE\_INSTANCE> | An error occurred while creating an instance:  An unknown property occurs in the instance properties. A property in the instance properties has a value that is not valid. The component could not be loaded. An `exit` statement was executed in the operation `INIT`. |
| -166 | <UACTERR\_STATELESS> | Component instance could not be created by the `newinstance` statement because the component is stateless. |
| -1105 | <UPROCERR\_INSTANCE> | The instance name provided is not valid. for example, the argument contains incorrect characters. |
| -1106 | <UPROCERR\_COMPONENT> | The component name provided is not valid; for example, the argument contains an empty string (""). |
| -1110 | <UPROCERR\_TOPIC> | Topic name not known. |
| -1410 | <UPROCERR\_PROPERTY\_VALUE> | A property has been assigned an incorrect value. |

## Use

Allowed in all Uniface component types.

## Description

The newinstance statement
creates an instance of the component identified by ComponentName. When a
component instance name is specified it creates a new instance with that name.

When a handle is specified, the identifier of the
new instance is returned as a handle and all communication with the instance is done via the
handle. The reference count of the handle is 1 after the newinstance statement
is complete. The compiled component is loaded and added to the component pool. Control then returns
to the component that issued the newinstance statement.

By default, an instance is created as a
synchronous process.

Before creating the new instance, Uniface locates
a signature descriptor for ComponentName (in a resource file, URR file, or in
the descriptor information of the Repository). This information is used to create the new instance.

For Uniface components, the signature and
signature descriptor are created (and updated) automatically whenever the component is compiled.
For other types of component, such as 3GL components, you must use the Signature Editor to create
the signature and the compiled descriptor.

A component instance remains in the component pool
until one of the following situations occurs:

* The instance executes an
  `exit` statement.
* The ACCEPT or
  QUIT operation of an instance returns a nonnegative value.
* A `deleteinstance` statement naming the instance is executed.
* For an instance created using a handle, there
  is no longer a handle that refers to the instance.

Before an instance is removed, if it contains an
operation named CLEANUP, that operation is executed.

Using newinstance allows you to
start several instances of the same component, each known by its own instance name. If, for
example, the component is a service or report, assignments in the [SERVICES\_EXEC] or [REPORTS\_EXEC]
section of the assignment file determine if the instance is created on the client or server
machine. (Instances of form components are always created on the client machine.)

## Communication Modes

When the first instance of a component
is created, the communications mode for that component is determined; that is, the new instance and
all further instances of the same component run either synchronously or asynchronously. The
communication mode affects the execution as follows:

* If the new instance runs synchronously, each
  time an operation of the instance is activated, the component that requests the operation waits
  until the operation completes before proceeding.
* If the new instance runs asynchronously, the
  component that requests an operation does not wait for the operation to complete; it simply
  proceeds with its next Proc statement.

By default, an instance is created as a
synchronous process. You can override this by choosing setting the component's
Communication Default property to `Asynchronous`. This
information is included in the component descriptor.

You can override the information in the component
descriptor by using either the /sync or /async switch in the newinstance statement. Note that:

* The /async and
  /sync switches cannot be used if you specify a Handle, which
  is, by definition, a pointer to a synchronous instance.
* If one of these switches is used on the
  activate statement, it gets precedence over the switch on the
  newinstance statement and the component property as specified in the Signature
  Editor. If neither are present, the information in the component descriptor is considered.
* All form components run synchronously. The
  /sync and /async switches, and the Communication
  Default property is ignored.

## Attached Instances

The new instance is attached to the current
instance in the following circumstances:

* The window property Modality & Attachment for
  ComponentName is set to `Modal, Attached` or `Non-Modal,
  Attached`.

  When set to `Non-ModalDetached`, the new instance can be viewed as a child of the startup shell. In this case,
  the new, detached instance remains active until it exits itself or until the application exits.
* The `/attached` switch is used
  to create a child instance.

When `/attached` is used:

* If the current instance exits, the child
  instance and all other child instances that still exist are removed before the current instance
  exits.
* If the current instance is iconized, the child
  instance and all other child instances that still exist are also iconized. When the current
  instance is restored, all its child instances are restored with it.

**Note:**  The `/attached` switch has no
meaning in a trigger of the startup shell. In this case, all new instances can be considered as
attached to the application screen.

When using `/attached` in
client/server environments, note the following:

* Be careful when using
  deleteinstance on attached, remote instances that were created on a server, that
  is, with newinstance/attached. Although there is an implied advantage that you
  can use a single deleteinstance statement to delete many remote instances, the
  handles returned to the client become invalid. When one of these handle variables is assigned a new
  value, Uniface performs an implicit deleteinstance, because no other reference
  to the instance exists, which will fail with $procerror`-88`
  (instance already deleted).
* A similar problem can occur when a shared
  server has been started with a /maxidle or /maxreq switch and
  all the instances are deleted—the Uniface Router may shut down the server. If an invalid handle to
  a child instance exists, Uniface performs an implicit deleteinstance and the
  Router will log error messages such as:

  ```procscript
  err=-25: Problems handling request
  err=-25: Server gone
  ```

To avoid these problems, do not use attached
instances, or delete them before the parent is deleted (although this incurs extra network
traffic).

## Using Handles

If the following Proc code is used to create a new instance of the component
MYCOMPONENT, Uniface returns a unique identifier in `myHandle`:

```procscript
variables
   handle myHandle
endvariables
newinstance "MYCOMPONENT", myHandle
```

This identifier can be used to activate operations
of the component instance. For example:

```procscript
myHandle->myOperation(myParam)
```

If the argument that is specified in the position
of Handle or InstanceName is an empty generic variable, by
default, Uniface returns a handle in that generic variable. For example, if the following Proc code
is used to create a new instance of the component MYCOMPONENT, Uniface returns a unique identifier
in $1 of type handle:

```procscript
$1 = ""
newinstance "MYCOMPONENT", $1
```

This identifier can be used to activate operations
of the component instance. For example:

```procscript
$1->myOperation(myParam)
```

When the identification of a component instance
that is created in a Uniface server has to be returned to a client application, a handle must be
used:

On the server:

```procscript
operation createInstance
params
   handle myHandle : OUT
endparams
newinstance "COMPONENT", myHandle
end ; operation createInstance
```

And on the client:

```procscript
variables
   handle myHandle
endvariables
; Suppose that $handleToServerInstance$ is a handle to an instance living in a Uniface server.
; The createInstance operation creates a new instance on the server side.
$handleToServerInstance$->createInstance(myHandle)
; Do something with the instance
myHandle->someOperation(17);
; When finished remove the reference to the instance
myHandle = 0;
```

## Using Instance Names

Use component instance names when creating new dynamic or static server pages. For other
types of components, you are advised to use handles rather than component instance names.

If you specify an instance name, it can contain
letters (A-Z), digits (0-9), and underscores (\_); the first character must be a letter.

If you specify a variable or field containing an
empty string (""), Uniface generates a name for the instance that is unique within the application
and stores it in that variable or field. For example, if the following Proc code is used to create
a new instance of the component MYCOMPONENT, Uniface returns a unique identifier in
`vInstanceName`:

```procscript
variables
   string vInstanceName
endvariables
newinstance "MYCOMPONENT", vInstanceName
```

This identifier can be used to activate operations
of component instance. For example:

```procscript
activate vInstanceName.myOperation(myParam)
```

The instance name of an instance is valid only
within the context where it is created. This means that it is not guaranteed that when an instance
name is used in another context, the correct instance will be addressed. When instance
identifications need to be transferred between contexts, handles have to be used. Contexts can
include:

* All Uniface components in a client process.
* All Uniface components in one server.
* All component instances created with the C
  Call-in API.

## Component Instance Properties

Most instance properties are meaningful only for form components; they are ignored for
other component types.

Instance Properties

| Property | Form only? | Possible values | Default value, if omitted |
| --- | --- | --- | --- |
| [Display](../../../development/reference/devobjproperties/component/display_displayonly.md) | Y | `True` | `False` | `False` |
| [Dimension](../../../development/reference/devobjproperties/component/dimension.md) | Y | HorizPos, VertPos, HorizSize, VertSize | `0, 0, 0, 0` |
| [Query](../../../development/reference/devobjproperties/component/query.md) | Y | `True` | `False` | `False` |
| [Modality](../../../development/reference/devobjproperties/component/modality.md) | Y | `MODAL`, `NON-MODAL` | Determined by the component window property [Modality & Attachment](../../../_reference/guihelp/widget_property_forms/fields/modality_and_attachment.md). |
| [Transaction](../../../development/reference/devobjproperties/component/transaction.md) | N | `True` | `False` | `False` |
| [InitialFocus](../../../development/reference/devobjproperties/window/initialfocus.md) | Y | `True` | `False` | `True` |
| **Note:**  The following properties are only applicable to popup windows. For more information, see [Popup Window](../../../development/reference/devobjproperties/window/popupwindow.md). | | | |
| WindowType([Window Type](../../../development/reference/devobjproperties/window/windowtype.md)) | Y | `POPUP`, " " | None. |
| [FieldName](../../../development/reference/devobjproperties/window/fieldname.md) | Y | FieldName | Name of current field |
| [Position](../../../development/reference/devobjproperties/window/popupposition.md) | Y | `TOPLEFT_DOWNLEFT` | `TOPLEFT_UPRIGHT` | `TOPRIGHT_DOWNRIGHT` | `TOPRIGHT_UPLEFT` | `BOTTOMLEFT_DOWNRIGHT` | `BOTTOMLEFT_UPLEFT` | `BOTTOMRIGHT_DOWNLEFT` | `BOTTOMRIGHT_UPRIGHT` | `BOTTOMLEFT_DOWNRIGHT` |
| AutoClose([Auto Close](../../../development/reference/devobjproperties/window/autoclose.md)) | Y | `True` | `False` | `False` |
| [InheritWinProps](../../../development/reference/devobjproperties/window/inheritwinprops.md) | Y | `True` | `False` | `False` |

## New Instances of Stateless Components

You are not allowed to create an instance of a
component that is marked as `stateless` in the Signature Editor. An error is issued
if you do this. For more information, see [activate](activate.md).

## INIT and CLEANUP Operations

If the Operations trigger of the new component instance contains an operation named
INIT, the operation is executed before the new instance is created. Since the
new instance does not really exist at this point, the INIT operation should not
perform any action that involves the new instance. For example, it should not use
deleteinstance on the instance or activate for an operation
contained in the instance.

If the Operations trigger of the component
instance contains an operation named CLEANUP, that operation is executed as the
instance is removed (by an exit statement, by executing an
ACCEPT operation, or a deleteinstance statement, and so on).
Since the instance being deleted no longer exists at this point, the CLEANUP
operation should not perform any action that involves its own instance. For example, it should not
use deleteinstance on the instance or activate for an
operation contained in the instance.

The return values of INIT and
CLEANUP have no effect on further processing.

## Use of Functions

When referring to an instance created with newinstance, the following
functions return the requested information for the current instance:

* [$componentname](../procfunctions/_componentname.md)
* [$componenttype](../procfunctions/_componenttype.md)
* [$instancechildren](../procfunctions/_instancechildren.md)
* [$instancename](../procfunctions/_instancename.md)
* [$instanceparent](../procfunctions/_instanceparent.md)

The following functions return various
modification statuses associated with the instance:

* [$instancedb](../procfunctions/_instancedb.md)
* [$instancedbmod](../procfunctions/_instancedbmod.md)
* [$instancemod](../procfunctions/_instancemod.md)

When referring to a form created with
[run](run.md):

* [$formname](../procfunctions/_formname.md) returns an
  empty string (`""`).
* [$formdb](../procfunctions/_formdb.md),
  [$formdbmod](../procfunctions/_formdbmod.md), and
  [$formmod](../procfunctions/_formmod.md)
  return `-1`.

**Note:**  These functions are meaningful only in forms
started with the run statement.

## Creating and Deleting Instances

In the following example, the
Application Execute trigger starts a sequence of non-modal forms before
allowing the user to take control of the application. When control returns to
this trigger, the Proc code removes any detached instances that are still in
the component pool.

```procscript
; trigger: Application Execute

; start the initial forms
newinstance "form10",$1,"MODALITY=NON-MODAL"
newinstance "form20",$2,"MODALITY=NON-MODAL"
newinstance "form40",$3,"MODALITY=NON-MODAL"
; show them
$1->EXEC()
$2->EXEC()
$3->EXEC()
; let the user play
; control returns to me, so clean up any detached instances
getitem $1, $detachedinstances, 1
while ( $status > 0 )
   deleteinstance $1
   getitem $1, $detachedinstances, 1
endwhile
```

History

| Version | Change |
| --- | --- |
| 9.6.01 | Added instance properties for popup windows. |

## Related Topics

- [activate](activate.md)
- [deleteinstance](deleteinstance.md)
- [Handles](../../handles/handles2.md)
- [Attached Component Instances](../../handles/closingattachedinstances.md)
- [Component Memory Management](../../../howunifaceworks/processing/componentmemorymanagement.md)


---

# nodebug

Stop the character mode debugger, or, in the case of the interactive Debugger, return
focus to the application.

nodebug

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

The nodebug statement turns
off the character mode debugger. If you only want to activate the debugger for a specific trigger,
start the trigger with a debug statement and terminate the trigger with
nodebug.

The `nop` debugger instruction has
no effect on the nodebug statement. The `dump` and
`xtrace` Proc debugger instructions stop their processing when they encounter a
nodebug statement.

In the case of the interactive Debugger, the
nodebug statement returns focus to the application.

## Enabling and Disabling Debugging

The following example enables debugging and
starts an editing session, then, when the edit session is completed, exits debug mode:

```procscript
; trigger: Execute
; enter debug mode
; start editing session
; cancel debug mode when form is exited

debug
edit
nodebug
```

## Related Topics

- [debug](debug.md)
- [Debugging in Character Mode](../../../testinganddebugging/debugger/debuggingincharactermode.md)
- [dump](../../../testinganddebugging/debugger/charmodedebugger/debug_dump.md)
- [nop](../../../testinganddebugging/debugger/charmodedebugger/debug_nop.md)
- [xtrace](../../../testinganddebugging/debugger/charmodedebugger/debug_xtrace.md)


---

# numgen

Increment the value of the specified counter.

numgen  CounterName, Increment  {, LibraryName}

## Parameters

* CounterName—string that
  contains the name of a counter in LibraryName, or a field (or indirect reference to
  a field), a variable, or a function that evaluates to a string.
* Increment—constant, field,
  or variable that evaluates to an integer value from -2,147,483,648 through 2,147,483,647.
* LibraryName—string containing
  the name of the library to which CounterName belongs, or a field (or indirect
  reference to a field), a variable, or a function that evaluates to a string.

## Return Values

Values returned by numgen in $status

| Value | Meaning |
| --- | --- |
| 0 | Counter was successfully incremented; `$result` contains the new number. |
| -1 | The value of the counter went out of range, CounterName not defined, or Uniface was unable to access UOBJ.TEXT. |
| -2 | Increment was out of range. |

Values commonly returned by $procerror following numgen

| Value | Error constant | Meaning |
| --- | --- | --- |
|  | <UIOSERR\_\*> (-2 through -12) | Errors during database I/O. |
|  | <UNETERR\_\*> (-16 through -30) | Errors during network I/O. |
| -1108 | <UPROCERR\_COUNTER> | Uniface was unable to access UOBJ.TEXT or the counter is not defined. |
| -1203 | <UPROCERR\_RANGE> | Value out of range. The value of the increment or the generated counter is incorrect. |

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

The numgen statement generates
a unique number for a counter. This statement finds the current value of
Counter, increases it by Increment, and returns the resulting
value in $result.

Both the argument Increment
and the value generated for CounterName must be in the range -2,147,483,648
through 2,147,483,647, inclusive (that is, -2 31  through 2 31 -1).

If LibraryName is omitted, the
library SYSTEM\_LIBRARY is used. Libraries allow different projects to maintain their own set of
counters. (The current library is available in $variation.)

## Using Counters

Counters are global objects stored in UOBJ.TEXT,
which is accessed via the path $UUU. Since several users can update a counter at the same time,
locking problems can easily occur with UOBJ.TEXT occurrences if users wait a long time between
store actions.

To avoid locking problems, it is a good idea to
follow a numgen (or numset) statement with a `commit
"$UUU"` statement, if your DBMS supports this feature. If your DBMS does not support commit
and rollback actions, the new number is stored immediately.

(For consistency reasons, Uniface does not
automatically commit your counter. If there is a store error and the new number has not yet been
committed, that number is available for reuse after the rollback, which would
not be possible if you had immediately committed $UUU.)

## Generate Unique Sequence Numbers

The following example uses the `numgen` statement to generate unique
sequence numbers for a record:

```procscript
; trigger: Execute

numgen "INVOICE_NUMBER", 1, "COUNTER_LIB"
if ($status < 0)
   message "Error generating sequence number."
   rollback "$UUU"
   edit SEQNO
   done
else
   SEQNO = $result
   commit "$UUU"
   edit NAME
endif
```

## Generate an Invoice Number

The following example generates a new invoice number using `numgen` in
the Add/Insert Occurrence trigger. Placing the code in this trigger can result in the sequence
numbers being lost if the user does not store the data.

```procscript
; trigger: Add/Insert Occurrence
; Add occurrence
; Insert occurrence
; generate new invoice number
; set new invoice number

if ($rettype = 65)
   creocc "INVOICE", $curocc + 1
else
   creocc "INVOICE", $curocc
endif

numgen "INV_COUNT", 1, $variation
INV_NUM/init = $result
commit "$UUU"
```

## Related Topics

- [$result](../procfunctions/_result.md)
- [numset](numset.md)
- [$variation](../procfunctions/_variation.md)


---

# numset

Initialize the value of the specified counter.

numset  CounterName,  InitialValue  {, LibraryName}

## Parameters

* CounterName—string
  containing the name of a counter in LibraryName, or a field (or indirect reference
  to a field), a variable, or a function that evaluates to a string.
* InitialValue—constant,
  field, or variable that evaluates to an integer value. The integer must be in the range
  -2,147,483,648 through 2,147,483,647, inclusive (that is, -2 31  through 2 31-1).
* LibraryName—string containing
  the name of the library to which CounterName belongs, or a field (or indirect
  reference to a field), a variable, or a function that evaluates to a string. If
  LibraryName is omitted, the library SYSTEM\_LIBRARY is used. Libraries allow
  different projects to maintain their own set of counters. (The current library is available in
  $variation.)

## Return Values

Values returned by numset in $status

| Value | Meaning |
| --- | --- |
| 0 | CounterName was successfully initialized. |
| -1 | InitialValue was out of range, CounterName not defined, or Uniface was unable to access UOBJ.TEXT. |

Values commonly returned by $procerror following numset

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |
| -1108 | <UPROCERR\_COUNTER> | Uniface was unable to access UOBJ.TEXT or the counter is not defined. |
| -1203 | <UPROCERR\_RANGE> | Value out of range. The value of the counter or the initial value is incorrect. |

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

The numset statement
initializes CounterName to the value InitialValue. The
statement can be used to initialize counters that are used by the numgen
statement.

**Note:**   Before using the numset
instruction, be sure to read the  *Using counters*  section in the description of
numgen.

## Resetting a Counter

The following example resets the counter NUMBERCOUNTER in the library SALES\_LIBRARY to
0:

```procscript
; trigger: Detail

numset "NUMBERCOUNTER", 0,"SALES_LIBRARY"
commit "$UUU"
message "Counter %%NUMBERCOUNTER in SALES_LIBRARY set to 0."
```

## Related Topics

- [numgen](numgen.md)
- [$variation](../procfunctions/_variation.md)


---

# open

Open the specified DBMS or path, or connect to the Uniface Router.

open   `"`LogonParameters", `"` PathName{/net}`"`

LogonParameters are:

{HostName}|
{UserName}| {Password}
{| UST

Example: `open
"myhost:data1|fbaggins|theR1ng", "$MSS"`

## Parameters

Parameters

| Parameter | Data Type | Description |
| --- | --- | --- |
| LogonParameters | String | Information necessary to log on to the specified path.  {Name}| {UserName}| {Password} {|UST}  You can use LogonParameters to supply information that may be missing from the path, as defined in the assignment file. See [Supplying Logon Parameters](#section_603FB4C43A23483DB485C88ADF223047). |
| Name | String | Database name or DBMS network server name (for a DBMS connector), or host name or server name (for a network connector) |
| UserName | String | Logon name for the DBMS or Uniface Server. |
| Password | String | Password for the UserName |
| UST | String | Uniface Server Type as defined in the Uniface Router's assignment file urouter.asn |
| PathName | String | Name of a DBMS or network path, such as `$MSS` or `$DATA`, or $TCP , that is defined in the [PATHS] section of the application assignment file. The leading dollar sign ($) is required. |
| /net |  | Specifies that PathName is a TCP or TLS network path, and is treated as part of the PathName. It can only be used if the path definition in the assignment file also has the /net qualifier.  For the following path names, /net is implicit and does not have to be supplied for the path names: $DNP, $TCP, and $TLS.  Any path not recognized as a network path is assumed to be a DBMS path. |

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| `0` | The path was successfully opened. |
| `-1` | Path not found. The path is not specified in the assignment file or is used for parallel transactions. |
| `-3` | Exceptional I/O error (hardware or software). |
| `-4` | Open request for table or file failed. The table or file is not painted, or it does not exist. |
| `-9` | An attempt to open a DBMS failed. This may be because the maximum number of DBMS logons has already been reached, or PathName specifies a TCP or TLS path that is not defined in the assignment file. |
| `-16` | Network error: unknown. |

Values commonly returned by $procerror following open

| Value | Error constant | Meaning |
| --- | --- | --- |
| `-2` through `-12` | `<UIOSERR_*>` | Errors during database I/O. |
| `-16` through `-30` | `<UNETERR_*>` | Errors during network I/O. |
| `-1107` | `<UPROCERR_PATH>` | The path name is not correct or the path does not exist, for example, no assignment is found for the path. |

## Use

Allowed in all Uniface component types.

## Description

The open statement can be
placed in several different triggers. Typically, it might be placed in the
apStart trigger or the exec operation, when you know which database or databases will be
accessed in the course of the application, and want to allow the user to log on to them all at the
beginning.

The open statement (without the /net path qualifier):

* Logs on to the DBMS via the specified
  path.
* If path is already open, it performs an
  implicit close before logging on.
* If it is a TCP
  or TLS
  path, this may cause a Uniface Server to be started by the Uniface Router to which the
  TCP
  or TLS
  path leads.

When closing the connection , the database
connection is closed, but not the network connection. If the /net qualifier was
used to open the path, then closing the path will close the network connection.

With the /net qualifier, the
open statement only opens a connection to the Uniface Router, but does not start
a Uniface Server. When closing the connection, the network connection is closed.

The open statement can also be
used to connect to the Uniface Router for the purpose of receiving messages sent with
postmessage. To do so, specify `"$DNP"` as
PathName. The assignment file must define either a path called
$DNP, or $DEFAULT\_NET must be set. The user name and password
supplied in LogonParameters or the assignment file path are ignored. The user
name of the user running the Uniface application is used instead, and no password is sent. The user
name of the user running the Uniface application is used, and no password is sent, so .

## Supplying Logon Parameters

The [PATHS] section of the assignment file must
contain path definitions for the databases, Uniface Servers, and Uniface Routers that the
application needs to access. In addition, the assignment settings $DEFAULT\_NET
and $DEFAULT\_TCP\_HOST may be set to supply default network information.

At the very least, a path must contain the
connector name, but it may also include the parameters required to log on to the specified database
or server. For more information, see [Path-to-Connector Assignments](../../../configuration/asnsettings/path_to_driver_assignments.md).

Alternatively, logon information can
be supplied in the LogonParameters of the open statement.
However, the LogonParameters cannot specify a connector such as such as
`MSS:` or `TCP:`. This must be set in the assignment file.

For every path other than `$DNP`, any logon field specified in the assignment file takes precedence over one specified in the open string. For the $DNP path, it is the other way around.

The HostName,
ServerName, UserName, and Password
parameters can each be replaced by a question mark (`?`), or completely omitted for
those parameters where the path definition in the assignment file already provides a value.

If a logon parameter is provided in both the
assignment file and LogonParameters, the assignment file definition takes
precedence.

If a logon parameter is omitted or replaced by a
question mark in both places, the value provided by the $DEFAULT\_NET assignment
setting is used. If $DEFAULT\_NET does not supply a host name, the value of
$DEFAULT\_TCP\_HOST is used. If this setting is not present, the system will be
asked for the local hostname.

**Note:**  For security purposes, you can obfuscate or
encrypt the complete connection string using the Pathscrambler
utility. For more information, see [pathscrambler.exe](../../../_reference/executables/pathscrambler_exe.md) and [Encrypting Paths and Other Sensitive Data Using PathScrambler](../../../security/pathscrambler/scramble_username_and_password_in_path_definitions_using_pathscrambler_exe.md).

## Connecting to a Database

The following example shows how to open an Oracle
database for user `scott`, with a password of `tiger`. The path $ORA
corresponds to a default path established at installation.

```procscript
open "|scott|tiger", "$ora"
```

## Connecting to a Network Node

The following example shows how to open network
connections for the node SalesHost. The path $SALES/NET corresponds to a path defined in the
assignment file and leading to a network driver.

```procscript
open "SalesHost|user|pass","$sales/net"
```

## Connecting to the Uniface Router

For example, the following example connects to
the Uniface Router with `HR` as server type (UST) on the `$DNP` path.

```procscript
open "AdminServer|||HR","$DNP"
```

## Related Topics

- [close](close.md)
- [$DEFAULT_NET](../../../configuration/reference/assignments/_default_net.md)
- [$DNP](../../../configuration/reference/assignments/_dnp.md)
- [Define Uniface Server Types (USTs)](../../../middleware/urouter/configuringunifacerouter/define_the_ust_for_a_uniface_application_server.md)


---

# operation

Declare an operation Proc module.

```procscript
{public | partner} operation  OperationName | PredefinedOperationName
   {public soap}
   {public web | partner web }
   {ScopeBlock}  ; DSPs only
   {ParamsBlock}
   {VariablesBlock}

   Your Proc code
   {end}
```

## Qualifiers

Qualifiers

| Qualifier | Description |
| --- | --- |
| public | Includes the operation in the component signature so that it can be invoked from an external component by an activate statement; default |
| partner | Excludes the operation from the signature; it can only be invoked from within the component itself. |
| public soap | Operation can be called from a SOAP client when used in Service components, DSPs, and USPs. For more information, see [public soap](public_soap.md). |
| public web | Operation can be called from a web browser, RESTful service, or other web client when used in DSPs, USPs, and Service components. For more information, see [web](web.md). |
| partner web | In DSPs only, operation cannot be called from a web client, but data in the scope block can be included in the request-response exchange with other operations or triggers. |

## Parameters

Parameters

| Parameter | Data Type | Description |
| --- | --- | --- |
| OperationName | Literal | Literal name of the operation; maximum length of 32 bytes. The characters can be letters (A-Z), digits (0-9), and underscores (\_), and must begin with a letter (A-Z). |
| PredefinedOperationName | Literal | One of the following predefined operations, which define component behavior in specific circumstances:   * Init—executed when a component   instance is created with newinstance or activate. * Cleanup—executed when a component is   removed * Attach—executed when a contained DSP   is attached to a parent DSP * Detach—executed when an attached child   DSP is detached from its parent. |
| ScopeBlock | Literal | Specifies the data to be included in a DSP request-response exchange. For more information, see [scope](scope.md). |
| ParamsBlock | Literal | Defines the operation's parameters.For more information, see [params](params.md). |
| VariablesBlock | Literal | Defines the local variables used by the operation. For more information, see [variables](variables.md). |

## Return Values

The operation declaration
itself does not return a value. However, you can use the return statement to
have the operation return a value in $status.

## Use

Allowed in all Uniface component types.

## Description

The operation block defines an
operation that can be called by an activate statement. It acts as an implicit
end for the previous operation or Proc module. It can be used only in the
Operations trigger.

By default, an operation is
public, meaning that it can be activated by other components. If you want it to
be accessible only within the component, you must declare it as partner.

If you define scope, parameters, or variables for
the operation, they should be declared in that order—first the scope block,
followed by the params block, and then the variables.

## Operation Names

When specifying the operation name:

* Do not enclose the name in double quotation
  marks (").
* Do not use the names Exec,
  Accept, and Quit. (These are predefined operations that are
  implemented in the triggers Execute, Accept, and Quit, respectively).
* Do not define operations named
  ABORT or COMPLETE, because these are reserved for future use.

## Operations on the Web

When operation is used in a
DSP:

* Use the public web
  declaration if you want the operation to be activated from a web browser or RESTful web service.
  When used in services and USPs, the assignment file must contain the
  $REQUIRE\_PUBLIC\_DECL setting when the component is compiled.
* Use the public soap
  declaration if you want the operation to be activated by a SOAP-based client. In this case, the
  assignment file must contain the $REQUIRE\_PUBLIC\_DECL setting when the component
  is compiled.
* In DSPs, use the partner
  web statement if the operation is to be referenced by scope definitions of triggers or
  other operations that are themselves declared as public or
  partnerweb.
* In DSPs, Use a scope
  definition to define the data that will be included in the request-response exchange between the
  client and the server. If omitted, the scope is assumed to be both `input` and
  `output`, meaning that all data in the DSP will be included in both the request and
  the response.

Activating operations from the browser initiates a
request-response cycle, since operations can only be executed on the server. To execute an
operation on the browser, it must be defined with the weboperation command.

If an operation is defined with
the same name as the weboperation, the last one defined is the one that is
used.

## Defining an Operation

The following example shows the operation
`DISCOUNT`, defined in the Operations trigger of a service component named SERV1:

```procscript
; Operations trigger of service SERV1
operation DISCOUNT
params
   string CUSTID : IN
   numeric AMOUNT : INOUT
   numeric PERCENTAGE : OUT
endparams
; no discount till proven otherwise
; 20% discount for Uniface
; 15% discount for Acme
; adjust amount
PERCENTAGE = 0
if ( CUSTID == "ufbv" ) PERCENTAGE = 20
if ( CUSTID == "acme" ) PERCENTAGE = 15
AMOUNT = AMOUNT * ( 100 - PERCENTAGE) / 100
end
```

The operation `DISCOUNT` could be
referenced from another component as follows:

```procscript
activate "SERV1".DISCOUNT (ID.CUST, TOTAL.INVOICE, $DISCOUNT$)
```

## Calling an Operation Recursively

The following example shows the operation
FACTORIAL, defined in the Operations trigger of a service component named CALCULATOR:

```procscript
operation FACTORIAL
params
   numeric N : IN
   numeric F : OUT
endparams
variables
      numeric W
endvariables

if ( N > 1 )
   W = N - 1
   activate "calculator".FACTORIAL (W, F)
   F = N * F
else
   if ( N = 1 )
      F = 1
   else
      F = 0
   endif
endif

end ; operation FACTORIAL
```

## Related Topics

- [Operations](../triggersstandard/operations.md)
- [$REQUIRE_PUBLIC_DECL](../../../configuration/reference/assignments/_require_public_decl.md)
- [return](return.md)
- [weboperation](weboperation.md)
- [Public and Partner Operations](../../public_and_partner_operations.md)
- [Init](../predefinedoperations/init.md)
- [Cleanup](../predefinedoperations/cleanup.md)
- [Attach](../predefinedoperations/attach.md)
- [Detach](../predefinedoperations/detach.md)


---

# params

Define the parameter block for an operation, entry, or global Proc.

```procscript
params
   DataType                  ParamName            : Direction
   {DataType}                Field.Entity{.Model} : Direction
   {DataType}                $ComponentVariable$  : Direction
   {byRef} | {byVal} struct  ParamName            : Direction
   entity                    Entity{.Model}       : Direction
   occurrence                Entity{.Model}       : Direction
   xmlstream [DTD:DTDName]   ParamName            : Direction
endparams
```

## Parameters

* DataType—a Uniface data
  type. For more information, see [Uniface Data Types](../../proclanguage/unifacedatatypes.md).
* ParamName—string has a
  maximum length of 32 bytes, including letters (A-Z), digits (0-9), and underscores
  (`_`); the first character must be a letter.
* Direction—direction for the
  parameter with respect to the operation; one of IN (input only),
  OUT (output only), or INOUT (input and output). If a
  parameter is defined as OUT, its value at the start of the operation cannot be
  predicted.
* byRef—the Struct data is
  passed *by reference*, so only a memory pointer is passed, not the actual data.
* byVal—the data is passed
  *by Value*, so it is copied before being passed.
* Entity—name of a model
  entity (either database or non-database) that is painted on the component. On both the
  activate statement for this operation and in the params
  block, the corresponding entity parameters must represent the same entity, that is, the entity
  itself or one or its subtypes.
* ComponentVariable—name of a
  component variable that is defined in the component
* Model—literal name of
  the model to which the entity belongs.
* DTDName—string or component
  constant that evaluates to the name of the DTD that defines the structure of XML stream variables.
  DTDName has the format:

  DTDName{.LitModelName}

  DTDName is the literal DTD
  name defined in the application model specified by LitModelName.

## Return Values

None

## Use

Allowed in all Uniface component types, and in
global Proc modules. The maximum size of a parameter can be 10 MB.

## Description

The params statement defines
the formal parameters for an operation, an entry (either a global or local Proc module), or a
global Proc. A maximum of 64 parameters can be defined. When the operation or entry is referenced
in an activate or call statement, the arguments provided on
that statement must match this list of parameters in number and in type.

The parameter block defined by
params can occur in any of the following places:

* The first statement following an
  operation statement in the Operations trigger
* The first statement in the Execute trigger
  (for an EXEC operation) in all components except dynamic server pages
* The first statement following an
  entry statement in an entry module
* The first statement of a global Proc module

If no parameters are required, the
params block is not required. If a variables block is
present, it should immediately follow the params block, or the
operation statement, if no parameters are defined.

## Struct Parameters

The content of a struct
parameter is not a Struct, but zero or more *references* to Struct nodes, just as it is
for struct variables. This is in contrast to scalar data types such as
string. References are memory pointers so it is only possible to pass them
between Proc modules that share the same memory. This is always the case for partner operations and
entries, but may not be the case for public operations.

For this reason, the default behavior is to pass
Struct parameters by reference in partner operations and entries, and by value in public
operations. When passed by reference, the parameter passes a copy of the reference to the called
entry or operation, so an additional reference to the same struct is created. When passed by value
(the default for public operations), a copy of the Struct is made and this can have consequences
when the data is returned.

It is possible to override the default behavior
by explicitly defining how Struct parameters are passed using the byRef or
byVal qualifiers. This can be useful if you know that the calling and receiving
component instances are running in the same process.

If neither the byRef nor the
byVal qualifiers are used, the default behavior depends on whether the parameter
is declared in a public operation or not. However, because of the functional difference between the
two, it is advisable to explicitly specify the intended qualifier.

If an operation with a `byref`
struct parameter is activated in a component running in a different process, this will result in
the following error:

`-73``<ACTERR_REMOTE_NOT_SUPPORTED> "Operation with byref-Struct parameter cannot be
activated across processes"`

The way that Structs are passed has implications
for the way in which the data is synchronized. For more information, see [Struct Parameters](../../structs/structparameters.md).

## Entity and Occurrence Parameters

entity and
occurrence parameters are known as *constructed* parameters. An
entity parameter transfers all occurrences of the specified entity from one component to the other
component. An occurrence parameter transfers the current occurrence of the specified entity from
one component to the other component.

On each call to the operation, an implicit
creocc is performed to set aside sufficient memory for the occurrence parameter.
The call does not release the memory implicitly, but the memory can be cleared by clearing the data
in the component entity that was created (or rather 'copied'?) by the call.

**Note:**  Constructed parameters cannot be used in entries
(global or local Proc modules) and in global Procs.

* If the entity parameter has direction
  `IN` or `INOUT`, when the operation starts, an implicit
  clear/e statement for that entity is performed in the component instance before
  the occurrences are filled with the data being transferred.
* If the entity parameter has direction
  `OUT` or `INOUT`, when the operation returns, an implicit
  clear/e statement for that entity is performed in the requesting component
  instance before the occurrences are filled with the data being returned. This is followed by a
  release/e/mod statement for the entity.
* If the occurrence parameter has direction
  `IN` or `INOUT`, when an operation starts, the current occurrence of
  the requesting component becomes the new occurrence in the requested component (such as an entity
  service).
* If the occurrence parameter has direction
  `OUT` or `INOUT`, when the operation returns, the current occurrence
  of the requested component becomes the new occurrence in the requesting component.

**Note:**   If a component is activated asynchronously (for
example, with the /async switch on the newinstance
statement), you should not activate an operation that contains a parameter with the direction
`OUT` or `INOUT`.

## XML Stream Parameters

xmlstream parameters contain
XML data, which can be transferred between the parameter and the component's external data
structure by Proc statements, using xmlsave and xmlload.
For more information, see [xmlsave](xmlsave.md) and [xmlload](xmlload.md).

## Scope of Parameters

An entity, occurrence, field, or component
variable parameter is defined at the component level. The values of these parameters are
component-wide in scope; that is, the values are available to all operations and modules in the
component.

A named parameter exists only in the operation or
module in which it is defined. Its scope is limited to that operation or module. It cannot be
directly referenced from another operation or module in the component, or from a local or global
Proc called by the operation or module. If a named parameter has the same name as a field defined
in the component, the parameter takes precedence over the field; to access the field, you must use
the qualified field name.

For example, consider a component that contains a
field named DATE in the entity PO. The operation TODAY has a named parameter, DATE. To update the
field DATE in the operation TODAY, the field must be referenced by its qualified name, including
its entity:

```procscript
operation TODAY
params
   date DATE : OUT
endparams
DATE = $date ;assign the current date to parameter DATE
DATE.PO = $date ;assign the current date to field DATE.PO
end ; operation TODAY
```

xmlstream parameters have the
same scope as named parameters. However, the data in an XML stream is not accessible to Uniface
until the data has been loaded into the component's external data structure, which is accessible by
all Proc modules in the component.

struct parameters have the same
scope as named parameters. Unlike other named parameters, which contain data, a
struct parameter contains only a reference to a Struct. The Struct itself is
unaffected by the scope of the struct parameter. Thus, when the operation or
entry completes, the reference to the Struct no longer exists, but the Struct itself remains (as
long as any variable refers to it).

## Defining an Operation

The following example shows the operation
`DISCOUNT`, defined in the Operations trigger of a service component named SERV1:

```procscript
; Operations trigger of service SERV1
operation DISCOUNT
params
   string CUSTID : IN
   numeric AMOUNT : INOUT
   numeric PERCENTAGE : OUT
endparams
; no discount till proven otherwise
; 20% discount for Uniface
; 15% discount for Acme
; adjust amount
PERCENTAGE = 0
if ( CUSTID == "ufbv" ) PERCENTAGE = 20
if ( CUSTID == "acme" ) PERCENTAGE = 15
AMOUNT = AMOUNT * ( 100 - PERCENTAGE) / 100
end
```

The operation `DISCOUNT` could be
referenced from another component as follows:

```procscript
activate "SERV1".DISCOUNT (ID.CUST, TOTAL.INVOICE, $DISCOUNT$)
```

History

| Version | Change |
| --- | --- |
| 9.6.02 | Added byref and byval keywords for struct parameters |

## Related Topics

- [entry](entry.md)
- [operation](operation.md)
- [variables](variables.md)
- [$subsetreturn](../procfunctions/_subsetreturn.md)
- [Proc: Data Types](../procdatatypes/datatypes.md)


---

# perform

Call the specified 3GL function.

perform{/noterm}  
`"`{`_`}Lit3GLFunctionName`"`

## Switches

/noterm —the following
sequence of processing is performed:

1. Keyboard input driver and
   \*busy\* indicator are disabled.
2. Keyboard setup is reset to its original
   value.
3. Lit3GLFunctionName is
   performed.
4. Keyboard is set to application mode.
5. Input driver and \*busy\*
   indicator are enabled.

## Parameters

* Lit3GLFunctionName—literal
  name of the 3GL function to call.
* \_ (underscore)—puts the
  Lit3GLFunctionName in the dispatch list in lowercase characters (without the
  underscore). In this case, Lit3GLFunctionName can contain up to 15 characters.

  Otherwise,
  Lit3GLFunctionName is put in the dispatch list in uppercase characters and
  Lit3GLFunctionName can contain up to 16 characters.

## Return Values

Values returned in $status

| Value | Description |
| --- | --- |
| -1 | An error occurred. $procerror contains the exact error. |
| >=0 | Value returned by Lit3GLFunctionName. (Since Uniface expects -1 to be an error, it is not a good idea to return that value from the 3GL function.) |

Values returned in $procerror following perform

| Value | Symbolic error | Meaning |
| --- | --- | --- |
| -1121 | <UPROCERR\_3GL> | The requested 3GL function was not found. |

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

**Note:**  The perform statement has
been superceded by activate for C call-out. For more information, see [Call-Out to 3GL](../../../integration/3gl/concepts/call_out_to_3gl/call_out_to_3gl_intro.md) and [Call-Out Using activate](../../../integration/3gl/concepts/call_out_to_3gl/call_out_using_activate.md).

The perform statement calls
the specified 3GL Lit3GLFunctionName. A 3GL function can access and modify
variables, fields, and occurrences in the form.

**Note:**   Any 3GL function that you call with
perform should be declared to return a `long` value (in C).

Although perform "%%variable"
is accepted by the Proc compiler, it is not substituted at run time.

## Function Name Limitations

The name of the
Lit3GLFunctionName can up to 15 or 16 characters, depending on whether you use
an underscore to change the case of the function name. You cannot combine uppercase and lowercase
in a function name.

The limits on the length of
Lit3GLFunctionName are Uniface limitations and do not imply that the linker can
handle functions of this length.

## Calling a 3GL Function

The following example calls the 3GL function `stringcheck`:

```procscript
; trigger: Leave Field

if ($fieldendmod = 0)
   done
endif
perform "_stringcheck"
```

## Related Topics

- [Call-Out Using perform](../../../integration/3gl/concepts/call_out_to_3gl/call_out_using_perform.md)


---

# postmessage

Send a message from one component instance to another.

postmessage  Destination, MessageId, MessageData

The Destination is of the
form: {NetworkConnectionString:}InstanceName

The NetworkConnectionString is of the form:

NetworkMnemonic`:` { HostId
}{`+`PortNumber}
`|`UserName`|``|`SymbolicName:InstanceName

## Parameters

* Destination—string
  defining the component instance that will receive the message, or a field (or indirect reference to
  a field), a variable, or a function that evaluates to the string.

  + NetworkConnectionString—network
    connector string to the application running the target instance. If omitted,
    InstanceName is assumed to be in the current application.
  + InstanceName—name of an
    instance in the component pool.
  + NetworkMnemonic—
    three-letter connector code; `TCP` or `TLS`
  + HostId—host name or IP
    address where the Uniface Router is running. If omitted, the default is `localhost`
    ( the current machine). The format of HostID determines the TCP protocol version
    to be used. For more information, see [Host Identification for TCP/IP and TLS](../../../networksupport/tcp/tcphostidentification.md).
  + PortNumber—port number
    on which the Uniface Router is listening. If omitted, the default value is `13001`.
  + UserName—user name
    under which the target application is running
  + SymbolicName—application identifier of an application registered with the
    Uniface Router
* MessageId—string
  containing an identifier for the message which must contain at
  least one non-blank character and be no more than 32 characters in total.
* MessageData—a string that contains the data sent with the message. The amount of data that can be
  sent is limited only by the memory resources available on the machines.

## Return Values

Values returned by postmessage in $status

| Value | Meaning |
| --- | --- |
| 0 | Message for InstanceName successfully placed in event queue; this does not mean that the message was actually delivered, only that it has been posted. |
| -2 | InstanceName is not correct: field or variable not found, or the string is not a valid instance name. |
| -3 | MessageId is not correct: field or variable not found, or the string is not a valid message identifier. |

Values commonly returned by $procerror following
postmessage

| Value | Error constant | Meaning |
| --- | --- | --- |
|  | <UNETERR\_\*> (-16 through -30) | Errors during network I/O. |
| -57 | <UACTERR\_NO\_INSTANCE> | The named instance cannot be found in the component pool. For example, the name is an empty string (""). |
| -159 | <UACTERR\_QUEUE> | Message could not be delivered to requested queue. |
| -1105 | <UPROCERR\_INSTANCE> | The instance name provided is not valid. For example, the argument contains incorrect characters. For more information, see [newinstance](newinstance.md). |
| -1107 | <UPROCERR\_PATH> | The path name is not correct or the path does not exist, for example, no assignment is found for the path. |
| -1111 | <UPROCERR\_MESSAGE> | The message identifier is not valid; the field or variable was not found, or the string is not a valid message identifier. |

## Use

Allowed in all Uniface component types.

## Description

The postmessage statement
sends a message to the specified component instance, which may be running in any process that has
registered with a Uniface Router. It is typically used for asynchronous communication between
component instances running in the same or in a different process. For example, it can be used for
communication between master and detail component instances, or to a remote service.

**Tip:** 

The postmessage command is
intended for asynchronous communication. If you need synchronous communication, you should use the
activate statement.

Unlike the activate command,
the postmessage command does not automatically create a new instance. The
receiving instance must already exist; postmessage just posts the message to an
event queue of the receiving instance.

For more information, see [Asynchronous Messaging](../../../middleware/asynchmessaging/asynchmessaging_intro.md).

## Message Queuing and Dispatching

When a postmessage statement is
encountered during Proc execution, the presence or absence of an InstancePath in
the Destination parameter determines how the message is handled:

* If a NetworkConnectionString is
  specified in the Destination, the message is first sent to the Uniface Router,
  which then dispatches it to the specified component instance. This may be a remote component
  running in a Uniface Server, a component running in a different application, or a component running
  in the same application as the sending instance.

  Communication is always asynchronous,
  regardless of whether the messages are handled in-process or by the Uniface Router.
* If NetworkConnectionString is omitted,
  the receiving instance is assumed to be in the same process.

  In a client application, the message is placed
  in the Uniface message queue and delivered to the target component instance when the current Proc
  module or keystrokes are finished.

  In a Uniface Server, the message is converted
  to a synchronous `send` message. This is because the Uniface Server does not have
  the queuing functionality provided by the structure editor or the Uniface Router.

  **Note:**  A UTIMER component running in a Uniface
  Server actually runs in a separate thread from the main `userver` process, so this
  behavior is not applicable. For more information, see [UTIMER](../../../_reference/componentapis/timeroperations/utimer_product_component.md).

**Note:**   When a postmessage statement
is encountered in the Debugger, it is also treated synchronously, and the Asynchronous Interrupt
trigger of the target instance is activated immediately.

## Message Reception

When the message reaches the top of the input
queue, the Asynchronous Interrupt trigger associated with receiving component is activated. This
may be the component-level trigger or the application-level trigger.

* The component-level Asynchronous Interrupt
  trigger of the target instance is activated if it contains Proc code.
* The application-level Asynchronous Interrupt
  trigger is activated if the component-level trigger is empty, or if the specified target instance
  is not found. The application is the one that is the target of NetworkConnectionString.
* If the application-level trigger is empty,
  there is no further action.

The sending instance does not automatically
receive an acknowledgment that the message has been received. If this behavior is required, an
acknowledgment must be explicitly returned by the receiving instance. For example:

```procscript
; Asynchronous Interrupt trigger 
postmessage $msginfo("SRC"),"MSG001", %\
"Reply to sender: message received."
```

## Message Content

When an Asynchronous Interrupt trigger is
activated by postmessage, the $result Proc function contains
the string `"message"` and the function $msginfo contains
MessageId, MessageData, and other information about the
message.

The information returned in
$msginfo is available using the individual functions
$instancename, $instancepath, $msgdata,
$msgdst, $msgid, and $msgsrc.
For more information, see [$msginfo](../procfunctions/_msginfo.md).

## Communicating Between Master List and Detail Forms

A common construction in client applications is a
parent component that displays a list of records, which has child components the enable the user to
create new records or update existing ones. In the following example, the parent component
(RCP\_LIST) can have multiple non-modal child component instances of RCP\_UPDATE (and RCP\_NEW).

Master Form with Two Non-modal Forms

When a store is performed in one of the child
instances, it uses postmessage to notify RCP\_LIST that the recipe has been
updated:

```procscript
; trigger: Store of RCP_UPDATE
store
if ($status <0)
   message $text(1500)
   rollback
   commit
else
   if ($status = 1)
     message $text(1723
   else
      commit
      if ($status < 0)
        rollback
        commit
      else
        message $text(1805)
; Statements added to default Store trigger:
        postmessage "RCP_LIST", $componentname, RCP_NR.RECIPES 
        setformfocus "RCP_LIST" 
     endif
  endif
endif
```

1. Send a message to RCP\_LIST with the name of
   the current component as MessageId, and the primary key of the updated record
   (RCP\_NR.RECIPES) as the MessageData.
2. Return focus to the list of recipes so that
   the user can quickly select another to edit.

The Asynchronous Interrupt trigger of RCP\_LIST
handles messages from the instances and updates the list of recipes:

```procscript
; trigger: Asynchronous Interrupt of RCP_LIST
RCP_NR = $msgdata 
if ( $msgid = "RCP_UPDATE" ) 
   reload/nolock "RECIPES"
endif
if ( $msgid = "RCP_NEW" ) 
   retrieve/x "RECIPES"
endif
if ( $msgid = "RCP_UPDATE" | $msgid = "RCP_NEW") 
   sort "RECIPES", "RCP_NAME:A"
   retrieve/o "RECIPES"
endif
```

3. Assign the record number provided in the
   message data to the RCP\_NR field to use as the search profile.
4. If the sender was an instance of RCP\_UPDATE,
   RPC\_LIST, reload the data
5. If the sender was an instance of RCP\_NEW,
   retrieve the new data
6. In either case, sort the data and make the
   updated or new occurrence the current one

## Related Topics

- [$instancename](../procfunctions/_instancename.md)
- [$instancepath](../procfunctions/_instancepath.md)
- [$msgdata](../procfunctions/_msgdata.md)
- [$msgdst](../procfunctions/_msgdst.md)
- [$msgid](../procfunctions/_msgid.md)
- [$msginfo](../procfunctions/_msginfo.md)
- [$msgsrc](../procfunctions/_msgsrc.md)
- [$result](../procfunctions/_result.md)
- [Asynchronous Messaging](../../../middleware/asynchmessaging/asynchmessaging_intro.md)


---

# pragma

Interpret profile characters in the Proc module as 'maybe' characters.

pragma  v5profile | v6profile

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

**Note:**  The pragmacommand provides
support for an obsolete feature which has been superceded by C call-out. For more information, see [Call-Out to 3GL](../../../integration/3gl/concepts/call_out_to_3gl/call_out_to_3gl_intro.md).

The
pragma v5profile statement maintains compatibility for
profile characters used in constant strings handled by 3GL (executed via the
perform statement) and with the following Proc statements:

Target=Expression (that is, all assignment operations)

if

lookup

macro

read

reload

scan

selectdb

repeat/until

while/endwhile

When upgrading from Uniface V5, the upgrade
procedure inserts a pragma v5profile statement in every Proc
module it finds. In general, this insures that, after upgrading, Uniface behaves in the same way
with each retrieve profile that contains "maybe" characters as it did in versions prior to V6.1.

**Note:**   For reasons of efficiency, if a Proc contains
fewer than 128 characters and Uniface detects no constant string or profile character, the
pragma v5profile statement is not added to your code.

Prior to V6.1, Uniface interpreted any profile
character as either profile or literal, depending on the context. Beginning with V6.1, such
characters are interpreted as a ‘maybe’ character if it occurs after the following Proc statement:

```procscript
pragma v5profile
```

and before the following statement (if present):

```procscript
pragma v6profile
```

Without the
pragma v5profile statement, your Proc code behaves according
to the default Uniface V6.1 behavior for profile characters. This is equivalent to the behavior
requested by the pragma v6profile statement.

When writing new Proc code, you are advised not
to use the pragma statement. The pragma statement should be
removed from upgraded Proc code and "maybe" characters replaced by GOLD profile characters as soon
as it is practical.

The following example causes all occurrences of
the relevant entities to be retrieved where NAME begins with ‘A’. The
`pragma v5profile` statement causes Uniface to interpret the asterisk (\*) as a
‘maybe’ character.

```procscript
pragma v5profile
read u_where (name = "A*")
pragma v6profile
```

You should replace the asterisk with an explicit
GOLD \* profile character and delete the `pragma v5profile` statement.

```procscript
read u_where (name = "A*")
```

---

# print

Activate printing.

print{/ask}
{/preview}  {PrintJobModel  {, PrintMode  {, USE\_SYSTEM\_SETTINGS= (
TRUE | FALSE)}}}

## Switches

* /ask—presents the user
  with the Print form with PrintJobModel and PrintMode as
  default values, which can be edited by the user.
* /preview—presents the user
  with the Print Preview window, which enables the user to view the printout at different scales,
  navigate to previous and next pages, print the output, or close the window. By default, the zoom
  percentage is Entire Page. You can specify the default zoom percentage for the Preview window using
  the Printer tab of the Setup menu

  **Note:**  print/preview is
  supported only on Microsoft Windows 32-bit platforms and for the P\_MSWIN3 and P\_MSWINX device
  translation tables.

## Parameters

* PrintJobModel—string that
  contains the name of the print job model to use for printing, or a field (or indirect reference to
  a field), a variable, or a function that evaluates to the string. The print job model determines
  where and how to print. If omitted, the print job model `PRINTER` is used.
* PrintMode—string that
  identifies the mode to use for printing, or a field (or indirect reference to a field), a variable,
  or a function that evaluates to the string. If PrintMode is omitted, the print
  mode `A` (All) is used.

  Values for the PrintMode argument on the print statement

  | Value | Meaning |
  | --- | --- |
  | `A` | All—print the form or report component and all data in the hitlist. |
  | `C` | Like All, but clear the data from memory after printing.  It is recommended that you use `C` when writing reports or report-like forms. |
  | `F` | Current component and data—print the entire form or report component and all data currently in it. |
  | `S` | + In character mode, print what is on   the screen. + In GUI mode, same as   `F`. |

* USE\_SYSTEM\_SETTINGS—determines whether the Microsoft Windows print settings are
  used or whether the current print job settings are used. If set to TRUE, the
  Microsoft settings are used. If set to FALSE, the current print job settings
  override the Windows settings.

  If a value other than TRUE
  or FALSE is provided, Uniface interprets the value as TRUE.
  Omitting USE\_SYSTEM\_SETTINGS is equivalent to FALSE.

  USE\_SYSTEM\_SETTINGS is only
  available on Microsoft Windows platforms, and is only supported for the P\_MSWIN3 and P\_MSWINX
  device translation tables.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| >=0 | Statement executed successfully |

Values commonly returned by $procerror following print

| Value | Error constant | Meaning |
| --- | --- | --- |
| -400 | <UMISERR\_PRINT> | Uniface could not print, for example:   * Printing is already being performed   (`$printing=1`). * ^QUIT was used in the Print form. * The print mode is not valid. |

## Use

print is allowed in form and
report components
.

print/ask is allowed in form
components.

print/preview is allowed in
form components and in report components in test mode.

## Description

The print statement activates
printing in Uniface, using the PrintJobModel, PrintMode, and
settings specified.

**Note:**   When a print statement is
encountered in an operation that is being executed on the server, the print job models available
are those on the server (in the Repository entity PRATT.PRINTER).

The print statement is executed
unseen by the user and is therefore best used in reports and batch mode applications.

In forms, you can use
print/ask to prompt for information, enabling the user to choose a different
printer or a different layout to suit their requirements. The print/ask
statement takes the supplied parameters (print job model and print mode) and presents the user with
the Print form already filled in. This allows users to interactively tailor
the printer specifications according to their requirements.

## Printing Records in a Hitlist (With Confirmation)

The following example prints all the information in the hitlist to the printer
described by print job model SALESLASER. The user is prompted to confirm the values used.

```procscript
print/ask "SALESLASER","A"
```

This produces the display shown in the following
figure:

## Printing Records in a Hitlist (Without Confirmation)

The following example prints all the records in
the hitlist, using the values given in the SALESLASER print job model. The user is not given the
opportunity to modify any values.

```procscript
; trigger: Execute
; use SALESLASER print job model, option All

custname = $1
retrieve
print "SALESLASER", "A"
if ($status = 0)
   message "Print completed."
else
   message "Error %%$status, printing may have failed"
endif
exit (0)
```

## Related Topics

- [$printing](../procfunctions/_printing.md)
- [Printing from Uniface](../../../platformsupport/printing/printing.md)
- [Print Modes](../../../platformsupport/printing/concepts/print_modes.md)
- [Print Job Models](../../../platformsupport/printing/concepts/print_job_model.md)


---

# printbreak

Print the specified break frame.

printbreak  BreakFrameName

## Parameters

BreakFrameName—string
containing the name of the break frame whose Frame Gets Focus trigger is to be activated; can also
be a field (or indirect reference to a field), a variable, or a function that evaluates to the
string.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| 0 | Frame Gets Focus trigger for the specified break frame returned a negative value. |
| 1 | Frame Gets Focus trigger for the specified break frame returned a positive value. |

Values commonly returned by $procerror following printbreak

| Value | Error constant | Meaning |
| --- | --- | --- |
| -401 | <UMISERR\_PRINT\_BREAK> | An error occurred during printbreak:   * Uniface is not printing   ($printing != 1) * printbreak   encountered in a header or trailer frame |

## Use

Allowed in only in the Occurrence Gets Focus and
Leave Printed Occurrence triggers of form and report components (and in service components that are
not self-contained), .

## Description

The printbreak statement
prints the break frame BreakFrameName. This is a report-writing statement which
allows you to:

* Print a break frame instead of a named area
  frame or entity frame.
* Include a break frame in the print file
  immediately after the occurrence that has just been printed.

If the printbreak statement is
issued when Uniface is not actually printing (that is, when $printing is 0), the
statement is not executed and $status is set to -1. This allows report-like
forms to be used interactively without having to override printbreak statements
and recompile. It is better programming practice, however, to make a test on
$printing.

If the printbreak statement is
used in a header or trailer frame, the statement is not executed and $status is
set to -1.

## Ejecting a Page

The following example shows how to use
$lines to trigger an eject if there is not enough room left
to print information:

```procscript
; trigger Leave Printed Occurrence ; entity : INVOICE
; compare date of next occurrence
  compare (DATE) from "INVOICE"

; if next date different
  if ($result = 0)
     ; if less than 5 lines left, start printing on new page
     if ($lines < 5)
        eject
     endif
   
     ; set date in Break Frame
     DATE.DAYTOT = DATE.INVOICE

     ; print break frame for day total
     printbreak "DAYTOT"

     ; reset to zero for new day
     AMOUNT.DAYTOT = 0

     ; if less than 10 lines left, eject after printing break frame
     if ($lines < 10)
        eject
     endif
  endif
  return(0)
```

## Related Topics

- [print](print.md)
- [$printing](../procfunctions/_printing.md)
- [Defining Header, Trailer, and Break Frames](../../../desktopapps/reports/tasks/definingheadersandtrailersforprinting.md)


---

# Proc: Statements

The Uniface Proc language consists of a series of Proc statements that cause Uniface
to perform specified actions, such as running a form, retrieving data, locking an occurrence,
calling another Proc module, and so on.

Descriptions of Proc statements include the following sections:

* Syntax—describes how the statement is used, including any switches and parameters that
  can be specified
* Switches—explains any switches that can be used with the statement
* Parameters—explains any parameters that can be used with the statement
* Return value—describes the values, if any, that the statement returns in
  $status, $procerror, and $result
* Use—describes any limitations placed on the use of an instruction, either in particular
  triggers or component types

  In service and report components, statements that can reference global objects are not
  allowed if the component property Self-Contained is selected. In addition, any reference to global
  and general variables (for example, as an argument or in an expression) is not allowed. If
  Self-Contained is cleared, warning messages are generated when these are compiled.

  **Note:**   All statements are allowed in the Application Execute trigger of the startup shell.
* Description and Examples—provide more details about the Proc statement and its use

---

# proccompile

Compile a piece of Proc at run time.

proccompile/expression |
/condition  ProcToBeCompiled  {,  
ContextList}

## Switches

* /expression—compiles the Proc as an expression.
* /condition—compiles the Proc as a condition.

## Parameters

* ProcToBeCompiled—Proc to be compiled.
* ContextList—list containing sublists with references to objects,
  such as fields and variables, used in ProcToBeCompiled.

## Return Values

$result returns the
compiled Proc module created by proccompile, which can also be executed with
$expression or
$condition.

The values in $status following proccompile are:

Values returned in $status

| Value | Meaning |
| --- | --- |
| < | An error occurred. $procerror contains the exact error.  `$abs($status)` contains the position in the Proc string where the compiler error occurred |
| 0 | Proc compiled successfully |

## Use

Allowed in all Uniface component types.

## Description

The proccompile statement compiles a piece of Proc code at run time so
it can be checked before it is used in an $expression or
$condition Proc function.

Unknown references in ContextList result in compile errors, which will
be returned in $procerror. Every sublist is identified by one of the following
context identifiers, specifying the object type:

* ITEMS—list of items allowed
* FIELDS—list of fields allowed
* VARIABLES—list of Parameters or Variables allowed
* COMPONENTVARIABLES—list of component variables allowed
* GLOBALVARIABLES—list of global variables allowed

## Compiling Proc at Runtime

The following
example demonstrates the use of
proccompile,
$condition, and
$expression.
proccompile is used to check the entered business rules in the
DO\_DISCOUNT and DISCOUNT fields,
$condition is used to evaluate DO\_DISCOUNT, and
$expression is used to return the result of DISCOUNT.

The field DO\_DISCOUNT contains the condition for a discount and DISCOUNT
contains the actual expression for the discount. At run time, values can be
entered for both fields that will determine whether a discount should be given,
and the actual amount of the discount.

For example, the following
line should be entered in the field DO\_DISCOUNT if a discount should be given
when more then 100 articles are ordered (where the field AMOUNT contains the
number of ordered articles):

```procscript
AMOUNT>100
```

And the following line should be entered in the field
DISCOUNT if the actual discount is 10 percent of the total cost of the articles
(where the field PRICE contains the unit price of the ordered article):

```procscript
0.1*AMOUNT*PRICE
```

The following Proc code checks the entered business
rules and executes them accordingly:

```procscript
entry total_cost
variables
   numeric vDiscount
endvariables
; This Proc entry calculates total cost of ordered article including discount
; Check syntax of discount condition in field DO_DISCOUNT

proccompile/condition DO_DISCOUNT, "FIELDS=AMOUNT"
if ($procerror < 0)
   message/error "Incorrect syntax for discount condition (%%$procerror)"
   putmess $procerrorcontext
   return -1
endif

; Check discount condition
if ($condition($result)) ; Use compiled Proc in $result
; A discount should be given
; Check syntax of discount expression in field DISCOUNT
   proccompile/expression DISCOUNT, "FIELDS=AMOUNT!;PRICE"
   if ($procerror < 0)
      message/error "Incorrect syntax for discount expression (%%$procerror)"
      putmess $procerrorcontext
      return -1
   endif

; Execute discount
; Use compiled Proc in $result
   vDiscount = $expression($result)

; Or, use uncompiled expression
; vDiscount = $expression(DISCOUNT)
else
; No discount should be given
; Set discount to 0
   vDiscount = 0
endif
COST = AMOUNT * PRICE - vDiscount
return 0
end
```

## Related Topics

- [$result](../procfunctions/_result.md)
- [$abs](../procfunctions/abs.md)
- [$condition](../procfunctions/condition.md)
- [$expression](../procfunctions/expression.md)


---

# public soap

Declares that the operation can be activated by a SOAP request.

public soap

## Use

Use in the declaration of the component-level
operation or the Execute trigger of a Service component, Dynamic Server Page, or Static Server
Page.

## Description

Use public soap to declare that
the operation can be activated by a SOAP request. For example, use it in an operation of a Service
component that is deployed as a SOAP-based web service.

**Note:**  This is required if components are compiled when
the $REQUIRE\_PUBLIC\_DECL setting is present in the Uniface IDE's assignment
file. If a SOAP client attempts to activate an operation or trigger that does not contain the
public soap declaration, a `SoapFault` is returned with the
message Access denied.

## Making Operations Accessible to SOAP Clients

```procscript
operation HelloSoap
public soap
  <... do somthing ...>
end
```

## Making a DSP Operation Accessible to Both Web and SOAP Clients

It is possible to use both the public
soap and public web declarations in an operation or trigger.

```procscript
operation HelloSoapWeb
public soap
public web

scope       ; scope is only allowed in a DSP
  input
  output
endscope

putmess "HelloSoapWeb is called!"

end
```

| Version | Change |
| --- | --- |
| 9.7.04 G402 | Introduced |

## Related Topics

- [$REQUIRE_PUBLIC_DECL](../../../configuration/reference/assignments/_require_public_decl.md)
- [SOAP-Based Web Services](../../../integration/webservices/concepts/soapbasedwedservices.md)
- [public](../procdatatypes/publichandle.md)


---

# pulldown

Activate or load the specified menu bar.

pulldown/load  MenuBar

pulldown  {MenuBar}

## Switches

/load—loads a menu bar into
the application-level menu bar area.

## Parameters

MenuBar—string containing the
name of a menu bar, or a field (or indirect reference to a field), a variable, or a function that
evaluates to the string.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| 0 | Option trigger of the selected menu item is empty |
| >0 | Value returned by the Option trigger of the selected menu item |

Values commonly returned by $procerror following pulldown

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1125 | <UPROCERR\_MENU> | The specified menu does not exist. |

## Use

pulldown without the
/load switch can only be used in character mode.

## Description

A Uniface application possesses two default menu
bar areas which are defined declaratively:

* Application menu bar—declared in the Initial
  Menu Bar field of the Define Startup Shell form.
* Form menu bar—defined in the Menu Bar field
  of the Define Form Windows Properties form.

Using the /load switch .
changes the menu bar loaded by the Initial Menu Bar declaration. The menu bar that is loaded
depends on the current value of $variation

**Caution:** 

Avoid using the
pulldown/load statement in the Pulldown triggers; the effect of this can be very
disconcerting.

## Using pulldown in Character Mode

When using pulldown without the
/load switch, note the following:

* Use pulldown only when the
  `TRIG` parameter is present on the $MENU\_BAR assignment setting.
  This indicates that Uniface should handle Pulldown triggers and menu bars as it did prior to V5.2.
  For more information, see [$MENU\_BAR](../../../configuration/reference/assignments/menu_bar.md).
* Use pulldown only in the
  application-level and form-level Pulldown triggers.

The pulldown statement
(without the /load switch) activates the current application-level menu bar;
that is, it positions the cursor on the first option of the application menu bar and allows the
user to select options using either the cursor keys or the mnemonic letter.

If the MenuBar argument is
present, the menu specified is loaded and then activated. (This is equivalent to a
pulldown/load MenuBar statement followed by a
pulldown statement.) The menu bar that is loaded depends on the current value of
$variation.

## Changing the form-level menu bar

You cannot change the form-level menu bar using a
pulldown or pulldown/load statement. If you need to use
different form-level menu bars for a form in different situations, define the menu bar in several
different libraries. Then set $variation to the appropriate library *before*  the form is run.

## Loading a Menu

The following example loads the menu P\_USYS, but
does not activate it, that is, the focus is not changed:

```procscript
; trigger: Execute

pulldown/load "P_USYS"
edit NAME_FIELD
```

## Activating a Menu in Character Mode

The following example activates a menu:

```procscript
; trigger: Pulldown

pulldown
```

This example only works if
$MENU\_BAR has been set to `TRIG` in the assignment file. It is
better to do this declaratively, rather than use the Pulldown triggers.

## Related Topics

- [$MENU_BAR](../../../configuration/reference/assignments/menu_bar.md)


---

# putitem

Add or replace an item in a list.

putitem  List, N, Source

putitem/id{/case}  
List, Index  {, Source}

## Switches

* /id—replace a
  representation for the associative item whose value is Index, or append the item
  Index{=Source} to List.
* /case—causes matching to
  be case-sensitive; must be used with the /id switch

## Parameters

* List—field, an indirect
  reference to a field, a variable, or an assignable function that can accept a string value. The
  string should contain the list into which an item is to be copied.
* Source—string, or a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string. The item
  in Source is copied into List.
* N—constant, or a field (or
  indirect reference to a field), a variable, or a function that can be converted to a whole
  (integer) number; the value will be truncated to form an integer.
* Index—string, or a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string; it may
  not be an expression.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| 0 | No item was replaced or added; Source is empty. |
| >0 | Sequence number of the list item that was replaced or added. |

## Use

Allowed in all Uniface component types.

## Description

The putitem statement adds or
replaces an item in List.

To set the initial values in a list, it is easier
to use a simple assignment. For example:

```procscript
$valrep(DBMSFLD) = "rms;ora;syb;rdb" ;DBMSFLD is "rms;ora;syb;rdb"
```

## Indexed Lists

Use the putitem statement
without switches to put Source into the Nth position of
List. Items are numbered starting with 1.

* If N is -1,
  putitem appends Source as the last item in
  List.
* If N is 0 or if
  N <-1, List is not changed.
* Otherwise, the Nth item in
  List is replaced by Source. If N is
  greater than the number of items in List, empty items are created until the
  Nth item is reached.

If List contains an
associative list, the entire ValRep of the associative item is replaced by
Source.

An empty list cannot be distinguished from a list
containing a single empty item. When an empty item is added to an empty list, the list remains
empty. For example, after the following statements are executed, $LIST$ contains only one item:

```procscript
$LIST$ = "" ;an empty list
$1 = ""
putitem $LIST$, -1, $1
putitem $LIST$, -1, $1
putitem $LIST$, -1, "Zeeland" ;$LIST$ contains "Zeeland"
```

Empty items that are added to a list that already
contains at least one nonempty item are simply empty items. For example, after the following
statements are executed, $LIST$ contains three items:

```procscript
$LIST$ = "" ;an empty list
$1 = ""
putitem $LIST$, -1, "Limburg" ;$LIST$ contains "Limburg"
putitem $LIST$, -1, $1 ;$LIST$ contains "Limburg;"
putitem $LIST$, -1, "Zeeland" ;$LIST$ contains "Limburg;;Zeeland"
```

## Associative Lists

For associative lists, use the
/id switch replace or append the specified item in the list. By default,
matching Index with the item values is not case-sensitive.

For example, the following statement replaces the
first item in $LIST$ whose value is ab, Ab,
aB, or AB with the item ab=Limburg or adds
that item to the end of the list if none of these are found:

```procscript
putitem/id $list$, "ab", "Limburg"
```

To make matching case sensitive, use the
/case switch. For example, the following statement replaces or adds an item
whose value is ab:

```procscript
putitem/id/case $list$, "ab", "Limburg"
```

In the examples below, an underlined semicolon
( `;` ) represents the Uniface subfield separator (by default, GOLD ;)
and an underlined exclamation point ( `!` ) represents the retrieve
profile character for logical NOT (GOLD !).

## Building an Indexed List

The following example builds an indexed list with
four items and copies the value of the third item to the variable $1:

```procscript
; initialize list
; valrep is "rms;ora"
; valrep is "rms;ora;syb"
; valrep is "rms;ora;syb;rdb"
; "syb" copied to $1

$valrep(DBMSFLD) = "rms"
putitem $valrep(DBMSFLD), -1, "ora"
putitem $valrep(DBMSFLD), -1, "syb"
putitem $valrep(DBMSFLD), -1, "rdb"
getitem $1, $valrep(DBMSFLD), 3
```

## Building an Associative List

The following example builds an associative list
with four items. It then looks for an item whose value is 'tue' and copies the representation of
that item to the variable $1. In addition, it copies the representation of the item whose value is
'weekend' to $2. Finally, assuming that the $2 now contains a list, it copies the first item in
that list to $3.

```procscript
; initialise list
; valrep is "mon=monday;tue=tuesday;wed=wednesday;weekend=sat!;sun"
; copy "tuesday" to $1
; copy "sat;sun" to $2
; copy "sat" to $3

$valrep(DATEFLD) = "mon=monday"
putitem/id $valrep(DATEFLD), "tue", "tuesday"
putitem/id $valrep(DATEFLD), "wed", "wednesday"
putitem/id $valrep(DATEFLD), "weekend", "sat;sun"
getitem/id $1, $valrep(DATEFLD), "tue"
getitem/id $2, $valrep(DATEFLD), "weekend"
getitem $3, $2, 1
```

## Related Topics

- [$fieldproperties](../procfunctions/_fieldproperties.md)
- [$fieldvalrep](../procfunctions/_fieldvalrep.md)
- [$properties](../procfunctions/_properties.md)
- [$valrep](../procfunctions/_valrep.md)
- [Lists and Sublists](../../lists/lists_of_items.md)
- [List Handling in Proc](../../lists/listhandling.md)


---

# putlistitems

Copy data from a specified source to the items of a list.

Put one field from successive occurrences into list items:

putlistitems  List, Field

Put one or two fields from successive occurrences into list items:

putlistitems/id  List, 
{SourceValue}, SourceRepresentation

putlistitems/id  List, SourceValue

Put fields of current occurrence into list items:

putlistitems/occ{/modonly}  
List, Entity

Fill representation part of list items:

putlistitems/id{/field |
/component | /global}  List

## Switches

* /id—copy the contents of one or two fields from successive
  occurrences into the items of a list
* /occ—copy the names and contents of all fields of the specified
  component Entity into the items of an associative list
* /modonly—loads the values from a field only if the field data has
  been modified.
* /component, /field,
  /global—if the name of the value part of a list item does not include a dollar
  sign, the names are treated as the indicated source type

## Parameters

* List—indexed or associative list
* Field, SourceValue,
  SourceRepresentation—literal field name, or a string, variable, function, or
  parameter that evaluates to a string containing the name.
* Entity—entity from which a list is to be built. Can be a string, or
  a field, variable, function, or parameter that evaluates to a string containing the name.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| 0 | No data was copied to the list |
| >0 | Number of the items copied |

## Use

putlistitems/id/global is allowed in form components (and in service
and report components that are not self-contained).

Other forms of putlistitems are allowed in form, service, and report
components.

## Description

The putlistitems statement copies items from the specified source and
puts them in List. This statement can be used to put:

* The contents of the field Field from successive occurrences of its
  entity into items of an indexed list.
* The contents of the fields SourceValue and
  SourceRepresentation from successive occurrences of the current entity into the
  value and representation of items (ValRep) in an associative list.
* The names and contents of the fields in the field list of the named
  Entity into the value and representation of items in an associative list.
* The contents of a group of fields and variables (that are identified by the value
  part of each item in an associative list) into the corresponding representation of that item.

## Copying from Successive Occurrences

When items are copied into a list from a field or pair of fields in successive
occurrences of an entity, the first item of the list is copied from the current occurrence of the
entity in the component and remaining items from the following occurrences of the entity in the
component. The hitlist is completed if necessary.

**Note:**   To ensure that the entire set of occurrences in the component is being addressed, make
the first occurrence the current occurrence.

When copying data from successive occurrences, if one of the fields specified occurs in
an entity that is painted as an up entity, then the nearest outer entity that is painted as a down
entity is used to control the movement of data from occurrences. If both of the fields specified
are painted as up entities, the nearest outer entity of the first field controls the movement.

## No Switch Used to Build a New List

To copy the contents of a single field from successive occurrences into the items of a
list, use putlistitems with no switch. Starting with an empty
List, each item is copied from the field named by Field from
successive occurrences in the component of its entity.

The argument Field should be one of the following:

* The literal name of a field painted on the component. For example,
  `INV_NBR`.
* A string that evaluates to the name of a field. For example,
  `"INV_NBR"`.
* A variable, function, or parameter that evaluates to a string that contains the name
  of a field. For example:

  + $1, where $1 contains `"INV_NBR"`.
  + PARAM1, where PARAM1 contains `"INV_NBR"`.
  + $fieldname, where $fieldname contains
    `"INV_NBR"`.

If an unqualified field name is present, the current entity is used. (See Building a list
from a field in successive occurrences, below.)

## /id Used to Build a New List

To copy the contents of one or two fields from successive occurrences into the items of a
list, use putlistitems with the /id switch and at least one
of SourceValue and SourceRepresentation. The fields named by
SourceValue and SourceRepresentation are used to build a new
(associative) list in List. In this situation, if one of the switches
/field, /component, or /global appears
with /id, it is ignored.

* If both SourceValue and SourceRepresentation
  are present, items in an associative list are created by copying the item values from the contents
  of the field identified by SourceValue and the item representations from the
  contents of the field identified by SourceRepresentation in successive
  occurrences of the current entity.

  For example, consider a case where there are three occurrences of entity ENT in a
  component. Field FLD1 in the three occurrences contains 'day1', 'day2', and 'day3', while FLD2
  contains 'Mon', 'Tue', and 'Wed'. The following statements build a list that contains those values
  and representations:

  `setocc "ENT", 1`

  `putlistitems/id $LIST$, FLD1, FLD2 ;$LIST$ is "day1=Mon ;
  day2=Tue ; day3=Wed"`
* If SourceValue is omitted, only the representations are copied.
  For example, if field FLD2 in three occurrences of entity ENT in a component contains 'Mon', 'Tue',
  and 'Wed', the following statements build a list that contains those representations:

  `setocc "ENT", 1`

  `putlistitems/id $LIST$,, FLD2 ;$LIST$ is "Mon ; Tue ;
  Wed"`

  Notice that the following statements have the same effect:

  `setocc "ENT", 1`

  `putlistitems $LIST$, FLD2 ;$LIST$ is "Mon ; Tue ;
  Wed"`
* If SourceRepresentation is omitted, only the values are copied.
  For example, if field FLD1 in three occurrences of entity ENT in a component contains 'day1',
  'day2', and 'day3', the following statements build a list that contains those values:

  `setocc "ENT", 1`

  `putlistitems/id $LIST$, FLD1 ;$LIST$ is "day1= ; day2= ;
  day3="`

## /occ Used to Build a New List

To build an associative list that contains the names and contents of all fields of the
specified Entity that are defined in the field list for that entity in the
current component, use putlistitems with the /occ switch.

For more information about defining the field list for a component entity see the example
titled *Building an associative list from fields in a named entity* below.)

The argument Entity should specify the entity from which a list is to
be built as one of the following:

* A string that evaluates to the name of an entity. For example,
  `"INVOICES"`.
* A variable, function, or parameter that evaluates to a string that contains the name
  of an entity. For example:

  + `$1`, where $1 contains `"INVOICES"`.
  + `PARAM1`, where PARAM1 contains "INVOICES".
  + $entname, where $entname contains
    `"INVOICES"`.

If the /modonly switch is used with the /occ
switch, the values will only be loaded from a field if the field data has been modified (that is,
if $fieldmod =1). Field IDs from fields that have not been
modified are removed from the list.

## /id to Update Representations of List Items

To update the representation part of items in an associative list, use
putlistitems with the /id switch, a List
name and no further arguments. The representation for each item is updated from the source
specified in the value part of that item. The value part of a list item can contain the name of a
field, a component variable, a global variable, or a general variable. For example:

```procscript
NAME = "Frodo"
$LOC_TOT$ = 14
$$GLOB_TOT = 329
$1 = -8
$LIST$ = "NAME;$LOC_TOT$;$$GLOB_TOT;$1"
putlistitems/id $LIST$ ;"NAME=Frodo;$LOC_TOT$=14;$$GLOB_TOT=329;$1=-8"
```

For each item in List, if the field or variable named by the value
cannot be found, the associated representation remains unchanged.

If the value part of a list item does not contain a dollar sign ($), the source is
assumed to be a field unless one of the source switches /field,
/component, or /global is specified. (You can use the switch
/local as a synonym for /component.) In this situation,
component variables are still the target for the putlistitems statement; local
variables are not used). If one of these source switches is used, names that do not include a
dollar sign are treated as the selected source type. (If a name includes a dollar sign, it is
treated as the type specified.)

In the following example, a field NAME, a component variable $NAME$, and a global
variable $$NAME are all available, as well as a field TOTAL and a component variable $TOTAL$:

```procscript
NAME = "Field"
$NAME$ = "Component"
$$NAME = "Global"
TOTAL = 987.65
$TOTAL$ = 123.45
$LIST$ = "name;$total$"
putlistitems/id $LIST$ ;$LIST$ is"NAME=Field;$TOTAL$=123.45"
putlistitems/id/field $LIST$ ;$LIST$ is "NAME=Field;$TOTAL$=123.45"
putlistitems/id/component $LIST$ ;$LIST$ is "NAME=Component;$TOTAL$=123.45"
putlistitems/id/global $LIST$ ;$LIST$ is "NAME=Global;$TOTAL$=123.45"
```

Although it is usually good practice to include the dollar signs ($) that form part of
the variable name in each list item’s value, these must be omitted to take advantage of the power
of the source switches.

Because the list argument is evaluated at run time, you should consider the following
points when you create the component:

* The existence of the referenced objects (fields and variables) cannot be verified by
  the compiler
* Any referenced fields cannot be included in an Automatic field list

Be sure that all the fields that will be referenced are included in the entity's field
list (by using All Fields or a User-Defined field list) and that all the component and global
variables are defined.

In the examples, the underlined semicolon ( `;` ) represents
the Uniface subfield separator (by default, GOLD ;).

## Building a List from a Field in Successive Occurrences

The current component contains three occurrences of the entity CALENDAR. The field DAY in
these three occurrences contains 'Monday', 'Tuesday', and 'Wednesday'. The following example copies
the contents of the field DAY from these occurrences into an indexed list contained in the
component variable $LIST$:

```procscript
; make first occurrence of CALENDAR current
; $LIST$ is "Monday;Tuesday;Wednesday"

setocc "CALENDAR", 1
putlistitems $LIST$, DAY.CALENDAR
```

## Filling an Associative List from Fields and Variables

For each item
in an associative list, the following example copies the representation of the item from the source
identified by the value. The type of the source (that is, whether it is a field, component
variable, or global variable) is derived from the value of the item.

```procscript
$LIST$ = "day1;$day2$;$$day3;$9"
day1 = "Mon"
$day2$ = "Fri"
$$day3 = "Wed"
$9="Thu"
putlistitems/id $LIST$
; $LIST$ is "day1=Mon;$day2$=Fri;$$day3=Wed;$9=Thu"
```

## Filling an Associative List from Fields in the Current Occurrence

For each item in an associative list, the following example copies the representation
part of the item from the field (in the current entity) identified by the value of the item:

```procscript
$LIST$ = "day1;day2;day3"
day1 = "Sun"
day2 = "Tue"
day3 = "Wed"
putlistitems/id/field $LIST$
; $LIST$ is "day1=Sun;day2=Tue;day3=Wed"
```

## Filling an Associative List from Component Variables

For each item in an associative list, the following example copies the representation
part of the item from the component variable identified by the item value:

```procscript
$LIST$ = "day1;$day2;day3"
$day1$ = "Sun"
$day2$ = "Tue"
$day3$ = "Wed"
putlistitems/id/component $LIST$
; $LIST$ is "day1=Sun;day2=Tue;day3=Wed"
```

## Building an Associative List from a Pair of Fields in Successive Occurrences

The current component contains three occurrences of the entity CALENDAR. The field NUM in
these three occurrences contains 'd1', 'd2', and 'd3', while the field NAME contains 'Mon', 'Tue',
and 'Wed'. The following example copies those values into an associative list contained in the
component variable $LIST$:

```procscript
setocc "CALENDAR", 1
; make first occurrence current
putlistitems/id $LIST$, NUM.CALENDAR, NAME.CALENDAR
; $list$ is "d1=Mon;d2=Tue;d3=Wed"
```

## Building an Associative List from Fields in a Named Entity

If the entity WEEK is painted with three fields (DAY1, DAY2, and DAY3), the following
example builds the value and representation of each list item from the names and contents of these
fields:

```procscript
DAY1.WEEK = "Mon"
DAY2.WEEK = "Tue"
DAY3.WEEK = "Wed"
putlistitems/occ $LIST$,"WEEK"
; $LIST$ is "day1=Mon;day2=Tue;day3=Wed"
```

## Copying Fields from One Occurrence to Another

The following example copies the fields from the first occurrence of MYENT to a new
occurrence. You can use this technique to create a 'copy corresponding' feature in your Proc code.

```procscript
; make first occurrence current
; put field values into the list
; create new occurrence
; put values into fields of new occ

setocc "MYENT", 1
putlistitems/occ $COPYFIELDS$, "MYENT"
creocc "MYENT", -1
getlistitems/occ $COPYFIELDS$ , "MYENT"
```

## Related Topics

- [setocc](setocc.md)
- [$fieldproperties](../procfunctions/_fieldproperties.md)
- [$fieldvalrep](../procfunctions/_fieldvalrep.md)
- [$properties](../procfunctions/_properties.md)
- [$valrep](../procfunctions/_valrep.md)
- [List Handling in Proc](../../lists/listhandling.md)


---

# putmess

Append text to the message frame.

putmess  
{MessageText}

## Parameters

MessageText—string, or a field
(or indirect reference to a field), a variable, or a function that evaluates to a string. If
MessageText is omitted, an empty line is added to the message frame.

## Return Values

None

## Use

Allowed in all Uniface component types except
static and dynamic server pages.

## Description

The putmess statement appends
MessageText to the text already present (if any) in the message frame. (The
contents of the message frame are available to the application with the function
$putmess.)

The putmess statement is
ignored in an Asynchronous Interrupt trigger if the user is currently in the message frame when the
Asynchronous Interrupt trigger is activated.

You can dump the contents of the message frame to
a file when you are in the Proc debugger.

## Batch Mode

In batch mode, the putmess
statement writes the message directly to the screen or batch log file, depending on your operating
system settings.

## Putting Message Information in the Message Frame

The
following example shows how the putmess statement is used to put message
information in the message frame:

```procscript
; trigger: Execute
CUSTNAME.CUSTOMER = $1
COUNTRY.CUSTOMER = $2
retrieve
if ($status < 0)
   putmess "Retrieve problem. No printout."
   apexit ; end application
else
   print "SALESLASER","A"
   putmess "Printout sent to LaserJet II"
endif
```

For an example of how to dump the contents of the
message frame to a timestamped file, see the macro statement.

## Related Topics

- [askmess](askmess.md)
- [clrmess](clrmess.md)
- [filedump](filedump.md)
- [macro](macro.md)
- [message](message.md)
- [$putmess](../procfunctions/_putmess.md)
- [$PUTMESS_LOG_FILE](../../../configuration/reference/assignments/putmess_logfile.md)
- [help](helpnative.md)


---

# read

Fetch an occurrence of the hitlist.

read{/lock}
`%\`

{using  Index
| options `"` {index=Index}
{`;` maxhits=n |
ALL } {`;`cache=n | ALL }
{`;` step=n } {;  offset=n} `"}``%\`

{u\_where
(SelectionCriteria) | where  DMLStatement |
u\_condition (Condition) } `%\`

{order by`"`Field1 {desc}{`,` FieldN {desc} }`"` }

## Switches and Clauses

* /lock—locks the occurrence
  when it is read, if the DBMS supports this feature. The Lock trigger is not activated when the
  /lock switch is used.
* usingIndex—specifies the index Uniface should use for record-level DBMSs; ignored for
  field-level DBMSs. Check the appropriate DBMS connector documentation to verify that the
  using clause is available for your DBMS.

  **Note:**   You can use either the
  using clause or the options clause. You cannot use both
  clauses within the same read statement.
* options—gold-separated
  list of performance-related parameters applied when reading from a DBMS.

  + index—index that
    Uniface should use for record-level DBMSs; equivalent to the usingIndex clause.
  + maxhits—maximum number
    of hits that can be returned by a query. To specify the maximum (which is `32767`),
    use ALL.
  + cache—maximum size (in
    bytes) of an occurrence that can be retrieved and placed in the select cache. To specify the
    maximum, use ALL. In this case, all occurrences that do not have overflow or
    BLOBs can be retrieved and placed in the select cache.

    If field length < n,
    the complete occurrence is placed in select cache. If the cache size is not specified, the default
    value is 512 bytes.
  + step—step size of the
    query. If not set, the default value is 10.
  + offset—number of
    records to be skipped before data reading starts; must be >=0. For example, to start with the
    11th record, use `offset=10`. If specified, you must also specify
    maxhits and order by.

    **Note:**  The offset option is
    not supported for all databases, so consult the connector documentation for your target database
    before using it. For more information, see [Data Retrieval Support](../../../dbmssupport/dbmsdrivers/aboutdrivers/dataretrievalsupport.md).
* u\_where—specifies
  additional criteria by which records are to be read. It is inserted into the Select statement for
  the DBMS connector, in addition to any retrieve profiles generated by Uniface. For more information, see [u\_where](uwhere.md).

  **Note:**   You can use either the
  u\_where clause or the where clause. You cannot use both
  clauses within the same read statement.
* where—passes the value of
  DMLStatement 'as is' to the database.

  **Note:**  The where clause is
  database-specific. The database must therefore support some form of DML, such as SQL, QUEL, or RDO.
* u\_condition—provides a
  DBMS-independent profile for selection. For more information, see [u\_condition](ucondition.md).
* order by—specifies one or
  more fixed-length database fields to use for ordering the selected records. The default sort order
  is ascending, but it can be set to descending using desc. The specified field
  names must be unqualified, that is, without the entity and model name.

## Parameters

* Index—a number or numeric
  expression that evaluates to the index number required.
* n—a number or numeric
  expression.
* ParamDef—parameter
  definitions are described below.
* SelectionCriteria—criteria
  for reading records.
* DMLStatement—string
  containing a DML statement, or a field (or indirect reference to a field), a variable, or a
  function that evaluates to the string.
* Condition—conditional
  statement used as a retrieve profile.
* OrderBySpecs—comma-separated list containing one or more specifications of the
  form:

  LitFieldName
  {desc}

  The list can be a string, or a field (or
  indirect reference to a field), a variable, or a function that evaluates to the string.

## Return Values

Values Returned by read in $status

| Value | Meaning |
| --- | --- |
| 0 | Occurrence was successfully read. |
| <0 | An error occurred. See $procerror for details |

Values Commonly Returned by $procerror Following
read

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1 | UGENERR\_ERROR |  |
| -2 through -12 | UIOSERR\_\* | Errors during database I/O. |
| -2 | UIOSERR\_OCC\_NOT\_FOUND | Occurrence or record not found; the table is empty or end of file was encountered. (Usually the table or file is empty.)  The entity is painted as an up entity and the key value was not found during the database lookup.  This error can also occur if maxhits is set to more than 32767. |
| -3 | UIOSERR\_EXCEPTIONAL | Exceptional I/O error (hardware or software). |
| -4 | UIOSERR\_OPEN\_FAILURE | The table or file could not be opened. The entity is not painted or the corresponding table or file does not exist in the database. |
| -11 | UIOSERR\_LOCKED | read/lock only: Occurrence already locked. |
| -15 | URETERR\_MULTIPLE\_UP | The entity is painted as an up entity and multiple hits were found during the database lookup. |
| -16 through -25 | UNETERR\_\* | Errors during network I/O. |
| -16 | UNETERR\_UNKNOWN | Network error: unknown. |
| -20 | UNETERR\_MAX\_CLIENTS | Router could not accept new client, $MAX\_CLIENTS exceeded. |
| -31 | UGENERR\_LICENSE | The TRX-formatted DML statement from a where clause exceeds 32 KB. |
| -37 | IOSERR\_OFFSET\_NOTSUPPORTED | The offset option was specified but the database connector does not support pagination |
| -38 | IOSERR\_OFFSET\_PARAMETERS | order by missing, or incomplete or wrong options for offset. |
| -403 | UMISERR\_UWHERE | Nonexistent field in a u\_where clause. |
| -404 | UMISERR\_TRX | The TRX-formatted DML statement from a where clause or an sql statement exceeds 32 KB. |

**Tip:** 

After the Read trigger is activated,
$rettype function indicates the type of retrieval request that activated it.
This can be useful for conditional post-retrieval processing. For more information, see [$rettype](../procfunctions/_rettype.md).

## Use

Allowed in all Uniface component types.

## Description

The read statement should be
used only in the Read trigger. It fetches an occurrence from the hitlist and activates any
field-level Decrypt triggers that contain Proc code. If necessary, it first builds the next step of
the hitlist.

**Tip:** 

A read statement can be
quite long, so use line continuation markers (%\) to improve the readability of the statement.

You can place assignments after the
read statement in the Read trigger. This is often a good place to initialize
non-database fields, but you should first test for success after the read
statement. For example:

```procscript
;trigger read
  read
  if ($status == 0)
    ; Populate non-DB field POSTAL_ADDRES:
    POSTAL_ADDRES.ENT = $concat(STREET.ENT, "%%^", CITY.ENT)
  endif
```

**Tip:** 

After the Read trigger is activated,
$rettype function indicates the type of retrieval request that activated it.
This can be useful for conditional post-retrieval processing. For more information, see [$rettype](../procfunctions/_rettype.md).

## read/lock

The optional /lock switch
locks the occurrence when it is read, if the DBMS supports this feature. (This is called
*paranoid locking*.)

Using /lock eliminates the
extra read action implicit in the normal lock statement and overrides
*optimistic locking* in any DBMS.

The Lock trigger is not activated when the
/lock switch is used.

## u\_where and where

You can use either the u\_where
clause or the where clause within the same read statement,
but not both. Not all databases can handle these clauses; in this situation Uniface itself handles
the clause.

* u\_where provides a
  database-independent way of specifying additional selection criteria. For more information, see [u\_where](uwhere.md).
* where is database-specific,
  and the database must support some form of DML, such as SQL, QUEL, or RDO. Consult your DBMS
  connector documentation to check whether the where clause is supported for your
  DBMS. For more information, see [Data Retrieval Support](../../../dbmssupport/dbmsdrivers/aboutdrivers/dataretrievalsupport.md)..

When a u\_where or
where clause is used on a read statement, all occurrences
that match the selection criteria are read. If the entity is an Up entity, the
u\_where or where clause is considered only if the foreign key
is complete and not NULL. These clauses can be used to further restrict the number of occurrences
read for the up entity.

These clauses are used in addition to those
specified by the user in the retrieve profile entered before the ^RETRIEVE function is activated.
For example, the following Proc in the Read trigger only allows retrieves occurrences where the
value of the SALARY field is less than 25000:

```procscript
;trigger read
  read u_where (SALARY < 25000)
```

## where

The where clause has a
DBMS-specific format; consult your DBMS documentation for the correct syntax.

The where clause is inserted
into the DML `Select` statement, which is passed to the connector in Uniface's
internal format. This may be double the size of the original DML statement. The data is limited to
32 kilobytes.

**Caution:** 

Uniface passes the DML clause *as is*
to the DBMS connector, but it will attempt to do string substitution first. The Uniface
`%%` symbols for the substitution may conflict with the SQL-syntax of the remaining
expression.

To prevent such conflicts, prepare the selection
profile clause carefully. For example, you want to select records in which FLD1 contains the string
`abc`, using SQL wildcards. You could prepare the profile in several ways.

* Include SQL wildcards (`%`
  symbols) in the profile and use Uniface %% characters in the `where` clause:

  ```procscript
  $Profile$ = "%abc%" 
   retrieve
  ```

  ```procscript
  trigger read
     read where "FLD1 = %%($Profile$)"
   end
  ```
* Alternatively, use $concat
  to build up the clause with the correct syntax. The profile clause does not have to handle the
  %-symbols, as there is no conflict:

  ```procscript
  $Profile$ = "abc"  
    retrieve
  ```

  Instead, SQL wildcards can be handled by the
  next line:

  ```procscript
  trigger read
     read where $concat("F1 like '%", $Profile$, "%'")
   end
  ```

The where clause is not parsed
by Uniface because it is DBMS-specific, so it is wise to check the return value of the
read statement and, if necessary, the value of $dberror.

Uniface enables you to define subtype entities
which reference a common database table, or redirect entities to database tables in the [ENTITIES]
section of the assignment file. However, subtypes and entity redirection are not understood by
DBMSs.

**Caution:** 

When specifying the entity in a
where clause, use the name of the database table, not the entity.

## offset

**Important:** 

The offset option is not
supported by all database connectors, so you should consult the connector documentation for your
target database before using it. For more information, see [Data Retrieval Support](../../../dbmssupport/dbmsdrivers/aboutdrivers/dataretrievalsupport.md).

The offset option makes use of
database-specific functionality to specify where to start reading the data. It must be used with
the maxhits option and order by clause, making it possible to
implement data paging functionality. For example, the following statement fetches 10 records from a
dataset that has been order by the BIRTHDATE field , starting at the 101st record:

```procscript
read options "maxhits=10;offset=100" order by "BIRTHDATE"
```

It is especially useful in web applications, which
cannot use stepped hitlists. (In non-web applications, using offset has no
effect on the stepped hitlist mechanism.)

Typically, the value of offset
is a variable that holds a calculated number, making it possible to reset the value to retrieve the
previous or next set of records (where the set is determined by maxhits). For
example, in the following code the offset is calculated using the value of the
`PAGESIZE` field and the requested page number:

```procscript
;Read trigger
…
vOffset= PAGESIZE * $vPageNum$
read options "maxhits=%%PAGESIZE%%%·;offset=%%vOffset%%%" order by "LASTNAME"
```

During compilation, if the
`offset=` string is detected and there is no order by clause, a
warning is issued:

```procscript
error:   1000 - Syntax error ("order by" missing, or
                            incomplete or wrong options for offset)
```

At runtime, the read command
fails with error `-38 (IOSERR_OFFSET_PARAMETERS` if any of the following is
conditions apply:

* offset specifies a negative
  number
* maxhits is not specified,
  is 0, or negative.

  An order by clause is not
  specified.

Because offset relies on native
database paging features, it can have a performance advantage over stepped hitlists. However not
all databases have such a feature, so using offset means that your application
is no longer database-independent.

For more information, see [Example: Using Database Data Paging](../../../webapps/applicationissues/datapaging/datapagingoffsetexample.md) .

## order by

The order by clause specifies
a comma-separated list of fields as a string. It determines the ordering sequence of the selected
records and is valid for all DBMSs. Each field name provided must be unqualified; for example, you
can use the unqualified field name `INVAMOUNT`, but not the qualified field name
`INVAMOUNT.INVOICES`.

The default ordering is ascending, but you can set
it to descending using the `desc` keyword. For example:

```procscript
; trigger: Read
read order by "INVOICE_MONTH desc"
```

However, order by only works on
fixed-length fields. Also, you cannot use a field that has been defined as part of an entity *but is not stored in the database*  to sort records in an order by clause.
If you require records sorted on such a field, use the sort Proc statement.

**Caution:** 

The compiler does not flag invalid fields as an
error if you attempt it, nor does Uniface check for the existence of the field names in an
order by clause. Using an unknown field name can cause unpredictable results in
sorting.

If you use an order by clause
in combination with a DBMS that does not support ordering, Uniface retrieves and sorts all matching
records. This can have a noticeable impact on performance. Additionally, when the component ends,
the retrieved data must be dropped from memory. Consequently, the order by
clause can affect performance not only for retrieval, but also when exiting the component.

Not all DBMSs support descending sorts, so check
the appropriate connector documentation to see if your DBMS supports this feature.

## Reading and Sorting Occurrences

The following example reads in occurrences from
the component, ordering them by the INVOICE\_MONTH field:

```procscript
; trigger: Read
read order by "INVOICE_MONTH"
```

## Ordering Read Occurrences by a Dynamic Profile

The following example defines the sort profile
dynamically. The contents of the dummy field SORT\_PROFILE specify by which field to order the
occurrences:

```procscript
; trigger Execute
if ($1="month")
   SORT_PROFILE.DUMMY = "INVOICE_MONTH"
else
   SORT_PROFILE.DUMMY = "INVOICE_AMOUNT"
endif
```

```procscript
; trigger: Read
read order by SORT_PROFILE.DUMMY
```

## Reading and Sorting occurrences

The following example uses order
by to sort the records read:

```procscript
; trigger: Read

$1 = "custnumber desc, invoice_date"
read order by $1
```

## read u\_where

The following example returns all occurrences of
the current entity for which no PAYDATE has been entered:

```procscript
; trigger: Read
read u_where (paydate = "") order by "invoice_amount"
```

## read where

The following example retrieves occurrences of
the entity INVOICE which have an INVAMOUNT greater than 100:

```procscript
; trigger: Read (of entity "INVOICE")
read where "INVAMOUNT > 100"
```

You may have to qualify the name of the field
with the entity name. This qualification is DML-specific. For example, in some databases, the QUEL
statement in the `where` clause would be:

```procscript
; trigger: Read (of entity "INVOICE")
read where "INVOICE.INVAMOUNT > 100"
```

If you had defined the entity INVOICE in the
model as a subtype of the entity TRANSACT, you would have to use the supertype as a qualifier. This
is because DBMSs do not recognize subtypes; subtypes are a Uniface feature. The previous example
would therefore have to be rewritten as:

```procscript
; trigger: Read (of entity "INVOICE")
read where "TRANSACT.INVAMOUNT > 100"
```

You can use the more general
`u_where` clause, which is DBMS-independent. The previous example would then be
rewritten as:

```procscript
; trigger: Read (of entity "INVOICE")
read u_where (INVOICE.INVAMOUNT > 100)
```

History

| Version | Change |
| --- | --- |
| 9.6.01 | Added the offset option |

## Related Topics

- [lock](lock.md)
- [lookup](lookup.md)
- [retrieve](retrieve.md)
- [$dberror](../procfunctions/_dberror.md)
- [$foreign](../procfunctions/_foreign.md)
- [$rettype](../procfunctions/_rettype.md)
- [Lock](../triggersstandard/lock.md)
- [Read](../triggersstandard/read.md)
- [Database Connectors](../../../dbmssupport/dbmsdrivers/dbmsconnectors.md)
- [retrieve/a](retrievea.md)


---

# reconnect

Reconnect data loaded from a disconnected record set (XML, JSON, or Struct) with the
occurrences in a database or component.

reconnect
{/readcheck}  {EntityName}

## Switches

/readcheck—for read-only
fields, ignores any user modifications and restores the field value from database.

## Parameters

EntityName—component entity;
can be a string, or a field, variable, function, or parameter that evaluates to a string.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| 0 | Occurrence was successfully reconnected. |
| >0 | Number of errors encountered.  In this context, an error is defined as the number of times an On Error trigger returned a negative value. |

## Use

Allowed in all Uniface component types.

## Description

Used after the xmlload,
webload, structToComponent statements,
reconnect resolves the occurrence state information stored in the processing
information attributes of the XML stream. The procedure followed for each occurrence depends on the
value of the XML `status` attribute for each occurrence in the XML stream.

The reconnect statement merges
all disconnected occurrences that have the XML states `""`, `"new"`,
`"mod"` and `"del"`. Occurrences that have the XML state
`"est"` are not be reconnected. This improves performance and avoids CRC errors on
occurrences that were not modified in this session anyway.

The XML `ID` attribute is used to
merge disconnected occurrences with connected occurrences. Duplicate key checks are not done by
reconnect. CRC checks are done for every merged occurrence.

Depending on the value of the XML
`status` attribute, as set in $occstatus, Uniface modification
flags are set or reset.

Effect of XML status Attribute on Uniface Modification Flags

| `$occstatus` | `$occmod` | `$storetype` | `$occdel` | Description |
| --- | --- | --- | --- | --- |
| `""` | `1` | `1` | `0` | Treated as a new occurrence |
| `"new"` | `1` | `1` | `0` | New occurrence |
| `"est"` | `0` | `0` | `0` | Existing unmodified occurrence |
| `"mod"` | `1` | `0` | `0` | Existing modified occurrence |
| `"del"` | `X` | `X` | `1` | Marked as deleted occurrence |

The Uniface modification flags of all fields in an
occurrence get the same modification state. All modified occurrences and fields are flagged for
validation ($occvalidation, $fieldvalidation, and so on).
These flags can be reset in Proc. $formmod and $instancemod
are recalculated. If no occurrences or fields have set modification flags,
$formmod and $instancemod are reset again. All modified
occurrences are locked in the database if the locking type is cautious.

For more information, see [Reconnect Process](../../../howunifaceworks/dataio/disconnectedrecordssets/reconnect_process.md).

## Reconnecting Read-Only Fields

Fields are marked as read-only if:

* The field syntax definition specifies NED (no
  edit allowed)
* The field syntax has been changed to NED at
  runtime by the fieldsyntax or $fieldsyntax Proc
  instructions.

When the `/readcheck` switch is
used in a reconnect process, any modifications made by the user to a read-only field are ignored
and the field value is restored from the database.

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [xmlload](xmlload.md)
- [webload](webload.md)
- [structToComponent](structtocomponent.md)
- [$occvalidation](../procfunctions/_occvalidation.md)
- [$instancemod](../procfunctions/_instancemod.md)
- [$formmod](../procfunctions/_formmod.md)
- [$fieldvalidation](../procfunctions/_fieldvalidation.md)
- [fieldsyntax](fieldsyntax.md)
- [$fieldsyntax](../procfunctions/_fieldsyntax.md)
- [Disconnected Record Sets](../../../howunifaceworks/dataio/disconnectedrecordssets/disconnected_record_sets.md)


---

# refresh

Redraw the screen in character mode.

refresh

## Return Values

None

## Use

Allowed in form components running in character
mode.

## Description

The refresh statement causes
Uniface to repaint the current form. The principle use is after a spawn
statement to clean up the screen. This statement has the same effect as the user using the
structure editor function ^REFRESH.

**Note:**   This function has no effect when running your
application under a GUI.

## Related Topics

- [spawn](spawn.md)


---

# release

Release database controls.

release{/mod}

release/e{/mod}  
{Entity}

## Switches

* /e—releases the controls
  for the current or specified entity.
* /mod—flags each released
  occurrence as modified. This ensures that these occurrences are inserted in the database at the
  next store operation. If the primary key of each occurrence is not changed
  before the data is stored, a 'duplicate key' error will occur at the store
  operation.

  **Note:**   The release/mod
  statement includes an implicit setocc "\*",-1 to fetch all selected occurrences.

## Parameters

Entity—entity whose controls
are to be released. Can be a string, or a field, variable, function, or parameter that evaluates to
a string containing the name. If omitted, the controls for the current entity
($entname) are released.

## Return Values

If EntityName does not exist,
$status is not set; `$error` is 0145, and the corresponding
message is displayed.

If EntityName does exist, the
usual values returned in $status during database interaction apply.

Values returned by release in $status

| Value | Meaning |
| --- | --- |
| 0 | Data successfully released. |
| -3 | Exceptional I/O error (hardware or software). |
| -16 | Network error: unknown. |

Values commonly returned by $procerror following release

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

The release statement releases
the data in the component (for the fetched occurrences, $totocc) from database
controls. Each occurrence is marked in the hitlist as a non-database occurrence. Used without the
/e switch, all occurrences in the component are released.

Uniface treats the released data as if it had
just been entered by the user; in particular, this means that the primary key field can be
modified. When the store statement is executed, occurrences modified by the user
are inserted rather than updated. The release statement is sometimes used in the
Clear trigger.

Keep the following in mind when using
release:

* Any locked database occurrences are not
  unlocked; they remain locked until a commit or rollback is
  performed.
* An occurrence in the component that has been
  removed (for example, with the structure editor function ^REM\_OCC), but not yet stored at the time
  of the release, remains in the hitlist and is available in the component.

**Note:**   Prior to Version 6, the first occurrence became
the current occurrence following a release. Beginning with Version 6, the last
fetched occurrence becomes the current occurrence following a release. It is a
good idea to use setocc to establish the new current occurrence.

The following example checks to see if any data in the form has been retrieved from the
database (`$formdb` equals 1). If so, it releases database controls on this data so
that it can be modified and inserted as new occurrences.

```procscript
; trigger: Clear

if ($formdb = 1)
   release
   message "Control released; data available as default"
   return (0)
else
   clear
   return (0)
endif
```

## Related Topics

- [clear](clear.md)
- [lookup](lookup.md)
- [Clear](../triggersstandard/clear.md)


---

# reload

Reread and lock the current occurrence from the database.

reload{/nolock}

## Switches

/nolock—reread the current
occurrence without locking them in the database.

## Return Values

If the occurrence exists, the usual values
returned in $status during database interaction apply.

Values returned by reload in $status

| Value | Meaning |
| --- | --- |
| 0 | Data successfully reloaded. |
| -1 | Record not found: end of file encountered. |
| -2 | Occurrence not found: table is empty. |
| -3 | Exceptional I/O error (hardware or software). |
| -11 | Occurrence already locked. |
| -16 | Network error: unknown. |

Values commonly returned by $procerror following reload

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |

## Use

Allowed in all Uniface component types except
static and dynamic server pages.

## Description

The reload statement reads the
updated version of the current occurrence into the component and locks it in the database. This
statement is used in combination with the lock statement to reload an occurrence
from the database which has been modified by another user. It should only appear in the Lock
trigger.

**Note:**   Neither reload nor
reload/nolock is supported by the TXT driver.

The following example locks the record (with the
lock statement) and if the record has been modified ($status
is -10), performs a reload :

```procscript
; trigger <Lock>
lock
if ($status = -10)
  reload
endif
```

## Related Topics

- [lock](lock.md)
- [read](read.md)


---

# remocc

Mark an occurrence of the specified entity for deletion at the next store.

remocc  Entity, OccurrenceNumber

## Parameters

* Entity—entity where an
  occurrence is to be removed. Can be a string, or a field, variable, function, or parameter that
  evaluates to a string containing the name.
* OccurrenceNumber—sequence
  number (in the component) of the occurrence to be removed; can be a constant, or a field (or
  indirect reference to a field), a variable, or a function that can be converted to a whole
  (integer) number; the value will be truncated to form an integer.

## Return Values

Values returned in $status following
remocc

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| >=0 | Sequence number of the occurrence that became current after removing an occurrence. |

Values commonly returned by $procerror following
remocc

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1 | <UGENERR\_ERROR> | An error occurred. Entity is the outer entity of a Record component. |
| -1102 | <UPROCERR\_ENTITY> | Entity is not a valid name or the entity is not painted on the component. |
| -1203 | <UPROCERR\_RANGE> | Value out of range. For example, OccurrenceNumber is greater than the number of occurrences of Entity. |

## Use

Allowed in all Uniface component types.

## Description

The remocc statement removes
an occurrence of Entity from the component and *marks* it for
deletion from the database when the data is stored. The store command activates
the Delete trigger of each database occurrence of an outer entity that was marked for removal, and
for each of its Down entities. For more information, see [Delete](../triggersstandard/delete.md).

The occurrence will be found if a
retrieve/o is used; in this case, retrieve/o sets
$status to 3.

If OccurrenceNumber is:

* < 0, the last occurrence in the component
  structure is removed.
* 0, the current occurrence of
  Entity is removed (default).
* Greater than the number of occurrences of
  Entity, $status is set to -1 and no occurrence is removed.

The behavior following remocc
is governed by the location of the removed occurrence:

* If the removed occurrence is not the last
  occurrence, the *next* occurrence is made active after a remocc.
* If the removed occurrence is the last
  occurrence, the *previous* occurrence is made active after remocc.
* If the component contains only one
  occurrence, that occurrence is removed and a new, empty occurrence becomes the *current*
  occurrence.

If you want to filter out occurrences that you
have retrieved but do not want to process, rather than using a remocc statement,
you should use the discard statement or the u\_where clause
with the read statement.

**Note:**   The remocc statement sets
the current entity, causing a change in the active path. This can result in the structure editor
activating certain data validation triggers.

## Removing Occurrences

The statements in the following example remove the current occurrence of the CUSTOMER
entity if the INVAMOUNT field is less than or equal to 0:

```procscript
; trigger <Leave Modified Occurrence>

if (INVAMOUNT <= 0)
   remocc "CUSTOMER", 0
   message "Customer with no debt removed."
endif
```

## Related Topics

- [creocc](creocc.md)
- [delete](delete.md)
- [discard](discard.md)
- [erase](erase.md)
- [read](read.md)
- [setocc](setocc.md)
- [store](store.md)
- [$curocc](../procfunctions/_curocc.md)
- [$entname](../procfunctions/_entname.md)
- [$occdel](../procfunctions/_occdel.md)
- [Data Validation](../../../howunifaceworks/datavalidation/data_validation1.md)
- [u_where](uwhere.md)


---

# repeat

Define a repeat/until loop.

repeat

      ... one or more Proc
statements ...

until  (Condition)

## Parameters

Condition—boolean expression
that must evaluate to TRUE before the repeat loop can end. Uniface performs
implicit data type conversion if the expression is of a data type other then Boolean.

## Return Values

The repeat statement does not
affect $status.

## Use

Allowed in all Uniface component types.

## Description

The repeat statement loops
through the Proc statements that follow it until the Condition on the
until clause is evaluated as TRUE (that is, nonzero). Uniface
then leaves the loop and continues with the statement following the until clause
(if any).

You are advised to indent all statements between
the repeat and corresponding until. Use the
break statement to terminate a
repeat/until loop early.

Conditional statements such as
if/endif,
while/endwhile, and
repeat/until can be nested up to 32 levels.

## Repeat/Until Loop

The following example shows the use of the
repeat statement. The example loops through all the occurrences of entity E1,
until it finds an occurrence where the values of the fields F2 and NAMEDUMMY are the same, or until
all the occurrences have been checked.

```procscript
; F2.E1 is a character string field containing a name
; loop until field matches or setocc is out of occurrences
; field: NAMEDUMMY.E1

if (F2.E1 != NAMEDUMMY)
   vCurrOcc = $curocc
   $NAME$ = NAMEDUMMY
   i = 1
   repeat
      setocc "E1", i
      i = (i + 1)
   until ((f2.E1 = $NAME$) | ($status < 0))
   if ($status < 0)
      message "%%$NAME$%%% is not available."
      setocc "E1", vCurrOcc
      return (-1)
   endif
endif
$prompt = F2.E1
```

## Related Topics

- [break](break.md)
- [selectcase](selectcase.md)
- [Operators](../../proclanguage/operators/operators.md)
- [Conditions](../../proclanguage/statements/conditions.md)
- [Type Conversion](../../datatypehandling/datatypeconversion.md)


---

# reset

Reset the value of the specified Proc function to `0`.

reset  LiteralProcFunctionName

## Parameters

LiteralProcFunctionName—literal
name of a Proc function, including the leading dollar sign ($).

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | reset cannot be used with LiteralProcFunctionName |
| 0 | LiteralProcFunctionName was successfully reset. |

## Use

Allowed in all Uniface component types.

## Description

The reset statement resets the
value of the Proc function LiteralProcFunctionName to FALSE
(0). It can be used only with functions where this is indicated in their
documentation.

## Resetting $formmod

The following example sets the CITY field in a
form, then resets the component instance modification indicator, $formmod:

```procscript
; trigger <Execute>
city = "New Orleans"  ; this sets $formmod to 1
reset $formmod
edit NAME
```

## Related Topics

- [set](set.md)


---

# retrieve

Activate the Read trigger for the first outermost entity and all related entities, or
for a specific entity.

retrieve/e}  {Entity}

retrieve/x  {Entity}

retrieve/a  {Entity}

retrieve/o  {Entity}

retrieve/reconnect  {Entity}

## Switches

* /e—activates the Read
  trigger of the current entity ($entname) or of Entity.
* /x—retrieve an additional
  occurrence of the specified entity without discarding the hitlist. For more information, see [retrieve/x](retrievex.md).
* /a—retrieve multiple
  additional occurrences of the specified entity without discarding the hitlist. For more information, see [retrieve/a](retrievea.md).
* /o—attempt to locate an
  occurrence of an entity using the current primary key value. For more information, see [retrieve/o](retrieveo.md).
* /reconnect—reconnect data
  loaded from an XML stream with the occurrences in a database or component. For more information, see [retrieve/reconnect](retrieve_reconnect.md).

## Parameters

Entity—entity to be retrieved.
Can be a string, or a field, variable, function, or parameter that evaluates to a string containing
the name. Entity can be omitted in entity and field-level triggers, where there
is a current entity.

## Return Values

Because retrieve activates
Read triggers, the values in $status and $procerror after
retrieve may have been set by the Proc code in the Read trigger. Keep this in
mind when testing following a retrieve statement.

**Tip:** 

After the Read trigger is activated,
$rettype function indicates the type of retrieval request that activated it.
This can be useful for conditional post-retrieval processing. For more information, see [$rettype](../procfunctions/_rettype.md).

Values returned by retrieve in $status after retrieve/e

| Value | Meaning |
| --- | --- |
| 0 | Data was successfully retrieved. Or, no entities are painted on the component. |
| -1 | Record not found: end of file encountered. |
| -2 | Occurrence not found: table is empty. (No hits were found in the table or file.) |
| -3 | Exceptional I/O error (hardware or software). |
| -4 | Open request for table or file failed. The table or file is not painted, or it does not exist. |
| -9 | An attempt to open a DBMS failed because the maximum number of DBMS logons has already been reached. |
| -15 | The entity is painted as an up (foreign) entity and multiple hits were found during the database lookup. |
| -16 | Network error: unknown. |

Values commonly returned by $procerror following retrieve/e

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -4 | <UIOSERR\_OPEN\_FAILURE> | The table or file could not be opened. The entity is not painted or the corresponding table or file does not exist in the database. |
| -9 | <UIOSERR\_LOGON\_ERROR> | DBMS logon error; for example, the maximum number of DBMS logons has already been reached. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |
| -35 | <UGENERR\_4GL\_SAYS\_ERROR> | A trigger returned a negative value in `$status`. |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

Without the /e switch, the
retrieve statement activates the Read trigger of the first outermost entity on
the component. If the /e switch is specified, it activates the Read trigger of
the current entity ($entname) or of Entity.

Activating the Read trigger causes the Read
triggers of any inner entity to be activated. Any previously built hitlists are discarded. However,
if the outer entity is in the application model, but its DBMS Path is
`Not in database`, the Read triggers of the inner entities are not activated. In this
case, ensure that the read statement in the outer entity's Read trigger
explicitly retrieves the inner entity. For example:

```procscript
;Read trigger of ENT1
; ENT1 is a modeled non-database entity, drawn as an outer entity
; ENT2 is a modeled database entity, drawn as an inner entity of ENT1
read
retrieve/e "ENT2"
```

If a retrieve statement is
used in a Retrieve trigger, the Read triggers that it activates depend on the profile supplied by
the user or by Proc code in the Retrieve trigger. If a specific primary key value for an outer
entity is supplied, only the Read trigger of a single outer entity (and all its inner entities) is
activated.

The retrieve statement
activates the Read triggers only for entities painted on the screen. As a result, the
retrieve statement does not fetch all the occurrences in the hitlist, only
enough occurrences to populate the component with data. (This functionality is influenced by the
select cache mechanism.) To retrieve all the occurrences into the component, you need, use a
setocc "\*",-1.

**Caution:** 

A
setocc `"*",-1` has drastic consequences if the user issues an
^ERASE on a form component.

You cannot use a Uniface variable-length field to
provide the selection criteria. This also applies to any fields in the variable portion of an
entity.

A retrieve statement in the
Retrieve Sequential trigger behaves exactly the same as one in the Retrieve trigger. However, the
Retrieve Sequential trigger is only activated when a component has Record behavior. This type of
component only allows one occurrence of the outer entity.

## Displaying an Unrelated Entity

The following example shows some Proc code that
uses the retrieve/e statement to display an unrelated entity.

In the form in the following illustration, there
is no direct relationship between occurrences in B and occurrences in C. However, occurrences in C
share a common foreign key with occurrences in B.

Unrelated Inner Entities

In the Occurrence Gets Focus trigger of entity C,
there is a `retrieve/e` statement to display the relevant occurrence of B. This can
be necessary when there is no direct relationship between two inner entities.

```procscript
; trigger <Occurrence Gets Focus>
; Set up foreign key in other entity (entity C)
; and then get the correct occurrence of B

PRODUCT_VERSION.B = PRODUCT_VERSION.C
retrieve/e "B"
```

If you have painted two or more unrelated outer
entities, you will need to include additional `retrieve` statements. The single
default `retrieve` statement will only cause the first outer entity (and its related
entities) to be retrieved. To retrieve any other outer entities, you need to include additional
`retrieve/e` statements in the Retrieve trigger. The following figure illustrates
this:

Unrelated Outer Entities

When the Retrieve trigger is activated, the
default single `retrieve` statement only retrieves data from entity A. To retrieve
data for entities B and C, the following Proc code should be placed in the Retrieve trigger:

```procscript
trigger _retr

retrieve
if ($status <0)
   message "Retrieve did not succeed; see message frame"
endif
retrieve/e "B"
if ($status <0)
   message "Retrieve on B did not succeed; see message frame"
endif

end ; retrieve trigger
```

This will ensure that the form is correctly
populated with data when the ^RETRIEVE structure editor function is activated. Be aware that the
Proc compiler will generate the warning that there is no path to entity B. It is your
responsibility to define this path if it is required.

## Related Topics

- [lookup](lookup.md)
- [read](read.md)
- [selectdb](selectdb.md)
- [setocc](setocc.md)
- [Read](../triggersstandard/read.md)
- [retrieve/a](retrievea.md)
- [retrieve/o](retrieveo.md)
- [retrieve/reconnect](retrieve_reconnect.md)
- [retrieve/x](retrievex.md)
- [Leave Modified Key](../triggersstandard/leavemodifiedkey.md)


---

# retrieve/a

Retrieve multiple additional occurrences of the specified entity without discarding
the hitlist.

retrieve/a  {Entity}

## Switches

/a—uses the current occurrence
of Entity as a profile to retrieve multiple occurrences matching that profile
statement. It is an extension of the retrieve/x statement.

## Parameters

Entity—entity for which
additional occurrences are to be retrieved. Can be a string, or a field, variable, function, or
parameter that evaluates to a string containing the entity name. If omitted, the current entity is
used.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| `0` | No hits were found using the profile. |
| <0 | An error occurred. $procerror contains the exact error.  Since retrieve/a can activate Read triggers, the values in $status and $procerror after retrieve/a might have been set by the Proc code in the Read trigger. Keep this in mind when testing following a retrieve/a statement. |
| >0 | Success. Number of occurrences that match the retrieve/a profile occurrence. |

Values commonly returned by $procerror following retrieve/a

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> () | Errors during database I/O. |
| -16 through -3 | <UNETERR\_\*> (0) | Errors during network I/O. |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

When using the retrieve/a
statement, you need to create a separate occurrence for the new retrieve profile.

Uniface searches for the occurrence in the
following way:

1. If the currently active hitlist is stepped and
   not yet completed, it is completed first.
2. A where clause is generated
   based on the retrieve profile (the current occurrence of Entity). A database
   query for retrieving multiple records is executed.
3. The hits from the new hitlist returned by the
   DBMS are added to the existing hitlist.
4. The retrieve profile occurrence is deleted.
5. The extended hitlist is completed if it was
   stepped.
6. Duplicate entries from the hitlist are
   removed.
7. The first newly added occurrence is loaded.

The following example retrieves occurrences with
a new profile using `retrieve/a` :

```procscript
clear
PK = 1
retrieve
creocc ; create occurrence for profile
PK = ">10"
retrieve/a ; retrieve
```

## Related Topics

- [lookup](lookup.md)
- [retrieve](retrieve.md)
- [retrieve/x](retrievex.md)
- [retrieve/o](retrieveo.md)
- [Leave Modified Key](../triggersstandard/leavemodifiedkey.md)


---

# retrieve/o

Attempt to locate an occurrence of an entity using the current primary key value.

retrieve/o  {Entity}

## Parameters

Entity—entity where an
occurrence is to be located. Can be a string, or a field, variable, function, or parameter that
evaluates to a string containing the name.

## Return Values

Values returned by retrieve/o in $status

| Value | Meaning |
| --- | --- |
| 4 | The occurrence was found in the component. The current occurrence is removed and the cursor repositioned on the found occurrence. |
| 3 | The occurrence was found among the removed occurrences; it was unremoved. |
| 2 | The entity is painted as an up (foreign) entity and one hit was found in the database. |
| 1 | The entity is painted as an up (foreign) entity with code in the Write Up trigger and the key value was not found during the database lookup. It is assumed that this is a new occurrence. |
| 0 | A new occurrence was created. |
| -1 | Record not found: end of file encountered. |
| -2 | The entity is painted as an up (foreign) entity and the key value was not found during the database lookup. |
| -3 | Exceptional I/O error (hardware or software). |
| -4 | Open request for table or file failed. The table or file is not painted, or it does not exist. |
| -7 | The key exists in the database but was not found in the hitlist. This occurs when the user tries to enter a duplicate key. |
| -11 | Occurrence already locked. |
| -14 | The entity is painted as a normal down entity and multiple hits were found during the database lookup (ambiguous key). |
| -15 | The entity is painted as an up (foreign) entity and multiple hits were found during the database lookup. |
| -16 | Network error: unknown. |

Values commonly returned by $procerror following retrieve/o

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |
| -2 | <UIOSERR\_OCC\_NOT\_FOUND> | The entity is painted as an up entity and the key value was not found during the database lookup. |
| -7 | <UIOSERR\_DUPLICATE\_KEY> | The key exists in the database but was not found in the hitlist. This occurs when the user tries to enter a duplicate key. |
| -14 | <URETERR\_MULTIPLE\_DOWN> | The entity is painted as a normal down entity and multiple hits were found during the database lookup (ambiguous key). |
| -15 | <URETERR\_MULTIPLE\_UP> | The entity is painted as an up entity and multiple hits were found during the database lookup. |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

The retrieve/o statement tries
to find an occurrence with the current primary key, both in the DBMS and in the component. If the
primary key data is not available, it tries to find an occurrence using the candidate key data, if
available. You should use the retrieve/o statement in the Leave Modified Key
trigger, where it can be used instead of a lookup statement.

**Note:**   The retrieve/o statement
does not activate the Read trigger of an entity. By definition, it makes the retrieved occurrence
current. If no primary key fields are painted, the retrieve/o statement
positions the cursor at an arbitrary place.

If an entity is defined as non-database,
retrieve/o does not search the component for an occurrence. If this is required,
define the entity as stored in a database, but remove the write statement from
the Write or Write Up triggers for the entity. This should be done in the application model. This
ensures that an entity does not get stored in the database, and has the same effect as defining the
entity as non-database.

When the retrieve/o statement
is executed, Uniface searches for the occurrence in the following way:

1. It inspects the component. If Uniface finds a
   matching occurrence, the current occurrence is removed and the cursor scrolls forward or backward
   to the found occurrence. If the occurrence was removed, it is unremoved, unless the profile
   contained a wildcard.
2. If Uniface does not find a matching
   occurrence in the component, the entire hitlist is inspected. If it finds a match in the hitlist,
   occurrences are fetched until the matching occurrence is found. If the occurrence is not found in
   the hitlist, but it is present in the database, $status is set to -7.

The above steps are equivalent to Uniface doing a
setocc to the appropriate occurrence.

The Leave Modified Key trigger often contains a
retrieve/o statement to prevent the user from entering a primary key value which
is already in use.

The following example shows the default Proc code present in the Leave Modified Key
trigger. Note that a `retrieve/e` statement is used if a single occurrence is found
in an up entity. The example shows the use of checks on `$status` to determine the
result of a `retrieve/o` statement:

```procscript
retrieve/o
if ($status < 0)
if ($status=-15) message $text(2202);Multiple hits: in foreign entity
if ($status=-14) message $text(2205);Multiple hits: not in foreign entity
   if ($status=-11) message $text(2009);Occurrence currently locked
   if ($status=-7) message $text(2006);Duplicate key
   if ($status=-4) message $text(2003);Cannot open table or file
   if ($status=-3) message $text(2002);Exceptional I/O error
   if ($status=-2) message $text(2200);Key not found:in foreign entity
else
   if ($status=1) message $text(2201);Key not found:foreign entity w/WRITE UP
   if ($status=2);One occurrence found in foreign entity
      retrieve/e
      if ($status < 0) message $text(2002);I/O error detected
   endif
   if ($status=3) message $text(2203);Occurrence un-removed
   if ($status=4) message $text(2204);Key found:occurrence repositioned
endif
return ($status)
```

## Related Topics

- [lookup](lookup.md)
- [retrieve](retrieve.md)
- [retrieve/x](retrievex.md)
- [Leave Modified Key](../triggersstandard/leavemodifiedkey.md)


---

# retrieve/reconnect

Reconnect data loaded from a disconnected records set (XML, JSON, or Struct) with the
occurrences in a database or component.

retrieve/reconnect  {EntityName}

## Parameters

EntityName—entity painted on
the component. Can be a string, or a field, variable, function, or parameter that evaluates to a
string.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| 0 | Occurrence was successfully reconnected. |
| >0 | Number of errors encountered.  In this context, an error is defined as the number of times an On Error trigger returned a negative value. |

## Use

Allowed in all Uniface component types.

## Description

Used after the xmlload,
webload, structToComponent statements,
retrieve/reconnect resolves the occurrence state information stored in the
processing information attributes of the XML stream. The procedure followed for each occurrence
depends on the value of the status attribute, described in the following
paragraphs, for each occurrence in the XML stream. For more information, see [Occurrence Metadata](../../../integration/xml/concepts/processing_information.md) and [Reconnect Process](../../../howunifaceworks/dataio/disconnectedrecordssets/reconnect_process.md).

The behavior of
retrieve/reconnect is the same as reconnect. For more information, see [reconnect](reconnect.md).

## Receiving an XML Stream

The following code shows
an operation that receives an XML stream, and loads the data from the XML into
the component’s data structure.

```procscript
operation XMLIN
; This operation receives and
; reconnects an XML stream.

params
   xmlstream [DTD:ABCDTD.ABC] MYSTREAM : IN
endparams

clear
xmlload MYSTREAM, "DTD:ABCDTD.ABC"
retrieve/reconnect
...
```

## Related Topics

- [xmlload](xmlload.md)
- [webload](webload.md)
- [structToComponent](structtocomponent.md)
- [$occvalidation](../procfunctions/_occvalidation.md)
- [$instancemod](../procfunctions/_instancemod.md)
- [$formmod](../procfunctions/_formmod.md)
- [$fieldvalidation](../procfunctions/_fieldvalidation.md)
- [fieldsyntax](fieldsyntax.md)
- [$fieldsyntax](../procfunctions/_fieldsyntax.md)
- [Disconnected Record Sets](../../../howunifaceworks/dataio/disconnectedrecordssets/disconnected_record_sets.md)


---

# retrieve/x

Retrieve an additional occurrence of the specified entity without discarding the
hitlist.

retrieve/x  Entity

## Parameters

Entity—entity for which
additional occurrences are to be retrieved. Can be a string, or a field, variable, function, or
parameter that evaluates to a string containing the name.

## Return Values

The values returned in $status
following retrieve/x are:

Values returned by retrieve/x in $status 

The retrieve/x statement can
set $status; however, since retrieve/x can activate Read
triggers, the value in $status after retrieve/x can have been
set by the Proc code in the Read trigger.

| Value | Meaning |
| --- | --- |
| 5 | One hit was found in the database. |
| 4 | The occurrence was found in the component. The current occurrence is removed and the cursor repositioned on the found occurrence. |
| 3 | The occurrence was found among the removed occurrences; it was unremoved. |
| 1 | The entity is painted as an up (foreign) entity with code in the Write Up trigger and the key value was not found during the database lookup. It is assumed that this is a new occurrence. |
| 0 | The occurrence does not exist. |
| -3 | Exceptional I/O error (hardware or software). |
| -11 | Occurrence already locked. |
| -14 | The entity is painted as a normal down entity and multiple hits were found during the database lookup (ambiguous key). |
| -15 | The entity is painted as an up (foreign) entity and multiple hits were found during the database lookup. |
| -16 | Network error: unknown. |

Values commonly returned by $procerror following retrieve/x

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |
| -14 | <URETERR\_MULTIPLE\_DOWN> | The entity is painted as a normal down entity and multiple hits were found during the database lookup (ambiguous key). |
| -15 | <URETERR\_MULTIPLE\_UP> | The entity is painted as an up entity and multiple hits were found during the database lookup. |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

The retrieve/x statement
allows you to retrieve an additional occurrence of an entity without discarding the current
hitlist. This is useful when you want to retrieve an occurrence that does not match the profile
provided, but which is still related to occurrences already fetched.

**Note:**   If there is a partially completed stepped
hitlist, it is completed before the new occurrence is retrieved.

The retrieve/x statement tries
to find an occurrence with the current primary key, (not the candidate key) both in the DBMS and in
the component. Uniface searches for the occurrence in the following way:

1. It inspects the component. If Uniface finds a
   matching occurrence, the current occurrence is removed and the cursor scrolls forward or backward
   to the found occurrence. If that occurrence was removed, it is put back, unless the profile
   contained a wildcard.
2. If Uniface does not find a matching
   occurrence in the component, the entire hitlist is inspected:

   * If it finds a match in the hitlist,
     occurrences are fetched until the matching occurrence is found.
   * If the occurrence is not found in the
     hitlist, but is present in the database, the occurrence is loaded and added to the hitlist. (The
     Read trigger is activated to fetch the occurrence into the component.) If Entity
     is painted as a down entity, the new occurrence is added to the hitlist even if it is not related
     to the up entity.

## Related Topics

- [retrieve](retrieve.md)
- [retrieve/a](retrievea.md)
- [retrieve/o](retrieveo.md)


---

# return

Exit from the Proc module, optionally returning a value to
$status.

return  {Expression}

## Parameters

Expression—expression that
evaluates to a value of any data type. To improve readability, parentheses (())
are often included as a part of Expression.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| 0 | Expression is not present, or is converted from a data type that cannot be expressed as a number. |
| >0 | Value of Expression if it evaluates to a numeric. |

$procerror is
`0`.

## Use

Allowed in all Uniface component types.

## Description

The return statement exits
from the Proc module, and returns the specified value.

If you use Expression to return
a status, you should be aware that in many triggers, returning a negative value causes the cursor
to remain in the field. For more information, see the descriptions of the individual triggers.

If the module was invoked by a statement, such as
call or activate, the return value of the module is assigned
to $status (and automatically converted to a numeric if the data type is not
numeric).

If the module was invoked using an inline
construction (such as an instance handle or a function argument), the return value is returned
inline, and the value of $status remains unchanged.

For entry Proc modules, you can specify the data
type of the return value using the returns declaration before the
parameters block. For operations, the return value of an operation is always
Numeric.

The following example uses the
return statement to prevent the user from quitting a modified form without
confirming the action:

```procscript
; trigger Quit
; check for modifications: if no changes
; end and set $status = 0
; return (-1) prevents user from leaving form

if ($formmod = 0)
   return
else
   askmess "Data modified! Do you want to store? (Y/N)"
   if ($status = 1)
      store
      if ($status < 0)
         message "Store error number %%$status%%%"
         return (-1)
      endif
   else
      return (0) ;leave form without storing
   endif
endif
```

History

| Version | Change |
| --- | --- |
| 9.6.02 | If Expression is specified, it can evaluate to any data type, not just numeric. To make use of this change, you must recompile your Proc code. |

## Related Topics

- [break](break.md)
- [done](done.md)
- [end](end.md)
- [exit](exit.md)
- [$status](../procfunctions/_status.md)
- [Return Values, Status Values, and Proc Errors](../../proclanguage/return_values.md)


---

# returns

Define the returned data type of an entry.

returns  DataType

## Parameters

DataType—any Uniface
datatypes.

## Return Values

The returns statement does not
affect $status.

## Use

Allowed in all Uniface component types.

## Description

The returns Proc statement
defines the returned data type of an entry. It should be placed before the parameters block.

The following code is an example of how to code
for the Proc statement `returns`:

```procscript
entry MULTIPLY
returns numeric
params
   numeric PAR1 : IN
   numeric PAR2 : IN
endparams

variables
   numeric MULTIPLYRESULT
endvariables

MULTIPLYRESULT = PAR1 * PAR2
return MULTIPLYRESULT
end ; MULTIPLY
```

## Related Topics

- [return](return.md)
- [entry](entry.md)
- [Return Values, Status Values, and Proc Errors](../../proclanguage/return_values.md)


---

# rollback

Undo the transaction (if supported by DBMS).

rollback  {`"`PathString`"`}

## Parameters

PathString—string constant
that contains the required path name:

* If PathString starts with
  a dollar sign ($), the argument is assumed to be a path name. Updates to all
  entities accessed through that path are rolled back. In this case, assignments determine which
  entities are rolled back.
* Otherwise, the argument is assumed to be a
  DBMS (driver path) defined in the application model. Updates to all entities assigned to that DBMS
  are rolled back. In this case, the model definition determines which entities are rolled back.

If PathString is omitted, all
updates made by the transaction to all DBMSs are rolled back. If the target DBMS does not support
rollback, this statement is ignored.

## Return Values

Values returned by rollback in $status

| Value | Meaning |
| --- | --- |
| 0 | Data was successfully rolled back. |
| < 0 | An error occurred. $procerror contains the exact error. |
| -3 | Exceptional I/O error (hardware or software). |
| -9 | An attempt to open a DBMS failed because the maximum number of DBMS logons has already been reached. |
| -16 | Network error: unknown. |

Values commonly returned by $procerror following rollback

| Value | Error constant | Meaning |
| --- | --- | --- |
|  | <UIOSERR\_\*> (-2 through -12) | Errors during database I/O. |
|  | <UNETERR\_\*> (-16 through -30) | Errors during network I/O. |
| -1107 | <UPROCERR\_PATH> | The path name is not correct or the path does not exist, for example, no assignment is found for the path. |

## Use

Allowed in all Uniface component types.

## Description

The rollback statement undoes
all updates to the database made since the last commit or
rollback was issued (or since the application started or the path was opened),
and unlocks all occurrences.

This statement is usually used when a
store or commit fails.

To avoid currency problems, use
rollback (or commit) at the highest level of the component
tree for the current transaction, unless the component has the property Keep Data in
Memory selected. In this case, you should use rollback at that
level. The following illustration shows how to do this:

Transaction Control at the Highest Level of the Component Tree

The following example uses rollback when a store
statement fails:

```procscript
; trigger Store
store
if ($status < 0)
   message "Store error number %%$status."
   rollback
else
   message "Store done."
   commit
endif
```

## Related Topics

- [commit](commit.md)
- [store](store.md)
- [Transaction Control](../../../howunifaceworks/dataio/transaction_control/transaction_control.md)


---

# run

Starts the specified form.

run{/display | /query}  
FormName  {`,` VerticalPosition`,` HorizontalPosition  {`,` VerticalSize`,` HorizontalSize}}

## Switches

* /display—display the form
  as read-only.
* /query—displays the form as
  retrieve-only; that is, data can be entered into the fields, but only for a retrieve profile.

## Parameters

* FormName—string, or
  field (or indirect reference to a field), variable, or function that evaluates to a string (maximim
  fo 32 characters) containing the form file specification. If FormName does
  not include the complete file path specification and the form is not located using an assignment,
  Uniface looks for the requested form in the current directory.
* VerticalPosition,
  HorizontalPosition, VerticalSize and
  HorizontalSize—position and size of the form, expressed as integers representing
  character cells from the upper left corner of the application window

## Return Values

Sets $status to the value
returned by the Execute trigger of the form that was started, if that trigger contains a
return or exit statement. In this case,
$procerror is 0.

Values returned by run in $status 

The default values returned by
run (that is, if no return or exit
statement is present) are shown in this table.

| Value | Meaning |
| --- | --- |
| 10 | The user used ^QUIT to leave the form that was started with run. |
| 9 | The user used ^ACCEPT to leave the form that was started with run. |
| 0 | The form did not contain an edit or display statement in its Execute trigger. |
| <0 | An error occurred. $procerror contains the exact error. |
| -1 | FormSpec could not be found, or there is already a form with this name in the form stack. |
| -3 | The form that was started with run is a non-modal form and cannot be started with `run`. Use newinstance (or activate) instead. |

Values commonly returned by $procerror following run

| Value | Error constant | Meaning |
| --- | --- | --- |
| -58 | <UACTERR\_NO\_COMPONENT> | The named component cannot be found.  This error is also returned in case a modal form is started using run, and the form is already running. |
| -154 | <UACTERR\_INSTANCE\_NAME\_EXISTS> | An instance with this name already exists.  This error code is returned, for example, in the following cases:   * when a modal form which is already   active is activated again * when an attempt is made to activate a   modal form from a non-modal form |
| -1106 | <UPROCERR\_COMPONENT> | The component name provided is not valid; for example, the argument contains an empty string (""). |

## Use

Allowed in form components, and in service and
report components that are not self-contained.

Also allowed in the Application Execute trigger of
startup shells.

## Description

**Note:**  The run command has been
superceded by activate, which provides much more functionality and flexiblity
than run.

The `run` statement loads the form
named by FormDefinition and executes the statements in the Execute trigger.
After the form has been loaded, the form is known by its name in the Repository, excluding any file
specification provided in FormDefinition. For example, in the form is started by
the following statement, the function $formname returns the name of the form,
'QRY1':

```procscript
run "c:\t_forms\qry1.frm"
```

## Restrictions Using run

The activate statement
provides the same functionality as run, but provides more possibilities for the
component being started. Forms started with `run` have the following
restrictions:

* They are always modal and, thus, attached
* They do not offer a callable interface that
  allows operations to be activated and parameters to be passed
* They cannot receive messages sent with
  postmessage.
* They are not considered form instances;
  functions such as $componentname and $instancename return the
  form name, and $instanceparent returns an empty string.

## Labels with $text

When there are labels painted on the form that
are filled with $text, the values of $language and
$variation when the `run` statement is encountered determine the
language and library that are used for these labels. If Proc code in the Execute trigger of the
form changes the values of these functions, the changes are not reflected in the labels, since the
labels are loaded before the Execute trigger is activated.

You can override this behavior to some extent by
selecting the form component property Drop Component from Memory. In this
case, the form is not maintained in the form stack; the language and library are reestablished each
time the form is loaded.

## Use of Functions

When referring to a form created with
`run`:

* $formname returns the name
  of the form.
* $formdb,
  $formdbmod, and $formmod return various modification statuses
  associated with the form.
* $componentname,
  $componenttype, $instancechildren,
  $instancename, and $instanceparent return an empty string
  ("")
* $instancedb,
  $instancedbmod, and $instancemod return -1. These functions
  are meaningful only in component instances started (explicitly or implicitly) with the
  newinstance statement.

## Running a Form 1

The following example runs the form specified in
the field FORMNAME:

```procscript
; trigger Detail

run FORMNAME
if ($status < 0)
   message "Form named %%FORMNAME%%% not found."
endif
```

## Running a Form 2

The following example tries to run the form whose
name is contained in the component variable $FORM$. If the form has already been run, the current
form exits, returning to $FORM$.

```procscript
run $FORM$
if ($status = -1)
; the form is already running
   exit 0, $FORM$
endif
```

## Related Topics

- [activate](activate.md)


---

# scan

Scans a field or variable for a specified profile and returns the starting position
of the profile.

scan  String, Profile

## Parameters

* String—string, or a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string. If the
  String to be scanned is a Date, Time, or Datetime field, Uniface first converts
  the value to a string according to the default format from the language setup before performing the
  scan.
* Profile—string or syntax
  string, with a maximum length of 256 characters, that contains the profile to be matched. A string
  in Profile can be a string, or a field (or indirect reference to a field), a
  variable, or a function that evaluates to a string. A syntax string is enclosed in single quotation
  marks (' ').

## Return Values

No effect on $status.

Values returned by scan in $result

| Value | Meaning |
| --- | --- |
| >0 | Starting position in String of the first match. |
| 0 | Profile not found or String is an empty string (""). |

## Use

Allowed in all Uniface component types.

## Description

The scan statement returns to
$result the position of the first character of String that
matches the Profile provided. (The first character of a string is at position
1.)

## Profile

If a string is provided for
Profile, scan looks for an exact match for
Profile in String, and not just a pattern. Lowercase is seen
as lowercase, and uppercase as uppercase.

If a syntax string is provided for
Profile, lowercase is seen as both uppercase and lowercase, and uppercase is
seen as uppercase only.

You can also use $syntax to
specify that Profile is a syntax string. Use $syntax to
perform case-insensitive scans when the string contains diacritics (for example an umlaut).

If no character attributes (bold, underline, and
so on) are specified in the profile string, Uniface ignores them. In this case,
abc (bold) is the same as abc (not bold). The asterisk
wildcard (\*) in Uniface stands for 0- *n*  characters, so spaces also
qualify in the syntax check. However, one asterisk in the syntax string causes Uniface to check
only the following 32 characters.

The following examples show different ways of using the `scan` statement:

```procscript
$1 = "Nibble1"
NAME = "Myrtle"
scan $1,"bbl" ; $result = 3
scan $1,"house" ; $result = 0 (string not found)
scan $1,'#' ; $result = 7 (first number in string)
scan NAME,"yr*e" ; $result = 0
; (syntax strings must be in single quotes)
scan NAME,'yr*e' ; $result = 2 (syntax strings allowed)
scan $1, NAME[5,6] ; $result = 5 (scan $1, "le")
$2="schön"
scan $2, $syntax("hö*") ; $result=3
```

## Related Topics

- [length](length.md)
- [$syntax](../procfunctions/_syntax.md)
- [$scan](../procfunctions/_scan.md)


---

# scope

Declares the scope block, which specifies the data that is to be included in a DSP
request-response exchange.

`public` |
`partner`  `web`

{scope

    {`input`}

    {`output`}

    {`operation`  InstanceName.OperationName |
CallbackFunction().OperationName

    {`operation`  InstanceNameN.OperationNameN |
CallbackFunction().OperationName} } …\*

{endscope}}

## Arguments

* `public` |
  `partner`  `web`—see
  [web](web.md)
* scope and
  `endscope`—define the beginning and end of the scope declaration; If no scope block
  is defined, the scope is assumed to be both input and output scope.
* `input`—include all component
  data (with the exception of properties) in the request sent from browser to server.
* `output`—include all component
  data (including properties) in the response sent back from the server to browser.
* `operation`—use the scope
  definition of one or more specified operations. This enables you to include data from other DSPs.
  The instance name can be declared statically or dynamically:

  + Static declaration:
    `operation`InstanceName.OperationName
  + Dynamic declaration:
    `operation`CallbackFunction.OperationName}

    CallbackFunction is a
    weboperation (if the scope declaration is in an operation or in the Execute
    trigger), or webtrigger (if the scope declaration is in a trigger) that returns
    a list of DSP instances at runtime.

  **Note:**   An execute trigger cannot be included in a
  scope operation definition.

## Return Values

None

## Use

Allowed only in Dynamic Server Page components in
the following locations:

* Execute trigger
* Any operation, whether executed on the server
  (operation) or on the client (weboperation)
* Any field trigger that is valid for the
  assigned widget, including client-side triggers (webtrigger). For valid
  triggers, see the specific widget description.

## Description

The scope declaration specifies the data that is
to be included in a DSP request-response exchange. If no explicit scope declaration is specified,
the default is used, which is:

* All component data, with the exception of
  properties, is sent from the browser to the server
* All component data, including properties, is
  returned from the server to the browser. Data included in the output scope is blocked from being
  updated by other operations or triggers until the response has been received and the page updated.

The scope block is used by the
browser to select the input for a specified operation, or to block data expected in the response,
to ensure that data on the client and server are kept synchronized.

Client-side operations and triggers defined with
webtrigger and weboperation are subject to the same scope
rules as server-side operations and triggers. This means that if the JavaScript API is used to call
a client-side operation, execution of the operation may be postponed if its input or output is
blocked.

## Qualifying the Scope

If the web statement is
omitted, the operation is not available from the web. This ensures that Uniface components are
protected from unauthorized calls or attacks.

Setting the qualifier to `public
web`, makes it possible for a web browser to execute the trigger or operation in which the
scope statement occurs. This obviously has security risks associated with it, so
you need to use it appropriately. Typically, you can use it in the Detail and OnChange triggers to
accept some kind of user interaction, but you would not use it in an operation, especially one that
stores data.

## Input Scope

The following code sets the input scope of the
`showDetails` operation called in the Detail trigger of a field, then activates the
operation. When the user clicks on this field in the browser, the `showDetails`
operation on another server page is called.

```procscript
; Detail trigger of Picture field
public web
scope
   input
   operation MUSICDETAILS.ShowDetails ; where MUSICDETAILS is the instance name
endscope
; newinstance "DETAILS", "MUSICDETAILS" ; if instance != component

activate "MUSICDETAILS".ShowDetails(ITEMID)
```

The output scope of the called operation blocks
the data on the browser until the response containing that data is sent.

```procscript
operation ShowDetails
   partner web
   scope
      output
   endscope

   params
      string pItemId : IN
   endparams

   ITEMID.ITEMDETAILS/init = pItemId
   retrieve/e "ITEMDETAILS"
end
```

## Output Scope

The following example for a Clear button clears
the contents of the DSP. To prevent the current contents of the DSP from being sent to the browser,
which creates extra network traffic for data that is being discarded, only the output scope is
defined. After a clear command, Uniface returns an empty occurrence.

```procscript
;BTN_CLEAR DETAIL Trigger
public web
scope
  output
endscope

clear/e "PERSON"
if ($status < 0)
  webmessage/error "Clear failed ($status = %%$status%%%)"
endif
return 0
```

## Dynamic Scope

Dynamic scoping makes it possible to determine the
scope of an operation or trigger at runtime, instead of during development.

In a dynamic web application, components may be
created in response to user choices, and each instance needs to be uniquely named. The available
instances and their names are not known ahead of time, so they cannot be statically included in the
scope definition using `operation`InstanceName.OperationName.

Instead, you can use a callback function that
returns a list of dynamically-created DSP instances to be included in the scope of the operation or
trigger. For example:

```procscript
scope
  operation myCallbackFunction().myOperation 
endscope
```

The callback function is executed by the
Javascript API to determine the scope of the operation or trigger before it is executed. It does
not modify the input or output scope—the operation or trigger in which the callback function is
used will always be blocked by its callback function.

For more information, see [Dynamic Scope](../../../webapps/components/dsps/dynamicscoping.md).

## Dynamic Scope in Operations

The following example shows an operation
containing a mixture of static and dynamic scope declarations:

```procscript
operation createOrder
public web
scope
   input
   output
   operation I1.create               ;static declaration. I1 is an instance name.
   operation getInstances().create   ;dynamic declaration.
endscope
...
end
```

Because `createOrder` is an
operation, the `getInstances` callback function must be a
weboperation:

```procscript
weboperation getInstances
javascript
   var instanceName = this.getName();
   return [instanceName + "01", instanceName + "02"]
endjavascript
```

The JavaScript context of the callback function
is identical to the context of the `createOrder` operation, so the JavaScript
keyword `this` refers to the DSP instance of the `createOrder`
operation.

## Dynamic Scope in Triggers

The following example shows a dynamic scope
declaration in a Detail trigger:

```procscript
; Detail trigger
public web
scope
   input
   output
   operation getModifiedInstances().store
endscope

...
```

The `getModifiedInstances`webtrigger callback retrieves a list of instances from a field named
"INSTANCES".

```procscript
webtrigger getModifiedInstances
javascript
   var occ = this.getParent();
   var field = occ.getField("INSTANCES");
   return [field.getValue()];
endjavascript
end
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |
| 9.6.01 | Added dynamic scoping via CallbackFunction().OperationName |

## Related Topics

- [operation](operation.md)
- [weboperation](weboperation.md)
- [webtrigger](webtrigger.md)
- [Input and Output Scope](../../../webapps/components/dsps/inputandoutputscoping.md)
- [Execution of Server-Side Triggers and Operations](../../../webapps/components/dsps/dsprequestresponsecycle.md)
- [Race Conditions and Data Blocking](../../../webapps/applications/webappcommunication.md)


---

# selectcase

Define a block of conditional case selections.

selectcase  MatchExpression

{case  Expression1  {`,` Expression11
  {`,` Expression1N} }

    ... zero or more Proc
statements ...

{case  Expression2  {`,` Expression21
  {`,` Expression2N} }

    ... zero or more Proc
statements ...

...

{elsecase

    ... zero or more Proc
statements ... }

endselectcase

## Switches

* case—marks the beginning of
  a conditional block of Proc code to be evaluated
* elsecase—marks the Proc
  code to be executed if none of the case expressions match MatchExpression.
* endselectcase—marks the end
  of the case definitions

## Parameters

MatchExpression,
Expression—expressions that evaluate to any data type. Data type conversion may
be performed to allow a proper comparison to be made. For more information, see [Data Handling in Proc](../../datatypehandling/handling_data_in_proc.md)..

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

The selectcase statement
defines a series of conditional blocks of Proc code. Each block is defined as a case.

The MatchExpression is compared
to the Expressions on each case statement in turn. If
MatchExpression=Expression is TRUE, the
Proc statements in that block (up to the next case, elsecase,
or endselectcase statement, are executed). If no Expression
matches MatchExpression, the elsecase clause is executed.

If several cases are to be handled in the same
manner, you can put multiple expressions on the case statement. For example:

```procscript
selectcase vCase
   case 1, 2, 3
     Proc code
   case 4
     Proc code
   elsecase
     Proc code
endselectcase
```

A
selectcase/endselectcase block is equivalent to the following
if/endif block:

if(MatchExpression=Expression1 )

    ...

elseif(MatchExpression=Expression2 )

    ...

...

elseif(MatchExpression=Expressionn )

    ...

else

...

endif

The following example illustrates the
possibilities of the `selectcase` statement:

```procscript
selectcase $1
   case "" ;an empty string
      message "$1 is empty"
   case "ABC" ;a string
      message "$1 is ABC"
   case "abc" ;a string
      message "$1 is abc"
   case 'a*' ;a syntax string
      message "$1 matches syntax a*"
   case "DEF%%$2XYZ%%%" ;a string
      message "$1 is DEF%%$2XYZ%%%"
   case 123 ;an ordinary number
      message "$1 is 123"
   case 1.23e_+13 ;a floating point number
      message "$1 is 1.23e_+13"
   case MYFIELD.MYENTITY ;a field with value "abc"
      message "$1 is abc"
   case $date ;a date
      message "$1 is today"
   case $date + 7 ;a date
      message "$1 is one week from today"
   elsecase
      message "$1 is not what we expected"
endselectcase
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Added support for multiple expressions in a single `case` expression. |

## Related Topics

- [if](if.md)
- [repeat](repeat.md)
- [while](while.md)
- [Operators](../../proclanguage/operators/operators.md)


---

# selectdb

Calculate aggregate values for specified fields in the database.

`selectdb`  (LiteralFieldName) | (Function
(LiteralFieldName)) `%\`

{`,
(`LiteralFieldName `2 )` | `(`Function`(`LiteralFieldName `2 ))` } `%\`

{`,
(`LiteralFieldName `n )` | `(`Function`(`LiteralFieldName `n ))` } `%\`

   {from  Entity}  {using  Index}
 `%\`

      { {u\_where `(`SelectionCriteria`)` } |
{u\_condition `(`Condition`)` } }
 `%\`

to `(`Destination `1` {`,` Destination `2`  `,`  ...`,` Destination n }`)`

Since a selectdb statement can
be quite complex, using the line continuation marker (`%\`) can greatly improve the
readability of the statement.

## Clauses

* from—specifies the entity
  whose occurrences are to be compared; if omitted, the active occurrence of the current entity
  (available in $entname) is used.
* using—specifies the index
  Uniface should use for record-level DBMSs; ignored for field-level DBMSs. See the appropriate DBMS
  connector documentation to verify that the using clause is available for your
  DBMS.
* u\_where—specifies
  DBMS-independent selection criteria. It allows you to perform calculations on data in all
  occurrences that match the selection criteria, even if these have not yet become active in the
  component. If the entity is painted as an up entity, the u\_where clause is
  considered only if the foreign key is complete and not NULL. The clause can be used to further
  restrict the number of occurrences read for the up entity.
* u\_condition—provides a
  DBMS-independent profile for selection.
* to—specifies the
  destinations of the requested values

## Parameters

* LiteralFieldName—literal name
  of database field. If used alone (without Function), Uniface transports the
  value of the specified field from one of the selected records. (This is usually the last record,
  but see the appropriate connector documentation for information about your DBMS.)
* Function—one of the
  functions shown in
  [Functions](#table_30B1542381C446684E2A117FA0171E8F).
* Entity—entity to use. Can
  be a string, or a field, variable, function, or parameter that evaluates to a string containing the
  entity name.
* Index—numeric expression
  that evaluates to the index number required.
* SelectionCriteria
* Condition
* Destination—literal name of
  a field or variable in the component. There must be one destination for each requested value
  (defined by Function and *LiteralFieldName*).

## Return Values

Values returned by selectdb in $status

| Value | Meaning |
| --- | --- |
| >=0 | For a record-level DBMS, the number of occurrences that matched the selection criteria.   For a field-level DBMS, the value is always 1, indicating that 0 or more occurrences matched. |
| -1 | A LiteralFieldName does not exist, or Function cannot be used with this field type. |
| -3 | Exceptional I/O error (hardware or software). |
| -4 | Open request for table or file failed. The table or file is not painted, or it does not exist. |
| -9 | An attempt to open a DBMS failed because the maximum number of DBMS logons has already been reached. |
| -15 | Uniface network error. |
| -16 | Network error: unknown. |
| -20 | Nonexistent field in a u\_where clause. |

Values commonly returned by $procerror following selectdb

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30) | <UNETERR\_\*> | Errors during network I/O. |
| -1 | <UGENERR\_ERROR> | An error occurred. A LiteralFieldName does not exist, or Function cannot be used with this field type. |
| -403 | <UMISERR\_UWHERE> | Nonexistent field in a `u_where` clause. |
| -404 | <UMISERR\_TRX> | The TRX-formatted DML statement from a where clause or an sql statement exceeds 16 KB. |

## Use

Allowed in all Uniface component types.

## Description

The selectdb statement
calculates the requested values from the database and transports them to the destinations
specified. Each Function can be applied to a field in multiple occurrences in
the database to produce the calculated value.

**Note:**   The selectdb statement does
not work with variable-length fields.

If the from clause is
supplied, Entity should identify the entity whose occurrences are to be compared
as one of the following:

* String that evaluates to the name of an
  entity: `"INVOICES"`.
* A field, variable, or parameter that contains
  the name of an entity:

  + `FIELD1`, where FIELD1
    contains `"INVOICES"`.
  + `$1`, where $1 contains
    `"INVOICES"`.
  + $entname, where
    $entname contains `"INVOICES"`.
  + PARAM1, where PARAM1
    contains `"INVOICES"`.

In the to clause, there should
be one Destination specified for each requested value. If only one requested
value and Destination are specified, the parentheses are not required. (For the
precise usage, see the examples.) If no data is retrieved, the destinations remain unchanged.

## Functions

The functions available with
selectdb, along with the allowed data types for each, are shown in the following
table. If the specified function cannot be used with the given data type, Uniface returns an error
in $status. Depending on the packing code and target DBMS, there can be further
restrictions on the use of these functions. For more information, see the appropriate connector
documentation for your DBMS.

Functions and Data Types for selectdb

| Function | Result | String | Raw | Numeric | Float | Date | Time | Datetime | Boolean |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ave` | Sum of all values in the named field in the database divided by `count`. | No | No | Yes | Yes | No | No | No | No |
| `count` | Number of fields in the database that are filled. | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `max` | Largest value in the named field in the database (NULL is ignored). | No | No | Yes | Yes | Yes 1 | Yes 1 | Yes | Yes |
| `min` | Smallest value in the named field in the database (NULL is ignored). | No | No | Yes | Yes | Yes 1 | Yes 1 | Yes | Yes |
| `sum` | Sum of all values in the named field in the database. | No | No | Yes | Yes | No | No | No | No |

1. The value returned to the destination field or
   variable has data type Datetime. If the destination has data type $, the Datetime data remains.
   Otherwise, the value is converted to the destination data type.

## Guidelines and Limitations

In general, use the selectdb
statement when very specific values need to be loaded from the database at run time; for example,
to generate the next unique number, or for loading sums, averages, and so on, into dummy fields
when building a report.

The selectdb statement is not
very fast with databases that do not support this type of aggregate function. This is always the
case with a record-level DBMS such as RMS, because the driver and Uniface have to perform the
relevant sorting and aggregate function.

Using selectdb in combination
with a u\_where clause with record-level databases can result in poor
performance, because it is not possible to use the criteria to specify a preferred index (this is a
general drawback of the u\_where clause in record-level environments). Instead,
the primary key index is used. If this is not the field to which you are referring, expect poor
performance.

Be careful when using the
selectdb statement in the Read trigger immediately after a
read statement, for the following reasons:

* When selectdb is used in
  combination with a u\_where clause that references one of the fields of the
  occurrence just read, the attempted selection fails because the occurrence has not been fetched
  yet.
* When one of the fields of the occurrence just
  read is used as the Destination, the selection fails because the destination
  field is overwritten at the subsequent fetch. In the following example the value of PAYDATE is
  overwritten at the subsequent fetch:

  ```procscript
  ; trigger: Read
  read u_where (PAYDATE = "") order by "INVOICE_AMOUNT"
  selectdb (PRIMARY_KEY) from "INVOICES" to PAYDATE
  ```

## Calculations Based on Selection Criteria

In the following example, the
`selectdb` statement retrieves the highest invoice number and computes the total
invoice amount from the INVOICE entity for the customer named in $1. The invoice number is loaded
into $2 and the total invoice amount is placed in the dummy field TOTAL\_DUM.

```procscript
; trigger <Occurrence Gets Focus>

selectdb (max(INV_NUM), sum(AMOUNT)) %\
   from "INVOICES" %\
   u_where (CUSTOMER = $1) %\
   to ($2, TOTAL_DUM)
```

## Generating Sequence Numbers

The following example uses `selectdb` to generate the next unique
sequence number:

```procscript
; trigger Add/Insert Occurrence

selectdb max(INVOICE_NUMBER) %\
   from "INVOICES" %\
   to $1
INVOICE_NUMBER = $1 + 1
```

## Calculations Using Selected Data

The following example uses
`selectdb` to produce a report giving a total for a certain period:

```procscript
; trigger Print

SELECTDB sum(INV_AMOUNT) %\
   from "INVOICES" %\
   u_where (INV_DATE > $date(31-dec-1989)) %\
   & (INV_DATE < $date(01-apr-1990)) %\
   to Q1TOTAL.DUMMY
print "SALESLASER", "A"
```

## Counting Selected Occurrences

In the following example, the `selectdb` statement returns a count of
the number of occurrences in ENT2 that have the same name as the occurrence of ENT1 that was just
read.

**Note:**  It is necessary to qualify the field name left
of the relational operator `=` in the `u_where` clause to force it to
refer to ENT2, rather than the current entity, ENT1.

```procscript
; trigger <Read> (of ENT1)

read
if ($status = 0)
   selectdb count(NAME) from "ENT2" %\
   u_where (NAME.ENT2 = NAME.ENT1) %\
   to DUMMYFIELD
endif
```

## Related Topics

- [read](read.md)
- [Database Connectors](../../../dbmssupport/dbmsdrivers/dbmsconnectors.md)


---

# set

Set the value of the specified Proc function to 1 (TRUE).

set  LiteralProcFunctionName

## Parameters

LiteralProcFunctionName—literal name of a Proc function, including the
leading dollar sign ($).

## Return Values

Values Returned in $status

| Value | Meaning |
| --- | --- |
| <0 | set cannot be used with LiteralProcFunctionName |
| 1 | 1, if LiteralProcFunctionName was successfully set. |

## Use

Allowed in all components; however, service, session service, entity service, and report
components must not be self-contained.

## Description

The set statement sets the value of the Proc function
LiteralProcFunctionName to TRUE (1). It can be used only with
functions where this is indicated in the Synopsis.

## set $occcheck

The following example uses set to change the value of
$occcheck to TRUE (1):

```procscript
; trigger <Execute>
; set $occcheck to TRUE to enable checking

name = $1
retrieve
set $occcheck(INVOICE)
edit NAME
```

## Related Topics

- [reset](reset.md)


---

# setformfocus

Set the focus to the specified component instance.

setformfocus  {InstanceName}

## Parameters

InstanceName—name of a form
instance in the component pool.; can be a string, or a field (or indirect reference to a field), a
variable, or a function that evaluates to the string.

* If omitted, focus is set to the current form
  instance  InstanceName.
* If longer than 16 characters, the form name is
  truncated to that length. Trailing blanks are removed.
* If InstanceName does not
  currently have focus, Uniface activates the Form Loses Focus trigger of the form instance that
  loses focus and Form Gets Focus trigger of the form instance that receives focus.

## Return Values

Values Returned by setformfocus in $status

| Value | Meaning |
| --- | --- |
| 0 | Focus change requested from component manager. |
| < 0 | An error occurred. $procerror contains the exact error. |
| -1 | InstanceName is not in the component pool or is not correct (field or variable not found, or the string is not a valid instance name) |
| -2 | A modal form has focus; `setformfocus` cannot be used to change the focus. |

Values Commonly Returned by $procerror Following setformfocus

| Value | Error constant | Meaning |
| --- | --- | --- |
|  | <UNETERR\_\*> (-16 through -30) | Errors during network I/O. |
| -57 | <UACTERR\_NO\_INSTANCE> | The named instance cannot be found in the component pool. |
| -405 | <UMISERR\_SETFORMFOCUS> | Modal form has focus. In this case, `setformfocus` cannot be used to change the focus. |

## Use

Allowed in form components, and in service,
session service, entity service, and report components that are not self-contained.

## Description

The setformfocus statement
sends an asynchronous request to the component manager to set the form focus to the requested form
instance. For example, it can be used to change form focus in a master-detail construction. (For an
example, see
[postmessage](postmessage.md).)

To set focus to a form that represents a page of a
tab widget, assign the instance name of the desired form to the tab widget field. However, you can
also use the setformfocus statement with the instance name of a contained form
to make that page active.

**Caution:** 

Do not use setformfocus in
the Form Gets Focus or Form Loses Focus triggers, or in processing that is initiated in these
triggers. Doing so can cause your application or the operating system to stop responding.

## Related Topics

- [$formfocus](../procfunctions/_formfocus.md)


---

# setocc

Make a specific occurrence the current occurrence.

setocc  Entity, OccurrenceNumber

## Parameters

* Entity—entity in which an
  occurrence is to be made current. Can be a string, or a field, variable, function, or parameter
  that evaluates to a string containing the name. It can also be "\*", in which case all entities in
  the current instance are set to the occurrence specified.
* OccurrenceNumber—position
  of the new current occurrence; can be a constant, or a field (or indirect reference to a field),
  variable, or function that can be converted to a whole (integer) number; the value will be
  truncated to form an integer.

## Return Values

Values Returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| >=0 | Sequence number of the new current occurrence in Entity. |

Values Commonly Returned by $procerror Following setocc

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1 | <UGENERR\_ERROR> | An error occurred. Entity is the outer entity of a Record component. |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1203 | <UPROCERR\_RANGE | Value out of range. For example, OccurrenceNumber is greater than the number of occurrences of Entity |

## Use

Allowed in all Uniface component types.

## Description

The setocc statement makes
current the occurrence of Entity that is identified by
OccurrenceNumber. If  OccurrenceNumber  is :

* <0—last occurrence in the hitlist becomes
  current. This entails fetching all the occurrences in the hitlist.
* 0 or not specified—current occurrence is not
  changed.
* Between 1 and the current number of
  occurrences of Entity in the component, inclusive—indicated occurrence becomes
  current.
* Greater than the number of occurrences of
  Entity in the component—$status is set to -1 and the current
  occurrence remains current.

Using setocc to change the
current occurrence causes the Occurrence Gets Focus trigger to be activated when the trigger
containing the setocc completes. The Occurrence Gets Focus trigger is only
activated once, though, for the occurrence that is active at the end of the trigger containing the
setocc statement.

setocc has an immediate effect
on the value of $curocc. For example, a statement such as
setocc$entname,$curocc+1 immediately
increments the value of $curocc.

The statement `setocc "*",-1` 
does not return a total number of occurrences in $status, because the painted
entities are not likely to have the same number of occurrences.

**Caution:** 

Be careful with statements such as
`setocc "*",-1`, since they can have drastic effects when combined with statements
like erase. Issuing an erase after a setocc
"\*",-1 removes all the data that matches the profile given by the user in the entities of
the component.

## Giving Focus to the Last Occurrence in a Form

The following example uses
`setocc` to find the last customer number used in the database:

```procscript
; trigger <Execute>
; fetch all occurrences into form

retrieve
setocc "CUSTOMER",-1
message "Last customer is %%custnumber%%%."
edit
```

## Looping Through a Hitlist and Checking Occurrences

The following example shows
the use of the `setocc` statement to loop through a hitlist, checking that all
occurrences have been entered by the user.

```procscript
; Trigger Accept from Form W_ENTR4

$occ_num$ = 1
repeat
   setocc "ENTRANT", $occ_num$
   if (DRIVER_ID.ENTRANT = 0)
      message/info/nobeep "Not all places have been filled. %\
      Please complete the grid or Cancel."
      return(-1)
   endif
   $occ_num$ = $occ_num$ + 1
until ($occ_num$ > $totocc(ENTRANT))
```

## Related Topics

- [creocc](creocc.md)
- [remocc](remocc.md)
- [retrieve](retrieve.md)
- [$curocc](../procfunctions/_curocc.md)
- [$entname](../procfunctions/_entname.md)
- [$totocc](../procfunctions/_totocc.md)


---

# show

Display or refresh a form component, synchronizing the display and updating field and
property values.

show

## Return Values

Values Commonly Returned in $procerror Following show

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1402 | <UPROCERR\_STATEMENT> | show used in service component. |

## Use

Allowed only in form components.

## Description

The show statement displays a
form component. All current field values are displayed and current property values are applied
(with the exception of entity properties that refer to the current occurrence). No triggers are
fired.

Unlike the edit and
display statements, which wait for user input, code execution continues after
the show statement, without waiting for user input.

In some situations, Uniface may not update the display completely when using a show statement. This can be changed with the setting AsynchGui in the usys.ini. When set to 2 (Flush), the screen will be updated.

## Redisplaying Values as They are Updated

The following example shows the
`show` statement being used to redisplay values in a form as they are updated (that
is, while processing continues):

```procscript
entry CountDown()
variables
   numeric j
endvariables

MyField.MyEnt = 10
while (MyField.MyEnt > 0)
   show
   j = 10000
   while (j>0)
      j = j - 1
   endwhile
   MyField.MyEnt = MyField.MyEnt - 1
endwhile
```

## Related Topics

- [edit](edit.md)
- [$editmode](../procfunctions/_editmode.md)
- [$interactive](../procfunctions/_interactive.md)


---

# skip

Skip the specified number of lines when printing.

skip  {Expression}

## Parameters

Expression—number of lines to
skip; can be a constant, field, variable, or function that can be converted to a whole non-negative
number. The value will be truncated to form an integer value. If Expression is
omitted or is 0, one line is skipped.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| >=0 | Statement executed successfully |

Values Commonly Returned by $procerror Following skip

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1404 | <UPROCERR\_NO\_PRINTING> | Not printing (that is, `$printing` is 0). The skip statement is ignored. |

## Use

Allowed in all Uniface component types.

## Description

The skip statement skips the
number of lines defined in Expression.

The following rules are valid for
skip:

* If Uniface is not printing
  ($printing is 0) when this statement is issued, it is ignored.
* If the number of lines to be skipped is more
  than the number of lines left on the page, Uniface issues an eject instead and
  begins printing again at the top of the following page.
* When Uniface encounters a
  skip statement, it is carried out immediately; no other triggers are activated
  in the current line.

Negative expressions are not supported.

## Skipping Lines When Printing

The following example
shows Proc code which causes Uniface to skip two lines if the invoice date in the next occurrence
to be printed is not the same as the invoice date in the occurrence just printed. You are advised
to test if Uniface is printing (`$printing` is 1), before using the `skip` statement, as shown here:

```procscript
; trigger <Leave Printed Occurrence>
; $printing checks if printing is in process

if ($printing = 1)
   compare/next (INVDATE) from "INVOICE"
   if ($result = 0)
      skip 2
   endif
endif
```

## Related Topics

- [eject](eject.md)
- [$framedepth](../procfunctions/_framedepth.md)
- [$lines](../procfunctions/_lines.md)
- [$printing](../procfunctions/_printing.md)
- [$totlines](../procfunctions/_totlines.md)
- [Leave Printed Occurrence](../triggersstandard/leave_printed_occurrence.md)


---

# sleep

Set the current Uniface process in sleep mode for the specified amount of
time.

sleep  Ticks

## Parameters

Ticks—time period, specified in hundredths of a second. There is no
default value; you must specify a positive integer.

## Return Values

None

## Description

The sleep Proc statement requests the current Uniface application to
pause execution for *approximately* the specified period of time. The actual clock time
blocked is dependent on the underlying operating system.

**Caution:** 

sleep is guaranteed to block for at least the requested time, but,
depending on the operating system, the actual blocking time could be longer, because not all
systems support time resolution in ticks.

**Note:**  On Microsoft Windows, while a process is blocked using sleep, the
screen is not repainted, which could result in parts of the application screen going blank until
the sleep finishes. When you wish to use sleep for more than
a few seconds, consider using multiple sleep commands, or putting them in a
loop, so the screen can be repainted in between.

## sleep

The following example sets the application to sleep for at least 5 seconds:

sleep 500

---

# sort

Sort the occurrences in the hitlist for the specified entity.

sort{/e}  
Entity`,` Field{`:`SortOptions}  {;Field{`:`SortOptions
}}

Syntax of SortOptions:  
{Order} {Unique} {Type}

## Switches

/e—no meaning.  
sort and sort/e are synonymous.

## Parameters

* Entity—entity whose
  occurrences are to be sorted. If no entity is specified, the occurrences of the current entity are
  sorted.
* Field—name of the field to
  sort the data on. To sort using multiple fields and their sort options, specify them as Uniface
  list (GOLD ; separated) or as a comma-separated list
* SortOptions—one or more
  options that specify the sort order, uniqueness, and NLS sorting rules. They can be defined in any
  order, separated by spaces. All sort options are optional, but If a field is specified without sort
  options, the data is sorted in ascending order.

  if no Field and no
  SortOptions are specified, the hitlist will be completed and no sorting will be
  done.

Sort Options

| Sort Option | Valid Values | Meaning |
| --- | --- | --- |
| Order | `ascending` | `A`  `descending` | D | Sort order |
| Unique | `unique` | `U` | Keep only unique items; discard duplicates. For more information, see [Removing Items with Duplicate Values](../../sorting/usingsortoptions.md#example_9E37279808CAC8884C906D7CED5D45D7). |
| Type |  | Determines how sorting is performed by specifying the locale, case sensitivity, level, or data type. If not specified, the default is nlslocale. |
| `nlslocale` | `NLS` | Sort as a string using the value of $nlssortorder. If this is not set, the value of $nlslocale is used. If this is not set, a binary sort is performed. For more information, see [Sorting Based on Locale](../../lists/localbasedsorting.md). |
| `CaseSensitive` | `CS` | `classic` | Sort as a case-sensitive string, ignoring locale-based sorting conventions. |
| `CaseInsensitive` | `CI` | Sort as a case-insensitive string, using the 1-to-1 character matching for Unicode uppercase and lowercase rules. |
| `level` | Sort data as level ID (n.n.n), so that `9.2` is sorted before `10.1`. For more information, see [Sorting by Hierarchical Level](../../sorting/usingsortoptions.md#section_35785EB1556074CC5F64D3767D962055). |
| **Note:**  When specifying the following sort options, it is assumed the data is in a format that can be interpreted as the specified data type. For more information, see [Sorting Using Data Type](../../sorting/usingsortoptions.md#example_C195A36343D2852340C620C2A92EF6DF). | |
| `Numeric` | Sort data as Numeric |
| `Float` | Sort data as Float |
| `Boolean` | Sort data as Boolean |
| `Date` | Sort data as Date |
| `Time` | Sort data as Time |
| **Note:**  When specifying the following sort options, Uniface converts the data to the specified data type before sorting: | |
| `$number` | Sort Data as $number`(`String`)` |
| `$float` | Sort Data as $float`(`String`)` |
| `$boolean` | Sort Data as $boolean`(`String`)` |
| `$date` | Sort Data as $date`(`String`)` |
| `$time` | Sort Data as $clock`(`String`)` |
| `$datim` | Sort Data as $datim`(`String`)` |
| `$string` | Sort Data as $string`(`String`)` |

## Return Values

Values returned by sort in $status

| Value | Meaning |
| --- | --- |
| >=0 | The number of occurrences sorted. |
| <0 | An error occurred. $procerror contains the exact error. |
| -1 | An error occurred in SortSpecs, for example, the field specified is not on the active path. |
| -2 | An error occurred in EntityName, for example, the entity specified is not painted on the form. |

Values commonly returned by $procerror following sort

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name, the entity is not painted on the component, or there is no active entity. |
| -1126 | <UPROCERR\_PROPERTY> | A property is not valid. An error occurred in SortSpecs. For example, the field specified is not on the active path. |

Sort List Errors Commonly Returned in $procerror

| Error | Error Constant | Meaning |
| --- | --- | --- |
| `-1112` | UPROCERR\_OPTION | SortOption: Ascending assumed: When an option starts with an "A" and is not "A" / "ASC" / "ASCENDING" |
| SortOption: Descending assumed: When an option starts with an "D" and is not "D" / "DESC" / "DESCENDING" |
| SortOption: Unique assumed: When an option starts with an "U" and is not "U" / "UNI" / "UNIQUE" |
| SortOption: Invalid option: When an option can't be recognized |
| SortOption: Duplicate order: When an Ascending is defined over a Descending v.v. |
| SortOption: Duplicate type: When a DataType or $Typing is defined twice. |
| `-1101` | UPROCERR\_FIELD | SortOption: Field does not exist For sort "entity" when a fieldname is wrong or excluded |
| `-1129` | UPROCERR\_ITEM | SortOption: SubItemId does not exist |
| SortOption: SubItemNr does not exist |

## Use

Allowed in all Uniface component types.

## Description

The sort statement sorts the
occurrences in the hitlist according to the specified criteria. Using sort
causes the hitlist to be completed.

Sorting occurs along the active path starting
with the specified entity. Consequently, you can sort on fields that are not contained in the
specified entity, as long as these fields occur in subsequent nodes on the active path.
For more information, see [Trigger Activation and the Active Path](../../triggers/concepts/processing_the_active_path_is.md).. Sorting is based on the
first 8K of the field data and on a maximum of 32K of accumulated field data per occurrence.

By default, Uniface uses the data type of the
specified sort field. Thus, a simple sort instruction (with no sort options), will sort a Numeric
field in numerical order and a Date field according to its internal data format. When sorting
String fields, the values of $nlssortorder and $nlslocale
determine whether locale-based sorting rules are applied. For more information, see [Sorting Based on Locale](../../lists/localbasedsorting.md).

For more information, see [Sorting Data in Proc](../../sorting/sortinglistsandhitlists.md).

## Sorting Occurrences

The following example sorts the occurrences of
the entity PERSON in ascending order of family name, followed by first name:

```procscript
retrieve/e "PERSON.ORG"
putitem/id vFields, "FAMILY_NAME:a"
putitem/id vFields, "FIRST_NAME:a" 
sort/e "PERSON.ORG", vFields
```

It is also possible to sort using a
comma-separated list:

```procscript
retrieve/e "PERSON"
sort/e "person.test", "FAMILY_NAME:a, FIRST_NAME:a"
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Additional sort options: Unique and Type.  Second parameter may specify a Uniface list instead of a comma-separated list. |

## Related Topics

- [$nlssortorder](../procfunctions/_nlssortorder.md)
- [Sorting Based on Locale](../../lists/localbasedsorting.md)
- [Sorting Data in Proc](../../sorting/sortinglistsandhitlists.md)


---

# sort/list

Sort an associative list, an indexed list, or an indexed list of sublists.

sort/list  List`,` `"`SortElement
{`:`SortOptions}  
{;SortElement{`:`SortOptions}}`"`

Syntax of SortOptions:   
{Order}
{Unique} {Type}

## Parameters

* List—field or variable
  that evaluates to a Uniface list to be sorted. The list can be an associative list of
  Id=Value pairs, such as a ValRep list or property list, an indexed list, or an
  indexed list of sub-lists.
* SortElement—element of an
  associative list, or a sublist element, on which to sort:

  + $idpart—sort on the
    IdPart of an associative list
  + $valuepart—sort on the
    ValuePart of an associative list
  + $string`(`SublistItemId`)`—sort
    on the IdPart of an associative sublist
  + SublistItemNr—sort on
    the sequence number of an indexed sublist

  For a multi-level sort, you can specify
  multiple SortElement`:`SortOptions definitions
  as a Uniface list or as a comma-separated list.
* SortOptions—one or more
  options that specify the sort order, uniqueness, and NLS sorting rules. They can be defined in any
  order, separated by spaces. If a SortElement is specified without sort options,
  the data is sorted in ascending order.

Sort Options

| Sort Option | Valid Values | Meaning |
| --- | --- | --- |
| Order | `ascending` | `A`  `descending` | D | Sort order |
| Unique | `unique` | `U` | Keep only unique items; discard duplicates. For more information, see [Removing Items with Duplicate Values](../../sorting/usingsortoptions.md#example_9E37279808CAC8884C906D7CED5D45D7). |
| Type |  | Determines how sorting is performed by specifying the locale, case sensitivity, level, or data type. If not specified, the default is nlslocale. |
| `nlslocale` | `NLS` | Sort as a string using the value of $nlssortorder. If this is not set, the value of $nlslocale is used. If this is not set, a binary sort is performed. For more information, see [Sorting Based on Locale](../../lists/localbasedsorting.md). |
| `CaseSensitive` | `CS` | `classic` | Sort as a case-sensitive string, ignoring locale-based sorting conventions. |
| `CaseInsensitive` | `CI` | Sort as a case-insensitive string, using the 1-to-1 character matching for Unicode uppercase and lowercase rules. |
| `level` | Sort data as level ID (n.n.n), so that `9.2` is sorted before `10.1`. For more information, see [Sorting by Hierarchical Level](../../sorting/usingsortoptions.md#section_35785EB1556074CC5F64D3767D962055). |
| **Note:**  When specifying the following sort options, it is assumed the data is in a format that can be interpreted as the specified data type. For more information, see [Sorting Using Data Type](../../sorting/usingsortoptions.md#example_C195A36343D2852340C620C2A92EF6DF). | |
| `Numeric` | Sort data as Numeric |
| `Float` | Sort data as Float |
| `Boolean` | Sort data as Boolean |
| `Date` | Sort data as Date |
| `Time` | Sort data as Time |
| **Note:**  When specifying the following sort options, Uniface converts the data to the specified data type before sorting: | |
| `$number` | Sort Data as $number`(`String`)` |
| `$float` | Sort Data as $float`(`String`)` |
| `$boolean` | Sort Data as $boolean`(`String`)` |
| `$date` | Sort Data as $date`(`String`)` |
| `$time` | Sort Data as $clock`(`String`)` |
| `$datim` | Sort Data as $datim`(`String`)` |
| `$string` | Sort Data as $string`(`String`)` |

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| 0 | Success |
| >=0 | Number of items remaining in List. |

Sort List Errors Commonly Returned in $procerror

| Error | Error Constant | Meaning |
| --- | --- | --- |
| `-1112` | UPROCERR\_OPTION | SortOption: Ascending assumed: When an option starts with an "A" and is not "A" / "ASC" / "ASCENDING" |
| SortOption: Descending assumed: When an option starts with an "D" and is not "D" / "DESC" / "DESCENDING" |
| SortOption: Unique assumed: When an option starts with an "U" and is not "U" / "UNI" / "UNIQUE" |
| SortOption: Invalid option: When an option can't be recognized |
| SortOption: Duplicate order: When an Ascending is defined over a Descending v.v. |
| SortOption: Duplicate type: When a DataType or $Typing is defined twice. |
| `-1101` | UPROCERR\_FIELD | SortOption: Field does not exist For sort "entity" when a fieldname is wrong or excluded |
| `-1129` | UPROCERR\_ITEM | SortOption: SubItemId does not exist |
| SortOption: SubItemNr does not exist |

## Use

Allowed in all Uniface component types.

## Description

By default, sort/list sorts on
the value part of a list item, in ascending order. Sorting is based on the first 8K of the item
data.

The values of $nlssortorder and
$nlslocale determine whether locale-based sorting rules are applied.
For more information, see [Sorting Based on Locale](../../lists/localbasedsorting.md).

For more information, see [Sorting Data in Proc](../../sorting/sortinglistsandhitlists.md)..

## Sorting Lists by ID and by Value

Given the following list:

```procscript
vColors = ""
putitem/id  vColors "0", "BLUE"
putitem/id  vColors "1", "RED"
putitem/id  vColors "2", "GREEN"
```

You can sort the list by the ID part:

```procscript
sort/list (vColors, "$idpart: descending numeric")

;Result: vColors = "2=GREEN;1=RED;0=BLUE"
```

or by the value part (the default):

```procscript
sort/list (vColors, "ascending")

;Result: vColors = "0=BLUE;2=GREEN;1=RED"
```

## Sorting Lists in Fields

In the following example, STATE is a drop-down
list field. The ValRep for the field STATE contains four possibilities; the field STATE, however,
has only a single value so it is not possible to sort on STATE.

```procscript
;$valrep(STATE) = "ak=Alaska;al=Alabama;ar=Arkansas;az=Arizona"
```

The ValRep list must be moved into a variable or
field before sorting can be effective.

```procscript
; trigger: Occurrence Gets Focus
vStates = $valrep(STATE)
sort/list vStates,"A" ;  vStates is now "al=Alabama;ak=Alaska;az=Arizona;ar=Arkansas"
$valrep(STATE) = vStates
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Additional sort options: Unique and Type.  Second parameter may specify a Uniface list instead of a comma-separated list. |

## Related Topics

- [sort](sort.md)
- [$sortlist](../procfunctions/_sortlist.md)
- [$sortlistid](../procfunctions/_sortlistid.md)
- [List Handling in Proc](../../lists/listhandling.md)
- [Sorting Data in Proc](../../sorting/sortinglistsandhitlists.md)
- [Sorting Lists and Sublists](../../sorting/sortingsublists.md)
- [Sorting Based on Locale](../../lists/localbasedsorting.md)


---

# spawn

Pass the specified command to the operating system.

spawn  OSCommand

## Parameters

OSCommand—operating system
command; can be a string, or a field (or indirect reference to a field), a variable, or a function
that evaluates to a string. The string can be up to 255 bytes.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An operating system error occurred. |
| 0 | OSCommand was successfully spawned. $result is set to the value returned by OSCommand. |

## Use

Allowed in all Uniface component types.

## Description

The spawn statement clears the
screen and passes the OSCommand to the operating system on which the application
is running. In a client/server environment, this is the client machine.

You may need to use the refresh
statement to repaint the Uniface screen following spawn.

The OSCommand is spawned as an
asynchronous process, making it appropriate for interactive applications. To run a synchronous OS
command and catch the result, implement an OS service and use activate to call
the `COMMAND` operation on the service. For more information, see [Operating System Commands](../../../integration/os/operatingsystemcommands.md).

## Windows

On Microsoft Windows platforms, you can spawn the
command as a synchronous process by prefixing the command with a hash character (#). In the
following example, the Uniface application is suspended until the program `conv_val`
ends:

```procscript
; start conv_val to convert file specified in $1
spawn "#conv_val.exe %%$1.raw"
; load processed values into $2
fileload "%%$1.dat",$2
```

## Unix

Under Unix, a spawned process that detaches
itself from the parent process can be used for interprocess communication.

## Interactively Removing Print Files

The following example uses the
spawn statement to interactively remove any print files (those ending in
.p00 through .p99). This example uses the Unix
`rm` command, which should be in the user's path (Unix systems only).

```procscript
; trigger: Detail
spawn "rm -i *.p[0-9][0-9] "
askmess "Press space bar to return."," ",-1
refresh
```

For example, the form in the following figure
uses the Detail triggers of the fields to spawn commands to the (Unix) operating
system:

The Proc code in the `Detail`
triggers of each field in the form is:

```procscript
; trigger: Detail of Button "View Print Queue"
spawn "lpq"
refresh

; trigger: Detail of Button "Remove old print files"
spawn "/bin/rm -i *.p[0-9][0-9]"
refresh

; trigger: Detail of Button "View current directory"
spawn "ls -l | /bin/pg"
refresh

; trigger: Detail of Button "Print the selected files"
if (print_files != "")
   spawn "lpr %%print_files%%%"
else
   askmess "What do you want to print?","Continue"
endif
refresh
```

## Related Topics

- [refresh](refresh.md)
- [$result](../procfunctions/_result.md)
- [Operating System Commands](../../../integration/os/operatingsystemcommands.md)


---

# sql

Pass a DML statement to the specified DBMS path.

sql{/data
{/fieldname}} {/print}  
DMLStatement, "PathString"

## Switches

* /data—returns the complete
  output of the DML statement as a nested Uniface list, in which each item represents a table row and
  is itself a list of selected field values. The output is returned in $result,
  and trailing spaces are stripped.

  Available only for DB2, Microsoft SQL Server,
  MySQL, SolidDB,
  Oracle, PostgreSQL, and SAP HANA.
* /fieldname—insert the field
  names of the selected fields as the first item in the output returned by /data,
  thereby providing a header for the data.
* /print—returns the complete
  output of the DML statement into $result, and trailing spaces are
  *not* stripped. The data is formatted with carriage returns and extra whitespace to
  position the data in columns (as seen in the SQL Workbench).

## Parameters

* DMLStatement—Data
  Manipulation Language (DML) statement that obeys the syntax rules of the DML of the DBMS referred
  to by the specified path; it can be a string, or a field (or indirect reference to a field), a
  variable, or a function that evaluates to a string. Uniface does not check the syntax of
  DMLStatement.

  DMLStatement can contain up
  to 32 kilobytes of data; it cannot contain a carriage return, unless
  DMLStatement refers to a blockdata label.
* PathString—string constant
  that contains the name of a path. The leading dollar sign (`$`) should not be
  present; for example, `"ORA"`. If omitted, no action is performed and an error is
  returned in $status.

## Return Values

Following sql, if
DMLStatement includes a DML select or
retrieve statement, the value in the first column of the last selected
occurrence is returned to the $result general variable.

If the /data or
/print switch was used, the complete output is returned in
$result.

Values Returned by sql in $status

| Value | Meaning |
| --- | --- |
| >=0 | The number of hits. |
| <0 | An error occurred. $procerror contains the exact error. |
| -1 | Path was omitted from the sql statement or is not valid; for example, it is not defined in the assignment file. |
| -3 | Exceptional I/O error (hardware or software). Or, the DBMS reached by Path does not support a DML. Or, the DML statement is empty. |
| -9 | An attempt to open a DBMS failed because the maximum number of DBMS logons has already been reached. |
| -11 | Occurrence already locked. |
| -16 | Network error: unknown. |
| -31 | The DML statement on an sql instruction exceeds 32 KB. |

Values Commonly Returned by $procerror Following sql

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> () | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> () | Errors during network I/O. |
| -404 | <UMISERR\_TRX> | The TRX-formatted DML statement from a where clause or an sql statement exceeds 32 KB. |
| -1107 | <UPROCERR\_PATH> | The path name is not correct or the path does not exist, for example, no assignment is found for the path. |
| -1203 | <UPROCERR\_RANGE> | Value out of range. The DMLStatement is empty. |

## Use

Allowed in all Uniface component types.

## Description

The sql statement passes
DMLStatement via the specified path to the database. It can be useful when you
need to perform complex SQL queries that are difficult to accomplish with a retrieve profile in a
Uniface component.

Only one DMLStatement can be
used with each sql statement. If you need to issue more statements, use the
required number of sql statements.

**Caution:** 

You should not use transaction control
statements such as commit or rollback, because these upset
Uniface's internal consistency controls.

If you want to manipulate the result of
DMLStatement, you can use the /data switch (and optionally
the /fieldname switch ) to get the output as a Uniface list. This can then be
manipulated using normal Uniface list handling Proc. For more information, see [List Handling in Proc](../../lists/listhandling.md).

## Portability

Be careful when using the sql
statement. There is often a more direct way to get the same information using Proc code or standard
Uniface I/O, which is faster and more maintainable. Using more than two or three
sql statements in one trigger usually indicates that the function should be
reexamined. Using only the functionality provided by Uniface provides a much more portable solution
than using features of a specific DBMS.

For the ORA driver version U4.0 and higher, when
you use the sql Proc statement or the SQL Workbench to retrieve Long data, it is
truncated at 42 bytes. To avoid this truncation, use a Uniface entity that maps to the table and do
a normal retrieve of the entity.

## sql with `select`

The following example shows how to use the
sql statement with a very simple DML `select`. The value that
INVNUM is compared with is enclosed in single quotation marks (`'`); in this case,
this is the required syntax of the DML string passed to the DBMS with the sql
statement.

```procscript
; trigger <Leave Field>

if ($fieldendmod != 0)
   sql "select invnum from invoices where invnum = '%%invnum%%%'","ora"
   if ($status > 0)
      message "Number already in use!"
      return (-1)
   endif
endif
```

## sql/data

The following example shows how you could used
sql/data and forlist to populate a ValRep list.

Assume all your value/representation lists a table
called CODELISTS that is maintained by an administrator. By calling an entry like this you can
dynamically retrieve a valrep list for a certain (type of) field identified by CODELIST.

```procscript
entry lpGetValrep
params
   string   pCodeList : IN
   string   pValrep   : OUT
endparams
variables
   string vSql, vRecord
   string vVal, vRep
endvariables

vSql = "select CODE, DESCRIPTION from CODELISTS where CODELIST = '%%pCodeList%%%'"

sql/data vSQL, "DEF"
forlist vRecord in $result
   getitem vVal, vRecord, 1
   getitem vRep, vRecord, 2
   putitem/id pValrep, vVal, vRep
endfor
```

## sql/print

The following example uses the
/print switch to return the entire result of the select and place it in the
message frame:

```procscript
$1="leek"
sql/print "select last_name,first_name from people %\
where favorite_vegetable="%%$1"", "syb"
clrmess
if ($status > 0)
   putmess $result
else
   putmess "No one likes a %%$1."
endif
macro "^message"
```

After this code has been executed, the message
frame contains:

```procscript
LAST_NAME            FIRST_NAME
==================== ==============================
Brittmann            Emma
Gabriel              Zoe
Grieder              Dalton
Forcher              Cullen
Crew                 Christine
```

## Related Topics

- [$result](../procfunctions/_result.md)
- [blockdata](blockdata.md)
- [read](read.md)
- [selectdb](selectdb.md)


---

# store

Activate Validate triggers as required, then Write and Delete triggers for all
occurrences marked as modified.

store{/complete |
/truncate}

store/e{/complete |
/truncate}  {Entity}

## Switches

* /complete— builds any
  incomplete hitlists by issuing the appropriate DBMS calls, prior to starting the actual store
  process. This allows the user to continue working through the hitlists after the function has been
  processed.

  **Note:**  store/complete may
  affect performance when operating on extensive sets of data.
* /truncate—truncates all
  hitlists (both inner and outer) after the store statement has been executed.
  This is the default behavior. This switch is provided for compatibility with pre-Version 6
  implementations. If you need to maintain complete hitlists, you should use
  store/complete instead.
* /e—stores the modified
  occurrences starting with Entity. All inner entities within the stored entity
  are also stored.

## Parameters

Entity—entity to be stored.
Can be a string, or a field, variable, function, or parameter that evaluates to a string containing
the entity name. If omitted, the current entity ($entname) is stored.

## Return Values

Values Returned by store in $status

| Value | Meaning |
| --- | --- |
| 1 | No data was stored because no modifications were made to the data since the last `retrieve` or `store` statement. Or, no entities are painted on the component. |
| 0 | Data successfully stored. |
| <0 | An error occurred. $procerror contains the exact error. |
| -1 | Constraint violation. Restricted link violation. |
| -3 | Exceptional I/O error (hardware or software). |
| -4 | Open request for table or file failed. The table or file is not painted, or it does not exist. |
| -5 | Update request for nonupdatable occurrence. |
| -6 | Exceptional I/O error on write request; for example, lack of disk space, no write permission, or violation of a database constraint. Check the message frame for details. |
| -7 | Duplicate key. |
| -9 | An attempt to open a DBMS failed because the maximum number of DBMS logons has already been reached. |
| -10 | Occurrence has been modified or removed since it was retrieved; the occurrence should be reloaded. |
| -11 | Occurrence already locked. |
| -15 | Uniface network error. |
| -16 | Network error: unknown. |

## Use

Allowed in all Uniface component types.

## Description

The store statement updates the
database with data of all modified occurrences.

The store statement begins by
performing any validation that is still outstanding. An implicit validate
statement is performed, affecting each occurrence that needs validation (except those that will be
deleted): declarative checks are performed and the Validate Field, Validate Key, and Validate
Occurrence triggers are activated as necessary. If any validation action fails, the appropriate On
Error trigger is activated; no data is stored.

If validation completes successfully,
store then builds a profile from the modifications made to the occurrences in
the component. This profile of modified occurrences is created with the aid of the
$occdbmod function. The Write, Write Up, Delete, or Delete Up trigger for each
modified occurrence is activated.

Finally, if the message level for the application
is greater than 0, the store statement clears the message frame as it completes.
(When the message level is 0, the message frame is never cleared.) The message level can be set
with the /pri switch or defined in the application definitions.

After a store statement has
been executed, Uniface truncates all hitlists. Uniface then treats the occurrence of the outermost
entity as if it has been retrieved from the database. The user cannot modify the primary key. Use
the release statement to allow the user to modify the primary key field or
fields. Remember that store locks database occurrences; these occurrences remain
locked until a commit or rollback is performed.

**Note:**   If the release statement is
used, any fields subsequently modified in Proc code with the /init switch will
not set the modification status. The database will not be updated if the store
statement is then issued. $status will be set to 1.

## Up Entities

When Uniface detects that an entity is an up
entity, the Write Up and Delete Up triggers are activated instead of the Write and Delete triggers.
If the occurrences in the up entity should be written and deleted as well as read, include a
write and delete statement in these triggers.

**Caution:** 

Writing and deleting up entities can have
serious effects on the integrity of the database.

## Locking Behavior

After you retrieve an occurrence from the
database, modify it, and store it successfully, if you then modify the occurrence a second time
without retrieving it again, Uniface always applies cautious locking, overriding the user-defined
locking method.

## Validation Status

As each step in the validation process is
completed, the corresponding validation status function ($fieldvalidation,
$keyvalidation, $occvalidation, and
$instancevalidation) is reset to indicate that validation has been successful
and is not required again (unless further modifications are made). This ensures that validation
will not be needlessly repeated.

## Modification Status

The modification status functions for all the
occurrences in the component are reset only after the store operation has completed successfully.
If the store operation did not succeed, no modification status functions are changed. This allows
you to retry a store if a DBMS error occurred, once the reason for that error is eliminated.
Uniface applies optimistic locking upon retrying the store.

The following example uses the
store statement in the Detail trigger to navigate to the last occurrence in the
hitlist:

```procscript
; Detail trigger

retrieve
setocc "DEPT", 4
store/e/complete "DEPT"
commit
macro "^LAST_OCC"
```

In the following example the hitlist is reduced and the last occurrence is ‘4’:

```procscript
; Detail trigger

retrieve
setocc "DEPT", 4
store/e "DEPT"
commit
macro "^LAST_OCC"
```

## Related Topics

- [commit](commit.md)
- [release](release.md)
- [rollback](rollback.md)
- [$fieldmod](../procfunctions/_fieldmod.md)
- [$fieldvalidation](../procfunctions/_fieldvalidation.md)
- [$instancemod](../procfunctions/_instancemod.md)
- [$instancevalidation](../procfunctions/_instancevalidation.md)
- [$ioprint](../procfunctions/_ioprint.md)
- [$keymod](../procfunctions/_keymod.md)
- [$keyvalidation](../procfunctions/_keyvalidation.md)
- [$occmod](../procfunctions/_occmod.md)
- [$occvalidation](../procfunctions/_occvalidation.md)
- [$occdbmod](../procfunctions/_occdbmod.md)
- [/pri](../../../_reference/commandlineswitches/pri.md)
- [Validate Field](../triggersstandard/validatefield.md)
- [Validate Key](../triggersstandard/validatekey.md)
- [Validate Occurrence](../triggersstandard/validateoccurrence.md)


---

# stripattributes

Remove character attributes, frames, and rulers from Source and
put the result in Target.

stripattributes  Source,  Target

## Parameters

Source, 
Target—string, or a field (or indirect reference to a field), a variable, or a
function that evaluates to a string.

## Return Values

The values returned by $status
are given in the following table:

Values commonly returned by $status following stripattributes

| Value | Meaning |
| --- | --- |
| 0 | Nothing stripped |
| 1 | Attributes stripped. |
| 4 | Frames stripped. |
| 8 | Rulers stripped. |

**Note:**  The $status values can be
logically OR'd to determine a combination of the results.

## Use

Allowed in all Uniface component types.

## Description

stripattributes removes
character attributes (bold, italic, and underline), frames, and rulers from
Source and puts the result in Target.

## stripattributes

The following Proc example shows how character
attributes are stripped from field UNIFIELD, so the text can be used in field EDITBOX:

```procscript
MYFIELD = "aaabbb"
stripattributes MYFIELD, EDITBOX ; EDITBOX contains "aaabbb" and the value of $status is 1.
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Characters that are not known in the target character set are not stripped from the string (in contrast to Uniface 8). |

## Related Topics

- [$stripattributes](../procfunctions/_stripattributes.md)


---

# structToComponent

Converts data from a Struct or collection of Structs into the entities and occurrences
in the component.

structToComponent
{/firetriggers}  StructSource

## Switches

* /firetriggers—causes the
  Pre Load Occurrence and Post Load Occurrence triggers to be fired. These triggers can be used to
  provide additional processing, for example when preparing data to be loaded and reconnected into a
  component that contains data.

## Parameters

StructSource—variable,
parameter, or non-database field of type struct or any that
references the Struct to transform

## Return Values

Values Commonly Returned in $status after structToComponent

| Value | Meaning |
| --- | --- |
| <`0` | An error occurred. $procerror contains the exact error. $procerrorcontext contains the details. |
| `0` | Struct successfully created.  However, non-fatal errors may occur during conversion, because everything that is not recognized or usable is ignored. Warnings about such conditions are made available in $procReturnContext. See [$procReturnContext for structToComponent](#section_736B432925464E2C8BED0CAB7941CB16). |

Values Commonly Returned by $procerror

| Error Number | Error Constant | Meaning |
| --- | --- | --- |
| `-1905` | `STRUCTERR_INPUT` | Input struct data is not valid. For example, the struct variable may have been declared, but not initialized. |

## Use

Allowed in all Uniface component types.

## Description

structToComponent transfers
data from a Struct or collection of Structs into a component. The data is loaded directly into the
component's data structure.

**Note:**  structToComponent does not
interpret or initiate data validation, so the data loaded by structToComponent
can include duplicates of occurrences already available in the component.

## Annotations

When preparing a Struct programmatically for
conversion to a component, you can use $tags to set the `u_type`
annotation tag. Using this tag can help to resolve ambiguity if a field and an entity have the same
name. Matching the Struct against the component is name based, so the `u_type` tag
may not be required—it is clear from the component structure that one thing is a field and another
thing is an entity.

Annotation Tags for Uniface Component-Struct Conversions

| Tag | Values | Comments |
| --- | --- | --- |
| u\_type | ```procscript "component""entity""occurrence""field" ``` | Each node in a component Struct has a u\_type annotation that indicates the object type. |
| For nodes that have the tag `u_type="occurrence"`, the following tags are also supported. These can be used if you are using the Struct to manipulate data prior to a reconnecting the data to its source. For more information, see [Reconnect Process](../../../howunifaceworks/dataio/disconnectedrecordssets/reconnect_process.md). | | |
| u\_id | `"OccID"` | The occurrence ID is used |
| u\_crc | `"CheckSum"` | CRC checksum of the occurrence |
| u\_status | ```procscript "est" (exists in DB) "mod" (modified) "new" (new) "del" (delete) 				 ``` | Modification status of the occurrence. |

## Reconnect Loaded Data

If you are using Struct to transport disconnected
record sets, the Struct may contain occurrence processing tags. These tags will be available if the
Struct was created with componentToStruct/reconnecttags. In this case, the
structToComponent statement sets state flags used by
reconnect.

You should use a reconnect
statement immediately after the structToComponent command.
reconnect removes duplicates of occurrences, removes occurrences marked for
deletion from the component, and sets the appropriate modification flags. For more information, see [Reconnect Process](../../../howunifaceworks/dataio/disconnectedrecordssets/reconnect_process.md).

**Note:**  The structToComponent
statement only handles the reconnect processing tags if the u\_type is present
and has a value of `occurrence`.

## Triggers

The structToComponent statement
fires the following triggers that can be used to customize how the Struct is loaded into a
component:

* [Pre Load Occurrence](../triggersstandard/pre_load_occurrence.md)—fired immediately before an occurrence is loaded
  into a component. The new occurrence is not yet available and cannot be accessed.
* [Post Load Occurrence](../triggersstandard/post_load_occurrence.md)—fired immediately after an occurrence is loaded
  into a component. The new occurrence is available and can be accessed. For example, use this
  trigger if an occurrence can be discarded, or the value for a derived field can be calculated.

## Name Matching Rules

The structToComponent is
primarily name driven. The following name matching rules apply:

* Tag names (annotations) are case sensitive.
  Tags should only occur once, else the value is empty.
* All tag value matching against component
  structure elements is case insensitive.
* Entity names or field names can be
  non-qualified (ENTITYNAME, or FIELDNAME), partially qualified (FIELDNAME.ENTNAME), or fully
  qualified (ENTITY.MODEL for an entity or FIELD.ENTITY.MODEL for a field). If an entity is not fully
  qualified matching it to a component structure can be ambiguous, in which case the outcome is not
  defined.

  This behavior is the same as statements such
  as retrieve/eEntity, where the specified name matches two
  different entities, each within a different model. Field names can normally be unqualified, as they
  are implicitly qualified by the location within the context of an entity.

In case of ambiguity (identical names of a field
and an entity drawn on the same level), names must be fully qualified, or tags can be used to
specify the type of the object.

## Conversion Logic

The top-most Struct to be converted must represent
a component or an entity.

**Note:**  If an entity is the starting point, it is not
necessarily the top-level entity. It can be an entity that is nested inside the component
structure.

From the starting point, the
structToComponent conversion routine processes each member Struct in turn. For
each Struct:

* If no tag is specified, it matches the Struct
  to the component structure based on the name.
* If no name match is found, a warning
  (`STRUCTERR_NO_MATCHING_NAME`) with related information is put in
  $procReturnContext, and the Struct (and all its children) is skipped.
* If the `u_type` tag is
  specified, the match is based on this value, and the name.

More specifically, the conversion routine does the
following:

1. Finds the starting point.

   1. Check whether the top-level Struct (or
      Structs, in a collection) has a `u_type` tag. If it does, the value must be
      `component` or `entity`; otherwise a warning is put in
      $procReturnContext.
   2. Match the Struct name to a component or
      entity name.

      * If a match is found with the
        component name, continue at step 2.
      * If a match is found with an entity
        name, continue at step 3.
      * If no match is found, raise a warning
        in $procReturnContext.
2. Processes the component Struct. For each
   Struct member:

   1. Check whether the member has a
      `u_type` tag. If it does, the value must be `entity`; otherwise a
      warning is put in $procReturnContext.
   2. Match the name of the Struct member to
      top-level entity in the current component structure.

      * If a match is found, continue at step
        3.
      * If no match is found, raise a warning
        in $procReturnContext.
3. Processes each entity Struct. For each Struct
   member:

   1. Check whether the member has a
      `u_type` tag. If it does, the value must be `occurrence`; otherwise a
      warning is put in $procReturnContext.
   2. For each occurrence Struct found, continue
      at step 4.

      **Note:**  The Struct name is not used for
      matching.
4. Processes each occurrence Struct member.

   1. Create a new occurrence at the end of the
      list of existing occurrences in the current entity.
   2. For each member, check whether it has a
      `u_type` tag. If it does, the value must be `entity` or
      `field`; otherwise a warning is put in $procReturnContext.
   3. Match the name of the member Struct with
      an entity or field. If `u_type` is not specified, it first tries to match an entity,
      and then a field.

      If no match is found, raise a warning in
      $procReturnContext.
5. Processes each field Struct member, assigning
   the value specified by the Struct to the field, and converting the data type if required.

## $procReturnContext for structToComponent

$procReturnContext contains
context and error information about the conversion, in the form of a Uniface list.

```procscript
Context=structToXml ;}
{Infos=Number ;
{Warnings=Number ;} 
{Errors=Number ;}
{DETAILS=ID=MsgNum !!;SEVERITY=Type !!;MNEM=Mnemonic !!;DESCRIPTION=ErrorDescription !!;CURRENTSTRUCT=Struct !!;ADDITIONAL=SPECIFIEDNAME=StructName !!!;{INDEX=N !!!;}
EXPECTEDTYPE=ExpectedValue}  { !!!;TAGNAME=u_type !!!;TAGVALUE=ValueID= ...}
```

Items Returned by $ProcReturnContext

| Item | Description |
| --- | --- |
| `Context``=`Context | Value indicating the previously executed command that set $procReturnContext: `structToComponent` |
| `Detail``=`String | Messages, warnings, and non-fatal errors encountered during processing, and additional information, structured as a list. |

Items Returned in Detail of $procReturnContext

| Item | Description |
| --- | --- |
| `ID` | Message number |
| `MESSAGE` | Message text |
| `SEVERITY` | Importance of the issue; one of `INFO`, `WARNING`, or `ERROR` |
| `MNEM` | Mnemonic for the specified (numeric) ID. One of:   * `USTRUCTERR_NO_MATCHING_NAME`—Struct name   cannot be matched with an object name according to the matching rules * `UTAGVALUE_NOT_APPLICABLE`—Struct has a   `u_type` tag , but its value does not match the component structure. * `UTAGVALUE_NOT_RECOGNIZED`—Struct has an   invalid value, for example, because the wrong case is used. Values are case-sensitive. |
| `DESCRIPTION` | Short description of the issue. |
| `CURRENTSTRUCT` | List of all preceding parents, starting from the top. Each parent is described by its name (which can be empty) and index number. The top-level parent has no index number. |
| `NAME` | Name of the current Struct or Struct member |
| `INDEX` | Index number of the current Struct in the current |
| `ADDITIONAL` | Uniface sublist of additional information about the Struct (member) causing the message. This information is provided if there is more detailed information to report, such as unexpected tags or tag values. |
| `TAGNAME` | Name of the annotation, if specified. When converting to components, the only allowed tag name is `u_type` |
| `TAGVALUE` | Value of `u_type`. |
| `EXPECTEDTYPE` | Expected component object type for the context, or as specified by the `u_type` tag |

## Information Returned in $procReturnContext

The following shows the type of information
returned in $procReturnContext for structToComponent
(formatted for readablity):

```procscript
Context=StructToComponent;
Warnings=2;
DETAILS=
  ID=-1161!!;
    SEVERITY=Warning!!;
    MNEM=<STRUCTERR_NO_MATCHING_NAME>!!;
    DESCRIPTION=No matching name found during conversion from struct!!;
    CURRENTSTRUCT=ORDER->OCC{1}->ORDER_I{1}!!;
    ADDITIONAL=
      SPECIFIEDNAME=ORDER_I!!!;
      EXPECTEDTYPE=entity or field!;
  ID=-1160!!;
    SEVERITY=Warning!!;
    MNEM=<STRUCTERR_TAGVALUE_NOT_APPLICABLE>!!;
    DESCRIPTION=Struct tag value not applicable in conversion from struct!!;
    CURRENTSTRUCT=ORDER->OCC{1}->SHIP_TO{1}!!;
    ADDITIONAL=
      TAGNAME=u_type!!!;
      TAGVALUE=component!!!;
      EXPECTEDTYPE=entity or field
```

## Creating and Converting a Struct to a Component Structure

The following very simple code example:

* Creates a Struct for an ORDER entity
  containing an occurrence with two fields: ORDER\_ID and SHIP\_TO
* Displays the Struct in an OUTPUT field
* Transfers the Struct to the component's data
  structure

```procscript
entry createStruct
variables
  struct vStruct, vFld
endvariables

  ; Create a Struct with field names and values
  vFld->ORDER_ID = 101
  vFld->SHIP_TO = "Chicago"

  ; Create a Struct named ORDER
  vStruct->$name = "ORDER"

  ; Assign the Field Struct to a new member called OCC, of the ORDER Struct
  vStruct->OCC = vFld

  OUTPUT = vStruct->$dbgstring 
  structToComponent vStruct
end
```

The following illustration shows the resulting
form (in test mode, with the Component Editor showing the component structure).

Struct2Comp Test Form

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |
| 9.6.06 | Introduced /firetriggers switch and support for occurrence processing tags |

## Related Topics

- [componentToStruct](componenttostruct.md)
- [$procReturnContext](../procfunctions/_procreturncontext.md)
- [reconnect](reconnect.md)
- [Structs for Uniface Component Data](../../structs/transformingwithstructs/structsforcomponents.md)
- [Transforming Complex Data Using Structs](../../structs/transformingwithstructs/handlingcomplexdynamicdata.md)


---

# structToJson

Convert a Struct to a JSON text, as an object or an array.

structToJson
{/bmp} {/whitespace}  JsonTarget,  
StructSource

Example: `structToJson /whitespace vOutput,
vStruct`

## Switches

* /bmp—specify that all
  characters outside of the Unicode BMP range are escaped in the JSON way:
  `\uXXXX``\uYYYY`, where
  XXXX and YYYY are the hexadecimal values of the surrogate
  pair for the Unicode character that is outside the BMP range.
* /whitespace—write JSON
  string with additional whitespace for readability, using indentation to indicate levels of nesting.
  By default, the JSON string is written without extra whitespace; it is included only when inside
  double quotes.

## Parameters

* JsonTarget— variable,
  parameter, or field of type string to hold the returned JSON data
* StructSource—variable,
  parameter, or non-database field of type struct or any that
  references the Struct to transform

## Return Values

If the conversion was successful, the JSON text is
returned in JsonTarget. This can then be written to a file using
filedump.

Values returned in $status

| Value | Meaning |
| --- | --- |
| 0 | Conversion was successful. However, the JSON produced may not be what is expected if non-fatal errors occurred during conversion. Warnings about such conditions are made available in $procReturnContext |
| <0 | Conversion failed. $procerror contains the exact error. |

Values Commonly Returned by $procerror

| Error Number | Error Constant | Meaning |
| --- | --- | --- |
| `-1905` | `STRUCTERR_INPUT` | Input struct data is not valid. For example, the struct variable may have been declared, but not initialized. |

## Return Context

structToJson sets
$procReturnContext when it encounters non-fatal errors encountered when
transforming the Struct to JSON, such as:

* Duplicate names of JSON object members
* Elements of an array that have names. The
  names are ignored when writing the JSON text.
* Members of an object that have no name. An
  empty string is given as a name.
* jsonClass holds an
  unknown value.
* Non-scalar Structs that are annotated with
  jsonDataType.
* A scalar Struct that is tagged as number but
  cannot be converted to a JSON number. In this case, structToJson falls back to
  the Uniface data type .

## Use

Allowed in all Uniface component types.

## Description

Use structToJson to convert a
Struct to a JSON text. The JsonTarget must be a variable, parameter, or field,
so you should use filedump or lfiledump to write the JSON
string to a file.

The top-level Struct must represent a JSON object
or array.

If the root Struct has
jsonClass annotation, the value determines whether
structToJson transforms the root Struct to a JSON object or an array. It then
recursively processes all members of the Struct.

* For a JSON object, any member without a name
  is given the name `""`, and a warning is placed in
  $procreturncontext).
* For a JSON array, any member names are ignored
  and a warning is placed in $procreturncontext).

If the root Struct does not have a
jsonClass tag, the presence of names is used to determine how members at the
root level are handled:

* If *all* the members have names, a
  JSON object is written and the named members are recursively processed.
* If at least one of the members at this level
  does not have a name, a JSON array is written, and the members are recursively processed; the names
  of members that have a name is ignored.
* If there are no members, an empty object {} is
  written. (Only Struct members that are explicitly tagged as null are converted to JSON null).

## Converting Structs to JSON

When preparing a Struct for conversion to JSON,
keep the following in mind:

* You can use $tags to set
  the jsonClass and jsonDataType annotations for Struct
  members. For more information, see [Structs for JSON Data](../../structs/transformingwithstructs/structsforjson.md).
* If jsonClass or
  jsonDataType holds an unknown value, the Struct member is ignored and a
  warning is returned in $procReturnContext.
* structToJson produces JSON
  escape sequences for GOLD characters, and for the double quote mark `"`, backslash
  `\`, and slash `/`. For example, GOLD ; is encoded as
  `\u001B` , and GOLD ! is encoded as `\u0015`. Text formatting characters
  (such as bold, italic, underline, and their combinations) are ignored.
* The name of a JSON object member is a string,
  and a string is defined as being Unicode characters and a number of escaping mechanisms enclosed
  within double quotes. Therefore, object names are treated the same as the values—in the generated
  JSON text they are enclosed in double quotes, and escaping is applied for the characters
  `"`, `\`, `/`, Uniface text formatting characters, and
  GOLD characters.
* Unicode characters outside the BMP region
  (higher than x10000) do not need to be escaped but 3rd party tools may be limited to UCS-2 (=BMP)
  and require these characters to be escaped. In this case, you can use the /bmp
  flag to ensure that all characters outside of the BMP range are correctly escaped
* The generated JSON is formatted without
  whitespace and indentation. For example:

  ```procscript
  {"My JSON text":[1,{"color":"blue"}]}
  ```

  To generate extra whitespace to make the JSON
  more readable, use the /whitespace qualifier to produce:

  ```procscript
  {
      "My JSON text" :
      [
          1,
          {
              "color" : "blue"
          }
      ]
  }
  ```

History

| Version | Change |
| --- | --- |
| 9.6.04 | Introduced |

## Related Topics

- [jsonToStruct](jsontostruct.md)
- [filedump](filedump.md)
- [Structs for JSON Data](../../structs/transformingwithstructs/structsforjson.md)
- [Transforming Complex Data Using Structs](../../structs/transformingwithstructs/handlingcomplexdynamicdata.md)


---

# structToXml

Convert a Struct to XML, without a schema.

structToXml  XmlTarget,  StructSource

## Parameters

* XmlTarget—variable or
  parameter of type xmlstream, string, or
  any to which the converted XML is written
* StructSource—variable,
  parameter, or non-database field of type struct or any that
  references the Struct to transform

## Return Values

Common Errors Returned in $procerror after
structToXml

| Error | Meaning |
| --- | --- |
| < `0` | An error occurred. $procerror contains the exact error. |
| `0` | XML document successfully created.  However, the XML produced may not be what is expected if non-fatal errors occurred during conversion, because everything that is not recognized or usable is ignored. Warnings about such conditions are made available in $procReturnContext. See [$procReturnContext for structToXml](#section_949E7B4BACD7422C9E9032FDAAF0DF7D). |

Values Commonly Returned by $procerror

| Error Number | Error Constant | Meaning |
| --- | --- | --- |
| `-1905` | `STRUCTERR_INPUT` | Input struct data is not valid. For example, the struct variable may have been declared, but not initialized. |

Errors and warnings returned in $procreturncontext

| Error | Error Constant | Meaning |
| --- | --- | --- |
| `-1160` | `USTRUCTERR_TAGVALUE_NOT_APPLICABLE` | Annotation `xmlClass` has no value, or an unknown or illegal value (based on the current context) |

## Use

Allowed in all Uniface component types.

## Description

XML annotations drive the way in which
structToXml performs the conversion. Should a Struct be converted to an element,
an attribute, or a declaration? Do namespace values need to be added? Without the value of the
`xmlClass` and other annotations, there is no way for structToXml
to determine this. When preparing a Struct for conversion to XML, you therefore need to ensure that
you set the `xmlClass` annotation for each member of the Struct.

The structToXml conversion
routine processes the Struct members in the order in which they appear. You therefore need to
ensure that the Struct members are in the correct sequence. Thus, if the source Struct has
`xmlClass` set to `element`, its members must be ordered so that
members with `xmlClass=attribute` or `xmlClass=namespace-declaration`
come before `xmlClass=comment`.

## XML Documents and Snippets

structToXml can generate either
an XML document (that is, well-formed XML with a single root node) or partial XML documents
(well-formed XML with multiple root nodes), known as snippets.

structToXml handles
StructSource as an XML document if the `xmlClass` of the source
Struct is set to `document`, or if the source Struct is nameless and contains only
one member. For example, the following Struct has a single nameless source node containing a single
named member (`movie`):

```procscript
[]
  [movie] = "The Matrix"
    $tags
      xmlClass = "element"
    [p] = "The Matrix is a great movie."
      $tags
        xmlClass = "element"
    [p] = "It is much better than its sequels."
      $tags
        xmlClass = "element"
```

This is treated as if the source struct was tagged
as `xmlClass = "document"`

```procscript
[]
  $tags
    xmlClass = "document"
  [movie] = "The Matrix"
 ...
```

structToXml handles
StructSource as snippets if the source struct contains a collection of Structs.
For example, the following shows a collection of Structs produced by
`vStruct->p`:

```procscript
[]
[p] = "The Matrix is a great movie."
  $tags
    xmlClass = "element"
[p] = "It is much better than its sequels."
  $tags
    xmlClass = "element"
```

## Converting Struct to XML

When preparing a Struct for conversion to XML,
keep the following in mind:

* Each Struct member must have an
  `xmlClass` that defines the XML construct to which it should be converted.
  For more information, see [Struct Annotations for XML](../../structs/transformingwithstructs/xmlannotations.md).

  The `xmlClass` is optional in
  the following cases:

  + The source (top-level) Struct is nameless
    and contains a single member; `xmlClass` is assumed to be
    `document`.
  + Non-scalar Struct members;
    `xmlClass` is assumed to be `element`.
  + Struct members named
    `#comment` ; `xmlClass` is assumed to be `comment`.
* Depending on the value of
  `xmlClass`, structToXml will read and convert other XML
  annotations that are valid for the XML construct.
* If `xmlClass` holds an unknown
  value, the Struct member is ignored and a warning
  (`STRUCTERR_TAGVALUE_NOT_APPLICABLE`) is returned in
  $procReturnContext.
* If `xmlClass` holds an illegal
  value, based on the Struct's context, a warning is returned in
  $procReturnContext. The context is determined by the position of the Struct in
  relation to a valid XML document.
* If a Struct represents an XML snippet (it
  holds a collection of Structs), the `xmlClass` of each member can be set to
  `comment`, `processing-instruction`, or `element`.
* If a Struct represents an XML document:
  + The Struct may optionally have
    `xmlClass` set to `document`
  + The Struct may optionally have annotations
    `xmlVersion`, `xmlEncoding`, and `xmlStandAlone`,
    which are used to generate an XML declaration. For more information, see [XML Declaration](../../../_reference/xml/xmldeclaration.md).
  + The Struct can have no, one, or multiple
    members representing comments, processing instructions, or elements(`xmlClass` set
    to `comment`, `processing-instruction`, or
    `element`).
  + The Struct may optionally have one member
    representing a DOCTYPE declaration (`xmlClass` set to `doctype`).
* If a Struct represents a DOCTYPE declaration
  (`xmlClass` set to `doctype`):
  + The Struct can only be a child of an XML
    document struct.
  + The Struct must occur before Structs with
    `xmlClass` set to `element`.
  + The Struct may contain other Structs for
    element and entity declarations, attribute lists, and notation declarations. For more information, see [XML DOCTYPE Declaration](../../../_reference/xml/xmldtd.md).
  + If there are multiple
    `doctype` Structs, or they are in the wrong position within the XML document, a
    warning is returned.
* If a Struct represents an element
  (`xmlClass` set to `element`). it can have no, one, or multiple
  members for attributes (`xmlClass` set to `attribute` or
  `namespace-declaration`). If these are present, they must occur before any of the
  following members:
  + Scalar member for character data (no
    `xmlClass` annotation)
  + Scalar member for CDATA
    (`xmlClass` set to `CDATA`)
  + Struct node for a child element (
    `xmlClass` set to `element`)
  + Struct member for a comment
    (`xmlClass` set to `comment`, and optionally named
    `#comment`)
  + Struct member for processing instruction
    (`xmlClass` set to `processing-instruction`)
* If the data type of the Struct member is
  `string`, it is put into the XML document as is, without any reformatting.

  If the data type is something other than
  string, the data is formatted according to the schema data type specified in the
  `xmlDataType` and `xmlTypeNamespace` tags. If these tags are not
  present, an appropriate default schema data type is used to format the data in the XML document.
  For example, if the data type is Raw and `xmlDataType="base64Binary"`, the data is
  base64 encoded in the resulting XML document. If the data type is Raw but there is no
  `xmlDataType` tag, the default schema data type is hexBinary, so the data will be
  put into the XML document in hexadecimal format.

  For the `time` and
  `datetime` data types, the time is always local time without time zone
  information.

  **:** 

  Important: If you specify an
  `xmlDataType` tag, ensure that its value is appropriate for the Uniface data type of
  the scalar member, otherwise unpredictable results may occur.
* The order of the annotations is not relevant.
  However, if a Struct contains multiple annotations with the same name, only the first one is
  used.

## $procReturnContext for structToXml

$procReturnContext contains
context and error information about the conversion in the form of a nested Uniface list.

```procscript
Context=structToXml ;}
{Infos=Number ;
{Warnings=Number ;} 
{Errors=Number ;}
{DETAILS=ID=MsgNum !!;SEVERITY=Type !!;MNEM=Mnemonic !!;DESCRIPTION=ErrorDescription !!;CURRENTSTRUCT=Struct !!;ADDITIONAL=TAGNAME=Name !!!;TAGVALUE=Value !!!;EXPECTED=ExpectedValue}  { !;ID= ...}
```

Items Returned by $ProcReturnContext for
structToXml

| Item | Description |
| --- | --- |
| `Context` | Value indicating the previously executed command that set $procReturnContext, in this case, `structToXml` |
| `Infos` `Warnings`  `Errors` | Number of messages, warnings, and non-fatal errors generated during processing |
| `DETAILS` | Details about any messages, warnings, and non-fatal errors encountered during processing, structured as a Uniface sublist |
| `ID` | Message number |
| `MESSAGE` | Message text |
| `SEVERITY` | Importance of the issue; one of `INFO`, `WARNING`, or `ERROR` |
| `MNEM` | Mnemonic for the specified (numeric) ID: `USTRUCTERR_TAGVALUE_NOT_APPLICABLE`—Annotation `xmlClass` has no value, or an unknown or illegal value (based on the current context) |
| `DESCRIPTION` | Short description of the issue. |
| `CURRENTSTRUCT` | List of all preceding parents, starting from the top. Each parent is described by its name (which can be empty) and index number. The top-level parent has no index number. |
| `ADDITIONAL` | Uniface sublist of additional information about the Struct (member) causing the message. This information is provided if there is more detailed information to report, such as unexpected tags or tag values. |
| `TAGNAME` | Name of the annotation tag; optional. |
| `TAGVALUE` | Value of the tag specified by `TAGNAME`. |
| `EXPECTED` | Expected object for the context; one of: `Struct valid on XML document level`  `Struct valid on XML element level`  `DTD declaration`  `DTD attribute declaration` |

## $ProcReturnContext after structToXml

The following shows the type of information
returned in $procReturnContext for structToComponent
(formatted for readablity):

```procscript
Context=StructToXml;
Warnings=1;
DETAILS=
  ID=-1160!!;
    SEVERITY=Warning!!;
    MNEM=<USTRUCTERR_TAGVALUE_NOT_APPLICABLE>!!;
    DESCRIPTION=Struct tag value not applicable in conversion from struct!!;
    CURRENTSTRUCT=""->#comment{1}!!;
    ADDITIONAL=
      TAGNAME=xmlClass!!!;
      TAGVALUE=commen!!!;
      EXPECTED=Struct valid on XML document level
```

## Building a Struct and Converting it to XML

Assume that you want to create the following XML
message:

```procscript
<!-- message to Jim -->
<message priority="High" from="Reception" to="Jim">Please contact your brother</message>
```

The following Proc code attempts to build this
Struct and convert it to XML, but contains three errors:

```procscript
variables
  struct vStruct
  xmlStream vOutputXml
  string vReturnContext
endvariables
				
; Build Struct
vStruct = $newstruct
vStruct->"#comment" = "message to Jim"
vStruct->*{-1}->$tags->xmlClass="commen" 
vStruct->message = $newstruct
vStruct->message->$tags->xmlClass = "element"
vStruct->message->priority = "High"
vStruct->message->priority->$tags->xmlClass = "attribute"
vStruct->message->*{-1} = "Please contact your brother"
vStruct->message->from = "Reception"
vStruct->message->from->$tags->xmlClass = "attribute" 
vStruct->to = "Jim"
vStruct->to->$tags->xmlClass = "attribute"

; Convert to XML
structToXml vOutputXml, vStruct

; Write the XML to a file
filedump vOutputXml, "generatedXmlDoc.xml"
```

1. Spelling error when tagging the
   `comment`
2. Attribute `from` is after the
   content of `message`, so it is not in the correct order for the XML
3. Attribute `to` is created as a
   sibling Struct to message, which puts it on the document level

The resulting XML looks like this:

```procscript
<message priority="High">Please contact your brother</message>
```

$procReturnContext provides
information about these errors:

```procscript
Context=StructToXml;
Warnings=3;
DETAILS=
  ID=-1160!!;
    SEVERITY=Warning!!;
    MNEM=<STRUCTERR_TAGVALUE_NOT_APPLICABLE>!!;
    DESCRIPTION=Struct tag value not applicable in conversion from struct!!;
    CURRENTSTRUCT=""->#comment{1}!!;
    ADDITIONAL=
      TAGNAME=xmlClass!!!;
      TAGVALUE=commen!!!;
      EXPECTED=Struct valid on XML document level!;
  ID=-1160!!;
    SEVERITY=Warning!!;
    MNEM=<STRUCTERR_TAGVALUE_NOT_APPLICABLE>!!;
    DESCRIPTION=Struct tag value not applicable in conversion from struct!!;
    CURRENTSTRUCT=""->message{1}->from{1}!!;
    ADDITIONAL=
      TAGNAME=xmlClass!!!;
      TAGVALUE=attribute!!!;
      EXPECTED=Struct valid on XML element level!;
  ID=-1160!!;
    SEVERITY=Warning!!;
    MNEM=<STRUCTERR_TAGVALUE_NOT_APPLICABLE>!!;
    DESCRIPTION=Struct tag value not applicable in conversion from struct!!;
    CURRENTSTRUCT=""->to{1}!!;
    ADDITIONAL=
      TAGNAME=xmlClass!!!;
      TAGVALUE=attribute!!!;
      EXPECTED=Struct valid on XML document level
```

The following example shows the correct Proc
code:

```procscript
entry buildStruct
variables
  struct vStruct
  xmlStream vOutputXml
endvariables
; Build Struct
vStruct = $newstruct
vStruct->"#comment" = "message to Jim"
vStruct->*{-1}->$tags->xmlClass="comment"
vStruct->message = $newstruct
vStruct->message->$tags->xmlClass = "element"
vStruct->message->priority = "High"
vStruct->message->priority->$tags->xmlClass = "attribute"
vStruct->message->from = "Reception"
vStruct->message->from->$tags->xmlClass = "attribute"
vStruct->message->to = "Jim"
vStruct->message->to->$tags->xmlClass = "attribute"
vStruct->message->*{-1} = "Please contact your brother"

; Convert to XML
structToXml vOutputXml, vStruct

; Write the XML to a file
filedump vOutputXml, "generatedXmlDoc.xml"
```

## Replacing Escape Sequences with XML Entities

By default, structToXml
produces escape sequences for GOLD and text formatting characters (bold, italic, underline, and
their combinations).

* For GOLD characters:
  `&#x8FFFF;`. For example, GOLD ; results in `&#x8FFFF;1B`.
* For bold, underline, and italic (and their
  combinations): `&#x1FFFF; &#x2FFFF; ... &#x7FFFF;`. For example, the
  word **Hi** in bold results in `&#4FFFF;H&#4FFFF;i`.

The Uniface DTD includes XML entity definitions
for these characters. If you want structToXml to produce the entities defined in
Uniface DTD instead, you need to ensure that the Struct has a doctype member with the tag
`xmlSystemID` that has the value `UNIFACE.DTD`.

**Note:**  This is useful only if you are using
structToXml to produce an XML file that Uniface can import into the repository.
In this case, you must also ensure that the rest of the Struct conforms to the Uniface DTD.
For more information, see [XML Streams](../../../integration/xml/concepts/xml_streams1.md).

For example:

```procscript
mystruct->rootelement{mystruct->rootelement->$index + 1} = $newstruct
mystruct->rootelement{-1}->$index = 1
mystruct->rootelement{1}->$tags->xmlClass = "doctype"
mystruct->rootelement{1}->$tags->xmlSystemID = "UNIFACE.DTD"
```

The resulting XML string includes:

* A `<!DOCTYPE ...>` line
  specifying the DTD.
* XML entities for special characters such as
  GOLD characters and text formatting (bold, Italic, underline and their combinations). These XML
  entities that are defined in the Uniface DTD.

To read an XML file produced this way, use
xmlToStruct with the /validate switch. This ensures that the
DTD is read and the XML entities are validated against the DTD.

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [xmlToStruct](xmltostruct.md)
- [$procReturnContext](../procfunctions/_procreturncontext.md)
- [$tags](../procstructfunctions/_tags.md)
- [Uniface XML Constructs](../../../_reference/xml/xmlconstructs_intro.md)
- [Struct Annotations for XML](../../structs/transformingwithstructs/xmlannotations.md)
- [Transforming Complex Data Using Structs](../../structs/transformingwithstructs/handlingcomplexdynamicdata.md)
- [structToXml /schema](structtoxml_schema.md)


---

# structToXml /schema

Convert a Struct to XML using a schema.

## Syntax

structToXml/schema
{/validate} {/cs}{/location}
  XmlTarget`,` StructSource`,` Schema  {`,` StartingPoint}

## Switches

* /schema—generate XML using
  a schema. For more information, see [Schema Concepts Used to Generate XmlTarget](#section_E0488BAB821B4B3A9E77FED7F612529E).
* /validate—validate the
  resulting document against the schema. For more information, see [Schema Concepts Used to Validate XmlTarget](#section_17D70E5F37CE4731B8746881258C9CD2).
* /cs—the search for Struct
  names that match schema definitions is case-sensitive. (The default is case-insensitive because
  componentToStruct always uses uppercase names.)
* /location—provide
  noNamespaceSchemaLocation and/or schemaLocation
  attributes in the root tag. The locations specified in the Schema parameter are
  used to fill in these attributes. (An XML document does not require these, so they are not added by
  default.)

## Parameters

* XmlTarget—variable or
  parameter of type xmlstream, string, or `any`
  to which the converted XML is written
* StructSource—variable or
  parameter of type struct or any, that references a Struct or
  collection of Structs to be converted
* Schema—schema to which
  XmlTarget must conform. It can be a file name or URL, an indexed list of schema
  file names or URLs, or the schema document itself.

  If Schema contains a list
  of schemas, the first one will be read first, and the rest only if `<import>`,
  is encountered without schemaLocation; this list provides the missing schema
  locations.

  If Schema is the schema
  document itself, /location does nothing and /validate is not
  allowed
* StartingPoint— element or
  data type in the schema from which the structToXml conversion process should
  start; in the form:

  `"element=ElementName"`

  or

  `"type=DatatypeName`{;`namespace=Namespace`}`"`

  For more information, see [Starting Point](#section_EDFA60B9A63145C5A4878E15478FEDA0).

## Return Values

Values Commonly Returned by $procerror

| Error Number | Error Constant | Meaning |
| --- | --- | --- |
| `-1905` | `STRUCTERR_INPUT` | Input struct data is not valid. For example, the struct variable may have been declared, but not initialized. |

Values Commonly Returned by $procerror after
structToXml/schema

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-4` | `UIOSERR_OPEN_FAILURE` | If the schema specified cannot be opened. |
| `-1110` | `UPROCERR_TOPIC` | If the StartingPoint parameter is not of the form 'element=…' or 'type=…'. |
| `-1118` | `UPROCERR_ARGUMENT` | If the StartingPoint parameter is of the correct format but the element or type cannot be found in the schema. |
| `-1190` | `USTRUCTWARN_MEMBER_NOT_FOUND` | The schema specifies an element that can contains sub-elements but no character data. The Struct members or the sub-elements can be found, but not the parent element. |
| `-1406` | `UPROCERR_MEMORY` | If not enough memory could be allocated. |

The XML produced may not be what
is expected if non-fatal errors occurred during conversion, because everything that is not
recognized or usable is ignored. Warnings about such conditions are made available in
$procReturnContext.

Errors and warnings returned in $procreturncontext

| Error | Error Constant | Meaning |
| --- | --- | --- |
| `-1155` | `USTRUCTERR_MEMBER_NOT_FOUND` | When the schema dictates the presence of a struct member of a specific name, and it cannot be found. |
| `-1160` | `USTRUCTERR_TAGVALUE_NOT_APPLICABLE` | Annotation `xmlClass` has no value, or an unknown or illegal value (based on the current context) |
| `-1190` | `USTRUCTWARN_MEMBER_NOT_FOUND` | The schema specifies an element that can contains sub-elements but no character data. The Struct members or the sub-elements can be found, but not the parent element. |
| `-1503` | `UXMLERR_PARSE` | An error occurred while parsing an XML stream. Possible causes:  * The specified schema can be opened   but cannot be parsed. * The specified schema can be parsed as XML but it is not a schema. |
| `-1550` | `UXMLWARN_PARSE` | A warning occurred while parsing an XML stream. Possible causes:  * `<anyAttribute>` is defined for am element in the schema but the attribute declarations cannot be found. |

## Use

Allowed in all Uniface component types.

## Description

A schema describes a set of user-defined XML
elements and data types.

**Important:** When converting a Struct to an XML document that
conforms to a schema, you should have a good understanding of XML schemas and schema concepts. The
following web sites are recommended as a good place to start:

* Simple introduction of the most important
  concepts: [www.w3schools.com/xml/schema\_intro.asp](https://www.w3schools.com/xml/schema_intro.asp).
* Official W3.org primer (part 0):
  [www.w3.org/TR/2004/REC-xmlschema-0-20041028/](https://www.w3.org/TR/2004/REC-xmlschema-0-20041028/)
* Official standard: Part 1:
  [www.w3.org/TR/2004/REC-xmlschema-1-20041028/](https://www.w3.org/TR/2004/REC-xmlschema-1-20041028/)
  and Part 2: [www.w3.org/TR/2004/REC-xmlschema-2-20041028/](https://www.w3.org/TR/2004/REC-xmlschema-2-20041028/)

Using the provided schema,
structToXml/schema searches the input Struct (StructSource)
for Struct members that match the schema. Matching is based on both the names of Struct members and
the structure of the Struct. Everything in the Struct that does not match the schema is
ignored.

The point at which the matching process starts
determines whether the resulting XML output is a complete XML document or an XML snippet. If it is
an element, structToXml/schema generates a complete well-formed XML document. If
it is a data type, it generates a snippet.

## Performance

Using structToXml without
/schema is faster than using structToXml/schema.

During conversion with
structToXml/schema, the schemas are converted to Structs and subsequently both
the schema and source Structs are scanned repeatedly to find type definitions or the source
element. This provides a very flexible conversion algorithm, but can result in performance
problems, especially when the source Struct contains many repeating members that are groups of
members themselves.

To optimize performance, consider the following:

* Limit the number of occurrences that need to
  be processed. Do not use structToXml/schema to process millions of records.
* Try to have the nodes in the Struct in the
  same order as the elements defined in the schemas. This reduces the number of times that internal
  processing needs to start from the beginning of the schemas to find a match.

## Starting Point

A schema may describe a single global element and
its child elements, or it may define multiple global elements and data types, which refer to each
other to define a complete XML document. It could even describe more than one type of XML document,
depending on which global element you start with.

If the schema describes a single global element,
you can omit the StartingPoint parameter; matching will start with the first
element.

However, if the schema is more complex, you need
to specify the StartingPoint.

If you specify
`"element=ElementName"`, structToXml/schema
will search for the this global element in the schema, and continue the conversion process from
there to generate an XML document. The root of the Struct you provide is assumed to match this
element, even if its name does not match.

If you specify StartingPoint as
`"type=DatatypeName"`, the resulting XML document cannot be a
complete one that can be validated, because the starting element name is unknown.
structToXml/schema generates a start element whose tag name is the name of the
root member of the Struct. If it has no name, this is not done, and the result is a list of root
elements—an XML snippet to be incorporated in another XML document.

If the element or data type used as the starting
point is not unique across all schemas that are being read, it may be necessary to further qualify
it using its namespace. Add `"namespace=namespace"` to the
StartingPoint parameter, separated by Gold `;`. For example:

```procscript
structToXml/schema /validate vXmlOutput, vInputStruct, "element=shiporder;namespace=http://shiporder.com/order"
```

## Converting Structs to XML Using Schemas

After determining the starting point,
structToXML/schema processes each of the schema definitions and references to
global definitions in order. For each element or attribute definition encountered, it looks in the
input Struct to find a match, and if one is found, produces a line of XML for it before going to
the next definition.

For definitions that specify that an element may
occur more than once, this is repeated until the defined maximum is reached, or there are no more
matches in the Struct. structToXML/schema then checks that the minimum number
was reached (producing an error if not), before proceeding to the next definition in the schema.

If structToXML/schema finds the
required matches in the Struct, and the values in the input Struct adhere to the restrictions
placed upon them by the schema, it produces a valid XML document that adheres to the schema.
However, in some cases you may have to modify the Struct before providing it to
structToXML/schema:

* If a schema definition specifies a choice
  (either element A or element B can be present) and the input Struct contains members for both, the
  first choice member in the definition is used and the other one is ignored. In this case, you need
  to ensure that only the desired element is present in the Struct.
* If a schema definition specifies a maximum
  number and the corresponding Struct members exceed this number, the child members up to that number
  are used and the rest ignored. In this case, you need to ensure that the only the desired members
  are present in the Struct.

## Converting Attributes

If a Struct contains attributes, these must be defined in the schema, otherwise they are ignored with no warning.

If `<anyAttibute>` is defined for an element in the schema, structToXML/schema searches all schemas to find an attribute in the same namespace and uses this to write the attribute to the resulting XML stream. If it does not find an attribute definition, it reports an error in $procreturncontext ("No attributes in schema for element:<elementname>”) and no attributes are written to the XML.

## Schema Concepts Used to Generate XmlTarget

The structToXML/schema
statement reads the specified schema and then proceeds to process the source Struct, attempting to
match the Struct contents with the schema. It recognizes and supports the following schema concepts
(as defined in part 1 of the official standard), and applies them as indicated in the following
table.

Schema Concepts Used to Generate XmlTarget

| Schema Concept | XML Construct | Use by structToXML /schema |
| --- | --- | --- |
| Simple type definitions | `<simpleType…>` | Determine how a value in a Struct member is put in the XML document, and the conversions that are required. |
| Complex type definitions | `<complexType…>` | Determine the XML tag structure that must be followed in the XML document. |
| Element declarations | `<element…>` | Determine the names of XML tags, and the structure inside a tag that must be generated in the XML document. |
| Attribute declarations | `<attribute…>` | Determine the name and simple type of attributes to be written to the XML document. |
| Attribute group definitions | `<attributeGroup…>` | Processes each attribute in the group as if it were specified at the position where the reference to the group was encountered. |
| Model group definitions | `<group …>` | Processes each model group as if it were defined at the position where the reference to it was encountered. |
| Model groups | `<all …>`  `<sequence …>`  `<choice …>` | Determine how Struct members that match the sub-elements of the group are put into the XML document.  Model groups describe a set of sub-elements that must occur once in any order (`all`), zero or more times in the specified order (`sequence`), or only one of them must occur (`choice`). |
| Substitution groups | `<substitutionGroup…>` | If a Struct member with the name of an element cannot be found, structToXML/schema searches for a Struct member that has the name of the `substitutionGroup` defined for that element. |
| Particles | Model groups, element declarations, or wildcards with `minOccurs=`, `maxOccurs=`) | The `minOccurs=` and `maxOccurs=` attributes determine when to stop searching for another occurrence of a Struct member that represents an element. |
| Wildcards | `<any>`  `<anyAttribute >` | The wildcard allows any global element or attribute defined in the same or another imported schema to appear at that position in the XML document.  structToXML/schema examines all immediate child Structs to find a matching global element or attribute in all allowed schemas (specified using `namespace=##all, ##other` in the schema), and writes an XML line for the first one encountered. If no match is found among the immediate children, their children are first searched for a match, before moving to the next child level. |
| Namespaces | `<schema …>` | If the first schema has a `targetNamespace` defined and the `elementFormDefault` is `"qualified"`, the namespace is defined as the default namespace in the first element tag written in the resulting XML document.  If `elementFormDefault` is `"unqualified"`, the namespace is defined with a prefix, and the prefix is added to global element names. The same is true for `attributeFormDefault`. |
| Include, Redefine, Import | `<include..>`, `<redefine…>` or `<import…>` | These concepts are about reading other schema documents.  If the `schemaLocation` attribute is not set in these definitions, the other schema file names or URLs in the Schema parameter will provide those locations. |
| Nil values | `nillable="true"` | Writes `nil="true"` in the element's tag if one of the following is true:   * The Struct member corresponding to an   element for which `nillable="true"` has no value or is empty `""` * No corresponding Struct member can be   found for the element (or its sub-elements) and the element is not optional.   If the element is not nillable, this attribute is never written; the element is either omitted or an empty one is written, depending on whether it is optional or not. |
| Lists |  | If a Struct contains a Uniface list, the GOLD characters used as separators are replaced by spaces. |
| Unions |  | Takes the value from the Struct node as a string.  A union can contain many different data types, so no attempt is made to find the right one. Use the `/validate` flag to validate the resulting document, to ensure that the provided data conforms to one of the data types in the union. |

It is possible to perform round-trip conversions
using xmlToStruct on an XML file that conforms to a schema, and then using
structToXML/schema on the resulting Struct, with the same schema. The resulting
XML should be the same, including DTD, comments, process instructions, `any`
elements and `anyAttribute` attributes.

## Schema Concepts Used to Validate XmlTarget

The structToXML/schema
statement assumes that all values you supply in the input struct conform to restrictions imposed by
the schema. To validate the generated XML and ensure that restrictions are applied, you can use the
`/validate` switch.

The following schema constructs are recognized as
restrictions by structToXML/schema and used during validation.

Schema Concepts Used to Validate XmlTarget

| Schema Construct | Description |
| --- | --- |
| Identity-constraint definitions | Enforce unique values and referential integrity between the values of different elements. |
| Restrictions | Place a restriction on the values that can be written. This is ignored when generating the XML, but can be checked with /validate. |
| Notation declarations | Considered to be simple string with a restriction; since restrictions are ignored, it is treated as a simple string. |
| fixed | Places a restriction on the value an attribute or element can have. |
| default | Determines what to do if an attribute is not in the XML document, or if an element is present in the XML document but is empty. |

**Note:**   Annotations in the schema document the schema
itself, providing information to users or applications. They are ignored when generating and
validating XML.

## Tags Used in Conversion

Annotations (tags) may be present in the
SourceStruct (typically as a result of a previous conversion using
componentToStruct or xmlToStruct), but they are used to
generate XML only in the specific circumstances. If they are not used, they are ignored.

Tags Used in Conversion

| Tag | Use |
| --- | --- |
| `xmlVersion` | Generates an XML declaration only if the starting point is an element and this tag is present on the root Struct member. In this case, the `xmlStandalone` and `xmlEncoding` tags are also used (if present). |
| `xmlClass="namespace-declaration"` | If a struct member matches an element, you can add an `xmlns` namespace declaration to the element. For example:  `..->member->myprefix="http://my/uri"`  `..->member->$tags->xmlClass="namespace-declaration"`  Result: `<member xmlns:myprefix="http://my/uri" ....`  If the prefix is named `"#default"`, a default namespace declaration `xmlns="http://my/uri"` is added. |
| `xmlNamespace` | If the schema defines a namespace for an element or attribute name, structToXML/schema examines both the `xmlNamespace` (if present) and the Struct name and to determine whether the Struct member matches the element or attribute name.   * If the `xmlNamespace`   tag is present, it is used to determine whether there is a match. * If a Struct member has the right name   but has no `xmlNamespace` tag, the target namespace of the schema document that   contains the element or attribute is used.   **Note:**  If the Struct originates from an xmlToStruct conversion, and the namespaces used in the original XML document are not the same as the ones in the given schema, you need to remove or change all `xmlNamespace` tags from the Struct before providing it to structToXML/schema. |
| `xmlClass="doctype"` and related DTD tags | Writes a DTD in the same way as structToXML (without `/schema`). Schema’s do not support entity declarations, so if this is required, the SourceStruct must include a Struct member that defines your entities in the XML document; that is, there must be a Struct with `xmlClass="doctype"` and child members whose `xmlClass="entity-declaration "`. For more information, see [XML DOCTYPE Declaration](../../../_reference/xml/xmldtd.md). |
| `xmlClass` and/or `xmlNamespace` | Used only when the schema uses multiple wildcard types (`any` and/or `anyAttribute`) in the same element, and a child Struct member does not match any other subelement or attribute. In this case, it can be unclear whether the Struct member should be converted to an element of type `any` or an attribute of type `anyAttribute`. |
| `xmlClass="comment"` | Used to write comments in the XML document at the location determined by the Struct.  Comments have no name and schemas do not determine where comments will be placed, so structToXML/schema relies on the position of comment Structs to determine their placement.  For example, if a comment is to be placed:   * Inside an element before any   subelement—its corresponding Struct member must be the first child member of the element Struct (or   the second child if the first one is a processing instruction).     ```procscript   ; add comment in element root, before anything else   root->comment1= "The first comment"   root->comment1->$tags->xmlClass = "comment"   root->comment1->$index = 1  ; comment must be first   ``` * Immediately after a subelement, its   corresponding Struct member must be a sibling of the subelement Struct member and immediately   follow that member.     ```procscript   ; add comment after the second sub-element, before the third:   root->more-levels->comment = "Comment between the second and third subelement"   root->more-levels->comment->$tags->xmlClass = "comment"    ; position the comment after subelement{2} and before subelement{3}   root->more-levels->comment->$index = root->more-levels->subelement{2}->$index +   ``` * Just before the end of an element, its   corresponding Struct member must be the last child member of the element's Struct node (or next to   last, if the last one is a processing instruction).     ```procscript   ; add comment in element root at the end   root->comment1= "The last comment"   root->comment1->$tags->xmlClass = "comment"   ; (don't need to change $index, new members are placed at the end by default)   ``` |
| `xmlClass="process-instruction"` | Used to write processing instructions in the XML document at the location determined by the Struct (in the same way a comments).  However, although the name of the struct member does not matter for comments, it does for processing instructions—the name appears immediately after `<?` and the value follows: `<?name value?>`  For character data (for elements with `mixed="true"`), the Struct member must not have a name, and the `xmlClass` tag must not be present or have the value `"CDATA"`, in which case the character data will be written in `<![CDATA[...]]>` format. |
| `xmlAlias` | If an element or attribute requires a prefix, and the matching Struct member has an `xmlAlias`, its value is used for the prefix. If the tag is not present, a prefix is generated.  **Note:**  The first Struct member encountered for any element or attribute that uses the namespace for which you want this prefix must have the `xmlAlias` tag. If the first one does not have it, Uniface will generate one (`ns0`, `ns1`, and so on) and that one will be used, even if subsequent Struct members do have the `xmlAlias` tag. |

| Version | Change |
| --- | --- |
| 9.6.01 | Introduced |

## Related Topics

- [structToXml](structtoxml.md)
- [xmlToStruct](xmltostruct.md)
- [$procReturnContext](../procfunctions/_procreturncontext.md)
- [Uniface XML Constructs](../../../_reference/xml/xmlconstructs_intro.md)
- [Struct Annotations for XML](../../structs/transformingwithstructs/xmlannotations.md)
- [Transforming Complex Data Using Structs](../../structs/transformingwithstructs/handlingcomplexdynamicdata.md)


---

# trigger

Define an extended trigger to be executed on the server

```procscript
trigger TriggerName
    {public soap} ; Execute trigger only
    {public web | partner web }
    {ScopeBlock}
    {ParamsBlock}
    {VariablesBlock}

    Proc

    {return {(Value) }}
end
```

## Declaration

* TriggerName—extended
  trigger name. For more information, see [Triggers: Extended](../triggersextended/extended_triggers_is.md)..
* public soap—trigger can be
  called from a SOAP client when used in Service components, DSPs, and USPs. For more information, see [public soap](public_soap.md).
* public web—trigger can be
  called from a web browser, RESTful service, or other web client when used in DSPs, USPs, and
  Service components. For more information, see [web](web.md).
* ScopeBlock—specifies the
  data to be included in a DSP request-response exchange. For more information, see [scope](scope.md).
* ParamsBlock—defines the
  trigger's parameters, if any. For more information, see [params](params.md)..
* VariablesBlock—defines the
  local variables used by the trigger, if any. For more information, see [variables](variables.md)..

## Return Values

Not applicable.

## Use

Allowed in form and dynamic server page
components.

## Description

Use the trigger statement in
the Extended Triggers container of fields with a widget that supports them. In form components,
this includes the tree, map, grid, OCX, and drag-and-drop widgets. In DSP components, it includes
the EditBox and AttributesOnly widgets.

To mark the end of the trigger definition, use the
end statement.

If a webtrigger is defined with
the same name as a trigger, the last one defined is the one that is used.

## Triggers in Web Applications

When defining extended triggers in DSPs:

* Use the public web
  declaration if you want the trigger to be activated from a web browser or RESTful web service.
* Use the public soap
  declaration if you want the trigger to be activated by a SOAP-based web service. In this case, the
  assignment file must contain the $REQUIRE\_PUBLIC\_DECL setting when the component
  is compiled.
* Use the partner web
  declaration if the trigger is to be referenced by scope definitions of triggers or other operations
  that are themselves declared as public or partner web.
* Use a scope definition to
  define the data that will be included in the request-response exchange between the client and the
  server. If omitted, the scope is assumed to be both `input` and
  `output`, meaning that all data in the DSP will be included in both the request and
  the response.

Activating triggers from the browser initiates a
request-response cycle, since triggers can only be executed on the server. To execute a trigger in
the browser, it must be defined with the webtrigger command.

## Related Topics

- [webtrigger](webtrigger.md)
- [web](web.md)
- [scope](scope.md)
- [Extended Triggers](../../triggers/concepts/extended_triggers.md)
- [public soap](public_soap.md)


---

# u\_condition

Provide a DBMS-independent profile for selection in read and
selectdb statements.

u\_condition  (SelectionExpression)

## Parameters

SelectionExpression—conditional
expression used as a retrieve profile, in which:

* The left-side operand must be a field in the
  retrieved entity.
* The right-side operand can be a value or a
  function returning a value.

  If a Proc function is used, it must be allowed
  in the component type of the component where the SelectionExpression is
  executed. For example $fieldmod is only allowed in a Form.
* Neither operand can contain yet another
  expression.

## Return Values

For values returned in $status,
see read or show, as appropriate. For more information, see [read](read.md) and [selectdb](selectdb.md).

Values Commonly Returned in $procerror Following the u\_condition Clause

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1301 | <UPROCERR\_SYNTAX> | Syntax error. |
| -1302 | <UPROCERR\_SERVICE> | Function not allowed in service. |
| -1303 | <UPROCERR\_REPORT> | Function not allowed in report. |
| -1304 | <UPROCERR\_UNKNOWN\_CONTEXT> | Function not allowed, unknown context. |
| -1305 | <UPROCERR\_EXPRESSION> | Expression not allowed. |
| -1306 | <UPROCERR\_CONDITION> | Condition not allowed. |
| -1307 | <UPROCERR\_EXTRACTION\_EXPR> | Extraction expression is a condition. |
| -1308 | <UPROCERR\_INDIRECTION> | Indirection followed by brackets. |
| -1309 | <UPROCERR\_PARENTHESES> | Operand followed by parentheses. |
| -1310 | <UPROCERR\_BRACKETS> | Operand followed by square brackets. |
| -1311 | <UPROCERR\_UNRESOLVED\_OPERAND> | A field, parameter, or variable could not be found in current context. |

## Use

Allowed in all Uniface component types.

## Description

You can use the u\_condition
clause with read or selectdb Proc statements to provide a
runtime retrieve profile for selecting data.

**Note:**  u\_condition cannot be used
with u\_where.

The u\_where and
u\_condition clauses are very similar. However, the
u\_condition clause is interpreted at run time, whereas
u\_where is interpreted at compilation.

The SelectionExpression
generated from the u\_condition clause is passed to the DBMS connector. This data
is limited to 8192 bytes. In addition, a maximum of 45 retrieve profile characters can be entered,
which includes those on the u\_conditionand those entered in fields by the user;
if the search profile of a single field exceeds 512 bytes, it is truncated to 512 bytes.

## Using u\_condition

When defining an expression in Proc, follow the
rules for string substitution, which uses `%%` to include operators and quotation
marks. For more information, see [Substitution in String Values](../../datatypehandling/substitution_in_string_values.md). For example:

```procscript
$uconditions$ = "fld_date >= $date(%%"22-APR-17%%")"
```

When expressions are provided by the end-user (for
example, in a profile field), this is not required. For example, the following expressions could be
entered by an end-user, where the right-side operand (`fld_xxxx`) are fields of an
entity in the component:

```procscript
```procscript
fld_numeric > 1 & fld_numeric < 6
fld_string = $uppercase("amsterdam")
fld_string = userdefinedfunction(FLD_STRING)
fld_boolean = 0
fld_boolean = "F"
fld_date >= $date("22-APR-17")
fld_date >= "20170422"
fld_time >= $clock("05:06:07")
fld_time >= "050607"
```

;22 April 2017 05 hours 06 minutes 07 seconds:

```procscript
fld_datetime >= $datim("22-APR-17 05:06:07") 
fld_datetime >= 2017042205060700
```
```

u\_condition is interpreted at
runtime, so the value of the `$uconditions$` component variable in the following
example provides a variable retrieve profile.

```procscript
; read trigger of Entity Service component

   read u_condition($uconditions$)
```

## Related Topics

- [read](read.md)
- [selectdb](selectdb.md)
- [u_where](uwhere.md)


---

# u\_where

Provide a DBMS-independent profile for selection with read and
selectdb.

u\_where  (SelectionCriteria)

## Parameters

SelectionCriteria—one or more
relational phrases with the operands linked by relational operators (<,
!=, and so on), connected by logical operators (&,
|, and so on). The operand to the left of the operator must be a field in an
entity; the operand to the right can be a value.

## Return Values

For more information, see [read](read.md) and [selectdb](selectdb.md).

## Use

Allowed in all Uniface component types.

## Description

The u\_where clause is used to
specify DBMS-independent selection criteria for a read or
selectdb statement. It is not an independent Proc statement.
u\_where cannot be used with u\_condition.

The SelectionCriteria
generated from the u\_where clause are passed to the DBMS driver. This data is
limited to 8192 bytes. In addition, a maximum of 45 retrieve profile characters can be entered,
including those on the u\_where clause as well as those entered on the form in a
query-by-form action; if the search profile of a single field exceeds 512 bytes, it is truncated to
512 bytes.

## Selection Criteria

Possible profile characters are always stripped
from the SelectionCriteria, with the exception of `"*"`
and `"?"`, which are treated as literals. For example:

```procscript
read u_where (NAME = "A|B")
```

results in the following
SelectionCriteria:

```procscript
NAME = "AB"
```

In each relational phrase in the selection
criteria, the operand to the left of the relational operator refers to a field in an entity. By
default, it is to a field in the current entity. To specify another entity, qualify the field name
with the entity name, for example, PAY\_BY\_DATE.INVOICE. If a value is used as the first operand,
the criteria will not be evaluated correctly.

The operand to the right of the relational
operator determines whether the relational phrase refers to values in the database or in the
component. The rules for this are:

* If the field following the operator is in the
  same entity and no substitution or format conversion is applied, Uniface uses the database value of
  that field when evaluating the statement.
* If the field following the operator is not in
  the same entity, Uniface uses the component value of that field when evaluating the statement. The
  field must be present in the component.
* If the field following the operator is
  preceded by a string substitution marker (%%) or a format conversion function (for example,
  $number or $date), Uniface uses the component value of that
  field when evaluating the statement.

Using a Database Value from the Same Entity in u\_where Select Criteria

Using Component Values from Two Entities in u\_where Select Criteria

Using a Component Value with a Function in u\_where Select Criteria

## Performance Considerations

Although u\_where is DBMS-independent (that is, it works with every
DBMS supported by Uniface), performance when using u\_where can vary greatly.
Performance depends both on the way you code the Proc module and on the DBMS you are using. This is
because Uniface leaves the evaluation of the statement to the DBMS, where possible; if the DBMS
cannot handle this, Uniface does it itself. Leaving it to the DBMS is almost always faster.

Generally, record-level DBMSs, such as RMS,
cannot perform this sort of selection. Instead, the driver and Uniface have to perform the relevant
sorting, and, if used in conjunction with selectdb, the aggregate function. In a
record-level environment, it is not possible for the DBMS driver to specify a preferred index for
selecting records when using selectdb in combination with a
u\_where clause. Instead, the primary key index is used. If this is not the field
you are referring to, you can expect poor performance.

## read u\_where

The following example causes all occurrences of
the relevant entities to be retrieved for which the following conditions are true:

* NAME begins with 'A'.
* SALARY is greater than or equal to 4975.

```procscript
read u_where ((name = "A*") & (salary >= 4975))
```

## selectdb

The following example retrieves the average
salary and the number of employees from the employee database for which the following conditions
are true:

* The employee’s salary is less than or equal
  to 4975.
* The employee’s age is less than or equal to
  25.

The resulting average salary value is loaded into
the field AVERAGE.DUMMY and the total number of occurrences is loaded into the field TOTAL.DUMMY.
(Note the use of the continuation markers to improve legibility.)

```procscript
$3 = 4975
selectdb (ave(SALARY), count(NAME)) %\
   from EMPLOYEE %\
   u_where ((SALARY <= $3) & (birthdate <= $date(01-01-1972)) %\
   to (AVERAGE.DUMMY, TOTAL.DUMMY)
```

## read u\_where 2

The following example shows how to use a global
variable to supply a clause value to the read statement. The global variable is
called $$NAME, the field being selected on is called FNAME:

```procscript
read u_where (FNAME = "%%$$name")
```

## Related Topics

- [read](read.md)
- [selectdb](selectdb.md)
- [u_condition](ucondition.md)
- [Logical Operators](../../proclanguage/operators/logical_operators.md)


---

# until

Clause in a repeat statement that must evaluate to TRUE before the
repeat loop can complete.

For more information, see [repeat](repeat.md).

---

# uppercase

Convert a string to uppercase.

uppercase  Source, Target

## Parameters

* Source—content to convert
  to uppercase; can be a string, or a field (or indirect reference to a field), a variable, or a
  function that evaluates to a string.
* Target—destination of
  converted content; can be a field or variable that can accept a string value.

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

The uppercase statement
converts the contents of Source to uppercase, then places the result in
Target.

Conversion is on a character-by-character basis as
defined by Unicode.

**Note:**  Locale-based processing rules are not applies
when using uppercase. If this is desired, use $uppercase.

The following example converts the contents of
`vString1` to uppercase:

```procscript
vString1 = "abc"
uppercase vString1, vString2
;Result: : vString2 = "ABC"
```

## Related Topics

- [lowercase](lowercase.md)
- [$uppercase](../procfunctions/_uppercase.md)
- [Case Conversion](../../datatypehandling/caseconversion.md)


---

# validate

Validate all data marked as modified.

validate

validate/e  {Entity}

validate/o  {Entity}

## Switches

* /e—validate only the
  modified occurrences of Entity and its inner entities.
* /o—validate only the
  current occurrence of Entity and its inner entities.

## Parameters

Entity—entity whose data is to
be validated. Can be a string, or a field, variable, function, or parameter that evaluates to a
string containing the entity name. If omitted, the current entity ($entname) is
used.

## Return Values

The values returned in $status
following validate are:

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| >=0 | Statement executed successfully |

Values Commonly Returned by $procerror Following validate

| Value | Error constant | Meaning |
| --- | --- | --- |
| -34 | <UGENERR\_CURRENCY> | Changes to the active path not allowed. |
| -35 | <UGENERR\_4GL\_SAYS\_ERROR> | A trigger returned a negative value in $status. |
| -300 | <UVALERR\_SYNTAX> | An error in declarative syntax occurred. |
| -303 | <UVALERR\_KEY\_EMPTY> | A key field is empty. |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

Whenever one or more errors occur, the function
$dataerrorcontext contains information about the exact context of the error
first validation error encountered by validate; the function
$procerrorcontext indicates the exact location of this error.

## Use

Allowed in Uniface Server Page, form, session
service, entity service, service components (and in report components that are not self-contained).

## Description

The validate statement builds
a list of data within the component that is marked as modified and has not previously been
successfully validated. It then activates the necessary Validate Field, Validate Key, and Validate
Occurrence triggers for each modification. For example, if a modified non-key field needs to be
validated, only the Validate Field and Validate Occurrence triggers are activated.

As each stage of the validation process completes
successfully, the corresponding validation flag ($fieldvalidation,
$keyvalidation, $occvalidation) is set to 0. When the entire
process completes successfully, $instancevalidation is set to 0.

**Note:**  Validation statements
(validatefield, validatekey, validateocc,
and validate) activate the Validate triggers (Validate Field, Validate Key, and
Validate Occurrence triggers). You should therefore be careful when using these statements in
Validate triggers.

Used without a switch, the
validate statement validates all modified data within the component. The scope
of the modified data to be validated can be restricted by supplying one of the switches.

## Sequence of validation

During the validation process, the data in the
component is searched in a depth-first fashion, traversing the occurrences in the component
structure from top to bottom, left to right, validating occurrences of the inner entities before
validating the outer occurrence. For each occurrence that needs validating, the following actions
occur:

1. For the primary key:

   * Declarative checks and Validate Field
     trigger, for each field of the primary key that needs validation
   * Validate Key trigger, for the primary
     key, if the primary key needs validation
2. For each candidate key:

   * Declarative checks and Validate Field
     trigger, for each field of the candidate key that needs validation
   * Validate Key trigger, for the candidate
     key, if the Validate property for the candidate key is clicked  *on*  (on the Define Key
     form) and the candidate key needs validation
3. For each remaining field that has been
   modified:

   * Declarative checks
   * Validate Field trigger, if the field
     needs validation
4. For the occurrence:

   * Declarative checks
   * Validate Occurrence trigger, if the
     occurrence needs validation

The extent of the activation of triggers depends
on the particular validation Proc statements used. This is summarized in the following table:

Activation of triggers during validation

| Statement | Validate Field trigger activated ... | Validate Key trigger activated ... | Validate Occurrence trigger activated ... |
| --- | --- | --- | --- |
| validate  *For all occurrences in the component:* | All fields that need validation | All keys that need validation | All occurrences that need validation |
| validate/e  *For all occurrences of the specified entity and all its inner entities:* | All fields that need validation | All keys that need validation | All occurrences that need validation |
| validate/o  *For the specified occurrence and all its inner entities:* | All fields that need validation | All keys that need validation | All occurrences that need validation |
| validateocc  *For the specified occurrence (no inner entities):* | All fields that need validation | All keys that need validation | That occurrence only |
| validatekey  *For the specified key:* | All key fields that need validation | That key only | — |
| validatefield  *For the specified field:* | That field only | — | — |

## validate

The following example validates all modified (and
nonvalidated) occurrences of the entity CUSTOMER, along with modified occurrences of any inner
entities:

```procscript
$MYENTITY$ = "CUSTOMER"
validate/e "%%$MYENTITY$"
```

## Related Topics

- [validatefield](validatefield.md)
- [validatekey](validatekey.md)
- [validateocc](validateocc.md)
- [$dataerrorcontext](../procfunctions/_dataerrorcontext.md)
- [$procerrorcontext](../procfunctions/_procerrorcontext.md)
- [$fieldvalidation](../procfunctions/_fieldvalidation.md)
- [$instancevalidation](../procfunctions/_instancevalidation.md)
- [$keyvalidation](../procfunctions/_keyvalidation.md)
- [$occvalidation](../procfunctions/_occvalidation.md)
- [Validate Field](../triggersstandard/validatefield.md)
- [Validate Field](../triggersstandard/validatefield.md)
- [Validate Occurrence](../triggersstandard/validateoccurrence.md)


---

# validatefield

Validate a field of the current occurrence.

validatefield  Field

## Parameters

Field—field to validate; can be a literal name, an indirect reference
to a field, a string, or a variable, function, or parameter that evaluates to a string.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| >=0 | Statement executed successfully |

Values Commonly Returned by $procerror Following validatefield

| Value | Error constant | Meaning |
| --- | --- | --- |
| -34 | <UGENERR\_CURRENCY> | Changes to the active path not allowed. |
| -35 | <UGENERR\_4GL\_SAYS\_ERROR> | A trigger returned a negative value in `$status`. |
| -300 | <UVALERR\_SYNTAX> | An error in declarative syntax occurred. |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |

Whenever an error occurs, the field-level On Error is activated. The function
$dataerrorcontext contains information about the exact context of the error, and
the function $procerrorcontext indicates the exact location of the error.

## Use

Allowed in Uniface Server Page, form, session service, entity service, (and in report
components that are not self-contained).

## Description

The validatefield statement validates the specified field of the
current occurrence. If the field is marked as modified and has not been successfully validated or
if $fieldcheck is 1, declarative checks for Field are
performed and the Validate Field trigger is activated. (The section titled ‘Sequence of validation’
in the discussion of the validate statement describes the sequence and extent of
declarative checks and trigger activation.)

If the field is successfully validated, the Validate Field trigger sets
$fieldvalidation to 0.

**Note:**  Validation statements (validatefield, validatekey,
validateocc, and validate) activate the Validate triggers
(Validate Field, Validate Key, and Validate Occurrence triggers). You should therefore be careful
when using these statements in Validate triggers.

```procscript
$MYFIELD$ = "CUSTID.CUSTOMER"
validatefield $MYFIELD$
```

## Related Topics

- [validate](validate.md)
- [validatekey](validatekey.md)
- [validateocc](validateocc.md)
- [$fieldcheck](../procfunctions/_fieldcheck.md)
- [$fieldvalidation](../procfunctions/_fieldvalidation.md)
- [$dataerrorcontext](../procfunctions/_dataerrorcontext.md)
- [$procerrorcontext](../procfunctions/_procerrorcontext.md)
- [Validate Field](../triggersstandard/validatefield.md)
- [Validate Key](../triggersstandard/validatekey.md)
- [Validate Occurrence](../triggersstandard/validateoccurrence.md)


---

# validatekey

Validate a key of the current occurrence.

validatekey  Entity  {, KeyNumber}

## Parameters

* Entity—entity in which a
  key is to be validated. Can be a string, or a field, variable, function, or parameter that
  evaluates to a string containing the entity name.
* KeyNumber—key that is to
  be located (as defined for Entity on the Define Key form); can be constant, or a
  field (or indirect reference to a field), a variable, or a function that can be converted to a
  whole (integer) number; the value will be truncated to form an integer.

  If omitted, the default value of
  1 (the primary key) is chosen. Higher KeyNumbers (2, 3, 4,
  and so on) identify a candidate key depending upon your model definition. Indexes are not allowed.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| >=0 | Statement executed successfully |

Values commonly returned by $procerror following validatekey

| Value | Error constant | Meaning |
| --- | --- | --- |
| -34 | <UGENERR\_CURRENCY> | Changes to the active path not allowed. |
| -35 | <UGENERR\_4GL\_SAYS\_ERROR> | A trigger returned a negative value in `$status`. |
| -300 | <UVALERR\_SYNTAX> | An error in declarative syntax occurred. |
| -302 | <UVALERR\_KEY\_PROFILE> | A key field contains a profile character or the key is incomplete. |
| -303 | <UVALERR\_KEY\_EMPTY> | A key field is empty. |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1104 | <UPROCERR\_KEY> | The key number provided is not valid; for example, the key number was out of range. |

Whenever an error occurs, the entity-level On
Error is activated. The function $dataerrorcontext contains information about
the exact context of the error, and the function $procerrorcontext indicates the
exact location of the error.

## Use

Allowed in all Uniface component types.

## Description

The validatekey statement
validates the specified key of the current occurrence of Entity. If any field of
the key is marked as modified and has not been successfully validated, the necessary Validate Field
triggers and the Validate Key trigger are activated. (For more information on the sequence and
extent of declarative checks and trigger activation, see
[validate](validate.md).)

As each field of the key is successfully
validated, the corresponding validation flag ($fieldvalidation) is set to 0.
When the entire key is successfully validated, $keyvalidation is set to 0.

**Note:**  Validation statements
(validatefield, validatekey, validateocc,
and validate) activate the Validate triggers (Validate Field, Validate Key, and
Validate Occurrence triggers). You should therefore be careful when using these statements in
Validate triggers.

The following operation validates a new primary
key that it receives as an argument:

```procscript
operation NEWKEYCHECK
params
   string NEWKEY : IN
   boolean OK : OUT
endparams

PK1.MYENT = NEWKEY
validatekey "MYENT", 1
if ($status = 0)
  OK = <TRUE>
else
  OK = <FALSE>
endif
```

## Related Topics

- [validate](validate.md)
- [validatefield](validatefield.md)
- [validateocc](validateocc.md)
- [$dataerrorcontext](../procfunctions/_dataerrorcontext.md)
- [$procerrorcontext](../procfunctions/_procerrorcontext.md)
- [$keyvalidation](../procfunctions/_keyvalidation.md)
- [$fieldvalidation](../procfunctions/_fieldvalidation.md)
- [Validate Field](../triggersstandard/validatefield.md)
- [Validate Key](../triggersstandard/validatekey.md)
- [Validate Occurrence](../triggersstandard/validateoccurrence.md)


---

# validateocc

Validate an occurrence.

validateocc  {Entity}

## Parameters

Entity—entity whose data is to
be validated. Can be a string, or a field, variable, function, or parameter that evaluates to a
string containing the entity name. If omitted, the current entity ($entname) is
used.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| >=0 | Statement executed successfully |

Values commonly returned by $procerror following validateocc

| Value | Error constant | Meaning |
| --- | --- | --- |
| -34 | <UGENERR\_CURRENCY> | Changes to the active path not allowed. |
| -35 | <UGENERR\_4GL\_SAYS\_ERROR> | A trigger returned a negative value in `$status`. |
| -300 | <UVALERR\_SYNTAX> | An error in declarative syntax occurred. |
| -302 | <UVALERR\_KEY\_PROFILE> | A key field contains a profile character or the key is incomplete. |
| -303 | <UVALERR\_KEY\_EMPTY> | A key field is empty. |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

Whenever an error occurs, the entity-level On
Error is activated. The function $dataerrorcontext contains information about
the exact context of the error, and the function $procerrorcontext indicates the
exact location of the error.

## Use

Allowed in all Uniface component types.

## Description

The validateocc statement
validates the current occurrence of Entity. If any field of the occurrence is
marked as modified and has not been successfully validated, the necessary Validate Field, Validate
Key, and Validate Occurrence triggers are activated. (For more information on the sequence and
extent of declarative checks and trigger activation, see [validate](validate.md). )

validateocc validates only the
current occurrence; it does not validate related inner entities. In contrast, the
validate/o statement validates all inner entities in addition to the current
occurrence.

You can use the function
$occvalidation to determine if an occurrence requires validation.

As each stage of the validation process completes
successfully, the corresponding validation flag ($fieldvalidation and
$keyvalidation) is set to 0. When the entire process completes successfully,
$occvalidation is set to 0.

**Note:**  Validation statements
(validatefield, validatekey, validateocc,
and validate) activate the Validate triggers (Validate Field, Validate Key, and
Validate Occurrence triggers). You should therefore be careful when using these statements in
Validate triggers.

```procscript
$MYOCC$ = "CUSTID.CUSTOMER"
validateocc $MYOCC$
```

## Related Topics

- [validate](validate.md)
- [validatefield](validatefield.md)
- [validatekey](validatekey.md)
- [$entname](../procfunctions/_entname.md)
- [$dataerrorcontext](../procfunctions/_dataerrorcontext.md)
- [$procerrorcontext](../procfunctions/_procerrorcontext.md)
- [$occvalidation](../procfunctions/_occvalidation.md)
- [$fieldvalidation](../procfunctions/_fieldvalidation.md)
- [$keyvalidation](../procfunctions/_keyvalidation.md)
- [Validate Field](../triggersstandard/validatefield.md)
- [Validate Key](../triggersstandard/validatekey.md)
- [Validate Occurrence](../triggersstandard/validateoccurrence.md)


---

# variables

Define the variables for a trigger or Proc module.

variables

VariableSpec 1   VariableName 1   {`,`VariableName 2   {`, ...,` VariableName n } }

   ...

VariableSpec n   VariableName n

endvariables

VariableSpec can be any of the
following:

* DataType
* {public |
  partner} handle {SignatureName}
* xmlstream`[DTD:`DTDName`]`

## Parameters

* VariableSpec—variable
  specification
* VariableName—name of the
  variable. It has a maximum length of 32 characters, including letters (A-Z), digits (0-9), and
  underscores (\_); the first character must be a letter. A local variable cannot have the same name
  as a named parameter in the same module or operation.
* DataType—a Uniface
  data type
* SignatureName—name of a
  component signature
* DTDName—name of the DTD
  that defines the structure of XML stream variables; can be one of the following:

  + String that evaluates to the name of a DTD
    in the format LitDTDName{.LitModelName}
    where LitDTDName is a literal DTD name defined in the application model
    LitModelName
  + Component constant that evaluates to a
    literal DTD name during compilation.
  + Global or component variable that
    evaluates to a string that contains the name of a DTD.

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

If a params block is present,
the variables block must follow that; otherwise, it must be the first statement
present.

The value of a local variable is set to NULL at
the start of the Proc module.

Variable definitions of the same data type can
occur on one line. For example:

```procscript
; Single line
variables
   string STRING1, STRING2, STRING3
endvariables
```

Uniface generates warnings and errors in the
following circumstances:

* A field exists with the same name as a local
  variable (warning).
* A variable is defined more than once in one
  variable block (error).
* Declared component variable is not used. (info
  message).
* Variable type mismatches (info message); for
  example:

  ```procscript
  variables
    string Counter
  endvariables
    counter = counter + 1  ; results in an info warning
  ```

## Scope of Variables

The scope of variables defined with the
variables statement depends on where they are declared. Local variables must be
declared at the beginning of a Proc module (trigger, operation, or entry).

A local variable exists only in the operation or
module in which it is defined. Its scope is limited to that operation or module. It cannot be
directly referenced from another operation or module in the component, or from a local or global
Proc called by the operation or module. If a local variable has the same name as a field in the
component, then the local variable takes precedence over the field; to access the field, you must
use the qualified field name.

For example, consider a component that contains a
field named DATE in the entity PO. The operation TODAY has a local variable, DATE. To update the
field DATE, the field must be referenced by its qualified name, including its entity:

```procscript
operation TODAY
variables
   date DATE
endvariables
;assign the current date to local variable DATE
DATE = $date
;assign the current date to field DATE.PO
DATE.PO = DATE
...
end ; operation TODAY
```

The operation, SWAP\_STRINGS, in the following
example swaps the contents of two strings:

```procscript
operation SWAP_STRINGS
params
   string STR1 : INOUT
   string STR2 : INOUT
endparams

variables
   string TEMPSTR
endvariables

TEMPSTR = STR1
STR1 = STR2
STR2 = TEMPSTR

end; SWAP_STRINGS
```

## Related Topics

- [Variables](../../proclanguage/variables.md)
- [entry](entry.md)
- [operation](operation.md)
- [params](params.md)


---

# web

Declares that the trigger or operation can be called from a web client, or that its
data can be included in the DSP request-response exchange of other triggers or
operations.

public web  { | partner
web }

## Arguments

* public—the trigger or
  operation can be called by a browser, RESTful web service, or similar web client.

  Operations that are public
  web can only have IN parameters.
* partner—for Dynamic Server
  Pages only. The trigger or operation can only be called by Uniface and not by the web client.
  However, data specified in the scope declaration can be included in the DSP
  request-response exchange of other triggers or operations.

## Use

public web can be used Dynamic
and Static Server Pages, and in Services.

partner web can be used only in
Dynamic Server Pages.

## Description

You can use the public web and
partner web commands to control access to specific triggers and operations from
web clients. For example, if a web client attempts to activate an operation or trigger that does
not contain the public web declaration, a yellow error page is displayed with
the message Security error.

In dynamic server pages, the public
web declaration is always required in a Proc module that will be called from a web
client. It must precede the scope declaration in operations, and in field-level
triggers that are valid for the assigned widget. For valid triggers, see the specific widget
description.

In services and static server pages, the
public web declaration is required only if the components are compiled with
$REQUIRE\_PUBLIC\_DECL set in the assignment file. If this is the case, static
server pages require the public web declaration in the Execute trigger, and in
the detail triggers of command buttons, to ensure they are useable during webget
execution. Otherwise webget will return error `-257
<UWEBERR_ILLEGAL_ACT>`.

## Using public web in a Static Server Page

If you have a Static Server Page (USP) that
contains operations that are used only for internal purposes, use the public web
in the Execute trigger to load the page in response to a web client request, but omit it from other
operations.

```procscript
;trigger Exec
public web 
  webget
  if ($procError == 0)
    webgen
  endif
end
```

## Using public web and public soap in a Dynamic Server Page

In DSPs, it is possible to use both
public web and public soap in the same Proc module. For
example

```procscript
operation doSomething
   public soap
   public web
   scope       
     input
     output
   endscope
   < ... do something ...>
end
```

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced for DSPs |
| 9.4.07 G402 | Supported in USPs and Services |

## Related Topics

- [scope](scope.md)
- [$REQUIRE_PUBLIC_DECL](../../../configuration/reference/assignments/_require_public_decl.md)
- [Widgets: Dynamic Server Pages](../../../_reference/widgetsdsp/dspwidgets_intro.md)
- [Execution of Server-Side Triggers and Operations](../../../webapps/components/dsps/dsprequestresponsecycle.md)
- [Input and Output Scope](../../../webapps/components/dsps/inputandoutputscoping.md)
- [public soap](public_soap.md)


---

# webactivate

Sends an instruction to the browser to invoke an operation.

webactivate  InstanceName{`.`OperationName
  {`(`Parameters`)` } }

## Parameters

* InstanceName—name of a
  component instance that holds the definition for the requested operation. It can be a string, field
  (or indirect reference to a field), variable, or function that evaluates to a string; maximum
  length of 16 bytes.
* OperationName—literal name
  of an operation that is part of the specified component instance, or a variable containing the name
  of an operation as a string. The value can be `EXEC`, `ACCEPT`,
  `QUIT`, or a named operation without parameters in the Operations trigger.

  If no operation and arguments are specified,
  `.EXEC()` is assumed; that is, the Execute trigger of the component
  InstanceName is started with no parameters.
* Parameters—optional IN
  parameters

## Return Values

The output of webactivate is an
instruction to the browser, with specified instance name and operation name, and it will be put in
the $webinfo`("data")` channel.

Values returned in $status

| Value | Description |
| --- | --- |
| `0` | Executed successfully |
| < `0` | An error occurred. $procerror contains the exact error. |

## Use

Allowed in all component types, although it can
only activate operations in DSPs.

## Description

At runtime, the webactivate
statement adds an `activate` instruction to the web output sent to the browser. (If
the webactivate command is initiated by an HTTP request from a DSP page on the
browser, the generated instruction is merged into the HTTP response.)

The browser loads or updates the DSP (and any
child DSPs associated with DspContainer widgets) based on the data in the HTTP response, and then
executes the generated instruction, thereby calling the specified operation. The operation itself
can be implemented as JavaScript on the client, in which case it is executed by the browser, or as
Proc on the server. In this case, the browser posts an HTTP asynchronous request to the Uniface
Server to activate the specified operation.

## Activating Client-Side Operations

Client-side operations are intended to reduce the
round-trip calls between client and server, so it may seem unusual that the server should invoke a
client-side operation. However, this can be useful in cases where the server requires additional
information from the client (or example, for conditional navigation) or to give the browser a
chance to aggregate operation calls after different requests to the server.

Client-side operations are subject to scoping
rules, so execution of the operation called by webactivate may be postponed if
its input or output is blocked. For more information, see [Input and Output Scope](../../../webapps/components/dsps/inputandoutputscoping.md)..

If there are several
webactivate statements invoked in one HTTP request, they are executed in the
supplied order.

## Conditional Page Navigation Request

Full page navigation must be initiated from the
browser; it is not possible for the server to respond to an AJAX update request with a full page.
If the browser requests an update, the server must (always) respond with a full page.

However, it may not be known in advance if a page
update is required. For example, a web page has a Next Page button which stores data first and
then, if the store is successful, instructs the browser to navigate to the next page. If the store
fails, it simply displays a message with the error. All state on the browser is still there,
enabling the enduser to try again.

In this example, webactivate
calls an operation that has a JavaScript implementation and will be executed on the browser. The
JavaScript simply loads a new URL.

Detail trigger of a Next Page button in a DSP:

```procscript
trigger _detail ; Next Page button
public web
scope
  input
  output  ; include URL field
          ; Remark: Do not specify operation <$componentname>.GotoURL
endscope
  store/e entity
  if ($status < 0)
    webmessage/error "Store error ($status = %%$status%%%), page navigation canceled"
  else
    URL = "http://localhost:8080/uniface/wrd/run/next_dsp"
    webactivate $instanceName.GotoURL()
  endif
  return 0
end
```

GoToURL operation:

```procscript
weboperation GotoURL
scope
  ; nothing
endscope
javascript
 {
  // ; instruct Uniface to execute this operation on the browser
  // ; JavaScript begins here

  // ; ... <snip> Javascript to establish context (instance, entity, occurrence, field) </snip>

   // ; some JavaScript to invoke new page; for example:

 window.location = uniface.getField("URL").getValue();  //the value should be "../next_dsp"
}
endjavascript
end
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [$webinfo](../procfunctions/_webinfo.md)
- [Executing Logic in the Browser](../../../webapps/scripting/executinglogicinbrowser.md)


---

# webdefinitions

Use the current component to load channels in the
$webinfo.

webdefinitions

## Use

Only for use in dynamic server pages.

## Description

The webdefinitions loads the following information into
$webinfo channels:

* Component definitions for the current
  component are loaded into the `Definitions` channel. These definitions can include
  properties, initial values, and valrep lists.
* Names of JavaScript files for the current
  component's web widgets are loaded into the `JavaScript` channel.
* All references to CSS files in the current
  component are loaded into the `css` channel.

By default, the data is appended to each channel.
This allows multiple component definitions to be handled by one channel without Proc intervention.
If this behavior is not desired, you must explicitly clear each channel before calling
webdefinitions.

The webdefinitions statement
ensures that both the CSS and the JavaScript channels do not contain duplicate references to CSS or
JavaScript files.

## Set State for DSP

The default code of the DSP Set State trigger generates the initial page or a page updated, depending on the value of $webresponsetype. The following example shows a simplified version of this code (excluding the error handling.)

```procscript
selectcase $webresponsetype
case "UPDATE"         ; Update page
  websave               ; Generate data

case "FULLPAGE"       ; Initial page
  weblayout             ; Generate layout
  webdefinitions        ; Generate component definitions
  websave               ; Generate data
endselectcase
```

In this example myScript.js
is assigned to $webinfo`("javascript")`. When
webdefinitions is called, the necessary JavaScripts for the current component
are added.

```procscript
; assign mySscript.js
$webinfo("javascript") = "myScript.js"
putmess $webinfo("javascript")
; only myscript.js is printed
; Running web definitions appends the default javascript files. 
webdefinitions
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [$webinfo](../procfunctions/_webinfo.md)


---

# webgen

Generate an XHTML document from the layout definition and the component definition of
a static server page.

webgen{/append}  {LayoutFile}  {, OutputFile}

## Switches

/append—appends the generated
XHTML document to an existing OutputFile. If OutputFile does
not exist, a new file is created.

## Parameters

* LayoutFile—name of the
  file to be used as a layout definition of the server page; maximum length of 79 bytes. No default
  extension is provided for LayoutFile. If LayoutFile does not
  exist, the layout definition of a server page is determined by the [$SEARCH\_SKELETON](../../../configuration/reference/assignments/_search_skeleton.md) assignment setting.
* OutputFile—name of the
  file to contain the generated document; string, with a maximum length of 79 bytes. No default
  extension is provided for OutputFile. If OutputFile does not
  exist, a new file is created. If OutputFile exists, that file is overwritten,
  unless the /append switch is used.

## Return Values

Values returned in $status

| Value | Explanation |
| --- | --- |
| `0` | No errors detected, all field values transferred. |
| < `0` | An error occurred. $procerror contains the exact error. |
| >`0` | Number of times that an unknown field or entity in the layout definition was skipped while preparing the XHTML document.  If the layout definition contains references to fields or entities that are not present in the component definition, this is not considered an error. The affected part of the layout is simply skipped. However, the total number of fields and entities skipped is reported in $status. |

**Note:**  It is recommended that you always check the
value of $procerror after webget and before
webgen.

Values of $procerror commonly returned by
webgen

| Value | Error constant | Meaning |
| --- | --- | --- |
| `-31` | `<UGENERR_LICENSE>` | No license for requested action. Contact your Uniface representative. |
| `-250` | `<UWEBERR_SKELETON>` | Layout definition not found or incorrect. For example, the layout is in a separate skeleton file that is not available. |
| `-251` | `<UWEBERR_OUTFILE>` | When $web is empty, the output file is not specified or is the same as the layout file. |
| `-252` | `<UWEBERR_IO>` | Could not write output file. |
| `-253` | `<UWEBERR_IO_IMAGE>` | Could not write image file. |
| `-254` | `<UWEBERR_ITERATION>` | Nested iteration over the same entity. |

## Use

Allowed in all form and server page components.

## Description

The webgen statement generates
an XHTML document from LayoutFile, replacing any field values (marked by
<x-subst> and <x-occurrence> elements) with the
current values in the component definition.

* If the application was started by the Web
  Request Dispatcher ($web="wrd") and the OutputFile argument
  is omitted, the generated document is passed to the web server.
* If the OutputFile argument
  is specified, the generated document is written to the OutputFile.
* If there are no parameters specified,
  webgen defaults to the current component name.

The names of LayoutFile and
OutputFile are subject to non-DBMS file assignments in the [FILES] section of
the assignment file.

Always do a store operation
before webgen, because webgen creates different XHTML for
fields that are stored in a database.

**Note:**  It is possible to customize the XHTML generated
by webgen. You can generate unique `id` attributes for fields,
generate label elements with `for` attributes, and add customized code such as
JavaScript to the generated output. For more information, see [Customizing the XHTML Generated for USPs](../../../webapps/components/usps/customizingxhtmlgeneratedforusps.md).

## Multiple Occurrences in HTML forms

When an entity in the USP layout is surrounded by
<x-occurrence> tags, HTML fields are created for each occurrence currently
in the component definition. To mark which occurrence is shown, the occurrence number is added to
each field name. Outside <x-occurrence> tags, no occurrence number is
added because it is assumed to be `1`.

## Related Topics

- [webget](webget.md)
- [$web](../procfunctions/_web.md)
- [Uniface XHTML Elements for Static Server Pages](../../../_reference/htmltags/uniface_extensions_to_html.md)
- [Creating a Web Output Filter Plug-in](../../../webapps/webdevelopment/creatingweboutputfilterplugin.md)


---

# webget

Load data from an HTML document into a server page and activate a Detail or On Error
trigger if required.

webget

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| `0` | No errors detected and all field values transferred, or On Error trigger is empty. |
| <`0` | An error occurred. The value may be returned by the On Error trigger, or it is returned by $procerror. |

**Note:**  It is recommended that you always check the
value of $procerror after webget and before
webgen.

Values of $procerror commonly returned by
webget

| Value | Error constant | Meaning |
| --- | --- | --- |
| `-31` | `<UGENERR_LICENSE>` | No license available for the requested action. Contact your Uniface representative |
| `-35` | `<UGENERR_4GL_SAYS_ERROR>` | The On Error or Detail trigger returned a (user-defined) negative value in $status. For more information, see [Return Values from Triggers](../../proclanguage/return_values.md#section_932B961EA22D8742C3A192E4E76DFB39). |
| `-255` | `<UWEBERR_NO_CGI>` | The webget statement was used in a non-web context. It must be used in a web runtime environment ($web`!=""`). |
| `-256` | `<UWEBERR_NO_INPUT_EXPECTED>` | No further input expected, because no fill-out document has been generated. |
| `-257` | `<UWEBERR_ILLEGAL_ACT>` | One or more fields cannot be accessed. This occurs when field names mentioned in the HTML page are not available in the current component in Uniface. For example, if the Detail trigger of a command button does not contain a public web declaration. |
| `-258` | `< UWEBERR_STEP>` | Synchronization error, that is, the user has submitted an HTML document that does not correspond to the last one generated. It is, instead, an HTML page generated by Uniface earlier in the same session. |
| `-259` | `<UWEBERR_HASH>` | Mismatch between the security hash of a field and the field value. This can occur when the value of a NED field has been modified by the browser or other web user agent. |
| `-260` | `<UWEBERR_OCC_REJECTED>` | A new occurrence was encountered in the data submitted from the static server page and caused that data to be rejected. |

## Use

Allowed in static server pages.

## Description

The webget statement loads
data that was submitted from a browser into the current USP (on the server). It creates new
occurrences for each occurrence on the HTML request, and reconnects occurrences that are already
stored in the database to the database occurrence.

The data consists of an associative list of
fieldname=value pairs in the
`INPUT` channel of $webinfo. You can use the
$webinfo("input") function to access and process the list yourself, or use
webget.

Each field name is the full description of
Field.Entity.Model with the addition of an occurrence number. The first field of
an new occurrence should be preceded by a special entry with field name equal to
`#.Entity.Model` for a DBMS occurrence, and
`%.Entity.Model` for a non-DBMS occurrence.

The webget statement creates a
new occurrence whenever it encounters a field in this format. When a field is a Uniface command
button that submits the browser data, webget remembers this button and fires the
Detail trigger after processing all input. Only one such command button is remembered.

**Note:**  If $REQUIRE\_PUBLIC\_DECL is
set in the IDE's assignment file, the Detail trigger of all clickable command buttons must contain
a public web declaration. Otherwise, webget returns error
`-257 <UWEBERR_ILLEGAL_ACT>` and clears the component.

The webget statement clears
the input buffer after processing. Subsequent calls to webget do not produce any
action.

webget has its own procedure
for handling errors. For more information, see [Error Triggers in Web Applications](../../../webapps/scripting/error_triggers.md).

## Processing Occurrences Created in the Client

The way that webget handles new
occurrences that have been created in the client depends on the value of the assignment setting
$USP\_CHECK\_NEW\_OCC when the component is compiled. If this is not present, or it
is set to `off`, webget will create a new occurrence on the server
and continues processing.

If the idf.asn assignment
file contains $USP\_CHECK\_NEW\_OCC{`=on`} when the component is
compiled, webget will set $error to `2014`
causing the entity's On Error trigger to be fired. You can use Proc in this trigger to inspect the
incoming field data of this new occurrence and decide what to do with it.

For example, you can use
discard to remove the occurrence before proceeding. If you expect new
occurrences created in the client, you can simply return `0` in the trigger.
webget continues processing and will include the new occurrence when data is
stored.

**Important:** 

You cannot discard records in the On Error
trigger in any other situation, so you must explicitly test for
`$error="2014"` before you perform a
discard.

If you expect new occurrences created in the
client, you can simply return `0` in the trigger. webget continues
processing and will include the new occurrence when data is stored.

If you return a negative value in the error
trigger, webget stops further processing and clears the component. The
detail trigger is not fired and error `-260
<UWEBERR_OCC_REJECTED>` is returned.

## Reconnecting Occurrences to the Database

A Uniface Server Page is a stateless component
that is only active for the duration of a user request. When an XHTML page is created, Uniface adds
additional information about each occurrence.

A hidden field is added at the beginning of each
occurrence with information about its database state. The name of this field starts with a hash
character (#). If the occurrence was already stored in the database, the
partially-encoded primary key is included, so that Uniface can restore the database context in the
next request.

A non-database entity is preceded by a percent
sign (%). In this case, no attempt is made to reconnect to the database.

## Related Topics

- [webgen](webgen.md)
- [$web](../procfunctions/_web.md)
- [$webinfo](../procfunctions/_webinfo.md)
- [$webinfo: Data Topics](../procfunctions/_webinfo_inputoutput.md)


---

# weblayout

Copies the Web layout of the dynamic server page instance and prepares to send it to
Web browser.

weblayout  {FileName}

## Parameters

FileName—name of a file
containing the Web layout. If not specified, the layout is copied from the Repository
definitions.

## Return Values

Values Returned in $status and $procerror

| Value | Meaning |
| --- | --- |
| 0 | Success |
| <0 | An error occurred. $procerror contains the exact error. |

## Use

Only for use in dynamic server pages.

## Description

The weblayout copies the layout
of a DSP component instance, either from an external file or from an internal layout, into the
$webinfo`("LAYOUT")` channel, in preparation for sending the page
to the browser.

## Set State for DSP

The default code of the DSP Set State trigger generates the initial page or a page updated, depending on the value of $webresponsetype. The following example shows a simplified version of this code (excluding the error handling.)

```procscript
selectcase $webresponsetype
case "UPDATE"         ; Update page
  websave               ; Generate data

case "FULLPAGE"       ; Initial page
  weblayout             ; Generate layout
  webdefinitions        ; Generate component definitions
  websave               ; Generate data
endselectcase
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [$webinfo](../procfunctions/_webinfo.md)


---

# webload

Loads data from a JSON stream into a component.

webload

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| 0 | JSON stream successfully loaded |
| >0 | JSON stream loaded, but could not find all the field and entity names specified in the default and local mappings. For each field not found, $status is incremented by 1. More information is available in the message frame if the assignment setting $TEST\_MODE\_COMPONENTS is set. |

Values of $procerror commonly returned by
webload

| Value | Error constant | Meaning |
| --- | --- | --- |
| `-257` | `<UWEBERR_ILLEGAL_ACT>` | One or more fields cannot be accessed. This occurs when field names mentioned in the HTML page are not available in the current component in Uniface. For example, if the Detail trigger of a command button does not contain a public web declaration. |
| `-259` | `<UWEBERR_HASH>` | Mismatch between the security hash of a field and the field value. This can occur when the value of a NED field has been modified by the browser or other web user agent. |
| `-261` | `<UWEBERR_DATA>` | An error occurred while loading data. Incorrect data values or data formats were encountered during server-side validation of a Date, Time, or DateTime field. |

## Use

Only for use in dynamic server pages.

## Description

The webload statement transfers
data from a JSON stream into a component. The data is loaded from the
$webinfo`("data")` channel directly into the component's data
structure.

webload checks for JSON parsing errors, mismatched hash security values for NED fields, and incorrect field values and data formats in Date, Time, or DateTime fields. However, it does not interpret or
initiate other data validation, so the data loaded by webload can include
duplicates of occurrences already within the component, as well as occurrences marked for deletion.

All occurrences loaded from a data stream
(including occurrences marked for deletion) are available in the component structure and accessible
in Proc.

You can use the $JSON\_INDENT
and $JSON\_SHOWNAMES assignment settings to make the JSON stream more
human-readable for development and debugging purposes.

## Reconnect Loaded Data

The webload statement also sets
state flags used by reconnect. After every webload statement,
you should use a reconnect statement to reconnect the loaded data with the data
in the component and the database (if connected). reconnect removes duplicates
of occurrences, removes occurrences marked for deletion from the component, and sets the
appropriate modification flags. For more information, see [Reconnect Process](../../../howunifaceworks/dataio/disconnectedrecordssets/reconnect_process.md).

## Triggers Fired by webload

The webload statement fires the
following triggers that can be used to to customize how a JSON stream is loaded into a component:

* [Pre Load Occurrence](../triggersstandard/pre_load_occurrence.md)—fired immediately before an occurrence is loaded
  from a JSON stream into a component. The new occurrence is not yet available and cannot be
  accessed. This trigger tunes the execution of
  webload and websave. You can use this trigger to customize
  the process of loading a JSON stream into a component.
* [Post Load Occurrence](../triggersstandard/post_load_occurrence.md)—fired immediately after an occurrence is loaded
  from a JSON stream into a component and after all On Error triggers caused by validation errors.
  The new occurrence is available and can be accessed. For example, use this trigger if an occurrence
  can be discarded, or the value for a derived field can be calculated.

## Loading a JSON File

The following example loads a text file containing
JSON-formatted data with Japanese characters and data for a non-modeled (dummy) entity.

The component structure contains one database
entity JAPAN.JAPAN and a non-modeled entity containing two buttons.

The following JSON data loads the data for the
database fields as well as for the dummy fields.

**Note:**  By default, fields and entities in JSON streams
are identified by ID. Fully-qualified names for fields and entities are shown in the nm attribute
only when you use the $JSON\_SHOWNAMES assignment setting.

```procscript
{ 
   "#2" : { 
    "nm" : "JAPAN.JAPAN",
    "type" : "entity",
    "occs" : [ 
     { 
      "id" : "BhJDMTIzNA==",
      "crc" : "00000021",
      "status" : "est",
      "#3" : { 
       "nm" : "ID.JAPAN.JAPAN",
       "value" : "1234"
      },
      "#4" : { 
       "nm" : "BRAND.JAPAN.JAPAN",
       "value" : "SONY"
      },
      "#5" : { 
       "nm" : "DESCRIPTION.JAPAN.JAPAN",
       "value" : "\u3044\u307E"
      }
     }
    ]
   },
   "#6" : { 
    "nm" : "DUM.JAPAN",
    "type" : "entity",
    "occs" : [ 
     { 
      "id" : "VE1QOjQ3ODM0M2RhXzFfYmJmNTAw",
      "crc" : "",
      "status" : "new",
      "#7" : { 
       "nm" : "PB1.DUM.JAPAN",
       "value" : "MickeyMouse"
      },
      "#8" : { 
       "nm" : "PB2.DUM.JAPAN",
       "value" : "DonaldDuck"
      }
     }
    ]
   }
  }
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [websave](websave.md)
- [reconnect](reconnect.md)
- [JSON](../../../webapps/webtechnologies/json.md)
- [$JSON_INDENT](../../../configuration/reference/assignments/_json_indent.md)
- [$JSON_SHOWNAMES](../../../configuration/reference/assignments/_json_shownames.md)
- [$TEST_MODE_COMPONENTS](../../../configuration/reference/assignments/testmode_components.md)


---

# webmessage

Displays a message in a dialog box in the browser.

webmessage`/info` | `/warning` | `/error`  Message  {,  PropertyList}

## Switches

`/info`, `/warning`,
`/error`—specify the message severity; the dialog box displays a matching icon.

## Parameters

* Message—message to be
  displayed. The interpretation of the message depends on the switch.
* PropertyList—associative
  list of one or more of the following property names, controlling the size and content of the
  dialog:

  + `xsize`—horizontal size in
    pixels; value must be from 100 through 800.
  + `ysize`—vertical size in
    pixels; value must be from 100 through 500.
  + `buttontext`—text on the
    confirmation button; default is `OK` is used. Text is truncated at 128
    characters.
  + `title`—text of the title
    bar. When not defined, `Uniface` is used. Text is truncated at 128 characters.

## Return Values

None

## Use

Only for use in dynamic server pages.

## Description

webmessage produces an
asynchronous message box and does not stop JavaScript execution. Calling this function three times
in a row causes three message boxes to appear in the browser.

The dimensions of the message box can be
controlled by `xsize` and `ysize` in the
PropertyList. If they are not defined, the message box is sized to fit the data,
with the minimum dimension of approximately 400 pixels. If the text is too long to fit, the message
box wraps the text and displays a scroll bar.

**Note:**  For predictable behavior, it is recommended that
you define at least the `xsize` of the message box.

The appearance of the message dialog is determined
the uwindow.css stylesheet. You can change the look and feel of the dialog by
editing this file.

The message severity, as indicated by the switch
used, is by the following icons.

Message Severity Icons

| Icon | Severity |
| --- | --- |
|  | Info |
|  | Warning |
|  | Error |

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

---

# weboperation

Define an operation that will be executed on the client browser.

weboperation  OperationName

{ScopeBlock}

{ParamsBlock}

{JavaScriptBlock}

end

## Parameters

* OperationName—literal name
  of the operation; maximum length of 32 bytes. The characters can be letters (A-Z), digits (0-9),
  and underscores (\_), and must begin with a letter (A-Z).
* ScopeBlock—specifies the
  data to be included in a DSP request-response exchange. See scope.
* ParamsBlock—defines the
  operation's parameters. For more information, see [params](params.md)..
* JavaScriptBlock—defines a
  block of JavaScript code that conforms to the [Data Format of External Client-Side Triggers and Operations](../../../webapps/scripting/clientsidetriggersandoperationsdataformat.md). For more information, see [javascript](javascript.md)..

  This block is required when maintaining
  JavaScript in the Development Environment. It can be omitted if the JavaScript definitions are
  externally defined, for example in an external layout or JavaScript files that are available in the
  runtime environment.

## Return Values

None

## Use

Only for use in dynamic server pages.

## Description

Use the weboperation
instruction to define a client-side operation. Client-side operations are executed in the client
browser and can only be implemented as JavaScript. The JavaScript code must be entered between the
javascript and endjavascript keywords. The JavaScript code
can be defined internally using the Proc Editor, or externally in your own DSP layout or JavaScript
files. In this case, you can use your own preferred editor.

Parameters for client-side operations are optional
and must be declared in Proc preceding the javascript instruction. Variables,
however, must be declared in JavaScript.

Client-side operations can be activated from the
server using the webactivate Proc command, or invoked from the browser using the
activate JavaScript function on a uniface.instance
object.

If an operation is defined with
the same name as the weboperation, the last one defined is the one that is
used.

For more information, see [Client-Side Triggers and Operations](../../../webapps/scripting/clientsidetriggersandoperations.md).

```procscript
weboperation Alert 
scope		
 input
 output
 operation INST1.someOper 
endscope

javascript  ; part of Proc code so Proc comment can follow
  Alert("THIS IS JAVASCRIPT CODING"); /* JavaScriptCode and so javaScript syntax */
endjavascript  ; part of Proc code so Proc comment can follow
end
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [JavaScript](../../../webapps/webtechnologies/javascript.md)
- [webactivate](webactivate.md)
- [Client-Side Triggers and Operations](../../../webapps/scripting/clientsidetriggersandoperations.md)
- [createInstance()](../../../_reference/javascriptapi/dspinstance/jsuniface_createinstance.md)


---

# websave

Creates a JSON stream from the data in a component.

websave{/mod
| /one}

## Switches

* /mod—includes only modified
  occurrences in the JSON stream
* /one—includes only current
  outer occurrence (with all inner occurrences) in the JSON stream

## Return Values

The output of websave returns
the CRC, ID, and STATUS for every occurrence and is put in the
$webinfo`("data")` channel.

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| 0 | Success |
| >0 | Number of images for which a temporary file could not be created. |

## Use

Allowed in static and dynamic server page
components.

## Description

The websave statement creates a
JSON stream from the data in a component. The stream is built from the complete hitlist, including
occurrences currently marked for deletion. Occurrences and fields are selected from the data set
based on switches used by the websave statement.

The entities and fields included in the stream are
defined by the component structure, so both database and non-database fields are included in the
JSON stream.

You can use the $JSON\_INDENT
and $JSON\_SHOWNAMES assignment settings to make the JSON stream more
human-readable for development and debugging purposes.

## Triggers Fired by websave

The following triggers are fired by the
websave statement and can be used to customize the process of saving a component
into an JSON stream:

* [Pre Save Occurrence](../triggersstandard/pre_save_occurrence.md)—fired immediately before an occurrence is saved from
  a component into a JSON stream. The occurrence is available and can be examined. For example, the
  value for a derived field can be calculated.
* [Post Save Occurrence](../triggersstandard/post_save_occurrence.md)—fired immediately after an occurrence is saved from
  a component into an JSON stream.

## Images

When the component contains images from a
database, the Uniface Server creates temporary image files in the project directory. If it does not
have write privileges for the project directory, this action fails. The page is still presented to
the browser, but with image load error icons in the locations of the images.

The following code creates a JSON stream from a
component's data structure and writes the result to the message frame.

```procscript
clear
retrieve/e "ORDER.INOUTER"
websave
putmess $webinfo("data")
return
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [JSON](../../../webapps/webtechnologies/json.md)
- [$JSON_INDENT](../../../configuration/reference/assignments/_json_indent.md)
- [$JSON_SHOWNAMES](../../../configuration/reference/assignments/_json_shownames.md)
- [$webinfo](../procfunctions/_webinfo.md)


---

# websetocc

Get a list of entity name and occurrence id from `httprequestparams`
channel of $webinfo, and set the current occurrence according this
list.

websetocc

## Return Values

| Value | Meaning |
| --- | --- |
| 0 | Current occurrence has been successfully set. |
| <0 | An error occurred. $procerror contains the exact error. |

Values Commonly Returned by $procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1 | <UGENERR\_ERROR> | An error occurred. Entity is the outer entity of a Record component. |
| -1102 | UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1133 | <UPROCERR\_OCC\_NOT\_FOUND> | Occurrence could not be found |

## Use

Allowed in static and dynamic server page
components.

## Description

The websetocc statement is
similar to setocc, but it sets the occurrence based on an ID instead of on hit
list position.

Before using websetocc, a
parameter list of entity names and occurrence ID’s must be set in the channel
$webinfo`("httprequestparams")`.

The format of this list should satisfy the
following, where E0…En is a nested entity list in which E0 is the top outer entity, and E1 through
En are sequentially nested inner entities.

* For any number Num, where
  0<=Num<=n, the parameter pair of
  `entity.`Num`=`EntityNameNum`;``occid.`Num`=`EntityNameNumOccID
  specifies the current occurrence of entity EntityNameNum;
* websetocc will set the
  current occurrence following the order of index Num from 0 to n.

$webinfo`("httprequestparams")`
contains the following parameter list for for nested entities ORDER (outer) and ORDERLINE
(inner):

```procscript
entity.0=ORDER.BOOKSTORE;occid.0=???;entity.1=ORDERLINE.BOOKSTORE;occid.1=???
```

You can use the following Proc to set the current
occurrence after reconnect:

```procscript
reconnect/readcheck
websetocc
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [$webinfo](../procfunctions/_webinfo.md)
- [$webinfo: HTTP Header and Request Topics](../procfunctions/_webinfo_httpheaders.md)


---

# webtrigger

Define a trigger in a DSP that will be executed on the client browser.

In Extended Triggers:

```procscript
webtrigger ExtendedTriggerName
   {ScopeBlock}
   {ParamsBlock}
   {JavaScriptBlock}
end
```

In Detail trigger:

```procscript
webtrigger 
   {ScopeBlock}
   {ParamsBlock}
   {JavaScriptBlock}
```

## Parameters

* ExtendedTriggerName—extended trigger
  name. Only extended triggers of DSP widgets are supported.
* scopeBlock—specifies the
  data to be included in a DSP request-response exchange. See scope.
* ParamsBlock—defines the
  trigger's parameters, if supported by the widget. See params.
* JavaScriptBlock—defines a
  block of JavaScript code that conforms to the Uniface's data format. For more information, see [Data Format of External Client-Side Triggers and Operations](../../../webapps/scripting/clientsidetriggersandoperationsdataformat.md) and [javascript](javascript.md)..

  This block is required when maintaining
  JavaScript in the Development Environment. It can be omitted if the JavaScript definitions are
  externally defined, for example in an external layout or JavaScript files that are available in the
  runtime environment.

## Return Values

Not applicable.

## Use

Use only in the Detail and Extended Triggers of
fields in dynamic server pages.

## Description

Use the webtrigger instruction
to define a client-side trigger, which is executed in the client browser and implemented as
JavaScript. The JavaScript definition can be defined internally using the Proc Editor, or
externally in your own DSP layout or JavaScript files. In this case, you can use your own preferred
editor.

Parameters for client-side triggers depend on the
widget and the trigger. If required, they must be declared in Proc preceding the
javascript instruction. Variables, however, must be declared in JavaScript.

The public web and
partner web instructions are not allowed in a webtrigger definition because they
are executed asynchronously on the server whereas the webtrigger implementation
is executed on the client.

At runtime, client-side triggers are executed by
the browser when the user performs the associated action, for example, clicking a button that
invokes the Detail trigger.

If a webtrigger is defined with
the same name as a trigger, the last one defined is the one that is used.

For more information, see [Client-Side Triggers and Operations](../../../webapps/scripting/clientsidetriggersandoperations.md).

## Compiler Warnings and Errors

During compilation, Uniface issues warnings and
errors if the webtrigger and javascript blocks are
incomplete, incorrectly defined, or used in the wrong locations. It does not check the JavaScript
syntax, although it will issue errors if it encounter Proc code in a JavaScript block.

Compiler Warnings and Errors

| Number | Type | Compiler message |
| --- | --- | --- |
| 1 | Error | WebTrigger only allowed in Extended or Detail trigger |
| 2 | Error | Missing EndJavaScript |
| 3 | Warning | JavaScript only allowed in Dynamic Server Page component |
| 4 | Error | WebTrigger does not require a name in the detail trigger |
| 5 | Error | Operations or WebOperation only allowed in Operation trigger |
| 6 | Error | JavaScript tag only allowed in WebOperation or WebTrigger |
| 7 | Error | WebTrigger only allowed in DSP component |
| 8 | Error | Proc statement found in WebTrigger or WebOperation |
| 9 | Info | Skipping WebTrigger TriggerName; it is overlayed |
| 10 | Error | WebTrigger does not have a name. |
| 11 | Error | "public web" or "partner web" not expected in WebTrigger or WebOperation |
| 12 | Error | Found more than one javascript block in module |

```procscript
webtrigger OnEdit
scope
  input  ; Data in this DSP is sent, but not expected to be returned
endscope
javascript
  alert("onedit fired.");   // Check whether OnEdit trigger is fired
endjavascript
end
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [weboperation](weboperation.md)
- [Executing Logic in the Browser](../../../webapps/scripting/executinglogicinbrowser.md)
- [Input and Output Scope](../../../webapps/components/dsps/inputandoutputscoping.md)


---

# while

Define a while/endwhile loop.

while  (Condition)

   ... one or more
Proc statements ...

endwhile

## Parameters

Condition—expression that
evaluates to a Boolean. Uniface converts any data types specified in the expression to boolean data
types (For more information, see [Type Conversion](../../datatypehandling/datatypeconversion.md) and [Operators](../../proclanguage/operators/operators.md).).

## Return Values

None

## Use

Allowed in all Uniface component types.

## Description

The while statement loops
through all the following Proc statements (up to the associated endwhile) as
long as Condition is evaluated as TRUE (that is, nonzero). The
endwhile statement causes an implicit goto to the associated
while statement. When Condition is FALSE (that is, 0),
Uniface continues with the statements (if any) following the associated
endwhile.

It is advisable to indent all statements between
the while and corresponding endwhile.

If only one Proc statement is required for the
while block, that statement can appear on the same line as the
while instruction; in this case, do not include an endwhile.
(You are advised not to use one-line while statements, since they make Proc code
difficult to read and maintain.)

Use the break statement to
terminate a while loop early.

Conditional statements such as
if/endif,
while/endwhile, and
repeat/until can be nested up to 32 levels.

## Using while

The following example shows the use of the `while` statement:

```procscript
; this code selects the occurrence of F2.E1
; that matches NAMEDUMMY

if (F2.E1 != NAMEDUMMY)
   $CURR_OCC$ = $curocc
   $NAME$ = NAMEDUMMY
   $COUNTER$ = 1
   setocc "E1", $COUNTER$
   while ((F2.E1 != $NAME$) & ($status >= 0))
      $COUNTER$ = ($COUNTER$ + 1)
      setocc "E1", $COUNTER$
   endwhile
   if ($status < 0)
      message "%%$NAME$ is not available."
      setocc "E1", $CURR_OCC$
      return (-1)
   endif
endif
$prompt = F2.E1
```

## Related Topics

- [break](break.md)
- [selectcase](selectcase.md)
- [Operators](../../proclanguage/operators/operators.md)
- [Conditions](../../proclanguage/statements/conditions.md)
- [Type Conversion](../../datatypehandling/datatypeconversion.md)


---

# write

Write the current occurrence to the database.

write

## Return Values

Values returned by write in $status

| Value | Meaning |
| --- | --- |
| 0 | Data was successfully written. |
| <0 | An error occurred. $procerror contains the exact error. |
| -1 | No entities are painted on the component. |
| -3 | Exceptional I/O error (hardware or software). |
| -4 | Open request for table or file failed. The table or file is not painted, or it does not exist. |
| -5 | Update request for nonupdatable occurrence. |
| -6 | Exceptional I/O error on write request; for example, lack of disk space, no write permission, or violation of a database constraint. Check the message frame for details. |
| -7 | Duplicate key. |
| -10 | Occurrence has been modified or removed since it was retrieved; the occurrence should be reloaded. |
| -11 | Occurrence already locked. |
| -15 | Uniface network error. |
| -16 | Network error: unknown. |

Values commonly returned by $procerror following write

| Value | Error constant | Meaning |
| --- | --- | --- |
| -2 through -12 | <UIOSERR\_\*> | Errors during database I/O. |
| -16 through -30 | <UNETERR\_\*> | Errors during network I/O. |
| -1 | <UGENERR\_ERROR> | An error occurred. No entities are painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

The write statement writes an
occurrence to the database. This statement should only be used in the Write or Write Up triggers.
If fields of the occurrences have Proc code in their Encrypt trigger, the Encrypt triggers will be
activated.

The following example uses the
write statement in the Write trigger to log information about which user updated
or created a particular occurrence.

```procscript
; <Write> trigger

if ($dbocc = 0)
   CREATED_BY = $user
   CREATED_DATE = $date
else
   UPDATED_BY = $user
endif
write
```

## Related Topics

- [read](read.md)
- [store](store.md)
- [Write](../triggersstandard/write.md)
- [Write Up](../triggersstandard/writeup.md)


---

# xmlload

Load data from an XML stream into a component.

xmlload{/incldefmap}{/noprofile}  XmlSource, DTDName  {, DTDMapping}

## Switches

* /incldefmap—instructs
  xmlload to use the default DTD mapping defined in the DTD Editor.
* /noprofile—escape sequences
  for profile characters and subfield separators are not converted to the corresponding profile
  character of subfield separator during xmlload.

## Parameters

* XmlSource—field, variable,
  or parameter containing the XML stream.
* DTDName—DTD used to
  validate the XML stream.

  DTDName— literal string,
  variable, or constant using the following format:

  {DTD:}Name.Model

  + DTD:—specifies that the
    XML stream is defined using a DTD (this is to ensure compatibility with future developments in the
    XML standard).
  + Name—name of the DTD as
    specified in the application model.
  + Model—name of the DTD's
    application model.
* DTDMapping—Uniface list
  mapping elements to field names.

  For more information, see [Mapping Between Uniface and XML Streams](../../../integration/xml/concepts/default_dtd_mapping_and_mapping_defined_on_a_component.md).

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| 0 | XML stream successfully loaded |
| >0 | XML stream loaded, but could not find all the field and entity names specified in the default and local mappings. For each field not found, $status is incremented by 1. More information is available in the message frame if the assignment setting $TEST\_MODE\_COMPONENTS is set. |

Values commonly returned by $procerror for xmlload

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1500 | <UXMLERR\_DTD\_NOTFOUND> | A DTD could not be located. |
| -1501 | <UXMLERR\_DTD\_INVALID> | There is a syntax error in the DTD. |
| -1502 | <UXMLERR\_GENERATION> | An error occurred during generation of an XML stream. |
| -1503 | <UXMLERR\_PARSE> | An error occurred during parsing of an XML stream. |

## Use

Allowed in all Uniface component types.

## Description

xmlload transfers data from an
XML stream into a component. The data is loaded directly into the component's data structure.
xmlload does not interpret or initiate validation of data, so the data loaded by
xmlload can include duplicates of occurrences already within the component, as
well as occurrences marked for deletion.

All occurrences loaded from an XML stream
(including occurrences marked for deletion) are displayed on forms and accessible in Proc.

**Note:**  The value of a boilerplate or control field
cannot be loaded when using XMLLOAD. Only fields of the type database or non-database are allowed
in XML streams.

## Reconnect Loaded Data

After every xmlload statement,
you should use a reconnect statement to reconnect the loaded data with the data
in the component and the database (if connected). reconnect removes duplicates
of occurrences, removes occurrences marked for deletion from the component, and sets the
appropriate modification flags. For more information, see [Reconnect Process](../../../howunifaceworks/dataio/disconnectedrecordssets/reconnect_process.md).

**Note:**   Use clear before data
retrieved from a database is uploaded on the client, so all occurrences have the required initial
(unmodified) state.

## Triggers Fired by xmlload

The xmlload statement fires the
following triggers that can be used to to customize how an XML stream is loaded into a component:

* [Pre Load Occurrence](../triggersstandard/pre_load_occurrence.md)—fired immediately before an occurrence is loaded
  from an XML stream into a component. The new occurrence is not yet available and cannot be
  accessed.

  This trigger tunes the execution of
  xmlload and xmlsave. You can use this trigger to customize
  the process of loading an XML stream into a component.
* [Post Load Occurrence](../triggersstandard/post_load_occurrence.md)—fired immediately after an occurrence is loaded
  from an XML stream into a component and after all On Error triggers caused by validation errors.
  The new occurrence is available and can be accessed. For example, use this trigger if an occurrence
  can be discarded, or the value for a derived field can be calculated.

The xmlload statement fires the
following triggers that can be used to display errors:

* [On Error (Entity)](../triggersstandard/onerror.md)—fired immediately after the occurrence is loaded if
  the `valerr` attribute is present in an occurrence element of the XML stream. The
  new occurrence is available and can be accessed.

  $occproperties returns an
  associated list of occurrence properties, including the property with id `errormsg`
  which contains the the validation error. The validation error can be used to display the error.
* [On Error (Field)](../triggersstandard/onerror2.md)—fired if the `valerr` attribute is
  present in a field element of the XML stream. Is is fired after the occurrence is loaded from the
  XML stream into the component and after any occurrence-level errors. The data of the field is
  available and can be accessed.

  $fieldproperties returns
  an associated list of field instance properties, including the property with id
  `errormsg` which contains the the validation error. The validation error can be used
  to display the error.

## Receiving an XML Stream

The following code shows
an operation that receives an XML stream, and loads the data from the XML into
the component’s data structure.

```procscript
operation XMLIN
; This operation receives and
; reconnects an XML stream.

params
   xmlstream [DTD:ABCDTD.ABC] MYSTREAM : IN
endparams

clear
xmlload MYSTREAM, "DTD:ABCDTD.ABC"
retrieve/reconnect
...
```

## Related Topics

- [xmlsave](xmlsave.md)
- [Saving and Loading XML Streams](../../../integration/xml/tasks/create_and_send_an_xml_stream.md)
- [Uniface XML Stream Processing](../../../integration/xml/concepts/uniface_processing_of_xml_streams.md)
- [$occproperties](../procfunctions/_occproperties.md)


---

# xmlsave

Places component data in an XML stream.

xmlsave{/mod}{/one}{/dtd |
/ref}{/incldefmap}{/root}  
XmlTarget, DTDname  {, DTDmapping}

## Switches

* /mod—includes only modified
  occurrences in the XML stream
* /one—includes only current
  outer occurrence (with all inner occurrences) in the XML stream
* /dtd—includes the DTD in
  the XML stream
* /ref—includes the URI
  location of the DTD in the XML stream
* /incldefmap—instructs
  xmlsave to use the default DTD mapping defined in the DTD Editor
* /root—excludes the XML
  version declaration from the saved output

## Parameters

* XmlTarget—field, variable,
  or parameter for the XML stream
* DTDName—DTD used for the
  XML stream; can be a literal string, variable, or constant using the following format:

  {DTD:}Name.Model

  Where:

  + DTD:—specifies that the
    XML stream is defined using a DTD (this is to ensure compatibility with future developments in the
    XML standard).
  + Name—name of the DTD as
    specified in the application model.
  + Model—name of the DTD"s
    application model.
* DTDMapping—Uniface list
  mapping XML elements to Uniface fields and entities

## Return Values

Values returned in $status after
xmlsave

| Value | Meaning |
| --- | --- |
| <0 | An error occurred. $procerror contains the exact error. |
| 0 | XML stream successfully created |
| >0 | XML stream created, but could not find all the field and entity names specified in the default and local mappings. For each field not found, $status is incremented by 1. More information is available in the message frame if the assignment setting $TEST\_MODE\_COMPONENTS is set. |

Values commonly returned by $procerror for
xmlsave

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1500 | <UXMLERR\_DTD\_NOTFOUND> | A DTD could not be located. |
| -1501 | <UXMLERR\_DTD\_INVALID> | There is a syntax error in the DTD. |
| -1502 | <UXMLERR\_GENERATION> | An error occurred during generation of an XML stream. |
| -1503 | <UXMLERR\_PARSE> | An error occurred during parsing of an XML stream. |
| -1504 | <UXMLERR\_VALIDATE> | An error occurred during validation of an XML stream. |
| -1505 | <UXMLERR\_TRANSFORM> | An error occurred during transformation of an XML stream. |
| -1506 | <UXMLERR\_FIELD\_NOTAVAIL> | A mandatory field is not available in the field list of the entity. In the DTD, such fields must be followed by a question mark (?). |

## Use

Allowed in all Uniface component types.

## Description

The xmlsave statement writes
all occurrences on the component (connected or disconnected) to an XML stream. The stream is built
from the complete hitlist, including occurrences currently marked for deletion. Occurrences and
fields are selected from the data based on the mapping and switches used by the
xmlsave statement.

**Note:**  Only fields of the type database or non-database
are allowed in XML streams. The value of a boilerplate or control field cannot be included into an
XML stream when using xmlsave.

For more information, see [Uniface XML Stream Processing](../../../integration/xml/concepts/uniface_processing_of_xml_streams.md) and [Occurrence Metadata](../../../integration/xml/concepts/processing_information.md)..

## State Information Generated by xmlsave

xmlsave adds data processing
information to the data as XML attributes. When loading XML data into the component (using
xmlload), Uniface extracts the processing information and saves it as attributes
of disconnected occurrences and fields.

xmlsave generates the following
state information:

State Information Generated by xmlsave

| State Value | $occstatus | $occdel | $occmod | $storetype | Remarks |
| --- | --- | --- | --- | --- | --- |
| `"est"` | `""` | `0` | `0` | `0` | No modified existing occurrence, reconnected |
| `"mod"` | `""` | `0` | `1` | `0` | Modified existing occurrence, reconnected |
| `"new"` | `""` | `0` | `1` | `1` | New occurrence, always not reconnected |
| `"del"` | `""` | `1` |  |  | Deleted occurrence, reconnected |
| `"mod"` | `"est"` | `0` | `1` | `1` | Existing occurrence, no reconnect. The State changes to `"mod"` |
| `"mod"` | `"mod"` | `0` | `1` | `1` | Modified occurrence, no reconnect. The State stays `"mod"` |
| `"new"` | `"new"` | `0` | `1` | `1` | New occurrence, no reconnect. The State stays `"new"` |
| `"del"` | `"del"` | `0` | `1` | `1` | Deleted occurrence, no reconnect. The State stays `"del"` |
| `"del"` | `"est"` | `1` |  |  | Deleted occurrence which was Existing, no reconnect. The State changes to `"del"` |
| `"del"` | `"mod"` | `1` |  |  | Deleted occurrence which was Modified, no reconnect. The State changes to `"del"` |
| `—` | `"new"` | `1` |  |  | Deleted occurrence which was New, no reconnect. The State can be removed |
| `"del"` | `"del"` | `1` |  |  | Deleted occurrence which was already deleted, no reconnect. The State stays deleted |

**Note:**  If $occstatus is not empty,
this could mean that the occurrence is not reconnected. To be compatible, disconnected occurrences
with a status `"est"` are changed into `"mod"`, to force reconnection
with database.

## Triggers Fired by xmlsave

The following triggers are fired by the
xmlsave statement and can be used to customize the process of saving a component
into an XML stream:

* [Pre Save Occurrence](../triggersstandard/pre_save_occurrence.md)—fired immediately before an occurrence is saved from
  a component into an XML stream. The occurrence is available and can be examined. For example, an
  occurrence can be excluded from the save, or the value for a derived field can be calculated.
* [Post Save Occurrence](../triggersstandard/post_save_occurrence.md)—fired immediately after an occurrence is saved from
  a component into an XML stream.

## Mapping Data Between Elements and Fields and Entities

The structure of the XML stream is defined by the
DTD specified in DTDName. Uniface maps field values to XML elements in the
stream using a combination of the local and default mapping and name matching. For more information, see [Mapping Between Uniface and XML Streams](../../../integration/xml/concepts/default_dtd_mapping_and_mapping_defined_on_a_component.md)..

Default Generation of Element Names in XML streams

| Rule | Uniface item | XML stream item | Example element |
| --- | --- | --- | --- |
| Entity | Entity | Entity.Model | `<UCDTYP.DICT>` |
| Field | Field | Field | `<UDESCR>` |
| Non-unique field | Non-unique field | Field.Entity.Model | `<UDESCR.UFORM.DICT>` |

Uniface applies the *non-unique field*
naming rule when two or more entities in the same DTD have fields with identical names. In these
cases, the first field added to the stream is generated using the *field* rule,
subsequent fields using the same name in other entities are generated using the  *non-unique
field rule* .

## store/complete before xmlsave

If you use store prior to
xmlsave, the hitlist is truncated and the saved XML stream can contain empty
`new` occurrences. When the data is subsequently stored in the database (using
xmlload and reconnect, this causes a `Key not
complete` or `Subfields are required` error.

To prevent the hitlist being truncated, use either
store/complete or use clear then
retrieve.

## Creating and Sending an XML Stream

The following operation creates
an XML stream from a component's data structure, and sends the XML stream as an
`OUT` parameter.

```procscript
operation XMLOUT
; This operation saves data to XML.

params
   xmlstream [DTD:ABCDTD.ABC] MYSTREAM : OUT
endparams

clear
retrieve
xmlsave MYSTREAM, "DTD:ABCDTD.ABC"
...
```

## Related Topics

- [reconnect](reconnect.md)
- [xmlload](xmlload.md)
- [$occstatus](../procfunctions/_occstatus.md)
- [$occmod](../procfunctions/_occmod.md)
- [$occdel](../procfunctions/_occdel.md)
- [$storetype](../procfunctions/_storetype.md)
- [Saving and Loading XML Streams](../../../integration/xml/tasks/create_and_send_an_xml_stream.md)
- [Uniface XML Stream Processing](../../../integration/xml/concepts/uniface_processing_of_xml_streams.md)
- [retrieve/reconnect](retrieve_reconnect.md)


---

# xmlToStruct

Convert an XML document to a Struct.

xmlToStruct
{/full} {/whitespace}  StructTarget`,` XmlDocument

xmlToStruct
{/full} {`/validate` } { /schema}  
StructTarget`,` XmlDocument`,` SchemaList

## Switches

* /full—include comments,
  doctype declarations, and namespace declarations, if they are present, and leave leading and
  trailing whitespace in character sequences within elements. By default, the constructs are ignored
  and whitespace stripped. See
  [Conversion with /full](#section_51397EF6DFF14BD5B5365E9A59DB7765) and
   [Namespace Handling](#section_33F15BC3C0B44AF68D807219B88AF86D).
* /whitespace—convert
  whitespace between elements to Struct members and leave leading and trailing whitespace in element
  values or comments. By default, such whitespace is ignored or stripped.

  This switch is only applicable if
  /validate or /schema are not specified. DTDs and schemas
  handle whitespace correctly, causing only whitespace that the DTD or schema does not deem
  significant to be discarded.
* /validate—validate the XML
  source against its DTD or schema. A DTD can be provided as an embedded DTD or as a reference. A
  schema can be provided as a reference or in the SchemaList parameter. A
  referenced DTD or schema is expected to be located at the provided URL. If only a DTD or schema
  name is provided, a file with that name is expected in the working directory.

  By default, the XmlSource
  is only checked to ensure it is well-formed. If `/schema` is specified,
  /validate is implicitly specified. If the XML document does not conform to the
  DTD or schema, validation fails, error `-1504` is returned, and the
  `struct` output parameter is left unchanged..
* /schema—include schema
  information, if present, during conversion and validate the XML against it. By default this
  information is ignored. See
  [Conversion with /schema](#section_3CB6447A0F124AD282E649A0E500D34B) and
  [Data Types](#section_ACE446BFD45F4AABA2B50B0254F4E807)

## Parameters

* StructTarget—variable or
  parameter of type struct or any to hold the returned output
* XmlDocument—XML document to
  parse; value can be a string, file name, or a URL. The XML document can only contain one XML root
  element.

  The format of the parameter determines the
  type. A string must begin with the open tag angle bracket (`<`), and a URL must
  have the format Protocol`://`Address.
  Otherwise, the parameter is interpreted as a file name.
* SchemaList—namespace and
  location of one or more schemas. For a single schema, SchemaList can be a file
  name, URL, or a Uniface index list. For multiple schemas, it must be a Uniface list of name-value
  pairs in the format:

  {`NAMESPACE=`Namespace`;`}`LOCATION=`Location

  `NAMESPACE` cannot exceed 4096 characters; `LOCATION=`cannot exceed 260 characters.

## Return Values

`0` is returned in
$status if the conversion was successful. However, non-fatal errors may have
occurred during conversion, because everything that is not recognized or usable is ignored.
Warnings about such conditions are made available in `DETAIL` sublist of
$procReturnContext. See
[$procReturnContext for xmlToStruct](#section_949E7B4BACD7422C9E9032FDAAF0DF7D).

Common Errors Returned in $procerror After
xmlToStruct

| Error | Error Constant | Meaning |
| --- | --- | --- |
| `-4` | IOSERR\_OPEN\_FAILURE | Specified source does not exist or cannot be opened; or specified URL is invalid or cannot be read; or the `NAME` or `LOCATION` are too long. |
| `-13` | UIOSERR\_OS\_COMMAND | The specified file name specified by XmlDocument is too long. |
| `-1403` | UPROCERR\_OPERAND | The Struct Target is not a variable or parameter of type struct or any |
| `-1503` | UXMLERR\_PARSE | The XML source is not well-formed XML |
| `-1504` | UXMLERR\_VALIDATE | The XML source does not conform to the DTD. |

## Use

Allowed in all Uniface component types.

On iSeries, there is no
schema support, so /schema and SchemaList cannot be used.

## Description

Use the xmlToStruct statement
to transform an XML document to a Struct. This Struct:

* Always contains a nameless root Struct that
  represents the XML document. It can optionally hold XML declaration tags.
* The XML root element is always the first named
  child struct of this nameless struct .

Thus, `<movie>The
Matrix</movie>` is converted to the following Struct:

```procscript
[]
  [movie] = "The Matrix"
```

**Note:**  xmlToStruct cannot be used to
convert XML snippets.

An XML document always has a root node and it may
have constructs that appear at the same level as the root node, such as the XML declaration, the
DOCTYPE declaration, and comments. Some of these constructs are handled as annotations but others
may be treated as Structs if `/full` is used.

During conversion xmlToStruct,
transforms the XML document to one Struct at the top level, which holds the root node and its
sibling constructs. In addition to converting XML constructs to Struct nodes,
xmlToStruct sets annotations in $tags Struct of each Struct
node.

## Viewing the Struct

This can be clearly seen in the string
representing the Struct that is returned by $dbgString, which can be used during
development to view and analyze the Struct. For example:

```procscript
; INPUT_FLD is xmlstream
; OUTPUT_FLD is string
; $InputStruct$ is struct component variable

xmlToStruct /full $InputStruct$, INPUT_FLD
OUTPUT_FLD = "%%($InputStruct$->$dbgString)%%%"
```

If INPUT\_FLD contains:

```procscript
<?xml version="1.0" encoding="UTF-8"?>
<div class="note">Text can be <b>bold</b> or <em>italic</em></div>
```

the following is put into OUTPUT\_FLD:

```procscript
[]
  [div]
    [$tags]
      [xmlClass] = element
    Text can be 
    [b] = bold
      [$tags]
        [xmlClass] = element
     or 
    [em] = italic
      [$tags]
        [xmlClass] = element
```

For each XML construct, there is a set of
annotations that may be set, depending on the XML contents.

## Getting Information About Structs

Other Struct functions enable you to access and
manipulate the Struct members in Proc.

For example:

```procscript
$1 = $InputStruct$->$tags->xmlEncoding
```

Result: `$1 = "UTF-8"`

```procscript
$2 = $InputStruct$->$collSize
```

Result: `$2 = 1`, meaning this
Struct contains only one member. The $tags Struct is not counted.

For more information, see [Struct Annotations](../../structs/structannotations.md) and [Struct Annotations for XML](../../structs/transformingwithstructs/xmlannotations.md). For more information on the conversion between XML
and Structs, see
[Uniface XML Constructs](../../../_reference/xml/xmlconstructs_intro.md).

## Conversion with /full

By default XML comments, DOCTYPE declaration, and
namespace declarations are ignored when converting to Structs.

To include them, use the /full
switch. This ensures that all XML constructs, including comments, doctype declaration, and
namespace declarations (if present), are also converted to Structs. This is critical if you need to
reconstruct an equivalent XML document from the Struct.

**Note:**  The use of /full does not
imply /schema or /whitespace.

If /full is specified, and
`<![CDATA[...]]>` occurs within the character data, it is converted to a
separate nameless scalar Struct with the `xmlClass` tags set to
`CDATA`. Otherwise, the `<![CDATA[...]]>` piece is incorporated
into one scalar Struct for the whole character value; it becomes indistinguishable from the rest of
the data.

## Namespace Handling

Qualified names are those consisting of namespace
URI that qualify a local name. For example, the local name `schema` can be qualified
by the namespace `"http://www.w3.org/2001/XMLSchema"` which together provide a
unique identifier.

Namespaces can be defined with an alias. For
example, `xmlns:s="http://www.w3.org/2001/XMLSchema"` means that within the scope of
this definition `s` is the namespace
`http://www.w3.org/2001/XMLSchema"`.

An alias can be used in a qualified name. For
example, `s:schema` and its semantics are completely defined by the XML Schema
Definition and should not be confused with any other meaning `schema`.

By default, xmlToStruct
recognizes qualified names only in element and attribute *names*, and records the
namespace declaration in the $tags members of the element or attribute Struct
node.

When xmlToStruct/full is used, it also recognizes:

* Namespace declarations that are *not
  actually used* in a qualified name
* Qualified names that are used as
  *values* of elements and attributes. This type of construction is used in specialized
  XML documents that describe or manipulate other XML documents.

For example, in the following XML namespace
definition:

```procscript
<ns1:element  xmlns:ns1="www/namespace/example1" 
                xmlns:ns2="www/namespace/example2"  ns2:attribute=a_value>
```

1. `element` is a local name
   within the `ns1` namespace.
2. `ns1` is an alias or
   abbreviation of the namespace `www/namespace/example1`.
3. `ns2` is an alias or
   abbreviation of the namespace `www/namespace/example2`.
4. `attribute` is a local name
   within the `ns2` namespace.

By default, xmlToStruct
registers this in the Struct node as:

```procscript
[element] 
    [$tags]
        [xmlClass]=element
        [xmlNamespaceURI]=www/namespace/example1 
        [xmlNamespaceAlias]=ns1
    [attribute]="a_value"
        [$tags]
            [xmlClass]=attribute 
            [xmlNamespaceURI]=www/namespace/example2 
            [xmlNamespaceAlias]=ns2
```

The default behaviour records only the namespace
declarations that are actually used, so if there were a third namespace declaration such as
`xmlns:ns3="www/namespace/example3"`, the Struct nodes would not contain it because
it is not used in those nodes.

In the following XML example, the attribute
contains a namespace definition as a value:

```procscript
<ns1:element xmlns:ns1="www/namespace/example1"
             xmlns:ns2="www/namespace/example2"
             xmlns:ns3="www/namespace/example3" ns2:attribute=”ns3:a_value">
```

By default, xmlToStruct
produces:

```procscript
[element]
    [$tags]
        [xmlClass]=element
        [xmlNamespaceURI]=www/namespace/example1
        [xmlNamespaceAlias]=ns1
    [attribute]="ns3:a_value"
        [$tags]
            [xmlClass]=attribute
            [xmlNamespaceURI]=www/namespace/example2
            [xmlNamespaceAlias]=ns2
```

Notice that the value of the attribute is
`ns3:a_value`, but there is no definition of `ns3`.

In these cases, you must use the
/full qualifier to ensure that all of the original namespace declarations are
recorded in the Struct nodes. Thus xmlToStruct/full produces:

```procscript
[element]
    [$tags]
        [xmlClass]=element
        [xmlNamespaceURI]=www/namespace/example1
        [xmlNamespaceAlias]=ns1
    [ns1]="www/namespace/example1"
      [$tags]
        [xmlClass]=namespace-declaration
    [ns2]="www/namespace/example2"
      [$tags]
        [xmlClass]=namespace-declaration
    [ns3]="www/namespace/example3"
      [$tags]
        [xmlClass] = namespace-declaration
    [attribute]="ns3:a_value"
        [$tags]
            [xmlClass]=attribute
            [xmlNamespaceURI]=www/namespace/example2
            [xmlNamespaceAlias]=ns2
```

## Conversion with /schema

If /schema is used, the
specified schema (or schemas) determine which whitespace is significant and which is not.

If schemas are specified, each Namespace+Location
pair in the SchemaList is added to the list of schema locations as if they were
specified in the XML source itself using the `schemaLocation=` keyword.

There can be only one location without
accompanying namespace in the list, because the XML parser supports only one location specified by
the `noNamespaceSchemaLocation` keyword.

For example:

* Index list has one item, a schema
  location:

  ```procscript
  xmlToStruct vStruct, "file.xml", "schema.xsd"
  ```
* Index list has one item, an associated list
  with only a schema location; this is equivalent to the previous command:

  ```procscript
  xmlToStruct vStruct, "file.xml", "LOCATION=schema.xsd"
  ```

When multiple schemas are specified,
Namespace+Location pairs must be passed as an associated list. For example:

```procscript
vSchemaList = "" ; initialize outer list
vItems = ""      ; initialize sublist 

; create Namespace+Location sublist
putitem/id vItems, "NAMESPACE", "http://www.shiporder.com"
putitem/id vItems, "LOCATION", "shiporder.xsd"
putitem vSchemaList, -1, vItems ; add items list to outer list

; add a second pair:
vItems = ""
putitem/id vItems, "NAMESPACE", "http://www.customs.com"
putitem/id vItems, "LOCATION", "custom.xsd"
putitem vSchemaList, -1, vItems

xmlToStruct vStruct, "file.xml", vSchemaList
```

## Data Types

If /schema is not specified,
the Uniface data type of every element and attribute is `string`.

If the /schema switch is
specified, elements and attributes with predefined data types are included in the Struct as scalar
Structs of matching Uniface data types. The values themselves are converted to Uniface format.

**Note:**  Supplying a schema list in the third parameter
does not imply that schema information is to be included; the parameter may be supplied just to
satisfy `/validate`, not because you want the schema information.

XML - Uniface Data Type Mapping

| Uniface | XML Data Types | Remarks |
| --- | --- | --- |
| `string` | string, normalized string, token, language, name, NCName, token, NMTOKENS, ID, IDREF, IDREFS, ENTITY, ENTITIES |  |
| duration, gYearMonth, gYear, gMonthDay, gDay, gMonth | There is no equivalent in Uniface for these XML data types |
| `date`, `time`, `datetime` | date, time, dateTime | If the value has the Z or [+|-]hh:mm timezone suffix, that timezone and the local machine timezone are used to calculate the corresponding time in the local timezone |
| `numeric` | decimal, integer, long, int, short, byte,  nonPositiveInteger, negativeInteger  nonNegativeInteger, positiveInteger, unsignedLong, unsignedInt, unsignedShort, unsignedByte |  |
| `boolean` | boolean | The value is `T` or `F` |
| `float` | float, double | If the special values `INF`, `-INF` or `NaN` are encountered, it is a string with that value |
| `raw` | base64Binary, hexBinary | Value is the result of the base64-to-raw and hex-to-raw conversion performed by xmlToStruct |
|  | NULL | An element can be declared with the attribute `nillable="true"` in a schema. In an XML document that has the value of an element set to NULL, this is done by adding the attribute `xs:nil="true"` to the element. The resulting Struct contains a member named `nil` with`xmlClass="attribute"` for each element whose value is NULL. The value of the struct member itself will be an empty string. |

## $procReturnContext for xmlToStruct

$procReturnContext contains
context and error information about the conversion in the form of a nested Uniface list.

```procscript
Context=xmlToStruct ;}
{Infos=Number ;
{Warnings=Number ;} 
{Errors=Number ;}
{DETAILS=ID=MsgNum !!;SEVERITY=Type !!;MNEM=Mnemonic !!;DESCRIPTION=ErrorDescription !!;CURRENTSTRUCT=Struct !!;ADDITIONAL=TAGNAME=Name !!!;TAGVALUE=Value !!!;EXPECTED=ExpectedValue}  { !;ID= ...}
```

Items Returned by $ProcReturnContext for
xmlToStruct

| Item | Description |
| --- | --- |
| `Context` | Value indicating the previously executed command that set $procReturnContext, in this case, `xmlToStruct` |
| `Infos` `Warnings`  `Errors` | Number of messages, warnings, and non-fatal errors generated during processing |
| `DETAILS` | Details about any messages, warnings, and non-fatal errors encountered during processing, structured as a Uniface sublist |
| `ID` | Message number |
| `MESSAGE` | Message text |
| `SEVERITY` | Importance of the issue; one of `INFO`, `WARNING`, or `ERROR` |
| `MNEM` | Mnemonic for the specified (numeric) ID:  `USTRUCTERR_TAGVALUE_NOT_APPLICABLE`—Annotation xmlClass has an unknown or illegal value (based on the current context) |
| `DESCRIPTION` | Short description of the issue. |
| `CURRENTSTRUCT` | List of all preceding parents, starting from the top. Each parent is described by its name (which can be empty) and index number. The top-level parent has no index number. |
| `ADDITIONAL` | Uniface sublist of additional information about the Struct (member) causing the message. This information is provided if there is more detailed information to report, such as unexpected tags or tag values. |
| `TAGNAME` | Name of the annotation tag. |
| `TAGVALUE` | Value of the tag specified by `TAGNAME`. |
| `EXPECTED` | Expected object for the context `Struct valid on XML document level`  `Struct valid on XML element level`  `DTD declaration`  `DTD attribute declaration` |

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |
| 9.6.01 | Added /schema qualifier |

## Related Topics

- [$tags](../procstructfunctions/_tags.md)
- [structToXml](structtoxml.md)
- [Transforming Complex Data Using Structs](../../structs/transformingwithstructs/handlingcomplexdynamicdata.md)
- [Structs for XML Data](../../structs/transformingwithstructs/structsforxml.md)
- [Struct Annotations for XML](../../structs/transformingwithstructs/xmlannotations.md)


---

# xmlvalidate

Validate an XML stream.

xmlvalidate{/file}  XMLStream {, ValidationData}

## Switches

/file—instructs
xmlvalidate to treat ValidationData as a system path to a DTD
file.

## Parameters

* XMLStream—field, variable,
  or parameter containing the XML stream.
* ValidationData—field,
  variable, or parameter containing the validation rules to be applied to
  XMLStream; can refer to a Repository object, to a file, or can contain the
  validation rules itself.

## Return Values

Values commonly returned by $procerror following xmlvalidate

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1 | <UGENERR\_ERROR> | An error occurred |
| -1406 | <UPROCERR\_MEMORY> | Memory allocation failure |
| -1504 | <UXMLERR\_VALIDATE> | An error occurred during validation of an XML stream |

Additional information is provided in
$procerrorcontext, such as error messages from the XML parser.

## Use

Allowed in all Uniface component types.

## Description

xmlvalidate validates an XML
stream.

Validation objects (files, variables and so on)
must follow the W3C Recommendations for DTDs. Furthermore, DTD objects should
not contain the following items:

* XML declaration (for example, `<?xml
  version="1.0"?>`)
* Enclosing DOCTYPE declaration (in fact, DTDs
  that include a DOCTYPE declaration do not conform to the XML 1.0 Recommendation.)

If ValidationData is omitted,
Uniface reads the DTD declarations embedded in the XMLStream. If no declarations
are embedded in XMLStream, the parser reports a validation error.

If XMLStream contains embedded
element and attribute declarations and you also specify ValidationData, the XML
parser receives multiple declarations for items in the stream. The XML parser reports a validation
error in this situation.

xmlvalidate applies the
following rules to distinguish ValidationData:

* If the argument /file is
  used, ValidationData is treated as a system path .
* If ValidationData uses DTD
  syntax, xmlvalidate treats ValidationData as a DTD.
* Otherwise, ValidationData
  is treated as the name of a DTD stored in the Repository.

When ValidationData specifies
a DTD stored in the Repository, use the following format:

{DTD:}Name.Model

* DTD:—specifies that the XML
  stream is defined using a DTD (this is to ensure compatibility with future developments in the XML
  standard).

  Name—name of the DTD as
  specified in the application model.

  Model—name of the DTD's
  application model.

## Validate an XML stream

You can use the Proc statement
`xmlvalidate` to validate an XML stream, even if the DTD for the XML
stream is not in your Repository.

The following operation
`XVALIDATE` validates an XML stream using
`xmlvalidate`:

```procscript
operation XVALIDATE
params
numeric I_STATUS : OUT
   string I_STATUSCONTEXT : OUT
   string I_DTD : IN
   string I_XML : IN
endparams

; I_DTD is a file path; use the argument /file
; to indicate this to xmlvalidate.
xmlvalidate/file I_XML, I_DTD
I_STATUS = $procerror
I_STATUSCONTEXT = $procerrorcontext
end ; operation XVALIDATE
```

## Related Topics

- [XML Streams](../../../integration/xml/concepts/xml_streams1.md)

