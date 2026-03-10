---
title: "ProcScript Predefined Operations"
category: "Uniface 9.7 ProcScript Reference"
entries: 8
---

# Accept

Define the behavior that should occur during an Accept request.

```procscript
; trigger AcceptYour code here ...
```

## Use

All components.

## Description

An Accept request is usually invoked to store all
modifications made in a component and then close the component (in contrast to a Quit request).

The accept operation is
implemented in the Accept trigger of the component. For more information, see [Accept](../triggersstandard/accept.md).

## Related Topics

- [Accept](../triggersstandard/accept.md)
- [Quit](quit.md)


---

# Attach

Defines the component behavior for a contained DSP instance after it is attached to a
parent DSP.

```procscript
operation Attach
   {scopeBlock}
   {variablesBlock}

Your code here ...
{end}
```

## Use

Dynamic Server Pages only.

## Description

The Attach operation is useful
for refreshing the contents of the child DSP before it is displayed. For example, you can set the
default data values, issue a message, or apply styles.

A DSP that is contained in another DSP by means of
the DspContainer widget is attached to the parent DSP when the component instance name is assigned
to the DspContainer field. If the DSP component instance is already available on the browser and
the Attach operation is defined, the Attach operation is
fired instead of the Execute trigger.

Following this, the attached component is
displayed, and the Attach trigger is executed.

The Attach operation can only
be implemented in the Operations trigger of a contained DSP component.

**Note:**  Although you can define scope and variables in
an Attach operation, you cannot define parameters.

```procscript
operation attach
  partner web
  FIELD1 = "This is the %%$componentname%%% component, with instance name %%$instancename%%%"
end
```

## Related Topics

- [DspContainer](../../../_reference/widgetsdsp/dsp_dspcontainer.md)


---

# Cleanup

Defines the component behavior when a component instance is removed.

```procscript
operation cleanup
Your code here ...
end
```

## Return Values

The return values of Cleanup
have no effect on further processing.

## Use

All components.

## Description

The Cleanup operation can only
be implemented in the Operations trigger of a component.

If defined, the Cleanup
operation is automatically executed as the instance is removed, which can occur in the following
circumstances:

* When a component instance is removed
  explicitly with deleteinstance.
* When a component instance is automatically
  removed by the successful completion of an Accept or Quit
  operation in a form activated by an edit statement without switches in the
  Execute trigger. (This occurs because there is an implicit exit after the
  edit in the Execute trigger.)

  **Note:**  Completion of an ACCEPT
  or QUIT operation does *not* remove the form instance if it was
  activated by `edit/modal`,
  `edit/nonmodal`, or show (in an operation).
  Only the visual representation of the form is removed.
* When an exit is
  encountered in an operation.
* When an exit is
  encountered in the parent component. In this case, the Cleanup operation of all
  child components is activated.
* When the Cleanup operation
  is explicitly referenced in an activate statement.

Because the instance being deleted no longer
exists at this point, the Cleanup operation should not perform any action that
involves its own instance. For example, it should not use deleteinstance on the
instance or activate for an operation contained in the instance.

## Related Topics

- [Operations](../triggersstandard/operations.md)


---

# Detach

Defines the component behavior when a contained DSP component instance is detached
from the parent DSP.

```procscript
operationDetach
   {scopeBlock}
   {variablesBlock}
Your code here ...end
```

## Use

Dynamic Server Pages only.

## Description

The Detach operation can only
be implemented in the Operations trigger of a contained DSP component.

DSPs that are contained in another DSP by means of
the DspContainer widget are attached to the parent DSP when the component instance name is assigned
to the DspContainer field.

An attached component can be detached by
assigning another DSP instance name or an empty string to the value of a DspContainer field. A
detached component instance stays in the web browser memory until it is removed.

By defining a Detach operation,
you can control what happens after an attached component is detached.

Although you can define scope and variables in an
Detach operation, you cannot define parameters.

## Related Topics

- [Operations](../triggersstandard/operations.md)
- [DspContainer](../../../_reference/widgetsdsp/dsp_dspcontainer.md)


---

# Exec

Defines the component behavior when the component is activated.

For dynamic server pages:

```procscript
;trigger Execute
   {public soap}  ;  Requires $REQUIRE_PUBLIC_DECL ASN for compilation
    public web
   {scopeBlock}
   {variablesBlock}
   Your code here ...
```

For static server pages and services:

```procscript
;trigger Execute
   {public soap}  ; Requires $REQUIRE_PUBLIC_DECL ASN for compilation
   {public web}    ; Requires  $REQUIRE_PUBLIC_DECL ASN for compilation
   {paramsBlock}   ; Not allowed for public web
   {variablesBlock}
   Your code here ...
```

For forms and reports:

```procscript
;trigger Execute
   {paramsBlock}
   {variablesBlock}
   Your code here ...
```

## Return Values

The value in $status is
available after the activate statement that started the component.

## Use

All components.

## Description

The Exec operation is the
default operation that is executed when a component is activated by the activate
Proc statement. It is implemented in the Execute trigger of the component. For more information, see [Execute](../triggersstandard/execute.md).

---

# Init

Defines the component behavior when a component instance is created with
newinstance (or by activate when
newinstance is executed implicitly).

```procscript
operation init
Your code here ...
end
				
```

## Use

All components.

## Description

Implement the Init operation in
the Operations trigger of the component.

## Related Topics

- [Operations](../triggersstandard/operations.md)


---

# Proc: Predefined Operations

Predefined operations consist of selected component triggers, which are treated as the
component's default operations, and reserved operation names that can be explicitly implemented in
the Operations trigger of a component.

---

# Quit

Defines the processing that should occur during a Quit request.

```procscript
; trigger QuitYour code here ...
```

## Use

All components.

## Description

A Quit request is usually invoked to close the
component without saving modifications that may have been made on it (in contrast to an Accept
request).

The Quit operation is
implemented in the Quit trigger of the component. For more information, see [Quit](../triggersstandard/quit.md).

## Related Topics

- [Quit](../triggersstandard/quit.md)
- [Accept](accept.md)

