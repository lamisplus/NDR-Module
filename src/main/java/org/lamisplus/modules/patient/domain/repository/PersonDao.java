package org.lamisplus.modules.patient.domain.repository;

public class PersonDao {
   public static final String INSERT_QUERY = String.format
            ("INSERT INTO person(active, addresses, archived, contact_points, contacts, created_by, " +
                     "date_created, date_modified, date_of_birth,date_of_registration, deceased, deceased_date_time, first_name, " +
                     "identifiers, other_name, modified_by, surname, uuid, gender, marital_status,organization,education, employment_status)" +
                     " VALUES (?, (to_json(?::jsonb)), ?,(to_json(?::jsonb)), (to_json(?::jsonb)), ?, ?, ?, ?,?, ?, ?, ?," +
                     "(to_json(?::jsonb)), ?, ?, ?, ?, (to_json(?::jsonb)), (to_json(?::jsonb))," +
                     "(to_json(?::jsonb)),(to_json(?::jsonb)),(to_json(?::jsonb)))");


    public static final String UPDATE_QUERY = String.format
            ("UPDATE person SET  active=?, addresses=(to_json(?::jsonb)), archived=?, " +
                     "contact_points=(to_json(?::jsonb)), contacts=(to_json(?::jsonb)), date_modified=?, date_of_birth=?," +
                     " date_of_registration, deceased=?, deceased_date_time=?, first_name=?, identifiers=(to_json(?::jsonb)), other_name=?, modified_by=?, surname=?," +
                     " gender=(to_json(?::jsonb)), marital_status=(to_json(?::jsonb)), organization=(to_json(?::jsonb))," +
                     "education=(to_json(?::jsonb)), employment_status=(to_json(?::jsonb)) WHERE id=?");


//    private final String GETALL_QUERY = String.format
//            ("SELECT id, active,  " +
//                     "addresses, archived, contact_points,contacts," +
//                     " created_by, date_created, date_modified, date_of_birth, date_of_registration, deceased, deceased_date_time, first_name, identifiers, " +
//                     "other_name, modified_by, surname, uuid, gender, marital_status, organization,education, " +
//                     "employment_status FROM person WHERE archived=0");
//
//    private final String GET_ID_BY_UUID_QUERY
//            = String.format ("SELECT * FROM person WHERE uuid = ?");
//
//
//    private final String GET_BY_ID_QUERY =
//            String.format ("SELECT * FROM person WHERE id = ?");

//    private final String DELETE_BY_ID_QUERY =
//            String.format ("DELETE FROM person WHERE id = ?");

//    private final String DELETE_BY_ID_QUERY =
//            String.format ("UPDATE person SET archived = 1 WHERE id = ?");
//
//    private final JdbcTemplate template;

//    @Transactional
//    public Person savePerson(Person person) {
//        final String uuid = UUID.randomUUID ().toString ();
//
//        template.update (INSERT_QUERY,
//
//        person.setUuid (uuid);
//        return person;
//    }

//    @Transactional
//    public Person updatePerson(Long id, Person person) {
//        template.update (UPDATE_QUERY,
//                         person.getActive (),
//                         (person.getAddresses () != null) ? person.getAddresses ().toString () : null,
//                         person.getArchived (),
//                         (person.getContactPoints () != null) ? person.getContactPoints ().toString () : null,
//                         (person.getContacts () != null) ? person.getContacts ().toString () : null,
//                         person.getDateModified (),
//                         person.getDateOfBirth (),
//                         person.getDateOfRegistration (),
//                         person.getDeceased (),
//                         person.getDeceasedDateTime (),
//                         person.getFirstName (),
//                         (person.getIdentifiers () != null) ? person.getIdentifiers ().toString () : null,
//                         person.getOtherName (),
//                         person.getModifiedBy (),
//                         person.getSurname (),
//                         (person.getGender () != null) ? person.getGender ().toString () : null,
//                         (person.getMaritalStatus () != null) ? person.getMaritalStatus ().toString () : null,
//                         (person.getOrganization () != null) ? person.getOrganization ().toString () : null,
//                         (person.getEducation () != null) ? person.getEducation ().toString () : null,
//                         (person.getEmploymentStatus () != null) ? person.getEmploymentStatus ().toString () : null,
//                         id
//        );
//        person.setId (id);
//        return person;
//    }

//    public PersonResponseDto getPersonIdByUuid(String uuid) {
//        return template.queryForObject (GET_ID_BY_UUID_QUERY, new Object[]{uuid}, new PersonRowMapper ());
//    }

//    public Optional<PersonResponseDto> getPersonById(Long id) {
//        return Optional.ofNullable (template.queryForObject (GET_BY_ID_QUERY, new Object[]{id}, new PersonRowMapper ()));
//    }

//    public void deletePatientById(Long id) {
//        template.update (DELETE_BY_ID_QUERY, id);
//    }

//    public List<PersonResponseDto> getAllPersons() {
//        return template.query (GETALL_QUERY, new PersonRowMapper ());
//    }

}
