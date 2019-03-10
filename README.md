Create a sqlite database file for every project.
Create a sqlite database file for management schemas.

new CmsTable({
    managementDatabase,
    table,
    user
});

new Cms({
    managementDatabasePath
});

Cms.getTableAsync({tableName, version, identity});

Cms.addTableAsync({schema, identity});

Cms.removeTableAsync({schema, identity});

Cms.removeUserAsync(actingIdentity, subjectIdentity);

Cms.addUserAsync(actingIdentity, subjectIdentity);

Cms.changeUserPasswordAsync(actingIdentity, subjectIdentity);

Cms.setSmtpServerAsync(smtpSettings);



