---
title: "ProcScript Extended Triggers"
category: "Uniface 9.7 ProcScript Reference"
entries: 34
---

# close

The extended trigger
close is fired when a tree node is closed, so that its
subordinate tree items will no longer be shown in the list view.

```procscript
trigger close
params
   string control : in ; TREE | LIST | KEYBOARD
   string item : in
endparams

end ; trigger close
```

## Parameters

* `control` returns:

  + `TREE` if
    the user clicked in the tree view
  + `LIST` if
    the user clicked in the list view
  + `KEYBOARD` if
    the user performed a keyboard action
* `item` returns the
  value of the closed item.

## Widget

[Tree](../../../../_reference/widgets/tree.md)

---

# collapse

The extended trigger
collapse is fired when a tree item is collapsed, so that
its subordinate tree items are no longer shown in the treeview.

```procscript
trigger collapse
params
   string control: in ; TREE | LIST | KEYBOARD
   string item: in
endparams

end ; trigger collapse
```

## Parameters

* `control` returns:

  + `TREE` if
    the user clicked in the tree view
  + `LIST` if
    the user clicked in the list view
  + `KEYBOARD` if
    the user performed a keyboard action
* `item` returns the value of the collapsed item.

## Widget

[Tree](../../../../_reference/widgets/tree.md)

---

# Column\_Resized

The extended trigger `Column_Resized` is fired when the user resizes
the column width with the mouse or when a column is made visible with the
$columnsyntax. It is not fired when the size is changed with the
columnwidth entity property.

```procscript
trigger Column_Resized
params
 String  columnName       : in
 numeric viewportWidthPx  : in
 string  columnWidthsPx   : in
endparams

;your code here

end
```

## Parameters

* `columnName`—fully-qualified
  field name of the column resized with the mouse or made visible/hidden by the $columnsyntax.
* `viewportWidthPx` —viewport
  width, in pixels, excluding the row header and scroll bar.
* `columnWidthsPx` —Uniface list
  of column width pairs, excluding the hidden columns. List items are formatted as follows usin GOLD
  ; as the separator:

  Columnname=Pixels
  {;Columnname=Pixels}

## Widget

[Grid](../../../../_reference/widgets/grid.md)

## Changing the Column Width

The following Proc code changes the column width
of a column that was not resized to fit the view port.

```procscript
trigger Column_Resized 
params 
   string  columnName       : in 
   numeric viewportWidthPx  : in 
   string  columnWidthsPx   : in 
endparams
variables
   string col1, col2, name1, name2, colWid, entProp
   numeric width1, width2
endvariables

   ; get first column info.
   col1 = $itemnr(1, columnWidthsPx)
   name1 = $idpart(col1)
   width1 = $valuepart(col1)

   ; get second column info.
   col2 = $itemnr(2, columnWidthsPx)
   name2 = $idpart(col2)
   width2 = $valuepart(col2)

   ; change the column width to fit the view port.
   if (columnName = name1)
      width2 = viewportWidthPx - width1
   else
      width1 = viewportWidthPx - width2
   endif

   ; create the column list.
   putitem/id colWid, name1, "%%width1%%%px"
   putitem/id colWid, name2, "%%width2%%%px"

   ; get current entity properties.
   entProp = $entityproperties(ENT.MODEL)

   ; delete the current columnwidth property.
   delitem/id entProp, "columnwidth"

   ; add the new columnwidth property.
   putitem/id entProp, "columnwidth", colWid

   ; set entity properties.
   $entityproperties(ENT.MODEL) = "%%entProp"

end ; trigger Column_Resized
```

## Related Topics

- [Viewport_Resized](viewport_resized.md)


---

# ColumnHeader\_LClicked

The extended trigger ColumnHeader\_LClicked is fired whenever the
user left-clicks a column header of the grid widget.

```procscript
trigger ColumnHeader_LClicked
params
   string fieldName : in
   numeric shiftKey : in
endparams

end ; trigger ColumnHeader_LClicked
```

## Parameters

* `fieldName` returns the field name of which the column header is
  clicked
* `shiftKey` returns whether the Shift, Alt, or Control, or a combination
  of these keys, is pressed, when the column header is clicked, as shown in the table.

Values returned in
shiftKey

| shiftKey | Shift | Control | Alt |
| --- | --- | --- | --- |
| 0 | Not pressed | Not pressed | Not pressed |
| 1 | Pressed | Not pressed | Not pressed |
| 2 | Not pressed | Pressed | Not pressed |
| 3 | Pressed | Pressed | Not pressed |
| 4 | Not pressed | Not pressed | Pressed |
| 5 | Pressed | Not pressed | Pressed |
| 6 | Not pressed | Pressed | Pressed |
| 7 | Pressed | Pressed | Pressed |

## Widget

[Grid](../../../../_reference/widgets/grid.md)

The following Proc code orders the occurrences in the hit list based on the clicked column
header:

```procscript
trigger ColumnHeader_LClicked
params
   string fieldName: in
   numeric shiftKey : in
endparams
; sort occurrences based on the clicked column
if ($sortOrder$ = "%%fieldName%%%:a")
   $sortOrder$ = "%%fieldName%%%:d"
else
   $sortOrder$ = "%%fieldName%%%:a"
endif

sort/e "<$entname>", $sortOrder$
$prompt = fieldName

end ; trigger ColumnHeader_LClicked
```

---

# columnsorted

The extended trigger
columnSorted is fired when the user clicks a column header
in the list view, thereby sorting the list view according to that column, in
ascending or descending order.

```procscript
trigger columnSorted
params
   numeric columnid : in
   string sortingorder : in ; ASC | DESC
endparams

end ; trigger columnSorted
```

## Parameters

* `columnid` returns the column number in the list view, counting from 1
* `sortingorder` returns:

  + `ASC` if
    the sorting order is ascending
  + `DESC`
    if the sorting order is descending

## Widget

[Tree](../../../../_reference/widgets/tree.md)

---

# columnwidth

The extended trigger columnWidth is fired when the user clicks and
drags the header separator of the tree widget to a new location and drops it. This trigger is fired
only in the list view and only when the user releases the dragged header separator.

```procscript
trigger columnWidth
params
   string id: in
   string width : in
endparams

end ; trigger columnWidth
```

## Parameters

* `id` returns the column index number, counting from zero as the
  left-most column
* `width` returns the width of the column

## Widget

[Tree](../../../../_reference/widgets/tree.md)

---

# copyto

The extended trigger
copyto is fired when a drop with drop action Copy occurs.

```procscript
trigger copyTo
params
   string dragvalue : in
   string dropformat : in
   string itemvalue : in
   numeric numberofobjects : in
   numeric index : in
endparams

end ; trigger copyTo
```

## Parameters

* `dragvalue` returns
  the value of the dragged object
* `dropformat` returns
  the negotiated drop format
* `itemvalue` returns
  the value of the (tree) item on which the drop occurs; this value
  will be "" (empty string) if a drop occurs on a widget, for example, on
  a picture widget.

For multiple drop:

* `numberofobjects`
  returns the number of multiple objects being dropped
* `index` returns
  the numeric index, starting with 1, of the object being dropped

## Widget

[Drag-and-Drop](../../../../_reference/widgets/drag_and_drop.md)

---

# CornerButton\_LClicked

The CornerButton\_LClicked trigger is activated when the user
clicks the corner button of the grid widget., with or without any combination of the
Shift, Alt, and Control keys.

```procscript
trigger CornerButton_LClicked
params
   numeric shiftKey : in
endparams

end ; trigger CornerButton_LClicked
```

## Parameters

* `shiftKey`—returns an integer
  that indicates whether the Shift, Alt, Control, or a combination
  of these keys, is pressed, when the corner button is clicked.

Values returned in shiftKey

| Value of shiftKey | Meaning |
| --- | --- |
| 0 | No keys pressed |
| 1 | Shift |
| 2 | Ctrl |
| 3 | Shift+Ctrl |
| 4 | Alt |
| 5 | Shift+Alt |
| 6 | Ctrl+Alt |
| 7 | Shift+Ctrl+Alt |

## Widget

[Grid](../../../../_reference/widgets/grid.md)

---

# createshortcutto

The extended trigger
createshortcutto is fired when a drop with drop action
Create Shortcut occurs.

```procscript
trigger createShortcutTo
params
   string dragvalue : in
   string dropformat : in
   string itemvalue : in
   numeric numberofobjects : in
   numeric index : in
endparams

end ; trigger createShortcutTo
```

## Parameters

* `dragvalue` returns
  the value of the dragged object
* `dropformat` returns
  the negotiated drop format
* `itemvalue` returns
  the value of the (tree) item on which the drop occurs; this value
  will be "" (empty string) if a drop occurs on a widget, for example, on
  a picture widget.

For multiple drop:

* `numberofobjects`
  returns the number of multiple objects being dropped
* `index` returns
  the numeric index, starting with 1, of the object being dropped

## Widget

[Drag-and-Drop](../../../../_reference/widgets/drag_and_drop.md)

---

# doubleclick

The extended trigger
doubleclick is fired when the user double-clicks a tree or
list item.

```procscript
trigger doubleClick
params
   string control : in ; TREE | LIST | KEYBOARD
   string item : in
endparams

end ; trigger doubleClick
```

## Parameters

* `control` returns:

  + `TREE` if
    the user clicked in the tree view
  + `LIST` if
    the user clicked in the list view
  + `KEYBOARD` if
    the user performed a keyboard action
* `item` returns the value of the double-clicked item

## Widget

[Tree](../../../../_reference/widgets/tree.md)

---

# expand

The extended trigger
expand is fired when a tree item is expanded, so that its
subordinate tree items are shown in the tree view.

```procscript
trigger expand
params
   string control: in ; TREE | LIST | KEYBOARD
   string item : in
endparams

end ; trigger expand
```

## Parameters

* `control` returns:

  + `TREE` if
    the user clicked in the tree view
  + `LIST` if
    the user clicked in the list view.
  + `KEYBOARD` if
    the user performed a keyboard action
* `item` returns
  the value of the double-clicked item

## Widget

[Tree](../../../../_reference/widgets/tree.md)

---

# loadError

Use this trigger to notify the user about an invalid URL or other error returned by
the embedded browser in the HTML widget.

```procscript
trigger loadError
params
    numeric ErrorCode : IN
    string  ErrorText : IN
endparams
; Enter your code here ...
end
```

## Parameters

| Parameter | Meaning |
| --- | --- |
| ErrorCode | Error code returned by the embedded browser, such as `404` for an invalid URL |
| ErrorText | Text of the error returned by the embedded browser |

## Description

By default, when a problem is encountered when
loading a web page in the HTML widget, such as an invalid URL or a server timeout, an empty page is
displayed. This is not very useful to the user, so you can use the loadError trigger to notify the
user of the error by displaying an error page or message with the details.

## Trigger Activation

The loadError trigger is activated when a problem
is encountered in loading a URL into the HTML widget. The error code and error text are returned by
the browser embedded in the HTML widget (the Chromium Embedded Framework (CEF)).

## Applies To

[HTML Widget](../../../_reference/widgets/htmlwidget.md)

## Using loadError

```procscript
trigger loadError 
params
    numeric errorcode : in
    string  errortext : in
endparams
message/info "%%errorcode%%%: %%errortext%%%"
end
```

---

# movefrom

The extended trigger
movefrom is fired on the drag source when a drop with drop
action Move occurs.

```procscript
trigger moveFrom
params
   string dragvalue : in
   string dropformat : in
   numeric numberofobjects : in
   numeric index : in
endparams

end ; trigger moveFrom
```

## Parameters

* `dragvalue` returns
  the value of the dragged object
* `dropformat` returns
  the negotiated drop format

For multiple drop:

* `numberofobjects`
  returns the number of multiple objects being dropped
* `index` returns
  the numeric index, starting with 1, of the object being dropped

## Widget

[Drag-and-Drop](../../../../_reference/widgets/drag_and_drop.md)

## Description

movefrom is fired after
`moveto`. Both movefrom and moveto are only fired if the
drag source and drop target are in different widgets, otherwise
movewithin is used.

---

# moveto

The extended trigger
moveto is fired on the drag source when a drop with drop
action Move occurs.

```procscript
trigger moveTo
params
   string dragvalue : in
   string dropformat : in
   string itemvalue : in
   numeric numberofobjects : in
   numeric index : in
endparams

end ; trigger moveTo
```

## Parameters

* `dragvalue` returns
  the value of the dragged object
* `dropformat` returns the negotiated drop format
* `itemvalue` returns the value of the (tree) item on which the drop occurs; this value
  will be "" (empty string) if a drop occurs on a widget, for example, on
  a picture widget

For multiple drops:

* `numberofobjects`
  returns the number of multiple objects being dropped
* `index` returns the numeric index, starting with 1, of the object being dropped

## Widget

[Drag-and-Drop](../../../../_reference/widgets/drag_and_drop.md)

## Description

moveto is fired before
movefrom. Both movefrom and moveto are only fired if the
drag source and drop target are in different widgets, otherwise
movewithin is used.

---

# movewithin

The extended trigger
moveWithin is fired on the drag source when a drop with
drop action Move occurs, if the drag & drop occurs within the same widget.

```procscript
trigger moveWithin
params
   string dragvalue : in
   string dropformat : in
   string itemvalue : in
   numeric numberofobjects : in
   numeric index : in
endparams

end ; trigger moveWithin
```

## Parameters

* `dragvalue` returns
  the value of the dragged object
* `dropformat` returns
  the negotiated drop format
* `itemvalue` returns
  the value of the (tree) item on which the drop occurs; this value
  will be "" (empty string) if a drop occurs on a widget, for example on
  a picture widget

For multiple drops:

* `numberofobjects`
  returns the number of multiple objects being dropped
* `index` returns
  the numeric index, starting with 1, of the object being dropped

## Widget

[Drag-and-Drop](../../../../_reference/widgets/drag_and_drop.md)

---

# OnBlur

The OnBlur web trigger is used to program behavior when the DSP widget loses focus.

```procscript
webtrigger OnBlurOptional scope blockOptional variables blockjavascriptJavascript to implement the client-side triggerendjavascript
end
```

## Parameters

None

## Description

If defined, the OnBlur trigger is fired when the
user tabs or clicks away from a field in a DSP. It can be used to reverse the effects applied by
the OnFocus trigger.

## Applicable Widgets

This trigger is applicable only on HTML-based
widgets that can get and lose focus. It is not available on Dojo widgets.

[AttributesOnly](../../../../_reference/widgetsdsp/dsp_attributesonly.md)

[CommandButton](../../../../_reference/widgetsdsp/dsp_commandbutton.md)

[Checkbox](../../../../_reference/widgetsdsp/dsp_checkbox.md)

[Datepicker](../../../../_reference/widgetsdsp/dsp_datepicker.md)

[DropdownList](../../../../_reference/widgetsdsp/dsp_dropdownlist.md)

[EditBox](../../../../_reference/widgetsdsp/dsp_editbox.md)

[ListBox](../../../../_reference/widgetsdsp/dsp_listbox.md)

[Password](../../../../_reference/widgetsdsp/dsp_password.md)

[RadioGroup](../../../../_reference/widgetsdsp/dsp_radiogroup.md)

[TextArea](../../../../_reference/widgetsdsp/dsp_textarea.md)

## Using OnBlur

In the following example, the trigger prevents the
user from moving to another field if the entered data in the field incorrectly.

```procscript
; On ID field
webtrigger OnBlur
   scope
output
endscope
javascript
    //
    if (this.getError() !== null) {
        this.focus();
    }
endjavascript
end
```

---

# OnChange

Use this trigger to program behavior when data in the DSP widget is interactively
changed by the user. The trigger is not activated when data is changed by the Uniface JavaScript
API.

```procscript
webtrigger OnChangeOptional scope blockOptional variables blockjavascriptJavascript to implement the client-side triggerendjavascriptend
```

- or -

```procscript
trigger OnChangeOptional scope blockOptional variables blockProc code to implement a server-side triggerend
```

## Parameters

None

## Widgets

* [AttributesOnly](../../../../_reference/widgetsdsp/dsp_attributesonly.md)
* [Checkbox](../../../../_reference/widgetsdsp/dsp_checkbox.md)
* [Datepicker](../../../../_reference/widgetsdsp/dsp_datepicker.md)
* [DropdownList](../../../../_reference/widgetsdsp/dsp_dropdownlist.md)
* [EditBox](../../../../_reference/widgetsdsp/dsp_editbox.md)
* [ListBox](../../../../_reference/widgetsdsp/dsp_listbox.md)
* [Password](../../../../_reference/widgetsdsp/dsp_password.md)
* [RadioGroup](../../../../_reference/widgetsdsp/dsp_radiogroup.md)
* [TextArea](../../../../_reference/widgetsdsp/dsp_textarea.md)

## Description

The OnChange trigger may be fired more than once for the Datepicker widget, or any native HTML5 controls, such as for Time, Datetime-Local, Week, Month, which are mapped to the Uniface physical widget `htmlinput` with html:type set to `date`.

The user interface used by the browser to display the date picker determines when the OnChange trigger is fired. For example, in Chrome and Firefox, the OnChange trigger is fired every time a day, month, or year is changed, whereas in Edge, it is fired only when the check box is clicked.

**Tip:** If you want to get the Datepicker value that was changed by the user, use the OnBlur trigger rather than the OnChange trigger.

## Related Topics

- [trigger](../../procstatements/trigger.md)
- [webtrigger](../../procstatements/webtrigger.md)


---

# OnClick

This trigger is used to program behavior when the user clicks on DSP widget.

```procscript
webtrigger OnClickOptional scope blockOptional variables blockjavascriptJavascript to implement the client-side triggerendjavascriptend
```

- or -

```procscript
trigger OnClickOptional scope blockOptional variables blockProc code to implement a server-side triggerend
```

## Parameters

None

## Widgets

[AttributesOnly](../../../../_reference/widgetsdsp/dsp_attributesonly.md)

---

# OnDblClick

This trigger is used to program behavior when the user double-clicks the DSP widget.

```procscript
webtrigger OnDblClickOptional scope blockOptional variables blockjavascriptJavascript to implement the client-side triggerendjavascriptend
```

- or -

```procscript
trigger OnDbClickOptional scope blockOptional variables blockProc code to implement a server-side triggerend
```

## Parameters

None

## Widgets

[AttributesOnly](../../../../_reference/widgetsdsp/dsp_attributesonly.md)

---

# OnEdit

The OnEdit extended trigger is fired as soon as a field value is changed as a result
of user interaction, such as entering a character, cutting or pasting text, or undo or redo of
character entry.

```procscript
trigger OnEdit
public web
;Enter your Proc code here

end ; trigger close
```

## Parameters

None

## Widgets

[EditBox](../../../../_reference/widgetsdsp/dsp_editbox.md)

## Description

The OnEdit trigger is executed only in response to
client-side interactions, not to field changes caused by the server. It makes it possible to
implement responsive functionality in DSPs, such as incremental searching or a progress bar.

**Note:**  The OnEdit trigger is not meant for actions such
as completing a DB transaction (store, commit). You are advised to implement this type of behavior
using a command button to submit such requests.

When implementing the OnEdit trigger, you have to
take scoping and blocking into account. If `output` scope is defined in the
scope block, the field is blocked for the duration of the request-response
exchange and the field data will be overwritten, potentially losing user input. For this reason,
compiler warnings are issued if no scope block is defined (so both
`input` and `output` scope are assumed), or if
`output` scope is defined in the scope block. For more information, see [Execution of Server-Side Triggers and Operations](../../../../webapps/components/dsps/dsprequestresponsecycle.md) and [Input and Output Scope](../../../../webapps/components/dsps/inputandoutputscoping.md).

## Incremental Searching

If you want to implement incremental searching,
you can use a JavaScript timer to program a delay before data is sent to the server. You also need
to keep in mind the following issues:

* Uniface strips trailing spaces from data sent
  to the server. If the user searches for a phrase that includes spaces, the response will show no
  difference between a single word and a word that has a space after it until a character is
  submitted after the space.
* If you want to allow wildcards in the search
  (such as `*` or `?`), the operation invoked by the OnEdit trigger
  must translate these characters to Uniface profile characters (GOLD `*`, GOLD
  `?`).

A sample implementation of incremental searching
(RiaIncrementalSearch.zip) is available on
[uniface.info](https://www.uniface.info/ "www.uniface.info/").

## Browser Limitations

Browser functionality can affect OnEdit trigger
behavior. Known issues that can affect the OnEdit trigger are:

* Drag and drop support—when data is dragged
  into a field, the OnEdit trigger is executed on FireFox but not on Internet Explorer 7.0 (and other
  browsers).
* Field focus—after the OnEdit trigger is
  executed, the focus should stay in the field being edited. This may fail on unsupported browsers
  (for example, it fails on Opera). After editing a field (and firing the OnEdit trigger) and tabbing
  to the next one, the next field should get the focus. This fails on Internet Explorer 7.0, and
  several unsupported browsers.

For example, a DSP component called SEARCH, has a
two fields:

| Field | Widget Type | Comments |
| --- | --- | --- |
| SEARCH | EditBox | Has OnEdit trigger |
| RESULTS | DspContainer | Bound to RESULTS\_DSP component |

The OnEdit trigger of the SEARCH field contains
the following code, which activates the `getProfile` operation of the RESULTS\_DSP
component.

```procscript
; Extended Triggers trigger of SEARCH field
trigger OnEdit
public web
scope
   input                                   ;SEARCH field contents sent as input in the request
   operation RESULTS_DSP.getProfile        ;response will be returned by this operation
endscope

activate "RESULTS_DSP".getProfile (SEARCH) ;call the operation of the contained DSP to retrieve the results

end
```

After each keystroke, the contents of the SEARCH
field are sent to the server as input to the getProfile operation, which returns the data in the
response displayed in the RESULTS field.

**Note:**  For simplicity, this example does not use the
Timer widget, which enables you limit the number of request-response exchanges. In real life, this
example would result in too much network traffic and too many web page updates.

---

# onEdit

Extended trigger for handling changes to the content of an edit box as the user types,
when the OnEdit widget property is `True`. The onEdit trigger is
typically used to implement incremental search functionality, in which the retrieved results change
as the user enters a search profile

```procscript
trigger onEdit
; Your code here
end; onEdit
```

## Description

The onEdit trigger has no parameters. Unlike most
extended triggers, an empty trigger definition is not added to each newly-created edit box field.
Instead, you must manually define it yourself. (The edit box is the most commonly-used widget, and
this prevents unused code from being added to all these widget definitions.)

The onEdit trigger is applicable to both
single-line and multiline edit boxes. In a multiline edit box, the trigger is not fired if the
field is empty and the Enter key is pressed.

## Trigger Activation

The trigger can be fired each time the user
changes the content of the field in some way—by adding or removing a character, or by pasting and
cutting content, or after a delay of 200 milliseconds. However, the onEdit trigger is not fired if
the field is assigned a value in Proc.

To prevent unnecessary processing, the trigger can
be fired only if the OnEdit property is `True`. The
EditDelay property can be used to apply a delay of 200 milliseconds after the
user stops entering data. This reduces the frequency of firing the onEdit trigger to improve
performance when retrieving data. By default, EditDelay is
`True`.

## Applies To

[Edit Box](../../../_reference/widgets/edit_box.md)

## Incremental Searching

The following example shows how you can implement
a simple form of incremental searching. The form contains two entities—CUSTOMER and
CUSTOMER\_FILTER. The following onEdit trigger is implemented on the NAME.CUSTOMER\_FILTER field:

```procscript
trigger onEdit
  variables
		  string vSearchProfile
  endvariables

  clear/e "CUSTOMER"                         
  vSearchProfile = "%%NAME.CUSTOMER_FILTER%%%•*"  
  NAME.CUSTOMER = $uppercase(vSearchProfile) 
  retrieve/e "CUSTOMER"    
end; onEdit trigger
```

1. Clear the CUSTOMER entity.
2. Create a search profile using the value of the
   NAME.CUSTOMER\_FILTER field.
3. Assign the search profile to the field to be
   searched (converting it to uppercase).
4. Retrieve the CUSTOMER occurrences that match
   the search profile.

## Related Topics

- [OnEdit](../../../development/reference/devobjproperties/widgets/_common/enableonedit.md)
- [EditDelay](../../../development/reference/devobjproperties/widgets/editdelay.md)


---

# OnFocus

The OnFocus web trigger is used to program behavior when the DSP widget gets focus.

```procscript
webtrigger OnFocusOptional scope blockOptional variables blockjavascriptJavascript to implement the client-side triggerendjavascriptend
```

## Parameters

None

## Description

If defined, the OnFocus trigger is fired when the
widget receives focus, by the user tabbing to or clicking on a field in a DSP. The OnBlur trigger
can be used to reverse the effects caused by the OnFocus trigger.

## Widgets

This trigger is applicable only on HTML-based
widgets that can get and lose focus. It is not available on Dojo widgets.

[AttributesOnly](../../../../_reference/widgetsdsp/dsp_attributesonly.md)

[Checkbox](../../../../_reference/widgetsdsp/dsp_checkbox.md)

[CommandButton](../../../../_reference/widgetsdsp/dsp_commandbutton.md)

[Datepicker](../../../../_reference/widgetsdsp/dsp_datepicker.md)

[DropdownList](../../../../_reference/widgetsdsp/dsp_dropdownlist.md)

[EditBox](../../../../_reference/widgetsdsp/dsp_editbox.md)

[ListBox](../../../../_reference/widgetsdsp/dsp_listbox.md)

[RadioGroup](../../../../_reference/widgetsdsp/dsp_radiogroup.md)

[Password](../../../../_reference/widgetsdsp/dsp_password.md)

[TextArea](../../../../_reference/widgetsdsp/dsp_textarea.md)

## Using OnFocus

A Javascript trigger displays a <div>
element as a popup when the field gets the focus. For example, an HTML <div> element is
defined in the layout as:

```procscript
<div id="popover" style="visibility: hidden;">Use uppercase letters only.</div>
```

The following OnFocus trigger displays the
element:

```procscript
webtrigger onfocus
scope
output
endscope
javascript
    document.getElementById('popover').style.visibility = 'visible';
endjavascript
end
```

The effect can be reversed in the OnBlur
trigger:

```procscript
webtrigger OnBlur
javascript
    document.getElementById('popover').style.visibility = 'hidden';
endjavascript
end
```

## Related Topics

- [OnBlur](onblur.md)


---

# OnKeyPress

This trigger is used to program behavior when the user presses a key while the widget
has focus.

```procscript
webtrigger OnKeyPressOptional scope blockOptional variables blockjavascriptJavascript to implement the client-side triggerendjavascriptend
```

- or -

```procscript
trigger OnKeyPressOptional scope blockOptional variables blockProc code to implement a server-side triggerend
```

## Parameters

None

## Widgets

[AttributesOnly](../../../../_reference/widgetsdsp/dsp_attributesonly.md)

---

# OnSyntaxError

The OnSyntaxError web trigger is activated when a field syntax violation is detected
in the browser. It can be used to customize or override the default syntax error
handling.

```procscript
webtrigger OnSyntaxErrorOptional scope blockOptional variables blockjavascriptJavascript to implement the client-side triggerendjavascriptend
```

## Parameters

None

## Return Values

The OnSyntaxError trigger can return undefined (no
return value), `true`, or `false`.

If Javascript `false` is returned,
the default error handling is suppressed. Thus, if bound error elements are present in the layout,
they are not displayed, and the default error styling is not applied.

If no return value is defined, or any other value
is returned, the default syntax error handling continues as normal after the OnSyntaxError trigger
is executed.

## Widgets

[Checkbox](../../../../_reference/widgetsdsp/dsp_checkbox.md)

[Datepicker](../../../../_reference/widgetsdsp/dsp_datepicker.md)

[DropdownList](../../../../_reference/widgetsdsp/dsp_dropdownlist.md)

[EditBox](../../../../_reference/widgetsdsp/dsp_editbox.md)

[ListBox](../../../../_reference/widgetsdsp/dsp_listbox.md)

[Password](../../../../_reference/widgetsdsp/dsp_password.md)

[RadioGroup](../../../../_reference/widgetsdsp/dsp_radiogroup.md)

[TextArea](../../../../_reference/widgetsdsp/dsp_textarea.md)

## Description

When client-side syntax error checking is enabled
(by the field's ClientSyntaxCheck property) and the user makes an error in
entering data in the field, the OnSyntaxError trigger is executed, and some classes are added to
the field.

If there is no OnSyntaxError trigger, or it does
NOT return `false`:

* If there is a bound error element (such as
  `<span uflderror:FIELD.ENTITY.MODEL/>`) present in the layout, it is filled
  with the error text and a class is applied.
* Widget-specific error display functionality is
  invoked.

  Only Dojo widgets have a widget-specific error
  display, in the form of a text balloon.

If you want to handle the error in a different
way, you can use the OnSyntaxError web trigger to disable the default error handling and provide
your own solution. For example, you could add a line to the beginning or end of the page indicating
that there were syntax errors detected, or add some kind of visual indicator to mandatary fields
with missing data, and so on.

You can use the OnSyntaxErrorResolved trigger to
reverse any effects defined in the OnSyntaxError trigger. For more information, see  [OnSyntaxErrorResolved](onsyntaxerrorresolved.md).

## Custom Syntax Error Handling

The following example displays a JavaScript alert
box with details of the syntax error.

```procscript
webtrigger OnSyntaxError
scope
  input
endscope

javascript 
  var str = 'OnSyntaxError trigger' + '\n';
  str += 'Exception code: ' + this.getError().exceptionCode + '\n';
  str += 'Message: ' + this.getError().message + '\n';
  str += 'Value in error: ' + this.getError().valueInError + '\n';
  str += 'Value: ' + this.getValue() + '\n';
  str += 'Field Name: ' + this.getName() + '\n';
  str += 'Label: ' + this.getLabel().getValue() + '\n';
  str += 'Syntax: ' + JSON.stringify(this.getDeclarativeSyntax()) + '\n';
  alert(str);
  return true
endjavascript
end ; OnSyntaxError
```

Assume that the user enters a string into a
numeric field called Age. The resulting alert box would look something like this:

## Related Topics

- [Syntax Checking in Dynamic Server Pages](../../../../webapps/applicationissues/validation/syntax_checking_dsps.md)
- [OnSyntaxErrorResolved](onsyntaxerrorresolved.md)


---

# OnSyntaxErrorResolved

The OnSyntaxErrorResolved web trigger is used to customize behavior when a field
syntax error has been corrected.

```procscript
webtrigger OnSyntaxErrorResolved
  Optional scope block
  Optional variables block 
  javascript
     Javascript to implement the client-side trigger 
  endjavascript   
end
```

## Parameters

None

## Return Values

The OnSyntaxErrorResolved trigger can return
undefined (no return value), `true`, or `false`.

## Widgets

[Checkbox](../../../../_reference/widgetsdsp/dsp_checkbox.md)

[Datepicker](../../../../_reference/widgetsdsp/dsp_datepicker.md)

[DropdownList](../../../../_reference/widgetsdsp/dsp_dropdownlist.md)

[EditBox](../../../../_reference/widgetsdsp/dsp_editbox.md)

[ListBox](../../../../_reference/widgetsdsp/dsp_listbox.md)

[Password](../../../../_reference/widgetsdsp/dsp_password.md)

[RadioGroup](../../../../_reference/widgetsdsp/dsp_radiogroup.md)

[TextArea](../../../../_reference/widgetsdsp/dsp_textarea.md)

## Description

When an error is corrected (that is, when a field
was in error and now is not), the OnSyntaxErrorResolved trigger is executed, if implemented for the
field. It enables you to reverse any effects that you may have implemented in the OnSyntaxError web
trigger, when an error was first detected.

If the OnSyntaxError trigger has been implemented
on the same field, and returns `true` or nothing, then any highlighting and error
labels will be hidden after the OnSyntaxErrorResolved trigger completes.

## Related Topics

- [Syntax Checking in Dynamic Server Pages](../../../../webapps/applicationissues/validation/syntax_checking_dsps.md)
- [OnSyntaxError](onsyntaxerror.md)


---

# onTabButton

The onTabButton extended trigger is used to implement the processing that should occur
when a user clicks the tab button, if present, in the active tab of the TabEx widget.

```procscript
trigger onTabButton
; enter your code here
    
end ; trigger onTabButton"
```

## Description

The onTabButton trigger is typically used to close
a tab when the user clicks on the tab button. This button is located on each tab only if the
TabButton property of the TabEx widget is `True`.

## Trigger Activation

The onTabButton trigger is activated when the user
clicks the tab button on a tab.

## Applies To

[TabEx](../../../_reference/widgets/tabex.md)

## Related Topics

- [TabButton](../../../development/reference/devobjproperties/widgets/tab/tabbutton.md)


---

# open

The extended trigger
open is fired when a tree node is opened, so that its
subordinate tree items are shown in the list view.

```procscript
trigger open
params
   string control : in ; TREE | LIST
   string item : in
endparams

end ; trigger open
```

## Parameters

* `control` returns `TREE` if
  the user clicked in the tree view
  or `LIST` if
  the user clicked in the list view
* `item` returns the value of the opened item

## Widget

[Tree](../../../../_reference/widgets/tree.md)

---

# representationChanged

The extended trigger representationChanged is fired when the user
ends an inline edit action by pressing Enter or
Esc.

```procscript
trigger representationChanged
params
   string itemValue : in
   string control : in ; TREE | LIST
   string newRepresentation : in
endparams

end ; trigger representationChanged
```

## Parameters

* itemValue returns the value of the item that had its representation
  changed
* Control returns `LIST` if the item is changed in the
  list view , or `TREE` if the item is changed in the tree view
* newRepresentation returns the text entered by the user

## Widget

[Tree](../../../../_reference/widgets/tree.md)

## Description

A user can change the text of a node or leaf in a tree only if the tree widget property
Inline Edit is
`TRUE`. In this case, the extended trigger representationChanged
is fired after the user completes the following sequence of actions:

1. Selects a node or leaf in the tree
2. Double-clicks the mouse or presses the F2 key to allow a change to be made
3. Changes the text
4. Presses the Enter or Esc key

## Related Topics

- [Inline Edit](../../../../development/reference/devobjproperties/widgets/tree/inlineedit_inlineedit.md)


---

# representationChanging

The extended trigger representationChanging is fired when the user
starts to edit a node or leaf in the tree widget.

```procscript
trigger representationChanging
params
  string itemValue: in
endparams

end ; trigger representationChanging
```

## Parameters

itemValue returns the value of the item that is being changed

## Description

A user can change the text of a node or leaf in a tree only if the tree widget property
Inline Edit is
`TRUE`. In this case, the extended trigger representationChanging
is fired after the user completes the following sequence of actions:

1. Selects a node or leaf in the tree
2. Double-clicks the mouse or presses the F2 key to allow a change to be made

The value of the ValRep item being edited is passed to the trigger.

The representationChanging trigger is can be useful if you need to lock
the occurrence being edited.

## Related Topics

- [Inline Edit](../../../../development/reference/devobjproperties/widgets/tree/inlineedit_inlineedit.md)


---

# Resized

The extended trigger `Resized` is fired when the parent form is
started, and whenever the widget is resized (which is only possible if the
Attach property is set).

```procscript
trigger Resized
params
   numeric widthPx : in
   numeric heightPx : in
endparams

;your code here

end ; Resized
; -- end triggers for formcontainer widget
```

## Parameters

* widthPx—width of the
  widget (without frame) in pixels
* heightPx—height of the
  widget (without frame) in pixels

## Available On

[Form Container](../../../_reference/widgets/formcontainer.md)

[TabEx](../../../_reference/widgets/tabex.md)

## Description

If the parent widget of a contained form is
attached to a form border and is resized, it may be necessary to change the contained form as well.
For example, if the widget is becomes too small to display the contents of the contained form, you
could display a different form.

## Using the Resized Trigger

The following Proc code loads one of two forms in
a Form Container, depending on the available width.

```procscript
trigger Resized
params
  numeric widthPx         : in
  numeric heightPx        : in
endparams

  if (widthPx > 300)
    ; Load form with wide layout in this Form Container
    @$fieldname = "CUST_WIDE"
  else
    ; Load form with narrow layout in this Form Container
    @$fieldname = "CUST_NARROW"
  endif

end; Resized
```

---

# rollover

The extended trigger
rollover is fired when a user moves into a map polygon, if
the Sense field has been set to `rollover`. When this happens, the
rollover image demarcates the polygon.

```procscript
trigger rollOver
params
   string rollovervalue: in
endparams

end ; trigger rollOver
```

## Parameters

`rollovervalue` returns the tagname of the highlighted hotspot

## Widget

[Map](../../../../_reference/widgets/map.md)

---

# RowHeader\_LClicked

The extended trigger
RowHeader\_LClicked is fired whenever the user left-clicks
a row header of the grid widget.

```procscript
trigger RowHeader_LClicked
params
   numeric rowNumber : in
   numeric shiftKey : in
endparams

end ; trigger RowHeader_LClicked
```

## Parameters

* `rowNumber` returns the occurrence number of
  which the row header is clicked
* `shiftKey` returns whether the Shift, Alt,
  Control, or a combination of these keys, is pressed, when the row header is
  clicked, as shown in the table.

Values returned in
shiftKey

| shiftKey | Shift | Control | Alt |
| --- | --- | --- | --- |
| 0 | Not pressed | Not pressed | Not pressed |
| 1 | Pressed | Not pressed | Not pressed |
| 2 | Not pressed | Pressed | Not pressed |
| 3 | Pressed | Pressed | Not pressed |
| 4 | Not pressed | Not pressed | Pressed |
| 5 | Pressed | Not pressed | Pressed |
| 6 | Not pressed | Pressed | Pressed |
| 7 | Pressed | Pressed | Pressed |

## Widget

[Grid](../../../../_reference/widgets/grid.md)

```procscript
trigger RowHeader_LClicked
params
   numeric rowNumber : in
   numeric shiftKey : in
endparams
; select occurrences based on the clicked row

setocc "<$entname>", rowNumber

end ; trigger RowHeader_LClicked
```

---

# Triggers: Extended

Extended triggers are script modules that are executed in response to events
associated with a widget. They can be fired as a result of user actions, such as clicking a widget,
or they can be invoked by the callfieldtrigger Proc command.

Extended triggers are defined in the Extended
Triggers trigger container. For widgets in forms and reports, you can define them using the trigger Proc statement.

For DSP widgets, they can be defined using the
webtrigger Proc statement for client-side execution, or the
trigger statement for server-side execution.

## Related Topics

- [Extended Triggers](../../triggers/concepts/extended_triggers.md)
- [Extended Triggers for OCX Container Widgets](../../../desktopapps/widgets/ocxcontainer/extended_triggers_for_ocx_container_widgets.md)
- [Drag and Drop Behavior](../../../desktopapps/draganddrop/drag___drop.md)


---

# Viewport\_Resized

The extended trigger Viewport\_Resized enables you to react to changes made when the
form or grid widget is resized.

```procscript
trigger Viewport_Resized
params
  numeric widthPx         : in
  numeric heightPx        : in
  string  columnWidthsPx  : in
endparams

; your code here

end; Viewport_Resized
```

## Parameters

* `widthPx`—width of the grid's
  viewport in pixels.

  **Note:**  The viewport is considered to
  be all the visible content of the grid, excluding the row headers, columns headers, and scroll bar.
* `heightPx`—viewport height in
  pixels excluding the column header, scroll bar.
* `columnWidthsPx`—Uniface list
  of column width pairs, excluding the hidden columns. List items are formatted as follows using GOLD
  ; as the separator:

  Columnname=Pixels
  {;Columnname=Pixels}

## Trigger Activation

The Viewport\_Resized trigger is fired when:

* The form containing the widget is started or
  loaded into form container
* The Grid widget (excluding row headers, column
  headers, and scroll bars) is resized.
* The width of a flat border that is displayed
  around the grid is resized. For more information, see [Border Width](../../../../development/reference/devobjproperties/widgets/_common/borderwidth.md).

## Widget

[Grid](../../../../_reference/widgets/grid.md)

## Related Topics

- [Column_Resized](column_resized.md)

