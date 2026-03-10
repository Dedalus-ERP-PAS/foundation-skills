---
title: "ProcScript Standard Triggers"
category: "Uniface 9.7 ProcScript Reference"
entries: 74
---

# Accept

Proc code for handling the processing that should occur during an
Accept request.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | ACPT |
| Default Proc | udefault.xml |
| Default action | If no Accept trigger is defined, it performs actions equal to the following Proc code:   ```procscript return 0 ``` |

## Trigger Activation

The trigger is activated by the ^ACCEPT structure editor function in a form after implicit field syntax checking and data validation was successful, or the ACCEPT operation. Positive execution of the Accept trigger causes the component to agree on the Accept request. If all involved components agree on the Accept request, the component is closed.

The Accept trigger is executed in the following
circumstances:

* For all components—when an Accept request is invoked on the current component.
* For components that have one or more attached child components—when an Accept request is invoked on the current component and all attached child components agree on the Accept request by successfully executing their Accept triggers . If the execution of the Accept trigger of one of the child component fails, the Accept request is terminated. As a consequence, this trigger is not executed and no components are closed.
* For components that are attached as a child to a parent component—when an Accept request is invoked on the parent component. If the execution of the Accept trigger of any other attached child components fails, the Accept request is terminated. As a consequence, this trigger is not executed and no components are closed.

The Accept trigger is
*not* activated if invoked by the structure editor function ^ACCEPT and implicit field-level syntax checking, and/or data validation, fails. In this situation, the edit session continues, with a message in
the message area explaining what the problem with the syntax of
the data is.

## Return Values

The value in $status when exiting the
Accept trigger determines whether the component agrees on the Accept
request or not.

If $status is
`0`, the component agrees on the Accept request and will close after agreement of other involved components. The Accept request can still be terminated by other components, like attached child or parent components. If all involved components agree on termination, they are closed without firing any additional triggers.

If $status is nonzero, the component does not agree on the Accept request. Accept triggers of other involved components will not be fired; none of the involved components will be closed.

**Note:**  Be aware of the values returned in $status, because it is quite easy to
write components that you cannot exit.

## Description

Generally, an Accept request is invoked to close the component with the intention to keep all modifications made on it. In contrast to the Quit request, this is invoked to also close the component but with the intention to cancel all modifications made on it.

By default, the Accept trigger
does not contain a store statement. This
means that any data which has not been saved will be lost. It is
quite common to place Proc code in the Accept trigger
that stores data.

The Accept trigger often contains a store statement,
or a reference to a global Proc, which stores modified data.
However, if the Accept trigger can also be fired because of an Accept request on an attached parent component, for example with tab forms, the Accept trigger should only contain Proc code that determines whether the component agrees on the Accept request or not. Actual storage of the data should be handled in a separate operation that is activated from the Accept trigger of the parent component. This way, no data will be stored until all involved components agree on the Accept request and therefore agree on storage.

Code for validating data should not appear
in this trigger. It is better to use field-level triggers
or entity-level triggers for data validation.

## Related Topics

- [Quit](quit.md)
- [Execute](execute.md)


---

# Add/Insert Occurrence

For handling a user’s request to add or insert a new occurrence of the entity in a
form.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | AIO |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, an implicit creocc is done to create an empty occurrence before or after the current occurrence, depending on the structure editor function used. |
| Return values | None. |

## Trigger Activation

The Add/Insert Occurrence trigger is activated by
the structure editor functions ^ADD\_OCC or ^INS\_OCC.

## Description

This trigger is typically used either to prevent
users from adding new occurrences or to initialize fields of a new occurrence.

```procscript
; trigger: Add/Insert Occurrence
if ($rettype = 65)
   creocc "INVOICE", $curocc + 1
   ; Add occurrence after current occ
else
   creocc "INVOICE", $curocc
   ; Insert occurrence before current occ
endif
; Add additional code here...
```

You may choose to change the position where
occurrences are inserted or added. The following Proc module inserts a new occurrence before the
first occurrence and adds an occurrence after the last occurrence:

```procscript
; trigger: Add/Insert Occurrence
if ($rettype = 65)
   creocc "INVOICE", -1
else
   creocc "INVOICE" , 1
endif
```

**Caution:** 

When you add or insert an occurrence, the
default behavior of Uniface is to give focus to the newly created occurrence. This action
represents a change to the active path in the component. Uniface carries out all outstanding data
validation checks for the changed part of the active path, which means that the Validate Field,
Leave Field, Validate Key, Leave Modified Key, Validate Occurrence, and Leave Modified Occurrence
triggers could potentially also be activated.

## Using ^INS\_OCC

If the structure editor function ^INS\_OCC is
used, the empty occurrence is inserted  *before*  the current occurrence, that is, the
new occurrence is inserted at position $curocc, while the previous current
occurrence is shifted down one position.

## Using ^ADD\_OCC

If the structure editor function ^ADD\_OCC is
used, the empty occurrence that is created appears  *below*  the current occurrence (at
position $curocc+1).

## Preventing New Occurrences

You should put Proc code in this trigger to
prevent the user from creating new occurrences. You can do this simply by putting a return`-1` statement in this trigger. Alternatively, placing a single executable
statement such as done disables the creation of new occurrences. (A statement
such as end, which is not executable, does not disable the trigger.) This
happens because adding Proc code in the trigger overrides the default functionality (which is to
create an empty occurrence).

## Initializing New Occurrences

If you want to initialize the new occurrence with
values, for example, from a related entity, use the creocc statement to make an
empty occurrence, then set the appropriate values for this newly created occurrence. The
`/init` switch is often used on the initialization assignments for new occurrences.

You can test the value of
$rettype to determine whether the user activated this trigger with ^INS\_OCC or
^ADD\_OCC. The following values are returned by $rettype in this trigger:

* 65, when the occurrence was added.
* 73, when the occurrence was inserted.

(These values are the ASCII character codes ‘A’
for Add and ‘I’ for Insert.)

You can use the values returned by
$rettype to mimic the default behavior of Uniface and add additional code to set
default values for fields in the created occurrence. This is shown in the following example:

## Changing the Default Proc Code

If you want to define a new default Proc code for
this trigger, do not use a specific entity name, but instead use the function
$entname to get the name of the current entity. This is shown in the following
example which inserts new occurrences before the first occurrence and adds new occurrences after
the last occurrence:

```procscript
; trigger: Add/Insert Occurrence
if ($rettype = 65)
   creocc $entname, -1
else
   creocc $entname, 1
endif
```

## Related Topics

- [Leave Field](leavefield.md)
- [Leave Modified Key](leavemodifiedkey.md)
- [Leave Modified Occurrence](leavemodifiedoccurrence.md)
- [Occurrence Gets Focus](occurrencegetsfocus.md)
- [Validate Field](validatefield.md)
- [Validate Key](validatekey.md)
- [Validate Occurrence](validateoccurrence.md)


---

# Application Execute

Trigger that is executed when loading a startup shell for any Uniface application or
application server; use for launching the environment and controlling the interaction of the
application with the component manager.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | APPL |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | As the application ends, if the value of $status is negative, Uniface reports an error. Values in the range in the range 32,768 through 65,535 are also regarded as being negative. |

## Trigger Activation

The Application Execute trigger is the first
trigger that is activated in a Uniface application.

## Description

The Proc code in the Application Execute trigger
is responsible for handing control of the application to the component manager. This can happen in
several ways:

* If an activate (or
  run) statement is encountered that starts a modal form.
* After the last activate of a sequence of
  non-modal forms.
* If the end of the Application Execute trigger
  is reached without encountering a run statement (regardless of the value of
  $status).

The Application Execute trigger often includes
statements that set the language and library. Be aware that if you explicitly set the
$language and $variation codes in this or any other trigger,
the application ignores the corresponding settings in the applicable assignment files.

This trigger should also be used for opening any
database used, if they require explicit logon information. For example:

```procscript
open "|scott|tiger","orapath"
```

## Related Topics

- [apexit](../procstatements/apexit.md)
- [Execute](execute.md)


---

# Asynchronous Interrupt (Application)

Location for handling asynchronous interrupts that come from outside the application,
such as messages from other components.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | ASYN |
| Default Proc | UAPPLDEF default startup shell |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Asynchronous Interrupt trigger is activated
by an asynchronous event in the application’s event input queue when the component-level
Asynchronous Interrupt trigger is empty.

## Description

Use this trigger to handle application-level
actions for dealing with any real-time actions, such as updating with rapidly changing information.

Asynchronous interrupts can also be trapped at
component level in the component-level Asynchronous Interrupt trigger. The application-level
Asynchronous Interrupt trigger is activated only if the Asynchronous Interrupt trigger for the
component currently being processed is empty.

## Related Topics

- [Asynchronous Interrupt (Component)](asynchronousinterrupt2.md)
- [Asynchronous Messaging](../../../middleware/asynchmessaging/asynchmessaging_intro.md)


---

# Asynchronous Interrupt (Component)

Location for handling, at the component level, asynchronous interrupts that come from
outside the application.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | ASYS |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Asynchronous Interrupt trigger is activated
by an asynchronous event in the application’s event input queue.

## Description

Use this trigger to handle component-level
actions for dealing with any real-time actions, such as updating with rapidly changing information.
The presence of Proc code in this trigger overrides the Asynchronous Interrupt trigger defined on
the startup shell  *for the current component*.

Asynchronous events can be generated by such
causes as:

* A 3GL program that uses functions of
  Uniface's 3GL interface to create an asynchronous interrupt.
* The user closing an application when the
  window property Close for that application’s startup shell is defined as Async.
* A time-out notification generated when the
  assignment setting $TIMEOUT is present.
* A message sent with postmessage Proc statements
* A mobile hot key that has been assigned an
  `async` action.

**Note:**   If asynchronous events can occur rapidly, it is
wise to increase the value of the assignment file setting $MAX\_QUE. This
increases the size of the interrupt buffer.

## Writing Messages

**Note:**   If the Proc code in an Asynchronous Interrupt
trigger contains a putmess statement and the user is currently in the message
frame, that putmess statement is ignored.

It is not possible to write to the application
window from an Asynchronous Interrupt trigger. This means that Proc code in the trigger cannot
directly write to fields defined in the startup shell definitions, such as MESSAGE and FORMAREA.
(If you want to write to the MESSAGE area, use the message statement.)

## Activated by postmessage

When an Asynchronous Interrupt trigger is
activated by postmessage, the Proc function $result contains
the string `"message"` and the function $msgid contains the
identifier sent with the message.

$msgid can be used to
determine the exact type of message. In other cases activating the Asynchronous Interrupt trigger,
$msgid contains an empty string ("") and the function $result
indicates how the trigger was activated.

## Activated by async Hot Key Action

When the trigger is activated by the
`async` action in a hot key assignment, the associated string is placed in
$result, but $msgid remains empty.

## Related Topics

- [$MAX_QUE](../../../configuration/reference/assignments/_max_que.md)
- [Asynchronous Interrupt (Application)](asynchronousinterrupt.md)
- [$TIMEOUT](../../../configuration/reference/assignments/timeout.md)


---

# Clear

The Clear trigger allows the developer to react to the user's
request to start over with a clean form.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | CLR |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Clear trigger is activated by the ^CLEAR structure editor function.

## Description

The default Proc code provided for this trigger has the effect of dropping all the
data currently in the component; any data that has been entered or
retrieved is removed from the component. This does *not* remove
the data from the database, but any information entered by the user
that has *not* been stored is lost.

Using clear to drop all data in a form also implicitly drops all outstanding data
validation checks, which provides a handy mechanism for recovering
from edit session situations that have gotten out of control.

The default Proc code provided by Uniface
for this trigger contains the Proc statement clear.
Any non-default Proc code entered in this trigger by the developer
must contain the Proc statement clear if
the intended functionality of this trigger is desired. To clear
specific entities rather than the entire form, use the clear/e statement. Most developers
check for modifications before clearing the form.

## Save As functionality

The Clear trigger is sometimes
used to save an existing database occurrence as a new occurrence
with a new primary key. The release statement
releases the controls on primary key fields and marks retrieved
data as being entered by the user. In the following example, the Proc
code in the Clear trigger uses the $instancedb function to test if
the data in the form has come from the database; if so, the release statement marks the data as
having been entered by the user and releases the controls on the
primary key fields. If the data is marked as having been entered
by the user and *not* coming from the
database, the data is cleared. This construction allows a user to
clear the form in two passes: the first pass provides Save
As functionality for a database occurrence, the second
pass clears the form.

```procscript
if ($instancedb = 1)
   release 
   message "Controls released; data available as default for new input"
else
   clear
endif
```

---

# Collection Operations

Location for defining entity-level Proc operations.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | ECOP |
| Default Proc | None |
| Default action | If no Proc code is present in the operations in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. The ultimate effect depends on the component that invokes one of the operations present in this trigger. |

## Trigger Activation

The Collection Operations trigger is a container
for operations and is never activated.

## Description

This trigger is used as a central repository for
entity-level Proc operations; it is provided so that operations can be collected in a single
location. Technically, this is not really a trigger, because there is neither a structure editor
function nor a Proc statement that causes the activation of the trigger. Only the operations within
the trigger are actually invoked.

Before you can use operations in the Collection
Operations trigger, you must first do the following:

1. Specify the [Collection Interface Name](../../../development/reference/devobjproperties/entity/collinterfacename_uecinterface.md) for the model entity.
2. Enter Proc code for your entity operations in
   the Collection Operations trigger for the model entity.
3. Compile the entity operation signatures for
   the entity. You can use the /ceo command line switch.
4. Obtain the handles to the operations using the
   Proc function $collhandle and use the handles to invoke the operations.

## Related Topics

- [$collhandle](../procfunctions/_collhandle.md)
- [Operations](../../operations.md)
- [Occurrence Operations](occurrence_operations.md)
- [Public and Partner Operations](../../public_and_partner_operations.md)
- [Handles](../../handles/handles2.md)
- [Defining Modeled Entities](../../../modeling/entities/define_an_entity_within_an_application_model_.md)


---

# Decrypt

Used to decrypt data for a field when reading from the database, so
that the developer can implement secure systems.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | DECR |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Decrypt trigger
is activated whenever data for the field is fetched from the database.
When optimistic or cautious locking is in effect, this trigger is
activated when the data is initially fetched and again when it is
fetched and locked.

Uniface activates
the Decrypt trigger (if it contains Proc code) for each field of an occurrence, when that occurrence
is fetched into the component as a result of the read statement in the Read trigger
for the entity.

The Decrypt trigger
is also activated by the write statement, immediately
after the Encrypt trigger (if the trigger contains
Proc code) to synchronize internal data representation.

## Description

The Encrypt and Decrypt triggers enable you to implement secure systems. These triggers
must provide *round trip* (inverse) results; that
is, the source data in the database at the start of the process
should be the same as the result after decryption and encryption.

You can also use the Decrypt trigger to convert
an unsupported DBMS data type into one that Uniface can handle.
For other kinds of format conversions, consider the Format and Deformat
triggers.

Decryption can be done in either Proc code or 3GL. In Proc, you can use $encode to encrypt data and $decode to decrypt data. For 3GL-based encryption, you can write a 3GL service for
decryption and encryption and use the activate statement
to activate it.

## Related Topics

- [Encrypt](encrypt.md)
- [Format](format.md)
- [Deformat](deformat.md)
- [Call-Out From Encrypt and Decrypt Triggers](../../../integration/3gl/concepts/call_out_to_3gl/encrypt_and_decrypt_triggers.md)


---

# Defines

The Defines trigger is the placeholder for the definition of
constants.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | DEFN (component-level), DEFE (entity-level), DEFF (field-level) |
| Default Proc | None |
| Default action | None |
| Return values | None |

## Trigger Activation

The Defines trigger is a container for constants and is never activated.

## Description

The Defines trigger at component level is where you can define
component constants.

The Defines trigger
is the placeholder for the definition of constants, as the following
examples demonstrate:

```procscript
#define frmEntity = firstOuterMostEntity
```

```procscript
#comment Session Service for processing a request
```

```procscript
#define mySessionService =
```

```procscript
#comment DTD for defining the format of the XML data to be interchanged with the Session Service.
```

```procscript
#comment The DTD must be defined as dtdName.modelName, uppercased and fully qualified
```

```procscript
#comment for example:
```

```procscript
#define myDtd = CUSTOMERDTD.MYMODEL
```

## Related Topics

- [Constants](../../proclanguage/constants/constants.md)


---

# Deformat

Used for temporarily converting the format of data in a field from
an external format into an internal format and making that reformatted data
available for processing purposes.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | DFMT |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | If $status is less than zero, the data is not transferred from $format to the field and the user cannot leave the field; no further triggers are activated. |

## Trigger Activation

The Deformat trigger
is activated in the following circumstances:

* When the user tries to leave the field, before
  any syntax checks for the field and before the Leave Field trigger.
* Whenever the field
  is referenced in Proc code.
* When a ^DETAIL,
  ^HELP, or ^MENU structure editor function is used, before the corresponding Detail, Help,
  or <Menu> trigger.

In all cases, the Format trigger is activated
after the Deformat trigger to restore the value of $format.

## Description

The Deformat
trigger is used to convert external data (in a component field) into
the internal data format used by Uniface. The Format trigger should redo the
deformatting done by Deformat.

The Format and Deformat triggers are especially
useful with custom widgets. For widgets, ValRep mapping happens
after Format and before Deformat.

When Deformat is activated, $format contains the formatted
data. You can use 3GL or Proc code to convert this data. When the
trigger completes, $format should
contain the data ready for storage; this must be in the required
syntax as defined in the syntax definition to avoid an error situation.
Any subsequent operations performed on the data by Uniface will
be on the internal format data in $format.

This trigger is the only trigger that allows
the developer to access the raw external data entered by the user.
In any other trigger, references to the field refer to the internal
format data.

**Caution:** 

The Deformat trigger
should only be used for deformatting of the associated field. Do
not use this trigger for deformatting other fields or for other
field-related processing

## Related Topics

- [Format](format.md)


---

# Delete

Location for handling the removal of occurrences marked for
deletion when writing updates to the database.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | DELE |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | If $status is less than zero, database I/O is terminated and no further triggers are activated for the current I/O request. |

## Trigger Activation

The Delete trigger is activated during the processing of the
Proc statements
erase and
store for each database occurrence (unless the cascade delete
constraint is in effect) of an entity (that is not an up entity) that was
removed by the user or by Proc code. If the cascade delete constraint is in
effect (see the
$CASCADE\_TRIGGER assignment setting), the Delete trigger is fired only
once for each affected entity.

## Description

This trigger is activated for the outer entity and for the many
entities painted in down relationships. (If an entity is painted as an up
entity, the Delete Up trigger is activated instead.) Painting a down
relationship occurs when you paint two entities that have a one-to-many
relationship defined between them in the model such that the one entity is
painted as the outer frame and the many entity is painted as the inner frame.

If the outer entity is a non-modeled (dummy) entity, and the inner entity is a modeled (database) entity, deleting an occurrence of the outer entity also marks all the retrieved occurrences of the inner entity for deletion.

The context of the Delete trigger activation by the
store statement is as follows. (For a description of the Delete trigger
activation by the
erase statement, see [Erase](erase.md). )

1. The
   store Proc statement is issued.
2. Uniface carries out all outstanding data validation checks, if
   relevant. These checks include all syntax and other declarative definitions,
   and activating the relevant Leave triggers and Validate triggers (Validate
   Field, Leave Field, Validate Occurrence, Leave Modified Occurrence, and so on).
3. Uniface activates the Delete trigger for every removed occurrence
   present in the component, unless the cascade delete constraint is in force, in
   which case the Delete trigger is fired only once for each affected
   entity.
4. The
   delete statement in the Delete trigger of each entity causes the DBMS
   driver to delete each removed occurrence.

The Delete trigger is activated for those occurrences that have been
removed by the user (for example, with ^REM\_OCC) or by Proc code. In the Delete
trigger, the deletion status of an occurrence is available by way of the
$occdel function.

Before the Delete trigger of a removed occurrence is activated, the
referential integrity for all
*painted*  inner entities is checked. This involves activating:

* The Read trigger for each inner entity whose delete constraint is
  defined as restricted.
* The Write trigger for each inner entity whose delete constraint is
  defined as nullify.
* The Delete trigger for an inner entity whose delete constraint is
  defined as cascading. The Delete trigger is fired only once for each affected
  entity (unless the
  $CASCADE\_TRIGGER assignment setting is used, in which case the Delete
  trigger is activated for all removed occurrences). This, in turn may activate
  Read, Write, or Delete triggers of entities that are inner to this entity.

If you have included an entity marker in a form to ensure referential
integrity, the situation can arise where the entity does not exist. In this
situation, the
delete statement in the Delete trigger will fail. This stops any
further activation of Delete triggers. To avoid this, include a
return`0` statement in the Delete trigger.

If the Delete trigger contains only a single
delete statement, at run time Uniface carries out the delete action
without invoking the Proc interpreter (except when the debugger is active).
This feature improves performance.

**Note:**   You cannot access the contents of the fields of an
occurrence when you are in the Delete trigger. If you need to do this, use the
Remove Occurrence trigger instead.

## Related Topics

- [validate](../procstatements/validate.md)
- [Erase](erase.md)
- [Store](store.md)
- [$CASCADE_TRIGGER](../../../configuration/reference/assignments/cascade_trigger.md)
- [Delete Up](delete_up.md)
- [Leave Field](leavefield.md)
- [Leave Modified Key](leavemodifiedkey.md)
- [Leave Modified Occurrence](leavemodifiedoccurrence.md)
- [Validate Field](validatefield.md)
- [Validate Key](validatekey.md)
- [Validate Occurrence](validateoccurrence.md)


---

# Delete Up

Location for handling delete of occurrences in up entities; if an
entity is painted as an up entity, removing occurrences from the database is
only possible if the Delete Up trigger contains a `delete` statement.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | DLUP |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Delete Up
trigger is activated during the processing of the Proc statements erase and store for
each database occurrence of an up entity that will be removed.

## Description

This trigger
is only activated for up entities, that is, for up relationships. (If
an entity is painted as a down entity, the Delete trigger is activated instead;
see that trigger for more information.)

When storing data after removing occurrences,
the store statement causes Uniface
to activate the Delete Up trigger for every foreign entity present
in the component in which one or more occurrences has been removed.

The Delete Up trigger for an inner, up entity
is also activated when an occurrence of the outer entity is removed,
and the store statement is used.
The exact details of the processing that takes place in this situation is
in the description of $occdel.

By default, the Delete Up trigger is empty.

If the Delete Up trigger of an up entity contains
Proc code, the Lock trigger of this entity is activated when the
user modifies an occurrence in the up entity. If the Delete Up trigger
is empty, the Lock trigger of the up entity is not activated.

The Delete up trigger is not fired if referential integrity is handled by the database, rather than by Uniface. For more information on how referential integrity is handled, see the connector documentation for your database.

## Beware!

**Caution:** 

Placing a delete statement
in the Delete Up trigger can have serious implications for database
integrity.

This is not advisable unless you can be absolutely sure
that there are no outer entities that use this occurrence of the
up entity, and that the information in this occurrence can be safely
deleted.

Using delete in
this trigger for an up entity can cause serious problems in the
store process. DBMSs that cannot handle referential integrity constraints
(that is, Uniface does it for them) could delete an up occurrence
while related, orphan occurrences still exist. Uniface does not
carry out the constraint check in this case, because of your code.

DBMSs which do support referential integrity
constraints return store errors if they detect constraint violations
which are tolerated by Uniface. This is especially likely to happen
if compiling the component returns a warning message indicating
that an entity needed for integrity control has not been painted.

## Related Topics

- [Delete](delete.md)
- [Store](store.md)
- [Write Up](writeup.md)


---

# Detail (Entity)

Location for reacting to ^DETAIL structure editor function, entity
level.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | DTLE |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Detail trigger
is activated by the structure editor function ^DETAIL when the field-level Detail trigger
is empty or when there is no current field.

## Description

This trigger
is often used to activate an operation in the same or another component,
to perform calculations, or to spawn another process. Data can be
passed between components and processes using the activate statement, global or general
variables.

The sequence of processing initiated by ^DETAIL
starts at field level; if there is no Proc code in the field-level Detail trigger,
Uniface activates the entity-level Detail trigger.
Use the entity-level Detail trigger either for
Proc code that is applicable for all painted fields in the entity
or as a default action that can be overridden for specific fields
in the field-level Detail trigger.

As usual when processing structure editor
functions, all outstanding syntax and data validation checks for
the modified part of the active path are carried out before activating
the trigger associated with the structure editor function. In the
case of Detail, this means that Uniface does not
activate the Detail trigger if any of these
checks fails.

If Proc code is present in this trigger, the
structure editor direction is always set to Next.

You can define the default Proc code for an
entity in the model definition of the entity. This causes the Proc
code in the model definition of the entity to be copied into the
entity's definition whenever it is painted in a form. This
is quicker than defining the Proc code every time the entity is painted.
You can define a form variation for a painted entity by changing the
copied Proc code.

## Related Topics

- [Accept](accept.md)
- [Execute](execute.md)
- [Operations](operations.md)
- [Quit](quit.md)
- [Detail (Field)](detail_field_level.md)


---

# Detail (Field)

Location for reacting to ^DETAIL structure editor function, field
level.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | DTLF |
| Default Proc | udefault.xml |
| Default action | If no code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Detail trigger
is activated by the structure editor function ^DETAIL when this
is the current field.

## Description

This trigger
is often used to activate an operation in the same or another component,
to perform calculations, or to spawn another process. Data can be
passed between components and processes using the activate statement, global or general
variables. You cannot use local or component variables to pass data
between components.

The sequence of processing initiated by ^DETAIL
starts at field level; if there is no Proc code in the field-level Detail trigger,
Uniface activates the entity-level Detail trigger.
If the field-level Detail trigger contains
Proc code, Uniface does not activate the Detail trigger
at entity-level.

The structure editor is always placed in Next
mode when the ^DETAIL function is used.

If you want to carry out the same processing
in the Detail trigger from all the fields in
the entity, you should place the Proc code to do this in the entity-level Detail trigger,
and leave the field-level Detail triggers empty.

When activating another form component from
a Detail trigger, it is normal to place Proc
code in the Accept, Execute (or Operations),
and Quit triggers of the activated form. See
the Accept trigger for an example of this sort
of coordinated code.

The Proc code in this trigger does not have
to activate another component. It is quite normal to place Proc
code here that computes values or spawns another process to the
operating system (although activating operating system services
using instructions such as call, filebox, perform, and file manipulation Proc is a more elegant method than using the spawn Proc
statement).

In DSPs, the trigger can be executed on the client if it is implemented with the webtrigger and javascript instructions. In this case, the trigger is assumed to contain only JavaScript code, except for an optional scope block. For more information, see [Client-Side Triggers and Operations](../../../webapps/scripting/clientsidetriggersandoperations.md).

## Related Topics

- [Accept](accept.md)
- [Execute](execute.md)
- [Operations](operations.md)
- [Quit](quit.md)
- [Detail (Entity)](detail_entity_level.md)


---

# Encrypt

Used to encrypt data in a field when writing to the database, so
the developer can implement secure systems.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | ENCR |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Encrypt trigger
is activated when data for the field is written to the database.

When writing
data to the database, the write statement
in the Write (or Write Up) trigger for the entity activates the
Encrypt trigger for each field in the entity for which the Encrypt
trigger contains Proc code.

The Decrypt trigger for the field is also
activated by the write statement immediately
after firing the Encrypt trigger, providing the trigger contains
Proc code. This is to synchronize internal data representation.

## Description

The Encrypt and Decrypt triggers enable you to implement secure systems. These triggers
must provide *round trip* (inverse) results; that
is, the source data in the database at the start of the process
should be the same as the result after decryption and encryption.

You can also use this trigger to convert an
unsupported DBMS data type into one that Uniface can handle.

Encryption can be done in either Proc
or 3GL.

## Proc-Based Encryption

In Proc, you can use $encode to encrypt data and $decode to decrypt data.

If you decide to use Proc, a low-maintenance
solution that allows easy local overrides is to call a local Proc
module. You can code the call statement for
the field in the application model, and place the local Proc module (entry...end block)
in any of the Local Proc Modules triggers: component level, entity
level, or field level.

## 3GL-Based Encryption

For 3GL-based encryption, you can write a 3GL service for
decryption and encryption and use the activate statement
to activate it.

## Related Topics

- [Decrypt](decrypt.md)
- [Store](store.md)
- [Write](write.md)
- [Local Proc Modules, component level](localprocmodules.md)
- [Local Proc Modules, entity level](localprocmodules2.md)
- [Local Proc Modules, field level](localprocmodules3.md)
- [Write Up](writeup.md)
- [Call-Out From Encrypt and Decrypt Triggers](../../../integration/3gl/concepts/call_out_to_3gl/encrypt_and_decrypt_triggers.md)


---

# Erase

Used for deleting all occurrences currently in the component, both
in the external structure, and in the database. This is a very dangerous
trigger—use it with extreme care!

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | ERAS |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Erase trigger
is activated by the ^ERASE structure editor function.

## Description

The Erase trigger
should generally be used to implement the deletion of retrieved
data from the database. The actual deletion of data is activated
by the erase statement, which
should be placed in this trigger.

The process flow for the Erase trigger is as
follows:

1. The ^ERASE structure
   editor function activates the Erase trigger.
2. Uniface activates
   the Delete trigger for each occurrence retrieved from the database.
3. Per occurrence,
   the delete statement in the Delete
   trigger deletes the occurrence from the database.

Most developers disable the Erase trigger.

Compare the functionality of ^ERASE with the
^CLEAR function which is used to clear the form of data, but does
not delete data stored in the database.

## Related Topics

- [Clear](clear.md)
- [Delete](delete.md)
- [Lock](lock.md)


---

# Execute

Defines the component behavior when the component is activated.

Syntax for dynamic server pages:

```procscript
;trigger Execute
   {public soap}  ;  Requires $REQUIRE_PUBLIC_DECL ASN for compilation
    public web
   {scopeBlock}
   {variablesBlock}
   Your code here ...
```

Syntax for static server pages and services:

```procscript
;trigger Execute
   {public soap}  ; Requires $REQUIRE_PUBLIC_DECL ASN for compilation
   {public web}    ; Requires  $REQUIRE_PUBLIC_DECL ASN for compilation
   {paramsBlock}   ; Not allowed for public web
   {variablesBlock}
   Your code here ...
```

Syntax for forms and reports:

```procscript
;trigger Execute
   {paramsBlock}
   {variablesBlock}
   Your code here ...
```

|  |  |
| --- | --- |
| Trigger abbreviation: | EXEC |
| Default Proc | udefault.xml |
| Activation: | Activated by an activate statement , or by the run command. |
| Default behavior: | Depends on the type of component. |
| Behavior upon completion: | An implicit exit is performed to end the trigger.  The value in $status is available after the activate or run statement that started the component.  The structure editor is not affected by the value of $status. |

## Description

The Execute trigger implements the
Exec operation, which is the default operation for the
activate statement.

If a component contains a public
web or public soap declaration in the Execute trigger, it can be
activated by an HTTP request from a web client or a SOAP request from a SOAP client.

Proc in the Execute trigger may initialize
component-level values, retrieve information, perform batch processing, print data, activate other
components, and so on. For example, the Proc might set some field values followed by a
retrieve statement so that the user only sees a subset of the data.

## Default Behavior

If the Execute trigger contains no code, it falls
back to a default behavior, which varies with the type of component:

* In a Dynamic Server Page (DSP), there is no
  default behavior, but the component is available. However, no public or
  partner web declaration is defined for it, so calling it results in a security
  message on the browser.
* In a Static Service Page (USP), an implicit
  edit is performed by means of the webget and
  webgen statements.

  However, if
  $REQUIRE\_PUBLIC\_DECL is set in the IDE's assignment file, the implicit
  edit command will not be executed. In this case, the
  exec operation must contain both a public web
  declaration and an edit command. Otherwise, security error occurs.
* In a Form, an implicit edit
  statement is executed.
* In a Service or Report , the
  exec operation returns to the component instance that
  issued the activate.

## Interactive Processing with Forms

If you define Proc code for the Execute trigger,
you should include an edit or display statement if you want
the user to see the form. If neither of these is present and the Execute trigger is not empty, the
form exits immediately after the last Proc statement in the trigger has executed, without
displaying the form.

Any statements after the edit
or display statement are executed only if the Proc code in the component-level
Quit or Accept triggers (whichever is used) ends with a value of 0 in $status.
(The value of $status can be set explicitly or indirectly by way of the
return statement.) If the form is exited using an exit or
apexit statement, any Proc statements after the edit or
display statement *are not executed*.

## Public Access from Web and Soap Clients

A component that can be accessed from the web,
such as a server page or web service, should contain a declaration for the appropriate
channel—public web for requests from web clients such as browsers and RESTful
web services, and public soap for SOAP clients.

When the public soap
declaration is used, or when public web is used in a Service or USP component,
the $REQUIRE\_PUBLIC\_DECL setting must be present in the IDE assignment file when
the component is compiled. Otherwise a compilation error or a runtime security error can occur.

A parameters block (params) is
not allowed in an exec operation that contains a
(partner or public) web declaration,
because this would constitute a security risk for the application.

## Printing

When defining the Proc for a Report, it is usual
to include a print statement which initiates printing by retrieving data.

## Retrieving Data in Forms

It is quite common to set a retrieve profile in
the Execute trigger of a form, and then use a retrieve statement so that the
user is presented with a populated form. You can use a retrieve profile to select a subset of data;
for example, to retrieve only those occurrences that a user is authorized to modify. For example:

```procscript
;trigger: Execute
PKFIELD = "D*"
retrieve
edit
```

The example only lets the user retrieve data
where the primary key field (in this example PKFIELD) starts with the letter ‘D’. It would be more
sensible to pass parameters to the form with the activate statement. For
example, the following activate statement in the calling component passes the
value that has been placed in the `$profile$` component variable to the component
AnotherComponent:

```procscript
activate "AnotherComponent".EXEC($profile$)
```

In the Execute trigger of the activated
component:

```procscript
;trigger: Execute
params
   string profile : IN
endparams

PKFIELD = profile
retrieve
edit
```

Use the variables statement to
set up local variables for handling the processing in the Execute trigger.

## Related Topics

- [activate](../procstatements/activate.md)
- [operation](../procstatements/operation.md)
- [web](../procstatements/web.md)
- [scope](../procstatements/scope.md)
- [params](../procstatements/params.md)
- [variables](../procstatements/variables.md)
- [edit](../procstatements/edit.md)
- [display](../procstatements/display.md)
- [$REQUIRE_PUBLIC_DECL](../../../configuration/reference/assignments/_require_public_decl.md)
- [public soap](../procstatements/public_soap.md)


---

# Extended Triggers

Location for handling the processing of extended events generated by the grid widget,
drag-and-drop, form container, map, tabex, tree, and OCX container widgets, and for some DSP
widgets .

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | EXTG, FXTG |
| Default Proc | udefault.xml  This trigger is automatically filled by the widget if it has extended triggers. The default Proc code does nothing, but contains placeholders in which the developer can enter Proc code. |
| Default action | If no Proc code is present in the trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

An extended trigger is called when a GUI event
takes place. An extended trigger is similar to an operation, but it cannot be called from Proc.

## Description

An extended trigger is identified by the keyword trigger. An example of an extended trigger is expand in the
tree widget that is called when the user clicks a + symbol in the tree or otherwise expands a node.
An extended trigger may have parameters, usually only input parameters.

Most widgets do not have extended triggers. For
those that do, the set of extended triggers available to widgets is different per widget type (see
[Triggers: Extended](../triggersextended/extended_triggers_is.md)). If a widget has extended triggers, the default Proc code does nothing, but
contains placeholders in which you can enter Proc code.

If you do not define code for an extended trigger,
you should remove or comment it out. This is especially true for OCX controls, which often have
mouse and key events. If the extended triggers associated with these events are present in the
trigger, Uniface attempts to call them, even if they contain no code, and this can cause
performance problems.

In dynamic server pages it is possible to define
extended triggers that are executed in the client browser, instead of on the server. Client-side
triggers are declared using the webtrigger keyword, and must be implemented in
JavaScript. If a client-side trigger is defined for an extended trigger, it overrides the
server-side trigger (identified by trigger).

## Related Topics

- [Triggers: Extended](../triggersextended/extended_triggers_is.md)
- [Client-Side Triggers and Operations](../../../webapps/scripting/clientsidetriggersandoperations.md)


---

# Field Gets Focus

For handling the processing that should happen when a field gets focus; usually used
for user interface actions such as prompting the user with a hint message, or modifying the way a
field is displayed.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | FGF |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Field Gets Focus trigger can be activated in
several ways:

* When a mouse click positions the cursor
  within the field.
* When the scroll bar is used to move through
  multiple occurrences.
* When a structure editor function (such as
  ^FIELD) positions the cursor within the field.
* When the active path changes by way of a Proc
  instruction such as $prompt, setocc, and so on.

The Field Gets Focus trigger is  *not* activated when the cursor is positioned using arrow keys (character mode).

If the field that previously had focus was in
another occurrence, Uniface first activates the Occurrence Gets Focus trigger and then the Field
Gets Focus trigger.

When the scroll bar is used to move through
multiple occurrences of an entity, the Field Gets Focus trigger for the first field in each new
current occurrence is activated. If the previous occurrence did not have focus when the scroll bar
was first used, the Field Gets Focus trigger in the first field of that occurrence is activated
before the trigger in the new current occurrence.

## Description

One of the primary uses of this trigger is to
visually indicate the current field (for example using $fieldproperties or fieldvideo) or to display useful information when the cursor enters the field.

In the Field Gets Focus trigger, you should not
use Proc instructions that change the current occurrence (for example, setocc,
retrieve, or clear). The Leave Field trigger is usually a
better place for this kind of action.

The following example uses a
message`/hint` statement to display a helpful message:

```procscript
; trigger: Field Gets Focus
message/hint "5 digit correspondence code"
```

## Related Topics

- [fieldsyntax](../procstatements/fieldsyntax.md)
- [Leave Field](leavefield.md)
- [Occurrence Gets Focus](occurrencegetsfocus.md)


---

# Form Gets Focus

For handling the event of a form component getting focus.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | FRGF |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Form Gets Focus trigger can be activated in
several ways:

* When a mouse click positions the cursor in
  the current form (whether or not it is minimized), after the Form Loses Focus trigger of the
  previous form completes successfully.
* When a form receives focus after a form that
  previously had focus stops, for example, following ^ACCEPT, return, and so on.
  (This occurs even if the form receiving focus is minimized.)
* When a setformfocus
  statement requesting focus for this form is executed.

## Description

The Form Gets Focus trigger is typically used to
perform actions that are needed when a form gets focus.

**Caution:** 

Do not use the Form Gets Focus trigger to change
focus. For example, you should not use Proc instructions such as setformfocus or
$prompt, display a dialog box, or activate another component instance in this
trigger.

## Communicating with a Parent Instance

The following example sends a message to the
parent form when the current form get focus:

```procscript
if ($instanceparent != "")
   postmessage $instanceparent, "GETTING FOCUS", $instancename
endif
```

## Related Topics

- [setformfocus](../procstatements/setformfocus.md)
- [Form Loses Focus](formlosesfocus.md)


---

# Form Loses Focus

For handling the event of a form losing focus.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | FRLF |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | If $status is less than 0, the form does not lose focus. |

## Trigger Activation

The Form Loses Focus trigger can be activated in
several ways:

* When a mouse click positions the cursor in
  another form, before that form gains focus, the Form Loses Focus trigger of the current form is
  activated.
* When the Accept or Quit trigger completes
  successfully, the Form Loses Focus trigger is activated after the Execute trigger completes (that
  is, any code following edit or display).
* When a setformfocus
  statement requesting focus for another form is executed, the Form Loses Focus trigger of the
  current form is activated before focus moves to the new form.

The Form Loses Focus trigger is not activated
when the form is left with an exit statement.

## Description

The Form Loses Focus trigger is typically used to
verify the data to ensure that it is complete or correct before the form loses focus.

**Caution:** 

Do not change focus using the Form Loses Focus
trigger. For example, you should not use Proc instructions such as setformfocus
or $prompt, display a dialog box, or activate another component instance in this
trigger.

## Displaying an Error Message

In the following example, FLD1 cannot be empty.
The Form Loses Focus trigger is used to define the error message, but should not be used to display
the error dialog, because this would change the focus.

```procscript
;Form Loses Focus trigger
if FLD1 = ""
  postmessage $instancename, "DialogShow", "FLD1 must have a value"
endif
```

The postmessage statement
causes the Asynchronous Interrupt trigger to be fired, so you can use this trigger to display the
error dialog.

```procscript
; Asynchronous Interrupt trigger
if ($msgid="DialogShow")
   message/error $msgdata
endif
```

## Communicating with a Parent Instance

The following example sends a message to the
parent form when the current form loses focus:

```procscript
postmessage $instanceparent,"LOSING FOCUS", $instancename
```

## Related Topics

- [setformfocus](../procstatements/setformfocus.md)
- [Form Gets Focus](formgetsfocus.md)
- [Asynchronous Interrupt (Component)](asynchronousinterrupt2.md)


---

# Format

Activated before displaying or printing the field, and after
Deformat.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | FMT |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Format trigger
is activated when the field needs to be displayed or printed. In
addition, the Format trigger is activated after the Deformat trigger
to restore the value of $format.

## Description

The Format and
Deformat triggers are especially useful with custom widgets. Any ValRep mapping for widgets happens after Format and
before Deformat.

The Format trigger is used to convert data
from the internal format used by Uniface to an external (displayed
or printed) format. It is activated whenever Uniface needs to display
the field. The trigger is activated when the form is initially displayed
and each time an occurrence becomes active. In addition, it is activated
after the Leave Field trigger, to reformat data for display after
the external representation has been deformatted to create the internal
format. (See the Deformat trigger.)

**Note:**  
The Deformat trigger
should undo the formatting done here.

When the trigger is activated, the function $format contains the data. This
data has been formatted according to the display (DIS) property
of the field's layout definition. You may use Proc or 3GL
code to modify the data in $format before
it is displayed. When the trigger completes, $format should
contain the data formatted for display.

**Caution:** 

*The
Format trigger should be used only for formatting of the associated
field. Do not use this trigger for formatting other fields or for other
field-related processing.*

While a screen is being filled, a field's
Format trigger may be activated in several occurrences. During this
activity, the occurrence that is current in the form remains unchanged.
This means that if you reference another field from the Format trigger,
you always reference that field in the current occurrence, which
is not necessarily the same occurrence as the field whose Format
trigger is being activated.

## Related Topics

- [Deformat](deformat.md)


---

# Frame Gets Focus

Location for handling the event of the frame getting focus (this is
usually when the frame is about to be printed).

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | OGF  **Note:**  udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Frame Gets
Focus trigger is activated when a header, trailer, or break frame
is about to be printed (in report
and server page components) or displayed (in form and report
components).

## Description

This trigger
is used to perform actions before the frame is displayed. You can use the Frame Gets Focus trigger for:

* Accumulating values in subtotal and total fields further down in the
  print process.
* Calculating and copying values into fields in break frames.

For example,
in a trailer frame, you might increment the page number variable,
or in a break frame, you might increment running totals. In trailer
frames, it can be used to print the page number.

Filling fields in a header frame on the basis of the calculated values
on the rest of the page might not always be possible, because the data
concerned has not become active. If it is important to do this, use the
selectdb Proc statement.

The Frame Gets Focus
trigger of a header frame should not be used to assign data to fields
on the form. This is because Uniface activates the Frame Gets Focus
trigger after the first occurrence has been fetched and is ready
to print.

```procscript
; trigger: Frame Gets Focus
; frame : TRAILER
PAGE.TRAILER = $page
```

## Related Topics

- [Occurrence Gets Focus](occurrencegetsfocus.md)


---

# Get State

Location for handling component-specific preprocessing.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | GTST |
| Default Proc | For dynamic and static server pages: udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The trigger returns values in $status:   * >=0—the requested operation is   activated. * < 0—the requested operation and the Set   State trigger are not activated. The WRD will not respond with a specific error. * `-21`—the requested   operation and the Set State trigger are not activated. The WRD will respond with a Authorization   failure.   In a web environment, the Post Request trigger is always activated, regardless of the value returned by the Get State trigger in $status. |
| Available on | All components. |
| Trigger activation | The Get State trigger is activated before the requested operation is activated, and in a web environment, after the Pre Request trigger.. |

## Description

The Get State trigger is typically used to handle
preprocessing specific to the operation, such as recreating the state of a transaction. Although it
is required in web applications, it can also be used in other components to handle preprocessing
that is specific to the component.

## Get State in Server Pages

Default Proc is provided for dynamic and static
server pages, which enables you to tailor component behavior based on the state management options
you use.

In a Web environment, it can mean reading cookie
data or information stored in a database. For example, of the state information is no longer
current, further processing can be terminated by returning a non-zero value in
$status.

The relationship between the request and state
triggers in a web environment is shown in the following table:

Triggers and operations are activated from left
to right, depending on the $status returned by previous triggers.

Web-Specific Trigger Activation Sequence

| Pre Request return status | Get State return status | Execute trigger or other operation | Set State | Post Request | WRD status |
| --- | --- | --- | --- | --- | --- |
| $status = -21 | Not executed | Not executed | Not executed | Not executed | -21 |
| $status < 0 | Not executed | Not executed | Not executed | Not executed | 0 |
| $status >= 0 | $status = -21 | Not executed | Not executed | Executed | -21 |
| $status >= 0 | $status < 0 | Not executed | Not executed | Executed | 0 |
| $status >= 0 | $status >= 0 | Executed | Executed | Executed | 0 |

## Getting and Setting State with Cookies

The following example gets the Uniface cookie
from the browser and places it in the `$cookie$` component
variable. The USERCONTEXT information is stored as an associative
list in the format Variable`=`Value, where Variable is the name of a field or
variable in the Server Page. The getlistitems`/id` statement
reads the values contained in `$cookie$` and distributes
them accordingly:

```procscript
;trigger Get State
$cookies$ = $webinfo("USERCONTEXT")
getlistitems/id/component $cookies$
```

In the Set State trigger of the static server page, the following code updates the state information
when the page completes. The Proc code in this example initializes
a component variable `$statelist$` with the names
of the fields or variables containing the state information, then
uses the `putlistitems/id` statement
to populate the list in `$statelist$` with the current
values from the server page:

```procscript
;trigger Set State
$statelist$ = "Variable1=;Variable2="
putlistitems/id/component $statelist$
$webinfo("USERCONTEXT") = $statelist$
```

If you put empty cookie data into the first item of `USERCONTEXT`, for instance, by using putitem `$statelist$, 1, ""`, followed by $webinfo`("USERCONTEXT") = $statelist$`, Uniface substitutes a NULL identifier at the moment the empty cookie data is sent to the client.

## Related Topics

- [Execution Sequence of Triggers and Operations in Web Applications](../../../webapps/scripting/triggers_execution_sequence.md)
- [Post Request](post_request.md)
- [Pre Request](pre_request.md)
- [Set State](set_state.md)


---

# Help (Entity)

Location for reacting to user's request for online help, entity
level.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | HLPE |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The entity-level Help trigger
is activated by the structure editor function ^HELP when the Help trigger
for the current field is empty.

## Description

You can place
entity-level help in this trigger; it is displayed if the current
field has no Proc code in its Help trigger.
It is not activated if there is no active field (the cursor is between
fields, for example in character mode).

You can define the default help text for an
entity in the model definition of the entity. This causes the Proc
code in the model definition of the entity to be copied into the
entity's definition whenever it is painted in a form. This
is quicker than defining the help text every time the entity is painted.
You can define a form variation for a painted entity by changing the
copied Proc code. This may be appropriate when the help text changes according
to how the entity is used in a form.

The following example shows how the Help trigger
can be used to display help information for the entity USERS:

```procscript
; trigger: Help
help $text(USERS)
```

You can implement Proc code that provides
help according to the value of certain fields. For example:

```procscript
; trigger: Help
if (GENDER = "M")
help $text(MALE_RETIREMENT)
else
help $text(FEMALE_RETIREMENT)
endif
```

If Proc code is present in this trigger, the
structure editor direction is always set to Next when this trigger
is used.

## Related Topics

- [$text](../procfunctions/_text.md)
- [help](../procstatements/helpnative.md)
- [Implementing Online Help](../../../desktopapps/implementinghelp/implementingonlinehelp.md)
- [Help (Field)](help2.md)


---

# Help (Field)

Location for reacting to user's request for online help, field
level.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | HLPF |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The field-level Help trigger
is activated by the structure editor function ^HELP.

## Description

The presence
of Proc code in the field-level Help trigger
overrides the entity-level Help trigger
for the current field.

This trigger should be used for displaying
help information. This is generally done with a message or help statement:

* message statement
  is used to display a single line of text.
* help/topic or help/keyword statement
  invokes a native GUI help engine to display help information for
  a topic or keyword.
* help statement
  is used to invoke a Uniface form in which the help message is displayed.

With message or help to display a Uniface help text,
it is recommended that you use the $text function
to access text stored in UOBJ. This is more maintainable than hard-coding
the text, and allows the developer to localize the
software by changing the language used to retrieve the text. The following
example displays the help message in the message database with an
identifier of H\_USERNAME:

```procscript
; trigger: Help (of USERNAME)
help $text(H_USERNAME)
```

By defining this message for different languages
in the message database, the developer can change the help displayed
by defining a different language in the assignment file for the
application. For example, the following assignment file settings
cause help text to be displayed in Dutch:

```procscript
$LANGUAGE = NL
$VARIATION = TECH_PUBS
```

The following assignment file settings cause
help text to be displayed in American English:

```procscript
$LANGUAGE = USA
$VARIATION = TECH_PUBS
```

This assumes that the application does not
set the $language or $variation functions, and
that help text has been defined in both Dutch and American English.

You may find that it helps to define the help
text when you define the fields in the model definition. It is a
good way of highlighting any application model problems—if
you cannot write the help text for a field, you probably do not
understand what it is for. It is also easier to define the code
for the Help trigger once, in the model definition,
rather than every time it is painted on a form. You can always override
the model definition with a form variation.

If you use a help message naming convention
of FieldName\_HLP, you can use
the following Proc statement in the model definition for the field:

```procscript
help $text("%%$fieldname%%%%_HLP")
```

This Proc statement can even go in the entity-level Help trigger.
You can override it with a model definition for a particular field
if you require it.

You can even put this in the default Proc
code for the Help trigger.

## Related Topics

- [Help (Entity)](help.md)
- [Implementing Online Help](../../../desktopapps/implementinghelp/implementingonlinehelp.md)


---

# Leave Field

Trigger that defines what happens after a user successfully leaves
a field (that is, after all data validation checks have completed without
error); a negative return value prevents the user leaving the field.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | LFLD |
| Default Proc | udefault.xml |
| Default action |  |
| Return values | If $status is less than zero, the user cannot leave the field.  If the field has not been modified, the terminal beeps. If the field has been modified, the terminal does not beep. |

## Trigger Activation

|  |  |
| --- | --- |
| Activation events: | User moves the cursor out of the field that has focus  Current field is changed with the $prompt function.  **Note:**   In an interactive session, this trigger is activated regardless of whether or not the user has modified the field. |
| Preconditions: | Successful completion of declarative validation and the ValidateField trigger |

**Note:**  The LeaveField trigger is *not* activated
by the setocc statement.

## Description

This trigger
is typically used for such things as calculations and running another
form. It is activated whenever the active path changes.
You can use the Proc function $fieldendmod to check whether
the field has been modified by the user. (This function
is only valid in the LeaveField trigger.
)

For example, in
a field containing money data, you might
want to calculate the sales tax and assign that to the relevant
field. Use $fieldendmod to
first check the modification status of the field, saving unnecessary
processing if the data has not been modified.

If you want to change the order in which Uniface prompts for fields, use the [Next Field](nextfield.md) and [Previous Field](previousfield.md) triggers rather than using $prompt in
this trigger.

The LeaveField trigger is one of the LeaveObject group of triggers (LeaveField, LeaveModifiedKey, and LeaveModifiedOccurrence) that work in combination with the ValidateObject triggers to handle
all the processing that should take place when a user modifies the active
path. In general, the LeaveObject triggers
are used for user interface and calculation functionality; the ValidateObject triggers are intended to handle
data validation and error trapping.

The following example
automatically recalculates the value of a computed field whenever
one of the fields in the computation is modified. The example ensures
that the non-database field ELAPSED\_TIME is recalculated
whenever the user modifies the START\_TIME or END\_TIME
fields. The Proc code to do this is contained in the Leave Field
triggers of START\_TIME and END\_TIME:

```procscript
; trigger: Leave Field (of END_TIME)
ELAPSED_TIME = END_TIME - START_TIME
```

And:

```procscript
; trigger: Leave Field (of START_TIME)
ELAPSED_TIME = END_TIME - START_TIME
```

## Related Topics

- [Validation Process Flow](../../../howunifaceworks/datavalidation/validation_process_flow.md)
- [Leave Modified Key](leavemodifiedkey.md)
- [Leave Modified Occurrence](leavemodifiedoccurrence.md)
- [Validate Field](validatefield.md)


---

# Leave Modified Key

Location for handling the processing that should occur after a key (especially a
compound key) of an occurrence is modified.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | LMK |
| Default Proc | udefault.xml  The default Proc code provided by Uniface for this trigger executes the Proc statement retrieve/o to see if an occurrence already exists with this primary key either in the form or in the database. |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | If $status is less than zero, the user cannot leave the current primary or candidate key field.  When the user tries to leave the key field, the rescheduling of the Leave Modified Key is based on the previous result of the retrieve/o statement in the trigger. If retrieve/o returned a non-negative value, even if the return value in $status was less than 0 and the user could not leave the key field, the trigger will not be activated again. |

## Trigger Activation

|  |  |
| --- | --- |
| Preconditions: | The trigger is activated if all the following conditions are met:   * The Validate Field and Leave Field   triggers for the current field completed successfully (did not return a negative value). * The current field is a primary or   candidate key field. * The next field (taking account of   Previous or Next mode) is not part of the current primary or candidate key. The next field is the   field that would be next if the prompting sequence were default, that is, the field that would be   next if the Next Field and <Previous Field> triggers were empty. For more information, see  [Next Field](#section_0D856E390CD76B32DECFA32BDF71B834). * A modification has been made to a   key field. * All the key fields contain data, or   any empty fields have been defined as `LEN(0-0)`, that is, any empty fields are   defined as optional. (See below for more information.) * All the key fields pass the syntax   checks defined for them. * The Validate Key trigger completed   successfully. |
| Activation: | This trigger is activated when a primary key or candidate key field has been modified, and the user moves the cursor to a non-key field. It is  *not*  activated by modifications to foreign keys or indexes (unless they form part of the primary or candidate key).  The trigger is activated in the following circumstances:   * The current field belongs to the   primary key or to a candidate key. * The user moves the cursor to a   field that does not belong to the primary key or to the candidate key. * At least one field that makes up   the primary key or candidate key has been modified. For candidate keys, this occurs only if the   Validate property is selected in the Define Key form.   The trigger is not activated if profile characters are used in one of the primary key or candidate key fields. |

## Description

This trigger is particularly useful when working
with compound keys. The trigger is only activated when the cursor is moved out of the compound key,
not when the cursor is moved from one field in the key to another.

The Leave Modified Key trigger is one a group of
triggers (Leave Field, Leave Modified Key, and Leave Modified Occurrence) that work in combination
with the Validate triggers to handle all the processing that should take place when a user modifies
the active path. In general, the Leave triggers are used for user interface and calculation
functionality; the Validate triggers are intended to handle data validation and error trapping.

## Next Field

The following events always make the structure
editor assume that the next field is *not* a primary or candidate key field:

* The user moves the cursor with one of the
  following structure editor functions:
* + ^ACCEPT
  + ^STORE
  + ^ADD\_OCC
  + ^INS\_OCC
  + ^NEXT\_OCC
  + ^PREV\_OCC
* The user uses a cursor key to move the cursor
  out of the current occurrence.
* One of the following Proc statements is
  executed:
* + setocc
  + store
  + $prompt to a non-key
    field

## Empty Key Fields

The way that Uniface handles empty key fields and
the activation of the Leave Modified Key trigger is described below.

Consider an entity with a compound primary key.
The primary key is made up of three key fields, PK1 to PK3. The user has entered values in fields
PK1 and PK3, but has left the field PK2 empty.

The activation of the Leave Modified Key trigger
depends on the definition of the empty field PK2. Normally, a field in a compound key is mandatory,
that is, it cannot be empty and must contain data. In this case, the Leave Modified Key trigger is
not activated (see rule 5).

However, if the empty field PK2 has been defined
as `LEN(0-0)`, the Leave Modified Key trigger is activated. This is because a
definition of `LEN(0-0)` for a field means that it is optional, that is, it need not
contain data. As such, Uniface considers the primary key to be complete and, because the user has
entered data in fields PK1 and PK3 (and therefore modified them), Uniface activates the Leave
Modified Key trigger.

## Default Proc Code

The default Proc code provided by Uniface for
this trigger executes the Proc statement retrieve/o to see if an occurrence
already exists with this primary key either in the form or in the database.

The default code for the Leave Modified Key
trigger is shown below:

```procscript
retrieve/o
if ($status < 0)
if ($status=-15) message $text(2202);Multiple hits:in foreign entity
if ($status=-14) message $text(2205);Multiple hits:not in foreign entity
if ($status=-11) message $text(2009);Occurrence currently locked
if ($status=-7) message $text(2006);Duplicate key
if ($status=-4) message $text(2003);Cannot open table or file
if ($status=-3) message $text(2002);Exceptional I/O error
if ($status=-2) message $text(2200);Key not found:in foreign entity
else
if ($status=1) message $text(2201);Key not found:foreign entity w/WRITE UP
if ($status=2) ;One occurrence found in foreign entity
retrieve/e
if ($status < 0) message $text(2002);I/O error detected
endif
if ($status=3) message $text(2203);Occurrence un-removed
if ($status=4) message $text(2204);Key found:occurrence repositioned
endif
return ($status)
```

This trigger makes extensive use of the
$status values returned by the retrieve/o and
retrieve`/e` statements.

## Using $keycheck

It is possible to force this trigger to be
activated using the Proc statement set$keycheck.

## Leave Modified Key

The following example runs a form that displays a
list of valid foreign keys when the retrieve/o statement fails with a
$status value of -2 (key not found in foreign entity).

**Note:**  This type of functionality (allowing the user to
look up a list of database occurrences in another form and choose one) is typical of character mode
user interfaces and is not very common any more. It is more usual nowadays to populate a widget
such as a drop-down list with a valrep list that contains a meaningful list of occurrences from the
foreign entity. You can activate a service to generate a valrep list.

The Proc code in the Leave Modified Key trigger
of the entity in the calling form is shown below. When the
`ret rieve/o` statement returns -2 (key not found in foreign
entity), the form CHOOSEONE is activated. The parameter returned by CHOOSEONE is the value of the
primary key of the chosen occurrence, which is placed in the FKFIELD foreign key of the down entity
in the calling form. If nothing is returned, the `return -1` statement prevents the
user from leaving the occurrence.

```procscript
; trigger: Leave Modified Key (LMK)
retrieve/o
if ($status < 0)
...[snip]
if ($status=-2)
message $text(2200) ;Key not found:in foreign entity
activate "CHOOSEONE".EXEC(FKFIEKD)
if (FKFIEKD = "")
return -1
endif
endif
else
if ($status=1) message $text(2201);Key not found:foreign entity w/WRITE UP
if ($status=2) ;One occurrence found in foreign entity
...[snip]
endif
return ($status)
```

The following Proc code would be placed in the
Execute trigger of the form CHOOSEONE:

```procscript
; trigger: Execute (of form CHOOSEONE)
params
  string FKEY : OUT
endparams
retrieve
$CHOSENONE$ = ""
edit
FKEY = $CHOSENONE$
```

The mechanism for placing the chosen key value in
the $CHOSENONE$ component variable could be built in a number of ways. For example, the user could
select an occurrence by clicking on a field in the occurrence and then clicking a Select command
button; the Detail trigger of the command button would contain the statement `macro
"^ACCEPT"` and the Accept trigger would contain the following Proc code, where KEYFIELD is
the name of the relevant primary key:

```procscript
$CHOSENONE$ = KEYFIELD
return(0)
```

The `return(0)` statement returns
processing to the Execute trigger, to the line immediately following the `edit`
statement.

A more elegant method is to define double-click
to mean ^DETAIL for the fields of the entity containing the occurrences, and place Proc in the
entity-level Detail trigger as follows:

```procscript
$CHOSENONE$ = KEYFIELD
macro "^ACCEPT"
```

Provided that `$status` is zero,
an empty Accept trigger returns processing to the Execute trigger at the line immediately following
the `edit` statement.

**Note:**   This example is based on the default code for
the trigger, which is quite general, so it can be used in both down and up entities. For any entity
painted on a component, the developer knows whether or not the entity is painted as an up entity.
Consequently, the developer is at liberty to remove any unnecessary Proc code for the current
situation. This should not be done as part of the model definitions, but only for the entity as
painted on a component.

## Related Topics

- [Validation Process Flow](../../../howunifaceworks/datavalidation/validation_process_flow.md)
- [Leave Field](leavefield.md)
- [Leave Modified Occurrence](leavemodifiedoccurrence.md)
- [Validate Occurrence](validateoccurrence.md)


---

# Leave Modified Occurrence

Entity (only in form components, not in the Web environment)

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | LMO |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | If $status is less than zero, the user cannot leave the occurrence; the terminal will not beep. (Remember that a negative value during a ^STORE immediately terminates the ^STORE function.) |

## Trigger Activation

The Leave Modified
Occurrence trigger is activated (after the Validate Occurrence trigger)
when the user repositions the cursor to another occurrence (either
of the same entity or of another entity) after modifying the original
occurrence. This cursor movement can result from structure editor
functions such as ^NEXT\_OCC, ^STORE, ^ACCEPT (but not ^QUIT),
or ^CURSOR\_DOWN.

The Leave Modified Occurrence trigger is not
activated in the following situations:

* If the only modifications were made by Proc
  statements.
* If the cursor returns
  to the occurrence and leaves again, and the user does not remodify
  the data during the new visit.

## Description

This trigger
is the main location for all occurrence-level calculations,
for example, updating a running total.

## Using $occcheck

It is possible to force this trigger to be
activated using the Proc statement set$occcheck. If you place Proc
code in the Leave Modified Occurrence trigger, it is wise, at least
during application development, to use set$occcheck in each Proc module
that modifies fields in this entity. This ensures that the code
you supply in the Leave Modified Occurrence trigger is always activated
whenever the data in the occurrence is modified.

The following example
prevents the user from leaving the modified occurrence if the field
SALARY is greater than 100000 and the field JOB is not PRESIDENT:

```procscript
; trigger: Leave Modified Occurrence
if ((SALARY > 100000) & (JOB != "PRESIDENT"))
message "See me at once! -- The Boss"
return -1
endif
```

## Related Topics

- [Validate Occurrence](validateoccurrence.md)


---

# Leave Printed Occurrence

Location for handling the processing that should occur after an
occurrence is printed.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | LPO |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Leave Printed
Occurrence trigger is activated after an occurrence has been printed
and before the next occurrence becomes active.

## Description

You can use this
trigger when writing a report for such things as:

* Accumulating values, such as totals, subtotals,
  and so on.
* Calculating or
  copying fields into break frames.
* Testing whether
  a break frame should be printed.

**Note:**  It is only possible to place Proc code in
this trigger in the Component Editor, not when defining
the entity in the application model.
The Leave Printed Occurrence
trigger does not form part of an entity's model definition,
because it is always specific to the presentation component in which the
entity is placed.

```procscript
; trigger: Leave Printed Occurrence
; entity : INVOICE
if (INVDATE != $next(INVDATE))
   $CUSTNAME$ = NAME.CUSTOMER
   eject
endif
```

---

# Local Proc Modules, component level

Location for defining component-level Proc modules.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | LPMX |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The effect of a return value depends on the Proc module that called one of the modules present in this trigger. |

## Trigger Activation

The component-level
Local Proc Modules trigger is a dummy trigger that is never activated.
It provides a single location for local Proc modules used for the
current component.

## Description

This trigger
is used as a central repository for entry Proc
modules. It is provided so that component-level local Proc
modules can be collected together into a single location. This makes
a component that uses multiple local Proc modules easier to maintain.

Technically, this is
not a trigger because it is not activated by a structure editor function or a Proc statement. Only the Proc
modules within the trigger are actually activated.

It is not a good idea to mix the levels of entry Proc modules. If, for example,
you are defining component-level modules, place them in
the Local Proc Modules trigger of the component, rather than in
the Local Proc Modules trigger of an entity or field painted on
the component.

## Related Topics

- [call](../procstatements/call.md)


---

# Local Proc Modules, entity level

Location for defining entity-level Proc modules.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | LPME |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The effect of a return value depends on the Proc module that called one of the modules present in this trigger. |

## Trigger Activation

The entity-level Local Proc Modules trigger is a dummy trigger that is never activated.
It provides a single location for local Proc modules used for the current entity.

## Description

This trigger is provided so that entity-level local Proc modules can be collected into a
single location. This makes a component that uses multiple local Proc modules easier to maintain.

Technically, this is not a trigger because it is not activated by a structure editor
function or a Proc statement. Only the Proc modules within the trigger are actually activated.

It is not a good idea to mix the levels of entry Proc modules. If, for
example, you are defining entity-level modules, place them in the Local Proc Modules trigger of the
appropriate entity, rather than in the Local Proc Modules trigger of the component or a field.

## Related Topics

- [call](../procstatements/call.md)


---

# Local Proc Modules, field level

Location for defining field-level Proc modules.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | LPMF |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The field-level
Local Proc Modules trigger is a dummy trigger that is never activated.
It provides a single location for local Proc modules used for the
current field.

## Description

This trigger
is provided so that field-level local Proc modules can
be collected into a single location. This makes a component that
uses multiple local Proc modules easier to maintain.

Technically, this is
not a trigger because it is not activated by a structure editor function or a Proc statement. Only the Proc
modules within the trigger are actually activated.

It is not a good idea to mix the levels of entry Proc modules. If, for example,
you are defining field-level modules, place them in the
Local Proc Modules trigger of the appropriate field, rather than
in the Local Proc Modules trigger of the entity or component.

**Note:**  
When an entity has been painted on a component,
Proc modules that are defined in the Local Proc Modules triggers
for all fields belonging to that entity are always available, regardless
of whether that field has been painted on the component. However,
Proc modules that are defined in other triggers of a field are available *only* if that field has been painted or included
in the field list for the entity.

## Related Topics

- [call](../procstatements/call.md)


---

# Lock

The Lock trigger is the location for the lock statement and
associated logic. It is activated for cautious and optimistic locking when modifying or writing a
database occurrence.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | LOCK |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | If $status is less than zero, the user is prevented from modifying the occurrence. |

## Trigger Activation

* When using cautious locking (the Uniface
  default), the Lock trigger is activated when the user first tries to modify an occurrence that has
  been retrieved from the database.
* When using paranoid locking (that is, issuing
  the read`/lock` statement in the Read trigger to request an
  immediate lock), the Lock trigger is not activated.
* When using optimistic locking (specified on
  the Define Entity form or on the Define Component Entity form), the Lock trigger is activated when
  the user tries to modify an occurrence that has been retrieved from the database; in this case, any
  lock statement in the trigger is ignored.

The Lock trigger is activated for an up entity
(foreign entity) only if its Delete Up or Write Up trigger contains Proc code. The presence of code
in one of these triggers implies that the up entity should be locked because it will be written to
the database.

**Caution:** 

In a Limited component, the Lock trigger is
never activated.

## Description

The purpose of this trigger is to ensure that the
user modifies the latest copy of the data and that data integrity problems do not occur. Usually,
the Lock trigger contains the lock instruction, which asks for a lock on the
data in the database.

The granularity of the lock (that is, how much
data is locked: table, page, row, and so on) is specific to each DBMS supported and cannot be
influenced from the Lock trigger. See the specific DBMS information for your DBMS.

If a lock is requested and successfully obtained
for the occurrence, Uniface sets a flag on the current field to guarantee activation of the Value
Changed trigger when the field is left.

## Cautious Locking

The activation process for cautious locking is
started after successful completion of the Start Modification trigger for the first field edited in
an occurrence. If the Start Modification trigger completes with a non-negative return value in
$status, Uniface activates the Lock trigger for the occurrence.

To prevent the Lock trigger from activating when
modifying dummy fields in a retrieved occurrence, use /init on the assignment
statement.

## Using the lock Command

By default, the Lock trigger contains the
following Proc code:

```procscript
lock
if ($status = -10) reload
```

This ensures that the data is reloaded if an
occurrence in the database has been modified (which is what $status=-10
means).

**Tip:** 

Except in exceptional circumstance, it is
recommended that you always have a lock statement in the Lock trigger.

One such circumstance is if you remove the
store statement from the Store trigger or other relevant trigger to prevent the
user from storing occurrences. In this case, you should also remove the lock
statement from the Lock trigger to prevent a user's request to store the data resulting in an
unwanted lock. However, this may result in the user not being presented with the latest data,
because in the time between the user retrieving the data and it being modified, another user may
have modified and stored the occurrence. It may be advisable to place a reload
statement in the Lock trigger instead of a lock statement.

## Related Topics

- [Delete](delete.md)
- [Erase](erase.md)
- [Read](read.md)
- [Store](store.md)
- [Delete Up](delete_up.md)
- [Start Modification](startmodification.md)
- [Write Up](writeup.md)


---

# Menu (Application)

Location for handling the processing that should occur after the
structure editor function ^MENU is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | MNUA |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. A negative value causes the terminal to beep. |

## Trigger Activation

The application-level <Menu> trigger
is activated by the structure editor function ^MENU (usually GOLD C),
only if the field-level, entity-level, and component-level <Menu> triggers
are empty.

## Description

The <Menu> trigger
is usually used to run a form with behavior Menu or to activate
a menu bar. If Proc code is present in this trigger, the structure
editor direction is set to Next.
For more information, see macro.

The following example runs the form OPTIONS when
the user activates the Menu trigger with the
^MENU function. This example only works if the component-level,
entity-level, and field-level Menu triggers
are empty.

```procscript
; trigger: <Menu> (at the application level)
run "OPTIONS"
```

## Related Topics

- [Menu (Component)](menu2.md)
- [Menu (Entity)](menu3.md)
- [Menu (Field)](menu4.md)


---

# Menu (Component)

Location for handling the processing that should occur after the
structure editor function ^MENU is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | MNUS |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, the application-level Menu trigger may be activated. |
| Return values | The value of $status has no effect on the structure editor. A negative value causes the terminal to beep. |

## Trigger Activation

The component-level Menu trigger
is activated by the structure editor function ^MENU (usually GOLD C),
if the Menu triggers for the current field and
entity are empty.

## Description

The Menu trigger
is usually used to run a form with behavior Menu or to activate
a menu bar. If Proc code is present in this trigger, the structure
editor direction is set to Next.

When a macro statement
is executed in a menu form, the structure editor functions are executed
on the normal form, then control returns to the menu form by way
of the Menu trigger.

Any Proc code in the component-level Menu trigger
overrides the application-level Menu trigger.
It is not possible to activate the application-level trigger
if the component contains Proc code in its Menu trigger.

## Related Topics

- [Menu (Application)](menu.md)
- [Menu (Entity)](menu3.md)
- [Menu (Field)](menu4.md)


---

# Menu (Entity)

Location for handling the processing that should occur after the
structure editor function ^MENU is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | MNUE |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, the component- or application-level Menu trigger may be activated. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The entity-level Menu trigger
is activated by the structure editor function ^MENU (usually GOLD C),
if the Menu trigger for the current field is
empty.

## Description

The Menu trigger
is usually used to run a form with behavior Menu or to activate
a menu bar. If Proc code is present in this trigger, the structure
editor direction is set to Next.

When a macro statement
is executed in a menu form, the structure editor functions are executed
on the normal form, then control returns to the menu form by way
of the Menu trigger.

Any Proc code in the entity-level Menu trigger
overrides the component- and application-level Menu triggers.
It is not possible to activate these triggers if the entity contains
Proc code in its Menu trigger.

## Related Topics

- [Menu (Application)](menu.md)
- [Menu (Component)](menu2.md)
- [Menu (Field)](menu4.md)


---

# Menu (Field)

Location for handling the processing that should occur after the
structure editor function ^MENU is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | MNUF |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, the Menu trigger for the current entity, component, or application may be activated. |
| Return values | The value of $status has no effect on the structure editor. A negative value causes the terminal to beep. |

## Trigger Activation

The field-level Menu trigger
is activated by the structure editor function ^MENU (usually GOLD C)
when the cursor is in the current field.

## Description

The Menu trigger
is usually used to run a form with behavior Menu or to activate
a menu bar. If Proc code is present in this trigger, the structure
editor direction is set to Next.

When a macro statement
is executed in a form with behavior Menu, the structure editor functions
are executed on the form with behavior Normal; control then returns
to the form with behavior Menu by way of the Menu trigger.

Any Proc code in the field-level Menu trigger
overrides the entity-, component-, and application-level Menu triggers.
It is not possible to activate these triggers if the current field
contains Proc code in its Menu trigger.

## Related Topics

- [Menu (Application)](menu.md)
- [Menu (Component)](menu2.md)
- [Menu (Entity)](menu3.md)


---

# Next Field

Location for handling the processing that should occur after the
structure editor function ^NEXT\_FIELD, or ^FIELD (when the direction is Next),
is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | NFLD |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Next
Field trigger is activated by the structure editor functions ^NEXT\_FIELD
or ^FIELD (when the direction is Next), after the Leave Field trigger
completes successfully.

This trigger is *not* activated
when the cursor is moved with arrow keys or mouse clicks, or by setting $prompt.

## Description

This trigger
is used for such things as controlling the prompting sequence of
fields. Since the user can leave the field in a way that does not
activate this trigger, this is not a good choice for data validation
processing.

You can use this trigger to change the default
prompting sequence of fields. This is done by setting $prompt to
the next appropriate field. The following example prompts for a
maiden name if the user enters a gender of ‘F’ (for
female):

```procscript
; trigger: Next Field (of GENDER)
if (GENDER = "F") ; female, so prompt for maidenname
$prompt = MAIDEN_NAME
endif
; otherwise, use default prompt sequence
```

## Related Topics

- [Field Gets Focus](fieldgetsfocus.md)
- [Leave Field](leavefield.md)
- [Previous Field](previousfield.md)


---

# Occurrence Gets Focus

Location for handling the processing that should occur after an occurrence gets
focus.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | OGF |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | When printing, if $status is less than zero, the occurrence will not be printed. In other cases, the value of $status has no effect on the structure editor. |

## Trigger Activation

The Occurrence Gets Focus trigger can be
activated in several ways:

* The user positions the cursor in an occurrence
  that does not currently have focus, with a mouse click or a structure editor function such as
  ^NEXT\_OCC or ^PREV\_FIELD. It is not important whether the field is defined as being part of the
  database or not, or whether the field is a non-modeled field.

  The trigger is not activated by the user
  positioning the pointer on white space or background text.
* During printing
* By the setocc Proc
  statement.

This trigger is not activated by Proc statements
such as read or delete

## Description

This trigger is often used for data validation
and for initializing occurrence data. It is very useful when producing a report.

If the new occurrence could not be made active,
the Occurrence Gets Focus trigger for the current occurrence is reactivated. For example, if the
currently active occurrence is the last occurrence in the hitlist, and the ^NEXT\_OCC structure
editor function is activated, the Occurrence Gets Focus trigger for the current occurrence is
reactivated. This also occurs if the Add/Insert Occurrence trigger contains Proc code that cannot
create a new occurrence.

Using setocc causes the
Occurrence Gets Focus trigger to be activated once, when the trigger containing the setocc completes.

The Occurrence Gets Focus should not be used to
change the current occurrence, so you should not use Proc instructions that do so, such as
setocc, retrieve, or clear.

**Caution:** 

The Occurrence Gets Focus trigger is not
intended for I/O operations. Avoid using Proc statements here which cause data modification or I/O
operations, if these actions involve the current field or the occurrence to which it belongs (such
as clear`/e`). In some circumstances, these can cause Uniface to
loop infinitely.

## Preventing an Occurrence From Being Printed

To prevent an occurrence being printed, you must
use the Occurrence Gets Focus trigger. The Leave Printed Occurrence trigger cannot be used in this
case, because it is activated after the occurrence has been printed. For example:

```procscript
; trigger: Occurrence Gets Focus
; entity : INVOICE
if (INVAMOUNT = 0) ;don’t print this occurrence
   return -1
endif
```

## Highlighting the Current Occurrence

In the following example, Proc code is used to
highlight the current occurrence. Usually, the curoccvideo instruction makes
this kind of code unnecessary, but the example still illustrates how the Occurrence Gets Focus
trigger can be used.

The form has definitions for component variables
`$ATTR$`, `$OCC_NUM$`, `$OCC_NUM2$`, and
`$START_PROC$`.

The Execute trigger of the form contains the
following Proc code. This ensures that the initial underlining of the first occurrence is done
correctly:

```procscript
; trigger: Execute
$START_PROC$ = 1
retrieve
edit/nowander
```

The Occurrence Gets Focus trigger for the entity
to be highlighted contains the following code:

```procscript
; trigger: Occurrence Gets Focus
if ($START_PROC$ = 1) ;first time this trigger used
  $ATTR$ = "und" ;set properties 
  call SET_VIDEO ;call Proc to set all fields
  $START_PROC$ = 0 ;make sure this "if" not used again
  $OCC_NUM$ = $curocc ;save current occurrence
  return 0 ;return
endif
if ($OCC_NUM$ != $curocc) ;new occurrence
  if ($OCC_NUM2$ != $curocc)
    $ATTR$ = "und"
    call SET_VIDEO
    $OCC_NUM2$ = $curocc ;save current occurrence
    setocc $entname,$OCC_NUM$ ;set to previous occurrence
                             ;to allow resetting of properties
  endif
else
  if ($OCC_NUM2$ != $curocc)
    $OCC_NUM$ = $OCC_NUM2$ ;old occurrence
    $ATTR$ = "def"
    call SET_VIDEO
    setocc $entname,$OCC_NUM2$ ;setocc to new occurrence
   endif
endif
done ; end this trigger
```

The Local Proc Modules trigger for the form
contains the following module:

```procscript
; Use: Set video for all the fields in the entity
entry SET_VIDEO
fieldvideo V_NUM, $ATTR$ ;set to value in $ATTR$
fieldvideo V_START, $ATTR$
fieldvideo V_END, $ATTR$
fieldvideo V_TITLE_1, $ATTR$
fieldvideo V_TITLE_2, $ATTR$
done
```

## Related Topics

- [setocc](../procstatements/setocc.md)
- [Add/Insert Occurrence](addinsertoccurrence.md)
- [Frame
Gets Focus](framegetsfocus.md)


---

# Occurrence Operations

Location for defining entity occurrence operations.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | EOOP |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in the operations of this trigger, there is no action. |
| Return values | The return value has no effect on the structure editor. The ultimate effect depends on the component that invokes one of the operations present in this trigger. |

## Trigger Activation

The Occurrence Operations trigger is a container
for operations and is never activated. It provides a single location for defining operations on an
entity occurrence.

## Description

This trigger is used as a central repository of
occurrence-level Proc operations; it is provided so that operations can be collected in a single
location. Technically, this is not really a trigger, because there is neither a structure editor
function nor a Proc statement that causes the activation of the trigger. Only the operations within
the trigger are actually invoked.

Before you can use operations in the Occurrence
Operations trigger, you must first do the following:

1. Specify the [Occurrence Interface Name](../../../development/reference/devobjproperties/entity/occinterfacename_ueointerface.md)
   for the model entity.
2. Enter Proc code for your occurrence operations
   in the Occurrence Operations trigger for the model entity.
3. Compile the entity operation signatures for
   the entity. Choose File > Compile Entity
   Operations or use the /ceo command line switch.
4. Obtain the handles to the operations using the
   Proc function $occhandle and use the handles to invoke the operations.

## Related Topics

- [Operations](operations.md)
- [$occhandle](../procfunctions/_occhandle.md)
- [Collection Operations](collection_operations.md)
- [Defining Modeled Entities](../../../modeling/entities/define_an_entity_within_an_application_model_.md)
- [Handles](../../handles/handles2.md)
- [Public and Partner Operations](../../public_and_partner_operations.md)


---

# On Error (Entity)

Location for handling entity-level errors.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | ERRE |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, the standard error message for the error that activated the trigger is displayed. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The On Error trigger is activated when an
entity-level errors occurs.

## Description

You can use this trigger to define what should
happen when errors occur. The error number that activated the On Error trigger is available in $error. Common errors are shown in the table.

Common error codes found in the entity-level On Error trigger

| $error | Default message |
| --- | --- |
| 0102 | Not enough occurrences in entity Entity. |
| 0103 | Too many occurrences in entity Entity. |
| 0118 | More occurrences are not allowed. |
| 0139 | Entity EntityA still has restricted links to EntityB. |
| 0147 | Validation failed for key. |
| 0153 | Validation failed for occurrence. |
| 0148 | First occurrence. |
| 0149 | Last occurrence. |
| 2004 | No modifications allowed on occurrence of this entity. |
| 2009 | Occurrence locked. |
| 2012 | Occurrence in form does not match database occurrence. |
| 2013 | Occurrence does not exist. |
| 2014 | New occurrence of entity Entity encountered during processing by webget. |

When the message appears, the actual entity name
is substituted for Entity. The default message is available in
$text; for example, `$text("%%$error")` returns the default
message text.

The processing associated with these error
situations can be customized by adding Proc code to this trigger to check the value of
$error and act accordingly. The default contents of this trigger are shown
below:

```procscript
; Include a block like the one shown below at the end of any
; Proc written in this trigger.
; . . .
; if ($error = 0139)
;    putmess $text(0139)
;    return (-1)
; else
;    message $text("%%$error")
;    return (-1)
; endif
```

You can customize the contents of the trigger to
make the error messages more meaningful or specific to the end user.

**Important:** 

The One Error trigger is intended for error
handling and should not be used for data I/O, with one exception. You can discard records in the On
Error trigger is when the error that activated the trigger is `2014`, which is
returned by webget when new occurrences have been created on the client. In this
case, you must explicitly test for before you perform a discard. For more information, see [webget](../procstatements/webget.md).

## Web Applications

In Web applications, if the On Error trigger is
empty, Uniface sets the default code to
`$occproperties(Entity)="errormsg=$text(%%$error)`, but only if
the trigger has been fired due to a validation error for a field or key.

```procscript
; trigger: On Error
if ($error = 0139)
   message "You must delete all invoices before deleting the customer"
   return -1
else
   message $text($error)
   return -1
endif
```

## Related Topics

- [On Error (Field)](onerror2.md)


---

# On Error (Field)

Location for handling field-level errors.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | ERRF |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, the standard error message for the error that activated the trigger is displayed. |
| Return values | If $status is less than zero, the user cannot leave the current field. The cursor remain in that field. |

## Trigger Activation

The On Error trigger is activated when a field-level error occurs.

## Description

This trigger
is activated whenever Uniface detects that one of a predefined set
of errors has occurred. You can use this trigger to define what
should happen when these errors occur. The error code that activated
the On Error trigger is available in $error.
Common errors are shown in the table.

Common error codes found in the field-level On Error
trigger

| $error | Default message |
| --- | --- |
| 0105 | Not allowed to change primary key field. |
| 0119 | Error on field *field*; illegal ValRep value. |
| 0120 | Error on field *field*; subfield too large. |
| 0121 | Error on field *field*; subfield too small. |
| 0122 | Error on field *field*; incorrect checkdigit. |
| 0123 | Error on field *field*; illegal format for numeric field. |
| 0124 | Error on field *field*; illegal format for date field. |
| 0125 | Error on field *field*; illegal format for time field. |
| 0126 | Error on field *field*; illegal syntax format. |
| 0127 | Error on field *field*; illegal entry format. |
| 0128 | Error on field *field*; subfield too large to check. |
| 0129 | Error on field *field*; subfield(s) are required. |
| 0130 | Error on field *field*; too many subfields specified. |
| 0131 | Error on field *field*; font not allowed. |
| 0133 | Error on field *field*; ruler/frames not allowed. |
| 0134 | Error on field *field*; italic not allowed. |
| 0135 | Error on field *field*; underline not allowed. |
| 0136 | Error on field *field*; bold not allowed. |
| 0137 | Error on field *field*; open/close brackets do not match. |
| 0138 | Error on field *field*; illegal format for floating field. |
| 0140 | Validation failed for field*.* |
| 0150 | Requested number of "&" and "|" operators not supported. |

When the message appears, the actual field
name is substituted for *field*. The
default message is available in $text;
for example:

```procscript
$text("%%$error")
```

The processing associated with these error
situations can be customized by adding Proc code to this trigger
which checks the value of $error and acts
accordingly. It is important to include an else block
that handles all errors that you do not handle. By default, Uniface
includes an else block, which
is commented out so that the trigger still compiles. This else block is shown below:

```procscript
; Include an "else" block like the one shown below at the end of any
; Proc written in this trigger.
; ...
; else
;   message $text("%%$error")
;   return (-1)
; endif
```

## Web Applications

In Web applications, if the On Error trigger is empty, Uniface sets the default
code to
`$fieldproperties(Field)="errormsg=$text(%%$error)`,
but only if the trigger has been fired due to a validation error for a field or
key.

For more information on customizing this message, see $fieldproperties.

The following example shows how the On Error
trigger can provide a more specific message for a situation:

```procscript
; trigger: On Error
if ($error = 0105)
message "You can’t change the company number of an existing company!"
return -1
else
message $text("%%$error")
return -1
endif
```

## Related Topics

- [On Error (Entity)](onerror.md)


---

# Operations

Location for defining component operations.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | OPER |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Operations
trigger is never activated.
It provides a single location for defining operations in a component.

## Description

This trigger
is used as a central repository of Proc operations. It is provided
so that operations can be collected at a single location.
The total number of operations in an Operations trigger is limited to 255.

Technically, this is
not a trigger since there is neither a structure editor function
nor a Proc statement that causes the activation of the trigger.
Only the operations within the trigger are actually activated.

## Related Topics

- [activate](../procstatements/activate.md)
- [operation](../procstatements/operation.md)
- [Public and Partner Operations](../../public_and_partner_operations.md)
- [Collection Operations](collection_operations.md)
- [Occurrence Operations](occurrence_operations.md)


---

# Option

Location for handling the processing that should occur after a menu item is selected.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | OPTN |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Option trigger is activated whenever a user
selects the item from a menu.

## Description

The Proc code in the Option trigger determines
what happens when the menu item is selected. This code operates on the *currently active form*, even if the menu item belongs to another (inactive) form. As such, the Proc code in an
Option trigger can be seen as an extension of the code in the currently active form; Proc functions
such as $instancename, $totocc, and so on, return the values
for that form.

Menu items usually define shortcuts; for example,
they may be provided to ^RETRIEVE data, to ^STORE data, to ^QUIT a form, or to ^ACCEPT a form. This
functionality is usually provided by way of the macro statement.

**Note:**   You can reference global Procs and variables
from the current library in the Option trigger but you cannot directly access local Proc modules.

## Processing Dynamic Menu Items

Dynamic menus have only one Option trigger, no
matter how many menu items they actually contain. The Option trigger must therefore be able to
process each menu item in the dynamic menu. To do so, it takes an input parameter of data type
String, which contains the identifier of the selected menu item. The following code is typical for
the Option trigger of a dynamic menu:

```procscript
Params
   String strId : in
endparams

;Obtain the id of selected menu item and perform the associated action 
   selectcase strId
       <do action>
   endselectcase
```

For example, the following code displays a message
indicating which menu item has been selected:

```procscript
Params
   String strId
endparams

;Obtain the id of selected menu item and perform the associated action 
   selectcase strId
       case "MyId1"
            message/info "Option A selected"
       case "MyId2"
            message/info "Option B selected"
   endcase
```

## Related Topics

- [Predisplay](predisplay.md)
- [Defining and Using Menus](../../../desktopapps/menus/define_a_menu_.md)


---

# Post Load Occurrence

Process an occurrence after it is loaded from a disconnected record set (XML, JSON,
or Struct) into a component.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | PSLO |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | Setting $status has no effect on subsequent trigger processing. |

## Trigger Activation

The Post Load Occurrence trigger is fired
immediately after an occurrence is loaded from a disconnected record set into a component, and
after all On Error triggers caused by validation errors. The new occurrence is available and can be
accessed.

## Description

You can use this trigger to tune the execution of
the xmlload, webload, and
structToComponent Proc commands.

For example, an occurrence can be discarded, or
the value for a derived field can be calculated.

## Related Topics

- [xmlload](../procstatements/xmlload.md)
- [webload](../procstatements/webload.md)
- [structToComponent](../procstatements/structtocomponent.md)
- [Disconnected Record Sets](../../../howunifaceworks/dataio/disconnectedrecordssets/disconnected_record_sets.md)
- [Pre Load Occurrence](pre_load_occurrence.md)
- [Pre Save Occurrence](pre_save_occurrence.md)
- [Post Save Occurrence](post_save_occurrence.md)


---

# Post Request

Location for handling any global post processing.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | PSTP |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | Setting $status has no effect on subsequent trigger processing. |

## Trigger Activation

The Post Request
trigger is activated in a web environment after activation of the requested operation and the Set State trigger.

## Description

The Post Request
trigger handles any global post processing that needs to be performed.
Note that it is only activated if the Pre Request trigger returns
a positive value in $status.
The advantage of using the Post Request trigger is that generic
processing can be centralized in a single trigger, rather than being
duplicated in all the components. Typical tasks that could be
performed in this trigger include using a close Proc statement
to close the connection with any open databases, appending log records
to a log file, or writing the contents of the message frame to the $webinfo output buffer to
aid program debugging.

The relationship between the request and state triggers
in a web environment is shown in the following table:

Triggers and operations are activated from left
to right, depending on the $status returned by previous triggers.

Web-Specific Trigger Activation Sequence

| Pre Request return status | Get State return status | Execute trigger or other operation | Set State | Post Request | WRD status |
| --- | --- | --- | --- | --- | --- |
| $status = -21 | Not executed | Not executed | Not executed | Not executed | -21 |
| $status < 0 | Not executed | Not executed | Not executed | Not executed | 0 |
| $status >= 0 | $status = -21 | Not executed | Not executed | Executed | -21 |
| $status >= 0 | $status < 0 | Not executed | Not executed | Executed | 0 |
| $status >= 0 | $status >= 0 | Executed | Executed | Executed | 0 |

## Related Topics

- [Execution Sequence of Triggers and Operations in Web Applications](../../../webapps/scripting/triggers_execution_sequence.md)
- [Get State](get_state.md)
- [Pre Request](pre_request.md)
- [Set State](set_state.md)


---

# Post Save Occurrence

Process an occurrence after it is saved from a component into a disconnected record
set (XML, JSON, or Struct).

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | PSSO |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | Setting $status has no effect on trigger processing. |

## Trigger Activation

The Post Save Occurrence trigger is activated
immediately after an occurrence is saved from a component into a disconnected record set.

## Description

You can used this trigger to tune the execution of
the xmlsave, websave, and
componentToStruct Proc commands.

## Related Topics

- [xmlsave](../procstatements/xmlsave.md)
- [websave](../procstatements/websave.md)
- [componentToStruct](../procstatements/componenttostruct.md)
- [Disconnected Record Sets](../../../howunifaceworks/dataio/disconnectedrecordssets/disconnected_record_sets.md)
- [Pre Save Occurrence](pre_save_occurrence.md)
- [Pre Load Occurrence](pre_load_occurrence.md)
- [Pre Load Occurrence](pre_load_occurrence.md)


---

# Pre Load Occurrence

Process an occurrence before it is loaded from a disconnected record set (XML, JSON,
or Struct) into a component.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | PRLO |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | Setting $status to <`0` prevents the occurrence from being loaded into the component. |

## Trigger Activation

The Pre Load Occurrence trigger is activated
immediately before an occurrence is loaded from a disconnected record set into a component. The new
occurrence is not yet available and cannot be accessed.

## Description

You can use this trigger to tune the execution of
the xmlload, webload, and
structToComponent Proc commands.

## Related Topics

- [xmlload](../procstatements/xmlload.md)
- [webload](../procstatements/webload.md)
- [structToComponent](../procstatements/structtocomponent.md)
- [Disconnected Record Sets](../../../howunifaceworks/dataio/disconnectedrecordssets/disconnected_record_sets.md)
- [Post Load Occurrence](post_load_occurrence.md)
- [Pre Save Occurrence](pre_save_occurrence.md)
- [Post Save Occurrence](post_save_occurrence.md)


---

# Pre Request

Trigger for handling generic processing that must be performed before activating a
component operation in a web environment.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | PREP |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | * If the trigger returns -21 in   $status, the requested operation is not activated and the WRD will respond with   a Authorization failure. * If the trigger returns less then zero in $status, the requested operation is not activated. The WRD will not respond with a   specific error. * If the trigger returns a positive value in   $status, the Get State trigger is activated, followed by the requested   operation. |

## Trigger Activation

This trigger is only activated when it is defined
in the application shell of a Uniface Web Application Server. The Pre Request trigger is activated
before the Get State trigger and activation of the requested operation.

## Description

The Pre Request trigger allows global
pre-processing to be centralized in a single trigger. Generic Proc code should be placed in this
trigger, rather than duplicated in each component. Typical uses of this trigger include environment
verification, such as checking user rights or permissions, log file or audit file record keeping.

The relationship between the request and state
triggers in a web environment is shown in the following table:

Triggers and operations are activated from left
to right, depending on the $status returned by previous triggers.

Web-Specific Trigger Activation Sequence

| Pre Request return status | Get State return status | Execute trigger or other operation | Set State | Post Request | WRD status |
| --- | --- | --- | --- | --- | --- |
| $status = -21 | Not executed | Not executed | Not executed | Not executed | -21 |
| $status < 0 | Not executed | Not executed | Not executed | Not executed | 0 |
| $status >= 0 | $status = -21 | Not executed | Not executed | Executed | -21 |
| $status >= 0 | $status < 0 | Not executed | Not executed | Executed | 0 |
| $status >= 0 | $status >= 0 | Executed | Executed | Executed | 0 |

## Default Proc

By default, the Pre Request trigger contains the
following comments:

```procscript
; WRD-level user authentication for web applications:
; Select one of the following methods to authenticate the user:
; - Check $user and $password against the operating system or user administration system.
; - Check $user against the LDAP driver.
; - Verify $user against an internal table of authorized users.
;
; Use this startup shell in stead of the usys:urouter.aps.
; Insert your code...
; if ($status < 0)
; return (-21) ; Authorization failure.
; endif
```

## Related Topics

- [Execution Sequence of Triggers and Operations in Web Applications](../../../webapps/scripting/triggers_execution_sequence.md)
- [Get State](get_state.md)
- [Post Request](post_request.md)
- [Set State](set_state.md)


---

# Pre Save Occurrence

Process an occurrence before it is saved from a component into a disconnected record
set.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | PRSO |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | Setting $status to <`0` prevents the occurrence from being saved to the disconnected record set.  Setting $status has no other effect on subsequent trigger processing. |

## Trigger Activation

The Pre Save Occurrence trigger is activated
immediately before an occurrence is saved from a component into a disconnected record set.

## Description

You can used this trigger to tune the execution of
the xmlsave, websave, and
componentToStruct Proc commands.

For example, an occurrence can be excluded from
the save; or the value for a derived field can be calculated.

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

## Related Topics

- [xmlsave](../procstatements/xmlsave.md)
- [websave](../procstatements/websave.md)
- [componentToStruct](../procstatements/componenttostruct.md)
- [Disconnected Record Sets](../../../howunifaceworks/dataio/disconnectedrecordssets/disconnected_record_sets.md)
- [Pre Load Occurrence](pre_load_occurrence.md)
- [Post Load Occurrence](post_load_occurrence.md)
- [Post Save Occurrence](post_save_occurrence.md)


---

# Predisplay

Location for handling the processing that should occur before a menu or menu item is
displayed.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | PDIS |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Predisplay trigger is activated for each item
on a menu (or menu bar) before that menu is displayed. The trigger is also activated if a keyboard
accelerator is used.

For a horizontal menu bar, the Predisplay trigger
of each menu in the menu bar is activated when the menu bar is activated. This can be either in
response to a ^PULLDOWN function or when the form is initially displayed due to an edit or display statement.

For other menus and menu items, the Predisplay
trigger for each menu item is activated when the menu is initially selected. For efficiency
reasons, the trigger is not reactivated while menus are still active.

## Description

Use this trigger to enable or disable the menu
item. You can affect the appearance of the menu item or to determine its current status using the
Proc functions $check, $disable, and
$hide.

For dynamic menus (inline menus), use the
Predisplay trigger to set the contents of the menu. The trigger must contain an
$inlinemenu instruction that generates dynamic menu items.

You should not use statements that change the
active path or that affect the screen in this trigger. In addition, you should not include long
operations in this trigger because the menu focus may have been lost earlier.

## Related Topics

- [Option](option.md)


---

# Previous Field

Location for handling the processing that should occur after the
structure editor function ^PREV\_FIELD, or ^FIELD (when the direction is
Previous), is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | PFLD |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor.  If $status is less than zero, the terminal beeps and the user cannot leave the field. However, the user is free to leave the field in a way that does not activate this trigger, for example, with a structure editor function such as ^PREV\_FIELD or with the cursor keys. |

## Trigger Activation

The Previous
Field trigger is activated by the structure editor functions
^PREV\_FIELD or ^FIELD (when the direction is Previous), after
the Leave Field trigger completes successfully.

The Previous Field trigger
is not activated when the cursor is moved with arrow keys or mouse
click or by setting $prompt.

## Description

This trigger
is used for such things as controlling the prompting sequence of
fields. Since the user can leave the field in a way that does not
activate this trigger, this is not a good choice for data validation
processing.

Uniface handles the structure editor function
^PREV\_FIELD in a slightly different way than ^NEXT\_FIELD.
By default, Uniface does not position the cursor on fields of an
inner entity when ^PREV\_FIELD is used. You can change the
default functionality by setting $prompt to the
previous field in the Previous Field trigger.

You can use this trigger to change the default
prompting sequence of fields. This is done by setting $prompt to
the appropriate previous field. The following example skips the
maiden name if the user enters a gender of ‘M’ (for
male):

```procscript
; trigger: Previous Field (of AGE)
if (GENDER = "M") ; male, so skip maiden name
$prompt = SURNAME
endif
; otherwise, use default prompt sequence (e.g. MAIDEN_NAME)
```

## Related Topics

- [Field Gets Focus](fieldgetsfocus.md)
- [Leave Field](leavefield.md)
- [Next Field](nextfield.md)


---

# Print

Location for handling the processing that should occur after the
structure editor function ^PRINT is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | PRINT |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, an implicit print`/ask` is performed, which activates the standard Print form with the default value of DEFAULT for the print job model and All for the print mode. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Print trigger
is activated by the structure editor function ^PRINT.

## Description

This trigger
is used for processing that is necessary prior to printing a report.
Remember that adding Proc code in this trigger overrides the default
action. If you intend to allow the user to print, you must use the Proc
statements `print` or `print/ask` to activate the
Print form:

A print or print`/ask` statement in another
trigger does not activate the Print trigger.

## Related Topics

- [$printing](../procfunctions/_printing.md)


---

# Pulldown (Application)

Location for handling the processing that should occur after the structure editor
function ^PULLDOWN is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | PULA |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

Pulldown triggers are activated *only*
when the assignment file setting for $MENU\_BAR includes the parameter
`TRIG`. In this case, the application-level Pulldown trigger is activated by the
structure editor function ^PULLDOWN when the component-level Pulldown trigger is empty.

## Description

**Caution:** 

It is strongly recommended that you not use
Pulldown triggers; they are provided for compatibility with pre-V5.2 applications.

The menu bar for an application is declared in
the Initial Menu Bar option of the Define Startup Shell form. It can be changed in Proc code by
the pulldown or pulldown`/load` instruction.
You should not use pulldown`/load` in the Pulldown trigger.

The default menu bar is called USYS\_BAR and is in
the USYS library. This is a default menu bar which Uniface makes available for compliance with GUI
environments.

---

# Pulldown (Component)

Location for handling the processing that should occur after the
structure editor function ^PULLDOWN is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | PULS |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, the application-level Pulldown trigger may be activated. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

Pulldown triggers
are activated *only* when the assignment
file setting for $MENU\_BAR includes
the parameter `TRIG`. If this is
the case, the component-level Pulldown trigger
is activated by the structure editor function ^PULLDOWN.

## Description

**Caution:** 

It is strongly recommended
that you do not use Pulldown triggers; they are
provided for compatibility with pre-V5.2 applications.

The menu bar
for a form is declared in the Menu Bar option of the Define Component
Properties form. It cannot be changed in Proc code by a pulldown or pulldown`/load` statement.
You should not use pulldown`/load` in
the Pulldown trigger.

Any Proc code in the component-level Pulldown trigger
overrides the application-level Pulldown trigger.
It is not possible to activate the application-level trigger
if the component-level trigger contains Proc code.

## Related Topics

- [$MENU_BAR](../../../configuration/reference/assignments/menu_bar.md)


---

# Quit

Location for handling processing that should occur during a Quit
request.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | QUIT |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in the Quit trigger, it performs actions equal to the following Proc code:   ```procscript return 0 ``` |
| Return values | * If $status is   0, the component agrees on the Quit request and will close after agreement of other involved components. The Quit request can still be terminated by other components, like attached child or parent components. If all involved components agree on termination, they are closed without firing any additional triggers. * If $status is nonzero, the component does not agree on the Quit request. Quit triggers of other involved components will not be fired; none of the involved components will be closed. Be aware of the values returned in `$status`, because it is quite easy to   write components that you cannot exit. |

## Trigger Activation

The Quit trigger is executed in the following
circumstances:

* For all components—when a Quit request is invoked on the current component.
* For components that have one or more attached child components—when a Quit request is invoked on the current component and all attached child components agree on the Quit request by successfully executing their Quit trigger. If the execution of the Quit trigger of one of the child component fails, the Quit request is terminated. As a consequence, this trigger is not executed and no components are closed.
* For components that are attached, as a child, to a parent component—when a Quit request is invoked on the parent component. If the execution of the Quit trigger of any other attached child components fails, the Quit request is terminated. As a consequence, this trigger is not executed and no components are closed.

## Description

A Quit request can be invoked by the structure editor function ^QUIT (forms only) or
when the `QUIT` operation is activated. Positive execution of the Quit
trigger causes the component to agree on the Quit request. If all involved
components agree on the Quit request, the component is closed.

Generally, a Quit request is invoked to close the component with the intention to cancel all modifications made on it. In contrast to the Accept request, this is invoked to also close the component but with the intention to keep and store all modifications made on it.

The Quit trigger is
always activated after being invoked by the structure editor function ^QUIT, even if implicit field-level syntax checking or data validation fails.

The Quit trigger often contains Proc code that verifies with the user whether it is required to store modifications and additionally perform a store. However, if the Quit trigger is also fired because of an Quit request on an attached parent component, for example with tab forms, the Quit trigger should only contain Proc code that determines whether the component agrees on the Quit request or not. Actual storage of the data should be handled in a separate operation that is activated from the Quit trigger of the parent component. This way, no data will be stored until all involved components agree on the Quit request and therefore agree on storage.

## Related Topics

- [Accept](accept.md)
- [Execute](execute.md)


---

# Read

Trigger for handling the processing that should fetch an occurrence from the
database.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | READ |
| Default Proc | udefault.xml  The default Proc code contains the read Proc statement. |
| Default action | None |
| Return values | If $status is less than zero, database I/O is terminated. No further Read triggers are activated for the current I/O request. |

## Trigger Activation

The Read trigger is activated by the
retrieve statement, or any action or event where data is required (for example,
a setocc to an occurrence that has not been displayed yet, an
edit or show statement, or a print
command). Outer entities have their Read triggers activated first because key transport must take
place before the inner entities can be retrieved.

The Read trigger is not directly activated by any
structure editor function. When a user tries to retrieve data using the ^Retrieve structure editor
function, this activates the Retrieve trigger, which by default contains a
retrieve statement.

Uniface does not retrieve all the occurrences into
the component for reasons of memory, performance, and transaction control. The user or application
can address occurrences if required, without having to start the whole database I/O transaction
again. This usually means only occurrences that can be seen on the screen or that have been handled
in some way by a Proc statement are present in the component.

When an occurrence becomes visible or gets focus
through a Proc command, the structure editor activates the Read trigger as many times as necessary
to get that occurrence into the component. Thus, Proc statements such as setocc
and print, and structure editor functions such as ^NEXT\_OCC, can cause the
structure editor to activate the Read trigger outside the end user's influence.

## Description

You can use the Read trigger to provide post
processing for the retrieve statement, which is conventionally placed in the
Retrieve trigger.

**Note:**  You are advised not to place a
retrieve statement (or any other Proc instructions that can activate the
trigger) in the Read trigger.

By default, the Read trigger contains a single
read statement, which fetches an occurrence from the hitlist without invoking
the Proc interpreter (unless the Debugger is active). For more information, see [read](../procstatements/read.md).

You can implement paranoid locking by adding the
/lock option to the read statement. This locks the occurrence
when it is first read from the database, eliminating the extra read statement
implicit in the lock statement in the Lock trigger.

If you assign a value to a field (in the entity to
which the Read trigger belongs) before the read statement, or to an entity
painted inside that entity, the assigned value is overwritten when the read
statement is executed. You can, however, place assignments after the read
statement. This is often a good place to initialize non-database fields.

You can restrict user access to a subset of the
data available by including a where or u\_where clause in the
read statement. Not all databases can handle these clauses, in which case,
Uniface handles the clause. These clauses are used in addition to those specified by the user in
the retrieve profile entered before the ^Retrieve function is activated.

**Tip:** 

After the Read trigger is activated,
$rettype function indicates the type of retrieval request that activated it.
This can be useful for conditional post-retrieval processing. For more information, see [$rettype](../procfunctions/_rettype.md).

## Restricting the Occurrences Retrieved

The following Proc code in the
read trigger only allows the user to ^RETRIEVE occurrences
where the SALARY field is less than 25000:

```procscript
;trigger Read
read u_where (SALARY < 25000)
```

## Controlling Behavior Upon Completion

When the read trigger completes, the value of $status
determines what happens next. By default, it holds the value returned by the
read statement. If this an error number, you may choose to handle the error and
ensure that $status is set to 0 so that the database I/O can continue.

## Related Topics

- [read](../procstatements/read.md)
- [$rettype](../procfunctions/_rettype.md)
- [Retrieve](retrieve.md)
- [Lock](lock.md)


---

# Remove Occurrence

Location for handling the processing that should occur after the
structure editor function ^REM\_OCC is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | RMO |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, the occurrence is marked for deletion when data in the component is stored. |
| Return values | If $status is less than zero, the terminal beeps and the occurrence is not marked for deletion. |

## Trigger Activation

The <Remove
Occurrence> trigger is activated by the structure editor function
^REM\_OCC.

## Description

This trigger
is used to define the processing that should occur when the user
tries to remove an occurrence. It can be used to verify that removing this
occurrence is a valid action.

The data is not actually deleted
from the database by ^REM\_OCC. This occurs only when the
data is stored. At that point, the Delete trigger is activated for
each removed occurrence (instead of the Write trigger).

The status of the occurrence (removed or not
removed) can be checked in the Delete trigger with the $occdel function.

You may want users to confirm that they actually
want to remove the occurrence. This can be quite tiresome for users
after a while, so it can be a good idea to create an expertise-based
system, in which a global variable defines a user's abilities,
such as novice or experienced. This is shown in the following Proc
code:

```procscript
; trigger: Remove Occurrence
if ($$USER_CLASS = "Novice") ;novice user, prompt for confirmation
askmess "Mark this occurrence for removal (y/n) ? "
if ($status = 0) ;No
return -1 ;do not remoove
else ;Yes
return 0 ;mark for removal
endif
else ;experienced user, trust ’em
return 0
endif
```

## Related Topics

- [remocc](../procstatements/remocc.md)
- [Delete](delete.md)


---

# Retrieve

Location for handling the processing that should occur after the
structure editor function ^RETRIEVE is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | RETR |
| Default Proc | udefault.xml  The default Proc code contains the retrieve Proc statement. |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Retrieve trigger
is activated by the structure editor function ^RETRIEVE.

## Description

This trigger
is generally used to retrieve data. If you want to allow the user
to access only a subset of the available data, place Proc code in
this trigger that sets the retrieve profile (by assigning specific
values to fields).

```procscript
retrieve
if ($status <0)
message "Retrieve did not succeed; see message frame"
endif
```

If Proc code in this trigger activates the
Read trigger and a negative value in the activated Read trigger
is returned, I/O processing is terminated after the Read
trigger completes.

A retrieve statement
in this trigger first builds the hitlist for the data (using any
profile information provided by way of Proc statements or on the
screen), and then activates the entity-level Read triggers
for each painted occurrence.

A retrieve statement
builds the hitlist, but only retrieves enough data to populate the
form. This has implications when used in conjunction with the erase statement. The erase statement erases only those occurrences
that have been retrieved; it does not erase all the occurrences in
the hitlist, but only those that have been displayed.

When the Retrieve trigger
is activated, the default single retrieve statement
retrieves data only from entity A. To retrieve data for entities B
and C, the following Proc code should be placed in the Retrieve trigger:

```procscript
; trigger: Retrieve
retrieve
if ($status <0)
message "Retrieve did not succeed; see message frame"
endif
retrieve/e "B"
if ($status <0)
message "Retrieve on B did not succeed; see message frame"
endif
```

This ensures that the form is correctly populated
with data when the ^RETRIEVE structure editor function is activated.
Be aware that the Proc compiler generates the warning that there
is no path to entity B. It is your responsibility to define this
path if it is required. For more information about painting unrelated
entities, see the Uniface online help.

```procscript
; trigger: Retrieve
PK.DOC_CODE = "D*"
retrieve
if ($status <0)
message "Retrieve did not succeed; see message frame"
endif
```

If you want to restrict the user's
access to a range of values, use a u\_where clause
in the read statement in the
Read trigger. See the Read trigger for an example of this.

## Retrieving Multiple Outer Entities

If you have painted two or more *outer* entities on a component, you need to
include additional retrieve statements.
(When you paint two or more outer entities on a component, they
are usually unrelated entities, although this is not necessarily
the case. Painting related entities ‘outer’ to
each other causes Uniface to assume that the entities are not related;
it makes no attempt to locate a relationship in the application model.)

The default retrieve statement
in the Retrieve trigger causes the first outer
entity (that is, the top, left-most entity painted) and its related entities
to be retrieved. To retrieve any other outer entities, you need
to include additional retrieve`/e` statements
in the Retrieve trigger of the first outer entity.

## Using a Profile to Retrieve a Subset of Data

To cause a form to retrieve a subset of the
available data, set the required fields to the restricting values
in the Retrieve trigger and then use the retrieve statement to get the data.

## Related Topics

- [Retrieve Sequential](retrievesequential.md)


---

# Retrieve Sequential

Location for handling the processing that should occur after the
structure editor function ^RETRIEVE\_SEQ is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | RETS |
| Default Proc | udefault.xml  The default Proc code provided by Uniface for this trigger contains the Proc statement retrieve. |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The <Retrieve
Sequential> trigger is activated by the structure editor function
^RETRIEVE\_SEQ.

## Description

This trigger
is only useful in forms with behavior Record. Record behavior allows
only a single occurrence of the outer entity. A retrieve statement
in this trigger retrieves the next occurrence in the database with
a primary key value greater than the current one; that is, the occurrence
that would appear next in the sort order.

**Note:**  
Uniface does not support
this trigger for all DBMSs. To determine if it is supported for your DBMS,
see [Data Retrieval Support](../../../dbmssupport/dbmsdrivers/aboutdrivers/dataretrievalsupport.md).

If Proc code in this trigger activates the
Read trigger and a negative value in the activated Read trigger
is returned, I/O processing is terminated after the Read
trigger completes.

By default, the Retrieve Sequential trigger
contains the following code:

```procscript
retrieve
if ($status <0)
message "Retrieve sequential did not succeed; see message frame"
endif
```

## Related Topics

- [Retrieve](retrieve.md)


---

# Set State

Location for handling component-specific postprocessing.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | STST |
| Default Proc | For dynamic and static server pages: udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |
| Available on | All components |
| Trigger Activation | The Set State trigger is activated after the requested operation is activated, and in a web environment, before the Post Request trigger. |

## Description

The Set State trigger is typically used to handle
post processing specific to the operation, such as storing the state of a transaction, and so on.

State management is especially significant in a
Web environment, so default proc code is provided in the Set State trigger of dynamic and static
server pages.

The relationship between the request and state
triggers in a Web environment is shown in the following table:

Triggers and operations are activated from left
to right, depending on the $status returned by previous triggers.

Web-Specific Trigger Activation Sequence

| Pre Request return status | Get State return status | Execute trigger or other operation | Set State | Post Request | WRD status |
| --- | --- | --- | --- | --- | --- |
| $status = -21 | Not executed | Not executed | Not executed | Not executed | -21 |
| $status < 0 | Not executed | Not executed | Not executed | Not executed | 0 |
| $status >= 0 | $status = -21 | Not executed | Not executed | Executed | -21 |
| $status >= 0 | $status < 0 | Not executed | Not executed | Executed | 0 |
| $status >= 0 | $status >= 0 | Executed | Executed | Executed | 0 |

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

## Getting and Setting State with Cookies

The following example gets the Uniface cookie
from the browser and places it in the `$cookie$` component
variable. The USERCONTEXT information is stored as an associative
list in the format Variable`=`Value, where Variable is the name of a field or
variable in the Server Page. The getlistitems`/id` statement
reads the values contained in `$cookie$` and distributes
them accordingly:

```procscript
;trigger Get State
$cookies$ = $webinfo("USERCONTEXT")
getlistitems/id/component $cookies$
```

In the Set State trigger of the static server page, the following code updates the state information
when the page completes. The Proc code in this example initializes
a component variable `$statelist$` with the names
of the fields or variables containing the state information, then
uses the `putlistitems/id` statement
to populate the list in `$statelist$` with the current
values from the server page:

```procscript
;trigger Set State
$statelist$ = "Variable1=;Variable2="
putlistitems/id/component $statelist$
$webinfo("USERCONTEXT") = $statelist$
```

If you put empty cookie data into the first item of `USERCONTEXT`, for instance, by using putitem `$statelist$, 1, ""`, followed by $webinfo`("USERCONTEXT") = $statelist$`, Uniface substitutes a NULL identifier at the moment the empty cookie data is sent to the client.

## Related Topics

- [Execution Sequence of Triggers and Operations in Web Applications](../../../webapps/scripting/triggers_execution_sequence.md)
- [Post Request](post_request.md)
- [Pre Request](pre_request.md)


---

# Start Modification

Location for handling the processing that should occur whenever a user starts to
modifiy a field.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | SMOD |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | If $status is less than 0, the terminal beeps and the structure editor discards the data just entered. Focus remains in the field and the Start Modification trigger is activated again if more data is entered (as if this were the first data entered).  If $status is greater than or equal to 0, the data just entered is moved to the field. If this is the first attempted modification to the occurrences (with cautious locking in effect), the Lock trigger is activated after the Start Modification trigger completes.  In a unifield only, if $status is 99, the structure editor discards the character just entered; focus remains in the field. This is often used with `$prompt` to go to another field (see the example below). |

## Trigger Activation

In a unifield, the Start Modification trigger is activated whenever the user first starts
to enter new data into the field or to modify existing data in the field. It is not activated by
Proc statements that change the value of the field.

For other widgets, the Start Modification trigger is activated as soon as possible, but
the exact timing depends on the widget in question. In all cases, the activation of the Start
Modification trigger occurs before the Value Changed or Leave Field trigger.

## Description

This trigger is often used to ensure that it is currently valid to modify this field.

**Caution:** 

The Start Modification trigger is not intended for I/O operations. Avoid using Proc
statements here which cause data modification or I/O operations, where these actions involve the
current field or the occurrence to which it belongs (such as  clear`/e`). In some circumstances, these can cause Uniface to loop infinitely.

You can use this trigger to implement model validation, such as making sure that an
invoice date cannot be entered before an invoice number. This is shown in the following example:

```procscript
; trigger: Start Modification (of INV_DATE)
if (INV_NUMBER = "")
message "Supply invoice number first!"
return -1
endif
```

When the Start Modification trigger is activated, only the premodification contents of
the field are available. The field is only updated with new data when the trigger successfully
completes. In unifields only, the character code of the character the user entered, which caused
this trigger to be activated, is available in $char.

In the following example, when the user enters a capital D ($char is
"D"), Proc code in the Start Modification trigger puts the structure editor into Zoom mode and
inserts a salutation:

```procscript
; trigger: Start Modification of a unifield
if ($char = 68) ; "D"
if (GENDER = "M")
$1 = "Mr."
else
$1 = "Ms."
endif
macro "^127^096ear %%$1 %%SURNAME, ^CURSOR_RIGHT"
endif
```

## Return Value 99

Consider a situation where, when a user attempts to enter data beginning with a capital
letter into FIELD1, that character should be discarded and input accepted from FIELD2. You might
consider using the following Proc code:

```procscript
; trigger: Start Modification of FIELD1 (unifield)
if ( $char >= 65 & $char <=90 ) ;A-Z
$prompt = FIELD2
return 0
endif
```

When a capital letter (A-Z) is entered, this trigger returns with
$status set to zero. But, because $char still contains the
character that was entered in FIELD1, the Start Modification trigger of FIELD2 is activated. To
prevent this from happening, you can use the return value 99 in the Start Modification trigger of
FIELD1:

```procscript
; trigger: Start Modification of FIELD1
if ( $char >= 65 & $char <=90 ) ;A-Z
$prompt = FIELD2
return 99
endif
```

**Note:**   A return value of 99 in this trigger should only be used in the situations like the one
described above, that is, to discard the pending input when $prompt is used to
move to another field. Do not use a return value of 99 to provide the functionality of
`return -1`, but without making the terminal beep.

## Related Topics

- [Lock](lock.md)
- [$char](../procfunctions/_char.md)


---

# Store

Location for handling the processing that should occur after the structure editor
function ^STORE is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | STOR |
| Default Proc | udefault.xml  The default Proc code contains the Proc statement store. |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Store trigger is activated by the structure editor function ^STORE.

## Description

By default, the Store trigger contains the store statement with Proc
code to check for any store errors. If the store operation was successful, it
commits the stored data; otherwise, the changes are rolled back.

The store statement activates the following triggers:

* Write or Write Up trigger of each occurrence that has been modified or newly entered.
  Unmodified occurrences are not stored.
* Delete or Delete Up trigger of each occurrence that has been removed.

If you want to prevent the user from storing occurrences with certain values, you should
put the checks in the Leave Field, Leave Modified Occurrence, or Leave Modified Key triggers. This
approach allows the user to be informed about the error at the point of data entry, rather than
later when the data is stored. The Write trigger is an alternative place for these checks, but is
not recommended.

## Related Topics

- [delete](../procstatements/delete.md)
- [write](../procstatements/write.md)
- [Delete](delete.md)
- [Write](write.md)
- [Delete Up](delete_up.md)
- [Leave Field](leavefield.md)
- [Leave Modified Key](leavemodifiedkey.md)
- [Leave Modified Occurrence](leavemodifiedoccurrence.md)
- [Write Up](writeup.md)


---

# Switch Keyboard

Trigger for handling the processing for loading a new keyboard translation table.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | SWIT |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. |

## Trigger Activation

The Switch Keyboard trigger is activated by the
structure editor function ^SWITCH\_KEY.

## Description

The Switch Keyboard trigger defines the
application-wide actions that should be taken when the user activates the trigger with the
^SWITCH\_KEY structure editor function. This trigger is generally used to load a new keyboard
translation table (using the $keyboard function), for example to change from the
default mode to numeric keypad mode. This is shown in the following example:

```procscript
; trigger: Switch Keyboard
if ($keyboard = 'vtnum')
$keyboard = "VT200"
message "Default keyboard in use."
else
$keyboard = "VTNUM"
message "Numeric keyboard in use."
endif
```

Often, this trigger contains the debug statement, although this statement should only appear in development applications, not
production ones.

If it is necessary to define actions that should
only apply to particular forms, the Proc code in the <Switch Keyboard> trigger can include
tests on $instancename. Be aware that this can make maintenance more difficult,
especially when a form that is explicitly mentioned in a test is replaced by a form with a
different name.

---

# Triggers: Standard

Standard triggers are containers for Proc code that is executed when the event
associated with the trigger occurs.

Trigger descriptions describe the correct usage of
the trigger and the effect of the return value on the trigger.

Trigger name abbreviations are often used in
processing messages and Proc tracing.

Standard Triggers

| Trigger | Abbreviation | Level | Purpose |
| --- | --- | --- | --- |
| [Accept](accept.md) | ACPT | Component | Close a component with the intention to keep all modifications made on it. |
| [Add/Insert Occurrence](addinsertoccurrence.md) | AIO | Entity | Create new occurrences |
| [Application Execute](applicationexecute.md) | APPL | Application | Launch the environment and controlling the interaction of the application with the component manager |
| [Asynchronous Interrupt (Application)](asynchronousinterrupt.md) | ASYN | Application | Handle asynchronous interrupts |
| [Asynchronous Interrupt (Component)](asynchronousinterrupt2.md) | ASYS | Component | Handle asynchronous interrupts |
| [Clear](clear.md) | CLR | Component | Handle user request to clear the form |
| [Collection Operations](collection_operations.md) | ECOP | Entity | Container for entity-level Proc operations |
| [Decrypt](decrypt.md) | DECR | Field | Decrypt data for a field when reading from the database |
| [Defines](defines.md) | <DEFN> | Component, Entity, Field | Container for definitions of constants |
| [Deformat](deformat.md) | DFMT | Field | Temporarily convert the format of data and making the data available for processing purposes |
| [Delete](delete.md) | DELE | Entity | Remove occurrences marked for deletion when writing updates to the database |
| [Delete Up](delete_up.md) | DLUP | Entity | Delete occurrences in up entities |
| [Detail (Entity)](detail_entity_level.md) | DTLE | Entity | React to ^DETAIL, often by activating an operation |
| [Detail (Field)](detail_field_level.md) | DTLF | Field | React to ^DETAIL, often by activating an operation |
| [Encrypt](encrypt.md) | ENCR | Field | Encrypt data in a field when writing to the database |
| [Erase](erase.md) | ERAS | Component | Delete all occurrences currently in the component both in the external structure and in the database.  **Caution:** Very dangerous trigger. Use with extreme care. |
| [Execute](execute.md) | EXEC | Component | Location for the EXEC operation used to activate components |
| [Extended Triggers](extended_triggers.md) | FXTG  EXTG | Field  Entity | Container for processing of extended events generated by OWI widgets. See [Extended Triggers](../../triggers/concepts/extended_triggers.md). |
| [Field Gets Focus](fieldgetsfocus.md) | FGF | Field | Handle processing when a field gets focus; usually used for user interface actions such as modifying the way a field is displayed |
| [Format](format.md) | FMT | Field | Displayi or print a field; especially useful with custom widgets |
| [Form Gets Focus](formgetsfocus.md) | FRGF | Component | Handle processing when a form gets focus; usually used for user interface actions such as prompting the user |
| [Form Loses Focus](formlosesfocus.md) | FRLF | Component | Handle processing when a form loses focus; typically used to perform actions such as data verification |
| [Frame Gets Focus](framegetsfocus.md) | OGF | Header, trailer, and break frame | Handle processing when a frame gets focus (this is usually when the frame is about to be printed).  **Note:**   The abbreviation is not shown in the Uniface Debugger, but is shown in Proc code listings. |
| [Get State](get_state.md) | GTST | Component | Handling preprocessing specific to an operation, such as re-creating the state of a transaction |
| [Help (Entity)](help.md) | HLPE | Entity | Reacting to user's request for online help |
| [Help (Field)](help2.md) | HLPF | Field | Reacting to user's request for online help |
| [Leave Field](leavefield.md) | LFLD | Field | Defines what happens after a user successfully leaves a field (that is, after all data validation checks have completed without error) |
| [Leave Modified Key](leavemodifiedkey.md) | LMK | Entity | Handle processing after a key of an occurrence is modified |
| [Leave Modified Occurrence](leavemodifiedoccurrence.md) | LMO | Entity | Handle processing when the user repositions the cursor to another occurrence, after modifying the original occurrence. |
| [Leave Printed Occurrence](leave_printed_occurrence.md) | LPO | Entity | Handle processing after an occurrence is printed |
| [Local Proc Modules, component level](localprocmodules.md) | LPMX | Component | Container for entry Proc modules |
| [Local Proc Modules, entity level](localprocmodules2.md) | LPME | Entity | Container for entry Proc modules |
| [Local Proc Modules, field level](localprocmodules3.md) | LPMF | Field | Container for entry Proc modules |
| [Lock](lock.md) | LOCK | Entity | Location for lock statement and associated logic. |
| [Menu (Application)](menu.md) | MNUA | Handle processing after ^MENU is activated, typically to activate a menu bar |
| [Menu (Component)](menu2.md) | MNUS | Component | Handle processing after ^MENU is activated, typically to activate a menu bar |
| [Menu (Entity)](menu3.md) | MNUE | Entity | Handle processing after ^MENU is activated, typically to activate a pop-up menu |
| [Menu (Field)](menu4.md) | MNUF | Field | Handle processing after ^MENU is activated, typically to activate a pop-up menu |
| [Next Field](nextfield.md) | NFLD | Field | Control the prompting sequence of fields.  **Note:**  Do not use for data validation processing. |
| [Occurrence Gets Focus](occurrencegetsfocus.md) | OGF | Entity | Handle processing when an occurrence gets focus |
| [Occurrence Operations](occurrence_operations.md) | EOOP | Entity | Container for occurrence-level Proc operations |
| [On Error (Entity)](onerror.md) | ERRE | Entity | Handle errors. |
| [On Error (Field)](onerror2.md) | ERRF | Field | Handle errors. |
| [Operations](operations.md) | OPER | Component | Container for component operations |
| [Option](option.md) | OPTN | Menu item | Handle processing after a menu item is selected |
| [Post Load Occurrence](post_load_occurrence.md) | PSLO | Entity | Process an occurrence after it is loaded from an XML stream into a component. |
| [Post Request](post_request.md) | PSTP | Application | Handle generic global post processing, such as close DBMS connection, or appending log records |
| [Post Save Occurrence](post_save_occurrence.md) | PSSO | Entity | Process an occurrence after it is saved from a component into an XML stream. |
| [Predisplay](predisplay.md) | PDIS | Menu item | Processing before a menu or menu item is displayed, for example enabling or disabling it. |
| [Previous Field](previousfield.md) | PFLD | Field | Control the prompting sequence of fields.  **Note:**  Do not use for data validation processing. |
| [Pre Load Occurrence](pre_load_occurrence.md) | PRLO | Entity | Process an occurrence before it is loaded from an XML stream into a component |
| [Pre Request](pre_request.md) | PREP | Application | Handle generic global preprocessing, such as environment verification, checking user rights or permissions, log file or audit file record keeping. |
| [Pre Save Occurrence](pre_save_occurrence.md) | PRSO | Entity | Process an occurrence before it is saved from a component into an XML stream |
| [Print](print.md) | PRNT | Component | Processing required prior to printing a report |
| [Pulldown (Application)](pulldown.md) | PULA | Application | Processing required after ^PULLDOWN is activated in an application menu  Deprecated |
| [Pulldown (Component)](pulldown2.md) | PULS | Component | Processing required after ^PULLDOWN is activated in a component menu |
| [Quit](quit.md) | QUIT | Component | Close a component with the intention to cancel all modifications made on it |
| [Read](read.md) | READ | Entity | Fetch an occurrence from the database. |
| [Remove Occurrence](removeoccurrence.md) | RMO | Component | Process a request to remove an occurrence. |
| [Retrieve](retrieve.md) | RETR | Component | Retrieve data. |
| [Retrieve Sequential](retrievesequential.md) | RETS | Component | Retrieves the next occurrence that would appear in the sort order; useful only in forms with behavior Record, which retrieves a single occurrence of the outer entity. |
| [Set State](set_state.md) | STST | Component | Handle post processing specific to the operation, such as storing the state of a transaction. |
| [Start Modification](startmodification.md) | SMOD | Field | Handle processing that should occur when a user starts to modifiy a field. |
| [Store](store.md) | STOR | Component | Store data |
| [Switch Keyboard](switchkeyboard.md) | SWIT | Application | Defines application-wide actions to be taken when the user when switching keyboar translation tables, for example to change from the default mode to numeric keypad mode |
| [User Key (Application)](userkey.md) | UKYA | Application | Handle processing associated with user-defined key sequences. |
| [User Key (Component)](userkey2.md) | UKYS | Component | Handle processing associated with user-defined key sequences. |
| [Validate Field](validatefield.md) | VLDF | Field | Define the procedural checks that are done to validate a modified field. |
| [Validate Key](validatekey.md) | VLDK | Entity | Define the procedural checks that are done to validate a modified primary or candidate key. |
| [Validate Occurrence](validateoccurrence.md) | VLDO | Entity | Define the procedural checks that are done to validate a modified occurrence. |
| [Value Changed](valuechanged.md) | VALC | Field | Handle processing after a user completes a change to the value of a field. |
| [Write](write.md) | WRIT | Entity | Write an occurrence to the database. |
| [Write Up](writeup.md) | WRUP | Entity | Write an occurrence of an up entity to the database |

## Related Topics

- [trigger](../procstatements/trigger.md)
- [Triggers](../../triggers/concepts/triggers.md)
- [Standard Triggers](../../triggers/concepts/triggers_is.md)


---

# User Key (Application)

Application-level trigger for handling the processing that should occur after a
user-defined key is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | UKYA |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | The value of $status has no effect on the structure editor. A negative value causes the terminal to beep. |

## Trigger Activation

The application-level User Key trigger is
activated when Uniface encounters a `^USER_KEY` sequence (as defined in the keyboard
translation table) and one of the following conditions is met:

* The component-level User Key trigger is
  empty.
* The Proc code in the component-level User Key
  trigger returns a value that is greater than or equal to 0 but not 99.

The User Key trigger is not activated if the
structure editor is not available, for example if it is waiting for a response to an
askmess, if there is a menu active, if the Toolbar is showing, and so on.

## Description

This trigger is used to define the processing
associated with user-defined key sequences. The identification character for this user key sequence
(from the `^USER_KEY` definition in the keyboard translation table) is available in $char. All characters between the identification character and the terminator
code defined for the user key are stored in $result, provided that no more than
61 characters are entered. Characters after the sixty-first character are ignored until the defined
terminator character sequence is encountered.

## Related Topics

- [$char](../procfunctions/_char.md)
- [$result](../procfunctions/_result.md)
- [User Key Definitions](../../../platformsupport/keyboardinput/defining_user_keys.md)
- [User Key (Component)](userkey2.md)


---

# User Key (Component)

Component-level trigger for handling the processing that should occur after a
user-defined key is activated.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | UKYS |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | <0 —the application-level User Key trigger is not activated and the terminal beeps.  99—the application-level User Key trigger is also not activated, but the terminal does not beep.  >=0, but not 99—the application-level User Key trigger is activated without a beep. |

## Trigger Activation

The component-level User Key trigger is activated
when Uniface encounters a `^USER_KEY` sequence (as defined in the keyboard
translation table).

The User Key trigger is not activated if the
structure editor is not available, for example, if it is waiting for a response to an
askmess, if there is a menu active, if the toolbar is showing, and so on.

## Description

This trigger is used to define the processing
associated with user-defined key sequences. The identification character for this user key sequence
(from the `^USER_KEY` definition in the keyboard translation table) is available in $char. All characters between the identification character and the terminator
code defined for the user key are stored in $result, provided that no more than
61 characters are entered. Characters after the sixty-first character are ignored until the defined
terminator character sequence is encountered.

## Related Topics

- [$char](../procfunctions/_char.md)
- [$result](../procfunctions/_result.md)
- [User Key (Application)](userkey.md)
- [User Key Definitions](../../../platformsupport/keyboardinput/defining_user_keys.md)


---

# Validate Field

Location for handling procedural field validation.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | VLDF |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action; $status, $fieldvalidation, and $fieldcheck are set to 0. |
| Return values | If $status is less than zero, validation is considered to have failed and the field-level On Error trigger is activated. If `$status` is greater than or equal to zero, validation is considered to have completed successfully. |

## Trigger Activation

The Validate Field trigger is activated for a field that needs validation, in the
following cases:

* During the processing of a store statement.
* After the declarative checks, and, in forms, before the Leave Field trigger is
  activated.
* As a result of executing one of the validation statements
  (validate, validateocc, validatekey, and
  validatefield).

A field needs validation if one of the following conditions is met:

* Validation is required because the field has been modified
  ($fieldmod is 1) but has not yet been successfully validated
  ($fieldvalidation is also 1).
* Validation has been demanded by Proc code ($fieldcheck is 1).

## Description

The Validate Field trigger defines the procedural checks that are done to validate a
modified field. The trigger is activated during either implicit or explicit validation, that is,
when one of the following conditions occur:

* Explicitly, during the processing of one of the validation statements
  (validate, validateocc, validatekey, or
  validatefield).
* Implicitly, during the processing of a store statement.
* Implicitly, prior to the Leave Field trigger.

Validation is performed only if the field is marked as modified
($fieldmod is 1) and still requires validation
($fieldvalidation is 1) or if $fieldcheck is 1.

Because the validation statements activate the Validate triggers (Validate Field,
Validate Key, and Validate Occurrence triggers), these statements should be used with caution
within the Validate triggers.

**Caution:** 

The Validate Field trigger should not be used to modify the value being validated, only
to check whether a value is valid or not.

In the following example, the bank account number is verified to ensure that it conforms
with the required standard:

```procscript
;Trigger: Validate Field of field BANK_ACCOUNT_NUMBER
;verify that the bank account numbers conforms with the standard
;
call CHECK_ACCOUNT_NUMBER(BANK_ACCOUNT_NUMBER.CLIENT)
return ($status)
```

## Related Topics

- [validate](../procstatements/validate.md)
- [validatefield](../procstatements/validatefield.md)
- [$fieldcheck](../procfunctions/_fieldcheck.md)
- [$fielddbmod](../procfunctions/_fielddbmod.md)
- [$fieldmod](../procfunctions/_fieldmod.md)
- [$fieldvalidation](../procfunctions/_fieldvalidation.md)
- [Store](store.md)
- [Leave Field](leavefield.md)
- [Validate Key](validatekey.md)
- [Validate Occurrence](validateoccurrence.md)


---

# Validate Key

Location for handling procedural key validation.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | VLDK |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action; $status, $keyvalidation, and $keycheck are set to 0. |
| Return values | If $status is less than zero, validation is considered to have failed and the entity-level On Error trigger is activated. |

## Trigger Activation

The Validate Key trigger is activated for a primary or candidate key that needs
validation, in the following cases:

* During the processing of a store statement.
* In forms, before the Leave Modified Key trigger is activated.
* As a result of executing one of the validation statements
  (validate, validateocc, and validatekey).

For candidate keys, the Validate Key trigger is activated only if the
Validate property for that key is selected in the Define
Key form.

A key needs validation if one of the following conditions is met:

* Validation is required because at least one of the key’s fields has been modified
  ($keymod is 1) but the key has not yet been successfully validated
  ($keyvalidation is also 1).
* Validation has been demanded by Proc code ($keycheck is 1).

## Description

The Validate Key trigger defines the procedural checks that are done to validate a
modified primary or candidate key. The trigger is activated during either implicit or explicit
validation, that is, when one of the following conditions occur:

* Explicitly, during the processing of one of the validation statements
  (validate, validateocc, or validatekey).
* Implicitly, during the processing of a store statement.
* Implicitly, prior to the Leave Modified Key trigger.

Validation is performed only if the key is marked as modified ($keymod
is 1) and still requires validation ($keyvalidation is 1) or if
$keycheck is 1.

For example, the Validate Key trigger would look like this:

```procscript
; modified (7.2.03) Validate Key trigger
findkey $entname, $curkey
SelectCase $status
Case 0 ; key not found
if ($foreign & SomeCondition) ; not allowed key in up entity
```

```procscript
return(-1)
endif
Case 1 ; key found on Component
...
```

```procscript
EndSelectCase
return(0)
```

When a negative return value occurs in the Validate Key trigger, the On Error trigger for
the entity is activated with $error of 0147. You might update the On Error
trigger as follows:

```procscript
selectcase $error
case 0147; key validation failed
message "This is not allowed"
return -1
elsecase
message $text("%%$error")
endselectcase
```

**Note:**   If you have more than one constraint which might cause the Validate Key trigger to
fail, you can return a unique (negative) value for each constraint in $status,
then use the function $dataerrorcontext in the On Error trigger to determine the
particular value of $status that activated the On Error trigger.

Because the validation statements (validatefield,
validatekey, validateocc, and validate)
activate the Validate triggers (Validate Field, Validate Key, and Validate Occurrence triggers),
these statements should be used with caution within the Validate triggers.

Use the function $curkey to determine the key for which the Validate
Key trigger was activated.

## Related Topics

- [validate](../procstatements/validate.md)
- [validatefield](../procstatements/validatefield.md)
- [validateocc](../procstatements/validateocc.md)
- [$curkey](../procfunctions/_curkey.md)
- [$dataerrorcontext](../procfunctions/_dataerrorcontext.md)
- [$keycheck](../procfunctions/_keycheck.md)
- [$keymod](../procfunctions/_keymod.md)
- [$keyvalidation](../procfunctions/_keyvalidation.md)
- [store](../procstatements/store.md)
- [Store](store.md)
- [Leave Modified Key](leavemodifiedkey.md)
- [Validate Field](validatefield.md)
- [Validate Occurrence](validateoccurrence.md)


---

# Validate Occurrence

Location for handling procedural occurrence validation.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | VLDO |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action; both $status, $occvalidation, and $occcheck are set to 0. |
| Return values | If $status is less than zero, validation is considered to have failed and the entity-level On Error trigger is activated. |

## Trigger Activation

The Validate Occurrence trigger is activated for occurrences that need validation, in the
following cases:

* During the processing of a store statement.
* After declarative checks and, in forms, before the Leave Modified Occurrence trigger
  is activated.
* As a result of executing one of the validation statements
  (validate or validateocc).

An occurrence needs validation if one of the following conditions is met:

* The occurrence requires validation because at least one of its fields has been
  modified ($occmod is 1) but the occurrence has not yet been successfully
  validated ($occvalidation is 1).
* Validation has been demanded by Proc code ($occcheck is 1).

## Description

The Validate Occurrence trigger defines the procedural checks that are done to validate a
modified occurrence. The trigger is activated during either implicit or explicit validation, that
is, when one of the following conditions occur:

* Explicitly, during the processing of one of the validation statements
  (validate or validateocc).
* Implicitly, during the processing of a `store` statement.
* Implicitly, prior to the Leave Modified Occurrence trigger.

Validation is performed only if the occurrence is marked as modified
($occmod is 1) and still requires validation ($occvalidation
is 1) or if $occcheck is 1.

Because the validation statements (validatefield,
validatekey, validateocc, and validate)
activate the Validate triggers (Validate Field, Validate Key, and Validate Occurrence triggers),
these statements should be used with caution within the Validate triggers.

In the following example, the fields CITY and ZIP\_CODE are cross-checked with each other
before the occurrence is considered valid:

```procscript
;Trigger: Validate Occurrence
if ( CITY = "" & ZIP_CODE = "") ;city & zip are missing
   $status = -1 ;oops!
elseif ( CITY = "" & ZIP_CODE !="") ;city is blank, but zip is present
   activate "LOCATOR".FILL_CITY_FROM_ZIP(CITY, ZIP_CODE)
elseif ( CITY != "" & ZIP_CODE = "") ;city is present, but zip isn't
   $status = -2 ;can't help here
else ;both city and zip are present
   activate "LOCATOR".MATCH_CITY_ZIP(CITY, ZIP_CODE)
endif

return ($status) ;return what we've got
```

## Related Topics

- [$fieldvalidation](../procfunctions/_fieldvalidation.md)
- [$instancevalidation](../procfunctions/_instancevalidation.md)
- [$keyvalidation](../procfunctions/_keyvalidation.md)
- [$occdbmod](../procfunctions/_occdbmod.md)
- [$occcheck](../procfunctions/_occcheck.md)
- [$occmod](../procfunctions/_occmod.md)
- [$occvalidation](../procfunctions/_occvalidation.md)
- [validatefield](../procstatements/validatefield.md)
- [validatekey](../procstatements/validatekey.md)
- [validateocc](../procstatements/validateocc.md)
- [Store](store.md)
- [Leave Modified Occurrence](leavemodifiedoccurrence.md)
- [Validate Field](validatefield.md)
- [Validate Key](validatekey.md)


---

# Value Changed

Location for handling the processing that should occur after a user
completes a change to the value of a field.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | VALC |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | If $status is less than zero, the user cannot leave the field.  **Note:**  Returning a negative value does not cause the original value of the field to be restored; the changed value remains in place. |

## Trigger Activation

The Value Changed
trigger is activated after the *user* completes
a change to the value of a field. When a field is modified for
the first time, the Start Modification trigger of the field is activated.
If the Start Modification trigger completes successfully, subsequent
processing depends on the widget type defined for the field.

* For some widgets (such as drop-down lists,
  radio groups, list boxes, check boxes, and spin buttons), the Value
  Changed trigger is activated each time the user selects a value
  for the field. In other words, the widget activates the trigger.
  The Value Changed trigger is activated each time the
  user *selects* a value, regardless of whether
  the selection is the current value or a new value.
* For other widgets
  (such as, edit boxes and unifields), the Value Changed trigger
  is activated only when the user tries to leave the field.
* User-defined widgets
  are free to activate this trigger.

The Value Changed trigger is also activated
before the Detail or Help triggers,
when either the ^DETAIL or ^HELP structure editor function is used.

The Value Changed trigger is *not*
activated if you use Proc code
to change the value of a field. This is also true if the active path is changed by way
of Proc statements such as $prompt, setocc, and so on.

## Description

This trigger
is provided to help developers make optimum use of widgets. When
it is activated by a widget such as a drop-down list, it can be used
for such things as updating the contents of related fields on the
screen.

The Value Changed trigger is
activated as part of the current field processing. When the user
leaves the field and the processing of the Value Changed trigger
completes successfully, declarative definitions are then verified;
this can result in the activation of an On Error trigger. After
the declarative definitions have been verified, the data validation
triggers are activated as needed, starting with the Leave Field
trigger.

## Widget Activates the Trigger

If the widget activates
the Value Changed trigger, the Proc code in the trigger is processed
with the following results:

* If Proc code in the trigger returns a positive
  value (for success), the Value Changed trigger is *not* reactivated
  when leaving the field, unless the field is modified again.
* If Proc code in
  the trigger returns a negative value (for failure), the Value Changed
  trigger is reactivated
  when leaving the field before any data validation processing occurs.
  Once the Value Changed trigger has failed, the data
  must be corrected before the field can be left.

## Widget Does Not Activate the Trigger

If the widget *does not* activate
the Value Changed trigger, the structure editor activates the Value
Changed trigger as the field is left, before any data validation
processing occurs. In this situation, the Value Changed trigger
is activated when the user moves to another field, before declarative
definitions are checked, and before the Leave Field trigger is activated.

## Activating the Trigger When Leaving the Field

The structure editor activates the Value Changed
trigger while leaving the field (before any data validation processing)
if the following conditions are met:

* The user modified the field and the resulting
  Start Modification processing was successful.
* One of these conditions
  is met:
* + The Value Changed
    trigger has already been activated (by the widget), but the Proc
    code in the Value Changed trigger returned a negative value.
  + The widget did
    not activate the Value Changed trigger.

## Related Topics

- [Lock](lock.md)
- [Start Modification](startmodification.md)
- [Leave Field](leavefield.md)


---

# Write

Location for handling the processing that should write an occurrence
to the database.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | WRIT |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | If $status is less than zero, database I/O is terminated; no further triggers are activated for the current I/O request. |

## Trigger Activation

The Write trigger
is activated (during the processing of a Proc statement store) for each database occurrence,
if that occurrence has been modified or created (either by the user
or by Proc code), except in the following cases:

* The form was run with the /query or /display switch.
* The component is
  defined with behavior Limited.
* The entity is defined
  with Locking as No Updates.
* The entity is defined
  as not present in the database.
* The entity is an
  up entity. (The Write Up trigger is activated in this case.)

The Write trigger of an outer entity is always
activated before the Write or Write Up trigger of any inner entity.

## Description

This trigger
is used to specify the processing that should be done when an occurrence
is changed or when it is added to the database. The modification
status of the occurrence is available by way of the Proc function $occmod.

This trigger is activated only for non-foreign
entities, that is, for down relationships. (If an entity is painted
as foreign, the Write Up trigger is activated instead; see this
trigger for more information.)

If the Write trigger contains only a single write statement, at run time Uniface
carries out the write action without invoking
the Proc interpreter (except when the debugger is active). This
feature improves performance.

## Related Topics

- [lock](../procstatements/lock.md)
- [Encrypt](encrypt.md)
- [Lock](lock.md)
- [Store](store.md)
- [Leave Field](leavefield.md)
- [Leave Modified Key](leavemodifiedkey.md)
- [Leave Modified Occurrence](leavemodifiedoccurrence.md)
- [Write Up](writeup.md)


---

# Write Up

Location for handling the processing that should write an occurrence
of an up entity to the database.

| Characteristic | Description |
| --- | --- |
| Trigger abbreviation | WRUP |
| Default Proc | udefault.xml |
| Default action | If no Proc code is present in this trigger, there is no action. |
| Return values | If $status is less than zero, database I/O is terminated; no further triggers are activated for the current I/O request. |

## Trigger Activation

The Write Up trigger
is activated during the processing of a Proc statement store for each database occurrence
of an up entity. The activation occurs only when the occurrence
is a database occurrence that has been modified or created (either
by the user or by Proc code), except in the following cases:

* The form was run with the /query or /display switch.
* The component is
  defined as behavior Limited.
* The entity is defined
  with Locking as No Updates.

## Description

This trigger
is activated by the ^STORE function for a foreign entity painted
inside another entity, if the foreign entity has been modified.

By default, the Write Up trigger is empty,
meaning that any modifications are not stored.

**Caution:** 

Placing a write statement in the Write Up trigger
can have serious implications for database integrity if the DBMS
in use does not support referential integrity. DBMSs which cannot
handle referential integrity constraints (that is, Uniface does
it for them) could modify a foreign occurrence while related occurrences
still depend on the original value. Uniface does not carry out the
constraint check in this case, because of your coding.

DBMSs which do support referential integrity
constraints return store errors if they detect constraint violations
which are tolerated by Uniface. This is especially likely to happen
if compiling the form returns a warning message indicating that
an entity needed for integrity control has not been painted.

If the Write Up trigger of an up entity contains
Proc code, the Lock trigger of this entity is activated when the
user modifies the up entity. Uniface takes care of key transportation.

## Related Topics

- [lock](../procstatements/lock.md)
- [Encrypt](encrypt.md)
- [Store](store.md)
- [Write](write.md)
- [Leave Field](leavefield.md)
- [Leave Modified Key](leavemodifiedkey.md)
- [Leave Modified Occurrence](leavemodifiedoccurrence.md)

