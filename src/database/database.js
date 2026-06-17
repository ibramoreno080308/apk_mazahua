import * as SQLite from 'expo-sqlite';

const dbPromise =
  SQLite.openDatabaseAsync('atlasHerbolario.db');

async function getDatabase() {
  return await dbPromise;
}

async function columnExists(
  db,
  tableName,
  columnName,
) {
  const columns =
    await db.getAllAsync(
      `PRAGMA table_info(${tableName});`
    );

  return columns.some(
    (column) => column.name === columnName
  );
}

async function addColumnIfNeeded(
  db,
  tableName,
  columnName,
  definition,
) {
  const exists =
    await columnExists(
      db,
      tableName,
      columnName,
    );

  if (!exists) {
    await db.execAsync(
      `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition};`
    );
  }
}

export async function initDatabase() {
  const db =
    await getDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      photo TEXT,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS app_session (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      userId INTEGER
    );

    CREATE TABLE IF NOT EXISTS findings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      plantName TEXT NOT NULL,
      description TEXT,
      uses TEXT,
      image TEXT,
      latitude REAL,
      longitude REAL,
      location TEXT,
      date TEXT,
      author TEXT,
      category TEXT,
      rarity TEXT,
      likes INTEGER DEFAULT 0,
      comments INTEGER DEFAULT 0,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      findingId INTEGER NOT NULL,
      createdAt TEXT,
      UNIQUE(userId, findingId)
    );
  `);

  await addColumnIfNeeded(
    db,
    'findings',
    'userId',
    'INTEGER'
  );

  await addColumnIfNeeded(
    db,
    'findings',
    'createdAt',
    'TEXT'
  );

  const demoUser =
    await db.getFirstAsync(
      `
      SELECT id
      FROM users
      WHERE email = ?;
      `,
      [
        'admin@atlas.com',
      ]
    );

  if (!demoUser) {
    await db.runAsync(
      `
      INSERT INTO users (
        name,
        email,
        password,
        createdAt
      )
      VALUES (?, ?, ?, ?);
      `,
      [
        'Efraín Lara',
        'admin@atlas.com',
        '123456',
        new Date().toISOString(),
      ]
    );
  }
}

export async function createUser({
  name,
  email,
  password,
}) {
  const db =
    await getDatabase();

  const cleanEmail =
    email.trim().toLowerCase();

  const existingUser =
    await db.getFirstAsync(
      `
      SELECT id
      FROM users
      WHERE email = ?;
      `,
      [
        cleanEmail,
      ]
    );

  if (existingUser) {
    throw new Error('EMAIL_EXISTS');
  }

  const result =
    await db.runAsync(
      `
      INSERT INTO users (
        name,
        email,
        password,
        createdAt
      )
      VALUES (?, ?, ?, ?);
      `,
      [
        name.trim(),
        cleanEmail,
        password,
        new Date().toISOString(),
      ]
    );

  const userId =
    result.lastInsertRowId;

  await setCurrentUser(userId);

  return {
    id: userId,
    name: name.trim(),
    email: cleanEmail,
  };
}

export async function loginUser(
  email,
  password,
) {
  const db =
    await getDatabase();

  const user =
    await db.getFirstAsync(
      `
      SELECT id, name, email, photo
      FROM users
      WHERE email = ?
      AND password = ?;
      `,
      [
        email.trim().toLowerCase(),
        password,
      ]
    );

  if (!user) {
    throw new Error('INVALID_LOGIN');
  }

  await setCurrentUser(user.id);

  return user;
}

export async function setCurrentUser(
  userId,
) {
  const db =
    await getDatabase();

  await db.runAsync(
    `
    INSERT OR REPLACE INTO app_session (
      id,
      userId
    )
    VALUES (1, ?);
    `,
    [
      userId,
    ]
  );
}

export async function getCurrentUser() {
  const db =
    await getDatabase();

  const user =
    await db.getFirstAsync(`
      SELECT users.id,
             users.name,
             users.email,
             users.photo
      FROM app_session
      INNER JOIN users
      ON users.id = app_session.userId
      WHERE app_session.id = 1;
    `);

  return user || null;
}

export async function clearCurrentUser() {
  const db =
    await getDatabase();

  await db.runAsync(`
    DELETE FROM app_session
    WHERE id = 1;
  `);
}

export async function insertFinding(
  finding,
) {
  const db =
    await getDatabase();

  await db.runAsync(
    `
    INSERT INTO findings (
      userId,
      plantName,
      description,
      uses,
      image,
      latitude,
      longitude,
      location,
      date,
      author,
      category,
      rarity,
      likes,
      comments,
      createdAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [
      finding.userId || null,
      finding.plantName,
      finding.description || '',
      finding.uses || '',
      finding.image || null,
      finding.latitude,
      finding.longitude,
      finding.location || 'Ubicación desconocida',
      finding.date,
      finding.author || 'Explorador',
      finding.category || 'Planta medicinal',
      finding.rarity || 'Común',
      finding.likes || 0,
      finding.comments || 0,
      new Date().toISOString(),
    ]
  );
}

export async function getFindings(
  userId,
) {
  const db =
    await getDatabase();

  if (userId) {
    return await db.getAllAsync(
      `
      SELECT *
      FROM findings
      WHERE userId = ?
      OR userId IS NULL
      ORDER BY id DESC;
      `,
      [
        userId,
      ]
    );
  }

  return await db.getAllAsync(`
    SELECT *
    FROM findings
    ORDER BY id DESC;
  `);
}

export async function getFindingById(
  id,
) {
  const db =
    await getDatabase();

  return await db.getFirstAsync(
    `
    SELECT *
    FROM findings
    WHERE id = ?;
    `,
    [
      id,
    ]
  );
}

export async function deleteFinding(
  id,
) {
  const db =
    await getDatabase();

  await db.runAsync(
    `
    DELETE FROM favorites
    WHERE findingId = ?;
    `,
    [
      id,
    ]
  );

  await db.runAsync(
    `
    DELETE FROM findings
    WHERE id = ?;
    `,
    [
      id,
    ]
  );
}

export async function getDashboardStats(
  userId,
) {
  const findings =
    await getFindings(userId);

  const uniquePlants =
    new Set(
      findings.map((item) =>
        item.plantName.trim().toLowerCase()
      )
    );

  return {
    plantCount: uniquePlants.size,
    routeCount: uniquePlants.size,
    contributionCount: findings.length,
  };
}

export async function getHerbarium(
  userId,
) {
  const findings =
    await getFindings(userId);

  const plantsMap =
    new Map();

  findings.forEach((finding) => {
    const key =
      finding.plantName.trim().toLowerCase();

    if (!plantsMap.has(key)) {
      plantsMap.set(key, {
        id: finding.id,
        name: finding.plantName,
        image: finding.image,
        category: finding.category,
        rarity: finding.rarity,
        discoveries: 1,
      });

      return;
    }

    const plant =
      plantsMap.get(key);

    plant.discoveries += 1;

    if (!plant.image && finding.image) {
      plant.image = finding.image;
    }
  });

  return Array.from(plantsMap.values());
}

export async function getBotanicalRoutes(
  userId,
) {
  const findings =
    await getFindings(userId);

  const routesMap =
    new Map();

  findings
    .filter(
      (finding) => finding.latitude && finding.longitude
    )
    .forEach((finding) => {
      const key =
        finding.plantName.trim().toLowerCase();

      if (!routesMap.has(key)) {
        routesMap.set(key, {
          id: key,
          name: `Ruta de ${finding.plantName}`,
          plantName: finding.plantName,
          plants: 0,
          points: [],
          lastLocation: finding.location,
        });
      }

      const route =
        routesMap.get(key);

      route.plants += 1;

      route.points.push({
        latitude: finding.latitude,
        longitude: finding.longitude,
      });
    });

  return Array.from(routesMap.values());
}

export async function toggleFavorite(
  userId,
  findingId,
) {
  const db =
    await getDatabase();

  const existingFavorite =
    await db.getFirstAsync(
      `
      SELECT id
      FROM favorites
      WHERE userId = ?
      AND findingId = ?;
      `,
      [
        userId,
        findingId,
      ]
    );

  if (existingFavorite) {
    await db.runAsync(
      `
      DELETE FROM favorites
      WHERE id = ?;
      `,
      [
        existingFavorite.id,
      ]
    );

    return false;
  }

  await db.runAsync(
    `
    INSERT INTO favorites (
      userId,
      findingId,
      createdAt
    )
    VALUES (?, ?, ?);
    `,
    [
      userId,
      findingId,
      new Date().toISOString(),
    ]
  );

  return true;
}

export async function isFavorite(
  userId,
  findingId,
) {
  const db =
    await getDatabase();

  const result =
    await db.getFirstAsync(
      `
      SELECT id
      FROM favorites
      WHERE userId = ?
      AND findingId = ?;
      `,
      [
        userId,
        findingId,
      ]
    );

  return Boolean(result);
}

export async function getFavoriteFindings(
  userId,
) {
  const db =
    await getDatabase();

  return await db.getAllAsync(
    `
    SELECT findings.*
    FROM favorites
    INNER JOIN findings
    ON findings.id = favorites.findingId
    WHERE favorites.userId = ?
    ORDER BY favorites.id DESC;
    `,
    [
      userId,
    ]
  );
}
