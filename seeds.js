export default function seedDatabase(syncdb) {
    console.log("Seeding database")
    syncdb.deleteAll('invitations')
    syncdb.create({invitations: [
        {
            user: 'Tess Yellanda',
            club: 'Original Pirate Investors'
        }
    ]})
}