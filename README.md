
# Ticket 1
Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.
(this is an umbrella ticket to keep track of the progress)


# Ticket 2: 
Write database migrations to add fields for custom agent ID
Check that the Facilities, Agents, and Shifts tables have all relations in place
 
# Ticket 3: 
Add REST methods on the backend to allow  setting and reading of a custom ids by the facility. 
Keep in mind the permissions

getShiftsByFacility() should be changed to fetch shifts by facility-specific agent ids 
generateReport() should be sorted by internal ids but show both internal and facility-specific ones 





