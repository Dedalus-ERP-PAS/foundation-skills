# HL7 IHE PAM Message Parser

## Overview

The HL7 PAM Parser skill helps you understand and explain HL7 v2.5 IHE PAM (Patient Administration Management) messages - the standard healthcare interoperability format for patient administration events.

## What It Does

- **Parses** HL7 ADT messages and identifies message type/event code
- **Extracts** all segments (MSH, EVN, PID, PV1, PV2) with proper field labels
- **Validates** message structure according to IHE PAM 2.10 specifications
- **Explains** what the message represents in human-readable format
- **Documents** business rules and IHE PAM compliance

## When to Use

Use this skill whenever you need to:

- Understand what an HL7 ADT message contains
- Debug HL7 message issues or interoperability problems
- Validate HL7 message structure and required fields
- Document HL7 message examples
- Learn about IHE PAM specifications and ADT events

## Supported Message Types

### ADT Messages (Admit, Discharge, Transfer)

- **ADT^A01** - Admit/Visit Notification (patient admission)
- **ADT^A02** - Transfer a Patient (unit/room transfer)
- **ADT^A03** - Discharge a Patient (hospital discharge)
- **ADT^A04** - Register a Patient (pre-admission/outpatient)
- **ADT^A05** - Pre-admit a Patient
- **ADT^A06** - Change Outpatient to Inpatient
- **ADT^A07** - Change Inpatient to Outpatient
- **ADT^A08** - Update Patient Information
- **ADT^A11** - Cancel Admit
- **ADT^A12** - Cancel Transfer
- **ADT^A13** - Cancel Discharge
- **ADT^A21** - Patient Goes on Leave of Absence
- **ADT^A22** - Patient Returns from Leave of Absence

## How to Use

Simply provide any HL7 ADT message (pipe-delimited text with segments), and the parser will:

1. Identify the message type and event code
2. Extract all segments (MSH, EVN, PID, PV1, PV2, etc.)
3. Parse all fields with proper labels
4. Validate against IHE PAM 2.10 requirements
5. Provide a human-readable explanation

**Example Input**:
```
MSH|^~\&|HEXAFLUX|CHU_PARIS|TARGET|DEST|20260122140000||ADT^A01^ADT_A01|MSG001|P|2.5
EVN|A01|20260122140000|||USER001
PID|1||PAT12345^^^CHU_PARIS^PI||DUPONT^JEAN^^M.||19750315|M|||15 RUE DE LA PAIX^^PARIS^^75001^FRA||(33)612345678
PV1|1|I|CHU_PARIS^CARDIO^LIT_001^CHU_PARIS||||PR_MARTIN^MARTIN^SOPHIE|||CARDIO||||||||||VIS20260122001|||||||||||||||||||||||||20260122140000
```

**Example Output**:
```
Message Type: ADT^A01 (Admit/Visit Notification)
Event: A01 - Patient admission to inpatient care
Patient: JEAN DUPONT, born 15/03/1975, Male (ID: PAT12345)
Visit: VIS20260122001
Admission: 22/01/2026 14:00:00
Location: CHU_PARIS, Cardiology, Bed LIT_001
Attending: Dr. MARTIN SOPHIE
Patient Class: Inpatient
```

## HL7 Message Structure

All HL7 v2.5 messages use these delimiters:

```
|  Field delimiter
^  Component delimiter
~  Repetition delimiter
\  Escape character
&  Subcomponent delimiter
```

**Basic Structure**:
```
MSH|^~\&|SendingApp|SendingFacility|...|MessageType|MessageControlId|...|2.5
EVN|EventCode|RecordedDateTime|...
PID|SetId||PatientId||PatientName||BirthDate|Sex|...
PV1|SetId|PatientClass|AssignedLocation|...
```

## Key Segments

### MSH - Message Header (Required)
Contains message routing and metadata:
- Sending/receiving applications and facilities
- Message type and control ID
- Timestamp and version

### EVN - Event Type (Required)
Contains event-specific information:
- Event type code (A01, A02, A03, etc.)
- When the event was recorded
- Who triggered the event

### PID - Patient Identification (Required)
Contains patient demographics:
- Patient ID and name
- Birth date and sex
- Address and phone
- Other identifying information

### PV1 - Patient Visit (Required)
Contains visit/encounter information:
- Patient class (Inpatient/Outpatient/Emergency)
- Assigned location (facility, service, room, bed)
- Visit number
- Attending physician
- Admission/discharge dates

### PV2 - Additional Visit Info (Optional)
Contains extended visit information:
- Prior location (for transfers)
- Admit reason
- Expected discharge information

## IHE PAM 2.10 Compliance

The parser validates messages against IHE PAM 2.10 requirements:

**Required Segments**: MSH, EVN, PID, PV1  
**Required Fields**:
- MSH: Sending App, Facility, DateTime, Message Type, Control ID, Version
- EVN: Event Code, Recorded DateTime
- PID: Patient ID, Name, Birth Date, Sex
- PV1: Patient Class, Location, Visit Number (for admissions)

## Reference

For complete HL7 and IHE PAM specifications, see:
- [IHE PAM 2.10 Specification](https://github.com/Interop-Sante/ihe.iti.pam.fr) (French)
- [IHE PAM Profile](https://profiles.ihe.net/ITI/TF/Volume1/ch-14.html) (International)
- [HL7 v2.5 Standard](http://www.hl7.eu/HL7v2x/v25/std25/ch02.html)
- [SKILL.md](../skills/hl7-pam-parser/SKILL.md) - Detailed segment and field structures

## Related Skills

- **hpk-parser** - Parse HPK messages (proprietary French format often mapped to HL7)
- HPK and HL7 are often used together in French healthcare interoperability workflows
