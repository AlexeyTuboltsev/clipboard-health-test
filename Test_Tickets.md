
# Ticket 1
Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.
(this is an umbrella ticket to keep track of the progress)


# Ticket 2: 
Write database migrations to add fields for custom agent ID
Check that the Facilities, Agents, and Shifts tables have all relations in place
 
# Ticket 3: 
Add REST methods on the backend to allow  setting and reading of custom ids by the facility.
Keep in mind the writing and reading permissions.

# Ticket 4:
Please change the `getShiftsByFacility()` in order to fetch shifts by facility-specific agent ids

# Ticket 5:
Please change the `generateReport()` in order to show both internal and facility-specific Ids
Sorting order should be by internal ids





