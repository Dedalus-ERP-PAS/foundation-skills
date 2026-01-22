# HPK Message Parser

## Overview

The HPK Parser skill helps you understand and explain HPK messages - a proprietary pipe-delimited healthcare message format used in French healthcare systems named Hexagone.

## What It Does

- **Parses** HPK messages and identifies the message type
- **Extracts** all fields with proper labels
- **Validates** message structure and field formats
- **Explains** what the message represents in human-readable format
- **Documents** business rules and field mappings

## When to Use

Use this skill whenever you need to:

- Understand what an HPK message contains
- Debug HPK message issues or data quality problems
- Document HPK message examples
- Validate HPK message structure
- Learn about HPK message types and fields

## Supported Message Types

### Identity Messages (ID|*)
- **ID|M1** - Patient demographics and registration
- **ID|MT** - Treating physician assignment
- **ID|CE** - Informed consent

### Movement Messages (MV|*)
- **MV|M2** - Hospital admission
- **MV|M3** - Status change
- **MV|M6** - Unit/service transfer
- **MV|M8** - Unit exit
- **MV|M9** - Hospital discharge
- **MV|B1** - Emergency box movement
- **MV|MT** - Temporary movement (exam, procedure)

### Coverage Messages (CV|*)
- **CV|M1** - Insurance coverage information

## How to Use

Simply provide any HPK message (pipe-delimited text), and the parser will:

1. Identify the message type and code
2. Extract all fields with proper labels
3. Validate the structure
4. Provide a human-readable explanation

**Example Input**:
```
ID|M1|C|HEXAGONE|20260122120000|USER001|PAT12345|DUPONT|JEAN|19750315|M|15 RUE DE LA PAIX|75001|PARIS|FRA|0612345678||||||||||||||||||||||||||||||
```

**Example Output**:
```
Message Type: Patient Identity (Demographics)
Operation: Creation (new record)
Patient: JEAN DUPONT, born 15/03/1975, Male
Contact: 06 12 34 56 78
Address: 15 RUE DE LA PAIX, 75001 PARIS, France
```

## HPK Message Structure

All HPK messages follow this basic structure:

```
Type|Message|Mode|Emetteur|Date|User|[additional fields...]
```

- **Type**: ID (Identity), MV (Movement), CV (Coverage)
- **Message**: M1, M2, M6, M9, MT, CE, B1, etc.
- **Mode**: C (Creation), M (Modification), D (Deletion)
- **Emetteur**: Source system
- **Date**: Timestamp (YYYYMMDDHHmmss)
- **User**: User ID

## Reference

For complete HPK specification and field definitions, see:
- [HPK ADT Message Specification](./hpk-adt-message.md)
- [SKILL.md](../skills/hpk-parser/SKILL.md) - Detailed field structures for all message types

## Related Standards

While HPK is proprietary, it is often mapped to:
- HL7 v2.5 standard for interoperability
- IHE PAM 2.10 profile for patient administration

See [IHE PAM Specification](https://github.com/Interop-Sante/ihe.iti.pam.fr) for context on healthcare messaging standards.
