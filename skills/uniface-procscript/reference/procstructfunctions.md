---
title: "ProcScript Struct Functions"
category: "Uniface 9.7 ProcScript Reference"
entries: 13
---

# $collSize

Get the number of Struct nodes in the collection.

StructVariable->$collSize

## Return Values

The value returned by $collSize
depends on whether StructVariable refers to a single Struct or to multiple
Structs.

Return Values

| Return Value | Meaning |
| --- | --- |
| >`1` | Number of members in the collection |
| `1` | StructVariable refers to a single Struct node or a Struct leaf |
| `0` | StructVariable does not refer to a Struct |

Values of $procerror Commonly Returned Following $collsize

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-1155` | `USTRUCTERR_MEMBER_NOT_FOUND` | Struct member not found |
| `-1157` | `USTRUCTERR_ILLEGAL_MEMBER_TYPE` | Not a valid struct member type |

## Description

The $collSize function is
intended for use with a struct variable or parameter that refers to multiple
Structs. If it refers to only a one Struct, you can use the $memberCount Struct
function. In this case, the expression
StructVariable->$memberCount evaluates
to the same value as
StructVariable->\*->$collSize.

## Using the Collection Size

The collection size can be used when you need to
iteratively process the members of a Struct. For example:

```procscript
vTotalStructs = pStruct->$collsize
if (vTotalStructs > 1) 
    i = 1
    while (i <= vTotalStructs)
      ;do something
      i = i + 1
    endwhile
 else
   ;do something else
endif
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |
| 9.6.02 | Can now return a value of `0` |

## Related Topics

- [$memberCount](_membercount.md)


---

# $dbgString

Get a string that represents the Struct or Struct collection, including
annotations.

StructVariable->$dbgString

## Return Values

Returns a string that can be used for
debugging.

Values of $procerror Commonly Returned Following Struct Functions

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-84` | `UACTERR_NO_OBJECT` | StructVariable refers to zero Structs |
| `-1151` | `USTRUCTERR_NO_COMMON_CHARACTERISTICS` | Collection of Structs that do not share a common parent or the specified characteristic |
| `-1157` | `USTRUCTERR_ILLEGAL_MEMBER_TYPE` | Not a valid Struct member type |

## Description

Use $dbgString when you need to
verify the structure and annotations of a Struct.

**Note:**  If you do not need to see the annotations, use
the Struct function $dbgStringPlain.

$dbgString is intended for use
during development, to visually represent and format the contents of a `struct`
variable. It can be used to display the Struct as string, for example, in the message frame.

**Note:**  It is not intended to be a serialized form of
the Struct. It is not possible to recreate a Struct from a string that was created this way.

The returned string shows a nested structure that
includes both the normal Struct and the $tags Structs:

* The name of the Struct is printed on the first
  line between square brackets, with proper indentation.
* A Struct leaf is followed by an equal sign
  (`=`) and its value.
* String values are in double quotes.
* All other data types (numeric/float, date,
  raw, and so on) are displayed without quotes
* A node with no members and no value is
  considered to hold an empty string
* If annotations exist, the
  $tags Struct is displayed as the first Struct under a node; it precedes the
  member list.

## Uniface Component Struct

For example, given the following component
structure:

Component Structure

And the following data:

Runtime Data

The Struct function $dbgstring
returns a formatted string that represents the Struct:

```procscript
[DATA_FRM]  
  [$tags]  
    [u_type] = "component"  
  [NM_ENTITY.NM]  
    [$tags]
      [u_type] = "entity"
    [OCC]  
      [$tags]
        [u_type] = "occurrence"
      [FIELD1] = "Text can be bold or italic"  
        [$tags]
          [u_type] = "field"
      [FIELD2] = "but not in all widgets."
        [$tags]
          [u_type] = "field"
```

1. Named top-level Struct with name of
   component
2. `$tags` Struct containing
   annotations for the member
3. `u_type` annotation indicates
   the component object that the Struct member represents
4. Named Struct node for entity
5. Struct node for occurrence. The name is fixed
   to `OCC`
6. Struct leaf for field

## String Returned for an XML Struct

For example, given the following XML code:

```procscript
<div class="note">Text can be <b>bold</b> or <em>italic</em></div>
```

The Struct function $dbgstring
returns a formatted string that represents the Struct:

```procscript
[]  
  [div]  
    [$tags]  
      [xmlClass] = element  
    [class] = note 
      [$tags]
        [xmlClass] = attribute  
    [] = Text can be  
    [b] = bold  
      [$tags]
        [xmlClass] = element 
    [] = or  
    [em] = italic  
      [$tags]
        [xmlClass] = element
```

1. Top-level Struct.
2. Struct node.
3. `$tags` Struct containing
   annotations for the member.
4. `xmlClass` shows that the
   member represents an XML element.
5. Struct leaf, with its value being the only
   member.
6. `xmlClass` shows that the
   member represents an XML attribute.
7. Scalar struct. For more information, see [Struct Leaves](../../structs/structleaves.md).

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [$dbgStringPlain](_dbgstringplain.md)


---

# $dbgStringPlain

Get a string that represents the Struct or Struct collection, without the annotations
($tags).

StructVariable->$dbgStringPlain

## Return Values

Returns a string that can be used for
debugging.

Values of $procerror Commonly Returned Following Struct Functions

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-84` | `UACTERR_NO_OBJECT` | StructVariable refers to zero Structs |
| `-1151` | `USTRUCTERR_NO_COMMON_CHARACTERISTICS` | Collection of Structs that do not share a common parent or the specified characteristic |
| `-1157` | `USTRUCTERR_ILLEGAL_MEMBER_TYPE` | Not a valid Struct member type |

## Description

$dbgStringPlain is intended
for use during development, to visually represent and format the contents of a
`struct` variable. It can be used to display the Struct as string, for example, in
the message frame. This function is also used in the Debugger.

**Note:**  It is not intended to be a serialized form of
the Struct. It is not possible to recreate a Struct from a string that was created this way,

The returned string shows only the nested
structure of the Struct, without the $tags Structs. This makes it easier to use
when annotations are not relevant.

In the returned string:

* The name of the Struct is printed on the first
  line between square brackets, with proper indentation.
* A Struct leaf is followed by an equal sign
  (`=`) and its value.
* String values are in double quotes.
* All other data types (numeric/float, date,
  raw, and so on) are displayed without quotes
* A node with no members and no value is
  considered to hold an empty string

## Uniface Component Struct

For example, given the following component
structure:

Component Structure

And the following data:

Runtime Data

The Struct function
$dbgStringPlain returns a formatted string that represents the Struct:

```procscript
[DATA_FRM]  
  [NM_ENTITY.NM]  
      [OCC]  
        [FIELD1] = "Text can be bold or italic"  
        [FIELD2] = "but not in all widgets."
```

1. Named top-level Struct with name of
   component
2. Named Struct node for entity
3. Struct node for occurrence. The name is fixed
   to `OCC`
4. Struct leaf for field

History

| Version | Change |
| --- | --- |
| 9.5.01 E101 | Introduced |

## Related Topics

- [$dbgString](_dbgstring.md)


---

# $index

Get or set the index (position) of a node in a Struct collection.

StructVariable->$index

StructVariable must refer to
exactly one Struct.

## Return Values

Return Values

| Return Value | Meaning |
| --- | --- |
| >`0` | Index of the single Struct referred to by StructVariable |
| `0` | StructVariable refers to multiple Structs, so it returns an invalid index. |

Values of $procerror Commonly Returned Following $index

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-84` | `UACTERR_NO_OBJECT` | StructVariable is not initialized, or does not refer to exactly one Struct |
| `-1152` | `STRUCTERR_INDEX_NOT_ASSIGNABLE` | StructVariable has no parent (it is a top-level node), or StructVariable refers to the $tags Struct of another Struct |
| `-1154` | `STRUCTERR_INDEX_OUT_OF_RANGE` | Tried to assign a single Struct to a number greater than the number of members of the parent, or smaller than one and not equal to `-1` |
| `-1156` | `USTRUCTERR_NOT_A_SINGLE_STRUCT` | Tried to assign a struct to multiple parents. |

## Description

You can use the $index function
to move Struct members to a specific position in its parent Struct or to a specified position in
another Struct.

## Moving a Struct

Move a Struct to the last position in its parent
member list:

```procscript
vStructA->$index = -1
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [Adding, Copying, Moving, and Replacing Struct Members](../../structs/workingwithstructs/addingandmovingstructmembers.md)


---

# $isLeaf

Checks whether a Struct member is an end point of the Struct tree.

StructVariable->$isLeaf

## Return Values

Return Values

| Return Value | Meaning |
| --- | --- |
| `0` | StructVariable refers to nested Struct |
| `1` | StructVariable refers to Struct leaf. |

Values of $procerror Commonly Returned Following Struct Functions

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-84` | `UACTERR_NO_OBJECT` | StructVariable refers to zero Structs |
| `-1151` | `USTRUCTERR_NO_COMMON_CHARACTERISTICS` | Collection of Structs that do not share a common parent or the specified characteristic |
| `-1157` | `USTRUCTERR_ILLEGAL_MEMBER_TYPE` | Not a valid Struct member type |

## Description

A leaf is the logical endpoint in a tree. All
scalar Struct members are leaves in the Struct tree, but the reverse is not always true.
For more information, see [Struct Leaves](../../structs/structleaves.md).

If a Struct is a scalar Struct, or if it has a
value and no sub nodes, it is a leaf and $isLeaf returns `1`
(true).

## Check for Struct Nodes before Iterating

You can use $isLeaf to check
whether a member is a nested Struct, before using $membercount. For example:

```procscript
if (!vStruct->$isLeaf) 
  i = 1
  while (i <= vStruct->$membercount) 
    putmess "Member %%I have name %%(vStruct->*{i}->$name)" 
    i = i + 1
  endwhile
endif
```

1. If `vStruct` refers to the node
   of a nested Struct.
2. Get the number of members in the node.
3. Put the name of each member in the message
   frame.

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [Struct Leaves](../../structs/structleaves.md)


---

# $isScalar

Checks whether a Struct node is a scalar Struct.

StructVariable->$isScalar

## Return Values

Return Values

| Return Value | Meaning |
| --- | --- |
| `0` | Struct is scalar member |
| `1` | Struct is not a scalar member |

Values of $procerror Commonly Returned Following Struct Functions

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-84` | `UACTERR_NO_OBJECT` | StructVariable refers to zero Structs |
| `-1151` | `USTRUCTERR_NO_COMMON_CHARACTERISTICS` | Collection of Structs that do not share a common parent or the specified characteristic |
| `-1157` | `USTRUCTERR_ILLEGAL_MEMBER_TYPE` | Not a valid Struct member type |

## Use

Allowed in all components

## Description

Use $isScalar to check whether
the Struct is a scalar Struct. A scalar Struct is used only to contain the scalar value. It cannot
have sub-nodes, and it is not possible to use access operators (such as ->)
on a scalar Struct.

It fulfills the following conditions:

* $membercount returns 0
  members
* $isLeaf  returns 1
  (true)
* $isScalar returns 1
  (true)

For more information, see [Struct Leaves](../../structs/structleaves.md).

## $isScalar

The following code checks whether a Struct member
is a scalar Struct before assigning it to a field:

```procscript
if (vStruct->*{1}->$isScalar)
  FLD1 = vStruct->{1}
endif
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

---

# $istags

Checks whether the Struct is a $tags Struct containing
annotations.

StructVariable->$istags

## Return Values

Return Values

| Return Value | Meaning |
| --- | --- |
| `True` | Struct is a $tags Struct for another Struct. |
| `False` | StructVariable is a collection of references to one or more Structs  StructVariable does not refer to a Struct |

Values of $procerror Commonly Returned Following Struct Functions

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-84` | `UACTERR_NO_OBJECT` | StructVariable refers to zero Structs |
| `-1151` | `USTRUCTERR_NO_COMMON_CHARACTERISTICS` | Collection of Structs that do not share a common parent or the specified characteristic |
| `-1157` | `USTRUCTERR_ILLEGAL_MEMBER_TYPE` | Not a valid Struct member type |

## Description

For more information, see [Struct Annotations](../../structs/structannotations.md).

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [$tags](_tags.md)
- [Struct Annotations](../../structs/structannotations.md)


---

# $memberCount

Get the number of members in a Struct.

StructVariable->$memberCount

## Return Values

The value returned by
$memberCount depends on whether StructVariable refers to a
single Struct or to multiple Structs.

Return Values

| Return Value | Meaning |
| --- | --- |
| `0` | Struct has no members |
| >=`0` | Number of members in the Struct. |
| `1` | Struct has 1 member, or Struct has 1 member and 1 scalar member that holds the value of the Struct itself (only applicable for mixed content). |
| `-1` | StructVariable refers to a collection of Structs, or is not a Struct |

Values of $procerror Commonly Returned Following Struct Functions

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-84` | `UACTERR_NO_OBJECT` | StructVariable refers to zero Structs |
| `-1151` | `USTRUCTERR_NO_COMMON_CHARACTERISTICS` | Collection of Structs that do not share a common parent or the specified characteristic |
| `-1157` | `USTRUCTERR_ILLEGAL_MEMBER_TYPE` | Not a valid Struct member type |

## Description

The $memberCount function is
intended for use with a struct variable or parameter that refers to a single
Struct.

The value returned by
$memberCount does not include annotations; these can be accessed using
$tags.

If Struct refers to more than
one Struct, you can use the $collSize function to get the number of Structs in
the collection.

## Check for Struct Nodes before Iterating

You can use $isLeaf to check
whether a member is a nested Struct, before using $membercount. For example:

```procscript
if (!vStruct->$isLeaf) 
  i = 1
  while (i <= vStruct->$membercount) 
    putmess "Member %%I have name %%(vStruct->*{i}->$name)" 
    i = i + 1
  endwhile
endif
```

1. If `vStruct` refers to the node
   of a nested Struct.
2. Get the number of members in the node.
3. Put the name of each member in the message
   frame.

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [$tags](_tags.md)
- [$collSize](_collsize.md)


---

# $name

Get or set the name of a Struct member, as it is known to its parent.

StructVariable`->$name`

## Return Values

Return Values

| Return Value | Meaning |
| --- | --- |
| "" | Struct has no name, or StructVariable does not refer to a Struct |
| StructName | Name of the Struct |

Values of $procerror Commonly Returned Following Struct Functions

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-84` | `UACTERR_NO_OBJECT` | StructVariable refers to zero Structs |
| `-1151` | `USTRUCTERR_NO_COMMON_CHARACTERISTICS` | Collection of Structs that do not share a common parent or the specified characteristic |
| `-1157` | `USTRUCTERR_ILLEGAL_MEMBER_TYPE` | Not a valid Struct member type |

## Use

Allowed in all Uniface component types.

## Description

Use $name to get the name of a
single Struct member, or assign a name to a Struct. The function also works on a collection of
Structs, but only if they all have the same name and the same parent. Otherwise, an error is
returned.

## Creating a Named Struct

```procscript
entry createStruct
 variables
  struct vStruct
 endvariables
 ; Create a Struct named ORDER
 vStruct->$name = "ORDER"
end
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [Example: Using Special Characters and Reserved Words as Member Names](../../structs/scriptexamples/structcodeexamplescharswords.md)


---

# $parent

Get or set the parent of the Struct node.

StructVariable->$parent

## Return Values

Return Values

| Return Value | Meaning |
| --- | --- |
| Reference to the parent Struct | Reference to the Struct of which StructVariable is a member. |
| `""` | Returned if one the following is true:   * The Struct node has no parent * StructVariable   refers to multiple Structs that do not have the same parent * StructVariable does   not refer to a Struct. |

Values of $procerror Commonly Returned Following $parent

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-84` | `UACTERR_NO_OBJECT` | StructVariable does not refer to a Struct |
| `-1151` | `USTRUCTERR_NO_COMMON_CHARACTERISTICS` | Structs do not have a common name or parent |
| `-1156` | `USTRUCTERR_NOT_A_SINGLE_STRUCT` | Tried to assign a Struct node to multiple parents. |
| `-1157` | `USTRUCTERR_ILLEGAL_MEMBER_TYPE` | Not a valid Struct member type |
| `-1158` | `USTRUCTERR_CIRCULAR_REFERENCE` | Tried to move the Struct to one of its own descendants |
| `-1162` | `USTRUCTERR_NOT_ALLOWED_ON_TAGS` | Tried to move the Struct to a $tags Struct of another Struct |

## Description

You use the $parent function
to:

* Get the parent of a Struct member, or get the
  parent of a collection of Structs that have the same parent. If the Structs have different parents,
  an error is returned in $procerror.
* Detach a Struct node from its parent, making
  it a top node. For example:

  ```procscript
  vStruct->$parent = ""
  ```
* Move a Struct node to another Struct. For
  example:

  ```procscript
  vStructA->$parent = vStructB
  ```

  This detaches the node StructA from its
  current parent and adds it as a member of StructB.

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [Adding, Copying, Moving, and Replacing Struct Members](../../structs/workingwithstructs/addingandmovingstructmembers.md)
- [Example: Moving Structs](../../structs/scriptexamples/structcodeexamplesmove.md)
- [Example: Removing Members](../../structs/scriptexamples/structcodeexamplesdelmembers.md)


---

# $scalar

Retrieve a collection of all scalar members of a Struct, or assign a scalar value to
a Struct.

StructVariable->$scalar

## Return Values

Returns a reference to all scalar members of a
Struct.

Common Values Returned in $procerror after $scalar

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-1163` | `USTRUCTERR_SCALAR` | Tried to access members of a Scalar Struct, which has no members |
| `-1164` | `USTRUCTERR_NOT_A_SCALAR` | Tried to assign a non-scalar value to $scalar. The Struct is not changed in that case. |

## Description

A Struct node can have one or more members that
are scalar Structs. You can use $scalar to retrieve all scalar members of a
Struct node (instead of iterating over them and checking $isScalar for each of
them). You can also use $scalar to assign or change the scalar value of a
Struct.

For more information, see [Struct Leaves](../../structs/structleaves.md).

## Using $scalar

For example, given the following Struct
(referenced by Struct variable vStruct):

```procscript
[]
  [div]
    [h1] = "Example"
    "Text can be "
    [b] = "bold "
    "or " 
    [em] = "italic"
```

the following code shows how you can use
$scalar:

```procscript
variables
  struct vStruct, vScalar1, vScalar2
endvariables
  ...  
  vScalar1 = vStruct->div->$scalar     
  vScalar2 = vStruct->div->b->$scalar  

  vStruct->div->$scalar = "Plain "
```

1. vScalar1 refers to two
   Scalar Structs: `"Text can be "` and `"or "`
2. vScalar2 refers to one
   Scalar Struct:  `"bold "`
3. A new value is assigned to
   $scalar, which is inserted at the position of the first scalar Struct in
   vStruct. vStruct now has the following structure:

   ```procscript
   []
     [div]
       [h1] = "Example"
       "Plain "
       [b] = "bold "
       [em] = "italic"
   ```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [$isScalar](_isscalar.md)
- [Struct Leaves](../../structs/structleaves.md)


---

# $tags

Get or set annotations for a Struct.

StructVariable->$tags

## Return Values

The value returned by $tags
depends on whether StructVariable refers to a single Struct or to multiple
Structs.

Return Values

| Return Value | When |
| --- | --- |
| Struct containing annotations | StructVariable refers to exactly one Struct. |
| Collection of references to the $tags of multiple Structs | StructVariable is a collection of references to multiple Structs |
| `NULL` | StructVariable does not refer to a Struct. |

Values of $procerror Commonly Returned Following Struct Functions

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-84` | `UACTERR_NO_OBJECT` | StructVariable refers to zero Structs |
| `-1151` | `USTRUCTERR_NO_COMMON_CHARACTERISTICS` | Collection of Structs that do not share a common parent or the specified characteristic |
| `-1157` | `USTRUCTERR_ILLEGAL_MEMBER_TYPE` | Not a valid Struct member type |

## Description

When a new Struct is created, a special child
Struct is also created to hold annotations. In the string representation of the Struct returned by
the $dbgstring, the $tags struct is visible as
[`$tags]` beneath its parent Struct. For example:

```procscript
[]
  [div]
    [$tags]
      [xmlClass] = element
    [class] = note
      [$tags]
        [xmlClass] = attribute
    Text can be bold
```

The annotation in the $tags
Struct can be accessed using the $tags Struct function. For example:

```procscript
vClass = MyStruct->div->$tags->xmlClass
```

Unlike normal Struct members, annotations have no
specific position inside the Struct, and are therefore not counted, or treated as members of the
Struct. This is in contrast to, for example, XML process instructions, which are treated as normal
Struct members because their position in an XML document is relevant, even if they are not part of
the document contents.

Annotations are specific to the format, so
componentToStruct has different annotations than
xmlToStruct.

When preparing Structs for conversion to another
format, you can set the values of $tags to guide the conversion.

For more information, see [Struct Annotations](../../structs/structannotations.md)..

## Setting a Tag

The following code sets the
`xmlClass` tag for a Struct to `element`:

```procscript
vStruct->$tags->xmlClass="element"
```

History

| Version | Change |
| --- | --- |
| 9.5.01 | Introduced |

## Related Topics

- [$istags](_istags.md)
- [Example: Tags Inheritance](../../structs/scriptexamples/structcodeexamplestagsinheritance.md)


---

# Proc: Struct Functions

Struct functions enable you to get information about a Struct (such as the number of
members it has), get or set Struct annotations, or perform actions such as inserting and moving
Strut members. Syntactically, they are treated as Struct members and are accessed using the
de-reference operator (->). However, they are not part of the Struct member
list and they do not have an index.

## Syntax

Struct->StructFunction

## Context

* Struct—a variable or
  parameter of type struct or any that references a Struct. If
  Struct does not refer to a Struct, it returns error `-84` in
  $procerror.
* StructFunction—predefined
  pseudo-member of a Struct; the function name always begins with a dollar sign $.
  Unlike other functions, they do not use parentheses `()`.

## Errors

Values of $procerror Commonly Returned Following Struct Functions

| Value | Error Constant | Meaning |
| --- | --- | --- |
| `-84` | `UACTERR_NO_OBJECT` | StructVariable refers to zero Structs |
| `-1151` | `USTRUCTERR_NO_COMMON_CHARACTERISTICS` | Collection of Structs that do not share a common parent or the specified characteristic |
| `-1157` | `USTRUCTERR_ILLEGAL_MEMBER_TYPE` | Not a valid Struct member type |

## Related Topics

- [Struct Functions](../../structs/structfunctions.md)
- [Struct Access Operators](../../structs/accessoperators/structaccessoperators.md)
- [Structs](../../structs/structs.md)

