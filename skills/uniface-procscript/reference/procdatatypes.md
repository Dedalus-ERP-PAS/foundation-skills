---
title: "ProcScript Data Types"
category: "Uniface 9.7 ProcScript Reference"
entries: 21
---

# any

Uniface data type for any kind of data. It can only be used for the parameters of
entries (global or local Proc modules) and component variable.

## Use

Use in the params blocks of entries, or select `$` when
defining a component variable.

---

# boolean

Uniface data type specifying a Boolean value of `T` or
`F`.

`boolean` ParameterName `:` Direction

`boolean` VariableName

## Use

Use in params and variables blocks to define the
data type of a parameter or variable. The data type can be selected when defining fields, global
variables, and component variables.

## Description

The Boolean data type is interpreted as either TRUE or FALSE. An empty value, and the
values `0`, `F`, `f`, `N`, and
`n` are interpreted as FALSE. All other values are interpreted as TRUE.

```procscript
params
   boolean pCreditApproved : INOUT
endparams
```

## Related Topics

- [Data Types](../../../howunifaceworks/datastorage/field_interface_definitions/data_types.md)
- [Data Handling in Proc](../../datatypehandling/handling_data_in_proc.md)
- [Packing Codes for Boolean Data](../../../howunifaceworks/datastorage/packing_codes_for_boolean_data1.md)


---

# date

Uniface data type specifying a sequence of numbers representing a date, in the format
ccyymmdd.

`date` ParameterName `:` Direction

`date` VariableName

## Use

Use in params and variables blocks to define the
data type of a parameter or variable. The data type can be selected when defining fields, global
variables, and component variables.

## Description

The $date Proc function can be used to explicitly convert data to the
date data type.

## Related Topics

- [$date](../procfunctions/_date.md)
- [Data Handling in Proc](../../datatypehandling/handling_data_in_proc.md)
- [Date and Time Data](../../datatypehandling/date_and_time_data.md)
- [Packing Codes for Date and Time Data](../../../howunifaceworks/datastorage/packing_codes_for_date_and_time_data/packing_codes_for_date_and_time_data1.md)


---

# datetime

Uniface data type specifying a sequence of numbers representing a date and time, in
the format ccyymmddhhnnsstt.

`datetime` ParameterName `:` Direction

`datetime` VariableName

## Use

Use in params and
variables blocks to define the data type of a parameter or variable. The data
type can be selected when defining fields, global variables, and component variables.

## Description

For the Datetime data type, the following defaults
apply for partial values:

* If both the date and time have been omitted,
  the value is assumed to be NULL.
* If the date has been omitted while a time is
  specified, the day, month and year default to the current day, the current month and the current
  year, respectively.
* If an incomplete date is specified, a missing
  day defaults to 1, a missing month defaults to the current month, and a missing year defaults to
  the current year.

The $datim Proc function can be
used to convert data to datetime.

## Related Topics

- [$datim](../procfunctions/_datim.md)
- [Data Handling in Proc](../../datatypehandling/handling_data_in_proc.md)
- [Date and Time Data](../../datatypehandling/date_and_time_data.md)
- [Packing Codes for Date and Time Data](../../../howunifaceworks/datastorage/packing_codes_for_date_and_time_data/packing_codes_for_date_and_time_data1.md)


---

# entity

Uniface data type for use in parameters.

params

entity EntityName{.ModelName}  : Direction

endparams

## Use

Use in params blocks to define
the data type of a parameter.

## Description

An entity parameter transfers all occurrences of
the specified entity from one component to the other component.

Only `In Database` fields are
available for use in the entity parameter.

Entity parameters cannot be used in entries
(global or local Proc modules) and in global Procs.

For more information, see [Entity and Occurrence Parameters](../procstatements/params.md#section_4DBA24EBE45D5EB18AE0F6F4CD7BFD4F).

## Related Topics

- [params](../procstatements/params.md)


---

# float

Uniface data type specifying a number with a floating decimal point.

`float` ParameterName `:`  Direction

`float` VariableName

## Use

Use in params and variables blocks to define the
data type of a parameter or variable. The data type can be selected when defining fields, global
variables, and component variables.

## Description

Uniface internally supports a platform-independent precision of 38 digits for the
mantissa, plus one for rounding, and four digits for the exponent, as follows:

`+/- (99,999,999,999,999,999,999,999,999,999,999,999,999e+/- 9999)`

When storing data, it depends on the DBMS whether this high precision is supported.

Fields defined as data type float or numeric can
accept a scientific notation. For example, you could enter `1.23e-5` in a field with
data type float and `123e-5` in a field with data type
numeric.

If no display format is specified for a field with data type float, the field syntax
length is used when formatting the value.

## Related Topics

- [Extracting Values From Numeric Data](../../datatypehandling/numeric_data.md)
- [Packing Codes for Numeric Data](../../../howunifaceworks/datastorage/packing_codes_for_numeric_data/packing_codes_for_numeric_data1.md)
- [Floating Point Packing Codes (F)](../../../howunifaceworks/datastorage/packing_codes_for_numeric_data/floating_point_packing_codes__f_.md)


---

# handle

Uniface data type containing a single reference to a component instance, entity,
occurrence, field, or OCX object.

In a params block:

handle ParameterName  `:`  Direction

In a variables block:

{public |
partner} handle {VariableName}

## Use

Use in params and
variables blocks to define the data type of a parameter or variable. The data
type can be selected when defining non-database fields, global variables, and component
variables.

## Description

Handles can be designated as
public or partner. Public handles can only access public
operations. Partner handles can access partner operations and public operations.

**Note:**  Do not convert handle to
string and back.

## handle

In the following example, the handle of a Uniface
component is passed as a parameter to the Execute trigger of another component and assigned to a
component variable. The handle in the component variable is used to activate operations on the
component.

```procscript
;Execute trigger
params
		handle pWriter	:	IN 
endparams

$hWriter$ = pWriter 
$hWriter$->startdocument("true")
```

## Related Topics

- [Handles](../../handles/handles2.md)


---

# image

Uniface data type containing binary data.

image ParameterName `:` Direction

image VariableName

## Use

Use in params and
variables blocks to define the data type of a parameter or variable. The data
type can be selected when defining fields, global variables, and component variables.

## Description

Use the image data type for
fields that contain images from the database, glyphs, disk files, or third-party filters.

No arithmetic operations can be applied to this
kind of data.

It is not possible to directly compare two
parameters, variables, or fields that use the data type raw or
image—they will always evaluate to `True`. An alternative is to
calculate and compare a hash of the data. For more information, see [Comparing raw or image DataYou can calculate a hash of the data and compare
the hash instead of the content. The following code checks whether two files are the same.
variables
string vFile1Name, vFile2Name, vFile1MD5Hash, vFile2MD5Hash
raw vFile1Raw, vFile2Raw
numeric vFile1Size, vFile2Size
endvariables
; Create a hash of
lfileload/raw vFile1Name, vFile1Raw
vFile1Size = $status
vFile1MD5Hash = $encode("HEX", $encode("MD5", vFile1Raw))
lfileload/raw vFileName2, vFile2Raw
vFile2Size = $status
vFile2MD5Hash = $encode("HEX", $encode("MD5", vFile2Raw))
if (vFile1Size = vFile2Size & vFile1MD5Hash = vFile2MD5Hash)
message/info "[%%vFile1Name] and [%%vFile2Name] are identical."
else
message/error "[%%vFile1Name] and [%%vFile2Name] are different!"
endif](datatyperaw.md#example_9A6BC4D8CC8046E7B39BC53F7491AA4B).

## Related Topics

- [Image Handling](../../../componentconstruction/imagehandling/imagehandling.md)
- [Data Handling in Proc](../../datatypehandling/handling_data_in_proc.md)
- [Packing Codes for Other Data](../../../howunifaceworks/datastorage/packing_codes_for_other_data/packing_codes_for_other_data1.md)


---

# lineardate

Uniface data type specifying an integer representing a number of days.

`lineardate` ParamName : Direction

`lineardate` VariableName

## Use

Use in params and variables blocks to define the
data type of a parameter or variable. The data type can be selected when defining fields, global
variables, and component variables.

## Description

A `lineardate` can have a value from `0` (days) through
`3652425` (10,000 years, that is, 3,652,425 days). Only a whole number of days is
allowed; that is, you cannot specify hours, minutes and so on.

```procscript
params
   date pContractDate : IN
   date pExecutionDate : IN
   lineardate pWaitPeriod : OUT
endparams

pWaitPeriod = pExecutionDate - pContractDate
```

## Related Topics

- [Data Handling in Proc](../../datatypehandling/handling_data_in_proc.md)
- [Date and Time Data](../../datatypehandling/date_and_time_data.md)
- [Packing Codes for Date and Time Data](../../../howunifaceworks/datastorage/packing_codes_for_date_and_time_data/packing_codes_for_date_and_time_data1.md)


---

# lineardatetime

Uniface data type specifying a number of days, including fractions of
days.

`lineardatetime` ParamName : Direction

`lineardatetime` VariableName

## Use

Use in params and variables blocks to define the
data type of a parameter or variable. The data type can be selected when defining fields, global
variables, and component variables.

## Description

Linear Date and Time represents a number of days. Partial days (hours, minutes, seconds)
can be expressed as a fraction of a day.

## Related Topics

- [Data Handling in Proc](../../datatypehandling/handling_data_in_proc.md)
- [Date and Time Data](../../datatypehandling/date_and_time_data.md)
- [Packing Codes for Date and Time Data](../../../howunifaceworks/datastorage/packing_codes_for_date_and_time_data/packing_codes_for_date_and_time_data1.md)


---

# lineartime

Uniface data type specifying an integer representing a number of hours.

`lineartime` ParamName : Direction

`lineartime` VariableName

## Use

Use in params and variables blocks to define the
data type of a parameter or variable. The data type can be selected when defining fields, global
variables, and component variables.

## Description

A `lineartime` can have a value from `0` to
`24`. If more specific time information is required, use the
lineardatetime or lineardate data type format.

```procscript
params
   time pTimeStamp : IN
   lineartime pElapsedTime : OUT
endparams

pElapsedTime = $clock-pTimeStamp
```

## Related Topics

- [Data Handling in Proc](../../datatypehandling/handling_data_in_proc.md)
- [Date and Time Data](../../datatypehandling/date_and_time_data.md)
- [Packing Codes for Date and Time Data](../../../howunifaceworks/datastorage/packing_codes_for_date_and_time_data/packing_codes_for_date_and_time_data1.md)


---

# numeric

Uniface data type specifying a number to a maximum of 9 decimal places, including
`+`, `-`, and decimal point `.`

numeric ParamName : Direction

numeric VariableName

## Use

Use in params and
variables blocks to define the data type of the specified parameter or variable.
The data type can also be selected when defining fields, global variables, and component variables.

## Description

The numeric data type supports
arithmetic functions, fractions (scaling), decimal points, and positive and negative values. The
number of decimals stored depends on the packing code.

Fields defined as data type
float or numeric can accept a scientific notation. For
example, you could enter `1.23e-5` in a field with data type
float and `123e-5` in a field with data type
numeric.

Uniface arithmetic expressions use string
representations of the numbers as input, and return a string representation of the result,
truncated at 38 digits. If the 39th digit is `5` or higher, the number is rounded
upwards.

```procscript
params
  numeric pPrice, pQuantity, pTotal : IN
endparams

pTotal = pPrice * pQuantity
```

## Related Topics

- [Extracting Values From Numeric Data](../../datatypehandling/numeric_data.md)
- [Packing Codes for Numeric Data](../../../howunifaceworks/datastorage/packing_codes_for_numeric_data/packing_codes_for_numeric_data1.md)
- [Numeric Strings (C20)](../../../howunifaceworks/datastorage/packing_codes_for_numeric_data/character_string_packing_code__c_.md)
- [Numeric Constants](../../proclanguage/constants/numeric_constants.md)
- [Data Handling in Proc](../../datatypehandling/handling_data_in_proc.md)


---

# occurrence

Uniface data type for use in parameters.

params

occurrence EntityName{.ModelName}
 : Direction

endparams

## Use

Use in params blocks
definitions to define the data type of a parameter.

Occurrence parameters cannot be used in entries
(global or local Proc modules) and in global Procs.

## Description

An occurrence parameter transfers the current
occurrence of the specified entity from one component to another component. For more information, see [Entity and Occurrence Parameters](../procstatements/params.md#section_4DBA24EBE45D5EB18AE0F6F4CD7BFD4F).

## Related Topics

- [params](../procstatements/params.md)
- [Entities](../../../modeling/entities/entities.md)


---

# partner

Modifies a declaration to indicate that the declared operation or handle cannot be
called or used by another component. In combination with the web keyword, it
prevents the operation or trigger of a Dynamic Server Page from being directly invoked from the
client browser.

* In operation statement:

     
  {partner}  operation  OperationName
* In params block:

     {partner}  
  handle  ParameterName :  Direction
* In variables block:

     {partner}  
  handle  VariableName
* In the web qualifier
  preceding a scope block:

     {partner}  
  web

## Use

partner operation and
partner handle are allowed in all component types. partner handle can also be selected when defining fields, global variables, and component variables.

partner web can be used in
Dynamic Server Pages.

## Description

For operations and handles, using the
partner modifier makes it available only for use inside the component itself.

For scope definitions in
dynamic server pages, it is used with the web keyword to indicate that an
operation, Detail trigger, or OnChange extended trigger cannot be directly invoked from the client
browser. However, data specified in the scope declaration can be included in the
DSP request-response exchange of other triggers or operations.

## Related Topics

- [Handles](../../handles/handles2.md)
- [Public and Partner Operations](../../public_and_partner_operations.md)


---

# Proc: Data Types

Data types define the characteristics of the data and determine how Uniface handles
the data during processing and storage. They are specified for parameters, variables, and return
values in Proc, as well as for fields, global variables, and component variables.

For more information, see [Uniface Data Types](../../proclanguage/unifacedatatypes.md).

## Related Topics

- [Uniface Data Types](../../proclanguage/unifacedatatypes.md)
- [Data Handling in Proc](../../datatypehandling/handling_data_in_proc.md)
- [Transforming Complex Data Using Structs](../../structs/transformingwithstructs/handlingcomplexdynamicdata.md)
- [Storage Formats](../../../howunifaceworks/datastorage/storage_formats.md)
- [Packing Codes](../../../howunifaceworks/datastorage/field_interface_definitions/uniface_packing_codes.md)


---

# public

Modifier for an `operation`, `handle`, or
`scope` definition that indicates it is available for external use.

* In operation statement:

      {public}
  operation  OperationName
* In params block:

     {public}  handle  ParameterName :  Direction
* In variables block:

     {public}  
  handle  VariableName
* In a public web declaration
  of a trigger or operation:

     {public  web}
* In a public soap
  declaration of a trigger or operation:

     {public  soap}

## Use

public operation and
public handle are allowed in all component types. public
handle can also be selected when defining fields, global variables, and component
variables.

public web can be used in
Dynamic Server Pages, Static Server Pages, and Service components.

public soap can be used in
Service components, as well as Dynamic Server Pages and Static Server Pages.

## Description

For operations, using the
public modifier makes it available in the component signature so that it can be
invoked by other components.

When used with the web keyword,
it declares that an operation or trigger (such as a Detail trigger or On Change trigger) can be
activated by a browser request, RESTful web service, or similar web client. In DSPs, the
public web declaration must be present in a Proc module if it will be called
from a web client. However, for Service and Static Server Page components, it is required only if
the components are compiled with $REQUIRE\_PUBLIC\_DECL set in the assignment
file.

When used with the soap
keyword, it declares that the operation or trigger can be activated by a SOAP request. If
public soap is declared, the assignment file must contain the
$REQUIRE\_PUBLIC\_DECL setting when the component is compiled.

## Declaring a Public Operation

```procscript
public operation getAccounts
...
end
```

## Making Operation Accessible to Web Clients

```procscript
operation HelloWeb
public web
  <... do something ...>
end
```

## Related Topics

- [web](../procstatements/web.md)
- [$REQUIRE_PUBLIC_DECL](../../../configuration/reference/assignments/_require_public_decl.md)
- [Handles](../../handles/handles2.md)
- [Public and Partner Operations](../../public_and_partner_operations.md)
- [Input and Output Scope](../../../webapps/components/dsps/inputandoutputscoping.md)
- [public soap](../procstatements/public_soap.md)
- [partner](partnerhandle.md)


---

# raw

Uniface data type containing binary data.

raw ParameterName `:` Direction

raw VariableName

## Use

Use in params and
variables blocks to define the data type of a parameter or variable. The data
type can be selected when defining fields, global variables, and component variables.

## Description

Use the raw data type for
fields containing raw data that should not be converted or processed, such as pictures and
sound.

raw data is encoded as
`UTF-8`.

No arithmetic operations can be applied to this
kind of data.

It is not possible to directly compare two
parameters, variables, or fields that use the data type raw or
image—they will always evaluate to `True`. An alternative is to
calculate and compare a hash of the data.

## Comparing raw or image Data

You can calculate a hash of the data and compare
the hash instead of the content. The following code checks whether two files are the same.

```procscript
variables
   string vFile1Name, vFile2Name, vFile1MD5Hash, vFile2MD5Hash
   raw vFile1Raw, vFile2Raw
   numeric vFile1Size, vFile2Size
endvariables

; Create a hash of 
lfileload/raw vFile1Name, vFile1Raw
vFile1Size = $status
vFile1MD5Hash = $encode("HEX", $encode("MD5", vFile1Raw))

lfileload/raw vFileName2, vFile2Raw
vFile2Size = $status
vFile2MD5Hash = $encode("HEX", $encode("MD5", vFile2Raw))

if (vFile1Size = vFile2Size & vFile1MD5Hash = vFile2MD5Hash)
   message/info "[%%vFile1Name] and [%%vFile2Name] are identical."
else
   message/error "[%%vFile1Name] and [%%vFile2Name] are different!"
endif
```

## Related Topics

- [Data Types](../../../howunifaceworks/datastorage/field_interface_definitions/data_types.md)
- [Data Handling in Proc](../../datatypehandling/handling_data_in_proc.md)
- [Packing Codes for Other Data](../../../howunifaceworks/datastorage/packing_codes_for_other_data/packing_codes_for_other_data1.md)


---

# string

Uniface data type specifying a sequence of characters that is treated as
text.

`string` ParameterName `:` Direction

`string` VariableName

## Use

Use in params and variables blocks to define the
data type of a parameter or variable. The data type can be selected when defining fields, global
variables, and component variables.

## Description

Uniface uses UTF-8 as its internal character set, so the `string` can
contain Unicode characters. String data can include numbers and other numerical symbols but is
treated as text.

A string value is enclosed in double quotation marks (`" "`).

```procscript
variables
  string  vDepartment, vManager
endvariables
```

## Related Topics

- [String Constants](../../proclanguage/constants/string_constants.md)
- [Packing Codes for Other Data](../../../howunifaceworks/datastorage/packing_codes_for_other_data/packing_codes_for_other_data1.md)
- [Substitution in String Values](../../datatypehandling/substitution_in_string_values.md)
- [Extracting Values From String Data](../../datatypehandling/extracting_values_from_string_data.md)
- [Syntax Strings for Pattern Matching](../../proclanguage/constants/syntax_string_constants.md)
- [Case Conversion](../../datatypehandling/caseconversion.md)


---

# struct

Uniface data type containing an ordered collection of references to one or more Struct
nodes.

{byRef} | {byVal} struct ParameterName `:`Direction

struct VariableName

## Qualifiers

* byRef—the Struct is passed
  *by reference*, so only a memory pointer is passed, not the actual data, which is
  already available in memory.
* byVal—the data is passed
  *by Value*, so a copy of the Struct is created and then passed.

## Use

Allowed for non-database fields, local variables,
component variables, global variables, and general variables, and for parameters in Proc entries
and partner operations.

The byRef and
byVal qualifiers are only applicable for parameters. They specify how Structs
are passed back and forth. They are not allowed for variables of any kind.

## Description

The struct data type is used
for complex data that is typically represented as a tree-like structure consisting of nodes
(sub-trees or branches) and leaves (data values). It is intended for data manipulation rather than
storing data, so it is available only for variables (local, component, global and general) and
parameters, but not for fields.

For more information, see [Struct Variables](../../structs/structvariables.md) and [Struct Parameters](../../structs/structparameters.md).

## Related Topics

- [Structs](../../structs/structs.md)


---

# time

Uniface data type specifying a sequence of numbers representing a time, in the format
hhnnss.

`time` ParameterName `:`Direction

`time` VariableSpec

## Use

Use in params and variables blocks to define the
data type of a parameter or variable. The data type can be selected when defining fields, global
variables, and component variables.

## Description

The $clock Proc function can be used to convert data to the
time data type.

```procscript
params
   time pTimeStamp : IN
   lineartime pElapsedTime : OUT
endparams

pElapsedTime = $clock-pTimeStamp
```

## Related Topics

- [Data Handling in Proc](../../datatypehandling/handling_data_in_proc.md)
- [Date and Time Data](../../datatypehandling/date_and_time_data.md)
- [Packing Codes for Date and Time Data](../../../howunifaceworks/datastorage/packing_codes_for_date_and_time_data/packing_codes_for_date_and_time_data1.md)


---

# xmlstream

Uniface data type containing well-formed XML.

xmlstream `[DTD:`DTDName`]` ParamName : Direction

xmlstream VariableName

## Parameters

DTDName—string, component constant, component variable, or global
variable that evaluates to the name of the DTD that defines the structure of XML stream.
DTDName has the format:

LiteralDTDName{`.`LiteralModelName}

LiteralDTDName is the literal DTD name defined in the application model
specified by LiteralModelName.

## Use

Use in params and variables blocks to define the
data type of a parameter or variable. The data type can also be selected when defining fields,
global variables, and component variables.

## Description

XML data can be transferred between the xmlstream parameters and the
component's external data structure with xmlsave and xmlload.
In this case the XML must conform to the Uniface DTD for component data.

The xmlstream data type can also be used when transforming data from
and to Structs using xmlToStruct and structToXML.

## Public Operation with XML Stream

```procscript
public operation getAccounts
params
   xmlStream [dtd:account.olb] x: inout
endparams

xmlLoad x, "dtd:account.olb"
retrieve/e "accountSsv.olb"
xmlSave x, "dtd:account.olb"

end; operation getAccounts
```

## Related Topics

- [xmlsave](../procstatements/xmlsave.md)
- [xmlload](../procstatements/xmlload.md)
- [xmlToStruct](../procstatements/xmltostruct.md)
- [structToXml](../procstatements/structtoxml.md)
- [XML Streams](../../../integration/xml/concepts/xml_streams1.md)
- [Uniface XML Constructs](../../../_reference/xml/xmlconstructs_intro.md)
- [Declarative XML Handling](../../../integration/xml/concepts/declarativexmlhandling.md)
- [Structs for XML Data](../../structs/transformingwithstructs/structsforxml.md)
- [APIs for XML Handling](../../../integration/xml/reference/xmldocuments/xmlcomponentapis.md)

