export const schema = {
    version: 1,
    invitations: [
        'id INTEGER PRIMARY KEY NOT NULL',
        'user VARCHAR(55)',
        'club VARCHAR(55)'
    ],
    stocks: [
        'id INTEGER PRIMARY KEY NOT NULL',
        'exchange_id INTEGER',
        'name VARCHAR(55)',
        'symbol VARCHAR(10)',
        'latest_price VARCHAR(14)',
        'updated_at VARCHAR(24)',
        'created_at VARCHAR(24)'
    ],
    indices: [
        'id INTEGER PRIMARY KEY NOT NULL',
        'exchange_id INTEGER',
        'name VARCHAR(55)',
        'symbol VARCHAR(10)',
        'stocks TEXT',
        'latest_price VARCHAR(14)',
        'updated_at VARCHAR(24)',
        'created_at VARCHAR(24)'
    ],
    exchanges: [
        'id INTEGER PRIMARY KEY NOT NULL',
        'exchange_suffix VARCHAR(4)',
        'mic VARCHAR(4)',
        'region VARCHAR(3)',
        'name VARCHAR(55)',
        'symbol VARCHAR(10)',
        'updated_at VARCHAR(24)',
        'created_at VARCHAR(24)'
    ],
    invitations: [
        'id INTEGER PRIMARY KEY NOT NULL',
        'name VARCHAR(55)',
        'club VARCHAR(55)'
    ],
    clubs: [
        'id INTEGER PRIMARY KEY NOT NULL',
        'name VARCHAR(55)',
        'value VARCHAR(55)'
    ],
    proposals: [
        'id INTEGER PRIMARY KEY NOT NULL',
        'name VARCHAR(55)',
        'symbol VARCHAR(10)',
        'trades VARCHAR(255)'
    ]
};