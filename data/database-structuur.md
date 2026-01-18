# Database Structure RehabNearByMe.com

## URL Structure

### States
- `/state/california`
- `/state/texas`
- `/state/florida`
- etc.

### Counties
- `/county/los-angeles`
- `/county/harris`
- `/county/cook`
- etc.

### Facilities
- `/facility/[city]/[facility-name]`
- Example: `/facility/los-angeles/sunrise-recovery`
- Example: `/facility/houston/new-beginnings-treatment`

### Types
- `/type/inpatient-rehab`
- `/type/outpatient-treatment`
- `/type/detox-center`
- `/type/sober-living`

## Database Fields

### Required fields:
```json
{
  "id": "unique-id",
  "name": "Official name",
  "slug": "url-friendly-name",
  "type": "inpatient | outpatient | detox | sober-living | dual-diagnosis",
  "city": "City name",
  "state": "State name",
  "address": {
    "street": "Street name + number",
    "zip": "12345",
    "city": "City name"
  }
}
```

### Optional fields:
```json
{
  "contact": {
    "phone": "",
    "email": "",
    "website": ""
  },
  "hours": {
    "monday": "",
    "tuesday": "",
    "wednesday": "",
    "thursday": "",
    "friday": "",
    "saturday": "",
    "sunday": "",
    "notes": ""
  },
  "amenities": [],
  "accessibility": {
    "wheelchair_accessible": true/false,
    "parking": ""
  },
  "coordinates": {
    "lat": 34.0000,
    "lng": -118.0000
  }
}
```

## Quality Requirements

1. **No duplicate entries** - Each facility appears only once
2. **Correct names** - Official names, no generic names
3. **Complete addresses** - Street, zip code and city
4. **Type verification** - Only allowed treatment types
5. **State/county mapping** - Must match US geographic divisions
