export default function seedDatabase(syncdb) {
    syncdb.deleteAll('invitations')
    syncdb.create({invitations: [
        {
            user: 'Tess Yellanda',
            club: 'Original Pirate Investors'
        }
    ]})
}