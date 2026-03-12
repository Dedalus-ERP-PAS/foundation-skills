---
title: "ProcScript Functions"
category: "Uniface 9.7 ProcScript Reference"
entries: 248
---

# $about

Returns information about the current Uniface installation, version, and
platform.

$about

## Return Values

Information Returned by $about

| Property | Description | Example |
| --- | --- | --- |
| `tag` | Not used | N/A |
| `update` | Not used | N/A |
| `track` | Full Uniface version number, including the build identifier | `9.2.01.01` |
| `date` | Build date | `October 04, 2007` |
| `config` | Build configuration identifier | `1004_1` |
| `platform` | Platform compatibility code, such as W10, LU7, or AS4. For details, see the [Platform Availability Matrix](https://www.uniface.info/display/TI/Uniface+product+availability+information "www.uniface.info/display/TI/Uniface+product+availability+information"). | `W10` |
| `version` | Uniface version number | `9.2.01` |

## Use

All components.

## Description

The $about function returns an
associative list of properties and their values, which describe the current Uniface installation.
You can include this information in an About dialog, commonly available from the Help menu of most
applications.

## $about

The following code displays an information dialog
with the Uniface version, build, and date.

```procscript
;Detail trigger
variables
  string vVersion
  string vBuild
  string vBuildDate
endvariables

getitem/id vVersion $about "version"
getitem/id vBuild $about "config"
getitem/id vBuildDate $about "date"

askmess/info "Uniface version: %%vVersion%%% (%%vBuild%%%) %%^Date: %%vBuildDate%%%", "OK"
```

Information Returned by $about

---

# $abs

Return the absolute value of X (|X|).

$abs`(`X`)`

## Parameters

X—numeric constant, or a field
(or indirect reference to a field), variable, function, or expression that evaluates to a numeric
value.

## Return Values

Absolute value of X.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

## Use

Allowed in all Uniface component types.

The following example returns the absolute value
of the given expression:

```procscript
$ABSOF$ = $abs(ANUMBER - 100)
```

If the value of ANUMBER is 25, the value stored
in $ABSOF$ is 75.

---

# $acos

Return the arc cosine of X.

$acos`(`X`)`

## Parameters

X—numeric constant, or a field
(or indirect reference to a field), variable, function, or expression that evaluates to a numeric
value. X must be in the range -1 through 1, inclusive.

## Return Values

Calculated arc cosine value.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $acos

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1203 | <UPROCERR\_RANGE> | Value out of range. |

## Use

Allowed in all Uniface component types.

## Description

The $acos function calculates
the arc cosine of X, that is, it returns that angle, in radians, whose cosine
(see $cos) is X.

The following example returns the arc cosine of
the given expression:

```procscript
$ARCOSIN$ = $acos(1 / 2)
```

## Related Topics

- [$cos](cos.md)


---

# $applname

Return the name of the startup shell.

$applname

## Return Values

* String that contains the name of the current
  startup shell (in uppercase).
* Name of its application server, if component
  is remote (that is, a service, session service, entity service or report running on a server) .

## Use

Allowed in form components (and in service,
session service, entity service and report components that are not self-contained).

## Description

The name is returned with uppercase letters, so
this name is not necessarily the same as the application name seen by the operating system. For
example, applications built on a Unix platform are created in lowercase, but
$applname returns the Uniface application name, which is in uppercase.

One use for $applname could be
to restrict the use of a global Proc to certain (named) applications; a test on the value of
$applname at the start of the Proc module could prevent use of the module by
returning immediately. If you distribute only the object code for your global Proc (in UAR files
containing \prc\\*.prc , for example) and not the source, you can use this
technique to prevent unauthorized use of the global Proc.

## Using $applname

The following example outputs an initial message
and a final message when the Application Shell BOOK is activated:

```procscript
; trigger: apStart
putmess "Started application %%$applname at %%$clock"
activate "MAIN_MENU".EXEC()
putmess "Terminated application %%$applname at %%$clock"
```

## Related Topics

- [$entname](_entname.md)
- [$fieldname](_fieldname.md)
- [$instancename](_instancename.md)


---

# $applproperties

Set the representation properties of the startup shell.

$applproperties`(``)``=`Properties

## Arguments

* Properties—associative list
  of properties and their values

Properties set by $applproperties

| Property | Physical Property Name | Description |
| --- | --- | --- |
| [Background Color](../../../development/reference/devobjproperties/widgets/_common/backcolor_backgroundcolor.md) | BackColor | Background color of the window. |
| [Background Image](../../../development/reference/devobjproperties/_common/backimage.md) | BackImage | Background image of the window. |
| [Horizontal Alignment](../../../development/reference/devobjproperties/widgets/_common/halign_horizontalalignment.md) | HAlign | Horizontal alignment of the background image |
| [Horizontal Scaling](../../../development/reference/devobjproperties/widgets/_common/hscale_horizontalscaling.md) | HScale | Horizontal scaling of the background image |
| [Vertical Alignment](../../../development/reference/devobjproperties/widgets/_common/valign_verticalalignment.md) | VAlign | Vertical alignment of background image |
| [Vertical Scaling](../../../development/reference/devobjproperties/widgets/_common/vscale_verticalscaling.md) | VScale | Vertical scaling of background image |
| [Preserve Aspect Ratio](../../../development/reference/devobjproperties/widgets/_common/preserveaspect_preserveaspectratio.md) | PreserveAspect | Specify whether to preserve the aspect ratio of the background image at all times. |
| [MessageLine](../../../development/reference/devobjproperties/startupshell/messageline.md) | MessageLine | Show or hide the message line at the bottom of the application window |

## Return Values

Values of $procerror Commonly Returned Following $applproperties

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1110 | UPROCERR\_TOPIC | Topic name not known. Invalid property specified. |

## Use

Allowed in startup shells.

## Description

Setting properties using
$applproperties overrides the values set in the initialization file with the
Shell definition, or values set in the startup shell definition in the
Development Environment. For more information, see [Shell](../../../configuration/reference/inisettings/shell.md).

## Using $applproperties

```procscript
$applproperties() = "backimage=^LOGO"
```

```procscript
$applproperties() = "backimage=@logo.jpg;"
```

## Related Topics

- [$applname](_applname.md)
- [$appltitle](_appltitle.md)


---

# $appltitle

Return or set the window title bar text of an application.

$appltitle

$appltitle`=`ApplTitle

## Parameters

ApplTitle—new title for the application window; can be a
string, or a field (or indirect reference to a field), a variable, or a
function that evaluates to a string.

## Return Values

Title of the application window.

## Use

Allowed in application startup shells and in form components
(and in service and report components that are not self-contained).

## Description

The
$appltitle function has effect only when the application
is using a GUI driver. Changing
$appltitle overrides the value defined in the GUI-specific
settings.

---

# $asin

Return the arc sine of X.

$asin`(`X`)`

## Parameters

X—numeric constant, or a field
(or indirect reference to a field), variable, function, or expression that evaluates to a numeric
value. X must be in the range -1 through 1, inclusive.

## Return Values

Calculated arc sine value.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $asin

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1203 | <UPROCERR\_RANGE> | Value out of range. |

## Use

Allowed in all Uniface component types.

## Description

The function $asin calculates
the arc sine of X, that is, it returns that angle, in radians, whose sine
($sin) is X.

The following example returns the arc sine of the
given expression:

```procscript
$ARCSIN$ = $asin(1 / 2)
```

## Related Topics

- [$sin](sin.md)


---

# $atan

Return the arc tangent of X.

$atan`(`X`)`

## Parameters

X—numeric constant, or a field
(or indirect reference to a field), variable, function, or expression that evaluates to a numeric
value.

## Return Values

Calculated arc tangent value.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

## Use

Allowed in all Uniface component types.

## Description

The $atan function calculates
the arc tangent of X, that is, it returns that angle, in radians, whose tangent
($tan) is X.

The following example returns the arc tangent of
the given expression:

```procscript
$ARCTAN$ = $atan(1 / 2)
```

## Related Topics

- [$tan](tan.md)


---

# $batch

Return or set the batch mode indicator.

$batch

$batch`=`Expression

set | reset  $batch

## Parameters

Expression—Proc expression.

## Return Values

| Value | Meaning |
| --- | --- |
| 1 | Uniface is running in batch mode, or the Uniface Server is executing the component. |
| 0 | The application is interactive. |
| <0 | An error occurred. $procerror contains the exact error. |

## Use

Allowed in form components (and in service,
session service, entity service, and report components that are not self-contained).

## Description

$batch is set to
`1` by Uniface when it is started with the /bat command
(`uniface.exe /bat`), and by the Uniface Server (`userver.exe`).
Thus, remote services and dynamic and static server pages are always executed in batch mode. (If
you want to check whether a service is running in a web application, use
$web.)

Anything which requires keyboard input or screen
output (an askmess or edit statement, for example) cannot be
used in batch mode. Attempting to do this may crash the application.

It can therefore be useful to test whether
Uniface is operating in batch mode. For example, if a form is designed for both reports (batch mode
printing) and interactive use, you need to be able to test whether Uniface is printing in batch
mode before using certain Proc code. In these situations, you can use the following construction to
execute the statements that are for interactive use only:

```procscript
if (!$batch) ;running interactively
...
endif
```

**Note:**   The putmess statement in
batch mode writes the message directly to the terminal or batch log file, depending on your
operating system settings.

## Changing the Value of $batch

You can also use $batch as the
target in the left-hand side of an assignment, for example:

```procscript
$batch=!$batch
```

Since $batch is essentially a
Boolean function, when Expression evaluates to a nonzero value,
$batch becomes 1.

## 3GL and $batch

The Uniface 3GL function
UNIFBEG sets the value of $batch. When
UNIFBEG starts an interactive session, $batch is set to 0;
when UNIFBEG starts a batch session, $batch is set to 1.
For more information, see [unifbeg](../../../integration/3gl/reference/unifbeg.md)..

## $batch

The Proc code in the following example first
checks whether the application is running in batch mode. If it is, a message is written to the
message frame to record the number of pages just printed. If the application is not running in
batch mode, the user is asked if they want to leave the application or return to the main menu.

```procscript
if ($batch = 1)
   putmess "%%$page pages sent to printer at %%$clock"
   exit(0)
else
   askmess "Return to Main menu or Quit? (M/Q)","M,Q"
   if ($status = 1)
      exit "mainmenu"
   else
      apexit
   endif
endif
```

## Related Topics

- [reset](../procstatements/reset.md)
- [set](../procstatements/set.md)
- [$web](_web.md)
- [/bat](../../../_reference/commandlineswitches/bat.md)


---

# $bold

Return the result of applying the bold character attribute to a string.

$bold`(`String`)`

## Arguments

String—A string, or a field (or
indirect reference to a field), a variable, or a function that evaluates to a string.

## Return Values

The function $bold returns the
result of applying the bold character attribute to String

## Use

Allowed in all component types, but only
applicable to unifields.

## Description

The function $bold returns the
result of applying the bold character attribute to String. The result is visible
only in a displayed unifield.

## $bold

The following example changes the label of a field
to bold when the field gets focus and removes it when it loses focus:

```procscript
trigger loseFocus
  putItem/id $labelProperties($fieldname), "text", $stripAttributes($valuePart($labelProperties($fieldname)))
end

trigger getFocus
  putItem/id $labelProperties($fieldname), "text", $bold($valuePart($labelProperties($fieldname)))
end
```

## Related Topics

- [$stripattributes](_stripattributes.md)


---

# $callup

For the current trigger, call the same trigger one level up in the call-up hierarchy.
If the trigger is not defined one level up, then the next available level up is called (if
applicable).

$callup

Example: `return $callup`

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| NumericValue | The return value from the trigger that was executed one level up. |

## Use

This function is only allowed in triggers that
can call up to the same trigger on the parent object, at a higher level:

Detail trigger of Field

Help trigger of Field

Menu trigger of Field, Entity, or Component

Asynchronous Interrupt trigger of Component

Pulldown trigger of Component

It is not allowed at the most generic level of
these triggers, thus not in:

Detail trigger of Entity

Help trigger of Entity

Menu trigger of Application Shell

Asynchronous Interrupt trigger of Application Shell

Pulldown trigger of Application Shell

## Description

Use the $callup function to
call the same trigger one level up in the call-up hierarchy, or the next available level up, if
applicable.

Call-up Hierarchy

Upon return from a $callup
call, the value of $status is whatever it was at the moment the called-up
trigger returned.

## Using $callup

The following example shows how the
$callup function can be used to call the entity-level Detail trigger from a
field-level Detail trigger:

```procscript
; Detail trigger of field FLD.ENT.MDL
  variables
    string vStatus
  endvariables
  putmess "This is the field-level detail trigger"
  vStatus = $callup
  putmess "vStatus is %%(vStatus), $status = %%($status)"
end

;----------------------------------------------------
; Detail trigger of entity ENT.MDL
  putmess "This is the entity-level detail trigger"
  $status = 321
  return 123
end
```

When the Detail trigger of FLD.ENT is activated,
the message frame will contain this output:

```procscript
This is the field-level detail trigger
This is the entity-level detail trigger
vStatus is 123, $status = 321
```

| Version | Change |
| --- | --- |
| ```procscript 9.7.03 G302 10.2.01 F102 ``` | Introduced |

---

# $cellinfo

Get an associative list with the dimensions of a character cell in pixels.

$cellinfo

## Return Values

Returns an associative list with the width
(`xsize`) and height (`ysize`) in pixels of a character cell as
displayed on the screen. The dimensions are determined by the `font0` setting in
[SCREEN] section of usys.ini.

`xsize=`Pixels`;``ysize=`Pixels

An empty string is returned when the function is
used in batch mode or in a non-interactive Windows environment.

## Use

Use only in form components.

## Description

$cellinfo returns the
dimensions of single cell as determined by the following settings in
usys.ini:

* `font0` in the
  `[screen]` section
* `CELLHEIGHT` and
  `LINESPACE` in the `[upi]` section. `CELLHEIGHT`
  specifies the cell height (as a percentage of the cell height of Font 0) used to draw widgets.
  `LINESPACE` specifies additional spacing between text lines in the background.

These dimensions can be used as input for
$windowproperties to adjust the size of the window.

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [CellHeight](../../../configuration/reference/inisettings/cellheight.md)
- [LineSpace](../../../configuration/reference/inisettings/linespace.md)
- [[printer]](../../../configuration/reference/inisettings/ini_filesections/_printer_.md)


---

# $char

In a unifield, return the Uniface character code for the key that
activated a trigger.

$char

## Return Values

* Code for the character or function chosen by the user which
  activated a trigger.
* In the User Key trigger,
  $char contains the ^USER\_KEY identifier character code.

## Use

Allowed in form components (and in service, session service,
entity service, and report components that are not self-contained).

## Description

In a unifield, the function
$char returns the last Uniface character or function (in
decimal format) which activated a trigger. It is most commonly used with the
Start Modification and User Key triggers, but can be used with all
triggers.

**Note:**   The function
$char is available only in unifields. Its value in another
widget cannot be predicted.

In the following
example, Proc code in the Start Modification trigger checks $char to see if the user
entered the letter 'Y' into the field. If that was
the modification, the Proc module ends and the user can continue.
If the user entered any other letter, the code sets $status to -1, causing the
modification to be discarded.

```procscript
; trigger: Start Modification
if (($char = 89) | ($char = 121))
return
else
message "This field may only be set to ’Y’!"
return (-1)
endif
```

The kind of value checking shown in the previous
example can also be achieved by using a declarative entry format
for the field, for example, `ENT(y)`
. However, entry formats are only checked when the user leaves the
field. The Start Modification trigger is activated the moment the
user enters data. Proc code in this trigger can only check the first
character the user has entered, so it cannot be used to enforce
an entry format of `ENT((yes)(no))`.

The following example puts the structure editor
into Zoom mode and inserts a salutation when the user enters a capital
D (`$char="D"` ):

```procscript
; trigger: Start Modification
if ($char = 68) ; "D"
if (GENDER = "M")
$1 = "Mr."
else
$1 = "Ms."
endif
macro "^127^096ear %%$1 %%SURNAME, ^CURSOR_RIGHT"
endif
```

## Related Topics

- [macro](../procstatements/macro.md)
- [User Key (Application)](../triggersstandard/userkey.md)
- [User Key (Component)](../triggersstandard/userkey2.md)


---

# $check

Return or set the checked status of a menu item.

$check

$check`=`Expression

set | reset  $check

## Return Values

| Value | Meaning |
| --- | --- |
| 1 | Menu item is checked |
| 0 | Menu item is not checked |

In an error occurs, $procerror
contains the exact error.

## Use

Allowed only in the Predisplay trigger of a menu
item

## Description

The $check function determines
whether a check mark appears next to the current menu item. The value of $check
does not affect the menu accelerator for that menu item.

Since $check is a Boolean
function, when Expression evaluates to a non-zero value,
$check becomes 1.

## Related Topics

- [reset](../procstatements/reset.md)
- [set](../procstatements/set.md)
- [$disable](_disable.md)
- [$hide](_hide.md)
- [Predisplay](../triggersstandard/predisplay.md)


---

# $clearselection

Built-in entity operation that clears the $selected attribute of
all occurrences of the entity.

$collhandle { `(`Entity`)` } ->$clearselection()

## Description

When an occurrence is selected, its built-in
$selected attribute is set to 1 and the occurrence is added to the collection of
selected occurrences. This attribute can be addressed using an occurrence handle. For more information, see [$occhandle](_occhandle.md) and [$selected](_selected.md).

You can use
$collhandle->$clearselection to set the
$selected attribute to 0 on all occurrences in the selected set..

| Version | Change |
| --- | --- |
| 9.7.01 | Introduced |

## Related Topics

- [$clearselection](_clearselection.md)
- [Occurrences](../../../howunifaceworks/processing/occurrences.md)


---

# $clock

Return the system time or convert the argument to the Time data type.

$clock { `(`Source`)` }

## Parameters

Source—string, a field, or a
variable. If the value of Source is numeric, it is first converted to a string.

## Return Values

* When used without Source,
  $clock returns a string containing the system clock time as
  00000000hhnnsstt that is accurate to one hundredth of a second (1 tick).

  If a service or report component is running in
  a remote environment, $clock returns the system time of the server (not of the
  client).
* When used with Source,
  $clock usually returns the value as a time data type value (which does not
  include ticks). However, if Source is a string with the format
  `"00000000hhnnsstt"`, it does return a time value that includes ticks. For example,
  `“0000000012345678”` returns `“12:34:56.78”`.
* If Source contains
  characters that are not valid or if any of the parts of the time (hours, minutes, or seconds) are
  not in the appropriate range, $clock returns an empty string (""). (For example,
  both `$clock("A")` and `$clock("240000")` return an empty string.)

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values Commonly Returned by $procerror After $datim

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-1005` | `UPROCERR_TIME` | Not a valid Time value. |

## Use

Allowed in form, service, session service, entity
service, and report components.

## Description

You can use $clock to assign
the current system time to fields in header or trailer frames (using data type Time, for example)
or to put a timestamp on occurrences (using data type String, for example).

Used with Source,
$clock converts Source to a value with data type Time. The
way the data is interpreted and formatted depends on the locale, as determined by the values of
$nlslocale and $nlsformat. For more details, see
[$date](_date.md).

## Using $clock with Source

$clock can be used with the
Source argument when you are loading ASCII text files into a database and you
have to convert time data stored as text into a field stored as Time.

When using $clock with
Source:

* If Source is formatted
  with one or two colons (`:`) used as separators (for example,
  hh`:`nn or
  hh`:`nn`:`ss),
  $clock converts Source to a time without considering the
  length of *Source*.

  If *Source* only contains one
  separator, it is interpreted as hh`:`nn.
* If Source is a free-format
  number, with no colon separators included, $clock uses the number of digits in
  Source to determine the way Source is converted into a Time.

Converting strings to time with $clock

| Number of digits | Interpreted as |
| --- | --- |
| 1 | *h* |
| 2 | *hh* |
| 3 | *h* `:`*nn* |
| 4 | *hh* `:`*nn* |
| 5 | *h* `:`*nn* `:` *ss* |
| 6 | *hh* `:`*nn* `:` *ss* |
| >6 | NULL |

The following table shows the different values
returned by $clock, $number, and
$clock($number), depending on the length of the  *Source*  operand:

Examples of values returned by $clock, $number, and $clock($number)

| $1 | $clock($1) | $number($1) | $clock($number($1)) |
| --- | --- | --- | --- |
| "00:2:" | 00:02:00 | 0 | 00:00:00 |
| "2" | 02:00:00 | 2 | 02:00:00 |
| "02" | 02:00:00 | 2 | 02:00:00 |
| 002" | 00:02:00 | 2 | 02:00:00 |
| "0002" | 00:02:00 | 2 | 02:00:00 |
| "00002" | 00:00:02 | 2 | 02:00:00 |
| "102" | 01:02:00 | 102 | 01:02:00 |
| "1002" | 10:02:00 | 1002 | 10:02:00 |
| "10002" | 01:00:02 | 10002 | 01:00:02 |
| "111002" | 11:10:02 | 111002 | 11:10:02 |
| "999002" | NULL | 999002 | NULL |
| "240000" | NULL | 240000 | NULL |
| "2400" | NULL | 2400 | NULL |
| "235959" | 23:59:59 | 235959 | 23:59:59 |
| "1" | 01:00:00 | 1 | 01:00:00 |
| "02" | 02:00:00 | 2 | 02:00:00 |
| "003" | 00:03:00 | 3 | 03:00:00 |
| "0004" | 00:04:00 | 4 | 04:00:00 |
| "00005" | 00:00:05 | 5 | 05:00:00 |
| "000006" | 00:00:06 | 6 | 06:00:00 |

## Using $clock to Convert Text Data

When loading free-format time data from an ASCII
text file, use a global or component variable defined as data type String. Define the layout for
the variable as either DIS(999999) for hhnnss data, or DIS(9999) for
hhnn data, then copy the data into this variable. Use $clock
on the variable to convert the numeric string to a Time.

When loading text data, you should ensure that
the date is correctly converted. Ensuring correct conversion depends on the way the source text is
stored. If the data is completely raw (that is, it contains no separators, and has leading spaces,
such as `" 412"`), declare a Numeric global or component variable with DIS(999999),
and copy the data into it. This ensures the correct number of digits for hhnnss,
since leading blanks are converted to leading zeros.

If, however, the data is partially formatted
(such as ‘2:3:12’), you must declare a String global or component variable, because a Numeric
variable only accepts digits before the first colon (:) (the first ‘2’ in ‘2:3:12’). A layout is
not required for this type of variable. Copy the data into the variable, then use
$clock to convert the data in the variable into a time.

The following example assigns the current system
time to the field REPORTTIME.HEADER:

```procscript
REPORTTIME.HEADER = $clock
```

## Converting Raw or Formatted Data into Time Data

The following example shows a global Proc that
converts raw or formatted data into actual time data. This Proc converts a free format text field
into a time field. It uses a numeric or string global variable, depending on whether the data is
formatted or not.

```procscript
; Uses: 
; $1 - source 
; $2 - result, as a time 
; $$STRING_TIME - global variable, string 
; $$NUMBER_TIME - global variable, number, dis(999999)  

scan $1,’:’ ;is $1 formatted ? 

if ($result > 0) ; $1 contains a ’:’ 
  $$STRING_TIME = $1 ;keep format 
  $2 = $clock($$STRING_TIME) ;convert to time using formatted data 
else ;$1 does not contain a ’:’ 
  $$NUMBER_TIME = $1 ;$1 is raw text data, so force leading zeros 
  $2 = $clock($$NUMBER_TIME) ;convert six digit number to time endif
```

History

| Version | Change |
| --- | --- |
| 9.2.01 | When Source is omitted, accurate to one hundredth of a second (1 tick) instead of to the second, . |
| 9.4.01 | Additional option for overriding the default behavior if the time zone has been defined (using $nlstimezone or $NLS\_TIME\_ZONE) |

## Related Topics

- [$date](_date.md)
- [$datim](_datim.md)


---

# $collhandle

Return the handle of the specified entity.

$collhandle({Entity}`)`

## Parameters

* *Entity* —entity name; can be a
  literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
  the current entity is used.

## Return Values

* Handle of the specified entity.
* NULL handle if an error occurs, or in the
  following circumstances:

  + Entity is an incorrect
    entity.
  + No occurrence for the given entity with
    the name Entity.
  + No public operations defined for the
    entity. If there are no public operations, no signature can be created for it. Without a signature,
    no handle can be returned; instead a NULL value is returned.

  If an error occurs,
  $procerror contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $collhandle

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | UPROCERR\_ENTITY | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Related Topics

- [$occhandle](_occhandle.md)
- [$instancehandle](_instancehandle.md)
- [Handles](../../handles/handles2.md)
- [Collection Operations](../triggersstandard/collection_operations.md)


---

# $columnsyntax

Set or return the syntax attributes for the field displayed in a column of a grid or
multi-occurrence list.

$columnsyntax `(`Field`) =` AttributeList

Result`=`$columnsyntax `(`Field`)`

## Parameters

* Field—literal field name,
  or a string, variable, function, or parameter that evaluates to a string containing the field
  name
* AttributeList—list of field
  syntax attributes; can be a string, field (or indirect reference to a field), variable, or function
  that evaluates to a Uniface list or an empty string. Although commas can be used when setting
  attributes, the retrieved list always uses GOLD ; as the separator.

Allowed Field Syntax Attributes

| Code | Description |
| --- | --- |
| `NED` | Do not allow this field to be edited. |
| `NPR` | Do not prompt this field. |
| `HID` | Hide field. No display, no edit and no prompt. (Equivalent to `NDI`, `NED`, and `NPR`.)  Not valid in character mode (`$GUI` =`$CHR` ). |
| `DIM` | Do not allow editing or prompt this field. In GUI mode, the field is dimmed; in character mode, it is equivalent to `NED` and `NPR`. |
| `YDI` | Display this field. |
| `YED` | Allow this field to be edited. |
| `YPR` | Prompt this field. |

## Use

Allowed in form and report components

## Description

Use the $columnsyntax function
to retrieve or set the syntax attributes of a collection of fields in the same column. For example,
you can use this function to hide and show columns in a grid or multiple occurrence list.

The column syntax can only be reset by an
explicit call with an empty string. The structure editor functions ^CLEAR and ^RETRIEVE have no
influence on the column syntax.

## Combining $columnsyntax and $fieldsyntax

The field syntax that is applied to a field is the
result of the field syntax attributes set in the model, with $columnsyntax
(affecting the field in multiple occurrences), and with $fieldsyntax (affecting
the field in a specific occurrence).

The $fieldsyntax and
$columnsyntax functions operate independently. Thus, if a field is set to No
Prompt (`NPR`) with $fieldsyntax, it cannot be reset using
`$columnsyntax()=""`. Similarly, If a field is hidden, it cannot
be made visible by making the column visible.

For example:

1. Hide the column for field FLD\_B:
   `$columnsyntax(FLD_B)="HID"`
2. Hide field FLD\_B in the current occurrence:
   `$fieldsyntax(FLD_B)="HID"`

   Because the column has already been hidden, no
   change is visible.
3. Show the column again:
   `$columnsyntax(FLD_B)=""`

   The column is displayed, but the FLD\_B hidden
   by $fieldsyntax remains hidden.

Effect of Modeled Field Syntax Combined With $columnsyntax and $fieldsyntax

| Application Model | $columnsyntax | $fieldsyntax | Result |
| --- | --- | --- | --- |
| `NED`,`NPR`,`NDI` | `YED`,`YPR`,`YDI` |  | All fields in the column can be edited, get focus, and display the content. |
| `NED`,`NPR`,`NDI` | `YED`,`YPR`,`YDI` | `NED` | All fields in the column can be edited, get focus, and display the characters, with the exception of the field in the current occurrence which is non-editable. |
|  | `NED`,`NPR`,`NDI` | `YED`,`YPR`,`YDI` | All fields in the column are hidden and only one field is displayed in the default entity.  In the grid, the column is hidden but the field in the default entity can still be edited and get focus. |

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [$fieldsyntax](_fieldsyntax.md)


---

# $componentinfo

Return information about a component instance.

$componentinfo`(`InstanceName`,` TopicName`)`

## Parameters

* InstanceName—name of the
  component instance; can be string, or a variable, function, or parameter, or indirect reference to
  a field, that evaluates to a string.
* TopicName—keyword expressed
  as a string, or a field (or indirect reference to a field), a variable, or a function that
  evaluates to a string. The topic name is not case-sensitive; you can use uppercase or lowercase
  letters, or any combination of these, to increase readability. Valid names are:

  + `"VARIABLES"`—list
    component variables for the specified component instance
  + `"OUTERENTITIES"`—list the
    names of outer entities of the specified component instance

## Return Values

Returns a list as specified by the
TopicName.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $componentinfo

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1105 | UPROCERR\_INSTANCE | The instance name provided is not valid. |
| -1110 | UPROCERR\_TOPIC | Topic name not known. |

## Use

Allowed in all Uniface component types.

## Description

The following examples show how you can specify
the instance name:

* Null string:
  `$componentinfo("","VARIABLES")`, in which case the name of the current instance is
  used.
* String that contains the name of an instance
  in the component pool:

  `$componentinfo("MYINSTANCE","VARIABLES")`
* Variable , where $1 contains
  `"MYINSTANCE"`:

  `$componentinfo($1,"VARIABLES")`.
* Function, where `$instancename`
  is `"MYINSTANCE"`: `$componentinfo($instancename,"VARIABLES")`.
* Parameter, where `PARAM1`
  contains `"MYINSTANCE"`:

  `$componentinfo(PARAM1,"VARIABLES")`
* Indirect reference to a field, where the
  target field evaluates to a string that contains the name of a component instance:

  `$componentinfo(@$1,"VARIABLES")`, where $1
  contains `"FLD1"` and FLD1 contains `"MYINSTANCE"`

History

| Version | Change |
| --- | --- |
| 9.4.01 | Added `"OUTERENTITIES"` topic |

## Related Topics

- [Component Instances](../../handles/component_instance.md)
- [Related Component Entities](../../../componentconstruction/datastructure/childcomponententities.md)


---

# $componentname

Return the name of the component from which the specified instance was created.

$componentname { `(`InstanceName`)` }

## Parameters

InstanceName—name of the component
instance; can be a string, or a variable, function, parameter or indirect refererence to a field
containing the name. If omitted, the current instance is used.

## Return Values

Name of the component from which the specified
instance was created, in uppercase. An empty string ("") is returned if an error occurred.

Values of $procerror Commonly Returned Following $componentname

| Value | Error constant | Meaning |
| --- | --- | --- |
| -57 | UACTERR\_NO\_INSTANCE | The named instance cannot be found in the component pool. |
| -1101 | UPROCERR\_FIELD | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| -1105 | UPROCERR\_INSTANCE | The instance name provided is not valid (See newinstance for more information.) For example, the argument contains incorrect characters. |
| -1304 | UPROCERR\_UNKNOWN\_CONTEXT> | Function not allowed, unknown context. The InstanceName argument was omitted and no instance is current, for example, in the Application Execute trigger. |

## Use

Allowed in all Uniface component types.

## Tracing Application Execution

You can use the value in
$instancename and $componentname to help trace an
application's execution. For example:

```procscript
trigger _EXEC

putmess "Started instance %%$instancename of %%$componentname at %%$clock"
edit
putmess "Terminated instance %%$instancename at of %%$componentname %%$clock"
end ; end trigger
```

## Related Topics

- [newinstance](../procstatements/newinstance.md)
- [activate](../procstatements/activate.md)
- [$instancename](_instancename.md)


---

# $componenttype

Return the type of the specified component instance.

$componenttype { `(`InstanceName`)` }

## Parameters

InstanceName—name of the component
instance; can be a string, or variable, function, parameter, or indirect reference to a field that
evaluates to a string. If omitted, the current instance is used. If no instance is current, for
example, in the Application Execute trigger, the returned type indicates that the instance is the
application's startup shell.

## Return Values

Values returned by $componenttype

| Value | Meaning |
| --- | --- |
| `A` | The InstanceName argument was omitted and no instance is current, for example, in the Application Execute trigger. |
| `F` | InstanceName was created from a form component. |
| `R` | InstanceName was created from a report component. |
| `D` | InstanceName was created from a dynamic server page component |
| `P` | InstanceName was created from a static server page component |
| `S` | InstanceName was created from a service component. |
| `E` | *InstanceName* was created from an entity service component |
| `N` | InstanceName was created from a session service component |
| An empty string ("") | An error occurred. $procerror contains the exact error. |

Values of $procerror Commonly Returned Following $componenttype

| Value | Error constant | Meaning |
| --- | --- | --- |
| -57 | <UACTERR\_NO\_INSTANCE | The named instance cannot be found in the component pool. |
| -1101 | UPROCERR\_FIELD | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| -1105 | <UPROCERR\_INSTANCE | The instance name provided is not valid; for example, the argument contains incorrect characters. |
| -1304 | UPROCERR\_UNKNOWN\_CONTEXT | Function not allowed, unknown context. The  *InstanceName* argument was omitted and no instance is current, for example, in the Application Execute trigger. |

## Use

Allowed in all Uniface component types.

## Description

The InstanceName can be any of the
following:

* String:
  `$componenttype("MYINSTANCE")`.
* Variable, where $1 contains
  `"MYINSTANCE"`:

  `$componenttype($1)`.
* Function, where `$entname` is
  `"MYINSTANCE"`

  `$componenttype($entname)`,.
* Parameter, where PARAM1 contains
  `"MYINSTANCE"`:

  `$componenttype(PARAM1)`.
* Indirect reference to a field, where the
  target field evaluates to a string that contains the name of an instance:

  `$componenttype(@$1)`, where
  $1 contains `"FLD1"` and FLD1 contains `"MYINSTANCE"`.

The following example writes a message to the
message frame that indicates the type of the component from which the current instance was created:

```procscript
getitem/id $COMPTYPE$, "F=form;S=service;R=report;=unknown", $componenttype
if ($componenttype = "A")
   putmess "Startup shell is %%$applname"
else
   putmess "Current instance is from a %%$COMPTYPE$" named %%$componentname"
endif
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Added `D` return value. |

## Related Topics

- [activate](../procstatements/activate.md)
- [newinstance](../procstatements/newinstance.md)


---

# $concat

Concatenate up to 5 strings.

$concat`(`Source`,` String{`,` String2{`,` String3{`,` String4}}}`)`

## Parameters

Source,
String—strings to be concatenated.

## Return Values

Concatenated string.

## Use

Allowed in all Uniface component types.

```procscript
$1="Uniface "
$2="is "
$3="great"
$4=$concat($1, $2, $3)
; $4 now contains "Uniface is great"
```

---

# $condition

Return the result of evaluating a conditional expression.

$condition`(`Condition{`,` DataList}`)`

## Parameters

* Condition—any legal
  conditional Proc expression or compiled conditional expression; can be a string, or a field (or
  indirect reference to a field), a variable, or a function that evaluates to a string.

  + Only Proc allowed in the current
    component type can be used.
  + An operand in the expression cannot
    contain another expression. For example, an expression that includes
    $fieldendmod cannot be used in a report or service.
  + Any field referred to must be included in
    the field list for the component entity.
  + Variables included in
    Condition must be in scope.
* DataList—list used to
  substitute variables (or fields) in the expression with data. This works just like the string
  substitution. Optional.

## Return Values

$condition returns either TRUE
or to FALSE after evaluating Condition.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $condition and
$expression

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

$condition returns the Boolean
result of evaluating the conditional expression Condition. The conditional
expression is parsed at run time and evaluated as if it were a compiled conditional expression; in
other words, the conditional expression is *interpreted*.

## Optional Argument for $condition

The following example shows the use of the
optional argument IdItemList for $condition.

```procscript
$2="one=1;two=2;three=3"
$1=$condition("one+two+three=6", $2)
```

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

- [$expression](expression.md)
- [Dynamic Validation](../../../howunifaceworks/datavalidation/dynamic_validation.md)


---

# $cos

Return the cosine of X.

$cos`(`X`)`

## Parameters

X —angle in radians or a
field (or indirect reference to a field), a variable, or a function or expression which evaluates
to an angle in radians.

## Return Values

Calculated cosine  *X* .

If an error occurs, $procerror
contains a negative value that identifies the exact error.

## Use

Allowed in all Uniface component types.

The following example returns the cosine of the
given expression:

```procscript
$COSINEPIR$ = $cos($pi() * RADIANS)
```

## Related Topics

- [$acos](acos.md)


---

# $CurEntProperties

Sets properties for an inner entity within the current occurrence of its parent
entity.

$CurEntProperties`(`Entity`)`

$CurEntProperties`(`Entity`)` = Properties

## Arguments

* Entity—entity name;
  optional; can be a literal name, a string, a variable, function, parameter, or indirect reference
  to a field containing the name. It can optionally contain a qualified model name (for example,
  MYENT.MYMODEL).
* Properties—string or
  variable containing a Uniface list of desired properties and their corresponding values, in the
  format:

  Property`=`Value { ;Propertyn`=`Valuen}

## Return Values

* Empty string ("") if an error occurred, or if
  the default properties have not been changed.

  **Note:**   If an error occurs,
  $procerror does not return a value to indicate the exact error. For example, if
  Entity does not exist on the form, you will receive a compiler warning, but not
  a runtime error.
* Associative list containing the widget
  properties that have been changed from the default widget properties for the current occurrence.
  Widget properties can be changed declaratively, or by the $CurEntProperties
  function itself.

## Use

Allowed in all Uniface component types.

## Description

The $CurEntProperties function
enables you to address the properties of an inner entity within a specific occurrence. The
properties that can be addressed by $CurEntProperties depend on the target
presentation platform, the component type, and the widget (if there is one).

Properties of the following widgets are
supported:

* In Form components: default entity widget and
  Grid widget. For more information, see [Default Entity Widget](../../../_reference/widgets/defentitywin.md) and [Grid](../../../_reference/widgets/grid.md).
* In Dynamic Server Page components: default
  entity widget. For more information, see [Entity and Occurrence Properties in Dynamic Server Pages](../../../_reference/widgetsdsp/dsp_defentity.md).

**Note:**  There is no entity widget available for Static
Server Pages and character-based components. In this case, properties set with
$CurEntProperties are ignored.

For each property, Uniface looks for it in the
property string returned by $CurEntProperties. If the property is not there, it
is sought in the declarative properties, and finally in the .ini
properties.

$CurEntProperties returns only
properties that have been explicitly set, either by a previous Proc function, or declaratively in
the Development Environment.

Each time that a component is restarted, these
properties are reset to the compiled values, which are the default properties, plus the properties
set for the entity declaratively. In form components that have the Keep Data in
Memory property selected, these properties are not reset.

## Setting Entity Colors

The following example demonstrates the effect of
setting entity properties using the $EntityProperties and
$CurEntProperties. In this case, an outer entity BOOK has an inner entity
AUTHOR.

```procscript
setocc "BOOK", 2 
$EntityProperties("BOOK") = "backcolor=pink"     
$CurEntProperties("AUTHOR") = "backcolor=lightgreen"
```

1. Make the second occurrence of BOOK the current
   occurrence.
2. Set the color of all BOOK entities.
3. Set the color of the AUTHOR entity in the
   current occurrence to a different color

Result

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [$entityproperties](_entityproperties.md)
- [Controlling the Appearance of an Application](../../../componentconstruction/layout/applicationappearance.md)
- [Presentation Properties](../../../componentconstruction/layout/representationproperties.md)
- [Entity Widget Properties](../../../componentconstruction/entitywidgetproperties.md)


---

# $curhits

Return the number of occurrences currently in the hitlist.

$curhits { `(` *Entity*`)` }

## Parameters

* *Entity* —entity name; can be a literal name, string, variable,
  function, parameter, or indirect reference to a field. If omitted, the current
  entity is used.

## Return Values

Values returned in
$curhits

| Value | Meaning |
| --- | --- |
| "" | An error occurred. $procerror contains the exact error. |
| <0 | Hitlist has been only partially built |
| >0 | Number of occurrences in the hitlist. |

Values of $procerror
Commonly Returned Following $curhits

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in form, service, session service, entity service, and
report components.

## Description

The value of
$curhits is negative if the hitlist has been partially
built. This occurs when there can be further occurrences in the DBMS that match
the retrieve profile but that are not yet in the hitlist. A partially built
hitlist is called a 'stepped hitlist', since it is built in steps. Not all
DBMSs support stepped hitlists, and those that do may not use the default value
of ten occurrences in a step. To check whether your DBMS supports stepped
hitlists, see the appropriate
connector documentation.

When only a partial hitlist is
built, the values returned by
$curhits can (at first) appear confusing. A partial
hitlist is usually built in steps of ten occurrences. When the user inspects
the first ten occurrences,
$curhits is -10; the negative value indicates that there
may be further occurrences to be fetched. After the user sees the eleventh
occurrence,
$curhits returns -20, because another set of ten
occurrences has been added to the hitlist.
$curhits continues to return -20, until the user inspects
the twenty-first occurrence. At that point the next set of ten occurrences is
fetched and
$curhits returns -30.
$curhits returns a positive value only when the complete
hitlist has been built, and then the value is the same as
$hits. (This process is illustrated in the table in the
discussion of
$totocc.)

The performance benefits of using
a stepped hitlist are lost if you use a function like
$hits, which results in the complete hitlist being built.
A complete hitlist is also built in response to the following commands:

* setocc *Entity* `,-1`
* creocc *Entity* `,-1`
* The
  order by clause in a
  read statement (where the DBMS does not support this
  feature)

For some DBMSs a stepped hitlist uses a
dynamic size for each step. This is because the DBMS can select only all
records with the same index value, not just some of them. So, if a retrieve
profile specified all records with a foreign key greater than 20, for example,
and the first 15 occurrences all have a foreign key of 21, the step size for
the stepped hitlist is 15. This means that
$curhits returns -15 (if the hitlist is only partially
built).

## Displaying the Number of Items in the Hitlist

The following example
displays the number of elements in the hitlist. If the value returned by
$curhits is negative, the message includes the text 'so
far'. Note the use of the flag $RETR$. This prevents the message from being
displayed until after a
retrieve has completed:

```procscript
; trigger: Retrieve
$RETR$ = 1
retrieve
if ($curhits < 0)
   $1 = $curhits * -1
   message "%%$1 hits selected (so far)"
else
   message "%%$hits occurrences retrieved"
endif
$RETR$ = 0
```

```procscript
; trigger: <Read>
read
if ($RETR$ = 0)
   if ($curhits < 0)
      $1 = $curhits * -1
      message "%%$1 hits selected (so far)"
   else
      message "%%$hits occurrences retrieved"
   endif
endif
```

## Related Topics

- [creocc](../procstatements/creocc.md)
- [read](../procstatements/read.md)
- [setocc](../procstatements/setocc.md)
- [$curocc](_curocc.md)
- [$dbocc](_dbocc.md)
- [$hits](_hits.md)
- [$totocc](_totocc.md)
- [$totdbocc](_totdbocc.md)
- [Database Connectors](../../../dbmssupport/dbmsdrivers/dbmsconnectors.md)


---

# $curkey

Return the number of the current key in a Validate Key or Leave Modified Key trigger.

$curkey

## Return Values

Values Returned by $curkey

| Value | Meaning |
| --- | --- |
| >1 | Key number of a candidate key as defined on the Define Key form |
| 1 | Primary key |
| "" | An error occurred |

Values returned by $procerror following $curkey

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1304 | <UPROCERR\_UNKNOWN\_CONTEXT> | Function not allowed, unknown context. For example, $curkey was encountered in an incorrect trigger. |

## Use

Allowed in form, session service, entity service,
and service components (and in report components that are not self-contained), only in a Validate
Key or Leave Modified Key trigger.

## Description

The $curkey function returns
the key number in the current occurrence for which the Validate Key or Leave Modified Key trigger
was activated.

## Example

The following example uses the
$curkey function to perform specific validation for each key:

```procscript
; trigger: Validate Key

selectcase $curkey
   case 1 ;perform validation for the primary key
   ...
   case 2 ;perform validation for candidate key #2
...
   case 4 ;perform validation for candidate key #4
...
   elsecase
      message "Error %%$procerror occurred at %%$procerrorcontext"
      message "Context: %%$dataerrorcontext"
endselectcase
```

## Related Topics

- [validate](../procstatements/validate.md)
- [validatekey](../procstatements/validatekey.md)
- [validateocc](../procstatements/validateocc.md)
- [$keytype](_keytype.md)
- [$keyvalidation](_keyvalidation.md)
- [$totkeys](_totkeys.md)
- [$dataerrorcontext](_dataerrorcontext.md)
- [Leave Modified Key](../triggersstandard/leavemodifiedkey.md)
- [Validate Key](../triggersstandard/validatekey.md)


---

# $curline

Return the line on which the cursor is positioned in the current field.

$curline

## Return Values

Line number where the cursor is currently
positioned in the Uniface field editor.

## Use

Allowed in form components (and in service,
session service, entity service, and report components that are not self-contained).

## Description

The $curline function enables
you to refer to particular lines of a field.

This function is valid only in a unifield; it has
no effect in widgets.

The following example uses
$curline to provide context-sensitive help. The user positions the cursor on a
particular line in the field and activates the Help trigger for that line:

```procscript
; trigger: Help

help $text("%%$curline%%%_HLP")
```

## Related Topics

- [$curword](_curword.md)


---

# $curocc

Return the sequence number of the current occurrence in the hitlist.

$curocc
{`(`Entity`)` }

## Parameters

*Entity* —name of the entity; can be
a string, or field, variable, function, or parameter that evaluates to a string that contains the
name of an entity. If omitted, the current entity is used.

## Return Values

* Sequence number in the hitlist of the current
  occurrence.
* Empty string (""), if an error occurred, in
  which case $procerror contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $curocc

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | UPROCERR\_ENTITY | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

The following events affect the value of
$curocc:

Events that change $curocc

| Event | Action | Discussion |
| --- | --- | --- |
| discard | No change. | If there is an occurrence following the discarded occurrence.  **Note:**  If discard is used outside the Read trigger, $status may return `0` (indicating that there are no following occurrences) even when there are still occurrences to be read. For more information, see [discard](../procstatements/discard.md). |
| Subtracts 1 from $curocc. | If there is no occurrence following the discarded occurrence. |
| retrieve | Sets $curocc to 1. |  |
| setocc | Sets $curocc to specified occurrence. |  |
| ^ADD\_OCC | Adds 1 to $curocc. | $totocc is increased by 1. |
| ^INS\_OCC | No change. | $totocc is increased by 1. |
| ^NEXT\_OCC | Adds 1 to $curocc. | If there is a next occurrence present in the component. |
| No change. | If there is no next occurrence. |
| ^PREV\_OCC | Subtracts 1 from $curocc. | If there is a previous occurrence present in the component. |
|  | No change. | If there is no previous occurrence. |

The following example shows Proc code in an
Occurrence Gets Focus trigger which uses $curocc and $totocc
to show the user the position of the current occurrence in relation to other occurrences in the
component structure:

```procscript
; trigger: Occurrence Gets Focus

message "Number %%$curocc of %%$totocc"
```

## Related Topics

- [creocc](../procstatements/creocc.md)
- [remocc](../procstatements/remocc.md)
- [setocc](../procstatements/setocc.md)
- [$dbocc](_dbocc.md)
- [$totocc](_totocc.md)


---

# $curoccvideo

Set or return the video properties for fields of the current occurrence.

$curoccvideo`(`Entity
{`,``"`Option`"`}`)`
{`=`AttributeList}

AttributeList`=`$curoccvideo`(`Entity
{`,``"`Option`"`}`)`

Example: `$curoccvideo ("CUSTOMER") = "HLT"`

## Arguments

* Entity—name of an entity.
  If Entity is `"*"`, the video properties are applied to all
  entities in the form. If Entity is omitted, only the current entity is affected.
* Option—occurrences to which
  video attributes should be applied

  + `inner`—apply the video
    properties to all inner entities of the current occurrence, but not to the specified entity
    itself.
  + `up`—apply the video
    properties only to many entities that are drawn as up entities within the specified entity.
  + `off`—turn off video
    highlighting for the current occurrence; AttributeList is ignored. If you
    specify `inner;off`, video highlighting is turned off for inner
    entities only.
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

## Video Attribute Codes

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

Allowed in form components.

## Description

The $curoccvideo function sets
or retrieves the video properties for the fields of the current occurrence. Used without an option,
$curoccvideo applies these properties to fields of Entity.

Using the `inner` or
`up` option excludes the calling entity, so only inner or upper entities,
respectively, are altered with these options. For example, the following statement affects only the
inner entities of MyOuterEntity:

```procscript
$curoccvideo("MyOuterEntity", "inner") = "BRI"
```

**Note:**  The $curoccvideo function
does not affect an entity that is used as a single occurrence, unless that entity is an up entity
and the outer entity is drawn with multiple occurrences.

## Defining Default Video Attributes for the Current Occurrence

You can use the assignment setting
$CUROCC\_VIDEO to enable the highlighting of the active occurrence in all forms
of the application, using the default video attributes defined with
$DEF\_CUROCC\_VIDEO. For more information, see [$CUROCC\_VIDEO](../../../configuration/reference/assignments/curocc_video.md) and [$DEF\_CUROCC\_VIDEO](../../../configuration/reference/assignments/def_curocc_video.md).

If $curoccvideo sets the video
attribute to `HLT`, and the system highlight color is the same as the color used by
Windows to highlight text selected in an edit box, the difference between selected and non-selected
text will not be visible to the user. In this case, you can define a different color combination
using the $CUROCC\_VIDEO\_HLT assignment setting. For more information, see [$CUROCC\_VIDEO\_HLT](../../../configuration/reference/assignments/_curocc_video_hlt.md).

## Overriding Current Occurrence Video Properties

Video attributes that are defined for the current
occurrence are overridden by those defined with the assignment setting
$ACTIVE\_FIELD. This allows the active field to be visible within the active
occurrence (if you have chosen appropriate video properties).

Video attributes set with
$fieldvideo override both those set with $ACTIVE\_FIELD and
those set for the current occurrence, unless $ACTIVE\_FIELD\_FIRST is also set.
For more information, see [$ACTIVE\_FIELD](../../../configuration/reference/assignments/active_field.md) and [$ACTIVE\_FIELD\_FIRST](../../../configuration/reference/assignments/_active_field_first.md).

## Using $curoccvideo

The following example causes the fields of the
current occurrences of all inner entities that are painted as up entities within the entity
Customer to appear with white letters on a blue background. The color number is determined by
adding 56 (black foreground) and 1 (blue background).

```procscript
$curoccvideo ("CUSTOMER","up") = "COL=57"
```

The following example turns off highlighting of
fields of the current occurrences of all inner entities within the entity ENT1, but not of ENT1
itself.

```procscript
vOptions = ""
putitem vOptions, -1, "inner"
putitem vOptions, -1, "off"
$curoccvideo ("ENT1",vOptions)
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [curoccvideo](../procstatements/curoccvideo.md)
- [fieldvideo](../procstatements/fieldvideo.md)
- [$fieldvideo](_fieldvideo.md)
- [$CUROCC_VIDEO_HLT](../../../configuration/reference/assignments/_curocc_video_hlt.md)
- [Video Attributes](../../../desktopapps/colorhandling/video_attributes_is.md)
- [$ACTIVE_FIELD](../../../configuration/reference/assignments/active_field.md)
- [$CUROCC_VIDEO](../../../configuration/reference/assignments/curocc_video.md)
- [$DEF_CUROCC_VIDEO](../../../configuration/reference/assignments/def_curocc_video.md)


---

# $curword

Return the word on which the cursor is positioned in the current
field.

$curword

## Return Values

Word on which the cursor is currently positioned.

## Use

Allowed in form components (and in service, session service,
entity service, and report components that are not self-contained).

## Description

The
$curword allows you to refer to a particular word in a
field.

**Note:**   This function is valid only in a
unifield; it has no effect in widgets.

The following example uses
$curword to provide context-sensitive help. The user
positions the cursor on a particular word in the field and activates the
Help trigger for that field:

```procscript
; trigger: Help

help $text("%%$curword%%%_HLP")
```

## Related Topics

- [$curline](_curline.md)


---

# $dataerrorcontext

Return the context of the last validation error.

$dataerrorcontext

## Return Values

Associative list that describes the context in
which the error occurred.

Associative list items returned by $dataerrorcontext

| Item | Meaning |
| --- | --- |
| `CONTEXT=VALIDATION` | The error occurred during validation. |
| `TOPIC=FIELD` | Error occurred during a procedural check in a Validate Field trigger. |
| `TOPIC=KEY` | Error occurred during a procedural check in a Validate Key trigger. |
| `TOPIC=OCC` | Error occurred during a procedural check in a Validate Occurrence trigger. |
| `TOPIC=SYNTAX` | Error occurred during a declarative check. |
| `OCC=`*OccurrenceNumber* | Occurrence number where error occurred. |
| `KEY=` *KeyNumber* | When `TOPIC=KEY`, the key number that caused the error.  Otherwise, omitted. |
| `OBJECT=` *Field*`.` *Entity* `.` *Model* | When `TOPIC=FIELD`, the field, entity, and model at which the error occurred, in uppercase characters.  When `TOPIC=SYNTAX` and the error occurred at field level, the field, entity, and model at which the error occurred, in uppercase characters. |
| `OBJECT=` *Entity*`.` *Model* | When `TOPIC=KEY` or `TOPIC=OCC`, the entity and model at which the error occurred, in uppercase characters.  When `TOPIC=SYNTAX` and the error occurred at entity level, the entity and model at which the error occurred, in uppercase characters. |
| `ERROR=` *ErrorValue* | The value of $error. |
| `STATUS=` *StatusValue* | The value of $status. Typically this is a negative value. |

## Use

Allowed in all Uniface component types.

## Non-Contiguous Range Check

The following example uses the
$dataerrorcontext function:

```procscript
; trigger: Validate Field
; Example: non-contiguous range check

if (DISCOUNT = -100 | (DISCOUNT >= 0 & DISCOUNT <= 100))
   return(0)
else
   return(-1)
endif
done
; trigger Leave Field

if ($fieldendmod)
   if (CUSTCODE = "Special")
      $prompt = SPECIAL_DISCOUNT
      field_syntax DISCOUNT, "DIM"
   else
      field_syntax DISCOUNT, ""
   endif
   if ($status = -1) message $text(1234)
endif
done

; trigger: On Error (field)

variables
   string problem
endvariables
getitem/id problem, $dataerrorcontext, "topic"
message "You have a %%problem%%% problem to resolve."
return(-1)
```

## Related Topics

- [validate](../procstatements/validate.md)
- [validatefield](../procstatements/validatefield.md)
- [validatekey](../procstatements/validatekey.md)
- [validateocc](../procstatements/validateocc.md)
- [$procerror](_procerror.md)
- [$status](_status.md)
- [Validate Field](../triggersstandard/validatefield.md)
- [Validate Key](../triggersstandard/validatekey.md)
- [Validate Occurrence](../triggersstandard/validateoccurrence.md)


---

# $date

Return the current date or convert the argument to the Date data type.

$date { `(`Source`)` }

## Parameters

*Source* —constant, field, variable,
or function with a String value.

## Return Values

The function $date returns the
following:

* If Source is omitted or is
  an empty string (""), $date returns the current system date.
* If Source is present,
  $date converts it to data type Date and returns that value.
* If Source cannot be
  converted to a Date value (for example, `$date("abc")`), $date
  returns an empty string ("").
* If a service or report component is running
  in a remote environment, the function $date returns the system time of the
  server (not of the client).

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values Commonly Returned by $procerror After $datim

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-1004` | `UPROCERR_DATE` | Not a valid Date value. |

## Use

Allowed in all Uniface component types.

## Description

The $date function scans
Source from left to right for valid characters. Valid characters depend on
locale as determined by the values $nlslocale and $nlsformat:

* `classic`—Uniface is very
  tolerant towards the input string and tries to convert the string to a valid date.
* `nlslocale`—strict rules
  apply:
  + The input string must be in the exact
    display format of a date in the selected locale. To find out the required format, check the output
    without an input string or using an empty string: `$date` or
    `$date("")`.
  + From the point where the input string
    does not comply with the syntax for the selected locale, the return value is completed with values
    derived from the current date.
  + If the first characters of the input
    string do not comply with the syntax for the selected locale, an empty string is returned.

Syntax Format for Selected Locales

| Locale | Syntax |
| --- | --- |
| Classic | `dd-mmm-yyyy` |
| En\_US | `mmm dd, yyyy` |
| de\_DE | `dd.mm.yyyy` |
| nl\_NL | `ddmmmyyyy` |

The following table shows the effect that the
locale can have on the way an input string is converted. Remember that from the point where the
input string does not comply with the syntax for the selected locale, the return value is completed
with values derived from the current date.

* Classic:
  `$nlsformat="classic"` or
  `$nlslocale="classic"`
* United States:
  `$nlsformat="nlslocale"`  and
  `$nlslocale="en_US"`
* Germany:
  `$nlsformat="nlslocale"`  and
  `$nlslocale="de_DE"`
* Netherlands:
  `$nlsformat="nlslocale"`  and
  `$nlslocale="nl_NL"`

Examples Assuming May 21, 2019 is the Current Date

| Source | Classic | United States | Germany | Netherlands |
| --- | --- | --- | --- | --- |
| `""` | `21-may-2019` | `May 21, 2019` | `21.05.2019` | `21 mei 2019` |
| `"CLEAR"` | `""` | `""` | `""` | `""` |
| `"20190521"` | `21-may-2019` | `May 21, 2019` | `21.05.2019` | `21 mei 2019` |
| `21-may-2019` | `21-may-2019` | `""` | `21.05.2019` | `21 mei 2019` |
| `May 21,2019` | `""` | `May 21, 2019` | `""` | `""` |
| `May 21, 2019` | `""` | `May 21, 2019` | `""` | `""` |
| `21.05.2019` | `21-may-2019` | `""` | `21.05.2019` | `21 mei 2019` |
| `21-mei-2019` | `21-may-2019` | `""` | `21.05.2019` | `21 mei 2019` |
| `21 mei 2019` | `21-may-2019` | `""` | `21.05.2019` | `21 mei 2019` |

## Default Date Format

If $nlsformat or
$nlslocale is set to `classic`, the conversion process is
governed by the format of the default date format. If Source has a different
format from the default date format, you must convert it into one that Uniface can work with. In
this case, you can either change the default so that the default reflects the data, or change the
data so that the data reflects the default.

To change the default, you need to change the
$language and $variation codes to select a language setup
with a default date format that is the same as the string argument. Then use
$date to convert the value.

To change the data, you can define a global or
component variable with the appropriate display format. For example, if you have a default date
format of `dd-mmm-yyyy`,
and you have retrieved date information in the format
`mm/dd/-``/`, you should define
a global or component variable with a display format of `DIS(mm/dd/yyyy)`; then copy
the retrieved date to this variable. This ensures that Uniface correctly interprets the value of
the retrieved date. (This also avoids the use of $date.)

**Note:**   The conversion process is governed by the
format of the default date. To define the default date in the Deployment Workspace, choose
Tools > Language Setups > Date-time
Properties. The default language setup used by an application is governed
by the values of $language and $variation.

## Examples

The following examples show the different values
returned by $date. The value returned depends on the default date in the
language setup. The first example has a default date format of  *dd-mmm-yyyy* , and the
example code was tested on the 21st of August, 1994:

```procscript
clrmess
$1 = $date("1-2-94")
putmess "$1 = %%$1 on value of 1-2-94"
$2 = $date
putmess "$2 = %%$2 on value of null"
```

This produces the following message frame:

```procscript
$1 = 01-feb-1994 on value of 1-2-94
$2 = 21-aug-1994 on value of null
```

When exactly the same code was run, but with a
default language setting of *mmm-dd-yyy* , the following message frame was generated:

```procscript
$1 = jan-02-1994 on value of 1-2-94
$2 = aug-21-1994 on value of null
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Additional option for overriding the default behavior if the time zone has been defined (using $nlstimezone or $NLS\_TIME\_ZONE) |

## Related Topics

- [$nlslocale](_nlslocale.md)
- [$nlsformat](_nlsformat.md)
- [addmonths](../procstatements/addmonths.md)
- [$clock](_clock.md)
- [$datim](_datim.md)
- [Language and Locale](../../../internationalapps/concepts/languageandlocale.md)


---

# $datim

Return the system date and time or convert the argument to the Datetime data type.

$datim { `(`Source`)` }

## Parameters

Source—constant, field,
variable, or function with a string value formatted as: dd-mmm-yyhh:nn:ss.tt

* dd—day
* mmm—month
* yy—year
* hh—hour
* nn—minute
* ss—second
* tt—tick, that is hundredth
  of a second, prefixed by a separation character, a dot, or a semicolon

## Return Values

Value with data type Datetime:

* If Source is given,
  $datim converts Source to the corresponding date and
  time.

  Source should be formatted
  according to the Default Date-Time Format, which depends on the language setup that is current at
  run time. If the current language setup has no default Date-Time Format defined, dd-mmm-yy
  hh:nn:ss:tt is used.
* If Source is omitted, the
  function returns a string containing the system clock time as ccyymmddhhnnsstt,
  accurate to one hundredth of a second (1 tick). For example: `2007010512322478`.
* If Source cannot be
  converted to a Date value (for example, `$datim("abc"`)), $datim
  returns an empty string (`""`).
* If a service or report component is running in
  a remote environment, $datim returns the system time of the server (not of the
  client).

Examples of $datim Return Values with Date-Time Formats

| Field Layout Definition | Value Returned by $datim |
| --- | --- |
| hh:nn:ss.tt | `12:32:24.78` |
| hh:nn:ss | `12:32:24` |
| dd-MMM-yyyy hh:nn:ss.tt | `01-MAY-2007 23:30:43.67` |
| dd-MMM-yyyy hh:nn:ss.tt and Source is `"01-05-0723:30:43"` | `01-MAY-2007 23:30:43.00`. Note that the 00 ticks are returned. |

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values Commonly Returned by $procerror After $datim

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-1006` | `UPROCERR_DATETIME` | Not a valid Datetime value. |

## Use

Allowed in all Uniface component types.

## Description

Used without Source,
$datim returns the system date and time. You can use $datim
in Proc code to assign the current date to fields in header or trailer frames, or to put a
timestamp on occurrences. The time returned is accurate to one hundredth of a second (1 tick).

Used with Source,
$datim converts Source to a value with data type Datetime.
The way the data is interpreted and formatted depends on the locale, as determined by the values of
$nlslocale and $nlsformat. For more information, see [$date](_date.md).

When the locale is set to classic, the conversion
process is governed by the format of the default date. This format is defined by
Tools > Language Setups > Date-time
Properties in the Deployment Workspace. The default language setup used
by an application is governed by the values of $language and
$variation.

## Example

The following example assigns the current system
date and time to the field DATE.HEADER:

```procscript
; entity: HEADER.USYS
; trigger: Occurrence Gets Focus

DATE.HEADER = $datim
```

History

| Version | Change |
| --- | --- |
| 9.2.01 | When Source is omitted, accurate to one hundredth of a second (1 tick) instead of to the second, . |
| 9.4.01 | Additional option for overriding the default behavior if the time zone has been defined (using $nlstimezone or $NLS\_TIME\_ZONE) |

## Related Topics

- [addmonths](../procstatements/addmonths.md)
- [$clock](_clock.md)
- [$date](_date.md)
- [$nlslocale](_nlslocale.md)
- [$nlsformat](_nlsformat.md)


---

# $dberror

Return the error code reported by the DBMS.

$dberror

## Return Values

Error number that was set when the DBMS or network
driver encountered an error situation. The value is given by the DBMS or network to the driver, so
it is DBMS- or network-specific. For more information, consult the documentation for your DBMS or
network.

## Use

Allowed in all Uniface component types.

## Description

The error number returned by the DBMS is not the
same as the error code returned to Uniface by the DBMS driver. Your driver can use
$dberror to return internal driver errors as well as DBMS errors.

To retrieve the associated error message, use
$dberrortext.

The following example puts the value of
$dberror into the message frame if an error occurs ($status
is negative):

```procscript
if ($status < 0)
   putmess "DBMS / Network error %%$dberror: %%$dberrortext"
endif
```

## Related Topics

- [$error](_error.md)
- [$dberrortext](_dberrortext.md)


---

# $dberrortext

Return the text of an error reported by the DBMS.

$dberrortext

## Return Values

Error text issued by the DBMS or network to the
driver when an error situation is encountered. The value is given by the DBMS or network to the
driver, so it is DBMS- or network-specific. If it exceeds 1024 KB, the message is truncated.

For more information, consult the documentation
for your DBMS or network.

## Use

Allowed in all Uniface component types.

## Description

$dberrortext returns the
message associated with the DBMS error returned by $dberror. If no text is
available when $dberror is set, the $dberrortext message is:

```procscript
"Unknown error - no message available"
```

.

If there is no $dberror (that
is, `$dberror=0`), $dberrortext is empty.

## $dberror

The following example puts the value of
$dberrortext into the message frame if an error occurs
($status is negative):

```procscript
if ($status < 0)
   putmess "DBMS / Network error %%$dberror: %%$dberrortext"
endif
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [$dberror](_dberror.md)
- [$error](_error.md)


---

# $dbocc

Return the sequence number of the current occurrence within the set of occurrences
retrieved from the database.

$dbocc { `(`*Entity* `)` }

## Parameters

*Entity* —name of the entity; can be
a liternal name, a string, or a variable, function, parameter, or field reference. If omitted, the
current entity is used.

## Return Values

Values Returned by $dbocc

| Value | Meaning |
| --- | --- |
| >0 | The sequence number of the current or specified  *Entity*  in the database. |
| 0 | The current occurrence has not been retrieved from the database (it has been entered by the user, but not stored yet). |
| "" | An error occurred. $procerror contains a negative value that identifies the exact error. |

Values of $procerror Commonly Returned Following $dbocc

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | UPROCERR\_ENTITY | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

The function $dbocc returns
the sequence number of the current occurrence within the set of occurrences that are connected to
the database. The following events affect the value of $dbocc:

Statements and Events that Change $dbocc

| Event | Action | Discussion |
| --- | --- | --- |
| discard | Reduces $dbocc. | By the number of discarded database occurrences. |
| read | Adds 1 to $dbocc. |  |
| retrieve | Sets $dbocc to 1. |  |
| store | Increases $dbocc. | If non-database occurrences are stored. |
| No change | If no non-database occurrences are stored. |
| ^NEXT\_OCC | No change. | Causes the Read trigger to be activated if the next occurrence is not yet in the component. |
| ^PREV\_OCC | No change. | Causes the Read trigger to be activated if the previous occurrence is not yet in the component. |

After a `store` (and
`commit`) any newly-created occurrences are connected to the database and considered
to be database occurrences, so $dbocc adds the occurrence to the list and
returns its sequence number in that list of connected occurrences. After a
`rollback`, any new occurrences are not committed and therefore not connected to the
database.

Contrast this with the value returned by
$curocc, that is, the sequence number of an occurrence in the component. The
function $dbocc can be used to check whether an occurrence was retrieved from a
database or entered by the user.

The following example displays the sequence number in the database, if the occurrence
is in the database:

```procscript
; trigger: Occurrence Gets Focus

if ($dbocc > 0)
   message "On DBMS occurrence %%$dbocc"
endif
```

## $dbocc = 0

The following example logs information about which user updated or created a particular
occurrence. The value of $dbocc is used to determine whether the occurrence is
newly created, or has been retrieved from a database.

```procscript
; trigger: Write

if ($dbocc = 0)
   CREATED_BY = $user
   CREATED_DATE = $date
else
   UPDATED_BY = $user
endif
write
```

## Related Topics

- [write](../procstatements/write.md)
- [$curocc](_curocc.md)
- [Write](../triggersstandard/write.md)
- [Write Up](../triggersstandard/writeup.md)


---

# $decode

Decrypt or decode data, or verify a message by means of a digital
signature.

Decrypt or decode: $decode`(`Algorithm`,` Source
{`,` Key {`,` Mode`,` InitializationVector} }
`)`

Verify message with signature:
$decode`(`Algorithm`,` Source`,` Key`,` Signature`)`

## Arguments

| Argument | Description |
| --- | --- |
| Algorithm | Decoding, decryption, or signature verification algorithm; see [Supported Algorithms](#section_0BBA93D3F7B38471891A4E02213CE2CD). |
| Source | Data to be decoded or decrypted.  For signature verification, it is the message to be verified. |
| Key | Key used to decrypt the data; required if Algorithm specifies a block cipher, asymmetric encryption scheme or signature scheme. The length of the key must be appropriate to the algorithm.  For decryption with asymmetric key algorithms, it must be a valid private key for the encryption scheme. For signature verification, it must be a valid public key for the signature scheme. |
| Mode | Block cipher mode of operation; required if Algorithm specifies a block cipher. One of:   * `ECB`—electronic code   book (default) * `CBC`—cipher-block   chaining * `CFB`—cipher feedback * `OFB`—output feedback * `CTR`—counter * `CBC_CTS`—CBC cipher   text stealing |
| InitializationVector | A unique data block, such as a time stamp or random number, used in combination with the Key. Required for all modes except `ECB` |
| Signature | Digital signature of a message |

The Source,
Key, and InitializationVector parameters can specify a
string, variable, or field. If the data type of a variable or field is Raw, it is evaluated as data
type `raw`. Otherwise, it is evaluated as data type `string` .
Optional parameters are ignored if they are irrelevant.

## Return Values

When $decode is used for
message verification, the returned value a boolean value indicating true (`1`) or
false (`0`).

Decoding and decryption algorithms return decoded
or decrypted data in the Uniface raw data type.

The returned data may contain the null byte
(0x00), so the return value is in the Uniface
[raw](../procdatatypes/datatyperaw.md)
data type, which is able to handle this. If you need to get the data in the `string` data type, then you can convert it from raw to string data
using $encode with the `USTRING` algorithm.

If an error occurs, $procerror
contains a negative value that identifies the exact error. Some errors provide more detailed
information in the `ADDITIONAL` list item in $procerrorcontext.

Values of $procerror commonly returned by $decode

| Value | Error constant | Meaning |
| --- | --- | --- |
| `-1780` | UENCERR\_NO\_ALGORITHM | Algorithm not found. |
| `-1781` | UENCERR\_NO\_SOURCE | Source not found. |
| `-1782` | UENCERR\_NO\_KEY | Key not found. |
| `-1783` | UENCERR\_NO\_IV | IV not found. |
| `-1784` | UENCERR\_INVALID\_ALGORITHM | Invalid algorithm name. |
| `-1785` | UENCERR\_INVALID\_MODE | Invalid mode name. |
| `-1786` | UENCERR\_INVALID\_KEY\_LENGTH | Invalid key length. The key must have a specific length that depends on the algorithm. |
| `-1787` | UENCERR\_INVALID\_HEX\_FORMAT | Source is invalid HEX format. |
| `-1788` | UENCERR\_INVALID\_BASE64\_FORMAT | Source is invalid BASE64 format. |
| `-1789` | UENCERR\_INVALID\_URL\_FORMAT | Source is invalid URL format. |
| `-1791` | UENCERR\_GENERAL | Encode/decode general error |
| `-1792` | UENCERR\_INVALID\_SOURCE | Invalid source data |
| `-1793` | UENCERR\_INVALID\_KEY | Invalid key data |
| `-1794` | UENCERR\_INVALID\_KEY\_FORMAT | Invalid key format, must be PEM format |
| `-1795` | UENCERR\_INVALID\_PUBLIC\_KEY | Invalid public key |
| `-1796` | UENCERR\_INVALID\_PRIVATE\_KEY | Invalid private key |
| `-1797` | UENCERR\_INVALID\_IV | Invalid IV data |
| `-1798` | UENCERR\_NO\_SIGNATURE | Signature data not found |
| `-1799` | UENCERR\_INVALID\_SIGNATURE. | Invalid signature data |

## Use

Allowed in all Uniface component types.

## Description

You can use $decode to:

* Decrypt encrypted data, using the same key as
  was used to encrypt the data.
* Decode data that was encoded using Base64,
  hexadecimal, or URL encoding schemes.
* Verify a message by means of a digital
  signature. (You can use $encode to sign a message with a digital signature).

$decode supports a variety of
commonly-used encryption and signature algorithms including encoding schemes, block ciphers, RSA
encryption and signature schemes, and DSA (Digital Signature Algorithm). For more information, see [Supported Cryptography Algorithms](../../../security/cryptography/cryptographysupport.md).

The Source,
Key, and InitializationVector parameters can specify a
string, variable, or field. If the data type of a variable or field is Raw, it is evaluated as data
type `raw`. Otherwise, it is evaluated as data type `string`.

To decrypt the data, you need to provide the same
Key, Mode and InitializationVector as was
used to encrypt the data. Otherwise you get an incorrect result or an error.

## Supported Algorithms

The Algorithm parameter specify
must be an algorithm listed in one of the following tables, as a string.

Encoding Algorithms

| Algorithm | Meaning |
| --- | --- |
| `BASE64` | Base64 encoding scheme |
| `HEX` | Hexadecimal encoding scheme |
| `URL` | URL encoding scheme  **Note:**  The plus sign `+` is decoded to a space ' '. |

Supported Block Ciphers

| Algorithm | Meaning |
| --- | --- |
| `AES` | Advanced Encryption Standard |
| `RIJNDAEL` | Same as AES |
| `DES` | Data Encryption Standard |
| `TDES` | Triple Data Encryption Algorithm (TDEA) as known as Triple DES |
| `DES_EDE3` | Same as TDES |
| `DES_EDE2` | Variant of TDES with 16 byte key length |
| `DESX` | Variant of DES by XORing extra keys |
| `DES_XEX3` | Same as DESX |
| `BLOWFISH` | Blowfish |
| `TWOFISH` | Twofish |

For more information, see [Block Ciphers](../../../security/cryptography/block_ciphers.md).

Supported RSA Algorithms

| Algorithm | Meaning |
| --- | --- |
| `RSAES_OAEP_SHA1` | RSA Encryption Scheme based on Optimal Asymmetric Encryption Padding with SHA-1 hash function |
| `RSAES_OAEP_SHA224` | RSA Encryption Scheme based on Optimal Asymmetric Encryption Padding with SHA-224 hash function |
| `RSAES_OAEP_SHA256` | RSA Encryption Scheme based on Optimal Asymmetric Encryption Padding with SHA-256 hash function |
| `RSAES_OAEP_SHA384` | RSA Encryption Scheme based on Optimal Asymmetric Encryption Padding with SHA-384 hash function |
| `RSAES_OAEP_SHA512` | RSA Encryption Scheme based on Optimal Asymmetric Encryption Padding with SHA-512 hash function |
| `RSAES_PKCS1V15` | RSA Encryption Scheme based on PKCS #1 v1.5 |
| `RSASSA_PSS_SHA1` | RSA Signature Scheme with Appendix based on Probabilistic Signature Scheme with SHA-1 hash function |
| `RSASSA_PSS_SHA224` | RSA Signature Scheme with Appendix based on Probabilistic Signature Scheme with SHA-224 hash function |
| `RSASSA_PSS_SHA256` | RSA Signature Scheme with Appendix based on Probabilistic Signature Scheme with SHA-256 hash function |
| `RSASSA_PSS_SHA384` | RSA Signature Scheme with Appendix based on Probabilistic Signature Scheme with SHA-384 hash function |
| `RSASSA_PSS_SHA512` | RSA Signature Scheme with Appendix based on Probabilistic Signature Scheme with SHA-512 hash function |
| `RSASSA_PKCS1V15_MD2` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with MD2 hash function. This is only for compatibility. |
| `RSASSA_PKCS1V15_MD5` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with MD5 hash function. This is only for compatibility. |
| `RSASSA_PKCS1V15_SHA1` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with SHA-1 hash function |
| `RSASSA_PKCS1V15_SHA224` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with SHA-224 hash function |
| `RSASSA_PKCS1V15_SHA256` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with SHA-256 hash function |
| `RSASSA_PKCS1V15_SHA384` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with SHA-384 hash function |
| `RSASSA_PKCS1V15_SHA512` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with SHA-512 hash function |

For more information, see [RSA Asymmetric Key Cryptography](../../../security/cryptography/rsa_cryptography.md).

Supported DSA Algorithms

| Algorithm | Meaning |
| --- | --- |
| `DSA_SHA1` | Digital Signature Algorithm with SHA-1 hash function |
| `DSA_SHA224` | Digital Signature Algorithm with SHA-224 hash function |
| `DSA_SHA256` | Digital Signature Algorithm with SHA-256 hash function |
| `DSA_SHA384` | Digital Signature Algorithm with SHA-384 hash function |
| `DSA_SHA512` | Digital Signature Algorithm with SHA-512 hash function |

For more information, see  [Digital Signature Algorithm (DSA)](../../../security/cryptography/dsa.md).

## Encrypt and Decrypt String Data

$decode returns raw data, so
you can use $encode with the `USTRING` algorithm to convert it to
a string data type using Uniface internal encoding, UTF-8.

```procscript
vEnc = $encode("BLOWFISH", "~home", "secret key")  ;encrypt the data
vRawData = $decode("BLOWFISH", vEnc, "secret key") ;decrypt the data
vStrgData = $encode("USTRING", vRawData)  ;convert the decrypted data from Raw to String
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [$encode](_encode.md)
- [$procerrorcontext](_procerrorcontext.md)
- [Protecting Your Application](../../../security/protectingdata.md)
- [Supported Cryptography Algorithms](../../../security/cryptography/cryptographysupport.md)
- [Proc: Data Types](../procdatatypes/datatypes.md)


---

# $def\_charset

Set or return the value of $DEF\_CHARSET, which defines the
character set used for storing data in String fields with C packing code.

$def\_charset`=`CharacterSet

Return `=` $def\_charset

## Parameters

CharacterSet—character set
supported by both the database and Uniface; specified as a string, field (or indirect reference to
a field), variable, or function that evaluates to a string.

**Note:**  The character set used by Uniface must match the
character set of the installed DBMS, even if there is no $DEF\_CHARSET setting in
your assignment file. Otherwise, characters might not be stored correctly and non-uniface
applications might not be able to read the data correctly.

## Return Values

Returns the character set used for storing data in
String fields with C packing code; either the platform default or the value set by the
$DEF\_CHARSET assigment setting.

## Use

Allowed in all Uniface component types.

## Description

The allowed values for
CharacterSet are listed in the Character set column of the following table.

Uniface-Supported Character Sets

| Character set | Description | Platform |
| --- | --- | --- |
| `CP1250` | Code page 1250 for Eastern European language | Windows |
| `CP1251` | Code page 1251 for Cyrillic language | Windows |
| `CP1252` | Code page 1252 for Western European language | Windows |
| `CP1253` | Code page 1253 for Greek | Windows |
| `CP1255` | Code page 1255 for Hebrew | Windows |
| `CP1256` | Code page 1256 for Arabic | Windows |
| `CP708` | Code page 708 (7-bit) for Arabic | Windows |
| `BIG5` | Traditional Chinese character set BIG5. | Windows, Unix |
| `GB`  (or `GB2312`) | Simplified Chinese character set GB2312-80 (code page 936) | Windows, Unix |
| `KSC`  (or `KSC5601`) | Korean character set KSC5601-1992 (code page 949) | Windows, Unix |
| `Shift-JIS` | Japanese character set Shift-JIS ( code page 932 and 943) | Windows, Unix |
| `EUC` | Japanese character set EUC | Unix |
| `LATIN1`  (or `DEC`) | ISO 8859-1 for Western European languages | Unix |
| `LATIN2` | ISO 8859-2 for Eastern European languages | Unix |
| `LATIN5` | ISO 8859-5 for Cyrillic languages | Unix |
| `LATIN6` | ISO 8859-6 for Arabic | Unix |
| `LATIN7` | ISO 8859-7 for Greek | Unix |
| `LATIN8` | ISO 8859-8 for Hebrew | Unix |
| `037` | CCSID for English | iSeries |
| `500` | CCSID for English without € | Multilingual iSeries |
| `870` | CCSID for Easter European languages | iSeries |
| `424` | CCSID for Hebrew | iSeries |
| `935` | CCSID for Simplified Chinese | iSeries |
| `933` | CCSID for Korean | iSeries |
| `930`On Japanese iSeries (AS/400) only: If your database contains data that was stored using code pages 930 or 939 prior to Uniface 9.4 with R116, use codepage 930B or 939B to retain the (incorrect) way the characters \, ¥ and ¢ are stored.In R116 and 9.5, code pages 930 and 939 were changed to correctly convert these characters. The old codepages have been renamed 930B and 939B for compatiblity. [1](javascript:void(0);) | CCSID for Japanese | iSeries |
| `939`1 | CCSID for Japanese | iSeries |
| `273` | CCSID for German/Austrian without € | iSeries |
| `1141` | CCSID for German/Austrian with € | iSeries |
| `280` | CCSID for Italian without € | iSeries |
| `1144` | CCSID for Italian with € | iSeries |
| `284` | CCSID for Spanish without € | iSeries |
| `1145` | CCSID for Spanish with € | iSeries |
| `297` | CCSID for French without € | iSeries |
| `1147` | CCSID for French with € | iSeries |
| `278` | CCSID for Finish/Swedish without € | iSeries |
| `1143` | CCSID for Finish/Swedish with € | iSeries |
| `AIX`  (or `IBMRT`) | IBM RT |  |
| `CP437`  (or `IBMPC`) | IBM PC code page 437, used in DOS programs |  |
| `CP850` | IBM PC code page 850 |  |
| `UTF8` | Unicode |  |

## Related Topics

- [$DEF_CHARSET](../../../configuration/reference/assignments/def_charset.md)


---

# $detachedinstances

Return a list of detached instances.

$detachedinstances

## Return Values

* List of all instances that are not attached
  to another instance.
* For a remote component (that is, a service or
  report running on a server), returns the list of detached instances running on that server; it does
  not return the list from the client.

## Use

Allowed in all Uniface component types.

## Description

Instances that are not attached to another
instance can either be explicitly or implicitly detached:

An explicitly detached instance is one that is
started by newinstance without the /attached switch and that
has the Modality & Attachment property set to Non-Modal, Detached. Each detached instance can
be considered a child of the application screen.

An implicitly detached instance is one that is
defined as attached but has been created by Uniface as detached. This is true in the following
cases:

* The first form is always instantiated
  detached even when it is activated by the application.
* The first service which is activated on the
  server is always instantiated detached even when it is defined as attached. This is because there
  is nothing to which it can be attached while its parent is on the client.

## Building a List of Detached Instances

$detachedinstances can be used to build a ValRep list, as the
following example demonstrates:

```procscript
; Detail trigger of a command button MORE_INFO
; FORMLIST is a drop-down list
; Note that the list produced by $detachedinstances could
; be processed with getlistitems and putlistitems
; to associate form names with representations meaningful
; to the end user.

if ($1 = "")
   $1 = 1
endif
newinstance "DETAILS", "DETAILS%%$1%%%"
$valrep("FORMLIST.CONTROLS") = $detachedinstances
activate "DETAILS%%$1%%%"
$1 = $1 + 1
```

## Related Topics

- [newinstance](../procstatements/newinstance.md)
- [$instancechildren](_instancechildren.md)
- [$instanceparent](_instanceparent.md)


---

# $direction

Return the structure editor mode (Next or Previous).

$direction

## Return Values

| Value | Meaning |
| --- | --- |
| 0 | Structure editor is in Next mode |
| 1 | Structure editor is in Previous mode |

## Use

Allowed in form components
.

## Description

The function $direction
returns the structure editor mode. This mode is reset to Next by the following structure editor
functions:

* ^DETAIL
* ^FRAME
* ^HELP
* ^KEY\_HELP
* ^MENU
* ^MESSAGE
* ^NEXT
* ^PRINT
* ^PULLDOWN
* ^RULER

Proc code in the corresponding triggers should
not rely on the value of $direction, because it is always 0 (Next).

It is usually preferable to use the Next Field or
<Previous Field> triggers rather than the $direction function.

## Related Topics

- [compare](../procstatements/compare.md)
- [$next](_next.md)
- [$previous](_previous.md)
- [$rettype](_rettype.md)


---

# $dirlist

Return the contents of the specified directory.

$dirlist`(`DirPath {`,` Topic}`)`

## Arguments

* Directory path, optionally including a content
  profile. The directory path must end with a directory separator, but the profile for its contents
  can contain the Uniface wildcard characters `?` (GOLD ?) or
  `*` (GOLD \*). For example: `C:\tmp\am*`

  The directory can be located inside a ZIP
  archive.
* Topic—type of item to
  return; one of:

  + `FILE`—list files in the
    specified path; default if Topic is omitted or an empty string,
    `FILE` is assumed.
  + `DIR`—list subdirectories
    in the specified path

## Return Values

* List of files or subdirectories (depending on
  Topic) separated by GOLD ; (`;`).
* Empty list (`""`) if the
  directory is empty, does not exist, or an error occurred. $procerror contains
  the exact error.

Values Commonly Returned by $procerror Following
$ldirlist and $dirlist

| Value | Error constant | Meaning |
| --- | --- | --- |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |
| -1110 | <UPROCERR\_TOPIC> | Topic name not known. |
| -1132 | <UPROCERR\_UNRESOLVED\_TOPIC> | Topic could not be resolved. |

## Use

Allowed in all Uniface component types.

## Description

The $dirlist function returns
the contents of the specified directory, taking file redirections in the assignment file into
account.

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

## iSeries

On iSeries, DirPath can specify
either a library, or a file in a library (library/.file, without a member name
before the period). The objects returned depend on whether a library or file is specified, and the
notation used, as well as the value of Topic.

If you use IFS notation
(DirPath contains the prefix IFS: or
!), libraries and files are considered to be directories.

* If Topic is
  `"file"`$dirlist returns all objects except files in the library
  specified, postfixed with their object types, or returns all members in the file postfixed with
  .MBR.
* If Topic is
  `"dir"`, $dirlist returns only the file names in the library,
  postfixed with .FILE.

If the file specification does not use IFS
notation, the following rules apply:

* If DirPath is a library
  and:

  + Topic is
    `"file"`, all objects except files in the library are returned, postfixed with their
    object types, for example PROGRAM.PGM;
  + Topic is
    `"dir"`, all file names in the library are returned, without postfixes; no other
    names (of object types) are returned;
* If DirPath is a file in a
  library (that is, library/.file, without a member name before the period)
  and:

  + Topic is
    `"file"`, all member names of the file are returned, without postfixes;
  + Topic is
    `"dir"`, nothing is returned, because files cannot contain anything other than
    members.

## Retrieving and Displaying Directory Contents

The following Proc code retrieves the files in
the directory drinks\tea in the current working directory and displays the
files in the message frame line-by-line:

```procscript
variables
   string vFilePath, vContent
   numeric N
endvariables

$dir$ = "drinks\tea"
; or $dir$ = "drinks/tea"
; or $dir$ = "[drinks.tea]"
vContent = $dirlist($dir$,"File")
putmess "Files in directory '%%$dir$':"
N = 1
getitem vFilePath, vContent, N
while ($status > 0)
   putmess " %%vFilePath%%%"
   N = N + 1
   getitem vFilePath, vContent, N
endwhile
end
```

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# $dirlist and $ldirlist on z/OS

On HFS, $dirlist and $ldirlist work as they do
on other platforms. However, on datasets, its behavior is different. It is also possible to specify
`DATASET` or `MEMBER` as the Topic
parameter.

For general information on specifying HFS and
dataset systems, including PDS and PDSE, see
.

## FILE

When `FILE` is specified as the Topic, only the
FileName and Extension are returned:

* FileName.Extension if
  it is a sequential file
* Extension(FileName)
  if it is a member of a PDS or PDSE, where Extension=PdsName
  and FileName=Member.

On a dataset system, if a name has three or more
segments, it is considered to be a file residing in a subdirectory. For example, in a filename
A.B.C.D.E:

* A.B.C becomes the
  DirectoryPath
* D becomes the
  FileName
* E becomes the
  Extension.

Thus, if there are three sequential datasets
A.B.C.D.E1, A.B.C.D.E2, and
A.B.C.D.E.F, the following instruction returns `D.E1` and
`D.E2` but not `D.E.F` because D still belongs
to the path name.

```procscript
$ldirlist("DSN:A.B.C.", "FILE")
```

Instead, the following instruction finds
`D`:

```procscript
$ldirlist("DSN:A.B.C.", "DIR")
```

Platform-independant code that traverses
subdirectories could subsequently execute the following Proc:

```procscript
$ldirlist("DSN:A.B.C.D.", "FILE")
```

However, it would find only dataset
E.F. The datasets A.B.C.D.E1,
A.B.C.D.E2 would not be found, because there is only one path segment after
`A.B.C.D`, not two.

On partioned datasets, members are also considered
to be files residing in directory A.B.C. The member name is the
FileName part and the PDS name is the Extension. Thus, the
following command would list all the members of a PDS named A.B.C.PDS().

```procscript
$ldirlist("@DSN:A.B.C.", "FILE")
```

## Search Profile with FILE

$dirlist and
$ldirlist can have a search profile after the directory or prefix, but only when
used with `FILE`. This profile can contain a dot. This ensures that it can match
both sequential files and PDS members, which have the form
File(Member) with no dot.

However, if you specifically indicate a PDS using
the the `@` prefix or parentheses `()` in the profile, only members
of PDSs are returned; sequential files will never match this profile.

After retrieving the list from the system,
$dirlist and $ldirlist always apply the search profile (if
specified) and eliminates all entries that do not match it.

The valid wildcards are GOLD \* and GOLD ? . If the
specified directory does not end with a directory separator (`/`,`\`,
`]`, or `.`), everything after the last separator is taken to be the
search profile.

If DirPath does not specify a
prefix, Uniface prefixes DirPath with `TSO:`.

## DIR

When `DIR` is specified as the
Topic, $dirlist and $ldirlist return:

* All prefixes for which datasets exist with
  three or more additional segments in the name.
* All PDS names with the specified prefix; these
  will have `()` appended to their names.

If the DirPath starts with
`@` or ends with `()` to indicate a PDS, $dirlist
and $ldirlist return either an empty list, or a list of prefixes for which
datasets exist that have three or more additional segments in the name. In this case, only the
segment name following the specified DirPath, affixed with a a dot
(`.`) is returned.

## DATASET and MEMBER

If platform-independence is not a concern, you can
use the z/OS-specific topics `DATASET` and `MEMBER` with
$dirlist and $ldirlist.

When `DATASET` is specified, the
returned names are always fully qualified but without the `DSN:` prefix. If these
names are subsequently used in other Proc statements, the `DSN:` prefix must be
specified.

If no PDS indicator is specifed
(`@` prefix or parentheses), $dirlist and
$ldirlist return:

* All datasets that have the specified prefix,
  no matter how many segments follow in the rest of the name.
* PDSs and PDSEs, affixed with
  `()`, but not their members.

If a PDS indicator is specifed, only the indicated
file members are returned, not the PDS itself, nor sequential datasets.

When `MEMBER` is specified, the
specified name must indicate a PDS or PDSE. The returned list contains only member names, no file
or prefix names.

For example, if there is a PDS named
A.B with a single member called C:

* `$ldirlist("DSN:A.B(), "MEMBER")`

  returns `C`
* `$ldirlist("DSN:A.B()",
  "DATASET")`

  returns `A.B(C)`
* `$ldirlist("DSN:A.B()",
  "FILE")`

  returns `B(C)`

In the `DATASET` and
`MEMBER` topics, wildcards can match zero or more dots. Thus:

* `$ldirlist("DSN:A.B.*",
  "DATASET")`

  finds `A.B.C`,
  `A.B.C.D`, `A.B.C.E`, `A.B.C.D.E.F`, and so on.
* `$ldirlist("DSN:A.B.*",
  "FILE")`

  finds `A.B.C` and
  `A.C(B)`, because in `A.B.*`, `B` is the filename part
  and `*` the extension part.

---

# $disable

Return or set the
*selectable* status of a menu item.

$disable

$disable`=`Expression

set |
reset  $disable

## Return Values

| Value | Meaning |
| --- | --- |
| 0 | Menu item is selectable |
| 1 | Menu item is currently not selectable |

If an error occurs,
$procerror contains the exact error.

## Use

Allowed only in the Predisplay trigger of form components (and in
service, session service, entity service, and report components that are not
self-contained).

## Description

The function
$disable is used to make a menu item selectable or
unselectable:

* Set the value to 1 to make the menu
  item unselectable; the menu accelerator key is also disabled. An unselectable
  menu item appears dimmed when the menu is displayed.
* Set the value to 0 to make the menu item selectable.

You can also use
$disable as the target in the left side of an assignment.
For example:

```procscript
$disable=!$disable
```

Since
$disable is essentially a Boolean function, when
 *Expression*  evaluates to a nonzero value,
$disable becomes 1.

The following example makes a menu item unselectable:

```procscript
; trigger: Predisplay
set $disable
```

## Related Topics

- [reset](../procstatements/reset.md)
- [set](../procstatements/set.md)
- [$check](_check.md)
- [$hide](_hide.md)
- [Option](../triggersstandard/option.md)
- [Predisplay](../triggersstandard/predisplay.md)


---

# $display

Return the name of the current display device translation table.

$display

## Return Values

Name of the device translation table being used
for display.

Values commonly returned by $procerror following $display

| Value | Error constant | Meaning |
| --- | --- | --- |
| -33 | <UGENERR\_BATCH\_ONLY> | Statement not allowed in batch mode. Use a test on $batch to avoid this. |
| -1401 | <UPROCERR\_PROMPT> | Prompted field not valid. |
| -1402 | <UPROCERR\_STATEMENT> | Statement not allowed in this trigger. The display statement is not in an Execute trigger. |

## Use

Allowed in form components (and in service,
session service, entity service, and report components that are not self-contained).

## Description

For more information, see [Device Translation Tables](../../../platformsupport/devicetranslation/device_translation_tables_is.md).

## Related Topics

- [$keyboard](_keyboard.md)
- [$DISPLAY](../../../configuration/reference/assignments/display.md)


---

# $displaylength

Return the display length of a String when displayed in the system
character set.

$displaylength
(String)

## Arguments

String—string, or a field (or
indirect reference to a field), a variable, or a function that evaluates to a string.

## Return Values

Display length of the String
when displayed in the system character set, expressed in bytes..

## Use

Allowed in all Uniface component types.

## Related Topics

- [$SYS_CHARSET](../../../configuration/reference/assignments/sys_charset.md)
- [displaylength](../procstatements/display_length.md)


---

# $e

Return the value of e.

$e`()`

## Return Values

Value of e.

## Use

Allowed in all Uniface component types.

## Description

The $e function returns the
mathematical value of e (2.718...).

The following shows an example using the function
$e:

```procscript
$EULER$=$e()
```

---

# $editmode

Return or set a value that determines the degree to which a user can change data on
the form component.

$editmode

$editmode`=``0` | `1` | `2`

## Arguments

| Value | Meaning |
| --- | --- |
| `0` | Edit mode—the form can be used for all I/O purposes. Values can be retrieved and changed by the user. |
| `1` | Query mode— the form can only be used only for query purposes. Values can be entered as profile data, but retrieved values cannot be modified. |
| `2` | Display mode—the form is read-only, and values cannot be entered by the user. |

## Return Values

Returns the current value, which may be the
initial value set by Uniface when the form is activated or a value set in Proc using
$editmode.

The initial value for $editmode
is determined by how the form was activated and displayed:

Initial values returned by $editmode

| Value | Meaning |
| --- | --- |
| 0 | The form is in edit mode. All the following conditions are met:   * The form was started by one of these   methods:    + With an     activate statement (resulting in an implicit newinstance).   + With a     newinstance statement used with the component instance properties     `DISPLAY=FALSE` and `QUERY=FALSE`. * The form becomes active with an   edit statement, or if the Execute trigger is empty (implicit   edit). * The form's Data   Access property is set to a value other than `L (read-only)`. |
| 1 | The form is in query mode. It was started by a newinstance statement, with the component instance property `QUERY=TRUE`, or it was started with an activate statement and the following conditions were met:   * The form's Data   Access property is set to a value other than `L (read-only)`. * The form becomes active with an   edit statement, or if the Execute trigger is empty (implicit   edit). |
| 2 | The form is in display mode and is read-only. *One*  of these conditions is met:   * The form was started with a   newinstance statement used with the component instance property   `DISPLAY=TRUE`. * The form becomes active with a   display statement. |

## Use

Use in Form components.

## Description

The $editmode function returns
or sets the degree to which a user can change data on the form component. Setting
$editmode has immediate effect, and also changes the value of
$runmode.

## Using $editmode

The following example informs the user as to
whether the form is editable or read-only.

```procscript
; Execute trigger 
selectcase $editmode
   case 0
   message/info "This form is editable"
elsecase
   message/info "This form is not editable"
   endselectcase
edit
```

## Setting Form to Display Mode

The following example starts a form in display
mode:

```procscript
operation displayCustomer
; Start display mode for this form.

   $editmode = 2 ; DISPLAY
   edit/modal
end
```

## Changing from Edit Mode to Display Mode

The following example shows how to change from
edit mode to display mode:

```procscript
operation doStore
   ;- store the data and
   ;- keep the user from making any more changes.
   store
   ;- TODO: error trapping ...
   $editmode = 2 ; DISPLAY
end
```

## Related Topics

- [edit](../procstatements/edit.md)
- [$interactive](_interactive.md)
- [newinstance](../procstatements/newinstance.md)


---

# $empty

Check whether an entity or a named area frame is empty.

$empty { `(`Entity
| Frame`)` }

## Parameters

* Entity—name of the entity
  to be queried. If omitted, the current entity is used.
* Frame—name of a named area
  frame. If omitted, the current named area frame is used.

## Return Values

Values Returned by $empty

| Value | Meaning |
| --- | --- |
| 2 | The entity or frame contains only the empty default occurrence; in forms and reports, the property Suppress Print if Empty is true. |
| 1 | The entity or frame contains only the empty default occurrence. |
| 0 | The entity or frame contains at least one occurrence with data in it. |
| "" | The entity or frame does not exist. |

## Use

Allowed in forms, reports, and dynamic and static
server pages, (and in service, session service, and entity service components that are not
self-contained).

## Description

The function $empty allows you
to determine whether the named area frame or entity specified by entity or frame is empty.

An entity or named are frame is considered to be
empty if it contains only the default empty occurrence and no data has been entered. If the default
occurrence contains declarative initial values, it is still considered empty. However, an
occurrence that was created with creocc is considered to be a user occurrence
that contains data.

You can use the $empty function
to determine whether to print a break frame when there is no data in  *Frame*. This is
often preferable to printing an empty entity or area frame. It makes most sense to test whether an
entity has occurrences associated with it before you attempt to print it. For example, in the
Occurrence Gets Focus trigger of an outer entity, you can test whether any (or all) inner entities
have occurrences associated with them.

## Printing Break Frames Based on $empty

The following example prints the break frame
NO\_INVOICES if there are no occurrences of the inner entity INVOICES:

```procscript
; trigger: Occurrence Gets Focus
; entity: CUSTOMERS (the outer entity)

if ($empty(INVOICES) = 2)
   printbreak "NO_INVOICES"
endif
```

## Related Topics

- [print](../procstatements/print.md)
- [printbreak](../procstatements/printbreak.md)
- [Printing from Uniface](../../../platformsupport/printing/printing.md)


---

# $encode

Encrypt data, sign messages with digital signatures, or convert data from one
encoding scheme to another.

$encode`(`Algorithm`,` Source`,` {Key {`,` Mode`,` InitializationVector }
}`)`

## Arguments

| Argument | Description |
| --- | --- |
| Algorithm | Encoding, encryption, or signature algorithm; see [Supported Algorithms](#section_91D611FCBE8C9B9EBAB6A3F1CADDB4CB). |
| Source | Data to be encoded or encrypted.  For signature signing, it is the message to be signed. |
| Key | A key used to encrypt the data or sign a message; required if Algorithm specifies a Hash Message Authentication Code (HMAC) ,asymmetric key encryption or signature scheme, or block cipher. The length of the key must be appropriate to the algorithm.  For encryption with asymmetric key algorithms, it must be a valid public key for the encryption scheme. For signature signing, it must be a valid private key for the signature scheme. |
| Mode | Block cipher mode of operation; required if Algorithm specifies a block cipher. One of:   * `ECB`—electronic code   book (default) * `CBC`—cipher-block   chaining * `CFB`—cipher feedback * `OFB`—output feedback * `CTR`—counter * `CBC_CTS`—CBC cipher   text stealing |
| InitializationVector | A unique data block, such as a time stamp or random number, used in combination with the Key to produce unique output from the same key. Required for all modes except `ECB` |

The Source,
Key, and InitializationVector parameters can specify a
string, variable, or field. If the data type of a variable or field is Raw, it is evaluated as data
type `raw`. Otherwise, it is evaluated as data type `string` .
Optional parameters are ignored if they are irrelevant.

## Return Values

The encoding algorithms return data as a Uniface
`string`: `BASE64`, `HEX`, `URL` or
`USTRING`.

All other algorithms return encoded or encrypted
data in the Uniface `raw` data type, which can handle the null byte (0x00) that the
data may contain. If you need to get the data in the string data type, you can convert it from raw
to string data type using $encode with the `USTRING` or
`HEX` algorithms.

When $encode is used for
message signing, the returned value is the signature data in the Uniface raw data type.

If an error occurs, $procerror
contains a negative value that identifies the exact error. Some errors provide more detailed
information in the `ADDITIONAL` list item in $procerrorcontext.

Values of $procerror commonly returned by $encode

| Value | Error constant | Meaning |
| --- | --- | --- |
| `-1780` | UENCERR\_NO\_ALGORITHM | Algorithm not found. |
| `-1781` | UENCERR\_NO\_SOURCE | Source not found. |
| `-1782` | UENCERR\_NO\_KEY | Key not found. |
| `-1783` | UENCERR\_NO\_IV | IV not found. |
| `-1784` | UENCERR\_INVALID\_ALGORITHM | Invalid algorithm name. |
| `-1785` | UENCERR\_INVALID\_MODE | Invalid mode name. |
| `-1786` | UENCERR\_INVALID\_KEY\_LENGTH | Invalid key length. The key must have a specific length that depends on the algorithm. |
| `-1791` | UENCERR\_GENERAL | Encode/decode general error |
| `-1792` | UENCERR\_INVALID\_SOURCE | Invalid source data |
| `-1793` | UENCERR\_INVALID\_KEY | Invalid key data |
| `-1794` | UENCERR\_INVALID\_KEY\_FORMAT | Invalid key format, must be PEM format |
| `-1795` | UENCERR\_INVALID\_PUBLIC\_KEY | Invalid public key |
| `-1796` | UENCERR\_INVALID\_PRIVATE\_KEY | Invalid private key |
| `-1797` | UENCERR\_INVALID\_IV | Invalid IV data |

## Use

Allowed in all Uniface component types.

## Description

Use $encode to encrypt data,
sign messages with digital signatures, and convert data from one encoding scheme to another. It
supports a variety of commonly-used encryption and signature algorithms including cryptographic
hash functions, hash message authentication codes (HMAC), block ciphers, RSA encryption and
signature schemes, and DSA (Digital Signature Algorithm). For more information, see [Supported Cryptography Algorithms](../../../security/cryptography/cryptographysupport.md).

$encode is useful in
information security applications in which data integrity needs to be protected, or data needs to
be verified or authenticated. For example, you can use $encode to:

* Encrypt data before storing it in a database.
  You can then use $decode when retrieving the information.
* Encode and encrypt confidential data such as
  credit card numbers or passwords to protect their data integrity and for authentication.
* Create digital signatures for messages to
  verify their data integrity and authenticity. (You can use $decode to verify a
  message with a digital signature).

You can also used $encode to
convert data from one encoding scheme to another, because it supports encoding schemes such as
hexadecimal and Base64. For example, you can convert data between Uniface `raw` and
`string` data types using Uniface's internal encoding. Uniface's internal encoding
is UTF-8, so if the input is a string, the converted data will be a conversion of the UTF-8
representation of that string. If the output is a string, the input must be an encrypted or encoded
form of UTF-8.

The following example shows how to convert the raw
output of the MD5 encoding into a more familiar (readable) MD5Digest:

```procscript
; Get the MD5 hash.
vRawHash = $encode("MD5", "abc")
vMD5Hash = $encode("HEX", vRawHash)
```

## Supported Algorithms

The Algorithm parameter specify
must be an algorithm listed in one of the following tables, as a string.

Encoding Schemes

| Algorithm | Meaning |
| --- | --- |
| `BASE64` | Base64 encoding scheme. |
| `HEX` | Hexadecimal encoding scheme. |
| `URL` | URL encoding scheme (also known as *percent encoding*). Used to represent characters which are otherwise not allowed in URIs using allowed characters. |
| `URAW` | Uniface raw data type conversion. Used to convert Uniface data type `String` to Uniface Raw data type. |
| `USTRING` | Uniface string data type conversion. Used to convert Uniface data type `Raw` to data type String |

Supported Hash Functions

| Algorithm | Meaning |
| --- | --- |
| `MD4` | MD4 (Message Digest 4) |
| `MD5` | MD5 (Message Digest 5) |
| `SHA1` | SHA-1 (Secure Hash Algorithm 1) |
| `SHA224` | SHA-224 (Secure Hash Algorithm 224 bit) |
| `SHA256` | SHA-256 (Secure Hash Algorithm 256 bit) |
| `SHA384` | SHA-384 (Secure Hash Algorithm 384 bit) |
| `SHA512` | SHA-512 (Secure Hash Algorithm 512 bit) |

For more information, see [Cryptographic Hash Functions](../../../security/cryptography/cryptographichashfunctions.md).

Supported Hash Message Authentication Codes

| Meaning | Algorithm |
| --- | --- |
| HMAC using MD5 hash | `HMAC_MD5` |
| HMAC using SHA-1 hash | `HMAC_SHA1` |
| HMAC using SHA-2 (224 bits) hash | `HMAC_SHA224` |
| HMAC using SHA-2 (256 bits) hash | `HMAC_SHA256` |
| HMAC using SHA-2 (384 bits) hash | `HMAC_SHA384` |
| HMAC using SHA-2 (512 bits) hash | `HMAC_SHA512` |

For more information, see [Hash Message Authentication Codes (HMAC)](../../../security/cryptography/hmac_codes.md).

Supported Block Ciphers

| Algorithm | Meaning |
| --- | --- |
| `AES` | Advanced Encryption Standard |
| `RIJNDAEL` | Same as AES |
| `DES` | Data Encryption Standard |
| `TDES` | Triple Data Encryption Algorithm (TDEA) as known as Triple DES |
| `DES_EDE3` | Same as TDES |
| `DES_EDE2` | Variant of TDES with 16 byte key length |
| `DESX` | Variant of DES by XORing extra keys |
| `DES_XEX3` | Same as DESX |
| `BLOWFISH` | Blowfish |
| `TWOFISH` | Twofish |

For more information, see [Block Ciphers](../../../security/cryptography/block_ciphers.md).

Supported RSA Algorithms

| Algorithm | Meaning |
| --- | --- |
| `RSAES_OAEP_SHA1` | RSA Encryption Scheme based on Optimal Asymmetric Encryption Padding with SHA-1 hash function |
| `RSAES_OAEP_SHA224` | RSA Encryption Scheme based on Optimal Asymmetric Encryption Padding with SHA-224 hash function |
| `RSAES_OAEP_SHA256` | RSA Encryption Scheme based on Optimal Asymmetric Encryption Padding with SHA-256 hash function |
| `RSAES_OAEP_SHA384` | RSA Encryption Scheme based on Optimal Asymmetric Encryption Padding with SHA-384 hash function |
| `RSAES_OAEP_SHA512` | RSA Encryption Scheme based on Optimal Asymmetric Encryption Padding with SHA-512 hash function |
| `RSAES_PKCS1V15` | RSA Encryption Scheme based on PKCS #1 v1.5 |
| `RSASSA_PSS_SHA1` | RSA Signature Scheme with Appendix based on Probabilistic Signature Scheme with SHA-1 hash function |
| `RSASSA_PSS_SHA224` | RSA Signature Scheme with Appendix based on Probabilistic Signature Scheme with SHA-224 hash function |
| `RSASSA_PSS_SHA256` | RSA Signature Scheme with Appendix based on Probabilistic Signature Scheme with SHA-256 hash function |
| `RSASSA_PSS_SHA384` | RSA Signature Scheme with Appendix based on Probabilistic Signature Scheme with SHA-384 hash function |
| `RSASSA_PSS_SHA512` | RSA Signature Scheme with Appendix based on Probabilistic Signature Scheme with SHA-512 hash function |
| `RSASSA_PKCS1V15_MD2` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with MD2 hash function. This is only for compatibility. |
| `RSASSA_PKCS1V15_MD5` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with MD5 hash function. This is only for compatibility. |
| `RSASSA_PKCS1V15_SHA1` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with SHA-1 hash function |
| `RSASSA_PKCS1V15_SHA224` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with SHA-224 hash function |
| `RSASSA_PKCS1V15_SHA256` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with SHA-256 hash function |
| `RSASSA_PKCS1V15_SHA384` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with SHA-384 hash function |
| `RSASSA_PKCS1V15_SHA512` | RSA Signature Scheme with Appendix based on PKCS #1 v1.5 with SHA-512 hash function |

For more information, see [RSA Asymmetric Key Cryptography](../../../security/cryptography/rsa_cryptography.md).

Supported DSA Algorithms

| Algorithm | Meaning |
| --- | --- |
| `DSA_SHA1` | Digital Signature Algorithm with SHA-1 hash function |
| `DSA_SHA224` | Digital Signature Algorithm with SHA-224 hash function |
| `DSA_SHA256` | Digital Signature Algorithm with SHA-256 hash function |
| `DSA_SHA384` | Digital Signature Algorithm with SHA-384 hash function |
| `DSA_SHA512` | Digital Signature Algorithm with SHA-512 hash function |

For more information, see  [Digital Signature Algorithm (DSA)](../../../security/cryptography/dsa.md).

## Encoding Using Hash Functions and HMAC

```procscript
; Get the MD5 hash.
vRawHash = $encode("MD5", "abc")
vMD5Hash = $encode("HEX", vRawHash)

; Get the SHA1 hash in the hexadecimal format.
vSha1 = $encode("SHA1", "abc")
vHexStr = $encode("HEX", vSha1)

; Get the HMAC with SHA1 hash.
vHmac = $encode("HMAC_SHA1", F1, "vKey1")
```

## Encrypt and Decrypt String Data

$decode returns raw data, so
you can use $encode with the `USTRING` algorithm to convert it to
a string data type using Uniface internal encoding, UTF-8.

```procscript
vEnc = $encode("BLOWFISH", "~home", "secret key")  ;encrypt the data
vRawData = $decode("BLOWFISH", vEnc, "secret key") ;decrypt the data
vStrgData = $encode("USTRING", vRawData)  ;convert the decrypted data from Raw to String
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |
| 9.5.01, E101 | Added support for `HMAC SHA224`, `SHA256`, `SHA384`, `SHA512` |

## Related Topics

- [$decode](_decode.md)
- [$procerrorcontext](_procerrorcontext.md)
- [Protecting Your Application](../../../security/protectingdata.md)
- [Supported Cryptography Algorithms](../../../security/cryptography/cryptographysupport.md)
- [Proc: Data Types](../procdatatypes/datatypes.md)


---

# $entinfo

Return information about an entity.

$entinfo`(`Entity`,` Topic`)`

## Parameters

* *Entity* —entity name; can be a
  literal name, string, variable, function, parameter, or indirect reference to a field.
* *Topic* —valid topic name (see
  *Return values*); can be a string, or a field (or indirect reference to a field), a
  variable, or a function that evaluates to a string. The topic name is not case-sensitive; you can
  use uppercase or lowercase letters, or any combination of these, to increase readability.

## Return Values

Values Returned by $entinfo per Topic

| Topic | Return value |
| --- | --- |
| `DATAACCESS` | Letter `D` or `E`, indicating whether the Data Access property of the entity is set to DBMS Path (`"D"`) or Entity Service (`"E"`) |
| `DBMSPATH` | The three-letter path abbreviation for the DBMS path assigned to  *Entity*  in the application model (for example `"ORA"` or `"IDF"`) or the string `"Not in Database"` if  *Entity*  is defined as Not in Database. |
| `INNER` | A list of entities painted directly inside  *Entity* . An empty string ("") is returned if there are no inner entities. |
| `OBJECTSERVICE` | The entity service name defined for the requested object Entity. An empty string ("") is returned if Entity is not an object entity. |
| `OUTER` | The name of the outer entity. An empty string ("") is returned if  *Entity*  is the outer entity.  This replaces the function `$outer`. |
| `PAINTEDFIELDS` | A list of fields painted within this entity. |
| `SUPERTYPE` | The name of the supertype entity for  *Entity* . An empty string ("") is returned if there is no supertype (that is, *Entity*  is the supertype.) |

An empty string ("") is returned if an error
occurred, in which case, $procerror contains a negative value that identifies
the exact error.

Values of $procerror Commonly Returned Following $entinfo

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | UPROCERR\_ENTITY | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1110 | UPROCERR\_TOPIC | Topic name not known. |

## Use

Allowed in all Uniface component types.

## Description

The $entinfo function is
especially useful in writing generalized operations and global Procs where the information needs to
be determined at run time rather than built into the component.

## Setting Field Colors of the Current Entity

The following example sets the color for all
painted fields of the current entity to yellow letters on a purple background.

```procscript
operation MAKE_COLORFUL
variables
   string LIST_OF_FIELDS
   string FIELD
endvariables

LIST_OF_FIELDS = $entinfo($entname, "PAINTEDFIELDS")
while (LIST_OF_FIELDS != "")
   getitem FIELD, LIST_OF_FIELDS, -1
   ; give this field bright colors
   fieldvideo FIELD, "COL=53"
   delitem LIST_OF_FIELDS, -1
endwhile
end
```

---

# $entityproperties

Return or set the current widget properties of an entity.

$entityproperties`(`Entity`)`

$entityproperties`(`Entity`)``=`Properties

## Parameters

* Entity—entity name;
  optional; can be a literal name, a string, a variable, function, parameter, or indirect reference
  to a field containing the name. It can optionally contain a qualified model name (for example,
  `MYENT.MYMODEL`).
* Properties—string or
  variable containing a Uniface list of desired properties and their corresponding values, in the
  format:

  Property `=`Value
  {`;`Propertyn `=`Valuen}

## Return Values

* Empty string ("") if an error occurred or if
  the default properties have not been changed.

  **Note:**   If an error occurs,
  $procerror does not return a value to indicate the exact error. For example, if
  Entity does not exist in the component, you will receive a compiler warning, but
  not a runtime error.
* Associative list containing the widget
  properties that have been changed from the default widget properties for the specified entity.
  Widget properties can be changed declaratively, or by the $entityproperties
  function itself.

## Use

Allowed in form, report, and dynamic server page
components.

## Description

The $EntityProperties function
enables you to control the appearance of all occurrences of the current entity at runtime. The
entity properties that can be addressed by $EntityProperties depend on the
target presentation platform, the component type, and the widget (if there is one).

Properties of the following widgets are
supported:

* In Form components: default entity widget and
  Grid widget. For more information, see [Default Entity Widget](../../../_reference/widgets/defentitywin.md) and [Grid](../../../_reference/widgets/grid.md).
* In Dynamic Server Page components: default
  entity widget. For more information, see [Entity and Occurrence Properties in Dynamic Server Pages](../../../_reference/widgetsdsp/dsp_defentity.md).

**Note:**  Entity properties cannot be set in Static Server
Pages. In this case, properties set with $EntityProperties are ignored.

For each property, Uniface looks for it in the
property string returned by $EntityProperties. If the property is not there, it
is sought in the declarative properties, and finally in the .ini
properties.

$EntityProperties returns only
properties that have been explicitly set, either by a previous Proc function, or declaratively in
the Development Environment.

Each time that a component is restarted, these
properties are reset to the compiled values, which are the default properties, plus the properties
set for the entity declaratively. In form components that have the Keep Data in
Memory property selected, these properties are not reset.

## Setting Grid Widget Properties

The following statement turns row headers and
numbering off and makes field borders visible around each cell in the grid widget.

```procscript
;Execute trigger
...
$entityproperties = "RowHeadersVisible= F;RowNumbering = F;FieldBorders = T"
edit
```

## Setting Entity Colors

The following example demonstrates the effect of
setting entity properties using the $EntityProperties and
$CurEntProperties. In this case, an outer entity BOOK has an inner entity
AUTHOR.

```procscript
setocc "BOOK", 2 
$EntityProperties("BOOK") = "backcolor=pink"     
$CurEntProperties("AUTHOR") = "backcolor=lightgreen"
```

1. Make the second occurrence of BOOK the current
   occurrence.
2. Set the color of all BOOK entities.
3. Set the color of the AUTHOR entity in the
   current occurrence to a different color

Result

## Related Topics

- [$CurEntProperties](_curentproperties.md)
- [Entity Widget Properties](../../../componentconstruction/entitywidgetproperties.md)


---

# $entname

Return the name of the current entity or check for the existence of an entity in the
component.

$entname
{`(`Entity`)` }

## Parameters

Entity—name of an entity; can
be a string, or field, variable, function, or parameter that evaluates to a string that contains
the name of an entity. If omitted, the current entity is used.

## Return Values

* If Entity is not present,
  $entname returns the name of the current entity (in uppercase). If there is no
  current entity (that is, if the last node of the active path is not a field or entity),
  $entname returns an empty string ("").
* If Entity is present,
  $entname returns the name of the entity if it is present in the component,
  otherwise $entname returns an empty string ("").

## Use

Allowed in all Uniface component types.

## Description

The $entname function is
useful when you are writing global Procs, because it allows you to generalize your code. It is also
useful to examine this function when you are using the Proc debugger to step through Proc
statements.

## Inserting a New Occurrence

The following example shows a global Proc that
can be used in the Add/Insert Occurrence trigger to insert a new occurrence before the first
occurrence or to add a new occurrence after the last occurrence:

```procscript
; trigger: Add/Insert Occurrence

call AI_OCC()
if ($rettype = 65)
   creocc $entname, -1
else
   creocc $entname, 1
endif
done
```

## Testing a Condition

$entname returns the current entity name, and that may not always be the entity you expect. For example, if ENTITY1 occurs before ENTITY 2 in the component structure, retrieving data for ENTITY2 does not make it the current entity. You can ensure that you are dealing with the correct entity by using `setocc`.

```procscript
retrieve ENTITY2
if ($entname = "ENTITY1")
    setocc "ENTITY2"
endif
...
```

## Related Topics

- [$applname](_applname.md)
- [$curocc](_curocc.md)
- [$fieldname](_fieldname.md)
- [$instancename](_instancename.md)
- [$rettype](_rettype.md)


---

# $equalStructRefs

Checks whether two variables of type struct reference the same physical
Struct.

$equalStructRefs`(`Struct1`,`Struct2`)`

## Parameters

Struct1 and
Struct2—variables of type struct

## Return Values

Returns true if and only if
Struct1 and Struct2 refer to the same Struct; in all other
cases it returns False.

## Use

Allowed in all Uniface component types.

## Description

Use $equalStructRefs to compare
Structs by reference. For more information, see [Comparing Structs](../../structs/workingwithstructs/comparingstructs.md).

## $equalStructRefs

```procscript
if ($equalStructRefs(vStructA, vStructB) != 1)
  <do something> 
endif
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [Comparing Structs](../../structs/workingwithstructs/comparingstructs.md)


---

# $error

Return the Uniface message number for the error.

$error

## Return Values

Uniface message number for the current field or
entity data input error error.

## Use

Allowed only in On Error trigger (entity-level or
field-level) in form, service, session service, entity service, and report components.

Depending on the error code, you may choose to
implement functionality above that of providing a meaningful error message. In the following
example, a form listing all the valid codes is displayed if the user enters a code that is not
allowed:

```procscript
; trigger: On Error
if ($error = 0126)
   message "Incorrect code. Select one from list with ^ACCEPT."
   run "CODES" ;start other form
   if ($status = 1) ;user did ^ACCEPT
      TYPECD = $1 ;copy selected value back&#SPACE;down
      return (0) ;allow the user to continue
   else
      message "No code selected."
      return (-1) ;still wrong, so prevent leaving
   endif
else
   message $text("%%$error") ;catch all other errors
   return (-1)
endif
```

## Related Topics

- [$dberror](_dberror.md)
- [$entname](_entname.md)
- [On Error (Entity)](../triggersstandard/onerror.md)
- [On Error (Field)](../triggersstandard/onerror2.md)


---

# $exp

Return the exponential of X (e X ).

$exp`(`X`)`

## Parameters

X—numeric constant, or a field
(or indirect reference to a field), variable, function, or expression that evaluates to a numeric
value.

The result must be in the range 10 -9999 through 10 9999 , which means that X must be in the range
(approximately) -23,025.85 through +23,025.85.

## Return Values

Exponential value of X.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $exp and
$exp10

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1207 | <UPROCERR\_UNDERFLOW> | Underflow. |
| -1208 | <UPROCERR\_OVERFLOW> | Overflow. |

## Use

Allowed in all Uniface component types.

## Description

The function $exp returns the
exponential of X, that is, e raised to the power X.

The following example returns the exponential of
the given expression:

```procscript
; is > nth root of n for all positive n

$EXPOF$ = $exp(1 / e())
```

## Related Topics

- [$log](log.md)


---

# $exp10

Return the base 10 exponential of X (10X).

$exp10`(`X`)`

## Parameters

X—numeric constant from -9999 through
+9999, or a field (or indirect reference to a field), variable, function, or
expression that evaluates to a numeric value.

## Return Values

Base 10 exponential of
X (10 raised to the power
X).

If an error occurs,
$procerror contains a negative value that identifies the
exact error.

Values of $procerror Commonly Returned Following $exp and
$exp10

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1207 | <UPROCERR\_UNDERFLOW> | Underflow. |
| -1208 | <UPROCERR\_OVERFLOW> | Overflow. |

## Use

Allowed in form, service, session service, entity service, and
report components.

## Description

The result of
$exp10 must be in the range 10-9999 through
109999, which means that
X must be in the range -9999 through +9999.

## Related Topics

- [$log10](log10.md)


---

# $expression

Return the result of evaluating a nonconditional expression.

$expression`(`Expression
{`,` DataList}`)`

## Parameters

* Expression—any legal
  non-conditional Proc expression or compiled non-conditional expression; can be a string, or a field
  (or indirect reference to a field), a variable, or a function that evaluates to a string.

  + Only Proc allowed in the current
    component type can be used. For example, an expression that includes
    $fieldendmod cannot be used in a report or service.
  + Each operand in the expression must
    evaluate directly to a numeric value, so an operand cannot contain yet another expression.
  + Any field referred to must be included in
    the field list for the component entity.
  + Variables included in
    Expression must be in scope.
* DataList—optional
  associative list used to substitute variables (or fields) in the expression with data. This works
  just like the string substitution.

## Return Values

$expression returns the result
of evaluating Expression.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $condition and
$expression

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

The $expression function
evaluates a non-conditional expression. The expression is parsed at run time and evaluated as if it
were a compiled expression; in other words, the expression is *interpreted* .

## Optional Argument List for $expression

The following example explains the use of the
optional argument DataList for expression:

```procscript
$2="one=1;two=2;three=3"
```

```procscript
$1=$expression("one+two+three", $2)
```

`$1` evaluates to the value
`6`.

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

- [$condition](condition.md)
- [Dynamic Validation](../../../howunifaceworks/datavalidation/dynamic_validation.md)


---

# $fact

Calculate the factorial of X (X!).

$fact`(`X`)`

## Parameters

X—positive integer constant,
or a field (or indirect reference to a field), a variable, or a function or expression that can be
converted to a positive, whole (integer) number.

The result of $fact must be
less than 1 \* 10 9999 , which means that X must be positive and less
than 3249.

## Return Values

Calculated factorial of X.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $fact

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1204 | <UPROCERR\_NEGATIVE> | Negative value not allowed. |
| -1206 | <UPROCERR\_INTEGER> | Not an integer. |
| -1208 | <UPROCERR\_OVERFLOW> | Overflow. |

## Use

Allowed in all Uniface component types.

The following example returns the factorial of
13:

```procscript
$FACTOR$ = $fact(13)
```

---

# $fieldcheck

Return or set the requirement for field checking.

$fieldcheck { `(`Field`)` }

$fieldcheck { `(`Field`)` }
 = Expression

set | reset  $fieldcheck { `(`Field`)` }

## Parameters

Field—field name; optional; can
be a literal name, string, variable, function, parameter or reference to a field. It can
optionally contain a qualified field name, for example `MYFLD.MYENT`. If omitted,
the current field is used.

## Return Values

Values returned in $fieldcheck

| Value | Meaning |
| --- | --- |
| 0 | 0, if field checking is *not*  currently enabled. |
| 1 | 1, if field checking is currently enabled. |

When $fieldcheck is used as the
target of an assignment, $status is set:

Values returned in $status

| Value | Meaning |
| --- | --- |
| "" | Field checking could not be enabled. This usually means that Field is not present, or does not exist. |
| 1 | Field checking was successfully enabled. |

If an error occurs $procerror
contains a negative value that identifies the exact error.

Values of
$procerror Commonly Returned Following Field-Level ProcScript Functions

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |

## Use

Allowed in all Uniface component types.

## Description

$fieldcheck returns a value
that indicates whether validation should be carried out for Field the next time
it occurs.

If $fieldcheck indicates that
validation is demanded, validation is performed regardless of whether validation is actually
required. (Validation is required when both $fieldmod and
$fieldvalidation are 1, indicating that the field has been modified, but has not
yet been validated).

Validation can occur when the user leaves the
field (for example, with ^NEXT\_FIELD, ^PREV\_FIELD, or a mouse click); when an explicit validation
statement is encountered (for example, validatefield); or when a
store statement is encountered. It includes syntax checks, the activation of the
Validate Field trigger, and, in forms only, the activation of the Leave Field trigger. After
validation completes, $fieldcheck is set to 0.

## Changing the Value of $fieldcheck

You can also use $fieldcheck
as the target in the left-hand side of an assignment. Set $fieldcheck to 1 to
require syntax checks for the specified field; set it to 0 to let Uniface take responsibility for
validation. For example:

```procscript
$fieldcheck=!$fieldcheck
```

Since $fieldcheck is
essentially a Boolean function, when Expression evaluates to a nonzero value,
$fieldcheck becomes 1.

The following example shows this function being used in the Occurrence Gets Focus
trigger:

```procscript
; trigger: Occurrence Gets Focus

set $fieldcheck(CUST_NUMBER.CUSTOMER)
```

## Related Topics

- [validate](../procstatements/validate.md)
- [validatefield](../procstatements/validatefield.md)
- [validatekey](../procstatements/validatekey.md)
- [validateocc](../procstatements/validateocc.md)
- [$fieldendmod](_fieldendmod.md)
- [$fieldmod](_fieldmod.md)
- [$fieldvalidation](_fieldvalidation.md)
- [$keycheck](_keycheck.md)
- [$keymod](_keymod.md)
- [$keyvalidation](_keyvalidation.md)
- [$occcheck](_occcheck.md)
- [$occmod](_occmod.md)
- [$occvalidation](_occvalidation.md)
- [Leave Field](../triggersstandard/leavefield.md)
- [Validate Field](../triggersstandard/validatefield.md)


---

# $fielddbmod

Return the modification status of a database field.

$fielddbmod { `(`Field`)` }

## Parameters

Field—field name; optional;
can be a literal name, or a string, variable, function, parameter or indirect reference to a field
containing the name. It can optionally contain a qualified field name, for example
`MYFLD.MYENT`. If omitted, the current field is used.

## Return Values

Values returned by $fielddbmod

| Value | Meaning |
| --- | --- |
| 1 | Modified. |
| 0 | Not modified, not a database field, or a read-only field. |
| "" | An error occurred. |

If an error occurs $procerror
contains a negative value that identifies the exact error.

Values of
$procerror Commonly Returned Following Field-Level ProcScript Functions

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |

## Use

Allowed in form and service components (and in
report components that are not self-contained).

## Description

The $fielddbmod function is
set to 0 in the following circumstances:

* Each time a component is restarted (except
  when the component has Keep Data in Memory clicked  *on* ). I
* The following Proc statements

  clear

  erase

  release

  reload

  retrieve

  store

## Events that Modify a Field

Events that cause a field to be recognized as
modified include such things as:

* The user entering a retrieve profile in an
  empty field. (This means that $fieldmod can be set to 1  *before*  a
  retrieve has been performed.)
* The user changing the value of data that has
  been retrieved.
* Modification of a non-database occurrence
  made by a Proc assignment (=) without the /init switch.

The following example checks the value of
$fielddbmod for the field DISCOUNT. If the value has been modified, the field
TOTAL\_PRICE is recalculated. The processing takes place in the Leave Modified Occurrence trigger,
as the value of TOTAL\_PRICE depends on several fields.

```procscript
; trigger: Leave Modified Occurrence
if ($fielddbmod(DISCOUNT) = 1)
   TOTAL_PRICE = DISCOUNT * ORDER_SIZE * UNIT_PRICE
endif
```

## Related Topics

- [$fieldendmod](_fieldendmod.md)


---

# $fielddbvalue

Return the original value of a field as it was retrieved from the database.

$fielddbvalue { `(`Field`)` }

## Parameters

Field—field in the current
occurrence of the current entity; optional; can be a literal name, or a string, variable, function,
parameter, or indirect reference to a field. It can optionally contain a qualified field name, for
example `MYFLD.MYENT`. If omitted, the current field is used.

## Return Values

* Original field value as retrieved from the
  database.
* Empty string ("") if an error occurs;
  $procerror contains a negative value that identifies the exact error. However,
  if the original field value is empty, $procerror is also empty.

Values of $procerror Commonly Returned Following $fielddbvalue

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | UPROCERR\_FIELD | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| -1102 | UPROCERR\_ENTITY | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

The $fielddbvalue function is
successful only if the occurrence was retrieved from a database and Field is a
valid database field.

**Note:**  Do not use $fielddbvalue in
the Delete trigger. This will lead to problems such as infinite looping or an incorrect value for
$fielddbvalue.

If you need to access field values while deleting
occurrences:

* In forms, program validation in the Remove
  Occurrence trigger before the remocc statement.
* In services and reports, program validation
  before the store statement.

## Using $fielddbvalue

The following example can be used in the Validate
Field trigger of a field in an entity service:

```procscript
;trigger Validate Field 
vDbField = $fielddbvalue(F1)
if (!vDbField && !$procerror)
   if ($abs(F1 - vDbField)/F1 > 10)
      return (-1) ;too big a change
   endif
endif
end
```

---

# $fieldendmod

Return the modification status of a field when the field is exited.

$fieldendmod

## Return Values

| Value | Meaning |
| --- | --- |
| 0 | field has not been modified |
| 1 | field has been modified or if $fieldendmod has been set for the current field. |

## Use

Allowed only in the Leave Field trigger of form components, .

## Description

The
$fieldendmod indicates whether the user has modified data
in the field. It is set to 0 in the following circumstances:

* When the user enters the field.
* By resetting the
  $fieldcheck function.
* When data of a field is modified in Proc.
* Each time a
  component is restarted (except when the component has
  Keep Data in Memory clicked
  *on*).
* By the following Proc
  statements

  + clear
  + erase
  + release
  + reload
  + retrieve
  + store

In
contrast, the function
$fieldmod indicates whether data has been modified during
its lifetime in the component. For example, if the user modifies a field and
leaves it,
$fieldendmod is 1 (in the Leave Field trigger);
$fieldmod is also 1. If the user then returns to the field
and leaves it again without changing it,
$fieldendmod is 0, while
$fieldmod remains 1.

The following example
checks the value of
$fieldendmod , then checks to make sure that the value of
the field is less than 120:

```procscript
; trigger: Leave Field (of field AGE)

if ($fieldendmod = 1)
   if (AGE >= 120)
      message "That is far too old!"
      return -1
   endif
endif
```

## Related Topics

- [$fieldcheck](_fieldcheck.md)
- [$occmod](_occmod.md)
- [Leave Field](../triggersstandard/leavefield.md)


---

# $fieldhandle

Return a partner handle to the widget that is currently bound to the specified field
of the current occurrence.

$fieldhandle {
`(`Field`)` }

## Parameters

Parameters

| Parameter | Data Type | Description |
| --- | --- | --- |
| Field | String | Field name. If omitted, the current field is used. |

## Return Values

* Partner Handle of the field.
* A NULL handle is returned if
  Field is not a valid field, or if an error occurs during the evaluation of this
  function. $procerror contains a negative value that identifies the exact error.

Values Commonly Returned by $procerror after
$fieldhandle and $widgetoperation

| Value | Error constant | Meaning |
| --- | --- | --- |
| `-1101` | `UPROCERR_FIELD` | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| `-1113` | `PROCERR_PARAMETER` | Parameter is not valid, for example, an empty string (`""`) |
| `-1118` | `UPROCERR_ARGUMENT` | The argument specified is incorrect. For example, there is no mapping between the Uniface and JavaScript data type of a parameter. |
| `-1120` | `UPROCERR_OPERATION` | The operation name provided is not valid. |
| `-1123` | `UPROCERR_NPARAMETERS` | Wrong number of parameters |
| `-1418` | `UPROCERR_FIELD_NOT_VISIBLE` | Field is not visible |
| `-1419` | `UPROCERR_WIDGETOPERATION` | Widget operation not valid |

## Use

Use in form components only.

## Description

By definition, a widget is fixed to the screen and
is always in view, whereas fields are part of the occurrences in the hitlist. Scrolling through
multiple occurrences causes a different field (and its data and properties) to be bound to the
widget as the data is scrolled. Thus, $fieldhandle creates a partner handle for
the widget that is currently bound to the current occurrence of a field.

To get handles to multiple occurrences, you need
to use setocc before $fieldhandle. For example:

```procscript
;vHandle1 and vHandle2 are variables of type partner handle

; get handle of F1 in the first occurrence:
setocc "ENT.MODEL", 1
vHandle1 = $fieldhandle(F1) 

; get handle of F1 in the third occurrence:
setocc "ENT.MODEL", 3
vHandle2 = $fieldhandle(F1)
```

Handles are usually used to activate operations on
the referenced object. However, the $fieldhandle function is used only to access
widget operations via the $widgetoperation function:

$fieldhandle`(`Field`)->`$widgetoperation`(`WidgetOperation`{,`Params`})`

Some widgets have predefined widget operations
which can be invoked using $fieldhandle. These operations enable you to
manipulate the content of the widget, which is not necessarily the same as the content of the
field. For more information, see [$widgetoperation](_widgetoperation.md).

| Version | Change |
| --- | --- |
| 9.6.01 | Introduced |

## Related Topics

- [$widgetoperation](_widgetoperation.md)
- [Handles](../../handles/handles2.md)
- [HTML Widget](../../../_reference/widgets/htmlwidget.md)
- [Output Box](../../../_reference/widgets/outputbox.md)


---

# $fieldindb

Return an indication if a field is a database field.

$fieldindb { `(`Field`)` }

## Parameters

Field—field name; optional;
can be a literal nam, a string, or a variable, function, parameter or indirect reference to a
field. It can optionally contain a qualified field name, for example `MYFLD.MYENT`.
If omitted, the current field is used; in this case, $fieldindb can be used only
in field-level triggers.

## Return Values

Values returned by $fieldindb

| Value | Meaning |
| --- | --- |
| 1 | The field is a database field (TRUE). |
| 0 | The field is not a database field (FALSE). |
| "" | An error occurred. |

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $fieldindb

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | UPROCERR\_FIELD | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |

## Use

Allowed in all Uniface component types.

## Description

The function $fieldindb
returns an indication if a field is a database field, that is, if the Characteristics property of
the component field is `Database`.

## Setting Video Attribute of a Field

The following Proc code causes MYFIELD to blink if it is a database field:

```procscript
if ($fieldindb(MYFIELD.MYENTITY))
   fieldvideo MYFIELD.MYENTITY, "BLI"
endif
```

## Related Topics

- [$fieldname](_fieldname.md)


---

# $fieldinfo

Return information about a field.

$fieldinfo`(`Field`,` Topic`)`

## Parameters

* Field—field name; can be a
  literal name, a string, or a field (or indirect reference to a field), a variable, or a function
  that evaluates to a string. Fieldcan optionally contain a qualified field name,
  for example `MYFLD.MYENT`.
* Topic—valid topic name;
  one of: `CHARACTERISTIC`, `DATATYPE`, `PAINTED`, or
  `SYNTAX`; can be a string, or a field (or indirect reference to a field), a
  variable, or a function that evaluates to a string. The topic name is not case-sensitive; you can
  use uppercase or lowercase letters, or any combination of these, to increase readability.

## Return Values

Values Returned by $fieldinfo per Topic

| Topic | Return Value |
| --- | --- |
| `CHARACTERISTICS` | One of the following strings, as appropriate: `Database`, `Not in database`, `Control`, or `Boilerplate` |
| `DATATYPE` | One of the following strings, as appropriate: `Boolean`, `Date`, `Datetime`, `Float`, `Image`, `LinearDate`, `LinearDatetime`, `LinearTime`, `Numeric`, `Raw`, `String`, or `Time` |
| `PAINTED` | `1` if Field is painted (TRUE)  `0` if Field is not painted (FALSE) |
| `SYNTAX` | Associative list of applicable field syntax codes, as defined in the Repository. Only the following codes can be returned: `HID`, `NED`, `NDI`, `NPR` and `DIM`  The returned value is not affected by fieldsyntax or $fieldsyntax. |

An empty string ("") is returned if an error
occurred, in which case, $procerror contains a negative value that identifies
the exact error.

Values of $procerror Commonly Returned Following $fieldinfo

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | UPROCERR\_FIELD | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| -1110 | UPROCERR\_TOPIC | Topic name not known. |

## Use

Allowed in all Uniface component types.

## Description

This function is especially useful in writing
generalized operations and global Procs where the information needs to be determined at run time
rather than built into the component.

## $fieldinfo

In the following example, the initial value for a field is removed before retrieving,
whenever that field is not painted:

```procscript
; CUS_TYPE.CUSTOMER has initial value "Normal"
; If field is not painted, remove the initial value before retrieving

if ($dbocc = 0) ; not a db occurrence
   if ($fieldinfo(CUS_TYPE.CUSTOMER, "PAINTED") != 0)
      CUS_TYPE.CUSTOMER/init = ""
   endif
endif
retrieve
```

## Related Topics

- [$entinfo](_entinfo.md)
- [$fieldsyntax](_fieldsyntax.md)


---

# $fieldmod

Return the modification status of a field.

$fieldmod { `(`Field`)` }

## Parameters

Field—field name; optional;
can be a literal name, or a string, variable, functiona, paraterm or indierct reference to a field.
it can optionally contain a qualified field name, for example `MYFLD.MYENT`. If
omitted, the current field is used.

## Return Values

Values Returned by $fieldmod

| Value | Meaning |
| --- | --- |
| 1 | Modified. |
| 0 | Not modified. |
| "" | An error occurred. |

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $fieldmod

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | UPROCERR\_FIELD | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |

The function $fieldmod is set
to 0 in the following circumstances:

* Each time a component is restarted (except
  when the component has Keep Data in Memory clicked  *on* ).
* By the following statements:

  clear

  erase

  release

  reload

  retrieve

  store

## Use

Allowed in all Uniface component types.

## Description

Events that cause a field to be recognized as
modified include such things as:

* The user entering a retrieve profile in an
  empty field. (This means that $fieldmod can be set to 1 *before* a
  retrieve has been performed.)
* The user changing the value of data that has
  been retrieved.
* Modification of a non-database occurrence
  made by a Proc assignment (`=`) without the /init switch.

## Calculating Total Price

The following example checks the value of $fieldmod for the field
DISCOUNT. If the value has been modified, the field TOTAL\_PRICE is recalculated. The processing
takes place in the Leave Modified Occurrence trigger, as the value of TOTAL\_PRICE depends on
several fields.

```procscript
; trigger: Leave Modified Occurrence
if ($fieldmod(DISCOUNT) = 1)
  TOTAL_PRICE = DISCOUNT * ORDER_SIZE * UNIT_PRICE
endif
```

## Related Topics

- [$fieldendmod](_fieldendmod.md)


---

# $fieldname

Return the name of the current field or check for the presence of a specified field in
the component.

$fieldname
{`(`Field`)` }

## Parameters

Field—name of a field; can be
a string, variable, function, or parameter that evaluates to a string that contains the name of a
field. If omitted, the current field is used.

## Return Values

$fieldname returns:

* Name of the current field if
  Field is not specified. If there is no current field (that is, if the last node
  of the active path is not a field), $fieldname sets
  $procerror to `-1101`.
* Name of the field, if Field
  is specified and the field is present in the component.

If an error occurs $procerror
contains a negative value that identifies the exact error.

Values of
$procerror Commonly Returned Following Field-Level ProcScript Functions

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |

## Use

Allowed in forms

**Note:**   In server pages, services, and reports fields
the last node of the active path is never a field (the field never has focus). This means that
$fieldname always sets $procerror to `-1101`.

## Description

The $fieldname function is
useful for writing global Proc that performs field-level actions.

If you use a help message naming convention of
`FieldName_HLP`, you can use the following Proc statement in the
model definition of the Help trigger for the field:

```procscript
; trigger: Help

help $text("%%$fieldname%%%_HLP")
```

## Related Topics

- [$applname](_applname.md)
- [$entname](_entname.md)
- [$instancename](_instancename.md)
- [Help (Field)](../triggersstandard/help2.md)


---

# $fieldprofile

Return a value that indicates whether the user has entered a profile character in a
field.

$fieldprofile`(`Field`)`

## Parameters

Field—field name; can be a
literal name, or a string, variable, function, parameter, or indirect reference to a field. It can
optionally contain a qualified field name, for example `MYFLD.MYENT`.

## Return Values

Values Returned by $fieldprofile

| Value | Meaning |
| --- | --- |
| 1 | A profile character has been entered. |
| 0 | No profile character has been entered. |
| "" | An error occurred. |

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $fieldprofile

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | UPROCERR\_FIELD | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

The $fieldprofile function only
returns a meaningful value when the user leaves the current field or has left the referenced field.

When using $fieldprofile to
check the current field, it is best used in the Validate Field or Leave Field triggers.

## Calling Proc Modules

In this example, $fieldprofile is used to call either a search Proc
module or a retrieve Proc module. The command button's field characteristics must be set to
Boilerplate. This allows the command button to receive focus and reactivate the structure editor.

```procscript
; Detail trigger of SEARCH command button.
; PROFILE is a non-database field used for
; entering search profiles.

if ($fieldprofile("PROFILE") = 0)
   call lp_fetch
elseif ($fieldprofile("PROFILE") = 1)
   call lp_search
else
   call lp_error
endif
```

---

# $fieldproperties

Return or set the current widget properties of an instance of a field.

$fieldproperties
{`(`Field
{`,` PropertyList}`)` }

$fieldproperties
{`(`Field
{`,` PropertyList}`)` } {`=`}
PropertyValuesList

## Parameters

* Field—field name;
  optional. If omitted, the current field is used.
* PropertyList—list of widget
  property names, separated by GOLD ; (`;`); can be a string, or a
  variable, function, or parameter that evaluates to a string, or a field (or indirect reference to a
  field)
* PropertyValuesList—associative list of
  Property=PropertyValue pairs (separated by GOLD ; ), where
  PropertyValue is the value to be assigned to the property identified by
  Property. If PropertyList is present, only those properties
  in PropertyValuesList that are present in PropertyList are
  affected.

## Return Values

* Associative list of widget properties for the
  specified field in the current occurrence. Only properties that have been specified in
  PropertyList are returned.
* Empty string ("") if no widget properties have
  been specified in PropertyList or if the field cannot be found.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned by $fieldproperties

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | UPROCERR\_FIELD | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |

## Use

Allowed in forms, reports, and server pages, and
in service components that are not self-contained

## Description

The function $fieldproperties
returns or sets the dynamic widget properties for the specified field *in the current
occurrence*. Only this single instance of the specified field is affected, and the properties
remain in effect even when this occurrence is no longer the current occurrence.

$fieldproperties can only be
used to set dynamic properties. (For more information about these properties, see the widget
descriptions).

For each widget property, Uniface looks for it in
the property string returned by $fieldproperties. If the property is not there,
it is sought in the declarative properties, and finally in the .ini
properties.

## Restoring Default Property Values

Properties are reset to the compiled values (that
is, the default properties, plus the properties set for the entity declaratively):

* Each time that a component is restarted
  (assuming the Keep Data in Memory property is cleared)
* Whenever all the properties in the component
  are reset with by actions such as clear and retrieve.

They are not reset by actions such as ^NEXT\_FIELD
or ^PREV\_OCC.

If you have used
$fieldproperties to change some property values, and you want to restore them to
their defaults, you can use the following construction:

```procscript
$fieldproperties(vField)=""
```

However, to restore only one specific property,
you can remove it from the list as follows:

```procscript
delitem/id $fieldproperties(vField),"BackColor"
```

## Restoring Default Property Values in DSPs

In dynamic server pages (DSPs), it is possible to
restore the default value of a property by preceding it with an exclamation mark:

$fieldproperties`(`Field`,``!`Property`)`

For example:

```procscript
$fieldproperties(COUNTRY) = "!style:background-color"
```

The default value is the value that the property
had the first time webdefinitions was called. Thereafter, the default value is
remembered by the browser and can no longer be changed.

## Boilerplate Fields and $fieldproperties

The behavior of
$fieldproperties for a field that is defined as boilerplate needs to be
carefully considered. A boilerplate field is not a *dynamic* field that belongs to a
particular occurrence in the component. Instead it should be considered as a *static*
graphical object that belongs to a position on the form where an occurrence can appear. Consider
the following example:

Four occurrences of an entity are painted on a
form. Each occurrence contains a boilerplate field, PIC1. PIC1 is a picture widget with Frame
defined as Off. When the second occurrence has focus, the following statement places a frame around
the image in the second occurrence:

```procscript
$fieldproperties(PIC1)="Frame=True"
```

As you scroll through multiple occurrences, the
second occurrence  *on the screen*  always has the frame. Even after you clear data from
the form, the frame definition remains for the second occurrence.

If PIC1 were not defined as boilerplate, setting
the field properties affects only the current occurrence. As you scroll through multiple
occurrences, the framed picture scrolls with the occurrence that was in the second position on the
screen. After you clear data from the form, there is no longer a frame defined for the second
occurrence.

## $fieldproperties in a Web application

Style references are stored as property values in
the Repository, and can be manipulated with $fieldproperties and
$properties. For dynamic changes to the look and feel of style attributes, use
the `subclass` field-level property, which is checked at runtime and propagated
through the generated HTML. The `subclass` property uses predefined style references
from the Cascading Style Sheet (CSS) used by the Web application.

You can use `subclass` to provide
visual clues for errors, and `errormsg` is used to provide detailed information on
the nature of the error in a server page. To use $fieldproperties for this
purpose, place it in the field-level On Error trigger.

`subclass=MyClass` can be
substituted by, or used with, a specific error message using `errormsg=My Error
Message`

For example, when used together, the syntax
is:

$fieldproperties`(`Field`)="subclass=`MyClass`;errormsg=My error message"`

* MyClass—predefined style
  class in the application’s CSS.
* MyErrorMessage—message
  such as `"Error in occurrence`".

The syntax of $fieldproperties
must not include spaces.

**Note:**   If the On Error trigger is empty, Uniface
changes the default code from `$text("%%$error")` to
`$fieldproperties(Field)="errormsg=$text(%%$error`), but only if the trigger has
been fired due to a validation error for a field or key.

## Highlighting the Field With Focus

The following sets properties for GENDER in the
current occurrence when that field has focus. If more than one occurrence of the entity is drawn,
only the field in the current occurrences has a frame around it and the text color set to blue. The
frame and color are turned on in the Field Gets Focus trigger and turned off in the Leave Field
trigger.

```procscript
; trigger: Field Gets Focus
$fieldproperties(GENDER) = "Frame=T;forecolor=blue"
```

```procscript
; trigger: Leave Field
$fieldproperties(GENDER) = "Frame=F;forecolor=black"
```

## Related Topics

- [$fieldvalrep](_fieldvalrep.md)
- [$valrep](_valrep.md)
- [Changing Form Layout Dynamically](../../../desktopapps/forms/definingformlayoutinproc.md)


---

# $fieldsyntax

Set or return the syntax attributes of the specified field.

AttributeList =
$fieldsyntax (Field)

$fieldsyntax (Field`) =` AttributeList

## Arguments

* Field—literal field name or
  a string, variable, function, or parameter that evaluates to a string containing the field name
* AttributeList—string, or
  field (or indirect reference to a field), variable, or function that evaluates to an empty string
  or a GOLD semi-colon (:) list of field syntax attributes. Although commas can be used
  when setting attributes, the retrieved list is always GOLD; separated.

## Return Values

String containing the dynamic field syntax
attributes that have been previously set with $fieldsyntax.

## Use

Allowed in form, report, and server page
components (and in service components that are not self-contained).

## Description

Use the $fieldsyntax function
to set or retrieve dynamic syntax attributes of Field for the currently active
occurrence.

When setting the field syntax, if
AttributeList contains an empty string, the syntax of Field
is reset. The structure editor function ^CLEAR also resets the field syntax. Since the structure
editor function ^RETRIEVE carries out an implicit ^CLEAR, this also resets field syntax.

When retrieving the field syntax, only syntax
attributes that are dynamic and that have previously been set with $fieldsyntax
are retrieved. If syntax attributes have been set declaratively (in the model or component), an
empty string is returned. You can retrieve declaratively set field syntax with
`$fieldinfo("SYNTAX")`.

## Specifying the Arguments

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

The following example sets the field syntax for
field DISCOUNT\_2 to No Edit and No Prompt, if the value in the field DISCOUNT\_1 is not zero:

```procscript
if (DISCOUNT_1 != 0)
   $fieldsyntax (DISCOUNT_2) = "NED;NPR"
endif
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [$fieldinfo](_fieldinfo.md)
- [fieldsyntax](../procstatements/fieldsyntax.md)
- [Field Syntax](../../../modeling/modeledproperties/field_syntax.md)
- [$columnsyntax](_columnsyntax.md)


---

# $fieldvalidation

Identify whether a field requires validation.

$fieldvalidation { `(`Field`)` }

## Parameters

If the Field—field name;
optional; can be a literal field name, a string, or a variable, function, parameter, or indirect
reference to a field containing the name. It can optionally contain a qualified field name, for
example `MYFLD.MYENT`. If omitted, the current field is used.

## Return Values

| Value | Meaning |
| --- | --- |
| "" | An error occurred. $procerror contains the exact error. |
| 0 | Field does not require validation because it has not been modified or it has already been successfully validated.  Check the value of $fieldmod to determine which of these situations applies. |
| 1 | Field requires validation. |

Values of $procerror Commonly Returned Following $fieldvalidation

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |

## Use

Allowed in all Uniface component types.

## Description

All fields of an entity can be validated. Data in
a field needs validation in the following circumstances:

* Data in the field has been modified
  ($fieldmod is 1), but has not yet been successfully validated
  ($fieldvalidation is also 1).
* Validation has been demanded by Proc code
  ($fieldcheck is 1), regardless of the value of
  $fieldvalidation.

For example:

```procscript
$MYFIELD$ = "CUSTID.CUST"
if ( $fieldvalidation($MYFIELD$))
...
endif
```

## Related Topics

- [validate](../procstatements/validate.md)
- [validatefield](../procstatements/validatefield.md)
- [$fieldcheck](_fieldcheck.md)
- [$fieldmod](_fieldmod.md)
- [$fielddbmod](_fielddbmod.md)
- [$instancevalidation](_instancevalidation.md)
- [$keyvalidation](_keyvalidation.md)
- [$occvalidation](_occvalidation.md)


---

# $fieldvalrep

Return or set the associative (ValRep) list for an instance of a field.

Get ValRep:
$fieldvalrep { `(`Field`)` }

Set ValRep:
$fieldvalrep { `(`Field`)` }
`=`List

## Parameters

* Field—field name;
  optional; can be a literal name, a string, or a variable, function, parameter, or indirect
  reference to a field containing the name. For example: It can optionally contain a qualified field
  name, for example `MYFLD.MYENT`. If omitted, the current field is used.
* List—associative list that
  contains the desired ValRep items for this field instance

## Return Values

* Associative list (ValRep) list used by a
  widget for the specified field in the current occurrence only.
* Empty string ("") if no list has been declared
  for the field with $fieldvalrep or if the field cannot be found.

## Use

Allowed in all Uniface component types.

## Description

The function $fieldvalrep
returns or sets the ValRep list for the specified field *in the current occurrence*.
Only this single instance of the specified field is affected, and the ValRep list remains in effect
even when the occurrence is no longer the current occurrence.

When a ValRep list is defined for a field (in the
Define Widget Properties dialog, or with $valrep or
$fieldvalrep), this list determines the values that are allowed in that field.
For example, defining a ValRep list for a unifield or an edit box limits the values that the user
may enter. This can be considered an extra layer of syntax checking for the field.

## Setting $fieldvalrep

To set the value of
$fieldvalrep, List should be an associative list that
contains the desired ValRep items for this field instance. The ValRep list set with
$fieldvalrep:

* Overrides the ValRep list that is defined
  with the function $valrep or on the Define Widget
  Properties form.
* Remains in effect until it is explicitly
  reset with another $fieldvalrep reference or until all ValRep lists in the
  component are reset with actions such as clear and retrieve.
* Is not reset by actions like ^NEXT\_FIELD or
  ^PREV\_OCC.

In the following example, the underlined
semicolon (`;`) represents the Uniface subfield separator (by default,
GOLD ;).

The example sets the ValRep for the drop-down list for the TITLE in each occurrence
depending on the person's gender:

```procscript
if (GENDER.PERSON = "M")
   $fieldvalrep(TITLE.PERSON) = "Mr.;Dr.;Prof."
else
   if (GENDER.PERSON = "F")
      $fieldvalrep(TITLE.PERSON) = "Ms.;Mrs.;Miss;Dr.;Prof."
   endif
endif
```

## Updating Tree Widget ValReps

When used in tree widget fields,
$fieldvalrep functionality is extended to manipulate the contents of ValRep
list, enabling you to reorder, partially update, or delete the contents of the tree widget.
For more information, see [Defining and Updating ValRep Lists for the Tree Widget](../../../desktopapps/widgets/tree/define_the_valrep_list_for_the_tree_widget_.md).

## Related Topics

- [$fieldproperties](_fieldproperties.md)
- [$properties](_properties.md)
- [$valrep](_valrep.md)


---

# $fieldvideo

Return or set the video attributes of the specified field.

$fieldvideo`(`Field`) =` AttributeList

AttributeList `=`$fieldvideo`(`Field`)`

## Arguments

* Field—name of the field for
  which the video properties are set. If omitted, the current field is used.
* AttributeList—attributes to
  apply; one of:

  + `DEF`—set the default video
    attributes for the current occurrence. (The default video attributes are determined by the
    assignment setting $DEF\_CUROCC\_VIDEO.)

    If AttributeList is
    omitted, `DEF` is assumed.
  + `NON`—set no special video
    attributes for the current occurrence. (In character mode, this means that fields, which appear in
    inverse by default, appear in normal video; this can create a sort of highlighting effect.)
  + Uniface list of one or more video
    attributes, separated by GOLD semi-colon (;).

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

Allowed in form components, and in service and
report components that are not self-contained.

## Description

You can use $fieldvideo to
dynamically set the video attributes of Field for the current occurrence. You
can use color coding to highlight dangerous or slow choices, or to highlight fields which contain
data that requires urgent processing.

To set the video properties as data is read,
place the $fieldvideo statement for the field after the read
statement in the Read trigger.

The structure editor function ^CLEAR also resets
the field video attributes. Since the structure editor function ^RETRIEVE carries out an implicit
^CLEAR, this also resets field video attributes.

**Note:**  By default, video attributes set with the Proc
instruction $fieldvideo override the attributes set by
$ACTIVE\_FIELD. To have $ACTIVE\_FIELD take precedence over
$fieldvideo, set the $ACTIVE\_FIELD\_FIRST assignment setting
to `true`.

## Using $fieldvideo

The following example loops through all the
occurrences to find whether the name the user entered exists. If it does not, the
$fieldvideo function is used to highlight the incorrect name. F2. E1 is a
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
      $fieldvideo (NAMEDUMMY) =  "BRI;UND;BLI"
      $prompt = NAMEDUMMY.E1
      return (0)
   endif
endif
$prompt = F2.E2
; end trigger
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [$ACTIVE_FIELD_FIRST](../../../configuration/reference/assignments/_active_field_first.md)
- [$curoccvideo](_curoccvideo.md)
- [fieldvideo](../procstatements/fieldvideo.md)
- [Video Attributes](../../../desktopapps/colorhandling/video_attributes_is.md)
- [$ACTIVE_FIELD](../../../configuration/reference/assignments/active_field.md)
- [$DEF_VIDEO](../../../configuration/reference/assignments/def_video.md)


---

# $fileexists

Returns a value that indicates whether the specified file or directory
exists.

$fileexists`(`FilePath | DirPath`)`

## Parameters

* FilePath—file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.
* DirPath—directory name,
  optionally preceded by the path to the directory. Must end with a directory separator

## Return Values

Values Returned

| Value | Meaning |
| --- | --- |
| 0 | File or directory does not exist |
| 1 | File exists |
| 2 | Directory exists |
| 4 | File exists in a ZIP archive |
| 5 | Directory exists in a ZIP archive |

Values returned on iSeries

| Value | Meaning |
| --- | --- |
| 0 | File or directory does not exist |
| 1 | File member, or another object in a library, exists |
| 2 | File containing zero or more members |
| 3 | Library exists |

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Specifying File and Directory Paths

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

## Checking if a File Exists

The following example checks whether the file
test.txt exists in the directory sub1dir and, if so,
loads it:

```procscript
$file$ = "sub1dir\test.txt"
; or $file$ = "sub1dir/test.txt"
; or $file$ = "[.sub1dir]test.txt"
if ($lfileexists($file$) = 1) lfileload $file$, $content$
```

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# $fileproperties

Return the properties of the specified file, directory, or zip archive, taking file
redirections in the assignment file into account.

$fileproperties`(`FilePath | DirPath {`,` Topic}`)`

## Parameters

* FilePath—file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.
* DirPath—directory name,
  optionally preceded by the path to the directory. Must end with a directory separator.
* Topic—associative list of
  attributes, separated by GOLD ; (`;`). If omitted, all the available
  properties are returned.

For more information, see [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md).

## Return Values

$fileproperties returns a list
of properties applicable to the file. The properties returned depend on the type of file.

* Associative list of
  Topic=Value pairs, separated by GOLD ;
  (`;`).
* Empty list (`""`) if the file
  or directory does not exist, or an error occurred. $procerror contains the
  precise error.

Properties that can be returned by
$fileproperties and $lfileproperties

| Topic | Returned value | Normal Files | Zip Files |
| --- | --- | --- | --- |
| `FILETYPE` | On MS Windows, Unix—`DIR` or `FILE`  On iSeries—`DIR` if it is an IFS directory (DIR or DDIR); `FILE` if the object is an IFS stream file (STMF or DSTMF) or a file in a library (\*FILE); for other object types, the type returned by the OS, without the '`*,`' for example MBR, LIB, PGM, SRVPGM, USRSPC etc. | X | X |
| `FILESIZE` | Size, in bytes, of the file or object. | X | X |
| `FULLPATH` | Full path to the file, or the file in a zip archive. When using relative paths, the path includes the working directory.  If the file is in a zip archive, the zip file and path are specified by `ZIPFILENAME` | X | X |
| `CREATIONDATE` | Date the file was created. String in the format `yyyymmddhhmmsstt`, where the ticks (`tt`) is always 00. | X |  |
| `MODIFICATIONDATE` | Last time the file was modified, in the same format as `CREATIONDATE`.  Files located in zip archives have the modification date set rather than the creation date. | X | X |
| `ACCESSDATE` | Last time the file was accessed, in the same format as for `CREATIONDATE`. | X |  |
| `FILEATTRIBUTES` | String containing the file attributes.   * MS Windows—zero or more of the letters   `RHSACET`, where `R`=read-only, `H`=hidden,   `S`=system, `A`=archive, `C`=compressed,   `E`=encypted.  For files located in zip archives—   `T`=text file or `""`=other (binary) files * UNIX—string is   `rw`[`x` | `s`] `rw`[`x`   | `s`] `rwx`. Granted permissions are represented by the respective   letter in the string:  `r`=read;   `w`=write; `x`=execute; `s`=execute plus set   user/group ID permission. This format resembles the format of `ls -l`.  Absence of a permission is represented   by a dash (`-`). * iSeries—string is   `rw`[`x`|`s`]`rw`[`x`|`s`]`rwx`.  It is equivalent to what the QSH   command `ls -l`File produces. If the file is an object in the   library system, it is followed by a comma and `RAUDE,OMEAR`.  This additional string refers to the   permissions for the object of the current process only; group or public authorities are not   included (unlike the Unix-like part, which represents user, group and world privileges).  `RAUDE` represents the   data permissions: `R`: read; `A`: add; `U`: update;   `D`: delete; `E`: execute  `OMEAR` represents the   object permissions: `O`: operation; `M`: management;   `E`: existence; `A`: alter; `R`: reference.  Absence of a particular privilege is   represented by a dash `-`.  For more information, refer to the   iSeries documentation, such as the documentation of EDTOBJAUT. | X | X |
| `COMPRESSEDSIZE` | Size, in bytes, of the compressed file or object in a zip archive. |  | X |
| `CHECKSUM` | 32-bit number used to determine whether a file in a zip archive has been modified or corrupted. |  | X |
| `METHOD` | Method used to store the file or object; either:   * `0`—file or object is   stored without compression * `8`—file or object is   stored and compressed in a zip archive |  | X |
| `ZIPFILENAME` | Full path to the zip archive that contains the file or directory. When using relative paths, the path includes the working directory. |  | X |

Values commonly returned by $procerror following $fileproperties and $lfileproperties

| Value | Error constant | Meaning |
| --- | --- | --- |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |
| -1110 | <UPROCERR\_TOPIC> | Topic name not known. |
| -1132 | <UPROCERR\_UNRESOLVED\_TOPIC> | Topic could not be resolved. |

## Use

Allowed in all Uniface component types.

## Description

The $fileproperties function
returns an associative list of the properties of the specified file or directory, taking file
redirections in the assignment file into account. The file or directory can be located in a zip
archive.

## Specifying File and Directory Paths

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

## Checking if a File Exists

The following example checks whether the file
test.txt exists in the directory sub1dir and, if so,
loads it:

```procscript
$file$ = "sub1dir\test.txt"
; or $file$ = "sub1dir/test.txt"
; or $file$ = "[.sub1dir]test.txt"
if ($fileproperties($file$,"Filetype") = "FILETYPE=FILE") fileload $file$, $content$
```

## Extracting a File's Modification Date and Time

This example extracts the modification date and
time of the file grid1.xml residing in grid1.zip file of
the \mysamples directory. The current working directory is
d:\usys\project, and the return value of the function is:

```procscript
FILETYPE=FILE;
MODIFICATIONDATE=2006061414351600;
COMPRESSEDSIZE=24344;
FILESIZE=272113;
CHECKSUM=351677385;
FULLPATH=GRID1.XML;
METHOD=8;
FILEATTRIBUTES=T;
ZIPFILENAME=..\mysamples\grid1.zip
```

```procscript
FIELD1.MYENTITY = $fileproperties("..\mysamples\grid1.zip:grid1.xml")

; Extract the modification date:
getitem/id $1,FIELD1.MYENTITY,"MODIFICATIONDATE"
$2 = $date($1) ; gives $2 = "20060614"

; Extract the modification time:
$3 = $clock($1) ; gives $3 = "0000000014351600"
```

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# $foreign

Return a value that indicates whether the entity is painted as an up entity.

$foreign { `(`Entity`)` }

## Parameters

Entity—entity name; optional;
can be a literal name, a string, or a variable, function, parameter, or indirect reference to a
field containing the name. If omitted, the current entity is used.

## Return Values

Values returned by $foreign

| Value | Meaning |
| --- | --- |
| 1 | *Entity*  is painted as an up (foreign) entity. |
| 0 | *Entity*  is not painted as an up entity. |
| "" | An error occurred |

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $foreign

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

The $foreign function returns
an indication if the specified entity is painted as an up (or foreign) entity.

It is useful in the application model definition
for the Read trigger of an entity, since it allows you to determine at run time how the entity is
painted on the current form.

The $foreign function can be
used in application model Read triggers to specify different actions depending on how the entity
was painted on the form. In the following example, if the entity is not painted as an up entity,
the u\_where clause ensures that all the occurrences where EXPIRATION\_DATE is
today or later are read. If the entity is painted as an up entity, the unqualified
read statement ensures that only the single matching occurrence is read.

```procscript
; trigger: Read

if ($foreign = 0)
   read u_where (EXPIRATION_DATE >= $date)
else
   read
endif
```

## Related Topics

- [read](../procstatements/read.md)
- [u_where](../procstatements/uwhere.md)


---

# $format

Return or set data for formatting.

$format

$format =
FormattedData

## Parameters

FormattedData—can be a string,
or a field (or indirect reference to a field), a variable, or a function that evaluates to a
string.

## Return Values

Field data, formatted according to the display
format (DIS) of the field.

## Use

Allowed in the Format and Deformat triggers of
all components.

## Description

You can use $format to change
formatted data using the FormattedData argument.

Use $format only in the
field-level Format and Deformat triggers. When the Format trigger is activated,
$format initially returns the field data, formatted according to the display
(DIS) template of the field. If a display template is not defined for the field, the default
formats shown in the table below are used:

Default Display Templates Used by $format

| Data type | Displayed format |
| --- | --- |
| String | As is |
| Numeric | {`-`}nnn{`.`} |
| Float | {`-`}nnn{`.`}`e`nnn |
| Date, Linear Date | *ccyymmdd* |
| Time, Linear Time | *hhnnsstt* |
| Datetime, Linear Datetime | *ccyymmddhhnnsstt* |
| Boolean | `T` or `F` |
| Image, Raw | TRX-coded data |

When the Deformat trigger is activated,
$format initially returns the raw data for the field, as entered by the user.
Proc code in the Deformat trigger should convert this raw data into a format acceptable by Uniface.
The converted data should be written to $format when the Deformat trigger
completes.

In the debugger, $format can
be accessed directly or as variable `$103`.

The following example adds a
sterling symbol in front of a number if the currency is British:

```procscript
; trigger: Format

if (CURRENCY = "POUNDSTG")
   $format = "STG %%$format"
endif
```

## Related Topics

- [Deformat](../triggersstandard/deformat.md)
- [Format](../triggersstandard/format.md)


---

# $formdb

Return a value that indicates whether data in the current form has been retrieved
from a database.

$formdb

## Return Values

Values returned in $formdb

| Value | Meaning |
| --- | --- |
| 0 | In the following cases:   * No entities have been retrieved from   a database * $formdb has been   reset to 0 by a Proc statement * No entities are painted on the form |
| 1 | An entity in the form has been retrieved from a database |

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

The $formdb function is used
to test whether  *any*  occurrence in the form (started with run) or
form instance (started with newinstance or activate) has been
retrieved from a database.

Statements that affect the value of
$formdb are the same as those that affect $instancedb:

Statements that change $instancedb (or $formdb)

| Statement | Action | Discussion |
| --- | --- | --- |
| [clear](../procstatements/clear.md) | Sets $instancedb to 0 |  |
| clear/e | Sets $instancedb to 0 | If the only entities retrieved are related to the cleared entity. |
| No change | If the only entities retrieved are  *not*  related to the cleared entity. |
| [erase](../procstatements/erase.md) | Sets $instancedb to 0 |  |
| erase/e | Sets $instancedb to 0 | If the only entities retrieved are related to the erased entity. |
| No change | If the only entities retrieved are  *not*  related to the erased entity. |
| [release](../procstatements/release.md) | Sets $instancedb to 0 |  |
| release/e | Sets $instancedb to 0 | If the only entities retrieved are related to the released entity. |
| No change | If the only entities retrieved are  *not*  related to the released entity. |
| release/mod | Sets $instancedb to 0 |  |
| release/e/mod | Sets $instancedb to 0 | If the only entities retrieved are related to the released entity. |
| No change | If the only entities retrieved are  *not*  related to the released entity. |
| [retrieve](../procstatements/retrieve.md) | Sets $instancedb to 1 | ^RETRIEVE causes the first outermost entity to be retrieved with its related entities. Any unrelated entities are not automatically retrieved. Internally, the entity-level flags for database origin are set. This affects the value that `$instancedb` becomes when any unrelated entities use Proc statements that modify `$instancedb`. |
| retrieve/e | Sets $instancedb to 1 | The specified entity is retrieved with its related entities. Any unrelated entities are not automatically retrieved. Internally, the entity-level flags for database origin are set. This affects the value `$instancedb` becomes when any unrelated entities use Proc statements that modify `$instancedb`. |
| [store](../procstatements/store.md) | Sets $instancedb to 1 |  |
| store/e | Sets $instancedb to 1 | Internally, the entity-level flags for database origin are set for the entity and related entities stored. This affects the value `$instancedb` becomes when any unrelated entities use Proc statements that reset `$instancedb`. |

(You could consider $formdb to
be an inclusive OR of all the entity-level flags indicating database origin.)

## Specifying the Behavior of the ^Clear Function

The following example shows how to use $formdb to determine the
behavior of the `^CLEAR` function:

```procscript
; trigger: Clear

if ($formdb > 0)
   release
   message "Controls released; data available as default for new input"
else
   clear
endif
```

In the example, the first time the ^CLEAR
function is used, the Proc code releases the controls on primary key fields and marks retrieved
data as being entered by the user. The second time that ^CLEAR is used, the data is removed from
the form (but  *not*  from the database).

## Related Topics

- [$formdbmod](_formdbmod.md)
- [$formmod](_formmod.md)
- [$instancedb](_instancedb.md)
- [$instancedbmod](_instancedbmod.md)
- [$instancemod](_instancemod.md)


---

# $formdbmod

Return the modification status of database fields in the current form.

$formdbmod

## Return Values

Values returned in $formdbmod

| Value | Meaning |
| --- | --- |
| 0 | Field has not been modified; this can be because:   * No database field has been modified * No database occurrences have been   added or removed * No entities are painted on the form |
| 1 | Field has been modified; this can be due to:   * A database field in a database entity   has been modified * An database occurrence has been added   to or removed from the component |

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

$formdbmod is a form-level
function that tests whether any field that is defined as a database field has been modified. Other
fields, such as dummy fields, do not affect $formdbmod.

Statements that affect the value of
$formdbmod are the same as those that affect $instancedbmod.

Statements that Change $instancedbmod and $formdbmod

| Statement | Value of $instancedbmod and $formdbmod after statement | Discussion |
| --- | --- | --- |
| [clear](../procstatements/clear.md) | 0 |  |
| clear/e | 0 | If the only database fields modified are in entities related to the cleared entity. |
| No change | If the only database fields modified are  *not*  in entities related to the cleared entity. |
| [erase](../procstatements/erase.md) | 0 |  |
| erase/e | 0 | If the only database fields modified are in entities related to the erased entity. |
| No change | If the only database fields modified are  *not*  in entities related to the erased entity. |
| release/e/mod | 1 | The modification status is set only for the specified entity and related entities. Consequently, Proc statements that reset the modification status for unrelated entities do not cause `$instancedbmod` to be set to 0. (Remember that `$instancedbmod` is evaluated as an inclusive OR for all entities in the instance.) |
| release/mod | 1 |  |
| [remocc](../procstatements/remocc.md) | 1 | If the removed occurrence is in the database. Entity-level indicators are set only for the entity and its related entities. |
| No change | If the removed occurrence was added by the user and has not been stored. |
| [retrieve](../procstatements/retrieve.md) | 0 | If the only database fields that have been modified are in entities related to the retrieved entity. |
| No change | If the only database fields that have been modified are  *not*  in entities related to the retrieved entity. |
| retrieve/e | 0 | If the only database fields that have been modified are in inner entities related to the retrieved entity or in the retrieved entity itself. |
| No change | If the only database fields that have been modified are  *not*  in entities related to the retrieved entity. |
| [store](../procstatements/store.md) | 0 |  |
| store/e | 0 | If the only modified database fields are in entities related to the stored entity. |
| No change | If the only modified database fields are  *not*  in entities related to the stored entity. |

The value returned by the function
$formdbmod is determined in the same way as the value of
$instancedbmod. (You could consider $formdbmod to be the
inclusive OR of the values of the $fieldmod function for all database fields in
the form.)

This example uses $formdbmod
to test whether database fields have been modified before allowing a form to be exited:

```procscript
; Quit trigger

selectcase $formdbmod
   case 0
      exit
   case 1
      askmess "Some data has not been saved.%%^%\
      Do you wish to exit?"
      if ($status = 0)
         return -1
      else
         exit
      endif
endselectcase
```

## Related Topics

- [$formdb](_formdb.md)
- [$formmod](_formmod.md)
- [$instancedb](_instancedb.md)
- [$instancedbmod](_instancedbmod.md)
- [$instancemod](_instancemod.md)


---

# $formfocus

Return the name of the form instance that has focus.

$formfocus

## Return Values

String that contains the name of the form instance
(or form in a sequence of modal forms) that currently has focus.

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

The $formfocus function is
particularly useful in (local) services and global Procs.

## Reporting the Instance that has Focus

The following example reports the name of the instance
that currently has focus in the message frame:

```procscript
putmess "The form instance %%$formfocus has focus."
```

## Related Topics

- [setformfocus](../procstatements/setformfocus.md)
- [Form Gets Focus](../triggersstandard/formgetsfocus.md)
- [Form Loses Focus](../triggersstandard/formlosesfocus.md)


---

# $formmod

Return the modification status of data in the current form.

$formmod

$formmod`=`Expression

set | reset  $formmod

## Return Values

Values returned in $formmod

| Value | Meaning |
| --- | --- |
| 0 | In the following cases:  No field has been modified  No occurrences have been added or removed  No entities are painted on the form |
| 1 | In the following cases:  Any field in the component has been modified  An occurrence has been added to or removed from the component |

If an error occurs, $procerror
contains a negative value that identifies the exact error.

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

$formmod is a form-level
function that tests the modification status of data in the form.

Proc Statements that Change $instancemod and $formmod

| Statement | Value of $instancemod and $formmod after statement | Discussion |
| --- | --- | --- |
| `clear` | 0 |  |
| `clear/e` | 0 | If the only fields modified are in entities related to the cleared entity. |
| No change | If the only fields modified are *not*  in entities related to the cleared entity. |
| `creocc` | 1 | Entity-level indicators are set for the created occurrence and its related entities. |
| `erase` | 0 |  |
| `erase/e` | 0 | If the only fields modified are in entities related to the erased entity. |
| No change | If the only fields modified are *not*  in entities related to the erased entity. |
| `release` | 0 |  |
| `release/e` | 0 | If the only fields modified are in entities related to the released entity. |
| No change | If the only fields modified are *not*  in entities related to the released entity. |
| `release/e/mod` | 1 |  |
| `release/mod` | 1 |  |
| `remocc` | 1 | Entity-level indicators are set only for the entity and its related entities. |
| `retrieve` | 0 | If the only fields that have been modified are in entities related to the retrieved entity. |
| No change | If the only fields that have been modified are  *not*  in entities related to the retrieved entity. |
| `retrieve/e` | 0 | If the only fields that have been modified are in inner entities related to the retrieved entity or in the retrieved entity itself. |
| No change | If the only fields that have been modified are  *not*  in entities related to the retrieved entity. |
| `store` | 0 |  |
| `store/e` | 0 | If the only modified fields are in entities related to the stored entity. |
| No change | If the only modified fields are *not*  in entities related to the stored entity. |

The value of $formmod is
actually the inclusive OR of the values of the $occmod function for all the
occurrences in the form.

## Checking for Modifications in a Form

In the following example, a Quit Proc code examines $formmod to
determine if any modifications have been made on the form. If there have been modifications, the
user is asked to confirm before the modifications are lost.

If the user does not want to ^QUIT, the Proc code
ends with a status code that prevents the form from ending; that is, the form remains displayed,
and the user is able to ^ACCEPT the modifications. If the user does want to ^QUIT, the Proc code
ends normally, allowing the form to end.

```procscript
; trigger: Quit

if ($formmod = 0)
   return (0)
else
   askmess "Please confirm QUIT (Y/N)"
   if ($status = 1)
      return (0)
   else
   ; -1 prevents end of edit session
      return (-1)
   endif
endif
```

## Related Topics

- [$formdb](_formdb.md)
- [$formdbmod](_formdbmod.md)
- [$instancedb](_instancedb.md)
- [$instancedbmod](_instancedbmod.md)
- [$instancemod](_instancemod.md)


---

# $formmodality

Return an indication of the form modality for the requested form instance.

$formmodality { `(`InstanceName`)` }

## Parameters

InstanceName—component instance
name; optional; can be a literal name, string, variable, function, parameter or indirect reference
to a field containing the name. If omitted, the modality of the current form instance is returned.

## Return Values

Values returned by $formmodality

| Value | Meaning |
| --- | --- |
| 1 | *InstanceName*  is a modal form. |
| 0 | *InstanceName*  is a non-modal form. |
| "" | An error occurred. |

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $formmodality

| Value | Error constant | Meaning |
| --- | --- | --- |
| -57 | <UACTERR\_NO\_INSTANCE> | The named instance cannot be found in the component pool. |
| -1105 | <UPROCERR\_INSTANCE> | The instance name provided is not valid (For more information, see the  newinstance  Proc statement); for example, the argument contains incorrect characters. |
| -1304 | <UPROCERR\_UNKNOWN\_CONTEXT> | Function not allowed, unknown context. For example, $formmodality was used without the  *InstanceName*  argument and no instance is current. |

## Use

Allowed in form components, and in service and
report components that are not self-contained.

The following example puts a message in the message frame that indicates if the current
instance was started as a modal or non-modal form:

```procscript
if ($formmodality = 1)
   putmess "%%$instancename is modal."
else
   putmess "%%$instancename is non-modal"
endif
```

## Related Topics

- [activate](../procstatements/activate.md)
- [newinstance](../procstatements/newinstance.md)
- [run](../procstatements/run.md)


---

# $formname

Return the name of the current form.

$formname

## Return Values

* Name of the current form in uppercase, if the
  form was started with run.
* Name of the instance in uppercase, if the
  form was started with newinstance or activate.
* Name of the startup shell, if no form is
  current (for example, in the Application Execute trigger).

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

The $formname function is
useful if you want to restrict the use of global Procs to a particular set of forms.

## Tracing Application Execution

You can use the value in
$formname to help trace an application's execution. For example:

```procscript
; trigger: Execute

putmess "Started form %%$formname at %%$clock"
edit
putmess "Terminated form %%$formname at %%$clock"
```

## Related Topics

- [$componentname](_componentname.md)
- [$instancename](_instancename.md)


---

# $formtitle

Return or set the window title bar of a form.

$formtitle

$formtitle`=`FormTitle

## Parameters

FormTitle—new title for the
form; can be a string, or a field (or indirect reference to a field), a variable, or a function
that evaluates to a string. The maximum number of characters that can be assigned is 127.

## Return Values

Title of the current form or form instance.

Initially, $formtitle returns
the title of the form as defined in the form properties, or the instance name, if no title has been
set.

## Use

Allowed in form components, static server pages, and in service and
report components that are not self-contained.

## Description

The $formtitle function has
effect only when an application is using a GUI driver. Changing $formtitle
overrides the value defined in the GUI-specific settings.

You can use $formtitle to set
the window title bar of a form by specifying FormTitle.

## Naming Forms

The following example uses
$formtitle to name the form window after the race season the user is accessing:

```procscript
; FORMULA 1 Application
; form: W_RACE
; trigger: Execute

$valrep(RACE_DLIST.RACE) = $$list
$formtitle = "Races window - %%$$season season"
call lp_clearvars
edit
```

---

# $frac

Return the fractional part of X.

$frac`(`X`)`

## Parameters

X—a numeric constant, or a
field (or indirect reference to a field), variable, function, or expression that evaluates to a
numeric value.

## Return Values

Fractional part of X.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

## Use

Allowed in all Uniface component types.

The following example returns the fractional part
of the given expression:

```procscript
$fracOf$ = $frac(ANUMBER / 100)
```

If the value of ANUMBER is 234, the result stored
in $fracOf$ is 0.34.

## Related Topics

- [$int](int.md)


---

# $framedepth

Return the number of lines needed to print a frame as drawn on the component, without
allowing for expansion

$framedepth { `(`Frame`)` }

## Parameters

Frame—frame name; optional;
can be a literal name, a string, or a variable, function, parameter or indirect reference to a
field containing the name. If omitted, the current frame is used.

## Return Values

Number of lines painted for the specified frame.

## Use

Allowed in form and report components.

## Description

The function $framedepth
allows you to determine how many lines are needed to print a frame. The function cannot take into
consideration any vertical expansion that might occur when the frame is printed at run time; the
value returned is the number of lines that have been painted on the component.

When you add $totlines,
`$framedepth(HEADER)`, and `$framedepth(TRAILER)`, the result is the
full page depth, excluding top and bottom margins.

**Note:**  It is usually easier to set the Print
Frame on Same Page property of an entity or named area frame.

The following example shows how a page feed can be produced when the depth of a frame
is greater than the lines remaining on the page:

```procscript
; trigger: Occurrence Gets Focus
; entity : CUSTOMER

if ($lines < $framedepth(INVOICE))
   eject
endif
```

## Related Topics

- [$lines](_lines.md)
- [$occdepth](_occdepth.md)
- [$totlines](_totlines.md)


---

# $gui

Return the mnemonic for the user interface.

$gui

## Return Values

Values returned by $gui

| Value | User interface |
| --- | --- |
| CHR | Character mode |
| MSW | Microsoft Windows |

## Use

Allowed in form components.

## Description

The value returned by$gui is
the same as that specified by the assignment file setting $GUI.

**Note:**  You cannot use $gui to
determine whether the Uniface application is running under Windows classic mode. Use
$oprsys to determine the operating system mnemonic.

## Dynamically Setting Command Button Appearance

The following example uses
$gui to determine whether to load an image file into a command button, or to
display text instead:

```procscript
; trigger: Execute
; In character mode ?
; Yes, so display text only
; No, so load picture

if ($gui = "CHR")
   BUTTON1 = "Picture of Jim"
else
   BUTTON = "@jim"
endif
edit
```

## Related Topics

- [$display](_display.md)
- [$oprsys](_oprsys.md)
- [$GUI](../../../configuration/reference/assignments/gui.md)


---

# $hide

Return or set the display status of a menu item.

$hide

$hide`=`Expression

set | reset  $hide

## Return Values

Values returned in $hide

| Value | Meaning |
| --- | --- |
| 0 | Menu item is displayed |
| 1 | Menu item is hidden and the menu accelerator for the item is disabled. |

## Use

Allowed only in the Predisplay trigger of menu
items..

## Description

The function $hide controls
whether the current menu item is displayed:

## Related Topics

- [$check](_check.md)
- [$disable](_disable.md)
- [reset](../procstatements/reset.md)
- [set](../procstatements/set.md)
- [Predisplay](../triggersstandard/predisplay.md)


---

# $hits

Return the number of occurrences in the hitlist.

$hits { `(`Entity`)` }

## Parameters

Entity—entity name; optional;
can be a literal name, a string, or a variable, function, parameter, or indirect reference to a
field containing the name. If omitted, the current entity is used.

## Return Values

* Total number of occurrences in the hitlist.
* An empty string ("") if an error occurred.
  $procerror contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $hits

| Value | Error constant | Meaning |
| --- | --- | --- |
|  | <UIOSERR\_\*> (-2 through -12) | Errors during database I/O. |
|  | <UNETERR\_\*> (-16 through -30) | Errors during network I/O. |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

If the DBMS you are accessing supports a stepped
hitlist, any performance benefits derived from use of the stepped hitlist are lost when you use
$hits, since building the complete hitlist can be quite time-consuming.

Statements that change $hits

| Event | Action |
| --- | --- |
| [clear](../procstatements/clear.md) | Sets $hits to `0`. |
| [release](../procstatements/release.md) | Sets $hits to `0`. |
| [discard](../procstatements/discard.md) | Reduces $hits by the number of discarded occurrences. |

The following example shows an Execute Proc code for an index type of form. This Proc
code copies a value into the form which defines a profile, then retrieves all the companies which
match that profile. The assignment statement copies the total number of hits which match the
profile to a dummy field in the trailer frame on the form:

```procscript
; trigger: Execute

COMPNAME = $1
retrieve
if ($status < 0)
   message "Retrieve error"
   exit (0)
endif
TOTSEL.TRAILER = $hits(COMPANY)
display COMPNAME
```

## Related Topics

- [lookup](../procstatements/lookup.md)
- [retrieve](../procstatements/retrieve.md)
- [setocc](../procstatements/setocc.md)
- [$curhits](_curhits.md)
- [$dbocc](_dbocc.md)


---

# $idpart

Return the ID part of an associative list item.

$idpart`(`AssociativeListItem`)`

## Return Values

ID part of an associative list item.

## Use

Allowed in all Uniface component types.

## Description

For more information, see  [Lists and Sublists](../../lists/lists_of_items.md).

## Extracting the ID and Value of an Associative List Item

The following example shows
how the
$valuepart function can be used to extract the value
part of an associative list item:

```procscript
$1 = $idpart("Key=TheData")
$2 = $valuepart("Key=TheData")
; results:
; $1 = "Key"
; $2 = "TheData"
```

## Related Topics

- [getitem](../procstatements/getitem.md)
- [$itemnr](_itemnr.md)
- [List Handling in Proc](../../lists/listhandling.md)
- [Associative Lists](../../lists/associativelists.md)
- [$item](item.md)
- [$valuepart](valuepart.md)


---

# $inlinemenu

Insert or retrieve one or more menu items at the location of a dynamic menu
placeholder

Setting menu items: $inlinemenu `=` MenuItem
{;MenuItemN}

where MenuItem is:

MenuItemId ;
Type`=`Type ;
Properties

Getting menu items:
Variable `=` $inlinemenu

## Arguments

* MenuItem—associative list
  defining the menu item identifier, type, and properties. The properties that can be specified
  depend on the type of menu item.
* MenuItemId—string
  identifying the menu item; mandatory. For example, `"extra"`. If
  Type is `cascaded menu` or `included menu`, the
  referenced menu cannot be a popup menu.
* Type—type of menu item;
  mandatory; valid values are:

  `separator` |
  `option` | `cascaded menu` | `included menu`

  The item type strings are case insensitive.

  For more information, see [Type](../../../_reference/guihelp/globalobjects/fields/menuitemtype.md).

  **Note:**   If `cascaded menu` or
  `included menu`, the `Referenced_Menu` or `Nested_Menu`
  properties must also be specified.
* Properties—associative list
  of name-value pairs specifying the properties of the menu item. Properties may be mandatory,
  depending on the Type.

Menu Item Definition Properties

| Property | Value | Example | Description |
| --- | --- | --- | --- |
| Text | OptionText | `text="Extra tools"` | Option text displayed in the menu. Mandatory if Type is `Option` or `Cascaded Menu`. For more information, see [Item](../../../development/reference/devobjproperties/menu/umenutitle_title.md). |
| Image | ImageName | `image="@ball.png"` (file)  `image="^BALL"` (glyph) | String specifying the name of an image or glyph to be displayed as an icon in front of the option text |
| Accelerator | Accelerator | `accelerator="FileOpen"` | Accelerator definition for the item; empty by default. For more information, see [Accelerator](../../../development/reference/devobjproperties/menu/uaccelerator_accelerator.md). |
| HintText | HintText | `hinttext="User-added plug-ins"` | Hint text for the menu item; empty by default. For more information, see [Hint Text](../../../development/reference/devobjproperties/menu/helptext_hinttext.md). |
| Checked | Boolean | `checked="true"` | Determines whether a check mark is displayed beside the item; false by default. |
| Disabled | Boolean | `disabled="true"` | Determines whether the item is disabled; `false` by default. |
| Referenced\_Menu | MenuName | `Referenced_menu="Editors"` | String specifying an existing Drop-down menu.For more information, see [Referenced Menu](../../../development/reference/devobjproperties/menu/ucascade_referencedmenu.md) . |
| Nested\_Menu | DynamicMenu | `Nested_menu="Preferences"` | String specifying another dynamic menu. |

## Return Values

Returns error code in
$procerror and error description in $procerrorcontext

Values returned by $procerror after $inlinemenu

| Value | Description |
| --- | --- |
| 0 | Success |
| -1 | An error occurred. |
| -1600 | The function has been used outside the scope of the current Predisplay context |
| -1601 | The function has been used in a component. It is allowed only in a Predisplay trigger |
| -1602 | The menu item list has been incorrectly defined. |
| -1603 | Referenced menu in cascading menu does not exist |
| -1604 | Menu item identifier is not unique |
| -1605 | Invalid menu item type |

## Use

The scope of the function is limited to the
Predisplay trigger of the dynamic menu for which the trigger was fired.

## Description

The $inlinemenu function
contains the most recent menu items set for the dynamic menu for which the Predisplay trigger was
fired. This means that if $inlinemenu is not set, the last known menu content
for the dynamic menu is used.

The function is empty until a valid menu item
definition list is assigned to that function. It is therefore not possible to set the content of a
dynamic menu except in the Predisplay trigger used to fire it.

The list of menu item definitions is typically
built up using the putitem statement or other list handling Proc.
For more information, see [List Handling in Proc](../../lists/listhandling.md).

## Defining Dynamic Menu Items

The following example builds a dynamic menu. It
uses putitem to construct a menu item definition in a variable and then inserts
the value of the variable as an item in the current dynamic menu.

```procscript
;PreDisplay trigger
variables
   string strMenuItem
endvariables

; ----------- Insert first menu item in a dynamic menu --------------

;Initialize one menu item in list
  StrMenuItem = ""

;Define menu item "Option A"
  putitem/id strMenuItem, "TYPE", "Option"
  putitem/id strMenuItem, "TEXT", "Option A"
  putitem/id strMenuItem, "Checked", "True"
 
;Insert this item with id "A" into the dynamic menu.
  putitem/id $inlinemenu, "A", strMenuItem

; ----------- Insert second menu item in a dynamic menu -------------

;Initialize one menu item in list.
  StrMenuItem = ""

;Define menu item "Option B"
  putitem/id strMenuItem, "TYPE", "Option"
  putitem/id strMenuItem, "TEXT", "Option B"
  putitem/id strMenuItem, "IMAGE", "ball.png"

;Insert this item with id "B" into the dynamic menu.
  putitem/id $inlinemenu, "B", strMenuItem
```

## Defining Nested Dynamic Menus

**Caution:** 

Use caution when defining nested dynamic menus
because it is possible to create looping menus where a nested menu refers to a generated parent
menu.

The following example creates a dynamic menu that
references an existing menu and includes a submenu containing a list of attached component
instances.

```procscript
trigger preDisplay 
variables
  string strMenuItem
  string strSubMenu
  string strInstance
endvariables

$inlinemenu = "" 

; Define the first item as a static cascading menu 
strMenuItem = ""
putitem/id strMenuItem, "TYPE", "CASCADED MENU"
putitem/id strMenuItem, "TEXT", "File"
putitem/id strMenuItem, "REFERENCED_MENU", "FILE_MENU"

putitem/id $inlinemenu, "ID_FILE", strMenuItem 

; Define the second item as a dynamic cascading menu 
strSubMenu = ""  

; Define the menu items for the dynamic submenu 
$1 = 1
getitem strInstance, $instancechildren, $1 
while ($status > 0)
  putitem/id strSubMenu, strInstance, "TYPE=Option;TEXT=%%strInstance%%%"

  ; Get next instance
  $1 = $1 + 1
  getitem strInstance, $instancechildren, $1 
endwhile

; Define the dynamic submenu 
strMenuItem = ""
putitem/id strMenuItem, "TYPE", "CASCADED MENU"
putitem/id strMenuItem, "TEXT", "Attached instances"
putitem/id strMenuItem, "NESTED_MENU", strSubMenu

putitem/id $inlinemenu, "ID_INSTANCES", strMenuItem
```

1. Clear $inlinemenu to ensure
   that an existing dynamic menu definition is not used.
2. As the first item in the dynamic menu, define
   a cascading menu that references an existing File menu.
3. Insert the cascading file menu item with ID
   `ID_FILE` into the dynamic menu.
4. As the second item in the dynamic menu, define
   a cascading menu that references another dynamic menu.
5. Initialize the dynamic submenu definition.
6. Get the attached component instances and
   create a menu item definition for each of them.
7. Define a cascading submenu that contains a
   list of the attached instances of this component.
8. Insert the dynamic submenu (id "ID\_INSTANCES")
   into the main dynamic menu.

When the user selects one of the items attached to
the instances, that instance is made active with the setformfocus statement.

```procscript
;Option trigger
params
   string strId : IN
endparams

   ;Check if this ID is one of the attached instances.
  if (IsAttachedInstance(strId))
     ;Yes our selected menu item has an id which matches
     ;one of our attached instances so we can make this one
     ;current.
     setformfocus strId
  endif
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [putitem](../procstatements/putitem.md)
- [Dynamic Menu Items](../../../desktopapps/menus/dynamicmenus.md)
- [Defining Dynamic Menus](../../../desktopapps/menus/definingdynamicmenus.md)


---

# $instancechildren

Return a list of instances attached to an instance.

$instancechildren { `(`InstanceName`)` }

## Parameters

InstanceName—component instance
name; optional; can be a literal name, string, variable, function, parameter, or indirect reference
to a field containing the name. If omitted, the current instance (started with
newinstance or activate) is used.

## Return Values

* List of the child instances attached to the
  specified instance. The list includes instances that are running remotely; it does not include
  forms that were started with the run statement.
* Empty string ("") in the following cases:

  + InstanceName has no child
    instances.
  + InstanceName was omitted
    and the current instance is a form started with run.
  + No instance named
    InstanceName can be found in the component pool.
  + InstanceName is not
    correct; that is, the field or variable is not found or the string is not a valid instance name.

## Use

Allowed in all Uniface component types.

## Description

An instance is attached to
InstanceName if one of these statements is true:

* It was created by a
  newinstance/attached statement.
* It was created by a
  newinstance statement (or by an `activate` statement that did an
  implicit newinstance) and the Modality & Attachment
  property is set to `Non-Modal, Attached`.

The list returned by
$instancechildren can be manipulated with Proc statements such as
getitem, getlistitems, and so on.

## Assigning Child Instances to a ValRep List

The following example fills the field LISTBOX
with a list of the child instances of the current instance:

```procscript
$valrep(LISTBOX) = $instancechildren
```

## Related Topics

- [newinstance](../procstatements/newinstance.md)
- [run](../procstatements/run.md)
- [$detachedinstances](_detachedinstances.md)
- [$instanceparent](_instanceparent.md)


---

# $instancedb

Return an indication whether data in the current instance has been retrieved from a
database.

$instancedb { `(`InstanceName`)` }

## Parameters

InstanceName—component instance
name; optional; can be a literal name, string, variable, function, parameter, or indirect reference
to a field containing the name. If omitted, the current instance (started with
newinstance or activate) is used.

## Return Values

Values returned in $instancedb

| Value | Meaning |
| --- | --- |
| "" | * InstanceName omitted   and there is no current instance, for example, in the Application Execute trigger. * InstanceName omitted   and current instance is a form started with run. * No instance named   InstanceName can be found in the component pool. * InstanceName is not   correct; that is, the field or variable is not found or the string is not a valid instance name   (see newinstance). |
| 0 | * No entities have been retrieved from   a database, for example, the user has not retrieved data, only entered it * $instancedb has   been reset to 0 by a Proc statement * No entities are painted on the   component |
| >0 | An entity in the instance has been retrieved from a database |

## Use

Allowed in all Uniface component types.

## Description

The $instancedb function is
used to test whether  *any*  occurrence in InstanceName has been
retrieved from a database. The $instancedb function is evaluated as an inclusive
OR of all the entity-level flags indicating database origin.

The following statements affect the value of
$instancedb:

Statements that change $instancedb (or $formdb)

| Statement | Action | Discussion |
| --- | --- | --- |
| [clear](../procstatements/clear.md) | Sets $instancedb to 0 |  |
| clear/e | Sets $instancedb to 0 | If the only entities retrieved are related to the cleared entity. |
| No change | If the only entities retrieved are  *not*  related to the cleared entity. |
| [erase](../procstatements/erase.md) | Sets $instancedb to 0 |  |
| erase/e | Sets $instancedb to 0 | If the only entities retrieved are related to the erased entity. |
| No change | If the only entities retrieved are  *not*  related to the erased entity. |
| [release](../procstatements/release.md) | Sets $instancedb to 0 |  |
| release/e | Sets $instancedb to 0 | If the only entities retrieved are related to the released entity. |
| No change | If the only entities retrieved are  *not*  related to the released entity. |
| release/mod | Sets $instancedb to 0 |  |
| release/e/mod | Sets $instancedb to 0 | If the only entities retrieved are related to the released entity. |
| No change | If the only entities retrieved are  *not*  related to the released entity. |
| [retrieve](../procstatements/retrieve.md) | Sets $instancedb to 1 | ^RETRIEVE causes the first outermost entity to be retrieved with its related entities. Any unrelated entities are not automatically retrieved. Internally, the entity-level flags for database origin are set. This affects the value that `$instancedb` becomes when any unrelated entities use Proc statements that modify `$instancedb`. |
| retrieve/e | Sets $instancedb to 1 | The specified entity is retrieved with its related entities. Any unrelated entities are not automatically retrieved. Internally, the entity-level flags for database origin are set. This affects the value `$instancedb` becomes when any unrelated entities use Proc statements that modify `$instancedb`. |
| [store](../procstatements/store.md) | Sets $instancedb to 1 |  |
| store/e | Sets $instancedb to 1 | Internally, the entity-level flags for database origin are set for the entity and related entities stored. This affects the value `$instancedb` becomes when any unrelated entities use Proc statements that reset `$instancedb`. |

For more information, see [Effects of Proc Statements on Instance-Level Proc Functions](../../effectofstatementsoninstancefunctions.md).

When an entity that is painted as an up (or
foreign) entity has empty Write Up and Delete Up triggers, for the purposes of
$instancedb, that entity is  *not*  considered to be a DBMS entity.
Even if data for the up entity has been retrieved as a result of a retrieve/e,
the value of $instancedb is not affected.

## Using $instancedb to Determine the Behavior of ^CLEAR

The following example shows how to use $instancedb to determine the
behavior of the ^CLEAR function:

```procscript
; trigger: Clear
if ( $instancedb > 0 & $componenttype = "F")
   release
   message "Controls released; data available as default for new input"
else
   clear
endif
```

In the example, the first time the ^CLEAR
function is used, the Proc code releases the controls on primary key fields and marks retrieved
data as being entered by the user. The second time that ^CLEAR is used, the data is removed from
the instance (but  *not*  the database).

## Related Topics

- [newinstance](../procstatements/newinstance.md)
- [$instancedbmod](_instancedbmod.md)
- [$instancemod](_instancemod.md)
- [Clear](../triggersstandard/clear.md)


---

# $instancedbmod

Return the modification status of database fields in the current component instance.

$instancedbmod { `(`InstanceName`)` }

## Parameters

InstanceName—name of component
instance; optional; can be a literal name, a string, or a variable, function, parameter or indirect
reference to a field containing the name. If omitted, the current instance is used.

## Return Values

Values returned in $instancedbmod

| Value | Meaning |
| --- | --- |
| "" | An error occurred. $procerror contains the exact error. |
| 0 | * No modifications have been made to   database fields. * No entities are painted on the   component. |
| 1 | Any field in the component instance that is defined as being a database field has been modified. |

Values of $procerror Commonly Returned Following $instancedbmod

| Value | Error constant | Meaning |
| --- | --- | --- |
| -57 | <UACTERR\_NO\_INSTANCE> | The named instance cannot be found in the component pool. |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| -1105 | <UPROCERR\_INSTANCE> | The instance name provided is not valid (For more information, see the [newinstance](../procstatements/newinstance.md) Proc statement); for example, the argument contains incorrect characters. |
| -1304 | <UPROCERR\_UNKNOWN\_CONTEXT> | Function not allowed, unknown context. The InstanceName argument was omitted and one of the following occurred:  There is no current instance, for example, in the Application Execute trigger.  The current instance is a form started with `run`. |

## Use

Allowed in all Uniface component types.

## Description

$instancedbmod is an
instance-level function that tests whether any field in the specified instance that is defined as a
database field has been modified. Other fields, such as dummy fields, do not affect
$instancedbmod.

(You could consider
$instancedbmod to be the inclusive OR of the values of the
$fieldmod function for all database fields in the instance. )

## Events Affecting $instancedbmod

Events that cause a field to be recognized as
modified include such things as:

* The user entering a retrieve profile in an
  empty field. (This means that $instancedbmod can be set to 1 *before*
  a retrieve has been performed.)
* The user changing the value of data that has
  been retrieved.
* Modification of a non-database field made by
  a Proc assignment (`=`) without the /init switch.

Statements that Change $instancedbmod and $formdbmod

| Statement | Value of $instancedbmod and $formdbmod after statement | Discussion |
| --- | --- | --- |
| [clear](../procstatements/clear.md) | 0 |  |
| clear/e | 0 | If the only database fields modified are in entities related to the cleared entity. |
| No change | If the only database fields modified are  *not*  in entities related to the cleared entity. |
| [erase](../procstatements/erase.md) | 0 |  |
| erase/e | 0 | If the only database fields modified are in entities related to the erased entity. |
| No change | If the only database fields modified are  *not*  in entities related to the erased entity. |
| release/e/mod | 1 | The modification status is set only for the specified entity and related entities. Consequently, Proc statements that reset the modification status for unrelated entities do not cause `$instancedbmod` to be set to 0. (Remember that `$instancedbmod` is evaluated as an inclusive OR for all entities in the instance.) |
| release/mod | 1 |  |
| [remocc](../procstatements/remocc.md) | 1 | If the removed occurrence is in the database. Entity-level indicators are set only for the entity and its related entities. |
| No change | If the removed occurrence was added by the user and has not been stored. |
| [retrieve](../procstatements/retrieve.md) | 0 | If the only database fields that have been modified are in entities related to the retrieved entity. |
| No change | If the only database fields that have been modified are  *not*  in entities related to the retrieved entity. |
| retrieve/e | 0 | If the only database fields that have been modified are in inner entities related to the retrieved entity or in the retrieved entity itself. |
| No change | If the only database fields that have been modified are  *not*  in entities related to the retrieved entity. |
| [store](../procstatements/store.md) | 0 |  |
| store/e | 0 | If the only modified database fields are in entities related to the stored entity. |
| No change | If the only modified database fields are  *not*  in entities related to the stored entity. |

For more information, see [Effects of Proc Statements on Instance-Level Proc Functions](../../effectofstatementsoninstancefunctions.md).

## Exit Application Menu Item

The following example is for an Exit
Application menu item or command button of a parent form which may have any number of
child forms. The module enables central checking of the modification status of all child forms.
Without this module, each child form with unsaved data would produce a dialog box when the parent
form is exited. The module also generates a list of unsaved instances to enable one-click saving of
all the forms.

```procscript
variables
   string unsaved
   string children
   string current_child
endvariables

unsaved = ""
children = ""
current_child = ""

; list all the children of the current form
children = $instancechildren
message "%%children%%%"
while (children != "")
   getitem current_child, children, 1
   delitem children, 1
   selectcase $instancedbmod(current_child)
      case 0
      ; The child"s data is stored in the database
      ; Insert some code to shut the form
      case 1
         putitem unsaved, -1, current_child
   endselectcase
endwhile

; Check if the parent form is saved
if ($instancedbmod != 0)
   putitem unsaved, -1, $instancename
endif

; are any items unsaved?
if (unsaved !="")
   askmess "Data has not been saved on forms:%%^%\
   %%unsaved%%% %%^Do you wish to exit?"
   if ($status = 0)
      return -1
   else
      apexit
   endif
else
   apexit
endif
```

## Related Topics

- [$instancedb](_instancedb.md)
- [$instancemod](_instancemod.md)


---

# $instancehandle

Return the handle of the requested instance.

$instancehandle
{(InstanceName)}

## Parameters

InstanceName—component instance
name; optional; can be a literal name, string, variable, function, parameter, or indirect reference
to a field containing the name. If omitted, the current instance is returned.

## Return Values

* Handle of the instance with the name
  InstanceName.
* NULL handle in the following circumstances:

  + An error occurred.
    $procerror contains a negative value that identifies the exact error
  + InstanceName is an
    incorrect instance name.
  + The instance with the name
    InstanceName has been deleted.

Values of $procerror Commonly Returned Following $instancehandle

| Value | Error constant | Meaning |
| --- | --- | --- |
| -57 | UACTERR\_NO\_INSTANCE | The named instance cannot be found in the component pool. |
| -1101 | UPROCERR\_FIELD | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |

## Use

Allowed in all Uniface component types.

The following example obtains the handle
`myHandle` which is a handle to the current component instance:

```procscript
variables
   handle myHandle
endvariables

myHandle = $instancehandle()
```

## Related Topics

- [$collhandle](_collhandle.md)
- [$occhandle](_occhandle.md)
- [Handles](../../handles/handles2.md)


---

# $instancemod

Return the modification status of data in the current component instance.

$instancemod { `(`InstanceName`)` }

set | reset  $instancemod

## Parameters

InstanceName—component instance
name; optional; can be a literal name, string, variable, function, parameter, or indirect reference
to a field containing the name. If omitted, the current instance is returned.

## Return Values

Values returned in $instancemod

| Value | Meaning |
| --- | --- |
| 1 | In the following cases:   * At least one field has been modified * An occurrence has been added to or   removed from the component |
| 0 | In the following cases:   * No field has been modified * No occurrences have been added or   removed * No entities are present in the   component structure |
| "" | An error occurred. $procerror contains the exact error. |

Values of $procerror Commonly Returned Following $instancemod

| Value | Error constant | Meaning |
| --- | --- | --- |
| -57 | <UACTERR\_NO\_INSTANCE> | The named instance cannot be found in the component pool. |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| -1105 | <UPROCERR\_INSTANCE> | The instance name provided is not valid (For more information, see the  newinstance  Proc statement); for example, the argument contains incorrect characters. |
| -1304 | <UPROCERR\_UNKNOWN\_CONTEXT> | Function not allowed, unknown context. The InstanceName argument was omitted and one of the following occurred:  There is no current instance, for example, in the Application Execute trigger.  The current instance is a form started with `run`. |

## Use

Allowed in all components, but not in report
components that are self-contained.

## Description

$instancemod is an
instance-level function that tests the modification status of data in the component instance.

The value of $instancemod is
actually the inclusive OR of the values of the $occmod function for all the
occurrences in the instance.

## Events Affecting $instancemod

Events that cause a field to be recognized as
modified include such things as:

* The user entering a retrieve profile in an
  empty field. (This means that $instancemod can be set to 1  *before* 
  a retrieve has been performed.)
* The user changing the value of data that has
  been retrieved.
* Modification of a non-database field made by
  a Proc assignment (=) without the /init switch.

Proc Statements that Change $instancemod and $formmod

| Statement | Value of $instancemod and $formmod after statement | Discussion |
| --- | --- | --- |
| `clear` | 0 |  |
| `clear/e` | 0 | If the only fields modified are in entities related to the cleared entity. |
| No change | If the only fields modified are *not*  in entities related to the cleared entity. |
| `creocc` | 1 | Entity-level indicators are set for the created occurrence and its related entities. |
| `erase` | 0 |  |
| `erase/e` | 0 | If the only fields modified are in entities related to the erased entity. |
| No change | If the only fields modified are *not*  in entities related to the erased entity. |
| `release` | 0 |  |
| `release/e` | 0 | If the only fields modified are in entities related to the released entity. |
| No change | If the only fields modified are *not*  in entities related to the released entity. |
| `release/e/mod` | 1 |  |
| `release/mod` | 1 |  |
| `remocc` | 1 | Entity-level indicators are set only for the entity and its related entities. |
| `retrieve` | 0 | If the only fields that have been modified are in entities related to the retrieved entity. |
| No change | If the only fields that have been modified are  *not*  in entities related to the retrieved entity. |
| `retrieve/e` | 0 | If the only fields that have been modified are in inner entities related to the retrieved entity or in the retrieved entity itself. |
| No change | If the only fields that have been modified are  *not*  in entities related to the retrieved entity. |
| `store` | 0 |  |
| `store/e` | 0 | If the only modified fields are in entities related to the stored entity. |
| No change | If the only modified fields are *not*  in entities related to the stored entity. |

For more information, see [Effects of Proc Statements on Instance-Level Proc Functions](../../effectofstatementsoninstancefunctions.md).

## Checking for Modifications

In the following example, a Quit Proc code examines $instancemod to
determine if any modifications have been made in the component instance. If there have been
modifications, the user is asked to confirm before the modifications are lost.

If the user does not want to ^QUIT, the Proc code
ends with a status code that prevents the component from ending; that is, the component remains
displayed, and the user is able to ^ACCEPT the modifications. If the user does want to ^QUIT, the
Proc code ends normally, allowing the component to end.

```procscript
; trigger: Quit
; test for modifications
; -1 prevents end of edit session

if ($instancemod = 0)
   return 0
else
   askmess "Please confirm QUIT (Y/N)"
   if ($status = 1)
      return 0
   else
      return -1
   endif
endif
```

## Related Topics

- [$formdb](_formdb.md)
- [$formdbmod](_formdbmod.md)
- [$formmod](_formmod.md)
- [$instancedb](_instancedb.md)
- [$instancedbmod](_instancedbmod.md)
- [$occmod](_occmod.md)
- [=](../procstatements/equals.md)


---

# $instancename

Return the name of the current component instance.

$instancename

## Return Values

* Name of current component instance in
  uppercase.
* Name of the current form in uppercase, if the
  form was started with run.
* Name of the startup shell, if no form is
  current (for example, in the Application Execute trigger).
* Empty string (""), if an error occurred.
  $procerror contains a negative value that identifies the exact error

Values of $procerror Commonly Returned Following $instancename

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1304 | <UPROCERR\_UNKNOWN\_CONTEXT> | Function not allowed, unknown context. For example, there is no current instance in the Application Execute trigger. The current instance is a form started with `run`. |

## Use

Allowed in all Uniface component types.

## Tracing Application Execution

You can use the value in
$instancename to help trace an application's execution. For example:

```procscript
trigger _EXEC

putmess "Started instance %%$instancename at %%$clock"
edit
putmess "Terminated instance %%$instancename at %%$clock"
end ; end trigger
```

## Related Topics

- [$instancepath](_instancepath.md)
- [$componentname](_componentname.md)
- [$formname](_formname.md)


---

# $instanceparent

Return the name of the parent instance of the requested instance.

$instanceparent { `(`InstanceName`)` }

## Parameters

InstanceName—component instance
name; optional; can be a literal name, string, variable, function, parameter, or indirect reference
to a field containing the name. If omitted, the current instance (started with
newinstance or activate) is used.

## Return Values

* Name of the parent instance of
  InstanceName when:

  + InstanceName is a modal
    form instance that is not started from the Application Execute trigger.
  + InstanceName is an
    attached, non-modal component instance. (A detached, non-modal component instance has no parent.)
* Empty string (""), in the following
  circumstances:

  + InstanceName is a child of
    the application screen. For example, InstanceName is a detached, non-modal form
    instance or is a modal form instance started from the Application Execute trigger.
  + InstanceName is running on
    a server and its parent is running on the client. In this case, InstanceName is
    considered to be a child of the application screen that belongs to the Application Server
    application.
  + An error occurred.
    $procerror contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $instanceparent

| Value | Error constant | Meaning |
| --- | --- | --- |
| -57 | <UACTERR\_NO\_INSTANCE> | The named instance cannot be found in the component pool. |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| -1105 | <UPROCERR\_INSTANCE> | The instance name provided is not valid (For more information, see the [newinstance](../procstatements/newinstance.md) Proc statement); for example, the argument contains incorrect characters. |
| -1304 | <UPROCERR\_UNKNOWN\_CONTEXT> | Function not allowed, unknown context. The InstanceName argument was omitted and one of the following occurred:  There is no current instance, for example, in the Application Execute trigger.  The current instance is a form started with `run`. |

## Use

Allowed in all Uniface component types.

## Reporting the Parent of the Current Instance

The following example reports the current
instance's parent in the message frame:

```procscript
putmess "%%$instanceparent is the parent of %%$instancename"
```

## Related Topics

- [newinstance](../procstatements/newinstance.md)
- [run](../procstatements/run.md)
- [$detachedinstances](_detachedinstances.md)
- [$instancechildren](_instancechildren.md)


---

# $instancepath

Return the path with which the current instance is registered.

$instancepath

## Return Values

* Name of the path for the current instance in
  uppercase.
* Empty string (""), if the current application
  did not register with the Uniface Router when it started.

## Use

Allowed in all Uniface component types.

## Description

The $instancepath function can
be useful to pass addressing information to another component instance.

## Starting a Component and Passing Data to an Operation

The Detail trigger of a field in the form COMP1
contains the following code. It starts a new instance of the component COMP2, prepares data for the
operation `TELL_ME_LATER`, then hands the data to the operation.

```procscript
; Trigger: Detail of field DO_IT
; prepare the data for TELL_ME_LATER
; prepare the my return address

variables
   string MYADRESS
endvariables

newinstance/async "COMP2", "INST2"
DATA = ...
MYADDRESS = "%%$instancepath:%%$instancename"
activate "INST2".TELL_ME_LATER (MYADDRESS, DATA)
```

The operation `TELL_ME_LATER` does
what is required, then sends the result back to the calling instance:

```procscript
; Trigger: Operations of component COMP2
; prepare data to be returned

operation TELL_ME_LATER
params
   string RETURN_ADDRESS : IN
   string DATA : IN
endparams

variables
   string DATAOUT
endvariables
...
DATAOUT = ...
postmessage "%%RETURN_ADDRESS", "RESULT", "%%DATAOUT"
end
```

The message is received by the Asynchronous
Interrupt trigger of COMP1:

```procscript
; Trigger: Asynchronous Interrupt of component COMP1

selectcase $msgid
   case "RESULT"
      askmess "Result from %%$msginfo("INSTANCENAME") available in message frame."
      putmess "Received the following result from %%$msginfo("SRC") :"
      putmess "%%$msginfo("DATA")"
   case ...
...
endselectcase
```

## Related Topics

- [$instancename](_instancename.md)
- [$msginfo](_msginfo.md)


---

# $instances

Return a list of instances that belong to a specified component.

$instances { `(`{ComponentName}{`,` Filter}`)` }

## Parameters

* ComponentName—name of a
  component; if it is not specified, or is an empty string (`""`), a list of instances
  that belong to the current component is returned.
* Filter—specifies that all
  instances in the current transaction be returned; valid values are an empty string
  (`""`) or `"IN_CURRENT_TRANS"`.

If no arguments are specified, the instances of
the current component are returned.

## Return Values

* Indexed list of instances belonging to the
  specified component.
* Empty string ("") if no instances are
  found.

## Use

Allowed in all Uniface component types.

## Activating all Instances of an Entity Service

The following example activates all instances of
the entity service defined for ENT1:

```procscript
$ObjSvc$ = $entinfo(ENT1, "OBJECTSERVICE")
if ($ObjSvc$)
   $ObjSvcInstance$ = $instances($ObjSvc$,"")
   if (!$status)
      activate $ObjSvcInstance$.MyOperation()
   endif
endif
```

## Listing Instances

The following example provides a message with a list of all instances of MyService:

```procscript
$instlist$ = $instances("MyService", "") 
message "The instances of MyService are %%$instlist$"
```

---

# $instancevalidation

Identify whether data in the component instance requires validation.

$instancevalidation { `(`InstanceName`)` }

## Parameters

InstanceName—component instance
name; optional; can be a literal name, string, variable, function, parameter, or indirect reference
to a field containing the name. If omitted, the current instance is returned.

## Return Values

Values returned in $instancevalidation

| Value | Meaning |
| --- | --- |
| "" | An error occurred. $procerror contains the exact error. |
| 0 | * No data has been modified. * All the data has already been   successfully validated.   You can check the value of $instancemod to determine which of these situations applies. |
| 1 | Data requires validation. |

Values of $procerror Commonly Returned Following $instancevalidation

| Value | Error constant | Meaning |
| --- | --- | --- |
| -57 | <UACTERR\_NO\_INSTANCE> | The named instance cannot be found in the component pool. |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| -1105 | <UPROCERR\_INSTANCE> | The instance name provided is not valid. (See the [newinstance](../procstatements/newinstance.md) Proc statement for more information.) For example, the argument contains incorrect characters. |
| -1304 | <UPROCERR\_UNKNOWN\_CONTEXT> | Function not allowed, unknown context. The InstanceName argument was omitted and one of the following occurred:  There is no current instance, for example, in the Application Execute trigger.  The current instance is a form started with `run`. |

## Use

Allowed in all Uniface component types.

## Description

The function
$instancevalidation checks if any occurrence in the current component instance
requires validation. This can be viewed as an inclusive OR of $occvalidation for
all occurrences in the instance.

## Checking the Validation Status of a Form

The following example uses $instancevalidation to check the
validation status of the current form:

```procscript
if ($instancevalidation = 1)
   message/info "Some data has not been validated."
endif
```

## Related Topics

- [validate](../procstatements/validate.md)
- [$fieldvalidation](_fieldvalidation.md)
- [$instancemod](_instancemod.md)
- [$keyvalidation](_keyvalidation.md)
- [$occvalidation](_occvalidation.md)


---

# $int

Return the integer part of X.

$int`(`X`)`

## Parameters

X—numeric constant, or a field
(or indirect reference to a field), variable, function, or expression that evaluates to a numeric
value.

## Return Values

Calculated value.

## Use

Allowed in all Uniface component types.

The following example returns the integer part of
the given expression:

```procscript
$intpart$ = $int(ANUMBER / 1000)
```

If the value of ANUMBER is 3456, the value stored
in $intpart$ is 3.

## Related Topics

- [$frac](frac.md)


---

# $interactive

Return a status indicating whether the current form component is in interactive
state.

$interactive

## Return Values

Values returned in $interactive

| Value | Meaning |
| --- | --- |
| 0 | Form component is not in an interactive state. |
| 1 | Form component is in an interactive state. |
| 2 | User interface of the form component is starting (an edit/deferred statement has just been executed). |

## Use

Allowed in form components.

## Description

The $interactive function
allows you to test whether the current form component is in interactive state. Interactive state is
started with either edit/modal or edit/nonmodal. It is
terminated by executing either the Accept or Quit trigger.

## Starting an Edit session if Application is not in Interactive Mode

The following example shows how to start an edit
session only if the application is not already in interactive mode:

```procscript
operation editCustomer
;- do an edit only if not already in interactive mode -

if ( !$interactive )
   edit/nonmodal
endif
end
```

## Related Topics

- [edit](../procstatements/edit.md)
- [$editmode](_editmode.md)


---

# $ioprint

Return or set the message level in the message frame.

$ioprint

$ioprint`=`MessageLevel

## Arguments

MessageLevel—integer
representing the sum of the message codes for the desired message types. If the sum of the codes is
`0`, no information is placed in the message frame. For more information, see [I/O Message Levels](../../../howunifaceworks/dataio/dbms_driver_logic_when_retrieving/i_o_message_level.md).

## Return Values

Integer indicating the types of I/O message sent
to the message frame. If `0`, the message frame is empty.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

## Use

Allowed in all Uniface component types.

## Checking for Information in the Message Frame

The following example shows how you can use
$ioprint to determine whether there is any information in the message frame. If
there is information, you can refer the user to it. If there is not, you can display an appropriate
message.

```procscript
trigger retrieve
retrieve
if ($status)
   if ($status = -2)
      if ($ioprint)
         if ($$message)         ; $$MESSAGE is a specific message for when $status = -2
            message $text(1572) ; retrieve failed, see message frame
         endif
      else
         message $$message
      endif
   else
      if ($status = -3)
         if ($ioprint)
            message $text(1501) ; retrieve I/O error, see message frame
         else
            message $text(1760) ; retrieve error %%$entname not found
        endif
      endif
   endif
endif
return ($status)
end
```

## Related Topics

- [putmess](../procstatements/putmess.md)
- [clrmess](../procstatements/clrmess.md)
- [Runtime Messages and Log Files](../../../testinganddebugging/debugger/logfiles.md)
- [$IOPRINT](../../../configuration/reference/assignments/ioprint.md)
- [/pri](../../../_reference/commandlineswitches/pri.md)


---

# $italic

Apply the italic character attribute to a string.

$italic`(`String`)`

## Arguments

String—string, or a field (or indirect reference to a field), a variable, or a function that evaluates to a string.

## Return Values

Returns the result of applying the italic character attribute to String

## Use

Allowed in all component types but is only applicable to unifields.

## Description

The function $italic returns the result of applying the italic character attribute to String. The result is visible only in a displayed unifield.

```procscript
MY_UNIFIELD = $italic("aaabbb")
```

Afterwards, MY\_UNIFIELD contains *aaabbb*.

## Related Topics

- [$stripattributes](_stripattributes.md)


---

# $item

Return the value that corresponds to a given ID in an associative list.

$item`(`ID`,` AssociativeList`)`

## Return Values

* Value that corresponds to the given ID in an
  associative list.
* NULL (""), if ID is not
  found in AssociativeList; $procerror is set to UPROCERR\_ITEM
  (-1129).

## Use

Allowed in all Uniface component types.

## Description

The $item function acts in the
same way as the getitem/id Proc statement, but can also be used as part of an
expression.

For more information, see  [Lists and Sublists](../../lists/lists_of_items.md).

## Find and Pass Associative List Items

The following example shows how to find and directly pass an associative list item to a
Proc module:

```procscript
if ($item("MEDIUM", myList) = "Book")
   call selectBook($item("ISBN_NR", myList))
endif
```

## Related Topics

- [List Handling in Proc](../../lists/listhandling.md)
- [$idpart](idpart.md)
- [$valuepart](valuepart.md)


---

# $itemcount

Return the number of items in a list.

$itemcount`(`List`)`

## Arguments

List—string containing the list
to be checked.

## Return Values

Number of items in a list

## Use

Allowed in all Uniface component types.

## Description

The $itemcount function enables
you to determine how many items are in a list before processing each item.

```procscript
$1 = 0
$2 = $itemcount ("$mylist$")
while $1 <= $2
		$1 += 1
endwhile
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [List Handling in Proc](../../lists/listhandling.md)
- [$idpart](idpart.md)
- [$valuepart](valuepart.md)


---

# $itemnr

Return the list item that corresponds to a given sequence number in a list.

$itemnr`(`N`,` List`)`

## Parameters

* N—sequence number
* List—list from which to
  extract an item

## Return Values

If the Nth item is not found
in List, the $itemnr function returns NULL.

## Use

Allowed in all Uniface component types.

## Description

The $itemnr function acts in
the same way as the getitem Proc statement, but can also be used as part of an
expression.

For more information, see  [Lists and Sublists](../../lists/lists_of_items.md).

## Related Topics

- [List Handling in Proc](../../lists/listhandling.md)
- [$idpart](idpart.md)
- [$valuepart](valuepart.md)


---

# $keyboard

Return or set the current keyboard translation table.

$keyboard

$keyboard`=`Table

## Parameters

Table—a string, or a field (or
indirect reference to a field), a variable, or a function that evaluates to a string; the string
should contain the name of the desired keyboard translation table.

## Return Values

Name of the keyboard table currently in use. The
values returned by default for each GUI are shown in the following table:

Default values of $keyboard

| GUI | Default value of $keyboard |
| --- | --- |
| Character mode | USYSTERM |
| Microsoft Windows | MSWINX |

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

The $keyboard function can
return or set the current keyboard translation table.

The Switch Keyboard trigger on the startup shell
object is often used to assign a new value to the $keyboard function. This
trigger is activated at any time in the application when the user enters ^SWITCH\_KEY. The default
value (if `UKEYB` or $keyboard have not been set) is determined
by the GUI in use.

## Switching Keyboard Layouts

The Proc code in the example below switches between a keyboard layout with numeric
keys, and a keyboard layout without numeric keys on a VT200 terminal. When VTNUM is in use, the
*9* key means `9`; when VT200 is in use, the *9* key means
CLEAR. The VT200 table is the USYS standard layout.

```procscript
; trigger: Switch Keyboard

if ($keyboard = "VTNUM")
   $keyboard = "VT200"
else
   $keyboard = "VTNUM"
endif
```

## Switchin Keyboard Layouts for a Field

The following example switches to a keyboard with numeric keys for one field only. When
the user enters a particular numeric field with NEXT\_FIELD, the keyboard layout is switched to the
alternate layout. When they leave the field with NEXT\_FIELD, the default keyboard layout is
restored:

```procscript
; trigger: Next Field (of field before numeric field)
; switch to VTNUM keyboard
; trigger: Next Field (of numeric field)
; switch to VT200 keyboard

$keyboard = "VTNUM"
$keyboard = "VT200"
```

## Related Topics

- [$display](_display.md)
- [$language](_language.md)
- [$variation](_variation.md)
- [$KEYBOARD](../../../configuration/reference/assignments/keyboard.md)


---

# $keycheck

Return or set the requirement for checking a key.

$keycheck`(`Entity`,` KeyNumber`)`

$keycheck`(`Entity`,` KeyNumber`)``=` Expression

`set` | `reset`$keycheck`(`Entity`,` KeyNumber`)`

## Parameters

* Entity—entity name; can be
  a literal name, string, variable, function, parameter, or indirect reference to a field.
* KeyNumber—key that is to
  be located; can be a constant, or a field (or indirect reference to a field), a variable, or a
  function that can be converted to a whole (integer) number; the value will be truncated to form an
  integer.

  + 1, the primary key.
  + 2, 3, 4, and so on, the number that
    identifies a candidate key that has been defined for Entity on the Define Key
    form. (Indexes are not allowed.)

## Return Values

Values returned in $keycheck

| Value | Meaning |
| --- | --- |
| 0 | Key checking is  *not*  enabled. |
| 1 | Key checking is currently enabled. |

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $keycheck

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1104 | <UPROCERR\_KEY> | The key number provided is not valid; for example, the key number was out of range. |
| -1128 | <UPROCERR\_NOT\_A\_KEY> | The key number specified is an index. |

Values returned in $status when $keycheck is used as the target of an assignment:

| Value | Meaning |
| --- | --- |
| "" | Key checking could not be enabled because an error occurred. |
| 1 | key checking was successfully enabled. |

## Use

Allowed in all Uniface component types.

## Description

The function $keycheck returns
a value that indicates whether the developer intends for validation to be carried out for the
specified key the next time that it can occur. If $keycheck indicates that
validation is demanded, the validation is performed regardless of whether validation is actually
required. (Validation is required when both $keymod and
$keyvalidation are 1, indicating that the key has been modified, but has not yet
been validated.)

Validation can occur when the user leaves all
fields of the key (for example, with ^NEXT\_FIELD, ^PREV\_FIELD, or a mouse click); when an explicit
validation statement is encountered (for example, validatekey); or when a
store statement is encountered. It includes syntax checks on the fields
comprising the key, activation of the Validate Key trigger, and, in forms only, activation of the
Leave Modified Key trigger. After validation completes, $keycheck is set to 0.

You can also use $keycheck as
the target in the left-hand side of an assignment. Set $keycheck to 1 to require
checking for the specified key; set it to 0 to let Uniface take responsibility for validation. For
example:

```procscript
$keycheck = !$keycheck
```

Because $keycheck is
essentially a Boolean function, when Expression evaluates to a nonzero value,
$keycheck becomes 1.

## Checking for Keys

The following example shows this function being used in the Occurrence Gets Focus
trigger:

```procscript
; trigger: Occurrence Gets Focus:
; check of primary key needed
; check of candidate key needed

set $keycheck(CUST_NUMBER.CUSTOMER, 1)
set $keycheck(CUST_NUMBER.CUSTOMER, 2)
```

## Related Topics

- [validate](../procstatements/validate.md)
- [validatefield](../procstatements/validatefield.md)
- [validatekey](../procstatements/validatekey.md)
- [validateocc](../procstatements/validateocc.md)
- [$fieldcheck](_fieldcheck.md)
- [$fieldendmod](_fieldendmod.md)
- [$fieldmod](_fieldmod.md)
- [$fieldvalidation](_fieldvalidation.md)
- [$occcheck](_occcheck.md)
- [$occmod](_occmod.md)
- [$occvalidation](_occvalidation.md)
- [Leave Modified Key](../triggersstandard/leavemodifiedkey.md)
- [Validate Key](../triggersstandard/validatekey.md)


---

# $keyfields

Return a list of the fields that make up a key or index.

$keyfields`(`Entity`,` KeyNumber`)`

## Parameters

* Entity—entity name; can be
  a literal name, string, variable, function, parameter, or indirect reference to a field.
* KeyNumber—key that is to
  be located; can be a constant, or a field (or indirect reference to a field), a variable, or a
  function that can be converted to a whole (integer) number; the value will be truncated to form an
  integer.

  + `1`, the primary key.
  + `2`, `3`,
    `4`, and so on, the number that identifies a candidate key that has been defined for
    Entity on the Define Key form.

## Return Values

* String that contains an indexed list of the
  fields that make up the specified key or index.
* An empty string ("") is returned if the
  referenced entity is a non-database entity, or if an error occurred. $procerror
  contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $keyfields

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1104 | <UPROCERR\_KEY> | The key number provided is not valid; for example, the key number was out of range. |

## Use

Allowed in form and service components (and in
report components that are not self-contained).

The following example use the
$keyfields statement:

```procscript
$MAXKEYS$ = $totkeys
$KEYNBR$ = 1
while ($KEYNBR$ <= $MAXKEYS$)
   putmess "Keyfields = %%$keyfields($entname, $KEYNBR$)%%%"
   $KEYNBR$ = $KEYNBR$ + 1
endwhile
```

## Related Topics

- [validate](../procstatements/validate.md)
- [validatefield](../procstatements/validatefield.md)
- [validatekey](../procstatements/validatekey.md)


---

# $keymod

Return an indication if the specified key has been modified.

$keymod`(`Entity`,` KeyNumber`)`

## Parameters

* Entity—entity name; can be
  a literal name, string, variable, function, parameter, or indirect reference to a field.
* KeyNumber—key that is to
  be located; can be a constant, or a field (or indirect reference to a field), a variable, or a
  function that can be converted to a whole (integer) number; the value will be truncated to form an
  integer.

  + `1`, the primary key.
  + `2`, `3`,
    `4`, and so on, the number that identifies a candidate key that has been defined for
    Entity on the Define Key form. (Indexes are not allowed.)

## Return Values

Values returned in $keymod

| Value | Meaning |
| --- | --- |
| 0 | Specified key has not been modified. |
| >0 | Specified key has been modified. |
| "" | An error occurred. $procerror contains the exact error. |

Values of $procerror Commonly Returned Following $keymod

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1104 | <UPROCERR\_KEY> | The key number provided is not valid; for example, the key number was out of range. |
| -1128 | <UPROCERR\_NOT\_A\_KEY> | The key number specified is an index. |

## Use

Allowed in form and service components (and in
report components that are not self-contained).

The following example uses the
$keymod function:

```procscript
if ( $keymod("CUST", 2) & !$keyvalidation("CUST", 2) )
   message "The modification of the second key of CUST has been validated."
endif
```

## Related Topics

- [validate](../procstatements/validate.md)
- [validatefield](../procstatements/validatefield.md)
- [validatekey](../procstatements/validatekey.md)
- [validateocc](../procstatements/validateocc.md)
- [$keytype](_keytype.md)
- [$keyvalidation](_keyvalidation.md)
- [$totkeys](_totkeys.md)


---

# $keytype

Return the type of the specified key.

$keytype`(`Entity`,` KeyNumber`)`

## Parameters

* Entity—entity name; can be
  a literal name, string, variable, function, parameter, or indirect reference to a field.
* KeyNumber—key that is to
  be located; can be a constant, or a field (or indirect reference to a field), a variable, or a
  function that can be converted to a whole (integer) number; the value will be truncated to form an
  integer.

  + `1`, the primary key.
  + `2`, `3`,
    `4`, and so on, the number that identifies a candidate key that has been defined for
    Entity on the Define Key form.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| "" | An error occurred. $procerror contains the exact error. |
| "P" | *KeyNumber*  indicates a primary key (that is,  *KeyNumber*  is 1). |
| "C" | *KeyNumber*  indicates a candidate key. |
| "I" | *KeyNumber*  indicates an index. |

Values of $procerror Commonly Returned Following $keytype

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1104 | <UPROCERR\_KEY> | The key number provided is not valid; for example, the key number was out of range. |

## Use

Allowed in all Uniface component types.

## Defining the Validation for Specific Keys

The following example uses the
`$keytype` function to define the validation for specific keys in the Validate Key
trigger. (The Validate Key trigger is activated only for primary and candidate keys.)

```procscript
; trigger: Validate Key
; perform validation for the primary key
; perform validation for all candidate keys
; oops

selectcase $keytype("MYENTITY", $curkey)
   case "P"
      ...
   case "C"
      ...
   elsecase
      message "Cannot validate this key"
      message "Context: %%$dataerrorcontext"
endselectcase
```

## Related Topics

- [validate](../procstatements/validate.md)
- [validatefield](../procstatements/validatefield.md)
- [validatekey](../procstatements/validatekey.md)
- [validateocc](../procstatements/validateocc.md)
- [$dataerrorcontext](_dataerrorcontext.md)
- [$keymod](_keymod.md)
- [$keyvalidation](_keyvalidation.md)
- [$totkeys](_totkeys.md)


---

# $keyvalidation

Identify whether a key requires validation.

$keyvalidation`(`Entity`,` KeyNumber`)`

## Parameters

* Entity—entity name; can be
  a literal name, string, variable, function, parameter, or indirect reference to a field.
* KeyNumber—key that is to
  be located; can be a constant, or a field (or indirect reference to a field), a variable, or a
  function that can be converted to a whole (integer) number; the value will be truncated to form an
  integer.

  + `1`, the primary key.
  + `2`, `3`,
    `4`, and so on, the number that identifies a candidate key that has been defined for
    Entity. (Indexes are not allowed.)

## Return Values

Values returned in $keyvalidation

| Value | Meaning |
| --- | --- |
| "" | An error occurred. $procerror contains the exact error. |
| 0 | No validation is required. |
| 1 | Key requires validation. |

Values of $procerror Commonly Returned Following $keyvalidation

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1104 | <UPROCERR\_KEY> | The key number provided is not valid; for example, the key number was out of range. |
| -1128 | <UPROCERR\_NOT\_A\_KEY> | The key number specified is an index. |

## Use

Allowed in form and service components (and in
report components that are not self-contained).

## Description

A key needs validation in either of the following
circumstances:

* Validation is required because data in one of
  the fields that makes up the key has been modified ($keymod is 1), but has not
  yet been successfully validated ($keyvalidation is also 1).
* Validation has been demanded by Proc code
  ($keycheck is 1), regardless of the value of $keyvalidation.

## Validating Keys

The following example uses the $keyvalidation function:

```procscript
; for each key
; if validation is pending,
; do it
; uh-oh
; next key, please

$MYENT$ = "CUST"
$1 = 1
while ( $1 <= $totkeys($MYENT$))
   if ($keyvalidation ($MYENT$, $1) > 0)
      validatekey $MYENT$, $1
      if ($status < 0)
         return -1
      endif
   endif
   $1 = $1 + 1
endwhile
```

## Related Topics

- [validate](../procstatements/validate.md)
- [validatefield](../procstatements/validatefield.md)
- [validatekey](../procstatements/validatekey.md)
- [validateocc](../procstatements/validateocc.md)
- [$occvalidation](_occvalidation.md)


---

# $labelproperties

Get and set the text of an attached label.

$labelproperties `(`FieldName`) =
"text=`LabelText`"`

## Arguments

* FieldName—name of the field
  to which the label is attached; can be a literal name, or a string, variable function, parameter,
  or indirect reference to a field containing the name.
* LabelText—text of the
  label

## Return Values

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned by $labelproperties

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | UPROCERR\_FIELD | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |

## Use

Forms

## Description

The $labelproperties function
makes it possible to dynamically change an attached label. It does not work with non-attached
labels.

The label dimensions as drawn on the form must be
large enough to accommodate the assigned name; otherwise, the label is truncated.

Labels are user interface objects, so they can
only be addressed when the presentation layer is available. This is after the form has been
initially displayed using a show or edit statement. You can
then use one of these statements again to refresh the display.

When using $labelproperties
after a command that changes the related entity data (such as `clear`,
`retrieve` or `xmlload`), precede the
$labelproperties command with show to ensure that the label object is available.
For example:

```procscript
clear
show
$labelproperties("FIELD1")="text=%%FIELD1.DUMMY_ENTITY%%%"
```

Although it can work with any widget type,
$labelproperties is especially useful in the grid widget because it enables the
attached label of the field shown as the column title to be changed dynamically. In grid widgets,
if the label contains a new line character, it is concatenated into one line.

In the following example, the field labels of the
`ABBREVIATION` and `FULLNAME` fields are set in the
Execute trigger. The show command draws the form, making the
label available. After the $labelproperties instructions, the
edit command refreshes the display with the new labels.

```procscript
;Execute trigger
show
$labelproperties (ABBREVIATION) = "text=Initials"
$labelproperties (FULLNAME) = "text=Employee Name"
edit
```

History

| Version | Change |
| --- | --- |
| 9.3.01 | Introduced |

## Related Topics

- [Labels](../../../desktopapps/labelsinformsreports.md)


---

# $language

Return or set the current language code.

$language

$language`=`Language

## Parameters

Language—name of the desired
language; can be a string, or a field (or indirect reference to a field), a variable, or a function
that evaluates to a string. It is recommended that you use the country codes from the ISO or ANSI
standards.

## Return Values

Current language code.

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Description

Use $language to set or return
the name of the current language.

If the language has not been set in an assignment
file (with the setting $LANGUAGE in USYS:usys.asn or your
local assignment file), it defaults to USA. If you explicitly define a value for
$language, the assignment file setting is ignored.

## Setting $language

The following example saves the current language
in general variable $1, and sets the current language to German, which has a country code of D:

```procscript
; save current language
; set current language to German

$1 = $language
$language = "D"
```

## Setting $language and $variation

The following example shows how to correctly set $language and
$variation. The example assumes that you do not want to override any assignment
file settings, but do want to change the language and library if the defaults have been given.

```procscript
; trigger: Application Execute
if ($language = "USA") ; default language used, so change to UK
   $language = "UK"
endif ; otherwise, leave alone
if ($variation = "USYS") ; default library used, so change to TECH_PUBS
   $variation = "TECH_PUBS"
endif ; otherwise, leave alone
```

The only problem with the example (and the
problem is unavoidable) is that the assignment file below is ignored:

```procscript
$LANGUAGE = USA
$VARIATION = USYS
```

## Related Topics

- [$display](_display.md)
- [$keyboard](_keyboard.md)
- [$variation](_variation.md)
- [$LANGUAGE](../../../configuration/reference/assignments/language.md)
- [Application Execute](../triggersstandard/applicationexecute.md)


---

# $ldir

Return the name of the working directory.

$ldir`()`

## Return Values

Name of the working directory, which can be
located in a ZIP archive.

## Use

Allowed in all Uniface component types.

## Description

The working directory is set by one of the
following:

* The directory in which the application is
  started
* Command line switch `/dir`,
  which overrides the startup directory

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support |

## Related Topics

- [/dir](../../../_reference/commandlineswitches/dir.md)
- [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md)


---

# $ldirlist

Return the contents of the specified directory.

$ldirlist`(`DirPath {`,` Topic}`)`

## Arguments

* DirPath—directory path,
  that is, one that ends with a directory separator. The directory can be located inside a ZIP
  archive. The directory name (or its suffix) can contain the Uniface wildcard characters
  `?` (GOLD ?) or `*` (GOLD \*).
* Topic—type of item to
  return; one of:

  + `FILE`—list files in the
    specified path; default if Topic is omitted or an empty string,
    `FILE` is assumed.
  + `DIR`—list subdirectories
    in the specified path

**Note:**  Using `DATASET` or
`MEMBER` makes your code platform-specific and non-portable.

## Return Values

* List of files or subdirectories (depending on
  Topic) separated by GOLD ; (`;`).
* Empty list (`""`) if the
  directory is empty, does not exist, or an error occurred. $procerror contains
  the exact error.

Values Commonly Returned by $procerror Following
$ldirlist and $dirlist

| Value | Error constant | Meaning |
| --- | --- | --- |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |
| -1110 | <UPROCERR\_TOPIC> | Topic name not known. |
| -1132 | <UPROCERR\_UNRESOLVED\_TOPIC> | Topic could not be resolved. |

## Use

Allowed in all Uniface component types.

## Description

The $ldirlist function returns
the contents of the specified directory, ignoring any file redirections in the assignment file.

When using wildcards, a wildcard cannot match a
dot if `DIR` is specified. If `FILE` is specified, it can match the
dot between the file name and the extension.

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

## iSeries

On iSeries, DirPath can specify
either a library, or a file in a library (library/.file, without a member name
before the period). The objects returned depend on whether a library or file is specified, and the
notation used, as well as the value of Topic.

If you use IFS notation
(DirPath contains the prefix IFS: or
!), libraries and files are considered to be directories.

* If Topic is
  `"file"`$ldirlist returns all objects except files in the
  library specified, postfixed with their object types, or returns all members in the file postfixed
  with .MBR.
* If Topic is
  `"dir"`, $ldirlist returns only the file names in the library,
  postfixed with .FILE.

If the file specification does not use IFS
notation, the following rules apply:

* If DirPath is a library
  and:

  + Topic is
    `"file"`, all objects except files in the library are returned, postfixed with their
    object types, for example PROGRAM.PGM;
  + Topic is
    `"dir"`, all file names in the library are returned, without postfixes; no other
    names (of object types) are returned;
* If DirPath is a file in a
  library (that is, library/.file, without a member name before the period)
  and:

  + Topic is
    `"file"`, all member names of the file are returned, without postfixes;
  + Topic is
    `"dir"`, nothing is returned, because files cannot contain anything other than
    members.

## Retrieving and Displaying Directory Contents

The following Proc code retrieves the files in
the directory drinks\tea in the current working directory and displays the
files in the message frame line-by-line:

```procscript
variables
   string vFilePath, vContent
   numeric N
endvariables

$dir$ = "drinks\tea"
; or $dir$ = "drinks/tea"
; or $dir$ = "[drinks.tea]"
vContent = $ldirlist($dir$,"File")
putmess "Files in directory '%%$dir$':"
N = 1
getitem vFilePath, vContent, N
while ($status > 0)
   putmess " %%vFilePath%%%"
   N = N + 1
   getitem vFilePath, vContent, N
endwhile
end
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support |

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# $length

Return the length of the specified argument.

$length(String)

## Arguments

String—string, or a field (or
indirect reference to a field), a variable, or a function that evaluates to a string.

## Return Values

The function $length returns
the length of the argument.

## Use

Allowed in all Uniface component types.

## Description

The function $length returns
the length of the argument.

If String contains frame
marker, ruler, or character attribute characters, they are ignored.

## Using $length

The following example shows the results of using
$length with variables of type string, numeric, and floating-point:

```procscript
; str1 is a string
; num1 is a numeric
; float1 is a float
  
str1 = "-1,234.56"  
num1 = -123456  
float1 = -1234.56  
  
strlength  =  $length(str1)   ; strlength = 9  
numlength  =  $length(num1)   ; numlength = 7  
floatlength = $length(float1) ; floatlength = 8

powerlength = $length($power(2,10)) ; powerlength = 4
```

## Related Topics

- [length](../procstatements/length.md)


---

# $lfileexists

Returns a value that indicates whether the specified file or directory
exists.

$lfileexists`(`FilePath | DirPath`)`

## Parameters

* FilePath—file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.
* DirPath—directory name,
  optionally preceded by the path to the directory. Must end with a directory separator

## Return Values

Values Returned

| Value | Meaning |
| --- | --- |
| 0 | File or directory does not exist |
| 1 | File exists |
| 2 | Directory exists |
| 4 | File exists in a ZIP archive |
| 5 | Directory exists in a ZIP archive |

Values returned on iSeries

| Value | Meaning |
| --- | --- |
| 0 | File or directory does not exist |
| 1 | File member, or another object in a library, exists |
| 2 | File containing zero or more members |
| 3 | Library exists |

Values commonly returned in $status and
$procerror

| Value | Error constant | Meaning |
| --- | --- | --- |
| 0 |  | Successful |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |

## Use

Allowed in all Uniface component types.

## Specifying File and Directory Paths

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

## Checking if a File Exists

The following example checks whether the file test.txt exists in
the directory sub1dir and, if so, loads it:

```procscript
$file$ = "sub1dir\test.txt"
; or $file$ = "sub1dir/test.txt"
; or $file$ = "[.sub1dir]test.txt"
if ($lfileexists($file$) = 1) lfileload $file$, $content$
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support |

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# $lfileproperties

Return the properties of the specified file, directory, or zip archive, ignoring any
file redirections in the assignment file.

$lfileproperties`(`FilePath | DirPath {`,` Topic}`)`

## Parameters

* FilePath—file name,
  optionally preceded by the path to the file. Must *not* end with a directory
  separator.
* DirPath—directory name,
  optionally preceded by the path to the directory. Must end with a directory separator.
* Topic—associative list of
  attributes, separated by GOLD ; (`;`). If omitted, all the available
  properties are returned.

## Return Values

$lfileproperties returns a list
of properties applicable to the file. The properties returned depend on the type of file.

* Associative list of
  Topic=Value pairs, separated by GOLD ;
  (`;`).
* Empty list (`""`) if the file
  or directory does not exist, or an error occurred. $procerror contains the
  precise error.

Properties that can be returned by
$fileproperties and $lfileproperties

| Topic | Returned value | Normal Files | Zip Files |
| --- | --- | --- | --- |
| `FILETYPE` | On MS Windows, Unix—`DIR` or `FILE`  On iSeries—`DIR` if it is an IFS directory (DIR or DDIR); `FILE` if the object is an IFS stream file (STMF or DSTMF) or a file in a library (\*FILE); for other object types, the type returned by the OS, without the '`*,`' for example MBR, LIB, PGM, SRVPGM, USRSPC etc. | X | X |
| `FILESIZE` | Size, in bytes, of the file or object. | X | X |
| `FULLPATH` | Full path to the file, or the file in a zip archive. When using relative paths, the path includes the working directory.  If the file is in a zip archive, the zip file and path are specified by `ZIPFILENAME` | X | X |
| `CREATIONDATE` | Date the file was created. String in the format `yyyymmddhhmmsstt`, where the ticks (`tt`) is always 00. | X |  |
| `MODIFICATIONDATE` | Last time the file was modified, in the same format as `CREATIONDATE`.  Files located in zip archives have the modification date set rather than the creation date. | X | X |
| `ACCESSDATE` | Last time the file was accessed, in the same format as for `CREATIONDATE`. | X |  |
| `FILEATTRIBUTES` | String containing the file attributes.   * MS Windows—zero or more of the letters   `RHSACET`, where `R`=read-only, `H`=hidden,   `S`=system, `A`=archive, `C`=compressed,   `E`=encypted.  For files located in zip archives—   `T`=text file or `""`=other (binary) files * UNIX—string is   `rw`[`x` | `s`] `rw`[`x`   | `s`] `rwx`. Granted permissions are represented by the respective   letter in the string:  `r`=read;   `w`=write; `x`=execute; `s`=execute plus set   user/group ID permission. This format resembles the format of `ls -l`.  Absence of a permission is represented   by a dash (`-`). * iSeries—string is   `rw`[`x`|`s`]`rw`[`x`|`s`]`rwx`.  It is equivalent to what the QSH   command `ls -l`File produces. If the file is an object in the   library system, it is followed by a comma and `RAUDE,OMEAR`.  This additional string refers to the   permissions for the object of the current process only; group or public authorities are not   included (unlike the Unix-like part, which represents user, group and world privileges).  `RAUDE` represents the   data permissions: `R`: read; `A`: add; `U`: update;   `D`: delete; `E`: execute  `OMEAR` represents the   object permissions: `O`: operation; `M`: management;   `E`: existence; `A`: alter; `R`: reference.  Absence of a particular privilege is   represented by a dash `-`.  For more information, refer to the   iSeries documentation, such as the documentation of EDTOBJAUT. | X | X |
| `COMPRESSEDSIZE` | Size, in bytes, of the compressed file or object in a zip archive. |  | X |
| `CHECKSUM` | 32-bit number used to determine whether a file in a zip archive has been modified or corrupted. |  | X |
| `METHOD` | Method used to store the file or object; either:   * `0`—file or object is   stored without compression * `8`—file or object is   stored and compressed in a zip archive |  | X |
| `ZIPFILENAME` | Full path to the zip archive that contains the file or directory. When using relative paths, the path includes the working directory. |  | X |

Values commonly returned by $procerror following $fileproperties and $lfileproperties

| Value | Error constant | Meaning |
| --- | --- | --- |
| -13 | <UIOSERR\_OS\_COMMAND> | An error occurred while trying to perform the OS command. Set `/pri=64` to display the exact error in the message frame. |
| -1110 | <UPROCERR\_TOPIC> | Topic name not known. |
| -1132 | <UPROCERR\_UNRESOLVED\_TOPIC> | Topic could not be resolved. |

## Use

Allowed in all Uniface component types.

## Description

The $lfileproperties function
returns an associative list of the properties of the specified file or directory, ignoring any file
redirections in the assignment file. The file or directory can be located in a zip archive.

## Specifying File and Directory Paths

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

## Checking if a File Exists

The following example checks whether the file
test.txt exists in the directory sub1dir and, if so,
loads it:

```procscript
$file$ = "sub1dir\test.txt"
; or $file$ = "sub1dir/test.txt"
; or $file$ = "[.sub1dir]test.txt"
if ($lfileproperties($file$,"Filetype") = "FILETYPE=FILE") lfileload $file$, $content$
```

## Extracting a File's Modification Date and Time

This example extracts the modification date and
time of the file grid1.xml residing in grid1.zip file of
the \mysamples directory. The current working directory is
d:\usys\project, and the return value of the function is:

```procscript
FILETYPE=FILE;
MODIFICATIONDATE=2006061414351600;
COMPRESSEDSIZE=24344;
FILESIZE=272113;
CHECKSUM=351677385;
FULLPATH=GRID1.XML;
METHOD=8;
FILEATTRIBUTES=T;
ZIPFILENAME=..\mysamples\grid1.zip
```

```procscript
FIELD1.MYENTITY = $lfileproperties("..\mysamples\grid1.zip:grid1.xml")

; Extract the modification date:
getitem/id $1,FIELD1.MYENTITY,"MODIFICATIONDATE"
$2 = $date($1) ; gives $2 = "20060614"

; Extract the modification time:
$3 = $clock($1) ; gives $3 = "0000000014351600"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Added ZIP file support |

## Related Topics

- [Proc for File System Management](../../filemanagement/procforlocalfilesystems.md)


---

# $lines

Return the number of lines remaining on the current page.

$lines

## Return Values

Values returned in $lines

| Value | Meaning |
| --- | --- |
| 0 | Uniface is not printing ($printing = 0); $status is set to an empty string ("") |
| >0 | Number of lines remaining on the page,  *excluding*  the header and trailer frames. Uniface is printing ($printing = 1) |

## Use

Allowed in form and report components (and in
service components that are not self-contained).

## Description

Use $lines to test whether
there is enough space left to print your break frame, or to start printing a new occurrence on the
current page.

$lines is based upon how many
lines of font 0 will fit on the page. If widget fonts specify different fonts or fonts size, the
number of lines may be greater or less than this. If the number of lines is not a whole number, it
is rounded downwards. For example 2.8 becomes 2. Thus, if `$lines=2` there are
between 2 and 3 lines of font 0 available. There is no function that can tell how many lines of a
specified widget font will fit on a page.

To print column headers on a new page, or text at
the bottom of a page use headers and trailers surrounded by area frames with the
Printing property set to `Suppress when empty`. This is
easier then trying to do this with $lines.

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

- [Printing](../../../development/reference/devobjproperties/layout/upagepreak_pagebreak.md)


---

# $log

Return the natural logarithm of X (log e X).

$log`(`X`)`

## Parameters

X—positive numeric constant,
or a field (or indirect reference to a field), variable, function, or expression that evaluates to
a positive numeric value. X must be in the range 0 through 10 9999 .

## Return Values

Natural logarithm of X

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $log and
$log10.

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1204 | <UPROCERR\_NEGATIVE> | Negative value not allowed. |
| -1205 | <UPROCERR\_ZERO> | Zero value not allowed. |

## Use

Allowed in all Uniface component types.

## Description

The $log function returns the
natural logarithm of X (that is, log e X).

The following example returns the natural
logarithm of the given expression:

```procscript
$NATLOG$ = $log(MYFIELD * 2)
```

## Related Topics

- [$log10](log10.md)
- [$exp](exp.md)


---

# $log10

Return the base 10 logarithm of X (log10X).

$log10`(`X`)`

## Parameters

X— positive numeric constant,
or a field (or indirect reference to a field), variable, function, or expression that evaluates to
a positive numeric value. X must be in the range 0 through 109999.

## Return Values

Base 10 logarithm of X

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $log and
$log10.

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1204 | <UPROCERR\_NEGATIVE> | Negative value not allowed. |
| -1205 | <UPROCERR\_ZERO> | Zero value not allowed. |

## Use

Allowed in all Uniface component types.

## Description

The function $log10 returns
the base 10 logarithm of X, that is, log10X.

The following example returns the base 10
logarithm of the given expression:

```procscript
$NOTNATLOG$ = $log10(MYFIELD * 2)
```

If the value of MYFIELD is 50, the value stored
in $NOTNATLOG$ is 2.

## Related Topics

- [$exp10](_exp10.md)
- [$log](log.md)


---

# $logical

Return a logical value defined in the assignment file.

$logical`(`LogicalName`)`

## Parameters

LogicalName—name of a logical
symbol defined in the [LOGICALS] section of the assignment file; can be a string, or a field (or
indirect reference to a field), a variable, or a function that evaluates to a string.

## Return Values

* Value associated with the logical symbol
  name.
* empty string (""), if
  LogicalName is not found.

## Use

Allowed in all Uniface component types.

## Setting Directory Locations in Proc

You can use logicals to allow you to spawn
platform-specific commands. Consider the following section in an assignment file:

```procscript
[LOGICALS]
work_directory = c:\my_app\test\work
```

This logical symbol can be used in Proc to refer
to the appropriate directory:

```procscript
WorkDir = $logical("work_directory")
SubDir = "%%$logical("work_directory")%%%\axel"
```

The results of these statements are:

* `WorkDir` contains
  `c:\my_app\test\work`
* `SubDir` contains
  `c:\my_app\test\work\axel`

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

- [[LOGICALS]](../../../configuration/reference/assignments/asn_filesections/_logicals_.md)


---

# $lowercase

Convert a string to lowercase.

$lowercase`(`String {`,``"NlsLocale"` |
`"classic"` } `)`

## Arguments

* String—string to convert
  to lowercase; can be a string, field (or indirect reference to a field), variable, or function that
  evaluates to a string.
* `NlsLocale`—apply locale-based
  rules based on the value of the $nlslocale, as specified by
  $nlslocale or `$NLS_LOCALE`.
* `classic`—ignore locale when
  converting data; apply one-to-one character conversion according to Unicode definitions.

## Return Values

String converted to lowercase.

## Use

Allowed in all Uniface component types.

## Description

The way in which strings are converted depends on
the NLS settings in effect. If the second argument is omitted, the value of
$nlscase is used to determine case conversion behavior. For more information, see [Case Conversion](../../datatypehandling/caseconversion.md).

For example, the following Proc converts the
Turkish word `KIPIRTI` to lowercase as `kipirti`.

```procscript
FIELD1 = $lowercase ("KIPIRTI", "classic")
;Result: FIELD1 = kipirti
```

However, Turkish has both a dotted
`i` and an undotted `ı`, so this case conversion is incorrect. To get
the correct conversion, you need to set the locale to Turkish, so that locale-based case conversion
is applied.

```procscript
$nlslocale = "tr_TR" ; set locale to Turkish(Turkey)
FIELD2 = $lowercase ("KIPIRTI")
Result: FIELD2 = kıpırtı
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Added optional parameter with value `"NlsLocale"` or `"classic"` |

## Related Topics

- [$uppercase](_uppercase.md)
- [lowercase](../procstatements/lowercase.md)
- [Case Conversion](../../datatypehandling/caseconversion.md)


---

# $ltrim

Left trim a string following a pattern.

$ltrim`(`Source`,` Pattern`)`

## Parameters

* Source—string to be left
  trimmed.
* Pattern—pattern to remove.
  It can be a constant string or a syntax string. For more information, see [Syntax Strings for Pattern Matching](../../proclanguage/constants/syntax_string_constants.md)..

## Return Values

Trimmed string.

## Use

Allowed in all Uniface component types.

## Description

The $ltrim function is used to
left trim a string following a pattern.

```procscript
$1="xxxxUNIFACE"
$2 = $ltrim($1,"x")
; $2 now contains "UNIFACE"
```

## Related Topics

- [$rtrim](_rtirm.md)


---

# $modelname

Return the name of the current model

$modelname

## Return Values

* Name of the current model (in uppercase).
* empty string (`""`), if there
  is no current entity (that is, if the last node of the active path is not a field or entity).

## Use

Allowed in all Uniface component types.

## Description

The $modelname function is
useful when you are writing global Procs, because it allows you to generalize your code. It is also
useful to examine this function when you are using the Proc debugger to step through Proc
statements. You can use $modelname from everywhere within the component.

## Returning the Fully Qualified Name of the Current Field

The following Proc example returns the full qualified name of the current field:

```procscript
entry FullQualifiedFieldName
  returns string
  return $concat("$fieldname",".",$entname,".",$modelname)
end
```

---

# $msgdata

Return the message data.

$msgdata

## Return Values

Data that was sent with a
postmessage statement. The returned value has the same data type as the data
that was sent.

In addition, $msgid returns a
nonempty string. If the Asynchronous Interrupt trigger was not activated by
postmessage, $msgid returns an empty string ("").

## Use

Allowed only in an Asynchronous Interrupt
trigger.

## Message Handling

The following example shows the Asynchronous Interrupt
trigger for an application. The example assumes that MSG\_HANDLER is an instance of a service which
contains operations for processing asynchronous messages. It also assumes that MSG\_HANDLER has
already been created (probably in the Application Execute trigger as
the application started).

```procscript
;trigger Asynch Interrupt
if ( $result = "message" )
   putmess "%%$msgdst received from %%$msgsrc" 
   putmess " message id =%%$msgid"
   putmess " message text=%%$msgdata"
   
   if ( $msgid != "Ack")
      postmessage $msgsrc, "Ack", "Acknowledging message %%$msgid" 
   else
      if ( $msgid = "A" ) activate "MSG_HANDLER".A ($msgdata)
      if ( $msgid = "B" ) activate "MSG_HANDLER".B ($msgdata)
      ...
   endif
else
  
  if ( $result = "Close" ) activate "MSG_HANDLER".CLOSE
  if ( $result = "Timeout" ) activate "MSG_HANDLER".TIMEOUT
  else
     putmess "%%$instancename received unexpected async message: %%$result"
endif
```

## Related Topics

- [postmessage](../procstatements/postmessage.md)
- [$msgdst](_msgdst.md)
- [$msgid](_msgid.md)
- [$msginfo](_msginfo.md)
- [$msgsrc](_msgsrc.md)


---

# $msgdst

Return the name of the component instance to which a message was addressed.

$msgdst

## Return Values

String containing the name of the form to which
the message was addressed (the destination for the message)

In addition, $msgid returns a
nonempty string. If the Asynchronous Interrupt trigger was not activated by
postmessage, $msgid returns an empty string ("").

## Use

Allowed only in an Asynchronous Interrupt
trigger.

## Message Handling

The following example shows the Asynchronous Interrupt
trigger for an application. The example assumes that MSG\_HANDLER is an instance of a service which
contains operations for processing asynchronous messages. It also assumes that MSG\_HANDLER has
already been created (probably in the Application Execute trigger as
the application started).

```procscript
;trigger Asynch Interrupt
if ( $result = "message" )
   putmess "%%$msgdst received from %%$msgsrc" 
   putmess " message id =%%$msgid"
   putmess " message text=%%$msgdata"
   
   if ( $msgid != "Ack")
      postmessage $msgsrc, "Ack", "Acknowledging message %%$msgid" 
   else
      if ( $msgid = "A" ) activate "MSG_HANDLER".A ($msgdata)
      if ( $msgid = "B" ) activate "MSG_HANDLER".B ($msgdata)
      ...
   endif
else
  
  if ( $result = "Close" ) activate "MSG_HANDLER".CLOSE
  if ( $result = "Timeout" ) activate "MSG_HANDLER".TIMEOUT
  else
     putmess "%%$instancename received unexpected async message: %%$result"
endif
```

## Related Topics

- [postmessage](../procstatements/postmessage.md)
- [$msgdata](_msgdata.md)
- [$msgid](_msgid.md)
- [$msginfo](_msginfo.md)
- [$msgsrc](_msgsrc.md)


---

# $msgid

Return the message identifier for the message.

$msgid

## Return Values

Values returned in $msgid

| Value | Meaning |
| --- | --- |
| "" | Empty string (""), if the asynchronous event was not sent by postmessage; `$result` indicates the source of the message. |
| >0 | Message identifier, if the Asynchronous Interrupt trigger was activated by a postmessage statement; $result is `"message"`. |

## Use

Allowed only in the Asynchronous Interrupt
trigger of form components (and in service and report components that are not self-contained).

## Message Handling

The following example shows the Asynchronous Interrupt
trigger for an application. The example assumes that MSG\_HANDLER is an instance of a service which
contains operations for processing asynchronous messages. It also assumes that MSG\_HANDLER has
already been created (probably in the Application Execute trigger as
the application started).

```procscript
;trigger Asynch Interrupt
if ( $result = "message" )
   putmess "%%$msgdst received from %%$msgsrc" 
   putmess " message id =%%$msgid"
   putmess " message text=%%$msgdata"
   
   if ( $msgid != "Ack")
      postmessage $msgsrc, "Ack", "Acknowledging message %%$msgid" 
   else
      if ( $msgid = "A" ) activate "MSG_HANDLER".A ($msgdata)
      if ( $msgid = "B" ) activate "MSG_HANDLER".B ($msgdata)
      ...
   endif
else
  
  if ( $result = "Close" ) activate "MSG_HANDLER".CLOSE
  if ( $result = "Timeout" ) activate "MSG_HANDLER".TIMEOUT
  else
     putmess "%%$instancename received unexpected async message: %%$result"
endif
```

## Related Topics

- [postmessage](../procstatements/postmessage.md)
- [$msgdata](_msgdata.md)
- [$msgdst](_msgdst.md)
- [$msgsrc](_msgsrc.md)


---

# $msginfo

Return the requested information about the latest message.

$msginfo`(`Topic`)`

## Parameters

Topic—valid topic name; can be
a string, or a field (or indirect reference to a field), a variable, or a function that evaluates
to a string. The topic name is not case-sensitive; you can use uppercase or lowercase letters, or
any combination of these to increase readability.

## Return Values

Values returned by $msginfo per Topic

| Topic | Return value |
| --- | --- |
| `DATA` | The message data associated with the message. For more information, see [$msgdata](_msgdata.md). |
| `DST` | Intended destination for message. For more information, see [$msgdst](_msgdst.md). |
| `ID` | The message ID associated with the message. For more information, see [$msgid](_msgid.md). |
| `INSTANCENAME` | The name of the instance that sent the message. For more information, see [$instancename](_instancename.md). |
| `INSTANCEPATH` | The path of the instance that sent the message. For more information, see [$instancepath](_instancepath.md). |
| `SRC` | Sender of message. For more information, see [$msgsrc](_msgsrc.md). |

## Use

Allowed only in the Asynchronous Interrupt
trigger.

## Description

The information returned in
$msginfo is available using the individual functions
$instancename, $instancepath, $msgdata,
$msgdst, $msgid, and $msgsrc.

## Using $msginfo

The following code could appear in the
Asynchronous Interrupt trigger of a component:

```procscript
postmessage $msginfo("SRC"),"MSG001", %\
"Reply to sender: message received."
```

To handle messages that are incorrectly
addressed, the following code could appear in the Asynchronous Interrupt trigger of the
application:

```procscript
postmessage $msginfo("SRC"), "MSG001", %\
"Reply to sender: instance addressed is unknown"
```

## Related Topics

- [postmessage](../procstatements/postmessage.md)
- [$instancename](_instancename.md)
- [$instancepath](_instancepath.md)
- [$msgdata](_msgdata.md)
- [$msgdst](_msgdst.md)
- [$msgid](_msgid.md)
- [$msgsrc](_msgsrc.md)
- [Asynchronous Interrupt (Component)](../triggersstandard/asynchronousinterrupt2.md)
- [Asynchronous Interrupt (Application)](../triggersstandard/asynchronousinterrupt.md)


---

# $msgsrc

Return the name of the component instance that sent the message.

$msgsrc

## Return Values

String identifying the component instance that
sent the message. If the Asynchronous Interrupt trigger was activated by a
postmessage statement , it contains all the path information necessary to
reply to the message.

In addition, $msgid returns a
non-empty string.

If the Asynchronous Interrupt trigger was not activated by
postmessage (for example, by the upostmess() 3GL function), it will contain another value, such as `U3GL`, and $msgid returns an empty string.

## Use

Allowed only in an Asynchronous Interrupt
triggers.

The following code could appear in the
Asynchronous Interrupt trigger of a component:

```procscript
postmessage $msgsrc, "MSG001", "Reply to sender: message received."
```

To handle messages that are incorrectly
addressed, the following code could appear in the Asynchronous Interrupt trigger of the
application.

```procscript
postmessage $msgsrc, "MSG001", "Reply to sender: instance addressed is unknown"
```

## Related Topics

- [postmessage](../procstatements/postmessage.md)
- [$msgdata](_msgdata.md)
- [$msgdst](_msgdst.md)
- [$msgdst](_msgdst.md)
- [$msgid](_msgid.md)
- [$msginfo](_msginfo.md)
- [Asynchronous Interrupt (Component)](../triggersstandard/asynchronousinterrupt2.md)
- [Asynchronous Interrupt (Application)](../triggersstandard/asynchronousinterrupt.md)


---

# $newstruct

Explicitly create a new Struct with no members

StructVar`=`$newstruct

## Arguments

StructVar—a variable or
parameter of type struct or any

## Return Values

Returns an empty Struct

## Use

Allowed in all components

## Description

Structs are usually implicitly created by
assigning a value to a struct variable or parameter. The
$newstruct function enables you to explicitly create an empty Struct or Struct
member, which you can then populate.

## Example

The following statement inserts a reference to an
empty Struct (referenced by `vStruct1`) called `mbr`

```procscript
vStruct1->mbr = $newstruct
```

The following statement would rarely be required
except, for example, if it were used in a loop that needs to reinitialize
`vStruct2`.

```procscript
vStruct2 = $newstruct
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

---

# $next

Return the value of the next occurrence of a field.

$next`(`Field`)`

## Parameters

Field—field name; can be a
literal name, a string, or a field (or indirect reference to a field), a variable, or a function
that evaluates to a string. It can optionally contain a qualified field name, for example
`MYFLD.MYENT`.

## Return Values

* Value of Field in the next
  occurrence.
* Empty string (""), if there is no next
  occurrence.

## Use

Allowed in all Uniface component types.

## Description

The $next function enables you
to refer to the contents of a field in the next occurrence. You can use it to:

* Copy contents of a field to another field or
  variable.
* Perform calculations.
* Make Boolean comparisons.

However, $next is not always
the most efficient way of referring to a field in the next occurrence. This is particularly true
when the referenced field is part of an occurrence that has already been active.

In this case, it is often preferable to store the
contents of that field in a variable before moving to the next occurrence,  *then* 
refer to the variable. This usually costs less processing power. Use the Occurrence Gets Focus
trigger to do this. Or, if you are printing, you could also use the Leave Printed Occurrence
trigger.

## Setting a Page Break

The following example shows the use of the $next function to trigger
a page break in a report:

```procscript
; trigger: Leave Printed Occurrence
; entity : INVOICE
; if next date different
; print totals for date
; force page break

if (PAYDATE != $next(PAYDATE))
   printbreak "DAYTOTAL"
   eject
endif
```

In this example, the DAYTOTAL break frame is
printed and a page break forced after the last occurrence has been printed; if you want something
else to happen after printing the last occurrence, you need to be able to test whether the next
occurrence exists. Use the `compare` statement for this.

**Note:**   The compare statement is
usually faster.

## Related Topics

- [compare](../procstatements/compare.md)
- [$previous](_previous.md)


---

# $nlscase

Return the current value of the NLS case setting, or set it to a new value to apply or
ignore locale-based case conversion rules.

$nlscase`=``"nlslocale"` | `"classic"`

Result`=`$nlscase

## Arguments

* `nlslocale`—apply case conversion
  rules for the current locale (if not set to `classic`) when using case conversion
  Proc commands such as $uppercase and $lowercase
* `classic`—ignore locale-based
  case conversion rules when using case conversion Proc commands such as
  $uppercase and $lowercase. Convert characters on a
  character-by-character basis according to the Unicode definitions.

## Return Values

Returns the current setting.

## Use

Allowed in all Uniface component types.

## Description

When setting $nlscase, you can
specify a string, field, or variable that evaluates to a string.

Setting $nlscase overrides the
value set by `$NLS_CASE`, if specified. The value of $nlscase
itself can be overridden by specifying a locale qualifier in $uppercase or
$lowercase.

The following Proc instructions are available for
converting between uppercase and lowercase:

lowercase

uppercase

$lowercase

$uppercase

For example, if $NLS\_LOCALE is
set to `en_US`, the following code will turn off locale-based conversion.

```procscript
$nlscase = "classic"
FIELD1 = $uppercase (" Groß-Gerau")
;Result: FIELD1 =  GROß-GERAU
```

The ß character, which would have been converted
to SS if locale-based rules were applied, is not converted.

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [$NLS_LOCALE](../../../configuration/reference/assignments/_nls_locale.md)
- [Case Conversion](../../datatypehandling/caseconversion.md)


---

# $nlsformat

Set or return the current NLS format value, which determines how locale-sensitive data
is displayed.

$nlsformat`=``"nlslocale"` | `"classic"`

Result`=`$nlsformat

## Arguments

* `nlslocale`—display data of type
  Number, Float, Date, Time, and Datetime according to the current locale, if
  $nlslocale is not set to `classic`
* `classic`—ignore the locale when
  displaying locale-sensitive data

## Return Values

Returns the current setting.

## Use

Allowed in all Uniface component types.

## Description

When setting $nlsformat, you
can specify a string, field, or variable that evaluates to a string. Setting
$nlsformat overrides the value of the $NLS\_FORMAT assignment
setting, if specified.

When $nlsformat is set to
`nlslocale`:

* All display formats for Number, Float, Date,
  Time, and Datetime data are treated as if an `$NLS` format has been applied.

  Thus, the display format
  `DIS(zzzP99)` becomes `DIS($NLS(zzzP99))`. In this case, the
  `P` representing a decimal point is displayed as a comma if
  $nlslocale is `de_DE`, meaning German(Germany), or as a period if
  the locale is English (United States).
* The return values of the Proc functions
  $number,
  $date, $clock, and $datim, which
  parse a string to convert it to the respective data type, are displayed in accordance with the
  locale.

  Thus, if the value of
  $datim is `2009122316094200`, it is displayed as `Dec 23,
  2009 4:09:42 PM` if the locale is English (United States), and as `23 Dec 2009
  16:09:42` if the locale is English (United Kingdom).

## Effect of Locale on Displayed Date

Given a DateTime value of `2019120216094200`, and the display format `DIS($NLS(FULL, DATE))`, the following
table shows how the date is displayed is displayed for some locales:

Effect of Locale on Displayed Dates

| Locale Code | Locale | Displayed Data |
| --- | --- | --- |
| en\_US | English (United States) | Wednesday, December 2, 2019 |
| en\_GB | English (United Kingdom) | Wednesday, 2 December 2019 |
| fr\_CA | French (Canada) | mercredi 2 décembre 2019 |
| nl\_NL | Dutch (Netherlands) | woensdag 2 december 2019 |
| ja\_JP | Japanese (Japan) | 2019年12月2日水曜日 |
| bg\_BU | Bulgarian (Bulgaria) | 02 декември 2019, сряда |

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [$NLS_FORMAT](../../../configuration/reference/assignments/_nls_format.md)
- [$nlslocale](_nlslocale.md)
- [$number](_number.md)
- [$date](_date.md)
- [$clock](_clock.md)
- [$datim](_datim.md)
- [Language and Locale](../../../internationalapps/concepts/languageandlocale.md)
- [Parsing and Displaying Date and Time Data](../../../internationalapps/concepts/dateandtimeparsing.md)
- [Display Formats](../../../development/reference/fielddefinitions/displayformats.md)


---

# $nlsinternaltime

Specify whether to use Coordinated Universal Time (UTC+00:00) as the internal time
zone.

$nlsinternaltime`=``"UTC"` | `"classic"`

Result`=`$nlsinternaltime

## Arguments

* `UTC`—sets the internal time
  zone to UTC+00:00, and adjusts to the external or local value when displaying or parsing date and
  time data in fields.
* `classic`—use the local time
  zone; do not apply any internal to external time zone correction. This is the default.

## Return Values

Returns the current setting.

## Use

Allowed in all Uniface component types.

## Description

Setting the Proc function
$nlsinternaltime overrides the value set by
$NLS\_INTERNAL\_TIME in the assignment file (if defined).

Setting the value to `classic`
explicitly instructs Uniface to use its default behavior, which is to use the local time as defined
on the executing system. The date and time are not corrected to the external time.

Setting the value to `UTC` sets the
internal time zone to Coordinated Universal time at Greenwich (UTC+00:00). This has the following
consequences:

* Proc functions $clock,
  $date, and $datim return the internal time
* The internal date and time is stored and
  retrieved from the database
* The internal time is used when exchanging data
* The internal time zone is always corrected to
  the external time zone when displaying data.

For applications that store date or time data, it
makes sense to use UTC+00:00 as the internal time zone, so that all data conforms to a standard
time. For example, if you place an order at 9:00 AM in Detroit, the date is corrected to the UTC
time of UTC-05:00, in other words 14:00 (2:00 PM) Greenwich Mean Time. Corrections for Daylight
Savings Time (DST) are also applied. When retrieving data from the database, the UTC time is
corrected to display the time according to the external time zone.

**Caution:** 

Any data that exists in the database prior to
setting the internal time is assumed to be stored at GMT+00:00, so it will also be corrected to the
external or local time when displayed.

## UTC Conversions During DST Transitions

When the switch to or from Daylight Savings Time
occurs, special rules are applied to the external time conversions. These are required to
consistently handle the time that is lost when the clocks are set forward or gained when the clocks
are set back.

The easiest way to understand this is with a
couple of examples:

* Assume that the clock is set forward at 02:00
  by one hour, meaning that 02:00 becomes 03:00. Any time from 02:00 and before 03:00 is invalid. If
  you enter a time such as 02:30, it will be displayed as 03:30.

  External Time Zone Conversions when Clock is Set Forward (02:00 becomes 03:00)

  External time zone is shown with a time zone
  shift of UTC+1. The square brackets indicate an invalid input time.

  | External Time In | UTC | External Time Out |
  | --- | --- | --- |
  | 12:00 | 23:00 | 12:00 |
  | 01:00 | 00:00 | 01:00 |
  | 2:00 = 3:00 | 01:00 | 03:00 |
  | [02:30 =] 3:30 | 01:30 | 03:30 |
  | 03:00 | 01:00 | 03:00 |
  | 03:30 | 01:30 | 03:30 |
  | 04:00 | 02:00 | 04:00 |
* Assume that the clock is set backward at 03:00
  by one hour, meaning that 03:00 becomes 02:00. Now there two times, separated by an hour when it is
  really 02:00, once *before* the transition and another *at* the time of
  transition. The same is true of 03:00.

  The functions that convert from external time
  treat such a doubly-occurring times as if it were the second time. So when you enter 02:00 the
  internal time will reflect the 02:00 after the transition.

  External Time Zone Conversions when Clock is Set Backward (03:00 becomes 02:00)

  External time zone is shown with a time zone
  shift of UTC+1. The square brackets indicate an invalid input time.

  | External Time In | UTC | External Time Out |
  | --- | --- | --- |
  | 01:00 | 23:00 | 01:00 |
  | [2:00] | 00:00 | 02:00 |
  | [ 03:00 =] 2:00 | 01:00 | 02:00 |
  | 02:30 | 01:30 | 02:30 |
  | 03:00 | 02:00 | 03:00 |

The following Proc code checks the current value
of internal time, and if it is not UTC, it temporarily sets the internal time to UTC before
performing a store, and then sets it to back to previous value.

```procscript
$INTERNALTIME$ = $nlsinternaltime
if ($INTERNALTIME$ != "UTC")
  $nlsinternaltime = "UTC"
endif
store
$nlsinternaltime = $INTERNALTIME$
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [$nlstimezone](_nlstimezone.md)
- [Time Zones](../../../internationalapps/concepts/timezones.md)
- [Display Formats](../../../development/reference/fielddefinitions/displayformats.md)


---

# $nlslocale

Set or return the current locale (language and country), or locale setting.

$nlslocale`=``"classic"` | `"system"` | ln\_CY

result`=`$nlslocale

## Arguments

* `classic`—Uniface behavior prior
  to Uniface 9.4; no locale-based sorting or formating is performed. This is the default.
* `system`—sorting and formatting
  behavior is based on the locale defined for the local (client) system; Windows only
* ln\_CY—locale identifier, in
  which ln specifies the two-letter language code and `CY` the
  two-letter country code as defined by ISO 639; for example, `fr_CA` for French
  (Canada)

## Return Values

Returns the current locale or setting.

## Use

Allowed in all Uniface component types.

## Description

When setting the $nlslocale,
you can specify the value as a string, field (or indirect reference to a field), variable, or
function that evaluates to a string.

The value of $nlslocale
overrides the value of the $NLS\_LOCALE assignment setting. If the NLS locale is
set to `system` or a specific locale, locale-based processing rules are applied,
unless they are overridden by one of these other assignment settings, or in Proc. If it is set to
`classic`, Uniface does not apply locale-based processing unless the locale is set in
Proc using $nlslocale.

The default value of
the$NLS\_CASE, $NLS\_FORMAT, and
$NLS\_SORT\_ORDER assignment settings is `nlsformat`. This means that
they use the value set by $NLS\_LOCALE to control their specific area of
functionality. Thus, setting $nlslocale affects the default way in which data is
displayed, sorted, and transformed with case conversion. For more information, see [Language and Locale](../../../internationalapps/concepts/languageandlocale.md)..

You can use $nlslocalelist to
get the system locale or a list of locales.

**Note:** The NLS locale is not used for locale-based processing in the client side of a dynamic server page. To set the locale for the DSP client, you can use $webinfo("locale").

## Effect of Locale on Displayed Date

In the following example, when the user selects a locale in the LOCALES field, the Value Changed trigger assigns this value to the $nlslocale and updates the value of the CURRENTDATE field.

```procscript
;Value Changed trigger of LOCALES
$nlslocale = LOCALES
CURRENTDATE = $datim
```

With the display format (Field Layout) of CURRENTDATE set to `DIS($NLS(FULL, DATE))`, the following table shows how the date is displayed for some example locales:

Effect of Locale on Displayed Dates

| Locale Code | Locale | Displayed Data |
| --- | --- | --- |
| en\_US | English (United States) | Wednesday, December 2, 2019 |
| en\_GB | English (United Kingdom) | Wednesday, 2 December 2019 |
| fr\_CA | French (Canada) | mercredi 2 décembre 2019 |
| nl\_NL | Dutch (Netherlands) | woensdag 2 december 2019 |
| ja\_JP | Japanese (Japan) | 2019年12月2日水曜日 |
| bg\_BU | Bulgarian (Bulgaria) | 02 декември 2019, сряда |

## Setting Locale with Local Browser Setting

When a request is sent to a Uniface Web
application from the client browser, the locale of the browser is included in the HTTP headers.
This can be useful, for example, if you want to return information in the local language or
currency. Use the following Proc construction to extract the browser locale from the request header
and use it to set $nlslocale:

```procscript
$nlslocate = $item("accept-language", $webinfo("httpRequestHeaders"))
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [$NLS_LOCALE](../../../configuration/reference/assignments/_nls_locale.md)
- [Language and Locale](../../../internationalapps/concepts/languageandlocale.md)
- [Sorting Based on Locale](../../lists/localbasedsorting.md)
- [Display Formats](../../../development/reference/fielddefinitions/displayformats.md)
- [Syntax Strings for Pattern Matching](../../proclanguage/constants/syntax_string_constants.md)
- [Case Conversion](../../datatypehandling/caseconversion.md)
- [$webinfo("Locale")](_webinfo_locale.md)


---

# $nlslocalelist

Return a list of valid locales or the system locale.

Result`=`$NlsLocaleList {  `("system")` }

## Parameters

* `system`—return the locale as
  specified on the operating system

## Return Values

Returns an associative list of available locales,
or the system locale

## Use

Allowed in all Uniface component types.

## Description

You can use the $nlslocalelist
to check the system locale or populate a widget's ValRep list, enabling the user to select the
locale.

```procscript
$valrep (LOCALELIST) = $nlslocalelist
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [Language and Locale](../../../internationalapps/concepts/languageandlocale.md)


---

# $nlssortorder

Set or return the current sequencing rules to apply when sorting strings in entities
and lists, or reading occurrences from the hitlist.

$nlssortorder`=``nlslocale` | `classic` | `binary`

Result`=`$nlssortorder

## Parameters

| Parameter | Description |
| --- | --- |
| `NLSLOCALE` | Applies locale-based sorting for strings, if $nlslocale is not set to `classic`. |
| `CLASSIC` | No locale-based sorting rules are applied. |
| `BINARY` | Binary ordering |

## Return Values

Returns a string indicating the sort order
currently in use.

## Use

Allowed in all Uniface component types.

## Description

Use the $nlssortorder function
to check, set, or change the way in which string data is sequenced by:

* Proc sort commands (sort,
  sort/list, $sort, and $sortlist)
* The order by clause of the
  read statement. This is used to sort data in the hitlist (in other words, when
  the hitlist is sorted by Uniface, not the database).

The value $nlssortorder may be
overridden by the Type option of Proc sort commands.

Setting $nlssortorder in Proc
overrides the value of the $NLS\_SORT\_ORDER assignment setting, if set.

If $NLS\_SORT\_ORDER is not set,
the value of $nlslocale is used.

If $nlslocale is not set, the
default sort order for strings is binary.

## $nlssortorder

The following example saves the current sorting
order in general variable $1, and sets the current sorting order to BINARY:

```procscript
; save current sort order
; set sort order to BINARY
; sort country codes as binary
; restore original sort order

$1 = $nls_sort_order
$nls_sort_order = "BINARY"
sort/e "COUNTRY_CODES", "CODE.COUNTRY:a"
$nls_sort_order = $1
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [read](../procstatements/read.md)
- [sort](../procstatements/sort.md)
- [$language](_language.md)
- [$variation](_variation.md)
- [$NLS_SORT_ORDER](../../../configuration/reference/assignments/nls_sort_order.md)
- [sort/list](../procstatements/sortlist.md)


---

# $nlstimezone

Return the current external time zone setting, or set it to a new value.

$nlstimezone`=`TimeZone | `"classic"` |
`"system"`

Result`=`$nlstimezone

## Arguments

* TimeZone—name of the time
  zone as defined in the [International Components for
  Unicode (ICU)](http://site.icu-project.org/). For example, `America/Detroit` or `EST`.

  **Tip:** 

  You can use the
  $nlstimezonelist function to get the list of valid time zones, or the time zones
  available on the system.
* `classic`—no time zone is
  specified. All date and time data is treated as being at the local time as specified on the
  executing system, and no time zone-based corrections are applied. Default.
* `system`—use the time zone as
  set on the local system; Windows only.

## Return Values

Returns the current setting.

## Use

Allowed in all Uniface component types.

## Description

When setting $nlstimezone, you
can specify a string, field, or variable that evaluates to a string. Setting
$nlstimezone overrides the value set by $NLS\_TIME\_ZONE in the
assignment file (if defined).

Setting the value of
$nlstimezone and/or $nlsinternaltime influences the date and
time of values that are:

* Returned by the Proc functions
  $clock, $date, and $datim
* Displayed in fields with data types date,
  time, or combined date and time
* Stored and retrieved in the database
* Exchanged when using XML, call-in, or
  call-out

If $nlstimezone is set to
`classic`, no time zone-related processing occurrs. It is assumed that all times are
the local time. This is Uniface default behavior.

**Note:**  Prior to Uniface 9.4, setting the Windows
environment variable TZ had no effect on the operating system date and time returned by Uniface.
Since the availablity of $NLS\_TIME\_ZONE, this setting is taken into
consideration, even if $NLS\_TIME\_ZONE is set to `classic`. To
ensure that the date and time data used by Uniface is in sync with Windows, set
$NLS\_TIME\_ZONE to `System`.

If $nlstimezone is set to a
specific time zone or to `system`, time zone corrections can be applied, such as
daylight savings time are applied.

## $nlstimezone

```procscript
;Value Changed trigger of TIMEZONELIST
$nlstimezone = TIMEZONELIST
CURRENTDATETIME = $datim
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [$NLS_TIME_ZONE](../../../configuration/reference/assignments/_nls_time_zone.md)
- [$clock](_clock.md)
- [$date](_date.md)
- [$datim](_datim.md)
- [$nlsinternaltime](_nlsinternaltime.md)
- [$nlstimezonelist](_nlstimezonelist.md)
- [Time Zones](../../../internationalapps/concepts/timezones.md)


---

# $nlstimezonelist

Returns a list of time zones.

Result `=`$nlstimezonelist {  `("system")` }

## Parameters

`system`—return the system time
zone

## Return Values

Returns an associative list of
value-representation pairs for valid time zones.

## Use

Allowed in all Uniface component types.

## Description

You can use the
$nlstimezonelist to populate a widget's ValRep list, enabling the user to select
the local time zone.

```procscript
$valrep (TIMEZONES) = $nlstimezonelist
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [Time Zones](../../../internationalapps/concepts/timezones.md)


---

# $nmforms

Return a list of all non-modal form instances in the component pool.

$nmforms

## Return Values

* String containing a list of form instance
  names. (This list can be manipulated with Proc statements such as getitem,
  getlistitems, and so on.)
* Empty string (""), if no non-modal forms have
  been started.

## Use

Allowed in form components, and in service and
report components that are not self-contained.

## Listing Active Non-Modal Forms

The following example could be used to fill the
field LISTBOX with the list of non-modal forms that are currently active:

```procscript
$valrep(LISTBOX) = $nmforms
```

To allow the user to change focus to the desired
form, the Detail trigger for LISTBOX contains the following code:

```procscript
; trigger: Detail for LISTBOX

if (LISTBOX != " ")
   setformfocus LISTBOX
endif
```

## Related Topics

- [newinstance](../procstatements/newinstance.md)


---

# $number

Returns a numeric value derived from a numeric string.

$number`(`String`)`

## Parameters

String—a string containing a number or scientific notation. If the
number appears after alphabetic data, it is not converted.

## Return Values

* Value of the leading numeric part it
  encounters in String.

  The actual value returned depends on the
  locale, as determined by the values of $nlsformat and
  $nlslocale.
* `0`, if String contains no
  numeric text, if it starts with alphabetic text, or if it starts with a round bracket (open parenthesis) in classic mode.
* `""`, if the input of $number is
  a Numeric or Float with value `""`.

## Use

Allowed in all Uniface component types.

## Description

$number returns a numeric value derived from the numeric string given as a parameter.

The numeric string is modified based whether the NLS format or locale is set, and then interpreted as a number. If the numeric string is considered in error, a value of zero is returned.

## Locale-Based Processing

The value of $nlsformat
determines how $number converts the input string, including the numeric
separators it recognizes, and how it handles the minus sign and non-numeric characters.

* If $nlsformat is set to
  `nlslocale`, it uses the value of $nlslocale to determine the
  numeric separators. See [NLS Conversion Rules](#NLS).
* If it is not set or is set to `classic`, it uses the dot ( `.` ) as
  the decimal separator. See [Classic Conversion Rules](#Classic).

## Numeric forms

The $number function recognizes
the following numeric forms, which are interpreted according to the NLS format, the NLS locale, or classic mode:

* Basic numeric such as `123.45`.
* Bracketed numbers, which means the value is the enclosed number, negated. For example `(123.45)` is treated as `-123.45`.
* Scientific notation, which consists of two number parts separated by the exponent symbol pattern. The left is the mantissa and right is the exponent. The value is the mantissa multiplied by the exponent as a power of ten. For example, `123.45e2` returns `12345`.

**Note:** If a number is not bracketed, it is interpreted as a basic numeric. It is only considered a scientific notation number if a valid exponent pattern is found.

These three forms are interpreted according to the NLS format, the NLS locale, or classic mode.

## NLS Conversion Rules

All NLS numeric strings

* All symbols are interpreted according to the NLS locale.
* All white space is ignored.
* All group separators (also called thousand separators) are ignored.

Basic number

* Valid characters are white space, sign, decimal separator, group separator, and digits.
* Any invalid character causes truncation of the string at that character's position.
* The minus or plus sign may appear as the first or last character of the string. If it appears anywhere else, the string will be truncated directly after the sign.
* The decimal separator may appear once. After that, it is considered an invalid character.

Bracketed number

* Valid characters are white space, decimal separator, group separator, digits, and opening and closing parentheses (round brackets).
* Any invalid character is considered an error and zero is returned.
* Opening round bracket must be the first character and the closing round bracket must be the last character.
* The decimal separator may appear once. After that, it is considered an invalid character.

Scientific notation

* Valid characters are the valid characters for the mantissa and exponent and an exponent symbol pattern.
* The exponent symbol pattern consists of an exponent symbol, an `e`, `E`, or the NLS exponent. It is only recognized if it is preceded by a valid character for the mantissa and followed by a valid character for the exponent.

  Negative exponents that result in more than three decimal places, are rounded to three decimal places.

  Positive exponents that result in more than 49 digits are truncated at 49 digits.
* The mantissa is interpreted as a basic numeric and is terminated by the exponent pattern.

  **Note:** Truncation can cause the whole numeric string not to be seen as scientific notation.
* For the exponent:

  + Valid characters are white space, sign, group separator and digits. (The decimal separator is an invalid character.)
  + Any invalid character causes truncation of the string at that character's position.
  + The sign may appear as the first character. If it is a minus sign, the exponent is interpreted as a negative power of ten.
  + A second occurrence of the sign, truncates the numeric string after the sign and applies to the whole number, not the exponent.

## Classic Conversion Rules

For all classic numeric strings

* The decimal separator is the dot ( `.` ) character.
* Only leading spaces are ignored.
* Any invalid character causes truncation of the string at that character's position.

Basic Numeric

* Valid characters are the plus or minus sign, decimal separator, and digits.
* The sign may appear as the first character. After that, it is considered an invalid character.
* The decimal separator may appear once. After that, it is considered an invalid character.

Bracketed Number

Not supported in classic mode. Zero is always returned.

Scientific Notation

* Valid characters are the valid characters for the mantissa and exponent and an exponent symbol pattern.
* The exponent symbol pattern consists of an exponent symbol, an `e` or `E`. It is only recognized if it is preceded by a valid character for the mantissa and followed by a valid character for the exponent.
* The scientific notation format is preserved with the limitation that the exponent is truncated after 4 digits.
* Mantissa is interpreted as a classic basic numeric and is terminated by the exponent pattern.

  **Note:** Truncation can cause the whole numeric string not to be seen as scientific notation.
* Exponent:
  + Valid characters are sign and digits
  + The sign may appear as the first character and is interpreted as a negative power of ten
  + A second occurrence of the sign, truncates the numeric string after the sign and applies to the whole number, not the exponent

  **Note:** White space and group and decimal separators are invalid characters and cause truncation.

## Using scan and $number

You can use a combination of the
scan statement and $number to extract numeric data that is
preceded by alphabetic data, as shown in the following example:

```procscript
; find start of numeric data
; string ($1) contains numeric data
; save $result (start position of numeric data)

clrmess
$1 = "Amsterdam123jim"
scan $1,'#'
if ($result > 0)
   $3 = $result
else
   message "%%$1 does not contain numeric data"
   return -1
endif
$2 = $number($1[$3])
putmess "numeric part of %%$1 is %%$2"
```

History

| Version | Change |
| --- | --- |
| 9.7.05.019 | NLS locale applied to scientific notation. |
| 9.6.01 | Returns `""` if the input is a Numeric or Float with value `""`. |

## Related Topics

- [$nlsformat](_nlsformat.md)
- [$nlslocale](_nlslocale.md)
- [Language and Locale](../../../internationalapps/concepts/languageandlocale.md)


---

# $occcheck

Return or set the requirement for checking an occurrence.

$occcheck { `(`Entity`)` }

$occcheck { `(`Entity`)` } `=`Expression

set | reset  $occcheck {`(`Entity`)` }

## Parameters

* *Entity* —entity name; can be a
  literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
  the current entity is used.
* Expression—expression that
  evaluates to a numeric value, explicitly setting the value of $occcheck. When
  Expression evaluates to a nonzero value, $occcheck becomes 1.

## Return Values

Values returned in $occcheck

| Value | Meaning |
| --- | --- |
| 0 | Occurrence checking is  *not*  enabled. |
| 1 | Occurrence checking is currently enabled. |

When $occcheck is used as the
target of an assignment, $status is set:

Values returned in $status

| Value | Meaning |
| --- | --- |
| "" | Occurrence checking could not be enabled. This usually means that Entity is not present or does not exist. |
| 1 | Occurrence checking was successfully enabled. |

## Use

Allowed in all Uniface component types.

## Description

$occcheck indicates whether
the current occurrence of Entity is to be validated the next time that
validation can occur.

If $occcheck indicates that
validation is demanded, validation is performed regardless of whether validation is actually
required. (Validation is required when both $occmod and
$occvalidation are 1, indicating that the occurrence has been modified, but has
not yet been validated.)

Validation can occur when:

* The user leaves the occurrence (for example,
  with ^NEXT\_OCC or a mouse click)

  An explicit validation statement is
  encountered (for example, validateocc)

  A store statement is
  encountered.

Validation includes syntax checks for each field
in the entity, activation of the Validate Occurrence trigger, and, in forms only, activation of the
Leave Modified Occurrence trigger. After validation completes, $occcheck is set
to 0.

You can also set the value of
$occcheck as a Proc assignment. Set $occcheck to 1 to require
checking for the specified entity; set it to 0 to let Uniface take responsibility for validation.
For example:

```procscript
$occcheck=!$occcheck
```

The following example shows how to use this
function in the Occurrence Gets Focus trigger:

```procscript
; trigger: Occurrence Gets Focus

set $occcheck(CUSTOMER)
```

This use of the function
$occcheck causes the Leave Modified Occurrence trigger in the form to behave
like a Leave Occurrence trigger.

## Related Topics

- [validate](../procstatements/validate.md)
- [validatefield](../procstatements/validatefield.md)
- [validatekey](../procstatements/validatekey.md)
- [validateocc](../procstatements/validateocc.md)
- [$fieldcheck](_fieldcheck.md)
- [$fieldendmod](_fieldendmod.md)
- [$fieldmod](_fieldmod.md)
- [$keycheck](_keycheck.md)
- [$keymod](_keymod.md)
- [$occmod](_occmod.md)
- [$occvalidation](_occvalidation.md)
- [Leave Modified Occurrence](../triggersstandard/leavemodifiedoccurrence.md)
- [Validate Occurrence](../triggersstandard/validateoccurrence.md)


---

# $occcrc

Set or return the CRC checksum of an occurrence.

$occcrc`(`EntityName`)`

$occcrc`(`EntityName`)``=`CheckSum

## Parameters

* EntityName—entity name
* CheckSum—eight-character
  hexadecimal string

## Return Values

* Eight-character hexadecimal string that
  represents the current values of an occurrence's fields. It is the CRC checksum as calculated by
  the database driver for database occurrences.
* An empty string for non-database occurrences

If $occcrc is not equal to an
eight-character hexadecimal string, $procerror is set to the error constant
`<UPROCERR_RANGE>`.

## Use

Allowed in all Uniface component types.

## Description

$occcrc returns an
eight-character hexadecimal string that represents the current values of an occurrence's fields. If
the occurrence's field values change, the CRC checksum calculation yields a different result.

$occcrc can be set by
$occcrc, and by Proc statements that load data from a disconnected record set:
xmload, webload, and structToComponent.
These commands set the CRC to match the value in the disconnected record set. Otherwise,
$occcrc is set automatically when loading data from a database.

**Note:**  The CRC is not set if the entity's
Locking property is set to `No Updates`.

## Disconnected Record Sets

CRC checksum values are required for disconnected
record sets, and are produced automatically by Uniface when loading data from a database, or when
creating or loading data from XML, JSON, or Structs. They are used by reconnect
to determine if an occurrence can be updated by a disconnected occurrence.
reconnect does not update an occurrence unless the CRC value in the data stream
matches the value of $occcrc for the occurrence in the component.

## Disabling CRC Checks During reconnect

If you set the value of
$occcrc for an occurrence to `00000000`, the
reconnect command does not carry out a CRC check before merging data from the
disconnected occurrence.

## Related Topics

- [Disconnected Record Sets](../../../howunifaceworks/dataio/disconnectedrecordssets/disconnected_record_sets.md)
- [Proc for Disconnected Record Sets](../../../howunifaceworks/dataio/disconnectedrecordssets/procfordisconnectedrecordsets.md)
- [Occurrence Metadata](../../../integration/xml/concepts/processing_information.md)
- [Reconnect Process](../../../howunifaceworks/dataio/disconnectedrecordssets/reconnect_process.md)


---

# $occdbmod

Return the modification status of a database occurrence.

$occdbmod { `(`Entity`)` }

## Parameters

*Entity* —entity name; can be a
literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
the current entity is used.

## Return Values

Values returned in $occdbmod

| Value | Meaning |
| --- | --- |
| "" | Entity does not exist or is not painted on the component. |
| 0 | In the following cases:   * No modifications have been made to   database fields in the occurrence. * No entities are painted on the   component. |
| 1 | In the following cases:   * A field in the occurrence that is   defined as being a database field has been modified. * The current occurrence is a database   occurrence that has been removed. |

## Use

Allowed in all Uniface component types.

## Description

$occdbmod is an
occurrence-level function that tests whether any database field in the current occurrence has been
modified. Non-database model fields and dummy fields do not affect $occdbmod.

Events that cause a field to modified include:

* The user entering a retrieve profile in an
  empty field. (This means that $occdbmod can be set to 1 before a
  retrieve has been performed.)
* The user changing the value of data that has
  been retrieved.
* Modification of a non-database field made by
  a Proc assignment (`=`) without the `/init` switch.

(You could consider $occdbmod
to be the inclusive OR of the values of the $fielddbmod functions for all
database fields in the occurrence.)

## Related Topics

- [$fielddbmod](_fielddbmod.md)
- [$fieldmod](_fieldmod.md)
- [$instancemod](_instancemod.md)
- [$instancedbmod](_instancedbmod.md)
- [$occmod](_occmod.md)


---

# $occdel

Return the removal status of an occurrence.

$occdel { `(`Entity`)` }

## Parameters

*Entity* —entity name; can be a
literal name, string, variable, function, parameter, or indirect reference to a field. For example:
If omitted, the current entity is used.

## Return Values

$occdel is set to 1 if an
occurrence is removed by the remocc Proc statement or the ^REM\_OCC structure
editor function.

Values returned by $occdel

| Value | Meaning |
| --- | --- |
| 1 | Occurrence is marked for removal. |
| 0 | Occurrence is not marked for removal. |
| "" | Entity does not exist or is not painted on the component. |

## Use

Allowed only in the Delete trigger of components.

## Description

The $occdel function is useful
because an occurrence may be deleted without a user explicitly deleting this particular occurrence.
Consider a one-to-many relationship, with a cascading delete, as shown in the following
illustration:

Outer and inner entities, with a cascading delete

If the first occurrence of entity B is removed
(using the remocc command or ^REM\_OCC structure editor function), and a
store is performed, the Delete trigger is activated only in the first occurrence
of entity B; in this trigger, $occdel returns 1 (occurrence will be removed).

Now consider the following situation. The first
occurrence of entity B is removed, the occurrence of entity A is removed, then a
store is performed. The Delete trigger for the occurrence of entity A is
activated, and $occdel returns 1, because this occurrence is deleted. The Delete
trigger for the first occurrence of entity B is also activated, and $occdel
returns 1, because this occurrence is also deleted.

For the other occurrences in entity B (that is,
those that have not been explicitly removed), the actions performed by Uniface are slightly
different. The Delete trigger is activated for entity B only once. The occurrence number (given by
$curocc) is NULL, and $occdel returns 0, as these other
occurrences have not been explicitly deleted.

Therefore, when there is a cascading delete, the
Delete trigger of the inner entities will be activated once for each occurrence explicitly removed,
then a final time for all other occurrences.

## Related Topics

- [erase](../procstatements/erase.md)
- [remocc](../procstatements/remocc.md)
- [Remove Occurrence](../triggersstandard/removeoccurrence.md)


---

# $occdepth

Return the depth of the painted occurrence.

$occdepth { `(`Entity`)` }

## Parameters

*Entity* —entity name; can be a
literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
the current entity is used.

## Return Values

Number of lines drawn for the specified
occurrence.

## Use

Allowed in form and report components
.

## Description

The $occdepth allows you to
test how many lines are needed to print an occurrence of the specified entity. This function cannot
take into consideration any vertical expansion that might occur when the frame is printed at run
time.

**Note:**  It is usually easier to set the Print
Occurrence on Same Page property of an entity or named area frame.

The following example shows how to use
$occdepth to determine whether there is enough space left on a page to print an
occurrence:

```procscript
; trigger: Occurrence Gets Focus
if ($lines < $occdepth)
   eject
endif
```

## Related Topics

- [$framedepth](_framedepth.md)


---

# $occhandle

Return the handle of the current occurrence of the requested entity.

$occhandle {`(` *Entity* `)` }

## Parameters

*Entity* —entity name; can be a
literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
the current entity is used.

## Return Values

Values returned in $occhandle

| Value | Meaning |
| --- | --- |
| "" | * An error occurred.   $procerror contains the exact error. * *Entity*  is an incorrect   entity * There is no occurrence for the given   entity with the name  *Entity* . * There are no public operations   defined for the entity. If there are no public operations, no signature can be created for it.   Without a signature, no handle can be returned; instead a NULL value is returned. |
| >0 | Handle of the current occurrence of the entity of  *Entity* . |

Values of $procerror Commonly Returned Following $occhandle

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | UPROCERR\_FIELD | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| -1102 | UPROCERR\_ENTITY | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Related Topics

- [$collhandle](_collhandle.md)
- [$instancehandle](_instancehandle.md)


---

# $occmod

Return the modification status of an occurrence.

$occmod { `(`Entity`)` }

## Parameters

* *Entity* —entity name; can be a
  literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
  the current entity is used.

## Return Values

Values returned by $occmod

| Value | Meaning |
| --- | --- |
| 1 | * Occurrence has been removed * At least one field has been modified.   The field can be any database field or a non-database field (if Entity is a   non-database entity). |
| 0 | Occurrence has not been removed and no field has been modified. |
| "" | Entity does not exist or is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

$occmod is an occurrence-level
function that tests the modification status of data in the current occurrence of the specified
entity.

The $occmod function is set to
`0` by the following events and statements:

* Restarting a component (except when the
  component has the Keep Data in Memory property set).
* retrieve (Note that
  $occmod can be set to `1` *before*  a
  retrieve has been performed.)
* store
* release
* clear
* reload

Events that cause a field to be modified (and
$occmod set to `1`) include:

* The user enters a retrieve profile in an
  empty field.
* The user changes the value of data that has
  been retrieved.
* A non-database field is modified by a Proc
  assignment (`=`) without the /init switch.

In this example, $occmod
checks whether the current occurrence of ENTNAME has been modified, and records this status in the
message frame.

```procscript
$13 = $occmod (ENTNAME)
selectcase $13
   case 0
      putmess "The occurrence is unmodified"
   case 1
      putmess "The occurrence has been modified"
endselectcase
```

## Related Topics

- [$formmod](_formmod.md)
- [$occcheck](_occcheck.md)
- [$occdbmod](_occdbmod.md)


---

# $occproperties

Return or set the properties of an occurrence.

$occproperties`(`Entity`)`

$occproperties`(`Entity`)``=`PropertyList

## Parameters

* *Entity* —entity name; can be a
  literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
  the current entity is used.
* PropertyList—Uniface
  associative list of Property`=`Value pairs, in
  which the Property can be:

  + `errormsg`—occurrence-level
    validation error message. This can contain default Uniface validation error messages, or it can
    contain user-defined error messages.
  + `subclass`—a style subclass
    used by server pages to present validation errors.
  + DspWidgetProperty—in
    Dynamic Server Pages only, a property that is supported by the AttributesOnly widget. For more information, see [Entity and Occurrence Properties in Dynamic Server Pages](../../../_reference/widgetsdsp/dsp_defentity.md).

## Return Values

Associative list of properties.

## Use

Allowed in all Uniface component types.

## Description

$occproperties returns or sets
the properties of an occurrence using an associative list.

## Providing Error Messages in Web Applications

You can use `subclass` to provide
visual clues for errors, and `errormsg` to provide detailed information on the
nature of the error in a server page. To use $occproperties for this purpose,
place it in the entity-level On Error trigger.

`subclass=MyClass` can be
substituted by, or used with, a specific error message using `errormsg=My Error
Message`

For example, when used together, the syntax
is:

$occproperties`(`Entity`)="subclass=`MyClass`;errormsg=My error message"`

* MyClass—predefined style
  class in the application’s CSS.
* MyErrorMessage—message
  such as `"Error in occurrence`".

The syntax of $occproperties
must not include spaces.

**Note:**   If the On Error trigger is empty, Uniface
changes the default code from `$text("%%$error")` to
`$occproperties(Entity)="errormsg=$text(%%$error`), but only if
the trigger has been fired due to a validation error for a field or key.

## Manipulating HTML Attributes for Occurrences in DSPs

In Dynamic Server Pages, you can use
$occproperties to set the attributes of the HTML element in the layout that is
bound to an occurrence in the runtime component. It is only possible to do this when the occurrence
is bound to a single HTML element, not to a range of elements.

The properties that can be set in this way are the
same ones supported by the AttributesOnly widget. For more information, see [Entity and Occurrence Properties in Dynamic Server Pages](../../../_reference/widgetsdsp/dsp_defentity.md).

For example, in a DSP in which each occurrence is
bound to a table row (`<tr>`) element in the layout, you could highlight the
occurrences that have been modified (`$occstatus=""mod"`). The
following code adds a `modified` value to the HTML `class` attribute
of occurrences that meet the condition. Any CSS style definitions that are defined for class
`modified` are applied to the HTML elements bound to these occurrences.

```procscript
if ($occstatus(<$entname>) = "mod")
  putitem/id $occproperties("<$entname>"), "class:modifed", "true"
endif
```

To reset the state of the attribute without
knowing what classes were originally in it, you can precede it with an exclamation mark:

```procscript
putitem $occproperties (myent), "!class:modifed"
```

For more information, see [class:ClassName](../../../development/reference/devobjproperties/widgets/dspwidgets/dsp_class.md).

## Related Topics

- [$CurEntProperties](_curentproperties.md)
- [On Error (Entity)](../triggersstandard/onerror.md)


---

# $occstatus

Return or set the reconnect status for each disconnected occurrence in a
component.

$occstatus`(`EntityName`)`

$occstatus`(`EntityName`)``=`ReconnectStatus

## Parameters

* EntityName—name of an
  entity
* ReconnectStatus—occurrence
  modification status to be used by reconnect or
  retrieve/reconnect when reconnecting the disconnected occurrence.

## Return Values

Values returned in $occstatus

| Value | Meaning |
| --- | --- |
| `""` | $occstatus has not been set. This can mean one of the following:   * No modification status in the   disconnected record set; xmlload, webload, or   structToComponent could not set a value for $occstatus when   it created the occurrence. * Occurrence was not created , and has   not had $occstatus set in Proc. * $occstatus has been   set to `""` in Proc. |
| `"est"` | Occurrence exists in the database |
| `"mod"` | Occurrence exists in the database and has been modified |
| `"new"` | Occurrence is new—it does not exist in the database, or the occurrence originates from a non-database entity |
| `"del"` | Occurrence is marked for deletion. |

**Caution:** 

Never attempt to remove occurrences by setting
$occstatus to `"del"`; use remocc instead.

## Use

Allowed in all Uniface component types.

## Description

The $occstatus function allows
you to get or set the reconnect status for each disconnected occurrence in the component.

The Proc statements xmlload,
webload, and structToComponent assign a value to
$occstatus based on reconnect metadata in the incoming data stream.

The Prc statements xmlsave,
websave, and componentToStruct use the value of
$occstatus, if available, to set the value of the modification status in
outgoing data streams.

**Note:**  Although you are allowed to set
$occstatus to a specific ReconnectStatus, you are strongly
advised not to do so, because Uniface calculates its value.

After a reconnect statement,
$occstatus is empty. Use $occmod, $occdel,
and $storetype to determine the modification state of occurrences.

## Related Topics

- [retrieve](../procstatements/retrieve.md)
- [Proc for Disconnected Record Sets](../../../howunifaceworks/dataio/disconnectedrecordssets/procfordisconnectedrecordsets.md)
- [Occurrence Metadata](../../../integration/xml/concepts/processing_information.md)
- [Reconnect Process](../../../howunifaceworks/dataio/disconnectedrecordssets/reconnect_process.md)


---

# $occvalidation

Identify whether an occurrence requires validation.

$occvalidation { `(`Entity`)` }

## Parameters

* *Entity* —entity name; can be a
  literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
  the current entity is used.

## Return Values

Values returned in $status

| Value | Meaning |
| --- | --- |
| "" | Entity is not valid, for example, the field name is not drawn. |
| 0 | Occurrence does not require validation, either becasue the occurrence has not been modified or it has already been successfully modified. Check the value of $occmod to determine which of these situations applies. |
| 1 | Occurrence requires validation. |

## Use

Allowed in all Uniface component types.

## Description

$occvalidation enables you to
check whether an occurrence requires validation. An occurrence needs validation in either of the
following circumstances:

* Data in one of the fields of the occurrence
  has been modified ($occmod is 1), but has not yet been successfully validated
  ($occvalidation is also 1).
* Validation has been demanded by Proc code
  ($occcheck is 1), regardless of the value of $occvalidation.

In this example $occvalidation
returns the validation status of the current occurrence of an entity.

```procscript
; Field Gets Focus trigger of DUMMY
; DUMMY and FLD2 are non-database fields
; enter an appropriate entity name in FLD2

$8 = $occvalidation("%%FLD2%%%")
selectcase($8)
   case ""
      message/error "Entity name is not valid"
   case 0
      message/info "The occurrence is valid"
   case 1
      message/info "The occurrence requires validation"
endselectcase
```

## Related Topics

- [validate](../procstatements/validate.md)
- [validateocc](../procstatements/validateocc.md)
- [$fieldvalidation](_fieldvalidation.md)
- [$instancevalidation](_instancevalidation.md)
- [$keyvalidation](_keyvalidation.md)
- [$occcheck](_occcheck.md)
- [$occmod](_occmod.md)


---

# $ocxhandle

Return the handle of the requested OCX object.

$ocxhandle`(`Field`)`

## Parameters

Field—field name; can be a
literal name, a string, or a field (or indirect reference to a field), a variable, or a function
that evaluates to a string. Mandatory.

## Return Values

* Handle of the OCX object encapsulated in the
  OCX container widget.
* A NULL handle is returned if
  Field is not an OCX object or if an error occurs during the evaluation of this
  function. $procerror contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $occhandle

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | UPROCERR\_FIELD | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| -1102 | UPROCERR\_ENTITY | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in form components.

---

# $oprsys

Return a mnemonic for the operating system used by Uniface.

$oprsys

## Return Values

Values returned by $oprsys

| Value | Operating system |
| --- | --- |
| `H` | Microsoft Windows 98 |
| `L` | Microsoft Windows NT |
| `M` | Microsoft Windows 8 |
| `N` | Microsoft Windows Server 2012 |
| `P` | Microsoft Windows XP |
| `S` | Windows Server 2016 |
| `T` | Windows Server 2019 |
| `U` | Unix |
| `W` | Windows 10 |
| `Y` | Microsoft Windows Vista |
| `2` | Microsoft Windows Server 2000 |
| `3` | Microsoft Windows Server 2003 |
| `4` | AS/400 |
| `7` | Microsoft Windows 7 |
| `8` | Microsoft Windows Server 2008 |

**Note:**   If a service or report component is running in
a remote environment, the $oprsys function returns the operating system of the
server (not of the client).

## Use

Allowed in all Uniface component types.

## Description

The function $oprsys returns
the mnemonic for the operating system that the Uniface application or Application Server is using.

## Using $oprsys to Create a Log File

In this example $oprsys is
used to create a log file recording user, program and operating system details.

```procscript
variables
   string localvar
   string filetext
endvariables

selectcase $oprsys
   case "7"
      localvar = "Microsoft Windows 7"
   case "8"
      localvar = "Microsoft Windows 8"
   case "W"
      localvar = "Microsoft Windows 10"
   case "U"
      localvar = "Unix"

   elsecase
      localvar = "a supported operating system"
endselectcase

filetext = "%%$user%%% ran program %%$applname%%% under %%localvar%%%.%%^"
filedump/append filetext, "log.txt"
```

## Related Topics

- [$gui](_gui.md)


---

# $page

Return the current page number.

$page

## Return Values

Values returned in $page

| Value | Meaning |
| --- | --- |
| 0 | Uniface is not printing (that is, $printing is 0) |
| >0 | Number of the page currently being printed. |

## Use

Allowed in form and report components
.

## Description

You can use $page to assign the
page number to dummy fields in header or trailer frames.

If you are not printing, it returns zero when used
in the Frame Gets Focus trigger of a header or trailer frame.

The Proc code in the following example assigns
the page number to the dummy field REPORTPAGE in the trailer frame. The trailer frame has the
Suppress Print if Empty property selected, which means that it does not
appear if REPORTPAGE has no value. (right-click the frame and choose
Printing > Suppress Print if
Empty.)

The first page of the report is a cover sheet
that is not numbered; subsequent pages are numbered starting at 1. Because of the unnumbered page,
the value of REPORTPAGE is one less than the value supplied by $page.

```procscript
; trigger: Frame Gets Focus of TRAILER frame

if ($page = 1) ;if on first page done ;take no action
   done
else
   REPORTPAGE = $page - 1
endif
```

## Related Topics

- [$lines](_lines.md)
- [Frame
Gets Focus](../triggersstandard/framegetsfocus.md)


---

# $paintedfieldproperties

Return or set the position and size for a specific instance of a field
widget.

`$paintedfieldproperties(`
Field`,` {PaintedOccurrence`,`} { PropertyList} `)` {`=`}
PropertyValuesList

PropertyValuesList`=``$paintedfieldproperties(`Field`,` PaintedOccurrence {`,` Position |
Size} `)`

## Arguments

* Field—field name; can be a
  literal name, or a string, variable, function, parameter, or indirect reference to a field
  containing the name. It can optionally contain a qualified field name, for example
  `MYFLD.MYENT`.
* PaintedOccurrence—number of
  a painted occurrence or, if there are nested multiple occurrences, a GOLD ; separated
  list specifying the occurrences starting from the outer occurrence. For example,
  `"3;1"` specifies the field in the third occurrence of the inner entity
  in the first occurrence of an outer entity.
* PropertyList—associative
  list of one or more of the following property names:

  + `xpos`—sets the horizontal
    position
  + `ypos`—sets the vertical
    position
  + `xsize`—sets the
    horizontal size in characters
  + `ysize`—sets the vertical
    size in characters
  + `zorder`—places the painted
    field to `Top` or `Bottom` of a stack of fields (Z-order)
* PropertyValuesList—associative list of
  property values specifying the position, size, or Z-order of the GUI object

  + Position—associative
    list of properties specifying the beginning coordinates of the GUI object, in characters. The value
    for each coordinate can be from -32768 to 32767. The format is:

    `"``XPos`
    {`+` | `-`} `=`Value`;``YPos` {`+` | `-`}
    `=`Value`"`
  + Size—associative list
    of properties defining the dimensions of the GUI object, in characters. The value of each dimension
    can be from 0 to 65535. The format is:

    `"``XSize`
    {`+` | `-`} `=`Value`;``YSize` {`+` | `-`}
    `=`Value`"`
  + `+` | `-`
    —increment or decrement the current value of the size or position property by the specified value.
    If increment or decrement is not used, the value specified is absolute.
* ZOrder—place the current
  field on top or bottom of stack; useful when fields stack or overlap.

  `"``ZOrder``=``Top`|`Bottom``"`

## Return Values

* Associative list of properties for the
  specified GUI object.
* Empty string ("") if the object cannot be
  found.
* `ZOrder` has no return
  value.

## Use

Allowed in form components without split bars. Not allowed for
Unifields.

**Note:** $paintedfieldproperties has no effect on forms with split bars.

## Description

Use the $paintedfieldproperties
function to move or resize specific field widgets on a form at runtime. Only the single specified
widget is affected. The Field and PaintedOccurrence identify
the specific field instance to be repositioned.

Properties that are changed by
$paintedfieldproperties are reset to the compiled values (that is, the default
properties, plus the properties set for the entity declaratively) when the form is restarted.

The position of the widget is not restricted by
the position of entities and fields on the form in the Layout Editor. This
frees the form layout from the restrictions imposed by drawing the data structure in the
Layout Editor as frames within frames.

For example, you can dynamically hide widgets by
moving them outside the borders of the form. (It is possible to set the size of a field to 0,0, to
hide a field, use the $fieldsyntax function.)

If you use enhanced printing to print a form after
using $paintedfieldproperties, the printed output reflects the change, so fields
that are located outside of the form boundaries are not printed.

Form scroll bars do not appear when the layout is
changed using $paintedfieldproperties. If you move a widget so that it becomes
fully or partially drawn outside the visible window border, scroll bars are not added to the form
even if the window property No Form Scrollbars is set to
`FALSE`.

When $paintedfieldproperties is
used in the Execute trigger, it must be preceded by a show statement. This
ensures that the painted fields are available, which is otherwise not the case when the Execute
trigger is executed.

The following limits apply to position and size
coordinates that can be set by $paintedfieldproperties:

* `Xpos`, `Ypos`:
  -32768 to 32767
* `Xsize`,
  `Ysize`: 0 to 65535

If you specify values outside these limits, the
value outside of the range will be rounded to the nearest possible value, for example
`Xpos=-40000` is rounded to `Xpos=-32768`.

## Stacked or Overlapping Fields

**Caution:** 

Avoid overlapping fields in forms that are used
for printing. Uniface print functionality is not designed to handle multiple objects in one
place.

The $paintedfieldproperties
function enables you to position fields on top of one another, either directly, or so that they
overlap. This means that forms may gain a virtual third dimension along a Z axis.

To determine which field is displayed on top (or
on the bottom) when fields stack or overlap, you can set the `ZOrder` property of
the field to appear on the top or bottom of the stack.

Normally. the default Z-order is determined by the
initial painted position of a field, so the top left field is on top and the bottom right field is
at the bottom of the Z-order. Resizing or repositioning the field has no effect on the Z-order.

However, when the position or size of an Edit Box,
Output Box, or Rich Text Edit widget is changed, it is put on top of the Z-order stack.

## Multiple Occurrences

If a field can be displayed multiple times in a
form, you need to specify which instance of the field you want to move or resize. Fields are
displayed multiple times if you draw multiple occurrences of the entity. Therefore, you need to
specify the *painted occurrence* containing the field to be moved or resized.

**Note:**  *Painted occurrence* refers to the
occurrence painted on the form and has nothing to do with the number of occurrences retrieved. For
example, as the user scrolls through retrieved data, occurrence 54 may be displayed as the first
painted occurrence on the form.

To specify a painted occurrence, provide the
occurrence number. For example, If you have painted four occurrences of an entity on a form, and
you want to change the size of a field (NAME) in the fourth occurrence, use the following
instruction:

```procscript
$paintedfieldproperties (NAME, 4) = "xsize=3;ysize=25"
```

However, if you have multiple occurrences nested
in multiple occurrences, you need to specify both the inner entity occurrence and the outer entity
occurrence. For example, the following form shows the layout and data structure of multiple nested
entities. There are four occurrences of the Employee entity, each containing three occurrences of
the Employment entity. When run, this form can display the project name field 12 times.

If you wanted to specify that the third project
name of the fourth displayed employee is to be resized, you could use the following instruction:

```procscript
$paintedfieldproperties (NAME.PROJECT.MYORG, "1;3;4;1") = "xsize+=2"
```

In this case:

* The fully qualified field name is specified
  because there are multiple fields called NAME.
* `1`—first (and only) painted
  occurrence of PROJECT.MYORG
* `3` —third painted occurrence
  of EMPLOYMENT.MYORG
* `4` —fourth painted occurrence
  of EMPLOYEE.MYORG
* `1`—first (and only) occurrence
  of DEPARTMENT.ORG.

The following example sets a field widget, named
FIELD1 to X, Y position (50, 50).

```procscript
; trigger exec
show
$paintedfieldproperties(FIELD1,"1") = "XPos=50;YPos=50"
```

The following example sets a field widget, named
FIELD1 to Z-sort order Top.

```procscript
$paintedfieldproperties(FIELD1,"1") = "Zorder=Top"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [Changing Form Layout Dynamically](../../../desktopapps/forms/definingformlayoutinproc.md)


---

# $paintedocc

Return the number of occurrences painted for the specified entity.

$paintedocc { `(`Entity`)` }

## Parameters

*Entity* —entity name; can be a
literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
the current entity is used.

## Return Values

Values returned in $paintedocc

| Value | Meaning |
| --- | --- |
| "" | Entity does not exist or is not painted on the component |
| >0 | Number of occurrences painted for the specified entity. |

## Use

Allowed in form and report components
.

This example shows a form on which occurrences of
entity CUSTOMER have been painted in three rows and two columns. In this case,
$paintedocc(CUSTOMER) returns 6, the total number of occurrences.

Multiple Occurrences Painted on a Form

## Related Topics

- [print](../procstatements/print.md)
- [$printing](_printing.md)


---

# $password

Return the encrypted password used to log on to a database path.

$password { `(`Path`)` }

## Parameters

Path—DBMS path name, without the leading dollar sign ($).

## Return Values

* Encrypted password used to log on to
  Path, if the DBMS or operating system support returning the encrypted password.
* If
  Path is omitted:
  + For Windows, $password returns the value of password in [user] section in the usys.ini.
  + For other operating systems, it returns the value of the environment variable `password`.
* Empty string (""), if the password INI setting or `PASSWORD` environment variable is empty.

## Use

Allowed in all Uniface component types.

## Description

The $password function is
supported only for DBMSs which require a user name to log in. It is not supported for network drivers.

However, if a database path name is assigned to a network path, the network driver is requested to open the path. The network path may also be re-assigned to another server. As long as a server in the chain assigns the path name to a database driver, this is supported.

$user and $password are often used to construct the logon string given to the Proc open statement. For example, if you want to close and then
open a database, you can use $user and
$password to get these values before closing. Then use these values to open the
database. This avoids re-prompting the user for information they may have already entered.

The returned password is encrypted for security. Uniface transparently handles encryption and decryption when passing and returning the password to and from the database.

## Using $password

The following example saves the password and user name used to open a particular path,
closes the path, then opens the path again:

```procscript
$1 = $password(CUSTOMERS)
$2 = $user(CUSTOMERS)
close "$CUSTOMERS"
open "|%%$2|%%$1","$CUSTOMERS"
```

History

| Version | Change |
| --- | --- |
| 9.7.05.029 | Returned password is encrypted. **Important:** This change in the behavior $password can cause compatibility issues in existing Proc that is expecting unencrypted passwords. |

## Related Topics

- [$user](_user.md)


---

# $pi

Return the value of pi.

$pi`()`

## Return Values

Value of pi.

## Use

Allowed in all Uniface component types.

## Description

$pi returns the mathematical
value of pi (3.14159...).

The following shows an example of the
$pi function:

```procscript
$circum$ = $pi() * $diam$
```

---

# $power

Calculate the value of X raised to the power of Y (XY).

$power`(`X`,` Y`)`

## Parameters

X and
Y—numeric constant, or field (or indirect reference to a field), variable,
function, or expression that evaluates to a numeric value.

## Return Values

Calculated value of X raised to
the power of Y.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $power

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1204 | <UPROCERR\_NEGATIVE> | Negative value not allowed |
| -1207 | <UPROCERR\_UNDERFLOW> | Underflow |
| -1208 | <UPROCERR\_OVERFLOW> | Overflow |
| -1209 | <UPROCERR\_DIVIDE> | Divide by zero |

## Use

Allowed in all Uniface component types.

## Description

The function $power calculates
the value of X raised to the power of Y ((XY).

If X is less than zero,
Y must be an integer.

The absolute value of the result of
$power must be in the range 10 -9999  through 10 9999 ,
inclusive.

## Calculating a Cube Root

The following example computes the cube root of
the value in MYFIELD:

```procscript
$cuberoot$ = $power(MYFIELD, 1/3)
```

---

# $previous

Return the value of the field in the previous occurrence.

$previous`(`Field`)`

## Parameters

Field—field name; can be a
literal name, a string, or a field (or indirect reference to a field), a variable, or a function
that evaluates to a string. Fieldcan optionally contain a qualified field name,
for example `MYFLD.MYENT`.

## Return Values

* Value of Field in the
  previous occurrence.
* Empty string ("") is returned if there is no
  previous occurrence.

## Use

Allowed in all Uniface component types.

## Description

The $previous function allows
you to refer to the contents of a field in the previous occurrence. Use it to:

* Copy contents of a field to another field or
  variable.
* Perform calculations.
* Make Boolean comparisons.

**Note:**   This function is not always the most efficient
way of referring to a field in the previous occurrence. This is particularly true when the field
referred to by $previous is part of an occurrence that has already been active.

If the field forms part of an occurrence that has
already been active, it is often preferable to store the contents of that field in a variable
before moving to the previous occurrence,  *then*  referring to the variable. This
usually costs less processing power. Use the Occurrence Gets Focus trigger to do this. If you are
printing, you could also use the Leave Printed Occurrence trigger.

You can test for an empty string with:

```procscript
if ($previous(NAME) = "")
```

The following example generates a new invoice
number using the previous number as a base:

```procscript
invoiceno = $previous(INVOICENO) + 1
```

## Related Topics

- [compare](../procstatements/compare.md)
- [$next](_next.md)
- [Occurrence Gets Focus](../triggersstandard/occurrencegetsfocus.md)
- [Leave Printed Occurrence](../triggersstandard/leave_printed_occurrence.md)


---

# $printing

Return a status indicating whether the current component is printing.

$printing

## Return Values

* 1, if Uniface is printing.
* 0, if Uniface is not printing.

## Use

Allowed in form and report components.

## Description

The $printing function allows
you to test whether Uniface is printing the current component. This can be particularly useful in
the Occurrence Gets Focus trigger. For example, you may want to use a form both for report purposes
and for interactive data entry or administration. The code you would use during a print process is
probably very different from the code you would use for an interactive session.

## Checking Print Status

The following example shows how to display a
message informing the user which page is currently being printed:

```procscript
; check print status with $printing

if ($printing = 1)
   message "Printing %%$page%%%"
endif
```

## Related Topics

- [eject](../procstatements/eject.md)
- [print](../procstatements/print.md)
- [printbreak](../procstatements/printbreak.md)
- [$batch](_batch.md)
- [Occurrence Gets Focus](../triggersstandard/occurrencegetsfocus.md)


---

# $proc\_profiling

Activate Uniface profiling, or check whether it is already enabled.

Return =
$proc\_profiling

$proc\_profiling `=` Expression

set | reset  $proc\_profiling

## Arguments

Expression—an expression that
evaluates to `true` or `false`; for example, `$proc_tracing =
1` to enable Proc tracing, or `$proc_profiling = !$proc_profiling` to toggle
between enabling and disabling Proc profiling.

## Return Values

The function $proc\_profiling
returns:

* `1` if Proc profiling is
  currently enabled
* `0` if Proc profiling is
  currently not enabled

## Use

Allowed in all Uniface component types.

## Description

**Caution:** 

Proc profiling has a significant impact upon
performance and generates large log files. It should only be used when trying to debug a
performance problem, preferably in a development or test environment.

You can enable and disable Proc profiling for the
whole application using the $PROC\_PROFILING assignment setting, or selectively
in Proc code using $proc\_profiling. The Proc function overrides the assignment
setting.

Setting Proc profiling in Proc enables you to
limit Proc tracing to modules where you suspect a problem, but it is only feasible in a development
or testing environment. Before deploying the application, you should remove Proc tracing commands
from the application.

When profiling is enabled, profiling information
is directed to the Message Frame (or message log file) as a Uniface list. You can specify a
different log file using the $PROC\_LOG\_FILE assignment setting, and a different
separator using the $PROC\_PROFILING\_SEPARATOR assignment setting.

For more information, see  [Proc Profiling and Tracing](../../../tools/unifaceutilities/uniface_profiling.md).

## Related Topics

- [$PROC_PROFILING](../../../configuration/reference/assignments/_proc_profiling.md)
- [$PROC_PROFILING_SEPARATOR](../../../configuration/reference/assignments/_proc_profiling_separator.md)
- [Proc Profiling and Tracing](../../../tools/unifaceutilities/uniface_profiling.md)
- [$PROC_LOG_FILE](../../../configuration/reference/assignments/_proc_logfile.md)


---

# $proc\_tracing

Return the current status of Proc tracing, or activate or deactivate Proc
tracing.

Return =
$proc\_tracing

$proc\_tracing `=`Expression

set | reset  $proc\_tracing

## Arguments

Expression—an expression that
evaluates to `true` or `false`; for example, `$proc_tracing =
1` to enable Proc tracing, or `$proc_tracing = !$proc_tracing` to toggle
between enabling and disabling Proc tracing.

## Return Values

The function $proc\_tracing
returns:

* `1` if Proc tracing is
  currently enabled
* `0` if Proc tracing is
  currently not enabled

## Use

Allowed in all Uniface component types.

## Description

**Caution:** 

Proc tracing has a significant impact upon
performance and generates large log files, so it should only be used when trying to trace and debug
a problem, preferably in a development or test environment.

Proc tracing enables you to log the Proc code that
was executed. You can enable and disable Proc tracing for the whole application using the
$PROC\_TRACING assignment setting, or selectively in Proc code using the
$proc\_tracing function. The Proc function overrides the assignment setting.

Setting Proc tracing in Proc enables you to limit
Proc tracing to modules where you suspect a problem, but it is only feasible in a development or
testing environment. Before deploying the application, you should remove Proc tracing commands from
the application.

You can enhance the information produced by
tracing by specifying a string or expression to precede the tracing data using
$proc\_tracing\_addition.

For more information, see  [Proc Profiling and Tracing](../../../tools/unifaceutilities/uniface_profiling.md).

## Related Topics

- [$PROC_TRACING](../../../configuration/reference/assignments/_proc_tracing.md)
- [$proc_tracing_addition](_proc_tracing_addition.md)
- [Proc Profiling and Tracing](../../../tools/unifaceutilities/uniface_profiling.md)


---

# $proc\_tracing\_addition

Return the current value of $proc\_tracing\_addition, or add a
prefix, which can contain a string or expression, to each line of Proc tracing
information.

Return `=`$proc\_tracing\_addition

$proc\_tracing\_addition
`=`AdditionalInfo

## Arguments

AdditionalInfo can be any
string or expression.

## Return Values

$proc\_tracing\_addition returns
the current value of the additional information previously assigned using
$proc\_tracing\_addition.

## Use

Allowed in all Uniface component types.

## Description

You can add a prefix to Proc tracing information
for the whole application using the $PROC\_TRACING\_ADDITION assignment setting,
or selectively in Proc code using the $proc\_tracing\_addition function. The
Proc function overrides the assignment setting.

For more information, see  [Proc Profiling and Tracing](../../../tools/unifaceutilities/uniface_profiling.md).

```procscript
$proc_tracing = 1
$proc_tracing_addition = "Status:%% $status"
```

**Note:**  The space between `Status:%%` and
`$status` is necessary to keep the Proc engine from evaluating
$status.

**Note:**  The information in the log file may be
truncated, depending on the length of the additional information.

## Related Topics

- [$proc_tracing](_proc_tracing.md)
- [Proc Profiling and Tracing](../../../tools/unifaceutilities/uniface_profiling.md)


---

# $procerror

Return the reason for an error in Proc execution.

$procerror {`=`Value}

reset$procerror

## Return Values

You can use the error constants in writing your
Proc to make it more readable.

[Values Returned by $procerror: 0 – -49](javascript:void(0);)

|  |  |  |
| --- | --- | --- |
| 0 | UACT\_SUCCESS | Success. |
| -1 | UGENERR\_ERROR | An error occurred. |
| -2 | UIOSERR\_OCC\_NOT\_FOUND | Occurrence or record not found; the table is empty or end of file was encountered. Occurrence removed since last retrieve. The entity is painted as an up entity and the key value was not found during the database lookup. |
| -3 | UIOSERR\_EXCEPTIONAL | Exceptional I/O error (hardware or software). |
| -4 | UIOSERR\_OPEN\_FAILURE | The table or file could not be opened. The entity is not painted or the corresponding table or file does not exist in the database. |
| -5 | UIOSERR\_UPDATE\_NOT\_ALLOWED | No write or delete permission for the table or file. The occurrence is read-only (cannot be locked). |
| -6 | UIOSERR\_WRITE\_FAILURE | An error occurred while writing, updating, or deleting the table or file; for example, lack of disk space, no write permission, or violation of a database constraint. |
| -7 | UIOSERR\_DUPLICATE\_KEY | The key exists in the database but was not found in the hitlist. This occurs when the user tries to enter a duplicate key. |
| -8 | UIOSERR\_END\_OF\_HITLIST | End of hitlist. |
| -9 | UIOSERR\_LOGON\_ERROR | DBMS logon error. This can occur if the database connection has been lost or the maximum number of DBMS logons has already been reached. |
| -10 |  | Occurrence has been modified or removed since it was retrieved; the occurrence should be reloaded. |
| -11 | UIOSERR\_LOCKED | Occurrence already locked. |
| -12 | UIOSERR\_FILE\_READ\_WRITE | An error occurred while trying to read or write to the file. |
| -13 | UIOSERR\_OS\_COMMAND | An error occurred while trying to perform the OS command. Set $ioprint to `63` to display the exact error in the message frame. |
| -14 | URETERR\_MULTIPLE\_DOWN | The entity is painted as a normal down entity and multiple hits were found during the database lookup (ambiguous key). |
| -15 | URETERR\_MULTIPLE\_UP | The entity is painted as an up entity and multiple hits were found during the database lookup. |
| -16 | UNETERR\_UNKNOWN | Network error. |
| -17 | UNETERR\_PIPE\_BROKEN | Connection lost. |
| -18 | UNETERR\_CONNECTION | Application failed to connect to the Uniface Router, or failed to start an exclusive Uniface Server. |
| -19 | UNETERR\_FATAL | Uniface Server exited with fatal error. |
| -20 | UNETERR\_MAX\_CLIENTS | Uniface Router could not accept new client, $MAX\_CLIENTS exceeded. |
| -21 | UNETERR\_LOGON\_ERROR | Network logon error. |
| -22 | UNETERR\_NO\_REGISTRATION | Application failed to register with the Uniface Router. |
| -23 | UNETERR\_DOUBLE\_UST | Registration with Uniface Router specified UST that is already in use. |
| -24 | UNETERR\_START\_SERVER | Uniface Router could not start Uniface Server process (executable not found). |
| -25 | UNETERR\_SERVER\_GONE | Uniface Router could not route request to specific Uniface Server process. |
| -31 | UGENERR\_LICENSE | No license for requested action. Contact your Uniface representative. |
| -32 | UGENERR\_TIMEOUT | A time-out occurred. |
| -33 | UGENERR\_BATCH\_ONLY | Statement not allowed in batch mode. Use a test on $batch to avoid this. |
| -34 | UGENERR\_CURRENCY | Changes to the active path not allowed. |
| -35 | UGENERR\_4GL\_SAYS\_ERROR | A trigger returned a negative value in $status. |
| -36 | UGENERR\_TEST | Statement not allowed in test mode. |
| -37 | IOSERR\_OFFSET\_NOTSUPPORTED | read statement uses an offset option but the database driver does not support pagination |
| -38 | IOSERR\_OFFSET\_PARAMETERS | Incomplete or wrong parameters for offset |
| -40 | USYSERR\_NOMEMORY | Not enough memory |
| -41 | USYSERR\_INVALID | Invalid characters in directory or filename |

[Values Returned by $procerror: -50 – -99](javascript:void(0);)

| Value | Error Constant | Meaning |
| --- | --- | --- |
| -50 | UACTERR\_NO\_SIGNATURE | Signature descriptor for the current component not found (in ULANA.DICT, USYSANA.DICT, URR file, or resource file). For example, the component name provided is not valid.  Signature descriptor found but an interface is missing or invalid. |
| -51 | UACTERR\_SIGNATURE\_ID | The identifier of the compiled component does not match the identifier in the signature descriptor (in ULANA.DICT, USYSANA.DICT, URR file, or resource file). |
| -52 | UACTERR\_PROTOCOL | Protocol error (wrong sequence of operations). |
| -53 | UACTERR\_ENTITY\_GET | An error occurred while copying the occurrences of an entity parameter to occurrences of the activated operation. This occurs at the start of processing for the `activate` statement on either the client or the server. |
| -54 | UACTERR\_ENTITY\_PUT | An error occurred while copying occurrences of the entity parameter in the activated operation to occurrences of the component instance. This occurs at the end of processing for the activate statement on either the client or the server. |
| -55 | UACTERR\_PARAMETER\_GET | An error occurred while getting an `OUT` or `INOUT` parameter from the activated operation. For example, the actual parameter provided cannot be used to receive output because it is a constant string. This occurs at the end of processing for the `activate` statement on either the client or the server. |
| -56 | UACTERR\_PARAMETER\_PUT | An error occurred while putting an `IN` or `INOUT` parameter into the activated operation. This error occurs at the start of processing for the activate statement on either the client or the server. |
| -57 | UACTERR\_NO\_INSTANCE | The named instance cannot be found in the component pool. |
| -58 | UACTERR\_NO\_COMPONENT | The named component cannot be found.  A modal form is started using run, and the form is already running. |
| -59 | UACTERR\_NO\_OPERATION | No definition found for operation. |
| -60 | UACTERR\_ACTION\_ON\_MODAL\_FORM | An attempt was made by an instance other than the current modal form instance to start an operation other than the EXEC operation. |
| -61 | UACTERR\_ENTITY\_DUMMY | The entity specified as an entity parameter is a dummy entity. |
| -62 | UACTERR\_ENTITY\_PARAM\_MISMATCH | The entity specified as an entity parameter must be the same entity as that specified in the operation. That is, one is a supertype and the other is a subtype of that supertype, or both are subtypes of the same supertype. |
| -63 | UACTERR\_NO\_PROPERTY | No property found. |
| -64 | UACTERR\_OPER\_MAP\_NO\_MAP | Operation not mapped. |
| -65 | UACTERR\_OPER\_NOT\_IMPLEMENTED | No implementation found for operation. |
| -66 | UACTERR\_OCC\_NOT\_ALLOWED | Not allowed on occurrence parameter. |
| -67 | UACTERR\_OCCURRENCE\_GET | Occurrence parameter get error. |
| -68 | UACTERR\_OCCURRENCE\_PUT | Occurrence parameter put error. |
| -69 | UACTERR\_OCC\_RELTD\_ONE\_MISS | Occurrence parameter error. The related occurrence is not available. |
| -70 | UACTERR\_ENT\_DESCR\_NOTFND | Entity descriptor not found. |
| -71 | UACTERR\_GET\_STATE | Error in getting state. |
| -72 | UACTERR\_ENTITY\_PARAM\_IS\_SELF | Entity parameter is both source and destination. |
| -73 | ACTERR\_REMOTE\_NOT\_SUPPORTED | Operation with byref-Struct parameter cannot be activated across processes. For more information, see [Struct Parameters](../../structs/structparameters.md). |
| -80 | UACTERR\_URB\_INIT | Failure to connect to URB. |
| -81 | UACTERR\_ENGINE\_INIT | Failure to connect to engine. |
| -84 | UACTERR\_NO\_OBJECT | No handle or empty handle specified.  -> operator used with a data type that is not a Struct |
| -85 | UACTERR\_NO\_REQUEST | No request specified. |
| -86 | UACTERR\_EXPOSE | Failure to expose object. |
| -87 | UACTERR\_REQUEST | Unsupported or unknown request encountered. |
| -88 | UACTERR\_OBJECT\_DELETED | Object has been deleted. |
| -90 | UZIPERR\_STREAM | Invalid (compressed) data stream error |
| -91 | UZIPERR\_DATA | Invalid data in zip file structure |
| -92 | UZIPERR\_CRC | CRC data mismatch |
| -93 | UZIPERR\_LENGTH | Data length mismatch |
| -94 | UZIPERR\_VERSION | Zip library incompatible |

[Values returned by $procerror: -100 – -299](javascript:void(0);)

| Value | Error Constant | Meaning |
| --- | --- | --- |
| -150 | UACTERR\_UNKNOWN | A hardware or software error occurred. Contact your Uniface representative. |
| -151 | UACTERR\_EXCEPTION\_THROWN | An exception error has been thrown. |
| -154 | UACTERR\_INSTANCE\_NAME\_EXISTS | An instance with this name already exists. This error code can be returned when (for example):   * A modal form which is already active   is activated again * An attempt is made to activate a modal   form from a non-modal form |
| -155 | UACTERR\_CREATE\_INSTANCE | An error occurred while creating an instance:   * An unknown property occurs in the   instance properties. * A property in the instance properties   has a value that is not valid. * The component could not be loaded. * An exit statement   was executed in the operation `INIT`. |
| -156 | UACTERR\_WRONG\_IMPLEMENTATION | Wrong or undefined implementation. |
| -159 | UACTERR\_QUEUE | Message could not be delivered to requested queue. |
| -160 | UACTERR\_ILLEGAL\_SYNC\_MODE | Unknown communication mode |
| -161 | UACTERR\_ILLEGAL\_SYNC\_TYPE | Illegal mixture of synchronous and asynchronous communication modes. |
| -162 | UACTERR\_DELETE\_INSTANCE | Deleting the instance has been postponed because the instance is busy.  For example, operation A1 in INSTA activates operation B1 in INSTB. Operation B1, in turn, activates operation A2 in INSTA. Operation A2 performs an exit, but INSTA cannot be deleted until operations B1 and A1 complete. |
| -163 | UACTERR\_DEL\_POSTPONED\_CHILD | Deleting the instance has been postponed because the instance has at least one busy child instance. The instance will be deleted when it no longer has busy children.  For example, non-modal form FRMX starts an attached non-modal form FRMY. While the application is idle, the user clicks on FRMY, activating a trigger which sends a message to FRMX. This message results in an exit (on FRMX), but FRMX cannot be deleted until its child instance FRMY is not busy. |
| -164 | UACTERR\_DEL\_POSTPONED\_PROC | The instance is in the process of being deleted.  For example, between a deleteinstance or exit and the time the instance is actually deleted, an attempt is made to activate an operation in the instance being deleted. |
| -165 | UACTERR\_BAD\_HANDLE | Handle not valid. |
| -166 | UACTERR\_STATELESS | Component instance could not be created by the newinstance statement because the component is stateless. |
| -167 | UACTERR\_BAD\_INIT\_OPT | Initialization or Option properties error |
| -168 | UACTERR\_ZOOM\_ACTIVE | Zoom window active. It is not possible to start a Form from a zoom window. |
| -170 | UACTERR\_TX\_FAILURE | Transaction manager failure. |
| -171 | UACTERR\_TX\_NO\_TRANSPORT | Transaction cannot be transported. |
| -172 | UACTERR\_TX\_NOT\_STARTED | Transaction is not started. |
| -173 | UACTERR\_TX\_NOT\_RUNNING | Transaction is not running. |
| -180 | UACTERR\_ACCESS\_DENIED | An operation or trigger that is being activated from a web or SOAP client has not been declared as public web or public soap. |
| -250 | UWEBERR\_SKELETON | Skeleton file not found or is incorrect. |
| -251 | UWEBERR\_OUTFILE | When $web`=""`, the output file is not specified or is the same as the skeleton file. |
| -252 | UWEBERR\_IO | Output file could not be written. |
| -253 | UWEBERR\_IO\_IMAGE | Image file could not be written. |
| -254 | UWEBERR\_ITERATION | Nested iteration over the same entity. |
| -255 | UWEBERR\_NO\_CGI | This statement must be used in a Web run-time environment ($web`!=""`). |
| -256 | UWEBERR\_NO\_INPUT\_EXPECTED | No further input expected, because no fill-out document has been generated. |
| -257 | UWEBERR\_ILLEGAL\_ACT | One or more fields cannot be accessed; that is, field names referenced in the fill-out document skeleton file are not available in the current Uniface form. |
| -258 | UWEBERR\_STEP | Form synchronization error, that is, the user has submitted an HTML document that does not correspond to the last one generated. It is, instead, a form generated by Uniface earlier in the same session. |
| -259 | UWEBERR\_HASH | Mismatch between the security hash of a field and the field value. This occurs when the value of a NED field has been modified by the browser or other web user agent. |
| -260 | UWEBERR\_OCC\_REJECTED | The data being processed by webget contains a new occurrence created in the client. |
| -261 | UWEBERR\_DATA | An error occurred while loading data. Incorrect data values or data formats were encountered during server-side validation of a Date, Time, or DateTime field. |

[Values returned by $procerror: -300 – -999](javascript:void(0);)

| Value | Error Constant | Meaning |
| --- | --- | --- |
| -300 | UVALERR\_SYNTAX | An error in declarative syntax occurred. |
| -301 | UVALERR\_CONSTRAINT | Violation of restricted delete constraint. |
| -302 | UVALERR\_KEY\_PROFILE | A key field contains a profile character or the key is incomplete. |
| -303 | UVALERR\_KEY\_EMPTY | A key field is empty. |
| -304 | UVALERR\_TARGET\_FIELD | Cannot move focus to target field |
| -350 | UHLPERR\_STARTUP | Unable to start help. |
| -351 | UHLPERR\_PLATFORM | Platform does not support native help. (In this case you may want to use the help [native] statement to provide help information.) |
| -352 | UHLPERR\_LOGICAL\_NAME | Unable to map logical name. |
| -353 | UHLPERR\_TOPIC | Requested help topic or keyword not found. |
| -354 | UHLPERR\_OPTION | Native help does not support the requested option. |
| -400 | UMISERR\_PRINT | Uniface could not print, for example:   * Printing is already being performed   ($printing`=1`). * ^QUIT was used in the Print form. * The print mode is not valid. For more   information on printmodes, see print |
| -401 | UMISERR\_PRINT\_BREAK | An error occurred during printbreak:   * Uniface is not printing   ($printing`=0`). * printbreak   encountered in a header or footer frame. |
| -403 | UMISERR\_UWHERE | Nonexistent field in a u\_where clause. |
| -404 | UMISERR\_TRX | The TRX-formatted DML statement from a where clause or an sql statement exceeds 32 KB. |
| -405 | UMISERR\_SETFORMFOCUS | Modal form has focus. |
| -406 | UMISERR\_FILEBOX | An error occurred during a filebox statement. |

[Values returned by $procerror: -1000 – -1099](javascript:void(0);)

| Value | Error Constant | Meaning |
| --- | --- | --- |
| -1001 | UPROCERR\_STRING | Not a valid String value. |
| -1002 | UPROCERR\_NUMERIC | Not a valid Numeric value. |
| -1003 | UPROCERR\_FLOAT | Not a valid Float value. |
| -1004 | UPROCERR\_DATE | Not a valid Date value. |
| -1005 | UPROCERR\_TIME | Not a valid Time value. |
| -1006 | UPROCERR\_DATETIME | Not a valid Datetime value. |
| -1007 | UPROCERR\_RAW | Not a valid Raw value. |
| -1008 | UPROCERR\_BOOLEAN | Not a valid Boolean value. |
| -1009 | UPROCERR\_LINEAR\_DATE | Not a valid Linear Date value. |
| -1010 | UPROCERR\_LINEAR\_TIME | Not a valid Linear Time value. |
| -1011 | UPROCERR\_LINEAR\_DATETIME | Not a valid Linear Datetime value. |
| -1012 | UPROCERR\_IMAGE | Not a valid Image value. |
| -1013 | UPROCERR\_SYNTAXSTRING | Not a valid syntax string. |

[Values returned by $procerror: -1100 – -1199](javascript:void(0);)

| Value | Error Constant | Meaning |
| --- | --- | --- |
| -1101 | UPROCERR\_FIELD | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| -1102 | UPROCERR\_ENTITY | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1103 | UPROCERR\_MODEL | The entity's model name is not a valid name or the entity is not painted on the component. |
| -1104 | UPROCERR\_KEY | The key number provided is not valid; for example, the key number was out of range. |
| -1105 | UPROCERR\_INSTANCE | The instance name provided is not valid. For example, the argument contains incorrect characters. |
| -1106 | UPROCERR\_COMPONENT | The component name provided is not valid; for example, the argument contains an empty string (""). |
| -1107 | UPROCERR\_PATH | The path name is not correct or the path does not exist, for example, no assignment is found for the path. |
| -1108 | UPROCERR\_COUNTER | Uniface was unable to access UOBJ.TEXT or the counter is not defined. |
| -1109 | UPROCERR\_ENTRY | The entry name specified cannot be found. |
| -1110 | UPROCERR\_TOPIC | Topic name not known. |
| -1111 | UPROCERR\_MESSAGE | The message identifier is not valid; the field or variable was not found, or the string is not a valid message identifier. |
| -1112 | UPROCERR\_OPTION | Option not valid. |
| -1113 | UPROCERR\_PARAMETER | Parameter name not valid or not defined. |
| -1114 | UPROCERR\_LOCAL\_VARIABLE | Local variable name not valid or not defined. |
| -1115 | UPROCERR\_COMPONENT\_VARIABLE | Component variable name not valid or not found. |
| -1116 | UPROCERR\_GENERAL\_VARIABLE | General variable not valid. |
| -1117 | UPROCERR\_GLOBAL\_VARIABLE | Global variable name not valid or not found. |
| -1118 | UPROCERR\_ARGUMENT | The argument specified is incorrect. |
| -1119 | UPROCERR\_FUNCTION | Proc function not valid. |
| -1120 | UPROCERR\_OPERATION | The operation name provided is not valid. |
| -1121 | UPROCERR\_3GL | The requested 3GL function was not found. |
| -1122 | UPROCERR\_NARGUMENTS | Wrong number of arguments. |
| -1123 | UPROCERR\_NPARAMETERS | Wrong number of parameters. |
| -1124 | UPROCERR\_APPLICATION | Application name not valid. |
| -1125 | UPROCERR\_MENU | The specified menu does not exist. |
| -1126 | UPROCERR\_PROPERTY | A property is not valid. |
| -1127 | UPROCERR\_DATATYPE | Data type not valid. |
| -1128 | UPROCERR\_NOT\_A\_KEY | The key number specified is an index. |
| -1129 | UPROCERR\_ITEM | Item not found. |
| -1130 | UPROCERR\_PUTLIST\_DOUBLE | Double entry in PUTLIST. |
| -1131 | UPROCERR\_PUTLIST\_NON\_EXIST | Nonexisting entry in PUTLIST. |
| -1132 | UPROCERR\_UNRESOLVED\_TOPIC | Topic could not be resolved. |
| -1138 | UPROCERR\_MODULE\_NAME | Proc module name is invalid. |
| -1151 | USTRUCTERR\_NO\_COMMON\_CHARACTERISTICS | Structs do not have a common name or parent |
| -1152 | STRUCTERR\_INDEX\_NOT\_ASSIGNABLE | Struct cannot be assigned |
| -1153 | USTRUCTERR\_INDEX\_NOT\_ALLOWED | Struct index is not allowed |
| -1154 | USTRUCTERR\_INDEX\_OUT\_OF\_RANGE | Struct index is out of range |
| -1155 | USTRUCTERR\_MEMBER\_NOT\_FOUND | Struct member not found |
| -1156 | USTRUCTERR\_NOT\_A\_SINGLE\_STRUCT | Struct cannot be moved to one of its own descendants |
| -1157 | USTRUCTERR\_ILLEGAL\_MEMBER\_TYPE | Not a valid struct member type |
| -1158 | USTRUCTERR\_CIRCULAR\_REFERENCE | Struct cannot be moved to a descendent of its current parent. |
| -1159 | UTAGVALUE\_NOT\_RECOGNIZED | Struct has an invalid value |
| -1160 | STRUCTERR\_TAGVALUE\_NOT\_APPLICABLE | Struct tag value not applicable in conversion from Struct |
| -1161 | STRUCTERR\_NO\_MATCHING\_NAME | No matching name found during conversion from struct |
| -1162 | USTRUCTERR\_NOT\_ALLOWED\_ON\_TAGS | Struct cannot be moved to a $tags Struct of another Struct |
| -1163 | USTRUCTERR\_SCALAR | Struct is a Scalar Struct, so it has no members |
| -1164 | USTRUCTERR\_NOT\_A\_SCALAR | Tried to assign a non-scalar value to $scalar. The Struct is not changed in that case. |

[Values returned by $procerror: -1200 – -1399](javascript:void(0);)

| Value | Error Constant | Meaning |
| --- | --- | --- |
| -1201 | UPROCERR\_SMALL | Value too small. |
| -1202 | UPROCERR\_LARGE | Value too large. |
| -1203 | UPROCERR\_RANGE | Value out of range. |
| -1204 | UPROCERR\_NEGATIVE | Negative value not allowed. |
| -1205 | UPROCERR\_ZERO | Zero value not allowed. |
| -1206 | UPROCERR\_INTEGER | Not an integer. |
| -1207 | UPROCERR\_UNDERFLOW | Underflow. |
| -1208 | UPROCERR\_OVERFLOW | Overflow. |
| -1209 | UPROCERR\_DIVIDE | Divide by zero. |
| -1301 | UPROCERR\_SYNTAX | Syntax error. |
| -1302 | UPROCERR\_SERVICE | Function not allowed on service. |
| -1303 | UPROCERR\_REPORT | Function not allowed on report. |
| -1304 | UPROCERR\_UNKNOWN\_CONTEXT | Function not allowed, unknown context. |
| -1305 | UPROCERR\_EXPRESSION | Expression not allowed. |
| -1306 | UPROCERR\_CONDITION | Condition not allowed. |
| -1307 | UPROCERR\_EXTRACTION\_EXPR | Extraction expression is a condition. |
| -1308 | UPROCERR\_INDIRECTION | Indirection followed by brackets. |
| -1309 | UPROCERR\_PARENTHESES | Operand followed by parentheses. |
| -1310 | UPROCERR\_BRACKETS | Operand followed by square brackets. |
| -1311 | UPROCERR\_UNSOLVED\_OPERAND | A field, parameter, or variable could not be found in current context. |
| -1312 | UPROCERR\_LABEL | The label is not valid. |
| -1313 | UPROCERR\_SWITCH | The switch is not valid. |
| -1314 | UPROCERR\_DESTINATION | The operand cannot be used as destination. |
| -1315 | UPROCERR\_OPERATOR | The operator is not valid. |
| -1316 | UPROCERR\_RELATIONAL | Conditional operators are not allowed in expressions. |
| -1317 | UPROCERR\_SWITCH\_COMBINATION | The switch combination is not valid. |
| -1318 | UPROCERR\_SELFCONTAINED | This is not allowed in a self-contained component. |
| -1319 | UPROCERR\_SERVERPAGE | Function not allowed on server page. |

[Values returned by $procerror: -1400 – -1499](javascript:void(0);)

| Value | Error Constant | Meaning |
| --- | --- | --- |
| -1401 | UPROCERR\_PROMPT | Prompted field not valid. |
| -1402 | UPROCERR\_STATEMENT | Statement not allowed in this trigger. |
| -1403 | UPROCERR\_OPERAND | Operand not valid. |
| -1404 | UPROCERR\_NO\_PRINTING | Not printing (that is, $printing`=0`). |
| -1405 | UPROCERR\_UOBJ | UOBJ access failure. |
| -1406 | UPROCERR\_MEMORY | Memory allocation failure. |
| -1407 | UPROCERR\_READ\_ONLY | Operand is read-only. |
| -1408 | UPROCERR\_NO\_GUI | GUI driver not active. |
| -1409 | UPROCERR\_INTERACTIVE | Not in interactive mode. |
| -1410 | UPROCERR\_PROPERTY\_VALUE | A property has been assigned an incorrect value. |
| -1411 | UPROCERR\_EDITTWICE | Edit is not allowed in interactive mode.  An edit statement was encountered when the structure editor was already active. This error also occurs when an activate is performed on a modal form that is already in edit mode and that has an empty exec operation (an implicit edit). |
| -1412 | UPROCERR\_HANDLE\_USAGE | Invalid use of a handle. |
| -1413 | UPROCERR\_ASSIGN\_HANDLE\_SCOPE | Destination availability scope is too wide. |
| -1414 | UPROCERR\_THREAD\_START | Thread start failure. |
| -1415 | UPROCERR\_NODE | Not a valid Node Topic |
| -1416 | UPROCERR\_OBJECT | Specified handle is invalid |
| -1418 | UPROCERR\_FIELD\_NOT\_VISIBLE | Field is not visible |
| -1419 | UPROCERR\_WIDGETOPERATION | Widget operation is invalid |
| -1498 | UPROCERR\_OBJECT\_NOT\_ALLOWED | Handle is not allowed. |
| -1499 | UPROCERR\_OBJECT | The specified handle is not valid. |

[Values returned by $procerror: -1500 – -1699](javascript:void(0);)

| Value | Error Constant | Meaning |
| --- | --- | --- |
| -1500 | UXMLERR\_DTD\_NOTFOUND | A DTD could not be located. |
| -1501 | UXMLERR\_DTD\_INVALID | There is a syntax error in the DTD. |
| -1502 | UXMLERR\_GENERATION | An error occurred during generation of an XML stream. |
| -1503 | UXMLERR\_PARSE | An error occurred during parsing of an XML stream. |
| -1504 | UXMLERR\_VALIDATE | An error occurred during validation of an XML stream. |
| -1505 | UXMLERR\_TRANSFORM | An error occurred during transformation of an XML stream. |
| -1506 | UXMLERR\_FIELD\_NOTAVAIL | A mandatory field is not available in the field list of the entity. In the DTD, such fields must be followed by a question mark (?). |
| -1600 | UPROCERR\_INLINEMENU\_CONTEXT | The function has been used outside the scope of the current preDisplay context |
| -1601 | UPROCERR\_INLINEMENU\_COMPOMENT | The function has been used in a component. It is allowed only in a preDisplay trigger |
| -1602 | UPROCERR\_INLINEMENU\_CONTENT | The menu item list has been incorrectly defined. |
| -1603 | UPROCERR\_INLINEMENU\_REFMENU | A menu referenced in a cascading menu does not exist. |
| -1604 | UPROCERR\_INLINEMENU\_ID | Menu item identifier is missing |
| -1605 | UPROCERR\_INLINEMENU\_UNIQUE\_ID | Menu item identifier is not unique |
| -1606 | UPROCERR\_INLINEMENU\_TYPE | Invalid menu item type |
| -1607 | UPROCERR\_OPERATIONNAME | Invalid operation name |

[Values returned by $procerror: -1700 – -1749](javascript:void(0);)

| Value | Error Constant | Meaning |
| --- | --- | --- |
| -1700 | UUDEERR\_UDE\_NOT\_AVAILABLE | Function is not available at runtime |
| -1701 | UUDEERR\_OPERATION | Invalid operation name  Occurs when the first argument of the $ude function is incorrect. |
| -1702 | UUDEERR\_OPERATION\_NOT\_ALLOWED | Operation not allowed in combination with Object  Occurs when the first argument of the $ude function is incorrect. |
| -1703 | UUDEERR\_OBJECTTYPE | Invalid ObjectType  Occurs when the second argument of the $ude function is incorrect. |
| -1704 | UUDEERR\_OBJECTTYPE\_NOT\_ALLOWED | ObjectType is not supported  Occurs when the second argument of the $ude function is incorrect. |
| -1705 | UUDEERR\_DELETE | Failed to delete |
| -1706 | UUDEERR\_COMPILE | Failed to compile |
| -1707 | UUDEERR\_CLEANUP | Failed to cleanup |
| -1708 | UUDEERR\_LOOKUP | Failed to find Object |
| -1709 | UUDEERR\_ARGUMENTS | Invalid number of arguments |
| -1710 | UUDEERR\_SETTINGS | Failed to get/set settings |
| -1711 | UUDEERR\_VALIDATE | Failed to validate |
| -1712 | UUDEERR\_DESCRIBE | Failed to describe |
| -1713 | UUDEERR\_DECOMPILE | Failed to decompile |
| -1714 | UUDEERR\_LIST | Failed to list |
| -1715 | UUDEERR\_TEMPLATE | Failed to find @Template |
| -1716 | UUDEERR\_TEST | Failed to test |
| -1717 | UUDEERR\_OPERAND | Invalid operand |
| -1718 | UUDEERR\_COPY | Invalid copy / import / export  Occurs when the copy, import, or export operation failed. |
| -1719 | UUDEERR\_GENHTMLSKELETON | Error generating html skeleton |
| -1720 | UUDEERR\_GENERAL | Failed to process |
| -1721 | UPACKERROR\_PACKNOTSUPPORT | PackingCode not allowed for this DataType |
| -1722 | UPACKERROR\_NOPACK | Invalid PackingCode |
| -1723 | UPACKERROR\_NODEFAULT | Default does not exist |
| -1724 | UPACKERROR\_PACKRANGE | PackingCode out of range |
| -1725 | UPACKERROR\_INVSCALE | Scaling only allowed for Numeric DataType |
| -1726 | UPACKERROR\_SCALERANGE | Scaling out of range |
| -1727 | UPACKERROR\_SUBFIELD | Invalid subfield declaration |
| -1728 | UPACKERROR\_SIZE | Invalid size |
| -1729 | UPACKERROR\_SUBFIELDRANGE | Subfield does not fit in FixedFieldWidth |
| -1730 | UPACKERROR\_SYNTAX | Unrecognized characters seen |
| -1731 | UPACKERROR\_VARTYPE | Invalid Variable ID |
| -1732 | UPACKERROR\_CHARSET | Invalid Charset |
| -1740 | ULAYERROR\_SYNTAX | Syntax error |
| -1741 | ULAYERROR\_MNEMONIC | Invalid Mnemonic |
| -1743 | ULAYERROR\_PARENTHESIS | Invalid Parenthesis |
| -1744 | ULAYERROR\_NUMBER | Invalid Number |
| -1745 | ULAYERROR\_DISPLAY | Invalid Display format |

[Values returned by $procerror: -1900 – -1999](javascript:void(0);)

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `- 1900` | `JSONERR_NO_CONTENT` | Failed to load JSON string  Occurs if the contents of the file are empty or if no JSON string is available after stripping leading and trailing whitespace. |
| `-1901` | `JSONERR_NO_TEXT` | JSON text does not start with object or array  A JSON text must begin with `{` or `[`. |
| `- 1902` | `UJSONERR_PARSER` | JSON parser returned an error. Additional information is provided by the parser in $procerrorcontext.  Non-fatal warnings about conditions that may be errors are returned in the `DETAIL` sublist of $procReturnContext. For example, JSON text should normally not have members with the same name in one object, but there may be valid reasons for doing this. |
| `-1905` | `STRUCTERR_INPUT` | Input struct data is not valid. For example, the struct variable may have been declared, but not initialized. |

## Use

Allowed in all Uniface component types.

## Description

The $procerror function
returns a value that indicates the reason for an Proc execution error. The following functions are
also of use in this situation:

The function $procerror
returns a value that indicates the reason for a Proc execution error reported in
$status. When $status and $procerror are
both negative, $status indicates that an error occurred and
$procerror determines the reason for the error. This allows you to write error
processing code. The following functions are also of use in this situation:

* $procerrorcontext to
  determine the location of the error in your Proc code.
* $dataerrorcontext to
  determine the exact location of the error in the component's data structure.

The $procerror function is set
to `0` at the start of any Proc module (and with reset$procerror). It is set to a negative value if an error occurs, as follows:

* For a simple statement (such as
  creocc and putitem), $procerror is less
  than 0 and $status is usually less than 0.
* For a statement that activates another module
  (such as activate or call), both
  $procerror and $status are less than 0. (If
  $status is set by Proc code, $procerror remains 0.)
* For a statement that causes ‘nested’
  activation of triggers (such as store and validate), both
  $procerror and $status are less than 0. (If
  $status is set by Proc code, $procerror is set to
  <UGENERR\_4GL\_SAYS\_ERROR>. )
* For a function, $procerror
  is less than 0 and $status is usually not changed.

If $procerror is set to
Value, the description and mnemonic for this value can be retrieved from
$procerrorcontext.

**Note:**  Proc functions only set
$procerror in case of failure.; they do not reset $procerror
to `0` in case of success. This behavior ensures that expressions that contain
several Proc functions return an error in $procerror, even if the last Proc
function was successful; $procerror holds the last error value.

## Error Handling with $procerror

Symbolic error constant names can be used to
create global constants. These can be used with $procerror to write generalized
and more readable error handling routines. For example:

```procscript
store
if ($status >= 0)
   done
elseif ($procerror = <UIOSERR_LOCKED>)
   askmess "This occurrence is in use elsewhere. Please try later."
elseif ($procerror = <UIOSERR_UPDATE_NOTALLOWED>)
   askmess "You don't have Write permission."
elseif ($procerror = <UGENERR_ERROR>)
   aksmess "Sorry, something's wrong."
else
   aksmess "Problem: %%$status / %%$procerror"
endif
```

## Related Topics

- [$dataerrorcontext](_dataerrorcontext.md)
- [$procerrorcontext](_procerrorcontext.md)
- [$status](_status.md)


---

# $procerrorcontext

Return the location of the error specified by $procerror.

$procerrorcontext

## Return Values

Associative list that describes the context in
which the error occurred.

Associative List Items Returned by $procerrorcontext

| Item | Meaning |
| --- | --- |
| `ERROR=`ErrorValue | The value of `$procerror` |
| `MNEM=`ErrorConstant | The error constant associated with the current value of `$procerror` |
| `DESCRIPTION=`Text | A brief description of the error |
| `COMPONENT=`CompName | The name of the component in which the error occurred |
| `PROCNAME=`ModuleName | The name of the Proc module in which the error occurred, that is, the name of the entry, the operation, global Proc, or the `Y`nnn number of the trigger (as shown in the Proc listing) |
| `TRIGGER=`TriggerName | The trigger name abbreviation where the error occurred |
| `LINE=`LineNumber | The line number (as shown in the Proc listing) at which the error occurred |
| `ADDITIONAL=`AssociativeList | An associative list containing additional information. For details, see [Additional Information](#section_222644CB9A00426E8133B56E3FBE83CA) |

## Use

Allowed in all Uniface component types.

## Description

The $procerrorcontext function
returns an associative list that describes the context of the last validation error that occurred.
In certain situations, $procerrorcontext offers additional information
identified by the ID `ADDITIONAL`, which is itself an associative list.

If an error occurs when calling out to a web
service, Uniface generates error `-150` and provides details about the error in
$procerrorcontext. Most of the information about the fault is provided under the
`ADDITIONAL` ID.

## Additional Information

Additional information is held under the ID
`ADDITIONAL`, in an associative list:

Associative List Items Under the ADDITIONAL ID of $procerrorcontext

| Item | Meaning |
| --- | --- |
| `MODULENAME=`ModuleName | Name of the module upon which a call statement failed. |
| `INSTANCENAME=`InstanceName | Name of the target instance on which a newinstance statement failed, or name of the instance containing the operation on which activate failed. |
| `OPERATIONNAME=`OperationName | Name of the operation upon which an activate statement failed. |
| `COMPONENTNAME=`ComponentName | Name of the target component upon which a newinstance statement failed. |
| `COMPONENTID=`ComponentID | Component ID of a component upon which a newinstance statement failed due to a mismatch between unique IDs. |
| `DESCRIPTORID=`DescriptorID | Descriptor ID of a component upon which a newinstance statement failed due to a mismatch between unique IDs. |

Additional Associative List Items Added by SOAP U2.0 Connector

| Item | Meaning |
| --- | --- |
| `DRV=Connector` | Identifier of the connector in which the error occurred. For SOAP faults, it is always `SOP`. |
| `LOCATION=`SoapCallOutErrorLocation | Stage at which the error occurred during SOAP call-out. For more information, see [Information Returned for Web Services Call-Out Errors](_procerrorcontext_soaperrors.md).  For each `LOCATION`, the error is further described using the items `CODE`, `MESSAGE`, `ACTOR`, and `DETAIL` |
| `CODE=`ErrorCode | Short form the error description; mandatory. |
| `MESSAGE=`ErrorString | Long form of the error description; mandatory. |
| `ACTOR=` | If `LOCATION=SOAPFAULT`, the literal contents of the `<faultactor>` element , if available.  If `LOCATION` is `CALLBACK_PRE` or `CALLBACK_POST`, the component name and operation of the callback operation. |
| `DETAIL=` | A string giving further application or processing details about the error, if available. |

## Validating Keys and Error Handling

The following example uses the
$curkey function to perform specific validation for each key:

```procscript
; trigger Validate Key

selectcase $curkey
   case 1 ;perform validation for the primary key
   ...
   case 2 ;perform validation for candidate key #2
...
   case 4 ;perform validation for candidate key #4
...
   elsecase
      message "Error %%$procerror occurred at %%$procerrorcontext"
      message "Context: %%$dataerrorcontext"
endselectcase
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Now returns SOAP fault information when errors occur during web services call-out. |

## Related Topics

- [$dataerrorcontext](_dataerrorcontext.md)
- [$procerror](_procerror.md)
- [SOAP Faults in Web Services Call-In](../../../integration/soap/concepts/soapfaulthandlingforwscallin.md)


---

# $processinfo

Returns information about a process. The returned information depends on the operating
system.

$processinfo`(`Topic {`,` ProcessId}
`)`

## Parameters

* Topic—string specifying the
  information requested; one of:

| Topic | Platform | Explanation |
| --- | --- | --- |
| `pid` | All | Process ID of the current process |
| `user` | All | OS user name of the current process |
| `host` | All | Machine name (without domain) of the current process |
| `heapsize` | Windows and Solaris | Memory heap used by the current process  **Note:**  On Windows, there may be multiple heaps, so the returned heapsize may be incorrect. See [Memory Heaps on Windows](#section_3B1321910F4F49E2BB6C07E3D4C18438) |
| `stacksize` | Solaris | Memory stack size of the current process |

* ProcessId (Solaris
  only)—process ID for which information is requested; if left empty or unspecified, information
  about the current process is returned.

## Return Values

Returns the string value associated with the
topic.

Values of $procerror Commonly Returned by $processinfo

| Value | Meaning |
| --- | --- |
| `0` | Success |
| `-2` | Requested information is not available |
| `-3` | An error occurred while getting the information |
| `-1118` | topic is not supported on this platform or not recognised at all |

## Use

Allowed in all Uniface component types.

## Memory Heaps on Windows

On Windows, there are several memory heaps, so the
returned heap size may not be correct.

If you are only using Uniface components and Proc,
$processinfo("heapsize") will return the correct heap size. However, if you
create and use your own 3GL functions, and they allocate memory, you must do the following to
ensure the returned heap size is correct:

* Use the commands for compiling and linking as
  provided in `UnifaceInstallDir\uniface\3GL\makefile.w2k`
* Do not mix your Uniface process (which is
  built without the debug flags) with your own debuggable functions.

```procscript
vPid = $processinfo("pid")
```

You can use $processinfo in
combination with $proc\_tracing\_addition to monitor memory usage.

```procscript
$proc_tracing_addition = "Process: %%$processinfo("pid")"
```

---

# $procReturnContext

Get context information about the value returned by the Proc instruction that last set
$procReturnContext.

Result`=`$procReturnContext

## Return Values

When used after selected Proc instructions,
$procReturnContext returns an associative list of items concerning that Proc
instruction. The content of the list depends on the command that set it. The following table lists
the common items.

Common Items Returned by $ProcReturnContext

| Item | Description |
| --- | --- |
| `Context``=`Context | Value indicating the previously executed command that set $procReturnContext; one of:  `EntityCopy`  `StructToComponent`  `StructToXml`  `XmlToStruct`  `StructToJson`  `JsonToStruct`  `UDE Copy`  `UDE Import`  `UDE Exists`  `UDE Export`  `UDE Compile` |
| `Infos=`Number  `Warnings=`Number  `Errors=`Number | Number of messages, warnings, and non-fatal errors generated during processing |
| `DETAILS``=`String | Messages, warnings, and non-fatal errors encountered during processing, structured as a Uniface list |

An item is omitted if its value is zero or an
empty string.

## Proc Commands that Set $procReturnContext

The $procReturnContext function
provides additional information for Proc instructions that are typically involved in batch
processing and data conversion. It can be used after:

* [$ude](_ude.md)
* [entitycopy](../procstatements/entitycopy.md)
* [structToComponent](../procstatements/structtocomponent.md)
* [structToXml](../procstatements/structtoxml.md)
* [xmlToStruct](../procstatements/xmltostruct.md)
* [structToJson](../procstatements/structtojson.md)
* [jsonToStruct](../procstatements/jsontostruct.md)

The information returned in
$procReturnContext depends on the command that was used. The following examples
show the different outputs that may be produced (formatted for readability).

## $procReturnContext after `$ude ("compile")`

```procscript
Context=UDE compile ;
InputComponents=2 ;
OutputComponents=1 ;
Infos=32 ;
Warnings=2 ;
Errors=1 ;
Details=
 ID=1016!!;
  MESSAGE=(Fields for) entity DEBUG not found in application model, generating now...!!; 
  SEVERITY=Warning!;
 ID=1301!!;
  MESSAGE=Component variable "LNR" is not referenced in the component.!!;
  SEVERITY=Info!;
...
```

## $procReturnContext after `entitycopy`

```procscript
Context=EntityCopy;
 InputRecords=9;
 OutputRecords=9;
 InputDescriptors=5;
 OutputDescriptors=5;
 InputXmlFiles=1;
 Release=9.5;
 DETAILS=
  Operation=entitycopy!!;
    From=mycars.xml!!;
    To=!!;
    InputRecords=0!!;
    OutputRecords=0!!;
    DETAILS=!;
  Operation=entitycopy!!;
    From=mycars.xml!!;
    To=!!;
    InputRecords=1!!;
    OutputRecords=0!!;
    DETAILS=
      ID=8078!!!!;
      MESSAGE=8078 - Copy from 'mycars.xml' to 'DEF:UCSCH.DICT'.!;
  Operation=entitycopy!!;
    From=mycars.xml!!;
    To=·!!;
    InputRecords=0!!;
    OutputRecords=1!!;
    DETAILS=
      ID=8074!!!!;;
      MESSAGE=8074 - Copied from 'mycars.xml' to 'DEF:UCSCH.DICT' total records/rows 1.!;
   Operation=entitycopy!!;
     From=mycars.xml!!;
     To=·!!;
     InputRecords=1!!;
     OutputRecords=0!!;
     DETAILS=
       ID=8078!!!!;
       MESSAGE=8078 - Copy from 'mycars.xml' to 'DEF:UCTABLE.DICT'.!;
....
```

## $procReturnContext after `structToXML`

```procscript
Context=StructToXml;
Warnings=1;
DETAILS=
  ID=-1160!!;
    SEVERITY=Warning!!;
    MNEM=<STRUCTERR_TAGVALUE_NOT_APPLICABLE>!!;
    DESCRIPTION=Struct tag value not applicable in conversion from struct!!;
    CURRENTSTRUCT=""->#comment{1}!!;
    ADDITIONAL=
      TAGNAME=xmlClass!!!;
      TAGVALUE=commen!!!;  
      EXPECTED=Struct valid on XML document level
```

## $procReturnContext after `structToJson`

```procscript
Context=StructToJson;
Warnings=2;
DETAILS=
    SEVERITY=Warning!;
    CURRENTSTRUCT=""!;
    ADDITIONAL=Encountered unexpected jsonClass: Xobject!!;  
    SEVERITY=Warning!;
    CURRENTSTRUCT=""!;
    ADDITIONAL=Duplicate struct member name encountered: a
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Added structToComponent and structToXml to the Proc commands that can set this function.  Replaced the `AdditionalInfo` section with `DETAILS` section containing messages, warnings, and errors. |
| 9.1.01 | Introduced. Can be set by $ude and entitycopy |

## Related Topics

- [entitycopy](../procstatements/entitycopy.md)
- [$ude](_ude.md)
- [structToComponent](../procstatements/structtocomponent.md)
- [structToXml](../procstatements/structtoxml.md)


---

# $prompt

Return or set the position for the cursor when the current Proc module ends.

$prompt

$prompt`=`Field

## Parameters

Field—field name; optional;
can be a literal name, a string, or a variable, function, parameter or indirect reference to a
field. Field can optionally contain a qualified field name, for example
`MYFLD.MYENT`.

## Return Values

* String that contains the name of the field
  where the cursor will be positioned when control returns to the structure editor. The returned
  value is
  Field`.`Entity`.`Model;
  all letters are uppercase.
* Empty string ("") if the default prompting
  sequence is in effect.

## Use

Use only in forms. If used in other components, it
is ignored.

**Note:**  $prompt should
*not* be used in I/O-related triggers that set the active path, such as Retrieve,
because $prompt can change the active path. As a result, the sequence of fired
triggers will be different from the expected sequence, and some triggers will not fire at all, for
example Leave Field and Field Gets Focus.

## Description

The function $prompt can be
used to define the field where the cursor should be positioned when the current Proc module ends.
When the name of a field is assigned to $prompt, the cursor is positioned at
that field when control returns to the structure editor.

When executed, Uniface automatically scrolls to
the field where the cursor is positioned. If the field has an associated label, Uniface scrolls to
show the entire field including the associated label. This is especially useful in mobile
applications in which some fields may not be immediately visible. You can disable this automatic
scrolling using the $PROMPT\_SCROLL assignment setting.

## Using $prompt

The Next Field trigger Proc code below defines
conditional field prompting. If the invoice date is greater than the system date, the cursor goes
automatically to the CORRESP entity. Otherwise, the cursor goes to the next field in the default
prompting sequence.

```procscript
; Next Field trigger

if (INVDATE > $date)
   $prompt = TEXT.CORRESP
   message "Invoice is overdue. Write a reminder letter."
endif
```

History

| Version | Change |
| --- | --- |
| 9.3.01 | If a field is not visible and is given focus by $prompt, it is now scrolled into view. To restore previous behavior, introduced $PROMPT\_SCROLL assignment setting. |

## Related Topics

- [$PROMPT_SCROLL](../../../configuration/reference/assignments/_prompt_scroll.md)
- [Active Path](../../../howunifaceworks/processing/concepts/active_path.md)


---

# $properties

Return or set the current widget properties of a field.

PropertyValuesList `=`$properties
{`(`Field{`,` PropertyList}`)`
}

$properties
{`(`Field {`,` PropertyList }
`)` } = PropertyValuesList

## Parameters

* Field—field name;
  optional; can be a literal name, a string, or a variable, function, parameter or indirect reference
  to a field. Field can optionally contain a qualified field name, for example,
  `MYFLD.MYENT`. If omitted, the current field is used.
* PropertyList—list of widget
  property names, separated by GOLD ; (`;`); can be a string, or a
  variable, function, or parameter that evaluates to a string, or a field (or indirect reference to a
  field)
* PropertyValuesList—associative list of
  Property=PropertyValue pairs (separated by GOLD ; ), where
  PropertyValue is the value to be assigned to the property identified by
  Property.

## Return Values

* Associative list containing the widget
  properties that have been explicitly set. The default properties, including those set in the
  .ini file, are not returned.
* Empty string ("") if:

  + No widget properties have been explicitly
    set in the Define Properties form or with $properties.
  + An error occurred.
    $procerror contains a negative value that identifies the exact error.

Values of $procerror commonly returned by $properties

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |

## Use

Allowed in forms, reports, and dynamic server pages
.

In DSPs, $properties can only
be used once (before $webdefinitions is called, when the page is initially
loaded) to override the default declarative properties. It cannot be use to dynamically change the
properties.

## Description

Widget properties can be explicitly set in the
Define Widget Properties form or by using $properties.

At run time, all the properties associated with a
widget can be changed until the form is presented to the user (with edit or
display). After this point, only the widget's *dynamic* properties
can be changed.

When setting widget properties with
$properties overrides the specified properties that have been explicitly set,
either declaratively (in the Define Widget Properties dialog box), or in Proc
(by a previous $properties assignment). Omitting a property causes that property
to be reset to the default values, as determined by the Windows version and the
.ini file.

Properties are reset to the compiled values each
time that a component is restarted (assuming the Keep Data in Memory
property is cleared). The compiled values are the default properties, plus the properties set for
the entity declaratively.

You can change the properties of the widget in a
single occurrence using $fieldproperties.

When changing widget properties, keep in mind
that these properties sometimes interact with each other. For example, for an edit box in Microsoft
Windows, setting `WordWrap=True` has an effect only if
`MultiLine=True` and `HScroll=False`.

## $properties in a Web application

Style references are stored as property values in
the Repository, and can be manipulated with $properties and
$fieldproperties. For dynamic changes to the look and feel of style attributes,
use the field-level `subclass` property, which is checked at run time and propagated
through the generated HTML. The `subclass` property uses predefined style references
from the Cascading Style Sheet (CSS) used by the Web application. The syntax used by
$properties is:

$properties(Field`) = "subclass=`MyClass`"`

where MyClass is a predefined
style class in the application’s CSS.

**Note:**   The syntax of $properties*must not* include spaces.

## Changing Font and Alignment

The following example alters the font name used
for the label associated with the radio group GENDER, and makes the representation appear to the
left of the button:

```procscript
; Execute trigger
$properties(GENDER) = "LabelFont=font10;Align=left"
```

## Related Topics

- [$fieldproperties](_fieldproperties.md)
- [$fieldvalrep](_fieldvalrep.md)
- [$valrep](_valrep.md)
- [Changing Form Layout Dynamically](../../../desktopapps/forms/definingformlayoutinproc.md)


---

# $putmess

Send a message to the message frame, or return the contents of the message frame.

$putmess {`=`String}

$putmess`=`String

vReturn`=`$putmess

## Parameters

String—string containing the
message content, or a null string ("").

* If String is assigned, the
  message frame is cleared and set to contain the contents of String.
* If a null string is assigned, the message
  frame is cleared.
* If omitted, the message frame is not
  cleared.

## Return Values

* Contents of the message frame.
* Empty string (""), if the message frame has
  been cleared.

## Use

Allowed in forms and server pages
.

## Description

What you can do with the contents of the message
frame depends on the environment of the running component, for example:

* In a component running locally, you can use
  $putmess output as you see fit
* In a remote component (that is, a service or
  report running on an Application Server, exclusive or shared), the Application Server will redirect
  the contents of the component's message frame to the server's logfile (see the assignment setting
  $PUTMESS\_LOG\_FILE).

  This is *not* the case for a
  Database Server or File Server, which return server messages back to the client.
* You can also return
  $putmess to the client as an OUT parameter from a remote component, as shown in
  the example.

## Using $putmess in Server Pages

In a server page, $putmess
inserts the content of the message frame into the generated HTML page. This is done by specifying
the function type in the `<X_SUBST>` tag in the following way:

`<PRE><X-SUBST type=function
name=$putmess> </X-SUBST></PRE>`

In a Web application, $putmess
also contains trace information from the debug statement, if specified in the
application.

## Assigning Message Frame Contents to Variable

The following example, from a component running
locally, assigns the content of the message frame to the global variable RETRIEVEDETAILS.

```procscript
; Retrieve trigger
retrieve
if ($status < 0)
  message $text(1762) ;error
endif
$$RETRIEVEDETAILS = $putmess
```

## Returning Message Frame Contents as a Parameter

The following example, from a service component
running remotely, assigns the content of the message frame to an output parameter for processing by
the client.

```procscript
; Operations trigger of service component SVC1
operation TEST_RETRIEVE
params
   string pKey : IN
   string pPutmess : OUT
endparams
clrmess
putmess "Start of service <$componentname>"
CUST_ID/init = pKey
retrieve
if ($status < 0)
   putmess " Retrieve failed"
   putmess " $procerror = %%$procerror"
   putmess " %%$procerrorcontext"
endif
putmess "End of service <$componentname>"
pPutmess = $putmess
end
```

## Related Topics

- [clrmess](../procstatements/clrmess.md)
- [putmess](../procstatements/putmess.md)
- [$PUTMESS_LOG_FILE](../../../configuration/reference/assignments/putmess_logfile.md)


---

# $relation

Return the related key field.

$relation { `(`Field`)` }

## Parameters

Field—field name; optional;
can be a literal name, a string, or a variable, function, parameter or indirect reference to a
field. Field can optionally contain a qualified field name, for example,
`MYFLD.MYENT`. If omitted, the current field is used.

## Return Values

* Name of the related primary or foreign key
  field. The value returned depends on where the entities occur in the component data structure.
* Empty string (""), if the specified field is
  not part of a related primary or foreign key.

## Use

Allowed in all Uniface component types.

## Description

The function $relation can be
used to find the name of the key field that is related to the specified field when a one-to-many
relationship exists between two painted entities.

The use of $relation depends
upon where the entities occur in the data structure:

* If the specified field is part of the foreign
  key of an inner, many entity, $relation returns the name of the primary key
  field corresponding to that foreign key field.
* If the specified fieldis part of the foreign
  key of an outer, many entity, $relation returns the name of the primary key
  field corresponding to that foreign key field.

  If two or more painted entities are related to
  the outer entity via the same foreign key, the first one entity painted (as viewed left-to-right,
  top-to-bottom) is the one considered by $relation.
* If the specified field is part of the primary
  key of an inner, one entity, $relation returns the name of the foreign key field
  corresponding to that primary key field.
* In all other cases,
  $relation returns an empty string ("").

The figure below illustrates an up relationship
painted between the one entity OWNER and many entity HORSE:

Up Relationship Painted Between One (Inner) Entity and Many (Outer) Entity

$relation can be used to obtain
one of the following:

* The name of the primary key field (in entity
  OWNER) that is related to the foreign key field HORSE\_OWNER\_NAME (in entity HORSE).
* The name of the foreign key field (in entity
  HORSE) that is related to the primary key field OWNER\_HORSE in entity (OWNER).

This is illustrated in the following example:

```procscript
$1 = $relation(HORSE_OWNER_NAME.HORSE)
; $1 is "OWNER_NAME.OWNER.TRACKER"
$2 = $relation(OWNER_NAME.OWNER)
; $2 is "HORSE_OWNER_NAME.HORSE.TRACKER"
$3 = $relation(HORSE_AGE.HORSE)
; $3 is ""
```

---

# $replace

Search and replace a substring of a string. The search and replace is
case-sensitive.

$replace`(`Source`,` StartPos`,` SearchFor`,` ReplaceWith{`,`  Count}`)`

## Parameters

* Source—string on which the
  replacement needs to be done.
* StartPos—position in
  Source where the replacement needs to start.
* SearchFor—substring to
  search for. SearchFor can be a constant string or a syntax string.
* ReplaceWith—substitute for
  the substring.
* Count—number of
  occurrences of the substring that should be replaced. If omitted, only the first occurrence of the
  substring is replaced. If Count is -1, all occurrences are replaced.

## Return Values

String with the replacements made.
$replace does not affect $status.

If Source is empty,
$replace returns the empty string and an error in
$procerror.

If SearchFor is empty,
$replace returns the unaltered Source string and an error in
$procerror.

Values Commonly Returned by $procerror Following
$replace

| Value | Error Constant | Meaning |
| --- | --- | --- |
| -1118 | <UPROCERR\_ARGUMENT> | The argument specified is incorrect. |

## Use

Allowed in all Uniface component types.

## Description

Although the Source string can
be 2048 MB, using very long Source strings (larger than 50,000 bytes) is not
recommended because this can degrade performance.

## $replace

The following example replaces all occurrences of
`a` with `A`:

```procscript
vReplaced = $replace("a should be uppercase", 1, "a", "A", -1)
; Result: vReplaced = "A should be uppercAse"
```

The following example replaces only the first
`a`:

```procscript
vReplaced = $replace("a should be replaced by B", 1, "a", "B")
; Result: vReplaced = "B should be replaced by B"
```

## Operation GETXMLITEM

This operation calls an XSLT stylesheet and returns the value of a node in an XML
stream. The parameters can specify one node or several nodes.

`GETXMLITEM` uses
`$replace` to insert parameters `XNODE` and `XVALUE`
into an XSLT stylesheet, and uses component USYSXSLT to process the XSLT
stylesheet.

For more information about the
XSLT stylesheet used by this operation, and examples of input and output data, see
[USYSXSLT](../../../integration/xml/reference/xmltransformations/usysxslt.md).

```procscript
operation GETXMLITEM

; Get an item or set of items from an XML stream
; using XPATH patterns.
; Modify an XSLT stylesheet using the $replace
; function, and then activate USYSXSLT.

params
   numeric I_STATUS : OUT
   string I_STATUSCONTEXT : OUT
   string I_XML : IN
   string XNODE : IN
   string XVALUE : IN
   string I_VALUE : OUT
endparams

variables
   string XSLTFILE
endvariables

fileload "getitem.xsl", XSLTFILE

XSLTFILE = $replace(XSLTFILE, 1, "TargetNode", XNODE)
XSLTFILE = $replace(XSLTFILE, 1, "TargetValue", XVALUE)

filedump XSLTFILE, "getitemtemp.xsl"

activate "USYSXSLT".XMLTRANSFORM(I_XML, "getitemtemp.xsl", " ", I_VALUE, I_STATUS, I_STATUSCONTEXT)

end ; operation GETXMLITEM
```

---

# $result

Return the result of certain Proc statements and tree widget events.

$result

$result`=`Expression

## Return Values

The $result function is set by
many Proc statements and by tree widget events. For the values $result can
contain, see the documentation for the individual Proc statements.

## Use

$result is allowed in form,
service, and report components.

$result`=`Expression
is allowed in form components (and in service and report components that are not self-contained).

## Description

$result receives the result of
several Proc statements and tree widget events. For example:

* First column of the last selected occurrence
  when a SELECT statement is included in an sql statement.
* Unique number generated by the
  numgen statement.
* Status of comparison made with the
  compare statement.
* Status of actions performed with
  $ude

In the debugger, $result can
be accessed directly or as variable `$101`.

## Generating and Retrieving Unique Sequence Numbers

The following example uses the
numgen statement to generate unique sequence numbers for a record. This unique
number is accessible via $result.

```procscript
; Execute trigger
numgen "INVOICE_NUMBER", 1, $variation
if ($status < 0)
   message "Error generating sequence number."
   edit SEQNO
else
   SEQNO = $result
   edit NAME
endif
```

## Related Topics

- [addmonths](../procstatements/addmonths.md)
- [filebox](../procstatements/filebox.md)
- [length](../procstatements/length.md)
- [numgen](../procstatements/numgen.md)
- [print](../procstatements/print.md)
- [sql](../procstatements/sql.md)
- [$status](_status.md)
- [=](../procstatements/equals.md)


---

# $rettype

Return the retrieval mode of the outermost entity.

$rettype

## Return Values

Values returned by $rettype

| Trigger | Value | Meaning |
| --- | --- | --- |
|  | "" | An error occurred. $procerror contains a negative value that identifies the exact error. |
| Add/Insert Occurrence | 65 | Add occurrence |
| 73 | Insert occurrence |
| Read | 43 | Retrieve additional occurrences (retrieve/a) |
| 58 | Retrieve one additional occurrence (retrieve/x) |
| 78 | Next occurrence |
| 82 | Retrieve |
| 84 | Reconnect (reconnect and retrieve/reconnect) |
| 110 | Retrieve sequential |

Values of $procerror Commonly Returned Following
$rettype

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1304 | <UPROCERR\_UNKNOWN\_CONTEXT> | Function not allowed, unknown context. For example, $rettype was encountered outside the Add/Insert Occurrence and Read triggers. |

## Use

Allowed in all Uniface component types.

## Description

The function $rettype returns
the retrieval mode of the outermost entity. It should be used only in the Add/Insert Occurrence or
the Read trigger.

The following events set
$rettype:

* ^ADD\_OCC
* ^INS\_OCC
* read

## Imitating Uniface Default Behavior

You can use retrieval mode values to mimic the
default behavior of Uniface, and add additional code to set default values for fields in the
created occurrence.

```procscript
; Add/Insert Occurrence trigger

if ($rettype = 65)
   creocc "INVOICE", $curocc + 1
else
   creocc "INVOICE", $curocc - 1
endif
numgen "INV_COUNT", 1, $variation
INV_NUM/init = $result
```

## Related Topics

- [Read](../triggersstandard/read.md)
- [retrieve](../procstatements/retrieve.md)
- [reconnect](../procstatements/reconnect.md)
- [read](../procstatements/read.md)
- [Add/Insert Occurrence](../triggersstandard/addinsertoccurrence.md)


---

# $rscan

Find a substring within a string, starting from the end of the string.

$rscan`(`Source`,` SearchFor`)`

## Parameters

* Source—string in which the
  substring needs to be found.
* SearchFor—substring to
  search for. SearchFor can be a constant string or a syntax string with a maximum
  length of 256 characters.

## Return Values

Position of the substring within the string.

## Use

Allowed in all Uniface component types.

## Description

The $rscan function looks for
a string or a pattern in a string starting from the end of the string.

The following example finds the first occurrence
of literal `o` in the source string, when scanning from right to left.

```procscript
vOutput = $rscan("look for o", "o")
; vOutput = 10
```

The following example finds the literal string
`quick` in the source string.

```procscript
OUTPUT = $rscan ("The quick brown fox", "quick")
; OUTPUT = 5
```

The following example finds a number (using the
syntax string `"#"`) in the source string. It returns the position of first number
it encounters when scanning from right to left.

```procscript
vOutput = $rscan ("The 1st quick brown fox came 2nd.", $syntax("#"))
; OUTPUT = 30
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [$scan](_scan.md)


---

# $rtrim

Right trim a string following a pattern.

$rtrim`(`Source`,` Pattern`)`

## Parameters

* Source—string to be right
  trimmed.
* Pattern—pattern to remove.
  It can be a constant string or a syntax string. For more information, see [Syntax Strings for Pattern Matching](../../proclanguage/constants/syntax_string_constants.md)..

## Return Values

Trimmed string.

## Use

Allowed in all Uniface component types.

## Description

The $rtrim function is used to
right trim a string following a pattern.

```procscript
$1="UNIFACExxxx"
$2 = $rtrim($1,"x")
; $2 now contains "UNIFACE"
```

## Related Topics

- [$ltrim](_ltrim.md)


---

# $runmode

Return an indication of how the form was started.

$runmode

## Return Values

Values returned by $runmode

| Value | Meaning |
| --- | --- |
| 0 | The form can be used for all I/O purposes.  *All*  of these conditions are met:   * The form became active with an   edit statement, or the exec operation   is empty. in this case, Uniface behaves as if an edit statement were present. * The form is not a Limited form. * The form was started by one of these   methods:    + With a run     statement used without a /display or /query switch.   + With a     newinstance statement used with the component instance properties     `DISPLAY=FALSE` and `QUERY=FALSE`.   + With an     activate statement (resulting in an implicit newinstance). |
| 1 | The form can be used only for query purposes.  *All*  of these conditions are met:   * The form became active with an   edit statement, or the exec operation   is empty. in this case, Uniface behaves as if an edit statement were present. * The form is a Limited form or the   form was started by one of these methods:    + With a     `run/query` statement.   + With a     newinstance statement used with the component instance property     `QUERY=TRUE`. |
| 2 | The form is display-only. *One* of these conditions is met:   * The form was started with a   `run/display` statement. * The form was started with a   newinstance statement used with the component instance property   `DISPLAY=TRUE`. * The form became active with a   display statement. |

## Use

Allowed in Form
components.

## Description

**Note:**  It is recommended that you use
$editmode rather than $runmode.

The $runmode function returns
a value that indicates how the form was started. This also indicates how the form can be used to
affect data. The value of $runmode can also be changed by
$editmode.

In this example, $runmode is
used to inform the user as to whether the form is editable or read-only.

```procscript
; Execute trigger

selectcase $runmode
   case 0
   message/info "This form is editable"
elsecase
   message/info "This form is not editable"
   endselectcase
edit
```

## Related Topics

- [$editmode](_editmode.md)
- [display](../procstatements/display.md)
- [edit](../procstatements/edit.md)
- [run](../procstatements/run.md)


---

# $scan

Find a substring within a string.

$scan`(`Source`,` SearchFor`)`

## Parameters

* Source—string in which the
  substring needs to be found.
* SearchFor—substring to
  search for. SearchFor can be a constant string, or a syntax string with a
  maximum length of 256 characters.

## Return Values

* `0` Substring not found
* >`0` Position of the substring
  within the string.

## Use

Allowed in all Uniface component types.

## Description

The $scan function is used to
find a substring within a string.

The following example finds the first occurrence
of literal `o` in the source string.

```procscript
vOutput = $scan("look for o", "o")
; vOutput = 2
```

The following example finds the literal string
`quick` in the source string.

```procscript
OUTPUT = $scan ("The quick brown fox", "quick")
; OUTPUT = 5
```

The following example finds a number (using the
syntax string "#") in the source string.

```procscript
vOutput = $scan ("The 1st quick brown fox came 2nd.", $syntax("#"))
; OUTPUT = 5
```

## Related Topics

- [$rscan](_rscan.md)


---

# $selblk

Return or set the contents of the select buffer.

$selblk

$selblk`=`String

## Parameters

String—expression that
evaluates to a String value. The new data overwrites any previous contents of the buffer.

## Return Values

The function $selblk returns
the current contents of the structure editor select buffer.

## Use

Allowed in Form
components.

## Description

$selblk accesses the current
contents of the save and remove buffer of the structure editor. This buffer contains text that can
be accessed using structure editor functions.

Data is moved from a field to
$selblk by the following structure editor functions:

* ^REM\_SELECT
* ^REM\_FIELD
* ^SAVE

Data is moved from $selblk to
a field by the following structure editor functions:

* ^INS\_SELECT
* ^INS\_FIELD

Whenever data is sent or assigned to
$selblk, the new data overwrites any previous contents of the buffer.

In the Debugger, $selblk can
be accessed directly or as variable $102.

$selblk can be either a source
or target of an assignment statement, as shown in the following example:

```procscript
; copies the contents of the select buffer into $1
$1 = $selblk

; assign contents of field1 to select buffer
$selblk = field1
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

## Related Topics

- [macro](../procstatements/macro.md)


---

# $selected

Built-in occurrence attribute that indicates whether the occurrence is selected.

$occhandle
{`(` Entity
`)` }->$selected{`=``0` | `1`}

## Use

Allowed in all Uniface component types.

## Description

Individual occurrences may be selected for
processing. Each entity occurrence has a built-in Boolean attribute, called
$selected, that indicates whether it is selected.

The user can select occurrences, either singly or
using Ctrl+Click or Shift+Click to select multiple occurrences.
(Ctrl+A is not supported.)

The developer can select (or clear) a single
occurrence programmatically by setting the $selected attribute using the
occurrence handle. For example:

```procscript
variables
  handle hOcc
endvariables
hOcc = $occhandle("ENT")  ; A handle to the current occurrence
  ...
  hOcc->$selected = 1     ; Mark the occurrence as selected
  ...

  if (hOcc->$selected)    ; Test if the occurrence is selected
    ...
  endif

  hocc->$selected = 0     ; Clear the selection
```

When an occurrence is selected, it is added to the
collection of selected occurrences. You can use
$collhandle->$selectedoccs to address
this set, and
$collhandle->$clearselection to clear
the selection for all occurrences in the set.

| Version | Change |
| --- | --- |
| 9.7.01 | Introduced |

## Related Topics

- [$collhandle](_collhandle.md)
- [Occurrences](../../../howunifaceworks/processing/occurrences.md)


---

# $selectedoccs

Built-in entity attribute that contains a Struct of handles to occurrences that have
been selected.

$collhandle { `(`Entity`)` }->$selectedoccs

## Description

When an occurrence is selected, its built-in
$selected attribute is set to 1 and the occurrence is added to the collection of
selected occurrences. This attribute can be addressed using an occurrence handle. For more information, see [$occhandle](_occhandle.md) and [$selected](_selected.md).

You can use
$collhandle->$selectedoccs to address
the set of selected occurrences.

| Version | Change |
| --- | --- |
| 9.7.01 | Introduced |

## Related Topics

- [$clearselection](_clearselection.md)
- [Occurrences](../../../howunifaceworks/processing/occurrences.md)


---

# $selectlist

Return or set the select list for a component entity.

Return`=`$selectlist`(`Entity`)`

$selectlist`(`Entity`)`
{`=`SelectList}

## Parameters

* *Entity* —entity name; can be a
  literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
  the current entity is used.
* SelectList—indexed list
  that contains field names to be included.

## Return Values

Indexed list of unqualified field names in the
select list of Entity.

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror commonly returned after
$selectlist

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1101 | <UPROCERR\_FIELD> | An incorrect field name was provided; the field name is not syntactically valid, or is not available in the component. |
| -1102 | <UPROCERR\_ENTITY> | An incorrect entity name was provided; the entity name is not syntactically valid or is not available in the component. |

## Use

Allowed in all Uniface component types.

## Description

Use $selectlist to limit the
field data that is transferred during data retrieval or storage.

A component's Field List
property specifies the fields that can be loaded into the component at runtime, and managed and
formatted by Uniface. For more information, see [Field List](../../../development/reference/devobjproperties/entity/fieldlist_flist.md). During component compilation, required
fields may be automatically added to this list to generate the runtime field list. This list
defines the data fields that can be retrieved or stored in the database. It is not possible to get
the value of a field that is not in the runtime field list; trying to do so returns error
`-1101`.

You can use $selectlist to
define a subset of the runtime field list, known as a select list. This is an indexed
list of fields that are available after a read or retrieve
statement. Initially, the select list is the same as the runtime field list, so you can use
$selectlist to get the field list.

Once you assign a value to
$selectlist, it is used for all subsequent queries in the component instance,
and it is not possible to reset it to the original runtime field list. The only way to achieve an
equivalent result is to first save the original value, assign a value
(SelectList) to $selectlist, and then assign the previously
saved value. For example:

```procscript
operation exec
variables
   string vFieldList, vSelectList
endvariables

vFieldlist = $selectlist("MyEnt") ; save the original value of $selectlist to a variable

; create a new select list
putitem vSelectList, -1, "FLD1"
putitem vSelectList, -1, "FLD2"

$selectlist("MyEnt") = vSelectList ; assign a select list
retrieve

$selectlist("MyEnt") = vFieldlist  ; assign the original value of $selectlist

<... Do something...>
end; exec
```

When you set a select list, Uniface automatically
includes key fields in the select list, even if they are not included in
SelectList. However, foreign key fields that refer to an entity that is not
present in the component are not included unless specifically assigned to
SelectList. It is not possible to add a field to the select list that is not in
runtime field list. Non-database fields included in the SelectList are ignored.

After a select list is set, when an occurrence is
retrieved from the database, the fields not in the select list remain empty. Although these fields
can be modified in the component, the changes are not written to the database. However, the
lock trigger is activated when the field is changed and
the write trigger is activated when the data is stored.

## Setting and Displaying a Select List

The following example sets the select list of the
entity, PERSON, and displays the list in a message:

```procscript
$selectlist ("PERSON") = "NAME;ADDRESS"
if ($procerror = 0)
   retrieve
   putmess "The following fields have been retrieved:"
   putmess $selectlist
else
   message/error "Name and/or address cannot be retrieved."
endif
```

## Related Topics

- [Lists and Sublists](../../lists/lists_of_items.md)
- [List Handling in Proc](../../lists/listhandling.md)


---

# $setting

Retrieve, add, or change configuration settings. Depending on the platform, settings
may be stored initialization files, assignment files, environment variables, logicals, data areas,
or the Windows Registry.

Retrieve settings or sections:

ReturnedValue =
$setting`(`Source`,` RetrieveProfile`,` Topic`)`

```procscript
vSections = $setting ("C:\my_app.ini", "u*", "INISECTIONS") ; retrieve a list of file sections
vEnvVar = $setting ("", "SRC", "ENVDATA") ; retrieve the value of an environment variable
```

Add or change a setting:

$setting
`(`Source`,` Setting,
Topic`)` `=` Value

```procscript
$setting ("C:\my_app.ini", "upi\msglines", "INIDATA") = 5 ; set value of msglines to 5
```

## Parameters

Parameters

| Parameter | Data Type | Description |
| --- | --- | --- |
| Source | String | Location of the setting or settings. Valid values depend on the platform and must be supported by the Topic.   * Empty string   (`""`)—default source for the platform. On Windows, the default source depends on   the specified Topic. On other platforms, the default sources are environment   variables (Unix, iSeries). * ConfigurationFile—name of an   initialization file or assignment file. An assignment file must end with the   .asn extension. For more information, see [Addressing Initialization and Assignment Settings with $setting](_setting_ini.md). * USYS—runtime   settings. It is only possible to address WORKDIR and the USYS path logicals. On   Windows it is also possible to address settings in selected initialization file sections.   For more information, see [Addressing Runtime Settings with $setting](_setting_runtime.md). * On iSeries only, a   platform-specific value or keyword that species a system or global location. For more information, see [Addressing Environment Variables with $setting](_setting_envar.md).   For the supported values for each platform, see [Values of Source Argument per Platform](#section_96794CDE76D04A0EAD1C6D3ED6F46697). |
| Topic | String | Topic—keyword defining the information that needs to retrieved or set in the specified Source. See [Values of Topic](#section_23CCE8C119044C9EB8B41C1D7E8F8908).  Topic determines how the first and second arguments are interpreted. The Source and Topic must match. |
| RetrieveProfile | String | Retrieve profile for settings or sections, appropriate to the Topic; it can include wildcards (GOLD \* and GOLD ?). |
| Setting | String | Specification for the setting. When setting initialization, assignment, or runtime settings, it must include the file section or Registry key:  Section`\`Setting  See [Specifying Settings](#section_7779446C88C1F06F2ADBBA16BBC888B0). |

## Values of Topic

The Topic determines the way
that the Source and RetrieveProfile or
Setting arguments are interpreted.

Allowed Values for Topic

| Value of Topic | Description |
| --- | --- |
| INIDATA  INISECTIONS  INISETTINGS | Get or set settings in initialization or assignment files. For more information, see [Addressing Initialization and Assignment Settings with $setting](_setting_ini.md). |
| USYSDATA  USYSSECTIONS  USYSSETTINGS | Get or set runtime settings. For more information, see [Addressing Runtime Settings with $setting](_setting_runtime.md).  **Note:**  Except on Windows, it is only possible to address WORKDIR and the USYS path logicals. |
| ENVDATA  ENVVARS | Get or set environment variables or their platform-specific equivalents—symbols, or data areas and environment variables on iSeries. On Windows and Unix, it is only possible to address environment variables for the current process. For more information, see [Addressing Environment Variables with $setting](_setting_envar.md). |
| REGDATA  REGVALUES  REGKEYS | Get or set registry values on Windows only. For more information, see [Addressing Registry Keys with $setting](_setting_registry.md). |

## Return Values

$setting returns the value of a
setting or a Uniface list that matches the profile specified by the
RetrieveProfile argument.

If no data matches the pattern, an empty list
(`""`) is returned and $procerror is set to
`0`.

If an error occurred, an empty list is returned
and $procerror is set to the exact error number.

Values commonly returned by $procerror following
$settings

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `0` | UACT\_SUCCESS | Success. This value is also returned if no results were returned because the data does not exist. |
| `-4` | UIOSERR\_OPEN\_FAILURE | The specified source could not be opened. |
| `-12` | UIOSERR\_FILE\_READ\_WRITE | An error occurred while trying to read or write to the file, registry, or environment variable. |
| `-1118` | UPROCERR\_ARGUMENT | The argument specified is incorrect. For example, the Setting does not exist or is incorrectly specified.  This error is returned if:   * Setting is empty   and Topic is INISETTINGS,   USYSSETTINGS, ENVVARS, INIDATA, or   USYSDATA. * Setting is   specified and Topic is INISECTIONS or   USYSSECTIONS.   **Note:**  It is not an error for REGVALUES and REGDATA because every local registry key has an unnamed value (Default), and an empty Setting matches this value. |

## Use

Allowed in all Uniface component types.

## Description

The $setting function enables
you to:

* Set the value of a setting. If it does not
  exist, the setting is added to the specified source. If the setting is in an initialization or
  assignment file, the field section must be specified.
* Retrieve a list of settings.
* Retrieve a list of file sections or registry
  keys.

It is not possible to add or change a file section
using $setting.

To delete a setting, use
deletesetting. For more information, see [deletesetting](../procstatements/deletesetting.md).

The $setting Proc function
accepts all Unicode, but returns an error status if environment variables are used and the data
contains characters that are not in $SYS\_CHARSET. It also returns an error if
the name of the setting does not conform to the rules of the operating system.

## Specifying Settings

The second parameter of
$settings can specify a retrieve profile or a specific setting. The way Uniface
interprets this parameter depends on the Topic parameter.

When Topic ends with
`DATA`, it is always interpreted as a specific setting and it cannot contain
wildcards (GOLD \* and GOLD ?).

In all other cases, Topic the
second parameter is interpreted as a retrieve profile that can include GOLD\* and GOLD ?. For
INIDATA or USYSDATA, the setting specification
*must* include the file section. For example, to retrieve a list of settings in the
[upi] section of usys.ini:

```procscript
vSettings = $setting("usys.ini","upi/t*", "INISETTINGS")
```

The syntax used to specify a setting or a
retrieve profile can be any of the following:

{Section`\`}Setting

{Section`/`}Setting

{`[`Section`]`}Setting

`[`Section`/`Setting`]`

The Section may be required or
optional, depending on the Topic:

* Required for INISETTINGS,
  INIDATA, USYSSETTINGS, or USYSDATA.
* Optional for REGVALUES or
  REGDATA; if not specified, the default key is used, which is
  `HKEY_CURRENT_USER\Software\Uniface\USYS10`
* Omitted if Topic is
  INISECTIONS, ENVVARS, or
  USYSSECTIONS, but not for REGKEYS because registry keys
  can have sub-keys.

## Retrieving a Setting

To retrieve information about initialization
settings, use the $setting function on the right side of an assignment:

```procscript
vSetting = $setting ("", "paths/javascript", "INIDATA")
```

Or in the argument list of a function or operation
as input parameter. For example:

```procscript
activate MyComponent."oper"(arg1, $setting("", "SRC", "ENVDATA"), argn)
```

If the setting exists, the value is returned as a
string and $procerror is set to `0`, even if the value is an
empty string.

If a setting does not exist, an empty string is
returned and $procerrror is set to `-1118`.

**Note:**  To retrieve a list of all initialization or
assignment settings in a source, you need to first get a list of all the file sections, and then
loop through that list to get a list of the settings in each section. For more information, see [Retrieve a List of All Settings in a Source](_setting_ini.md#Retrieve).

## Adding or Changing a Setting

You can add or modify a setting only if the
Topic parameter ends in `DATA`—INIDATA,
REGDATA, ENVDATA, or USYSDATA. If
the setting does not exist, it is added to the end of the section. If the setting does exist, the
value is changed.

To set the value, put the
$setting function on the left side of an assignment. For example:

```procscript
$setting ("", "SRC", "ENVDATA") = "c:\u9601"
```

```procscript
$setting ("", "HKEY_CURRENT_USER\Software\Uniface\greeting", "REGDATA") = "Hello"
```

## Values of Source Argument per Platform

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

History

| Version | Change |
| --- | --- |
| 9.3.01 | Introduced |
| 9.6.04 | Added support for assignment settings |
| 9.6.05 | Added Source values of `"32"` and `"64"` to enable alternate registry access on older Windows platforms |

## Related Topics

- [deletesetting](../procstatements/deletesetting.md)
- [Initialization Settings and Files](../../../configuration/initializationsettingsandfiles.md)
- [USYS Path Logicals](../../../configuration/usys_pathlogicals.md)


---

# $signatureproperties

Dynamically set the signature properties (also known as connector options) for a
Uniface URB connector, or retrieve those that have been dynamically set. Supported only by the SOAP
U2.0 connector.

Set: $signatureproperties`(`ComponentName {`,` PropertyList}`)``=`PropertyValuesList

Return: var`=`$signatureproperties`(`ComponentName
{`,` PropertyList}`)`

For example:

```procscript
$signatureproperties("WebService1")="svc=http://www.corp.com/services/soap?Service=AWebService"
```

## Parameters

* ComponentName—name of a web
  service.
* PropertyList—associative
  list of properties that are available on the connector. For more information, see [SOAP Connector Options](../../../integration/soap/concepts/soap_options.md). It can be used to restrict the properties affected by the function.
* PropertyValuesList—associative list of
  properties and values that are available on the connector. If PropertyList is
  omitted, all items specified in the PropertyValuesList are set

## Return Values

Returns an associative list of the specified
Property= PropertyValue pairs that have already been set by
$signatureproperties. It does not return values that have been set in the
assignment file.

If the function is used to set values, it returns
the defined property string. If PropertyList is not specified or is an empty
string, all valid properties in PropertyValuesList are set. If
PropertyList is specified, only the Property= PropertyValue
of the specified property is returned.

If an error occurs, $procerror
contains a negative value that identifies the exact error. This function does not affect
$status.

Values Commonly Returned by $procerror after
$signatureproperties

| Error Number | Error Constant | Meaning |
| --- | --- | --- |
| `-1110` | `<UPROCERR _TOPIC>` | Property name not known (in either PropertyList or PropertyValuesList) |
| `-1132` | `<UPROCERR _UNRESOLVED_TOPIC>` | Property not specified in PropertyValuesList |

## Use

Allowed in all Uniface component types.

## Description

You can use the
$signatureproperties function to dynamically set the signature properties (that
is, the connector options) of the SOAP U2.0 connector.

For example, a SOAP web service and the endpoint
URL are described by a WSDL file. The name of this file is recorded in the signature of the web
service. For performance reasons, we recommend that the WSDL file be copied to local directory.
However, this means that if the service provider moves the web service to another location, it is
not reflected locally. Using tools such as UDDI, you can find the current location of the service
and use $signatureproperties to set the svc connector
option to reflect the actual location.

Uniface does not check the properties or the
component name when $signatureproperties is called. It just stores the
properties and when the SOAP connector creates an instance of the component, the properties are
retrieved and used. These properties are only defined in the local application and are not
transported to the component, if it is redirected with [SERVICES\_EXEC].

The dynamic properties you set get merged with the
properties defined in the assignment file (in the [SERVICES\_EXEC] section and the
USYS$SOP\_PARAMS setting).This means that if a property is not set with
$signatureproperties, the value as set in the assignment file is used. Thus, if
you want the freedom to add and remove properties, do not define them in the assignment file.

## Using $signatureproperties

The WSDL file of a web service contains the
following definition:

```procscript
<service name="AWSECommerceService">
  <port name="AWSECommerceServicePort" binding="tns:AWSECommerceServiceBinding">
    <soap:address location="https://webservices.amazon.com/onca/soap?Service=AWSECommerceService"/>
  </port>
</service>
```

However, if the service is now located on host
identified by `webservices.amazon.co.uk`, you can use
$signatureproperties to set this location:

```procscript
$signatureproperties("AWSECommerceService", "svc")="svc=https://webservices.amazon.co.uk/onca/soap?Service=AWSECommerceService"
```

History

| Version | Change |
| --- | --- |
| 9.6.03, X301 | Introduced |

## Related Topics

- [SOAP Connector Options](../../../integration/soap/concepts/soap_options.md)
- [Web Services](../../../integration/webservices/concepts/web_services_intro.md)


---

# $sin

Return the sine of X.

$sin`(`X`)`

## Parameters

X—angle in radians or a field
(or indirect reference to a field), a variable, or a function or expression which evaluates to an
angle in radians.

## Return Values

Sine of X

If an error occurs, $procerror
contains a negative value that identifies the exact error.

## Use

Allowed in all Uniface component types.

The following example returns the sine of the
given expression:

```procscript
$sinePiR$ = $sin($pi() * RADIANS)
```

## Related Topics

- [$asin](asin.md)


---

# $sortlist

Sort an associative list, an indexed list, or an indexed list of sublists.

$sortlist`(`List`,``"`SortElement{`:`SortOptions}
{;SortElement{`:`SortOptions}}`"``)`

Syntax of SortOptions:

{Order}{Unique}{Type}

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

## Sort Options

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

Returns the sorted list.

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

By default, $sortlist sorts on
the value part of a list item, in ascending order. Sorting is only done on the first 8K of item
data.

The values of $nlssortorder and
$nlslocale determine whether locale-based sorting rules are applied.
For more information, see [Sorting Based on Locale](../../lists/localbasedsorting.md).

For more information, see [Sorting Data in Proc](../../sorting/sortinglistsandhitlists.md).

## Sorting Lists by ID and by Value

Given the following list:

```procscript
vColors = ""
putitem/id = vColors "0", "BLUE"
putitem/id = vColors "1", "RED"
putitem/id = vColors "2", "GREEN"
```

You can sort the list by the ID part:

```procscript
vResult = $sortlist(vColors, "$idpart: descending numeric")

vResult = "2=GREEN;1=RED;0=BLUE"
```

or by the value part (the default):

```procscript
vResult = $sortlist(vColors, "ascending")

vResult: "0=BLUE;2=GREEN;1=RED"
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [$sortlistid](_sortlistid.md)
- [$nlssortorder](_nlssortorder.md)
- [List Handling in Proc](../../lists/listhandling.md)
- [Sorting Data in Proc](../../sorting/sortinglistsandhitlists.md)
- [Sorting Lists and Sublists](../../sorting/sortingsublists.md)
- [Sorting Based on Locale](../../lists/localbasedsorting.md)
- [sort/list](../procstatements/sortlist.md)


---

# $sortlistid

Sort an associative list in which the value part of each list item is an indexed
list.

$sortlistid`(`List`,``"`SortElement{`:`SortOptions}
{;SortElement{`:`SortOptions}}`"``)`

Syntax of SortOptions:

{Order}{Unique}{Type}

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

Returns the sorted list.

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

In an associative list with sublists,
$sortlistid enables to sort on the basis of a sublist item.

By default, $sortlistid sorts
on the value part of a list item, in ascending order. Sorting is only done on the first 8K of item
data.

The values of $nlssortorder and
$nlslocale determine whether locale-based sorting rules are applied.
For more information, see [Sorting Based on Locale](../../lists/localbasedsorting.md).

For more information, see [Sorting Data in Proc](../../sorting/sortinglistsandhitlists.md).

## Sorting on a Sublist Item

```procscript
;Construct an associative list of countries and their international calling codes
vList = ""
putitem/id vList "1", "Netherlands;31"
putitem/id vList "2", "Canada;1  "
putitem/id vList "3", "United Kingdom;44"
putitem/id vList "4", "United States;1"
putitem/id vList "5", "Japan;81"
putitem/id vList "6", "Australia;61"
```

To sort this list in descending order by calling
code, specify the second sublist item and the `descending` sort option:

```procscript
vSortedList = $sortlistid (vList, "2: descending numeric")
```

The resulting order of the items in
`vSortedList` will be:

```procscript
5 = Japan;81
6 = Australia;61
3 = United Kingdom;44
1 = Netherlands;31
2 = Canada;1;
4 = United States;1
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [$sortlist](_sortlist.md)
- [$nlssortorder](_nlssortorder.md)
- [List Handling in Proc](../../lists/listhandling.md)
- [Sorting Data in Proc](../../sorting/sortinglistsandhitlists.md)
- [Sorting Lists and Sublists](../../sorting/sortingsublists.md)
- [Sorting Based on Locale](../../lists/localbasedsorting.md)
- [sort/list](../procstatements/sortlist.md)


---

# $split

Split a string.

Return`=`$split`(`Source`,` StartPos`,` SearchFor{`,` LeftPart{`,` RightPart}}`)`

## Parameters

* Source—string which needs
  to be split.
* StartPos—position in
  Source where the search needs to start.
* SearchFor—substring to
  find; can be a constant string or a syntax string.
* LeftPart—left part of the
  split.
* RightPart—right part of
  the split.

## Use

Allowed in all Uniface component types.

## Return Values

Position of the SearchFor
substring within the string.

If the SearchFor substring is
not found, $split returns `0` in $status and the
Out parameters LeftPart and RightPart are empty.

## $split

```procscript
variables
    string vFieldname
    string vField, vEntity
    numeric vStatus
endVariables

vFieldname = "Field.entity"

; $status = $split(Source, StartPos, SearchFor{, LeftPart{, RightPart}})

vStatus = $split(vFieldname, 1, ".",vField, vEntity)

; vStatus = 6
; vField = "Field"
; vEntity = "entity"
```

---

# $sqrt

Calculate the square root of X.

$sqrt`(`X`)`

## Parameters

X—positive numeric constant,
or a field (or indirect reference to a field), variable, function, or expression that evaluates to
a positive numeric value.

## Return Values

Square root of X

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $sqrt

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1204 | <UPROCERR\_NEGATIVE> | Negative value not allowed. |

## Use

Allowed in all Uniface component types.

The following example computes the square root of
0.5.

```procscript
$root$ = $sqrt(1 / 2)
```

---

# $status

Return or set the current condition code.

$status

$status`=`Expression

## Return Values

An integer value. If a decimal value is assigned
to $status, Uniface rounds it to the nearest integer.

## Use

Allowed in all component types.

## Description

$status returns a condition
code that indicates the result of a runtime action, such as an I/O request. In general:

* A negative value in
  $status indicates an error. In this case, the function
  $procerror gives further information about the cause of the error and
  $procerrorcontext gives details about the exact location where the error
  occurred.
* `0` indicates a successful
  operation.
* A positive value indicates a warning or
  information.

Although you can assign a value of
$status to pass codes to another Proc module or component, doing so resets the
current value of $procerror, so the Proc error status and context are lost.

In the Debugger, $status can
be accessed directly or as variable `$100`.

## Proc Modules and $status

Each time a Proc module is activated,
$status is set to `0`. When the Proc module ends, Uniface checks
$status, because the value can influence what happens next.

The end value of $status has
different effects with different triggers. For example, if the Proc code in a Remove Occurrence
trigger ends with $status less than `0`, the occurrence is not
removed.

If the module was invoked by a statement, such as
call or activate, the return value of the module is assigned
to $status. If the module was invoked using an inline construction (such as an
instance handle or a function argument), the return value is returned inline, and the value of
$status remains unchanged.

For more information, see [Return Values, Status Values, and Proc Errors](../../proclanguage/return_values.md).

## Conditional Processing Based on $status

The following example inspects the value of
$status, set by the store statement in the Store trigger. The
check on $status allows the Proc code to handle error situations.

```procscript
; Store trigger
store
if ($status < 0)
   message "Store error number %%$status."
   rollback
else
   message "Store complete."
   commit
endif
```

## Related Topics

- [return](../procstatements/return.md)
- [store](../procstatements/store.md)
- [$dberror](_dberror.md)
- [$error](_error.md)
- [$procerror](_procerror.md)
- [$procerrorcontext](_procerrorcontext.md)
- [$result](_result.md)
- [Return Values, Status Values, and Proc Errors](../../proclanguage/return_values.md)
- [=](../procstatements/equals.md)


---

# $storetype

Return the type of update for the current occurrence.

$storetype {`(`Entity`)` }

## Parameters

Entity—entity name; can be a
literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
the current entity is used.

## Return Values

The following values are returned prior to the
execution of the write statement in the Write trigger:

Values returned by $storetype

| Value | Meaning |
| --- | --- |
| 1 | The occurrence will be inserted in the database. |
| 0 | The occurrence will be updated in the database. |
| "" | An error occurred. procerror  contains a negative value that identifies the exact error. |

Values of $procerror Commonly Returned Following $storetype

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed only in the Write trigger
.

## Description

The function $storetype
indicates the type of update of the current occurrence in the specified entity. Events that affect
the value of $storetype are shown in the following table:

Statements that change $storetype

| Event | Action |
| --- | --- |
| [creocc](../procstatements/creocc.md) | Sets $storetype to `1`. |
| [release](../procstatements/release.md)`/mod` | Sets $storetype to `1`. |
| [retrieve](../procstatements/retrieve.md) | Sets $storetype to `0`. |
| ^ADD\_OCC | Sets $storetype to `1`. |

The value of $storetype is
reset to 0 immediately following a write statement in the Write trigger.

## Logging Modification Information About Occurrences

The following example uses the
$storetype function in the Write trigger to determine whether an occurrence is
being inserted or updated. If it is being updated, the occurrence already exists; if it is being
inserted, the occurrence must be a new one. The example logs information about which user updated
or created a particular occurrence.

```procscript
; trigger: Write

if ($storetype = 1)
   putmess "new occurrence"
   CREATED_BY = $user
   CREATED_DATE = $date
else
   UPDATED_BY = $user
   putmess "existing occurrence updated by %%$user%%%"
endif
write
```

Note that the same result can be achieved using
$dbocc.

## Related Topics

- [write](../procstatements/write.md)


---

# $string

Return a string containing the replacement of each named XML entity in the input
parameter string by the character represented by the entity. (XML entities are character mappings;
they are not the same as Uniface entities.)

$string`(`String`)`

## Parameters

String—string that contains
zero or more XML entities. The allowed XML entities are:

* Unicode in decimal or hexadecimal format
* Selected standard XML character entities
* Selected Uniface-defined XML character
  entities

## Return Values

String with the allowed XML
character entities replaced by the characters represented by the entities.

## Use

Allowed in all Uniface component types.

## Description

**Note:**  The $string Proc function
should not be confused with the `$string` converter used in the
$typed function. For more information, see [$typed](typed.md).

The allowed XML entities in
$string are described in the following tables.

Unicode in decimal or hexadecimal format

| Format | Syntax | Description | Example |
| --- | --- | --- | --- |
| Decimal | `&#nnnn;` | n is a number: 0–9. | `$string("&#0065;")` returns the string: "`A`". |
| Hexadecimal | `&#xnnnn;` | n is an alphanumeric character: 0–9 and A–F or a–f. | `$string("&#x0041;")` returns the string: "`A`". |

Standard XML entities allowed in $string

| XML entity | Character | Description |
| --- | --- | --- |
| `&lt;` | `<` | Less than sign |
| `&gt;` | `>` | Greater than sign |
| `&amp;` | `&` | Ampersand |
| `&apos;` | `'` | Apostrophe |
| `&quot;` | `"` | Quotation mark |

Uniface-defined XML entities allowed in $string

| Uniface XML entity | Character | Description |
| --- | --- | --- |
| `&uNL;` | CR | New line |
| `&uPG;` | FF | New page |
| `&uTAB;` | HT | Tab |
| `&uALL;` | GOLD \* | Profile character (match 0-n characters) |
| `&uONE;` | GOLD ? | Profile character (match any single character) |
| `&uEQ;` | GOLD = | Profile character (is equal to) |
| `&uNOT;` | GOLD ! | Profile character (logical NOT) |
| `&uOR;` | GOLD | | Profile character (logical OR) |
| `&uAND;` | GOLD & | Profile character (logical AND) |
| `&uGT;` | GOLD > | Profile character (is greater than) |
| `&uLT;` | GOLD < | Profile character (is less than) |
| `&uSEP;` | GOLD ; | Subfield separator |

In the following example, FLD is a String field
whose packing code is `W*`.

```procscript
$1=$string("XML has five predeclared entities.") ;0 xml entity
$2=$string("They are: &lt;, &gt;, &amp;, %\
&apos;, and &quot;.")                            ;5 xml entities
FLD="%%$1%%^%%$2"
```

After executing this Proc, field FLD contains the
following:

```procscript
XML has five predeclared entities.
They are: <, >, &, ', and ".
```

You can generate all characters in the Unicode
character set using the $string function. The following Proc generates the 26
uppercase Latin 1 alphabet. FLD is a String field whose packing code is `W*`.

```procscript
$1=65
$2=""
while($1 < 91)
   $2="%%$2%%%&#%%$1;"
   $1=$1+1
endwhile
FLD=$string($2)
```

After executing this Proc, field FLD contains:

```procscript
ABCDEFGHIJKLMNOPQRSTUVWXYZ
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |

## Related Topics

- [Substitution in String Values](../../datatypehandling/substitution_in_string_values.md)


---

# $stripattributes

Return the result of removing character attributes, frames, and rulers from
String.

$stripattributes
(String)

## Arguments

String—string, or a field (or
indirect reference to a field), a variable, or a function that evaluates to a string.

## Return Values

String with character
attributes, frames, and ruler removed.

## Use

Allowed in all Uniface component types.

## Description

The $stripattributes function
returns the result of removing character attributes (bold, italic, and underline), frames, and
rulers from String.

## Stripping Character Attributes from a Field

The following Proc example shows how character
attributes are stripped from a Unifield, so the text can be used in field EDITBOX:

```procscript
MYFIELD = "aaabbb"
EDITBOX = $stripattributes(MYFIELD) ; EDITBOX contains "aaabbb"
```

History

| Version | Change |
| --- | --- |
| 9.1.01 | Characters that are not known in the target character set are not stripped from the string (in contrast to Uniface 8). |

## Related Topics

- [$bold](_bold.md)
- [$italic](_italic.md)
- [$underline](_underline.md)
- [stripattributes](../procstatements/strip_attributes.md)


---

# $subsetreturn

Return only the most recently retrieved occurrences of an entity to its operation
entity parameter.

$subsetreturn`(`Entity`)`

$subsetreturn`(`Entity`)``=`Expression

set | reset  $subsetreturn`(`Entity`)`

## Parameters

Entity—entity name; can be a
literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
the current entity is used.

## Return Values

$subsetreturn returns the most
recently retrieved occurrences of an entity to its operation entity parameter.

Values returned in $subsetreturn

| Value | Meaning |
| --- | --- |
| 0 | $subsetreturn is not enabled. |
| >0 | $subsetreturn is currently enabled. |

If an error occurs, $procerror
contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $subsetreturn

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |
| -1113 | <UPROCERR\_PARAMETER> | Parameter name not valid or not defined. |

## Use

Allowed in an operation with an entity parameter,
Entity, whose direction is OUT or INOUT. This operation can be in a form,
service, or report component

## Description

An entity parameter usually contains all
occurrences of that entity. However, $subsetreturn provides the entity
parameter, Entity, with only the most recently retrieved occurrences of
Entity. This is especially useful for, but not limited to, retrieving via
[retrieve/a](../procstatements/retrievea.md). Occurrences that are removed from the hitlist, or deleted from the
database are not returned.

## Return a Hitlist Using $subsetreturn

In this example $subsetreturn
is used to return a hitlist that includes all customers from the USA:

```procscript
operation GET_USA_CUSTOMERS
params
   entity CUSTOMER : OUT
endparams

creocc "CUSTOMER", 0
retrieve/a "CUSTOMER"
set $subsetreturn

end ; GET_USA_CUSTOMERS
```

## Related Topics

- [set](../procstatements/set.md)
- [reset](../procstatements/reset.md)
- [retrieve/a](../procstatements/retrievea.md)


---

# $syntax

Convert a string to a syntax string.

$syntax`(`String{`,` SyntaxMode`)` }

## Arguments

* String—string to convert to
  a syntax string
* SyntaxMode—syntax string
  mode to apply; one of:
  + `Classic` or
    `C` (default)
  + `CaseInsensitive`,
    `CI`, or `I`
  + `CaseSensitive`,
    `CS`, or `S`
  + `NlsLocale`,
    `NLS`, or `N`

## Return Values

Returns the syntax string if successful, or an
empty string if an error occurred. In this case, $procerror contains a negative
value that identifies the exact error.

Values of $procerror Commonly Returned Following
$syntax

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1013 | UPROCERR\_SYNTAXSTRING | Not a valid syntax string. |

## Use

Allowed in all Uniface component types.

## Description

A syntax string is a group of characters and
syntax codes enclosed in single quotation marks (`'`) that can be used to match a
string with the particular syntax pattern. For more information, see [Syntax Strings for Pattern Matching](../../proclanguage/constants/syntax_string_constants.md).

$syntax converts
String to a syntax string. Typically, the syntax string is then used in logical
expressions with the `=`, `==`, and `!=` operators to
check whether a string matches the specified syntax pattern. These are commonly used in conditional
Proc statements (such as if, repeat, or
while statements).

**Note:**  In a logical expression, the pattern specified
by the syntax string must occur within the first 256 characters of the string with which it is
being compared.

$syntax can also be used to
perform case-insensitive scans and comparisons when the string contains diacritics (for example, an
umlaut).

## Syntax Modes

Syntax modes determine how characters and syntax
codes are treated when performing a pattern-matching search.

Syntax String Modes

| Syntax String Mode | Meaning | Example | Resulting Syntax String | Matches |
| --- | --- | --- | --- | --- |
| `Classic`  `X` | The following characters in String are treated as syntax codes for pattern-matching: `#` `*` `&` `@` `~` `?` `(` `)` `%` `^`  This is the default, and corresponds to behavior prior to Uniface 9.4.01 | `$syntax("D&G")` | `'%[X]D&G'` | `DOG`, `DIG`, etc. |
| `CaseSensitive`  `CS`  `S` | Match only characters with the same case and treat syntax code characters as literals, not codes | `$syntax("D&G", CS)` | `'%[CS]D%&G%[X]'` | `D&G` |
| `CaseInSensitive`  `CI`  `I` | Match all characters irrespective of case, and treat syntax code characters as literals, not codes  Treat the characters that follow as case-insensitive. | `$syntax("D&G", CI)` | `'%[CI]D%&G%[X]'` | `D&G`, `d&g`, `D&g`, `d&G` |
| `NlsLocale`  `NLS`  `N` | Match all characters irrespective of case according to the locale, and treat syntax code characters as literals, not codes | `$syntax("i#B", NLS)` | `'%[NLS]i%#B%[X]'` | Depends on locale.  If $NlsLocale`= tr_TR`, matches: `i#B` and `İ#b`, but not `I#B` |

You can combine search modes in a syntax string.
For example:

`$syntax("[CI]D%&%[CS]G%[X] ")`
returns `D&G` and `d&G`.

## Matching Text Strings

The following example matches all text entered in
the current field that starts with "New":

```procscript
vString = "New*"
if (@$fieldname = $syntax(vString))
...
endif
```

## Matching Case

The following example matches all text that
contains one or more uppercase or lowercase letters:

```procscript
vMatch = "&&*"
if (NAME1 = $syntax(vMatch))
...
endif
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Added optional SyntaxMode parameter. |

## Related Topics

- [Syntax Strings for Pattern Matching](../../proclanguage/constants/syntax_string_constants.md)


---

# $sys\_charset

Set or return the value of $SYS\_CHARSET, which defines the
character set used to communicate with components that are not Unicode-based, such as C call-in and
call-out.

$sys\_charset `=`CharacterSet

Return `=` $sys\_charset

## Parameters

CharacterSet—character set
supported by both the operating system and Uniface; specified as a string, field (or indirect
reference to a field), variable, or function that evaluates to a string.

## Return Values

Returns the value of the
$SYS\_CHARSET assignment setting, or the character set selected during Uniface
installation (in the Character set selection screen).

## Use

Allowed in all Uniface component types.

## Description

The allowed values for
CharacterSet are listed in the following table.

Uniface-Supported Character Sets

| Character set | Description | Platform |
| --- | --- | --- |
| `CP1250` | Code page 1250 for Eastern European language | Windows |
| `CP1251` | Code page 1251 for Cyrillic language | Windows |
| `CP1252` | Code page 1252 for Western European language | Windows |
| `CP1253` | Code page 1253 for Greek | Windows |
| `CP1255` | Code page 1255 for Hebrew | Windows |
| `CP1256` | Code page 1256 for Arabic | Windows |
| `CP708` | Code page 708 (7-bit) for Arabic | Windows |
| `BIG5` | Traditional Chinese character set BIG5. | Windows, Unix |
| `GB`  (or `GB2312`) | Simplified Chinese character set GB2312-80 (code page 936) | Windows, Unix |
| `KSC`  (or `KSC5601`) | Korean character set KSC5601-1992 (code page 949) | Windows, Unix |
| `Shift-JIS` | Japanese character set Shift-JIS ( code page 932 and 943) | Windows, Unix |
| `EUC` | Japanese character set EUC | Unix |
| `LATIN1`  (or `DEC`) | ISO 8859-1 for Western European languages | Unix |
| `LATIN2` | ISO 8859-2 for Eastern European languages | Unix |
| `LATIN5` | ISO 8859-5 for Cyrillic languages | Unix |
| `LATIN6` | ISO 8859-6 for Arabic | Unix |
| `LATIN7` | ISO 8859-7 for Greek | Unix |
| `LATIN8` | ISO 8859-8 for Hebrew | Unix |
| `037` | CCSID for English | iSeries |
| `500` | CCSID for English without € | Multilingual iSeries |
| `870` | CCSID for Easter European languages | iSeries |
| `424` | CCSID for Hebrew | iSeries |
| `935` | CCSID for Simplified Chinese | iSeries |
| `933` | CCSID for Korean | iSeries |
| `930`On Japanese iSeries (AS/400) only: If your database contains data that was stored using code pages 930 or 939 prior to Uniface 9.4 with R116, use codepage 930B or 939B to retain the (incorrect) way the characters \, ¥ and ¢ are stored.In R116 and 9.5, code pages 930 and 939 were changed to correctly convert these characters. The old codepages have been renamed 930B and 939B for compatiblity. [1](javascript:void(0);) | CCSID for Japanese | iSeries |
| `939`1 | CCSID for Japanese | iSeries |
| `273` | CCSID for German/Austrian without € | iSeries |
| `1141` | CCSID for German/Austrian with € | iSeries |
| `280` | CCSID for Italian without € | iSeries |
| `1144` | CCSID for Italian with € | iSeries |
| `284` | CCSID for Spanish without € | iSeries |
| `1145` | CCSID for Spanish with € | iSeries |
| `297` | CCSID for French without € | iSeries |
| `1147` | CCSID for French with € | iSeries |
| `278` | CCSID for Finish/Swedish without € | iSeries |
| `1143` | CCSID for Finish/Swedish with € | iSeries |
| `AIX`  (or `IBMRT`) | IBM RT |  |
| `CP437`  (or `IBMPC`) | IBM PC code page 437, used in DOS programs |  |
| `CP850` | IBM PC code page 850 |  |
| `UTF8` | Unicode |  |

## Related Topics

- [$SYS_CHARSET](../../../configuration/reference/assignments/sys_charset.md)


---

# $tan

Return the tangent of X.

$tan`(`X`)`

## Parameters

X—angle in radians or a field
(or indirect reference to a field), a variable, or a function or expression which evaluates to an
angle in radians.

## Return Values

Tangent of X

If an error occurs ,
$procerror contains a negative value that identifies the exact error.

Values of $procerror Commonly Returned Following $tan

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1208 | <UPROCERR\_OVERFLOW> | Overflow. |

## Use

Allowed in all Uniface component types.

The following example returns the tangent of the
given expression:

```procscript
$tanPiR$ = $tan($pi() * RADIANS)
```

## Related Topics

- [$atan](atan.md)


---

# $text

Return the text of a message or help text.

$text`(`IDString`)`

## Parameters

IDString—message or help text
name; can be the literal name or a string that evaluates to the name.

## Return Values

* Text associated with the message
  IDString.
* Text of message 8006, if the message
  identified by IDString does not exist or cannot be found.

## Use

Allowed in all Uniface component types.

## Description

$text is commonly used to
access messages and help text in UAR files containing \msg\\*.msg files, in
uobj.dol, or in UOBJ.TEXT.

$text uses the current
language and library (in $language and $variation) to
retrieve the text. If a message or help text cannot be found with the current
$language and $variation, Uniface also looks for combinations
with language USA and library USYS.

You can use the function
$textexist to determine if a message or help text exists before requesting the
text with $text.

If $text is used in a
component that is run on a server, it is the developer's or deployment manager's responsibility to
ensure that the referenced texts are available in a UAR or DOL file.

## Displaying Help Text

The following example displays the string in the message HELPTEXT:

```procscript
; Help trigger
help/noborder $text(HELPTEXT),3,4,7,23
```

If you use a help message naming convention of
 *Fieldname* \_HLP, you can use the following Proc statement in the model definition of
the Help trigger for the field:

```procscript
help $text("%%$fieldname%%%_HLP")
```

(Of course, you should not use this Proc code in
the entity-level Help trigger, since $fieldname is only valid when used in
field-level triggers.)

If you are using a variable that holds
*IDString*, the value in the variable must be substituted in a string. You cannot use
the variable name directly. For example:

```procscript
$1 = "9004"
help $text("%%$1%%%")
```

## Related Topics

- [askmess](../procstatements/askmess.md)
- [message](../procstatements/message.md)
- [putmess](../procstatements/putmess.md)
- [$textexist](_textexist.md)
- [help](../procstatements/helpnative.md)
- [Help (Entity)](../triggersstandard/help.md)
- [Help (Field)](../triggersstandard/help2.md)


---

# $textexist

Return an indication of whether the specified message or help text exists.

$textexist`(`IDString`)`

## Parameters

IDString—message or help text
name; can be the literal name or a string that evaluates to the name.

## Return Values

* 1, if the message or help text identified by
  IDString exists.
* 0, otherwise.

## Use

Allowed in all Uniface component types.

## Description

The $textexist function
indicates whether the message or help text specified by IDString can be found in
UAR files containing \msg\\*.msg files, in uobj.dol, or in
UOBJ.TEXT. It is commonly used to determine if a message or help text exists before trying to
display it on a form, but it can be used in a report or service as well.

$textexist uses the current
language and library (in $language and $variation) to
retrieve the text. If a message or help text cannot be found with the current
$language and $variation, Uniface also looks for combinations
with language USA and library USYS.

## Initializing a Boilerplate Label Field

In the following example, the function $textexist is used to
initialize a boilerplate label field, ensuring that the 8006 message does not appear in the label:

```procscript
; initialize labels only when message exists

if ($textexist("%%$componentname%%%.LAB1"))
   LAB1/init = $text("%%$componentname%%%.LAB1")
else ; label not found, use default
   LAB1/init = "Default Label"
endif
```

## Related Topics

- [$text](_text.md)


---

# $totdbocc

Return the number of occurrences of the entity that have been retrieved from a
database.

$totdbocc {`(`Entity`)` }

## Parameters

*Entity* —entity name; can be a
literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
the current entity is used.

## Return Values

Values returned in $totdbocc

| Value | Meaning |
| --- | --- |
| "" | An error occurred. $procerror contains the exact error. |
| >0 | Total number of occurrences of the specified entity currently fetched from the database. |

Values of $procerror Commonly Returned Following $totdbocc

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

The following events affect the value of
$totdbocc:

* read adds 1 to
  $totdbocc
* discard reduces
  $totdbocc if a database occurrence is discarded
* clear sets
  $totdbocc to 0

The value of $totdbocc equals
$hits only when all the occurrences in the hitlist have been read.

## Calculating Entered but Unstored Occurrences

In the following example, the number of
occurrences in the component is compared with the number of occurrences in the database. If there
are more occurrences in the component, the ProcScript assumes that occurrences have been added to
the component structure. The number of database occurrences is subtracted from the number of
component occurrences, and the result is inserted into a message sent to the user:

```procscript
trigger detail
if ($totocc > $totdbocc)
   $1 = ($totocc - $totdbocc)
   message "%%$1 customer(s)%%% have been added"
endif
end; detail
```

## Related Topics

- [$curhits](_curhits.md)
- [$hits](_hits.md)
- [$totocc](_totocc.md)


---

# $totkeys

Return the total number of keys for an entity.

$totkeys { `(`Entity`)` }

## Parameters

Entity—entity name; can be a
literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
the current entity is used.

## Return Values

Values returned in $totkeys

| Value | Meaning |
| --- | --- |
| "" | An error occurred. $procerror contains the exact error. |
| >=1 | Total number of primary keys, candidate keys, and indexes. |

Values of $procerror Commonly Returned Following $totkeys

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Validating Keys in Batch Mode

The following example uses the
$totkeys function to validate primary and candidate keys in batch mode:

```procscript
$KEYNBR$ = 1
$MAXKEYS$ = $totkeys
while ($KEYNBR$ < $MAXKEYS$)
   if ($keytype($entname, $KEYNBR$) = "P" | $keytype($entname, $KEYNBR$) = "C")
      validatekey $entname, $KEYNBR$
   endif
   $KEYNBR$ = $KEYNBR + 1
endwhile
```

## Related Topics

- [validate](../procstatements/validate.md)
- [validatefield](../procstatements/validatefield.md)
- [validatekey](../procstatements/validatekey.md)
- [validateocc](../procstatements/validateocc.md)
- [$dataerrorcontext](_dataerrorcontext.md)
- [$keyfields](_keyfields.md)
- [$keymod](_keymod.md)
- [$keytype](_keytype.md)
- [$keyvalidation](_keyvalidation.md)


---

# $totlines

Return the total number of lines available on the page for printing.

$totlines

## Return Values

Values returned in $totlines

| Value | Meaning |
| --- | --- |
| 0 | Uniface is not printing ($printing = 0); $status is set to an empty string ("") |
| >0 | Total number of lines available for printing,  *excluding*  the header and trailer frames. Uniface is printing ($printing = 1) |

## Use

Allowed in form and report components
.

## Description

The $totlines function is a
useful way of logging how a report is formatted for print. For example, you might want to warn
users if their occurrence has spread over two pages. Another use for $totlines
is to calculate the current line number.

## Calculating the Current Line Number

The following example uses $totlines and $lines
to calculate the current line number:

```procscript
$1 = ($totlines - $lines)
```

## Checking if Entity Fits on Page

The following example uses
$totlines to check whether an entity can fit on a page, and prints a message if
it cannot fit on the page:

```procscript
; Leave Printed Occurrence trigger

if (($totlines - $framedepth) < 0)
   putmess "%%$entname%%% didn't fit on 1 page: see page %%$page%%%."
endif
```

## Related Topics

- [$lines](_lines.md)
- [$printing](_printing.md)
- [$framedepth](_framedepth.md)


---

# $totocc

Return the number of occurrences of an entity in the component.

$totocc {`(`Entity`)` }

## Parameters

*Entity* —entity name; can be a
literal name, string, variable, function, parameter, or indirect reference to a field. If omitted,
the current entity is used.

## Return Values

Values returned in $totocc

| Value | Meaning |
| --- | --- |
| "" | An error occurred. $procerror contains the exact error. |
| 1 | Component is empty (1 empty occurrence in the component).  Entity does not exist or is not drawn on the component. |
| >1 | Number of occurrences in the component. |

Values of $procerror Commonly Returned Following $totocc

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1102 | <UPROCERR\_ENTITY> | The entity name provided is not a valid name or the entity is not painted on the component. |

## Use

Allowed in all Uniface component types.

## Description

The following structure editor functions and
statements affect the value of $totocc:

* ^ADD\_OCC adds 1 to
  $totocc.
* ^INS\_OCC adds 1 to
  $totocc.
* ^REM\_OCC subtracts 1 from
  $totocc.
* read adds 1 to
  $totocc.
* discard reduces
  $totocc by the number of discarded occurrences.
* clear sets
  $totocc to 1.

Activity on a form that displays a single
occurrence of an entity affects the values returned by $totocc,
$totdbocc, $curhits, and $hits. For
example, after the form is started, the user enters a retrieve profile which matches exactly ten
occurrences in the database. ^NEXT\_OCC is used to scan through each of the retrieved occurrences,
perhaps making changes. After the last occurrence is reached, a new occurrence is added and all
changed occurrences are stored.

The following table illustrates the differences
between the values of $totocc, $totdbocc,
$curhits, and $hits.

Sequence of Values for $totocc, $totdbocc, $curhits, and $hits

| Activity | Value of $totocc | Value of $totdbocc | Value of $curhits | Value of $hits |
| --- | --- | --- | --- | --- |
| Form starts. | 1 | 0 | 0 | 0 |
| ^RETRIEVE | 1 | 1 | -10 | 10 |
| ^NEXT\_OCC | 2 | 2 | -10 | 10 |
| ^NEXT\_OCC | 3 | 3 | -10 | 10 |
| ... | | | | |
| ^NEXT\_OCC | 9 | 9 | -10 | 10 |
| ^NEXT\_OCC | 10 | 10 | -10 | 10 |
| ^NEXT\_OCC | 10 | 10 | 10 | 10 |
| Last occurrence message appears. | | | | |
| ^ADD\_OCC | 11 | 10 | 10 | 10 |
| ^STORE | 11 | 11 | 11 | 11 |

## Calculating Entered but Unstored Occurrences

In the following example, the number of
occurrences in the component is compared with the number of occurrences in the database. If there
are more occurrences in the component, the ProcScript assumes that occurrences have been added to
the component structure. The number of database occurrences is subtracted from the number of
component occurrences, and the result is inserted into a message sent to the user:

```procscript
trigger detail
if ($totocc > $totdbocc)
   $1 = ($totocc - $totdbocc)
   message "%%$1 customer(s)%%% have been added"
endif
end; detail
```

## Related Topics

- [$curhits](_curhits.md)
- [$curocc](_curocc.md)
- [$hits](_hits.md)
- [$totdbocc](_totdbocc.md)


---

# $typed

Explicitly convert data to a specified data type.

$typed`("`DataTypeConverter`(`Value`)``")`

$typed`("`Value`")`

```procscript
vBoolean = $typed("$boolean(01)") ; returns F: value is string and begins with 0
vNumber = $typed("$number(01)")   ; returns 1
vString = $typed("$string(01)")   ; returns 01
vString = $typed("01")            ; returns 01
```

## Parameters

* DataTypeConverter—defines
  the target data type to be used when converting the value. One of `$boolean`,
  `$clock`, `$date`, `$datim`, `$float`,
  `Snumber`, `$string`, `$syntax`. If omitted,
  `$string` is assumed.
* Value—data to be
  converted.

## Return Values

Converted data.

## Use

Allowed in all Uniface component types.

## Description

The $typed function is used to
ensure that data values are interpreted as being of a specific data type. For many data types,
there is an explicit Proc function that can be used to perform this conversion. However, for data
types String, Float, and Boolean, the only way to enforce this conversion is using the
$typed function.

Data Type Conversion Functions

| Using $typed | Type-specific Proc Function | Returns |
| --- | --- | --- |
| $typed`("$boolean(`Value`)")` |  | Boolean |
| $typed`("$clock(`Value`)")` | `$clock(`Value`)` | Time type |
| $typed`("$date(`Value`)")` | `$date(`Value`)` | Date type |
| $typed`("$datim(`Value`)")` | `$datim(`Value`)` | DateTime type |
| $typed`("$float(`Value`)")` |  | Float type |
| $typed`("$number(`Value`)")` | `$number(`Value`)` | Number type |
| $typed`("$string(`Value`)")` | Although there is a $string Proc function, it is used to convert XML entities to strings, not to convert data to String. | Constant string type |
| $typed`("$syntax(`Value`)")` | `$syntax(`Value`)` | Syntax string type |

The $typed function (and other
data type conversion functions) can be used to construct typed lists for use in passing lists of
parameters. For example, the activate/list command requires a typed list of
parameters.

## $string

The `$string` converter used in
$typed should not be confused with $string Proc function.
They have a different purpose and different syntax:

| Proc | Returns | Explanation |
| --- | --- | --- |
| $string`("A &amp; B")` | `"A & B"` | The parameter is a string that contains an XML entity `&amp;`, which the $string Proc function converts to an ampersand (&). |
| `$typed($string("A &amp; B"))` | `"A & B"` | The parameter is the $string Proc function, which converts the XML entity. |
| `$typed("$string(A &amp; B)")` | `"A &amp; B"` | The parameter is a string containing the `$string` converter. It does not convert the XML entity, and just returns the literal string. |
| `$typed("A &amp; B")` | `"A &amp; B"` | The parameter is a string, so the default `$string` converter is assumed. |

## Typed List

For example, the following code generates a list
with different values for `012345` depending on the data type:

```procscript
variables
  string vList
endvariables

putitem vList, -1, $typed("$string(012345)")
putitem vList, -1, $typed("$boolean(012345)")  ; start with 0 yields F
putitem vList, -1, $typed("$boolean(12345)")   ; start with any other character yields T
putitem vList, -1, $typed("$float(012345)")
putitem vList, -1, $number(012345)
putitem vList, -1, $date(12-3-45)              ; requires valid input string
putitem vList, -1, $clock(012345)

;Result: vList = 012345;F;T;12345;12345;20450312;0000000001234500
```

---

# $ude

Perform actions on Repository data, including compiling, exporting, importing, and
converting.

$ude
`(`Operation`,` Argument1`,` Argument2`,` Argument3 {`,` OptionList}
`)`

## Arguments

* Operation—action to
  perform; one of:

  + `"compile"`—see
    [$ude compile](_ude_compile.md)
  + `"copy"`—see
    [$ude copy](_ude_copy.md)
  + `"delete"`—see
    [$ude delete](_ude_delete.md)
  + `"exist"`—see
    [$ude exist](_ude_exist.md)
  + `"export"`—see
    [$ude export](_ude_export.md)
  + `"getReferenceList"`—see
    [$ude getReferenceList](_ude_getreferencelist.md)
  + `"import" "misc"`—see
    [$ude import](_ude_import.md)
  + `"import"
    "symboltable"`—see
    [$ude import symboltable](_ude_import_symboltable.md)
  + `"load"`—see
    [$ude load](_ude_load.md)
* Argument1-3—operation-specific
  arguments.
* OptionList—associative list
  containing one or more options that are appropriate to the Operation

## Return Values

Values returned by $ude and entitycopy

| Value | Description |
| --- | --- |
| >=0 | Success. Number of records where an attempt was made to process them. Detailed information is returned in [$procReturnContext](_procreturncontext.md). |
| <0 | An error occurred. [$procerror](_procerror.md) contains the exact error and [$procerrorcontext](_procerrorcontext.md) provides the details. |
| 8066 | 8066- Copy failed: Open error on input file/table.  This error can occur when no entity descriptors cannot be found. |

Possible Values of $procerror Returned Following $ude

| Value | Error Constant | Meaning |
| --- | --- | --- |
| -1 through -25 | Various | Database I/O and network communication errors. For more information, see [$procerror](_procerror.md). |
| -9 | UIOSERR\_LOGON\_ERROR | DBMS logon error; for example, the maximum number of DBMS logons has already been reached. |
| -1700 | UDEERR\_UDE\_NOT\_AVAILABLE | Function is not available at runtime |
| -1701 | UDEERR\_OPERATION | Invalid operation name  Occurs when the first argument of the $ude function is incorrect. |
| -1702 | UDEERR\_OPERATION\_NOT\_ALLOWED | Operation not allowed in combination with Object  Occurs when the first argument of the $ude function is incorrect. |
| -1703 | UDEERR\_OBJECTTYPE | Invalid ObjectType  Occurs when the second argument of the $ude function is incorrect. |
| -1704 | UDEERR\_OBJECTTYPE\_NOT\_ALLOWED | ObjectType is not supported  Occurs when the second argument of the $ude function is incorrect. |
| -1706 | UDEERR\_COMPILE | Failed to compile |
| -1715 | UDEERR\_TEMPLATE | Failed to find @Template |
| -1717 | UDEERR\_OPERAND | Invalid operand |
| -1718 | UDEERR\_COPY | Invalid copy / import / export  Occurs when the copy, import, or export operation failed. |
| -1720 | UDEERR\_GENERAL | Failed to process |

Errors from `-1` through
`-15` do not stop `copy`, `import`, or
`export` processing, with the exception of error `-9
<UIOSERR_LOGON_ERROR>`.

Items Returned by $procreturncontext after $ude

| Item | Description | `UDE Copy` | `UDE Import` | `UDE Export` | `UDE Compile` |
| --- | --- | --- | --- | --- | --- |
| `Context``=`Context | Context of the information. Can have the value `EntityCopy`, `UDE Copy`, `UDE Import`, `UDE Export`, or `UDE Compile`. | X | X | X | X |
| `InputRecords``=`Number | Records to be copied, exported, or imported. | X | X | X |  |
| `OutputRecords``=`Number | Records actually written. | X | X | X |  |
| `SkippedRecords``=`Number | Records not written due to map file entity mapping to `<void>` | X | X | X |  |
| `WriteErrorsContinues``=`Number | Write errors encountered that did not stop the copy action. | X | X | X |  |
| `InputDescriptors=Number` | Descriptors to be copied, exported, or imported. The same descriptor can occur more than once. | X | X | X |  |
| `OutputDescriptors``=`Number | Signatures actually written. This can be less than the number of `InputDescriptors` if void mappings are encountered. | X | X | X |  |
| `SkippedDescriptors` | Entities mapped to `<void>` | X | X | X |  |
| `InputTrxFiles``=`Number | TRX files to copy, if a wildcard was specified. | X | X |  |  |
| `InputXmlFiles``=`Number | XML files to copy, if a wildcard was specified. | X | X |  |  |
| `InputSignatures``=`Number | Signatures found for compilation |  |  |  | X |
| `OutputSignatures``=`Number | Signatures compiled |  |  |  | X |
| `InputComponents``=`Number | Components found for compilation |  |  |  | X |
| `OutputComponents``=`Number | Components compiled |  |  |  | X |
| `InputApplications``=`Number | Applications found for compilation |  |  |  | X |
| `OutputApplications``=`Number | Applications compiled |  |  |  | X |
| `InputModels``=`Number | Models found for compilation |  |  |  | X |
| `OutputModels``=`Number | Models compiled |  |  |  | X |
| `InputDescriptors``=`Number | Entities found for compilation |  |  |  | X |
| `OutputDescriptors``=`Number | Entities compiled |  |  |  | X |
| `InputLibraryItems``=`Number | Library items found for compilation, such as menus, glyphs, global Proc |  |  |  | X |
| `OutputLibraryItems``=`Number | Library items compiled |  |  |  | X |
| `Infos``=`Number | Number of information messages generated during compilation |  |  |  | X |
| `Warnings``=`Number | Number of warning messages generated during compilation |  |  |  | X |
| `Errors``=`Number | Number of error messages generated during compilation |  |  |  | X |
| `Release``=`ReleaseNumber | Uniface release of the source data. | X | X | X | X |
| `DETAILS``=`String | Messages, warnings, and errors encountered during processing, structured as a list. | X | X | X | X |

## Use

$ude requires a fully
configured Repository to be available.

Allowed in form, report, and server page
components (and in service components that are not self-contained)

## Description

The $ude function enables you
to create components that support your own development processes, for example, in automating
exports and backups, managing sources, compiling and building applications, and so on.

**Note:**  The $ude function can only be
used in the Development Environment (idf.exe) on Windows.

## Processing Information and Error Handling

$ude is usually used as a batch
processing function, so it is possible for errors to occur either in executing
$ude itself, or while processing an operation that it invokes. For example, if
you specify an import file that does not exist, $ude itself returns an error
-1718.

However, if $ude returns 0,
this indicates the $ude executed successfully, but does not indicate that the
operation itself succeeded. For example, the following instructions could all result in 0 being
returned, but the reasons may vary:

* ```procscript
  $return$ = $ude("import", "misc", "myexport.xml","","supersede=false,"")
  ```

  Returns `0` if the contents of
  myexport.xml are already in the Repository.
* ```procscript
  $return$ = $ude("export", "component", "myf*","")
  ```

  Returns `0` if no components
  matched the profile.
* ```procscript
  $return$ = $ude("compile", "form", "my*","")
  ```

  Returns `0` if the forms
  matching the profile were compiled, but also if no forms were compiled.

To get more detail about the actual processing,
examine the information returned in $procreturncontext.

For example, if $ude("compile")
successfully compiled the forms, $procreturncontext returns the following
(formatted for readablity):

```procscript
Context=UDE compile;
InputComponents=2;
OutputComponents=1;
Infos=32;
Warnings=2;
Errors=1;
Details=
 ID=1016!!;
  MESSAGE=(Fields for) entity DEBUG not found in application model, generating now...!!;
  SEVERITY=Warning!;
 ID=1301!!;
  MESSAGE=Component variable "LNR" is not referenced in the component.!!;
  SEVERITY=Info!;
```

However, if $ude("compile")
executed successfully but no forms were compiled, $procreturncontext returns the
following:

```procscript
Context=UDE Compile
```

This could be because no forms matched the
profile.

History

| Version | Change |
| --- | --- |
| 9.1.01 | Introduced |
| 9.3.01 | Added actions: `"delete"`, `"exist"`, `"load"`, `"getreferencelist"`, and `"import" "symboltable"` |
| 9.5.01 | The option `prcadditional=true` no longer has any effect. |

## Related Topics

- [$procReturnContext](_procreturncontext.md)
- [/cpy](../../../_reference/commandlineswitches/cpy.md)
- [Data Export, Import, and Conversion](../../../developmentadmin/dataexchange/concepts/exporting_and_importing.md)
- [$RESOURCES_OUTPUT](../../../configuration/reference/assignments/_resource_output.md)


---

# $ude compile

Compile development objects in the Repository.

$ude`("compile",`ObjectType`,` ObjectProfile
{`,"",`OptionList} `)`

## Arguments

* ObjectType—list of
  development object types. See
  [Object Types](#section_64F7636784CBD8D1882979772D58F76D).
* ObjectProfile—string
  specifying an object name or retrieve profile for one or more objects of type
  ObjectType
* OptionList—associative list
  containing one or more options that are appropriate to the operation or the
  ObjectType. See
  [Option List](#section_82984A54B2FFA34166C34837FCF2733C).

Arguments can also be a field, variable, or
function that evaluates to a string or list.

## Return Values

Values returned by $ude and entitycopy

| Value | Description |
| --- | --- |
| >=0 | Success. Number of records where an attempt was made to process them. Detailed information is returned in [$procReturnContext](_procreturncontext.md). |
| <0 | An error occurred. [$procerror](_procerror.md) contains the exact error and [$procerrorcontext](_procerrorcontext.md) provides the details. |
| 8066 | 8066- Copy failed: Open error on input file/table.  This error can occur when no entity descriptors cannot be found. |

Items Returned by $procreturncontext 

Items are omitted if their value is zero or an
empty string.

| Item | Description |
| --- | --- |
| `Context``=`Context | Context of the information. For $ude("compile"), the value is `UDE Compile`. |
| `Error``=`Number | Error number if process failed on error |
| `InputSignatures``=`Number | Signatures found for compilation |
| `OutputSignatures``=`Number | Signatures compiled |
| `InputComponents``=`Number | Components found for compilation |
| `OutputComponents``=`Number | Components compiled |
| `InputApplications``=`Number | Applications found for compilation |
| `OutputApplications``=`Number | Applications compiled |
| `InputModels``=`Number | Models found for compilation |
| `OutputModels``=`Number | Models compiled |
| `InputDescriptors``=`Number | Entities found for compilation |
| `OutputDescriptors``=`Number | Entities compiled |
| `InputLibraryItems``=`Number | Library items found for compilation, such as menus, glyphs, global Proc |
| `OutputLibraryItems``=`Number | Library items compiled |
| `Infos``=`Number | Information messages generated during compilation |
| `Warnings``=`Number | Warning messages generated during compilation |
| `Errors``=`Number | Error messages generated during compilation |
| `Release``=`ReleaseNumber | Number of the Uniface release of the source data. |
| `DETAILS``=`String | Messages, warnings, and errors encountered during processing, structured as a list. |

## Object Types

When using $ude to compile
objects, you must specify the development objects, providing the object type and profile. Use GOLD
`;` in specifying specific types of objects. Depending on the object type, you can
also specify additional options.

The following object types are supported by
$ude("compile"):

* `signature`
* `component`
* {`component;`}`form`
* {`component;`}`report`
* {`component;`}`dynamic_server_page`
* {`component;`}`server_page`
* {`component;`}`service`
* {`component;`}`entity_service`
* {`component;`}`session_service`
* `application`
* `dtd`
* `model`
* `library`
* {`library;`}`variables`
* {`library;`}`proc`
* {`library;`}`device_table`
* {`library;`}`translation_table`
* {`library;`}`panel`
* {`library;`}`message`
* {`library;`}`glyph`
* {`library;`}`format`
* {`library;`}`menu`

For `variables` it is not possible
to specify individual variables with the ObjectProfile The
ObjectProfile is ignored, and all variables are compiled for the specified
library (or for all libraries if no library was specified).

## Option List

The OptionList enables you to
influence how the operation works. It is an associative list containing at least one option and
value. Use GOLD `;` in specifying multiple options.

For example, the following command compiles all
menus starting with `F` in the MyLib library:

```procscript
$result = $ude ("compile", "menu", "F*", "", "library=MyLib")
```

Options

| Option | Description |
| --- | --- |
| `library=`LibraryName | Compiles the objects in the given library; supported only for global objects:  ObjectType = `variables` | `proc` | `menu` | `panel` | `message` |`format` | `glyph` | `translation_table` | `device_table` |
| `language=`Language | Compiles language-independent objects (variables, Proc, tables, and panels), plus the language-dependent objects (menus, messages, glyphs, and formats) that match the specified language. Supported only for global objects:  ObjectType = `menu` | `message` | `glyph` | `format` |

If ObjectType does not specify
a global object, the `library` and `language` options are
ignored.

Supported Profile and Options for Global Objects

| ObjectType | ObjectProfile | OptionList | |
| --- | --- | --- | --- |
| `language` | `library` |
| `library` | Y | Y | Y |
| `variables` | – | – | Y |
| `proc` | Y | – | Y |
| `device_table` | Y | – | Y |
| `translation_table` | Y | – | Y |
| `panel` | Y | – | Y |
| `menu` | Y | Y | Y |
| `message` | Y | Y | Y |
| `glyph` | Y | Y | Y |
| `format` | Y | Y | Y |

Specifying the ObjectType as
`library` is the same as specifying all global objects. You can use the
`library` and language options to restrict compilation to a
specific library or to a specific language.

## Compiling Entities

The following instruction analyzes (compiles) a
single entity and generates and entity descriptor file (.edc).

```procscript
$result = $ude ("compile" ,"model" , "Entity.Model" ,"")
```

The following instruction compiles all entities in
MYMODEL:

```procscript
$result = $ude ("compile" ,"model" , "*.MYMODEL" ,"")
```

## Compiling Components

The following instruction compiles all components
beginning with `my`:

```procscript
$result = $ude("compile", "component", "my*")
```

For example, this returns `0` in
$result and the following in $procreturncontext:

```procscript
Context=UDE Compile·;
InputComponents=4·;
OutputComponents=4·;
Infos=5·;
Warnings=19·;
Details=
 ID=1016·!·!·;
  MESSAGE=(Fields for) entity ENTITYEX not found in application model, generating now...·!·!·;
  SEVERITY=Warning·!·;
 ID=1043·!·!·;
  MESSAGE=Field CAL assumed maximum length of 40.·!·!·;
  SEVERITY=Warning·!·;
 ID=1043·!·!·;
  MESSAGE=Field SELDATE assumed maximum length of 40.·!·!·;
  SEVERITY=Warning·!·;
 ID=1016·!·!·;
  MESSAGE=(Fields for) entity BTNS not found in application model, generating now...·!·!·; 
  SEVERITY=Warning·!·;

...
```

## Compiling Libraries and Global Objects

Compile all global objects in all libraries:

```procscript
$result = $ude ("compile", "library")
```

Compile all global objects in the MyLib
library:

```procscript
$result = $ude ("compile", "library", "", "*", "library=MyLib")
```

Compile all menus in the MyLib library:

```procscript
$result = $ude ("compile", "menu", "", "", "library=MyLib")
```

Compile all French-language messages and help
texts in all libraries (`language=FRA`):

```procscript
$result = $ude ("compile", "message", "", "", "language=FRA")
```

Compile all File menus, in all libraries:

```procscript
$result = $ude ("compile", "menu", "file")
```

## Compiling DTDs

```procscript
$result = $ude("compile", "DTD", "myEntity", "", "model=myModel")
```

## Related Topics

- [$ude](_ude.md)
- [Lists and Sublists](../../lists/lists_of_items.md)


---

# $ude copy

Copy or convert data from one format to another.

$ude`("copy","misc",`Source`,` Target
{`,` OptionList} `)`

## Arguments

* Source—database path and
  entity, or an XML file, to be copied or converted, using the following syntax:

  + Database object:
    Path`:`Entity`.`Model

    Either or both of
    Entity and Model can contain wildcards, for example
    `DEF:ENT*.MOD*`.
  + Filename—string
    specifying the name of a Uniface XML file, for example `myxmlfile.xml`
  + ZipArchive—optional
    name of a zip archive to contain one or more XML files, for example `ziparchive.zip`
    (the full string would be `ziparchive.zip:myxmlfile.xml`)

    When a ZipArchive is
    specified, it is created in the Zip64 format.
  + Uniface 8 TRX file:
    `trx:`Filename
* Target—destination database
  path or an XML file to be converted, using the following syntax:

  + Database object:
    Path`:`

    Entity and/or model names following the
    path are ignored
  + FileName—a target XML
    file; see FileName, as defined above.
  + ZipArchive—optional
    target zip archive; see ZipArchive, as defined above.
* OptionList—associative list
  containing one or more options that are appropriate to the operation or the
  ObjectType. See
  [Option List](#section_7861A8F9F715B6C526B6912B7B542231).

Arguments can also be a field, variable, or
function that evaluates to a string or list.

## Return Values

$ude returns the number of
records where an attempt was made to process them. This may differ from what is expected.

Values returned by $ude and entitycopy

| Value | Description |
| --- | --- |
| >=0 | Success. Number of records where an attempt was made to process them. Detailed information is returned in [$procReturnContext](_procreturncontext.md). |
| <0 | An error occurred. [$procerror](_procerror.md) contains the exact error and [$procerrorcontext](_procerrorcontext.md) provides the details. |
| 8066 | 8066- Copy failed: Open error on input file/table.  This error can occur when no entity descriptors cannot be found. |

Errors from `-1` through
`-15` do not stop $ude processing, with the exception of error
`-9 <UIOSERR_LOGON_ERROR>`. The number of ignored errors is returned in
$procreturncontext, along with additional information, such as the Uniface
release number of the source data, the number of input and output records processed, and messages,
warnings, and errors encountered during processing.

## Results

Items Returned by $procreturncontext 

Items are omitted if their value is zero or an
empty string.

| Item | Description |
| --- | --- |
| `Context``=`Context | Context of the information. For $ude ("copy"), the value is `UDE Copy`. |
| `InputRecords``=`Number | Records to be copied. |
| `OutputRecords``=`Number | Records written. |
| `SkippedRecords``=`Number | Records not written due to map file entity mapping to `<void>` |
| `WriteErrorsContinues``=`Number | Write errors encountered that did not stop the import action. |
| `InputDescriptors=Number` | Descriptors to be imported. The same descriptor can occur more than once. |
| `OutputDescriptors``=`Number | Signatures actually output. This can be less than the number of `InputDescriptors` if void mappings are encountered. |
| `SkippedDescriptors` | Entities mapped to `<void>` |
| `InputTrxFiles``=`Number | TRX files to copy, if a wildcard was specified. |
| `InputXmlFiles``=`Number | XML files to copy, if a wildcard was specified. |
| `DETAILS``=`String | Messages, warnings, and errors encountered during processing, structured as a list. |

## Description

The functionality provided by $ude
("copy") is comparable to that provided by the /cpy command line
switch.

If the Source is a database path and entity,
analyze the application model that contains the entity definitions. This is required to ensure entity descriptors are
generated as .edc files. If entity descriptors are missing for the entity, the
copy action will fail with message

```procscript
8066 - Copy failed: Open error on input file/table Source
```

.

## Option List

The OptionList enables you to
influence how the operation works. For example you can specify a map file, or select occurrences
that have specific field values when converting data. The OptionList is an
associative list containing at least one option and value. Use GOLD `;` in
specifying multiple options.

Options

| Option | Description |
| --- | --- |
| `append=``True` | `False` | Append the objects or data to an existing XML file. The XML file may be located within a zip archive. |
| `keepopen=``True` | `False` | Keep an XML file open in preparation for appending more data.  By default, `copy` flushes and closes the file each time. However, to improve performance in cases when appending to a file, use this option to keep the file open.  If you set this option to `True`, you must explicitly flush and close the file using flush or lflush. |
| `sort=``True` | `False` | Copy the output in primary key order. If this is set to `False`, depending on the database used, the order in the export file can differ in repeated exports, even if nothing has changed |
| `map=`MapFile | `#`{Entity|TargetEntity=SourceEntity} | Use mapping functionality to determine how data is copied from existing entity and field definitions to new model definitions.  For the following, it is not necessary to specify a MapFile:  `#`—use Target Repository definitions to map all entities  `#`Entity—use Target Repository definitions to map the specified entity  `#`TargetEntity`=`SourceEntity—use Target Repository definitions to map a source entity to a target entity |
| `tran=`TranslationTable | Use the specified database translation table for converting the data.  A database translation table is a keyboard translation table that is used to convert character strings during database input or output. |
| `where=`SelectClause | Copy selected occurrences. The SelectClause has the following syntax:  Field1 Operator ObjectSpec 1{;Field n Operator ObjectSpecn} {`"`}   * Field—name of a   field in the source entity. * Operator—logical   operator preceded by GOLD, for example GOLD = ( = ) or GOLD > GOLD = (   >= ). * ObjectSpec—string   specifying the retrieve profile for objects to be copied. Use the subfield separator GOLD ! GOLD ;   ( !; ) to specify multiple conditions.   For more information, see [/whr](../../../_reference/commandlineswitches/commandlinesubswitches/_whr.md). |
| `supersede=``True` | `False` | Indicate whether to overwrite existing occurrences having matching primary keys in the target DBMS.  `True`—overwrite occurrences. Default.  `False`—keep original data. |
| `printinterval=`Number | Frequency with which a message is displayed, expressed as a number of occurrences. |
| `commitinterval=`Number | Frequency with which data is stored in the database, expressed as the number of occurrences. |
| `library=`LibraryName | Specifies the library containing the TranslationTable  is located, if `tran` is specified. |

## Converting Data Using the Map Option

By default, when copying or importing from an XML
file, the entity descriptors in the source XML file are used. However, if you specify the
`map=#` option, the entity descriptors in the Repository are used instead. For
example, if you want to change the syntax definition of a field to use the W packing code instead
of the C packing code, you can export the data, change the syntax definition, then import the data
specifying `map=#` to have it use the new definition.

## Converting Data

The following instructions convert data via the
default path from the default Repository to an XML file and to an XML file in a zip archive.

```procscript
$1 = $ude("copy", "misc", "def:myent.mymodel", "myexportfile.xml")
$2 = $ude("copy", "misc", "def:myent.mymodel", "myzip.zip:myexportfile.xml")
```

The following instruction converts the contents of
an XML file to the database via the default path:

```procscript
$1 = $ude("copy", "misc", "myexportfile.xml", "def:")
```

## Related Topics

- [entitycopy](../procstatements/entitycopy.md)
- [flush](../procstatements/flush.md)
- [lflush](../procstatements/lflush.md)
- [$ude import](_ude_import.md)
- [$ude export](_ude_export.md)
- [$ude compile](_ude_compile.md)
- [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md)
- [Lists and Sublists](../../lists/lists_of_items.md)
- [Zip Files](../../../developmentadmin/dataexchange/concepts/zipfilesupport.md)


---

# $ude delete

Delete a symbol table or Proc listing, or a runtime object on the $RSO
path.

$ude`(``"delete"``,``"`Type`;`ObjectType`"``,` ObjectName`, ""` {`,` OptionList} `)`

## Arguments

* Type—type of information;
  one of `resources_output`, `symbolTable`, or
  `listing`
* ObjectType—compiled object
  type; if it is a global object, the library and language must be specified in the
  Options. For the object syntax, see
  [Object Types](#section_2AB240F75FE6409C4E186B9751946073).
* ObjectName—string
  specifying an object name or retrieve profile for one or more objects of type
  ObjectType
* OptionList—associative list
  containing one or more options that are appropriate to the ObjectType. See
  [Option List](#section_32A9DC490B42383D17B84005FAA3633C).

## Return Values

Values Returned by $ude ("delete")

| Value | Description |
| --- | --- |
| 1 | Success. |
| 0 | Specified object does not exist. |
| <0 | An error occurred. [$procerror](_procerror.md) contains the exact error and [$procerrorcontext](_procerrorcontext.md) provides the details. |

## Description

Use $ude ("delete") to delete a
runtime object, symbol table, or Proc listing.

## Object Types

Depending on the object type, you can also specify
additional options.

Supported Object Types

| Object Type | Syntax | Applies To | | |
| --- | --- | --- | --- | --- |
| symboltable | listing | resources\_output |
| Startup shells | `application` | X | X | X |
| Signatures | `signature` |  |  | X |
| Components | `component` | X | X | -- |
|  | `dynamic_server_page` | X | X | X |
|  | `server_page` | X | X | X |
|  | `form` | X | X | X |
|  | `report` | X | X | X |
|  | `service` | X | X | X |
|  | `entity_service` | X | X | X |
|  | `session_service` | X | X | X |
| Global variables | `variables` |  |  | X |
| Global Proc | `proc` | X | X | X |
| Menus, menu bars, and menu items | `menu` | X | X | X |
| Panels | `panel` | X |  | X |
| Messages and help texts | `message` |  |  | X |
| Glyphs | `glyph` |  |  | X |
| Drag and drop formats | `format` |  |  | X |
| Entity descriptor | `entity_descriptor` |  |  | X |
| DTD | `dtd` |  |  | X |
| Device translation table | `device_table` |  |  | X |
| Translation tables | `translation_table` |  |  | X |

## Option List

If the ObjectType is a global
object, you must also specify the language and library (and class for a glyph). Use GOLD
`;` when specifying multiple options.

Options

| Option | Description |
| --- | --- |
| `library=`LibraryName | Mandatory if ObjectType is a global object. |
| `language=`Language | Mandatory if ObjectType is `message` | `glyph` | `format` | `menu` |
| `class=`Class | Mandatory if ObjectType is `glyph`. Specifies the size and GUI platform. |
| `model=`EntityModel | Specify the model if ObjectType is `entity_descriptor`. |

## Deleting a Form from the $RSO Path

```procscript
$result$  = $ude("delete", "resources_output;component;form", "MY_FORM")
```

History

| Version | Change |
| --- | --- |
| 9.3.01 | Introduced |

## Related Topics

- [$ude](_ude.md)
- [Lists and Sublists](../../lists/lists_of_items.md)
- [Resources Output Path ($RSO)](../../../howunifaceworks/compilation/compiledobjectsstorage.md)
- [Symbol Tables](../../../developmentadmin/crossreference/concepts/symboltables.md)


---

# $ude exist

Check whether a runtime object, symbol table, or Proc listing exists.

$ude`(``"exist"``,``"`Type`;`ObjectType`"``,` ObjectName`, ""` {`,` OptionList} `)`

## Arguments

* Type—type of information;
  one of :

  `resources_output` to check for compiled runtime objects

  `symbolTable` to check for symbol tables

  `listing` to check for Proc listings
* ObjectType—type of
  development or runtime object. See
  [Object Types](#section_E2D945B7C8133F8FCF4C5318755CDFC7).
* ObjectName—string
  specifying an object name
* OptionList—associative list
  containing one or more options that are appropriate to the operation or the
  ObjectType. See
  [Option List](#section_4C02CE7CF59AF0850A0C415F877A6E1C).

## Return Values

Values Returned by $ude ("exist")

| Value | Description |
| --- | --- |
| 1 | Specified object exists. For runtime objects checked by `resources_output`, the file properties are returned as a Uniface list in $procreturncontext. |
| 0 | Specified object does not exist. |

If $status returns <0, an
error occurred. $procerror contains the exact error and
$procerrorcontext provides the details.

## Description

Use $ude ("exist") to check
whether an object, symbol table, or Proc listing exists.

## Object Types

Use GOLD separators in specifying specific types
of runtime objects. Depending on the object type, you may need to specify additional options.

Supported Object Types

| Object Type | Syntax | Applies To | | |
| --- | --- | --- | --- | --- |
| symboltable | listing | resources\_output |
| Startup shells | `application` | X | X | X |
| Signatures | `signature` |  |  | X |
| Components | `component` | X | X | -- |
|  | `dynamic_server_page` | X | X | X |
|  | `server_page` | X | X | X |
|  | `form` | X | X | X |
|  | `report` | X | X | X |
|  | `service` | X | X | X |
|  | `entity_service` | X | X | X |
|  | `session_service` | X | X | X |
| Global variables | `variables` |  |  | X |
| Global Proc | `proc` | X | X | X |
| Menus, menu bars, and menu items | `menu` | X | X | X |
| Panels | `panel` | X |  | X |
| Messages and help texts | `message` |  |  | X |
| Glyphs | `glyph` |  |  | X |
| Drag and drop formats | `format` |  |  | X |
| Entity descriptor | `entity_descriptor` |  |  | X |
| DTD | `dtd` |  |  | X |
| Device translation table | `device_table` |  |  | X |
| Translation tables | `translation_table` |  |  | X |

## Option List

If the ObjectType is a global
object, you must also specify the language and library (and class for a glyph). Use GOLD
`;` when specifying multiple options.

Options

| Option | Description |
| --- | --- |
| `library=`LibraryName | Mandatory if ObjectType is a global object. |
| `language=`Language | Mandatory if ObjectType is `message` | `glyph` | `format` | `menu` |
| `class=`Class | Mandatory if ObjectType is `glyph`. Specifies the size and GUI platform. |
| `model=`EntityModel | Specify the model if ObjectType is `entity_descriptor`. |

## Check the Existence of Global Objects

When checking for global objects, you must specify
the library, as well as the language for menus, messages, glyphs, and drag-and-drop formats. For
example:

```procscript
$Returnal$=$ude("exist","symboltable;panel", "menu1","","library=MyLib")
$Return$=$ude("exist","listing;proc", "menu1","","library=MyLib")
$Return$=$ude("exist","resources_output;menu", "menu1","","library=MyLib;language=usa")
```

History

| Version | Change |
| --- | --- |
| 9.3.01 | Introduced |

## Related Topics

- [$ude](_ude.md)
- [Lists and Sublists](../../lists/lists_of_items.md)
- [Resources Output Path ($RSO)](../../../howunifaceworks/compilation/compiledobjectsstorage.md)


---

# $ude export

Export data from the Repository.

$ude`("export",`ObjectType`,` ObjectProfile`,`{ZipArchive`:`}Filename
{`,` OptionList} `)`

## Arguments

* ObjectType—list of
  development object types. For more information, see [Object Types](#section_D129EA58008A55AA7E46644FD36618DE)..
* ObjectProfile—string
  specifying an object name or retrieve profile for one or more objects of type
  ObjectType
* ZipArchive—optional name of
  a zip archive to contain one or more XML files, for example `ziparchive.zip` (the
  full string would be `ziparchive.zip:myxmlfile.xml`)

  When a ZipArchive is
  specified, it is created in the Zip64 format.
* Filename—string specifying
  the name of a Uniface XML file, for example `myxmlfile.xml`
* OptionList—associative list
  containing one or more options that are appropriate to the ObjectType.
  For more information, see [Option List](#section_89022AE5593400C606282274580C944F)..

Arguments can also be a field, variable, or
function that evaluates to a string or list.

## Return Values

$ude returns the number of
records where an attempt was made to process them. This may differ from what is expected.

Values returned by $ude and entitycopy

| Value | Description |
| --- | --- |
| >=0 | Success. Number of records where an attempt was made to process them. Detailed information is returned in [$procReturnContext](_procreturncontext.md). |
| <0 | An error occurred. [$procerror](_procerror.md) contains the exact error and [$procerrorcontext](_procerrorcontext.md) provides the details. |
| 8066 | 8066- Copy failed: Open error on input file/table.  This error can occur when no entity descriptors cannot be found. |

Errors from `-1` through
`-15` do not stop $ude processing, with the exception of error
`-9 <UIOSERR_LOGON_ERROR>`. The number of ignored errors is returned in
$procreturncontext, along with additional information, such as the Uniface
release number of the source data, the number of input and output records processed, and messages,
warnings, and errors encountered during processing.

## Results

Items Returned by $procreturncontext 

Items are omitted if their value is 0 or an
empty string.

| Item | Description |
| --- | --- |
| `Context``=`Context | Context of the information. For $ude("export"), the value is `UDE Emport`. |
| `InputRecords``=`Number | Records to be exported. |
| `OutputRecords``=`Number | Records actually exported. |
| `WriteErrorsContinues``=`Number | Write errors encountered that did not stop the export action. |
| `InputDescriptors=Number` | Descriptors to be exported. The same descriptor can occur more than once. |
| `OutputDescriptors``=`Number | Signatures actually exported. This can be less than the number of `InputDescriptors` if void mappings are encountered.  Specifies the subsytem if `ObjectType` is signature |
| `DETAILS``=`String | Messages, warnings, and errors encountered during processing, structured as a list. |

## Use

$ude requires a fully
configured Development Environment and Repository to be available.

Allowed in form, report, and server page
components (and in service components that are not self-contained)

## Description

The $ude "export" function
enables you to create components that support your own development processes, for example, in
automating exports and backups. It is not intended for use in applications in the runtime
environment, for example to export application data. For this purpose, you can use
entitycopy.

By default, exported items are sorted in order of
primary key.

## Object Types

When using $ude to export or
compile objects, you must specify the development objects, providing the object type and profile.
Use GOLD `;` in specifying specific types of objects. Depending on the object type,
you can also specify additional options.

The following object types are supported by
$ude ("export")

* `signature`
* `component`
* `component;application`
* `application`
* `model`
* `library`
* `library;constants`
* `library;variables`
* `library;proc`
* `library;include`
* `library;device_table`
* `library;translation_table`
* `library;panel`
* `library;message`
* `library;glyph`
* `library;format`
* `library;menu`
* Templates:

  + `entity;interface`
  + `field;interface`
  + `field;syntax`
  + `field;layout`
  + `field;template`

## Option List

The OptionList enables you to
influence how the operation works based on the object. For example, you can provide additional
details about the objects you want to export, such as the library and language of global objects.
The OptionList is an associative list containing at least one option and value.
Use GOLD `;` in specifying multiple options.

Options

| Option | Description |
| --- | --- |
| `append=``True` | `False` | Append the objects or data to an existing XML file. The XML file may be located within a zip archive. |
| `keepopen=``True` | `False` | Keep an XML file open in preparation for appending more data.  By default, `export` flushes and closes the file each time. However, to improve performance in cases when appending to a file, use this option to keep the file open.  If you set this option to `True`, you must explicitly flush and close the file using flush or lflush. |
| `printinterval=`Number | Frequency with which a message is displayed, expressed as a number of occurrences |
| `commitinterval=`Number | Frequency with which data is stored in the database, expressed as the number of occurrences |
| `CompIsLeading=``True` | `False` | Export sequence is based on components, not subsustems, if ObjectType is `signature` |
| `inclCompDef=``True` | `False` | Specify whether to include component definitions when exporting, if ObjectType is `signature` |
| `subsystem``=`SubsystemName | Restrict the signatures to be exported to the specified subsystem, if ObjectType is `signature`. Profile characters can be used, for example, `!XYZ`  exports all except signatures in the XYZ subsystem. |
| `usedefsubsys``=``True` | `False` | If `True`, signatures are exported from the default subsystem. If `False`, signatures are exported from the subsystems specified by option `subsystem`.  **Note:**  Use either `usedefsubsys=True` or `subsystem=`SubsystemName, but not both. |
| `library=`LibraryName | Specifies the library to export, if ObjectType is `library``;`{`variables` | `proc` | `include` | `device_table` | `translation_table` | `panel`} |
| `language=`Language | Specifies the language if ObjectType is `library;`{`message` | `glyph` | `format` | `menu`} |
| `class=` | Specifies the class (size and GUI platform) if ObjectType is `glyph`. |

## Exporting Data

The following instruction exports all components
whose names start with `my` to the mycomponents.xml XML file in
the myzip.zip archive:

```procscript
vResult = $ude("export", "component", "my*", "xml:myzip.zip:mycomponents.xml")
```

The following instruction exports all include Proc
in the `mylib` library to the includes.xml file in the
myzip.zip archive:

```procscript
vResult = $ude("export", "library;include", "*", "xml:myzip.zip:includes.xml", "library=mylib")
```

## Exporting All Library Objects

To export a library and all its objects, you need
to specify each type of object:

```procscript
; *** export an entire library ***
$1 = $ude("export", "library", "MUSIC", "musiclib.xml")
$1 = $ude("export", "library;constants", "*", "musiclib.xml", "append=true;library=MUSIC")
$1 = $ude("export", "library;variables", "*", "musiclib.xml", "append=true;library=MUSIC")
$1 = $ude("export", "library;proc", "*", "musiclib.xml", "append=true;library=MUSIC")
$1 = $ude("export", "library;include", "*", "musiclib.xml", "append=true;library=MUSIC")
$1 = $ude("export", "library;device_table", "*", "musiclib.xml", "append=true;library=MUSIC")
$1 = $ude("export", "library;translation_table", "*", "musiclib.xml", "append=true;library=MUSIC")
$1 = $ude("export", "library;panel", "*", "musiclib.xml", "append=true;library=MUSIC")
$1 = $ude("export", "library;message", "*", "musiclib.xml", "append=true;library=MUSIC")
$1 = $ude("export", "library;glyph", "*", "musiclib.xml", "append=true;library=MUSIC")
$1 = $ude("export", "library;format", "*", "musiclib.xml", "append=true;library=MUSIC")
$1 = $ude("export", "library;menu", "*", "musiclib.xml", "append=true;library=MUSIC")
```

## Related Topics

- [$ude](_ude.md)
- [$ude import](_ude_import.md)
- [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md)
- [Lists and Sublists](../../lists/lists_of_items.md)
- [Zip Files](../../../developmentadmin/dataexchange/concepts/zipfilesupport.md)


---

# $ude getReferenceList

Retrieve a list of all runtime objects referenced by a specified object.

$ude`("getReferenceList"``,
"symboltable;`ObjectType`",`ObjectProfile`, ""` {`,` OptionList} `)`

## Parameters

* ObjectType—type of
  development or runtime object. See
  [Object Types](#section_144F1A4DFED17CC26024A7C6C10F018B).
* ObjectProfile—string
  specifying an object name of type ObjectType; wildcards are allowed.
* OptionList—associative list
  containing one or more options that are appropriate to the ObjectType. See
  [Option List](#section_17B2C16E495279CCFEC2CAF90980BBC0).

## Return Values

The GetReferenceList operation
returns a GOLD-separated list, or an empty string if the list is not available. The items in the
list are returned using the general format:
`ObjectTypeCode/ObjectName`. See
[Format of Listed Objects](#section_E0EE90521865B2C2B6D448D5E666F95D).

## Description

The $ude ("getReferenceList")
creates a list of runtime objects that are referenced by the specified object. This list is created
through an iterative process that extracts information from the specified symbol tables, as well as
the symbol tables of referenced objects. The list therefore includes all the objects required by
the specified object, including those that are indirectly used via other objects.

One of the most useful applications of this
function is to create a list of runtime objects for inclusion in a deployment archive or
distribution set.

## Object Types

Use GOLD separators in specifying specific types
of objects. Depending on the object type, you can also specify additional options.

Supported Object Types

| Object Type | Keyword |
| --- | --- |
| Application shells | `application` |
| Components | `component` |
| Dynamic Server Pages | `dynamic_server_page` |
| Static Server Pages | `server_page` |
| Forms | `form` |
| Reports | `report` |
| Services | `service` |
| Entity Services | `entity_service` |
| Session Services | `session_service` |
| Modeled Entities | `model` |
| Global ProcScript | `proc` |
| Menus | `menu` |
| Panels | `panel` |

## Option List

The OptionList enables you to
specify additional object information. For example, you can provide additional details about the
objects you want to load, such as the library and language of global objects. The
OptionList is an associative list containing at least one option and value. Use
GOLD `;` in specifying multiple options.

Options

| Option | Description |
| --- | --- |
| `library=LibraryName` | Specifies the library if ObjectType is `menu` or `panel` |
| `language=Language` | Specifies the language if ObjectType is `menu` |
| `class=Class` | Specifies the class (size and GUI platform) if ObjectType is `glyph`. |

## Format of Listed Objects

| Object Type | Syntax |
| --- | --- |
| Application shell | `APS/ApplicationName` |
| Component | `CPT/ComponentName` |
| Entity | `ENT/Entity@Model` |
| Include Proc | `INC/Library` |
| Global Proc | `PRC/Proc@Library` |
| Global Variables | `VAR/$$REGISTER@Library` |
| Menu | `MEN/Menu@Library@Language` |
| Panel | `PNL/Panel@Library` |
| Messages | `MSG/Message` |
| Formats | `FMT/Format@Library@Language` |
| Device/Printer Tables | `DVC/TableName` |
| Translation Tables | `KTT/TableName` |
| Unicode (UTF-8) | `UNI/FileName` |
| Files such as map files (usysmap.dsc), readme, and help files: | |
| Text Files | `TXT/FileName` |
| Binary Files, Unknown Files | `FIL/FileName` |
| DTDs | `DTD/Entity@Model` |
| Numgen Counters | `CNT/Counter@Library` |

```procscript
$result=$ude("getReferenceList","symboltable;form", "UM1_START","","")
```

Produces the following output:

```procscript
CPT/UM1_START;
MSG/1763;
MSG/1634;
MSG/1806;
MSG/1500;
<snip>

INC/U;
CPT/UM2_ORDER;
CPT/UM5_ITEM;
LIB/UM_LIB;
PNL/UM5_PANEL;
MEN/UM1_STARTBAR;
ENT/NME@NM;
VAR/$$REGISTER@UM_LIB;
ENT/ORDERLINE@UORDERS;
MSG/2202;
<snip>

MEN/UM2_ORDERBAR;
ENT/ORDER@UORDERS;
ENT/ITEM@UORDERS;
MEN/UM1_STARTBAR@UM_LIB@USA;
MEN/OK;
MEN/UM1_STARTMENU;
MEN/UM2_ORDERBAR@UM_LIB@USA; 
MEN/UM2_ORDERSMENU;
MEN/UM2_ITEMSMENU;
MEN/CANCEL;
MEN/OK@UM_LIB@USA;
MEN/UM1_STARTMENU@UM_LIB@USA;
MEN/UM2_ORDERSMENU@UM_LIB@USA;
MEN/UM2_ITEMSMENU@UM_LIB@USA;
CPT/UM3_SELITEM;
MEN/CANCEL@UM_LIB@USA;
MEN/UM3_SELITEMBAR;
MEN/UM3_SELITEMBAR@UM_LIB@USA;
MEN/U3_SELITEMMENU;
MEN/U3_SELITEMMENU@UM_LIB@USA
```

History

| Version | Change |
| --- | --- |
| 9.3.01 | Introduced |

## Related Topics

- [$ude](_ude.md)
- [Symbol Tables](../../../developmentadmin/crossreference/concepts/symboltables.md)


---

# $ude import

Import data into the Repository

$ude`("import",``"misc",` 
{ZipArchive`:`}Filename
{`,"",`OptionsList} `)`

## Arguments

* ZipArchive—optional name of
  a zip archive to contain one or more XML files, for example `ziparchive.zip` (the
  full string would be `ziparchive.zip:myxmlfile.xml`)
* Filename—string specifying
  the name of a Uniface XML file, for example `myxmlfile.xml`
* OptionsList—associative
  list containing one or more import options.

Arguments can also be a field, variable, or
function that evaluates to a string or list.

## Return Values

$ude returns the number of
records where an attempt was made to process them. This may differ from what is expected.

Values returned by $ude and entitycopy

| Value | Description |
| --- | --- |
| >=0 | Success. Number of records where an attempt was made to process them. Detailed information is returned in [$procReturnContext](_procreturncontext.md). |
| <0 | An error occurred. [$procerror](_procerror.md) contains the exact error and [$procerrorcontext](_procerrorcontext.md) provides the details. |
| 8066 | 8066- Copy failed: Open error on input file/table.  This error can occur when no entity descriptors cannot be found. |

Errors from `-1` through
`-15` do not stop $ude processing, with the exception of error
`-9 <UIOSERR_LOGON_ERROR>`. The number of ignored errors is returned in
$procreturncontext, along with additional information, such as the Uniface
release number of the source data, the number of input and output records processed, and messages,
warnings, and errors encountered during processing.

## Results

Items Returned by $procreturncontext

Items are omitted if their value is zero or an
empty string.

| Item | Description |
| --- | --- |
| `Context``=`Context | Context of the information. For $ude("import"), the value is `UDE Import`. |
| `Error``=`Number | Error number if process failed on error |
| `InputRecords``=`Number | Records to be imported. |
| `OutputRecords``=`Number | Records imported. |
| `SkippedRecords``=`Number | Records not imported due to map file entity mapping to `<void>` |
| `WriteErrorsContinues``=`Number | Write errors encountered that did not stop the import action. |
| `InputDescriptors=Number` | Descriptors to be imported. The same descriptor can occur more than once. |
| `OutputDescriptors``=`Number | Signatures actually imported. This can be less than the number of `InputDescriptors` if void mappings are encountered. |
| `SkippedDescriptors` | Entities mapped to `<void>` |
| `InputTrxFiles``=`Number | TRX files to copy, if a wildcard was specified. |
| `InputXmlFiles``=`Number | XML files to copy, if a wildcard was specified. |
| `DETAILS``=`String | Messages, warnings, and errors encountered during processing, structured as a list. |

## Description

The $ude ("import") function
enables you to create components that support your own development processes. It is not intended
for use in applications in the runtime environment, for example to import application data. For
this purpose, you can use entitycopy.

When used with the `misc` keyword,
the functionality provided by $ude ("import") is comparable to that provided by
the /imp command line switch.

## Options List

The OptionsList enables you to
influence how the operation works. For example you can specify that the import action use a map
file. The OptionsList is an associative list containing at least one option and
value. Use GOLD `;` in specifying multiple options.

Import Options

| Option | Description |
| --- | --- |
| `map=`MapFile | `#`{Entity|TargetEntity=SourceEntity} | Use mapping functionality to determine how data is imported from existing entity and field definitions to new model definitions.  For the following, it is not necessary to specify a MapFile:  `#`—use Target Repository definitions to map all entities  `#`Entity—use Target Repository definitions to map the specified entity  `#`TargetEntity`=`SourceEntity—use Target Repository definitions to map a source entity to a target entity |
| `tran=`TranslationTable | Use the specified database translation table for converting the data.  A database translation table is a keyboard translation table that is used to convert character strings during database input or output. |
| `supersede=``True` | `False` | Indicate whether to overwrite existing occurrences having matching primary keys in the target DBMS.  `True`—overwrite occurrences. Default.  `False`—keep original data. |
| `printinterval=`Number | Frequency with which a message is displayed, expressed as a number of occurrences |
| `commitinterval=`Number | Frequency with which data is stored in the database, expressed as the number of occurrences |
| `library=`LibraryName | Specifies the library containing the TranslationTable  is located, if `tran` is specified for import or copy. |

## Importing Data

The following instruction imports the contents of
myexportfile.xml, overwriting existing occurrences with the same primary
key.

```procscript
$1 = $ude("import", "misc", "xml:myexportfile.xml","","printerinterval=100;commitinterval=100")
```

The following instruction imports the file
specified in field IMPORTFILE, but will not overwrite the data if it already exists.

```procscript
$1 = $ude("import", "misc", IMPORTFILE,"","supersede=false")
```

## Related Topics

- [$ude export](_ude_export.md)
- [$ude copy](_ude_copy.md)
- [$ude compile](_ude_compile.md)
- [Zip Files](../../../developmentadmin/dataexchange/concepts/zipfilesupport.md)
- [Syntax of File and Directory Names](../../filemanagement/syntaxofnamesforlocalfilesanddirectories_intro.md)


---

# $ude import symboltable

Import symbol table files into the UXCROSS repository table

$ude`("import"``,``"symboltable`{
;ObjectType}`",` ObjectProfile`, ""`  {`,` OptionsList} `)`

$ude`("import"``,``"symboltable``",` ObjectProfile`, ""`  {`,` OptionsList} `)`

## Arguments

* ObjectType—type of
  development or runtime object. See
  [Object Types](#section_9DB253DF196ECC2600CC93A2E35C35D6).
* ObjectProfile—string
  specifying an object name; if no ObjectType is specified, it can contain
  wildcards.
* OptionsList—associative
  list containing one or more options that are appropriate to the operation or the
  ObjectType. See
  [Options List](#section_137AC597C8CD8B4FAED3BF85AA7E4826).

Arguments can also be a field, variable, or
function that evaluates to a string or list.

## Return Values

Values returned by $ude and entitycopy

| Value | Description |
| --- | --- |
| >=0 | Success. Number of records where an attempt was made to process them. Detailed information is returned in [$procReturnContext](_procreturncontext.md). |
| <0 | An error occurred. [$procerror](_procerror.md) contains the exact error and [$procerrorcontext](_procerrorcontext.md) provides the details. |
| 8066 | 8066- Copy failed: Open error on input file/table.  This error can occur when no entity descriptors cannot be found. |

Items Returned by $procreturncontext 

Items are omitted if their value is zero or an
empty string.

| Item | Description |
| --- | --- |
| `Context``=`Context | Context of the information. For $ude("import"), the value is `UDE Import`. |
| `InputRecords``=`Number | Records to be imported. |
| `OutputRecords``=`Number | Records imported. |

## Description

When used with the `symboltable`
keyword, $ude ("import") imports data from symbol table files in the project
directory to the UXCROSS.DICT repository table.

## Object Types

Use GOLD separators in specifying specific types
of objects. Depending on the object type, you can also specify additional options.

Supported Object Types

| Object Type | Keyword |
| --- | --- |
| Application shells | `application` |
| Components | `component` |
| Dynamic Server Pages | `dynamic_server_page` |
| Static Server Pages | `server_page` |
| Forms | `form` |
| Reports | `report` |
| Services | `service` |
| Entity Services | `entity_service` |
| Session Services | `session_service` |
| Modeled Entities | `model` |
| Global ProcScript | `proc` |
| Menus | `menu` |
| Panels | `panel` |

## Options List

Use GOLD `;` in specifying
multiple options.

Import Options

| Option | Description |
| --- | --- |
| `commitinterval=`Number | Frequency with which data is stored in the database, expressed as the number of occurrences |
| `library=`LibraryName | Specify the library if ObjectType is a global object. |
| `language=`Language | Specifies the language if ObjectType is `library;`{`message` | `glyph` | `format` | `menu`} |

```procscript
$status$ = $ude("Import", "Symboltable;Menu", "UM_STARTBAR", "", "Library=UM_LIB;Language=USA")
```

History

| Version | Change |
| --- | --- |
| 9.3.01 | Introduced |

## Related Topics

- [$ude](_ude.md)
- [Symbol Tables](../../../developmentadmin/crossreference/concepts/symboltables.md)


---

# $ude load

Load a symbol table or Proc listing from a file into a field or variable.

$ude`("load"``,``"`Type`;`ObjectType`"``,` ObjectName {`,` OptionList}
`)`

## Parameters

* Type—type of information;
  either `symbolTable` or `listing`
* ObjectType—type of
  development or runtime object. See
  [Object Types](#section_0CF404118202CB2E3A7377149ED24200).
* ObjectName—string
  specifying an object name
* OptionList—associative list
  containing one or more options that are appropriate to the ObjectType. See
  [Option List](#section_4C93BFBB31BF95BCF5567F065235DAB1).

## Return Values

$ude ("load") returns an
associative list or references, or an empty string, if no references are available.

## Description

$ude ("load") loads the
contents of a symbol table or Proc listing file into a field or variable.

The returned value can be long. When loading the
data into a field, ensure that the field syntax is set to large enough to handle the data.

## Object Types

Use GOLD separators in specifying specific types
of objects. Depending on the object type, you can also specify additional options.

Supported Object Types

| Object Type | Keyword |
| --- | --- |
| Application shells | `application` |
| Components | `component` |
| Dynamic Server Pages | `dynamic_server_page` |
| Static Server Pages | `server_page` |
| Forms | `form` |
| Reports | `report` |
| Services | `service` |
| Entity Services | `entity_service` |
| Session Services | `session_service` |
| Modeled Entities | `model` |
| Global ProcScript | `proc` |
| Menus | `menu` |
| Panels | `panel` |

If Type is
`listing`, it is not possible to specify `panel`.

## Option List

If the ObjectType is a global
object, you must also specify the language and library. Use GOLD `;` when specifying
multiple options.

Options

| Option | Description |
| --- | --- |
| `library=`LibraryName | Mandatory if ObjectType is a global object. |
| `language=`Language | Mandatory if ObjectType is `message` | `glyph` | `format` | `menu` |

## Loading a Proc Listing

```procscript
$status$ = $ude("Exist", "Listing;Component", $NAME$,"","")
if ($status$ = 0) 
   putmess "A listing for %%$NAME$%% does not exist"
elseif ($status$ = 1)
   vListing = $ude("Load", "Listing·;Component", $NAME$, "", "")
   lfiledump/append vListing, "listing.txt" 
endif
```

History

| Version | Change |
| --- | --- |
| 9.3.01 | Introduced |

## Related Topics

- [$ude](_ude.md)
- [Symbol Tables](../../../developmentadmin/crossreference/concepts/symboltables.md)


---

# $underline

Return the result of applying the underline character attribute to a
string.

$underline`(`String`)`

## Arguments

String—A string, or a field (or indirect reference to a field), a variable, or a function that evaluates to a string.

## Return Values

The $underline function returns the result of applying the underline character attribute to String

## Use

Allowed in all component types, but only applicable to unifields.

## Description

The result of $underline is visible only in a displayed unifield.

The following example shows the result of applying $underline to a string and storing it in a unifield:

```procscript
MY_UNIFIELD = $underline("aaabbb")
```

Afterwards, MY\_UNIFIELD contains "`aaabbb`".

## Related Topics

- [$stripattributes](_stripattributes.md)


---

# $uppercase

Convert a string to uppercase.

$uppercase`(`String {`,``"NlsLocale"` |
`"classic"` } `)`

## Arguments

* String—string to convert
  to uppercase; can be a string, field (or indirect reference to a field), variable, or function that
  evaluates to a string.
* `NlsLocale`—apply locale-based
  rules based on the value of the $nlslocale, as specified by
  $nlslocale or $NLS\_LOCALE.
* `classic`—apply one-to-one
  character conversion according to Unicode definitions.

## Return Values

String converted to uppercase.

## Use

Allowed in all Uniface component types.

## Description

The way in which strings are converted depends on
the NLS settings in effect. If the second argument is omitted, the value of
$nlscase is used to determine case conversion behavior. For more information, see [Case Conversion](../../datatypehandling/caseconversion.md).

For example, if the `nlslocale`
qualifier is used, the German lowercase `ß`, which is a single character, is
converted to two characters: `SS`. (This is known as case folding.)

```procscript
FIELD1 = $uppercase (" Groß-Gerau", "nlslocale")
;Result: FIELD1 =  GROSS-GERAU
```

If the qualifier is set as
`classic`, the conversion is on a character-by-character basis:

```procscript
FIELD2 = $uppercase (" Groß-Gerau", "classic")
;Result: FIELD2 = GROß-GERAU
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Added optional parameter with value `"NlsLocale"` or `"classic"` |

## Related Topics

- [$lowercase](_lowercase.md)
- [uppercase](../procstatements/uppercase.md)
- [Case Conversion](../../datatypehandling/caseconversion.md)


---

# $user

Return the user name used to log on to a database path.

$user { `(`Path`)` }

## Parameters

Path—DBMS path name, without leading dollar sign
(`$`).

## Return Values

* User name used to log on to
  Path. (Uniface does not support spaces in user names; any characters following a
  space are ignored.)
* If
  Path is omitted:
  + For Windows, $user returns the value of user in [user] section in the usys.ini.
  + For other operating systems, it returns the value of the environment variable `USER`.
* Empty string (""), if the user INI setting or `USER` environment variable is empty.

In a Web environment, if Path
is omitted, $user returns:

* Authenticated user name used when connecting
  to the Web server
* Empty string (""), if no user authentication
  has taken place between server and browser or if there is a license problem

  (Within the Web environment, Uniface
  *does* support spaces in user names; this is handled by the authentication process.)

## Use

Allowed in all Uniface component types.

## Description

The $user function is
supported only for DBMSs which require a user name to log on and for those operating systems which
support a user name. It is not supported for network drivers.

However, if a database path name is assigned to a network path, the network driver is requested to open the path. The network path may also be re-assigned to another server. As long as a server in the chain assigns the path name to a database driver, this is supported.

$user and $password are often used to construct the logon string given to the Proc open statement. For example, if you want to close and then
open a database, you can use $user and
$password to get these values before closing. Then use these values to open the
database. This avoids re-prompting the user for information they may have already entered.

## Logging Modification Information About an Occurrence

The following example uses the $user function in the Write trigger.
The example logs information about which user updated or created a particular occurrence.

```procscript
; Write trigger
; $dbocc = 0 when the occurrence has
; just been created

if ($dbocc = 0)
   CREATED_BY = $user
   CREATED_DATE = $date
else
   UPDATED_BY = $user
endif
write
```

## Related Topics

- [$password](_password.md)


---

# $uuid

Generate a globally unique identifier.

$uuid

## Return Values

A UUID (Univerally Unique IDentifier) in the
format of 8-4-4-4-12 hexadecimal characters.

## Use

Allowed in all Uniface component types.

## Description

$uuid can be useful for
generating technical keys, session IDs, random file names, or any other situation in which a unique
identifier is required.

The UUID is a 16-byte number that is represented
as a 32 character hexadecimal string, such as {21EC2020-3AEA-1069-A2DD-08002B30309D}. It is made up
of components that represent the time, a version, and an Ethernet address, although the actual
Ethernet address is not necessarily used.

## UUID Generation on Windows

On Microsoft Windows platforms, where a UUID is
usually called a GUID (Globally Unique IDentifier), the RPC function `UuidCreate()`
is used. This function generates a UUID that cannot be traced to the ethernet address of the
computer on which it was generated.

## UUID Generation on Non-Windows Platforms

On non-Windows platforms, the generated UUID is
based on an OF Internet-Draft ([www.opengroup.org/dce/info/draft-leach-uuids-guids-01.txt](http://www.opengroup.org/dce/info/draft-leach-uuids-guids-01.txt)).

Instead of an actual Ethernet address, Uniface
generates a random number based on the current time in milliseconds and the process ID. A bit in
the UUID is set to indicate that the number is generated, thus ensuring that the random number
cannot clash with an existing Ethernet address.

The number is generated only once per process, so
the last part of all generated UUIDs in one Uniface process are all the same. There cannot be two
processes with the same PID at the same time on the same machine, so two Uniface processes running
on one machine will never generate the same number.

It is theoretically possible that the generated
UUID is not unique, but the chances are negligible. This would require two Uniface processes
running on two different machines to have the same PID, and they would need to generate their UUIDs
at exactly the same time to millisecond precision.

## Generating Session IDs

```procscript
variables
  string newSessionId
endvariables
; Generate 128 bit random number
newSessionId=$replace($uuid(),1,"-","",4)
```

---

# $valrep

Return or set the ValRep used by a widget for a field.

$valrep { `(`Field`)` }

$valrep { `(`Field`)` }
`=`List

## Parameters

* Field—field name;
  optional; can be a literal name, a string, or a variable, function, parameter or indirect reference
  to a field. Field can optionally contain a qualified field name, for example,
  `MYFLD.MYENT`. If omitted, the current field is used.
* List—associative list that
  contains the desired ValRep items for the specified field

## Return Values

* ValRep list used by a widget for the specified
  field.
* Empty string (""), if no ValRep list has been
  declared or if the field cannot be found.

## Use

Allowed in forms and reports, dynamic server
pages, and in service components that are not self-contained.

In DSPs, $valrep can only be
used once (before $webdefinitions, when the page is initially loaded) to
override the declarative ValRep. It cannot be used to dynamically change the ValRep.

## Description

$valrep returns or sets the
ValRep list for the specified field in all occurrences in the component. The ValRep list set with
$valrep:

* Overrides the ValRep list defined for the
  widget properties dialog box.
* Is reset to the compiled list each time that
  a component (with Keep Data in Memory set  *off* ) is restarted.
* Can be overridden for the field in a single
  occurrence by using $fieldvalrep.

## Setting the ValRep for a Radio Group

The following example sets the ValRep for the
radio group for field GENDER. The underlined semicolon (`;`) represents
the Uniface subfield separator (by default, GOLD ;).

```procscript
$valrep(GENDER.PERSON) = "M=Male;F=Female"
```

## Related Topics

- [$fieldproperties](_fieldproperties.md)
- [$fieldvalrep](_fieldvalrep.md)
- [$properties](_properties.md)


---

# $valuepart

Return the value part of an associative list item.

$valuepart`(`AssociativeListItem`)`

## Return Values

Value part of an associative list item.

## Use

Allowed in all Uniface component types.

## Description

For more information on the structure of lists,
see  [Lists and Sublists](../../lists/lists_of_items.md).

## Extracting the ID and Value of an Associative List Item

The following example shows
how the
$valuepart function can be used to extract the value
part of an associative list item:

```procscript
$1 = $idpart("Key=TheData")
$2 = $valuepart("Key=TheData")
; results:
; $1 = "Key"
; $2 = "TheData"
```

## Related Topics

- [getitem](../procstatements/getitem.md)
- [$itemnr](_itemnr.md)
- [List Handling in Proc](../../lists/listhandling.md)
- [Associative Lists](../../lists/associativelists.md)
- [$idpart](idpart.md)
- [$item](item.md)


---

# $variation

Return or set the name of the library to use for the application or component.

$variation

$variation`=`LibraryName

```procscript
$variation = "SALES_APP"
```

## Arguments

LibraryName—name of a library,
excluding the language.

## Return Values

Name of the current library.

## Use

Allowed in all Uniface component types.

## Description

Explicitly defining a value for
$variation means that any assignment file setting for
$VARIATION is ignored.

$variation specifies the name
of the library to be used for the following global objects:

* Messages
* Help texts
* Menus
* Keyboard translation tables
* Device translation tables
* Language setups
* Glyphs
* Panels

Changing the value of
$variation does not affect the global Procs and global variables used at
application run time.

The library is a declarative part of the component
or startup shell and cannot be changed without recompiling the component or startup shell. You
cannot use $variation to change this dynamically.

## Setting a Variation

The following example saves the current library
in variable vLibrary, and sets the current variation to PROJECT:

```procscript
vLibrary = $variation
$variation = "PROJECT"
```

## Related Topics

- [addmonths](../procstatements/addmonths.md)
- [numgen](../procstatements/numgen.md)
- [numset](../procstatements/numset.md)
- [pulldown](../procstatements/pulldown.md)
- [$clock](_clock.md)
- [$date](_date.md)
- [$datim](_datim.md)
- [$language](_language.md)


---

# $web

Return an indication of whether the current application was started by the Web Request
Dispatcher or JTi.

$web

## Return Values

Values returned by $web

| Value | Meaning |
| --- | --- |
| JTI | The form was activated by JTi |
| URD | The form was activated by the WRD |
| ERR | Error determining the context |
| "" | The form was not activated by the WRD |

## Use

Allowed in dynamic and static server page
components.

## Description

The $web function returns a
string that indicates whether the current application was started by the WRD or by JTi. This allows
you to provide conditional processing depending on whether a component is running in a web browser,
JTi, or a normal application.

## Related Topics

- [webgen](../procstatements/webgen.md)
- [webget](../procstatements/webget.md)


---

# $webinfo

Return or set information about the current web request.

$webinfo`("`Topic`")` {`=`String}

String`=`$webinfo`("`Topic`")`

## Arguments

* Topic—keyword that gets or
  sets a specific information property or channel of an HTTP request or response. See
  [Description](#Descript).
* String—value associated
  with Topic

## Return Values

Values Commonly Returned by $procerror Following
$webinfo

| Value | Error constant | Meaning |
| --- | --- | --- |
| -31 | <UGENERR\_LICENSE> | No license for requested action. Contact your Uniface representative. |
| -250 | <UWEBERR\_SKELETON> | Skeleton file not found or is incorrect. |
| -251 | <UWEBERR\_OUTFILE> | When `$web=""`, the output file is not specified or is the same as the skeleton file. |
| -252 | <UWEBERR\_IO> | Output file could not be written. |
| -253 | <UWEBERR\_IO\_IMAGE> | Image file could not be written. |
| -254 | <UWEBERR\_ITERATION> | Nested iteration over the same entity. |

## Use

Allowed in static and dynamic server page
components.

## Description

The $webinfo function provides
information about requests from the browser to the server page, and it is used to prepare
information sent to the browser. By specifying the relevant Topic, you can get
or set specific information in the request or response. These topics function as the interface to
the USYSHTTP component, which is responsible for communication between Uniface and the web server.

$webinfo Topics

| Keyword | Direction | Description |
| --- | --- | --- |
| **Data functions**. For more information, see [$webinfo: Data Topics](_webinfo_inputoutput.md). | | |
| `Input` | IN | Data received from the browser as part of an HTTP request for a static server page. It consists of an associative list that may include input parameters provided as a query string, and is used by webget to load data into the current component. |
| `PathInput` | IN | Associative list containing input parameters from a semantic URL (as opposed to a query string). |
| `Data` | INOUT | JSON-formatted data sent to and from the browser by webload and websave. (DSPs only). |
| `Output` | OUT | Data returned to the web browser by webgen. (USPs only) |
| **DSP Functions** | | |
| `Definitions` | INOUT | Component definitions, such as properties, initial values and ValRep lists; filled by webdefinitions with the component definitions from the current component. |
| `JavaScript` | OUT | JavaScript definitions. Populated by webdefinitions statement with the Uniface JavaScript definitions. (DSPs only) |
| `CSS` | OUT | Cascading style sheet definitions. Populated by webdefinitions with Uniface CSS definitions. (DSPs only.) |
| `Layout` | OUT | HTML layouts sent to the Web browser. Populated by the weblayout statement. (DSP only). |
| `Locale` | OUT | Client-side locale used for locale-based formatting on the browser; for example `en_US`, `fr_CA`, `nl_NL`. For more information, see [$webinfo("Locale")](_webinfo_locale.md) |
| **Cookie Functions**. For more information, see [$webinfo: Cookie Topics](_webinfo_cookies.md). | | |
| `CookiesIn` | IN | Associative list of cookies present in the request |
| `CookiesOut` | OUT | Associative list of multiple, named cookies to be set in the response. |
| `UserContext` | OUT | Associative list specifying information for a single, unnamed cookie. |
| **HTTP Request and Header Functions**. For more information, see [$webinfo: HTTP Header and Request Topics](_webinfo_httpheaders.md). | | |
| `HttpRequestParams` | IN | Associative list of request parameters present in the request URL; it can include the entity names and occurrence IDs that are used by websetocc to set the current occurrence for the current component. |
| `HttpRequestHeaders` | IN | Incoming HTTP headers from the browser, excluding cookie headers |
| `HttpResponseHeaders` | OUT | Returned HTTP headers, excluding cookie headers. |
| **State and Status Functions** | | |
| `SessionCommands` | OUT | Associative list of session commands and parameters. For more information, see [$webinfo (SESSIONCOMMANDS)](_webinfo_sessioncommands.md). |
| `RequestContext` | INOUT | Associative list of state information for the current HTTP request and response. For more information, see [$webinfo (REQUESTCONTEXT)](_webinfo_requestcontext.md). |
| `WebServerContext` | IN | Associative list of server context properties. For more information, see [$webinfo (WEBSERVERCONTEXT)](_webinfo_webservercontext.md). |
| `Status` | OUT | Status code for the response. The default is 200, but it can be set to something else. It is placed in the first line of the response sent to the browser. |
| `StatusReason` | OUT | Default value placed in the first line of the response when the status code is 200. |
| **Salt Functions**. For more information, see [$webinfo: Salt Topics](_webinfo_saltchannels.md). | | |
| `Salt` | INOUT | Salt string used to generate and verify a hash using webget and webgen respectively. |
| `SaltIn` | IN | Salt string used by webget to verify a hash. |
| `SaltOut` | OUT | Salt string used by webgen to generate a hash. |

History

| Version | Change |
| --- | --- |
| 9.7.05.022 | Added function: `Locale` |
| 9.7.04 G404 | Added `SALT`, `SALTIN`, and `SALTOUT` topics. |
| 9.7.01 | Added `PATHINPUT` topic |
| 9.5.01 | Added topics: `SESSIONCOMMANDS` and `REQUESTCONTEXT` |
| 9.4.01 | Added topics: `CSS`, `DATA`, `LAYOUT`, `DEFINITIONS`, and `JAVASCRIPT`. |

## Related Topics

- [webdefinitions](../procstatements/webdefinitions.md)
- [webgen](../procstatements/webgen.md)
- [webget](../procstatements/webget.md)
- [webload](../procstatements/webload.md)
- [websave](../procstatements/websave.md)
- [UHTTP](../../../_reference/componentapis/httpexecutionoperations/uhttp.md)


---

# $webinfo (REQUESTCONTEXT)

Get or set request context attributes.

$webinfo`("REQUESTCONTEXT")` {`=`AtrributeList}

## Parameters

AtrributeList—Uniface list of
name-value attributes containing state information that is required for the current HTTP request.

## Description

The
`$webinfo("REQUESTCONTEXT")` topic returns a Uniface list of
name-value attributes that can be shared between various operations, triggers, and DSPs that are
activated in the course of the processing HTTP request.

When a new HTTP request is received from the
client browser, the Uniface Server creates an empty request context for the DSP. The DSP can set
and get request context attributes using
`$webinfo("REQUESTCONTEXT")`.

Using the WrdActivate session
management API, you can instruct the WRD to activate a callback operation on another component
instance. The callback request is typically used to send the new and old session ID to the Uniface
Server from the WRD. It can be called several times while the HTTP request is processed, and during
that time, the request context is used to share the information between the current request and
possible callback requests. In this way, if a security component is called to change the session
ID, the new session ID is obtained by the Uniface Server so that it can contain the correct
information when it sends the response back to the client browser.

As long as a DSP response contains a
WrdActivate call, no response is sent back to the browser. The Uniface Server
only sends the result of the last response (without WrdActivate) back to the web
client as the HTTP response. It then destroys the request context and all attributes are lost.

Scope of HTTP Request Context

Applications can also use the request context to
share the data between different operations, triggers,and to share data between different
components.

## Example

The following example shows how you can get and
set request context state information using the
`$webinfo("REQUESTCONTEXT")` topic.

```procscript
variables
  string requestAttrList, value
endvariables

requestAttrList = "USERNAME=John;ROLE=Admin"

; Assign a list to the request context 
$webinfo("REQUESTCONTEXT") = requestAttrList

; get the value of attributes "USERNAME" and put it into variable "value"
; of the property "SESSIONATTRIBUTES" of WEBINFO topic "WEBSERVERCONTEXT"
getitem/id value, $webinfo("REQUESTCONTEXT"), "USERNAME"

; Set the value of the attribute "ROLE" to "Guest"
putitem/id $webinfo("REQUESTCONTEXT"), "ROLE", "Guest"

; Add a new attribute "Message” with value "Hello!"
  putitem/id $webinfo("REQUESTCONTEXT"), "Message", "Hello!"

; delete the attribute "Message"
  delitem/id $webinfo("REQUESTCONTEXT"), "Message"
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced `"REQUESTCONTEXT"` |

---

# $webinfo (SESSIONCOMMANDS)

Use the `SESSIONCOMMANDS` topic to invoke session management API
calls.

$webinfo`("SESSIONCOMMANDS")``,` CommandName`,` CommandParameters

## Parameters

* CommandName—string; one
  of:

  + [ChangeSession](../../../_reference/sessionmanagementapi/changesession.md)
  + [SetAttributes](../../../_reference/sessionmanagementapi/setattributes.md)
  + [DeleteAttributes](../../../_reference/sessionmanagementapi/deleteattributes.md)
  + [WrdActivate](../../../_reference/sessionmanagementapi/wrdactivate.md)
* CommandParameters—one or
  more parameters for the command

## Description

Use the session management API to invalidate the
current session and request a new session, optionally setting or deleting session attributes when
doing so. This should only be required at critical points in the web application transaction, for
example, after login and logoff, or before committing sensitive data. For more information, see [APIs: Session Management](../../../_reference/sessionmanagementapi/apssessionmanagement.md).

Session attributes consist of an associative list
of name-value pairs that are maintained by the WRD. Any application that can access the J2EE
container (the servlet engine) can access the session attributes for the duration of the session.
This can be useful if you are using, for example, a Java application instead of a Uniface component
for authentication.

To examine session attributes in Uniface, you can
use the retrieve the `SESSIONATTRIBUTES` property using
`$webinfo("WEBSERVERCONTEXT")`. For more information, see [$webinfo (WEBSERVERCONTEXT)](_webinfo_webservercontext.md).

## Setting Session Attributes

```procscript
; Create a list of Session attributes and their values
putitem/id vAttList, "DATA1", "New"
putitem/id vAttList, "Data2", "Edit"

; Add the command and its parameters to the SESSIONCOMMANDS chanel of $webinfo
putitem/id $webinfo ("SESSIONCOMMANDS"), "SetAttributes" , vAttList
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced `"SESSIONCOMMANDS"` |

## Related Topics

- [Session Management](../../../webapps/scripting/sessionmanagement.md)
- [Session Management for Web Applications](../../../webapps/websecurity/websecurity_sessionmanagement.md)
- [Session Fixation](../../../webapps/websecurity/sessionfixation.md)


---

# $webinfo (WEBSERVERCONTEXT)

The `WEBSERVERCONTEXT` returns an associative list of properties that
provide state information about the Uniface Server and the context in which it is running.

$webinfo`("WEBSERVERCONTEXT"),`PropertiesList

## Parameters

PropertiesList—an associative
list of the following properties:

* `OPERATION`—name of the
  operation to be executed in the component
* `COMP`—name of the component
  to be executed
* `SESSION`—unique session
  identifier
* `AUTHORIZATION`—key that is
  the result of authorization
* `SESSIONCOOKIE`—indicates
  whether cookies are used for state management: `true`, `false`, or `dynamic`.
* `SERVERVARIABLES`—all web
  server variables that are supported by the WRD. See
  [Server Variables Supported by the WRD](#Server).
* `SESSIONATTRIBUTES`—a Uniface
  list of session attributes that have been set with the SetAttributes API. See
  [Getting Session Attributes](#section_A7301BE835344D7E87C98899EF5CC818).

## Description

Server variables are in a nested list. To retrieve
a server variable, you can use $webinfo("WEBSERVERCONTEXT") and
`SERVERVARIABLES` as the id to obtain the list of server variables, and then use
getitem/id to extract the desired server variable from the list.

## Inspecting Server Variables

For example, to obtain the
`SERVER_PROTOCOL` variable:

```procscript
variables
   string vServerVars, vServerProtocol
endvariables

getitem/id vServerVars, $webinfo("WEBSERVERCONTEXT"), "SERVERVARIABLES"
getitem/id vServerProtocol, vServerVars, "SERVER_PROTOCOL"

message/info "The server protocol is %%server_protocol%%%."
```

## Server Variables Supported by the WRD

Not all server variables are supported by all
servers. For more information about the server variables supported by your web server, consult the
documentation for your web server.

Server Variables Supported by the WRD

| Server Variable | Description |
| --- | --- |
| `AUTH_TYPE` | The authentication method used by the server (such as Basic or NTLM). Empty when no authentication method is used |
| `CONTENT_LENGTH` | The length of data |
| `CONTENT_TYPE` | MIME type of message content  Mime types starting with 'text/' or the prefix 'text:' will be seen as textual output and so converted to a string. All others will be considered to be raw data. The 'text:' prefix will be stripped from the Mime type by the WRD, so it will not be part of the text sent to the web browser. |
| `PATH_INFO` | Last part of the URI, without the server and protocol |
| `PATH_TRANSLATED` | Physical path of `PATH_INFO` on server |
| `QUERY_STRING` | Query part of the URI; the client's query string |
| `REMOTE_ADDR` | IP address of the client sending the request |
| `REMOTE_HOST` | Fully qualified domain name of the client sending the request |
| `REMOTE_USER` | The user ID sent by the client issuing the request |
| `REQUEST_METHOD` | Method in which the request was made, such as GET, POST, PUT, DELETE, or HEAD |
| `REQUEST_URI` | Returns the part of the URL after the host identifier, including the servlet engine application name, servlet mapping name (default), and anything thereafter (not including the query string). |
| `SERVLET_PATH` | Returns the servlet instance requested. Note that this can be different from the string in the URL because the servlet mapping can map a URL string to a servlet with a different name. |
| `SERVER_NAME` | The host identifier of the web server machine. |
| `SERVER_PROTOCOL` | Name and revision number of the information protocol of the incoming request. |
| `SERVER_PORT` | The port of the web server. |
| `SERVER_PORT_SECURE` | Indicates whether the request is being handled on a secure port (that is, connected by HTTPS connection) or not. `1` indicates a secure port; otherwise, the value is `0` |

## Getting Session Attributes

You can examine HTTP session attributes maintained
by the WRD in the J2EE web container. These attributes can be using the
SetAttributes property of `$webinfo
("SESSIONCOMMANDS")`. For more information, see [$webinfo (SESSIONCOMMANDS)](_webinfo_sessioncommands.md) and [SetAttributes](../../../_reference/sessionmanagementapi/setattributes.md).

```procscript
variables 
  string sessionAttrList, value
endvariables

; Load the Uniface list of session attributesthe by getting the value 
; of the property "SESSIONATTRIBUTES" of WEBINFO topic "WEBSERVERCONTEXT"
getitem/id sessionAttrList, $webinfo("WEBSERVERCONTEXT"), "SESSIONATTRIBUTES"

; Load the value of the session attributes "MyData" into the variable "value"
getitem/id value, sessionAttrList, "MyData"
```

| Version | Change |
| --- | --- |
| 9.5.01 | Added `SESSIONATTRIBUTES` property |

## Related Topics

- [Session Management](../../../webapps/scripting/sessionmanagement.md)
- [Session Management for Web Applications](../../../webapps/websecurity/websecurity_sessionmanagement.md)


---

# $webinfo("Locale")

Use $webinfo("Locale") to set the client-side locale in a DSP application. The value is used by the DSP client for locale-based formatting.

`$webinfo("Locale") =` Locale | $nlslocale

## Values

* Locale—literal locale name, for example `"en_UK"`, `"fr"`, or `"fr_CA"`.
* $nlslocale—value of the NLS locale use for locale-based processing on the server.

## Use

Use only in dynamic server pages.

## Description

The DSP locale has session scope and is only applied in a full-page refresh, so it is typically set on a main DSP component, either in or before the postActivate trigger. If it is set after the DSP has been activated, a full page refresh is needed for the change to take effect.

**Note:** Currently, the value of $webinfo ("Locale") is only used to format Date, Datetime, and Time values in HTML input controls.

### NLS Locale vs. DSP Client Locale

The value of `$webinfo("Locale")` is completely independent of the Uniface NLS locale, as set or returned by the assignment setting $NLS\_LOCALE or the function $nlslocale. The NLS locale is used in locale-based processing on the server, which is handled by the ICU library.

If you set the server-side locale in ProcScript using $nlslocale, this should be done early, for example in the Set State trigger.

You can try to align client- and server-side locales for DSPs using the following command:

`$webinfo("Locale") = $nlslocale`

However, note that:

* The locales supported by `$webinfo("Locale")` and $nlslocale are not the same. The DSP will try to find an appropriate match, but if this fails, it falls back to the generic locale `"en"`.
* Even if the same locale name is supported, the results may be different on the DSP client than on the server because processing is entirely dependent on the libraries (JavaScript vs. ICU).
* The $nlslocale values of `system` and `classic` are ignored.

## Related Topics

- [$nlslocale](_nlslocale.md)
- [$NLS_LOCALE](../../../configuration/reference/assignments/_nls_locale.md)


---

# $webinfo: Cookie Topics

Use these topics to set the properties of a cookie and write state information to a
cookie.

## Description

A cookie is set at the browser only if you
explicitly set it using the `$webinfo("USERCONTEXT")` instruction.

For more information, see [Uniface Cookies](../../../webapps/applicationissues/state/uniface_cookies_mechanism.md) and [Using Uniface Default Cookies for State Management](../../../webapps/applicationissues/state/use_default_cookie_mechanism.md).

## COOKIESIN

The `COOKIESIN` topic returns an
associative list of cookies present in the request:

CookieName1`=`Value1`;` CookieName2`=`Value2...

## USERCONTEXT

The `USERCONTEXT` topic of
$webinfo sets a Uniface list specifying information for a single, unnamed
cookie. The first element is the data of the cookie; subsequent elements specify the cookie
attributes.

## COOKIESOUT

The `COOKIESOUT` topic sets an
associative list of multiple, named cookies to be set in the response. Each cookie has name and
value, followed by an optional list of cookie attributes, which can occur in any order:

Cookie`=`Value
{`;expires=`Seconds}
{`;domain=`Domain}
{`;path=`Path}
{`;secure=T` | `F`} {`httponly=T` |
 `F`} {`;version=`CookieVersion}
{`;encodingversion=`EncodingVersion}

Cookie Contents and Attributes

|  | Description |
| --- | --- |
| Cookie`=`Value | Name and value of the cookie; the value can also be an associative list. |
| `expires=`Seconds | Number of seconds that the new user context remains valid. If a request is made after the expiration time has elapsed, no cookie will be sent with the request. If not specified, the cookie is a session cookie. A value of `0` (seconds) deletes the cookie. |
| `domain=`Domain | Web server domain for which the new user context is valid |
| `path=`Path | Web server path on the domain for which the new user context is valid |
| `secure=T` | `F` | Determines whether the cookie is secure, meaning that it is only used if the server is accessed via HTTPS. It ensures that the cookie is always encrypted when transmitting from client to server, making it less vulnerable to cookie theft via eavesdropping.  If not set, Uniface it to `true` when HTTPS is used; see [Secure Cookies](#section_B5117F9DAABD4509BCC9AD7648D93F5A). |
| `httponly=T` | `F` | Determines whether the cookie can be shared between the web server and other sources, such as JavaScript. By default, it is set to `T`, which ensures that the cookie can only be sent back to the web server on further HTTP(S) requests, and it cannot be accessed from JavaScript.  **Note:**  This behavior is browser-specific, but most new browsers handle this correctly.  **Note:**  This property is only applied if the WRD runs in a web server or servlet engine that supports the Java Servlet API 3.0, such as Tomcat 7.0. |
| `version=0` | `1` | Version of HTTP state maintenance to which the cookie conforms:   * `0`—Netscape   specification (the default) * `1`—RFC 2109   specification |
| `encodingversion=0` | `1` | `2` | Encoding version; used only when encoding is needed:   * `0`—Use default. If   encoding is needed, encoding version 2 is used. * `1`—URL encoded.   Encodes the UTF-8 byte array of the cookie value, when needed. * `2`—Base64 encoded,   when needed.   When encoding is in effect, the cookie value is modified as follows:   * The cookie value is prefixed with   `ENC#1:` or `ENC#2:` to indicate the encoding used. * For `ENC#1:`, the   Uniface list separator (`;`) is replaced by ampersand   `&`. |

There is no limit on the length of the cookie
string, but limitations are imposed by some Web servers. (4 Kb is a widely accepted maximum size
for cookies). This value can be set and is available in the next request.

The cookie is stored on the client browser. If a
cookie does not change, it should not be present in the list.

## Secure Cookies

The default value of the `secure`
attribute depends on whether the request is sent over HTTP or HTTPS. If it is not specified, it
defaults to:

* `T` if the request is sent via
  an HTTPS secured connection (the server variable `SERVER_PORT_SECURE=1` in
  `WEBSERVERCONTEXT`).
* `F` if the request is sent by
  an HTTP connection (the server variable `SERVER_PORT_SECURE=0` in
  `WEBSERVERCONTEXT`)

For more information, see [Cookies Containing Sensitive Data](../../../webapps/websecurity/sensitivecookies.md) and [Update Web Applications for Web Security Enhancements](../../../migration/tasks/updatewebappsforsecurityenhancements.md).

## Named Cookies

A simple example of two named cookies:

`cookie1=name=John!!;birthday=19840911!;expires=3600!;version=1!;`
... `;cookie2=`...

## Constructing a Session Cookie

The following example creates a session cookie
(which expires when the session on the browser is closed). By default, the
`httponly` property is set to true, so there is no need to include it in the list.
(It will be ignored if the servlet engine does not support Servlet API 3.0)

```procscript
; Initialize variables
$COOKIEVALUE$ = ""
$COOKIE$ = ""

; Set generated session ID in cookie
putitem/id $COOKIEVALUE$, "sid", $UUID

; Set the cookie value and attributes
putitem $COOKIE$, -1, $COOKIEVALUE$
putitem/id $COOKIE$, "version", "1"    ; type 1 cookie

Assign the list to the COOKIESOUT 
putitem/id $webinfo("COOKIESOUT"), "MYSESSION", $COOKIE$
```

## Constructing Encoded Cookies

The following Proc fragment builds up two named
cookies, COOKIE1 with cookie version 1 and encoding version 1, and COOKIE2 with only a simple
value.

```procscript
$COOKIEVALUE$ = ""
$COOKIE1$ = ""

putitem/id $COOKIEVALUE$, "name", "John Bunyan"
putitem/id $COOKIEVALUE$, "birthday", "19700416"

putitem $COOKIE1$, -1, $COOKIEVALUE$
putitem/id $COOKIE1$, "version", "1"
putitem/id $COOKIE1$, "encodingversion", "1"

putitem/id $webinfo("COOKIESOUT"), "COOKIE1", $COOKIE1$
putitem/id $webinfo("COOKIESOUT"), "COOKIE2", "VALUEONLY"
```

Various cookie values, with encoding version set
to `1`, are shown in the following examples:

No encoding needed:

```procscript
name=John
```

Cookie version 0; space replaced by hex value:

```procscript
ENC#1:name=John%20Bunyan
```

Cookie version 1; space allowed, encoding not
needed:

```procscript
name=John Bunyan
```

Cookie version 1; GOLD `;`
(`;`) replaced by `&`

```procscript
ENC#1:name=John Bunyan&birthday=19700416
```

---

# $webinfo: Data Topics

The `DATA`, `PATHINPUT`, and `INPUT`,
`OUTPUT` topics of $webinfo get and set the data requested or
loaded into server pages.

## DATA

The DATA topic is used by both
webload and websave to pass data between the server backend
and browser frontend of a DSP component.

## PATHINPUT

The PATHINPUT topic is used in both dynamic and
static server pages for RESTful URLs. For more information, see [Uniface URL Format](../../../webapps/applications/semanticurls.md).

If the request was formatted as a RESTful URL, the
`PATHINPUT` topic contains an associative list of input parameters.

You can process the list in Proc before returning
a response using websave (for DSPs) or webgen (for USPs).

## INPUT

The INPUT topic returns an associative list
containing the input of the HTTP request. This is loaded into the static server page by the
webget command. You can then process the list in Proc to extract the information
needed to process the data and provide a response.

The content returned by the INPUT topic depends on
the type of server page and the HTTP request type:

POST

For HTTP POST requests, the INPUT topic
returns the data from the component. with the content type of the page as the key. This has the
format:

ContentType`=`BodyContent

* ContentType must be a
  supported MIME text type, such as `text/plain` or `application/json`.
  For more information, see [Supported Media Types](../../../integration/webservices/concepts/mimetypes.md).
* BodyContent is the
  HTTP request body.

For example, if the Content-type header is
MIME type `"text/plain"`, and body content is a JSON string in UTF-8,
`$webinfo("INPUT")` returns:

```procscript
text/plain={ "id" : "n1", "name" : "foo" }
```

PUT

For HTTP PUT requests, the INPUT topic
returns an associative list containing the contents of the query string (with
`querystring` as the key), and the data from the component (with the content type of
the page as the key). This has the format:

`querystring=`QueryParameterList;ContentType`=`BodyContent

* QueryParameterList
  are query parameters in a format of Uniface sublist
* ContentType must be a
  supported MIME text type, such as `text/plain` or `application/json`.
  For more information, see [Supported Media Types](../../../integration/webservices/concepts/mimetypes.md).

  **Note:**  If URL encoding has been specified in
  the HTTP header, the content type will not be used as a key.
* BodyContent is the
  HTTP request body.

For example, consider a PUT request in
which:

The URL is `http://host:port/uniface/wrd/USP1?param1=v1&param2=v2`

ContentType is `text/plain`

BodyContent is a JSON string in UTF-8.

`$webinfo("INPUT")`
returns:

```procscript
querystring=param1=v1!;param2=v2;text/plain={ "id" : "n1", "name" : "foo" }
```

GET

For HTTP GET requests,
`$webinfo("INPUT")` returns the contents of the query string
containing input parameters.

DELETE

For HTTP DELETE requests,
`$webinfo("INPUT")` returns the contents of the query string. The
query string is used to identify the resource to delete.

## OUTPUT

The `OUTPUT` topic sets the data
returned to the web browser from a static server page. Initially this is empty; it is populated by
the webgen command.

You can supply an HTML page from Proc, or
manipulate this to return data of a supported MIME type.

If a response needs to handle content type and
data, you need to put `Content-type=ContentType` in the
`$webinfo("HTTPRESPONSEHEADERS")` and the content data into
`$webinfo("OUTPUT")`.

## Related Topics

- [Calling Operations on Static Server Pages](../../../webapps/applicationissues/state/calling_operations_from_url.md)
- [Supported Media Types](../../../integration/webservices/concepts/mimetypes.md)


---

# $webinfo: HTTP Header and Request Topics

Use the `HTTPRESPONSEHEADERS`and `HTTPREQUESTHEADERS`
topics of $webinfo to transfer HTTP protocol information between a browser and a
server. The `HTTPREQUESTPARAMS` topic is used as input for the
websetocc statement.

$webinfo`("HTTPRESPONSEHEADERS")` {`=`Response}

Request`=`$webinfo`("HTTPREQUESTHEADERS")`

Parameters`=`$webinfo`("HTTPREQUESTPARAMS")`

## Parameters

* `HTTPRESPONSEHEADERS`—returned
  HTTP headers, excluding cookie headers.
* `HTTPREQUESTHEADERS`—incoming
  HTTP headers from the browser, excluding cookie headers
* `HTTPREQUESTPARAMS`—incoming
  parameters present in the request URL

## HTTPREQUESTPARAMS

The `HTTPREQUESTPARAMS` topic
returns an associative list of request parameters present in the request URL. It can include the
entity names and occurrence IDs that are used by websetocc to set the current
occurrence for the current component.

It contains an associative list of request
parameters present in the request URL:

ParameterName1 =
Value1 ;ParameterName2 =
Value2...

These parameters contain the entity names and
occurrence IDs that are used by websetocc to set the current occurrence for the
current component.

## Using Response Headers for Authentication

This example shows how to create a dynamic pop-up
logon box in a browser using a HTTP response header.

* The numeric component variable called
  `vAttempts` holds the number of times that the user tries to log on. If the user
  tries 3 times to logon using wrong logon information, a page with unauthorized information appears
  to the user.
* The server page property State
  Managed by is set to `Cookie`. The cookie stores the state of the
  component variable `vAttempts`

The following code checks the value of the
`vAttempts` variable and if it exceeds 3, it displays a popup with an HTTP error

```procscript
;Execute trigger
webget
if($user !="correct-user" | $password != "password-for-the-correct-user")
   $vAttempts$=$vAttempts$+1 
   ; pop-up a logon box, 
   $webinfo("httpresponseheaders")="%\
      WWW-Authenticate: basic realm=%%"Administrator log-in(%%$tries$%%%)%%"·;%\
      Expires=0·;Cache-Control=no-cache"
   $webinfo("status")="401"
   $webinfo("statusreason")="Unauthorized"
   $webinfo("output")="<html><title>401 - Unauthorized</title>%\
      <body><h1>401- Unauthorized to view this page</h1></body></html>"
else
   $vAttempts$=0
   webgen
endif
```

**Note:**  The `correct-user` and the
`password-for-the-correct-user` are only for demonstration purposes.

## Related Topics

- [HTTP Headers](../../../webapps/applicationissues/datapaging/http_headers.md)


---

# $webinfo: Salt Topics

The SALT, SALTIN, and SALTOUT
topics of $webinfo get and set a string that is used to generate and verify
hashed HTTP requests and responses for static and dynamic server pages.

$webinfo`("`SaltTopic`")`
{`=`SaltString}

vString`=`$webinfo`("`SaltTopic`")`

## Parameters

Parameters

| Parameter | Data Type | Description |
| --- | --- | --- |
| Salt | String | Salt string used to generate and verify a hash for webgen and webget respectively. |
| SaltIn | String | Salt string used by webget to verify a hash. |
| SaltOut | String | Salt string used by webgen to generate a hash. |

## Description

A salt is a string that can be used to hash data,
in this case to verify occurrence information on the server after a round-trip to the browser. This
extends the security of your web application, in addition to that provided by
$SERVER\_SECRET in the assignment file. The SaltString that
you provide can be a user name, or a session ID, login specific information, or any other string
that you can reproduce it in your Uniface web application on the next request.

The salt strings are cleared before the Pre
Request trigger and after the Post Request trigger of the server's application shell are fired,
ensuring that the salt string exists only for the duration of the HTTP request. You should
therefore set the SaltString in the Pre Request trigger of the application
shell, or in the Get State trigger of the component.

## Using a Salt

For example, you could use the following code in
the Pre Request trigger of a web application shell to use the web session ID as a salt. It ensures
that a different hash is used for a different session.

After a session start, the salt is used by
webgen to generate a hash value for occurrence information that is sent to the
browser. If the user modifies and stores an occurrence, webget uses the salt to
check that the hashed occurrence information matches.

After the session expires, it is no longer valid,
so validation by webget for next request will fail. You should therefor check
for error `-259 <UWEBERR_HASH>` after webget. To handle
this error, you could, for example, return to the login page.

```procscript
trigger preRequest; of a web application shell
variables
   string SID
endvariables

  ; Use web session ID as a salt.
  getitem/id SID, $webinfo("WEBSERVERCONTEXT"), "SESSION"
  $webinfo("SALT") = SID
...
end
```

## Related Topics

- [$SERVER_SECRET](../../../configuration/reference/assignments/_server_secret.md)


---

# $webrequesttype

Returns a value indicating the type of request from the browser.

$webrequesttype

## Return Values

Returns a value indicating the type of request
from the browser. The value determines the meaning of
$webinfo`("input")` values.

Valid Values Returned by $webrequesttype

| Value | Meaning |
| --- | --- |
| `"STATIC"` | The input is a normal get/post request. |
| `"DYNAMIC"` | The input is for an AJAX-type request, to be processed using the webload statement |

## Use

Use in dynamic server pages only

## Description

$webrequesttype is typically
used in a Get State trigger to determine whether or not to invoke the webload
statement.

The default code of the DSP Get State trigger uses
webload to load the data from the browser, only when
$webrequesttype returns `DYNAMIC.`

```procscript
;Get State trigger
selectcase $webrequesttype
case "DYNAMIC"
  webload                         ; Get Data
  if ($procerror < 0)
    webmessage/error "webload failed (Get State)%%^$procerror = %%$procerror%%%"
    return (0)
  endif

 ... <snip> ...
endselectcase
```

History

| Version | Change |
| --- | --- |
| 9.4.01 | Introduced |

## Related Topics

- [Get State](../triggersstandard/get_state.md)


---

# $webresponsetype

Returns a value indicating the response expected by the browser for the current DSP
component instance.

$webresponsetype

## Return Values

Returns a value indicating the response expected
by the browser for the current component instance. The value determines the meaning of
$webinfo`("input")` values.

Valid Values Returned by $webrequesttype

| Value | Meaning |
| --- | --- |
| `"FULLPAGE"` | The expected output is a full set of data, definitions, and layout |
| `"UPDATE"` | The expected output is data only. |

## Use

Use in dynamic server pages only.

## Description

This function is typically used in a Set State
trigger to determine whether to invoke the weblayout and
webdefinitions statements.

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

- [Set State](../triggersstandard/set_state.md)


---

# $widgetoperation

Activates a widget operation of the references widget.

$fieldhandle`->`$widgetoperation`(`WidgetOperation {`,`Params}`)`

```procscript
$fieldhandle(HTML_FLD)->$widgetoperation("loadUrl", "www.uniface.com")
```

## Parameters

Parameters

| Parameter | Data Type | Description |
| --- | --- | --- |
| WidgetOperation | String | Literal string or variable containing the name of a widget operation that is available on the specified widget.  For supported widget operations, consult the documentation of the specified widget. See [Applies To](#section_5D3869E5DD7B4EBC9F4E7B37FE8B5EE4). |
| Params | String | Comma-delimited string of operation parameters for the specified function. |

## Return Values

Values Commonly Returned by $procerror after
$fieldhandle and $widgetoperation

| Value | Error constant | Meaning |
| --- | --- | --- |
| `-1101` | `UPROCERR_FIELD` | An incorrect field name was provided; either the field name is not valid syntactically or the field is not available in the component. |
| `-1113` | `PROCERR_PARAMETER` | Parameter is not valid, for example, an empty string (`""`) |
| `-1118` | `UPROCERR_ARGUMENT` | The argument specified is incorrect. For example, there is no mapping between the Uniface and JavaScript data type of a parameter. |
| `-1120` | `UPROCERR_OPERATION` | The operation name provided is not valid. |
| `-1123` | `UPROCERR_NPARAMETERS` | Wrong number of parameters |
| `-1418` | `UPROCERR_FIELD_NOT_VISIBLE` | Field is not visible |
| `-1419` | `UPROCERR_WIDGETOPERATION` | Widget operation not valid |

## Use

Use in form components only.

## Description

Widget operations are predefined, widget-specific
functions that enable you to address the widget content independently of the field value. For most
widgets, the value displayed by the widget is the same as the field value; they are tightly
coupled. However, some widgets do not necessarily display the actual field value. For example:

* In the HTML widget, the user can browse to
  another location without changing the value of the HTML widget, or it may contain JavaScript that
  generated different content.
* The Output Box may contain information that
  has not been synchronized with the field value, or vice versa.

Widget operations make it possible to manipulate
the widget content directly, without interference of the field.

To call a widget operation, you must activate the
$widgetoperation function on a field handle (obtained with
$fieldhandle).

The $fieldhandle function
returns the handle of the widget that is bound, at that moment, to the specified field of the
current occurrence. The function $widgetoperation works only on the widget, even
if the widget has subsequently been bound to a field of some other occurrence. Any actions done on
the widget affect the widget primarily. Depending on the type of widget, the widget may influence
the field value or field properties.

By definition, a widget is always in view, so
scrolling through multiple occurrences causes a different field to be bound to the widget as the
data is scrolled. Calling $widgetoperation on a field that is not visible (for
example, scrolled out of view), results in an error and the widget operation is not performed.

**Note:**  For this reason,
$widgetoperation should not be used if you want to change the displayed content
based on the occurrence being displayed.

If you want the widget to display different
content in each occurrence, you should change the value of the field rather than using widget
operations. Alternatively, you could use the Form Container widget to embed a form that contains
the widget and use $widgetoperation to manipulate the content of the contained
instance.

For more information, see  [$fieldhandle](_fieldhandle.md) and [$widgetoperation](#) and [Effect of Widget Operations in Multi-Occurrence Lists](examples/_widgetoperation_multioccexample.md).

## Applies To

[HTML Widget](../../../_reference/widgets/htmlwidget.md)

[Output Box](../../../_reference/widgets/outputbox.md)

## Using $widgetoperation

```procscript
;vHTMLText is a string variable containing the HTML to be displayed
$fieldhandle(FIELD1)->$widgetoperation("loadHTML", vHTMLText)

;vAlertText is a string variable containing the text to be displayed in the alert box
$fieldhandle(FIELD1)->$widgetoperation("JS:alert", vAlertText)
```

| Version | Change |
| --- | --- |
| 9.6.01 | Introduced |

## Related Topics

- [Effect of Widget Operations in Multi-Occurrence Lists](examples/_widgetoperation_multioccexample.md)
- [$fieldhandle](_fieldhandle.md)


---

# $windowproperties

Set or return the current window properties of a form instance.

Set: $windowproperties
`(`InstanceName
{`,` PropertyList}`)``=`PropertyValuesList

Return: Return`=`$windowproperties `(`InstanceName
{`,` PropertyList}`)`

## Parameters

* InstanceName—name of a form
  instance.
* PropertyList—list of window
  property names, separated by GOLD ; (`;`); can be a string.
* PropertyValuesList—associative list of
  Property=PropertyValue pairs (separated by GOLD ; ), where
  PropertyValue is the value to be assigned to the window property identified by
  Property.

All parameters can be a string, or a variable,
function, or parameter that evaluates to a string, or a field (or indirect reference to a field)
containing a string.

The property name is not case-sensitive; you can
use uppercase or lowercase letters, or any combination of these, to increase readability. If you
specify the property names in PropertyList as literals, a compile check is
performed to check that they are correct.

## Return Values

Returns an associative list of the specified
Property`=`PropertyValue pairs containing the
window properties and their values for the specified form instance.

If the function is used in an assignment, it
returns the defined property string. If PropertyList is not specified or is an
empty string, all window properties are returned.

If an error occurs, $procerror
contains a negative value that identifies the exact error. This function does not affect
$status.

Values of $procerror commonly returned by $windowproperties

| Value | Error constant | Meaning |
| --- | --- | --- |
| -1105 | <UPROCERR  \_INSTANCE> | The instance name provided is not valid. For example, the argument contains incorrect characters. |
| -1110 | <UPROCERR  \_TOPIC> | Property name not known (in either PropertyList or PropertyValuesList) |
| -1132 | <UPROCERR \_UNRESOLVED\_TOPIC> | Property not specified in PropertyValuesList |
| -1302 | <UPROCERR\_SERVICE> | The named instance is not a Form. |
| -1304 | <UPROCERR  \_UNKNOWN\_ CONTEXT> | Function not allowed, unknown context. The InstanceName argument was omitted and one of the following occurred:  There is no current instance, for example in the Application Execute trigger.  The current instance is a form started with `run`. |

## Use

Allowed in form components
. Not applicable in character mode.

## Description

$windowproperties returns or
sets the window properties for the specified form instance, in terms relative to the position and
size of the form's parent window, for example, the Uniface application window.

Size and position properties that are set for
contained forms are ignored. If the OkButton property is set on a non-mobile
platform, it is ignored.

## Window Properties

Properties set by $windowproperties

| Physical Property | Property | Description |
| --- | --- | --- |
| BackColor | [Background Color](../../../development/reference/devobjproperties/widgets/_common/backcolor_backgroundcolor.md) | Background color of the window. |
| ForeColor | [Foreground Color](../../../development/reference/devobjproperties/widgets/_common/forecolor_foregroundcolor.md) | Foreground color of the window, |
| BackImage | [Background Image](../../../development/reference/devobjproperties/_common/backimage.md) | Background image of the window. |
| HAlign | [Horizontal Alignment](../../../development/reference/devobjproperties/widgets/_common/halign_horizontalalignment.md) | Horizontal alignment of the background image |
| VAlign | [Vertical Alignment](../../../development/reference/devobjproperties/widgets/_common/valign_verticalalignment.md) | Vertical alignment of the background image |
| HScale | [Horizontal Scaling](../../../development/reference/devobjproperties/widgets/_common/hscale_horizontalscaling.md) | Horizontal scaling of the background image |
| VScale | [Vertical Scaling](../../../development/reference/devobjproperties/widgets/_common/vscale_verticalscaling.md) | Vertical scaling of the background image |
| PreserveAspect | [Preserve Aspect Ratio](../../../development/reference/devobjproperties/widgets/_common/preserveaspect_preserveaspectratio.md) | Indicates whether the aspect ratio of the image should be preserved. |
| State1 | [state](../../../development/reference/devobjproperties/window/winstate_state.md) | The window state.  `NORMAL` (default)  `MAXIMIZED`  `MINIMIZED`  `CENTERED` (can be set but not returned) |
| OKButton | [OK Button (Mobile)](../../../development/reference/devobjproperties/window/okbutton_mobile.md) | Displays an OK button to save and close the application, instead of an X button to minimize. Applicable only for mobile applications. |
| XPos123 |  | The horizontal window position, relative to the parent window. |
| YPos123 |  | The vertical window position, relative to the parent window. |
| XSize124 |  | The horizontal window size. |
| YSize124 |  | The vertical window size. |
| XPosPerc13 |  | The horizontal window position, as a percentage relative to the parent window. |
| YPosPerc13 |  | The vertical window position, as a percentage relative to the parent window. |
| XSizePerc14 |  | The horizontal window size, as a percentage relative to the parent window. |
| YSizePerc14 |  | The vertical window size, as a percentage relative to the parent window. |

1. Not applicable for contained forms
2. Position and size is set in pixels (for
   example, `235` or `235px`) and returned in pixels.
3. Must be a positive or negative integer.
4. Must be a positive integer.

## Setting Properties Without PropertyList

All properties specified in the
PropertyValuesList are assigned their corresponding value. All other properties
are restored to their default value. For example:

* ```procscript
  $windowproperties("MYFORM") = "XPOS=50"
  ```

  Result: xpos is set to
  `50` pixels and all other window properties are restored to their default values.
* ```procscript
  $windowproperties("MYFORM") = ""
  ```

  Result: All properties are restored to their
  default values.
* ```procscript
  $windowproperties("MYFORM") = "backcolor="
  ```

  Result: backcolor, and
  all other window properties, are restored to their default values.

## Setting Properties Using PropertyList

Only those properties that exist in both the
PropertyList and the PropertyValuesList are assigned the
value specified in the PropertyValuesList. All other properties remain
unchanged. For example:

* ```procscript
  $windowproperties("MYFORM","xpos;ypos") = "xpos=5px;ypos=2"
  ```

  Result: xpos is set to 5
  and ypos to `2`.
* ```procscript
  $windowproperties("MYFORM","backcolor") = "backcolor="
  ```

  Result: backcolor is
  restored to its default value
* ```procscript
  $windowproperties("MYFORM”,"") = "xpos=5px"
  ```

  Result: Nothing happens
* ```procscript
  $windowproperties("MYFORM","ypos") = "xpos=5px"
  ```

  Result: Nothing happens
* ```procscript
  $windowproperties("MYFORM","ypos”) = ""
  ```

  Result: Nothing happens

## Restoring Default Values

When you restore a property to its default value,
it reverts to the highest ranking statically-defined value. For example for Background
Color, this means:

1. Color defined in the window property window of
   the form.
2. Color defined in the application
   .ini file for `uwindow`
3. Uniface default color for
   `uwindow`

## Getting Properties Without PropertyList

If PropertyList is omitted,
all properties and their values are returned.

```procscript
vAllPropsValues = $windowproperties("MYFORM")
```

## Getting Properties Using PropertyList

You can use $windowproperties
to retrieve the values of specified properties. Only the values of the properties specified in the
PropertyList are returned. For example:

* ```procscript
  vHorizontalPos = $windowproperties("MYFORM", "XPOS")
  ```

  Result: `vHorizontalPos =
  "XPOS=6"`
* ```procscript
  vHorizontalPos = $windowproperties("MYFORM", "")
  ```

  Result: `vHorizontalPos =
  ""`

## Getting Active Values

If you have used
$windowproperties to set property values, these cannot be returned by
$windowproperties until after a show command. For
example:

```procscript
;Set the XPOS and YPOS values 
$windowproperties("MYFORM",XPOS,YPOS) = "XPOS=-100;YPOS=-100"
show

;Retrieve the values of XPOS and YPOS
vPos = $windowproperties("MYFORM","XPOS;YPOS")
;vPos = "XPOS=-100;YPOS=-100"
```

## Restrictions and Precedence of Properties

Implicit data type conversion is used to convert
any non-numeric values to numeric values. Values outside the allowed boundaries of the underlying
operating system are corrected by the operating system. For example, if you set
XPOS to a value of 1000000, the operating system would change this value to
the maximum allowed value for XPOS.

The settings for position and size properties of a
form that you specify in the Form Editor are not the same as the absolute
position and size that you can set using $windowproperties at run time.

* The form geometry is expressed in columns and
  rows, whereas $windowproperties sets and retrieves the value in pixels.
* The declared form size does not take into
  account the size of panel and/or menus. The window size that is used by
  $windowproperties defines the outer boundaries of the form and includes the
  menu, panel, and border, but not the window frame and title bar.

Some properties are not applicable to contained
forms. When a form is of Window Type`Contained`, the widget
that contains the form controls the size and position of the form. When setting these properties
they will be ignored.

In case of conflicting values, setting the
State property takes precedence over setting position and size properties.
Setting the percentage properties for position and size takes precedence over setting the absolute
properties for position and size.

## Returning the Values of Window Properties

The following example returns the values of
window properties:

```procscript
variables
   string vPos ; a list
   numeric vXpos, vYpos
   string vColor
endvariables

vPos = $windowproperties("MYFORM", "XPOS;YPOS")
vXpos = $item("XPOS", vPos)
vYpos = $item("YPOS", vPos)
vColor = $windowproperties("MYFORM", "BACKCOLOR")
```

## Setting the Values of Window Properties

Each of the following statements sets the color of
the form to light blue:

```procscript
$windowproperties ("MYFORM", "BACKCOLOR") = "BACKCOLOR=lightblue"
$windowproperties ("MYFORM", "BACKCOLOR") = "BACKCOLOR=#ADD8E6"
```

The following examples set the
XPOS property to 6 (pixels) in two different ways (the values are determined
using implicit type conversion):

```procscript
;Setting XPOS
$windowproperties("MYFORM", "XPOS") = "XPOS=6"

;Setting dimensions using a variable
vLayout = "XPOS=6;YPOS=20;XSIZE=600;YSIZE=450"
$windowproperties("MYFORM", "XPOS") = vLayout ; Other properties unchanged
```

The following examples set the values of the
XPOS and YPOS properties:

```procscript
;Setting XPOS and YPOS
$windowproperties("MYFORM", "XPOS;YPOS") = "XPOS=6;YPOS=20"

;Setting XPOS and YPOS using variable
vLayout = "YSIZE=450;XSIZE=600;YPOS=20;XPOS=6" 
$windowproperties("MYFORM", "XPOS;YPOS") = vLayout
; Result: XPOS = 6 and YPOS = 20, other properties unchanged
```

## Setting the Values of Window Properties for Two Forms

The following example sets the dimensions of FORM2
to the same dimensions as FORM1:

```procscript
$windowproperties("FORM2", "XSIZE;YSIZE") = $windowproperties("FORM1", "XSIZE;YSIZE")
```

The following example displays FORM1 and FORM2
beside each :other in the parent window:

```procscript
vLayout1 = "XPOSPERC=0;XSIZEPERC=50;YPOSPERC=0;YSIZEPERC=100"
vLayout2 = "XPOSPERC=50;XSIZEPERC=50;YPOSPERC=0;YSIZEPERC=100"

$windowproperties("FORM1", "XPOSPERC;YPOSPERC;XSIZEPERC;YSIZEPERC") = vLayout1
$windowproperties("FORM2", "XPOSPERC;YPOSPERC;XSIZEPERC;YSIZEPERC") = vLayout2
```

## Removing a Background Image

It is not possible to remove property values, so
if you want a property to be applied only in specific circumstances, ensure that it is not set
declaratively in the form definition. You can then set it and clear it as required using
$windowproperties.

For example, assume that you want to add a
background image in certain conditions. For a Record Form, set a background image in the Read
trigger:

```procscript
;Read trigger
read
if ($status = 0)
   $windowproperties("FORM2", "backimage") = "backimage=@%%LOGO.MYENT%%%.png")
endif
```

And remove it in the Clear trigger:

```procscript
$windowproperties("FORM2", "backimage") = "backimage="
```

---

# Addressing Environment Variables with $setting

You can use $setting to retrieve and set environment variables or
their platform-specific equivalents, data areas and environment
variables on iSeries. On Windows and Unix, it is only possible to address environment variables for
the current process.

Retrieve environment variables:

ReturnedValue =
$setting`(`Source`,` RetrieveProfile`,``"`ENVVARS
| ENVDATA`")`

```procscript
vEnvVariables = $setting ("", "u*", "ENVVARS") 
vEnvVar = $setting ("", "SRC", "ENVDATA")
```

Add or change a setting:

$setting
`(`Source`,` EnvironmentVariable`,``"`ENVDATA`"``)``=`Value

```procscript
$setting ("GLOBAL", "MYAPP", "ENVDATA") = "abcd"
```

## Parameters

Parameters

| Parameter | Data Type | Description |
| --- | --- | --- |
| ENVDATA | String | Get or set an environment variable, logical, or data area. Wildcards are not allowed. The maximum length that can be assigned to an environment variable is 4096 bytes. |
| ENVVARS | String | Get a list of environment variables, data areas (iSeries). Wildcards can be used. |
| RetrieveProfile | String | Profile to retrieve one or more environment variables or their equivalent. To retrieve multiple sections or settings, you can use the GOLD \* and GOLD ? characters. The profile must match the Topic. |
| Source | String | Location of the environment variable or equivalent construct.   * Empty string   (`""`)—default source, which are environment variables for the current process. * Platform-specific location or keyword   on iSeries:    + LibraryName—data area   + `*SYS`—system-level     environment variable   + `*SYSVAL`—system-level environment     variable   + `*JOB`—job-level     environment variable; same as empty string |

## Addressing Environment Variables

To address environment variables (or their
equivalent constructs), you need to specify the Source as an empty string
(`""`) or a platform-specific source, and the Topic as
ENVARS or ENVDATA.

**Note:**  On Windows and Unix, you can retrieve both
system and local (process-specific) environment variables, but you can only set them for the
current process.

```procscript
$setting("",EnvironmentVariable, ENVDATA)$setting("",RetrieveProfile, ENVVARS)
```

On iSeries:

```procscript
$setting(LibraryName | *SYS | *JOB | *SYSVAL, Setting, ENVDATA)$setting(LibraryName | *SYS | *JOB | *SYSVAL, RetrieveProfile, ENVVARS)
```

For example:

* Retrieve a list of variables (symbols,
  logicals, or data areas) within the current process (symbol, logical table, or library). For
  example, to get a list of all logicals that start with an A:

  ```procscript
  vEnvVars = $setting ("", "A*", "ENVVARS")
  ```
* Retrieve the value of a specific environment
  variable (or symbol, logical, or data area)

  ```procscript
  vEnvVar = $setting ("", "SRC", "ENVDATA")
  ```

  ```procscript
  vLogical = $setting ("GLOBAL", "MYAPP", "ENVDATA")
  ```

  ```procscript
  vLogical = $setting ("PROCESS", "USYS$ADM", "ENVDATA")
  ```

  ```procscript
  vDataArea = $setting ("DLM", "DLM_ROOT", "ENVDATA")
  ```
* Modify or add a specific environment variable
  (or symbol, logical, or data area)

  ```procscript
  $setting ("", "SRC", "ENVDATA") = "c:\u9201"
  ```

  ```procscript
  $setting ("GLOBAL", "MYAPP", "ENVDATA") = "abcd"
  ```

  ```procscript
  $setting ("PROCESS", "USYS$ADM", "ENVDATA") = "abcd"
  ```

  ```procscript
  $setting ("DLM", "DLM_ROOT", "ENVDATA") = "abcd"
  ```

---

# Addressing Initialization and Assignment Settings with $setting

You can use $setting to add or change the value of an
initialization or assignment setting, and to retrieve lists of settings or file sections. It is not
possible to add file sections.

Add or change a setting:

$setting
`(`ConfigFile`,` Section\Setting`,``"`INIDATA`"``)``=`Value

```procscript
$setting ("C:\my_app.ini", "upi\msglines", "INIDATA") = 5
```

Retrieve settings:

ReturnedValue =
$setting`(`ConfigFile`,` RetrieveProfile`,``"`INISECTIONS
| INISETTINGS | INIDATA`"``)`

```procscript
vSections = $setting ("C:\my_app.ini", "u*", "INISECTIONS") 
vSettings = $setting ("", "upi\*", "INISETTINGS")
vValue = $setting ("", "upi\msglines", "INIDATA")
```

## Parameters

Parameters

| Parameter | Data Type | Description |
| --- | --- | --- |
| ConfigFile | String | Location of the setting or settings. Valid values are:   * Empty string (`""`)—the   .ini file specified by /ini , or the default    usys.ini. * IniFile—name of an   initialization file. * AsnFile—name of an   assignment file. The name must end with the .asn extension. |
| RetrieveProfile | String | Profile to retrieve the desired sections or settings. The profile must match the Topic. To retrieve multiple sections or settings, you can use the GOLD \* and GOLD ? characters. |
| Section\Setting | String | Initialization or assignment setting whose value you want to retrieve or set. |
| INIDATA | String | Set or get the value of a setting in ConfigFile. Wildcards are not allowed, and the RetrieveProfile or setting specification must include the field section in which the setting is located. |
| INISETTINGS | String | Get a list of settings within the specified section. Wildcards can be used for Setting, but not for Section. For example:   ```procscript vSettings = $setting ("", "upi\*", "INISETTINGS") ``` |
| INISECTIONS | String | Get a list of file sections in ConfigFile. Wildcards can be used. For example:   ```procscript vSections = $setting ("C:\my_app.ini", "u*", "INISECTIONS") ``` |

## Syntax of RetrieveProfile and Setting

The second parameter of
$settings can specify a retrieve profile or a specific setting. You can use the
following syntax:

Section`\`Setting

If Topic is
INISETTINGS and INIDATA, the Section
must be explicitly defined. If Setting is empty, an error is returned if
Topic is INISETTINGS or INIDATA.

If Topic is
INISECTIONS, specifying Setting returns an error.

## Effect of Topic on Second Parameter

The way Uniface interprets the second parameter
depends on the value of the Topic parameter.

* When Topic is
  INIDATA, the second parameter is always interpreted as a specific setting and
  it cannot contain wildcards (GOLD \* and GOLD ?) . The setting specification *must*
  include the file section. For example:

  ```procscript
  ; set the value of the translines setting 
  $setting("usys.ini","upi\translines", "INIDATA") = 5000

  ; retrieve the value of Uniface's javascript path:
  vSetting = $setting("usys.ini","paths\javascript", "INIDATA")
  ```
* When Topic is
  INISETTINGS or INISECTIONS, the second parameter is
  interpreted as a retrieve profile, so it can contain wildcards (GOLD \* and GOLD ?). For
  example:

  ```procscript
  ;retrieve vSections = $setting("","*","INISECTIONS")
  vSettings = $setting("usys.ini","paths\*", "INISETTINGS")
  ```

  **Note:**  When using INISETTINGS,
  it is not possible to use wildcards in both the Section and
  Setting part of the second parameter. To retrieve a list of all initialization
  or assignment settings in a source, you need to first get a list of all the file sections, and then
  loop through that list to get a list of the settings in each section. See
  [Retrieve a List of All Settings in a Source](#Retrieve).

## Adding or Changing a Setting

You can add or modify a setting only if
Topic is INIDATA. If the setting does not exist, it is
added to the end of the section. If the setting already exists, the value is changed.

To set the value, put the
$setting function on the left side of an assignment.

**Note:**  It is not possible to add a section to an
initialization or assignment file using $setting.

## Using $setting with Initialization Files

On Windows, the global (and default)
initialization file is usys.ini. You can specify the
ConfigFile as an empty string (so usys.ini is used) or as a
specific initialization file. On other platforms, initialization files are user-defined.

When retrieving multiple sections or sections, use
a retrieve profile (GOLD \*).

For example:

* To retrieve a list of sections starting with
  `U` from an my\_app.ini file:

  ```procscript
  vSections = $setting ("C:\my_app.ini", "u*", "INISECTIONS")
  ```
* To retrieve a list of settings within a
  section of usys.ini:

  ```procscript
  vSettings = $setting ("", "upi\*", "INISETTINGS")
  ```
* Retrieve the value of a specific setting in
  usys.ini:

  ```procscript
  vValue = $setting ("", "upi\msglines", "INIDATA")
  ;vValue = $setting ("", "[upi]msglines", "INIDATA") ;alternative Setting syntax
  ```
* To modify or add a specific setting to the
  my\_app.ini file:

  ```procscript
  $setting ("C:\my_app.ini", "upi\msglines", "INIDATA") = 5
  ```

## Using $setting with Assignment Files

Uniface assignment files have the same format as
initialization files, so it is possible to manipulate assignment settings and file sections as if
they were initialization settings.

However, $settings behaves
slightly differently for an assignment file than an initialization file:

* It determines the assignment file semantics
  based on the file name (it must end in .asn) and the section name (it must be
  a valid section file name).
* For Uniface assignment files, settings in the
  [SETTINGS] and [PROXY\_SETTINGS] sections can be specified with or without underscores.
* A setting that does not take a value, returns
  the string value `"True"`. In initialization files, such a setting returns an empty
  string `""`.

## Retrieve a List of All Settings in a Source

The following example retrieves a list of all
settings in the default usys.ini file.

```procscript
variables
  string vSections, vSection,  vItemId1, vItemId2, vSettings,  vResult
endvariables

vSections = $setting("","·*","INISECTIONS") 

forlist vItemId1 in vSections 
  vSection=$concat (vItemId1,"/·*") 
  vSettings=$setting("",vSection,"INISETTINGS") 
  forlist vItemId2 in vSettings 
    putitem vResult, -1, vItemId2  
  endfor
endfor
```

1. Retrieve the list of sections in the source
   file. Since no source is specified, the usys.ini is used.
2. For each section in the returned list:
3. Construct the retrieve query for
   settings by concatenating the section name (section) with the GOLD \* wildcard.
4. Retrieve the list of settings in
   the specified section.
5. For each setting in the returned list:
6. Add the item to the results
   list.

---

# Addressing Registry Keys with $setting

Retrieve, add, or change registry keys on Windows
platforms.

Retrieve settings:

ReturnedValue =
$setting`(`Registry`,` RetrieveProfile`,``"`REGKEYS | REGVALUES |
REGDATA`"``)`

```procscript
vRegKeys = $setting ("", "HKEY_CURRENT_USER\Software\Uniface\Uniface 9\*", "REGKEYS")
vRegValues = $setting ("", "HKEY_CURRENT_USER\Software\Uniface\Uniface 9\State\MyApp\P" "")
```

Add or change a setting:

$setting`(`Registry`,` Key\SubKey`,``"`REGDATA`"``)``=`Value

```procscript
$setting ("", "abcd", "REGDATA") = "Hello"
```

## Parameters

Parameters

| Parameter | Data Type | Description |
| --- | --- | --- |
| Registry | String | * Empty string   (`""`)—default source, which is the Registry of the current machine * `//`MachineName—Registry   of remote machine |
| RetrieveProfile | String | Profile to retrieve the desired section or setting, as defined by Topic (REGKEYS, REGVALUES, or REGDATA). To retrieve multiple sections or settings, you can use the GOLD \* and GOLD ? characters. The profile must match the Topic. |
| Key | String | Registry key; equivalent to an initialization file section. |
| Subkey | String | Registry subkey; equivalent to an initialization setting. |
| REGDATA | String | Get or set the registry value. Wildcards are not allowed. |
| REGVALUES | String | Get a list of registry values under the specified key. Wildcards are allowed for Setting (in this case, the value) but not for Section (the key).  Each returned item in the list has the form `Value=Type`). For example, `""=REG_SZ;A=REG_DWORD` |
| REGKEYS | String | Get a list of subkeys under the specified key. Wildcards can be used for Subkey (in this case, the subkey) but not for Key (the key). |

## Addressing Registry Keys

On Windows, although the .ini
file is usually used for initialization settings, when a Uniface application closes, its state is
stored under the key `HKEY_CURRENT_USER\Software\Uniface\Uniface
Version\State\Application` key in the Windows
Registry.

**Caution:** 

Making changes to the Registry can significantly
affect your computer, so use due care when using $setting and
deletesetting. Uniface cannot be held responsible for changes you make to your
Registry

To address the Registry of the current machine,
specify Source as an empty string (`""`).

If you want to address an alternate registry (for
example, for a 32-bit uniface installation running on a 64-bit machine), you can explicitly specify
Source as `"32"` or `"64"`:

```procscript
$setting("32", "HKEY_LOCAL_MACHINE\SOFTWARE\Setting_32", ....
$setting("64", "HKEY_LOCAL_MACHINE\SOFTWARE\Setting_64", ....
```

On 32-bit platforms `""` is
equivalent to `"32"` and on 64-bit platforms `""` is equivalent to
`"64"`.

To address the Registry of a remote machine,
specify Source as the machine's network name, preceded by two slashes; for
example, `"\\apollo"`. (The Remote Registry Service must be running on the remote
machine, and accessing the registry of that machine must be allowed by that machine for the current
user).

The value of the Setting
parameter depends on the Topic.

Registry keys can be fully specified, including
the `HKEY_` part. If not fully-specified, the key will be relative to
`HKEY_CURRENT_USER\Software\Uniface\Uniface 9`.

The value of the Setting
parameter depends on the Topic. When addressing Setting
values (using the topic keywords REGVALUES or REGDATA),
it is possible to include square brackets in the specification. For example, the following
statements are equivalent:

```procscript
$setting("", "HKEY_LOCAL_MACHINE\SOFTWARE\keyName","REGDATA") = "abc"
$setting("", "[HKEY_LOCAL_MACHINE\SOFTWARE]keyName", "REGDATA") = "abc"
```

However, using REGKEYS will
cause the error `-1118`.

## Setting Values

To set a registry value set
Topic as `REGDATA`. For example, to modify or add the data value
of the registry value `"abcd"` under the registry key
`"HKEY_CURRENT_USER\Software\Uniface\"` :

```procscript
$setting ("", "abcd", "REGDATA") = "Hello"
vRegData = $setting("", "HKEY_CURRENT_USER\Software\Uniface\Uniface 10\abcd", "REGDATA")
;vRegData="Hello"
```

When setting a registry value:

* If you assign the value of a field, the data
  type of the field determines the type of the registry value: Numeric becomes
  `REG_DWORD`, String becomes `REG_SZ`, and Raw becomes
  `REG_BINARY`.
* If you assign to a registry value named
  `""`, you are assigning to the default value, represented
  by`"(Default)"` .
* If the registry value does not exist, it is
  added under the registry key; the default type of the new registry value is
  `REG_SZ`.
* If the registry value exists, it is changed;
  the type remains unchanged.

## Retrieving Values

When retrieving a specific value, if the value
does not exist, an empty string is returned and $procerrror is
`-1118`. If the value does exist, it is returned as a string and
$procerror is `0`, even if the setting exists but is empty.

When retrieving a list of values, the returned
list is in the form
Value1`=`DataType1;Value2`=`DataType2.
For example:

`"windowsize=REG_SZ·;windowpos=REG_SZ"`

For example:

* Retrieve a list of subkeys under a registry
  key. For example:

  ```procscript
  vRegKeys = $setting ("", "HKEY_CURRENT_USER\Software\Uniface\Uniface 10\*", "REGKEYS")
  ;Result: vRegKeys = "History·;PRT_NETWORK·;PRT_NETWORK PRINTER·;State"
  ```
* Retrieve a list of registry values under a
  registry key. For example:

  ```procscript
  vRegValues = $setting ("", "HKEY_CURRENT_USER\Software\Uniface\Uniface 10\State\MyApp\P*", "REGVALUES")
  ;Result: vRegValues = "panelsize=REG_SZ·;panelpos=REG_SZ·;panel=REG_SZ·;panelmin=REG_SZ"
  ```
* Retrieve the contents of a specific registry
  value. For example:

  ```procscript
  vRegData = $setting ("", "[HKEY_CURRENT_USER\Software\Uniface\Uniface 10\State\MyApp]panel", "REGDATA")
  ;Result: vRegData = "on"
  ```

## Specifying Sections and Settings

Section may be required or
optional, depending on the Topic:

* Required for REGVALUES
  and REGDATA.
* Omitted for REGKEYS

If Setting is empty, an error
is returned if Topic is REGVALUES or
REGDATA.

Specifying Setting returns an
error if Topic is REGKEYS.

## Adding or Changing a Setting

You can add or modify a setting only if
Topic is REGDATA. If the setting does not exist, it is
added to the end of the section. If the setting already exists, the value is changed.

To set the value, put the
$setting function on the left side of an assignment.

## Registry Settings

Return the registry
value`"(Default)"` under the registry key
`HKEY_CURRENT_USER\Software\Uniface`.

```procscript
vRegValue = $setting ("", "[HKEY_CURRENT_USER\Software\Uniface]", "REGDATA")
```

Set the value of the registry value
`"abcd"` under the registry key `HKEY_CURRENT_USER\Software\Uniface`
to 15 (type is `REG_DWORD`).

```procscript
variables
   numeric vNum
endvariables

vNum = 15
$setting ("", "HKEY_CURRENT_USER/Software/Uniface/abcd", "REGDATA") = vNum
```

Return a list of all the subkeys under
`HKEY_CURRENT_USER\Software\Uniface`:

```procscript
VSettings = $setting ("", "HKEY_CURRENT_USER\Software\Uniface\*", "REGKEYS")
```

## Related Topics

- [Migrate Logical Printers](../../../migration/tasks/migratelogicalprinters.md)


---

# Addressing Runtime Settings with $setting

Retrieve, add, or change Uniface runtime settings. On most platforms, it is only
possible to address WORKDIR and the USYS path logicals. However, on Windows,
other runtime settings can be retrieved or set.

Retrieve settings:

```procscript
ReturnedValue=$setting("USYS" | , RetrieveProfile,"USYSDATA | USYSSETTINGS { | USYSECTIONS}")
```

```procscript
vWorkingDir = $setting("usys", "[paths]workdir", "USYSDATA")
```

Add or change a setting:

$setting `(``"`USYS`"``,` Section\Setting`,``"`USYSDATA`"``)``=`Value

```procscript
$setting ("USYS", "[PATHS]WORKDIR", "USYSDATA") = ".bda/uniface/data"
```

## Parameters

Parameters

| Parameter | Data Type | Description |
| --- | --- | --- |
| USYS | String | Runtime initialization settings; valid only if Topic is USYSDATA or USYSSETTINGS |
| `""` |  | Runtime initialization file sections. Use with USYSSECTIONS. |
| RetrieveProfile | String | Profile to retrieve the desired sections or settings. The profile must match the Topic. To retrieve multiple sections or settings, you can use the GOLD \* and GOLD ? characters. |
| Section\Setting | String | Initialization or assignment setting whose value you want to retrieve or set. |
| USYSDATA | String | Get or set a runtime setting. Wildcards are not allowed, and the RetrieveProfile or Setting specification must include the field section in which the setting is located. |
| USYSSETTINGS | String | Get a list of runtime settings within the specified section. Only a limited set of runtime settings can be retrieved. Wildcards can be used for Setting, but not for Section.   ```procscript vSettings = $setting ("USYS", "*", "USYSSETTINGS") ``` |
| USYSSECTIONS | String | If Source is an empty string, get a list of file sections. Equivalent to INISECTIONS. |

## Description

To address runtime settings, specify the
Source as `"`USYS`"` and the
Topic as `"`USYSSETTINGS`"`
or `"`USYSDATA`"`. The way the second parameter
is interpreted depends on the value of Topic

```procscript
$setting ("USYS", "Section\Setting, "USYSDATA")$setting ("USYS", "Section\RetrieveProfile, "USYSSETTINGS")
```

For example, to access the value of
USYSADM logical, use:

```procscript
$setting("usys","paths\usysadm","USYSDATA")
```

**Note:**  The WORKDIR setting and the
USYS path logicals are the only runtime settings that can be read and set on all platforms.

Modifying WORKDIR setting
immediately changes the working directory. Changing the runtime value of a USYS logical in the
[paths] section has an immediate effect on file paths that are using these logicals (for example:
`usysadm:myasn.asn`).

## Addressing Runtime Settings on Windows

On Windows platforms, it is possible to read and
set runtime values of many initialization settings. Runtime values are not necessarily the same as
the values specified in the application's .ini. For example, if a setting was
omitted in the .ini file, Uniface uses a default runtime value.

Some settings are used by Uniface only at startup
and never again; changing such settings at runtime will not have any effect. Also,
$setting never triggers GUI changes, so if you change a setting that has a
visual effect, that effect will not be visible on the current form, but only on forms that are
started after the setting was changed.

By setting Source to
`"`USYS`"` and Topic to
`"`USYSSETTINGS`"` or
`"`USYSDATA`"`, you can dynamically change the
values of settings that Uniface is actually using, without modifying the .ini
file or registry value it came from. However, it is only possible to do so for settings in the
following sections or registry keys:

* [upi]
* [hotkeys]
* [application]
* [debug]
* [toolbar]
* [state]
* [help]
* [paths]—only `WORKDIR` and the
  logical paths that start with `USYS` can be read or changed at runtime

For example:

```procscript
vRuntime = $setting ("usys", "hotkeys\button1", "USYSDATA")
```

The following restrictions apply:

* The use of
  `"`USYS`"` as a Source is
  only supported for the Topic parameters
  `"`USYSDATA`"` and
  USYSSETTINGS. It is not supported
  for`"`USYSSECTIONS`"`. To find out which
  settings in a section are supported, use $setting to retrieve a list of settings
  in one of the above-mentioned sections.
* Although it is not an error to read and write
  settings into the registry or an .ini file that Uniface does not know about,
  if you try to set a runtime setting that Uniface does not support, Proc error
  `-1118` will be issued. This also happens if the setting is a supported one, but it
  comes from a different section than the above-mentioned ones.
* In the [hotkeys] section, you can set
  `ALL` to a value, but you cannot retrieve the value of `ALL`.

## Getting Names of Configuration Files

The following examples show how you can obtain the
names of assignment and initialization files:

* Retrieve the .ini file
  specified by /ini or the default usys.ini:

  ```procscript
  vUsysInitFile = $setting("usys", "[files]usysini", "USYSDATA")
  ```
* Retrieve the assignment file specified by
  /asn or the default application assignment file:

  ```procscript
  vUserAsnFile = $setting("usys", "[files]userasn", "USYSDATA")
  ```
* Retrieve the name of the Uniface default
  assignment file (usys.asn):

  ```procscript
  vUsysAsnFile = $setting("usys", "[files]usysasn", "USYSDATA")
  ```

---

# Effect of Widget Operations in Multi-Occurrence Lists

Using widget operations to address widgets in a multi-occurrence list can result in a
discrepancy between the data displayed in the widget and the actual occurrences.

To understand the effect that using
$widgetoperation can have with multiple occurrences, consider a form that
displays 3 occurrences of an entity that contains two HTML widget fields.

For FLD1, Use Field Value is `True`.

For FLD2, Use Field Value is `False`.

The Execute trigger contains the following
code:

```procscript
;Execute trigger
variables
	numeric vCounter
endvariables

  for vCounter = 1 to 10
      creocc "MYENT", vCounter 
     FLD1.MYENT = "This is occurrence no. %%$curocc(MYENT)%%%" 
     $fieldhandle("FLD2.MYENT")->$widgetoperation("loadHTML", "<html>%%FLD1.MYENT</html>")
  endfor
  edit
end; exec
```

1. Create 10 occurrences of the entity.
2. For each occurrence, assign a value to FLD1
   showing the current occurrence number .
3. For each occurrence, use the
   loadHTML widget operation to load the value of FLD1 into the FLD2 widget,
   without changing the value.

You might expect both fields to contain the same
content, but this is not the case, as shown in the following illustration.

HTML Widget in Multiple Occurrences

When the first three occurrences are created, the
loadHTML widget operation is fired for the visible widgets and the HTML is
loaded into the widgets as expected. Thereafter, as each new occurrence is created, it is bound to
the third FLD2 widget and the new information is loaded into the widget.

When you scroll through these occurrences, the
FLD1 widgets are correctly updated because their field value has changed. The field value of the
FLD2 widgets has not changed, so they continue to display the same data.

---

# Information Returned for Web Services Call-Out Errors

If an error occurs when calling out to a web service, Uniface generates error
`-150` and provides details in $procerrorcontext. One type of
error could be a SOAP Fault received from the remote web service provider. Most of the information
about the fault is provided as a Uniface list under the `ADDITIONAL` ID.

## Location of the Error

The `LOCATION` item under the `ADDITIONAL` identifier gives
the stage of SOAP call-out in which the error was detected. It can contain one of the following
values:

Values of LOCATION

| Value | Meaning |
| --- | --- |
| `DRIVER` | Error occurred while initializing or calling the SOAP connector; for example, during call validation; local error. |
| `INSTANCE` | Error occurred while gathering information about the component and operation; for example, during signature lookup or WSDL parsing; local error. |
| `REQUEST` | Error occurred while preparing the SOAP envelope; for example, while creating serialisers and deserialisers and the SOAP envelope itself. After the invocation and callbacks, this location also handles the response handling, provided the response is not a SOAP fault; local error. |
| `CALLBACK_PRE` | Error occurred while processing the list of SOAP\_CALLOUT\_PRE operations; callback operation error |
| `INVOCATION` | Error occurred while sending or receiving the SOAP envelope over the network; local error. |
| `CALLBACK_POST` | Error occurred while processing the list of SOAP\_CALLOUT\_POST operations; callback operation error |
| `SOAPFAULT` | SOAP fault returned by the web service; remote error. |

For each `LOCATION`, the error is further described using the items
`CODE`, `MESSAGE`, `ACTOR`, and
`DETAIL`

## Information Returned for Local Errors

Local errors can occur when preparing a call-out request or processing the response. They
can include errors that occurr when executing callback operations. Any value of
`LOCATION`, except `SOAPFAULT`, indicates a local error. (If
`LOCATION=SOAPFAULT`, a remote error occurred.)

SOAP Error Items

| Item | Meaning |
| --- | --- |
| `CODE=`ErrorCode | Short form the error description; mandatory. |
| `MESSAGE=`ErrorString | Long form of the error description; mandatory. |
| `ACTOR=` | If `LOCATION` is `CALLBACK_PRE` or `CALLBACK_POST`, the component name and operation of the callback operation, or a string giving actor information, as defined by the developer. |
| `DETAIL=` | A string giving further application or processing details about the error, if available. |

For example, the following table shows some examples of information that could be returned
for local errors detected when calling the SOAP connector or the component signature:

Examples of Information About Local Errors

|  | Error When Calling SOAP Connector | Error When Calling Component |
| --- | --- | --- |
| Item | Value |  |
| `LOCATION=` | `DRIVER` | `INSTANCE` |
| `CODE=` | `NOT_SUPPORTED` | `WSDL` |
| `MESSAGE=` | `Soap component engine call not supported` | `WSDL reader error` |
| `DETAIL=` | `SOAPCE::soapNewInst Statefull Web service component is not supported` | `Importing WSDL from location http://...` |

## Information Returned for Callback Operation Errors

Callback operation errors are local errors that may occur when executing a callback
operation. If `LOCATION=CALLBACK_PRE` or `CALLBACK_POST`, the
information returned in $procerrorcontext depends on what the Uniface developer
did when implementing the SOAP callback operations for web services
(SOAP\_CALLOUT\_PRE and SOAP\_CALLOUT\_POST).

When implementing a callback operation, you can return `-1` to indicate an
error and fill the envelope string parameter with an error message. The envelope parameter may be
empty, or contain a simple string, or an associative list. The associative list may contain any of
the following key values that are defined in $procerrorcontext:

SOAP Error Information for SOAP Callback Operations

| Item | Meaning | Default, if not specified |
| --- | --- | --- |
| `CODE=`ErrorCode | Error code, or `Client` if not specified | `Client` |
| `MESSAGE=`ErrorString | Error message.  Complete returned envelope string, if none of these items are found and the envelope does contain a returned string. | `Error was detected in callout callback operation` |
| `ACTOR=` | String giving actor information, as defined by the developer.  If not specified, the component name and operation of the callback operation are provided. | `CallbackComponentName.Operation` |
| `DETAIL=` | String givng more details about the error.  There is no default value; if not specified, it will not be present in $procerrorcontext. | None |

## Information Returned for Remote Errors

If `LOCATION=SOAPFAULT`, the error is a SOAP fault received from the web
service provider.

In this case, the `ADDITIONAL` information correspond to the child elements
of the SOAP Fault element, as defined by the SOAP protocol. (For detailed descriptions of the SOAP
Fault elements, consult the [Simple Object Access Protocol
(SOAP) 1.1](http://www.w3.org/TR/2000/NOTE-SOAP-20000508/#_Toc478383507).)

SOAP Fault Information

| Item | Meaning |
| --- | --- |
| `CODE=`ErrorCode | Contents of the `<faultcode>` element, with namespace prefixes expanded. |
| `MESSAGE=`ErrorString | Literal contents of the `<faultstring>` element; mandatory. |
| `ACTOR=` | Literal contents of the `<faultactor>` element, if available |
| `DETAIL=` | Well-formed XML string representing the `<detail>` element in the SOAP fault. |

## Parsing SOAP Errors in $procerrorcontext

The sample Proc entry `getSoapFault` parses the associative list returned
by $procerrorcontext. This list can contain several levels of nested lists.

**Tip:** 

You can copy this entry into your own code to parse the information provided in
$procerrorcontext.

```procscript
entry getSoapFault
params
  string pList : IN
endparams

variables
  string additional
  string item
endvariables

getitem/id item, pList, "ADDITIONAL"
if ($status = 0)
  putmess "No ADDITIONAL item"
  done
endif

pList = item
getitem/id item, pList, "DRV"
if ($status = 0)
  putmess "No DRV item"
else
  putmess "DRV=%%item%%%%%^"
endif

getitem/id item, pList, "LOCATION"
if ($status = 0)
  putmess "No LOCATION item"
else
  putmess "LOCATION=%%item%%%%%^"
endif

getitem/id item, pList, "CODE"
if ($status = 0)
  putmess "No CODE item"
else
  putmess "CODE=%%item%%%%%^"
endif

getitem/id item, pList, "MESSAGE"
if ($status = 0)
  putmess "No MESSAGE item"
else
  putmess "MESSAGE=%%item%%%%%^"
endif

getitem/id item, pList, "ACTOR"
if ($status = 0)
  putmess "No ACTOR item"
else
  putmess "ACTOR=%%item%%%%%^"
endif

getitem/id item, pList, "DETAIL"
if ($status = 0)
  putmess "No DETAIL item"
else
  putmess "DETAIL=%%item%%%%%^"
endif
```

Call the `getSoapFault` entry after an error occurs when activating a web
service. For example:

```procscript
if ($procerror = -150)
    vErrorlist = $procerrorcontext
    call getSoapFault(vErrorlist)
endif
```

For example, if a SOAP request for a web service returns the following SOAP Fault:

```procscript
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:xml="http://www.w3.org/XML/1998/namespace">
 <soapenv:Body>
  <soapenv:Fault>
   <faultcode xmlns:fc="http://faultcodes.org/">fc:Server</faultcode>
   <faultstring xml:lang="en-GB">Bad error in server!</faultstring>
   <detail>
    <de1:detail1 xmlns:de1="http://detail1.error/">
     <message>Application-specific error 1</message>
     <e:error xmlns:e="http://empty.error/" />
    </de1:detail1>
    <de2:detail2 xmlns:de2="http://detail2.error/">
     <message>
      <e:error xmlns:e="http://another.error/">
        Application-specific error 2
      </e:error>
     </message>
    </de2:detail2>
   </detail>
  </soapenv:Fault>
 </soapenv:Body>
</soapenv:Envelope>
```

Calling the `getSoapFault` entry will produce the following output:

```procscript
DRV=SOP
LOCATION=SOAPFAULT
CODE={http://faultcodes.org/}Server
MESSAGE=Bad error in server!
No ACTOR item
DETAIL=<?xml version="1.0" encoding="UTF-8"?>
<detail>
 <ns0:detail1 xmlns:ns0="http://detail1.error/">
  <message>Application-specific error 1</message>
  <ns1:error xmlns:ns1="http://empty.error/" />
 </ns0:detail1>
 <ns0:detail2 xmlns:ns0="http://detail2.error/">
  <message>
   <ns1:error xmlns:ns1="http://another.error/">Application-specific error 2</ns1:error>
  </message>
 </ns0:detail2>
</detail>
```

**Note:**  The namespace prefixes and the whitespace formatting have changed and the complete
detail element of the SOAP fault is placed in the detail list item as complete and well-formed
xml.

## Related Topics

- [SOAP_CALLOUT_PRE](../../../integration/webservices/reference/soap_callout_pre.md)
- [$procerror](_procerror.md)
- [$procerrorcontext](_procerrorcontext.md)


---

# Proc: Functions

Each Proc function description includes the following sections:

* Syntax—Syntax of the function and how to use it in an expression.
* Arguments—Descriptions of parameters, if any
* Return value—Values that the function returns, including values returned in
  $status and $procerror. If you are uncertain about the
  validity of the return value of a particular function, check the current value of
  $procerror.
* Use—Limitations placed on the use of a function, either in particular triggers or
  component types. All functions are allowed in the Application Execute trigger of the startup
  shell, unless otherwise stated.

  In service and report components, functions that can reference global objects are not
  allowed if the component Self-Contained property is True. References to
  global and general variables (for example, as an argument or in an expression) are not allowed.
* Description and Examples—Provide more details about the function and its use.

## Related Topics

- [Functions](../../proclanguage/functions.md)

