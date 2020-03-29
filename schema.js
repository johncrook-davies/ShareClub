export const schema = {
    version: 3,
    invitations: [
        'invitation_id INTEGER PRIMARY KEY NOT NULL',
        'user VARCHAR(55)',
        'club VARCHAR(55)'
    ]
};